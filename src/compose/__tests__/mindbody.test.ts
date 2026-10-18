import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash, MINDBODY_TABS, PILLAR_TABS } from '../../config/routes';
import { MINDBODY_CHAPTERS, MINDBODY_QUIZ, MINDBODY_MYTHS, MINDBODY_CHAPTER_SOURCES, MB_SOURCES, SCHEDULE_ANCHORS, SAFETY_MATRIX, PRACTICE_COLUMNS } from '../../data/mindbodyData';
import { QUICK_TIPS_BY_KEY } from '../../data/learning/quickTips';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';
import { getFourPillarsProfile } from '../../data/fourPillarsMatrix';
import { diaryNight, summarise, titrate, toMin, fmtClock, MIN_WINDOW } from '../../utils/sleepDiary';

test('mindbody: routes and aliases land on the zone', () => {
  assert.deepEqual(parseHash('mindbody/KAPALABHATI'), { kind: 'pillar', pillar: 'mindbody', sub: ['KAPALABHATI'] });
  for (const alias of ['kapalabhati', 'tuna', 'qigong', 'mindfulness', 'meditation', 'insomnia', 'mind-body']) {
    assert.equal((parseHash(alias) as { pillar?: string }).pillar, 'mindbody', alias);
  }
  assert.equal(PILLAR_TABS.mindbody, MINDBODY_TABS);
});

test('mindbody: every chapter is complete — quiz, sources, takeaways', () => {
  assert.deepEqual(
    MINDBODY_CHAPTERS.map((c) => c.id),
    [...MINDBODY_TABS],
  );
  for (const c of MINDBODY_CHAPTERS) {
    assert.ok(c.takeaways_zh.length >= 3, `${c.id} needs ≥ 3 takeaways`);
    assert.ok(c.learn_zh.length >= 3, `${c.id} needs ≥ 3 learning goals`);
    const q = MINDBODY_QUIZ[c.id];
    assert.ok(q && q.answer >= 0 && q.answer < q.options.length, `${c.id} quiz answer out of range`);
    const srcs = MINDBODY_CHAPTER_SOURCES[c.id];
    assert.ok(srcs.length >= 3, `${c.id} needs ≥ 3 references`);
    for (const id of srcs) assert.ok(MB_SOURCES[id], `${c.id} cites unknown source ${id}`);
  }
  for (const m of MINDBODY_MYTHS) assert.ok((MINDBODY_TABS as readonly string[]).includes(m.chapter));
  for (const s of Object.values(MB_SOURCES)) assert.match(s.url, /^https:\/\//);
});

test('mindbody: safety matrix rows cover every practice column', () => {
  for (const r of SAFETY_MATRIX) assert.equal(r.levels.length, PRACTICE_COLUMNS.length, r.condition);
  // Kapalabhati is never "ok" for pregnancy, uncontrolled hypertension, heart disease or epilepsy.
  const kap = PRACTICE_COLUMNS.indexOf('卡帕拉巴提');
  for (const cond of ['懷孕', '高血壓（未控制）', '心臟病、心律不整', '癲癇']) {
    assert.equal(SAFETY_MATRIX.find((r) => r.condition === cond)?.levels[kap], 'avoid', cond);
  }
});

test('mindbody: schedule anchors are ordered sensibly for a 07:00 wake / 23:30 bed', () => {
  const wake = toMin('07:00');
  const bed = toMin('23:30');
  const at = (id: string) => {
    const a = SCHEDULE_ANCHORS.find((x) => x.id === id)!;
    return ((a.from === 'wake' ? wake : bed) + a.offset + 1440) % 1440;
  };
  assert.equal(fmtClock(at('caffeine')), '14:30'); // ≥ 8.8 h before bed (Gardiner 2023)
  assert.equal(fmtClock(at('dinner')), '20:30');
  assert.ok(at('bath') < at('screens') && at('screens') < bed);
});

test('mindbody: quick tips, four-pillar profile and search all reach the zone', () => {
  const sec = QUICK_TIPS_BY_KEY['mindbody'];
  assert.ok(sec && sec.tips.length === 5);
  assert.equal(getFourPillarsProfile('mindbody').page_id_or_topic, 'mindbody');
  const docs = buildSearchIndex();
  for (const [q, target] of [
    ['卡帕拉巴提', 'mindbody/KAPALABHATI'],
    ['卡酪梨', 'mindbody/KAPALABHATI'],
    ['火呼吸', 'mindbody/KAPALABHATI'],
    ['吐納', 'mindbody/TUNA'],
    ['六字訣', 'mindbody/TUNA'],
    ['正念冥想', 'mindbody/MINDFULNESS'],
    ['睡眠日記', 'mindbody/CAPD_PLAN'],
  ] as const) {
    const hits = searchDocs(docs, q, 5);
    assert.ok(
      hits.some((h) => h.target === target),
      `search「${q}」should reach #${target}, got ${hits.map((h) => h.target).join(', ')}`,
    );
  }
});

test('sleepDiary: nights across midnight, pooled efficiency', () => {
  assert.deepEqual(diaryNight({ bed: '23:00', out: '07:00', latency: 30, waso: 30 }), { tib: 480, tst: 420, se: 420 / 480 });
  assert.equal(diaryNight({ bed: '23:00', out: '', latency: 0, waso: 0 }), null);
  assert.equal(diaryNight({ bed: '07:00', out: '07:30', latency: 0, waso: 0 }), null); // implausible
  const sum = summarise([{ tib: 480, tst: 360, se: 0.75 }, { tib: 360, tst: 360, se: 1 }, null]);
  assert.equal(sum?.n, 2);
  assert.equal(sum?.se, 720 / 840);
});

test('sleepDiary: CBT-I titration rules', () => {
  assert.equal(titrate(430, 0.92, 465).nextTib, 480); // ≥ 90 % → +15
  assert.equal(titrate(400, 0.87, 465).nextTib, 465); // 85–90 % → keep
  assert.equal(titrate(380, 0.8, 435).nextTib, 420); // < 85 %, close → −15
  assert.equal(titrate(380, 0.79, 480).nextTib, 390); // far over → window ≈ sleep, rounded up to 15
  assert.equal(titrate(200, 0.5, 400).nextTib, MIN_WINDOW); // never under 5 h
});
