import {
  HeartPulse,
  Sparkles,
  Scale,
  Hourglass,
  Utensils,
  Activity,
  Moon,
  Wind,
  Pill,
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
  group: 'foundation' | 'goals' | 'daily';
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
  foundation: { title_zh: '從身體開始', title_en: 'Start with the body' },
  goals: { title_zh: '健康目標', title_en: 'Health goals' },
  daily: { title_zh: '日常實踐', title_en: 'Daily practice' },
};

export const PILLAR_NAV: PillarNavItem[] = [
  {
    id: 'systems',
    hash: 'systems',
    icon: HeartPulse,
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
    id: 'ultrahealth',
    hash: 'ultrahealth',
    icon: Sparkles,
    label_zh: '健康生活',
    label_en: 'Healthy Living',
    blurb_zh: '生活藍圖',
    blurb_en: 'Blueprint',
    group: 'foundation',
    mobile: true,
    short_zh: '生活',
    short_en: 'Living',
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
  { hash: 'evidence', label_zh: '實證來源與分級', label_en: 'Evidence & grading' },
  { hash: 'about', label_zh: '關於 Salud 與專家審核', label_en: 'About & expert review' },
];

export const getPillarNav = (id: HealthPillar): PillarNavItem | undefined =>
  PILLAR_NAV.find((p) => p.id === id);
