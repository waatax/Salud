import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Zap, Timer, Wind, ShieldCheck, Activity, Gauge } from 'lucide-react';

export const SimBadmintonSmash: React.FC = () => {
  const { language } = useLanguage();

  const [initialSpeedKmh, setInitialSpeedKmh] = useState<number>(380);
  const [receiverDistanceM, setReceiverDistanceM] = useState<number>(6.5); // Midcourt ~6.5m, baseline ~10m
  const [smashAngleDeg, setSmashAngleDeg] = useState<number>(12); // Downward angle

  // Aerodynamic model: v(x) = v0 * exp(-k * x)
  // For badminton, k ≈ 0.20 to 0.22 m^-1
  const k = 0.21;
  const speedAtReceiverKmh = Math.round(initialSpeedKmh * Math.exp(-k * receiverDistanceM));

  // Flight time t = (1 / (k * v0_mps)) * (exp(k * x) - 1)
  const v0Mps = (initialSpeedKmh * 1000) / 3600;
  const flightTimeSeconds = (1 / (k * v0Mps)) * (Math.exp(k * receiverDistanceM) - 1);
  const flightTimeMs = Math.round(flightTimeSeconds * 1000);

  // Speed loss percentage
  const speedLossPct = Math.round(((initialSpeedKmh - speedAtReceiverKmh) / initialSpeedKmh) * 100);

  // Difficulty & defense evaluation
  const getReactionEvaluation = (ms: number) => {
    if (ms < 180) return { labelZh: '超極限接殺 (幾乎無法憑視覺反應，需純預判)', labelEn: 'Hyper-Extreme (Requires Pure Guess/Anticipation)', color: 'text-rose-400' };
    if (ms < 240) return { labelZh: '高難度快速接殺 (頂級選手單打標準防守時差)', labelEn: 'Elite Reflex Window (Single Defense Standard)', color: 'text-amber-400' };
    if (ms < 320) return { labelZh: '中等可攔截區間 (具備調整拍面反抽變線時間)', labelEn: 'Manageable Interception (Time for Placement)', color: 'text-cyan-400' };
    return { labelZh: '充裕防守時間帶 (可從容起球或放網反擊)', labelEn: 'Comfortable Reset Window', color: 'text-emerald-400' };
  };
  const evalInfo = getReactionEvaluation(flightTimeMs);

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/50 bg-slate-900/95 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            {language === 'zh-TW' ? '羽球殺球初速衰減與接殺反應時間精算機' : 'Badminton Smash Aerodynamic Decay & Defense Latency'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Aerodynamic Drag Decay (Cd ~0.65), Velocity Loss & Receiver Interception Window
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/80 border border-amber-700 text-amber-300">
          羽球空氣動力學
        </span>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        {/* Launch Speed */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '出拍初速 (km/h)' : 'Launch Velocity (km/h)'}</label>
            <strong className="text-amber-400 text-base font-bold">{initialSpeedKmh} km/h</strong>
          </div>
          <input
            type="range"
            min="200"
            max="490"
            step="10"
            value={initialSpeedKmh}
            onChange={(e) => setInitialSpeedKmh(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>業餘中階 220</span>
            <span>職業重殺 420+</span>
          </div>
        </div>

        {/* Receiver Distance */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '防守者距離 (公尺)' : 'Receiver Distance (m)'}</label>
            <strong className="text-salud-cyan text-base font-bold">{receiverDistanceM} m</strong>
          </div>
          <input
            type="range"
            min="3.5"
            max="11.0"
            step="0.5"
            value={receiverDistanceM}
            onChange={(e) => setReceiverDistanceM(Number(e.target.value))}
            className="w-full accent-salud-cyan cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>網前前場 4m</span>
            <span>中場 6.5m</span>
            <span>底線 10m</span>
          </div>
        </div>

        {/* Smash Downward Angle */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '殺球下俯角 (度)' : 'Downward Angle (deg)'}</label>
            <strong className="text-emerald-400 text-base font-bold">{smashAngleDeg}°</strong>
          </div>
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            value={smashAngleDeg}
            onChange={(e) => setSmashAngleDeg(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <div className="text-[11px] text-slate-400">
            {smashAngleDeg >= 15 ? '高點尖銳點殺 (Steep Drop)' : '平快重殺 (Flat Power Smash)'}
          </div>
        </div>
      </div>

      {/* Output Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Speed at Receiver */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '防守點抵達球速' : 'Velocity at Receiver'}</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-white font-mono">{speedAtReceiverKmh}</span>
            <span className="text-xs text-slate-400 ml-1.5">km/h</span>
          </div>
          <span className="text-[11px] text-amber-400 font-mono">
            {language === 'zh-TW' ? `空氣阻力已消耗 ${speedLossPct}% 動能` : `Drag dissipated ${speedLossPct}% velocity`}
          </span>
        </div>

        {/* Flight Time (ms) */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '飛行時長與反應時間' : 'Reaction Time Budget'}</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-salud-cyan font-mono">{flightTimeMs}</span>
            <span className="text-xs text-slate-400 ml-1.5">毫秒 (ms)</span>
          </div>
          <span className="text-[11px] text-slate-300 font-mono">
            {language === 'zh-TW' ? `折合 ${(flightTimeMs / 1000).toFixed(2)} 秒` : `Equivalent to ${(flightTimeMs / 1000).toFixed(2)}s`}
          </span>
        </div>

        {/* Defensive Rating */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '防守接殺難易度' : 'Defensive Challenge'}</span>
          <div className="my-2">
            <span className={`text-sm font-bold leading-tight ${evalInfo.color}`}>
              {language === 'zh-TW' ? evalInfo.labelZh.split(' (')[0] : evalInfo.labelEn.split(' (')[0]}
            </span>
          </div>
          <p className="text-[10px] text-slate-400">
            {language === 'zh-TW' ? evalInfo.labelZh : evalInfo.labelEn}
          </p>
        </div>
      </div>
    </div>
  );
};
