import { getFirebaseDb, isFirebaseConfigured } from './client';
import { doc, getDoc, setDoc, getDocs, collection, writeBatch } from 'firebase/firestore';
import { getBookmarkedIds } from '@/lib/bookmarks';
import { getAllNotes, getAllMetaNotes, NoteEntry, MetaNoteEntry, NOTES_KEY, META_NOTES_KEY } from '@/lib/notes';
import { useAuthStore } from '@/store/authStore';

const BOOKMARKS_KEY = 'pyq_vault_bookmarked_ids';

/**
 * Pushes locally stored bookmarks, question notes, and meta notes up to GCP Cloud Firestore.
 */
export async function migrateLocalToCloud(userId: string): Promise<boolean> {
  if (!isFirebaseConfigured()) return false;
  const db = getFirebaseDb();

  try {
    const batch = writeBatch(db);

    // 1. Sync Bookmarks
    const localBookmarkIds = getBookmarkedIds();
    if (localBookmarkIds.length > 0) {
      const bookmarksRef = doc(db, 'users', userId, 'vault', 'bookmarks');
      batch.set(
        bookmarksRef,
        {
          questionIds: localBookmarkIds,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }

    // 2. Sync Question Notes
    const localNotes = getAllNotes();
    if (localNotes.length > 0) {
      localNotes.forEach((n) => {
        const noteRef = doc(db, 'users', userId, 'notes', n.questionId);
        batch.set(
          noteRef,
          {
            questionId: n.questionId,
            content: n.content,
            updatedAt: n.updatedAt || new Date().toISOString(),
            pointerId: n.pointerId || null,
            answerType: n.answerType || null,
            answerText: n.answerText || null,
            answerFileName: n.answerFileName || null,
          },
          { merge: true }
        );
      });
    }

    // 3. Sync Meta Notes
    const localMetaNotes = getAllMetaNotes();
    if (localMetaNotes.length > 0) {
      localMetaNotes.forEach((m) => {
        const metaRef = doc(db, 'users', userId, 'metaNotes', m.id);
        batch.set(
          metaRef,
          {
            id: m.id,
            type: m.type,
            content: m.content,
            updatedAt: m.updatedAt || new Date().toISOString(),
          },
          { merge: true }
        );
      });
    }

    await batch.commit();
    return true;
  } catch (err) {
    console.warn('[FirestoreSync] Local-to-cloud migration error:', err);
    return false;
  }
}

/**
 * Pulls remote vault data from GCP Cloud Firestore and merges into localStorage.
 */
export async function pullCloudVault(userId: string): Promise<boolean> {
  if (!isFirebaseConfigured()) return false;
  const db = getFirebaseDb();

  try {
    // 1. Fetch Remote Bookmarks
    const bookmarksRef = doc(db, 'users', userId, 'vault', 'bookmarks');
    const bookmarksSnap = await getDoc(bookmarksRef);
    if (bookmarksSnap.exists()) {
      const data = bookmarksSnap.data();
      const remoteIds: string[] = data?.questionIds || [];
      if (remoteIds.length > 0) {
        const localIds = new Set(getBookmarkedIds());
        remoteIds.forEach((id) => localIds.add(id));
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(localIds)));
        window.dispatchEvent(new Event('pyq-bookmarks-updated'));
      }
    }

    // 2. Fetch Remote Question Notes
    const notesCol = collection(db, 'users', userId, 'notes');
    const notesSnap = await getDocs(notesCol);
    if (!notesSnap.empty) {
      const localNotes = getAllNotes();
      const localNotesMap = new Map(localNotes.map((n) => [n.questionId, n]));

      notesSnap.forEach((docSnap) => {
        const r = docSnap.data();
        const existing = localNotesMap.get(r.questionId);
        const remoteDate = new Date(r.updatedAt || 0).getTime();
        const localDate = existing ? new Date(existing.updatedAt || 0).getTime() : 0;

        if (!existing || remoteDate >= localDate) {
          localNotesMap.set(r.questionId, {
            questionId: r.questionId,
            content: r.content,
            updatedAt: r.updatedAt || new Date().toISOString(),
            pointerId: r.pointerId || undefined,
            answerType: r.answerType || null,
            answerText: r.answerText || undefined,
            answerFileName: r.answerFileName || undefined,
          } as NoteEntry);
        }
      });

      localStorage.setItem(NOTES_KEY, JSON.stringify(Array.from(localNotesMap.values())));
      window.dispatchEvent(new Event('pyq-notes-updated'));
    }

    // 3. Fetch Remote Meta Notes
    const metaCol = collection(db, 'users', userId, 'metaNotes');
    const metaSnap = await getDocs(metaCol);
    if (!metaSnap.empty) {
      const localMeta = getAllMetaNotes();
      const localMetaMap = new Map(localMeta.map((m) => [m.id, m]));

      metaSnap.forEach((docSnap) => {
        const r = docSnap.data();
        const existing = localMetaMap.get(r.id);
        const remoteDate = new Date(r.updatedAt || 0).getTime();
        const localDate = existing ? new Date(existing.updatedAt || 0).getTime() : 0;

        if (!existing || remoteDate >= localDate) {
          localMetaMap.set(r.id, {
            id: r.id,
            type: r.type as 'subject' | 'pointer',
            content: r.content,
            updatedAt: r.updatedAt || new Date().toISOString(),
          });
        }
      });

      localStorage.setItem(META_NOTES_KEY, JSON.stringify(Array.from(localMetaMap.values())));
      window.dispatchEvent(new Event('pyq-meta-notes-updated'));
    }

    return true;
  } catch (err) {
    console.warn('[FirestoreSync] Cloud-to-local pull error:', err);
    return false;
  }
}

/**
 * Full bidirectional synchronization engine with Firestore.
 */
export async function syncVault(userId: string): Promise<boolean> {
  const store = useAuthStore.getState();
  if (!isFirebaseConfigured()) {
    store.setSyncStatus('offline');
    return false;
  }

  store.setSyncStatus('syncing');

  try {
    // 1. Upload local data to cloud
    await migrateLocalToCloud(userId);

    // 2. Pull cloud data to local
    await pullCloudVault(userId);

    store.setSyncStatus('synced', new Date());
    return true;
  } catch (err) {
    console.warn('[FirestoreSync] Bidirectional sync failed:', err);
    store.setSyncStatus('error');
    return false;
  }
}
