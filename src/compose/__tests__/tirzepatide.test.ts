import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  assessFit,
  AE_RATES,
  DOSE_STEPS,
  MAINTAIN_ARMS,
  POPULATION_RESULTS,
  projectLoss,
  proteinPlan,
  S1_CARDIOMETABOLIC,
  S1_DOSE_RESPONSE,
  stepAdvice,
  SURMOUNT4_PATH,
  TZP_SOURCES,
  HARD_OUTCOMES,
  getTzpSource,
} from '../../data/tirzepatideData';
import { CONDITION_GUIDES, KNOWLEDGE_MAP, MAP_COLUMNS, summarizeReport, EXAMPLE_REPORT } from '../../data/threeHighsData';
import { classifyHDL, classifyLDL, classifyTG, classifyWaist } from '../../utils/labBands';
import { parseHash, PILLAR_TABS } from '../../config/routes';
import { getTrack } from '../../data/learning/tracks';
import { getDepartment } from '../../data/clinical/full';
import { searchDocs, buildSearchIndex } from '../../data/learning/searchIndex';

test('tirzepatide: dose ladder matches the label', () => {
  assert.deepEqual(DOSE_STEPS.map((d) => d.mg), [2.5, 5, 7.5, 10, 12.5, 15]);
  assert.deepEqual(DOSE_STEPS.filter((d) => d.isMaintenance).map((d) => d.mg), [5, 10, 15]);
  for (const d of DOSE_STEPS.slice(0, -1)) assert.equal(d.minWeeks, 4, `${d.mg} mg needs at least 4 weeks`);
});

test('tirzepatide: trial numbers stay locked to their sources', () => {
  const by = (arm: string) => S1_DOSE_RESPONSE.find((d) => d.arm === arm)!;
  assert.equal(by('安慰劑').pct, 3.1);
  assert.equal(by('5 mg').pct, 15.0);
  assert.equal(by('10 mg').pct, 19.5);
  assert.equal(by('15 mg').pct, 20.9);
  assert.equal(by('15 mg').over20, 56.7);

  const t2d = POPULATION_RESULTS.find((p) => p.group.includes('SURMOUNT-2'))!;
  assert.deepEqual([t2d.placebo, t2d.d10, t2d.d15], [-3.2, -12.8, -14.7]);

  const ldl = S1_CARDIOMETABOLIC.find((m) => m.metric === 'LDL')!;
  const tg = S1_CARDIOMETABOLIC.find((m) => m.metric === '三酸甘油酯')!;
  assert.ok(Math.abs(ldl.d15) < Math.abs(tg.d15) / 3, 'LDL must stay far smaller than TG: it cannot replace a statin');

  assert.deepEqual(SURMOUNT4_PATH.map((p) => p.withdrawn), [0, -20.9, -9.9]);
  assert.deepEqual(SURMOUNT4_PATH.map((p) => p.continued), [0, -20.9, -25.3]);
  assert.deepEqual(MAINTAIN_ARMS.map((a) => a.pct), [21.9, 16.6, 9.9]);

  const nausea = AE_RATES.find((a) => a.name === '噁心')!;
  assert.deepEqual([nausea.placebo, nausea.d5, nausea.d10, nausea.d15], [8, 25, 29, 28]);

  assert.ok(HARD_OUTCOMES.some((o) => o.stat === '44–62% vs 10%'), 'SYNERGY-NASH must use the journal figures');
});

