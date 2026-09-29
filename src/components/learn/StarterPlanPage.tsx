import React from 'react';
import { AlertTriangle, CheckCircle2, Circle, Flag, Plus, Check } from 'lucide-react';
import { STARTER_WEEKS, STARTER_SAFETY_CHECK, ALL_STARTER_TASKS } from '../../data/learning/starterPlan';
import { useActionPlan } from '../../hooks/useActionPlan';
import { useNavigation } from '../../context/NavigationContext';
import { PageHeader, ProgressBar } from './learnUi';
import { TipKindBadge, QuickTips } from './QuickTips';

/**
 * `#start` — 4 週健康啟動計畫: a first month for complete beginners that layers
 * movement, eating and sleep habits one week at a time.
 */
export const StarterPlanPage: React.FC = () => {
  const { starterDone, toggleStarter, inPlan, add, remove } = useActionPlan();
  const { go } = useNavigation();
  const done = ALL_STARTER_TASKS.filter((t) => starterDone(t.id)).length;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        eyebrow="4 週健康啟動計畫"
        title="從零開始：一個月建立運動、飲食與睡眠的好習慣"
        lead="每週只加一點點。前兩週以「每天做到」為目標，第三週達到國際建議的每週 150 分鐘運動與 2 次肌力訓練，第四週把它變成生活。勾選完成的項目，或把想每天追蹤的做法加入「我的行動計畫」。"
      >
        <div className="max-w-md space-y-1.5">
          <ProgressBar value={(done / ALL_STARTER_TASKS.length) * 100} tone="emerald" label="4 週計畫完成度" />
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            已完成 {done} / {ALL_STARTER_TASKS.length} 項
          </p>
        </div>
      </PageHeader>

      <section aria-labelledby="safety-h" className="rounded-2xl border border-amber-300 dark:border-amber-800/70 bg-amber-50/70 dark:bg-amber-950/20 p-5 space-y-2">
        <h2 id="safety-h" className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          開始前 1 分鐘安全檢查
        </h2>
        <p className="text-[15px] leading-7 text-amber-950 dark:text-amber-100">以下任何一項符合，請先和醫師討論適合你的運動強度，再開始這個計畫：</p>
        <ul className="list-disc pl-6 space-y-1 text-[15px] leading-7 text-amber-950 dark:text-amber-100">
          {STARTER_SAFETY_CHECK.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p className="text-sm leading-6 text-amber-900 dark:text-amber-200">
          都沒有的話，可以直接從低到中強度開始。運動中出現胸痛、異常喘、頭暈或心跳不規則，請立即停止並就醫。
        </p>
      </section>

      <ol className="space-y-6">
        {STARTER_WEEKS.map((w) => {
          const wDone = w.tasks.filter((t) => starterDone(t.id)).length;
          return (
            <li key={w.week} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
              <header className="px-5 py-4 bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  第 {w.week} 週 · 完成 {wDone}/{w.tasks.length}
                </p>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{w.theme_zh}</h2>
                <p className="text-[15px] leading-7 text-slate-600 dark:text-slate-300">{w.goal_zh}</p>
              </header>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {w.tasks.map((task) => {
                  const isDone = starterDone(task.id);
                  const inside = inPlan(task.id);
                  return (
                    <li key={task.id} className="flex items-start gap-3 px-5 py-3">
                      <button
                        onClick={() => toggleStarter(task.id)}
                        aria-pressed={isDone}
                        aria-label={isDone ? `取消完成：${task.text_zh}` : `標記完成：${task.text_zh}`}
                        className="mt-0.5 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-emerald-500" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <TipKindBadge kind={task.kind} />
                          <span className={`font-semibold ${isDone ? 'text-slate-500 line-through decoration-emerald-500/60' : 'text-slate-900 dark:text-white'}`}>
                            {task.text_zh}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{task.detail_zh}</p>
                      </div>
                      <button
                        onClick={() => (inside ? remove(task.id) : add(task.id))}
                        aria-pressed={inside}
                        title={inside ? '已在我的行動計畫（點擊移除）' : '加入我的行動計畫，每天追蹤'}
                        className={`shrink-0 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                          inside
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
                        }`}
                      >
                        {inside ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Plus className="w-3.5 h-3.5" aria-hidden="true" />}
                        <span className="hidden sm:inline">{inside ? '追蹤中' : '每天追蹤'}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <footer className="px-5 py-3 flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                <Flag className="w-4 h-4 shrink-0 mt-1 text-emerald-600" aria-hidden="true" />
                <span>{w.checkpoint_zh}</span>
              </footer>
            </li>
          );
        })}
      </ol>

      <QuickTips sectionKey="start" />

      <div className="flex flex-wrap gap-3">
        <button onClick={() => go('learn/move/L-MOVE-01')} className="rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 font-semibold px-4 py-2.5">
          深入：動得好課程
        </button>
        <button onClick={() => go('learn/eat/L-EAT-01')} className="rounded-xl border border-slate-300 dark:border-slate-700 font-semibold px-4 py-2.5 text-slate-800 dark:text-slate-200 hover:border-emerald-500">
          深入：吃得對課程
        </button>
      </div>
    </div>
  );
};
