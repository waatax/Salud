import React, { useState } from 'react';
import {
  Flame,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layers,
  BatteryCharging,
  Compass,
  BookOpen,
  ArrowRight,
  Sparkles,
  Activity,
  Award,
  Gauge,
  Stethoscope,
  HeartPulse,
  Utensils,
  RotateCcw,
  Moon,
  AlertTriangle,
  Apple,
  Droplets,
  Calendar,
  Info,
} from 'lucide-react';

type DeepTabId =
  | 'SPECTRUM'
  | 'MEDICAL'
  | 'METHODS'
  | 'CALISTHENICS'
  | 'PROGRAMS'
  | 'RECOVERY'
  | 'NUTRITION'
  | 'PYRAMID';

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
    label_zh: '登百岳下坡單腿緩衝衝擊 (48 kg)',
    taskLoadKg: 48,
    context_zh: '負重 12–15 kg 下坡每一步，單膝與股四頭肌承受之動態衝擊',
  },
  {
    id: 'emergency_support',
    label_zh: '緊急攙扶跌倒家人／搬動家具 (60 kg)',
    taskLoadKg: 60,
    context_zh: '突發長輩失衡跌倒時抱起攙扶，或防颱挪動重型盆栽鐵櫃',
  },
];

export const MonsterStrengthEnduranceSection: React.FC = () => {
  const [maxStrengthKg, setMaxStrengthKg] = useState<number>(75);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('luggage_stairs');
  const [activeDeepTab, setActiveDeepTab] = useState<DeepTabId>('SPECTRUM');
  const [activeCalisthenicsPattern, setActiveCalisthenicsPattern] = useState<number>(0);
  const [activeProgramTab, setActiveProgramTab] = useState<'HOME' | 'INTERMEDIATE' | 'SENIOR'>('HOME');

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
        repsText: '8 – 11 下（中度負荷）',
        status: '尚可應付 · 短時間內會劇烈疲勞',
        toneClass: 'text-sky-800 bg-sky-50 border-sky-200 dark:text-sky-300 dark:bg-sky-950/40 dark:border-sky-800/60',
        desc: '相當於肌肥大區間負荷，搬一下沒問題，連續幾次後下背與雙腿開始痠軟，需要頻繁停下喘息。',
      };
    }
    if (pct >= 52) {
      return {
        repsText: '18 – 25 下（肌耐力充裕）',
        status: '游刃有餘 · 動作維持自如',
        toneClass: 'text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800/60',
        desc: '因為最大肌力充足，這項重量對你僅約一半負擔，可輕鬆重複搬動且心跳平穩。',
      };
    }
    return {
      repsText: '35+ 下（輕鬆自如）',
      status: '耐力餘裕極大 · 結構完全防護',
      toneClass: 'text-emerald-900 bg-emerald-100/80 border-emerald-300 dark:text-emerald-200 dark:bg-emerald-900/40 dark:border-emerald-700',
      desc: '最大肌力遠高於日常所需！如同開大卡車載輕量行李，關節磨損極小且具備超強肌耐力與防傷韌性。',
    };
  };

  const enduranceEval = estimateEnduranceReps(relativePct);

  // Six Calisthenics Patterns
  const CALISTHENICS_PATTERNS = [
    {
      name_zh: '下肢推（深蹲模式）',
      icon: '🦵',
      primary_muscle: '股四頭肌、臀大肌、內收肌',
      joint_mechanics: '膝關節與髖關節雙軸屈伸，閉鏈承重',
      regression_1: '扶椅背椅子起站（Chair Squat，適合長者與膝關節敏感者，3 組 × 15 次）',
      regression_2: '徒手箱上深蹲（Box Squat，限制下蹲深度消弭恐懼感，3 組 × 15–20 次）',
      baseline: '徒手全幅度深蹲（Air Squat，雙腳髖寬腳尖微開，大腿折痕低於膝蓋，4 組 × 20 次）',
      progression_1: '前後分腿蹲（Split Squat，前後大步跨開後膝輕觸地面，3 組 × 12 次/側）',
      progression_2: '保加利亞單腿分腿蹲（Bulgarian Split Squat，後腳背抬高於矮凳，3 組 × 10–12 次/側）',
      apex: '單腿手槍深蹲（Pistol Squat，單腳懸空下蹲至最深處，極致下肢相對肌力與關節穩定）',
      tempo_cue: '3-1-3 節奏：3 秒慢下、1 秒底端不放鬆停頓、3 秒推地站起，絕不利用膝關節反彈借力。',
    },
    {
      name_zh: '上肢水平推（伏地挺身模式）',
      icon: '💪',
      primary_muscle: '胸大肌、前三角肌、肱三頭肌、核心前側',
      joint_mechanics: '肩關節水平內收與肘伸展，身體呈等長斜板剛性',
      regression_1: '站姿推牆伏地挺身（Wall Push-up，承受體重約 30%，關節壓力最低，3 組 × 20 次）',
      regression_2: '雙手撐桌面／流理台斜推（Incline Push-up，承受體重約 45%，3 組 × 15 次）',
      regression_3: '膝跪姿伏地挺身（Kneeling Push-up，縮短力臂，承受體重約 54%，3 組 × 12–15 次）',
      baseline: '標準地面伏地挺身（Standard Push-up，手肘與身體夾角 45°，承受約 64% 體重，3 組 × 15 次）',
      progression_1: '雙腳墊高下斜伏地挺身（Decline Push-up，腳放矮凳，承受體重約 74%，3 組 × 12 次）',
      progression_2: '窄距鑽石伏地挺身（Diamond Push-up）／慢速 4 秒離心伏地挺身（強化三頭肌與胸腔抗疲勞）',
      tempo_cue: '身體從頭頂到腳後跟維持如鋼板緊繃；吸氣下放胸口碰拳高，吐氣推起時把地板推離身體。',
    },
    {
      name_zh: '上肢水平／垂直拉（划船與引體模式）',
      icon: '🧗',
      primary_muscle: '背闊肌、菱形肌、斜方肌中下束、肱二頭肌',
      joint_mechanics: '肩胛骨後收下壓，肩伸展與肘屈曲，保護圓肩駝背',
      regression_1: '門框／毛巾站姿划船（Doorframe Row，雙手拉住堅固門框後仰傾斜拉起，3 組 × 20 次）',
      regression_2: '彈力帶坐姿划船（Seated Band Row，雙腳踩住彈力帶兩端，手肘往後拉過軀幹，3 組 × 20 次）',
      baseline: '結實桌下／低單槓反向划船（Inverted Row，身體仰臥斜懸掛拉胸碰桌底，3 組 × 12–15 次）',
      progression_1: '跳起慢速離心引體向上（Negative Pull-up，箱上跳起至下巴過槓，花 5 秒極慢下放，3 組 × 5 次）',
      progression_2: '標準引體向上（Pull-up 正手背肌導向 / Chin-up 反手二頭導向，3 組 × 6–10 次）',
      apex: '弓箭手引體向上（Archer Pull-up）或負重反向划船（背書包增重 5–10 kg）',
      tempo_cue: '手肘啟動前「肩胛骨先往下沉再往後夾」，想像把兩片背部肩胛骨中間的紙夾扁。',
    },
    {
      name_zh: '下肢鉸鏈與後鏈（臀橋與硬舉模式）',
      icon: '🍑',
      primary_muscle: '臀大肌、膕旁肌（大腿後側）、豎脊肌、核心後側',
      joint_mechanics: '髖關節主導屈伸，膝關節微屈固定，強化人體動力引擎',
      regression_1: '雙腿仰臥臀橋（Glute Bridge，屈膝平躺，腳跟推地夾緊臀部向上頂起，3 組 × 20 次）',
      regression_2: '腳跟墊高臀橋（Hamstring Bridge，腳跟放於瑜伽磚或矮凳，強化膕旁肌耐力，3 組 × 15 次）',
      baseline: '單腿仰臥臀橋（Single-leg Bridge，單腳懸空、單腳推地頂起維持骨盆水平，3 組 × 12 次/側）',
      progression_1: '徒手單腿羅馬尼亞硬舉（Single-leg RDL，單腳微屈支撐，另一腳向後延伸呈 T 字形，3 組 × 10 次/側）',
      progression_2: '徒手北歐腿彎舉退階（Nordic Hamstring Curl，雙膝跪地腳踝固定，身體極慢向前傾倒，3 組 × 5 次）',
      apex: '單腿跳躍穩定降落（Single-leg Hop & Stick）兼顧後鏈離心減速與抗疲勞',
      tempo_cue: '頂端臀肌強力夾緊 2 秒，感覺臀部像被點火燃燒，腰椎絕不拱起過伸代償。',
    },
    {
      name_zh: '核心抗變形耐力（脊椎鋼筋水泥模式）',
      icon: '🛡️',
      primary_muscle: '腹橫肌、腹直肌、腹內外斜肌、腰方肌、骨盆底肌',
      joint_mechanics: '脊椎維持等長中立剛性，杜絕彎曲／側倒／扭轉剪力',
      regression_1: '仰臥死蟲式（Dead Bug，抗伸展，下背死死貼住地面，對側手腳交替延伸，3 組 × 12 次/側）',
      regression_2: '四足跪姿鳥狗式（Bird Dog，抗旋轉，手腳延伸時軀幹如放一杯熱水般不灑出，3 組 × 12 次/側）',
      baseline: '標準肘撐前棒式（Standard Plank，臀部夾緊腹肌內縮，維持 45–60 秒，3 組）',
      progression_1: '側棒式（Side Plank，抗側屈，手肘撐地骨盆懸空，強化腰方肌與臀中肌，3 組 × 30–45 秒/側）',
      progression_2: '棒式交替拍肩（Plank Shoulder Taps，棒式中單手離地輕拍對側肩膀，骨盆完全不晃動，3 組 × 20 次）',
      apex: '長槓桿棒式（Long-lever Plank）或懸垂抬腿（Hanging Knee/Leg Raise）',
      tempo_cue: 'McGill 脊椎生物力學證實：核心的價值在於「肌耐力與抗疲勞剛性」，絕非仰臥起坐反覆彎腰磨損椎間盤。',
    },
    {
      name_zh: '全身動態步態與抗疲勞行走（Carry 搬運模式）',
      icon: '🚶',
      primary_muscle: '斜方肌、前臂握力、腹斜肌、足底筋膜、全身協調',
      joint_mechanics: '在動態步態中維持軀幹中立，最貼近真實生活搬重任務',
      regression_1: '原地高抬腿平穩行走（March in Place，雙手叉腰維持骨盆水平，每步停頓 1 秒，連續 2 分鐘）',
      regression_2: '徒手四足熊爬（Bear Crawl，手腳撐地雙膝離地 2 公分，對角手腳交替緩慢前進爬行 30 秒，3 組）',
      baseline: '居家購物袋／水桶等重雙手農夫走（Farmer\'s Carry，雙手各提 5–10 kg 重物挺胸行走 60 秒，3 組）',
      progression_1: '單側不平衡行李箱走（Suitcase Carry，僅單手提重物，核心全力抗側傾，3 組 × 45 秒/側）',
      progression_2: '胸前抱水箱／沙袋熊抱走（Bear Hug Carry，雙手環抱 15–20 kg 重物在胸前行走 60 秒）',
      apex: '樓梯農夫搬運走（雙手負重上下公寓階梯，日常功能耐力最高殿堂）',
      tempo_cue: '走路時步幅穩定，腳步放輕，肩膀絕不被重物拉垂，想像頭頂有一條繩子向天花板拉直脊椎。',
    },
  ];

  const currentPattern = CALISTHENICS_PATTERNS[activeCalisthenicsPattern];

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
              旗艦專題 · 肌耐力與最大肌力抗老科學
            </span>
            <span className="rounded-full border border-emerald-300 bg-emerald-100/60 px-3 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              醫學知識 · 科學方法 · 徒手天梯 · 實戰課表 · 修復營養
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>整合怪獸訓練觀點</span>
            <span>·</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">Dr. Ho Li-An Framework</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2
            id="monster-flagship-title"
            className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            肌耐力訓練科學全指南：先求最大肌力，再求肌耐力
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
            「老了只要甩甩手、拿輕啞鈴動一動就好？」——這是現代運動醫學最希望翻轉的迷思。老化最先萎縮的是高閾值快縮肌與骨本。
            <strong>「最大肌力是體能的火車頭」</strong>，當最大肌力天花板拉高，原本沉重的日常負擔便降到輕量區間，
            <strong>相對肌耐力自然倍增</strong>。結合徒手力學、臨床醫學、科學訓練法、完整課表與營養修復，打造一生不受限的抗老身體。
          </p>
        </div>

        {/* 3 Core Philosophical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/70 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <TrendingUp className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>天花板效應：拉高極限，耐力倍增</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              深蹲極限 40 kg 時，搬 20 kg 水箱相當於 50% 1RM，搬幾次就力竭喘氣；若練到極限 100 kg，20 kg 僅占 20% 輕負荷，可連續搬運數十次不累。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/70 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 dark:text-sky-300">
              <ShieldCheck className="w-4 h-4 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>結構防傷：保留安全防護餘裕</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              當生活負擔佔據能力的 80%–90% 時，任何一個咳嗽、失足或扭身都容易造成椎間盤拉傷；肌力充沛能提供 70% 以上的安全緩衝帶。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/70 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
              <BatteryCharging className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span>游刃有餘：常訓代替長照</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              訓練不追求把自己搞到癱軟嘔吐！掌握「Easy Max（保留 2–3 下餘力）」原則，以可持續的自體重與重量訓練，把肌力存進未來的健康存摺。
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator: 1RM Ceiling vs Relative Endurance Reps */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              「天花板決定地板」：最大肌力帶動相對肌耐力試算器
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            即時計算：% 1RM · 連續可重複次數 · 結構安全餘裕
          </span>
        </div>

        {/* Step 1: Select Scenario */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            步驟 1：選擇一項日常或運動負重任務（生活任務重量固定）：
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2" role="group" aria-label="生活或運動任務選擇">
            {DAILY_SCENARIOS.map((item) => {
              const selected = item.id === selectedScenarioId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedScenarioId(item.id)}
                  className={`btn-tactile rounded-xl border p-3 text-left transition-all ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-600/30 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-200'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold leading-snug">{item.label_zh}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{item.context_zh}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Slider for Max Strength (1RM) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pt-1">
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="max-strength-slider" className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  步驟 2：調整你的「最大肌力 (1RM)」天花板
                </label>
                <span className="font-mono text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                  {maxStrengthKg} kg
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                相當於你深蹲、六角槓硬舉或雙手合力能標準完成 1 下的最大重量極限。
              </p>
              <input
                id="max-strength-slider"
                type="range"
                min={40}
                max={160}
                step={5}
                value={maxStrengthKg}
                onChange={(e) => setMaxStrengthKg(Number(e.target.value))}
                className="w-full accent-emerald-600 dark:accent-emerald-400 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>40 kg (久坐初學者)</span>
                <span>80 kg (規律訓練)</span>
                <span>160 kg (高階健者)</span>
              </div>
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: '50 kg 初學者', val: 50 },
                { label: '75 kg 基礎體能', val: 75 },
                { label: '100 kg 強壯體格', val: 100 },
                { label: '130 kg 菁英儲備', val: 130 },
              ].map((preset) => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setMaxStrengthKg(preset.val)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                    maxStrengthKg === preset.val
                      ? 'border-emerald-600 bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60 space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3 border border-slate-200/70 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 block">生活任務重量</span>
                <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                  {scenario.taskLoadKg} kg
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{scenario.label_zh.split('(')[0]}</span>
              </div>
              <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 p-3 border border-emerald-200/70 dark:border-emerald-900/50">
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 block">相對負荷比例</span>
                <span className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                  {relativePct}% <span className="text-xs font-normal">1RM</span>
                </span>
                <span className="text-[10px] text-emerald-700/80 dark:text-emerald-300/80 block mt-0.5">占你最大力量百分比</span>
              </div>
              <div className="rounded-xl bg-sky-50/70 dark:bg-sky-950/30 p-3 border border-sky-200/70 dark:border-sky-900/50">
                <span className="text-[11px] text-sky-800 dark:text-sky-300 block">可連續反覆次數</span>
                <span className="text-sm font-bold text-sky-900 dark:text-sky-200 block mt-1">
                  {enduranceEval.repsText}
                </span>
                <span className="text-[10px] text-sky-700/80 dark:text-sky-300/80 block">相對肌耐力表現</span>
              </div>
            </div>

            {/* Safety Reserve Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-600 dark:text-slate-400">關節與脊椎安全餘裕 (Safety Reserve)：</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{safetyReservePct}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                <div
                  className="bg-emerald-600 dark:bg-emerald-400 transition-all duration-300"
                  style={{ width: `${safetyReservePct}%` }}
                />
                <div
                  className="bg-rose-500 dark:bg-rose-600 transition-all duration-300"
                  style={{ width: `${Math.min(100, relativePct)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0%（毫無餘裕）</span>
                <span>50%（健康防線）</span>
                <span>80%+（終身防護）</span>
              </div>
            </div>

            {/* Evaluation Alert Box */}
            <div className={`rounded-xl border p-3.5 space-y-1 ${enduranceEval.toneClass}`}>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>生理耐力狀態：{enduranceEval.status}</span>
              </div>
              <p className="text-xs leading-relaxed">{enduranceEval.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Deep Knowledge Modules Tab Navigation */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            肌耐力科學深化模組（點選分頁探索）
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">涵蓋光譜、醫學、科學法、徒手天梯、課表、修復與飲食</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist" aria-label="肌耐力八大知識模組">
          {[
            { id: 'SPECTRUM', label: '1. 連續光譜', sub: '最大肌力 vs 耐力光譜', icon: Activity },
            { id: 'MEDICAL', label: '2. 臨床醫學', sub: '肌少症、微血管與紅旗', icon: Stethoscope },
            { id: 'METHODS', label: '3. 科學訓練', sub: 'LME、TUT、PHA循環', icon: Zap },
            { id: 'CALISTHENICS', label: '4. 徒手天梯', sub: '六大自然動作進退階', icon: Layers },
            { id: 'PROGRAMS', label: '5. 實戰課表', sub: '居家、中階、長者課表', icon: Calendar },
            { id: 'RECOVERY', label: '6. 肌肉修復', sub: '慢波睡眠、主動修復、HRV', icon: Moon },
            { id: 'NUTRITION', label: '7. 飲食水合', sub: '白胺酸閾值、肝醣超補', icon: Utensils },
            { id: 'PYRAMID', label: '8. 怪獸哲學', sub: '動作金字塔與彈性調節', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeDeepTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDeepTab(tab.id as DeepTabId)}
                className={`rounded-2xl border p-3 text-left transition-all flex flex-col justify-between gap-1 ${
                  active
                    ? 'border-emerald-700 bg-emerald-800 text-white shadow-xs dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-950'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                </div>
                <span className={`text-[11px] truncate ${active ? 'text-emerald-100 dark:text-slate-800' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Spectrum */}
        {activeDeepTab === 'SPECTRUM' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-4 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                肌力與肌耐力連續光譜（Repetition Continuum）：不同重量在鍛鍊什麼？
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                「最大肌力」與「肌耐力」不是對立的兩端，而是同一條光譜的兩端。大重量（1–5 下）打造神經徵召與骨質天花板；中高反覆次數（15–25+ 下）則強化微血管密度、肌漿擴充與粒線體氧化能力。
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200">
                    <th className="py-3 px-3.5 font-bold">訓練目標區間</th>
                    <th className="py-3 px-3.5 font-bold">強度 (%1RM) 與次數</th>
                    <th className="py-3 px-3.5 font-bold">組間休息</th>
                    <th className="py-3 px-3.5 font-bold">生理適應機制（神經、血管、粒線體）</th>
                    <th className="py-3 px-3.5 font-bold">日常與抗老實質效益</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                    <td className="py-3 px-3.5 font-bold text-emerald-900 dark:text-emerald-300">
                      最大肌力 (Max Strength)
                      <span className="block text-[11px] font-normal text-emerald-700 dark:text-emerald-400">★ 體能火車頭與地板指標</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      85%–100% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 1–5 下 (RIR 1–3)</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">3 – 5 分鐘</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      徵召高門檻 Type IIx 快肌纖維、中樞神經發射頻率 (Rate Coding)、骨骼壓電效應增加骨質密度
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      拉高日常負重的安全餘裕，直接拉高「相對肌耐力」，搬重物閃腰風險降至最低
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">
                      爆發力 (Power / RFD)
                      <span className="block text-[11px] font-normal text-slate-500">力量 × 速度</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      30%–70% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 3–5 下（快速爆發）</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">2 – 3 分鐘</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      瞬發力 (RFD)、運動單位同步發射、肌腱膠原交聯剛性增強
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      絆倒瞬間神經快速跨步反應防跌倒、上下車與起步爆發推進力
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">
                      肌肥大 (Hypertrophy)
                      <span className="block text-[11px] font-normal text-slate-500">肌肉截面積擴充</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      65%–80% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 6–12 下 (RIR 1–3)</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">1.5 – 3 分鐘</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      機械張力與代謝壓力並行，啟動 mTORC1 促進肌原纖維與肌漿合成增厚
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      吸收儲存 80% 血糖庫存、改善胰島素阻抗、分泌肌肉素 (Myokines)
                    </td>
                  </tr>
                  <tr className="bg-sky-50/40 dark:bg-sky-950/20">
                    <td className="py-3 px-3.5 font-bold text-sky-900 dark:text-sky-300">
                      專項肌耐力 (Muscular Endurance)
                      <span className="block text-[11px] font-normal text-sky-700 dark:text-sky-400">★ 粒線體與微血管網</span>
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      &lt; 65% 1RM
                      <span className="block text-xs font-normal text-slate-500">每組 15–25+ 下或等長維持</span>
                    </td>
                    <td className="py-3 px-3.5 tabular-nums text-slate-600 dark:text-slate-300">30 – 90 秒</td>
                    <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                      促進肌肉微血管新生 (Capillarization)、粒線體氧化酶活性、MCT1 乳酸穿梭清除能力
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                      爬山連續上坡走不喘不腿軟、久站姿勢維持不駝背、提購物袋走長路不痠痛
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Medical Knowledge & Pathology */}
        {activeDeepTab === 'MEDICAL' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                骨骼肌臨床醫學效益：肌耐力不只是運動，更是治病防衰良藥
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                現代運動醫學將骨骼肌定義為「人體最大的內分泌與代謝器官」。肌耐力收縮能啟動一系列全身性生化修復與心血管保護機制。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <HeartPulse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>1. 肌肉內分泌（Myokines）與肌少症逆轉</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  骨骼肌收縮時分泌肌肉細胞因子（如 IL-6 抗發炎因子、Irisin 促進脂肪棕色化、BDNF 腦神經滋養因子）。40 歲後肌肉量每十年流失 8%，但肌耐力與最大肌力流失更快（Dynapenia）。規律耐力訓練能維持神經肌肉運動單位完整性，逆轉虛弱老化。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-800 dark:text-sky-300">
                  <Activity className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>2. 微血管新生（Capillarization）與氧氣萃取</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  高次數肌耐力訓練誘發局部組織低氧與剪切力，刺激血管內皮生長因子（VEGF），使肌纖維周邊毛細血管密度增加 20–40%，大幅擴充電解質與氧氣萃取率（a-vO₂ diff），顯著降低日常心臟做功負擔與安靜心率。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-800 dark:text-violet-300">
                  <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span>3. 粒線體合成與 GLUT4 血糖調節</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  耐力收縮活化 AMPK-PGC-1α 生化途徑，促進粒線體分裂生成；同時刺激葡萄糖轉運蛋白-4（GLUT4）不需胰島素直接轉移至肌細胞膜攝取血糖，為第 2 型糖尿病與代謝症候群最天然的降血糖處方。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>4. 關節軟骨滑液吸潤作用（Imbibition）</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  關節軟骨無血管神經，其營養完全仰賴「動作承重與減壓的動態泵浦效應（軟骨吸潤作用）」。完全靜止不動反而使關節軟骨乾癟磨損；正確閉鏈肌耐力運動（如分腿蹲、臀橋）能刺激滑膜分泌玻尿酸，為退化性關節炎（OA）首選非藥物處方。
                </p>
              </div>
            </div>

            {/* Red Flag Alert: DOMS vs Rhabdomyolysis */}
            <div className="rounded-xl border border-rose-300 bg-rose-50/80 p-4.5 dark:border-rose-900/70 dark:bg-rose-950/30 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-rose-900 dark:text-rose-200">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />
                <span>醫學紅旗警訊：延遲性肌肉痠痛 (DOMS) vs 橫紋肌溶解症 (Rhabdomyolysis) 鑑別</span>
              </div>
              <div className="text-xs text-rose-950 dark:text-rose-200 leading-relaxed space-y-1.5">
                <p>
                  <strong>• 正常良性 DOMS：</strong>運動後 24–72 小時達到高峰，為肌原纖維微創修復之發炎，局部輕觸痛、活動微僵硬，洗溫水澡、輕度快走與充足飲水 3–5 天即可自行緩解。
                </p>
                <p>
                  <strong>• 橫紋肌溶解症急診紅旗（三聯徵）：</strong>
                  ① 肌肉劇烈腫脹、僵硬劇痛並伴隨無力；
                  ② <strong>尿液呈現「可樂色、深濃茶色或醬油色」</strong>（肌紅蛋白 Myoglobin 漏出阻塞腎小管）；
                  ③ 尿量急遽減少（&lt;400 mL/天）、噁心嘔吐甚至發燒。
                  <strong>若出現深色尿或嚴重腫脹，切勿當成普通痠痛硬撐，應立即赴急診抽血檢驗血清肌酸激酶 (CK) 與腎功能 (Cr/eGFR)！</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Scientific Training Methods */}
        {activeDeepTab === 'METHODS' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                局部肌耐力 (LME) 科學處方與進階方法論
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                肌耐力不是盲目做到力竭喘死。透過精準控制張力時間（TUT）、周邊心臟循環（PHA）與密度管理，能在最低關節磨損下誘發最深層的微血管與代謝適應。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-900/60 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">① 負荷強度處方</span>
                <div className="text-base font-mono font-bold text-slate-900 dark:text-white">40% – 65% 1RM</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">或自體重、阻力帶；每組 15–25+ 次，等長收縮持續 30–60 秒。</p>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-900/60 space-y-1">
                <span className="text-[11px] font-bold text-sky-800 dark:text-sky-300">② 組間短休息</span>
                <div className="text-base font-mono font-bold text-slate-900 dark:text-white">30 – 60 秒</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">限制磷酸肌酸完全回補，誘發乳酸穿梭與細胞微血管新生訊號。</p>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-900/60 space-y-1">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">③ 張力時間 (TUT)</span>
                <div className="text-base font-mono font-bold text-slate-900 dark:text-white">3-1-3 節奏</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">3秒離心慢放、1秒底端停頓、3秒向心發力，杜絕慣性反彈借力。</p>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-900/60 space-y-1">
                <span className="text-[11px] font-bold text-violet-800 dark:text-violet-300">④ 每週有效組數</span>
                <div className="text-base font-mono font-bold text-slate-900 dark:text-white">8 – 15 組／部位</div>
                <p className="text-xs text-slate-600 dark:text-slate-300">每週分拆為 2–3 次課表完成，維持動作品質與 RIR 1–2 保留次數。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  <span>周邊心臟循環法 (Peripheral Heart Action, PHA)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  交替安排「上半身推 ➔ 下半身推 ➔ 上半身拉 ➔ 下半身後鏈 ➔ 核心抗旋轉」。迫使心臟將血液由上身驅趕至下身，避免單一肌群局部血壓驟升，兼具局部肌耐力強化與心血管高能量消耗，對三高族群極為友善。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/50 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-sky-600" />
                  <span>漸進密度訓練 (Escalating Density Training, EDT)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  設定 12 分鐘計時區塊，交替操作深蹲與伏地挺身（各 10–12 下），每次換動作稍作深呼吸，記錄 12 分鐘內總組數。下週目標在相同時間內增加 1 組或更輕鬆完成，是無需大重量即可實踐「漸進式超負荷」的絕佳手段。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Calisthenics Mastery & Progression Ladder */}
        {activeDeepTab === 'CALISTHENICS' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                徒手訓練專章：六大自然動作模式進退階階梯（Calisthenics Mastery）
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                自體重不是固定重量！透過調節<strong>「支點位置」、「力臂長度」與「身體傾角」</strong>，即可精準將負重在 20%–80% 體重間縮放。任何人都能找到無痛做 15–20 下的最佳起點。
              </p>
            </div>

            {/* Pattern Selector Tabs */}
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="六大徒手動作模式選擇">
              {CALISTHENICS_PATTERNS.map((p, idx) => {
                const active = activeCalisthenicsPattern === idx;
                return (
                  <button
                    key={p.name_zh}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCalisthenicsPattern(idx)}
                    className={`btn-tactile rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-emerald-700 text-white dark:bg-emerald-400 dark:text-slate-950 shadow-xs'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.name_zh.split('（')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Pattern Ladder Details */}
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/30 p-4 sm:p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-emerald-900/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentPattern.icon}</span>
                  <div>
                    <h5 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {currentPattern.name_zh}
                    </h5>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      主要肌群：{currentPattern.primary_muscle} · {currentPattern.joint_mechanics}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 self-start sm:self-auto">
                  閉鏈動力鏈 · 本體感覺回饋
                </span>
              </div>

              {/* Step-by-Step Progression Ladder */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  進退階天梯（由入門退階 ➔ 基準動作 ➔ 巔峰進階）：
                </span>

                <div className="space-y-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                      退階 1
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{currentPattern.regression_1}</p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                      退階 2
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{currentPattern.regression_2}</p>
                  </div>

                  <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/50 p-3.5 dark:border-emerald-400 dark:bg-emerald-950/40 flex items-start gap-3 shadow-xs">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-700 text-white dark:bg-emerald-400 dark:text-slate-950 shrink-0 mt-0.5">
                      基準動作 ★
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-emerald-950 dark:text-emerald-200 leading-relaxed">
                        {currentPattern.baseline}
                      </p>
                      <span className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 block mt-0.5">
                        日常抗老標準目標：能游刃有餘完成 3 組，動作全程不借力代償。
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-300 shrink-0 mt-0.5">
                      進階 1
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{currentPattern.progression_1}</p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 flex items-start gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-300 shrink-0 mt-0.5">
                      進階 2
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{currentPattern.progression_2}</p>
                  </div>

                  <div className="rounded-xl border border-amber-300 bg-amber-50/40 p-3 dark:border-amber-800/60 dark:bg-amber-950/20 flex items-start gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-600 text-white dark:bg-amber-400 dark:text-slate-950 shrink-0 mt-0.5">
                      巔峰挑戰
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{currentPattern.apex}</p>
                  </div>
                </div>
              </div>

              {/* Movement Tempo Cue */}
              <div className="rounded-xl border border-emerald-300/80 bg-white p-3.5 dark:border-emerald-800 dark:bg-slate-900 flex items-center gap-2.5">
                <Info className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>動作口令與節奏：</strong>{currentPattern.tempo_cue}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Structured Periodized Programs */}
        {activeDeepTab === 'PROGRAMS' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                三大科學化實戰肌耐力課表（依生活型態與目標選擇）
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                包含居家無器材 4 週全身循環、中階 PHA 心肺耐力混合課表、以及長者關節友善防肌少課表。
              </p>
            </div>

            {/* Program Type Tabs */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="課表類型選擇">
              {[
                { id: 'HOME', label: '課表 A：4 週居家無器材循環課表（上班族／初學）' },
                { id: 'INTERMEDIATE', label: '課表 B：中階功能性 PHA 壺鈴／啞鈴混合（進階燃脂耐力）' },
                { id: 'SENIOR', label: '課表 C：銀髮族防肌少護膝功能耐力課表（防跌復能）' },
              ].map((p) => {
                const active = activeProgramTab === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveProgramTab(p.id as any)}
                    className={`btn-tactile rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      active
                        ? 'bg-emerald-800 text-white dark:bg-emerald-400 dark:text-slate-950 shadow-xs'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Program A: Home Calisthenics */}
            {activeProgramTab === 'HOME' && (
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <div>
                    <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      課表 A：4 週居家無器材周邊心臟循環課表（PHA Circuit）
                    </h5>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      每週 3 天（如一、三、五）· 每次 25–35 分鐘 · 無需器材在家即做
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                    循環 3–4 輪 · 動作間休 30 秒
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200">
                        <th className="py-2.5 px-3 font-bold">順序</th>
                        <th className="py-2.5 px-3 font-bold">動作名稱</th>
                        <th className="py-2.5 px-3 font-bold">動作模式與主要肌群</th>
                        <th className="py-2.5 px-3 font-bold">反覆次數／時間</th>
                        <th className="py-2.5 px-3 font-bold">操作與代償防護要領</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">1</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">徒手深蹲或箱上蹲</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">下肢推 · 股四頭、臀大肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">15 – 20 下</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">膝蓋對準腳尖不內夾，大腿與地面平行</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">2</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">伏地挺身（依能力選斜推/跪姿/地面）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">上肢水平推 · 胸大肌、三頭肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">12 – 15 下</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">下背不塌陷，手肘與身體夾 45 度角</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">3</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">仰臥單腿臀橋（或雙腿橋）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">下肢鉸鏈後鏈 · 臀大肌、膕旁肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">12 – 15 下/側</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">腳跟推地，頂端臀肌強力夾緊 2 秒，腰不拱起</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">4</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">門框／毛巾站姿划船（或桌下反向划船）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">上肢水平拉 · 背闊肌、菱形肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">15 – 20 下</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">肩胛骨先往下再往後夾，不聳肩代償</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">5</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">仰臥死蟲式（Dead Bug）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">核心抗伸展 · 腹橫肌、深層腹壓</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">10 – 12 下/側</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">手腳延伸時下背死死貼地，留不下一絲縫隙</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">6</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">四足熊爬（Bear Crawl）或購物袋走</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">全身動態承重 · 前鋸肌、抗側傾</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">45 – 60 秒</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">膝離地 2 公分慢速爬行，或提等重購物袋走</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-white p-3.5 dark:border-emerald-900 dark:bg-slate-900 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">4 週超負荷漸進法則：</span>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc pl-4">
                    <li><strong>第 1 週（適應期）：</strong>做 3 輪，動作間休息 45 秒，熟悉 3-1-3 動作節奏。</li>
                    <li><strong>第 2 週（密度期）：</strong>做 3 輪，動作間休息縮短至 30 秒，代謝壓力提升。</li>
                    <li><strong>第 3 週（容量期）：</strong>增加至 4 輪，動作次數每項加 2–3 下。</li>
                    <li><strong>第 4 週（技術進階／減量）：</strong>前兩天嘗試升階動作（如全蹲進階為分腿蹲），週五減半組數主動修復。</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Program B: Intermediate PHA */}
            {activeProgramTab === 'INTERMEDIATE' && (
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <div>
                    <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      課表 B：中階功能性 PHA 壺鈴／啞鈴混合耐力課表
                    </h5>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      每週 3–4 天 · 每次 35–45 分鐘 · 結合小器材強化心肺與全身肌耐力
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300">
                    循環 4 輪 · 輪間休 90 秒
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200">
                        <th className="py-2.5 px-3 font-bold">順序</th>
                        <th className="py-2.5 px-3 font-bold">動作名稱</th>
                        <th className="py-2.5 px-3 font-bold">建議重量負荷</th>
                        <th className="py-2.5 px-3 font-bold">次數／時間</th>
                        <th className="py-2.5 px-3 font-bold">訓練效益</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-sky-700">1</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">高腳杯深蹲（Goblet Squat）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">啞鈴/壺鈴 8–16 kg</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">15 下</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">前抱負重強化核心直立與下肢耐力</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-sky-700">2</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">啞鈴地板臥推或站姿借力推</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">每手 6–12 kg</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">12 – 15 下</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">上肢推力耐力，限制肩膀伸展過度</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-sky-700">3</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">雙手壺鈴擺盪（Kettlebell Swings）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">壺鈴 12–20 kg</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">20 下</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">爆發性後鏈屈伸，心跳快速攀升</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-sky-700">4</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">單臂啞鈴划船（Dumbbell Row）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">每手 8–14 kg</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">12 下/側</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">單邊上背肌耐力與核心抗扭轉剛性</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-sky-700">5</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">雙手等重農夫走路（Farmer\'s Walk）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">每手 10–20 kg</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">60 秒持續走</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">全身抗疲勞力竭、握力與足弓耐力</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Program C: Senior Sarcopenia-Reversal */}
            {activeProgramTab === 'SENIOR' && (
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <div>
                    <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      課表 C：銀髮族防肌少護膝功能性耐力課表（Sarcopenia Reversal）
                    </h5>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      每週 2–3 天 · 每次 20–30 分鐘 · 關節友善 · 預防跌倒失能
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    動作間休 60 秒 · 安全穩固為第一
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200">
                        <th className="py-2.5 px-3 font-bold">順序</th>
                        <th className="py-2.5 px-3 font-bold">動作名稱</th>
                        <th className="py-2.5 px-3 font-bold">目標肌群</th>
                        <th className="py-2.5 px-3 font-bold">建議次數</th>
                        <th className="py-2.5 px-3 font-bold">日常抗老價值</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/50">
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">1</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">椅子起站（Sit-to-Stand）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">股四頭肌、臀大肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">10 – 15 次</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">雙手抱胸不靠手扶站起，維持如廁與自理能力</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">2</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">站姿扶牆伏地挺身</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">胸大肌、手肘支撐力</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">12 – 15 次</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">若不慎絆倒時上肢具備足夠推撐緩衝力</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">3</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">扶椅背踮腳尖提踵（Calf Raise）</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">腓腸肌、比目魚肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">15 – 20 次</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">強化第二心臟下肢靜脈回流，預防下肢水腫</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">4</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">雙腿仰臥臀橋</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">臀大肌、骨盆底肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">12 – 15 次</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">激活退化之臀肌，改善久坐骨盆前傾腰痠</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">5</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">彈力帶坐姿划船</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">背闊肌、菱形肌</td>
                        <td className="py-2.5 px-3 font-mono font-semibold">15 次</td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">挺胸後收肩胛骨，逆轉年長駝背含胸姿勢</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Recovery & Regeneration Science */}
        {activeDeepTab === 'RECOVERY' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Moon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                肌肉修復與神經內分泌科學：沒有修復就沒有適應
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                訓練本質上是「破壞」；真正的肌肉合成、微血管增生與神經網絡重組，完全發生在「訓練後修復期」。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 dark:text-indigo-300">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>1. 慢波睡眠 (SWS) 與生長激素 (GH) 脈衝</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  人體 70% 的每日生長激素（GH）脈衝釋放於深層非快速動眼期（NREM Stage 3 慢波睡眠）。生長激素促進肝臟分泌 IGF-1，刺激肌衛星細胞修補微創肌纖維。若睡眠不足（&lt;6 小時），皮質醇上升 30–50%，肌肉蛋白分解速度大於合成速度。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>2. 主動修復 (Active Recovery) 優於完全躺平</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  大訓練量隔日進行 20 分鐘 Zone 1 低強度活動（快走、輕鬆單車踩踏，自覺 RPE 2–3，心率 &lt;60% HRmax）。肌肉微弱收縮充當「周邊靜脈泵」，加速微血管床沖刷發炎代謝物與促進淋巴回流，排除乳酸殘餘與減緩 DOMS 速度顯著快於完全臥床。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-800 dark:text-sky-300">
                  <RotateCcw className="w-4 h-4 text-sky-600" />
                  <span>3. 滾筒筋膜放鬆 (SMR) 與組織水合</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  以泡棉滾筒針對股四頭肌、闊筋膜張肌、小腿三頭肌緩慢滾壓，在緊繃痛點（Trigger Points）停頓 30–60 秒深呼吸。壓迫能促使筋膜間質液重新流動水合（Fascial Hydration），降低肌梭高張力神經回饋，改善關節活動度。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>4. 迷走神經呼吸法與自律神經 HRV 監控</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  訓練結束後立即進行 3–5 分鐘「生理嘆息（連續兩次快吸氣＋長緩慢吐氣）」，快速啟動迷走神經使心率驟降，將中樞自「交感戰鬥」切換為「副交感修復」。若連續兩天晨間安靜心率 (RHR) 高於平時 5–8 bpm，提示中樞神經未恢復，當日自動退階。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Nutrition & Hydration */}
        {activeDeepTab === 'NUTRITION' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                肌力與肌耐力臨床飲食營養全指南
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                肌耐力訓練需要大量消耗肌肝醣並修復微創肌纖維。掌握「白胺酸觸發閾值」與「碳水超補窗口」，才能把訓練轉化為持久體能。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="rounded-xl border border-emerald-200/90 bg-emerald-50/40 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  <Apple className="w-4 h-4 text-emerald-600" />
                  <span>蛋白質與「白胺酸閾值 (Leucine Trigger)」</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  一般耐力訓練者每日 1.6–2.0 g/kg。中高齡與肌少症者存在「同化阻抗 (Anabolic Resistance)」，<strong>單餐蛋白質需達到 0.4 g/kg</strong>（或單餐含 2.5–3.0 g 白胺酸，如 1 掌心雞胸肉、3 顆蛋或 1 匙乳清），方能衝過閾值啟動 mTOR 蛋白質合成開關。
                </p>
              </div>

              <div className="rounded-xl border border-sky-200/90 bg-sky-50/40 p-4 dark:border-sky-900/50 dark:bg-sky-950/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-900 dark:text-sky-300">
                  <Flame className="w-4 h-4 text-sky-600" />
                  <span>3:1 肝醣超補黃金窗口</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  肌耐力收縮高度消耗肌肝醣。訓練後 30–60 分鐘內 GLUT4 大量在細胞膜開放，補充<strong>「碳水化合物：蛋白質 = 3:1 或 4:1」</strong>的點心（例如：香蕉＋無糖豆漿、地瓜＋茶葉蛋），肝醣合成酶活性提高，肌肝醣回補速度達單吃蛋白的 2 倍以上。
                </p>
              </div>

              <div className="rounded-xl border border-amber-200/90 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                  <Droplets className="w-4 h-4 text-amber-600" />
                  <span>水分與電解質防抽筋法則</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>脫水達體重 2% 即可使肌耐力輸出驟降 10–15%</strong>。運動每流失 1 kg 體重，需在 2–4 小時內補回 1.25–1.5 L 水分，並攝取含鈉（30–40 mmol/L）與鉀之飲料，預防低血鈉抽筋與神經傳導延遲。
                </p>
              </div>
            </div>

            {/* Micronutrient Matrix */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">四大關鍵微量營養素推薦：</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong className="text-emerald-700 dark:text-emerald-400 block">維生素 D3 + K2</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">引導鈣質沉積骨骼，活化肌肉細胞 VDR 受體維持快肌纖維。</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong className="text-sky-700 dark:text-sky-400 block">鎂 (Magnesium)</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">螯合 ATP 穩定能量代謝，促進肌漿網鈣離子回洗放鬆，預防抽筋。</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong className="text-amber-700 dark:text-amber-400 block">Omega-3 (EPA/DHA)</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">每日 1–2g，調節系統性慢性發炎，改善肌肉細胞膜流動性。</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong className="text-violet-700 dark:text-violet-400 block">肌酸 (Creatine)</strong>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">每日 3–5g，提升細胞內磷酸肌酸 (CP) 儲備，加速高強度間歇恢復。</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Monster Training Philosophy & Pyramid */}
        {activeDeepTab === 'PYRAMID' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/80 space-y-5 animate-fade-in">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                怪獸訓練金字塔與自然動作三大原則（何立安博士哲學）
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                體能金字塔的地基不是無休止的有氧慢跑，而是穩定的「動作控制與抗變形能力」，並以「最大肌力」為火車頭帶動專項耐力。
              </p>
            </div>

            {/* Pyramid Visual */}
            <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/40 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20 space-y-3">
              <div className="max-w-xl mx-auto space-y-2 text-center text-xs sm:text-sm">
                <div className="rounded-xl border border-amber-300 bg-amber-100/90 dark:bg-amber-950/60 dark:border-amber-800 p-2.5 font-bold text-amber-950 dark:text-amber-200 shadow-xs max-w-xs mx-auto">
                  頂層：專項肌耐力、速度與爆發力
                  <span className="block text-[11px] font-normal text-amber-800 dark:text-amber-300">（百岳負重、長跑跑姿、日常持久搬運）</span>
                </div>
                <div className="rounded-xl border-2 border-emerald-600 bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950 p-3 font-extrabold shadow-sm max-w-md mx-auto">
                  ★ 中層核心火車頭：最大肌力 (Maximum Strength)
                  <span className="block text-xs font-medium text-emerald-100 dark:text-slate-900">（深蹲、六角槓硬舉、推、拉 — 天花板拉高，底下全部變輕）</span>
                </div>
                <div className="rounded-xl border border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-700 p-3.5 font-bold text-slate-900 dark:text-white shadow-xs max-w-lg mx-auto">
                  最底層地基：人體自然動作控制與核心抗變形剛性
                  <span className="block text-xs font-normal text-slate-500 dark:text-slate-400">（關節活動度、腹壓 360 度剛性、不代償的中立脊椎）</span>
                </div>
              </div>
            </div>

            {/* Three Selection Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50 space-y-1.5">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">原則 1：人體自然動作原則</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  訓練人體出廠規格自然包含的五大動作：雙腿蹲（Squat）、髖鉸鏈（Hinge）、上肢推（Push）、上肢拉（Pull）與負重行走（Carry）。不依賴孤立單關節固定器械。
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50 space-y-1.5">
                <span className="text-xs font-bold text-sky-800 dark:text-sky-300">原則 2：低風險原則</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  大重量訓練優先選擇剪力小、容錯率高的器械。例如：六角槓硬舉優於傳統直槓、箱上蹲優於無限制深蹲，在極高肌力刺激下確保脊椎安全。
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50 space-y-1.5">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">原則 3：特殊變化度原則</span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  沒有所有人都適用的單一死板角度！根據個人的肢段長短、骨盆結構微調站距與握距，尊重生物力學多樣性，不強求教科書死板姿勢。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reference & Actions Card */}
      <div className="rounded-2xl border border-emerald-200/80 bg-white/95 p-4 sm:p-5 dark:border-emerald-900/50 dark:bg-slate-900/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>延伸學習與工具推薦 · 搭配 1RM 試算與專修小課</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            立即用下方試算器推估你的 1RM 與配重，或閱讀 6 分鐘白話專修小課；欲深度研究教練證照體系，可前往「肌力訓練」專題探索 TSCA 丙級完整五大模組。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="#strength-1rm-sim"
            className="btn-tactile inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 transition-colors"
          >
            <span>前往 1RM 試算器</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
          <a
            href="#learn/move/L-MOVE-08"
            className="btn-tactile inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-emerald-400 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>L-MOVE-08 專修小課</span>
          </a>
          <a
            href="#strength"
            className="btn-tactile inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50/70 px-3.5 py-2 text-xs font-bold text-emerald-900 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 transition-colors"
          >
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            <span>TSCA 丙級教練證照專修</span>
          </a>
        </div>
      </div>
    </section>
  );
};
