import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { STRENGTH_INFOGRAPHICS } from '../../data/strengthData';
import { Dumbbell, Target, Layers, TrendingUp, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export const StrengthInfographics: React.FC = () => {
  const { language } = useLanguage();

  // Interactive State for Infographic 1: Hypertrophy Triad
  const [activeTriad, setActiveTriad] = useState<'TENSION' | 'STRESS' | 'DAMAGE'>('TENSION');
  const triadDetails = {
    TENSION: {
      nameZh: '機械張力 (Mechanical Tension) · 70% 決定權重',
      nameEn: 'Mechanical Tension (70% Primary Driver)',
      mechanismZh: '高阻力收縮橫向拉扯肌纖維膜肋節 (Costamere)，產生磷脂酸 (PA)，直接點火 mTORC1 與核糖體蛋白質轉譯。',
      mechanismEn: 'Cross-sarcolemmal costamere strain produces phosphatidic acid, directly phosphorylating mTORC1.',
      guidelineZh: '關鍵在於組末 0–2 次保留次數 (RIR) 的高張力，而非單純的絕對大重量。',
    },
    STRESS: {
      nameZh: '代謝壓力 (Metabolic Stress) · 20% 輔助權重',
      nameEn: 'Metabolic Stress (20% Secondary Driver)',
      mechanismZh: '血管閉塞與無氧酵解積聚乳酸、H+ 與無機磷酸，促使肌細胞滲透性水腫，刺激局部自泌生長因子。',
      mechanismEn: 'Metabolite pooling induces cellular swelling, signaling local autocrine myogenic cascades.',
      guidelineZh: '中高次數 (12–20RM)、短間歇 (45–60秒) 或血流阻斷訓練 (BFR) 的核心優勢。',
    },
    DAMAGE: {
      nameZh: '肌纖維微細損傷 (Muscle Damage) · 10% 伴隨雙刃劍',
      nameEn: 'Muscle Damage (10% Minor/Incidental)',
      mechanismZh: '肌原纖維 Z 盤撕裂誘導衛星細胞融合，但過度損傷會破壞細胞外基質，延長修復時間達 4–7 天。',
      mechanismEn: 'Z-disc microtears recruit satellite cells, but excessive damage delays progressive overload.',
      guidelineZh: '「酸痛不等於長肌肉」：過度延遲性酸痛 (DOMS) 往往排擠有效週訓練頻率。',
    },
  };

  // Interactive State for Infographic 2: Six Movement Patterns
  const [selectedPattern, setSelectedPattern] = useState<'SQUAT' | 'HINGE' | 'PUSH' | 'PULL' | 'LUNGE' | 'ANTI_ROTATION'>('SQUAT');
  const patternDetails = {
    SQUAT: {
      nameZh: '下肢推 · 深蹲模式 (Squat)',
      jointZh: '膝關節主導 (Knee-dominant) ＋ 髖關節協同',
      musclesZh: '股四頭肌、臀大肌、內收大肌',
      exercises: '高腳杯深蹲、槓鈴頸後深蹲、哈克深蹲',
      pearlZh: '維持足弓三點著地與脛骨/軀幹平行力線，嚴防膝內扣 (Knee Valgus)。',
    },
    HINGE: {
      nameZh: '下肢拉 · 髖鉸鏈模式 (Hinge)',
      jointZh: '髖關節主導 (Hip-dominant) ＋ 膝微屈固定',
      musclesZh: '臀大肌、膕繩肌後側動力鏈、豎脊肌',
      exercises: '六角槓硬舉、羅馬尼亞硬舉 (RDL)、早安式',
      pearlZh: '骨盆水平後移推向牆壁，保持中立脊椎，最大化離心牽拉膕繩肌。',
    },
    PUSH: {
      nameZh: '上肢推 · 水平與垂直推 (Push)',
      jointZh: '盂肱關節水平內收/屈曲 ＋ 肘伸展',
      musclesZh: '胸大肌、三角肌前束、肱三頭肌',
      exercises: '槓鈴臥推、啞鈴肩上推舉、雙槓臂屈伸',
      pearlZh: '推舉時沉肩並適度後收肩胛骨，避免肩峰下夾擠 (Subacromial Impingement)。',
    },
    PULL: {
      nameZh: '上肢拉 · 水平與垂直拉 (Pull)',
      jointZh: '肩關節伸展/水平外展 ＋ 肘屈曲 ＋ 肩胛後收',
      musclesZh: '背闊肌、斜方肌中下束、菱形肌、肱二頭肌',
      exercises: '胸支撐划船、引體向上、滑輪下拉',
      pearlZh: '「手肘引領向後拉」而非單純手臂屈曲，頂峰收縮鎖緊背闊肌下緣。',
    },
    LUNGE: {
      nameZh: '單側步態 · 單腿與負重行走 (Lunge & Carry)',
      jointZh: '骨盆多平面動態抗側傾 ＋ 單側下肢抗扭',
      musclesZh: '臀中肌、股四頭肌、核心深層旋轉肌群',
      exercises: '保加利亞分腿蹲、農夫走路 (Farmer’s Carry)',
      pearlZh: '消除雙側肌力不平衡，強化日常行走防絆倒單足支撐穩定度。',
    },
    ANTI_ROTATION: {
      nameZh: '核心抗變形 · 抗伸展與抗旋轉 (Anti-Core)',
      jointZh: '脊椎等長中立維持（抵抗剪應力與扭力）',
      musclesZh: '腹橫肌、腹內外斜肌、腰方肌',
      exercises: '帕洛夫推舉 (Pallof Press)、死蟲式、棒式',
      pearlZh: '核心肌肉設計是用來「煞車阻擋形變」保護神經管，而非無止境捲腹彎曲。',
    },
  };

  // Interactive State for Infographic 3: Henneman Size Principle
  const [loadPct, setLoadPct] = useState<number>(85);
  const getRecruitmentStatus = (load: number) => {
    if (load < 50) {
      return {
        levelZh: '低閾值徵召 (Type I 慢肌主導)',
        typeI: '100%',
        typeIIa: '20%',
        typeIIx: '0%',
        summaryZh: '日常耐力步行，未觸及高生長潛力快肌纖維。',
      };
    } else if (load < 75) {
      return {
        levelZh: '中等徵召 (Type I + Type IIa)',
        typeI: '100%',
        typeIIa: '75%',
        typeIIx: '30%',
        summaryZh: '具備良好肌耐力與中等肌肥大效益，若接近力竭快肌可完全補齊。',
      };
    } else {
      return {
        levelZh: '全閾值爆發徵召 (Type I + IIa + IIx 徹底激活)',
        typeI: '100%',
        typeIIa: '100%',
        typeIIx: '95%',
        summaryZh: '所有高閾值快肌單元完全點火，肌原纖維機械張力達生理峰值！',
      };
    }
  };

  const recruitment = getRecruitmentStatus(loadPct);

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-nature-green-500/20 text-nature-green-600 dark:text-nature-green-400 border border-nature-green-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '肌力重訓科學四大核心可視化教學圖解' : 'Strength Science: 4 Core Visual Pedagogical Infographics'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Mechanotransduction Triad, Six Fundamental Patterns, Henneman Size Principle, Supercompensation Waves
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Mechanotransduction Triad in Hypertrophy ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-nature-green-600 dark:text-nature-green-400 font-bold block">
                {STRENGTH_INFOGRAPHICS[0].id} · {STRENGTH_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[0].title_zh : STRENGTH_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <Dumbbell className="w-5 h-5 text-nature-green-600 dark:text-nature-green-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[0].subtitle_zh : STRENGTH_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Triad Selector */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTriad('TENSION')}
              className={`py-1.5 rounded-lg transition-all text-center ${
                activeTriad === 'TENSION'
                  ? 'bg-nature-green-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              機械張力 (70%)
            </button>
            <button
              onClick={() => setActiveTriad('STRESS')}
              className={`py-1.5 rounded-lg transition-all text-center ${
                activeTriad === 'STRESS'
                  ? 'bg-amber-500 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              代謝壓力 (20%)
            </button>
            <button
              onClick={() => setActiveTriad('DAMAGE')}
              className={`py-1.5 rounded-lg transition-all text-center ${
                activeTriad === 'DAMAGE'
                  ? 'bg-rose-500 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              微細損傷 (10%)
            </button>
          </div>

          {/* Triad Detail Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-xs text-slate-900 dark:text-white">
              {triadDetails[activeTriad].nameZh}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {triadDetails[activeTriad].mechanismZh}
            </p>
            <p className="text-[11px] font-mono text-salud-cyan">
              💡 {triadDetails[activeTriad].guidelineZh}
            </p>
          </div>

          {/* SVG Donut/Ring Weighting Chart */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Hypertrophy Stimulus Donut">
                {/* Center Donut */}
                <circle cx="130" cy="85" r="56" fill="none" stroke="#e2e8f0" dark-stroke="#334155" strokeWidth="22" className="dark:stroke-slate-800" />

                {/* Tension Arc: 70% of circumference 351.8 = ~246 */}
                <circle
                  cx="130"
                  cy="85"
                  r="56"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="24"
                  strokeDasharray="246 352"
                  strokeDashoffset="0"
                  transform="rotate(-90 130 85)"
                />

                {/* Metabolic Stress Arc: 20% = ~70 */}
                <circle
                  cx="130"
                  cy="85"
                  r="56"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="24"
                  strokeDasharray="70 352"
                  strokeDashoffset="-246"
                  transform="rotate(-90 130 85)"
                />

                {/* Damage Arc: 10% = ~35 */}
                <circle
                  cx="130"
                  cy="85"
                  r="56"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="24"
                  strokeDasharray="36 352"
                  strokeDashoffset="-316"
                  transform="rotate(-90 130 85)"
                />

                {/* Center Text */}
                <text x="130" y="82" fill="#10b981" fontSize="13" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">mTORC1</text>
                <text x="130" y="96" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">肌蛋白合成</text>

                {/* Legend list on right */}
                <g transform="translate(230, 45)">
                  <rect x="0" y="0" width="12" height="12" rx="3" fill="#10b981" />
                  <text x="18" y="10" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="sans-serif">機械張力 (70%)</text>
                  <text x="18" y="22" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">肋節 PA 激活總開關</text>

                  <rect x="0" y="38" width="12" height="12" rx="3" fill="#f59e0b" />
                  <text x="18" y="48" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="sans-serif">代謝壓力 (20%)</text>
                  <text x="18" y="60" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">細胞水腫與自泌生長</text>

                  <rect x="0" y="76" width="12" height="12" rx="3" fill="#ef4444" />
                  <text x="18" y="86" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="sans-serif">微細損傷 (10%)</text>
                  <text x="18" y="98" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">衛星細胞融合輔助</text>
                </g>
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {STRENGTH_INFOGRAPHICS[0].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nature-green-600 dark:text-nature-green-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: Six Fundamental Movement Patterns ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-salud-cyan font-bold block">
                {STRENGTH_INFOGRAPHICS[1].id} · {STRENGTH_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[1].title_zh : STRENGTH_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <Target className="w-5 h-5 text-salud-cyan shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[1].subtitle_zh : STRENGTH_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* Interactive Pattern Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-mono font-bold">
            {(['SQUAT', 'HINGE', 'PUSH', 'PULL', 'LUNGE', 'ANTI_ROTATION'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedPattern(key)}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  selectedPattern === key
                    ? 'bg-salud-cyan text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {key === 'SQUAT' ? '深蹲' : key === 'HINGE' ? '鉸鏈' : key === 'PUSH' ? '推' : key === 'PULL' ? '拉' : key === 'LUNGE' ? '步態' : '核心抗扭'}
              </button>
            ))}
          </div>

          {/* Pattern Details Spotlight */}
          <div className="p-3.5 rounded-xl bg-salud-cyan/10 border border-salud-cyan/30 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-salud-cyan">
                {patternDetails[selectedPattern].nameZh}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {patternDetails[selectedPattern].jointZh}
              </span>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">主要肌群：</span>{patternDetails[selectedPattern].musclesZh}
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">經典動作：</span>{patternDetails[selectedPattern].exercises}
            </div>
            <p className="text-[11px] font-mono text-nature-amber-800 dark:text-nature-amber-300">
              💡 {patternDetails[selectedPattern].pearlZh}
            </p>
          </div>

          {/* SVG Multi-joint Skeleton Vector */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Biomechanical Kinetic Map">
                {/* Kinetic Chain Balance Diagram */}
                <rect x="25" y="25" width="155" height="120" rx="10" fill="#06b6d4" fillOpacity="0.08" stroke="#06b6d4" strokeWidth="1.2" />
                <text x="102" y="45" fill="#06b6d4" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">下肢雙軸平衡 (Lower Body)</text>
                <text x="102" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">膝主導 (Squat) ⟷ 髖主導 (Hinge)</text>
                <text x="102" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle" fontFamily="monospace">前側鏈 (股四頭) vs 後側鏈 (臀/膕繩)</text>
                <text x="102" y="115" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">保護膝十字韌帶與半月板</text>

                <rect x="200" y="25" width="155" height="120" rx="10" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="1.2" />
                <text x="277" y="45" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">上肢推拉對稱 (Upper Body)</text>
                <text x="277" y="70" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">水平推拉 (1:1) ＋ 垂直推拉 (1:1)</text>
                <text x="277" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle" fontFamily="monospace">胸大肌前束 vs 背闊肌/菱形肌</text>
                <text x="277" y="115" fill="#06b6d4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">糾正圓肩駝背與肩袖磨損</text>
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {STRENGTH_INFOGRAPHICS[1].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-salud-cyan shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: Henneman Size Principle & Motor Unit Recruitment ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-nature-amber-500 font-bold block">
                {STRENGTH_INFOGRAPHICS[2].id} · {STRENGTH_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[2].title_zh : STRENGTH_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Layers className="w-5 h-5 text-nature-amber-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[2].subtitle_zh : STRENGTH_INFOGRAPHICS[2].subtitle_en}
          </p>

          {/* Interactive Load Slider */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500 font-bold">調節訓練強度 / 負載 (% 1RM 或組末逼近力竭程度)：</span>
              <span className="px-2 py-0.5 rounded bg-nature-amber-500/20 text-nature-amber-700 dark:text-nature-amber-300 font-bold">
                {loadPct}% 強度
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              value={loadPct}
              onChange={(e) => setLoadPct(Number(e.target.value))}
              className="w-full accent-nature-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>30% (輕度日常)</span>
              <span>65% (一般肌耐力)</span>
              <span>85%+ (大重量或 0-2 RIR)</span>
            </div>
          </div>

          {/* Active Recruitment Status */}
          <div className="p-3 rounded-xl bg-nature-amber-500/10 border border-nature-amber-500/30 space-y-1">
            <div className="text-xs font-bold text-nature-amber-800 dark:text-nature-amber-300">
              {recruitment.levelZh}
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              {recruitment.summaryZh}
            </div>
          </div>

          {/* SVG Recruitment Staircase */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Henneman Recruitment Ladder">
                {/* 3 Steps */}
                {/* Type I */}
                <g>
                  <rect x="40" y="100" width="90" height="40" rx="6" fill="#10b981" fillOpacity="0.85" />
                  <text x="85" y="118" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Type I 慢肌</text>
                  <text x="85" y="132" fill="#cffafe" fontSize="8" textAnchor="middle">低閾值神經元</text>
                  <circle cx="85" cy="85" r="8" fill="#10b981" />
                  <text x="85" y="88" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">✓</text>
                </g>

                {/* Type IIa */}
                <g>
                  <rect x="145" y="65" width="95" height="75" rx="6" fill="#f59e0b" fillOpacity={loadPct >= 50 ? 0.9 : 0.25} />
                  <text x="192" y="85" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Type IIa 快肌</text>
                  <text x="192" y="100" fill="#fef3c7" fontSize="8" textAnchor="middle">中高閾值神經元</text>
                  <circle cx="192" cy="50" r="8" fill={loadPct >= 50 ? '#f59e0b' : '#64748b'} />
                  <text x="192" y="53" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">{loadPct >= 50 ? '✓' : '-'}</text>
                </g>

                {/* Type IIx */}
                <g>
                  <rect x="255" y="25" width="95" height="115" rx="6" fill="#ef4444" fillOpacity={loadPct >= 80 ? 0.9 : 0.2} />
                  <text x="302" y="45" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Type IIx 超速快肌</text>
                  <text x="302" y="60" fill="#fee2e2" fontSize="8" textAnchor="middle">高閾值 · 抗老關鍵</text>
                  <circle cx="302" cy="12" r="8" fill={loadPct >= 80 ? '#ef4444' : '#64748b'} />
                  <text x="302" y="15" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">{loadPct >= 80 ? '✓' : '-'}</text>
                </g>

                <line x1="30" y1="142" x2="360" y2="142" stroke="#64748b" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {STRENGTH_INFOGRAPHICS[2].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nature-amber-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 4: Supercompensation & Deload Cycles ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-nature-green-500 font-bold block">
                {STRENGTH_INFOGRAPHICS[3].id} · {STRENGTH_INFOGRAPHICS[3].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[3].title_zh : STRENGTH_INFOGRAPHICS[3].title_en}
              </h4>
            </div>
            <TrendingUp className="w-5 h-5 text-nature-green-500 shrink-0" />
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'zh-TW' ? STRENGTH_INFOGRAPHICS[3].subtitle_zh : STRENGTH_INFOGRAPHICS[3].subtitle_en}
          </p>

          {/* SVG Dual-Impulse Model Waveform */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 380 170" className="w-full h-full" role="img" aria-label="Supercompensation Curve">
                {/* Baseline */}
                <line x1="30" y1="85" x2="360" y2="85" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.2" />
                <text x="35" y="80" fill="#94a3b8" fontSize="8" fontFamily="monospace">基線體能 (Baseline)</text>

                {/* Stimulus Arrow */}
                <line x1="60" y1="30" x2="60" y2="80" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="60" y="25" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">訓練刺激</text>

                {/* Supercompensation Wave */}
                <path
                  d="M 60 85 C 80 135, 110 135, 140 100 C 170 65, 210 45, 250 50 C 290 55, 330 80, 360 85"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Fatigue dip marker */}
                <circle cx="95" cy="130" r="5" fill="#ef4444" />
                <text x="95" y="145" fill="#ef4444" fontSize="8" textAnchor="middle">1. 急性疲勞谷底</text>

                {/* Supercompensation peak marker */}
                <circle cx="230" cy="48" r="5" fill="#10b981" />
                <text x="230" y="40" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">2. 超補償黃金窗口 (48–72h)</text>

                {/* Involution */}
                <text x="330" y="75" fill="#94a3b8" fontSize="8" textAnchor="middle">3. 逐漸退回基線</text>
              </svg>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-nature-green-500/10 border border-nature-green-500/30 text-xs text-slate-700 dark:text-slate-300">
            <strong>週期化減量週 (Deload Week) 原則：</strong> 每連續 4–6 週高強度加載後，安排 1 週總組數減少 50%、負重減少 10%，能消除深層自律神經與關節結締組織疲勞，讓累積的適應全面兌現。
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            {STRENGTH_INFOGRAPHICS[3].core_takeaways_zh.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nature-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
