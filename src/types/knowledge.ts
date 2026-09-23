/**
 * knowledge.ts — Salud Knowledge Architecture vNext.8 Core Types
 *
 * Three-Tier Decoupling:
 * Layer 1: Canonical Source (KnowledgeAtom, EvidenceRecord, QuantitativeClaim, TaiwanPolicyObject, TerminologyItem)
 * Layer 2: Pure Function Computation Engine (deriveCertainty, evaluateSafetyPredicate, units engine)
 * Layer 3: UI Views & Presentation Adapters
 */

export type AssertionKind =
  | 'diagnostic_boundary'
  | 'policy'
  | 'quantitative'
  | 'procedural'
  | 'mechanism'
  | 'context'
  | 'comparative'
  | 'bound'
  | 'range'
  | 'heuristic'
  | 'qualitative'
  | 'distribution';

export type RiskClass = 'R1' | 'R2' | 'R3';

export type CertaintyLevel = 'high' | 'moderate' | 'low' | 'very-low';

export type ProvenanceLevel =
  | 'verified-primary'
  | 'needs-provenance-review'
  | 'expert-consensus'
  | 'regulatory-statute';

export type StudyDesign =
  | 'systematic_review'
  | 'rct'
  | 'cohort'
  | 'case_control'
  | 'cross_sectional'
  | 'mechanistic_in_vitro'
  | 'animal_model'
  | 'expert_consensus'
  | 'guideline';

export type RiskOfBias = 'low' | 'moderate' | 'serious' | 'critical';

export type DirectnessLevel = 'high' | 'moderate' | 'low';

export interface EffectEstimate {
  measure: string; // 'RR', 'OR', 'HR', 'MD', 'absolute_risk'
  estimate: string | number;
  ci_95?: [number, number];
  comparator: string; // Required by VAL-003 / DEFECT-11 (e.g. 'vs non-drinkers')
  exposure_definition?: string; // e.g. '>4 standard drinks/day'
  adjusted_for?: string[]; // e.g. ['age', 'smoking', 'diet']
}

export interface EvidenceRecord {
  id: string;
  citation: string;
  title?: string;
  authors?: string;
  journal?: string;
  year?: number;
  doi?: string;
  pmid?: string;
  url?: string;
  pmidOrDoi?: string;
  design: StudyDesign;
  sample_size?: number;
  sample_description?: string;
  effect?: EffectEstimate;
  risk_of_bias: RiskOfBias;
  /**
   * Directness of evidence relative to the target population and claim.
   * A study in n=13 wildtype Japanese men has low directness to ALDH2 deficient Taiwanese carriers.
   */
  directness: DirectnessLevel;
  consistency?: 'consistent' | 'inconsistent' | 'single_study';
  precision?: 'precise' | 'imprecise';
  publication_bias?: 'undetected' | 'suspected';
  provenance_level: ProvenanceLevel;
  notes?: string;
}

export type ValueKind = 'point' | 'range' | 'distribution' | 'heuristic';

export interface QuantitativeClaim {
  id: string;
  statement: string;
  value_kind: ValueKind;
  numeric_value?: number;
  range_min?: number;
  range_max?: number;
  unit?: string;
  relative_to?: string; // e.g. '%E', 'body_weight_kg'
  derivation?: string;
  comparator?: string;
  exposure_definition?: string;
  adjusted_for?: string[];
  /**
   * STRICT TYPING CONSTRAINT:
   * Quantitative claims cannot be declared as individual prescriptions.
   * Enforced at the compiler level.
   */
  is_individual_prescription: false;
  misuse_guard: string;
}

export interface HealthSubjectProfile {
  biologicalSex?: 'MALE' | 'FEMALE';
  weightKg?: number;
  age?: number;
  eGfr?: number;
  ckdStage?: 'G1' | 'G2' | 'G3a' | 'G3b' | 'G4' | 'G5';
  heartFailure?: boolean;
  cirrhosis?: boolean;
  siadh?: boolean;
  aldh2Genotype?: 'NORMAL' | 'HETERO' | 'HOMO';
  onDiuretics?: boolean;
  extremeHydrationRateLPerHour?: number;
  customConditions?: string[];
}

export type SafetyActionLevel = 'block' | 'warn' | 'cap';

