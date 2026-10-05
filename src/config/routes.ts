import {
  HealthPillar,
  SportsDiscipline,
  ObesitySubTab,
  LongevitySubTab,
  CardiometabolicSubTab,
  SleepSubTab,
} from '../types';

/**
 * routes.ts — the one place a URL hash is turned into a destination (v4.0).
 *
 * Before v4 the hash was parsed by a 150-line if/else chain inside NavigationContext,
 * which could not be tested and silently fell through for anything it did not know.
 * `parseHash` is pure, so every deep link a lesson or search result emits is checked
 * by the test suite against this function.
 *
 * Hash grammar
 *   ''  | home[/plan]                  → learning home (optionally scrolled to the action plan)
 *   start                              → 4-week starter plan
 *   learn[/<track>[/<lesson>]]         → learning tracks
 *   updates | checkup | glossary       → learner reference pages
 *   systems[/<system>[/<section>]]     → body systems
 *   <pillar>[/<TAB>]                   → pillar hub, optional tab
 *   exercise/<discipline> (+ aliases)  → sport discipline
 *   diet | diet/patterns               → dietary patterns
 *   W | O | A [/<PAGE-ID>]             → nutrition chapters
 *   about | evidence | explore         → secondary pages
 */

export type MetaRoute = 'about' | 'evidence' | 'explore';

export type Route =
  | { kind: 'meta'; view: MetaRoute }
  | { kind: 'synergy' }
  | { kind: 'council'; expertId?: string }
  | { kind: 'pillar'; pillar: HealthPillar; sub?: string[] }
  | { kind: 'exercise'; discipline: SportsDiscipline }
  | { kind: 'chapter'; chapterId: 'W' | 'O' | 'A'; pageId?: string }
  | { kind: 'learn'; trackId?: string; lessonId?: string };

const EXERCISE_ALIASES: Record<string, SportsDiscipline> = {
  exercise: 'PHYSIOLOGY',
  physiology: 'PHYSIOLOGY',
  running: 'RUNNING',
  cycling: 'CYCLING',
  mountaineering: 'MOUNTAINEERING',
  hiking: 'MOUNTAINEERING',
  strength: 'STRENGTH_TRAINING',
  resistance: 'STRENGTH_TRAINING',
  mobility: 'MOBILITY_FASCIA',
  fascia: 'MOBILITY_FASCIA',
  stretching: 'MOBILITY_FASCIA',
  badminton: 'BADMINTON',
  'table-tennis': 'TABLE_TENNIS',
  tabletennis: 'TABLE_TENNIS',
  pingpong: 'TABLE_TENNIS',
  pickleball: 'PICKLEBALL',
};

export const DISCIPLINE_HASH: Record<SportsDiscipline, string> = {
  PHYSIOLOGY: 'exercise',
  RUNNING: 'exercise/running',
  CYCLING: 'exercise/cycling',
  MOUNTAINEERING: 'exercise/mountaineering',
  STRENGTH_TRAINING: 'exercise/strength',
  MOBILITY_FASCIA: 'exercise/mobility',
  BADMINTON: 'exercise/badminton',
  TABLE_TENNIS: 'exercise/table-tennis',
  PICKLEBALL: 'exercise/pickleball',
};

/** Pillars whose hash is simply their id, optionally followed by a tab segment. */
const SIMPLE_PILLARS: HealthPillar[] = [
  'start',
  'systems',
  'ultrahealth',
  'obesity',
  'longevity',
  'cardiometabolic',
  'sleep',
  'supplements',
  'mental',
  'updates',
  'checkup',
  'glossary',
];

const PILLAR_ALIASES: Record<string, HealthPillar> = {
  'ultra-health': 'ultrahealth',
  'anti-aging': 'longevity',
  cardio: 'cardiometabolic',
  breathwork: 'mental',
  news: 'updates',
  labs: 'checkup',
  terms: 'glossary',
};

