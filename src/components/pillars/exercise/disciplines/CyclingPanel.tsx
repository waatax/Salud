import React from 'react';
import { CYCLING_TOPICS } from '../../../../data/cyclingData';
import { SimCyclingPower } from '../../../simulators/SimCyclingPower';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { Bike } from 'lucide-react';

/**
 * CyclingPanel — Cycling Power Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Cadence Ergonomics, FTP Power Zones, CdA Aerodynamics, Bike Fitting Geometry, and Hill Climb Nutrition.
 */
export const CyclingPanel: React.FC = () => {
  const getDetailSections = (topic: typeof CYCLING_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.principles_zh,
      items_en: topic.principles_en,
      label_zh: '自行車科學原理 (Cycling Science Principles)：',
      label_en: 'Cycling Science Principles:',
      accentBg: 'bg-blue-50/90 dark:bg-blue-950/30',
      accentBorder: 'border-blue-200 dark:border-blue-800/60',
      accentText: 'text-blue-800 dark:text-blue-300',
      bulletColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      items_zh: topic.biomechanical_data_zh,
      items_en: topic.biomechanical_data_en,
      label_zh: '功率與生物力學 (Biomechanical Data)：',
      label_en: 'Biomechanical Data:',
      accentBg: 'bg-nature-sky-50/90 dark:bg-nature-sky-950/30',
      accentBorder: 'border-nature-sky-200 dark:border-nature-sky-800/60',
      accentText: 'text-nature-sky-800 dark:text-nature-sky-300',
      bulletColor: 'text-salud-cyan',
    },
    {
      items_zh: topic.action_guidelines_zh,
      items_en: topic.action_guidelines_en,
      label_zh: '行動指引 (Action Guidelines)：',
      label_en: 'Action Guidelines:',
      accentBg: 'bg-nature-amber-50/90 dark:bg-nature-amber-950/30',
      accentBorder: 'border-nature-amber-200 dark:border-nature-amber-800/60',
      accentText: 'text-nature-amber-800 dark:text-nature-amber-300',
      bulletColor: 'text-salud-amber',
      bulletSymbol: '✓',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-3">
        <SimCyclingPower />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Bike className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            自行車功率科學五大核心 (Cycling Power Science)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            踏頻人因工學、FTP 功率區間、CdA 空氣動力學、Bike Fitting 幾何、爬坡營養補給
          </p>
        </div>

        <TopicAccordion
          topics={CYCLING_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="CYC-01"
          hoverBorderColor="hover:border-blue-500/60"
          idColor="text-blue-600 dark:text-blue-400"
        />
      </section>
    </div>
  );
};
