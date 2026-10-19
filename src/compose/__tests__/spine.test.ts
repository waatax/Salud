import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash, SPINE_TABS } from '../../config/routes';
import { PILLAR_NAV } from '../../config/navigation';
import { SPINE_QUIZ, SPINE_MYTHS } from '../../data/spineData';
import {
  SPINE_COURSE_CHAPTERS,
  SPINE_CARE_QUIZ,
  SPINE_CARE_MYTHS,
  SPINE_CARE_CHAPTER_SOURCES,
  ALL_SPINE_SOURCES,
  SPINE_UNITS,
  SPINE_PATHS,
  HOME_SAFETY_ITEMS,
  IBP_CRITERIA,
} from '../../data/spineCareData';
import { CHAPTER_SOURCES } from '../../components/pillars/spine/SpineChapters';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';
import { LEARNING_TRACKS, ALL_LESSONS } from '../../data/learning/tracks';

test('spine: 16 chapters in tab order, each with quiz, sources and takeaways', () => {
  assert.equal(SPINE_TABS.length, 16);
  assert.deepEqual(SPINE_COURSE_CHAPTERS.map((c) => c.id), [...SPINE_TABS]);
  const quiz = { ...SPINE_QUIZ, ...SPINE_CARE_QUIZ };
  const sources = { ...CHAPTER_SOURCES, ...SPINE_CARE_CHAPTER_SOURCES } as Record<string, string[]>;
  for (const c of SPINE_COURSE_CHAPTERS) {
    const q = quiz[c.id];
    assert.ok(q && q.answer >= 0 && q.answer < q.options.length, `${c.id} quiz`);
    assert.ok(c.takeaways_zh.length >= 3, `${c.id} takeaways`);
    assert.ok((sources[c.id] ?? []).length >= 2, `${c.id} needs ≥ 2 references`);
    for (const id of sources[c.id]) assert.ok(ALL_SPINE_SOURCES[id], `${c.id} cites unknown source ${id}`);
  }
  for (const m of [...SPINE_MYTHS, ...SPINE_CARE_MYTHS]) assert.ok(SPINE_TABS.includes(m.chapter), `myth on unknown chapter ${m.chapter}`);
});

test('spine: course map covers every chapter exactly once, in tab order; paths are valid', () => {
  const flat = SPINE_UNITS.flatMap((u) => u.chapters);
  assert.deepEqual(flat, [...SPINE_TABS]);
  for (const p of SPINE_PATHS) {
    assert.ok(p.chapters.length >= 3, `${p.label} too short`);
    for (const c of p.chapters) assert.ok(SPINE_TABS.includes(c), `${p.label} → ${c}`);
  }
});

test('spine: care tools have content and new routes resolve', () => {
  assert.ok(HOME_SAFETY_ITEMS.length >= 8);
  assert.equal(IBP_CRITERIA.length, 5);
  for (const t of ['spine/ACUTE', 'spine/CHRONIC', 'spine/CAREGIVER', 'spine/SPECIAL']) {
    assert.deepEqual(parseHash(t), { kind: 'pillar', pillar: 'spine', sub: [t.split('/')[1]] });
  }
  for (const alias of ['scoliosis', 'caregiver', 'spine-care']) assert.equal((parseHash(alias) as { pillar?: string }).pillar, 'spine');
});

test('spine: caregiving and special-group topics are searchable', () => {
  const docs = buildSearchIndex();
  const top = (q: string) => searchDocs(docs, q, 6).map((d) => d.target).join(' ');
  assert.match(top('翻身'), /spine\/CAREGIVER/);
  assert.match(top('壓瘡'), /spine\/CAREGIVER/);
  assert.match(top('閃到腰'), /spine\/ACUTE/);
  assert.match(top('脊椎側彎'), /spine\/SPECIAL/);
  assert.match(top('僵直性脊椎炎'), /spine\/SPECIAL/);
  assert.match(top('慢性疼痛'), /spine\/CHRONIC/);
});

test('navigation: learning-track blurb matches the real track and lesson counts', () => {
  const learn = PILLAR_NAV.find((p) => p.id === 'learn');
  assert.ok(learn);
  assert.equal(learn.blurb_zh, `${LEARNING_TRACKS.length} 路徑 ${ALL_LESSONS.length} 課`);
});
