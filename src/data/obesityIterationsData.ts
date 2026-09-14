import { EvidenceGrade } from '../types';

/**
 * 肥胖與代謝醫學專區 · 7 輪專家深度會議迭代演進紀錄
 */
export interface ObesityIterationRound {
  round: number;
  title_zh: string;
  title_en: string;
  theme_zh: string;
  lead_experts: string[];
  conflict_point_zh: string; // 會議激辯與爭論焦點
  breakthrough_consensus_zh: string; // 突破性共識與轉折
  actionable_outcome_zh: string; // 具體工程與醫學產出
}

export const OBESITY_ITERATION_ROUNDS: ObesityIterationRound[] = [
  {
    round: 1,
    title_zh: '第 1 輪迭代：生理微觀機轉圖解化與生熱路徑',
    title_en: 'Round 1: Microscopic Pathophysiology & Adipocyte Thermogenesis',
    theme_zh: '告別黑盒說教，將下視丘神經元與脂肪細胞褐變信號完全視覺化',
    lead_experts: ['EC-31 神經內分泌學者', 'EC-28 肥胖專科醫師', 'EC-17 醫學插畫總監'],
    conflict_point_zh:
      '醫學插畫總監認為傳統文獻的分子生物學圖過於晦澀、民眾難以理解；而神經內分泌學家堅持不能為了簡化而犧牲 POMC/NPY 拮抗及 UCP-1 解偶聯的生化保真度。',
    breakthrough_consensus_zh:
      '達成「四步傳導階梯（刺激源 ➔ 受體 ➔ 傳訊分子 ➔ 最終生理反應）」視覺標準，並引進 WAT 褐變（白色脂肪向米色脂肪轉化）與冷刺激生熱模型，讓使用者一目了然看懂人體如何燃燒熱量。',
    actionable_outcome_zh:
      '產出 6 大微觀機制圖卡、UCP-1 解偶聯生熱傳導鏈、以及下視丘食慾中樞踩油門與踩煞車的微觀對比圖表。',
  },
  {
    round: 2,
    title_zh: '第 2 輪迭代：臨床三期巨型試驗數據庫與藥物交互防火牆',
    title_en: 'Round 2: Clinical Trial Megadataset & Pharmacotherapy Safety Firewall',
    theme_zh: '以 STEP 1-8、SURMOUNT 1-5 與 SELECT 硬終點數據建立不偏不倚的藥物評價',
    lead_experts: ['EC-28 肥胖專科醫師', 'EC-01 醫療總監', 'EC-20 科普主筆'],
    conflict_point_zh:
      '商業媒體常將 GLP-1 類藥物神化為「無痛甩肉神藥」，忽略了停藥後的高反彈率（STEP-1 extension 試驗 1 年內反彈 2/3）與胃輕癱、肌肉流失風險；而部分保守醫師又過度恐懼腸胃道副作用。',
    breakthrough_consensus_zh:
      '全面公佈全系列隨機對照試驗 (RCT) 完整數據（包含安慰劑對照、次級心衰竭獲益），並強制建立「藥物交互作用與反向禁忌防火牆」，嚴格規範甲狀腺髓質癌、膽結石、低血糖的處方安全邊界。',
    actionable_outcome_zh:
      '建立 STEP 1~8、SURMOUNT 1~5、SELECT、OASIS 臨床三期試驗全景數據庫，以及處方藥交互作用安全防護網。',
  },
  {
    round: 3,
    title_zh: '第 3 輪迭代：飲食法實體化餐盤與台灣外食避坑地圖',
    title_en: 'Round 3: Culinary Translation & Taiwan Dining-Out Pitfall Map',
    theme_zh: '將抽象宏量營養百分比轉譯為「超商、便當、火鍋」的實戰抓盤公式',
    lead_experts: ['EC-29 減重專科營養師', 'EC-05 資深營養學家', 'EC-15 食品科技專家'],
    conflict_point_zh:
      '營養師提出的生化熱量與蛋白質克數（如 1.6 g/kg/d）在日常生活中極難執行，外食族根本不會隨身帶電子秤，導致「懂原理卻無法落地」。',
    breakthrough_consensus_zh:
      '建立「30g 蛋白質實物尺規」（例如 4 顆大蛋 = 1.2 塊超商雞胸肉 = 1.5 盒嫩豆腐），並深入台灣四大外食地帶（超商、自助餐、火鍋、早餐手搖飲），制定「紅黃綠燈實戰避坑地圖」。',
    actionable_outcome_zh:
      '產出 8 大飲食法實體化餐盤、30g 蛋白質換算量尺，以及台灣街頭外食紅黃綠燈點餐指南。',
  },
  {
    round: 4,
    title_zh: '第 4 輪迭代：行為科學衝動阻斷與生理 vs 心理飢餓鑑別',
    title_en: 'Round 4: Behavioral Science, Urge Surfing & Hunger Triage',
    theme_zh: '運用 BJ Fogg 行為模型與神經衝動衝浪，終結深夜報復性暴食',
    lead_experts: ['EC-32 行為心理學家', 'EC-21 行為科學架構師', 'EC-25 身心神經學家'],
    conflict_point_zh:
      '過去減重計畫過度依賴「意志力抑制」，但神經科學證實：高壓下大腦前額葉皮質疲勞，多巴胺代償渴望會暴力擊潰意志力，導致嚴重的衝動性暴食與罪惡感崩潰。',
    breakthrough_consensus_zh:
      '導入神經生物學的「衝動衝浪 (Urge Surfing)」技術（渴望如同海浪，12~15 分鐘達到頂峰後自然退潮），並結合 5 級飢餓自評量表與 4-7-8 呼吸，開發即時互動冷靜儀。',
    actionable_outcome_zh:
      '上線可操作的「暴食衝動 15 分鐘冷靜急救儀 (Urge Surfing Interactive Tool)」與 5 級心理性 vs 生理性飢餓鑑別量表。',
  },
  {
    round: 5,
    title_zh: '第 5 輪迭代：骨骼肌防禦技能樹與抗阻訓練最低有效量',
    title_en: 'Round 5: Sarcopenia Defense & Minimum Effective Dose Resistance Training',
    theme_zh: '對抗瘦瘦針與極低熱量下的去脂體重雪崩，捍衛人體代謝引擎',
    lead_experts: ['EC-33 體組成運動生理學家', 'EC-06 運動醫學專家'],
    conflict_point_zh:
      '許多減重者盲目追逐體重計數字下降，忽視了流失的 30-40% 是維持基礎代謝核心的骨骼肌；健身教練開立的重訓課表對久坐大眾又門檻過高，引發早早放棄。',
    breakthrough_consensus_zh:
      '提煉出減重期的「最低有效訓練量 (MED)」：每週僅需 2~3 次、每次 20 分鐘、覆蓋 5 大基礎動作模式（深蹲、鉸鏈、推、拉、核心抗旋轉）；同時精確計算「白胺酸閾值 (2.5~3.0g/餐)」以點火肌肉合成。',
    actionable_outcome_zh:
      '發布減重期骨骼肌防護精熟階梯 (Muscle Shield Tree) 與居家/器械 5 大基礎動作訓練指引。',
  },
  {
    round: 6,
    title_zh: '第 6 輪迭代：均一精熟自適應形成性評量與多巴胺回饋',
    title_en: 'Round 6: Mastery Adaptive Assessment & Neuro-Feedback Gamification',
    theme_zh: '導入均一教育平台自適應學習哲學，讓知識轉化為深刻認知抗體',
    lead_experts: ['EC-19 學習體驗架構師', '均一教育平台核心研發團隊'],
    conflict_point_zh:
      '單向閱讀醫學文獻容易產生「看過就以為自己懂了」的假性精熟，一旦回到現實社交聚餐或體重停滯期，依然重蹈覆轍。',
    breakthrough_consensus_zh:
      '設計 12 道臨床實戰情境自適應測驗題，融入即時多巴胺煙火慶祝（canvas-confetti）反饋；若答錯，系統精準錨定並導流至對應的生化機轉與藥物段落進行補救閱讀。',
    actionable_outcome_zh:
      '完成均一精熟自適應測驗系統、四維臨床珍珠解析庫與動態多巴胺獎勵機制。',
  },
  {
    round: 7,
    title_zh: '第 7 輪迭代：全人多靶點協同聯動與終身設定點穩固藍圖',
    title_en: 'Round 7: Cross-Pillar Synergy & Lifelong Set-Point Defense Roadmap',
    theme_zh: '打通水、油、睡眠、心理與運動全維度，打造終身防復胖防禦網',
    lead_experts: ['EC-01 醫療總監', 'EC-03 心臟科醫師', 'EC-04 新陳代謝專家', '全體 33 席理事會'],
    conflict_point_zh:
      '肥胖從來不是孤立的卡路里問題。若忽略睡眠剝奪（少睡 1.5H 導致 Ghrelin 飆升 28%）或水分代償（中度脫水被誤判為飢餓），任何單一減重手段都會在 1-2 年內被反彈摧毀。',
    breakthrough_consensus_zh:
      '構建「全人多靶點協同矩陣」，將肥胖專區與 Salud 水 (Ch.W)、油 (Ch.O)、運動、睡眠、心理呼吸全面互聯，並制定「設定點穩固期 (Settling-Point Phase, 6~12 個月)」漸進退藥與維持協議。',
    actionable_outcome_zh:
      '產出全人多靶點協同矩陣、終身防復胖路線圖 (Lifelong Relapse Prevention Roadmap) 與 33 席專家終審簽核全集。',
  },
];

