import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash, PILLAR_TABS, SYSTEM_SECTIONS, DISCIPLINE_HASH } from '../../config/routes';
import { QUICK_TIP_SECTIONS, QUICK_TIPS_BY_KEY, ALL_QUICK_TIPS } from '../../data/learning/quickTips';
import { STARTER_WEEKS, ALL_STARTER_TASKS } from '../../data/learning/starterPlan';
import { ALL_ACTION_IDS, resolveTip } from '../../data/learning/tipIndex';
import { LEARNING_TRACKS, LEARNING_GOALS, ALL_LESSONS, getTrack } from '../../data/learning/tracks';
import { EVIDENCE_UPDATES, getUpdate } from '../../data/learning/evidenceUpdates';
import { LAB_METRICS, TAIWAN_SCREENINGS } from '../../data/learning/checkup';
import { GLOSSARY } from '../../data/learning/glossary';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';
import { HUMAN_SYSTEMS } from '../../data/humanSystemsData';
import { ALL_CHAPTER_PAGES } from '../../data/chapters';
import { getDepartment } from '../../data/clinical/full';
import { SYMPTOMS } from '../../data/clinical/symptoms';
import { classifyBP, classifyBMI, classifyWHtR, classifyEGFR, classifyA1c, classifyFPG, countMetSyn } from '../../utils/labBands';
import { DISCOVERY_TOPICS, DISCOVERY_CATEGORIES, filterDiscoveryTopics } from '../../data/learning/discovery';

const PAGE_IDS = new Set(ALL_CHAPTER_PAGES.map((p) => p.id));
const SYSTEM_IDS = new Set(HUMAN_SYSTEMS.map((s) => s.id as string));

/** Resolve a hash all the way to a concrete destination, or explain why it is dead. */
function deadLinkReason(hash: string): string | null {
  const route = parseHash(hash);
  if (!route) return 'unparseable';
  switch (route.kind) {
    case 'learn': {
      if (!route.trackId) return null;
      const track = getTrack(route.trackId);
      if (!track) return `unknown track ${route.trackId}`;
      if (route.lessonId && !track.lessons.some((l) => l.id === route.lessonId)) return `unknown lesson ${route.lessonId}`;
      return null;
    }
    case 'chapter':
      return route.pageId && !PAGE_IDS.has(route.pageId) ? `unknown page ${route.pageId}` : null;
    case 'pillar': {
      const [a, b] = route.sub ?? [];
      if (route.pillar === 'systems') {
        if (a && !SYSTEM_IDS.has(a)) return `unknown system ${a}`;
        if (b && !(SYSTEM_SECTIONS as readonly string[]).includes(b)) return `unknown section ${b}`;
        return null;
      }
      if (route.pillar === 'updates') return a && !getUpdate(a) ? `unknown update ${a}` : null;
      if (route.pillar === 'home') return a && a !== 'plan' ? `unknown home anchor ${a}` : null;
      if (route.pillar === 'diet') return a && a !== 'patterns' ? `unknown diet view ${a}` : null;
      if (route.pillar === 'clinic') {
        if (!a) return null;
        if (a === 'by') return b === 'symptom' && route.sub?.[2] && !SYMPTOMS.some((s) => s.id === route.sub?.[2]) ? `unknown symptom ${route.sub?.[2]}` : null;
        const dept = getDepartment(a);
        if (!dept) return `unknown department ${a}`;
        return b && !dept.conditions.some((c) => c.id === b) ? `unknown condition ${a}/${b}` : null;
      }
      const tabs = PILLAR_TABS[route.pillar];
      if (a && !tabs) return `${route.pillar} has no tabs`;
      if (a && tabs && !tabs.includes(a)) return `unknown tab ${route.pillar}/${a}`;
      return null;
    }
    default:
      return null;
  }
}

test('routes: parseHash covers home, aliases, chapters and tabs', () => {
  assert.deepEqual(parseHash(''), { kind: 'pillar', pillar: 'home', sub: undefined });
  assert.deepEqual(parseHash('#running'), { kind: 'exercise', discipline: 'RUNNING' });
  assert.deepEqual(parseHash('exercise/table-tennis'), { kind: 'exercise', discipline: 'TABLE_TENNIS' });
  assert.deepEqual(parseHash('W/PAGE-W-03'), { kind: 'chapter', chapterId: 'W', pageId: 'PAGE-W-03' });
  assert.deepEqual(parseHash('about'), { kind: 'meta', view: 'about' });
  assert.deepEqual(parseHash('obesity/PHARMACOTHERAPY'), { kind: 'pillar', pillar: 'obesity', sub: ['PHARMACOTHERAPY'] });
  assert.deepEqual(parseHash('learn/eat/L-EAT-02'), { kind: 'learn', trackId: 'eat', lessonId: 'L-EAT-02' });
  assert.equal(parseHash('no-such-page'), null);
});

