import { useState, useEffect, useCallback } from 'react';

const KEY = 'salud_bookmarked_pages';
const EVENT = 'salud:bookmarks';

function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const saved: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function saveBookmarks(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore storage errors */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(loadBookmarks);

  useEffect(() => {
    const sync = () => setBookmarks(loadBookmarks());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggleBookmark = useCallback((pageId: string) => {
    const current = loadBookmarks();
    const updated = current.includes(pageId)
      ? current.filter((id) => id !== pageId)
      : [...current, pageId];
    saveBookmarks(updated);
    setBookmarks(updated);
  }, []);

  const isBookmarked = useCallback(
    (pageId: string) => bookmarks.includes(pageId),
    [bookmarks]
  );

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  };
}
