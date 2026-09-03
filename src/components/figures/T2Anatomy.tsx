import React from 'react';

export const T2Anatomy: React.FC = () => {
  return (
    <svg
      viewBox="0 0 800 480"
      className="w-full max-w-2xl h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="體液的三個房間：細胞內液佔 67%，組織間液佔 25%，血漿佔 8% 面積真實比例剖面"
    >
      <defs>
        <linearGradient id="icwGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0891B2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="isfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#475569" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FB923C" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Background container frame */}
      <rect x="20" y="20" width="760" height="440" rx="16" fill="#0B1120" stroke="#1E293B" strokeWidth="1.5" />

      {/* Main Compartments Box - Area mathematically proportional: 66.7% vs 25.3% vs 8.0% */}
      {/* 1. ICW: Width 480px, Height 340px (Area = 163,200) ~ 66.7% */}
      <g transform="translate(40, 50)">
        <rect
          x="0"
          y="0"
          width="470"
          height="340"
          rx="12"
          fill="url(#icwGrad)"
          stroke="#22D3EE"
          strokeWidth="2"
        />
        
        {/* Cell membrane simulated pores */}
        <line x1="470" y1="0" x2="470" y2="340" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="8 6" />

        <text x="30" y="45" fill="#FFFFFF" fontSize="22" fontWeight="bold" fontFamily="sans-serif">
          細胞內液 (ICW) · 2/3
        </text>
        <text x="30" y="75" fill="#E0F2FE" fontSize="14" fontFamily="monospace">
          約佔總體水 66.7%（70kg 成人約 28.0 L）
        </text>

        {/* Molecular schematic inside cell */}
        <g opacity="0.65">
          <circle cx="90" cy="160" r="28" fill="#0E7490" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="90" y="166" fill="#FFFFFF" fontSize="14" textAnchor="middle" fontWeight="bold">K⁺</text>
          <text x="90" y="205" fill="#BAE6FD" fontSize="11" textAnchor="middle">主陽離子: 鉀</text>

          <circle cx="200" cy="160" r="28" fill="#0E7490" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="200" y="166" fill="#FFFFFF" fontSize="12" textAnchor="middle" fontWeight="bold">HPO₄²⁻</text>
          <text x="200" y="205" fill="#BAE6FD" fontSize="11" textAnchor="middle">主陰離子: 磷酸</text>

          <circle cx="310" cy="160" r="28" fill="#0E7490" stroke="#67E8F9" strokeWidth="1.5" />
          <text x="310" y="166" fill="#FFFFFF" fontSize="12" textAnchor="middle" fontWeight="bold">酵素蛋白質</text>
          <text x="310" y="205" fill="#BAE6FD" fontSize="11" textAnchor="middle">維持代謝合成</text>
        </g>

        <rect x="30" y="250" width="410" height="60" rx="8" fill="#092B38" stroke="#155E75" strokeWidth="1" />
        <text x="45" y="275" fill="#7DD3FC" fontSize="12" fontWeight="bold">
          🔬 生理機制守護：
        </text>
        <text x="45" y="295" fill="#E0F2FE" fontSize="11">
          細胞內液是生命化學工廠，水分子經由水通道蛋白（AQP）與外界隨時維持等滲平衡。
        </text>
      </g>

      {/* 2. Extracellular Fluid (ECW) Container: Total 33.3% */}
      {/* 2A. ISF (Interstitial): 25.3% of total (Area = 62,000) */}
      <g transform="translate(530, 50)">
        <rect
          x="0"
          y="0"
          width="210"
          height="230"
          rx="12"
          fill="url(#isfGrad)"
          stroke="#94A3B8"
          strokeWidth="2"
        />
        <text x="20" y="35" fill="#F8FAFC" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
          組織間液 (ISF)
        </text>
        <text x="20" y="58" fill="#CBD5E1" fontSize="12" fontFamily="monospace">
          佔總體水約 25.3%
        </text>
        <text x="20" y="78" fill="#94A3B8" fontSize="11">
          約 10.5 公升（細胞微環境緩衝）
        </text>

        <circle cx="55" cy="135" r="20" fill="#1E293B" stroke="#94A3B8" strokeWidth="1" />
        <text x="55" y="140" fill="#38BDF8" fontSize="11" textAnchor="middle" fontWeight="bold">Na⁺</text>

        <circle cx="110" cy="135" r="20" fill="#1E293B" stroke="#94A3B8" strokeWidth="1" />
        <text x="110" y="140" fill="#38BDF8" fontSize="11" textAnchor="middle" fontWeight="bold">Cl⁻</text>

        <text x="20" y="195" fill="#CBD5E1" fontSize="11" opacity="0.9">
          填充於細胞微縫隙中
        </text>
      </g>

      {/* 2B. Plasma (Blood Stream): 8.0% of total */}
      <g transform="translate(530, 300)">
        <rect
          x="0"
          y="0"
          width="210"
          height="90"
          rx="12"
          fill="url(#plasmaGrad)"
          stroke="#FDE68A"
          strokeWidth="2"
        />
        <text x="20" y="32" fill="#0B1120" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
          血管內血漿 (Plasma)
        </text>
        <text x="20" y="52" fill="#451A03" fontSize="13" fontWeight="bold" fontFamily="monospace">
          僅佔全身水約 8%（約 3.5 L）
        </text>
        <text x="20" y="72" fill="#78350F" fontSize="11">
          抽血、量血壓偵測的核心窗口
        </text>
      </g>

      {/* Dynamic Osmotic Exchange Arrows */}
      <g stroke="#FDE68A" strokeWidth="2" fill="none">
        <path d="M 515 150 L 525 150 M 515 250 L 525 250" markerEnd="url(#arrow)" />
      </g>

      {/* Legend & Water movement footnote */}
      <text x="40" y="425" fill="#94A3B8" fontSize="12" fontFamily="monospace">
        半透膜分界：細胞膜（虛線）允許水自由滲透，阻止鈉鉀非自主逸散。
      </text>
    </svg>
  );
};
