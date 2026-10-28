import React from 'react';

/**
 * GastroFigures.tsx — 肝膽腸胃科全方位臨床專區客製化 SVG 解剖與機轉圖解
 * 覆蓋全部 12 章節：消化道全景與腦腸軸、胃食道逆流與洛杉磯分級、幽門螺旋桿菌 Correa 致癌瀑布與碳13吹氣、
 * 腸躁症低 FODMAP 滲透發酵機轉、潰瘍性結腸炎 vs 克隆氏症比較、大腸腺瘤-癌變序列與內視鏡切除、
 * MASLD 脂肪肝纖維化與減重逆轉階梯、B 肝 cccDNA vs C 肝 DAA 根治、肝硬化門脈高壓四大併發症、
 * 膽道系統與 Charcot 三聯徵、急性胰臟炎三大病因與背痛輻射、布里斯托便型 1-7 型與分次清腸對照。
 */

// ── 1. GI Tract Panorama & Gut-Brain Axis Figure ─────────────────────────────
export const GiTractPanoramaFigure: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left: Digestive Tract & Hepato-Biliary-Pancreatic Junction */}
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-bold text-emerald-950 dark:text-emerald-200">消化道全貌與肝膽胰匯流（壺腹）</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold">約 9 公尺消化產線</span>
        </div>
        <svg viewBox="0 0 320 230" className="w-full h-auto" role="img" aria-label="消化道全貌與肝臟、膽囊、胰臟在十二指腸法特氏壺腹的匯流示意圖">
          <rect x="6" y="6" width="308" height="218" rx="12" fill="currentColor" className="text-white/80 dark:text-slate-900/70" />
          {/* Esophagus */}
          <path d="M155 16 L155 58" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
          <circle cx="155" cy="58" r="5" fill="#dc2626" />
          <text x="168" y="34" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">食道 (25cm)</text>
          <text x="168" y="59" className="text-[9px] font-semibold fill-rose-600 dark:fill-rose-400">賁門括約肌 (LES)</text>

          {/* Liver */}
          <path d="M28 52 C28 36, 98 34, 128 54 L110 92 C75 96, 32 84, 28 52 Z" fill="#b91c1c" opacity="0.85" />
          <text x="45" y="66" className="text-[11px] font-bold fill-white">肝臟（製造膽汁）</text>

          {/* Gallbladder & Bile Duct */}
          <ellipse cx="78" cy="96" rx="16" ry="9" fill="#15803d" />
          <text x="30" y="114" className="text-[9.5px] font-bold fill-emerald-700 dark:fill-emerald-400">膽囊（濃縮膽汁）</text>
          <path d="M92 94 L125 112 L132 132" fill="none" stroke="#16a34a" strokeWidth="3.5" />

          {/* Stomach */}
          <path d="M155 58 C188 55, 222 76, 212 108 C202 132, 162 136, 138 122 C132 118, 145 92, 155 58 Z" fill="#fb7185" opacity="0.85" stroke="#e11d48" strokeWidth="2" />
          <text x="158" y="96" className="text-[11px] font-bold fill-white">胃（胃酸 pH 1.5）</text>

          {/* Pancreas */}
          <path d="M138 130 C165 124, 215 128, 228 138 C215 148, 165 148, 138 140 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <path d="M140 135 L212 136" stroke="#92400e" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="156" y="138" className="text-[9.5px] font-bold fill-amber-950">胰臟（解脂酶/胰島素）</text>

          {/* Duodenum & Ampulla of Vater */}
          <path d="M138 122 C118 122, 116 150, 142 154" fill="none" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" />
          <circle cx="128" cy="135" r="5" fill="#22c55e" stroke="#14532d" strokeWidth="1.5" />
          <text x="20" y="142" className="text-[9.5px] font-bold fill-emerald-800 dark:fill-emerald-300">十二指腸乳頭（膽胰匯流口）</text>

          {/* Colon Frame & Small Intestine */}
          <path d="M108 205 L108 164 L225 164 L225 204 L182 204 L182 216" fill="none" stroke="#a855f7" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          <rect x="126" y="172" width="80" height="28" rx="8" fill="#fdba74" opacity="0.85" />
          <text x="134" y="189" className="text-[10px] font-bold fill-orange-950">小腸 6m（吸收90%營養）</text>
          <text x="234" y="185" className="text-[9.5px] font-bold fill-purple-700 dark:fill-purple-300">大腸 1.5m</text>
          <text x="234" y="198" className="text-[9px] fill-slate-600 dark:fill-slate-400">吸水＋菌叢發酵</text>
        </svg>
      </div>

      {/* Right: Bidirectional Gut-Brain Axis */}
      <div className="rounded-xl border border-sky-200 dark:border-sky-800/60 bg-sky-50/30 dark:bg-sky-950/20 p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-bold text-sky-950 dark:text-sky-200">腦腸軸（Gut-Brain Axis）雙向高速公路</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 font-semibold">90% 血清素在腸道</span>
        </div>
        <svg viewBox="0 0 320 230" className="w-full h-auto" role="img" aria-label="腦腸軸雙向訊號傳遞：大腦壓力與迷走神經、腸道神經系統與短鏈脂肪酸">
          <rect x="6" y="6" width="308" height="218" rx="12" fill="currentColor" className="text-white/80 dark:text-slate-900/70" />
          {/* Brain Box */}
          <rect x="75" y="16" width="170" height="46" rx="12" fill="#0284c7" />
          <text x="160" y="36" textAnchor="middle" className="text-[11.5px] font-bold fill-white">中樞神經（大腦情緒與壓力中心）</text>
          <text x="160" y="51" textAnchor="middle" className="text-[9.5px] fill-sky-100">焦慮、失眠、高壓 → 交感神經與皮質醇活化</text>

          {/* Downward Arrow: Brain to Gut */}
          <path d="M115 66 L115 142" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 3" />
          <polygon points="115,148 109,138 121,138" fill="#ef4444" />
          <rect x="18" y="84" width="90" height="44" rx="6" fill="#fef2f2" stroke="#fca5a5" />
          <text x="63" y="101" textAnchor="middle" className="text-[9.5px] font-bold fill-rose-800">由上而下（腦→腸）</text>
          <text x="63" y="116" textAnchor="middle" className="text-[8.5px] fill-rose-700">腸蠕動失調、內臟超敏感</text>

          {/* Upward Arrow: Gut to Brain */}
          <path d="M205 148 L205 72" stroke="#10b981" strokeWidth="3" />
          <polygon points="205,66 199,76 211,76" fill="#10b981" />
          <rect x="212" y="84" width="94" height="44" rx="6" fill="#ecfdf5" stroke="#6ee7b7" />
          <text x="259" y="101" textAnchor="middle" className="text-[9.5px] font-bold fill-emerald-800">由下而上（腸→腦）</text>
          <text x="259" y="116" textAnchor="middle" className="text-[8.5px] fill-emerald-700">迷走神經、SCFA 短鏈脂肪酸</text>

          {/* Center Vagus Nerve Badge */}
          <rect x="130" y="93" width="60" height="26" rx="13" fill="#f1f5f9" stroke="#94a3b8" />
          <text x="160" y="109" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-700">迷走神經</text>

          {/* Gut Box */}
          <rect x="35" y="152" width="250" height="58" rx="12" fill="#059669" />
          <text x="160" y="173" textAnchor="middle" className="text-[11.5px] font-bold fill-white">腸道「第二大腦」（5 億神經元 ＋ 100 兆腸道菌）</text>
          <text x="160" y="190" textAnchor="middle" className="text-[9.5px] fill-emerald-100">合成全身 90% 血清素（5-HT）· 駐守 70% 免疫細胞</text>
          <text x="160" y="203" textAnchor="middle" className="text-[9px] fill-emerald-200">膳食纖維 → 好菌發酵產生「丁酸 (Butyrate)」修補腸黏膜屏障</text>
        </svg>
      </div>
    </div>
  </div>
);

