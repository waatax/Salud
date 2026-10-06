import { useState, useEffect, useCallback } from 'react';
import { CHAPTER_W_PAGES } from '../data/chapterW';
import { CHAPTER_O_PAGES } from '../data/chapterO';
import { CHAPTER_A_PAGES } from '../data/chapterA';
import { KnowledgePage } from '../types';

const KEY = 'salud_bookmarked_pages';
const EVENT = 'salud:bookmarks';

const ALL_PAGES: KnowledgePage[] = [...CHAPTER_W_PAGES, ...CHAPTER_O_PAGES, ...CHAPTER_A_PAGES];

function loadBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
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

  const bookmarkedPages = ALL_PAGES.filter((p) => bookmarks.includes(p.id));

  return {
    bookmarks,
    bookmarkedPages,
    toggleBookmark,
    isBookmarked,
  };
}
