import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTER_CATALOG } from '../../data/chapterCatalog';
import { CHAPTERS, getChapterPages } from '../../data/chapters';
import { LOADERS, getLoadedChapterPages, getLoadedPage, loadChapterPages } from '../../data/chapterPages';

// The app reads titles and counts from CHAPTER_CATALOG and loads pages one chapter at a
// time, so the hand-kept counts must equal the real page data.
test('chapter catalog: page / KP / figure counts equal the real page data', () => {
  assert.deepEqual(
    CHAPTER_CATALOG.map((c) => c.id).sort(),
    CHAPTERS.map((c) => c.id).sort()
  );
  for (const c of CHAPTER_CATALOG) {
    const pages = getChapterPages(c.id);
    assert.equal(c.page_count, pages.length, `${c.id} page_count`);
    assert.equal(c.kp_count, pages.reduce((n, p) => n + p.kps.length, 0), `${c.id} kp_count`);
    assert.equal(c.figure_count, pages.reduce((n, p) => n + p.figure_ids.length, 0), `${c.id} figure_count`);
  }
});

test('chapter catalog: pages are numbered 01..page_count so prev/next navigation is contiguous', () => {
  for (const c of CHAPTER_CATALOG) {
    const ids = getChapterPages(c.id).map((p) => p.id).sort();
    const expected = Array.from({ length: c.page_count }, (_, i) => `PAGE-${c.id}-${String(i + 1).padStart(2, '0')}`);
    assert.deepEqual(ids, expected, `${c.id} page ids`);
  }
});

test('chapter pages: every loader resolves to the same pages as the full set', async () => {
  assert.deepEqual(Object.keys(LOADERS).sort(), CHAPTER_CATALOG.map((c) => c.id).sort());
  for (const c of CHAPTER_CATALOG) {
    const pages = await LOADERS[c.id]();
    assert.deepEqual(pages.map((p) => p.id), getChapterPages(c.id).map((p) => p.id), `${c.id} loader`);
    assert.equal((await loadChapterPages(c.id)).length, c.page_count);
    assert.ok(getLoadedChapterPages(c.id));
    assert.equal(getLoadedPage(pages[0].id), pages[0]);
  }
});
