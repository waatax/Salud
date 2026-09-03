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
      <div className="p-6 sm:p-8 rounded-3xl border border-salud-amber/40 bg-gradient-to-br from-amber-100/70 via-salud-light-card/80 to-slate-100 dark:from-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 relative overflow-hidden">
        <div className="relative space-y-3 max-w-2xl">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-salud-amber/40 bg-salud-amber/20 text-salud-amber-700 dark:text-salud-amber-300">
            Health Pillar 01 · 飲食與營養總樞紐
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight">
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
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-salud-amber" />
            飲食頂層領域核心專章 (Core Dietary Chapters)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            點擊任一專章進入完整原子化 KP 知識庫與臨床專屬模擬器
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Chapter W */}
          {chapterW && (
            <div
              onClick={() => onSelectChapter('W')}
              className="p-5 rounded-2xl border border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400 cursor-pointer transition-all hover:scale-102 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400">Chapter W</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                  {language === 'zh-TW' ? chapterW.title_zh : chapterW.title_en}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 pt-1">
                  {chapterW.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-cyan-900/60 font-mono text-[11px] text-cyan-300">
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
              className="p-5 rounded-2xl border border-amber-500/40 bg-amber-950/20 hover:border-amber-400 cursor-pointer transition-all hover:scale-102 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-amber-400">Chapter O</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                  {language === 'zh-TW' ? chapterO.title_zh : chapterO.title_en}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 pt-1">
                  {chapterO.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-amber-900/60 font-mono text-[11px] text-amber-300">
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
              className="p-5 rounded-2xl border border-purple-500/40 bg-purple-950/20 hover:border-purple-400 cursor-pointer transition-all hover:scale-102 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Wine className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-purple-400">Chapter A</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                  {language === 'zh-TW' ? chapterA.title_zh : chapterA.title_en}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 pt-1">
                  {chapterA.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-purple-900/60 font-mono text-[11px] text-purple-300">
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
