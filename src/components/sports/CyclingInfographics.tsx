import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { CYCLING_INFOGRAPHICS, COGGAN_POWER_ZONES } from '../../data/cyclingData';
import { Bike, Wind, Gauge, CheckCircle2, Zap } from 'lucide-react';

export const CyclingInfographics: React.FC = () => {
  const { language } = useLanguage();

  // Interactive State for Infographic 1: Coggan Zone
  const [selectedZoneIdx, setSelectedZoneIdx] = useState<number>(1); // Default Z2

  // Interactive State for Infographic 2: Aerodynamics & Speed
  const [speedKmh, setSpeedKmh] = useState<number>(35);
  const [ridingPosition, setRidingPosition] = useState<'UPRIGHT' | 'AERO_HOODS' | 'TT_BARS'>('AERO_HOODS');

  const getAeroData = (speed: number, pos: 'UPRIGHT' | 'AERO_HOODS' | 'TT_BARS') => {
    const cda = pos === 'UPRIGHT' ? 0.38 : pos === 'AERO_HOODS' ? 0.28 : 0.22;
    // Power = 0.5 * 1.225 * cda * (v/3.6)^3 + 0.004 * 75 * 9.81 * (v/3.6)
    const vMs = speed / 3.6;
    const aeroWatts = Math.round(0.5 * 1.225 * cda * Math.pow(vMs, 3));
    const rollingWatts = Math.round(0.004 * 75 * 9.81 * vMs);
    const totalWatts = aeroWatts + rollingWatts;
    const aeroPct = Math.round((aeroWatts / totalWatts) * 100);
    return { cda, aeroWatts, rollingWatts, totalWatts, aeroPct };
  };

  const aeroData = getAeroData(speedKmh, ridingPosition);

  // Interactive State for Infographic 3: Cadence
  const [cadenceRpm, setCadenceRpm] = useState<number>(90);
  const getCadenceData = (rpm: number) => {
    const torqueLoad = rpm < 70 ? '高 (關節髕骨受壓巨大)' : rpm < 100 ? '適中 (慢肌耐受最優)' : '低 (幾乎無機械力矩負擔)';
    const cardioCost = rpm < 70 ? '低 (心率平緩)' : rpm < 100 ? '均衡 (有氧心率最佳)' : '極高 (心肺呼吸換氣代價大)';
    const fatigueMode = rpm < 70 ? 'Type II 快肌醣原急速耗竭' : rpm < 100 ? '有氧代謝最佳平衡' : '中樞呼吸神經衰竭';
    return { torqueLoad, cardioCost, fatigueMode };
  };

  const cadenceData = getCadenceData(cadenceRpm);

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-500 border border-blue-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '自行車功率科學三大核心可視化教學圖解' : 'Cycling Power Science: 3 Core Visual Pedagogical Infographics'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Coggan 7-Zone Power Spectrum, Aerodynamic Drag Exponential Law, Cadence Torque Sweetspot
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Coggan 7-Zone Spectrum ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-blue-500 font-bold block">
                {CYCLING_INFOGRAPHICS[0].id} · {CYCLING_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? CYCLING_INFOGRAPHICS[0].title_zh : CYCLING_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <Gauge className="w-5 h-5 text-blue-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? CYCLING_INFOGRAPHICS[0].subtitle_zh : CYCLING_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Zone Buttons */}
          <div className="grid grid-cols-7 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold">
            {COGGAN_POWER_ZONES.map((z, idx) => (
              <button
                key={z.zone}
                onClick={() => setSelectedZoneIdx(idx)}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  selectedZoneIdx === idx
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {z.zone}
              </button>
            ))}
          </div>

          {/* Selected Zone Spotlight Card */}
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-blue-800 dark:text-blue-300">
                {language === 'zh-TW' ? COGGAN_POWER_ZONES[selectedZoneIdx].name_zh : COGGAN_POWER_ZONES[selectedZoneIdx].name_en}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold">
                {COGGAN_POWER_ZONES[selectedZoneIdx].ftp_pct_range}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {language === 'zh-TW' ? COGGAN_POWER_ZONES[selectedZoneIdx].physiological_adaptation_zh : COGGAN_POWER_ZONES[selectedZoneIdx].physiological_adaptation_en}
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-0.5">
              主導能量系統：{COGGAN_POWER_ZONES[selectedZoneIdx].target_metabolic_system}
            </div>
          </div>

          {/* SVG Coggan Spectrum Gauge */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Coggan Power Zones Spectrum">
                {/* 7 Zone Stacked Blocks */}
                {COGGAN_POWER_ZONES.map((z, idx) => {
                  const x = 30 + idx * 46;
                  const colors = ['#94a3b8', '#10b981', '#06b6d4', '#f59e0b', '#f97316', '#ef4444', '#7c3aed'];
                  const isSelected = selectedZoneIdx === idx;
                  return (
                    <g key={z.zone} onClick={() => setSelectedZoneIdx(idx)} className="cursor-pointer">
                      <rect
                        x={x}
                        y={140 - (idx + 1) * 16}
                        width="40"
                        height={(idx + 1) * 16}
                        rx="6"
                        fill={colors[idx]}
                        fillOpacity={isSelected ? 1 : 0.45}
                        stroke={isSelected ? '#ffffff' : 'none'}
                        strokeWidth={2}
                      />
                      <text x={x + 20} y="155" fill={isSelected ? colors[idx] : '#94a3b8'} fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {z.zone}
                      </text>
                    </g>
                  );
                })}
                <line x1="25" y1="142" x2="360" y2="142" stroke="#64748b" strokeWidth="1.5" />
                <line x1="168" y1="20" x2="168" y2="140" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.5" />
                <text x="168" y="15" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">FTP 100%</text>
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {CYCLING_INFOGRAPHICS[0].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: Aerodynamic Drag Power Curve (v^3) ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-500 font-bold block">
                {CYCLING_INFOGRAPHICS[1].id} · {CYCLING_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? CYCLING_INFOGRAPHICS[1].title_zh : CYCLING_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <Wind className="w-5 h-5 text-cyan-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? CYCLING_INFOGRAPHICS[1].subtitle_zh : CYCLING_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* Interactive Riding Posture Toggle */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-mono font-bold">
            <button
              onClick={() => setRidingPosition('UPRIGHT')}
              className={`py-1.5 rounded-lg transition-all ${
                ridingPosition === 'UPRIGHT'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              立姿休閒 (CdA 0.38)
            </button>
            <button
              onClick={() => setRidingPosition('AERO_HOODS')}
              className={`py-1.5 rounded-lg transition-all ${
                ridingPosition === 'AERO_HOODS'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              彎肘破風 (CdA 0.28)
            </button>
            <button
              onClick={() => setRidingPosition('TT_BARS')}
              className={`py-1.5 rounded-lg transition-all ${
                ridingPosition === 'TT_BARS'
                  ? 'bg-nature-green-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              計時把 TT (CdA 0.22)
            </button>
          </div>

          {/* Interactive Speed Slider */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500 font-bold">平路巡航速度：</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold">
                {speedKmh} km/h ➔ 總需求功率 {aeroData.totalWatts} W
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={50}
              step={1}
              value={speedKmh}
              onChange={(e) => setSpeedKmh(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-[11px] pt-1">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                <span className="text-[9px] text-slate-400 block">空氣阻力功耗</span>
                <span className="font-extrabold text-xs">{aeroData.aeroWatts} W ({aeroData.aeroPct}%)</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <span className="text-[9px] text-slate-400 block">滾動摩擦功耗</span>
                <span className="font-extrabold text-xs">{aeroData.rollingWatts} W</span>
              </div>
            </div>
          </div>

          {/* SVG Power Curve vs Speed */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Cubic Drag Curve">
                {/* Axes */}
                <line x1="35" y1="20" x2="35" y2="140" stroke="#64748b" strokeWidth="1.5" />
                <line x1="35" y1="140" x2="365" y2="140" stroke="#64748b" strokeWidth="1.5" />

                {/* Y Axis Labels */}
                <text x="30" y="28" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">500W</text>
                <text x="30" y="80" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">250W</text>
                <text x="30" y="140" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">0W</text>

                {/* X Axis Labels */}
                <text x="35" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">20</text>
                <text x="145" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">30</text>
                <text x="255" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">40</text>
                <text x="365" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">50 km/h</text>

                {/* Rolling Resistance Linear Line */}
                <line x1="35" y1="135" x2="365" y2="115" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="320" y="110" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">滾動阻力 (線性增長)</text>

                {/* Total Aero Drag Cubic Curve */}
                <path
                  d="M 35 130 Q 180 115 255 75 T 365 25"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                />
                <text x="260" y="55" fill="#06b6d4" fontSize="9" fontWeight="bold" fontFamily="sans-serif">風阻功率 ~ v³ (立方劇增)</text>

                {/* Dynamic Marker */}
                {(() => {
                  const x = 35 + ((speedKmh - 20) / 30) * 330;
                  const y = Math.max(25, 140 - (aeroData.totalWatts / 500) * 115);
                  return (
                    <g>
                      <line x1={x} y1="20" x2={x} y2="140" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1.5" />
                      <circle cx={x} cy={y} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {CYCLING_INFOGRAPHICS[1].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: Cadence Torque vs Heart Rate U-Curve ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-nature-amber-500 font-bold block">
                {CYCLING_INFOGRAPHICS[2].id} · {CYCLING_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? CYCLING_INFOGRAPHICS[2].title_zh : CYCLING_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Zap className="w-5 h-5 text-nature-amber-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? CYCLING_INFOGRAPHICS[2].subtitle_zh : CYCLING_INFOGRAPHICS[2].subtitle_en}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500 font-bold">調節踏頻 (Cadence)：</span>
                <span className="font-extrabold text-nature-amber-600 dark:text-nature-amber-400">{cadenceRpm} RPM</span>
              </div>
              <input
                type="range"
                min={55}
                max={120}
                step={5}
                value={cadenceRpm}
                onChange={(e) => setCadenceRpm(Number(e.target.value))}
                className="w-full accent-nature-amber-500 cursor-pointer"
              />
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <div>關節扭矩負擔：<strong className="text-slate-900 dark:text-white">{cadenceData.torqueLoad}</strong></div>
                <div>心肺換氣代價：<strong className="text-slate-900 dark:text-white">{cadenceData.cardioCost}</strong></div>
                <div>疲勞主因：<strong className="text-nature-amber-600 dark:text-nature-amber-400">{cadenceData.fatigueMode}</strong></div>
              </div>
            </div>

            <div className="md:col-span-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
              <div className="h-40 w-full">
                <svg viewBox="0 0 460 150" className="w-full h-full" role="img" aria-label="Cadence Trade-off U-Curve">
                  {/* Sweet spot Zone */}
                  <rect x="180" y="15" width="100" height="110" fill="#10b981" fillOpacity="0.1" />
                  <text x="230" y="28" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">85–95 RPM 甜蜜點</text>

                  {/* Axes */}
                  <line x1="40" y1="125" x2="430" y2="125" stroke="#64748b" strokeWidth="1.5" />
                  <text x="50" y="140" fill="#94a3b8" fontSize="8" fontFamily="monospace">60 RPM (重齒硬踩)</text>
                  <text x="230" y="140" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">90 RPM (均衡流暢)</text>
                  <text x="410" y="140" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">120 RPM (超高轉踩踏)</text>

                  {/* Muscular Torque Curve (Red/Amber, falling from left to right) */}
                  <path d="M 50 25 C 100 45, 180 85, 410 115" fill="none" stroke="#ef4444" strokeWidth="3" />
                  <text x="75" y="40" fill="#ef4444" fontSize="8" fontWeight="bold">膝關節踏板扭矩 (Torque)</text>

                  {/* Cardiorespiratory Cost Curve (Blue, rising from left to right) */}
                  <path d="M 50 115 C 180 95, 260 55, 410 25" fill="none" stroke="#38bdf8" strokeWidth="3" />
                  <text x="350" y="40" fill="#38bdf8" fontSize="8" fontWeight="bold">心肺氧耗負擔 (HR/VO2)</text>

                  {/* Dynamic Marker */}
                  {(() => {
                    const x = 50 + ((cadenceRpm - 55) / 65) * 360;
                    return (
                      <g>
                        <line x1={x} y1="20" x2={x} y2="125" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                        <circle cx={x} cy={75} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                      </g>
                    );
                  })()}
                </svg>
              </div>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-2">
            {CYCLING_INFOGRAPHICS[2].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nature-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
