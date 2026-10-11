import React, { useEffect, useRef } from 'react';
import { ExternalLink, LucideIcon, PlayCircle, Printer, RotateCcw, Siren } from 'lucide-react';
import { useHashTab } from '../../../hooks/useHashTab';
import { useChapterProgress } from '../../../hooks/useChapterProgress';
import { HubHero, HeroButton, HeroStat, HeroTone } from './HubHero';
import { HubTabBar, HubTabTone } from './HubTabBar';
import { ChapterIntro, KeyTakeaways, ChapterPager, QuickCheck, MythFact } from './Blocks';
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
}: Props<T>) {
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

      <HubTabBar<T>
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
        <ChapterIntro num={idx + 1} title={chapter.title_zh} goal={chapter.goal_zh} learn={chapter.learn_zh} minutes={chapter.minutes} />
        <View goTo={goTo} />
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
