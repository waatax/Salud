import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface Props {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<Props> = ({ isDark, onToggle, className = '' }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative p-2 rounded-xl border border-salud-dark-border dark:border-salud-dark-border light:border-salud-light-border bg-salud-dark-card/60 dark:bg-salud-dark-card/60 light:bg-salud-light-card/80 hover:border-salud-amber/50 transition-all duration-200 group ${className}`}
      title={isDark ? '切換為溫潤紙本淺色模式' : '切換為未來深邃深色模式'}
      aria-label="切換深淺色主題"
    >
      <div className="flex items-center gap-1.5 text-xs font-mono font-medium">
        {isDark ? (
          <>
            <Sun className="w-4 h-4 text-salud-amber-400 group-hover:rotate-45 transition-transform" />
            <span className="text-slate-300 group-hover:text-salud-amber-300 hidden md:inline">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-salud-cyan-600 group-hover:-rotate-12 transition-transform" />
            <span className="text-slate-700 group-hover:text-salud-cyan-700 hidden md:inline">Dark</span>
          </>
        )}
      </div>
    </button>
  );
};
