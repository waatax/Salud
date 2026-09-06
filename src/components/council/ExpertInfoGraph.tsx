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
  Info
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
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

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

  const getStepColorClass = (type: InfoGraphStep['type']) => {
    switch (type) {
      case 'trigger':
        return 'border-amber-300 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300';
      case 'warning':
        return 'border-rose-300 dark:border-rose-800/60 bg-rose-50/80 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300';
      case 'biomarker':
        return 'border-sky-300 dark:border-sky-800/60 bg-sky-50/70 dark:bg-sky-950/20 text-sky-900 dark:text-sky-300';
      case 'outcome':
        return 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300';
      case 'process':
      default:
        return 'border-purple-300 dark:border-purple-800/60 bg-purple-50/70 dark:bg-purple-950/20 text-purple-900 dark:text-purple-300';
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-sm space-y-5 transition-colors">
      {/* Header with Type Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-nature-amber-100 dark:bg-nature-amber-950/50 text-nature-amber-700 dark:text-nature-amber-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              {title}
            </h4>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              醫學臨床路徑 Info-Graph · 型態：{type}
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border border-nature-amber-300 dark:border-nature-amber-800 bg-nature-amber-50 dark:bg-nature-amber-950/40 text-nature-amber-800 dark:text-nature-amber-300">
          Peer-Reviewed Schematic
        </span>
      </div>

      {/* SVG Vector Visual Flow Ribbon */}
      <div className="relative py-2">
        {/* Desktop Pipeline Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 -translate-y-6 z-0 opacity-40" />

        {/* Step Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
          {steps.map((step, idx) => {
            const isHovered = activeStepIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveStepIndex(idx)}
                onMouseLeave={() => setActiveStepIndex(null)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${getStepColorClass(
                  step.type
                )} ${
                  isHovered
                    ? 'scale-102 shadow-md ring-2 ring-nature-amber-400/50'
                    : 'hover:shadow-sm'
                }`}
              >
                {/* Node Top info */}
                <div className="flex items-center justify-between">
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 text-[10px] font-mono font-bold flex items-center justify-center border border-current shadow-xs">
                    {idx + 1}
                  </span>
                  {step.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-extrabold tracking-wider uppercase border border-current">
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
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow indicator for next steps (except last on lg) */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center pt-1 text-slate-400">
                    <ArrowRight className="w-3.5 h-3.5 rotate-90 sm:rotate-0" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG Mechanistic Schematic Diagram */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
        <svg
          viewBox="0 0 800 90"
          className="w-full h-auto overflow-visible font-mono text-[11px]"
          aria-label="Clinical Mechanism Pathway Flowchart"
        >
          <defs>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Background Track Line */}
          <path
            d="M 50 45 L 750 45"
            stroke="url(#flowGrad)"
            strokeWidth="4"
            strokeDasharray="6 4"
            fill="none"
          />

          {/* Node 1 */}
          <circle cx="90" cy="45" r="14" fill="#f59e0b" filter="url(#glow)" />
          <text x="90" y="49" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            01
          </text>
          <text x="90" y="75" textAnchor="middle" fill="#d97706" fontWeight="bold" fontSize="10">
            Trigger
          </text>

          {/* Arrow 1-2 */}
          <path d="M 170 45 L 200 45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 2 */}
          <circle cx="240" cy="45" r="14" fill="#6366f1" />
          <text x="240" y="49" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            02
          </text>
          <text x="240" y="75" textAnchor="middle" fill="#6366f1" fontWeight="bold" fontSize="10">
            Physiology
          </text>

          {/* Node 3 */}
          <circle cx="400" cy="45" r="15" fill="#a855f7" filter="url(#glow)" />
          <text x="400" y="49" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            03
          </text>
          <text x="400" y="75" textAnchor="middle" fill="#9333ea" fontWeight="bold" fontSize="10">
            Cascade
          </text>

          {/* Node 4 */}
          <circle cx="560" cy="45" r="14" fill="#ef4444" />
          <text x="560" y="49" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            04
          </text>
          <text x="560" y="75" textAnchor="middle" fill="#ef4444" fontWeight="bold" fontSize="10">
            Tipping Pt
          </text>

          {/* Node 5 */}
          <circle cx="710" cy="45" r="16" fill="#10b981" filter="url(#glow)" />
          <text x="710" y="49" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            ✓
          </text>
          <text x="710" y="75" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="10">
            Best Practice
          </text>
        </svg>
      </div>

      {/* Key Takeaway Banner */}
      <div className="p-3.5 rounded-xl border border-salud-amber-400/40 bg-nature-amber-50/60 dark:bg-nature-amber-950/30 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
          <strong className="text-nature-amber-700 dark:text-nature-amber-400 font-bold mr-1.5">
            專家生化機制結論：
          </strong>
          {keyTakeaway}
        </p>
      </div>
    </div>
  );
};
