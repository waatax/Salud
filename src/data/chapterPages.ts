import { useEffect, useState } from 'react';
import { KnowledgePage } from '../types';

/**
 * On-demand loading of nutrition chapter pages (ported from the October bundle work).
 * Each chapter's content is its own dynamic import, so opening chapter W downloads W only
 * instead of all 11 chapters. Metadata (titles, counts) stays in chapterCatalog.ts.
 * Loaded pages are cached here for synchronous lookups (four-pillar profiles, plan items,
 * bookmarks). `chapters.ts` keeps the eager full set for search, tests and scripts.
 */
export const LOADERS: Record<string, () => Promise<KnowledgePage[]>> = {
  W: () => import('./chapterW').then((m) => m.CHAPTER_W_PAGES),
  O: () => import('./chapterO').then((m) => m.CHAPTER_O_PAGES),
  A: () => import('./chapterA').then((m) => m.CHAPTER_A_PAGES),
  E: () => Promise.all([import('./chaptersEPCS'), import('./curriculum/chapterE')]).then(([c, x]) => [...c.CHAPTER_E_PAGES, ...x.PAGES_E_EXT]),
  P: () => Promise.all([import('./chaptersEPCS'), import('./curriculum/chapterP')]).then(([c, x]) => [...c.CHAPTER_P_PAGES, ...x.PAGES_P_EXT]),
  C: () => Promise.all([import('./chaptersEPCS'), import('./curriculum/chapterC')]).then(([c, x]) => [...c.CHAPTER_C_PAGES, ...x.PAGES_C_EXT]),
  S: () => Promise.all([import('./chaptersEPCS'), import('./curriculum/chapterS')]).then(([c, x]) => [...c.CHAPTER_S_PAGES, ...x.PAGES_S_EXT]),
  N: () => Promise.all([import('./chaptersNMDF'), import('./curriculum/chapterN')]).then(([c, x]) => [...c.CHAPTER_N_PAGES, ...x.PAGES_N_EXT]),
  M: () => Promise.all([import('./chaptersNMDF'), import('./curriculum/chapterM')]).then(([c, x]) => [...c.CHAPTER_M_PAGES, ...x.PAGES_M_EXT]),
  D: () => Promise.all([import('./chaptersNMDF'), import('./curriculum/chapterD')]).then(([c, x]) => [...c.CHAPTER_D_PAGES, ...x.PAGES_D_EXT]),
  F: () => Promise.all([import('./chaptersNMDF'), import('./curriculum/chapterF')]).then(([c, x]) => [...c.CHAPTER_F_PAGES, ...x.PAGES_F_EXT]),
};

const loaded = new Map<string, KnowledgePage[]>();
const pageById = new Map<string, KnowledgePage>();
const inflight = new Map<string, Promise<KnowledgePage[]>>();

function registerChapterPages(chapterId: string, pages: KnowledgePage[]): void {
  loaded.set(chapterId, pages);
  for (const p of pages) pageById.set(p.id, p);
}

/** Pages of a chapter if already loaded, else undefined. */
export function getLoadedChapterPages(chapterId: string): KnowledgePage[] | undefined {
  return loaded.get(chapterId);
}

/** A page by id if its chapter is already loaded. */
export function getLoadedPage(pageId: string): KnowledgePage | undefined {
  return pageById.get(pageId);
}

export function loadChapterPages(chapterId: string): Promise<KnowledgePage[]> {
  const cached = loaded.get(chapterId);
  if (cached) return Promise.resolve(cached);
  const loader = LOADERS[chapterId];
  if (!loader) return Promise.resolve([]);
  let pending = inflight.get(chapterId);
  if (!pending) {
    pending = loader().then(
      (pages) => {
        registerChapterPages(chapterId, pages);
        inflight.delete(chapterId);
        return pages;
      },
      (err) => {
        // A failed chunk request (e.g. offline) should not poison later attempts.
        inflight.delete(chapterId);
        throw err;
      }
    );
    inflight.set(chapterId, pending);
  }
  return pending;
}

/** Chapter id of a `PAGE-X-nn` id (optionally followed by `#suffix`). */
export function chapterOfPageId(id: string): string | undefined {
  return id.match(/^PAGE-([A-Z])-/)?.[1];
}

/**
 * Loads the chapters that the given page ids (or `PAGE-…#suffix` action ids) belong to and
 * returns true once they are all available, re-rendering the caller when they arrive.
 */
export function useChaptersForIds(ids: string[]): boolean {
  const chapterIds = Array.from(
    new Set(ids.map(chapterOfPageId).filter((c): c is string => Boolean(c && LOADERS[c])))
  ).sort();
  const key = chapterIds.join(',');
  const ready = chapterIds.every((c) => loaded.has(c));
  const [, setTick] = useState(0);
  useEffect(() => {
    if (ready) return;
    let alive = true;
    Promise.all(key.split(',').map(loadChapterPages))
      .catch(() => undefined)
      .then(() => {
        if (alive) setTick((t) => t + 1);
      });
    return () => {
      alive = false;
    };
  }, [key, ready]);
  return ready;
}
