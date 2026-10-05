import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  Flag,
  Plus,
  Check,
  Compass,
  Dumbbell,
  Activity,
  Sparkles,
  Table,
  TrendingUp,
  Clock,
  Flame,
  Utensils,
} from 'lucide-react';
import { STARTER_WEEKS, STARTER_SAFETY_CHECK, ALL_STARTER_TASKS } from '../../data/learning/starterPlan';
import { useActionPlan } from '../../hooks/useActionPlan';
import { useNavigation } from '../../context/NavigationContext';
import { PageHeader, ProgressBar } from './learnUi';
import { TipKindBadge, QuickTips } from './QuickTips';

const WEEK_ICONS = [Compass, Dumbbell, Activity, Sparkles];

/**
 * `#start` — 4 週健康啟動計畫: a first month for complete beginners that layers
 * movement, eating and sleep habits one week at a time.
 */
export const StarterPlanPage: React.FC = () => {
  const { starterDone, toggleStarter, inPlan, add, remove } = useActionPlan();
  const { go } = useNavigation();
  const done = ALL_STARTER_TASKS.filter((t) => starterDone(t.id)).length;

  const scrollToWeek = (weekNum: number) => {
    const el = document.getElementById(`starter-week-${weekNum}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        eyebrow="4 週健康啟動計畫"
        title="從零開始：一個月建立運動、飲食與睡眠的好習慣"
        lead="每週只加一點點。前兩週以「每天做到」為目標，第三週達到國際建議的每週 150 分鐘運動與 2 次肌力訓練，第四週把它變成生活。勾選完成的項目，或把想每天追蹤的做法加入「我的行動計畫」。"
      >
        <div className="max-w-md space-y-1.5">
          <ProgressBar value={(done / ALL_STARTER_TASKS.length) * 100} tone="emerald" label="4 週計畫完成度" />
          <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            已完成 {done} / {ALL_STARTER_TASKS.length} 項
          </p>
        </div>
      </PageHeader>

      {/* 4-Week Visual Milestone Progression Map */}
      <section aria-label="4週階段里程碑全景導覽" className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          階段進程全景藍圖
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STARTER_WEEKS.map((w, idx) => {
            const Icon = WEEK_ICONS[idx] ?? Compass;
            const wDone = w.tasks.filter((t) => starterDone(t.id)).length;
            const isCompleted = wDone === w.tasks.length;
            const isStarted = wDone > 0;
            return (
              <button
                key={w.week}
                onClick={() => scrollToWeek(w.week)}
                className={`text-left p-4 rounded-2xl border transition-all hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                  isCompleted
                    ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/20'
                    : isStarted
                    ? 'border-sky-300 dark:border-sky-800/80 bg-sky-50/40 dark:bg-sky-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 inline-flex items-center justify-center">
                    <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                    {wDone} / {w.tasks.length} 項
                  </span>
                </div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">第 {w.week} 週里程</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">{w.theme_zh}</div>
                <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${(wDone / w.tasks.length) * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 每週負荷劑量與適應曲線圖 */}
      <ProgressionDosageChart />

      {/* 4 週完整課表對照表 */}
      <StarterScheduleTable />

      <section aria-labelledby="safety-h" className="rounded-2xl border border-amber-300 dark:border-amber-800/70 bg-amber-50/70 dark:bg-amber-950/20 p-5 space-y-2">
        <h2 id="safety-h" className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          開始前 1 分鐘安全檢查
        </h2>
        <p className="text-[15px] leading-7 text-amber-950 dark:text-amber-100">以下任何一項符合，請先和醫師討論適合你的運動強度，再開始這個計畫：</p>
        <ul className="list-disc pl-6 space-y-1 text-[15px] leading-7 text-amber-950 dark:text-amber-100">
          {STARTER_SAFETY_CHECK.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <p className="text-sm leading-6 text-amber-900 dark:text-amber-200">
          都沒有的話，可以直接從低到中強度開始。運動中出現胸痛、異常喘、頭暈或心跳不規則，請立即停止並就醫。
        </p>
      </section>

      <ol className="space-y-6">
        {STARTER_WEEKS.map((w, wIdx) => {
          const Icon = WEEK_ICONS[wIdx] ?? Compass;
          const wDone = w.tasks.filter((t) => starterDone(t.id)).length;
          return (
            <li
              key={w.week}
              id={`starter-week-${w.week}`}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden scroll-mt-6 shadow-xs"
            >
              <header className="px-5 py-4 bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>第 {w.week} 週 · 完成 {wDone}/{w.tasks.length}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{w.theme_zh}</h2>
                <p className="text-[15px] leading-7 text-slate-600 dark:text-slate-300">{w.goal_zh}</p>
              </header>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {w.tasks.map((task) => {
                  const isDone = starterDone(task.id);
                  const inside = inPlan(task.id);
                  return (
                    <li key={task.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50/40 dark:hover:bg-slate-800/30 transition-colors">
                      <button
                        onClick={() => toggleStarter(task.id)}
                        aria-pressed={isDone}
                        aria-label={isDone ? `取消完成：${task.text_zh}` : `標記完成：${task.text_zh}`}
                        className="mt-0.5 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-emerald-500" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <TipKindBadge kind={task.kind} />
                          <span className={`font-semibold ${isDone ? 'text-slate-500 line-through decoration-emerald-500/60' : 'text-slate-900 dark:text-white'}`}>
                            {task.text_zh}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{task.detail_zh}</p>
                      </div>
                      <button
                        onClick={() => (inside ? remove(task.id) : add(task.id))}
                        aria-pressed={inside}
                        title={inside ? '已在我的行動計畫（點擊移除）' : '加入我的行動計畫，每天追蹤'}
                        className={`shrink-0 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                          inside
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
                        }`}
                      >
                        {inside ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Plus className="w-3.5 h-3.5" aria-hidden="true" />}
                        <span className="hidden sm:inline">{inside ? '追蹤中' : '每天追蹤'}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <footer className="px-5 py-3 flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                <Flag className="w-4 h-4 shrink-0 mt-1 text-emerald-600" aria-hidden="true" />
                <span>{w.checkpoint_zh}</span>
              </footer>
            </li>
          );
        })}
      </ol>

      <QuickTips sectionKey="start" />

      <div className="flex flex-wrap gap-3">
        <button onClick={() => go('learn/move/L-MOVE-01')} className="rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-emerald-950 font-semibold px-4 py-2.5 shadow-xs">
          深入：動得好課程
        </button>
        <button onClick={() => go('learn/eat/L-EAT-01')} className="rounded-xl border border-slate-300 dark:border-slate-700 font-semibold px-4 py-2.5 text-slate-800 dark:text-slate-200 hover:border-emerald-500">
          深入：吃得對課程
        </button>
      </div>
    </div>
  );
};

/** 每週負荷劑量與適應曲線圖解 */
const ProgressionDosageChart: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs" aria-label="4週健康劑量適應曲線圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            劑量階梯：四週動吃雙核心生理適應曲線
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          超負荷無痛遞增
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block text-sm">第 1 週：最低門檻</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">每天快走 10 分鐘 · 換掉 1 杯含糖飲</div>
          <p className="text-slate-500 dark:text-slate-400">大腦阻力極低，啟動神經動作迴路，完全不累積乳酸疲勞。</p>
        </div>

        <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 block text-sm">第 2 週：喚醒肌力</span>
          <div className="text-sky-700 dark:text-sky-400 font-medium">椅子坐站 10 下 × 2 · 晚餐 2:1:1</div>
          <p className="text-slate-500 dark:text-slate-400">喚醒臀腿大肌群，活化 GLUT4 葡萄糖通道，穩定夜間血糖。</p>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm">第 3 週：國際指引標準</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">每週 150 分鐘中強度 · 2 次完整肌力</div>
          <p className="text-slate-500 dark:text-slate-400">全因死亡率顯著下降 30%，心肺血管內皮一氧化氮合成增加。</p>
        </div>

        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm">第 4 週：生活化固化</span>
          <div className="text-purple-700 dark:text-purple-400 font-medium">嘗試 1 項新運動 · 複查腰圍與血壓</div>
          <p className="text-slate-500 dark:text-slate-400">形成習慣自轉，看見體脂與血壓具體改善，自信心倍增。</p>
        </div>
      </div>
    </figure>
  );
};

/** 4 週逐步訓練課表 */
const StarterScheduleTable: React.FC = () => {
  const schedule = [
    { week: '第 1 週', focus: '每天做到 (零藉口)', aerobic: '每天午餐或晚餐後快走 10 分鐘', strength: '無要求 (以建立散步習慣為主)', diet: '將每天 1 杯手搖糖飲換成無糖茶或開水', check: '記錄 3 天晨起心跳與血壓' },
    { week: '第 2 週', focus: '居家自重肌力初階', aerobic: '快走增加至每天 20 分鐘 (約 3,000 步)', strength: '椅子坐站深蹲 10 下 × 2 組 (週二/四)', diet: '晚餐實行「菜 2 : 肉 1 : 飯 1」餐盤順序', check: '連續 7 天記錄 722 血壓' },
    { week: '第 3 週', focus: '達標 WHO 150 分鐘', aerobic: '每週累積 150 分鐘 Zone 2 快走或慢跑', strength: '深蹲 + 牆壁伏地挺身各 12 下 × 3 組 (每週 2 回)', diet: '早餐加入水煮蛋或無糖豆漿 (優質蛋白質)', check: '測量腰圍與體重落點' },
    { week: '第 4 週', focus: '自我驗收與長期維持', aerobic: '嘗試一項新運動 (羽球、騎車、游泳或匹克球)', strength: '加入彈力帶划船訓練上肢背肌', diet: '每週至少 3 天維持哈佛健康餐盤', check: '對比第 1 週腰圍與精神狀態' },
  ];

  return (
    <section aria-labelledby="schedule-table-h" className="space-y-3">
      <div className="flex items-center gap-2">
        <Table className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h2 id="schedule-table-h" className="text-base font-bold text-slate-900 dark:text-white">
          四週漸進式動吃習慣推進課表
        </h2>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[80px]">週次</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[130px]">每週目標</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[170px]">🏃 有氧運動處方</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[170px]">🏋️ 肌力訓練任務</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[170px]">🥗 飲食與水份習慣</th>
              <th scope="col" className="py-3 px-3.5 font-bold min-w-[140px]">🚩 週末驗收檢核</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {schedule.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 font-bold text-emerald-800 dark:text-emerald-300 align-top">{r.week}</td>
                <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white align-top">{r.focus}</td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 align-top leading-relaxed">{r.aerobic}</td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 align-top leading-relaxed">{r.strength}</td>
                <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 align-top leading-relaxed">{r.diet}</td>
                <td className="py-3 px-3.5 text-slate-500 dark:text-slate-400 align-top text-xs leading-relaxed">{r.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