test('tirzepatide: every cited source resolves to a link', () => {
  for (const s of TZP_SOURCES) assert.match(s.url, /^https:\/\//, s.id);
  assert.equal(new Set(TZP_SOURCES.map((s) => s.id)).size, TZP_SOURCES.length);
  for (const o of HARD_OUTCOMES) assert.ok(getTzpSource(o.source));
});

test('tirzepatide: eligibility reads the label and never recommends', () => {
  assert.equal(assessFit(90, 170, 0, []).verdict, 'meets_label'); // BMI 31.1
  assert.equal(assessFit(80, 170, 1, []).verdict, 'meets_label'); // BMI 27.7 + comorbidity
  assert.equal(assessFit(80, 170, 0, []).verdict, 'below_label'); // BMI 27.7, no comorbidity
  assert.equal(assessFit(72, 170, 1, []).verdict, 'below_label_comorbid'); // BMI 24.9
  assert.equal(assessFit(60, 170, 0, []).verdict, 'below_label');
  assert.equal(assessFit(100, 170, 2, ['mtc']).verdict, 'not_for_you');
  assert.equal(assessFit(100, 170, 2, ['pregnant']).verdict, 'not_for_you');
  assert.equal(assessFit(100, 170, 2, ['pancreatitis']).verdict, 'meets_label_caution');
});

test('tirzepatide: step guide puts safety first and follows the label', () => {
  const base = { currentMg: 5, weeksOnDose: 8, tolerance: 'fine' as const, progress: 'on_track' as const };
  assert.equal(stepAdvice({ ...base, tolerance: 'severe' }).verdict, 'hold_call');
  assert.equal(stepAdvice({ ...base, currentMg: 15, tolerance: 'severe' }).verdict, 'hold_call');
  assert.equal(stepAdvice({ ...base, weeksOnDose: 2 }).verdict, 'wait');
  assert.equal(stepAdvice({ ...base, tolerance: 'mild' }).verdict, 'extend');
  assert.equal(stepAdvice({ ...base, currentMg: 2.5 }).verdict, 'must_step');
  assert.equal(stepAdvice({ ...base, currentMg: 15 }).verdict, 'at_max');
  assert.equal(stepAdvice(base).verdict, 'stay');
  assert.equal(stepAdvice({ ...base, progress: 'goal_met' }).verdict, 'stay');
  assert.equal(stepAdvice({ ...base, progress: 'slow' }).verdict, 'can_discuss_up');
  assert.equal(stepAdvice({ ...base, currentMg: 7.5 }).verdict, 'can_discuss_up');
});

test('tirzepatide: protein stays in the advisory range and below 2 g/kg', () => {
  const heavy = proteinPlan(100, 170);
  assert.ok(heavy.referenceKg > heavy.idealKg && heavy.referenceKg < 100, 'BMI ≥27 uses an adjusted weight');
  assert.ok(heavy.lowG >= 80 && heavy.highG <= 125, `${heavy.lowG}-${heavy.highG}`);
  assert.ok(heavy.highG / 100 < 2);
  const lean = proteinPlan(60, 165);
  assert.equal(lean.referenceKg, 60, 'BMI <27 uses actual weight');
  assert.equal(lean.lowG, 72);
  assert.equal(lean.highG, 96);
});

test('tirzepatide: weight projection is the trial mean, nothing more', () => {
  const [d5, d10, d15] = projectLoss(100);
  assert.deepEqual([d5.kg, d10.kg, d15.kg], [15, 19.5, 20.9]);
  assert.equal(d15.newWeight, 79.1);
  assert.equal(d15.under5, 9.1);
});

/** Claims from an earlier draft that were wrong or unsupported. They must not come back. */
test('tirzepatide: unsupported claims stay out of the site', () => {
  const banned = [
    /添加 1-2g 玫瑰鹽/,
    /微劑量/,
    /Micro-Dosing/i,
    /逼近肝腎/,
    /直逼(胃繞道|手術)/,
    /限水底線/,
    /強制限水/,
    /反彈了失去體重的 66%/,
    /高達 74%/,
    /藍圖式離退/,
    /階梯式緩衝離退/,
    /100% 阻斷病程/,
    /精準 2 倍/,
    /SURPASS-CVO 與/,
  ];
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name !== '__tests__' && e.name !== 'node_modules') walk(p);
      } else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
    }
  };
  walk(path.resolve('src'));
  const hits: string[] = [];
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    for (const re of banned) if (re.test(text)) hits.push(`${path.relative('.', f)} ~ ${re}`);
  }
  assert.deepEqual(hits, []);
});

