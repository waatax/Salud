import React from 'react';
import { Chapter, KnowledgePage } from '../../types';
import { useLanguage } from '../../i18n';
import { KnowledgeGraph } from './KnowledgeGraph';
import { BehaviorExperiment } from './BehaviorExperiment';
import { Droplets, Flame, Wine, BookOpen, Sparkles, ArrowRight, ShieldCheck, Download, Dna } from 'lucide-react';

interface Props {
  chapter: Chapter;
  pages: KnowledgePage[];
  onStartReading: (firstPageId: string) => void;
  onSelectPage: (pageId: string) => void;
  onOpenSim?: () => void;
}

export const ChapterLanding: React.FC<Props> = ({
  chapter,
  pages,
  onStartReading,
  onSelectPage,
  onOpenSim,
}) => {
  const { t, language } = useLanguage();
  const isWater = chapter.id === 'W';
  const isOil = chapter.id === 'O';
  const isAlcohol = chapter.id === 'A';

  const themeBorder = isAlcohol
    ? 'border-salud-alcohol-purple/40 shadow-purple-glow'
    : isWater
    ? 'border-salud-cyan/40 shadow-cyan-glow'
    : 'border-salud-amber/40 shadow-warm-glow';

  const themeGradient = isAlcohol
    ? 'bg-gradient-to-br from-purple-100/70 via-salud-light-card/80 to-slate-100 dark:from-purple-950/40 dark:via-salud-dark-card/60 dark:to-slate-950'
    : isWater
    ? 'bg-gradient-to-br from-cyan-100/70 via-salud-light-card/80 to-slate-100 dark:from-salud-cyan-950/40 dark:via-salud-dark-card/60 dark:to-slate-950'
    : 'bg-gradient-to-br from-amber-100/70 via-salud-light-card/80 to-slate-100 dark:from-salud-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950';

  const themeBadge = isAlcohol
    ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40'
    : isWater
    ? 'bg-salud-cyan/20 text-salud-cyan-700 dark:text-salud-cyan-300 border-salud-cyan/40'
    : 'bg-salud-amber/20 text-salud-amber-700 dark:text-salud-amber-300 border-salud-amber/40';

  const themeBtn = isAlcohol
    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
    : isWater
    ? 'bg-salud-cyan hover:bg-salud-cyan-400 text-black shadow-cyan-glow'
    : 'bg-salud-amber hover:bg-salud-amber-400 text-black shadow-warm-glow';

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Chapter Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-colors ${themeBorder} ${themeGradient}`}>
        {/* Ambient Glow */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isAlcohol ? 'bg-purple-500/15' : isWater ? 'bg-salud-cyan/15' : 'bg-salud-amber/15'
        }`} />

        <div className="relative space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold border ${themeBadge}`}>
              Chapter {chapter.id} · {chapter.badge || t('landing.badge_flagship')}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
              {t('landing.safety_level')}：
              <strong className={
                chapter.safety_level === 'CRITICAL' ? 'text-red-400 font-bold' : chapter.safety_level === 'HIGH' ? 'text-salud-amber-600 dark:text-salud-amber font-bold' : 'text-slate-300'
              }>
                {chapter.safety_level}
              </strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight flex items-center gap-3">
            {isAlcohol && <Wine className="w-8 h-8 text-purple-400" />}
            {isWater && <Droplets className="w-8 h-8 text-salud-cyan" />}
            {isOil && <Flame className="w-8 h-8 text-salud-amber" />}
            <span>{language === 'zh-TW' ? chapter.title_zh : chapter.title_en}</span>
          </h1>
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
            {language === 'zh-TW' ? chapter.title_en : chapter.title_zh}
          </p>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300/95 leading-relaxed">
            {language === 'zh-TW'
              ? (chapter.summary_zh || chapter.summary)
              : (chapter.summary_en || chapter.summary)}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{t('landing.metric_pages')}</span>
              <strong className="text-lg text-slate-800 dark:text-slate-100 font-display">{chapter.page_count} 頁</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{t('landing.metric_kps')}</span>
              <strong className="text-lg text-salud-amber-600 dark:text-salud-amber-400 font-display">{chapter.kp_count} 點</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{t('landing.metric_figs')}</span>
              <strong className="text-lg text-salud-cyan font-display">{chapter.figure_count} 張</strong>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartReading(pages[0]?.id || '')}
              className={`px-6 py-3 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition-all ${themeBtn}`}
            >
              <span>{t('landing.btn_start')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartReading(pages[0]?.id || '')}
              className="px-5 py-3 rounded-xl border border-salud-light-border dark:border-salud-dark-border bg-salud-light-card/80 dark:bg-salud-dark-card/60 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 font-mono text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-all"
            >
              <Sparkles className="w-4 h-4 text-salud-amber" />
              <span>{t('landing.btn_sim')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Knowledge Path Graph Section ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-salud-cyan" />
            Chapter {chapter.id} · {t('landing.btn_graph')}
          </h3>
          <span className="text-xs font-mono text-slate-500">
            有向無環圖 (DAG) · 跨章前置連結
          </span>
        </div>

        <KnowledgeGraph
          pages={pages}
          activePageId={pages[0]?.id || ''}
          onSelectPage={onSelectPage}
        />
      </section>

      {/* ── Chapter Pages Index List ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text">
            {t('landing.section_pages')}
          </h3>
          <span className="text-xs font-mono text-slate-500">
            共 {pages.length} 篇知識頁
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pages.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPage(p.id)}
              className="p-4 rounded-2xl border border-salud-light-border dark:border-salud-dark-border bg-salud-light-card/80 dark:bg-salud-dark-card/60 hover:border-salud-amber/60 cursor-pointer transition-all hover:scale-[1.01] space-y-2 group"
            >
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="font-bold text-salud-amber-600 dark:text-salud-amber">{p.id}</span>
                <span className="text-slate-500">約 {p.estimated_minutes} 分鐘</span>
              </div>
              <h4 className="font-bold text-sm text-salud-light-text dark:text-salud-dark-text group-hover:text-salud-amber-600 dark:group-hover:text-salud-amber transition-colors">
                {language === 'zh-TW' ? p.title_zh : p.title_en}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {p.hook}
              </p>
              <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-slate-500 border-t border-salud-light-border/40 dark:border-salud-dark-border/40">
                <span>{p.kps.length} 個 KP 知識點</span>
                <span className="text-salud-cyan flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {t('landing.view_page')} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 14-Day Behavior Experiment ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text">
            {t('landing.section_experiment')}
          </h3>
          <span className="text-xs font-mono text-slate-500">
            一次只改一個變因 · 前後對照
          </span>
        </div>

        <BehaviorExperiment />
      </section>
    </div>
  );
};
