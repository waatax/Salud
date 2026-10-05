import React from 'react';
import {
  Activity,
  Heart,
  Flame,
  Shield,
  Dumbbell,
  Moon,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Scale,
  Brain,
  Stethoscope,
  Sparkles,
  Zap,
  Info,
  Clock,
  Compass,
  CheckCircle2,
  Droplets,
  Utensils,
  Wine,
  Footprints,
  RefreshCw,
  Gauge,
  BedDouble,
  Coffee,
  Smile,
  ShieldCheck,
  Target,
  Users,
  Award,
  Thermometer,
  ShieldAlert,
  Wind,
  Pill,
  CalendarCheck,
  FileText,
  BadgeCheck,
  Eye,
  Ear,
  Cigarette,
  HeartPulse,
} from 'lucide-react';
import { LearningTrack, Lesson } from '../../types/learning';

interface LessonVisualGraphicProps {
  track: LearningTrack;
  lesson: Lesson;
}

export const LessonVisualGraphic: React.FC<LessonVisualGraphicProps> = ({ track, lesson }) => {
  // Select tailored infographic based on lesson ID (covering all 54 lessons)
  switch (lesson.id) {
    // ── Track 1: Basics (6 課) ──────────────────────────────────────────
    case 'L-BAS-01':
      return <VitalSignsGraphic />;
    case 'L-BAS-02':
      return <EvidencePyramidGraphic />;
    case 'L-BAS-03':
      return <RiskMatrixGraphic />;
    case 'L-BAS-04':
      return <TriageLadderGraphic />;
    case 'L-BAS-05':
      return <DoctorPrepGraphic />;
    case 'L-BAS-06':
      return <MedicationSafetyGraphic />;

    // ── Track 2: Body (8 課) ────────────────────────────────────────────
    case 'L-BODY-01':
      return <AtherosclerosisGraphic />;
    case 'L-BODY-02':
      return <PulmonarySpirometryGraphic />;
    case 'L-BODY-03':
      return <GutMicrobiomeGraphic />;
    case 'L-BODY-04':
      return <LiverFibrosisGraphic />;
    case 'L-BODY-05':
      return <KidneyFiltrationGraphic />;
    case 'L-BODY-06':
      return <JointByJointGraphic />;
    case 'L-BODY-07':
      return <BrainGlymphaticGraphic />;
    case 'L-BODY-08':
      return <ImmuneInflammationGraphic />;

    // ── Track 3: Eat (9 課) ────────────────────────────────────────────
    case 'L-EAT-01':
      return <HealthyPlateGraphic />;
    case 'L-EAT-02':
      return <NovaUPFGraphic />;
    case 'L-EAT-03':
      return <ProteinDoseGraphic />;
    case 'L-EAT-04':
      return <FatsSmokePointGraphic />;
    case 'L-EAT-05':
      return <GlycemicCurveGraphic />;
    case 'L-EAT-06':
      return <DashSodiumPotassiumGraphic />;
    case 'L-EAT-07':
      return <HydrationScaleGraphic />;
    case 'L-EAT-08':
      return <AlcoholMetabolismGraphic />;
    case 'L-EAT-09':
      return <SupplementsGradeGraphic />;

    // ── Track 4: Move (7 課) ───────────────────────────────────────────
    case 'L-MOVE-01':
      return <Zone2MitochondriaGraphic />;
    case 'L-MOVE-02':
      return <StepCountCurveGraphic />;
    case 'L-MOVE-03':
      return <StrengthPatternsGraphic />;
    case 'L-MOVE-04':
      return <JointByJointGraphic />;
    case 'L-MOVE-05':
      return <HeartRateZonesMatrixGraphic />;
    case 'L-MOVE-06':
      return <PeaceAndLoveGraphic />;
    case 'L-MOVE-07':
      return <SedentaryBreakGraphic />;

    // ── Track 5: Rest (7 課) ───────────────────────────────────────────
    case 'L-REST-01':
      return <SleepArchitectureGraphic />;
    case 'L-REST-02':
      return <SleepEnvironmentGraphic />;
    case 'L-REST-03':
      return <CaffeineAdenosineGraphic />;
    case 'L-REST-04':
      return <CbtiStimulusControlGraphic />;
    case 'L-REST-05':
      return <OsaScreeningGraphic />;
    case 'L-REST-06':
      return <HpaAxisStressGraphic />;
    case 'L-REST-07':
      return <PhysiologicalSighGraphic />;

    // ── Track 6: Checkup (8 課) ────────────────────────────────────────
    case 'L-CHK-01':
      return <AdultCheckupRoadmapGraphic />;
    case 'L-CHK-02':
      return <BloodPressureStagesGraphic />;
    case 'L-CHK-03':
      return <GlucoseTrioGraphic />;
    case 'L-CHK-04':
      return <LipidRiskLadderGraphic />;
    case 'L-CHK-05':
      return <KidneyFiltrationGraphic />;
    case 'L-CHK-06':
      return <LiverFibrosisGraphic />;
    case 'L-CHK-07':
      return <BodyCompositionGraphic />;
    case 'L-CHK-08':
      return <CancerScreeningMapGraphic />;

    // ── Track 7: Prevent (9 課) ────────────────────────────────────────
    case 'L-PRE-01':
      return <MetabolicSyndromeGraphic />;
    case 'L-PRE-02':
      return <LifestyleBpReductionGraphic />;
    case 'L-PRE-03':
      return <PrediabetesReversalGraphic />;
    case 'L-PRE-04':
      return <DementiaRiskGraphic />;
    case 'L-PRE-05':
      return <Glp1TherapyGraphic />;
    case 'L-PRE-06':
      return <SarcopeniaBoneGraphic />;
    case 'L-PRE-07':
      return <MenopauseHealthGraphic />;
    case 'L-PRE-08':
      return <AdultVaccinesGraphic />;
    case 'L-PRE-09':
      return <SmokingCessationGraphic />;

    default:
      return <TrackFallbackGraphic track={track} lesson={lesson} />;
  }
};

/* -------------------------------------------------------------------------- */
/* 1. L-BAS-01: 五大生命徵象與 722 居家量測量尺                                  */
/* -------------------------------------------------------------------------- */
const VitalSignsGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="生命徵象正常區間與居家 722 血壓測量法視覺圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            實證圖解：五大生命徵象正常區間與 722 居家血壓指引
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          AHA/ACC 2025 · 衛福部國健署
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">居家血壓 (BP)</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">理想</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            &lt; 120 / 80 <span className="text-xs font-normal text-slate-500">mmHg</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ≥130/80 為第 1 期高血壓；急診紅線 ≥180/120
          </p>
        </div>

        <div className="rounded-xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/40 dark:bg-sky-950/20 p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">晨起靜止心跳 (HR)</span>
            <span className="text-sky-600 dark:text-sky-400 font-bold">常態</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            60 – 100 <span className="text-xs font-normal text-slate-500">bpm</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            訓練者常為 50–60；持續 &gt;100 或 &lt;50 伴暈眩就醫
          </p>
        </div>

        <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20 p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">安靜呼吸頻率 (RR)</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">常態</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            12 – 20 <span className="text-xs font-normal text-slate-500">次/分</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            休息時持續 &gt;24 次/分，常為缺氧或呼吸窘迫警訊
          </p>
        </div>

        <div className="rounded-xl border border-teal-100 dark:border-teal-900/40 bg-teal-50/40 dark:bg-teal-950/20 p-3.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">指夾血氧 (SpO2)</span>
            <span className="text-teal-600 dark:text-teal-400 font-bold">正常</span>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            95 – 100 <span className="text-xs font-normal text-slate-500">%</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            &lt;92% 為缺氧危急值，若伴發紺或氣喘需即刻就醫
          </p>
        </div>
      </div>

      {/* 722 Blood Pressure Technique Visualizer */}
      <div className="rounded-xl border border-amber-200/70 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <span className="text-sm font-bold text-amber-950 dark:text-amber-200">
            台灣高血壓學會 722 居家量測法則
          </span>
        </div>
        <div className="grid sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-800/60">
            <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">「7」連續 7 天</span>
            <span className="text-slate-600 dark:text-slate-400">新確診、調藥後或每季評估時，連續記錄一週消除波動。</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-800/60">
            <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">「2」早晚 2 個時段</span>
            <span className="text-slate-600 dark:text-slate-400">晨起排尿後未服藥前 1 回；夜間睡前放鬆坐定 1 回。</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-800/60">
            <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">「2」每回量 2 遍</span>
            <span className="text-slate-600 dark:text-slate-400">每次靜坐 5 分鐘後量測，間隔 1 分鐘量第 2 遍並取平均。</span>
          </div>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. L-BAS-02: 牛津實證醫學金字塔 (Oxford CEBM / GRADE)                          */
