import React, { useState, useEffect } from 'react';
import { ArrowUp, Type, Sun, Moon } from 'lucide-react';
import { useFontSize } from '../../context/FontSizeContext';

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const FloatingReadingDock: React.FC<Props> = ({ isDark, onToggleTheme }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { fontSize, cycleFontSize, fontSizeLabel } = useFontSize();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setShowBackToTop(scrolled > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="閱讀輔助工具"
      className="fixed bottom-20 sm:bottom-8 right-4 sm:right-7 z-40 flex flex-col items-center gap-2 pointer-events-auto"
    >
      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="btn-tactile w-10 h-10 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-nature-sky-600 dark:hover:text-nature-sky-400 shadow-lg flex items-center justify-center transition-all group backdrop-blur-md"
          title="回到頂部 (Back to Top)"
          aria-label="回到頂部"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Font Size Quick Cycle */}
      <button
        onClick={cycleFontSize}
        className="btn-tactile w-10 h-10 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-nature-green-600 dark:hover:text-nature-green-400 shadow-lg flex flex-col items-center justify-center transition-all group backdrop-blur-md"
        title={`字型縮放：${fontSizeLabel}，點擊切換`}
        aria-label="切換字型大小"
      >
        <Type className="w-4 h-4 text-nature-sky-600 dark:text-nature-sky-400" />
        <span className="font-mono text-[9px] font-bold text-slate-500 dark:text-slate-400 -mt-0.5">
          {fontSize === 'standard' ? '100%' : fontSize === 'comfort' ? '115%' : '130%'}
        </span>
      </button>

      {/* Theme Quick Toggle */}
      <button
        onClick={onToggleTheme}
        className="btn-tactile w-10 h-10 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-nature-amber-600 dark:hover:text-nature-amber-400 shadow-lg flex items-center justify-center transition-all backdrop-blur-md"
        title={isDark ? '切換至亮面舒適閱讀模式' : '切換至暗面夜讀模式'}
        aria-label="切換亮暗主題"
      >
        {isDark ? <Sun className="w-4 h-4 text-nature-amber-400" /> : <Moon className="w-4 h-4 text-nature-sky-600" />}
      </button>
    </aside>
  );
};
