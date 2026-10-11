import React from 'react';
import { CheckCircle2, LucideIcon } from 'lucide-react';

/**
 * HubHero — v4.4 plain-language opening for every topic hub.
 *
 * The older hub headers led with specialist vocabulary (「超晝夜架構、膠淋巴大腦沖刷」).
 * A newcomer needs three things first: what this page is about in one sentence, what it
 * will help them do, and where to start. The hero gives every hub that same shape.
 */

export type HeroTone = 'emerald' | 'teal' | 'sky' | 'violet' | 'rose' | 'amber' | 'indigo';

const TONE: Record<HeroTone, { wrap: string; eyebrow: string; icon: string; stat: string }> = {
  emerald: {
    wrap: 'border-emerald-200/80 dark:border-emerald-900/60 from-emerald-50 via-white to-sky-50/60 dark:from-emerald-950/40 dark:via-salud-dark-card dark:to-slate-950',
    eyebrow: 'text-emerald-800 dark:text-emerald-300 bg-white/80 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    icon: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950',
    stat: 'text-emerald-700 dark:text-emerald-300',
  },
  teal: {
    wrap: 'border-teal-200/80 dark:border-teal-900/60 from-teal-50 via-white to-cyan-50/60 dark:from-teal-950/40 dark:via-salud-dark-card dark:to-slate-950',
    eyebrow: 'text-teal-800 dark:text-teal-300 bg-white/80 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    icon: 'bg-teal-600 text-white dark:bg-teal-400 dark:text-teal-950',
    stat: 'text-teal-700 dark:text-teal-300',
  },
  sky: {
    wrap: 'border-sky-200/80 dark:border-sky-900/60 from-sky-50 via-white to-indigo-50/50 dark:from-sky-950/40 dark:via-salud-dark-card dark:to-slate-950',
    eyebrow: 'text-sky-800 dark:text-sky-300 bg-white/80 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',
    icon: 'bg-sky-600 text-white dark:bg-sky-400 dark:text-sky-950',
    stat: 'text-sky-700 dark:text-sky-300',
  },
  violet: {
    wrap: 'border-violet-200/80 dark:border-violet-900/60 from-violet-50 via-white to-sky-50/50 dark:from-violet-950/40 dark:via-salud-dark-card dark:to-slate-950',
    eyebrow: 'text-violet-800 dark:text-violet-300 bg-white/80 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800',
    icon: 'bg-violet-600 text-white dark:bg-violet-400 dark:text-violet-950',
    stat: 'text-violet-700 dark:text-violet-300',
  },
  rose: {
    wrap: 'border-rose-200/80 dark:border-rose-900/60 from-rose-50 via-white to-amber-50/50 dark:from-rose-950/40 dark:via-salud-dark-card dark:to-slate-950',
    eyebrow: 'text-rose-800 dark:text-rose-300 bg-white/80 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    icon: 'bg-rose-600 text-white dark:bg-rose-400 dark:text-rose-950',
    stat: 'text-rose-700 dark:text-rose-300',
  },
  amber: {
    wrap: 'border-amber-200/80 dark:border-amber-900/60 from-amber-50 via-white to-emerald-50/50 dark:from-amber-950/30 dark:via-salud-dark-card dark:to-slate-950',
    eyebrow: 'text-amber-900 dark:text-amber-300 bg-white/80 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    icon: 'bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950',
    stat: 'text-amber-800 dark:text-amber-300',
  },
  indigo: {
    wrap: 'border-indigo-200/80 dark:border-indigo-900/60 from-indigo-50 via-white to-violet-50/50 dark:from-indigo-950/40 dark:via-salud-dark-card dark:to-slate-950',
    eyebrow: 'text-indigo-800 dark:text-indigo-300 bg-white/80 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
    icon: 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-indigo-950',
    stat: 'text-indigo-700 dark:text-indigo-300',
  },
};

export interface HeroStat {
  value: string;
  label: string;
}

export const HubHero: React.FC<{
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  helps?: string[];
  stats?: HeroStat[];
  tone?: HeroTone;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ icon: Icon, eyebrow, title, lead, helps, stats, tone = 'emerald', actions, children }) => {
  const t = TONE[tone];
  return (
    <section className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${t.wrap} px-5 py-6 sm:px-8 sm:py-8`}>
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <div className="flex-1 min-w-0 space-y-3.5">
          <p className={`inline-flex items-center gap-2 text-xs font-semibold border rounded-full px-3 py-1 ${t.eyebrow}`}>
            <span className={`w-5 h-5 rounded-md inline-flex items-center justify-center ${t.icon}`} aria-hidden="true">
              <Icon className="w-3.5 h-3.5" />
            </span>
            {eyebrow}
          </p>
          <h1 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 dark:text-white text-balance leading-tight">{title}</h1>
          <div className="text-[15px] sm:text-base leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{lead}</div>
          {helps && helps.length > 0 && (
            <ul className="grid gap-1.5 sm:grid-cols-2 max-w-3xl">
              {helps.map((h) => (
                <li key={h} className="flex gap-2 text-[14px] leading-relaxed text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className={`w-4 h-4 mt-1 shrink-0 ${t.stat}`} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          {actions && <div className="flex flex-wrap gap-2.5 pt-1">{actions}</div>}
          {children}
        </div>
        {stats && stats.length > 0 && (
          <dl className="grid grid-cols-2 gap-2.5 lg:w-72 shrink-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-white/85 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 px-3 py-2.5">
                <dt className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{s.label}</dt>
                <dd className={`text-xl font-display font-bold ${t.stat}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
};

/** Primary / secondary hero buttons, sized for touch (≥ 44px). */
export const HeroButton: React.FC<{ onClick: () => void; icon?: LucideIcon; primary?: boolean; children: React.ReactNode }> = ({
  onClick,
  icon: Icon,
  primary,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`btn-tactile inline-flex items-center gap-2 rounded-xl px-4 py-2.5 min-h-[44px] text-sm font-semibold transition-colors ${
      primary
        ? 'bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-emerald-950'
        : 'border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 hover:border-emerald-500'
    }`}
  >
    {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
    {children}
  </button>
);
