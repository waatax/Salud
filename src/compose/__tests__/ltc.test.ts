import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash, LTC_TABS, PILLAR_TABS } from '../../config/routes';
import { PILLAR_NAV } from '../../config/navigation';
import {
  LTC_CHAPTERS,
  LTC_QUIZ,
  LTC_MYTHS,
  LTC_SOURCES,
  LTC_CHAPTER_SOURCES,
  LTC_UNITS,
  LTC_PATHS,
  BARTHEL_ITEMS,
  barthelBand,
  CARE_QUOTA,
  RESPITE_QUOTA,
} from '../../data/ltcData';
import { QUICK_TIPS_BY_KEY } from '../../data/learning/quickTips';
import { getFourPillarsProfile } from '../../data/fourPillarsMatrix';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';

test('ltc: 14 chapters in tab order, each with quiz, myth, ≥2 sources and ≥3 takeaways', () => {
  assert.equal(LTC_TABS.length, 14);
  assert.deepEqual(LTC_CHAPTERS.map((c) => c.id), [...LTC_TABS]);
  assert.equal(PILLAR_TABS.ltc, LTC_TABS);
  for (const c of LTC_CHAPTERS) {
    const q = LTC_QUIZ[c.id];
    assert.ok(q && q.answer >= 0 && q.answer < q.options.length, `${c.id} quiz`);
    assert.ok(c.takeaways_zh.length >= 3, `${c.id} takeaways`);
    assert.ok(LTC_MYTHS.some((m) => m.chapter === c.id), `${c.id} myth`);
    const src = LTC_CHAPTER_SOURCES[c.id];
    assert.ok(src.length >= 2, `${c.id} needs ≥ 2 references`);
    for (const id of src) assert.ok(LTC_SOURCES[id], `${c.id} cites unknown source ${id}`);
  }
});

test('ltc: course map covers every chapter once in order; situation paths are valid', () => {
  assert.deepEqual(LTC_UNITS.flatMap((u) => u.chapters), [...LTC_TABS]);
  for (const p of LTC_PATHS) {
    assert.ok(p.chapters.length >= 3, `${p.label} too short`);
    for (const c of p.chapters) assert.ok(LTC_TABS.includes(c), `${p.label} → ${c}`);
  }
});

test('ltc: Barthel index sums to 100 and bands match the MOHW cut-offs', () => {
  assert.equal(BARTHEL_ITEMS.length, 10);
  assert.equal(BARTHEL_ITEMS.reduce((s, i) => s + i.options[0].score, 0), 100);
  assert.equal(barthelBand(0).label, '完全依賴');
  assert.equal(barthelBand(35).label, '嚴重依賴');
  assert.equal(barthelBand(60).label, '嚴重依賴');
  assert.equal(barthelBand(61).label, '中度依賴');
  assert.equal(barthelBand(95).label, '輕度依賴');
  assert.equal(barthelBand(100).label, '完全獨立');
});

test('ltc: benefit quotas match the published schedule', () => {
  assert.equal(CARE_QUOTA[2], 10020);
  assert.equal(CARE_QUOTA[8], 36180);
  assert.equal(RESPITE_QUOTA(6), 32340);
  assert.equal(RESPITE_QUOTA(7), 48510);
});

test('ltc: routes, navigation, tips, matrix and search are wired', () => {
  assert.deepEqual(parseHash('ltc/FOREIGN'), { kind: 'pillar', pillar: 'ltc', sub: ['FOREIGN'] });
  for (const alias of ['long-term-care', 'barthel', 'foreign-caregiver', 'nursing-home', '1966']) {
    assert.equal((parseHash(alias) as { pillar?: string }).pillar, 'ltc', alias);
  }
  assert.ok(PILLAR_NAV.some((p) => p.id === 'ltc' && p.group === 'care'));
  assert.ok(QUICK_TIPS_BY_KEY['ltc']);
  assert.equal(getFourPillarsProfile('ltc').page_id_or_topic, 'ltc');
  const docs = buildSearchIndex();
  const top = (q: string) => searchDocs(docs, q, 6).map((d) => d.target).join(' ');
  assert.match(top('巴氏量表'), /ltc\/ASSESS/);
  assert.match(top('外籍看護'), /ltc\/FOREIGN/);
  assert.match(top('護理之家'), /ltc\/FACILITY/);
  assert.match(top('喘息'), /ltc\/(CAREGIVER|BENEFITS)/);
});
