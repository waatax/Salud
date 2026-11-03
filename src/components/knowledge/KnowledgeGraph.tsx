import React, { useState } from 'react';
import { KnowledgePage } from '../../types';
import { Network, CheckCircle2, Lock, ArrowRight, Compass, Sparkles, Filter, Layers } from 'lucide-react';

interface Props {
  pages: KnowledgePage[];
  activePageId: string;
  onSelectPage: (pageId: string) => void;
}

export const KnowledgeGraph: React.FC<Props> = ({ pages, activePageId, onSelectPage }) => {
  const [hoveredPage, setHoveredPage] = useState<KnowledgePage | null>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'ACTIVE_PREV' | 'COMPLETED'>('ALL');

  const activeIndex = pages.findIndex((p) => p.id === activePageId);

  const filteredPages = pages.filter((page) => {
    if (filterMode === 'COMPLETED') {
      return page.order_index < (pages[activeIndex]?.order_index || 1);
    }
    if (filterMode === 'ACTIVE_PREV') {
      return page.order_index <= (pages[activeIndex]?.order_index || 1);
    }
    return true;
  });

  return (
    <div className="rounded-3xl border border-salud-dark-border dark:border-salud-dark-border light:border-salud-light-border bg-gradient-to-br from-salud-dark-surface via-slate-900 to-salud-cyan/5 dark:bg-salud-dark-surface light:bg-salud-light-surface p-5 sm:p-6 space-y-5 font-sans text-xs shadow-sm">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-salud-cyan/15 border border-salud-cyan/30 text-salud-cyan">
            <Network className="w-5 h-5 text-salud-cyan" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-salud-cyan/20 text-salud-cyan border border-salud-cyan/40">
                TOPOLOGY · PREREQUISITES
              </span>
              <h4 className="text-sm sm:text-base font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text">
                篇章學習路徑與拓撲導覽 (Knowledge Prerequisite Graph)
              </h4>
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
              點擊節點直達篇章 · 支援階層相依性濾鏡與進度拓撲
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono font-bold">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              filterMode === 'ALL'
                ? 'bg-salud-cyan text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            全部 ({pages.length})
          </button>
          <button
            onClick={() => setFilterMode('ACTIVE_PREV')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              filterMode === 'ACTIVE_PREV'
                ? 'bg-salud-cyan text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            至當前進度
          </button>
          <button
            onClick={() => setFilterMode('COMPLETED')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              filterMode === 'COMPLETED'
                ? 'bg-salud-cyan text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            已研讀章節
          </button>
        </div>
      </div>

      {/* Path Nodes Grid with Dynamic Progress Topology */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredPages.map((page, idx) => {
          const isActive = page.id === activePageId;
          const isCompleted = page.order_index < (pages[activeIndex]?.order_index || 1);

          return (
            <button
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              onMouseEnter={() => setHoveredPage(page)}
              onMouseLeave={() => setHoveredPage(null)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                isActive
                  ? 'border-salud-amber bg-salud-amber-500/15 ring-2 ring-salud-amber/50 shadow-warm-glow transform -translate-y-0.5'
                  : isCompleted
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-slate-200 hover:border-emerald-400'
                  : 'border-salud-dark-border bg-salud-dark-card/40 text-slate-400 hover:border-salud-cyan/60 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                <span className="font-extrabold tracking-wider">
                  {page.id}
                </span>
                {isActive ? (
                  <span className="flex items-center gap-1 font-bold text-salud-amber text-[9px] uppercase">
                    <span className="w-2 h-2 rounded-full bg-salud-amber animate-ping" />
                    研讀中
                  </span>
                ) : isCompleted ? (
                  <span className="flex items-center gap-1 text-emerald-400 text-[9px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    完成
                  </span>
                ) : (
                  <span className="text-slate-500 font-bold">{idx + 1}</span>
                )}
              </div>

              <h5 className="font-bold text-xs text-slate-100 line-clamp-1 group-hover:text-salud-cyan transition-colors">
                {page.title_zh}
              </h5>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-salud-cyan" />
                  {page.kps.length} 知識點
                </span>
                <span>{page.estimated_minutes} min</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hover preview info */}
      {hoveredPage && (
        <div className="p-3.5 rounded-2xl bg-slate-950/95 border border-slate-800 text-slate-300 animate-fade-in flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-salud-cyan shrink-0" />
            <div>
              <span className="font-mono text-salud-cyan text-xs font-bold mr-2">
                {hoveredPage.id} · {hoveredPage.title_zh}
              </span>
              <span className="text-xs text-slate-300 line-clamp-1">{hoveredPage.hook}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-salud-cyan shrink-0 ml-3">
            <span>點擊直達</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}
    </div>
  );
};
