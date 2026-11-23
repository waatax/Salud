import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  ArrowRight, BookOpen, Leaf, ShieldCheck, Clock, ChevronDown, CheckCircle2,
  Sparkles, HeartPulse, ClipboardList, Stethoscope, GraduationCap, Calculator,
  Bookmark, RotateCcw, LibraryBig, CircleHelp,
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_LESSONS, findLesson, getTrack } from '../../data/learning/tracks';
import { getUpdate, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { DISCOVERY_CATEGORIES, filterDiscoveryTopics, type DiscoveryCategory } from '../../data/learning/discovery';
import { TrackIcon, formatYM } from './learnUi';
import './editorial-home.css';

const ActionPlanPanel = lazy(() => import('./ActionPlanPanel').then(m => ({ default: m.ActionPlanPanel })));
const QuickTips = lazy(() => import('./QuickTips').then(m => ({ default: m.QuickTips })));
const HealthCompassWidget = lazy(() => import('./HealthCompassWidget').then(m => ({ default: m.HealthCompassWidget })));
const MetabolicJourney = lazy(() => import('./MetabolicJourney').then(m => ({ default: m.MetabolicJourney })));

const quickEntries = [
  { label: '建立健康習慣', description: '從一個做得到的小行動開始', href: '#start', icon: Leaf },
  { label: '看懂健檢報告', description: '查數值、量測方式與追蹤', href: '#checkup', icon: ClipboardList },
  { label: '認識人體', description: '用圖解看懂器官如何合作', href: '#systems', icon: HeartPulse },
  { label: '了解就醫方向', description: '從症狀找科別，準備看診', href: '#clinic/by/symptom', icon: Stethoscope },
];

const guides = [
  { id: 'move', label: '開始運動', lessonId: 'L-MOVE-01', title: '散步時，怎麼知道自己走得夠快？',
    intro: '在熟悉的路上走一段，留意自己還能不能邊走邊說話。從這個小觀察，學會分辨活動強度。',
    photo: 'salud-park-walk.webp', more: '讀懂步數研究', href: '#updates/UPD-2025-STEPS' },
  { id: 'eat', label: '搭配三餐', lessonId: 'L-EAT-01', title: '打開便當，這一餐還少了什麼？',
    intro: '看看飯、菜和主菜各占多少，再用台灣「我的餐盤」想一想，下一餐可以多搭配哪一類食物。',
    photo: 'salud-healthy-morning.webp', more: '比較常見飲食法', href: '#diet/patterns' },
  { id: 'rest', label: '睡個好覺', lessonId: 'L-REST-01', title: '睡了好幾個鐘頭，醒來還是累？',
    intro: '昨晚幾點睡、半夜醒了幾次、白天精神如何？把這些線索放在一起，比只看時數更能描述自己的睡眠。',
    photo: 'salud-sleep-journal.webp', more: '讀懂睡眠規律研究', href: '#updates/UPD-2024-SLEEP-REG' },
];

function guideFromHash() {
  return guides.find(guide => window.location.hash === '#home/read/' + guide.id) ?? guides[0];
}

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
  const [guide, setGuide] = useState(guideFromHash);
  const featureLesson = findLesson(guide.lessonId)!;
  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = lastLesson ? getTrack(lastLesson.track_id) : undefined;

  useEffect(() => {
    let frame: number | undefined;
    const moveToSection = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (window.location.hash.startsWith('#home/read/')) {
        setGuide(guideFromHash());
        return;
      }
      if (window.location.hash === '#home') {
        setGuide(guides[0]);
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
      <section className="reading-edition" aria-labelledby="home-title">
        <div className="edition-masthead">
          <h1 id="home-title">生活裡的健康課</h1>
          <nav aria-label="選讀生活主題" className="edition-choices">
            {guides.map(item => <a key={item.id} href={'#home/read/' + item.id}
              aria-current={guide.id === item.id ? 'true' : undefined}>{item.label}</a>)}
          </nav>
        </div>
        <div className="editorial-hero">
          <div className="editorial-hero-copy">
            <p className="edition-meta"><BookOpen size={17} aria-hidden="true" />{guide.label}入門<span aria-hidden="true">·</span><Clock size={15} aria-hidden="true" />約 {featureLesson.minutes} 分鐘</p>
            <h2>{guide.title}</h2>
            <p className="editorial-hero-lead">{guide.intro}</p>
            <div className="editorial-hero-actions">
              <a className="editorial-primary" href={'#learn/' + featureLesson.track_id + '/' + featureLesson.id}>閱讀這堂小課</a>
              <a className="editorial-hero-link" href={guide.href}>{guide.more}</a>
            </div>
          </div>
          <img className="editorial-hero-photo" src={import.meta.env.BASE_URL + guide.photo} alt="" width={1000} height={750} fetchPriority="high" />
        </div>
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
        <SectionHeading id="entry-title" title="依需求找內容" action={<a href="#home/topics" className="editorial-inline-link">瀏覽所有主題</a>} />
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
        ) : <Suspense fallback={null}><QuickTips sectionKey="home" /></Suspense>}
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
      <SectionHeading id="topics-title" title="探索健康主題" action={<a href="#learn" className="editorial-inline-link">全部 {ALL_LESSONS.length} 堂小課</a>} description="從日常保養、預防健檢，讀到身體機轉和疾病照護。" />
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
