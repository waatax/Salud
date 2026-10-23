import type { SpineSource } from './spineData';
import type { KpMapGroup, KpNumber } from '../components/common/pro/Blocks';

/**
 * osteoData.ts — 骨質疏鬆章節 v5.1 知識點資料層
 *
 * The osteoporosis chapter is organised as 11 knowledge points (KP) in four stages:
 * 認識 → 評估 → 治療 → 生活與骨折後. Each KP has one sentence that answers it, the
 * key numbers, an explanation with its own figure, and what the reader can do.
 *
 * Evidence rules (v5.1 audit): every supplement claim carries a grade; mechanisms that
 * are plausible but unproven for fractures are graded C or lower; numbers come from
 * pivotal trials or guidelines listed in OSTEO_SOURCES.
 */

// ── Sources ───────────────────────────────────────────────────────────────────

export const OSTEO_SOURCES: Record<string, SpineSource> = {
  USPSTF2025: {
    id: 'USPSTF2025',
    label: 'US Preventive Services Task Force. 骨質疏鬆篩檢以預防骨折建議. JAMA 2025',
    url: 'https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/osteoporosis-screening',
  },
  ENDO2024D: {
    id: 'ENDO2024D',
    label: 'Demay MB, et al. Endocrine Society 2024 維生素 D 預防疾病臨床指引. J Clin Endocrinol Metab 2024;109:1907-47',
    url: 'https://doi.org/10.1210/clinem/dgae290',
  },
  KANIS2019: {
    id: 'KANIS2019',
    label: 'Kanis JA, et al. IOF/ESCEO 歐洲停經後骨質疏鬆診治指引. Osteoporos Int 2019;30:3-44',
    url: 'https://doi.org/10.1007/s00198-018-4704-5',
  },
  TOA2023: {
    id: 'TOA2023',
    label: '中華民國骨質疏鬆症學會 台灣成人骨質疏鬆症防治之共識及指引',
    url: 'https://www.toa1997.org.tw/',
  },
  BLACK2020: {
    id: 'BLACK2020',
    label: 'Black DM, et al. 雙磷酸鹽非典型股骨骨折風險 vs 骨折預防效益. N Engl J Med 2020;383:743-53',
    url: 'https://doi.org/10.1056/NEJMoa1916525',
  },
  ASBMR2016: {
    id: 'ASBMR2016',
    label: 'Adler RA, et al. ASBMR 雙磷酸鹽長期治療與藥物假期工作小組報告. J Bone Miner Res 2016;31:16-35',
    url: 'https://doi.org/10.1002/jbmr.2708',
  },
  ECTS2017: {
    id: 'ECTS2017',
    label: 'Tsourdi E, et al. Denosumab 停藥後骨流失與多發脊椎骨折：ECTS 立場聲明. Bone 2017;105:11-17',
    url: 'https://doi.org/10.1016/j.bone.2017.08.003',
  },
  FREEDOM2009: {
    id: 'FREEDOM2009',
    label: 'Cummings SR, et al. Denosumab 預防停經後骨鬆骨折 (FREEDOM). N Engl J Med 2009;361:756-65',
    url: 'https://doi.org/10.1056/NEJMoa0809493',
  },
  HORIZON2007: {
    id: 'HORIZON2007',
    label: 'Black DM, et al. 每年一次 Zoledronic acid 治療停經後骨鬆 (HORIZON). N Engl J Med 2007;356:1809-22',
    url: 'https://doi.org/10.1056/NEJMoa067312',
  },
  NEER2001: {
    id: 'NEER2001',
    label: 'Neer RM, et al. Teriparatide 對停經後骨鬆骨折與骨密度的效果. N Engl J Med 2001;344:1434-41',
    url: 'https://doi.org/10.1056/NEJM200105103441904',
  },
  ARCH2017: {
    id: 'ARCH2017',
    label: 'Saag KG, et al. Romosozumab 或 Alendronate 預防高風險女性骨折 (ARCH). N Engl J Med 2017;377:1417-27',
    url: 'https://doi.org/10.1056/NEJMoa1708322',
  },
  OSTA2001: {
    id: 'OSTA2001',
    label: 'Koh LK, et al. 亞洲人骨質疏鬆自我評估工具 OSTA. Osteoporos Int 2001;12:699-705',
    url: 'https://doi.org/10.1007/s001980170070',
  },
  VITAL2022: {
    id: 'VITAL2022',
    label: 'LeBoff MS, et al. 補充維生素 D3 與骨折 (VITAL). N Engl J Med 2022;387:299-309',
    url: 'https://doi.org/10.1056/NEJMoa2202106',
  },
  BOLLAND2015: {
    id: 'BOLLAND2015',
    label: 'Bolland MJ, et al. 鈣攝取與骨折風險：系統性回顧. BMJ 2015;351:h4580',
    url: 'https://doi.org/10.1136/bmj.h4580',
  },
  SANDERS2010: {
    id: 'SANDERS2010',
    label: 'Sanders KM, et al. 每年一次高劑量維生素 D 與長者跌倒骨折. JAMA 2010;303:1815-22',
    url: 'https://doi.org/10.1001/jama.2010.594',
  },
  SHERRINGTON2019: {
    id: 'SHERRINGTON2019',
    label: 'Sherrington C, et al. 運動預防社區長者跌倒 Cochrane 系統性回顧 2019',
    url: 'https://doi.org/10.1002/14651858.CD012424.pub2',
  },
  TOOFIT2014: {
    id: 'TOOFIT2014',
    label: 'Giangregorio LM, et al. Too Fit To Fracture：骨鬆與脊椎骨折者運動建議. Osteoporos Int 2014;25:821-35',
    url: 'https://doi.org/10.1007/s00198-013-2523-2',
  },
  HERNANDEZ2003: {
    id: 'HERNANDEZ2003',
    label: 'Hernandez CJ, et al. 峰值骨量、停經與老化對骨鬆發生年齡的影響模型. Osteoporos Int 2003;14:843-7',
    url: 'https://doi.org/10.1007/s00198-003-1454-8',
  },
  TW_DRI: {
    id: 'TW_DRI',
    label: '衛生福利部國民健康署 國人膳食營養素參考攝取量（第八版）與國民營養健康狀況變遷調查',
    url: 'https://www.hpa.gov.tw/',
  },
};

