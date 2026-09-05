import React from 'react';
import { Chapter, KnowledgePage } from '../../types';
import { useLanguage } from '../../i18n';
import { KnowledgeGraph } from './KnowledgeGraph';
import { BehaviorExperiment } from './BehaviorExperiment';
import { Droplets, Flame, Wine, BookOpen, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

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
    ? 'border-purple-200 dark:border-purple-800/60 shadow-sm'
    : isWater
    ? 'border-nature-sky-200 dark:border-nature-sky-800/60 shadow-sm'
    : 'border-nature-amber-200 dark:border-nature-amber-800/60 shadow-sm';

  const themeGradient = isAlcohol
    ? 'bg-gradient-to-br from-purple-100/70 via-white to-nature-sky-50/40 dark:from-purple-950/40 dark:via-salud-dark-card/60 dark:to-slate-950'
    : isWater
    ? 'bg-gradient-to-br from-nature-sky-100/70 via-white to-nature-green-50/40 dark:from-salud-cyan-950/40 dark:via-salud-dark-card/60 dark:to-slate-950'
    : 'bg-gradient-to-br from-nature-amber-100/70 via-white to-nature-green-50/40 dark:from-salud-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950';

  const themeBadge = isAlcohol
    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/60'
    : isWater
    ? 'bg-nature-sky-100 dark:bg-nature-sky-950/60 text-nature-sky-800 dark:text-nature-sky-300 border-nature-sky-200 dark:border-nature-sky-800/60'
    : 'bg-nature-amber-100 dark:bg-nature-amber-950/60 text-nature-amber-800 dark:text-nature-amber-300 border-nature-amber-200 dark:border-nature-amber-800/60';

  const themeBtn = isAlcohol
    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
    : isWater
    ? 'bg-nature-sky-500 hover:bg-nature-sky-600 text-white font-bold shadow-cyan-glow'
    : 'bg-nature-amber-500 hover:bg-nature-amber-600 text-white font-bold shadow-warm-glow';

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Chapter Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-colors ${themeBorder} ${themeGradient}`}>
        {/* Ambient Glow */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isAlcohol ? 'bg-purple-500/15' : isWater ? 'bg-nature-sky-500/15' : 'bg-nature-amber-500/15'
        }`} />

        <div className="relative space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold border ${themeBadge}`}>
              Chapter {chapter.id} · {chapter.badge || t('landing.badge_flagship')}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
              {t('landing.safety_level')}：
              <strong className={
                chapter.safety_level === 'CRITICAL' ? 'text-red-600 dark:text-red-400 font-bold' : chapter.safety_level === 'HIGH' ? 'text-nature-amber-700 dark:text-salud-amber font-bold' : 'text-slate-500'
              }>
                {chapter.safety_level}
              </strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-salud-dark-text tracking-tight flex items-center gap-3">
            {isAlcohol && <Wine className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
            {isWater && <Droplets className="w-8 h-8 text-nature-sky-600 dark:text-salud-cyan" />}
            {isOil && <Flame className="w-8 h-8 text-nature-amber-600 dark:text-salud-amber" />}
            <span>{language === 'zh-TW' ? chapter.title_zh : chapter.title_en}</span>
          </h1>
          <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
            {language === 'zh-TW' ? chapter.title_en : chapter.title_zh}
          </p>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {language === 'zh-TW'
              ? (chapter.summary_zh || chapter.summary)
              : (chapter.summary_en || chapter.summary)}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{t('landing.metric_pages')}</span>
              <strong className="text-lg text-slate-900 dark:text-slate-100 font-display">{chapter.page_count} 頁</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{t('landing.metric_kps')}</span>
              <strong className="text-lg text-nature-amber-700 dark:text-nature-amber-400 font-display">{chapter.kp_count} 點</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{t('landing.metric_figs')}</span>
              <strong className="text-lg text-nature-sky-700 dark:text-salud-cyan font-display">{chapter.figure_count} 張</strong>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartReading(pages[0]?.id || '')}
              className={`btn-tactile px-6 py-3 rounded-2xl font-bold font-mono text-xs flex items-center gap-2 transition-all ${themeBtn}`}
            >
              <span>{t('landing.btn_start')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartReading(pages[0]?.id || '')}
              className="btn-tactile px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 font-mono text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-nature-amber-600 dark:text-salud-amber" />
              <span>{t('landing.btn_sim')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Knowledge Path Graph Section ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-nature-sky-600 dark:text-salud-cyan" />
            Chapter {chapter.id} · {t('landing.btn_graph')}
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
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
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
            {t('landing.section_pages')}
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            共 {pages.length} 篇知識頁
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {pages.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPage(p.id)}
              className="btn-tactile p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-nature-sky-300 dark:hover:border-nature-sky-700 cursor-pointer transition-all shadow-sm hover:shadow-md space-y-2.5 group"
            >
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="font-bold text-nature-amber-700 dark:text-salud-amber">{p.id}</span>
                <span className="text-slate-500">約 {p.estimated_minutes} 分鐘</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-nature-sky-700 dark:group-hover:text-nature-sky-400 transition-colors">
                {language === 'zh-TW' ? p.title_zh : p.title_en}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
                {p.hook}
              </p>
              <div className="flex items-center justify-between pt-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span>{p.kps.length} 個 KP 知識點</span>
                <span className="text-nature-sky-700 dark:text-salud-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                  {t('landing.view_page')} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 14-Day Behavior Experiment ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
            {t('landing.section_experiment')}
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            一次只改一個變因 · 前後對照
          </span>
        </div>

        <BehaviorExperiment />
      </section>
    </div>
  );
};
