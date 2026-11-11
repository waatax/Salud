import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Heart,
  Layers,
  Zap,
  Compass,
  Lightbulb,
  Stethoscope,
  GraduationCap,
  Check,
  Flame,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLearningProgress, lessonPointId } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_LESSONS, LEARNING_TRACKS, findLesson, getTrack } from '../../data/learning/tracks';
import {
  LEARNER_RANKS,
  MEDICAL_DISCIPLINES,
  PRACTICE_SCENARIOS,
  MYTH_BLITZ_DECK,
  calculateLearnerGrowth,
  type PracticeScenario,
} from '../../data/learning/masteryAcademy';
import { TONE, TrackIcon, ProgressBar } from './learnUi';

export type PracticeLabMode = 'scenarios' | 'flashcards' | 'academy';

export const PracticeLabView: React.FC<{
  initialMode?: PracticeLabMode;
  onBackToCatalogue?: () => void;
}> = ({ initialMode = 'scenarios', onBackToCatalogue }) => {
  const { go } = useNavigation();
  const {
    progress,
    markComplete,
    markLessonPoints,
    completeScenario,
    completeMyth,
    toggleLikeDiscipline,
  } = useLearningProgress();
  const { plan } = useActionPlan();
  const [mode, setMode] = useState<PracticeLabMode>(initialMode);

  const growth = useMemo(
    () => calculateLearnerGrowth(progress, plan.items.length),
    [progress, plan.items.length]
  );

  // Sync mode if initialMode prop changes via URL hash (#learn/practice vs #learn/academy)
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleModeSwitch = (nextMode: PracticeLabMode) => {
    setMode(nextMode);
    if (nextMode === 'academy') {
      window.history.replaceState(null, '', '#learn/academy');
    } else {
      window.history.replaceState(null, '', '#learn/practice');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Learner Growth Passport Hero Banner */}
      <section
        aria-labelledby="growth-passport-title"
        className="rounded-3xl border border-emerald-200/90 dark:border-emerald-900/70 bg-gradient-to-br from-emerald-50/80 via-white to-sky-50/50 dark:from-emerald-950/35 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white dark:bg-emerald-400 dark:text-slate-950">
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                從小白到醫學知識者・快樂成長學院
              </span>
              <span className="rounded-full border border-emerald-300/80 bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-800 dark:bg-slate-900/90 dark:text-emerald-300">
                {growth.currentRank.badge_emoji} Lv.{growth.currentRank.level} {growth.currentRank.title_zh}（{growth.xp} XP）
              </span>
            </div>

            <h2
              id="growth-passport-title"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              用好奇心探索身體，在生活實作裡愛上醫學知識
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {growth.currentRank.tagline_zh}
            </p>

            {/* XP Progress Bar to Next Rank */}
            <div className="pt-1 max-w-lg space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>
                  目前等級：<strong className="text-slate-900 dark:text-white">Lv.{growth.currentRank.level} {growth.currentRank.title_zh}</strong>
                </span>
                {growth.nextRank ? (
                  <span>
                    距離 <strong className="text-emerald-800 dark:text-emerald-300">{growth.nextRank.badge_emoji} Lv.{growth.nextRank.level} {growth.nextRank.title_zh}</strong> 還差 {growth.xpToNext} XP
                  </span>
                ) : (
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold">🎉 已達最高榮譽「實證醫學知識者」！</span>
                )}
              </div>
              <ProgressBar
                value={growth.progressToNextPct}
                tone={growth.currentRank.tone}
                label="成長等級進度"
              />
            </div>
          </div>

          {/* 4 Mastery Counters */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 shrink-0 lg:w-72">
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-3.5">
              <div className="text-xs text-slate-500 dark:text-slate-400">已掌握知識點</div>
              <div className="mt-1 text-lg sm:text-xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                {growth.pointsMasteredCount} <span className="text-xs font-normal text-slate-400">/ {growth.totalPointsCount}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-3.5">
              <div className="text-xs text-slate-500 dark:text-slate-400">生活情境實戰</div>
              <div className="mt-1 text-lg sm:text-xl font-extrabold text-sky-700 dark:text-sky-400 tabular-nums">
                {growth.scenariosDoneCount} <span className="text-xs font-normal text-slate-400">/ {growth.totalScenariosCount}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-3.5">
              <div className="text-xs text-slate-500 dark:text-slate-400">已完成小課</div>
              <div className="mt-1 text-lg sm:text-xl font-extrabold text-violet-700 dark:text-violet-400 tabular-nums">
                {growth.lessonsDoneCount} <span className="text-xs font-normal text-slate-400">/ {growth.totalLessonsCount}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-3.5">
              <div className="text-xs text-slate-500 dark:text-slate-400">迷思快打闖關</div>
              <div className="mt-1 text-lg sm:text-xl font-extrabold text-amber-700 dark:text-amber-400 tabular-nums">
                {growth.mythsDoneCount} <span className="text-xs font-normal text-slate-400">/ {growth.totalMythsCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Mode Switcher */}
        <div
          className="mt-6 pt-5 border-t border-emerald-200/60 dark:border-emerald-900/50 flex flex-wrap items-center justify-between gap-3"
          role="tablist"
          aria-label="快樂學習與實作模式選擇"
        >
          <div className="flex flex-wrap gap-2">
            {(
              [
                {
                  id: 'scenarios',
                  label: '🩺 生活情境實戰演練 (12 關)',
                  icon: Stethoscope,
                },
                {
                  id: 'flashcards',
                  label: '🃏 知識閃卡 & 真假迷思快打',
                  icon: Zap,
                },
                {
                  id: 'academy',
                  label: '🔭 愛上 8 大醫學學科 & 成長階梯',
                  icon: Compass,
                },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleModeSwitch(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-emerald-800 text-white shadow-xs dark:bg-emerald-400 dark:text-slate-950'
                      : 'border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {onBackToCatalogue && (
            <button
              type="button"
              onClick={onBackToCatalogue}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 hover:underline"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>返回 8 條路徑課程總表</span>
            </button>
          )}
        </div>
      </section>

      {/* Active Mode Content */}
      {mode === 'scenarios' && (
        <ScenarioPracticeSection
          completedScenarios={progress.completedScenarios}
          onCompleteScenario={completeScenario}
          onGo={go}
        />
      )}

      {mode === 'flashcards' && (
        <FlashcardAndMythBlitzSection
          masteredPoints={progress.masteredPoints}
          completedMyths={progress.completedMyths}
          onMarkLessonPoints={(lessonId, kpCount, mastered) => {
            const ids = Array.from({ length: kpCount }, (_, idx) => lessonPointId(lessonId, idx));
            markLessonPoints(ids, mastered);
            if (mastered) markComplete(lessonId, true);
          }}
          onCompleteMyth={completeMyth}
          onGo={go}
        />
      )}

      {mode === 'academy' && (
        <MedicalDisciplinesAcademySection
          growth={growth}
          likedDisciplines={progress.likedDisciplines}
          onToggleLike={toggleLikeDiscipline}
          onGo={go}
        />
      )}
    </div>
  );
};

// ── Mode 1: 12 道真實生活情境實戰演練 ──────────────────────────────────────

const ScenarioPracticeSection: React.FC<{
  completedScenarios: string[];
  onCompleteScenario: (id: string) => void;
  onGo: (hash: string) => void;
}> = ({ completedScenarios, onCompleteScenario, onGo }) => {
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | PracticeScenario['difficulty']>('all');
  const [activeId, setActiveId] = useState<string>(PRACTICE_SCENARIOS[0].id);
  const [pickedChoice, setPickedChoice] = useState<number | null>(null);

  const filteredScenarios = useMemo(
    () =>
      PRACTICE_SCENARIOS.filter(
        (s) => difficultyFilter === 'all' || s.difficulty === difficultyFilter
      ),
    [difficultyFilter]
  );

  const activeScenario =
    filteredScenarios.find((s) => s.id === activeId) ?? filteredScenarios[0] ?? PRACTICE_SCENARIOS[0];
  const activeIdx = filteredScenarios.findIndex((s) => s.id === activeScenario.id);
  const lesson = findLesson(activeScenario.lesson_id);

  const handleSelectScenario = (id: string) => {
    setActiveId(id);
    setPickedChoice(null);
  };

  const handlePickOption = (idx: number, e: React.MouseEvent) => {
    setPickedChoice(idx);
    const choice = activeScenario.choices[idx];
    if (choice.is_best) {
      onCompleteScenario(activeScenario.id);
      try {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        confetti({
          particleCount: 45,
          spread: 65,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
        });
      } catch {
        /* ignore confetti errors in headless/test environments */
      }
    }
  };

  const handleNextScenario = () => {
    const next = filteredScenarios[(activeIdx + 1) % filteredScenarios.length];
    if (next) handleSelectScenario(next.id);
  };

  const selectedChoiceObj = pickedChoice !== null ? activeScenario.choices[pickedChoice] : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>真實生活情境實戰演練：把醫學觀念用出來</span>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            不死背術語！透過 12 個自己與家人最常遇到的真實情境，練習做出聰明、安全的健康判斷（每通過 1 關 +20 XP）。
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="情境難度篩選">
          {(['all', '入門初探', '生活實戰', '進階內行'] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              aria-pressed={difficultyFilter === diff}
              onClick={() => {
                setDifficultyFilter(diff);
                setPickedChoice(null);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                difficultyFilter === diff
                  ? 'bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950'
                  : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
              }`}
            >
              {diff === 'all' ? `全部 (${PRACTICE_SCENARIOS.length})` : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Pills Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {filteredScenarios.map((scen, idx) => {
          const isSolved = completedScenarios.includes(scen.id);
          const isCurrent = scen.id === activeScenario.id;
          return (
            <button
              key={scen.id}
              type="button"
              onClick={() => handleSelectScenario(scen.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isCurrent
                  ? 'border-emerald-600 bg-emerald-50/70 dark:border-emerald-400 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                  : isSolved
                  ? 'border-emerald-300/80 bg-white dark:border-emerald-800/70 dark:bg-slate-900/70 hover:border-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  情境 {String(idx + 1).padStart(2, '0')} · {scen.difficulty}
                </span>
                {isSolved ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                    <Check className="w-3 h-3" aria-hidden="true" /> 已過關
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">待挑戰</span>
                )}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                {scen.title_zh}
              </div>
              <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                {scen.category_zh}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Interactive Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/70 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {activeScenario.category_zh}
            </span>
            <span className="rounded-full border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              難度：{activeScenario.difficulty}
            </span>
          </div>
          {completedScenarios.includes(activeScenario.id) && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              你已成功掌握此實戰情境（+20 XP）
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {activeScenario.title_zh}
          </h4>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              📖 真實生活故事
            </p>
            <p className="text-[15px] sm:text-base leading-8 text-slate-800 dark:text-slate-200">
              {activeScenario.situation_zh}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <span>{activeScenario.question_zh}</span>
          </p>

          <div className="grid gap-3" role="radiogroup" aria-label={activeScenario.question_zh}>
            {activeScenario.choices.map((choice, idx) => {
              const isPicked = pickedChoice === idx;
              let cardClass =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500 text-slate-800 dark:text-slate-200';
              if (isPicked) {
                cardClass = choice.is_best
                  ? 'border-emerald-600 bg-emerald-50/90 dark:border-emerald-500 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30'
                  : 'border-amber-500 bg-amber-50/90 dark:border-amber-500 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  role="radio"
                  aria-checked={isPicked}
                  onClick={(e) => handlePickOption(idx, e)}
                  className={`w-full rounded-2xl border p-4 text-left text-sm sm:text-[15px] leading-7 transition-all flex items-start gap-3 ${cardClass}`}
                >
                  <span className="w-6 h-6 rounded-full border border-current inline-flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 font-medium">{choice.label_zh}</span>
                  {isPicked &&
                    (choice.is_best ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    ))}
                </button>
              );
            })}
          </div>
        </div>

        {/* Immediate Feedback & Mechanism Pearl */}
        {selectedChoiceObj && (
          <div
            role="status"
            className={`rounded-2xl p-5 space-y-4 border animate-fade-in ${
              selectedChoiceObj.is_best
                ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/35'
                : 'border-amber-300 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/30'
            }`}
          >
            <div className="space-y-1.5">
              <p className="font-bold text-base text-slate-900 dark:text-white">
                {selectedChoiceObj.is_best
                  ? '🎉 判斷太精準了！你已經具備實證醫學知識者的思考力！'
                  : '💡 這個做法藏著常見盲點，我們一起看看原因，再試其他選項：'}
              </p>
              <p className="text-sm sm:text-[15px] leading-7 text-slate-800 dark:text-slate-200">
                {selectedChoiceObj.feedback_zh}
              </p>
            </div>

            {selectedChoiceObj.is_best && (
              <>
                <div className="rounded-xl bg-white/90 dark:bg-slate-900/90 border border-emerald-200/80 dark:border-emerald-900/60 p-4 space-y-2">
                  <p className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                    {activeScenario.mechanism_pearl_zh}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-start gap-2 pt-1">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-1" aria-hidden="true" />
                    <span>今日微練習：{activeScenario.practice_action_zh}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {lesson && (
                      <button
                        type="button"
                        onClick={() => onGo(`learn/${activeScenario.track_id}/${activeScenario.lesson_id}`)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50"
                      >
                        <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>溫習小課：{lesson.title_zh}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onGo(activeScenario.deep_hash)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                    >
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>探索對應專區與互動模擬器</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextScenario}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950 px-4 py-2 text-xs sm:text-sm font-bold text-white"
                  >
                    <span>挑戰下一關情境</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Mode 2: 全站 65 課知識閃卡翻翻樂 & 16 道真假迷思快打 ──────────────────────

const FlashcardAndMythBlitzSection: React.FC<{
  masteredPoints: string[];
  completedMyths: string[];
  onMarkLessonPoints: (lessonId: string, kpCount: number, mastered: boolean) => void;
  onCompleteMyth: (mythId: string) => void;
  onGo: (hash: string) => void;
}> = ({ masteredPoints, completedMyths, onMarkLessonPoints, onCompleteMyth, onGo }) => {
  const [subTab, setSubTab] = useState<'cards' | 'blitz'>('cards');
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Myth blitz states
  const [blitzIdx, setBlitzIdx] = useState<number>(0);
  const [blitzGuess, setBlitzGuess] = useState<boolean | null>(null);
  const [combo, setCombo] = useState<number>(0);

  const deckLessons = useMemo(
    () =>
      selectedTrackId === 'all'
        ? ALL_LESSONS
        : ALL_LESSONS.filter((l) => l.track_id === selectedTrackId),
    [selectedTrackId]
  );

  const currentLesson = deckLessons[cardIndex % deckLessons.length] ?? ALL_LESSONS[0];
  const currentTrack = getTrack(currentLesson.track_id)!;
  const lessonAllMastered = currentLesson.key_points_zh.every((_, idx) =>
    masteredPoints.includes(lessonPointId(currentLesson.id, idx))
  );

  const currentBlitz = MYTH_BLITZ_DECK[blitzIdx % MYTH_BLITZ_DECK.length];
  const blitzCorrect = blitzGuess !== null && blitzGuess === currentBlitz.is_true;

  const handleAnswerBlitz = (guessTrue: boolean) => {
    setBlitzGuess(guessTrue);
    if (guessTrue === currentBlitz.is_true) {
      onCompleteMyth(currentBlitz.id);
      setCombo((c) => c + 1);
    } else {
      setCombo(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2" role="group" aria-label="閃卡或迷思快打切換">
          <button
            type="button"
            aria-pressed={subTab === 'cards'}
            onClick={() => setSubTab('cards')}
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-colors ${
              subTab === 'cards'
                ? 'bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            🃏 全站 {ALL_LESSONS.length} 課知識閃卡翻翻樂
          </button>
          <button
            type="button"
            aria-pressed={subTab === 'blitz'}
            onClick={() => setSubTab('blitz')}
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-colors ${
              subTab === 'blitz'
                ? 'bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            ⚡ 真假迷思快打對決 ({completedMyths.length}/{MYTH_BLITZ_DECK.length})
          </button>
        </div>
      </div>

      {subTab === 'cards' ? (
        <div className="space-y-5">
          {/* Track Filter Chips */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="閃卡路徑篩選">
            <button
              type="button"
              onClick={() => {
                setSelectedTrackId('all');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedTrackId === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                  : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              全部路徑 ({ALL_LESSONS.length} 課)
            </button>
            {LEARNING_TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setSelectedTrackId(t.id);
                  setCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedTrackId === t.id
                    ? 'bg-emerald-700 text-white dark:bg-emerald-400 dark:text-slate-950'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
                }`}
              >
                {t.title_zh} ({t.lessons.length})
              </button>
            ))}
          </div>

          {/* Interactive Flashcard */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrackIcon icon={currentTrack.icon} tone={currentTrack.tone} size="sm" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {currentTrack.title_zh} · 閃卡 {(cardIndex % deckLessons.length) + 1} / {deckLessons.length}
                </span>
              </div>
              {lessonAllMastered && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  本課 {currentLesson.key_points_zh.length} 個知識點已全數掌握
                </span>
              )}
            </div>

            {/* Front of Flashcard */}
            <div className={`rounded-2xl border p-6 space-y-4 ${TONE[currentTrack.tone].soft} border-slate-200 dark:border-slate-800`}>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                🤔 先在心裡想一想（主動回憶 Active Recall）
              </div>
              <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                {currentLesson.title_zh}
              </h4>
              {currentLesson.analogy_zh && (
                <p className="flex items-start gap-2 text-sm sm:text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    <strong>生活比喻提示：</strong>
                    {currentLesson.analogy_zh}
                  </span>
                </p>
              )}

              {!isFlipped ? (
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>翻開閃卡：看一句話核心重點與 {currentLesson.key_points_zh.length} 大知識點</span>
                </button>
              ) : (
                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-4 animate-fade-in">
                  <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-200 dark:border-emerald-900/60">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                      🎯 一句話核心解答
                    </p>
                    <p className="text-base sm:text-lg font-bold leading-7 text-slate-900 dark:text-white">
                      {currentLesson.big_idea_zh}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      📌 本課必懂的 {currentLesson.key_points_zh.length} 個知識點：
                    </p>
                    <ul className="space-y-2">
                      {currentLesson.key_points_zh.map((kp, i) => (
                        <li
                          key={i}
                          className="rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm leading-6 text-slate-800 dark:text-slate-200 flex items-start gap-2.5"
                        >
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                            {i + 1}.
                          </span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 p-3.5 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100">
                    <strong>🏃 今天就能做：</strong> {currentLesson.do_today_zh[0]}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onMarkLessonPoints(
                      currentLesson.id,
                      currentLesson.key_points_zh.length,
                      !lessonAllMastered
                    );
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${
                    lessonAllMastered
                      ? 'border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {lessonAllMastered
                      ? '已掌握本課全部知識點（點擊取消）'
                      : `✨ 我記住了！標記掌握本課 ${currentLesson.key_points_zh.length} 個知識點`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onGo(`learn/${currentLesson.track_id}/${currentLesson.id}`)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>進入完整圖解課堂</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((prev) => (prev - 1 + deckLessons.length) % deckLessons.length);
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-emerald-500"
                >
                  上一張
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((prev) => (prev + 1) % deckLessons.length);
                  }}
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-xs font-bold text-white dark:text-slate-950"
                >
                  <span>下一張閃卡</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Myth Blitz Sub-Tab */
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 dark:bg-amber-950/60 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber-300">
                ⚡ 真假迷思快打 · 第 {(blitzIdx % MYTH_BLITZ_DECK.length) + 1} / {MYTH_BLITZ_DECK.length} 題
              </span>
              {combo > 1 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-950/60 px-2.5 py-0.5 text-xs font-bold text-orange-800 dark:text-orange-300">
                  <Flame className="w-3.5 h-3.5 text-orange-500" aria-hidden="true" />
                  連續答對 {combo} 題！
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              已破除 {completedMyths.length} / {MYTH_BLITZ_DECK.length} 題
            </span>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              請判斷以下這句話是「⭕ 正確科學事實」還是「❌ 常見錯誤迷思」？
            </p>
            <p className="text-lg sm:text-xl font-bold leading-8 text-slate-900 dark:text-white">
              「{currentBlitz.statement_zh}」
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={blitzGuess !== null}
              onClick={() => handleAnswerBlitz(true)}
              className={`rounded-2xl border p-4 text-center font-bold text-sm sm:text-base transition-all ${
                blitzGuess === true
                  ? currentBlitz.is_true
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200'
                    : 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200'
                  : 'border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-slate-200'
              }`}
            >
              ⭕ 這是正確的科學觀念
            </button>
            <button
              type="button"
              disabled={blitzGuess !== null}
              onClick={() => handleAnswerBlitz(false)}
              className={`rounded-2xl border p-4 text-center font-bold text-sm sm:text-base transition-all ${
                blitzGuess === false
                  ? !currentBlitz.is_true
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200'
                    : 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200'
                  : 'border-slate-200 dark:border-slate-700 hover:border-rose-500 text-slate-800 dark:text-slate-200'
              }`}
            >
              ❌ 這是常見的錯誤迷思
            </button>
          </div>

          {blitzGuess !== null && (
            <div
              role="status"
              className={`rounded-2xl p-5 space-y-3 border animate-fade-in ${
                blitzCorrect
                  ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-800 dark:bg-emerald-950/40'
                  : 'border-amber-300 bg-amber-50/80 dark:border-amber-800 dark:bg-amber-950/35'
              }`}
            >
              <p className="font-bold text-base text-slate-900 dark:text-white">
                {blitzCorrect ? '🎉 答對了！' : '💡 差一點點！'} {currentBlitz.verdict_zh}
              </p>
              <p className="text-sm sm:text-[15px] leading-7 text-slate-700 dark:text-slate-200">
                {currentBlitz.explain_zh}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onGo(`learn/${currentBlitz.track_id}/${currentBlitz.lesson_id}`)}
                  className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 underline underline-offset-4"
                >
                  前往對應小課深入了解 →
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBlitzGuess(null)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    重答
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBlitzGuess(null);
                      setBlitzIdx((i) => (i + 1) % MYTH_BLITZ_DECK.length);
                    }}
                    className="inline-flex items-center gap-1 rounded-xl bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950 px-4 py-2 text-xs font-bold"
                  >
                    <span>下一題快打</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── Mode 3: 愛上 8 大醫學學科博覽館 & 5 階成長藍圖 ──────────────────────────

const MedicalDisciplinesAcademySection: React.FC<{
  growth: ReturnType<typeof calculateLearnerGrowth>;
  likedDisciplines: string[];
  onToggleLike: (id: string) => void;
  onGo: (hash: string) => void;
}> = ({ growth, likedDisciplines, onToggleLike, onGo }) => {
  return (
    <div className="space-y-10">
      {/* 5-Stage Learner Growth Ladder */}
      <section aria-labelledby="ranks-ladder-title" className="space-y-4">
        <div>
          <h3 id="ranks-ladder-title" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <span>從「健康小白」到「實證醫學知識者」的 5 階成長藍圖</span>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            每讀完一課 (+15 XP)、每打勾掌握一個知識點 (+3 XP)、每完成一題情境實戰 (+20 XP) 或加入日常行動計畫 (+8 XP)，都會累積你的醫學知識能量！
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {LEARNER_RANKS.map((r) => {
            const unlocked = growth.xp >= r.min_xp;
            const isCurrent = growth.currentRank.id === r.id;
            return (
              <div
                key={r.id}
                className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 transition-all ${
                  isCurrent
                    ? 'border-emerald-600 bg-emerald-50/70 dark:border-emerald-400 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : unlocked
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900/80'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 opacity-75'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl" aria-hidden="true">{r.badge_emoji}</span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      Lv.{r.level} · {r.min_xp}+ XP
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {r.title_zh}
                  </h4>
                  <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {r.tagline_zh}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                  {isCurrent ? '🌟 目前所在階段' : unlocked ? '✓ 已解鎖達成' : `🔒 累積 ${r.min_xp} XP 解鎖`}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8 Fascinating Medical Disciplines Museum */}
      <section aria-labelledby="disciplines-museum-title" className="space-y-4">
        <div>
          <h3 id="disciplines-museum-title" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>為什麼這些醫學學科超迷人？給每個人的 8 大健康科學博覽館</span>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            生理學、生物化學、流行病學一點都不可怕！它們其實就是你身體每天上演的生命奇蹟。點亮「❤️ 我喜歡這門學科」收藏你感興趣的領域：
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {MEDICAL_DISCIPLINES.map((disc) => {
            const isLiked = likedDisciplines.includes(disc.id);
            const lessons = disc.starter_lessons
              .map((id) => findLesson(id))
              .filter((x): x is NonNullable<typeof x> => Boolean(x));

            return (
              <article
                key={disc.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between gap-5 shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <TrackIcon icon={disc.icon} tone={disc.tone} size="lg" />
                      <div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {disc.name_en}
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                          {disc.name_zh}
                        </h4>
                        <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                          {disc.subtitle_zh}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-pressed={isLiked}
                      onClick={() => onToggleLike(disc.id)}
                      className={`shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                        isLiked
                          ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-rose-400'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                        aria-hidden="true"
                      />
                      <span>{isLiked ? '已喜愛學科' : '喜歡這門學科'}</span>
                    </button>
                  </div>

                  {/* Wonder Story */}
                  <div className={`rounded-2xl p-4 space-y-1.5 ${TONE[disc.tone].soft}`}>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                      <span>為什麼這門學科超迷人？</span>
                    </p>
                    <p className="text-xs sm:text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {disc.wonder_story_zh}
                    </p>
                  </div>

                  {/* 3 Core Concepts */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      🔑 從小白變內行的 3 個核心觀念：
                    </p>
                    <ul className="space-y-1.5">
                      {disc.core_concepts_zh.map((c, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-[13.5px] leading-6 text-slate-700 dark:text-slate-300 flex items-start gap-2"
                        >
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Starter Lessons & Interactive Lab Link */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {lessons.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => onGo(`learn/${l.track_id}/${l.id}`)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300"
                      >
                        <BookOpen className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                        <span>{l.title_zh}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onGo(disc.lab_link.hash)}
                    className="w-full inline-flex items-center justify-between rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 px-4 py-2.5 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 transition-colors"
                  >
                    <span>🔬 {disc.lab_link.label_zh}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
