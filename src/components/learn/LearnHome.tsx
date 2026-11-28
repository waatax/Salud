import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  ArrowRight, BookOpen, Leaf, ShieldCheck, Clock, ChevronDown, CheckCircle2,
  Sparkles, ClipboardList, Stethoscope, GraduationCap, Calculator,
  Bookmark, RotateCcw, LibraryBig, CircleHelp, Search, Compass, Utensils,
  Pill, Dumbbell, Zap, Sun, Droplets, Sliders, Moon, Activity, X,
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { getDueLessonIds } from '../../compose/spacedRepetition';
import { useActionPlan } from '../../hooks/useActionPlan';
import { ALL_LESSONS, LEARNING_TRACKS, findLesson, getTrack } from '../../data/learning/tracks';
import { getUpdate, UPDATE_CATEGORY_META } from '../../data/learning/evidenceUpdates';
import { DISCOVERY_CATEGORIES, DISCOVERY_TOPICS, filterDiscoveryTopics, type DiscoveryCategory } from '../../data/learning/discovery';
import { SUPPLEMENT_COUNT } from '../../config/version';
import { TrackIcon, ProgressBar, formatYM } from './learnUi';
import './editorial-home.css';

const ActionPlanPanel = lazy(() => import('./ActionPlanPanel').then(m => ({ default: m.ActionPlanPanel })));
const QuickTips = lazy(() => import('./QuickTips').then(m => ({ default: m.QuickTips })));
const HealthCompassWidget = lazy(() => import('./HealthCompassWidget').then(m => ({ default: m.HealthCompassWidget })));
const MetabolicJourney = lazy(() => import('./MetabolicJourney').then(m => ({ default: m.MetabolicJourney })));

interface HeroGuide {
  id: string;
  label: string;
  badge: string;
  lessonId?: string;
  durationText: string;
  title: string;
  intro: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  photo: string;
  photoAlt: string;
  quickLinks: { label: string; href: string }[];
}

/**
 * Homepage Hero Guides — Healthy Diet ('eat') is strictly #1 first displayed page,
 * followed immediately by Special Supplements, Movement, and Sleep.
 */
const guides: HeroGuide[] = [
  {
    id: 'eat',
    label: '健康飲食',
    badge: '首頁精選・健康飲食起點',
    lessonId: 'L-EAT-01',
    durationText: '6 分鐘白話入門 + 完整營養專區',
    title: '打開便當，怎麼吃出健康又長壽？',
    intro: '從國健署「我的餐盤」、每餐一掌心優質蛋白質、選好油與每日 25–35 g 膳食纖維出發，比較地中海與 DASH 飲食法，照自己的步調把三餐吃對。',
    primaryLabel: '進入健康飲食專區',
    primaryHref: '#diet',
    secondaryLabel: '先讀 6 分鐘餐盤入門課',
    secondaryHref: '#learn/eat/L-EAT-01',
    photo: 'salud-healthy-morning.webp',
    photoAlt: '晨光中桌上擺放開水、筆記本與新鮮水果的健康飲食早晨',
    quickLinks: [
      { label: '六大營養素與餐盤', href: '#diet' },
      { label: '地中海／DASH 飲食法', href: '#diet/patterns' },
      { label: '特別營養品與補給品', href: '#supplements' },
      { label: '喝水 (W)', href: '#W' },
      { label: '選油 (O)', href: '#O' },
      { label: '酒精風險 (A)', href: '#A' },
    ],
  },
  {
    id: 'supplements',
    label: '特別營養品',
    badge: '科學實證補給・40 項成分 RCT 評級',
    durationText: '原型食物優先 + 藥物交互安全檢查',
    title: '胺基酸、肌酸、維他命、纖維素：哪些真有效？',
    intro: '只看嚴謹人體隨機對照試驗與國際醫學指南：一次釐清乳清／EAA、一水肌酸、D3／B12／維 C、洋車前子／PHGG 的有效劑量、吸收型態與處方藥禁忌。',
    primaryLabel: '探索 40 項實證補給品',
    primaryHref: '#supplements',
    secondaryLabel: '讀懂蛋白質 1.2–1.6 g/kg',
    secondaryHref: '#learn/eat/L-EAT-02',
    photo: 'salud-healthy-morning.webp',
    photoAlt: '日常餐桌上的原型食物與科學營養補給搭配示意',
    quickLinks: [
      { label: '胺基酸與蛋白質', href: '#supplements/AMINO_PROTEIN' },
      { label: '一水肌酸與運動補給', href: '#supplements/PERFORMANCE_ENERGY' },
      { label: '維他命與礦物質', href: '#supplements/VITAMINS_MINERALS' },
      { label: '膳食纖維與益生元', href: '#supplements/FIBER_PREBIOTICS' },
    ],
  },
  {
    id: 'move',
    label: '開始運動',
    badge: '運動與肌力入門',
    lessonId: 'L-MOVE-01',
    durationText: '約 6 分鐘入門',
    title: '散步時，怎麼知道自己走得夠快？',
    intro: '在熟悉的路上走一段，留意自己還能不能邊走邊說話。從這個小觀察學會分辨活動強度，再延伸到肌力與肌耐力訓練。',
    primaryLabel: '閱讀這堂小課',
    primaryHref: '#learn/move/L-MOVE-01',
    secondaryLabel: '讀懂步數研究',
    secondaryHref: '#updates/UPD-2025-STEPS',
    photo: 'salud-park-walk.webp',
    photoAlt: '清晨綠蔭公園步道上輕鬆健走的日常景象',
    quickLinks: [
      { label: '運動入門與心率', href: '#exercise' },
      { label: '肌力與肌耐力訓練', href: '#exercise/strength' },
      { label: '跑步配速', href: '#exercise/running' },
      { label: '伸展與活動度', href: '#exercise/mobility' },
    ],
  },
  {
    id: 'rest',
    label: '睡個好覺',
    badge: '睡眠與修復入門',
    lessonId: 'L-REST-01',
    durationText: '約 6 分鐘入門',
    title: '睡了好幾個鐘頭，醒來還是累？',
    intro: '昨晚幾點睡、半夜醒了幾次、白天精神如何？把這些線索放在一起，搭配生理時鐘與 CBT-I 原則，真正找回深層修復。',
    primaryLabel: '閱讀這堂小課',
    primaryHref: '#learn/rest/L-REST-01',
    secondaryLabel: '讀懂睡眠規律研究',
    secondaryHref: '#updates/UPD-2024-SLEEP-REG',
    photo: 'salud-sleep-journal.webp',
    photoAlt: '清晨窗光照在床邊攤開的日誌和鉛筆上',
    quickLinks: [
      { label: '睡眠與失眠專區', href: '#sleep' },
      { label: '咖啡因代謝試算', href: '#sleep/CAFFEINE_SIM' },
      { label: '壓力與呼吸練習', href: '#mental' },
      { label: '正念與身心課程', href: '#mindbody' },
    ],
  },
];

