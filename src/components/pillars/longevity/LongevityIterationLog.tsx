import React, { useState } from 'react';
import { LONGEVITY_ITERATION_ROUNDS } from '../../../data/longevityIterationsData';
import { LongevityIterationRound } from '../../../data/longevityIterationsData';
import {
  Sparkles,
  Users,
  MessageSquare,
  FileCheck,
  Zap,
  BookOpen,
  Eye,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const LongevityIterationLog: React.FC = () => {
  const [selectedRoundNum, setSelectedRoundNum] = useState<number>(1);
  const activeRound: LongevityIterationRound =
    LONGEVITY_ITERATION_ROUNDS.find((r) => r.round === selectedRoundNum) ||
    LONGEVITY_ITERATION_ROUNDS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-emerald-300/80 dark:border-salud-cyan/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-salud-cyan/10 border border-emerald-300 dark:border-salud-cyan/30 text-emerald-800 dark:text-salud-cyan text-xs font-mono font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-salud-cyan animate-pulse" />
            <span>7 輪專家深化閉環 (7-Sprint Iteration Logs)</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
            長壽與抗衰老醫學專家委員會 · 7 輪迭代修訂紀要
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium">
            由跨學科臨床醫學委員會推動，針對 12 大分子衰老標誌、三代表觀遺傳時鐘、ITP 長壽化合物、殭屍細胞清除與桑拿激效，落實「知識深度」與「閱讀性」之雙重昇華。
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="p-3 rounded-2xl bg-white/90 dark:bg-white/5 border border-emerald-200 dark:border-white/10 text-center shadow-xs">
            <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-salud-cyan">7 輪</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">閉門專題會議</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/90 dark:bg-white/5 border border-amber-200 dark:border-white/10 text-center shadow-xs">
            <div className="text-xl font-mono font-extrabold text-amber-700 dark:text-amber-400">49 焦點</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">7×7 配對 INFOGRAPH</div>
          </div>
        </div>
      </div>

      {/* Sprint Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {LONGEVITY_ITERATION_ROUNDS.map((r) => {
          const isActive = selectedRoundNum === r.round;
          return (
            <button
              key={`sprint-${r.round}`}
              onClick={() => setSelectedRoundNum(r.round)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md ring-2 ring-emerald-500/20 scale-[1.02]'
                  : 'bg-white/90 dark:bg-slate-900/60 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              <div className={`text-[10px] font-mono font-bold ${isActive ? 'text-emerald-100' : 'text-emerald-700 dark:text-salud-cyan'}`}>
                Round 0{r.round}
              </div>
              <div className={`font-bold text-xs mt-0.5 truncate ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {r.title_zh.split('：')[1] || r.title_zh}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Round Deep Dive Card */}
      <div className="rounded-3xl border border-emerald-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-salud-cyan">
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-salud-cyan/10 border border-emerald-300 dark:border-salud-cyan/30 font-bold">
                會議第 {activeRound.round} 輪
              </span>
              <span className="font-bold">專家委員會審定共識</span>
            </div>

            <h4 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
              {activeRound.title_zh}
            </h4>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              核心專題主題：{activeRound.theme_zh}
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50/80 dark:bg-slate-950 border border-emerald-200 dark:border-salud-cyan/30 text-center shrink-0 shadow-xs">
            <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400">配對視覺資訊圖</div>
            <div className="text-xs font-mono font-bold text-emerald-800 dark:text-salud-cyan mt-0.5">
              {activeRound.infograph_paired}
            </div>
          </div>
        </div>

        {/* Debate & Revision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-2">
            <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 font-mono">
              <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>專家激烈交鋒與爭論焦點 (The Debate)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {activeRound.key_debate_zh}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-cyan-950/20 border border-teal-200 dark:border-cyan-500/30 space-y-2">
            <div className="font-bold text-teal-800 dark:text-salud-cyan flex items-center gap-1.5 font-mono">
              <FileCheck className="w-4 h-4 text-teal-600 dark:text-salud-cyan" />
              <span>重大修訂與體系升級 (Major Revision)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {activeRound.major_revision_zh}
            </p>
          </div>
        </div>

        {/* Readability & Depth Upgrades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 font-mono">
              <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>閱讀性與互動體驗提升 (Readability)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {activeRound.readability_enhancement_zh}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-950 border border-purple-200/80 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-purple-800 dark:text-purple-400 flex items-center gap-1.5 font-mono">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>生化機制與知識深度進化 (Knowledge Depth)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {activeRound.knowledge_depth_zh}
            </p>
          </div>
        </div>

        {/* Consensus Statement Box */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">本輪專家多學科裁決共識：</span>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed italic">
              「{activeRound.consensus_statement_zh}」
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
