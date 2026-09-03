import React from 'react';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { Utensils, Activity, Moon, Pill, AlertOctagon, HelpCircle } from 'lucide-react';

interface Props {
  activePillar: HealthPillar;
  onSelectPillar: (pillar: HealthPillar) => void;
  onOpenEmergencyModal: () => void;
  onOpenCouncil: () => void;
}

export const MobileNav: React.FC<Props> = ({
  activePillar,
  onSelectPillar,
  onOpenEmergencyModal,
  onOpenCouncil,
}) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-salud-light-border/80 dark:border-salud-dark-border bg-salud-light-bg/95 dark:bg-salud-dark-bg/95 backdrop-blur-lg px-2 py-1.5 flex items-center justify-around lg:hidden font-mono text-[10px]">
      <button
        onClick={() => onSelectPillar('diet')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded-lg transition-colors ${
          activePillar === 'diet' ? 'text-salud-amber-600 dark:text-salud-amber font-bold' : 'text-slate-600 dark:text-slate-400'
        }`}
      >
        <Utensils className="w-4 h-4" />
        <span>{t('pillar.diet')}</span>
      </button>

      <button
        onClick={() => onSelectPillar('exercise')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded-lg transition-colors ${
          activePillar === 'exercise' ? 'text-salud-cyan font-bold' : 'text-slate-600 dark:text-slate-400'
        }`}
      >
        <Activity className="w-4 h-4" />
        <span>{t('pillar.exercise')}</span>
      </button>

      <button
        onClick={() => onSelectPillar('sleep')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded-lg transition-colors ${
          activePillar === 'sleep' ? 'text-purple-400 font-bold' : 'text-slate-600 dark:text-slate-400'
        }`}
      >
        <Moon className="w-4 h-4" />
        <span>{t('pillar.sleep')}</span>
      </button>

      <button
        onClick={() => onSelectPillar('supplements')}
        className={`flex flex-col items-center gap-0.5 p-1 rounded-lg transition-colors ${
          activePillar === 'supplements' ? 'text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400'
        }`}
      >
        <Pill className="w-4 h-4" />
        <span>{t('pillar.supplements')}</span>
      </button>

      <button
        onClick={onOpenEmergencyModal}
        className="flex flex-col items-center gap-0.5 p-1 rounded-lg text-red-500 dark:text-red-400"
      >
        <AlertOctagon className="w-4 h-4 animate-pulse" />
        <span>紅旗</span>
      </button>
    </nav>
  );
};
