import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { MOUNTAINEERING_INFOGRAPHICS } from '../../data/sportsScienceData';
import { Mountain, AlertTriangle, ShieldAlert, Thermometer, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export const MountaineeringInfographics: React.FC = () => {
  const { language } = useLanguage();

  // Interactive State for Infographic 1: Altitude Slider
  const [altitudeM, setAltitudeM] = useState<number>(3952); // Default Yushan (3,952m)

  const getAltitudePhysiology = (m: number) => {
    // Barometric pressure roughly 1013 * exp(-m / 7400)
    const pressureHpa = Math.round(1013 * Math.exp(-m / 7400));
    const effectivePo2 = Math.round(pressureHpa * 0.209);
    // Typical unacclimatized SpO2
    let spo2 = m < 1500 ? 98 : m < 2500 ? Math.round(98 - (m - 1500) * 0.006) : m < 4500 ? Math.round(92 - (m - 2500) * 0.007) : Math.round(78 - (m - 4500) * 0.005);
    spo2 = Math.max(50, Math.min(99, spo2));
    const riskLevel = m < 2500 ? '安全區 (Low Risk)' : m < 3500 ? 'AMS 初發警戒 (Threshold)' : m < 5500 ? '極高海拔 (High Hypoxia)' : '死亡地帶 (Death Zone)';
    return { pressureHpa, effectivePo2, spo2, riskLevel };
  };

  const altData = getAltitudePhysiology(altitudeM);

  // Interactive State for Infographic 2: Lake Louise AMS Score
  const [headacheScore, setHeadacheScore] = useState<number>(1);
  const [giScore, setGiScore] = useState<number>(1);
  const [fatigueScore, setFatigueScore] = useState<number>(1);
  const [dizzyScore, setDizzyScore] = useState<number>(0);

  const totalAmsScore = headacheScore + giScore + fatigueScore + dizzyScore;
  const amsDiagnosis = headacheScore >= 1 && totalAmsScore >= 3
    ? totalAmsScore >= 6
      ? { label: '重度高山症 (Severe AMS) · 紅旗警報！', color: 'text-rose-500', action: '立即下撤至少 500–1000m，評估 Dexamethasone 與氧氣，嚴防腦水腫 (HACE)！' }
      : { label: '輕中度高山症 (Mild-Mod AMS)', color: 'text-amber-500', action: '嚴禁盲目攻頂！原地停留休息，給予 Acetazolamide 或止痛藥，若惡化立即下撤。' }
    : { label: '未達 AMS 診斷標準', color: 'text-emerald-500', action: '維持合理爬升速度（每日不超過 300–500m），補足水分防範脫水。' };

  // Interactive State for Infographic 3: Layering System
  const [selectedLayer, setSelectedLayer] = useState<'BASE' | 'MID' | 'SHELL'>('BASE');
  const layerInfo = {
    BASE: {
      nameZh: '排汗底層 (Wicking Base Layer)',
      materialZh: '美麗諾羊毛 (Merino Wool) 或高階聚酯纖維 (Capilene/Poly)',
      functionZh: '利用毛細管現象瞬間吸附皮膚汗水，擴散至外表面蒸發，維持皮膚乾爽。',
      dangerZh: '⚠️ 嚴禁穿著純棉！純棉吸水後導熱係數激增 25 倍，化身濕毛巾直接抽乾人體核心體溫。',
    },
    MID: {
      nameZh: '保暖中層 (Insulation Layer)',
      materialZh: '超細抓絨 (Polartec Fleece) 或高抗濕羽絨 / 化纖棉 (Primaloft)',
      functionZh: '結構內鎖住微小不流動的空氣分子 (Dead Air)，構築強大隔熱氣室阻斷熱傳導。',
      dangerZh: '⚠️ 行進間大出汗時應主動拉開拉鍊或脫下中層，避免汗水浸濕羽絨導致羽絨結塊失去蓬鬆度。',
    },
    SHELL: {
      nameZh: '防風防水外殼 (Waterproof Breathable Shell)',
      materialZh: 'GORE-TEX / eVent / Pertex 等微孔膜風雨衣',
      functionZh: '微孔小於水滴 2 萬倍阻擋暴風雨雪，但大於水蒸氣 700 倍容許體內汗氣向外排出。',
      dangerZh: '⚠️ 風寒效應 (Windchill)：時速 40km/h 強風會讓 0°C 體感急降至 -10°C，外殼是登山保命防線。',
    },
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-500 border border-purple-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '登山與高海拔適應三大核心可視化教學圖解' : 'Mountaineering Science: 3 Core Visual Pedagogical Infographics'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Altitude Hypoxia Pressure Cascade, 2018 Lake Louise AMS Consensus Matrix, Three-Layer Moisture Thermal System
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Altitude Hypoxia Cascade ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-purple-500 font-bold block">
                {MOUNTAINEERING_INFOGRAPHICS[0].id} · {MOUNTAINEERING_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? MOUNTAINEERING_INFOGRAPHICS[0].title_zh : MOUNTAINEERING_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <Mountain className="w-5 h-5 text-purple-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? MOUNTAINEERING_INFOGRAPHICS[0].subtitle_zh : MOUNTAINEERING_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Altitude Presets */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold">
            {[
              { label: '海平面 (0m)', m: 0 },
              { label: '合歡山 (3150m)', m: 3150 },
              { label: '玉山 (3952m)', m: 3952 },
              { label: '聖母峰 (8848m)', m: 8848 },
            ].map((p) => (
              <button
                key={p.m}
                onClick={() => setAltitudeM(p.m)}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  altitudeM === p.m
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Live Physiological Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <span className="text-[9px] text-slate-400 block">大氣氣壓 (Pressure)</span>
              <span className="font-extrabold text-xs text-purple-700 dark:text-purple-300">{altData.pressureHpa} hPa</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <span className="text-[9px] text-slate-400 block">有效氧分壓 (PO2)</span>
              <span className="font-extrabold text-xs text-purple-700 dark:text-purple-300">{altData.effectivePo2} mmHg</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <span className="text-[9px] text-slate-400 block">預估未適應 SpO2</span>
              <span className="font-extrabold text-xs text-rose-600 dark:text-rose-400">{altData.spo2}%</span>
            </div>
          </div>

          {/* SVG Altitude Hypoxia Staircase */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Altitude Hypoxia Staircase">
                {/* Axes */}
                <line x1="35" y1="20" x2="35" y2="140" stroke="#64748b" strokeWidth="1.5" />
                <line x1="35" y1="140" x2="365" y2="140" stroke="#64748b" strokeWidth="1.5" />

                {/* AMS Threshold Line (2,500m) */}
                <line x1="140" y1="20" x2="140" y2="140" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.2" />
                <text x="140" y="15" fill="#f59e0b" fontSize="8" textAnchor="middle" fontFamily="monospace">2,500m AMS門檻</text>

                {/* Death Zone Line (8,000m) */}
                <line x1="330" y1="20" x2="330" y2="140" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="1.2" />
                <text x="330" y="15" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="monospace">8,000m 死亡地帶</text>

                {/* Atmospheric Pressure Falling Curve */}
                <path
                  d="M 35 30 Q 120 70 200 95 T 365 125"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                />
                <text x="75" y="45" fill="#a855f7" fontSize="8" fontWeight="bold">氣壓與有效氧分壓</text>

                {/* SpO2 Falling Curve (Red dashed) */}
                <path
                  d="M 35 35 L 140 45 Q 220 80 330 115 L 365 130"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                <text x="240" y="70" fill="#ef4444" fontSize="8" fontWeight="bold">動脈 SpO2 跌落</text>

                {/* Dynamic Cursor */}
                {(() => {
                  const x = 35 + (altitudeM / 8848) * 330;
                  return (
                    <g>
                      <line x1={x} y1="20" x2={x} y2="140" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx={x} cy={140 - (altData.pressureHpa / 1013) * 110} r="5" fill="#a855f7" stroke="#fff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {MOUNTAINEERING_INFOGRAPHICS[0].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: Lake Louise AMS Consensus Matrix ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-rose-500 font-bold block">
                {MOUNTAINEERING_INFOGRAPHICS[1].id} · {MOUNTAINEERING_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? MOUNTAINEERING_INFOGRAPHICS[1].title_zh : MOUNTAINEERING_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? MOUNTAINEERING_INFOGRAPHICS[1].subtitle_zh : MOUNTAINEERING_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* Interactive Score Selectors */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">頭痛 (必備核心)：</span>
              <div className="flex gap-1 font-mono">
                {[0, 1, 2, 3].map((val) => (
                  <button
                    key={val}
                    onClick={() => setHeadacheScore(val)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      headacheScore === val ? 'bg-rose-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300">腸胃症狀 (食慾/噁心)：</span>
              <div className="flex gap-1 font-mono">
                {[0, 1, 2, 3].map((val) => (
                  <button
                    key={val}
                    onClick={() => setGiScore(val)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      giScore === val ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300">疲憊虛弱 (Fatigue)：</span>
              <div className="flex gap-1 font-mono">
                {[0, 1, 2, 3].map((val) => (
                  <button
                    key={val}
                    onClick={() => setFatigueScore(val)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      fatigueScore === val ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis Output Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className={`font-extrabold text-xs ${amsDiagnosis.color}`}>
                總分：{totalAmsScore} 分 ➔ {amsDiagnosis.label}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {amsDiagnosis.action}
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {MOUNTAINEERING_INFOGRAPHICS[1].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: Three-Layer Thermal System ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-500 font-bold block">
                {MOUNTAINEERING_INFOGRAPHICS[2].id} · {MOUNTAINEERING_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? MOUNTAINEERING_INFOGRAPHICS[2].title_zh : MOUNTAINEERING_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Thermometer className="w-5 h-5 text-cyan-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? MOUNTAINEERING_INFOGRAPHICS[2].subtitle_zh : MOUNTAINEERING_INFOGRAPHICS[2].subtitle_en}
          </p>

          {/* Interactive Layer Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setSelectedLayer('BASE')}
              className={`py-1.5 rounded-lg transition-all ${
                selectedLayer === 'BASE' ? 'bg-cyan-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              1. 排汗底層 (Wicking)
            </button>
            <button
              onClick={() => setSelectedLayer('MID')}
              className={`py-1.5 rounded-lg transition-all ${
                selectedLayer === 'MID' ? 'bg-amber-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              2. 保暖中層 (Insulation)
            </button>
            <button
              onClick={() => setSelectedLayer('SHELL')}
              className={`py-1.5 rounded-lg transition-all ${
                selectedLayer === 'SHELL' ? 'bg-purple-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              3. 防水外殼 (Hard Shell)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                {layerInfo[selectedLayer].nameZh}
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300">
                <span className="text-slate-400">推薦材質：</span>{layerInfo[selectedLayer].materialZh}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {layerInfo[selectedLayer].functionZh}
              </p>
              <div className="text-[11px] font-mono text-rose-500 pt-1">
                {layerInfo[selectedLayer].dangerZh}
              </div>
            </div>

            {/* SVG Three Layer Thermal Architecture */}
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
              <div className="h-36 w-full">
                <svg viewBox="0 0 360 140" className="w-full h-full" role="img" aria-label="Thermal Layer Diagram">
                  {/* Skin */}
                  <rect x="20" y="20" width="20" height="100" fill="#fbcfe8" rx="4" />
                  <text x="30" y="75" fill="#831843" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 30 75)">皮膚表面 37°C</text>

                  {/* Base Layer */}
                  <rect x="55" y="20" width="45" height="100" fill="#06b6d4" fillOpacity={selectedLayer === 'BASE' ? 0.9 : 0.4} rx="4" />
                  <text x="77" y="75" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 77 75)">1. 排汗底層</text>

                  {/* Mid Layer */}
                  <rect x="115" y="20" width="65" height="100" fill="#f59e0b" fillOpacity={selectedLayer === 'MID' ? 0.9 : 0.4} rx="4" />
                  <text x="147" y="75" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 147 75)">2. 保暖空氣氣室</text>

                  {/* Shell Layer */}
                  <rect x="195" y="20" width="40" height="100" fill="#7c3aed" fillOpacity={selectedLayer === 'SHELL' ? 0.9 : 0.4} rx="4" />
                  <text x="215" y="75" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 215 75)">3. 防風透氣外殼</text>

                  {/* Wind & Rain on right */}
                  <path d="M 260 40 L 245 45 M 270 70 L 245 75 M 260 100 L 245 105" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="300" y="75" fill="#38bdf8" fontSize="9" fontWeight="bold">強風暴雨阻隔</text>
                </svg>
              </div>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-1">
            {MOUNTAINEERING_INFOGRAPHICS[2].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
