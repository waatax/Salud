import React from 'react';
import { STRENGTH_TOPICS } from '../../../../data/strengthData';
import { SimStrength1RM } from '../../../simulators/SimStrength1RM';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { StrengthInfographics } from '../../../sports/StrengthInfographics';
import { MonsterStrengthEnduranceSection } from './MonsterStrengthEnduranceSection';
import { Dumbbell, Flame, Calculator, BookOpen, BarChart3 } from 'lucide-react';

/**
 * StrengthPanel — Strength Training & Muscular Endurance Science discipline
 *
 * Covers Maximum Strength vs Muscular Endurance (Monster Training / Dr. Ho Li-An framework),
 * 1RM & Volume Simulator, 9 Core Topics, and 4 Pedagogical Infographics.
 */
export const StrengthPanel: React.FC = () => {
  const getDetailSections = (topic: typeof STRENGTH_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.mechanisms_zh,
      items_en: topic.mechanisms_en,
      label_zh: '生理與神經機轉 (Physiological & Neural Mechanisms)：',
      label_en: 'Physiological & Neural Mechanisms:',
      accentBg: 'bg-nature-green-50/90 dark:bg-nature-green-950/30',
      accentBorder: 'border-nature-green-200 dark:border-nature-green-800/60',
      accentText: 'text-nature-green-800 dark:text-nature-green-300',
      bulletColor: 'text-nature-green-600 dark:text-nature-green-400',
    },
    {
      items_zh: topic.movement_analysis_zh,
      items_en: topic.movement_analysis_en,
      label_zh: '動作力學與實務分析 (Movement & Practical Analysis)：',
      label_en: 'Movement & Practical Analysis:',
      accentBg: 'bg-nature-sky-50/90 dark:bg-nature-sky-950/30',
      accentBorder: 'border-nature-sky-200 dark:border-nature-sky-800/60',
      accentText: 'text-nature-sky-800 dark:text-nature-sky-300',
      bulletColor: 'text-salud-cyan',
    },
    {
      items_zh: topic.action_protocols_zh,
      items_en: topic.action_protocols_en,
      label_zh: '行動訓練處方 (Training Protocols)：',
      label_en: 'Training Protocols:',
      accentBg: 'bg-nature-amber-50/90 dark:bg-nature-amber-950/30',
      accentBorder: 'border-nature-amber-200 dark:border-nature-amber-800/60',
      accentText: 'text-nature-amber-800 dark:text-nature-amber-300',
      bulletColor: 'text-salud-amber',
      bulletSymbol: '✓',
    },
  ];

  const jumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Quick Section Jump Navigation */}
      <nav
        aria-label="肌力與肌耐力專區章節導覽"
        className="rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-2"
      >
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 px-2">
          本頁快速跳轉：
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'strength-endurance-flagship', label: '最大肌力 × 肌耐力專題（怪獸訓練觀點）', icon: Flame },
            { id: 'strength-1rm-sim', label: '1RM 與每週組數試算', icon: Calculator },
            { id: 'strength-topics', label: `9 大核心科學主題`, icon: BookOpen },
            { id: 'strength-infographics', label: '四大視覺化機轉圖解', icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpToSection(item.id)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/60 hover:text-emerald-900 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:border-emerald-400 transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Flagship Section: Muscular Endurance vs Maximum Strength (Monster Training & Dr. Ho Li-An) */}
      <MonsterStrengthEnduranceSection />

      {/* Sub-module 1: 1RM & Weekly Effective Volume Simulator */}
      <section id="strength-1rm-sim" className="space-y-3 scroll-mt-24">
        <SimStrength1RM />
      </section>

      {/* Sub-module 2: 9 Core Strength & Muscular Endurance Topics */}
      <section id="strength-topics" className="space-y-4 scroll-mt-24">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base sm:text-lg font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-nature-green-600 dark:text-nature-green-400" />
            肌力、最大肌力與肌耐力九大科學主題 (Strength & Endurance Science)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            涵蓋肌肥大機轉、漸進式超負荷、六大自然動作模式、神經徵召、肌少症逆轉、ACSM 2026 指引、防跌爆發力、肌耐力生理與彈性訓練法
          </p>
        </div>

        <TopicAccordion
          topics={STRENGTH_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="STR-08"
          hoverBorderColor="hover:border-nature-green-500/60"
          idColor="text-nature-green-600 dark:text-nature-green-400"
        />
      </section>

      {/* Sub-module 3: Pedagogical Infographics */}
      <section id="strength-infographics" className="space-y-3 scroll-mt-24">
        <StrengthInfographics />
      </section>
    </div>
  );
};
