import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Eye,
  Flame,
  Layers,
  Lightbulb,
  Link2,
  PenLine,
  RefreshCw,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { ALL_LESSONS, LEARNING_TRACKS, getTrack } from '../../data/learning/tracks';
import {
  METALEARNING_MAP,
  SYNTHESIS_CHAINS,
  WORKED_EXAMPLES,
  type WorkedExample,
} from '../../data/learning/ultralearningBlueprint';
import {
  BOX_INTERVAL_DAYS,
  buildInterleavedDeck,
  diagnoseTracks,
  getDueLessonIds,
  type RecallRating,
} from '../../compose/spacedRepetition';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useNavigation } from '../../context/NavigationContext';
import { ProgressBar } from './learnUi';

type WorkshopTab = 'map' | 'examples' | 'recall' | 'synthesis';

export const MasteryWorkshopView: React.FC<{ onBackToCatalogue?: () => void }> = ({ onBackToCatalogue }) => {
  const { go } = useNavigation();
  const { progress, recordRecall, saveFeynmanNote, recordQuiz } = useLearningProgress();
  const [tab, setTab] = useState<WorkshopTab>('map');

  const diagnostics = useMemo(() => diagnoseTracks(LEARNING_TRACKS, progress), [progress]);
  const weakest = diagnostics[0];
  const dueIds = useMemo(
    () => getDueLessonIds(ALL_LESSONS.map((l) => l.id), progress),
    [progress]
  );
  const interleavedDeck = useMemo(() => buildInterleavedDeck(ALL_LESSONS, progress, 8), [progress]);

  const schedule = progress.reviewSchedule ?? {};
  const feynmanNotes = progress.feynmanNotes ?? {};
  const totalMastered = progress.completed.length;
  const totalScheduled = Object.keys(schedule).length;
  const totalFeynman = Object.keys(feynmanNotes).length;

  const tabs: Array<{ id: WorkshopTab; label: string; badge?: string; icon: React.ReactNode }> = [
    { id: 'map', label: '學習地圖與弱點', icon: <Compass className="w-4 h-4" aria-hidden="true" /> },
    { id: 'examples', label: '看範例學拆解', badge: `${WORKED_EXAMPLES.length}`, icon: <Eye className="w-4 h-4" aria-hidden="true" /> },
    {
      id: 'recall',
      label: '混搭間隔回憶',
      badge: dueIds.length > 0 ? `${dueIds.length} 待複習` : `${interleavedDeck.length}`,
      icon: <RefreshCw className="w-4 h-4" aria-hidden="true" />,
    },
    { id: 'synthesis', label: '融會貫通串聯', badge: `${SYNTHESIS_CHAINS.length}`, icon: <Link2 className="w-4 h-4" aria-hidden="true" /> },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <section
        aria-labelledby="mastery-workshop-title"
        className="rounded-3xl border border-emerald-200/90 dark:border-emerald-900/70 bg-gradient-to-br from-emerald-50/85 via-white to-amber-50/40 dark:from-emerald-950/35 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {onBackToCatalogue && (
            <button
              type="button"
              onClick={onBackToCatalogue}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-800 dark:text-emerald-300 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              返回全部學習路徑
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white dark:bg-emerald-400 dark:text-slate-950">
            <Brain className="w-3.5 h-3.5" aria-hidden="true" />
            超速學習 × 刻意練習工作坊
          </span>
        </div>

        <h1
          id="mastery-workshop-title"
          className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
        >
          從看懂到融會貫通：科學健康與飲食掌握系統
        </h1>
        <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          光靠重複閱讀很容易忘記。這裡依認知科學「看範例（See）→ 刻意練習與混搭回憶（Do）→ 直面回饋與費曼串聯（Feedback）」設計，幫你把分散的飲食、運動、睡眠與健檢知識，真正內化成日常直覺。
        </p>

        {/* Learner Mastery Snapshot */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatTile label="已完成小課" value={`${totalMastered} / ${ALL_LESSONS.length}`} />
          <StatTile label="待間隔複習" value={`${dueIds.length} 課`} highlight={dueIds.length > 0} />
          <StatTile label="長期記憶追蹤" value={`${totalScheduled} 課`} />
          <StatTile label="我的費曼筆記" value={`${totalFeynman} 則`} />
        </div>
      </section>

      {/* Mode Tabs */}
      <div
        role="tablist"
        aria-label="超速學習工作坊分頁"
        className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
              {t.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    active
                      ? 'bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950'
                      : 'bg-white text-emerald-800 dark:bg-slate-900 dark:text-emerald-300'
                  }`}
                >
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Metalearning Map & Weakest-Link Drill */}
      {tab === 'map' && (
        <div className="space-y-8">
          {/* Weakest Bottleneck Recommendation (Ultralearning Principle 4: Drill) */}
          {weakest && (
            <section className="rounded-2xl border-2 border-amber-300/80 dark:border-amber-700/70 bg-amber-50/70 dark:bg-amber-950/25 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    <Target className="w-4 h-4" aria-hidden="true" />
                    今日最值得專攻的環節（Drill）
                  </p>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {weakest.title_zh}（掌握度 {weakest.masteryPct}%）
                  </h2>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{weakest.reason_zh}</p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => go(`learn/${weakest.trackId}/${weakest.nextLessonId}`)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950"
                  >
                    <Zap className="w-4 h-4" aria-hidden="true" />
                    直接開始這課
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('recall')}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:border-emerald-500"
                  >
                    先做 3 分鐘混搭回憶
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Metalearning: Concepts / Facts / Procedures */}
          <section aria-labelledby="metalearning-heading" className="space-y-4">
            <div>
              <h2 id="metalearning-heading" className="text-xl font-bold text-slate-900 dark:text-white">
                先畫學習地圖：健康飲食知識分成這三種學法
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                把「要懂的原理」、「要記的門檻」與「要練的日常動作」分開處理，學習速度最快、最不容易焦慮。
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {METALEARNING_MAP.map((pillar) => (
                <article
                  key={pillar.kind}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <span className="inline-block rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      {pillar.en}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pillar.title_zh}</h3>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{pillar.principle_zh}</p>
                    <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">{pillar.howToMaster_zh}</p>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-1">
                      {pillar.examples_zh.map((ex) => (
                        <li key={ex} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {pillar.links.map((lk) => (
                      <a
                        key={lk.hash}
                        href={`#${lk.hash}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:underline"
                      >
                        {lk.label_zh}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 8-Track Mastery Diagnostic Grid */}
          <section aria-labelledby="diagnostic-heading" className="space-y-4">
            <h2 id="diagnostic-heading" className="text-xl font-bold text-slate-900 dark:text-white">
              八大路徑掌握度診斷（依弱點優先排序）
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {diagnostics.map((d) => (
                <div
                  key={d.trackId}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={`#learn/${d.trackId}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      {d.title_zh}
                    </a>
                    <span className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      {d.masteryPct}%
                    </span>
                  </div>
                  <ProgressBar value={d.masteryPct} tone="emerald" label={`${d.title_zh}掌握度`} />
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>
                      完成 {d.completedLessons}/{d.totalLessons} 課
                      {d.quizAttempted > 0 && ` · 測驗 ${d.quizCorrect}/${d.quizAttempted}`}
                    </span>
                    <a
                      href={`#learn/${d.trackId}/${d.nextLessonId}`}
                      className="inline-flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-300 hover:underline"
                    >
                      前往下一課
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: Worked Examples (See) */}
      {tab === 'examples' && <WorkedExamplesSection />}

      {/* Tab 3: Interleaved Spaced Recall (Do + Retain + Feedback) */}
      {tab === 'recall' && (
        <InterleavedRecallSection
          deck={interleavedDeck}
          dueCount={dueIds.length}
          reviewSchedule={schedule}
          onRate={(lessonId, rating) => recordRecall(lessonId, rating)}
          onRecordQuiz={(lessonId, correct) => recordQuiz(lessonId, correct)}
        />
      )}

      {/* Tab 4: Cross-Domain Synthesis & Feynman Notes (Intuition) */}
      {tab === 'synthesis' && (
        <SynthesisSection
          feynmanNotes={feynmanNotes}
          onSaveNote={saveFeynmanNote}
        />
      )}
    </div>
  );
};

const StatTile: React.FC<{ label: string; value: string; highlight?: boolean }> = ({ label, value, highlight }) => (
  <div
    className={`rounded-2xl border px-4 py-3 ${
      highlight
        ? 'border-amber-300 bg-amber-50/90 dark:border-amber-700 dark:bg-amber-950/40'
        : 'border-slate-200/90 bg-white/90 dark:border-slate-800 dark:bg-slate-900/80'
    }`}
  >
    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</p>
    <p className="mt-0.5 font-mono text-lg font-bold text-slate-900 dark:text-white">{value}</p>
  </div>
);

const WorkedExamplesSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(WORKED_EXAMPLES[0].id);
  const [revealedSteps, setRevealedSteps] = useState<number>(1);
  const current: WorkedExample = WORKED_EXAMPLES.find((w) => w.id === selectedId) ?? WORKED_EXAMPLES[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setRevealedSteps(1);
  };

  return (
    <section aria-labelledby="worked-examples-heading" className="space-y-6">
      <div>
        <h2 id="worked-examples-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          看範例學拆解：把專家腦中的判斷步驟攤開來看
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          研究顯示，新手先看「完整拆解範例」再自己練習，比直接盲目摸索更快建立正確心智模型，也更不會被專有名詞淹沒。
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {WORKED_EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => handleSelect(ex.id)}
            className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
              ex.id === current.id
                ? 'border-emerald-700 bg-emerald-50 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-950/60 dark:text-emerald-200'
                : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {ex.categoryLabel_zh}
          </button>
        ))}
      </div>

      <article className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-950 px-3 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {current.categoryLabel_zh}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{current.title_zh}</h3>
          <p className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 p-4 text-sm leading-7 text-slate-800 dark:text-slate-200">
            <strong>真實情境：</strong>{current.situation_zh}
          </p>
          <p className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/25 p-4 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <strong>常見盲點（隱性陷阱）：</strong>{current.tacitTrap_zh}
          </p>
        </div>

        {/* Progressive Steps */}
        <div className="space-y-3">
          {current.steps.slice(0, revealedSteps).map((st, idx) => (
            <div
              key={st.label_zh}
              className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 space-y-1.5"
            >
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                步驟 {idx + 1}：{st.label_zh.replace(/^\d+\.\s*/, '')}
              </p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">思考邏輯：</strong>{st.expertThought_zh}
              </p>
              <p className="text-sm leading-6 text-emerald-950 dark:text-emerald-100">
                <strong>具體做法：</strong>{st.action_zh}
              </p>
            </div>
          ))}

          {revealedSteps < current.steps.length ? (
            <button
              type="button"
              onClick={() => setRevealedSteps((n) => n + 1)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950"
            >
              <span>看下一步拆解（{revealedSteps} / {current.steps.length}）</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-3">
              <p className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" aria-hidden="true" />
                一句話帶走：{current.takeaway_zh}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>今天換你試試：</strong>{current.tryNext_zh}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                {current.links.map((lk) => (
                  <a
                    key={lk.hash}
                    href={`#${lk.hash}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline"
                  >
                    {lk.label_zh}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

const InterleavedRecallSection: React.FC<{
  deck: typeof ALL_LESSONS;
  dueCount: number;
  reviewSchedule: Record<string, { box: number; reviews: number; lapses: number }>;
  onRate: (lessonId: string, rating: RecallRating) => void;
  onRecordQuiz: (lessonId: string, correct: boolean) => void;
}> = ({ deck, dueCount, reviewSchedule, onRate, onRecordQuiz }) => {
  const [idx, setIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [ratedCount, setRatedCount] = useState(0);

  const lesson = deck[idx];
  if (!lesson || !lesson.quiz) return null;
  const quiz = lesson.quiz;
  const track = getTrack(lesson.track_id);
  const card = reviewSchedule[lesson.id];

  const handleChoose = (optIdx: number) => {
    setSelectedOpt(optIdx);
    onRecordQuiz(lesson.id, optIdx === quiz.answer);
  };

  const handleRate = (rating: RecallRating) => {
    onRate(lesson.id, rating);
    setRatedCount((c) => c + 1);
    setSelectedOpt(null);
    setIdx((i) => (i + 1) % deck.length);
  };

  return (
    <section aria-labelledby="recall-heading" className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="recall-heading" className="text-xl font-bold text-slate-900 dark:text-white">
            跨主題混搭回憶（以考代學 × 間隔複習）
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            刻意把飲食、運動、睡眠、健檢題目交錯出題（Variability），先靠自己回想再看解析，並依熟悉度排定下次複習（1 → 3 → 7 → 21 → 60 天）。
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-slate-700 dark:text-slate-300">
            本輪第 {idx + 1} / {deck.length} 題
          </span>
          {dueCount > 0 && (
            <span className="rounded-full bg-amber-100 dark:bg-amber-950 px-3 py-1 font-bold text-amber-800 dark:text-amber-300">
              {dueCount} 課待複習
            </span>
          )}
          {ratedCount > 0 && (
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-3 py-1 font-bold text-emerald-800 dark:text-emerald-300">
              本次已複習 {ratedCount} 題
            </span>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {track && (
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 font-bold text-emerald-800 dark:text-emerald-300">
                {track.title_zh}
              </span>
            )}
            <span className="text-slate-500 dark:text-slate-400">{lesson.title_zh}</span>
          </div>
          {card && (
            <span className="font-mono text-slate-500 dark:text-slate-400">
              記憶箱 Lv.{card.box + 1}/5 · 已複習 {card.reviews} 次
            </span>
          )}
        </div>

        <p className="text-lg font-bold leading-8 text-slate-900 dark:text-white">
          {quiz.question_zh}
        </p>

        <div className="grid gap-2.5" role="group" aria-label={quiz.question_zh}>
          {quiz.options_zh.map((opt, i) => {
            const picked = selectedOpt === i;
            const isCorrect = i === quiz.answer;
            const revealed = selectedOpt !== null;
            return (
              <button
                key={opt}
                type="button"
                disabled={revealed}
                onClick={() => handleChoose(i)}
                className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  revealed && isCorrect
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-400 dark:bg-emerald-950/60 dark:text-emerald-100 font-semibold'
                    : revealed && picked && !isCorrect
                    ? 'border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-500 dark:bg-rose-950/40 dark:text-rose-100'
                    : 'border-slate-200 text-slate-800 hover:border-emerald-500 dark:border-slate-700 dark:text-slate-200'
                }`}
              >
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {selectedOpt !== null && (
          <div className="space-y-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-5" role="status">
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedOpt === quiz.answer ? '答對了！確認一下背後的關鍵原理：' : '這題剛好抓到盲點！看看正確觀念：'}
              </p>
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                {quiz.explain_zh}
              </p>
              <p className="text-xs leading-6 text-slate-600 dark:text-slate-400 pt-1">
                <strong>本課核心：</strong>{lesson.big_idea_zh}
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                排定下次間隔複習（系統會自動在到期時提醒）：
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleRate('again')}
                  className="min-h-11 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200"
                >
                  還不熟・{BOX_INTERVAL_DAYS[0]} 天後再考
                </button>
                <button
                  type="button"
                  onClick={() => handleRate('good')}
                  className="min-h-11 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950"
                >
                  記住了・拉長間隔
                </button>
                <button
                  type="button"
                  onClick={() => handleRate('easy')}
                  className="min-h-11 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-900 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200"
                >
                  完全內化・跳級複習
                </button>
                <a
                  href={`#learn/${lesson.track_id}/${lesson.id}`}
                  className="ml-auto inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:underline"
                >
                  回讀完整小課
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const SynthesisSection: React.FC<{
  feynmanNotes: Record<string, string>;
  onSaveNote: (id: string, note: string) => void;
}> = ({ feynmanNotes, onSaveNote }) => {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savedId, setSavedId] = useState<string | null>(null);

  return (
    <section aria-labelledby="synthesis-heading" className="space-y-6">
      <div>
        <h2 id="synthesis-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          融會貫通：把飲食、運動、睡眠與健檢連成一條線
        </h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          真正的精通不是背一百條零散規則，而是看懂它們在人體內如何互相連動。用自己的白話寫下費曼筆記（只存在你的瀏覽器），最能檢驗是否真的懂了。
        </p>
      </div>

      <div className="space-y-5">
        {SYNTHESIS_CHAINS.map((chain) => {
          const val = drafts[chain.id] ?? feynmanNotes[chain.id] ?? '';
          return (
            <article
              key={chain.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 space-y-5"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                  {chain.title_zh}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{chain.subtitle_zh}</p>
              </div>

              {/* Causal Chain Nodes */}
              <ol className="grid gap-3 md:grid-cols-4">
                {chain.nodes.map((node, i) => (
                  <li
                    key={node.domain_zh}
                    className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 space-y-1"
                  >
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                      {i + 1}. {node.domain_zh}
                    </span>
                    <p className="text-xs leading-6 text-slate-800 dark:text-slate-200">{node.text_zh}</p>
                  </li>
                ))}
              </ol>

              <p className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 text-sm leading-7 text-slate-800 dark:text-slate-200">
                <strong className="text-emerald-800 dark:text-emerald-300">貫通核心：</strong>
                {chain.coreInsight_zh}
              </p>

              {/* Feynman Self-Test Input */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-2.5">
                <label
                  htmlFor={`feynman-${chain.id}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  <PenLine className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                  費曼白話自測：{chain.feynmanPrompt_zh}
                </label>
                <textarea
                  id={`feynman-${chain.id}`}
                  rows={2}
                  value={val}
                  onChange={(e) => setDrafts((d) => ({ ...d, [chain.id]: e.target.value }))}
                  placeholder="試著用 1–2 句白話寫下來，卡住的地方就是可以再回讀的地方…"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:outline-none"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-3">
                    {chain.links.map((lk) => (
                      <a
                        key={lk.hash}
                        href={`#${lk.hash}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:underline"
                      >
                        {lk.label_zh}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSaveNote(chain.id, val);
                      setSavedId(chain.id);
                      setTimeout(() => setSavedId((cur) => (cur === chain.id ? null : cur)), 2000);
                    }}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950"
                  >
                    <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                    {savedId === chain.id ? '已儲存在本機！' : '儲存我的白話筆記'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
