import React, { useState } from 'react';
import {
  HYPERTROPHY_MECHANISMS,
  MUSCLE_GROUP_VOLUMES,
  LEUCINE_MPS_PROTOCOLS,
} from '../../../data/obesityData';
import {
  Dumbbell,
  Zap,
  Flame,
  Activity,
  Award,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const MuscleHypertrophyPanel: React.FC = () => {
  const [selectedMechanismId, setSelectedMechanismId] = useState<string>(HYPERTROPHY_MECHANISMS[0].id);
  const [selectedMuscleIndex, setSelectedMuscleIndex] = useState<number>(0);

  const activeMechanism =
    HYPERTROPHY_MECHANISMS.find((m) => m.id === selectedMechanismId) || HYPERTROPHY_MECHANISMS[0];
  const activeMuscle = MUSCLE_GROUP_VOLUMES[selectedMuscleIndex] || MUSCLE_GROUP_VOLUMES[0];

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* ── Sub-hero Banner ── */}
      <div className="rounded-3xl border border-emerald-300/80 dark:border-emerald-700/60 bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-100/40 dark:from-emerald-950/50 dark:via-slate-900/90 dark:to-cyan-950/40 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold">
              <Dumbbell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Schoenfeld 運動生理學實證 · 肌肥大金三角</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              增肌肌肥大生化機轉與漸進式超負荷
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              肌肉不只是體態外觀，更是人體最大的「葡萄糖水庫」與「長壽代謝器官」！拒絕低效率盲練，從分子機械轉導 (mTORC1)、代謝壓力乳酸徵召、到長肌纖維長度拉伸超負荷 (Loaded Stretch)，全面掌握現代運動科學。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0">
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-emerald-600 dark:text-emerald-400">10-20 組</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">每週最佳有效組數</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-teal-600 dark:text-cyan-400">RIR 1-3</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">保留次數最佳區間</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-emerald-600 dark:text-emerald-400">≥ 2.7g</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">每餐白胺酸觸發閾值</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-cyan-600 dark:text-cyan-400">+35%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">長肌拉伸增肌優勢</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 1: The 3 Core Hypertrophy Mechanisms Interactive Explorer ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Molecular Triad of Hypertrophy</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
              肌肥大三大分子生化途徑解析
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">點擊切換查看細胞層級作用機制</span>
        </div>

        {/* Mechanism Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {HYPERTROPHY_MECHANISMS.map((m) => {
            const isSelected = m.id === selectedMechanismId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMechanismId(m.id)}
                className={`btn-tactile p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-emerald-300 dark:hover:border-emerald-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {m.badge}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {m.name_zh.split('——')[0]}
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {m.name_en}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mechanism Deep Dive Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950 dark:to-[#12221b] border border-emerald-200/80 dark:border-emerald-800/50 space-y-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{activeMechanism.name_zh}</span>
            </h4>
            <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
              <span className="font-bold">生化信號途徑：</span> {activeMechanism.molecular_pathway}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="space-y-2 p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[13px]">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                細胞生理學深層機轉
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {activeMechanism.mechanism_detail_zh}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[13px]">
                <Dumbbell className="w-3.5 h-3.5 text-teal-600" />
                訓練現場實戰操作指南
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {activeMechanism.practical_execution_zh}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 flex items-start gap-3 text-xs">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-amber-900 dark:text-amber-200">
              <span className="font-bold">運動生理學珍珠 (Clinical Pearl)：</span>
              {activeMechanism.clinical_pearl_zh}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono text-slate-500 mr-2">靶向關鍵分子：</span>
            {activeMechanism.key_molecules.map((mol, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              >
                {mol}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 2: Major Muscle Groups Weekly Volume & Progressive Overload Matrix ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Volume & Frequency Prescription</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
              各大肌群每週最佳訓練音量與長肌拉伸動作庫
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">根據 Mike Israetel / Brad Schoenfeld 音量指引</span>
        </div>

        {/* Muscle Selector Pill Row */}
        <div className="flex flex-wrap gap-2">
          {MUSCLE_GROUP_VOLUMES.map((mg, idx) => {
            const isSelected = idx === selectedMuscleIndex;
            return (
              <button
                key={idx}
                onClick={() => setSelectedMuscleIndex(idx)}
                className={`btn-tactile px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-600 text-white shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-teal-300'
                }`}
              >
                {mg.muscle_group_zh.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Selected Muscle Group Blueprint Card */}
        <div className="p-6 rounded-2xl border border-teal-200/80 dark:border-teal-900/60 bg-gradient-to-br from-teal-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-teal-950/20 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-3">
            <div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                {activeMuscle.muscle_group_zh}
              </h4>
              <span className="text-xs font-mono text-slate-500">{activeMuscle.muscle_group_en}</span>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
              建議每週頻率：{activeMuscle.frequency_per_week}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 font-mono text-[11px]">每週最高可恢復音量 (MRV)</span>
              <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                {activeMuscle.weekly_mrv_sets}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 font-mono text-[11px]">最佳次數強度區間 (Reps)</span>
              <div className="font-extrabold text-teal-700 dark:text-teal-400 text-sm">
                {activeMuscle.rep_range}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-slate-500 font-mono text-[11px]">保留次數 (RIR 指導)</span>
              <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                {activeMuscle.rir_recommendation}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">長肌拉伸負荷動作</span>
              <div className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm">
                {activeMuscle.stretch_loaded_exercise}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">生物力學與解剖學要點：</span>
              {activeMuscle.biomechanical_note}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Protein Synthesis & Leucine Trigger Threshold ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Nutritional Kinetics & mTORC1 Activation</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
            肌肉蛋白質合成 (MPS) 與白胺酸閾值 (Leucine Trigger)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            不是「每天吃了 100g 蛋白」就算達標！單餐若未達白胺酸門檻，Sestrin2 無法釋放 GATOR2，mTORC1 將始終處於半休眠狀態。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
            <span className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              四大核心同化營養原則
            </span>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong className="text-slate-900 dark:text-white">每日總量標準：</strong>{LEUCINE_MPS_PROTOCOLS.daily_target_recomp}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong className="text-slate-900 dark:text-white">單餐白胺酸閾值：</strong>{LEUCINE_MPS_PROTOCOLS.leucine_trigger_threshold}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong className="text-slate-900 dark:text-white">單餐分量公式：</strong>{LEUCINE_MPS_PROTOCOLS.protein_distribution_rule}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong className="text-slate-900 dark:text-white">餐次時序分配：</strong>{LEUCINE_MPS_PROTOCOLS.optimal_meals_per_day}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong className="text-slate-900 dark:text-white">夜間慢釋酪蛋白：</strong>{LEUCINE_MPS_PROTOCOLS.pre_bed_casein_protocol}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              常見富含白胺酸之天然食材實測表
            </span>
            <div className="space-y-1.5 overflow-y-auto max-h-56 pr-1">
              {LEUCINE_MPS_PROTOCOLS.common_leucine_sources.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">{item.food_zh}</div>
                    <div className="text-[10px] text-slate-500">{item.note}</div>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950 px-2 py-0.5 rounded-lg border border-emerald-300/60 dark:border-emerald-800">
                    {item.leucine_g}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