const DIET_CORE_CARDS = [
  {
    title: '六大營養素與餐盤',
    desc: '醣類、纖維、蛋白質、好油、維生素與礦物質每日目標、食材來源與迷思破除。',
    href: '#diet',
    badge: '9 大飲食主題',
    icon: Utensils,
    tone: 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300',
  },
  {
    title: '地中海・DASH 飲食法',
    desc: '7 大主流飲食法熱量配比、臨床實證強度、缺乏風險與適用族群一次比對。',
    href: '#diet/patterns',
    badge: '互動比較工具',
    icon: Sliders,
    tone: 'bg-amber-100/90 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
  },
  {
    title: '外食便當 10 堂小課',
    desc: '從 120 元便當改造、蛋白質分配、看懂營養標示到減鹽減糖，每課只要 6 分鐘。',
    href: '#learn/eat',
    badge: '入門必讀路徑',
    icon: BookOpen,
    tone: 'bg-teal-100/90 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300',
  },
  {
    title: '水・油・酒 11 大專章',
    desc: '喝水與電解質、廚房選油脂肪酸圖解、ALDH2 酒精風險與 11 章深度營養課綱。',
    href: '#W',
    badge: '11 章深度專章',
    icon: Droplets,
    tone: 'bg-sky-100/90 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300',
  },
];

const SUPPLEMENT_SPOTLIGHT_PILLARS = [
  {
    title: '胺基酸與蛋白質',
    compounds: '乳清 WPI/WPC · 完整 EAA/白胺酸 vs BCAA · 豌豆＋糙米蛋白 · HMB · 甘胺酸',
    evidence: '49 項 RCT（BJSM 2018）：搭配阻力訓練推至 ~1.6 g/kg，完整 9 種 EAA 勝過單吃 BCAA。',
    href: '#supplements/AMINO_PROTEIN',
    icon: Dumbbell,
    accent: 'text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60',
  },
  {
    title: '肌酸與運動體能',
    compounds: '一水肌酸 3–5 g · 咖啡因 · β-丙胺酸 · 甜菜根硝酸鹽 · 運動電解質',
    evidence: 'ISSN / AIS Group A：提升爆發力與瘦體重，亦支撐高齡與睡眠不足下之認知表現。',
    href: '#supplements/PERFORMANCE_ENERGY',
    icon: Zap,
    accent: 'text-sky-800 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/60',
  },
  {
    title: '維他命與關鍵礦物質',
    compounds: 'D3+K2 · B12/活性葉酸 · 維 C · 綜合維他命 (COSMOS) · 甘胺酸鎂 · 隔日補鐵 · 鈣 · 葉黃素',
    evidence: '缺口精準補足：先驗血確認 25(OH)D、B12、Ferritin，避開超量結石與藥物衝突。',
    href: '#supplements/VITAMINS_MINERALS',
    icon: Sun,
    accent: 'text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60',
  },
  {
    title: '膳食纖維與益生元',
    compounds: '洋車前子殼粉 · 燕麥 β-葡聚醣 · 低 FODMAP 關華豆膠 PHGG · 菊糖/GOS · 抗性澱粉',
    evidence: '28 項 RCT（AJCN 2018）：黏性纖維確鑿降 LDL-C 6–10%，PHGG 溫和不脹氣。',
    href: '#supplements/FIBER_PREBIOTICS',
    icon: Leaf,
    accent: 'text-teal-800 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-950/60',
  },
];

interface IntentPath {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  summary: string;
  evidenceTip: string;
  step1: { tag: string; title: string; desc: string; href: string };
  step2: { tag: string; title: string; desc: string; href: string };
  step3: { tag: string; title: string; desc: string; href: string };
  extraLinks: { label: string; href: string }[];
}

/**
 * RPDCA Guided Wayfinder: maps 6 real-world reader intents into a zero-friction
 * 3-step reading journey so users smoothly find the exact topic they want.
 */
