import React from 'react';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { Utensils, Activity, Moon, Pill, AlertOctagon, ShieldCheck } from 'lucide-react';

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

  const pillars = [
    {
      id: 'diet' as HealthPillar,
      label: t('pillar.diet'),
      icon: Utensils,
      activeColor: 'text-nature-amber-600 dark:text-nature-amber-400',
      activeBg: 'bg-nature-amber-100/80 dark:bg-nature-amber-950/50',
    },
    {
      id: 'exercise' as HealthPillar,
      label: t('pillar.exercise'),
      icon: Activity,
      activeColor: 'text-nature-sky-600 dark:text-nature-sky-400',
      activeBg: 'bg-nature-sky-100/80 dark:bg-nature-sky-950/50',
    },
    {
      id: 'sleep' as HealthPillar,
      label: t('pillar.sleep'),
      icon: Moon,
      activeColor: 'text-purple-600 dark:text-purple-400',
      activeBg: 'bg-purple-100/80 dark:bg-purple-950/50',
    },
    {
      id: 'supplements' as HealthPillar,
      label: t('pillar.supplements'),
      icon: Pill,
      activeColor: 'text-nature-green-600 dark:text-nature-green-400',
      activeBg: 'bg-nature-green-100/80 dark:bg-nature-green-950/50',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-2 pt-1.5 pb-2.5 sm:pb-2 flex items-center justify-around lg:hidden font-mono text-[11px] shadow-lg transition-colors">
      {pillars.map((p) => {
        const Icon = p.icon;
        const isActive = activePillar === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelectPillar(p.id)}
            className={`btn-tactile min-w-[56px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl transition-all ${
              isActive
                ? `${p.activeBg} ${p.activeColor} font-bold shadow-sm scale-102`
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : ''} transition-transform`} />
            <span>{p.label}</span>
          </button>
        );
      })}

      <button
        onClick={onOpenEmergencyModal}
        className="btn-tactile min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
        title="緊急醫療紅旗警訊"
      >
        <AlertOctagon className="w-4 h-4 animate-pulse" />
        <span className="font-bold">紅旗</span>
      </button>

      <button
        onClick={onOpenCouncil}
        className="btn-tactile min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-nature-amber-600 dark:text-nature-amber-400 hover:bg-nature-amber-50 dark:hover:bg-nature-amber-950/40"
        title="24人跨科專家治理委員會"
      >
        <ShieldCheck className="w-4 h-4" />
        <span className="font-bold">專家</span>
      </button>
    </nav>
  );
};
