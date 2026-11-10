import React, { useState } from 'react';
import { InfoGraphStep } from '../../data/expertBestPractices';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Flame,
  ShieldCheck,
  Zap,
  Info,
  Maximize2,
  Copy,
  CheckCheck,
  FileCheck2,
  Eye,
  Sliders,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';

interface Props {
  title: string;
  type: 'CASCADE' | 'DECISION_TREE' | 'METABOLIC_PATHWAY' | 'SPECTRUM' | 'TRIAGE';
  steps: InfoGraphStep[];
  keyTakeaway: string;
}

export const ExpertInfoGraph: React.FC<Props> = ({
  title,
  type,
  steps,
  keyTakeaway,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [showA11yTable, setShowA11yTable] = useState<boolean>(false);
  const [copiedTakeaway, setCopiedTakeaway] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'SCHEMATIC' | 'GRID' | 'TABLE'>('SCHEMATIC');

  const getStepIcon = (type: InfoGraphStep['type']) => {
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

  const getStepColorClass = (type: InfoGraphStep['type'], isSelected: boolean) => {
    if (isSelected) {
      return 'border-nature-amber-500 dark:border-nature-amber-400 bg-nature-amber-500/15 dark:bg-nature-amber-950/40 ring-2 ring-nature-amber-400/50 text-slate-900 dark:text-white shadow-md transform -translate-y-0.5';
    }
    switch (type) {
      case 'trigger':
        return 'border-amber-300/90 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 hover:border-amber-400';
      case 'warning':
        return 'border-rose-300/90 dark:border-rose-800/60 bg-rose-50/80 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 hover:border-rose-400';
      case 'biomarker':
        return 'border-sky-300/90 dark:border-sky-800/60 bg-sky-50/70 dark:bg-sky-950/20 text-sky-900 dark:text-sky-300 hover:border-sky-400';
      case 'outcome':
        return 'border-emerald-300/90 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 hover:border-emerald-400';
      case 'process':
      default:
        return 'border-purple-300/90 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/20 text-purple-900 dark:text-purple-300 hover:border-purple-400';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`【${title}】\n型態：${type}\n專家核心結論：${keyTakeaway}`);
    setCopiedTakeaway(true);
    setTimeout(() => setCopiedTakeaway(false), 2000);
  };

  const activeStep = steps[activeStepIndex] || steps[0];

  return (
    <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm space-y-5 transition-all">
      {/* Header with Type Tag & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-nature-amber-100 dark:bg-nature-amber-950/50 text-nature-amber-700 dark:text-nature-amber-400 border border-nature-amber-300/40">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full font-mono text-[0.75rem] font-bold border border-nature-amber-300 dark:border-nature-amber-800 bg-nature-amber-50 dark:bg-nature-amber-950/40 text-nature-amber-800 dark:text-nature-amber-300">
                CLINICAL INFOGRAPH · {type}
              </span>
              <h4 className="font-display font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {title}
              </h4>
            </div>
            <span className="text-[0.75rem] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
              Peer-Reviewed Mechanistic Pathway & Decision Matrix
            </span>
          </div>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.75rem] font-mono font-bold">
            <button
              onClick={() => setActiveView('SCHEMATIC')}
              className={`px-2 py-1 rounded-lg transition-all ${
                activeView === 'SCHEMATIC'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              生化線圖
            </button>
            <button
              onClick={() => setActiveView('GRID')}
              className={`px-2 py-1 rounded-lg transition-all ${
                activeView === 'GRID'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              卡片矩陣
            </button>
            <button
              onClick={() => setActiveView('TABLE')}
              className={`px-2 py-1 rounded-lg transition-all ${
                activeView === 'TABLE'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              等價表格
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[0.75rem] font-mono flex items-center gap-1 shadow-xs hover:bg-slate-50"
            title="複製專家圖解重點"
          >
            {copiedTakeaway ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-amber-500" />}
            <span className="hidden sm:inline">{copiedTakeaway ? '已複製' : '複製重點'}</span>
          </button>
        </div>
      </div>

      {/* SVG Mechanistic Schematic Diagram (Interactive) */}
      {activeView === 'SCHEMATIC' && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner overflow-hidden">
          <svg
            viewBox="0 0 800 110"
            className="w-full h-auto overflow-visible font-mono text-[11px]"
            aria-label="Clinical Mechanism Pathway Flowchart"
          >
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#ef4444" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
              </linearGradient>
              <filter id="expertGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            {/* Background Track Line */}
            <path
              d="M 60 48 L 740 48"
              stroke="url(#flowGrad)"
              strokeWidth="3.5"
              strokeDasharray="6 4"
              fill="none"
              opacity="0.4"
            />

            {/* Dynamically render step circles according to steps.length */}
            {steps.map((st, idx) => {
              const total = steps.length;
              const spacing = 680 / (total - 1 || 1);
              const cx = 60 + idx * spacing;
              const cy = 48;
              const isSelected = activeStepIndex === idx;
              const nodeColor =
                st.type === 'trigger'
                  ? '#f59e0b'
                  : st.type === 'biomarker'
                  ? '#38bdf8'
                  : st.type === 'warning'
                  ? '#ef4444'
                  : st.type === 'outcome'
                  ? '#10b981'
                  : '#a855f7';

              return (
                <g
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className="cursor-pointer transition-transform duration-200"
                >
                  {/* Outer pulse ring if selected */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="22"
                      fill={nodeColor}
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? '18' : '14'}
                    fill={nodeColor}
                    filter={isSelected ? 'url(#expertGlow)' : undefined}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? '2.5' : '1'}
                  />

                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontWeight="bold"
                    fontSize={isSelected ? '12' : '10'}
                  >
                    {idx + 1}
                  </text>

                  {/* Top Badge */}
                  {st.badge && (
                    <text
                      x={cx}
                      y={cy - 24}
                      textAnchor="middle"
                      fill={nodeColor}
                      fontWeight="bold"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {st.badge}
                    </text>
                  )}

                  {/* Bottom Node Title */}
                  <text
                    x={cx}
                    y={cy + 30}
                    textAnchor="middle"
                    fill={isSelected ? '#f8fafc' : '#94a3b8'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    fontSize="10"
                    fontFamily="sans-serif"
                  >
                    {st.title.length > 8 ? `${st.title.slice(0, 8)}…` : st.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Accessible Table View */}
      {activeView === 'TABLE' && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs space-y-3 animate-fade-in">
          <div className="flex items-center justify-between font-mono text-[0.75rem] text-slate-500">
            <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5" />
              無障礙等價資料矩陣 (WCAG 2.2 AA)
            </span>
            <span>點擊單行可切換深查</span>
          </div>
          <table className="w-full text-left border-collapse text-[0.75rem]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 font-mono text-slate-500">
                <th className="py-1.5 px-2">階段</th>
                <th className="py-1.5 px-2">節點名稱</th>
                <th className="py-1.5 px-2">型態標籤</th>
                <th className="py-1.5 px-2">生理與生化機轉細節</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
              {steps.map((st, idx) => (
                <tr
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`cursor-pointer transition-colors ${activeStepIndex === idx ? 'bg-amber-500/10 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                >
                  <td className="py-1.5 px-2 font-mono font-bold text-slate-500">0{idx + 1}</td>
                  <td className="py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">{st.title}</td>
                  <td className="py-1.5 px-2 font-mono text-[0.75rem] uppercase text-amber-600 dark:text-amber-400">{st.type}</td>
                  <td className="py-1.5 px-2 text-slate-600 dark:text-slate-300">{st.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Step Nodes Grid (Ribbon) */}
      <div className="relative py-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative z-10">
          {steps.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${getStepColorClass(
                  step.type,
                  isSelected
                )}`}
              >
                {/* Node Top info */}
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 text-[0.75rem] font-mono font-bold flex items-center justify-center border border-current shadow-xs">
                    {idx + 1}
                  </span>
                  {step.badge && (
                    <span className="text-[0.6875rem] font-mono px-1.5 py-0.5 rounded-full font-extrabold tracking-wider uppercase border border-current bg-white/50 dark:bg-slate-900/50">
                      {step.badge}
                    </span>
                  )}
                  {getStepIcon(step.type)}
                </div>

                {/* Step Title & Description */}
                <div>
                  <h5 className="font-display font-bold text-xs leading-tight mb-1 text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h5>
                  <p className="text-[0.75rem] leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Highlight Box for Active Step */}
      {activeStep && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 animate-fade-in">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-mono text-[0.75rem]">
            <span className="font-bold text-nature-amber-600 dark:text-nature-amber-400 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              生化節點深度解析 · 第 {activeStepIndex + 1} 步
            </span>
            <span className="uppercase">{activeStep.type} 節點</span>
          </div>
          <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
            {activeStep.title}
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
            {activeStep.desc}
          </p>
        </div>
      )}

      {/* Key Takeaway Banner */}
      <div className="p-4 rounded-2xl border border-salud-amber-400/50 bg-nature-amber-50/70 dark:bg-nature-amber-950/30 flex items-start gap-2.5 shadow-xs">
        <Info className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
          <strong className="text-nature-amber-800 dark:text-nature-amber-300 font-bold mr-1.5">
            專家生化機制結論：
          </strong>
          {keyTakeaway}
        </div>
      </div>
    </div>
  );
};
