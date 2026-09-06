import React from 'react';
import { TABLE_TENNIS_TOPICS } from '../../../../data/tableTennisData';
import { SimTableTennisSpin } from '../../../simulators/SimTableTennisSpin';
import { TableTennisInfographics } from '../../../sports/TableTennisInfographics';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { Target } from 'lucide-react';

/**
 * TableTennisPanel — Table Tennis Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Magnus Spin Aerodynamics, 250ms Perception-Action Loop, Forearm Snap Kinetic Chain, Rubber Physics, and Lumbar/Shoulder Protection.
 */
export const TableTennisPanel: React.FC = () => {
  const getDetailSections = (topic: typeof TABLE_TENNIS_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.mechanisms_zh,
      items_en: topic.mechanisms_en,
      label_zh: '旋轉空氣動力學 (Magnus Effect Aerodynamics)：',
      label_en: 'Magnus Effect Aerodynamics:',
      accentBg: 'bg-rose-50/90 dark:bg-rose-950/30',
      accentBorder: 'border-rose-200 dark:border-rose-800/60',
      accentText: 'text-rose-800 dark:text-rose-300',
      bulletColor: 'text-rose-600 dark:text-rose-400',
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
        <SimTableTennisSpin />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            乒乓球專項科學五大核心 (Table Tennis Science)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            Magnus 旋轉空氣動力學、250ms 感知動作迴圈、前臂鞭打力學、橡膠物理、腰椎肩部防護
          </p>
        </div>

        <TopicAccordion
          topics={TABLE_TENNIS_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="TT-01"
          hoverBorderColor="hover:border-rose-500/60"
          idColor="text-rose-600 dark:text-rose-400"
        />
      </section>

      <section className="space-y-3">
        <TableTennisInfographics />
      </section>
    </div>
  );
};
