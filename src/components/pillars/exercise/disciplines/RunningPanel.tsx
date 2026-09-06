import React from 'react';
import { RUNNING_TOPICS } from '../../../../data/sportsScienceData';
import { SimRunningCalculator } from '../../../simulators/SimRunningCalculator';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { Zap } from 'lucide-react';

/**
 * RunningPanel — Running Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Cadence Biomechanics, Lactate Pacing, Running Economy, Carbohydrate Periodization, and Injury Prevention.
 */
export const RunningPanel: React.FC = () => {
  const getDetailSections = (topic: typeof RUNNING_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.key_principles_zh,
      items_en: topic.key_principles_en,
      label_zh: '跑步科學原理 (Running Science Principles)：',
      label_en: 'Running Science Principles:',
      accentBg: 'bg-nature-amber-50/90 dark:bg-nature-amber-950/30',
      accentBorder: 'border-nature-amber-200 dark:border-nature-amber-800/60',
      accentText: 'text-nature-amber-800 dark:text-nature-amber-300',
      bulletColor: 'text-salud-amber',
    },
    {
      items_zh: topic.biomechanical_data_zh,
      items_en: topic.biomechanical_data_en,
      label_zh: '生物力學數據 (Biomechanical Data)：',
      label_en: 'Biomechanical Data:',
      accentBg: 'bg-nature-sky-50/90 dark:bg-nature-sky-950/30',
      accentBorder: 'border-nature-sky-200 dark:border-nature-sky-800/60',
      accentText: 'text-nature-sky-800 dark:text-nature-sky-300',
      bulletColor: 'text-salud-cyan',
    },
    {
      items_zh: topic.action_protocols_zh,
      items_en: topic.action_protocols_en,
      label_zh: '行動處方指引 (Action Protocols)：',
      label_en: 'Action Protocols:',
      accentBg: 'bg-nature-green-50/90 dark:bg-nature-green-950/30',
      accentBorder: 'border-nature-green-200 dark:border-nature-green-800/60',
      accentText: 'text-nature-green-800 dark:text-nature-green-300',
      bulletColor: 'text-nature-green-600 dark:text-nature-green-400',
      bulletSymbol: '✓',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-3">
        <SimRunningCalculator />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Zap className="w-4 h-4 text-salud-amber" />
            跑步運動科學五大關鍵維度 (Running Science Pillars)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            生物力學步頻減震、乳酸門檻配速、跑步經濟性、雙通道果膠補給與運動傷害防護
          </p>
        </div>

        <TopicAccordion
          topics={RUNNING_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="RUN-01"
          hoverBorderColor="hover:border-salud-amber/60"
          idColor="text-salud-amber"
        />
      </section>
    </div>
  );
};
