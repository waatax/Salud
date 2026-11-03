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
  Info,
  Maximize2,
  Copy,
  CheckCheck,
  Share2,
  Eye,
  Sliders,
  TrendingUp,
  FileCheck2,
  Compass
} from 'lucide-react';

interface Props {
  kp: KnowledgePoint;
}

export const KpInfoGraphRenderer: React.FC<Props> = ({ kp }) => {
  // Generated on-demand one-by-one and cached!
  const graph = getOrGenerateKpInfoGraph(kp);

  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(0);
  const [showPromptBlueprint, setShowPromptBlueprint] = useState<boolean>(false);
  const [showA11yTable, setShowA11yTable] = useState<boolean>(false);
  const [copiedTakeaway, setCopiedTakeaway] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'FLOW' | 'SPECTRUM' | 'METRICS'>('FLOW');

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
      return 'border-salud-cyan dark:border-salud-cyan bg-salud-cyan/15 dark:bg-salud-cyan/20 ring-2 ring-salud-cyan/40 text-slate-900 dark:text-white shadow-md transform -translate-y-0.5';
    }
    switch (type) {
      case 'trigger':
        return 'border-amber-200/90 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200 hover:border-amber-400 hover:shadow-xs';
      case 'warning':
        return 'border-rose-200/90 dark:border-rose-800/60 bg-rose-50/80 dark:bg-rose-950/20 text-slate-800 dark:text-slate-200 hover:border-rose-400 hover:shadow-xs';
      case 'biomarker':
        return 'border-sky-200/90 dark:border-sky-800/60 bg-sky-50/70 dark:bg-sky-950/20 text-slate-800 dark:text-slate-200 hover:border-sky-400 hover:shadow-xs';
      case 'outcome':
        return 'border-emerald-200/90 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 hover:border-emerald-400 hover:shadow-xs';
      case 'process':
      default:
        return 'border-purple-200/90 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/20 text-slate-800 dark:text-slate-200 hover:border-purple-400 hover:shadow-xs';
    }
  };

  const activeStep = activeStepIndex !== null ? graph.steps[activeStepIndex] : graph.steps[0];

  const handleCopyTakeaway = () => {
    navigator.clipboard.writeText(`【${graph.title_zh}】\n機轉核心：${graph.key_takeaway}\n臨床證據等級：Grade ${kp.evidence_grade} · 適用：${kp.applies_population}`);
    setCopiedTakeaway(true);
    setTimeout(() => setCopiedTakeaway(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-salud-cyan/40 dark:border-salud-cyan/40 bg-gradient-to-br from-salud-cyan/10 via-white dark:via-salud-dark-surface to-amber-500/5 p-4 sm:p-6 space-y-4 shadow-sm animate-fade-in transition-all">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-salud-cyan/25 to-sky-500/10 text-salud-cyan border border-salud-cyan/30 shadow-xs">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] font-extrabold text-salud-cyan px-2 py-0.5 rounded-full bg-salud-cyan/15 border border-salud-cyan/30 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                INFO GRAPH · {graph.graph_type}
              </span>
              <h5 className="font-display font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                {graph.title_zh}
              </h5>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
              {graph.title_en}
            </span>
          </div>
        </div>

        {/* Action Controls & AI Review Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode switch */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[10px] font-mono font-bold">
            <button
              onClick={() => setViewMode('FLOW')}
              className={`px-2 py-1 rounded-lg transition-all ${
                viewMode === 'FLOW'
                  ? 'bg-salud-cyan text-slate-950 font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              向量路徑
            </button>
            <button
              onClick={() => setViewMode('SPECTRUM')}
              className={`px-2 py-1 rounded-lg transition-all ${
                viewMode === 'SPECTRUM'
                  ? 'bg-salud-cyan text-slate-950 font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              生化光譜
            </button>
            <button
              onClick={() => setViewMode('METRICS')}
              className={`px-2 py-1 rounded-lg transition-all ${
                viewMode === 'METRICS'
                  ? 'bg-salud-cyan text-slate-950 font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              指標對比
            </button>
          </div>

          {/* AI Expert Review Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold shadow-xs"
            title={graph.ai_expert_review.optimization_notes}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI 審核 {graph.ai_expert_review.clinical_fidelity_score}% PASSED</span>
          </div>

          {/* A11y Table toggle */}
          <button
            onClick={() => setShowA11yTable(!showA11yTable)}
            className="btn-tactile p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono flex items-center gap-1"
            title="切換無障礙等價資料表 (WCAG 2.2 AA)"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden sm:inline">資料表</span>
          </button>

          {/* Prompt blueprint toggle */}
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
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2.5 border border-slate-800 animate-fade-in shadow-inner">
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

      {/* Expandable Accessible Data Table (WCAG 2.2 AA) */}
      {showA11yTable && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-3 animate-fade-in">
          <div className="flex items-center justify-between font-mono text-[11px] text-slate-600 dark:text-slate-400">
            <span className="font-bold text-salud-cyan flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5" />
              無障礙等價資料表 (Accessible Data Table)
            </span>
            <span>WCAG 2.2 AA 規範兼容</span>
          </div>
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 font-mono text-slate-500">
                <th className="py-1.5 px-2">序號</th>
                <th className="py-1.5 px-2">生化階段與節點</th>
                <th className="py-1.5 px-2">型態標籤</th>
                <th className="py-1.5 px-2">機轉深層細節</th>
                <th className="py-1.5 px-2">臨床指標值</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
              {graph.steps.map((st, idx) => (
                <tr key={idx} className={activeStepIndex === idx ? 'bg-salud-cyan/10 font-medium' : ''}>
                  <td className="py-1.5 px-2 font-mono font-bold text-slate-500">{idx + 1}</td>
                  <td className="py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">{st.label}</td>
                  <td className="py-1.5 px-2 font-mono text-[10px] uppercase text-slate-600 dark:text-slate-400">{st.type}</td>
                  <td className="py-1.5 px-2 text-slate-600 dark:text-slate-300">{st.detail}</td>
                  <td className="py-1.5 px-2 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{st.value_badge || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── View Mode: VECTOR FLOW ── */}
      {viewMode === 'FLOW' && (
        <div className="relative group">
          <svg
            viewBox="0 0 800 135"
            className="w-full h-auto rounded-2xl shadow-sm transition-all"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={`${graph.title_zh} 向量流程圖解`}
          >
            <defs>
              <linearGradient id="kpFlowLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="35%" stopColor="#06B6D4" />
                <stop offset="70%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <filter id="kpGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            <rect width="800" height="135" rx="14" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />

            {/* Connecting Track Flow Line */}
            <path
              d="M 60 67 L 740 67"
              stroke="url(#kpFlowLineGrad)"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.35"
            />

            {graph.steps.map((step, idx) => {
              const boxW = 174;
              const gap = 16;
              const x = 26 + idx * (boxW + gap);
              const y = 18;
              const isSelected = activeStepIndex === idx;
              const strokeColor =
                step.type === 'trigger'
                  ? '#F59E0B'
                  : step.type === 'warning'
                  ? '#F43F5E'
                  : step.type === 'biomarker'
                  ? '#38BDF8'
                  : step.type === 'outcome'
                  ? '#10B981'
                  : '#A855F7';

              return (
                <g
                  key={idx}
                  transform={`translate(${x}, ${y})`}
                  onClick={() => setActiveStepIndex(idx)}
                  style={{ cursor: 'pointer' }}
                  className="transition-transform duration-200 hover:opacity-95"
                >
                  {/* Pipeline Arrow Connector */}
                  {idx < graph.steps.length - 1 && (
                    <g>
                      <line
                        x1={boxW}
                        y1="49"
                        x2={boxW + gap}
                        y2="49"
                        stroke={strokeColor}
                        strokeWidth="2"
                        strokeDasharray="3 2"
                        opacity={isSelected ? 1 : 0.6}
                      />
                      <polygon
                        points={`${boxW + gap - 4},46 ${boxW + gap},49 ${boxW + gap - 4},52`}
                        fill={strokeColor}
                      />
                    </g>
                  )}

                  {/* Node Box */}
                  <rect
                    width={boxW}
                    height="98"
                    rx="12"
                    fill={isSelected ? '#1E293B' : '#0F172A'}
                    stroke={isSelected ? '#06B6D4' : strokeColor}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    filter={isSelected ? 'url(#kpGlow)' : undefined}
                  />

                  {/* Step Order Circle */}
                  <circle cx="20" cy="22" r="10" fill={strokeColor} />
                  <text x="20" y="26" fill="#090D16" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    {idx + 1}
                  </text>

                  {/* Value Badge on Node */}
                  {step.value_badge && (
                    <g>
                      <rect
                        x={boxW - 74}
                        y="12"
                        width="64"
                        height="18"
                        rx="5"
                        fill="#090D16"
                        stroke={strokeColor}
                        strokeWidth="1"
                        opacity="0.85"
                      />
                      <text x={boxW - 42} y="24" fill={strokeColor} fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {step.value_badge.slice(0, 8)}
                      </text>
                    </g>
                  )}

                  {/* Label & Details */}
                  <text x="14" y="52" fill="#F8FAFC" fontSize="11" fontWeight="bold">
                    {step.label.length > 12 ? `${step.label.slice(0, 12)}…` : step.label}
                  </text>
                  <text x="14" y="71" fill="#94A3B8" fontSize="9">
                    {step.detail.length > 15 ? `${step.detail.slice(0, 15)}…` : step.detail}
                  </text>
                  <text x="14" y="86" fill="#64748B" fontSize="8.5">
                    {step.detail.length > 15 ? `${step.detail.slice(15, 30)}${step.detail.length > 30 ? '…' : ''}` : ''}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* ── View Mode: BIOCHEMICAL SPECTRUM ── */}
      {viewMode === 'SPECTRUM' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 space-y-4 animate-fade-in font-sans">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-salud-cyan font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              生化光譜梯度分佈 (Biochemical Spectrum Gradient)
            </span>
            <span className="text-slate-400 text-[10px]">左端起始 ⇄ 右端終極恆定</span>
          </div>

          <div className="relative pt-6 pb-2">
            {/* Color spectrum bar */}
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-amber-500 via-sky-500 via-purple-500 to-emerald-500 shadow-sm" />

            {/* Step markers along the bar */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {graph.steps.map((st, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    activeStepIndex === idx
                      ? 'bg-slate-800 border-salud-cyan shadow-md ring-1 ring-salud-cyan/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-salud-cyan">Phase 0{idx + 1}</span>
                    <span className="text-slate-400">{st.value_badge || '標記'}</span>
                  </div>
                  <div className="font-bold text-xs text-white line-clamp-1">{st.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{st.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── View Mode: METRICS & EVIDENCE TARGETS ── */}
      {viewMode === 'METRICS' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              臨床量化指標與實證對照 (Clinical Metrics & Cutoffs)
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              {kp.id} · CEBM Level 1a
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 font-bold block">生化調控靶點 (Biological Target)</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {graph.prompt_blueprint.cognitive_target}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 font-bold block">視覺心智模型 (Visual Metaphor)</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                {graph.prompt_blueprint.visual_metaphor}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Flow Ribbon Cards */}
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
                className={`p-3.5 rounded-2xl border text-left transition-all ${getStepColorClass(
                  step.type,
                  isSelected
                )}`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-white/90 dark:bg-slate-800 flex items-center justify-center text-[10px] font-mono font-bold shadow-xs">
                    {idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    {step.value_badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
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
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 animate-fade-in">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-mono text-[10px]">
            <span className="font-bold text-salud-cyan dark:text-salud-cyan flex items-center gap-1">
              <Eye className="w-3 h-3" />
              節點聚焦深查 · 第 {activeStepIndex !== null ? activeStepIndex + 1 : 1} 步 ({kp.id} · Grade {kp.evidence_grade})
            </span>
            <span>點擊上方向量節點或卡片切換</span>
          </div>
          <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
            {activeStep.label}
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            {activeStep.detail}
          </p>
        </div>
      )}

      {/* Key Takeaway Footnote & Copy Action */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-start gap-2 flex-1 min-w-[280px]">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-200">機轉核心提煉：</strong>
            {graph.key_takeaway}
          </span>
        </div>

        <button
          onClick={handleCopyTakeaway}
          className="btn-tactile px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-mono font-semibold flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          {copiedTakeaway ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-salud-cyan" />}
          <span>{copiedTakeaway ? '已複製圖解要點！' : '複製圖解重點'}</span>
        </button>
      </div>
    </div>
  );
};
