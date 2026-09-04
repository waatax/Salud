import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Dumbbell, Target, Flame, Activity, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import { MAJOR_MUSCLE_GROUPS } from '../../data/strengthData';

export const SimStrength1RM: React.FC = () => {
  const { language } = useLanguage();

  const [liftWeightKg, setLiftWeightKg] = useState<number>(80);
  const [repsDone, setRepsDone] = useState<number>(6);
  const [targetExercise, setTargetExercise] = useState<string>('SQUAT');
  const [selectedMuscleId, setSelectedMuscleId] = useState<string>('CHEST');
  const [weeklySets, setWeeklySets] = useState<number>(14);

  // Epley and Brzycki 1RM Estimation formulas
  const epley1RM = liftWeightKg * (1 + repsDone / 30);
  const brzycki1RM = repsDone < 37 ? liftWeightKg / (1.0278 - 0.0278 * repsDone) : liftWeightKg;
  const estimated1RM = Math.round((epley1RM + brzycki1RM) / 2);

  // Training percentages based on estimated 1RM
  const repPercentages = [
    { reps: '1 Rep (100%)', pct: 1.0, weight: estimated1RM, goalZh: '極限神經最大力量 (Max Strength / 1RM Test)', goalEn: 'Maximal Strength / CNS Neural Peak' },
    { reps: '3 Reps (93%)', pct: 0.93, weight: Math.round(estimated1RM * 0.93), goalZh: '重度肌力、中樞神經高頻率編碼', goalEn: 'Heavy Strength & Motor Unit Rate Coding' },
    { reps: '5 Reps (87%)', pct: 0.87, weight: Math.round(estimated1RM * 0.87), goalZh: '神經力量兼顧功能性肌肥大 (Powerlifting/5x5)', goalEn: 'Strength & Myofibrillar Hypertrophy' },
    { reps: '8 Reps (80%)', pct: 0.80, weight: Math.round(estimated1RM * 0.80), goalZh: '肌原纖維肌肥大甜蜜點 (Optimal Hypertrophy)', goalEn: 'Optimal Myofibrillar Hypertrophy' },
    { reps: '10 Reps (75%)', pct: 0.75, weight: Math.round(estimated1RM * 0.75), goalZh: '代謝壓力兼機械張力肌肥大', goalEn: 'Metabolic Stress & Mechanical Tension' },
    { reps: '12 Reps (70%)', pct: 0.70, weight: Math.round(estimated1RM * 0.70), goalZh: '肌原質膨脹、肌力耐力漸進', goalEn: 'Sarcoplasmic Expansion & Endurance' },
    { reps: '15 Reps (65%)', pct: 0.65, weight: Math.round(estimated1RM * 0.65), goalZh: '代謝疲勞、粒線體與微血管增生', goalEn: 'Capillarization & Metabolic Conditioning' },
  ];

  // Muscle Volume status evaluation
  const activeMuscle = MAJOR_MUSCLE_GROUPS.find((m) => m.id === selectedMuscleId) || MAJOR_MUSCLE_GROUPS[0];

  const getVolumeStatus = (sets: number) => {
    if (sets < 6) return { labelZh: '維持量以下 (Under-stimulated)', labelEn: 'Below Maintenance (Loss)', color: 'text-slate-400', barColor: 'bg-slate-500' };
    if (sets <= 9) return { labelZh: '最低有效量 MEV (Minimum Effective Volume)', labelEn: 'Min Effective Volume (MEV)', color: 'text-blue-400', barColor: 'bg-blue-500' };
    if (sets <= 18) return { labelZh: '最佳適應增長量 MAV (Max Adaptive Volume)', labelEn: 'Max Adaptive Volume (MAV)', color: 'text-emerald-400', barColor: 'bg-emerald-500' };
    if (sets <= 22) return { labelZh: '最大可恢復量 MRV (Max Recoverable Volume)', labelEn: 'Max Recoverable Volume (MRV)', color: 'text-amber-400', barColor: 'bg-amber-500' };
    return { labelZh: '過度訓練超負荷 (Overtraining / Junk Volume)', labelEn: 'Overtraining / Junk Volume', color: 'text-rose-400', barColor: 'bg-rose-500' };
  };
  const volumeStatus = getVolumeStatus(weeklySets);

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/50 bg-slate-900/95 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-salud-cyan" />
            {language === 'zh-TW' ? '肌力 1RM 預估與每週有效容量規劃盤' : 'Strength 1RM & Weekly Effective Volume Planner'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Epley & Brzycki Biomechanical Estimation, Target Rep Loading & Renaissance Periodization Volume Landmarks
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-700 text-cyan-300">
          Epley / RP Model
        </span>
      </div>

      {/* Part 1: 1RM Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        {/* Lift Weight */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '訓練重量 (kg)' : 'Lift Load (kg)'}</label>
            <strong className="text-salud-cyan text-base font-bold">{liftWeightKg} kg</strong>
          </div>
          <input
            type="range"
            min="20"
            max="250"
            step="2.5"
            value={liftWeightKg}
            onChange={(e) => setLiftWeightKg(Number(e.target.value))}
            className="w-full accent-salud-cyan cursor-pointer"
          />
          <div className="text-[11px] text-slate-400">
            {language === 'zh-TW' ? '輸入當前能完成該次數之重量' : 'Weight lifted for current repetition set'}
          </div>
        </div>

        {/* Repetitions Done */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '完成次數 (Reps)' : 'Reps to Near Failure'}</label>
            <strong className="text-amber-400 text-base font-bold">{repsDone} 次</strong>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="1"
            value={repsDone}
            onChange={(e) => setRepsDone(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="text-[11px] text-slate-400">
            {language === 'zh-TW' ? '建議在 RIR 0–2 (接近力竭) 準確度最高' : 'Most accurate when performed at RIR 0-2'}
          </div>
        </div>

        {/* 1RM Result Display */}
        <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-700/60 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-salud-cyan font-bold text-xs uppercase">
            <Target className="w-4 h-4" />
            <span>{language === 'zh-TW' ? '預估單次極限 (1RM)' : 'Estimated 1RM Peak'}</span>
          </div>
          <div className="my-1 text-center">
            <span className="text-4xl font-extrabold text-white font-mono">{estimated1RM}</span>
            <span className="text-xs text-salud-cyan ml-1.5 font-bold">kg</span>
          </div>
          <p className="text-[10px] text-slate-400 text-center">
            Epley: {Math.round(epley1RM)}kg | Brzycki: {Math.round(brzycki1RM)}kg
          </p>
        </div>
      </div>

      {/* Target Repetition Weight Breakdown Table */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-salud-cyan" />
          {language === 'zh-TW' ? '訓練目標強度與對應配重表 (基於 1RM 換算)' : 'Target Loading by Rep Range & Adaptation Goal'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono">
          {repPercentages.slice(1, 5).map((item) => (
            <div key={item.reps} className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 flex flex-col justify-between">
              <div className="flex justify-between items-center text-slate-400 text-[11px]">
                <span>{item.reps}</span>
                <span className="font-bold text-salud-cyan">{item.weight} kg</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-2 line-clamp-2">
                {language === 'zh-TW' ? item.goalZh : item.goalEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Weekly Effective Volume Tracker */}
      <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/70 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              {language === 'zh-TW' ? '各大肌群每週「有效組數 (Effective Sets)」地標監控' : 'Weekly Muscle Effective Volume Landmarks'}
            </h4>
          </div>
          <span className={`text-xs font-mono font-bold ${volumeStatus.color}`}>
            {language === 'zh-TW' ? volumeStatus.labelZh : volumeStatus.labelEn}
          </span>
        </div>

        {/* Muscle Selector Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {MAJOR_MUSCLE_GROUPS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMuscleId(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedMuscleId === m.id
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {language === 'zh-TW' ? m.name_zh.split(' ')[0] : m.name_en.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Muscle Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-slate-300 font-bold flex items-center justify-between">
              <span>{language === 'zh-TW' ? activeMuscle.name_zh : activeMuscle.name_en}</span>
              <span className="text-[11px] text-cyan-400 font-mono">{activeMuscle.weekly_effective_sets}</span>
            </div>
            <div className="text-slate-400 text-[11px] leading-relaxed">
              <strong>{language === 'zh-TW' ? '肌電圖最佳化發力要訣：' : 'EMG Activation Cue: '}</strong>
              {language === 'zh-TW' ? activeMuscle.emg_activation_tip_zh : activeMuscle.emg_activation_tip_en}
            </div>
            <div className="text-slate-400 text-[11px]">
              <strong>{language === 'zh-TW' ? '核心主項訓練：' : 'Key Exercises: '}</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeMuscle.key_exercises.map((ex, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Volume Slider & Visual Gauge */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-slate-300 font-mono text-xs">
                <span>{language === 'zh-TW' ? '該肌群當前每週排定組數' : 'Scheduled Weekly Sets'}</span>
                <strong className="text-base text-salud-cyan">{weeklySets} 組 / 週</strong>
              </div>
              <input
                type="range"
                min="4"
                max="28"
                step="1"
                value={weeklySets}
                onChange={(e) => setWeeklySets(Number(e.target.value))}
                className="w-full accent-salud-cyan cursor-pointer mt-2"
              />
            </div>

            {/* Volume Status Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                <div className="w-[30%] bg-blue-500/70 h-full" title="MEV (6-9 sets)" />
                <div className="w-[35%] bg-emerald-500/70 h-full" title="MAV (10-18 sets)" />
                <div className="w-[15%] bg-amber-500/70 h-full" title="MRV (19-22 sets)" />
                <div className="w-[20%] bg-rose-500/70 h-full" title="Overtraining (>22 sets)" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>6 (MEV)</span>
                <span>10–18 (MAV 甜蜜點)</span>
                <span>22 (MRV 極限)</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400">
              {language === 'zh-TW'
                ? '提示：每組必須落在 RIR 1–2 (離力竭剩1–2下) 才算「有效組數」。每組保留 4 下以上的組數大多屬於垃圾容量 (Junk Volume)。'
                : 'Note: Only sets taken to RIR 1-2 qualify as effective volume. Sets with >4 reps in reserve are mostly junk volume.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
