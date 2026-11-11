import { PILLAR_NAV, EXERCISE_SUB_NAV } from './navigation';
import { DISCIPLINE_HASH } from './routes';
import { findLesson, getTrack } from '../data/learning/tracks';
import type { HealthPillar, SportsDiscipline } from '../types';

/**
 * pageTitle.ts — the browser-tab title for the page on screen (v6.4).
 *
 * Until v6.4 every page shared one title, so browser history, bookmarks, open tabs and shared
 * links all read "Salud｜給每個人的健康學習平台". A pure function keeps the rule testable.
 */

export const SITE_TITLE = 'Salud｜給每個人的健康學習平台';
const SUFFIX = '｜Salud 健康學習';

const META_TITLES: Record<string, string> = {
  about: '關於 Salud 與實證原則',
  evidence: '實證來源與分級',
  explore: '知識點資料庫',
};

export interface PageTitleInput {
  activePillar: HealthPillar;
  metaView?: string | null;
  isSynergyView?: boolean;
  isEvidenceView?: boolean;
  learnTrackId?: string;
  learnLessonId?: string;
  exerciseSubTab?: SportsDiscipline;
  /** Diet chapter reading: titles of the chapter and, when a page is open, the page. */
  chapterTitle?: string;
  chapterPageTitle?: string;
}

export function pageTitle(input: PageTitleInput): string {
  const name = pageName(input);
  return name ? `${name}${SUFFIX}` : SITE_TITLE;
}

function pageName(i: PageTitleInput): string | null {
  if (i.metaView) return META_TITLES[i.metaView] ?? null;
  if (i.isSynergyView) return '跨主題交互作用';
  if (i.isEvidenceView) return META_TITLES.evidence;

  switch (i.activePillar) {
    case 'home':
      return null;
    case 'learn': {
      if (i.learnTrackId === 'practice' || i.learnTrackId === 'flashcards') {
        return '情境實戰與知識閃卡・學習路徑';
      }
      if (i.learnTrackId === 'academy') {
        return '8 大醫學學科博覽館・學習路徑';
      }
      const lesson = i.learnLessonId ? findLesson(i.learnLessonId) : undefined;
      const track = i.learnTrackId ? getTrack(i.learnTrackId) : undefined;
      if (lesson) return track ? `${lesson.title_zh}・${track.title_zh}` : lesson.title_zh;
      return track ? `${track.title_zh}・學習路徑` : '學習路徑';
    }
    case 'supplements':
      return '保健食品的證據';
    case 'diet':
      if (i.chapterPageTitle) return i.chapterTitle ? `${i.chapterPageTitle}・${i.chapterTitle}` : i.chapterPageTitle;
      return i.chapterTitle ?? '飲食營養';
    case 'exercise': {
      const hash = i.exerciseSubTab ? DISCIPLINE_HASH[i.exerciseSubTab] : undefined;
      const sub = hash && hash !== 'exercise' ? EXERCISE_SUB_NAV.find((s) => s.hash === hash) : undefined;
      return sub ? `${sub.label_zh}・運動` : '運動';
    }
    default:
      return PILLAR_NAV.find((p) => p.id === i.activePillar)?.label_zh ?? null;
  }
}
