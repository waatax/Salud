import type { LearningProgress } from '../hooks/useLearningProgress';
import type { LearningTrack, Lesson } from '../types/learning';

/**
 * spacedRepetition.ts — Ultralearning (Retrieval, Drill, Retention) + Get Better at Anything
 * (Difficulty Sweet Spot, Variability Over Repetition) pure scheduling engine.
 *
 * Pure functions only — no DOM, no localStorage — so every rule is unit-tested.
 */

export type RecallRating = 'again' | 'good' | 'easy';

export interface ReviewCardState {
  /** Leitner mastery box 0..4 (maps to 1d, 3d, 7d, 21d, 60d). */
  box: number;
  /** Epoch ms when the card is next due for active recall. */
  nextDueAt: number;
  /** Epoch ms of last review. */
  lastReviewedAt: number;
  /** Total reviews completed. */
  reviews: number;
  /** Number of times rated 'again' (lapse count — signals a Drill target). */
  lapses: number;
}

/** Leitner intervals in days for boxes 0..4. */
export const BOX_INTERVAL_DAYS = [1, 3, 7, 21, 60] as const;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Compute the next review state after an active-recall attempt.
 * - 'again': resets to box 0 (review tomorrow) and increments lapses.
 * - 'good': advances 1 box (capped at 4).
 * - 'easy': advances 2 boxes (capped at 4) so already-mastered material stays out of the way.
 */
export function scheduleReview(
  prev: ReviewCardState | undefined,
  rating: RecallRating,
  now: number = Date.now()
): ReviewCardState {
  const prevBox = prev ? prev.box : 0;
  const prevReviews = prev ? prev.reviews : 0;
  const prevLapses = prev ? prev.lapses : 0;

  let nextBox: number;
  let lapses = prevLapses;
  if (rating === 'again') {
    nextBox = 0;
    lapses += 1;
  } else if (rating === 'good') {
    nextBox = prev ? Math.min(4, prevBox + 1) : 1;
  } else {
    nextBox = prev ? Math.min(4, prevBox + 2) : 2;
  }

  const days = BOX_INTERVAL_DAYS[nextBox];
  return {
    box: nextBox,
    nextDueAt: now + days * DAY_MS,
    lastReviewedAt: now,
    reviews: prevReviews + 1,
    lapses,
  };
}

/**
 * Return lesson IDs currently due for spaced recall, ordered by urgency:
 * 1. Overdue cards with the most lapses / lowest box first
 * 2. Completed lessons or missed-quiz lessons not yet scheduled (due immediately)
 */
export function getDueLessonIds(
  allLessonIds: readonly string[],
  progress: Pick<LearningProgress, 'completed' | 'quiz' | 'reviewSchedule'>,
  now: number = Date.now()
): string[] {
  const schedule = progress.reviewSchedule ?? {};
  const dueScheduled: Array<{ id: string; priority: number }> = [];
  const unscheduledDue: string[] = [];

  for (const id of allLessonIds) {
    const card = schedule[id];
    if (card) {
      if (card.nextDueAt <= now) {
        // Higher priority = lower box, more lapses, older due date
        const overdueDays = Math.max(0, (now - card.nextDueAt) / DAY_MS);
        const priority = (5 - card.box) * 100 + card.lapses * 40 + overdueDays;
        dueScheduled.push({ id, priority });
      }
    } else if (progress.quiz[id] === false || progress.completed.includes(id)) {
      unscheduledDue.push(id);
    }
  }

  dueScheduled.sort((a, b) => b.priority - a.priority);
  return [...dueScheduled.map((d) => d.id), ...unscheduledDue];
}

export interface TrackDiagnostic {
  trackId: string;
  title_zh: string;
  totalLessons: number;
  completedLessons: number;
  quizAttempted: number;
  quizCorrect: number;
  lapses: number;
  /** 0..100 composite mastery score (completion + quiz accuracy - lapse penalty). */
  masteryPct: number;
  /** Recommended next lesson to study or drill in this track. */
  nextLessonId: string;
  /** Plain-language reason why this track is a bottleneck or strength. */
  reason_zh: string;
}

/**
 * Ultralearning Principle 4 (Drill): diagnose every track and rank the learner's
 * weakest bottleneck first so practice attacks the highest-leverage gap.
 */
