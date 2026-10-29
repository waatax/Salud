/**
 * Clinical department architecture (v6.1).
 *
 * Salud's medical subject tree mirrors two real-world taxonomies at once:
 *  1. The 部／科 actually published by four Taiwanese medical centres — 臺大醫院 NTUH
 *     (組織規程 2024-05), 成大醫院 NCKUH (醫師介紹 22 部、內科部 10 分科), 臺北榮總 VGH
 *     (處務規程 2024-11, 38 部／中心) and 彰化基督教醫院 CCH (門診表 2026-06).
 *     See `hospitalMap.ts` for the per-hospital names and their sources.
 *  2. The clinical clerkship blocks of Taiwan's top three medical schools — 臺大、陽明交大、
 *     成大醫學系 (基礎 → 器官系統整合 → 臨床見實習 → PGY). See `taxonomy.ts`.
 *
 * Tree:  Division 部門 (10) → Department 科 → Subspecialty 次專科 → Condition 照護路徑.
 * Facets cut across the tree: organ-system block 器官系統模組, life stage 生命階段, and
 * symptom entry 症狀 → 掛號科別 (`symptoms.ts`).
 *
 * Every condition is a full care pathway, laid out the way the most-used patient sites
 * (Mayo Clinic, Cleveland Clinic, NHS, MedlinePlus, 臺大醫院衛教) structure a disease page:
 *   重點數字 → 認識 → 原因與風險 → 症狀 → 診斷 → 治療 → 術後／出院照護 → 復原時間軸 →
 *   飲食 → 運動 → 復健與物理治療 → 自我照護 → 預防 → 預後 → 看診問醫師 → 台灣資源 →
 *   危險警訊 → 實證來源.
 */

export type HospitalCode = 'NTUH' | 'NCKUH' | 'VGH' | 'CCH';

export type DivisionId =
  | 'internal'
  | 'surgery'
  | 'ortho'
  | 'women_children'
  | 'neuro_psych'
  | 'head_sense'
  | 'primary_geriatric'
  | 'rehab_integrative'
  | 'acute_periop'
  | 'diagnostic_support';

/** Organ-system / clerkship blocks shared by the three medical-school curricula. */
export type MedBlockId =
  | 'cardio'
  | 'resp'
  | 'gi'
  | 'renal_uro'
  | 'endo'
  | 'heme_onc'
  | 'infect_immune'
  | 'neuro'
  | 'behavior'
  | 'msk'
  | 'repro_growth'
  | 'sense_skin'
  | 'acute'
  | 'community'
  | 'diagnostics';

export type LifeStage = 'pregnancy' | 'infant' | 'child' | 'adult' | 'older' | 'end_of_life';

/**
 * guideline = society guideline; consensus = expert consensus / position paper;
 * sr = systematic review / meta-analysis; rct = landmark trial; cohort = observational;
 * official = Taiwan or WHO public-health policy (國健署、疾管署、健保署、WHO).
 */
export type EvidenceLevel = 'guideline' | 'consensus' | 'sr' | 'rct' | 'cohort' | 'official';

export interface Evidence {
  /** e.g. "ESC 2024 Guidelines for elevated BP and hypertension" */
  label: string;
  year: number;
  /** DOI / guideline URL if known. Never fabricate — omit when unsure; the UI falls back to a PubMed search. */
  url?: string;
  level?: EvidenceLevel;
}

export interface SaludLink {
  /** Hash route inside Salud, e.g. 'spine/KNEE_HIP_OA', 'gastro/GERD_ULCER', 'cardiometabolic'. */
  hash: string;
  label_zh: string;
}

export interface KeyNumber {
  /** Short figure: "<130/80", "6 週", "每 2 年". */
  value: string;
  label_zh: string;
}

/** One step of a recovery / treatment timeline (術後或確診後). */
export interface TimelinePhase {
  /** "術後 0–2 天", "第 2–6 週", "確診 3 個月內". */
  when_zh: string;
  goal_zh: string;
  do_zh: string[];
}

/** The fields added in v6.1. Kept separate so data files can supply them as an overlay. */
export interface ConditionDepth {
  key_numbers: KeyNumber[];
  /** Causes and risk factors 原因與風險因子. */
  causes_zh: string[];
  /** Primary / secondary prevention 預防. */
  prevention_zh: string[];
  /** Outlook in 1–3 sentences 預後. */
  prognosis_zh: string;
  timeline: TimelinePhase[];
  /** Questions to bring to the clinic 看診時可以問醫師. */
  questions_zh: string[];
  /** Taiwan-specific: 健保給付、國健署篩檢、補助、專線. */
  tw_resources_zh?: string[];
  /** Overrides the department's default life stages. */
  life_stages?: LifeStage[];
  /** Extra 2025–2026 evidence appended to the base list. */
  evidence_add?: Evidence[];
  /** Base evidence labels superseded by evidence_add (dropped from display). */
  evidence_drop?: string[];
}

export interface ConditionBase {
  id: string;
  name_zh: string;
  name_en: string;
  /**
   * 'disease' (default): a condition with a full care pathway.
   * 'topic': an exam, procedure or decision guide (CT 顯影劑、病理報告、ACP…) — diet / exercise /
   * rehab lists may be empty and some section titles change (原因 → 適用對象).
   */
  kind?: 'disease' | 'topic';
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

/** A condition as written in a data file: base pathway, optionally with its depth inline. */
export type ConditionInput = ConditionBase & Partial<ConditionDepth>;

/** A fully merged condition, as the UI receives it. */
export type Condition = ConditionBase & ConditionDepth;

export interface DepartmentBase {
  id: string;
  name_zh: string;
  name_en: string;
  division: DivisionId;
  /** Which integrated-curriculum block / clerkship this maps to in med school. */
  curriculum_zh: string;
  /** One-paragraph scope of practice. */
  scope_zh: string;
  subspecialties_zh: string[];
  when_to_visit_zh: string[];
  salud_links?: SaludLink[];
}

export interface DepartmentInput extends DepartmentBase {
  /** Legacy per-file hospital names; superseded by hospitalMap.ts. */
  hospitals?: Partial<Record<HospitalCode, string>>;
  conditions: ConditionInput[];
}

export interface Department extends DepartmentBase {
  /** Local department name at each hospital (only where the hospital has it). */
  hospitals: Partial<Record<HospitalCode, string>>;
  block: MedBlockId;
  life_stages: LifeStage[];
  conditions: Condition[];
}

/** A pathway as overviews, the symptom navigator and search list it; the page loads with its department. */
export interface ConditionSummary extends Pick<ConditionBase, 'id' | 'name_zh' | 'name_en' | 'kind' | 'icd10'> {
  /** Resolved: the condition's own stages, else its department's. */
  life_stages: LifeStage[];
}

/** A department in the light index (`catalog.generated.ts`), without its care pathways. */
export interface DepartmentSummary
  extends Pick<Department, 'id' | 'name_zh' | 'name_en' | 'division' | 'scope_zh' | 'subspecialties_zh' | 'hospitals' | 'block' | 'life_stages'> {
  conditions: ConditionSummary[];
}

export interface Division {
  id: DivisionId;
  name_zh: string;
  name_en: string;
  desc_zh: string;
  /** Matching med-school curriculum blocks. */
  curriculum_zh: string;
  emoji: string;
}
