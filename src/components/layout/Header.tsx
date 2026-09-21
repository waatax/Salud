import React from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from '../common/LanguageToggle';
import { FontSizeToggle } from '../common/FontSizeToggle';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { PILLAR_NAV } from '../../config/navigation';
import { Menu, HeartPulse } from 'lucide-react';
import { APP_VERSION } from '../../config/version';

interface Props {
  /** Null while a secondary page is showing. */
  activePillar: HealthPillar | null;
  onSelectPillar: (pillar: HealthPillar) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCardioHub?: () => void;
  onToggleMobileSidebar: () => void;
}

/**
 * Header — primary navigation.
 *
 * v2.0 rule: this bar carries health topics and reading controls only. The expert-roster
 * and charter shortcuts that used to sit in the action area were project metadata, not
 * health content; they now live in the footer under About.
 */
export const Header: React.FC<Props> = ({
  activePillar,
  onSelectPillar,
  isDark,
  onToggleTheme,
  onOpenCardioHub,
  onToggleMobileSidebar,
}) => {
  const { t, language } = useLanguage();
  const zh = language === 'zh-TW';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-salud-light-border/80 dark:border-salud-dark-border/80 bg-white/90 dark:bg-salud-dark-bg/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="btn-tactile p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label={t('nav.open_menu')}
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            className="flex items-center gap-2.5 select-none group text-left"
            onClick={() => onSelectPillar('systems')}
            title={zh ? '回到首頁' : 'Back to home'}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-salud-cyan via-nature-green-500 to-nature-amber-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[9px] flex items-center justify-center text-salud-cyan font-bold font-display text-sm">
                S
              </div>
            </div>
            <div>
              <span className="text-base font-display font-extrabold tracking-tight text-slate-900 dark:text-salud-dark-text">
                Salud
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden xl:block">
                {t('app.tagline')}
              </span>
            </div>
          </button>
        </div>

        {/* ── Desktop topic navigation, rendered from the shared config ── */}
        <nav className="hidden md:flex items-center gap-1 bg-emerald-50/50 dark:bg-[#0F1714] p-1 rounded-2xl border border-emerald-100 dark:border-[#1C2E25] text-xs font-mono">
          {PILLAR_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              activePillar === item.id ||
              (item.id === 'diet' && activePillar === 'supplements');
            return (
              <button
                key={item.id}
                onClick={() => onSelectPillar(item.id)}
                className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                />
                <span>{zh ? item.label_zh : item.label_en}</span>
              </button>
            );
          })}
        </nav>

        {/* Reading controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onOpenCardioHub && (
            <button
              onClick={onOpenCardioHub}
              className="btn-tactile hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-nature-sky-200 dark:border-nature-sky-900/60 bg-nature-sky-50/80 dark:bg-nature-sky-950/30 text-nature-sky-800 dark:text-nature-sky-300 hover:bg-nature-sky-100 transition-all font-mono text-xs"
              title={t('nav.cardio_hub_title')}
            >
              <HeartPulse className="w-3.5 h-3.5 text-nature-sky-600 dark:text-nature-sky-400" />
              <span>{t('nav.cardio_hub')}</span>
            </button>
          )}

          <FontSizeToggle variant="compact" />
          <LanguageToggle />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

          <span
            className="hidden lg:inline text-[10px] font-mono text-slate-400 dark:text-slate-600 pl-1"
            title={zh ? '目前內容版本' : 'Content version'}
          >
            v{APP_VERSION}
          </span>
        </div>
      </div>
    </header>
  );
};
