import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import {
  Utensils,
  Activity,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Calculator,
  BookOpen,
  HeartPulse,
  Scale,
  Hourglass,
  Moon,
  Wind,
  Droplets,
  Flame,
  Pill,
  Bone,
  CheckCircle2,
  AlertOctagon,
  ChevronRight,
  Gauge,
  ClipboardList,
  ExternalLink,
  HeartHandshake
} from 'lucide-react';

type PillarDimension = 'diet' | 'exercise' | 'prevention' | 'treatment';

interface PillarCategoryData {
  id: PillarDimension;
  title_zh: string;
  title_en: string;
  tagline: string;
  icon: React.ElementType;
  badgeTone: string;
  themeColor: string;
  keyRule: string;
  clinical_benchmarks: { label: string; value: string; unit: string; note: string }[];
  hubs: { title: string; desc: string; hash: string; icon: React.ElementType }[];
  calculators: { title: string; desc: string; hash?: string; modalId?: string; icon: React.ElementType }[];
  redFlagsSummary: string;
}

const FOUR_PILLARS_CATALOG: Record<PillarDimension, PillarCategoryData> = {
  diet: {
    id: 'diet',
    title_zh: '飲食營養',
    title_en: 'Nutrition & Dietetics',
    tagline: '科學飲食模式、水分電解質平衡、脂肪酸比例與熱量宏量營養素調控',
    icon: Utensils,
    badgeTone: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    themeColor: 'from-emerald-500 to-teal-600',
    keyRule: '「2:1:1 減脂餐盤 + 每日 30–35 mL/kg 水分 + 飽和脂肪 < 10% 總熱量」',
    clinical_benchmarks: [
      { label: '每日基礎水份', value: '30–35', unit: 'mL/kg', note: '依體重經驗估算，均勻分次攝取' },
      { label: '飽和脂肪上限', value: '< 10%', unit: '每日總熱量', note: '心血管高風險者建議 < 7%' },
      { label: '減脂期蛋白質', value: '1.6–2.2', unit: 'g/kg', note: '保留瘦體組織與刺激飽足腸泌素' },
      { label: '每日鈉鹽攝取', value: '< 2,000', unit: 'mg 鈉', note: '約 5 公克食鹽，預防高血壓與水腫' },
    ],
    hubs: [
      { title: '各式飲食模式比較', desc: '地中海、DASH 得舒、低碳生酮之心血管與血糖實證橫向評比', hash: 'diet/patterns', icon: Utensils },
      { title: '水分與水合機制', desc: '13 頁深度生理機制：細胞內外液滲透壓、尿液色卡與口渴中樞', hash: 'W', icon: Droplets },
      { title: '油脂烹調與脂肪酸', desc: '發煙點迷思、Omega-3/6/9 比例與動脈硬化致病假說', hash: 'O', icon: Flame },
      { title: '營養保健品 GRADE 評級', desc: '魚油、維生素 D3、肌酸等臨床人體研究實證分級與功效驗證', hash: 'supplements', icon: Pill },
    ],
    calculators: [
      { title: '個人化水分需求試算', desc: '依體重、環境溫度與活動量精算每日補水目標', hash: 'W/PAGE-W-02', icon: Droplets },
      { title: '油品脂肪酸替換模擬', desc: '即時換算橄欖油、芥花油與豬油之飽和/不飽和比例變化', hash: 'O/PAGE-O-03', icon: Flame },
      { title: '酒精 BAC 血液濃度試算', desc: '輸入酒種容量與體重，推算呼氣酒測值與退酒修復時間', hash: 'A/PAGE-A-04', icon: Pill },
    ],
    redFlagsSummary: '⚠️ 正在使用保鉀利尿劑或嚴重慢性腎臟病（eGFR < 30）者，切忌自行飲用高鉀低鈉鹽或無節制大量補水，需專科醫囑。',
  },
  exercise: {
    id: 'exercise',
    title_zh: '運動訓練',
    title_en: 'Exercise & Physiology',
    tagline: 'Zone 2 有氧心率、漸進超負荷重量訓練、筋膜活動度與運動傷害預防',
    icon: Activity,
    badgeTone: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 border-sky-300 dark:border-sky-800',
    themeColor: 'from-sky-500 to-blue-600',
    keyRule: '「每週 150 分鐘 Zone 2 低強度有氧 + 2 次大肌群漸進阻力訓練」',
    clinical_benchmarks: [
      { label: '中強度有氧目標', value: '150–300', unit: '分鐘/週', note: '最大心率 60–70%，促進粒線體合成' },
      { label: '全身阻力訓練', value: '2–3', unit: '次/週', note: '大肌群 8–12 下，刺激肌肥大與骨質沉積' },
      { label: '最大攝氧量 VO2 max', value: '頂標 50+', unit: 'mL/kg/min', note: '全因死亡率最強心肺保護獨立指標' },
      { label: '日行活動步數', value: '7,000–8,000', unit: '步/日', note: '顯著降低全因死亡率與久坐動脈硬化' },
    ],
    hubs: [
      { title: '運動生理與心率區間', desc: 'Zone 2 脂肪氧化、乳酸閾值與最大攝氧量科學訓練處方', hash: 'exercise', icon: Activity },
      { title: '重量訓練與肌肥大', desc: '漸進超負荷、RPE/RIR 自覺強度與 1RM 實用換算矩陣', hash: 'exercise/strength', icon: Scale },
      { title: '慢跑配速與跑者防護', desc: '步頻動態、下肢肌腱炎預防與長距離慢跑 (LSD) 指南', hash: 'exercise/running', icon: Activity },
      { title: '活動度與筋膜伸展', desc: '關節活動度自檢、動態熱身與神經滑動術預防僵硬疼痛', hash: 'exercise/mobility', icon: Sparkles },
    ],
    calculators: [
      { title: '心率區間 Zone 1–5 計算', desc: '依靜態心率與最大心率推算精準有氧訓練區間', hash: 'exercise', icon: HeartPulse },
      { title: '1RM 最大肌力換算器', desc: '以多下數推估深蹲、臥推與硬舉單下極限重量', hash: 'exercise/strength', icon: Scale },
      { title: '跑步配速與步頻換算', desc: '計算不同里程配速與馬拉松完賽時間推估', hash: 'exercise/running', icon: Activity },
    ],
    redFlagsSummary: '🚨 運動中出現劇烈胸悶壓迫感、下巴喉嚨緊縮、冷汗暈眩或心律突發紊亂，應立即停止並就近就醫！',
  },
  prevention: {
    id: 'prevention',
    title_zh: '預防醫學',
    title_en: 'Preventive Medicine & Screening',
    tagline: '722 居家連續血壓、看懂健檢紅字、台灣公費五癌早篩與代謝防護',
    icon: ShieldCheck,
    badgeTone: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    themeColor: 'from-amber-500 to-orange-600',
    keyRule: '「722 居家連續量血壓 + 定期追蹤 ApoB/血糖 + 國健署公費癌症早篩」',
    clinical_benchmarks: [
      { label: '居家血壓目標', value: '< 120 / 80', unit: 'mmHg', note: '連續 7 天早晚量測，打破白袍高血壓' },
      { label: '空腹血糖正常值', value: '< 100', unit: 'mg/dL', note: '100–125 為糖尿病前期警訊' },
      { label: '腰圍身高比 WHtR', value: '< 0.50', unit: '比值', note: '大於 0.5 代表內臟脂肪過量堆積' },
      { label: '冠狀動脈鈣化 CAC', value: '0 分', unit: 'Agatston', note: '0 分代表未來 5 年動脈硬化事件風險極低' },
    ],
    hubs: [
      { title: '看懂健檢報告與數值', desc: '24 項血液尿液檢驗值白話對照、紅字臨床意義與篩檢時程', hash: 'checkup', icon: ClipboardList },
      { title: '心血管代謝與 ApoB 早篩', desc: 'ApoB 顆粒計數致病論、CAC 血管鈣化積分與 CKM 症候群', hash: 'cardiometabolic', icon: HeartPulse },
      { title: '睡眠生理與晝夜修復', desc: '腺苷壓力、咖啡因半衰期與深睡期腦淋巴排毒機制', hash: 'sleep', icon: Moon },
      { title: '身心減壓與呼吸科學', desc: '史丹佛生理嘆氣、0.1 Hz 迷走神經共振與 HRV 壓力調控', hash: 'mental', icon: Wind },
    ],
    calculators: [
      { title: '722 居家血壓智慧分析', desc: '輸入早晚連續數值，依照 TSOC 台灣指引自動判讀分期', hash: 'cardiometabolic/BP_722', icon: Gauge },
      { title: '血脂矛盾與心血管風險分析', desc: '比對 LDL-C、ApoB、非-HDL 與三酸甘油酯之隱形風險', hash: 'cardiometabolic', icon: HeartPulse },
      { title: '咖啡因代謝與睡眠窗推算', desc: '以 5 小時半衰期模型計算入睡前血液殘留咖啡因濃度', hash: 'sleep', icon: Moon },
      { title: 'CAP-D 睡眠日記與呼吸引導器', desc: '7 晚睡眠效率自動算出下週上床時間；吐納、卡帕拉巴提與共振呼吸節拍器', hash: 'mindbody/CAPD_PLAN', icon: Wind },
    ],
    redFlagsSummary: '⚠️ 家族有早發性心臟病（男<55歲女<65歲）或一等親癌症史者，應提前 10 年啟動專科預防性篩檢。',
  },
  treatment: {
    id: 'treatment',
    title_zh: '臨床治療',
    title_en: 'Clinical Guidelines & Care',
    tagline: '循證標準治療階梯、一線藥物機轉、跨科處置與急診危險警訊紅線',
    icon: Stethoscope,
    badgeTone: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    themeColor: 'from-rose-500 to-purple-600',
    keyRule: '「循證一線藥物處方 + 嚴守臨床安全閘道 + 辨識馬尾與心腦急診紅線」',
    clinical_benchmarks: [
      { label: '高血壓一線治療', value: 'SPC 複方', unit: 'ARB + CCB', note: '血壓 ≥ 140/90 優先建議單片複方' },
      { label: '高血脂核心基石', value: 'Statin 類', unit: '中高強度', note: '穩定斑塊並降低 LDL-C 達 30–50%' },
      { label: '糖尿病心腎保護', value: 'SGLT2i / GLP-1', unit: '第一線首選', note: '兼具降低心衰竭住院與延緩腎病惡化' },
      { label: 'B 肝抗病毒藥物', value: '恩替卡韋/替諾福韋', unit: '長期口服', note: '抗藥性低，阻斷肝硬化與肝癌發展' },
    ],
    hubs: [
      { title: '人體 8 大系統生理機制', desc: '各器官系統從解剖運作、常見病理到診斷與標準醫療處置階梯', hash: 'systems', icon: BookOpen },
      { title: '脊椎病變與手腳發麻', desc: '骨刺、椎間盤突出保守治療、神經增生注射與馬尾症候群紅旗', hash: 'spine', icon: Bone },
      { title: 'B 型肝炎篩檢與抗病毒治療', desc: '健保給付抗病毒口服藥標準、肝硬化阻斷與定期超音波根治肝癌', hash: 'hepb', icon: ShieldCheck },
      { title: '失能照護與長照 3.0', desc: '巴氏量表、1966 申請與四包錢、外籍看護、住宿機構補助與照顧者支持', hash: 'ltc', icon: HeartHandshake },
      { title: '抗老延壽與醫學新知', desc: '12 大細胞衰老標誌、生物年齡檢測與臨床介入性醫學研究', hash: 'longevity', icon: Hourglass },
    ],
    calculators: [
      { title: '肥胖與體重管理藥物矩陣', desc: '比對 GLP-1/GIP 腸泌素藥物適應症、減重幅度與肌肉保留', hash: 'obesity', icon: Scale },
      { title: 'AUDIT-C 酒精成癮自評', desc: 'WHO 標準 3 題快速篩檢潛在酒精危害與醫療戒斷需求', modalId: 'auditC', icon: Pill },
      { title: '急診危險警訊全面指引', desc: '胸痛、中風 FAST、馬尾症候群、急性腹症就醫清單', modalId: 'emergency', icon: AlertOctagon },
    ],
    redFlagsSummary: '🚨 【何時必須立刻撥打 119 送急診】：突發單側手腳無力或嘴角歪斜（中風 FAST）、壓迫撕裂性胸痛延伸背部或下巴、鞍狀會陰麻木合併大小便失禁、休克抽搐或嚴重呼吸困難！',
  },
};

