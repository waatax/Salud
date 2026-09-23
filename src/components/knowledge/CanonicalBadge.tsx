import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, AlertTriangle, BookOpen, X, ChevronRight } from 'lucide-react';
import { CANONICAL_KNOWLEDGE_PACK_82 } from '../../knowledge/atoms/pack82';

interface CanonicalBadgeProps {
  atomId: string;
  variant?: 'inline' | 'compact' | 'pill';
  className?: string;
}

export const CanonicalBadge: React.FC<CanonicalBadgeProps> = ({
  atomId,
  variant = 'pill',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const atom = CANONICAL_KNOWLEDGE_PACK_82.find((a) => a.id === atomId);
  if (!atom) return null;

  const isWarning = atom.status === 'needs-provenance-review';

  return (
    <>
      {/* Trigger Badge */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        title={`檢視規範知識錨點 ${atom.id} 及防誤用指引`}
        className={`inline-flex items-center gap-1.5 transition-all text-left font-mono ${
          variant === 'pill'
            ? 'px-2 py-0.5 rounded-full text-[11px] bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-400'
            : variant === 'compact'
            ? 'px-1.5 py-0.2 rounded text-[10px] bg-[#14221b] border border-emerald-800/60 text-emerald-400 hover:text-white'
            : 'text-xs text-emerald-400 underline underline-offset-2 hover:text-emerald-300'
        } ${className}`}
      >
        <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
        <span className="font-semibold">{atom.id}</span>
        <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-emerald-900/60 text-emerald-200">
          {atom.derived_certainty}
        </span>
      </button>

      {/* Popover / Drawer Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#0e1713] border border-emerald-500/50 rounded-2xl w-full max-w-lg p-5 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-emerald-900/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-mono text-xs font-bold text-emerald-300">{atom.id}</div>
                  <div className="text-[11px] text-slate-400">
                    規範知識錨點 (Canonical Evidence Atom)
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-xs p-1 rounded hover:bg-emerald-900/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="mt-4 space-y-3">
              <div>
                <div className="text-[11px] text-slate-400 font-semibold mb-1">醫學斷言陳述</div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {atom.statement_zh}
                </p>
              </div>

              {/* Misuse Guard */}
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-600/40 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  防誤用防線 (Misuse Guard)
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {atom.misuse_guard}
                </p>
              </div>

              {/* Meta details */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-emerald-900/40">
                <div>
                  適用族群：<span className="text-slate-200">{atom.applies_to.population}</span>
                </div>
                <div>
                  確定度推導：<span className="text-emerald-300 uppercase font-mono">{atom.derived_certainty}</span>
                </div>
                <div>
                  出處代號：<span className="text-slate-200 font-mono">{atom.primary_source}</span>
                </div>
                <div>
                  最後審核：<span className="text-slate-200 font-mono">{atom.last_reviewed}</span>
                </div>
              </div>
            </div>

            {/* Jump to Explorer */}
            <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                Salud Layer 1 Canonical Pack
              </span>
              <a
                href={`#explore?atom=${atom.id}`}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium shadow"
              >
                在知識庫檢視三層證據
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
