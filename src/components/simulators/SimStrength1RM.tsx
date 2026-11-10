import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Dumbbell, Target, Flame, Activity } from 'lucide-react';
import { MAJOR_MUSCLE_GROUPS } from '../../data/strengthData';

export const SimStrength1RM: React.FC = () => {
  const { language } = useLanguage();

  const [liftWeightKg, setLiftWeightKg] = useState<number>(60);
  const [repsDone, setRepsDone] = useState<number>(6);
  const [selectedMuscleId, setSelectedMuscleId] = useState<string>('CHEST');
  const [weeklySets, setWeeklySets] = useState<number>(12);

  // Epley and Brzycki 1RM Estimation formulas
  const epley1RM = liftWeightKg * (1 + repsDone / 30);
  const brzycki1RM = repsDone < 37 ? liftWeightKg / (1.0278 - 0.0278 * repsDone) : liftWeightKg;
  const estimated1RM = Math.round((epley1RM + brzycki1RM) / 2);

  // Full spectrum from Max Strength to Muscular Endurance
  const repPercentages = [
    {
      reps: '3 下 (93% 1RM)',
      pct: 0.93,
      weight: Math.round(estimated1RM * 0.93),
      goalZh: '最大肌力 · 中樞神經高頻徵召與骨密度刺激',
      goalEn: 'Heavy Strength & Motor Unit Rate Coding',
    },
    {
      reps: '5 下 (87% 1RM)',
      pct: 0.87,
      weight: Math.round(estimated1RM * 0.87),
      goalZh: '力量基石兼功能性肌肥大 (5×5 經典區間)',
      goalEn: 'Strength & Myofibrillar Hypertrophy',
    },
    {
      reps: '8 下 (80% 1RM)',
      pct: 0.8,
      weight: Math.round(estimated1RM * 0.8),
      goalZh: '肌原纖維肌肥大黃金甜蜜點 (RIR 2)',
      goalEn: 'Optimal Myofibrillar Hypertrophy',
    },
    {
      reps: '10 下 (75% 1RM)',
      pct: 0.75,
      weight: Math.round(estimated1RM * 0.75),
      goalZh: '機械張力兼代謝壓力增肌區間',
      goalEn: 'Metabolic Stress & Mechanical Tension',
    },
    {
      reps: '12 下 (70% 1RM)',
      pct: 0.7,
      weight: Math.round(estimated1RM * 0.7),
      goalZh: '肌漿肝醣擴充與初階肌耐力銜接',
      goalEn: 'Sarcoplasmic Expansion & Endurance',
    },
    {
      reps: '15–20 下 (65% 1RM)',
      pct: 0.65,
      weight: Math.round(estimated1RM * 0.65),
      goalZh: '專項肌耐力 · 微血管增生與乳酸穿梭緩衝',
      goalEn: 'Muscular Endurance & Capillarization',
    },
  ];

  // Muscle Volume status evaluation
  const activeMuscle = MAJOR_MUSCLE_GROUPS.find((m) => m.id === selectedMuscleId) || MAJOR_MUSCLE_GROUPS[0];

  const getVolumeStatus = (sets: number) => {
    if (sets < 6)
      return {
        labelZh: '維持量以下 (基礎維持或初學起步)',
        labelEn: 'Below Maintenance / Beginner Entry',
        color: 'text-slate-600 dark:text-slate-400',
      };
    if (sets <= 9)
      return {
        labelZh: '最低有效量 MEV (高效率省時進步)',
        labelEn: 'Min Effective Volume (MEV)',
        color: 'text-sky-700 dark:text-sky-400',
      };
    if (sets <= 18)
      return {
        labelZh: '最佳適應增長量 MAV (增肌增力甜蜜點)',
        labelEn: 'Max Adaptive Volume (MAV)',
        color: 'text-emerald-700 dark:text-emerald-400',
      };
    if (sets <= 22)
      return {
        labelZh: '最大可恢復量 MRV (逼近恢復上限)',
        labelEn: 'Max Recoverable Volume (MRV)',
        color: 'text-amber-700 dark:text-amber-400',
      };
    return {
      labelZh: '過度訓練風險 (垃圾訓練量 Junk Volume)',
      labelEn: 'Overtraining / Junk Volume',
      color: 'text-rose-700 dark:text-rose-400',
    };
  };
  const volumeStatus = getVolumeStatus(weeklySets);

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90 space-y-6 text-slate-900 dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            {language === 'zh-TW'
              ? '最大肌力 (1RM) 換算肌耐力配重與每週有效組數試算器'
              : 'Strength 1RM, Endurance Loading & Weekly Effective Volume Planner'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            不需直接挑戰極限 1 下！用平時能完成 5–10 下的重量，安全推算最大肌力、肌肥大與肌耐力訓練配重（結果僅供運動規劃參考）
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/70 dark:border-emerald-800 dark:text-emerald-300">
          Epley & Brzycki 雙模型平均
        </span>
      </div>

      {/* Part 1: 1RM Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Lift Weight */}
        <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
            <label htmlFor="sim-lift-weight" className="font-bold">
              {language === 'zh-TW' ? '目前訓練重量 (kg)' : 'Lift Load (kg)'}
            </label>
            <strong className="text-emerald-700 dark:text-emerald-400 text-base font-extrabold font-mono tabular-nums">
              {liftWeightKg} kg
            </strong>
          </div>
          <input
            id="sim-lift-weight"
            type="range"
            min="15"
            max="220"
            step="2.5"
            value={liftWeightKg}
            onChange={(e) => setLiftWeightKg(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <div className="text-[0.75rem] text-slate-500 dark:text-slate-400">
            {language === 'zh-TW' ? '輸入你目前能標準完成該次數的重量' : 'Weight lifted for current repetition set'}
          </div>
        </div>

        {/* Repetitions Done */}
        <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-700 dark:text-slate-200">
            <label htmlFor="sim-reps-done" className="font-bold">
              {language === 'zh-TW' ? '可完成次數 (Reps)' : 'Reps Completed'}
            </label>
            <strong className="text-amber-700 dark:text-amber-400 text-base font-extrabold font-mono tabular-nums">
              {repsDone} 下
            </strong>
          </div>
          <input
            id="sim-reps-done"
            type="range"
            min="1"
            max="15"
            step="1"
            value={repsDone}
            onChange={(e) => setRepsDone(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="text-[0.75rem] text-slate-500 dark:text-slate-400">
            {language === 'zh-TW' ? '在保留 1–2 下餘力 (RIR 1–2) 時推算最準確' : 'Most accurate when performed at RIR 1-2'}
          </div>
        </div>

        {/* 1RM Result Display */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase">
            <Target className="w-4 h-4" />
            <span>{language === 'zh-TW' ? '預估最大肌力 (1RM)' : 'Estimated 1RM Peak'}</span>
          </div>
          <div className="my-1 text-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              {estimated1RM}
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 ml-1.5 font-bold">kg</span>
          </div>
          <p className="text-[0.75rem] text-slate-600 dark:text-slate-400 text-center font-mono">
            不確定區間：約 {Math.round(Math.min(epley1RM, brzycki1RM) * 0.96)}–{Math.round(Math.max(epley1RM, brzycki1RM) * 1.04)} kg
          </p>
        </div>
      </div>

      {/* Target Repetition Weight Breakdown Table (Full Spectrum: Strength -> Hypertrophy -> Endurance) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          {language === 'zh-TW'
            ? '從「最大肌力」到「肌耐力」六大目標區間配重對照（依預估 1RM 換算）'
            : 'Target Loading Spectrum: Maximal Strength to Muscular Endurance'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          {repPercentages.map((item) => (
            <div
              key={item.reps}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/60 flex flex-col justify-between shadow-2xs"
            >
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300 font-mono">
                <span className="font-semibold">{item.reps}</span>
                <span className="font-extrabold text-sm text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {item.weight} kg
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {language === 'zh-TW' ? item.goalZh : item.goalEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Weekly Effective Volume Tracker */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/70 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'zh-TW'
                ? '各大肌群每週「有效組數 (Effective Sets)」與發力要訣'
                : 'Weekly Muscle Effective Volume Landmarks'}
            </h4>
          </div>
          <span className={`text-xs font-bold ${volumeStatus.color}`}>
            {language === 'zh-TW' ? volumeStatus.labelZh : volumeStatus.labelEn}
          </span>
        </div>

        {/* Muscle Selector Tabs */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="選擇肌群">
          {MAJOR_MUSCLE_GROUPS.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={selectedMuscleId === m.id}
              onClick={() => setSelectedMuscleId(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMuscleId === m.id
                  ? 'bg-emerald-800 text-white shadow-2xs dark:bg-emerald-400 dark:text-slate-950'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              {language === 'zh-TW' ? m.name_zh.split(' ')[0] : m.name_en.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Muscle Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="text-slate-900 dark:text-slate-200 font-bold flex flex-wrap items-center justify-between gap-1">
              <span>{language === 'zh-TW' ? activeMuscle.name_zh : activeMuscle.name_en}</span>
              <span className="text-[0.75rem] text-emerald-700 dark:text-emerald-400 font-mono">
                {activeMuscle.weekly_effective_sets}
              </span>
            </div>
            <div className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-200">
                {language === 'zh-TW' ? '動作控制與發力要訣：' : 'EMG Activation Cue: '}
              </strong>
              {language === 'zh-TW' ? activeMuscle.emg_activation_tip_zh : activeMuscle.emg_activation_tip_en}
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-xs">
              <strong className="text-slate-800 dark:text-slate-200">
                {language === 'zh-TW' ? '代表性訓練動作：' : 'Key Exercises: '}
              </strong>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {activeMuscle.key_exercises.map((ex, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[0.75rem] border border-slate-200/80 dark:border-slate-700"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Volume Slider & Visual Gauge */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-200 text-xs">
                <label htmlFor="weekly-sets-slider" className="font-bold">
                  {language === 'zh-TW' ? '該肌群每週安排總組數' : 'Scheduled Weekly Sets'}
                </label>
                <strong className="text-base font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {weeklySets} 組 / 週
                </strong>
              </div>
              <input
                id="weekly-sets-slider"
                type="range"
                min="4"
                max="26"
                step="1"
                value={weeklySets}
                onChange={(e) => setWeeklySets(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-2"
              />
            </div>

            {/* Volume Status Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                <div className="w-[30%] bg-sky-500/80 h-full" title="MEV (6-9 sets)" />
                <div className="w-[40%] bg-emerald-500/85 h-full" title="MAV (10-18 sets)" />
                <div className="w-[15%] bg-amber-500/80 h-full" title="MRV (19-22 sets)" />
                <div className="w-[15%] bg-rose-500/80 h-full" title="Overtraining (>22 sets)" />
              </div>
              <div className="flex justify-between text-[0.6875rem] font-mono text-slate-500 dark:text-slate-400">
                <span>6–9 組 (省時有效)</span>
                <span>10–18 組 (最佳適應區)</span>
                <span>22+ 組 (易過度疲勞)</span>
              </div>
            </div>

            <p className="text-[0.75rem] text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'zh-TW'
                ? '提示：每組停在「還能再做 2–3 下（RIR 2–3 / Easy-Daily Max）」即算高品質有效組數，不必每組硬撐到力竭。'
                : 'Note: Sets stopped with 2–3 reps in reserve (RIR 2–3) count as high-quality effective volume.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