export const FourPillarsMasterCompass: React.FC = () => {
  const { go } = useNavigation();
  const { openModal } = useModal();
  const [activeDimension, setActiveDimension] = useState<PillarDimension>('diet');

  const current = FOUR_PILLARS_CATALOG[activeDimension];
  const Icon = current.icon;

  return (
    <section className="space-y-6 pt-2">
      {/* Grand Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              The Four Health Pillars Master Explorer
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            健康四大核心維度：飲食 · 運動 · 預防 · 治療
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            無論你是想改善飲食、啟動科學運動、定期健康健檢預防，或掌握疾病的正規醫療與危險警訊，Salud 提供全方位的循證指引。
          </p>
        </div>

        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0 self-start sm:self-auto">
          29 席臨床專家定審
        </span>
      </div>

      {/* 4 Large Tab Switches */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['diet', 'exercise', 'prevention', 'treatment'] as PillarDimension[]).map((dimKey) => {
          const item = FOUR_PILLARS_CATALOG[dimKey];
          const isActive = activeDimension === dimKey;
          const TabIcon = item.icon;

          return (
            <button
              key={dimKey}
              onClick={() => setActiveDimension(dimKey)}
              className={`btn-tactile p-4 rounded-3xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
                isActive
                  ? 'bg-white dark:bg-salud-dark-surface border-slate-300 dark:border-slate-600 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {/* Active Color Bar on Top */}
              {isActive && (
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.themeColor}`} />
              )}

              <div className="flex items-center justify-between w-full">
                <div className={`p-2 rounded-2xl ${isActive ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                  <TabIcon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.badgeTone}`}>
                  {dimKey === 'diet' ? '🥗 營養' : dimKey === 'exercise' ? '🏃 體能' : dimKey === 'prevention' ? '🛡️ 篩檢' : '🩺 臨床'}
                </span>
              </div>

              <div className="pt-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {item.title_zh}
                </h3>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {item.title_en}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Deep Overview Panel */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-salud-dark-surface/90 p-5 sm:p-8 space-y-6 shadow-sm animate-fade-in backdrop-blur-sm">
        {/* Banner with Key Rule */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-700/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-slate-500 uppercase font-mono">
                {current.title_zh}核心法則與實踐鐵律：
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {current.keyRule}
            </p>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
            {current.tagline}
          </div>
        </div>

        {/* 4 Clinical Benchmarks */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
            關鍵臨床指標與標準常態範圍 (Key Benchmarks & Cutoffs)
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {current.clinical_benchmarks.map((bm) => (
              <div
                key={bm.label}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-1"
              >
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
                  {bm.label}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
                    {bm.value}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{bm.unit}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {bm.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2 Columns: Recommended Deep Hubs & Calculators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Column A: Deep Knowledge Hubs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>推薦深度專科知識庫 ({current.title_zh})</span>
              </span>
              <span className="text-[10px] text-slate-400">點擊直達</span>
            </div>

            <div className="space-y-2.5">
              {current.hubs.map((hub) => {
                const HubIcon = hub.icon;
                return (
                  <button
                    key={hub.title}
                    onClick={() => go(hub.hash)}
                    className="w-full btn-tactile p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-emerald-500 dark:hover:border-emerald-500 text-left transition-all flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:group-hover:bg-emerald-950/60 dark:group-hover:text-emerald-400 transition-colors shrink-0 mt-0.5">
                      <HubIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {hub.title}
                        </h4>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {hub.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column B: Interactive Calculators */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>臨床互動試算與自檢工具 ({current.title_zh})</span>
              </span>
              <span className="text-[10px] text-slate-400">即時推算</span>
            </div>

            <div className="space-y-2.5">
              {current.calculators.map((calc) => {
                const CalcIcon = calc.icon;
                const handleClick = () => {
                  if (calc.modalId) {
                    openModal(calc.modalId as any);
                  } else if (calc.hash) {
                    go(calc.hash);
                  }
                };

                return (
                  <button
                    key={calc.title}
                    onClick={handleClick}
                    className="w-full btn-tactile p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-sky-500 dark:hover:border-sky-500 text-left transition-all flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-sky-50 group-hover:text-sky-600 dark:group-hover:bg-sky-950/60 dark:group-hover:text-sky-400 transition-colors shrink-0 mt-0.5">
                      <CalcIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {calc.title}
                        </h4>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {calc.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Red Flag & Emergency Alert Footer */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-900/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <AlertOctagon className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold font-mono text-[11px] block">
              🛡️ 臨床安全邊界與專業醫療提醒：
            </span>
            <p className="leading-relaxed">
              {current.redFlagsSummary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
