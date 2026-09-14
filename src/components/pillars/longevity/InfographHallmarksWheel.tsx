import React, { useState } from 'react';
import { AGING_HALLMARKS } from '../../../data/longevityData';
import { AgingHallmark } from '../../../types';
import { EvidenceBadge } from '../../common/EvidenceBadge';
import {
  Dna,
  Shield,
  Activity,
  Flame,
  Zap,
  Sparkles,
  ChevronRight,
  Info,
  Layers,
  AlertCircle,
  Stethoscope,
} from 'lucide-react';

export const InfographHallmarksWheel: React.FC = () => {
  const [selectedHallmark, setSelectedHallmark] = useState<AgingHallmark>(AGING_HALLMARKS[0]);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'PRIMARY' | 'ANTAGONISTIC' | 'INTEGRATIVE'>('ALL');

  const filteredHallmarks = activeCategory === 'ALL'
    ? AGING_HALLMARKS
    : AGING_HALLMARKS.filter((h) => h.category === activeCategory);

  const getCategoryMeta = (cat: 'PRIMARY' | 'ANTAGONISTIC' | 'INTEGRATIVE') => {
    switch (cat) {
      case 'PRIMARY':
        return {
          label: '損傷起因型 (Primary)',
          desc: '最初始的細胞分子結構損傷，隨時間不可避免地累積',
          color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-400',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        };
      case 'ANTAGONISTIC':
        return {
          label: '代償拮抗型 (Antagonistic)',
          desc: '對損傷的代償適應機制，低劑量保護、長期過度則具破壞性',
          color: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'INTEGRATIVE':
        return {
          label: '綜合表型型 (Integrative)',
          desc: '前兩類損傷失控後的終端綜合表徵，直接決定器官功能衰退',
          color: 'from-purple-500/20 to-rose-500/10 border-purple-500/40 text-purple-400',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Infograph Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-salud-cyan uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>INFOGRAPH 1 · 權威分類視覺圖</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
            衰老的 12 大分子標誌全景圖 (Hallmarks of Aging 2023)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            基於 López-Otín 等人於 <em>Cell</em> 頂級期刊發表的最新架構，區分「起因層、拮抗層、表型層」三大因果維度。
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
          {(['ALL', 'PRIMARY', 'ANTAGONISTIC', 'INTEGRATIVE'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl border font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-salud-cyan text-slate-950 border-salud-cyan shadow-md'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              {cat === 'ALL' ? '全部 12 標誌' : cat === 'PRIMARY' ? '起因型 (5)' : cat === 'ANTAGONISTIC' ? '拮抗型 (3)' : '表型型 (4)'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 12 Hallmarks Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {filteredHallmarks.map((h) => {
          const meta = getCategoryMeta(h.category);
          const isSelected = selectedHallmark.id === h.id;
          return (
            <button
              key={h.id}
              onClick={() => setSelectedHallmark(h)}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-salud-cyan shadow-lg ring-2 ring-salud-cyan/30 scale-[1.02]'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-extrabold text-salud-cyan">
                    #{h.number < 10 ? `0${h.number}` : h.number}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${meta.badgeBg}`}>
                    {h.category === 'PRIMARY' ? '起因' : h.category === 'ANTAGONISTIC' ? '拮抗' : '表型'}
                  </span>
                </div>
                <div className="font-bold text-xs text-white line-clamp-1">
                  {h.title_zh.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 font-mono">
                  {h.title_en}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-[9px] font-mono text-salud-cyan/80">審定: {h.lead_reviewer_id}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-salud-cyan' : ''}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Hallmark Deep Dive Infograph Card */}
      <div className="rounded-3xl border border-salud-cyan/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-salud-cyan/5 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${getCategoryMeta(selectedHallmark.category).badgeBg}`}>
                {getCategoryMeta(selectedHallmark.category).label}
              </span>
              <EvidenceBadge grade={selectedHallmark.evidence_grade} />
              <span className="text-slate-400">主審專席: {selectedHallmark.lead_reviewer_id}</span>
            </div>

            <h4 className="text-2xl font-display font-extrabold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-salud-cyan/20 border border-salud-cyan/40 text-salud-cyan flex items-center justify-center font-mono text-sm">
                {selectedHallmark.number}
              </span>
              <span>{selectedHallmark.title_zh}</span>
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {selectedHallmark.summary_zh}
            </p>
          </div>
        </div>

        {/* Molecular Cascade Flowchart (Visual Infograph) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-salud-cyan uppercase">
            <Zap className="w-4 h-4 text-salud-cyan" />
            <span>分子級聯反應鏈 (Molecular Cascade Infograph)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
            {selectedHallmark.molecular_cascade_zh}
          </div>
        </div>

        {/* Biomarkers & Interventions Dual Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <span>臨床代表性檢測指標 (Diagnostic Biomarkers)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedHallmark.hallmark_markers.map((mk, idx) => (
                <li key={`mk-${idx}`} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{mk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Shield className="w-4 h-4" />
              <span>實證精準介入靶點 (Targeted Longevity Interventions)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedHallmark.interventions_zh.map((inv, idx) => (
                <li key={`inv-${idx}`} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