// ── 2. GERD LES Mechanism & Los Angeles Classification Figure ────────────────
export const GerdLesAndBarrettFigure: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
      {/* Normal LES */}
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[13px] font-bold text-emerald-900 dark:text-emerald-300">1. 正常賁門括約肌 (LES)</span>
          <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold">單向閥緊閉</span>
        </div>
        <svg viewBox="0 0 200 140" className="w-full h-auto" role="img" aria-label="正常下食道括約肌緊閉防止胃酸逆流">
          <path d="M88 12 L88 62 M112 12 L112 62" stroke="#fda4af" strokeWidth="6" strokeLinecap="round" />
          {/* Diaphragm & tight LES */}
          <path d="M40 58 Q70 50 86 58 M114 58 Q130 50 160 58" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
          <circle cx="88" cy="58" r="6" fill="#059669" />
          <circle cx="112" cy="58" r="6" fill="#059669" />
          {/* Stomach with acid */}
          <path d="M88 62 C60 68, 52 115, 92 126 C128 134, 152 108, 136 74 C128 62, 116 62, 112 62" fill="#fee2e2" stroke="#f43f5e" strokeWidth="3" />
          <path d="M66 96 Q100 92 134 96 C136 116, 118 128, 92 125 C68 120, 64 108, 66 96 Z" fill="#fbbf24" opacity="0.8" />
          <text x="100" y="114" textAnchor="middle" className="text-[10px] font-bold fill-amber-950">胃酸留在胃內</text>
          <text x="100" y="42" textAnchor="middle" className="text-[9.5px] font-bold fill-emerald-700 dark:fill-emerald-400">閥門緊閉</text>
        </svg>
      </div>

      {/* Relaxed LES & Acid Reflux */}
      <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/40 dark:bg-rose-950/20 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[13px] font-bold text-rose-900 dark:text-rose-300">2. 括約肌鬆弛與逆流</span>
          <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">火燒心／酸水</span>
        </div>
        <svg viewBox="0 0 200 140" className="w-full h-auto" role="img" aria-label="下食道括約肌鬆弛導致胃酸向上逆流灼傷食道">
          <path d="M82 12 L82 62 M118 12 L118 62" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
          {/* Open LES */}
          <path d="M40 58 Q65 52 80 58 M120 58 Q135 52 160 58" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 2" />
          {/* Stomach full & reflux arrow */}
          <path d="M82 62 C55 68, 48 115, 92 126 C132 134, 156 108, 138 72 C130 62, 122 62, 118 62" fill="#fecdd3" stroke="#e11d48" strokeWidth="3" />
          <path d="M60 84 Q100 80 140 84 C142 114, 120 128, 92 125 C64 120, 58 102, 60 84 Z" fill="#f59e0b" opacity="0.85" />
          <path d="M100 92 L100 26" stroke="#dc2626" strokeWidth="4" />
          <polygon points="100,18 93,30 107,30" fill="#dc2626" />
          <text x="100" y="112" textAnchor="middle" className="text-[9.5px] font-bold fill-amber-950">甜食/油炸/宵夜平躺</text>
        </svg>
      </div>

      {/* Left Lateral Elevated Posture */}
      <div className="rounded-xl border border-sky-200 dark:border-sky-800/60 bg-sky-50/40 dark:bg-sky-950/20 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[13px] font-bold text-sky-900 dark:text-sky-300">3. 夜間防逆流黃金睡姿</span>
          <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 font-semibold">左側睡＋墊高床頭</span>
        </div>
        <svg viewBox="0 0 200 140" className="w-full h-auto" role="img" aria-label="左側躺與床頭墊高15至20公分讓胃大彎朝下、食道出口高於胃酸液面">
          {/* Wedge pillow */}
          <polygon points="20,108 175,108 175,62" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
          <text x="128" y="100" className="text-[9.5px] font-bold fill-sky-900">楔形枕墊高 15–20cm</text>
          {/* Stomach positioned below esophagus in Left Lateral Decubitus */}
          <ellipse cx="88" cy="84" rx="28" ry="16" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
          <path d="M112 76 L152 54" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          <text x="88" y="87" textAnchor="middle" className="text-[9px] font-bold fill-amber-950">胃袋居下</text>
          <text x="140" y="45" textAnchor="middle" className="text-[9.5px] font-bold fill-sky-800 dark:fill-sky-300">食道口高於胃酸液面</text>
        </svg>
      </div>
    </div>

    {/* Los Angeles Classification & Barrett's Esophagus Strip */}
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">胃鏡「洛杉磯食道炎分級（LA Grade A–D）」與巴瑞特氏食道演進</span>
        <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">Grade C/D 與巴瑞特氏食道需規律內視鏡追蹤</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11.5px]">
        <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-emerald-700 dark:text-emerald-400">LA Grade A</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">黏膜破損 ≤ 5 mm，未跨越兩條黏膜皺摺頂端（輕度）</p>
        </div>
        <div className="rounded-lg border border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-sky-700 dark:text-sky-400">LA Grade B</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">黏膜破損 &gt; 5 mm，但彼此未互相融合</p>
        </div>
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-amber-700 dark:text-amber-400">LA Grade C</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">破損跨越皺摺融合，但小於食道圓周 75%（重度）</p>
        </div>
        <div className="rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900 p-2">
          <p className="font-bold text-rose-700 dark:text-rose-400">LA Grade D</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">潰瘍破損環繞食道圓周 ≥ 75%，易併發食道狹窄</p>
        </div>
        <div className="rounded-lg border-2 border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 p-2 col-span-2 sm:col-span-1">
          <p className="font-bold text-purple-800 dark:text-purple-300">巴瑞特氏食道</p>
          <p className="text-slate-600 dark:text-slate-400 mt-0.5">鱗狀上皮化生為鮭魚紅柱狀上皮（食道腺癌前病變）</p>
        </div>
      </div>
    </div>
  </div>
);

