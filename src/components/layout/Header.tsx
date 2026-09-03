import React from 'react';
import { ThemeToggle } from '../common/ThemeToggle';
import { ShieldCheck, Flame, Droplets, AlertOctagon, HelpCircle, Menu } from 'lucide-react';

interface Props {
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenCouncil: () => void;
  onOpenEmergencyModal: () => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<Props> = ({
  currentChapterId,
  onSelectChapter,
  isDark,
  onToggleTheme,
  onOpenCouncil,
  onOpenEmergencyModal,
  onToggleMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-salud-dark-border/80 dark:border-salud-dark-border/80 light:border-salud-light-border/80 bg-salud-dark-bg/85 dark:bg-salud-dark-bg/85 light:bg-salud-light-bg/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Chapter selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white lg:hidden"
            aria-label="打開選單"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo with futuristic warm glow */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectChapter('W')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-salud-amber-400 via-salud-coral to-salud-cyan-500 p-0.5 shadow-warm-glow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-salud-amber-400 font-bold font-display text-sm">
                S
              </div>
            </div>
            <div>
              <span className="text-base font-display font-extrabold tracking-tight text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text flex items-center gap-1.5">
                Salud
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-salud-amber/20 text-salud-amber-400 border border-salud-amber/40 font-semibold">
                  v0.2
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
                Evidence-Based Simulation & Knowledge
              </span>
            </div>
          </div>
        </div>

        {/* Chapter Quick Switcher Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => onSelectChapter('W')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentChapterId === 'W'
                ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Chapter W · 水與體液</span>
          </button>
          <button
            onClick={() => onSelectChapter('O')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentChapterId === 'O'
                ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Chapter O · 脂肪與油</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Emergency Guide Alert */}
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-red-500/40 bg-red-950/30 text-red-300 hover:bg-red-900/40 transition-all font-mono text-xs"
            title="醫療急症紅旗清單 (Red Flags)"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span className="hidden sm:inline">紅旗警訊</span>
          </button>

          {/* Expert Council Trigger */}
          <button
            onClick={onOpenCouncil}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-salud-dark-border bg-salud-dark-card/60 text-slate-300 hover:border-salud-amber/60 hover:text-salud-amber-300 transition-all font-mono text-xs"
            title="查看 22 席專家治理結構"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-salud-amber-400" />
            <span className="hidden lg:inline">22 席專家治理</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
