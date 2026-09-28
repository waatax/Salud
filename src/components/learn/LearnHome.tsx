import React, { useEffect } from 'react';
import {
  Search,
  ArrowRight,
  PlayCircle,
  ClipboardList,
  AlertOctagon,
  Gauge,
  BookA,
  Wine,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Rocket,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_STARTER_TASKS } from '../../data/learning/starterPlan';
import { hashSegment } from '../../config/routes';
import { ActionPlanPanel } from './ActionPlanPanel';
import { QuickTips } from './QuickTips';
import { LEARNING_TRACKS, LEARNING_GOALS, ALL_LESSONS, findLesson, getTrack } from '../../data/learning/tracks';
import { EVIDENCE_UPDATES, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { LAB_METRICS } from '../../data/learning/checkup';
import { GLOSSARY } from '../../data/learning/glossary';
import { PILLAR_NAV } from '../../config/navigation';
import { TONE, TrackIcon, ProgressBar, SectionTitle, LEARNING_ICONS, formatYM } from './learnUi';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export const LearnHome: React.FC = () => {
  const { go } = useNavigation();
  const { openModal } = useModal();
  const { progress } = useLearningProgress();
  const { plan, starterDone } = useActionPlan();
  const starterCount = ALL_STARTER_TASKS.filter((t) => starterDone(t.id)).length;

  // `#home/plan` (from any 「立即上手」 card) scrolls straight to the action plan.
  useEffect(() => {
    const scroll = () => {
      if (hashSegment('home') === 'plan') {
        window.setTimeout(() => document.getElementById('my-plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      }
    };
    scroll();
    window.addEventListener('hashchange', scroll);
    return () => window.removeEventListener('hashchange', scroll);
  }, []);

  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = progress.last ? getTrack(progress.last.trackId) : undefined;
  const doneCount = progress.completed.filter((id) => ALL_LESSONS.some((l) => l.id === id)).length;
  const latest = [...EVIDENCE_UPDATES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  const topicPillars = PILLAR_NAV.filter((p) => p.group === 'foundation' || p.group === 'daily' || p.group === 'goals');

  return (
    <div className="space-y-12 pb-8 animate-fade-in">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-200/70 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:from-emerald-950/40 dark:via-salud-dark-card dark:to-sky-950/20 px-5 py-8 sm:px-10 sm:py-12">
        <div className="relative z-10 max-w-3xl space-y-5">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-white/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            給每個人的健康學習平台 · 內容更新至 2026 年
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-tight text-balance">
            看懂身體、吃對食物、
            <br className="hidden sm:block" />
            讀懂你的健檢報告
          </h1>
          <p className="text-base sm:text-lg leading-8 text-slate-600 dark:text-slate-300">
            {LEARNING_TRACKS.length} 條學習路徑、{ALL_LESSONS.length} 堂白話小課，每堂 5–8 分鐘。每一句都標示證據等級，並依據
            2024–2026 年最新醫學指引。
          </p>

          <button
            onClick={() => openModal('search')}
            className="group w-full sm:max-w-xl flex items-center gap-3 rounded-2xl border border-slate-300/80 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5 text-left shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
          >
            <Search className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" aria-hidden="true" />
            <span className="flex-1 text-[15px] text-slate-500 dark:text-slate-400">搜尋：LDL、失眠、膝蓋痛、糖化血色素…</span>
            <kbd className="hidden sm:inline text-[11px] font-mono text-slate-500 border border-slate-300 dark:border-slate-700 rounded-md px-1.5 py-0.5">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => go('start')}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 font-semibold px-5 py-3 transition-colors"
            >
              <Rocket className="w-5 h-5" aria-hidden="true" />
              {starterCount > 0 ? `繼續 4 週啟動計畫（${starterCount}/${ALL_STARTER_TASKS.length}）` : '開始 4 週健康啟動計畫'}
            </button>
            <button
              onClick={() => go('learn')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-semibold px-5 py-3 hover:border-emerald-500 transition-colors"
            >
              瀏覽 {ALL_LESSONS.length} 堂課
            </button>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { n: ALL_LESSONS.length, l: '堂白話小課' },
              { n: EVIDENCE_UPDATES.length, l: '則最新實證' },
              { n: LAB_METRICS.length, l: '項檢驗解讀' },
              { n: GLOSSARY.length, l: '個名詞白話' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 px-3 py-2">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-2xl font-display font-bold text-slate-900 dark:text-white tabular-nums">{s.n}</dd>
                <dd className="text-xs text-slate-600 dark:text-slate-400">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Continue ─────────────────────────────────────────── */}
      {lastLesson && lastTrack && (
        <section aria-label="繼續學習">
          <button
            onClick={() => go(`learn/${lastTrack.id}/${lastLesson.id}`)}
            className={`w-full flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 ${TONE[lastTrack.tone].soft} ${TONE[lastTrack.tone].ring} px-4 py-4 text-left transition-colors`}
          >
            <TrackIcon icon={lastTrack.icon} tone={lastTrack.tone} />
            <span className="flex-1 min-w-0">
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                繼續上次的課程 · {lastTrack.title_zh} · 已完成 {doneCount}/{ALL_LESSONS.length} 課
              </span>
              <span className="block font-semibold text-slate-900 dark:text-white truncate">{lastLesson.title_zh}</span>
            </span>
            <PlayCircle className={`w-6 h-6 shrink-0 ${TONE[lastTrack.tone].text}`} aria-hidden="true" />
          </button>
        </section>
      )}

      {/* ── Action plan, or the starter tips for a first visit ── */}
      {plan.items.length > 0 ? <ActionPlanPanel /> : <QuickTips sectionKey="home" />}

      {/* ── Goals ────────────────────────────────────────────── */}
      <section aria-labelledby="goals-h">
        <SectionTitle id="goals-h" title="你想從哪裡開始？" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEARNING_GOALS.map((g) => {
            const Icon = LEARNING_ICONS[g.icon];
            const track = getTrack(g.track_id);
            return (
              <button
                key={g.id}
                onClick={() => go(`learn/${g.track_id}${g.lesson_id ? `/${g.lesson_id}` : ''}`)}
                className="group flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-sm transition-all"
              >
                <span className={`mt-0.5 w-9 h-9 rounded-xl inline-flex items-center justify-center ${track ? TONE[track.tone].chip : ''} border`}>
                  <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-slate-900 dark:text-white">{g.label_zh}</span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400">{g.hint_zh}</span>
                </span>
                <ArrowRight className="w-4 h-4 mt-1 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Tracks ───────────────────────────────────────────── */}
      <section aria-labelledby="tracks-h">
        <SectionTitle
          id="tracks-h"
          title="學習路徑"
          action={
            <button onClick={() => go('learn')} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              課程總表
            </button>
          }
        />
        <p className="text-sm text-slate-600 dark:text-slate-400 -mt-1 mb-4">建議依序學習；每條路徑也可以單獨閱讀。</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LEARNING_TRACKS.map((t, i) => {
            const done = t.lessons.filter((l) => progress.completed.includes(l.id)).length;
            const pct = (done / t.lessons.length) * 100;
            const minutes = t.lessons.reduce((s, l) => s + l.minutes, 0);
            return (
              <li key={t.id}>
                <button
                  onClick={() => go(`learn/${t.id}`)}
                  className={`w-full h-full flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left ${TONE[t.tone].ring} hover:shadow-sm transition-all`}
                >
                  <span className="flex items-start gap-3">
                    <TrackIcon icon={t.icon} tone={t.tone} />
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs text-slate-500 dark:text-slate-400">路徑 {i + 1}</span>
                      <span className="block text-base font-bold text-slate-900 dark:text-white">{t.title_zh}</span>
                      <span className="block text-sm text-slate-600 dark:text-slate-400 leading-6">{t.subtitle_zh}</span>
                    </span>
                    {done === t.lessons.length && <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-label="已完成" />}
                  </span>
                  <span className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>{t.lessons.length} 課</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />約 {minutes} 分鐘
                    </span>
                    <span className="ml-auto tabular-nums">
                      {done}/{t.lessons.length}
                    </span>
                  </span>
                  <ProgressBar value={pct} tone={t.tone} label={`${t.title_zh} 完成度`} />
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── What changed ─────────────────────────────────────── */}
      <section aria-labelledby="updates-h">
        <SectionTitle
          id="updates-h"
          title="最新實證：2025–2026 改變了什麼"
          action={
            <button onClick={() => go('updates')} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
              全部 {EVIDENCE_UPDATES.length} 則
            </button>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {latest.map((u) => (
            <button
              key={u.id}
              onClick={() => go(`updates/${u.id}`)}
              className="flex flex-col gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{UPDATE_CATEGORY_META[u.category].label_zh}</span>
                <span aria-hidden="true">·</span>
                <span>{formatYM(u.date)}</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white leading-6">{u.title_zh}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400 leading-6 line-clamp-2">{u.what_it_means_zh}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Tools ────────────────────────────────────────────── */}
      <section aria-labelledby="tools-h">
        <SectionTitle id="tools-h" title="實用工具" />
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { icon: ClipboardList, label: '看懂健檢報告', hint: '24 項數值白話解讀', onClick: () => go('checkup'), tone: 'text-rose-700 dark:text-rose-300' },
            { icon: AlertOctagon, label: '危險警訊', hint: '何時要立刻就醫', onClick: () => openModal('emergency'), tone: 'text-red-700 dark:text-red-300' },
            { icon: Gauge, label: '722 居家血壓', hint: '連續 7 天自我評估', onClick: () => go('cardiometabolic/BP_722'), tone: 'text-sky-700 dark:text-sky-300' },
            { icon: BookA, label: '健康小辭典', hint: '看不懂的名詞', onClick: () => go('glossary'), tone: 'text-violet-700 dark:text-violet-300' },
            { icon: Wine, label: '飲酒風險自評', hint: 'AUDIT-C 三題', onClick: () => openModal('auditC'), tone: 'text-amber-700 dark:text-amber-300' },
          ].map((tool) => (
            <button
              key={tool.label}
              onClick={tool.onClick}
              className="flex flex-col items-start gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 text-left hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors"
            >
              <tool.icon className={`w-6 h-6 ${tool.tone}`} aria-hidden="true" />
              <span className="font-semibold text-slate-900 dark:text-white">{tool.label}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{tool.hint}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Deep topics ──────────────────────────────────────── */}
      <section aria-labelledby="topics-h">
        <SectionTitle id="topics-h" title="深入主題" />
        <p className="text-sm text-slate-600 dark:text-slate-400 -mt-1 mb-4">
          想看完整機制、圖解與互動模擬器？每個主題都是一座專科資料庫。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {topicPillars.map((p) => (
            <button
              key={p.id}
              onClick={() => go(p.hash)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-3 text-left hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors"
            >
              <p.icon className="w-5 h-5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900 dark:text-white truncate">{p.label_zh}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{p.blurb_zh}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Trust ────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/40 p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
        <ShieldCheck className="w-8 h-8 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
        <div className="flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white">內容怎麼來的：</strong>
          依據國際醫學會指引、世界衛生組織、衛福部國健署與大型臨床試驗撰寫，每則知識標示 A–E 證據等級。Salud
          是健康教育，不能取代醫師的診斷與處方。
        </div>
        <button onClick={() => go('evidence')} className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0">
          證據分級說明
        </button>
      </section>
    </div>
  );
};
