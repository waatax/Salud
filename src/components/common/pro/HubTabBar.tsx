import React, { useEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';

/**
 * HubTabBar — v4.4 shared tab bar for every topic hub.
 *
 * Before v4.4 each hub hand-wrote 6–9 tab buttons with its own colours, wrapping into
 * three or four rows on a phone and exposing no tab semantics to screen readers. This
 * one component gives every hub the same behaviour:
 *   - WAI-ARIA tabs: role=tablist/tab, aria-selected, roving tabindex, ←/→/Home/End.
 *   - One scrollable row on small screens (the active tab is scrolled into view),
 *     wrapping freely on wide screens.
 *   - Sticky under the site header, so the chapter list stays reachable on long pages.
 *   - Optional chapter numbers and "done" ticks for hubs that read as a course.
 */

export type HubTabTone = 'emerald' | 'teal' | 'sky' | 'indigo' | 'violet' | 'purple' | 'amber' | 'orange' | 'rose' | 'slate';

export interface HubTab<T extends string> {
  id: T;
  label: string;
  icon?: LucideIcon;
  tone?: HubTabTone;
}

// Written out in full so Tailwind's JIT keeps every class.
const ACTIVE: Record<HubTabTone, string> = {
  emerald: 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950',
  teal: 'bg-teal-700 border-teal-700 text-white dark:bg-teal-400 dark:border-teal-400 dark:text-teal-950',
  sky: 'bg-sky-700 border-sky-700 text-white dark:bg-sky-400 dark:border-sky-400 dark:text-sky-950',
  indigo: 'bg-indigo-700 border-indigo-700 text-white dark:bg-indigo-400 dark:border-indigo-400 dark:text-indigo-950',
  violet: 'bg-violet-700 border-violet-700 text-white dark:bg-violet-400 dark:border-violet-400 dark:text-violet-950',
  purple: 'bg-purple-700 border-purple-700 text-white dark:bg-purple-400 dark:border-purple-400 dark:text-purple-950',
  amber: 'bg-amber-500 border-amber-500 text-amber-950 dark:bg-amber-400 dark:border-amber-400 dark:text-amber-950',
  orange: 'bg-orange-700 border-orange-700 text-white dark:bg-orange-400 dark:border-orange-400 dark:text-orange-950',
  rose: 'bg-rose-700 border-rose-700 text-white dark:bg-rose-400 dark:border-rose-400 dark:text-rose-950',
  slate: 'bg-slate-800 border-slate-800 text-white dark:bg-slate-200 dark:border-slate-200 dark:text-slate-900',
};

interface Props<T extends string> {
  tabs: HubTab<T>[];
  active: T;
  onChange: (id: T) => void;
  ariaLabel: string;
  /** Default tone for tabs that do not set their own. */
  tone?: HubTabTone;
  /** Prefix each tab with its 1-based chapter number. */
  numbered?: boolean;
  /** Tab ids the reader has finished; shown with a tick. */
  done?: readonly string[];
  /** Id prefix used to link tabs to their panel (`<prefix>-panel`). */
  idPrefix?: string;
  sticky?: boolean;
  className?: string;
  /** Tab ids that open a new unit; a thin divider is drawn before each. */
  groupStarts?: readonly string[];
}

export function HubTabBar<T extends string>({
  tabs,
  active,
  onChange,
  ariaLabel,
  tone = 'emerald',
  numbered = false,
  done = [],
  idPrefix = 'hub',
  sticky = true,
  className = '',
  groupStarts = [],
}: Props<T>) {
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the selected tab visible inside the horizontal scroller.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${active}"]`);
    if (!el || !listRef.current) return;
    const list = listRef.current;
    if (list.scrollWidth <= list.clientWidth) return;
    const left = el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2;
    list.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(tabs[next].id);
    window.requestAnimationFrame(() => {
      listRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${tabs[next].id}"]`)?.focus();
    });
  };

  return (
    <div
      className={`${
        sticky ? 'sticky top-16 z-30 -mx-3.5 sm:-mx-8 px-3.5 sm:px-8' : ''
      } py-2 bg-salud-light-bg/90 dark:bg-salud-dark-bg/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 no-print ${className}`}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="flex gap-1.5 overflow-x-auto scrollbar-none snap-x lg:flex-wrap lg:overflow-visible"
      >
        {tabs.map((t, i) => {
          const selected = t.id === active;
          const finished = done.includes(t.id);
          const Icon = t.icon;
          return (
            <React.Fragment key={t.id}>
            {groupStarts.includes(t.id) && <span className="shrink-0 self-stretch w-px my-1 mx-0.5 bg-slate-300 dark:bg-slate-700" aria-hidden="true" />}
            <button
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${t.id}`}
              data-tab-id={t.id}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(t.id)}
              className={`btn-tactile snap-start shrink-0 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[13px] leading-none whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-emerald-500 ${
                selected
                  ? `${ACTIVE[t.tone ?? tone]} font-semibold shadow-sm`
                  : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {numbered && (
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold tabular-nums ${
                    selected ? 'bg-white/25 dark:bg-black/15' : finished ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                  aria-hidden="true"
                >
                  {finished && !selected ? <Check className="w-3 h-3" /> : i + 1}
                </span>
              )}
              {!numbered && Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
              <span>{t.label}</span>
              {finished && <span className="sr-only">（已讀）</span>}
            </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