const INTENT_PATHS: IntentPath[] = [
  {
    id: 'diet',
    label: '想吃得更健康・外食怎麼配',
    shortLabel: '健康飲食・外食',
    icon: Utensils,
    summary: '不用痛苦算熱量：先看懂餐盤比例與蛋白質份量，再挑適合自己的飲食模式與廚房好油。',
    evidenceTip: '多數長壽與心血管飲食共識都指向同一件事：半盤蔬菜＋掌心蛋白質＋未精製全穀＋以橄欖油/芥花油取代飽和脂肪。',
    step1: { tag: 'Step 1 · 6 分鐘入門', title: '我的餐盤：打開便當怎麼配？', desc: '學會用拳頭與掌心快速檢視外食缺了哪一類食物。', href: '#learn/eat/L-EAT-01' },
    step2: { tag: 'Step 2 · 營養全覽', title: '六大營養素與地中海／DASH 飲食法', desc: '對照 9 大飲食關鍵與 7 種主流飲食法的優缺點。', href: '#diet' },
    step3: { tag: 'Step 3 · 深入生活細節', title: '換油指南 (O) 與喝水原則 (W)', desc: '用脂肪酸比例與發煙點挑對家中兩罐油、算對每日水分。', href: '#O' },
    extraLinks: [
      { label: '蛋白質怎麼分散吃', href: '#learn/eat/L-EAT-02' },
      { label: '醣、糖與膳食纖維', href: '#learn/eat/L-EAT-03' },
      { label: '特別營養品與補給品', href: '#supplements' },
    ],
  },
  {
    id: 'supplements',
    label: '想查胺基酸・肌酸・維他命・纖維素',
    shortLabel: '特別營養品・補給品',
    icon: Pill,
    summary: '市面保健品琳瑯滿目？直接依 RCT 實證強度分級，先比對原型食物，再檢查處方藥交互作用。',
    evidenceTip: '營養補給講究「三要素」：真實人體 RCT 證據、正確化學吸收型態（如甘胺酸鎂、一水肌酸、rTG 魚油）與安全上限。',
    step1: { tag: 'Step 1 · 蛋白與肌酸', title: '胺基酸(蛋白質)與一水肌酸實證', desc: '看懂乳清、完整 EAA vs BCAA，以及肌酸對肌力與大腦的 600+ 篇研究。', href: '#supplements/AMINO_PROTEIN' },
    step2: { tag: 'Step 2 · 維他命與纖維', title: '維他命 D3/B12/C 與水溶性纖維', desc: '掌握缺口檢驗門檻（25(OH)D、Ferritin）與洋車前子／PHGG 挑法。', href: '#supplements/VITAMINS_MINERALS' },
    step3: { tag: 'Step 3 · 用藥安全防火牆', title: '40 項總表＋9 大處方藥交互檢查', desc: 'Warfarin、Statin、甲狀腺素、Metformin、CKD 必看禁忌。', href: '#supplements' },
    extraLinks: [
      { label: '肌酸與運動體能清單', href: '#supplements/PERFORMANCE_ENERGY' },
      { label: '膳食纖維與益生元清單', href: '#supplements/FIBER_PREBIOTICS' },
      { label: '用藥安全小課', href: '#learn/basics/L-BAS-06' },
    ],
  },
  {
    id: 'fitness',
    label: '想增肌減脂・開始運動重訓',
    shortLabel: '增肌減脂・運動',
    icon: Dumbbell,
    summary: '不管從零開始走路，還是想練出防老肌力、了解 GLP-1 減重藥保肌策略，這裡都有循序課表。',
    evidenceTip: '減重期間若沒搭配每週 2 次阻力訓練與 1.2–1.6 g/kg 蛋白質，約四分之一減掉的體重可能來自寶貴骨骼肌。',
    step1: { tag: 'Step 1 · 強度入門', title: '每週 150 分鐘與肌力肌耐力差別', desc: '用說話測試抓有氧強度，從提菜爬樓梯認識最大肌力。', href: '#learn/move/L-MOVE-08' },
    step2: { tag: 'Step 2 · 專項訓練', title: '肌力與肌耐力知識全圖＋8 種運動', desc: '跑步、單車、登山、重訓、伸展、羽球、桌球、匹克球一次到位。', href: '#exercise/strength' },
    step3: { tag: 'Step 3 · 體態與營養配合', title: '增肌減脂專區與蛋白質/肌酸補給', desc: '掌握熱量赤字保肌、猛健樂實證與運動營養補給。', href: '#obesity' },
    extraLinks: [
      { label: '4 週健康啟動計畫', href: '#start' },
      { label: '跑步配速與傷害預防', href: '#exercise/running' },
      { label: '一水肌酸與乳清實證', href: '#supplements/PERFORMANCE_ENERGY' },
    ],
  },
  {
    id: 'checkup',
    label: '剛拿到健檢報告・控三高',
    shortLabel: '健檢紅字・三高',
    icon: ClipboardList,
    summary: '先別被紅字嚇到！輸入數字看風險區間、學會正確 722 居家血壓量測，並準備看診問題。',
    evidenceTip: '單次診間血壓常受白袍緊張影響；連續 7 天早晚各量 2 遍的「722 原則」與 ApoB／LDL 趨勢更具臨床意義。',
    step1: { tag: 'Step 1 · 數字快查', title: '健檢報告快查與公費癌篩資格', desc: '輸入血壓、血糖、HbA1c、LDL、eGFR 與腰圍立即解讀分級。', href: '#checkup' },
    step2: { tag: 'Step 2 · 三高整合', title: '血壓・血糖・血脂完整指引', desc: '整合 DASH／地中海飲食、餐後散步 10 分鐘與藥物追蹤原則。', href: '#cardiometabolic/THREE_HIGHS' },
    step3: { tag: 'Step 3 · 脂肪肝與血管', title: '代謝性脂肪肝 (MASLD) 與纖維降脂', desc: '用 FIB-4 評估肝纖維化，並搭配洋車前子與 Omega-3 實證。', href: '#gastro/MASLD_FATTY' },
    extraLinks: [
      { label: '代謝症候群入門課', href: '#learn/prevent/L-PRE-01' },
      { label: '居家血壓 722 專頁', href: '#cardiometabolic/BP_722' },
      { label: 'B 型肝炎報告解讀', href: '#hepb/TESTS' },
    ],
  },
  {
    id: 'sleep',
    label: '睡不好・常疲倦・壓力大',
    shortLabel: '睡眠・壓力修復',
    icon: Moon,
    summary: '失眠超過 3 個月時，國際指引第一線不是安眠藥，而是失眠認知行為治療 (CBT-I) 與晝夜節律校時。',
    evidenceTip: '晨起接觸 10 分鐘戶外自然光＋下午抓對咖啡因截止線＋延長吐氣呼吸法，多數人 2 週內即有感改善精神。',
    step1: { tag: 'Step 1 · 找出卡點', title: '睡多久才夠？時數與規律並重', desc: '從起床固定時間、咖啡因半衰期與打呼線索盤點睡眠債。', href: '#learn/rest/L-REST-01' },
    step2: { tag: 'Step 2 · 工具與全圖', title: '睡眠與修復專區＋知識點全圖', desc: '動手算咖啡因代謝曲線、CBT-I 睡眠效率與 OSA 打呼快篩。', href: '#sleep' },
    step3: { tag: 'Step 3 · 放鬆與補給輔助', title: '呼吸練習・身心課程與甘胺酸鎂', desc: '學會生理性嘆氣、吐納正念，並看懂鎂／甘胺酸／褪黑激素實證。', href: '#mindbody' },
    extraLinks: [
      { label: '壓力與情緒呼吸法', href: '#mental' },
      { label: '神經放鬆與睡眠補給實證', href: '#supplements/COGNITIVE_SLEEP' },
      { label: '認識人體八大系統', href: '#systems' },
    ],
  },
  {
    id: 'care',
    label: '不舒服想看對科別・照顧長輩',
    shortLabel: '症狀就醫・家人照護',
    icon: Stethoscope,
    summary: '手麻腰痛、胃食道逆流或幫爸媽規劃抗老長照？從症狀反查正確科別，並學會判斷急診紅旗。',
    evidenceTip: '就醫前整理好「發作時間、誘發因素、目前用藥與保健品清單」，能讓門診溝通效率翻倍並避免重複開藥。',
    step1: { tag: 'Step 1 · 症狀導航', title: '不舒服該看哪一科？（10 部 50 科）', desc: '依身體部位與症狀快速對照門診科別與就醫前準備問題。', href: '#clinic/by/symptom' },
    step2: { tag: 'Step 2 · 高發專科', title: '脊椎手腳麻・腸胃肝膽・癌症篩檢', desc: '深入讀懂骨刺坐骨神經、胃逆流大腸鏡與台灣公費六癌篩檢。', href: '#spine' },
    step3: { tag: 'Step 3 · 高齡與長照', title: '長照 1966 補助與健康老化科學', desc: '涵蓋巴氏量表試算、長照四包錢、肌少症防跌與骨鬆營養。', href: '#ltc' },
    extraLinks: [
      { label: '腸胃與肝膽專區', href: '#gastro' },
      { label: '癌症篩檢與治療', href: '#oncology' },
      { label: '健康老化知識全圖', href: '#longevity/ATLAS' },
    ],
  },
];

