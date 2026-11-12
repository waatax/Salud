import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Search, Leaf, ShieldCheck, Clock, ChevronDown, CheckCircle2, Sparkles, HeartPulse, ClipboardList, Stethoscope, GraduationCap, Calculator, Bookmark, Sun, Moon, Utensils, Footprints, RotateCcw } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_LESSONS, LEARNING_TRACKS, LEARNING_GOALS, findLesson, getTrack } from '../../data/learning/tracks';
import { calculateLearnerGrowth } from '../../data/learning/masteryAcademy';
import { EVIDENCE_UPDATES, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { DISCOVERY_CATEGORIES, filterDiscoveryTopics, type DiscoveryCategory } from '../../data/learning/discovery';
import { LAB_METRICS } from '../../data/learning/checkup';
import { GLOSSARY } from '../../data/learning/glossary';
import { TONE, TrackIcon, ProgressBar, formatYM } from './learnUi';
import { ActionPlanPanel } from './ActionPlanPanel';
import { QuickTips } from './QuickTips';
import { HealthCompassWidget } from './HealthCompassWidget';
import confetti from 'canvas-confetti';

const MetabolicJourney = lazy(() => import('./MetabolicJourney').then(m => ({ default: m.MetabolicJourney })));
const FIRST_LESSON = LEARNING_TRACKS[0].lessons[0];
const featureTracks = ['eat', 'move', 'rest'].map(id => getTrack(id)!);
const CHALLENGE_LESSON_IDS = [
  'L-MOVE-08',
  'L-MOVE-01',
  'L-EAT-01',
  'L-REST-01',
  'L-PRE-01',
  'L-BODY-01',
  'L-CHK-01',
  'L-MOVE-03',
  'L-EAT-04',
];
const CHALLENGE_LESSONS = CHALLENGE_LESSON_IDS.map(id => findLesson(id)!).filter(Boolean);
const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400';

/** The home page offers one short route into the existing, much deeper library. */
export const LearnHome: React.FC = () => {
  const { go } = useNavigation();
  const { openModal } = useModal();
  const { progress } = useLearningProgress();
  const { plan } = useActionPlan();
  const [category, setCategory] = useState<DiscoveryCategory>('all');
  const [expanded, setExpanded] = useState(false);
  const [goalId, setGoalId] = useState(LEARNING_GOALS[0].id);
  const [showMetabolic, setShowMetabolic] = useState(false);
  const directoryRef = useRef<HTMLElement>(null);
  const goal = LEARNING_GOALS.find(g => g.id === goalId)!;
  const goalLesson = goal.lesson_id ? findLesson(goal.lesson_id) : undefined;
  const goalTrack = getTrack(goal.track_id)!;
  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = lastLesson ? getTrack(lastLesson.track_id) : undefined;
  const done = ALL_LESSONS.filter(l => progress.completed.includes(l.id)).length;
  const growth = calculateLearnerGrowth(progress, plan.items.length);
  const directory = filterDiscoveryTopics(category, expanded);
  const latest = [...EVIDENCE_UPDATES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  useEffect(() => {
    const scroll = () => {
      if (window.location.hash === '#home/plan') {
        requestAnimationFrame(() => document.getElementById('my-plan')?.scrollIntoView({ block: 'start' }));
      }
    };
    scroll();
    window.addEventListener('hashchange', scroll);
    return () => window.removeEventListener('hashchange', scroll);
  }, []);

  const explore = () => {
    directoryRef.current?.scrollIntoView({ block: 'start' });
    directoryRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="discovery-home space-y-10 sm:space-y-14 pb-8 animate-fade-in">
      <section className="discovery-hero relative overflow-hidden rounded-[1.75rem] border border-emerald-200/70 dark:border-emerald-900/70" aria-labelledby="home-title">
        <div className="grid items-center gap-6 px-6 py-9 sm:p-10 xl:grid-cols-[1.35fr_1fr] xl:gap-4">
          <div className="relative z-10">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-emerald-800 dark:text-emerald-300"><span className="h-px w-6 bg-current" /> KNOWLEDGE FOR LIFE</p>
            <h1 id="home-title" className="font-display text-[clamp(1.5rem,7vw,2rem)] sm:text-[2.8rem] font-bold leading-[1.35] tracking-tight text-slate-900 dark:text-white">健康，從好奇開始。<br /><span className="text-emerald-800 dark:text-emerald-300">把身體的事，<br className="sm:hidden" />慢慢讀懂。</span></h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-300">吃什麼、怎麼動、為什麼睡不好？<br />從生活裡的小問題，走進有根據的健康知識。<br className="hidden sm:block" />不需要醫學背景，照自己的步調就好。</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`#learn/basics/${FIRST_LESSON.id}`} className={`discovery-primary ${focusClass}`}><BookOpen className="h-4 w-4" aria-hidden="true" />從一堂小課開始<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
              <button type="button" onClick={explore} className={`discovery-secondary ${focusClass}`}>探索健康主題<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400"><span>{LEARNING_TRACKS.length} 條學習路徑</span><span>{ALL_LESSONS.length} 堂白話小課</span><span>免費閱讀・免註冊</span></p>
          </div>
          <DailyBalance />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-emerald-200/70 dark:border-emerald-900/70 bg-white/60 dark:bg-slate-950/30 px-6 py-4 sm:px-10">
          <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300"><ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />從白話重點、圖解，到研究來源</p>
          <a href="#about" className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 ${focusClass}`}>認識我們的實證原則<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </section>

      <section aria-labelledby="entry-title">
        <div className="mb-4 flex items-center gap-3"><h2 id="entry-title" className="text-base font-bold text-slate-900 dark:text-white">今天，想先了解什麼？</h2><span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /></div>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { title: '我想建立健康習慣', hint: '從小步開始，慢慢累積', hash: 'start', icon: Leaf, color: 'text-emerald-700 dark:text-emerald-300' },
            { title: '我想看懂健檢', hint: '數字的意思與下一步', hash: 'checkup', icon: ClipboardList, color: 'text-rose-700 dark:text-rose-300' },
            { title: '我想認識我的身體', hint: '用圖解理解器官運作', hash: 'systems', icon: HeartPulse, color: 'text-sky-700 dark:text-sky-300' },
            { title: '我想了解就醫方向', hint: '症狀、科別與看診準備', hash: 'clinic/by/symptom', icon: Stethoscope, color: 'text-violet-700 dark:text-violet-300' },
          ].map(item => <a key={item.hash} href={`#${item.hash}`} className={`discovery-card group flex flex-col items-start p-4 sm:p-5 ${focusClass}`}><item.icon className={`mb-4 h-6 w-6 ${item.color}`} strokeWidth={1.5} aria-hidden="true" /><span className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</span><span className="mt-1.5 text-xs leading-6 text-slate-600 dark:text-slate-400">{item.hint}</span><ArrowUpRight className="mt-3 h-4 w-4 self-end text-slate-400 group-hover:text-emerald-700" aria-hidden="true" /></a>)}
        </div>
      </section>

      {/* 30-Second Interactive Health Compass */}
      <HealthCompassWidget />

      {lastLesson && lastTrack && <section className="discovery-card p-5 sm:p-6" aria-label="繼續上次學習"><div className="flex items-center gap-4"><TrackIcon icon={lastTrack.icon} tone={lastTrack.tone} /><div className="min-w-0 flex-1"><p className="mb-1 text-xs text-slate-600 dark:text-slate-400">歡迎回來・已完成 {done} / {ALL_LESSONS.length} 課</p><a href={`#learn/${lastTrack.id}/${lastLesson.id}`} className={`inline-flex items-center gap-2 font-semibold text-slate-900 dark:text-white ${focusClass}`}>繼續閱讀：{lastLesson.title_zh}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a></div></div></section>}

      {/* Learner Growth Passport & Interactive Practice Lab Entry */}
      <section
        aria-labelledby="learner-growth-home-title"
        className="rounded-3xl border border-sky-200/90 bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/50 p-6 sm:p-8 shadow-xs dark:border-sky-900/60 dark:from-sky-950/30 dark:via-slate-900 dark:to-slate-900"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white dark:bg-emerald-400 dark:text-slate-950">
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                從健康小白到醫學知識者
              </span>
              <span className="rounded-full border border-emerald-300/80 bg-white/90 px-3 py-1 text-xs font-bold text-emerald-900 dark:border-emerald-800 dark:bg-slate-900/90 dark:text-emerald-300">
                {growth.currentRank.badge_emoji} 目前等級：Lv.{growth.currentRank.level} {growth.currentRank.title_zh}（{growth.xp} XP）
              </span>
            </div>
            <h2 id="learner-growth-home-title" className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              快樂掌握 {growth.totalPointsCount} 個健康知識點，在生活實作裡愛上 8 大醫學學科
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              學健康不必死背術語！透過 12 道真實家庭與生活情境演練、全站 {ALL_LESSONS.length} 課主動回憶閃卡、真假迷思快打，以及「為什麼生理學與生物化學超迷人」博覽館，一步步升級為守護自己與家人的實證醫學知識者。
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>已掌握知識點：{growth.pointsMasteredCount} / {growth.totalPointsCount}</span>
              <span>情境實戰過關：{growth.scenariosDoneCount} / {growth.totalScenariosCount}</span>
              <span>迷思快打：{growth.mythsDoneCount} / {growth.totalMythsCount}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href="#learn/practice"
              className={`discovery-primary justify-center ${focusClass}`}
            >
              <span>進入情境實戰 & 知識閃卡練習場</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#learn/academy"
              className={`discovery-secondary justify-center ${focusClass}`}
            >
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              <span>探索 8 大迷人醫學學科博覽館</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Spotlight: Maximum Strength x Muscular Endurance (Monster Training & Dr. Ho Li-An Insights) */}
      <section
        aria-labelledby="strength-spotlight-title"
        className="rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/70 via-white to-sky-50/40 p-6 sm:p-8 shadow-xs dark:border-emerald-900/60 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white dark:bg-emerald-400 dark:text-slate-950">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                運動抗老焦點專題
              </span>
              <span className="rounded-full border border-emerald-300/80 bg-white/80 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-emerald-800 dark:bg-slate-900/80 dark:text-emerald-300">
                最大肌力 × 肌耐力 × 怪獸訓練體系觀點
              </span>
            </div>
            <h2 id="strength-spotlight-title" className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              為什麼抗老與日常體力要「先求最大肌力，再求肌耐力」？
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              一般人常誤以為維持健康只要做輕重量多次數或散步。其實把「最大肌力」天花板拉高後，日常重物佔你力量的比例變小，你的「相對肌耐力」與關節防傷餘裕會自動倍增，而且不必練到力竭癱瘓。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href="#exercise/strength"
              className={`discovery-primary justify-center ${focusClass}`}
            >
              <span>體驗最大肌力 × 肌耐力互動專區</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#learn/move/L-MOVE-08"
              className={`discovery-secondary justify-center ${focusClass}`}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>讀 6 分鐘白話小課（L-MOVE-08）</span>
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-title">
        <SectionHeading id="featured-title" eyebrow="A LITTLE LEARNING, EVERY DAY" title="一點時間，學一件對自己好的事" description="先讀懂一個重點，再試著用在生活裡。" action={<a href="#learn" className="discovery-text-link">所有課程<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>} />
        <div className="grid gap-4 md:grid-cols-3">
          {featureTracks.map((track, i) => {
            const lesson = track.lessons[0];
            return <a key={track.id} href={`#learn/${track.id}/${lesson.id}`} className={`discovery-card group overflow-hidden ${focusClass}`}>
              <div className={`discovery-lesson-art discovery-lesson-art-${i}`}><LessonArt type={i} /><span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/85 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-950/80 dark:text-slate-200">{track.title_zh}</span></div>
              <div className="flex h-[calc(100%-10rem)] flex-col p-5"><p className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{lesson.minutes} 分鐘・入門小課</p><h3 className="mt-3 text-lg font-bold leading-7 text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300">{lesson.title_zh}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300 line-clamp-3">{lesson.big_idea_zh}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">讀這堂小課<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></div>
            </a>;
          })}
        </div>
      </section>

      <section id="topic-explorer" ref={directoryRef} tabIndex={-1} aria-labelledby="topics-title" className="scroll-mt-24 focus:outline-none">
        <SectionHeading id="topics-title" eyebrow="FOLLOW YOUR CURIOSITY" title="讓好奇，帶你找到下一頁" description="從日常保養到專科醫學，想讀多深，由你決定。" />
        <button onClick={() => openModal('search')} className={`mb-5 flex min-h-14 w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-left text-sm text-slate-600 transition-colors hover:border-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 ${focusClass}`}><Search className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" /><span className="flex-1">搜尋問題、症狀或名詞，例如：睡不好、膽固醇</span><span className="hidden sm:block text-xs">Ctrl / ⌘ K</span></button>
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="健康主題分類">{DISCOVERY_CATEGORIES.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} aria-controls="discovery-results" onClick={() => { setCategory(item.id); setExpanded(false); }} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${focusClass} ${category === item.id ? 'border-emerald-800 bg-emerald-800 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950' : 'border-slate-200 bg-transparent text-slate-600 hover:border-emerald-600 dark:border-slate-700 dark:text-slate-300'}`}>{item.label}</button>)}</div>
        <p role="status" className="mb-4 text-xs text-slate-600 dark:text-slate-400">{DISCOVERY_CATEGORIES.find(c => c.id === category)!.label}・共 {directory.total} 個主題，顯示 {directory.topics.length} 個</p>
        <div id="discovery-results" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{directory.topics.map(topic => <a key={topic.id} href={`#${topic.hash}`} className={`discovery-card group flex items-start gap-3 p-5 ${focusClass}`}><TrackIcon icon={topic.icon} tone={topic.tone} size="sm" /><div className="min-w-0 flex-1"><h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-white">{topic.title}</h3><p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-400">{topic.description}</p></div><ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 group-hover:text-emerald-700" aria-hidden="true" /></a>)}</div>
        {directory.topics.length < directory.total && <div className="mt-5 text-center"><button type="button" onClick={() => setExpanded(true)} aria-controls="discovery-results" className={`discovery-secondary ${focusClass}`}>展開其餘 {directory.total - directory.topics.length} 個主題<ChevronDown className="h-4 w-4" aria-hidden="true" /></button></div>}
      </section>

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <section className="discovery-card p-6 sm:p-7" aria-labelledby="guide-title"><p className="discovery-eyebrow">YOUR NEXT CHAPTER</p><h2 id="guide-title" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">還不知道從哪裡開始？</h2><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">選一個你在意的問題，找一堂合適的小課。</p><label htmlFor="learning-goal" className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-200">我現在最想了解…</label><select id="learning-goal" value={goalId} onChange={e => setGoalId(e.target.value)} className={`mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${focusClass}`}>{LEARNING_GOALS.map(g => <option key={g.id} value={g.id}>{g.label_zh}</option>)}</select><div className="mt-5 rounded-2xl bg-emerald-50/70 p-5 dark:bg-emerald-950/40"><p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">推薦起點・{goalTrack.title_zh}</p><h3 className="mt-2 font-bold leading-7 text-slate-900 dark:text-white">{goalLesson?.title_zh ?? goalTrack.title_zh}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{goal.hint_zh}</p><a href={`#learn/${goal.track_id}${goal.lesson_id ? `/${goal.lesson_id}` : ''}`} className="discovery-text-link mt-4">開始閱讀{goalLesson ? `・${goalLesson.minutes} 分鐘` : ''}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div><p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-400">這是閱讀導引，不是症狀評估或診斷。</p></section>
        <LearningChallenge />
      </div>

      <section aria-labelledby="practice-title" className="discovery-practice rounded-[1.75rem] border border-emerald-200 p-6 sm:p-8 dark:border-emerald-900"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="discovery-eyebrow">SMALL STEPS, REAL LIFE</p><h2 id="practice-title" className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">學到的，慢慢變成生活裡的。</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">不用一次改變全部。從一個做得到的小行動開始。</p></div><a href="#start" className={`discovery-primary shrink-0 ${focusClass}`}>看看 4 週啟動計畫<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div></section>
      <div id={plan.items.length > 0 ? undefined : "my-plan"} className="scroll-mt-24">{plan.items.length > 0 ? <ActionPlanPanel /> : <QuickTips sectionKey="home" />}</div>
      <details className="discovery-card group p-5 sm:p-6" onToggle={e => setShowMetabolic(e.currentTarget.open)}><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-slate-900 dark:text-white"><span className="flex items-center gap-2"><HeartPulse className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />專題：體重與三高，接成自己的下一步</span><ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>{showMetabolic && <div className="mt-5"><Suspense fallback={<p role="status">載入專題中…</p>}><MetabolicJourney /></Suspense></div>}</details>

      <section aria-labelledby="evidence-title"><SectionHeading id="evidence-title" eyebrow="READ THE EVIDENCE" title="研究怎麼說？一起讀懂" description="除了新發現，也看研究限制與適用對象。" action={<a href="#updates" className="discovery-text-link">更多實證<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>} /><div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">{latest.map(update => <a key={update.id} href={`#updates/${update.id}`} className={`group flex gap-4 py-5 sm:gap-7 ${focusClass}`}><div className="w-20 shrink-0 pt-1 text-xs leading-6 text-slate-600 dark:text-slate-400"><span className="block font-semibold text-emerald-800 dark:text-emerald-300">{UPDATE_CATEGORY_META[update.category].label_zh}</span><time dateTime={update.date}>{formatYM(update.date)}</time></div><div className="min-w-0 flex-1"><h3 className="font-semibold leading-7 text-slate-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300">{update.title_zh}</h3><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400 line-clamp-2">{update.what_it_means_zh}</p></div><ArrowUpRight className="mt-2 hidden h-4 w-4 shrink-0 text-slate-400 sm:block" aria-hidden="true" /></a>)}</div></section>

      <section aria-labelledby="tool-title"><SectionHeading id="tool-title" eyebrow="KEEP THESE CLOSE" title="需要的時候，這裡找得到" /><div className="grid gap-3 sm:grid-cols-2">{[
        { title: '健康小辭典', hint: `${GLOSSARY.length} 個名詞，用日常語言解釋`, icon: BookOpen, action: () => go('glossary') },
        { title: '看懂檢驗數值', hint: `${LAB_METRICS.length} 項檢驗的意義、限制與追蹤`, icon: ClipboardList, action: () => go('checkup') },
        { title: '互動試算工具', hint: '用操作理解數字，結果僅供衛教參考', icon: Calculator, action: () => openModal('simulators') },
        { title: '我的收藏與計畫', hint: '儲存在這個瀏覽器，不需要帳號', icon: Bookmark, action: () => openModal('backpack') },
      ].map(tool => <button key={tool.title} type="button" onClick={tool.action} className={`discovery-card flex items-center gap-4 p-5 text-left ${focusClass}`}><tool.icon className="h-6 w-6 shrink-0 text-emerald-700 dark:text-emerald-400" strokeWidth={1.5} aria-hidden="true" /><span className="flex-1"><span className="block text-sm font-semibold text-slate-900 dark:text-white">{tool.title}</span><span className="mt-1 block text-xs leading-6 text-slate-600 dark:text-slate-400">{tool.hint}</span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" /></button>)}</div></section>
      <aside className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"><p className="max-w-xl text-xs leading-7 text-slate-600 dark:text-slate-400">Salud 是健康教育平台。閱讀能幫助你理解身體、準備與醫療人員的討論；個人診斷、治療與用藥仍需專業評估。</p><button onClick={() => openModal('emergency')} className={`min-h-11 shrink-0 text-sm font-semibold text-rose-800 dark:text-rose-300 ${focusClass}`}>辨識需要立即就醫的警訊 →</button></aside>
    </div>
  );
};

function SectionHeading({ id, eyebrow, title, description, action }: { id: string; eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="discovery-eyebrow">{eyebrow}</p><h2 id={id} className="mt-2 text-xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white sm:text-2xl">{title}</h2>{description && <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{description}</p>}</div>{action}</div>;
}

function LearningChallenge() {
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correctIds, setCorrectIds] = useState<string[]>([]);

  const currentLesson = CHALLENGE_LESSONS[questionIdx] || CHALLENGE_LESSONS[0];
  const currentTrack = getTrack(currentLesson.track_id);
  const quiz = currentLesson.quiz!;

  const handleSelectOption = (idx: number) => {
    setAnswer(idx);
    if (idx === quiz.answer) {
      if (!correctIds.includes(currentLesson.id)) {
        setCorrectIds((prev) => [...prev, currentLesson.id]);
      }
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#10B981', '#06B6D4', '#F59E0B'],
        });
      } catch {
        // Safe in headless test environments
      }
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
          A MOMENT OF DISCOVERY
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

/** Editorial vector art stays crisp at large text sizes and needs no remote image request. */
function DailyBalance() {
  return <div className="discovery-balance relative mx-auto hidden w-full max-w-[310px] xl:block" aria-hidden="true"><svg viewBox="0 0 320 310" fill="none" className="w-full"><path d="M42 135C22 52 104 10 176 27c82 19 136 85 111 169-22 73-108 98-176 68C56 240 54 184 42 135Z" fill="currentColor" opacity=".07" /><circle cx="162" cy="150" r="102" stroke="currentColor" strokeOpacity=".16" /><circle cx="162" cy="150" r="76" stroke="currentColor" strokeOpacity=".12" strokeDasharray="3 7" /><path d="M159 217v-94m0 58c-42-3-56-29-51-55 32 1 51 20 51 55Zm1-28c-3-41 17-67 48-70 5 34-10 58-48 70Z" fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="m114 134 44 47m45-89-42 60" stroke="currentColor" strokeWidth="1.5" /><circle cx="162" cy="48" r="22" fill="var(--surface)" stroke="currentColor" strokeOpacity=".2" /><circle cx="64" cy="178" r="22" fill="var(--surface)" stroke="currentColor" strokeOpacity=".2" /><circle cx="256" cy="178" r="22" fill="var(--surface)" stroke="currentColor" strokeOpacity=".2" /></svg><Sun className="absolute left-[46%] top-[11%] h-7 w-7" strokeWidth={1.3} /><Utensils className="absolute left-[16%] top-[53%] h-7 w-7" strokeWidth={1.3} /><Moon className="absolute left-[76%] top-[53%] h-7 w-7" strokeWidth={1.3} /><p className="absolute inset-x-0 bottom-2 text-center text-xs tracking-[0.2em]">好好吃・自在動・安心睡</p></div>;
}

function LessonArt({ type }: { type: number }) {
  if (type === 0) return <svg viewBox="0 0 300 160" fill="none" aria-hidden="true"><ellipse cx="150" cy="139" rx="70" ry="7" fill="currentColor" opacity=".08" /><circle cx="150" cy="78" r="62" fill="var(--surface)" stroke="currentColor" strokeOpacity=".25" /><circle cx="150" cy="78" r="48" stroke="currentColor" strokeOpacity=".3" /><path d="M150 32a46 46 0 0 0 0 92V32Z" fill="currentColor" opacity=".17" /><path d="M153 34a44 44 0 0 1 42 42h-42V34Z" fill="#E4BE80" opacity=".6" /><path d="M153 80h42a44 44 0 0 1-42 42V80Z" fill="#B1CBCD" opacity=".7" /><path d="M124 59c-15-8-20 13-8 18-6 12 15 22 20 9 17-2 9-22-1-19 4-11-6-14-11-8Z" stroke="currentColor" strokeWidth="2" /><path d="M89 38v80m-7-80v18c0 12 14 12 14 0V38m119 0v80m0-80c-13 10-14 32 0 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
  if (type === 1) return <svg viewBox="0 0 300 160" fill="none" aria-hidden="true"><circle cx="170" cy="72" r="57" stroke="currentColor" strokeOpacity=".17" /><path d="M67 133h170m-157-9 13-16m8 16 13-16m8 16 13-16" stroke="currentColor" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" /><path d="m94 95 19-43 32 19 17-9 15 30 34 12c10 3 13 15 5 21H93c-13-3-15-15-9-21l10-9Z" fill="var(--surface)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m113 52 8 43 42 18h58m-88-38 22 6m-18 6 22 6m-39 14-5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="m69 56 8-9 8 9m-8-9v28m128-34h24m-12-12v24" stroke="currentColor" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" /></svg>;
  return <svg viewBox="0 0 300 160" fill="none" aria-hidden="true"><circle cx="151" cy="79" r="59" stroke="currentColor" strokeOpacity=".17" /><path d="M177 32c-48-11-78 47-46 80 19 21 50 17 64-4-44 11-69-40-18-76Z" fill="var(--surface)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m100 34 3 7 8 2-8 3-3 7-3-7-8-3 8-2 3-7Zm99 26 3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" fill="currentColor" fillOpacity=".25" /><path d="M77 125h146m-133 9h120m-18-101 9-9m20 80 9 9" stroke="currentColor" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" /></svg>;
}
