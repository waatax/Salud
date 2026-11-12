import React, { useState } from 'react';
import { LONGEVITY_MASTERY_QUIZZES } from '../../data/longevityData';
import { useHashTab } from '../../hooks/useHashTab';
import { LONGEVITY_TABS } from '../../config/routes';
import { HubHero } from '../common/HubHero';
import { HubTabBar, type HubTabGroup } from '../common/HubTabBar';
import { HUB_PRIMERS } from '../../data/hubPrimers';
import { LongevitySubTab } from '../../types';
import { InfographHallmarksWheel } from './longevity/InfographHallmarksWheel';
import { InfographEpigeneticClocks } from './longevity/InfographEpigeneticClocks';
import { InfographLongevityCompounds } from './longevity/InfographLongevityCompounds';
import { InfographSenescenceSASP } from './longevity/InfographSenescenceSASP';
import { InfographHormesisProtocol } from './longevity/InfographHormesisProtocol';
import { LongevityMasteryQuiz } from './longevity/LongevityMasteryQuiz';
import { SimLongevityTrajectory } from '../simulators/SimLongevityTrajectory';
import {
  Hourglass,
  Dna,
  Clock,
  Pill,
  Flame,
  Award,
  Sparkles,
  Layers,
  Sliders,
  ShieldCheck,
  Stethoscope,
  Heart,
  Brain,
  AlertTriangle,
  ArrowRight,
  Activity,
  CheckCircle2,
  Map as MapIcon,
} from 'lucide-react';
import { KnowledgeAtlasView } from '../knowledge/KnowledgeAtlasView';
import { LONGEVITY_ATLAS } from '../../data/atlas';

export const LONGEVITY_TAB_GROUPS: HubTabGroup<LongevitySubTab>[] = [
  {
    label: '基本觀念',
    tabs: [
      { id: 'OVERVIEW', label: '總覽：健康餘命', icon: Hourglass },
      { id: 'HALLMARKS', label: '老化的 12 個標誌', icon: Layers },
      { id: 'HORMESIS', label: '運動、桑拿與適度壓力', icon: Flame },
    ],
  },
  {
    label: '檢測與藥物證據',
    tabs: [
      { id: 'EPIGENETIC_CLOCKS', label: '生物年齡檢測', icon: Clock },
      { id: 'PHARMACOTHERAPY', label: '抗老藥物與補充品證據', icon: Pill },
    ],
  },
  {
    label: '試算與測驗',
    tabs: [
      { id: 'SIMULATOR', label: '健康壽命試算', icon: Sliders, featured: true },
      { id: 'BEHAVIOR_AND_QUIZ', label: `觀念測驗（${LONGEVITY_MASTERY_QUIZZES.length} 題）`, icon: Award },
    ],
  },
  {
    label: '從小白到大師',
    tabs: [
      { id: 'ATLAS', label: '抗老知識點全圖', icon: MapIcon, featured: true },
    ],
  },
];

export const LongevityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useHashTab<LongevitySubTab>('longevity', LONGEVITY_TABS, 'OVERVIEW');

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      <HubHero primer={HUB_PRIMERS.longevity} compact={activeTab !== 'OVERVIEW'} />

      <HubTabBar groups={LONGEVITY_TAB_GROUPS} active={activeTab} onChange={setActiveTab} ariaLabel="健康老化專區分頁" />

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6 animate-fade-in">
          {/* Core Philosophy Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase">
              <Dna className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>健康老化的核心目標：縮短臥床失能的時間</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              看懂「平均壽命」與「健康餘命」的差距（疾病壓縮理論）
            </h2>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              心血管疾病、失智症、第二型糖尿病與肌少症，背後都與細胞長年的慢性發炎、粒線體功能下降等老化過程有關。現代健康老化醫學（Geroscience）追求的不只是延長壽命數字，而是達成<strong>「疾病壓縮（Morbidity Compression）」</strong>——讓人在高齡時仍能自己走路、清楚思考、享受生活，把需要他人照護的失能期縮到最短。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-700 dark:text-slate-300 text-xs">平均壽命 (Lifespan)</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">活到幾歲</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">台灣平均壽命約 80 歲上下，但最後數年常伴隨慢性病與行動不便。</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 space-y-1">
                <div className="font-bold text-teal-800 dark:text-emerald-400 text-xs">健康餘命 (Healthspan)</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">不需依賴他人照護的歲月</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">平均壽命與健康餘命之間，往往存在約 7–10 年以上的失能落差。</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/30 border border-emerald-300/80 dark:border-emerald-700/40 space-y-1">
                <div className="font-bold text-emerald-900 dark:text-emerald-300 text-xs">疾病壓縮 (Morbidity Compression)</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">把失能期縮到最短</div>
                <p className="text-xs text-slate-700 dark:text-slate-300">透過運動、營養、睡眠與三高控制，延後慢性病與失能出現的年紀。</p>
              </div>
            </div>
          </div>

          {/* Obesity & Muscle Synergistic Banner */}
          <div className="p-6 rounded-3xl border border-emerald-200/90 dark:border-slate-800 bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-white dark:from-slate-900 dark:to-slate-950 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>最務實的抗老行動：保留肌肉量、減少內臟脂肪</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              為什麼肌力訓練與體重管理是健康老化的基礎？
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              過多的內臟脂肪會持續釋放發炎訊號（SASP 發炎因子），加速血管硬化與胰島素阻抗；而腿部與全身肌肉量則直接決定年老後的平衡防跌與代謝能力。比起昂貴卻尚無定論的抗老補充品，每週 2 次阻力訓練、規律有氧運動與充足蛋白質，是目前人體研究證據最明確的做法。
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('SIMULATOR')}
                className="btn-tactile inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>前往生活習慣與健康壽命試算</span>
              </button>
              <a
                href="#exercise/strength"
                className="btn-tactile inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <span>查看肌力與重訓指南</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: 12 HALLMARKS OF AGING
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'HALLMARKS' && (
        <div className="space-y-8 animate-fade-in">
          <InfographHallmarksWheel />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: EPIGENETIC CLOCKS & BIOMARKERS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'EPIGENETIC_CLOCKS' && (
        <div className="space-y-8 animate-fade-in">
          <InfographEpigeneticClocks />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: LONGEVITY COMPOUNDS & SASP CLEARANCE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'PHARMACOTHERAPY' && (
        <div className="space-y-8 animate-fade-in">
          <InfographLongevityCompounds />
          <InfographSenescenceSASP />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: HORMESIS PROTOCOLS & ENVIRONMENTAL ADAPTATION
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'HORMESIS' && (
        <div className="space-y-8 animate-fade-in">
          <InfographHormesisProtocol />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: SIMULATOR & MORBIDITY COMPRESSION
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'SIMULATOR' && (
        <div className="space-y-8 animate-fade-in">
          <SimLongevityTrajectory />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: MASTERY QUIZ & INTERACTIVE ASSESSMENT
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'BEHAVIOR_AND_QUIZ' && (
        <div className="space-y-8 animate-fade-in">
          <LongevityMasteryQuiz onNavigateToTab={(tab) => setActiveTab(tab as LongevitySubTab)} />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 8: KNOWLEDGE ATLAS (小白到大師知識點全圖)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'ATLAS' && (
        <div className="space-y-8 animate-fade-in">
          <KnowledgeAtlasView atlas={LONGEVITY_ATLAS} />
        </div>
      )}
    </div>
  );
};
