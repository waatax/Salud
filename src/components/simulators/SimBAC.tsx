import React, { useState, useId } from 'react';
import { BeverageCategory, StomachState, SleepImpactBand } from '../../types';
import { useLanguage } from '../../i18n';
import {
  ShieldAlert,
  Car,
  Clock,
  Wine,
  Info,
  AlertTriangle,
  Moon,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SimBAC: React.FC = () => {
  const { t, language } = useLanguage();
  const formId = useId();

  // Inputs
  const [beverageCategory, setBeverageCategory] = useState<BeverageCategory>('BEER');
  const [volumeMl, setVolumeMl] = useState<number>(330);
  const [abvPercentage, setAbvPercentage] = useState<number>(5.0);
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(70);
  const [biologicalSex, setBiologicalSex] = useState<'MALE' | 'FEMALE'>('MALE');
  const [stomachState, setStomachState] = useState<StomachState>('LIGHT_MEAL');
  const [withCarbonation, setWithCarbonation] = useState<boolean>(false);
  const [drinkingDurationHours, setDrinkingDurationHours] = useState<number>(1.5);
  const [showDataTable, setShowDataTable] = useState<boolean>(false);

  // Preset handler
  const handlePresetSelect = (category: BeverageCategory) => {
    setBeverageCategory(category);
    if (category === 'BEER') {
      setVolumeMl(330);
      setAbvPercentage(5.0);
    } else if (category === 'WINE') {
      setVolumeMl(120);
      setAbvPercentage(13.5);
    } else if (category === 'SOJU_SAKE') {
      setVolumeMl(180);
      setAbvPercentage(17.0);
    } else if (category === 'SPIRITS') {
      setVolumeMl(45);
      setAbvPercentage(40.0);
    }
  };

  // Pure ethanol (g) = volume(mL) * (ABV/100) * 0.789
  const pureEthanolGrams = Math.round(volumeMl * (abvPercentage / 100) * 0.789 * 10) / 10;
  const standardDrinks = Math.round((pureEthanolGrams / 10) * 10) / 10;

  // Widmark Kinetic Calculation with Uncertainty Bands
  // r_factor: male ~ 0.68 (range 0.62–0.74), female ~ 0.55 (range 0.50–0.60)
  const r_low = biologicalSex === 'MALE' ? 0.74 : 0.60;
  const r_high = biologicalSex === 'MALE' ? 0.62 : 0.50;

  // Absorption rate ka
  let ka = 1.8;
  if (stomachState === 'FASTING') ka = 3.5;
  if (stomachState === 'FULL_MEAL') ka = 0.9;
  if (withCarbonation) ka *= 1.25;

  // Elimination beta: 0.015 – 0.020 g/dL/hr (or g% per hr)
  const beta_low = 0.020; // faster elimination -> lower BAC
  const beta_high = 0.015; // slower elimination -> higher BAC

  // Bioavailability F
  const F = 0.88;

  // Generate dynamic curve points (t from 0 to 10 hours)
  const curvePoints: { hour: number; bacLow: number; bacHigh: number }[] = [];
  let maxBacLow = 0;
  let maxBacHigh = 0;
  let peakHourLow = 0;
  let peakHourHigh = 0;
  let zeroHourLow = 0;
  let zeroHourHigh = 0;

  for (let tStep = 0; tStep <= 10; tStep += 0.5) {
    // Model: C(t) = [A * F / (r * W * 10)] * (1 - e^(-ka * t)) - beta * t
    // Note: W in kg, A in g. To convert to g/dL (BAC %): A / (r * W * 10)
    const doseEffectLow = (pureEthanolGrams * F) / (r_low * bodyWeightKg * 10);
    const doseEffectHigh = (pureEthanolGrams * F) / (r_high * bodyWeightKg * 10);

    const absorbTerm = 1 - Math.exp(-ka * tStep);
    let valLow = doseEffectLow * absorbTerm - beta_low * Math.max(0, tStep - 0.2);
    let valHigh = doseEffectHigh * absorbTerm - beta_high * Math.max(0, tStep - 0.2);

    if (valLow < 0) valLow = 0;
    if (valHigh < 0) valHigh = 0;

    if (valLow > maxBacLow) {
      maxBacLow = valLow;
      peakHourLow = tStep;
    }
    if (valHigh > maxBacHigh) {
      maxBacHigh = valHigh;
      peakHourHigh = tStep;
    }

    if (tStep > 0.5 && valLow === 0 && zeroHourLow === 0) {
      zeroHourLow = tStep;
    }
    if (tStep > 0.5 && valHigh === 0 && zeroHourHigh === 0) {
      zeroHourHigh = tStep;
    }

    curvePoints.push({
      hour: tStep,
      bacLow: Math.round(valLow * 1000) / 1000,
      bacHigh: Math.round(valHigh * 1000) / 1000,
    });
  }

  if (zeroHourLow === 0) zeroHourLow = 8.5;
  if (zeroHourHigh === 0) zeroHourHigh = 10.0;

  // Sleep Impact Evaluation
  let sleepBand: SleepImpactBand = 'MINIMAL';
  let sleepNarrativeZh = '睡前若體內酒精接近歸零，對整夜 REM 睡眠與自律神經干擾相對輕微。';
  let sleepNarrativeEn = 'Minimal sleep architecture disruption if BAC is near zero before bedtime.';

  if (maxBacHigh >= 0.02 && maxBacHigh < 0.05) {
    sleepBand = 'LOW';
    sleepNarrativeZh = '低度殘留：後半夜易引發輕度自律神經反彈與心率微幅上升，多夢微覺醒。';
    sleepNarrativeEn = 'Low impact: Subtle autonomic rebound and slight elevation in heart rate in second half of night.';
  } else if (maxBacHigh >= 0.05 && maxBacHigh < 0.08) {
    sleepBand = 'MODERATE';
    sleepNarrativeZh = '中度衝擊：快速動眼期（REM）被壓制 30–50%，深度睡眠碎片化，隔晨疲憊腦霧。';
    sleepNarrativeEn = 'Moderate impact: REM sleep suppressed by 30-50%, sleep fragmentation, next-day brain fog.';
  } else if (maxBacHigh >= 0.08) {
    sleepBand = 'SEVERE';
    sleepNarrativeZh = '重度破壞：大腦皮質被迫化學麻醉，REM 崩解，夜間心率持續飆高 15–20 bpm，生理恢復力停滯。';
    sleepNarrativeEn = 'Severe disruption: Chemical sedation, total REM collapse, resting heart rate elevated by 15-20 bpm.';
  }

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-alcohol-purple/40 bg-slate-900/80 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* ── Hard Constraint Banner: ABSOLUTE DRIVING BAN (Spec §16.3) ── */}
      <div className="p-4 rounded-2xl border-2 border-red-500 bg-red-950/80 text-red-100 space-y-2 shadow-lg">
        <div className="flex items-center gap-2.5 text-red-400 font-display font-extrabold text-sm sm:text-base">
          <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 animate-pulse" />
          <span>{t('bac.driving_ban_alert')}</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-red-800/80 text-xs">
          <span className="px-2 py-0.5 rounded bg-red-900/90 text-red-200 font-mono text-[11px] font-bold border border-red-700">
            {t('bac.driving_statement_badge')}
          </span>
          <a
            href="tel:55688"
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs transition-all shadow-md"
          >
            <Car className="w-3.5 h-3.5" />
            <span>{t('bac.safe_ride_btn')}</span>
          </a>
        </div>
      </div>

      {/* ── Title & Intro ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2">
            <Wine className="w-5 h-5 text-salud-alcohol-purple" />
            {t('bac.title')}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Extended Widmark Kinetic Model · First-Order Absorption & Zero-Order Clearance
          </p>
        </div>
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => handlePresetSelect('BEER')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              beverageCategory === 'BEER' ? 'bg-salud-alcohol-purple text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            啤酒
          </button>
          <button
            onClick={() => handlePresetSelect('WINE')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              beverageCategory === 'WINE' ? 'bg-salud-alcohol-purple text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            紅白酒
          </button>
          <button
            onClick={() => handlePresetSelect('SOJU_SAKE')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              beverageCategory === 'SOJU_SAKE' ? 'bg-salud-alcohol-purple text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            清酒/燒酒
          </button>
          <button
            onClick={() => handlePresetSelect('SPIRITS')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              beverageCategory === 'SPIRITS' ? 'bg-salud-alcohol-purple text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            烈酒
          </button>
        </div>
      </div>

      {/* ── Interactive Input Matrix ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Volume */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex justify-between text-slate-300">
            <label htmlFor={`${formId}-volume`}>{t('bac.volume')}</label>
            <strong className="text-salud-cyan font-mono">{volumeMl} mL</strong>
          </div>
          <input
            id={`${formId}-volume`}
            type="range"
            min="20"
            max="1500"
            step="10"
            value={volumeMl}
            onChange={(e) => setVolumeMl(Number(e.target.value))}
            className="w-full accent-salud-cyan cursor-pointer"
          />
        </div>

        {/* ABV */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex justify-between text-slate-300">
            <label htmlFor={`${formId}-abv`}>{t('bac.abv')}</label>
            <strong className="text-salud-amber font-mono">{abvPercentage} %</strong>
          </div>
          <input
            id={`${formId}-abv`}
            type="range"
            min="1"
            max="60"
            step="0.5"
            value={abvPercentage}
            onChange={(e) => setAbvPercentage(Number(e.target.value))}
            className="w-full accent-salud-amber cursor-pointer"
          />
        </div>

        {/* Body Weight */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex justify-between text-slate-300">
            <label htmlFor={`${formId}-weight`}>{t('bac.weight')}</label>
            <strong className="text-white font-mono">{bodyWeightKg} kg</strong>
          </div>
          <input
            id={`${formId}-weight`}
            type="range"
            min="40"
            max="130"
            step="1"
            value={bodyWeightKg}
            onChange={(e) => setBodyWeightKg(Number(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer"
          />
        </div>

        {/* Sex */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <span className="text-slate-300 block">{t('bac.sex')}</span>
          <div className="flex gap-2 pt-0.5">
            <button
              onClick={() => setBiologicalSex('MALE')}
              className={`flex-1 py-1 rounded-lg border text-center font-mono text-[11px] transition-all ${
                biologicalSex === 'MALE'
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
            >
              {t('bac.male')}
            </button>
            <button
              onClick={() => setBiologicalSex('FEMALE')}
              className={`flex-1 py-1 rounded-lg border text-center font-mono text-[11px] transition-all ${
                biologicalSex === 'FEMALE'
                  ? 'border-purple-400 bg-purple-950/60 text-purple-300 font-bold'
                  : 'border-slate-700 bg-slate-800 text-slate-400'
              }`}
            >
              {t('bac.female')}
            </button>
          </div>
        </div>

        {/* Stomach State */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 sm:col-span-2">
          <label htmlFor={`${formId}-stomach`} className="text-slate-300 block">{t('bac.stomach_state')}</label>
          <select
            id={`${formId}-stomach`}
            value={stomachState}
            onChange={(e) => setStomachState(e.target.value as StomachState)}
            className="w-full p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-salud-alcohol-purple"
          >
            <option value="FASTING">{t('bac.fasting')}</option>
            <option value="LIGHT_MEAL">{t('bac.light_meal')}</option>
            <option value="FULL_MEAL">{t('bac.full_meal')}</option>
          </select>
        </div>

        {/* Carbonation Toggle */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 sm:col-span-2 flex items-center justify-between">
          <div>
            <label htmlFor={`${formId}-carbonation`} className="text-slate-300 block font-medium cursor-pointer">{t('bac.carbonation')}</label>
            <span className="text-[10px] text-slate-500 block">促使胃幽門開啟加速湧入小腸</span>
          </div>
          <input
            id={`${formId}-carbonation`}
            type="checkbox"
            checked={withCarbonation}
            onChange={(e) => setWithCarbonation(e.target.checked)}
            className="w-5 h-5 accent-salud-amber rounded cursor-pointer"
          />
        </div>
      </div>

      {/* ── Key Mathematical Projections (Uncertainty Bands) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] block">{t('bac.pure_ethanol')}</span>
          <strong className="text-lg text-white font-bold">{pureEthanolGrams} g</strong>
          <span className="text-[10px] text-slate-500 block">≈ {standardDrinks} 標準杯</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/60 space-y-1">
          <span className="text-purple-300 text-[11px] block">{t('bac.peak_bac')}</span>
          <strong className="text-lg text-purple-300 font-bold">
            {maxBacLow.toFixed(3)}% – {maxBacHigh.toFixed(3)}%
          </strong>
          <span className="text-[10px] text-purple-400 block">帶預測區間 (g/dL)</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] block">{t('bac.peak_window')}</span>
          <strong className="text-lg text-salud-cyan font-bold">
            約 {Math.round(peakHourLow * 60)}–{Math.round(peakHourHigh * 60)} 分
          </strong>
          <span className="text-[10px] text-slate-500 block">受胃排空控制</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-[11px] block">{t('bac.clearance_window')}</span>
          <strong className="text-lg text-salud-amber font-bold">
            約 {zeroHourLow}–{zeroHourHigh} 小時
          </strong>
          <span className="text-[10px] text-slate-500 block">零階消除速率</span>
        </div>
      </div>

      {/* ── Dynamic Kinetic SVG Curve ── */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-salud-cyan" />
            動態血中濃度時間推估曲線 (帶不確定性預測區間帶)
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            模型誤差 ±30–40% · 僅供生理形狀觀察
          </span>
        </div>

        {/* SVG Curve Canvas */}
        <div className="h-44 w-full relative">
          <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
            {/* Grid lines */}
            <line x1="40" y1="20" x2="480" y2="20" stroke="#334155" strokeDasharray="3,3" strokeWidth="0.8" />
            <line x1="40" y1="60" x2="480" y2="60" stroke="#334155" strokeDasharray="3,3" strokeWidth="0.8" />
            <line x1="40" y1="100" x2="480" y2="100" stroke="#334155" strokeDasharray="3,3" strokeWidth="0.8" />
            <line x1="40" y1="140" x2="480" y2="140" stroke="#64748b" strokeWidth="1.2" />

            {/* Y axis labels */}
            <text x="32" y="24" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">0.08%</text>
            <text x="32" y="64" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">0.05%</text>
            <text x="32" y="104" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">0.02%</text>
            <text x="32" y="144" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">0.00%</text>

            {/* X axis labels */}
            <text x="40" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">0h</text>
            <text x="128" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">2h</text>
            <text x="216" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">4h</text>
            <text x="304" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">6h</text>
            <text x="392" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">8h</text>
            <text x="480" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">10h</text>

            {/* Uncertainty Area */}
            {(() => {
              const scaleY = 140 / 0.10; // 0.10% = 140px
              const scaleX = (480 - 40) / 10;

              const upperPath = curvePoints
                .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${40 + pt.hour * scaleX} ${Math.max(15, 140 - pt.bacHigh * scaleY)}`)
                .join(' ');

              const lowerRev = [...curvePoints]
                .reverse()
                .map((pt) => `L ${40 + pt.hour * scaleX} ${Math.max(15, 140 - pt.bacLow * scaleY)}`)
                .join(' ');

              const areaD = `${upperPath} ${lowerRev} Z`;

              return (
                <>
                  <path d={areaD} fill="#c084fc" fillOpacity="0.2" />
                  <path
                    d={upperPath}
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                  <path
                    d={curvePoints
                      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${40 + pt.hour * scaleX} ${Math.max(15, 140 - pt.bacLow * scaleY)}`)
                      .join(' ')}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                  />
                </>
              );
            })()}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-cyan-400" /> 下界估計 (代謝較快)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-purple-400 border-dashed" /> 上界估計 (代謝較慢)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-purple-500/20 border border-purple-500/40 rounded-sm" /> 族群預測不確定性區間
            </span>
          </div>
          <button
            onClick={() => setShowDataTable(!showDataTable)}
            className="hover:text-salud-amber flex items-center gap-1"
          >
            {showDataTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showDataTable ? t('fig.hide_datatable') : t('fig.datatable')}
          </button>
        </div>

        {/* Equivalent Data Table (Spec §10.6 S-09) */}
        {showDataTable && (
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left font-mono text-[10px] text-slate-300 border border-slate-800">
              <caption className="text-left font-bold text-slate-400 py-1">
                BAC 動態時間濃度等價資料表 (g/dL)
              </caption>
              <thead className="bg-slate-900 border-b border-slate-800">
                <tr>
                  <th scope="col" className="p-1.5">時間 (小時)</th>
                  <th scope="col" className="p-1.5">下界 BAC (低脂/快速消除)</th>
                  <th scope="col" className="p-1.5">上界 BAC (高體脂/慢速消除)</th>
                </tr>
              </thead>
              <tbody>
                {curvePoints.map((row) => (
                  <tr key={row.hour} className="border-b border-slate-800/40 hover:bg-slate-800/30">
                    <td className="p-1.5">{row.hour} hr</td>
                    <td className="p-1.5 text-cyan-300">{row.bacLow.toFixed(3)} %</td>
                    <td className="p-1.5 text-purple-300">{row.bacHigh.toFixed(3)} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Sleep Impact Card ── */}
      <div className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-colors ${
        sleepBand === 'SEVERE'
          ? 'border-red-500/60 bg-red-950/30'
          : sleepBand === 'MODERATE'
          ? 'border-amber-500/60 bg-amber-950/30'
          : sleepBand === 'LOW'
          ? 'border-purple-500/60 bg-purple-950/30'
          : 'border-emerald-500/60 bg-emerald-950/30'
      }`}>
        <Moon className={`w-5 h-5 shrink-0 mt-0.5 ${
          sleepBand === 'SEVERE' ? 'text-red-400' : sleepBand === 'MODERATE' ? 'text-amber-400' : 'text-purple-400'
        }`} />
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <strong className="text-sm font-bold text-white">
              {t('bac.sleep_impact')}：
              <span className={
                sleepBand === 'SEVERE' ? 'text-red-400' : sleepBand === 'MODERATE' ? 'text-amber-400' : 'text-purple-400'
              }>
                {sleepBand}
              </span>
            </strong>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            {language === 'zh-TW' ? sleepNarrativeZh : sleepNarrativeEn}
          </p>
        </div>
      </div>
    </div>
  );
};
