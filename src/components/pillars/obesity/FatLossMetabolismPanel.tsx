import React, { useState } from 'react';
import { FAT_LOSS_METABOLISM_STEPS } from '../../../data/obesityData';
import {
  Flame,
  Zap,
  Wind,
  ShieldAlert,
  Footprints,
  Activity,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  HeartPulse,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const FatLossMetabolismPanel: React.FC = () => {
  const [activeStepNum, setActiveStepNum] = useState<number>(1);
  const activeStep =
    FAT_LOSS_METABOLISM_STEPS.find((s) => s.step_number === activeStepNum) ||
    FAT_LOSS_METABOLISM_STEPS[0];

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* ── Sub-hero Banner ── */}
      <div className="rounded-3xl border border-rose-300/80 dark:border-rose-800/60 bg-gradient-to-r from-rose-50 via-amber-50/60 to-rose-100/40 dark:from-rose-950/50 dark:via-slate-900/90 dark:to-amber-950/40 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-mono font-bold">
              <Flame className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>生化生理學實證 · 脂肪動態代謝鏈</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              脂肪水解、CPT-1 穿梭與粒線體 β-氧化
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              打破「出汗排毒減脂」的低級迷思！減脂是一套極度嚴密的生化連鎖反應：從交感神經兒茶酚胺啟動、ATGL/HSL 三步剪切，到 CPT-1 穿梭與粒線體氧化，最後整整 84% 轉化為二氧化碳經由肺部呼吸吐出！
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0">
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-rose-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-rose-600 dark:text-rose-400">84%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">經呼吸吐出 (CO2)</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-rose-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-amber-600 dark:text-amber-400">&gt; 90%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">胰島素抑制脂解率</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-rose-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-emerald-600 dark:text-emerald-400">15-20%</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">安全熱量赤字區間</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-rose-200 dark:border-white/10 text-center shadow-xs">
              <div className="text-lg font-mono font-extrabold text-blue-600 dark:text-blue-400">10,000 步</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">NEAT 產熱防線</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 1: The 5-Stage Lipolysis & Oxidation Cascade ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>The 5-Step Lipolytic Cascade</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
              脂肪動員、水解、轉運與燃燒五部曲
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">點擊步聚逐步探索脂肪生化消亡史</span>
        </div>

        {/* 5-Step Horizontal Indicator */}
        <div className="grid grid-cols-5 gap-2">
          {FAT_LOSS_METABOLISM_STEPS.map((s) => {
            const isCurrent = s.step_number === activeStepNum;
            const isDone = s.step_number < activeStepNum;
            return (
              <button
                key={s.step_number}
                onClick={() => setActiveStepNum(s.step_number)}
                className={`btn-tactile p-3 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'border-rose-500 bg-rose-500 text-white shadow-md ring-2 ring-rose-500/20'
                    : isDone
                    ? 'border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:border-rose-300'
                }`}
              >
                <div className="font-mono text-xs font-extrabold">0{s.step_number}</div>
                <div className="text-[11px] font-bold mt-1 truncate hidden sm:block">
                  {s.stage_name_zh.split('：')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50/40 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-rose-950/20 border border-rose-200/80 dark:border-rose-900/60 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                STEP {activeStep.step_number} OF 5 · {activeStep.stage_name_en}
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                {activeStep.stage_name_zh}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                荷爾蒙調控：{activeStep.endocrine_regulators}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-[13px]">
              <Zap className="w-3.5 h-3.5 text-rose-600" />
              生化反應細節 (Biochemical Details)
            </span>
            <p className="text-slate-700 dark:text-slate-300 p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 font-medium">
              {activeStep.detailed_process_zh}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                關鍵阻斷因素 (Inhibiting Pitfalls)
              </span>
              <p className="text-slate-700 dark:text-slate-300">{activeStep.inhibition_factors_zh}</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-800/60 space-y-1">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                生活型態突破對策 (Actionable Strategy)
              </span>
              <p className="text-slate-700 dark:text-slate-300">{activeStep.actionable_strategy_zh}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800">
            <span className="text-[11px] font-mono text-slate-500">相關參與關鍵酵素：</span>
            {activeStep.biochemical_enzymes.map((enz, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 font-bold"
              >
                {enz}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 2: The Insulin Lipolytic Brake & Fasting Windows ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>The Molecular On/Off Switch</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
            胰島素脂解阻斷閥門：為什麼「少食多餐不停吃零食」無法減脂？
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            人體同一時間只能以「儲存 (Anabolism)」或「動員 (Catabolism)」為主導。胰島素是自然界最強大的抗脂解荷爾蒙。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              PDE3B 降解途徑
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              只要攝入精緻澱粉或含糖手搖飲，胰島素激增活化「磷酸二酯酶 3B (PDE3B)」，快速水解細胞內 cAMP。cAMP 下降使 PKA 失去活性，HSL 與 ATGL 瞬間失去磷酸化，脂肪分解立即全面煞停！
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              頑固脂肪 α2 受體詛咒
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              下腹部與大腿外側脂肪細胞上的「α2-腎上腺素受體」比例遠高於 β 受體。α2 受體結合兒茶酚胺後，反而抑制腺苷酸環化酶，導致此區域在微量胰島素存在時脂解完全癱瘓。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              12-14 小時低胰島素空窗
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              夜間入睡至隔日晨間維持 12-14 小時自然禁食，能讓全身體循環胰島素平穩歸於基線，解除 PDE3B 封鎖，為晨間輕有氧或日常 NEAT 創造最佳脂肪氧化化學環境。
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 3: Safe Deficit vs Radical Starvation & NEAT Defense ── */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Footprints className="w-3.5 h-3.5" />
            <span>Energy Availability & Metabolic Adaptation</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
            溫和赤字守護甲狀腺素與 NEAT 步數保衛戰
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            為什麼極端節食一定失敗？當熱量赤字 &gt; 30%，大腦誤以為遭遇飢荒，啟動「代謝適應 (Adaptive Thermogenesis)」，全面降低基礎代謝並掏空瘦素。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs leading-relaxed">
          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-3">
            <span className="font-bold text-sm text-rose-900 dark:text-rose-200 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-600" />
              極端斷崖式節食之生理惡果
            </span>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">✕</span>
                <span><strong>甲狀腺素 T3 崩跌 30-50%：</strong>肝臟脫碘酶受到抑制，活化型 T3 驟降，身體靜止代謝率大幅縮水。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">✕</span>
                <span><strong>瘦素 (Leptin) 斷崖墜落：</strong>下視丘飢餓神經元 NPY/AgRP 狂暴興奮，引發無法用意志力對抗的暴食渴求。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">✕</span>
                <span><strong>皮質醇慢性飆高：</strong>促進肌動蛋白與肌球蛋白水解 (MPB) 供能，出現「骨骼肌大量崩潰、體脂反彈」的肌少性肥胖。</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
            <span className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <Footprints className="w-4 h-4 text-emerald-600" />
              NEAT 每日 8,000-10,000 步保衛戰
            </span>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              節食期間，大腦會神不知鬼不覺地下調你的日常微動作（減少坐姿晃腿、減緩步速、避免站立），每日能量消耗可無聲無息減少 300-500 kcal！
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-medium">
              <span className="font-bold">臨床黃金守則：</span>
              嚴格設定每日 8,000 - 10,000 步的客觀步數底線，用智慧手錶監測，徹底粉碎大腦偷懶的補償機制，穩定維持全天高水平的游離脂肪酸氧化消耗。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
