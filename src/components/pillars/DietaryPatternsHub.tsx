import React, { useState, useEffect } from 'react';
import { SimDietPatterns } from '../simulators/SimDietPatterns';
import { DietaryNutrientsView } from './DietaryNutrientsView';
import { SimSupplementChecker } from '../simulators/SimSupplementChecker';
import { CHAPTERS as chapters } from '../../data/chapters';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { PillarHubTemplate } from '../common/PillarHubTemplate';
import { HubTabBar, type HubTabGroup } from '../common/HubTabBar';
import { HUB_PRIMERS } from '../../data/hubPrimers';
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
  Sliders,
} from 'lucide-react';

interface Props {
  onSelectChapter: (chapterId: string) => void;
}

export type DietSubTab = 'nutrients' | 'simulator' | 'supplements' | 'chapters';

const DIET_TAB_GROUPS: HubTabGroup<DietSubTab>[] = [
  {
    label: '日常飲食',
    tabs: [
      { id: 'nutrients', label: '六大營養素與飲食重點', icon: Wheat, featured: true },
      { id: 'simulator', label: '常見飲食法比較（地中海/DASH）', icon: Sliders },
    ],
  },
  {
    label: '延伸與專章',
    tabs: [
      { id: 'supplements', label: '保健食品與藥物交互作用', icon: Pill },
      { id: 'chapters', label: '水（W）、油（O）、酒（A）專章', icon: BookOpen },
    ],
  },
];

export const DietaryPatternsHub: React.FC<Props> = ({ onSelectChapter }) => {
  const { language } = useLanguage();
  const nav = useNavigation();
  const [activeSubTab, setActiveSubTab] = useState<DietSubTab>(() =>
    window.location.hash.startsWith('#diet/patterns') ? 'simulator' : 'nutrients'
  );
  const [showAllChapters, setShowAllChapters] = useState(false);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash.startsWith('#diet/patterns')) {
        setActiveSubTab('simulator');
      } else if (window.location.hash === '#diet') {
        setActiveSubTab('nutrients');
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleSelectTab = (tab: DietSubTab) => {
    setActiveSubTab(tab);
    if (tab === 'simulator') {
      window.history.replaceState(null, '', '#diet/patterns');
    } else if (window.location.hash.startsWith('#diet/')) {
      window.history.replaceState(null, '', '#diet');
    }
  };

  const chapterW = chapters.find((c) => c.id === 'W');
  const chapterO = chapters.find((c) => c.id === 'O');
  const chapterA = chapters.find((c) => c.id === 'A');

  return (
    <PillarHubTemplate
      primer={HUB_PRIMERS.diet}
      compact={activeSubTab !== 'nutrients'}
      overviewSection={
        <div className="space-y-4">
          <HubTabBar
            groups={DIET_TAB_GROUPS}
            active={activeSubTab}
            onChange={handleSelectTab}
            ariaLabel="飲食營養專區分頁"
          />

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
                  <span>台灣食藥署 (TFDA) 食品與藥品四層分級：看懂包裝標示</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[0.75rem] block">Level 1</span>
                    <strong className="text-slate-800 dark:text-slate-300">一般食品</strong>
                    <span className="text-[0.75rem] text-slate-500 block">不得宣稱療效或特定保健功效</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[0.75rem] block">Level 2</span>
                    <strong className="text-nature-sky-700 dark:text-nature-sky-400 font-bold">膳食營養補充劑</strong>
                    <span className="text-[0.75rem] text-slate-500 block">補充日常飲食不足的維生素或礦物質</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[0.75rem] block">Level 3</span>
                    <strong className="text-nature-green-700 dark:text-nature-green-400 font-bold">健康食品 (小綠人標章)</strong>
                    <span className="text-[0.75rem] text-slate-500 block">經審核具特定保健功效，但不能取代藥物</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-sm">
                    <span className="text-slate-400 text-[0.75rem] block">Level 4</span>
                    <strong className="text-purple-700 dark:text-purple-400 font-bold">指示/處方藥品</strong>
                    <span className="text-[0.75rem] text-slate-500 block">具臨床試驗驗證之疾病治療效果</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  提醒：任何宣稱可「治癒疾病、替代降血壓或降膽固醇處方藥」的市售保健食品皆屬違規誇大宣稱；正在服用慢性病藥物者，請善用下方交互作用檢查器並先諮詢醫師或藥師。
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
                    三大日常飲食專章：喝水（W）、選油（O）、飲酒風險（A）
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    點擊進入各專章閱讀完整主題頁與互動計算工具
                  </p>
                </div>
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
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 font-sans leading-relaxed">
                        {chapterW.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs text-nature-sky-700 dark:text-nature-sky-400 font-medium">
                      <span>{chapterW.page_count} 篇主題</span>
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
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 font-sans leading-relaxed">
                        {chapterO.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs text-nature-amber-700 dark:text-nature-amber-400 font-medium">
                      <span>{chapterO.page_count} 篇主題</span>
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
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 pt-1 font-sans leading-relaxed">
                        {chapterA.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs text-purple-700 dark:text-purple-400 font-medium">
                      <span>{chapterA.page_count} 篇主題</span>
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
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>11 章飲食營養主題地圖</span>
                </h4>
                <p className="text-xs text-slate-500 pt-0.5">
                  涵蓋水分、食用油、飲酒風險，以及能量平衡、蛋白質、膳食纖維、微量營養素與台灣外食指南
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllChapters(!showAllChapters)}
                className="btn-tactile px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 shrink-0"
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
                      <div className="flex items-center justify-between font-mono text-[0.75rem] mb-1">
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
                          {isPublished ? '已發布' : isDev ? '擴充中' : '課綱預覽'}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {language === 'zh-TW' ? ch.title_zh : ch.title_en}
                      </h5>
                      <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight pt-1 font-sans">
                        {ch.summary}
                      </p>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between font-mono text-[0.75rem] text-slate-400">
                        <span>{ch.page_count} 篇主題</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">查看章節 →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cross-Pillar Synergy Invitation Banner */}
          <div className="p-5 sm:p-6 rounded-3xl border border-emerald-200/80 dark:border-slate-800 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/30 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1 max-w-xl">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                跨領域整合
              </span>
              <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                想看飲食如何搭配運動、睡眠與壓力管理一起發揮作用？
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                整理改善代謝症候群、預防肌少症、保護血管與提升睡眠品質的四大生活整合方案。
              </p>
            </div>
            <button
              type="button"
              onClick={() => nav.openSynergy()}
              className="btn-tactile px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-emerald-800 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>查看跨領域整合方案</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      }
    />
  );
};
