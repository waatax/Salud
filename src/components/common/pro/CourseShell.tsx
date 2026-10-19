import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronRight, ExternalLink, LucideIcon, Map as MapIcon, PlayCircle, Printer, RotateCcw, Route, Siren, X } from 'lucide-react';
import { useHashTab } from '../../../hooks/useHashTab';
import { useChapterProgress } from '../../../hooks/useChapterProgress';
import { HubHero, HeroButton, HeroStat, HeroTone } from './HubHero';
import { HubTabBar, HubTabTone } from './HubTabBar';
import { ChapterIntro, KeyTakeaways, ChapterPager, QuickCheck, MythFact, ChapterNumberContext } from './Blocks';
import { RelatedNext, RelatedItem } from './RelatedNext';

/**
 * CourseShell — v4.4 template for a topic taught as a short course.
 *
 * Every course zone (脊椎與神經, B 型肝炎, …) shares one reading rhythm, so a reader who
 * has finished one knows how to use the next:
 *   hero (what / why / where to start) → urgent-signs strip → numbered chapter bar →
 *   chapter: intro → content → myths → recap → one-question check → references → pager
 *   → "what to read next".
 * Chapter progress is remembered per course, and the hero offers「繼續第 N 章」.
 */

export interface CourseChapter<T extends string> {
  id: T;
  label_zh: string;
  title_zh: string;
  goal_zh: string;
  learn_zh: string[];
  minutes: number;
  takeaways_zh: string[];
}

export interface CourseQuiz {
  question: string;
  options: string[];
  answer: number;
  explain: string;
}

/** A group of chapters shown together on the course map (e.g. 「疼痛照護與治療」). */
export interface CourseUnit<T extends string> {
  title: string;
  blurb: string;
  chapters: T[];
}

/** A situation-based reading route through the course (e.g. 「我剛開完刀」). */
export interface CoursePath<T extends string> {
  label: string;
  hint: string;
  icon: LucideIcon;
  chapters: T[];
}

export interface CourseSource {
  label: string;
  url: string;
}

interface Props<T extends string> {
  hubKey: string;
  tabs: readonly T[];
  chapters: CourseChapter<T>[];
  views: Record<T, React.FC<{ goTo: (id: T) => void }>>;
  myths?: { chapter: T; myth: string; fact: string }[];
  quiz?: Partial<Record<T, CourseQuiz>>;
  sources?: Partial<Record<T, CourseSource[]>>;
  hero: {
    icon: LucideIcon;
    tone: HeroTone;
    eyebrow: string;
    title: string;
    lead: React.ReactNode;
    helps: string[];
    stats: HeroStat[];
    /** Extra hero buttons; receives the chapter navigator. */
    actions?: (goTo: (id: T) => void) => React.ReactNode;
  };
  alert?: { text: React.ReactNode; cta: string; target: T };
  tabTone: HubTabTone;
  ariaLabel: string;
  related: { title: string; items: RelatedItem[] };
  disclaimer: string;
  /** Optional course map: chapters grouped into units. */
  units?: CourseUnit<T>[];
  /** Optional situation-based entry paths shown under the hero. */
  paths?: CoursePath<T>[];
}

