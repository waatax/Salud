import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';

/**
 * RelatedNext — "what to read next" at the end of every hub (v4.4).
 *
 * A reader who finishes a page should never hit a dead end. Each hub hands off to
 * 3–4 neighbouring topics, which turns the site from a set of islands into a web.
 * Every hash here is checked by the dead-link test.
 */

export interface RelatedItem {
  hash: string;
  label: string;
  hint: string;
}

export const RelatedNext: React.FC<{ title?: string; items: RelatedItem[] }> = ({ title = '接下來可以學', items }) => {
  const { go } = useNavigation();
  return (
    <section aria-label={title} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 sm:p-5 no-print">
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white mb-3">
        <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        {title}
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <li key={it.hash}>
            <button
              type="button"
              onClick={() => go(it.hash)}
              className="group w-full h-full flex items-start justify-between gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 px-3.5 py-3 text-left hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors"
            >
              <span className="min-w-0">
                <span className="block font-semibold text-[14px] text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">{it.label}</span>
                <span className="block text-[12px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{it.hint}</span>
              </span>
              <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
