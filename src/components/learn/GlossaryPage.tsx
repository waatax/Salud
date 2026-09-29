import React, { useMemo, useState } from 'react';
import { Search, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { GLOSSARY, GLOSSARY_CATEGORIES } from '../../data/learning/glossary';
import { CANONICAL_TERMINOLOGY_REGISTRY } from '../../knowledge/terms/terminology';
import { PageHeader } from './learnUi';
import { QuickTips } from './QuickTips';

type Cat = (typeof GLOSSARY_CATEGORIES)[number] | 'all' | 'acronym';

export const GlossaryPage: React.FC = () => {
  const { go } = useNavigation();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<Cat>('all');
  const needle = q.trim().toLowerCase();

  const entries = useMemo(
    () =>
      GLOSSARY.filter(
        (g) =>
          (cat === 'all' || g.category === cat) &&
          (!needle || `${g.term} ${g.zh} ${g.plain_zh}`.toLowerCase().includes(needle))
      ),
    [cat, needle]
  );

  const acronyms = useMemo(
    () =>
      Object.values(CANONICAL_TERMINOLOGY_REGISTRY).filter(
        (t) =>
          (cat === 'all' || cat === 'acronym') &&
          (!needle || `${t.term} ${t.primary_expansion_zh} ${t.context_guidance_zh}`.toLowerCase().includes(needle))
      ),
    [cat, needle]
  );

  const showGlossary = cat !== 'acronym';

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="健康小辭典"
        title="看不懂的名詞，一句話說清楚"
        lead="報告、藥袋、診間與新聞裡常見的醫學名詞，用不帶術語的白話解釋；另外整理了容易混淆的縮寫。"
      />

      <QuickTips sectionKey="glossary" />

      <label className="relative block max-w-lg">
        <span className="sr-only">搜尋名詞</span>
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜尋：eGFR、糖尿病前期、NNT…"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2.5 text-[15px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </label>

      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="依類別篩選">
        {(['all', ...GLOSSARY_CATEGORIES, 'acronym'] as Cat[]).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              cat === c
                ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950 font-semibold'
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
            }`}
          >
            {c === 'all' ? '全部' : c === 'acronym' ? '易混淆縮寫' : c}
          </button>
        ))}
      </div>

      {showGlossary && (
        <dl className="grid md:grid-cols-2 gap-3">
          {entries.map((g) => (
            <div key={g.term} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-1.5">
              <dt className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">{g.term}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{g.zh}</span>
              </dt>
              <dd className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{g.plain_zh}</dd>
              {g.related_hash && (
                <dd>
                  <button onClick={() => go(g.related_hash!)} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                    相關課程
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}

      {acronyms.length > 0 && (
        <section aria-labelledby="acr-h" className="space-y-3">
          <h2 id="acr-h" className="text-lg font-bold text-slate-900 dark:text-white">易混淆縮寫與偽科學用語</h2>
          <dl className="grid md:grid-cols-2 gap-3">
            {acronyms.map((t) => (
              <div key={t.term} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 space-y-1.5">
                <dt className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">{t.term}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{t.primary_expansion_zh}</span>
                </dt>
                {t.secondary_expansions_zh && t.secondary_expansions_zh.length > 0 && (
                  <dd className="text-xs text-slate-500 dark:text-slate-400">也可能指：{t.secondary_expansions_zh.join('、')}</dd>
                )}
                <dd className="text-sm leading-6 text-slate-700 dark:text-slate-300">{t.context_guidance_zh}</dd>
                <dd className="flex gap-1.5 text-sm leading-6 text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
                  <span>{t.ambiguity_warning_zh}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {showGlossary && entries.length === 0 && acronyms.length === 0 && (
        <p className="text-sm text-slate-500">找不到符合的名詞。</p>
      )}
    </div>
  );
};
