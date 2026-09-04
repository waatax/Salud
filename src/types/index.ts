export type EvidenceGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export type KPType = 
  | 'mechanism' 
  | 'number' 
  | 'comparison' 
  | 'action' 
  | 'myth' 
  | 'risk' 
  | 'context';

export type DepthLevel = 'L1' | 'L2' | 'L3';

export type SafetyFlag = 'none' | 'caution' | 'gated';

export type FigureType = 
  | 'T1' // Mechanism (機制圖)
  | 'T2' // Anatomy Schematic (生理示意)
  | 'T3' // Molecular (分子結構)
  | 'T4' // Flow / Decision (流程決策)
  | 'T5' // Scale / Spectrum (尺度圖)
  | 'T6' // Comparison (比較圖)
  | 'T7' // Data Chart (資料圖表)
  | 'T8' // Portion / Real-object (份量實物對照)
  | 'T9' // Timeline (時序圖)
  | 'T10'; // Myth Card (迷思對照卡)

export interface KnowledgePoint {
  id: string; // e.g. KP-W-011
  page_id: string;
  title: string;
  one_liner: string; // <= 40 字
  kp_type: KPType;
  depth: DepthLevel;
  statement: string;
  why_it_matters: string;
  common_misconception?: string;
  evidence_grade: EvidenceGrade;
  claim_ids: string[];
  figure_ids: string[];
  quiz_ids?: string[];
  prerequisites?: string[];
  contradicts?: string[];
  applies_population: string;
  applies_region: string;
  excludes: string[];
  safety_flag: SafetyFlag;
  sim_hook?: string;
  last_reviewed: string;
  reviewed_by: string[];
}

