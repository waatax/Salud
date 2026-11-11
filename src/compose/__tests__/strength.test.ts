import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash, STRENGTH_TABS, PILLAR_TABS } from '../../config/routes';
import { PILLAR_NAV } from '../../config/navigation';
import { pageTitle } from '../../config/pageTitle';
import {
  STRENGTH_CHAPTERS,
  STRENGTH_QUIZ,
  STRENGTH_MYTHS,
  STRENGTH_SOURCES,
  STRENGTH_CHAPTER_SOURCES,
  STRENGTH_UNITS,
  MODULE_OUTLINES,
  M1_PRACTICE,
  MOCK_EXAM,
  GOAL_VARIABLES,
  ENERGY_SYSTEMS,
  PERIODIZATION,
  BASKETBALL_PLAN,
  M4_COMPARE,
  DEADLIFT_HANDOUT,
} from '../../data/strengthCoachData';
import { QUICK_TIPS_BY_KEY } from '../../data/learning/quickTips';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';

test('strength: 6 chapters in tab order, each with quiz, ≥2 sources and ≥3 takeaways; every module has an outline and prompt', () => {
  assert.deepEqual(STRENGTH_CHAPTERS.map((c) => c.id), [...STRENGTH_TABS]);
  assert.equal(PILLAR_TABS.strength, STRENGTH_TABS);
  assert.deepEqual(STRENGTH_UNITS.flatMap((u) => u.chapters), [...STRENGTH_TABS]);
  for (const c of STRENGTH_CHAPTERS) {
    assert.ok(c.takeaways_zh.length >= 3, c.id);
    const q = STRENGTH_QUIZ[c.id];
    assert.ok(q.answer >= 0 && q.answer < q.options.length, c.id);
    const ids = STRENGTH_CHAPTER_SOURCES[c.id];
    assert.ok(ids.length >= 2, c.id);
    for (const id of ids) assert.ok(STRENGTH_SOURCES[id], `${c.id} → ${id}`);
    assert.ok(STRENGTH_MYTHS.some((m) => m.chapter === c.id), `myth for ${c.id}`);
  }
  for (const tab of STRENGTH_TABS.filter((t) => t !== 'OVERVIEW') as Exclude<(typeof STRENGTH_TABS)[number], 'OVERVIEW'>[]) {
    const o = MODULE_OUTLINES[tab];
    assert.ok(o.topics.length >= 2 && o.prompt.length > 40, tab);
  }
});

test('strength: deep-research deliverables match what each prompt asked for', () => {
  assert.equal(M1_PRACTICE.length, 3); // 3 題高難度情境題
  assert.ok(MOCK_EXAM.length >= 15);
  for (const q of [...M1_PRACTICE.map((m) => ({ options: m.options, answer: m.answer })), ...MOCK_EXAM]) {
    assert.ok(q.answer >= 0 && q.answer < q.options.length);
  }
  assert.equal(ENERGY_SYSTEMS.length, 3);
  assert.ok(ENERGY_SYSTEMS.every((e) => e.wr && e.example && e.fuel));
  // 4-week plan: every row has all four weeks and a rest interval
  assert.ok(BASKETBALL_PLAN.every((r) => r.w1 && r.w2 && r.w3 && r.w4 && r.rest));
  assert.equal(M4_COMPARE.length, 3);
  assert.ok(M4_COMPARE.every((r) => r.cause && r.cue && r.step1 && r.step2));
  assert.equal(DEADLIFT_HANDOUT.length, 3);
});

test('strength: key numbers follow NSCA (strength ≥85%, ≤6 reps; first transition = strength/power)', () => {
  const strength = GOAL_VARIABLES.find((g) => g.goal === '最大肌力')!;
  assert.equal(strength.load, '≥85%');
  assert.equal(strength.reps, '≤6');
  assert.equal(PERIODIZATION.find((p) => p.period === '第一轉換期')!.phase, '肌力／爆發力期');
  // 5RM 100 kg at 87% ≈ 115 kg
  const q = MOCK_EXAM.find((m) => m.q.includes('5RM'))!;
  assert.equal(q.options[q.answer], '115 kg');
});

test('strength: routes, navigation, title, tips and search are wired', () => {
  assert.deepEqual(parseHash('strength'), { kind: 'pillar', pillar: 'strength', sub: undefined });
  assert.deepEqual(parseHash('strength/M3_TECHNIQUE'), { kind: 'pillar', pillar: 'strength', sub: ['M3_TECHNIQUE'] });
  assert.equal((parseHash('tsca') as { pillar?: string }).pillar, 'strength');
  // the existing exercise discipline keeps its own deep link
  assert.deepEqual(parseHash('exercise/strength'), { kind: 'exercise', discipline: 'STRENGTH_TRAINING' });
  assert.ok(PILLAR_NAV.some((p) => p.id === 'strength' && p.label_zh === '肌力訓練'));
  assert.match(pageTitle({ activePillar: 'strength' }), /肌力訓練/);
  assert.ok(QUICK_TIPS_BY_KEY['strength']);
  const docs = buildSearchIndex();
  const top = (q: string) => searchDocs(docs, q, 6).map((d) => d.target).join(' ');
  assert.match(top('TSCA'), /strength\//);
  assert.match(top('爆發上膊'), /strength\/M3_TECHNIQUE/);
  assert.match(top('週期化'), /strength\/M2_PROGRAM/);
});