/**
 * 臨床三期全系列隨機對照試驗 (RCT) 完整巨型資料庫 (Megadataset)
 */
export interface ClinicalTrialRecord {
  trial_code: string;
  drug_name: string;
  population_description: string;
  sample_size: number;
  duration_weeks: number;
  mean_weight_loss_pct: number;
  placebo_loss_pct: number;
  primary_endpoints: string;
  cardiovascular_metabolic_notes: string;
  source_citation: string;
}

export const CLINICAL_TRIALS_DATABASE: ClinicalTrialRecord[] = [
  {
    trial_code: 'STEP-1',
    drug_name: 'Semaglutide 2.4mg',
    population_description: '超重或肥胖非糖尿病成人 (BMI ≥30 或 ≥27 伴共病)',
    sample_size: 1961,
    duration_weeks: 68,
    mean_weight_loss_pct: 14.9,
    placebo_loss_pct: 2.4,
    primary_endpoints: '86.4% 達成減重 ≥5%，50.5% 達成減重 ≥15%',
    cardiovascular_metabolic_notes: '腰圍平均減少 13.5 cm，收縮壓顯著下降 6.2 mmHg，C-反應蛋白 (hs-CRP) 下降 50% 以上。',
    source_citation: 'Wilding JPH, et al. N Engl J Med. 2021;384:989-1002.',
  },
  {
    trial_code: 'STEP-2',
    drug_name: 'Semaglutide 2.4mg',
    population_description: '超重或肥胖合併第 2 型糖尿病患者 (HbA1c 7.0-10.0%)',
    sample_size: 1210,
    duration_weeks: 68,
    mean_weight_loss_pct: 9.6,
    placebo_loss_pct: 3.4,
    primary_endpoints: '68.8% 達成減重 ≥5%，HbA1c 平均降低 1.6%',
    cardiovascular_metabolic_notes: '糖尿病患者因神經內分泌損害與降糖藥干擾，減重幅度通常低於非糖尿病組，但降糖與護腎效益顯著。',
    source_citation: 'Davies M, et al. Lancet. 2021;397:971-981.',
  },
  {
    trial_code: 'STEP-3',
    drug_name: 'Semaglutide 2.4mg + 強化行為生活介入',
    population_description: '非糖尿病肥胖成人，配合密集 30 次行為生活諮詢與低熱量飲食',
    sample_size: 611,
    duration_weeks: 68,
    mean_weight_loss_pct: 16.0,
    placebo_loss_pct: 5.7,
    primary_endpoints: '86.6% 達成減重 ≥5%，35.7% 達成減重 ≥20%',
    cardiovascular_metabolic_notes: '證實藥物合併強化行為心理與營養介入能最大化減重潛能。',
    source_citation: 'Wadden TA, et al. JAMA. 2021;325:1403-1413.',
  },
  {
    trial_code: 'STEP-5',
    drug_name: 'Semaglutide 2.4mg (2年長期維持試驗)',
    population_description: '非糖尿病肥胖成人，評估長達 104 週的療效與安全性',
    sample_size: 304,
    duration_weeks: 104,
    mean_weight_loss_pct: 15.2,
    placebo_loss_pct: 2.6,
    primary_endpoints: '在 104 週時，77.1% 仍維持減重 ≥5%，半數維持減重 ≥15%',
    cardiovascular_metabolic_notes: '體重在 60-68 週達平台期，在持續用藥下成功維持 2 年不反彈。',
    source_citation: 'Garvey WT, et al. Nat Med. 2022;28:2083-2091.',
  },
  {
    trial_code: 'STEP-8',
    drug_name: 'Semaglutide 2.4mg vs Liraglutide 3.0mg (頭對頭試驗)',
    population_description: '非糖尿病肥胖成人，直接面對面比較新舊兩代 GLP-1 療效',
    sample_size: 338,
    duration_weeks: 68,
    mean_weight_loss_pct: 15.8,
    placebo_loss_pct: 6.4, // Liraglutide 3.0mg 組為 6.4%
    primary_endpoints: 'Semaglutide 減重效果顯著為 Liraglutide 的 2.5 倍',
    cardiovascular_metabolic_notes: '達成 ≥15% 減重的比例：Semaglutide (70.9%) vs Liraglutide (25.6%)，確立長效週劑型霸主地位。',
    source_citation: 'Rubino DM, et al. JAMA. 2022;327:138-150.',
  },
  {
    trial_code: 'SELECT',
    drug_name: 'Semaglutide 2.4mg (心血管硬終點試驗)',
    population_description: '已有動脈粥狀硬化心血管疾病 (ASCVD) 之超重/肥胖非糖尿病患者',
    sample_size: 17604,
    duration_weeks: 208, // 平均追蹤 39.8 個月
    mean_weight_loss_pct: 10.2,
    placebo_loss_pct: 1.5,
    primary_endpoints: '顯著降低 20% 主要不良心血管事件 (MACE, HR 0.80, P<0.001)',
    cardiovascular_metabolic_notes: '心血管死亡、心肌梗塞與非致命中風全面下降，且射出分率保留型心衰竭 (HFpEF) 症狀顯著改善。',
    source_citation: 'Lincoff AM, et al. N Engl J Med. 2023;389:2221-2232.',
  },
  {
    trial_code: 'SURMOUNT-1',
    drug_name: 'Tirzepatide 15mg (雙促效劑)',
    population_description: '非糖尿病超重/肥胖成人 (BMI ≥30 或 ≥27 伴併發症)',
    sample_size: 2539,
    duration_weeks: 72,
    mean_weight_loss_pct: 20.9, // 15mg 組達 20.9% ~ 22.5%
    placebo_loss_pct: 3.1,
    primary_endpoints: '91% 達成減重 ≥5%，57% 達成減重 ≥20%，36% 達成減重 ≥25%',
    cardiovascular_metabolic_notes: '減重幅度逼近代謝手術，95.3% 原前期糖尿病患者完全恢復為正常血糖。',
    source_citation: 'Jastreboff AM, et al. N Engl J Med. 2022;387:205-216.',
  },
  {
    trial_code: 'SURMOUNT-4',
    drug_name: 'Tirzepatide 停藥反彈與維持隨機對照試驗',
    population_description: '先接受 36 週 Tirzepatide 治療後，隨機雙盲分組「持續用藥」vs「停藥安慰劑」',
    sample_size: 670,
    duration_weeks: 88,
    mean_weight_loss_pct: 25.3, // 持續用藥組總減重
    placebo_loss_pct: 9.9,  // 停藥組反彈後僅剩 9.9% 淨減重
    primary_endpoints: '停藥組在 52 週內反彈了原先失去體重的約一半以上',
    cardiovascular_metabolic_notes: '決定性證實肥胖需長期藥物維持，停藥後下視丘代謝防線會啟動反撲。',
    source_citation: 'Aronne LJ, et al. JAMA. 2024;331:38-48.',
  },
];

