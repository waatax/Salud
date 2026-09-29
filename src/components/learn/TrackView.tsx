import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Lightbulb,
  ListChecks,
  Stethoscope,
  XCircle,
  BookOpen,
  HelpCircle,
  ExternalLink,
  RotateCcw,
  Plus,
  Check,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { lessonActionId } from '../../data/learning/tipIndex';
import { LEARNING_TRACKS, getTrack, TOTAL_LESSON_MINUTES, ALL_LESSONS } from '../../data/learning/tracks';
import { getUpdate } from '../../data/learning/evidenceUpdates';
import { LearningTrack, Lesson } from '../../types/learning';
import { TONE, TrackIcon, ProgressBar, PageHeader, formatYM } from './learnUi';
import { QuickTips } from './QuickTips';

/** `#learn` → catalogue, `#learn/<track>` → track overview, `#learn/<track>/<lesson>` → lesson. */
export const TrackView: React.FC = () => {
  const { learnTrackId, learnLessonId } = useNavigation();
  const track = learnTrackId ? getTrack(learnTrackId) : undefined;
  const lesson = track && learnLessonId ? track.lessons.find((l) => l.id === learnLessonId) : undefined;

  if (track && lesson) return <LessonReader key={lesson.id} track={track} lesson={lesson} />;
  if (track) return <TrackOverview track={track} />;
  return <Catalogue />;
};

const Catalogue: React.FC = () => {
  const { go } = useNavigation();
  const { progress, reset } = useLearningProgress();
  const done = progress.completed.filter((id) => ALL_LESSONS.some((l) => l.id === id)).length;

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        eyebrow="學習路徑"
        title="課程總表"
        lead={`${LEARNING_TRACKS.length} 條路徑、${ALL_LESSONS.length} 堂課，全部讀完約 ${Math.round(TOTAL_LESSON_MINUTES / 60 * 10) / 10} 小時。建議從「健康素養入門」開始，再依你的需要挑選。`}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <span>
            你已完成 <strong className="text-slate-900 dark:text-white tabular-nums">{done}</strong> / {ALL_LESSONS.length} 課
          </span>
          {done > 0 && (
            <button
              onClick={() => {
                if (window.confirm('確定要清除這個瀏覽器中的學習進度嗎？')) reset();
              }}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              清除進度
            </button>
          )}
        </div>
      </PageHeader>

      <QuickTips sectionKey="learn:basics" />

      <ol className="space-y-6">
        {LEARNING_TRACKS.map((t, i) => (
          <li key={t.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
            <button
              onClick={() => go(`learn/${t.id}`)}
              className={`w-full flex items-start gap-3 p-4 sm:p-5 text-left ${TONE[t.tone].soft} border-b border-slate-200 dark:border-slate-800`}
            >
              <TrackIcon icon={t.icon} tone={t.tone} size="lg" />
              <span className="flex-1 min-w-0">
                <span className="block text-xs text-slate-500 dark:text-slate-400">路徑 {i + 1} · 適合：{t.audience_zh}</span>
                <span className="block text-lg font-bold text-slate-900 dark:text-white">{t.title_zh}</span>
                <span className="block text-sm text-slate-600 dark:text-slate-300">{t.subtitle_zh}</span>
              </span>
              <ArrowRight className="w-5 h-5 mt-1 text-slate-400" aria-hidden="true" />
            </button>
            <LessonList track={t} />
          </li>
        ))}
      </ol>
    </div>
  );
};

