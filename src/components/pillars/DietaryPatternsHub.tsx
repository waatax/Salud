import React, { useState } from 'react';
import { SimDietPatterns } from '../simulators/SimDietPatterns';
import { Chapter } from '../../types';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { PillarHubTemplate } from '../common/PillarHubTemplate';
import {
  Droplets,
  Flame,
  Wine,
  BookOpen,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
}

export const DietaryPatternsHub: React.FC<Props> = ({ chapters, onSelectChapter }) => {
  const { language } = useLanguage();
  const nav = useNavigation();
  const [showAllChapters, setShowAllChapters] = useState(false);

  const chapterW = chapters.find((c) => c.id === 'W');
  const chapterO = chapters.find((c) => c.id === 'O');
  const chapterA = chapters.find((c) => c.id === 'A');

  return (
    <PillarHubTemplate
      pillarTag="Health Pillar 01 · 飲食與營養總樞紐"
      title={language === 'zh-TW' ? '飲食模式與三大物質代謝' : 'Dietary Patterns & Substrate Metabolism'}
      description="人體能量與結構物質的根本來源。本支柱整合「五大主流飲食法深度生化機制對照」，並完整收整人體最關鍵的三大液態與脂質物質專章：水分（Chapter W）、食用油（Chapter O）與酒精（Chapter A），貫穿 11 大營養生化課綱。"
      gradientClass="border-nature-amber-200/90 dark:border-nature-amber-800/40 bg-gradient-to-br from-nature-amber-100/70 via-white to-nature-green-50/50 dark:from-nature-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950"
      tagClass="border-nature-amber-300/80 bg-nature-amber-100/80 text-nature-amber-800 dark:border-nature-amber-700/60 dark:bg-nature-amber-950/60 dark:text-nature-amber-300"
      simulatorSection={<SimDietPatterns />}
      submodulesSection={
        <div className="space-y-6">
          {/* ── Sub-module 2: Core Deep Chapters (Water W, Oil O, Alcohol A) ── */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-nature-amber-600 dark:text-salud-amber" />
                  飲食頂層領域核心專章 (Phase 1 旗艦專章)
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  點擊任一專章進入完整原子化 KP 知識庫與臨床專屬生化模擬器
                </p>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full font-mono text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                185+ KPs 已上線
              </span>
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
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
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
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
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
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                      進入專章 →
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Sub-module 3: 11-Chapter Full Curriculum Roadmap Matrix ── */}
          <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-salud-cyan" />
                  <span>11 大生化營養核心專章課綱全貌 (11-Chapter Curriculum Matrix)</span>
                </h4>
                <p className="text-xs font-mono text-slate-500 pt-0.5">
                  Salud 醫學標準課綱：包含能量平衡、蛋白質肌少症、抗性澱粉、鈉鉀血壓調節與夜市手搖標示
                </p>
              </div>
              <button
                onClick={() => setShowAllChapters(!showAllChapters)}
                className="btn-tactile px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono flex items-center gap-1.5 shrink-0"
              >
                <span>{showAllChapters ? '收合清單' : '展開全 11 章'}</span>
                {showAllChapters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showAllChapters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 animate-fade-in">
                {chapters.map((ch) => {
                  const isPublished = ch.status === 'PUBLISHED';
                  const isDev = ch.status === 'DEVELOPMENT';
                  return (
                    <div
                      key={ch.id}
                      onClick={() => onSelectChapter(ch.id)}
                      className={`btn-tactile p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isPublished
                          ? 'border-emerald-200 dark:border-emerald-800/50 bg-white dark:bg-slate-900 hover:border-emerald-400'
                          : isDev
                          ? 'border-nature-amber-200 dark:border-nature-amber-800/40 bg-white/70 dark:bg-slate-900/60 hover:border-nature-amber-400'
                          : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                        <span className="font-bold text-slate-700 dark:text-slate-300">Chapter {ch.id}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded font-bold border ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : isDev
                              ? 'bg-nature-amber-50 text-nature-amber-700 dark:bg-nature-amber-950/60 dark:text-nature-amber-300 border-nature-amber-200 dark:border-nature-amber-800'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {isPublished ? '已發布' : isDev ? '研發中' : '規劃中'}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {language === 'zh-TW' ? ch.title_zh : ch.title_en}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight pt-1 font-sans">
                        {ch.summary}
                      </p>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between font-mono text-[10px] text-slate-400">
                        <span>預估 {ch.page_count} 頁 · {ch.kp_count} KPs</span>
                        <span className="text-salud-cyan font-bold">查看課綱 →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Sub-module 4: Cross-Pillar Synergy Invitation Banner ── */}
          <div className="p-5 sm:p-6 rounded-3xl border border-salud-cyan/50 bg-gradient-to-br from-salud-cyan/15 via-white to-nature-green-50/40 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 max-w-xl">
              <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-salud-cyan/20 text-salud-cyan-800 dark:text-salud-cyan-300 border border-salud-cyan/40">
                Holistic Lifestyle Synergy
              </span>
              <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                想了解飲食如何與「運動、睡眠、保健品」產生多靶點協同效應？
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                涵蓋代謝症候群逆轉、抗肌少症、心血管動脈硬化阻斷與大腦神經排毒 4 大整合處方矩陣。
              </p>
            </div>
            <button
              onClick={() => nav.openSynergy()}
              className="btn-tactile px-5 py-2.5 rounded-2xl bg-salud-cyan text-black font-bold font-mono text-xs flex items-center gap-1.5 shadow-cyan-glow hover:bg-salud-cyan/90 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>啟動全人協同引擎</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      }
    />
  );
};
