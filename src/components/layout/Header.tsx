import React from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from '../common/LanguageToggle';
import { FontSizeToggle } from '../common/FontSizeToggle';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { useModal } from '../../context/ModalContext';
import { Menu, Search } from 'lucide-react';

interface Props {
  /** Null while a secondary page is showing. */
  activePillar: HealthPillar | null;
  onSelectPillar: (pillar: HealthPillar) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleMobileSidebar: () => void;
}

const QUICK_LINKS: { id: HealthPillar; zh: string; en: string }[] = [
  { id: 'start', zh: '4 週啟動', en: 'Start' },
  { id: 'learn', zh: '學習路徑', en: 'Learn' },
  { id: 'checkup', zh: '看懂健檢', en: 'Check-up' },
];

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

/**
 * Header — v4.0.
 *
 * The v3 header squeezed all nine topic pills into one row, which wrapped CJK labels
 * mid-word and duplicated the sidebar. The topic tree now lives only in the sidebar
 * (desktop) and the drawer (mobile); the header carries the three things a reader
 * reaches for from anywhere: search, the learning entry points, and reading controls.
 */
export const Header: React.FC<Props> = ({ activePillar, onSelectPillar, isDark, onToggleTheme, onToggleMobileSidebar }) => {
  const { t, language } = useLanguage();
  const { openModal } = useModal();
  const zh = language === 'zh-TW';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-salud-dark-bg/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center gap-2 sm:gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label={t('nav.open_menu')}
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          className="flex items-center gap-2.5 select-none text-left shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          onClick={() => onSelectPillar('home')}
          aria-label={zh ? 'Salud 首頁' : 'Salud home'}
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-display font-bold text-base shadow-sm" aria-hidden="true">
            S
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="block text-base font-display font-bold tracking-tight text-slate-900 dark:text-white">Salud</span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">{zh ? '給每個人的健康學習平台' : 'Health learning for everyone'}</span>
          </span>
        </button>

        {/* Search: the fastest way in for a first-time reader */}
        <button
          onClick={() => openModal('search')}
          className="flex-1 min-w-0 max-w-md ml-auto md:ml-4 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-left text-sm text-slate-500 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
          aria-label={zh ? '搜尋（快捷鍵 Ctrl K）' : 'Search (Ctrl K)'}
        >
          <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 truncate">{zh ? '搜尋症狀、數值、主題' : 'Search topics, labs, symptoms'}</span>
          <kbd className="hidden md:inline text-[10px] font-mono border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5">
            {isMac ? '⌘' : 'Ctrl'} K
          </kbd>
        </button>

        <nav className="hidden xl:flex items-center gap-1" aria-label={zh ? '學習入口' : 'Learning'}>
          {QUICK_LINKS.map((l) => {
            const active = activePillar === l.id;
            return (
              <button
                key={l.id}
                onClick={() => onSelectPillar(l.id)}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-2 rounded-xl text-sm transition-colors ${
                  active
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {zh ? l.zh : l.en}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <FontSizeToggle variant="compact" />
          <span className="hidden sm:inline-flex">
            <LanguageToggle />
          </span>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
