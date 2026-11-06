/**
 * 猛健樂（tirzepatide）專章的內容與判斷邏輯。
 *
 * 原則：
 * - 劑量、警語、儲存與副作用發生率一律取自美國 Zepbound 仿單（2026-08 修訂版）；台灣使用者仍以
 *   包裝內仿單與處方醫師指示為準。
 * - 試驗數字標明是哪個試驗、幾週、哪個劑量。跨試驗比較只當參考。
 * - 所有工具都是「帶去和醫師討論」的整理，不輸出處方。
 * - 邏輯是純函式，由 src/compose/__tests__/tirzepatide.test.ts 鎖定。
 */

export interface TzpSource {
  id: string;
  label: string;
  detail: string;
  url: string;
}

const pubmed = (term: string) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(term)}`;

export const TZP_SOURCES: TzpSource[] = [
  { id: 'label', label: 'Zepbound 美國仿單', detail: 'Eli Lilly，2026-08 修訂', url: 'https://pi.lilly.com/us/zepbound-uspi.pdf' },
  { id: 'tfda2026', label: '食藥署：誤用瘦瘦針恐傷身', detail: '2026-02-07 新聞稿', url: 'https://www.fda.gov.tw/Tc/newsContent.aspx?cid=4&id=t624106' },
  { id: 'tfda2025', label: '食藥署：猛健樂適應症與供貨', detail: '2025-11-10 新聞稿', url: 'https://www.fda.gov.tw/tc/newsContent.aspx?cid=4&id=t623895' },
  { id: 's1', label: 'SURMOUNT-1', detail: 'Jastreboff et al. NEJM 2022', url: 'https://doi.org/10.1056/NEJMoa2206038' },
  { id: 's1-3y', label: 'SURMOUNT-1 三年追蹤', detail: 'Jastreboff et al. NEJM 2025', url: 'https://doi.org/10.1056/NEJMoa2410819' },
  { id: 's2', label: 'SURMOUNT-2（第 2 型糖尿病）', detail: 'Garvey et al. Lancet 2023', url: pubmed('SURMOUNT-2 tirzepatide Garvey Lancet 2023') },
  { id: 's3', label: 'SURMOUNT-3（先強化生活介入）', detail: 'Wadden et al. Nat Med 2023', url: 'https://doi.org/10.1038/s41591-023-02597-w' },
  { id: 's4', label: 'SURMOUNT-4（停藥試驗）', detail: 'Aronne et al. JAMA 2024', url: pubmed('SURMOUNT-4 tirzepatide Aronne JAMA 2024') },
  { id: 's4-regain', label: 'SURMOUNT-4 停藥復胖分析', detail: 'Horn et al. JAMA Intern Med 2025', url: pubmed('SURMOUNT-4 weight regain cardiometabolic Horn JAMA Internal Medicine 2025') },
  { id: 'maintain', label: 'SURMOUNT-MAINTAIN（減量維持）', detail: 'Horn et al. Lancet 2026', url: pubmed('SURMOUNT-MAINTAIN tirzepatide maintenance Lancet 2026') },
  { id: 's5', label: 'SURMOUNT-5（對決 semaglutide）', detail: 'Aronne et al. NEJM 2025', url: 'https://www.nejm.org/doi/abs/10.1056/NEJMoa2416394' },
  { id: 'cn', label: 'SURMOUNT-CN（中國成人）', detail: 'Zhao et al. JAMA 2024', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11337071' },
  { id: 'j', label: 'SURMOUNT-J（日本成人）', detail: 'Lancet Diabetes Endocrinol 2025', url: pubmed('SURMOUNT-J tirzepatide Japanese obesity Lancet Diabetes Endocrinology') },
  { id: 'osa', label: 'SURMOUNT-OSA（睡眠呼吸中止）', detail: 'Malhotra et al. NEJM 2024', url: 'https://doi.org/10.1056/NEJMoa2403943' },
  { id: 'dxa', label: 'SURMOUNT-1 體組成次研究', detail: 'Look et al. Diabetes Obes Metab 2025', url: 'https://doi.org/10.1111/dom.16275' },
  { id: 'abpm', label: 'SURMOUNT-1 動態血壓次研究', detail: 'de Lemos et al. Hypertension 2024', url: 'https://doi.org/10.1161/HYPERTENSIONAHA.123.22022' },
  { id: 'cvot', label: 'SURPASS-CVOT（心血管結果）', detail: 'Nicholls et al. NEJM 2025', url: pubmed('SURPASS-CVOT tirzepatide dulaglutide Nicholls NEJM 2025') },
  { id: 'summit', label: 'SUMMIT（射出分率保留心衰竭）', detail: 'Packer et al. NEJM 2025', url: 'https://doi.org/10.1056/NEJMoa2410027' },
  { id: 'synergy', label: 'SYNERGY-NASH（脂肪肝炎第 2 期）', detail: 'Loomba et al. NEJM 2024', url: 'https://doi.org/10.1056/NEJMoa2401943' },
  { id: 'advisory', label: 'GLP-1 治療營養聯合共識', detail: 'Mozaffarian et al. AJCN 2025', url: 'https://doi.org/10.1016/j.ajcnut.2025.04.023' },
  { id: 'gi', label: '腸胃副作用處理專家共識', detail: 'Gorgojo-Martínez et al. J Clin Med 2023', url: 'https://doi.org/10.3390/jcm12010145' },
  { id: 'nice', label: 'NICE TA1026', detail: '英國 tirzepatide 使用與停用評估', url: 'https://www.nice.org.uk/guidance/ta1026' },
  { id: 'who', label: 'WHO GLP-1 肥胖用藥指引', detail: '2025-12', url: 'https://www.who.int/news/item/01-12-2025-who-issues-global-guideline-on-the-use-of-glp-1-medicines-in-treating-obesity' },
  { id: 'periop', label: '手術前後多學會指引', detail: 'ASMBS／ASA／AGA／ISPCOP／SAGES 2024', url: 'https://gastro.org/press-releases/most-patients-can-continue-glp-1-anti-obesity-drugs-before-surgery-2/' },
  { id: 'sglt2', label: 'SGLT2 抑制劑與酮酸中毒', detail: '紐西蘭 Medsafe 藥品安全公告，2024-12', url: 'https://www.medsafe.govt.nz/profs/PUArticles/December2024/Reminder-risk-factors-for-ketoacidosis-with-SGLT-2-inhibitors.html' },
  { id: 'fda-si', label: 'FDA 要求移除自殺意念警語', detail: '2026-01-13 藥品安全通訊', url: 'https://www.fda.gov/drugs/drug-safety-communications/fda-requests-removal-suicidal-behavior-and-ideation-warning-glucagon-peptide-1-receptor-agonist-glp' },
  { id: 'prime', label: 'KwikPen 排氣說明', detail: 'Eli Lilly 用藥問答', url: 'https://www.lilly.com/en-ca/medicines/medicine-faqs/mounjaro-kwikpen/important-prime' },
  { id: 'step1', label: 'STEP 1 延伸研究', detail: 'Wilding et al. Diabetes Obes Metab 2022', url: 'https://doi.org/10.1111/dom.14725' },
  { id: 'triumph', label: 'TRIUMPH-1（retatrutide）', detail: '2026 年公布的頂線結果', url: 'https://www.pharmacytimes.com/view/retatrutide-delivers-bariatric-level-weight-loss-pivotal-phase-3-triumph-1-trial' },
  { id: 'orfo', label: 'FDA 核准 orforglipron', detail: '2026-04-01', url: 'https://www.healio.com/news/endocrinology/20260401/fda-approves-orforglipron-an-oral-glp1-for-adults-with-obesity' },
  { id: 'awgs', label: '亞洲肌少症共識 AWGS 2019', detail: 'Chen et al. JAMDA 2020', url: 'https://doi.org/10.1016/j.jamda.2019.12.012' },
];

export const getTzpSource = (id: string): TzpSource => {
  const s = TZP_SOURCES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown tirzepatide source ${id}`);
  return s;
};

