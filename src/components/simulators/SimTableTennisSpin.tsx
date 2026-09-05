import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { RotateCw, Timer, Target, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const SimTableTennisSpin: React.FC = () => {
  const { language } = useLanguage();

  const [spinType, setSpinType] = useState<'TOPSPIN' | 'BACKSPIN'>('TOPSPIN');
  const [spinRpm, setSpinRpm] = useState<number>(7500); // 1000 - 10000 rpm
  const [speedKmh, setSpeedKmh] = useState<number>(80); // 40 - 110 km/h

  // Physics calculation
  // Ball radius r = 0.02m (20mm), mass m = 0.0027 kg (2.7g)
  // Angular velocity omega = (spinRpm * 2 * pi) / 60 (rad/s)
  const omegaRad = (spinRpm * 2 * Math.PI) / 60;
  const speedMps = (speedKmh * 1000) / 3600;
  const airDensity = 1.2; // kg/m^3

  // Lift coefficient Cl approx: Cl ≈ 0.25 * (r * omega / v)
  const spinParameter = (0.02 * omegaRad) / (speedMps || 1);
  const cl = Math.min(0.65, 0.28 * spinParameter);
  const crossSectionArea = Math.PI * 0.02 * 0.02;
  const magnusForceN = 0.5 * airDensity * crossSectionArea * cl * (speedMps * speedMps);

  // Flight time across 2.74m table
  const flightTimeMs = Math.round((2.74 / speedMps) * 1000);

  // Recommended blade angle for counter-stroke
  const recommendedBladeAngle =
    spinType === 'TOPSPIN'
      ? Math.round(Math.max(35, 75 - (spinRpm / 10000) * 35))
      : Math.round(Math.min(85, 55 + (spinRpm / 10000) * 25));

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/50 bg-slate-900/95 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <RotateCw className="w-5 h-5 text-rose-400" />
            {language === 'zh-TW' ? '桌球馬格努斯旋轉與反拉壓拍角度模擬器' : 'Table Tennis Magnus Spin & Counter Blade Angle Simulator'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Aerodynamic Magnus Differential, Trajectory Dive & Optimal Counter-Loop Blade Angle
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-950/80 border border-rose-700 text-rose-300">
          馬格努斯力學
        </span>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        {/* Spin Type */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <label className="text-slate-300 font-semibold block">{language === 'zh-TW' ? '旋轉性質 (Spin Type)' : 'Spin Direction'}</label>
          <div className="grid grid-cols-2 gap-1 pt-1">
            <button
              onClick={() => setSpinType('TOPSPIN')}
              className={`py-2 rounded-xl font-bold transition-all text-center ${
                spinType === 'TOPSPIN' ? 'bg-rose-600 text-white shadow' : 'bg-slate-700/60 text-slate-300'
              }`}
            >
              {language === 'zh-TW' ? '上旋 (弧圈)' : 'Topspin'}
            </button>
            <button
              onClick={() => setSpinType('BACKSPIN')}
              className={`py-2 rounded-xl font-bold transition-all text-center ${
                spinType === 'BACKSPIN' ? 'bg-blue-600 text-white shadow' : 'bg-slate-700/60 text-slate-300'
              }`}
            >
              {language === 'zh-TW' ? '下旋 (削球)' : 'Backspin'}
            </button>
          </div>
          <span className="text-[10px] text-slate-400 block pt-1">
            {spinType === 'TOPSPIN' ? '氣流向下壓，急劇下墜' : '氣流向上托，空中飄行'}
          </span>
        </div>

        {/* Spin RPM */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '旋轉轉速 (RPM)' : 'Spin (RPM)'}</label>
            <strong className="text-rose-400 text-base font-bold">{spinRpm} rpm</strong>
          </div>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={spinRpm}
            onChange={(e) => setSpinRpm(Number(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>過度下旋 3000</span>
            <span>國手暴衝 9000+</span>
          </div>
        </div>

        {/* Speed (km/h) */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '出球時速 (km/h)' : 'Ball Speed (km/h)'}</label>
            <strong className="text-cyan-400 text-base font-bold">{speedKmh} km/h</strong>
          </div>
          <input
            type="range"
            min="40"
            max="115"
            step="5"
            value={speedKmh}
            onChange={(e) => setSpeedKmh(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>慢速相持 60</span>
            <span>極速前衝 110</span>
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Magnus Force */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '馬格努斯氣動力' : 'Magnus Force'}</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-white font-mono">{(magnusForceN * 1000).toFixed(1)}</span>
            <span className="text-xs text-slate-400 ml-1.5">mN (毫牛頓)</span>
          </div>
          <span className="text-[11px] text-rose-400 font-mono">
            {language === 'zh-TW'
              ? `約等於球體自身重力的 ${(magnusForceN / (0.0027 * 9.81)).toFixed(1)} 倍！`
              : `${(magnusForceN / (0.0027 * 9.81)).toFixed(1)}x ball weight!`}
          </span>
        </div>

        {/* Flight Time */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '球桌飛行時限' : 'Flight Time Across Table'}</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-cyan-400 font-mono">{flightTimeMs}</span>
            <span className="text-xs text-slate-400 ml-1.5">毫秒 (ms)</span>
          </div>
          <span className="text-[11px] text-slate-400">
            {language === 'zh-TW' ? '容錯觸球窗口僅約 20ms' : 'Touch tolerance window ~20ms'}
          </span>
        </div>

        {/* Counter Blade Tilt */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <span className="text-xs font-mono text-slate-400">{language === 'zh-TW' ? '建議反拉壓拍角度' : 'Counter Blade Tilt Angle'}</span>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">{recommendedBladeAngle}°</span>
            <span className="text-xs text-slate-400 ml-1.5">拍面夾角</span>
          </div>
          <span className="text-[11px] text-slate-300">
            {spinType === 'TOPSPIN'
              ? (language === 'zh-TW' ? '壓低拍面前傾快撕，防止飛出底線' : 'Close paddle face to prevent pop-up long')
              : (language === 'zh-TW' ? '立拍稍仰迎前撞摩，防止直接下網' : 'Open paddle face to avoid netting')}
          </span>
        </div>
      </div>
    </div>
  );
};
