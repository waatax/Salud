import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * v6.14 colour themes. Default is `light` (森林綠) for all visitors regardless of OS
 * dark-mode setting; readers can explicitly switch to `dark`, `ocean` (藍青),
 * `earth` (大地棕), `blossom` (櫻花粉), or `system` (跟隨系統).
 */
export type ThemeId = 'light' | 'dark' | 'ocean' | 'earth' | 'blossom';
export type ThemePreference = ThemeId | 'system';

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
  { id: 'light', label: '森林綠', hint: '預設主題・溫潤護眼、自然清透', swatch: ['#F5F9F6', '#FFFFFF', '#047857'], meta: '#F5F9F6' },
  { id: 'dark', label: '暗色', hint: '夜間閱讀、減少眩光', swatch: ['#0A110E', '#15231C', '#34D399'], meta: '#090E0C' },
  { id: 'ocean', label: '藍青', hint: '冷靜專注的海洋色調', swatch: ['#EEF6F9', '#FFFFFF', '#0D7D99'], meta: '#e6f2f7' },
  { id: 'earth', label: '棕色', hint: '溫暖紙本的大地色調', swatch: ['#F6F0E6', '#FFFDF9', '#8B552C'], meta: '#f3ebdf' },
  { id: 'blossom', label: '粉色', hint: '柔和溫馨的櫻花色調', swatch: ['#FDF5F8', '#FFFFFF', '#C42F72'], meta: '#fbeef3' },
];

const IDS = THEME_OPTIONS.map((t) => t.id) as string[];

interface ThemeContextType {
  theme: ThemeId;
  /** True when the reader is on a fixed theme (including the default Forest Green); false only when 'system' is chosen. */
  isExplicit: boolean;
  isDark: boolean;
  setTheme: (id: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Same key as v4.0; default when unset is 'light' (森林綠).
const KEY = 'salud-theme-choice';

const readSaved = (): ThemePreference => {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'system') return 'system';
    return v && IDS.includes(v) ? (v as ThemeId) : 'light';
  } catch {
    return 'light';
  }
};

const systemPrefersDark = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(readSaved);
  const [systemDark, setSystemDark] = useState<boolean>(systemPrefersDark);
  const theme: ThemeId = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  const isDark = theme === 'dark';
  const isExplicit = preference !== 'system';

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
    const meta = THEME_OPTIONS.find((t) => t.id === theme)?.meta ?? '#F5F9F6';
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
      m.setAttribute('content', meta);
    });
  }, [theme, isDark]);

  const setTheme = (id: ThemePreference) => {
    setPreference(id);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* storage unavailable: the choice lasts for this session only */
    }
  };

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, isExplicit, isDark, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
