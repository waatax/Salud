import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { MOBILITY_INFOGRAPHICS } from '../../data/mobilityData';
import { RotateCw, ShieldCheck, Zap, Layers, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export const MobilityInfographics: React.FC = () => {
  const { language } = useLanguage();

  // Interactive State for Infographic 1: Joint by Joint
  const [compensationMode, setCompensationMode] = useState<'HEALTHY' | 'COMPENSATED'>('HEALTHY');
  const [selectedJointIdx, setSelectedJointIdx] = useState<number>(2); // Default Hip
  const jointStack = [
    { nameZh: '足踝關節 (Ankle)', roleZh: '靈活性 (Mobility)', role: 'MOBILITY', failureZh: '若受限 ➔ 迫使膝關節扭轉，引發髕骨滑囊炎與跳躍膝' },
    { nameZh: '膝關節 (Knee)', roleZh: '穩定性 (Stability)', role: 'STABILITY', failureZh: '若過度扭轉 ➔ 內側副韌帶與半月板受剪應力撕裂' },
    { nameZh: '髖關節 (Hip)', roleZh: '靈活性 (Mobility)', role: 'MOBILITY', failureZh: '若前側緊繃 ➔ 迫使腰椎前凸過折，引發椎間盤突出與滑脫' },
    { nameZh: '腰椎 (Lumbar)', roleZh: '穩定性 (Stability)', role: 'STABILITY', failureZh: '若失去抗扭能力 ➔ 下背筋膜急性痙攣，壓迫坐骨神經' },
    { nameZh: '胸椎 (Thoracic)', roleZh: '靈活性 (Mobility)', role: 'MOBILITY', failureZh: '若駝背鎖死 ➔ 迫使頸椎代償前傾富貴包，肩胛骨失去前鋸肌貼附' },
    { nameZh: '肩胛胸壁 (Scapula)', roleZh: '穩定性 (Stability)', role: 'STABILITY', failureZh: '若翼狀上浮 ➔ 旋轉肌袖無支點受剪切夾擠' },
    { nameZh: '盂肱肩關節 (Glenohumeral)', roleZh: '靈活性 (Mobility)', role: 'MOBILITY', failureZh: '球窩關節活動度受限引發五十肩與旋轉肌撕裂' },
  ];

  // Interactive State for Infographic 2: Anatomy Trains SBL
  const [selectedSblPoint, setSelectedSblPoint] = useState<number>(0);
  const sblStations = [
    { stationZh: '1. 足底筋膜 (Plantar Fascia)', keyZh: '足弓第一道彈力吸震層', pearlZh: '用網球滾壓放鬆足底，可立即增加站姿體前屈 3–5 cm！' },
    { stationZh: '2. 阿基里斯腱 (Achilles Tendon)', keyZh: '人體最粗壯結締彈簧', pearlZh: '慢性跟腱炎常與小腿比目魚肌和膕繩肌張力過高連鎖相關。' },
    { stationZh: '3. 膕繩肌群 (Hamstrings)', keyZh: '坐骨結節後側大肌群', pearlZh: '久坐使膕繩肌縮短，向後下拉扯骨盆造成骨盆後傾與腰椎曲度變平。' },
    { stationZh: '4. 薦結節韌帶與豎脊肌', keyZh: '骨盆連接脊椎的承重纜繩', pearlZh: '下背緊繃常是筋膜張力向下累積的「受害者」，盲目按壓下背治標不治本。' },
    { stationZh: '5. 帽狀腱膜 (Epicranial Aponeurosis)', keyZh: '覆蓋頭頂顱骨的筋膜終端', pearlZh: '足底與後背緊繃可向上傳遞，引發緊張性後頭部與顳側偏頭痛！' },
  ];

  // Interactive State for Infographic 3: PNF Reflex
  const [pnfStep, setPnfStep] = useState<number>(1);
  const pnfSteps = [
    { stepZh: '步驟 1：被動拉伸至輕度緊繃位', descZh: '緩慢將目標肌肉拉伸至終端阻力點（維持 10 秒），肌梭感受長度變化微弱放電。' },
    { stepZh: '步驟 2：6 秒等長抗阻收縮 (激活 GTO)', descZh: '給予 20–30% 最大肌力反向抗阻「頂住」（肌長不變）。高爾基腱器官 (GTO) 感應張力爆發放電，向脊髓發送抑制信號。' },
    { stepZh: '步驟 3：呼氣放鬆瞬間推進 (+5°–10°)', descZh: '自體抑制 (Autogenic Inhibition) 關閉肌梭痙攣反射，神經放行！伴隨呼氣肌肉深度鬆弛，安全推進全新活動度。' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/20 text-teal-500 border border-teal-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '活動度與筋膜科學三大核心可視化教學圖解' : 'Mobility & Fascia Science: 3 Core Visual Pedagogical Infographics'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Joint-by-Joint Alternating Stack, Anatomy Trains Superficial Back Line, PNF & GTO Neuro-Inhibition
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Joint by Joint Concept ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-teal-500 font-bold block">
                {MOBILITY_INFOGRAPHICS[0].id} · {MOBILITY_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? MOBILITY_INFOGRAPHICS[0].title_zh : MOBILITY_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <RotateCw className="w-5 h-5 text-teal-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? MOBILITY_INFOGRAPHICS[0].subtitle_zh : MOBILITY_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Mode Toggle */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setCompensationMode('HEALTHY')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                compensationMode === 'HEALTHY'
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✓ 理想交替堆疊 (靈活-穩定協同)
            </button>
            <button
              onClick={() => setCompensationMode('COMPENSATED')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                compensationMode === 'COMPENSATED'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✕ 代償失衡破壞鏈 (鄰近受災)
            </button>
          </div>

          {/* Joint Stack Interactive Picker */}
          <div className="space-y-1">
            {jointStack.map((j, idx) => {
              const isSelected = selectedJointIdx === idx;
              const isMobility = j.role === 'MOBILITY';
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedJointIdx(idx)}
                  className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-teal-500/10 border-teal-500/50 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white">{j.nameZh}</span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                      isMobility ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {j.roleZh}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Joint Pathology Focus Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
            <div className="font-bold text-slate-900 dark:text-white mb-1">
              {jointStack[selectedJointIdx].nameZh} 代償病理分析：
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {jointStack[selectedJointIdx].failureZh}
            </p>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {MOBILITY_INFOGRAPHICS[0].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: Anatomy Trains SBL ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-500 font-bold block">
                {MOBILITY_INFOGRAPHICS[1].id} · {MOBILITY_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? MOBILITY_INFOGRAPHICS[1].title_zh : MOBILITY_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <Layers className="w-5 h-5 text-cyan-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? MOBILITY_INFOGRAPHICS[1].subtitle_zh : MOBILITY_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* SBL Stations Interactive List */}
          <div className="space-y-1.5">
            {sblStations.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSblPoint(idx)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                  selectedSblPoint === idx
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{s.stationZh}</span>
                  <span className="text-[10px] font-mono text-slate-400">{s.keyZh}</span>
                </div>
                {selectedSblPoint === idx && (
                  <p className="text-[11px] text-cyan-700 dark:text-cyan-300 mt-1.5 font-mono">
                    💡 {s.pearlZh}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* SVG SBL Full Body Meridian */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Superficial Back Line Kinetic Map">
                {/* Continuous Back Line Kinetic Spine (Cyan Glowing Ribbon) */}
                <path
                  d="M 60 145 C 80 145, 95 130, 105 110 C 120 85, 145 75, 175 60 C 220 40, 270 35, 320 25"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Station Markers */}
                <circle cx="60" cy="145" r="7" fill={selectedSblPoint === 0 ? '#38bdf8' : '#0891b2'} stroke="#fff" strokeWidth="2" />
                <text x="60" y="162" fill="#0891b2" fontSize="8" fontWeight="bold" textAnchor="middle">1. 足底筋膜</text>

                <circle cx="105" cy="110" r="7" fill={selectedSblPoint === 1 ? '#38bdf8' : '#0891b2'} stroke="#fff" strokeWidth="2" />
                <text x="105" y="100" fill="#0891b2" fontSize="8" fontWeight="bold" textAnchor="middle">2. 跟腱</text>

                <circle cx="150" cy="70" r="7" fill={selectedSblPoint === 2 ? '#38bdf8' : '#0891b2'} stroke="#fff" strokeWidth="2" />
                <text x="150" y="60" fill="#0891b2" fontSize="8" fontWeight="bold" textAnchor="middle">3. 膕繩肌</text>

                <circle cx="230" cy="45" r="7" fill={selectedSblPoint === 3 ? '#38bdf8' : '#0891b2'} stroke="#fff" strokeWidth="2" />
                <text x="230" y="35" fill="#0891b2" fontSize="8" fontWeight="bold" textAnchor="middle">4. 豎脊肌</text>

                <circle cx="320" cy="25" r="7" fill={selectedSblPoint === 4 ? '#38bdf8' : '#0891b2'} stroke="#fff" strokeWidth="2" />
                <text x="320" y="15" fill="#0891b2" fontSize="8" fontWeight="bold" textAnchor="middle">5. 帽狀腱膜</text>
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {MOBILITY_INFOGRAPHICS[1].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: PNF & GTO Neuro-Inhibition ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm lg:col-span-2">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-500 font-bold block">
                {MOBILITY_INFOGRAPHICS[2].id} · {MOBILITY_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? MOBILITY_INFOGRAPHICS[2].title_zh : MOBILITY_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Zap className="w-5 h-5 text-emerald-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? MOBILITY_INFOGRAPHICS[2].subtitle_zh : MOBILITY_INFOGRAPHICS[2].subtitle_en}
          </p>

          {/* Interactive Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pnfSteps.map((s, idx) => (
              <div
                key={idx}
                onClick={() => setPnfStep(idx)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                  pnfStep === idx
                    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-[10px] font-mono">
                    {idx + 1}
                  </span>
                  {s.stepZh}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.descZh}
                </p>
              </div>
            ))}
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-1">
            {MOBILITY_INFOGRAPHICS[2].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
