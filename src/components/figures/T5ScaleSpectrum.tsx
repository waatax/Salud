import React, { useState } from 'react';

interface Props {
  figureId?: string;
}

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

const BODY_WATER_PROFILES = [
  {
    id: 'athlete',
    label: '精壯運動員 (高肌少脂)',
    bf: '10–14%',
    tbwPct: 63,
    range: '60–65%',
    liters70kg: '42.0 – 45.5 L',
    color: '#06B6D4',
    note: '骨骼肌含水量高達 73%，肌肉量愈高，體內水庫儲水量愈豐沛，抗熱耐脫水能力最佳。'
  },
  {
    id: 'adult',
    label: '一般健康成年人',
    bf: '18–24%',
    tbwPct: 55,
    range: '50–60%',
    liters70kg: '35.0 – 42.0 L',
    color: '#38BDF8',
    note: '成年男性平均約 60%、成年女性因天生皮下脂肪比例較高平均約 50–55%。'
  },
  {
    id: 'elderly',
    label: '高齡長者 (肌肉自然流失)',
    bf: '28–35%',
    tbwPct: 48,
    range: '45–50%',
    liters70kg: '31.5 – 35.0 L',
    color: '#F59E0B',
    note: '隨年齡增長骨骼肌流失（肌少症），總體水儲備下降且口渴中樞鈍化，極易發生隱性脫水。'
  },
  {
    id: 'highbf',
    label: '高體脂族群 (較少肌肉)',
    bf: '30–38%',
    tbwPct: 44,
    range: '40–48%',
    liters70kg: '28.0 – 33.6 L',
    color: '#F97316',
    note: '白色脂肪組織含水量僅約 10%，因此相同體重下，高體脂者的真實總體水比精壯者少逾 10 公升！'
  }
];

const COOKING_ZONES = [
  {
    id: 'cold',
    method: '低溫涼拌 / 沾食 / 淋湯',
    tempRange: '25 – 40°C',
    tempNum: 35,
    color: '#10B981',
    safeOils: ['亞麻仁油 (發煙點107°C)', '特級初榨橄欖油 (190°C)', '冷壓黑麻油 (210°C)', '紫蘇油'],
    avoidOils: '無（保留最多多酚與 Omega-3 不飽和脂肪酸）'
  },
  {
    id: 'water_saute',
    method: '健康水油拌炒 / 蒸煮',
    tempRange: '80 – 100°C',
    tempNum: 100,
    color: '#06B6D4',
    safeOils: ['特級初榨橄欖油 (190°C)', '苦茶油 (235°C)', '芥花油 (220°C)', '幾乎所有天然食用油'],
    avoidOils: '水沸點將鍋溫鎖定於 100°C，遠低於初榨橄欖油發煙點，完全不會冒煙變質！'
  },
  {
    id: 'stir_fry',
    method: '家常中小火快炒 / 煎蛋',
    tempRange: '150 – 180°C',
    tempNum: 165,
    color: '#F59E0B',
    safeOils: ['特級初榨橄欖油 (190°C)', '苦茶油 (235°C)', '芥花油 (220°C)', '大豆油 (230°C)', '花生油 (225°C)'],
    avoidOils: '嚴禁亞麻仁油 (107°C) 與未精煉發酵奶油 (150°C 易焦黑)'
  },
  {
    id: 'deep_fry',
    method: '高溫大火爆炒 / 油炸',
    tempRange: '185 – 215°C',
    tempNum: 200,
    color: '#EF4444',
    safeOils: ['精製酪梨油 (260°C)', '苦茶油 (235°C)', '高油酸葵花油 (232°C)', '精製橄欖油 (220°C)'],
    avoidOils: '避免高多元不飽和油（大豆油/玉米油長時間反覆油炸易產生有毒醛類）及未精煉初榨油'
  }
];

