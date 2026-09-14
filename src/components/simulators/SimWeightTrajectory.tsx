import React, { useState, useMemo } from 'react';
import {
  Scale,
  Flame,
  Dumbbell,
  ShieldAlert,
  AlertTriangle,
  TrendingDown,
  Sparkles,
  Info,
  CheckCircle2,
  RefreshCw,
  Activity,
  Zap,
} from 'lucide-react';

export type InterventionType = 
  | 'LIFESTYLE' 
  | 'ORLISTAT_CONTRAVE' 
  | 'SEMAGLUTIDE' 
  | 'TIRZEPATIDE' 
  | 'SURGERY';

export type ProteinLevel = 'LOW' | 'MODERATE' | 'OPTIMAL';
export type ResistanceLevel = 'NONE' | '2X_WEEK' | '4X_WEEK';

export const SimWeightTrajectory: React.FC = () => {
  // User physiological parameters
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [age, setAge] = useState<number>(38);
  const [heightCm, setHeightCm] = useState<number>(172);
  const [initialWeightKg, setInitialWeightKg] = useState<number>(92);
  const [initialFatPct, setInitialFatPct] = useState<number>(33);

  // Intervention & Muscle Defense
  const [intervention, setIntervention] = useState<InterventionType>('SEMAGLUTIDE');
  const [proteinLevel, setProteinLevel] = useState<ProteinLevel>('MODERATE');
  const [resistanceLevel, setResistanceLevel] = useState<ResistanceLevel>('2X_WEEK');

  // Cessation & Rebound Simulator
  const [simulateCessation, setSimulateCessation] = useState<boolean>(true);
  const [cessationWeek, setCessationWeek] = useState<number>(26);

  // Selected hover week for inspection
  const [hoveredWeek, setHoveredWeek] = useState<number>(52);

  // Core Math & Physiological Engine
  const simulationData = useMemo(() => {
    const initialBMR =
      gender === 'M'
        ? 10 * initialWeightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * initialWeightKg + 6.25 * heightCm - 5 * age - 161;

    const initialFatMass = initialWeightKg * (initialFatPct / 100);
    const initialLeanMass = initialWeightKg - initialFatMass;

    // Intervention maximal 1-year loss percentage baseline
    const interventionProfile = {
      LIFESTYLE: { maxPct: 0.07, rateConst: 0.09, reboundRate: 0.85 },
      ORLISTAT_CONTRAVE: { maxPct: 0.09, rateConst: 0.08, reboundRate: 0.80 },
      SEMAGLUTIDE: { maxPct: 0.16, rateConst: 0.075, reboundRate: 0.68 },
      TIRZEPATIDE: { maxPct: 0.22, rateConst: 0.07, reboundRate: 0.65 },
      SURGERY: { maxPct: 0.32, rateConst: 0.065, reboundRate: 0.15 },
    }[intervention];

    // Protein defense factor on lean body mass loss
    // Without defense, lean mass loss is ~35-40% of total loss.
    // With high protein + resistance, lean mass loss drops to ~10-15%.
    let leanLossRatio = 0.35; // Default low protein, no heavy resistance
    if (proteinLevel === 'MODERATE') leanLossRatio -= 0.10;
    if (proteinLevel === 'OPTIMAL') leanLossRatio -= 0.16;

    if (resistanceLevel === '2X_WEEK') leanLossRatio -= 0.08;
    if (resistanceLevel === '4X_WEEK') leanLossRatio -= 0.14;

    // Constrain leanLossRatio between 8% and 42%
    leanLossRatio = Math.max(0.08, Math.min(0.42, leanLossRatio));
    const fatLossRatio = 1 - leanLossRatio;

    const weeks = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52];
    const points = weeks.map((w) => {
      let currentLossKg = 0;
      let isRebounding = false;

      const isPostCessation = simulateCessation && w > cessationWeek;
      if (!isPostCessation) {
        // Asymptotic exponential weight decay curve
        const progress = 1 - Math.exp(-interventionProfile.rateConst * w);
        const maxLossKg = initialWeightKg * interventionProfile.maxPct;
        currentLossKg = maxLossKg * progress;
      } else {
        isRebounding = true;
        // Calculate loss achieved at cessation week
        const progressAtStop = 1 - Math.exp(-interventionProfile.rateConst * cessationWeek);
        const lossAtStop = initialWeightKg * interventionProfile.maxPct * progressAtStop;
        
        // Rebound progression over time
        const weeksSinceStop = w - cessationWeek;
        const reboundProgress = 1 - Math.exp(-0.065 * weeksSinceStop);
        const totalReboundKg = lossAtStop * interventionProfile.reboundRate;
        
        // Post-cessation regained weight is predominantly fat mass (90%+ fat)
        currentLossKg = Math.max(0, lossAtStop - totalReboundKg * reboundProgress);
      }

      const currentTotalWeight = initialWeightKg - currentLossKg;
      const lowerBound = currentTotalWeight * 0.96; // -4% SD band
      const upperBound = currentTotalWeight * 1.04; // +4% SD band

      const totalLossSoFar = initialWeightKg - currentTotalWeight;
      const totalFatLost = Math.max(0, totalLossSoFar * fatLossRatio);
      const totalLeanLost = Math.max(0, totalLossSoFar * leanLossRatio);

      const currentFatMass = Math.max(5, initialFatMass - totalFatLost);
      const currentLeanMass = Math.max(25, initialLeanMass - totalLeanLost);
      const currentFatPct = (currentFatMass / currentTotalWeight) * 100;

      // Adaptive thermogenesis: BMR drops by body weight drop + metabolic slowdown ~10-18%
      const metabolicAdaptation = totalLossSoFar * 14.5 + (isPostCessation ? -40 : 60);
      const currentBMR = Math.round(initialBMR - metabolicAdaptation);

      return {
        week: w,
        weight: parseFloat(currentTotalWeight.toFixed(1)),
        lower: parseFloat(lowerBound.toFixed(1)),
        upper: parseFloat(upperBound.toFixed(1)),
        fatLost: parseFloat(totalFatLost.toFixed(1)),
        leanLost: parseFloat(totalLeanLost.toFixed(1)),
        currentFatPct: parseFloat(currentFatPct.toFixed(1)),
        currentBMR,
        isRebounding,
      };
    });

    return {
      initialBMR: Math.round(initialBMR),
      initialFatMass: parseFloat(initialFatMass.toFixed(1)),
      initialLeanMass: parseFloat(initialLeanMass.toFixed(1)),
      leanLossRatioPct: Math.round(leanLossRatio * 100),
      fatLossRatioPct: Math.round(fatLossRatio * 100),
      points,
    };
  }, [
    gender,
    age,
    heightCm,
    initialWeightKg,
    initialFatPct,
    intervention,
    proteinLevel,
    resistanceLevel,
    simulateCessation,
    cessationWeek,
  ]);

  const activePoint = useMemo(() => {
    return simulationData.points.find((p) => p.week === hoveredWeek) || simulationData.points[simulationData.points.length - 1];
  }, [simulationData, hoveredWeek]);

  // SVG Chart Dimensions
  const svgWidth = 650;
  const svgHeight = 240;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };

  const minWeight = Math.min(...simulationData.points.map((p) => p.lower)) - 2;
  const maxWeight = initialWeightKg + 2;

  const scaleX = (week: number) => {
    return padding.left + (week / 52) * (svgWidth - padding.left - padding.right);
  };

  const scaleY = (weight: number) => {
    const ratio = (weight - minWeight) / (maxWeight - minWeight);
    return svgHeight - padding.bottom - ratio * (svgHeight - padding.top - padding.bottom);
  };

  // Generate SVG paths
  const mainLinePath = simulationData.points.reduce((acc, p, i) => {
    const x = scaleX(p.week);
    const y = scaleY(p.weight);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaUncertaintyPath = `
    ${simulationData.points.reduce((acc, p, i) => {
      const x = scaleX(p.week);
      const y = scaleY(p.upper);
      return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '')}
    ${simulationData.points
      .slice()
      .reverse()
      .reduce((acc, p) => {
        const x = scaleX(p.week);
        const y = scaleY(p.lower);
        return `${acc} L ${x} ${y}`;
      }, '')}
    Z
  `;

  return (
    <div className="rounded-3xl border border-salud-cyan/30 bg-slate-900/90 text-slate-100 p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salud-cyan/15 text-salud-cyan border border-salud-cyan/30 text-xs font-mono font-bold mb-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>Salud 旗艦生理引擎 · SIM-WEIGHT-TRAJECTORY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
            <span>減重成效與體組成動態軌跡模擬器</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              去脂體重保護演算法
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            依據 STEP-1 / SURMOUNT-1 臨床三期試驗、DEXA 身體組成次級分析及 Herman Pontzer 代謝適應模型建立。精準預測
            52 週體重下滑、脂肪 vs 肌肉流失比例與停藥反彈曲線。
          </p>
        </div>

        <button
          onClick={() => {
            setInitialWeightKg(90);
            setInitialFatPct(32);
            setIntervention('SEMAGLUTIDE');
            setProteinLevel('MODERATE');
            setResistanceLevel('2X_WEEK');
            setSimulateCessation(true);
            setCessationWeek(26);
          }}
          className="btn-tactile self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>重置預設參數</span>
        </button>
      </div>

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Physical Baseline */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-salud-cyan">
            <Activity className="w-4 h-4" />
            <span>1. 個人生理初始基準</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">生理性別</label>
              <div className="flex rounded-lg border border-slate-700 overflow-hidden text-xs">
                <button
                  onClick={() => setGender('M')}
                  className={`flex-1 py-1.5 font-bold transition-colors ${
                    gender === 'M' ? 'bg-salud-cyan text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  男性 (M)
                </button>
                <button
                  onClick={() => setGender('F')}
                  className={`flex-1 py-1.5 font-bold transition-colors ${
                    gender === 'F' ? 'bg-salud-cyan text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  女性 (F)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">年齡: {age} 歲</label>
              <input
                type="range"
                min={18}
                max={75}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                className="w-full accent-salud-cyan cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                起始體重: <span className="text-white font-bold">{initialWeightKg} kg</span>
              </label>
              <input
                type="range"
                min={55}
                max={150}
                value={initialWeightKg}
                onChange={(e) => setInitialWeightKg(parseInt(e.target.value, 10))}
                className="w-full accent-salud-cyan cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                起始體脂率: <span className="text-amber-400 font-bold">{initialFatPct}%</span>
              </label>
              <input
                type="range"
                min={15}
                max={50}
                value={initialFatPct}
                onChange={(e) => setInitialFatPct(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono flex justify-between text-slate-400">
            <span>初始脂肪重: <strong className="text-slate-200">{simulationData.initialFatMass} kg</strong></span>
            <span>去脂肌肉重: <strong className="text-emerald-300">{simulationData.initialLeanMass} kg</strong></span>
          </div>
        </div>

        {/* Column 2: Intervention Choice */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <Flame className="w-4 h-4" />
            <span>2. 選擇主要臨床介入手段</span>
          </div>

          <div className="space-y-1.5">
            {[
              { id: 'LIFESTYLE' as InterventionType, label: '生活型態飲食改善 (-500 kcal/d)', tag: '減約 7%' },
              { id: 'ORLISTAT_CONTRAVE' as InterventionType, label: '口服處方藥 (Orlistat / Contrave)', tag: '減約 9%' },
              { id: 'SEMAGLUTIDE' as InterventionType, label: 'GLP-1 RA: Semaglutide (Wegovy 2.4mg)', tag: '減約 15~16%' },
              { id: 'TIRZEPATIDE' as InterventionType, label: '雙促效劑: Tirzepatide (Zepbound 15mg)', tag: '減約 21~23%' },
              { id: 'SURGERY' as InterventionType, label: '減重代謝手術 (Sleeve / Bypass)', tag: '減約 30~35%' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setIntervention(opt.id)}
                className={`w-full p-2 rounded-xl text-left border transition-all flex items-center justify-between text-xs ${
                  intervention === opt.id
                    ? 'border-amber-400 bg-amber-400/20 text-white font-bold shadow-sm'
                    : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span>{opt.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-bold border border-slate-700">
                  {opt.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Muscle Defense & Cessation */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <Dumbbell className="w-4 h-4" />
            <span>3. 去脂體重防禦與停藥模擬</span>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">每日蛋白質攝取強度</label>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                onClick={() => setProteinLevel('LOW')}
                className={`p-1.5 rounded-lg border text-center font-mono ${
                  proteinLevel === 'LOW'
                    ? 'border-red-400 bg-red-400/20 text-white font-bold'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                }`}
              >
                低 (&lt;0.8g/kg)
              </button>
              <button
                onClick={() => setProteinLevel('MODERATE')}
                className={`p-1.5 rounded-lg border text-center font-mono ${
                  proteinLevel === 'MODERATE'
                    ? 'border-salud-cyan bg-salud-cyan/20 text-salud-cyan font-bold'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                }`}
              >
                建議 (1.2-1.5g)
              </button>
              <button
                onClick={() => setProteinLevel('OPTIMAL')}
                className={`p-1.5 rounded-lg border text-center font-mono ${
                  proteinLevel === 'OPTIMAL'
                    ? 'border-emerald-400 bg-emerald-400/20 text-emerald-300 font-bold'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                }`}
              >
                強化 (1.8-2.2g)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">漸進阻抗重訓頻率</label>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                onClick={() => setResistanceLevel('NONE')}
                className={`p-1.5 rounded-lg border text-center font-mono ${
                  resistanceLevel === 'NONE'
                    ? 'border-red-400 bg-red-400/20 text-white font-bold'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                }`}
              >
                無重訓 (0次)
              </button>
              <button
                onClick={() => setResistanceLevel('2X_WEEK')}
                className={`p-1.5 rounded-lg border text-center font-mono ${
                  resistanceLevel === '2X_WEEK'
                    ? 'border-salud-cyan bg-salud-cyan/20 text-salud-cyan font-bold'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                }`}
              >
                每週 2 次
              </button>
              <button
                onClick={() => setResistanceLevel('4X_WEEK')}
                className={`p-1.5 rounded-lg border text-center font-mono ${
                  resistanceLevel === '4X_WEEK'
                    ? 'border-emerald-400 bg-emerald-400/20 text-emerald-300 font-bold'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
                }`}
              >
                每週 3-4 次
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>模擬停藥反彈 (Week {cessationWeek})</span>
              </label>
              <input
                type="checkbox"
                checked={simulateCessation}
                onChange={(e) => setSimulateCessation(e.target.checked)}
                className="rounded accent-rose-400 w-4 h-4 cursor-pointer"
              />
            </div>
            {simulateCessation && (
              <div className="mt-2">
                <input
                  type="range"
                  min={12}
                  max={40}
                  step={2}
                  value={cessationWeek}
                  onChange={(e) => setCessationWeek(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>第 12 週停藥</span>
                  <span className="text-rose-300 font-bold">第 {cessationWeek} 週中斷</span>
                  <span>第 40 週停藥</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Visual SVG Trajectory Curve */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-4 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-salud-cyan inline-block" />
              <span>體重軌跡 (kg)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-salud-cyan/20 border border-salud-cyan/40 inline-block" />
              <span>臨床試驗 ±4% 不確定區間</span>
            </span>
            {simulateCessation && (
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-0.5 bg-rose-400 border-dashed inline-block" />
                <span>停藥反彈警戒區</span>
              </span>
            )}
          </div>

          <div className="font-mono text-slate-400 text-[11px]">
            滑鼠懸停折線節點可檢視各週細節
          </div>
        </div>

        {/* SVG Chart */}
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto max-h-[300px] select-none"
          >
            {/* Grid lines */}
            {[0, 10, 20, 30, 40, 50].map((w) => {
              const x = scaleX(w);
              return (
                <line
                  key={`grid-x-${w}`}
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={svgHeight - padding.bottom}
                  stroke="#334155"
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                />
              );
            })}

            {/* Horizontal Y-axis guidelines */}
            {[initialWeightKg, initialWeightKg - 5, initialWeightKg - 10, initialWeightKg - 15, initialWeightKg - 20]
              .filter((wt) => wt >= minWeight)
              .map((wt) => {
                const y = scaleY(wt);
                return (
                  <g key={`grid-y-${wt}`}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={svgWidth - padding.right}
                      y2={y}
                      stroke="#334155"
                      strokeDasharray="2 2"
                      strokeWidth="0.8"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {wt}kg
                    </text>
                  </g>
                );
              })}

            {/* Cessation Marker Line */}
            {simulateCessation && (
              <g>
                <line
                  x1={scaleX(cessationWeek)}
                  y1={padding.top}
                  x2={scaleX(cessationWeek)}
                  y2={svgHeight - padding.bottom}
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <text
                  x={scaleX(cessationWeek)}
                  y={padding.top + 10}
                  textAnchor="middle"
                  fill="#fb7185"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  第 {cessationWeek} 週停藥
                </text>
              </g>
            )}

            {/* Uncertainty Ribbon */}
            <path d={areaUncertaintyPath} fill="rgba(6, 182, 212, 0.12)" />

            {/* Main Trajectory Line */}
            <path
              d={mainLinePath}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Week data circles */}
            {simulationData.points.map((p) => {
              const x = scaleX(p.week);
              const y = scaleY(p.weight);
              const isHovered = p.week === hoveredWeek;
              const isReboundPoint = p.isRebounding;

              return (
                <g
                  key={`pt-${p.week}`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredWeek(p.week)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 6 : 4}
                    fill={isReboundPoint ? '#fb7185' : '#06b6d4'}
                    stroke="#0f172a"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  {isHovered && (
                    <circle
                      cx={x}
                      cy={y}
                      r={10}
                      fill="none"
                      stroke={isReboundPoint ? '#fb7185' : '#06b6d4'}
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}
                  {/* X Axis Label */}
                  <text
                    x={x}
                    y={svgHeight - 12}
                    textAnchor="middle"
                    fill={isHovered ? '#06b6d4' : '#64748b'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                  >
                    W{p.week}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Week Detailed Breakdown Card */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400">第 {activePoint.week} 週體重</div>
            <div className="text-xl font-mono font-extrabold text-white mt-0.5">
              {activePoint.weight} <span className="text-xs font-normal text-slate-400">kg</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
              累計減重 -{(initialWeightKg - activePoint.weight).toFixed(1)} kg
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400">純脂肪流失量</div>
            <div className="text-xl font-mono font-extrabold text-amber-400 mt-0.5">
              -{activePoint.fatLost} <span className="text-xs font-normal text-slate-400">kg</span>
            </div>
            <div className="text-[10px] font-mono text-amber-300/80 mt-0.5">
              體脂率降至 {activePoint.currentFatPct}%
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400">骨骼肌/去脂流失</div>
            <div className={`text-xl font-mono font-extrabold mt-0.5 ${
              simulationData.leanLossRatioPct > 28 ? 'text-red-400' : 'text-emerald-400'
            }`}>
              -{activePoint.leanLost} <span className="text-xs font-normal text-slate-400">kg</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              佔總減重 {simulationData.leanLossRatioPct}%
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400">動態基礎代謝 (BMR)</div>
            <div className="text-xl font-mono font-extrabold text-purple-300 mt-0.5">
              {activePoint.currentBMR} <span className="text-xs font-normal text-slate-400">kcal</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              代謝適應 -{simulationData.initialBMR - activePoint.currentBMR} kcal
            </div>
          </div>
        </div>
      </div>

      {/* Body Composition Loss Ratio Bar & Sarcopenia Risk Check */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-salud-cyan" />
            <span>去脂體重保護比率與肌少症風險評級 (Sarcopenic Risk Audit)</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {simulationData.leanLossRatioPct <= 15 ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>骨骼肌卓越防禦 (肌肉流失 &lt;15%)</span>
              </span>
            ) : simulationData.leanLossRatioPct <= 25 ? (
              <span className="px-2.5 py-1 rounded-full bg-salud-cyan/20 text-salud-cyan border border-salud-cyan/40 font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>標準減重比率 (肌肉流失 15~25%)</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 font-bold flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>高肌少症肥胖風險 (肌肉流失 &gt;25%)</span>
              </span>
            )}
          </div>
        </div>

        {/* 100% Stacked Horizontal Ratio Bar */}
        <div className="space-y-1.5">
          <div className="h-5 w-full rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex font-mono text-[10px] font-bold text-slate-950">
            <div
              style={{ width: `${simulationData.fatLossRatioPct}%` }}
              className="bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center transition-all duration-300"
            >
              脂肪流失 {simulationData.fatLossRatioPct}%
            </div>
            <div
              style={{ width: `${simulationData.leanLossRatioPct}%` }}
              className={`flex items-center justify-center transition-all duration-300 ${
                simulationData.leanLossRatioPct > 25
                  ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white'
                  : 'bg-gradient-to-r from-emerald-400 to-teal-500'
              }`}
            >
              肌肉流失 {simulationData.leanLossRatioPct}%
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>
              純脂肪流失: <strong className="text-amber-400">{(100 - simulationData.leanLossRatioPct)}%</strong>
            </span>
            <span>
              去脂骨骼肌流失: <strong className={simulationData.leanLossRatioPct > 25 ? 'text-red-400 font-bold' : 'text-emerald-400'}>{simulationData.leanLossRatioPct}%</strong>
            </span>
          </div>
        </div>

        {/* Clinical Pearl Box */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-salud-cyan shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-salud-cyan">EC-33 體組成運動生理學家 & EC-29 減重營養師 臨床備註：</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              在缺乏肌力抗阻刺激與低蛋白質飲食下，身體會優先水解骨骼肌供應胺基酸進行糖質新生，導致減重中高達 35-40% 都是肌肉！
              這會造成「基礎代謝率崩塌」，一旦停藥食慾恢復，熱量會以 2 倍速度以純脂肪型態反彈，形成體脂率比減重前更高的惡性循環。
              維持 <strong>1.8g/kg 蛋白質 + 每週 3 次重訓</strong>，是守護骨骼肌、徹底終結溜溜球效應的唯一科學防線。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
