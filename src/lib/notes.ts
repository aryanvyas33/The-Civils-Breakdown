export const NOTES_KEY = 'pyq_vault_notes';

export interface NoteEntry {
  questionId: string;
  content: string;            // Evaluation Note / legacy text
  updatedAt: string;          // ISO timestamp
  pointerId?: string;         // For "notes by pointer" view
  
  // New fields for Answer upload
  answerType?: 'text' | 'file' | null;
  answerText?: string;
  answerFileId?: string;
  answerFileName?: string;
}

// --- IndexedDB Helper for Files ---
const DB_NAME = 'pyq_files_db';
const STORE_NAME = 'files';

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB is not supported in this environment'));
    }
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB'));
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    } catch (err) {
      reject(err);
    }
  });
}

export async function saveFile(fileId: string, fileData: Blob | string): Promise<void> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    throw new Error('IndexedDB is not available');
  }
  const db = await getDB();
  return new Promise((resolve, reject) => {
    try {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(fileData, fileId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error || new Error('Failed to save file in store'));
    } catch (err) {
      reject(err);
    }
  });
}

export async function getFile(fileId: string): Promise<Blob | string | null> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') return null;
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(fileId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Failed to read file from store'));
    });
  } catch (err) {
    console.error('[NotesService] Failed to get file:', err);
    return null;
  }
}

export async function deleteFile(fileId: string): Promise<void> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') return;
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(fileId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error || new Error('Failed to delete file from store'));
    });
  } catch (err) {
    console.error('[NotesService] Failed to delete file:', err);
  }
}
// ----------------------------------

export function getAllNotes(): NoteEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('[NotesService] Failed to parse notes from localStorage:', e);
    return [];
  }
}

export function getNote(questionId: string): NoteEntry | null {
  const notes = getAllNotes();
  return notes.find(n => n.questionId === questionId) || null;
}

export function saveNote(
  questionId: string, 
  content: string, 
  pointerId?: string,
  answerType?: 'text' | 'file' | null,
  answerText?: string,
  answerFileId?: string,
  answerFileName?: string
): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const notes = getAllNotes();
    const existingIndex = notes.findIndex(n => n.questionId === questionId);
    
    const newNote: NoteEntry = {
      questionId,
      content,
      updatedAt: new Date().toISOString(),
      pointerId,
      answerType,
      answerText,
      answerFileId,
      answerFileName
    };

    if (existingIndex > -1) {
      notes[existingIndex] = newNote;
    } else {
      notes.push(newNote);
    }

    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    window.dispatchEvent(new Event('pyq-notes-updated'));
    return true;
  } catch (e) {
    console.error('[NotesService] Failed to save note:', e);
    return false;
  }
}

export function deleteNote(questionId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const notes = getAllNotes();
    const filtered = notes.filter(n => n.questionId !== questionId);
    localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('pyq-notes-updated'));
    return true;
  } catch (e) {
    console.error('[NotesService] Failed to delete note:', e);
    return false;
  }
}

export function getNotesByPointer(pointerId: string): NoteEntry[] {
  const notes = getAllNotes();
  return notes.filter(n => n.pointerId === pointerId);
}

export const META_NOTES_KEY = 'pyq_vault_meta_notes';

export interface MetaNoteEntry {
  id: string;
  type: 'subject' | 'pointer';
  content: string;
  updatedAt: string;
}

export function getAllMetaNotes(): MetaNoteEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(META_NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('[NotesService] Failed to parse meta notes from localStorage:', e);
    return [];
  }
}

export function getMetaNote(id: string): MetaNoteEntry | null {
  const notes = getAllMetaNotes();
  return notes.find(n => n.id === id) || null;
}

export function saveMetaNote(id: string, type: 'subject' | 'pointer', content: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const notes = getAllMetaNotes();
    const existingIndex = notes.findIndex(n => n.id === id);
    
    const newNote: MetaNoteEntry = {
      id,
      type,
      content,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex > -1) {
      notes[existingIndex] = newNote;
    } else {
      notes.push(newNote);
    }

    localStorage.setItem(META_NOTES_KEY, JSON.stringify(notes));
    window.dispatchEvent(new Event('pyq-meta-notes-updated'));
    return true;
  } catch (e) {
    console.error('[NotesService] Failed to save meta note:', e);
    return false;
  }
}

export function deleteMetaNote(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const notes = getAllMetaNotes();
    const filtered = notes.filter(n => n.id !== id);
    localStorage.setItem(META_NOTES_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('pyq-meta-notes-updated'));
    return true;
  } catch (e) {
    console.error('[NotesService] Failed to delete meta note:', e);
    return false;
  }
}
