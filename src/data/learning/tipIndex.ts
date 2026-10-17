import { TipKind } from '../../types/learning';
import { ALL_QUICK_TIPS } from './quickTips';
import { ALL_STARTER_TASKS } from './starterPlan';
import { LEARNING_TRACKS } from './tracks';
import { CHAPTER_W_PAGES } from '../chapterW';
import { CHAPTER_O_PAGES } from '../chapterO';
import { CHAPTER_A_PAGES } from '../chapterA';
import { getFourPillarsProfile } from '../fourPillarsMatrix';

/**
 * One namespace for everything a reader can add to 「我的行動計畫」:
 *   TIP-…            a section's quick tip
 *   START-W<n>-<k>   a task from the 4-week starter plan
 *   <lessonId>#<i>   the i-th "今天就能做" item of a lesson
 *   <pageId>#t<1-3>  tiered action from a KnowledgePage
 *   <topic>#<pillar> 4-pillar clinical matrix action item
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

const PILLAR_KIND_MAP: Record<string, { kind: TipKind; label: string }> = {
  diet: { kind: 'eat', label: '飲食營養' },
  exercise: { kind: 'move', label: '運動訓練' },
  prevention: { kind: 'check', label: '預防篩檢' },
  treatment: { kind: 'check', label: '臨床處置' },
};

export const resolveTip = (id: string): ResolvedTip | undefined => {
  const direct = INDEX.get(id);
  if (direct) return direct;

  if (id.includes('#')) {
    const [prefix, suffix] = id.split('#');
    const allPages = [...CHAPTER_W_PAGES, ...CHAPTER_O_PAGES, ...CHAPTER_A_PAGES];
    const page = allPages.find((p) => p.id === prefix);

    // 1. KnowledgePage tiered action (#t1, #t2, #t3)
    if (suffix.startsWith('t') && suffix !== 'treatment' && page) {
      const isT1 = suffix === 't1' || suffix === 'tier1';
      const isT2 = suffix === 't2' || suffix === 'tier2';
      const tierTitle = isT1 ? '核心基礎' : isT2 ? '進階強化' : '專家精準';
      const tierContent = isT1 ? page.do_this.tier1 : isT2 ? page.do_this.tier2 : page.do_this.tier3;
      return {
        id,
        kind: isT1 ? 'eat' : isT2 ? 'move' : 'check',
        title_zh: `【${tierTitle}】${tierContent}`,
        how_zh: `${page.title_zh} 實踐處方`,
        source_zh: `${page.title_zh}`,
        hash: `${page.chapter_id}/${page.id}`,
      };
    }

    // 2. Four Pillars Clinical Matrix action (#diet, #exercise, #prevention, #treatment)
    if (suffix in PILLAR_KIND_MAP) {
      const pillarKey = suffix as 'diet' | 'exercise' | 'prevention' | 'treatment';
      const profile = getFourPillarsProfile(prefix);
      const detail = profile[pillarKey];
      const meta = PILLAR_KIND_MAP[pillarKey];
      const hash = page ? `${page.chapter_id}/${page.id}` : prefix;
      return {
        id,
        kind: meta.kind,
        title_zh: `【${meta.label}】${detail.action_item || detail.one_liner}`,
        how_zh: detail.title,
        source_zh: profile.title_zh,
        hash,
      };
    }
  }

  return undefined;
};

export const lessonActionId = (lessonId: string, index: number) => `${lessonId}#${index}`;

/** Every resolvable id — used by tests to keep the namespaces collision-free. */
export const ALL_ACTION_IDS = (): string[] => Array.from(INDEX.keys());