// ── Hero numbers ──────────────────────────────────────────────────────────────

export const OSTEO_KEY_NUMBERS: KpNumber[] = [
  { value: '1 / 3', label: '50 歲以上女性一生會發生骨鬆骨折（男性約 1 / 5）' },
  { value: '≤ -2.5', label: 'DXA T 值診斷骨質疏鬆' },
  { value: '2 年', label: '骨折後再骨折風險最高的「黃金治療期」' },
  { value: '40–70%', label: '有效藥物降低脊椎骨折的幅度' },
];

// ── Knowledge map ─────────────────────────────────────────────────────────────

export const OSTEO_KP_GROUPS: KpMapGroup[] = [
  {
    label: '認識骨頭',
    hint: '骨頭為什麼會變鬆',
    items: [
      { id: 'kp-remodel', title: '骨頭是活的：骨重塑循環', oneLine: '拆得比蓋得快，骨頭就變鬆' },
      { id: 'kp-peak', title: '骨本曲線：存骨要趁早', oneLine: '30 歲達峰值，停經後加速流失' },
    ],
  },
  {
    label: '評估風險',
    hint: '我有沒有骨鬆、嚴不嚴重',
    items: [
      { id: 'kp-risk', title: '誰該擔心：風險因子與 OSTA', oneLine: '一分鐘自評，決定要不要檢查' },
      { id: 'kp-dxa', title: '看懂報告：T 值、FRAX 與抽血', oneLine: '診斷、風險、找原因三件事' },
      { id: 'kp-tier', title: '風險分層：決定治療強度', oneLine: '高風險用藥，極高風險先長骨' },
    ],
  },
  {
    label: '治療用藥',
    hint: '藥怎麼選、怎麼接、怕不怕',
    items: [
      { id: 'kp-meds', title: '兩類藥：剎車與油門', oneLine: '抗吸收減少拆骨，促生成直接蓋骨' },
      { id: 'kp-sequence', title: '療程是接力賽', oneLine: '順序對、不中斷，效果才留得住' },
      { id: 'kp-safety', title: '副作用的真實比例', oneLine: '顎骨壞死與股骨骨折都很罕見' },
    ],
  },
  {
    label: '生活與骨折後',
    hint: '每天能做的事',
    items: [
      { id: 'kp-nutrition', title: '吃對：鈣、D、蛋白質', oneLine: '食物優先，補充劑只補差額' },
      { id: 'kp-exercise', title: '動對：阻力、衝擊、平衡', oneLine: '練肌力也練防跌' },
      { id: 'kp-after', title: '骨折後：把握再骨折黃金期', oneLine: '第一次骨折就是警報' },
    ],
  },
];

