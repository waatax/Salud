import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { BADMINTON_INFOGRAPHICS } from '../../data/badmintonData';
import { Wind, Zap, Activity, Compass, ShieldCheck, Info, ChevronRight, CheckCircle2 } from 'lucide-react';

export const BadmintonInfographics: React.FC = () => {
  const { language } = useLanguage();
  const [activeDistance, setActiveDistance] = useState<number>(6);
  const [activeKineticPhase, setActiveKineticPhase] = useState<number>(3);

  // Deceleration data at distance x
  const getShuttleSpeed = (dist: number) => {
    // 493 * exp(-0.21 * dist) approximately
    if (dist <= 0) return 493;
    if (dist === 2) return 310;
    if (dist === 4) return 210;
    if (dist === 6) return 142;
    if (dist === 8) return 96;
    if (dist === 10) return 62;
    return 38;
  };

  const kineticPhases = [
    { nameZh: '下肢蹬地 (Ground Drive)', nameEn: 'Leg Ground Drive', angle: '400°/s', partZh: '踝膝關節伸展，給予垂直與旋轉反作用力', partEn: 'Ankle/knee drive generates ground reaction torque' },
    { nameZh: '骨盆逆轉 (Pelvic Rotation)', nameEn: 'Pelvic Rotation', angle: '650°/s', partZh: '髖部領先轉正 45°，拉緊腹斜肌與胸肌', partEn: 'Pelvis rotates 45 deg ahead, stretching obliques' },
    { nameZh: '胸椎側屈 (Thoracic Whip)', nameEn: 'Thoracic Whip', angle: '920°/s', partZh: '胸腔如拉滿的弓弦，儲備 SSC 彈性能量', partEn: 'Thoracic spine bows, storing elastic SSC recoil' },
    { nameZh: '肩關節內旋 (Shoulder Internal Rotation)', nameEn: 'Shoulder Int. Rotation', angle: '2,500°/s', partZh: '人體角速度之巔峰，肱骨以極速向前旋動', partEn: 'Human body peak angular velocity (2,500 deg/s)' },
    { nameZh: '前臂旋前 (Forearm Pronation)', nameEn: 'Forearm Pronation', angle: '2,100°/s', partZh: '橈骨繞尺骨極速翻轉，拍面正切爆發擊球', partEn: 'Radius whips over ulna for square cork impact' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '羽毛球運動科學四大圖解教學 Infor Graph' : 'Badminton 4 Scientific Visual Infor Graphs'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Aerodynamic Drag Curve, Kinetic Chain Velocity Stacking, Split-Step Ground Reaction, Court Geometry
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Aerodynamic Drag Curve ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-salud-cyan font-bold block">
                {BADMINTON_INFOGRAPHICS[0].id} · {BADMINTON_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[0].title_zh : BADMINTON_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <Wind className="w-5 h-5 text-salud-cyan shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[0].subtitle_zh : BADMINTON_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* SVG Graph: Speed vs Distance */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="h-44 w-full">
              <svg viewBox="0 0 400 180" className="w-full h-full">
                {/* Grid lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="100" x2="380" y2="100" stroke="#334155" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#475569" />
                <line x1="40" y1="20" x2="40" y2="140" stroke="#475569" />

                {/* Y Axis Labels */}
                <text x="35" y="24" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">500</text>
                <text x="35" y="64" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">300</text>
                <text x="35" y="104" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">150</text>
                <text x="35" y="144" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">0 km/h</text>

                {/* X Axis Labels */}
                <text x="40" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">0m</text>
                <text x="100" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">3m</text>
                <text x="180" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">6m (中場)</text>
                <text x="280" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">9m</text>
                <text x="360" y="156" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">12m (底線)</text>

                {/* Tennis reference curve (dashed grey) */}
                <path d="M 40 85 Q 200 100 360 115" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                <text x="365" y="118" fill="#64748b" fontSize="8" fontFamily="monospace">網球 (Tennis)</text>

                {/* Shuttlecock steep deceleration curve (glowing cyan) */}
                <path
                  d="M 40 22 C 80 50, 140 98, 180 108 C 240 122, 320 132, 360 135"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Active Slider Indicator */}
                {(() => {
                  const xPos = 40 + (activeDistance / 12) * 320;
                  const currentSpd = getShuttleSpeed(activeDistance);
                  const yPos = 140 - (currentSpd / 500) * 120;
                  return (
                    <g>
                      <line x1={xPos} y1="20" x2={xPos} y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
                      <circle cx={xPos} cy={yPos} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={xPos} y={Math.max(15, yPos - 8)} fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                        {currentSpd} km/h
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Interactive distance slider */}
            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">{language === 'zh-TW' ? '飛行距離位置：' : 'Flight Distance: '}</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="2"
                  value={activeDistance}
                  onChange={(e) => setActiveDistance(Number(e.target.value))}
                  className="w-32 accent-salud-cyan cursor-pointer"
                />
                <strong className="text-salud-cyan w-10 text-right">{activeDistance} m</strong>
              </div>
            </div>
          </div>

          {/* Takeaway bullets */}
          <ul className="space-y-1.5 text-xs text-slate-300">
            {BADMINTON_INFOGRAPHICS[0].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-salud-cyan font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: Kinetic Chain Smash Whip ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-salud-amber font-bold block">
                {BADMINTON_INFOGRAPHICS[1].id} · {BADMINTON_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[1].title_zh : BADMINTON_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <Zap className="w-5 h-5 text-salud-amber shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[1].subtitle_zh : BADMINTON_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* Interactive Kinetic Chain Step Selector */}
          <div className="space-y-1.5">
            {kineticPhases.map((phase, idx) => (
              <div
                key={idx}
                onClick={() => setActiveKineticPhase(idx)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                  activeKineticPhase === idx
                    ? 'bg-amber-950/40 border-salud-amber text-white shadow'
                    : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                    activeKineticPhase === idx ? 'bg-salud-amber text-black' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="font-bold">{language === 'zh-TW' ? phase.nameZh : phase.nameEn}</span>
                </div>
                <span className="font-mono text-salud-amber font-bold text-[11px]">{phase.angle}</span>
              </div>
            ))}
          </div>

          {/* Deep Explanation of Active Phase */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <strong className="text-salud-amber block mb-1">
              {language === 'zh-TW' ? kineticPhases[activeKineticPhase].nameZh : kineticPhases[activeKineticPhase].nameEn} 機制：
            </strong>
            <p className="text-slate-300 leading-relaxed">
              {language === 'zh-TW' ? kineticPhases[activeKineticPhase].partZh : kineticPhases[activeKineticPhase].partEn}
            </p>
          </div>
        </div>

        {/* ── Infographic 3: Split-Step & Lunge Braking ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                {BADMINTON_INFOGRAPHICS[2].id} · {BADMINTON_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[2].title_zh : BADMINTON_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[2].subtitle_zh : BADMINTON_INFOGRAPHICS[2].subtitle_en}
          </p>

          {/* SVG Visual: Timing Timeline & Knee Alignment */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-between">
              <span>啟動預跳步時序軸 (Pre-activation Timeline)</span>
              <span className="font-mono text-slate-400">Total 0.25s</span>
            </div>

            <div className="relative h-9 bg-slate-900 rounded-lg overflow-hidden flex items-center border border-slate-800 text-[10px] font-mono">
              <div className="w-[30%] bg-blue-900/60 h-full flex items-center justify-center text-blue-300 border-r border-slate-700">
                預跳起跳 (-0.10s)
              </div>
              <div className="w-[20%] bg-amber-900/60 h-full flex items-center justify-center text-amber-300 border-r border-slate-700">
                對手觸球 (0.00s)
              </div>
              <div className="w-[50%] bg-emerald-900/60 h-full flex items-center justify-center text-emerald-300">
                著地彈性爆發 (+0.12s)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-200">
                <strong className="block text-emerald-400 font-bold mb-0.5">✓ 正確煞車力線</strong>
                腳跟先著地向前滾動，膝蓋屈曲 105°，髕骨切齊第二腳趾。
              </div>
              <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-200">
                <strong className="block text-rose-400 font-bold mb-0.5">✕ 致命錯誤代償</strong>
                腳尖單點下插煞車，膝內扣 (Valgus)，剪力直接撕裂髕腱與半月板。
              </div>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {BADMINTON_INFOGRAPHICS[2].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 4: Court 6-Zone Geometry ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-purple-400 font-bold block">
                {BADMINTON_INFOGRAPHICS[3].id} · {BADMINTON_INFOGRAPHICS[3].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[3].title_zh : BADMINTON_INFOGRAPHICS[3].title_en}
              </h4>
            </div>
            <Compass className="w-5 h-5 text-purple-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? BADMINTON_INFOGRAPHICS[3].subtitle_zh : BADMINTON_INFOGRAPHICS[3].subtitle_en}
          </p>

          {/* SVG Visual: Court 6 Zones */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 360 200" className="w-full h-full">
                {/* Court Floor */}
                <rect x="20" y="15" width="320" height="170" fill="#0f172a" stroke="#22c55e" strokeWidth="2" rx="4" />
                {/* Net Line (Center) */}
                <line x1="180" y1="15" x2="180" y2="185" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />
                <text x="180" y="12" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">球網 (Net)</text>

                {/* Singles sidelines */}
                <line x1="20" y1="30" x2="340" y2="30" stroke="#334155" strokeWidth="1" />
                <line x1="20" y1="170" x2="340" y2="170" stroke="#334155" strokeWidth="1" />
                {/* Short service lines */}
                <line x1="135" y1="15" x2="135" y2="185" stroke="#334155" strokeWidth="1" />
                <line x1="225" y1="15" x2="225" y2="185" stroke="#334155" strokeWidth="1" />

                {/* 6 Target Zones on Right Side */}
                {/* 1. Front Left Drop */}
                <circle cx="205" cy="45" r="14" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1.5" />
                <text x="205" y="48" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">放網</text>

                {/* 2. Front Right Drop */}
                <circle cx="205" cy="155" r="14" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1.5" />
                <text x="205" y="158" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">勾角</text>

                {/* 3. Mid Left Drive */}
                <circle cx="260" cy="35" r="13" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="260" y="38" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">平抽</text>

                {/* 4. Mid Right Drive */}
                <circle cx="260" cy="165" r="13" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="260" y="168" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">追身</text>

                {/* 5. Rear Left Clear/Smash */}
                <circle cx="320" cy="45" r="14" fill="#8b5cf6" fillOpacity="0.4" stroke="#8b5cf6" strokeWidth="1.5" />
                <text x="320" y="48" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">高遠</text>

                {/* 6. Rear Right Clear/Smash */}
                <circle cx="320" cy="155" r="14" fill="#8b5cf6" fillOpacity="0.4" stroke="#8b5cf6" strokeWidth="1.5" />
                <text x="320" y="158" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">點殺</text>

                {/* Defense Base Position on Left Court */}
                <circle cx="95" cy="100" r="8" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                <text x="95" y="122" fill="#06b6d4" fontSize="9" textAnchor="middle" fontWeight="bold">角平分線回位</text>
              </svg>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
              <span>紅色：網前控球點</span>
              <span>黃色：中場搶攻點</span>
              <span>紫色：後場壓制點</span>
              <span className="text-cyan-400 font-bold">青色：動態回位熱區</span>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {BADMINTON_INFOGRAPHICS[3].core_takeaways_zh.map((point, idx) => (
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
