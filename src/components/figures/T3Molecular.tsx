import React, { useState } from 'react';

export const T3Molecular: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'sfa' | 'mufa' | 'pufa' | 'trans'>('mufa');

  return (
    <div className="w-full max-w-2xl space-y-3">
      {/* Interactive switcher */}
      <div className="flex flex-wrap items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs gap-2">
        <span className="font-mono text-slate-300">
          分子碳鏈對比：
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedType('sfa')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              selectedType === 'sfa'
                ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            飽和 SFA (硬脂酸)
          </button>
          <button
            onClick={() => setSelectedType('mufa')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              selectedType === 'mufa'
                ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            單元 MUFA (油酸 C18:1)
          </button>
          <button
            onClick={() => setSelectedType('pufa')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              selectedType === 'pufa'
                ? 'bg-emerald-500 text-black font-bold shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            多元 PUFA (亞麻油酸 C18:2)
          </button>
          <button
            onClick={() => setSelectedType('trans')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              selectedType === 'trans'
                ? 'bg-red-500 text-white font-bold shadow-crimson-glow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            反式 Trans (反油酸)
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 800 420"
        className="w-full h-auto rounded-xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="脂肪酸分子碳鏈立體結構與雙鍵比較"
      >
        <rect width="800" height="420" rx="16" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />

        {/* Top Info Header */}
        <g transform="translate(40, 35)">
          <text x="0" y="22" fill="#F8FAFC" fontSize="18" fontWeight="bold">
            {selectedType === 'sfa' && '飽和脂肪酸 (SFA, C18:0 硬脂酸)'}
            {selectedType === 'mufa' && '單元不飽和脂肪酸 (MUFA, C18:1 順式油酸)'}
            {selectedType === 'pufa' && '多元不飽和脂肪酸 (PUFA, C18:2 順式亞麻油酸)'}
            {selectedType === 'trans' && '反式脂肪酸 (Trans Fatty Acid, 反油酸)'}
          </text>
          <text x="0" y="48" fill="#94A3B8" fontSize="12" fontFamily="monospace">
            {selectedType === 'sfa' && '無雙鍵 · 鋸齒筆直棒狀 · 凡得瓦力緊密貼合 · 室溫固態 (熔點約 69°C)'}
            {selectedType === 'mufa' && '第 9 碳順式雙鍵 (cis-9) · 產生 ~30° 剛性彎折手肘 · 室溫液體 (熔點約 13°C)'}
            {selectedType === 'pufa' && '第 9 與 12 碳雙重彎折 · 高度扭曲無法結晶 · 最易氧化 (熔點約 -5°C)'}
            {selectedType === 'trans' && '人造高溫催化翻轉 · 雙鍵氫分居兩側 · 碳鏈恢復筆直棒狀 · 危害心血管'}
          </text>
        </g>

        {/* Molecular Skeleton Path Render */}
        <g transform="translate(40, 130)">
          {/* Hydrophilic Carboxyl Head (COOH) */}
          <circle cx="40" cy="120" r="24" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
          <text x="40" y="125" fill="#FFFFFF" fontSize="11" textAnchor="middle" fontWeight="bold">COOH</text>
          <text x="40" y="160" fill="#F87171" fontSize="10" textAnchor="middle">親水羧基端</text>

          {/* SFA Straight Chain */}
          {selectedType === 'sfa' && (
            <g>
              <path
                d="M 64 120 L 100 90 L 140 130 L 180 90 L 220 130 L 260 90 L 300 130 L 340 90 L 380 130 L 420 90 L 460 130 L 500 90 L 540 130 L 580 90 L 620 130 L 660 90 L 700 130"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="380" y="180" fill="#FDE68A" fontSize="13" textAnchor="middle" fontWeight="bold">
                17 個碳-碳全單鍵 (C-C)，分子筆直整齊，相鄰分子極易堆疊成固體油脂
              </text>
            </g>
          )}

          {/* MUFA Cis-bent Chain */}
          {selectedType === 'mufa' && (
            <g>
              <path
                d="M 64 120 L 100 90 L 140 130 L 180 90 L 220 130 L 260 90 L 300 130 L 340 90"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Double bond node at C9 with highlight */}
              <circle cx="340" cy="90" r="14" fill="#0E7490" stroke="#22D3EE" strokeWidth="2.5" />
              <text x="340" y="94" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontWeight="bold">C=C</text>
              <text x="340" y="60" fill="#67E8F9" fontSize="11" textAnchor="middle" fontWeight="bold">cis 雙鍵彎折 (~30°)</text>

              {/* Bent tail going downwards */}
              <path
                d="M 340 90 L 385 135 L 415 180 L 460 215 L 490 260 L 535 295 L 565 340"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="460" y="140" fill="#BAE6FD" fontSize="12" fontWeight="bold">
                彎折手肘阻礙了晶體緊密堆疊 ➜ 室溫流動液體
              </text>
            </g>
          )}

          {/* PUFA Multi-bent Chain */}
          {selectedType === 'pufa' && (
            <g>
              <path
                d="M 64 120 L 100 90 L 140 130 L 180 90 L 220 130 L 260 90"
                fill="none"
                stroke="#10B981"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 1st Double bond at C9 */}
              <circle cx="260" cy="90" r="12" fill="#047857" stroke="#34D399" strokeWidth="2" />
              <text x="260" y="94" fill="#FFFFFF" fontSize="9" textAnchor="middle">C=C</text>

              <path
                d="M 260 90 L 305 135 L 340 120"
                fill="none"
                stroke="#10B981"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 2nd Double bond at C12 */}
              <circle cx="340" cy="120" r="12" fill="#047857" stroke="#34D399" strokeWidth="2" />
              <text x="340" y="124" fill="#FFFFFF" fontSize="9" textAnchor="middle">C=C</text>

              {/* Highly curled tail */}
              <path
                d="M 340 120 L 380 170 L 420 150 L 460 200 L 490 180 L 530 230"
                fill="none"
                stroke="#10B981"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="360" y="60" fill="#6EE7B7" fontSize="11" textAnchor="middle">兩個雙鍵夾著敏感次甲基碳</text>
              <text x="440" y="260" fill="#A7F3D0" fontSize="12" fontWeight="bold">
                極致柔軟流動，但中間碳原子最易受熱自由基攻擊氧化
              </text>
            </g>
          )}

          {/* Trans Fatty Acid Straightened */}
          {selectedType === 'trans' && (
            <g>
              <path
                d="M 64 120 L 100 90 L 140 130 L 180 90 L 220 130 L 260 90 L 300 130 L 340 90 L 380 130 L 420 90 L 460 130 L 500 90 L 540 130 L 580 90 L 620 130 L 660 90"
                fill="none"
                stroke="#EF4444"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Trans double bond highlight */}
              <rect x="330" y="80" width="20" height="20" rx="4" fill="#991B1B" stroke="#F87171" strokeWidth="2" />
              <text x="340" y="94" fill="#FFFFFF" fontSize="9" textAnchor="middle">Trans</text>

              <text x="380" y="180" fill="#FCA5A5" fontSize="12" textAnchor="middle" fontWeight="bold">
                反式雙鍵讓碳鏈保持筆直，體內酵素難以辨識代謝，造成動脈硬化惡化
              </text>
            </g>
          )}
        </g>

        {/* Methyl End Footnote */}
        <text x="740" y="380" fill="#64748B" fontSize="11" textAnchor="end" fontFamily="monospace">
          CH₃ 甲基端 (Omega 端) ⟵
        </text>
      </svg>
    </div>
  );
};
