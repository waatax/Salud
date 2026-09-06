import React from 'react';
import { SportsDiscipline } from '../../../types';
import { useLanguage } from '../../../i18n';
import {
  HeartPulse,
  Zap,
  Bike,
  Mountain,
  Dumbbell,
  Scale
} from 'lucide-react';

interface Props {
  activeTab: SportsDiscipline;
  onSelectTab: (tab: SportsDiscipline) => void;
}

/**
 * DisciplineTabBar — WP3 component
 *
 * 9-Discipline tab switcher with responsive grid layout and tactile styling.
 */
export const DisciplineTabBar: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-2">
      {/* 6 General Disciplines */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 text-xs font-mono">
        {/* 1. Physiology */}
        <button
          onClick={() => onSelectTab('PHYSIOLOGY')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'PHYSIOLOGY'
              ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HeartPulse className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '運動生理' : 'Physiology'}</span>
        </button>

        {/* 2. Running */}
        <button
          onClick={() => onSelectTab('RUNNING')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'RUNNING'
              ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '跑步科學' : 'Running'}</span>
        </button>

        {/* 3. Cycling */}
        <button
          onClick={() => onSelectTab('CYCLING')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'CYCLING'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bike className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '自行車' : 'Cycling'}</span>
        </button>

        {/* 4. Mountaineering */}
        <button
          onClick={() => onSelectTab('MOUNTAINEERING')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'MOUNTAINEERING'
              ? 'bg-purple-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Mountain className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '登山科學' : 'Mountaineer'}</span>
        </button>

        {/* 5. Strength Training */}
        <button
          onClick={() => onSelectTab('STRENGTH_TRAINING')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'STRENGTH_TRAINING'
              ? 'bg-emerald-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Dumbbell className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '肌肉重訓' : 'Strength'}</span>
        </button>

        {/* 6. Mobility & Fascia */}
        <button
          onClick={() => onSelectTab('MOBILITY_FASCIA')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'MOBILITY_FASCIA'
              ? 'bg-teal-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '伸展筋骨' : 'Mobility'}</span>
        </button>
      </div>

      {/* 3 Racket & Paddle Sports */}
      <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono">
        {/* 7. Badminton */}
        <button
          onClick={() => onSelectTab('BADMINTON')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center font-bold ${
            activeTab === 'BADMINTON'
              ? 'bg-nature-amber-500 text-white dark:text-black shadow-warm-glow'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
          }`}
        >
          <span>🏸</span>
          <span className="truncate">{language === 'zh-TW' ? '羽毛球 (Badminton)' : 'Badminton'}</span>
        </button>

        {/* 8. Table Tennis */}
        <button
          onClick={() => onSelectTab('TABLE_TENNIS')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center font-bold ${
            activeTab === 'TABLE_TENNIS'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
          }`}
        >
          <span>🏓</span>
          <span className="truncate">{language === 'zh-TW' ? '乒乓球 (Table Tennis)' : 'Table Tennis'}</span>
        </button>

        {/* 9. Pickleball */}
        <button
          onClick={() => onSelectTab('PICKLEBALL')}
          className={`btn-tactile py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center font-bold ${
            activeTab === 'PICKLEBALL'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
          }`}
        >
          <span>🎾</span>
          <span className="truncate">{language === 'zh-TW' ? '匹克球 (Pickleball)' : 'Pickleball'}</span>
        </button>
      </div>
    </div>
  );
};
