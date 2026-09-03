import React, { useState } from 'react';

interface Props {
  figureId?: string;
}

export const T1Mechanism: React.FC<Props> = ({ figureId }) => {
  const isAlcohol = figureId === 'FIG-A-02-01' || figureId?.startsWith('FIG-A');
  const [adhLevel, setAdhLevel] = useState<'low' | 'high'>('high');
  const [aldh2State, setAldh2State] = useState<'normal' | 'deficient'>('deficient');

  if (isAlcohol) {
    return (
      <div className="w-full max-w-2xl space-y-3">
        {/* State Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
          <span className="text-slate-300">
            ALDH2 基因表型切換（生化模擬）：
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setAldh2State('normal')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                aldh2State === 'normal'
                  ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              正常活性 *1/*1 (清除通暢)
            </button>
            <button
              onClick={() => setAldh2State('deficient')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                aldh2State === 'deficient'
                  ? 'bg-salud-coral text-white font-bold shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              缺失型 *1/*2 (乙醛暴衝蓄積)
            </button>
          </div>
        </div>

        {/* SVG Diagram */}
        <svg
          viewBox="0 0 800 420"
          className="w-full h-auto rounded-xl shadow-2xl"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="乙醇肝細胞兩階段代謝路徑與 CYP2E1 氧化壓力圖"
        >
          <rect width="800" height="420" rx="16" fill="#090D16" stroke="#1E293B" strokeWidth="1.5" />

          {/* Title */}
          <text x="30" y="35" fill="#F8FAFC" fontSize="15" fontWeight="bold" fontFamily="sans-serif">
            肝細胞乙醇代謝總覽 (FIG-A-02-01)
          </text>
          <text x="30" y="55" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            Cytosol (細胞質) ⇄ Mitochondria (粒線體) ⇄ ER (內質網)
          </text>

          {/* Molecule 1: Ethanol */}
          <g transform="translate(40, 90)">
            <rect width="180" height="100" rx="12" fill="#151F32" stroke="#38BDF8" strokeWidth="2" />
            <text x="20" y="32" fill="#38BDF8" fontSize="13" fontWeight="bold" fontFamily="monospace">
              攝入乙醇 C₂H₅OH
            </text>
            <text x="20" y="55" fill="#94A3B8" fontSize="11">
              • 脂水雙溶小分子
            </text>
            <text x="20" y="75" fill="#94A3B8" fontSize="11">
              • 增強 GABA-A 抑制
            </text>
          </g>

          {/* Arrow 1: ADH */}
          <g transform="translate(230, 115)">
            <line x1="0" y1="25" x2="60" y2="25" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="30" y="15" fill="#F59E0B" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              ADH 氧化
            </text>
            <text x="30" y="45" fill="#94A3B8" fontSize="9" textAnchor="middle">
              NAD⁺ → NADH
            </text>
          </g>

          {/* Molecule 2: Acetaldehyde */}
          <g transform="translate(300, 80)">
            <rect
              width="200"
              height="120"
              rx="12"
              fill={aldh2State === 'deficient' ? '#450a0a' : '#1c1917'}
              stroke={aldh2State === 'deficient' ? '#EF4444' : '#F97316'}
              strokeWidth="2.5"
            />
            <text x="20" y="30" fill="#EF4444" fontSize="14" fontWeight="extrabold" fontFamily="monospace">
              ★ 乙醛 CH₃CHO
            </text>
            <text x="20" y="52" fill="#FCA5A5" fontSize="10" fontWeight="bold">
              IARC Group 1 一級致癌物
            </text>
            <text x="20" y="72" fill="#E2E8F0" fontSize="10">
              {aldh2State === 'deficient' ? '⚠ 濃聚倍率：5.0x – 6.0x' : '正常濃度：順暢水解'}
            </text>
            <text x="20" y="92" fill="#94A3B8" fontSize="10">
              DNA 加合物 · 臉紅 · 心悸
            </text>
          </g>

          {/* Arrow 2: ALDH2 */}
          <g transform="translate(510, 115)">
            <line
              x1="0"
              y1="25"
              x2="60"
              y2="25"
              stroke={aldh2State === 'deficient' ? '#64748B' : '#10B981'}
              strokeWidth={aldh2State === 'deficient' ? '1.5' : '3'}
              strokeDasharray={aldh2State === 'deficient' ? '4,4' : undefined}
            />
            <text
              x="30"
              y="15"
              fill={aldh2State === 'deficient' ? '#EF4444' : '#10B981'}
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {aldh2State === 'deficient' ? 'ALDH2 阻斷 (殘存10%)' : 'ALDH2 順暢'}
            </text>
          </g>

          {/* Molecule 3: Acetate */}
          <g transform="translate(580, 90)">
            <rect width="180" height="100" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
            <text x="20" y="32" fill="#34D399" fontSize="13" fontWeight="bold" fontFamily="monospace">
              乙酸 CH₃COO⁻
            </text>
            <text x="20" y="55" fill="#A7F3D0" fontSize="11">
              • 無毒天然代謝物
            </text>
            <text x="20" y="75" fill="#A7F3D0" fontSize="11">
              • 轉為 Acetyl-CoA 燃燒
            </text>
          </g>

          {/* Shunt Path: CYP2E1 */}
          <g transform="translate(40, 240)">
            <rect width="720" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="25" y="30" fill="#E2E8F0" fontSize="13" fontWeight="bold">
              內質網微粒體次要途徑：CYP2E1 (MEOS) 誘導
            </text>
            <text x="25" y="55" fill="#94A3B8" fontSize="11">
              當飲酒過量 ADH 飽和、或經常性中重度飲酒時，CYP2E1 表現量被顯著誘導。
            </text>

            <g transform="translate(25, 75)">
              <rect width="160" height="45" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
              <text x="80" y="27" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                CYP2E1 催化氧化
              </text>
            </g>

            <g transform="translate(200, 90)">
              <line x1="0" y1="10" x2="40" y2="10" stroke="#f43f5e" strokeWidth="2" />
            </g>

            <g transform="translate(250, 75)">
              <rect width="200" height="45" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="100" y="27" fill="#fda4af" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                大量產生活性氧 (ROS 自由基)
              </text>
            </g>

            <g transform="translate(465, 90)">
              <line x1="0" y1="10" x2="35" y2="10" stroke="#f43f5e" strokeWidth="2" />
            </g>

            <g transform="translate(510, 75)">
              <rect width="190" height="45" rx="8" fill="#1e293b" stroke="#f87171" strokeWidth="1" />
              <text x="95" y="27" fill="#fca5a5" fontSize="10" textAnchor="middle">
                脂質過氧化 ＋ 肝纖維化前驅
              </text>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // Default Chapter W ADH Mechanism
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

          <g transform="translate(20, 75)">
            <rect
              width="180"
              height="45"
              rx="8"
              fill={adhLevel === 'high' ? '#78350F' : '#064E3B'}
              stroke={adhLevel === 'high' ? '#F59E0B' : '#10B981'}
              strokeWidth="1.5"
            />
            <text
              x="90"
              y="28"
              fill={adhLevel === 'high' ? '#FDE68A' : '#A7F3D0'}
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {adhLevel === 'high' ? '高滲透壓 298 mOsm ⚠' : '正常滲透壓 285 mOsm ✓'}
            </text>
          </g>
        </g>

        {/* Arrow to Step 2 */}
        <g transform="translate(260, 105)">
          <line x1="0" y1="0" x2="50" y2="0" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
          <polygon points="50,-4 58,0 50,4" fill="#64748B" />
          <text x="25" y="-10" fill="#94A3B8" fontSize="11" textAnchor="middle" fontFamily="monospace">
            腦垂體後葉
          </text>
        </g>

        {/* Step 2: ADH in circulation */}
        <g transform="translate(320, 40)">
          <rect x="0" y="0" width="210" height="150" rx="12" fill="#151F32" stroke="#334155" strokeWidth="1.5" />
          <text x="20" y="32" fill="#F8FAFC" fontSize="15" fontWeight="bold">
            2. ADH 釋入循環
          </text>
          <text x="20" y="55" fill="#94A3B8" fontSize="12">
            抗利尿激素 (Vasopressin)
          </text>

          <g transform="translate(20, 75)">
            <rect
              width="170"
              height="55"
              rx="8"
              fill="#0F172A"
              stroke={adhLevel === 'high' ? '#38BDF8' : '#475569'}
              strokeWidth="1.5"
            />
            <text
              x="85"
              y="26"
              fill={adhLevel === 'high' ? '#38BDF8' : '#94A3B8'}
              fontSize="13"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {adhLevel === 'high' ? 'ADH 脈衝分泌 ↑' : 'ADH 分泌受抑制 ↓'}
            </text>
            <text x="85" y="44" fill="#64748B" fontSize="10" textAnchor="middle">
              {adhLevel === 'high' ? '結合集尿管 V2 受體' : '血中濃度極低'}
            </text>
          </g>
        </g>

        {/* Arrow down to Kidney */}
        <g transform="translate(425, 200)">
          <line x1="0" y1="0" x2="0" y2="35" stroke="#38BDF8" strokeWidth="2.5" />
          <polygon points="-4,35 0,43 4,35" fill="#38BDF8" />
        </g>

        {/* Step 3: Kidney Collecting Duct & AQP2 */}
        <g transform="translate(30, 245)">
          <rect x="0" y="0" width="740" height="190" rx="14" fill="url(#ductGrad)" stroke="#334155" strokeWidth="1.5" />
          <text x="25" y="32" fill="#F8FAFC" fontSize="15" fontWeight="bold">
            3. 腎集尿管上皮細胞：Aquaporin-2 水通道蛋白嵌插
          </text>
          <text x="25" y="52" fill="#94A3B8" fontSize="12">
            AQP2 囊泡由細胞內部穿梭至頂端膜（Apical membrane），水分子順滲透壓梯度回收至高滲髓質間隙
          </text>

          {/* Schematic of membrane */}
          <g transform="translate(25, 70)">
            {/* Urine lumen */}
            <rect x="0" y="0" width="200" height="95" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <text x="100" y="24" fill="#E2E8F0" fontSize="12" fontWeight="bold" textAnchor="middle">
              原尿管腔 (Urine Lumen)
            </text>
            <text
              x="100"
              y="55"
              fill={adhLevel === 'high' ? '#FBBF24' : '#38BDF8'}
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {adhLevel === 'high' ? '尿量大幅減少 · 變濃' : '尿量大增 · 清澈稀薄'}
            </text>
            <text x="100" y="75" fill="#94A3B8" fontSize="11" textAnchor="middle">
              {adhLevel === 'high' ? '高達 ~1200 mOsm/kg' : '低至 ~50 mOsm/kg'}
            </text>

            {/* AQP2 Channels in middle */}
            <g transform="translate(220, 0)">
              <rect
                x="0"
                y="0"
                width="260"
                height="95"
                rx="8"
                fill={adhLevel === 'high' ? '#083344' : '#151F32'}
                stroke={adhLevel === 'high' ? '#22D3EE' : '#334155'}
                strokeWidth="1.5"
              />
              <text x="130" y="24" fill="#22D3EE" fontSize="12" fontWeight="bold" textAnchor="middle">
                集尿管主細胞 (Principal Cell)
              </text>

              {/* Water Channel Icons */}
              <g transform="translate(30, 40)">
                <circle cx="15" cy="15" r="14" fill={adhLevel === 'high' ? '#0E7490' : '#1E293B'} stroke="#22D3EE" />
                <text x="15" y="19" fill="#E0F2FE" fontSize="10" textAnchor="middle" fontWeight="bold">
                  H₂O
                </text>
                <circle cx="65" cy="15" r="14" fill={adhLevel === 'high' ? '#0E7490' : '#1E293B'} stroke="#22D3EE" />
                <text x="65" y="19" fill="#E0F2FE" fontSize="10" textAnchor="middle" fontWeight="bold">
                  H₂O
                </text>
                <circle cx="115" cy="15" r="14" fill={adhLevel === 'high' ? '#0E7490' : '#1E293B'} stroke="#22D3EE" />
                <text x="115" y="19" fill="#E0F2FE" fontSize="10" textAnchor="middle" fontWeight="bold">
                  H₂O
                </text>
                <circle cx="165" cy="15" r="14" fill={adhLevel === 'high' ? '#0E7490' : '#1E293B'} stroke="#22D3EE" />
                <text x="165" y="19" fill="#E0F2FE" fontSize="10" textAnchor="middle" fontWeight="bold">
                  H₂O
                </text>
              </g>

              <text x="130" y="82" fill="#67E8F9" fontSize="11" textAnchor="middle">
                {adhLevel === 'high' ? '✓ AQP2 密集嵌插於頂端膜' : '⊘ AQP2 內吞回囊泡休眠'}
              </text>
            </g>

            {/* Blood / Interstitium */}
            <g transform="translate(500, 0)">
              <rect x="0" y="0" width="190" height="95" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1" />
              <text x="95" y="24" fill="#E2E8F0" fontSize="12" fontWeight="bold" textAnchor="middle">
                腎髓質間隙與血管
              </text>
              <text
                x="95"
                y="55"
                fill={adhLevel === 'high' ? '#34D399' : '#94A3B8'}
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {adhLevel === 'high' ? '水份大量回收循環 ↑' : '極少水份回收'}
              </text>
              <text x="95" y="75" fill="#64748B" fontSize="11" textAnchor="middle">
                維持體液滲透壓穩定
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