// ── 一分鐘重點 ─────────────────────────────────────────────────

export const FIVE_LEVERS = [
  { id: 'fit', title: '先確認適合你', body: '符合適應症、排除禁忌，並把三高用藥與備孕計畫先和醫師談好。' },
  { id: 'dose', title: '慢慢爬，停在對的劑量', body: '每階至少 4 週。目標是效果與耐受度的平衡，不是打到最高。' },
  { id: 'muscle', title: '保住肌肉', body: '蛋白質吃夠、每週至少 2 次肌力訓練。少了這段，減掉的不一定是你想減的。' },
  { id: 'side', title: '處理副作用，不要硬撐', body: '多數噁心集中在升劑量期。能調整就不必放棄，紅色警訊則要立刻就醫。' },
  { id: 'long', title: '當成長期治療規劃', body: '突然停藥多數人會復胖，三高數字也會回升。先想好維持方案，再開始。' },
] as const;

// ── 我適合嗎？ ─────────────────────────────────────────────────

export const CONTRAINDICATION_ITEMS = [
  { id: 'mtc', label: '本人或家人曾有甲狀腺髓質癌、第 2 型多發性內分泌腫瘤（MEN 2）', level: 'stop' },
  { id: 'allergy', label: '曾對 tirzepatide 或其成分發生嚴重過敏', level: 'stop' },
  { id: 'pregnant', label: '正在懷孕、計畫懷孕或哺乳中', level: 'stop' },
    { id: 'type1', label: '第 1 型糖尿病（未核准此用途，須由專科評估）', level: 'caution' },
  { id: 'gastroparesis', label: '嚴重胃輕癱（胃排空嚴重變慢，仿單不建議）', level: 'caution' },
  { id: 'pancreatitis', label: '曾得過胰臟炎', level: 'caution' },
  { id: 'gallbladder', label: '有膽結石、膽囊炎病史', level: 'caution' },
  { id: 'eating', label: '有厭食症、暴食後催吐等飲食疾患', level: 'caution' },
  { id: 'retinopathy', label: '糖尿病且有視網膜病變', level: 'caution' },
  { id: 'insulin', label: '正在用胰島素或磺醯尿素類（如 glimepiride）', level: 'caution' },
  { id: 'kidney', label: '慢性腎臟病，或曾因脫水造成急性腎損傷', level: 'caution' },
] as const;

export type ContraId = (typeof CONTRAINDICATION_ITEMS)[number]['id'];

export const COMORBIDITY_ITEMS = ['高血壓', '血脂異常', '第 2 型糖尿病', '睡眠呼吸中止', '心血管疾病'] as const;

export const bmiOf = (weightKg: number, heightCm: number): number => {
  const m = heightCm / 100;
  return m > 0 ? weightKg / (m * m) : 0;
};

export type FitVerdict = 'not_for_you' | 'meets_label' | 'meets_label_caution' | 'below_label_comorbid' | 'below_label';

export interface FitResult {
  verdict: FitVerdict;
  bmi: number;
  title: string;
  detail: string;
}

/** Reads the label's eligibility line; it never says a person should use the drug. */
export function assessFit(weightKg: number, heightCm: number, comorbidCount: number, flags: readonly ContraId[]): FitResult {
  const bmi = bmiOf(weightKg, heightCm);
  const stop = CONTRAINDICATION_ITEMS.filter((c) => c.level === 'stop' && flags.includes(c.id));
  const caution = CONTRAINDICATION_ITEMS.filter((c) => c.level === 'caution' && flags.includes(c.id));
  if (stop.length) {
    return {
      verdict: 'not_for_you',
      bmi,
      title: '目前不適合使用',
      detail: `你勾選的「${stop[0].label}」屬於不應使用的情況。體重管理還有其他選項，請和醫師討論。`,
    };
  }
  const meets = bmi >= 30 || (bmi >= 27 && comorbidCount >= 1);
  if (meets && caution.length) {
    return {
      verdict: 'meets_label_caution',
      bmi,
      title: '符合體位條件，但要先和醫師談',
      detail: `你勾選了 ${caution.length} 項需要特別評估的狀況。這不代表不能用，而是用藥方式、追蹤或其他藥物可能要調整。`,
    };
  }
  if (meets) {
    return {
      verdict: 'meets_label',
      bmi,
      title: '符合常見的體重管理適應條件',
      detail: '適應條件是 BMI ≥30，或 BMI ≥27 且至少一項體重相關共病。實際是否適合、用多久，仍由醫師評估。',
    };
  }
  if (bmi >= 24 && comorbidCount >= 1) {
    return {
      verdict: 'below_label_comorbid',
      bmi,
      title: '未達適應條件的體位，但已有代謝問題',
      detail: '亞洲人在較低 BMI 就可能出現代謝問題。先以飲食、運動與三高治療為主；是否超出適應症用藥，須由專科醫師權衡利弊。',
    };
  }
  return {
    verdict: 'below_label',
    bmi,
    title: '未達體重管理的適應條件',
    detail: '這個體位不在核准的適應範圍，也沒有為此設計的試驗。單純想再瘦一點不建議使用，請把重點放在飲食與肌力訓練。',
  };
}

