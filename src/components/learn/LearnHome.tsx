import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  ArrowRight, BookOpen, Search, Leaf, ShieldCheck, Clock, ChevronDown, CheckCircle2,
  Sparkles, HeartPulse, ClipboardList, Stethoscope, GraduationCap, Calculator,
  Bookmark, RotateCcw, LibraryBig, CircleHelp,
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_LESSONS, LEARNING_TRACKS, findLesson, getTrack } from '../../data/learning/tracks';
import { getUpdate, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { DISCOVERY_CATEGORIES, filterDiscoveryTopics, type DiscoveryCategory } from '../../data/learning/discovery';
import { TrackIcon, formatYM } from './learnUi';
import { QuickTips } from './QuickTips';
import './editorial-home.css';

const ActionPlanPanel = lazy(() => import('./ActionPlanPanel').then(m => ({ default: m.ActionPlanPanel })));
const HealthCompassWidget = lazy(() => import('./HealthCompassWidget').then(m => ({ default: m.HealthCompassWidget })));
const MetabolicJourney = lazy(() => import('./MetabolicJourney').then(m => ({ default: m.MetabolicJourney })));

const quickEntries = [
  { label: '建立健康習慣', description: '從一個做得到的小行動開始', href: '#start', icon: Leaf },
  { label: '看懂健檢報告', description: '查數值、量測方式與追蹤', href: '#checkup', icon: ClipboardList },
  { label: '認識人體', description: '用圖解看懂器官如何合作', href: '#systems', icon: HeartPulse },
  { label: '了解就醫方向', description: '從症狀找科別，準備看診', href: '#clinic/by/symptom', icon: Stethoscope },
];

const featured = [
  { trackId: 'eat', label: '飲食', question: '一餐怎麼搭配才均衡？', intro: '用台灣「我的餐盤」看懂六大類食物，從下一餐就能試。' },
  { trackId: 'move', label: '運動', question: '平常很少動，怎麼開始？', intro: '學會用說話測試辨識強度，再從自己做得到的活動開始。' },
  { trackId: 'rest', label: '睡眠', question: '睡滿了，為什麼還是累？', intro: '分清睡多久和睡得好不好，了解哪些線索值得記下來。' },
].map(item => ({ ...item, track: getTrack(item.trackId)! }));

const featuredEvidence = ['UPD-2026-ACSM-RT', 'UPD-2025-STEPS', 'UPD-2024-SLEEP-REG']
  .map(getUpdate)
  .filter(update => update !== undefined);
const CHALLENGE_LESSONS = ['L-MOVE-01', 'L-EAT-01', 'L-REST-01', 'L-PRE-01', 'L-BODY-01', 'L-CHK-01', 'L-MOVE-03', 'L-EAT-04', 'L-MOVE-08']
  .map(findLesson)
  .flatMap(lesson => lesson?.quiz ? [{ ...lesson, quiz: lesson.quiz }] : []);
const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400';

export function LearnHome() {
  const { openModal } = useModal();
  const { progress } = useLearningProgress();
  const { plan } = useActionPlan();
  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = lastLesson ? getTrack(lastLesson.track_id) : undefined;

  useEffect(() => {
    let frame: number | undefined;
    const moveToSection = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (window.location.hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      const targets: Record<string, string> = { '#home/plan': 'my-plan', '#home/topics': 'topics-title' };
      const id = targets[window.location.hash];
      if (!id) return;
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView({ block: 'start' });
        target?.focus({ preventScroll: true });
      });
    };
    moveToSection();
    window.addEventListener('hashchange', moveToSection);
    return () => {
      window.removeEventListener('hashchange', moveToSection);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="discovery-home editorial-home">
      <section className="editorial-hero" aria-labelledby="home-title">
        <div className="editorial-hero-copy">
          <p className="editorial-kicker">Salud 健康學習</p>
          <h1 id="home-title">從生活出發，<br />讀懂你的身體。</h1>
          <p className="editorial-hero-lead">想吃得好、動得自在、睡得安穩？從白話小課開始，跟著圖解讀懂原理，想深入時也找得到研究來源。</p>
          <div className="editorial-hero-actions">
            <button type="button" className={'editorial-search ' + focusClass} onClick={() => openModal('search')}>
              <Search size={21} aria-hidden="true" />
              <span>搜尋健康問題</span>
            </button>
            <a href="#home/topics" className={'editorial-hero-link ' + focusClass}>瀏覽所有主題</a>
          </div>
        </div>
        <img className="editorial-hero-photo" src={import.meta.env.BASE_URL + 'salud-healthy-morning.webp'} alt="" width={1000} height={750} fetchPriority="high" />
      </section>

      {lastLesson && lastTrack && (
        <section className="editorial-resume" aria-label="繼續上次學習">
          <TrackIcon icon={lastTrack.icon} tone={lastTrack.tone} size="sm" />
          <div>
            <p className="editorial-kicker">繼續上次學習</p>
            <a href={'#learn/' + lastTrack.id + '/' + lastLesson.id} className="editorial-inline-link">{lastLesson.title_zh}</a>
          </div>
        </section>
      )}

      <section aria-labelledby="entry-title">
        <SectionHeading id="entry-title" title="今天想了解什麼？" />
        <ul className="editorial-entry-grid">
          {quickEntries.map(({ href, label, description, icon: Icon }) => (
            <li key={href}>
              <a href={href} className="editorial-entry">
                <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                <span><strong>{label}</strong><span>{description}</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-title">
        <SectionHeading id="featured-title" title="從一堂小課開始" description="挑一個你在意的問題，幾分鐘讀懂一個觀念。"
          action={<a href="#learn" className="editorial-inline-link">全部 {ALL_LESSONS.length} 堂小課</a>} />
        <div className="editorial-lesson-grid">
          {featured.map(({ track, label, question, intro }, index) => {
            const lesson = track.lessons[0];
            return (
              <a key={track.id} href={'#learn/' + track.id + '/' + lesson.id} className="editorial-lesson">
                <div className={'discovery-lesson-art discovery-lesson-art-' + index}><LessonArt type={index} /></div>
                <div className="editorial-lesson-copy">
                  <p className="editorial-lesson-meta"><span>{label}</span><Clock size={15} aria-hidden="true" />{lesson.minutes} 分鐘</p>
                  <h3>{question}</h3>
                  <p>{intro}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <TopicDirectory />

      <section aria-labelledby="practice-title">
        <SectionHeading id="practice-title" title="讀完，試著用在生活裡" />
        <div className="editorial-practice-grid">
          <LearningChallenge />
          <div className="editorial-practice-links">
            <a href="#learn/practice" className="editorial-entry"><CircleHelp size={23} aria-hidden="true" /><span><strong>情境練習與閃卡</strong><span>用生活案例與小測驗複習</span></span></a>
            <a href="#learn/academy" className="editorial-entry"><GraduationCap size={23} aria-hidden="true" /><span><strong>認識醫學學科</strong><span>從生理、病理到如何讀研究</span></span></a>
            <a href="#learn/move/L-MOVE-08" className="editorial-entry"><HeartPulse size={23} aria-hidden="true" /><span><strong>為什麼要練肌力和肌耐力？</strong><span>從提菜、走樓梯看兩者的差別</span></span></a>
            <Expandable label="依你的問題推薦閱讀"><HealthCompassWidget /></Expandable>
          </div>
        </div>
      </section>

      <section id="my-plan" tabIndex={-1} className="scroll-mt-24 space-y-4">
        {plan.items.length > 0 ? (
          <Suspense fallback={<p role="status">載入行動計畫…</p>}><ActionPlanPanel /></Suspense>
        ) : <QuickTips sectionKey="home" />}
        <Expandable label="專題：體重、血壓、血糖與血脂"><MetabolicJourney /></Expandable>
      </section>

      <section aria-labelledby="evidence-title">
        <SectionHeading id="evidence-title" title="一起讀懂健康研究" description="每篇摘要說明發現了什麼、適合誰、有哪些限制。"
          action={<a href="#updates" className="editorial-inline-link">查看實證摘要</a>} />
        <ul className="editorial-evidence-list">
          {featuredEvidence.map(update => (
            <li key={update.id}>
              <a href={'#updates/' + update.id}>
                <span className="editorial-evidence-meta">{UPDATE_CATEGORY_META[update.category].label_zh}<time dateTime={update.date}>{formatYM(update.date)}</time></span>
                <span><strong>{update.title_zh}</strong><span className="editorial-evidence-summary">{update.what_it_means_zh}</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tool-title">
        <SectionHeading id="tool-title" title="閱讀與照護工具" />
        <ul className="editorial-entry-grid">
          <li><a href="#glossary" className="editorial-entry"><BookOpen size={22} aria-hidden="true" /><span><strong>健康小辭典</strong><span>用白話查名詞</span></span></a></li>
          <li><button type="button" onClick={() => openModal('simulators')} className="editorial-entry"><Calculator size={22} aria-hidden="true" /><span><strong>互動工具</strong><span>用試算讀懂數字</span></span></button></li>
          <li><button type="button" onClick={() => openModal('backpack')} className="editorial-entry"><Bookmark size={22} aria-hidden="true" /><span><strong>我的收藏與計畫</strong><span>接續這台裝置的學習</span></span></button></li>
          <li><a href="#about" className="editorial-entry"><ShieldCheck size={22} aria-hidden="true" /><span><strong>內容與實證原則</strong><span>了解來源與審閱方式</span></span></a></li>
        </ul>
      </section>

    </div>
  );
}

function SectionHeading({ id, title, description, action }: { id: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="editorial-section-heading">
      <div>
        <h2 id={id} tabIndex={id === 'topics-title' ? -1 : undefined}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function TopicDirectory() {
  const [category, setCategory] = useState<DiscoveryCategory>('all');
  const [expanded, setExpanded] = useState(false);
  const directory = filterDiscoveryTopics(category, expanded);

  return (
    <section className="editorial-directory" aria-labelledby="topics-title">
      <SectionHeading id="topics-title" title="探索健康主題" description="從日常保養、預防健檢，讀到身體機轉和疾病照護。" />
      <div role="group" aria-label="健康主題分類" className="editorial-filters">
        {DISCOVERY_CATEGORIES.map(item => (
          <button key={item.id} type="button" aria-pressed={category === item.id} aria-controls="discovery-results"
            onClick={() => { setCategory(item.id); setExpanded(false); }}>{item.label}</button>
        ))}
      </div>
      <p className="sr-only" role="status">共 {directory.total} 個主題，目前顯示 {directory.topics.length} 個</p>
      <ul id="discovery-results" className="editorial-topic-grid">
        {directory.topics.map(topic => (
          <li key={topic.id}>
            <a href={'#' + topic.hash} className="editorial-entry">
              <TrackIcon icon={topic.icon} tone={topic.tone} size="sm" />
              <span><strong>{topic.title}</strong><span>{topic.description}</span></span>
            </a>
          </li>
        ))}
      </ul>
      {(directory.topics.length < directory.total || expanded) && (
        <button type="button" className="editorial-inline-link mt-3" aria-expanded={expanded} aria-controls="discovery-results"
          onClick={() => setExpanded(!expanded)}>
          <LibraryBig size={18} aria-hidden="true" />{expanded ? '收合主題' : '展開全部 ' + directory.total + ' 個主題'}
        </button>
      )}
    </section>
  );
}

function Expandable({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="editorial-expandable" onToggle={event => setOpen(event.currentTarget.open)}>
      <summary>{label}<ChevronDown size={18} aria-hidden="true" /></summary>
      {open && <div className="pt-4"><Suspense fallback={<p role="status">載入中…</p>}>{children}</Suspense></div>}
    </details>
  );
}

function LearningChallenge() {
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correctIds, setCorrectIds] = useState<string[]>([]);

  const currentLesson = CHALLENGE_LESSONS[questionIdx];
  if (!currentLesson) return null;
  const currentTrack = getTrack(currentLesson.track_id);
  const quiz = currentLesson.quiz;

  const handleSelectOption = (idx: number) => {
    setAnswer(idx);
    if (idx === quiz.answer && !correctIds.includes(currentLesson.id)) {
      setCorrectIds((prev) => [...prev, currentLesson.id]);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#10B981', '#06B6D4', '#F59E0B'],
        });
      }).catch(() => { /* Quiz feedback remains available without animation. */ });
    }
  };

  const handleNextQuestion = () => {
    setAnswer(null);
    setQuestionIdx((prev) => (prev + 1) % CHALLENGE_LESSONS.length);
  };

  return (
    <section className="discovery-card p-6 sm:p-7" aria-labelledby="challenge-title">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="discovery-eyebrow flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          隨堂練習
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          {currentTrack && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {currentTrack.title_zh}
            </span>
          )}
          <span className="font-mono">
            第 {questionIdx + 1} / {CHALLENGE_LESSONS.length} 題
          </span>
          {correctIds.length > 0 && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              答對 {correctIds.length} 題
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <h2 id="challenge-title" className="text-xl font-bold text-slate-900 dark:text-white">
          用一個問題，認識身體
        </h2>
        <button
          type="button"
          onClick={handleNextQuestion}
          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40 ${focusClass}`}
        >
          <span>換一題</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-3 text-base font-medium leading-8 text-slate-700 dark:text-slate-200">
        {quiz.question_zh}
      </p>

      <div className="mt-4 grid gap-2" role="group" aria-label={quiz.question_zh}>
        {quiz.options_zh.map((option, i) => (
          <button
            key={option}
            type="button"
            aria-pressed={answer === i}
            onClick={() => handleSelectOption(i)}
            className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm ${focusClass} ${
              answer === i
                ? 'border-emerald-700 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-200'
                : 'border-slate-200 text-slate-700 hover:border-emerald-500 dark:border-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              {String.fromCharCode(65 + i)}
            </span>
            {option}
            {answer === i && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0" aria-hidden="true" />}
          </button>
        ))}
      </div>

      {answer !== null && (
        <div
          role="status"
          className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm leading-7 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100"
        >
          <p className="font-semibold">
            {answer === quiz.answer ? '答對了！你已經掌握一個實用觀念。' : '差一點！一起看看背後的原理。'}
          </p>
          <p className="mt-1">
            正確答案：{quiz.options_zh[quiz.answer]}。{quiz.explain_zh}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <a
              href={`#learn/${currentLesson.track_id}/${currentLesson.id}`}
              className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4"
            >
              閱讀完整小課：{currentLesson.title_zh}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAnswer(null)}
                className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2.5 py-1 text-xs hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                重答本題
              </button>
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex min-h-10 items-center gap-1 rounded-xl bg-emerald-800 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950"
              >
                <span>下一題挑戰</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-400">
        小測驗只幫助理解，不評估體能或健康風險。
      </p>
    </section>
  );
}

function LessonArt({ type }: { type: number }) {
  if (type === 0) return <svg viewBox="0 0 300 160" fill="none" aria-hidden="true"><ellipse cx="150" cy="139" rx="70" ry="7" fill="currentColor" opacity=".08" /><circle cx="150" cy="78" r="62" fill="var(--surface)" stroke="currentColor" strokeOpacity=".25" /><circle cx="150" cy="78" r="48" stroke="currentColor" strokeOpacity=".3" /><path d="M150 32a46 46 0 0 0 0 92V32Z" fill="currentColor" opacity=".17" /><path d="M153 34a44 44 0 0 1 42 42h-42V34Z" fill="#E4BE80" opacity=".6" /><path d="M153 80h42a44 44 0 0 1-42 42V80Z" fill="#B1CBCD" opacity=".7" /><path d="M124 59c-15-8-20 13-8 18-6 12 15 22 20 9 17-2 9-22-1-19 4-11-6-14-11-8Z" stroke="currentColor" strokeWidth="2" /><path d="M89 38v80m-7-80v18c0 12 14 12 14 0V38m119 0v80m0-80c-13 10-14 32 0 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
  if (type === 1) return <svg viewBox="0 0 300 160" fill="none" aria-hidden="true"><circle cx="170" cy="72" r="57" stroke="currentColor" strokeOpacity=".17" /><path d="M67 133h170m-157-9 13-16m8 16 13-16m8 16 13-16" stroke="currentColor" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" /><path d="m94 95 19-43 32 19 17-9 15 30 34 12c10 3 13 15 5 21H93c-13-3-15-15-9-21l10-9Z" fill="var(--surface)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m113 52 8 43 42 18h58m-88-38 22 6m-18 6 22 6m-39 14-5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="m69 56 8-9 8 9m-8-9v28m128-34h24m-12-12v24" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 300 160" fill="none" aria-hidden="true"><circle cx="151" cy="79" r="59" stroke="currentColor" strokeOpacity=".17" /><path d="M177 32c-48-11-78 47-46 80 19 21 50 17 64-4-44 11-69-40-18-76Z" fill="var(--surface)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m100 34 3 7 8 2-8 3-3 7-3-7-8-3 8-2 3-7Zm99 26 3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" fill="currentColor" fillOpacity=".25" /><path d="M77 125h146m-133 9h120m-18-101 9-9m20 80 9 9" stroke="currentColor" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" /></svg>;
}
