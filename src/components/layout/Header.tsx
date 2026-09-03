import React from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from '../common/LanguageToggle';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import {
  ShieldCheck,
  Flame,
  Droplets,
  Wine,
  AlertOctagon,
  HelpCircle,
  Menu,
  HeartPulse,
  Pill,
  ClipboardCheck,
  Utensils,
  Activity,
  Moon
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
    <header className="sticky top-0 z-40 w-full border-b border-salud-light-border/80 dark:border-salud-dark-border/80 bg-salud-light-bg/85 dark:bg-salud-dark-bg/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand & Chapter selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white lg:hidden"
            aria-label={t('nav.open_menu')}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectPillar('diet')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-salud-amber-400 via-salud-coral to-salud-cyan-500 p-0.5 shadow-warm-glow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-salud-amber-400 font-bold font-display text-sm">
                S
              </div>
            </div>
            <div>
              <span className="text-base font-display font-extrabold tracking-tight text-salud-light-text dark:text-salud-dark-text flex items-center gap-1.5">
                Salud
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-salud-cyan/20 text-salud-cyan-600 dark:text-salud-cyan-300 border border-salud-cyan/40 font-bold">
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
        <div className="hidden md:flex items-center gap-1 bg-slate-200/70 dark:bg-slate-900/60 p-1 rounded-2xl border border-slate-300/80 dark:border-slate-800 text-xs font-mono">
          <button
            onClick={() => onSelectPillar('diet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'diet'
                ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{t('pillar.diet')}</span>
          </button>

          <button
            onClick={() => onSelectPillar('exercise')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'exercise'
                ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t('pillar.exercise')}</span>
          </button>

          <button
            onClick={() => onSelectPillar('sleep')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'sleep'
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-purple-400 dark:hover:text-purple-300'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>{t('pillar.sleep')}</span>
          </button>

          <button
            onClick={() => onSelectPillar('supplements')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'supplements'
                ? 'bg-emerald-600 text-white font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-400 dark:hover:text-emerald-300'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>{t('pillar.supplements')}</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Hub Shortcuts */}
          {onOpenCardioHub && (
            <button
              onClick={onOpenCardioHub}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-salud-light-border dark:border-salud-dark-border bg-salud-light-card/80 dark:bg-salud-dark-card/60 text-slate-700 dark:text-slate-300 hover:text-salud-cyan transition-all font-mono text-xs"
              title={t('nav.cardio_hub_title')}
            >
              <HeartPulse className="w-3.5 h-3.5 text-salud-cyan" />
              <span>{t('nav.cardio_hub')}</span>
            </button>
          )}

          {onOpenAuditC && (
            <button
              onClick={onOpenAuditC}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-purple-500/40 bg-purple-100/70 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200/70 dark:hover:bg-purple-900/40 transition-all font-mono text-xs"
              title={t('nav.audit_c_title')}
            >
              <ClipboardCheck className="w-3.5 h-3.5 text-purple-500" />
              <span>{t('nav.audit_c')}</span>
            </button>
          )}

          {/* Emergency Guide Alert */}
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-red-500/40 bg-red-100/80 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-200/70 dark:hover:bg-red-900/40 transition-all font-mono text-xs"
            title={t('nav.red_flags_title')}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-500 dark:text-red-400 animate-pulse" />
            <span className="hidden sm:inline">{t('nav.red_flags')}</span>
          </button>

          {/* Expert Council Trigger (24 seats) */}
          <button
            onClick={onOpenCouncil}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-salud-light-border dark:border-salud-dark-border bg-salud-light-card/80 dark:bg-salud-dark-card/60 text-slate-700 dark:text-slate-300 hover:border-salud-amber/60 hover:text-salud-amber-600 dark:hover:text-salud-amber-300 transition-all font-mono text-xs"
            title={t('nav.council_title')}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-salud-amber-500 dark:text-salud-amber-400" />
            <span className="hidden md:inline">{t('nav.council')}</span>
          </button>

          {/* Language Toggle Switcher */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
