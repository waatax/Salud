import React, { useState } from 'react';

export const T1Mechanism: React.FC = () => {
  const [adhLevel, setAdhLevel] = useState<'low' | 'high'>('high');

  return (
    <div className="w-full max-w-2xl space-y-3">
      {/* Interactive toggle for mechanism state */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="font-mono text-slate-300">
          生理情境切換（動手看機制）：
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setAdhLevel('high')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              adhLevel === 'high'
                ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            滲透壓上升 2% (缺水 → ADH 啟動)
          </button>
          <button
            onClick={() => setAdhLevel('low')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              adhLevel === 'low'
                ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            水分充沛 (滲透壓正常 → ADH 關閉)
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 800 460"
        className="w-full h-auto rounded-xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="下視丘滲透受器與腎臟 Aquaporin-2 水通道蛋白回收機制"
      >
        <defs>
          <linearGradient id="ductGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        <rect width="800" height="460" rx="16" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />

        {/* Step 1: Hypothalamus & Pituitary */}
        <g transform="translate(30, 40)">
          <rect x="0" y="0" width="220" height="150" rx="12" fill="#151F32" stroke="#334155" strokeWidth="1.5" />
          <text x="20" y="32" fill="#F8FAFC" fontSize="15" fontWeight="bold">
            1. 下視丘滲透受器
          </text>
          <text x="20" y="55" fill="#94A3B8" fontSize="12" fontFamily="monospace">
            正常: 275–295 mOsm/kg
          </text>
          
          <rect
            x="20"
            y="70"
            width="180"
            height="28"
            rx="6"
            fill={adhLevel === 'high' ? '#7C2D12' : '#064E3B'}
            stroke={adhLevel === 'high' ? '#F97316' : '#10B981'}
          />
          <text x="30" y="89" fill="#FFFFFF" fontSize="12" fontWeight="bold">
            {adhLevel === 'high' ? '⚠ 滲透壓 > 295 (細胞皺縮)' : '✓ 滲透壓 285 (正常平衡)'}
          </text>

          <text x="20" y="125" fill="#FDE68A" fontSize="11">
            {adhLevel === 'high' ? '➜ 刺激腦垂腺後葉釋放 ADH' : '➜ 抑制腦垂腺 ADH 分泌'}
          </text>
        </g>

        {/* Arrow to Kidney */}
        <path
          d="M 260 115 C 310 115, 310 240, 360 240"
          fill="none"
          stroke={adhLevel === 'high' ? '#F59E0B' : '#64748B'}
          strokeWidth="3"
          strokeDasharray={adhLevel === 'high' ? '6 4' : 'none'}
        />
        <text x="270" y="170" fill={adhLevel === 'high' ? '#FBBF24' : '#64748B'} fontSize="11" fontFamily="monospace">
          {adhLevel === 'high' ? 'ADH (抗利尿激素) 流經血管' : '極低 ADH 濃度'}
        </text>

        {/* Step 2: Kidney Collecting Duct Cell */}
        <g transform="translate(370, 40)">
          <rect x="0" y="0" width="390" height="380" rx="12" fill="url(#ductGrad)" stroke="#38BDF8" strokeWidth="1.5" />
          
          {/* Header */}
          <text x="20" y="32" fill="#38BDF8" fontSize="16" fontWeight="bold">
            2. 腎臟集尿管主細胞 (Principal Cell)
          </text>
          <text x="20" y="52" fill="#94A3B8" fontSize="11">
            管腔側（原尿） ⟷ 胞質 ⟷ 血管側（回收進血液）
          </text>

          {/* Lumen Urine Tube (Left side) */}
          <rect x="25" y="70" width="55" height="280" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1" />
          <text x="52" y="100" fill="#E2E8F0" fontSize="12" textAnchor="middle" transform="rotate(-90 52 100)">
            集尿管腔 (Urine)
          </text>

          {/* Cell Membrane with Aquaporin-2 */}
          <line x1="80" y1="70" x2="80" y2="350" stroke="#94A3B8" strokeWidth="3" strokeDasharray="4 4" />
          
          {/* Vesicles & Aquaporin Channels */}
          {adhLevel === 'high' ? (
            <g>
              {/* Inserted Aquaporin Channels on apical membrane */}
              {[120, 180, 240, 300].map((y, idx) => (
                <g key={idx}>
                  <rect x="74" y={y - 12} width="14" height="24" rx="3" fill="#22D3EE" stroke="#FFFFFF" strokeWidth="1.5" />
                  {/* Flowing water arrow */}
                  <path d={`M 50 ${y} L 120 ${y}`} stroke="#38BDF8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                </g>
              ))}
              <text x="100" y="95" fill="#67E8F9" fontSize="12" fontWeight="bold">
                Aquaporin-2 水通道蛋白已嵌合插入！
              </text>
              <text x="100" y="115" fill="#E0F2FE" fontSize="11">
                大量自由水被高滲髓質拉回血液
              </text>
            </g>
          ) : (
            <g>
              {/* Internalized Vesicles in cytoplasm */}
              {[150, 230].map((y, idx) => (
                <g key={idx}>
                  <circle cx="160" cy={y} r="22" fill="#0C4A6E" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="160" cy={y} r="6" fill="#22D3EE" />
                </g>
              ))}
              <text x="100" y="105" fill="#94A3B8" fontSize="12">
                水通道滯留於囊泡內部（管膜不通透水）
              </text>
              <text x="100" y="125" fill="#64748B" fontSize="11">
                水分隨原尿直接排出（大量稀釋尿）
              </text>
            </g>
          )}

          {/* Blood Capillary (Right side) */}
          <rect x="315" y="70" width="55" height="280" rx="6" fill="#450A0A" stroke="#EF4444" strokeWidth="1" />
          <text x="342" y="120" fill="#FCA5A5" fontSize="12" textAnchor="middle" transform="rotate(-90 342 120)">
            周邊微血管 (Blood)
          </text>

          {/* Output Conclusion Bar */}
          <rect x="25" y="370" width="345" height="35" rx="6" fill="#0F172A" stroke="#334155" />
          <text x="40" y="392" fill={adhLevel === 'high' ? '#FBBF24' : '#38BDF8'} fontSize="12" fontWeight="bold">
            {adhLevel === 'high'
              ? '尿液表現：尿量減少、濃度大幅升高（深黃色）'
              : '尿液表現：尿量大增、濃度稀釋（清澈淡色）'}
          </text>
        </g>
      </svg>
    </div>
  );
};
