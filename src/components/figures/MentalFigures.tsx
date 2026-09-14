import React, { useState } from 'react';
import { ShieldAlert, Info, AlertTriangle, CheckCircle2, Activity, Heart, Wind } from 'lucide-react';

/**
 * ── 實證心理健康與呼吸神經生理醫學向量圖解組件 (Mental & Breathwork Figures) ──
 * 包含：
 * 1. FIG-M-01-01: 生理嘆氣（雙吸單呼）肺泡表面活性劑重整與迷走神經降率圖
 * 2. FIG-M-02-01: 自律神經天平 (交感 SNS vs 副交感 PNS) 與迷走神經煞車
 * 3. FIG-M-03-01: 0.1 Hz 共振呼吸三頻同步 (心率、血壓邁爾波、胸腔呼吸)
 * 4. FIG-M-04-01: 波耳效應與過度換氣大腦低灌流惡性循環圖
 * 5. FIG-M-05-01: 急性驚恐發作 vs 心肺急症鑑別分流決策樹
 */

// ── FIG-M-01-01: 雙吸單呼肺泡復張機制 ──
export const FigAlveolarSigh: React.FC = () => {
  const [phase, setPhase] = useState<'normal' | 'collapsed' | 'double_inhale' | 'reinflated'>('double_inhale');

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
            FIG-M-01-01 · 肺泡微力學機制圖
          </span>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
            生理嘆氣 (Cyclic Sighing) 肺泡表面活性劑重整與復張動態
          </h4>
        </div>
        <div className="flex gap-1.5 font-mono text-[11px]">
          <button
            onClick={() => setPhase('collapsed')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              phase === 'collapsed' ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            1. 淺呼吸肺泡塌縮
          </button>
          <button
            onClick={() => setPhase('double_inhale')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              phase === 'double_inhale' ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            2. 第二段補吸復張
          </button>
          <button
            onClick={() => setPhase('reinflated')}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              phase === 'reinflated' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            3. 慢呼氣迷走煞車
          </button>
        </div>
      </div>

      {/* SVG Diagram */}
      <div className="relative w-full aspect-[2/1] max-h-72 flex items-center justify-center bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 overflow-hidden">
        <svg viewBox="0 0 600 280" className="w-full h-full select-none font-sans">
          <defs>
            <radialGradient id="alveolusGradNormal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.8" />
            </radialGradient>
            <radialGradient id="alveolusGradCollapsed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="alveolusGradPop" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Bronchiole pipe */}
          <path d="M 120 40 L 220 120 L 220 150" stroke="#94A3B8" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M 220 120 L 320 80" stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M 220 150 L 160 210" stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M 220 150 L 280 220" stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* Left Alveolus Cluster */}
          <g transform="translate(130, 210)">
            <circle cx="0" cy="0" r="32" fill="url(#alveolusGradNormal)" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">正常肺泡</text>
            <circle cx="0" cy="0" r="36" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          </g>

          {/* Center Target Alveolus (Morphs with state) */}
          <g transform="translate(280, 220)">
            {phase === 'collapsed' && (
              <>
                <ellipse cx="0" cy="0" rx="18" ry="12" fill="url(#alveolusGradCollapsed)" />
                <path d="M -12 -5 Q 0 2 12 -5" stroke="#78350F" strokeWidth="2" fill="none" />
                <text x="0" y="24" textAnchor="middle" fill="#D97706" fontSize="10" fontWeight="bold">微小肺不張 (塌陷)</text>
                <text x="0" y="36" textAnchor="middle" fill="#64748B" fontSize="9">表面張力過高 P=2T/r</text>
              </>
            )}
            {phase === 'double_inhale' && (
              <>
                <circle cx="0" cy="0" r="44" fill="url(#alveolusGradPop)" className="animate-pulse" />
                <circle cx="0" cy="0" r="50" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="4 2" />
                <text x="0" y="2" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">強迫補吸復張！</text>
                <text x="0" y="16" textAnchor="middle" fill="#ECFDF5" fontSize="9">表面活性劑重新鋪展</text>
                {/* Outward pressure arrows */}
                <path d="M 0 -22 L 0 -38 M 0 -38 L -4 -32 M 0 -38 L 4 -32" stroke="#10B981" strokeWidth="2" />
                <path d="M 0 22 L 0 38 M 0 38 L -4 32 M 0 38 L 4 32" stroke="#10B981" strokeWidth="2" />
                <path d="M -22 0 L -38 0 M -38 0 L -32 -4 M -38 0 L -32 4" stroke="#10B981" strokeWidth="2" />
                <path d="M 22 0 L 38 0 M 38 0 L 32 -4 M 38 0 L 32 4" stroke="#10B981" strokeWidth="2" />
              </>
            )}
            {phase === 'reinflated' && (
              <>
                <circle cx="0" cy="0" r="38" fill="url(#alveolusGradNormal)" />
                <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">完全充盈</text>
                <text x="0" y="28" textAnchor="middle" fill="#0284C7" fontSize="10" fontWeight="bold">氣血交換面積極大化</text>
              </>
            )}
          </g>

          {/* Vagus Nerve & Heart Representation */}
          <g transform="translate(460, 130)">
            <rect x="-80" y="-80" width="160" height="170" rx="16" fill="currentColor" className="text-slate-100 dark:text-slate-900 border" stroke="#CBD5E1" strokeWidth="1" />
            <text x="0" y="-60" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">副交感迷走神經傳導</text>
            
            {/* Heart Icon */}
            <path
              d="M 0 -20 C -20 -40 -40 -10 0 30 C 40 -10 20 -40 0 -20 Z"
              fill={phase === 'reinflated' ? '#10B981' : phase === 'double_inhale' ? '#06B6D4' : '#EF4444'}
              className="transition-colors duration-500"
            />
            <text x="0" y="52" textAnchor="middle" fill="currentColor" className="text-slate-800 dark:text-slate-200" fontSize="11" fontWeight="bold">
              {phase === 'reinflated' ? '心率：58 bpm (迷走煞車)' : phase === 'double_inhale' ? '心率：72 bpm (吸氣暫緩)' : '心率：95 bpm (交感亢奮)'}
            </text>
            <text x="0" y="68" textAnchor="middle" fill="#64748B" fontSize="9">
              {phase === 'reinflated' ? '乙醯膽鹼釋放於竇房結' : '肺牽張受體啟動反饋'}
            </text>
          </g>

          {/* Explanatory Annotations */}
          <path d="M 280 160 Q 380 90 410 110" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 3" fill="none" />
        </svg>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
        <strong className="text-cyan-700 dark:text-cyan-400 font-mono">生化機轉解析：</strong>
        淺快胸式呼吸使呼氣末期肺泡壁水分子的表面張力過高，小肺泡傾向塌陷（Laplace 定律 P = 2T / r）。
        生理嘆氣透過「第1次大吸氣 + 第2次補吸」，產生充足跨肺壓將萎縮肺泡強行復張，使表面活性劑重新鋪平；隨後的 6 秒緩慢吐氣刺激感壓受器，釋放乙醯膽鹼減慢心率。
      </div>
    </div>
  );
};

// ── FIG-M-02-01: 自律神經天平與迷走神經煞車 ──
export const FigAutonomicBalance: React.FC = () => {
  const [balanceRatio, setBalanceRatio] = useState<number>(50); // 0: fully PNS, 100: fully SNS

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
            FIG-M-02-01 · 自律神經動力學模型
          </span>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
            自律神經天平 (SNS vs PNS) 與迷走神經煞車切換機制
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBalanceRatio(85)}
            className="px-2 py-1 rounded text-xs font-mono bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200"
          >
            模擬急性壓力 (交感佔優)
          </button>
          <button
            onClick={() => setBalanceRatio(20)}
            className="px-2 py-1 rounded text-xs font-mono bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200"
          >
            模擬長呼氣 (副交感煞車)
          </button>
        </div>
      </div>

      {/* Dynamic Seesaw Graphic */}
      <div className="relative w-full aspect-[2.2/1] max-h-72 flex items-center justify-center bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 overflow-hidden">
        <svg viewBox="0 0 600 260" className="w-full h-full select-none font-sans">
          {/* Fulcrum (Base) */}
          <polygon points="300,160 270,220 330,220" fill="#64748B" />
          <circle cx="300" cy="160" r="8" fill="#475569" />
          <text x="300" y="240" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="bold">延腦自律神經調節中樞 (NTS)</text>

          {/* Lever Bar rotated by ratio */}
          {/* balanceRatio: 50 is level, 100 is tilt left-up/right-down (SNS heavy) */}
          {(() => {
            const angle = ((balanceRatio - 50) / 50) * 14; // -14 to +14 deg
            return (
              <g transform={`rotate(${angle}, 300, 160)`} className="transition-transform duration-500">
                {/* Bar */}
                <rect x="70" y="154" width="460" height="12" rx="6" fill="#334155" />

                {/* Left Pan: PNS (副交感 / 迷走神經) */}
                <g transform="translate(120, 160)">
                  <line x1="0" y1="0" x2="0" y2="40" stroke="#10B981" strokeWidth="3" />
                  <ellipse cx="0" cy="40" rx="45" ry="10" fill="#10B981" opacity="0.3" />
                  <rect x="-40" y="-15" width="80" height="50" rx="10" fill="#059669" />
                  <text x="0" y="8" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">副交感 PNS</text>
                  <text x="0" y="24" textAnchor="middle" fill="#A7F3D0" fontSize="9">迷走煞車 / 乙醯膽鹼</text>
                </g>

                {/* Right Pan: SNS (交感神經) */}
                <g transform="translate(480, 160)">
                  <line x1="0" y1="0" x2="0" y2="40" stroke="#EF4444" strokeWidth="3" />
                  <ellipse cx="0" cy="40" rx="45" ry="10" fill="#EF4444" opacity="0.3" />
                  <rect x="-40" y="-15" width="80" height="50" rx="10" fill="#DC2626" />
                  <text x="0" y="8" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">交感 SNS</text>
                  <text x="0" y="24" textAnchor="middle" fill="#FECACA" fontSize="9">戰逃反應 / 去甲腎上腺素</text>
                </g>
              </g>
            );
          })()}

          {/* Physiological consequence badges */}
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="160" height="60" rx="8" fill="currentColor" className="text-emerald-50 dark:text-emerald-950/40 border" stroke="#10B981" />
            <text x="10" y="20" fill="#059669" fontSize="10" fontWeight="bold">副交感優勢效益：</text>
            <text x="10" y="36" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9">• 心率減慢、血管舒張降壓</text>
            <text x="10" y="50" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9">• 唾液腺與胃腸蠕動重啟</text>
          </g>

          <g transform="translate(380, 40)">
            <rect x="0" y="0" width="160" height="60" rx="8" fill="currentColor" className="text-red-50 dark:text-red-950/40 border" stroke="#EF4444" />
            <text x="10" y="20" fill="#DC2626" fontSize="10" fontWeight="bold">交感過度代價：</text>
            <text x="10" y="36" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9">• 瞳孔放大、心跳飆破 100</text>
            <text x="10" y="50" fill="currentColor" className="text-slate-700 dark:text-slate-300" fontSize="9">• 消化道抑制、免疫屏障關閉</text>
          </g>
        </svg>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-slate-500">調節自律神經傾向：</span>
        <input
          type="range"
          min="10"
          max="90"
          value={balanceRatio}
          onChange={(e) => setBalanceRatio(parseInt(e.target.value, 10))}
          className="flex-1 accent-cyan-500 cursor-pointer"
        />
        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[70px]">
          {balanceRatio > 60 ? '交感亢奮' : balanceRatio < 40 ? '副交感主導' : '動態平衡'}
        </span>
      </div>
    </div>
  );
};