export const T5ScaleSpectrum: React.FC<Props> = ({ figureId }) => {
  const [activeLevel, setActiveLevel] = useState<number>(3);
  const [activeBodyIdx, setActiveBodyIdx] = useState<number>(0);
  const [activeCookIdx, setActiveCookIdx] = useState<number>(2);

  // 1. FIG-W-01-01: Body Water % Spectrum
  if (figureId === 'FIG-W-01-01') {
    const profile = BODY_WATER_PROFILES[activeBodyIdx];
    return (
      <div className="w-full max-w-2xl space-y-4 font-sans text-xs">
        {/* Profile Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {BODY_WATER_PROFILES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveBodyIdx(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeBodyIdx === idx
                  ? 'bg-slate-800 border-salud-cyan text-white shadow-md ring-1 ring-salud-cyan'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-mono text-[10px] text-slate-400">體脂率 {item.bf}</div>
              <div className="font-bold text-xs mt-0.5 line-clamp-1">{item.label.split(' ')[0]}</div>
              <div className="font-mono font-extrabold text-sm mt-1" style={{ color: item.color }}>
                {item.range} 水分
              </div>
            </button>
          ))}
        </div>

        {/* Visual Spectrum Bar */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-100">{profile.label}</span>
            <span className="font-mono text-salud-cyan font-bold">
              70kg 成人總體水：{profile.liters70kg}
            </span>
          </div>

          <div className="h-7 w-full rounded-xl bg-slate-800 overflow-hidden flex border border-slate-700">
            <div
              style={{ width: `${profile.tbwPct}%`, backgroundColor: profile.color }}
              className="h-full flex items-center justify-center font-mono font-extrabold text-slate-950 text-xs transition-all duration-300"
            >
              總體水 TBW ~{profile.tbwPct}%
            </div>
            <div className="flex-1 h-full flex items-center justify-center font-mono text-[11px] text-slate-400">
              固體與脂肪乾重 ~{100 - profile.tbwPct}%
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-xs">
            {profile.note}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-cyan-300">
              💪 骨骼肌組織含水量：<strong>約 73%</strong>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-300">
              🧈 脂肪組織含水量：<strong>僅約 10%</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. FIG-O-08-03: Cooking Temp vs Smoke Point Spectrum
  if (figureId === 'FIG-O-08-03' || figureId?.startsWith('FIG-O')) {
    const zone = COOKING_ZONES[activeCookIdx];
    return (
      <div className="w-full max-w-2xl space-y-4 font-sans text-xs">
        {/* Cooking Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COOKING_ZONES.map((z, idx) => (
            <button
              key={z.id}
              onClick={() => setActiveCookIdx(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                activeCookIdx === idx
                  ? 'bg-slate-800 border-amber-400 text-white shadow-md ring-1 ring-amber-400'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-mono text-xs font-extrabold" style={{ color: z.color }}>
                {z.tempRange}
              </div>
              <div className="font-bold text-xs mt-0.5 line-clamp-1">{z.method.split(' ')[0]}</div>
            </button>
          ))}
        </div>

        {/* Temperature Scale SVG Overlay */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-100">{zone.method}</span>
            <span className="px-2.5 py-0.5 rounded-full font-mono font-bold text-xs bg-slate-800 text-amber-300 border border-amber-500/40">
              鍋內溫度帶：{zone.tempRange}
            </span>
          </div>

          {/* Oil Smoke Point Comparison Bars */}
          <div className="space-y-1.5 pt-1">
            {[
              { name: '亞麻仁油 (冷壓)', sp: 107 },
              { name: '動物奶油 (Butter)', sp: 150 },
              { name: '特級初榨橄欖油 (EVOO)', sp: 190 },
              { name: '冷壓芝麻油 / 豬油', sp: 200 },
              { name: '芥花油 / 精製橄欖油', sp: 220 },
              { name: '苦茶油 / 高油酸葵花油', sp: 235 },
              { name: '精製酪梨油', sp: 260 },
            ].map((oil) => {
              const isSafe = oil.sp >= zone.tempNum + 10;
              return (
                <div key={oil.name} className="flex items-center gap-2 text-[11px]">
                  <span className="w-36 sm:w-44 truncate text-slate-300 font-medium">{oil.name}</span>
                  <div className="flex-1 h-4 bg-slate-900 rounded-md overflow-hidden relative border border-slate-800">
                    <div
                      style={{ width: `${Math.min(100, (oil.sp / 270) * 100)}%` }}
                      className={`h-full transition-all ${
                        isSafe ? 'bg-emerald-500/80' : 'bg-rose-500/80'
                      }`}
                    />
                    {/* Current cooking temp marker line */}
                    <div
                      style={{ left: `${(zone.tempNum / 270) * 100}%` }}
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-300 shadow"
                      title={`當前烹調溫度 ~${zone.tempNum}°C`}
                    />
                  </div>
                  <span className={`w-20 text-right font-mono font-bold ${isSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {oil.sp}°C {isSafe ? '✓' : '⚠'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1 text-xs">
            <div className="text-emerald-400 font-bold">
              ✓ 推薦安全用油：{zone.safeOils.join('、')}
            </div>
            <div className="text-amber-300/90 text-[11px]">
              💡 科學提醒：{zone.avoidOils}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: FIG-W-06-01 Armstrong 8-Tier Urine Color Scale
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

