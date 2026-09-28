import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface Props {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

/**
 * FloatingReadingDock — v4.0 keeps only "back to top", and only after the reader has
 * scrolled. The font-size and theme buttons it used to carry duplicated the header
 * and sat on top of content on phones.
 */
export const FloatingReadingDock: React.FC<Props> = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow((window.scrollY || document.documentElement.scrollTop) > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-4 sm:right-6 bottom-24 lg:bottom-8 z-30 w-11 h-11 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-lg flex items-center justify-center hover:text-emerald-700 dark:hover:text-emerald-400 backdrop-blur-md animate-fade-in"
      aria-label="回到頂部"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};
