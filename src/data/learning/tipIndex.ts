import { TipKind } from '../../types/learning';
import { ALL_QUICK_TIPS } from './quickTips';
import { ALL_STARTER_TASKS } from './starterPlan';
import { LEARNING_TRACKS } from './tracks';

/**
 * One namespace for everything a reader can add to 「我的行動計畫」:
 *   TIP-…            a section's quick tip
 *   START-W<n>-<k>   a task from the 4-week starter plan
 *   <lessonId>#<i>   the i-th "今天就能做" item of a lesson
 */
export interface ResolvedTip {
  id: string;
  kind: TipKind;
  title_zh: string;
  how_zh: string;
  source_zh: string;
  hash: string;
}

const TRACK_KIND: Record<string, TipKind> = {
  basics: 'check',
  body: 'check',
  eat: 'eat',
  move: 'move',
  rest: 'sleep',
  checkup: 'check',
  prevent: 'check',
};

const INDEX = new Map<string, ResolvedTip>();

for (const tip of ALL_QUICK_TIPS) {
  INDEX.set(tip.id, {
    id: tip.id,
    kind: tip.kind,
    title_zh: tip.title_zh,
    how_zh: tip.how_zh,
    source_zh: tip.section.title_zh,
    hash: tip.section.hash,
  });
}

for (const task of ALL_STARTER_TASKS) {
  INDEX.set(task.id, {
    id: task.id,
    kind: task.kind,
    title_zh: task.text_zh,
    how_zh: task.detail_zh,
    source_zh: `4 週啟動計畫・第 ${task.week} 週`,
    hash: 'start',
  });
}

for (const track of LEARNING_TRACKS) {
  for (const lesson of track.lessons) {
    lesson.do_today_zh.forEach((text, i) => {
      const id = `${lesson.id}#${i}`;
      INDEX.set(id, {
        id,
        kind: TRACK_KIND[track.id] ?? 'check',
        title_zh: text,
        how_zh: '',
        source_zh: `${track.title_zh}・${lesson.title_zh}`,
        hash: `learn/${track.id}/${lesson.id}`,
      });
    });
  }
}

export const resolveTip = (id: string): ResolvedTip | undefined => INDEX.get(id);

export const lessonActionId = (lessonId: string, index: number) => `${lessonId}#${index}`;

/** Every resolvable id — used by tests to keep the namespaces collision-free. */
export const ALL_ACTION_IDS = (): string[] => Array.from(INDEX.keys());