test('learning: ids are unique across lessons, updates, labs and screenings', () => {
  const ids = [
    ...LEARNING_TRACKS.map((t) => t.id),
    ...ALL_LESSONS.map((l) => l.id),
    ...EVIDENCE_UPDATES.map((u) => u.id),
    ...LAB_METRICS.map((m) => m.id),
    ...TAIWAN_SCREENINGS.map((s) => s.id),
  ];
  assert.equal(new Set(ids).size, ids.length);
});

test('learning: every lesson is complete and its quiz is answerable', () => {
  for (const l of ALL_LESSONS) {
    assert.ok(l.key_points_zh.length >= 4, `${l.id} needs ≥4 knowledge points`);
    assert.ok(l.do_today_zh.length >= 1, `${l.id} needs an action`);
    assert.ok(l.deep_links.length >= 1, `${l.id} needs a deep link`);
    assert.ok(l.minutes > 0 && l.minutes <= 10, `${l.id} should be a short lesson`);
    if (l.quiz) {
      assert.ok(l.quiz.options_zh.length >= 3, `${l.id} quiz needs ≥3 options`);
      assert.ok(l.quiz.answer >= 0 && l.quiz.answer < l.quiz.options_zh.length, `${l.id} quiz answer out of range`);
    }
  }
});

