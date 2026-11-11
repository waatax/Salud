import { useCallback, useEffect, useState } from 'react';

/**
 * Per-reader learning progress, kept in localStorage.
 *
 * Progress is a convenience, not a record: it lives only in this browser and the
 * app renders correctly when storage is unavailable (private mode, blocked site data).
 * A custom event keeps every mounted consumer in sync within the tab; the native
 * `storage` event covers other tabs.
 */

const KEY = 'salud_learning_v1';
const EVENT = 'salud:learning-progress';

export interface LearningProgress {
  completed: string[];
  /** lessonId → whether the quiz was answered correctly on the first try. */
  quiz: Record<string, boolean>;
  last?: { trackId: string; lessonId: string; at: number };
  /** Individual knowledge point IDs mastered (e.g. `L-BAS-01#kp0`) or flashcard IDs (`L-BAS-01`). */
  masteredPoints: string[];
  /** Completed real-world clinical/life scenario practice IDs (e.g. `SCEN-01`). */
  completedScenarios: string[];
  /** Completed myth blitz card IDs (e.g. `BLITZ-01`). */
  completedMyths: string[];
  /** Medical discipline IDs the learner marked as "liked / interested" (e.g. `DISC-PHYSIO`). */
  likedDisciplines: string[];
}

const EMPTY: LearningProgress = {
  completed: [],
  quiz: {},
  masteredPoints: [],
  completedScenarios: [],
  completedMyths: [],
  likedDisciplines: [],
};

function load(): LearningProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      quiz: parsed.quiz && typeof parsed.quiz === 'object' ? parsed.quiz : {},
      last: parsed.last,
      masteredPoints: Array.isArray(parsed.masteredPoints) ? parsed.masteredPoints : [],
      completedScenarios: Array.isArray(parsed.completedScenarios) ? parsed.completedScenarios : [],
      completedMyths: Array.isArray(parsed.completedMyths) ? parsed.completedMyths : [],
      likedDisciplines: Array.isArray(parsed.likedDisciplines) ? parsed.likedDisciplines : [],
    };
  } catch {
    return EMPTY;
  }
}

function save(p: LearningProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable: progress simply is not remembered */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(load);

  useEffect(() => {
    const sync = () => setProgress(load());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const update = useCallback((fn: (p: LearningProgress) => LearningProgress) => {
    const next = fn(load());
    save(next);
    setProgress(next);
  }, []);

  const markComplete = useCallback(
    (lessonId: string, done = true) =>
      update((p) => ({
        ...p,
        completed: done
          ? Array.from(new Set([...p.completed, lessonId]))
          : p.completed.filter((id) => id !== lessonId),
      })),
    [update]
  );

  const recordQuiz = useCallback(
    (lessonId: string, correct: boolean) =>
      update((p) => (lessonId in p.quiz ? p : { ...p, quiz: { ...p.quiz, [lessonId]: correct } })),
    [update]
  );

  const visit = useCallback(
    (trackId: string, lessonId: string) =>
      update((p) => ({ ...p, last: { trackId, lessonId, at: Date.now() } })),
    [update]
  );

  const reset = useCallback(() => update(() => EMPTY), [update]);

  const isDone = useCallback((lessonId: string) => progress.completed.includes(lessonId), [progress]);

  const toggleMasteredPoint = useCallback(
    (pointId: string) =>
      update((p) => {
        const exists = p.masteredPoints.includes(pointId);
        return {
          ...p,
          masteredPoints: exists
            ? p.masteredPoints.filter((id) => id !== pointId)
            : Array.from(new Set([...p.masteredPoints, pointId])),
        };
      }),
    [update]
  );

  const markLessonPoints = useCallback(
    (pointIds: string[], mastered = true) =>
      update((p) => ({
        ...p,
        masteredPoints: mastered
          ? Array.from(new Set([...p.masteredPoints, ...pointIds]))
          : p.masteredPoints.filter((id) => !pointIds.includes(id)),
      })),
    [update]
  );

  const isPointMastered = useCallback(
    (pointId: string) => progress.masteredPoints.includes(pointId),
    [progress.masteredPoints]
  );

  const completeScenario = useCallback(
    (scenarioId: string) =>
      update((p) => ({
        ...p,
        completedScenarios: Array.from(new Set([...p.completedScenarios, scenarioId])),
      })),
    [update]
  );

  const completeMyth = useCallback(
    (mythId: string) =>
      update((p) => ({
        ...p,
        completedMyths: Array.from(new Set([...p.completedMyths, mythId])),
      })),
    [update]
  );

  const toggleLikeDiscipline = useCallback(
    (disciplineId: string) =>
      update((p) => {
        const liked = p.likedDisciplines.includes(disciplineId);
        return {
          ...p,
          likedDisciplines: liked
            ? p.likedDisciplines.filter((id) => id !== disciplineId)
            : Array.from(new Set([...p.likedDisciplines, disciplineId])),
        };
      }),
    [update]
  );

  return {
    progress,
    markComplete,
    recordQuiz,
    visit,
    reset,
    isDone,
    toggleMasteredPoint,
    markLessonPoints,
    isPointMastered,
    completeScenario,
    completeMyth,
    toggleLikeDiscipline,
  };
}

/** Deterministic ID for an individual knowledge point inside a lesson. */
export function lessonPointId(lessonId: string, index: number): string {
  return `${lessonId}#kp${index}`;
}
