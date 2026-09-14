import React, { useState } from 'react';
import { PersonalHealthBlueprint } from './PersonalHealthBlueprint';
import { DailyProtocolMatrix } from './DailyProtocolMatrix';
import { AtomicHabitTracker } from './AtomicHabitTracker';
import { MobilityPhysioGuide } from './MobilityPhysioGuide';
import { MasterySkillTree } from './MasterySkillTree';
import {
  Sparkles,
  Clock,
  Zap,
  Activity,
  Award,
  Compass,
  CheckCircle2,
  HeartPulse
} from 'lucide-react';

export type UltraHealthTab = 'BLUEPRINT' | 'PROTOCOL' | 'HABITS' | 'PHYSIO' | 'SKILL_TREE';

export const UltraHealthHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UltraHealthTab>('BLUEPRINT');

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      {/* Grand Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-cyan-500/15 p-6 sm:p-10 shadow-xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>均一教育平台 × 臨床醫學 × 生活醫學 × 運動物治大師</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
              Salud 個人超健康實踐系統
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              拒絕「假健康」焦慮與「知易行難」。由 29 席跨學科專家理事會聯席審定，為每位追求極致狀態的自律者打造個人化生活醫學藍圖！結合 <span className="text-amber-400 font-semibold">個人客製藍圖診斷</span>、<span className="text-cyan-400 font-semibold">24H 晝夜作息協議</span>、
              <span className="text-emerald-400 font-semibold">14天原子微習慣</span>、
              <span className="text-rose-400 font-semibold">物治動力鏈自救動作</span> 與 
              <span className="text-indigo-400 font-semibold">均一自適應精熟學習</span> 的終身超健康實踐系統。
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-amber-500">5 大</div>
              <div className="text-[10px] text-slate-400">個人實踐模組</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-cyan-400">29 席</div>
              <div className="text-[10px] text-slate-400">專家具名簽核</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-emerald-400">24H</div>
              <div className="text-[10px] text-slate-400">時序動態協議</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-purple-400">100%</div>
              <div className="text-[10px] text-slate-400">臨床實證導向</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('BLUEPRINT')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'BLUEPRINT'
              ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-400 shadow-md ring-2 ring-amber-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-400'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>個人客製健康藍圖</span>
        </button>

        <button
          onClick={() => setActiveTab('PROTOCOL')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'PROTOCOL'
              ? 'bg-cyan-500 text-white font-bold border-cyan-600 shadow-md ring-2 ring-cyan-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-400'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>24H 日常作息協議</span>
        </button>

        <button
          onClick={() => setActiveTab('HABITS')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'HABITS'
              ? 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>14天原子微習慣</span>
        </button>

        <button
          onClick={() => setActiveTab('PHYSIO')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'PHYSIO'
              ? 'bg-rose-500 text-white font-bold border-rose-600 shadow-md ring-2 ring-rose-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-rose-400'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>物理治療與肌力動作庫</span>
        </button>

        <button
          onClick={() => setActiveTab('SKILL_TREE')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'SKILL_TREE'
              ? 'bg-indigo-600 text-white font-bold border-indigo-700 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-400'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>均一精熟技能樹</span>
        </button>
      </div>

      {/* Sub-view Content */}
      <div className="pt-2">
        {activeTab === 'BLUEPRINT' && <PersonalHealthBlueprint />}
        {activeTab === 'PROTOCOL' && <DailyProtocolMatrix />}
        {activeTab === 'HABITS' && <AtomicHabitTracker />}
        {activeTab === 'PHYSIO' && <MobilityPhysioGuide />}
        {activeTab === 'SKILL_TREE' && <MasterySkillTree />}
      </div>
    </div>
  );
};
