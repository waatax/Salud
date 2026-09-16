import React, { useState, useMemo } from 'react';
import { BODY_RECOMP_CANDIDATES } from '../../../data/obesityData';
import {
  Scale,
  Dumbbell,
  Flame,
  Activity,
  Calculator,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  Calendar,
} from 'lucide-react';

type GoalMode = 'RECOMP' | 'LEAN_BULK' | 'FAT_CUT';

export const BodyRecompositionCalculator: React.FC = () => {
  // Input states
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [bodyFatPct, setBodyFatPct] = useState<number>(20);
  const [activityFactor, setActivityFactor] = useState<number>(1.375); // 1.2, 1.375, 1.55, 1.725
  const [goalMode, setGoalMode] = useState<GoalMode>('RECOMP');

  // Candidate phenotype card selection
  const [selectedCandidateIdx, setSelectedCandidateIdx] = useState<number>(0);

  // Calculations
  const calculations = useMemo(() => {
    const lbmKg = weightKg * (1 - bodyFatPct / 100);
    const fatKg = weightKg * (bodyFatPct / 100);

    // Katch-McArdle BMR (accurate with body fat)
    const bmr = 370 + 21.6 * lbmKg;
    const tdee = Math.round(bmr * activityFactor);

    let calorieTarget = tdee;
    let proteinPerKg = 2.0;
    let fatPctOfCalories = 0.25;

    if (goalMode === 'RECOMP') {
      // 10% deficit or maintenance
      calorieTarget = Math.round(tdee * 0.92);
      proteinPerKg = 2.2;
      fatPctOfCalories = 0.25;
    } else if (goalMode === 'LEAN_BULK') {
      calorieTarget = Math.round(tdee + 280);
      proteinPerKg = 1.9;
      fatPctOfCalories = 0.25;
    } else if (goalMode === 'FAT_CUT') {
      calorieTarget = Math.round(tdee * 0.80);
      proteinPerKg = 2.3; // extra high protein to prevent sarcopenia
      fatPctOfCalories = 0.22;
    }

    const proteinGrams = Math.round(weightKg * proteinPerKg);
    const proteinCalories = proteinGrams * 4;

    const fatCalories = Math.round(calorieTarget * fatPctOfCalories);
    const fatGrams = Math.round(fatCalories / 9);

    const remainingCaloriesForCarbs = Math.max(0, calorieTarget - proteinCalories - fatCalories);
    const carbGrams = Math.round(remainingCaloriesForCarbs / 4);

    const mealsPerDay = 4;
    const proteinPerMeal = (proteinGrams / mealsPerDay).toFixed(1);
    const estLeucinePerMeal = (parseFloat(proteinPerMeal) * 0.09).toFixed(1); // ~9% leucine in complete protein

    // 12-week forecast
    let estMuscleChangeKg = 0;
    let estFatChangeKg = 0;

    if (goalMode === 'RECOMP') {
      estMuscleChangeKg = 1.8;
      estFatChangeKg = -2.6;
    } else if (goalMode === 'LEAN_BULK') {
      estMuscleChangeKg = 2.4;
      estFatChangeKg = 0.8;
    } else if (goalMode === 'FAT_CUT') {
      estMuscleChangeKg = 0.2;
      estFatChangeKg = -4.8;
    }

    return {
      lbmKg: lbmKg.toFixed(1),
      fatKg: fatKg.toFixed(1),
      bmr: Math.round(bmr),
      tdee,
      calorieTarget,
      proteinGrams,
      carbGrams,
      fatGrams,
      proteinPerMeal,
      estLeucinePerMeal,
      estMuscleChangeKg,
      estFatChangeKg,
    };
  }, [sex, age, heightCm, weightKg, bodyFatPct, activityFactor, goalMode]);

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* ── Sub-hero Banner ── */}
      <div className="rounded-3xl border border-cyan-300/80 dark:border-cyan-800/60 bg-gradient-to-r from-cyan-50 via-teal-50/60 to-emerald-100/40 dark:from-cyan-950/50 dark:via-slate-900/90 dark:to-emerald-950/40 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold">
              <Calculator className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>身體組成重構模型 (Body Recomposition Matrix)</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              同步增肌減脂試算器與實戰週期化
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              傳統健身界誤以為「增肌必須大吃變胖、減脂必須少吃掉肌肉」。人體是開放性熱力學系統：在充足蛋白質與高機械張力下，身體會動員自體高密度脂肪庫作為合成肌肉的能量來源！
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0">
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-cyan-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-cyan-600 dark:text-cyan-400">2.0-2.4g</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">防禦蛋白質/kg</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-cyan-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-emerald-600 dark:text-emerald-400">7,700 kcal</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">每公斤內源脂肪供能</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-cyan-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-teal-600 dark:text-cyan-400">Katch-McArdle</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">精準去脂體重代謝</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-cyan-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-indigo-600 dark:text-indigo-400">Diet Break</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">瘦素重置週期化</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 1: The Interactive Recomp Calculator ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Personalized Energy & Macro Prescription</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
              個人體組成與三大營養素精算引擎
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">動態調整參數，即時更新巨量分配</span>
        </div>

        {/* Goal Mode Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'RECOMP' as GoalMode,
              title: '雙軌同步增肌減脂 (Recomp)',
              desc: '微赤字 8% · 肌肉增長同時體脂下降',
              badge: '推薦表型首選',
              color: 'cyan',
            },
            {
              id: 'LEAN_BULK' as GoalMode,
              title: '精準純增肌 (Lean Bulk)',
              desc: '微盈餘 +280 kcal · 極小化脂肪增幅',
              badge: '低體脂進階者',
              color: 'emerald',
            },
            {
              id: 'FAT_CUT' as GoalMode,
              title: '科學高效減脂 (Cut)',
              desc: '赤字 20% · 超高蛋白防禦骨骼肌',
              badge: '高體脂衝刺',
              color: 'rose',
            },
          ].map((mode) => {
            const isSelected = goalMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setGoalMode(mode.id)}
                className={`btn-tactile p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/40 shadow-sm ring-2 ring-cyan-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-cyan-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {mode.badge}
                  </span>
                  {isSelected && <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">{mode.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{mode.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <label className="font-mono text-slate-500 block">生理性別</label>
            <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setSex('male')}
                className={`flex-1 py-1 font-bold ${
                  sex === 'male' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                男
              </button>
              <button
                onClick={() => setSex('female')}
                className={`flex-1 py-1 font-bold ${
                  sex === 'female' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                女
              </button>
            </div>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <label className="font-mono text-slate-500 block">體重 (kg)</label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(Math.max(35, parseFloat(e.target.value) || 0))}
              className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-slate-900 dark:text-white text-center"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <label className="font-mono text-slate-500 block">體脂率 (%)</label>
            <input
              type="number"
              value={bodyFatPct}
              onChange={(e) => setBodyFatPct(Math.min(60, Math.max(5, parseFloat(e.target.value) || 0)))}
              className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-cyan-600 dark:text-cyan-400 text-center"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <label className="font-mono text-slate-500 block">身高 (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Math.max(120, parseFloat(e.target.value) || 0))}
              className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-slate-900 dark:text-white text-center"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <label className="font-mono text-slate-500 block">年齡</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Math.max(15, parseInt(e.target.value) || 0))}
              className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-slate-900 dark:text-white text-center"
            />
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <label className="font-mono text-slate-500 block">每週活動量</label>
            <select
              value={activityFactor}
              onChange={(e) => setActivityFactor(parseFloat(e.target.value))}
              className="w-full p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value={1.2}>久坐辦公 (1.2)</option>
              <option value={1.375}>每週練 1-3 天 (1.375)</option>
              <option value={1.55}>每週練 3-5 天 (1.55)</option>
              <option value={1.725}>高強度運動員 (1.725)</option>
            </select>
          </div>
        </div>

        {/* Calculated Results Showcase Card */}
        <div className="p-6 rounded-2xl border border-cyan-200 dark:border-cyan-900/60 bg-gradient-to-br from-cyan-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-cyan-950/20 space-y-6">
          {/* Top Row: Metabolic Benchmarks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500">去脂體重 (LBM)</div>
              <div className="text-base font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">
                {calculations.lbmKg} <span className="text-xs">kg</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500">脂肪質量 (Fat Mass)</div>
              <div className="text-base font-mono font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
                {calculations.fatKg} <span className="text-xs">kg</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-slate-500">基礎代謝 (BMR)</div>
              <div className="text-base font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">
                {calculations.bmr} <span className="text-xs">kcal</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-100/70 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-800">
              <div className="text-[11px] font-mono text-cyan-800 dark:text-cyan-300 font-bold">每日熱量目標</div>
              <div className="text-base font-mono font-extrabold text-cyan-950 dark:text-cyan-200 mt-0.5">
                {calculations.calorieTarget} <span className="text-xs">kcal</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Macronutrient Distribution */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              <span>三大巨量營養素每日克數配比</span>
              <span className="text-slate-500">熱量總和：{calculations.calorieTarget} kcal</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300">蛋白質 (Protein)</span>
                  <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400">4 kcal/g</span>
                </div>
                <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                  {calculations.proteinGrams} <span className="text-xs">g / 日</span>
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  約 {(calculations.proteinGrams / weightKg).toFixed(1)} g/kg，防禦肌肉流失與驅動 MPS。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 dark:text-amber-300">碳水化合物 (Carbs)</span>
                  <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400">4 kcal/g</span>
                </div>
                <div className="text-xl font-mono font-extrabold text-amber-700 dark:text-amber-400">
                  {calculations.carbGrams} <span className="text-xs">g / 日</span>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">
                  訓練日蓄滿肌肝醣、提升訓練爆發力與阻抗中樞疲勞。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300/80 dark:border-blue-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 dark:text-blue-300">必需脂肪 (Fats)</span>
                  <span className="font-mono text-[10px] text-blue-700 dark:text-blue-400">9 kcal/g</span>
                </div>
                <div className="text-xl font-mono font-extrabold text-blue-700 dark:text-blue-400">
                  {calculations.fatGrams} <span className="text-xs">g / 日</span>
                </div>
                <p className="text-[11px] text-blue-800 dark:text-blue-300">
                  守護睪固酮與雌激素荷爾蒙合成底線，維持細胞膜穩定。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: Leucine & 12-Week Trajectory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-200/70 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-cyan-600" />
                單餐白胺酸達標試算 (4 餐分配)
              </span>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 font-mono">
                <span className="text-slate-600 dark:text-slate-400">每餐平均蛋白質：</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{calculations.proteinPerMeal} g</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 font-mono">
                <span className="text-slate-600 dark:text-slate-400">預估單餐天然白胺酸：</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">~{calculations.estLeucinePerMeal} g (≥ 2.7g 達標！)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                預期 12 週體組成動態走勢
              </span>
              <div className="grid grid-cols-2 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-sans block">去脂肌肉預期</span>
                  <span className="font-bold text-emerald-600 text-sm">+{calculations.estMuscleChangeKg} kg</span>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                  <span className="text-[10px] text-rose-800 dark:text-rose-300 font-sans block">純脂肪質量預期</span>
                  <span className="font-bold text-rose-600 text-sm">{calculations.estFatChangeKg} kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Recomp Prime Candidate Phenotypes ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Target Clinical Phenotypes</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
              誰最適合「同時增肌減脂」？四大黃金表型對症下藥
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">點擊查看各大表型專屬飲食訓練計畫</span>
        </div>

        {/* Candidate Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BODY_RECOMP_CANDIDATES.map((cand, idx) => {
            const isSelected = idx === selectedCandidateIdx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCandidateIdx(idx)}
                className={`btn-tactile p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-emerald-300'
                }`}
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {cand.phenotype_zh.split('/')[0]}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-1 line-clamp-1">
                  {cand.phenotype_en}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Candidate Strategy Details */}
        {(() => {
          const c = BODY_RECOMP_CANDIDATES[selectedCandidateIdx];
          return (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/30 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-4 text-xs">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {c.phenotype_zh}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mt-1 font-medium">
                  {c.physiological_basis_zh}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500">熱量策略</span>
                  <div className="font-bold text-slate-900 dark:text-white">{c.calorie_strategy_zh}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-600">蛋白質需求</span>
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">{c.protein_requirement_zh}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-teal-600">訓練處方重心</span>
                  <div className="font-bold text-slate-900 dark:text-white">{c.training_focus_zh}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-cyan-600">預期時程轉變</span>
                  <div className="font-bold text-cyan-700 dark:text-cyan-400">{c.expected_timeline_zh}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
