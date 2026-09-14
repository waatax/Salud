import React, { useState } from 'react';
import { EXPERT_ROUNDS, STREET_MYTH_BUSTERS } from '../../data/ultraHealthData';
import { Sparkles, Users, Award, ShieldCheck, Flame, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';

export const ExpertIterationLog: React.FC = () => {
  const [selectedRound, setSelectedRound] = useState<number>(7); // Default to final round
  const [expandedMyth, setExpandedMyth] = useState<string | null>('MYTH-01');

  const currentRoundData = EXPERT_ROUNDS.find((r) => r.round === selectedRound) || EXPERT_ROUNDS[6];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-salud-dark-surface to-cyan-500/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>跨學科 29 席理事會 · 7 次深度會議迭代紀錄</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              打造最優質、實用、有手就能做的「個人超健康方法論」
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              匯聚 <span className="font-semibold text-amber-600 dark:text-amber-400">均一教育平台核心團隊</span>、
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">各專科醫學專家</span>、
              <span className="font-semibold text-rose-500">百萬醫療知識型網紅</span>、
              <span className="font-semibold text-emerald-500">頂級健身教練與物理治療大師</span>，及 5 位戰略權威，
              歷經 7 輪激辯、妥協與突破性融合，將深奧機轉鍛造為終身可運行的日常健康閉環。
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-display font-extrabold text-xl">
              7x
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">7 輪完整迭代演進</div>
              <div className="text-slate-500 dark:text-slate-400">29 席專家全數具名簽核</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Round Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {EXPERT_ROUNDS.map((r) => {
          const isSelected = r.round === selectedRound;
          return (
            <button
              key={r.round}
              onClick={() => setSelectedRound(r.round)}
              className={`p-3 rounded-2xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-amber-500/20 dark:bg-amber-500/25 border-amber-500/80 shadow-md ring-2 ring-amber-500/30'
                  : 'bg-white/60 dark:bg-salud-dark-surface/60 border-slate-200 dark:border-slate-800 hover:border-amber-400/50'
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
      <div className="bg-white/90 dark:bg-salud-dark-surface rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
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

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 px-3 py-2 rounded-xl text-xs">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">主導席位：</span>
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

        {/* 3 Columns: Debates, Breakthroughs, Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Debates */}
          <div className="space-y-3 p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wide">
              <Flame className="w-4 h-4" />
              <span>專家犀利爭鳴 (Debates)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {currentRoundData.core_debates_zh.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">▪</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Breakthrough Consensus */}
          <div className="space-y-3 p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>突破性共識 (Breakthroughs)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {currentRoundData.breakthrough_consensus_zh.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology Deliverables */}
          <div className="space-y-3 p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wide">
              <Award className="w-4 h-4" />
              <span>實作方法論產出 (Deliverables)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {currentRoundData.methodology_outputs_zh.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">✦</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Street Myth Busters by Health Influencer */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-rose-500 uppercase">
              Round 4 特別企劃 · 醫療知識型網紅直擊
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              💥 街頭偽健康迷思粉碎機 (Street Myth Busters)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">點擊展開深度剖析</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STREET_MYTH_BUSTERS.map((myth) => {
            const isExpanded = expandedMyth === myth.id;
            return (
              <div
                key={myth.id}
                onClick={() => setExpandedMyth(isExpanded ? null : myth.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isExpanded
                    ? 'bg-white dark:bg-salud-dark-surface border-rose-500/50 shadow-md'
                    : 'bg-white/70 dark:bg-salud-dark-surface/70 border-slate-200 dark:border-slate-800 hover:border-rose-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {myth.myth_zh}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-mono text-[10px] font-extrabold shrink-0">
                    {myth.verdict}
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-fade-in text-xs">
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {myth.fact_zh}
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 italic">
                      {myth.influencer_quote_zh}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
