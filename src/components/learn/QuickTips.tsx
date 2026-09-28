import React, { useState } from 'react';
import { Zap, Footprints, Salad, Moon, Brain, ClipboardCheck, ShieldAlert, Plus, Check, ChevronDown, Clock, ArrowRight, LucideIcon } from 'lucide-react';
import { QUICK_TIPS_BY_KEY, TIP_KIND_META } from '../../data/learning/quickTips';
import { TipKind } from '../../types/learning';
import { useActionPlan } from '../../hooks/useActionPlan';
import { useNavigation } from '../../context/NavigationContext';

export const TIP_KIND_ICON: Record<TipKind, LucideIcon> = {
  move: Footprints,
  eat: Salad,
  sleep: Moon,
  mind: Brain,
  check: ClipboardCheck,
  safety: ShieldAlert,
};

export const TIP_KIND_CLASS: Record<TipKind, string> = {
  move: 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/50 dark:text-teal-200 dark:border-teal-800/70',
  eat: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800/70',
  sleep: 'bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:border-violet-800/70',
  mind: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-800/70',
  check: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-200 dark:border-rose-800/70',
  safety: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800/70',
};

export const TipKindBadge: React.FC<{ kind: TipKind }> = ({ kind }) => {
  const Icon = TIP_KIND_ICON[kind];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${TIP_KIND_CLASS[kind]}`}>
      <Icon className="w-3 h-3" aria-hidden="true" />
      {TIP_KIND_META[kind].label_zh}
    </span>
  );
};

const COLLAPSE_KEY = 'salud_tips_collapsed';

const readCollapsed = () => {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === '1';
  } catch {
    return false;
  }
};

/**
 * 「立即上手」card: the practical tips for one section, each addable to the reader's
 * action plan. Rendered on every hub, body system, sport, diet chapter and learner page.
 */
export const QuickTips: React.FC<{ sectionKey: string; className?: string }> = ({ sectionKey, className = '' }) => {
  const section = QUICK_TIPS_BY_KEY[sectionKey];
  const { add, remove, inPlan, plan } = useActionPlan();
  const { go } = useNavigation();
  const [collapsed, setCollapsed] = useState<boolean>(readCollapsed);

  if (!section) return null;

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0');
    } catch {
      /* per-viewer convenience only */
    }
  };

  const added = section.tips.filter((tip) => inPlan(tip.id)).length;
  const headingId = `tips-${sectionKey.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <section
      aria-labelledby={headingId}
      className={`rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 dark:from-emerald-950/30 dark:via-slate-900/60 dark:to-amber-950/10 ${className}`}
    >
      <button
        onClick={toggleCollapsed}
        aria-expanded={!collapsed}
        className="w-full flex items-center gap-3 px-4 sm:px-5 py-3.5 text-left"
      >
        <span className="w-9 h-9 shrink-0 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 inline-flex items-center justify-center" aria-hidden="true">
          <Zap className="w-5 h-5" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-xs font-semibold text-emerald-700 dark:text-emerald-400">立即上手</span>
          <span id={headingId} className="block font-bold text-slate-900 dark:text-white truncate">
            {section.title_zh}
          </span>
        </span>
        <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 shrink-0">
          {section.tips.length} 個做法{added > 0 ? ` · 已加入 ${added}` : ''}
        </span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform ${collapsed ? '' : 'rotate-180'}`} aria-hidden="true" />
      </button>

      {!collapsed && (
        <div className="px-4 sm:px-5 pb-4 space-y-3">
          {/* Phones: one swipeable row so the page content stays near the top; md+: grid. */}
          <ul className="-mx-4 px-4 sm:-mx-5 sm:px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:pb-0">
            {section.tips.map((tip) => {
              const inside = inPlan(tip.id);
              return (
                <li key={tip.id} className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 p-3.5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <TipKindBadge kind={tip.kind} />
                    {tip.minutes > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {tip.minutes} 分鐘
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white leading-6">{tip.title_zh}</p>
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{tip.how_zh}</p>
                  <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">為什麼：</span>
                    {tip.why_zh}
                  </p>
                  <button
                    onClick={() => (inside ? remove(tip.id) : add(tip.id))}
                    aria-pressed={inside}
                    className={`mt-auto self-start inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                      inside
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                    }`}
                  >
                    {inside ? <Check className="w-4 h-4" aria-hidden="true" /> : <Plus className="w-4 h-4" aria-hidden="true" />}
                    {inside ? '已在我的計畫' : '加入我的計畫'}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="md:hidden text-xs text-slate-500 dark:text-slate-400">← 左右滑動看全部 {section.tips.length} 個做法 →</p>
          {plan.items.length > 0 && (
            <button onClick={() => go('home/plan')} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              查看我的行動計畫（{plan.items.length} 項）
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};
