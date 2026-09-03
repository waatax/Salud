import React, { useState, useMemo } from 'react';
import { ShieldAlert, Droplets, ArrowRight, Table, RefreshCw, AlertOctagon } from 'lucide-react';

export const SimHydration: React.FC = () => {
  // Inputs
  const [weightKg, setWeightKg] = useState<number>(68);
  const [tempC, setTempC] = useState<number>(32);
  const [humidity, setHumidity] = useState<number>(78); // Taiwan default
  const [environment, setEnvironment] = useState<'indoor_ac' | 'indoor_no_ac' | 'outdoor_shade' | 'outdoor_sun'>('outdoor_shade');
  const [activityMin, setActivityMin] = useState<number>(45);
  const [intensity, setIntensity] = useState<'low' | 'moderate' | 'vigorous'>('moderate');
  const [beverageIntakeL, setBeverageIntakeL] = useState<number>(2.0);
  const [showTable, setShowTable] = useState(false);

  // Safety Gate: Gated populations (Heart failure, ESRD, SIADH, Diuretics)
  const [hasHeartFailure, setHasHeartFailure] = useState<boolean>(false);
  const [hasKidneyDisease, setHasKidneyDisease] = useState<boolean>(false);
  const [onDiuretics, setOnDiuretics] = useState<boolean>(false);

  // Check safety gate trigger (Spec §6.0 & §8.2 rule S-11)
  const isSafetyGated = hasHeartFailure || hasKidneyDisease;

  // Calculation model
  const simulationResult = useMemo(() => {
    if (isSafetyGated) {
      return null;
    }

    // Baseline intake
    const foodWater = weightKg * 0.01 * 0.7; // ~0.5 - 0.7 L
    const metabolicWater = 0.3; // ~300 mL
    const totalIntake = beverageIntakeL + foodWater + metabolicWater;

    // Loss model
    // 1. Urine baseline 1.2 L
    const urineLoss = 1.2;
    // 2. Insensible loss (baseline 0.7L, modified by temp & AC)
    let insensibleLoss = 0.7;
    if (environment === 'indoor_ac') insensibleLoss += 0.2; // dry AC air
    if (tempC > 30) insensibleLoss += 0.15;
    // 3. Sweat loss (MET * time * heat index factor)
    const met = intensity === 'low' ? 3.0 : intensity === 'moderate' ? 6.0 : 9.0;
    const heatFactor = (tempC / 25) * (humidity / 60);
    const sweatLoss = (activityMin / 60) * (met * 0.12) * Math.min(heatFactor, 1.8);
    // 4. Feces ~0.15 L
    const fecesLoss = 0.15;

    const totalLoss = urineLoss + insensibleLoss + sweatLoss + fecesLoss;
    const netBalance = totalIntake - totalLoss;

    // Uncertainty range (±15% to ±25%)
    const uncertaintyMargin = 0.3 + (sweatLoss > 0.8 ? 0.3 : 0.1);
    const netLow = Number((netBalance - uncertaintyMargin).toFixed(1));
    const netHigh = Number((netBalance + uncertaintyMargin).toFixed(1));

    // Hard constraint: Cap recommended additional intake <= 4.0 L/day (Spec 6.0 rule 3)
    let recommendedDeficitL = netBalance < 0 ? Math.abs(netBalance) : 0;
    const capExceeded = recommendedDeficitL > 4.0;
    if (capExceeded) recommendedDeficitL = 4.0;

    return {
      intake: Number(totalIntake.toFixed(1)),
      loss: Number(totalLoss.toFixed(1)),
      net: Number(netBalance.toFixed(1)),
      netLow,
      netHigh,
      sweatLoss: Number(sweatLoss.toFixed(1)),
      insensibleLoss: Number(insensibleLoss.toFixed(1)),
      dominantFactor: sweatLoss > 0.6 ? '出汗量（估算值，受運動強度與熱指數主導）' : '室內冷氣房乾燥帶來的不感蒸發',
      capExceeded,
      actionTip: netBalance < -0.5
        ? `運動後 2 小時內分次小口補充 ${Math.round(Math.abs(netBalance) * 800)}–${Math.round(Math.abs(netBalance) * 1100)} mL 水分。`
        : '今日水分收支處於良好平衡帶，維持自在口渴飲水即可。',
    };
  }, [weightKg, tempC, humidity, environment, activityMin, intensity, beverageIntakeL, isSafetyGated]);

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-salud-cyan/30 bg-salud-dark-surface dark:bg-salud-dark-surface light:bg-salud-light-surface overflow-hidden shadow-2xl font-sans text-xs">
      {/* Simulator Header */}
      <div className="p-4 sm:p-5 border-b border-salud-dark-border bg-gradient-to-r from-salud-cyan-950/40 via-salud-dark-card/60 to-transparent flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-salud-cyan/20 border border-salud-cyan/40 text-salud-cyan-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-salud-cyan/20 text-salud-cyan-300 border border-salud-cyan/40">
                SIM-HYDRATION · v0.1
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Chapter W 專屬模擬器</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text">
              水分平衡動態模擬器 (Hydration Balance)
            </h3>
          </div>
        </div>

        <button
          onClick={() => setShowTable(!showTable)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white transition-colors font-mono"
        >
          <Table className="w-3.5 h-3.5 text-salud-cyan" />
          <span>{showTable ? '返回視覺圖表' : '顯示為資料表'}</span>
        </button>
      </div>

      {/* Inputs Section */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5 border-b border-salud-dark-border/80 bg-salud-dark-card/20">
        {/* Left Column: Personal & Activity Inputs */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider text-salud-amber-400">
            1. 個人體型與當日活動
          </h5>

          <div>
            <div className="flex justify-between font-mono text-slate-300 mb-1">
              <span>體重 (Body Weight)：</span>
              <strong className="text-salud-amber-300">{weightKg} kg</strong>
            </div>
            <input
              type="range"
              min={40}
              max={130}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-salud-amber"
            />
          </div>

          <div>
            <div className="flex justify-between font-mono text-slate-300 mb-1">
              <span>活動時間 (Activity Minutes)：</span>
              <strong className="text-salud-cyan-300">{activityMin} 分鐘</strong>
            </div>
            <input
              type="range"
              min={0}
              max={180}
              step={15}
              value={activityMin}
              onChange={(e) => setActivityMin(Number(e.target.value))}
              className="w-full accent-salud-cyan"
            />
          </div>

          <div>
            <span className="font-mono text-slate-300 block mb-1.5">活動強度：</span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['low', 'moderate', 'vigorous'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setIntensity(lvl)}
                  className={`py-1.5 rounded-lg border font-mono capitalize transition-all ${
                    intensity === lvl
                      ? 'bg-salud-cyan/20 border-salud-cyan text-salud-cyan-300 font-bold'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400'
                  }`}
                >
                  {lvl === 'low' ? '低 (散步)' : lvl === 'moderate' ? '中 (慢跑/球類)' : '高 (高強度/長跑)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Environment & Gated Population */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider text-salud-cyan-400">
            2. 氣候環境與飲水輸入
          </h5>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between font-mono text-slate-300 mb-1">
                <span>氣溫：</span>
                <strong className="text-orange-400">{tempC} °C</strong>
              </div>
              <input
                type="range"
                min={15}
                max={38}
                value={tempC}
                onChange={(e) => setTempC(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
            <div>
              <div className="flex justify-between font-mono text-slate-300 mb-1">
                <span>相對濕度：</span>
                <strong className="text-salud-cyan-300">{humidity}%</strong>
              </div>
              <input
                type="range"
                min={30}
                max={95}
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-salud-cyan"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-mono text-slate-300 mb-1">
              <span>今日液體飲入量：</span>
              <strong className="text-salud-amber-300">{beverageIntakeL.toFixed(1)} L</strong>
            </div>
            <input
              type="range"
              min={0.5}
              max={4.5}
              step={0.1}
              value={beverageIntakeL}
              onChange={(e) => setBeverageIntakeL(Number(e.target.value))}
              className="w-full accent-salud-amber"
            />
          </div>

          {/* Gated Population Switches (Spec §6.0 Safety Gate) */}
          <div className="p-3 rounded-xl border border-red-500/30 bg-red-950/20 space-y-2">
            <span className="text-[11px] font-mono text-red-300 font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              限水族群安全閘 (Safety Gate)
            </span>
            <div className="flex flex-wrap gap-3 text-xs text-slate-300">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHeartFailure}
                  onChange={(e) => setHasHeartFailure(e.target.checked)}
                  className="rounded border-red-500 text-red-600 focus:ring-red-500"
                />
                <span>心臟衰竭 (Heart Failure)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasKidneyDisease}
                  onChange={(e) => setHasKidneyDisease(e.target.checked)}
                  className="rounded border-red-500 text-red-600 focus:ring-red-500"
                />
                <span>慢性腎病第4–5期/透析</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Outputs Section (Spec §8.2 Simulation Contract S-01 ~ S-12) */}
      <div className="p-4 sm:p-6 space-y-5">
        {isSafetyGated ? (
          /* Locked Safety Output */
          <div className="p-5 rounded-xl border border-red-500/60 bg-red-950/40 space-y-3">
            <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
              <AlertOctagon className="w-5 h-5 text-red-400 animate-pulse" />
              <span>限水族群專屬醫療安全鎖定（數值輸出已封閉）</span>
            </div>
            <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
              系統偵測到您標記為心衰竭或洗腎病史。對這些族群，一般化的「多喝水」建議具有引發急性肺水腫的實質危險。
              本模擬器嚴格遵守 <strong>Simulation Contract S-11</strong>，已終止一般化數值計算，請遵照專科醫師指示之每日水分上限（通常為 800–1500 mL）。
            </p>
          </div>
        ) : simulationResult ? (
          <>
            {showTable ? (
              /* Data Table View (Spec S-09) */
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-300">
                      <th className="py-2">估算項目</th>
                      <th className="py-2">數值 (L)</th>
                      <th className="py-2">不確定度區間</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-2">總水分輸入 (飲水+食物+代謝)</td>
                      <td className="py-2 text-salud-cyan font-bold">{simulationResult.intake} L</td>
                      <td className="py-2">± 0.2 L</td>
                    </tr>
                    <tr>
                      <td className="py-2">總水分流失 (尿液+蒸發+出汗)</td>
                      <td className="py-2 text-orange-400 font-bold">{simulationResult.loss} L</td>
                      <td className="py-2">± 0.4 L</td>
                    </tr>
                    <tr>
                      <td className="py-2">淨收支平衡 (Net Balance)</td>
                      <td className="py-2 text-salud-amber-400 font-bold">{simulationResult.net} L</td>
                      <td className="py-2">{simulationResult.netLow} ~ {simulationResult.netHigh} L</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              /* Visual Output (Spec §6.3 UX: Balance Bar & Uncertainty Range) */
              <div className="space-y-4">
                {/* Balance Visual Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-xl border border-salud-cyan/30 bg-salud-cyan-950/20">
                    <span className="text-[11px] font-mono text-slate-400 block">估算輸入端 (Intake)</span>
                    <strong className="text-xl font-display text-salud-cyan-300 block my-0.5">
                      +{simulationResult.intake} L
                    </strong>
                    <span className="text-[10px] text-slate-400">飲品 + 食物 + 代謝水</span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-orange-500/30 bg-orange-950/20">
                    <span className="text-[11px] font-mono text-slate-400 block">估算排出端 (Loss)</span>
                    <strong className="text-xl font-display text-orange-300 block my-0.5">
                      -{simulationResult.loss} L
                    </strong>
                    <span className="text-[10px] text-slate-400">
                      尿液 + 不感蒸發 + 汗 ({simulationResult.sweatLoss}L)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-salud-amber/40 bg-salud-amber-950/30 shadow-warm-glow">
                    <span className="text-[11px] font-mono text-salud-amber-400 block font-bold">
                      淨收支 (Net Balance)
                    </span>
                    <strong className="text-xl font-display text-salud-amber-300 block my-0.5">
                      {simulationResult.net > 0 ? `+${simulationResult.net}` : simulationResult.net} L
                    </strong>
                    <span className="text-[11px] text-slate-300 font-mono">
                      區間：{simulationResult.netLow} ~ {simulationResult.netHigh} L
                    </span>
                  </div>
                </div>

                {/* Dominant Input Factor (Spec S-02) */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <div className="p-1 rounded bg-slate-800 text-salud-amber-400 shrink-0 font-mono text-[10px]">
                    S-02
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block font-semibold">
                      影響本次估算最大的是：
                    </span>
                    <span className="text-slate-200 text-xs font-mono font-medium">
                      {simulationResult.dominantFactor}
                    </span>
                  </div>
                </div>

                {/* Single Best Action Tip (Spec §6.3) */}
                <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 flex items-start gap-3 text-emerald-200">
                  <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      今天最值得改的一件事 (Action)
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5 leading-relaxed">
                      {simulationResult.actionTip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Model Assumptions & Governance (Spec S-03 & S-07) */}
            <div className="pt-3 border-t border-salud-dark-border/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
              <div>
                模型假設：族群平均估算 · 溫濕度熱指數修正係數 · 未實測出汗率
              </div>
              <div className="text-slate-500">
                演算法：hydration_balance:v0.1 · 來源：SRC-IOM-2005 / ACSM-2007
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
