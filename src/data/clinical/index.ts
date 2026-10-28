import type {
  Condition,
  ConditionDepth,
  ConditionInput,
  Department,
  DepartmentInput,
  DivisionId,
  Evidence,
  LifeStage,
  MedBlockId,
} from './types';
import { INTERNAL1 } from './internal1';
import { INTERNAL2 } from './internal2';
import { INTERNAL3, INTERNAL3_ADDITIONS } from './internal3';
import { SURGERY } from './surgery';
import { SURGERY2, SURGERY2_ADDITIONS } from './surgery2';
import { ORTHO, ORTHO_ADDITIONS } from './ortho';
import { WOMEN_NEURO } from './womenNeuro';
import { WOMEN_CHILDREN, WOMEN_CHILDREN_ADDITIONS } from './womenChildren';
import { SENSE_REHAB } from './senseRehab';
import { PRIMARY_REHAB, PRIMARY_REHAB_ADDITIONS } from './primaryRehab';
import { NUTRITION_REHAB, NUTRITION_REHAB_ADDITIONS } from './nutritionRehab';
import { ACUTE_DIAG, ACUTE_DIAG_ADDITIONS } from './acuteDiag';
import { DEPTH } from './depth';
import { HOSPITAL_MAP } from './hospitalMap';
import { DEPT_LIFE_STAGES, DIVISIONS, DIVISION_ORDER, blockOf } from './taxonomy';
import { CLINIC_NAV } from './nav';

export * from './types';
export { DIVISIONS, MED_BLOCKS, MED_SCHOOLS, LIFE_STAGES } from './taxonomy';
export { HOSPITAL_SOURCES } from './hospitalMap';

/** Four reference medical centres whose department lists define Salud's clinical tree. */
export const HOSPITALS = {
  NTUH: { name_zh: '國立臺灣大學醫學院附設醫院', short_zh: '臺大', city_zh: '臺北', url: 'https://www.ntuh.gov.tw/' },
  NCKUH: { name_zh: '國立成功大學醫學院附設醫院', short_zh: '成大', city_zh: '臺南', url: 'https://www.hosp.ncku.edu.tw/' },
  VGH: { name_zh: '臺北榮民總醫院', short_zh: '北榮', city_zh: '臺北', url: 'https://www.vghtpe.gov.tw/' },
  CCH: { name_zh: '彰化基督教醫院', short_zh: '彰基', city_zh: '彰化', url: 'https://www.cch.org.tw/' },
} as const;

/** Conditions added in v6.1 to departments that already existed in v6.0. */
const ADDITIONS: Record<string, ConditionInput[]> = {};
for (const add of [INTERNAL3_ADDITIONS, SURGERY2_ADDITIONS, ORTHO_ADDITIONS, WOMEN_CHILDREN_ADDITIONS, PRIMARY_REHAB_ADDITIONS, NUTRITION_REHAB_ADDITIONS, ACUTE_DIAG_ADDITIONS]) {
  for (const [deptId, conds] of Object.entries(add)) (ADDITIONS[deptId] ??= []).push(...conds);
}

const EMPTY_DEPTH: ConditionDepth = {
  key_numbers: [],
  causes_zh: [],
  prevention_zh: [],
  prognosis_zh: '',
  timeline: [],
  questions_zh: [],
};

const stripUndefined = <T extends object>(o: T): Partial<T> =>
  Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;

/**
 * New conditions carry their depth inline; v6.0 conditions get it from the DEPTH overlay.
 * Newer evidence is listed first; superseded guideline editions are dropped by label.
 */
const mergeCondition = (c: ConditionInput): Condition => {
  const overlay = DEPTH[c.id] ?? {};
  const merged = { ...EMPTY_DEPTH, ...overlay, ...stripUndefined(c) } as Condition;
  const drop = new Set([...(overlay.evidence_drop ?? []), ...(c.evidence_drop ?? [])]);
  const add: Evidence[] = [...(c.evidence_add ?? []), ...(overlay.evidence_add ?? [])];
  return { ...merged, evidence: [...add, ...c.evidence.filter((e) => !drop.has(e.label))] };
};

const RAW: DepartmentInput[] = [
  ...INTERNAL1,
  ...INTERNAL2,
  ...INTERNAL3,
  ...SURGERY,
  ...SURGERY2,
  ...ORTHO,
  ...WOMEN_NEURO,
  ...WOMEN_CHILDREN,
  ...SENSE_REHAB,
  ...PRIMARY_REHAB,
  ...NUTRITION_REHAB,
  ...ACUTE_DIAG,
];

const NAV_ORDER = CLINIC_NAV.flatMap((g) => g.depts.map((d) => d.id));

export const ALL_DEPARTMENTS: Department[] = RAW.map((d): Department => {
  const { hospitals: _legacy, conditions, ...rest } = d;
  return {
    ...rest,
    hospitals: HOSPITAL_MAP[d.id] ?? {},
    block: blockOf(d.id) as MedBlockId,
    life_stages: (DEPT_LIFE_STAGES[d.id] ?? ['adult', 'older']) as LifeStage[],
    conditions: [...conditions, ...(ADDITIONS[d.id] ?? [])].map(mergeCondition),
  };
}).sort((a, b) => {
  const div = DIVISION_ORDER.indexOf(a.division) - DIVISION_ORDER.indexOf(b.division);
  return div !== 0 ? div : NAV_ORDER.indexOf(a.id) - NAV_ORDER.indexOf(b.id);
});

export const departmentsByDivision = (id: DivisionId) => ALL_DEPARTMENTS.filter((d) => d.division === id);

export const getDepartment = (id: string) => ALL_DEPARTMENTS.find((d) => d.id === id);

export const ALL_CONDITIONS: { dept: Department; cond: Condition }[] = ALL_DEPARTMENTS.flatMap((dept) =>
  dept.conditions.map((cond) => ({ dept, cond }))
);

export const findCondition = (condId: string) => ALL_CONDITIONS.find((x) => x.cond.id === condId);

export const conditionLifeStages = (dept: Department, cond: Condition): LifeStage[] => cond.life_stages ?? dept.life_stages;

/** Ids a test can cross-check: additions must target real departments. */
export const ADDITION_TARGETS = Object.keys(ADDITIONS);

export const DIVISION_BY_ID = Object.fromEntries(DIVISIONS.map((d) => [d.id, d]));
