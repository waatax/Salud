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
      <div className="relative overflow-hidden rounded-3xl border border-emerald-300/80 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/50 dark:from-slate-950 dark:via-[#141F1A] dark:to-slate-950 p-6 sm:p-10 shadow-sm backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-700/60 text-xs font-mono font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>均一教育平台 × 臨床醫學 × 生活醫學 × 運動物治大師</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
              Salud 個人超健康實踐系統
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              拒絕「假健康」焦慮與「知易行難」。由 40 席跨學科專家理事會聯席審定，為每位追求極致狀態的自律者打造個人化生活醫學藍圖！結合 <span className="text-emerald-800 dark:text-emerald-400 font-bold">個人客製藍圖診斷</span>、<span className="text-teal-800 dark:text-cyan-400 font-bold">24H 晝夜作息協議</span>、
              <span className="text-emerald-800 dark:text-emerald-400 font-bold">14天原子微習慣</span>、
              <span className="text-rose-800 dark:text-rose-400 font-bold">物治動力鏈自救動作</span> 與 
              <span className="text-indigo-800 dark:text-indigo-400 font-bold">均一自適應精熟學習</span> 的終身超健康實踐系統。
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-white/10 text-center shadow-xs">
              <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">5 大</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">個人實踐模組</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-white/10 text-center shadow-xs">
              <div className="text-xl font-mono font-extrabold text-teal-700 dark:text-cyan-400">40 席</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">專家審定指引</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-white/10 text-center shadow-xs">
              <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">24H</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">時序動態協議</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200/80 dark:border-white/10 text-center shadow-xs">
              <div className="text-xl font-mono font-extrabold text-indigo-700 dark:text-purple-400">100%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">臨床實證導向</div>
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
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>個人客製健康藍圖</span>
        </button>

        <button
          onClick={() => setActiveTab('PROTOCOL')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'PROTOCOL'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/50'
          }`}
        >
          <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>24H 日常作息協議</span>
        </button>

        <button
          onClick={() => setActiveTab('HABITS')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'HABITS'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>14天原子微習慣</span>
        </button>

        <button
          onClick={() => setActiveTab('PHYSIO')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'PHYSIO'
              ? 'bg-emerald-700 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>物理治療與肌力動作庫</span>
        </button>

        <button
          onClick={() => setActiveTab('SKILL_TREE')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'SKILL_TREE'
              ? 'bg-teal-700 text-white font-bold border-teal-600 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/50'
          }`}
        >
          <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
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
