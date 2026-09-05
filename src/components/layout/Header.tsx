import React from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from '../common/LanguageToggle';
import { FontSizeToggle } from '../common/FontSizeToggle';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import {
  ShieldCheck,
  Menu,
  HeartPulse,
  Pill,
  ClipboardCheck,
  Utensils,
  Activity,
  Moon,
  AlertOctagon,
  Sparkles
} from 'lucide-react';

interface Props {
  activePillar: HealthPillar;
  onSelectPillar: (pillar: HealthPillar) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCouncil: () => void;
  onOpenEmergencyModal: () => void;
  onOpenAuditC?: () => void;
  onOpenCardioHub?: () => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<Props> = ({
  activePillar,
  onSelectPillar,
  isDark,
  onToggleTheme,
  onOpenCouncil,
  onOpenEmergencyModal,
  onOpenAuditC,
  onOpenCardioHub,
  onToggleMobileSidebar,
}) => {
  const { t, language } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-salud-light-border/80 dark:border-salud-dark-border/80 bg-white/90 dark:bg-salud-dark-bg/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand & Chapter selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="btn-tactile p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label={t('nav.open_menu')}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            onClick={() => onSelectPillar('diet')}
            title="回到健康生活起點"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-nature-amber-500 via-nature-green-500 to-nature-sky-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[9px] flex items-center justify-center text-nature-sky-600 dark:text-nature-sky-400 font-bold font-display text-sm">
                S
              </div>
            </div>
            <div>
              <span className="text-base font-display font-extrabold tracking-tight text-slate-900 dark:text-salud-dark-text flex items-center gap-1.5">
                Salud
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-nature-sky-100 dark:bg-nature-sky-950/60 text-nature-sky-700 dark:text-nature-sky-300 border border-nature-sky-200 dark:border-nature-sky-800/60 font-bold">
                  v0.4
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden xl:block">
                {t('app.tagline')}
              </span>
            </div>
          </div>
        </div>

        {/* ── 4 Pillars Desktop Navigation Tabs (v0.4) ── */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono">
          <button
            onClick={() => onSelectPillar('diet')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'diet'
                ? 'bg-nature-amber-100 dark:bg-salud-amber text-nature-amber-900 dark:text-black font-bold border border-nature-amber-300 dark:border-transparent shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-nature-amber-600 dark:text-black" />
            <span>{t('pillar.diet')}</span>
          </button>

          <button
            onClick={() => onSelectPillar('exercise')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'exercise'
                ? 'bg-nature-sky-100 dark:bg-salud-cyan text-nature-sky-900 dark:text-black font-bold border border-nature-sky-300 dark:border-transparent shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-nature-sky-600 dark:text-black" />
            <span>{t('pillar.exercise')}</span>
          </button>

          <button
            onClick={() => onSelectPillar('sleep')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'sleep'
                ? 'bg-purple-100 dark:bg-purple-600 text-purple-900 dark:text-white font-bold border border-purple-300 dark:border-transparent shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-white/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-200" />
            <span>{t('pillar.sleep')}</span>
          </button>

          <button
            onClick={() => onSelectPillar('supplements')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'supplements'
                ? 'bg-nature-green-100 dark:bg-emerald-600 text-nature-green-900 dark:text-white font-bold border border-nature-green-300 dark:border-transparent shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-nature-green-600 dark:hover:text-emerald-300 hover:bg-white/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-nature-green-600 dark:text-emerald-200" />
            <span>{t('pillar.supplements')}</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Hub Shortcuts */}
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

          {onOpenAuditC && (
            <button
              onClick={onOpenAuditC}
              className="btn-tactile hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all font-mono text-xs"
              title={t('nav.audit_c_title')}
            >
              <ClipboardCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{t('nav.audit_c')}</span>
            </button>
          )}

          {/* Emergency Guide Alert */}
          <button
            onClick={onOpenEmergencyModal}
            className="btn-tactile flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/90 dark:bg-red-950/30 text-red-800 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all font-mono text-xs"
            title={t('nav.red_flags_title')}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-600 dark:text-red-400 animate-pulse" />
            <span className="hidden sm:inline">{t('nav.red_flags')}</span>
          </button>

          {/* Expert Council Trigger */}
          <button
            onClick={onOpenCouncil}
            className="btn-tactile flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-nature-amber-400 transition-all font-mono text-xs"
            title={t('nav.council_title')}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-nature-amber-600 dark:text-nature-amber-400" />
            <span className="hidden md:inline">{t('nav.council')}</span>
          </button>

          {/* Font Size Selector */}
          <FontSizeToggle variant="compact" />

          {/* Language Toggle Switcher */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
