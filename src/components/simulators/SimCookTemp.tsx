import React, { useState, useMemo } from 'react';
import { EDIBLE_OILS } from '../../data/oilsData';
import { Flame, CheckCircle2, AlertTriangle, XCircle, RotateCcw } from 'lucide-react';

const METHODS_CONFIG = [
  { id: 'salad', name: '低溫涼拌 / 沾食', defaultTemp: 25, desc: '完全不加熱，追求冷壓香氣與多酚活體' },
  { id: 'water_fry', name: '水油拌炒 / 燉煮', defaultTemp: 100, desc: '利用水沸點鎖定 100°C，安全零油煙' },
  { id: 'stir_fry', name: '家常中小火快炒', defaultTemp: 170, desc: '家常炒青菜、煎蛋，鍋溫約 160–180°C' },
  { id: 'pan_fry', name: '高溫大火爆炒 / 煎魚', defaultTemp: 195, desc: '煎牛排、香煎魚皮，鍋底溫度接近 200°C' },
  { id: 'deep_fry', name: '高溫深層油炸', defaultTemp: 180, desc: '鹽酥雞、天婦羅，油溫 170–190°C' },
  { id: 'baking', name: '烤箱烘焙西點', defaultTemp: 180, desc: '烤箱均勻熱輻射加熱' },
];

