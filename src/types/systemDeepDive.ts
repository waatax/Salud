import { HumanSystemId } from './index';

/**
 * Schema for the v3.0 body-system deep dives.
 *
 * The v2 system pages listed facts (organs, mechanisms, pathology names) without answering
 * what a reader actually arrives with: what is this system, what goes wrong with it, and
 * what do I do about it. This schema encodes that journey directly, and requires every
 * teaching point to carry a diagram — `diagram` is non-optional on purpose.
 */

export type Tone = 'neutral' | 'good' | 'warn' | 'bad' | 'accent';

export type DiagramKind =
  | 'flow' // a causal chain: A leads to B leads to C
  | 'compare' // two options or states side by side
  | 'scale' // a measured value against labelled safe/unsafe bands
  | 'layers' // nested or stacked structure, outermost first
  | 'cycle' // a self-reinforcing loop
  | 'proportion' // how a whole divides up
  | 'timeline'; // what happens over time

export interface DiagramNode {
  label: string;
  sub?: string;
  badge?: string;
  tone?: Tone;
}

export interface ScaleBand {
  from: number;
  to: number;
  label: string;
  tone: Tone;
}

export interface Diagram {
  kind: DiagramKind;
  /** The single sentence the diagram exists to make obvious. Always rendered beneath it. */
  caption: string;
  /** Used by flow, layers, cycle. */
  nodes?: DiagramNode[];
  scale?: {
    min: number;
    max: number;
    unit: string;
    bands: ScaleBand[];
    markers?: { at: number; label: string }[];
    /** Reverse the axis so lower numbers sit on the right (e.g. falling SpO2). */
    invert?: boolean;
  };
  compare?: {
    leftTitle: string;
    rightTitle: string;
    leftTone?: Tone;
    rightTone?: Tone;
    rows: { label: string; left: string; right: string }[];
  };
  proportion?: {
    segments: { label: string; pct: number; tone?: Tone }[];
  };
  timeline?: {
    stages: { when: string; label: string; detail: string; tone?: Tone }[];
  };
}

export type EvidenceGrade = 'A' | 'B' | 'C' | 'D' | 'E';

/** One teaching point, phrased as the question a reader would actually ask. */
export interface DeepKnowledgePoint {
  id: string;
  question_zh: string;
  answer_zh: string;
  /** Optional second paragraph for readers who want the mechanism in full. */
  detail_zh?: string;
  grade: EvidenceGrade;
  diagram: Diagram;
}

export interface DiagnosticTest {
  name_zh: string;
  what_zh: string;
  /** e.g. "FEV1/FVC < 0.70 即確診" */
  threshold_zh?: string;
}

export interface TreatmentTier {
  tier_zh: string;
  options_zh: string[];
  note_zh: string;
}

/** A condition, covering the whole arc: what it is → how it shows up → how it is found → what is done. */
export interface DeepCondition {
  id: string;
  name_zh: string;
  name_en: string;
  /** How common it is, in words a layperson can place themselves against. */
  prevalence_zh: string;
  what_zh: string;
  mechanism_zh: string;
  symptoms_early_zh: string[];
  symptoms_progressive_zh: string[];
  risk_factors_zh: string[];
  /** Risks the reader can actually change, called out separately from age/genetics. */
  modifiable_zh: string[];
  diagnosis_zh: DiagnosticTest[];
  self_care_zh: string[];
  treatment_zh: TreatmentTier[];
  see_doctor_zh: string[];
  diagram: Diagram;
}

/** An actionable prevention or improvement protocol. */
export interface DeepProtocol {
  id: string;
  title_zh: string;
  goal_zh: string;
  why_zh: string;
  steps_zh: string[];
  /** Frequency and amount, so the advice is executable rather than aspirational. */
  dose_zh: string;
  grade: EvidenceGrade;
  diagram: Diagram;
}

export interface DeepRedFlag {
  sign_zh: string;
  urgency: 'EMERGENT' | 'URGENT' | 'SOON';
  why_zh: string;
  action_zh: string;
}

export interface SystemOverviewNumber {
  value: string;
  label_zh: string;
  note_zh: string;
}

export interface SystemChartItem {
  id: string;
  title_zh: string;
  kind_badge_zh: string;
  category: 'illustration' | 'chart';
  summary_zh: string;
  clinical_takeaway_zh: string;
  diagram: Diagram;
}

export interface SystemDeepDive {
  system_id: HumanSystemId;
  /** One paragraph, no jargon, answering "what does this system actually do for me". */
  plain_intro_zh: string;
  numbers: SystemOverviewNumber[];
  anatomy: Diagram;
  how_it_works: DeepKnowledgePoint[];
  conditions: DeepCondition[];
  protocols: DeepProtocol[];
  red_flags: DeepRedFlag[];
  charts?: SystemChartItem[];
}