const QUICK_QUESTION_CHIPS = [
  { label: '外食便當怎麼配', query: '便當' },
  { label: '蛋白質與胺基酸', query: '乳清蛋白' },
  { label: '一水肌酸實證', query: '肌酸' },
  { label: '維他命 D3 與 B12', query: '維生素' },
  { label: '纖維素與洋車前子', query: '洋車前子' },
  { label: '血壓偏高怎麼量', query: '血壓' },
  { label: '健檢 LDL 紅字', query: 'LDL' },
  { label: '睡不好・半夜醒', query: '失眠' },
];

function guideFromHash(): HeroGuide {
  return guides.find(guide => window.location.hash === '#home/read/' + guide.id) ?? guides[0];
}

const lessonIds = ALL_LESSONS.filter(lesson => lesson.quiz).map(lesson => lesson.id);
const featuredEvidence = ['UPD-2026-DGA', 'UPD-2026-ACSM-RT', 'UPD-2025-STEPS']
  .map(getUpdate)
  .filter(update => update !== undefined);
const CHALLENGE_LESSONS = ['L-EAT-01', 'L-EAT-02', 'L-EAT-04', 'L-MOVE-01', 'L-REST-01', 'L-PRE-01', 'L-BODY-01', 'L-CHK-01', 'L-MOVE-08']
  .map(findLesson)
  .flatMap(lesson => lesson?.quiz ? [{ ...lesson, quiz: lesson.quiz }] : []);
const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-400';

const CATEGORY_COUNTS: Record<DiscoveryCategory, number> = {
  all: DISCOVERY_TOPICS.length,
  daily: DISCOVERY_TOPICS.filter(t => t.category === 'daily').length,
  prevention: DISCOVERY_TOPICS.filter(t => t.category === 'prevention').length,
  care: DISCOVERY_TOPICS.filter(t => t.category === 'care').length,
  body: DISCOVERY_TOPICS.filter(t => t.category === 'body').length,
};

