import React from 'react';
import { Table as TableIcon } from 'lucide-react';

/**
 * DataTable — v4.4 reference table that stays readable on a phone.
 *
 * Wide clinical tables (5–6 columns) used to scroll sideways on mobile, hiding the
 * columns a reader most needs. Here every table renders twice from the same data:
 *   - ≥ sm: a real <table> with a caption, column headers and a row header.
 *   - < sm: one card per row, the first column as the card title and the rest as a
 *     labelled list, so nothing is off-screen.
 * Print always uses the table.
 */

export interface Column<R> {
  key: string;
  header: string;
  render?: (row: R) => React.ReactNode;
  /** Tailwind width / min-width classes for the table layout. */
  className?: string;
  /** Hide this column on the mobile card (e.g. when it repeats the title). */
  hideOnCard?: boolean;
}

interface Props<R> {
  title?: string;
  caption?: string;
  source?: string;
  columns: Column<R>[];
  rows: R[];
  rowKey: (row: R, index: number) => string;
  /** Optional per-row accent (left border colour on cards, row tint on the table). */
  rowTone?: (row: R) => 'good' | 'warn' | 'bad' | 'neutral' | undefined;
  footnote?: React.ReactNode;
  id?: string;
  /** Force table layout everywhere (for narrow, 2–3 column tables). */
  compact?: boolean;
}

const ROW_TINT = {
  good: 'bg-emerald-50/60 dark:bg-emerald-950/20',
  warn: 'bg-amber-50/60 dark:bg-amber-950/20',
  bad: 'bg-rose-50/70 dark:bg-rose-950/25',
  neutral: '',
} as const;

const CARD_EDGE = {
  good: 'border-l-emerald-500',
  warn: 'border-l-amber-500',
  bad: 'border-l-rose-500',
  neutral: 'border-l-slate-300 dark:border-l-slate-700',
} as const;

function cell<R>(col: Column<R>, row: R): React.ReactNode {
  if (col.render) return col.render(row);
  const v = (row as Record<string, unknown>)[col.key];
  return v == null ? '' : (v as React.ReactNode);
}

export function DataTable<R>({ title, caption, source, columns, rows, rowKey, rowTone, footnote, id, compact = false }: Props<R>) {
  const [first, ...rest] = columns;
  return (
    <section className="space-y-2.5 print-avoid-break" aria-labelledby={title && id ? id : undefined}>
      {(title || source) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5">
          {title && (
            <h3 id={id} className="flex items-center gap-2 text-[15px] sm:text-base font-bold text-slate-900 dark:text-white">
              <TableIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
              {title}
            </h3>
          )}
          {source && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 sm:text-right">資料來源：{source}</span>
          )}
        </div>
      )}

      {/* Table layout */}
      <div className={`${compact ? '' : 'hidden sm:block'} overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60`}>
        <table className="w-full text-left border-collapse text-[13px] leading-relaxed">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200">
              {columns.map((c) => (
                <th key={c.key} scope="col" className={`py-2.5 px-3 font-semibold align-bottom ${c.className ?? ''}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {rows.map((r, i) => {
              const tone = rowTone?.(r);
              return (
                <tr key={rowKey(r, i)} className={tone ? ROW_TINT[tone] : ''}>
                  <th scope="row" className={`py-2.5 px-3 font-semibold text-slate-900 dark:text-white align-top ${first.className ?? ''}`}>
                    {cell(first, r)}
                  </th>
                  {rest.map((c) => (
                    <td key={c.key} className="py-2.5 px-3 text-slate-700 dark:text-slate-300 align-top">
                      {cell(c, r)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Card layout (phones) */}
      {!compact && (
        <ul className="sm:hidden space-y-2.5" aria-label={caption ?? title}>
          {rows.map((r, i) => {
            const tone = rowTone?.(r) ?? 'neutral';
            return (
              <li
                key={rowKey(r, i)}
                className={`rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 ${CARD_EDGE[tone]} bg-white dark:bg-slate-900/60 p-3.5`}
              >
                <div className="font-bold text-[15px] text-slate-900 dark:text-white leading-snug">{cell(first, r)}</div>
                <dl className="mt-2 space-y-1.5">
                  {rest
                    .filter((c) => !c.hideOnCard)
                    .map((c) => (
                      <div key={c.key} className="grid grid-cols-[5.5rem_1fr] gap-2 text-[13px] leading-relaxed">
                        <dt className="text-slate-500 dark:text-slate-400 font-medium">{c.header}</dt>
                        <dd className="text-slate-800 dark:text-slate-200 min-w-0">{cell(c, r)}</dd>
                      </div>
                    ))}
                </dl>
              </li>
            );
          })}
        </ul>
      )}

      {footnote && <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{footnote}</div>}
    </section>
  );
}
