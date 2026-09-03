import React, { useState } from 'react';
import { Coffee, Cookie, Flame } from 'lucide-react';

export const T8PortionVisual: React.FC = () => {
  const [bobaSugarMode, setBobaSugarMode] = useState<'full' | 'half' | 'none'>('full');

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
