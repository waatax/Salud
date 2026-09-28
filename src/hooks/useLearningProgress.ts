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
}

const EMPTY: LearningProgress = { completed: [], quiz: {} };

function load(): LearningProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      quiz: parsed.quiz && typeof parsed.quiz === 'object' ? parsed.quiz : {},
      last: parsed.last,
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

  return { progress, markComplete, recordQuiz, visit, reset, isDone };
}