// ── 3. Correa Gastric Cancer Cascade & C13-UBT Figure ────────────────────────
export const CorreaCascadeAndHpFigure: React.FC = () => (
  <div className="space-y-4">
    <svg viewBox="0 0 680 185" className="w-full h-auto" role="img" aria-label="幽門螺旋桿菌 Correa 胃癌致病瀑布五階段與除菌黃金攔截點">
      <rect x="4" y="4" width="672" height="177" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {[
        { x: 18, title: '1. 正常胃黏膜', sub: '胃酸屏障完整', color: '#10b981', bg: '#ecfdf5' },
        { x: 148, title: '2. 慢性表淺性胃炎', sub: 'H. pylori 鑽入黏液層', color: '#0ea5e9', bg: '#f0f9ff' },
        { x: 278, title: '3. 萎縮性胃炎', sub: '胃腺體流失、胃酸減少', color: '#f59e0b', bg: '#fffbeb' },
        { x: 408, title: '4. 腸上皮化生 / 異生', sub: '胃細胞變腸細胞 (不可逆點)', color: '#f97316', bg: '#fff7ed' },
        { x: 538, title: '5. 腸型胃腺癌', sub: '85–90% 歸因於幽門桿菌', color: '#e11d48', bg: '#fff1f2' },
      ].map((step, idx) => (
        <g key={step.title}>
          <rect x={step.x} y="24" width="120" height="82" rx="10" fill={step.bg} stroke={step.color} strokeWidth="2.5" />
          <text x={step.x + 60} y="52" textAnchor="middle" className="text-[11px] font-bold" fill="#0f172a">{step.title}</text>
          <text x={step.x + 60} y="72" textAnchor="middle" className="text-[9.5px]" fill="#334155">{step.sub}</text>
          {idx < 4 && (
            <path d={`M${step.x + 122} 65 L${step.x + 145} 65`} stroke="#64748b" strokeWidth="2.5" markerEnd="url(#hp-arrow)" />
          )}
        </g>
      ))}
      <defs>
        <marker id="hp-arrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill="#64748b" />
        </marker>
      </defs>

      {/* Golden Interception Bracket */}
      <path d="M148 118 L148 132 L398 132 L398 118" fill="none" stroke="#059669" strokeWidth="3" />
      <rect x="165" y="138" width="220" height="32" rx="8" fill="#059669" />
      <text x="275" y="158" textAnchor="middle" className="text-[11px] font-bold fill-white">★ 黃金除菌攔截期：胃癌風險大降 50%+</text>

      {/* Late Stage Warning Bracket */}
      <path d="M408 118 L408 132 L658 132 L658 118" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="4 2" />
      <rect x="415" y="138" width="238" height="32" rx="8" fill="#be123c" />
      <text x="534" y="158" textAnchor="middle" className="text-[10.5px] font-bold fill-white">除菌後仍需每 1–3 年胃鏡追蹤防早期癌</text>
    </svg>
  </div>
);

