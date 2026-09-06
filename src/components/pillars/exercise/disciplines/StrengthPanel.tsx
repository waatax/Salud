import React from 'react';
import { STRENGTH_TOPICS } from '../../../../data/strengthData';
import { SimStrength1RM } from '../../../simulators/SimStrength1RM';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { Dumbbell } from 'lucide-react';

/**
 * StrengthPanel — Strength Training Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Hypertrophy Mechanisms, Progressive Overload, Six Movement Patterns, Neural Adaptation, and Sarcopenia Mitigation.
 */
export const StrengthPanel: React.FC = () => {
  const getDetailSections = (topic: typeof STRENGTH_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.mechanisms_zh,
      items_en: topic.mechanisms_en,
      label_zh: '肌肉生理機制 (Hypertrophy Mechanisms)：',
      label_en: 'Hypertrophy Mechanisms:',
      accentBg: 'bg-nature-green-50/90 dark:bg-nature-green-950/30',
      accentBorder: 'border-nature-green-200 dark:border-nature-green-800/60',
      accentText: 'text-nature-green-800 dark:text-nature-green-300',
      bulletColor: 'text-nature-green-600 dark:text-nature-green-400',
    },
    {
      items_zh: topic.movement_analysis_zh,
      items_en: topic.movement_analysis_en,
      label_zh: '動作分析與評估 (Movement Analysis)：',
      label_en: 'Movement Analysis:',
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

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-3">
        <SimStrength1RM />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-nature-green-600 dark:text-nature-green-400" />
            肌力重力訓練五大核心 (Strength Training Science)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            肌肥大機制、漸進式超負荷、六大基本動作模式、神經適應、肌少症與肌肉性荷爾蒙
          </p>
        </div>

        <TopicAccordion
          topics={STRENGTH_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="STR-01"
          hoverBorderColor="hover:border-nature-green-500/60"
          idColor="text-nature-green-600 dark:text-nature-green-400"
        />
      </section>
    </div>
  );
};
