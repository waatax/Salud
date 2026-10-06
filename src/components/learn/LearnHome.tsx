import React, { useState, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  PlayCircle,
  ClipboardList,
  AlertOctagon,
  Gauge,
  BookA,
  Wine,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Rocket,
  HeartPulse,
  Scale,
  Hourglass,
  Utensils,
  Activity,
  Moon,
  Wind,
  Droplets,
  Flame,
  Pill,
  Footprints,
  Dumbbell,
  Maximize2,
  PersonStanding,
  ChevronRight,
  Filter,
  GraduationCap,
  Layers,
  Table as TableIcon,
  Calculator,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_STARTER_TASKS } from '../../data/learning/starterPlan';
import { hashSegment } from '../../config/routes';
import { ActionPlanPanel } from './ActionPlanPanel';
import { QuickTips } from './QuickTips';
import { DailyStreakCard } from '../common/DailyStreakCard';
import { LEARNING_TRACKS, LEARNING_GOALS, ALL_LESSONS, findLesson, getTrack } from '../../data/learning/tracks';
import { EVIDENCE_UPDATES, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { LAB_METRICS } from '../../data/learning/checkup';
import { GLOSSARY } from '../../data/learning/glossary';
import { TONE, TrackIcon, ProgressBar, SectionTitle, LEARNING_ICONS, formatYM } from './learnUi';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

/** 熱門即時探索主題標籤 */
const POPULAR_CHIPS = [
  { label: 'ApoB 心血管早篩', hash: 'cardiometabolic', icon: HeartPulse, tone: 'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30' },
  { label: '地中海飲食法', hash: 'diet/patterns', icon: Utensils, tone: 'text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30' },
  { label: '科學增肌減脂', hash: 'obesity', icon: Scale, tone: 'text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/30' },
  { label: '深層睡眠與腦排毒', hash: 'sleep', icon: Moon, tone: 'text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-900/60 bg-violet-50/70 dark:bg-violet-950/30' },
  { label: 'Zone 2 有氧心率', hash: 'exercise', icon: Activity, tone: 'text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30' },
  { label: '看懂健檢紅字', hash: 'checkup', icon: ClipboardList, tone: 'text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30' },
  { label: '722 居家量血壓', hash: 'cardiometabolic/BP_722', icon: Gauge, tone: 'text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900/60 bg-sky-50/70 dark:bg-sky-950/30' },
  { label: '保健品 GRADE 評級', hash: 'supplements', icon: Pill, tone: 'text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/60 bg-teal-50/70 dark:bg-teal-950/30' },
  { label: '12 大細胞衰老標誌', hash: 'longevity', icon: Hourglass, tone: 'text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30' },
  { label: '史丹佛生理嘆氣', hash: 'mental', icon: Wind, tone: 'text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900/60 bg-teal-50/70 dark:bg-teal-950/30' },
];

type TopicCategory = 'all' | 'diet' | 'exercise' | 'cardio' | 'sleep_mind' | 'recomp_aging' | 'systems';

interface CuratedTopic {
  id: string;
  category: TopicCategory;
  title_zh: string;
  title_en: string;
  tagline_zh: string;
  hash: string;
  icon: any;
  tone: 'emerald' | 'sky' | 'amber' | 'rose' | 'violet' | 'teal';
  badges: string[];
}

/** 18 個核心全景主題卡片（滿足「信達雅」且讓使用者直覺找到興趣主題） */
const CURATED_TOPICS: CuratedTopic[] = [
  {
    id: 't-diet-patterns',
    category: 'diet',
    title_zh: '飲食模式比較',
    title_en: 'Dietary Patterns',
    tagline_zh: '地中海、低碳生酮、DASH 等常見飲食法橫向對比，掌握心血管與血糖實證',
    hash: 'diet/patterns',
    icon: Utensils,
    tone: 'emerald',
    badges: ['GRADE 實證', '熱量與營養素', '飲食法評比'],
  },
  {
    id: 't-supplements',
    category: 'diet',
    title_zh: '營養保健品評級',
    title_en: 'Supplements (GRADE)',
    tagline_zh: '魚油、維生素D、肌酸、益生菌等成分之 GRADE 實證等級，避開無效補充品',
    hash: 'supplements',
    icon: Pill,
    tone: 'teal',
    badges: ['GRADE 分級', '人體臨床證據', '安全性評估'],
  },
  {
    id: 't-water',
    category: 'diet',
    title_zh: '水分與水合機制',
    title_en: 'Water & Hydration',
    tagline_zh: '日常水分需求公式、電解質失衡預防與各類飲品水合指數解析',
    hash: 'W',
    icon: Droplets,
    tone: 'sky',
    badges: ['補水計算機', '滲透壓生理', '13 頁深度機制'],
  },
  {
    id: 't-oil',
    category: 'diet',
    title_zh: '油脂烹調與脂肪酸',
    title_en: 'Fats & Cooking Oils',
    tagline_zh: '發煙點迷思、Omega-3/6/9 比例、飽和與不飽和脂肪之動脈硬化影響',
    hash: 'O',
    icon: Flame,
    tone: 'amber',
    badges: ['油品替換模擬', '脂肪酸矩陣', '13 頁深度機制'],
  },
  {
    id: 't-alcohol',
    category: 'diet',
    title_zh: '酒精代謝與健康風險',
    title_en: 'Alcohol & Metabolism',
    tagline_zh: 'ALDH2 酒精不耐基因、乙醛毒性、致癌風險與飲酒後生理修復指南',
    hash: 'A',
    icon: Wine,
    tone: 'rose',
    badges: ['BAC 濃度試算', 'AUDIT-C 自評', '14 頁深度機制'],
  },
  {
    id: 't-exercise-phys',
    category: 'exercise',
    title_zh: '運動生理與心率區間',
    title_en: 'Exercise Physiology',
    tagline_zh: 'Zone 2 粒線體有氧、最大攝氧量 (VO2 max) 與運動心率區間科學推算',
    hash: 'exercise',
    icon: Activity,
    tone: 'emerald',
    badges: ['心率區間試算', '粒線體生合成', '運動處方'],
  },
  {
    id: 't-running',
    category: 'exercise',
    title_zh: '慢跑配速與跑者防護',
    title_en: 'Running & Pace Dynamics',
    tagline_zh: '步頻、乳酸閾值配速、長距離慢跑 (LSD) 處方與下肢肌腱跑步傷害預防',
    hash: 'exercise/running',
    icon: Footprints,
    tone: 'sky',
    badges: ['配速換算器', '跑步生理學', '防傷指南'],
  },
  {
    id: 't-strength',
    category: 'exercise',
    title_zh: '重量訓練與肌肥大',
    title_en: 'Strength Training & 1RM',
    tagline_zh: '漸進性超負荷、RPE/RIR 自覺強度、機械張力與 1RM 實用換算矩陣',
    hash: 'exercise/strength',
    icon: Dumbbell,
    tone: 'violet',
    badges: ['1RM 計算機', '動脈硬化阻力', '肌肥大科學'],
  },
  {
    id: 't-mobility',
    category: 'exercise',
    title_zh: '筋膜伸展與活動度',
    title_en: 'Mobility & Fascial Health',
    tagline_zh: '活動度關節自檢、筋膜水分調節、動態熱身與靜態伸展最佳時機',
    hash: 'exercise/mobility',
    icon: Maximize2,
    tone: 'teal',
    badges: ['活動度篩檢', '動力鏈調整', '筋膜生化'],
  },
  {
    id: 't-cardio',
    category: 'cardio',
    title_zh: '心血代謝與 ApoB',
    title_en: 'Cardiometabolic & ApoB',
    tagline_zh: 'ApoB 顆粒計數致病論、CAC 血管鈣化積分早篩、動脈硬化阻斷路徑',
    hash: 'cardiometabolic',
    icon: HeartPulse,
    tone: 'rose',
    badges: ['ACC/AHA 指引', 'ApoB vs LDL', '心血管風險'],
  },
  {
    id: 't-bp722',
    category: 'cardio',
    title_zh: '722 居家連續血壓',
    title_en: 'Home BP 722 Protocol',
    tagline_zh: '連續 7 天、早晚 2 遍、每次 2 回平均值，打破醫院白袍高血壓干擾',
    hash: 'cardiometabolic/BP_722',
    icon: Gauge,
    tone: 'sky',
    badges: ['TSOC 台灣指引', '連續 7 天評估', '心腎保護'],
  },
  {
    id: 't-checkup',
    category: 'cardio',
    title_zh: '看懂健檢報告',
    title_en: 'Check-up Guide & Labs',
    tagline_zh: '24 項血液尿液檢驗值白話對照、紅字臨床意義與台灣公費癌症篩檢時程',
    hash: 'checkup',
    icon: ClipboardList,
    tone: 'rose',
    badges: ['24 項數值白話', '公費篩檢資格', '健檢判讀工具'],
  },
  {
    id: 't-sleep',
    category: 'sleep_mind',
    title_zh: '睡眠生理與晝夜修復',
    title_en: 'Sleep & Circadian Rhythms',
    tagline_zh: '晝夜生物鐘、腺苷壓力、咖啡因半衰期模擬與深睡期腦淋巴排毒機制',
    hash: 'sleep',
    icon: Moon,
    tone: 'violet',
    badges: ['咖啡因代謝器', 'OSA 篩檢問卷', 'CBTI 實踐'],
  },
  {
    id: 't-mental',
    category: 'sleep_mind',
    title_zh: '心理神經與呼吸科學',
    title_en: 'Mind, Breath & Vagus',
    tagline_zh: '史丹佛生理嘆氣、0.1 Hz 迷走神經共振、自律神經 HRV 與皮質醇調控',
    hash: 'mental',
    icon: Wind,
    tone: 'teal',
    badges: ['呼吸節奏模擬器', '迷走神經煞車', '即時減壓'],
  },
  {
    id: 't-obesity',
    category: 'recomp_aging',
    title_zh: '增肌減脂與體組成',
    title_en: 'Body Recomp & Obesity',
    tagline_zh: '能量赤字、蛋白質槓桿、GLP-1 藥物利弊剖析、EOSS 肥胖分期與體脂計算',
    hash: 'obesity',
    icon: Scale,
    tone: 'amber',
    badges: ['體組成計算機', '減重藥物矩陣', '肌肉保留處方'],
  },
  {
    id: 't-longevity',
    category: 'recomp_aging',
    title_zh: '抗老延壽與生物年齡',
    title_en: 'Longevity & Geroscience',
    tagline_zh: '12 大細胞衰老標誌、表觀遺傳生物時鐘、激效反應與疾病壓縮假說',
    hash: 'longevity',
    icon: Hourglass,
    tone: 'emerald',
    badges: ['12 衰老標誌', '壽命軌跡模擬', 'ITP 化合物'],
  },
  {
    id: 't-ultrahealth',
    category: 'recomp_aging',
    title_zh: '24H 健康生活藍圖',
    title_en: 'Ultra-Health 24H Living',
    tagline_zh: '時鐘作息協議、晨光喚醒、進食時鐘與 14 天原子微習慣養成系統',
    hash: 'ultrahealth',
    icon: Sparkles,
    tone: 'emerald',
    badges: ['24H 作息矩陣', '14天習慣追蹤', '自適應技能樹'],
  },
  {
    id: 't-systems',
    category: 'systems',
    title_zh: '人體 8 大系統生理機制',
    title_en: 'Human Systems Physiology',
    tagline_zh: '心血管、神經、內分泌、免疫、呼吸、消化、骨骼肌與腎臟系統深度機制',
    hash: 'systems',
    icon: PersonStanding,
    tone: 'sky',
    badges: ['8 大生理系統', '器官交互圖解', '解剖生理學'],
  },
];

const CATEGORY_TABS: { id: TopicCategory; label_zh: string }[] = [
  { id: 'all', label_zh: '✨ 全部精選主題' },
  { id: 'diet', label_zh: '🥗 飲食與營養' },
  { id: 'exercise', label_zh: '🏃 運動與體能' },
  { id: 'cardio', label_zh: '🫀 心血代謝與檢驗' },
  { id: 'sleep_mind', label_zh: '🌙 睡眠與身心減壓' },
  { id: 'recomp_aging', label_zh: '⚖️ 體組成與延壽' },
  { id: 'systems', label_zh: '🧬 人體系統' },
];

interface PersonaGuideItem {
  id: string;
  emoji: string;
  title: string;
  tagline: string;
  hash: string;
  recommended: string;
  tone: string;
}

const PERSONAS: PersonaGuideItem[] = [
  {
    id: 'desk-worker',
    emoji: '👨‍💻',
    title: '久坐外食上班族',
    tagline: '外食高鈉、餐後昏睡、肩頸緊繃、動態不足',
    hash: 'learn/eat',
    recommended: '2:1:1 減脂餐盤 · Zone 2 微喘有氧',
    tone: 'border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200',
  },
  {
    id: 'athlete',
    emoji: '🏋️',
    title: '運動訓練與體態族',
    tagline: '增肌減脂、突破 1RM、避免運動受傷',
    hash: 'obesity',
    recommended: '1RM 最大肌力推算 · 肌肉保留處方',
    tone: 'border-violet-200 dark:border-violet-900/60 bg-violet-50/50 dark:bg-violet-950/20 text-violet-900 dark:text-violet-200',
  },
  {
    id: 'lab-alert',
    emoji: '🩺',
    title: '健檢報告紅字族',
    tagline: '膽固醇 LDL-C 紅字、脂肪肝、血壓臨界偏高',
    hash: 'checkup',
    recommended: 'ApoB 心血管早篩 · 722 居家量血壓',
    tone: 'border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200',
  },
  {
    id: 'sleep-stress',
    emoji: '🌙',
    title: '失眠多夢高壓族',
    tagline: '入睡困難、自律神經亢奮、夜間易醒',
    hash: 'sleep',
    recommended: '咖啡因半衰期試算 · 史丹佛生理嘆氣',
    tone: 'border-teal-200 dark:border-teal-900/60 bg-teal-50/50 dark:bg-teal-950/20 text-teal-900 dark:text-teal-200',
  },
  {
    id: 'elderly-care',
    emoji: '👵',
    title: '熟齡健康與家人守護',
    tagline: '肌少症防跌、骨質疏鬆、公費癌症篩檢',
    hash: 'learn/prevent',
    recommended: '亞洲肌少症 AWGS · 台灣公費癌篩',
    tone: 'border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200',
  },
];

export const LearnHome: React.FC = () => {
  const { go } = useNavigation();
  const { openModal } = useModal();
  const { progress } = useLearningProgress();
  const { plan, starterDone } = useActionPlan();
  const [activeCategory, setActiveCategory] = useState<TopicCategory>('all');

  const starterCount = ALL_STARTER_TASKS.filter((t) => starterDone(t.id)).length;

  // `#home/plan` (from any 「立即上手」 card) scrolls straight to the action plan.
  useEffect(() => {
    const scroll = () => {
      if (hashSegment('home') === 'plan') {
        window.setTimeout(() => document.getElementById('my-plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      }
    };
    scroll();
    window.addEventListener('hashchange', scroll);
    return () => window.removeEventListener('hashchange', scroll);
  }, []);

  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = progress.last ? getTrack(progress.last.trackId) : undefined;
  const doneCount = progress.completed.filter((id) => ALL_LESSONS.some((l) => l.id === id)).length;
  const latest = [...EVIDENCE_UPDATES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  const filteredTopics = activeCategory === 'all'
    ? CURATED_TOPICS
    : CURATED_TOPICS.filter((t) => t.category === activeCategory);

  const scrollToTopicExplorer = () => {
    document.getElementById('topic-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-12 pb-8 animate-fade-in">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-200/70 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:from-emerald-950/40 dark:via-salud-dark-card dark:to-sky-950/20 px-5 py-8 sm:px-10 sm:py-12">
        <div className="relative z-10 max-w-3xl space-y-5">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-white/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            給每個人的健康學習平台 · 實證內容更新至 2026 年
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight text-balance">
            看懂身體、吃對食物、
            <br className="hidden sm:block" />
            讀懂你的健檢報告
          </h1>
          <p className="text-base sm:text-lg leading-8 text-slate-600 dark:text-slate-300">
            {LEARNING_TRACKS.length} 條學習路徑、{ALL_LESSONS.length} 堂白話小課、18 座專科深度知識庫。每一句都標示證據等級，依據
            2024–2026 年最新臨床醫學指引。
          </p>

          {/* 搜尋欄位 */}
          <button
            onClick={() => openModal('search')}
            className="group w-full sm:max-w-xl flex items-center gap-3 rounded-2xl border border-slate-300/80 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5 text-left shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
          >
            <Search className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" aria-hidden="true" />
            <span className="flex-1 text-[15px] text-slate-500 dark:text-slate-400">搜尋主題、數值、症狀 (例如: ApoB, 睡眠, 膝蓋痛, 糖化血色素)…</span>
            <kbd className="hidden sm:inline text-[11px] font-mono text-slate-500 border border-slate-300 dark:border-slate-700 rounded-md px-1.5 py-0.5">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>

          {/* 即時熱門探索標籤 Chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">熱門快速探索：</span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_CHIPS.map((chip) => {
                const ChipIcon = chip.icon;
                return (
                  <button
                    key={chip.label}
                    onClick={() => go(chip.hash)}
                    className={`btn-tactile inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium border transition-all ${chip.tone} hover:shadow-xs hover:scale-[1.02]`}
                  >
                    <ChipIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>#{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => go('start')}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 font-semibold px-5 py-3 transition-colors shadow-xs"
            >
              <Rocket className="w-5 h-5" aria-hidden="true" />
              {starterCount > 0 ? `繼續 4 週啟動計畫（${starterCount}/${ALL_STARTER_TASKS.length}）` : '開始 4 週健康啟動計畫'}
            </button>
            <button
              onClick={() => go('learn')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-semibold px-5 py-3 hover:border-emerald-500 transition-colors"
            >
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
              瀏覽 {ALL_LESSONS.length} 堂課
            </button>
            <button
              onClick={scrollToTopicExplorer}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-semibold px-5 py-3 hover:bg-emerald-100/60 transition-colors"
            >
              <Layers className="w-5 h-5" aria-hidden="true" />
              全景主題探索大廳
            </button>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { n: ALL_LESSONS.length, l: '堂白話小課' },
              { n: EVIDENCE_UPDATES.length, l: '則最新實證' },
              { n: LAB_METRICS.length, l: '項檢驗解讀' },
              { n: GLOSSARY.length, l: '個名詞白話' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 px-3 py-2">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-2xl font-display font-bold text-slate-900 dark:text-white tabular-nums">{s.n}</dd>
                <dd className="text-xs text-slate-600 dark:text-slate-400">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 每日健康生活打卡與微習慣 ─────────────────────────────────── */}
      <DailyStreakCard />

      {/* ── 接續上次學習 ─────────────────────────────────────────── */}
      {lastLesson && lastTrack && (
        <section aria-label="繼續學習">
          <button
            onClick={() => go(`learn/${lastTrack.id}/${lastLesson.id}`)}
            className={`w-full flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 ${TONE[lastTrack.tone].soft} ${TONE[lastTrack.tone].ring} px-4 py-4 text-left transition-colors`}
          >
            <TrackIcon icon={lastTrack.icon} tone={lastTrack.tone} />
            <span className="flex-1 min-w-0">
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                繼續上次的課程 · {lastTrack.title_zh} · 已完成 {doneCount}/{ALL_LESSONS.length} 課
              </span>
              <span className="block font-semibold text-slate-900 dark:text-white truncate">{lastLesson.title_zh}</span>
            </span>
            <PlayCircle className={`w-6 h-6 shrink-0 ${TONE[lastTrack.tone].text}`} aria-hidden="true" />
          </button>
        </section>
      )}

      {/* ── 今日行動計畫或新手立即上手技巧 ── */}
      {plan.items.length > 0 ? <ActionPlanPanel /> : <QuickTips sectionKey="home" />}

      {/* ── 🎯 依身分與生活型態對焦 (Persona Guide) ── */}
      <section aria-labelledby="persona-h" className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
          <div>
            <h2 id="persona-h" className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white">
              依你的生活型態與健康困擾快速對焦
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              選擇最符合你當前狀態的生活情境，直達針對性的實踐方案與核心機制
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => go(p.hash)}
              className={`btn-tactile group flex flex-col justify-between p-4 rounded-2xl border text-left transition-all hover:shadow-sm hover:-translate-y-0.5 space-y-3 ${p.tone}`}
            >
              <div className="space-y-1.5">
                <span className="text-2xl block">{p.emoji}</span>
                <h3 className="font-bold text-sm leading-snug">{p.title}</h3>
                <p className="text-[11px] leading-relaxed opacity-80">{p.tagline}</p>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold block opacity-60">推薦核心：</span>
                <span className="text-[11px] font-semibold leading-tight block">{p.recommended}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── 🧮 互動試算神器大廳 Banner ── */}
      <section className="rounded-3xl border border-emerald-300/80 dark:border-emerald-800/60 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-bold backdrop-blur-sm">
            <Calculator className="w-3.5 h-3.5" />
            <span>18+ 款臨床醫學試算工具</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            互動健康試算工具箱：精準掌握身體數據
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            日常補水公式、Zone 2 心率區間、咖啡因代謝半衰期、重訓 1RM、退酒時間估算與 722 居家連續血壓協定，隨開即算！
          </p>
        </div>
        <button
          onClick={() => openModal('simulators')}
          className="btn-tactile shrink-0 px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>開啟試算工具大廳</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* ── 🔥 全新核心：全景主題探索大廳 (Featured Topics Explorer) ─────────────── */}
      <section id="topic-explorer" aria-labelledby="curated-topics-h" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Thematic Topic Navigator</span>
            </div>
            <h2 id="curated-topics-h" className="text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
              全景主題探索大廳
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              想深入研究特定健康領域？依分類快速探索所有主題、核心疑問與專屬互動模擬器。
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            共 {filteredTopics.length} 個主題模組
          </span>
        </div>

        {/* 分類切換器 Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`btn-tactile px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs dark:bg-emerald-600 dark:border-emerald-500'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700'
                }`}
              >
                {tab.label_zh}
              </button>
            );
          })}
        </div>

        {/* 主題卡片網格 (信達雅設計) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {filteredTopics.map((item) => {
            const Icon = item.icon;
            const toneObj = TONE[item.tone];

            return (
              <button
                key={item.id}
                onClick={() => go(item.hash)}
                className={`group flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 text-left transition-all duration-200 hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-md hover:-translate-y-0.5 space-y-4`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`w-10 h-10 rounded-2xl flex items-center justify-center ${toneObj.chip} border shrink-0 transition-transform group-hover:scale-105`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {item.badges.slice(0, 2).map((b) => (
                        <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {item.title_zh}
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                      {item.title_en}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {item.tagline_zh}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <span className="text-[11px] font-mono">進入深度專區</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── 目標對焦：你想從哪裡開始？ ────────────────────────────── */}
      <section aria-labelledby="goals-h">
        <SectionTitle id="goals-h" title="依個人目標與困擾對焦" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEARNING_GOALS.map((g) => {
            const Icon = LEARNING_ICONS[g.icon];
            const track = getTrack(g.track_id);
            return (
              <button
                key={g.id}
                onClick={() => go(`learn/${g.track_id}${g.lesson_id ? `/${g.lesson_id}` : ''}`)}
                className="group flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-sm transition-all"
              >
                <span className={`mt-0.5 w-9 h-9 rounded-xl inline-flex items-center justify-center ${track ? TONE[track.tone].chip : ''} border shrink-0`}>
                  <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-slate-900 dark:text-white leading-snug">{g.label_zh}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{g.hint_zh}</span>
                </span>
                <ArrowRight className="w-4 h-4 mt-1 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </section>

      {/* ── 7 大學習路徑 ───────────────────────────────────────────── */}
      <section aria-labelledby="tracks-h">
        <SectionTitle
          id="tracks-h"
          title="7 大循序漸進學習路徑"
          action={
            <button onClick={() => go('learn')} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              課程總表 →
            </button>
          }
        />
        <p className="text-sm text-slate-600 dark:text-slate-400 -mt-1 mb-4">建議初學者依序閱讀打底；每條路徑也可以依興趣單獨研讀。</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {LEARNING_TRACKS.map((t, i) => {
            const done = t.lessons.filter((l) => progress.completed.includes(l.id)).length;
            const pct = (done / t.lessons.length) * 100;
            const minutes = t.lessons.reduce((s, l) => s + l.minutes, 0);
            return (
              <li key={t.id}>
                <button
                  onClick={() => go(`learn/${t.id}`)}
                  className={`w-full h-full flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left ${TONE[t.tone].ring} hover:shadow-sm transition-all`}
                >
                  <span className="flex items-start gap-3">
                    <TrackIcon icon={t.icon} tone={t.tone} />
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs text-slate-500 dark:text-slate-400">路徑 {i + 1}</span>
                      <span className="block text-base font-bold text-slate-900 dark:text-white">{t.title_zh}</span>
                      <span className="block text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">{t.subtitle_zh}</span>
                    </span>
                    {done === t.lessons.length && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-label="已完成" />}
                  </span>
                  <div className="space-y-1.5 w-full">
                    <span className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span>{t.lessons.length} 課</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />約 {minutes} 分鐘
                      </span>
                      <span className="ml-auto tabular-nums">
                        {done}/{t.lessons.length}
                      </span>
                    </span>
                    <ProgressBar value={pct} tone={t.tone} label={`${t.title_zh} 完成度`} />
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── 最新實證：2024–2026 改變了什麼 ─────────────────────────────── */}
      <section aria-labelledby="updates-h">
        <SectionTitle
          id="updates-h"
          title="最新實證：2024–2026 改變了什麼"
          action={
            <button onClick={() => go('updates')} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              全部 {EVIDENCE_UPDATES.length} 則 →
            </button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latest.map((u) => (
            <button
              key={u.id}
              onClick={() => go(`updates/${u.id}`)}
              className="flex flex-col gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{UPDATE_CATEGORY_META[u.category].label_zh}</span>
                <span aria-hidden="true">·</span>
                <span>{formatYM(u.date)}</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white leading-6">{u.title_zh}</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">{u.what_it_means_zh}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 實用工具箱 ────────────────────────────────────────────── */}
      <section aria-labelledby="tools-h">
        <SectionTitle id="tools-h" title="實用工具箱" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { icon: ClipboardList, label: '看懂健檢報告', hint: '24 項檢驗值白話對照', onClick: () => go('checkup'), tone: 'text-rose-700 dark:text-rose-300' },
            { icon: AlertOctagon, label: '危險警訊', hint: '何時要立刻撥打119就醫', onClick: () => openModal('emergency'), tone: 'text-red-700 dark:text-red-300' },
            { icon: Gauge, label: '722 居家血壓', hint: '連續 7 天早晚量測標準協定', onClick: () => go('cardiometabolic/BP_722'), tone: 'text-sky-700 dark:text-sky-300' },
            { icon: BookA, label: '健康小辭典', hint: '43 個艱澀醫學名詞白話', onClick: () => go('glossary'), tone: 'text-violet-700 dark:text-violet-300' },
            { icon: Wine, label: '飲酒風險自評', hint: 'AUDIT-C 三題標準量表', onClick: () => openModal('auditC'), tone: 'text-amber-700 dark:text-amber-300' },
          ].map((tool) => (
            <button
              key={tool.label}
              onClick={tool.onClick}
              className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors shadow-xs"
            >
              <tool.icon className={`w-6 h-6 ${tool.tone}`} aria-hidden="true" />
              <span className="font-semibold text-slate-900 dark:text-white leading-snug">{tool.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{tool.hint}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 常見生活困擾與推薦課程速查導航表 ────────────────────────── */}
      <SymptomToCourseGuide onNavigate={(hash) => go(hash)} />

      {/* ── 全站學習體系與長壽支柱架構總表 ──────────────────────────── */}
      <HealthMasteryFrameworkTable onNavigate={(hash) => go(hash)} />

      {/* ── 信任與醫學實證底線 ────────────────────────────────────── */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/40 p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
        <ShieldCheck className="w-9 h-9 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
        <div className="flex-1 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white">內容編撰與實證基準：</strong>
          全站內容依據國際一線醫學會臨床指引（ACC/AHA、ADA、KDIGO、WHO、衛福部國健署）與大型同儕評審臨床試驗編纂，每條建議均明確標記 A–E 證據等級。Salud
          提供科學健康教育，不能取代主治醫師的臨床診斷與個別化處方。
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => go('about')} className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
            編輯方針
          </button>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <button onClick={() => go('evidence')} className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
            實證分級說明
          </button>
        </div>
      </section>
    </div>
  );
};

/** 常見生活困擾與推薦課程速查導航表 */
const SymptomToCourseGuide: React.FC<{ onNavigate: (hash: string) => void }> = ({ onNavigate }) => {
  const guides = [
    {
      symptom: '健檢報告 LDL-C 或總膽固醇出現紅字',
      mechanism: 'ApoB 顆粒滲入血管內膜形成動脈硬化斑塊',
      lesson: '血脂異常最新指標與個人化 LDL 目標',
      hash: 'learn/checkup/L-CHK-04',
      action: '換掉油炸與飽和脂肪，改用初榨橄欖油，每週 150 分鐘 Zone 2 有氧',
    },
    {
      symptom: '吃飽飯後嚴重昏睡 (Food Coma)、腰圍變粗',
      mechanism: '高 GI 飲食引發血糖暴衝暴跌與胰島素阻抗',
      lesson: '糖尿病前期：最好的逆轉窗口',
      hash: 'learn/prevent/L-PRE-03',
      action: '執行哈佛 2:1:1 餐盤「菜→肉→飯」順序，飯後快走 10 分鐘',
    },
    {
      symptom: '翻來覆去超過 30 分鐘睡不著、夜間多夢易醒',
      mechanism: '晝夜節律褪黑激素不足與交感神經高張亢奮',
      lesson: '規律作息與失眠 CBT-I 刺激控制法',
      hash: 'learn/rest/L-REST-04',
      action: '清晨起床照戶外光 15 分鐘，睡前 1 小時停用 3C 藍光，練習史丹佛生理嘆氣',
    },
    {
      symptom: '很久沒運動，想開始但怕膝蓋痛或受傷',
      mechanism: '關節活動度與肌力流失，心肺未經漸進適應',
      lesson: '每週 150 分鐘與 Zone 2 粒線體有氧',
      hash: 'learn/move/L-MOVE-01',
      action: '從每天 10 分鐘輕鬆散步開始，執行 4 週無痛啟動計畫',
    },
    {
      symptom: '腹部超音波照出脂肪肝、肝指數 ALT 微升',
      mechanism: '肝臟新生脂肪 (DNL) 累積與脂毒性微發炎',
      lesson: '肝指數與脂肪肝：FIB-4 纖維化風險評估',
      hash: 'learn/checkup/L-CHK-06',
      action: '戒除含糖手搖飲與果糖，體重只要減輕 5% 即可大幅排空肝臟脂肪',
    },
    {
      symptom: '40 歲後常覺無力、擔心父母跌倒臥床',
      mechanism: '骨骼肌每十年自然流失 8%，亞洲肌少症 (AWGS)',
      lesson: '肌少症與骨質疏鬆：幾歲開始練都不嫌晚',
      hash: 'learn/prevent/L-PRE-06',
      action: '每餐補足 2.5g 白胺酸蛋白質 (約 1 顆蛋+1 份豆/魚)，每週 2 次居家椅子深蹲',
    },
  ];

  return (
    <section aria-labelledby="symptom-table-h" className="space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <TableIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <div>
          <h2 id="symptom-table-h" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            對症導航：從常見生活困擾到推薦課程速查表
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">點擊任一推薦課程即可直接進入閱讀專屬白話解析與實踐指南。</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[170px]">常見困擾 / 徵象</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[160px]">背後生理機轉</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[160px]">推薦小課</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[200px]">今日第一步行動</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {guides.map((g, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white align-top">
                  {g.symptom}
                </td>
                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 align-top leading-relaxed">
                  {g.mechanism}
                </td>
                <td className="py-3 px-3.5 align-top">
                  <button
                    onClick={() => onNavigate(g.hash)}
                    className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 text-left"
                  >
                    <span>{g.lesson}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 align-top leading-relaxed font-medium">
                  {g.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/** 全站學習體系與長壽支柱架構總表 */
const HealthMasteryFrameworkTable: React.FC<{ onNavigate: (hash: string) => void }> = ({ onNavigate }) => {
  const frameworks = [
    {
      pillar: '1. 基礎素養與就醫防線',
      tracks: '健康素養入門 (L-BAS-01 ~ 06)',
      focus: '五大生命徵象基準、辨識假醫學資訊、急診紅旗警訊、門診 Ask Me 3 與用藥安全',
      time: '約 36 分鐘',
      link: 'learn/basics',
    },
    {
      pillar: '2. 認識身體器官生理',
      tracks: '認識你的身體 (L-BODY-01 ~ 08)',
      focus: '心血管硬化、呼吸換氣、腸道微生態、肝臟代謝、腎絲球過濾、關節鏈、大腦自律神經與發炎',
      time: '約 47 分鐘',
      link: 'learn/body',
    },
    {
      pillar: '3. 飲食營養與腸胃健康',
      tracks: '吃得對 (L-EAT-01 ~ 09)、水油酒專科',
      focus: '哈佛 2:1:1 餐盤、NOVA 超加工防線、蛋白質劑量、烹調油發煙點、得舒飲食與酒精代謝',
      time: '約 55 分鐘',
      link: 'learn/eat',
    },
    {
      pillar: '4. 骨骼肌力與心肺有氧',
      tracks: '動得好 (L-MOVE-01 ~ 07)、運動 9 大專項',
      focus: '每週 150 分鐘、長壽步數曲線、六大抗阻模式、活動度、Zone 2 心率、PEACE&LOVE 防傷與破除久坐',
      time: '約 46 分鐘',
      link: 'learn/move',
    },
    {
      pillar: '5. 晝夜節律與身心修復',
      tracks: '睡好與心理 (L-REST-01 ~ 07)',
      focus: '睡眠架構週期、光照褪黑激素、咖啡因半衰期、CBT-I 刺激控制法、OSA 打呼篩檢、皮質醇與嘆氣呼吸法',
      time: '約 46 分鐘',
      link: 'learn/rest',
    },
    {
      pillar: '6. 看懂健檢與預防醫學',
      tracks: '看懂健檢 (L-CHK-01 ~ 08) 與預防 (L-PRE-01 ~ 09)',
      focus: '成人預防保健、722 血壓、血糖三指標、LDL 風險階梯、KDIGO 腎病、FIB-4、代謝症候群、公費六癌與疫苗',
      time: '約 1.7 小時',
      link: 'learn/checkup',
    },
  ];

  return (
    <section aria-labelledby="framework-table-h" className="space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <div>
          <h2 id="framework-table-h" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            循證全景：Salud 健康學習體系與長壽支柱總覽表
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">橫跨六大臨床支柱，帶領讀者完整掌握自身健康數據與生活介入方法。</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[150px]">臨床核心支柱</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[160px]">對應學習路徑</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[220px]">核心學習模組與關鍵技能</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[90px]">修讀時長</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[80px]">前往</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {frameworks.map((f, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white align-top">{f.pillar}</td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 align-top font-medium">{f.tracks}</td>
                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 align-top leading-relaxed">{f.focus}</td>
                <td className="py-3 px-3.5 text-slate-500 dark:text-slate-400 align-top tabular-nums">{f.time}</td>
                <td className="py-3 px-3.5 align-top">
                  <button
                    onClick={() => onNavigate(f.link)}
                    className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5 text-xs"
                  >
                    進入 <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

