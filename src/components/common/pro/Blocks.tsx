import React, { createContext, useContext } from 'react';
import { AlertOctagon, Lightbulb, HelpCircle, BookOpenCheck, Info, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Target } from 'lucide-react';

/**
 * Blocks — v4.4 small, shared reading blocks used by the course-style hubs.
 * They carry meaning with an icon and a label as well as colour (WCAG 1.4.1).
 */

// ── Chapter numbering ─────────────────────────────────────────────────────────

/**
 * The 1-based number of the chapter being shown. CourseShell provides it so figure and
 * table labels written as 「圖 3-1」/「表 3-1」 always carry the chapter's real position,
 * even after chapters are added or reordered.
 */
export const ChapterNumberContext = createContext<number | null>(null);

const LABEL_RE = /^([圖表])\s*\d+-(\d+)/;

/** Rewrite a leading 「圖 x-y」/「表 x-y」 so x is the current chapter number. */
export function useChapterLabel(label?: string): string | undefined {
  const chapter = useContext(ChapterNumberContext);
  if (!label || chapter == null) return label;
  return label.replace(LABEL_RE, (_m, kind: string, n: string) => `${kind} ${chapter}-${n}`);
}

// ── Figure frame ───────────────────────────────────────────────────────────

export const FigureFrame: React.FC<{
  /** e.g. 「圖 2-1」 */
  number?: string;
  title: string;
  caption?: React.ReactNode;
  source?: string;
  /** Shown as a small note under the figure; defaults to the schematic disclaimer. */
  note?: string | false;
  children: React.ReactNode;
  className?: string;
}> = ({ number: rawNumber, title, caption, source, note, children, className = '' }) => {
  const number = useChapterLabel(rawNumber);
  return (
  <figure
    className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 sm:p-5 space-y-3 print-avoid-break ${className}`}
  >
    <div className="flex items-baseline gap-2">
      {number && (
        <span className="shrink-0 text-[11px] font-bold tracking-wide text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-md px-1.5 py-0.5">
          {number}
        </span>
      )}
      <h3 className="text-[15px] font-bold text-slate-900 dark:text-white leading-snug">{title}</h3>
    </div>
    <div className="w-full">{children}</div>
    {(caption || source || note !== false) && (
      <figcaption className="space-y-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-2.5">
        {caption && <p>{caption}</p>}
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          {note !== false && <span>{note ?? '示意圖，比例經簡化以利理解。'}</span>}
          {source && <span>{note !== false ? ' ' : ''}依據：{source}</span>}
        </p>
      </figcaption>
    )}
  </figure>
  );
};

// ── Callouts ────────────────────────────────────────────────────────────────

type CalloutKind = 'redflag' | 'tip' | 'myth' | 'evidence' | 'note';

const CALLOUT: Record<CalloutKind, { icon: typeof Info; label: string; box: string; iconCls: string }> = {
  redflag: {
    icon: AlertOctagon,
    label: '危險警訊',
    box: 'border-rose-300 dark:border-rose-800/70 bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100',
    iconCls: 'text-rose-600 dark:text-rose-400',
  },
  tip: {
    icon: Lightbulb,
    label: '實用建議',
    box: 'border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/70 dark:bg-emerald-950/25 text-emerald-950 dark:text-emerald-100',
    iconCls: 'text-emerald-600 dark:text-emerald-400',
  },
  myth: {
    icon: HelpCircle,
    label: '常見迷思',
    box: 'border-amber-200 dark:border-amber-800/70 bg-amber-50/70 dark:bg-amber-950/25 text-amber-950 dark:text-amber-100',
    iconCls: 'text-amber-600 dark:text-amber-400',
  },
  evidence: {
    icon: BookOpenCheck,
    label: '研究怎麼說',
    box: 'border-sky-200 dark:border-sky-800/70 bg-sky-50/70 dark:bg-sky-950/25 text-sky-950 dark:text-sky-100',
    iconCls: 'text-sky-600 dark:text-sky-400',
  },
  note: {
    icon: Info,
    label: '說明',
    box: 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200',
    iconCls: 'text-slate-500 dark:text-slate-400',
  },
};

export const Callout: React.FC<{ kind: CalloutKind; title?: string; children: React.ReactNode; className?: string }> = ({
  kind,
  title,
  children,
  className = '',
}) => {
  const c = CALLOUT[kind];
  const Icon = c.icon;
  return (
    <div role="note" className={`rounded-2xl border p-4 flex gap-3 print-avoid-break ${c.box} ${className}`} aria-label={title ?? c.label}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${c.iconCls}`} aria-hidden="true" />
      <div className="min-w-0 space-y-1.5 text-[14px] leading-relaxed">
        <p className="font-bold">{title ?? c.label}</p>
        <div className="space-y-1.5">{children}</div>
      </div>
    </div>
  );
};

// ── Myth vs fact ────────────────────────────────────────────────────────────

export const MythFact: React.FC<{ myth: string; fact: string }> = ({ myth, fact }) => (
  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden print-avoid-break">
    <div className="flex gap-2.5 p-3.5 bg-rose-50/70 dark:bg-rose-950/25">
      <XCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" aria-hidden="true" />
      <p className="text-[14px] leading-relaxed text-rose-950 dark:text-rose-100">
        <span className="font-bold">迷思：</span>
        {myth}
      </p>
    </div>
    <div className="flex gap-2.5 p-3.5 bg-white dark:bg-slate-900/60">
      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" aria-hidden="true" />
      <p className="text-[14px] leading-relaxed text-slate-800 dark:text-slate-200">
        <span className="font-bold">事實：</span>
        {fact}
      </p>
    </div>
  </div>
);