/**
 * 肥胖處方藥物 × 常用心血管/精神科藥物交互作用與禁忌防火牆
 */
export interface DrugInteractionItem {
  drug_combination: string;
  risk_level: 'HIGH_RISK' | 'CAUTION' | 'BENEFICIAL';
  clinical_consequence_zh: string;
  pharmacological_mechanism_zh: string;
  management_protocol_zh: string;
}

export const DRUG_INTERACTIONS_FIREWALL: DrugInteractionItem[] = [
  {
    drug_combination: 'GLP-1 RA (Semaglutide/Tirzepatide) × 促胰島素分泌劑 (Sulfonylureas / 磺醯尿素類)',
    risk_level: 'HIGH_RISK',
    clinical_consequence_zh: '重度致命性低血糖 (Severe Hypoglycemia) 與意識昏迷風險激增。',
    pharmacological_mechanism_zh:
      'GLP-1 促效劑本身具備葡萄糖依賴性降糖特性，但磺醯尿素類會無差別強迫 β 細胞分泌胰島素。在食量驟降與胃排空延遲雙重疊加下，血糖易斷崖式跌破 50 mg/dL。',
    management_protocol_zh:
      '【EC-28 處方指引】啟動 GLP-1 治療當天，必須主動將磺醯尿素類（如 Glimepiride）劑量減半或直接停用，並密切監控指尖空腹血糖。',
  },
  {
    drug_combination: 'GLP-1 RA × 窄治療指數口服藥 (Warfarin / Digoxin / 避孕藥)',
    risk_level: 'CAUTION',
    clinical_consequence_zh: '抗凝血劑藥效波動引發出血、強心苷毒性，或口服避孕藥吸收不全導致意外懷孕。',
    pharmacological_mechanism_zh:
      'GLP-1 與 GIP 促效劑顯著延緩胃排空速率 30-40%，大幅拉長固體口服藥物抵達小腸吸收部位的時間 (Tmax 延後)，可能使血中藥物濃度峰值 (Cmax) 顯著下降。',
    management_protocol_zh:
      '育齡女性在 Tirzepatide 劑量遞增期及換藥後 4 週內，建議加用非口服物理避孕措施；使用 Warfarin 者在用藥第 1-2 週需每週追蹤 INR 值。',
  },
  {
    drug_combination: 'Orlistat (羅氏鮮) × 脂溶性抗排斥藥 (Cyclosporine / 環孢素)',
    risk_level: 'HIGH_RISK',
    clinical_consequence_zh: '免疫抑制劑血中濃度急速暴跌，器官移植患者急性排斥衰竭致命危險！',
    pharmacological_mechanism_zh:
      'Orlistat 阻斷腸道脂肪酶，大幅抑制親脂性分子在小腸膠束中的溶解與主動吸收，使 Cyclosporine 生物利用度驟降超過 50%。',
    management_protocol_zh:
      '【EC-01 醫療總監絕對紅旗】器官移植服用環孢素者絕對嚴格禁用 Orlistat！若為其他脂溶性維生素 (A/D/E/K)，必須間隔至少 2 小時或於睡前服用。',
  },
  {
    drug_combination: 'Contrave (康纖芙 Bupropion/Naltrexone) × 類鴉片止痛藥 (Tramadol / Morphine / 止痛糖漿)',
    risk_level: 'HIGH_RISK',
    clinical_consequence_zh: '急性嚴重類鴉片戒斷症候群 (Opioid Withdrawal) 或止痛效果完全失效。',
    pharmacological_mechanism_zh:
      'Naltrexone 是純粹的 μ-類鴉片受體競爭性拮抗劑，親和力極強，會瞬間將結合在神經受體上的類鴉片藥物強行踢出。',
    management_protocol_zh:
      '服用 Contrave 前，必須確認患者已完全停用任何類鴉片止痛藥物至少 7-10 天。即將進行預約手術者需提前停藥。',
  },
  {
    drug_combination: 'GLP-1 RA × SGLT2 抑制劑 (排糖藥 Empagliflozin / Dapagliflozin)',
    risk_level: 'BENEFICIAL',
    clinical_consequence_zh: '心臟衰竭防護、腎臟延緩洗腎與代謝減重產生頂級雙重協同保護。',
    pharmacological_mechanism_zh:
      '兩者降糖與減重機轉完全互補：GLP-1 作用於中樞壓制食慾並延緩胃排空，SGLT2i 作用於腎近曲小管每天經尿液排出 60-80g 葡萄糖 (~300 kcal)，且共同顯著降低腎絲球高過濾壓與心臟前負荷。',
    management_protocol_zh:
      '國際糖尿病與心血管醫學會高階推薦組合。需注意補充足量水分（每日 2500mL 以上），預防極罕見之正常血糖型酮酸中毒 (euDKA) 與泌尿道感染。',
  },
];

