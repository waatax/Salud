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
      { step: 4, title: '致命急症與安全閘', targetPages: ['PAGE-W-08', 'PAGE-W-11'], objective: '嚴格把關運動低血鈉 (EAH) 水中毒預防，以及心衰竭與末期腎病洗腎患者限水閘。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
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
      { id: 'smoke-point', name_zh: '發煙點與熱裂解', name_en: 'Smoke Point & Oxidation', desc: '初榨橄欖油、油品高溫熱裂解自由基與安全煎炒極限', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' }
    ],
    clinicalConstants: [
      { id: 'omega_ratio', label: 'Omega 6:3 比', value: '< 4:1', unit: '黃金攝取比', sub: '現代外食常失衡達 20:1 促發炎', targetPage: 'PAGE-O-02', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'evoo_smoke', label: '特級初榨發煙點', value: '190–210', unit: '°C', sub: '游離脂肪酸 < 0.8% 具熱穩定性', targetPage: 'PAGE-O-03', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'sfa_ceiling', label: '飽和脂肪上限', value: '< 10%', unit: '總熱量比例', sub: 'AHA 建議心血管高危族 < 6%', targetPage: 'PAGE-O-01', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'trans_fat', label: '反式脂肪標準', value: '0 g', unit: '人工氫化油禁令', sub: '低密度脂蛋白 LDL-C 明顯上升', targetPage: 'PAGE-O-01', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'pufa_oxidation', label: '過氧化物指數', value: '< 10', unit: 'meq O2/kg', sub: '回鍋油自由基破壞細胞膜脂質', targetPage: 'PAGE-O-03', color: 'text-red-600 dark:text-red-400' }
    ],
    learningPathway: [
      { step: 1, title: '脂肪酸化學結構', targetPages: ['PAGE-O-01'], objective: '掌握碳鏈飽和度、反式脂肪雙鍵立體異構物與血脂 LDL 機轉。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 2, title: 'Omega 比例與發炎級聯', targetPages: ['PAGE-O-02'], objective: '剖析 COX 酵素競爭、花生四烯酸微環境促發炎 vs 魚油消退素抗發炎。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' },
      { step: 3, title: '發煙點與高溫熱裂解安全', targetPages: ['PAGE-O-03'], objective: '打破橄欖油不能熱炒迷思，建立游離脂肪酸臨界與回鍋油毒性防禦。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' }
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
      { id: 'sleep-hydration', name_zh: '睡眠與水分恆定', name_en: 'Sleep & Osmotic Balance', desc: '下視丘 ADH 抑制利尿、深層 REM 睡眠片段化與宿醉病理', icon: Activity, color: 'sky', badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700', borderActive: 'border-sky-500 text-sky-700 bg-sky-50/80' }
    ],
    clinicalConstants: [
      { id: 'aldh2_tw', label: '台灣人 ALDH2 突變', value: '47%', unit: '人口盛行率', sub: '全球第一高！乙醛無法代謝蓄積', targetPage: 'PAGE-A-02', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'alcohol_safe', label: '世界衛生組織標準', value: '0 g', unit: '安全攝取閾值', sub: 'Lancet 實證：任何飲酒量皆有致癌風險', targetPage: 'PAGE-A-01', color: 'text-red-600 dark:text-red-400' },
      { id: 'iarc_acetaldehyde', label: '乙醛致癌等級', value: 'Group 1', unit: 'IARC 一級致癌物', sub: '直接破壞 DNA 引發食道癌/胃癌', targetPage: 'PAGE-A-02', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'rem_sleep_drop', label: '快速動眼期 REM', value: '-20%', unit: '深層睡眠破壞', sub: '中樞神經自律興奮導致夜間頻醒', targetPage: 'PAGE-A-03', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'diuretic_factor', label: '下視丘抑制 ADH', value: '+50%', unit: '額外利尿排水', sub: '每喝 250mL 啤酒排出 ~350mL 尿液', targetPage: 'PAGE-A-03', color: 'text-sky-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '肝臟雙步氧化機轉', targetPages: ['PAGE-A-01'], objective: '拆解 ADH/ALDH 代謝級聯與 NADH 累積阻斷脂肪酸氧化病理。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300' },
      { step: 2, title: 'ALDH2 缺損一級致癌', targetPages: ['PAGE-A-02'], objective: '正視臉紅並非代謝好，辨識一級致癌物乙醛與台灣族群食道癌風險。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' },
      { step: 3, title: '睡眠微結構與水合急救', targetPages: ['PAGE-A-03'], objective: '掌握酒精抑止 ADH 脫水循環，建立次日電解質水合與肝臟保護指引。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300' }
    ]
  },
  E: {
    titleZh: '能量與熱量平衡文庫',
    titleEn: 'Energy Balance & Metabolic Rate Base',
    summary: '熱力學第一定律、基礎代謝 BMR、NEAT 變異與代謝適應下調',
    constantsHeader: '能量與代謝恆定 · 臨床關鍵常數速查 (Metabolic Constants)',
    categories: [
      { id: 'all', name_zh: '全部能量專題', name_en: 'All Energy Topics', desc: '能量守恆定律、TDEE 四大組分、減重代謝適應深度文庫', icon: Layers, color: 'amber', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-amber-500 text-amber-700 dark:text-amber-300 bg-amber-50/70' },
      { id: 'energy-balance', name_zh: '熱量平衡與赤字', name_en: 'Energy Balance & Deficit', desc: '熱力學第一定律 CICO 模型、荷爾蒙調控假說與安全熱量赤字範圍', icon: Zap, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'metabolic-rate', name_zh: '基礎代謝與 TDEE', name_en: 'Basal Metabolism & TDEE', desc: 'BMR、NEAT 非運動性活動產熱、TEF 攝食產熱效應與 EAT 運動消耗', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'metabolic-adaptation', name_zh: '代謝適應與體重調控', name_en: 'Metabolic Adaptation', desc: '減重後甲狀腺素與瘦素調降、適應性熱量消耗減少與溜溜球效應預防', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' }
    ],
    clinicalConstants: [
      { id: 'cico_factor', label: '熱量能量常數', value: '4.184', unit: 'kJ / kcal', sub: '熱力學能量守恆：1大卡精確物理換算', targetPage: 'PAGE-E-01', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'bmr_share', label: 'BMR 佔 TDEE 比', value: '60–70%', unit: '每日總能耗', sub: '肝腦心腎等內臟維持生存核心消耗', targetPage: 'PAGE-E-02', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'neat_variance', label: 'NEAT 每日個體差', value: '300–800', unit: 'kcal / 日', sub: '站立走路坐姿晃動是日常燃脂最大變異', targetPage: 'PAGE-E-02', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'tef_ratio', label: '蛋白質產熱效應', value: '20–30%', unit: '食物熱效應 TEF', sub: '遠高於碳水化合物 (5-10%) 與油脂 (0-3%)', targetPage: 'PAGE-E-02', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'adaptation_drop', label: '代謝適應下調', value: '-10~15%', unit: '非預期能耗降低', sub: '過激節食致瘦素崩跌引發暴食反彈', targetPage: 'PAGE-E-03', color: 'text-rose-600 dark:text-rose-400' }
    ],
    learningPathway: [
      { step: 1, title: '熱力學定律與 CICO 實證', targetPages: ['PAGE-E-01'], objective: '打破荷爾蒙假說與熱量赤字對立，建立能量守恆科學基礎。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 2, title: 'TDEE 四大組分剖析', targetPages: ['PAGE-E-02'], objective: '精準量化 BMR、NEAT、TEF 與 EAT，掌握日常 NEAT 產熱槓桿。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 3, title: '代謝適應與突破停滯期', targetPages: ['PAGE-E-03'], objective: '辨識飢餓荷爾蒙調控機轉，制定 Diet Break 避免溜溜球效應。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  P: {
    titleZh: '蛋白質與肌肉合成文庫',
    titleEn: 'Protein & Muscle Protein Synthesis Base',
    summary: '肌蛋白合成 MPS、白胺酸觸發閾值、每日分配與腎病安全閘',
    constantsHeader: '蛋白質與肌肉恆定 · 臨床黃金常數速查 (Protein Biomarkers)',
    categories: [
      { id: 'all', name_zh: '全部蛋白質專題', name_en: 'All Protein Topics', desc: 'MPS 合成機制、白胺酸門檻、每餐攝取分配與腎功能安全完整課綱', icon: Layers, color: 'blue', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50/70' },
      { id: 'protein-synthesis', name_zh: '肌蛋白合成與白胺酸', name_en: 'MPS & Leucine Trigger', desc: 'mTORC1 訊息路徑、肌蛋白合成 (MPS) 與白胺酸飽和閾值', icon: Dumbbell, color: 'blue', badgeClass: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700', borderActive: 'border-blue-500 text-blue-700 bg-blue-50/80' },
      { id: 'protein-distribution', name_zh: '每日總量與分餐策略', name_en: 'Intake & Timing', desc: 'ISSN 肌肥大黃金攝取量 1.6-2.2 g/kg/d 與每餐均勻分配優勢', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'protein-safety', name_zh: '蛋白質品質與腎臟安全閘', name_en: 'Protein Quality & Renal Safety', desc: 'DIAAS 消化率評分、健康腎臟耐受上限與 CKD 限蛋白嚴格守則', icon: ShieldCheck, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' }
    ],
    clinicalConstants: [
      { id: 'leucine_trigger', label: '白胺酸觸發閾值', value: '2.7–3.0', unit: 'g / 餐', sub: '啟動肌肉細胞 mTORC1 蛋白質合成關鍵', targetPage: 'PAGE-P-01', color: 'text-blue-600 dark:text-blue-400' },
      { id: 'rda_baseline', label: '衛福部 RDA 基準', value: '0.8–1.0', unit: 'g / kg / 日', sub: '僅為防止氮負平衡最低生存需求', targetPage: 'PAGE-P-02', color: 'text-slate-600 dark:text-slate-400' },
      { id: 'hypertrophy_target', label: '肌肥大最佳攝取區間', value: '1.6–2.2', unit: 'g / kg / 日', sub: 'ISSN 統合分析證實超過 2.2g 無額外增肌優勢', targetPage: 'PAGE-P-02', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'mps_ceiling', label: '單餐 MPS 飽和劑量', value: '0.40', unit: 'g / kg / 餐', sub: '約 20-40g 優質蛋白質即可達到最大合成峰值', targetPage: 'PAGE-P-02', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'ckd_gate', label: '腎病限蛋白安全閘', value: '0.6–0.8', unit: 'g / kg / 日', sub: 'eGFR < 45 (CKD G3b+) 須受腎專科醫師監督', targetPage: 'PAGE-P-03', color: 'text-rose-600 dark:text-rose-400' }
    ],
    learningPathway: [
      { step: 1, title: '肌蛋白合成與白胺酸門檻', targetPages: ['PAGE-P-01'], objective: '掌握 mTOR 訊息通路與白胺酸 3g 門檻對年長者阻抗的重要性。', badgeClass: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300' },
      { step: 2, title: '全日總量與每餐分配學', targetPages: ['PAGE-P-02'], objective: '破解高蛋白傷骨傷肝迷思，掌握 1.6-2.2 g/kg 均勻 3-4 餐策略。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 3, title: 'DIAAS 品質與腎病安全閘', targetPages: ['PAGE-P-03'], objective: '運用迴腸消化率評級植物蛋白，嚴格把關慢性腎病限蛋白紅線。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold' }
    ]
  },
  C: {
    titleZh: '碳水化合物與膳食纖維文庫',
    titleEn: 'Carbohydrates & Dietary Fiber Base',
    summary: '單糖寡糖多醣、升糖指數 GI/GL、腸道微生物短鏈脂肪酸發酵',
    constantsHeader: '碳水化合物與纖維 · 臨床關鍵常數速查 (Carb Biomarkers)',
    categories: [
      { id: 'all', name_zh: '全部碳水專題', name_en: 'All Carb Topics', desc: '醣類結構分類、GI/GL、膳食纖維發酵與肝醣超補完整文庫', icon: Layers, color: 'teal', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-teal-500 text-teal-700 dark:text-teal-300 bg-teal-50/70' },
      { id: 'carb-classification', name_zh: '結構分類與升糖指數', name_en: 'Carb Types & GI/GL', desc: '直鏈/支鏈澱粉消化速度、GI 升糖指數與 GL 升糖負荷臨床實證', icon: Wheat, color: 'teal', badgeClass: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700', borderActive: 'border-teal-500 text-teal-700 bg-teal-50/80' },
      { id: 'dietary-fiber', name_zh: '膳食纖維與腸道微菌叢', name_en: 'Fiber & Gut Microbiota', desc: '水溶性與非水溶性纖維、短鏈脂肪酸 (SCFA) 乙酸丙酸丁酸健康效益', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'glycogen-storage', name_zh: '肝醣儲存與運動耐力', name_en: 'Glycogen & Performance', desc: '肝醣容量極限、醣原超補策略與中高強度運動補醣時間窗', icon: Zap, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' }
    ],
    clinicalConstants: [
      { id: 'fiber_target', label: '膳食纖維每日目標', value: '25–35', unit: 'g / 日', sub: '台灣成人九成未達標！平均僅約 14-16g', targetPage: 'PAGE-C-02', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'low_gi_cutoff', label: '低 GI 升糖指數門檻', value: '≤ 55', unit: 'GI 指標值', sub: '血糖上升平緩；高 GI ≥ 70 引發胰島素激增', targetPage: 'PAGE-C-01', color: 'text-teal-600 dark:text-teal-400' },
      { id: 'glycogen_cap', label: '人體肝醣總儲量', value: '400–500', unit: 'g (~1600 kcal)', sub: '肌肉約 400g (自用) + 肝臟約 100g (調血醣)', targetPage: 'PAGE-C-03', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'scfa_ratio', label: 'SCFA 短鏈脂肪酸比', value: '60:20:20', unit: '乙酸:丙酸:丁酸', sub: '丁酸維持腸黏膜屏障與抗大腸癌核心', targetPage: 'PAGE-C-02', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'low_gl_cutoff', label: '低 GL 升糖負荷門檻', value: '≤ 10', unit: 'GL 指標值', sub: '考量實際食用碳水份量，比單看 GI 更臨床實用', targetPage: 'PAGE-C-01', color: 'text-sky-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '碳水結構分類與升糖指標', targetPages: ['PAGE-C-01'], objective: '學會區分直鏈澱粉抗性與單醣吸收率，掌握低 GI/GL 控糖法。', badgeClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300' },
      { step: 2, title: '膳食纖維與腸道微菌發酵', targetPages: ['PAGE-C-02'], objective: '解析雙歧桿菌產丁酸途徑，打造堅固腸道屏障與免疫恆定。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 3, title: '肝醣動態調節與運動補醣', targetPages: ['PAGE-C-03'], objective: '掌握 400-500g 肝醣庫耗竭臨界與運動耐力補醣黃金時機。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold' }
    ]
  },
  S: {
    titleZh: '糖與游離糖解碼文庫',
    titleEn: 'Sugars, Fructose & Sweeteners Base',
    summary: 'WHO 游離糖限制、果糖特異性肝臟代謝、NAFLD 脂肪肝與代糖爭議',
    constantsHeader: '游離糖與果糖病理 · 臨床關鍵常數速查 (Sugar Clinical Constants)',
    categories: [
      { id: 'all', name_zh: '全部糖類專題', name_en: 'All Sugar Topics', desc: '游離糖定義、果糖脂生成路徑、非酒精性脂肪肝與人工甜味劑', icon: Layers, color: 'rose', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-rose-500 text-rose-700 dark:text-rose-300 bg-rose-50/70' },
      { id: 'free-sugars', name_zh: '游離糖與指引上限', name_en: 'Free Sugars & WHO Guidelines', desc: '游離糖嚴謹定義、含糖飲料空熱量與 WHO 每日熱量 10% 警戒線', icon: Candy, color: 'rose', badgeClass: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700', borderActive: 'border-rose-500 text-rose-700 bg-rose-50/80' },
      { id: 'fructose-pathology', name_zh: '果糖代謝與脂肪肝', name_en: 'Fructose & Hepatic Lipogenesis', desc: '果糖激酶繞過 PFK 負回饋、從頭脂肪生成 (DNL) 與尿酸高血壓', icon: AlertTriangle, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'sugar-substitutes', name_zh: '代糖甜味劑實證', name_en: 'Non-Sugar Sweeteners', desc: '阿斯巴甜、三氯蔗糖、赤藻糖醇對胰島素抗性與腸道菌群實證爭議', icon: ShieldCheck, color: 'purple', badgeClass: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700', borderActive: 'border-purple-500 text-purple-700 bg-purple-50/80' }
    ],
    clinicalConstants: [
      { id: 'who_free_sugar', label: 'WHO 游離糖建議上限', value: '< 10%', unit: '總熱量比例', sub: '強力建議 < 5% (約 25g，等於半杯手搖飲)', targetPage: 'PAGE-S-01', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'fructose_dnl', label: '果糖脂肪生成臨界', value: '> 50', unit: 'g / 日', sub: '繞過糖解負回饋，直接於肝臟轉化三酸甘油酯', targetPage: 'PAGE-S-02', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'ages_rate', label: '果糖糖化交聯速率', value: '7–10x', unit: '比葡萄糖快', sub: '極易誘發晚期糖化終產物 AGEs 血管硬化', targetPage: 'PAGE-S-02', color: 'text-red-600 dark:text-red-400' },
      { id: 'sweetener_potency', label: '常見高倍代糖甜度', value: '200–600x', unit: '蔗糖相對倍數', sub: '極微量即有強烈甜味，無法提供大腦飽足訊號', targetPage: 'PAGE-S-03', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'pediatric_zero', label: '2歲以下嬰幼兒', value: '0 g', unit: '添加糖安全上限', sub: 'AAP/AHA 嚴格警告：避免影響神經味覺發育', targetPage: 'PAGE-S-01', color: 'text-rose-600 dark:text-rose-400' }
    ],
    learningPathway: [
      { step: 1, title: '游離糖定義與 WHO 指引', targetPages: ['PAGE-S-01'], objective: '學會辨識果汁蜂蜜等隱形游離糖，建立每日 <25g 控糖警戒線。', badgeClass: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' },
      { step: 2, title: '果糖特異性肝臟代謝病理', targetPages: ['PAGE-S-02'], objective: '拆解高果糖糖漿引發非酒精性脂肪肝與高尿酸痛風之生化機轉。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold' },
      { step: 3, title: '非營養性甜味劑客觀審定', targetPages: ['PAGE-S-03'], objective: '客觀評估赤藻糖醇與阿斯巴甜心血管與腸道微菌實證。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300' }
    ]
  },
  N: {
    titleZh: '鈉、鉀與血壓生理文庫',
    titleEn: 'Sodium, Potassium & Blood Pressure Base',
    summary: '細胞膜鈉鉀幫浦、RAAS 腎素血管加壓素醛固酮系統、低鈉高鉀血管保護',
    constantsHeader: '鈉鉀離子與血壓 · 臨床關鍵常數速查 (Electrolyte Constants)',
    categories: [
      { id: 'all', name_zh: '全部鈉鉀專題', name_en: 'All Electrolyte Topics', desc: '鈉離子恆定、鉀離子心血管保護、飲食鈉鉀比與減鈉實踐完整課綱', icon: Layers, color: 'red', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-red-500 text-red-700 dark:text-red-300 bg-red-50/70' },
      { id: 'sodium-blood-pressure', name_zh: '鈉離子與血壓調控', name_en: 'Sodium & RAAS Axis', desc: '細胞外液容量擴張、RAAS 腎素-血管張力素-醛固酮系統與血管平滑肌收縮', icon: HeartPulse, color: 'red', badgeClass: 'bg-red-50 dark:bg-red-950/50 text-red-700', borderActive: 'border-red-500 text-red-700 bg-red-50/80' },
      { id: 'potassium-cardiovascular', name_zh: '鉀離子生理與心血管保護', name_en: 'Potassium & Vasodilation', desc: '鉀離子促尿鈉排泄、血管內皮細胞超極化一氧化氮 NO 釋放與降壓機轉', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'sodium-potassium-ratio', name_zh: '鈉鉀比例與臨床減鈉實踐', name_en: 'Sodium-Potassium Ratio', desc: '外食高鈉低鉀危機、黃金鉀鈉比 ≥ 1:1 與低鈉富鉀替代鹽安全把關', icon: ShieldCheck, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' }
    ],
    clinicalConstants: [
      { id: 'who_sodium_cap', label: 'WHO 每日鈉上限', value: '< 2000', unit: 'mg / 日', sub: '相當於 5 公克食鹽 (NaCl)', targetPage: 'PAGE-N-01', color: 'text-red-600 dark:text-red-400' },
      { id: 'tw_sodium_cap', label: '台灣衛福部建議鈉上限', value: '< 2400', unit: 'mg / 日', sub: '相當於 6 公克食鹽；國人平均攝取超標 1.5-2 倍', targetPage: 'PAGE-N-01', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'potassium_target', label: '鉀離子每日目標', value: '3510–4700', unit: 'mg / 日', sub: '促尿鈉排泄、放鬆血管阻力天然利尿劑', targetPage: 'PAGE-N-02', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'k_na_ratio', label: '黃金鉀鈉莫耳比', value: '≥ 1:1', unit: 'K : Na 比例', sub: '高血壓與中風死亡率最低之天然飲食模式', targetPage: 'PAGE-N-03', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'sbp_reduction', label: '減鈉 1g 降壓效益', value: '-3.5~5.0', unit: 'mmHg 收縮壓', sub: '高血壓患者降壓幅度更顯著', targetPage: 'PAGE-N-01', color: 'text-sky-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '鈉離子與 RAAS 調節血壓', targetPages: ['PAGE-N-01'], objective: '掌握細胞外液容量擴張、交感神經活性與腎素調節血管阻力機轉。', badgeClass: 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300' },
      { step: 2, title: '鉀離子血管內皮舒張保護', targetPages: ['PAGE-N-02'], objective: '剖析內皮細胞超極化與一氧化氮 NO 生成，促進心血管彈性。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 3, title: '飲食鉀鈉比與富鉀鹽安全閘', targetPages: ['PAGE-N-03'], objective: '掌握外食隱形鈉拆解，並針對慢性腎病高血鉀嚴格把關低鈉鹽安全。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold' }
    ]
  },
  M: {
    titleZh: '微量營養素與生物利用率文庫',
    titleEn: 'Micronutrients & Bioavailability Base',
    summary: '鐵鋅生物利用率、維生素 D-鈣吸收軸、維生素 B 群單碳代謝',
    constantsHeader: '微量營養素恆定 · 臨床關鍵常數速查 (Micronutrient Constants)',
    categories: [
      { id: 'all', name_zh: '全部微量元素專題', name_en: 'All Micronutrient Topics', desc: '血鐵恆定、維生素 D 鈣平衡、維生素 B 群與葉酸甲基化完整文庫', icon: Layers, color: 'violet', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-violet-500 text-violet-700 dark:text-violet-300 bg-violet-50/70' },
      { id: 'iron-bioavailability', name_zh: '血鐵恆定與植酸干擾', name_en: 'Iron Forms & Inhibitors', desc: '血基質鐵 (15-35%) vs 非血基質鐵 (2-10%)、植酸單寧多酚螯合抑制', icon: Pill, color: 'violet', badgeClass: 'bg-violet-50 dark:bg-violet-950/50 text-violet-700', borderActive: 'border-violet-500 text-violet-700 bg-violet-50/80' },
      { id: 'vitamin-d-calcium', name_zh: '維生素 D 與鈣吸收軸', name_en: 'Vitamin D & Calcium Axis', desc: '皮膚 7-脫氫膽固醇光化反應、活性 1,25(OH)2D3 與腸鈣結合蛋白結合', icon: Activity, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'b-complex-metabolism', name_zh: 'B群代謝與同半胱胺酸', name_en: 'B-Complex & One-Carbon', desc: 'B12、葉酸、B6 作為單碳代謝輔酶、同半胱胺酸清除與心血管保護', icon: ShieldCheck, color: 'sky', badgeClass: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700', borderActive: 'border-sky-500 text-sky-700 bg-sky-50/80' }
    ],
    clinicalConstants: [
      { id: 'ferritin_deficiency', label: '鐵蛋白缺乏警戒線', value: '< 30', unit: 'ng / mL', sub: '臨床隱性缺鐵期，早在血紅素下降前即有疲勞症狀', targetPage: 'PAGE-M-01', color: 'text-violet-600 dark:text-violet-400' },
      { id: 'vit_d_optimal', label: '血清 25(OH)D 理想值', value: '30–50', unit: 'ng / mL', sub: '台灣成人高達六成缺乏！< 20 屬於顯著不足', targetPage: 'PAGE-M-02', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'calcium_daily', label: '成人鈣元素每日需求', value: '1000', unit: 'mg / 日', sub: '分次補充 (單次 ≤ 500mg) 吸收率最高', targetPage: 'PAGE-M-02', color: 'text-sky-600 dark:text-salud-cyan' },
      { id: 'homocysteine_safe', label: '同半胱胺酸安全帶', value: '< 10', unit: 'μmol / L', sub: '> 15 屬於高同半胱胺酸血症，加速動脈粥狀硬化', targetPage: 'PAGE-M-03', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'b12_if_capacity', label: '單餐內在因子吸收力', value: '~1.5-2.0', unit: 'μg / 餐', sub: '高劑量 B12 僅能靠 1% 被動擴散吸收', targetPage: 'PAGE-M-03', color: 'text-amber-600 dark:text-amber-400' }
    ],
    learningPathway: [
      { step: 1, title: '血基質鐵與植酸干擾抑制', targetPages: ['PAGE-M-01'], objective: '學會維生素 C 促進非血基質鐵還原，避開茶與咖啡單寧阻隔。', badgeClass: 'bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300' },
      { step: 2, title: '維生素 D 內分泌與骨鈣沉積', targetPages: ['PAGE-M-02'], objective: '掌握 25(OH)D 最佳濃度，建立維生素 D3 + K2 與鈣質協同沉積。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 3, title: 'B 群單碳代謝與同半胱胺酸', targetPages: ['PAGE-M-03'], objective: '掌握葉酸與 B12 甲基化循環，保護血管內皮與預防巨球性貧血。', badgeClass: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 font-bold' }
    ]
  },
  D: {
    titleZh: '飲食模式與流行病學證據文庫',
    titleEn: 'Dietary Patterns & Epidemiological Evidence',
    summary: '地中海飲食 PREDIMED、得舒飲食 DASH 降壓、麥得飲食 MIND 大腦認知保護',
    constantsHeader: '飲食模式實證 · 臨床關鍵常數速查 (Epidemiology Constants)',
    categories: [
      { id: 'all', name_zh: '全部飲食模式專題', name_en: 'All Dietary Patterns', desc: '地中海飲食、得舒 DASH、麥得 MIND 與植物性飲食完整實證課綱', icon: Layers, color: 'emerald', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50/70' },
      { id: 'mediterranean-diet', name_zh: '地中海飲食與心血管', name_en: 'Mediterranean Diet & CVD', desc: 'PREDIMED 隨機對照試驗、初榨橄欖油堅果抗氧化與心血管一級預防', icon: Salad, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' },
      { id: 'dash-diet', name_zh: '得舒飲食降血壓機轉', name_en: 'DASH Diet & SBP', desc: '高鉀高鎂高鈣、膳食纖維、低飽和脂肪協同舒張血管壁降壓實證', icon: HeartPulse, color: 'teal', badgeClass: 'bg-teal-50 dark:bg-teal-950/50 text-teal-700', borderActive: 'border-teal-500 text-teal-700 bg-teal-50/80' },
      { id: 'mind-plant-based', name_zh: '麥得飲食與植物性模式', name_en: 'MIND & Plant-Based', desc: '深色莓果與綠葉蔬菜類黃酮、大腦認知退化延緩與全植物飲食死亡率', icon: ShieldCheck, color: 'purple', badgeClass: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700', borderActive: 'border-purple-500 text-purple-700 bg-purple-50/80' }
    ],
    clinicalConstants: [
      { id: 'predimed_hr', label: 'PREDIMED 心血管風險', value: 'HR 0.70', unit: '主要心血管事件 (MACE)', sub: '地中海飲食組心肌梗塞/中風顯著降低 30%', targetPage: 'PAGE-D-01', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'dash_sbp_drop', label: 'DASH 飲食收縮壓降幅', value: '-8~11', unit: 'mmHg 降壓效益', sub: '降壓效果相當於第一線單一降血壓藥物', targetPage: 'PAGE-D-02', color: 'text-teal-600 dark:text-teal-400' },
      { id: 'mind_ad_risk', label: 'MIND 阿茲海默症風險', value: '-53%', unit: '高遵循度組降幅', sub: '即使中度遵循亦可降低約 35% 認知衰退', targetPage: 'PAGE-D-03', color: 'text-purple-600 dark:text-purple-400' },
      { id: 'upf_ceiling', label: '超加工食品 UPF 警戒', value: '< 20%', unit: '每日總熱量佔比', sub: '統合分析：每增加 10% UPF 總死亡率上升 14%', targetPage: 'PAGE-D-01', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'plant_animal_ratio', label: '植物蛋白相對比', value: '≥ 2:1', unit: '優質蛋白質配置', sub: '大幅降低慢性腎病微白蛋白尿發生率', targetPage: 'PAGE-D-03', color: 'text-sky-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '地中海飲食與心血管保護', targetPages: ['PAGE-D-01'], objective: '剖析 PREDIMED 實證，掌握特級初榨橄欖油與堅果多酚多重效益。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' },
      { step: 2, title: '得舒飲食降壓礦物質矩陣', targetPages: ['PAGE-D-02'], objective: '掌握鉀、鎂、鈣協同促排鈉與舒張血管平滑肌生理機制。', badgeClass: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300' },
      { step: 3, title: '麥得飲食與大腦神經保護', targetPages: ['PAGE-D-03'], objective: '結合地中海與得舒優勢，精準攝取莓果花青素預防認知退化。', badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold' }
    ]
  },
  F: {
    titleZh: '食品標示與台灣外食解密文庫',
    titleEn: 'Food Labels & Taiwan Real-World Eating Out',
    summary: '八大營養標示計算、反式脂肪法規、隱形鈉重組油陷阱與便當麵攤減害',
    constantsHeader: '外食拆解與食品標示 · 臨床關鍵常數速查 (Food Label Constants)',
    categories: [
      { id: 'all', name_zh: '全部標示外食專題', name_en: 'All Label & Food Topics', desc: '八大標示法規、外食隱形油脂鈉含量、台灣外食四大場景實戰攻略', icon: Layers, color: 'cyan', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700', borderActive: 'border-cyan-500 text-cyan-700 dark:text-cyan-300 bg-cyan-50/70' },
      { id: 'food-nutrition-label', name_zh: '營養標示與法規盲點', name_en: 'Nutrition Facts & Regulations', desc: '八大強制標示項目、每份與每百克換算陷阱、反式脂肪零標示標準', icon: FileText, color: 'cyan', badgeClass: 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700', borderActive: 'border-cyan-500 text-cyan-700 bg-cyan-50/80' },
      { id: 'hidden-sodium-oil', name_zh: '隱形鈉與重組油陷阱', name_en: 'Hidden Sodium & Processed Oils', desc: '高湯醬料加工肉品隱形鈉鹽、重組肉黏著劑與低成本氫化調合油', icon: AlertTriangle, color: 'amber', badgeClass: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700', borderActive: 'border-amber-500 text-amber-700 bg-amber-50/80' },
      { id: 'eating-out-tactics', name_zh: '台灣外食減害四步法', name_en: 'Taiwan Dining-Out Tactics', desc: '便利商店、自助餐便當店、傳統麵攤、火鍋店實戰減害挑選 SOP', icon: ShieldCheck, color: 'emerald', badgeClass: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700', borderActive: 'border-emerald-500 text-emerald-700 bg-emerald-50/80' }
    ],
    clinicalConstants: [
      { id: 'trans_zero_threshold', label: '反式脂肪標示零門檻', value: '< 0.3', unit: 'g / 100g 規定', sub: '低於 0.3g 可標示為 0！累積多份仍可能超標', targetPage: 'PAGE-F-01', color: 'text-rose-600 dark:text-rose-400' },
      { id: 'low_sodium_std', label: '法定低鈉標準上限', value: '≤ 120', unit: 'mg / 100g', sub: '超過 600mg 即屬於高鈉警訊食品', targetPage: 'PAGE-F-01', color: 'text-amber-600 dark:text-amber-400' },
      { id: 'sugar_free_std', label: '法定無糖標準上限', value: '≤ 0.5', unit: 'g / 100g', sub: '低糖標準則為 ≤ 5g / 100g', targetPage: 'PAGE-F-01', color: 'text-emerald-600 dark:text-emerald-400' },
      { id: 'tw_bento_sodium', label: '台灣排骨便當平均鈉', value: '1300–1600', unit: 'mg / 盒', sub: '光吃一個便當即達全日鈉上限 60-70%', targetPage: 'PAGE-F-02', color: 'text-red-600 dark:text-red-400' },
      { id: 'fop_warning', label: '警示標章國際趨勢', value: '3黑標', unit: '高糖 / 高鈉 / 高飽和脂', sub: 'Nutri-Score 與智利黑色八角形警示', targetPage: 'PAGE-F-01', color: 'text-cyan-600 dark:text-salud-cyan' }
    ],
    learningPathway: [
      { step: 1, title: '八大營養標示換算與拆解', targetPages: ['PAGE-F-01'], objective: '學會破解每份包裝伎倆，識破反式脂肪小於 0.3g 標示零之真相。', badgeClass: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300' },
      { step: 2, title: '隱形鈉與加工用油陷阱', targetPages: ['PAGE-F-02'], objective: '拆解貢丸羹湯酸菜與重組肉添加物，掌握外食潛藏危機。', badgeClass: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300' },
      { step: 3, title: '台灣四大外食情境實戰減害', targetPages: ['PAGE-F-03'], objective: '建立超商、便當店、麵攤、火鍋店「去皮、不喝湯、加青菜」SOP。', badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold' }
    ]
  }
};

export const getChapterKnowledgeConfig = (chapterId: string): ChapterKnowledgeConfig => {
  const id = chapterId as ChapterId;
  return CHAPTER_KNOWLEDGE_CONFIGS[id] || CHAPTER_KNOWLEDGE_CONFIGS.W;
};
