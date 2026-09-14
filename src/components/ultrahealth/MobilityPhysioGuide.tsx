import React, { useState } from 'react';
import { PHYSIO_EXERCISES } from '../../data/ultraHealthData';
import {
  Activity,
  AlertOctagon,
  CheckCircle2,
  Dumbbell,
  ShieldAlert,
  Flame,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const MobilityPhysioGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredExercises = PHYSIO_EXERCISES.filter((ex) => {
    if (selectedCategory === 'ALL') return true;
    return ex.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-salud-dark-surface to-orange-500/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40 text-xs font-mono font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>物理治療大師 × 頂級體能教練 · 動力鏈自救與阻力課表</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            辦公久坐重置與五大人體基本動作處方
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            現代人最大早逝殺手是「靜態久坐」與「肌肉流失」。
            被動按摩只能爽一天，主動重置才能治根本！掌握關節活動度 (Mobility)、消除下交叉代償、
            建立終身受用的五大阻力動作，打造一副無痛好用的超健康骨骼肌肉裝甲。
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
          {[
            { id: 'ALL', label: '全部動作處方' },
            { id: 'DESK_RESCUE', label: '💺 辦公久坐救星' },
            { id: 'MOBILITY_RESTORE', label: '🔄 胸椎活動度' },
            { id: 'POSTURE_RESET', label: '🔥 死臀喚醒' },
            { id: 'RESISTANCE_CORE', label: '🏋️ 基礎深蹲阻力' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                selectedCategory === tab.id
                  ? 'bg-rose-500 text-white font-bold border-rose-600 shadow-sm'
                  : 'bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-rose-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="bg-white/90 dark:bg-salud-dark-surface rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-5 shadow-sm hover:shadow-md transition-all"
          >
            {/* Title & Badge */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-wider">
                  目標肌群：{ex.target_area_zh}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {ex.title_zh}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold shrink-0">
                {ex.difficulty}
              </span>
            </div>

            {/* Why Physio Recommends */}
            <div className="p-3.5 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-rose-600 dark:text-rose-400">物治師臨床叮嚀：</span>
              <span className="ml-1">{ex.why_physio_recommends_zh}</span>
            </div>

            {/* Step by step */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono text-slate-500 uppercase">
                📋 正確標準動作步驟
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                {ex.step_by_step_zh.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compensations to Avoid */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold font-mono">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>⚠️ 嚴禁以下錯誤代償（避傷核心）</span>
              </div>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                {ex.common_compensations_zh.map((comp, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {comp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reps and Frequency */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>處方建議：</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{ex.reps_and_sets_zh}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
