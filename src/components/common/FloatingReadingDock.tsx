import React, { useState, useEffect } from 'react';
import { ArrowUp, Type } from 'lucide-react';
import { useFontSize } from '../../context/FontSizeContext';

interface Props {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

/**
 * FloatingReadingDock — ergonomic reading assistant for mobile and desktop.
 * Floats unobtrusively at bottom-right after scrolling, offering 1-tap font size
 * cycling and smooth scroll back to top.
 */
export const FloatingReadingDock: React.FC<Props> = () => {
  const [show, setShow] = useState(false);
  const { cycleFontSize, fontSizeLabel } = useFontSize();

  useEffect(() => {
    const onScroll = () => setShow((window.scrollY || document.documentElement.scrollTop) > 450);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed right-3.5 sm:right-6 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-24 lg:bottom-8 z-30 flex flex-col items-center gap-2 animate-fade-in"
      role="region"
      aria-label="快速閱讀工具"
    >
      <button
        onClick={cycleFontSize}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-md flex items-center justify-center hover:text-emerald-700 dark:hover:text-emerald-400 backdrop-blur-md btn-tactile"
        title={`調整字級大小（當前：${fontSizeLabel}）`}
        aria-label={`調整字級大小，當前：${fontSizeLabel}`}
      >
        <Type className="w-4 h-4 sm:w-5 sm:h-5 text-nature-sky-600 dark:text-nature-sky-400" aria-hidden="true" />
      </button>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-lg flex items-center justify-center hover:text-emerald-700 dark:hover:text-emerald-400 backdrop-blur-md btn-tactile"
        title="回到頂部"
        aria-label="回到頂部"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
      </button>
    </div>
  );
};