export function CourseShell<T extends string>({
  hubKey,
  tabs,
  chapters,
  views,
  myths = [],
  quiz = {},
  sources = {},
  hero,
  alert,
  tabTone,
  ariaLabel,
  related,
  disclaimer,
  units = [],
  paths = [],
}: Props<T>) {
  const [activePath, setActivePath] = useState<number | null>(null);
  const [tab, setTab] = useHashTab<T>(hubKey, tabs, tabs[0]);
  const { done, markDone, reset } = useChapterProgress(hubKey);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const idx = Math.max(0, chapters.findIndex((c) => c.id === tab));
  const chapter = chapters[idx];
  const View = views[tab] as React.FC<{ goTo: (id: T) => void }>;
  const nextUnread = chapters.find((c) => !done.includes(c.id));
  const totalMinutes = chapters.reduce((s, c) => s + c.minutes, 0);
  const doneCount = done.filter((d) => chapters.some((c) => c.id === d)).length;
  const pct = Math.round((doneCount / chapters.length) * 100);

  const scrollToPanel = () => {
    const el = panelRef.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
  };

  // A chapter change scrolls the chapter (not the hero) into view.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = panelRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  }, [tab]);

  const goTo = (id: T) => {
    setTab(id);
    window.requestAnimationFrame(scrollToPanel);
  };

  const numberOf = (id: T) => chapters.findIndex((c) => c.id === id) + 1;
  const labelOf = (id: T) => chapters.find((c) => c.id === id)?.label_zh ?? id;
  const unitIdx = units.findIndex((u) => u.chapters.includes(tab));
  const groupStarts = units.slice(1).map((u) => u.chapters[0]);
  const path = activePath != null ? paths[activePath] : undefined;
  const pathPos = path ? path.chapters.indexOf(tab) : -1;
  const pathNext = path && pathPos >= 0 && pathPos < path.chapters.length - 1 ? path.chapters[pathPos + 1] : undefined;

  const prev = idx > 0 ? chapters[idx - 1] : undefined;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : undefined;
  const chapterMyths = myths.filter((m) => m.chapter === tab);
  const q = quiz[tab];
  const refs = sources[tab] ?? [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-fade-in">
      <HubHero
        icon={hero.icon}
        tone={hero.tone}
        eyebrow={hero.eyebrow}
        title={hero.title}
        lead={hero.lead}
        helps={hero.helps}
        stats={[{ value: String(chapters.length), label: `章節，約 ${totalMinutes} 分鐘` }, ...hero.stats].slice(0, 4)}
        actions={
          <>
            <HeroButton primary icon={PlayCircle} onClick={() => goTo(nextUnread?.id ?? chapters[0].id)}>
              {done.length === 0
                ? '從第 1 章開始'
                : nextUnread
                ? `繼續第 ${chapters.indexOf(nextUnread) + 1} 章：${nextUnread.label_zh}`
                : '重新複習第 1 章'}
            </HeroButton>
            {hero.actions?.(goTo)}
            <HeroButton icon={Printer} onClick={() => window.print()}>
              列印本章
            </HeroButton>
          </>
        }
      >
        <div className="max-w-md pt-1 space-y-1">
          <div className="flex items-center justify-between text-[12px] text-slate-600 dark:text-slate-400">
            <span>
              學習進度 {doneCount}/{chapters.length} 章
            </span>
            {done.length > 0 && (
              <button type="button" onClick={reset} className="inline-flex items-center gap-1 hover:underline">
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                重設
              </button>
            )}
          </div>
          <div className="h-2 rounded-full bg-white/70 dark:bg-slate-800 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${hero.title} 學習進度`}>
            <div className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </HubHero>

      {alert && (
        <div className="rounded-2xl border border-rose-300 dark:border-rose-800/70 bg-rose-50 dark:bg-rose-950/30 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 text-[14px] text-rose-950 dark:text-rose-100">
          <Siren className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <p className="flex-1 leading-relaxed">{alert.text}</p>
          <button
            type="button"
            onClick={() => goTo(alert.target)}
            className="shrink-0 self-start sm:self-auto rounded-lg border border-rose-400 dark:border-rose-700 px-3 py-1.5 text-[13px] font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40"
          >
            {alert.cta}
          </button>
        </div>
      )}

      {paths.length > 0 && (
        <section aria-labelledby={`${hubKey}-paths-h`} className="space-y-2.5 no-print">
          <h2 id={`${hubKey}-paths-h`} className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Route className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            依你的情況開始
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {paths.map((p, i) => {
              const Icon = p.icon;
              const on = activePath === i;
              return (
                <button
                  key={p.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setActivePath(i);
                    goTo(p.chapters[0]);
                  }}
                  className={`btn-tactile text-left rounded-2xl border p-3 flex gap-3 items-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    on
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-emerald-400'
                  }`}
                >
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-bold text-slate-900 dark:text-white leading-snug">{p.label}</span>
                    <span className="block text-[12px] text-slate-600 dark:text-slate-400 leading-snug mt-0.5">{p.hint}</span>
                    <span className="block text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                      {p.chapters.map((c) => `${numberOf(c)}.${labelOf(c)}`).join(' → ')}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {units.length > 0 && (
        <details className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 no-print" open={done.length === 0}>
          <summary className="cursor-pointer list-none flex items-center gap-2 px-4 py-3 text-[15px] font-bold text-slate-900 dark:text-white">
            <MapIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            課程地圖：{units.length} 個單元、{chapters.length} 章
            <ChevronRight className="w-4 h-4 ml-auto transition-transform group-open:rotate-90" aria-hidden="true" />
          </summary>
          <ol className="grid gap-3 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((u, ui) => {
              const unitDone = u.chapters.filter((c) => done.includes(c)).length;
              return (
                <li key={u.title} className={`rounded-xl border p-3 space-y-2 ${ui === unitIdx ? 'border-sky-400 bg-sky-50/60 dark:bg-sky-950/30' : 'border-slate-200 dark:border-slate-800'}`}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[14px] font-bold text-slate-900 dark:text-white">
                      單元 {ui + 1}　{u.title}
                    </span>
                    <span className="text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
                      {unitDone}/{u.chapters.length}
                    </span>
                  </div>
                  <p className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{u.blurb}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {u.chapters.map((c) => {
                      const current = c === tab;
                      const finished = done.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => goTo(c)}
                          aria-current={current ? 'step' : undefined}
                          className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[12px] ${
                            current
                              ? 'border-sky-600 bg-sky-600 text-white dark:bg-sky-400 dark:text-sky-950 dark:border-sky-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-400'
                          }`}
                        >
                          {finished ? <Check className="w-3 h-3" aria-label="已讀" /> : <span className="tabular-nums">{numberOf(c)}</span>}
                          {labelOf(c)}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ol>
        </details>
      )}

      <HubTabBar<T>
        groupStarts={groupStarts}
        tabs={chapters.map((c) => ({ id: c.id, label: c.label_zh }))}
        active={tab}
        onChange={goTo}
        ariaLabel={ariaLabel}
        tone={tabTone}
        numbered
        done={done}
        idPrefix={hubKey}
      />

      <div ref={panelRef} id={`${hubKey}-panel`} role="tabpanel" aria-labelledby={`${hubKey}-tab-${tab}`} className="space-y-8 scroll-mt-32">
        {path && (
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/30 px-3 py-2 text-[13px] no-print">
            <Route className="w-4 h-4 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
            <span className="font-semibold text-emerald-900 dark:text-emerald-100">路線：{path.label}</span>
            <ol className="flex flex-wrap items-center gap-1">
              {path.chapters.map((c, i) => (
                <li key={c} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-emerald-600" aria-hidden="true" />}
                  <button
                    type="button"
                    onClick={() => goTo(c)}
                    aria-current={c === tab ? 'step' : undefined}
                    className={`rounded-md px-1.5 py-0.5 ${c === tab ? 'bg-emerald-600 text-white dark:bg-emerald-400 dark:text-emerald-950 font-semibold' : 'text-emerald-800 dark:text-emerald-200 hover:underline'}`}
                  >
                    {labelOf(c)}
                  </button>
                </li>
              ))}
            </ol>
            {pathNext && (
              <button type="button" onClick={() => goTo(pathNext)} className="ml-auto rounded-lg bg-emerald-700 dark:bg-emerald-500 text-white dark:text-emerald-950 px-2.5 py-1 font-semibold">
                路線下一章：{labelOf(pathNext)}
              </button>
            )}
            <button type="button" onClick={() => setActivePath(null)} className={`${pathNext ? '' : 'ml-auto '}p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/40`} aria-label="結束這條路線">
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
        {unitIdx >= 0 && (
          <p className="text-[12px] font-semibold tracking-wide text-sky-700 dark:text-sky-300">
            單元 {unitIdx + 1}・{units[unitIdx].title}
          </p>
        )}
        <ChapterIntro num={idx + 1} title={chapter.title_zh} goal={chapter.goal_zh} learn={chapter.learn_zh} minutes={chapter.minutes} />
        <ChapterNumberContext.Provider value={idx + 1}>
          <View goTo={goTo} />
        </ChapterNumberContext.Provider>
        {chapterMyths.length > 0 && (
          <section className="space-y-3" aria-label="常見迷思">
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">常見迷思破解</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {chapterMyths.map((m) => (
                <MythFact key={m.myth} myth={m.myth} fact={m.fact} />
              ))}
            </div>
          </section>
        )}
        <KeyTakeaways items={chapter.takeaways_zh} />
        {q && <QuickCheck key={tab} {...q} />}
        {refs.length > 0 && (
          <details className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 px-4 py-3 text-[13px]">
            <summary className="cursor-pointer font-semibold text-slate-700 dark:text-slate-300">本章參考文獻（{refs.length}）</summary>
            <ol className="mt-2 space-y-1.5 list-decimal pl-5 text-slate-600 dark:text-slate-400">
              {refs.map((s) => (
                <li key={s.url + s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline inline-flex items-start gap-1">
                    {s.label}
                    <ExternalLink className="w-3 h-3 mt-1 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}
        <ChapterPager
          prev={prev ? { label: `第 ${idx} 章　${prev.label_zh}`, onClick: () => goTo(prev.id) } : undefined}
          next={next ? { label: `第 ${idx + 2} 章　${next.label_zh}`, onClick: () => goTo(next.id) } : undefined}
          onComplete={() => markDone(tab)}
          completed={done.includes(tab)}
        />
      </div>

      <RelatedNext title={related.title} items={related.items} />

      <p className="text-[12px] leading-relaxed text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">{disclaimer}</p>
    </div>
  );
}
