/**
 * content-metrics.ts — counts the knowledge points in every learning module.
 *
 * "Knowledge point" here means one discrete, separately rendered teaching unit:
 * a question-and-answer, a condition, a protocol, a red flag, a topic card, a myth,
 * a drug review and so on. Counting units (not characters) keeps the measure honest —
 * padding an existing paragraph does not move it.
 *
 *   npm run content:metrics              print the table
 *   npm run content:metrics -- --json    also write public/data/content-metrics.json
 *   npm run content:metrics -- --baseline scripts/content-baseline.json
 *                                        compare against a saved snapshot
 */
import fs from 'fs';
import path from 'path';

import { SYSTEM_DEEP_DIVES } from '../src/data/systems';
import { CHAPTER_W_PAGES } from '../src/data/chapterW';
import { CHAPTER_O_PAGES } from '../src/data/chapterO';
import { CHAPTER_A_PAGES } from '../src/data/chapterA';
import { DIETARY_PATTERNS } from '../src/data/dietaryPatterns';
import { DIETARY_NUTRIENTS } from '../src/data/dietaryNutrientsData';
import { EDIBLE_OILS } from '../src/data/oilsData';
import { SUPPLEMENTS_EVALUATIONS } from '../src/data/supplementsData';
import { DEEP_SUPPLEMENTS, DRUG_NUTRIENT_INTERACTIONS } from '../src/data/supplementsDeepData';
import { EXERCISE_TOPICS, EXERCISE_ZONES } from '../src/data/exerciseData';
import { RUNNING_TOPICS, MOUNTAINEERING_TOPICS, ALTITUDE_PROFILES } from '../src/data/sportsScienceData';
import { CYCLING_TOPICS, COGGAN_POWER_ZONES } from '../src/data/cyclingData';
import { STRENGTH_TOPICS, MAJOR_MUSCLE_GROUPS } from '../src/data/strengthData';
import { MOBILITY_TOPICS, MOBILITY_SCREEN_TESTS } from '../src/data/mobilityData';
import { BADMINTON_TOPICS } from '../src/data/badmintonData';
import { TABLE_TENNIS_TOPICS } from '../src/data/tableTennisData';
import { PICKLEBALL_TOPICS } from '../src/data/pickleballData';
import { SLEEP_STAGES, SLEEP_TOPICS, STOP_BANG_QUESTIONS } from '../src/data/sleepData';
import { BREATHWORK_PROTOCOLS, MENTAL_TOPICS, STRESS_MYTH_BUSTERS } from '../src/data/mentalHealthData';
import {
  EOSS_STAGES,
  OBESITY_MECHANISMS,
  OBESITY_DRUGS,
  DIET_REGIMENS,
  BARIATRIC_SURGERIES,
  OBESITY_MYTHS,
  MDT_CONSENSUS_STATEMENTS,
  HYPERTROPHY_MECHANISMS,
  MUSCLE_GROUP_VOLUMES,
  FAT_LOSS_METABOLISM_STEPS,
  BODY_RECOMP_CANDIDATES,
} from '../src/data/obesityData';
import {
  AGING_HALLMARKS,
  EPIGENETIC_CLOCKS,
  LONGEVITY_COMPOUNDS,
  HORMESIS_PROTOCOLS,
  LONGEVITY_MASTERY_QUIZZES,
} from '../src/data/longevityData';
import {
  TSOC_BP_CATEGORIES,
  METSYN_CRITERIA,
  ATHEROSCLEROSIS_STAGES,
  MODERN_LIPID_PROFILES,
  CAC_STRATIFICATIONS,
  CKM_STAGES_DATA,
  CARDIOMETABOLIC_MYTHS,
} from '../src/data/cardiometabolicData';
import {
  DAILY_PROTOCOL_SLOTS,
  ATOMIC_HABITS,
  PHYSIO_EXERCISES,
  SKILL_TREE_NODES,
  STREET_MYTH_BUSTERS,
} from '../src/data/ultraHealthData';
import { CANONICAL_KNOWLEDGE_PACK_82 } from '../src/knowledge/atoms/pack82';
import { CANONICAL_THRESHOLDS } from '../src/knowledge/thresholds/thresholdRegistry';
import { CANONICAL_TERMINOLOGY_REGISTRY } from '../src/knowledge/terms/terminology';
import { LEARNING_TRACKS } from '../src/data/learning/tracks';
import { ALL_QUICK_TIPS } from '../src/data/learning/quickTips';
import { ALL_STARTER_TASKS } from '../src/data/learning/starterPlan';

