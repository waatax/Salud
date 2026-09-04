import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Zap, Gauge, Flame, Mountain, Wind, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import { COGGAN_POWER_ZONES } from '../../data/cyclingData';

export const SimCyclingPower: React.FC = () => {
  const { language } = useLanguage();

  const [ftpWatts, setFtpWatts] = useState<number>(220);
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(68);
  const [bikeWeightKg, setBikeWeightKg] = useState<number>(9);
  const [slopeGradient, setSlopeGradient] = useState<number>(7); // in percent: 0, 3, 7, 10
  const [targetPctFtp, setTargetPctFtp] = useState<number>(90); // default at sweet spot

  // Calculations
  const ftpWkg = Number((ftpWatts / bodyWeightKg).toFixed(2));
  const targetWatts = Math.round((ftpWatts * targetPctFtp) / 100);
  const targetWkg = Number((targetWatts / bodyWeightKg).toFixed(2));
  const totalMassKg = bodyWeightKg + bikeWeightKg;

  // Power zone classification
  const getZoneIndex = (pct: number) => {
    if (pct < 55) return 0;
    if (pct <= 75) return 1;
    if (pct <= 90) return 2;
    if (pct <= 105) return 3;
    if (pct <= 120) return 4;
    if (pct <= 150) return 5;
    return 6;
  };
  const activeZoneIdx = getZoneIndex(targetPctFtp);
  const activeZone = COGGAN_POWER_ZONES[activeZoneIdx];

  // Coggan FTP Level
  const getFtpLevel = (wkg: number) => {
    if (wkg < 2.0) return { labelZh: '休閒騎乘 (Untrained)', labelEn: 'Untrained / Recreational', color: 'text-slate-400' };
    if (wkg < 2.9) return { labelZh: '俱樂部入門 (Fair / Cat 5)', labelEn: 'Fair / Club Rider', color: 'text-blue-400' };
    if (wkg < 3.8) return { labelZh: '業餘挑戰中堅 (Moderate / Cat 4)', labelEn: 'Moderate / Cat 4', color: 'text-emerald-400' };
    if (wkg < 4.5) return { labelZh: '菁英選手群 (Very Good / Cat 2-3)', labelEn: 'Very Good / Cat 2-3', color: 'text-amber-400' };
    if (wkg < 5.4) return { labelZh: '國手/全國頂尖 (Excellent / Cat 1)', labelEn: 'National Elite / Cat 1', color: 'text-purple-400' };
    return { labelZh: '世界巡迴職業水準 (World Tour Pro)', labelEn: 'World Tour Pro (>5.4 W/kg)', color: 'text-rose-400' };
  };
  const ftpLevel = getFtpLevel(ftpWkg);

  // Speed and VAM calculation (standard cycling road model)
  // P_mech = P_climb + P_rr + P_aero
  // Solve iteratively for speed (m/s)
  const g = 9.80665;
  const crr = 0.004; // low rolling resistance road tire
  const cda = 0.32; // hoods/drops road position
  const rho = 1.205; // air density at sea level/mild altitude
  const drivetrainEfficiency = 0.975;
  const availableWatts = targetWatts * drivetrainEfficiency;
  const gradeSin = Math.sin(Math.atan(slopeGradient / 100));
  const gradeCos = Math.cos(Math.atan(slopeGradient / 100));

  let speedMps = 5; // initial guess
  for (let i = 0; i < 20; i++) {
    const fGravity = totalMassKg * g * gradeSin;
    const fRolling = totalMassKg * g * gradeCos * crr;
    const fAero = 0.5 * rho * cda * (speedMps * speedMps);
    const totalPowerReq = (fGravity + fRolling + fAero) * speedMps;
    const diff = availableWatts - totalPowerReq;
    const derivative = fGravity + fRolling + 1.5 * rho * cda * (speedMps * speedMps);
    speedMps += diff / (derivative || 1);
    if (speedMps < 0.5) speedMps = 0.5;
  }
  const speedKmh = Number((speedMps * 3.6).toFixed(1));

  // VAM (Vertical Ascent Meters/hr) = (Vertical speed m/s) * 3600
  const verticalSpeedMps = speedMps * gradeSin;
  const vamMph = slopeGradient > 0 ? Math.round(verticalSpeedMps * 3600) : 0;
  const minutesFor1000m = vamMph > 0 ? Math.round((1000 / vamMph) * 60) : 0;

  // Carb intake recommendation per hour
  const getCarbRecommendation = (pct: number) => {
    if (pct < 55) return { gPerHour: '20–30g', fuelSourceZh: '90% 脂肪酸氧化，醣類消耗極低', fuelSourceEn: '90% Fat oxidation, minimal glycogen' };
    if (pct <= 75) return { gPerHour: '30–60g', fuelSourceZh: '主要燃脂 (FatMax 區間)，維持肌醣原儲存', fuelSourceEn: 'FatMax aerobic zone, steady carb sparing' };
    if (pct <= 90) return { gPerHour: '60–75g', fuelSourceZh: '醣類與脂肪各半混合燃燒，需定時定量補膠', fuelSourceEn: 'Mixed carbohydrate-fat balance, steady fuel required' };
    if (pct <= 105) return { gPerHour: '80–90g', fuelSourceZh: '幾乎純肌醣原與血糖無氧有氧酵解，極度依賴外源葡萄糖', fuelSourceEn: 'Glycogen dominant; relies on high dual-source carbs' };
    return { gPerHour: '90–120g', fuelSourceZh: '極限酵解與乳酸推升，需雙通道 (果糖:葡萄糖 1:0.8) 吸收極限', fuelSourceEn: 'Maximal glycolytic demand; dual-transporter (1:0.8) max' };
  };
  const carbInfo = getCarbRecommendation(targetPctFtp);

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/50 bg-slate-900/95 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-salud-cyan" />
            {language === 'zh-TW' ? '自行車 FTP 功率分區與爬坡 VAM 計算機' : 'Cycling FTP Power Zones & VAM Climbing Calculator'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Coggan 7-Zone System, W/kg Classification, Aerodynamic Resistance & Carb Intake
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-700 text-cyan-300">
          Coggan 7-Zone
        </span>
      </div>

      {/* Inputs Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        {/* FTP Input */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? 'FTP 臨界功率' : 'FTP Threshold'}</label>
            <strong className="text-salud-cyan text-base font-bold">{ftpWatts} W</strong>
          </div>
          <input
            type="range"
            min="120"
            max="420"
            step="5"
            value={ftpWatts}
            onChange={(e) => setFtpWatts(Number(e.target.value))}
            className="w-full accent-salud-cyan cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{language === 'zh-TW' ? '功重比' : 'W/kg'}: <strong className="text-emerald-400">{ftpWkg} W/kg</strong></span>
            <span className={ftpLevel.color}>{language === 'zh-TW' ? ftpLevel.labelZh.split(' ')[0] : ftpLevel.labelEn.split(' ')[0]}</span>
          </div>
        </div>

        {/* Body Weight */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '體重 (kg)' : 'Rider Weight (kg)'}</label>
            <strong className="text-salud-cyan text-base font-bold">{bodyWeightKg} kg</strong>
          </div>
          <input
            type="range"
            min="45"
            max="105"
            step="1"
            value={bodyWeightKg}
            onChange={(e) => setBodyWeightKg(Number(e.target.value))}
            className="w-full accent-salud-cyan cursor-pointer"
          />
          <div className="text-[11px] text-slate-400">
            {language === 'zh-TW' ? '單車+裝備重' : 'Bike + Gear'}: <span className="text-slate-300">{bikeWeightKg} kg</span> (總重 {totalMassKg} kg)
          </div>
        </div>

        {/* Slope Gradient */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '路線坡度' : 'Route Gradient'}</label>
            <strong className="text-salud-cyan text-base font-bold">{slopeGradient}%</strong>
          </div>
          <div className="grid grid-cols-4 gap-1 pt-1">
            {[0, 3, 7, 10].map((grade) => (
              <button
                key={grade}
                onClick={() => setSlopeGradient(grade)}
                className={`py-1 rounded-lg text-center font-bold text-[11px] transition-all ${
                  slopeGradient === grade
                    ? 'bg-cyan-600 text-white shadow'
                    : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {grade === 0 ? (language === 'zh-TW' ? '平路' : 'Flat') : `${grade}%`}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-slate-400">
            {slopeGradient === 0 && (language === 'zh-TW' ? '空氣阻力佔 85% 以上' : 'Aero drag dominates >85%')}
            {slopeGradient === 3 && (language === 'zh-TW' ? '丘陵滾動地形 (Rolling hills)' : 'Rolling hills profile')}
            {slopeGradient === 7 && (language === 'zh-TW' ? '經典大山坡度 (阿里山/塔塔加)' : 'Classic alpine grade (7%)')}
            {slopeGradient === 10 && (language === 'zh-TW' ? '陡坡終極挑戰 (武嶺大禹嶺/HC級)' : 'Steep alpine wall (10% HC)')}
          </div>
        </div>

        {/* Target Power Output */}
        <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <label className="font-semibold">{language === 'zh-TW' ? '輸出強度 (% FTP)' : 'Effort (% FTP)'}</label>
            <strong className="text-amber-400 text-base font-bold">{targetPctFtp}%</strong>
          </div>
          <input
            type="range"
            min="50"
            max="140"
            step="5"
            value={targetPctFtp}
            onChange={(e) => setTargetPctFtp(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{targetWatts} W</span>
            <span className="text-amber-300 font-bold">{targetWkg} W/kg</span>
          </div>
        </div>
      </div>

      {/* Physics Output Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Estimated Speed */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>{language === 'zh-TW' ? '預估巡航速度' : 'Estimated Speed'}</span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-white font-mono">{speedKmh}</span>
            <span className="text-xs text-slate-400 ml-1.5">km/h</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {slopeGradient === 0
              ? (language === 'zh-TW' ? `平路輸出 ${targetWatts}W 下維持巡航。風阻隨速度三次方劇增。` : `Flat cruising at ${targetWatts}W. Aero drag scales with V³.`)
              : (language === 'zh-TW' ? `${slopeGradient}% 坡道對抗重力。體重每少 1kg 在此坡度可省約 3–4 瓦。` : `Climbing ${slopeGradient}%. Losing 1kg saves ~3-4W on this slope.`)}
          </p>
        </div>

        {/* VAM & Climbing Rate */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
            <Mountain className="w-4 h-4 text-emerald-400" />
            <span>{language === 'zh-TW' ? '垂直爬升率 (VAM)' : 'Vertical Ascent Rate'}</span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">{vamMph}</span>
            <span className="text-xs text-slate-400 ml-1.5">m / hr</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {vamMph > 0 ? (
              language === 'zh-TW'
                ? `爬升 1,000 公尺高度約需 ${minutesFor1000m} 分鐘 (${(minutesFor1000m / 60).toFixed(1)} 小時)。`
                : `Climbing 1,000 vertical meters takes ~${minutesFor1000m} min (${(minutesFor1000m / 60).toFixed(1)} hrs).`
            ) : (
              language === 'zh-TW' ? '平地無爬升率指標。' : 'No VAM on flat terrain.'
            )}
          </p>
        </div>

        {/* Carb Fueling & Hydration */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{language === 'zh-TW' ? '每小時碳水補給策略' : 'Carb Fueling / Hour'}</span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">{carbInfo.gPerHour}</span>
            <span className="text-xs text-slate-400 ml-1.5">carbs / hr</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {language === 'zh-TW' ? carbInfo.fuelSourceZh : carbInfo.fuelSourceEn}
          </p>
        </div>
      </div>

      {/* Coggan 7-Zone Dynamic Breakdown */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-salud-cyan" />
            {language === 'zh-TW' ? '個人化 Coggan 7 區功率盤 (基於 FTP 換算)' : 'Personalized Coggan 7-Zone Chart (Calculated from FTP)'}
          </h4>
          <span className="text-[11px] font-mono text-cyan-400">
            {language === 'zh-TW' ? `當前選取：${activeZone.name_zh}` : `Current: ${activeZone.name_en}`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2 px-2">區間</th>
                <th className="py-2 px-2">名稱</th>
                <th className="py-2 px-2">瓦數範圍</th>
                <th className="py-2 px-2 hidden sm:table-cell">% FTP</th>
                <th className="py-2 px-2 hidden md:table-cell">生理適應與代謝目標</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {COGGAN_POWER_ZONES.map((z, idx) => {
                let minW = 0;
                let maxW = 0;
                if (idx === 0) { maxW = Math.round(ftpWatts * 0.55); }
                else if (idx === 1) { minW = Math.round(ftpWatts * 0.56); maxW = Math.round(ftpWatts * 0.75); }
                else if (idx === 2) { minW = Math.round(ftpWatts * 0.76); maxW = Math.round(ftpWatts * 0.90); }
                else if (idx === 3) { minW = Math.round(ftpWatts * 0.91); maxW = Math.round(ftpWatts * 1.05); }
                else if (idx === 4) { minW = Math.round(ftpWatts * 1.06); maxW = Math.round(ftpWatts * 1.20); }
                else if (idx === 5) { minW = Math.round(ftpWatts * 1.21); maxW = Math.round(ftpWatts * 1.50); }
                else { minW = Math.round(ftpWatts * 1.51); maxW = 999; }

                const isCurrent = idx === activeZoneIdx;

                return (
                  <tr
                    key={z.zone}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-cyan-950/60 border-l-4 border-salud-cyan font-bold text-white'
                        : 'hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <td className="py-2 px-2 font-bold text-salud-cyan">{z.zone}</td>
                    <td className="py-2 px-2">
                      {language === 'zh-TW' ? z.name_zh.split(' · ')[1] : z.name_en.split(' · ')[1]}
                    </td>
                    <td className="py-2 px-2 font-bold text-amber-300">
                      {idx === 0 && `< ${maxW} W`}
                      {idx > 0 && idx < 6 && `${minW} – ${maxW} W`}
                      {idx === 6 && `> ${minW} W`}
                    </td>
                    <td className="py-2 px-2 hidden sm:table-cell text-slate-400">{z.ftp_pct_range}</td>
                    <td className="py-2 px-2 hidden md:table-cell text-[11px] text-slate-400">
                      {language === 'zh-TW' ? z.physiological_adaptation_zh : z.physiological_adaptation_en}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