// ── 4. IBS FODMAP Osmotic & Fermentation Mechanism Figure ────────────────────
export const IbsFodmapMechanismFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 660 190" className="w-full h-auto" role="img" aria-label="高FODMAP食物在小腸吸水與在大腸發酵產氣引發腸躁症腹痛的機轉及三階段飲食法">
      <rect x="4" y="4" width="652" height="182" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* Step 1: Small Intestine Osmotic Effect */}
      <rect x="18" y="20" width="195" height="92" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="115" y="42" textAnchor="middle" className="text-[11.5px] font-bold fill-sky-950">① 小腸：高滲透壓吸水效應</text>
      <text x="115" y="62" textAnchor="middle" className="text-[9.5px] fill-sky-900">FODMAP 短鏈醣類小腸難以吸收</text>
      <text x="115" y="78" textAnchor="middle" className="text-[9.5px] fill-sky-900">像海綿一樣把大量水分拉進腸腔</text>
      <text x="115" y="96" textAnchor="middle" className="text-[10px] font-bold fill-sky-700">→ 腸腔水腫、水瀉、腹鳴</text>

      {/* Step 2: Colon Bacterial Fermentation */}
      <rect x="232" y="20" width="195" height="92" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="330" y="42" textAnchor="middle" className="text-[11.5px] font-bold fill-amber-950">② 大腸：細菌快速發酵產氣</text>
      <text x="330" y="62" textAnchor="middle" className="text-[9.5px] fill-amber-900">未吸收醣類湧入大腸被細菌發酵</text>
      <text x="330" y="78" textAnchor="middle" className="text-[9.5px] fill-amber-900">瞬間產生大量 H₂、CH₄、CO₂ 氣體</text>
      <text x="330" y="96" textAnchor="middle" className="text-[10px] font-bold fill-amber-800">→ 腸管劇烈撐大、嚴重腹脹</text>

      {/* Step 3: Visceral Hypersensitivity */}
      <rect x="446" y="20" width="195" height="92" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
      <text x="543" y="42" textAnchor="middle" className="text-[11.5px] font-bold fill-rose-950">③ 腦腸軸：內臟神經超敏感</text>
      <text x="543" y="62" textAnchor="middle" className="text-[9.5px] fill-rose-900">一般人無感的腸壁擴張</text>
      <text x="543" y="78" textAnchor="middle" className="text-[9.5px] fill-rose-900">在 IBS 患者被腦腸神經放大數倍</text>
      <text x="543" y="96" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">→ 陣發性絞痛（排便後緩解）</text>

      {/* Bottom 3-Phase Low FODMAP Protocol Bar */}
      <rect x="18" y="124" width="623" height="48" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
      <text x="330" y="143" textAnchor="middle" className="text-[11px] font-bold fill-emerald-950">
        Monash 大學「低 FODMAP 三階段實證流程」（切勿終生嚴格禁食，以免好菌餓死！）
      </text>
      <text x="330" y="161" textAnchor="middle" className="text-[10px] fill-emerald-800">
        第1階段：嚴格替換期（僅限 2–6 週） ➔ 第2階段：單一類別重新引入測試（6–8 週抓真兇） ➔ 第3階段：個人化長期飲食
      </text>
    </svg>
  </div>
);

// ── 5. IBD: Ulcerative Colitis vs Crohn's Disease Figure ─────────────────────
export const IbdUcVsCdFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Ulcerative Colitis */}
    <div className="rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/30 dark:bg-rose-950/20 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-rose-950 dark:text-rose-200">潰瘍性結腸炎 (Ulcerative Colitis, UC)</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-semibold">直腸往上 · 連續表層</span>
      </div>
      <svg viewBox="0 0 280 160" className="w-full h-auto" role="img" aria-label="潰瘍性結腸炎：從直腸開始往上連續性侵犯大腸黏膜表層">
        <rect x="6" y="6" width="268" height="148" rx="10" fill="currentColor" className="text-white/80 dark:text-slate-900/70" />
        {/* Colon Outline */}
        <path d="M55 130 L55 45 L180 45 L180 120 L130 120 L130 142" fill="none" stroke="#cbd5e1" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
        {/* Continuous inflammation from rectum up */}
        <path d="M180 45 L180 120 L130 120 L130 142" fill="none" stroke="#e11d48" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <text x="85" y="85" className="text-[10px] font-bold fill-rose-700 dark:fill-rose-400">連續性黏膜發炎</text>
        <text x="85" y="100" className="text-[9.5px] fill-slate-600 dark:fill-slate-400">必從「直腸」開始向上蔓延</text>
        {/* Cross section box */}
        <rect x="198" y="34" width="68" height="106" rx="8" fill="#fff1f2" stroke="#fda4af" />
        <text x="232" y="52" textAnchor="middle" className="text-[9.5px] font-bold fill-rose-900">腸壁深度</text>
        <rect x="208" y="62" width="48" height="14" fill="#e11d48" />
        <text x="232" y="72" textAnchor="middle" className="text-[8.5px] font-bold fill-white">僅黏膜表層</text>
        <rect x="208" y="76" width="48" height="16" fill="#fecdd3" />
        <rect x="208" y="92" width="48" height="18" fill="#e2e8f0" />
        <text x="232" y="126" textAnchor="middle" className="text-[8.5px] font-bold fill-rose-800">典型：黏液血便</text>
      </svg>
    </div>

    {/* Crohn's Disease */}
    <div className="rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/30 dark:bg-amber-950/20 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-amber-950 dark:text-amber-200">克隆氏症 (Crohn's Disease, CD)</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-semibold">跳躍病灶 · 全層侵犯</span>
      </div>
      <svg viewBox="0 0 280 160" className="w-full h-auto" role="img" aria-label="克隆氏症：跳躍式病灶侵犯口腔至肛門且穿透腸壁全層">
        <rect x="6" y="6" width="268" height="148" rx="10" fill="currentColor" className="text-white/80 dark:text-slate-900/70" />
        {/* Colon & Terminal Ileum Outline */}
        <path d="M55 130 L55 45 L180 45 L180 120 L130 120 L130 142" fill="none" stroke="#cbd5e1" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
        {/* Skip lesions */}
        <path d="M55 128 L55 102" stroke="#d97706" strokeWidth="15" strokeLinecap="round" />
        <path d="M100 45 L138 45" stroke="#d97706" strokeWidth="15" strokeLinecap="round" />
        <path d="M180 80 L180 110" stroke="#d97706" strokeWidth="15" strokeLinecap="round" />
        <text x="76" y="82" className="text-[10px] font-bold fill-amber-800 dark:fill-amber-400">跳躍式病灶 (Skip lesions)</text>
        <text x="76" y="97" className="text-[9px] fill-slate-600 dark:fill-slate-400">好發末端迴腸與全消化道</text>
        {/* Cross section box */}
        <rect x="198" y="34" width="68" height="106" rx="8" fill="#fffbeb" stroke="#fcd34d" />
        <text x="232" y="52" textAnchor="middle" className="text-[9.5px] font-bold fill-amber-900">腸壁深度</text>
        <rect x="208" y="62" width="48" height="48" fill="#d97706" />
        <text x="232" y="88" textAnchor="middle" className="text-[8.5px] font-bold fill-white">全層穿透發炎</text>
        <text x="232" y="126" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-900">易狹窄/廔管/穿孔</text>
      </svg>
    </div>
  </div>
);

