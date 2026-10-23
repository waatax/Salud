import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  OSTEO_KP_GROUPS,
  OSTEO_RISK_TIERS,
  OSTEO_NUTRIENT_EVIDENCE,
  OSTEO_DRUG_EFFICACY,
  CALCIUM_FOODS,
  ostaIndex,
  ostaBand,
} from '../../data/osteoData';
import { ALL_SPINE_SOURCES } from '../../data/spineCareData';
import { CHAPTER_SOURCES } from '../../components/pillars/spine/SpineChapters';
import { SPINE_CHAPTERS } from '../../data/spineData';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';

test('osteo: 11 knowledge points in four stages with unique ids', () => {
  const ids = OSTEO_KP_GROUPS.flatMap((g) => g.items.map((i) => i.id));
  assert.equal(OSTEO_KP_GROUPS.length, 4);
  assert.equal(ids.length, 11);
  assert.equal(new Set(ids).size, 11);
});

test('osteo: OSTA index and bands follow Koh 2001 cut-offs', () => {
  assert.equal(ostaIndex(52, 65), -2.6);
  assert.equal(ostaBand(ostaIndex(40, 75)), 'high'); // -7
  assert.equal(ostaBand(-4), 'mid');
  assert.equal(ostaBand(-1), 'mid');
  assert.equal(ostaBand(-0.8), 'low');
});

test('osteo: tiers, efficacy and food data are sane', () => {
  assert.deepEqual(OSTEO_RISK_TIERS.map((t) => t.key), ['low', 'mid', 'high', 'veryhigh']);
  for (const d of OSTEO_DRUG_EFFICACY) assert.ok(d.vert > 0 && d.vert < 100, d.name);
  for (const f of CALCIUM_FOODS) assert.ok(f.mg > 0 && f.mg < 500, f.name);
  // supplements without fracture evidence must not be graded A/B
  for (const n of OSTEO_NUTRIENT_EVIDENCE.filter((x) => /K2|膠原|硼|鍶|鎂/.test(x.name))) assert.ok(!['A', 'B'].includes(n.grade), n.name);
});

test('osteo: chapter cites known sources and is searchable', () => {
  for (const id of CHAPTER_SOURCES.OSTEOPOROSIS) assert.ok(ALL_SPINE_SOURCES[id], id);
  assert.ok(SPINE_CHAPTERS.find((c) => c.id === 'OSTEOPOROSIS')!.takeaways_zh.length >= 5);
  const docs = buildSearchIndex();
  for (const q of ['OSTA', '鈣片', '藥物假期', '顎骨壞死']) {
    assert.match(searchDocs(docs, q, 6).map((d) => d.target).join(' '), /spine\/OSTEOPOROSIS/, q);
  }
});