// ── KP1 Remodeling ────────────────────────────────────────────────────────────

export const REMODEL_PHASES = [
  { key: 'activate', label: '啟動', days: '數天', desc: '骨細胞感測到微裂或荷爾蒙訊號，發出 RANKL 召集蝕骨細胞。' },
  { key: 'resorb', label: '吸收（拆）', days: '約 2–4 週', desc: '蝕骨細胞分泌酸與酵素，挖出一個小坑。' },
  { key: 'reverse', label: '轉換', days: '約 1–2 週', desc: '清理坑底，召集造骨細胞進場。' },
  { key: 'form', label: '形成（蓋）', days: '約 3–4 個月', desc: '造骨細胞鋪上膠原蛋白，再逐步礦化成硬骨。' },
] as const;

export const REMODEL_SIGNALS = [
  { name: 'RANKL', role: '油門：促進蝕骨細胞生成與活化', drug: 'Denosumab 中和它' },
  { name: 'OPG', role: '天然煞車：攔截 RANKL；雌激素會增加 OPG', drug: '停經後 OPG 下降 → 拆骨加速' },
  { name: 'Sclerostin', role: '骨細胞分泌，抑制造骨（Wnt 路徑）', drug: 'Romosozumab 阻斷它' },
  { name: 'PTH', role: '間歇性升高促進造骨；持續升高則促進拆骨', drug: 'Teriparatide 以每日注射模擬間歇訊號' },
];

// ── KP2 Peak bone mass ────────────────────────────────────────────────────────

/** Illustrative relative bone mass (% of peak) by age; women vs men. */
export const BONE_MASS_CURVE: { age: number; women: number; men: number }[] = [
  { age: 0, women: 10, men: 10 },
  { age: 10, women: 40, men: 38 },
  { age: 15, women: 72, men: 65 },
  { age: 20, women: 92, men: 88 },
  { age: 30, women: 100, men: 100 },
  { age: 40, women: 98, men: 98 },
  { age: 50, women: 93, men: 95 },
  { age: 55, women: 82, men: 92 },
  { age: 60, women: 76, men: 89 },
  { age: 70, women: 68, men: 84 },
  { age: 80, women: 61, men: 78 },
  { age: 90, women: 55, men: 72 },
];

// ── KP3 Risk factors & OSTA ───────────────────────────────────────────────────

export const OSTEO_RISK_FACTORS: { group: string; items: string[]; changeable: boolean }[] = [
  { group: '無法改變', changeable: false, items: ['女性、停經（尤其 45 歲前提早停經）', '年齡 65 歲以上', '父母曾髖部骨折', '50 歲後曾輕微外力骨折', '亞洲或白種人、骨架瘦小'] },
  { group: '疾病與藥物', changeable: false, items: ['類固醇：每日 prednisolone ≥ 5 mg 連續 3 個月以上', '乳癌芳香環酶抑制劑、攝護腺癌雄性素阻斷治療', '類風濕關節炎、甲狀腺或副甲狀腺亢進', '糖尿病、慢性腎病、慢性肝病、腸胃吸收不良', '長期抗癲癇藥、過量甲狀腺素'] },
  { group: '可以改變', changeable: true, items: ['BMI < 18.5 或近期體重明顯下降', '抽菸', '每天飲酒 ≥ 3 個單位', '久坐少動、肌力差、容易跌倒', '鈣與蛋白質攝取不足、少曬太陽'] },
];

