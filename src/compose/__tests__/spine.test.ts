import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash, SPINE_TABS, GASTRO_TABS, ONCOLOGY_TABS } from '../../config/routes';
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
import {
  GASTRO_CHAPTERS,
  GASTRO_UNITS,
  GASTRO_PATHS,
  GASTRO_QUIZ,
  GASTRO_MYTHS,
  GASTRO_SOURCES,
  GASTRO_CHAPTER_SOURCES,
} from '../../data/gastroData';
import {
  ONCOLOGY_COURSE_CHAPTERS,
  ONCOLOGY_UNITS,
  ONCOLOGY_PATHS,
  ONCOLOGY_QUIZ,
  ONCOLOGY_MYTHS,
  ONCOLOGY_SOURCES,
  ONCOLOGY_CHAPTER_SOURCES,
} from '../../data/oncologyData';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';
import { LEARNING_TRACKS, ALL_LESSONS } from '../../data/learning/tracks';

test('spine & neuro-orthopedics: 20 chapters in tab order, each with quiz, sources and takeaways', () => {
  assert.equal(SPINE_TABS.length, 20);
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

test('spine: care tools have content and new neuro-ortho routes resolve', () => {
  assert.ok(HOME_SAFETY_ITEMS.length >= 8);
  assert.equal(IBP_CRITERIA.length, 5);
  for (const t of [
    'spine/ACUTE',
    'spine/CHRONIC',
    'spine/CAREGIVER',
    'spine/SPECIAL',
    'spine/PERIPHERAL_NERVE',
    'spine/KNEE_HIP_OA',
    'spine/SHOULDER_UPPER',
    'spine/ANKLE_FOOT_NEURO',
  ]) {
    assert.deepEqual(parseHash(t), { kind: 'pillar', pillar: 'spine', sub: [t.split('/')[1]] });
  }
  for (const alias of ['scoliosis', 'caregiver', 'spine-care', 'neuro-ortho', 'orthopedics', 'carpal-tunnel', 'knee', 'shoulder']) {
    assert.equal((parseHash(alias) as { pillar?: string }).pillar, 'spine');
  }
});

test('gastro: 12 chapters across 5 units, each with quiz, sources, takeaways and valid paths', () => {
  assert.equal(GASTRO_TABS.length, 12);
  assert.deepEqual(GASTRO_CHAPTERS.map((c) => c.id), [...GASTRO_TABS]);
  const flat = GASTRO_UNITS.flatMap((u) => u.chapters);
  assert.deepEqual(flat, [...GASTRO_TABS]);
  for (const c of GASTRO_CHAPTERS) {
    const q = GASTRO_QUIZ[c.id];
    assert.ok(q && q.answer >= 0 && q.answer < q.options.length, `gastro ${c.id} quiz`);
    assert.ok(c.takeaways_zh.length >= 3, `gastro ${c.id} takeaways`);
    const refs = GASTRO_CHAPTER_SOURCES[c.id] ?? [];
    assert.ok(refs.length >= 2, `gastro ${c.id} needs ≥ 2 references`);
    for (const id of refs) assert.ok(GASTRO_SOURCES[id], `gastro ${c.id} cites unknown source ${id}`);
  }
  for (const m of GASTRO_MYTHS) assert.ok(GASTRO_TABS.includes(m.chapter), `gastro myth on unknown chapter ${m.chapter}`);
  for (const p of GASTRO_PATHS) {
    assert.ok(p.chapters.length >= 3, `${p.label} too short`);
    for (const c of p.chapters) assert.ok(GASTRO_TABS.includes(c), `${p.label} → ${c}`);
  }
});

test('oncology: 12 chapters across 5 units, each with quiz, sources, takeaways and valid paths', () => {
  assert.equal(ONCOLOGY_TABS.length, 12);
  assert.deepEqual(ONCOLOGY_COURSE_CHAPTERS.map((c) => c.id), [...ONCOLOGY_TABS]);
  const flat = ONCOLOGY_UNITS.flatMap((u) => u.chapters);
  assert.deepEqual(flat, [...ONCOLOGY_TABS]);
  for (const c of ONCOLOGY_COURSE_CHAPTERS) {
    const q = ONCOLOGY_QUIZ[c.id];
    assert.ok(q && q.answer >= 0 && q.answer < q.options.length, `oncology ${c.id} quiz`);
    assert.ok(c.takeaways_zh.length >= 3, `oncology ${c.id} takeaways`);
    const refs = ONCOLOGY_CHAPTER_SOURCES[c.id] ?? [];
    assert.ok(refs.length >= 2, `oncology ${c.id} needs ≥ 2 references`);
    for (const id of refs) assert.ok(ONCOLOGY_SOURCES[id], `oncology ${c.id} cites unknown source ${id}`);
  }
  for (const m of ONCOLOGY_MYTHS) assert.ok(ONCOLOGY_TABS.includes(m.chapter), `oncology myth on unknown chapter ${m.chapter}`);
  for (const p of ONCOLOGY_PATHS) {
    assert.ok(p.chapters.length >= 3, `${p.label} too short`);
    for (const c of p.chapters) assert.ok(ONCOLOGY_TABS.includes(c), `${p.label} → ${c}`);
  }
});

test('search: spine, neuro-ortho, gastro and oncology topics are searchable', () => {
  const docs = buildSearchIndex();
  const top = (q: string) => searchDocs(docs, q, 8).map((d) => d.target).join(' ');
  assert.match(top('翻身'), /spine\/CAREGIVER/);
  assert.match(top('壓瘡'), /spine\/CAREGIVER/);
  assert.match(top('閃到腰'), /spine\/ACUTE/);
  assert.match(top('脊椎側彎'), /spine\/SPECIAL/);
  assert.match(top('腕隧道'), /spine\/PERIPHERAL_NERVE/);
  assert.match(top('退化性膝關節炎'), /spine\/KNEE_HIP_OA/);
  assert.match(top('五十肩'), /spine\/SHOULDER_UPPER/);
  assert.match(top('足底筋膜炎'), /spine\/ANKLE_FOOT_NEURO/);
  assert.match(top('胃食道逆流'), /gastro\/GERD_ULCER/);
  assert.match(top('幽門螺旋桿菌'), /gastro\/HP_GASTRIC/);
  assert.match(top('腸躁症'), /gastro\/IBS_FODMAP/);
  assert.match(top('膽結石'), /gastro\/GALLBLADDER_BILE/);
  assert.match(top('肺腺癌'), /oncology\/LUNG_CANCER/);
  assert.match(top('乳癌'), /oncology\/BREAST_CANCER/);
  assert.match(top('攝護腺癌'), /oncology\/GYN_URO_CANCERS/);
  assert.match(top('質子治療'), /oncology\/PRECISION_THERAPY/);
});

test('navigation: learning-track blurb matches the real track and lesson counts', () => {
  const learn = PILLAR_NAV.find((p) => p.id === 'learn');
  assert.ok(learn);
  assert.equal(learn.blurb_zh, `${LEARNING_TRACKS.length} 路徑 ${ALL_LESSONS.length} 課`);
});
