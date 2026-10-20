import React, { useState } from 'react';

/**
 * SpineSpecialtyFigures.tsx — Bespoke anatomical and clinical schematics
 * for Osteoporosis, Vertebral Compression Fracture, Bone Cement (Kyphoplasty/PVP),
 * Minimally Invasive Spine Surgery (MISS/UBE), McGill Big 3 Rehabilitation,
 * and Whole-Spine Biomechanics.
 */

// ── 1. Osteoporosis Microstructure & DXA Scale Figure ────────────────────────
export const OsteoporosisMicrostructureFigure: React.FC = () => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Healthy Bone Microstructure */}
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-emerald-900 dark:text-emerald-300">正常健康骨骼 (T ≥ -1.0)</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold">骨小梁緻密互聯</span>
          </div>
          <svg viewBox="0 0 240 140" className="w-full h-auto" role="img" aria-label="正常骨骼骨小梁微結構：連續且粗厚的蜂巢狀支架">
            {/* Background mesh background */}
            <rect x="10" y="10" width="220" height="120" rx="10" fill="currentColor" className="text-emerald-100/50 dark:text-emerald-900/30" />
            
            {/* Healthy thick trabecular network */}
            <g stroke="#059669" strokeWidth="6" strokeLinecap="round" opacity="0.85">
              {/* Vertical primary load struts */}
              <line x1="35" y1="20" x2="35" y2="120" />
              <line x1="75" y1="18" x2="75" y2="122" />
              <line x1="120" y1="15" x2="120" y2="125" />
              <line x1="165" y1="18" x2="165" y2="122" />
              <line x1="205" y1="20" x2="205" y2="120" />

              {/* Horizontal cross-bracing ties */}
              <line x1="35" y1="40" x2="75" y2="40" />
              <line x1="75" y1="35" x2="120" y2="42" />
              <line x1="120" y1="42" x2="165" y2="35" />
              <line x1="165" y1="40" x2="205" y2="40" />

              <line x1="35" y1="75" x2="75" y2="70" />
              <line x1="75" y1="70" x2="120" y2="75" />
              <line x1="120" y1="75" x2="165" y2="72" />
              <line x1="165" y1="72" x2="205" y2="75" />

              <line x1="35" y1="105" x2="75" y2="105" />
              <line x1="75" y1="105" x2="120" y2="100" />
              <line x1="120" y1="100" x2="165" y2="105" />
              <line x1="165" y1="105" x2="205" y2="105" />

              {/* Diagonal stabilization braces */}
              <line x1="35" y1="40" x2="75" y2="70" strokeWidth="4" />
              <line x1="75" y1="70" x2="120" y2="42" strokeWidth="4" />
              <line x1="120" y1="75" x2="165" y2="105" strokeWidth="4" />
              <line x1="165" y1="72" x2="205" y2="40" strokeWidth="4" />
            </g>
          </svg>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">垂直主樑粗壯、水平橫樑交織完整，具備強大抗壓彈性與承重力。</p>
        </div>

        {/* Osteoporotic Bone Microstructure */}
        <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/20 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-rose-900 dark:text-rose-300">骨質疏鬆骨骼 (T ≤ -2.5)</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-semibold">微結構穿孔斷裂</span>
          </div>
          <svg viewBox="0 0 240 140" className="w-full h-auto" role="img" aria-label="骨質疏鬆骨骼骨小梁微結構：橫樑消失、主樑變細且多處穿孔孔洞">
            {/* Background mesh */}
            <rect x="10" y="10" width="220" height="120" rx="10" fill="currentColor" className="text-rose-100/50 dark:text-rose-900/30" />
            
            {/* Thinned, broken trabeculae */}
            <g stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
              {/* Thinned, interrupted vertical struts */}
              <line x1="35" y1="20" x2="35" y2="60" />
              <line x1="35" y1="85" x2="35" y2="120" />
              <circle cx="35" cy="72" r="3" fill="#f43f5e" opacity="0.4" />

              <line x1="75" y1="25" x2="75" y2="115" strokeWidth="2" strokeDasharray="14 8" />
              <line x1="120" y1="15" x2="120" y2="55" />
              <line x1="120" y1="80" x2="120" y2="125" />

              <line x1="165" y1="35" x2="165" y2="105" strokeWidth="2" strokeDasharray="10 6" />
              <line x1="205" y1="20" x2="205" y2="70" />
              <line x1="205" y1="95" x2="205" y2="120" />

              {/* Few broken horizontal ties */}
              <line x1="35" y1="40" x2="60" y2="40" strokeWidth="1.5" />
              <line x1="135" y1="42" x2="165" y2="35" strokeWidth="1.5" />
              <line x1="75" y1="105" x2="105" y2="105" strokeWidth="1.5" />

              {/* Large structural voids / micro-cracks */}
              <ellipse cx="95" cy="65" rx="16" ry="12" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse cx="145" cy="78" rx="20" ry="14" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          </svg>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">水平支架穿孔斷損、主樑變細孤立，輕微外力或彎腰即發生連鎖塌陷。</p>
        </div>
      </div>

      {/* DXA T-Score & Clinical Intervention Spectrum */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
          <span>DXA 骨密度 T 值光譜與介入門檻</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">標準差 (SD) 與青年高峰比較</span>
        </div>
        <div className="relative pt-6 pb-2">
          {/* Spectrum Bar */}
          <div className="h-6 w-full rounded-lg overflow-hidden flex shadow-inner text-[10px] font-bold text-white text-center leading-6">
            <div
              className="bg-emerald-600 cursor-pointer transition-opacity hover:opacity-90 flex-1"
              onMouseEnter={() => setHoveredZone('正常骨質 (T ≥ -1.0)：低骨折風險，維持日常鈣 1000mg、D3 800IU 與規律運動。')}
              onMouseLeave={() => setHoveredZone(null)}
            >
              正常 (≥ -1.0)
            </div>
            <div
              className="bg-amber-500 cursor-pointer transition-opacity hover:opacity-90 flex-1"
              onMouseEnter={() => setHoveredZone('骨質缺乏 (-1.0 至 -2.5)：若 FRAX 計算主要骨折 ≥20% 或髖部 ≥3%，應啟動藥物保護。')}
              onMouseLeave={() => setHoveredZone(null)}
            >
              骨質缺乏 (-1.0 ~ -2.5)
            </div>
            <div
              className="bg-rose-600 cursor-pointer transition-opacity hover:opacity-90 flex-1"
              onMouseEnter={() => setHoveredZone('骨質疏鬆 (T ≤ -2.5)：骨折高危險群，應積極接受抗吸收或促骨生成處方藥物。')}
              onMouseLeave={() => setHoveredZone(null)}
            >
              骨質疏鬆 (≤ -2.5)
            </div>
            <div
              className="bg-purple-700 cursor-pointer transition-opacity hover:opacity-90 flex-1"
              onMouseEnter={() => setHoveredZone('嚴重骨質疏鬆 (T ≤ -2.5 合併脆性骨折)：極高危險群，優先考慮 Romosozumab 或 Teriparatide 促生成治療。')}
              onMouseLeave={() => setHoveredZone(null)}
            >
              嚴重骨鬆 (+骨折)
            </div>
          </div>
          {/* Threshold Pin Indicators */}
          <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1 mt-1.5">
            <span>+1.0</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">-1.0 (正常界限)</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">-2.5 (骨鬆門檻)</span>
            <span>-3.5</span>
            <span>-4.0 以下</span>
          </div>
        </div>
        <p className="text-[12px] text-slate-600 dark:text-slate-300 min-h-[1.25rem] bg-white dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
          {hoveredZone ?? '滑鼠懸停上方色塊可查看臨床處置策略。注意：凡發生過站立高度摔跌骨折者，無論 T 值為何皆定義為骨質疏鬆！'}
        </p>
      </div>
    </div>
  );
};

