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
  Table,
  Layers,
  Sparkles,
  Milestone,
  Compass,
  GraduationCap,
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLearningProgress, lessonPointId } from '../../hooks/useLearningProgress';
import { useActionPlan } from '../../hooks/useActionPlan';
import { lessonActionId } from '../../data/learning/tipIndex';
import { LEARNING_TRACKS, getTrack, findLesson, TOTAL_LESSON_MINUTES, ALL_LESSONS } from '../../data/learning/tracks';
import { calculateLearnerGrowth, buildFeynmanShareText } from '../../data/learning/masteryAcademy';
import { getUpdate } from '../../data/learning/evidenceUpdates';
import { LearningTrack, Lesson } from '../../types/learning';
import { TONE, TrackIcon, ProgressBar, PageHeader, formatYM } from './learnUi';
import { QuickTips } from './QuickTips';
import { LessonVisualGraphic } from './LessonVisualGraphic';
import { LessonReferenceTable } from './LessonReferenceTable';
import { PracticeLabView } from './PracticeLabView';
import { FourPillarsClinicalMatrix } from '../knowledge/FourPillarsClinicalMatrix';

const TRACK_PILLAR_TOPIC: Record<string, string> = {
  basics: 'cardiometabolic',
  body: 'systems',
  eat: 'O',
  move: 'exercise',
  rest: 'sleep',
  checkup: 'ultrahealth',
  prevent: 'longevity',
  spine: 'musculoskeletal',
};

/**
 * `#learn` → catalogue,
 * `#learn/practice` → interactive scenario & flashcard lab,
 * `#learn/academy` → 8 medical disciplines & learner growth ladder,
 * `#learn/<track>` → track overview,
 * `#learn/<track>/<lesson>` → lesson.
 */
export const TrackView: React.FC = () => {
  const { learnTrackId, learnLessonId, go } = useNavigation();

  if (learnTrackId === 'practice' || learnTrackId === 'flashcards') {
    return <PracticeLabView initialMode={learnTrackId === 'flashcards' ? 'flashcards' : 'scenarios'} onBackToCatalogue={() => go('learn')} />;
  }
  if (learnTrackId === 'academy') {
    return <PracticeLabView initialMode="academy" onBackToCatalogue={() => go('learn')} />;
  }

  const track = learnTrackId ? getTrack(learnTrackId) : undefined;
  const lesson = track && learnLessonId ? track.lessons.find((l) => l.id === learnLessonId) : undefined;

  if (track && lesson) return <LessonReader key={lesson.id} track={track} lesson={lesson} />;
  if (track) return <TrackOverview track={track} />;
  return <Catalogue />;
};