export type OstaBand = 'low' | 'mid' | 'high';

/** OSTA index = (weight kg − age) × 0.2, validated in post-menopausal Asian women. */
export function ostaIndex(weightKg: number, age: number): number {
  return Math.round((weightKg - age) * 0.2 * 10) / 10;
}

export function ostaBand(index: number): OstaBand {
  if (index < -4) return 'high';
  if (index <= -1) return 'mid';
  return 'low';
}

export const OSTA_META: Record<OstaBand, { label: string; tone: 'good' | 'warn' | 'bad'; advice: string }> = {
  low: { label: '低風險（> -1）', tone: 'good', advice: '維持運動與飲食；若有骨折史、長期類固醇等其他風險因子，仍請與醫師討論檢查時機。' },
  mid: { label: '中風險（-1 至 -4）', tone: 'warn', advice: '建議與醫師討論安排 DXA 骨密度檢查，並計算 FRAX。' },
  high: { label: '高風險（< -4）', tone: 'bad', advice: '骨質疏鬆機率高，建議盡快安排 DXA 骨密度檢查。' },
};

// ── KP4 Diagnosis & work-up ───────────────────────────────────────────────────

export const OSTEO_WHO_SCREEN = [
  { who: '65 歲以上女性', how: '建議做一次 DXA', note: 'USPSTF 2025、台灣指引一致' },
  { who: '停經後未滿 65 歲、有風險因子', how: '先用 OSTA 或 FRAX 篩選，再決定 DXA', note: '如低體重、提早停經、類固醇' },
  { who: '70 歲以上男性', how: '可考慮 DXA', note: '男性篩檢證據較少，依風險決定' },
  { who: '50 歲後曾輕微外力骨折', how: '不論年齡都應評估', note: '已骨折本身就是高風險' },
  { who: '身高比年輕時矮 ≥ 4 公分', how: '加照胸腰椎側面 X 光', note: '約 2/3 脊椎骨折沒有明顯症狀' },
];

export const OSTEO_REPORT_TERMS = [
  { term: 'T 值', meaning: '和 20–30 歲健康成人比，差幾個標準差', use: '停經後女性、50 歲以上男性用來診斷' },
  { term: 'Z 值', meaning: '和同年齡、同性別的人比', use: '停經前女性、50 歲以下男性與兒童；Z ≤ -2.0 代表「低於同齡預期」，要找次發性原因' },
  { term: 'FRAX', meaning: '10 年主要骨鬆骨折與髖部骨折機率', use: '骨質缺乏者決定是否用藥；有台灣版模型' },
  { term: '最低值部位', meaning: '腰椎、全髖、股骨頸三者取最低', use: '診斷以最低的 T 值為準，不是平均' },
];

export const OSTEO_WORKUP: { test: string; why: string; when: string }[] = [
  { test: '血鈣、磷、鹼性磷酸酶', why: '排除副甲狀腺疾病、軟骨症；低血鈣時不能打 Denosumab 或 Zoledronic acid', when: '初診必做' },
  { test: '腎功能（eGFR）', why: 'eGFR < 30–35 不宜使用雙磷酸鹽；Denosumab 在重度腎病易低血鈣', when: '初診必做' },
  { test: '25(OH) 維生素 D', why: '骨鬆患者先補足再用藥，降低低血鈣風險', when: '確診或準備用藥時' },
  { test: '甲狀腺（TSH）、肝功能、血球', why: '甲狀腺亢進、肝病、貧血都會加速骨流失', when: '初診建議' },
  { test: '副甲狀腺素（PTH）', why: '血鈣偏高或偏低時找原因', when: '血鈣異常時' },
  { test: '血清蛋白電泳', why: '排除多發性骨髓瘤造成的脊椎骨折', when: '不明原因脊椎骨折' },
  { test: '男性睪固酮', why: '男性骨鬆約一半有次發性原因', when: '男性骨鬆' },
];