export function LearnHome() {
  const { openModal, openSearch } = useModal();
  const { progress } = useLearningProgress();
  const { plan } = useActionPlan();
  const [guide, setGuide] = useState<HeroGuide>(guideFromHash);
  const lastLesson = progress.last ? findLesson(progress.last.lessonId) : undefined;
  const lastTrack = lastLesson ? getTrack(lastLesson.track_id) : undefined;
  const lastDone = lastLesson ? progress.completed.includes(lastLesson.id) : false;
  const nextLesson = lastDone && lastTrack ? lastTrack.lessons.find(lesson => !progress.completed.includes(lesson.id)) : undefined;
  const resumeLesson = nextLesson ?? lastLesson;
  const completedCount = progress.completed.filter(id => ALL_LESSONS.some(l => l.id === id)).length;
  const dueCount = getDueLessonIds(lessonIds, progress).length;

  useEffect(() => {
    let frame: number | undefined;
    const moveToSection = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      setGuide(guideFromHash());
      if (window.location.hash === '#home' || window.location.hash === '') {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      const targets: Record<string, string> = { '#home/plan': 'my-plan', '#home/topics': 'topics-title' };
      const id = targets[window.location.hash];
      if (!id) return;
      frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        target?.scrollIntoView({ block: 'start' });
        target?.focus({ preventScroll: true });
      });
    };
    moveToSection();
    window.addEventListener('hashchange', moveToSection);
    return () => {
      window.removeEventListener('hashchange', moveToSection);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="discovery-home editorial-home">
      {/* ── ① FIRST-SCREEN HERO: HEALTHY DIET FIRST ── */}
      <section className="reading-edition" aria-labelledby="home-title">
        <div className="edition-masthead">
          <div>
            <h1 id="home-title">健康飲食與生活醫學課</h1>
            <p className="edition-subline">首頁優先從健康飲食開始 · 免費・無廣告・依 2024–2026 實證指引與台灣衛教來源編寫</p>
          </div>
          <nav aria-label="切換首頁主題視角" className="edition-choices">
            {guides.map(item => (
              <a
                key={item.id}
                href={'#home/read/' + item.id}
                onClick={(e) => {
                  e.preventDefault();
                  setGuide(item);
                  window.history.replaceState(null, '', '#home/read/' + item.id);
                }}
                aria-current={guide.id === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="editorial-hero">
          <div className="editorial-hero-copy">
            <p className="edition-meta">
              <Utensils size={16} aria-hidden="true" />
              <span>{guide.badge}</span>
              <span aria-hidden="true">·</span>
              <Clock size={14} aria-hidden="true" />
              <span>{guide.durationText}</span>
            </p>
            <h2 aria-live="polite">{guide.title}</h2>
            <p className="editorial-hero-lead">{guide.intro}</p>
            <div className="editorial-hero-actions">
              <a className="editorial-primary" href={guide.primaryHref}>
                <span>{guide.primaryLabel}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="editorial-hero-link" href={guide.secondaryHref}>{guide.secondaryLabel}</a>
            </div>
            <div className="editorial-hero-pills" aria-label={`${guide.label}快速入口`}>
              {guide.quickLinks.map((ql) => (
                <a key={ql.href + ql.label} href={ql.href} className="editorial-hero-pill">
                  {ql.label}
                </a>
              ))}
            </div>
          </div>
          <img
            className="editorial-hero-photo"
            src={import.meta.env.BASE_URL + guide.photo}
            alt={guide.photoAlt}
            width={1000}
            height={750}
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Adaptive Learning Pulse: returning progress vs. zero-pressure beginner guide */}
      {((resumeLesson && lastTrack) || dueCount > 0) ? (
        <section className="editorial-resume" aria-label="我的學習">
          {resumeLesson && lastTrack && (
            <div className="editorial-resume-lesson">
              <TrackIcon icon={lastTrack.icon} tone={lastTrack.tone} size="sm" />
              <div className="min-w-0">
                <p className="editorial-kicker">
                  {nextLesson ? '接著讀' : lastDone ? '回顧上次的小課' : '繼續上次學習'}
                  {completedCount > 0 && <span className="ml-2 font-mono font-semibold opacity-75">· 已完成 {completedCount}/{ALL_LESSONS.length} 課</span>}
                </p>
                <a href={'#learn/' + lastTrack.id + '/' + resumeLesson.id} className="editorial-inline-link">{resumeLesson.title_zh}</a>
              </div>
            </div>
          )}
          {dueCount > 0 && (
            <a className="editorial-review-pill" href="#learn/mastery/recall">
              <RotateCcw size={16} aria-hidden="true" />
              <span>複習 {dueCount} 堂小課</span>
            </a>
          )}
        </section>
      ) : (
        <section className="editorial-welcome-strip" aria-label="第一次來的三步驟引導">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-200 shrink-0">
            <Compass size={18} className="text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>第一次來？照自己的興趣挑一步開始：</span>
          </div>
          <ol className="editorial-welcome-steps">
            <li><a href="#diet"><strong>1. 先看健康飲食與餐盤</strong></a></li>
            <li><a href="#supplements"><strong>2. 查胺基酸／肌酸／維他命／纖維實證</strong></a></li>
            <li>
              <button
                type="button"
                onClick={() => document.getElementById('wayfinder-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center min-h-9 font-bold text-emerald-800 dark:text-emerald-300 hover:underline underline-offset-4"
              >
                3. 用 3 秒目標引導找主題
              </button>
            </li>
          </ol>
        </section>
      )}

      {/* ── ② HEALTHY DIET × SPECIAL SUPPLEMENTS SPOTLIGHT (FIRST MODULE) ── */}
      <section className="editorial-diet-spotlight" aria-labelledby="diet-spotlight-title">
        <SectionHeading
          id="diet-spotlight-title"
          title="健康飲食核心專區：從三餐原型食物出發"
          description="先把每天吃進肚子的碳水、蛋白質、好油、蔬果纖維與喝水顧好，再依需求評估特別營養補給品。"
          action={<a href="#diet" className="editorial-inline-link">進入完整健康飲食專區<ArrowRight size={15} aria-hidden="true" /></a>}
        />
        <ul className="editorial-entry-grid">
          {DIET_CORE_CARDS.map(({ href, title, desc, badge, icon: Icon, tone }) => (
            <li key={href}>
              <a href={href} className="editorial-entry">
                <span className={`editorial-entry-medallion ${tone}`} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.9} />
                </span>
                <span className="min-w-0">
                  <span className="inline-block mb-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                    {badge}
                  </span>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Special Supplements & Ergogenic Evidence Showcase */}
        <div className="editorial-supplements-panel" aria-labelledby="supplements-spotlight-title">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div className="space-y-1">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-emerald-800 dark:text-emerald-300">
                <Pill size={14} aria-hidden="true" />
                <span>特別營養品・科學補給品實證庫（共 {SUPPLEMENT_COUNT} 項成分）</span>
              </p>
              <h3 id="supplements-spotlight-title" className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white">
                胺基酸(蛋白質)・肌酸・維他命・纖維素：只揭露科學驗證有效資訊
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                每項成分均附人體 RCT／統合分析引用、實證有效劑量、吸收型態、原型食物對照，並內建 9 大處方藥交互作用檢查。
              </p>
            </div>
            <a href="#supplements" className="editorial-primary shrink-0">
              <span>查看全部 {SUPPLEMENT_COUNT} 項實證與用藥禁忌</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

          <ul className="editorial-supp-grid">
            {SUPPLEMENT_SPOTLIGHT_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.href}>
                  <a href={p.href} className="editorial-supp-card">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0 ${p.accent}`} aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <strong className="text-[0.98rem] text-slate-900 dark:text-white">{p.title}</strong>
                    </div>
                    <p className="text-xs font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed">
                      {p.compounds}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {p.evidence}
                    </p>
                    <span className="mt-auto pt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <span>看臨床研究與劑量</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── ③ RPDCA INTERACTIVE 3-STEP TOPIC WAYFINDER ── */}
      <GuidedTopicFinder />

      {/* ── ④ INSTANT QUESTION SEARCH FUNNEL ── */}
      <section className="editorial-ask-band" aria-labelledby="ask-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="ask-title" className="text-base font-bold text-slate-900 dark:text-white shrink-0">
            有特定關鍵字？直接搜全站知識庫
          </h2>
          <button
            type="button"
            onClick={() => openSearch('')}
            className={`editorial-search-trigger ${focusClass}`}
            aria-label="搜尋健康問題、飲食、補給品、症狀或健檢數值"
          >
            <Search size={17} aria-hidden="true" />
            <span>搜尋食物、補給品、症狀或數值（例如：肌酸、乳清蛋白、洋車前子、LDL、血壓 722…）</span>
          </button>
        </div>
        <div className="editorial-chip-row" aria-label="熱門常查健康與補給品問題">
          {QUICK_QUESTION_CHIPS.map(chip => (
            <button
              key={chip.query}
              type="button"
              onClick={() => openSearch(chip.query)}
              className={`editorial-question-chip ${focusClass}`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── ⑤ GUIDED 8 LEARNING TRACKS ── */}
      <section aria-labelledby="tracks-preview-title">
        <SectionHeading
          id="tracks-preview-title"
          title="由淺入深：8 條系統化白話學習路徑"
          description={`共 ${ALL_LESSONS.length} 堂 5–8 分鐘白話小課，每課附重點、生活比喻、行動步驟、小測驗與實證來源。`}
          action={<a href="#learn" className="editorial-inline-link">查看全部路徑與課表<ArrowRight size={15} aria-hidden="true" /></a>}
        />
        <ul className="editorial-track-grid">
          {LEARNING_TRACKS.map(track => {
            const trackDone = track.lessons.filter(l => progress.completed.includes(l.id)).length;
            const pct = track.lessons.length > 0 ? Math.round((trackDone / track.lessons.length) * 100) : 0;
            const totalMin = track.lessons.reduce((s, l) => s + l.minutes, 0);
            const isEat = track.id === 'eat';
            return (
              <li key={track.id}>
                <a href={`#learn/${track.id}`} className={`editorial-track-card ${isEat ? 'editorial-track-featured' : ''}`}>
                  <div className="flex items-start gap-3">
                    <TrackIcon icon={track.icon} tone={track.tone} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong className="text-[0.98rem] text-slate-900 dark:text-white leading-snug">{track.title_zh}</strong>
                        {isEat && (
                          <span className="rounded-full bg-emerald-700 text-white dark:bg-emerald-400 dark:text-emerald-950 px-2 py-0.5 text-[10px] font-bold">
                            首選推薦
                          </span>
                        )}
                      </div>
                      <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        {track.lessons.length} 課 · 約 {totalMin} 分鐘
                        {trackDone > 0 && ` · 已完成 ${trackDone}`}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs leading-6 text-slate-600 dark:text-slate-300 line-clamp-2">{track.subtitle_zh}</p>
                  <ProgressBar value={pct} tone={track.tone} label={`${track.title_zh}進度`} />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── ⑥ 24 TOPIC DIRECTORY WITH LIVE FILTER ── */}
      <TopicDirectory />

      {/* ── ⑦ PRACTICE, MASTERY & HEALTH COMPASS ── */}
      <section aria-labelledby="practice-title">
        <SectionHeading id="practice-title" title="讀完，邊玩邊記住" description="透過隨堂小測驗、生活案例拆解與間隔複習，把健康飲食與醫學觀念真正融會貫通。" />
        <div className="editorial-practice-grid">
          <LearningChallenge />
          <div className="editorial-practice-links">
            <a href="#learn/mastery" className="editorial-entry editorial-entry-featured">
              <span className="editorial-entry-medallion bg-emerald-700 text-white dark:bg-emerald-400 dark:text-emerald-950" aria-hidden="true">
                <Sparkles size={20} />
              </span>
              <span>
                <strong className="flex flex-wrap items-center gap-2">
                  <span>健康學習工作坊</span>
                  {dueCount > 0 && (
                    <span className="rounded-full bg-amber-100 dark:bg-amber-900/70 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:text-amber-200">
                      {dueCount} 待複習
                    </span>
                  )}
                </strong>
                <span>看範例拆解、跨主題間隔回憶、串聯觀念與費曼筆記</span>
              </span>
            </a>
            <a href="#learn/practice" className="editorial-entry"><CircleHelp size={22} aria-hidden="true" /><span><strong>情境練習與閃卡</strong><span>12 個真實生活與臨床案例＋迷思是非快閃</span></span></a>
            <a href="#learn/academy" className="editorial-entry"><GraduationCap size={22} aria-hidden="true" /><span><strong>認識 8 大醫學學科</strong><span>從生理、生化、運動力學到怎麼讀懂研究</span></span></a>
            <a href="#start" className="editorial-entry"><Activity size={22} aria-hidden="true" /><span><strong>4 週健康啟動計畫</strong><span>每週挑一件做得到的小事，建立飲食與作息節奏</span></span></a>
            <Expandable label="30 秒身心探索羅盤（依生活困擾抽卡片）"><HealthCompassWidget /></Expandable>
          </div>
        </div>
      </section>

      <section id="my-plan" tabIndex={-1} className="scroll-mt-24 space-y-4">
        {plan.items.length > 0 ? (
          <Suspense fallback={<p role="status">載入行動計畫…</p>}><ActionPlanPanel /></Suspense>
        ) : <Suspense fallback={null}><QuickTips sectionKey="home" /></Suspense>}
        <Expandable label="專題：體重、血壓、血糖與血脂"><MetabolicJourney /></Expandable>
      </section>

      <section aria-labelledby="evidence-title">
        <SectionHeading id="evidence-title" title="一起讀懂最新健康研究" description="每篇摘要說明發現了什麼、適合誰、有哪些限制，並附原始出處。"
          action={<a href="#updates" className="editorial-inline-link">查看全部實證摘要<ArrowRight size={15} aria-hidden="true" /></a>} />
        <ul className="editorial-evidence-list">
          {featuredEvidence.map(update => (
            <li key={update.id}>
              <a href={'#updates/' + update.id}>
                <span className="editorial-evidence-meta">
                  {UPDATE_CATEGORY_META[update.category].label_zh}
                  <time dateTime={update.date}>{formatYM(update.date)}</time>
                  <span className="editorial-evidence-org">{update.org}</span>
                </span>
                <span>
                  <strong>{update.title_zh}</strong>
                  <span className="editorial-evidence-summary">{update.what_it_means_zh}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tool-title">
        <SectionHeading id="tool-title" title="閱讀與照護工具" />
        <ul className="editorial-entry-grid editorial-utility-grid">
          <li><a href="#glossary" className="editorial-entry"><BookOpen size={20} aria-hidden="true" /><span><strong>健康小辭典</strong><span>用白話查名詞與易混淆縮寫</span></span></a></li>
          <li><button type="button" onClick={() => openModal('simulators')} className="editorial-entry"><Calculator size={20} aria-hidden="true" /><span><strong>18+ 互動試算工具</strong><span>動手換算水合、血壓、咖啡因與飲食</span></span></button></li>
          <li><button type="button" onClick={() => openModal('backpack')} className="editorial-entry"><Bookmark size={20} aria-hidden="true" /><span><strong>我的收藏與計畫</strong><span>接續這台裝置的學習紀錄</span></span></button></li>
          <li><a href="#about" className="editorial-entry"><ShieldCheck size={20} aria-hidden="true" /><span><strong>內容與實證原則</strong><span>了解資料來源與審閱標準</span></span></a></li>
        </ul>
      </section>

    </div>
  );
}

function GuidedTopicFinder() {
  const [selectedId, setSelectedId] = useState<string>(INTENT_PATHS[0].id);
  const current = INTENT_PATHS.find((item) => item.id === selectedId) ?? INTENT_PATHS[0];

  return (
    <section className="editorial-wayfinder" aria-labelledby="wayfinder-title">
      <div className="editorial-section-heading">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
            <Compass size={14} aria-hidden="true" />
            <span>3 秒主題導覽・不再迷失於海量文章</span>
          </p>
          <h2 id="wayfinder-title">你現在最想先解決哪件事？</h2>
          <p>點選一個貼近你現況的目標，立即為你排好「入門 → 深入 → 延伸」的 3 步閱讀動線。</p>
        </div>
        <a href="#home/topics" className="editorial-inline-link">
          直接看全部 24 專區
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>

      {/* Intent Tabs */}
      <div className="editorial-wayfinder-tabs" role="tablist" aria-label="選擇你感興趣的健康主題目標">
        {INTENT_PATHS.map((item) => {
          const Icon = item.icon;
          const active = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`wayfinder-panel-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className={`editorial-wayfinder-tab ${focusClass}`}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{item.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Guided 3-Step Stage */}
      <div
        id={`wayfinder-panel-${current.id}`}
        role="tabpanel"
        className="editorial-wayfinder-stage"
      >
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
            {current.label}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{current.summary}</p>
        </div>

        <ol className="editorial-wayfinder-steps">
          {[current.step1, current.step2, current.step3].map((step) => (
            <li key={step.href + step.tag}>
              <a href={step.href} className="editorial-wayfinder-step-card">
                <span className="editorial-wayfinder-step-tag">{step.tag}</span>
                <strong className="text-[0.95rem] text-slate-900 dark:text-white leading-snug">{step.title}</strong>
                <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</span>
                <span className="mt-auto pt-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span>立即前往</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="editorial-wayfinder-footer">
          <p className="text-xs sm:text-[0.82rem] text-emerald-950 dark:text-emerald-200 leading-relaxed">
            <strong>實證提醒：</strong>
            {current.evidenceTip}
          </p>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {current.extraLinks.map((lnk) => (
              <a
                key={lnk.href + lnk.label}
                href={lnk.href}
                className="inline-flex min-h-9 items-center gap-1 rounded-full border border-emerald-300/90 dark:border-emerald-800 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-semibold text-emerald-900 dark:text-emerald-200 hover:border-emerald-600 transition-colors"
              >
                <span>{lnk.label}</span>
                <ArrowRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ id, title, description, action }: { id: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="editorial-section-heading">
      <div>
        <h2 id={id} tabIndex={id === 'topics-title' ? -1 : undefined}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function TopicDirectory() {
  const [category, setCategory] = useState<DiscoveryCategory>('all');
  const [expanded, setExpanded] = useState(false);
  const [filterText, setFilterText] = useState('');
  const directory = filterDiscoveryTopics(category, expanded, filterText);

  return (
    <section className="editorial-directory" aria-labelledby="topics-title">
      <SectionHeading
        id="topics-title"
        title="探索 24 大健康專區"
        action={<a href="#learn" className="editorial-inline-link">全部 {ALL_LESSONS.length} 堂小課</a>}
        description="從健康飲食、特別營養品、運動睡眠，一路讀到健檢紅字、人體圖解與專科照護。"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div role="group" aria-label="健康主題分類" className="editorial-filters !mb-0">
          {DISCOVERY_CATEGORIES.map(item => (
            <button key={item.id} type="button" aria-pressed={category === item.id} aria-controls="discovery-results"
              onClick={() => { setCategory(item.id); setExpanded(false); }}>
              <span>{item.label}</span>
              <span className="ml-1.5 text-xs opacity-75 tabular-nums">{CATEGORY_COUNTS[item.id]}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="快篩專區（如：飲食、補給、失眠…）"
            aria-label="以關鍵字快篩 24 大健康專區"
            className="w-full min-h-11 pl-9 pr-8 py-2 rounded-full border border-slate-300/90 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
          />
          {filterText && (
            <button
              type="button"
              onClick={() => setFilterText('')}
              aria-label="清除專區篩選"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" role="status">共 {directory.total} 個主題，目前顯示 {directory.topics.length} 個</p>
      {directory.topics.length === 0 ? (
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-300">找不到符合「{filterText}」的專區名稱，可清除篩選或用上方全站搜尋。</p>
          <button type="button" onClick={() => { setFilterText(''); setCategory('all'); }} className="editorial-inline-link">
            顯示全部專區
          </button>
        </div>
      ) : (
        <ul id="discovery-results" className="editorial-topic-grid">
          {directory.topics.map(topic => (
            <li key={topic.id}>
              <a href={'#' + topic.hash} className="editorial-entry">
                <TrackIcon icon={topic.icon} tone={topic.tone} size="sm" />
                <span><strong>{topic.title}</strong><span>{topic.description}</span></span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {!filterText && (directory.topics.length < directory.total || expanded) && (
        <button type="button" className="editorial-inline-link mt-3" aria-expanded={expanded} aria-controls="discovery-results"
          onClick={() => setExpanded(!expanded)}>
          <LibraryBig size={18} aria-hidden="true" />{expanded ? '收合主題' : '展開全部 ' + directory.total + ' 個主題'}
        </button>
      )}
    </section>
  );
}

function Expandable({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details className="editorial-expandable" onToggle={event => setOpen(event.currentTarget.open)}>
      <summary>{label}<ChevronDown size={18} aria-hidden="true" /></summary>
      {open && <div className="pt-4"><Suspense fallback={<p role="status">載入中…</p>}>{children}</Suspense></div>}
    </details>
  );
}

function LearningChallenge() {
  const { recordRecall } = useLearningProgress();
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correctIds, setCorrectIds] = useState<string[]>([]);
  const [scheduledId, setScheduledId] = useState<string | null>(null);

  const currentLesson = CHALLENGE_LESSONS[questionIdx];
  if (!currentLesson) return null;
  const currentTrack = getTrack(currentLesson.track_id);
  const quiz = currentLesson.quiz;

  const handleSelectOption = (idx: number) => {
    setAnswer(idx);
    if (idx === quiz.answer && !correctIds.includes(currentLesson.id)) {
      setCorrectIds((prev) => [...prev, currentLesson.id]);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#047857', '#10B981', '#F59E0B'],
        });
      }).catch(() => { /* Quiz feedback remains available without animation. */ });
    }
  };

  const handleJump = (nextIdx: number) => {
    setAnswer(null);
    setScheduledId(null);
    setQuestionIdx(nextIdx);
  };

  const handleNextQuestion = () => handleJump((questionIdx + 1) % CHALLENGE_LESSONS.length);

  return (
    <section className="discovery-card p-6 sm:p-7" aria-labelledby="challenge-title">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="discovery-eyebrow flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          隨堂練習
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
          {currentTrack && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {currentTrack.title_zh}
            </span>
          )}
          <span className="font-mono">
            第 {questionIdx + 1} / {CHALLENGE_LESSONS.length} 題
          </span>
          {correctIds.length > 0 && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              答對 {correctIds.length} 題
            </span>
          )}
        </div>
      </div>

      {/* Mini progress dots */}
      <div className="mt-3 flex items-center gap-1.5" aria-label="隨堂練習題目進度">
        {CHALLENGE_LESSONS.map((l, i) => {
          const isCur = i === questionIdx;
          const isHit = correctIds.includes(l.id);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => handleJump(i)}
              aria-label={`跳至第 ${i + 1} 題${isHit ? '（已答對）' : ''}`}
              aria-current={isCur ? 'step' : undefined}
              className={`h-2 rounded-full transition-all ${
                isCur
                  ? 'w-7 bg-emerald-700 dark:bg-emerald-400'
                  : isHit
                  ? 'w-2.5 bg-emerald-400 dark:bg-emerald-600'
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600'
              }`}
            />
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <h2 id="challenge-title" className="text-xl font-bold text-slate-900 dark:text-white">
          用一個問題，測試飲食與健康觀念
        </h2>
        <button
          type="button"
          onClick={handleNextQuestion}
          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40 ${focusClass}`}
        >
          <span>換一題</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-3 text-base font-medium leading-8 text-slate-800 dark:text-slate-100">
        {quiz.question_zh}
      </p>

      <div className="mt-4 grid gap-2" role="group" aria-label={quiz.question_zh}>
        {quiz.options_zh.map((option, i) => {
          const picked = answer === i;
          const isRight = i === quiz.answer;
          const revealed = answer !== null;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={picked}
              onClick={() => handleSelectOption(i)}
              className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${focusClass} ${
                revealed && isRight
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold dark:border-emerald-400 dark:bg-emerald-950/70 dark:text-emerald-100'
                  : picked && !isRight
                  ? 'border-rose-400 bg-rose-50 text-rose-950 dark:border-rose-500 dark:bg-rose-950/40 dark:text-rose-100'
                  : 'border-slate-200 text-slate-700 hover:border-emerald-500 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
              {revealed && isRight && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {answer !== null && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/70 bg-emerald-50/90 p-4 text-sm leading-7 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-100"
        >
          <p className="font-semibold">
            {answer === quiz.answer ? '答對了！你已經掌握一個實用觀念。' : '差一點！一起看看背後的原理。'}
          </p>
          <p className="mt-1">
            正確答案：{quiz.options_zh[quiz.answer]}。{quiz.explain_zh}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <a
              href={`#learn/${currentLesson.track_id}/${currentLesson.id}`}
              className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4"
            >
              閱讀完整小課：{currentLesson.title_zh}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  recordRecall(currentLesson.id, answer === quiz.answer ? 'good' : 'again');
                  setScheduledId(currentLesson.id);
                }}
                className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-emerald-300/80 dark:border-emerald-700 bg-white/80 dark:bg-slate-900/60 px-2.5 py-1 text-xs font-semibold hover:border-emerald-600"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                {scheduledId === currentLesson.id ? '已排入複習！' : '加入間隔複習'}
              </button>
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex min-h-10 items-center gap-1 rounded-xl bg-emerald-800 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-900 dark:bg-emerald-400 dark:text-slate-950"
              >
                <span>下一題挑戰</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-400">
        小測驗只幫助理解，不評估體能或健康風險。
      </p>
    </section>
  );
}