export const SimCookTemp: React.FC = () => {
  const [method, setMethod] = useState<string>('stir_fry');
  const [tempC, setTempC] = useState<number>(170);
  const [reuseCount, setReuseCount] = useState<number>(0);

  const handleMethodChange = (newMethod: string) => {
    setMethod(newMethod);
    const cfg = METHODS_CONFIG.find((m) => m.id === newMethod);
    if (cfg) setTempC(cfg.defaultTemp);
  };

  const { suitableOils, notRecommendedOils } = useMemo(() => {
    const suitable: typeof EDIBLE_OILS = [];
    const notRec: { oil: typeof EDIBLE_OILS[0]; reason: string }[] = [];

    EDIBLE_OILS.forEach((oil) => {
      // Rule 1: Flaxseed never heated
      if (oil.id === 'flaxseed' && tempC > 40) {
        notRec.push({ oil, reason: '發煙點僅 107°C 且含高量易氧化 Omega-3，加熱劇烈裂解' });
        return;
      }

      // Rule 2: Smoke point must have safety margin (temp <= smoke_point - 10°C)
      if (tempC >= oil.smoke_point_c) {
        notRec.push({ oil, reason: `烹調溫度 (${tempC}°C) 已超過其發煙點 (~${oil.smoke_point_c}°C)，會持續冒煙裂解` });
        return;
      }

      // Rule 3: Deep frying with high PUFA oils degraded quickly
      if (method === 'deep_fry' && oil.pufa_pct > 50) {
        notRec.push({ oil, reason: '多元不飽和雙鍵過多，長時間油炸極易聚合酸敗' });
        return;
      }

      // Rule 4: Butter burned easily
      if (oil.id === 'butter' && tempC > 150) {
        notRec.push({ oil, reason: '含牛奶蛋白與乳糖，溫度高於 150°C 容易焦化變黑' });
        return;
      }

      suitable.push(oil);
    });

    // Sort suitable by MUFA + smoke point stability
    suitable.sort((a, b) => b.mufa_pct - a.mufa_pct);

    return { suitableOils: suitable, notRecommendedOils: notRec };
  }, [tempC, method]);

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-salud-amber/30 bg-salud-dark-surface dark:bg-salud-dark-surface light:bg-salud-light-surface overflow-hidden shadow-2xl font-sans text-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-salud-dark-border bg-gradient-to-r from-orange-950/30 via-salud-dark-card/60 to-transparent flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
              SIM-COOK-TEMP · v0.1
            </span>
            <h3 className="text-base sm:text-lg font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text">
              這道菜該用什麼油 (Cooking Temperature Matcher)
            </h3>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="p-4 sm:p-6 space-y-4 border-b border-salud-dark-border/80 bg-salud-dark-card/20">
        <div>
          <label className="font-mono text-slate-300 block mb-2 font-semibold">
            選擇今天的烹飪方式：
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {METHODS_CONFIG.map((m) => (
              <button
                key={m.id}
                onClick={() => handleMethodChange(m.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  method === m.id
                    ? 'bg-salud-amber/20 border-salud-amber text-salud-amber-300 font-bold shadow-warm-glow'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs text-slate-200">{m.name}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">預設 ~{m.defaultTemp}°C</div>
              </button>
            ))}
          </div>
        </div>

        {/* Temperature fine-tune slider */}
        <div>
          <div className="flex justify-between font-mono text-slate-300 mb-1">
            <span>預估鍋內實際溫度：</span>
            <strong className="text-salud-amber-300 text-sm">{tempC} °C</strong>
          </div>
          <input
            type="range"
            min={20}
            max={240}
            step={5}
            value={tempC}
            onChange={(e) => setTempC(Number(e.target.value))}
            className="w-full accent-salud-amber"
          />
        </div>

        {/* Oil reuse counter if deep fry */}
        {method === 'deep_fry' && (
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-orange-400" />
              <div>
                <span className="font-semibold text-slate-200">油炸油回鍋重複使用次數：</span>
                <span className="text-slate-400 block text-[11px]">台灣法規監測總極性化合物 (TPC)</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4, 5].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setReuseCount(cnt)}
                  className={`w-7 h-7 rounded-lg font-mono font-bold transition-all ${
                    reuseCount === cnt
                      ? cnt >= 3
                        ? 'bg-red-500 text-white shadow-crimson-glow'
                        : 'bg-salud-amber text-black'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Severe reuse warning (Spec §7.5 rule) */}
        {reuseCount >= 3 && (
          <div className="p-3 rounded-xl border border-red-500/60 bg-red-950/30 text-red-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">回鍋油安全警戒：總極性化合物累積超標！</strong>
              <p className="text-xs text-red-200/90 mt-0.5">
                油炸油重複使用超過 3 次，致癌性極性化合物與反式脂肪快速倍增。請依法規原則立即換油倒棄，切勿再烹調食用。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Match Results */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Recommended List */}
        <div className="space-y-2.5">
          <h5 className="font-bold text-emerald-400 font-mono flex items-center gap-1.5 text-xs">
            <CheckCircle2 className="w-4 h-4" /> 適合使用的好油推薦 ({suitableOils.length} 款)
          </h5>
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {suitableOils.map((oil) => (
              <div
                key={oil.id}
                className="p-2.5 rounded-lg bg-emerald-950/15 border border-emerald-500/30 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-200">{oil.name_zh}</span>
                  <span className="text-[11px] text-slate-400 block">
                    {oil.is_local_tw ? '在地優選 · ' : ''}發煙點 ~{oil.smoke_point_c}°C
                  </span>
                </div>
                <span className="font-mono text-emerald-400 font-semibold text-[11px]">
                  MUFA {oil.mufa_pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Not Recommended List */}
        <div className="space-y-2.5">
          <h5 className="font-bold text-red-400 font-mono flex items-center gap-1.5 text-xs">
            <XCircle className="w-4 h-4" /> 本情境不建議使用 ({notRecommendedOils.length} 款)
          </h5>
          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {notRecommendedOils.length === 0 ? (
              <div className="p-3 text-slate-500 text-xs italic">
                在該低溫下，所有食用油品皆在安全溫度內。
              </div>
            ) : (
              notRecommendedOils.map(({ oil, reason }) => (
                <div
                  key={oil.id}
                  className="p-2.5 rounded-lg bg-red-950/15 border border-red-500/30 space-y-0.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-200">{oil.name_zh}</span>
                    <span className="font-mono text-[10px] text-red-400">發煙點 ~{oil.smoke_point_c}°C</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{reason}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
