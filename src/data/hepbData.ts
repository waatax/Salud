import { EvidenceGrade } from '../types';
import type { HepbTab } from '../config/routes';
import type { Urgency } from './spineData';

export type { HepbTab };

/**
 * hepbData.ts — B 型肝炎專區 (v4.4)
 *
 * Taiwan-first: figures are the Health Promotion Administration's where they exist
 * (約 200 萬帶原者、肝癌死亡 B 肝約 55%), programme rules are stated with their start
 * date, and anything that changes with NHI reimbursement is phrased as "以健保署最新
 * 規定為準". Clinical thresholds follow WHO 2024, EASL 2017 and AASLD.
 */

export interface HepbSource {
  label: string;
  url: string;
}

export const HEPB_SOURCES: Record<string, HepbSource> = {
  HPA_SCREEN: { label: '國健署：成人預防保健 B、C 型肝炎篩檢（2025 年 8 月起擴大至民國 75 年以前出生者）', url: 'https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=1115&pid=13580' },
  MOHW_2025: { label: '衛福部：2025 世界肝炎日新聞稿', url: 'https://www.mohw.gov.tw/cp-16-83197-1.html' },
  WHO2024: { label: 'WHO 2024 慢性 B 型肝炎預防、診斷、照護與治療指引', url: 'https://www.who.int/publications/i/item/9789240090903' },
  EASL2017: { label: 'EASL 2017 B 型肝炎臨床實務指引（自然病程新分期）', url: 'https://doi.org/10.1016/j.jhep.2017.03.021' },
  AASLD2018: { label: 'AASLD 2018 慢性 B 型肝炎指引更新', url: 'https://doi.org/10.1002/hep.29800' },
  CDC_HBV: { label: 'US CDC：B 型肝炎（感染年齡與慢性化風險）', url: 'https://www.cdc.gov/std/treatment-guidelines/hbv.htm' },
  NI_CHEN: { label: 'Ni YH, Chen DS. 台灣兒童 B 肝疫苗 20 年成效（台北市兒童帶原率 9.8% → 0.6%）', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Ni+YH+Chen+DS+hepatitis+B+vaccination+Taiwan+experience' },
  CHANG1997: { label: 'Chang MH, et al. 全面接種 B 肝疫苗後兒童肝癌下降. N Engl J Med 1997;336:1855-9', url: 'https://doi.org/10.1056/NEJM199706263362602' },
  CDC_TW_MTCT: { label: '衛福部／疾管署：2019 年 7 月起母親 s 抗原陽性之新生兒皆接種公費 HBIG', url: 'https://mohw.gov.tw/cp-16-48117-1.html' },
  NHI_2023: { label: '中央社：健保 2023 年 10 月放寬 B 肝口服抗病毒藥給付', url: 'https://www.cna.com.tw/news/ahel/202309220052.aspx' },
  BWELL2026: { label: 'Hou J, et al. Bepirovirsen 第三期 B-Well 1/2 試驗. N Engl J Med 2026', url: 'https://www.biopharminternational.com/view/bepirovirsen-achieves-phase-3-functional-cure-rates-in-chronic-hepatitis-b-supporting-potential-shift-beyond-lifelong-therapy' },
  TVBS_HCC: { label: '國健署數據：台灣肝癌死亡 B 肝約 55%、C 肝約 30%', url: 'https://health.tvbs.com.tw/medical/331422' },
};

export interface HepbChapter {
  id: HepbTab;
  label_zh: string;
  title_zh: string;
  goal_zh: string;
  learn_zh: string[];
  minutes: number;
  takeaways_zh: string[];
}

export const HEPB_CHAPTERS: HepbChapter[] = [
  {
    id: 'OVERVIEW',
    label_zh: '認識 B 肝',
    title_zh: 'B 型肝炎：台灣最常見的「沉默」肝病',
    goal_zh: 'B 型肝炎病毒會躲在肝細胞裡很多年，多數帶原者沒有任何症狀，卻是台灣肝硬化與肝癌最主要的原因。好消息是：它可以預防、可以控制，定期追蹤能讓肝癌早期被發現。',
    learn_zh: ['B 肝病毒長什麼樣子、檢驗在驗哪一部分', '為什麼 1986 年以前出生的人特別要篩檢', '從肝炎到肝硬化、肝癌的路徑'],
    minutes: 6,
    takeaways_zh: [
      '國健署推估台灣約有 200 萬 B 肝帶原者，而且多數不知道自己帶原；肝癌死亡中約 55% 與 B 肝有關。',
      '台灣 1984 年起全球首創新生兒全面接種 B 肝疫苗，台北市兒童帶原率從 9.8% 降到 0.6%；1986 年以前出生的「疫苗斷層世代」最需要篩檢。',
      '肝臟沒有痛覺神經，肝炎、肝硬化甚至早期肝癌都可能毫無症狀——「不痛」不代表沒事，定期追蹤才是關鍵。',
    ],
  },
  {
    id: 'SPREAD',
    label_zh: '傳染與預防',
    title_zh: 'B 肝怎麼傳染？疫苗與母嬰阻斷',
    goal_zh: 'B 肝透過血液、體液與母親生產時傳給寶寶，不會因為一起吃飯傳染。疫苗、出生 24 小時內的免疫球蛋白，以及高病毒量孕婦的第三孕期用藥，是三道最有效的防線。',
    learn_zh: ['會傳染與不會傳染的途徑', '成人要不要打疫苗、怎麼打', '帶原媽媽如何保護寶寶'],
    minutes: 7,
    takeaways_zh: [
      'B 肝經血液、性行為與母子垂直傳染；共餐、共用碗筷、擁抱、咳嗽都不會傳染，帶原媽媽也可以哺乳。',
      '越小感染越容易變成慢性帶原：新生兒約 90%、5 歲以下約 30%，成人只有 2–6%——這是台灣從新生兒全面接種的原因。',
      '表面抗原與表面抗體都陰性的成人可以接種 3 劑疫苗（0、1、6 個月）；帶原孕婦依病毒量在第三孕期服藥，寶寶出生 24 小時內打免疫球蛋白與第 1 劑疫苗。',
    ],
  },
  {
    id: 'TESTS',
    label_zh: '看懂報告',
    title_zh: '看懂 B 肝檢驗報告：表面抗原、抗體、e 抗原與病毒量',
    goal_zh: '健檢報告上的 HBsAg、Anti-HBs、Anti-HBc 三項組合起來，就能回答「我有沒有感染、有沒有保護力、需不需要打疫苗」。帶原者則還要看 e 抗原、病毒量、肝指數與超音波。',
    learn_zh: ['每一個 B 肝指標在驗什麼', '用互動工具解讀三項基本組合', '病毒量、ALT、胎兒蛋白與纖維化分數怎麼看'],
    minutes: 7,
    takeaways_zh: [
      'HBsAg 陽性＝目前感染（超過 6 個月稱慢性帶原）；Anti-HBs 陽性＝有保護力；Anti-HBc 陽性＝曾經感染過。',
      '三項都陰性代表沒有保護力，建議接種疫苗；只有 Anti-HBs 陽性代表疫苗有效；Anti-HBc 陽性者未來接受化療或免疫抑制治療前，一定要告訴醫師。',
      '帶原者的治療決策主要看 HBV DNA（病毒量）、ALT（肝發炎）與肝纖維化程度，而不是只看肝指數。',
    ],
  },
  {
    id: 'PHASES',
    label_zh: '自然病程',
    title_zh: '慢性 B 肝的五個階段：為什麼有人要吃藥、有人只要追蹤',
    goal_zh: '慢性 B 肝不是一成不變的，而是病毒與免疫系統長期拉鋸。依 e 抗原、病毒量與肝發炎程度，可以分成五個階段，每個階段的處理方式不同，而且階段會隨時間轉換。',
    learn_zh: ['五個階段的新舊名稱', '各階段的病毒量與肝指數特徵', '為什麼「不活動帶原」也要定期追蹤'],
    minutes: 6,
    takeaways_zh: [
      'e 抗原陽性、病毒量很高但肝指數正常，稱為「HBeAg 陽性慢性感染」（舊稱免疫耐受期），通常先密切追蹤。',
      '肝指數升高、病毒量高，代表免疫正在攻擊受感染的肝細胞（慢性肝炎），這是纖維化加速、最需要治療的階段。',
      '病毒量低、肝指數正常的「不活動帶原」可能再度活化，所以每 6–12 個月追蹤仍不能停。',
    ],
  },
  {
    id: 'TREATMENT',
    label_zh: '治療',
    title_zh: '誰需要治療？口服抗病毒藥、健保給付與新藥研究',
    goal_zh: '現在的口服抗病毒藥一天一顆、副作用少、幾乎不會產生抗藥性，能把病毒壓到測不到，大幅降低肝硬化與肝癌風險。關鍵是「該治療的人有治療」以及「不自行停藥」。',
    learn_zh: ['哪些情況建議開始治療', '三種常用口服藥的差別', '停藥規則與正在研究的「功能性治癒」新藥'],
    minutes: 8,
    takeaways_zh: [
      '肝硬化、病毒量 >2,000 IU/mL 合併 ALT 升高、明顯肝纖維化，以及化療或免疫抑制治療前，都是常見的治療時機。',
      'Entecavir、TDF、TAF 是第一線口服藥，抗藥性極低；懷孕首選 tenofovir。國健署資料顯示，B、C 肝患者接受抗病毒治療約可降低六成以上肝癌發生。',
      '絕對不要自行停藥：停藥後可能發生嚴重肝炎發作，甚至肝衰竭。新藥 bepirovirsen 在第三期試驗讓約兩成低表面抗原的患者達到「功能性治癒」，仍在審查中。',
    ],
  },
  {
    id: 'MONITOR',
    label_zh: '追蹤與肝癌篩檢',
    title_zh: '定期追蹤：每 6–12 個月一次，讓肝癌在早期被發現',
    goal_zh: '早期肝癌通常沒有症狀，但可以靠超音波在腫瘤還小、可以手術或燒灼時發現。這一章整理不同狀況的追蹤頻率、肝癌高風險因子，以及需要立刻就醫的警訊。',
    learn_zh: ['不同族群的追蹤頻率與項目', '哪些人肝癌風險特別高', '肝炎急性發作與肝衰竭的警訊'],
    minutes: 6,
    takeaways_zh: [
      '一般帶原者每 6–12 個月抽血（肝指數、必要時病毒量）並做腹部超音波；肝硬化或高風險者每 6 個月超音波＋胎兒蛋白。',
      '男性、40 歲以上、肝硬化、高病毒量、家族肝癌史、喝酒、糖尿病與脂肪肝，都會提高肝癌風險。',
      '眼白變黃、茶色尿、極度疲倦、腹脹、嘔血或意識不清，代表肝臟可能急性惡化，請立刻就醫。',
    ],
  },
  {
    id: 'LIFE',
    label_zh: '生活與家人',
    title_zh: '和 B 肝好好相處：飲食、用藥、懷孕與家人篩檢',
    goal_zh: 'B 肝帶原者可以正常工作、上學、運動、和家人一起吃飯。真正要注意的是：不喝酒、不亂吃偏方、控制脂肪肝、用新藥前告知醫師，以及讓家人都篩檢與接種。',
    learn_zh: ['帶原者的飲食與生活原則', '化療、免疫治療前為什麼一定要告知 B 肝', '家人篩檢與懷孕的準備'],
    minutes: 6,
    takeaways_zh: [
      '戒酒、維持體重避免脂肪肝、戒菸，是帶原者降低肝硬化與肝癌風險最有效的生活習慣；市售「保肝」產品無法清除病毒。',
      '任何化療、類固醇、生物製劑或器官移植前都要先驗 B 肝，必要時預防性服藥，以免病毒再活化造成猛爆性肝炎。',
      '配偶、子女、兄弟姊妹都應篩檢；未感染且沒有抗體者接種疫苗。備孕的帶原女性先和肝膽科、婦產科醫師討論病毒量與用藥。',
    ],
  },
];

// ── Overview ─────────────────────────────────────────────────────────────

export const HEPB_KEY_NUMBERS = [
  { value: '約 200', unit: '萬人', label: '台灣 B 肝帶原者（國健署推估）' },
  { value: '55', unit: '%', label: '台灣肝癌死亡與 B 肝相關（C 肝約 30%）' },
  { value: '9.8→0.6', unit: '%', label: '台北市兒童帶原率：疫苗前 → 全面接種 20 年後' },
  { value: '6 成+', unit: '', label: '抗病毒治療約可降低的肝癌發生（國健署）' },
];

export const PROGRESSION = [
  { stage: '健康的肝', detail: '感染後若免疫成功清除病毒，就不會留下慢性感染。', tone: 'good' as const },
  { stage: '慢性 B 肝', detail: '病毒持續存在超過 6 個月；多數人沒有症狀，肝指數可能時高時低。', tone: 'neutral' as const },
  { stage: '肝纖維化', detail: '反覆發炎讓肝臟長出疤痕組織；及早治療有機會部分逆轉。', tone: 'warn' as const },
  { stage: '肝硬化', detail: '疤痕大量取代正常肝細胞，肝功能與血流受影響；仍需持續抗病毒與追蹤。', tone: 'bad' as const },
  { stage: '肝癌', detail: 'B 肝病毒可直接整合進肝細胞基因，少數人沒有肝硬化也會發生肝癌。', tone: 'bad' as const },
];

// ── Spread & prevention ──────────────────────────────────────────────────

export const TRANSMISSION = [
  { route: '母子垂直傳染', how: '生產過程接觸母親血液與體液', risk: '台灣帶原者最主要的感染來源；母親 e 抗原陽性時風險最高', yes: true },
  { route: '血液接觸', how: '共用針頭、刮鬍刀、牙刷、指甲剪；不潔的刺青、穿耳洞、針灸', risk: '極少量血液就可能傳染', yes: true },
  { route: '性行為', how: '未使用保險套的性行為', risk: '伴侶未感染且無抗體時應接種疫苗', yes: true },
  { route: '傷口接觸', how: '帶原者的傷口血液接觸到他人的傷口或黏膜', risk: '傷口要包紮好', yes: true },
  { route: '共餐、共用碗筷', how: '一起吃飯、夾菜、喝同一杯飲料', risk: '不會傳染（經口傳染的是 A 肝與 E 肝）', yes: false },
  { route: '擁抱、握手、咳嗽', how: '日常社交接觸、打噴嚏', risk: '不會傳染', yes: false },
  { route: '哺餵母乳', how: '帶原母親親餵或擠奶', risk: '寶寶按時接種免疫球蛋白與疫苗後可以哺乳', yes: false },
];

/** US CDC: risk of chronic infection by age at infection. */
export const CHRONICITY_BY_AGE = [
  { age: '新生兒・嬰兒', pct: 90, label: '約 90%' },
  { age: '5 歲以下兒童', pct: 30, label: '約 30%' },
  { age: '成人', pct: 4, label: '約 2–6%' },
];

export const VACCINE_GUIDE = [
  { who: '新生兒（台灣常規）', what: '出生 24 小時內、滿 1 個月、滿 6 個月各 1 劑', note: '公費；母親帶原者另於出生 24 小時內加打免疫球蛋白（HBIG）' },
  { who: 'HBsAg、Anti-HBs、Anti-HBc 皆陰性的成人', what: '3 劑（第 0、1、6 個月）', note: '多為自費；完成後 1–2 個月可驗表面抗體確認' },
  { who: '醫護、洗腎、家中有帶原者、性伴侶帶原', what: '優先接種，完成後驗抗體', note: '抗體 <10 mIU/mL 視為無反應，可再補一套疫苗' },
  { who: '小時候打過、現在驗不到抗體', what: '一般人不需常規追加', note: '多數人仍有免疫記憶；高風險職業依規定追加或檢測' },
];

export const MTCT_STEPS = [
  { when: '懷孕 12–14 週', what: '產檢驗 B 肝表面抗原與 e 抗原；陽性者轉介肝膽腸胃科評估病毒量。' },
  { when: '約 27–28 週起', what: '病毒量 ≥10⁶ IU/mL 的孕婦，依健保規定開始口服 tenofovir，持續到產後約 4 週（以醫師與健保最新規定為準）。' },
  { when: '出生 24 小時內', what: '母親為表面抗原陽性的新生兒（不論 e 抗原），接種 1 劑公費免疫球蛋白（HBIG）與第 1 劑 B 肝疫苗。' },
  { when: '滿 1、6 個月', what: '完成第 2、3 劑疫苗。帶原母親可以哺乳。' },
  { when: '滿 12 個月', what: '寶寶抽血驗表面抗原與表面抗體，確認沒有感染且產生保護力。' },
];

// ── Tests ────────────────────────────────────────────────────────────────

export const HBV_MARKERS = [
  { marker: 'HBsAg', zh: 'B 肝表面抗原', meaning: '陽性＝目前體內有 B 肝病毒；持續超過 6 個月為慢性帶原', normal: '陰性' },
  { marker: 'Anti-HBs', zh: 'B 肝表面抗體', meaning: '陽性（≥10 mIU/mL）＝有保護力，來自疫苗或感染後康復', normal: '有抗體為佳' },
  { marker: 'Anti-HBc', zh: 'B 肝核心抗體', meaning: '陽性＝曾經感染過 B 肝（疫苗不會產生這個抗體）', normal: '陰性' },
  { marker: 'HBeAg', zh: 'B 肝 e 抗原', meaning: '陽性＝病毒複製活躍、傳染力較高', normal: '帶原者以陰性較佳' },
  { marker: 'Anti-HBe', zh: 'B 肝 e 抗體', meaning: 'e 抗原轉陰、產生 e 抗體，通常代表病毒活性下降', normal: '—' },
  { marker: 'HBV DNA', zh: 'B 肝病毒量', meaning: '血中病毒數量（IU/mL）；2,000 與 20,000 是常用的治療判斷門檻', normal: '越低越好，治療目標為測不到' },
  { marker: 'ALT（GPT）', zh: '丙胺酸轉胺酶（肝指數）', meaning: '肝細胞發炎受損時上升；國際指引建議健康上限男約 35、女約 25 U/L', normal: '各實驗室上限約 35–40 U/L' },
  { marker: 'AFP', zh: '胎兒蛋白', meaning: '肝癌腫瘤標記，搭配超音波使用；單獨使用敏感度不足', normal: '多數實驗室 <10–20 ng/mL' },
  { marker: 'FIB-4／APRI／肝纖維掃描', zh: '肝纖維化評估', meaning: '用抽血公式或彈性掃描（kPa）估計肝臟變硬程度', normal: 'WHO 2024：APRI >0.5 或掃描 >7 kPa 屬明顯纖維化' },
];

export type Tri = 'pos' | 'neg';

export interface SerologyResult {
  title: string;
  meaning: string;
  action: string;
  tone: 'good' | 'warn' | 'bad' | 'neutral';
}

/** Key: `${HBsAg}-${AntiHBs}-${AntiHBc}` */
export const SEROLOGY: Record<string, SerologyResult> = {
  'neg-neg-neg': { title: '沒有感染，也沒有保護力', meaning: '從未感染 B 肝，也沒有疫苗產生的抗體。', action: '建議接種 3 劑 B 肝疫苗（0、1、6 個月）。', tone: 'warn' },
  'neg-pos-neg': { title: '疫苗產生的保護力', meaning: '沒有感染過，表面抗體來自疫苗。', action: '不需處理；一般人不需追加疫苗。', tone: 'good' },
  'neg-pos-pos': { title: '過去感染過、已經康復', meaning: '曾經感染，免疫系統已清除病毒並產生保護力。', action: '不需治療；但未來接受化療、類固醇或生物製劑前，要告知醫師（病毒可能再活化）。', tone: 'good' },
  'neg-neg-pos': { title: '只有核心抗體陽性', meaning: '可能是過去感染後表面抗體下降、潛伏性感染，或偽陽性。', action: '請醫師評估，必要時驗病毒量；接受免疫抑制治療前尤其重要。', tone: 'neutral' },
  'pos-neg-pos': { title: 'B 肝感染中（帶原）', meaning: '體內有 B 肝病毒；持續超過 6 個月即為慢性 B 肝。', action: '到肝膽腸胃科進一步檢驗 e 抗原、病毒量、肝指數與腹部超音波，並開始定期追蹤；請家人一起篩檢。', tone: 'bad' },
  'pos-neg-neg': { title: '可能是非常早期的急性感染', meaning: '剛感染、核心抗體還沒產生；剛打完疫苗的數天內也可能短暫陽性。', action: '數週後複驗，並請醫師評估。', tone: 'warn' },
  'pos-pos-pos': { title: '少見的組合', meaning: '可能是不同亞型病毒感染、轉換期，或檢驗干擾。', action: '請肝膽腸胃科醫師評估並驗病毒量。', tone: 'warn' },
  'pos-pos-neg': { title: '少見的組合', meaning: '可能是檢驗干擾或剛接種疫苗。', action: '請醫師評估是否需要複驗。', tone: 'warn' },
};

// ── Phases (EASL 2017) ───────────────────────────────────────────────────

export const HBV_PHASES = [
  {
    name: 'HBeAg 陽性慢性感染',
    old: '舊稱：免疫耐受期',
    eag: '陽性',
    dna: '非常高（常 >10⁷ IU/mL）',
    alt: '正常',
    liver: '沒有或很輕微的發炎',
    plan: '定期追蹤；年紀較大、有家族肝癌史或纖維化時考慮治療',
    level: { dna: 4, alt: 1 },
  },
  {
    name: 'HBeAg 陽性慢性肝炎',
    old: '舊稱：免疫清除期',
    eag: '陽性',
    dna: '高（10⁴–10⁷ IU/mL）',
    alt: '升高',
    liver: '中重度發炎，纖維化加速',
    plan: '多數需要抗病毒治療',
    level: { dna: 3, alt: 3 },
  },
  {
    name: 'HBeAg 陰性慢性感染',
    old: '舊稱：不活動帶原',
    eag: '陰性（e 抗體陽性）',
    dna: '低（<2,000 IU/mL）',
    alt: '正常',
    liver: '輕微或沒有',
    plan: '每 6–12 個月追蹤，留意再活化',
    level: { dna: 1, alt: 1 },
  },
  {
    name: 'HBeAg 陰性慢性肝炎',
    old: '舊稱：再活化期',
    eag: '陰性',
    dna: '中高且起伏（≥2,000 IU/mL）',
    alt: '升高或時高時低',
    liver: '發炎與纖維化',
    plan: '多數需要抗病毒治療',
    level: { dna: 2.5, alt: 2.5 },
  },
  {
    name: '表面抗原陰性期',
    old: '功能性痊癒／隱匿性感染',
    eag: '陰性',
    dna: '通常測不到',
    alt: '正常',
    liver: '若之前已肝硬化，仍有肝癌風險',
    plan: '免疫抑制治療前告知醫師；肝硬化者持續肝癌篩檢',
    level: { dna: 0.4, alt: 1 },
  },
];

// ── Treatment ───────────────────────────────────────────────────────────

export const TREAT_WHEN = [
  { who: '肝硬化（代償或失代償）', rule: '只要驗得到病毒量就建議治療', src: 'WHO 2024；AASLD', tone: 'bad' as const },
  { who: '慢性肝炎', rule: 'HBV DNA >2,000 IU/mL 且 ALT 高於正常上限', src: 'WHO 2024；EASL 2017', tone: 'warn' as const },
  { who: '明顯肝纖維化', rule: 'APRI >0.5 或肝纖維掃描 >7 kPa，不論病毒量與 ALT', src: 'WHO 2024', tone: 'warn' as const },
  { who: '化療、免疫抑制劑、器官移植', rule: '表面抗原陽性者預防性用藥；核心抗體陽性者依風險預防或密切監測', src: 'AASLD；健保 2021 擴大給付', tone: 'warn' as const },
  { who: '高病毒量孕婦', rule: 'HBV DNA ≥10⁶ IU/mL，第三孕期起服用 tenofovir', src: '台灣健保 2018 起給付', tone: 'neutral' as const },
  { who: '其他考量', rule: '家族肝癌或肝硬化史、年齡較大、肝外表現（如腎絲球腎炎）時醫師可考慮提早治療', src: 'EASL 2017；AASLD', tone: 'neutral' as const },
];

export interface HbvDrug {
  name: string;
  brand: string;
  how: string;
  pros: string;
  watch: string;
  grade: EvidenceGrade;
}

export const HBV_DRUGS: HbvDrug[] = [
  {
    name: 'Entecavir（恩替卡韋）',
    brand: 'Baraclude（貝樂克）與學名藥',
    how: '每天 1 次口服；空腹服用（飯前或飯後至少 2 小時）',
    pros: '抑制病毒強、抗藥性極低（未曾用過 lamivudine 者），副作用少',
    watch: '腎功能不佳需調整劑量；不建議孕期使用',
    grade: 'A',
  },
  {
    name: 'Tenofovir disoproxil（TDF）',
    brand: 'Viread（惠立妥）與學名藥',
    how: '每天 1 次口服',
    pros: '抑制病毒強、幾乎沒有抗藥性；懷孕可使用、母嬰阻斷首選',
    watch: '長期使用可能影響腎功能與骨密度，需定期驗腎功能',
    grade: 'A',
  },
  {
    name: 'Tenofovir alafenamide（TAF）',
    brand: 'Vemlidy（韋立得）',
    how: '每天 1 次口服，隨餐服用',
    pros: '效果與 TDF 相當，對腎臟與骨骼較友善',
    watch: '費用較高；可能影響血脂',
    grade: 'A',
  },
  {
    name: '長效干擾素（Peginterferon α）',
    brand: '注射劑',
    how: '每週皮下注射 1 次，固定療程約 48 週',
    pros: '有固定療程，部分人能達到 e 抗原或表面抗原消失',
    watch: '類流感症狀、白血球與血小板下降、情緒低落；失代償肝硬化與懷孕不適用',
    grade: 'B',
  },
];

export const NHI_NOTES = [
  '2017 年起取消「每次給付 3 年、最多 2 次」的限制；停藥後復發可再次申請治療。',
  '2021 年 3 月起擴大：非肝臟器官移植、接受免疫抑制劑治療者的預防性用藥，以及肝纖維化 F3 以上者。',
  '2023 年 10 月起放寬：e 抗原陰性者只要一次 ALT 達正常上限 2 倍以上（且 HBV DNA ≥2,000 IU/mL）即可給付；纖維化門檻放寬至 F2。',
  '肝硬化患者可長期用藥。實際條件請以健保署最新《藥品給付規定》與主治醫師判斷為準。',
];

// ── Monitoring ───────────────────────────────────────────────────────────

export const MONITOR_PLAN = [
  { who: '不活動帶原（未治療）', freq: '每 6–12 個月', items: 'ALT、必要時 HBV DNA、腹部超音波；依風險加驗胎兒蛋白' },
  { who: 'e 抗原陽性、病毒量高但 ALT 正常', freq: '每 3–6 個月', items: 'ALT、HBV DNA；評估纖維化（FIB-4 或纖維掃描）' },
  { who: '正在服抗病毒藥', freq: '每 3–6 個月', items: '肝功能、HBV DNA、腎功能（使用 TDF 者）；每 6 個月超音波' },
  { who: '肝硬化或肝癌高風險', freq: '每 6 個月', items: '腹部超音波＋胎兒蛋白（肝癌篩檢）；評估食道靜脈曲張' },
  { who: '剛停藥', freq: '第 1 年每 1–3 個月', items: 'ALT、HBV DNA；出現發作徵兆立即回診' },
];

export const HCC_RISKS = ['男性', '年齡 40 歲以上', '肝硬化', '病毒量高、e 抗原陽性', '一等親有肝癌病史', '喝酒、吸菸', '糖尿病、肥胖、脂肪肝', '合併 C 型或 D 型肝炎'];

export const HEPB_RED_FLAGS: { level: Urgency; items: string[] }[] = [
  { level: 'now', items: ['嘔血或解黑便', '意識混亂、嗜睡、行為改變（可能是肝腦病變）', '眼白與皮膚快速變黃，合併嚴重疲倦、嘔吐'] },
  { level: 'soon', items: ['茶色尿、眼白變黃', '極度疲倦、食慾很差、持續噁心', '肚子變大、腳水腫', '自行停藥後出現上述任何症狀'] },
  { level: 'clinic', items: ['帶原但超過一年沒有追蹤', '肝指數升高、超音波發現異常', '準備接受化療、類固醇或生物製劑', '計畫懷孕'] },
];

// ── Life ─────────────────────────────────────────────────────────────────

export const LIFE_DO = [
  { title: '完全不喝酒', why: '酒精與 B 肝會加乘傷肝，加速纖維化與肝癌。' },
  { title: '維持體重、避免脂肪肝', why: '脂肪肝合併 B 肝會讓肝纖維化進展更快；腰圍與體重都是追蹤重點。' },
  { title: '戒菸', why: '吸菸與 B 肝帶原者的肝癌風險上升有關。' },
  { title: '不亂吃偏方與「保肝」產品', why: '來路不明的草藥或高劑量保健品可能造成藥物性肝炎；市售保肝產品無法清除病毒。' },
  { title: '新用藥前先告知 B 肝', why: '化療、類固醇、生物製劑會讓病毒再活化，可能引發猛爆性肝炎；醫師會評估預防用藥。' },
  { title: '沒有 A 肝抗體者接種 A 肝疫苗', why: '慢性肝病再感染 A 肝，病情可能較嚴重。' },
  { title: '個人用品不共用、傷口包紮好', why: '刮鬍刀、牙刷、指甲剪可能沾到血液。' },
  { title: '照常工作、運動、與家人共餐', why: 'B 肝不會經由日常接觸與共餐傳染。' },
];

export const FAMILY_STEPS = [
  { who: '配偶、性伴侶', what: '驗表面抗原與表面抗體；兩者皆陰性就接種疫苗。' },
  { who: '子女、兄弟姊妹、父母', what: '一等親都應篩檢；家族帶原與肝癌常有聚集性。' },
  { who: '備孕的帶原女性', what: '先檢查病毒量與肝臟狀態，和肝膽腸胃科、婦產科一起規劃孕期用藥。' },
  { who: '正在用 entecavir 想懷孕', what: '請醫師評估改用 tenofovir（孕期資料較完整）。' },
];

export const HEPB_MYTHS: { chapter: HepbTab; myth: string; fact: string }[] = [
  { chapter: 'SPREAD', myth: 'B 肝會透過一起吃飯、共用碗筷傳染。', fact: 'B 肝經血液、性行為與母子傳染；經口傳染的是 A 肝與 E 肝。帶原者可以和家人正常共餐。' },
  { chapter: 'SPREAD', myth: 'B 肝帶原媽媽不能餵母奶。', fact: '寶寶出生 24 小時內接種免疫球蛋白與疫苗後，帶原媽媽可以哺乳。' },
  { chapter: 'SPREAD', myth: '小時候打的疫苗抗體驗不到了，一定要再打。', fact: '多數人仍有免疫記憶，一般人不需常規追加；醫護等高風險職業則依規定檢測或追加。' },
  { chapter: 'TESTS', myth: '肝指數（GPT）正常，B 肝就沒問題。', fact: '病毒量高或已有纖維化時 ALT 仍可能正常，肝癌也可能在肝指數正常時發生；病毒量與超音波同樣重要。' },
  { chapter: 'TREATMENT', myth: 'B 肝藥一吃就要吃一輩子，而且很傷身。', fact: '現在的口服藥副作用少；部分人符合條件可在醫師監測下停藥。真正危險的是自行停藥。' },
  { chapter: 'TREATMENT', myth: '吃保肝藥或健康食品就能清除 B 肝病毒。', fact: '沒有任何保健品被證實能清除病毒；能壓制病毒、降低肝癌風險的是抗病毒藥物。' },
  { chapter: 'MONITOR', myth: '肝不痛、沒症狀，就不用追蹤。', fact: '肝臟沒有痛覺神經，早期肝癌通常沒有症狀；每 6–12 個月的超音波才能及早發現。' },
  { chapter: 'LIFE', myth: '帶原者不能運動、不能熬夜工作。', fact: '帶原者可以正常工作與運動；重點是不喝酒、維持體重、規律追蹤。' },
];

export const HEPB_QUIZ: Record<HepbTab, { question: string; options: string[]; answer: number; explain: string }> = {
  OVERVIEW: {
    question: '台灣哪個世代最需要主動篩檢 B 肝？',
    options: ['2000 年後出生', '1986 年（民國 75 年）以前出生', '只有 65 歲以上', '只有曾經輸血的人'],
    answer: 1,
    explain: '台灣自 1984 年起分階段、1986 年起全面為新生兒接種 B 肝疫苗；之前出生的人沒有在嬰兒期受到保護，是帶原率最高的世代。',
  },
  SPREAD: {
    question: '下列哪一種情況「不會」傳染 B 肝？',
    options: ['共用刮鬍刀', '母親生產時', '一起吃火鍋、共用碗筷', '未使用保險套的性行為'],
    answer: 2,
    explain: 'B 肝透過血液與體液傳染，共餐不會傳染。',
  },
  TESTS: {
    question: '報告：HBsAg 陰性、Anti-HBs 陽性、Anti-HBc 陽性，代表什麼？',
    options: ['正在感染 B 肝', '過去感染過、已康復並有保護力', '只打過疫苗', '沒有保護力，要打疫苗'],
    answer: 1,
    explain: '核心抗體陽性代表曾經感染，表面抗體陽性代表已產生保護力；未來接受免疫抑制治療前要告知醫師。',
  },
  PHASES: {
    question: '病毒量低、肝指數正常的「不活動帶原」需要怎麼做？',
    options: ['已經痊癒，不用再追蹤', '每 6–12 個月定期追蹤', '立刻開始吃藥', '每週抽血'],
    answer: 1,
    explain: '不活動帶原可能再度活化，也仍有肝癌風險，因此需要定期追蹤。',
  },
  TREATMENT: {
    question: '正在吃 B 肝抗病毒藥的人，最不應該做的是？',
    options: ['每天固定時間服藥', '定期回診抽血', '感覺很好就自行停藥', '告訴其他醫師自己在吃這個藥'],
    answer: 2,
    explain: '自行停藥可能導致病毒反彈、嚴重肝炎發作甚至肝衰竭，停藥一定要在醫師評估與密切監測下進行。',
  },
  MONITOR: {
    question: '肝硬化或肝癌高風險的 B 肝帶原者，建議多久做一次肝臟超音波？',
    options: ['每 5 年', '每 2 年', '每 6 個月', '有症狀再做'],
    answer: 2,
    explain: '每 6 個月超音波（加上胎兒蛋白）能在腫瘤還小、可以治療時發現肝癌。',
  },
  LIFE: {
    question: 'B 肝帶原者要開始化療或使用生物製劑前，應該？',
    options: ['不需要特別處理', '先告知醫師 B 肝狀態，評估預防性抗病毒藥', '先停掉所有藥', '多吃保肝產品'],
    answer: 1,
    explain: '免疫抑制會讓 B 肝病毒再活化，可能引起致命的猛爆性肝炎；預防性用藥能有效避免。',
  },
};

export const HEPB_CHAPTER_SOURCES: Record<HepbTab, string[]> = {
  OVERVIEW: ['MOHW_2025', 'TVBS_HCC', 'NI_CHEN', 'CHANG1997'],
  SPREAD: ['CDC_HBV', 'CDC_TW_MTCT', 'WHO2024'],
  TESTS: ['WHO2024', 'AASLD2018', 'HPA_SCREEN'],
  PHASES: ['EASL2017', 'AASLD2018'],
  TREATMENT: ['WHO2024', 'EASL2017', 'AASLD2018', 'NHI_2023', 'BWELL2026'],
  MONITOR: ['AASLD2018', 'EASL2017', 'HPA_SCREEN'],
  LIFE: ['AASLD2018', 'WHO2024', 'CDC_HBV'],
};
