import React from 'react';
import {
  Compass,
  PersonStanding,
  Salad,
  Footprints,
  Moon,
  ClipboardList,
  ShieldCheck,
  HeartPulse,
  Brain,
  LucideIcon,
} from 'lucide-react';
import { LearningIcon, LearningTone } from '../../types/learning';

export const LEARNING_ICONS: Record<LearningIcon, LucideIcon> = {
  compass: Compass,
  body: PersonStanding,
  food: Salad,
  move: Footprints,
  moon: Moon,
  report: ClipboardList,
  shield: ShieldCheck,
  heart: HeartPulse,
  brain: Brain,
};

/**
 * Tone → class sets. Written out in full so Tailwind's JIT sees every class name.
 * Each tone keeps text at AA contrast on its own tinted surface in both themes.
 */
export const TONE: Record<
  LearningTone,
  { chip: string; icon: string; bar: string; soft: string; ring: string; text: string }
> = {
  emerald: {
    chip: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800/70',
    icon: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950',
    bar: 'bg-emerald-600 dark:bg-emerald-400',
    soft: 'bg-emerald-50/70 dark:bg-emerald-950/25',
    ring: 'hover:border-emerald-400 dark:hover:border-emerald-600',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  sky: {
    chip: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800/70',
    icon: 'bg-sky-600 text-white dark:bg-sky-400 dark:text-sky-950',
    bar: 'bg-sky-600 dark:bg-sky-400',
    soft: 'bg-sky-50/70 dark:bg-sky-950/25',
    ring: 'hover:border-sky-400 dark:hover:border-sky-600',
    text: 'text-sky-700 dark:text-sky-300',
  },
  amber: {
    chip: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800/70',
    icon: 'bg-amber-500 text-amber-950 dark:bg-amber-400 dark:text-amber-950',
    bar: 'bg-amber-500 dark:bg-amber-400',
    soft: 'bg-amber-50/70 dark:bg-amber-950/25',
    ring: 'hover:border-amber-400 dark:hover:border-amber-600',
    text: 'text-amber-800 dark:text-amber-300',
  },
  rose: {
    chip: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800/70',
    icon: 'bg-rose-600 text-white dark:bg-rose-400 dark:text-rose-950',
    bar: 'bg-rose-600 dark:bg-rose-400',
    soft: 'bg-rose-50/70 dark:bg-rose-950/25',
    ring: 'hover:border-rose-400 dark:hover:border-rose-600',
    text: 'text-rose-700 dark:text-rose-300',
  },
  violet: {
    chip: 'bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:border-violet-800/70',
    icon: 'bg-violet-600 text-white dark:bg-violet-400 dark:text-violet-950',
    bar: 'bg-violet-600 dark:bg-violet-400',
    soft: 'bg-violet-50/70 dark:bg-violet-950/25',
    ring: 'hover:border-violet-400 dark:hover:border-violet-600',
    text: 'text-violet-700 dark:text-violet-300',
  },
  teal: {
    chip: 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/50 dark:text-teal-200 dark:border-teal-800/70',
    icon: 'bg-teal-600 text-white dark:bg-teal-400 dark:text-teal-950',
    bar: 'bg-teal-600 dark:bg-teal-400',
    soft: 'bg-teal-50/70 dark:bg-teal-950/25',
    ring: 'hover:border-teal-400 dark:hover:border-teal-600',
    text: 'text-teal-700 dark:text-teal-300',
  },
};

export const TrackIcon: React.FC<{ icon: LearningIcon; tone: LearningTone; size?: 'sm' | 'md' | 'lg' }> = ({
  icon,
  tone,
  size = 'md',
}) => {
  const Icon = LEARNING_ICONS[icon];
  const box = size === 'lg' ? 'w-12 h-12 rounded-2xl' : size === 'sm' ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl';
  const glyph = size === 'lg' ? 'w-6 h-6' : size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <span className={`${box} ${TONE[tone].icon} inline-flex items-center justify-center shrink-0`} aria-hidden="true">
      <Icon className={glyph} />
    </span>
  );
};

export const ProgressBar: React.FC<{ value: number; tone: LearningTone; label?: string }> = ({ value, tone, label }) => (
  <div
    className="h-1.5 w-full rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden"
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={Math.round(value)}
    aria-label={label}
  >
    <div className={`h-full rounded-full ${TONE[tone].bar} transition-all duration-500`} style={{ width: `${value}%` }} />
  </div>
);

/** Page-level heading block used by every learner page, so they share one rhythm. */
export const PageHeader: React.FC<{
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ eyebrow, title, lead, children }) => (
  <header className="space-y-3 pb-2">
    <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">{eyebrow}</p>
    <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-white text-balance">
      {title}
    </h1>
    {lead && <p className="text-[15px] leading-7 text-slate-600 dark:text-slate-300 max-w-3xl">{lead}</p>}
    {children}
  </header>
);

export const SectionTitle: React.FC<{ title: string; action?: React.ReactNode; id?: string }> = ({
  title,
  action,
  id,
}) => (
  <div className="flex items-end justify-between gap-3 mb-3">
    <h2 id={id} className="text-lg font-display font-bold text-slate-900 dark:text-white">
      {title}
    </h2>
    {action}
  </div>
);

export const formatYM = (ym: string) => {
  const [y, m] = ym.split('-');
  return `${y} 年 ${Number(m)} 月`;
};
