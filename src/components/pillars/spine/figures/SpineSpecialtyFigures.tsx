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
