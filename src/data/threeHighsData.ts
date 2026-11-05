/**
 * 體重與三高的共同架構：同一份骨架（數字、目標、吃、動、藥、追蹤、警訊），讓讀者換主題時不必重新
 * 學閱讀方式。門檻與站內課程、src/utils/labBands.ts 保持一致；連結由 tirzepatide.test.ts 檢查。
 */

import {
  classifyA1c,
  classifyBMI,
  classifyBP,
  classifyFPG,
  classifyHDL,
  classifyLDL,
  classifyTG,
  classifyWaist,
  countMetSyn,
  type BandResult,
} from '../utils/labBands';

export type ConditionId = 'weight' | 'bp' | 'glucose' | 'lipid';

export interface Zone {
  label: string;
  range: string;
  tone: 'good' | 'neutral' | 'warn' | 'bad';
}

export interface ZoneScale {
  name: string;
  zones: Zone[];
}

export interface GuideLink {
  label: string;
  hash: string;
}

export interface ConditionGuide {
  id: ConditionId;
  name: string;
  shortName: string;
  oneLiner: string;
  scales: ZoneScale[];
  target: string;
  eat: string[];
  move: string[];
  treat: string[];
  track: string[];
  urgent: string[];
  weightEffect: string;
  myth: { myth: string; fact: string };
  links: GuideLink[];
}