// ── 6. Colorectal Adenoma-Carcinoma Sequence & Polypectomy Figure ────────────
export const AdenomaCarcinomaSequenceFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 190" className="w-full h-auto" role="img" aria-label="大腸腺瘤到癌變5至10年演進序列與內視鏡息肉切除阻斷示意圖">
      <rect x="4" y="4" width="672" height="182" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* Base colonic wall */}
      <rect x="24" y="132" width="632" height="22" rx="6" fill="#fda4af" />
      <rect x="24" y="154" width="632" height="16" rx="4" fill="#f43f5e" opacity="0.6" />
      <text x="58" y="147" className="text-[10px] font-bold fill-rose-950">黏膜層 (Mucosa)</text>
      <text x="58" y="165" className="text-[9.5px] font-bold fill-white">黏膜下層與肌肉層（血管淋巴通道）</text>

      {/* Stage 1: Normal */}
      <circle cx="80" cy="126" r="6" fill="#10b981" />
      <text x="80" y="95" textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">1. 正常黏膜</text>

      {/* Stage 2: Small Tubular Adenoma */}
      <path d="M195 132 C195 104, 225 104, 225 132 Z" fill="#f59e0b" />
      <text x="210" y="78" textAnchor="middle" className="text-[11px] font-bold fill-amber-700 dark:fill-amber-400">2. 小型腺瘤 (&lt;1cm)</text>
      <text x="210" y="94" textAnchor="middle" className="text-[9.5px] fill-slate-600 dark:fill-slate-400">APC 基因突變</text>

      {/* Stage 3: Advanced Adenoma + Snare Polypectomy */}
      <path d="M352 132 L352 108 C335 102, 335 72, 360 72 C385 72, 385 102, 368 108 L368 132 Z" fill="#ea580c" />
      {/* Endoscopic Snare Loop */}
      <ellipse cx="360" cy="112" rx="22" ry="6" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 2" />
      <line x1="382" y1="112" x2="425" y2="85" stroke="#0284c7" strokeWidth="3" />
      <rect x="292" y="18" width="145" height="44" rx="8" fill="#0284c7" />
      <text x="364" y="36" textAnchor="middle" className="text-[10.5px] font-bold fill-white">3. 進階大腺瘤 (≥1cm)</text>
      <text x="364" y="52" textAnchor="middle" className="text-[9.5px] fill-sky-100">★ 大腸鏡通電套環切除即根治！</text>

      {/* Stage 4: Flat SSL */}
      <path d="M475 132 Q505 114 535 132 Z" fill="#a855f7" />
      <text x="505" y="92" textAnchor="middle" className="text-[10.5px] font-bold fill-purple-700 dark:fill-purple-300">鋸齒狀息肉 (SSL)</text>
      <text x="505" y="107" textAnchor="middle" className="text-[9px] fill-slate-600 dark:fill-slate-400">扁平透明需高畫質清腸</text>

      {/* Stage 5: Invasive Carcinoma */}
      <path d="M585 132 C570 92, 635 88, 628 132 L636 166 L580 166 Z" fill="#be123c" />
      <text x="608" y="66" textAnchor="middle" className="text-[11px] font-bold fill-rose-700 dark:fill-rose-400">4. 侵犯性大腸癌</text>
      <text x="608" y="82" textAnchor="middle" className="text-[9.5px] fill-rose-600">KRAS / TP53 突變穿破基底膜</text>
    </svg>
  </div>
);

// ── 7. MASLD Steatosis to Cirrhosis & Weight Loss Reversal Figure ────────────
export const MasldFibrosisProgressionFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 185" className="w-full h-auto" role="img" aria-label="代謝性脂肪肝從單純脂肪變性、脂性肝炎、肝纖維化到肝硬化的演進與減重3-7-10%逆轉階梯">
      <rect x="4" y="4" width="672" height="177" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {[
        { x: 18, title: '正常健康肝臟', sub: '肝細胞脂肪 < 5%', tag: 'F0 無纖維化', color: '#10b981', bg: '#ecfdf5' },
        { x: 150, title: '單純脂肪肝 (MASLD)', sub: '油滴堆積、多無症狀', tag: '減重 ≥3–5% 消脂', color: '#eab308', bg: '#fefce8' },
        { x: 282, title: '脂性肝炎 (MASH)', sub: '肝細胞氣球化發炎壞死', tag: '減重 ≥7% 消退發炎', color: '#f97316', bg: '#fff7ed' },
        { x: 414, title: '肝纖維化 (F1–F3)', sub: '星狀細胞活化結疤', tag: '減重 ≥10% 逆轉纖維化', color: '#e11d48', bg: '#fff1f2' },
        { x: 546, title: '肝硬化 (F4) / 肝癌', sub: '不可逆硬塊與門脈高壓', tag: '每半年超音波篩檢', color: '#881337', bg: '#ffe4e6' },
      ].map((st) => (
        <g key={st.title}>
          <rect x={st.x} y="20" width="120" height="102" rx="10" fill={st.bg} stroke={st.color} strokeWidth="2.5" />
          <text x={st.x + 60} y="44" textAnchor="middle" className="text-[10.5px] font-bold" fill="#0f172a">{st.title}</text>
          <text x={st.x + 60} y="64" textAnchor="middle" className="text-[9px]" fill="#334155">{st.sub}</text>
          <rect x={st.x + 8} y="82" width="104" height="26" rx="6" fill={st.color} />
          <text x={st.x + 60} y="99" textAnchor="middle" className="text-[9px] font-bold fill-white">{st.tag}</text>
        </g>
      ))}
      <rect x="18" y="134" width="516" height="36" rx="8" fill="#059669" />
      <text x="276" y="156" textAnchor="middle" className="text-[11px] font-bold fill-white">
        ← 可逆轉黃金區間：戒含糖飲與果糖 ＋ 地中海飲食 ＋ 有氧與重訓（每週溫和減重 0.5–1 kg）
      </text>
    </svg>
  </div>
);

