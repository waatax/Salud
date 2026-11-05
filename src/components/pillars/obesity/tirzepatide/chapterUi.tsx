import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, BookOpen, ChevronDown, ExternalLink, Info, Lightbulb, ShieldAlert } from 'lucide-react';
import { getTzpSource } from '../../../../data/tirzepatideData';

/** Reading layers shared by the tirzepatide chapter and the three-highs guide. */

export interface SectionDef {
  id: string;
  label: string;
}

/** Sticky section navigation with scroll-spy. Deep-linkable sections stay inside the hub's hash. */
export const SectionNav: React.FC<{ sections: SectionDef[]; ariaLabel: string }> = ({ sections, ariaLabel }) => {
  const [active, setActive] = useState(sections[0]?.id);
  const rail = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace(/^sec-/, ''));
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(`sec-${s.id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  useEffect(() => {
    // Only the rail scrolls sideways: scrollIntoView would also drag the page down to this bar on load.
    const el = document.getElementById(`nav-${active}`);
    const box = rail.current;
    if (el && box && box.scrollWidth > box.clientWidth) box.scrollLeft = el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2;
  }, [active]);

  const go = (id: string) => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  };

  const index = Math.max(0, sections.findIndex((s) => s.id === active));

  return (
    <nav aria-label={ariaLabel} className="sticky top-16 z-20 -mx-1 border-b border-slate-200 bg-salud-light-bg px-1 py-2 dark:border-slate-800 dark:bg-salud-dark-bg" data-print-hide>
      <ol ref={rail} className="relative flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <button
                id={`nav-${s.id}`}
                type="button"
                onClick={() => go(s.id)}
                aria-current={on ? 'true' : undefined}
                className={`inline-flex min-h-[36px] items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 ${
                  on
                    ? 'bg-emerald-700 font-semibold text-white dark:bg-emerald-600'
                    : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`text-xs tabular-nums ${on ? 'text-emerald-100' : 'text-slate-400'}`}>{i + 1}</span>
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden="true">
        <div className="h-full rounded-full bg-emerald-600 transition-[width] duration-300" style={{ width: `${((index + 1) / sections.length) * 100}%` }} />
      </div>
    </nav>
  );
};

/** A chapter section: number, question-shaped title, then the one-sentence answer first. */
export const Section: React.FC<{
  id: string;
  n: number;
  title: string;
  answer: string;
  children: React.ReactNode;
}> = ({ id, n, title, answer, children }) => (
  <section id={`sec-${id}`} aria-labelledby={`h-${id}`} className="scroll-mt-32 space-y-4">
    <header className="space-y-2">
      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">第 {n} 節</p>
      <h2 id={`h-${id}`} className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
        {title}
      </h2>
      <p className="max-w-3xl border-l-4 border-emerald-500 pl-3 text-base font-medium leading-relaxed text-slate-800 dark:text-slate-100">{answer}</p>
    </header>
    {children}
  </section>
);

export const Panel: React.FC<{ title?: string; hint?: string; children: React.ReactNode; className?: string }> = ({ title, hint, children, className = '' }) => (
  <div className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-salud-dark-surface sm:p-5 ${className}`}>
    {title && <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">{title}</h3>}
    {hint && <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{hint}</p>}
    <div className={title || hint ? 'mt-3' : ''}>{children}</div>
  </div>
);

const CALLOUT = {
  info: { Icon: Info, cls: 'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100', icon: 'text-sky-700 dark:text-sky-400' },
  tip: { Icon: Lightbulb, cls: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100', icon: 'text-emerald-700 dark:text-emerald-400' },
  warn: { Icon: AlertTriangle, cls: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100', icon: 'text-amber-700 dark:text-amber-400' },
  danger: { Icon: ShieldAlert, cls: 'border-red-300 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100', icon: 'text-red-700 dark:text-red-400' },
} as const;

export const Callout: React.FC<{ tone?: keyof typeof CALLOUT; title?: string; children: React.ReactNode; className?: string }> = ({ tone = 'info', title, children, className = '' }) => {
  const c = CALLOUT[tone];
  const Icon = c.Icon;
  return (
    <div className={`flex gap-2.5 rounded-xl border p-3 text-sm leading-relaxed sm:p-4 ${c.cls} ${className}`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${c.icon}`} aria-hidden="true" />
      <div>
        {title && <div className="font-bold">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

/** The third reading layer: closed by default so plain-language readers are never slowed down. */
export const DeepDive: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <details className="group rounded-xl border border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/50">
    <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-slate-200 [&::-webkit-details-marker]:hidden">
      <BookOpen className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
      <span className="flex-1">{title}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className="space-y-2 px-3 pb-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{children}</div>
  </details>
);