// ── KP5 Risk tiers ────────────────────────────────────────────────────────────

export const OSTEO_RISK_TIERS: {
  key: 'low' | 'mid' | 'high' | 'veryhigh';
  label: string;
  criteria: string[];
  plan: string;
  drugs: string;
  recheck: string;
  tone: 'good' | 'warn' | 'bad' | 'neutral';
}[] = [
  {
    key: 'low',
    label: '低風險',
    criteria: ['T 值 ≥ -1.0', '沒有脆性骨折'],
    plan: '生活型態：鈣與蛋白質、阻力運動、戒菸限酒',
    drugs: '不需藥物',
    recheck: '依風險因子由醫師決定，通常數年後',
    tone: 'good',
  },
  {
    key: 'mid',
    label: '中風險（骨質缺乏）',
    criteria: ['T 值 -1.0 至 -2.5', 'FRAX 主要骨折 < 20% 且髖部 < 3%'],
    plan: '生活型態全面加強，處理可改變風險',
    drugs: '多數暫不用藥',
    recheck: '約 2 年複查 DXA',
    tone: 'neutral',
  },
  {
    key: 'high',
    label: '高風險',
    criteria: ['T 值 ≤ -2.5', '或 骨質缺乏 + FRAX 主要骨折 ≥ 20% 或髖部 ≥ 3%', '或 曾有髖部、脊椎脆性骨折'],
    plan: '開始藥物治療，同時防跌',
    drugs: '首選抗吸收：口服或靜脈雙磷酸鹽、Denosumab',
    recheck: '1–2 年複查 DXA',
    tone: 'warn',
  },
  {
    key: 'veryhigh',
    label: '極高風險',
    criteria: ['近 12 個月內骨折', '用藥中仍骨折、或多處骨折', 'T 值 ≤ -3.0', '跌倒風險高或長期類固醇', 'FRAX 主要骨折 > 30% 或髖部 > 4.5%'],
    plan: '盡快治療，優先「先長骨、再固守」',
    drugs: '先促生成：Romosozumab 或 Teriparatide，療程結束後接抗吸收藥',
    recheck: '1 年內追蹤',
    tone: 'bad',
  },
];

// ── KP6 Drug efficacy chart ───────────────────────────────────────────────────

/** Relative risk reduction (%) vs placebo in pivotal trials; hip null = not shown / not significant. */
export const OSTEO_DRUG_EFFICACY: { name: string; kind: 'anti' | 'ana'; vert: number; hip: number | null; trial: string }[] = [
  { name: 'Alendronate', kind: 'anti', vert: 47, hip: 51, trial: 'FIT（已有脊椎骨折者）' },
  { name: 'Zoledronic acid', kind: 'anti', vert: 70, hip: 41, trial: 'HORIZON 3 年' },
  { name: 'Denosumab', kind: 'anti', vert: 68, hip: 40, trial: 'FREEDOM 3 年' },
  { name: 'Raloxifene', kind: 'anti', vert: 40, hip: null, trial: 'MORE 3 年（30–50%）' },
  { name: 'Teriparatide', kind: 'ana', vert: 65, hip: null, trial: 'Neer 2001（非脊椎 -53%）' },
  { name: 'Romosozumab', kind: 'ana', vert: 73, hip: null, trial: 'FRAME 12 個月' },
];

// ── KP7 Sequencing ────────────────────────────────────────────────────────────

