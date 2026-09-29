import React from 'react';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { useModal } from '../../context/ModalContext';
import { House, GraduationCap, Search, ClipboardList, LayoutGrid } from 'lucide-react';

interface Props {
  /** Null while a secondary page is showing, so no topic is falsely marked current. */
  activePillar: HealthPillar | null;
  onSelectPillar: (pillar: HealthPillar) => void;
  onOpenMenu: () => void;
}

/**
 * MobileNav — v4.2 bottom bar.
 *
 * Thumb-sized targets covering the learner's loop — home, lessons, search, check-up,
 * and the full topic drawer, with active indicators and tactile feedback.
 */
export const MobileNav: React.FC<Props> = ({ activePillar, onSelectPillar, onOpenMenu }) => {
  const { language } = useLanguage();
  const { openModal } = useModal();
  const zh = language === 'zh-TW';

  const items: { key: string; label: string; icon: typeof House; active?: boolean; onClick: () => void }[] = [
    { key: 'home', label: zh ? '首頁' : 'Home', icon: House, active: activePillar === 'home', onClick: () => onSelectPillar('home') },
    { key: 'learn', label: zh ? '學習' : 'Learn', icon: GraduationCap, active: activePillar === 'learn', onClick: () => onSelectPillar('learn') },
    { key: 'search', label: zh ? '搜尋' : 'Search', icon: Search, onClick: () => openModal('search') },
    { key: 'checkup', label: zh ? '健檢' : 'Labs', icon: ClipboardList, active: activePillar === 'checkup', onClick: () => onSelectPillar('checkup') },
    { key: 'menu', label: zh ? '全部主題' : 'Topics', icon: LayoutGrid, onClick: onOpenMenu },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl lg:hidden transition-colors"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label={zh ? '主要導覽' : 'Primary'}
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => (
          <li key={it.key}>
            <button
              onClick={it.onClick}
              aria-current={it.active ? 'page' : undefined}
              className={`btn-tactile relative w-full min-h-[56px] flex flex-col items-center justify-center gap-1 text-[11px] transition-all select-none ${
                it.active
                  ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              aria-label={it.label}
            >
              <div className="relative flex items-center justify-center">
                <it.icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                {it.active && (
                  <span
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-fade-in"
                    aria-hidden="true"
                  />
                )}
              </div>
              <span className="leading-tight">{it.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