/* -------------------------------------------------------------------------- */
const EvidencePyramidGraphic: React.FC = () => {
  const levels = [
    {
      level: '1',
      title: '系統性回顧與統合分析 (SR & Meta-Analysis)',
      desc: '彙整全球數十項嚴格隨機對照試驗，等級最高、因果實證最確鑿',
      bg: 'bg-emerald-600 text-white',
      width: 'w-full max-w-sm',
    },
    {
      level: '2',
      title: '雙盲隨機對照試驗 (Double-blind RCT)',
      desc: '醫學因果關係判定之黃金標準，嚴格排除安慰劑與生活型態混淆',
      bg: 'bg-emerald-500/90 text-white',
      width: 'w-full max-w-md',
    },
    {
      level: '3',
      title: '前瞻性大型世代追蹤研究 (Prospective Cohort)',
      desc: '追蹤數萬人生活習慣十至數十年；只能證明「高度相關」，不可草率推導因果',
      bg: 'bg-teal-500/80 text-white',
      width: 'w-full max-w-lg',
    },
    {
      level: '4',
      title: '病例對照研究與回溯性調查 (Case-Control)',
      desc: '易受回憶偏差 (Recall Bias) 影響，主要作為探索關聯用途',
      bg: 'bg-slate-400 dark:bg-slate-600 text-white',
      width: 'w-full max-w-xl',
    },
    {
      level: '5',
      title: '細胞與動物實驗 / 個人經驗見證 (In Vitro & Anecdote)',
      desc: '僅能提出初步科學假說；老鼠有效 ≠ 人體有效，網紅口述見證不具實證等級',
      bg: 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200',
      width: 'w-full',
    },
  ];

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="牛津實證醫學金字塔架構圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            實證金字塔：分辨醫學資訊可靠度的科學階梯
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          Oxford CEBM · GRADE Framework
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 pt-2">
        {levels.map((item) => (
          <div
            key={item.level}
            className={`${item.width} rounded-xl p-3 text-center transition-all shadow-xs ${item.bg}`}
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide">
              <span>階梯 {item.level}</span>
              <span>·</span>
              <span>{item.title}</span>
            </div>
            <p className="text-[13px] leading-5 mt-1 opacity-90">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong>判讀口訣：</strong>看到宣稱「最新研究驚人發現」時，先看是老鼠還是真人？是單一見證還是隨機對照？越底層的證據，越不能作為買藥吃藥的決策依據。
        </span>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. L-BAS-03: 相對風險 vs 絕對風險對比圖                                        */
/* -------------------------------------------------------------------------- */
const RiskMatrixGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="相對風險與絕對風險差異對比矩陣">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            風險數學：為什麼「罹病率降低 50%」往往藏有數字盲點？
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          NNT · Absolute vs Relative
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            商業宣傳常見：相對風險 (Relative Risk, RRR)
          </span>
          <div className="text-2xl font-bold text-rose-950 dark:text-rose-100">
            降低 50% <span className="text-sm font-normal text-rose-700 dark:text-rose-400">(聽起來極為驚人)</span>
          </div>
          <p className="text-xs leading-5 text-slate-700 dark:text-slate-300">
            計算公式：(對照組風險 1% - 實驗組風險 0.5%) ÷ 1% = <strong>50%</strong>。這種表達法隱藏了基數本來就很小的事實。
          </p>
        </div>

        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            臨床真實利益：絕對風險 (Absolute Risk, ARR)
          </span>
          <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-100">
            僅降低 0.5% <span className="text-sm font-normal text-emerald-700 dark:text-emerald-400">(需治療 200 人)</span>
          </div>
          <p className="text-xs leading-5 text-slate-700 dark:text-slate-300">
            計算公式：1.0% - 0.5% = <strong>0.5%</strong>。這代表每 200 個人持續服藥/介入，才會有 1 個人實質避免該疾病事件（NNT = 200）。
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
        💡 <strong>實證解讀心法：</strong>看新藥或昂貴保健品宣傳時，一定要主動問：「我的原始發病基數是多少？絕對風險到底降了幾個百分點？代價是什麼？」
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. L-BAS-04: 檢傷分類與急診紅旗階梯                                            */
/* -------------------------------------------------------------------------- */
const TriageLadderGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="台灣急診檢傷分類與紅旗警訊階梯圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            急診五級檢傷 vs 門診分流：何時去急診？何時看門診？
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          TTAS 台灣急診檢傷分類
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-start gap-3 p-3 rounded-xl border border-rose-300 dark:border-rose-900/70 bg-rose-50 dark:bg-rose-950/30">
          <div className="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
            1-2級
          </div>
          <div className="space-y-1">
            <span className="text-sm font-bold text-rose-950 dark:text-rose-100">
              立即致電 119 送急診（復甦與危急級別，0–10 分鐘內處置）
            </span>
            <p className="text-xs leading-5 text-rose-900 dark:text-rose-200">
              典型胸痛如大石壓胸延伸至左臂下巴、單側肢體癱瘓口角歪斜（中風 FAST）、突發意識不清、大出血、窒息發紺、血氧 &lt;90%。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl border border-amber-300 dark:border-amber-900/70 bg-amber-50 dark:bg-amber-950/30">
          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
            3級
          </div>
          <div className="space-y-1">
            <span className="text-sm font-bold text-amber-950 dark:text-amber-100">
              當日急診或急門診評估（緊急級別，30 分鐘內評估）
            </span>
            <p className="text-xs leading-5 text-amber-900 dark:text-amber-200">
              劇烈無法耐受之急性腹痛、發燒併頸部僵硬或持續嘔吐無法進水脫水、外傷有明顯骨折畸形。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl border border-emerald-300 dark:border-emerald-900/70 bg-emerald-50 dark:bg-emerald-950/30">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
            4-5級
          </div>
          <div className="space-y-1">
            <span className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
              預約日間門診或家醫科診所（次緊急與非緊急）
            </span>
            <p className="text-xs leading-5 text-emerald-900 dark:text-emerald-200">
              慢性反覆輕微胃酸逆流、數週的腰背痠痛、常規健檢紅字追蹤、慢性病連續處方箋調藥。去急診需長時間等候且排擠急重症醫療資源。
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. L-BOD-01 / L-PRE-03: 動脈粥狀硬化與 ApoB 斑塊進程                          */
/* -------------------------------------------------------------------------- */
const AtherosclerosisGraphic: React.FC = () => {
  const stages = [
    {
      stage: '1',
      title: '健康血管內皮',
      desc: '內皮細胞緊密排列，一氧化氮 (NO) 調節舒張，管壁平滑無沉積。',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-300',
    },
    {
      stage: '2',
      title: 'ApoB 滲入內膜',
      desc: '血壓或血糖高破壞內皮，含 ApoB 顆粒 (LDL/VLDL) 穿透內皮滯留。',
      color: 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 text-amber-800 dark:text-amber-300',
    },
    {
      stage: '3',
      title: '氧化形成泡沫細胞',
      desc: '巨噬細胞吞噬氧化的 ApoB 顆粒，轉化為泡沫細胞並釋放發炎激素。',
      color: 'bg-orange-100 dark:bg-orange-950/60 border-orange-300 text-orange-800 dark:text-orange-300',
    },
    {
      stage: '4',
      title: '纖維帽與斑塊形成',
      desc: '平滑肌增生形成纖維帽；斑塊逐漸增大，管腔狹窄導致心絞痛。',
      color: 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-800 dark:text-rose-300',
    },
    {
      stage: '5',
      title: '斑塊破裂引發血栓',
      desc: '薄纖維帽因發炎破裂，血小板瞬間凝集成血栓阻斷血流（心梗/腦梗）。',
      color: 'bg-red-200 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-200',
    },
  ];

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="動脈粥狀硬化五階段演變進程圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            血管病理圖解：動脈粥狀硬化與斑塊進程的五個階段
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          AHA/ACC 血管生物學
        </span>
      </div>

      <div className="grid sm:grid-cols-5 gap-2">
        {stages.map((st) => (
          <div key={st.stage} className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 ${st.color}`}>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-70">階段 {st.stage}</div>
              <div className="text-sm font-bold mt-0.5 leading-snug">{st.title}</div>
            </div>
            <p className="text-xs leading-4.5 opacity-90">{st.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
        💡 <strong>為什麼要測 ApoB？</strong> 每一個致動脈粥狀硬化的顆粒（包含 LDL、VLDL、IDL）表面都恰好帶有 1 個 ApoB 蛋白。測 ApoB 代表你體內「潛在穿透血管的魚雷總數」，比單看 LDL-C 更準確預測心肌梗塞風險。
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. L-BOD-02 / L-PRE-02: 胰島素阻抗與脂肪肝惡性循環                            */
/* -------------------------------------------------------------------------- */
const InsulinResistanceGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="胰島素阻抗與異位脂肪堆積惡性循環流程圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            代謝病理圖解：胰島素阻抗與異位脂肪的二十年隱形進程
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          ADA 2025 代謝機制
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">高頻糖分與熱量過剩</div>
          <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
            高 GI 飲食與含糖飲料促使胰臟頻繁大量分泌胰島素，骨骼肌細胞受體因持續刺激逐漸鈍化。
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">肝臟新生脂肪 (DNL) 累積</div>
          <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
            肌肉無法吸收葡萄糖，過剩能量轉至肝臟合成三酸甘油酯，引發脂肪肝並溢出至胰臟與內臟。
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">代償失調與第二型糖尿病</div>
          <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
            多年高胰島素血症後，胰島 β 細胞過勞衰退，空腹血糖與 HbA1c 開始飆升，正式進入糖尿病。
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <TrendingDown className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong>打破惡性循環的兩大鑰匙：</strong>增加肌力訓練（肌肉是全身 80% 葡萄糖儲存池，收縮不需胰島素即可直接清糖）+ 2:1:1 飲食降低升糖波動。
        </span>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. L-BOD-03 / L-CHK-05: 腎臟過濾網與 KDIGO eGFR / UACR 雙維度熱圖              */
/* -------------------------------------------------------------------------- */
const KidneyFiltrationGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="腎臟過濾與KDIGO風險熱圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            腎功能雙維度解讀：eGFR (濾過率) × UACR (蛋白尿) KDIGO 熱圖
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 font-medium">
          KDIGO 2024 指引
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-center">
        {/* Heatmap Grid */}
        <div className="space-y-1.5 text-xs font-medium">
          <div className="flex items-center justify-between text-slate-500 pb-1">
            <span>eGFR 分期 ↓ \ UACR 蛋白尿 →</span>
            <span>A1 (&lt;30) | A2 (30-300) | A3 (&gt;300)</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold">G1/G2: 低風險 🟢</div>
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold">中風險 🟡</div>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200 font-bold">高風險 🟠</div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold">G3a: 中度 🟡</div>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200 font-bold">高風險 🟠</div>
            <div className="p-2 rounded-lg bg-rose-200 dark:bg-rose-950 text-rose-950 dark:text-rose-200 font-bold">極高風險 🔴</div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200 font-bold">G3b: 顯著 🟠</div>
            <div className="p-2 rounded-lg bg-rose-200 dark:bg-rose-950 text-rose-950 dark:text-rose-200 font-bold">極高風險 🔴</div>
            <div className="p-2 rounded-lg bg-red-300 dark:bg-red-950 text-red-950 dark:text-red-200 font-bold">尿毒重危 ⚠️</div>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-white text-sm">💡 為什麼單看血肌酸酐會誤判？</p>
          <p>
            肌酸酐受肌肉量影響很大。精壯年輕人可能因肌肉多而肌酸酐偏高；虛弱高齡長輩肌肉嚴重萎縮，肌酸酐看似「正常正常」，但換算出的 eGFR 可能已跌破 45！
          </p>
          <p className="text-emerald-700 dark:text-emerald-400 font-medium">
            一定要搭配<strong>尿液微量白蛋白 (UACR)</strong>：微量白蛋白能提早 5 到 10 年抓出腎絲球過濾孔隙被高血糖壓壞的早期滲漏。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 8. L-BOD-04 / L-CHK-06: 肝臟解毒與脂肪肝 FIB-4 纖維化進階階梯                   */
/* -------------------------------------------------------------------------- */
const LiverFibrosisGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="脂肪肝病程演進與FIB-4指數">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            脂肪肝逆轉關鍵：從單純浸潤到纖維化的 FIB-4 警訊梯級
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          AASLD 2024 · 消化系醫學會
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
          <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">階段 1：單純脂肪浸潤</div>
          <p className="text-slate-600 dark:text-slate-300">
            超音波照出白亮肝臟，尚無發炎壞死。<strong>減重 3–5%</strong> 即可讓堆積的脂肪細胞完全排空逆轉！
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
          <div className="font-bold text-amber-900 dark:text-amber-300 text-sm">階段 2：脂肪肝炎 (MASH)</div>
          <p className="text-slate-600 dark:text-slate-300">
            ALT/AST 開始破百，脂毒性誘發肝細胞水腫發炎。需<strong>減重 7–10%</strong> 阻斷肝星狀細胞分泌膠原纖維。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
          <div className="font-bold text-rose-900 dark:text-rose-300 text-sm">階段 3：肝纖維化與肝硬化</div>
          <p className="text-slate-600 dark:text-slate-300">
            FIB-4 &gt; 2.67 提示進展性纖維化，正常肝組織硬化。需每 6 個月超音波與胎兒蛋白 (AFP) 篩檢預防肝癌。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 9. L-BOD-05: 腸道微生態與幽門桿菌胃癌 Correa 階梯                            */
/* -------------------------------------------------------------------------- */
const GutMicrobiomeGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="腸道屏障與幽門桿菌胃癌病程">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            腸胃防線：幽門桿菌 Correa 胃癌病程與腸黏膜緊密連接
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          台灣國健署 2026 公費胃癌篩檢
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 text-xs">
        {[
          { step: '1', title: '幽門桿菌感染', desc: '菌體分泌尿素酶破壞胃黏液層，引發慢性胃炎', tone: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200' },
          { step: '2', title: '萎縮性胃炎', desc: '胃酸分泌腺體永久萎縮，胃壁薄化，及時除菌仍可逆', tone: 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200' },
          { step: '3', title: '腸上皮化生 (IM)', desc: '胃黏膜被腸型杯狀細胞取代，進入癌前病變', tone: 'bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-200' },
          { step: '4', title: '異生與早期胃癌', desc: '細胞基因突變不受控增殖，需內視鏡切除或手術', tone: 'bg-rose-200 dark:bg-rose-950 text-rose-900 dark:text-rose-200' },
        ].map((s) => (
          <div key={s.step} className={`flex-1 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1 ${s.tone}`}>
            <span className="font-bold text-sm block">步驟 {s.step}：{s.title}</span>
            <p className="opacity-90 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
        ⭐ <strong>公費福利提醒：</strong>台灣 2026 年全面啟動 45–74 歲常規成人健檢「胃幽門桿菌糞便抗原篩檢」，只要一次篩檢、及時完成兩週四合一抗生素除菌，胃癌風險降低一半以上！
      </p>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 10. L-BOD-06: 免疫系統防線與 hs-CRP 慢性微發炎指標                            */
/* -------------------------------------------------------------------------- */
const ImmuneInflammationGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="急慢性發炎與hs-CRP心血管風險">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            免疫警戒線：急性發炎（救命）vs 慢性低度發炎（致病）與 hs-CRP
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          AHA 發炎生物學
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">低風險區：&lt; 1.0 mg/L</span>
          <p className="text-slate-600 dark:text-slate-300">血管內皮處於靜止穩定狀態，無動脈硬化斑塊活化發炎信號。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">中度發炎：1.0 – 3.0 mg/L</span>
          <p className="text-slate-600 dark:text-slate-300">常見於肥胖、睡眠呼吸中止症、吸菸、牙周病或代謝症候群患者。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">高風險區：&gt; 3.0 mg/L</span>
          <p className="text-slate-600 dark:text-slate-300">心肌梗塞與中風風險倍增；若 &gt;10 mg/L 常為急性細菌或病毒感染需複查。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 11. L-BOD-07: 呼吸系統通氣量與 FEV1/FVC 阻塞型判定                            */
/* -------------------------------------------------------------------------- */
const PulmonarySpirometryGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="肺量計檢測與氣道通氣障礙圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            肺功能尺規：用力吐氣 FEV1/FVC 與氣道阻塞早期警訊
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 font-medium">
          GOLD 2025 · 胸腔醫學會
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">正常通氣：FEV1/FVC ≥ 70%</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            深吸一口氣後，第一秒內能吐出超過 70–80% 的全部肺活量，代表氣道通暢無明顯狹窄阻塞。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">阻塞型通氣障礙：&lt; 70% (COPD/氣喘)</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            吸菸、空污或慢性過敏使支氣管痙攣狹窄，氣流吐不出來。爬樓梯呼吸急促往往在此階段才被發現。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 12. L-BOD-08: 大腦突觸可塑性與 14 大失智症可改變因子                           */
/* -------------------------------------------------------------------------- */
const BrainGlymphaticGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="大腦排毒與失智症可預防因子">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            神經防禦：Lancet 2024 失智症 14 大可改變危險因子（預防 45% 失智）
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 font-medium">
          Lancet Dementia Commission 2024
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-2.5 text-xs">
        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block">青年期 (早預防)</span>
          <p className="text-slate-600 dark:text-slate-300">受教育年數不足、頭部外傷防護（騎車務必戴合格安全帽）。</p>
        </div>
        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block">中年期 (黃金逆轉)</span>
          <p className="text-slate-600 dark:text-slate-300"><strong>聽力損失 (佔7%)</strong>、高血壓、肥胖、高 LDL 膽固醇、酗酒。</p>
        </div>
        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block">晚年期 (神經保護)</span>
          <p className="text-slate-600 dark:text-slate-300">吸菸、憂鬱、社交孤立、缺乏身體活動、糖尿病、未矯正視力。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 13. L-EAT-01: 哈佛健康餐盤 2:1:1 視覺比例盤                                      */
/* -------------------------------------------------------------------------- */
const HealthyPlateGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="哈佛健康餐盤 2:1:1 比例分佈圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            黃金比例：哈佛 2:1:1 健康餐盤視覺結構
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          Harvard T.H. Chan 公衛學院
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-5 items-center">
        {/* SVG Plate visual */}
        <div className="flex justify-center">
          <svg viewBox="0 0 240 240" className="w-56 h-56 max-w-full drop-shadow-xs" aria-hidden="true">
            {/* Outer Rim */}
            <circle cx="120" cy="120" r="115" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="6" className="dark:fill-slate-800 dark:stroke-slate-700" />
            <circle cx="120" cy="120" r="105" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" className="dark:fill-slate-900 dark:stroke-slate-700" />

            {/* Left Half: Vegetables & Fruits (1/2, 2 portions) */}
            <path
              d="M 120 15 A 105 105 0 0 0 120 225 Z"
              fill="#10b981"
              opacity="0.9"
            />
            {/* Top Right: Protein (1/4, 1 portion) */}
            <path
              d="M 120 15 A 105 105 0 0 1 225 120 L 120 120 Z"
              fill="#3b82f6"
              opacity="0.9"
            />
            {/* Bottom Right: Whole Grains (1/4, 1 portion) */}
            <path
              d="M 225 120 A 105 105 0 0 1 120 225 L 120 120 Z"
              fill="#f59e0b"
              opacity="0.9"
            />

            {/* Labels inside Plate */}
            <text x="65" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              蔬菜與水果
            </text>
            <text x="65" y="135" fill="#ffffff" fontSize="16" fontWeight="900" textAnchor="middle">
              1/2 (2 份)
            </text>

            <text x="170" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              優質蛋白質
            </text>
            <text x="170" y="88" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">
              1/4 (1 份)
            </text>

            <text x="170" y="170" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              未精緻全穀
            </text>
            <text x="170" y="188" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">
              1/4 (1 份)
            </text>
          </svg>
        </div>

        {/* Nutritional Checklist */}
        <div className="space-y-3 text-xs leading-5">
          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm">
              🥦 1/2 蔬菜與水果 (比例 2)
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              至少兩種不同顏色，深綠色葉菜、十字花科、蕈菇與彩椒優先，提供高纖維、植化素與微量元素。
            </span>
          </div>

          <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60">
            <span className="font-bold text-sky-900 dark:text-sky-300 block text-sm">
              🐟 1/4 優質蛋白質 (比例 1)
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              優先順序：「豆 &gt; 魚 &gt; 蛋 &gt; 肉」。多選毛豆、豆腐、深海魚、去皮雞肉；少吃加工肉品（培根、香腸）。
            </span>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60">
            <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">
              🌾 1/4 未精緻全穀雜糧 (比例 1)
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              糙米、黑米、地瓜、南瓜、燕麥、藜麥；取代白米飯、白麵條與精緻甜麵包，穩定維持長效飽足感。
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 14. L-EAT-02: 超加工食品 (UPF) NOVA 四級矩陣                                 */
/* -------------------------------------------------------------------------- */
const NovaUPFGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="超加工食品NOVA分類與健康風險">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            食品工業密碼：NOVA 四級加工程度與超加工食品 (UPF)
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          Lancet 2025 UPF 指引
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">NOVA 1: 原型食物</span>
          <p className="text-slate-600 dark:text-slate-300">未加工或微清洗切割的天然蔬果、原塊肉、全穀豆類。最推薦！</p>
        </div>
        <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 block">NOVA 2: 烹調原料</span>
          <p className="text-slate-600 dark:text-slate-300">天然壓榨橄欖油、海鹽、蜂蜜、奶油等家庭廚房調味原料。</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block">NOVA 3: 加工食品</span>
          <p className="text-slate-600 dark:text-slate-300">水煮鮪魚罐頭、天然乾酪起司、鹽烤堅果。保留食物本體。</p>
        </div>
        <div className="p-3 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block">NOVA 4: UPF 超加工</span>
          <p className="text-rose-900 dark:text-rose-200">手搖糖飲、微波即食調理包、熱狗、洋芋片。破壞腸屏障促發炎。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 15. L-EAT-03: 升糖指數與血糖波動曲線對比                                        */
/* -------------------------------------------------------------------------- */
const GlycemicCurveGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="高GI與低GI飲食對血糖波動與胰島素曲線對比圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            血糖雲霄飛車：精緻高 GI 飲食 vs 平穩低 GI 飲食曲線對比
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          CGM 連續血糖監測實證
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* High GI Spike & Crash */}
        <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 dark:text-rose-300">精緻高 GI（白麵包、含糖手搖）</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 font-semibold">暴衝與墜崖</span>
          </div>
          <svg viewBox="0 0 200 80" className="w-full h-20" aria-hidden="true">
            <line x1="10" y1="65" x2="190" y2="65" stroke="#cbd5e1" strokeDasharray="3 3" />
            <path
              d="M 10 65 Q 60 5, 90 20 T 140 75 T 190 65"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3.5"
            />
            <circle cx="65" cy="10" r="3.5" fill="#ef4444" />
            <text x="65" y="24" fontSize="9" fill="#991b1b" textAnchor="middle" fontWeight="bold">血糖驟升 (Spike)</text>
            <text x="140" y="72" fontSize="9" fill="#991b1b" textAnchor="middle" fontWeight="bold">斷崖崩跌 (Crash)</text>
          </svg>
          <p className="text-xs leading-5 text-slate-700 dark:text-slate-300">
            快速吸收刺激大量胰島素，引發低血糖效應（Reactive Hypoglycemia），造成飯後昏睡（Food Coma）與兩小時後的飢餓暴食。
          </p>
        </div>

        {/* Low GI Sustained Energy */}
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">複合高纖 2:1:1（全穀＋蛋白質）</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200 font-semibold">平緩穩定</span>
          </div>
          <svg viewBox="0 0 200 80" className="w-full h-20" aria-hidden="true">
            <line x1="10" y1="65" x2="190" y2="65" stroke="#cbd5e1" strokeDasharray="3 3" />
            <path
              d="M 10 65 Q 70 40, 110 45 T 190 60"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
            />
            <circle cx="90" cy="42" r="3.5" fill="#10b981" />
            <text x="90" y="32" fontSize="9" fill="#065f46" textAnchor="middle" fontWeight="bold">平緩上升 (Gentle)</text>
          </svg>
          <p className="text-xs leading-5 text-slate-700 dark:text-slate-300">
            富含膳食纖維延緩胃排空，血糖波動溫和，胰島素平穩釋放，提供大腦 4 小時穩定能量與長效專注力。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 16. L-EAT-04: 蛋白質需求量與白胺酸觸發門檻                                      */
/* -------------------------------------------------------------------------- */
const ProteinDoseGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="蛋白質攝取劑量與白胺酸門檻">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            肌力防線：每日蛋白質劑量階梯與白胺酸 (Leucine) 觸發開關
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          ISSN · 肌少症共識
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">久坐低標：0.8 g/kg</span>
          <p className="text-slate-600 dark:text-slate-400">僅維持生理基本氮平衡，無法抵抗高齡肌少症自然流失。</p>
        </div>
        <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 space-y-1">
          <span className="font-bold text-emerald-800 dark:text-emerald-300 block">長輩防肌少：1.2–1.5 g/kg</span>
          <p className="text-emerald-950 dark:text-emerald-200">克服同化阻抗；每餐須含 ≥2.5g 白胺酸才能有效啟動肌肉蛋白合成 (MPS)。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/20 space-y-1">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 block">增肌/減脂保護：1.6–2.2 g/kg</span>
          <p className="text-slate-600 dark:text-slate-300">熱量赤字下極大化飽足感，並保護骨骼肌不被身體當柴火燒掉。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 17. L-EAT-05: 油脂烹調與發煙點實測對照                                         */
/* -------------------------------------------------------------------------- */
const FatsSmokePointGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="食用油脂肪酸光譜與高溫發煙點">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            油品科學：脂肪酸光譜 (MUFA vs PUFA vs SFA) 與發煙點實測
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          AHA 2025 食用油指引
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">特級初榨橄欖油 (EVOO)</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-semibold">發煙點 ~200°C · 單元不飽和 MUFA</div>
          <p className="text-slate-600 dark:text-slate-300">富含橄欖多酚，中低溫拌炒皆安全，保護血管內皮抗氧化。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 block">酪梨油 (Avocado Oil)</span>
          <div className="text-sky-700 dark:text-sky-400 font-semibold">發煙點 ~270°C · 耐高溫極品</div>
          <p className="text-slate-600 dark:text-slate-300">家庭煎牛排、高溫熱炒最佳選擇，化學結構極為穩定不易裂解。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block">豬油 / 牛油 / 椰子油</span>
          <div className="text-rose-700 dark:text-rose-400 font-semibold">飽和脂肪 SFA &gt;50–85%</div>
          <p className="text-slate-600 dark:text-slate-300">雖耐炸，但大量攝取會直接升高 ApoB 與 LDL-C 促進動脈硬化。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 18. L-EAT-06: 得舒飲食 DASH 鈉鉀幫浦平衡圖                                      */
/* -------------------------------------------------------------------------- */
const DashSodiumPotassiumGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="得舒飲食鈉鉀平衡與血壓調節">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            得舒降壓機制：細胞膜「鈉鉀幫浦」(Na+/K+ Pump) 與天然排鈉
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          WHO 2025 低鈉鹽共識
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">高鈉飲食 (&gt;2,300 mg/天)</span>
          <p className="text-slate-600 dark:text-slate-300">
            水分滯留在細胞外液，血容量擴增，直接壓迫血管壁導致血壓衝高；長期破壞腎小球濾過屏障。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">高鉀蔬果介入 (&gt;3,500 mg/天)</span>
          <p className="text-slate-600 dark:text-slate-300">
            深綠葉菜、香蕉與馬鈴薯富含鉀離子，促使腎小管排泄過多鈉離子，放鬆血管平滑肌，血壓平均降 5–11 mmHg！
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 19. L-EAT-07: 水分收支平衡與 Armstrong 尿色 8 階色卡                           */
/* -------------------------------------------------------------------------- */
const HydrationScaleGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="Armstrong 8階尿色水合尺規">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            臨床水合尺規：Armstrong 尿液顏色 8 階水合度即時判定
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 font-medium">
          Armstrong Scale
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center text-[11px] font-bold">
        {[
          { level: '1', name: '透明水清', color: 'bg-emerald-50 border-emerald-300 text-emerald-900', hint: '水份略微過多' },
          { level: '2', name: '淡檸檬黃', color: 'bg-emerald-100 border-emerald-400 text-emerald-900', hint: '黃金理想水合 ★' },
          { level: '3', name: '淺稻草黃', color: 'bg-yellow-100 border-yellow-300 text-yellow-900', hint: '理想水合' },
          { level: '4', name: '清澈中黃', color: 'bg-yellow-200 border-yellow-400 text-yellow-950', hint: '正常稍偏乾' },
          { level: '5', name: '深黃微濁', color: 'bg-amber-300 border-amber-500 text-amber-950', hint: '輕度脫水需補水' },
          { level: '6', name: '琥珀焦黃', color: 'bg-amber-400 border-amber-600 text-amber-950', hint: '明顯脫水警戒' },
          { level: '7', name: '濃茶褐色', color: 'bg-amber-600 text-white', hint: '嚴重脫水警戒' },
          { level: '8', name: '深褐醬油', color: 'bg-amber-900 text-white', hint: '急診紅線 (橫紋肌溶解)' },
        ].map((c) => (
          <div key={c.level} className={`p-2 rounded-lg border ${c.color} flex flex-col justify-between space-y-1`}>
            <span>{c.level}階</span>
            <span>{c.name}</span>
            <span className="text-[10px] font-normal opacity-90">{c.hint}</span>
          </div>
        ))}
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 20. L-EAT-08: 酒精代謝途徑與 ALDH2 臉紅基因突變                                 */
/* -------------------------------------------------------------------------- */
const AlcoholMetabolismGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="酒精肝臟三步代謝與ALDH2臉紅">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Wine className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            毒性警報：酒精肝臟三步代謝與 ALDH2 基因不耐「喝酒臉紅」
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          WHO 一級致癌物 · 台灣高盛行率 (47%)
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">步驟 1：乙醇 (酒精)</span>
          <p className="text-slate-600 dark:text-slate-400">經 ADH 酵素轉化為一級致癌物「乙醛」。</p>
        </div>
        <div className="p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block text-sm">步驟 2：乙醛毒素 ⚠️</span>
          <p className="text-rose-900 dark:text-rose-200">
            <strong>台灣近半數人 ALDH2 基因突變</strong>，無法將乙醛分解！乙醛堆積引發血管擴張臉紅、心悸、頭痛，食道癌風險暴增 50 倍！
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm">步驟 3：乙酸與水</span>
          <p className="text-slate-600 dark:text-slate-300">正常代謝為無害乙酸，最後分解為水與二氧化碳排除。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 21. L-EAT-09: 減重熱量赤字安全帶與代謝適應防溜溜球                               */
/* -------------------------------------------------------------------------- */
const EnergyDeficitGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="熱量赤字安全帶與代謝適應">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            科學減重甜蜜點：300–500 kcal 熱量赤字與代謝適應防線
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          Lancet 肥胖醫學 2025
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">激進節食盲點 (&gt;1,000 kcal 赤字)</span>
          <p className="text-slate-600 dark:text-slate-300">
            身體誤判進入飢荒，甲狀腺素下降、基礎代謝狂掉，優先分解珍貴骨骼肌；一旦恢復進食立刻引發報復性溜溜球反彈。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">黃金安全帶 (300–500 kcal 赤字 + 肌力)</span>
          <p className="text-slate-600 dark:text-slate-300">
            每週減 0.5–1 公斤純脂肪；搭配高蛋白質 (1.6 g/kg) 與重訓，完全保護瘦體組織，代謝率維持高原穩定。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 22. L-EAT-10: 保健食品 GRADE 實證階梯                                         */
/* -------------------------------------------------------------------------- */
const SupplementsGradeGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="保健食品GRADE實證階梯">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            錢花在刀口上：營養補充品 GRADE 人體臨床實證分級梯隊
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 font-medium">
          Salud GRADE 評鑑
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-2.5 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm">Tier 1: 實證確鑿 🟢</span>
          <p className="text-slate-600 dark:text-slate-300">維生素 D3 (抽血不足者)、高純度 EPA 魚油 (高三酸甘油酯)、一水肌酸 (肌力)。</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">Tier 2: 條件獲益 🟡</span>
          <p className="text-slate-600 dark:text-slate-300">益生菌 (特定抗生素腹瀉菌株)、葉黃素 (黃斑部病變高危)、褪黑激素 (時差短用)。</p>
        </div>
        <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block text-sm">Tier 3: 智商稅 / 證據薄弱 🔴</span>
          <p className="text-slate-600 dark:text-slate-300">口服膠原蛋白 (消化道分解為普通胺基酸)、解酒排毒酵素、無檢驗指徵之高劑量綜合維他命。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 23. L-MOVE-01: Zone 2 有氧乳酸閾值與粒線體引擎                                  */
/* -------------------------------------------------------------------------- */
const Zone2MitochondriaGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="Zone 2 有氧乳酸閾值與粒線體脂肪氧化率曲線圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            有氧能量系統：Zone 2 粒線體密度最高燃脂區 vs 高強度無氧區
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 font-medium">
          San Millán / Brooks 粒線體代謝
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">Zone 1</span>
          <span className="text-slate-500 block">&lt; 60% HRmax</span>
          <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">極輕鬆散步、恢復血流</p>
        </div>

        <div className="p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-xs">
          <span className="font-bold text-emerald-700 dark:text-emerald-300 block flex items-center gap-1">
            Zone 2 ★
          </span>
          <span className="text-emerald-800 dark:text-emerald-400 block font-semibold">60 – 70% HRmax</span>
          <p className="mt-1 text-[11px] leading-4 text-emerald-900 dark:text-emerald-200">
            <strong>脂肪氧化率頂峰</strong>，促進粒線體新生、乳酸 1.5–2.0 mmol/L
          </p>
        </div>

        <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">Zone 3</span>
          <span className="text-slate-500 block">70 – 80% HRmax</span>
          <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">步速加快、脂肪與碳水混合燃燒</p>
        </div>

        <div className="p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
          <span className="font-bold text-amber-800 dark:text-amber-300 block">Zone 4 (乳酸閾值)</span>
          <span className="text-amber-700 dark:text-amber-400 block">80 – 90% HRmax</span>
          <p className="mt-1 text-[11px] text-amber-900 dark:text-amber-200">乳酸迅速累積、主要燃燒肝醣</p>
        </div>

        <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20">
          <span className="font-bold text-rose-800 dark:text-rose-300 block">Zone 5 (VO2 Max)</span>
          <span className="text-rose-700 dark:text-rose-400 block">&gt; 90% HRmax</span>
          <p className="mt-1 text-[11px] text-rose-900 dark:text-rose-200">力竭衝刺、提升最大心肺耐力極限</p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
        🏃 <strong>簡易自我體感檢測（說話測試 Talk Test）：</strong>在 Zone 2 運動時，你應能用完整句子持續跟同伴說話，但無法順暢唱歌；呼吸加深但不會喘不過氣。這是有氧耐力與健康長壽最重要的基石訓練。
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 24. L-MOVE-02: 肌力訓練四大核心動作模式                                       */
/* -------------------------------------------------------------------------- */
const StrengthPatternsGraphic: React.FC = () => {
  const patterns = [
    {
      name: '蹲 (Squat)',
      target: '股四頭肌、臀大肌、核心',
      action: '深蹲、分腿蹲、坐站起椅',
      desc: '維持上下樓梯、從沙發輕鬆站起之根本下肢肌力',
    },
    {
      name: '鉸鏈 (Hinge)',
      target: '臀大肌、大腿後肌、豎脊肌',
      action: '硬舉、臀橋、壺鈴擺盪',
      desc: '保護腰椎與髖關節，學會用臀部發力搬重物不閃腰',
    },
    {
      name: '推 (Push)',
      target: '胸大肌、三頭肌、三角肌前束',
      action: '伏地挺身、啞鈴胸推、肩推',
      desc: '上肢推門推重物，防止肩關節退化與駝背圓肩',
    },
    {
      name: '拉 (Pull)',
      target: '背闊肌、斜方肌、二頭肌',
      action: '划船、滑輪下拉、彈力帶拉背',
      desc: '平衡現代人久坐滑手機的前傾頭姿態，維持背部挺拔',
    },
  ];

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="肌力訓練四大功能性人體力學模式">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            抗阻力訓練基石：人體四大基本功能動作模式
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          ACSM · 肌少症指引
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {patterns.map((p) => (
          <div key={p.name} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white text-sm block">{p.name}</span>
            <div className="text-indigo-600 dark:text-indigo-400 font-medium">{p.target}</div>
            <p className="text-slate-600 dark:text-slate-400">{p.desc}</p>
            <div className="pt-1.5 border-t border-slate-200/80 dark:border-slate-700/60 text-slate-500 dark:text-slate-400">
              典型動作：{p.action}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 25. L-MOVE-03: 心率區間與 RPE 自覺強度矩陣                                     */
/* -------------------------------------------------------------------------- */
const HeartRateZonesMatrixGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="運動自覺強度RPE與心率區間對照">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            強度校準：自覺用力係數 (RPE 1–10) 與心率區間對照矩陣
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          Borg Scale · ACSM 2026
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">RPE 2–3 (輕度)</span>
          <div className="text-slate-500">Zone 1 · 輕鬆悠閒</div>
          <p className="text-slate-600 dark:text-slate-300">可以順暢唱歌、毫無負擔。適合飯後散步消脹氣。</p>
        </div>
        <div className="p-3 rounded-xl border-2 border-emerald-500 bg-emerald-100/50 dark:bg-emerald-950/40 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">RPE 4–6 (中度 ★)</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-semibold">Zone 2–3 · 有效鍛鍊區</div>
          <p className="text-slate-600 dark:text-slate-300">可以講完整句子但無法唱歌、微出汗、呼吸加深。長壽基石！</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block">RPE 7–8 (激烈)</span>
          <div className="text-slate-500">Zone 4 · 乳酸門檻</div>
          <p className="text-slate-600 dark:text-slate-300">只能說單字或簡短片語、呼吸急促、肌肉有微酸灼熱感。</p>
        </div>
        <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block">RPE 9–10 (全力力竭)</span>
          <div className="text-slate-500">Zone 5 · VO2 Max</div>
          <p className="text-slate-600 dark:text-slate-300">全力衝刺、無法說話、心臟狂跳。僅適合進階間歇短時間使用。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 26. L-MOVE-04: 每日步數階梯與死亡率下降非線性曲線                               */
/* -------------------------------------------------------------------------- */
const StepCountCurveGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="每日步數非線性死亡率曲線">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Footprints className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            步數收益拐點：Lancet 2025 每日步數與全因死亡率非線性曲線
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          Lancet Public Health 2025
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">&lt; 4,000 步：久坐危險基線</span>
          <p className="text-slate-600 dark:text-slate-300">內皮功能受損，胰島素阻抗高。每增加 1,000 步即可顯著拉開死亡率差距。</p>
        </div>
        <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">6,000–7,500 步：黃金甜蜜點 ★</span>
          <p className="text-emerald-950 dark:text-emerald-200">
            全因死亡率下降高達 40–50%！長輩在 6,000–8,000 步時獲益已接近滿載高原。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 text-sm block">&gt; 10,000 步：邊際效益漸緩</span>
          <p className="text-slate-600 dark:text-slate-300">效益繼續保持，但斜率趨於平緩。重點在於每天持續，而非盲目衝高步數。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 27. L-MOVE-05: HIIT vs LISS 代謝與心肺對比                                     */
/* -------------------------------------------------------------------------- */
const HiitVsLissGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="高強度間歇HIIT與低強度穩態LISS對比">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            有氧雙軌：高強度間歇 (HIIT) vs 低強度穩態 (LISS) 特性對比
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 font-medium">
          運動生理學比較
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-orange-200 dark:border-orange-900/60 bg-orange-50 dark:bg-orange-950/20 space-y-1.5">
          <span className="font-bold text-orange-900 dark:text-orange-300 text-sm block">高強度間歇 (HIIT)</span>
          <p className="text-slate-600 dark:text-slate-300">時間極度精簡（15–20 分鐘）、快速提升 VO2 max 與運動後過量氧耗 (EPOC)；但關節與心血管衝擊大，每週不宜超過 2 次。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1.5">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">低強度穩態 (LISS / Zone 2)</span>
          <p className="text-slate-600 dark:text-slate-300">時間較長（40–60 分鐘）、脂肪氧化率最高、神經系統恢復快、粒線體生合成最強；適合絕大多數人作為常態基底。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 28. L-MOVE-06: 久坐中斷與比目魚肌肌肉幫浦                                      */
/* -------------------------------------------------------------------------- */
const SedentaryBreakGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="久坐中斷與比目魚肌幫浦">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            久坐救星：每 30 分鐘起身 2 分鐘的「比目魚肌幫浦」效益
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          Hamilton iScience 2022
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">連續久坐 2 小時危害</span>
          <p className="text-slate-600 dark:text-slate-300">
            下肢脂蛋白脂肪酶 (LPL) 活性暴降 90%，三酸甘油酯無法分解，下肢靜脈血流淤積，飯後血糖峰值飆升 30%。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">微運動中斷協議</span>
          <p className="text-slate-600 dark:text-slate-300">
            每 30 分鐘起身倒杯水、深蹲 10 下或做小腿提踵。小腿比目魚肌富含慢肌纖維，輕微收縮即可清除大量血液葡萄糖！
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 29. L-MOVE-07: 關節活動度與穩定度動力鏈 (Joint-by-Joint)                        */
/* -------------------------------------------------------------------------- */
const JointByJointGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="人體關節活動度與穩定度交替結構">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            人體工學動力鏈：關節活動度 (Mobility) 與穩定度 (Stability) 交替法則
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 font-medium">
          Boyle & Cook 關節分工理論
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center font-medium">
        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-950 dark:text-teal-200">
          <span className="font-bold block">腳踝關節</span>
          <span className="text-[11px] text-teal-700 dark:text-teal-300">需要活動度 🔄</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 text-slate-800 dark:text-slate-200">
          <span className="font-bold block">膝蓋關節</span>
          <span className="text-[11px] text-slate-500">需要穩定度 🔒</span>
        </div>
        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-950 dark:text-teal-200">
          <span className="font-bold block">髖關節</span>
          <span className="text-[11px] text-teal-700 dark:text-teal-300">需要活動度 🔄</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 text-slate-800 dark:text-slate-200">
          <span className="font-bold block">腰椎脊柱</span>
          <span className="text-[11px] text-slate-500">需要穩定度 🔒</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-950 dark:text-teal-200">
          <span className="font-bold block">胸椎段</span>
          <span className="text-[11px] text-teal-700 dark:text-teal-300">需要活動度 🔄</span>
        </div>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        💡 <strong>腰痛膝痛常是替死鬼：</strong>當髖關節或腳踝活動度卡住時，相鄰的腰椎或膝蓋就被迫代償過度扭轉，因而引發慢性發炎受傷！
      </p>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 30. L-MOVE-08: 運動傷害急性處置 PEACE & LOVE 最新原則                            */
/* -------------------------------------------------------------------------- */
const PeaceAndLoveGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="運動防傷急性處置PEACE and LOVE原則">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            處置升級：從舊版 RICE 走向最新「PEACE & LOVE」軟組織修復原則
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          BJSM 國際運動醫學指引
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">急性期 (PEACE)</span>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>P</strong>rotect 保護防再傷、<strong>E</strong>levate 抬高過心臟、<strong>A</strong>void 消炎藥與過度冰敷（避免抑制天然癒合）、<strong>C</strong>ompress 加壓消水腫、<strong>E</strong>ducate 正確醫學衛教。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">亞急性恢復期 (LOVE)</span>
          <p className="text-slate-700 dark:text-slate-300">
            <strong>L</strong>oad 適度漸進負重、<strong>O</strong>ptimism 保持正向信心、<strong>V</strong>ascularization 促進微血管增生運動、<strong>E</strong>xercise 恢復功能性主動訓練。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 31. L-REST-01: 晝夜節律雙波曲線 (Melatonin vs Cortisol)                        */
/* -------------------------------------------------------------------------- */
const CircadianRhythmGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="人體24小時晝夜節律褪黑激素與皮質醇雙波曲線圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            生理時鐘圖解：褪黑激素與皮質醇 24 小時交替雙波
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          Circadian Biology
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">06:00 – 08:00 清晨</span>
          <div className="font-medium text-amber-700 dark:text-amber-400">皮質醇覺醒反應 (CAR)</div>
          <p className="text-slate-600 dark:text-slate-400">
            受晨光照射，視交叉上核 (SCN) 指令皮質醇衝頂、體溫上升、褪黑激素徹底歸零，身體充滿活力。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block text-sm">13:00 – 15:00 午後</span>
          <div className="font-medium text-slate-600 dark:text-slate-400">生理性警醒度次低點</div>
          <p className="text-slate-600 dark:text-slate-400">
            天然生物節律中的體溫微降期，可安排 15–20 分鐘閉目養神或短暫午睡，但避免超過 30 分鐘。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-1">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-sm">21:00 – 23:00 睡前</span>
          <div className="font-medium text-indigo-700 dark:text-indigo-400">松果體褪黑激素分泌</div>
          <p className="text-slate-600 dark:text-slate-400">
            環境光暗下來後褪黑激素快速攀升，核心體溫開始下降，驅動入睡。避免 3C 藍光抑制此反應。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm">02:00 – 04:00 深夜</span>
          <div className="font-medium text-purple-700 dark:text-purple-400">深層慢波與膠淋巴排毒</div>
          <p className="text-slate-600 dark:text-slate-400">
            大腦膠淋巴系統 (Glymphatic System) 開啟液體脈衝，清除日間累積的乙型類澱粉蛋白與代謝廢物。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 32. L-REST-02: 睡眠環境三要素與核心體溫下降                                     */
/* -------------------------------------------------------------------------- */
const SleepEnvironmentGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="睡眠環境三要素圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            好眠洞穴：打造深層睡眠的三大環境物理關鍵
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          睡眠醫學標準
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 block text-sm">涼爽：18–20°C 臥室溫度</span>
          <p className="text-slate-600 dark:text-slate-300">入睡需要核心體溫下降約 1°C。睡前 90 分鐘溫水澡能促進周邊血管散熱，加速降溫。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/20 space-y-1">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-sm">極暗：完全遮光</span>
          <p className="text-slate-600 dark:text-slate-300">即便微弱小夜燈或電器指示燈，也會穿透眼皮干擾松果體褪黑激素分泌。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">安靜：&lt; 30 分貝環境</span>
          <p className="text-slate-600 dark:text-slate-400">使用耳塞或白噪音均勻覆蓋突發尖銳噪音，防止大腦微覺醒 (Micro-arousal)。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 33. L-REST-03: 90分鐘睡眠週期結構圖 (N1 -> N2 -> N3 -> REM)                   */
/* -------------------------------------------------------------------------- */
const SleepArchitectureGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="90分鐘睡眠週期結構圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            睡眠結構階梯：90 分鐘週期與各階段生理修復重點
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          AASM 睡眠醫學
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">N1 淺睡入睡期 (5%)</span>
          <p className="text-slate-600 dark:text-slate-400">半夢半醒、肌肉放鬆，偶爾出現入睡抽動。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">N2 輕度平穩期 (50%)</span>
          <p className="text-slate-600 dark:text-slate-400">出現睡眠紡錘波 (Spindles)，鞏固運動記憶。</p>
        </div>
        <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/20 space-y-1">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 block">N3 慢波深睡期 (20%) ★</span>
          <p className="text-slate-600 dark:text-slate-300">生長激素分泌、修復肌肉骨骼、膠淋巴系統清洗腦廢物。</p>
        </div>
        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block">REM 快速動眼期 (25%)</span>
          <p className="text-slate-600 dark:text-slate-300">做夢期、大腦情緒整合、抽象思維與創造力重新接線。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 34. L-REST-04: 咖啡因腺苷受體拮抗與 5-7 小時半衰期                             */
/* -------------------------------------------------------------------------- */
const CaffeineAdenosineGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="咖啡因半衰期與腺苷受體">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            咖啡因分子競爭：腺苷受體卡位與 5–7 小時漫長半衰期
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          神經藥理學
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1.5">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">腺苷受體拮抗 (不等於疲勞消失)</span>
          <p className="text-slate-600 dark:text-slate-300">
            咖啡因分子結構類似腺苷，直接卡住大腦睡眠受體。大腦感覺不到疲累，但腺苷依然在幕後持續累積；藥效一過容易造成嚴重崩潰 (Crash)。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5">
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">下午兩點停喝原則</span>
          <p className="text-slate-600 dark:text-slate-400">
            咖啡因半衰期長達 5–7 小時。下午 4 點喝一杯大冰美 (約 200mg)，到午夜 12 點體內仍殘留 50–70mg 咖啡因，嚴重剝奪深層睡眠長度。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 35. L-REST-05: 史丹佛生理嘆氣與自律神經調節                                    */
/* -------------------------------------------------------------------------- */
const PhysiologicalSighGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="史丹佛生理嘆氣雙吸一呼放鬆機制圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            神經生理機制：史丹佛「生理嘆氣」(Physiological Sigh) 迅速降心率
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 font-medium">
          Huberman Lab / Stanford 2023
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5">
          <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center text-xs">
            1
          </div>
          <span className="font-bold text-slate-900 dark:text-white block text-sm">步驟一：鼻子深吸一口氣</span>
          <p className="text-slate-600 dark:text-slate-400">
            用鼻子緩慢深吸氣，約將肺部擴充至 80% 容量。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5">
          <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center text-xs">
            2
          </div>
          <span className="font-bold text-slate-900 dark:text-white block text-sm">步驟二：在頂端再短吸一口</span>
          <p className="text-slate-600 dark:text-slate-400">
            不吐氣，直接在頂點迅速再短吸一下。這會重新充盈（Pop Open）塌陷的數百萬顆微小肺泡。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5">
          <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center text-xs">
            3
          </div>
          <span className="font-bold text-slate-900 dark:text-white block text-sm">步驟三：用嘴巴長長吐出</span>
          <p className="text-slate-600 dark:text-slate-400">
            慢速完全吐氣，吐氣時間應為吸氣的 2 倍長。此動作刺激副交感神經迷走信號，立即減慢心跳。
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-950 dark:text-teal-200">
        🌿 <strong>臨床實證：</strong>連續重複 2 至 3 次生理嘆氣，是目前醫學證實能在 30 秒內最快解除急性焦慮、平息交感神經衝動的自主調節技巧。
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 36. L-REST-06: 壓力反應 HPA 軸與慢性皮質醇過載惡性循環                         */
/* -------------------------------------------------------------------------- */
const HpaAxisStressGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="HPA軸壓力反應與皮質醇過載">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            壓力警報系統：下視丘–腦下垂體–腎上腺 (HPA) 軸與皮質醇毒性
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          神經內分泌學
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm block">1. 杏仁核警報拉響</span>
          <p className="text-slate-600 dark:text-slate-400">大腦將心理壓力解讀為生存威脅，指令下視丘釋放 CRH 荷爾蒙。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">2. 腎上腺皮質醇狂飆</span>
          <p className="text-slate-600 dark:text-slate-300">血壓上升、免疫抑制、釋放大量血糖至血液中備戰。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">3. 慢性海馬迴萎縮</span>
          <p className="text-slate-600 dark:text-slate-300">長期高皮質醇具神經毒性，傷害記憶中樞海馬迴，導致焦慮憂鬱與失眠。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 37. L-REST-07: 孤獨與社交隔離的生理傷害模型                                     */
/* -------------------------------------------------------------------------- */
const SocialConnectionGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="社交連結與孤獨健康危害">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            隱形殺手：WHO 2025 孤獨與社交隔離的生理等價危害
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          WHO 2025 社會連結報告
        </span>
      </div>

      <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/20 text-xs space-y-2">
        <div className="text-sm font-bold text-rose-950 dark:text-rose-200">
          ⚠️ 長期嚴重社交孤立，對全因死亡率的傷害相當於「每天抽 15 支香菸」！
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          演化生物學中，離群索居代表生存機率低，大腦會自主開啟長期的全身慢性微發炎反應與血壓偏高；每週安排一次有溫度的面對面親友互動，能顯著刺激催產素 (Oxytocin) 分泌，具有強大的神經修復效應。
        </p>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 38. L-REST-08: 失眠認知行為治療 CBT-I 刺激控制四大鐵則                           */
/* -------------------------------------------------------------------------- */
const CbtiStimulusControlGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="失眠認知行為治療CBT-I四大原則">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            失眠首選療法：CBT-I 刺激控制 (Stimulus Control) 四大鐵則
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          ACP 第一線臨床指引 (優於安眠藥)
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">鐵則 1：睏了才上床</span>
          <p className="text-slate-600 dark:text-slate-300">不要為了湊睡覺時間而硬躺在床上滑手機等睡意。</p>
        </div>
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">鐵則 2：床只用於睡覺</span>
          <p className="text-slate-600 dark:text-slate-300">絕不在床上工作、追劇或吃飯，重塑大腦「床=睡眠」的神經制約。</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block">鐵則 3：20 分鐘不起就離床</span>
          <p className="text-slate-600 dark:text-slate-300">翻來覆去超過 20 分鐘立刻離開床，到微暗客廳看書，有睡意再回床。</p>
        </div>
        <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 block">鐵則 4：固定時間起床</span>
          <p className="text-slate-600 dark:text-slate-300">無論前晚幾點睡著，每天早晨同一時間起床照光，鞏固腺苷壓力節奏。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 39. L-CHK-01 / L-PRE-04: 代謝症候群 5 圈聯集判讀儀                            */
/* -------------------------------------------------------------------------- */
const MetabolicSyndromeGraphic: React.FC = () => {
  const criteria = [
    { label: '腹部肥胖（腰圍）', cutoff: '男性 ≥90 cm、女性 ≥80 cm', hint: '代表內臟脂肪超量堆積' },
    { label: '血壓偏高', cutoff: '收縮壓 ≥130 或舒張壓 ≥85 mmHg', hint: '或正在服用降血壓藥物' },
    { label: '空腹血糖偏高', cutoff: '空腹血糖 ≥100 mg/dL', hint: '代表胰島素阻抗已浮現' },
    { label: '三酸甘油酯偏高', cutoff: 'TG ≥150 mg/dL', hint: '肝臟脂肪合成與代謝過載' },
    { label: '高密度膽固醇偏低', cutoff: '男 <40 mg/dL、女 <50 mg/dL', hint: '血管清道夫功能不足' },
  ];

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="代謝症候群五項臨床標準綜合判讀圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            臨床診斷標準：代謝症候群五項危險因子判定儀
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          衛福部國健署標準
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-950 dark:text-amber-200">
        ⚠️ <strong>判定準則：</strong>以下五項指標中，若符合 <strong>3 項或以上</strong>，即確診代謝症候群。未來罹患糖尿病機率增加 6 倍、心血管疾病增加 2 至 3 倍！
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
        {criteria.map((c, i) => (
          <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
              <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 inline-flex items-center justify-center text-xs">
                {i + 1}
              </span>
              <span>{c.label}</span>
            </div>
            <div className="font-semibold text-rose-600 dark:text-rose-400 tabular-nums">{c.cutoff}</div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">{c.hint}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 40. L-CHK-02: 2025 ACC/AHA 高血壓四級分期與診間 vs 居家對照表                  */
/* -------------------------------------------------------------------------- */
const BloodPressureStagesGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="高血壓分期與診間居家對照">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            血壓階梯：2025 ACC/AHA 分期與診間 vs 居家 722 門檻對照
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 font-medium">
          AHA/ACC 2025
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">理想血壓 🟢</span>
          <div className="font-bold text-slate-900 dark:text-white text-sm">&lt; 120 / 80</div>
          <p className="text-slate-600 dark:text-slate-300">維持健康生活型態與低鈉高鉀飲食。</p>
        </div>
        <div className="p-3 rounded-xl border border-yellow-200 dark:border-yellow-900/60 bg-yellow-50 dark:bg-yellow-950/20 space-y-1">
          <span className="font-bold text-yellow-900 dark:text-yellow-300 block">血壓偏高 🟡</span>
          <div className="font-bold text-slate-900 dark:text-white text-sm">120–129 / &lt;80</div>
          <p className="text-slate-600 dark:text-slate-300">非藥物介入：減重 5%、得舒飲食、每週 150 分鐘有氧。</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block">第 1 期高血壓 🟠</span>
          <div className="font-bold text-slate-900 dark:text-white text-sm">130–139 或 80–89</div>
          <p className="text-slate-600 dark:text-slate-300">評估 10 年心血管風險；若合併糖尿病需考慮藥物。</p>
        </div>
        <div className="p-3 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block">第 2 期高血壓 🔴</span>
          <div className="font-bold text-slate-900 dark:text-white text-sm">≥ 140 或 ≥ 90</div>
          <p className="text-rose-900 dark:text-rose-200">立即啟動降血壓藥物處方，預防腦中風與動脈硬化。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 41. L-CHK-03: 血脂異常最新指標階梯 (LDL-C vs Non-HDL vs ApoB vs Lp(a))        */
/* -------------------------------------------------------------------------- */
const LipidRiskLadderGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="血脂指標演進與ApoB">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            血脂黃金指標階梯：LDL-C 傳統盲點 vs ApoB 與 Lp(a) 遺傳風險
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          ACC/AHA 2026 血脂指引
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">1. 傳統 LDL-C</span>
          <p className="text-slate-600 dark:text-slate-400">測量膽固醇「重量」；在三酸甘油酯偏高時容易被嚴重低估。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">2. Non-HDL-C</span>
          <p className="text-slate-600 dark:text-slate-400">總膽固醇減去 HDL，免空腹即可粗估所有致動脈硬化顆粒。</p>
        </div>
        <div className="p-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">3. ApoB (首選精準) ★</span>
          <p className="text-emerald-950 dark:text-emerald-200">直接計算所有穿透血管的危險魚雷「總顆粒數」！目標 &lt;80 mg/dL。</p>
        </div>
        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block">4. Lp(a) 脂蛋白(a)</span>
          <p className="text-slate-600 dark:text-slate-300">一生測一次；90% 由基因決定，&gt;50 mg/dL 提示強烈早發性心梗遺傳風險。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 42. L-CHK-04: 血糖三指標 (FPG, HbA1c, OGTT) 糖尿病前期對照                   */
/* -------------------------------------------------------------------------- */
const GlucoseTrioGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="血糖三指標對照圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            血糖三聯檢：空腹血糖 (FPG)、糖化血色素 (HbA1c) 與 2h-OGTT 對照
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          ADA 2025 標準
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">正常健康區 🟢</span>
          <div className="text-slate-700 dark:text-slate-300 space-y-0.5">
            <div>空腹血糖 &lt; 100 mg/dL</div>
            <div>糖化血色素 &lt; 5.7%</div>
            <div>2小時耐糖 &lt; 140 mg/dL</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-900/80 bg-amber-50 dark:bg-amber-950/30 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">糖尿病前期 (黃金逆轉期) 🟡</span>
          <div className="text-slate-700 dark:text-slate-300 space-y-0.5">
            <div>空腹血糖 100–125 mg/dL</div>
            <div>糖化血色素 5.7–6.4%</div>
            <div>2小時耐糖 140–199 mg/dL</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">確診糖尿病 🔴</span>
          <div className="text-slate-700 dark:text-slate-300 space-y-0.5">
            <div>空腹血糖 ≥ 126 mg/dL</div>
            <div>糖化血色素 ≥ 6.5%</div>
            <div>2小時耐糖 ≥ 200 mg/dL</div>
          </div>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 43. L-CHK-07: 體組成診斷：BMI 盲點 vs 腰圍身高比 (WHtR < 0.5)                 */
/* -------------------------------------------------------------------------- */
const BodyCompositionGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="BMI盲點與腰圍身高比WHtR">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            體態真相：BMI 盲點（泡芙人 vs 巨肌）與腰圍身高比 (WHtR)
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          Ashwell WHtR 指南
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">BMI 的兩大盲區</span>
          <p className="text-slate-600 dark:text-slate-300">
            無法區分「肌肉」與「脂肪」。重訓巨巨常被判定為「過重」；而「正常體重代謝性肥胖」(MONW 泡芙人) 即使 BMI 21，內臟脂肪已严重過量。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">黃金準則：腰圍身高比 &lt; 0.5</span>
          <p className="text-slate-600 dark:text-slate-300">
            「腰圍除以身高」必須小於 0.5（例如身高 170 公分，腰圍應控制在 85 公分以內）。這是一秒揪出致命腹部內臟脂肪的最準確方法！
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 44. L-CHK-08: 骨質密度 DXA T-Score 尺規 (-1.0 至 -2.5) 与 FRAX               */
/* -------------------------------------------------------------------------- */
const BoneDensityGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="骨質密度DXA T-score尺規">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            骨本尺規：雙能量 X 光 DXA 骨密度 T-Score 與骨折防線
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          NOF · 台灣骨質疏鬆症學會
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">正常骨本：T-score ≥ -1.0 🟢</span>
          <p className="text-slate-600 dark:text-slate-300">骨質密度與年輕健康成人相比差距在 1 個標準差之內。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-900/80 bg-amber-50 dark:bg-amber-950/30 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">骨質缺乏 (Osteopenia)：-1.0 ~ -2.5 🟡</span>
          <p className="text-slate-600 dark:text-slate-300">骨本已顯著流失；需積極補鈣、補 D3 與進行負重阻力訓練。</p>
        </div>
        <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">骨質疏鬆症 (Osteoporosis)：≤ -2.5 🔴</span>
          <p className="text-rose-900 dark:text-rose-200">輕微跌倒甚至打噴嚏即可能引發壓迫性骨折；需專科藥物介入治療。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 45. L-PRE-01: 十年動脈硬化心血管疾病 ASCVD 風險評估維度                         */
/* -------------------------------------------------------------------------- */
const AscvdRiskGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="10年心血管疾病ASCVD風險評估">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            十年防線：動脈硬化心血管疾病 (ASCVD) 風險評估與一級預防
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          AHA/ACC 預防心臟學
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block">&lt; 5% 低風險</span>
          <p className="text-slate-600 dark:text-slate-300">維持生活型態、每 3–5 年追蹤血脂與血壓。</p>
        </div>
        <div className="p-3 rounded-xl border border-yellow-200 dark:border-yellow-900/60 bg-yellow-50 dark:bg-yellow-950/20 space-y-1">
          <span className="font-bold text-yellow-900 dark:text-yellow-300 block">5%–7.4% 臨界風險</span>
          <p className="text-slate-600 dark:text-slate-300">加做冠狀動脈鈣化積分 (CAC) 釐清是否需用藥。</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block">7.5%–19.9% 中度風險</span>
          <p className="text-slate-600 dark:text-slate-300">強烈建議中強度 Statin 降血脂藥物治療。</p>
        </div>
        <div className="p-3 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/30 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block">≥ 20% 高危險群</span>
          <p className="text-rose-900 dark:text-rose-200">啟動高強度 Statin，LDL 目標降至 &lt;70 mg/dL。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 46. L-PRE-05: 台灣 2025–2026 國健署五大公費癌症篩檢年齡地圖                    */
/* -------------------------------------------------------------------------- */
const CancerScreeningMapGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="台灣五大公費癌症篩檢年齡線">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            守護全家：台灣 2025–2026 國健署五大公費癌症篩檢年齡地圖
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          衛福部健保卡公費福利
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">🫁 肺癌 LDCT 電腦斷層</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">重度吸菸 (≥20包-年) 50–74歲 · 具家族史男45/女40起</div>
          <p className="text-slate-500 dark:text-slate-400">免顯影劑低輻射，每 2 年 1 次揪出早期肺腺癌。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">💩 大腸癌糞便潛血 FIT</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">45–74 歲（有家族史提早至 40 歲）</div>
          <p className="text-slate-500 dark:text-slate-400">每 2 年 1 次，無痛採便；陽性及時大腸鏡切息肉。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">🎗️ 乳房 X 光攝影</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">40–74 歲女性（擴大自 40 歲起）</div>
          <p className="text-slate-500 dark:text-slate-400">每 2 年 1 次，早期偵測微小鈣化點。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">🔬 子宮頸抹片檢查</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">25 歲以上有性經驗女性（擴大自 25 歲起）</div>
          <p className="text-slate-500 dark:text-slate-400">每年 1 次，早期發現子宮頸上皮病變。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">🦠 胃癌幽門桿菌篩檢 (新增)</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">45–74 歲成人常規健檢</div>
          <p className="text-slate-500 dark:text-slate-400">2026 年新納入公費，一生至少 1 次及早除菌。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">🦷 口腔黏膜檢查</span>
          <div className="text-emerald-700 dark:text-emerald-400 font-medium">30 歲以上嚼檳榔或吸菸者（原住民 18 歲起）</div>
          <p className="text-slate-500 dark:text-slate-400">每 2 年 1 次牙科或耳鼻喉科目視檢查。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 47. L-PRE-06: 健康長壽與肌少症阻斷 Matrix                                     */
/* -------------------------------------------------------------------------- */
const LongevityMatrixGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="健康老化三大支柱與阻斷肌少症視覺模型">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            健康長壽防線：延長健康餘命 (Healthspan) 的三大臨床支柱
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          WHO 健康老化指南
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm">
            🏋️ 支柱一：骨骼肌肉儲備
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-5">
            40 歲後骨骼肌每十年自然流失 8%。每週 2 次阻力訓練 + 充足蛋白質 (1.2–1.5 g/kg)，是避免跌倒、臥床與失能的最強護城河。
          </p>
        </div>

        <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 space-y-2">
          <span className="font-bold text-sky-900 dark:text-sky-300 block text-sm">
            ❤️ 支柱二：心肺耐力與血管彈性
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-5">
            VO2 Max 與心血管全因死亡率呈強烈負相關。維持每週 150 分鐘中強度有氧，保持內皮彈性與微循環暢通。
          </p>
        </div>

        <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
          <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm">
            🧠 支柱三：認知儲備與感官維護
          </span>
          <p className="text-slate-600 dark:text-slate-300 leading-5">
            聽力損失與社交孤立是失智症最大的可預防危險因子。積極矯正視力聽力、學習新技能，能大幅強化神經可塑性。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 48. L-PRE-07: 成人與高齡四大必打疫苗防護網                                      */
/* -------------------------------------------------------------------------- */
const AdultVaccinesGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="成人四大必打疫苗防護網">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            免疫護城河：成人生涯四大必備關鍵疫苗防護網
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          CDC · 台灣感染症醫學會
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">1. 流感疫苗 (Influenza)</span>
          <div className="text-slate-500">每年秋季 1 劑</div>
          <p className="text-slate-600 dark:text-slate-400">預防高齡心肌梗塞併發症與肺炎重症。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">2. 帶狀疱疹 (Shingrix)</span>
          <div className="text-slate-500">50歲以上 2 劑</div>
          <p className="text-slate-600 dark:text-slate-400">重組次單位疫苗保護力 &gt;90%，遠離痛不欲生之神經痛。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">3. 肺炎鏈球菌 (PCV+PPV)</span>
          <div className="text-slate-500">65歲以上公費施打</div>
          <p className="text-slate-600 dark:text-slate-400">PCV13 結合 PPV23 接力施打，預防侵襲性肺炎。</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">4. 呼吸道融合病毒 (RSV)</span>
          <div className="text-slate-500">60歲以上或慢性病患</div>
          <p className="text-slate-600 dark:text-slate-400">最新核准疫苗，預防長輩下呼吸道衰竭。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 49. L-PRE-08: 居家防跌四大檢核與 30 秒坐站起立自我篩檢                         */
/* -------------------------------------------------------------------------- */
const FallPreventionGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="居家防跌檢核與30秒坐站測試">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            跌倒預防：30 秒坐站起立肌力快篩與居家環境安全四大盲點
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-medium">
          CDC STEADI 防跌架構
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/20 space-y-1.5">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm block">30 秒坐站起立測試 (30s-CST)</span>
          <p className="text-slate-600 dark:text-slate-300">
            雙手在胸前抱胸，坐在無扶手椅子上，記錄 30 秒內起立坐下次數。65 歲以上男性 &lt;14 次、女性 &lt;12 次，提示下肢肌力不足與跌倒高風險！
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/20 space-y-1.5">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">居家環境四大防跌盲點</span>
          <p className="text-slate-600 dark:text-slate-300">
            1. 浴室濕滑（必裝防滑條與扶手）；2. 動線凌亂地毯絆倒；3. 夜間起尿光線昏暗（裝感應夜燈）；4. 穿著不合腳滑溜拖鞋。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 50. L-BAS-05: 門診溝通 Ask Me 3 與症狀六面向 (LOCATES) 準備卡                   */
/* -------------------------------------------------------------------------- */
const DoctorPrepGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="門診溝通Ask Me 3與就診準備視覺圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            門診高效溝通：Ask Me 3 核心問句與症狀 LOCATES 六面向清單
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          IHI 病患安全指引
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">1. 我的主要問題是什麼？</span>
          <p className="text-slate-600 dark:text-slate-300">
            請醫師明確告知當前症狀背後的診斷或臨床懷疑，而非僅開立退燒止痛藥。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 space-y-1.5">
          <span className="font-bold text-sky-900 dark:text-sky-300 text-sm block">2. 我現在需要做什麼？</span>
          <p className="text-slate-600 dark:text-slate-300">
            明確用藥時間、檢查排程與飲食生活調整清單；不理解的名詞當場請醫師解釋。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-1.5">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm block">3. 為什麼這件事很重要？</span>
          <p className="text-slate-600 dark:text-slate-300">
            了解治療能避免哪些器官並發症；若「不治療或私自停藥」未來 5 年會面臨何種風險。
          </p>
        </div>
      </div>

      <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong>門診準備小撇步：</strong>用手機拍下家中所有正在服用的藥袋、保健食品與中藥外包裝，看診時直接出示，徹底防範多重用藥衝突！
        </span>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 51. L-BAS-06: 藥袋五大欄位與致命藥物交互作用防護圖解                            */
/* -------------------------------------------------------------------------- */
const MedicationSafetyGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="用藥安全與藥袋判讀視覺圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            用藥安全防護：藥袋 5 大必看資訊與常見致命交互作用紅旗
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          臨床藥學衛教
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-900 dark:text-rose-300 block text-sm">抗凝血劑 + 魚油/NSAID</span>
          <p className="text-slate-600 dark:text-slate-300">Warfarin 或 DOACs 合用消炎止痛藥或大量銀杏魚油，顯著提升胃出血與腦出血風險！</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-900 dark:text-amber-300 block text-sm">降血壓/血脂 + 葡萄柚汁</span>
          <p className="text-slate-600 dark:text-slate-300">葡萄柚強烈抑制肝臟 CYP3A4 代謝酵素，造成血中藥物濃度暴衝數倍引發橫紋肌溶解或休克。</p>
        </div>
        <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-1">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-sm">普拿疼 (Acetaminophen)</span>
          <p className="text-slate-600 dark:text-slate-300">成人每日劑量極限 4,000 mg (約 8 顆)；感冒藥常重複添加，超量會引發急性致命肝衰竭！</p>
        </div>
        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1">
          <span className="font-bold text-purple-900 dark:text-purple-300 block text-sm">酒精 + 安眠鎮靜劑</span>
          <p className="text-slate-600 dark:text-slate-300">兩者中樞神經抑制具有超倍加成效應，極易誘發深度昏迷、呼吸抑制甚至猝死。</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 52. L-REST-05: 睡眠呼吸中止症 (OSA) STOP-Bang 與 AHI 分級量尺                   */
/* -------------------------------------------------------------------------- */
const OsaScreeningGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="阻塞性睡眠呼吸中止症STOP-Bang與AHI分級圖解">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            睡眠呼吸中止症：STOP-Bang 自評八準則與 AHI 嚴重度分級量尺
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          AASM 睡眠醫學標準
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block">正常 (Normal)</span>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 block">AHI &lt; 5 次/小時</span>
          <p className="text-slate-600 dark:text-slate-400">氣道暢通，夜間血氧飽和度維持 ≥95%，生理無明顯缺氧負擔。</p>
        </div>
        <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-800 dark:text-sky-300 text-sm block">輕度 (Mild OSA)</span>
          <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 block">AHI 5 – 15 次/小時</span>
          <p className="text-slate-600 dark:text-slate-400">偶有打呼與短暫窒息；若無白天嗜睡可先減重與側睡姿勢治療。</p>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-1">
          <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">中度 (Moderate OSA)</span>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 block">AHI 15 – 30 次/小時</span>
          <p className="text-slate-600 dark:text-slate-400">白天明顯疲憊、注意力不集中；建議配戴陽壓呼吸器 (CPAP) 或口腔牙套。</p>
        </div>
        <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-1">
          <span className="font-bold text-rose-800 dark:text-rose-300 text-sm block">重度 (Severe OSA)</span>
          <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 block">AHI &gt; 30 次/小時</span>
          <p className="text-slate-600 dark:text-slate-400">整夜嚴重低血氧；心血管死亡、難治型高血壓與中風風險激增 3 倍以上！</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 53. L-CHK-01: 台灣成人預防保健公費檢查分齡時程地圖                              */
/* -------------------------------------------------------------------------- */
const AdultCheckupRoadmapGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="台灣成人預防保健分齡公費時程地圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            健檢時間線：台灣成人預防保健分齡公費時程與核心追蹤項目 (2025–2026 新制)
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          衛福部國健署公費
        </span>
      </div>

      <div className="grid sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">30 – 39 歲 (新制)</span>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block">每 5 年 1 次公費健檢</span>
          <p className="text-slate-600 dark:text-slate-300">
            早期篩出久坐與精緻飲食引發的青壯年代謝症候群、血壓血脂微超標與脂肪肝。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 space-y-1.5">
          <span className="font-bold text-sky-900 dark:text-sky-300 text-sm block">40 – 64 歲壯年</span>
          <span className="text-xs font-semibold text-sky-700 dark:text-sky-400 block">每 3 年 1 次公費健檢</span>
          <p className="text-slate-600 dark:text-slate-300">
            動脈硬化與糖尿病前期關鍵逆轉窗口；比對連續報告數值趨勢，防止心血管事件。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-1.5">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm block">65 歲以上銀髮</span>
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 block">每年 1 次公費健檢</span>
          <p className="text-slate-600 dark:text-slate-300">
            監測心肺腎退化、多重用藥整合、認知衰退篩檢、肌少衰弱與跌倒風險評估。
          </p>
        </div>
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">45 – 79 歲肝炎專案</span>
          <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 block">終身 1 次 B、C 型肝炎篩檢</span>
          <p className="text-slate-600 dark:text-slate-300">
            早期截斷「肝炎→肝硬化→肝癌」三部曲；健保全面給付 C 肝口服藥 (治癒率&gt;95%)。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 54. L-PRE-02: 高血壓非藥物生活型態降壓階梯圖 (AHA 2025)                          */
/* -------------------------------------------------------------------------- */
const LifestyleBpReductionGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="高血壓生活型態非藥物降壓階梯效果圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            實證降壓階梯：生活型態各項非藥物介入之平均收縮壓降幅 (mmHg)
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          AHA/ACC 2025 臨床數據
        </span>
      </div>

      <div className="space-y-3">
        {[
          { label: '得舒飲食 (DASH Diet)', drop: '降 11 mmHg', pct: 100, note: '多蔬果、低脂乳品、全穀、少飽和脂肪與甜食 (降幅最大)', tone: 'bg-emerald-500' },
          { label: '減輕體重 (每減 10 公斤)', drop: '降 10 mmHg', pct: 90, note: '平均每減 1 公斤體重降約 1 mmHg 收縮壓', tone: 'bg-teal-500' },
          { label: '規律有氧運動 (每週 150 分鐘)', drop: '降 5 – 8 mmHg', pct: 70, note: '快走、慢跑、單車有氧提升微血管一氧化氮擴張', tone: 'bg-sky-500' },
          { label: '嚴格限制鈉攝取 (< 2,300 mg)', drop: '降 5 – 6 mmHg', pct: 55, note: '少喝火鍋湯、少吃加工醃漬品與重鹹醬料', tone: 'bg-indigo-500' },
          { label: '等長阻力訓練 (握力器/靠牆蹲)', drop: '降 4 – 5 mmHg', pct: 45, note: '每週 3 次每次 4 組 2 分鐘等長收縮舒張反射', tone: 'bg-purple-500' },
          { label: '節制飲酒 (男性<2單位，女性<1單位)', drop: '降約 4 mmHg', pct: 36, note: '減少交感神經過度刺激與夜間血壓晨峰', tone: 'bg-rose-500' },
        ].map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">{item.label}</span>
              <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{item.drop}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className={`h-full ${item.tone} rounded-full`} style={{ width: `${item.pct}%` }} />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.note}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 55. L-PRE-03: 糖尿病預防計畫 (DPP) 58% 逆轉效果對照圖                            */
/* -------------------------------------------------------------------------- */
const PrediabetesReversalGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="糖尿病前期生活逆轉DPP試驗效果圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            糖尿病前期逆轉：DPP 臨床試驗 3 組發病率降幅對比 (NEJM 黃金標準)
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          DPP Trial · ADA 2026
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 space-y-2">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">黃金介入組</span>
          <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono block">降 58%</span>
          <span className="font-bold text-slate-900 dark:text-white block">生活型態強化介入</span>
          <p className="text-slate-600 dark:text-slate-300">
            減重 7% + 每週 150 分鐘中強度運動。效果比藥物高出一倍，60 歲以上長者降幅更達驚人的 71%！
          </p>
        </div>

        <div className="p-4 rounded-xl border border-sky-300 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/30 space-y-2">
          <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider block">第一線藥物組</span>
          <span className="text-2xl font-black text-sky-700 dark:text-sky-400 font-mono block">降 31%</span>
          <span className="font-bold text-slate-900 dark:text-white block">二甲雙胍 (Metformin)</span>
          <p className="text-slate-600 dark:text-slate-300">
            每日服用 850mg 兩次。對年輕或重度肥胖者 (BMI≥35) 效果良好，但整體降幅仍不及生活型態調整。
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">對照組</span>
          <span className="text-2xl font-black text-slate-400 font-mono block">基準 0%</span>
          <span className="font-bold text-slate-900 dark:text-white block">一般常規衛教</span>
          <p className="text-slate-600 dark:text-slate-400">
            每年約有 11% 糖尿病前期者正式惡化為第 2 型糖尿病，證實光靠口頭衛教無法阻止胰島細胞凋亡。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 56. L-PRE-04: 2024 Lancet 委員會 14 大失智可改變因子生命歷程全景圖                */
/* -------------------------------------------------------------------------- */
const DementiaRiskGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="Lancet 14大失智可改變危險因子生命歷程全景圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            護腦防失智：2024 Lancet 委員會 14 大可改變失智因子全景圖 (佔總風險 45%)
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          Lancet 2024 報告
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-1.5">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm block">早年 (&lt;45 歲)</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200 block">教育程度不足 (5%)</span>
          <p className="text-slate-600 dark:text-slate-400">
            早期大腦突觸複雜度是終生「認知儲備 (Cognitive Reserve)」的底層基石。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">中年 (45–65 歲) — 影響最大</span>
          <span className="font-semibold text-rose-800 dark:text-rose-300 block">聽損 (7%)、高 LDL (7%)、高血壓 (2%)、肥胖、抽菸、憂鬱、腦外傷、過量飲酒</span>
          <p className="text-slate-600 dark:text-slate-300">
            聽力損失造成大腦顳葉萎縮；中年高膽固醇破壞微血管屏障；配戴助聽器與控制血脂是首要任務。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">晚年 (&gt;65 歲)</span>
          <span className="font-semibold text-amber-800 dark:text-amber-300 block">未治療視力喪失 (2%)、社交孤立 (4%)、缺乏運動 (2%)、糖尿病、空污</span>
          <p className="text-slate-600 dark:text-slate-300">
            視力障礙減少感官刺激；孤獨感引發皮質萎縮；白內障手術與積極社區社交是強效護腦防線。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 57. L-PRE-05: GLP-1/GIP 減重藥物機制與肌肉保護平衡圖                              */
/* -------------------------------------------------------------------------- */
const Glp1TherapyGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="GLP-1減重藥物機轉與肌肉保護平衡圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            GLP-1 腸道荷爾蒙治療：臨床減重降幅、心血管保護與保肌抗復胖鐵律
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          SURMOUNT-5 · WHO 2025
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">臨床試驗減重幅度</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Tirzepatide (雙重促效) 平均減重 <strong>20.2%</strong>；Semaglutide (單一促效) 平均減重 <strong>13.7%–14.9%</strong>。SELECT 試驗證實心血管猝死風險下降 20%。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">肌肉流失警戒線</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            減掉的體重中約有 <strong>25%–40%</strong> 可能是精瘦肌肉組織！必須配合每日 <strong>1.2–1.6 g/kg 蛋白質</strong> 與每週 2 次抗阻肌力訓練。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">停藥復胖與長期定位</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            STEP-1 延伸研究顯示：停藥 1 年內回升已減體重之 <strong>2/3</strong>。世界衛生組織已將其定義為慢性病長期治療，需有長期生活維持計畫。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 58. L-PRE-06: 亞洲肌少症 (AWGS) 與骨質疏鬆 DEXA T-Score 分級圖                   */
/* -------------------------------------------------------------------------- */
const SarcopeniaBoneGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="亞洲肌少症與骨質疏鬆檢測分級圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            抗衰老雙骨架：AWGS 亞洲肌少症診斷門檻與 DEXA 骨密度 T-Score 分級
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-medium">
          AWGS 2019 · IOF
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm block">亞洲肌少症 (AWGS 2019) 診斷指標</span>
          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
            <li>• <strong>手握力：</strong>男性 &lt; 28.0 kg、女性 &lt; 18.0 kg</li>
            <li>• <strong>5 次起立坐下測試：</strong>≥ 12.0 秒 (提示下肢功能衰退)</li>
            <li>• <strong>6 公尺步行速度：</strong>&lt; 1.0 m/s</li>
            <li>• <strong>肌肉量 DXA：</strong>男 &lt; 7.0、女 &lt; 5.4 kg/m²</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
          <span className="font-bold text-amber-900 dark:text-amber-300 text-sm block">DEXA 雙能量 X 光骨密度 T-Score 分級</span>
          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
            <li>• <strong className="text-emerald-700 dark:text-emerald-400">正常 (Normal)：</strong>T-Score ≥ -1.0 SD</li>
            <li>• <strong className="text-amber-700 dark:text-amber-400">骨質流失 (Osteopenia)：</strong>-1.0 &gt; T-Score &gt; -2.5 SD</li>
            <li>• <strong className="text-rose-700 dark:text-rose-400">骨質疏鬆 (Osteoporosis)：</strong>T-Score ≤ -2.5 SD</li>
            <li>• <strong className="text-purple-700 dark:text-purple-400">嚴重骨鬆：</strong>≤ -2.5 SD 且已合併脆弱性骨折病史</li>
          </ul>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 59. L-PRE-07: 女性更年期荷爾蒙變遷時程與 2025 FDA 實證平反圖                     */
/* -------------------------------------------------------------------------- */
const MenopauseHealthGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="更年期生理時程與FDA荷爾蒙療法實證平反圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            女性更年期生理變遷時程與 2025 年 FDA 荷爾蒙療法 (MHT) 實證重大平反
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-medium">
          NAMS · FDA 2025 新修訂
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 space-y-1.5">
          <span className="font-bold text-purple-900 dark:text-purple-300 text-sm block">更年期三大代謝改變</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            雌激素驟降導致保護力喪失：<strong>LDL 膽固醇顯著上升 15–20%</strong>、骨質流失率高達每年 2–3%、內臟脂肪迅速囤積。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
          <span className="font-bold text-rose-900 dark:text-rose-300 text-sm block">FDA 2025 黑框重大平反</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            正式移除荷爾蒙療法在心血管、乳癌與失智的黑框警語。在<strong>停經 10 年內且 &lt;60 歲</strong>開始治療中重度熱潮紅，絕對風險極低且顯著改善睡眠與骨質。
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1.5">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">局部泌尿生殖症候群 (GSM)</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            針對陰道乾澀與反覆泌尿道感染，<strong>局部低劑量陰道雌激素</strong>全身吸收極微，長期使用安全性極高，無須過度恐懼。
          </p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 60. L-PRE-09: 戒菸後身體生理機能修復時間進程與健康餘命回春階梯                   */
/* -------------------------------------------------------------------------- */
const SmokingCessationGraphic: React.FC = () => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-4 shadow-xs" aria-label="戒菸後身體生理機能修復時間階梯圖">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cigarette className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            戒菸健康回春階梯：放下最後一口菸後的器官修復時間軸 (NEJM 經典研究)
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          WHO 戒菸臨床指南
        </span>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-start gap-3">
          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm shrink-0 w-24">20 分鐘</span>
          <p className="text-slate-700 dark:text-slate-300">心跳與血壓開始平緩降回正常值，末梢手腳微血管溫度回升。</p>
        </div>
        <div className="p-3 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20 flex items-start gap-3">
          <span className="font-mono font-bold text-teal-700 dark:text-teal-400 text-sm shrink-0 w-24">24 小時</span>
          <p className="text-slate-700 dark:text-slate-300">血液中劇毒一氧化碳 (CO) 濃度歸零，血紅素攜氧能力完全恢復正常。</p>
        </div>
        <div className="p-3 rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 flex items-start gap-3">
          <span className="font-mono font-bold text-sky-700 dark:text-sky-400 text-sm shrink-0 w-24">1 年</span>
          <p className="text-slate-700 dark:text-slate-300">冠狀動脈心臟病發作風險<strong>直接砍半 (降 50%)</strong>！血管內皮慢性微發炎大幅消退。</p>
        </div>
        <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 flex items-start gap-3">
          <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400 text-sm shrink-0 w-24">5 – 10 年</span>
          <p className="text-slate-700 dark:text-slate-300">腦中風風險降至與不吸菸者完全相同；肺癌死亡風險相較持續吸菸者降低一半。</p>
        </div>
        <div className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 flex items-start gap-3">
          <span className="font-mono font-bold text-purple-700 dark:text-purple-400 text-sm shrink-0 w-24">40 歲前戒菸</span>
          <p className="text-slate-700 dark:text-slate-300"><strong>避免 90% 吸菸所致的提早死亡</strong>，平均挽回整整 10 年健康壽命！</p>
        </div>
      </div>
    </figure>
  );
};

/* -------------------------------------------------------------------------- */
/* 61. 通用路徑概念圖解 Fallback                                                  */
/* -------------------------------------------------------------------------- */
const TrackFallbackGraphic: React.FC<{ track: LearningTrack; lesson: Lesson }> = ({ track, lesson }) => {
  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 space-y-3.5 shadow-xs" aria-label={`${lesson.title_zh} 實證機制圖解`}>
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            路徑機制卡：{track.title_zh} · {lesson.title_zh}
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
          實證核心要點
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
          <span className="font-bold text-slate-800 dark:text-slate-200 block text-sm">核心生理機制</span>
          <p className="text-slate-600 dark:text-slate-400 leading-5">
            {lesson.big_idea_zh}
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-1">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 block text-sm">生活轉化行動</span>
          <p className="text-slate-600 dark:text-slate-400 leading-5">
            {lesson.do_today_zh[0] ?? '依照循證原則從小步開始建立習慣'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl border border-sky-100 dark:border-sky-900/40 bg-sky-50/40 dark:bg-sky-950/20 space-y-1">
          <span className="font-bold text-sky-900 dark:text-sky-300 block text-sm">臨床就醫紅線</span>
          <p className="text-slate-600 dark:text-slate-400 leading-5">
            {lesson.see_doctor_zh && lesson.see_doctor_zh.length > 0
              ? lesson.see_doctor_zh[0]
              : '有急性胸痛、呼吸急促或神經學症狀應立即就醫'}
          </p>
        </div>
      </div>
    </figure>
  );
};
