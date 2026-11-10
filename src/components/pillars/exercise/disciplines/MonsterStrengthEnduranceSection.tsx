import React, { useState } from 'react';
import {
  Flame,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layers,
  BatteryCharging,
  Compass,
  ExternalLink,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Activity,
  Award,
  Gauge,
} from 'lucide-react';

type DeepTabId = 'SPECTRUM' | 'PYRAMID' | 'ENERGY' | 'ELASTIC';

interface DailyTaskScenario {
  id: string;
  label_zh: string;
  taskLoadKg: number;
  context_zh: string;
}

const DAILY_SCENARIOS: DailyTaskScenario[] = [
  {
    id: 'water_grandchild',
    label_zh: '抱孫子／搬整箱礦泉水 (20 kg)',
    taskLoadKg: 20,
    context_zh: '日常採買、抱孩童、從地上搬起宅配包裹與家電',
  },
  {
    id: 'luggage_stairs',
    label_zh: '提重物爬樓梯／出國大行李箱 (32 kg)',
    taskLoadKg: 32,
    context_zh: '將 28 吋滿載行李箱搬上公寓樓梯或高鐵行李架',
  },
  {
    id: 'hiking_descent',
    label_zh: '郊山百岳下坡單腿緩衝負荷 (48 kg)',
    taskLoadKg: 48,
    context_zh: '背負背包連續下坡數小時，單側膝髖瞬間承受之等價阻力',
  },
  {
    id: 'emergency_support',
    label_zh: '緊急攙扶滑倒家人／搬動家具 (60 kg)',
    taskLoadKg: 60,
    context_zh: '突發失衡瞬間穩住自己或撐住家人的最後一道防線',
  },
];

