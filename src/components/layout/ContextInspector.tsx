import React from 'react';
import { KnowledgePage } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { CheckCircle, ShieldCheck, Printer, ArrowUpRight, HelpCircle } from 'lucide-react';

interface Props {
  page: KnowledgePage;
  onSelectKP?: (kpId: string) => void;
}

export const ContextInspector: React.FC<Props> = ({ page, onSelectKP }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <aside className="w-72 shrink-0 border-l border-salud-dark-border/80 dark:border-salud-dark-border/80 light:border-salud-light-border/80 bg-salud-dark-surface/40 dark:bg-salud-dark-surface/40 light:bg-salud-light-surface/40 p-4 space-y-5 overflow-y-auto text-xs font-sans">
      {/* KP Quick Jump */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-slate-300 font-mono font-bold text-xs uppercase tracking-wider">
          <span>本頁知識點 ({page.kps.length})</span>
          <span className="text-[10px] text-salud-amber-400">原子化 KP</span>
        </div>

        <div className="space-y-1.5">
          {page.kps.map((kp) => (
            <div
              key={kp.id}
              className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-salud-amber/40 transition-colors cursor-pointer group"
              onClick={() => onSelectKP && onSelectKP(kp.id)}
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-0.5">
                <span className="text-salud-amber-400 font-bold">{kp.id}</span>
                <span className="uppercase text-[9px] px-1 py-0.2 rounded bg-slate-800">{kp.kp_type}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-tight line-clamp-2 group-hover:text-white transition-colors">
                {kp.one_liner}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      {page.prerequisites && page.prerequisites.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-salud-dark-border/60">
          <span className="font-mono font-bold text-slate-400 uppercase tracking-wider block text-[11px]">
            前置知識依賴 (Prerequisites)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {page.prerequisites.map((req, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-800/80 text-salud-cyan-400 border border-slate-700 font-mono text-[10px]"
              >
                ➔ {req}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Freshness Card (Spec §3.4 & §10.1) */}
      <div className="p-3.5 rounded-xl border border-salud-dark-border bg-slate-900/80 space-y-2 font-mono text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">證據新鮮度：</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {page.evidence_freshness}
          </span>
        </div>

        <div className="pt-2 border-t border-slate-800 space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">最後簽核：</span>
            <span className="text-slate-300">{page.last_reviewed}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">審查週期：</span>
            <span className="text-slate-300">{page.next_review}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">專科簽核：</span>
            <span className="text-salud-amber-400 font-bold">{page.reviewed_by.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Export & Print actions (Spec §5.2 Cheatsheet) */}
      <div className="pt-2 border-t border-salud-dark-border/60 space-y-2">
        <button
          onClick={handlePrint}
          className="w-full py-2 px-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 font-mono text-xs"
        >
          <Printer className="w-3.5 h-3.5 text-salud-amber" />
          <span>列印本頁 Cheatsheet 重點</span>
        </button>
      </div>
    </aside>
  );
};
