import React from 'react';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { HeartPulse, Utensils, Activity, Moon, Pill, AlertOctagon, ShieldCheck, Sparkles, Wind, Scale, Hourglass } from 'lucide-react';

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
      id: 'systems' as HealthPillar,
      label: '系統',
      icon: HeartPulse,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
    },
    {
      id: 'ultrahealth' as HealthPillar,
      label: '超健康',
      icon: Sparkles,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
    },
    {
      id: 'obesity' as HealthPillar,
      label: '減重',
      icon: Scale,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
    },
    {
      id: 'longevity' as HealthPillar,
      label: '抗老',
      icon: Hourglass,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
    },
    {
      id: 'diet' as HealthPillar,
      label: '飲食',
      icon: Utensils,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
    },
    {
      id: 'exercise' as HealthPillar,
      label: '運動',
      icon: Activity,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
    },
    {
      id: 'sleep' as HealthPillar,
      label: '睡眠',
      icon: Moon,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
    },
    {
      id: 'mental' as HealthPillar,
      label: '呼吸',
      icon: Wind,
      activeColor: 'text-emerald-700 dark:text-emerald-300',
      activeBg: 'bg-emerald-100/90 dark:bg-emerald-950/60',
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

      <a
        href="#expert-zone"
        className="btn-tactile min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
        title="40 席全人專家專區"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span className="font-bold">專家</span>
      </a>
    </nav>
  );
};
