import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { RUNNING_INFOGRAPHICS } from '../../data/sportsScienceData';
import { Zap, Footprints, Layers, Droplets, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const RunningInfographics: React.FC = () => {
  const { language } = useLanguage();

  // Interactive State for Infographic 1: Cadence
  const [cadenceMode, setCadenceMode] = useState<'150' | '180'>('180');

  // Interactive State for Infographic 2: Polarized Training
  const [trainingParadigm, setTrainingParadigm] = useState<'POLARIZED' | 'BLACK_HOLE'>('POLARIZED');

  // Interactive State for Infographic 3: SSC Phase
  const [sscPhase, setSscPhase] = useState<number>(1);
  const sscPhases = [
    { titleZh: '1. 著地瞬態 (Touchdown / 離心加載)', titleEn: '1. Touchdown (Eccentric)', descZh: '腳掌於重心下方著地，踝背屈拉伸跟腱，膠原纖維被動拉長吸收動能', energyZh: '儲存 70% 著地衝擊能' },
    { titleZh: '2. 支撐過渡 (Amortization / 等長剛性)', titleEn: '2. Amortization (Isometric)', descZh: '小腿比目魚肌強力等長收縮「鎖死」肌腹，迫使全部形變集中於跟腱彈簧', energyZh: '極速過渡 (<200 ms)' },
    { titleZh: '3. 蹬地回彈 (Toe-off / 向心爆發)', titleEn: '3. Toe-off (Concentric Recoil)', descZh: '跟腱瞬間彈性回縮釋放高達 50% 推進功，骨骼肌幾乎無耗能獲得向上向前推力', energyZh: '回彈 50% 推進能量' },
  ];

  // Interactive State for Infographic 4: Dual Carb Intake
  const [carbIntake, setCarbIntake] = useState<number>(90);
  const getCarbAbsorption = (intake: number) => {
    // Single glucose caps at 60
    const singleGlucose = Math.min(intake, 60);
    // Dual transport (glucose 2:1 or 1:0.8 fructose): SGLT1 takes up to 60, GLUT5 takes remainder up to 35-40
    const dualGlucose = Math.min(intake * 0.6, 60);
    const dualFructose = Math.min(intake * 0.4, 35);
    const dualTotal = Math.min(intake, Math.round(dualGlucose + dualFructose));
    const giDistressRisk = intake > 60 && singleGlucose === 60 ? '高 (滲透性腹瀉/胃脹)' : '低 (雙通道安全廓清)';
    return { singleGlucose, dualTotal, giDistressRisk };
  };

  const carbData = getCarbAbsorption(carbIntake);

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '跑步運動科學四大核心可視化教學圖解' : 'Running Science: 4 Core Visual Pedagogical Infographics'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Cadence Biomechanics & Joint Load, 80/20 Polarized Model, Achilles SSC Spring Recoil, Dual-Carb Saturation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Cadence Biomechanics & Ground Reaction Force ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-amber-500 font-bold block">
                {RUNNING_INFOGRAPHICS[0].id} · {RUNNING_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[0].title_zh : RUNNING_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <Footprints className="w-5 h-5 text-amber-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[0].subtitle_zh : RUNNING_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Cadence Toggle */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setCadenceMode('180')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                cadenceMode === '180'
                  ? 'bg-amber-500 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✓ 180 spm (重心下方著地 · 減震 20%)
            </button>
            <button
              onClick={() => setCadenceMode('150')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                cadenceMode === '150'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✕ 150 spm (過度跨步 · 煞車剪力大)
            </button>
          </div>

          {/* Biomechanical Data Spotlight */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">垂直振幅 (Oscillation)</span>
              <span className={`font-bold ${cadenceMode === '180' ? 'text-nature-green-600 dark:text-nature-green-400' : 'text-rose-500'}`}>
                {cadenceMode === '180' ? '6.2 cm (省力)' : '10.8 cm (起伏大)'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">觸地時間 (GCT)</span>
              <span className={`font-bold ${cadenceMode === '180' ? 'text-nature-green-600 dark:text-nature-green-400' : 'text-rose-500'}`}>
                {cadenceMode === '180' ? '198 ms (彈簧)' : '285 ms (黏地)'}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block">髕骨壓力 (PFJRF)</span>
              <span className={`font-bold ${cadenceMode === '180' ? 'text-nature-green-600 dark:text-nature-green-400' : 'text-rose-500'}`}>
                {cadenceMode === '180' ? '5.1x 體重' : '6.6x 體重 (+25%)'}
              </span>
            </div>
          </div>

          {/* SVG Ground Reaction Force Waveform */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Ground Reaction Force Waveform">
                {/* Axes */}
                <line x1="35" y1="20" x2="35" y2="140" stroke="#64748b" strokeWidth="1.5" />
                <line x1="35" y1="140" x2="365" y2="140" stroke="#64748b" strokeWidth="1.5" />

                {/* Y Axis Labels */}
                <text x="30" y="28" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">3.0x BW</text>
                <text x="30" y="80" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">1.5x BW</text>
                <text x="30" y="140" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">0</text>

                {/* X Axis Labels */}
                <text x="35" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">0ms</text>
                <text x="120" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">50ms</text>
                <text x="210" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">120ms</text>
                <text x="300" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">200ms</text>
                <text x="365" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">280ms</text>

                {cadenceMode === '150' ? (
                  // 150 spm Curve: Aggressive transient impact spike (heel brake) followed by prolonged active push
                  <g>
                    {/* Severe Braking Transient Spike */}
                    <path
                      d="M 35 140 C 45 130, 60 40, 80 45 C 95 50, 110 85, 140 80 C 180 75, 230 40, 270 50 C 310 60, 345 125, 365 140"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="80" cy="45" r="5" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                    <text x="90" y="38" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="sans-serif">煞車衝擊尖峰 (膝蓋磨損)</text>
                  </g>
                ) : (
                  // 180 spm Curve: Smooth, bell-shaped elastic wave under 200ms
                  <g>
                    <path
                      d="M 35 140 C 65 135, 120 45, 180 45 C 240 45, 280 135, 305 140"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="180" cy="45" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                    <text x="180" y="32" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">平滑彈力波形 (跟腱吸收回彈)</text>
                    <line x1="305" y1="20" x2="305" y2="140" stroke="#10b981" strokeDasharray="3 3" strokeWidth="1" />
                    <text x="310" y="100" fill="#10b981" fontSize="8" fontFamily="monospace">&lt; 200ms 離地</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {RUNNING_INFOGRAPHICS[0].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: Polarized 80/20 vs The Zone 3 Black Hole ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-nature-sky-500 font-bold block">
                {RUNNING_INFOGRAPHICS[1].id} · {RUNNING_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[1].title_zh : RUNNING_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <Layers className="w-5 h-5 text-nature-sky-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[1].subtitle_zh : RUNNING_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* Interactive Paradigm Switcher */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setTrainingParadigm('POLARIZED')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                trainingParadigm === 'POLARIZED'
                  ? 'bg-nature-sky-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✓ 菁英 80/20 極化金字塔 (高效率)
            </button>
            <button
              onClick={() => setTrainingParadigm('BLACK_HOLE')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                trainingParadigm === 'BLACK_HOLE'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✕ 業餘 Zone 3 黑洞 (垃圾疲勞)
            </button>
          </div>

          {/* SVG Training Distribution Pyramid */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Polarized Training Distribution">
                {trainingParadigm === 'POLARIZED' ? (
                  // Polarized Model
                  <g>
                    {/* Top Tier: High Intensity Zone 4-5 (20%) */}
                    <polygon points="190,20 130,65 250,65" fill="#ef4444" fillOpacity="0.85" />
                    <text x="190" y="50" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">20% 高強度 (Z4–Z5 間歇)</text>

                    {/* Middle Tier: Zone 3 (Slight) */}
                    <polygon points="130,67 250,67 265,85 115,85" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="190" y="78" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">&lt;5% 避免過度停留</text>

                    {/* Bottom Base: Zone 1-2 (80%) */}
                    <polygon points="115,87 265,87 330,150 50,150" fill="#06b6d4" fillOpacity="0.85" />
                    <text x="190" y="115" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">80% 低心率基礎 (Zone 1–2 對話跑)</text>
                    <text x="190" y="132" fill="#cffafe" fontSize="8" textAnchor="middle" fontFamily="sans-serif">粒線體擴增 · 零神經負擔 · 快速超補償</text>
                  </g>
                ) : (
                  // Black Hole Model
                  <g>
                    {/* High Intensity Zone 4-5 (15%) */}
                    <rect x="70" y="20" width="240" height="24" rx="6" fill="#ef4444" fillOpacity="0.7" />
                    <text x="190" y="36" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">15% 快跑 (因過度疲勞而質素下降)</text>

                    {/* Zone 3 Black Hole (65%) */}
                    <rect x="50" y="52" width="280" height="60" rx="8" fill="#e11d48" fillOpacity="0.9" stroke="#fda4af" strokeWidth="2" />
                    <text x="190" y="76" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">65% 陷在 Zone 3「微喘但不上不下」</text>
                    <text x="190" y="94" fill="#ffe4e6" fontSize="8" textAnchor="middle" fontFamily="sans-serif">慢跑不夠慢（粒線體未優化）＋快跑快不了（累積自律疲勞）</text>

                    {/* Zone 1-2 (20%) */}
                    <rect x="70" y="120" width="240" height="24" rx="6" fill="#06b6d4" fillOpacity="0.5" />
                    <text x="190" y="136" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">20% 輕鬆跑 (嚴重不足)</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {RUNNING_INFOGRAPHICS[1].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nature-sky-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: Achilles SSC Spring Recoil ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-500 font-bold block">
                {RUNNING_INFOGRAPHICS[2].id} · {RUNNING_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[2].title_zh : RUNNING_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Zap className="w-5 h-5 text-emerald-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[2].subtitle_zh : RUNNING_INFOGRAPHICS[2].subtitle_en}
          </p>

          {/* Interactive Phase Selector */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            {sscPhases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setSscPhase(idx)}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  sscPhase === idx
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                階段 {idx + 1}
              </button>
            ))}
          </div>

          {/* Phase Card */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-xs">
                {sscPhases[sscPhase].titleZh}
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                {sscPhases[sscPhase].energyZh}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {sscPhases[sscPhase].descZh}
            </p>
          </div>

          {/* SVG Biomechanical Model */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Achilles Spring Mechanics">
                {/* Ground */}
                <line x1="30" y1="145" x2="350" y2="145" stroke="#475569" strokeWidth="2" />

                {/* 3 Steps Diagram */}
                {/* Step 1: Touchdown */}
                <g opacity={sscPhase === 0 ? 1 : 0.45}>
                  <rect x="40" y="30" width="80" height="35" rx="6" fill="#047857" />
                  <text x="80" y="52" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">小腿肌腹</text>
                  {/* Stretched Spring */}
                  <path d="M 80 65 L 75 75 L 85 85 L 75 95 L 85 105 L 80 115" fill="none" stroke="#10b981" strokeWidth="3" />
                  <circle cx="80" cy="135" r="10" fill="#334155" />
                  <text x="80" y="160" fill="#94a3b8" fontSize="8" textAnchor="middle">1. 離心拉伸儲能</text>
                </g>

                {/* Step 2: Amortization */}
                <g opacity={sscPhase === 1 ? 1 : 0.45}>
                  <rect x="150" y="35" width="80" height="35" rx="6" fill="#059669" />
                  <text x="190" y="57" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">等長肌腹鎖定</text>
                  {/* Compressed Coil */}
                  <path d="M 190 70 L 180 77 L 200 84 L 180 91 L 200 98 L 190 105" fill="none" stroke="#34d399" strokeWidth="4" />
                  <circle cx="190" cy="130" r="12" fill="#38bdf8" />
                  <text x="190" y="160" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">2. 形變極限鎖死</text>
                </g>

                {/* Step 3: Recoil Propulsion */}
                <g opacity={sscPhase === 2 ? 1 : 0.45}>
                  <rect x="260" y="15" width="80" height="35" rx="6" fill="#10b981" />
                  <text x="300" y="37" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">50% 能量回彈</text>
                  {/* Extended Spring pushing off */}
                  <path d="M 300 50 L 295 65 L 305 80 L 295 95 L 305 110 L 300 125" fill="none" stroke="#6ee7b7" strokeWidth="3" />
                  <line x1="300" y1="125" x2="330" y2="90" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                  <circle cx="300" cy="135" r="8" fill="#f59e0b" />
                  <text x="300" y="160" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">3. 爆發推進離地</text>
                </g>
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {RUNNING_INFOGRAPHICS[2].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 4: Dual Carb Transport (SGLT1 + GLUT5) ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-nature-green-500 font-bold block">
                {RUNNING_INFOGRAPHICS[3].id} · {RUNNING_INFOGRAPHICS[3].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[3].title_zh : RUNNING_INFOGRAPHICS[3].title_en}
              </h4>
            </div>
            <Droplets className="w-5 h-5 text-nature-green-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? RUNNING_INFOGRAPHICS[3].subtitle_zh : RUNNING_INFOGRAPHICS[3].subtitle_en}
          </p>

          {/* Interactive Carb Slider */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500 font-bold">每小時碳水補給量 (g/h)：</span>
              <span className="px-2 py-0.5 rounded bg-nature-green-500/20 text-nature-green-600 dark:text-nature-green-400 font-bold">
                {carbIntake} g/hr
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={120}
              step={5}
              value={carbIntake}
              onChange={(e) => setCarbIntake(Number(e.target.value))}
              className="w-full accent-nature-green-500 cursor-pointer"
            />
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30">
                <span className="text-[10px] text-slate-400 block">單一葡萄糖吸收上限 (SGLT1)</span>
                <span className="font-extrabold text-xs text-rose-600 dark:text-rose-400">
                  {carbData.singleGlucose} g/h (溢流發酵)
                </span>
              </div>
              <div className="p-2 rounded-lg bg-nature-green-500/10 border border-nature-green-500/30">
                <span className="text-[10px] text-slate-400 block">雙通道配方吸收量 (SGLT1+GLUT5)</span>
                <span className="font-extrabold text-xs text-nature-green-600 dark:text-nature-green-400">
                  {carbData.dualTotal} g/h (突破上限)
                </span>
              </div>
            </div>
          </div>

          {/* SVG Saturation Curves */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Carbohydrate Absorption Saturation Curves">
                {/* Axes */}
                <line x1="35" y1="20" x2="35" y2="140" stroke="#64748b" strokeWidth="1.5" />
                <line x1="35" y1="140" x2="365" y2="140" stroke="#64748b" strokeWidth="1.5" />

                {/* SGLT1 Bottleneck line */}
                <line x1="35" y1="80" x2="365" y2="80" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="1.2" />
                <text x="360" y="75" fill="#ef4444" fontSize="8" textAnchor="end" fontFamily="sans-serif">單一葡萄糖飽和瓶頸 (60g/h)</text>

                {/* Y Axis labels */}
                <text x="30" y="30" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">100g</text>
                <text x="30" y="80" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">60g</text>
                <text x="30" y="140" fill="#94a3b8" fontSize="8" textAnchor="end" fontFamily="monospace">0g</text>

                {/* X Axis labels */}
                <text x="35" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">0g</text>
                <text x="145" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">40g</text>
                <text x="255" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">80g</text>
                <text x="365" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">120g/h 攝入</text>

                {/* Single Glucose Curve (Flattens at 60g) */}
                <path
                  d="M 35 140 L 200 80 L 365 80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                />

                {/* Dual Transport Curve (Continuous climb up to 100g) */}
                <path
                  d="M 35 140 L 200 80 Q 280 45 365 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                />
                <text x="300" y="42" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="sans-serif">雙通道 SGLT1+GLUT5</text>

                {/* Dynamic Indicator */}
                {(() => {
                  const x = 35 + (carbIntake / 120) * 330;
                  return (
                    <g>
                      <line x1={x} y1="20" x2={x} y2="140" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1.5" />
                      <circle cx={x} cy={140 - (carbData.dualTotal / 100) * 110} r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {RUNNING_INFOGRAPHICS[3].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nature-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