// ── 效果有多大？（SURMOUNT-1，72 週，無糖尿病，ITT） ────────────

export const S1_DOSE_RESPONSE = [
  { arm: '安慰劑', pct: 3.1, over5: 34.5, over10: 18.8, over15: 8.8, over20: 3.1 },
  { arm: '5 mg', pct: 15.0, over5: 85.1, over10: 68.5, over15: 48.0, over20: 30.0 },
  { arm: '10 mg', pct: 19.5, over5: 88.9, over10: 78.1, over15: 66.6, over20: 50.1 },
  { arm: '15 mg', pct: 20.9, over5: 90.9, over10: 83.5, over15: 70.6, over20: 56.7 },
] as const;

export const POPULATION_RESULTS = [
  { group: '無糖尿病（SURMOUNT-1）', weeks: 72, placebo: -3.1, d10: -19.5, d15: -20.9, source: 's1', note: '平均 BMI 38，以西方族群為主' },
  { group: '第 2 型糖尿病（SURMOUNT-2）', weeks: 72, placebo: -3.2, d10: -12.8, d15: -14.7, source: 's2', note: '有糖尿病者平均減得較少，HbA1c 約降 2.1 個百分點' },
  { group: '日本成人（SURMOUNT-J）', weeks: 72, placebo: -1.7, d10: -17.8, d15: -22.7, source: 'j', note: '亞洲族群 72 週的資料' },
  { group: '中國成人（SURMOUNT-CN）', weeks: 52, placebo: -2.3, d10: -13.6, d15: -17.5, source: 'cn', note: '只追蹤 52 週，尚未到達完整效果' },
] as const;

/** Trial averages applied to one body weight. A range for planning, never a prediction. */
export function projectLoss(weightKg: number) {
  return S1_DOSE_RESPONSE.filter((d) => d.arm !== '安慰劑').map((d) => ({
    arm: d.arm,
    pct: d.pct,
    kg: Math.round(weightKg * d.pct) / 100,
    newWeight: Math.round(weightKg * (100 - d.pct)) / 100,
    under5: Math.round((100 - d.over5) * 10) / 10,
  }));
}

/** SURMOUNT-1 72-week change from baseline, Table 3 of the label. */
export const S1_CARDIOMETABOLIC = [
  { metric: '收縮壓', unit: 'mmHg', placebo: -1.0, d5: -6.6, d10: -7.7, d15: -7.4, take: '有改善，但不一定能取代降壓藥' },
  { metric: '舒張壓', unit: 'mmHg', placebo: -0.8, d5: -4.9, d10: -5.0, d15: -4.5, take: '和收縮壓一起下降' },
  { metric: '三酸甘油酯', unit: '%', placebo: -5.6, d5: -21.2, d10: -23.8, d15: -29.1, take: '改善最明顯的血脂項目' },
  { metric: 'HDL', unit: '%', placebo: -0.7, d5: 6.9, d10: 9.2, d15: 8.0, take: '好的膽固醇略升' },
  { metric: 'LDL', unit: '%', placebo: -1.7, d5: -4.6, d10: -5.6, d15: -7.1, take: '只降一點，不能取代 statin' },
  { metric: '腰圍', unit: 'cm', placebo: -4.0, d5: -14.0, d10: -17.7, d15: -18.5, take: '內臟脂肪下降的訊號' },
] as const;

export const HARD_OUTCOMES = [
  { title: '預防糖尿病', stat: '1.3% vs 13.3%', body: '糖尿病前期者追蹤 176 週，發展成第 2 型糖尿病的比例。停藥後部分效果會減弱。', source: 's1-3y' },
  { title: '睡眠呼吸中止', stat: '約少 50–59%', body: '中重度 OSA 合併肥胖，52 週呼吸中止指數下降幅度（安慰劑約 3%）。美國已核准此適應症。', source: 'osa' },
  { title: '射出分率保留心衰竭', stat: 'HR 0.62', body: '肥胖合併 HFpEF，心血管死亡或心衰惡化的風險下降。', source: 'summit' },
  { title: '心血管事件', stat: 'HR 0.92', body: '第 2 型糖尿病合併心血管疾病，對照 dulaglutide 達到不劣於，尚未證明優於。全死因 HR 0.84 屬探索性結果。', source: 'cvot' },
  { title: '脂肪肝炎', stat: '44–62% vs 10%', body: '第 2 期試驗 52 週，切片顯示脂肪肝炎緩解且纖維化未惡化。第 3 期試驗仍在進行。', source: 'synergy' },
] as const;

// ── 劑量階梯（仿單） ──────────────────────────────────────────

export interface DoseStep {
  mg: number;
  minWeeks: number;
  role: string;
  isMaintenance: boolean;
  note: string;
}

export const DOSE_STEPS: DoseStep[] = [
  { mg: 2.5, minWeeks: 4, role: '起始', isMaintenance: false, note: '讓腸胃適應用的，不是治療劑量，也不核准作為維持劑量。滿 4 週要往上，或和醫師討論。' },
  { mg: 5, minWeeks: 4, role: '可維持', isMaintenance: true, note: '第一個核准的維持劑量。SURMOUNT-1 平均 72 週減 15.0%。' },
  { mg: 7.5, minWeeks: 4, role: '過渡', isMaintenance: false, note: '升往 10 mg 的中繼站。若耐受度卡在這裡，請和醫師討論怎麼安排。' },
  { mg: 10, minWeeks: 4, role: '可維持', isMaintenance: true, note: '核准的維持劑量。SURMOUNT-1 平均 72 週減 19.5%。' },
  { mg: 12.5, minWeeks: 4, role: '過渡', isMaintenance: false, note: '升往 15 mg 的中繼站。' },
  { mg: 15, minWeeks: 0, role: '最高', isMaintenance: true, note: '仿單最高劑量。SURMOUNT-1 平均 72 週減 20.9%。不可再往上加，也不可縮短間隔。' },
];