export const MonsterStrengthEnduranceSection: React.FC = () => {
  const [maxStrengthKg, setMaxStrengthKg] = useState<number>(75);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('luggage_stairs');
  const [activeDeepTab, setActiveDeepTab] = useState<DeepTabId>('SPECTRUM');

  const scenario = DAILY_SCENARIOS.find((s) => s.id === selectedScenarioId) || DAILY_SCENARIOS[1];
  const relativePct = Math.min(120, Math.round((scenario.taskLoadKg / maxStrengthKg) * 100));
  const safetyReservePct = Math.max(0, 100 - relativePct);

  // Estimate sustainable repetitions (Relative Muscular Endurance) from %1RM
  const estimateEnduranceReps = (pct: number): { repsText: string; status: string; toneClass: string; desc: string } => {
    if (pct > 100) {
      return {
        repsText: '0 下（超過能力極限）',
        status: '高受傷風險 · 無法獨力完成',
        toneClass: 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-300 dark:bg-rose-950/40 dark:border-rose-800/60',
        desc: '任務重量已超過你的最大肌力天花板！硬搬極易造成腰椎代償閃到腰或韌帶拉傷。',
      };
    }
    if (pct >= 88) {
      return {
        repsText: '1 – 3 下（逼近極限）',
        status: '神經高度緊繃 · 幾乎無耐力餘裕',
        toneClass: 'text-amber-800 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-800/60',
        desc: '做一下就用盡九成力氣，無法重複多次，稍微分心或姿勢偏移就可能受傷。',
      };
    }
    if (pct >= 72) {
      return {
        repsText: '8 – 11 下（中度吃力）',
        status: '尚可應付 · 短時間內會累積疲勞',
        toneClass: 'text-sky-800 bg-sky-50 border-sky-200 dark:text-sky-300 dark:bg-sky-950/40 dark:border-sky-800/60',
        desc: '具備基礎肌力，但連續操作數次後呼吸與肌肉明顯吃力，需要休息才能繼續。',
      };
    }
    if (pct >= 52) {
      return {
        repsText: '18 – 25 下（肌耐力充沛）',
        status: '穩定輸出 · 肌耐力表現優良',
        toneClass: 'text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800/60',
        desc: '因為最大肌力夠高，這項任務對你只佔約一半力量，能輕鬆連續重複而不易疲勞。',
      };
    }
    return {
      repsText: '35+ 下（游刃有餘）',
      status: '聯邦儲備充足 · 極高安全防線',
      toneClass: 'text-emerald-900 bg-emerald-100/80 border-emerald-300 dark:text-emerald-200 dark:bg-emerald-900/40 dark:border-emerald-700',
      desc: '最大肌力遠高於日常所需！任務重量對你而言輕如鴻毛，展現極佳的相對肌耐力與關節保護力。',
    };
  };

  const enduranceEval = estimateEnduranceReps(relativePct);

  return (
    <section
      id="strength-endurance-flagship"
      aria-labelledby="monster-flagship-title"
      className="rounded-3xl border border-emerald-200/90 bg-gradient-to-b from-emerald-50/60 via-white to-white p-5 sm:p-8 shadow-sm dark:border-emerald-900/60 dark:from-emerald-950/25 dark:via-salud-dark-card dark:to-salud-dark-card space-y-7 scroll-mt-24"
    >
      {/* Top Header & Philosophy Lead */}
      <div className="space-y-3 border-b border-emerald-200/60 dark:border-emerald-900/50 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white dark:bg-emerald-400 dark:text-slate-950">
              <Flame className="w-3.5 h-3.5" aria-hidden="true" />
              深度專題 · 最大肌力 × 肌耐力科學
            </span>
            <span className="rounded-full border border-emerald-300/80 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-800 dark:bg-slate-900/80 dark:text-emerald-300">
              整合怪獸訓練 (Monster Training) 與何立安博士實證觀點
            </span>
          </div>
          <a
            href="#learn/move/L-MOVE-08"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100/80 px-3 py-1.5 text-xs font-semibold text-emerald-950 hover:bg-emerald-200/70 dark:bg-emerald-900/50 dark:text-emerald-200 dark:hover:bg-emerald-800/60 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>先讀 6 分鐘白話小課：最大肌力與肌耐力</span>
            <ArrowRight className="w-3 h-3 shrink-0" aria-hidden="true" />
          </a>
        </div>

        <h2
          id="monster-flagship-title"
          className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug"
        >
          為什麼「先求最大肌力，再求肌耐力」？打破輕重量多次數的抗老迷思
        </h2>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
          許多人誤以為一般人或長輩只要做「輕重量、高次數」的肌耐力操或長時間散步就夠了。然而台灣肌力與體能訓練權威<strong>何立安博士（怪獸肌力及體能訓練中心創辦人）</strong>與現代運動醫學實證指出：人類老化流失最快的是<strong>肌肉、骨質與神經系統控制力</strong>。<strong>「最大肌力」是所有體能的地板指標與火車頭</strong>——當你把最大肌力的天花板拉高，原本吃力的日常重物變輕了，你的<strong>相對肌耐力（能重複的次數與持久度）</strong>自然會水漲船高。
        </p>

        {/* Three Golden Takeaways Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/70 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <TrendingUp className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>1. 最大肌力是體能的火車頭</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              最大肌力（1RM）決定力量的天花板。天花板越高，發展爆發力、防跌反應與日常肌耐力的空間就越大，且比心肺耐力更具長期「保值性」。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/70 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 dark:text-sky-300">
              <BatteryCharging className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>2. 相對肌耐力隨肌力倍增</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              沒有肌力支撐的耐力訓練容易累積關節磨損。先把最大肌力練強，日常負重從 80% 降為 40% 相對強度，耐力表現立刻倍增。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/70 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>3. 用常訓替代長照・游刃有餘</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              40 歲前超前部署人體自然動作（深蹲、硬舉、推拉、農夫走路），善用「彈性訓練法」保持游刃有餘，不練到力竭癱瘓也能終身強壯。
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator: Ceiling Determines Floor (Strength -> Relative Endurance) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Gauge className="w-4 h-4" aria-hidden="true" />
              互動體驗模擬器 · Ceiling Determines Endurance
            </span>
            <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white mt-0.5">
              「天花板決定地板」：看看最大肌力提升後，你的肌耐力如何自動暴增
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            先選一項生活任務，再拉動滑桿提升你的最大肌力
          </span>
        </div>

        {/* Step 1: Select Daily / Sport Task */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            步驟 1：選擇你要面對的生活或運動任務（固定外在重量）
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2" role="group" aria-label="生活或運動任務選擇">
            {DAILY_SCENARIOS.map((item) => {
              const active = item.id === selectedScenarioId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedScenarioId(item.id)}
                  className={`rounded-xl border p-3 text-left transition-all flex flex-col justify-between gap-1 ${
                    active
                      ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-700/20 dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-white'
                      : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold leading-snug">{item.label_zh}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{item.context_zh}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Adjust Max Strength Slider & Live Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pt-1">
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="max-strength-slider" className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  步驟 2：調整你的「最大肌力 (1RM)」天花板
                </label>
                <span className="text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {maxStrengthKg} kg
                </span>
              </div>
              <input
                id="max-strength-slider"
                type="range"
                min={30}
                max={120}
                step={5}
                value={maxStrengthKg}
                onChange={(e) => setMaxStrengthKg(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>35kg (久坐未訓練)</span>
                <span>75kg (規律訓練)</span>
                <span>110kg+ (強壯儲備)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: '久坐長輩 (35kg)', val: 35 },
                { label: '一般新手 (50kg)', val: 50 },
                { label: '規律重訓半年 (80kg)', val: 80 },
                { label: '扎實肌力儲備 (105kg)', val: 105 },
              ].map((preset) => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setMaxStrengthKg(preset.val)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    maxStrengthKg === preset.val
                      ? 'bg-emerald-700 text-white dark:bg-emerald-400 dark:text-slate-950'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Comparison Result */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60 space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3 border border-slate-200/70 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">任務佔最大肌力比例</span>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                  {relativePct}% <span className="text-xs font-normal text-slate-500">1RM</span>
                </span>
              </div>
              <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 p-3 border border-emerald-200/70 dark:border-emerald-900/50">
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block font-medium">相對肌耐力（可連續次數）</span>
                <span className="text-base sm:text-lg font-extrabold text-emerald-900 dark:text-emerald-200 block mt-0.5">
                  {enduranceEval.repsText}
                </span>
              </div>
              <div className="rounded-xl bg-sky-50/70 dark:bg-sky-950/30 p-3 border border-sky-200/70 dark:border-sky-900/50">
                <span className="text-[11px] text-sky-800 dark:text-sky-300 block font-medium">力量安全儲備餘裕</span>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-sky-900 dark:text-sky-200 tabular-nums">
                  {safetyReservePct}%
                </span>
              </div>
            </div>

            {/* Visual Load vs Reserve Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600 dark:text-slate-300">
                  當前任務負荷（{scenario.taskLoadKg} kg）vs. 最大肌力天花板（{maxStrengthKg} kg）
                </span>
                <span className="font-mono text-slate-500">
                  {relativePct <= 60 ? '舒適耐力區' : relativePct <= 85 ? '高負荷區' : '警戒極限區'}
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-300 ${
                    relativePct > 90
                      ? 'bg-rose-500'
                      : relativePct > 70
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, relativePct)}%` }}
                />
              </div>
            </div>

            <div className={`rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${enduranceEval.toneClass}`}>
              <strong className="font-bold mr-1.5">【{enduranceEval.status}】</strong>
              {enduranceEval.desc}
            </div>
          </div>
        </div>
      </div>

      {/* 4-Pillar Deep Dive Tabs: Spectrum, Training Pyramid, Energy Systems, Elastic Training */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>肌耐力 × 最大肌力 × 能量系統：四大核心知識模組</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">點選下方分頁切換深入圖表與訓練法則</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2" role="tablist" aria-label="肌力與肌耐力四大知識模組">
          {(
            [
              {
                id: 'SPECTRUM',
                label: '1. 最大肌力 vs 肌耐力光譜',
                sub: '負荷、次數與生理適應對照',
                icon: Activity,
              },
              {
                id: 'PYRAMID',
                label: '2. 訓練金字塔與自然動作',
                sub: '怪獸訓練三大動作選擇原則',
                icon: Compass,
              },
              {
                id: 'ENERGY',
                label: '3. 三大能量系統與肌力優先',
                sub: '磷化物、乳酸醣解與有氧協同',
                icon: Zap,
              },
              {
                id: 'ELASTIC',
                label: '4. 游刃有餘的彈性訓練法',
                sub: 'True / Daily / Easy Max 管理',
                icon: Award,
              },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeDeepTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDeepTab(tab.id)}
                className={`rounded-2xl border p-3.5 text-left transition-all flex flex-col justify-between gap-1 ${
                  active
                    ? 'border-emerald-700 bg-emerald-800 text-white shadow-xs dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-950'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </div>
                <span className={`text-[11px] ${active ? 'text-emerald-100 dark:text-slate-800' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Strength-Endurance Continuum Spectrum */}
        {activeDeepTab === 'SPECTRUM' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                肌力與肌耐力連續光譜（Repetition Continuum）：不同重量與次數到底在練什麼？
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                「最大肌力」與「肌耐力」不是對立的敵人，而是同一個光譜的兩端。大重量（1–5 下）優先改造神經徵召與骨密度；高反覆次數（15–20+ 下）優先改造微血管密度、粒線體與乳酸緩衝能力。
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200">
                    <th className="py-3 px-3.5 font-bold">訓練目標區間</th>
                    <th className="py-3 px-3.5 font-bold">強度 (%1RM) 與次數</th>
                    <th className="py-3 px-3.5 font-bold">組間休息</th>
                    <th className="py-3 px-3.5 font-bold">核心生理適應（神經／肌肉／骨骼／代謝）</th>
                    <th className="py-3 px-3.5 font-bold">日常與抗老實質意義</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                    <td className="py-3 px-3.5 font-bold text-emerald-900 dark:text-emerald-300">
                      最大肌力 (Max Strength)
                      <span className="block text-[11px] font-normal text-emerald-700 dark:text-emerald-400">★ 怪獸訓練核心火車頭</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      85%–100% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 1–5 下 (RIR 1–2)</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">3 – 5 分鐘</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      喚醒高閾值 Type IIx 快肌運動單位、提升中樞神經放電頻率 (Rate Coding)、最強縱向骨質壓電刺激
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      墊高所有體能的地板，直接拉高「相對肌耐力」，防骨鬆與防閃腰最有效
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">
                      爆發力 (Power / RFD)
                      <span className="block text-[11px] font-normal text-slate-500">力量 × 速度</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      30%–70% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 3–6 下（快速向心）</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">2 – 3 分鐘</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      縮短 100–200 毫秒內瞬間發力時間（發力率 RFD），延緩快縮肌纖維隨年齡萎縮
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      絆倒瞬間快速跨步穩住身體、上下樓梯與球類急停啟動的關鍵
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">
                      肌肥大 (Hypertrophy)
                      <span className="block text-[11px] font-normal text-slate-500">肌肉量與代謝池</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      65%–80% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 6–12 下 (RIR 1–3)</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">1.5 – 3 分鐘</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      機械張力結合代謝壓力，活化 mTORC1 擴增肌原纖維橫斷面積與肝醣儲存池
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      承接餐後 80% 血糖清除、改善胰島素敏感度、分泌抗老肌力素 (Myokines)
                    </td>
                  </tr>
                  <tr className="bg-sky-50/40 dark:bg-sky-950/20">
                    <td className="py-3 px-3.5 font-bold text-sky-900 dark:text-sky-300">
                      專項肌耐力 (Muscular Endurance)
                      <span className="block text-[11px] font-normal text-sky-700 dark:text-sky-400">★ 持久抗疲勞與微血管化</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      &lt; 65% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 15–25+ 下或持續負重</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">30 – 90 秒</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      促進局部微血管增生 (Capillarization)、粒線體酶活性提升、MCT1 乳酸穿梭清除與氫離子緩衝
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      長途登山健行不鐵腿、長時間維持良好軀幹姿勢、重複勞務不力竭
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Training Pyramid & Natural Human Movement */}
        {activeDeepTab === 'PYRAMID' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  怪獸訓練金字塔：階層分明、循序漸進
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  在何立安博士的訓練體系中，體能發展是有順序的。若底層的「動作控制與最大肌力」地基太窄，往上的爆發力與專項耐力就會像蓋在沙灘上的高樓，不僅容易遇到瓶頸，更常以慢性運動傷害收場。
                </p>

                <div className="space-y-2 pt-1">
                  {[
                    {
                      tier: '頂層（專項展現）',
                      name: '專項肌耐力、敏捷度與運動表現',
                      desc: '登山長距離耐力、球拍運動多拍來回、馬拉松後半程維持步態不崩潰。',
                      color: 'border-violet-300 bg-violet-50/60 dark:border-violet-800 dark:bg-violet-950/30',
                    },
                    {
                      tier: '中上層（力量轉化）',
                      name: '爆發力（Power）與三大能量系統體能',
                      desc: '將儲備的力量快速釋放（防跌反應、跳躍、衝刺間歇與高強度工作容量）。',
                      color: 'border-sky-300 bg-sky-50/60 dark:border-sky-800 dark:bg-sky-950/30',
                    },
                    {
                      tier: '中堅火車頭（核心地基）',
                      name: '最大肌力（Maximum Strength）',
                      desc: '全身多關節自由重量漸進超負荷，拉高神經徵召、肌肉與骨密度天花板。',
                      color: 'border-emerald-400 bg-emerald-50/80 dark:border-emerald-700 dark:bg-emerald-950/40',
                    },
                    {
                      tier: '最底層（安全前提）',
                      name: '人體自然動作控制、活動度與核心抗變形穩定',
                      desc: '呼吸腹內壓（360 度核心柱）、脊椎中立、髖關節絞鏈啟動與無痛關節活動度。',
                      color: 'border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30',
                    },
                  ].map((item) => (
                    <div key={item.tier} className={`rounded-xl border p-3 ${item.color}`}>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>{item.name}</span>
                        <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{item.tier}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  動作選擇三大鐵律：為什麼強調「人體自然動作」？
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  怪獸訓練強調以自由重量與全身多關節動作為主軸，並依循三大原則挑選動作，讓一般人與銀髮族都能安全獲得最大效益：
                </p>

                <ul className="space-y-3 pt-1">
                  <li className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-3.5 space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>1. 人體自然動作原則 (Human Natural Movement)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      選擇人體「原廠內建」的全身協同動作：<strong>蹲（深蹲）、髖鉸鏈（硬舉）、推（臥推/肩推/伏地挺身）、拉（划船/引體）、抱與負重行走（農夫走路）</strong>。這類動作能一次訓練整條動力鏈與核心穩定，最能轉移到日常生活。
                    </p>
                  </li>

                  <li className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-3.5 space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>2. 低風險原則 (Low Risk Principle)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      不選關節處於極端脆弱角度或高失誤代價的動作。例如初學者或長輩從<strong>六角槓硬舉（Trap Bar Deadlift）、高腳杯深蹲、箱上深蹲</strong>開始，力線居中、對下背剪力極小，安全又能持續加載。
                    </p>
                  </li>

                  <li className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-3.5 space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>3. 特殊變化度原則 (Specific Variation)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      針對不同骨架、關節活動度或舊傷，利用器材與握法微調（如瑞士槓、安全深蹲槓、地雷管推舉、分腿蹲），讓每個人都能找到「無痛且能漸進超負荷」的專屬動作版本。
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Energy Systems & Strength First */}
        {activeDeepTab === 'ENERGY' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                人體三大能量系統與「肌力優先（Strength First）」的體能訓練策略
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                何立安博士在解析能量系統時常提醒：人體的<strong>磷化物系統、快醣解（乳酸）系統、有氧氧化系統</strong>同時都在運作，只是依運動強度與時間改變佔比。若完全沒有肌力底子就只做大量慢跑，容易因肌力不足導致步態代償與膝踝勞損；<strong>先建立肌力，再搭配多樣化的能量系統訓練（如負重行走、風扇車、雪橇推拉或間歇訓練），能同時擁有強壯骨骼肌肉與頂級心肺耐力</strong>。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-4 dark:border-rose-900/50 dark:bg-rose-950/20 space-y-2">
                <span className="inline-block rounded-full bg-rose-100 dark:bg-rose-900/60 px-2.5 py-0.5 text-xs font-bold text-rose-900 dark:text-rose-200">
                  1. 磷化物系統 (ATP-CP)
                </span>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  極限爆發 · 0 – 10 秒
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>燃料：</strong>肌肉內儲存的腺苷三磷酸 (ATP) 與磷酸肌酸 (CP)，不需氧氣、不產乳酸，瞬間輸出功率最高。
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>代表訓練：</strong>1–5 下大重量深蹲硬舉、短距離全力衝刺、防跌瞬間跨步。組間需休息 3–5 分鐘讓磷酸肌酸回充。
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 space-y-2">
                <span className="inline-block rounded-full bg-amber-100 dark:bg-amber-900/60 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                  2. 快醣解／乳酸系統 (Glycolytic)
                </span>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  高強度肌耐力 · 15 秒 – 2 分鐘
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>燃料：</strong>快速分解肌肝醣與葡萄糖產生能量，伴隨乳酸與氫離子累積（酸脹感來源）。乳酸並非廢物，而是可經由 MCT 轉運蛋白再回收的心肌與大腦優質燃料！
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>代表訓練：</strong>8–20 下中高次數重訓、重裝農夫走路 45 秒、羽球多拍激烈對抽、高強度間歇 (HIIT)。
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20 space-y-2">
                <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  3. 有氧氧化系統 (Oxidative)
                </span>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  持久耐力與組間恢復 · 2 分鐘以上
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>燃料：</strong>在粒線體內利用氧氣燃燒脂肪與碳水化合物，產能容量無限大。<strong>有氧系統也是重訓「組與組之間幫你合成磷酸肌酸、清除疲勞」的幕後功臣！</strong>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>代表訓練：</strong>Zone 2 鼻呼吸快走/超慢跑、自行車、登山健行，為全身建立龐大的微血管與粒線體底盤。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Elastic Training & Three Maxes */}
        {activeDeepTab === 'ELASTIC' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                游刃有餘的「彈性訓練法」：認識 True Max、Daily Max 與 Easy Max
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                許多人不敢開始重訓，是因為害怕「每次都要練到力竭發抖、隔天全身痠痛到無法走路」。何立安博士近年大力倡導<strong>「保持游刃有餘，才能越戰越強」的彈性訓練法</strong>，這也與 <strong>ACSM 2026 實證立場聲明（每組保留 2–3 下餘力 RIR 2–3）</strong>完全吻合。透過區分三種極限指標，你不必透支中樞神經，就能安全、穩定地長期進步：
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="rounded-2xl border border-emerald-300/80 bg-emerald-50/50 p-4 dark:border-emerald-800/60 dark:bg-emerald-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">日常主軸 · 隨時可做</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-200/70 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200 font-bold">
                    約 80%–85%
                  </span>
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  Easy Max（輕鬆極限）
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>定義：</strong>不管今天有沒有睡飽、心情如何、甚至不做複雜心理建設，隨時走過去都能<strong>動作標準、游刃有餘完成</strong>的最高重量（約保留 2–3 下餘力）。
                </p>
                <p className="text-xs text-emerald-900 dark:text-emerald-300 font-medium">
                  ✓ 平日把訓練建立在 Easy Max 附近，累積高品質訓練量，完全不影響隔天上班與生活精神。
                </p>
              </div>

              <div className="rounded-2xl border border-sky-300/80 bg-sky-50/50 p-4 dark:border-sky-800/60 dark:bg-sky-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-800 dark:text-sky-300">當日狀態指標 · 穩健測試</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-200/70 dark:bg-sky-900 text-sky-950 dark:text-sky-200 font-bold">
                    約 90%–95%
                  </span>
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  Daily Max（當日極限）
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>定義：</strong>在當天身體狀況下，專注熱身後，<strong>不靠大吼大叫或扭曲姿勢硬撐（無技術崩潰 Technical Breakdown）</strong>能完成的最大重量。
                </p>
                <p className="text-xs text-sky-900 dark:text-sky-300 font-medium">
                  ✓ 用來客觀監控身體疲勞：若今天的 Daily Max 明顯掉下來，代表睡眠或恢復不足，當天即彈性減量。
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300/80 bg-amber-50/50 p-4 dark:border-amber-800/60 dark:bg-amber-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300">罕用極限 · 需長時間恢復</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900 text-amber-950 dark:text-amber-200 font-bold">
                    100% 絕對極限
                  </span>
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  True Max（真實極限）
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>定義：</strong>在天時地利人和、腎上腺素全開下榨乾全身力氣舉起的極限。雖然數字好看，但會造成巨大的中樞神經與結締組織疲勞。
                </p>
                <p className="text-xs text-amber-900 dark:text-amber-300 font-medium">
                  ⚠️ 一般健康訓練者「不需要」常測 True Max！把 Easy Max 與 Daily Max 穩步推高，你的真實極限自然水漲船高。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reference & External Learning Card (Monster Training + Dr. Ho Li-An Interviews) */}
      <div className="rounded-2xl border border-emerald-200/80 bg-white/95 p-4 sm:p-5 dark:border-emerald-900/50 dark:bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>深入學習資源 · 怪獸訓練與何立安博士科學化訓練體系</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            想進一步觀看動作示範、自由重量抗老化實例與深入訪談（如《SBD怪獸講堂》最大肌力與能量系統、中高齡大重量訓練實證），可參考怪獸肌力及體能訓練中心官方網站與 YouTube 專題訪談。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://www.monstertraining.com.tw/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 transition-colors"
          >
            <span>怪獸訓練官方網站</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/results?search_query=%E4%BD%95%E7%AB%8B%E5%AE%89+%E6%9C%80%E5%A4%A7%E8%82%8C%E5%8A%9B+%E8%82%8C%E8%80%90%E5%8A%9B+%E6%80%AA%E7%8D%B8%E8%A8%93%E7%B7%B4"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-emerald-400 transition-colors"
          >
            <span>YouTube 何立安博士肌力訪談</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
