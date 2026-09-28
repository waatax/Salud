import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// v4.0 uses a new key: v3 wrote 'dark' on every mount, so the old key cannot tell an
// explicit choice from the forced default. Only a toggle writes this key.
const KEY = 'salud-theme-choice';

const readSaved = (): 'dark' | 'light' | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'dark' || v === 'light' ? v : null;
  } catch {
    return null;
  }
};

const systemPrefersDark = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 * v4.0: the theme follows the operating system until the reader picks one. Before,
 * every first visit was forced into dark mode and the default was written to storage
 * on mount, so the OS preference could never take effect.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [explicit, setExplicit] = useState<'dark' | 'light' | null>(readSaved);
  const [systemDark, setSystemDark] = useState<boolean>(systemPrefersDark);
  const isDark = explicit ? explicit === 'dark' : systemDark;

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setExplicit(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this session only */
    }
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
