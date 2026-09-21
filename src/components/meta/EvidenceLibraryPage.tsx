import React, { useMemo, useState } from 'react';
import { SOURCES_CATALOG } from '../../data/sources';
import { HUMAN_SYSTEMS } from '../../data/humanSystemsData';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { Search, ExternalLink, ArrowLeft, Library, FlaskConical, FileText } from 'lucide-react';

/**
 * EvidenceLibraryPage — one searchable index of every primary source the site cites.
 *
 * Two corpora feed it: the graded guideline catalogue (SOURCES_CATALOG) and the per-system
 * research citations embedded in the body-systems content. Both are normalised to a common
 * shape here so the reader sees a single chronological evidence base rather than having to
 * hunt for citations page by page.
 */

type Kind = 'guideline' | 'study';

interface EvidenceEntry {
  key: string;
  kind: Kind;
  title: string;
  source: string;
  year: number;
  grade?: 'A' | 'B' | 'C' | 'D' | 'E';
  takeaway: string;
  url?: string;
  topic?: string;
}

const GRADE_STYLE: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  B: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  C: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  D: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
  E: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
};

const GRADE_MEANING_ZH: Record<string, string> = {
  A: '系統性回顧 / 大型 RCT / 國際指引',
  B: '單一 RCT 或高品質世代研究',
  C: '小型或觀察性研究',
  D: '機轉推論',
  E: '專家意見，尚待驗證',
};

const GRADE_MEANING_EN: Record<string, string> = {
  A: 'Systematic review / large RCT / guideline',
  B: 'Single RCT or high-quality cohort',
  C: 'Small or observational study',
  D: 'Mechanistic reasoning',
  E: 'Expert opinion, unproven',
};

export const EvidenceLibraryPage: React.FC = () => {
  const { language } = useLanguage();
  const { selectPillar } = useNavigation();
  const zh = language === 'zh-TW';

  const [query, setQuery] = useState('');
  const [kindFilter, setKindFilter] = useState<'all' | Kind>('all');

  const entries = useMemo<EvidenceEntry[]>(() => {
    const guidelines: EvidenceEntry[] = Object.values(SOURCES_CATALOG).map((s) => ({
      key: s.id,
      kind: 'guideline',
      title: s.title,
      source: s.publisher,
      year: s.year,
      grade: s.grade,
      takeaway: s.description,
      url: s.url,
    }));

    const studies: EvidenceEntry[] = HUMAN_SYSTEMS.flatMap((sys) =>
      (sys.research_citations || []).map((c, i) => ({
        key: `${sys.id}-${i}`,
        kind: 'study' as Kind,
        title: c.title,
        source: `${c.authors} · ${c.journal}`,
        year: c.year,
        takeaway: c.key_takeaway_zh,
        url: c.doi ? `https://doi.org/${c.doi}` : undefined,
        topic: zh ? sys.name_zh : sys.name_en,
      }))
    );

    return [...guidelines, ...studies].sort((a, b) => b.year - a.year);
  }, [zh]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (kindFilter !== 'all' && e.kind !== kindFilter) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.source.toLowerCase().includes(q) ||
        e.takeaway.toLowerCase().includes(q) ||
        (e.topic || '').toLowerCase().includes(q)
      );
    });
  }, [entries, query, kindFilter]);

  const newestYear = entries.length ? entries[0].year : new Date().getFullYear();

  return (
    <div className="space-y-8 animate-fade-in pb-16 font-sans">
      <button
        onClick={() => selectPillar('systems')}
        className="btn-tactile inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{zh ? '回到健康內容' : 'Back to health content'}</span>
      </button>

      <header className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 space-y-4">
        <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <Library className="w-3.5 h-3.5" />
          {zh ? '實證來源與分級' : 'Evidence base & grading'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
          {zh ? '本站引用的原始文獻' : 'Every source this site cites'}
        </h1>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl">
          {zh
            ? `共 ${entries.length} 筆國際指引與原始研究，最新收錄至 ${newestYear} 年。每一筆都可點擊連往出版者或 DOI 原文，請自行查證。`
            : `${entries.length} guidelines and primary studies, current through ${newestYear}. Every entry links to the publisher or its DOI so you can check it yourself.`}
        </p>

        {/* Grade legend — explains what the badges on content pages mean */}
        <div className="flex flex-wrap gap-2 pt-1">
          {(['A', 'B', 'C', 'D', 'E'] as const).map((g) => (
            <span
              key={g}
              className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${GRADE_STYLE[g]}`}
            >
              <strong>{g}</strong> · {zh ? GRADE_MEANING_ZH[g] : GRADE_MEANING_EN[g]}
            </span>
          ))}
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={zh ? '搜尋標題、期刊、結論…' : 'Search title, journal, finding…'}
            className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        {(
          [
            { id: 'all' as const, label_zh: '全部', label_en: 'All' },
            { id: 'guideline' as const, label_zh: '國際指引', label_en: 'Guidelines' },
            { id: 'study' as const, label_zh: '原始研究', label_en: 'Studies' },
          ]
        ).map((f) => (
          <button
            key={f.id}
            onClick={() => setKindFilter(f.id)}
            className={`btn-tactile px-3.5 py-2 rounded-2xl text-xs font-mono border transition-all ${
              kindFilter === f.id
                ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                : 'bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {zh ? f.label_zh : f.label_en}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((e) => {
          const Icon = e.kind === 'guideline' ? FileText : FlaskConical;
          return (
            <article
              key={e.key}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {e.year}
                </span>
                {e.grade && (
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${GRADE_STYLE[e.grade]}`}
                  >
                    {e.grade}
                  </span>
                )}
                {e.topic && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {e.topic}
                  </span>
                )}
              </div>

              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-start gap-1.5"
                  >
                    <span>{e.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1 opacity-60" />
                  </a>
                ) : (
                  e.title
                )}
              </h2>
              <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {e.source}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                {e.takeaway}
              </p>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-12 text-center font-mono text-xs text-slate-500">
            {zh ? '沒有符合的文獻。' : 'No matching sources.'}
          </p>
        )}
      </div>
    </div>
  );
};