export type Tolerance = 'fine' | 'mild' | 'severe';
export type Progress = 'on_track' | 'slow' | 'goal_met';

export interface StepInput {
  currentMg: number;
  weeksOnDose: number;
  tolerance: Tolerance;
  progress: Progress;
}

export type StepVerdict = 'wait' | 'hold_call' | 'extend' | 'must_step' | 'at_max' | 'stay' | 'can_discuss_up';

export interface StepAdvice {
  verdict: StepVerdict;
  title: string;
  detail: string;
}

/**
 * Turns the label's titration rule and the GI consensus into a discussion prompt for the
 * next visit. The order matters: safety first, then timing, then the label's floor, then benefit.
 */
export function stepAdvice({ currentMg, weeksOnDose, tolerance, progress }: StepInput): StepAdvice {
  if (tolerance === 'severe') {
    return {
      verdict: 'hold_call',
      title: '先不要升，今天就聯絡醫師',
      detail: '吃不下、喝不下或反覆嘔吐時繼續升劑量，脫水與急性腎損傷的風險會上升。醫師可能會請你暫停或降回前一階。若合併劇烈腹痛，請直接就醫。',
    };
  }
  if (currentMg >= 15) {
    return {
      verdict: 'at_max',
      title: '已是最高劑量',
      detail: '15 mg 是仿單上限，不可再加也不可縮短間隔。若效果不如預期，請和醫師檢視飲食、肌力訓練、睡眠與其他藥物，並討論手術或換藥等選項。',
    };
  }
  if (weeksOnDose < 4) {
    return {
      verdict: 'wait',
      title: '時間還不到',
      detail: `你在這個劑量才 ${weeksOnDose} 週，仿單要求每階至少 4 週。剛開始幾週的反應不代表最後效果，請先穩定下來。`,
    };
  }
  if (tolerance === 'mild') {
    return {
      verdict: 'extend',
      title: '可以考慮多留 2–4 週',
      detail: '專家共識建議：升劑量期間出現腸胃症狀時，可把這一階延長 2–4 週，等症狀穩定再升。升劑量沒有期限，多等幾週通常不影響長期效果。',
    };
  }
  if (currentMg === 2.5) {
    return {
      verdict: 'must_step',
      title: '依仿單應往 5 mg 前進',
      detail: '2.5 mg 只用來適應，不是治療也不是維持劑量。即使前幾週體重掉得不錯，也請和醫師討論升到 5 mg。',
    };
  }
  if (progress === 'goal_met') {
    return {
      verdict: 'stay',
      title: '已達目標，先不需要升',
      detail: '仿單允許依效果與耐受度選擇維持劑量。接著請和醫師討論長期維持方案，不要自行停藥。',
    };
  }
  if (progress === 'on_track') {
    if (DOSE_STEPS.find((d) => d.mg === currentMg)?.isMaintenance) {
      return {
        verdict: 'stay',
        title: '留在這個劑量是合理的選擇',
        detail: '只要體重與三高數字持續改善、沒有吃不夠的問題，不一定要為了升而升。不過試驗平均顯示高劑量減得較多，若日後停滯可以再討論。',
      };
    }
    return {
      verdict: 'can_discuss_up',
      title: '這是過渡劑量，和醫師討論下一步',
      detail: '7.5 與 12.5 mg 在仿單中屬於升劑量的中繼站。請和醫師討論要繼續往上，還是回到可維持的劑量。',
    };
  }
  return {
    verdict: 'can_discuss_up',
    title: '可以和醫師討論升一階',
    detail: '已滿 4 週、耐受良好但進展變慢時，升 2.5 mg 是仿單允許的做法。先檢查蛋白質、活動量與是否多了容易增重的藥物，再一起決定。',
  };
}

// ── 怎麼打 ─────────────────────────────────────────────────────

export const INJECTION_STEPS = [
  { title: '確認', body: '每週固定一天，一天中任何時間都可以，飯前飯後都行。藥液應為無色至淡黃、澄清無顆粒。' },
  { title: '裝新針頭', body: 'KwikPen 一支四劑，每次都換新針頭，並依說明書排氣。排氣的步驟每一劑都要做。' },
  { title: '選部位', body: '腹部、大腿前側；上臂後側請別人幫忙。每次換位置，避開傷口與硬塊。' },
  { title: '注射', body: '消毒後垂直入針，把按鈕壓到底，視窗回到 0 後慢數 5 秒再拔針。細節以藥師示範與包裝內說明書為準。' },
  { title: '收拾', body: '取下針頭丟入硬質容器，交回醫療院所或藥局。筆蓋回去，放回原盒。打完四劑即丟棄，殘留藥液不可抽取使用。' },
] as const;

export const MISSED_DOSE_RULES = [
  { when: '漏打未滿 4 天（96 小時）', action: '想到就補打，之後回到原本固定的那一天。' },
  { when: '漏打超過 4 天', action: '跳過這次，下次固定那天再打。不要連打兩劑。' },
  { when: '想換打針日', action: '兩劑之間至少隔 3 天（72 小時）。' },
  { when: '連續漏打好幾週', action: '先問醫師。依停藥長短，可能需要從較低劑量重新開始，以減少腸胃反應。' },
] as const;

export const STORAGE_RULES = [
  { type: 'KwikPen（一支四劑）未開封', rule: '冰箱 2–8°C 可放到效期；若放室溫（≤30°C），30 天內要丟棄。' },
  { type: 'KwikPen 開始使用後', rule: '放冰箱或室溫（≤30°C）都可以，放回原盒避光，30 天後丟棄。' },
  { type: '單劑型注射筆', rule: '冰箱保存；需要時可在 ≤30°C 累計放 21 天。' },
  { type: '所有筆型', rule: '不可冷凍，結凍過就不能用。不可放車內或曝曬。絕不可與他人共用，即使換了針頭也一樣。' },
] as const;

// ── 保住肌肉 ──────────────────────────────────────────────────

export const IDEAL_BMI = 22;

export interface ProteinPlan {
  bmi: number;
  idealKg: number;
  referenceKg: number;
  lowG: number;
  highG: number;
  perMealLow: number;
  perMealHigh: number;
}