// ── FIG-M-03-01: 0.1 Hz 共振呼吸三頻同步 ──
export const FigResonanceCoherence: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
          FIG-M-03-01 · 0.1 Hz 生理共振譜
        </span>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
          0.1 Hz 自律神經共振：呼吸波、心率變異度 (HRV) 與血管邁爾波三位一體
        </h4>
      </div>

      <div className="relative w-full aspect-[2.3/1] max-h-72 flex items-center justify-center bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 overflow-hidden">
        <svg viewBox="0 0 600 240" className="w-full h-full select-none font-sans">
          {/* Time axis */}
          <line x1="60" y1="200" x2="560" y2="200" stroke="#64748B" strokeWidth="1.5" />
          <text x="560" y="215" fill="#64748B" fontSize="10">時間 (秒)</text>
          <text x="60" y="215" fill="#64748B" fontSize="10">0s</text>
          <text x="185" y="215" fill="#64748B" fontSize="10">5.5s (吸末)</text>
          <text x="310" y="215" fill="#64748B" fontSize="10">11.0s (呼末)</text>
          <text x="435" y="215" fill="#64748B" fontSize="10">16.5s (吸末)</text>

          {/* Grid vertical lines (1 cycle = ~11 sec = ~250px) */}
          <line x1="185" y1="20" x2="185" y2="200" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="310" y1="20" x2="310" y2="200" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="435" y1="20" x2="435" y2="200" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

          {/* 1. Respiration Sine Wave (Cyan) */}
          <path
            d="M 60 70 Q 122 30 185 70 T 310 70 T 435 70 T 560 70"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="3.5"
          />
          <text x="70" y="45" fill="#06B6D4" fontSize="11" fontWeight="bold">① 呼吸胸腔波形 (5.5s 吸 / 5.5s 呼)</text>

          {/* 2. Heart Rate Oscillation (RSA, Red/Pink) */}
          <path
            d="M 60 120 Q 122 80 185 120 T 310 120 T 435 120 T 560 120"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="3"
            strokeDasharray="5 2"
          />
          <text x="70" y="98" fill="#F43F5E" fontSize="11" fontWeight="bold">② 心率瞬時波幅 (HRV 振幅極大化)</text>

          {/* 3. Blood Pressure Mayer Waves (Indigo) */}
          <path
            d="M 60 170 Q 122 135 185 170 T 310 170 T 435 170 T 560 170"
            fill="none"
            stroke="#6366F1"
            strokeWidth="2.5"
            strokeDasharray="2 2"
          />
          <text x="70" y="152" fill="#6366F1" fontSize="11" fontWeight="bold">③ 血管邁爾波 (0.1 Hz Mayer Wave)</text>

          {/* Resonance Highlight Indicator */}
          <rect x="175" y="25" width="20" height="175" fill="#10B981" opacity="0.1" rx="4" />
          <text x="185" y="18" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">同頻共振頂峰</text>
        </svg>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
        在常態雜亂呼吸下，這三條生理波形相互干涉、相位抵消；但在每分鐘 5.5 次（0.1 Hz）呼吸時，感壓反射敏感度 (BRS) 暴增 3 倍，三者波峰完全同相疊加，心率變異度 (HRV) 達到人體物理極限。
      </p>
    </div>
  );
};

