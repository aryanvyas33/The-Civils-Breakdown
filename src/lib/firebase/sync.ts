import { getFirebaseDb, isFirebaseConfigured } from './client';
import { doc, getDoc, setDoc, getDocs, collection, writeBatch, deleteDoc } from 'firebase/firestore';
import { getBookmarkedIds } from '@/lib/bookmarks';
import { getAllNotes, getAllMetaNotes, NoteEntry, MetaNoteEntry, NOTES_KEY, META_NOTES_KEY } from '@/lib/notes';
import { useAuthStore } from '@/store/authStore';

import type { Firestore, WriteBatch, DocumentReference, SetOptions } from 'firebase/firestore';

const BOOKMARKS_KEY = 'pyq_vault_bookmarked_ids';

/**
 * Helper to ensure Firestore operations are safely chunked below the 500-operation limit.
 */
class SafeBatch {
  private batch: WriteBatch;
  private ops = 0;
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
    this.batch = writeBatch(db);
  }

  async set(ref: DocumentReference, data: any, options?: SetOptions) {
    if (options) {
      this.batch.set(ref, data, options);
    } else {
      this.batch.set(ref, data);
    }
    this.ops++;
    if (this.ops >= 400) {
      await this.batch.commit();
      this.batch = writeBatch(this.db);
      this.ops = 0;
    }
  }

  async delete(ref: DocumentReference) {
    this.batch.delete(ref);
    this.ops++;
    if (this.ops >= 400) {
      await this.batch.commit();
      this.batch = writeBatch(this.db);
      this.ops = 0;
    }
  }

  async commit() {
    if (this.ops > 0) {
      await this.batch.commit();
      this.ops = 0;
    }
  }
}

/**
 * Pushes locally stored bookmarks, question notes, and meta notes up to GCP Cloud Firestore.
 * Accurately syncs creations, edits, and deletions with automatic operation chunking.
 * @param allowDeletions Set to false during initial sync/merge to prevent wiping remote notes from a fresh client.
 */
export async function migrateLocalToCloud(userId: string, allowDeletions = true): Promise<boolean> {
  if (!isFirebaseConfigured()) return false;
  const db = getFirebaseDb();

  try {
    const batch = new SafeBatch(db);

    // 1. Sync Bookmarks (writes current list, even if empty)
    const localBookmarkIds = getBookmarkedIds();
    const bookmarksRef = doc(db, 'users', userId, 'vault', 'bookmarks');
    await batch.set(
      bookmarksRef,
      {
        questionIds: localBookmarkIds,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    // 2. Sync Question Notes
    const localNotes = getAllNotes();
    const localNoteIds = new Set(localNotes.map((n) => n.questionId));

    // Check remote notes to remove any deleted locally (only when explicit deletions are allowed and local state is hydrated)
    if (allowDeletions && localNotes.length > 0) {
      const notesCol = collection(db, 'users', userId, 'notes');
      const notesSnap = await getDocs(notesCol);
      for (const docSnap of notesSnap.docs) {
        if (!localNoteIds.has(docSnap.id)) {
          await batch.delete(docSnap.ref);
        }
      }
    }

    // Upsert active local notes
    for (const n of localNotes) {
      const noteRef = doc(db, 'users', userId, 'notes', n.questionId);
      await batch.set(
        noteRef,
        {
          questionId: n.questionId,
          content: n.content || '',
          updatedAt: n.updatedAt || new Date().toISOString(),
          pointerId: n.pointerId || null,
          answerType: n.answerType || null,
          answerText: n.answerText || null,
          answerFileName: n.answerFileName || null,
          answerFileId: n.answerFileId || null,
        },
        { merge: true }
      );
    }

    // 3. Sync Meta Notes
    const localMetaNotes = getAllMetaNotes();
    const localMetaIds = new Set(localMetaNotes.map((m) => m.id));

    if (allowDeletions && localMetaNotes.length > 0) {
      const metaCol = collection(db, 'users', userId, 'metaNotes');
      const metaSnap = await getDocs(metaCol);
      for (const docSnap of metaSnap.docs) {
        if (!localMetaIds.has(docSnap.id)) {
          await batch.delete(docSnap.ref);
        }
      }
    }

    for (const m of localMetaNotes) {
      const metaRef = doc(db, 'users', userId, 'metaNotes', m.id);
      await batch.set(
        metaRef,
        {
          id: m.id,
          type: m.type,
          content: m.content || '',
          updatedAt: m.updatedAt || new Date().toISOString(),
        },
        { merge: true }
      );
    }

    await batch.commit();
    return true;
  } catch (err) {
    console.warn('[FirestoreSync] Local-to-cloud migration error:', err);
    return false;
  }
}

let isPullInProgress = false;

/**
 * Returns true if remote cloud data is actively being hydrated into localStorage.
 * Used by hooks to suppress echo-writes back to Firestore.
 */
export function isPullingFromCloud(): boolean {
  return isPullInProgress;
}

/**
 * Pulls remote vault data from GCP Cloud Firestore and merges into localStorage.
 */
export async function pullCloudVault(userId: string): Promise<boolean> {
  if (!isFirebaseConfigured()) return false;
  const db = getFirebaseDb();
  isPullInProgress = true;

  try {
    // 1. Fetch Remote Bookmarks
    const bookmarksRef = doc(db, 'users', userId, 'vault', 'bookmarks');
    const bookmarksSnap = await getDoc(bookmarksRef);
    if (bookmarksSnap.exists()) {
      const data = bookmarksSnap.data();
      const remoteIds: string[] = data?.questionIds || [];
      const localIds = new Set(getBookmarkedIds());
      remoteIds.forEach((id) => localIds.add(id));
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(localIds)));
      window.dispatchEvent(new Event('pyq-bookmarks-updated'));
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
            content: r.content || '',
            updatedAt: r.updatedAt || new Date().toISOString(),
            pointerId: r.pointerId || undefined,
            answerType: r.answerType || null,
            answerText: r.answerText || undefined,
            answerFileName: r.answerFileName || undefined,
            answerFileId: r.answerFileId || undefined,
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
            content: r.content || '',
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
  } finally {
    setTimeout(() => {
      isPullInProgress = false;
    }, 500);
  }
}

/**
 * Full bidirectional synchronization engine with Firestore.
 * @param isInitialSync If true (on login/page mount), pulls cloud data down first to preserve cross-device data.
 */
export async function syncVault(userId: string, isInitialSync = false): Promise<boolean> {
  const store = useAuthStore.getState();
  if (!isFirebaseConfigured()) {
    store.setSyncStatus('offline');
    return false;
  }

  store.setSyncStatus('syncing');

  try {
    if (isInitialSync) {
      // 1. Pull remote data first onto this device
      const pullSuccess = await pullCloudVault(userId);
      if (!pullSuccess) {
        store.setSyncStatus('error');
        return false;
      }
      // 2. Upload local guest bookmarks/notes merged with cloud, without deleting remote docs
      await migrateLocalToCloud(userId, false);
    } else {
      // Direct user action (added/edited/deleted bookmark or note)
      await migrateLocalToCloud(userId, true);
    }

    store.setSyncStatus('synced', new Date());
    return true;
  } catch (err) {
    console.warn('[FirestoreSync] Bidirectional sync failed:', err);
    store.setSyncStatus('error');
    return false;
  }
}
