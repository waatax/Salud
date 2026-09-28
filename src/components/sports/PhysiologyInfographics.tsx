import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { PHYSIOLOGY_INFOGRAPHICS } from '../../data/exerciseData';
import { Activity, HeartPulse, Flame, Network, Clock, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const PhysiologyInfographics: React.FC = () => {
  const { language } = useLanguage();

  // Interactive State for Chart 1: Substrate Crossover
  const [selectedHrPct, setSelectedHrPct] = useState<number>(65);

  // Dynamic calculations for Substrate Crossover
  const getSubstrateData = (hr: number) => {
    // Fat % drops from 85% at 50% HR down to 5% at 95% HR
    let fatPct = Math.max(5, Math.min(85, Math.round(85 - Math.pow((hr - 50) / 45, 1.6) * 80)));
    let carbPct = 100 - fatPct;
    let lactate = hr < 60 ? 1.0 : hr < 72 ? +(1.0 + (hr - 60) * 0.08).toFixed(1) : hr < 85 ? +(2.0 + Math.pow((hr - 72) / 13, 2) * 2.0).toFixed(1) : +(4.0 + Math.pow((hr - 85) / 10, 2) * 6.5).toFixed(1);
    let zoneName = hr < 60 ? 'Zone 1 (動態恢復)' : hr < 72 ? 'Zone 2 (有氧基礎/FatMax)' : hr < 82 ? 'Zone 3 (節奏耐力)' : hr < 90 ? 'Zone 4 (乳酸閾值 LT2)' : 'Zone 5 (無氧爆發/VO2max)';
    return { fatPct, carbPct, lactate, zoneName };
  };

  const currentSubstrate = getSubstrateData(selectedHrPct);

  // Interactive State for Chart 2: Fitness Tier
  const [selectedFitnessTier, setSelectedFitnessTier] = useState<number>(4);
  const fitnessTiers = [
    { nameZh: '低下 (Low, 後 25%)', nameEn: 'Low Fitness (<25th)', hrVal: '5.04x', riskLabel: '基準極高風險', vo2: '< 28 mL/kg/min', descZh: '死亡風險高於吸菸、第二型糖尿病與重度高血壓' },
    { nameZh: '次均 (Below Avg, 25–49%)', nameEn: 'Below Average', hrVal: '2.75x', riskLabel: '中重度風險', vo2: '28–36 mL/kg/min', descZh: '心肺機能偏弱，日常生活攀爬樓梯即感呼吸急促' },
    { nameZh: '良 (Above Avg, 50–74%)', nameEn: 'Above Average', hrVal: '1.92x', riskLabel: '輕度保護', vo2: '37–44 mL/kg/min', descZh: '符合常規運動指引，全因死亡風險顯著下降' },
    { nameZh: '優 (High, 75–97%)', nameEn: 'High Fitness', hrVal: '1.41x', riskLabel: '優異防護', vo2: '45–54 mL/kg/min', descZh: '每搏輸出量充沛，心血管與神經退化防護極強' },
    { nameZh: '頂尖超凡 (Elite, 前 2%)', nameEn: 'Elite Fitness (>98th)', hrVal: '1.00x (HR 0.20 vs Low)', riskLabel: '最強長壽保護', vo2: '> 55 mL/kg/min', descZh: '全因死亡率相較低下者斷崖下降 80%，長壽引擎極限' },
  ];

  // Interactive State for Chart 3: Myokine Target Organ
  const [selectedOrgan, setSelectedOrgan] = useState<'BRAIN' | 'FAT' | 'LIVER' | 'BONE'>('BRAIN');
  const organDetails = {
    BRAIN: {
      myokine: 'BDNF + FNDC5/Irisin',
      nameZh: '大腦海馬迴 (Hippocampus)',
      effectZh: '穿透血腦屏障刺激齒狀回神經突觸生長，增強神經可塑性，顯著預防阿茲海默症與抗抑鬱。',
      effectEn: 'Traverses BBB to drive neurogenesis in dentate gyrus, enhancing memory and cognitive resilience.',
      badge: 'Cognitive Neurogenesis',
    },
    FAT: {
      myokine: 'Irisin (鳶尾素) + IL-15',
      nameZh: '皮下白色脂肪 (WAT)',
      effectZh: '激活 UCP-1 解偶聯蛋白，誘導白色脂肪「棕色化 (Browning)」變為米色脂肪，加速靜止產熱代謝。',
      effectEn: 'Activates UCP-1 to drive white-to-beige adipocyte browning, elevating non-shivering thermogenesis.',
      badge: 'Adipose Browning',
    },
    LIVER: {
      myokine: '肌肉分泌型 IL-6 + Musclin',
      nameZh: '肝臟與全身內皮 (Liver & Endothelium)',
      effectZh: '運動脈衝式 IL-6 具強效抗發炎作用，促進肝臟脂肪酸 β-氧化與糖質新生，抑制 TNF-α 慢性發炎。',
      effectEn: 'Pulsatile exercise IL-6 exerts systemic anti-inflammatory actions, upregulating hepatic lipid clearance.',
      badge: 'Metabolic Anti-Inflammatory',
    },
    BONE: {
      myokine: 'Osteoglycin + FGF-2',
      nameZh: '骨骼成骨細胞 (Osteoblasts)',
      effectZh: '骨骼肌機械拉伸釋放成骨因子，疊加機械壓電效應刺激成骨細胞礦化，大幅提高皮質骨厚度與 BMD。',
      effectEn: 'Stimulates osteoblastic mineralization in synergy with compressive strain, reversing osteopenia.',
      badge: 'Bone Mineral Density',
    },
  };

  // Interactive State for Chart 4: Sedentary vs Active Interruption
  const [sedentaryMode, setSedentaryMode] = useState<'CONTINUOUS' | 'INTERRUPTED'>('INTERRUPTED');

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-salud-cyan/20 text-salud-cyan border border-salud-cyan/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '運動生理學四大核心可視化教學圖解' : 'Exercise Physiology: 4 Core Visual Pedagogical Infographics'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Substrate Crossover Dynamics, VO2 max Survival Curve, Endocrine Myokine Topology, Sedentary Shear Stress Recovery
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Substrate Crossover & Lactate Dynamics ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-salud-cyan font-bold block">
                {PHYSIOLOGY_INFOGRAPHICS[0].id} · {PHYSIOLOGY_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[0].title_zh : PHYSIOLOGY_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <Activity className="w-5 h-5 text-salud-cyan shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[0].subtitle_zh : PHYSIOLOGY_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Slider */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500 font-bold">調節心率強度 (HRmax %)：</span>
              <span className="px-2 py-0.5 rounded bg-salud-cyan/20 text-salud-cyan font-bold">
                {selectedHrPct}% HRmax · {currentSubstrate.zoneName}
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={95}
              step={1}
              value={selectedHrPct}
              onChange={(e) => setSelectedHrPct(Number(e.target.value))}
              className="w-full accent-salud-cyan cursor-pointer"
            />
            <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[11px]">
              <div className="p-1.5 rounded-lg bg-nature-green-500/10 border border-nature-green-500/30 text-nature-green-700 dark:text-nature-green-400">
                <div className="text-[9px] text-slate-400">脂肪氧化 (Fat)</div>
                <div className="font-extrabold text-xs">{currentSubstrate.fatPct}%</div>
              </div>
              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
                <div className="text-[9px] text-slate-400">碳水酵解 (Carb)</div>
                <div className="font-extrabold text-xs">{currentSubstrate.carbPct}%</div>
              </div>
              <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400">
                <div className="text-[9px] text-slate-400">血乳酸 (Lactate)</div>
                <div className="font-extrabold text-xs">{currentSubstrate.lactate} mmol/L</div>
              </div>
            </div>
          </div>

          {/* SVG Substrate Crossover Graph */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 180" className="w-full h-full" role="img" aria-label="Substrate Crossover Curve">
                {/* Zone Bands */}
                <rect x="35" y="15" width="45" height="130" fill="#10b981" fillOpacity="0.08" />
                <rect x="80" y="15" width="85" height="130" fill="#06b6d4" fillOpacity="0.12" />
                <rect x="165" y="15" width="75" height="130" fill="#f59e0b" fillOpacity="0.08" />
                <rect x="240" y="15" width="60" height="130" fill="#f97316" fillOpacity="0.08" />
                <rect x="300" y="15" width="65" height="130" fill="#ef4444" fillOpacity="0.10" />

                {/* Zone Labels */}
                <text x="57" y="28" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Z1</text>
                <text x="122" y="28" fill="#06b6d4" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Z2 (FatMax)</text>
                <text x="202" y="28" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Z3</text>
                <text x="270" y="28" fill="#f97316" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Z4 (LT2)</text>
                <text x="332" y="28" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Z5</text>

                {/* Grid Lines */}
                <line x1="35" y1="45" x2="365" y2="45" stroke="#475569" strokeDasharray="2 3" strokeOpacity="0.4" />
                <line x1="35" y1="90" x2="365" y2="90" stroke="#475569" strokeDasharray="2 3" strokeOpacity="0.4" />
                <line x1="35" y1="145" x2="365" y2="145" stroke="#64748b" strokeWidth="1.5" />
                <line x1="35" y1="15" x2="35" y2="145" stroke="#64748b" strokeWidth="1.5" />

                {/* Y Axis */}
                <text x="30" y="48" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">80%</text>
                <text x="30" y="93" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">50%</text>
                <text x="30" y="145" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">0%</text>

                {/* X Axis */}
                <text x="35" y="160" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">50%</text>
                <text x="122" y="160" fill="#06b6d4" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="monospace">65%</text>
                <text x="202" y="160" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">75%</text>
                <text x="270" y="160" fill="#f97316" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="monospace">85%</text>
                <text x="365" y="160" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">95%</text>

                {/* Fat Oxidation Curve (Green) */}
                <path
                  d="M 35 48 C 75 42, 115 45, 155 75 C 205 110, 280 135, 365 142"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                />
                <text x="110" y="65" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="sans-serif">脂肪燃燒 %</text>

                {/* Carb Oxidation Curve (Amber) */}
                <path
                  d="M 35 135 C 75 130, 115 125, 155 95 C 205 60, 280 35, 365 25"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                />
                <text x="220" y="55" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="sans-serif">醣原燃燒 %</text>

                {/* Lactate Curve (Rose Dashed) */}
                <path
                  d="M 35 138 Q 160 135 220 120 T 270 95 T 365 30"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                <text x="310" y="42" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="sans-serif">乳酸 mmol/L</text>

                {/* Interactive Dynamic Marker */}
                {(() => {
                  const x = 35 + ((selectedHrPct - 50) / 45) * 330;
                  return (
                    <g>
                      <line x1={x} y1="15" x2={x} y2="145" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                      <circle cx={x} cy={145 - (currentSubstrate.fatPct / 100) * 115} r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                      <circle cx={x} cy={145 - (currentSubstrate.carbPct / 100) * 115} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {PHYSIOLOGY_INFOGRAPHICS[0].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-salud-cyan shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: VO2 max & All-Cause Mortality Hazard Ratio ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-nature-amber-500 font-bold block">
                {PHYSIOLOGY_INFOGRAPHICS[1].id} · {PHYSIOLOGY_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[1].title_zh : PHYSIOLOGY_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <HeartPulse className="w-5 h-5 text-nature-amber-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[1].subtitle_zh : PHYSIOLOGY_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* Interactive Tier Switcher */}
          <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold">
            {fitnessTiers.map((tier, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFitnessTier(idx)}
                className={`py-1.5 px-1 rounded-lg text-center transition-all ${
                  selectedFitnessTier === idx
                    ? 'bg-nature-amber-500 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                T{idx + 1}
              </button>
            ))}
          </div>

          {/* Active Tier Spotlight */}
          <div className="p-3 rounded-xl bg-nature-amber-500/10 border border-nature-amber-500/30 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-nature-amber-800 dark:text-nature-amber-300">
                {fitnessTiers[selectedFitnessTier].nameZh}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                VO2 max 門檻：{fitnessTiers[selectedFitnessTier].vo2}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {fitnessTiers[selectedFitnessTier].descZh}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block">死亡風險比 (HR)</span>
              <span className="text-base font-extrabold font-mono text-nature-amber-600 dark:text-nature-amber-400">
                {fitnessTiers[selectedFitnessTier].hrVal}
              </span>
            </div>
          </div>

          {/* SVG Comparative Hazard Ratio Chart */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Hazard Ratio Comparison">
                {/* Horizontal reference bars */}
                <g>
                  {/* Low Fitness */}
                  <text x="80" y="24" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="sans-serif">低心肺體能</text>
                  <rect x="90" y="14" width="260" height="14" rx="4" fill="#ef4444" fillOpacity="0.85" />
                  <text x="355" y="25" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">5.04x</text>

                  {/* Smoking */}
                  <text x="80" y="48" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="sans-serif">抽菸 (Smoking)</text>
                  <rect x="90" y="38" width="75" height="14" rx="4" fill="#f97316" fillOpacity="0.75" />
                  <text x="170" y="49" fill="#f97316" fontSize="8" fontWeight="bold" fontFamily="monospace">1.41x</text>

                  {/* Diabetes */}
                  <text x="80" y="72" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="sans-serif">第二型糖尿病</text>
                  <rect x="90" y="62" width="72" height="14" rx="4" fill="#f59e0b" fillOpacity="0.75" />
                  <text x="168" y="73" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="monospace">1.40x</text>

                  {/* Hypertension */}
                  <text x="80" y="96" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="sans-serif">重度高血壓</text>
                  <rect x="90" y="86" width="67" height="14" rx="4" fill="#eab308" fillOpacity="0.75" />
                  <text x="163" y="97" fill="#eab308" fontSize="8" fontWeight="bold" fontFamily="monospace">1.30x</text>

                  {/* High Fitness */}
                  <text x="80" y="120" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="sans-serif">良好體能 (High)</text>
                  <rect x="90" y="110" width="38" height="14" rx="4" fill="#10b981" fillOpacity="0.75" />
                  <text x="134" y="121" fill="#10b981" fontSize="8" fontWeight="bold" fontFamily="monospace">0.45x</text>

                  {/* Elite Fitness */}
                  <text x="80" y="144" fill="#94a3b8" fontSize="8" textAnchor="end" fontWeight="bold" fontFamily="sans-serif">頂尖體能 (Elite)</text>
                  <rect x="90" y="134" width="18" height="14" rx="4" fill="#06b6d4" fillOpacity="0.9" />
                  <text x="114" y="145" fill="#06b6d4" fontSize="9" fontWeight="bold" fontFamily="monospace">0.20x (-80%)</text>
                </g>
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {PHYSIOLOGY_INFOGRAPHICS[1].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nature-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: Skeletal Muscle Endocrine Network ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-purple-500 font-bold block">
                {PHYSIOLOGY_INFOGRAPHICS[2].id} · {PHYSIOLOGY_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[2].title_zh : PHYSIOLOGY_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Network className="w-5 h-5 text-purple-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[2].subtitle_zh : PHYSIOLOGY_INFOGRAPHICS[2].subtitle_en}
          </p>

          {/* Interactive Organ Buttons */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            {(['BRAIN', 'FAT', 'LIVER', 'BONE'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedOrgan(key)}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  selectedOrgan === key
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {key === 'BRAIN' ? '🧠 大腦' : key === 'FAT' ? '🔥 脂肪' : key === 'LIVER' ? '🫀 肝臟' : '🦴 骨骼'}
              </button>
            ))}
          </div>

          {/* Interactive Organ Card */}
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-800 dark:text-purple-300 text-xs">
                {organDetails[selectedOrgan].nameZh}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold">
                {organDetails[selectedOrgan].myokine}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'zh-TW' ? organDetails[selectedOrgan].effectZh : organDetails[selectedOrgan].effectEn}
            </p>
          </div>

          {/* SVG Organ Network Map */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Myokine Organ Network">
                {/* Center Muscle Node */}
                <rect x="140" y="60" width="100" height="50" rx="12" fill="#7c3aed" fillOpacity="0.9" stroke="#a78bfa" strokeWidth="2" />
                <text x="190" y="80" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">收縮骨骼肌</text>
                <text x="190" y="96" fill="#ddd6fe" fontSize="8" textAnchor="middle" fontFamily="monospace">Myokine Hub</text>

                {/* Satellite Nodes */}
                {/* Brain (Top Left) */}
                <line x1="150" y1="65" x2="65" y2="35" stroke={selectedOrgan === 'BRAIN' ? '#a855f7' : '#475569'} strokeWidth={selectedOrgan === 'BRAIN' ? '2.5' : '1.2'} strokeDasharray="3 2" />
                <circle cx="55" cy="30" r="24" fill={selectedOrgan === 'BRAIN' ? '#9333ea' : '#1e293b'} stroke="#a855f7" strokeWidth="1.5" />
                <text x="55" y="30" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">大腦 BDNF</text>
                <text x="55" y="42" fill="#cbd5e1" fontSize="7" textAnchor="middle" fontFamily="sans-serif">海馬神經</text>

                {/* Adipose (Bottom Left) */}
                <line x1="150" y1="105" x2="65" y2="135" stroke={selectedOrgan === 'FAT' ? '#f59e0b' : '#475569'} strokeWidth={selectedOrgan === 'FAT' ? '2.5' : '1.2'} strokeDasharray="3 2" />
                <circle cx="55" cy="140" r="24" fill={selectedOrgan === 'FAT' ? '#d97706' : '#1e293b'} stroke="#f59e0b" strokeWidth="1.5" />
                <text x="55" y="140" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">脂肪 Irisin</text>
                <text x="55" y="152" fill="#cbd5e1" fontSize="7" textAnchor="middle" fontFamily="sans-serif">米色棕化</text>

                {/* Liver (Top Right) */}
                <line x1="230" y1="65" x2="315" y2="35" stroke={selectedOrgan === 'LIVER' ? '#ef4444' : '#475569'} strokeWidth={selectedOrgan === 'LIVER' ? '2.5' : '1.2'} strokeDasharray="3 2" />
                <circle cx="325" cy="30" r="24" fill={selectedOrgan === 'LIVER' ? '#dc2626' : '#1e293b'} stroke="#ef4444" strokeWidth="1.5" />
                <text x="325" y="30" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">肝臟 IL-6</text>
                <text x="325" y="42" fill="#cbd5e1" fontSize="7" textAnchor="middle" fontFamily="sans-serif">抗炎清脂</text>

                {/* Bone (Bottom Right) */}
                <line x1="230" y1="105" x2="315" y2="135" stroke={selectedOrgan === 'BONE' ? '#06b6d4' : '#475569'} strokeWidth={selectedOrgan === 'BONE' ? '2.5' : '1.2'} strokeDasharray="3 2" />
                <circle cx="325" cy="140" r="24" fill={selectedOrgan === 'BONE' ? '#0891b2' : '#1e293b'} stroke="#06b6d4" strokeWidth="1.5" />
                <text x="325" y="140" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">骨骼 FGF2</text>
                <text x="325" y="152" fill="#cbd5e1" fontSize="7" textAnchor="middle" fontFamily="sans-serif">成骨礦化</text>
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {PHYSIOLOGY_INFOGRAPHICS[2].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 4: Sedentary Shear Stress vs eNOS Recovery ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-salud-cyan font-bold block">
                {PHYSIOLOGY_INFOGRAPHICS[3].id} · {PHYSIOLOGY_INFOGRAPHICS[3].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[3].title_zh : PHYSIOLOGY_INFOGRAPHICS[3].title_en}
              </h4>
            </div>
            <Clock className="w-5 h-5 text-salud-cyan shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? PHYSIOLOGY_INFOGRAPHICS[3].subtitle_zh : PHYSIOLOGY_INFOGRAPHICS[3].subtitle_en}
          </p>

          {/* Interactive Mode Toggle */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setSedentaryMode('INTERRUPTED')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                sedentaryMode === 'INTERRUPTED'
                  ? 'bg-salud-cyan text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✓ 每 30 分鐘微打斷 2 分鐘 (規律修復)
            </button>
            <button
              onClick={() => setSedentaryMode('CONTINUOUS')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                sedentaryMode === 'CONTINUOUS'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✕ 連續久坐 3 小時無中斷 (剪應力塌陷)
            </button>
          </div>

          {/* SVG Shear Stress Waveform */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Endothelial Shear Stress Waveform">
                {/* Axis lines */}
                <line x1="40" y1="20" x2="40" y2="140" stroke="#64748b" strokeWidth="1.5" />
                <line x1="40" y1="140" x2="365" y2="140" stroke="#64748b" strokeWidth="1.5" />

                {/* Safe Threshold Zone (eNOS Active) */}
                <rect x="40" y="20" width="325" height="50" fill="#10b981" fillOpacity="0.08" />
                <line x1="40" y1="70" x2="365" y2="70" stroke="#10b981" strokeDasharray="3 3" strokeWidth="1.2" />
                <text x="360" y="65" fill="#10b981" fontSize="8" textAnchor="end" fontFamily="sans-serif">eNOS 磷酸化有效區間 (&gt;15 dyn/cm²)</text>

                {/* Y Axis labels */}
                <text x="35" y="30" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">25</text>
                <text x="35" y="70" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">15</text>
                <text x="35" y="110" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">5</text>
                <text x="35" y="140" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">0 dyn</text>

                {/* X Axis labels */}
                <text x="40" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">0分</text>
                <text x="95" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">30分</text>
                <text x="150" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">60分</text>
                <text x="205" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">90分</text>
                <text x="260" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">120分</text>
                <text x="315" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">150分</text>

                {sedentaryMode === 'CONTINUOUS' ? (
                  // Continuous Sitting Curve: Plunges and stays at rock bottom
                  <path
                    d="M 40 40 C 65 60, 85 115, 110 125 L 365 130"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                ) : (
                  // Interrupted Curve: Periodic pulses rescuing shear stress
                  <path
                    d="M 40 40 C 60 55, 80 85, 95 100 L 98 35 L 105 45 C 120 60, 140 85, 150 100 L 153 35 L 160 45 C 175 60, 195 85, 205 100 L 208 35 L 215 45 C 230 60, 250 85, 260 100 L 263 35 L 270 45 C 285 60, 305 85, 315 100 L 318 35 L 325 45 L 365 75"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {PHYSIOLOGY_INFOGRAPHICS[3].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-salud-cyan shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