export const OSTEO_SEQUENCE_RULES: { title: string; body: string; tone: 'good' | 'warn' | 'bad' }[] = [
  { title: '極高風險：先長骨，再固守', body: 'Romosozumab 12 個月或 Teriparatide 最長 24 個月，結束後立刻接雙磷酸鹽或 Denosumab；ARCH 試驗中先用 Romosozumab 再接 Alendronate，比一路吃 Alendronate 少 48% 新脊椎骨折。', tone: 'good' },
  { title: '促生成藥一停就要接', body: '促生成藥長出的新骨若沒有抗吸收藥「鎖住」，會在一年內流失大半。', tone: 'warn' },
  { title: 'Denosumab 不能突然停', body: '最後一劑後超過 7 個月未續打，骨吸收會反彈，部分人發生多處脊椎骨折。要停藥須由醫師安排，通常在最後一劑後約 6 個月改打 Zoledronic acid 並追蹤。', tone: 'bad' },
  { title: '雙磷酸鹽可以「藥物假期」', body: '口服約 5 年、靜脈約 3 年後重新評估：風險已降低者可暫停 2–3 年（藥物會留在骨中持續作用）；仍屬高風險者繼續治療。', tone: 'good' },
];

// ── KP8 Benefit vs harm ───────────────────────────────────────────────────────

export const OSTEO_BENEFIT_HARM = {
  population: 10000,
  years: 3,
  hipPrevented: 149,
  aff: 2,
  source: 'Black DM, NEJM 2020（美國白人女性、雙磷酸鹽 3 年）',
};

export const OSTEO_SIDE_EFFECTS: { name: string; freq: string; prevent: string }[] = [
  { name: '顎骨壞死（ONJ）', freq: '骨鬆劑量約每年 1 / 10,000 至 1 / 100,000', prevent: '開始前處理蛀牙與牙周病、維持口腔衛生；拔牙前告知牙醫，一般不需因此停藥' },
  { name: '非典型股骨骨折（AFF）', freq: '罕見，隨用藥年數增加（5 年以上較明顯）', prevent: '大腿或鼠蹊部持續隱痛要回診照 X 光；這也是藥物假期的理由之一' },
  { name: '食道刺激', freq: '口服雙磷酸鹽較常見', prevent: '整杯白開水吞服、服藥後保持直立 30 分鐘' },
  { name: '類流感反應', freq: 'Zoledronic acid 首次注射約 3 成', prevent: '注射前後多喝水，可用乙醯胺酚緩解，通常 1–3 天內消退' },
  { name: '低血鈣', freq: 'Denosumab、Zoledronic acid，重度腎病者風險較高', prevent: '用藥前補足鈣與維生素 D、檢查血鈣與腎功能' },
  { name: '心血管事件', freq: 'Romosozumab 在試驗中略增', prevent: '近 1 年內心肌梗塞或中風者不使用' },
];

// ── KP9 Nutrition ─────────────────────────────────────────────────────────────

export interface CalciumFood {
  id: string;
  name: string;
  portion: string;
  mg: number;
  note?: string;
}

/** Approximate values from Taiwan food composition data; brands vary. */
export const CALCIUM_FOODS: CalciumFood[] = [
  { id: 'milk', name: '牛奶', portion: '1 杯 240 ml', mg: 240 },
  { id: 'yogurt', name: '無糖優格', portion: '1 盒 150 g', mg: 170 },
  { id: 'cheese', name: '起司片', portion: '1 片 20 g', mg: 120 },
  { id: 'firm-tofu', name: '傳統板豆腐', portion: '100 g（約 1/4 盒）', mg: 140 },
  { id: 'soft-tofu', name: '嫩豆腐／盒裝豆腐', portion: '100 g', mg: 15, note: '凝固劑不同，鈣很少' },
  { id: 'dougan', name: '小方豆干', portion: '2 片 40 g', mg: 270 },
  { id: 'soymilk', name: '無糖豆漿（未加鈣）', portion: '1 杯 240 ml', mg: 35, note: '選「高鈣」標示者約 250 mg' },
  { id: 'fish', name: '小魚乾', portion: '1 湯匙 10 g', mg: 220, note: '含鈉較高' },
  { id: 'sesame', name: '黑芝麻粉', portion: '1 湯匙 10 g', mg: 140 },
  { id: 'kale', name: '芥藍、莧菜（熟）', portion: '1 碗 100 g', mg: 180 },
  { id: 'greens', name: '地瓜葉、青江菜（熟）', portion: '1 碗 100 g', mg: 90 },
  { id: 'spinach', name: '菠菜（熟）', portion: '1 碗 100 g', mg: 80, note: '草酸高，實際吸收少' },
  { id: 'almond', name: '杏仁', portion: '1 小把 30 g', mg: 75 },
];

