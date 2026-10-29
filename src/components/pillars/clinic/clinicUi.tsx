import React from 'react';
import { BookOpen, ChevronRight, ExternalLink, Link2 } from 'lucide-react';
import {
  HOSPITALS,
  LIFE_STAGES,
  type Department,
  type Evidence,
  type EvidenceLevel,
  type HospitalCode,
  type KeyNumber,
  type LifeStage,
  type SaludLink,
  type TimelinePhase,
} from '../../../data/clinical';

/** Shared building blocks of the clinical knowledge base (v6.1). */

export const HOSP_ORDER: HospitalCode[] = ['NTUH', 'NCKUH', 'VGH', 'CCH'];

export const Card: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section
    id={id}
    className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface p-5 scroll-mt-32 print-avoid-break ${className}`}
  >
    {children}
  </section>
);

export const Chip: React.FC<{ children: React.ReactNode; tone?: 'slate' | 'emerald' | 'sky' | 'amber' | 'rose' }> = ({ children, tone = 'slate' }) => {
  const tones = {
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900',
    sky: 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-900',
    amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900',
    rose: 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900',
  };
  return <span className={`inline-flex items-center gap-1 text-[11px] rounded-full px-2 py-0.5 ${tones[tone]}`}>{children}</span>;
};

export const HospitalBadges: React.FC<{ dept: Pick<Department, 'hospitals'> }> = ({ dept }) => (
  <div className="flex flex-wrap gap-1" aria-label="四院是否設有此科">
    {HOSP_ORDER.map((h) => (
      <span
        key={h}
        title={dept.hospitals[h] ?? '未單獨設科（併入其他科）'}
        className={`text-[10px] px-1.5 py-0.5 rounded-md border ${
          dept.hospitals[h]
            ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
            : 'border-slate-200 dark:border-slate-800 text-slate-400'
        }`}
      >
        {HOSPITALS[h].short_zh}
        {!dept.hospitals[h] && <span className="sr-only">（未單獨設科）</span>}
      </span>
    ))}
  </div>
);

export const LifeStageChips: React.FC<{ stages: LifeStage[] }> = ({ stages }) => (
  <div className="flex flex-wrap gap-1">
    {LIFE_STAGES.filter((s) => stages.includes(s.id)).map((s) => (
      <Chip key={s.id} tone="sky">
        <span aria-hidden="true">{s.emoji}</span>
        {s.name_zh}
      </Chip>
    ))}
  </div>
);

export const KeyNumbers: React.FC<{ items: KeyNumber[]; dark?: boolean }> = ({ items, dark }) =>
  items.length === 0 ? null : (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {items.map((k) => (
        <div key={k.label_zh} className={`rounded-xl px-3 py-2 ${dark ? 'bg-white/10' : 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60'}`}>
          <dt className={`text-[11px] leading-snug ${dark ? 'text-emerald-100/80' : 'text-slate-500 dark:text-slate-400'}`}>{k.label_zh}</dt>
          <dd className={`text-lg font-bold leading-tight ${dark ? 'text-white' : 'text-emerald-800 dark:text-emerald-300'}`}>{k.value}</dd>
        </div>
      ))}
    </dl>
  );