type Parts = Record<string, readonly unknown[] | number>;

interface ModuleMetric {
  id: string;
  title: string;
  parts: Record<string, number>;
  total: number;
  cjk: number;
}

const CJK = /[㐀-鿿豈-﫿]/g;
const cjkCount = (v: unknown) => (JSON.stringify(v).match(CJK) || []).length;

function measure(id: string, title: string, parts: Parts): ModuleMetric {
  const counts: Record<string, number> = {};
  let cjk = 0;
  for (const [k, v] of Object.entries(parts)) {
    if (typeof v === 'number') {
      counts[k] = v;
    } else {
      counts[k] = v.length;
      cjk += cjkCount(v);
    }
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return { id, title, parts: counts, total, cjk };
}

const kpsInPages = (pages: { kps: unknown[] }[]) => pages.flatMap((p) => p.kps);
const mythsInPages = (pages: { myths?: unknown[] }[]) => pages.flatMap((p) => p.myths ?? []);

const modules: ModuleMetric[] = [];

for (const [sid, dd] of Object.entries(SYSTEM_DEEP_DIVES)) {
  if (!dd) continue;
  modules.push(
    measure(`system:${sid}`, `人體系統・${sid}`, {
      how_it_works: dd.how_it_works,
      conditions: dd.conditions,
      protocols: dd.protocols,
      red_flags: dd.red_flags,
      charts: dd.charts ?? [],
      numbers: dd.numbers,
    })
  );
}

modules.push(
  measure('diet:water', '飲食・水與體液 (W)', {
    kps: kpsInPages(CHAPTER_W_PAGES),
    myths: mythsInPages(CHAPTER_W_PAGES),
  }),
  measure('diet:oil', '飲食・油脂 (O)', {
    kps: kpsInPages(CHAPTER_O_PAGES),
    myths: mythsInPages(CHAPTER_O_PAGES),
    oils: EDIBLE_OILS,
  }),
  measure('diet:alcohol', '飲食・酒精 (A)', {
    kps: kpsInPages(CHAPTER_A_PAGES),
    myths: mythsInPages(CHAPTER_A_PAGES),
  }),
  measure('diet:patterns', '飲食・飲食法與營養素', {
    patterns: DIETARY_PATTERNS,
    nutrients: DIETARY_NUTRIENTS,
  }),
  measure('supplements', '營養補充品', {
    evaluations: SUPPLEMENTS_EVALUATIONS,
    deep: DEEP_SUPPLEMENTS,
    interactions: DRUG_NUTRIENT_INTERACTIONS,
  }),
  measure('exercise:physiology', '運動・生理與心率', { topics: EXERCISE_TOPICS, zones: EXERCISE_ZONES }),
  measure('exercise:running', '運動・跑步', { topics: RUNNING_TOPICS }),
  measure('exercise:cycling', '運動・自行車', { topics: CYCLING_TOPICS, zones: COGGAN_POWER_ZONES }),
  measure('exercise:mountaineering', '運動・登山', { topics: MOUNTAINEERING_TOPICS, altitudes: ALTITUDE_PROFILES }),
  measure('exercise:strength', '運動・重量訓練', { topics: STRENGTH_TOPICS, muscles: MAJOR_MUSCLE_GROUPS }),
  measure('exercise:mobility', '運動・伸展筋膜', { topics: MOBILITY_TOPICS, screens: MOBILITY_SCREEN_TESTS }),
  measure('exercise:badminton', '運動・羽球', { topics: BADMINTON_TOPICS }),
  measure('exercise:table-tennis', '運動・桌球', { topics: TABLE_TENNIS_TOPICS }),
  measure('exercise:pickleball', '運動・匹克球', { topics: PICKLEBALL_TOPICS }),
  measure('sleep', '睡眠修復', { stages: SLEEP_STAGES, topics: SLEEP_TOPICS, stopbang: STOP_BANG_QUESTIONS }),
  measure('mental', '心理呼吸', {
    breathwork: BREATHWORK_PROTOCOLS,
    topics: MENTAL_TOPICS,
    myths: STRESS_MYTH_BUSTERS,
  }),
  measure('obesity', '增肌減脂', {
    eoss: EOSS_STAGES,
    mechanisms: OBESITY_MECHANISMS,
    drugs: OBESITY_DRUGS,
    regimens: DIET_REGIMENS,
    surgeries: BARIATRIC_SURGERIES,
    myths: OBESITY_MYTHS,
    consensus: MDT_CONSENSUS_STATEMENTS,
    hypertrophy: HYPERTROPHY_MECHANISMS,
    volumes: MUSCLE_GROUP_VOLUMES,
    fatloss: FAT_LOSS_METABOLISM_STEPS,
    recomp: BODY_RECOMP_CANDIDATES,
  }),
  measure('longevity', '抗老延壽', {
    hallmarks: AGING_HALLMARKS,
    clocks: EPIGENETIC_CLOCKS,
    compounds: LONGEVITY_COMPOUNDS,
    hormesis: HORMESIS_PROTOCOLS,
    quizzes: LONGEVITY_MASTERY_QUIZZES,
  }),
  measure('cardiometabolic', '心血代謝', {
    bp: TSOC_BP_CATEGORIES,
    metsyn: METSYN_CRITERIA,
    athero: ATHEROSCLEROSIS_STAGES,
    lipids: MODERN_LIPID_PROFILES,
    cac: CAC_STRATIFICATIONS,
    ckm: CKM_STAGES_DATA,
    myths: CARDIOMETABOLIC_MYTHS,
  }),
  measure('ultrahealth', '健康生活', {
    slots: DAILY_PROTOCOL_SLOTS,
    habits: ATOMIC_HABITS,
    physio: PHYSIO_EXERCISES,
    skills: SKILL_TREE_NODES,
    myths: STREET_MYTH_BUSTERS,
  }),
  measure('canonical', '知識原子與門檻', {
    atoms: CANONICAL_KNOWLEDGE_PACK_82,
    thresholds: CANONICAL_THRESHOLDS,
    terms: Object.values(CANONICAL_TERMINOLOGY_REGISTRY),
  }),
  measure('learn', '學習路徑', {
    lessons: LEARNING_TRACKS.flatMap((t) => t.lessons),
  }),
  measure('tips', '立即上手實用技巧', {
    tips: ALL_QUICK_TIPS.map(({ section, ...tip }) => tip),
    starter: ALL_STARTER_TASKS,
  })
);

const args = process.argv.slice(2);
const baselineIdx = args.indexOf('--baseline');
const baseline: Record<string, ModuleMetric> | null =
  baselineIdx >= 0
    ? Object.fromEntries(
        (JSON.parse(fs.readFileSync(args[baselineIdx + 1], 'utf8')).modules as ModuleMetric[]).map((m) => [m.id, m])
      )
    : null;

const pad = (s: string | number, n: number) => String(s).padStart(n);
let grand = 0;
let grandBase = 0;
let belowTarget = 0;
console.log('module'.padEnd(26) + pad('KPs', 6) + (baseline ? pad('base', 6) + pad('Δ%', 8) : '') + pad('字數', 9));
for (const m of modules) {
  grand += m.total;
  let delta = '';
  if (baseline) {
    const b = baseline[m.id];
    if (b) {
      grandBase += b.total;
      const pct = ((m.total - b.total) / b.total) * 100;
      if (pct < 10) belowTarget++;
      delta = pad(b.total, 6) + pad(`${pct >= 0 ? '+' : ''}${pct.toFixed(1)}`, 8);
    } else {
      delta = pad('new', 6) + pad('', 8);
    }
  }
  console.log(m.id.padEnd(26) + pad(m.total, 6) + delta + pad(m.cjk, 9));
}
console.log('-'.repeat(55));
console.log(
  'TOTAL'.padEnd(26) +
    pad(grand, 6) +
    (baseline ? pad(grandBase, 6) + pad(`+${(((grand - grandBase) / grandBase) * 100).toFixed(1)}`, 8) : '')
);
if (baseline) console.log(`\nModules under +10%: ${belowTarget}`);

if (args.includes('--json') || args.includes('--save')) {
  const out = args.includes('--save')
    ? path.resolve(args[args.indexOf('--save') + 1])
    : path.resolve('public', 'data', 'content-metrics.json');
  fs.writeFileSync(out, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), modules }, null, 2));
  console.log(`\nWrote ${out}`);
}
