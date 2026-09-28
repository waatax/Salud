/**
 * Learning layer (v4.0).
 *
 * Everything else in Salud is organised by *topic* — a body system, a pillar, a sport.
 * A layperson does not arrive with a topic, they arrive with a question or a goal
 * ("my check-up says LDL 160", "I want to sleep better"). This layer re-threads the
 * existing topic pages into ordered, plain-language lessons, and adds the two pages a
 * newcomer needs before any of it: how to read a check-up report, and what changed in
 * the evidence recently.
 */

export type LearningTone = 'emerald' | 'sky' | 'amber' | 'rose' | 'violet' | 'teal';

/** Icon keys resolved to lucide components in the UI, so data files stay framework-free. */
export type LearningIcon =
  | 'compass'
  | 'body'
  | 'food'
  | 'move'
  | 'moon'
  | 'report'
  | 'shield'
  | 'heart'
  | 'brain';

export interface LessonLink {
  label_zh: string;
  /** In-app hash route, e.g. `systems/renal/conditions` or `exercise/strength`. */
  hash: string;
}

export interface LessonQuiz {
  question_zh: string;
  options_zh: string[];
  answer: number;
  explain_zh: string;
}

export interface Lesson {
  id: string;
  title_zh: string;
  minutes: number;
  /** The one sentence a reader should be able to repeat to a friend. */
  big_idea_zh: string;
  /** Everyday comparison; optional because not every idea has an honest one. */
  analogy_zh?: string;
  /** Discrete knowledge points, each one self-contained. */
  key_points_zh: string[];
  /** Concrete actions, small enough to start today. */
  do_today_zh: string[];
  myth_zh?: { myth: string; truth: string };
  /** When the reader should stop self-managing and see a clinician. */
  see_doctor_zh?: string[];
  quiz?: LessonQuiz;
  /** Where to go for the full mechanism. */
  deep_links: LessonLink[];
  /** EvidenceUpdate ids this lesson relies on, rendered as "based on" chips. */
  update_ids?: string[];
}

export interface LearningTrack {
  id: string;
  title_zh: string;
  title_en: string;
  subtitle_zh: string;
  audience_zh: string;
  icon: LearningIcon;
  tone: LearningTone;
  lessons: Lesson[];
}

/** "I want to…" entry points on the home page, each mapped to where to start. */
export interface LearningGoal {
  id: string;
  label_zh: string;
  hint_zh: string;
  icon: LearningIcon;
  track_id: string;
  lesson_id?: string;
}

export type UpdateCategory =
  | 'heart'
  | 'metabolic'
  | 'diet'
  | 'exercise'
  | 'screening'
  | 'sleep'
  | 'mind'
  | 'women'
  | 'emergency'
  | 'kidney'
  | 'lung'
  | 'brain';

/** One practice-changing guideline or trial, translated into "what it means for you". */
export interface EvidenceUpdate {
  id: string;
  /** YYYY-MM of publication. */
  date: string;
  category: UpdateCategory;
  org: string;
  title_zh: string;
  what_changed_zh: string;
  what_it_means_zh: string;
  numbers?: { label_zh: string; value: string }[];
  /** Limits of the finding, so the reader does not over-apply it. */
  caveat_zh?: string;
  url: string;
  related_hash?: string;
}

export type LabTone = 'good' | 'warn' | 'bad' | 'neutral';

export interface LabBand {
  label_zh: string;
  range_zh: string;
  tone: LabTone;
}

export type LabCategory = '血壓與心跳' | '血糖' | '血脂' | '腎臟' | '肝臟' | '身體組成' | '血液與其他';

export interface LabMetric {
  id: string;
  name_zh: string;
  abbr: string;
  unit: string;
  category: LabCategory;
  /** What the number actually measures, in one or two plain sentences. */
  what_zh: string;
  bands: LabBand[];
  /** How to get an accurate reading, and what moves it. */
  tips_zh: string[];
  /** The most common way people misread this number. */
  pitfall_zh?: string;
  authority: string;
  related_hash?: string;
}

export interface ScreeningItem {
  id: string;
  name_zh: string;
  who_zh: string;
  how_zh: string;
  frequency_zh: string;
  note_zh?: string;
  /** Publicly funded in Taiwan at time of writing. */
  funded: boolean;
  authority: string;
}

export interface GlossaryEntry {
  term: string;
  zh: string;
  plain_zh: string;
  category: string;
  related_hash?: string;
}

// ── Quick tips & action plan (v4.0 "立即上手") ──────────────────────────────

/** What part of daily life a tip changes; every section offers at least one `move` and one `eat`. */
export type TipKind = 'move' | 'eat' | 'sleep' | 'mind' | 'check' | 'safety';

export interface QuickTip {
  id: string;
  kind: TipKind;
  /** An imperative a reader can do today, e.g. 「每天飯後快走 10 分鐘」. */
  title_zh: string;
  /** Exactly how: dose, frequency, the concrete first step. */
  how_zh: string;
  /** One line of why, tied to the evidence on that page. */
  why_zh: string;
  /** Minutes per day it takes; 0 for swaps that cost no time. */
  minutes: number;
}

export interface TipSection {
  key: string;
  title_zh: string;
  /** Route the section lives on, used by search and by "from" labels in the action plan. */
  hash: string;
  tips: QuickTip[];
}

export interface StarterTask {
  id: string;
  kind: TipKind;
  text_zh: string;
  detail_zh: string;
}

export interface StarterWeek {
  week: number;
  theme_zh: string;
  goal_zh: string;
  tasks: StarterTask[];
  checkpoint_zh: string;
}
