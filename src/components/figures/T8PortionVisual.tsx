import React, { useState } from 'react';
import { Coffee, Flame, Wine } from 'lucide-react';

interface Props {
  figureId?: string;
}

const STANDARD_DRINKS = [
  {
    id: 'beer',
    name: '一般拉格啤酒 (Beer)',
    abv: 5.0,
    ml: 250,
    pureG: 10.0,
    color: '#F59E0B',
    twContainer: '1 罐 330 mL 鋁罐台啤 ≈ 1.3 個標準杯；1 支 600 mL 玻璃瓶啤酒 ≈ 2.4 個標準杯',
    fillPct: 85
  },
  {
    id: 'wine',
    name: '佐餐紅白酒 (Wine)',
    abv: 12.5,
    ml: 100,
    pureG: 10.0,
    color: '#E11D48',
    twContainer: '1 瓶 750 mL 紅酒總共含有約 7.5 個標準杯（75 g 純乙醇）',
    fillPct: 45
  },
  {
    id: 'sake',
    name: '日本清酒 / 韓式燒酒',
    abv: 18.0,
    ml: 70,
    pureG: 10.0,
    color: '#38BDF8',
    twContainer: '1 瓶 360 mL 韓式燒酒（約16–18%）含有約 4.5 – 5 個標準杯！',
    fillPct: 35
  },
  {
    id: 'whisky',
    name: '威士忌 / 白蘭地 / 伏特加',
    abv: 40.0,
    ml: 31,
    pureG: 10.0,
    color: '#D97706',
    twContainer: '酒吧 1 個單份 Shot (30 mL) 剛好就是 1 個標準杯（10 g 純乙醇）',
    fillPct: 22
  },
  {
    id: 'kaoliang',
    name: '金門 58 度高粱酒',
    abv: 58.0,
    ml: 22,
    pureG: 10.0,
    color: '#A855F7',
    twContainer: '僅僅 22 mL（約兩小口烈酒杯）就含有 10 g 純乙醇，肝臟需至少 1 小時才能代謝完！',
    fillPct: 16
  }
];

export const T8PortionVisual: React.FC<Props> = ({ figureId }) => {
  const [bobaSugarMode, setBobaSugarMode] = useState<'full' | 'half' | 'none'>('full');
  const [drinkIdx, setDrinkIdx] = useState<number>(0);

  if (figureId === 'FIG-A-01-01' || figureId?.startsWith('FIG-A')) {
    const activeDrink = STANDARD_DRINKS[drinkIdx];
    return (
      <div className="w-full max-w-2xl space-y-4 font-sans text-xs">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Wine className="w-4 h-4 text-rose-400" />
              <h5 className="font-bold text-sm text-white">
                1 標準杯（Standard Drink）= 嚴格定義 10 公克純乙醇
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono text-[11px]">
              乙醇密度 0.789 g/mL
            </span>
          </div>

          {/* 5 Visual Glasses Grid */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {STANDARD_DRINKS.map((d, idx) => (
              <button
                key={d.id}
                onClick={() => setDrinkIdx(idx)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-end gap-1.5 transition-all ${
                  drinkIdx === idx
                    ? 'bg-slate-800 border-salud-cyan ring-1 ring-salud-cyan scale-[1.03]'
                    : 'bg-slate-900/70 border-slate-800 opacity-80 hover:opacity-100'
                }`}
              >
                <span className="font-mono text-[10px] text-slate-400">ABV {d.abv}%</span>
                {/* Visual Cup */}
                <div className="w-10 h-20 rounded-b-lg border-2 border-slate-600 bg-slate-950/90 flex flex-col justify-end overflow-hidden p-0.5">
                  <div
                    style={{ height: `${d.fillPct}%`, backgroundColor: d.color }}
                    className="w-full rounded-b-sm transition-all"
                  />
                </div>
                <span className="font-mono font-extrabold text-xs text-white">{d.ml} mL</span>
                <span className="text-[10px] text-slate-300 font-bold line-clamp-1">{d.name.split(' ')[0]}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold">
                  = 10g 乙醇
                </span>
              </button>
            ))}
          </div>

          {/* Selected Drink Detail & Formula Box */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-sm text-white">{activeDrink.name}</span>
              <span className="font-mono text-xs text-salud-cyan">
                {activeDrink.ml} mL × {activeDrink.abv}% × 0.789 ≈ <strong>10.0 g 純酒精</strong>
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              🍺 <strong>台灣常見包裝換算：</strong>{activeDrink.twContainer}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sugarGrams = bobaSugarMode === 'full' ? 65 : bobaSugarMode === 'half' ? 32 : 0;
  const sugarCubes = Math.round(sugarGrams / 4.5); // 1 cube ~ 4.5g

  return (
    <div className="w-full max-w-2xl space-y-4 font-sans text-xs">
      {/* 1. Boba Tea Real Object Visualizer */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-salud-amber-400" />
            <h5 className="font-bold text-sm text-slate-100">
              一杯 700 mL 台灣手搖飲到底等於幾顆方糖？
            </h5>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setBobaSugarMode('full')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                bobaSugarMode === 'full' ? 'bg-red-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              全糖 (10分)
            </button>
            <button
              onClick={() => setBobaSugarMode('half')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                bobaSugarMode === 'half' ? 'bg-salud-amber text-black font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              微糖 (3分)
            </button>
            <button
              onClick={() => setBobaSugarMode('none')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                bobaSugarMode === 'none' ? 'bg-emerald-500 text-black font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              無糖 (0分)
            </button>
          </div>
        </div>

        {/* Sugar cubes rendered */}
        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-slate-300">
              游離糖總量：<strong className="text-salud-amber-300 text-sm">{sugarGrams} g</strong>（約 {sugarCubes} 顆方糖）
            </span>
            <span className="text-[11px] font-mono text-red-400">
              {sugarGrams > 50 ? '⚠ 已突破 WHO 成人一日建議上限 (50g)' : '在安全上限範圍內'}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[44px] items-center">
            {sugarCubes === 0 ? (
              <span className="text-emerald-400 font-mono text-xs">
                ✓ 零添加游離糖！保留純淨水分與天然茶多酚。
              </span>
            ) : (
              Array.from({ length: sugarCubes }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-md bg-white border border-slate-300 shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-800 font-mono"
                  title="方糖 1 顆 (約 4.5g 蔗糖/果糖)"
                >
                  🍬
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 2. Oil Teaspoon to Real Object */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-salud-amber-500/20 border border-salud-amber-500/40 flex items-center justify-center text-salud-amber-400 shrink-0">
            🥄
          </div>
          <div>
            <h6 className="font-bold text-slate-100 text-sm">
              1 茶匙油（5 mL / 5 g）
            </h6>
            <p className="text-slate-400 text-xs">
              熱量剛好 45 kcal，相當於大約半顆水煮蛋（50g 蛋約 70–75 kcal）
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <Flame className="w-3.5 h-3.5 text-salud-amber-400" />
          <span>9 kcal/g × 5g = 45 kcal</span>
        </div>
      </div>
    </div>
  );
};

