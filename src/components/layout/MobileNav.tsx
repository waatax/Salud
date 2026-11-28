import React from 'react';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { House, Utensils, GraduationCap, Stethoscope, LayoutGrid } from 'lucide-react';

interface Props {
  /** Null while a secondary page is showing, so no topic is falsely marked current. */
  activePillar: HealthPillar | null;
  onSelectPillar: (pillar: HealthPillar) => void;
  onOpenMenu: () => void;
}

/**
 * MobileNav — v7.1 bottom bar.
 *
 * Thumb-sized targets putting Home and Healthy Diet front-and-center, alongside
 * learning tracks, care navigation, and the full topic drawer.
 */
export const MobileNav: React.FC<Props> = ({ activePillar, onSelectPillar, onOpenMenu }) => {
  const { language } = useLanguage();
  const { go } = useNavigation();
  const zh = language === 'zh-TW';

  const items: { key: string; label: string; icon: typeof House; active?: boolean; onClick: () => void }[] = [
    { key: 'home', label: zh ? '首頁' : 'Home', icon: House, active: activePillar === 'home', onClick: () => onSelectPillar('home') },
    { key: 'diet', label: zh ? '健康飲食' : 'Diet', icon: Utensils, active: activePillar === 'diet' || activePillar === 'supplements', onClick: () => onSelectPillar('diet') },
    { key: 'learn', label: zh ? '學習' : 'Learn', icon: GraduationCap, active: activePillar === 'learn', onClick: () => onSelectPillar('learn') },
    { key: 'clinic', label: zh ? '就醫' : 'Care', icon: Stethoscope, active: activePillar === 'clinic', onClick: () => go('clinic/by/symptom') },
    { key: 'menu', label: zh ? '全部主題' : 'Topics', icon: LayoutGrid, onClick: onOpenMenu },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-emerald-900/10 dark:border-slate-800/80 bg-[#F8FBF9]/95 dark:bg-slate-950/95 backdrop-blur-xl lg:hidden transition-colors"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label={zh ? '主要導覽' : 'Primary'}
    >
      <ul className="grid grid-cols-5 px-1 py-1">
        {items.map((it) => (
          <li key={it.key}>
            <button
              onClick={it.onClick}
              aria-current={it.active ? 'page' : undefined}
              className={`btn-tactile relative w-full min-h-[52px] rounded-xl flex flex-col items-center justify-center gap-0.5 text-[0.75rem] transition-all select-none ${
                it.active
                  ? 'bg-emerald-100/75 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              aria-label={it.label}
            >
              <it.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="leading-tight">{it.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
