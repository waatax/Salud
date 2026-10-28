/**
 * Clinical department architecture (v6.0).
 *
 * Salud's medical subject tree mirrors two real-world taxonomies at once:
 *  1. The outpatient departments (科別) of four Taiwanese medical centres —
 *     臺大醫院 NTUH, 成大醫院 NCKUH, 榮民總醫院 VGH (臺北/臺中/高雄), 彰化基督教醫院 CCH.
 *  2. The organ-system integrated curricula of Taiwan's top three medical schools —
 *     臺大醫學系, 陽明交大醫學系, 成大醫學系 (基礎 → 系統整合 → 臨床見實習).
 *
 * Every condition is written as a full care pathway: what it is → how it is diagnosed →
 * treatment → post-operative / post-discharge care → diet → exercise → rehabilitation &
 * physical therapy → self-care → red flags → evidence.
 */

export type HospitalCode = 'NTUH' | 'NCKUH' | 'VGH' | 'CCH';

export type DivisionId =
  | 'internal'
  | 'surgery'
  | 'women_children'
  | 'neuro_psych'
  | 'head_sense'
  | 'rehab_integrative'
  | 'acute_support';

export interface Evidence {
  /** e.g. "ESC 2024 Guidelines for elevated BP and hypertension" */
  label: string;
  year: number;
  /** DOI / guideline URL if known. Never fabricate — omit when unsure. */
  url?: string;
}

export interface SaludLink {
  /** Hash route inside Salud, e.g. 'spine/KNEE_HIP_OA', 'gastro/GERD_ULCER', 'cardiometabolic'. */
  hash: string;
  label_zh: string;
}

export interface Condition {
  id: string;
  name_zh: string;
  name_en: string;
  icd10?: string;
  /** What it is + Taiwan epidemiology, 2–4 sentences. */
  summary_zh: string;
  symptoms_zh: string[];
  diagnosis_zh: string[];
  /** Medical, procedural and surgical treatment options. */
  treatment_zh: string[];
  /** Post-operative / post-discharge / post-procedure care. */
  postop_zh: string[];
  diet_zh: string[];
  exercise_zh: string[];
  /** Rehabilitation, physical therapy, occupational therapy, speech/swallow therapy. */
  rehab_zh: string[];
  /** Daily self-management, monitoring, follow-up schedule. */
  selfcare_zh: string[];
  red_flags_zh: string[];
  evidence: Evidence[];
  salud_links?: SaludLink[];
}

export interface Department {
  id: string;
  name_zh: string;
  name_en: string;
  division: DivisionId;
  /** Local department name at each hospital (only where the hospital has it). */
  hospitals: Partial<Record<HospitalCode, string>>;
  /** Which integrated-curriculum block / clerkship this maps to in med school. */
  curriculum_zh: string;
  /** One-paragraph scope of practice. */
  scope_zh: string;
  subspecialties_zh: string[];
  when_to_visit_zh: string[];
  conditions: Condition[];
  salud_links?: SaludLink[];
}

export interface Division {
  id: DivisionId;
  name_zh: string;
  name_en: string;
  desc_zh: string;
  /** Matching med-school curriculum blocks. */
  curriculum_zh: string;
}
