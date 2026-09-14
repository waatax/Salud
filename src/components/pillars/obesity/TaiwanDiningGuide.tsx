import React, { useState } from 'react';
import { TAIWAN_DINING_GUIDE } from '../../../data/obesityIterationsData';
import {
  Utensils,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Store,
  Flame,
  Coffee,
  Scale,
  Sparkles,
  Info,
} from 'lucide-react';

export const TaiwanDiningGuide: React.FC = () => {
  const [selectedCatIdx, setSelectedCatIdx] = useState<number>(0);
  const activeCat = TAIWAN_DINING_GUIDE[selectedCatIdx] || TAIWAN_DINING_GUIDE[0];

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-md">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold mb-1.5">
          <Utensils className="w-3.5 h-3.5" />
          <span>街頭實戰落地 · TAIWAN DINING-OUT PITFALL MAP</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
          台灣實戰外食外送避坑紅黃綠燈指南
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          不必餐餐自煮水煮餐！由 EC-29 減重營養師實測拆解台灣 4 大外食場景，用紅黃綠燈點餐密碼守護熱量與蛋白質。
        </p>
      </div>

      {/* 30g Protein Real-Object Metric Ruler Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-transparent border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
          <span className="flex items-center gap-1.5 text-salud-cyan">
            <Scale className="w-4 h-4" />
            <span>【營養師實物量尺】一餐 30g 優質蛋白質長什麼樣？（啟動 mTOR 白胺酸閾值）</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">任選一項即達標</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-lg font-mono font-extrabold text-amber-500">4 顆</div>
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">大顆茶葉蛋 / 水煮蛋</div>
            <div className="text-[10px] text-slate-400">含 28~30g 蛋白質</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-lg font-mono font-extrabold text-emerald-500">1.2 塊</div>
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">超商即食雞胸肉</div>
            <div className="text-[10px] text-slate-400">約 130g 熟雞胸肉</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-lg font-mono font-extrabold text-blue-500">1.5 盒</div>
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">中華嫩豆腐 / 板豆腐</div>
            <div className="text-[10px] text-slate-400">富含植物大豆異黃酮</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-lg font-mono font-extrabold text-purple-500">1 份</div>
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">生鮮鮭魚排 / 鱸魚片</div>
            <div className="text-[10px] text-slate-400">約手掌大半 (150g)</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TAIWAN_DINING_GUIDE.map((cat, idx) => (
          <button
            key={cat.category_name}
            onClick={() => setSelectedCatIdx(idx)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedCatIdx === idx
                ? 'border-emerald-500 bg-emerald-500/20 text-slate-900 dark:text-white font-bold shadow-md'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="font-bold text-xs truncate">{cat.category_name.split('(')[0]}</div>
            <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              {cat.category_name.includes('(') ? `(${cat.category_name.split('(')[1]}` : ''}
            </div>
          </button>
        ))}
      </div>

      {/* Red, Yellow, Green Light Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Green Light Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-300/60 dark:border-emerald-800/40 space-y-3">
          <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>🟢 綠燈首選：大膽點安心吃</span>
          </div>
          <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
            {activeCat.green_light_options.map((opt, i) => (
              <li key={`grn-${i}`} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold shrink-0">•</span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Yellow Light Card */}
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-800/40 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>🟡 黃燈小心：適量改良吃法</span>
          </div>
          <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
            {activeCat.yellow_light_options.map((opt, i) => (
              <li key={`yel-${i}`} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Light Card */}
        <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-300/60 dark:border-rose-800/40 space-y-3">
          <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>🔴 紅燈避雷：熱量與脂毒炸彈</span>
          </div>
          <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
            {activeCat.red_light_pitfalls.map((opt, i) => (
              <li key={`red-${i}`} className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold shrink-0">•</span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dietitian Tactical Secret Box */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white">EC-29 減重專科營養師 街頭避雷秘訣：</div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            {activeCat.dietitian_tactics_zh}
          </p>
        </div>
      </div>
    </div>
  );
};