// ── 1B. Osteoporosis Super-Nutrition & Synergistic Mineralization Figure ─────
export const OsteoporosisSuperNutrientFigure: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'symphony' | 'paradox' | 'chrono'>('symphony');
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      name: '維生素 D3 ＋ TRPV6 通道',
      title: '腸道主動吸收門神',
      tag: '吸收率 15% ➔ 40%',
      color: 'amber',
      mechanism: '1,25(OH)2D3 結合腸細胞核 VDR 受體，促 TRPV6 鈣通道、Calbindin-D9k 鈣結合蛋白與 PMCA1b 鈣泵轉錄，將被動吸收躍升為主動吸收，抑制 PTH 溶骨破骨。',
      target: '維持血清 25(OH)D 於 30–50 ng/mL（每日 1000–2000 IU 隨油脂餐）。',
      analogy: '進港大門：把食物中的水泥磚塊成倍運進體內血液循環。',
    },
    {
      num: '02',
      name: '生醫高吸收鎂 (Mg²⁺)',
      title: '酵素啟動開關與晶體調和',
      tag: 'CYP 羥化輔酶',
      color: 'emerald',
      mechanism: '人體 60% 的鎂在骨骼。鎂是活化肝臟 25-羥化酶與腎臟 1α-羥化酶的不可或缺輔因子；同時調控羥磷灰石微晶尺寸，防止晶體過大硬脆，賦予骨彈性。',
      target: '每日 200–350 mg 甘胺酸鎂或檸檬酸鎂，維持鈣鎂比 2:1。',
      analogy: '攪拌電機：若沒有鎂，維生素 D 根本無法活化，水泥粗糙易碎。',
    },
    {
      num: '03',
      name: '維生素 K2 (MK-7) ＋ GGCX',
      title: '骨骼 GPS 導航員',
      tag: '終結鈣悖論',
      color: 'sky',
      mechanism: 'γ-麩胺醯羧化酶必需輔因子。雙重活化：1. 骨鈣素（cOC）：牢牢抓住鈣鑲嵌進羥磷灰石；2. 基質 Gla 蛋白（cMGP）：強烈封印游離鈣，阻斷冠狀動脈與主動脈鈣化。',
      target: '每日 90–180 µg 天然 MK-7 型（半衰期 72 小時長效全身導航）。',
      analogy: '精準導航：把游離鈣抓進骨頭庫存，嚴厲驅離動脈血管壁。',
    },
    {
      num: '04',
      name: '特異性骨膠原蛋白肽 ＋ Vit C',
      title: '骨基質鋼筋彈性網架',
      tag: '35% 骨有機質',
      color: 'rose',
      mechanism: '骨基質乾重 35% 為有機質，其中 90% 為 Type I 膠原纖維。特異性膠原肽刺激成骨細胞轉錄前膠原蛋白；Vit C 催化脯胺醯 4-羥化酶，維持三股螺旋穩定耐剪切。',
      target: '每日 5g 特異性骨膠原蛋白肽（如 Fortibone）＋ 100–200mg Vit C。',
      analogy: '鋼筋骨架：水泥硬而脆，必須有抗震鋼筋網才能抵禦跌倒衝擊。',
    },
    {
      num: '05',
      name: '微量礦物質交聯網絡 (硼/鋅/錳/矽)',
      title: '微結構固化鎖扣',
      tag: 'LOX 吡啶交聯',
      color: 'purple',
      mechanism: '硼（Boron 3mg）延長雌激素與 D3 半衰期，抑制尿鈣流失 44%；鋅活化 ALP 成骨酵素；錳與銅活化賴胺醯氧化酶（LOX）形成吡啶諾林共價交聯；正矽酸促進初期鈣鹽成核。',
      target: '每日 硼 3mg、鋅 15mg、錳 2mg、銅 1mg、矽 5–10mg。',
      analogy: '鋼架螺栓：栓緊每一根膠原蛋白分子，牢牢鎖住鈣鹽沉積。',
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-salud-cyan animate-pulse" />
          <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200">骨質疏鬆精準超補機轉圖解</span>
        </div>
        <div className="inline-flex rounded-lg bg-slate-200 dark:bg-slate-800 p-0.5 text-[12px] font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('symphony')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'symphony'
                ? 'bg-white dark:bg-slate-950 text-salud-primary dark:text-salud-cyan shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            超補五重奏協同
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('paradox')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'paradox'
                ? 'bg-white dark:bg-slate-950 text-salud-primary dark:text-salud-cyan shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            鈣悖論對照 (血管 vs 骨骼)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chrono')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'chrono'
                ? 'bg-white dark:bg-slate-950 text-salud-primary dark:text-salud-cyan shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            24h 黃金時序排程
          </button>
        </div>
      </div>

      {/* Tab 1: The 5-Player Symphony */}
      {activeTab === 'symphony' && (
        <div className="space-y-4">
          <p className="text-[12px] text-slate-600 dark:text-slate-300">
            骨骼不是靜止的石頭，而是「鋼筋（膠原蛋白有機網架）＋水泥（羥磷灰石無機鈣磷）」的動態活體組織。點選下方五大生化環節，查看超補協同機轉：
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {steps.map((st, idx) => (
              <button
                key={st.num}
                type="button"
                onClick={() => setSelectedStep(idx)}
                className={`text-left p-2.5 rounded-lg border transition-all ${
                  selectedStep === idx
                    ? 'border-salud-primary dark:border-salud-cyan bg-white dark:bg-slate-950 shadow-sm ring-1 ring-salud-primary/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span>STEP {st.num}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">{st.tag}</span>
                </div>
                <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-1">{st.title}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 truncate">{st.name}</div>
              </button>
            ))}
          </div>

          {/* Detailed Card for Selected Step */}
          <div className="rounded-xl border border-sky-200 dark:border-sky-800/60 bg-white dark:bg-slate-950 p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-salud-primary text-white text-[12px] font-bold">
                  {steps[selectedStep].num}
                </span>
                <span className="text-[14px] font-bold text-slate-900 dark:text-slate-100">
                  {steps[selectedStep].title} — {steps[selectedStep].name}
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300">
                {steps[selectedStep].tag}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px] mt-3">
              <div className="md:col-span-2 space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-salud-primary dark:text-salud-cyan block mb-1">生化分子靶向機轉：</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{steps[selectedStep].mechanism}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">生活神譬喻：</span>
                  <p className="text-emerald-900 dark:text-emerald-200">{steps[selectedStep].analogy}</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-amber-900 dark:text-amber-300 text-[11px] uppercase tracking-wider block mb-1.5">
                    臨床超補靶向劑量
                  </span>
                  <p className="text-[12px] text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                    {steps[selectedStep].target}
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-amber-200 dark:border-amber-800/50">
                  協同效應：缺少任一環節，鈣吸收與礦化效率即大幅衰退。
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: The Calcium Paradox Contrast */}
      {activeTab === 'paradox' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* The Bad: Blind Monotherapy Calcium */}
            <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-rose-900 dark:text-rose-300">傳統盲目高劑量補鈣（無導航）</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-semibold">
                  鈣悖論 (Calcium Paradox)
                </span>
              </div>
              <svg viewBox="0 0 260 130" className="w-full h-auto" role="img" aria-label="盲目高劑量補鈣示意圖：游離鈣沉積血管與軟組織，骨骼依舊疏鬆">
                <rect x="5" y="5" width="250" height="120" rx="8" fill="currentColor" className="text-rose-100/30 dark:text-rose-900/20" />
                
                {/* Vessel with Calcification */}
                <path d="M 20 40 Q 70 35 120 40 T 240 40" stroke="#f43f5e" strokeWidth="14" fill="none" opacity="0.25" strokeLinecap="round" />
                <path d="M 20 40 Q 70 35 120 40 T 240 40" stroke="#e11d48" strokeWidth="6" fill="none" strokeDasharray="6 4" />
                {/* Calcium stones in vessel */}
                <circle cx="65" cy="40" r="4.5" fill="#e11d48" />
                <circle cx="110" cy="38" r="5" fill="#e11d48" />
                <circle cx="170" cy="41" r="5.5" fill="#e11d48" />
                <text x="75" y="24" fontSize="9" fill="#be123c" fontWeight="bold">動脈血管壁硬化鈣化 (CAC 升高)</text>

                {/* Hollow Bone */}
                <rect x="35" y="65" width="190" height="50" rx="6" fill="white" className="dark:fill-slate-900" stroke="#fda4af" strokeWidth="1.5" />
                {/* Broken trabeculae */}
                <line x1="50" y1="75" x2="50" y2="95" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="100" y1="75" x2="100" y2="88" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="160" y1="90" x2="160" y2="105" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="130" cy="90" r="8" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                <text x="70" y="100" fontSize="9" fill="#e11d48" fontWeight="bold">骨小梁依然穿孔空洞（骨折未降）</text>
              </svg>
              <ul className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1 pl-4 list-disc">
                <li><strong>腸道吸收率低</strong>：無 D3 活化 TRPV6，高劑量碳酸鈣在小腸飽和沉積，造成腹脹硬便。</li>
                <li><strong>游離鈣迷航</strong>：未羧化骨鈣素（ucOC）無法抓鈣，血鈣游離漂流。</li>
                <li><strong>血管硬化風險</strong>：未羧化 MGP（ucMGP）失去抑鈣功能，游離鈣在冠狀動脈沉澱形成斑塊。</li>
              </ul>
            </div>

            {/* The Good: Precision Super-Nutrient Synergy */}
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-emerald-900 dark:text-emerald-300">醫學精準超補協同（D3+K2+Mg+膠原）</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold">
                  骨質沉積 ＋ 血管光滑
                </span>
              </div>
              <svg viewBox="0 0 260 130" className="w-full h-auto" role="img" aria-label="精準超補示意圖：K2 活化 cMGP 保護血管光滑，cOC 導引鈣鎖入緻密骨小梁">
                <rect x="5" y="5" width="250" height="120" rx="8" fill="currentColor" className="text-emerald-100/30 dark:text-emerald-900/20" />
                
                {/* Clear Clean Vessel */}
                <path d="M 20 40 Q 70 35 120 40 T 240 40" stroke="#10b981" strokeWidth="12" fill="none" opacity="0.3" strokeLinecap="round" />
                <path d="M 20 40 Q 70 35 120 40 T 240 40" stroke="#059669" strokeWidth="3" fill="none" />
                <text x="65" y="24" fontSize="9" fill="#047857" fontWeight="bold">cMGP 封印鈣化：動脈內皮光滑富彈性</text>

                {/* Dense Strong Bone with Collagen Grid */}
                <rect x="35" y="65" width="190" height="50" rx="6" fill="white" className="dark:fill-slate-900" stroke="#34d399" strokeWidth="1.5" />
                {/* Interlinked struts */}
                <g stroke="#059669" strokeWidth="3" strokeLinecap="round">
                  <line x1="55" y1="72" x2="55" y2="108" />
                  <line x1="95" y1="72" x2="95" y2="108" />
                  <line x1="135" y1="72" x2="135" y2="108" />
                  <line x1="175" y1="72" x2="175" y2="108" />
                  <line x1="205" y1="72" x2="205" y2="108" />
                  <line x1="55" y1="85" x2="205" y2="85" strokeWidth="2" />
                  <line x1="55" y1="98" x2="205" y2="98" strokeWidth="2" />
                </g>
                <text x="60" y="112" fontSize="8.5" fill="#065f46" fontWeight="bold">cOC 抓鈣入骨 ＋ 膠原鋼筋網：抗壓抗震</text>
              </svg>
              <ul className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1 pl-4 list-disc">
                <li><strong>D3 開門主動吸收</strong>：TRPV6 與 Calbindin 提高小腸鈣吸收達 30–40%。</li>
                <li><strong>K2 (MK-7) 雙重導航</strong>：活化 cOC 將鈣晶體固定在骨膠原網架；活化 cMGP 清除血管斑塊。</li>
                <li><strong>鎂與膠原蛋白肽雙重賦彈</strong>：甘胺酸鎂防止晶體過大硬脆，Type I 膠原纖維吸收衝擊剪力。</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 24h Chrono-Nutrition Clock */}
      {activeTab === 'chrono' && (
        <div className="space-y-3">
          <p className="text-[12px] text-slate-600 dark:text-slate-300">
            <strong>時差用藥法則</strong>：抗骨鬆處方藥（如雙磷酸鹽）與高濃度礦物質（鈣、鎂、鐵）在胃內會立刻發生螯合沉澱而失效；而夜間血鈣最低、破骨最強。請依循以下黃金時間軸服藥：
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                07:00 晨起空腹
              </span>
              <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100">處方藥專屬空窗</div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                口服雙磷酸鹽（福善美）搭配 200–300ml 溫水吞服，坐立 30 分鐘防食道逆流；<strong>嚴禁同時服用鈣片與早餐</strong>（至少間隔 2–4 小時）。
              </p>
            </div>

            <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                08:00 晨間早餐
              </span>
              <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100">脂溶門神 D3 ＋ K2</div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                搭配水煮蛋、酪梨或橄欖油早餐吞服 D3（1000–2000 IU）與 K2 MK-7（90–180 µg）；沖泡 5g 骨膠原蛋白肽，開啟整天鈣吸收引擎。
              </p>
            </div>

            <div className="p-3 rounded-lg border border-sky-200 dark:border-sky-800/60 bg-sky-50/50 dark:bg-sky-950/20 space-y-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300">
                12:30 午間正餐
              </span>
              <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100">原型高鈣 ＋ 阻斷反營養</div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                攝取傳統板豆腐、小魚乾或芥藍；<strong>阻斷反營養陷阱</strong>：禁喝高磷可樂碳酸汽水（激發 PTH 溶骨）、少鹽防尿鈣漏失、菠菜先川燙去草酸。
              </p>
            </div>

            <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                21:00 晚餐後/睡前
              </span>
              <div className="text-[12px] font-bold text-slate-900 dark:text-slate-100">精準超補鈣鎂入骨</div>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                服用檸檬酸鈣或螯合鈣（300–500mg）＋ 甘胺酸鎂（200–300mg）。<strong>削平清晨 2–6 點 PTH 溶骨夜間高峰</strong>，同時放鬆神經助眠。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── 2. Vertebral Compression Fracture & Kyphosis Figure ──────────────────────
export const VertebralWedgeFractureFigure: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Normal Vertebra */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 text-center">
          <p className="text-[12px] font-bold text-slate-900 dark:text-white">正常胸腰椎體 (矩形)</p>
          <svg viewBox="0 0 160 110" className="w-full h-auto my-2" role="img" aria-label="正常對稱矩形椎體">
            {/* Top disc */}
            <ellipse cx="80" cy="22" rx="55" ry="10" fill="#38bdf8" opacity="0.6" />
            {/* Vertebral body */}
            <path d="M25 22 L25 80 Q80 88 135 80 L135 22 Q80 30 25 22 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
            <text x="80" y="55" fontSize="11" fontWeight="700" textAnchor="middle" fill="#334155">前後緣高度對稱</text>
            {/* Bottom disc */}
            <ellipse cx="80" cy="88" rx="55" ry="10" fill="#38bdf8" opacity="0.6" />
          </svg>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">前高 = 後高 (100%)</span>
        </div>

        {/* Genant Grade 1-2 Wedge Collapse */}
        <div className="rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/30 dark:bg-amber-950/20 p-3 text-center">
          <p className="text-[12px] font-bold text-amber-900 dark:text-amber-300">楔形壓迫性骨折 (Genant G1-2)</p>
          <svg viewBox="0 0 160 110" className="w-full h-auto my-2" role="img" aria-label="前壁楔形塌陷，後壁高度保留">
            {/* Top tilted disc */}
            <path d="M25 45 Q80 35 135 22 Q80 14 25 35 Z" fill="#38bdf8" opacity="0.5" />
            {/* Wedged vertebral body */}
            <path d="M25 45 L25 80 Q80 86 135 80 L135 22 Q80 32 25 45 Z" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
            {/* Micro fracture lines */}
            <path d="M35 50 L55 68 M40 65 L60 60" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
            <text x="50" y="78" fontSize="10" fontWeight="700" fill="#b45309">前壁塌陷</text>
            <text x="120" y="55" fontSize="10" fontWeight="700" fill="#475569">後壁完好</text>
          </svg>
          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">前壁高度流失 20–35%</span>
        </div>

        {/* Genant Grade 3 Severe Collapse & Kümmell Disease */}
        <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3 text-center">
          <p className="text-[12px] font-bold text-rose-900 dark:text-rose-300">重度塌陷／骨壞死 (G3)</p>
          <svg viewBox="0 0 160 110" className="w-full h-auto my-2" role="img" aria-label="重度扁平骨折合併骨壞死缺損">
            <path d="M25 60 L25 82 Q80 88 135 78 L135 25 Q80 40 25 60 Z" fill="#fecdd3" stroke="#e11d48" strokeWidth="2.5" />
            {/* Necrotic cleft / intravertebral vacuum */}
            <ellipse cx="65" cy="70" rx="22" ry="7" fill="#1e293b" />
            <text x="65" y="73" fontSize="9" fontWeight="700" fill="#f8fafc" textAnchor="middle">真空壞死裂隙</text>
          </svg>
          <span className="text-[11px] text-rose-700 dark:text-rose-400 font-semibold">高度流失 &gt; 40%，駝背劇烈</span>
        </div>
      </div>

      {/* Progressive Kyphosis Mechanism Schematic */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-3.5">
        <h4 className="text-[13px] font-bold text-slate-900 dark:text-white mb-1.5">壓迫性骨折的連鎖骨牌效應：道格氏駝背與力學惡化</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px] text-slate-700 dark:text-slate-300">
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-amber-600 block mb-1">1. 重心前移</span>
            前側楔形塌陷使上半身重力力臂大幅向前延伸，對相鄰椎體的前柱施加 2–3 倍的額外剪力。
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-rose-600 block mb-1">2. 骨牌式連鎖骨折</span>
            單一節段壓迫骨折後，1 年內相鄰胸腰椎發生次發骨折的機率高達 15–20%（連鎖骨牌效應）。
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-purple-600 block mb-1">3. 心肺與消化受限</span>
            嚴重的道格氏駝背壓迫胸廓與腹腔，導致肺活量下降、胃食道逆流及提早飽足感營養不良。
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 3. Bone Cement (Kyphoplasty vs Vertebroplasty) Step-by-Step Figure ─────────
export const BoneCementProcedureFigure: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* 4-Step Kyphoplasty Infographic */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">微創氣球擴張椎體成形術（PKP 骨泥手術）四步流程圖解</h4>
          <span className="text-[11px] px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 font-semibold">局部麻醉 · C-arm 透視引導</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Step 1 */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-2.5 text-center flex flex-col justify-between">
            <div>
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-extrabold bg-sky-600 text-white rounded mb-1.5">步驟 1</span>
              <p className="text-[12px] font-bold text-slate-900 dark:text-white">經椎弓根穿刺穿透</p>
              <svg viewBox="0 0 120 90" className="w-full h-auto my-2" role="img" aria-label="穿刺針穿入椎體">
                <path d="M15 35 L15 75 L95 75 L95 30 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                {/* Trocar entering from right pedicle */}
                <line x1="115" y1="15" x2="45" y2="55" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                <circle cx="45" cy="55" r="3" fill="#dc2626" />
              </svg>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">穿刺針經皮安全穿過椎弓根，直達塌陷椎體中心。</p>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-sky-200 dark:border-sky-800/60 bg-sky-50/30 dark:bg-sky-950/30 p-2.5 text-center flex flex-col justify-between">
            <div>
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-extrabold bg-sky-600 text-white rounded mb-1.5">步驟 2</span>
              <p className="text-[12px] font-bold text-sky-950 dark:text-sky-300">氣球充氣撐開復位</p>
              <svg viewBox="0 0 120 90" className="w-full h-auto my-2" role="img" aria-label="氣球充氣撐開椎體高度">
                <path d="M15 25 L15 75 L95 75 L95 25 Z" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.5" />
                {/* Inflated balloon */}
                <ellipse cx="50" cy="50" rx="24" ry="18" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" opacity="0.8" />
                <text x="50" y="54" fontSize="10" fontWeight="700" fill="#0369a1" textAnchor="middle">高度復位</text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">置入氣球充氣，機械性撐起塌陷骨壁並擠壓周邊骨質。</p>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-2.5 text-center flex flex-col justify-between">
            <div>
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-extrabold bg-sky-600 text-white rounded mb-1.5">步驟 3</span>
              <p className="text-[12px] font-bold text-slate-900 dark:text-white">洩氣抽出形成空腔</p>
              <svg viewBox="0 0 120 90" className="w-full h-auto my-2" role="img" aria-label="氣球退出留下受控低壓空腔">
                <path d="M15 25 L15 75 L95 75 L95 25 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
                {/* Empty void cavity */}
                <ellipse cx="50" cy="50" rx="22" ry="16" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="50" y="53" fontSize="9" fontWeight="700" fill="#64748b" textAnchor="middle">受控低壓空腔</text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">氣球洩氣抽出，在椎體內部留下受控的人工封閉低壓腔。</p>
          </div>

          {/* Step 4 */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/30 p-2.5 text-center flex flex-col justify-between">
            <div>
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-extrabold bg-emerald-600 text-white rounded mb-1.5">步驟 4</span>
              <p className="text-[12px] font-bold text-emerald-950 dark:text-emerald-300">低壓灌注骨泥固化</p>
              <svg viewBox="0 0 120 90" className="w-full h-auto my-2" role="img" aria-label="低壓推注高黏度骨泥填充完工">
                <path d="M15 25 L15 75 L95 75 L95 25 Z" fill="#e2e8f0" stroke="#059669" strokeWidth="2" />
                {/* Solidified bone cement core */}
                <ellipse cx="50" cy="50" rx="23" ry="17" fill="#10b981" stroke="#047857" strokeWidth="2" />
                <text x="50" y="54" fontSize="10" fontWeight="700" fill="#ffffff" textAnchor="middle">骨泥固化</text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">低壓注入牙膏狀高黏度 PMMA 骨泥，數分鐘內凝固堅固耐壓。</p>
          </div>
        </div>
      </div>

      {/* Comparison: PVP vs PKP Risk Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
        <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20 p-3">
          <span className="font-bold text-amber-900 dark:text-amber-300 block mb-1">傳統椎體成形術 (PVP)</span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            無氣球撐開，直接高壓推注較液態之骨泥。優點為耗材成本較平價；缺點為<strong>無法顯著恢復塌陷高度</strong>，且加壓流體使<strong>骨泥滲漏率較高 (約 30–60%)</strong>。
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">氣球擴張椎體成形術 (PKP)</span>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            氣球撐開預造空腔，以極低壓力推注半固態高黏度骨泥。<strong>能顯著矯正駝背角度與高度</strong>，且<strong>滲漏率大幅降低至約 5–15%</strong>，安全性大幅提升。
          </p>
        </div>
      </div>
    </div>
  );
};

// ── 4. Minimally Invasive Spine Surgery (MISS & UBE) Comparison Figure ────────
export const MissVsOpenFigure: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional Open Approach */}
        <div className="rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-rose-900 dark:text-rose-300">傳統開放式脊椎手術</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 font-semibold">傷口 8–15 cm</span>
          </div>
          <svg viewBox="0 0 240 130" className="w-full h-auto" role="img" aria-label="傳統大開刀：肌肉自骨骼大面積剝離撕扯">
            {/* Skin layer cut wide open */}
            <path d="M10 20 L80 20 L100 80 L140 80 L160 20 L230 20" stroke="#f43f5e" strokeWidth="3" fill="none" />
            {/* Stripped, traumatized multifidus muscle retracted */}
            <path d="M20 25 C50 30 70 65 75 80" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
            <path d="M220 25 C190 30 170 65 165 80" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
            <text x="120" y="50" fontSize="10" fontWeight="700" fill="#e11d48" textAnchor="middle">大範圍牽引器強迫壓迫</text>
            <text x="120" y="65" fontSize="9" fill="#9f1239" textAnchor="middle">背肌缺血壞死、去神經化萎縮</text>
            {/* Spine bone deep inside */}
            <rect x="105" y="85" width="30" height="25" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
          </svg>
          <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 mt-2">
            <li>• 多裂肌完全從棘突剝離，術後永久失去動態抗剪力</li>
            <li>• 失血量約 300–800 ml，需留置傷口引流管</li>
            <li>• 住院 5–7 天，術後常見難纏的背部肌筋膜纖維化疼痛</li>
          </ul>
        </div>

        {/* Minimally Invasive UBE Approach */}
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-emerald-900 dark:text-emerald-300">雙通道內視鏡微創 (UBE)</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-semibold">雙孔各 0.5–0.7 cm</span>
          </div>
          <svg viewBox="0 0 240 130" className="w-full h-auto" role="img" aria-label="微創雙通道內視鏡：經自然肌纖維間隙穿透，完整保留多裂肌">
            {/* Intact skin line with two tiny stab portals */}
            <line x1="10" y1="20" x2="230" y2="20" stroke="#10b981" strokeWidth="3" />
            {/* Intact, healthy multifidus muscle bulk */}
            <rect x="20" y="25" width="200" height="55" rx="5" fill="#a7f3d0" opacity="0.35" />
            <text x="120" y="55" fontSize="11" fontWeight="700" fill="#047857" textAnchor="middle">多裂肌群完整保留 (零剝離)</text>

            {/* Two micro-portals passing through natural muscle gaps */}
            {/* Endoscope viewing portal */}
            <line x1="90" y1="15" x2="110" y2="85" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
            <circle cx="110" cy="85" r="4" fill="#38bdf8" />
            <text x="75" y="12" fontSize="9" fontWeight="700" fill="#0284c7">30x HD 鏡頭孔</text>

            {/* Surgical instrument portal */}
            <line x1="150" y1="15" x2="130" y2="85" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
            <circle cx="130" cy="85" r="3" fill="#f59e0b" />
            <text x="165" y="12" fontSize="9" fontWeight="700" fill="#d97706">微創器械孔</text>

            {/* Target spinal lamina lesion */}
            <rect x="105" y="85" width="30" height="25" rx="3" fill="#cbd5e1" stroke="#059669" strokeWidth="2" />
          </svg>
          <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 mt-2">
            <li>• 透過天然肌肉束間隙穿透，完全保留肌肉與神經完整性</li>
            <li>• 連續水流沖刷止血，失血極少 (&lt; 30–50 ml)</li>
            <li>• 術後當天即可下床，多數 1–2 天即可出院回歸生活</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ── 5. McGill Big 3 Core Stability Schematic Figure ─────────────────────────
export const McgillBigThreeFigure: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Modified Curl-Up */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-slate-900 dark:text-white">1. 改良式捲腹</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">腰椎零剪切力</span>
            </div>
            <svg viewBox="0 0 160 80" className="w-full h-auto my-2" role="img" aria-label="改良式捲腹動作姿勢">
              {/* Floor */}
              <line x1="10" y1="72" x2="150" y2="72" stroke="#cbd5e1" strokeWidth="2" />
              {/* Hands under lower back to preserve lumbar lordosis */}
              <ellipse cx="68" cy="67" rx="10" ry="3" fill="#f59e0b" />
              {/* Torso & Head lifted 2-3 cm only */}
              <circle cx="30" cy="55" r="7" fill="#3b82f6" />
              <path d="M37 57 L68 65 L95 70" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* One knee bent 90 deg, one straight */}
              <path d="M95 70 L115 50 L125 72" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M95 70 L145 72" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              <strong>關鍵口訣：</strong>雙手墊於腰後維持弧度，單膝屈曲鎖定骨盆，僅頭胸微離地 2 公分，絕不彎曲腰椎。
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-2">維持 7–8 秒 × 每邊 4–5 次</span>
        </div>

        {/* 2. Side Bridge */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-slate-900 dark:text-white">2. 側棒式 (Side Bridge)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold">腰方肌側向鋼纜</span>
            </div>
            <svg viewBox="0 0 160 80" className="w-full h-auto my-2" role="img" aria-label="側棒式動作姿勢">
              <line x1="10" y1="72" x2="150" y2="72" stroke="#cbd5e1" strokeWidth="2" />
              {/* Supporting forearm on ground */}
              <line x1="45" y1="72" x2="45" y2="52" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
              {/* Head, torso, hips, and knees in one straight diagonal line */}
              <circle cx="35" cy="42" r="7" fill="#0284c7" />
              <path d="M42 45 L80 55 L135 72" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              <strong>關鍵口訣：</strong>手肘置於肩下，肩、臀、膝呈一直線推起，以最低壓縮力鍛鍊腰椎最強側向穩定肌「腰方肌」。
            </p>
          </div>
          <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold mt-2">維持 8–10 秒 × 每邊 3–4 組</span>
        </div>

        {/* 3. Bird-Dog */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-bold text-slate-900 dark:text-white">3. 鳥狗式 (Bird-Dog)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold">多裂肌抗旋轉</span>
            </div>
            <svg viewBox="0 0 160 80" className="w-full h-auto my-2" role="img" aria-label="四足跪姿鳥狗式動作姿勢">
              <line x1="10" y1="72" x2="150" y2="72" stroke="#cbd5e1" strokeWidth="2" />
              {/* Torso horizontal flat table */}
              <path d="M50 48 L105 48" stroke="#9333ea" strokeWidth="4" strokeLinecap="round" />
              <circle cx="45" cy="42" r="6" fill="#9333ea" />
              {/* Left hand supporting, Right hand reaching out */}
              <line x1="60" y1="48" x2="60" y2="72" stroke="#7e22ce" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="48" x2="15" y2="48" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
              {/* Right knee supporting, Left leg reaching back */}
              <line x1="95" y1="48" x2="95" y2="72" stroke="#7e22ce" strokeWidth="3" strokeLinecap="round" />
              <line x1="105" y1="48" x2="148" y2="48" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              <strong>關鍵口訣：</strong>四足跪姿背平如桌面，對角手腳「向遠處延伸」而非向上挑腰，避免腰椎過度前伸擠壓。
            </p>
          </div>
          <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold mt-2">延伸 8 秒 × 每邊 5 次 × 3 組</span>
        </div>
      </div>
    </div>
  );
};

// ── 6. Spinal Spring Biomechanics & Sagittal Balance Figure ───────────────────
export const SpineSpringBiomechanicsFigure: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Balanced Spring Curves */}
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-emerald-900 dark:text-emerald-300">理想脊柱彈簧：四段生理彎曲</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold">重力自然消散</span>
          </div>
          <svg viewBox="0 0 220 200" className="w-full h-auto" role="img" aria-label="健康的 S 型脊柱曲線如同彈簧">
            {/* Plumb line (C7 to S1) */}
            <line x1="110" y1="15" x2="110" y2="185" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="115" y="25" fontSize="9" fill="#64748b" fontStyle="italic">C7 鉛垂平衡線</text>

            {/* Spring S-curve path */}
            <path
              d="M110 30 Q125 50 110 70 Q90 105 110 135 Q130 160 110 185"
              fill="none"
              stroke="#059669"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Markers */}
            <circle cx="110" cy="30" r="5" fill="#047857" />
            <text x="135" y="52" fontSize="10" fontWeight="700" fill="#047857">頸椎前凸 20–40°</text>

            <circle cx="100" cy="100" r="4" fill="#047857" />
            <text x="35" y="103" fontSize="10" fontWeight="700" fill="#047857">胸椎後凸 20–40°</text>

            <circle cx="110" cy="150" r="4" fill="#047857" />
            <text x="135" y="153" fontSize="10" fontWeight="700" fill="#047857">腰椎前凸 30–50°</text>

            <circle cx="110" cy="185" r="5" fill="#047857" />
            <text x="118" y="188" fontSize="9" fill="#047857">薦骨底 (S1)</text>
          </svg>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">
            四段交互彎曲構成天然彈簧，走路奔跑時能將衝擊分散十倍以上，重力鉛垂線剛好落在骨盆中央。
          </p>
        </div>

        {/* Distorted Spine / Flat Back / Kyphosis */}
        <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-rose-900 dark:text-rose-300">失衡曲線：直頸平背與駝背</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-semibold">應力集中破壞</span>
          </div>
          <svg viewBox="0 0 220 200" className="w-full h-auto" role="img" aria-label="平背或駝背失衡：重力失衡造成椎間盤與小面關節加速磨損">
            {/* Plumb line */}
            <line x1="110" y1="15" x2="110" y2="185" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Forward Head & Kyphotic Path */}
            <path
              d="M145 35 Q130 55 125 75 Q75 115 105 155 Q115 170 110 185"
              fill="none"
              stroke="#e11d48"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Markers */}
            <circle cx="145" cy="35" r="5" fill="#be123c" />
            <text x="145" y="25" fontSize="10" fontWeight="700" fill="#be123c">頭部過度前傾 (+35mm)</text>

            <circle cx="85" cy="115" r="4" fill="#be123c" />
            <text x="25" y="125" fontSize="10" fontWeight="700" fill="#be123c">駝背過度後凸</text>

            <text x="125" y="165" fontSize="10" fontWeight="700" fill="#be123c">腰椎弧度變平</text>
          </svg>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2">
            頭部前傾每增加 2.5 公分，頸椎負荷加重一倍；平背與駝背使彈簧避震失效，所有撞擊直衝椎間盤。
          </p>
        </div>
      </div>
    </div>
  );
};

// ── 7. Post-Op & Fracture Care: Log-Rolling & Brace 4-Step Protocol Figure ───
export const PostOpLogRollAndBraceFigure: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/70 bg-white dark:bg-slate-900/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
            脊椎骨折與微創術後：「先穿再坐、先躺再脫」＋圓滾木上下床四部曲
          </h4>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold">
            台灣醫學中心標準臨床護理規範
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Step 1: Lie flat and put on brace */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-600 text-white rounded">步驟 1 · 平躺穿背架</span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">先穿再坐</span>
              </div>
              <svg viewBox="0 0 150 90" className="w-full h-auto my-2" role="img" aria-label="平躺於床上先穿妥背架">
                {/* Bed */}
                <rect x="10" y="65" width="130" height="8" rx="3" fill="#cbd5e1" />
                {/* Pillow */}
                <rect x="15" y="57" width="22" height="8" rx="3" fill="#94a3b8" />
                {/* Supine body straight */}
                <circle cx="28" cy="48" r="7" fill="#059669" />
                <line x1="36" y1="52" x2="90" y2="54" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
                {/* Brace wrapped on torso */}
                <rect x="52" y="45" width="26" height="16" rx="3" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
                <text x="65" y="56" fontSize="8" fontWeight="800" fill="#ffffff" textAnchor="middle">背架</text>
                {/* Knees slightly bent */}
                <path d="M90 54 L112 42 L130 62" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              </svg>
              <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
                起床前<strong>在平躺狀態下先穿好背架</strong>（內穿棉質衫、內褲穿在背架外），鬆緊度留 1–2 指幅。
              </p>
            </div>
          </div>

          {/* Step 2: Log-roll to side */}
          <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/30 dark:bg-sky-950/20 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-sky-600 text-white rounded">步驟 2 · 圓滾木側翻</span>
                <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400">肩臀一直線</span>
              </div>
              <svg viewBox="0 0 150 90" className="w-full h-auto my-2" role="img" aria-label="圓滾木翻身法：肩與骨盆同步側轉">
                <rect x="10" y="65" width="130" height="8" rx="3" fill="#cbd5e1" />
                {/* Alignment axis dashed line */}
                <line x1="20" y1="48" x2="125" y2="48" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="30" cy="48" r="7" fill="#0284c7" />
                <rect x="40" y="41" width="46" height="14" rx="4" fill="#0ea5e9" />
                <text x="63" y="51" fontSize="8" fontWeight="700" fill="#ffffff" textAnchor="middle">肩・胸・臀同步</text>
                {/* Curved rotation arrows */}
                <path d="M50 30 Q63 22 76 30" stroke="#0369a1" strokeWidth="2" fill="none" />
                <polygon points="76,30 71,26 72,32" fill="#0369a1" />
                <path d="M86 48 L112 52 L124 62" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              </svg>
              <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
                雙膝微彎收小腹，<strong>頭、肩、胸、臀像滾木頭一樣同步轉向床緣側臥</strong>，絕對不可扭轉腰部。
              </p>
            </div>
          </div>

          {/* Step 3: Legs drop + Hands push up */}
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-600 text-white rounded">步驟 3 · 垂腿手推床</span>
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400">免用腰力</span>
              </div>
              <svg viewBox="0 0 150 90" className="w-full h-auto my-2" role="img" aria-label="雙腿垂出床外，雙手推床面將軀幹直立撐起">
                <rect x="15" y="55" width="120" height="8" rx="3" fill="#cbd5e1" />
                {/* Diagonal straight spine being pushed up */}
                <circle cx="52" cy="22" r="7" fill="#4f46e5" />
                <line x1="55" y1="29" x2="78" y2="54" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
                {/* Supporting arm pushing bed */}
                <line x1="62" y1="36" x2="45" y2="55" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />
                {/* Legs dropping off edge */}
                <path d="M78 54 L98 56 L102 82" stroke="#4f46e5" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <text x="32" y="48" fontSize="8" fontWeight="700" fill="#4338ca">手推床</text>
                <text x="118" y="75" fontSize="8" fontWeight="700" fill="#4338ca">腿下垂</text>
              </svg>
              <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
                雙小腿垂出床沿作為槓桿，同時<strong>以手肘與手掌推壓床面撐起上半身</strong>，腰背維持平直不彎曲。
              </p>
            </div>
          </div>

          {/* Step 4: Sit at edge 3-5 min then walker */}
          <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-600 text-white rounded">步驟 4 · 靜坐防頭暈</span>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">扶穩再站</span>
              </div>
              <svg viewBox="0 0 150 90" className="w-full h-auto my-2" role="img" aria-label="於床緣直立靜坐3至5分鐘確認無頭暈再扶助行器站起">
                <rect x="15" y="55" width="90" height="8" rx="3" fill="#cbd5e1" />
                {/* Upright seated torso */}
                <circle cx="65" cy="18" r="7" fill="#d97706" />
                <line x1="65" y1="25" x2="65" y2="54" stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
                <rect x="58" y="32" width="14" height="16" rx="2" fill="#10b981" />
                {/* Seated legs */}
                <path d="M65 54 L88 55 L88 82" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                {/* Walker in front */}
                <path d="M112 82 L112 42 L130 42 L130 82" stroke="#64748b" strokeWidth="2.5" fill="none" />
                <text x="35" y="38" fontSize="8" fontWeight="700" fill="#b45309">靜坐 3-5 分</text>
              </svg>
              <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-relaxed">
                於床緣<strong>靜坐 3–5 分鐘確認無頭暈</strong>後，雙手扶助行器大腿用力站起。躺回時<strong>先躺平再脫背架</strong>！
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── 8. 3D O-arm Navigation, OLIF & Endoscopy Triad Figure ─────────────────────
export const NavigationOlifAndEndoscopyFigure: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-[14px] font-bold text-slate-900 dark:text-white">
          微創脊椎中心三大精準核心：3D 電腦導航 (O-arm) × OLIF 側開融合 × UBE 內視鏡
        </h4>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 font-bold">
          SNQ 國家品質標章微創技術體系
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Card 1: 3D O-arm Navigation */}
        <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/30 dark:bg-sky-950/20 p-3">
          <p className="text-[12.5px] font-bold text-sky-950 dark:text-sky-200 mb-1">
            1. O-arm 3D 電腦導航（手術 GPS）
          </p>
          <svg viewBox="0 0 180 100" className="w-full h-auto my-1.5" role="img" aria-label="3D電腦導航即時立體定位椎弓根骨釘">
            {/* O-arm ring arc */}
            <path d="M25 85 A65 65 0 0 1 155 85" stroke="#0284c7" strokeWidth="4" strokeDasharray="6 3" fill="none" />
            <text x="90" y="20" fontSize="9" fontWeight="700" fill="#0284c7" textAnchor="middle">3D 立體影像導航雷達</text>
            {/* Vertebral body & pedicles */}
            <ellipse cx="90" cy="70" rx="28" ry="18" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            <circle cx="90" cy="46" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="90" y="49" fontSize="7" fontWeight="700" fill="#854d0e" textAnchor="middle">神經</text>
            {/* Guided trajectory lines */}
            <line x1="45" y1="30" x2="76" y2="68" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            <line x1="135" y1="30" x2="104" y2="68" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            <text x="90" y="74" fontSize="8" fontWeight="700" fill="#1e293b" textAnchor="middle">精準度 &gt; 99%</text>
          </svg>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            術中即時 3D 影像定位，不須剝離大範圍肌肉或牽拉神經，安全完成微創置釘、翻修與側彎駝背矯形。
          </p>
        </div>

        {/* Card 2: 3D Navigation OLIF */}
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3">
          <p className="text-[12.5px] font-bold text-emerald-950 dark:text-emerald-200 mb-1">
            2. OLIF 側開式微創腰椎融合
          </p>
          <svg viewBox="0 0 180 100" className="w-full h-auto my-1.5" role="img" aria-label="OLIF由側腹部天然肌間隙置入大面積融合支架達成間接減壓">
            {/* Collapsed vs Restored disc space */}
            <rect x="55" y="18" width="70" height="22" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            {/* Large OLIF Cage */}
            <rect x="58" y="42" width="64" height="16" rx="3" fill="#10b981" stroke="#047857" strokeWidth="2" />
            <text x="90" y="53" fontSize="8" fontWeight="800" fill="#ffffff" textAnchor="middle">超大融合支架撐開</text>
            <rect x="55" y="60" width="70" height="22" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            {/* Anterolateral corridor arrow */}
            <path d="M12 50 L52 50" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
            <polygon points="54,50 47,46 47,54" fill="#059669" />
            <text x="32" y="42" fontSize="8" fontWeight="700" fill="#047857" textAnchor="middle">側前天然間隙</text>
            <text x="150" y="53" fontSize="8" fontWeight="700" fill="#059669" textAnchor="middle">背肌零破壞</text>
          </svg>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            經腹部側前方天然間隙置入大支架，直接撐高椎間盤與神經孔（間接減壓），<strong>完全不傷背後肌肉與神經</strong>。
          </p>
        </div>

        {/* Card 3: UBE / PELD Endoscopy */}
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 p-3">
          <p className="text-[12.5px] font-bold text-indigo-950 dark:text-indigo-200 mb-1">
            3. 全脊椎內視鏡減壓 (UBE / PELD)
          </p>
          <svg viewBox="0 0 180 100" className="w-full h-auto my-1.5" role="img" aria-label="雙通道脊椎內視鏡30倍放大水壓灌注微創減壓">
            {/* Dual micro portals */}
            <line x1="55" y1="15" x2="82" y2="62" stroke="#4f46e5" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="125" y1="15" x2="98" y2="62" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            {/* Magnified field circle */}
            <circle cx="90" cy="65" r="20" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            <text x="90" y="63" fontSize="8" fontWeight="800" fill="#312e81" textAnchor="middle">30x 水流視野</text>
            <text x="90" y="74" fontSize="7.5" fontWeight="700" fill="#047857" textAnchor="middle">精準除骨刺</text>
            <text x="45" y="13" fontSize="8" fontWeight="700" fill="#4f46e5">0.5cm 鏡頭</text>
            <text x="132" y="13" fontSize="8" fontWeight="700" fill="#d97706">0.7cm 器械</text>
          </svg>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            小於 1 公分微孔穿透肌間隙，水壓止血、視野放大 30 倍清除突出椎間盤與肥厚黃韌帶，當天下床、隔天出院。
          </p>
        </div>
      </div>
    </div>
  );
};