/** Recovery timeline: horizontal steps on desktop, a vertical rail on phones. */
export const Timeline: React.FC<{ phases: TimelinePhase[] }> = ({ phases }) => (
  <ol className="grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
    {phases.map((p, i) => (
      <li key={p.when_zh} className="relative rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/60 dark:bg-teal-950/20 p-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 shrink-0 rounded-full bg-teal-600 text-white text-xs font-bold grid place-items-center" aria-hidden="true">
            {i + 1}
          </span>
          <span className="text-sm font-bold text-teal-900 dark:text-teal-200">{p.when_zh}</span>
        </div>
        <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">🎯 {p.goal_zh}</p>
        <ul className="mt-1.5 space-y-1">
          {p.do_zh.map((d) => (
            <li key={d} className="flex gap-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <span className="text-teal-600" aria-hidden="true">✓</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ol>
);

const LEVEL_LABEL: Record<EvidenceLevel, { zh: string; tone: 'emerald' | 'sky' | 'amber' | 'slate' | 'rose' }> = {
  guideline: { zh: '臨床指引', tone: 'emerald' },
  consensus: { zh: '專家共識', tone: 'sky' },
  sr: { zh: '系統性回顧', tone: 'emerald' },
  rct: { zh: '隨機試驗', tone: 'amber' },
  cohort: { zh: '觀察研究', tone: 'slate' },
  official: { zh: '官方政策', tone: 'rose' },
};

const pubmedSearch = (label: string) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(label)}`;
const scholarSearch = (label: string) => `https://scholar.google.com/scholar?q=${encodeURIComponent(label)}`;

export const EvidenceList: React.FC<{ items: Evidence[] }> = ({ items }) => (
  <ul className="mt-2 space-y-2 text-sm">
    {[...items]
      .sort((a, b) => b.year - a.year)
      .map((e) => (
        <li key={e.label} className="flex gap-2 text-slate-700 dark:text-slate-300">
          <BookOpen className="w-3.5 h-3.5 mt-1 text-slate-400 shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <span className="break-words">
              {e.label}（{e.year}）
            </span>
            <span className="ml-1 inline-flex flex-wrap gap-1 align-middle">
              {e.level && <Chip tone={LEVEL_LABEL[e.level].tone}>{LEVEL_LABEL[e.level].zh}</Chip>}
              {e.url ? (
                <a href={e.url} target="_blank" rel="noreferrer" className="text-[11px] text-emerald-700 dark:text-emerald-400 underline decoration-dotted">
                  原文
                </a>
              ) : e.level === 'official' ? null : (
                <>
                  <a href={pubmedSearch(e.label)} target="_blank" rel="noreferrer" className="text-[11px] text-emerald-700 dark:text-emerald-400 underline decoration-dotted">
                    PubMed
                  </a>
                  <a href={scholarSearch(e.label)} target="_blank" rel="noreferrer" className="text-[11px] text-emerald-700 dark:text-emerald-400 underline decoration-dotted">
                    Scholar
                  </a>
                </>
              )}
            </span>
          </div>
        </li>
      ))}
  </ul>
);

export const SaludLinks: React.FC<{ links: SaludLink[]; go: (h: string) => void; title?: string }> = ({ links, go, title = 'Salud 延伸深度課程' }) => (
  <Card>
    <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
      <Link2 className="w-4 h-4 text-emerald-600" aria-hidden="true" /> {title}
    </h2>
    <div className="mt-2 flex flex-wrap gap-2">
      {links.map((l) => (
        <button
          key={l.hash}
          onClick={() => go(l.hash)}
          className="text-sm rounded-xl border border-emerald-200 dark:border-emerald-900 px-3 py-1.5 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
        >
          {l.label_zh} →
        </button>
      ))}
    </div>
  </Card>
);

export const HospitalSourceLink: React.FC<{ url: string; children: React.ReactNode }> = ({ url, children }) => (
  <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400 hover:underline">
    {children}
    <ExternalLink className="w-3 h-3" aria-hidden="true" />
  </a>
);

export const RowLink: React.FC<
  { onClick: () => void; title: string; sub?: string; right?: React.ReactNode } & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onPointerEnter' | 'onFocus'>
> = ({ onClick, title, sub, right, ...hover }) => (
  <button
    onClick={onClick}
    {...hover}
    className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface px-3 py-2 hover:border-emerald-400 flex items-center gap-2"
  >
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-semibold text-slate-900 dark:text-white truncate">{title}</span>
      {sub && <span className="block text-xs text-slate-500 truncate">{sub}</span>}
    </span>
    {right}
    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
  </button>
);

export const Disclaimer: React.FC = () => (
  <p className="text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-4">
    ⚠️ 本知識庫為衛教用途，依國際與台灣最新臨床指引整理（內容審閱：2026-10），不能取代醫師診斷與個別化治療。出現危險警訊請立即就醫或撥打 119；情緒危機請撥 1925 安心專線。
  </p>
);
