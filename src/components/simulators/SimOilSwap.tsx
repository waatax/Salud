import React, { useState, useMemo } from 'react';
import { EDIBLE_OILS } from '../../data/oilsData';
import { RefreshCw, ArrowRight, Table, AlertTriangle, ShieldCheck } from 'lucide-react';

export const SimOilSwap: React.FC = () => {
  const [fromId, setFromId] = useState<string>('lard'); // default lard (豬油)
  const [toId, setToId] = useState<string>('camellia'); // default camellia (苦茶油)
  const [teaspoons, setTeaspoons] = useState<number>(4); // 4 tsp = 20g
  const [cookingContext, setCookingContext] = useState<'stir_fry' | 'salad' | 'deep_fry' | 'baking'>('stir_fry');
  const [totalKcal, setTotalKcal] = useState<number>(2000);
  const [isOnStatin, setIsOnStatin] = useState<boolean>(false);
  const [showTable, setShowTable] = useState(false);

  const fromOil = EDIBLE_OILS.find((o) => o.id === fromId) || EDIBLE_OILS[3];
  const toOil = EDIBLE_OILS.find((o) => o.id === toId) || EDIBLE_OILS[10];

  // Calculation
  const totalGrams = teaspoons * 5; // 5g per tsp
  const sfaFromG = Number(((fromOil.sfa_pct / 100) * totalGrams).toFixed(1));
  const sfaToG = Number(((toOil.sfa_pct / 100) * totalGrams).toFixed(1));
  const sfaDeltaG = Number((sfaToG - sfaFromG).toFixed(1));

  const mufaFromG = Number(((fromOil.mufa_pct / 100) * totalGrams).toFixed(1));
  const mufaToG = Number(((toOil.mufa_pct / 100) * totalGrams).toFixed(1));
  const mufaDeltaG = Number((mufaToG - mufaFromG).toFixed(1));

  const pufaFromG = Number(((fromOil.pufa_pct / 100) * totalGrams).toFixed(1));
  const pufaToG = Number(((toOil.pufa_pct / 100) * totalGrams).toFixed(1));
  const pufaDeltaG = Number((pufaToG - pufaFromG).toFixed(1));

  // %E of SFA (9 kcal/g)
  const sfaFromPctE = Number((((sfaFromG * 9) / totalKcal) * 100).toFixed(1));
  const sfaToPctE = Number((((sfaToG * 9) / totalKcal) * 100).toFixed(1));

  // Suitability check
  const isFlaxseedHeated = toOil.id === 'flaxseed' && (cookingContext === 'stir_fry' || cookingContext === 'deep_fry');

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-salud-amber/30 bg-salud-light-surface dark:bg-salud-dark-surface overflow-hidden shadow-2xl font-sans text-xs transition-colors">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-salud-light-border/80 dark:border-salud-dark-border bg-gradient-to-r from-amber-100/70 via-salud-light-card/80 to-transparent dark:from-salud-amber-950/40 dark:via-salud-dark-card/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-salud-amber/20 border border-salud-amber/40 text-salud-amber-600 dark:text-salud-amber-400">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-salud-amber/20 text-salud-amber-700 dark:text-salud-amber-300 border border-salud-amber/40">
                SIM-OIL-SWAP · v0.1
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Chapter O 專屬模擬器</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-salud-light-text dark:text-salud-dark-text">
              等熱量換油模擬器 (Isocaloric Oil Swap)
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            等熱量前提（總熱量 0 變化）
          </span>
          <button
            onClick={() => setShowTable(!showTable)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-mono"
          >
            <Table className="w-3.5 h-3.5 text-salud-amber-600 dark:text-salud-amber" />
            <span>{showTable ? '返回視覺' : '資料表'}</span>
          </button>
        </div>
      </div>

      {/* Selector Toolbar */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-salud-light-border/80 dark:border-salud-dark-border/80 bg-salud-light-card/40 dark:bg-salud-dark-card/20">
        {/* Swap From */}
        <div>
          <label className="font-mono text-slate-700 dark:text-slate-300 block mb-1 font-semibold">
            原本常吃的油 (Swap From)：
          </label>
          <select
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium focus:border-salud-amber focus:outline-none"
          >
            {EDIBLE_OILS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name_zh} (SFA {o.sfa_pct}%, MUFA {o.mufa_pct}%)
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            發煙點 ~{fromOil.smoke_point_c}°C
          </span>
        </div>

        {/* Swap To */}
        <div>
          <label className="font-mono text-salud-cyan-700 dark:text-salud-cyan block mb-1 font-semibold">
            想替換的好油 (Swap To)：
          </label>
          <select
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-salud-cyan/50 text-slate-800 dark:text-slate-100 text-xs font-medium focus:border-salud-cyan focus:outline-none"
          >
            {EDIBLE_OILS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name_zh} (SFA {o.sfa_pct}%, MUFA {o.mufa_pct}%)
              </option>
            ))}
          </select>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">
            發煙點 ~{toOil.smoke_point_c}°C
          </span>
        </div>

        {/* Daily Teaspoons */}
        <div>
          <div className="flex justify-between font-mono text-slate-700 dark:text-slate-300 mb-1">
            <span>每日用量：</span>
            <strong className="text-salud-amber-600 dark:text-salud-amber-300">
              {teaspoons} 茶匙 ({totalGrams} g · {teaspoons * 45} kcal)
            </strong>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            value={teaspoons}
            onChange={(e) => setTeaspoons(Number(e.target.value))}
            className="w-full accent-salud-amber"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>1 茶匙 (5g)</span>
            <span>4 茶匙 (家常平均)</span>
            <span>8 茶匙 (高外食)</span>
          </div>
        </div>
      </div>

      {/* Cooking context & Statin check */}
      <div className="px-4 sm:px-6 py-3 border-b border-salud-light-border/60 dark:border-salud-dark-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-600 dark:text-slate-400">主要烹飪場景：</span>
          <div className="flex gap-1">
            {[
              { id: 'stir_fry', label: '家常快炒' },
              { id: 'salad', label: '涼拌/低溫' },
              { id: 'deep_fry', label: '高溫煎炸' },
            ].map((ctx) => (
              <button
                key={ctx.id}
                onClick={() => setCookingContext(ctx.id as any)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  cookingContext === ctx.id
                    ? 'bg-salud-amber/20 text-salud-amber-800 dark:text-salud-amber-300 border border-salud-amber/60 font-bold'
                    : 'bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-800'
                }`}
              >
                {ctx.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-1.5 cursor-pointer font-mono text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            checked={isOnStatin}
            onChange={(e) => setIsOnStatin(e.target.checked)}
            className="rounded border-slate-400 dark:border-slate-700 text-salud-cyan focus:ring-salud-cyan"
          />
          <span>目前正在服用降血脂藥物</span>
        </label>
      </div>

      {/* Warning if Flaxseed is heated */}
      {isFlaxseedHeated && (
        <div className="mx-4 sm:mx-6 my-4 p-3 rounded-xl border border-red-300 dark:border-red-500/60 bg-red-100/80 dark:bg-red-950/30 text-red-800 dark:text-red-200 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block">烹調適用性嚴重警告：亞麻仁油不可加熱！</strong>
            <p className="text-xs text-red-900 dark:text-red-200/90 mt-0.5">
              亞麻仁油發煙點僅約 107°C，且含有高達 70% 的極易氧化 ALA，在高溫熱炒或油炸下會迅速劣化產生有害自由基，僅適用於冷盤涼拌。
            </p>
          </div>
        </div>
      )}

      {/* Statin patient notice (Spec §7.0 rule 3) */}
      {isOnStatin && (
        <div className="mx-4 sm:mx-6 my-2 p-3 rounded-xl border border-salud-cyan/40 bg-cyan-100/70 dark:bg-salud-cyan-950/20 text-cyan-900 dark:text-salud-cyan-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-salud-cyan-600 dark:text-salud-cyan-400 shrink-0" />
          <span>
            用藥提示：飲食換油是健康的基石，但<strong>絕對不可自行停用或減少醫師開立的降血脂藥物</strong>。
          </span>
        </div>
      )}

      {/* Results Section */}
      <div className="p-4 sm:p-6 space-y-4">
        {showTable ? (
          /* Table View */
          <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 p-3">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <th className="py-2">營養素指標</th>
                  <th className="py-2">{fromOil.name_zh}</th>
                  <th className="py-2">{toOil.name_zh}</th>
                  <th className="py-2">每日淨變化</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-2">飽和脂肪酸 (SFA)</td>
                  <td className="py-2">{sfaFromG} g</td>
                  <td className="py-2">{sfaToG} g</td>
                  <td className={`py-2 font-bold ${sfaDeltaG <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {sfaDeltaG > 0 ? `+${sfaDeltaG}` : sfaDeltaG} g/日
                  </td>
                </tr>
                <tr>
                  <td className="py-2">單元不飽和 (MUFA)</td>
                  <td className="py-2">{mufaFromG} g</td>
                  <td className="py-2">{mufaToG} g</td>
                  <td className={`py-2 font-bold ${mufaDeltaG >= 0 ? 'text-salud-cyan-700 dark:text-salud-cyan' : 'text-slate-600 dark:text-slate-400'}`}>
                    {mufaDeltaG > 0 ? `+${mufaDeltaG}` : mufaDeltaG} g/日
                  </td>
                </tr>
                <tr>
                  <td className="py-2">多元不飽和 (PUFA)</td>
                  <td className="py-2">{pufaFromG} g</td>
                  <td className="py-2">{pufaToG} g</td>
                  <td className="py-2 font-bold text-slate-700 dark:text-slate-300">
                    {pufaDeltaG > 0 ? `+${pufaDeltaG}` : pufaDeltaG} g/日
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          /* Visual Metric Cards */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* SFA Metric */}
            <div className={`p-4 rounded-xl border text-center ${
              sfaDeltaG <= 0 ? 'border-emerald-500/40 bg-emerald-100/70 dark:bg-emerald-950/20' : 'border-red-500/40 bg-red-100/70 dark:bg-red-950/20'
            }`}>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">飽和脂肪變化 (SFA)</span>
              <strong className={`text-2xl font-display block my-1 ${
                sfaDeltaG <= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
              }`}>
                {sfaDeltaG > 0 ? `+${sfaDeltaG}` : sfaDeltaG} g/日
              </strong>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {sfaFromG} g ➔ {sfaToG} g
              </span>
            </div>

            {/* MUFA Metric */}
            <div className="p-4 rounded-xl border border-salud-cyan/40 bg-cyan-100/70 dark:bg-salud-cyan-950/20 text-center">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">單元不飽和變化 (MUFA)</span>
              <strong className="text-2xl font-display text-salud-cyan-700 dark:text-salud-cyan-300 block my-1">
                {mufaDeltaG > 0 ? `+${mufaDeltaG}` : mufaDeltaG} g/日
              </strong>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {mufaFromG} g ➔ {mufaToG} g
              </span>
            </div>

            {/* PUFA Metric */}
            <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/60 text-center">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">多元不飽和變化 (PUFA)</span>
              <strong className="text-2xl font-display text-slate-800 dark:text-slate-200 block my-1">
                {pufaDeltaG > 0 ? `+${pufaDeltaG}` : pufaDeltaG} g/日
              </strong>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {pufaFromG} g ➔ {pufaToG} g
              </span>
            </div>
          </div>
        )}

        {/* WHO 10%E Reference Scale (Spec §7.4 UX) */}
        <div className="p-4 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-700 dark:text-slate-300">
            <span>WHO 飽和脂肪攝取上限：總熱量 10%E（2000 kcal 下約 22 g/日）</span>
            <span className="text-salud-amber-600 dark:text-salud-amber-400 font-bold">
              換油後佔比估算：{sfaToPctE}%E
            </span>
          </div>

          <div className="relative h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700">
            {/* Safe zone green */}
            <div className="absolute left-0 top-0 bottom-0 w-[50%] bg-emerald-500/20" />
            {/* WHO 10% threshold marker */}
            <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-red-500 z-10" />
            {/* Progress bar */}
            <div
              style={{ width: `${Math.min((sfaToPctE / 20) * 100, 100)}%` }}
              className={`h-full transition-all duration-300 ${
                sfaToPctE <= 10 ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>0%E</span>
            <span className="text-red-500 dark:text-red-400 font-bold">10%E (WHO 警戒線)</span>
            <span>20%E</span>
          </div>
        </div>

        {/* Cooking Suitability Feedback */}
        <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
          <ArrowRight className="w-4 h-4 text-salud-amber-600 dark:text-salud-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-slate-100 font-semibold">烹調適用性評估：</strong>
            <span>
              {toOil.name_zh} 發煙點約 {toOil.smoke_point_c}°C。
              {cookingContext === 'stir_fry' && toOil.smoke_point_c >= 180
                ? ' 非常適合家常中溫快炒（水油拌炒鍋溫約 160–180°C）✓'
                : cookingContext === 'deep_fry' && toOil.smoke_point_c >= 220
                ? ' 發煙點高於 220°C，耐高溫煎炸表現優異 ✓'
                : ' 建議低溫或中溫烹調，避免劇烈高溫久炸。'}
            </span>
          </div>
        </div>

        {/* Hard constraints disclaimer (Spec §7.4 & S-05) */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 leading-relaxed">
          ⓘ 這是族群平均的營養素等熱量替代估算，<strong>禁止作為個人心血管發病機率之臨床預測</strong>。實際油品組成因產地、壓榨方式而有 ±10% 變異。
        </div>
      </div>
    </div>
  );
};
