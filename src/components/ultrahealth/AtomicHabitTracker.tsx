import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ATOMIC_HABITS } from '../../data/ultraHealthData';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Flame,
  Award,
  Zap,
  Target,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

const STORAGE_KEY = 'salud_ultrahealth_habits';

export const AtomicHabitTracker: React.FC = () => {
  const [completedHabits, setCompletedHabits] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedHabits));
    } catch (e) {
      console.warn('Failed to save habits to localStorage', e);
    }
  }, [completedHabits]);

  const toggleHabit = (id: string, e: React.MouseEvent) => {
    const isCompleted = completedHabits.includes(id);
    let newCompleted: string[];

    if (isCompleted) {
      newCompleted = completedHabits.filter((hId) => hId !== id);
    } else {
      newCompleted = [...completedHabits, id];
      // Fire confetti burst!
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y }
      });
    }

    setCompletedHabits(newCompleted);
  };

  const handleReset = () => {
    if (window.confirm('確定要重設今日微習慣完成狀態嗎？')) {
      setCompletedHabits([]);
    }
  };

  const filteredHabits = ATOMIC_HABITS.filter((h) => {
    if (activeFilter === 'ALL') return true;
    return h.pillar === activeFilter.toLowerCase();
  });

  const progressPercent = Math.round((completedHabits.length / ATOMIC_HABITS.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner with Streak and Progress */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-salud-dark-surface to-teal-500/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>行為科學 × BJ Fogg 微習慣模型 (B=MAP)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
              14 天健康生活原子微習慣養成器
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              跨越「知易行難」的終極解法：不靠飄渺的意志力，只靠「2 分鐘以內微行動」與「生活觸發錨點」。
              每一次微小的完成，都在重塑大腦神經突觸對健康身份認同的投票！
            </p>
          </div>

          {/* Progress Indicator Card */}
          <div className="flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[220px]">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-slate-200 dark:text-slate-800 fill-none"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray="163.36"
                  strokeDashoffset={163.36 - (163.36 * progressPercent) / 100}
                  className="text-emerald-500 fill-none transition-all duration-500"
                />
              </svg>
              <span className="absolute font-mono font-extrabold text-sm text-slate-900 dark:text-white">
                {progressPercent}%
              </span>
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400">今日達成度</div>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                {completedHabits.length} / {ATOMIC_HABITS.length} 項
              </div>
              {progressPercent === 100 && (
                <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-0.5">
                  <Award className="w-3 h-3" /> 今日全滿貫！
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Pillar Filters */}
          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {['ALL', 'HYDRATION', 'DIET', 'EXERCISE', 'SLEEP'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  activeFilter === f
                    ? 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-sm'
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-400'
                }`}
              >
                {f === 'ALL' && '全部微習慣'}
                {f === 'HYDRATION' && '💧 水合啟航'}
                {f === 'DIET' && '🥗 穩糖飲食'}
                {f === 'EXERCISE' && '⚡ 動力體能'}
                {f === 'SLEEP' && '🌙 晝夜修復'}
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-mono"
            title="重設今日打卡"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重設打卡</span>
          </button>
        </div>
      </div>

      {/* Habit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHabits.map((habit) => {
          const isDone = completedHabits.includes(habit.id);
          return (
            <div
              key={habit.id}
              onClick={(e) => toggleHabit(habit.id, e)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all relative overflow-hidden group ${
                isDone
                  ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/50 shadow-sm'
                  : 'bg-white/90 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 hover:border-emerald-400/50 hover:shadow-md'
              }`}
            >
              {/* Checkmark and Title */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-emerald-500">
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 fill-emerald-500 text-white dark:text-slate-900" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 group-hover:text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`text-base font-bold transition-all ${
                        isDone
                          ? 'text-emerald-700 dark:text-emerald-300 line-through'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {habit.title_zh}
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                      {habit.duration_minutes} 分鐘 · 實證等級 {habit.evidence_grade}
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold">
                  {habit.pillar.toUpperCase()}
                </span>
              </div>

              {/* BJ Fogg Habit Loop: Anchor -> Micro-action -> Reward */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                {/* 1. Anchor */}
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono font-bold text-[10px] shrink-0">
                    錨點
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{habit.anchor_moment_zh}</span>
                </div>

                {/* 2. Micro Action */}
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono font-bold text-[10px] shrink-0">
                    行動
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {habit.micro_action_zh}
                  </span>
                </div>

                {/* 3. Dopamine Reward */}
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-[10px] shrink-0">
                    多巴胺
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 italic">
                    {habit.dopamine_reward_zh}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
