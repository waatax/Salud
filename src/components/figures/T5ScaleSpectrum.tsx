import React, { useState } from 'react';

const URINE_TIERS = [
  { level: 1, name: '極度清澈 (無色)', color: '#F8FAFC', textColor: '#0F172A', status: '水分可能過載', desc: '腎臟正在最大化排出自由水，可適度拉長喝水間隔。' },
  { level: 2, name: '淡檸檬黃', color: '#FEF08A', textColor: '#713F12', status: '極佳水合狀態', desc: '最完美的體液穩態，維持自在飲水即可。' },
  { level: 3, name: '淡稻草色', color: '#FDE047', textColor: '#713F12', status: '良好水合平衡', desc: '生理機能運作正常，代謝廢物順利排泄。' },
  { level: 4, name: '鮮明黃色', color: '#EAB308', textColor: '#000000', status: '微度偏乾', desc: '提示可於 1 小時內補充約 250 mL 白開水。' },
  { level: 5, name: '深黃金橘', color: '#CA8A04', textColor: '#FFFFFF', status: '水分不足', desc: 'ADH 已在作用留水，請倒一杯溫水飲用。' },
  { level: 6, name: '琥珀焦糖色', color: '#A16207', textColor: '#FFFFFF', status: '中度脫水警戒', desc: '體內已失水約 2–3%，儘速補充 500 mL 水分。' },
  { level: 7, name: '濃茶褐色', color: '#854D0E', textColor: '#FFFFFF', status: '重度脫水', desc: '運動表現顯著受挫，需分次補足水分與電解質。' },
  { level: 8, name: '暗醬油茶黑', color: '#543007', textColor: '#FFFFFF', status: '重度警戒/橫紋肌溶解', desc: '若伴隨激烈運動後肌肉劇痛或無尿，需立即就醫！' },
];

export const T5ScaleSpectrum: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number>(3);
  const current = URINE_TIERS[activeLevel - 1];

  return (
    <div className="w-full max-w-2xl space-y-4 font-sans">
      {/* 8-Tier Interactive Color Bars */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800">
        {URINE_TIERS.map((tier) => (
          <button
            key={tier.level}
            onClick={() => setActiveLevel(tier.level)}
            className={`h-16 rounded-lg flex flex-col items-center justify-between p-1.5 transition-all transform hover:scale-105 ${
              activeLevel === tier.level ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-105 shadow-lg' : 'opacity-85'
            }`}
            style={{ backgroundColor: tier.color }}
            title={`Level ${tier.level}: ${tier.name}`}
          >
            <span className="font-mono text-xs font-bold" style={{ color: tier.textColor }}>
              {tier.level}
            </span>
            <span className="text-[10px] font-semibold text-center line-clamp-1" style={{ color: tier.textColor }}>
              {tier.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Detail Inspector Card */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border border-slate-600"
              style={{ backgroundColor: current.color }}
            />
            <h5 className="font-bold text-sm text-slate-100">
              第 {current.level} 級 · {current.name}
            </h5>
          </div>
          <span className={`text-xs font-mono px-2 py-0.5 rounded font-semibold ${
            current.level <= 3 ? 'bg-emerald-500/20 text-emerald-300' :
            current.level <= 5 ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {current.status}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {current.desc}
        </p>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
          <span>干擾排除：維生素 B2（核黃素）會產生亮螢光黃，非本表缺水反應。</span>
          <span>Armstrong Scale</span>
        </div>
      </div>
    </div>
  );
};
