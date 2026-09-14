import React, { useState } from 'react';
import { KnowledgePoint } from '../../types';
import { getOrGenerateKpInfoGraph } from '../../services/kpInfoGraphEngine';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Flame,
  Zap,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Code2,
  Lightbulb,
  Info
} from 'lucide-react';

interface Props {
  kp: KnowledgePoint;
}

export const KpInfoGraphRenderer: React.FC<Props> = ({ kp }) => {
  // Generated on-demand one-by-one and cached!
  const graph = getOrGenerateKpInfoGraph(kp);

  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(0);
  const [showPromptBlueprint, setShowPromptBlueprint] = useState<boolean>(false);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'trigger':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />;
      case 'biomarker':
        return <Activity className="w-4 h-4 text-sky-500" />;
      case 'outcome':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'process':
      default:
        return <Flame className="w-4 h-4 text-purple-500" />;
    }
  };

  const getStepColorClass = (type: string, isSelected: boolean) => {
    if (isSelected) {
      return 'border-salud-cyan dark:border-salud-cyan bg-salud-cyan/15 dark:bg-salud-cyan/20 ring-2 ring-salud-cyan/30 text-slate-900 dark:text-white shadow-md';
    }
    switch (type) {
      case 'trigger':
        return 'border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200 hover:border-amber-400';
      case 'warning':
        return 'border-rose-200 dark:border-rose-800/60 bg-rose-50/80 dark:bg-rose-950/20 text-slate-800 dark:text-slate-200 hover:border-rose-400';
      case 'biomarker':
        return 'border-sky-200 dark:border-sky-800/60 bg-sky-50/70 dark:bg-sky-950/20 text-slate-800 dark:text-slate-200 hover:border-sky-400';
      case 'outcome':
        return 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 hover:border-emerald-400';
      case 'process':
      default:
        return 'border-purple-200 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/20 text-slate-800 dark:text-slate-200 hover:border-purple-400';
    }
  };

  const activeStep = activeStepIndex !== null ? graph.steps[activeStepIndex] : graph.steps[0];

  return (
    <div className="rounded-2xl border border-salud-cyan/30 dark:border-salud-cyan/40 bg-gradient-to-br from-salud-cyan/5 via-white dark:via-salud-dark-surface to-amber-500/5 p-4 sm:p-6 space-y-4 shadow-sm animate-fade-in transition-all">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-salud-cyan/20 text-salud-cyan dark:text-salud-cyan">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-extrabold text-salud-cyan px-1.5 py-0.2 rounded bg-salud-cyan/15 border border-salud-cyan/30">
                INFO GRAPH · {graph.graph_type}
              </span>
              <h5 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {graph.title_zh}
              </h5>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
              {graph.title_en}
            </span>
          </div>
        </div>

        {/* AI Expert Review Badge */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold shadow-xs"
            title={graph.ai_expert_review.optimization_notes}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI 審核 {graph.ai_expert_review.clinical_fidelity_score}% PASSED</span>
          </div>

          <button
            onClick={() => setShowPromptBlueprint(!showPromptBlueprint)}
            className="btn-tactile p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-[10px] font-mono flex items-center gap-1"
            title="查看專業 Prompt 規格與 AI 專家審核意見"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prompt 藍圖</span>
            {showPromptBlueprint ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable Prompt Blueprint Drawer */}
      {showPromptBlueprint && (
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2.5 border border-slate-800 animate-fade-in">
          <div className="flex items-center justify-between text-amber-400 font-bold text-[11px]">
            <span>📋 專業 Prompt 規格藍圖 (Prompt Blueprint)</span>
            <span className="text-slate-500">審核：{graph.ai_expert_review.reviewed_by}</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div>
              <span className="text-cyan-400">Context: </span>
              {graph.prompt_blueprint.medical_context}
            </div>
            <div>
              <span className="text-emerald-400">Visual Metaphor: </span>
              {graph.prompt_blueprint.visual_metaphor}
            </div>
            <div>
              <span className="text-purple-400">Cognitive Target: </span>
              {graph.prompt_blueprint.cognitive_target}
            </div>
            <div>
              <span className="text-rose-400">AI Review Notes: </span>
              {graph.ai_expert_review.optimization_notes}
            </div>
          </div>
        </div>
      )}

      {/* SVG / Vector Flow Ribbon */}
      <div className="relative py-1">
        {/* Connection pipeline */}
        <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-amber-400 via-salud-cyan to-emerald-400 -translate-y-4 z-0 opacity-30" />

        {/* 4 Interactive Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 relative z-10">
          {graph.steps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${getStepColorClass(
                  step.type,
                  isSelected
                )}`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="w-5 h-5 rounded-full bg-white/80 dark:bg-slate-800 flex items-center justify-center text-[10px] font-mono font-bold shadow-xs">
                    {idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    {step.value_badge && (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                        {step.value_badge}
                      </span>
                    )}
                    {getStepIcon(step.type)}
                  </div>
                </div>

                <div className="font-bold text-xs line-clamp-1">{step.label}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {step.detail}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep-Dive Callout */}
      {activeStep && (
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1 animate-fade-in">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-mono text-[10px]">
            <span className="font-bold text-salud-cyan dark:text-salud-cyan">
              節點聚焦深查 · 第 {activeStepIndex !== null ? activeStepIndex + 1 : 1} 步
            </span>
            <span>點擊上方節點自由切換</span>
          </div>
          <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
            {activeStep.label}：{activeStep.detail}
          </div>
        </div>
      )}

      {/* Key Takeaway Footnote */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <strong className="text-slate-800 dark:text-slate-200">機轉核心提煉：</strong>
          {graph.key_takeaway}
        </span>
      </div>
    </div>
  );
};
