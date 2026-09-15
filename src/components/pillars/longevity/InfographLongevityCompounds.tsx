import React, { useState } from 'react';
import { LONGEVITY_COMPOUNDS } from '../../../data/longevityData';
import { EvidenceBadge } from '../../common/EvidenceBadge';
import { LongevityCompound } from '../../../types';
import {
  Pill,
  ShieldCheck,
  AlertTriangle,
  Award,
  Zap,
  Activity,
  CheckCircle2,
  Stethoscope,
  Clock,
  Sparkles,
} from 'lucide-react';

export const InfographLongevityCompounds: React.FC = () => {
  const [selectedCompoundId, setSelectedCompoundId] = useState<string>('COMP-01');
  const selectedCompound = LONGEVITY_COMPOUNDS.find((c) => c.id === selectedCompoundId) || LONGEVITY_COMPOUNDS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 dark:from-slate-900 dark:via-amber-950/40 dark:to-slate-900 border border-emerald-300/80 dark:border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-amber-400 uppercase tracking-wider">
            <Pill className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
            <span>INFOGRAPH 3 · 抗衰化合物與 ITP 長壽介入實證庫</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
            NIH Interventions Testing Program (ITP) 金標準評估
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-medium">
            杜絕商業噱頭！以三座獨立頂尖實驗室小鼠重現性壽命數據、人體 II/III 期試驗與脈衝安全劑量為唯一審核依據。
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-amber-500/10 border border-emerald-200 dark:border-amber-500/30 text-emerald-800 dark:text-amber-300 text-xs font-mono font-bold shrink-0 shadow-xs">
          7 款代表性長壽化合物
        </div>
      </div>

      {/* Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {LONGEVITY_COMPOUNDS.map((c) => {
          const isActive = selectedCompoundId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCompoundId(c.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/20 border-emerald-500 scale-[1.02]'
                  : 'bg-white/90 dark:bg-slate-900/60 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
              }`}
            >
              <div className={`text-[10px] font-mono font-bold truncate ${isActive ? 'text-emerald-100' : 'text-emerald-700 dark:text-amber-400'}`}>
                {c.name_en.split(' ')[0]}
              </div>
              <div className={`font-bold text-xs truncate mt-0.5 ${isActive ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {c.name_zh.split(' ')[0]}
              </div>
              <div className={`text-[9px] font-mono mt-1 truncate ${isActive ? 'text-emerald-100/90' : 'text-slate-500'}`}>
                ITP {c.itp_max_lifespan_extension_pct.includes('+') ? c.itp_max_lifespan_extension_pct.split(' ')[0] : '臨床'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Compound Deep Dive Card */}
      <div className="rounded-3xl border border-emerald-200/80 dark:border-amber-500/30 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 font-bold">
                {selectedCompound.compound_class}
              </span>
              <EvidenceBadge grade={selectedCompound.evidence_grade} />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">實證醫學審定 Grade A</span>
            </div>

            <h4 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white">
              {selectedCompound.name_zh}
            </h4>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {selectedCompound.name_en} · 臨床階段：{selectedCompound.human_clinical_stage}
            </div>
          </div>

          {/* ITP Max Metric Pill */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-amber-500/10 border border-emerald-200 dark:border-amber-500/30 text-center shrink-0 shadow-xs">
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">ITP 最大壽命延長效益</div>
            <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-amber-400">
              {selectedCompound.itp_max_lifespan_extension_pct.split('(')[0]}
            </div>
          </div>
        </div>

        {/* 5-Dimension Radar Comparison Bars */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/40 dark:bg-slate-950 border border-emerald-200/70 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-200">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
              <span>五維度長壽潛力與安全性評分指標 (Clinical Longevity Radar)</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">滿分 10 分</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { label: '人體臨床試驗實證 (Human Evidence)', score: selectedCompound.radar_scores.human_evidence, color: 'bg-teal-500' },
              { label: '哺乳類壽命延長潛力 (Lifespan Potential)', score: selectedCompound.radar_scores.lifespan_potential, color: 'bg-emerald-500' },
              { label: '長期用藥安全耐受度 (Safety Profile)', score: selectedCompound.radar_scores.safety_profile, color: 'bg-cyan-500' },
              { label: '獲取便利度與成本 (Accessibility)', score: selectedCompound.radar_scores.accessibility, color: 'bg-indigo-500' },
              { label: '器官衰老生物標記影響 (Biomarker Impact)', score: selectedCompound.radar_scores.biomarker_impact, color: 'bg-emerald-600' },
            ].map((item, idx) => (
              <div key={`comp-radar-${idx}`} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.score} / 10</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${item.score * 10}%` }}
                    className={`h-full ${item.color} rounded-full transition-all duration-300`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Molecular Mechanism */}
        <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-950 border border-emerald-200/70 dark:border-slate-800 space-y-1.5 text-xs">
          <div className="font-bold text-emerald-800 dark:text-amber-400 font-mono flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
            <span>核心分子機轉 (Molecular Mechanism)</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
            {selectedCompound.primary_mechanism_zh}
          </p>
        </div>

        {/* Dosing Protocol & Warnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 space-y-2">
            <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>最佳建議給藥邏輯 (Optimal Protocol)</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {selectedCompound.optimal_dosing_protocol}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 space-y-2">
            <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>臨床禁忌與主要風險 (Contraindications & Risks)</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 list-disc list-inside">
              {selectedCompound.contraindications_and_risks.map((risk, idx) => (
                <li key={`risk-${idx}`}>{risk}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
