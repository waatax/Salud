import React from 'react';
import { ArrowRight, BookOpen, Rocket } from 'lucide-react';
import type { HubPrimer } from '../../data/hubPrimers';

/**
 * HubHero — the calm, plain-language opening shared by the specialist hubs (v6.4).
 *
 * Order follows how a non-specialist reads: what is this page → three things worth knowing →
 * an easy place to start → the depth below. `compact` keeps only the heading, for sub-pages
 * where the reader has already chosen a topic and the primer would push content down.
 */
export const HubHero: React.FC<{ primer: HubPrimer; compact?: boolean }> = ({ primer, compact = false }) => {
  const StarterIcon = primer.starter?.kind === 'plan' ? Rocket : BookOpen;

  return (
    <header className="hub-hero rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-9">
      <p className="discovery-eyebrow">{primer.eyebrow}</p>
      <h1 className="mt-2 font-display text-2xl sm:text-[2rem] sm:leading-[1.25] font-bold tracking-tight text-slate-900 dark:text-white">
        {primer.title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">{primer.lead}</p>

      {!compact && (
        <>
          <section aria-labelledby="hub-takeaways-h" className="mt-7">
            <h2 id="hub-takeaways-h" className="text-sm font-semibold text-slate-900 dark:text-white">
              先知道這三件事
            </h2>
            <ol className="mt-3 grid gap-3 md:grid-cols-3">
              {primer.takeaways.map((text, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-7 text-slate-700 dark:text-slate-300">{text}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            {primer.starter ? (
              <a href={`#${primer.starter.hash}`} className="discovery-text-link text-left">
                <StarterIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {primer.starter.kind === 'plan' ? '想照著做：' : '想從簡單的開始？先讀小課：'}
                  {primer.starter.label}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <span />
            )}
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              完整內容在下方，挑有興趣的讀就好。
            </p>
          </div>
        </>
      )}
    </header>
  );
};
