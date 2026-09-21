import React from 'react';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { PILLAR_NAV } from '../../config/navigation';
import { AlertOctagon } from 'lucide-react';

interface Props {
  /** Null while a secondary page is showing, so no topic is falsely marked current. */
  activePillar: HealthPillar | null;
  onSelectPillar: (pillar: HealthPillar) => void;
  onOpenEmergencyModal: () => void;
}

/**
 * MobileNav — bottom bar on phones. Topics plus the red-flag check only; the expert-roster
 * shortcut was removed in v2.0 because governance metadata does not belong in the hand-reach
 * navigation a reader uses to find health content.
 */
export const MobileNav: React.FC<Props> = ({
  activePillar,
  onSelectPillar,
  onOpenEmergencyModal,
}) => {
  const { language } = useLanguage();
  const zh = language === 'zh-TW';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-2 pt-1.5 pb-2.5 sm:pb-2 flex items-center justify-start sm:justify-around overflow-x-auto no-scrollbar lg:hidden font-mono text-[11px] shadow-lg transition-colors gap-1">
      {PILLAR_NAV.filter((p) => p.mobile).map((p) => {
        const Icon = p.icon;
        const isActive =
          activePillar === p.id || (p.id === 'diet' && activePillar === 'supplements');
        return (
          <button
            key={p.id}
            onClick={() => onSelectPillar(p.id)}
            className={`btn-tactile min-w-[56px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl transition-all ${
              isActive
                ? 'bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm scale-102'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : ''} transition-transform`} />
            <span className="whitespace-nowrap">{zh ? p.short_zh : p.short_en}</span>
          </button>
        );
      })}

      <button
        onClick={onOpenEmergencyModal}
        className="btn-tactile min-w-[52px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
        title={zh ? '緊急醫療紅旗警訊' : 'Emergency red flags'}
      >
        <AlertOctagon className="w-4 h-4 animate-pulse" />
        <span className="font-bold">{zh ? '紅旗' : 'Red flag'}</span>
      </button>
    </nav>
  );
};
