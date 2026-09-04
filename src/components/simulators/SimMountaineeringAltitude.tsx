import React, { useState } from 'react';
import { ALTITUDE_PROFILES } from '../../data/sportsScienceData';
import { useLanguage } from '../../i18n';
import { Mountain, AlertTriangle, ShieldAlert, CheckCircle2, HeartPulse, Compass, Activity } from 'lucide-react';

export const SimMountaineeringAltitude: React.FC = () => {
  const { t, language } = useLanguage();

  const [altitudeM, setAltitudeM] = useState<number>(3402); // Default to Paiyun Lodge (Yushan)

  // Lake Louise Score (LLS) 2018 Consensus Checklist
  const [headacheScore, setHeadacheScore] = useState<number>(1); // 0=None, 1=Mild, 2=Moderate, 3=Severe
  const [giScore, setGiScore] = useState<number>(1); // 0=None, 1=Poor appetite, 2=Nausea, 3=Severe vomiting
  const [fatigueScore, setFatigueScore] = useState<number>(1); // 0=None, 1=Mild, 2=Moderate, 3=Severe
  const [dizzinessScore, setDizzinessScore] = useState<number>(0); // 0=None, 1=Mild, 2=Moderate, 3=Severe

  // Total LLS score
  const totalLls = headacheScore + giScore + fatigueScore + dizzinessScore;
  const isAmsDiagnosed = headacheScore >= 1 && totalLls >= 3;
  const isSevereAms = totalLls >= 6 || giScore >= 3 || headacheScore >= 3;

  // Formula approximations for altitude barometric pressure and PiO2:
  // Barometric pressure: P = 101.325 * exp(-altitude / 8400) in kPa
  const pressureKpa = (101.325 * Math.exp(-altitudeM / 8400)).toFixed(1);
  const pressureMmhg = Math.round(Number(pressureKpa) * 7.50062);
  // Inspired PiO2 = 0.2093 * (P_mmhg - 47 mmHg water vapor)
  const pio2Mmhg = Math.round(Math.max(0, 0.2093 * (pressureMmhg - 47)));
  const seaLevelPio2 = Math.round(0.2093 * (760 - 47)); // ~149 mmHg
  const effectiveOxygenPct = Math.round((pio2Mmhg / seaLevelPio2) * 100);

  // Approximate resting SpO2 baseline for acclimatized vs non-acclimatized
  const estSpo2Acclimatized = Math.round(Math.max(70, Math.min(99, 99 - (altitudeM / 1000) * 3.5)));
  const estSpo2Acute = Math.round(Math.max(60, Math.min(98, 98 - (altitudeM / 1000) * 5.2)));

  // AMS risk category based on elevation
  const riskCategory =
    altitudeM < 2500
      ? { level: 'LOW', text_zh: '低風險區 (海平面至中海拔)', text_en: 'Low Risk Zone', color: 'text-emerald-400 border-emerald-600 bg-emerald-950/30' }
      : altitudeM < 3500
      ? { level: 'MODERATE', text_zh: '中度警戒區 (高山症常見門檻)', text_en: 'Moderate Risk (AMS Threshold)', color: 'text-amber-400 border-amber-600 bg-amber-950/30' }
      : altitudeM < 5000
      ? { level: 'HIGH', text_zh: '極高風險區 (玉山主峰/高海拔嚴寒)', text_en: 'High Risk (Severe Hypoxia)', color: 'text-red-400 border-red-600 bg-red-950/30' }
      : { level: 'EXTREME', text_zh: '極端缺氧區 (極需階梯適應)', text_en: 'Extreme Risk (HAPE/HACE Hazard)', color: 'text-purple-400 border-purple-600 bg-purple-950/30' };

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-amber/50 bg-slate-900/90 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Mountain className="w-5 h-5 text-salud-amber" />
            {language === 'zh-TW' ? '高海拔大氣低氧與急性高山病 (AMS) 模擬器' : 'High-Altitude Hypoxia & AMS Lake Louise Simulator'}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Barometric Pressure Collapse, PiO2 Partial Pressure & Lake Louise Score Diagnostic Engine
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/70 border border-amber-700 text-amber-300">
          高山醫學模擬
        </span>
      </div>

      {/* Altitude Slider & Landmark Buttons */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-slate-300 font-bold flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-salud-amber" />
            {language === 'zh-TW' ? '目標海拔高度 (Target Altitude)：' : 'Target Elevation:'}
          </label>
          <strong className="text-xl font-display text-salud-amber font-extrabold">{altitudeM} m</strong>
        </div>

        <input
          type="range"
          min="0"
          max="5500"
          step="50"
          value={altitudeM}
          onChange={(e) => setAltitudeM(Number(e.target.value))}
          className="w-full accent-salud-amber cursor-pointer"
        />

        {/* Quick Landmark Jump Buttons */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400">地標快速錨定：</span>
          {[
            { alt: 0, name_zh: '海平面 (0m)', name_en: 'Sea Level (0m)' },
            { alt: 2200, name_zh: '阿里山 (2,200m)', name_en: 'Alishan (2,200m)' },
            { alt: 3275, name_zh: '合歡山武嶺 (3,275m)', name_en: 'Wuling (3,275m)' },
            { alt: 3402, name_zh: '排雲山莊 (3,402m)', name_en: 'Paiyun Lodge (3,402m)' },
            { alt: 3952, name_zh: '玉山主峰 (3,952m)', name_en: 'Yushan Peak (3,952m)' },
            { alt: 5364, name_zh: '喜馬拉雅 EBC (5,364m)', name_en: 'Everest EBC (5,364m)' },
          ].map((l) => (
            <button
              key={l.alt}
              onClick={() => setAltitudeM(l.alt)}
              className={`px-2 py-0.5 rounded-lg text-[10px] border transition-all ${
                altitudeM === l.alt
                  ? 'bg-salud-amber text-black font-bold border-salud-amber shadow-warm-glow'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {language === 'zh-TW' ? l.name_zh : l.name_en}
            </button>
          ))}
        </div>
      </div>

      {/* Atmospheric Physics Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block">{language === 'zh-TW' ? '環境大氣壓 (P_bar)' : 'Barometric Pressure'}</span>
          <strong className="text-lg sm:text-xl font-display font-extrabold text-white">{pressureKpa} kPa</strong>
          <span className="text-[10px] text-slate-500 block">({pressureMmhg} mmHg)</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block">{language === 'zh-TW' ? '吸入氧分壓 (PiO2)' : 'Inspired O2 (PiO2)'}</span>
          <strong className="text-lg sm:text-xl font-display font-extrabold text-salud-cyan">{pio2Mmhg} mmHg</strong>
          <span className="text-[10px] text-cyan-400 block">海平面僅存 {effectiveOxygenPct}%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block">{language === 'zh-TW' ? '估算動脈血氧 (SpO2)' : 'Estimated SpO2'}</span>
          <strong className="text-lg sm:text-xl font-display font-extrabold text-salud-amber">
            {estSpo2Acute}–{estSpo2Acclimatized}%
          </strong>
          <span className="text-[10px] text-slate-500 block">急性抵達 vs 適應後</span>
        </div>

        <div className={`p-3.5 rounded-2xl border text-center space-y-1 ${riskCategory.color}`}>
          <span className="text-[11px] opacity-80 block">{language === 'zh-TW' ? '高度風險評級' : 'Altitude Hazard'}</span>
          <strong className="text-sm sm:text-base font-bold block">
            {language === 'zh-TW' ? riskCategory.text_zh.split(' (')[0] : riskCategory.text_en}
          </strong>
          <span className="text-[10px] opacity-75 block">
            {altitudeM >= 3000 ? '強制嚴防肺水腫' : '適應良好可安全健行'}
          </span>
        </div>
      </div>

      {/* ── Lake Louise Score (LLS) Clinical Self-Assessment Module ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Activity className="w-4 h-4 text-salud-amber" />
            <span>{language === 'zh-TW' ? '國際路易斯湖急性高山病評分 (LLS 2018 Consensus)' : 'Lake Louise Score AMS Self-Triage'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">總分：</span>
            <strong className={`text-base px-2 py-0.5 rounded-lg font-extrabold ${
              isAmsDiagnosed ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
            }`}>
              {totalLls} 分
            </strong>
          </div>
        </div>

        {/* 4 LLS Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Headache */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <label className="text-slate-300 font-bold block text-[11px]">
              1. 頭痛程度 (Headache, 確診必備核心症狀)：
            </label>
            <select
              value={headacheScore}
              onChange={(e) => setHeadacheScore(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs"
            >
              <option value="0">0 分 · 完全無頭痛 (None)</option>
              <option value="1">1 分 · 輕度頭痛 (Mild)</option>
              <option value="2">2 分 · 中度頭痛 (Moderate, 影響活動)</option>
              <option value="3">3 分 · 重度劇烈頭痛 (Severe, 無法忍受)</option>
            </select>
          </div>

          {/* GI Symptoms */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <label className="text-slate-300 font-bold block text-[11px]">
              2. 腸胃道反應 (Gastrointestinal Symptoms)：
            </label>
            <select
              value={giScore}
              onChange={(e) => setGiScore(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs"
            >
              <option value="0">0 分 · 食慾良好正常 (Good appetite)</option>
              <option value="1">1 分 · 食慾不振不想吃 (Poor appetite)</option>
              <option value="2">2 分 · 噁心想吐 (Nausea)</option>
              <option value="3">3 分 · 劇烈嘔吐 (Severe Vomiting)</option>
            </select>
          </div>

          {/* Fatigue */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <label className="text-slate-300 font-bold block text-[11px]">
              3. 疲勞與虛弱 (Fatigue / Weakness)：
            </label>
            <select
              value={fatigueScore}
              onChange={(e) => setFatigueScore(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs"
            >
              <option value="0">0 分 · 體能正常無異常疲勞 (Normal)</option>
              <option value="1">1 分 · 輕微疲倦 (Mild fatigue)</option>
              <option value="2">2 分 · 中度虛弱無力 (Moderate weakness)</option>
              <option value="3">3 分 · 重度極度衰竭 (Severe exhaustion)</option>
            </select>
          </div>

          {/* Dizziness */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <label className="text-slate-300 font-bold block text-[11px]">
              4. 頭暈目眩感 (Dizziness / Lightheadedness)：
            </label>
            <select
              value={dizzinessScore}
              onChange={(e) => setDizzinessScore(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs"
            >
              <option value="0">0 分 · 無頭暈 (None)</option>
              <option value="1">1 分 · 輕度頭重腳輕 (Mild)</option>
              <option value="2">2 分 · 中度旋轉暈眩 (Moderate)</option>
              <option value="3">3 分 · 重度站不穩 (Severe)</option>
            </select>
          </div>
        </div>

        {/* Clinical Triage Outcome */}
        <div className={`p-4 rounded-xl border space-y-2 text-xs font-sans ${
          isSevereAms
            ? 'bg-red-950/40 border-red-600 text-red-200'
            : isAmsDiagnosed
            ? 'bg-amber-950/40 border-amber-600 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
        }`}>
          <div className="flex items-center justify-between font-bold text-sm font-display">
            <span className="flex items-center gap-1.5">
              {isSevereAms ? (
                <ShieldAlert className="w-5 h-5 text-red-400" />
              ) : isAmsDiagnosed ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
              {isSevereAms
                ? '【重度急性高山病警報】請立即停止攀登並立刻安排下撤！'
                : isAmsDiagnosed
                ? '【中度急性高山病確診 (AMS Positive)】嚴禁繼續上升高度！'
                : '【目前無高山病徵象 (AMS Negative)】請持續維持良好水合與階梯適應。'}
            </span>
          </div>

          <p className="leading-relaxed text-[11px] opacity-90">
            {isSevereAms
              ? 'LLS 總分達 6 分以上或伴隨重度嘔吐/劇烈頭痛。此階段極易在數小時內惡化為致死性高海拔腦水腫 (HACE) 或肺水腫 (HAPE)。應立刻使用攜帶型氧氣、給予 Dexamethasone 8mg，並火速下撤至少 500–1,000 公尺！'
              : isAmsDiagnosed
              ? '符合頭痛且總分 ≥3 分之 AMS 醫學確診標準。此時絕對禁止繼續攀登攻頂！應留在目前高度休息觀察，補充電解質溫水，可依醫囑服用 Acetazolamide (丹木斯) 125mg 或普拿疼緩解頭痛。若 12 小時內無改善或惡化，必須堅決下撤。'
              : '目前生理適應良好。請注意登山每小時需補足 300–400 mL 水分，並隨時監控隊友是否有步伐不穩、胡言亂語等早期神經徵象。'}
          </p>
        </div>
      </div>
    </div>
  );
};