const LessonList: React.FC<{ track: LearningTrack }> = ({ track }) => {
  const { go } = useNavigation();
  const { isDone } = useLearningProgress();
  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
      {track.lessons.map((l, i) => (
        <li key={l.id}>
          <button
            onClick={() => go(`learn/${track.id}/${l.id}`)}
            className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            {isDone(l.id) ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-label="已完成" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" aria-hidden="true" />
            )}
            <span className="text-xs tabular-nums text-slate-400 w-5 shrink-0">{i + 1}</span>
            <span className="flex-1 min-w-0 text-[15px] text-slate-800 dark:text-slate-200">{l.title_zh}</span>
            <span className="text-xs text-slate-400 shrink-0">{l.minutes} 分</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

const TrackOverview: React.FC<{ track: LearningTrack }> = ({ track }) => {
  const { go } = useNavigation();
  const { progress } = useLearningProgress();
  const done = track.lessons.filter((l) => progress.completed.includes(l.id)).length;
  const next = track.lessons.find((l) => !progress.completed.includes(l.id)) ?? track.lessons[0];
  const minutes = track.lessons.reduce((s, l) => s + l.minutes, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={() => go('learn')} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        課程總表
      </button>
      <div className={`rounded-3xl border border-slate-200 dark:border-slate-800 ${TONE[track.tone].soft} p-5 sm:p-8 space-y-4`}>
        <TrackIcon icon={track.icon} tone={track.tone} size="lg" />
        <PageHeader eyebrow={`學習路徑 · ${track.lessons.length} 課 · 約 ${minutes} 分鐘`} title={track.title_zh} lead={track.subtitle_zh} />
        <p className="text-sm text-slate-600 dark:text-slate-400">適合：{track.audience_zh}</p>
        <div className="max-w-md space-y-1.5">
          <ProgressBar value={(done / track.lessons.length) * 100} tone={track.tone} label="路徑完成度" />
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            已完成 {done} / {track.lessons.length}
          </p>
        </div>
        <button
          onClick={() => go(`learn/${track.id}/${next.id}`)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 font-semibold px-5 py-2.5 transition-colors"
        >
          {done === 0 ? '開始第一課' : done === track.lessons.length ? '從頭複習' : '繼續下一課'}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
        <LessonList track={track} />
      </div>
      <QuickTips key={track.id} sectionKey={`learn:${track.id}`} />
    </div>
  );
};

const LessonReader: React.FC<{ track: LearningTrack; lesson: Lesson }> = ({ track, lesson }) => {
  const { go } = useNavigation();
  const { visit, markComplete, recordQuiz, isDone, progress } = useLearningProgress();
  const { inPlan, add, remove } = useActionPlan();
  const idx = track.lessons.findIndex((l) => l.id === lesson.id);
  const prev = track.lessons[idx - 1];
  const next = track.lessons[idx + 1];
  const nextTrack = LEARNING_TRACKS[LEARNING_TRACKS.findIndex((t) => t.id === track.id) + 1];
  const done = isDone(lesson.id);

  useEffect(() => {
    visit(track.id, lesson.id);
  }, [track.id, lesson.id, visit]);

  const updates = useMemo(
    () => (lesson.update_ids ?? []).map(getUpdate).filter((u): u is NonNullable<typeof u> => Boolean(u)),
    [lesson.update_ids]
  );

  return (
    <article className="max-w-3xl mx-auto space-y-8 animate-fade-in" aria-labelledby="lesson-title">
      {/* Header */}
      <div className="space-y-4">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400" aria-label="課程位置">
          <button onClick={() => go('learn')} className="hover:text-emerald-700 dark:hover:text-emerald-400">學習路徑</button>
          <span aria-hidden="true">/</span>
          <button onClick={() => go(`learn/${track.id}`)} className="hover:text-emerald-700 dark:hover:text-emerald-400">{track.title_zh}</button>
        </nav>
        <div className="flex items-center gap-3">
          <TrackIcon icon={track.icon} tone={track.tone} size="sm" />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            第 {idx + 1} / {track.lessons.length} 課
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />約 {lesson.minutes} 分鐘
          </span>
          {done && (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              已完成
            </span>
          )}
        </div>
        <h1 id="lesson-title" className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-white text-balance">
          {lesson.title_zh}
        </h1>
        <div className="flex gap-1" aria-hidden="true">
          {track.lessons.map((l, i) => (
            <span
              key={l.id}
              className={`h-1 flex-1 rounded-full ${
                i === idx ? TONE[track.tone].bar : progress.completed.includes(l.id) ? 'bg-emerald-300 dark:bg-emerald-800' : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Big idea */}
      <div className={`rounded-2xl border border-slate-200 dark:border-slate-800 ${TONE[track.tone].soft} p-5`}>
        <p className={`text-xs font-semibold mb-1.5 ${TONE[track.tone].text}`}>一句話重點</p>
        <p className="text-lg sm:text-xl font-semibold leading-8 text-slate-900 dark:text-white">{lesson.big_idea_zh}</p>
        {lesson.analogy_zh && (
          <p className="mt-3 flex gap-2 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
            <Lightbulb className="w-5 h-5 shrink-0 mt-1 text-amber-500" aria-hidden="true" />
            <span>
              <span className="font-semibold">打個比方：</span>
              {lesson.analogy_zh}
            </span>
          </p>
        )}
      </div>

      {/* Key points */}
      <section aria-labelledby="kp-h" className="space-y-3">
        <h2 id="kp-h" className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
          你需要知道的 {lesson.key_points_zh.length} 件事
        </h2>
        <ol className="space-y-3">
          {lesson.key_points_zh.map((kp, i) => (
            <li key={i} className="flex gap-3">
              <span className={`w-7 h-7 shrink-0 rounded-full inline-flex items-center justify-center text-sm font-bold ${TONE[track.tone].chip} border`}>
                {i + 1}
              </span>
              <p className="flex-1 text-[16px] leading-8 text-slate-800 dark:text-slate-200">{kp}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Do today */}
      <section aria-labelledby="do-h" className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/20 p-5 space-y-2">
        <h2 id="do-h" className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
          <ListChecks className="w-5 h-5" aria-hidden="true" />
          今天就能做
        </h2>
        <ul className="space-y-2">
          {lesson.do_today_zh.map((d, i) => {
            const actionId = lessonActionId(lesson.id, i);
            const inside = inPlan(actionId);
            return (
              <li key={i} className="flex items-start gap-2 text-[15px] leading-7 text-emerald-950 dark:text-emerald-100">
                <span aria-hidden="true">✓</span>
                <span className="flex-1">{d}</span>
                <button
                  onClick={() => (inside ? remove(actionId) : add(actionId))}
                  aria-pressed={inside}
                  className={`shrink-0 mt-0.5 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                    inside
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950'
                      : 'border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-white/70 dark:hover:bg-emerald-950/40'
                  }`}
                >
                  {inside ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Plus className="w-3.5 h-3.5" aria-hidden="true" />}
                  {inside ? '已加入計畫' : '加入計畫'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Myth */}
      {lesson.myth_zh && (
        <section aria-label="常見迷思" className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/20 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-rose-800 dark:text-rose-300 mb-1.5">
              <XCircle className="w-4 h-4" aria-hidden="true" />
              常見迷思
            </p>
            <p className="text-[15px] leading-7 text-rose-950 dark:text-rose-100">「{lesson.myth_zh.myth}」</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900/60 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-1.5">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              實證怎麼說
            </p>
            <p className="text-[15px] leading-7 text-slate-800 dark:text-slate-200">{lesson.myth_zh.truth}</p>
          </div>
        </section>
      )}

      {/* See a doctor */}
      {lesson.see_doctor_zh && lesson.see_doctor_zh.length > 0 && (
        <section aria-labelledby="doc-h" className="rounded-2xl border border-amber-300 dark:border-amber-800/70 bg-amber-50/70 dark:bg-amber-950/20 p-5 space-y-2">
          <h2 id="doc-h" className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
            <Stethoscope className="w-5 h-5" aria-hidden="true" />
            出現這些情況，請就醫
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-[15px] leading-7 text-amber-950 dark:text-amber-100">
            {lesson.see_doctor_zh.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Quiz */}
      {lesson.quiz && <LessonQuizCard lessonId={lesson.id} quiz={lesson.quiz} onAnswer={recordQuiz} />}

      {/* Evidence basis */}
      {updates.length > 0 && (
        <section aria-labelledby="basis-h" className="space-y-2">
          <h2 id="basis-h" className="text-sm font-bold text-slate-700 dark:text-slate-300">本課依據的最新實證</h2>
          <ul className="flex flex-col gap-2">
            {updates.map((u) => (
              <li key={u.id}>
                <button
                  onClick={() => go(`updates/${u.id}`)}
                  className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 hover:border-emerald-400 dark:hover:border-emerald-700 transition-colors"
                >
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {u.org} · {formatYM(u.date)}
                  </span>
                  <span className="block text-sm text-slate-800 dark:text-slate-200">{u.title_zh}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Go deeper */}
      <section aria-labelledby="deep-h" className="space-y-2">
        <h2 id="deep-h" className="text-sm font-bold text-slate-700 dark:text-slate-300">想看完整機制與圖解</h2>
        <div className="flex flex-wrap gap-2">
          {lesson.deep_links.map((d) => (
            <button
              key={d.hash}
              onClick={() => go(d.hash)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              {d.label_zh}
            </button>
          ))}
        </div>
      </section>

      {/* Complete + nav */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
        <button
          onClick={() => markComplete(lesson.id, !done)}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-colors ${
            done
              ? 'border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30'
              : 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950'
          }`}
          aria-pressed={done}
        >
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          {done ? '已標記完成（點擊取消）' : '我讀完了，標記完成'}
        </button>
        <div className="grid grid-cols-2 gap-3">
          {prev ? (
            <button
              onClick={() => go(`learn/${track.id}/${prev.id}`)}
              className="flex flex-col items-start gap-0.5 rounded-xl border border-slate-200 dark:border-slate-800 p-3 text-left hover:border-emerald-400 dark:hover:border-emerald-700"
            >
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <ArrowLeft className="w-3 h-3" aria-hidden="true" />上一課
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">{prev.title_zh}</span>
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              onClick={() => go(`learn/${track.id}/${next.id}`)}
              className="flex flex-col items-end gap-0.5 rounded-xl border border-slate-200 dark:border-slate-800 p-3 text-right hover:border-emerald-400 dark:hover:border-emerald-700"
            >
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                下一課<ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">{next.title_zh}</span>
            </button>
          ) : nextTrack ? (
            <button
              onClick={() => go(`learn/${nextTrack.id}`)}
              className="flex flex-col items-end gap-0.5 rounded-xl border border-slate-200 dark:border-slate-800 p-3 text-right hover:border-emerald-400 dark:hover:border-emerald-700"
            >
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                下一條路徑<ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{nextTrack.title_zh}</span>
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </article>
  );
};

const LessonQuizCard: React.FC<{
  lessonId: string;
  quiz: NonNullable<Lesson['quiz']>;
  onAnswer: (lessonId: string, correct: boolean) => void;
}> = ({ lessonId, quiz, onAnswer }) => {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const correct = picked === quiz.answer;

  return (
    <section aria-labelledby="quiz-h" className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3">
      <h2 id="quiz-h" className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
        小測驗
      </h2>
      <p className="text-[15px] leading-7 text-slate-800 dark:text-slate-200">{quiz.question_zh}</p>
      <div className="grid gap-2" role="radiogroup" aria-label="選項">
        {quiz.options_zh.map((opt, i) => {
          const isAnswer = i === quiz.answer;
          const isPicked = i === picked;
          const state = !answered
            ? 'border-slate-300 dark:border-slate-700 hover:border-sky-500'
            : isAnswer
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
            : isPicked
            ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30'
            : 'border-slate-200 dark:border-slate-800 opacity-60';
          return (
            <button
              key={i}
              role="radio"
              aria-checked={isPicked}
              disabled={answered}
              onClick={() => {
                setPicked(i);
                onAnswer(lessonId, i === quiz.answer);
              }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-[15px] text-slate-800 dark:text-slate-200 transition-colors ${state}`}
            >
              <span className="w-6 h-6 shrink-0 rounded-full border border-current inline-flex items-center justify-center text-xs font-semibold opacity-70">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {answered && isAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />}
              {answered && isPicked && !isAnswer && <XCircle className="w-5 h-5 text-rose-500" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div role="status" className={`rounded-xl p-3 text-[15px] leading-7 ${correct ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100'}`}>
          <strong>{correct ? '答對了！' : `正確答案是 ${String.fromCharCode(65 + quiz.answer)}。`}</strong>
          {quiz.explain_zh}
          {!correct && (
            <button onClick={() => setPicked(null)} className="block mt-1 text-sm font-semibold underline">
              再試一次
            </button>
          )}
        </div>
      )}
    </section>
  );
};
