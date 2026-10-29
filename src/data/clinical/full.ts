import type {
  Condition,
  ConditionDepth,
  ConditionInput,
  Department,
  DepartmentInput,
  DepartmentSummary,
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
import { DEPT_LIFE_STAGES, DIVISION_ORDER, blockOf } from './taxonomy';
import { CLINIC_NAV } from './nav';
import { conditionLifeStages } from '.';

/**
 * The full clinical tree, merged from the authoring files. Build scripts and tests only: the app
 * reads the light index (`index.ts`) and loads one department's pathways at a time
 * (`loadDepartment.ts`); `scripts/gen-clinic-data.ts` writes both from this module.
 */

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

/** Ids a test can cross-check: additions must target real departments. */
export const ADDITION_TARGETS = Object.keys(ADDITIONS);

/** The department's row in the light index. */
export const summarizeDepartment = (d: Department): DepartmentSummary => ({
  id: d.id,
  name_zh: d.name_zh,
  name_en: d.name_en,
  division: d.division,
  scope_zh: d.scope_zh,
  subspecialties_zh: d.subspecialties_zh,
  hospitals: d.hospitals,
  block: d.block,
  life_stages: d.life_stages,
  conditions: d.conditions.map((c) => ({
    ...stripUndefined({ id: c.id, name_zh: c.name_zh, name_en: c.name_en, kind: c.kind, icd10: c.icd10 }),
    life_stages: conditionLifeStages(d, c),
  })) as DepartmentSummary['conditions'],
});
