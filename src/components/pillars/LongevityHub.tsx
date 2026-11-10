import React, { useState } from 'react';
import { LONGEVITY_MASTERY_QUIZZES } from '../../data/longevityData';
import { useHashTab } from '../../hooks/useHashTab';
import { LONGEVITY_TABS } from '../../config/routes';
import { HubHero } from '../common/HubHero';
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
} from 'lucide-react';

export const LongevityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useHashTab<LongevitySubTab>('longevity', LONGEVITY_TABS, 'OVERVIEW');

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      <HubHero primer={HUB_PRIMERS.longevity} compact={activeTab !== 'OVERVIEW'} />

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-emerald-200/80 dark:border-slate-800 pb-2 text-sm">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'OVERVIEW'
              ? 'bg-emerald-600 text-white font-extrabold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Hourglass className="w-4 h-4" />
          <span>總覽：從哪裡開始</span>
        </button>

        <button
          onClick={() => setActiveTab('HALLMARKS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'HALLMARKS'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/40'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>身體為什麼會老：12 個標誌</span>
        </button>

        <button
          onClick={() => setActiveTab('EPIGENETIC_CLOCKS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'EPIGENETIC_CLOCKS'
              ? 'bg-emerald-700 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-500 hover:bg-emerald-50/40'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>生物年齡檢測可信嗎</span>
        </button>

        <button
          onClick={() => setActiveTab('PHARMACOTHERAPY')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'PHARMACOTHERAPY'
              ? 'bg-teal-700 text-white font-extrabold border-teal-600 shadow-md ring-2 ring-teal-600/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-500 hover:bg-teal-50/40'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>抗老藥物與補充品的證據</span>
        </button>

        <button
          onClick={() => setActiveTab('HORMESIS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'HORMESIS'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>桑拿、冷水與適度壓力</span>
        </button>

        <button
          onClick={() => setActiveTab('SIMULATOR')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'SIMULATOR'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/40'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>生活習慣與健康壽命試算</span>
        </button>

        <button
          onClick={() => setActiveTab('BEHAVIOR_AND_QUIZ')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'BEHAVIOR_AND_QUIZ'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>小測驗（{LONGEVITY_MASTERY_QUIZZES.length} 題）</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: OVERVIEW & EXPERT COUNCIL
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8 animate-fade-in">
          {/* Core Philosophy Card */}
          <div className="rounded-3xl border border-emerald-300/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-salud-cyan uppercase">
              <Dna className="w-4 h-4 text-emerald-600 dark:text-salud-cyan" />
              <span>Geroscience Core Paradigm Shift</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
              老年學範式轉移：把「衰老本身」當作所有重大慢性病的共同根源
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              心血管硬化、阿茲海默症、第二型糖尿病與惡性腫瘤，並非孤立發生的偶發疾病，而是底層「12 大分子衰老標誌」長期侵蝕器官組織後的共同終端產物。
              若僅單一治療個別疾病，延長的往往只是患病失能的殘存歲月；唯有延緩細胞衰老速率，才能達成 James Fries 的「疾病壓縮 (Morbidity Compression)」——將失能臥床期壓縮至生命最後數月。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 space-y-1">
                <div className="font-bold text-emerald-800 dark:text-indigo-400 text-xs">平均壽命 (Lifespan)</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">客觀生存總年數</div>
                <p className="text-[0.75rem] text-slate-600 dark:text-slate-400">目前已開發國家平均約 80~84 歲</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 space-y-1">
                <div className="font-bold text-teal-800 dark:text-salud-cyan text-xs">健康壽命 (Healthspan)</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">無重大失能之自主歲月</div>
                <p className="text-[0.75rem] text-slate-600 dark:text-slate-400">目前平均僅 66~68 歲（存在 14 年失能鴻溝）</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-100/60 dark:bg-emerald-950/20 border border-emerald-300/80 dark:border-emerald-500/30 space-y-1">
                <div className="font-bold text-emerald-900 dark:text-emerald-400 text-xs">疾病壓縮 (Morbidity Compression)</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">長壽醫學終極追求</div>
                <p className="text-[0.75rem] text-slate-700 dark:text-slate-300">活至 90+ 歲高齡，失能期壓縮至最後 1~2 年</p>
              </div>
            </div>
          </div>

          {/* Obesity & Aging Synergistic Banner */}
          <div className="p-6 rounded-3xl border border-emerald-300/80 dark:border-amber-500/40 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 dark:from-amber-950/40 dark:via-rose-950/30 dark:to-slate-900 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
              <span>跨專區共病深度聯防：肌肉流失與肥胖即是加速衰老之生理表型</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              為什麼增肌減脂專區與抗老延壽專區互為因果基石？
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              肥胖患者腹腔內大量肥大的內臟脂肪細胞，是人體最大宗的「殭屍細胞」(p16 陽性) 與 SASP 發炎因子製造源。BMI 每增加 5，DNA 甲基化時鐘 (GrimAge) 加速 1.2 年！反之，積極維持健康體組成、增加骨骼肌質量與降低內臟脂肪，是抗老延壽成本效益最高的干預手段。
            </p>
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
    </div>
  );
};