/**
 * Joint advisory (AJCN 2025): 1.2–1.6 g/kg/d is proposed during active weight reduction, using
 * actual weight overestimates need in obesity, and ≥2 g/kg/d long term should be avoided.
 * With no consensus on the reference weight, higher-BMI readers use an adjusted weight (ideal +
 * 25% of the excess), which lands inside the advisory's practical 80–120 g/d for most adults.
 */
export function proteinPlan(weightKg: number, heightCm: number): ProteinPlan {
  const m = heightCm / 100;
  const idealKg = IDEAL_BMI * m * m;
  const bmi = bmiOf(weightKg, heightCm);
  const referenceKg = bmi >= 27 ? idealKg + 0.25 * (weightKg - idealKg) : weightKg;
  const lowG = Math.round(referenceKg * 1.2);
  const highG = Math.round(referenceKg * 1.6);
  return {
    bmi,
    idealKg: Math.round(idealKg * 10) / 10,
    referenceKg: Math.round(referenceKg * 10) / 10,
    lowG,
    highG,
    perMealLow: Math.round(lowG / 4),
    perMealHigh: Math.round(highG / 3),
  };
}

/** 國健署食物代換：豆魚蛋肉一份 = 7 g 蛋白質；乳品一份 = 8 g。乳清依常見產品估算。 */
export const PROTEIN_FOODS = [
  { id: 'egg', name: '雞蛋', portion: '1 顆', g: 7 },
  { id: 'soy', name: '無糖豆漿', portion: '190 mL', g: 7 },
  { id: 'tofu', name: '傳統豆腐', portion: '80 g', g: 7 },
  { id: 'silken', name: '嫩豆腐', portion: '半盒 140 g', g: 7 },
  { id: 'edamame', name: '毛豆仁', portion: '50 g', g: 7 },
  { id: 'chicken', name: '雞胸肉', portion: '30 g', g: 7 },
  { id: 'fish', name: '魚肉', portion: '35 g', g: 7 },
  { id: 'shrimp', name: '蝦仁', portion: '50 g', g: 7 },
  { id: 'milk', name: '低脂牛奶', portion: '240 mL', g: 8 },
  { id: 'yogurt', name: '無糖希臘優格', portion: '100 g', g: 9 },
  { id: 'whey', name: '乳清蛋白', portion: '1 匙', g: 22 },
] as const;

export const MUSCLE_ACTIONS = [
  { title: '肌力訓練', dose: '每週至少 2 次，全身大肌群', body: '深蹲、臀推、划船、推舉，重量逐步增加。沒有肌力訓練，只吃蛋白質很可能不夠。有氧保留肌肉的效果較小。' },
  { title: '有氧活動', dose: '每週 150 分鐘以上', body: '快走、騎車、游泳。試驗中的基本要求就是至少 150 分鐘，並少吃約 500 大卡。' },
  { title: '吃的順序', dose: '蛋白質先吃', body: '胃口小時先吃蛋、魚、豆腐。吃不下就分成 4–5 小餐，設鬧鐘提醒，或用湯、豆漿、優格補足。' },
  { title: '不要吃太少', dose: '留意女 <1,200、男 <1,800 大卡', body: '低於這個範圍較容易缺鐵、鈣、鎂、維生素 D 與 B12。可請營養師評估，必要時補充綜合維他命。' },
] as const;

export const MUSCLE_CHECKS = [
  { title: '5 次椅子起立', cut: '≥12 秒要注意', body: '雙手交叉胸前，起立坐下 5 次。比體脂機更能看出功能。' },
  { title: '握力', cut: '男 <28 公斤、女 <18 公斤', body: 'AWGS 2019 的肌少症篩檢門檻。力量持續下降就要和醫師討論。' },
  { title: '爬樓梯與日常力氣', cut: '比以前吃力就記下來', body: '肌力下滑時先檢查熱量、蛋白質與訓練，必要時討論調降劑量。' },
] as const;

export const SUPPLEMENT_NOTES = [
  { name: '綜合維他命、維生素 D、鈣、B12', verdict: '吃得少時可考慮', body: '聯合共識建議針對高風險營養素、依個人狀況補充，並定期檢查。' },
  { name: '肌酸', verdict: '可討論', body: '對肌力訓練者有實證，但尚無在此類藥物使用者的大型試驗。腎臟病請先問醫師；肌酸會讓 eGFR 看起來偏低。' },
  { name: '高劑量魚油', verdict: '不必例行使用', body: '目的只是減重或保肌時沒有理由吃。三酸甘油酯很高時才由醫師決定，高劑量與心房顫動風險增加有關。' },
  { name: '鹽或電解質粉', verdict: '不要自行加鹽', body: '有高血壓者不應額外加鹽。只有在嘔吐腹瀉時才考慮口服電解質液，反覆發生請就醫。' },
] as const;

// ── 副作用 ─────────────────────────────────────────────────────

/** Common adverse reactions, %, pool of Studies 1 and 2 (label Table 1). */
export const AE_RATES = [
  { name: '噁心', placebo: 8, d5: 25, d10: 29, d15: 28 },
  { name: '腹瀉', placebo: 8, d5: 19, d10: 21, d15: 23 },
  { name: '便秘', placebo: 5, d5: 17, d10: 14, d15: 11 },
  { name: '嘔吐', placebo: 2, d5: 8, d10: 11, d15: 13 },
  { name: '腹痛', placebo: 5, d5: 9, d10: 9, d15: 10 },
  { name: '消化不良', placebo: 4, d5: 9, d10: 9, d15: 10 },
  { name: '注射部位反應', placebo: 2, d5: 6, d10: 8, d15: 8 },
  { name: '掉髮', placebo: 1, d5: 5, d10: 4, d15: 5 },
] as const;

export interface SideEffect {
  id: string;
  name: string;
  rate: string;
  why: string;
  selfCare: string[];
  askDoctor: string;
  urgent: string;
}