export const CONDITION_GUIDES: ConditionGuide[] = [
  {
    id: 'weight',
    name: '體重與腰圍',
    shortName: '體重',
    oneLiner: '先看腰圍，再看 BMI。第一階段目標是減掉 5–10% 的體重，同時保住肌肉。',
    scales: [
      {
        name: 'BMI（kg/m²）',
        zones: [
          { label: '過輕', range: '<18.5', tone: 'warn' },
          { label: '正常', range: '18.5–23.9', tone: 'good' },
          { label: '過重', range: '24–26.9', tone: 'warn' },
          { label: '肥胖', range: '≥27', tone: 'bad' },
        ],
      },
      {
        name: '腰圍（公分）',
        zones: [
          { label: '正常', range: '男 <90，女 <80', tone: 'good' },
          { label: '腹部肥胖', range: '男 ≥90，女 ≥80', tone: 'warn' },
        ],
      },
    ],
    target: '6 個月內減 5–10%；腰圍低於身高的一半。',
    eat: [
      '每天少吃約 500 大卡，通常先從含糖飲料、消夜與油炸開始',
      '餐盤一半蔬菜、四分之一蛋白質、四分之一全穀',
      '蛋白質每公斤約 1.2–1.6 克（腎臟病者先問醫師）',
      '少超加工食品，它會讓人不知不覺多吃',
    ],
    move: [
      '有氧每週 150–300 分鐘，維持體重通常需要更多',
      '肌力訓練每週 2–3 次，保住肌肉與基礎代謝',
      '增加日常活動量：多走路、少久坐',
      '睡滿 7 小時，睡眠不足會讓人更餓',
    ],
    treat: [
      '第一步：飲食、運動、睡眠與行為治療',
      '藥物：BMI ≥30，或 BMI ≥27 合併共病時可和醫師討論',
      '手術：BMI ≥37.5，或 ≥32.5 合併難以控制的共病時可評估',
      '肥胖是慢性疾病，需要長期計畫，不是一次性的減肥',
    ],
    track: ['每週同一時間量體重，看趨勢不看單日', '每月量腰圍', '每 3–6 個月複查三高', '定期測肌力，如 5 次椅子起立'],
    urgent: ['沒有刻意減重，6 個月內卻掉超過 5%', '為了瘦而催吐、絕食或濫用藥物'],
    weightEffect: '減重 5% 就能開始改善血糖、血壓與三酸甘油酯，減得越多改善通常越明顯。',
    myth: {
      myth: '減重靠意志力，瘦不下來就是不夠努力。',
      fact: '體重下降後，食慾與能量消耗都會反彈。肥胖有生理基礎，需要時尋求治療不代表失敗。',
    },
    links: [
      { label: '腰圍比體重更重要', hash: 'learn/checkup/L-CHK-07' },
      { label: '減重的真相', hash: 'learn/eat/L-EAT-09' },
      { label: '猛健樂完整指南', hash: 'obesity/TIRZEPATIDE_PROTOCOL' },
      { label: '增肌減脂試算', hash: 'obesity/RECOMP' },
    ],
  },
  {
    id: 'bp',
    name: '高血壓',
    shortName: '血壓',
    oneLiner: '多半沒有症狀，所以要靠量。在家量 722，平均 ≥130/80 就該處理。',
    scales: [
      {
        name: '血壓（mmHg）',
        zones: [
          { label: '正常', range: '<120 且 <80', tone: 'good' },
          { label: '偏高', range: '120–129 且 <80', tone: 'neutral' },
          { label: '第 1 期', range: '130–139 或 80–89', tone: 'warn' },
          { label: '第 2 期', range: '≥140 或 ≥90', tone: 'bad' },
        ],
      },
    ],
    target: '多數人 <130/80（以居家 722 平均值判斷）。',
    eat: [
      '得舒飲食：多蔬果、全穀、低脂乳品、堅果，高血壓者收縮壓約可降 11 mmHg',
      '少鈉：每天鈉不超過 2,000–2,300 毫克；小心湯、醬料、加工肉與泡麵',
      '含鉀低鈉鹽可以降血壓，但腎臟病或服保鉀利尿劑者要先問醫師',
      '少喝酒：約可降 4 mmHg',
    ],
    move: ['有氧每週 150 分鐘，約可降 5–8 mmHg', '動態肌力訓練與等長握力訓練也有幫助', '血壓 ≥180/120 時先就醫控制，再開始運動'],
    treat: [
      '第 1 期且風險低：先生活調整 3–6 個月，未達標就用藥',
      '≥140/90：通常建議直接以藥物治療，常用兩種藥合併',
      '常用藥物：ACEi／ARB、鈣離子阻斷劑、利尿劑',
      '年輕、難控制或低血鉀：要排除原發性醛固酮症等繼發原因',
    ],
    track: ['722：連續 7 天、早晚各量、每次 2 遍', '每年驗腎功能、鉀離子與尿白蛋白', '體重下降後請帶紀錄回診，評估是否減藥'],
    urgent: ['血壓 ≥180/120 合併胸痛、呼吸困難、劇烈頭痛、視力模糊', '單側無力、口齒不清、臉歪：立刻撥 119'],
    weightEffect: '大約每減 1 公斤，收縮壓下降約 1 mmHg。',
    myth: {
      myth: '降血壓藥一吃就要吃一輩子，而且會傷腎。',
      fact: '長期沒控制好的高血壓才傷腎。部分人在生活型態大幅改善後，可以由醫師評估減藥。',
    },
    links: [
      { label: '血壓怎麼看', hash: 'learn/checkup/L-CHK-02' },
      { label: '722 居家血壓工具', hash: 'cardiometabolic/BP_722' },
      { label: '鹽與鉀', hash: 'learn/eat/L-EAT-05' },
      { label: '高血壓照護路徑', hash: 'clinic/cardiology/hypertension' },
    ],
  },
  {
    id: 'glucose',
    name: '高血糖',
    shortName: '血糖',
    oneLiner: '糖尿病前期是最好的逆轉窗口。減重 5–7% 加上規律運動，能大幅延後糖尿病。',
    scales: [
      {
        name: '空腹血糖（mg/dL）',
        zones: [
          { label: '正常', range: '<100', tone: 'good' },
          { label: '前期', range: '100–125', tone: 'warn' },
          { label: '糖尿病範圍', range: '≥126', tone: 'bad' },
        ],
      },
      {
        name: '糖化血色素 HbA1c（%）',
        zones: [
          { label: '正常', range: '<5.7', tone: 'good' },
          { label: '前期', range: '5.7–6.4', tone: 'warn' },
          { label: '糖尿病範圍', range: '≥6.5', tone: 'bad' },
        ],
      },
    ],
    target: '多數糖尿病患者 HbA1c <7%，依年齡與共病個別調整。糖尿病前期：減重 5–7%。',
    eat: ['先吃菜和蛋白質，最後吃飯，可降低餐後血糖', '含糖飲料是最值得先戒的一項', '白飯白麵換成部分全穀與豆類，份量固定', '吃完整水果，不喝果汁'],
    move: ['有氧每週 150 分鐘，加上肌力訓練 2–3 次', '飯後散步 10–15 分鐘，對餐後血糖特別有效', '久坐每 30 分鐘起來動一動', '用胰島素或磺醯尿素者，運動前後注意低血糖'],
    treat: [
      '糖尿病前期：生活介入優先，高風險者可討論 metformin',
      'Metformin 是常用的基礎藥物',
      'SGLT2 抑制劑：有心衰竭或腎臟病時特別有好處',
      'GLP-1／GIP 類：降血糖且減重；需要胰島素時也不代表失敗',
    ],
    track: ['前期每年驗一次；糖尿病每 3–6 個月驗 HbA1c', '糖尿病每年檢查眼底、足部、尿白蛋白與腎功能', '貧血或海洋性貧血可能讓 HbA1c 失真'],
    urgent: ['極度口渴、多尿，合併噁心、腹痛、呼吸急促', '血糖持續 ≥300 mg/dL', '冷汗、發抖、意識混亂（低血糖）'],
    weightEffect: 'DPP：減重約 7% 加運動，3 年內糖尿病發生率降 58%。DiRECT：減 15 公斤以上者，一年緩解率 86%（病程 6 年內）。',
    myth: {
      myth: '糖尿病就是吃太多糖，不吃糖就好了。',
      fact: '主因是胰島素阻抗與胰島功能下降，和內臟脂肪、遺傳、久坐有關。總醣量與飲食品質都重要，不是只有甜食。',
    },
    links: [
      { label: '血糖三指標', hash: 'learn/checkup/L-CHK-03' },
      { label: '糖尿病前期逆轉', hash: 'learn/prevent/L-PRE-03' },
      { label: '醣、糖與纖維', hash: 'learn/eat/L-EAT-03' },
      { label: '第 2 型糖尿病照護路徑', hash: 'clinic/endocrine/t2dm' },
    ],
  },
  {
    id: 'lipid',
    name: '高血脂',
    shortName: '血脂',
    oneLiner: 'LDL 沒有單一標準，風險越高目標越低。三酸甘油酯最受飲食與體重影響，LDL 則常需要藥物。',
    scales: [
      {
        name: 'LDL 目標（mg/dL，台灣 2025 路徑）',
        zones: [
          { label: '低風險', range: '<130', tone: 'good' },
          { label: '中風險', range: '<115', tone: 'neutral' },
          { label: '高風險', range: '<100', tone: 'warn' },
          { label: '已有心血管病', range: '<70（極高風險 <55）', tone: 'bad' },
        ],
      },
      {
        name: '三酸甘油酯（mg/dL）',
        zones: [
          { label: '正常', range: '<150', tone: 'good' },
          { label: '偏高', range: '150–499', tone: 'warn' },
          { label: '非常高', range: '≥500', tone: 'bad' },
        ],
      },
    ],
    target: '先確認自己的風險等級，才知道 LDL 目標。所有成人一生至少驗一次 Lp(a)。',
    eat: ['用橄欖油、芥花油、堅果、魚取代肥肉與奶油，換油比少油更重要', '多吃水溶性纖維：燕麥、豆類、蔬果', '三酸甘油酯高：先減含糖飲料、精緻澱粉與酒', '每週吃魚 2 次；魚油補充劑不等於吃魚'],
    move: ['有氧運動主要改善三酸甘油酯與 HDL', '肌力訓練也有幫助，對 LDL 的影響較小'],
    treat: [
      'Statin 是 LDL 的第一線藥物，減少心肌梗塞與中風',
      '未達標可加 ezetimibe，再考慮 PCSK9 類藥物',
      '三酸甘油酯 ≥500：要先處理以防胰臟炎，常用 fibrate',
      '肌肉痠痛可和醫師討論換藥或調劑量，不要自行停藥',
    ],
    track: ['開始或調藥後 4–12 週複查', '穩定後每 3–12 個月追蹤', '非 HDL 膽固醇目標 = LDL 目標 + 30'],
    urgent: ['胸痛、胸悶、呼吸困難', '三酸甘油酯很高並合併劇烈上腹痛'],
    weightEffect: '減重對三酸甘油酯與 HDL 效果明顯，對 LDL 較小。以 tirzepatide 為例，三酸甘油酯降 21–29%，LDL 只降 5–7%。',
    myth: {
      myth: '吃得清淡、也不胖，膽固醇就不會高。',
      fact: 'LDL 和 Lp(a) 深受遺傳影響，瘦的人也可能很高。一定要驗，不能只看外表。',
    },
    links: [
      { label: '你的 LDL 目標', hash: 'learn/checkup/L-CHK-04' },
      { label: '油脂：換油比少油更重要', hash: 'learn/eat/L-EAT-04' },
      { label: 'ApoB 與現代血脂學', hash: 'cardiometabolic/LIPIDS_APOB' },
      { label: '高血脂照護路徑', hash: 'clinic/endocrine/osteoporosis_dyslipidemia' },
    ],
  },
];

