import React from 'react';
import { MOBILITY_TOPICS } from '../../../../data/mobilityData';
import { SimMobilityScreen } from '../../../simulators/SimMobilityScreen';
import { TopicAccordion, DetailSection } from '../shared/TopicAccordion';
import { RotateCw } from 'lucide-react';

/**
 * MobilityPanel — Mobility & Fascia Science discipline
 *
 * Extracted from ExerciseHub (WP3).
 * Covers Stretch Reflex Neurophysiology, Biotensegrity, CARs Joint Control, Pelvic Posture Correction, and Joint Degeneration Prevention.
 */
export const MobilityPanel: React.FC = () => {
  const getDetailSections = (topic: typeof MOBILITY_TOPICS[number]): DetailSection[] => [
    {
      items_zh: topic.neuro_mechanisms_zh,
      items_en: topic.neuro_mechanisms_en,
      label_zh: '神經機制 (Neuromuscular Mechanisms)：',
      label_en: 'Neuromuscular Mechanisms:',
      accentBg: 'bg-teal-50/90 dark:bg-teal-950/30',
      accentBorder: 'border-teal-200 dark:border-teal-800/60',
      accentText: 'text-teal-800 dark:text-teal-300',
      bulletColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      items_zh: topic.biomechanical_alignment_zh,
      items_en: topic.biomechanical_alignment_en,
      label_zh: '生物力學排列 (Biomechanical Alignment)：',
      label_en: 'Biomechanical Alignment:',
      accentBg: 'bg-nature-sky-50/90 dark:bg-nature-sky-950/30',
      accentBorder: 'border-nature-sky-200 dark:border-nature-sky-800/60',
      accentText: 'text-nature-sky-800 dark:text-nature-sky-300',
      bulletColor: 'text-salud-cyan',
    },
    {
      items_zh: topic.action_routines_zh,
      items_en: topic.action_routines_en,
      label_zh: '日常訓練處方 (Action Routines)：',
      label_en: 'Action Routines:',
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
        <SimMobilityScreen />
      </section>

      <section className="space-y-4">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            伸展柔軟度筋骨五大核心 (Mobility & Fascia Science)
          </h3>
          <p className="text-xs font-mono text-slate-500">
            神經拉伸生理學、筋膜生物張力整合性、CARs 關節控制、骨盆姿勢矯正、關節退化預防
          </p>
        </div>

        <TopicAccordion
          topics={MOBILITY_TOPICS}
          getDetailSections={getDetailSections}
          defaultExpanded="MOB-01"
          hoverBorderColor="hover:border-teal-500/60"
          idColor="text-teal-600 dark:text-teal-400"
        />
      </section>
    </div>
  );
};
