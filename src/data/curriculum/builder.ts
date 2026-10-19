import type { DepthLevel, EvidenceGrade, KnowledgePage, KnowledgePoint, KPType, MythItem, QuizItem, SafetyFlag } from '../../types';

/**
 * Compact builders for the 2026 curriculum completion pages (SALUD spec §5.1 page targets).
 * They fill the governance fields (review dates, reviewers, claim ids) the same way
 * chaptersEPCS.ts / chaptersNMDF.ts do, so new pages look identical to the originals.
 */

export const CURRICULUM_REVIEWED = '2026-10-18';
export const CURRICULUM_NEXT_REVIEW = '2027-10-18';

export interface KPDraft {
  id: string;
  title: string;
  one_liner: string;
  type: KPType;
  depth?: DepthLevel;
  statement: string;
  why: string;
  misconception?: string;
  grade: EvidenceGrade;
  figs: string[];
  population?: string;
  region?: string;
  safety?: SafetyFlag;
  excludes?: string[];
}

export interface QuizDraft {
  kp: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
  level?: QuizItem['difficulty'];
}

export interface PageDraft {
  id: string;
  title_zh: string;
  title_en: string;
  minutes: number;
  gated?: boolean;
  hook: string;
  category: string;
  category_zh: string;
  tags: string[];
  difficulty: NonNullable<KnowledgePage['difficulty']>;
  lead: string;
  reviewers: string[];
  pearl: string;
  analogy_title: string;
  analogy: string;
  life_hack: string;
  kps: KPDraft[];
  figures: string[];
  taiwan: KnowledgePage['taiwan_context'];
  myths?: Omit<MythItem, 'source_id'>[];
  do_this: [string, string, string];
  not_for_you: string[];
  red_flags: string[];
  quiz: QuizDraft[];
  prerequisites?: string[];
}

export function buildPage(d: PageDraft): KnowledgePage {
  const [, chapter, order] = d.id.match(/^PAGE-([A-Z])-(\d+)$/) ?? [];
  const kps: KnowledgePoint[] = d.kps.map((k) => ({
    id: k.id,
    page_id: d.id,
    title: k.title,
    one_liner: k.one_liner,
    kp_type: k.type,
    depth: k.depth ?? 'L2',
    statement: k.statement,
    why_it_matters: k.why,
    common_misconception: k.misconception,
    evidence_grade: k.grade,
    claim_ids: ['CLM-CURR-2026'],
    figure_ids: k.figs,
    applies_population: k.population ?? '一般健康成人',
    applies_region: k.region ?? '全球（含台灣）',
    excludes: k.excludes ?? [],
    safety_flag: k.safety ?? 'none',
    last_reviewed: CURRICULUM_REVIEWED,
    reviewed_by: d.reviewers,
  }));
  return {
    id: d.id,
    chapter_id: chapter,
    title_zh: d.title_zh,
    title_en: d.title_en,
    order_index: Number(order),
    estimated_minutes: d.minutes,
    safety_gated: d.gated ?? false,
    hook: d.hook,
    kps,
    figure_ids: d.figures,
    taiwan_context: d.taiwan,
    myths: d.myths?.map((m) => ({ ...m, source_id: 'SRC-CURR-2026' })),
    do_this: { tier1: d.do_this[0], tier2: d.do_this[1], tier3: d.do_this[2] },
    not_for_you: d.not_for_you,
    red_flags: d.red_flags,
    quiz_items: d.quiz.map((q, i) => ({
      id: `QZ-${d.id.replace('PAGE-', '')}-${String.fromCharCode(97 + i)}`,
      kp_id: q.kp,
      question: q.q,
      options: q.options,
      correct_index: q.answer,
      explanation: q.why,
      difficulty: q.level ?? 'medium',
    })),
    evidence_freshness: '1 年內（2026 課綱審定）',
    last_reviewed: CURRICULUM_REVIEWED,
    next_review: CURRICULUM_NEXT_REVIEW,
    reviewed_by: d.reviewers,
    prerequisites: d.prerequisites ?? [],
    category: d.category,
    category_zh: d.category_zh,
    tags: d.tags,
    difficulty: d.difficulty,
    lead_expert_id: d.lead,
    clinical_pearl: d.pearl,
    analogy_title: d.analogy_title,
    plain_analogy: d.analogy,
    life_hack: d.life_hack,
  };
}
