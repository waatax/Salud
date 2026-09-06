import React from 'react';
import { BADMINTON_TOPICS } from '../../../../data/badmintonData';
import { SimBadmintonSmash } from '../../../simulators/SimBadmintonSmash';
import { BadmintonInfographics } from '../../../sports/BadmintonInfographics';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { Target } from 'lucide-react';

/**
 * BadmintonPanel — Badminton Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Shuttlecock Aerodynamics, Kinetic Chain Smash Whip, Split-Step Biomechanics, Court Tactical Zones, and Rotator Cuff Injury Protection.
 */
export const BadmintonPanel: React.FC = () => {
  const getDetailSections = (topic: typeof BADMINTON_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.mechanisms_zh,
      items_en: topic.mechanisms_en,
      label_zh: '空氣動力學與生理機制 (Aerodynamics & Mechanisms)：',
      label_en: 'Aerodynamics & Mechanisms:',
      accentBg: 'bg-nature-amber-50/90 dark:bg-nature-amber-950/30',
      accentBorder: 'border-nature-amber-200 dark:border-nature-amber-800/60',
      accentText: 'text-nature-amber-800 dark:text-nature-amber-300',
      bulletColor: 'text-salud-amber',
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
        <SimBadmintonSmash />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Target className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400" />
            羽毛球專項科學五大核心 (Badminton Science)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            球樜空氣動力學、殺球動力鏈、分步足工、戰術區域、傷害防護
          </p>
        </div>

        <TopicAccordion
          topics={BADMINTON_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="BAD-01"
          hoverBorderColor="hover:border-nature-amber-500/60"
          idColor="text-nature-amber-600 dark:text-nature-amber-400"
        />
      </section>

      <section className="space-y-3">
        <BadmintonInfographics />
      </section>
    </div>
  );
};
