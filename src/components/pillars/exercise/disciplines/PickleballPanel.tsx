import React from 'react';
import { PICKLEBALL_TOPICS } from '../../../../data/pickleballData';
import { SimPickleballKitchen } from '../../../simulators/SimPickleballKitchen';
import { PickleballInfographics } from '../../../sports/PickleballInfographics';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { Target } from 'lucide-react';

/**
 * PickleballPanel — Pickleball Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Kitchen 7-Foot Geometry, Net Firefight Reactions, Perforated Ball Aerodynamics, Longevity Biomechanics, and Tactical Dinking.
 */
export const PickleballPanel: React.FC = () => {
  const getDetailSections = (topic: typeof PICKLEBALL_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.mechanisms_zh,
      items_en: topic.mechanisms_en,
      label_zh: '物理學與生理機制 (Physics & Mechanisms)：',
      label_en: 'Physics & Mechanisms:',
      accentBg: 'bg-teal-50/90 dark:bg-teal-950/30',
      accentBorder: 'border-teal-200 dark:border-teal-800/60',
      accentText: 'text-teal-800 dark:text-teal-300',
      bulletColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      items_zh: topic.biomechanics_zh,
      items_en: topic.biomechanics_en,
      label_zh: '生物力學分析 (Biomechanical Analysis)：',
      label_en: 'Biomechanical Analysis:',
      accentBg: 'bg-nature-sky-50/90 dark:bg-nature-sky-950/30',
      accentBorder: 'border-nature-sky-200 dark:border-nature-sky-800/60',
      accentText: 'text-nature-sky-800 dark:text-nature-sky-300',
      bulletColor: 'text-salud-cyan',
    },
    {
      items_zh: topic.action_protocols_zh,
      items_en: topic.action_protocols_en,
      label_zh: '行動訓練處方 (Action Protocols)：',
      label_en: 'Action Protocols:',
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
        <SimPickleballKitchen />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            匹克球專項科學五大核心 (Pickleball Science)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            Kitchen 7 英尺幾何、Volley 反應時間、球拍物理、長壽運動學、戰術 Dinking
          </p>
        </div>

        <TopicAccordion
          topics={PICKLEBALL_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="PB-01"
          hoverBorderColor="hover:border-teal-500/60"
          idColor="text-teal-600 dark:text-teal-400"
        />
      </section>

      <section className="space-y-3">
        <PickleballInfographics />
      </section>
    </div>
  );
};