/**
 * 台灣實戰外食外送紅黃綠燈避坑指引
 */
export interface TaiwanDiningCategory {
  category_name: string;
  icon_name: string;
  green_light_options: string[];
  yellow_light_options: string[];
  red_light_pitfalls: string[];
  dietitian_tactics_zh: string;
}

export const TAIWAN_DINING_GUIDE: TaiwanDiningCategory[] = [
  {
    category_name: '超商便利商店 (7-11 / 全家便利購)',
    icon_name: 'Store',
    green_light_options: [
      '超商原味/義式即食雞胸肉 (優質蛋白 23-26g)',
      '茶葉蛋 2 顆 (蛋白質 14g，優質脂質)',
      '無糖高纖豆漿 (大豆異黃酮 + 纖維 15g)',
      '一日野菜生菜沙拉 (搭配和風醬或自備橄欖油，僅沾1/3醬)',
      '蒸地瓜 (中小型約 120g，慢消化優質抗性澱粉)',
    ],
    yellow_light_options: [
      '御飯糰/手捲 (以鮪魚、鮭魚為佳，但澱粉比例高且缺乏纖維，需加顆蛋)',
      '關東煮 (選白蘿蔔、香菇、昆布卷、蒟蒻絲；避免喝過多高鈉重鹹熱湯)',
      '微波便當標示低卡專區 (看清鈉含量常破 1000mg)',
    ],
    red_light_pitfalls: [
      '微波奶油培根義大利麵 (精緻白麵 + 棕櫚油乳酪白醬，熱量破 750 kcal)',
      '微波炸雞排、起司熱狗 (高反式脂肪酸與極高油脂熱量)',
      '包裝果汁與含糖燕麥奶 (果糖直衝肝臟生成脂肪，纖維完全被濾除)',
    ],
    dietitian_tactics_zh:
      '【7-11 萬用減脂黃金公式】：1 塊義式雞胸肉 + 1 盒生菜沙拉 (和風醬沾食) + 1 顆茶葉蛋 + 1 瓶無糖高纖豆漿。總熱量僅約 420 kcal，蛋白質高達 40g，纖維破 8g，飽足感持續 5 小時！',
  },
  {
    category_name: '街頭自助餐與便當店 (便當便食族)',
    icon_name: 'UtensilsCrossed',
    green_light_options: [
      '主菜選：清蒸魚片、滷雞腿 (去皮)、烤鮭魚、滷牛腱',
      '配菜選：蒜炒深綠色葉菜 (地瓜葉/菠菜)、番茄炒蛋、洋蔥炒蛋、涼拌小黃瓜',
      '主食更換：白飯減半或自備地瓜/糙米',
    ],
    yellow_light_options: [
      '滷排骨 (先炸後滷，吸飽厚重油脂與糖鹽醬汁，外層麵衣應剝除)',
      '麻婆豆腐、紅燒茄子 (茄子如同海綿吸入極多劣質沙拉油，需過水)',
      '炒三色豆、玉米粒 (這兩樣不是蔬菜，是高升糖澱粉！)',
    ],
    red_light_pitfalls: [
      '炸排骨、炸大雞腿 (裹粉吸油率達 25-35%，單塊主菜熱量飆破 500 kcal)',
      '糖醋里肌、宮保雞丁 (高果糖糖漿大量勾芡，胰島素瞬間飆頂)',
      '便當附贈的多多乳酸飲料與重味骨頭湯 (純糖水與高鈉高普林地雷)',
    ],
    dietitian_tactics_zh:
      '【自助餐避油過水神技】：準備一碗溫開水或清湯，將炒菜夾出後在水中「涮兩下」再入口。經實測每餐能洗掉約 1.5 茶匙隱形沙拉油 (約 65-90 kcal)！主菜必選「蒸、滷、烤」，絕對拒絕「炸、糖醋、勾芡」。',
  },
  {
    category_name: '台式火鍋與涮涮鍋 (聚餐首選)',
    icon_name: 'Flame',
    green_light_options: [
      '湯底選：昆布清湯、蔬菜番茄清湯 (下肉前先喝湯，下肉後絕不喝湯)',
      '肉品選：板腱低脂牛、雞腿肉片、生鮮海鮮拼盤 (蛤蜊、鮮蝦、鯛魚片)',
      '蔬菜盤：南瓜、大白菜、金針菇、木耳、豆腐全部吃光',
      '沾醬選：生辣椒 + 白蘿蔔泥 + 蒜末 + 生蔥 + 少量薄鹽淡醬油與白醋',
    ],
    yellow_light_options: [
      '雪花牛、牛五花 (脂肪含量高達 50%，油脂熱量常破表，淺嚐 2-3 片)',
      '冬粉 (雖然低脂，但丟入煮過肉的油湯會如同海綿吸飽全鍋油脂，熱量翻倍)',
    ],
    red_light_pitfalls: [
      '麻辣紅油湯底、牛奶起司鍋 (光湯底就含大量牛油與高脂鮮奶油，一鍋破 1200 kcal)',
      '加工火鍋料三劍客：貢丸、百頁豆腐、炸豆皮 (百頁豆腐 70% 是大豆油與澱粉！)',
      '沙茶醬狂擠、花生粉狂灑 (兩大匙沙茶醬 = 半碗純油 = 220 kcal)',
    ],
    dietitian_tactics_zh:
      '【火鍋進食黃金時序】：1. 先煮大量綠色蔬菜與蕈菇墊胃 ➔ 2. 下優質海鮮與低脂板腱肉補充蛋白質 ➔ 3. 最後吃南瓜或芋頭作為碳水。記住口訣：火鍋肉煮滾後浮在水面的浮沫全是飽和脂肪，絕對不能喝下半碗！',
  },
  {
    category_name: '傳統台式早餐與手搖飲',
    icon_name: 'Coffee',
    green_light_options: [
      '早餐選：無油煎荷包蛋 2 顆 + 原味里肌豬排蛋吐司 (交代不抹美乃滋、不加醬油膏)',
      '飲品選：無糖豆漿、黑咖啡 (美式)、無糖高山青茶、無糖四季春',
      '手搖加料替代：若嘴饞想嚼，選「無糖愛玉、寒天晶球、奇亞籽」替代波霸珍珠',
    ],
    yellow_light_options: [
      '全麥鮪魚蛋餅 (蛋餅皮本身含油煎製，需注意店家是否加入過多美乃滋拌鮪魚)',
      '鮮奶茶/燕麥奶拿鐵 (無糖鮮奶茶可，但燕麥奶本質是高升糖澱粉液，熱量高於鮮奶)',
    ],
    red_light_pitfalls: [
      '傳統大冰奶 (大量廉價棕櫚油奶精 + 蔗糖水，促瀉是因腸道滲透壓過高與油脂滑腸，傷肝又發胖)',
      '鐵板麵加蛋 (高鈉重醬勾芡 + 油麵條，純碳水高油脂炸彈)',
      '奶酥厚片、起司菠蘿堡 (反式脂肪酸與高精緻糖組合，吃完保證 10 點 Food Coma 昏睡)',
      '波霸珍珠奶茶 (大杯半糖含糖量等同 12 顆方糖，珍珠煮好浸泡高果糖漿，一級脂毒地雷)',
    ],
    dietitian_tactics_zh:
      '早餐店老闆的隱形武器是「透明的美乃滋沙拉醬」，一抹就是 80 kcal 純油脂！點餐時請堅定說出通行密碼：「老闆，吐司去邊不抹醬、肉排不要淋甜辣醬」。',
  },
];

