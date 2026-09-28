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
 * MobileNav — v4.0 bottom bar.
 *
 * The v3 bar scrolled sideways through nine topics, so most were off-screen and the
 * labels were too small to hit reliably. Five fixed, thumb-sized targets now cover the
 * learner's loop — home, lessons, search, check-up, and the full topic drawer.
 * Emergency red flags stay one tap away on the home page and in the drawer.
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
      className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label={zh ? '主要導覽' : 'Primary'}
    >
      <ul className="grid grid-cols-5">
        {items.map((it) => (
          <li key={it.key}>
            <button
              onClick={it.onClick}
              aria-current={it.active ? 'page' : undefined}
              className={`w-full min-h-[56px] flex flex-col items-center justify-center gap-1 text-[11px] transition-colors ${
                it.active ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <it.icon className="w-5 h-5" aria-hidden="true" />
              <span>{it.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
