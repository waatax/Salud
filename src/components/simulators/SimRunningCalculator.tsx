import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Activity, Gauge, Flame, ShieldAlert, CheckCircle2, Zap, Heart, Timer } from 'lucide-react';

export const SimRunningCalculator: React.FC = () => {
  const { t, language } = useLanguage();

  const [paceMinutes, setPaceMinutes] = useState<number>(5);
  const [paceSeconds, setPaceSeconds] = useState<number>(30);
  const [cadence, setCadence] = useState<number>(174);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [targetDistance, setTargetDistance] = useState<'10K' | 'HALF' | 'FULL'>('FULL');

  // Math Calculations:
  // Pace in seconds/km
  const totalPaceSeconds = paceMinutes * 60 + paceSeconds;
  // Speed in m/s
  const speedMps = 1000 / totalPaceSeconds;
  // Speed in km/h
  const speedKmh = (speedMps * 3.6).toFixed(1);
  // Stride Length in meters = speedMps / (cadence / 60)
  const strideLengthM = speedMps / (cadence / 60);
  const strideLengthCm = Math.round(strideLengthM * 100);
  const strideRatioToHeight = Math.round((strideLengthCm / heightCm) * 100);

  // Ground Contact Time estimate (empirically inversely related to cadence and speed)
  const estimatedGctMs = Math.round(Math.max(180, Math.min(320, 420 - cadence * 1.1 - speedMps * 8)));

  // Cadence Evaluation
  const isCadenceOptimal = cadence >= 170 && cadence <= 186;
  const isCadenceTooLow = cadence < 165;

  // Race duration and fueling
  const distanceKm = targetDistance === '10K' ? 10 : targetDistance === 'HALF' ? 21.0975 : 42.195;
  const finishTimeMinutes = Math.round((distanceKm * totalPaceSeconds) / 60);
  const finishHours = Math.floor(finishTimeMinutes / 60);
  const finishMins = finishTimeMinutes % 60;

  // Gel and fluid requirements
  const raceHours = finishTimeMinutes / 60;
  const recommendedGels = targetDistance === '10K' ? 1 : Math.max(1, Math.round(raceHours * 1.8));
  const hourlyFluidMl = 500;
  const totalFluidL = ((raceHours * hourlyFluidMl) / 1000).toFixed(1);

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/50 bg-slate-900/90 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-salud-cyan" />
            {language === 'zh-TW' ? '跑步生物力學與配速補給計算機' : 'Running Biomechanics & Pacing Fueling Calculator'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Cadence, Stride Length Ratio, Ground Contact Time & Carbohydrate Gel Protocol
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/70 border border-cyan-700 text-cyan-300">
          運動力學精算
        </span>
      </div>

      {/* Input Parameters Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        {/* Pace Input */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <label>{language === 'zh-TW' ? '目標配速 (分:秒 / 公里)' : 'Pace (min:sec / km)'}</label>
            <strong className="text-salud-cyan text-sm">
              {paceMinutes}:{paceSeconds.toString().padStart(2, '0')} /km
            </strong>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1">
              <span className="text-[10px] text-slate-500">分鐘：{paceMinutes}</span>
              <input
                type="range"
                min="3"
                max="9"
                value={paceMinutes}
                onChange={(e) => setPaceMinutes(Number(e.target.value))}
                className="w-full accent-salud-cyan cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <span className="text-[10px] text-slate-500">秒數：{paceSeconds}</span>
              <input
                type="range"
                min="0"
                max="55"
                step="5"
                value={paceSeconds}
                onChange={(e) => setPaceSeconds(Number(e.target.value))}
                className="w-full accent-salud-cyan cursor-pointer"
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-400 block pt-0.5">時速折算：{speedKmh} km/h</span>
        </div>

        {/* Cadence Input */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <label>{language === 'zh-TW' ? '跑步步頻 (Cadence)' : 'Cadence (Steps/min)'}</label>
            <strong className={isCadenceOptimal ? 'text-emerald-400 text-sm' : isCadenceTooLow ? 'text-amber-400 text-sm' : 'text-cyan-300 text-sm'}>
              {cadence} spm
            </strong>
          </div>
          <input
            type="range"
            min="145"
            max="205"
            value={cadence}
            onChange={(e) => setCadence(Number(e.target.value))}
            className="w-full accent-salud-amber cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>150 煞車過度</span>
            <span className="text-emerald-400 font-bold">170–185 黃金區</span>
            <span>200+ 極速</span>
          </div>
        </div>

        {/* Height Input */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
          <div className="flex justify-between text-slate-300">
            <label>{language === 'zh-TW' ? '跑者身高 (Height)' : 'Runner Height (cm)'}</label>
            <strong className="text-purple-300 text-sm">{heightCm} cm</strong>
          </div>
          <input
            type="range"
            min="150"
            max="200"
            value={heightCm}
            onChange={(e) => setHeightCm(Number(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer"
          />
          <span className="text-[10px] text-slate-400 block pt-0.5">用於計算步長與身高之黃金比例</span>
        </div>
      </div>

      {/* Output Metrics Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block">{language === 'zh-TW' ? '計算單步步長' : 'Stride Length'}</span>
          <strong className="text-lg sm:text-xl font-display font-extrabold text-white">{strideLengthCm} cm</strong>
          <span className="text-[10px] text-salud-cyan block">身高佔比 {strideRatioToHeight}%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block">{language === 'zh-TW' ? '估算觸地時間 (GCT)' : 'Est. Ground Contact'}</span>
          <strong className="text-lg sm:text-xl font-display font-extrabold text-salud-amber">{estimatedGctMs} ms</strong>
          <span className="text-[10px] text-slate-500 block">精英跑者 &lt; 200 ms</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block">{language === 'zh-TW' ? '垂直振幅預估' : 'Vertical Oscillation'}</span>
          <strong className="text-lg sm:text-xl font-display font-extrabold text-purple-300">
            {isCadenceOptimal ? '6.8 – 7.5 cm' : '8.5 – 9.8 cm'}
          </strong>
          <span className="text-[10px] text-slate-500 block">
            {isCadenceOptimal ? '低起伏高效率' : '起伏過大損耗能量'}
          </span>
        </div>

        <div className={`p-3.5 rounded-2xl border text-center space-y-1 ${
          isCadenceOptimal
            ? 'bg-emerald-950/30 border-emerald-600/50 text-emerald-200'
            : isCadenceTooLow
            ? 'bg-amber-950/30 border-amber-600/50 text-amber-200'
            : 'bg-cyan-950/30 border-cyan-600/50 text-cyan-200'
        }`}>
          <span className="text-[11px] opacity-80 block">{language === 'zh-TW' ? '步頻評級診斷' : 'Cadence Diagnosis'}</span>
          <strong className="text-sm sm:text-base font-bold block">
            {isCadenceOptimal
              ? (language === 'zh-TW' ? '✓ 黃金高彈性區' : 'Optimal Elastic')
              : isCadenceTooLow
              ? (language === 'zh-TW' ? '⚠ 跨步煞車偏大' : 'Overstriding Risk')
              : (language === 'zh-TW' ? '高步頻快速轉換' : 'High Turnover')}
          </strong>
          <span className="text-[10px] opacity-75 block">
            {isCadenceTooLow ? '建議遞增 5% 步頻' : '膝關節剪力最小化'}
          </span>
        </div>
      </div>

      {/* Race Target & Fueling Protocol */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Timer className="w-4 h-4 text-salud-amber" />
            <span>{language === 'zh-TW' ? '馬拉松比賽完賽時間預估與補給處方' : 'Marathon Race Time & Fueling Strategy'}</span>
          </div>

          <div className="flex gap-1">
            {(['10K', 'HALF', 'FULL'] as const).map((dist) => (
              <button
                key={dist}
                onClick={() => setTargetDistance(dist)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  targetDistance === dist
                    ? 'bg-salud-cyan text-black'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {dist === 'FULL' ? '全馬 42.195K' : dist === 'HALF' ? '半馬 21K' : '路跑 10K'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[11px] block">{language === 'zh-TW' ? '預計完賽總時間' : 'Projected Finish Time'}</span>
            <strong className="text-lg font-display text-salud-amber font-extrabold">
              {finishHours > 0 ? `${finishHours} 小時 ${finishMins} 分` : `${finishMins} 分鐘`}
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[11px] block">{language === 'zh-TW' ? '建議能量膠數量 (每包~25g碳水)' : 'Energy Gels Required'}</span>
            <strong className="text-lg font-display text-emerald-400 font-extrabold">
              {recommendedGels} 包 (每 35 分鐘 1 包)
            </strong>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 text-[11px] block">{language === 'zh-TW' ? '賽程建議總補水量' : 'Recommended Hydration'}</span>
            <strong className="text-lg font-display text-cyan-400 font-extrabold">
              約 {totalFluidL} 公升 ({hourlyFluidMl} mL/hr)
            </strong>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          ※ 臨床生化提醒：每包能量膠必須配飲 100–150 mL 白開水，避免胃中滲透壓過高阻礙吸收；全馬切勿只喝純水不補鈉，以防發生運動相關低血鈉症 (EAH)。
        </p>
      </div>
    </div>
  );
};