// ── 8. HBV Nuclear cccDNA vs HCV Cytoplasmic DAA Cure Figure ─────────────────
export const HbvVsHcvViralFigure: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border border-sky-200 dark:border-sky-800/60 bg-sky-50/30 dark:bg-sky-950/20 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-sky-950 dark:text-sky-200">B 型肝炎病毒 (HBV)：細胞核內 cccDNA</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 font-semibold">長期壓制 · 切勿擅停藥</span>
      </div>
      <svg viewBox="0 0 280 145" className="w-full h-auto" role="img" aria-label="B型肝炎病毒在肝細胞核內形成cccDNA共價閉合環狀DNA，口服藥需長期壓制">
        <rect x="10" y="10" width="260" height="125" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="24" y="28" className="text-[10px] font-bold fill-amber-900">肝細胞質 (Cytoplasm)</text>
        <ellipse cx="140" cy="76" rx="76" ry="42" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
        <text x="140" y="54" textAnchor="middle" className="text-[10px] font-bold fill-sky-950">肝細胞核 (Nucleus)</text>
        <circle cx="140" cy="82" r="18" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeDasharray="5 2" />
        <text x="140" y="86" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">cccDNA</text>
        <text x="140" y="128" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-700">Entecavir / TAF 封鎖複製，但核內模板仍在</text>
      </svg>
    </div>

    <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-bold text-emerald-950 dark:text-emerald-200">C 型肝炎病毒 (HCV)：細胞質 RNA 病毒</span>
        <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold">8–12 週 98% 徹底根治</span>
      </div>
      <svg viewBox="0 0 280 145" className="w-full h-auto" role="img" aria-label="C型肝炎RNA病毒僅在細胞質複製，DAA全口服新藥8至12週可98%徹底清除根治">
        <rect x="10" y="10" width="260" height="125" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="24" y="28" className="text-[10px] font-bold fill-emerald-900">肝細胞質（不進入細胞核）</text>
        <ellipse cx="95" cy="76" rx="45" ry="32" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <text x="95" y="80" textAnchor="middle" className="text-[9.5px] font-bold fill-slate-600">細胞核乾淨</text>
        <rect x="155" y="45" width="102" height="62" rx="10" fill="#059669" />
        <text x="206" y="68" textAnchor="middle" className="text-[10.5px] font-bold fill-white">DAA 全口服新藥</text>
        <text x="206" y="84" textAnchor="middle" className="text-[9.5px] fill-emerald-100">健保 100% 全額給付</text>
        <text x="206" y="99" textAnchor="middle" className="text-[9.5px] font-bold fill-amber-300">SVR12 病毒清零！</text>
      </svg>
    </div>
  </div>
);

// ── 9. Cirrhosis Portal Hypertension 4 Complications Figure ──────────────────
export const PortalHypertensionFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 205" className="w-full h-auto" role="img" aria-label="肝硬化門脈高壓四大致命併發症：食道靜脈曲張、腹水、脾腫大血小板低下、肝性腦病變">
      <rect x="4" y="4" width="672" height="197" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* Center Cirrhotic Liver & Portal Vein */}
      <rect x="245" y="66" width="190" height="72" rx="14" fill="#991b1b" stroke="#dc2626" strokeWidth="3" />
      <text x="340" y="94" textAnchor="middle" className="text-[12px] font-bold fill-white">肝硬化 ＋ 門靜脈高壓</text>
      <text x="340" y="114" textAnchor="middle" className="text-[9.5px] fill-rose-200">血流進不了硬化肝臟，向四周逆流</text>
      <text x="340" y="128" textAnchor="middle" className="text-[9px] fill-amber-200">解毒與合成白蛋白功能衰竭</text>

      {/* 1. Esophageal Varices */}
      <rect x="18" y="16" width="195" height="74" rx="10" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
      <text x="115" y="38" textAnchor="middle" className="text-[11px] font-bold fill-rose-900">① 食道與胃靜脈曲張破裂</text>
      <text x="115" y="56" textAnchor="middle" className="text-[9.5px] fill-rose-800">警訊：吐鮮血、解柏油亮黑便</text>
      <text x="115" y="74" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">對策：胃鏡結紮＋乙型阻斷劑、避開魚刺</text>
      <line x1="213" y1="53" x2="245" y2="85" stroke="#e11d48" strokeWidth="2.5" />

      {/* 2. Hepatic Encephalopathy */}
      <rect x="467" y="16" width="195" height="74" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="564" y="38" textAnchor="middle" className="text-[11px] font-bold fill-amber-950">② 肝性腦病變（肝昏迷）</text>
      <text x="564" y="56" textAnchor="middle" className="text-[9.5px] fill-amber-900">警訊：日夜顛倒、手抖、意識混亂</text>
      <text x="564" y="74" textAnchor="middle" className="text-[9px] font-bold fill-amber-800">對策：杜化液維持日解2–3次軟便＋睡前點心</text>
      <line x1="435" y1="85" x2="467" y2="53" stroke="#d97706" strokeWidth="2.5" />

      {/* 3. Ascites & SBP */}
      <rect x="18" y="114" width="195" height="74" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="115" y="136" textAnchor="middle" className="text-[11px] font-bold fill-sky-950">③ 腹水與自發性細菌腹膜炎</text>
      <text x="115" y="154" textAnchor="middle" className="text-[9.5px] fill-sky-900">警訊：腹脹大、腳腫、發燒腹痛</text>
      <text x="115" y="172" textAnchor="middle" className="text-[9px] font-bold fill-sky-800">對策：限鹽 (&lt;5g/日)、每日量體重、利尿劑</text>
      <line x1="213" y1="151" x2="245" y2="118" stroke="#0284c7" strokeWidth="2.5" />

      {/* 4. Splenomegaly & Sarcopenia */}
      <rect x="467" y="114" width="195" height="74" rx="10" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
      <text x="564" y="136" textAnchor="middle" className="text-[11px] font-bold fill-purple-950">④ 脾腫大低血小板 ＋ 肌少症</text>
      <text x="564" y="154" textAnchor="middle" className="text-[9.5px] fill-purple-900">警訊：血小板 &lt; 10–15萬、四肢消瘦</text>
      <text x="564" y="172" textAnchor="middle" className="text-[9px] font-bold fill-purple-800">對策：足量植物與乳製蛋白、禁吃 NSAID</text>
      <line x1="435" y1="118" x2="467" y2="151" stroke="#9333ea" strokeWidth="2.5" />
    </svg>
  </div>
);

