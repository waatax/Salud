import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Shield, Target, Activity, Flame, ShieldAlert, CheckCircle2, Zap } from 'lucide-react';

export const SimPickleballKitchen: React.FC = () => {
  const { language } = useLanguage();

  const [launchVelocityKmh, setLaunchVelocityKmh] = useState<number>(28); // 15 to 45 km/h (soft dink / drop)
  const [launchAngleDeg, setLaunchAngleDeg] = useState<number>(28); // 15 to 45 degrees
  const [paddleCoreMm, setPaddleCoreMm] = useState<13 | 16>(16);

  // Ball physics
  // Net height is 34 inches = 0.864 m
  // Kitchen line is 2.13 m on each side.
  // Model parabolic trajectory under gravity and polymer ball drag
  const v0Mps = (launchVelocityKmh * 1000) / 3600;
  const angleRad = (launchAngleDeg * Math.PI) / 180;
  const vx = v0Mps * Math.cos(angleRad);
  const vy = v0Mps * Math.sin(angleRad);
  const g = 9.81;

  // Time to reach net at ~2.13m distance
  const timeToNet = 2.13 / (vx || 1);
  const heightAtNetM = Math.max(0, vy * timeToNet - 0.5 * g * timeToNet * timeToNet + 0.5); // starting from ~0.5m contact height
  const netClearanceCm = Math.round((heightAtNetM - 0.864) * 100);

  // Reaction time at 14ft (4.27m) kitchen separation
  // For firefight drives at ~60 km/h:
  const firefightSpeedKmh = 58;
  const firefightMps = (firefightSpeedKmh * 1000) / 3600;
  const firefightReactionMs = Math.round((4.27 / firefightMps) * 1000);

  // Safety probability
  const isNetDump = netClearanceCm < 0;
  const isTooHigh = netClearanceCm > 25;
  const isOptimal = netClearanceCm >= 3 && netClearanceCm <= 18;

  const getSafetyStatus = () => {
    if (isNetDump) return { labelZh: '球觸網下網 (Net Dump)', labelEn: 'Net Dump (Under)', color: 'text-rose-400', descZh: '仰角過低或初速不足，未能越過 34 吋網帶。' };
    if (isTooHigh) return { labelZh: '過高被扣殺危險 (Popup Hazard)', labelEn: 'Popup Hazard (Too High)', color: 'text-amber-400', descZh: '球高於網帶 25cm 以上，對手可直接凌空暴扣！' };
    if (isOptimal) return { labelZh: '精準落入廚房 (Gold Standard Dink)', labelEn: 'Gold Standard Dink', color: 'text-emerald-400', descZh: '完美貼網下墜，弧線頂點在己方，迫使對手由下往上擊球。' };
    return { labelZh: '尚可安全通過 (Acceptable)', labelEn: 'Acceptable Clearance', color: 'text-teal-400', descZh: '球越過球網，對手難以直接重殺但具備反推空間。' };
  };
  const statusInfo = getSafetyStatus();

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/50 bg-slate-900/95 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400" />
            {language === 'zh-TW' ? '匹克球廚房區安全放球 (Dink) 與網前截擊模擬器' : 'Pickleball Kitchen Dink Trajectory & Firefight Reflex Simulator'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Non-Volley Arc Apex, Net Tape Clearance & 14ft Firefight Reflex Latency
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-teal-950/80 border border-teal-700 text-teal-300">
          廚房區力學
        </span>
      </div>

      {/* Input Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        {/* Launch Speed */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '出球初速 (km/h)' : 'Launch Speed (km/h)'}</label>
            <strong className="text-teal-400 text-base font-bold">{launchVelocityKmh} km/h</strong>
          </div>
          <input
            type="range"
            min="16"
            max="45"
            step="1"
            value={launchVelocityKmh}
            onChange={(e) => setLaunchVelocityKmh(Number(e.target.value))}
            className="w-full accent-teal-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>軟球 Dink 22</span>
            <span>第三板 Drop 34</span>
          </div>
        </div>

        {/* Launch Angle */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '出球仰角 (度)' : 'Launch Angle (deg)'}</label>
            <strong className="text-amber-400 text-base font-bold">{launchAngleDeg}°</strong>
          </div>
          <input
            type="range"
            min="15"
            max="42"
            step="1"
            value={launchAngleDeg}
            onChange={(e) => setLaunchAngleDeg(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="text-[11px] text-slate-400">
            {launchAngleDeg < 22 ? '平推易下網' : launchAngleDeg > 35 ? '高拋易挨殺' : '黃金 25°–30°'}
          </div>
        </div>

        {/* Paddle Core */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <label className="text-slate-300 font-semibold block">{language === 'zh-TW' ? '球拍蜂巢芯厚度' : 'Paddle Core Thickness'}</label>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={() => setPaddleCoreMm(13)}
              className={`py-2 rounded-xl font-bold transition-all text-center ${
                paddleCoreMm === 13 ? 'bg-cyan-600 text-white shadow' : 'bg-slate-700/60 text-slate-300'
              }`}
            >
              13 mm (偏速度)
            </button>
            <button
              onClick={() => setPaddleCoreMm(16)}
              className={`py-2 rounded-xl font-bold transition-all text-center ${
                paddleCoreMm === 16 ? 'bg-teal-600 text-white shadow' : 'bg-slate-700/60 text-slate-300'
              }`}
            >
              16 mm (厚芯控球)
            </button>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1">
            {paddleCoreMm === 16 ? '持球 2.8ms，吸震防網球肘' : '出球清脆，回彈速度快'}
          </span>
        </div>
      </div>

      {/* Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Net Clearance */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '過網高度差 (Net Clearance)' : 'Net Clearance'}</span>
          <div className="my-2">
            <span className={`text-3xl font-extrabold font-mono ${netClearanceCm < 0 ? 'text-rose-400' : 'text-teal-400'}`}>
              {netClearanceCm > 0 ? `+${netClearanceCm}` : netClearanceCm}
            </span>
            <span className="text-xs text-slate-400 ml-1.5">公分 (cm)</span>
          </div>
          <span className={`text-[11px] font-bold ${statusInfo.color}`}>
            {statusInfo.labelZh}
          </span>
        </div>

        {/* Tactical Status */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '戰術品質判定' : 'Tactical Assessment'}</span>
          <div className="my-1">
            <span className={`text-sm font-bold block ${statusInfo.color}`}>
              {statusInfo.labelZh}
            </span>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              {statusInfo.descZh}
            </p>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            網帶基準：34 吋 (86.4 cm)
          </div>
        </div>

        {/* 14ft Firefight Reflex */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '14ft 廚房線火拼反應時限' : '14ft Firefight Reaction'}</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">{firefightReactionMs}</span>
            <span className="text-xs text-slate-400 ml-1.5">毫秒 (ms)</span>
          </div>
          <span className="text-[11px] text-slate-300">
            {language === 'zh-TW' ? '必須採用「推壓截擊 (Punch Volley)」，嚴禁大引拍' : 'Zero backswing; compact punch volley mandatory'}
          </span>
        </div>
      </div>
    </div>
  );
};
