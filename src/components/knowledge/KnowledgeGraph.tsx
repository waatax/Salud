import React, { useState } from 'react';
import { KnowledgePage } from '../../types';
import { Network, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface Props {
  pages: KnowledgePage[];
  activePageId: string;
  onSelectPage: (pageId: string) => void;
}

export const KnowledgeGraph: React.FC<Props> = ({ pages, activePageId, onSelectPage }) => {
  const [hoveredPage, setHoveredPage] = useState<KnowledgePage | null>(null);

  return (
    <div className="rounded-2xl border border-salud-dark-border dark:border-salud-dark-border light:border-salud-light-border bg-salud-dark-surface dark:bg-salud-dark-surface light:bg-salud-light-surface p-4 sm:p-6 space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-salud-cyan" />
          <h4 className="text-sm sm:text-base font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text">
            篇章學習路徑圖 (Knowledge Prerequisite Graph)
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          點擊節點直接跳轉閱讀
        </span>
      </div>

      {/* Path Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {pages.map((page, idx) => {
          const isActive = page.id === activePageId;
          const isCompleted = page.order_index < (pages.find(p => p.id === activePageId)?.order_index || 1);

          return (
            <button
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              onMouseEnter={() => setHoveredPage(page)}
              onMouseLeave={() => setHoveredPage(null)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                isActive
                  ? 'border-salud-amber bg-salud-amber-500/15 ring-2 ring-salud-amber/50 shadow-warm-glow'
                  : isCompleted
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-200'
                  : 'border-salud-dark-border bg-salud-dark-card/40 text-slate-400 hover:border-salud-cyan/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                <span className="font-bold">
                  {page.id}
                </span>
                {isActive ? (
                  <span className="w-2 h-2 rounded-full bg-salud-amber animate-ping" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-slate-500 font-bold">{idx + 1}</span>
                )}
              </div>

              <h5 className="font-semibold text-xs text-slate-100 line-clamp-1 group-hover:text-salud-cyan transition-colors">
                {page.title_zh}
              </h5>

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{page.kps.length} 個知識點</span>
                <span>{page.estimated_minutes} min</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hover preview info */}
      {hoveredPage && (
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 animate-fade-in flex items-center justify-between">
          <div>
            <span className="font-mono text-salud-cyan text-xs font-bold mr-2">
              {hoveredPage.id} · {hoveredPage.title_zh}
            </span>
            <span className="text-xs opacity-90">{hoveredPage.hook}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-salud-cyan shrink-0 ml-3" />
        </div>
      )}
    </div>
  );
};
