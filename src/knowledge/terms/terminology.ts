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
    ontology: {
      mesh_id: 'D000426',
      mesh_term: 'Alcohol Dehydrogenase',
      snomed_ct: '44883002',
    },
  },

  BP: {
    term: 'BP',
    primary_expansion_zh: '血壓 (Blood Pressure)',
    secondary_expansions_zh: ['最佳實踐 (Best Practice)'],
    domain: '心血管生理與知識架構',
    context_guidance_zh: '在生理數值中代表血壓 (mmHg)；在資料庫層級可代表 Best Practice 記錄。',
    ambiguity_warning_zh: '文案中提及臨床監測時應使用全稱「血壓」或標註單位 mmHg。',
    ontology: {
      mesh_id: 'D001794',
      mesh_term: 'Blood Pressure',
      icd11_code: 'BA00',
      snomed_ct: '75367002',
    },
  },

  PT: {
    term: 'PT',
    primary_expansion_zh: '凝血酶原時間 (Prothrombin Time)',
    secondary_expansions_zh: ['物理治療 (Physical Therapy)'],
    domain: '檢驗醫學與復健醫學',
    context_guidance_zh: '運動專項篇章若指復健應寫全稱物理治療，避免與凝血檢驗混淆。',
    ambiguity_warning_zh: '醫學檢驗 PT 反映肝臟合成外因性凝血因子能力。',
    ontology: {
      mesh_id: 'D011517',
      mesh_term: 'Prothrombin Time',
      snomed_ct: '80502004',
    },
  },

  CRP: {
    term: 'CRP',
    primary_expansion_zh: 'C-反應蛋白 (C-Reactive Protein)',
    secondary_expansions_zh: ['高敏感 C-反應蛋白 (hs-CRP)'],
    domain: '發炎免疫與心血管風險評估',
    context_guidance_zh: '心血管預後評估應特異標註 hs-CRP (mg/L)。',
    ambiguity_warning_zh: '一般 CRP 用於急性感染，hs-CRP 專門用於微量慢性血管發炎偵測。',
    ontology: {
      mesh_id: 'D002097',
      mesh_term: 'C-Reactive Protein',
      snomed_ct: '55235003',
    },
  },

  TPC: {
    term: 'TPC',
    primary_expansion_zh: '總極性化合物 (Total Polar Compounds)',
    domain: '食用油脂安全衛生法規',
    context_guidance_zh: '台灣餐飲油炸油稽查標準，TPC > 25% 為不得繼續使用。',
    ambiguity_warning_zh: '酸價為快篩指標，TPC 是評定油脂裂解變質的決定性法規標準。',
    ontology: {
      mesh_id: 'D005227',
      mesh_term: 'Fatty Acids',
    },
  },

  AI: {
    term: 'AI',
    primary_expansion_zh: '適當攝取量 (Adequate Intake)',
    secondary_expansions_zh: ['人工智慧 (Artificial Intelligence)'],
    domain: '膳食營養素參考攝取量 (DRIs)',
    context_guidance_zh:
      '在水分與微量營養素篇章中，AI 均指 Adequate Intake，非 Artificial Intelligence。',
    ambiguity_warning_zh: 'AI 是指引中缺乏足夠 RDA 數據時由健康族群觀察值推估之攝取量。',
    ontology: {
      mesh_id: 'D012015',
      mesh_term: 'Reference Values',
    },
  },

  INTESTINAL_LEAK: {
    term: '腸漏',
    primary_expansion_zh: '腸道上皮通透性過高 (Intestinal Hyperpermeability)',
    domain: '消化生理與屏障醫學',
    context_guidance_zh:
      '避免使用商業行銷化之「腸漏症」獨立診斷名詞；應以「腸黏膜屏障緊密連接功能受損」精確描述。',
    ambiguity_warning_zh:
      '「腸漏」並非 ICD-11 正式獨立疾病編碼，而是多種慢性發炎、酒精濫用與菌群失調下的病理生理狀態。',
    ontology: {
      mesh_id: 'D007413',
      mesh_term: 'Intestinal Mucosa',
      snomed_ct: '235595009',
    },
  },

  DETOX: {
    term: '排毒',
    primary_expansion_zh: '肝腎內源性生物轉化與排泄作用 (Hepatorenal Biotransformation & Excretion)',
    domain: '毒理學與生理學',
    context_guidance_zh:
      '嚴禁使用坊間「果汁排毒」、「斷食排毒」等商業偽醫學概念；人體解毒是由肝臟 Phase I/II 酵素與腎臟排泄持續進行。',
    ambiguity_warning_zh:
      '健康人體不需要任何市售「排毒療程」，商業排毒多為瀉劑或低熱量引發之短暫水分流失。',
    ontology: {
      mesh_id: 'D007249',
      mesh_term: 'Biotransformation',
    },
  },

  ACID_BODY: {
    term: '酸性體質',
    primary_expansion_zh: '迷思概念（正常血液酸鹼度嚴密恆定於 pH 7.35–7.45）',
    domain: '酸鹼生理學',
    context_guidance_zh:
      '「酸性體質致癌」是已被醫學界全面否證之偽科學。飲食代謝產物由腎臟與肺臟即時緩衝代償。',
    ambiguity_warning_zh: '血液 pH 若偏離 7.35–7.45 即為急性重症（酸中毒/鹼中毒），非生活體質。',
    ontology: {
      mesh_id: 'D000138',
      mesh_term: 'Acid-Base Equilibrium',
    },
  },

  ALDH2: {
    term: 'ALDH2',
    primary_expansion_zh: '乙醛去氫酶 2 (Aldehyde Dehydrogenase 2)',
    domain: '藥物基因體學與腫瘤流行病學',
    context_guidance_zh: '東亞人群常見 rs671 (Glu504Lys) 基因變異，造成酵素活性顯著降低或近乎完全喪失。',
    ambiguity_warning_zh: '不可與 ADH (乙醇去氫酶) 混為一談；ALDH2 負責第二階段乙醛氧化為無毒乙酸。',
    ontology: {
      mesh_id: 'D000445',
      mesh_term: 'Aldehyde Dehydrogenase',
      icd11_code: '5C54.1',
      snomed_ct: '25380004',
    },
  },

  CKD: {
    term: 'CKD',
    primary_expansion_zh: '慢性腎臟病 (Chronic Kidney Disease)',
    domain: '腎臟醫學',
    context_guidance_zh: '腎臟結構或功能異常持續 >= 3 個月；依 CGA 架構（病因、GFR G1–G5、白蛋白尿 A1–A3）分期。',
    ambiguity_warning_zh: '不可依單次檢驗異常直接確診；G4–G5 為重度腎衰竭與尿毒症前期，嚴格限制水分與電解質。',
    ontology: {
      mesh_id: 'D051436',
      mesh_term: 'Renal Insufficiency, Chronic',
      icd11_code: 'GB61',
      snomed_ct: '709044004',
    },
  },

  LPA: {
    term: 'Lp(a)',
    primary_expansion_zh: '脂蛋白(a) (Lipoprotein(a))',
    domain: '心血管代謝與血脂醫學',
    context_guidance_zh: '由基因決定的獨立動脈粥狀硬化及主動脈瓣狹窄風險因子。建議成人一生至少檢測一次。',
    ambiguity_warning_zh: '質量濃度 (mg/dL) 與顆粒莫耳濃度 (nmol/L) 絕不可直接用固定常數換算！',
    ontology: {
      mesh_id: 'D017270',
      mesh_term: 'Lipoprotein(a)',
      icd11_code: '5C80',
      snomed_ct: '702580000',
    },
  },

  APOB: {
    term: 'apoB',
    primary_expansion_zh: '載脂蛋白 B (Apolipoprotein B)',
    domain: '血脂檢驗與心血管風險評估',
    context_guidance_zh: '每顆致粥狀硬化脂蛋白顆粒（VLDL, IDL, LDL, Lp(a)）均帶有一分子 apoB，精確反映總致病顆粒數。',
    ambiguity_warning_zh: '與 LDL-C 膽固醇含量不一致 (Discordance) 時，apoB 提供更高精度的真實心血管事件預測能力。',
    ontology: {
      mesh_id: 'D001055',
      mesh_term: 'Apolipoproteins B',
      snomed_ct: '75039002',
    },
  },

  EAH: {
    term: 'EAH',
    primary_expansion_zh: '運動相關低鈉血症 (Exercise-Associated Hyponatremia)',
    domain: '運動醫學與體液平衡',
    context_guidance_zh: '因長時間運動中超量飲用低張液體超越腎臟最大自由水排泄能力所致之稀釋性低血鈉。',
    ambiguity_warning_zh: '嚴重者可併發腦水腫與死亡；國際共識原則為「依口渴飲水 (Drink to Thirst)」，切勿盲目定額強灌。',
    ontology: {
      mesh_id: 'D007010',
      mesh_term: 'Hyponatremia',
      icd11_code: '5C64.0',
    },
  },

  TIR: {
    term: 'TIR',
    primary_expansion_zh: '目標範圍時間 (Time in Range)',
    domain: '連續血糖監測與代謝調控',
    context_guidance_zh: '連續血糖監測 (CGM) 中血糖維持於 70–180 mg/dL 之時間百分比，臨床目標通常建議 >70%。',
    ambiguity_warning_zh: '切勿與全內反射 (Total Internal Reflection) 或其他工程縮寫混淆。',
    ontology: {
      mesh_id: 'D001786',
      mesh_term: 'Blood Glucose',
      snomed_ct: '43491000124108',
    },
  },

  MASLD: {
    term: 'MASLD',
    primary_expansion_zh: '代謝功能障礙相關脂肪性肝病 (Metabolic Dysfunction-Associated Steatotic Liver Disease)',
    secondary_expansions_zh: ['原非酒精性脂肪肝 (NAFLD)'],
    domain: '消化系與代謝醫學',
    context_guidance_zh: '2023 年國際多學會取代 NAFLD 之新命名，要求具備肝脂肪堆積並合併至少一項心血管代謝風險因子。',
    ambiguity_warning_zh: '避免帶有汙名化字眼 (non-alcoholic)，更能精準錨定心血管代謝根源。',
    ontology: {
      mesh_id: 'D005234',
      mesh_term: 'Fatty Liver',
      icd11_code: 'DB92',
    },
  },

  OSA: {
    term: 'OSA',
    primary_expansion_zh: '阻塞型睡眠呼吸中止症 (Obstructive Sleep Apnea)',
    domain: '睡眠醫學與心血管血流動力學',
    context_guidance_zh: '睡眠中上呼吸道反覆塌陷導致間歇性缺氧與交感神經過度活化，為頑固型高血壓的重要病因。',
    ambiguity_warning_zh: '需經多項生理睡眠檢查 (PSG) 測定 AHI 數值以確診嚴重程度。',
    ontology: {
      mesh_id: 'D020181',
      mesh_term: 'Sleep Apnea, Obstructive',
      icd11_code: 'CB41',
      snomed_ct: '78275009',
    },
  },

  VO2MAX: {
    term: 'VO2max',
    primary_expansion_zh: '最大攝氧量 (Maximal Oxygen Uptake)',
    domain: '運動生理與心肺適能',
    context_guidance_zh: '人體在極限有氧運動中每分鐘每公斤體重所能攝取並利用之最大氧氣毫升數 (mL/kg/min)。',
    ambiguity_warning_zh: '為心肺耐力與長期全因死亡率之最強獨立預後指標之一，改善無益處上限天花板。',
    ontology: {
      mesh_id: 'D010101',
      mesh_term: 'Oxygen Consumption',
      snomed_ct: '251854005',
    },
  },
};
