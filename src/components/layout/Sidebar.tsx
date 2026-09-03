import React, { useState } from 'react';
import { CHAPTERS } from '../../data/chapters';
import { Chapter } from '../../types';
import { Droplets, Flame, Activity, ChevronDown, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

interface Props {
  currentChapterId: string;
  activePageId: string;
  onSelectChapter: (chapterId: string) => void;
  onSelectPage: (pageId: string) => void;
  chapterWPages: any[];
  chapterOPages: any[];
}

export const Sidebar: React.FC<Props> = ({
  currentChapterId,
  activePageId,
  onSelectChapter,
  onSelectPage,
  chapterWPages,
  chapterOPages,
}) => {
  const [expandedNutrition, setExpandedNutrition] = useState(true);

  // Chapter completion percentages
  const progressMap: Record<string, number> = {
    W: 75,
    O: 50,
    E: 30,
    P: 10,
    C: 0,
    S: 0,
    N: 0,
    M: 0,
    D: 0,
    F: 0,
  };

  const pagesForCurrent = currentChapterId === 'W' ? chapterWPages : currentChapterId === 'O' ? chapterOPages : [];

  return (
    <aside className="w-60 shrink-0 border-r border-salud-dark-border/80 dark:border-salud-dark-border/80 light:border-salud-light-border/80 bg-salud-dark-surface/50 dark:bg-salud-dark-surface/50 light:bg-salud-light-surface/50 p-4 space-y-6 overflow-y-auto text-xs font-sans">
      {/* Platform Vision One-liner */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
        <span className="font-mono text-[10px] text-salud-amber-400 font-bold block uppercase tracking-wider">
          Salud 產品理念
        </span>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          讓你看見身體裡正在發生的事，動手改一個變因，用真實資料檢查你猜得對不對。
        </p>
      </div>

      {/* Navigation Group: Nutrition Chapters (Spec §10.4) */}
      <div className="space-y-2">
        <button
          onClick={() => setExpandedNutrition(!expandedNutrition)}
          className="w-full flex items-center justify-between text-xs font-mono font-bold text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wider px-1"
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-salud-cyan" />
            Nutrition 營養 10 篇章
          </span>
          {expandedNutrition ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {expandedNutrition && (
          <div className="space-y-1 pl-1">
            {CHAPTERS.map((ch) => {
              const isSelected = ch.id === currentChapterId;
              const isPublished = ch.status === 'PUBLISHED';
              const progress = progressMap[ch.id] || 0;

              return (
                <button
                  key={ch.id}
                  disabled={!isPublished}
                  onClick={() => onSelectChapter(ch.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-salud-amber/60 bg-salud-amber-500/15 text-slate-100 font-bold shadow-warm-glow'
                      : isPublished
                      ? 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      : 'border-transparent text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[11px] ${
                        isSelected
                          ? 'bg-salud-amber text-black'
                          : isPublished
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-900 text-slate-600'
                      }`}>
                        {ch.id}
                      </span>
                      <span className="text-xs truncate max-w-[120px]">{ch.title_zh}</span>
                    </div>
                    {isPublished ? (
                      <span className="text-[10px] font-mono text-salud-amber-400">{progress}%</span>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-600 uppercase">研發中</span>
                    )}
                  </div>

                  {/* Progress Mini Bar (Spec §10.4) */}
                  {isPublished && (
                    <div className="mt-1.5 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${progress}%` }}
                        className={`h-full ${isSelected ? 'bg-salud-amber' : 'bg-slate-600'}`}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Pages List for Selected Chapter */}
      <div className="space-y-2 pt-2 border-t border-salud-dark-border/60">
        <div className="flex items-center justify-between px-1 text-xs font-mono font-bold text-slate-400">
          <span>篇章知識頁 ({pagesForCurrent.length} 頁)</span>
          <span className="text-salud-cyan font-bold">{currentChapterId} 篇</span>
        </div>

        <div className="space-y-1 pl-1">
          {pagesForCurrent.map((p) => {
            const isPageActive = p.id === activePageId;

            return (
              <button
                key={p.id}
                onClick={() => onSelectPage(p.id)}
                className={`w-full p-2 rounded-lg text-left text-xs transition-all flex items-start gap-2 ${
                  isPageActive
                    ? 'bg-salud-cyan/20 text-salud-cyan-300 font-bold border border-salud-cyan/40 shadow-cyan-glow'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <span className="font-mono text-[10px] text-slate-500 shrink-0 mt-0.5">
                  {p.order_index < 10 ? `0${p.order_index}` : p.order_index}
                </span>
                <span className="truncate leading-tight">{p.title_zh}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
