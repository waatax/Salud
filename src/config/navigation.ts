import {
  HeartPulse,
  Sparkles,
  Scale,
  Hourglass,
  Utensils,
  Activity,
  Moon,
  Wind,
  House,
  GraduationCap,
  ClipboardList,
  Newspaper,
  Rocket,
  BookA,
  PersonStanding,
  LucideIcon,
} from 'lucide-react';
import { HealthPillar } from '../types';

/**
 * navigation.ts — Single source of truth for Salud's primary information architecture (v2.0.0).
 *
 * Before v2.0 the pillar list was hand-written three times (Header, Sidebar, MobileNav),
 * which let the three drift apart and let non-content surfaces (expert seats, iteration
 * logs, charters) creep into primary navigation. Every navigation surface now renders
 * from this file.
 *
 * Design rule: primary navigation carries ONLY health content the reader came for.
 * Project governance — the expert council roster, the RPDCA iteration history, the
 * charter — lives at SECONDARY_LINKS and is reachable from the footer only.
 *
 * v4.0: a first group, "開始學習", puts the learner layer (home, tracks, check-up guide,
 * what's new, glossary) ahead of the topic hubs, and the hubs are regrouped by the
 * question a reader brings: understand the body → daily levers → long-range goals.
 */

export interface PillarNavItem {
  id: HealthPillar;
  hash: string;
  icon: LucideIcon;
  label_zh: string;
  label_en: string;
  /** Short descriptor shown in the sidebar; keep under ~8 CJK chars. */
  blurb_zh: string;
  blurb_en: string;
  /** Group heading used by the sidebar to chunk the list. */
  group: 'start' | 'foundation' | 'daily' | 'goals';
  /** Whether this pillar appears in the compact mobile bottom bar. */
  mobile: boolean;
  /** Abbreviated label for the mobile bar, where a long label wraps mid-word. */
  short_zh: string;
  short_en: string;
}

export const PILLAR_GROUPS: Record<
  PillarNavItem['group'],
  { title_zh: string; title_en: string }
> = {
  start: { title_zh: '開始學習', title_en: 'Start learning' },
  foundation: { title_zh: '認識身體', title_en: 'Know the body' },
  daily: { title_zh: '吃・動・睡・心', title_en: 'Daily levers' },
  goals: { title_zh: '預防與健康目標', title_en: 'Prevention & goals' },
};

export const GROUP_ORDER: PillarNavItem['group'][] = ['start', 'foundation', 'daily', 'goals'];

