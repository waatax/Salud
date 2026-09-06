import React from 'react';
import { EXERCISE_TOPICS } from '../../../../data/exerciseData';
import { SimExerciseZones } from '../../../simulators/SimExerciseZones';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { HeartPulse } from 'lucide-react';

/**
 * PhysiologyPanel — Exercise Physiology discipline (Tab 1)
 *
 * Extracted from the monolithic ExerciseHub.tsx (WP3).
 * Covers VO2 Max, Lactate Threshold, NEAT, and Exercise Prescription.
 */
export const PhysiologyPanel: React.FC = () => {
  const getDetailSections = (topic: typeof EXERCISE_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.key_mechanisms_zh,
      items_en: topic.key_mechanisms_en,
      label_zh: '核心生理機制 (Physiological Mechanisms)：',
      label_en: 'Physiological Mechanisms:',
      accentBg: 'bg-nature-sky-50/90 dark:bg-nature-sky-950/30',
      accentBorder: 'border-nature-sky-200 dark:border-nature-sky-800/60',
      accentText: 'text-nature-sky-800 dark:text-nature-sky-300',
      bulletColor: 'text-salud-cyan',
    },
    {
      items_zh: topic.action_guidelines_zh,
      items_en: topic.action_guidelines_en,
      label_zh: '行動處方指引 (Action Guidelines)：',
      label_en: 'Action Guidelines:',
      accentBg: 'bg-slate-50 dark:bg-slate-800/40',
      accentBorder: 'border-slate-200 dark:border-slate-700/50',
      accentText: 'text-nature-amber-800 dark:text-nature-amber-300',
      bulletColor: 'text-salud-amber',
      bulletSymbol: '✓',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Sub-module 1: Karvonen Heart Rate Reserve & Metabolic Calculator */}
      <section className="space-y-3">
        <SimExerciseZones />
      </section>

      {/* Sub-module 2: Exercise Topics List */}
      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-salud-cyan" />
            運動生理學關鍵機制 (Key Physiological Mechanisms)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            心肺最大攝氧量 (VO2 max)、肌少症阻力訓練逆轉、NEAT 非運動性產熱與安全運動處方
          </p>
        </div>

        <TopicAccordion
          topics={EXERCISE_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="EX-01"
          hoverBorderColor="hover:border-salud-cyan/60"
          idColor="text-salud-cyan"
        />
      </section>
    </div>
  );
};
