import React from 'react';
import { ThemePicker } from '../common/ThemePicker';
import { LanguageToggle } from '../common/LanguageToggle';
import { FontSizeToggle } from '../common/FontSizeToggle';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { useModal } from '../../context/ModalContext';
import { Search, GraduationCap, Calculator, Bookmark, Layers, Stethoscope } from 'lucide-react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useActionPlan } from '../../hooks/useActionPlan';

interface Props {
  /** Null while a secondary page is showing. */
  activePillar: HealthPillar | null;
  onSelectPillar: (pillar: HealthPillar) => void;
}

const QUICK_LINKS: { id: HealthPillar; zh: string; en: string; icon: any }[] = [
  { id: 'learn', zh: '學習路徑', en: 'Learn', icon: GraduationCap },
  { id: 'clinic', zh: '就醫導引', en: 'Find care', icon: Stethoscope },
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
export const Header: React.FC<Props> = ({ activePillar, onSelectPillar }) => {
  const { language } = useLanguage();
  const { openModal } = useModal();
  const { bookmarks } = useBookmarks();
  const { plan } = useActionPlan();
  const zh = language === 'zh-TW';

  const backpackCount = bookmarks.length + plan.items.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/10 dark:border-slate-800/80 bg-[#F8FBF9]/90 dark:bg-salud-dark-bg/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 xl:px-6 h-16 flex items-center gap-2 xl:gap-4">
        <button
          className="min-h-11 flex items-center gap-2.5 select-none text-left shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          onClick={() => {
            onSelectPillar('home');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          aria-label={zh ? 'Salud 首頁' : 'Salud home'}
        >
          <span className="w-8 h-8 rounded-[.65rem] bg-gradient-to-br from-emerald-700 to-emerald-900 dark:from-emerald-300 dark:to-emerald-400 shadow-xs flex items-center justify-center text-white dark:text-emerald-950 font-serif font-bold text-lg" aria-hidden="true">
            S
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="block text-base font-display font-bold tracking-tight text-slate-900 dark:text-white">Salud</span>
            <span className="hidden text-[0.75rem] text-slate-500 dark:text-slate-400 xl:block">{zh ? '給每個人的健康學習平台' : 'Health learning for everyone'}</span>
          </span>
        </button>

        {/* Search: the fastest way in for a first-time reader */}
        <button
          onClick={() => openModal('search')}
          className="min-h-11 flex-1 min-w-11 max-w-md ml-auto flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-left text-sm text-slate-500 dark:text-slate-400 hover:border-emerald-400 dark:hover:border-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
          aria-label={zh ? '搜尋（快捷鍵 Ctrl K）' : 'Search (Ctrl K)'}
        >
          <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 truncate sm:hidden">{zh ? '搜尋健康知識' : 'Search'}</span>
          <span className="hidden flex-1 truncate sm:inline">{zh ? '搜尋症狀、數值、主題' : 'Search topics, labs, symptoms'}</span>
          <kbd className="hidden shrink-0 whitespace-nowrap text-[0.75rem] font-mono border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 2xl:inline">
            {isMac ? '⌘' : 'Ctrl'} K
          </kbd>
        </button>

        <nav className="hidden shrink-0 items-center gap-0.5 whitespace-nowrap lg:flex xl:gap-1" aria-label={zh ? '學習入口' : 'Learning'}>
          <a
            href="#home/topics"
            className="flex min-h-11 items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-xl text-sm transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Layers className="hidden w-4 h-4 text-emerald-600 dark:text-emerald-400 xl:block" aria-hidden="true" />
            <span>{zh ? '全部主題' : 'Topics'}</span>
          </a>
          {QUICK_LINKS.map((l) => {
            const active = activePillar === l.id;
            const Icon = l.icon;
            return (
              <button
                key={l.id}
                onClick={() => onSelectPillar(l.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-11 items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-xl text-sm transition-colors ${
                  active
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`hidden w-4 h-4 shrink-0 xl:block ${active ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{zh ? l.zh : l.en}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Action Tools: Simulators & Learning Backpack */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => openModal('simulators')}
            className="hidden sm:flex p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-900 text-xs font-semibold items-center gap-1.5 transition-colors"
            title={zh ? '互動健康試算工具箱 (18+ 模擬器)' : 'Health Calculators'}
            aria-label={zh ? '健康試算工具箱' : 'Calculators'}
          >
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden 2xl:inline">{zh ? '試算工具' : 'Tools'}</span>
          </button>

          <button
            onClick={() => openModal('backpack')}
            className="hidden sm:flex relative p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400 bg-white dark:bg-slate-900 text-xs font-semibold items-center gap-1.5 transition-colors"
            title={zh ? '我的健康背包與收藏' : 'Backpack & Bookmarks'}
            aria-label={zh ? '我的健康背包' : 'Backpack'}
          >
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span className="hidden 2xl:inline">{zh ? '背包收藏' : 'Saved'}</span>
            {backpackCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-mono text-[0.75rem] flex items-center justify-center font-bold">
                {backpackCount > 9 ? '9+' : backpackCount}
              </span>
            )}
          </button>

          <FontSizeToggle variant="compact" />
          <span className="hidden sm:inline-flex">
            <LanguageToggle />
          </span>
          <ThemePicker />
        </div>
      </div>
    </header>
  );
};
