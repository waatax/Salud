import React from 'react';
import { CheckCircle2, Circle, X, ListChecks, Flame } from 'lucide-react';
import { useActionPlan } from '../../hooks/useActionPlan';
import { resolveTip } from '../../data/learning/tipIndex';
import { useNavigation } from '../../context/NavigationContext';
import { TipKindBadge } from './QuickTips';

/**
 * 「我的行動計畫」 on the home page: every tip the reader added from any section,
 * ticked off day by day. It deliberately shows the last-7-day count rather than a
 * streak, so one missed day does not reset the reader to zero.
 */
export const ActionPlanPanel: React.FC = () => {
  const { plan, toggleToday, doneToday, remove, last7 } = useActionPlan();
  const { go } = useNavigation();
  const items = plan.items.map(resolveTip).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const doneCount = items.filter((i) => doneToday(i.id)).length;

  if (items.length === 0) return null;

  return (
    <section id="my-plan" aria-labelledby="plan-h" className="scroll-mt-24 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900/60 overflow-hidden">
      <header className="flex items-center gap-3 px-4 sm:px-5 py-4 bg-emerald-50/80 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/50">
        <ListChecks className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <h2 id="plan-h" className="text-lg font-display font-bold text-slate-900 dark:text-white">我的行動計畫</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            今天完成 <strong className="tabular-nums text-slate-900 dark:text-white">{doneCount}</strong> / {items.length} 項。從任何主題頁的「立即上手」都可以加入新的做法。
          </p>
        </div>
      </header>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {items.map((item) => {
          const done = doneToday(item.id);
          const week = last7(item.id);
          return (
            <li key={item.id} className="flex items-start gap-3 px-4 sm:px-5 py-3">
              <button
                onClick={() => toggleToday(item.id)}
                aria-pressed={done}
                aria-label={done ? `取消今天完成：${item.title_zh}` : `標記今天完成：${item.title_zh}`}
                className="mt-0.5 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {done ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-emerald-500" />
                )}
              </button>
              <div className="flex-1 min-w-0 space-y-1">
                <p className={`font-semibold leading-6 ${done ? 'text-slate-500 dark:text-slate-400 line-through decoration-emerald-500/60' : 'text-slate-900 dark:text-white'}`}>
                  {item.title_zh}
                </p>
                {item.how_zh && <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{item.how_zh}</p>}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <TipKindBadge kind={item.kind} />
                  <span className="inline-flex items-center gap-1 tabular-nums" title="最近 7 天完成的天數">
                    <Flame className={`w-3.5 h-3.5 ${week >= 5 ? 'text-orange-500' : ''}`} aria-hidden="true" />
                    近 7 天 {week} 天
                  </span>
                  <button onClick={() => go(item.hash)} className="hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline truncate max-w-[16rem]">
                    來自：{item.source_zh}
                  </button>
                </div>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                aria-label={`從計畫移除：${item.title_zh}`}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
