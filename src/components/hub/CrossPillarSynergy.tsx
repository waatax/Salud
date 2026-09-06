import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  Heart,
  Dumbbell,
  Moon,
  Pill,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Droplets,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface SynergyGoal {
  id: string;
  icon: string;
  badge: string;
  title_zh: string;
  title_en: string;
  targetPopulation_zh: string;
  targetPopulation_en: string;
  coreMechanism_zh: string;
  coreMechanism_en: string;
  clinicalEndpoints_zh: string[];
  clinicalEndpoints_en: string[];
  pillarActions: {
    diet_zh: string;
    diet_en: string;
    exercise_zh: string;
    exercise_en: string;
    sleep_zh: string;
    sleep_en: string;
    supplements_zh: string;
    supplements_en: string;
  };
  evidenceGrade: 'A' | 'B';
  keyBiomarkers: string[];
}

export const SYNERGY_GOALS: SynergyGoal[] = [
  {
    id: 'METABOLIC_SYNDROME',
    icon: '⚡',
    badge: '代謝醫學 · 一線整合處方',
    title_zh: '代謝症候群與第二型糖尿病逆轉協同處方',
    title_en: 'Metabolic Syndrome & Insulin Resistance Reversal Synergy',
    targetPopulation_zh: '空腹血糖 ≥ 100 mg/dL、腰圍超標（男≥90cm/女≥80cm）、三酸甘油酯過高者',
    targetPopulation_en: 'Fasting glucose ≥ 100 mg/dL, elevated waist circumference, hypertriglyceridemia',
    coreMechanism_zh:
      '胰島素阻抗本質為細胞內異位脂肪堆積（骨骼肌與肝細胞脂質毒性）。透過飲食限制精緻醣源切斷高胰島素血症，配合 Zone 2 運動大量激活 GLUT4 非胰島素依賴型葡萄糖轉運蛋白與粒線體氧化，並以深層慢波睡眠阻斷夜間皮質醇（Cortisol）升糖反應。',
    coreMechanism_en:
      'Insulin resistance originates from ectopic lipid accumulation. Dietary carbohydrate restriction blunts hyperinsulinemia, while Zone 2 exercise activates non-insulin-dependent GLUT4 translocation and mitochondrial biogenesis, reinforced by slow-wave sleep blunting nocturnal cortisol-induced gluconeogenesis.',
    clinicalEndpoints_zh: [
      'HbA1c 糖化血色素下降 0.8% - 1.5%',
      'HOMA-IR 胰島素阻抗指數下降 ≥ 35%',
      '內臟脂肪面積（VFA）縮小 20% - 30%',
      '三酸甘油酯/高密度脂蛋白（TG/HDL）比值回落至 < 2.0',
    ],
    clinicalEndpoints_en: [
      'HbA1c reduction of 0.8% - 1.5%',
      'HOMA-IR index decrease ≥ 35%',
      'Visceral fat area (VFA) reduction of 20% - 30%',
      'TG/HDL ratio normalization to < 2.0',
    ],
    pillarActions: {
      diet_zh:
        '實施地中海或低醣飲食：飽和脂肪 < 7%E，以特級初榨橄欖油（MUFA）取代動物油；每餐嚴格遵守「蔬菜→蛋白質→優質脂質→複合澱粉」進食順序，抹平餐後血糖尖峰（Glucose Spike）。',
      diet_en:
        'Adopt Mediterranean or Low-Carb diet: SFA < 7%E, substitute with EVOO (MUFA); enforce meal sequencing (Veg -> Protein -> Fats -> Starch) to blunt postprandial glucose excursions.',
      exercise_zh:
        '每週至少 150 分鐘 Zone 2 低強度有氧（FatMax 最大脂肪燃燒區間），促進肌細胞粒線體生物合成；每餐後立即進行 10-15 分鐘輕鬆步行（NEAT 激活肌肉葡萄糖即時攝取）。',
      exercise_en:
        'Accumulate ≥ 150 min/wk of Zone 2 endurance (FatMax zone) to stimulate mitochondrial biogenesis; execute 10-15 min post-meal walks for immediate non-insulin mediated glucose clearance.',
      sleep_zh:
        '維持每夜 7-8 小時規則睡眠；前半夜深度慢波睡眠（N3）可將交感神經活性降至最低，防止黎明現象（Dawn Phenomenon）造成的夜間肝臟糖質新生異常亢進。',
      sleep_en:
        'Secure 7-8h nocturnal sleep; robust N3 slow-wave sleep downregulates sympathetic tone and blunts dawn phenomenon hepatic gluconeogenesis.',
      supplements_zh:
        '經醫師評估補充微量元素鉻（Chromium 200μg）、小蘗鹼（Berberine 500mg 餐前，需防低血糖）與甘胺酸鎂（Magnesium Glycinate 300mg 提升胰島素敏感度）。',
      supplements_en:
        'Under physician supervision: Chromium picolinate (200μg), Berberine (500mg tid before meals), and Magnesium Glycinate (300mg) for insulin receptor sensitization.',
    },
    evidenceGrade: 'A',
    keyBiomarkers: ['HbA1c', 'HOMA-IR', 'Fasting Insulin', 'TG/HDL Ratio', 'Uric Acid'],
  },
  {
    id: 'LONGEVITY_SARCOPENIA',
    icon: '💪',
    badge: '抗老長壽 · 肌肉儲備處方',
    title_zh: '高齡抗衰弱、肌少症逆轉與長壽動力鏈協同處方',
    title_en: 'Healthy Aging, Sarcopenia Reversal & Longevity Synergy',
    targetPopulation_zh: '40 歲以上肌力年流失 1% 者、步速緩慢（< 1.0 m/s）、握力不足（男<28kg/女<18kg）',
    targetPopulation_en: 'Adults 40+ with progressive muscle loss, slow gait (<1.0 m/s), low grip strength',
    coreMechanism_zh:
      '肌肉是人體最大的代謝與內分泌器官，分泌超過 600 種肌肉性荷爾蒙（Myokines 如 IL-6、Irisin、BDNF）。透過足量必需胺基酸（白胺酸觸發 mTORC1 蛋白合成開關），結合漸進式抗阻力訓練製造機械張力，並在慢波深睡期分泌脈衝式生長激素（Growth Hormone）進行組織修復。',
    coreMechanism_en:
      'Skeletal muscle functions as the primary endocrine buffer, secreting restorative myokines (Irisin, BDNF). Synergizes leucine-triggered mTORC1 protein synthesis with mechanical tension resistance training and nocturnal growth hormone pulses during slow-wave sleep.',
    clinicalEndpoints_zh: [
      '四肢骨骼肌質量指數（ASMI）提升 ≥ 0.5 kg/m²',
      '雙手握力提升 15% - 25%',
      '長者 5 次起坐測試時間縮短至 < 10 秒',
      '全因死亡率與骨折失能風險顯著下降 30% - 40%',
    ],
    clinicalEndpoints_en: [
      'Appendicular Skeletal Muscle Index (ASMI) + ≥ 0.5 kg/m²',
      'Grip strength improvement of 15% - 25%',
      '5-time sit-to-stand time reduced to < 10 seconds',
      'All-cause mortality and disability risk decreased by 30% - 40%',
    ],
    pillarActions: {
      diet_zh:
        '每日蛋白質攝取 1.2 - 1.6 g/kg；每餐均勻分配 25-35g 優質蛋白，確保單餐白胺酸（Leucine）達到 2.7 - 3.0g 的合成觸發閾值；補充足量水分防止肌肉細胞萎縮脫水。',
      diet_en:
        'Target 1.2 - 1.6 g/kg daily protein, evenly distributed across meals (25-35g/meal) to surpass the 2.7 - 3.0g leucine anabolic trigger threshold.',
      exercise_zh:
        '每週 2-3 次全身大肌群漸進式抗阻力訓練（蹲、推、拉、鉸鏈、分腿走）；每個動作每週達到 MEV-MAV 有效訓練組數（10-15 組），刺激 II 型快縮肌纖維肥大。',
      exercise_en:
        'Engage in 2-3 weekly resistance sessions targeting fundamental compound movement patterns; sustain 10-15 weekly sets within the MEV-MAV spectrum to preserve Type II fast-twitch fibers.',
      sleep_zh:
        '確保夜間 N3 深度慢波睡眠達到整夜 15-20%；此階段為腦下垂體分泌生長激素（GH）與 IGF-1 之生理高峰，是蛋白質合成與結締組織微創傷修復之生理窗口。',
      sleep_en:
        'Maintain N3 slow-wave sleep at 15-20% of the total hypnogram; this represents the biological peak of pulsatile growth hormone (GH) and IGF-1 secretion.',
      supplements_zh:
        '一水肌酸（Creatine Monohydrate 3-5g/日，提升肌內磷酸肌酸儲備與高強度做功能力）+ 維生素 D3（2000 IU/日）+ 維生素 K2（MK-7 100μg 導鈣入骨防止血管鈣化）。',
      supplements_en:
        'Creatine monohydrate (3-5g/day for phosphocreatine resynthesis) + Vitamin D3 (2000 IU/day) combined with Vitamin K2 (MK-7 100μg for bone mineralization).',
    },
    evidenceGrade: 'A',
    keyBiomarkers: ['ASMI', 'Grip Strength', 'Serum Albumin', '25(OH)D', 'IGF-1'],
  },
  {
    id: 'CARDIOVASCULAR_ASCVD',
    icon: '❤️',
    badge: '心血管 · 動脈硬化阻斷處方',
    title_zh: '高血壓、動脈粥狀硬化與冠心病全時防禦協同處方',
    title_en: 'Hypertension, Atherosclerosis & ASCVD Defense Synergy',
    targetPopulation_zh: '血壓 ≥ 130/80 mmHg、LDL-C > 100 mg/dL、ApoB 偏高、心血管家族史族群',
    targetPopulation_en: 'BP ≥ 130/80 mmHg, LDL-C > 100 mg/dL, elevated ApoB, CVD family history',
    coreMechanism_zh:
      '動脈硬化始於血管內皮損傷與 ApoB 載脂蛋白在內膜下滯留氧化。結合 DASH 高鉀低鈉飲食促進一氧化氮（NO）內皮舒張，輔以等熱量 PUFA 取代飽和脂肪上調肝臟 LDL 受體，搭配有氧訓練改善動脈順應性（Arterial Compliance），並藉由解決睡眠呼吸中止症（OSA）阻斷夜間惡性交感神經高血壓。',
    coreMechanism_en:
      'Atherosclerosis initiates with endothelial dysfunction and subendothelial ApoB retention. High-potassium DASH diet enhances nitric oxide (NO) vasodilation, while PUFA substitution upregulates hepatic LDL receptors, synchronized with aerobic remodeling of arterial compliance and OSA resolution to prevent nocturnal sympathetic surges.',
    clinicalEndpoints_zh: [
      '收縮壓降低 8 - 14 mmHg，舒張壓降低 5 - 8 mmHg',
      '低密度脂蛋白膽固醇（LDL-C）下降 15% - 25%',
      '高敏 C-反應蛋白（hs-CRP）發炎指數回落至 < 1.0 mg/L',
      '頸動脈內中膜厚度（cIMT）硬化進展完全逆轉遏止',
    ],
    clinicalEndpoints_en: [
      'Systolic BP reduction 8-14 mmHg, Diastolic reduction 5-8 mmHg',
      'LDL-C reduction of 15% - 25%',
      'High-sensitivity CRP (hs-CRP) normalized to < 1.0 mg/L',
      'Arrest of carotid intima-media thickness (cIMT) progression',
    ],
    pillarActions: {
      diet_zh:
        '嚴格落實 TSOC 722 血壓監測；飲食採用 DASH 飲食模式：每日鈉攝取控制在 < 2,300mg（約 5.8g 鹽），增加富鉀蔬菜（空心菜、菠菜、深綠蔬菜）促進排鈉降壓；飽和脂肪嚴格 < 10%E。',
      diet_en:
        'Enforce TSOC 722 blood pressure monitoring protocol; adopt DASH guidelines: sodium < 2300 mg/day, emphasize high-potassium vegetables to facilitate natriuresis; SFA < 10%E.',
      exercise_zh:
        '每週 150-300 分鐘中等強度有氧運動或 75-150 分鐘高強度運動；有氧運動刺激內皮一氧化氮合成酶（eNOS）釋放 NO，使周邊血管阻力持久下降 24 小時。',
      exercise_en:
        'Engage in 150-300 min/wk moderate aerobic training; shear stress stimulates endothelial nitric oxide synthase (eNOS), yielding 24h post-exercise hypotension.',
      sleep_zh:
        '積極篩檢並處置阻塞型睡眠呼吸中止症（OSA）；夜間反覆低血氧會誘發劇烈交感神經風暴，摧毀正常夜間血壓下降（Nocturnal Dipping）節律，大幅增加心肌梗塞與腦中風機率。',
      sleep_en:
        'Screen and treat Obstructive Sleep Apnea (OSA); recurrent nocturnal hypoxia provokes catecholamine surges, obliterating the protective nocturnal BP dipping profile.',
      supplements_zh:
        '高純度 rTG 魚油（EPA+DHA ≥ 84%，每日 2-4g 降低三酸甘油酯並抑制血栓）、輔酶 Q10（100-200mg 改善使用 Statin 降血脂藥物之肌肉酸痛與內皮功能）。',
      supplements_en:
        'High-purity rTG Omega-3 (EPA+DHA ≥ 84%, 2-4g/day to lower triglycerides) + CoQ10 (100-200mg to alleviate statin-associated muscle symptoms and improve endothelial tone).',
    },
    evidenceGrade: 'A',
    keyBiomarkers: ['Blood Pressure (722)', 'LDL-C', 'ApoB', 'hs-CRP', 'eGFR'],
  },
  {
    id: 'NEURO_DETOX_ALCOHOL',
    icon: '🧠',
    badge: '神經認知 · 毒理阻斷處方',
    title_zh: '大腦排毒、晝夜節律重建與酒精代謝解毒協同處方',
    title_en: 'Neuro-Glymphatic Detox, Circadian & Ethanol Clearance Synergy',
    targetPopulation_zh: '飲酒臉紅者（ALDH2*2 突變）、經常夜醒早醒者、腦霧（Brain Fog）與高壓力族群',
    targetPopulation_en: 'Asian flushers (ALDH2*2 rs671), chronic night-wakers, brain fog and high-stress individuals',
    coreMechanism_zh:
      '酒精代謝物乙醛為一級致癌物，且對神經元突觸具強烈細胞毒性。酒精嚴重碎片化後半夜睡眠架構（抑制 REM 與阻斷深睡慢波），導致大腦星狀膠細胞特化的膠淋巴系統（Glymphatic System）無法藉由腦脊髓液（CSF）對流沖刷清除 β-類澱粉蛋白與 Tau 蛋白毒性沉積。',
    coreMechanism_en:
      'Acetaldehyde exhibits direct neurotoxicity. Ethanol disrupts ultradian sleep architecture, fragmenting REM and slow-wave sleep, which paralyzes astrocytic glymphatic CSF-ISF convective flow and compromises the clearance of neurotoxic β-amyloid and hyperphosphorylated Tau aggregates.',
    clinicalEndpoints_zh: [
      '深層慢波睡眠（N3）比例恢復至整夜 15% - 20%',
      '早晨覺醒主觀精力評分（VAS 1-10）由平均 4.2 提升至 8.5',
      '反應敏銳度與工作記憶（Digit Span Test）提升 20%',
      '終身罹患食道癌與神經退化性失智症相對風險降低 70% - 90%',
    ],
    clinicalEndpoints_en: [
      'N3 slow-wave sleep proportion normalized to 15% - 20%',
      'Morning subjective vitality score (VAS 1-10) improved from 4.2 to 8.5',
      'Reaction time and working memory (Digit Span) improved by 20%',
      'Lifetime relative risk of esophageal carcinoma and neurodegeneration reduced by 70% - 90%',
    ],
    pillarActions: {
      diet_zh:
        'ALDH2 缺乏基因型（亞洲臉紅族群）嚴格恪守「零酒精」金標準；每日攝取充足水分（按 35-40 mL/kg 基準）加速水溶性毒素代謝排除；避免就寢前 3 小時大量進食以免夜間胃酸反流干擾神經。',
      diet_en:
        'Enforce zero alcohol for ALDH2*2 carriers (Asian flushers); sustain baseline hydration (35-40 mL/kg) for renal solute excretion; cease dining 3h before bedtime.',
      exercise_zh:
        '每週進行 3-4 次中強度有氧或戶外健行，刺激海馬迴腦源性神經營養因子（BDNF）合成；避免就寢前 2 小時內進行高心率極限重訓，以免核心體溫升高延遲入眠。',
      exercise_en:
        'Schedule 3-4 weekly sessions of aerobic exercise to upregulate hippocampal BDNF; avoid vigorous training within 2 hours of bedtime to prevent core body temperature elevation.',
      sleep_zh:
        '實施第一線 CBT-I 睡眠衛生規範：固定清晨起床時間，早晨接觸 30 分鐘自然陽光校準視交叉上核（SCN）褪黑激素分泌生物鐘；睡前 1 小時切斷 460nm 藍光螢幕。',
      sleep_en:
        'Implement gold-standard CBT-I: strict wake-up time anchoring, 30 min morning daylight exposure to entrain suprachiasmatic nucleus (SCN) circadian oscillators; cut 460nm blue light 1h pre-bed.',
      supplements_zh:
        '南非醉茄根萃取物（Ashwagandha KSM-66 300-600mg 調節下視丘-腦垂體-腎上腺軸 HPA-Axis 皮質醇）+ 茶胺酸（L-Theanine 200mg 促進放鬆性 α 腦波）+ 活化型 B 群。',
      supplements_en:
        'Ashwagandha KSM-66 (300-600mg to modulate HPA axis cortisol) + L-Theanine (200mg to foster relaxing alpha waves) + active coenzymated B-Complex.',
    },
    evidenceGrade: 'A',
    keyBiomarkers: ['Sleep PSG N3 %', 'Morning Cortisol', 'AUDIT-C Score', 'Serum ALT/AST', 'hs-CRP'],
  },
];