const Catalogue: React.FC = () => {
  const { go } = useNavigation();
  const { progress, reset, isDone } = useLearningProgress();
  const { plan } = useActionPlan();
  const done = progress.completed.filter((id) => ALL_LESSONS.some((l) => l.id === id)).length;
  const growth = useMemo(() => calculateLearnerGrowth(progress, plan.items.length), [progress, plan.items.length]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'done'>('all');
  const [query, setQuery] = useState<string>('');
  const [expandedTracks, setExpandedTracks] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const activeTrackId = progress.last?.trackId || LEARNING_TRACKS[0].id;
    LEARNING_TRACKS.forEach((t, idx) => {
      initial[t.id] = t.id === activeTrackId || idx < 2;
    });
    return initial;
  });

  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = lastLesson ? getTrack(lastLesson.track_id) : undefined;
  const trimmedQuery = query.trim().toLowerCase();

  const toggleAllTracks = (open: boolean) => {
    const nextState: Record<string, boolean> = {};
    LEARNING_TRACKS.forEach((t) => {
      nextState[t.id] = open;
    });
    setExpandedTracks(nextState);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        eyebrow="學習路徑 · 從小白到醫學知識者"
        title="課程總表與快樂成長學院"
        lead={`${LEARNING_TRACKS.length} 條路徑、${ALL_LESSONS.length} 堂課（共 ${growth.totalPointsCount} 個知識點），全部讀完約 ${Math.round((TOTAL_LESSON_MINUTES / 60) * 10) / 10} 小時。除了讀白話小課，還能進入「生活情境實戰演練」「知識閃卡」與「8 大醫學學科博覽館」邊玩邊學！`}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 px-3 py-1 text-xs font-bold text-emerald-900 dark:text-emerald-300">
            <span>{growth.currentRank.badge_emoji}</span>
            <span>Lv.{growth.currentRank.level} {growth.currentRank.title_zh}（{growth.xp} XP）</span>
          </span>
          <span>
            已完成 <strong className="text-slate-900 dark:text-white tabular-nums">{done}</strong> / {ALL_LESSONS.length} 課
          </span>
          <span>
            已掌握 <strong className="text-emerald-700 dark:text-emerald-400 tabular-nums">{growth.pointsMasteredCount}</strong> / {growth.totalPointsCount} 個知識點
          </span>
          {(done > 0 || growth.xp > 0) && (
            <button
              type="button"
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

      {/* Joyful Interactive Practice & Medical Disciplines Entry Card */}
      <section
        aria-label="從小白到醫學知識者互動練習與學科博覽館"
        className="rounded-3xl border border-emerald-200/90 dark:border-emerald-900/70 bg-gradient-to-br from-emerald-50/80 via-white to-sky-50/50 dark:from-emerald-950/35 dark:via-slate-900 dark:to-slate-900 p-5 sm:p-6 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white dark:bg-emerald-400 dark:text-slate-950">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                互動練習 × 學科探索
              </span>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                已闖關情境 {growth.scenariosDoneCount}/{growth.totalScenariosCount} · 迷思快打 {growth.mythsDoneCount}/{growth.totalMythsCount}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              想邊玩邊學、把所有知識點真正用出來嗎？
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              透過 12 個真實家庭與生活情境演練、全站 65 課翻翻樂閃卡、真假迷思快打，以及「為什麼這 8 大醫學學科超迷人」博覽館，快樂升級為實證醫學知識者！
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => go('learn/practice')}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors"
            >
              <Stethoscope className="w-4 h-4" aria-hidden="true" />
              <span>進入情境實戰 & 知識閃卡</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go('learn/academy')}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-300 hover:bg-emerald-50 transition-colors"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>探索 8 大迷人醫學學科</span>
            </button>
          </div>
        </div>
      </section>

      {lastLesson && lastTrack && (
        <section
          aria-label="繼續上次學習"
          className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 dark:border-emerald-900/60 dark:bg-emerald-950/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <TrackIcon icon={lastTrack.icon} tone={lastTrack.tone} />
            <div className="min-w-0">
              <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                上次讀到 · {lastTrack.title_zh}
              </p>
              <p className="font-bold text-slate-900 dark:text-white truncate">
                {lastLesson.title_zh}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => go(`learn/${lastTrack.id}/${lastLesson.id}`)}
            className="btn-tactile inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-800 shrink-0"
          >
            <span>繼續閱讀</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </section>
      )}

      {/* Search & Filter Controls */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="篩選課程關鍵字，例如：血壓、蛋白質、Zone 2、失眠、B 肝…"
              aria-label="篩選課程關鍵字"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/60 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="課程完成狀態篩選">
            {(
              [
                ['all', `全部 (${ALL_LESSONS.length})`],
                ['todo', `尚未讀 (${ALL_LESSONS.length - done})`],
                ['done', `已完成 (${done})`],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={statusFilter === id}
                onClick={() => setStatusFilter(id)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  statusFilter === id
                    ? 'bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <span>可點擊任一路徑展開課表，或直接點標題進入路徑專頁</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleAllTracks(true)}
              className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              展開全部路徑
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => toggleAllTracks(false)}
              className="font-semibold text-slate-600 hover:underline dark:text-slate-400"
            >
              收合全部
            </button>
          </div>
        </div>
      </div>

      <details className="discovery-card p-5 space-y-5">
        <summary className="cursor-pointer min-h-11 font-semibold text-slate-800 dark:text-slate-200">想先比較路徑？查看課程地圖與學習目標</summary>
        <CurriculumFrameworkMap />
        <TrackComparisonTable />
      </details>

      <ol className="space-y-4">
        {LEARNING_TRACKS.map((t, i) => {
          const filteredLessons = t.lessons.filter((l) => {
            if (statusFilter === 'todo' && isDone(l.id)) return false;
            if (statusFilter === 'done' && !isDone(l.id)) return false;
            if (!trimmedQuery) return true;
            return (
              l.title_zh.toLowerCase().includes(trimmedQuery) ||
              l.big_idea_zh.toLowerCase().includes(trimmedQuery) ||
              l.key_points_zh.some((kp) => kp.toLowerCase().includes(trimmedQuery))
            );
          });

          if ((trimmedQuery || statusFilter !== 'all') && filteredLessons.length === 0) {
            return null;
          }

          const trackDoneCount = t.lessons.filter((l) => isDone(l.id)).length;
          const isTrackOpen = Boolean(trimmedQuery) || statusFilter !== 'all' || expandedTracks[t.id];

          return (
            <li key={t.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xs">
              <div className={`w-full flex items-start justify-between gap-3 p-4 sm:p-5 ${TONE[t.tone].soft} ${isTrackOpen ? 'border-b border-slate-200 dark:border-slate-800' : ''}`}>
                <button
                  type="button"
                  onClick={() => go(`learn/${t.id}`)}
                  className="flex items-start gap-3 text-left flex-1 min-w-0 hover:opacity-90 transition-opacity"
                >
                  <TrackIcon icon={t.icon} tone={t.tone} size="lg" />
                  <span className="flex-1 min-w-0">
                    <span className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>路徑 {i + 1} · 適合：{t.audience_zh}</span>
                      <span className="rounded-full bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                        已完成 {trackDoneCount}/{t.lessons.length} 課
                      </span>
                    </span>
                    <span className="block text-lg font-bold text-slate-900 dark:text-white mt-0.5">{t.title_zh}</span>
                    <span className="block text-sm text-slate-600 dark:text-slate-300">{t.subtitle_zh}</span>
                  </span>
                </button>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    aria-expanded={isTrackOpen}
                    onClick={() =>
                      setExpandedTracks((prev) => ({
                        ...prev,
                        [t.id]: !isTrackOpen,
                      }))
                    }
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-300/80 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white"
                  >
                    <span>{isTrackOpen ? '收合課表' : `展開 (${filteredLessons.length} 課)`}</span>
                    {isTrackOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              {isTrackOpen && <LessonList track={t} lessons={filteredLessons} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

/** 8 大主線全景學習架構地圖 */
const CurriculumFrameworkMap: React.FC = () => {
  const steps = LEARNING_TRACKS.map((track, index) => ({
    num: String(index + 1).padStart(2, '0'), title: track.title_zh,
    hint: track.subtitle_zh, tone: TONE[track.tone].chip,
  }));

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs" aria-label="8大健康學習主線架構流程">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            學習架構地圖：從基礎開始，也可以依興趣選讀
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          照自己的步調
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {steps.map((s, idx) => (
          <div key={s.num} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5 flex flex-col justify-between">
            <div>
              <span className={`inline-block px-1.5 py-0.5 rounded text-[0.75rem] font-bold ${s.tone}`}>
                階段 {s.num}
              </span>
              <div className="font-bold text-slate-900 dark:text-white text-sm mt-1">{s.title}</div>
            </div>
            <p className="text-[0.75rem] text-slate-500 dark:text-slate-400 leading-snug">{s.hint}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};

/** 學習路徑橫向對比總表 */
const TrackComparisonTable: React.FC = () => {
  const data = LEARNING_TRACKS.map(track => ({
    name: track.title_zh,
    lessons: `${track.lessons.length} 課 · ${track.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)} 分鐘`,
    difficulty: track.id === 'basics' ? '從這裡入門' : '可依興趣選讀',
    outcome: track.subtitle_zh, audience: track.audience_zh,
  }));

  return (
    <section aria-labelledby="track-table-h" className="space-y-3">
      <div className="flex items-center gap-2">
        <Table className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h2 id="track-table-h" className="text-base font-bold text-slate-900 dark:text-white">
          {LEARNING_TRACKS.length} 條學習路徑與目標對照表
        </h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold">學習路徑</th>
              <th scope="col" className="py-3 px-3.5 font-bold">課程時長</th>
              <th scope="col" className="py-3 px-3.5 font-bold">閱讀方式</th>
              <th scope="col" className="py-3 px-3.5 font-bold">核心掌握能力</th>
              <th scope="col" className="py-3 px-3.5 font-bold">最推薦族群</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">{row.name}</td>
                <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 tabular-nums">{row.lessons}</td>
                <td className="py-3 px-3.5 font-medium text-emerald-700 dark:text-emerald-400">{row.difficulty}</td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">{row.outcome}</td>
                <td className="py-3 px-3.5 text-slate-500 dark:text-slate-400">{row.audience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const LessonList: React.FC<{ track: LearningTrack; lessons?: Lesson[] }> = ({ track, lessons }) => {
  const { go } = useNavigation();
  const { isDone } = useLearningProgress();
  const displayLessons = lessons ?? track.lessons;
  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
      {displayLessons.map((l) => {
        const originalIdx = track.lessons.findIndex((item) => item.id === l.id);
        return (
          <li key={l.id}>
            <button
              type="button"
              onClick={() => go(`learn/${track.id}/${l.id}`)}
              className="w-full flex items-center gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              {isDone(l.id) ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-label="已完成" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" aria-hidden="true" />
              )}
              <span className="text-xs tabular-nums text-slate-400 w-5 shrink-0 font-medium">{originalIdx + 1}</span>
              <div className="flex-1 min-w-0">
                <span className="block text-[15px] font-medium text-slate-800 dark:text-slate-200">{l.title_zh}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 truncate max-w-xl">{l.big_idea_zh}</span>
              </div>
              <span className="text-xs text-slate-400 shrink-0 tabular-nums">{l.minutes} 分</span>
            </button>
          </li>
        );
      })}
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
    <div className="space-y-8 animate-fade-in">
      <button onClick={() => go('learn')} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        課程總表
      </button>

      <div className={`rounded-3xl border border-slate-200 dark:border-slate-800 ${TONE[track.tone].soft} p-5 sm:p-8 space-y-4 shadow-xs`}>
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
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 font-semibold px-5 py-2.5 transition-colors shadow-xs"
        >
          {done === 0 ? '開始第一課' : done === track.lessons.length ? '從頭複習' : '繼續下一課'}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <details className="discovery-card p-5 space-y-5">
        <summary className="cursor-pointer min-h-11 font-semibold text-slate-800 dark:text-slate-200">查看這條路徑的學習目標與實踐對照</summary>
        <TrackRoadmapSection track={track} />
        <TrackCompetencyTable track={track} />
      </details>

      {/* 課程列表 */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" aria-hidden="true" />
          全章節小課目錄
        </h2>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xs">
          <LessonList track={track} />
        </div>
      </div>

      <QuickTips key={track.id} sectionKey={`learn:${track.id}`} />
    </div>
  );
};

/** 路徑階段里程碑圖解 */
const TrackRoadmapSection: React.FC<{ track: LearningTrack }> = ({ track }) => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-3.5 shadow-xs" aria-label="本路徑學習進程里程碑">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Milestone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            本路徑學習進程與實踐里程碑
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          4 步進階
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block text-sm">第 1 階段：建立認知</span>
          <p className="text-slate-600 dark:text-slate-400">掌握關鍵人體生理機轉與常見偽科學迷思。</p>
        </div>
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm">第 2 階段：核心數值</span>
          <p className="text-slate-600 dark:text-slate-300">了解參考數值的適用對象，以及個人目標為何可能不同。</p>
        </div>
        <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 block text-sm">第 3 階段：生活微步</span>
          <p className="text-slate-600 dark:text-slate-300">執行「今天就能做」日常低門檻行動並加入計畫。</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">第 4 階段：紅線安全</span>
          <p className="text-slate-600 dark:text-slate-300">識別急性警訊與就醫時機，確保自我照護安全邊界。</p>
        </div>
      </div>
    </figure>
  );
};

/** 本路徑核心能力矩陣表 */
const TrackCompetencyTable: React.FC<{ track: LearningTrack }> = ({ track }) => {
  return (
    <section aria-labelledby="comp-table-h" className="space-y-3">
      <div className="flex items-center gap-2">
        <Table className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h2 id="comp-table-h" className="text-base font-bold text-slate-900 dark:text-white">
          各堂課知識點與實踐行動對照表
        </h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold w-1/4">課堂主題</th>
              <th scope="col" className="py-3 px-3.5 font-bold w-1/3">核心機轉重點</th>
              <th scope="col" className="py-3 px-3.5 font-bold">今日生活實踐</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {track.lessons.map((l, idx) => (
              <tr key={l.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 align-top">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {idx + 1}. {l.title_zh}
                  </span>
                  <span className="text-xs text-slate-400 tabular-nums">{l.minutes} 分鐘</span>
                </td>
                <td className="py-3 px-3.5 align-top text-slate-700 dark:text-slate-300 leading-relaxed">
                  {l.big_idea_zh}
                </td>
                <td className="py-3 px-3.5 align-top text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                  {l.do_today_zh[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const LessonReader: React.FC<{ track: LearningTrack; lesson: Lesson }> = ({ track, lesson }) => {
  const { go } = useNavigation();
  const {
    visit,
    markComplete,
    recordQuiz,
    isDone,
    progress,
    toggleMasteredPoint,
    markLessonPoints,
    isPointMastered,
  } = useLearningProgress();
  const { inPlan, add, remove } = useActionPlan();
  const idx = track.lessons.findIndex((l) => l.id === lesson.id);
  const prev = track.lessons[idx - 1];
  const next = track.lessons[idx + 1];
  const nextTrack = LEARNING_TRACKS[LEARNING_TRACKS.findIndex((t) => t.id === track.id) + 1];
  const done = isDone(lesson.id);
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [copiedFeynman, setCopiedFeynman] = useState(false);

  const lessonPointIds = useMemo(
    () => lesson.key_points_zh.map((_, i) => lessonPointId(lesson.id, i)),
    [lesson.id, lesson.key_points_zh]
  );
  const masteredInLessonCount = lessonPointIds.filter((id) => isPointMastered(id)).length;
  const allPointsMastered = masteredInLessonCount === lesson.key_points_zh.length;
  const feynmanCard = useMemo(() => buildFeynmanShareText(lesson.id), [lesson.id]);

  const handleCopyNotes = () => {
    const text = [
      `【Salud 健康學習筆記】${lesson.title_zh}`,
      `一句話重點：${lesson.big_idea_zh}`,
      '',
      '核心重點：',
      ...lesson.key_points_zh.map((kp, i) => `${i + 1}. ${kp}`),
      '',
      '今天就能做：',
      ...lesson.do_today_zh.map((d) => `✓ ${d}`),
    ].join('\n');
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedNotes(true);
      setTimeout(() => setCopiedNotes(false), 2500);
    });
  };

  const handleCopyFeynman = () => {
    if (!feynmanCard) return;
    navigator.clipboard?.writeText(feynmanCard.full_copy_text).then(() => {
      setCopiedFeynman(true);
      setTimeout(() => setCopiedFeynman(false), 2500);
    });
  };

  useEffect(() => {
    visit(track.id, lesson.id);
  }, [track.id, lesson.id, visit]);

  const updates = useMemo(
    () => (lesson.update_ids ?? []).map(getUpdate).filter((u): u is NonNullable<typeof u> => Boolean(u)),
    [lesson.update_ids]
  );

  return (
    <article className="lesson-reader max-w-3xl mx-auto space-y-8 animate-fade-in" aria-labelledby="lesson-title">
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

      <nav aria-label="本課閱讀導覽" className="flex flex-wrap gap-2 border-y border-slate-200 py-3 dark:border-slate-800">
        {[['lesson-summary', '一句話重點'], ['lesson-visual', '圖解與知識'], ['do-h', '今天就能做'], ['deep-h', '深入閱讀']].map(([id, label]) => (
          <button key={id} type="button" onClick={() => {
            const target = document.getElementById(id);
            target?.scrollIntoView({ block: 'start' });
            target?.focus({ preventScroll: true });
          }} className="min-h-11 rounded-full border border-slate-200 px-4 text-sm text-slate-700 hover:border-emerald-600 dark:border-slate-700 dark:text-slate-300">{label}</button>
        ))}
      </nav>
      {/* Big idea */}
      <div id="lesson-summary" tabIndex={-1} className={`scroll-mt-24 rounded-2xl border border-slate-200 dark:border-slate-800 ${TONE[track.tone].soft} p-5`}>
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

      {/* Visual Mechanism & Clinical Diagram */}
      <div id="lesson-visual" tabIndex={-1} className="scroll-mt-24"><LessonVisualGraphic track={track} lesson={lesson} /></div>

      {/* Key points (Interactive Mastery Checklist) */}
      <section aria-labelledby="kp-h" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="kp-h" className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>你需要知道的 {lesson.key_points_zh.length} 件事</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
              已掌握 {masteredInLessonCount} / {lesson.key_points_zh.length} 個知識點
            </span>
            <button
              type="button"
              onClick={() => markLessonPoints(lessonPointIds, !allPointsMastered)}
              className="rounded-lg border border-emerald-300 dark:border-emerald-800 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            >
              {allPointsMastered ? '取消全部掌握' : '一鍵全部標記掌握'}
            </button>
          </div>
        </div>
        <ol className="space-y-3">
          {lesson.key_points_zh.map((kp, i) => {
            const pointId = lessonPointId(lesson.id, i);
            const mastered = isPointMastered(pointId);
            return (
              <li
                key={i}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors shadow-xs ${
                  mastered
                    ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <span className={`w-7 h-7 shrink-0 rounded-full inline-flex items-center justify-center text-sm font-bold ${TONE[track.tone].chip} border mt-0.5`}>
                  {i + 1}
                </span>
                <p className="flex-1 text-[15.5px] leading-7 text-slate-800 dark:text-slate-200">{kp}</p>
                <button
                  type="button"
                  aria-pressed={mastered}
                  onClick={() => toggleMasteredPoint(pointId)}
                  title={mastered ? '已掌握此知識點（點擊取消）' : '讀懂了！標記掌握此知識點 (+3 XP)'}
                  className={`shrink-0 mt-0.5 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                    mastered
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950'
                      : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300'
                  }`}
                >
                  {mastered ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span>{mastered ? '已掌握' : '懂了'}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Structured Teaching & Clinical Table */}
      <LessonReferenceTable lessonId={lesson.id} trackTitle={track.title_zh} />

      {/* Do today */}
      <section aria-labelledby="do-h" className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/20 p-5 space-y-2">
        <h2 id="do-h" tabIndex={-1} className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
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

      {/* Feynman Technique: Explain to Family & Friends in Plain Language */}
      {feynmanCard && (
        <section
          aria-labelledby="feynman-h"
          className="rounded-2xl border border-sky-200/90 dark:border-sky-900/60 bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/40 dark:from-sky-950/30 dark:via-slate-900 dark:to-slate-900 p-5 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="feynman-h" className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
              <GraduationCap className="w-5 h-5 text-sky-700 dark:text-sky-400" aria-hidden="true" />
              <span>費曼學習法練習：用一句白話講給家人朋友聽</span>
            </h2>
            <button
              type="button"
              onClick={handleCopyFeynman}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 dark:bg-sky-400 dark:text-slate-950 px-3 py-1.5 text-xs font-bold text-white transition-colors"
            >
              {copiedFeynman ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>已複製親友分享卡！</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>一鍵複製分享給家人</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            當你能不靠艱深術語、把剛學到的健康觀念說給身邊的人聽懂，你就已經從「健康小白」成長為真正的「醫學知識者」！
          </p>
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-3.5 space-y-1.5 text-xs sm:text-sm leading-6 text-slate-700 dark:text-slate-200">
            <p>💬 <strong>怎麼開口：</strong>{feynmanCard.opening_zh}</p>
            <p>💡 <strong>打個比方：</strong>{feynmanCard.metaphor_zh}</p>
            <p>🏃 <strong>一起試試：</strong>{feynmanCard.action_invite_zh}</p>
          </div>
        </section>
      )}

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

      {/* Four Pillars Clinical Matrix (飲食 · 運動 · 預防 · 治療) */}
      <details className="discovery-card p-5 space-y-4"><summary className="cursor-pointer min-h-11 font-semibold text-slate-800 dark:text-slate-200">延伸整理：飲食、運動、預防與治療如何連結？</summary><FourPillarsClinicalMatrix
        pageIdOrTopic={TRACK_PILLAR_TOPIC[track.id] || 'cardiometabolic'}
      /></details>

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

      {lesson.sources && lesson.sources.length > 0 && <section aria-labelledby="source-h" className="space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
        <h2 id="source-h" className="font-bold text-slate-800 dark:text-slate-200">本課參考來源與適用限制</h2>
        <ul className="space-y-3">{lesson.sources.map(source => <li key={source.url} className="text-sm leading-7">
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-800 underline underline-offset-4 dark:text-emerald-300">{source.title}<ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span className="sr-only">（另開視窗）</span></a>
          {source.note && <p className="text-slate-600 dark:text-slate-400">{source.note}</p>}
        </li>)}</ul>
      </section>}
      {/* Go deeper */}
      <section aria-labelledby="deep-h" className="space-y-2">
        <h2 id="deep-h" tabIndex={-1} className="text-sm font-bold text-slate-700 dark:text-slate-300">想看完整機制與圖解</h2>
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
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const nextDone = !done;
              markComplete(lesson.id, nextDone);
              if (nextDone) markLessonPoints(lessonPointIds, true);
            }}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-colors ${
              done
                ? 'border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30'
                : 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950'
            }`}
            aria-pressed={done}
          >
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            {done ? '已標記完成（點擊取消）' : '我讀完了，標記完成並掌握本課知識點'}
          </button>

          <button
            type="button"
            onClick={handleCopyNotes}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            {copiedNotes ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>已複製本課重點筆記</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>複製本課重點筆記</span>
              </>
            )}
          </button>
        </div>
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