export const SIDE_EFFECTS: SideEffect[] = [
  {
    id: 'nausea',
    name: '噁心',
    rate: '25–29%（安慰劑 8%）',
    why: '藥物作用在腦部飽足中樞，也讓胃排空變慢。多半出現在升劑量期，之後會減輕；早上或空腹太久時常更明顯。',
    selfCare: ['早上先吃一小份，之後每 3–4 小時少量吃一點', '吃慢一點，有飽足感就停', '選低脂、清淡的食物，避開油炸與重口味', '小口喝水，薑茶或薄荷茶可以試試', '吃完不要馬上躺下'],
    askDoctor: '可短期使用止吐藥（不同藥物有不同副作用，如 ondansetron 可能加重便秘）。若症狀持續，可把這一階多留 2–4 週。',
    urgent: '反覆嘔吐、喝不下水、尿量明顯變少',
  },
  {
    id: 'vomit',
    name: '嘔吐',
    rate: '8–13%（安慰劑 2%）',
    why: '大餐後特別容易發生。真正要小心的是脫水，脫水可能造成急性腎損傷。',
    selfCare: ['先暫停固體食物，小口慢慢補水', '恢復後從少量、清淡開始', '避免一次吃很多'],
    askDoctor: '吐超過一次就和醫師聯絡，討論下一劑要不要暫停或降劑量。有服用利尿劑、ACEi／ARB 或 SGLT2 抑制劑者，要問生病時是否暫停。',
    urgent: '喝不下水超過 24 小時、頭暈、尿少、血便或吐血',
  },
  {
    id: 'diarrhea',
    name: '腹瀉',
    rate: '19–23%（安慰劑 8%）',
    why: '藥物影響腸道蠕動與分泌，大份或高脂餐點容易誘發。',
    selfCare: ['多補水，需要時用口服電解質液', '避免大餐、高脂食物與代糖（山梨醇等）', '暫時減少咖啡、酒精與高纖食物，再慢慢加回來'],
    askDoctor: '排除感染後可短期使用止瀉藥。腹瀉和便秘交替時，要想到便秘造成的溢流性腹瀉。',
    urgent: '發燒、血便，或脫水症狀',
  },
  {
    id: 'constipation',
    name: '便秘',
    rate: '11–17%（安慰劑 5%）',
    why: '吃得少、腸道變慢再加上水分不足。上市後也有嚴重便秘、糞便阻塞與腸阻塞的通報。',
    selfCare: ['及早處理，不要等幾天', '喝足水，慢慢增加蔬菜、水果與黑棗乾', '每天走動'],
    askDoctor: '可討論鎂鹽或 PEG 3350（腎臟病者不適合自行使用鎂鹽）。若持續惡化，可能需要調整劑量。',
    urgent: '腹脹劇痛、嘔吐、完全不排氣',
  },
  {
    id: 'reflux',
    name: '胃酸逆流、打嗝',
    rate: '逆流 4–5%、打嗝 4–5%（安慰劑 1–2%）',
    why: '胃排空變慢，食物留在胃裡比較久。硫磺味打嗝也常和吃太多或高蛋白、高脂餐有關。',
    selfCare: ['少量多餐，睡前 3 小時不進食', '避開油炸、咖啡、巧克力、酒與氣泡飲', '吃完保持坐姿或散步'],
    askDoctor: '可短期使用制酸藥或氫離子幫浦抑制劑。症狀多半會隨減重改善。',
    urgent: '吞嚥困難、胸痛、吐血或黑便',
  },
  {
    id: 'pain',
    name: '腹痛',
    rate: '9–10%（安慰劑 5%）',
    why: '輕微悶痛多和脹氣、便秘有關。但持續劇痛要排除胰臟炎與膽囊炎。',
    selfCare: ['記下位置、時間與吃了什麼', '輕微時先處理便秘與脹氣'],
    askDoctor: '反覆腹痛請告知醫師。膽囊炎在試驗中約 0.7%（安慰劑 0.2%），和減重有關。',
    urgent: '持續劇烈上腹痛（可能延伸到背部）；右上腹痛合併發燒或黃疸',
  },
  {
    id: 'lowfood',
    name: '完全吃不下',
    rate: '常見，但試驗未單獨統計',
    why: '食慾下降是藥效的一部分，但吃太少會掉肌肉、缺營養，也可能讓人覺得生活失去樂趣。',
    selfCare: ['設鬧鐘提醒，不要等餓才吃', '先吃蛋白質，再吃其他', '用湯、豆漿、優格、奶昔補足', '記錄 3 天飲食給營養師看'],
    askDoctor: '若持續吃得非常少、體重掉太快或肌力下降，請和醫師討論降回前一階。',
    urgent: '站不穩、昏厥、明顯虛弱',
  },
  {
    id: 'hair',
    name: '掉髮',
    rate: '4–5%（安慰劑 1%）',
    why: '常與快速減重有關，多半是暫時性的休止期落髮。',
    selfCare: ['蛋白質與熱量吃夠', '避免過度極端的飲食'],
    askDoctor: '掉髮持續時，可檢查鐵質、甲狀腺與其他原因。',
    urgent: '通常不需要急診',
  },
  {
    id: 'dizzy',
    name: '頭暈、血壓低、低血糖',
    rate: '頭暈 4–5%；低血壓 1.6%（安慰劑 0.1%）',
    why: '體重下降後血壓與血糖都會下降，原本的三高用藥可能變得太強，脫水也會讓情況更明顯。',
    selfCare: ['起身放慢，補足水分', '量血壓、血糖並記錄', '低血糖時吃 15 公克糖，15 分鐘後再測'],
    askDoctor: '請帶紀錄和醫師討論調藥。不要自行停藥，也不要硬撐。',
    urgent: '昏倒、意識混亂；低血糖無法自行進食時撥 119',
  },
];

export const RED_FLAGS = [
  { sign: '持續或劇烈的上腹痛，可能延伸到背部，可能合併嘔吐', meaning: '急性胰臟炎', action: '停打，立刻到急診。若確診請勿自行再用。' },
  { sign: '右上腹痛、發燒、皮膚或眼白變黃', meaning: '膽囊炎、膽道問題', action: '當天就醫。' },
  { sign: '反覆嘔吐或腹瀉、喝不下水、尿量明顯變少、頭暈', meaning: '脫水、急性腎損傷', action: '當天就醫，告知使用此藥與其他用藥。' },
  { sign: '嘴唇、舌頭、臉腫脹，呼吸困難，全身起疹', meaning: '嚴重過敏', action: '停打，撥 119。' },
  { sign: '腹脹劇痛、嘔吐、完全不排氣', meaning: '腸阻塞、腸麻痺', action: '立刻到急診。' },
  { sign: '脖子腫塊、吞嚥困難、呼吸喘、持續聲音沙啞', meaning: '需排除甲狀腺腫瘤', action: '盡快就診。' },
  { sign: '冷汗、發抖、心悸、意識混亂', meaning: '低血糖', action: '清醒時吃 15 公克糖；意識不清撥 119。之後告知醫師調藥。' },
  { sign: '視力突然模糊或喪失', meaning: '眼部問題，糖尿病者尤其注意', action: '當天看眼科。' },
  { sign: '發現懷孕', meaning: '藥物可能傷害胎兒', action: '停打，並聯絡婦產科與處方醫師。' },
] as const;