export const PILLAR_NAV: PillarNavItem[] = [
  {
    id: 'home',
    hash: 'home',
    icon: House,
    label_zh: '首頁',
    label_en: 'Home',
    blurb_zh: '從這裡開始',
    blurb_en: 'Start here',
    group: 'start',
    mobile: true,
    short_zh: '首頁',
    short_en: 'Home',
  },
  {
    id: 'start',
    hash: 'start',
    icon: Rocket,
    label_zh: '4 週啟動計畫',
    label_en: '4-week starter',
    blurb_zh: '運動·飲食·睡眠',
    blurb_en: 'Move · eat · sleep',
    group: 'start',
    mobile: false,
    short_zh: '啟動',
    short_en: 'Start',
  },
  {
    id: 'learn',
    hash: 'learn',
    icon: GraduationCap,
    label_zh: '學習路徑',
    label_en: 'Learning tracks',
    blurb_zh: '7 路徑 54 課',
    blurb_en: '54 lessons',
    group: 'start',
    mobile: true,
    short_zh: '學習',
    short_en: 'Learn',
  },
  {
    id: 'checkup',
    hash: 'checkup',
    icon: ClipboardList,
    label_zh: '看懂健檢',
    label_en: 'Check-up guide',
    blurb_zh: '數值與篩檢',
    blurb_en: 'Labs & screening',
    group: 'start',
    mobile: true,
    short_zh: '健檢',
    short_en: 'Labs',
  },
  {
    id: 'updates',
    hash: 'updates',
    icon: Newspaper,
    label_zh: '最新實證',
    label_en: "What's new",
    blurb_zh: '2024–2026',
    blurb_en: '2024–2026',
    group: 'start',
    mobile: false,
    short_zh: '新知',
    short_en: 'New',
  },
  {
    id: 'glossary',
    hash: 'glossary',
    icon: BookA,
    label_zh: '健康小辭典',
    label_en: 'Glossary',
    blurb_zh: '名詞白話',
    blurb_en: 'Plain terms',
    group: 'start',
    mobile: false,
    short_zh: '辭典',
    short_en: 'Terms',
  },
  {
    id: 'systems',
    hash: 'systems',
    icon: PersonStanding,
    label_zh: '人體系統',
    label_en: 'Body Systems',
    blurb_zh: '8 大系統',
    blurb_en: '8 systems',
    group: 'foundation',
    mobile: true,
    short_zh: '系統',
    short_en: 'Body',
  },
  {
    id: 'diet',
    hash: 'diet',
    icon: Utensils,
    label_zh: '飲食營養',
    label_en: 'Diet & Nutrition',
    blurb_zh: '飲食法·營養素',
    blurb_en: 'Patterns',
    group: 'daily',
    mobile: true,
    short_zh: '飲食',
    short_en: 'Diet',
  },
  {
    id: 'exercise',
    hash: 'exercise',
    icon: Activity,
    label_zh: '運動訓練',
    label_en: 'Exercise',
    blurb_zh: '9 大專項',
    blurb_en: '9 disciplines',
    group: 'daily',
    mobile: true,
    short_zh: '運動',
    short_en: 'Exercise',
  },
  {
    id: 'sleep',
    hash: 'sleep',
    icon: Moon,
    label_zh: '睡眠修復',
    label_en: 'Sleep & Recovery',
    blurb_zh: '晝夜·腦淋巴',
    blurb_en: 'Circadian',
    group: 'daily',
    mobile: true,
    short_zh: '睡眠',
    short_en: 'Sleep',
  },
  {
    id: 'mental',
    hash: 'mental',
    icon: Wind,
    label_zh: '心理呼吸',
    label_en: 'Mind & Breath',
    blurb_zh: '呼吸·壓力',
    blurb_en: 'Breathwork',
    group: 'daily',
    mobile: true,
    short_zh: '呼吸',
    short_en: 'Breath',
  },
  {
    id: 'cardiometabolic',
    hash: 'cardiometabolic',
    icon: HeartPulse,
    label_zh: '心血代謝',
    label_en: 'Cardiometabolic',
    blurb_zh: 'ApoB·CAC',
    blurb_en: 'ApoB / CAC',
    group: 'goals',
    mobile: true,
    short_zh: '心血代謝',
    short_en: 'Cardio',
  },
  {
    id: 'obesity',
    hash: 'obesity',
    icon: Scale,
    label_zh: '增肌減脂',
    label_en: 'Muscle & Fat Loss',
    blurb_zh: '增肌·減脂',
    blurb_en: 'Recomposition',
    group: 'goals',
    mobile: true,
    short_zh: '增肌減脂',
    short_en: 'Muscle',
  },
  {
    id: 'longevity',
    hash: 'longevity',
    icon: Hourglass,
    label_zh: '抗老延壽',
    label_en: 'Longevity',
    blurb_zh: '12 標誌',
    blurb_en: '12 hallmarks',
    group: 'goals',
    mobile: true,
    short_zh: '抗老',
    short_en: 'Longevity',
  },
  {
    id: 'ultrahealth',
    hash: 'ultrahealth',
    icon: Sparkles,
    label_zh: '健康生活',
    label_en: 'Healthy Living',
    blurb_zh: '24H 作息藍圖',
    blurb_en: 'Blueprint',
    group: 'goals',
    mobile: false,
    short_zh: '生活',
    short_en: 'Living',
  },
];

/** Sub-destinations that live underneath a pillar rather than beside it. */
export const DIET_SUB_NAV = [
  { hash: 'diet/patterns', label_zh: '各式飲食法比較', label_en: 'Dietary patterns' },
  { hash: 'supplements', label_zh: '營養保健品 (GRADE 實證)', label_en: 'Supplements (GRADE)' },
];

export const EXERCISE_SUB_NAV = [
  { hash: 'exercise', label_zh: '運動生理與心率', label_en: 'Exercise physiology' },
  { hash: 'exercise/running', label_zh: '跑步', label_en: 'Running' },
  { hash: 'exercise/cycling', label_zh: '自行車', label_en: 'Cycling' },
  { hash: 'exercise/mountaineering', label_zh: '登山高海拔', label_en: 'Mountaineering' },
  { hash: 'exercise/strength', label_zh: '重量訓練', label_en: 'Strength training' },
  { hash: 'exercise/mobility', label_zh: '伸展與筋膜', label_en: 'Mobility & fascia' },
  { hash: 'exercise/badminton', label_zh: '羽毛球', label_en: 'Badminton' },
  { hash: 'exercise/table-tennis', label_zh: '乒乓球', label_en: 'Table tennis' },
  { hash: 'exercise/pickleball', label_zh: '匹克球', label_en: 'Pickleball' },
];

/**
 * Governance and meta pages. Deliberately NOT part of primary navigation —
 * these describe how Salud is built, not what the reader should do about their health.
 */
export const SECONDARY_LINKS = [
  { hash: 'explore', label_zh: '知識點資料庫 (Explore)', label_en: 'Knowledge Explorer' },
  { hash: 'evidence', label_zh: '實證來源與分級', label_en: 'Evidence & grading' },
  { hash: 'about', label_zh: '關於 Salud 與專家審核', label_en: 'About & expert review' },
];

export const getPillarNav = (id: HealthPillar): PillarNavItem | undefined =>
  PILLAR_NAV.find((p) => p.id === id);
