import type { Condition, Department, DepartmentSummary, DivisionId, LifeStage } from './types';
import { DEPARTMENT_INDEX } from './catalog.generated';
import { DIVISIONS } from './taxonomy';

/**
 * The clinic's light index: department and pathway names, four-hospital names and facets — enough
 * to draw every overview, the symptom navigator and search results. Each department's full care
 * pathways are a separate chunk (`loadDepartment.ts`). The authoring merge lives in `full.ts`,
 * which only build scripts and tests import.
 */

export * from './types';
export { DIVISIONS, MED_BLOCKS, MED_SCHOOLS, LIFE_STAGES } from './taxonomy';
export { HOSPITAL_SOURCES } from './hospitalMap';
export { DEPARTMENT_INDEX };

/** Four reference medical centres whose department lists define Salud's clinical tree. */
export const HOSPITALS = {
  NTUH: { name_zh: '國立臺灣大學醫學院附設醫院', short_zh: '臺大', city_zh: '臺北', url: 'https://www.ntuh.gov.tw/' },
  NCKUH: { name_zh: '國立成功大學醫學院附設醫院', short_zh: '成大', city_zh: '臺南', url: 'https://www.hosp.ncku.edu.tw/' },
  VGH: { name_zh: '臺北榮民總醫院', short_zh: '北榮', city_zh: '臺北', url: 'https://www.vghtpe.gov.tw/' },
  CCH: { name_zh: '彰化基督教醫院', short_zh: '彰基', city_zh: '彰化', url: 'https://www.cch.org.tw/' },
} as const;

export const deptSummary = (id: string): DepartmentSummary | undefined => DEPARTMENT_INDEX.find((d) => d.id === id);

export const indexByDivision = (id: DivisionId) => DEPARTMENT_INDEX.filter((d) => d.division === id);

export const CONDITION_INDEX = DEPARTMENT_INDEX.flatMap((dept) => dept.conditions.map((cond) => ({ dept, cond })));

export const conditionSummary = (condId: string) => CONDITION_INDEX.find((x) => x.cond.id === condId);

export const conditionLifeStages = (dept: Pick<Department, 'life_stages'>, cond: Pick<Condition, 'life_stages'>): LifeStage[] =>
  cond.life_stages ?? dept.life_stages;

export const DIVISION_BY_ID = Object.fromEntries(DIVISIONS.map((d) => [d.id, d]));
