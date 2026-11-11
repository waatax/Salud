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
  Bone,
  ShieldPlus,
  Flower2,
  HeartHandshake,
  Stethoscope,
  Ribbon,
  Hospital,
  Dumbbell,
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
 * v4.4: a "症狀與疾病專區" group sits between the body and the daily levers — a reader who
 * arrives with a symptom (手麻、腰痛) gets a front door of its own.
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
  group: 'start' | 'foundation' | 'clinic' | 'care' | 'daily' | 'goals';
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
  daily: { title_zh: '日常保養・吃動睡心', title_en: 'Everyday health' },
  goals: { title_zh: '預防與健康目標', title_en: 'Prevention & Goals' },
  care: { title_zh: '疾病專題與家人照護', title_en: 'Specialty learning & care' },
  clinic: { title_zh: '不舒服・想就醫', title_en: 'Symptoms & care navigation' },
};

export const GROUP_ORDER: PillarNavItem['group'][] = ['start', 'foundation', 'clinic', 'daily', 'goals', 'care'];

export const PILLAR_NAV: PillarNavItem[] = [
  {
    id: 'clinic',
    hash: 'clinic',
    icon: Hospital,
    label_zh: '看哪一科・疾病照護',
    label_en: 'Find a department',
    blurb_zh: '10 部·50 科',
    blurb_en: '10 divisions',
    group: 'clinic',
    mobile: true,
    short_zh: '科別',
    short_en: 'Clinic',
  },
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
    blurb_zh: '8 路徑 65 課',
    blurb_en: '65 lessons',
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
    id: 'gastro',
    hash: 'gastro',
    icon: Stethoscope,
    label_zh: '腸胃與肝膽',
    label_en: 'Digestive & liver',
    blurb_zh: '逆流·腸躁·肝膽胰',
    blurb_en: 'GI · Liver · Pancreas',
    group: 'care',
    mobile: true,
    short_zh: '腸胃肝膽',
    short_en: 'GI/Liver',
  },
  {
    id: 'oncology',
    hash: 'oncology',
    icon: Ribbon,
    label_zh: '癌症篩檢與治療',
    label_en: 'Cancer screening & care',
    blurb_zh: '篩檢·治療方式',
    blurb_en: 'Screening · treatment',
    group: 'care',
    mobile: true,
    short_zh: '癌症防治',
    short_en: 'Oncology',
  },
  {
    id: 'spine',
    hash: 'spine',
    icon: Bone,
    label_zh: '脊椎、關節與神經',
    label_en: 'Spine, joints & nerves',
    blurb_zh: '腰痠·手麻·骨刺',
    blurb_en: 'Back pain · numbness',
    group: 'care',
    mobile: true,
    short_zh: '脊椎關節',
    short_en: 'Spine',
  },
  {
    id: 'hepb',
    hash: 'hepb',
    icon: ShieldPlus,
    label_zh: 'B 型肝炎',
    label_en: 'Hepatitis B',
    blurb_zh: '篩檢·治療·追蹤',
    blurb_en: 'Screen · treat',
    group: 'care',
    mobile: true,
    short_zh: 'B 肝',
    short_en: 'Hep B',
  },
  {
    id: 'ltc',
    hash: 'ltc',
    icon: HeartHandshake,
    label_zh: '長照與失能照護',
    label_en: 'Disability & long-term care',
    blurb_zh: '申請·補助·照顧技巧',
    blurb_en: 'Apply · subsidies · skills',
    group: 'care',
    mobile: true,
    short_zh: '長照',
    short_en: 'LTC',
  },
  {
    id: 'diet',
    hash: 'diet',
    icon: Utensils,
    label_zh: '飲食營養',
    label_en: 'Diet & Nutrition',
    blurb_zh: '飲食法·營養素',
    blurb_en: 'Patterns · nutrients',
    group: 'daily',
    mobile: true,
    short_zh: '飲食',
    short_en: 'Diet',
  },
  {
    id: 'exercise',
    hash: 'exercise',
    icon: Activity,
    label_zh: '運動',
    label_en: 'Exercise',
    blurb_zh: '入門與 8 種運動',
    blurb_en: 'Basics + 8 sports',
    group: 'daily',
    mobile: true,
    short_zh: '運動',
    short_en: 'Exercise',
  },
  {
    id: 'strength',
    hash: 'strength',
    icon: Dumbbell,
    label_zh: '肌力訓練',
    label_en: 'Strength training',
    blurb_zh: 'TSCA 丙級教練證照',
    blurb_en: 'S&C coach exam',
    group: 'daily',
    mobile: true,
    short_zh: '肌力',
    short_en: 'Strength',
  },
  {
    id: 'sleep',
    hash: 'sleep',
    icon: Moon,
    label_zh: '睡眠',
    label_en: 'Sleep & Recovery',
    blurb_zh: '作息·失眠·打呼',
    blurb_en: 'Sleep basics',
    group: 'daily',
    mobile: true,
    short_zh: '睡眠',
    short_en: 'Sleep',
  },
  {
    id: 'mental',
    hash: 'mental',
    icon: Wind,
    label_zh: '壓力與情緒',
    label_en: 'Stress & mood',
    blurb_zh: '呼吸·放鬆·求助',
    blurb_en: 'Breathing · help',
    group: 'daily',
    mobile: true,
    short_zh: '壓力',
    short_en: 'Stress',
  },
  {
    id: 'mindbody',
    hash: 'mindbody',
    icon: Flower2,
    label_zh: '身心練習課程',
    label_en: 'Mind-body course',
    blurb_zh: '睡眠·吐納·正念',
    blurb_en: 'Sleep · breath',
    group: 'daily',
    mobile: true,
    short_zh: '身心',
    short_en: 'Mind-body',
  },
  {
    id: 'cardiometabolic',
    hash: 'cardiometabolic',
    icon: HeartPulse,
    label_zh: '三高與心血管',
    label_en: 'Heart & metabolism',
    blurb_zh: '血壓·血糖·血脂',
    blurb_en: 'BP · sugar · lipids',
    group: 'goals',
    mobile: true,
    short_zh: '三高',
    short_en: 'Heart',
  },
  {
    id: 'obesity',
    hash: 'obesity',
    icon: Scale,
    label_zh: '體重管理・增肌減脂',
    label_en: 'Weight & muscle',
    blurb_zh: '減脂·猛健樂',
    blurb_en: 'Weight care',
    group: 'goals',
    mobile: true,
    short_zh: '體重',
    short_en: 'Weight',
  },
  {
    id: 'longevity',
    hash: 'longevity',
    icon: Hourglass,
    label_zh: '健康老化',
    label_en: 'Healthy ageing',
    blurb_zh: '活得久也活得好',
    blurb_en: 'Age well',
    group: 'goals',
    mobile: true,
    short_zh: '老化',
    short_en: 'Ageing',
  },
  {
    id: 'ultrahealth',
    hash: 'ultrahealth',
    icon: Sparkles,
    label_zh: '習慣養成',
    label_en: 'Build habits',
    blurb_zh: '作息·小習慣',
    blurb_en: 'Daily routine',
    group: 'goals',
    mobile: false,
    short_zh: '習慣',
    short_en: 'Habits',
  },
];

/** Sub-destinations that live underneath a pillar rather than beside it. */
export const DIET_SUB_NAV = [
  { hash: 'diet/patterns', label_zh: '各式飲食法比較', label_en: 'Dietary patterns' },
  { hash: 'supplements', label_zh: '保健食品的證據', label_en: 'Supplements & evidence' },
];

export const EXERCISE_SUB_NAV = [
  { hash: 'exercise', label_zh: '運動入門與心率', label_en: 'Exercise physiology' },
  { hash: 'exercise/running', label_zh: '跑步', label_en: 'Running' },
  { hash: 'exercise/cycling', label_zh: '自行車', label_en: 'Cycling' },
  { hash: 'exercise/mountaineering', label_zh: '登山高海拔', label_en: 'Mountaineering' },
  { hash: 'exercise/strength', label_zh: '肌力與肌耐力訓練', label_en: 'Strength & endurance' },
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
  { hash: 'about', label_zh: '關於 Salud 與實證原則', label_en: 'About & Evidence Principles' },
];

export const getPillarNav = (id: HealthPillar): PillarNavItem | undefined =>
  PILLAR_NAV.find((p) => p.id === id);
