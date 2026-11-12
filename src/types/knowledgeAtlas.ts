/**
 * Knowledge Atlas (知識點全圖) — v6.10
 *
 * A topic-level "map" of every knowledge point a learner needs, laid out as
 * domains (rows) × mastery levels (columns, L1 小白 → L5 大師). Each atlas also
 * carries a list of the most common real-world questions (FAQ) and maps every
 * question to the knowledge points that answer it, so coverage can be verified
 * automatically (see src/compose/__tests__/atlas.test.ts).
 */

export type AtlasLevel = 1 | 2 | 3 | 4 | 5;

/** Evidence strength behind a knowledge point (same A–E scale as EvidenceBadge). */
export type AtlasEvidence = 'A' | 'B' | 'C' | 'D' | 'E';

export interface AtlasLevelInfo {
  level: AtlasLevel;
  name: string; // 小白 / 入門 / 進階 / 專業 / 大師
  en: string;
  /** Generic description of the level, shared by every atlas. */
  desc: string;
}

export const ATLAS_LEVELS: readonly AtlasLevelInfo[] = [
  { level: 1, name: '小白', en: 'Novice', desc: '聽過但不懂：知道「是什麼、為什麼重要」，能分辨常見迷思。' },
  { level: 2, name: '入門', en: 'Beginner', desc: '開始行動：能照著安全、標準的做法每天執行。' },
  { level: 3, name: '進階', en: 'Intermediate', desc: '懂原理：知道背後機轉，能依自己的反應調整方法。' },
  { level: 4, name: '專業', en: 'Advanced', desc: '會評估：看得懂量表、數據與檢查報告，能處理特殊族群與狀況。' },
  { level: 5, name: '大師', en: 'Master', desc: '讀證據：掌握研究前沿與爭議，能評讀文獻、做個人化決策並教別人。' },
] as const;

export interface AtlasDomain {
  id: string; // e.g. 'BASICS'
  label: string; // 中文領域名稱
  short: string; // ≤ 6 字短名，給圖示使用
  emoji: string;
  summary: string; // 這個領域在講什麼（一句話）
}

export interface AtlasLink {
  /** In-app hash route without the leading '#', e.g. 'sleep/CBTI_CALC'. */
  hash: string;
  label: string;
}

export interface AtlasKnowledgePoint {
  id: string; // `${prefix}-${domainId}-${nn}` e.g. 'SE-BASICS-01'
  domain: string; // AtlasDomain.id
  level: AtlasLevel;
  title: string;
  /** 白話一句話：小白也看得懂的核心結論。 */
  plain: string;
  /** 深入說明：機轉、條件、例外（2–4 句）。 */
  detail: string;
  /** 關鍵數字、準則或判讀門檻。 */
  keyFact?: string;
  /** 今天就能做的一個具體行動。 */
  action?: string;
  /** 常見迷思 → 正解。 */
  myth?: string;
  evidence: AtlasEvidence;
  /** Knowledge-point ids that should be understood first (must be lower or equal level). */
  prereq?: string[];
  /** Deep link into an existing page of the site. */
  link?: AtlasLink;
  /** Search keywords / synonyms (中英皆可). */
  tags?: string[];
}

export interface AtlasFaq {
  id: string; // `${prefix}-Q${nn}`
  /** 一般民眾真的會問的問題。 */
  q: string;
  /** 簡短答案（1–3 句）。 */
  a: string;
  /** Knowledge points that fully answer this question. */
  kps: string[];
  /** Question category, free text (e.g. '入門疑問'、'族群'、'產品與花費'). */
  category: string;
}

export interface AtlasSource {
  label: string;
  url?: string;
}

export interface KnowledgeAtlas {
  key: 'strength-endurance' | 'sleep' | 'longevity';
  prefix: string; // 'SE' | 'SL' | 'LG'
  title: string;
  subtitle: string;
  /** What a learner can actually do after finishing each level of THIS topic. */
  levelGoals: Record<AtlasLevel, string>;
  domains: AtlasDomain[];
  points: AtlasKnowledgePoint[];
  faqs: AtlasFaq[];
  sources: AtlasSource[];
  reviewed: string; // e.g. '2026-11'
}