export interface QuizItem {
  id: string;
  kp_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MythItem {
  id: string;
  kp_id: string;
  myth_claim: string;
  partial_truth: string;
  evidence_reality: string;
  action_takeaway: string;
  evidence_grade: EvidenceGrade;
  source_id: string;
}

export interface DataTable {
  title?: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface FigureMeta {
  id: string; // e.g. FIG-W-01-01
  page_id: string;
  serves_kp: string[];
  type: FigureType;
  title: string;
  caption: string;
  alt_text: string;
  long_description: string;
  data_table?: DataTable;
  data_source_ids: string[];
  source_version: string;
  evidence_grade: EvidenceGrade;
  scale_disclaimer?: boolean;
  accuracy_reviewed_by: string[];
  a11y_reviewed_by: string[];
}

export interface KnowledgePage {
  id: string; // e.g. PAGE-W-03
  chapter_id: string; // e.g. 'W'
  title_zh: string;
  title_en: string;
  order_index: number;
  estimated_minutes: number;
  safety_gated: boolean;
  hook: string;
  kps: KnowledgePoint[];
  figure_ids: string[];
  taiwan_context: {
    title: string;
    description: string;
    points: string[];
  };
  myths?: MythItem[];
  do_this: {
    tier1: string; // 幾乎所有人可做且低風險
    tier2: string; // 需適度規劃與留意
    tier3: string; // 需專業指引或個別化評估
  };
  not_for_you: string[];
  red_flags: string[];
  quiz_items: QuizItem[];
  evidence_freshness: string;
  last_reviewed: string;
  next_review: string;
  reviewed_by: string[];
  prerequisites: string[];
}

export interface Chapter {
  id: string; // 'W', 'O', 'A', 'E', etc.
  domain: string;
  title_zh: string;
  title_en: string;
  summary: string;
  summary_zh?: string;
  summary_en?: string;
  order_index: number;
  safety_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  owner_experts: string[];
  status: 'PUBLISHED' | 'DEVELOPMENT' | 'PLANNED';
  page_count: number;
  kp_count: number;
  figure_count: number;
  simulator_id: string;
  badge?: string;
}

export interface EdibleOil {
  id: string;
  name_zh: string;
  name_en: string;
  sfa_pct: number; // 飽和脂肪酸 %
  mufa_pct: number; // 單元不飽和脂肪酸 %
  pufa_pct: number; // 多元不飽和脂肪酸 %
  main_fa: string;
  smoke_point_c: number;
  recommended_uses: string;
  culinary_notes: string;
  is_local_tw?: boolean;
}

export interface ExpertCouncilMember {
  id: string; // EC-01 ~ EC-24
  name_en: string;
  title_zh: string;
  title_en: string;
  why_needed: string;
  why_needed_en?: string;
  core_duty: string;
  core_duty_en?: string;
  is_new_v2?: boolean;
  is_new_v3?: boolean;
}

export type SupportedLanguage = 'zh-TW' | 'en-US';

// BAC Simulation Types (Spec §10.3 & §15.2)
export type BeverageCategory = 'BEER' | 'WINE' | 'SOJU_SAKE' | 'SPIRITS';
export type StomachState = 'FASTING' | 'LIGHT_MEAL' | 'FULL_MEAL';
export type SleepImpactBand = 'MINIMAL' | 'LOW' | 'MODERATE' | 'SEVERE';

export interface BACSimInput {
  beverageCategory: BeverageCategory;
  volumeMl: number;
  abvPercentage: number;
  bodyWeightKg: number;
  biologicalSex: 'MALE' | 'FEMALE';
  stomachState: StomachState;
  withCarbonation: boolean;
  drinkingDurationHours: number;
}

export interface BACSimOutput {
  pureEthanolGrams: number;
  standardDrinks: number; // 1 drink = 10g ethanol
  peakBacBand: { low: number; high: number };
  peakWindowMinutes: { start: number; end: number };
  clearanceWindowHours: { start: number; end: number };
  sleepImpactBand: SleepImpactBand;
  sleepImpactNarrative: string;
  driving_statement: 'NEVER_ASSESSED'; // Spec §15.2: constant NEVER_ASSESSED
  precision_warning: string;
  assumptions: string[];
}

// ALDH2 Biochemical Sandbox Types (Spec §4.10 SBX-A-01)
export type ALDH2Genotype = 'NORMAL' | 'HETERO' | 'HOMO';

export interface ALDH2SandboxOutput {
  genotype: ALDH2Genotype;
  enzymeActivityPct: string;
  acetaldehydeExposureMultiplier: string;
  flushProbabilityBand: string;
  cancerRiskNarrative: string;
}

// AUDIT-C Screening Types (Spec §16.5)
export interface AuditCQuestion {
  id: number;
  question_zh: string;
  question_en: string;
  options_zh: { label: string; score: number }[];
  options_en: { label: string; score: number }[];
}

export interface AuditCTriageResult {
  totalScore: number;
  isPositive: boolean;
  band_zh: string;
  band_en: string;
  advice_zh: string;
  advice_en: string;
}

// Supplement Evaluation Types (Spec §11)
export interface SupplementEvaluation {
  id: string;
  name_zh: string;
  name_en: string;
  claimed_mechanism_zh: string;
  claimed_mechanism_en: string;
  evidence_reality_zh: string;
  evidence_reality_en: string;
  evidence_grade: EvidenceGrade;
  caution_zh: string;
  caution_en: string;
  false_sobriety_warning?: boolean;
}

// ── 4 Pillars Architecture Types (v0.4) ──
export type HealthPillar = 'diet' | 'exercise' | 'sleep' | 'supplements';

// Pillar 1: Dietary Patterns
export type DietaryPatternId = 'MEDITERRANEAN' | 'LOW_CARB' | 'KETOGENIC' | 'HIGH_FIBER_DASH' | 'VEGAN_VEGETARIAN';

export interface MacroRatio {
  carbs_pct: number; // e.g. 50%
  protein_pct: number; // e.g. 20%
  fat_pct: number; // e.g. 30%
}

export interface NutrientDeficiencyRisk {
  nutrient_zh: string;
  nutrient_en: string;
  risk_level: 'HIGH' | 'MODERATE' | 'LOW';
  solution_zh: string;
  solution_en: string;
}

export interface DietaryPattern {
  id: DietaryPatternId;
  name_zh: string;
  name_en: string;
  tagline_zh: string;
  tagline_en: string;
  description_zh: string;
  description_en: string;
  evidence_grade: EvidenceGrade;
  macro_distribution: MacroRatio;
  core_principles_zh: string[];
  core_principles_en: string[];
  biochemical_mechanisms_zh: string[];
  biochemical_mechanisms_en: string[];
  proven_benefits_zh: string[];
  proven_benefits_en: string[];
  precautions_and_risks_zh: string[];
  precautions_and_risks_en: string[];
  deficiency_risks: NutrientDeficiencyRisk[];
  ideal_for_zh: string;
  ideal_for_en: string;
  not_for_zh: string;
  not_for_en: string;
}

// Pillar 2: Exercise & Movement
export type ExerciseIntensityZone = 'ZONE_1' | 'ZONE_2' | 'ZONE_3' | 'ZONE_4' | 'ZONE_5';

export interface ExerciseZoneInfo {
  zone: ExerciseIntensityZone;
  name_zh: string;
  name_en: string;
  hr_range_pct: string; // e.g. 60–70% HRmax
  metabolic_fuel_zh: string;
  metabolic_fuel_en: string;
  lactate_level_zh: string;
  lactate_level_en: string;
  physiological_adaptations_zh: string;
  physiological_adaptations_en: string;
  weekly_target_minutes: number;
}

export interface ExerciseTopic {
  id: string;
  title_zh: string;
  title_en: string;
  category: 'CARDIO_VO2' | 'RESISTANCE_SARCOPENIA' | 'NEAT_SEDENTARY' | 'SAFETY_PRESCRIPTION';
  one_liner_zh: string;
  one_liner_en: string;
  evidence_grade: EvidenceGrade;
  key_mechanisms_zh: string[];
  key_mechanisms_en: string[];
  action_guidelines_zh: string[];
  action_guidelines_en: string[];
}

// ── Specialized Sports Science (運動科學：跑步與登山) ──
export type SportsDiscipline = 'RUNNING' | 'MOUNTAINEERING';

export interface RunningTopic {
  id: string;
  title_zh: string;
  title_en: string;
  category: 'BIOMECHANICS_CADENCE' | 'PACING_LACTATE' | 'RUNNING_ECONOMY' | 'NUTRITION_HYDRATION' | 'INJURY_PREVENTION';
  one_liner_zh: string;
  one_liner_en: string;
  evidence_grade: EvidenceGrade;
  key_principles_zh: string[];
  key_principles_en: string[];
  biomechanical_data_zh: string[];
  biomechanical_data_en: string[];
  action_protocols_zh: string[];
  action_protocols_en: string[];
}

export interface AltitudeProfile {
  altitude_m: number;
  landmark_zh: string;
  landmark_en: string;
  barometric_pressure_kpa: number; // e.g. 101.3 at sea level
  effective_oxygen_pct: number; // percentage of sea-level oxygen
  ams_risk_level: 'MINIMAL' | 'MODERATE' | 'HIGH' | 'EXTREME';
  physiological_response_zh: string;
  physiological_response_en: string;
}

export interface MountaineeringTopic {
  id: string;
  title_zh: string;
  title_en: string;
  category: 'HYPOXIA_PHYSIOLOGY' | 'AMS_HAPE_HACE' | 'PREVENTIVE_MEDS' | 'LOAD_BIOMECHANICS' | 'HYPOTHERMIA_ENERGETICS';
  one_liner_zh: string;
  one_liner_en: string;
  evidence_grade: EvidenceGrade;
  pathophysiology_zh: string[];
  pathophysiology_en: string[];
  clinical_criteria_zh: string[];
  clinical_criteria_en: string[];
  survival_protocols_zh: string[];
  survival_protocols_en: string[];
}

// Pillar 3: Sleep & Recovery
export interface SleepStageInfo {
  stage: 'NREM_1' | 'NREM_2' | 'NREM_3_SWS' | 'REM';
  name_zh: string;
  name_en: string;
  pct_of_night: string; // e.g. 15–20%
  physiological_function_zh: string;
  physiological_function_en: string;
  brain_wave_pattern: string;
  clinical_significance_zh: string;
  clinical_significance_en: string;
}

export interface SleepTopic {
  id: string;
  title_zh: string;
  title_en: string;
  category: 'ARCHITECTURE' | 'GLYMPHATIC_DETOX' | 'CIRCADIAN_BIOLOGY' | 'CBTI_BEHAVIOR';
  one_liner_zh: string;
  one_liner_en: string;
  evidence_grade: EvidenceGrade;
  mechanisms_zh: string[];
  mechanisms_en: string[];
  actionable_rules_zh: string[];
  actionable_rules_en: string[];
}

// Pillar 4: Deep Supplements & Nutraceuticals
export type SupplementCategory =
  | 'CARDIOVASCULAR'
  | 'METABOLIC'
  | 'BONE_JOINT'
  | 'COGNITIVE_SLEEP'
  | 'ANTIOXIDANT_LIVER'
  | 'PERFORMANCE_ENERGY';

export interface DeepSupplementItem {
  id: string;
  name_zh: string;
  name_en: string;
  category: SupplementCategory;
  evidence_grade: EvidenceGrade;
  primary_claim_zh: string;
  primary_claim_en: string;
  scientific_reality_zh: string;
  scientific_reality_en: string;
  optimal_form_zh: string; // e.g. 甘胺酸鎂而非氧化鎂、rTG魚油
  optimal_form_en: string;
  therapeutic_dosage_zh: string;
  therapeutic_dosage_en: string;
  caution_and_risks_zh: string;
  caution_and_risks_en: string;
  common_myths_zh: string;
  common_myths_en: string;
}

export interface DrugNutrientInteraction {
  id: string;
  drug_class_zh: string;
  drug_class_en: string;
  example_drugs: string;
  supplement_name_zh: string;
  supplement_name_en: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  mechanism_zh: string;
  mechanism_en: string;
  clinical_hazard_zh: string;
  clinical_hazard_en: string;
  guidance_zh: string;
  guidance_en: string;
}


