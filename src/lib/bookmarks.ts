// Client-side bookmark management (localStorage-based, zero authentication required)

const STORAGE_KEY = 'pyq_vault_bookmarked_ids';

export function getBookmarkedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function isBookmarked(questionId: string): boolean {
  const ids = getBookmarkedIds();
  return ids.includes(questionId);
}

export function toggleBookmark(questionId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const ids = getBookmarkedIds();
    const index = ids.indexOf(questionId);
    let newState = false;

    if (index > -1) {
      ids.splice(index, 1);
      newState = false;
    } else {
      ids.push(questionId);
      newState = true;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event('pyq-bookmarks-updated'));
    return newState;
  } catch (e) {
    return false;
  }
}
