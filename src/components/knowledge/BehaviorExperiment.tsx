import React, { useState } from 'react';
import { Calendar, CheckCircle2, TrendingDown, ArrowRight, ShieldAlert } from 'lucide-react';

export const BehaviorExperiment: React.FC = () => {
  const [dayLogged, setDayLogged] = useState<number>(7);
  const [isStarted, setIsStarted] = useState<boolean>(true);

  // 14 days simulation state
  const totalDays = 14;
  const initialDailySugarG = 65; // Baseline: 1 full sugar boba tea/day
  const targetDailySugarG = 0; // Swap to unsweetened tea

  const accumulatedSugarSavedG = dayLogged * initialDailySugarG;
  const caloriesSaved = accumulatedSugarSavedG * 4;

  return (
    <div className="rounded-2xl border border-nature-sky-200/90 dark:border-nature-sky-800/40 bg-white dark:bg-slate-900 p-5 sm:p-6 space-y-5 font-sans text-xs shadow-sm transition-colors">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-nature-sky-100 dark:bg-nature-sky-950/60 text-nature-sky-700 dark:text-nature-sky-400 border border-nature-sky-200 dark:border-nature-sky-800/60">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-nature-sky-700 dark:text-nature-sky-400 uppercase tracking-wider font-bold">
              EXP-W-001 · 14-Day Micro-Experiment
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
              兩週生活實驗：把下午茶手搖飲換成「無糖單品茶」
            </h4>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-nature-amber-800 dark:text-nature-amber-300 border border-slate-200 dark:border-slate-700 font-bold">
          進度：第 {dayLogged} / {totalDays} 天
        </span>
      </div>

      {/* Experiment Hypothesis */}
      <div className="p-4 rounded-xl bg-nature-amber-50/70 dark:bg-slate-900/80 border border-nature-amber-200/80 dark:border-slate-800 space-y-1.5 text-slate-700 dark:text-slate-300">
        <strong className="text-nature-amber-800 dark:text-nature-amber-300 font-mono text-xs block font-bold">
          科學假說（One Variable Hypothesis）：
        </strong>
        <p className="text-xs leading-relaxed font-sans">
          只改動一個單一變因（飲料選擇由全糖改無糖），總液體攝取維持 1500–2000 mL 不變，每日游離糖攝取立即減少約 65 公克，兩週後味覺甜味閾值敏感度提升。
        </p>
      </div>

      {/* 14 Days Checkin Grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          <span>點擊天數模擬紀錄打卡：</span>
          <span className="text-nature-green-700 dark:text-nature-green-400 font-bold">
            已累積省下 {accumulatedSugarSavedG}g 游離糖（約 {caloriesSaved} kcal）
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
          {Array.from({ length: totalDays }).map((_, idx) => {
            const dayNum = idx + 1;
            const isCompleted = dayNum <= dayLogged;

            return (
              <button
                key={dayNum}
                onClick={() => setDayLogged(dayNum)}
                className={`btn-tactile h-12 rounded-xl border flex flex-col items-center justify-center font-mono text-xs transition-all ${
                  isCompleted
                    ? 'border-nature-sky-400 bg-nature-sky-50 dark:bg-nature-sky-950/40 text-nature-sky-800 dark:text-nature-sky-300 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-500 hover:border-nature-sky-300'
                }`}
              >
                <span className="text-[10px] text-slate-500 dark:text-slate-400">D{dayNum}</span>
                {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-nature-sky-600 dark:text-nature-sky-400" /> : <span className="text-slate-400">○</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Review prompt (Spec §9.2) */}
      <div className="p-4 rounded-xl border border-nature-green-200 dark:border-emerald-500/30 bg-nature-green-50/90 dark:bg-emerald-950/20 text-nature-green-950 dark:text-emerald-200 flex items-start gap-2.5 shadow-xs">
        <TrendingDown className="w-4 h-4 text-nature-green-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-xs text-nature-green-800 dark:text-emerald-300 font-mono">
            雙週階段性回饋 (Review Prompt)：
          </strong>
          <p className="text-xs text-nature-green-900 dark:text-emerald-100 leading-relaxed font-sans">
            你只改變了一個變因。體重的短期微小波動極易受到每日水分滯留影響，因此 Salud 評估的是 7 日移動平均趨勢，而不是單日體重秤數字。若偶爾有一兩天破戒，絕不需自責或放棄，隔天重回無糖節奏即可！
          </p>
        </div>
      </div>
    </div>
  );
};
