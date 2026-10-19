import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS, getChapterPages } from '../../data/chapters';
import { CHAPTER_KNOWLEDGE_CONFIGS } from '../../data/chapterKnowledgeConfig';
import { CURRICULUM_FIGURES, chartToTable } from '../../data/curriculumFigures';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';

// SALUD spec §5.1 page targets for the 11 nutrition chapters.
const SPEC_PAGES: Record<string, number> = { W: 12, O: 12, A: 13, E: 10, P: 8, C: 10, S: 8, N: 8, M: 12, D: 10, F: 12 };
const COMPLETED = ['E', 'P', 'C', 'S', 'N', 'M', 'D', 'F'];

test('curriculum: every chapter meets the spec page target', () => {
  for (const ch of CHAPTERS) {
    const pages = getChapterPages(ch.id);
    assert.ok(pages.length >= SPEC_PAGES[ch.id], `${ch.id} has ${pages.length} < ${SPEC_PAGES[ch.id]} pages`);
    assert.deepEqual(
      pages.map((p) => p.order_index),
      pages.map((_, i) => i + 1),
      `${ch.id} page order must be 1..n`,
    );
  }
});

test('curriculum: knowledge points, quizzes and figure references are consistent', () => {
  const kpIds = new Set<string>();
  for (const ch of CHAPTERS) {
    for (const p of getChapterPages(ch.id)) {
      assert.ok(p.kps.length >= 3, `${p.id} needs ≥ 3 KPs`);
      assert.ok(p.quiz_items.length >= 1, `${p.id} needs a quiz`);
      for (const k of p.kps) {
        assert.ok(!kpIds.has(k.id), `duplicate KP ${k.id}`);
        kpIds.add(k.id);
      }
      for (const q of p.quiz_items) {
        assert.ok(q.correct_index >= 0 && q.correct_index < q.options.length, `${q.id} answer out of range`);
        assert.ok(p.kps.some((k) => k.id === q.kp_id), `${q.id} points at a KP not on ${p.id}`);
      }
    }
  }
});

test('curriculum: completed chapters use bespoke charts with on-page figure links', () => {
  for (const id of COMPLETED) {
    for (const p of getChapterPages(id)) {
      assert.ok(p.figure_ids.length >= 2, `${p.id} needs ≥ 2 figures`);
      for (const f of p.figure_ids) {
        const fig = CURRICULUM_FIGURES[f];
        assert.ok(fig, `${f} has no bespoke chart`);
        assert.ok(fig.takeaway && fig.caption, `${f} needs caption and takeaway`);
        assert.ok(chartToTable(fig.chart).rows.length > 0, `${f} has an empty data table`);
      }
      for (const k of p.kps) for (const f of k.figure_ids) assert.ok(p.figure_ids.includes(f), `${k.id} cites ${f} off-page`);
    }
  }
});

test('curriculum: completed chapters have working filter chips, constants and pathway', () => {
  for (const id of COMPLETED) {
    const cfg = CHAPTER_KNOWLEDGE_CONFIGS[id as keyof typeof CHAPTER_KNOWLEDGE_CONFIGS];
    const pages = getChapterPages(id);
    const ids = new Set(pages.map((p) => p.id));
    for (const c of cfg.categories) {
      if (c.id !== 'all') assert.ok(pages.some((p) => p.category === c.id), `${id} chip ${c.id} matches no page`);
    }
    for (const p of pages) assert.ok(cfg.categories.some((c) => c.id === p.category), `${p.id} category ${p.category} has no chip`);
    for (const k of cfg.clinicalConstants) assert.ok(ids.has(k.targetPage), `${id} constant ${k.id} → ${k.targetPage}`);
    const onPath = new Set(cfg.learningPathway.flatMap((s) => s.targetPages));
    for (const p of pages) assert.ok(onPath.has(p.id), `${p.id} missing from the learning pathway`);
  }
});

test('curriculum: new pages are reachable from search', () => {
  const docs = buildSearchIndex();
  const top = (q: string) => searchDocs(docs, q, 8).map((d) => d.target).join(' ');
  assert.match(top('肌少症'), /P\/PAGE-P-04/);
  assert.match(top('FODMAP'), /C\/PAGE-C-08/);
  assert.match(top('722'), /N\/PAGE-N-06/);
  assert.match(top('葉酸'), /M\/PAGE-M-06/);
  assert.match(top('超加工'), /PAGE-D-08|PAGE-E-09/);
  assert.match(top('過敏原'), /F\/PAGE-F-04/);
});
