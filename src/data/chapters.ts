import { Chapter, KnowledgePage } from '../types';
import { CHAPTER_CATALOG } from './chapterCatalog';
import { CHAPTER_W_PAGES } from './chapterW';
import { CHAPTER_O_PAGES } from './chapterO';
import { CHAPTER_A_PAGES } from './chapterA';
import {
  CHAPTER_E_PAGES as E_CORE,
  CHAPTER_P_PAGES as P_CORE,
  CHAPTER_C_PAGES as C_CORE,
  CHAPTER_S_PAGES as S_CORE,
} from './chaptersEPCS';
import {
  CHAPTER_N_PAGES as N_CORE,
  CHAPTER_M_PAGES as M_CORE,
  CHAPTER_D_PAGES as D_CORE,
  CHAPTER_F_PAGES as F_CORE,
} from './chaptersNMDF';
import { PAGES_E_EXT } from './curriculum/chapterE';
import { PAGES_P_EXT } from './curriculum/chapterP';
import { PAGES_C_EXT } from './curriculum/chapterC';
import { PAGES_S_EXT } from './curriculum/chapterS';
import { PAGES_N_EXT } from './curriculum/chapterN';
import { PAGES_M_EXT } from './curriculum/chapterM';
import { PAGES_D_EXT } from './curriculum/chapterD';
import { PAGES_F_EXT } from './curriculum/chapterF';

// 2026 curriculum completion: core pages 01–03 plus the pages that bring each chapter
// up to the SALUD spec §5.1 page targets (E 10 · P 8 · C 10 · S 8 · N 8 · M 12 · D 10 · F 12).
const CHAPTER_E_PAGES = [...E_CORE, ...PAGES_E_EXT];
const CHAPTER_P_PAGES = [...P_CORE, ...PAGES_P_EXT];
const CHAPTER_C_PAGES = [...C_CORE, ...PAGES_C_EXT];
const CHAPTER_S_PAGES = [...S_CORE, ...PAGES_S_EXT];
const CHAPTER_N_PAGES = [...N_CORE, ...PAGES_N_EXT];
const CHAPTER_M_PAGES = [...M_CORE, ...PAGES_M_EXT];
const CHAPTER_D_PAGES = [...D_CORE, ...PAGES_D_EXT];
const CHAPTER_F_PAGES = [...F_CORE, ...PAGES_F_EXT];

export {
  CHAPTER_W_PAGES,
  CHAPTER_O_PAGES,
  CHAPTER_A_PAGES,
  CHAPTER_E_PAGES,
  CHAPTER_P_PAGES,
  CHAPTER_C_PAGES,
  CHAPTER_S_PAGES,
  CHAPTER_N_PAGES,
  CHAPTER_M_PAGES,
  CHAPTER_D_PAGES,
  CHAPTER_F_PAGES,
};



/**
 * v4.0+: page and knowledge-point counts for all 11 published chapters are computed from the
 * page data, so the landing cards reflect the actual loaded pages and knowledge points.
 */
const LIVE_PAGES: Record<string, KnowledgePage[]> = {
  W: CHAPTER_W_PAGES,
  O: CHAPTER_O_PAGES,
  A: CHAPTER_A_PAGES,
  E: CHAPTER_E_PAGES,
  P: CHAPTER_P_PAGES,
  C: CHAPTER_C_PAGES,
  S: CHAPTER_S_PAGES,
  N: CHAPTER_N_PAGES,
  M: CHAPTER_M_PAGES,
  D: CHAPTER_D_PAGES,
  F: CHAPTER_F_PAGES,
};

export const CHAPTERS: Chapter[] = CHAPTER_CATALOG.map((c) => {
  const pages = LIVE_PAGES[c.id];
  if (!pages) return c;
  return {
    ...c,
    status: 'PUBLISHED',
    page_count: pages.length,
    kp_count: pages.reduce((n, p) => n + p.kps.length, 0),
    figure_count: pages.reduce((n, p) => n + p.figure_ids.length, 0),
  };
});

export const ALL_CHAPTER_PAGES: KnowledgePage[] = Object.values(LIVE_PAGES).flat();

export function getChapterPages(chapterId: string): KnowledgePage[] {
  return LIVE_PAGES[chapterId] || [];
}