// ── FIG-M-04-01: 波耳效應與過度換氣惡性循環 ──
export const FigBohrEffectLoop: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
          FIG-M-04-01 · 血氣病理機轉圖
        </span>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
          波耳效應 (Bohr Effect) 與過度換氣大腦低灌流惡性循環
        </h4>
      </div>

      <div className="relative w-full aspect-[2.2/1] max-h-72 flex items-center justify-center bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 overflow-hidden">
        <svg viewBox="0 0 600 240" className="w-full h-full select-none font-sans">
          {/* Circular Flow Nodes */}
          {/* 1. 急性焦慮急喘 */}
          <g transform="translate(100, 50)">
            <circle cx="0" cy="0" r="38" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#991B1B" fontSize="10" fontWeight="bold">① 突發焦慮</text>
            <text x="0" y="8" textAnchor="middle" fill="#DC2626" fontSize="9">急促大口喘氣</text>
          </g>

          {/* Arrow 1 -> 2 */}
          <path d="M 142 50 L 230 50" stroke="#DC2626" strokeWidth="3" markerEnd="url(#arrowRed)" />

          {/* 2. CO2 排空鹼中毒 */}
          <g transform="translate(280, 50)">
            <circle cx="0" cy="0" r="38" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="bold">② PaCO2 驟降</text>
            <text x="0" y="8" textAnchor="middle" fill="#D97706" fontSize="9">呼吸性鹼中毒</text>
          </g>

          {/* Arrow 2 -> 3 */}
          <path d="M 322 50 L 410 50" stroke="#F59E0B" strokeWidth="3" />

          {/* 3. 波耳左移血紅素鎖死 */}
          <g transform="translate(460, 50)">
            <circle cx="0" cy="0" r="38" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#3730A3" fontSize="10" fontWeight="bold">③ 波耳曲線左移</text>
            <text x="0" y="8" textAnchor="middle" fill="#4F46E5" fontSize="9">血紅素牢咬 O2</text>
          </g>

          {/* Arrow 3 -> 4 */}
          <path d="M 460 92 L 460 145" stroke="#6366F1" strokeWidth="3" />

          {/* 4. 腦血管痙攣缺氧 */}
          <g transform="translate(460, 185)">
            <circle cx="0" cy="0" r="38" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#9D174D" fontSize="10" fontWeight="bold">④ 腦血管收縮</text>
            <text x="0" y="8" textAnchor="middle" fill="#DB2777" fontSize="9">腦血流暴跌 40%</text>
          </g>

          {/* Arrow 4 -> 5 */}
          <path d="M 418 185 L 330 185" stroke="#EC4899" strokeWidth="3" />

          {/* 5. 頭暈窒息恐慌加劇 */}
          <g transform="translate(280, 185)">
            <circle cx="0" cy="0" r="38" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
            <text x="0" y="-8" textAnchor="middle" fill="#991B1B" fontSize="10" fontWeight="bold">⑤ 瀕死窒息感</text>
            <text x="0" y="8" textAnchor="middle" fill="#DC2626" fontSize="9">手指發麻痙攣</text>
          </g>

          {/* Loop Arrow 5 -> 1 */}
          <path d="M 238 185 L 140 185 Q 100 185 100 95" stroke="#EF4444" strokeWidth="3" strokeDasharray="4 2" fill="none" />
          <text x="130" y="145" fill="#EF4444" fontSize="10" fontWeight="bold">自激惡性循環！</text>

          {/* Solution Arrow breaking the loop */}
          <g transform="translate(280, 115)">
            <rect x="-85" y="-14" width="170" height="28" rx="8" fill="#10B981" />
            <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
              ✓ 封口純鼻呼吸：立即打破死循環
            </text>
          </g>
        </svg>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
        <strong>臨床除魅：</strong>
        感到窒息不是因為「氧氣不足」（血氧計此時往往高達 99%），而是因為缺少二氧化碳！血液鹼化導致腦血管收縮與波耳效應使氧氣無法釋放。立刻閉上嘴巴、輕柔鼻吸鼻吐，才能把血紅素裡的氧氣「解鎖」送入大腦！
      </div>
    </div>
  );
};

