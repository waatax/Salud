import React from 'react';
import { Chapter, KnowledgePage } from '../../types';
import { KnowledgeGraph } from './KnowledgeGraph';
import { BehaviorExperiment } from './BehaviorExperiment';
import { Droplets, Flame, BookOpen, Sparkles, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface Props {
  chapter: Chapter;
  pages: KnowledgePage[];
  onStartReading: (firstPageId: string) => void;
  onSelectPage: (pageId: string) => void;
}

export const ChapterLanding: React.FC<Props> = ({
  chapter,
  pages,
  onStartReading,
  onSelectPage,
}) => {
  const isWater = chapter.id === 'W';

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Chapter Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
        isWater
          ? 'border-salud-cyan/40 bg-gradient-to-br from-salud-cyan-950/40 via-salud-dark-card/60 to-slate-950 shadow-cyan-glow'
          : 'border-salud-amber/40 bg-gradient-to-br from-salud-amber-950/40 via-salud-dark-card/60 to-slate-950 shadow-warm-glow'
      }`}>
        {/* Ambient Glow */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isWater ? 'bg-salud-cyan/15' : 'bg-salud-amber/15'
        }`} />

        <div className="relative space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold border ${
              isWater
                ? 'bg-salud-cyan/20 text-salud-cyan-300 border-salud-cyan/40'
                : 'bg-salud-amber/20 text-salud-amber-300 border-salud-amber/40'
            }`}>
              Chapter {chapter.id} · {chapter.badge}
            </span>
            <span className="text-slate-400 font-mono text-xs">
              安全等級：{chapter.safety_level}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text tracking-tight">
            {chapter.title_zh}
          </h1>
          <p className="text-sm font-mono text-slate-400">
            {chapter.title_en}
          </p>

          <p className="text-sm sm:text-base text-slate-300/95 leading-relaxed">
            {chapter.summary}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">本章知識頁</span>
              <strong className="text-lg text-slate-100 font-display">{chapter.page_count} 頁</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">原子化 KP</span>
              <strong className="text-lg text-salud-amber-400 font-display">{chapter.kp_count} 點</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">高階圖解</span>
              <strong className="text-lg text-salud-cyan font-display">{chapter.figure_count} 張</strong>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartReading(pages[0]?.id || '')}
              className={`px-6 py-3 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition-all ${
                isWater
                  ? 'bg-salud-cyan text-black hover:opacity-90 shadow-cyan-glow'
                  : 'bg-salud-amber text-black hover:opacity-90 shadow-warm-glow'
              }`}
            >
              <span>從第 1 頁開始探索</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-mono">
              主責專家：{chapter.owner_experts.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Prerequisite Knowledge Path Graph (Spec §5.3) */}
      <section>
        <KnowledgeGraph
          pages={pages}
          activePageId={pages[0]?.id || ''}
          onSelectPage={onSelectPage}
        />
      </section>

      {/* 14-Day Micro-behavior Experiment (Spec §9.2) */}
      {isWater && (
        <section className="space-y-3">
          <div className="border-b border-salud-dark-border/60 pb-2">
            <h3 className="text-base font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-salud-cyan" />
              生活微實驗（14 天生活習慣改變計畫）
            </h3>
          </div>
          <BehaviorExperiment />
        </section>
      )}

      {/* Cheatsheet Quick Download Section (Spec §5.2) */}
      <section className="p-5 rounded-2xl border border-salud-dark-border bg-salud-dark-card/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-salud-amber-400 text-lg">
            📑
          </div>
          <div>
            <h5 className="font-bold text-slate-200 text-sm">
              Chapter {chapter.id} 官方 Cheatsheet（一頁重點通）
            </h5>
            <p className="text-slate-400 text-[11px]">
              包含全章核心 50+ 知識點、實證圖解結論、日常生活決策指針（PDF/可列印版）。
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>下載/列印重溫</span>
        </button>
      </section>
    </div>
  );
};