// ── 三高用藥 ───────────────────────────────────────────────────

export const THREE_HIGH_MEDS = [
  {
    id: 'bp',
    title: '高血壓',
    effect: '收縮壓平均降 6.6–7.7 mmHg；動態血壓研究中，相對安慰劑多降約 7–11 mmHg。',
    risk: '血壓可能降太多。試驗中低血壓 1.6%（安慰劑 0.1%），合併降壓藥者 2.2%。',
    plan: ['開始前先做一週 722 居家血壓', '升劑量期間每週量幾天，頭暈時也量', '血壓偏低或頭暈時，帶紀錄請醫師調降藥物', '上吐下瀉時，問醫師 ACEi／ARB、利尿劑要不要暫停'],
    never: '不要因為數字變好就自行停藥。',
  },
  {
    id: 'glucose',
    title: '高血糖',
    effect: '第 2 型糖尿病 72 週 HbA1c 約降 2.1 個百分點；糖尿病前期多數回到正常血糖。',
    risk: '合併磺醯尿素時低血糖 10.3%（未合併 2.1%），合併胰島素風險也會上升。血糖快速改善時，視網膜病變可能暫時惡化。',
    plan: ['開始前請醫師評估是否先調降胰島素或磺醯尿素', '升劑量期間多測血糖', '有視網膜病變者，開始前後都要追蹤眼底', '不與 DPP-4 抑制劑或其他 GLP-1 藥物疊加，請先確認處方'],
    never: '胰島素要由醫師調整，不要自行停掉。',
  },
  {
    id: 'lipid',
    title: '高血脂',
    effect: '三酸甘油酯降 21–29%，HDL 升 7–9%，但 LDL 只降約 5–7%。',
    risk: '最大的風險是誤以為可以停 statin。若三酸甘油酯非常高，還要留意胰臟炎風險。',
    plan: ['LDL 目標依心血管風險決定，並不因用藥而改變', '用藥約 3 個月後複查血脂', '繼續原本的 statin 或其他降血脂藥，由醫師調整'],
    never: '猛健樂不能取代 statin。',
  },
  {
    id: 'other',
    title: '其他要告知的用藥',
    effect: '胃排空變慢，可能影響口服藥吸收，第一劑影響最大，之後逐漸減少。',
    risk: '治療範圍窄的藥物（如 warfarin）需要監測。口服避孕藥效果可能下降。',
    plan: ['口服避孕藥：開始後 4 週及每次升劑量後 4 週，改非口服方式或加用保險套', 'warfarin 使用者要追蹤 INR', '手術、胃鏡、大腸鏡或全身麻醉前，一定要告訴醫療團隊', '多學會指引：多數人可繼續使用，風險較高者術前 24 小時改流質飲食，請依麻醉團隊指示'],
    never: '不要隱瞞用藥，麻醉時有吸入性肺炎的通報。',
  },
] as const;

export const MONITORING = [
  { when: '開始前', items: '體重、腰圍、722 血壓、空腹血糖或 HbA1c、血脂、肝腎功能；糖尿病者加眼底檢查；肌力基準；用藥清單與避孕計畫' },
  { when: '每次升劑量', items: '副作用、飲水與進食量、體重；有用降壓或降血糖藥者加測血壓與血糖' },
  { when: '約 3 個月', items: '血脂、血糖或 HbA1c；有腸胃症狀者加驗腎功能；檢視蛋白質與肌力訓練是否落實' },
  { when: '最高耐受劑量滿 6 個月', items: '若較起始體重減輕未達 5%，依整體效益與風險共同決定是否繼續；這是 NICE 的評估點，不是從第一針起算，也不是自動停藥規則' },
  { when: '每年', items: '抽血與尿液檢查、三高目標、用藥是否可減；停經後或骨鬆高風險者評估骨密度' },
] as const;

// ── 長期與停藥 ─────────────────────────────────────────────────

/** Mean % weight change from baseline. Each block lists its own timeline; never connect across trials. */
export const SURMOUNT4_PATH = [
  { week: 0, continued: 0, withdrawn: 0 },
  { week: 36, continued: -20.9, withdrawn: -20.9 },
  { week: 88, continued: -25.3, withdrawn: -9.9 },
] as const;

export const MAINTAIN_ARMS = [
  { arm: '繼續原最高耐受劑量', short: '繼續原劑量', pct: 21.9, kept20: 55, rescue: 8 },
  { arm: '降到 5 mg', short: '降到 5 mg', pct: 16.6, kept20: 37, rescue: 25 },
  { arm: '換成安慰劑', short: '改安慰劑', pct: 9.9, kept20: 8, rescue: 67 },
] as const;

/** SURMOUNT-4 label Table 7: change during the 52 weeks after randomisation. */
export const WITHDRAWAL_METRICS = [
  { metric: '收縮壓', unit: 'mmHg', leadIn: -11.2, stopped: 8.2, continued: 2.0 },
  { metric: '腰圍', unit: 'cm', leadIn: -17.8, stopped: 7.8, continued: -4.3 },
  { metric: '三酸甘油酯', unit: '%', leadIn: -40.4, stopped: 13.5, continued: -4.8 },
  { metric: 'HbA1c', unit: '百分點', leadIn: -0.5, stopped: 0.3, continued: 0 },
] as const;

