/**
 * claims.ts — Salud Layer 1 QuantitativeClaim Registry
 *
 * Single Source of Truth for every quantitative medical number cited across Salud.
 * Guarantees uniqueness, comparator definitions, and compiler-level prohibition
 * of individual prescription declarations.
 */

import { QuantitativeClaim } from '../../types/knowledge';

export const CANONICAL_QUANTITATIVE_CLAIMS: Record<string, QuantitativeClaim> = {
  'CLAIM-ALDH2-HETERO-ACTIVITY': {
    id: 'CLAIM-ALDH2-HETERO-ACTIVITY',
    statement:
      'ALDH2 rs671 (Glu504Lys) 雜合子 *1/*2 在不同檢測方法與組織學下之殘存酵素活性約 10% 至 17–38% 之間。',
    value_kind: 'range',
    range_min: 10,
    range_max: 38,
    unit: '%',
    derivation: '文獻依受質親和力、粒線體裂解酵素活性與肝組織檢測方法呈現跨研究區間',
    is_individual_prescription: false,
    misuse_guard:
      '此為實驗室測得之酵素催化活性範圍，非固定常數；不可將範圍簡化為「固定剩 10%」或「絕對 20%」。',
  },

  'CLAIM-ALDH2-HOMO-ACTIVITY': {
    id: 'CLAIM-ALDH2-HOMO-ACTIVITY',
    statement: 'ALDH2 rs671 純合缺失 *2/*2 基因型之粒線體乙醛去氫酶活性接近 0%。',
    value_kind: 'point',
    numeric_value: 0,
    unit: '%',
    derivation: '四聚體活性位點完全因 Glu504Lys 構型變形而喪失活性',
    is_individual_prescription: false,
    misuse_guard: '純合子體內乙醛排除幾近停擺，即使微量飲酒亦可誘發急性毒性反應。',
  },

  'CLAIM-ALDH2-TAIWAN-PREVALENCE': {
    id: 'CLAIM-ALDH2-TAIWAN-PREVALENCE',
    statement:
      '台灣人口中約 45%–47% 帶有 ALDH2 rs671 變異等位基因（帶因者盛行率），對應等位基因頻率約 0.27–0.30。',
    value_kind: 'distribution',
    range_min: 45,
    range_max: 47,
    unit: '% 帶因者',
    derivation: '台灣人體生物資料庫 (Taiwan Biobank) 與台灣多中心世代研究流病抽樣統計',
    is_individual_prescription: false,
    misuse_guard:
      '必須嚴格區分「帶因者比例 (Carrier prevalence ~47%)」與「等位基因頻率 (Allele frequency ~0.28)」，混用將在基因遺傳推算上產生巨幅倍率誤差。',
  },

  'CLAIM-WHO-SFA-PCT': {
    id: 'CLAIM-WHO-SFA-PCT',
    statement: 'WHO 2023 飲食脂質指引建議：成人與兒童飽和脂肪酸 (SFA) 每日攝取量應小於總熱量之 10% (<10%E)。',
    value_kind: 'point',
    numeric_value: 10,
    unit: '%E',
    relative_to: '%E',
    derivation: '克數依個人每日總攝入熱量換算（2000 kcal 對應約 22.2 g；1200 kcal 對應約 13.3 g）',
    is_individual_prescription: false,
    misuse_guard:
      '總熱量比例是族群建議。直接寫為固定「22 g」對小熱量長者偏高、對重度勞動者偏低，UI 必須動態標註換算依據。',
  },

  'CLAIM-WHO-SODIUM': {
    id: 'CLAIM-WHO-SODIUM',
    statement: 'WHO 建議成人每日鈉離子攝取上限為 < 2000 mg（相當於食鹽 < 5 公克）。',
    value_kind: 'point',
    numeric_value: 2000,
    unit: 'mg/日',
    comparator: 'vs 高鈉攝取對應舒張壓與收縮壓降幅',
    is_individual_prescription: false,
    misuse_guard: '鈉敏感性具個體差異；嚴重慢性低血鈉或腎失鹽患者不可無限制限鈉。',
  },

  'CLAIM-WHO-POTASSIUM': {
    id: 'CLAIM-WHO-POTASSIUM',
    statement: 'WHO 建議成人每日鉀離子適當攝取量為 ≥ 3510 mg（90 mmol/日）。',
    value_kind: 'point',
    numeric_value: 3510,
    unit: 'mg/日',
    comparator: 'vs 低鉀攝取對應中風與高血壓預防',
    is_individual_prescription: false,
    misuse_guard:
      '高鉀建議嚴格禁忌於慢性腎臟病 (CKD G4–G5)、高血鉀症或服用保鉀利尿劑/RAAS抑制劑者，高血鉀可能引發致命性心室心律不整。',
  },

  'CLAIM-NASEM-WATER-MALE': {
    id: 'CLAIM-NASEM-WATER-MALE',
    statement: '美國 NASEM / IOM 建議健康成年男性每日總水分適當攝取量 (AI) 為 3.7 公升。',
    value_kind: 'point',
    numeric_value: 3.7,
    unit: 'L/日',
    derivation: '包含固體食物約 20% 水分與所有飲品約 80% 水分',
    is_individual_prescription: false,
    misuse_guard:
      '此為族群「總水分 (Total Water)」參考值，絕非要求個人每日「必須喝下 3.7 公升純白開水」。',
  },

  'CLAIM-NASEM-WATER-FEMALE': {
    id: 'CLAIM-NASEM-WATER-FEMALE',
    statement: '美國 NASEM / IOM 建議健康成年女性每日總水分適當攝取量 (AI) 為 2.7 公升。',
    value_kind: 'point',
    numeric_value: 2.7,
    unit: 'L/日',
    derivation: '包含固體食物約 20% 水分與所有飲品約 80% 水分',
    is_individual_prescription: false,
    misuse_guard: '解讀為純水攝取量會系統性高估約 20%~30%。',
  },

  'CLAIM-EFSA-WATER-MALE': {
    id: 'CLAIM-EFSA-WATER-MALE',
    statement: '歐洲 EFSA 建議溫和氣候與中度活動量成人男性每日總水攝取為 2.5 L/日。',
    value_kind: 'point',
    numeric_value: 2.5,
    unit: 'L/日',
    is_individual_prescription: false,
    misuse_guard: '與美加數值差異來自調查方法與生活型態定義，非對錯之分。',
  },

  'CLAIM-EFSA-WATER-FEMALE': {
    id: 'CLAIM-EFSA-WATER-FEMALE',
    statement: '歐洲 EFSA 建議溫和氣候與中度活動量成人女性每日總水攝取為 2.0 L/日。',
    value_kind: 'point',
    numeric_value: 2.0,
    unit: 'L/日',
    is_individual_prescription: false,
    misuse_guard: '族群參考值，個人應結合環境溫濕度與流汗量調整。',
  },

  'CLAIM-WATER-HEURISTIC-TW': {
    id: 'CLAIM-WATER-HEURISTIC-TW',
    statement: '「體重 (kg) × 30 至 35 mL」為台灣常見之臨床經驗拇指法則。',
    value_kind: 'heuristic',
    range_min: 30,
    range_max: 35,
    unit: 'mL/kg/日',
    derivation: '台灣基層門診衛教口訣',
    is_individual_prescription: false,
    misuse_guard:
      '此為粗略經驗法則，嚴禁標示為科學公式；不可線性外推至極端體重（如 120 kg 會得出 4.2 L 之過量高值）。',
  },

  'CLAIM-BP-NORMAL': {
    id: 'CLAIM-BP-NORMAL',
    statement: '2025 AHA/ACC 指引成人正常血壓定義為收縮壓 <120 且舒張壓 <80 mmHg。',
    value_kind: 'point',
    unit: 'mmHg',
    is_individual_prescription: false,
    misuse_guard: '必須依循規範量測程序之多次安靜診間/居家平均值，單次讀數不得定性。',
  },

  'CLAIM-BP-STAGE1': {
    id: 'CLAIM-BP-STAGE1',
    statement: '2025 AHA/ACC 第 1 期高血壓定義為收縮壓 130–139 或舒張壓 80–89 mmHg。',
    value_kind: 'range',
    unit: 'mmHg',
    is_individual_prescription: false,
    misuse_guard: '低心血管風險者得先嘗試 3–6 個月生活型態介入，非立即用藥判準。',
  },

  'CLAIM-BP-PREVENT-7_5': {
    id: 'CLAIM-BP-PREVENT-7_5',
    statement: '2025 AHA/ACC 改採 PREVENT 方程，10 年 ASCVD 高風險閾值由原 10% 調整為 ≥7.5%。',
    value_kind: 'point',
    numeric_value: 7.5,
    unit: '%',
    is_individual_prescription: false,
    misuse_guard: 'PREVENT 與舊版 PCE 方程分數不可直接換算，切點調整反映模型校正。',
  },

  'CLAIM-LPA-RISK-125': {
    id: 'CLAIM-LPA-RISK-125',
    statement: 'Lp(a) 濃度大於 125 nmol/L（或約 50 mg/dL）對應約 1.4 倍 ASCVD 相對風險。',
    value_kind: 'point',
    numeric_value: 125,
    unit: 'nmol/L',
    comparator: 'vs Lp(a) < 75 nmol/L 基準族群',
    is_individual_prescription: false,
    misuse_guard: 'nmol/L 與 mg/dL 不可用固定倍數互換，以檢驗室報告方法為準。',
  },

  'CLAIM-LPA-RISK-250': {
    id: 'CLAIM-LPA-RISK-250',
    statement: 'Lp(a) 濃度大於 250 nmol/L 對應大於等於 2.0 倍 ASCVD 重度風險。',
    value_kind: 'point',
    numeric_value: 250,
    unit: 'nmol/L',
    comparator: 'vs Lp(a) < 75 nmol/L 基準族群',
    is_individual_prescription: false,
    misuse_guard: 'Lp(a) 數值終生相對恆定，量測目的在於風險再分層而非頻繁監測。',
  },

  'CLAIM-OIL-TEASPOON-ENERGY': {
    id: 'CLAIM-OIL-TEASPOON-ENERGY',
    statement: '1 茶匙食用油脂重量約 5 公克，熱量約 45 大卡 (kcal)。',
    value_kind: 'point',
    numeric_value: 45,
    unit: 'kcal / 5g',
    derivation: '5g × 9 kcal/g = 45 kcal',
    is_individual_prescription: false,
    misuse_guard: '標準烹調換算單位，非建議每餐油量。',
  },

  'CLAIM-ALCOHOL-ESOPHAGEAL-RR': {
    id: 'CLAIM-ALCOHOL-ESOPHAGEAL-RR',
    statement:
      '每日飲酒超過 4 單位（純酒精約 >40g/日）者，罹患食道鱗狀細胞癌之相對危險度 RR = 5.13 (95% CI: 3.82–6.89)。',
    value_kind: 'point',
    numeric_value: 5.13,
    comparator: 'vs 不飲酒或偶發飲酒者 (Non-drinkers / Occasional drinkers)',
    exposure_definition: '每日純酒精攝取 > 4 個標準單位 (NIAAA 14g/drink 或 40g/日)',
    adjusted_for: ['吸菸狀態 (Smoking status)', '年齡', '性別'],
    is_individual_prescription: false,
    misuse_guard: '若合併抽菸與 ALDH2 rs671 缺乏基因型，致癌倍數將呈非線性倍增。',
  },
};