export interface SafetyPredicate {
  id: string;
  name: string;
  description_zh: string;
  description_en: string;
  target_condition:
    | 'heart_failure'
    | 'ckd_g4_g5'
    | 'cirrhosis_ascites'
    | 'siadh'
    | 'aldh2_homo_or_hetero'
    | 'extreme_weight'
    | 'hyponatremia_risk'
    | 'pregnancy';
  action_level: SafetyActionLevel;
  evaluate: (profile: HealthSubjectProfile) => boolean;
  boundary_explanation_zh: string;
  boundary_explanation_en: string;
}

export interface SimulatorContract {
  simulatorId: string;
  name: string;
  excluded_predicates: string[]; // Predicate IDs required to pass
  baseline_kind: 'mechanistic' | 'pharmacokinetic' | 'population_average';
  heuristic_disclaimer_zh?: string;
}

export interface TaiwanPolicyObject {
  id: string;
  title_zh: string;
  title_en: string;
  cancer_type?: string;
  target_population_zh: string;
  age_range_zh: string;
  screening_interval_zh: string;
  modality_zh: string;
  effective_from: string; // e.g. '2025-01-01' (民國114年)
  policy_version: string;
  canonical_url: string;
  retrieved_date: string;
  supersedes?: string; // ID of superseded policy
  status: 'active' | 'needs-provenance-review' | 'deprecated';
  notes_zh?: string;
}

export interface ClinicalOntologyMapping {
  mesh_id?: string;
  mesh_term?: string;
  icd11_code?: string;
  icd11_title?: string;
  snomed_ct?: string;
  snomed_term?: string;
}

export interface ThresholdDefinition {
  id: string; // e.g. 'TH-BP-STAGE1'
  topic: string;
  metric_name: string;
  metric_name_zh: string;
  unit: string;
  operator: '<' | '<=' | '=' | '>=' | '>' | 'range';
  value: number;
  value_upper?: number;
  clinical_category_zh: string;
  clinical_category_en: string;
  guideline_authority: string;
  guideline_year: number;
  target_population_zh: string;
  measurement_context_zh: string;
  actionable_implication_zh: string;
  contraindications_or_exclusions_zh?: string;
  canonical_claim_id?: string;
  canonical_atom_id?: string;
}

export interface TerminologyItem {
  term: string; // e.g. 'ADH'
  primary_expansion_zh: string; // '乙醇去氫酶 (Alcohol Dehydrogenase)'
  secondary_expansions_zh?: string[]; // ['抗利尿激素 (Antidiuretic Hormone)']
  domain: string;
  context_guidance_zh: string;
  ambiguity_warning_zh: string;
  ontology?: ClinicalOntologyMapping;
}

export interface DerivedCopy {
  field_name: 'life_hack' | 'clinical_pearl' | 'plain_analogy' | 'do_this';
  text: string;
  derived_from_kp?: string;
  derived_from_bp?: string;
  value_kind?: ValueKind;
}

export interface ClinicalMasteryProfile {
  plain_core_zh: string;
  biochemical_mechanism_zh: string;
  diagnostic_cutoffs_zh: string;
  nutritional_protocol_zh: string;
  drug_interactions_red_flags_zh: string;
  clinical_pearls_myths_zh: string;
}

export interface KnowledgeAtom {
  id: string; // e.g. 'KA-BP-001'
  assertion_kind: AssertionKind;
  risk_class: RiskClass;
  topic: string; // e.g. 'blood_pressure', 'glucose', 'lipids', 'hydration', 'alcohol'
  statement_zh: string;
  statement_en?: string;
  applies_to: {
    population: string;
    region: string;
    age_range?: string;
  };
  primary_source: string;
  evidence_records: EvidenceRecord[];
  derived_certainty: CertaintyLevel;
  certainty_override?: {
    level: CertaintyLevel;
    rationale: string;
  };
  /**
   * E5 Mandatory Requirement:
   * Misuse guard must explicitly protect against misreading public health science as prescription.
   */
  misuse_guard: string;
  clinical_mastery?: ClinicalMasteryProfile;
  derivation?: string;
  quantitative_claim_ids?: string[];
  safety_predicate_ids?: string[];
  policy_ref_id?: string;
  threshold_ids?: string[];
  ontology?: ClinicalOntologyMapping;
  status: 'published' | 'needs-provenance-review' | 'draft';
  last_reviewed: string;
  next_review?: string;
}