/** AHA/ACC figures used elsewhere on the site (L-PRE-02). Separate studies, not additive. */
export const BP_LIFESTYLE_EFFECTS = [
  { label: '得舒飲食', low: 11, high: 11, note: '高血壓者' },
  { label: '有氧運動', low: 5, high: 8, note: '規律進行' },
  { label: '減少鈉', low: 5, high: 6, note: '高血壓者' },
  { label: '增加鉀', low: 4, high: 5, note: '腎功能正常者' },
  { label: '減少飲酒', low: 4, high: 4, note: '有飲酒者' },
];

export const WEIGHT_BENEFIT_LADDER = [
  { at: '5%', title: '開始有感', body: '血糖、血壓與三酸甘油酯開始改善。Look AHEAD：減 5–10% 者，這些指標明顯改善的機會比體重持平者高。', source: { label: 'Look AHEAD（Wing 2011）', url: 'https://doi.org/10.2337/dc10-2415' } },
  { at: '7%', title: '延後糖尿病', body: 'DPP：減重約 7% 加每週 150 分鐘運動，3 年內糖尿病發生率降 58%。', source: { label: 'DPP（NEJM 2002）', url: 'https://doi.org/10.1056/NEJMoa012512' } },
  { at: '≥10%', title: '心血管風險可能更低', body: 'Look AHEAD 事後分析：第一年減 ≥10% 者，心血管事件風險較低 21%。這是事後分析，不能當作因果證明。', source: { label: 'Look AHEAD（Gregg 2016）', url: 'https://doi.org/10.1016/S2213-8587(16)30162-0' } },
  { at: '≥15 公斤', title: '糖尿病有機會緩解', body: 'DiRECT：病程 6 年內的第 2 型糖尿病，減 15 公斤以上者一年緩解率 86%。', source: { label: 'DiRECT（Lancet 2018）', url: 'https://doi.org/10.1016/S0140-6736(17)33102-1' } },
];