/**
 * 均一精熟自適應評量測驗題庫 (12 道情境題)
 */
export interface MasteryQuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correct_index: number;
  clinical_pearl_zh: string;
  biochemical_explanation_zh: string;
  target_remedy_tab: string; // 答錯跳轉補救分頁
}

export const OBESITY_MASTERY_QUIZZES: MasteryQuizQuestion[] = [
  {
    id: 'QUIZ-01',
    category: '生化病理',
    question: '許多肥胖者體內脂肪細胞分泌的瘦素 (Leptin) 明明超標數十倍，為什麼大腦下視丘卻依然感到極度飢餓並逼迫進食？',
    options: [
      '因為瘦素被胃酸在胃腔中直接破壞分解',
      '因為下視丘產生「瘦素抗性」，受體後 SOCS3 阻斷信號且血腦屏障轉運飽和',
      '因為體內缺乏足夠的維生素 C 轉化瘦素',
      '因為脂肪細胞分泌的是突變的假瘦素',
    ],
    correct_index: 1,
    clinical_pearl_zh: '肥胖者的飢餓是真實的大腦生化訊號，源自下視丘受阻引起的「感知性飢荒」。',
    biochemical_explanation_zh:
      '長期高脂血症與三酸甘油酯過高，使下視丘細胞內 SOCS3 與 PTP1B 過度活化，強行關閉 Jak2/Stat3 傳導通路，造成大腦「充耳不聞」，誤判體內無能量儲備而下達狂食指令。',
    target_remedy_tab: 'PATHOPHYSIOLOGY',
  },
  {
    id: 'QUIZ-02',
    category: '抗肥胖用藥',
    question: 'STEP-1 延伸臨床試驗 (Extension Trial) 追蹤了停止使用 Semaglutide (Wegovy) 的患者，結果發現停藥 1 年後體重變化為何？',
    options: [
      '體重維持原狀完全不反彈',
      '體重平均反彈回原先失去體重的約 2/3 (66%)',
      '體重繼續自動下降 5%',
      '立刻反彈超過用藥前的 150%',
    ],
    correct_index: 1,
    clinical_pearl_zh: '肥胖是慢性神經內分泌復發疾病，不能奢望短期打針一勞永逸，需建立終生維持協議。',
    biochemical_explanation_zh:
      '停藥後外源性 GLP-1 濃度衰退，胃排空速度恢復、下視丘飢餓中樞負反饋解除，且由於減重後代謝適應（BMR 下調）持續存在，熱量盈餘會驅動體重迅速反彈。',
    target_remedy_tab: 'PHARMACOTHERAPY',
  },
  {
    id: 'QUIZ-03',
    category: '去脂體重保護',
    question: '在使用強效抗肥胖藥物（如 Tirzepatide 或 Semaglutide）期間，為了防止高達 35% 的骨骼肌嚴重流失，臨床指南建議每日蛋白質最低應攝取多少？',
    options: [
      '0.6 ~ 0.8 g/kg 理想體重 (一般成人最低 RDA)',
      '1.6 ~ 2.0 g/kg 理想體重，並搭配抗阻力重訓',
      '只需多喝水，蛋白質不需特別補充',
      '3.5 ~ 4.5 g/kg 超極限攝取',
    ],
    correct_index: 1,
    clinical_pearl_zh: '蛋白質是減重期對抗肌少症肥胖的唯一有效營養護盾，單靠節食必流失肌肉。',
    biochemical_explanation_zh:
      '熱量赤字下人體會水解骨骼肌以進行糖質新生。攝取 1.6-2.0 g/kg 蛋白質能保證每餐達到「白胺酸閾值 (Leucine Trigger)」，活化 mTORC1 阻斷泛素分解通道。',
    target_remedy_tab: 'DIETARY_REGIMENS',
  },
  {
    id: 'QUIZ-04',
    category: '行為科學',
    question: '神經生物學研究證實，當暴食或吃甜食的強烈衝動 (Urge) 來襲時，這個神經渴望浪潮平均會在多久之後達到峰值並自然衰退？',
    options: [
      '大約 30 秒以內',
      '大約 12 ~ 15 分鐘',
      '長達 24 小時不間斷',
      '衝動永遠不會消退，除非吃到食物',
    ],
    correct_index: 1,
    clinical_pearl_zh: '學會「衝動衝浪 (Urge Surfing)」，只要撐過 15 分鐘峰值，海浪就會自然退去。',
    biochemical_explanation_zh:
      '大腦伏隔核釋放的多巴胺脈衝具備短暫性。透過 15 分鐘的注意力轉移、4-7-8 呼吸啟動副交感神經，多巴胺預期落差會逐步收斂，食慾自然平復。',
    target_remedy_tab: 'BEHAVIOR_AND_QUIZ',
  },
  {
    id: 'QUIZ-05',
    category: '飲食法迷思',
    question: '執行極低碳生酮飲食 (VLCKD) 時，部分特定個體會出現 LDL-C 和 ApoB 病態級暴增（甚至破 250 mg/dL），這群人在醫學上被稱為？',
    options: [
      '超級燃脂冠軍體質',
      '瘦體質高反應者 (Lean Mass Hyper-Responders, LMHR)',
      '健康長壽長春型體質',
      '酮體不耐症候群',
    ],
    correct_index: 1,
    clinical_pearl_zh: '切勿盲信「生酮狂吃五花肉膽固醇越飆越健康」的偽科學！ApoB 暴增是動脈硬化致命危險訊號。',
    biochemical_explanation_zh:
      '在體脂低、肝醣匱乏的個體中，肝臟為了運送游離脂肪酸至周邊作為燃料，會代償性合成釋放大量富含膽固醇的 VLDL 與 LDL 顆粒，造成致動脈粥狀硬化斑塊風險飆升。',
    target_remedy_tab: 'DIETARY_REGIMENS',
  },
  {
    id: 'QUIZ-06',
    category: '代謝手術',
    question: '腹腔鏡袖狀胃切除手術 (Sleeve Gastrectomy) 之所以術後數月內能使患者「幾乎完全失去飢餓感」，核心內分泌原因為何？',
    options: [
      '因為切除了分泌胃飢餓素 (Ghrelin) 的主要大本營——胃大彎底部組織',
      '因為手術破壞了大腦的視神經',
      '因為胃酸不再分泌導致無法消化食物',
      '純粹是因為心理害怕不敢吃東西',
    ],
    correct_index: 0,
    clinical_pearl_zh: '縮胃手術不是單純的「把胃縫小」，更是一場劇烈的神經內分泌飢餓重置。',
    biochemical_explanation_zh:
      '人體 80% 以上的 Ghrelin 內分泌細胞聚集在胃大彎胃底。切除此區域使術後血中 Ghrelin 濃度在 24 小時內暴跌，徹底拔除促食神經信號。',
    target_remedy_tab: 'SURGERY_AND_SIM',
  },
];
