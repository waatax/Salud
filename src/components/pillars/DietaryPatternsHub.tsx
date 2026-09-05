import React from 'react';
import { SimDietPatterns } from '../simulators/SimDietPatterns';
import { Chapter } from '../../types';
import { useLanguage } from '../../i18n';
import { Utensils, Droplets, Flame, Wine, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
}

export const DietaryPatternsHub: React.FC<Props> = ({ chapters, onSelectChapter }) => {
  const { t, language } = useLanguage();

  const chapterW = chapters.find((c) => c.id === 'W');
  const chapterO = chapters.find((c) => c.id === 'O');
  const chapterA = chapters.find((c) => c.id === 'A');

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-nature-amber-200/90 dark:border-nature-amber-800/40 bg-gradient-to-br from-nature-amber-100/70 via-white to-nature-green-50/50 dark:from-nature-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 relative overflow-hidden shadow-sm transition-colors">
        <div className="relative space-y-3 max-w-2xl">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-nature-amber-300/80 bg-nature-amber-100/80 text-nature-amber-800 dark:border-nature-amber-700/60 dark:bg-nature-amber-950/60 dark:text-nature-amber-300">
            Health Pillar 01 · 飲食與營養總樞紐
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-salud-dark-text tracking-tight">
            {language === 'zh-TW' ? '飲食模式與三大物質代謝' : 'Dietary Patterns & Substrate Metabolism'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            人體能量與結構物質的根本來源。本支柱整合「五大主流飲食法深度生化機制對照」，並完整收整人體最關鍵的三大液態與脂質物質專章：水分（Chapter W）、食用油（Chapter O）與酒精（Chapter A）。
          </p>
        </div>
      </div>

      {/* ── Sub-module 1: 5 Major Dietary Patterns Interactive Simulator ── */}
      <section className="space-y-3">
        <SimDietPatterns />
      </section>

      {/* ── Sub-module 2: Core Deep Chapters (Water W, Oil O, Alcohol A) ── */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-nature-amber-600 dark:text-salud-amber" />
            飲食頂層領域核心專章 (Core Dietary Chapters)
          </h3>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            點擊任一專章進入完整原子化 KP 知識庫與臨床專屬模擬器
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Chapter W */}
          {chapterW && (
            <div
              onClick={() => onSelectChapter('W')}
              className="btn-tactile p-5 rounded-2xl border border-nature-sky-200 dark:border-nature-sky-800/60 bg-white dark:bg-slate-900/80 hover:border-nature-sky-400 dark:hover:border-nature-sky-500 cursor-pointer transition-all shadow-sm hover:shadow-md space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-nature-sky-100 dark:bg-nature-sky-950/60 border border-nature-sky-200 dark:border-nature-sky-800/50 flex items-center justify-center text-nature-sky-600 dark:text-nature-sky-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-nature-sky-700 dark:text-nature-sky-400">Chapter W</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-nature-sky-700 dark:group-hover:text-nature-sky-300 transition-colors">
                  {language === 'zh-TW' ? chapterW.title_zh : chapterW.title_en}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 font-sans leading-relaxed">
                  {chapterW.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-[11px] text-nature-sky-700 dark:text-nature-sky-400 font-medium">
                <span>{chapterW.page_count} 頁 · {chapterW.kp_count} KPs</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  進入專章 →
                </span>
              </div>
            </div>
          )}

          {/* Chapter O */}
          {chapterO && (
            <div
              onClick={() => onSelectChapter('O')}
              className="btn-tactile p-5 rounded-2xl border border-nature-amber-200 dark:border-nature-amber-800/60 bg-white dark:bg-slate-900/80 hover:border-nature-amber-400 dark:hover:border-nature-amber-500 cursor-pointer transition-all shadow-sm hover:shadow-md space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-nature-amber-100 dark:bg-nature-amber-950/60 border border-nature-amber-200 dark:border-nature-amber-800/50 flex items-center justify-center text-nature-amber-600 dark:text-nature-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-nature-amber-700 dark:text-nature-amber-400">Chapter O</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-nature-amber-700 dark:group-hover:text-nature-amber-300 transition-colors">
                  {language === 'zh-TW' ? chapterO.title_zh : chapterO.title_en}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 font-sans leading-relaxed">
                  {chapterO.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-[11px] text-nature-amber-700 dark:text-nature-amber-400 font-medium">
                <span>{chapterO.page_count} 頁 · {chapterO.kp_count} KPs</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  進入專章 →
                </span>
              </div>
            </div>
          )}

          {/* Chapter A */}
          {chapterA && (
            <div
              onClick={() => onSelectChapter('A')}
              className="btn-tactile p-5 rounded-2xl border border-purple-200 dark:border-purple-800/60 bg-white dark:bg-slate-900/80 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer transition-all shadow-sm hover:shadow-md space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Wine className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400">Chapter A</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {language === 'zh-TW' ? chapterA.title_zh : chapterA.title_en}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 font-sans leading-relaxed">
                  {chapterA.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-[11px] text-purple-700 dark:text-purple-400 font-medium">
                <span>{chapterA.page_count} 頁 · {chapterA.kp_count} KPs</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  進入專章 →
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
