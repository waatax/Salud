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
import { LessonVisualGraphic } from './LessonVisualGraphic';
import { LessonReferenceTable } from './LessonReferenceTable';

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

      {/* 7 大主線課程橫向架構地圖 */}
      <CurriculumFrameworkMap />

      {/* 學習路徑比較表格 */}
      <TrackComparisonTable />

      <ol className="space-y-6">
        {LEARNING_TRACKS.map((t, i) => (
          <li key={t.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xs">
            <button
              onClick={() => go(`learn/${t.id}`)}
              className={`w-full flex items-start gap-3 p-4 sm:p-5 text-left ${TONE[t.tone].soft} border-b border-slate-200 dark:border-slate-800 hover:brightness-95 transition-all`}
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

/** 7 大主線全景學習架構地圖 */
const CurriculumFrameworkMap: React.FC = () => {
  const steps = [
    { num: '01', title: '素養入門', hint: '看懂體徵、辨識真假資訊', tone: 'bg-emerald-500 text-white' },
    { num: '02', title: '認識身體', hint: '心臟/肝臟/腎臟運作機轉', tone: 'bg-teal-500 text-white' },
    { num: '03', title: '吃得對', hint: '餐盤比例、油脂與減糖', tone: 'bg-sky-500 text-white' },
    { num: '04', title: '動得好', hint: 'Zone 2 心率與核心肌力', tone: 'bg-indigo-500 text-white' },
    { num: '05', title: '睡好減壓', hint: '晝夜節律與自律神經', tone: 'bg-purple-500 text-white' },
    { num: '06', title: '看懂健檢', hint: '報告紅字與數值分區', tone: 'bg-rose-500 text-white' },
    { num: '07', title: '預防老化', hint: '三高預防與阻斷肌少症', tone: 'bg-amber-600 text-white' },
  ];

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs" aria-label="7大健康學習主線架構流程">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            學習架構地圖：從基礎素養到長壽老化的七階遞進
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          循證漸進模型
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {steps.map((s, idx) => (
          <div key={s.num} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5 flex flex-col justify-between">
            <div>
              <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${s.tone}`}>
                階段 {s.num}
              </span>
              <div className="font-bold text-slate-900 dark:text-white text-sm mt-1">{s.title}</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{s.hint}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};

/** 學習路徑橫向對比總表 */
const TrackComparisonTable: React.FC = () => {
  const data = [
    { name: '健康素養入門', lessons: '6 課 · 36 分鐘', difficulty: '入門 ★☆☆', outcome: '掌握生命徵象基線，辨識假醫學新聞，掌握急診分流與用藥安全', audience: '完全零醫學背景新手' },
    { name: '認識你的身體', lessons: '8 課 · 47 分鐘', difficulty: '進階 ★★☆', outcome: '看懂心血管硬化、呼吸換氣、肝腎微血管、關節鏈與發炎機轉', audience: '想搞懂器官原理者' },
    { name: '吃得對', lessons: '9 課 · 55 分鐘', difficulty: '核心 ★★☆', outcome: '掌握 2:1:1 餐盤、NOVA 超加工、蛋白質劑量、油脂與得舒飲食', audience: '想調整飲食與控制體態者' },
    { name: '動得好', lessons: '7 課 · 46 分鐘', difficulty: '核心 ★★☆', outcome: '學會 Zone 2 心率、長壽步數曲線、抗阻動作模式與防傷急救', audience: '想建立運動規律者' },
    { name: '睡好與心理', lessons: '7 課 · 46 分鐘', difficulty: '實用 ★★☆', outcome: '校準 24H 生物鐘、學會史丹佛生理嘆氣、突破失眠 CBT-I 與 OSA 篩檢', audience: '受失眠與壓力困擾者' },
    { name: '看懂健檢報告', lessons: '8 課 · 47 分鐘', difficulty: '實用 ★★☆', outcome: '血壓血糖血脂紅字解讀、eGFR/UACR 腎病熱圖、FIB-4 與公費癌篩', audience: '剛拿到體檢紅字者' },
    { name: '慢性病預防與老化', lessons: '9 課 · 58 分鐘', difficulty: '整合 ★★★', outcome: '阻斷動脈粥狀硬化、DPP 逆轉糖尿病前期、GLP-1、肌少症與疫苗', audience: '照顧全家長輩與想健康長壽者' },
  ];

  return (
    <section aria-labelledby="track-table-h" className="space-y-3">
      <div className="flex items-center gap-2">
        <Table className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h2 id="track-table-h" className="text-base font-bold text-slate-900 dark:text-white">
          七大主線課程規劃與學習目標對照表
        </h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold">學習路徑</th>
              <th scope="col" className="py-3 px-3.5 font-bold">課程時長</th>
              <th scope="col" className="py-3 px-3.5 font-bold">難度位階</th>
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

const LessonList: React.FC<{ track: LearningTrack }> = ({ track }) => {
  const { go } = useNavigation();
  const { isDone } = useLearningProgress();
  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800/80">
      {track.lessons.map((l, i) => (
        <li key={l.id}>
          <button
            onClick={() => go(`learn/${track.id}/${l.id}`)}
            className="w-full flex items-center gap-3 px-4 sm:px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            {isDone(l.id) ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-label="已完成" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" aria-hidden="true" />
            )}
            <span className="text-xs tabular-nums text-slate-400 w-5 shrink-0 font-medium">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <span className="block text-[15px] font-medium text-slate-800 dark:text-slate-200">{l.title_zh}</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400 truncate max-w-xl">{l.big_idea_zh}</span>
            </div>
            <span className="text-xs text-slate-400 shrink-0 tabular-nums">{l.minutes} 分</span>
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

      {/* 路徑學習階段里程碑圖 */}
      <TrackRoadmapSection track={track} />

      {/* 課堂能力矩陣表 */}
      <TrackCompetencyTable track={track} />

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
          <p className="text-slate-600 dark:text-slate-300">熟記個人化理想臨床範圍與黃金劑量標準。</p>
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

      {/* Visual Mechanism & Clinical Diagram */}
      <LessonVisualGraphic track={track} lesson={lesson} />

      {/* Key points */}
      <section aria-labelledby="kp-h" className="space-y-3">
        <h2 id="kp-h" className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
          你需要知道的 {lesson.key_points_zh.length} 件事
        </h2>
        <ol className="space-y-3">
          {lesson.key_points_zh.map((kp, i) => (
            <li key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-xs hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
              <span className={`w-7 h-7 shrink-0 rounded-full inline-flex items-center justify-center text-sm font-bold ${TONE[track.tone].chip} border mt-0.5`}>
                {i + 1}
              </span>
              <p className="flex-1 text-[15.5px] leading-7 text-slate-800 dark:text-slate-200">{kp}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Structured Teaching & Clinical Table */}
      <LessonReferenceTable lessonId={lesson.id} trackTitle={track.title_zh} />

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
