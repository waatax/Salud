import React, { useEffect, useRef } from 'react';

export interface HubTab<T extends string> {
  id: T;
  label: string;
  icon: React.ElementType;
  /** Marks the tab most readers are looking for. */
  featured?: boolean;
}

export interface HubTabGroup<T extends string> {
  label: string;
  tabs: HubTab<T>[];
}

interface Props<T extends string> {
  groups: HubTabGroup<T>[];
  active: T;
  onChange: (tab: T) => void;
  ariaLabel: string;
}

/**
 * Grouped hub navigation. Phones get a single swipeable row that keeps the active tab in view;
 * wider screens wrap. Implements the tablist keyboard pattern (arrows, Home, End).
 */
export function HubTabBar<T extends string>({ groups, active, onChange, ariaLabel }: Props<T>) {
  const refs = useRef<Partial<Record<T, HTMLButtonElement | null>>>({});
  const rail = useRef<HTMLDivElement>(null);
  const flat = groups.flatMap((g) => g.tabs);

  useEffect(() => {
    // Only the rail scrolls sideways: scrollIntoView would also move the page on deep links.
    const el = refs.current[active];
    const box = rail.current;
    if (el && box && box.scrollWidth > box.clientWidth) box.scrollLeft = el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2;
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = flat.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % flat.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + flat.length) % flat.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = flat.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(flat[next].id);
    refs.current[flat[next].id]?.focus();
  };

  return (
    <div
      ref={rail}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className="relative -mx-1 flex gap-x-5 gap-y-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {groups.map((g) => (
        <div key={g.label} className="shrink-0">
          <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{g.label}</div>
          <div className="flex gap-1.5 md:flex-wrap">
            {g.tabs.map((t) => {
              const Icon = t.icon;
              const on = t.id === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    refs.current[t.id] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => onChange(t.id)}
                  className={`btn-tactile inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                    on
                      ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm dark:border-emerald-500 dark:bg-emerald-600'
                      : t.featured
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/70'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-700'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