test('three highs: same skeleton for every topic', () => {
  assert.deepEqual(CONDITION_GUIDES.map((c) => c.id), ['weight', 'bp', 'glucose', 'lipid']);
  for (const c of CONDITION_GUIDES) {
    for (const key of ['eat', 'move', 'treat', 'track', 'urgent'] as const) assert.ok(c[key].length >= 2, `${c.id}.${key}`);
    assert.ok(c.scales.length >= 1 && c.links.length >= 3 && c.target && c.weightEffect, c.id);
  }
});

function assertLive(hash: string) {
  const route = parseHash(hash);
  assert.ok(route, `unparseable ${hash}`);
  if (route.kind === 'learn') {
    const track = getTrack(route.trackId!);
    assert.ok(track, hash);
    if (route.lessonId) assert.ok(track.lessons.some((l) => l.id === route.lessonId), hash);
  } else if (route.kind === 'pillar') {
    const [a, b] = route.sub ?? [];
    if (route.pillar === 'clinic') {
      const dept = getDepartment(a);
      assert.ok(dept, hash);
      assert.ok(dept.conditions.some((c) => c.id === b), hash);
    } else if (a) {
      assert.ok(PILLAR_TABS[route.pillar]?.includes(a), hash);
    }
  }
}

test('three highs: every map cell and guide link is a live page', () => {
  for (const row of KNOWLEDGE_MAP) {
    assert.equal(row.cells.length, MAP_COLUMNS.length, row.id);
    row.cells.forEach((c) => assertLive(c.hash));
  }
  CONDITION_GUIDES.forEach((c) => c.links.forEach((l) => assertLive(l.hash)));
});

test('three highs: report reader uses the shared bands', () => {
  assert.equal(classifyTG(600)?.tone, 'bad');
  assert.equal(classifyTG(180)?.tone, 'warn');
  assert.equal(classifyLDL(190)?.tone, 'bad');
  assert.equal(classifyHDL(45, 'M')?.tone, 'good');
  assert.equal(classifyHDL(45, 'F')?.tone, 'warn');
  assert.equal(classifyWaist(85, 'F')?.tone, 'warn');
  assert.equal(classifyWaist(85, 'M')?.tone, 'good');

  const ex = summarizeReport(EXAMPLE_REPORT);
  assert.equal(ex.metSyn.met, 5);
  assert.equal(ex.ckmStage, 2);
  assert.equal(ex.needsDoctorSoon, false);

  const blank = summarizeReport({ sex: 'F' });
  assert.equal(blank.rows.length, 0);
  assert.equal(blank.ckmStage, null);
  assert.equal(blank.metSyn.known, 0);

  const urgent = summarizeReport({ sex: 'M', sys: 185, dia: 100 });
  assert.equal(urgent.needsDoctorSoon, true);
  assert.equal(urgent.priorities[0], 'bp');

  // Stage 1 from prediabetes alone; a normal panel never claims more than stage 0.
  assert.equal(summarizeReport({ sex: 'F', a1c: 5.9 }).ckmStage, 1);
  assert.equal(summarizeReport({ sex: 'F', sys: 112, dia: 70, a1c: 5.2, tg: 90 }).ckmStage, 0);
});

test('search: everyday words find the new guides', () => {
  const docs = buildSearchIndex();
  const top = (q: string) => searchDocs(docs, q).slice(0, 5).map((d) => d.target);
  for (const q of ['瘦瘦針', '猛健樂', '打針減肥']) {
    assert.ok(top(q).includes('obesity/TIRZEPATIDE_PROTOCOL'), `${q} → ${top(q).join(', ')}`);
  }
  assert.ok(top('三高').includes('cardiometabolic/THREE_HIGHS'), `三高 → ${top('三高').join(', ')}`);
});