export const WEEKLY_PLAN = [
  { title: '吃', items: ['含糖飲料換成水或無糖茶', '每餐先吃菜和蛋白質', '蔬菜佔餐盤一半', '減少湯、醬料與加工肉'] },
  { title: '動', items: ['每週 150 分鐘快走或騎車', '每週 2 次肌力訓練', '飯後走 10–15 分鐘', '久坐每 30 分鐘起身'] },
  { title: '睡與心', items: ['每天睡 7 小時以上', '打鼾、白天嗜睡要檢查睡眠呼吸中止', '戒菸', '壓力大時先找人談'] },
  { title: '量', items: ['每週量一次體重，每月量腰圍', '每季做一週 722', '依醫師指示抽血', '把數字帶去回診，而不是憑感覺'] },
];

export const MAP_COLUMNS = ['看懂數字', '怎麼吃', '怎麼動', '治療', '工具'] as const;

export const KNOWLEDGE_MAP: { id: ConditionId; name: string; cells: GuideLink[] }[] = [
  {
    id: 'weight',
    name: '體重',
    cells: [
      { label: '腰圍比體重重要', hash: 'learn/checkup/L-CHK-07' },
      { label: '減重的真相', hash: 'learn/eat/L-EAT-09' },
      { label: '肌力訓練入門', hash: 'learn/move/L-MOVE-03' },
      { label: '猛健樂完整指南', hash: 'obesity/TIRZEPATIDE_PROTOCOL' },
      { label: '增肌減脂試算', hash: 'obesity/RECOMP' },
    ],
  },
  {
    id: 'bp',
    name: '血壓',
    cells: [
      { label: '130/80 怎麼看', hash: 'learn/checkup/L-CHK-02' },
      { label: '鹽與鉀', hash: 'learn/eat/L-EAT-05' },
      { label: '每週 150 分鐘', hash: 'learn/move/L-MOVE-01' },
      { label: '高血壓照護路徑', hash: 'clinic/cardiology/hypertension' },
      { label: '722 血壓工具', hash: 'cardiometabolic/BP_722' },
    ],
  },
  {
    id: 'glucose',
    name: '血糖',
    cells: [
      { label: '血糖三指標', hash: 'learn/checkup/L-CHK-03' },
      { label: '醣、糖與纖維', hash: 'learn/eat/L-EAT-03' },
      { label: '久坐與運動零食', hash: 'learn/move/L-MOVE-04' },
      { label: '糖尿病照護路徑', hash: 'clinic/endocrine/t2dm' },
      { label: '糖尿病前期逆轉', hash: 'learn/prevent/L-PRE-03' },
    ],
  },
  {
    id: 'lipid',
    name: '血脂',
    cells: [
      { label: '你的 LDL 目標', hash: 'learn/checkup/L-CHK-04' },
      { label: '換油比少油重要', hash: 'learn/eat/L-EAT-04' },
      { label: '心率區間與 Zone 2', hash: 'learn/move/L-MOVE-05' },
      { label: '高血脂照護路徑', hash: 'clinic/endocrine/osteoporosis_dyslipidemia' },
      { label: 'ApoB 試算', hash: 'cardiometabolic/CALCULATORS' },
    ],
  },
];

