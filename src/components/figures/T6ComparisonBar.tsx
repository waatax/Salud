import React, { useState, useMemo } from 'react';
import { EDIBLE_OILS } from '../../data/oilsData';
import { Flame, Search } from 'lucide-react';

interface Props {
  figureId?: string;
}

const DEHYDRATION_STAGES = [
  {
    pct: '1 – 2%',
    loss70kg: '0.7 – 1.4 L',
    stage: '第一級：輕度體液失衡',
    color: '#38BDF8',
    bg: '#0C4A6E',
    neuro: '下視丘口渴中樞啟動、專注力與短期記憶微降 10%',
    cardio: '血漿滲透壓突破 295 mOsm/kg，抗利尿激素 (Vasopressin) 分泌增加',
    thermo: '有氧運動耐力開始下滑，核心體溫微升',
    action: '立即分次飲用 300–500 mL 白開水即可完全逆轉。'
  },
  {
    pct: '3 – 4%',
    loss70kg: '2.1 – 2.8 L',
    stage: '第二級：中度脫水 / 熱衰竭前兆',
    color: '#F59E0B',
    bg: '#78350F',
    neuro: '搏動性頭痛、煩躁疲倦、反應時間明顯延長',
    cardio: '血漿容積縮減，每跳輸出量下降，心跳代償性加速 (+15–25 bpm)、姿勢性低血壓',
    thermo: '排汗率下降，皮膚微血管收縮，散熱效率顯著受阻',
    action: '移至陰涼處休息，補充含鈉與葡萄糖之口服補液鹽 (ORS) 或運動飲料。'
  },
  {
    pct: '5 – 6%',
    loss70kg: '3.5 – 4.2 L',
    stage: '第三級：重度脫水 / 神經危象',
    color: '#F97316',
    bg: '#7C2D12',
    neuro: '言語含糊、步履蹣跚不穩、嚴重暈眩、噁心乾嘔、肌肉痙攣抽筋',
    cardio: '周邊組織灌流不足、少尿或無尿（腎前性急性腎損傷風險）',
    thermo: '發汗機制瀕臨停擺，核心體溫急速攀升突破 39.5°C',
    action: '緊急醫療警戒！需立即降溫並送醫接受靜脈輸液治療。'
  },
  {
    pct: '> 7%',
    loss70kg: '> 4.9 L',
    stage: '第四級：致命性熱中暑與休克急症',
    color: '#EF4444',
    bg: '#450A0A',
    neuro: '意識混亂、譫妄、癲癇抽搐、深層昏迷',
    cardio: '低血容性休克、多重器官衰竭、橫紋肌溶解併發急性腎衰竭',
    thermo: '核心體溫 > 40.5°C，細胞蛋白質變性與瀰漫性血管內凝血 (DIC)',
    action: '🚨 撥打 119 急救！現場立即以冷水浸泡或冰敷頸部、腋下、鼠蹊部全力降溫！'
  }
];

