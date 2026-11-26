import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  ArrowRight, BookOpen, Leaf, ShieldCheck, Clock, ChevronDown, CheckCircle2,
  Sparkles, HeartPulse, ClipboardList, Stethoscope, GraduationCap, Calculator,
  Bookmark, RotateCcw, LibraryBig, CircleHelp, Search, Compass,
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { getDueLessonIds } from '../../compose/spacedRepetition';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_LESSONS, LEARNING_TRACKS, findLesson, getTrack } from '../../data/learning/tracks';
import { getUpdate, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { DISCOVERY_CATEGORIES, DISCOVERY_TOPICS, filterDiscoveryTopics, type DiscoveryCategory } from '../../data/learning/discovery';
import { TrackIcon, ProgressBar, formatYM } from './learnUi';
import './editorial-home.css';

const ActionPlanPanel = lazy(() => import('./ActionPlanPanel').then(m => ({ default: m.ActionPlanPanel })));
const QuickTips = lazy(() => import('./QuickTips').then(m => ({ default: m.QuickTips })));
const HealthCompassWidget = lazy(() => import('./HealthCompassWidget').then(m => ({ default: m.HealthCompassWidget })));
const MetabolicJourney = lazy(() => import('./MetabolicJourney').then(m => ({ default: m.MetabolicJourney })));

const quickEntries = [
  { label: '建立健康習慣', description: '從一個做得到的小行動開始', href: '#start', icon: Leaf, tone: 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300' },
  { label: '看懂健檢報告', description: '查數值、量測方式與追蹤', href: '#checkup', icon: ClipboardList, tone: 'bg-rose-100/80 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300' },
  { label: '認識人體', description: '用圖解看懂器官如何合作', href: '#systems', icon: HeartPulse, tone: 'bg-sky-100/85 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300' },
  { label: '了解就醫方向', description: '從症狀找科別，準備看診', href: '#clinic/by/symptom', icon: Stethoscope, tone: 'bg-teal-100/85 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300' },
];

const QUICK_QUESTION_CHIPS = [
  { label: '血壓偏高怎麼量', query: '血壓' },
  { label: '健檢 LDL 紅字', query: 'LDL' },
  { label: '外食便當怎麼配', query: '便當' },
  { label: '睡不好・半夜醒', query: '失眠' },
  { label: '手麻腳麻找原因', query: '手麻' },
  { label: '減重藥與增肌', query: '猛健樂' },
];

const guides = [
  { id: 'move', label: '開始運動', lessonId: 'L-MOVE-01', title: '散步時，怎麼知道自己走得夠快？',
    intro: '在熟悉的路上走一段，留意自己還能不能邊走邊說話。從這個小觀察，學會分辨活動強度。',
    photo: 'salud-park-walk.webp', photoAlt: '清晨綠蔭公園步道上輕鬆健走的日常景象', more: '讀懂步數研究', href: '#updates/UPD-2025-STEPS' },
  { id: 'eat', label: '搭配三餐', lessonId: 'L-EAT-01', title: '打開便當，這一餐還少了什麼？',
    intro: '看看飯、菜和主菜各占多少，再用台灣「我的餐盤」想一想，下一餐可以多搭配哪一類食物。',
    photo: 'salud-healthy-morning.webp', photoAlt: '晨光中桌上擺放開水、筆記本與新鮮水果的健康早晨', more: '比較常見飲食法', href: '#diet/patterns' },
  { id: 'rest', label: '睡個好覺', lessonId: 'L-REST-01', title: '睡了好幾個鐘頭，醒來還是累？',
    intro: '昨晚幾點睡、半夜醒了幾次、白天精神如何？把這些線索放在一起，比只看時數更能描述自己的睡眠。',
    photo: 'salud-sleep-journal.webp', photoAlt: '清晨窗光照在床邊攤開的日誌和鉛筆上', more: '讀懂睡眠規律研究', href: '#updates/UPD-2024-SLEEP-REG' },
];

function guideFromHash() {
  return guides.find(guide => window.location.hash === '#home/read/' + guide.id) ?? guides[0];
}

const lessonIds = ALL_LESSONS.filter(lesson => lesson.quiz).map(lesson => lesson.id);
const featuredEvidence = ['UPD-2026-ACSM-RT', 'UPD-2025-STEPS', 'UPD-2024-SLEEP-REG']
  .map(getUpdate)
  .filter(update => update !== undefined);
const CHALLENGE_LESSONS = ['L-MOVE-01', 'L-EAT-01', 'L-REST-01', 'L-PRE-01', 'L-BODY-01', 'L-CHK-01', 'L-MOVE-03', 'L-EAT-04', 'L-MOVE-08']
  .map(findLesson)
  .flatMap(lesson => lesson?.quiz ? [{ ...lesson, quiz: lesson.quiz }] : []);
const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400';

const CATEGORY_COUNTS: Record<DiscoveryCategory, number> = {
  all: DISCOVERY_TOPICS.length,
  daily: DISCOVERY_TOPICS.filter(t => t.category === 'daily').length,
  prevention: DISCOVERY_TOPICS.filter(t => t.category === 'prevention').length,
  care: DISCOVERY_TOPICS.filter(t => t.category === 'care').length,
  body: DISCOVERY_TOPICS.filter(t => t.category === 'body').length,
};

export function LearnHome() {
  const { openModal, openSearch } = useModal();
  const { progress } = useLearningProgress();
  const { plan } = useActionPlan();
  const [guide, setGuide] = useState(guideFromHash);
  const featureLesson = findLesson(guide.lessonId)!;
  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = lastLesson ? getTrack(lastLesson.track_id) : undefined;
  const lastDone = lastLesson ? progress.completed.includes(lastLesson.id) : false;
  const nextLesson = lastDone && lastTrack ? lastTrack.lessons.find(lesson => !progress.completed.includes(lesson.id)) : undefined;
  const resumeLesson = nextLesson ?? lastLesson;
  const completedCount = progress.completed.filter(id => ALL_LESSONS.some(l => l.id === id)).length;
  const dueCount = getDueLessonIds(lessonIds, progress).length;

  useEffect(() => {
    let frame: number | undefined;
    const moveToSection = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      setGuide(guideFromHash());
      if (window.location.hash === '#home' || window.location.hash === '') {
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
          <div>
            <h1 id="home-title">生活裡的健康課</h1>
            <p className="edition-subline">免費・無廣告・依 2024–2026 實證指引與台灣衛教來源編寫</p>
          </div>
          <nav aria-label="選讀生活主題" className="edition-choices">
            {guides.map(item => <a key={item.id} href={'#home/read/' + item.id}
              aria-current={guide.id === item.id ? 'true' : undefined}>{item.label}</a>)}
          </nav>
        </div>
        <div className="editorial-hero">
          <div className="editorial-hero-copy">
            <p className="edition-meta"><BookOpen size={17} aria-hidden="true" />{guide.label}入門<span aria-hidden="true">·</span><Clock size={15} aria-hidden="true" />約 {featureLesson.minutes} 分鐘</p>
            <h2 aria-live="polite">{guide.title}</h2>
            <p className="editorial-hero-lead">{guide.intro}</p>
            <div className="editorial-hero-actions">
              <a className="editorial-primary" href={'#learn/' + featureLesson.track_id + '/' + featureLesson.id}>
                <span>閱讀這堂小課</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="editorial-hero-link" href={guide.href}>{guide.more}</a>
            </div>
          </div>
          <img className="editorial-hero-photo" src={import.meta.env.BASE_URL + guide.photo} alt={guide.photoAlt} width={1000} height={750} fetchPriority="high" />
        </div>
      </section>

      {/* Adaptive Learning Pulse: returning progress vs. zero-pressure beginner guide */}
      {((resumeLesson && lastTrack) || dueCount > 0) ? (
        <section className="editorial-resume" aria-label="我的學習">
          {resumeLesson && lastTrack && (
            <div className="editorial-resume-lesson">
              <TrackIcon icon={lastTrack.icon} tone={lastTrack.tone} size="sm" />
              <div className="min-w-0">
                <p className="editorial-kicker">
                  {nextLesson ? '接著讀' : lastDone ? '回顧上次的小課' : '繼續上次學習'}
                  {completedCount > 0 && <span className="ml-2 font-mono font-semibold opacity-75">· 已完成 {completedCount}/{ALL_LESSONS.length} 課</span>}
                </p>
                <a href={'#learn/' + lastTrack.id + '/' + resumeLesson.id} className="editorial-inline-link">{resumeLesson.title_zh}</a>
              </div>
            </div>
          )}
          {dueCount > 0 && (
            <a className="editorial-review-pill" href="#learn/mastery/recall">
              <RotateCcw size={16} aria-hidden="true" />
              <span>複習 {dueCount} 堂小課</span>
            </a>
          )}
        </section>
      ) : (
        <section className="editorial-welcome-strip" aria-label="新手輕鬆起點">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200 shrink-0">
            <Compass size={18} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>第一次來？照自己的步調就好：</span>
          </div>
          <ol className="editorial-welcome-steps">
            <li><a href="#learn/basics/L-BAS-01"><strong>1. 讀一堂 5 分鐘白話課</strong></a></li>
            <li><a href="#practice-title"><strong>2. 試玩 1 題生活小測驗</strong></a></li>
            <li><a href="#start"><strong>3. 挑 1 件今天能做的小事</strong></a></li>
          </ol>
        </section>
      )}

      {/* Instant Question Funnel (Mayo Clinic / NHS pattern) */}
      <section className="editorial-ask-band" aria-labelledby="ask-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="ask-title" className="text-base font-bold text-slate-900 dark:text-white shrink-0">
            今天想弄懂什麼健康問題？
          </h2>
          <button
            type="button"
            onClick={() => openSearch('')}
            className={`editorial-search-trigger ${focusClass}`}
            aria-label="搜尋健康問題、症狀、健檢數值或飲食"
          >
            <Search size={17} aria-hidden="true" />
            <span>搜尋症狀、健檢紅字、食物或運動（例如：LDL、血壓 722、脂肪肝…）</span>
          </button>
        </div>
        <div className="editorial-chip-row" aria-label="常查的健康問題">
          {QUICK_QUESTION_CHIPS.map(chip => (
            <button
              key={chip.query}
              type="button"
              onClick={() => openSearch(chip.query)}
              className={`editorial-question-chip ${focusClass}`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="entry-title">
        <SectionHeading id="entry-title" title="依需求找內容" action={<a href="#home/topics" className="editorial-inline-link">瀏覽所有主題</a>} />
        <ul className="editorial-entry-grid">
          {quickEntries.map(({ href, label, description, icon: Icon, tone }) => (
            <li key={href}>
              <a href={href} className="editorial-entry">
                <span className={`editorial-entry-medallion ${tone}`} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span><strong>{label}</strong><span>{description}</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Guided 8 Learning Tracks Showcase */}
      <section aria-labelledby="tracks-preview-title">
        <SectionHeading
          id="tracks-preview-title"
          title="從生活讀進醫學：8 條白話學習路徑"
          description={`共 ${ALL_LESSONS.length} 堂 5–8 分鐘白話小課，每課附重點、生活比喻、行動步驟、小測驗與實證來源。`}
          action={<a href="#learn" className="editorial-inline-link">查看全部路徑與課表<ArrowRight size={15} aria-hidden="true" /></a>}
        />
        <ul className="editorial-track-grid">
          {LEARNING_TRACKS.map(track => {
            const trackDone = track.lessons.filter(l => progress.completed.includes(l.id)).length;
            const pct = track.lessons.length > 0 ? Math.round((trackDone / track.lessons.length) * 100) : 0;
            const totalMin = track.lessons.reduce((s, l) => s + l.minutes, 0);
            return (
              <li key={track.id}>
                <a href={`#learn/${track.id}`} className="editorial-track-card">
                  <div className="flex items-start gap-3">
                    <TrackIcon icon={track.icon} tone={track.tone} size="sm" />
                    <div className="min-w-0 flex-1">
                      <strong className="block text-[0.98rem] text-slate-900 dark:text-white leading-snug">{track.title_zh}</strong>
                      <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        {track.lessons.length} 課 · 約 {totalMin} 分鐘
                        {trackDone > 0 && ` · 已完成 ${trackDone}`}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs leading-6 text-slate-600 dark:text-slate-300 line-clamp-2">{track.subtitle_zh}</p>
                  <ProgressBar value={pct} tone={track.tone} label={`${track.title_zh}進度`} />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <TopicDirectory />

      <section aria-labelledby="practice-title">
        <SectionHeading id="practice-title" title="讀完，邊玩邊記住" description="透過隨堂小測驗、生活案例拆解與間隔複習，把健康知識真正融會貫通。" />
        <div className="editorial-practice-grid">
          <LearningChallenge />
          <div className="editorial-practice-links">
            <a href="#learn/mastery" className="editorial-entry editorial-entry-featured">
              <span className="editorial-entry-medallion bg-emerald-700 text-white dark:bg-emerald-400 dark:text-emerald-950" aria-hidden="true">
                <Sparkles size={20} />
              </span>
              <span>
                <strong className="flex flex-wrap items-center gap-2">
                  <span>健康學習工作坊</span>
                  {dueCount > 0 && (
                    <span className="rounded-full bg-amber-100 dark:bg-amber-900/70 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:text-amber-200">
                      {dueCount} 待複習
                    </span>
                  )}
                </strong>
                <span>看範例拆解、跨主題間隔回憶、串聯觀念與費曼筆記</span>
              </span>
            </a>
            <a href="#learn/practice" className="editorial-entry"><CircleHelp size={22} aria-hidden="true" /><span><strong>情境練習與閃卡</strong><span>12 個真實生活與臨床案例＋迷思是非快閃</span></span></a>
            <a href="#learn/academy" className="editorial-entry"><GraduationCap size={22} aria-hidden="true" /><span><strong>認識 8 大醫學學科</strong><span>從生理、生化、運動力學到怎麼讀懂研究</span></span></a>
            <a href="#learn/move/L-MOVE-08" className="editorial-entry"><HeartPulse size={22} aria-hidden="true" /><span><strong>為什麼要練肌力和肌耐力？</strong><span>從提菜、走樓梯看兩者的差別</span></span></a>
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
        <SectionHeading id="evidence-title" title="一起讀懂健康研究" description="每篇摘要說明發現了什麼、適合誰、有哪些限制，並附原始出處。"
          action={<a href="#updates" className="editorial-inline-link">查看全部實證摘要<ArrowRight size={15} aria-hidden="true" /></a>} />
        <ul className="editorial-evidence-list">
          {featuredEvidence.map(update => (
            <li key={update.id}>
              <a href={'#updates/' + update.id}>
                <span className="editorial-evidence-meta">
                  {UPDATE_CATEGORY_META[update.category].label_zh}
                  <time dateTime={update.date}>{formatYM(update.date)}</time>
                  <span className="editorial-evidence-org">{update.org}</span>
                </span>
                <span>
                  <strong>{update.title_zh}</strong>
                  <span className="editorial-evidence-summary">{update.what_it_means_zh}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tool-title">
        <SectionHeading id="tool-title" title="閱讀與照護工具" />
        <ul className="editorial-entry-grid editorial-utility-grid">
          <li><a href="#glossary" className="editorial-entry"><BookOpen size={20} aria-hidden="true" /><span><strong>健康小辭典</strong><span>用白話查名詞與易混淆縮寫</span></span></a></li>
          <li><button type="button" onClick={() => openModal('simulators')} className="editorial-entry"><Calculator size={20} aria-hidden="true" /><span><strong>18+ 互動試算工具</strong><span>動手換算水合、血壓、咖啡因</span></span></button></li>
          <li><button type="button" onClick={() => openModal('backpack')} className="editorial-entry"><Bookmark size={20} aria-hidden="true" /><span><strong>我的收藏與計畫</strong><span>接續這台裝置的學習紀錄</span></span></button></li>
          <li><a href="#about" className="editorial-entry"><ShieldCheck size={20} aria-hidden="true" /><span><strong>內容與實證原則</strong><span>了解資料來源與審閱標準</span></span></a></li>
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
      <SectionHeading id="topics-title" title="探索 24 大健康專區" action={<a href="#learn" className="editorial-inline-link">全部 {ALL_LESSONS.length} 堂小課</a>} description="從日常保養、預防健檢，一路讀到人體圖解與專科照護。" />
      <div role="group" aria-label="健康主題分類" className="editorial-filters">
        {DISCOVERY_CATEGORIES.map(item => (
          <button key={item.id} type="button" aria-pressed={category === item.id} aria-controls="discovery-results"
            onClick={() => { setCategory(item.id); setExpanded(false); }}>
            <span>{item.label}</span>
            <span className="ml-1.5 text-xs opacity-75 tabular-nums">{CATEGORY_COUNTS[item.id]}</span>
          </button>
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
  const { recordRecall } = useLearningProgress();
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correctIds, setCorrectIds] = useState<string[]>([]);
  const [scheduledId, setScheduledId] = useState<string | null>(null);

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
          colors: ['#047857', '#10B981', '#F59E0B'],
        });
      }).catch(() => { /* Quiz feedback remains available without animation. */ });
    }
  };

  const handleJump = (nextIdx: number) => {
    setAnswer(null);
    setScheduledId(null);
    setQuestionIdx(nextIdx);
  };

  const handleNextQuestion = () => handleJump((questionIdx + 1) % CHALLENGE_LESSONS.length);

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

      {/* Mini progress dots */}
      <div className="mt-3 flex items-center gap-1.5" aria-label="隨堂練習題目進度">
        {CHALLENGE_LESSONS.map((l, i) => {
          const isCur = i === questionIdx;
          const isHit = correctIds.includes(l.id);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => handleJump(i)}
              aria-label={`跳至第 ${i + 1} 題${isHit ? '（已答對）' : ''}`}
              aria-current={isCur ? 'step' : undefined}
              className={`h-2 rounded-full transition-all ${
                isCur
                  ? 'w-7 bg-emerald-700 dark:bg-emerald-400'
                  : isHit
                  ? 'w-2.5 bg-emerald-400 dark:bg-emerald-600'
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600'
              }`}
            />
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
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

      <p className="mt-3 text-base font-medium leading-8 text-slate-800 dark:text-slate-100">
        {quiz.question_zh}
      </p>

      <div className="mt-4 grid gap-2" role="group" aria-label={quiz.question_zh}>
        {quiz.options_zh.map((option, i) => {
          const picked = answer === i;
          const isRight = i === quiz.answer;
          const revealed = answer !== null;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={picked}
              onClick={() => handleSelectOption(i)}
              className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${focusClass} ${
                revealed && isRight
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold dark:border-emerald-400 dark:bg-emerald-950/70 dark:text-emerald-100'
                  : picked && !isRight
                  ? 'border-rose-400 bg-rose-50 text-rose-950 dark:border-rose-500 dark:bg-rose-950/40 dark:text-rose-100'
                  : 'border-slate-200 text-slate-700 hover:border-emerald-500 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
              {revealed && isRight && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {answer !== null && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/70 bg-emerald-50/90 p-4 text-sm leading-7 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100"
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
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  recordRecall(currentLesson.id, answer === quiz.answer ? 'good' : 'again');
                  setScheduledId(currentLesson.id);
                }}
                className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-emerald-300/80 dark:border-emerald-700 bg-white/80 dark:bg-slate-900/60 px-2.5 py-1 text-xs font-semibold hover:border-emerald-600"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                {scheduledId === currentLesson.id ? '已排入複習！' : '加入間隔複習'}
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
