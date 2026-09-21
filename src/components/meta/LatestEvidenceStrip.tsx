import React, { useMemo } from 'react';
import { SOURCES_CATALOG } from '../../data/sources';
import { HUMAN_SYSTEMS } from '../../data/humanSystemsData';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { FlaskConical, ArrowRight, ExternalLink } from 'lucide-react';

/**
 * LatestEvidenceStrip — the three most recent primary sources behind the site's guidance.
 *
 * This is what v2.0 puts in the prime real estate the 40-seat expert roster used to occupy:
 * the research itself, not the people who signed off on it.
 */
export const LatestEvidenceStrip: React.FC<{ limit?: number }> = ({ limit = 3 }) => {
  const { language } = useLanguage();
  const { openMeta } = useNavigation();
  const zh = language === 'zh-TW';

  const latest = useMemo(() => {
    const guidelines = Object.values(SOURCES_CATALOG).map((s) => ({
      key: s.id,
      title: s.title,
      source: s.publisher,
      year: s.year,
      takeaway: s.description,
      url: s.url,
    }));
    const studies = HUMAN_SYSTEMS.flatMap((sys) =>
      (sys.research_citations || []).map((c, i) => ({
        key: `${sys.id}-${i}`,
        title: c.title,
        source: c.journal,
        year: c.year,
        takeaway: c.key_takeaway_zh,
        url: c.doi ? `https://doi.org/${c.doi}` : undefined,
      }))
    );
    return [...guidelines, ...studies].sort((a, b) => b.year - a.year).slice(0, limit);
  }, [limit]);

  if (!latest.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="flex items-center gap-2 text-sm font-display font-bold text-slate-800 dark:text-slate-100">
          <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          {zh ? '最新實證重點' : 'Latest evidence'}
        </h2>
        <button
          onClick={() => openMeta('evidence')}
          className="btn-tactile inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 hover:underline"
        >
          {zh ? '查看全部來源' : 'All sources'}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {latest.map((e) => (
          <article
            key={e.key}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 space-y-2"
          >
            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
                {e.year}
              </span>
              <span className="truncate">{e.source}</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {e.takeaway}
            </p>
            {e.url && (
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <span className="truncate max-w-[16rem]">{e.title}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