export const T6ComparisonBar: React.FC<Props> = ({ figureId }) => {
  const [sortBy, setSortBy] = useState<'mufa' | 'pufa' | 'sfa' | 'smoke_point'>('mufa');
  const [filterTaiwan, setFilterTaiwan] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [waterEnv, setWaterEnv] = useState<'normal' | 'exercise'>('normal');
  const [dehydIdx, setDehydIdx] = useState<number>(1);
  const [sleepMode, setSleepMode] = useState<'alcohol' | 'sober'>('alcohol');

  // 1. FIG-W-04-01: 24-Hour Water Balance Sankey / Dual Flow
  if (figureId === 'FIG-W-04-01') {
    const isEx = waterEnv === 'exercise';
    const totalMl = isEx ? 3800 : 2500;
    const intakes = isEx
      ? [
          { label: '液體飲水 (純水/運動補液)', ml: 2650, pct: 70, color: '#06B6D4' },
          { label: '三餐固體食物中水分', ml: 800, pct: 21, color: '#10B981' },
          { label: '粒線體內生代謝水', ml: 350, pct: 9, color: '#8B5CF6' }
        ]
      : [
          { label: '液體飲水 (白開水/無糖茶)', ml: 1500, pct: 60, color: '#06B6D4' },
          { label: '三餐固體食物中水分', ml: 700, pct: 28, color: '#10B981' },
          { label: '粒線體內生代謝水', ml: 300, pct: 12, color: '#8B5CF6' }
        ];
    const losses = isEx
      ? [
          { label: '皮膚汗液與呼吸蒸發', ml: 2400, pct: 63, color: '#F59E0B' },
          { label: '腎臟尿液排泄 (濃縮保水)', ml: 1250, pct: 33, color: '#38BDF8' },
          { label: '消化道糞便排出', ml: 150, pct: 4, color: '#64748B' }
        ]
      : [
          { label: '腎臟尿液排泄 (Urine)', ml: 1500, pct: 60, color: '#38BDF8' },
          { label: '皮膚與呼吸道不感蒸發', ml: 800, pct: 32, color: '#F59E0B' },
          { label: '消化道糞便排出', ml: 200, pct: 8, color: '#64748B' }
        ];

    return (
      <div className="w-full max-w-2xl space-y-4 font-sans text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="font-mono text-slate-300">24 小時動態水合收支情境：</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setWaterEnv('normal')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                waterEnv === 'normal' ? 'bg-salud-cyan text-black font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              常溫日常作息 (2,500 mL)
            </button>
            <button
              onClick={() => setWaterEnv('exercise')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                waterEnv === 'exercise' ? 'bg-amber-500 text-black font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              夏日高溫運動日 (3,800 mL)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          {/* Left: Intake */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-bold text-cyan-400">📥 水分總輸入 (Intake)</span>
              <span className="font-mono font-extrabold text-white">{totalMl} mL</span>
            </div>
            {intakes.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>{item.label}</span>
                  <span className="font-mono font-bold">{item.ml} mL ({item.pct}%)</span>
                </div>
                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div style={{ width: `${item.pct}%`, backgroundColor: item.color }} className="h-full rounded-full transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Output */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-bold text-amber-400">📤 水分總排出 (Output)</span>
              <span className="font-mono font-extrabold text-white">{totalMl} mL</span>
            </div>
            {losses.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>{item.label}</span>
                  <span className="font-mono font-bold">{item.ml} mL ({item.pct}%)</span>
                </div>
                <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div style={{ width: `${item.pct}%`, backgroundColor: item.color }} className="h-full rounded-full transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 font-mono flex items-center justify-between">
          <span>⚖️ 體液動態守恆定律：每日總輸入量 ({totalMl} mL) === 每日總排出量 ({totalMl} mL)</span>
          <span className="text-salud-cyan">EFSA / IOM 實證基準</span>
        </div>
      </div>
    );
  }

  // 2. FIG-W-07-01: Dehydration Escalation Ladder
  if (figureId === 'FIG-W-07-01') {
    const activeStage = DEHYDRATION_STAGES[dehydIdx];
    return (
      <div className="w-full max-w-2xl space-y-4 font-sans text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DEHYDRATION_STAGES.map((st, idx) => (
            <button
              key={st.pct}
              onClick={() => setDehydIdx(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                dehydIdx === idx
                  ? 'ring-2 ring-white shadow-lg scale-[1.02]'
                  : 'opacity-75 hover:opacity-100'
              }`}
              style={{ backgroundColor: st.bg, borderColor: st.color }}
            >
              <div className="font-mono text-sm font-extrabold text-white">失水 {st.pct}</div>
              <div className="text-[10px] font-mono text-slate-200 mt-0.5">70kg 約 {st.loss70kg}</div>
              <div className="text-[11px] font-bold mt-1" style={{ color: st.color }}>
                {st.stage.split('：')[1]}
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h5 className="font-bold text-sm text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeStage.color }} />
              {activeStage.stage}（體重減損 {activeStage.pct}）
            </h5>
            <span className="font-mono text-xs text-slate-400">70kg 流失：{activeStage.loss70kg}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono font-bold text-sky-400">🧠 中樞神經與認知</div>
              <p className="text-slate-200 leading-relaxed">{activeStage.neuro}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono font-bold text-amber-400">❤️ 心血管與腎臟代償</div>
              <p className="text-slate-200 leading-relaxed">{activeStage.cardio}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono font-bold text-rose-400">🌡️ 體溫調節與排汗</div>
              <p className="text-slate-200 leading-relaxed">{activeStage.thermo}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-700 text-emerald-300 font-medium">
            🎯 臨床處置指引：{activeStage.action}
          </div>
        </div>
      </div>
    );
  }

  // 3. FIG-A-06-03: Alcohol Sleep Architecture PSG / HRV Curve
  if (figureId === 'FIG-A-06-03') {
    const isAlc = sleepMode === 'alcohol';
    return (
      <div className="w-full max-w-2xl space-y-3 font-sans text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="font-mono text-slate-300">多導睡眠腦波圖 (PSG) 與自律神經比較：</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setSleepMode('alcohol')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                isAlc ? 'bg-rose-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              🍷 睡前飲酒 (REM 壓制 + 後半夜覺醒反彈)
            </button>
            <button
              onClick={() => setSleepMode('sober')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                !isAlc ? 'bg-emerald-500 text-black font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              💧 未飲酒正常睡眠 (完整 4–5 週期修復)
            </button>
          </div>
        </div>

        <svg
          viewBox="0 0 800 360"
          className="w-full h-auto rounded-xl"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="睡眠結構時序曲線對照圖"
        >
          <rect width="800" height="360" rx="16" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />

          {/* Y-Axis Labels */}
          <text x="25" y="75" fill="#F87171" fontSize="11" fontWeight="bold" fontFamily="monospace">Wake 覺醒</text>
          <text x="25" y="135" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">REM 作夢期</text>
          <text x="25" y="195" fill="#94A3B8" fontSize="11" fontFamily="monospace">N1/N2 淺睡</text>
          <text x="25" y="255" fill="#818CF8" fontSize="11" fontWeight="bold" fontFamily="monospace">N3 慢波深睡</text>

          {/* Grid Lines */}
          {[70, 130, 190, 250].map((y) => (
            <line key={y} x1="110" y1={y} x2="760" y2={y} stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
          ))}

          {/* Turning Point Divider at 03:30 */}
          <line x1="435" y1="40" x2="435" y2="285" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="435" y="30" fill="#FBBF24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            {isAlc ? '⚡ 03:30 血中酒精歸零 → 麩胺酸與交感神經暴衝' : '✓ 後半夜長段 REM 記憶整合與情緒修復'}
          </text>

          {/* PSG Hypnogram Path */}
          {isAlc ? (
            <path
              d="M 110 70 L 135 250 L 240 250 L 265 190 L 340 250 L 390 190 L 435 190 L 455 70 L 485 190 L 510 70 L 545 130 L 570 70 L 610 190 L 635 70 L 680 130 L 710 70 L 755 70"
              fill="none"
              stroke="#EF4444"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M 110 70 L 145 190 L 175 250 L 235 250 L 265 130 L 295 190 L 340 250 L 385 190 L 420 130 L 470 190 L 520 130 L 580 190 L 630 130 L 700 130 L 745 190 L 760 70"
              fill="none"
              stroke="#10B981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* X-Axis Time Labels */}
          <text x="110" y="310" fill="#94A3B8" fontSize="11" fontFamily="monospace">00:00 入睡</text>
          <text x="270" y="310" fill="#94A3B8" fontSize="11" fontFamily="monospace">02:00 前半夜</text>
          <text x="435" y="310" fill="#FBBF24" fontSize="11" fontFamily="monospace" textAnchor="middle">03:30 轉折</text>
          <text x="600" y="310" fill="#94A3B8" fontSize="11" fontFamily="monospace">05:30 後半夜</text>
          <text x="720" y="310" fill="#94A3B8" fontSize="11" fontFamily="monospace">07:00 醒來</text>

          {/* Bottom Summary Banner */}
          <rect x="110" y="322" width="650" height="28" rx="6" fill="#0F172A" stroke="#334155" />
          <text x="435" y="340" fill={isAlc ? '#FCA5A5' : '#A7F3D0'} fontSize="11" fontWeight="bold" textAnchor="middle">
            {isAlc
              ? '⚠ 飲酒後：前半夜假性昏迷抑制 REM，後半夜微覺醒激增、心率上升 +15 bpm、HRV 暴跌！'
              : '✓ 未飲酒：前半夜深睡分泌生長激素與腦脊液排毒，後半夜充足 REM 鞏固記憶與穩定情緒。'}
          </text>
        </svg>
      </div>
    );
  }

  const sortedOils = useMemo(() => {
    return [...EDIBLE_OILS]
      .filter((oil) => {
        if (filterTaiwan && !oil.is_local_tw) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return oil.name_zh.toLowerCase().includes(q) || oil.name_en.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'mufa') return b.mufa_pct - a.mufa_pct;
        if (sortBy === 'pufa') return b.pufa_pct - a.pufa_pct;
        if (sortBy === 'sfa') return b.sfa_pct - a.sfa_pct;
        if (sortBy === 'smoke_point') return b.smoke_point_c - a.smoke_point_c;
        return 0;
      });
  }, [sortBy, filterTaiwan, searchQuery]);

  return (
    <div className="w-full max-w-3xl space-y-4 font-sans text-xs">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
        {/* Search input */}
        <div className="relative min-w-[160px] flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋食用油品（如苦茶油、橄欖油）..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-salud-amber text-xs"
          />
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-mono hidden sm:inline">排序：</span>
          <div className="flex gap-1">
            <button
              onClick={() => setSortBy('mufa')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'mufa'
                  ? 'bg-salud-cyan text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              單元 MUFA
            </button>
            <button
              onClick={() => setSortBy('pufa')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'pufa'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              多元 PUFA
            </button>
            <button
              onClick={() => setSortBy('sfa')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'sfa'
                  ? 'bg-salud-amber text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              飽和 SFA
            </button>
            <button
              onClick={() => setSortBy('smoke_point')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
                sortBy === 'smoke_point'
                  ? 'bg-orange-500 text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Flame className="w-3 h-3" /> 發煙點
            </button>
          </div>
        </div>

        {/* Taiwan Local Toggle */}
        <button
          onClick={() => setFilterTaiwan(!filterTaiwan)}
          className={`px-2.5 py-1 rounded-md border font-mono transition-all ${
            filterTaiwan
              ? 'bg-salud-amber-500/20 border-salud-amber-400 text-salud-amber-300'
              : 'border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {filterTaiwan ? '✓ 只看台灣在地油' : '顯示台灣常見油品'}
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between px-2 text-slate-300 font-mono text-[11px]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-salud-cyan shadow-cyan-glow" />
            單元不飽和 (MUFA)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            多元不飽和 (PUFA)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-salud-amber" />
            飽和脂肪酸 (SFA)
          </span>
        </div>
        <span className="text-slate-400 hidden sm:inline">100% 堆疊佔總脂肪酸比例</span>
      </div>

      {/* Stacked Bars List */}
      <div className="space-y-2.5">
        {sortedOils.map((oil) => (
          <div
            key={oil.id}
            className="p-2.5 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            {/* Oil title & tags */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-100">{oil.name_zh}</span>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  {oil.name_en}
                </span>
                {oil.is_local_tw && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-salud-amber/20 text-salud-amber-300 border border-salud-amber/40">
                    在地
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="flex items-center gap-1 text-orange-400">
                  <Flame className="w-3 h-3" />
                  發煙點 ~{oil.smoke_point_c}°C
                </span>
              </div>
            </div>

            {/* Proportional Stacked Bar */}
            <div className="h-5 w-full flex rounded-lg overflow-hidden bg-slate-800 border border-slate-700/50">
              {/* MUFA Segment */}
              <div
                style={{ width: `${oil.mufa_pct}%` }}
                className="bg-salud-cyan hover:opacity-90 flex items-center justify-center text-[10px] font-bold text-black transition-all"
                title={`單元不飽和 MUFA: ${oil.mufa_pct}%`}
              >
                {oil.mufa_pct >= 14 ? `${oil.mufa_pct}%` : ''}
              </div>

              {/* PUFA Segment */}
              <div
                style={{ width: `${oil.pufa_pct}%` }}
                className="bg-emerald-500 hover:opacity-90 flex items-center justify-center text-[10px] font-bold text-black transition-all"
                title={`多元不飽和 PUFA: ${oil.pufa_pct}%`}
              >
                {oil.pufa_pct >= 14 ? `${oil.pufa_pct}%` : ''}
              </div>

              {/* SFA Segment */}
              <div
                style={{ width: `${oil.sfa_pct}%` }}
                className="bg-salud-amber hover:opacity-90 flex items-center justify-center text-[10px] font-bold text-black transition-all"
                title={`飽和脂肪酸 SFA: ${oil.sfa_pct}%`}
              >
                {oil.sfa_pct >= 12 ? `${oil.sfa_pct}%` : ''}
              </div>
            </div>

            {/* Sub description */}
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>{oil.recommended_uses}</span>
              <span className="font-mono text-slate-500 hidden sm:inline">{oil.main_fa}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
