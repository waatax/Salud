import React, { useState } from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageToggle } from '../common/LanguageToggle';
import { FontSizeToggle } from '../common/FontSizeToggle';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { GrandCouncilManifestoModal } from '../council/GrandCouncilManifestoModal';
import {
  Menu,
  HeartPulse,
  Pill,
  Utensils,
  Activity,
  Moon,
  Sparkles,
  Wind,
  Scale,
  Hourglass,
  Award,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  activePillar: HealthPillar;
  onSelectPillar: (pillar: HealthPillar) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCardioHub?: () => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<Props> = ({
  activePillar,
  onSelectPillar,
  isDark,
  onToggleTheme,
  onOpenCardioHub,
  onToggleMobileSidebar,
}) => {
  const { t, language } = useLanguage();
  const [isManifestoOpen, setIsManifestoOpen] = useState<boolean>(false);

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
            onClick={() => onSelectPillar('systems')}
            title="回到健康生活起點 · 人體系統主頁"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-salud-cyan via-nature-green-500 to-nature-amber-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[9px] flex items-center justify-center text-salud-cyan dark:text-salud-cyan font-bold font-display text-sm">
                S
              </div>
            </div>
            <div>
              <span className="text-base font-display font-extrabold tracking-tight text-slate-900 dark:text-salud-dark-text flex items-center gap-1.5">
                Salud
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsManifestoOpen(true);
                  }}
                  title="查看 Salud v1.1.0 全人健康長壽大憲章與 40 席專家理事會簽署"
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-salud-cyan/20 text-salud-cyan dark:text-salud-cyan border border-salud-cyan/40 font-bold hover:bg-salud-cyan/30 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>v1.1.0</span>
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                </button>
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden xl:block">
                {t('app.tagline')}
              </span>
            </div>
          </div>
        </div>

        {/* ── Desktop Navigation Tabs ── */}
        <nav className="hidden md:flex items-center gap-1 bg-emerald-50/50 dark:bg-[#0F1714] p-1 rounded-2xl border border-emerald-100 dark:border-[#1C2E25] text-xs font-mono">
          {/* 1. Human Body Systems (Home) */}
          <button
            onClick={() => onSelectPillar('systems')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'systems'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <HeartPulse className={`w-3.5 h-3.5 ${activePillar === 'systems' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
            <span>人體系統</span>
          </button>

          {/* 2. Personal Ultra-Health Project (New Flagship) */}
          <button
            onClick={() => onSelectPillar('ultrahealth')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'ultrahealth'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${activePillar === 'ultrahealth' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'} animate-pulse`} />
            <span className="font-bold">個人超健康</span>
          </button>

          {/* 3. Obesity & Weight Management Hub */}
          <button
            onClick={() => onSelectPillar('obesity')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'obesity'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <Scale className={`w-3.5 h-3.5 ${activePillar === 'obesity' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
            <span>肥胖與減重</span>
          </button>

          {/* 4. Longevity & Anti-Aging Hub */}
          <button
            onClick={() => onSelectPillar('longevity')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'longevity'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <Hourglass className={`w-3.5 h-3.5 ${activePillar === 'longevity' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
            <span>抗老化</span>
          </button>

          {/* 5. Diet & Nutrition (Contains Nutrients & Supplements) */}
          <button
            onClick={() => onSelectPillar('diet')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'diet' || activePillar === 'supplements'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <Utensils className={`w-3.5 h-3.5 ${activePillar === 'diet' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
            <span>飲食與營養</span>
          </button>

          {/* 6. Exercise Science */}
          <button
            onClick={() => onSelectPillar('exercise')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'exercise'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${activePillar === 'exercise' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
            <span>{t('pillar.exercise')}</span>
          </button>

          {/* 7. Sleep & Glymphatic */}
          <button
            onClick={() => onSelectPillar('sleep')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'sleep'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <Moon className={`w-3.5 h-3.5 ${activePillar === 'sleep' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
            <span>{t('pillar.sleep')}</span>
          </button>

          {/* 8. Mental Health & Breathwork */}
          <button
            onClick={() => onSelectPillar('mental')}
            className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activePillar === 'mental'
                ? 'bg-emerald-600 text-white font-bold shadow-emerald-glow'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white/80 dark:hover:bg-[#141F1A]'
            }`}
          >
            <Wind className={`w-3.5 h-3.5 ${activePillar === 'mental' ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
            <span>心理呼吸</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Jump to Bottom Expert Zone */}
          <a
            href="#expert-zone"
            className="btn-tactile hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold transition-all shadow-xs"
            title="直達最下方專家專區 (40 席專科清單)"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>專家專區</span>
          </a>

          {/* v1.0 Charter & RPDCA Manifesto Shortcut */}
          <button
            onClick={() => setIsManifestoOpen(true)}
            className="btn-tactile hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300/80 dark:border-emerald-800 bg-emerald-100/60 dark:bg-emerald-950/60 hover:bg-emerald-200 text-emerald-900 dark:text-emerald-300 transition-all font-mono text-xs font-bold shadow-xs cursor-pointer"
            title="查看 Salud v1.1.0 全人健康長壽大憲章 (40 席理事會簽署)"
          >
            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>v1.1 專家憲章</span>
          </button>

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

          {/* Font Size Selector */}
          <FontSizeToggle variant="compact" />

          {/* Language Toggle Switcher */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* v1.0 Grand Council Manifesto Modal */}
      <GrandCouncilManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />
    </header>
  );
};