test('learning: no dead links from lessons, goals, updates, labs, glossary or search', () => {
  const dead: string[] = [];
  const check = (from: string, hash: string) => {
    const why = deadLinkReason(hash);
    if (why) dead.push(`${from} → #${hash} (${why})`);
  };
  for (const l of ALL_LESSONS) {
    for (const source of l.sources ?? []) {
      assert.match(source.url, /^https:\/\//, `${l.id} reference URL`);
      assert.ok(source.title.trim().length > 0, `${l.id} reference title`);
    }
    l.deep_links.forEach((d) => check(l.id, d.hash));
    (l.update_ids ?? []).forEach((u) => assert.ok(getUpdate(u), `${l.id} cites missing update ${u}`));
  }
  for (const g of LEARNING_GOALS) check(g.id, `learn/${g.track_id}${g.lesson_id ? `/${g.lesson_id}` : ''}`);
  for (const topic of DISCOVERY_TOPICS) check(`home topic ${topic.id}`, topic.hash);
  for (const u of EVIDENCE_UPDATES) if (u.related_hash) check(u.id, u.related_hash);
  for (const m of LAB_METRICS) if (m.related_hash) check(m.id, m.related_hash);
  for (const g of GLOSSARY) if (g.related_hash) check(g.term, g.related_hash);
  for (const d of buildSearchIndex()) if (!d.target.startsWith('modal:')) check(d.id, d.target);
  assert.deepEqual(dead, []);
});

test('home discovery: every topic remains reachable through category filters and expansion', () => {
  assert.equal(new Set(DISCOVERY_TOPICS.map(t => t.id)).size, DISCOVERY_TOPICS.length);
  const seen = new Set<string>();
  for (const category of DISCOVERY_CATEGORIES.filter(c => c.id !== 'all')) {
    const result = filterDiscoveryTopics(category.id, true);
    assert.ok(result.topics.length > 0, category.label);
    assert.ok(result.topics.every(t => t.category === category.id), category.label);
    result.topics.forEach(t => seen.add(t.id));
  }
  assert.equal(seen.size, DISCOVERY_TOPICS.length);
  assert.equal(filterDiscoveryTopics('all', true).topics.length, DISCOVERY_TOPICS.length);
});

test('learning: evidence updates carry a source and a plain-language meaning', () => {
  for (const u of EVIDENCE_UPDATES) {
    assert.match(u.date, /^20\d\d-(0[1-9]|1[0-2])$/, `${u.id} date`);
    assert.match(u.url, /^https:\/\//, `${u.id} url`);
    assert.ok(u.what_it_means_zh.length > 20, `${u.id} needs a real "what it means"`);
  }
});

test('search: finds the obvious destination for common lay queries', () => {
  const docs = buildSearchIndex();
  const top = (q: string) => searchDocs(docs, q, 5).map((d) => d.title).join(' | ');
  assert.match(top('LDL'), /LDL/);
  assert.match(top('失眠'), /失眠/);
  assert.match(top('糖化血色素'), /糖化血色素/);
  assert.equal(searchDocs(docs, '   ').length, 0);
});

test('labBands: blood pressure uses the higher category of the two numbers', () => {
  assert.equal(classifyBP(118, 76)?.label_zh, '正常');
  assert.equal(classifyBP(124, 78)?.label_zh, '血壓偏高');
  assert.equal(classifyBP(128, 84)?.label_zh, '第 1 期高血壓範圍');
  assert.equal(classifyBP(142, 70)?.label_zh, '第 2 期高血壓範圍');
  assert.equal(classifyBP(182, 100)?.tone, 'bad');
  assert.equal(classifyBP(0, 80), null);
});

test('labBands: glucose, BMI rounding, WHtR, eGFR and metabolic syndrome', () => {
  assert.equal(classifyFPG(99)?.label_zh, '正常');
  assert.equal(classifyFPG(100)?.label_zh, '糖尿病前期範圍');
  assert.equal(classifyA1c(6.5)?.label_zh, '糖尿病範圍');
  // 78 kg / 1.70 m = 26.99 → displayed 27.0 → must be 肥胖, not 過重
  const bmi = classifyBMI(78, 170);
  assert.equal(bmi?.value, 27);
  assert.equal(bmi?.label_zh, '肥胖');
  assert.equal(classifyWHtR(85, 170)?.label_zh, '風險上升');
  assert.equal(classifyWHtR(84, 170)?.label_zh, '理想');
  assert.equal(classifyEGFR(59)?.label_zh, 'G3a 輕中度下降');
  assert.deepEqual(countMetSyn({ sex: 'F', waistCm: 82, sys: 128, dia: 86, fpg: 95 }), { met: 2, known: 3 });
  assert.deepEqual(countMetSyn({ sex: 'M', hdl: 42, tg: 160 }), { met: 1, known: 2 });
});

test('search: a title match outranks keyword-only matches', () => {
  const docs = buildSearchIndex();
  const [first] = searchDocs(docs, '脫水', 5);
  assert.match(first.title, /脫水/);
});

test('tips: every section is actionable, with at least one move and one eat tip', () => {
  for (const sec of QUICK_TIP_SECTIONS) {
    assert.ok(sec.tips.length >= 4 && sec.tips.length <= 5, `${sec.key} should have 4–5 tips`);
    assert.ok(sec.tips.some((t) => t.kind === 'move'), `${sec.key} needs a move tip`);
    assert.ok(sec.tips.some((t) => t.kind === 'eat'), `${sec.key} needs an eat tip`);
    for (const t of sec.tips) {
      assert.ok(t.how_zh.length >= 10 && t.why_zh.length >= 10, `${t.id} needs a concrete how and why`);
    }
    assert.equal(deadLinkReason(sec.hash), null, `${sec.key} hash #${sec.hash} is dead`);
  }
});

test('tips: every section the UI can request exists', () => {
  const required = [
    'home',
    'checkup',
    'updates',
    'diet',
    'diet:W',
    'diet:O',
    'diet:A',
    'supplements',
    'sleep',
    'mental',
    'cardiometabolic',
    'obesity',
    'longevity',
    'ultrahealth',
    'start',
    'glossary',
    ...LEARNING_TRACKS.map((t) => `learn:${t.id}`),
    ...HUMAN_SYSTEMS.map((s) => `systems:${s.id}`),
    ...Object.keys(DISCIPLINE_HASH).map((d) => `exercise:${d}`),
  ];
  for (const key of required) assert.ok(QUICK_TIPS_BY_KEY[key], `missing tip section ${key}`);
});

test('action plan: ids never collide across tips, starter tasks and lesson actions', () => {
  const lessonActions = ALL_LESSONS.reduce((n, l) => n + l.do_today_zh.length, 0);
  const expected = ALL_QUICK_TIPS.length + ALL_STARTER_TASKS.length + lessonActions;
  assert.equal(new Set(ALL_QUICK_TIPS.map((t) => t.id)).size, ALL_QUICK_TIPS.length);
  assert.equal(ALL_ACTION_IDS().length, expected);
  assert.ok(resolveTip('START-W1-1'));
  assert.ok(resolveTip('L-EAT-01#0'));
  assert.equal(STARTER_WEEKS.length, 4);
  assert.deepEqual(parseHash('start'), { kind: 'pillar', pillar: 'start', sub: undefined });
  assert.deepEqual(parseHash('home/plan'), { kind: 'pillar', pillar: 'home', sub: ['plan'] });
});

// ── v6.4 & v6.5: plain-language hub openings, sport primers, page titles, lesson ↔ table pairing ──
import { HUB_PRIMERS } from '../../data/hubPrimers';
import { SPORT_PRIMERS, SPORT_GOALS } from '../../data/sportPrimers';
import { PILLAR_NAV as PILLAR_NAV_FOR_TITLES } from '../../config/navigation';
import { pageTitle, SITE_TITLE } from '../../config/pageTitle';
import { LESSON_TABLE_KEY } from '../../components/learn/LessonReferenceTable';

test('hub primers: all 10 hubs have three takeaways each, and every starter link resolves', () => {
  assert.equal(Object.keys(HUB_PRIMERS).length, 10);
  for (const [key, primer] of Object.entries(HUB_PRIMERS)) {
    assert.equal(primer.takeaways.length, 3, key);
    for (const t of primer.takeaways) assert.ok(t.length >= 12 && t.length <= 90, `${key}: takeaway length (${t.length})`);
    assert.ok(primer.lead.length <= 110, `${key}: lead is one short paragraph`);
    for (const text of [primer.title, primer.lead, ...primer.takeaways]) {
      assert.ok(!/旗艦|總樞紐|最強|100%|！/.test(text), `${key}: hype wording in "${text}"`);
    }
    if (!primer.starter) continue;
    const route = parseHash(primer.starter.hash);
    assert.ok(route, `${key}: starter hash ${primer.starter.hash}`);
    if (route.kind === 'learn') {
      const lesson = ALL_LESSONS.find((l) => l.id === route.lessonId);
      assert.ok(lesson && lesson.track_id === route.trackId, `${key}: starter lesson exists in its track`);
      assert.equal(primer.starter.label, lesson.title_zh, `${key}: starter label matches the lesson title`);
    }
  }
});

test('sport primers: all 9 exercise disciplines have plain-language primers, beginner steps, safety tips and valid starter lessons', () => {
  const disciplines = Object.keys(DISCIPLINE_HASH);
  assert.equal(Object.keys(SPORT_PRIMERS).length, disciplines.length);
  for (const d of disciplines) {
    const primer = SPORT_PRIMERS[d as keyof typeof SPORT_PRIMERS];
    assert.ok(primer, `missing sport primer for ${d}`);
    assert.equal(primer.benefits_zh.length, 3, `${d}: needs 3 benefits`);
    assert.ok(primer.beginner_step_zh.length >= 15, `${d}: needs beginner step`);
    assert.ok(primer.injury_tip_zh.length >= 15, `${d}: needs injury tip`);
    const route = parseHash(primer.starter_lesson.hash);
    assert.ok(route && route.kind === 'learn', `${d}: starter lesson hash resolves`);
    const lesson = ALL_LESSONS.find((l) => l.id === route.lessonId);
    assert.ok(lesson, `${d}: starter lesson exists`);
    assert.equal(primer.starter_lesson.label, lesson.title_zh, `${d}: starter label matches lesson title`);
  }
  assert.ok(SPORT_GOALS.length >= 5);
  for (const g of SPORT_GOALS) {
    assert.equal(g.recommended.length, 3, g.id);
    for (const rec of g.recommended) {
      assert.ok(SPORT_PRIMERS[rec], `${g.id} recommends valid discipline ${rec}`);
    }
  }
  assert.deepEqual(parseHash('exercise/strength-training'), { kind: 'exercise', discipline: 'STRENGTH_TRAINING' });
  assert.deepEqual(parseHash('exercise/mobility-fascia'), { kind: 'exercise', discipline: 'MOBILITY_FASCIA' });
  assert.deepEqual(parseHash('ultrahealth/HABITS'), { kind: 'pillar', pillar: 'ultrahealth', sub: ['HABITS'] });
});

test('page titles name the page on screen', () => {
  assert.equal(pageTitle({ activePillar: 'home' }), SITE_TITLE);
  assert.ok(pageTitle({ activePillar: 'sleep' }).startsWith('睡眠｜'));
  assert.ok(pageTitle({ activePillar: 'learn', learnTrackId: 'eat', learnLessonId: 'L-EAT-02' }).startsWith('蛋白質'));
  assert.ok(pageTitle({ activePillar: 'exercise', exerciseSubTab: 'RUNNING' }).startsWith('跑步・運動'));
  assert.ok(pageTitle({ activePillar: 'exercise', exerciseSubTab: 'PHYSIOLOGY' }).startsWith('運動｜'));
  assert.ok(pageTitle({ activePillar: 'home', metaView: 'about' }).startsWith('關於 Salud'));
  for (const p of PILLAR_NAV_FOR_TITLES) assert.notEqual(pageTitle({ activePillar: p.id }), '', p.id);
});

test('lesson tables: remapped lessons point at an existing table, never at themselves', () => {
  const ids = new Set(ALL_LESSONS.map((l) => l.id));
  for (const [lessonId, key] of Object.entries(LESSON_TABLE_KEY)) {
    assert.ok(ids.has(lessonId), `${lessonId} is a real lesson`);
    assert.notEqual(key, lessonId);
  }
});
