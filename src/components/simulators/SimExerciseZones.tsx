import React, { useState } from 'react';
import { EXERCISE_ZONES } from '../../data/exerciseData';
import { useLanguage } from '../../i18n';
import { Activity, Heart, Flame, ShieldAlert, Timer, Award, Sparkles } from 'lucide-react';

export const SimExerciseZones: React.FC = () => {
  const { t, language } = useLanguage();
  const [age, setAge] = useState<number>(35);
  const [restingHr, setRestingHr] = useState<number>(62);
  const [weeklyZone2Min, setWeeklyZone2Min] = useState<number>(120);
  const [weeklyZone5Min, setWeeklyZone5Min] = useState<number>(16);

  // Karvonen Calculation
  const hrMaxFox = 220 - age; // Traditional Fox formula
  const hrMaxTanaka = Math.round(208 - 0.7 * age); // Modern Tanaka formula (higher accuracy for older adults)
  const hrMax = hrMaxFox;
  const hrr = hrMax - restingHr; // Heart Rate Reserve

  const calculateTargetHr = (pct: number) => {
    return Math.round(restingHr + hrr * pct);
  };

  const zonesCalculated = [
    {
      ...EXERCISE_ZONES[0],
      minHr: calculateTargetHr(0.50),
      maxHr: calculateTargetHr(0.60),
      color: 'bg-slate-700 text-slate-200 border-slate-600',
      badgeColor: 'bg-slate-800 text-slate-300',
    },
    {
      ...EXERCISE_ZONES[1],
      minHr: calculateTargetHr(0.60),
      maxHr: calculateTargetHr(0.70),
      color: 'bg-cyan-950/60 text-cyan-200 border-cyan-500/60 shadow-cyan-glow',
      badgeColor: 'bg-cyan-900 text-cyan-300',
    },
    {
      ...EXERCISE_ZONES[2],
      minHr: calculateTargetHr(0.70),
      maxHr: calculateTargetHr(0.80),
      color: 'bg-emerald-950/60 text-emerald-200 border-emerald-500/60',
      badgeColor: 'bg-emerald-900 text-emerald-300',
    },
    {
      ...EXERCISE_ZONES[3],
      minHr: calculateTargetHr(0.80),
      maxHr: calculateTargetHr(0.90),
      color: 'bg-amber-950/60 text-amber-200 border-amber-500/60',
      badgeColor: 'bg-amber-900 text-amber-300',
    },
    {
      ...EXERCISE_ZONES[4],
      minHr: calculateTargetHr(0.90),
      maxHr: hrMax,
      color: 'bg-red-950/60 text-red-200 border-red-500/60 shadow-md',
      badgeColor: 'bg-red-900 text-red-300',
    },
  ];

  // WHO Progress (150 min Zone 2 equivalent, where 1 min Zone 5 = 2 min Zone 2)
  const totalEquivalentMinutes = weeklyZone2Min + weeklyZone5Min * 2;
  const targetMet = totalEquivalentMinutes >= 150;
  const progressPct = Math.min(100, Math.round((totalEquivalentMinutes / 150) * 100));

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/40 bg-slate-900/85 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-salud-cyan" />
            {t('exercise.calc_title')}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Karvonen Heart Rate Reserve (HRR) Physiological Formula & Metabolic Target
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/60 border border-cyan-700 text-cyan-300">
          金標準儲備心率法 (HRR)
        </span>
      </div>

      {/* Input Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between text-slate-300">
            <label>{t('exercise.age')}</label>
            <strong className="text-salud-cyan text-sm">{age} 歲</strong>
          </div>
          <input
            type="range"
            min="18"
            max="85"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-salud-cyan cursor-pointer"
          />
          <span className="text-[10px] text-slate-500 block">預估最大心率 HRmax = 220 - 年齡 = {hrMax} bpm</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between text-slate-300">
            <label>{t('exercise.hr_rest')}</label>
            <strong className="text-salud-amber text-sm">{restingHr} bpm</strong>
          </div>
          <input
            type="range"
            min="40"
            max="95"
            value={restingHr}
            onChange={(e) => setRestingHr(Number(e.target.value))}
            className="w-full accent-salud-amber cursor-pointer"
          />
          <span className="text-[10px] text-slate-500 block">儲備心率 HRR = HRmax - HRrest = {hrr} bpm</span>
        </div>
      </div>

      {/* 5 Intensity Zones Cards Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
          <Heart className="w-4 h-4 text-salud-coral" />
          {t('exercise.zones_title')}：
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {zonesCalculated.map((zone) => (
            <div
              key={zone.zone}
              className={`p-3.5 rounded-2xl border transition-all space-y-2 ${zone.color}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${zone.badgeColor}`}>
                  {zone.zone.replace('_', ' ')}
                </span>
                {zone.zone === 'ZONE_2' && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-400 text-black font-bold">
                    核心長壽
                  </span>
                )}
              </div>

              <div>
                <strong className="text-xs font-bold block truncate">
                  {language === 'zh-TW' ? zone.name_zh.split(' · ')[1] : zone.name_en.split(' · ')[1]}
                </strong>
                <div className="pt-1 flex items-baseline gap-1">
                  <span className="text-lg font-display font-extrabold">{zone.minHr}–{zone.maxHr}</span>
                  <span className="text-[10px] font-mono opacity-75">bpm</span>
                </div>
              </div>

              <div className="pt-1 border-t border-slate-700/60 text-[10px] space-y-1">
                <span className="opacity-85 block truncate" title={language === 'zh-TW' ? zone.metabolic_fuel_zh : zone.metabolic_fuel_en}>
                  {language === 'zh-TW' ? `燃料：${zone.metabolic_fuel_zh}` : `Fuel: ${zone.metabolic_fuel_en}`}
                </span>
                <span className="opacity-75 block truncate" title={language === 'zh-TW' ? zone.lactate_level_zh : zone.lactate_level_en}>
                  {language === 'zh-TW' ? `乳酸：${zone.lactate_level_zh}` : `Lactate: ${zone.lactate_level_en}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHO Target & Interactive Weekly Volume Tracker */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Timer className="w-4 h-4 text-salud-amber" />
            <span>WHO 國際體能活動每週達標追蹤器 (Weekly Volume Tracker)</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            targetMet ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300 border border-amber-700'
          }`}>
            {targetMet ? '✓ 已達 WHO 標準' : '尚未達標 (需累計 150 分鐘等量)'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <label>每週累計 Zone 2 慢速有氧：</label>
              <strong className="text-cyan-300">{weeklyZone2Min} 分鐘</strong>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="15"
              value={weeklyZone2Min}
              onChange={(e) => setWeeklyZone2Min(Number(e.target.value))}
              className="w-full accent-salud-cyan cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-300">
              <label>每週累計 Zone 5 HIIT 衝刺 (高強度加倍折算)：</label>
              <strong className="text-red-400">{weeklyZone5Min} 分鐘</strong>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="4"
              value={weeklyZone5Min}
              onChange={(e) => setWeeklyZone5Min(Number(e.target.value))}
              className="w-full accent-salud-coral cursor-pointer"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>等效有氧量：{totalEquivalentMinutes} / 150 分鐘</span>
            <span className="font-bold text-salud-cyan">{progressPct}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              style={{ width: `${progressPct}%` }}
              className={`h-full rounded-full transition-all duration-300 ${
                targetMet ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-cyan-glow' : 'bg-gradient-to-r from-amber-500 to-cyan-500'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