// ── 10. Biliary Tree Stones & Charcot Triad Figure ───────────────────────────
export const BiliaryTreeAndCharcotFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 190" className="w-full h-auto" role="img" aria-label="膽結石卡在膽囊管引發急性膽囊炎，與掉入總膽管引發急性膽管炎Charcot三聯徵的解剖差異">
      <rect x="4" y="4" width="672" height="182" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* Gallbladder & Biliary Tree Schematic */}
      <path d="M55 75 C32 45, 95 22, 130 58 C142 70, 145 84, 156 88" fill="#dcfce7" stroke="#16a34a" strokeWidth="3.5" />
      <text x="88" y="62" textAnchor="middle" className="text-[11px] font-bold fill-emerald-950">膽囊</text>
      {/* Stone 1: Cystic Duct */}
      <circle cx="144" cy="78" r="8" fill="#78350f" stroke="#fde047" strokeWidth="2" />
      <text x="144" y="54" textAnchor="middle" className="text-[9.5px] font-bold fill-amber-800">① 卡膽囊管</text>

      {/* Common Hepatic & Common Bile Duct */}
      <path d="M180 24 L180 155" stroke="#15803d" strokeWidth="10" strokeLinecap="round" />
      <path d="M148 82 L180 92" stroke="#15803d" strokeWidth="7" />
      {/* Stone 2: CBD Stone */}
      <circle cx="180" cy="132" r="9" fill="#451a03" stroke="#facc15" strokeWidth="2.5" />
      <text x="115" y="136" className="text-[9.5px] font-bold fill-rose-700">② 掉入總膽管</text>

      {/* Comparison Boxes */}
      <rect x="235" y="20" width="205" height="150" rx="12" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="337" y="44" textAnchor="middle" className="text-[11.5px] font-bold fill-amber-950">① 急性膽囊炎 (Cholecystitis)</text>
      <text x="337" y="66" textAnchor="middle" className="text-[10px] fill-amber-900">• 結石卡死「膽囊管」出口</text>
      <text x="337" y="84" textAnchor="middle" className="text-[10px] fill-amber-900">• 右上腹持續劇痛 &gt; 6 小時</text>
      <text x="337" y="102" textAnchor="middle" className="text-[10px] fill-amber-900">• 按壓右上腹吸氣劇痛 (Murphy sign)</text>
      <text x="337" y="120" textAnchor="middle" className="text-[10px] fill-amber-900">• 發燒、白血球高（通常無深黃疸）</text>
      <rect x="250" y="132" width="175" height="26" rx="6" fill="#d97706" />
      <text x="337" y="149" textAnchor="middle" className="text-[9.5px] font-bold fill-white">處置：抗生素＋腹腔鏡膽囊切除</text>

      <rect x="455" y="20" width="208" height="150" rx="12" fill="#fff1f2" stroke="#e11d48" strokeWidth="2.5" />
      <text x="559" y="44" textAnchor="middle" className="text-[11.5px] font-bold fill-rose-950">② 急性膽管炎 (Cholangitis)</text>
      <text x="559" y="66" textAnchor="middle" className="text-[10px] font-bold fill-rose-800">🚨 Charcot 三聯徵（致命急症）：</text>
      <text x="559" y="84" textAnchor="middle" className="text-[10px] fill-rose-900">1. 右上腹劇痛 ＋ 2. 高燒寒顫</text>
      <text x="559" y="102" textAnchor="middle" className="text-[10px] fill-rose-900">3. 明顯黃疸（眼黃、深茶色尿）</text>
      <text x="559" y="120" textAnchor="middle" className="text-[9.5px] fill-rose-700">※ 若加休克＋意識混亂＝Reynolds五聯徵</text>
      <rect x="470" y="132" width="178" height="26" rx="6" fill="#be123c" />
      <text x="559" y="149" textAnchor="middle" className="text-[9.5px] font-bold fill-white">處置：立即急診 ERCP 內視鏡取石引流</text>
    </svg>
  </div>
);

// ── 11. Acute Pancreatitis Mechanism & Back Radiation Figure ─────────────────
export const PancreatitisMechanismFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 680 175" className="w-full h-auto" role="img" aria-label="急性胰臟炎三大元兇：膽結石、酒精、三酸甘油酯大於500與鑽背劇痛彎腰緩解特徵">
      <rect x="4" y="4" width="672" height="167" rx="14" fill="currentColor" className="text-slate-50 dark:text-slate-900/70" />
      {/* 3 Triggers */}
      <rect x="18" y="18" width="185" height="42" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="110" y="36" textAnchor="middle" className="text-[10.5px] font-bold fill-amber-950">元兇 1：膽結石卡住共同出口</text>
      <text x="110" y="51" textAnchor="middle" className="text-[9px] fill-amber-800">佔 40–50%，胰液逆流無法排出</text>

      <rect x="18" y="68" width="185" height="42" rx="8" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="2" />
      <text x="110" y="86" textAnchor="middle" className="text-[10.5px] font-bold fill-rose-950">元兇 2：高三酸甘油酯血症</text>
      <text x="110" y="101" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">空腹 TG &gt; 500–1,000 mg/dL 塞爆微血管</text>

      <rect x="18" y="118" width="185" height="42" rx="8" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
      <text x="110" y="136" textAnchor="middle" className="text-[10.5px] font-bold fill-purple-950">元兇 3：酒精與暴飲暴食</text>
      <text x="110" y="151" textAnchor="middle" className="text-[9px] fill-purple-800">直接毒害腺泡細胞、濃稠蛋白栓塞</text>

      {/* Center Autodigestion */}
      <rect x="232" y="32" width="205" height="114" rx="12" fill="#dc2626" />
      <text x="334" y="60" textAnchor="middle" className="text-[12px] font-bold fill-white">胰蛋白酶原提早活化</text>
      <text x="334" y="80" textAnchor="middle" className="text-[10.5px] font-bold fill-amber-200">「胰臟自我消化腐蝕」</text>
      <text x="334" y="102" textAnchor="middle" className="text-[9.5px] fill-rose-100">抽血 Lipase / Amylase &gt; 3 倍</text>
      <text x="334" y="120" textAnchor="middle" className="text-[9.5px] fill-rose-100">嚴重者引發全身發炎休克與壞死</text>

      {/* Right Pain Pattern */}
      <rect x="462" y="22" width="200" height="134" rx="12" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
      <text x="562" y="45" textAnchor="middle" className="text-[11px] font-bold fill-rose-950">典型臨床警訊（3 取 2 確診）</text>
      <text x="562" y="68" textAnchor="middle" className="text-[10px] fill-rose-900">• 上腹刀割劇痛「像鑽子往背後刺」</text>
      <text x="562" y="86" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">• 平躺更痛，身體前傾抱膝才稍緩</text>
      <text x="562" y="104" textAnchor="middle" className="text-[10px] fill-rose-900">• 劇烈噁心嘔吐，吐完依然劇痛</text>
      <text x="562" y="126" textAnchor="middle" className="text-[9.5px] font-bold fill-emerald-800">★ 現代照護：點滴輸液＋不痛即儘早低脂進食</text>
    </svg>
  </div>
);

