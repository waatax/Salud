import { useCallback, useEffect, useState } from 'react';

/**
 * 「我的行動計畫」: the tips a reader chose to try, a daily tick-off, and the
 * 4-week starter checklist. Stored per browser like learning progress; the app works
 * without storage, the plan simply is not remembered.
 */

const KEY = 'salud_action_plan_v1';
const EVENT = 'salud:action-plan';
const KEEP_DAYS = 35;

export interface ActionPlanState {
  /** Tip ids in the order they were added. */
  items: string[];
  /** Local date (YYYY-MM-DD) → tip ids ticked that day. */
  done: Record<string, string[]>;
  /** Completed starter-plan task ids. */
  starter: string[];
}

const EMPTY: ActionPlanState = { items: [], done: {}, starter: [] };

export const localDateKey = (d = new Date()) => {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

function load(): ActionPlanState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Partial<ActionPlanState>;
    return {
      items: Array.isArray(p.items) ? p.items : [],
      done: p.done && typeof p.done === 'object' ? p.done : {},
      starter: Array.isArray(p.starter) ? p.starter : [],
    };
  } catch {
    return EMPTY;
  }
}

function prune(done: ActionPlanState['done']): ActionPlanState['done'] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - KEEP_DAYS);
  const min = localDateKey(cutoff);
  return Object.fromEntries(Object.entries(done).filter(([day]) => day >= min));
}

function save(s: ActionPlanState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useActionPlan() {
  const [plan, setPlan] = useState<ActionPlanState>(load);

  useEffect(() => {
    const sync = () => setPlan(load());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const update = useCallback((fn: (s: ActionPlanState) => ActionPlanState) => {
    const next = fn(load());
    save(next);
    setPlan(next);
  }, []);

  const add = useCallback(
    (id: string) => update((s) => (s.items.includes(id) ? s : { ...s, items: [...s.items, id] })),
    [update]
  );

  const remove = useCallback(
    (id: string) => update((s) => ({ ...s, items: s.items.filter((x) => x !== id) })),
    [update]
  );

  const toggleToday = useCallback(
    (id: string) =>
      update((s) => {
        const today = localDateKey();
        const list = s.done[today] ?? [];
        const nextList = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
        return { ...s, done: prune({ ...s.done, [today]: nextList }) };
      }),
    [update]
  );

  const toggleStarter = useCallback(
    (id: string) =>
      update((s) => ({
        ...s,
        starter: s.starter.includes(id) ? s.starter.filter((x) => x !== id) : [...s.starter, id],
      })),
    [update]
  );

  const inPlan = useCallback((id: string) => plan.items.includes(id), [plan]);
  const doneToday = useCallback((id: string) => (plan.done[localDateKey()] ?? []).includes(id), [plan]);
  const starterDone = useCallback((id: string) => plan.starter.includes(id), [plan]);

  /** Days in the last 7 (including today) on which the tip was ticked. */
  const last7 = useCallback(
    (id: string) => {
      let n = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        if ((plan.done[localDateKey(d)] ?? []).includes(id)) n++;
      }
      return n;
    },
    [plan]
  );

  return { plan, add, remove, toggleToday, toggleStarter, inPlan, doneToday, starterDone, last7 };
}