export const THREE_HIGHS_SOURCES = [
  { label: '2025 AHA/ACC 高血壓指引', url: 'https://doi.org/10.1161/CIR.0000000000001356' },
  { label: 'ADA 2026 糖尿病照護標準', url: 'https://diabetesjournals.org/care/issue/49/Supplement_1' },
  { label: '台灣 2022 高血壓指引（722）', url: 'https://doi.org/10.1097/JCMA.0000000000000678' },
  { label: 'AHA 2023 CKM 症候群', url: 'https://doi.org/10.1161/CIR.0000000000001184' },
  { label: '國健署代謝症候群標準', url: 'https://www.hpa.gov.tw/' },
];

// ── 我的數字 ──────────────────────────────────────────────────

export interface ReportInput {
  sex: 'M' | 'F';
  heightCm?: number;
  weightKg?: number;
  waistCm?: number;
  sys?: number;
  dia?: number;
  fpg?: number;
  a1c?: number;
  ldl?: number;
  tg?: number;
  hdl?: number;
}

export interface ReportRow {
  id: string;
  group: ConditionId;
  name: string;
  value: string;
  band: BandResult;
}

export interface ReportSummary {
  rows: ReportRow[];
  metSyn: { met: number; known: number };
  ckmStage: 0 | 1 | 2 | null;
  ckmNote: string;
  needsDoctorSoon: boolean;
  priorities: ConditionId[];
}

