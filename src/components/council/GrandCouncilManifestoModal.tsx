import React, { useState } from 'react';
import {
  GRAND_COUNCIL_MANIFESTO,
  RPDCA_METHODOLOGY_MATRIX,
  RpdcaStep,
} from '../../data/grandCouncilManifestoData';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import {
  X,
  Sparkles,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Activity,
  Layers,
  Award,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GrandCouncilManifestoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeRpdcaTab, setActiveRpdcaTab] = useState<'R' | 'P' | 'D' | 'C' | 'A'>('R');

  if (!isOpen) return null;

  const currentStep: RpdcaStep =
    RPDCA_METHODOLOGY_MATRIX.find((s) => s.phase === activeRpdcaTab) ||
    RPDCA_METHODOLOGY_MATRIX[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-salud-cyan/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-salud-cyan/20 text-salud-cyan border border-salud-cyan/40 text-xs font-mono font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-salud-cyan animate-pulse" />
                <span>Salud {GRAND_COUNCIL_MANIFESTO.version}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-mono">
                40 席跨學科專家理事會簽署
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
              {GRAND_COUNCIL_MANIFESTO.title_zh}
            </h2>
            <div className="text-xs text-slate-400 font-mono">
              {GRAND_COUNCIL_MANIFESTO.title_en} · 發布日期：{GRAND_COUNCIL_MANIFESTO.release_date}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="關閉憲章視窗"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto font-sans text-xs">
          {/* Proclamation Statement */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-indigo-950/40 border border-salud-cyan/30 text-slate-200 space-y-2">
            <div className="font-bold text-salud-cyan font-mono flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>全體專家理事會聯合宣言 (The Proclamation)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm italic">
              「{GRAND_COUNCIL_MANIFESTO.proclamation_zh}」
            </p>
          </div>

          {/* 4 Specialized Council Committees */}
          <div className="space-y-3">
            <div className="font-bold text-sm text-white flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-salud-cyan" />
              <span>四大專門理事會架構 (4 Specialized Committees · 40 Seats)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GRAND_COUNCIL_MANIFESTO.three_councils.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-200 text-xs">{c.title_zh}</div>
                    <div className="text-[10px] font-mono text-salud-cyan mt-0.5">{c.seats}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-2 pt-2 border-t border-slate-850">
                      {c.focus_zh}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RPDCA 7x7 Methodology Matrix */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <div className="font-bold text-sm text-white flex items-center gap-2 font-mono">
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>七十個七次 RPDCA 閉環質量迭代體系</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  堅持 Research ➔ Plan ➔ Do ➔ Check ➔ Act 臨床品質工程，全站知識與工具經過極致校準。
                </p>
              </div>

              {/* RPDCA Phase Buttons */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                {(['R', 'P', 'D', 'C', 'A'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveRpdcaTab(p)}
                    className={`w-9 h-9 rounded-xl font-extrabold transition-all ${
                      activeRpdcaTab === p
                        ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected RPDCA Step Details */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div>
                  <span className="text-amber-400 font-bold text-sm font-mono mr-2">
                    Phase {currentStep.phase} ·
                  </span>
                  <span className="font-bold text-white text-sm">{currentStep.name_zh}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{currentStep.tagline_zh}</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="font-bold text-slate-300 text-xs">核心執行的醫學研發行動：</div>
                <ul className="space-y-1 text-slate-400 list-disc list-inside">
                  {currentStep.core_actions.map((act, idx) => (
                    <li key={`act-${idx}`}>{act}</li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono">
                <strong>臨床實證標準：</strong> {currentStep.clinical_standard_zh}
              </div>
            </div>
          </div>

          {/* 40 Council Members Directory */}
          <div className="space-y-3">
            <div className="font-bold text-sm text-white flex items-center gap-2 font-mono">
              <Award className="w-4 h-4 text-salud-cyan" />
              <span>40 席專家理事會名冊與署名</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {EXPERT_COUNCIL.map((exp) => (
                <div
                  key={exp.id}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-0.5 truncate"
                >
                  <div className="font-mono font-bold text-salud-cyan text-[10px]">{exp.id}</div>
                  <div className="font-bold text-slate-200 truncate">{exp.title_zh}</div>
                  <div className="text-[9px] text-slate-500 truncate">{exp.name_en}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] font-mono text-slate-400">
            Salud v1.0.0 · Released under Evidence-Based Open Medical Charter
          </div>
          <button
            onClick={onClose}
            className="btn-tactile px-5 py-2 rounded-xl bg-salud-cyan text-slate-950 font-bold text-xs shadow-md hover:brightness-110"
          >
            關閉憲章
          </button>
        </div>
      </div>
    </div>
  );
};