/**
 * CrossPillarSynergy — 跨支柱臨床全景整合視圖
 *
 * 徹底打破「飲食、運動、睡眠、保健品」各自為政的資訊孤島，
 * 依循國際實證醫學標準，呈現四大支柱如何相互扣連、
 * 產生多靶點加成效益（信達雅 · 整全資訊 · 深入淺出）。
 */
export const CrossPillarSynergy: React.FC = () => {
  const { language } = useLanguage();
  const [selectedGoalId, setSelectedGoalId] = useState<string>('METABOLIC_SYNDROME');
  const [expandedSection, setExpandedSection] = useState<boolean>(true);

  const activeGoal =
    SYNERGY_GOALS.find((g) => g.id === selectedGoalId) || SYNERGY_GOALS[0];

  return (
    <div className="space-y-6 font-sans text-xs">
      {/* ── Section Title & Philosophy ── */}
      <div className="p-6 rounded-3xl border border-salud-cyan/40 bg-gradient-to-br from-salud-cyan/10 via-white to-nature-amber-50/40 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-salud-cyan bg-salud-cyan/20 text-salud-cyan-800 dark:text-salud-cyan-300">
            Holistic Synergy · 四大支柱跨領域臨床綜效
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            信達雅 · 整全資訊 · 深入淺出
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          全人多靶點健康處方協同引擎 (Holistic Lifestyle Medicine Engine)
        </h2>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          健康不是單一面向的孤立操作。飲食決定了代謝基質與燃料結構，運動提供了誘導細胞重塑的機械與代謝張力，睡眠負責大腦排毒與神經內分泌修復，而實證保健品則是針對生理短板的精準防火牆。
          選擇下方四大健康目標，檢視四大支柱如何交織發揮加成效果：
        </p>

        {/* Goal Switcher Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {SYNERGY_GOALS.map((goal) => {
            const isSelected = goal.id === selectedGoalId;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
                className={`btn-tactile p-3 rounded-2xl border text-left transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'border-salud-cyan bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-cyan-glow font-bold scale-102'
                    : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{goal.icon}</span>
                  <span className="px-1.5 py-0.2 rounded font-mono text-[9px] font-bold border border-salud-cyan/40 text-salud-cyan">
                    GRADE {goal.evidenceGrade}
                  </span>
                </div>
                <strong className="text-xs leading-tight line-clamp-2">
                  {language === 'zh-TW' ? goal.title_zh.split('協同處方')[0] : goal.title_en}
                </strong>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active Goal Deep-Dive Card ── */}
      <div className="p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-6">
        {/* Header Badge & Title */}
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-salud-cyan/20 text-salud-cyan-800 dark:text-salud-cyan-300 border border-salud-cyan/40">
              {activeGoal.badge}
            </span>
            <span className="text-slate-400 font-mono text-xs">·</span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              適用族群：{language === 'zh-TW' ? activeGoal.targetPopulation_zh : activeGoal.targetPopulation_en}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{activeGoal.icon}</span>
            <span>{language === 'zh-TW' ? activeGoal.title_zh : activeGoal.title_en}</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans pt-1">
            <strong>核心生化與生理機制：</strong>
            {language === 'zh-TW' ? activeGoal.coreMechanism_zh : activeGoal.coreMechanism_en}
          </p>
        </div>

        {/* ── 4 Pillars Action Matrix ── */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-salud-cyan" />
            <span>四大支柱多靶點執行清單 (4-Pillar Action Prescriptions)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Diet Action */}
            <div className="p-4 rounded-2xl border border-nature-amber-200/80 dark:border-nature-amber-800/40 bg-nature-amber-50/50 dark:bg-nature-amber-950/20 space-y-2">
              <div className="flex items-center gap-2 text-nature-amber-900 dark:text-nature-amber-300 font-bold font-mono text-xs">
                <span className="w-6 h-6 rounded-lg bg-nature-amber-100 dark:bg-nature-amber-900/60 flex items-center justify-center text-sm">
                  🥗
                </span>
                <span>Pillar 01 · 飲食模式與代謝基質</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {language === 'zh-TW' ? activeGoal.pillarActions.diet_zh : activeGoal.pillarActions.diet_en}
              </p>
            </div>

            {/* 2. Exercise Action */}
            <div className="p-4 rounded-2xl border border-nature-sky-200/80 dark:border-nature-sky-800/40 bg-nature-sky-50/50 dark:bg-nature-sky-950/20 space-y-2">
              <div className="flex items-center gap-2 text-nature-sky-900 dark:text-nature-sky-300 font-bold font-mono text-xs">
                <span className="w-6 h-6 rounded-lg bg-nature-sky-100 dark:bg-nature-sky-900/60 flex items-center justify-center text-sm">
                  🏃
                </span>
                <span>Pillar 02 · 運動生理與代謝張力</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {language === 'zh-TW'
                  ? activeGoal.pillarActions.exercise_zh
                  : activeGoal.pillarActions.exercise_en}
              </p>
            </div>

            {/* 3. Sleep Action */}
            <div className="p-4 rounded-2xl border border-purple-200/80 dark:border-purple-800/40 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
              <div className="flex items-center gap-2 text-purple-900 dark:text-purple-300 font-bold font-mono text-xs">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-sm">
                  🌙
                </span>
                <span>Pillar 03 · 睡眠神經修復與大腦排毒</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {language === 'zh-TW'
                  ? activeGoal.pillarActions.sleep_zh
                  : activeGoal.pillarActions.sleep_en}
              </p>
            </div>

            {/* 4. Supplements Action */}
            <div className="p-4 rounded-2xl border border-nature-green-200/80 dark:border-nature-green-800/40 bg-nature-green-50/50 dark:bg-nature-green-950/20 space-y-2">
              <div className="flex items-center gap-2 text-nature-green-900 dark:text-nature-green-300 font-bold font-mono text-xs">
                <span className="w-6 h-6 rounded-lg bg-nature-green-100 dark:bg-nature-green-900/60 flex items-center justify-center text-sm">
                  💊
                </span>
                <span>Pillar 04 · 實證保健品精準防護</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {language === 'zh-TW'
                  ? activeGoal.pillarActions.supplements_zh
                  : activeGoal.pillarActions.supplements_en}
              </p>
            </div>
          </div>
        </div>

        {/* ── Expected Clinical Endpoints & Biomarkers ── */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="text-slate-900 dark:text-white flex items-center gap-2 font-bold font-display">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>實證臨床終點預期改善 (Expected Clinical Endpoints)</span>
            </strong>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              {(language === 'zh-TW'
                ? activeGoal.clinicalEndpoints_zh
                : activeGoal.clinicalEndpoints_en
              ).map((endpoint, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{endpoint}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <strong className="text-slate-900 dark:text-white flex items-center gap-2 font-bold font-display">
              <Activity className="w-4 h-4 text-salud-cyan" />
              <span>核心追蹤生理標記 (Key Biological Markers)</span>
            </strong>
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              定期於健檢中追蹤以下數值變化，驗證跨支柱干預的客觀生理反饋：
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeGoal.keyBiomarkers.map((marker, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-salud-cyan font-bold text-xs shadow-sm"
                >
                  {marker}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
