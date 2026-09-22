/**
 * terminology.ts — Salud Layer 1 TerminologyRegistry
 *
 * Resolves acronym collisions (DEFECT-03), defines official medical expansions,
 * and flags pseudoscientific buzzwords for clinical debunking.
 */

import { TerminologyItem } from '../../types/knowledge';

export const CANONICAL_TERMINOLOGY_REGISTRY: Record<string, TerminologyItem> = {
  ADH: {
    term: 'ADH',
    primary_expansion_zh: '乙醇去氫酶 (Alcohol Dehydrogenase)',
    secondary_expansions_zh: ['抗利尿激素 (Antidiuretic Hormone / Vasopressin)'],
    domain: '生化代謝與內分泌生理',
    context_guidance_zh:
      '同一陣列或文案中若先後出現 ADH，必須明確展開為「乙醇去氫酶」或「抗利尿激素」，嚴禁在相鄰數句內以同一縮寫指涉兩種不同分子。',
    ambiguity_warning_zh:
      '肝臟代謝酒精的第一步由「乙醇去氫酶 ADH」催化；而下視丘分泌、控制腎臟排尿的則是「抗利尿激素 ADH」。兩者機制完全不同，易造成讀者極大認知混淆。',
  },

  BP: {
    term: 'BP',
    primary_expansion_zh: '血壓 (Blood Pressure)',
    secondary_expansions_zh: ['最佳實踐 (Best Practice)'],
    domain: '心血管生理與知識架構',
    context_guidance_zh: '在生理數值中代表血壓 (mmHg)；在資料庫層級可代表 Best Practice 記錄。',
    ambiguity_warning_zh: '文案中提及臨床監測時應使用全稱「血壓」或標註單位 mmHg。',
  },

  PT: {
    term: 'PT',
    primary_expansion_zh: '凝血酶原時間 (Prothrombin Time)',
    secondary_expansions_zh: ['物理治療 (Physical Therapy)'],
    domain: '檢驗醫學與復健醫學',
    context_guidance_zh: '運動專項篇章若指復健應寫全稱物理治療，避免與凝血檢驗混淆。',
    ambiguity_warning_zh: '醫學檢驗 PT 反映肝臟合成外因性凝血因子能力。',
  },

  CRP: {
    term: 'CRP',
    primary_expansion_zh: 'C-反應蛋白 (C-Reactive Protein)',
    secondary_expansions_zh: ['高敏感 C-反應蛋白 (hs-CRP)'],
    domain: '發炎免疫與心血管風險評估',
    context_guidance_zh: '心血管預後評估應特異標註 hs-CRP (mg/L)。',
    ambiguity_warning_zh: '一般 CRP 用於急性感染，hs-CRP 專門用於微量慢性血管發炎偵測。',
  },

  TPC: {
    term: 'TPC',
    primary_expansion_zh: '總極性化合物 (Total Polar Compounds)',
    domain: '食用油脂安全衛生法規',
    context_guidance_zh: '台灣餐飲油炸油稽查標準，TPC > 25% 為不得繼續使用。',
    ambiguity_warning_zh: '酸價為快篩指標，TPC 是評定油脂裂解變質的決定性法規標準。',
  },

  AI: {
    term: 'AI',
    primary_expansion_zh: '適當攝取量 (Adequate Intake)',
    secondary_expansions_zh: ['人工智慧 (Artificial Intelligence)'],
    domain: '膳食營養素參考攝取量 (DRIs)',
    context_guidance_zh:
      '在水分與微量營養素篇章中，AI 均指 Adequate Intake，非 Artificial Intelligence。',
    ambiguity_warning_zh: 'AI 是指引中缺乏足夠 RDA 數據時由健康族群觀察值推估之攝取量。',
  },

  INTESTINAL_LEAK: {
    term: '腸漏',
    primary_expansion_zh: '腸道上皮通透性過高 (Intestinal Hyperpermeability)',
    domain: '消化生理與屏障醫學',
    context_guidance_zh:
      '避免使用商業行銷化之「腸漏症」獨立診斷名詞；應以「腸黏膜屏障緊密連接功能受損」精確描述。',
    ambiguity_warning_zh:
      '「腸漏」並非 ICD-11 正式獨立疾病編碼，而是多種慢性發炎、酒精濫用與菌群失調下的病理生理狀態。',
  },

  DETOX: {
    term: '排毒',
    primary_expansion_zh: '肝腎內源性生物轉化與排泄作用 (Hepatorenal Biotransformation & Excretion)',
    domain: '毒理學與生理學',
    context_guidance_zh:
      '嚴禁使用坊間「果汁排毒」、「斷食排毒」等商業偽醫學概念；人體解毒是由肝臟 Phase I/II 酵素與腎臟排泄持續進行。',
    ambiguity_warning_zh:
      '健康人體不需要任何市售「排毒療程」，商業排毒多為瀉劑或低熱量引發之短暫水分流失。',
  },

  ACID_BODY: {
    term: '酸性體質',
    primary_expansion_zh: '迷思概念（正常血液酸鹼度嚴密恆定於 pH 7.35–7.45）',
    domain: '酸鹼生理學',
    context_guidance_zh:
      '「酸性體質致癌」是已被醫學界全面否證之偽科學。飲食代謝產物由腎臟與肺臟即時緩衝代償。',
    ambiguity_warning_zh: '血液 pH 若偏離 7.35–7.45 即為急性重症（酸中毒/鹼中毒），非生活體質。',
  },
};
