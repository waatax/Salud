import {
  Droplets,
  Flame,
  Wine,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Layers,
  Zap,
  Dumbbell,
  Wheat,
  Candy,
  HeartPulse,
  Pill,
  Salad,
  FileText,
  LucideIcon
} from 'lucide-react';
import { ChapterId } from '../config/routes';

export interface CategoryConfig {
  id: string;
  name_zh: string;
  name_en: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  badgeClass: string;
  borderActive: string;
}

export interface ClinicalConstant {
  id: string;
  label: string;
  value: string;
  unit: string;
  sub: string;
  targetPage: string;
  color: string;
}

export interface LearningPathwayStep {
  step: number;
  title: string;
  targetPages: string[];
  objective: string;
  badgeClass: string;
}

export interface ChapterKnowledgeConfig {
  titleZh: string;
  titleEn: string;
  summary: string;
  constantsHeader: string;
  categories: CategoryConfig[];
  clinicalConstants: ClinicalConstant[];
  learningPathway: LearningPathwayStep[];
}

export const CHAPTER_KNOWLEDGE_CONFIGS: Record<ChapterId, ChapterKnowledgeConfig> = {
  W: {
    titleZh: '水與體液恆定實證文庫',
    titleEn: 'Fluid Homeostasis & Clinical Hydration Base',
    summary: '體液恆定、水合監測、急性脫水與臨床安全完整課綱',
    constantsHeader: '水與體液平衡 · 臨床黃金常數速查 (Clinical Constants At A Glance)',
    categories: [
      {
        id: 'all',
        name_zh: '全部醫學文庫',
        name_en: 'All Knowledge Pages',
        desc: '體液恆定、水合監測、急性脫水與臨床安全完整課綱',
        icon: Layers,
        color: 'sky',
        badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
        borderActive: 'border-nature-sky-500 text-nature-sky-700 dark:text-nature-sky-300 bg-nature-sky-50/70 dark:bg-nature-sky-950/40'
      },
      {
        id: 'fluid-homeostasis',
        name_zh: '體液生理與水份分佈',
        name_en: 'Fluid Homeostasis & Compartments',
        desc: '總體水 TBW、細胞內外液滲透平衡、ADH 與 24h 收支',
        icon: Droplets,
        color: 'cyan',
        badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
        borderActive: 'border-sky-500 text-sky-700 dark:text-sky-300 bg-sky-50/80 dark:bg-sky-950/50'
      },
      {
        id: 'hydration-guidelines',
        name_zh: '水合準則與臨床監測',
        name_en: 'Hydration Guidelines & Biomarkers',
        desc: '8杯水迷思、尿液顏色卡 WUT 自評、咖啡茶酒淨水合',
        icon: Activity,
        color: 'emerald',
        badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        borderActive: 'border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/50'
      },
      {
        id: 'dehydration-pathology',
        name_zh: '脫水病理與急性風險',
        name_en: 'Dehydration Pathology & Acute Risks',
        desc: '脫水階梯至熱中暑急症、運動低血鈉 EAH 水中毒、電解質',
        icon: AlertTriangle,
        color: 'amber',
        badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        borderActive: 'border-amber-500 text-amber-700 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/50'
      },
      {
        id: 'special-populations',
        name_zh: '特殊族群安全與在地實踐',
        name_en: 'Safety Gates & Real-World Practice',
        desc: '心衰竭與洗腎限水安全閘、台灣高溫濕熱冷氣房對策',
        icon: ShieldCheck,
        color: 'rose',
        badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        borderActive: 'border-rose-500 text-rose-700 dark:text-rose-300 bg-rose-50/80 dark:bg-rose-950/50'
      }
    ],
    clinicalConstants: [
      { id: 'tbw', label: '總體水 (TBW)', value: '50–60%', unit: '體重比', sub: '肌肉 73% vs 脂肪 10%', targetPage: 'PAGE-W-01', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'plasma', label: '血漿容量', value: '~8%', unit: '總體水', sub: '約 3L 血管動態循環庫', targetPage: 'PAGE-W-01', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'osmolality', label: '滲透壓閾值', value: '280–295', unit: 'mOsm/kg', sub: '上升 1% 即觸發 ADH 分泌', targetPage: 'PAGE-W-03', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'hyponatremia', label: '低血鈉警戒', value: '< 135', unit: 'mmol/L', sub: '< 125 致命腦水腫紅旗', targetPage: 'PAGE-W-08', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'insensible', label: '不感蒸發流失', value: '700–1000', unit: 'mL / 日', sub: '靜坐仍持續呼吸皮膚蒸散', targetPage: 'PAGE-W-04', color: 'text-amber-600 dark:text-amber-400' }
    ],
    learningPathway: [
      { step: 1, title: '基礎生理入門', targetPages: ['PAGE-W-01', 'PAGE-W-02', 'PAGE-W-05'], objective: '建立人體水分分佈、細胞內外液空間及一日八杯水迷思之科學實證。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 2, title: '生化機轉深究', targetPages: ['PAGE-W-03', 'PAGE-W-04', 'PAGE-W-09'], objective: '剖析下視丘滲透壓受器、ADH 抗利尿激素迴路與鈉鉀幫浦電解質吸收。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 3, title: '臨床判別監測', targetPages: ['PAGE-W-06', 'PAGE-W-07', 'PAGE-W-10', 'PAGE-W-12'], objective: '掌握 WUT 脫水三指標、尿色卡校正、中暑脫水階梯與台灣濕熱微氣候對策。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 4, title: '致命急症與安全閘', targetPages: ['PAGE-W-08', 'PAGE-W-11', 'PAGE-W-13'], objective: '嚴格把關運動低血鈉 (EAH) 水中毒預防，以及心衰竭與末期腎病洗腎患者限水閘與 2026 實證。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  O: {
    titleZh: '食用油與脂肪酸平衡文庫',
    titleEn: 'Lipid Chemistry & Dietary Oils Base',
    summary: '飽和脂肪、Omega-3/6 比例、高溫烹調發煙點與過氧化物機轉',
    constantsHeader: '油脂與脂肪酸 · 臨床黃金常數速查 (Lipid Biomarkers At A Glance)',
    categories: [
      { id: 'all', name_zh: '全部油脂專題', name_en: 'All Oil Topics', desc: '脂肪酸化學結構、Omega 比例、高溫烹調發煙點全解析', icon: Layers, color: 'amber', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300', borderActive: 'border-amber-500 text-amber-700 dark:text-amber-300 bg-amber-50/70' },
      { id: 'oil-chemistry', name_zh: '脂肪酸化學結構', name_en: 'Fatty Acid Chemistry', desc: '飽和、單元不飽和 MUFA、多元不飽和 PUFA 碳鏈雙鍵化學', icon: Flame, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'omega-balance', name_zh: 'Omega-3/6 發炎恆定', name_en: 'Omega Balance & Eicosanoids', desc: '花生四烯酸發炎級聯反應 vs EPA/DHA 抗發炎消退素', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'smoke-point', name_zh: '發煙點與熱裂解', name_en: 'Smoke Point & Oxidation', desc: '初榨橄欖油、油品高溫熱裂解自由基與安全煎炒極限', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' },
      { id: 'evidence-update', name_zh: '最新實證更新', name_en: 'Evidence Update', desc: '超加工食品、種子油爭議與 2025–2026 最新臨床實證', icon: ShieldCheck, color: 'blue', badgeClass: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700', borderActive: 'border-blue-500 text-blue-700 bg-blue-50/80' }
    ],
    clinicalConstants: [
      { id: 'omega_ratio', label: 'Omega 6:3 比', value: '< 4:1', unit: '黃金攝取比', sub: '現代外食常失衡達 20:1 促發炎', targetPage: 'PAGE-O-02', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'evoo_smoke', label: '特級初榨發煙點', value: '190–210', unit: '°C', sub: '游離脂肪酸 < 0.8% 具熱穩定性', targetPage: 'PAGE-O-03', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'sfa_ceiling', label: '飽和脂肪上限', value: '< 10%', unit: '總熱量比例', sub: 'AHA 建議心血管高危族 < 6%', targetPage: 'PAGE-O-01', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'trans_fat', label: '反式脂肪標準', value: '0 g', unit: '人工氫化油禁令', sub: '低密度脂蛋白 LDL-C 明顯上升', targetPage: 'PAGE-O-01', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'pufa_oxidation', label: '過氧化物指數', value: '< 10', unit: 'meq O2/kg', sub: '回鍋油自由基破壞細胞膜脂質', targetPage: 'PAGE-O-03', color: 'text-red-600 dark:text-red-400' }
    ],
    learningPathway: [
      { step: 1, title: '脂肪酸化學結構', targetPages: ['PAGE-O-01', 'PAGE-O-02', 'PAGE-O-03'], objective: '掌握碳鏈飽和度、反式脂肪雙鍵立體異構物與血脂 LDL 機轉。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 2, title: 'Omega 比例與發炎級聯', targetPages: ['PAGE-O-04', 'PAGE-O-05'], objective: '剖析 COX 酵素競爭、花生四烯酸微環境促發炎 vs 魚油消退素抗發炎。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 3, title: '發煙點與高溫熱裂解安全', targetPages: ['PAGE-O-06', 'PAGE-O-07', 'PAGE-O-08', 'PAGE-O-09', 'PAGE-O-10'], objective: '打破橄欖油不能熱炒迷思，建立游離脂肪酸臨界、油品輪替與外食油炸防禦。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 4, title: '份量管理與血脂迷思', targetPages: ['PAGE-O-11', 'PAGE-O-12'], objective: '掌握每日油脂份量、茶匙計算法，破解膽固醇與豬油迷思。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300' },
      { step: 5, title: '超加工與最新實證', targetPages: ['PAGE-O-13'], objective: '依據 2025–2026 最新指引辨析超加工食品與種子油爭議。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  A: {
    titleZh: '酒精毒性與代謝病理文庫',
    titleEn: 'Alcohol Metabolism & Clinical Toxicity Base',
    summary: '乙醇肝臟氧化、ALDH2 突變致癌風險、深層睡眠破壞與水分脫水',
    constantsHeader: '酒精生理與毒性 · 臨床關鍵常數速查 (Alcohol Clinical Constants)',
    categories: [
      { id: 'all', name_zh: '全部酒精專題', name_en: 'All Alcohol Topics', desc: '酒精代謝路徑、ALDH2 乙醛突變、睡眠利尿破壞完整課綱', icon: Layers, color: 'purple', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-purple-500 text-purple-700 dark:text-purple-300 bg-purple-50/70' },
      { id: 'alcohol-metabolism', name_zh: '肝臟代謝途徑', name_en: 'Hepatic Oxidation', desc: 'ADH / ALDH 雙步驟氧化、NADH/NAD+ 比值升高與脂肪肝', icon: Wine, color: 'purple', badgeClass: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700', borderActive: 'border-purple-500 text-purple-700 bg-purple-50/80' },
      { id: 'aldh2-deficiency', name_zh: 'ALDH2 突變致癌', name_en: 'ALDH2 Polymorphism', desc: '台灣 47% 盛行率、乙醛一級致癌物累積與臉紅心悸紅旗', icon: AlertTriangle, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' },
      { id: 'sleep-hydration', name_zh: '睡眠與水分恆定', name_en: 'Sleep & Osmotic Balance', desc: '下視丘 ADH 抑制利尿、深層 REM 睡眠片段化與宿醉病理', icon: Activity, color: 'sky', badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700', borderActive: 'border-sky-500 text-sky-700 bg-sky-50/80' },
      { id: 'evidence-update', name_zh: '最新實證更新', name_en: 'Evidence Update', desc: '美國衛生總署 2025 警示、零安全飲酒量與最新公衛指引', icon: ShieldCheck, color: 'blue', badgeClass: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700', borderActive: 'border-blue-500 text-blue-700 bg-blue-50/80' }
    ],
    clinicalConstants: [
      { id: 'aldh2_tw', label: '台灣人 ALDH2 突變', value: '47%', unit: '人口盛行率', sub: '全球第一高！乙醛無法代謝蓄積', targetPage: 'PAGE-A-02', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'alcohol_safe', label: '世界衛生組織標準', value: '0 g', unit: '安全攝取閾值', sub: 'Lancet 實證：任何飲酒量皆有致癌風險', targetPage: 'PAGE-A-01', color: 'text-red-600 dark:text-red-400' },
      { id: 'iarc_acetaldehyde', label: '乙醛致癌等級', value: 'Group 1', unit: 'IARC 一級致癌物', sub: '直接破壞 DNA 引發食道癌/胃癌', targetPage: 'PAGE-A-02', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'rem_sleep_drop', label: '快速動眼期 REM', value: '-20%', unit: '深層睡眠破壞', sub: '中樞神經自律興奮導致夜間頻醒', targetPage: 'PAGE-A-03', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'diuretic_factor', label: '下視丘抑制 ADH', value: '+50%', unit: '額外利尿排水', sub: '每喝 250mL 啤酒排出 ~350mL 尿液', targetPage: 'PAGE-A-03', color: 'text-sky-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '吸收與代謝生化', targetPages: ['PAGE-A-01', 'PAGE-A-02'], objective: '掌握胃腸吸收動力學、ADH/ALDH 雙氧化與 NADH/NAD+ 脂肪肝機轉。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300' },
      { step: 2, title: '基因毒性與致癌因果', targetPages: ['PAGE-A-03', 'PAGE-A-04', 'PAGE-A-05'], objective: '剖析台灣 ALDH2 缺失、IARC 一級致癌物乙醛與破解 J 曲線迷思。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' },
      { step: 3, title: '器官毒理與酒種解碼', targetPages: ['PAGE-A-06', 'PAGE-A-07', 'PAGE-A-08', 'PAGE-A-09'], objective: '掌握睡眠碎片化、肝硬化胰臟炎進程，比較啤酒尿酸與烈酒黏膜灼傷。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 4, title: '宿醉、藥物交互與成癮防線', targetPages: ['PAGE-A-10', 'PAGE-A-11', 'PAGE-A-12', 'PAGE-A-13'], objective: '落實科學宿醉急救、避開止痛藥安眠藥致命交互作用，以 AUDIT-C 篩檢酒精依賴。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 5, title: '2025–2026 全球新共識', targetPages: ['PAGE-A-14'], objective: '理解美國衛生總署癌症警示與全球低風險指引走向「零安全量」。', badgeClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold' }
    ]
  },
  E: {
    titleZh: '能量與熱量平衡文庫',
    titleEn: 'Energy Balance & Metabolic Rate Base',
    summary: 'TDEE 四齒輪、BMR 估算、代謝適應、食慾荷爾蒙、安全赤字與 RED-S 安全閘',
    constantsHeader: '能量與代謝恆定 · 臨床關鍵常數速查 (Metabolic Constants)',
    categories: [
      { id: 'all', name_zh: '全部能量專題', name_en: 'All Energy Topics', desc: 'TDEE 組成、BMR 估算、熱量赤字、代謝適應、食慾調控與能量安全閘完整課綱', icon: Layers, color: 'amber', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-amber-500 text-amber-700 dark:text-amber-300 bg-amber-50/70' },
      { id: 'metabolic-rate', name_zh: '基礎代謝與 TDEE', name_en: 'Basal Metabolism & TDEE', desc: 'BMR、NEAT、TEF、EAT 與 Mifflin-St Jeor 估算', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'energy-balance', name_zh: '熱量平衡與赤字', name_en: 'Energy Balance & Deficit', desc: '能量平衡 vs 碳水胰島素模型、安全減重速度與保肌三角', icon: Zap, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'metabolic-adaptation', name_zh: '代謝適應與體重維持', name_en: 'Adaptation & Maintenance', desc: 'Hall 動態模型、瘦體素反撲、溜溜球效應與自我監測', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' },
      { id: 'appetite-satiety', name_zh: '食慾與飽足調控', name_en: 'Appetite & Satiety', desc: '能量密度、飽足荷爾蒙、享樂性飢餓與超加工食品', icon: Salad, color: 'teal', badgeClass: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700', borderActive: 'border-teal-500 text-teal-700 bg-teal-50/80' },
      { id: 'energy-safety', name_zh: '能量安全閘', name_en: 'Energy Safety Gate', desc: 'RED-S、飲食失調警訊與 GLP-1 類藥物營養', icon: AlertTriangle, color: 'red', badgeClass: 'bg-red-50 dark:bg-red-950/50 text-red-700', borderActive: 'border-red-500 text-red-700 bg-red-50/80' }
    ],
    clinicalConstants: [
      { id: 'bmr_share', label: 'BMR 佔 TDEE 比', value: '60–70%', unit: '每日總能耗', sub: '心腦肝腎維持生命的最大帳單', targetPage: 'PAGE-E-01', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'tef_ratio', label: '蛋白質產熱效應', value: '20–30%', unit: 'TEF', sub: '遠高於碳水 (5–10%) 與脂肪 (0–3%)', targetPage: 'PAGE-E-01', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'hall_rule', label: '動態減重法則', value: '≈22', unit: 'kcal/日/kg', sub: '每永久少吃 22 kcal 最終約減 1 kg', targetPage: 'PAGE-E-02', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'loss_rate', label: '安全減重速度', value: '0.5–1%', unit: '體重 / 週', sub: '搭配蛋白質 1.2–1.6 g/kg 與肌力訓練', targetPage: 'PAGE-E-07', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'upf_excess', label: '超加工飲食多吃', value: '+508', unit: 'kcal / 日', sub: 'Hall 2019 代謝病房交叉試驗', targetPage: 'PAGE-E-09', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'ea_floor', label: '能量可用性下限', value: '30', unit: 'kcal/kg FFM/日', sub: '長期低於此值有 RED-S 風險', targetPage: 'PAGE-E-10', color: 'text-red-600 dark:text-red-400' }
    ],
    learningPathway: [
      { step: 1, title: '看懂熱量帳單', targetPages: ['PAGE-E-01', 'PAGE-E-04'], objective: '拆解 TDEE 四齒輪，學會估算並用體重趨勢校正自己的維持熱量。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 2, title: '熱量與荷爾蒙之爭', targetPages: ['PAGE-E-05', 'PAGE-E-02'], objective: '理解能量平衡與碳水胰島素模型的實證，以及體重下降為何會趨緩。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 3, title: '食慾與飲食環境', targetPages: ['PAGE-E-03', 'PAGE-E-06', 'PAGE-E-09'], objective: '善用能量密度、飽足荷爾蒙與環境設計，不挨餓地吃少一點。', badgeClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300' },
      { step: 4, title: '減重與維持實戰', targetPages: ['PAGE-E-07', 'PAGE-E-08'], objective: '以安全速度保肌減脂，並建立長期維持的自我監測系統。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 5, title: '能量安全閘', targetPages: ['PAGE-E-10'], objective: '辨識 RED-S、飲食失調與減重藥物使用中的營養風險。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  P: {
    titleZh: '蛋白質與肌肉合成文庫',
    titleEn: 'Protein & Muscle Protein Synthesis Base',
    summary: '每日需求、白胺酸門檻、合成窗、肌少症、腎臟安全閘、台灣餐桌份量與補充品選購',
    constantsHeader: '蛋白質與肌肉恆定 · 臨床黃金常數速查 (Protein Biomarkers)',
    categories: [
      { id: 'all', name_zh: '全部蛋白質專題', name_en: 'All Protein Topics', desc: '需求量、合成機轉、品質、肌少症、腎臟安全與補充品完整課綱', icon: Layers, color: 'blue', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50/70' },
      { id: 'protein-requirements', name_zh: '每日總量與份量計算', name_en: 'Requirements & Portions', desc: '0.8 → 1.2–1.6 g/kg、豆魚蛋肉一份 7 g 與台灣餐桌示範', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'protein-synthesis', name_zh: '肌蛋白合成與訓練', name_en: 'MPS & Training', desc: '白胺酸門檻、三餐分配、合成窗與增肌平台', icon: Dumbbell, color: 'blue', badgeClass: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700', borderActive: 'border-blue-500 text-blue-700 bg-blue-50/80' },
      { id: 'protein-quality', name_zh: '蛋白質品質與來源', name_en: 'Protein Quality & Sources', desc: 'DIAAS、植物 vs 動物、胺基酸互補與蛋白粉選購', icon: Salad, color: 'teal', badgeClass: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700', borderActive: 'border-teal-500 text-teal-700 bg-teal-50/80' },
      { id: 'sarcopenia-aging', name_zh: '肌少症與高齡營養', name_en: 'Sarcopenia & Ageing', desc: 'AWGS 2019 篩檢、同化阻抗與長者蛋白質目標', icon: HeartPulse, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'protein-safety', name_zh: '腎臟安全閘', name_en: 'Renal Safety Gate', desc: 'eGFR 分期、KDOQI 2020 蛋白質建議與透析需求', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' }
    ],
    clinicalConstants: [
      { id: 'rda_baseline', label: '防缺乏底線', value: '0.8–1.0', unit: 'g / kg / 日', sub: '僅為防止氮負平衡的最低需求', targetPage: 'PAGE-P-01', color: 'text-slate-600 dark:text-slate-400' },
      { id: 'leucine_trigger', label: '白胺酸觸發閾值', value: '2.5–3.0', unit: 'g / 餐', sub: '約 25–30 g 優質蛋白質', targetPage: 'PAGE-P-02', color: 'text-blue-600 dark:text-blue-400' },
      { id: 'portion', label: '豆魚蛋肉一份', value: '7', unit: 'g 蛋白質', sub: '1 顆蛋＝190 mL 無糖豆漿＝80 g 豆腐', targetPage: 'PAGE-P-07', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'grip', label: '肌少症握力門檻', value: '28 / 18', unit: 'kg（男 / 女）', sub: 'AWGS 2019 肌力低下標準', targetPage: 'PAGE-P-04', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'hypertrophy_target', label: '增肌效益平台', value: '≈1.6', unit: 'g / kg / 日', sub: '信賴區間上限約 2.2 g/kg', targetPage: 'PAGE-P-05', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'ckd_gate', label: 'CKD 3–5 期（未透析）', value: '0.55–0.6', unit: 'g / kg / 日', sub: 'KDOQI 2020；透析者 1.0–1.2', targetPage: 'PAGE-P-06', color: 'text-rose-600 dark:text-rose-400' }
    ],
    learningPathway: [
      { step: 1, title: '吃多少才夠', targetPages: ['PAGE-P-01', 'PAGE-P-07'], objective: '依年齡與目標設定 g/kg，學會用「份」計算台灣餐桌的蛋白質。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 2, title: '合成機轉與訓練', targetPages: ['PAGE-P-02', 'PAGE-P-05'], objective: '掌握白胺酸門檻、三餐分配與阻力訓練的協同效應。', badgeClass: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300' },
      { step: 3, title: '品質與來源', targetPages: ['PAGE-P-03', 'PAGE-P-08'], objective: '比較植物與動物蛋白、胺基酸互補，並聰明選購補充品。', badgeClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300' },
      { step: 4, title: '肌少症防線', targetPages: ['PAGE-P-04'], objective: '以 AWGS 2019 自我篩檢，建立長者的蛋白質與訓練策略。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 5, title: '腎臟安全閘', targetPages: ['PAGE-P-06'], objective: '依 eGFR 與蛋白尿決定蛋白質上限，辨識腎病警訊。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  C: {
    titleZh: '碳水化合物與膳食纖維文庫',
    titleEn: 'Carbohydrates & Dietary Fiber Base',
    summary: '醣類結構、GI/GL、全穀、血糖調控、肝醣與運動、腸道菌、FODMAP 與增纖實作',
    constantsHeader: '碳水化合物與纖維 · 臨床關鍵常數速查 (Carb Biomarkers)',
    categories: [
      { id: 'all', name_zh: '全部碳水專題', name_en: 'All Carb Topics', desc: '醣類結構、GI/GL、全穀、血糖、肝醣、纖維與腸道菌完整課綱', icon: Layers, color: 'teal', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-teal-500 text-teal-700 dark:text-teal-300 bg-teal-50/70' },
      { id: 'carb-classification', name_zh: '結構分類與全穀', name_en: 'Carb Types & Whole Grains', desc: '單醣到多醣、直鏈支鏈澱粉、GI/GL 與全穀實證', icon: Wheat, color: 'teal', badgeClass: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700', borderActive: 'border-teal-500 text-teal-700 bg-teal-50/80' },
      { id: 'glycemic-control', name_zh: '血糖調控與碳水份量', name_en: 'Glycemic Control', desc: '進食順序、飯後散步、一份 15 g 醣與糖尿病飲食', icon: Activity, color: 'sky', badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700', borderActive: 'border-sky-500 text-sky-700 bg-sky-50/80' },
      { id: 'dietary-fiber', name_zh: '膳食纖維', name_en: 'Dietary Fiber', desc: '水溶性 vs 非水溶性、每日 25–30 g 與四週增纖計畫', icon: Salad, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'gut-microbiome', name_zh: '腸道菌與 FODMAP', name_en: 'Gut Microbiome & FODMAP', desc: '短鏈脂肪酸、益生菌與益生質、腸躁症低 FODMAP', icon: ShieldCheck, color: 'purple', badgeClass: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700', borderActive: 'border-purple-500 text-purple-700 bg-purple-50/80' },
      { id: 'glycogen-storage', name_zh: '肝醣與運動耐力', name_en: 'Glycogen & Performance', desc: '肝醣容量、每日碳水需求、比賽補給與肝醣超補', icon: Zap, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' }
    ],
    clinicalConstants: [
      { id: 'gl_cut', label: '升糖負荷分界', value: '≤10 / ≥20', unit: 'GL 低 / 高', sub: 'GL＝GI × 碳水克數 ÷ 100', targetPage: 'PAGE-C-01', color: 'text-teal-600 dark:text-teal-400' },
      { id: 'fiber_target', label: '膳食纖維每日目標', value: '25–35', unit: 'g / 日', sub: '國人平均僅約 14–16 g', targetPage: 'PAGE-C-02', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'whole_grain', label: '全穀劑量效益', value: '90', unit: 'g / 日', sub: '全因死亡 −17%（Aune 2016）', targetPage: 'PAGE-C-05', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'carb_exchange', label: '一份醣類', value: '15', unit: 'g 醣', sub: '一碗飯＝4 份＝60 g', targetPage: 'PAGE-C-09', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'glycogen', label: '肌肉肝醣儲量', value: '300–500', unit: 'g', sub: '肝臟另有 80–100 g', targetPage: 'PAGE-C-07', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'race_fuel', label: '長賽事補給上限', value: '90', unit: 'g / 時', sub: '> 2.5 小時，葡萄糖＋果糖混合', targetPage: 'PAGE-C-07', color: 'text-rose-600 dark:text-rose-400' }
    ],
    learningPathway: [
      { step: 1, title: '認識醣類與全穀', targetPages: ['PAGE-C-04', 'PAGE-C-01', 'PAGE-C-05'], objective: '從分子結構理解 GI/GL，並以全穀取代精製穀。', badgeClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300' },
      { step: 2, title: '血糖調控實戰', targetPages: ['PAGE-C-06', 'PAGE-C-09'], objective: '運用進食順序、飯後活動與醣類份數穩定血糖。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 3, title: '纖維與腸道菌', targetPages: ['PAGE-C-02', 'PAGE-C-03', 'PAGE-C-10'], objective: '吃足 25 g 纖維、餵養產丁酸菌，並以四週計畫實踐。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 4, title: '運動與特殊腸道', targetPages: ['PAGE-C-07', 'PAGE-C-08'], objective: '依訓練量管理肝醣，並辨識腸躁症的 FODMAP 地雷與警訊。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold' }
    ]
  },
  S: {
    titleZh: '糖與游離糖解碼文庫',
    titleEn: 'Sugars & Free Sugar Decoding Base',
    summary: '游離糖定義與上限、隱藏糖、果糖肝臟代謝、手搖飲、代糖、蛀牙、甜味偏好與兒少政策',
    constantsHeader: '糖與代謝 · 臨床關鍵常數速查 (Sugar Benchmarks)',
    categories: [
      { id: 'all', name_zh: '全部糖專題', name_en: 'All Sugar Topics', desc: '游離糖、果糖病理、含糖飲料、代糖、口腔與行為完整課綱', icon: Layers, color: 'pink', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-pink-500 text-pink-700 dark:text-pink-300 bg-pink-50/70' },
      { id: 'free-sugars', name_zh: '游離糖與隱藏糖', name_en: 'Free & Hidden Sugars', desc: 'WHO 10% / 5% 上限、糖的別名與營養宣稱', icon: Candy, color: 'pink', badgeClass: 'bg-pink-50 dark:bg-pink-950/50 text-pink-700', borderActive: 'border-pink-500 text-pink-700 bg-pink-50/80' },
      { id: 'fructose-pathology', name_zh: '果糖與肝臟代謝', name_en: 'Fructose Pathology', desc: '新生脂肪合成、脂肪肝、尿酸與痛風', icon: AlertTriangle, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' },
      { id: 'sugary-drinks', name_zh: '含糖飲料與政策', name_en: 'Sugary Drinks & Policy', desc: '手搖飲甜度配料、兒少建議與國際糖稅', icon: Activity, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'sugar-substitutes', name_zh: '代糖與糖化終產物', name_en: 'Sweeteners & AGEs', desc: 'WHO 2023 NSS 指引、ADI 與 AGEs 烹調差異', icon: ShieldCheck, color: 'purple', badgeClass: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700', borderActive: 'border-purple-500 text-purple-700 bg-purple-50/80' },
      { id: 'sugar-oral-behavior', name_zh: '口腔健康與甜食行為', name_en: 'Teeth & Sweet Behaviour', desc: 'Stephan 曲線、含氟防護、甜味偏好重設', icon: Salad, color: 'teal', badgeClass: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700', borderActive: 'border-teal-500 text-teal-700 bg-teal-50/80' }
    ],
    clinicalConstants: [
      { id: 'who_free_sugar', label: '游離糖理想上限', value: '< 25', unit: 'g / 日', sub: '< 5% 熱量；強烈建議 < 10%（50 g）', targetPage: 'PAGE-S-04', color: 'text-pink-600 dark:text-pink-400' },
      { id: 'sugar_cube', label: '一顆方糖', value: '5', unit: 'g ＝ 20 kcal', sub: '大杯全糖手搖飲約 10–12 顆', targetPage: 'PAGE-S-02', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'low_sugar_claim', label: '「低糖」宣稱（液體）', value: '≤ 2.5', unit: 'g / 100 mL', sub: '「無糖」≤ 0.5 g', targetPage: 'PAGE-S-05', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'enamel_ph', label: '琺瑯質脫礦臨界', value: 'pH 5.5', unit: '牙菌斑', sub: '吃糖後 20–60 分鐘才回升', targetPage: 'PAGE-S-06', color: 'text-teal-600 dark:text-teal-400' },
      { id: 'child_sugar', label: '兒少添加糖上限', value: '< 25', unit: 'g / 日', sub: '2 歲以下避免添加糖（AHA）', targetPage: 'PAGE-S-08', color: 'text-rose-600 dark:text-rose-400' }
    ],
    learningPathway: [
      { step: 1, title: '認識游離糖', targetPages: ['PAGE-S-04', 'PAGE-S-05'], objective: '分辨游離糖與內源糖，找出隱藏糖並估算每日額度。', badgeClass: 'bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-300' },
      { step: 2, title: '果糖的代謝代價', targetPages: ['PAGE-S-01'], objective: '理解果糖如何導致脂肪肝、高三酸甘油酯與痛風。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' },
      { step: 3, title: '飲料與代糖', targetPages: ['PAGE-S-02', 'PAGE-S-03'], objective: '解碼手搖飲甜度配料，正確看待代糖與 AGEs。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 4, title: '牙齒與行為', targetPages: ['PAGE-S-06', 'PAGE-S-07'], objective: '以頻率觀點防蛀，並用味覺重設與環境設計減糖。', badgeClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300' },
      { step: 5, title: '兒少與公共政策', targetPages: ['PAGE-S-08'], objective: '掌握兒少添加糖上限，了解糖稅與校園政策的實證。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold' }
    ]
  },
  N: {
    titleZh: '鈉、鉀與血壓生理文庫',
    titleEn: 'Sodium, Potassium & Blood Pressure Base',
    summary: '鈉鉀生理、每日鈉上限、鹽敏感性、DASH、含鉀鹽與高血鉀安全閘、722 居家血壓與減鹽實戰',
    constantsHeader: '電解質與血壓 · 臨床關鍵常數速查 (Electrolyte & BP)',
    categories: [
      { id: 'all', name_zh: '全部鈉鉀專題', name_en: 'All Electrolyte Topics', desc: '鈉鉀生理、攝取上限、鹽敏感、DASH、含鉀鹽與居家血壓完整課綱', icon: Layers, color: 'red', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-red-500 text-red-700 dark:text-red-300 bg-red-50/70' },
      { id: 'sodium-physiology', name_zh: '鈉鉀生理與鹽敏感', name_en: 'Physiology & Salt Sensitivity', desc: '內皮一氧化氮、腎臟排鈉與鹽敏感族群', icon: HeartPulse, color: 'red', badgeClass: 'bg-red-50 dark:bg-red-950/50 text-red-700', borderActive: 'border-red-500 text-red-700 bg-red-50/80' },
      { id: 'sodium-intake', name_zh: '鈉攝取與減鹽實戰', name_en: 'Sodium Intake & Reduction', desc: '2,000 / 2,400 mg 上限、鹽鈉換算、外食與味覺重設', icon: Activity, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'bp-diet', name_zh: '得舒降壓飲食', name_en: 'DASH Diet', desc: 'DASH 份數、鉀鎂鈣三位一體與降壓幅度', icon: Salad, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'potassium-salt', name_zh: '鉀與含鉀鹽安全閘', name_en: 'Potassium & Salt Substitutes', desc: 'SSaSS 試驗、高鉀食物與高血鉀風險族群', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' },
      { id: 'bp-monitoring', name_zh: '血壓量測與判讀', name_en: 'BP Monitoring', desc: '722 原則、正確姿勢與 2022 台灣指引', icon: Zap, color: 'sky', badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700', borderActive: 'border-sky-500 text-sky-700 bg-sky-50/80' }
    ],
    clinicalConstants: [
      { id: 'sodium_limit', label: '每日鈉上限', value: '2,400', unit: 'mg（鹽 6 g）', sub: '衛福部；WHO 建議 < 2,000 mg', targetPage: 'PAGE-N-04', color: 'text-red-600 dark:text-red-400' },
      { id: 'salt_factor', label: '鹽鈉換算係數', value: '× 2.54', unit: '鈉 → 鹽', sub: '鈉 1,000 mg ≈ 鹽 2.5 g', targetPage: 'PAGE-N-04', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'dash_effect', label: 'DASH＋減鈉降壓', value: '8–11', unit: 'mmHg', sub: '高血壓患者收縮壓下降幅度', targetPage: 'PAGE-N-02', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'potassium_target', label: 'WHO 鉀建議量', value: '≥ 3,510', unit: 'mg / 日', sub: '腎病與保鉀藥物使用者例外', targetPage: 'PAGE-N-05', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'bp_target', label: '高血壓診斷與目標', value: '130/80', unit: 'mmHg', sub: '2022 台灣指引（居家 722 平均）', targetPage: 'PAGE-N-06', color: 'text-sky-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '鈉鉀生理基礎', targetPages: ['PAGE-N-01', 'PAGE-N-07'], objective: '理解高鈉低鉀傷害血管的機轉與鹽敏感族群。', badgeClass: 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300' },
      { step: 2, title: '算出你的鈉', targetPages: ['PAGE-N-04', 'PAGE-N-08'], objective: '掌握每日上限與鹽鈉換算，執行外食與家庭減鹽。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 3, title: '降壓飲食', targetPages: ['PAGE-N-02', 'PAGE-N-03'], objective: '以 DASH 與含鉀低鈉鹽降低血壓與心血管事件。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 4, title: '量測與安全閘', targetPages: ['PAGE-N-06', 'PAGE-N-05'], objective: '用 722 居家血壓判讀，並辨識高血鉀高風險族群。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  M: {
    titleZh: '微量營養素與生物利用率文庫',
    titleEn: 'Micronutrients & Bioavailability Base',
    summary: '脂溶性與水溶性維生素、鐵鈣碘鋅硒鎂、維生素 D 與 B12、抗氧化劑反轉、藥物交互作用與族群補充地圖',
    constantsHeader: '微量營養素 · 臨床關鍵常數速查 (Micronutrient Benchmarks)',
    categories: [
      { id: 'all', name_zh: '全部微量營養素', name_en: 'All Micronutrient Topics', desc: '維生素、礦物質、骨骼礦化軸與補充品安全完整課綱', icon: Layers, color: 'purple', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-purple-500 text-purple-700 dark:text-purple-300 bg-purple-50/70' },
      { id: 'vitamin-physiology', name_zh: '維生素生理', name_en: 'Vitamin Physiology', desc: '脂溶性 vs 水溶性、B12 與葉酸、抗氧化補充劑試驗', icon: Pill, color: 'purple', badgeClass: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700', borderActive: 'border-purple-500 text-purple-700 bg-purple-50/80' },
      { id: 'mineral-bioavailability', name_zh: '礦物質與生物利用率', name_en: 'Minerals & Bioavailability', desc: '鐵、碘、鋅、硒、鎂的來源、吸收與上限', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'bone-mineral-axis', name_zh: '骨骼礦物質軸', name_en: 'Bone–Mineral Axis', desc: '維生素 D、鈣、鎂、K2 與 25(OH)D 判讀', icon: ShieldCheck, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'supplement-safety', name_zh: '補充品安全閘', name_en: 'Supplement Safety Gate', desc: '藥物交互作用、檢驗干擾與族群補充地圖', icon: AlertTriangle, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' }
    ],
    clinicalConstants: [
      { id: 'vit_a_ul', label: '維生素 A 上限', value: '3,000', unit: 'µg RAE / 日', sub: '孕期過量預先形成 A 有致畸風險', targetPage: 'PAGE-M-01', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'heme_iron', label: '血基質鐵吸收率', value: '15–35%', unit: '吸收', sub: '非血基質鐵僅 2–10%', targetPage: 'PAGE-M-02', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'vit_d_level', label: '25(OH)D 足夠', value: '≥ 20', unit: 'ng/mL', sub: '< 12 為缺乏（IOM）', targetPage: 'PAGE-M-04', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'calcium_rda', label: '成人鈣建議量', value: '1,000', unit: 'mg / 日', sub: '國人平均僅約一半；UL 2,500 mg', targetPage: 'PAGE-M-05', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'folate', label: '備孕葉酸', value: '400', unit: 'µg / 日', sub: '受孕前至少 1 個月開始', targetPage: 'PAGE-M-06', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'iodine', label: '孕期碘建議量', value: '225', unit: 'µg / 日', sub: '成人 150 µg、哺乳 250 µg', targetPage: 'PAGE-M-07', color: 'text-teal-600 dark:text-teal-400' }
    ],
    learningPathway: [
      { step: 1, title: '維生素基礎', targetPages: ['PAGE-M-01', 'PAGE-M-06'], objective: '分辨脂溶性與水溶性維生素，掌握 B12 與葉酸的關鍵族群。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300' },
      { step: 2, title: '礦物質吸收', targetPages: ['PAGE-M-02', 'PAGE-M-07', 'PAGE-M-08', 'PAGE-M-09'], objective: '學會鐵、碘、鋅、硒、鎂的食物來源、吸收與安全上限。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 3, title: '骨骼礦化軸', targetPages: ['PAGE-M-03', 'PAGE-M-04', 'PAGE-M-05'], objective: '整合維生素 D、鈣、鎂與 K2，正確解讀 25(OH)D 與補鈣。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 4, title: '補充品的實證與安全', targetPages: ['PAGE-M-10', 'PAGE-M-11', 'PAGE-M-12'], objective: '從大型試驗看補充劑風險，避開藥物交互作用並對號入座。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  D: {
    titleZh: '飲食模式與流行病學證據文庫',
    titleEn: 'Dietary Patterns & Epidemiology Base',
    summary: '地中海與 MIND、生酮與斷食、低碳低脂比較、植物性飲食品質、超加工食品、時間營養學、我的餐盤與證據判讀',
    constantsHeader: '飲食模式 · 臨床實證常數速查 (Pattern Evidence)',
    categories: [
      { id: 'all', name_zh: '全部飲食模式專題', name_en: 'All Dietary Patterns', desc: '地中海、DASH、MIND、植物性、低碳、斷食與證據判讀完整課綱', icon: Layers, color: 'emerald', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50/70' },
      { id: 'mediterranean-mind', name_zh: '地中海與 MIND', name_en: 'Mediterranean & MIND', desc: 'PREDIMED、MIND 清單與台版地中海', icon: Salad, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'fasting-lowcarb', name_zh: '低碳、斷食與時間營養', name_en: 'Low-Carb, Fasting & Timing', desc: '生酮、168、DIRECT 比較與晚餐時間', icon: Zap, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'plant-based', name_zh: '植物性與長壽飲食', name_en: 'Plant-Based & Longevity', desc: '藍色寶地、植物優先餐盤、hPDI vs uPDI', icon: Wheat, color: 'teal', badgeClass: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700', borderActive: 'border-teal-500 text-teal-700 bg-teal-50/80' },
      { id: 'evidence-methods', name_zh: '研究方法與證據判讀', name_en: 'Evidence & Methods', desc: '證據金字塔、相對 vs 絕對風險、超加工食品證據', icon: ShieldCheck, color: 'sky', badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700', borderActive: 'border-sky-500 text-sky-700 bg-sky-50/80' },
      { id: 'pattern-choice', name_zh: '飲食模式選擇', name_en: 'Choosing a Pattern', desc: '我的餐盤六口訣、目標導向選擇與 PDCA 個人化', icon: Activity, color: 'purple', badgeClass: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700', borderActive: 'border-purple-500 text-purple-700 bg-purple-50/80' }
    ],
    clinicalConstants: [
      { id: 'predimed', label: 'PREDIMED 心血管事件', value: '−30%', unit: 'HR ≈ 0.69–0.72', sub: '地中海＋初榨橄欖油或堅果', targetPage: 'PAGE-D-01', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'tre', label: '限時進食 vs 熱量限制', value: '−8.0 / −6.3', unit: 'kg（12 個月）', sub: 'Liu 2022 NEJM，差異不顯著', targetPage: 'PAGE-D-02', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'processed_meat', label: '加工肉每日 50 g', value: '+18%', unit: '大腸癌相對風險', sub: '絕對風險約每 100 人多 1 人', targetPage: 'PAGE-D-04', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'hpdi', label: '健康植物性飲食', value: '−25%', unit: '冠心病', sub: '不健康版本反而 +32%', targetPage: 'PAGE-D-07', color: 'text-teal-600 dark:text-teal-400' },
      { id: 'upf', label: '超加工食品高攝取', value: '+50%', unit: '心血管死亡', sub: 'BMJ 2024 傘狀回顧', targetPage: 'PAGE-D-08', color: 'text-sky-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '證據判讀基本功', targetPages: ['PAGE-D-04', 'PAGE-D-05'], objective: '學會讀懂營養研究，並掌握台灣每日飲食指南與我的餐盤。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 2, title: '實證最強的飲食模式', targetPages: ['PAGE-D-01', 'PAGE-D-03', 'PAGE-D-07'], objective: '理解地中海、MIND 與健康植物性飲食的實證與在地化。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 3, title: '熱門飲食法的真相', targetPages: ['PAGE-D-02', 'PAGE-D-06', 'PAGE-D-09'], objective: '比較生酮、斷食、低碳與低脂，了解時間營養學。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 4, title: '整合與個人化', targetPages: ['PAGE-D-08', 'PAGE-D-10'], objective: '減少超加工食品，以 PDCA 找出最適合自己的飲食模式。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold' }
    ]
  },
  F: {
    titleZh: '食品標示與台灣外食解密文庫',
    titleEn: 'Nutrition Labels & Taiwan Dining Base',
    summary: '營養標示與成分表、過敏原、添加物、健康食品宣稱、早餐店／夜市／自助餐攻略、食品安全與預算備餐',
    constantsHeader: '標示與外食 · 實用常數速查 (Label & Dining Benchmarks)',
    categories: [
      { id: 'all', name_zh: '全部標示外食專題', name_en: 'All Label & Dining Topics', desc: '標示判讀、外食攻略、食品安全與居家備餐完整課綱', icon: Layers, color: 'sky', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-sky-500 text-sky-700 dark:text-sky-300 bg-sky-50/70' },
      { id: 'nutrition-labels', name_zh: '食品標示判讀', name_en: 'Reading Labels', desc: '營養標示、成分表、過敏原、添加物與健康食品', icon: FileText, color: 'sky', badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700', borderActive: 'border-sky-500 text-sky-700 bg-sky-50/80' },
      { id: 'eating-out', name_zh: '外食與小吃攻略', name_en: 'Eating Out', desc: '便當、火鍋、早餐店、夜市與自助餐', icon: Salad, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'food-safety', name_zh: '食品安全', name_en: 'Food Safety', desc: '危險溫度帶、生熟分開、加工肉與醃漬物', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' },
      { id: 'home-cooking-budget', name_zh: '居家備餐與預算', name_en: 'Home Cooking & Budget', desc: '外送防沉迷、急救五寶與平價健康採買', icon: Activity, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' }
    ],
    clinicalConstants: [
      { id: 'trans_zero', label: '反式脂肪標「0」門檻', value: '≤ 0.3', unit: 'g / 100 g', sub: '整包吃完仍會累積', targetPage: 'PAGE-F-01', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'sugar_red', label: '高糖紅燈（固體）', value: '> 22.5', unit: 'g 糖 / 100 g', sub: '鈉 > 600 mg 為高鈉', targetPage: 'PAGE-F-01', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'allergens', label: '強制標示過敏原', value: '11', unit: '類', sub: '含芒果、芝麻、亞硫酸鹽', targetPage: 'PAGE-F-04', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'adi_factor', label: 'ADI 安全係數', value: '100', unit: '倍', sub: '物種差異 10 × 個體差異 10', targetPage: 'PAGE-F-05', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'danger_zone', label: '危險溫度帶', value: '7–60', unit: '°C', sub: '熟食室溫 ≤ 2 小時', targetPage: 'PAGE-F-10', color: 'text-red-600 dark:text-red-400' },
      { id: 'red_meat', label: '紅肉每週上限', value: '350–500', unit: 'g 熟重', sub: '加工肉越少越好', targetPage: 'PAGE-F-11', color: 'text-emerald-600 dark:text-emerald-400' }
    ],
    learningPathway: [
      { step: 1, title: '看懂包裝', targetPages: ['PAGE-F-01', 'PAGE-F-04'], objective: '讀懂營養標示紅綠燈、成分排序與過敏原標示。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 2, title: '添加物與宣稱', targetPages: ['PAGE-F-05', 'PAGE-F-06'], objective: '理解 ADI 的安全邏輯，辨識健康食品與違規廣告。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300' },
      { step: 3, title: '台灣外食實戰', targetPages: ['PAGE-F-02', 'PAGE-F-07', 'PAGE-F-08', 'PAGE-F-09'], objective: '在便當店、早餐店、夜市與自助餐做出聰明選擇。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 4, title: '食品安全', targetPages: ['PAGE-F-10', 'PAGE-F-11'], objective: '掌握溫度與交叉污染防護，正確看待加工肉與隔夜菜。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' },
      { step: 5, title: '居家備餐與預算', targetPages: ['PAGE-F-03', 'PAGE-F-12'], objective: '減少外送依賴，用平價食材吃得健康。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold' }
    ]
  }
};

export const getChapterKnowledgeConfig = (chapterId: string): ChapterKnowledgeConfig => {
  const id = chapterId as ChapterId;
  return CHAPTER_KNOWLEDGE_CONFIGS[id] || CHAPTER_KNOWLEDGE_CONFIGS.W;
};