export function parseHash(rawHash: string): Route | null {
  const hash = rawHash.replace(/^#/, '').trim();
  const [head, ...rest] = hash.split('/');
  if (head === '' || head === 'home') return { kind: 'pillar', pillar: 'home', sub: rest.length ? rest : undefined };

  if (head === 'explore' || head === 'knowledge') return { kind: 'meta', view: 'explore' };
  if (head === 'about' || head === 'governance' || head === 'council') return { kind: 'meta', view: 'about' };
  if (head === 'evidence' || head === 'sources') return { kind: 'meta', view: 'evidence' };
  if (head === 'synergy') return { kind: 'synergy' };
  if (head === 'council-evidence' || head === 'council') return { kind: 'meta', view: 'evidence' };

  if (head === 'learn') return { kind: 'learn', trackId: rest[0], lessonId: rest[1] };

  if (head === 'diet') return { kind: 'pillar', pillar: 'diet', sub: rest };

  if (head === 'exercise') {
    const d = rest[0] ? EXERCISE_ALIASES[rest[0]] : 'PHYSIOLOGY';
    return d ? { kind: 'exercise', discipline: d } : { kind: 'exercise', discipline: 'PHYSIOLOGY' };
  }
  if (EXERCISE_ALIASES[head] && head !== 'exercise') {
    return { kind: 'exercise', discipline: EXERCISE_ALIASES[head] };
  }

  if (head === 'W' || head === 'O' || head === 'A') {
    return { kind: 'chapter', chapterId: head, pageId: rest[0] };
  }

  const pillar = (SIMPLE_PILLARS as string[]).includes(head)
    ? (head as HealthPillar)
    : PILLAR_ALIASES[head];
  if (pillar) return { kind: 'pillar', pillar, sub: rest.length ? rest : undefined };

  return null;
}

/** Tab ids each hub accepts in `#<pillar>/<TAB>`. Hubs and the link tests share these. */
export const OBESITY_TABS: readonly ObesitySubTab[] = ['OVERVIEW', 'HYPERTROPHY', 'FAT_LOSS', 'RECOMP', 'PATHOPHYSIOLOGY', 'PHARMACOTHERAPY', 'DIETARY_REGIMENS', 'SURGERY_AND_SIM', 'BEHAVIOR_AND_QUIZ'];
export const LONGEVITY_TABS: readonly LongevitySubTab[] = ['OVERVIEW', 'HALLMARKS', 'EPIGENETIC_CLOCKS', 'PHARMACOTHERAPY', 'HORMESIS', 'SIMULATOR', 'BEHAVIOR_AND_QUIZ'];
export const CARDIO_TABS: readonly CardiometabolicSubTab[] = ['OVERVIEW', 'LIPIDS_APOB', 'BP_722', 'ATHERO_CAC', 'METSYN_CKM', 'CALCULATORS'];
export const SLEEP_TABS: readonly SleepSubTab[] = ['OVERVIEW', 'GLYMPHATIC', 'CAFFEINE_SIM', 'CBTI_CALC', 'OSA_SCREEN', 'CIRCADIAN'];
export type MentalTab = 'SIMULATOR' | 'NEUROBIOLOGY' | 'PROTOCOLS' | 'VAGUS_HRV' | 'CAPNOMETRY' | 'TRIAGE';
export const MENTAL_TABS: readonly MentalTab[] = ['SIMULATOR', 'NEUROBIOLOGY', 'PROTOCOLS', 'VAGUS_HRV', 'CAPNOMETRY', 'TRIAGE'];
export type CheckupTab = 'quick' | 'labs' | 'screening';
export const CHECKUP_TABS: readonly CheckupTab[] = ['quick', 'labs', 'screening'];
export type SystemSection = 'overview' | 'how' | 'charts' | 'conditions' | 'prevent' | 'flags';
export const SYSTEM_SECTIONS: readonly SystemSection[] = ['overview', 'how', 'charts', 'conditions', 'prevent', 'flags'];

export const PILLAR_TABS: Partial<Record<HealthPillar, readonly string[]>> = {
  obesity: OBESITY_TABS,
  longevity: LONGEVITY_TABS,
  cardiometabolic: CARDIO_TABS,
  sleep: SLEEP_TABS,
  mental: MENTAL_TABS,
  checkup: CHECKUP_TABS,
};

/** Second hash segment when the current hash starts with `prefix/`, e.g. the tab id. */
export function hashSegment(prefix: string, index = 1): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const parts = window.location.hash.replace(/^#/, '').split('/');
  return parts[0] === prefix ? parts[index] : undefined;
}