export const CALCIUM_TARGET = 1000;
export const CALCIUM_UL = 2500;

export const OSTEO_NUTRIENT_EVIDENCE: {
  name: string;
  verdict: string;
  dose: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  caution: string;
}[] = [
  { name: '鈣（食物）', verdict: '吃到每日 1,000 mg 是用藥與骨骼代謝的基礎', dose: '19 歲以上 1,000 mg／日，上限 2,500 mg', grade: 'B', caution: '食物鈣不增加腎結石，反而可能降低' },
  { name: '鈣片（單獨補充）', verdict: '只補飲食不足的差額；單獨補鈣對一般人降骨折的證據弱', dose: '單次 ≤ 500 mg，分次', grade: 'C', caution: '大劑量補充劑可能增加腎結石與便秘；心血管風險有爭議' },
  { name: '維生素 D（缺乏、75 歲以上或用藥者）', verdict: '補到不缺乏，可配合藥物並降低低血鈣風險', dose: '每日 800–1,000 IU 常見；依醫師與抽血調整', grade: 'B', caution: '避免一年一次超高劑量：反而增加跌倒與骨折' },
  { name: '維生素 D（不缺乏的一般成人）', verdict: '額外補充不會降低骨折（VITAL 試驗）', dose: '不需超過建議量', grade: 'D', caution: 'Endocrine Society 2024 不建議 75 歲以下成人常規驗血與高劑量補充' },
  { name: '蛋白質', verdict: '長者吃足蛋白質與較好骨密度、較少髖部骨折相關，骨折後恢復也較好', dose: '1.0–1.2 g／公斤體重／日，分三餐', grade: 'B', caution: '慢性腎病者依腎功能調整' },
  { name: '維生素 K2（MK-7）', verdict: '機轉合理，但降低骨折或血管鈣化的人體證據不一致', dose: '從納豆、起司、蛋黃攝取即可', grade: 'C', caution: '服用 Warfarin 者會影響凝血值，必須先問醫師' },
  { name: '鎂', verdict: '缺鎂與低骨密度相關；飲食正常者額外補充效益未證實', dose: '堅果、豆類、深綠蔬菜、全穀', grade: 'C', caution: '腎功能不佳者避免自行補充' },
  { name: '膠原蛋白肽', verdict: '少數小型、廠商資助試驗顯示骨密度小幅上升，尚無骨折證據', dose: '若想嘗試，每日 5–10 g', grade: 'C', caution: '不能取代藥物；蛋白質品質不如一般肉魚蛋豆' },
  { name: '鍶補充劑', verdict: '不建議；會讓 DXA 數值「假性升高」', dose: '—', grade: 'D', caution: '處方鍶鹽已因心血管風險在歐洲退場' },
  { name: '硼、矽等微量元素', verdict: '缺乏人體骨折證據', dose: '均衡飲食即足夠', grade: 'E', caution: '高劑量硼有毒性風險' },
];

export const OSTEO_MED_TIMING: { drug: string; how: string; separate: string }[] = [
  { drug: '口服雙磷酸鹽（Alendronate、Risedronate）', how: '早上起床空腹，整杯白開水（約 200–250 ml）吞下，保持坐或站 30 分鐘', separate: '30 分鐘內不吃東西、不喝咖啡牛奶、不吃其他藥；鈣片改到午餐或晚餐' },
  { drug: '甲狀腺素', how: '早上空腹', separate: '與鈣片、鐵劑間隔 4 小時' },
  { drug: '鐵劑、四環黴素、Quinolone 類抗生素', how: '依醫囑', separate: '與鈣片間隔 2–4 小時（鈣會讓它們吸收變差）' },
  { drug: '碳酸鈣', how: '隨餐吃（需要胃酸）', separate: '使用制酸劑、胃酸少者改用檸檬酸鈣' },
  { drug: 'Denosumab、Zoledronic acid', how: '打針前確認血鈣、腎功能與維生素 D', separate: '注射後持續每日補足鈣與維生素 D' },
];

