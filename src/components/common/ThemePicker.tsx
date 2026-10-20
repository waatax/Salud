import React, { useEffect, useRef, useState } from 'react';
import { Palette, Check, MonitorSmartphone } from 'lucide-react';
import { THEME_OPTIONS, useTheme } from '../../context/ThemeContext';

/**
 * ThemePicker — v5.0 replacement for the light/dark toggle. One button opens a small
 * menu of five colour themes (森林綠、暗色、藍青、棕色、粉色) plus「跟隨系統」.
 * Keyboard: arrow keys move, Enter/Space select, Escape closes and returns focus.
 */
export const ThemePicker: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, isExplicit, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const current = THEME_OPTIONS.find((t) => t.id === theme) ?? THEME_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    // Focus the active option when the menu opens.
    window.requestAnimationFrame(() => wrapRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus());
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onMenuKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  const pick = (id: Parameters<typeof setTheme>[0]) => {
    setTheme(id);
    setOpen(false);
    btnRef.current?.focus();
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`切換配色主題（目前：${current.label}）`}
        title="切換配色主題"
        className="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-emerald-700 text-xs font-semibold transition-colors"
      >
        <span className="relative w-4 h-4" aria-hidden="true">
          <Palette className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </span>
        <span className="hidden md:inline">{current.label}</span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label="配色主題"
          onKeyDown={onMenuKey}
          className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-salud-dark-card shadow-xl p-1.5 z-50 animate-fade-in"
        >
          <p className="px-2.5 pt-1.5 pb-1 text-[11px] font-bold tracking-wide text-slate-500 dark:text-slate-400">配色主題</p>
          {THEME_OPTIONS.map((t) => {
            const active = isExplicit && theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => pick(t.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  active ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800/70'
                }`}
              >
                <span className="relative w-9 h-9 shrink-0 rounded-xl overflow-hidden border border-black/10 dark:border-white/15" style={{ background: t.swatch[0] }} aria-hidden="true">
                  <span className="absolute left-1.5 top-1.5 right-1.5 h-3 rounded-[4px]" style={{ background: t.swatch[1] }} />
                  <span className="absolute left-1.5 bottom-1.5 w-4 h-2 rounded-full" style={{ background: t.swatch[2] }} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[14px] font-semibold text-slate-900 dark:text-white">{t.label}</span>
                  <span className="block text-[11.5px] text-slate-500 dark:text-slate-400 truncate">{t.hint}</span>
                </span>
                {active && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
          <button
            type="button"
            role="menuitemradio"
            aria-checked={!isExplicit}
            onClick={() => pick('system')}
            className={`w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              !isExplicit ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'hover:bg-slate-50 dark:hover:bg-slate-800/70'
            }`}
          >
            <span className="w-9 h-9 shrink-0 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center" aria-hidden="true">
              <MonitorSmartphone className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[14px] font-semibold text-slate-900 dark:text-white">跟隨系統</span>
              <span className="block text-[11.5px] text-slate-500 dark:text-slate-400">依裝置設定自動切換淺色／暗色</span>
            </span>
            {!isExplicit && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
};
