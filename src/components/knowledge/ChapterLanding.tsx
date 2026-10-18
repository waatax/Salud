import React from 'react';
import { Chapter, KnowledgePage } from '../../types';
import { useLanguage } from '../../i18n';
import { KnowledgeGraph } from './KnowledgeGraph';
import { BehaviorExperiment } from './BehaviorExperiment';
import { MedicalKnowledgeBase } from './MedicalKnowledgeBase';
import {
  Droplets,
  Flame,
  Wine,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Dumbbell,
  Wheat,
  Candy,
  HeartPulse,
  Pill,
  Salad,
  FileText
} from 'lucide-react';

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

  const getChapterTheme = (id: string) => {
    switch (id) {
      case 'W':
        return {
          icon: Droplets,
          border: 'border-sky-200 dark:border-sky-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-sky-50/90 via-white to-teal-50/30 dark:from-sky-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
          btn: 'bg-nature-sky-600 hover:bg-nature-sky-700 text-white font-bold shadow-cyan-glow',
          glow: 'bg-nature-sky-500/15',
          iconColor: 'text-nature-sky-600 dark:text-salud-cyan'
        };
      case 'O':
        return {
          icon: Flame,
          border: 'border-amber-200 dark:border-amber-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-amber-50/90 via-white to-orange-50/30 dark:from-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
          btn: 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-amber-glow',
          glow: 'bg-nature-amber-500/15',
          iconColor: 'text-nature-amber-600 dark:text-salud-amber'
        };
      case 'A':
        return {
          icon: Wine,
          border: 'border-purple-200 dark:border-purple-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-purple-50/80 via-white to-rose-50/40 dark:from-purple-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
          btn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-md',
          glow: 'bg-purple-500/15',
          iconColor: 'text-purple-600 dark:text-purple-400'
        };
      case 'E':
        return {
          icon: Zap,
          border: 'border-amber-200 dark:border-amber-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-amber-50/80 via-white to-yellow-50/30 dark:from-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
          btn: 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md',
          glow: 'bg-amber-500/15',
          iconColor: 'text-amber-600 dark:text-amber-400'
        };
      case 'P':
        return {
          icon: Dumbbell,
          border: 'border-blue-200 dark:border-blue-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/30 dark:from-blue-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
          btn: 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md',
          glow: 'bg-blue-500/15',
          iconColor: 'text-blue-600 dark:text-blue-400'
        };
      case 'C':
        return {
          icon: Wheat,
          border: 'border-teal-200 dark:border-teal-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/30 dark:from-teal-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800/60',
          btn: 'bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md',
          glow: 'bg-teal-500/15',
          iconColor: 'text-teal-600 dark:text-teal-400'
        };
      case 'S':
        return {
          icon: Candy,
          border: 'border-rose-200 dark:border-rose-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-rose-50/80 via-white to-pink-50/30 dark:from-rose-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
          btn: 'bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md',
          glow: 'bg-rose-500/15',
          iconColor: 'text-rose-600 dark:text-rose-400'
        };
      case 'N':
        return {
          icon: HeartPulse,
          border: 'border-red-200 dark:border-red-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-red-50/80 via-white to-orange-50/30 dark:from-red-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/60',
          btn: 'bg-red-600 hover:bg-red-700 text-white font-bold shadow-md',
          glow: 'bg-red-500/15',
          iconColor: 'text-red-600 dark:text-red-400'
        };
      case 'M':
        return {
          icon: Pill,
          border: 'border-violet-200 dark:border-violet-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-violet-50/80 via-white to-purple-50/30 dark:from-violet-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-800/60',
          btn: 'bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-md',
          glow: 'bg-violet-500/15',
          iconColor: 'text-violet-600 dark:text-violet-400'
        };
      case 'D':
        return {
          icon: Salad,
          border: 'border-emerald-200 dark:border-emerald-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-emerald-50/80 via-white to-green-50/30 dark:from-emerald-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
          btn: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md',
          glow: 'bg-emerald-500/15',
          iconColor: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'F':
        return {
          icon: FileText,
          border: 'border-cyan-200 dark:border-cyan-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-cyan-50/80 via-white to-blue-50/30 dark:from-cyan-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60',
          btn: 'bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-md',
          glow: 'bg-cyan-500/15',
          iconColor: 'text-cyan-600 dark:text-cyan-400'
        };
      default:
        return {
          icon: BookOpen,
          border: 'border-slate-200 dark:border-slate-800/60 shadow-sm',
          gradient: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950/40 dark:via-salud-dark-card/60 dark:to-slate-950',
          badge: 'bg-slate-100 dark:bg-slate-950/60 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800/60',
          btn: 'bg-slate-700 hover:bg-slate-600 text-white font-bold shadow-md',
          glow: 'bg-slate-500/15',
          iconColor: 'text-slate-600 dark:text-slate-400'
        };
    }
  };

  const theme = getChapterTheme(chapter.id);
  const ChapterIcon = theme.icon;

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Chapter Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-colors ${theme.border} ${theme.gradient}`}>
        {/* Ambient Glow */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${theme.glow}`} />

        <div className="relative space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full font-mono text-xs font-bold border ${theme.badge}`}>
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
            <ChapterIcon className={`w-8 h-8 ${theme.iconColor}`} />
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

          {pages.length > 0 ? (
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartReading(pages[0]?.id || '')}
                className={`btn-tactile px-6 py-3 rounded-2xl font-bold font-mono text-xs flex items-center gap-2 transition-all ${theme.btn}`}
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
          ) : (
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-2 rounded-xl bg-nature-amber-100 dark:bg-nature-amber-950/60 text-nature-amber-800 dark:text-nature-amber-300 border border-nature-amber-200 dark:border-nature-amber-800/60 font-mono text-xs font-bold">
                ⏳ 課綱審定完成 · 原子化 KP 排版中
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Knowledge Path Graph or Syllabus Section ── */}
      {pages.length > 0 ? (
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
      ) : (
        <section className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Chapter {chapter.id} 醫學標準課綱藍圖</span>
            </h3>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">實證審定完成</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            本專章隸屬 Salud 醫學標準課綱，全章規劃包含 <strong>{chapter.page_count} 篇知識頁</strong>、<strong>{chapter.kp_count} 個原子化生化知識點</strong> 與 <strong>{chapter.figure_count} 張臨床實證圖解</strong>，遵循 Oxford CEBM Level 1a 實證醫學等級建構。
          </p>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center gap-3">
            <span className="text-xl">🧬</span>
            <div className="text-xs space-y-0.5">
              <strong className="text-emerald-900 dark:text-emerald-200 block font-bold">原子化生化知識點排版中</strong>
              <span className="text-slate-600 dark:text-slate-400">課綱體系架構與安全閘已完成驗證，知識頁內容將陸續上架發布。</span>
            </div>
          </div>
        </section>
      )}

      {/* ── 醫學知識庫 (Medical Knowledge Base) ── */}
      <section className="space-y-4">
        <MedicalKnowledgeBase
          pages={pages}
          chapterId={chapter.id}
          onSelectPage={onSelectPage}
        />
      </section>

      {/* ── 14-Day Behavior Experiment ── */}
      {chapter.id === 'W' && (
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
      )}
    </div>
  );
};
