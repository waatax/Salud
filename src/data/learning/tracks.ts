import { LearningGoal, LearningTrack, Lesson } from '../../types/learning';
import { TRACK_BASICS } from './tracks/basics';
import { TRACK_BODY } from './tracks/body';
import { TRACK_EAT } from './tracks/eat';
import { TRACK_MOVE } from './tracks/move';
import { TRACK_REST } from './tracks/rest';
import { TRACK_CHECKUP } from './tracks/checkup';
import { TRACK_PREVENT } from './tracks/prevent';

/**
 * Ordered curriculum. The order is the recommended path for a complete beginner:
 * learn to read the dashboard first, then the body, then the four daily levers,
 * then the report card, then long-range prevention.
 */
export const LEARNING_TRACKS: LearningTrack[] = [
  TRACK_BASICS,
  TRACK_BODY,
  TRACK_EAT,
  TRACK_MOVE,
  TRACK_REST,
  TRACK_CHECKUP,
  TRACK_PREVENT,
];

export const LEARNING_GOALS: LearningGoal[] = [
  { id: 'G-START', label_zh: '我完全不懂，想從頭開始', hint_zh: '生命徵象、資訊判讀、何時就醫', icon: 'compass', track_id: 'basics', lesson_id: 'L-BAS-01' },
  { id: 'G-REPORT', label_zh: '我剛拿到健檢報告', hint_zh: '紅字嚴不嚴重？目標是多少？', icon: 'report', track_id: 'checkup', lesson_id: 'L-CHK-01' },
  { id: 'G-THREE-HIGHS', label_zh: '我想控制三高', hint_zh: '血壓、血糖、血脂', icon: 'heart', track_id: 'prevent', lesson_id: 'L-PRE-01' },
  { id: 'G-WEIGHT', label_zh: '我想健康減重', hint_zh: '飲食、肌力、藥物的真相', icon: 'food', track_id: 'eat', lesson_id: 'L-EAT-09' },
  { id: 'G-EAT', label_zh: '我想吃得更健康', hint_zh: '從一個餐盤開始', icon: 'food', track_id: 'eat', lesson_id: 'L-EAT-01' },
  { id: 'G-MOVE', label_zh: '我想開始運動', hint_zh: '每週 150 分鐘、每天 7,000 步', icon: 'move', track_id: 'move', lesson_id: 'L-MOVE-01' },
  { id: 'G-SLEEP', label_zh: '我睡不好', hint_zh: '規律、失眠、咖啡因、打呼', icon: 'moon', track_id: 'rest', lesson_id: 'L-REST-01' },
  { id: 'G-STRESS', label_zh: '我壓力很大、心情低落', hint_zh: '呼吸法、何時求助', icon: 'brain', track_id: 'rest', lesson_id: 'L-REST-05' },
  { id: 'G-AGEING', label_zh: '我想照顧爸媽／健康變老', hint_zh: '肌少症、失智、疫苗、防跌', icon: 'shield', track_id: 'prevent', lesson_id: 'L-PRE-06' },
];

export const ALL_LESSONS: (Lesson & { track_id: string })[] = LEARNING_TRACKS.flatMap((t) =>
  t.lessons.map((l) => ({ ...l, track_id: t.id }))
);

export const getTrack = (id: string) => LEARNING_TRACKS.find((t) => t.id === id);

export const findLesson = (lessonId: string) => ALL_LESSONS.find((l) => l.id === lessonId);

export const TOTAL_LESSON_MINUTES = ALL_LESSONS.reduce((sum, l) => sum + l.minutes, 0);
