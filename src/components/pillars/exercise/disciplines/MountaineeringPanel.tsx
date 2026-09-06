import React from 'react';
import { MOUNTAINEERING_TOPICS } from '../../../../data/sportsScienceData';
import { SimMountaineeringAltitude } from '../../../simulators/SimMountaineeringAltitude';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { Mountain } from 'lucide-react';

/**
 * MountaineeringPanel — Mountaineering & High-Altitude Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Hypoxia Physiology, AMS/HAPE/HACE Diagnostics, Prophylactic Pharmacology, Backpacking Biomechanics, and Hypothermia Energetics.
 */
export const MountaineeringPanel: React.FC = () => {
  const getDetailSections = (topic: typeof MOUNTAINEERING_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.pathophysiology_zh,
      items_en: topic.pathophysiology_en,
      label_zh: '病理生理機制 (Pathophysiology)：',
      label_en: 'Pathophysiology:',
      accentBg: 'bg-purple-50/90 dark:bg-purple-950/30',
      accentBorder: 'border-purple-200 dark:border-purple-800/60',
      accentText: 'text-purple-800 dark:text-purple-300',
      bulletColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      items_zh: topic.clinical_criteria_zh,
      items_en: topic.clinical_criteria_en,
      label_zh: '臨床診斷標準 (Clinical Criteria)：',
      label_en: 'Clinical Criteria:',
      accentBg: 'bg-red-50/90 dark:bg-red-950/30',
      accentBorder: 'border-red-200 dark:border-red-800/60',
      accentText: 'text-red-800 dark:text-red-300',
      bulletColor: 'text-red-600 dark:text-red-400',
    },
    {
      items_zh: topic.survival_protocols_zh,
      items_en: topic.survival_protocols_en,
      label_zh: '求生處置協定 (Survival Protocols)：',
      label_en: 'Survival Protocols:',
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
        <SimMountaineeringAltitude />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Mountain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            登山高海拔科學五大核心 (Mountaineering & High-Altitude)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            低氧生理學、AMS/HAPE/HACE 診斷、預防性藥物、負重生物力學、失溫與能量學
          </p>
        </div>

        <TopicAccordion
          topics={MOUNTAINEERING_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="MNT-01"
          hoverBorderColor="hover:border-purple-500/60"
          idColor="text-purple-600 dark:text-purple-400"
        />
      </section>
    </div>
  );
};