// ── Chapter intro & recap ───────────────────────────────────────────────────

export const ChapterIntro: React.FC<{ num: number; title: string; goal: string; learn: string[]; minutes?: number }> = ({
  num,
  title,
  goal,
  learn,
  minutes,
}) => (
  <header className="space-y-3">
    <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
      第 {num} 章{minutes ? ` · 約 ${minutes} 分鐘` : ''}
    </p>
    <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white text-balance">{title}</h2>
    <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{goal}</p>
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-4">
      <p className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-2">
        <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        讀完這一章，你會知道
      </p>
      <ul className="grid gap-1.5 sm:grid-cols-3">
        {learn.map((l) => (
          <li key={l} className="flex gap-2 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            {l}
          </li>
        ))}
      </ul>
    </div>
  </header>
);

export const KeyTakeaways: React.FC<{ items: string[]; title?: string }> = ({ items, title = '本章重點回顧' }) => (
  <section className="rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 print-avoid-break" aria-label={title}>
    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-2.5">{title}</h3>
    <ol className="space-y-2">
      {items.map((t, i) => (
        <li key={t} className="flex gap-2.5 text-[14px] leading-relaxed text-slate-800 dark:text-slate-200">
          <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 text-xs font-bold inline-flex items-center justify-center tabular-nums">
            {i + 1}
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  </section>
);

// ── Chapter pager ───────────────────────────────────────────────────────────

export const ChapterPager: React.FC<{
  prev?: { label: string; onClick: () => void };
  next?: { label: string; onClick: () => void };
  onComplete?: () => void;
  completed?: boolean;
}> = ({ prev, next, onComplete, completed }) => (
  <nav className="flex flex-col sm:flex-row gap-2.5 pt-2 no-print" aria-label="章節導覽">
    {prev ? (
      <button
        type="button"
        onClick={prev.onClick}
        className="flex-1 inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-4 py-3 text-left hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 shrink-0 text-slate-400" aria-hidden="true" />
        <span className="min-w-0">
          <span className="block text-[11px] text-slate-500 dark:text-slate-400">上一章</span>
          <span className="block font-semibold text-slate-900 dark:text-white truncate">{prev.label}</span>
        </span>
      </button>
    ) : (
      <span className="flex-1 hidden sm:block" />
    )}
    {next && (
      <button
        type="button"
        onClick={() => {
          onComplete?.();
          next.onClick();
        }}
        className="flex-1 inline-flex items-center justify-end gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 px-4 py-3 text-right transition-colors"
      >
        <span className="min-w-0">
          <span className="block text-[11px] opacity-90">{completed ? '下一章' : '完成本章，前往下一章'}</span>
          <span className="block font-semibold truncate">{next.label}</span>
        </span>
        <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
      </button>
    )}
    {!next && onComplete && (
      <button
        type="button"
        onClick={onComplete}
        disabled={completed}
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 px-4 py-3 font-semibold transition-colors"
      >
        <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
        {completed ? '已完成全部章節' : '完成本章'}
      </button>
    )}
  </nav>
);

// ── Quick check (one-question self test) ────────────────────────────────────

export const QuickCheck: React.FC<{ question: string; options: string[]; answer: number; explain: string }> = ({
  question,
  options,
  answer,
  explain,
}) => {
  const [picked, setPicked] = React.useState<number | null>(null);
  const correct = picked === answer;
  return (
    <section className="rounded-2xl border border-violet-200 dark:border-violet-900/70 bg-violet-50/50 dark:bg-violet-950/20 p-4 sm:p-5 no-print" aria-label="隨堂小測驗">
      <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1">隨堂小測驗</p>
      <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">{question}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={question}>
        {options.map((o, i) => {
          const isPicked = picked === i;
          const show = picked !== null;
          const tone =
            show && i === answer
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100'
              : show && isPicked
              ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-violet-400';
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={isPicked}
              onClick={() => setPicked(i)}
              className={`text-left rounded-xl border px-3.5 py-2.5 text-[14px] leading-snug transition-colors ${tone}`}
            >
              <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span>
              {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p role="status" className="mt-3 text-[14px] leading-relaxed text-slate-800 dark:text-slate-200">
          <span className={`font-bold ${correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
            {correct ? '答對了！' : `正確答案是 ${String.fromCharCode(65 + answer)}。`}
          </span>{' '}
          {explain}
        </p>
      )}
    </section>
  );
};

// ── Evidence grade pill (light/dark contrast-safe) ──────────────────────────

const GRADE_TONE: Record<string, string> = {
  A: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800',
  B: 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800',
  C: 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800',
  D: 'bg-orange-50 text-orange-900 border-orange-300 dark:bg-orange-950/50 dark:text-orange-200 dark:border-orange-800',
  E: 'bg-slate-50 text-slate-700 border-slate-300 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700',
};

const GRADE_LABEL: Record<string, string> = {
  A: '證據強',
  B: '證據中等',
  C: '證據有限',
  D: '證據弱／不建議常規使用',
  E: '缺乏證據',
};

export const GradePill: React.FC<{ grade: 'A' | 'B' | 'C' | 'D' | 'E'; withLabel?: boolean }> = ({ grade, withLabel = true }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${GRADE_TONE[grade]}`}
    title={`證據等級 ${grade}：${GRADE_LABEL[grade]}`}
  >
    <span className="font-mono">{grade}</span>
    {withLabel && <span>{GRADE_LABEL[grade]}</span>}
  </span>
);