// ── 12. Bristol Stool Chart & Split-Dose Bowel Prep Figure ───────────────────
export const BristolStoolAndAbdominalGridFigure: React.FC = () => (
  <div className="space-y-4">
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <span className="text-[13px] font-bold text-slate-900 dark:text-white">布里斯托大便分類法（Bristol Stool Scale 1–7 型）視覺對照</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold">第 3–4 型為黃金健康便型</span>
      </div>
      <svg viewBox="0 0 680 125" className="w-full h-auto" role="img" aria-label="布里斯托大便分類法第1型至第7型視覺圖譜">
        {[
          { x: 10, t: '第1型', desc: '羊便硬球', tag: '嚴重便秘', c: '#b45309', bg: '#fef3c7' },
          { x: 105, t: '第2型', desc: '凹凸硬條', tag: '輕度便秘', c: '#d97706', bg: '#fef3c7' },
          { x: 200, t: '第3型', desc: '裂紋香腸', tag: '★ 正常健康', c: '#059669', bg: '#ecfdf5' },
          { x: 295, t: '第4型', desc: '光滑香蕉', tag: '★ 黃金標準', c: '#047857', bg: '#d1fae5' },
          { x: 390, t: '第5型', desc: '柔軟小塊', tag: '偏軟缺纖維', c: '#0284c7', bg: '#e0f2fe' },
          { x: 485, t: '第6型', desc: '蓬鬆泥糊', tag: '輕度腹瀉', c: '#ea580c', bg: '#ffedd5' },
          { x: 580, t: '第7型', desc: '完全水狀', tag: '重度水瀉/清腸', c: '#e11d48', bg: '#ffe4e6' },
        ].map((b, i) => (
          <g key={b.t}>
            <rect x={b.x} y="8" width="88" height="108" rx="10" fill={b.bg} stroke={b.c} strokeWidth="2" />
            <text x={b.x + 44} y="26" textAnchor="middle" className="text-[11px] font-bold" fill={b.c}>{b.t}</text>
            {/* Stool Shape Illustration */}
            {i === 0 && (
              <g fill="#78350f">
                <circle cx={b.x + 26} cy="52" r="6" />
                <circle cx={b.x + 44} cy="48" r="6.5" />
                <circle cx={b.x + 62} cy="54" r="6" />
                <circle cx={b.x + 36} cy="64" r="6" />
                <circle cx={b.x + 54} cy="65" r="5.5" />
              </g>
            )}
            {i === 1 && (
              <g fill="#78350f">
                <circle cx={b.x + 26} cy="56" r="9" />
                <circle cx={b.x + 40} cy="55" r="10" />
                <circle cx={b.x + 54} cy="56" r="9.5" />
                <circle cx={b.x + 66} cy="57" r="8" />
              </g>
            )}
            {i === 2 && (
              <g>
                <rect x={b.x + 16} y="47" width="56" height="18" rx="9" fill="#92400e" />
                <path d={`M${b.x + 28} 48 L${b.x + 32} 56 M${b.x + 46} 47 L${b.x + 44} 57 M${b.x + 58} 49 L${b.x + 60} 58`} stroke="#fef3c7" strokeWidth="1.5" />
              </g>
            )}
            {i === 3 && (
              <path d={`M${b.x + 16} 60 Q${b.x + 44} 42 ${b.x + 72} 60`} fill="none" stroke="#92400e" strokeWidth="14" strokeLinecap="round" />
            )}
            {i === 4 && (
              <g fill="#a16207">
                <ellipse cx={b.x + 26} cy="54" rx="9" ry="6" />
                <ellipse cx={b.x + 46} cy="58" rx="10" ry="6.5" />
                <ellipse cx={b.x + 64} cy="52" rx="8" ry="5.5" />
              </g>
            )}
            {i === 5 && (
              <path d={`M${b.x + 16} 60 C${b.x + 24} 44, ${b.x + 64} 44, ${b.x + 72} 60 C${b.x + 66} 70, ${b.x + 22} 70, ${b.x + 16} 60 Z`} fill="#ca8a04" opacity="0.85" />
            )}
            {i === 6 && (
              <g>
                <rect x={b.x + 16} y="46" width="56" height="22" rx="6" fill="#fde047" opacity="0.8" stroke="#eab308" />
                <text x={b.x + 44} y="61" textAnchor="middle" className="text-[8.5px] font-bold fill-amber-950">清澈淡黃水狀</text>
              </g>
            )}
            <text x={b.x + 44} y="86" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">{b.desc}</text>
            <text x={b.x + 44} y="103" textAnchor="middle" className="text-[9px] font-semibold" fill={b.c}>{b.tag}</text>
          </g>
        ))}
      </svg>
    </div>
  </div>
);
