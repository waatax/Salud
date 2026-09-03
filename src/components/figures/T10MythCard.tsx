import React, { useState } from 'react';
import { MythItem } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { HelpCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  item: MythItem;
  className?: string;
}

export const T10MythCard: React.FC<Props> = ({ item, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`rounded-2xl border border-salud-dark-border dark:border-salud-dark-border light:border-salud-light-border bg-salud-dark-surface dark:bg-salud-dark-surface light:bg-salud-light-surface overflow-hidden shadow-lg transition-all duration-200 hover:border-salud-amber/50 font-sans text-xs ${className}`}
    >
      {/* Myth Top Banner */}
      <div className="p-4 border-b border-salud-dark-border/60 bg-gradient-to-r from-salud-amber-500/15 via-salud-dark-card/40 to-transparent flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-salud-amber-500/20 text-salud-amber-400 border border-salud-amber-500/30 shrink-0 mt-0.5">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-salud-amber-400 block font-bold">
              Myth Arena 迷思擂台
            </span>
            <h4 className="text-sm font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text leading-snug">
              「{item.myth_claim}」
            </h4>
          </div>
        </div>

        <EvidenceBadge grade={item.evidence_grade} showText={false} />
      </div>

      {/* Myth Content Matrix (Spec §3.3 & §3.4) */}
      <div className="p-4 space-y-3">
        {/* 1. What's partially true */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-salud-cyan-400 font-semibold font-mono text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 text-salud-cyan-400" />
            這句話哪一部分其實是對的？
          </div>
          <p className="text-slate-300 leading-relaxed pl-5 text-xs">
            {item.partial_truth}
          </p>
        </div>

        {/* 2. Scientific Reality */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-salud-amber-400 font-semibold font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-salud-amber-400" />
            實證醫學全貌與科學真相
          </div>
          <p className="text-slate-300 leading-relaxed pl-5 text-xs">
            {item.evidence_reality}
          </p>
        </div>

        {/* 3. Action Takeaway */}
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 flex items-start gap-2">
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[11px] font-mono text-emerald-300 block">
              正確做法（Do This）
            </span>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {item.action_takeaway}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