// ── KP10 Exercise & falls ─────────────────────────────────────────────────────

export const OSTEO_EXERCISE_RX: { level: string; title: string; dose: string; examples: string; who: string }[] = [
  { level: '每天', title: '平衡與日常走動', dose: '平衡訓練每週累積 ≥ 3 小時效果最好', examples: '單腳站（扶桌）、前後腳一直線走、太極、Otago 居家運動', who: '所有人，尤其曾跌倒者' },
  { level: '每週 2–3 次', title: '漸進式阻力訓練', dose: '8–12 下會累的重量，每個動作 2–3 組', examples: '坐站起立、扶牆深蹲、彈力帶划船、提踵、背部伸展', who: '所有人；骨折後在指導下開始' },
  { level: '每週數次', title: '衝擊與負重', dose: '依骨折風險調整：低風險可做跳躍；高風險以快走、踏階為主', examples: '快走、上下樓梯、原地小跳（無脊椎骨折者）', who: '無脊椎骨折、骨質缺乏者效果最明確' },
  { level: '每天', title: '姿勢與背伸肌', dose: '每天數分鐘，維持脊椎中立', examples: '靠牆站、趴姿抬頭抬胸、肩胛後收', who: '駝背、有脊椎骨折者特別重要' },
];

export const OSTEO_AVOID_MOVES = [
  '負重下的彎腰：仰臥起坐、站姿彎腰摸腳尖、彎腰搬重物',
  '用力扭轉脊椎：高爾夫全揮桿、大力轉體',
  '高跌倒風險活動：踩椅子拿高處物品、濕滑地面快走',
];

export const FALL_PREVENTION = [
  { area: '環境', items: ['浴室加扶手與止滑墊', '夜燈照亮床到廁所的路', '移除地上電線與小地毯'] },
  { area: '身體', items: ['每年檢查視力', '起身先坐 30 秒再站（防姿勢性低血壓）', '穿包覆、防滑、合腳的鞋'] },
  { area: '藥物', items: ['請醫師檢視安眠藥、鎮靜劑、降壓藥', '夜間頻尿者睡前減少喝水'] },
];

// ── KP11 After a fracture ─────────────────────────────────────────────────────

/** Illustrative relative risk of a next fracture vs a person without fracture. */
export const IMMINENT_RISK_CURVE: { month: number; rr: number }[] = [
  { month: 0, rr: 5 },
  { month: 6, rr: 4.2 },
  { month: 12, rr: 3.4 },
  { month: 24, rr: 2.4 },
  { month: 36, rr: 1.9 },
  { month: 60, rr: 1.6 },
  { month: 96, rr: 1.4 },
];

export const POST_FRACTURE_STEPS: { when: string; title: string; items: string[] }[] = [
  { when: '骨折當下', title: '處理骨折，同時問「是不是骨鬆」', items: ['輕微外力骨折＝骨鬆，直到證明不是', '請骨科轉介骨鬆評估，或詢問醫院是否有「骨折聯合照護服務（FLS）」'] },
  { when: '3 個月內', title: '檢查與開始用藥', items: ['DXA、抽血找次發性原因、胸腰椎 X 光找其他骨折', '依風險分層開始藥物，不必等骨折癒合'] },
  { when: '6–12 個月', title: '復健與防跌', items: ['漸進肌力與平衡訓練', '居家環境改善、檢視跌倒相關藥物'] },
  { when: '長期', title: '持續治療與追蹤', items: ['按時回診打針或拿藥，不自行停藥', '1–2 年追蹤 DXA，評估是否需調整或藥物假期'] },
];
