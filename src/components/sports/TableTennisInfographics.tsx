import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { TABLE_TENNIS_INFOGRAPHICS } from '../../data/tableTennisData';
import { RotateCw, Timer, Zap, Layers, Activity, ChevronRight, Compass } from 'lucide-react';

export const TableTennisInfographics: React.FC = () => {
  const { language } = useLanguage();
  const [activeSpin, setActiveSpin] = useState<'TOPSPIN' | 'BACKSPIN' | 'SIDESPIN'>('TOPSPIN');
  const [incomingSpeedKmh, setIncomingSpeedKmh] = useState<number>(85);

  // Flight time across 2.74m table
  // speed in m/s = (kmh * 1000) / 3600
  const speedMps = (incomingSpeedKmh * 1000) / 3600;
  const flightTimeMs = Math.round((2.74 / speedMps) * 1000);

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '乒乓球運動科學四大圖解教學 Infor Graph' : 'Table Tennis 4 Scientific Visual Infor Graphs'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Magnus Aerodynamics, &lt;0.3s Perception Reaction Loop, Kinetic Forearm Whip, Rubber Sponge Micro-Physics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Magnus Spin Aerodynamics ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-rose-400 font-bold block">
                {TABLE_TENNIS_INFOGRAPHICS[0].id} · {TABLE_TENNIS_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[0].title_zh : TABLE_TENNIS_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <RotateCw className="w-5 h-5 text-rose-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[0].subtitle_zh : TABLE_TENNIS_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Spin Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold">
            {[
              { id: 'TOPSPIN', labelZh: '上旋 (Topspin)', labelEn: 'Topspin' },
              { id: 'BACKSPIN', labelZh: '下旋 (Backspin)', labelEn: 'Backspin' },
              { id: 'SIDESPIN', labelZh: '側旋 (Sidespin)', labelEn: 'Sidespin' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSpin(s.id as any)}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  activeSpin === s.id
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {language === 'zh-TW' ? s.labelZh : s.labelEn}
              </button>
            ))}
          </div>

          {/* SVG Diagram for Selected Spin */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 360 170" className="w-full h-full">
                {/* Table Line */}
                <line x1="20" y1="145" x2="340" y2="145" stroke="#475569" strokeWidth="2" />
                <rect x="175" y="125" width="10" height="20" fill="#cbd5e1" />
                <text x="180" y="120" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">球網 (Net)</text>

                {activeSpin === 'TOPSPIN' && (
                  <g>
                    {/* Trajectory: High net clearance then sharp dive */}
                    <path d="M 30 110 Q 180 50 250 145" fill="none" stroke="#f43f5e" strokeWidth="3" />
                    {/* Ball representation */}
                    <circle cx="120" cy="72" r="14" fill="#fb7185" stroke="#ffffff" strokeWidth="1.5" />
                    {/* Rotation arrows (clockwise forward) */}
                    <path d="M 112 62 A 10 10 0 0 1 128 62" fill="none" stroke="#ffffff" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="120" y="52" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">高壓區 (慢速流)</text>
                    <text x="120" y="102" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">低壓區 (快速流)</text>
                    {/* Downward force vector */}
                    <line x1="120" y1="72" x2="120" y2="92" stroke="#f43f5e" strokeWidth="2.5" />
                    <polygon points="120,95 116,88 124,88" fill="#f43f5e" />
                    <text x="135" y="88" fill="#f43f5e" fontSize="9" fontWeight="bold">F_Magnus (下壓)</text>
                    <text x="260" y="138" fill="#fb7185" fontSize="8" fontWeight="bold">二跳急促低平前竄</text>
                  </g>
                )}

                {activeSpin === 'BACKSPIN' && (
                  <g>
                    {/* Trajectory: Low flat float then abrupt stall */}
                    <path d="M 30 90 Q 180 120 280 145" fill="none" stroke="#0ea5e9" strokeWidth="3" />
                    {/* Ball representation */}
                    <circle cx="120" cy="100" r="14" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="120" y="80" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">低壓區 (快速流)</text>
                    <text x="120" y="130" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">高壓區 (慢速流)</text>
                    {/* Upward force vector */}
                    <line x1="120" y1="100" x2="120" y2="80" stroke="#0ea5e9" strokeWidth="2.5" />
                    <polygon points="120,77 116,84 124,84" fill="#0ea5e9" />
                    <text x="135" y="88" fill="#0ea5e9" fontSize="9" fontWeight="bold">F_Magnus (升力)</text>
                    <text x="285" y="138" fill="#38bdf8" fontSize="8" fontWeight="bold">二跳不往前走向上浮起</text>
                  </g>
                )}

                {activeSpin === 'SIDESPIN' && (
                  <g>
                    {/* Banana curve in 3D projection */}
                    <path d="M 30 110 Q 170 80 270 145" fill="none" stroke="#a855f7" strokeWidth="3" />
                    <circle cx="140" cy="85" r="14" fill="#c084fc" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="140" y="65" fill="#e9d5ff" fontSize="9" fontWeight="bold" textAnchor="middle">側向壓差偏折</text>
                    <line x1="140" y1="85" x2="165" y2="85" stroke="#a855f7" strokeWidth="2.5" />
                    <polygon points="168,85 161,81 161,89" fill="#a855f7" />
                    <text x="175" y="89" fill="#a855f7" fontSize="9" fontWeight="bold">香蕉側拐 (Banana Hook)</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {TABLE_TENNIS_INFOGRAPHICS[0].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: 2.74m Reaction Latency Loop ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                {TABLE_TENNIS_INFOGRAPHICS[1].id} · {TABLE_TENNIS_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[1].title_zh : TABLE_TENNIS_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <Timer className="w-5 h-5 text-cyan-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[1].subtitle_zh : TABLE_TENNIS_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* Interactive Speed vs Flight Time Calculator */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">來球時速 (Incoming Ball Speed)：</span>
              <strong className="text-cyan-400 text-sm">{incomingSpeedKmh} km/h</strong>
            </div>
            <input
              type="range"
              min="50"
              max="120"
              step="5"
              value={incomingSpeedKmh}
              onChange={(e) => setIncomingSpeedKmh(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-500">2.74m 飛行時間預算：</span>
              <span className="text-amber-400 font-bold text-sm">{flightTimeMs} 毫秒 (ms)</span>
            </div>

            {/* Microsecond Timeline Bar */}
            <div className="space-y-1 pt-2">
              <div className="text-[10px] text-slate-400 flex justify-between font-mono">
                <span>視覺感知 (80ms)</span>
                <span>大腦決策 (70ms)</span>
                <span>神經肌肉啟動 (90ms)</span>
              </div>
              <div className="h-5 rounded-lg overflow-hidden flex text-[9px] font-mono text-white text-center font-bold">
                <div className="bg-blue-600/80 w-[30%] flex items-center justify-center">80ms</div>
                <div className="bg-purple-600/80 w-[28%] flex items-center justify-center">70ms</div>
                <div className="bg-emerald-600/80 w-[32%] flex items-center justify-center">90ms</div>
                <div className="bg-rose-600 w-[10%] flex items-center justify-center" title="容錯窗口 20ms">20ms</div>
              </div>
              <div className="text-[10px] text-rose-400 text-right font-mono">
                擊球容錯窗口僅 20ms (0.02秒)！
              </div>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {TABLE_TENNIS_INFOGRAPHICS[1].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: Forearm Snap & Core Rotation ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block">
                {TABLE_TENNIS_INFOGRAPHICS[2].id} · {TABLE_TENNIS_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[2].title_zh : TABLE_TENNIS_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Activity className="w-5 h-5 text-amber-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[2].subtitle_zh : TABLE_TENNIS_INFOGRAPHICS[2].subtitle_en}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-white">1. 右腳蹬地重心前移 (Ground Push)</span>
              <span className="font-mono text-amber-400">力源起點</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-white">2. 骨盆向左旋轉 40° (Pelvic Torque)</span>
              <span className="font-mono text-amber-400">角動量放大</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-white">3. 大臂引導並於身前制動 (Braking)</span>
              <span className="font-mono text-amber-400">能量傳遞</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-amber-950/40 border border-amber-500/50">
              <span className="font-bold text-amber-300">4. 前臂極速快收與旋前 (Forearm Snap)</span>
              <span className="font-mono text-amber-400 font-bold">切線摩擦 &gt;75%</span>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {TABLE_TENNIS_INFOGRAPHICS[2].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 4: Rubber Micro-Physics ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-purple-400 font-bold block">
                {TABLE_TENNIS_INFOGRAPHICS[3].id} · {TABLE_TENNIS_INFOGRAPHICS[3].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[3].title_zh : TABLE_TENNIS_INFOGRAPHICS[3].title_en}
              </h4>
            </div>
            <Layers className="w-5 h-5 text-purple-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? TABLE_TENNIS_INFOGRAPHICS[3].subtitle_zh : TABLE_TENNIS_INFOGRAPHICS[3].subtitle_en}
          </p>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <strong className="text-rose-400 block font-bold mb-1">黏性膠皮 (Tacky)</strong>
                <p className="text-[11px] text-slate-400">高分子樹脂微黏，摩擦力超強，高出球角，二跳強烈下沉。</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-2">狂飆 3 代表</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <strong className="text-blue-400 block font-bold mb-1">澀性外套 (Tensor)</strong>
                <p className="text-[11px] text-slate-400">大氣孔蛋糕海綿，高彈性張力，出球時速極快，低平出球角。</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-2">蝴蝶 Tenergy 代表</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <strong className="text-amber-400 block font-bold mb-1">長膠顆粒 (Pips)</strong>
                <p className="text-[11px] text-slate-400">細長顆粒撞擊傾倒彎折，不吃旋轉，反向借力將上旋變下旋。</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-2">防守型削球首選</span>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {TABLE_TENNIS_INFOGRAPHICS[3].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
