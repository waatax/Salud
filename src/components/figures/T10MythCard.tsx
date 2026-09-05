import React from 'react';
import { MythItem } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  item: MythItem;
  className?: string;
}

export const T10MythCard: React.FC<Props> = ({ item, className = '' }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all duration-200 hover:border-nature-amber-400/80 font-sans text-xs ${className}`}
    >
      {/* Myth Top Banner */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-nature-amber-50/80 dark:bg-nature-amber-950/20 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-xl bg-nature-amber-100 dark:bg-nature-amber-500/20 text-nature-amber-700 dark:text-nature-amber-400 border border-nature-amber-200 dark:border-nature-amber-500/30 shrink-0 mt-0.5 shadow-xs">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-nature-amber-800 dark:text-nature-amber-400 block font-bold">
              Myth Arena 迷思擂台
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
              「{item.myth_claim}」
            </h4>
          </div>
        </div>

        <EvidenceBadge grade={item.evidence_grade} showText={false} />
      </div>

      {/* Myth Content Matrix (Spec §3.3 & §3.4) */}
      <div className="p-4 space-y-3">
        {/* 1. What's partially true */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-nature-sky-700 dark:text-salud-cyan font-bold font-mono text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 text-nature-sky-600 dark:text-salud-cyan" />
            這句話哪一部分其實是對的？
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5 text-xs font-sans">
            {item.partial_truth}
          </p>
        </div>

        {/* 2. Scientific Reality */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-nature-amber-700 dark:text-salud-amber-400 font-bold font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-nature-amber-600 dark:text-salud-amber-400" />
            實證醫學全貌與科學真相
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5 text-xs font-sans">
            {item.evidence_reality}
          </p>
        </div>

        {/* 3. Action Takeaway */}
        <div className="p-3.5 rounded-xl bg-nature-green-50/90 dark:bg-emerald-950/30 border border-nature-green-200 dark:border-emerald-500/30 text-nature-green-950 dark:text-emerald-200 flex items-start gap-2 shadow-xs">
          <ArrowRight className="w-4 h-4 text-nature-green-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[11px] font-mono text-nature-green-800 dark:text-emerald-300 block">
              正確做法（Do This）
            </span>
            <p className="text-xs text-nature-green-900 dark:text-emerald-100 leading-relaxed font-sans">
              {item.action_takeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
