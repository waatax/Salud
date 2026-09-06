import React from 'react';
import { useLanguage } from '../../../i18n';

/**
 * ExerciseHeroHeader — WP3 component
 *
 * Dedicated Hero Header banner for Health Pillar 02: Exercise & Sports Science.
 */
export const ExerciseHeroHeader: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-nature-sky-200/90 dark:border-nature-sky-800/40 bg-gradient-to-br from-nature-sky-100/70 via-white to-nature-green-50/50 dark:from-nature-sky-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 shadow-sm relative overflow-hidden">
      <div className="relative space-y-3 max-w-2xl">
        <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-salud-cyan/40 bg-salud-cyan/20 text-salud-cyan-700 dark:text-salud-cyan-300">
          Health Pillar 02 · 運動與專項運動科學總樞紐
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight">
          {language === 'zh-TW' ? '運動生理學與專項運動科學' : 'Exercise Physiology & Specialized Sports Science'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          運動是人體最強大的多靶點生理藥物。本支柱橫跨 9 大核心專項：基礎生理心率、跑步、自行車、登山、重訓、伸展筋骨，以及羽毛球、乒乓球與匹克球專項力學與教學 Infor Graph。
        </p>
      </div>
    </div>
  );
};
