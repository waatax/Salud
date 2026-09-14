import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Clock,
  Sparkles,
  Zap,
  TrendingDown,
  TrendingUp,
  Shield,
  RotateCcw,
  Sliders,
  Award,
} from 'lucide-react';

export const SimLongevityTrajectory: React.FC = () => {
  const [chronologicalAge, setChronologicalAge] = useState<number>(45);
  const [zone2Level, setZone2Level] = useState<number>(2); // 0: None, 1: 1-2x, 2: 3-4x, 3: 5+x
  const [resistanceLevel, setResistanceLevel] = useState<number>(2); // 0: None, 1: 1-2x, 2: 3-4x
  const [dietFasting, setDietFasting] = useState<number>(2); // 0: SAD, 1: Med, 2: 16/8 IF, 3: FMD+CR
  const [hormesisLevel, setHormesisLevel] = useState<number>(2); // 0: None, 1: 1-2x, 2: 4-7x Sauna+Cold
  const [sleepQuality, setSleepQuality] = useState<number>(2); // 0: <6h, 1: 6-7h, 2: 7-8.5h deep
  const [visceralFatLevel, setVisceralFatLevel] = useState<number>(1); // 0: Obese, 1: Normal, 2: Lean
  const [compoundProtocol, setCompoundProtocol] = useState<number>(1); // 0: None, 1: NAD+/Spermidine, 2: Rapa/Senolytics

  // ── Calculation Engine ──
  // Base pace = 1.0
  let pace = 1.0;

  // Zone 2 modifications (-0.03 to -0.09)
  if (zone2Level === 0) pace += 0.08;
  else if (zone2Level === 1) pace -= 0.03;
  else if (zone2Level === 2) pace -= 0.07;
  else if (zone2Level === 3) pace -= 0.10;

  // Resistance training
  if (resistanceLevel === 0) pace += 0.05;
  else if (resistanceLevel === 1) pace -= 0.03;
  else if (resistanceLevel === 2) pace -= 0.06;

  // Diet & fasting
  if (dietFasting === 0) pace += 0.08;
  else if (dietFasting === 1) pace -= 0.04;
  else if (dietFasting === 2) pace -= 0.06;
  else if (dietFasting === 3) pace -= 0.09;

  // Hormesis (Sauna & Cold)
  if (hormesisLevel === 1) pace -= 0.03;
  else if (hormesisLevel === 2) pace -= 0.07;

  // Sleep
  if (sleepQuality === 0) pace += 0.10;
  else if (sleepQuality === 1) pace += 0.02;
  else if (sleepQuality === 2) pace -= 0.05;

  // Visceral Fat / Body Composition
  if (visceralFatLevel === 0) pace += 0.12; // Obese visceral fat SASP acceleration
  else if (visceralFatLevel === 1) pace -= 0.02;
  else if (visceralFatLevel === 2) pace -= 0.05;

  // Compounds
  if (compoundProtocol === 1) pace -= 0.04;
  else if (compoundProtocol === 2) pace -= 0.08;

  // Bound pace between 0.65 and 1.45
  pace = Math.max(0.65, Math.min(1.45, pace));

  // Biological Age Calculation
  const bioAgeDelta = Math.round((pace - 1.0) * (chronologicalAge - 20) * 0.85);
  const biologicalAge = Math.max(18, chronologicalAge + bioAgeDelta);

  // Lifespan & Healthspan projection
  // Standard baseline: Lifespan ~80, Healthspan ~67 (disability ~13 years)
  const paceFactor = 1.0 - pace; // e.g. 1.0 - 0.75 = +0.25
  const projectedLifespan = Math.round(80 + paceFactor * 35);
  const projectedHealthspan = Math.round(67 + paceFactor * 45);
  const disabilityYears = Math.max(1, projectedLifespan - projectedHealthspan);

  // SVG Curve Dimensions
  const svgWidth = 600;
  const svgHeight = 240;
  const padding = 40;

  // Helper to map (age, capacity 0-100) to SVG coordinates
  const getX = (age: number) => padding + ((age - 20) / 80) * (svgWidth - padding * 2);
  const getY = (capacity: number) => svgHeight - padding - (capacity / 100) * (svgHeight - padding * 2);

  // Generate curves
  // 1. Natural sedentary trajectory
  const naturalPoints: string[] = [];
  for (let a = 20; a <= 82; a += 2) {
    let cap = 100;
    if (a > 30) cap -= (a - 30) * 1.6;
    cap = Math.max(0, cap);
    naturalPoints.push(`${getX(a)},${getY(cap)}`);
  }

  // 2. Optimized longevity trajectory
  const optimizedPoints: string[] = [];
  for (let a = 20; a <= projectedLifespan; a += 2) {
    let cap = 100;
    if (a > 45) {
      const dropRate = 1.5 * (pace / 1.0);
      cap -= (a - 45) * dropRate * 0.7;
    }
    // Terminal drop (morbidity compression)
    if (a > projectedHealthspan) {
      cap -= (a - projectedHealthspan) * 10;
    }
    cap = Math.max(0, cap);
    optimizedPoints.push(`${getX(a)},${getY(cap)}`);
  }

  return (
    <div className="rounded-3xl border border-salud-cyan/40 bg-slate-900/90 p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-salud-cyan uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>INFOGRAPH 6 · 互動式動態壽命模擬器</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
            健康壽命與疾病壓縮動態模擬 (Morbidity Compression Sim)
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            依據 James Fries 疾病壓縮理論與 DunedinPACE 表觀遺傳老化算法，實時演算生活方式干預對生理年齡與失能期的重塑。
          </p>
        </div>

        <button
          onClick={() => {
            setChronologicalAge(45);
            setZone2Level(2);
            setResistanceLevel(2);
            setDietFasting(2);
            setHormesisLevel(2);
            setSleepQuality(2);
            setVisceralFatLevel(1);
            setCompoundProtocol(1);
          }}
          className="btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>重設預設值</span>
        </button>
      </div>

      {/* Primary Results Display Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
          <div className="text-[10px] font-mono text-slate-400">當前歷法年齡</div>
          <div className="text-2xl font-mono font-extrabold text-white">{chronologicalAge} 歲</div>
          <div className="text-[10px] text-slate-500">身份證客觀歲數</div>
        </div>

        <div className="p-4 rounded-2xl bg-salud-cyan/10 border border-salud-cyan/30 text-center space-y-1">
          <div className="text-[10px] font-mono text-salud-cyan">估算生理年齡 (Biological Age)</div>
          <div className="text-2xl font-mono font-extrabold text-salud-cyan">
            {biologicalAge} 歲
          </div>
          <div className="text-[10px] font-mono text-emerald-400">
            {biologicalAge < chronologicalAge ? `逆轉 -${chronologicalAge - biologicalAge} 歲` : `加速 +${biologicalAge - chronologicalAge} 歲`}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center space-y-1">
          <div className="text-[10px] font-mono text-indigo-300">DunedinPACE 衰老速率</div>
          <div className="text-2xl font-mono font-extrabold text-indigo-400">
            {pace.toFixed(2)}x
          </div>
          <div className="text-[10px] text-slate-400">
            {pace < 1.0 ? `老化放慢 ${Math.round((1 - pace) * 100)}%` : `老化加快 ${Math.round((pace - 1) * 100)}%`}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
          <div className="text-[10px] font-mono text-emerald-400">失能期壓縮預測 (Morbidity)</div>
          <div className="text-2xl font-mono font-extrabold text-emerald-400">
            僅 {disabilityYears} 年
          </div>
          <div className="text-[10px] text-slate-400">
            健康壽命預期至 {projectedHealthspan} 歲
          </div>
        </div>
      </div>

      {/* Dynamic SVG Trajectory Chart */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-0.5 bg-rose-500 inline-block" />
              <span>自然退化曲線 (典型久坐高脂)</span>
            </span>
            <span className="flex items-center gap-1.5 text-salud-cyan font-bold">
              <span className="w-3 h-0.5 bg-salud-cyan inline-block" />
              <span>長壽優化曲線 (疾病壓縮)</span>
            </span>
          </div>
          <span className="text-slate-500">縱軸: 全身生理機能 (0~100%) · 橫軸: 年齡 (20~100歲)</span>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-48 sm:h-56 select-none"
          >
            {/* Grid Lines */}
            <line x1={padding} y1={getY(25)} x2={svgWidth - padding} y2={getY(25)} stroke="#334155" strokeDasharray="3 3" />
            <line x1={padding} y1={getY(50)} x2={svgWidth - padding} y2={getY(50)} stroke="#334155" strokeDasharray="3 3" />
            <line x1={padding} y1={getY(75)} x2={svgWidth - padding} y2={getY(75)} stroke="#334155" strokeDasharray="3 3" />

            {/* Disability Threshold Line */}
            <line x1={padding} y1={getY(35)} x2={svgWidth - padding} y2={getY(35)} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
            <text x={svgWidth - padding - 8} y={getY(35) - 6} fill="#ef4444" fontSize="9" textAnchor="end" fontFamily="monospace">
              重大失能/臥床閾值 (35%)
            </text>

            {/* Current Age Pin */}
            <line
              x1={getX(chronologicalAge)}
              y1={padding}
              x2={getX(chronologicalAge)}
              y2={svgHeight - padding}
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <text
              x={getX(chronologicalAge)}
              y={padding - 6}
              fill="#06b6d4"
              fontSize="9"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="bold"
            >
              您目前 ({chronologicalAge}歲)
            </text>

            {/* Natural Curve */}
            <polyline
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="4 2"
              points={naturalPoints.join(' ')}
            />

            {/* Optimized Curve */}
            <polyline
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              points={optimizedPoints.join(' ')}
            />

            {/* X-axis labels */}
            {[20, 40, 60, 80, 100].map((a) => (
              <text
                key={`x-lbl-${a}`}
                x={getX(a)}
                y={svgHeight - padding + 16}
                fill="#64748b"
                fontSize="9"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {a}歲
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Multi-Parameter Sliders Grid */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
          <Activity className="w-4 h-4 text-salud-cyan" />
          <span>多維度長壽處方參數微調盤</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Chronological Age Slider */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">當前歷法年齡</span>
              <span className="font-mono font-bold text-white">{chronologicalAge} 歲</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={chronologicalAge}
              onChange={(e) => setChronologicalAge(parseInt(e.target.value))}
              className="w-full accent-salud-cyan h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Zone 2 Cardio */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Zone 2 粒線體有氧</span>
              <span className="font-mono font-bold text-salud-cyan">
                {zone2Level === 0 ? '無' : zone2Level === 1 ? '每週1-2次' : zone2Level === 2 ? '每週3-4次' : '每週5+次'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              value={zone2Level}
              onChange={(e) => setZone2Level(parseInt(e.target.value))}
              className="w-full accent-salud-cyan h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Resistance Training */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">抗阻力肌力訓練</span>
              <span className="font-mono font-bold text-amber-400">
                {resistanceLevel === 0 ? '無' : resistanceLevel === 1 ? '每週1-2次' : '每週3-4次'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={resistanceLevel}
              onChange={(e) => setResistanceLevel(parseInt(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Diet & Fasting */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">飲食與禁食自噬</span>
              <span className="font-mono font-bold text-emerald-400">
                {dietFasting === 0 ? '標準外食' : dietFasting === 1 ? '地中海' : dietFasting === 2 ? '16/8 斷食' : 'FMD 類斷食'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              value={dietFasting}
              onChange={(e) => setDietFasting(parseInt(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Hormesis Sauna/Cold */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">桑拿與冷水激效</span>
              <span className="font-mono font-bold text-teal-400">
                {hormesisLevel === 0 ? '無' : hormesisLevel === 1 ? '每週1-2次' : '每週4-7次 (Kuopio)'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={hormesisLevel}
              onChange={(e) => setHormesisLevel(parseInt(e.target.value))}
              className="w-full accent-teal-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Sleep Quality */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">睡眠與膠淋巴排毒</span>
              <span className="font-mono font-bold text-purple-400">
                {sleepQuality === 0 ? '<6小時' : sleepQuality === 1 ? '6-7小時' : '7-8.5小時深眠'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={sleepQuality}
              onChange={(e) => setSleepQuality(parseInt(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Visceral Fat */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">體脂與內臟脂肪</span>
              <span className="font-mono font-bold text-rose-400">
                {visceralFatLevel === 0 ? '腹部肥胖 (SASP高)' : visceralFatLevel === 1 ? '標準正常' : '精瘦精悍'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={visceralFatLevel}
              onChange={(e) => setVisceralFatLevel(parseInt(e.target.value))}
              className="w-full accent-rose-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Longevity Compounds */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">長壽化合物介入</span>
              <span className="font-mono font-bold text-amber-300">
                {compoundProtocol === 0 ? '無' : compoundProtocol === 1 ? 'NAD+/亞精胺' : '雷帕黴素/Senolytics'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={compoundProtocol}
              onChange={(e) => setCompoundProtocol(parseInt(e.target.value))}
              className="w-full accent-amber-300 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
