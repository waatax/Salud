import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { EVIDENCE_UPDATES, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { UpdateCategory } from '../../types/learning';
import { hashSegment } from '../../config/routes';
import { PageHeader, formatYM } from './learnUi';
import { QuickTips } from './QuickTips';

export const EvidenceUpdatesPage: React.FC = () => {
  const { go } = useNavigation();
  const [cat, setCat] = useState<UpdateCategory | 'all'>('all');
  const [focusId, setFocusId] = useState<string | undefined>(() => hashSegment('updates'));

  useEffect(() => {
    const onHash = () => setFocusId(hashSegment('updates'));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Deep link: scroll the requested update into view once it has rendered.
  useEffect(() => {
    if (!focusId) return;
    setCat('all');
    const t = window.setTimeout(() => {
      document.getElementById(focusId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [focusId]);

  const sorted = useMemo(() => [...EVIDENCE_UPDATES].sort((a, b) => b.date.localeCompare(a.date)), []);
  const cats = useMemo(
    () => Array.from(new Set(sorted.map((u) => u.category))) as UpdateCategory[],
    [sorted]
  );
  const list = cat === 'all' ? sorted : sorted.filter((u) => u.category === cat);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="最新實證"
        title="2024–2026 年，健康建議改變了什麼？"
        lead="我們追蹤國際醫學會指引、世界衛生組織、衛福部與頂尖期刊的大型試驗，把每一項改變翻譯成「對你的意義」，並註明它的限制。"
      />

      <QuickTips sectionKey="updates" />

      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="依主題篩選">
        {(['all', ...cats] as const).map((c) => {
          const active = cat === c;
          const count = c === 'all' ? sorted.length : sorted.filter((u) => u.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950 font-semibold'
                  : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              {c === 'all' ? '全部' : UPDATE_CATEGORY_META[c].label_zh}
              <span className="ml-1 opacity-70 tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>

      <ol className="space-y-4">
        {list.map((u) => (
          <li
            key={u.id}
            id={u.id}
            className={`scroll-mt-24 rounded-2xl border bg-white dark:bg-slate-900/60 p-5 sm:p-6 space-y-4 ${
              focusId === u.id ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 font-semibold text-slate-700 dark:text-slate-300">
                {UPDATE_CATEGORY_META[u.category].label_zh}
              </span>
              <span className="text-slate-500 dark:text-slate-400">{formatYM(u.date)}</span>
              <span className="text-slate-500 dark:text-slate-400" aria-hidden="true">·</span>
              <span className="text-slate-600 dark:text-slate-400">{u.org}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold leading-8 text-slate-900 dark:text-white">{u.title_zh}</h2>

            {u.numbers && u.numbers.length > 0 && (
              <dl className="flex flex-wrap gap-2">
                {u.numbers.map((n) => (
                  <div key={n.label_zh} className="rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-1.5">
                    <dt className="text-[11px] text-slate-500 dark:text-slate-400">{n.label_zh}</dt>
                    <dd className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{n.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">改變了什麼</h3>
                <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{u.what_changed_zh}</p>
              </div>
              <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 p-3">
                <h3 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1">對你的意義</h3>
                <p className="text-[15px] leading-7 text-emerald-950 dark:text-emerald-100">{u.what_it_means_zh}</p>
              </div>
            </div>

            {u.caveat_zh && (
              <p className="flex gap-2 text-sm leading-6 text-amber-900 dark:text-amber-200 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl p-3">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong>注意：</strong>
                  {u.caveat_zh}
                </span>
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline underline-offset-2"
              >
                原始來源
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              {u.related_hash && (
                <button
                  onClick={() => go(u.related_hash!)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  延伸閱讀
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
