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
  id: string; // 'W', 'O', 'E', etc.
  domain: string;
  title_zh: string;
  title_en: string;
  summary: string;
  order_index: number;
  safety_level: 'LOW' | 'MEDIUM' | 'HIGH';
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
  id: string; // EC-01 ~ EC-22
  name_en: string;
  title_zh: string;
  title_en: string;
  why_needed: string;
  core_duty: string;
  is_new_v2: boolean;
}
