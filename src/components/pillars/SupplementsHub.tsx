import React, { useEffect, useState } from 'react';
import { SimSupplementChecker } from '../simulators/SimSupplementChecker';
import { PillarHubTemplate } from '../common/PillarHubTemplate';
import { HUB_PRIMERS } from '../../data/hubPrimers';
import { SUPPLEMENT_PILLAR_GUIDES, DEEP_SUPPLEMENTS } from '../../data/supplementsDeepData';
import { hashSegment } from '../../config/routes';
import {
  ShieldCheck,
  Dumbbell,
  Zap,
  Sun,
  Leaf,
  ArrowDown,
  FlaskConical,
  Salad,
  TestTube2,
  ArrowRight,
} from 'lucide-react';

const PILLAR_ICONS: Record<string, React.ElementType> = {
  AMINO_PROTEIN: Dumbbell,
  PERFORMANCE_ENERGY: Zap,
  VITAMINS_MINERALS: Sun,
  FIBER_PREBIOTICS: Leaf,
};

const PILLAR_STYLES: Record<string, string> = {
  emerald: 'border-emerald-200/90 dark:border-emerald-800/60 bg-emerald-50/45 dark:bg-emerald-950/20 hover:border-emerald-500',
  sky: 'border-sky-200/90 dark:border-sky-800/60 bg-sky-50/45 dark:bg-sky-950/20 hover:border-sky-500',
  amber: 'border-amber-200/90 dark:border-amber-800/60 bg-amber-50/45 dark:bg-amber-950/20 hover:border-amber-500',
  teal: 'border-teal-200/90 dark:border-teal-800/60 bg-teal-50/45 dark:bg-teal-950/20 hover:border-teal-500',
};

const ICON_BADGE_STYLES: Record<string, string> = {
  emerald: 'bg-emerald-700 text-white dark:bg-emerald-400 dark:text-emerald-950',
  sky: 'bg-sky-700 text-white dark:bg-sky-400 dark:text-sky-950',
  amber: 'bg-amber-600 text-white dark:bg-amber-400 dark:text-amber-950',
  teal: 'bg-teal-700 text-white dark:bg-teal-400 dark:text-teal-950',
};

export const SupplementsHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => hashSegment('supplements') ?? 'ALL');

  useEffect(() => {
    const onHash = () => {
      const seg = hashSegment('supplements');
      if (seg) setSelectedCategory(seg);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const jumpToCategory = (category: string) => {
    setSelectedCategory(category);
    if (window.location.hash.startsWith('#supplements')) {
      window.history.replaceState(null, '', category === 'ALL' ? '#supplements' : `#supplements/${category}`);
    }
    requestAnimationFrame(() => {
      document.getElementById('supplement-matrix')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <PillarHubTemplate
      primer={HUB_PRIMERS.supplements}
      overviewSection={
        <div className="space-y-5">
          {/* 4 Flagship Evidence-Backed Supplement Pillars */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  <span>四大實證核心補給支柱：點選直接篩選研究詳情</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  聚焦人體隨機對照試驗 (RCT) 與國際醫學立場聲明反覆驗證有效的關鍵營養補給，並誠實標註使用邊界。
                </p>
              </div>
              <a
                href="#diet"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline"
              >
                <span>先回健康飲食與餐盤基礎</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {SUPPLEMENT_PILLAR_GUIDES.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.category] ?? FlaskConical;
                const count = DEEP_SUPPLEMENTS.filter((item) => item.category === pillar.category).length;
                const active = selectedCategory === pillar.category;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => jumpToCategory(pillar.category)}
                    className={`btn-tactile text-left p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      PILLAR_STYLES[pillar.tone]
                    } ${active ? 'ring-2 ring-emerald-600 dark:ring-emerald-400 shadow-md' : 'shadow-2xs hover:shadow-md'}`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0 ${ICON_BADGE_STYLES[pillar.tone]}`} aria-hidden="true">
                            <Icon className="w-5 h-5" />
                          </span>
                          <div>
                            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">
                              {pillar.title_zh}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-300">{pillar.subtitle_zh}</p>
                          </div>
                        </div>
                        <span className="shrink-0 font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                          {count} 項
                        </span>
                      </div>

                      <p className="text-xs sm:text-[0.82rem] leading-relaxed text-slate-700 dark:text-slate-200">
                        {pillar.evidence_headline_zh}
                      </p>

                      <p className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200 bg-white/75 dark:bg-slate-900/60 px-3 py-2 rounded-xl border border-emerald-200/60 dark:border-emerald-900/50">
                        <strong>原型食物優先：</strong>
                        {pillar.food_first_rule_zh}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex flex-wrap gap-1.5">
                        {pillar.key_compounds_zh.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[0.7rem] font-semibold bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <span>看實證清單</span>
                        <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Scientific Decision Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200">
                <Salad className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                <span>1. 原型食物永遠優先</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                補給品是用來填補飲食吃不夠（如每日 1.6 g/kg 蛋白、25–35 g 纖維）或難以從食物達標（如一水肌酸 5 g）的精準工具，不能取代均衡三餐。
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200">
                <TestTube2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                <span>2. 先驗再補、避免超標</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                維他命 D、B12、鐵蛋白 (Ferritin) 等成分在缺乏時效果極佳，不缺卻盲目高劑量補充反可能增加腎結石、鐵過載或肝腎負擔。
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                <span>3. 檢查型態與用藥交互</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                同成分不同型態吸收天差地遠（例如甘胺酸鎂 vs 氧化鎂、rTG 魚油 vs 低濃度魚油），有服慢性病藥物務必先做下方交互比對。
              </p>
            </div>
          </div>

          {/* TFDA Firewall */}
          <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300 font-display">
              <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span>台灣食藥署 (TFDA) 食品與藥品四層分級：看懂包裝標示</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-slate-500 font-mono text-[0.72rem] block">Level 1</span>
                <strong className="text-slate-900 dark:text-slate-200">一般食品</strong>
                <span className="text-[0.72rem] text-slate-600 dark:text-slate-400 block">不得宣稱療效或特定保健功效</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-slate-500 font-mono text-[0.72rem] block">Level 2</span>
                <strong className="text-sky-800 dark:text-sky-300">膳食營養補充劑</strong>
                <span className="text-[0.72rem] text-slate-600 dark:text-slate-400 block">補充日常飲食之蛋白、維生素或纖維缺口</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-slate-500 font-mono text-[0.72rem] block">Level 3</span>
                <strong className="text-emerald-800 dark:text-emerald-300">健康食品 (小綠人)</strong>
                <span className="text-[0.72rem] text-slate-600 dark:text-slate-400 block">經審核具特定保健功效，不可替代藥物</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5 shadow-2xs">
                <span className="text-slate-500 font-mono text-[0.72rem] block">Level 4</span>
                <strong className="text-violet-800 dark:text-violet-300">指示／處方藥品</strong>
                <span className="text-[0.72rem] text-slate-600 dark:text-slate-400 block">具臨床試驗驗證之疾病治療效果</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
              法律與安全提醒：凡宣稱可「治癒疾病、速效解酒、替代降血壓／降血糖／降膽固醇處方藥」的市售產品皆屬違法誇大宣稱；慢性腎臟病、懷孕哺乳或規律服藥者，使用任何補給品前請與醫師或藥師確認。
            </p>
          </div>
        </div>
      }
      simulatorSection={
        <SimSupplementChecker
          initialCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            if (window.location.hash.startsWith('#supplements')) {
              window.history.replaceState(null, '', cat === 'ALL' ? '#supplements' : `#supplements/${cat}`);
            }
          }}
        />
      }
    />
  );
};
