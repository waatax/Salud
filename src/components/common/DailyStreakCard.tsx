import React from 'react';
import { Flame, CheckCircle2, Sparkles, ArrowRight, Award, Zap } from 'lucide-react';
import { useHealthStreak } from '../../hooks/useHealthStreak';
import { useNavigation } from '../../context/NavigationContext';

export const DailyStreakCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { streak, totalCheckIns, checkedInToday, todayHabit, checkIn } = useHealthStreak();
  const { go } = useNavigation();

  // Milestone badge
  const currentBadge =
    streak >= 30
      ? { label: '卓越健康大師', icon: Award, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' }
      : streak >= 14
      ? { label: '原子習慣達成', icon: Award, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800' }
      : streak >= 7
      ? { label: '週間健康自律', icon: Zap, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800' }
      : streak >= 3
      ? { label: '自律起步', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' }
      : null;

  return (
    <section
      aria-label="每日健康打卡與微習慣"
      className={`rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 dark:from-slate-900 dark:via-salud-dark-card dark:to-emerald-950/20 p-5 sm:p-6 shadow-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left: Streak & Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-xs font-mono font-bold">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              <span>連續打卡 {streak} 天</span>
            </span>
            {currentBadge && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${currentBadge.color}`}>
                <currentBadge.icon className="w-3.5 h-3.5" />
                <span>{currentBadge.label}</span>
              </span>
            )}
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              累計已打卡 {totalCheckIns} 次
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
            {checkedInToday ? '今天已完成健康打卡！' : '今天打卡了嗎？保持每天 1 分鐘健康自律'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            健康不是偶爾的極端節食或苦練，而是每天持續微小的正確選擇。點擊打卡，紀錄今天的健康承諾。
          </p>
        </div>

        {/* Right: Check-in action button */}
        <div className="shrink-0 flex items-center">
          {checkedInToday ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 text-sm shadow-xs select-none">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>今日已打卡 ✓</span>
            </div>
          ) : (
            <button
              onClick={() => checkIn()}
              className="btn-tactile group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all ring-2 ring-emerald-500/30"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
              <span>今日打卡 (+1 天)</span>
            </button>
          )}
        </div>
      </div>

      {/* Today's Micro-Habit Recommendation */}
      <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-bold shrink-0 mt-0.5 sm:mt-0">
            今日微習慣
          </span>
          <span className="font-bold text-slate-900 dark:text-white">
            {todayHabit.title}：
          </span>
          <span className="text-slate-600 dark:text-slate-300 line-clamp-1">
            {todayHabit.desc}
          </span>
        </div>

        <button
          onClick={() => go(todayHabit.targetHash)}
          className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0 group self-end sm:self-auto"
        >
          <span>查看醫學機制</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