// ── FIG-M-05-01: 恐慌發作 vs 心肺急症鑑別分流樹 ──
export const FigPanicTriageTree: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800">
          FIG-M-05-01 · 臨床安全紅旗分流樹
        </span>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
          急性驚恐發作 (Panic Attack) vs 心血管急症臨床分流鑑別
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Red Flag Emergency (Dial 119) */}
        <div className="p-4 rounded-xl border border-red-300 dark:border-red-800 bg-red-50/70 dark:bg-red-950/30 space-y-3">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
            <span>【一級紅旗急症】立即撥打 119</span>
          </div>
          <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>壓榨性胸痛：</strong>如大石壓胸、胸骨後壓迫感持續超過 5 分鐘。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>放射痛：</strong>疼痛延伸至左肩、左臂內側、下巴或背部肩胛間。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>伴隨症狀：</strong>冒冷汗、臉色死白、咳血、單側下肢急性水腫腫痛。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>神經徵象：</strong>單側手腳無力、嘴歪眼斜、口齒不清 (FAST 中風)。</span>
            </li>
          </ul>
          <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-[11px] text-red-900 dark:text-red-200 font-bold">
            🚨 嚴禁自行駕駛就醫，嚴禁用紙袋套口鼻（若為心肌梗塞，紙袋缺氧可能直接致命）。
          </div>
        </div>

        {/* Right Column: Confirmed Panic Attack Management */}
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>【驚恐發作】正確安撫與呼吸處置</span>
          </div>
          <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>封口鼻呼吸：</strong>閉上嘴巴，用鼻子做慢速輕柔呼吸，防止二氧化碳耗竭。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>箱式或三角呼吸：</strong>吸 3 秒、閉氣 3 秒、嘴呼 6 秒，延長呼氣踩迷走煞車。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>5-4-3-2-1 感官著陸：</strong>尋找周圍 5 個看到的物體、觸摸 4 種材質...轉移杏仁核注意力。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>科學保證：</strong>「這是一場腎上腺素潮水，它會在 10 分鐘內登頂並自然退潮，你絕對是安全的。」</span>
            </li>
          </ul>
          <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-[11px] text-emerald-900 dark:text-emerald-200 font-bold">
            💡 驚恐發作雖極度痛苦但非致命；首次發作無法排除心血管問題者，永遠優先撥打 119。
          </div>
        </div>
      </div>
    </div>
  );
};
