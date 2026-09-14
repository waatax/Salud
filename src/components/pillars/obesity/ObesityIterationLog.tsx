import React, { useState } from 'react';
import { OBESITY_ITERATION_ROUNDS } from '../../../data/obesityIterationsData';
import {
  Sparkles,
  Users,
  Award,
  ShieldCheck,
  Flame,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';

export const ObesityIterationLog: React.FC = () => {
  const [selectedRound, setSelectedRound] = useState<number>(7); // Default to final round
  const currentRoundData =
    OBESITY_ITERATION_ROUNDS.find((r) => r.round === selectedRound) ||
    OBESITY_ITERATION_ROUNDS[OBESITY_ITERATION_ROUNDS.length - 1];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-cyan-500/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>跨學科 6 席專科理事會 · 7 輪深度會議演進紀要</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              從分子機轉到街頭餐盤：7 輪迭代鍛造的「肥胖醫學臨床全真體系」
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              由 <span className="font-semibold text-cyan-500">EC-28 肥胖專科醫師</span>、
              <span className="font-semibold text-amber-500">EC-29 減重專科營養師</span>、
              <span className="font-semibold text-rose-500">EC-30 減重外科主任</span>、
              <span className="font-semibold text-purple-400">EC-31 神經內分泌學家</span>、
              <span className="font-semibold text-blue-400">EC-32 行為心理學家</span> 與{' '}
              <span className="font-semibold text-emerald-400">EC-33 運動生理學權威</span> 領銜。
              歷經 7 輪激辯、妥協與突破性融合，將深奧分子生物學轉譯為有手就能做的日常減重閉環。
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-display font-extrabold text-xl">
              7x
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">7 輪完整迭代演進</div>
              <div className="text-slate-500 dark:text-slate-400">雙維度：知識性 × 閱讀性</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Round Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {OBESITY_ITERATION_ROUNDS.map((r) => {
          const isSelected = r.round === selectedRound;
          return (
            <button
              key={r.round}
              onClick={() => setSelectedRound(r.round)}
              className={`p-3 rounded-2xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-amber-500/20 dark:bg-amber-500/25 border-amber-500/80 shadow-md ring-2 ring-amber-500/30'
                  : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-amber-400/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                  R{r.round}
                </span>
                {r.round === 7 && (
                  <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                    終審
                  </span>
                )}
              </div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                {r.title_zh.split('：')[1] || r.title_zh}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Round Detail Card */}
      <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
              {currentRoundData.title_en}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {currentRoundData.title_zh}
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
              🎯 核心主旨：{currentRoundData.theme_zh}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 px-3 py-2 rounded-xl text-xs">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">主導專席：</span>
            {currentRoundData.lead_experts.map((exp, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-medium"
              >
                {exp}
              </span>
            ))}
          </div>
        </div>

        {/* Conflict vs Consensus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Conflict Point */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-400 font-mono">
              <AlertTriangle className="w-4 h-4" />
              <span>會議衝突與激辯焦點 (Debate & Conflict)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              {currentRoundData.conflict_point_zh}
            </p>
          </div>

          {/* Breakthrough Consensus */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4" />
              <span>突破性共識與轉折 (Breakthrough Consensus)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              {currentRoundData.breakthrough_consensus_zh}
            </p>
          </div>
        </div>

        {/* Actionable Engineering & Medical Outcome */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-salud-cyan font-mono">
            <Zap className="w-4 h-4" />
            <span>具體產出與臨床落地方案 (Actionable Output)</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
            {currentRoundData.actionable_outcome_zh}
          </p>
        </div>
      </div>
    </div>
  );
};