/** Small, numbered-free citation row. Every source is a real link. */
export const Refs: React.FC<{ ids: string[] }> = ({ ids }) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
    <span>依據：</span>
    {ids.map((id) => {
      const s = getTzpSource(id);
      return (
        <a key={id} href={s.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-0.5 underline decoration-slate-300 underline-offset-2 hover:text-emerald-700 dark:decoration-slate-600 dark:hover:text-emerald-400">
          {s.label}
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only">（開新視窗）</span>
        </a>
      );
    })}
  </p>
);

export interface ChoiceOption<T extends string | number> {
  value: T;
  label: string;
}

/** Radio group styled as buttons; large targets on phones. */
export function Choice<T extends string | number>({
  legend,
  options,
  value,
  onChange,
  columns = 1,
}: {
  legend: string;
  options: ChoiceOption<T>[];
  value: T;
  onChange: (v: T) => void;
  columns?: 1 | 2 | 3 | 6;
}) {
  const grid = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 6: 'grid-cols-3 sm:grid-cols-6' }[columns];
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">{legend}</legend>
      <div role="radiogroup" className={`grid gap-1.5 ${grid}`}>
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`btn-tactile min-h-[44px] rounded-xl border px-3 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                on
                  ? 'border-emerald-700 bg-emerald-700 font-semibold text-white dark:border-emerald-500 dark:bg-emerald-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Numeric field that tolerates being empty while typing; reports `undefined` until valid. */
export const NumberField: React.FC<{
  label: string;
  unit: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}> = ({ label, unit, value, onChange, min, max, step, placeholder }) => (
  <label className="block">
    <span className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</span>
    <span className="flex items-center rounded-xl border border-slate-300 bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 dark:border-slate-700 dark:bg-slate-900">
      <input
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(e) => {
          const n = e.target.value === '' ? undefined : Number(e.target.value);
          onChange(n !== undefined && Number.isFinite(n) ? n : undefined);
        }}
        className="min-h-[44px] w-full min-w-0 rounded-xl bg-transparent px-3 py-2 text-base tabular-nums text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
      />
      <span className="shrink-0 pr-3 text-sm text-slate-500 dark:text-slate-400">{unit}</span>
    </span>
  </label>
);

/** A compact accessible table with horizontal scroll on phones. */
export const DataTable: React.FC<{ caption: string; head: string[]; rows: (string | number)[][]; align?: ('left' | 'right')[] }> = ({ caption, head, rows, align }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
    <table className="w-full min-w-[420px] border-collapse text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-slate-50 text-left text-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <tr>
          {head.map((h, i) => (
            <th key={h} scope="col" className={`whitespace-nowrap px-3 py-2 font-semibold ${align?.[i] === 'right' ? 'text-right' : ''}`}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri} className="border-t border-slate-200 dark:border-slate-800">
            {r.map((c, ci) =>
              ci === 0 ? (
                <th key={ci} scope="row" className="min-w-[6rem] px-3 py-2 text-left font-medium text-slate-900 dark:text-slate-100">
                  {c}
                </th>
              ) : (
                <td key={ci} className={`px-3 py-2 text-slate-700 dark:text-slate-300 ${align?.[ci] === 'right' ? 'text-right tabular-nums' : ''}`}>
                  {c}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