export function diagnoseTracks(
  tracks: readonly LearningTrack[],
  progress: Pick<LearningProgress, 'completed' | 'quiz' | 'reviewSchedule'>
): TrackDiagnostic[] {
  const schedule = progress.reviewSchedule ?? {};
  const list = tracks.map((track): TrackDiagnostic => {
    const total = track.lessons.length;
    const completed = track.lessons.filter((l) => progress.completed.includes(l.id)).length;
    let quizAttempted = 0;
    let quizCorrect = 0;
    let lapses = 0;
    let missedLessonId: string | undefined;
    let firstIncompleteId: string | undefined;

    for (const lesson of track.lessons) {
      if (!firstIncompleteId && !progress.completed.includes(lesson.id)) {
        firstIncompleteId = lesson.id;
      }
      if (lesson.id in progress.quiz) {
        quizAttempted += 1;
        if (progress.quiz[lesson.id]) {
          quizCorrect += 1;
        } else if (!missedLessonId) {
          missedLessonId = lesson.id;
        }
      }
      const card = schedule[lesson.id];
      if (card) lapses += card.lapses;
    }

    const completionScore = total > 0 ? (completed / total) * 65 : 0;
    const quizScore = quizAttempted > 0 ? (quizCorrect / quizAttempted) * 35 : 0;
    const penalty = Math.min(20, lapses * 5);
    const masteryPct = Math.max(0, Math.min(100, Math.round(completionScore + quizScore - penalty)));

    const nextLessonId = missedLessonId ?? firstIncompleteId ?? track.lessons[0]?.id ?? '';
    let reason_zh = '尚未開始，從第一堂白話入門課建立基礎心智模型。';
    if (missedLessonId) {
      reason_zh = '這條路徑有答錯的題目，最適合用「專攻弱點」立即修正迷思。';
    } else if (lapses > 0) {
      reason_zh = '間隔複習曾出現遺忘，再次主動回憶能大幅拉長記憶保留時間。';
    } else if (completed === total && total > 0) {
      reason_zh = '已完成全部課程，適合用跨主題混搭測驗維持長期直覺。';
    } else if (completed > 0) {
      reason_zh = `已完成 ${completed}/${total} 堂，接續下一課能把觀念連成完整地圖。`;
    }

    return {
      trackId: track.id,
      title_zh: track.title_zh,
      totalLessons: total,
      completedLessons: completed,
      quizAttempted,
      quizCorrect,
      lapses,
      masteryPct,
      nextLessonId,
      reason_zh,
    };
  });

  // Sort weakest first: prioritize tracks with quiz misses / lapses, then lowest mastery
  return list.sort((a, b) => {
    const aWeak = (a.quizAttempted - a.quizCorrect) + a.lapses;
    const bWeak = (b.quizAttempted - b.quizCorrect) + b.lapses;
    if (aWeak !== bWeak) return bWeak - aWeak;
    return a.masteryPct - b.masteryPct;
  });
}

export type TrackedLesson = Lesson & { track_id: string };

/**
 * Get Better at Anything Maxim 7 (Variability Over Repetition):
 * Build an interleaved cross-track drill deck so learners practice switching
 * between nutrition, exercise, sleep, labs, and prevention rather than repeating
 * one silo in isolation.
 */
export function buildInterleavedDeck(
  allLessons: readonly TrackedLesson[],
  progress: Pick<LearningProgress, 'completed' | 'quiz' | 'reviewSchedule'>,
  maxCount = 8,
  now: number = Date.now()
): TrackedLesson[] {
  const byTrack = new Map<string, TrackedLesson[]>();
  const dueSet = new Set(getDueLessonIds(allLessons.map((l) => l.id), progress, now));

  // Score each lesson: missed quizzes & due cards come first, then uncompleted, then mastered
  const scored = allLessons
    .filter((l) => Boolean(l.quiz))
    .map((l) => {
      let score = 0;
      if (progress.quiz[l.id] === false) score += 100;
      if (dueSet.has(l.id)) score += 60;
      if (!progress.completed.includes(l.id)) score += 20;
      return { lesson: l, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const { lesson } of scored) {
    const list = byTrack.get(lesson.track_id) ?? [];
    list.push(lesson);
    byTrack.set(lesson.track_id, list);
  }

  // Round-robin across tracks for genuine interleaving
  const deck: TrackedLesson[] = [];
  const trackLists = Array.from(byTrack.values());
  let round = 0;
  while (deck.length < maxCount) {
    let added = false;
    for (const list of trackLists) {
      if (round < list.length && deck.length < maxCount) {
        deck.push(list[round]);
        added = true;
      }
    }
    if (!added) break;
    round += 1;
  }
  return deck;
}