/** Rough CKM floor from report numbers. Stages 3–4 need history or imaging, so they are never inferred. */
function ckmFloor(r: ReportInput, metSynMet: number, bmi: number | undefined): ReportSummary['ckmStage'] {
  const any = r.waistCm || bmi || r.sys || r.fpg || r.a1c || r.tg;
  if (!any) return null;
  const isHtn = (r.sys ?? 0) >= 130 || (r.dia ?? 0) >= 80;
  const isDm = (r.a1c ?? 0) >= 6.5 || (r.fpg ?? 0) >= 126;
  if (isHtn || isDm || (r.tg ?? 0) >= 135 || metSynMet >= 3) return 2;
  const waistHigh = r.waistCm ? r.waistCm >= (r.sex === 'M' ? 90 : 80) : false;
  const preDm = (r.a1c ?? 0) >= 5.7 || (r.fpg ?? 0) >= 100;
  if ((bmi ?? 0) >= 24 || waistHigh || preDm) return 1;
  return 0;
}

export function summarizeReport(r: ReportInput): ReportSummary {
  const rows: ReportRow[] = [];
  const push = (id: string, group: ConditionId, name: string, value: string, band: BandResult | null) => {
    if (band) rows.push({ id, group, name, value, band });
  };
  const bmi = r.weightKg && r.heightCm ? classifyBMI(r.weightKg, r.heightCm) : null;
  if (bmi) push('bmi', 'weight', 'BMI', String(bmi.value), bmi);
  if (r.waistCm) push('waist', 'weight', '腰圍', `${r.waistCm} 公分`, classifyWaist(r.waistCm, r.sex));
  if (r.sys && r.dia) push('bp', 'bp', '血壓', `${r.sys}/${r.dia} mmHg`, classifyBP(r.sys, r.dia));
  if (r.fpg) push('fpg', 'glucose', '空腹血糖', `${r.fpg} mg/dL`, classifyFPG(r.fpg));
  if (r.a1c) push('a1c', 'glucose', 'HbA1c', `${r.a1c}%`, classifyA1c(r.a1c));
  if (r.ldl) push('ldl', 'lipid', 'LDL', `${r.ldl} mg/dL`, classifyLDL(r.ldl));
  if (r.tg) push('tg', 'lipid', '三酸甘油酯', `${r.tg} mg/dL`, classifyTG(r.tg));
  if (r.hdl) push('hdl', 'lipid', 'HDL', `${r.hdl} mg/dL`, classifyHDL(r.hdl, r.sex));

  const metSyn = countMetSyn({ sex: r.sex, waistCm: r.waistCm, sys: r.sys, dia: r.dia, fpg: r.fpg, tg: r.tg, hdl: r.hdl });
  const ckmStage = ckmFloor(r, metSyn.met, bmi?.value);
  const ckmNote =
    ckmStage === null
      ? ''
      : ckmStage === 2
      ? '已有代謝危險因子。第 3、4 期要看心血管檢查與病史，這裡無法判斷。'
      : ckmStage === 1
      ? '脂肪過多或糖尿病前期範圍，是最值得介入的階段。'
      : '目前輸入的數字沒有達到第 1 期條件。沒輸入的項目不算在內。';

  const rank = { bad: 0, warn: 1, neutral: 2, good: 3 } as const;
  const order = new Map<ConditionId, number>();
  rows.forEach((row) => {
    const score = rank[row.band.tone];
    const prev = order.get(row.group);
    if (score < 3 && (prev === undefined || score < prev)) order.set(row.group, score);
  });
  const priorities = [...order.entries()].sort((a, b) => a[1] - b[1]).map(([g]) => g);

  return {
    rows,
    metSyn,
    ckmStage,
    ckmNote,
    needsDoctorSoon: rows.some((x) => x.band.tone === 'bad' && x.id !== 'bmi'),
    priorities,
  };
}

export const EXAMPLE_REPORT: ReportInput = {
  sex: 'M',
  heightCm: 172,
  weightKg: 84,
  waistCm: 95,
  sys: 134,
  dia: 84,
  fpg: 108,
  a1c: 5.9,
  ldl: 138,
  tg: 186,
  hdl: 38,
};