export const LONG_TERM_OPTIONS = [
  {
    id: 'continue',
    title: '繼續原劑量',
    evidence: '證據最強',
    body: 'SURMOUNT-4 與 SURMOUNT-MAINTAIN 都顯示維持效果最好。代價是持續的費用與長期用藥。',
  },
  {
    id: 'step5',
    title: '降到 5 mg 維持',
    evidence: '有隨機試驗',
    body: 'SURMOUNT-MAINTAIN：約保住 7 成的減重成果，比完全停藥好。個人差異大，並非每個人都守得住。',
  },
  {
    id: 'stop',
    title: '停藥，靠生活型態',
    evidence: '多數人會復胖',
    body: '82% 在一年內回升至少四分之一的減重量，但約 18% 回升較少。若要停，請先建立習慣、設定回診點，體重回升時及早處理。',
  },
  {
    id: 'interval',
    title: '自行拉長打針間隔',
    evidence: '沒有隨機試驗支持',
    body: '仿單是每週一次。拉長到 10–14 天沒有大型試驗證明能維持效果，也未確認血中濃度波動會不會讓副作用更明顯。因費用考量想調整，請先和醫師討論。',
  },
] as const;

export const PLATEAU_CHECKS = [
  '平台期是正常的。體重變輕後，身體需要的熱量也變少，食慾系統也會反彈。',
  '先確認有沒有漏打、藥品保存是否正確。',
  '用三個月的趨勢判斷，不要看單日數字。便秘與水分就可能造成 1–2 公斤波動。',
  '檢查飲料、點心、酒精；食慾回升時最容易悄悄增加。',
  '檢查是否正在使用容易增重的藥物，例如類固醇、部分抗憂鬱或抗精神病藥。',
  '睡眠不足與睡眠呼吸中止也會影響體重。',
  '腰圍下降、血壓血糖改善、肌力進步，也都算成果。',
];

// ── 迷思 ───────────────────────────────────────────────────────

export const TZP_MYTHS = [
  { myth: '打越高、瘦越快，效果越好', fact: '5→15 mg 的平均差距約 6 個百分點，但腸胃不適與停藥機率也上升。最佳劑量是你能長期維持、吃得下也練得動的那一個。' },
  { myth: '減掉的都是肌肉', fact: 'SURMOUNT-1 的 DXA 次研究：減掉的重量約 75% 是脂肪、25% 是去脂組織，比例和安慰劑組相近。但減得多，去脂組織的絕對量也多，所以訓練仍然重要。' },
  { myth: '打了就可以不用改飲食和運動', fact: '試驗受試者都有少吃約 500 大卡、每週運動 150 分鐘的諮詢。SURMOUNT-3 先做 12 週強化生活介入再用藥，總減幅約 24%。' },
  { myth: '三高數字變好，就能把藥停了', fact: '可能可以減藥，但要由醫師調整。LDL 下降很少，statin 通常要繼續。停藥後血壓、血糖與三酸甘油酯都會回升。' },
  { myth: '只要減到目標就可以停', fact: '肥胖是慢性疾病。SURMOUNT-4 停藥組一年內體重回升 14.0%，持續用藥組則再減 5.5%。' },
  { myth: '瘦瘦針會讓人想自殺', fact: 'FDA 2026 年回顧後認為沒有因果關係，已要求移除此警語，仿單也已更新。不過只要出現情緒問題或自傷想法，仍要立刻求助（1925 安心專線）。' },
  { myth: '網路便宜買也一樣', fact: '猛健樂是處方藥。食藥署提醒勿網購，來路不明可能買到假藥或保存不當的藥，出事也不適用藥害救濟。' },
] as const;

// ── 跟其他藥比 ─────────────────────────────────────────────────

export const INCRETIN_COMPARE = [
  { name: '猛健樂 tirzepatide', type: 'GIP＋GLP-1', route: '每週注射', trial: 'SURMOUNT-1，72 週', pct: 20.9, placebo: 3.1, status: '台灣已核准', highlight: '目前已上市減重藥中平均幅度最大；OSA、HFpEF 有試驗' },
  { name: '週纖達 semaglutide 2.4 mg', type: 'GLP-1', route: '每週注射', trial: 'STEP 1，68 週', pct: 14.9, placebo: 2.4, status: '台灣已核准', highlight: 'SELECT：有心血管疾病者重大事件減少 20%' },
  { name: '善纖達 liraglutide 3 mg', type: 'GLP-1', route: '每日注射', trial: 'SCALE，56 週', pct: 8.0, placebo: 2.6, status: '台灣已核准', highlight: '半衰期短，使用經驗久' },
  { name: 'Orforglipron（Foundayo）', type: '口服 GLP-1', route: '每日口服', trial: 'ATTAIN-1，72 週', pct: 11.2, placebo: 2.1, status: '美國 2026 核准，台灣請查食藥署', highlight: '不必打針，也不受進食喝水限制' },
  { name: 'Retatrutide', type: 'GIP＋GLP-1＋升糖素', route: '每週注射', trial: 'TRIUMPH-1，80 週（頂線）', pct: 28.3, placebo: null, status: '全球尚未核准', highlight: '網路上販售的都不是合法藥品，請勿購買' },
] as const;

// ── 看診清單 ───────────────────────────────────────────────────

export const VISIT_QUESTIONS = [
  '以我的 BMI、三高與其他病史，用藥的好處和風險是什麼？',
  '我的第一階段目標是多少？幾個月後要評估效果？',
  '我現在吃的降壓藥、降血糖藥、避孕藥或 warfarin 要不要調整？',
  '升劑量的計畫怎麼排？哪些副作用要主動聯絡？聯絡誰？',
  '要抽哪些血？多久追蹤一次？有需要檢查眼底或骨密度嗎？',
  '蛋白質和運動我該設多少？可以轉介營養師或運動專業嗎？',
  '每個月的費用大約多少？我有符合健保給付條件嗎？',
  '達到目標後怎麼維持？如果要減量或停藥，要怎麼安排？體重回升多少要回診？',
];

// ── 買藥與費用 ─────────────────────────────────────────────────

export const SAFE_BUY_POINTS = [
  { title: '只走合法管道', body: '瘦瘦針是處方藥，須由醫師評估開立、藥師調劑。食藥署提醒不要透過網路或來路不明管道購買。' },
  { title: '避開這些訊號', body: '不用看診就賣、社群代購、分裝針筒、標榜「比原廠便宜很多」、未冷藏寄送、外文包裝沒有中文標示。' },
  { title: '藥害救濟與通報', body: '水貨與網購出問題不適用國內藥害救濟。疑似不良反應應就醫，並通報全國藥物不良反應通報系統。' },
  { title: '費用怎麼想', body: '純減重目前多為自費，約每 4 週 1 萬元上下並隨劑量增加，依院所而異。第 2 型糖尿病在符合條件時才有健保給付，請向處方醫師確認。' },
] as const;
