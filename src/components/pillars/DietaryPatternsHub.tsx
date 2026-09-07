import React, { useState } from 'react';
import { SimDietPatterns } from '../simulators/SimDietPatterns';
import { DietaryNutrientsView } from './DietaryNutrientsView';
import { SimSupplementChecker } from '../simulators/SimSupplementChecker';
import { Chapter } from '../../types';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { PillarHubTemplate } from '../common/PillarHubTemplate';
import {
  Wheat,
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
  Pill,
  Sliders
} from 'lucide-react';

interface Props {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
}

export const DietaryPatternsHub: React.FC<Props> = ({ chapters, onSelectChapter }) => {
  const { language } = useLanguage();
  const nav = useNavigation();
  const [activeSubTab, setActiveSubTab] = useState<'nutrients' | 'supplements' | 'simulator' | 'chapters'>('nutrients');
  const [showAllChapters, setShowAllChapters] = useState(false);

  const chapterW = chapters.find((c) => c.id === 'W');
  const chapterO = chapters.find((c) => c.id === 'O');
  const chapterA = chapters.find((c) => c.id === 'A');

  return (
    <PillarHubTemplate
      pillarTag="Health Pillar 01 · 飲食與全營養保健總樞紐"
      title={language === 'zh-TW' ? '飲食模式、核心營養素與生化代謝' : 'Dietary Patterns, Core Nutrients & Metabolism'}
      description="人體能量與結構物質的根本來源。本支柱涵蓋「各式飲食核心重點（碳水、纖維、蛋白質、維生素、微量元素、脂肪、水、營養保健，酒精排後）」、「營養保健品 GRADE A-E 實證防火牆」、「五大主流飲食法深度生化機制對照」與核心旗艦專章。"
      gradientClass="border-nature-amber-200/90 dark:border-nature-amber-800/40 bg-gradient-to-br from-nature-amber-100/70 via-white to-nature-green-50/50 dark:from-nature-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950"
      tagClass="border-nature-amber-300/80 bg-nature-amber-100/80 text-nature-amber-800 dark:border-nature-amber-700/60 dark:bg-nature-amber-950/60 dark:text-nature-amber-300"
      overviewSection={
        <div className="space-y-4">
          {/* Sub-Tab Switcher Bar */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveSubTab('nutrients')}
              className={`btn-tactile px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSubTab === 'nutrients'
                  ? 'bg-nature-amber-500 text-black font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Wheat className="w-3.5 h-3.5" />
              <span>各式飲食重點 (碳水/纖維/蛋白/維生素/礦物質)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('supplements')}
              className={`btn-tactile px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSubTab === 'supplements'
                  ? 'bg-nature-green-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-nature-green-600 dark:hover:text-emerald-300'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>營養保健專區 (GRADE 實證 & 交互作用檢查)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('simulator')}
              className={`btn-tactile px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSubTab === 'simulator'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>五大飲食法生化模擬器</span>
            </button>

            <button
              onClick={() => setActiveSubTab('chapters')}
              className={`btn-tactile px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeSubTab === 'chapters'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>三大核心專章 (水 W、油 O、酒 A)</span>
            </button>
          </div>

          {/* Sub-Tab 1: Dietary Nutrients (Carbs, Fiber, Protein, Vitamins, Minerals, etc.) */}
          {activeSubTab === 'nutrients' && (
            <div className="pt-2 animate-fade-in">
              <DietaryNutrientsView />
            </div>
          )}

          {/* Sub-Tab 2: Nutrition & Supplements Hub (Integrated) */}
          {activeSubTab === 'supplements' && (
            <div className="space-y-6 pt-2 animate-fade-in">
              {/* TFDA Firewall Overview */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-nature-green-700 dark:text-nature-green-400 font-display">
                  <ShieldCheck className="w-5 h-5 text-nature-green-600 dark:text-nature-green-400" />
                  <span>台灣衛生福利部食品藥物管理署 (TFDA) 四層法規防火牆指南</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[10px] block">Level 1</span>
                    <strong className="text-slate-800 dark:text-slate-300">一般食品</strong>
                    <span className="text-[10px] text-slate-500 block">嚴禁任何療效或生理調節宣稱</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[10px] block">Level 2</span>
                    <strong className="text-nature-sky-700 dark:text-nature-sky-400 font-bold">膳食營養補充劑</strong>
                    <span className="text-[10px] text-slate-500 block">補充日常飲食微量營養素不足</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[10px] block">Level 3</span>
                    <strong className="text-nature-green-700 dark:text-nature-green-400 font-bold">健康食品 (小綠人標章)</strong>
                    <span className="text-[10px] text-slate-500 block">具許可證特定保健功效審核</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[10px] block">Level 4</span>
                    <strong className="text-purple-700 dark:text-purple-400 font-bold">指示/處方藥品</strong>
                    <span className="text-[10px] text-slate-500 block">具明確治療疾病之大規模臨床驗證</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-mono pt-1">
                  ※ 法律紅線提醒：任何宣稱可「治療、治癒、速效解毒、替代降血壓/降血脂處方藥物」之市售保健食品，皆屬重大違規違法廣告。所有此類宣稱一律列為 E 級無效且高風險。
                </p>
              </div>

              {/* Interactive Supplement & Drug Checker */}
              <div className="pt-2">
                <SimSupplementChecker />
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Simulator */}
          {activeSubTab === 'simulator' && (
            <div className="pt-2 animate-fade-in">
              <SimDietPatterns />
            </div>
          )}

          {/* Sub-Tab 4: Core Deep Chapters */}
          {activeSubTab === 'chapters' && (
            <div className="space-y-4 pt-2 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-nature-amber-600 dark:text-salud-amber" />
                    三大物質深研專章 (水分 W、油脂 O、酒精 A)
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    點擊進入專屬專章閱讀原子化知識頁與臨床模擬器（酒精排在最後）
                  </p>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full font-mono text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  185+ KPs 已上線
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Chapter W (Hydration) */}
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
                        進入水專章 →
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Chapter O (Fats & Oils) */}
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
                        進入油專章 →
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. Chapter A (Alcohol - strictly ordered last) */}
                {chapterA && (
                  <div
                    onClick={() => onSelectChapter('A')}
                    className="btn-tactile p-5 rounded-2xl border border-purple-200 dark:border-purple-800/60 bg-white dark:bg-slate-900/80 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer transition-all shadow-sm hover:shadow-md space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Wine className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400">Chapter A (酒精)</span>
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
                        進入酒專章 →
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      }
      submodulesSection={
        <div className="space-y-6">
          {/* ── 11-Chapter Full Curriculum Roadmap Matrix ── */}
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

          {/* Cross-Pillar Synergy Invitation Banner */}
          <div className="p-5 sm:p-6 rounded-3xl border border-salud-cyan/50 bg-gradient-to-br from-salud-cyan/15 via-white to-nature-green-50/40 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 max-w-xl">
              <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-salud-cyan/20 text-salud-cyan-800 dark:text-salud-cyan-300 border border-salud-cyan/40">
                Holistic Lifestyle Synergy
              </span>
              <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                想了解飲食如何與「運動、睡眠、人體系統」產生多靶點協同效應？
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
