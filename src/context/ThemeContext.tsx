import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * v5.0 colour themes. `light` (森林綠) and `dark` are the original pair; `ocean` (藍青),
 * `earth` (大地棕) and `blossom` (櫻花粉) are light themes that remap the slate / emerald /
 * teal channels in index.css through `data-theme`. With no explicit choice the theme
 * follows the operating system's light/dark preference, as in v4.
 */
export type ThemeId = 'light' | 'dark' | 'ocean' | 'earth' | 'blossom';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  hint: string;
  /** Swatch colours: background, surface, accent. */
  swatch: [string, string, string];
  /** Browser UI colour (meta theme-color). */
  meta: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'light', label: '森林綠', hint: '預設淺色，清爽自然', swatch: ['#F8FAF8', '#FFFFFF', '#059669'], meta: '#ffffff' },
  { id: 'dark', label: '暗色', hint: '夜間閱讀、減少眩光', swatch: ['#0A110E', '#15231C', '#34D399'], meta: '#090E0C' },
  { id: 'ocean', label: '藍青', hint: '冷靜專注的海洋色調', swatch: ['#EEF6F9', '#FFFFFF', '#0D7D99'], meta: '#e6f2f7' },
  { id: 'earth', label: '棕色', hint: '溫暖紙本的大地色調', swatch: ['#F6F0E6', '#FFFDF9', '#8B552C'], meta: '#f3ebdf' },
  { id: 'blossom', label: '粉色', hint: '柔和溫馨的櫻花色調', swatch: ['#FDF5F8', '#FFFFFF', '#C42F72'], meta: '#fbeef3' },
];

const IDS = THEME_OPTIONS.map((t) => t.id) as string[];

interface ThemeContextType {
  theme: ThemeId;
  /** True when the reader picked a theme; false while following the OS. */
  isExplicit: boolean;
  isDark: boolean;
  setTheme: (id: ThemeId | 'system') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Same key as v4.0, which stored only 'dark' | 'light'; those values stay valid.
const KEY = 'salud-theme-choice';

const readSaved = (): ThemeId | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v && IDS.includes(v) ? (v as ThemeId) : null;
  } catch {
    return null;
  }
};

const systemPrefersDark = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [explicit, setExplicit] = useState<ThemeId | null>(readSaved);
  const [systemDark, setSystemDark] = useState<boolean>(systemPrefersDark);
  const theme: ThemeId = explicit ?? (systemDark ? 'dark' : 'light');
  const isDark = theme === 'dark';

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
    if (theme === 'light' || theme === 'dark') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    const meta = THEME_OPTIONS.find((t) => t.id === theme)?.meta;
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
      const fallback = m.getAttribute('media')?.includes('dark') ? '#090E0C' : '#ffffff';
      m.setAttribute('content', explicit && meta ? meta : fallback);
    });
  }, [theme, isDark, explicit]);

  const setTheme = (id: ThemeId | 'system') => {
    const next = id === 'system' ? null : id;
    setExplicit(next);
    try {
      if (next) localStorage.setItem(KEY, next);
      else localStorage.removeItem(KEY);
    } catch {
      /* storage unavailable: the choice lasts for this session only */
    }
  };

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, isExplicit: explicit !== null, isDark, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
