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

  // --- Wave 1: BP Dipping & Pulse Pressure ---
  'CLAIM-BP-DIPPING': {
    id: 'CLAIM-BP-DIPPING',
    statement: '正常生理狀態下，夜間睡眠平均血壓應較日間清醒平均血壓下降 10% 至 20%（Nocturnal Dipping）。',
    value_kind: 'range',
    range_min: 10,
    range_max: 20,
    unit: '%',
    derivation: '24小時動態血壓監測 (ABPM) 日夜平均血壓比值生理統計',
    is_individual_prescription: false,
    misuse_guard: '非驟降型 (Non-dipper <10%) 或反向升高型 (Riser <0%) 為心血管與腦中風高風險表型，需進行 24小時動態血壓監測確認。',
  },
  'CLAIM-BP-PP-STIFFNESS': {
    id: 'CLAIM-BP-PP-STIFFNESS',
    statement: '脈壓差（收縮壓減舒張壓）≥60 mmHg 為大動脈管壁彈性減退與中央動脈硬化度升高之臨床標記。',
    value_kind: 'point',
    numeric_value: 60,
    unit: 'mmHg',
    derivation: 'Framingham Heart Study 脈壓差與冠心病長期追蹤統計',
    is_individual_prescription: false,
    misuse_guard: '脈壓差過大常發生於老年單純收縮期高血壓患者，需留意舒張壓不可降得過低（<60 mmHg）以免冠狀動脈灌流不足。',
  },

  // --- Wave 1: CGM TIR & TBR ---
  'CLAIM-GL-TIR': {
    id: 'CLAIM-GL-TIR',
    statement: '國際 CGM 共識建議：第一型與第二型糖尿病患者目標血糖範圍時間（TIR 70–180 mg/dL）應維持 >70%。',
    value_kind: 'point',
    numeric_value: 70,
    unit: '%',
    derivation: 'International Consensus on Time in Range (Diabetes Care 2019)',
    is_individual_prescription: false,
    misuse_guard: '脆弱老年人或嚴重低血糖高風險者，TIR 目標可放寬至 >50%，且首重預防 TBR 低血糖暴露。',
  },
  'CLAIM-GL-TBR': {
    id: 'CLAIM-GL-TBR',
    statement: 'CGM 低血糖時間（Time Below Range <70 mg/dL）嚴格建議控制在 <4% 總時間，<54 mg/dL 應 <1%。',
    value_kind: 'point',
    numeric_value: 4,
    unit: '%',
    derivation: 'International Consensus on Time in Range (Diabetes Care 2019)',
    is_individual_prescription: false,
    misuse_guard: '嚴禁為追求過高 TIR 而盲目過量注射胰島素導致 TBR 飆高，低血糖可誘發急性心律不整與意識喪失。',
  },

  // --- Wave 2: Non-HDL-C & CAC ---
  'CLAIM-LP-NONHDL': {
    id: 'CLAIM-LP-NONHDL',
    statement: '極高心血管風險族群之非高密度脂蛋白膽固醇（Non-HDL-C）次要治療目標建議應 <85 mg/dL（或 <70 mg/dL）。',
    value_kind: 'point',
    numeric_value: 85,
    unit: 'mg/dL',
    derivation: '2026 ACC/AHA 多學會血脂治療指引 secondary target',
    is_individual_prescription: false,
    misuse_guard: 'Non-HDL-C 涵蓋所有具致粥狀硬化性之含 ApoB 脂蛋白，尤其在三酸甘油酯 ≥200 mg/dL 時比單看 LDL-C 更能反映真實殘餘風險。',
  },
  'CLAIM-LP-CAC': {
    id: 'CLAIM-LP-CAC',
    statement: '無症狀個體冠狀動脈鈣化積分（CAC Score）≥100 Agatston 單位（或 ≥第75百分位數）提示顯著動脈粥狀硬化斑塊沉積。',
    value_kind: 'point',
    numeric_value: 100,
    unit: 'Agatston units',
    derivation: 'MESA 多中心動脈硬化研究 10 年心血管預後追蹤',
    is_individual_prescription: false,
    misuse_guard: 'CAC=0 可作為 5–10 年心血管極低風險安全窗，但若有吸菸、糖尿病或早發性心臟病家族史仍需綜合臨床判斷。',
  },

  // --- Wave 2: eGFR Slope ---
  'CLAIM-RN-SLOPE': {
    id: 'CLAIM-RN-SLOPE',
    statement: '慢性腎臟病患者之 eGFR 每年持續下降斜率若超過 3–5 mL/min/1.73m²/年，提示進入快速惡化進程。',
    value_kind: 'point',
    numeric_value: -3,
    unit: 'mL/min/1.73m2/year',
    derivation: 'CKD-EPI / KDIGO 蛋白尿與腎絲球過濾率縱向世代綜合分析',
    is_individual_prescription: false,
    misuse_guard: '單次 eGFR 波動受脫水、飲食高蛋白質或急性藥物影響；斜率判定必須基於至少 2–3 年內之多次連續檢測。',
  },

  // --- Wave 3: Sweat Rate & TPC ---
  'CLAIM-HY-SWEAT-RATE': {
    id: 'CLAIM-HY-SWEAT-RATE',
    statement: '在溫暖潮濕環境下中高強度耐力運動時，人體平均排汗速率介於每小時 0.5 至 2.0 公升之間。',
    value_kind: 'range',
    range_min: 0.5,
    range_max: 2.0,
    unit: 'L/h',
    derivation: 'Sports Medicine 耐力運動人體發汗計量研究整合數據',
    is_individual_prescription: false,
    misuse_guard: '流汗率存在極高之個體與環境溫濕度差異，補水不可機械化按表操課，應以運動前後體重差輔助評估。',
  },
  'CLAIM-OL-TPC': {
    id: 'CLAIM-OL-TPC',
    statement: '台灣餐飲業油炸油衛生法規標準：油炸油中總極性化合物（TPC）含量達到或超過 25% 時，必須立即全數換油。',
    value_kind: 'point',
    numeric_value: 25,
    unit: '%',
    derivation: '衛福部食藥署署授食字第 1001900044 號食用油脂法規公告',
    is_individual_prescription: false,
    misuse_guard: '總極性物質由三酸甘油酯受熱裂解、氧化聚合物組成，TPC ≥25% 代表油脂已嚴重劣化具細胞毒性。',
  },

  // --- Wave 4: Alcohol Synergy & FIB-4 ---
  'CLAIM-AL-SYNERGY': {
    id: 'CLAIM-AL-SYNERGY',
    statement: '同時具有長期飲酒、吸菸與嚼檳榔習慣者，其罹患食道癌之相對風險為三者皆無者的 123 倍（超乘法協同加成）。',
    value_kind: 'point',
    numeric_value: 123,
    comparator: 'vs 無菸、無酒、無檳榔接觸史者',
    exposure_definition: '同時具備常規飲酒、吸菸與嚼檳榔暴露',
    is_individual_prescription: false,
    misuse_guard: '三者在口腔黏膜與食道上皮之致癌協同效應呈指數級倍增，戒除單一因子即可顯著降低風險曲線。',
  },
  'CLAIM-BC-FIB4': {
    id: 'CLAIM-BC-FIB4',
    statement: 'FIB-4 肝纖維化指數 <1.30（年齡 ≥65 歲者 <2.0）具有高達 90% 以上之陰性預測值，可安全排除進展期肝纖維化 (F3–F4)。',
    value_kind: 'point',
    numeric_value: 1.30,
    unit: 'index',
    derivation: 'Hepatology 非創傷性肝纖維化多中心流病公式回歸驗證',
    is_individual_prescription: false,
    misuse_guard: 'FIB-4 僅為門診初篩分流工具，若 ≥1.30 應進一步安排肝臟彈性超音波 (FibroScan) 或專科評估。',
  },

  // --- Wave 5: VO2max & Sarcopenia ---
  'CLAIM-PA-VO2MAX': {
    id: 'CLAIM-PA-VO2MAX',
    statement: '心肺耐力最大攝氧量（VO2max）每提高 1 個代謝當量（1 MET = 3.5 mL/kg/min），全因死亡率顯著下降 10% 至 15%。',
    value_kind: 'range',
    range_min: 10,
    range_max: 15,
    unit: '%',
    derivation: 'Cleveland Clinic 12萬人運動跑步機試驗長期存活回歸分析',
    is_individual_prescription: false,
    misuse_guard: '心肺適能改善需透過規律之有氧心肺刺激，極高體能組依然存在死亡率保護無天花板效應。',
  },
  'CLAIM-PA-SARCOPENIA-GRIP': {
    id: 'CLAIM-PA-SARCOPENIA-GRIP',
    statement: '亞洲肌少症工作小組（AWGS 2019）診斷切點：成年男性握力 <28.0 kg、女性握力 <18.0 kg 定義為肌肉力量低下。',
    value_kind: 'point',
    numeric_value: 28,
    unit: 'kg',
    derivation: 'AWGS 2019 亞洲肌少症臨床診斷指引',
    is_individual_prescription: false,
    misuse_guard: '握力測試需使用校正之握力計進行雙手最大努力量測取最高值；力量低下需合併肌肉質量檢測確認診斷。',
  },

  // --- Wave 6: OSA AHI ---
  'CLAIM-SL-AHI-SEVERE': {
    id: 'CLAIM-SL-AHI-SEVERE',
    statement: '睡眠呼吸中止低通氣指數（AHI）≥30 次/小時定義為重度阻塞型睡眠呼吸中止症（Severe OSA）。',
    value_kind: 'point',
    numeric_value: 30,
    unit: 'events/h',
    derivation: 'AASM 睡眠醫學會多項生理睡眠檢查 (PSG) 標準切點',
    is_individual_prescription: false,
    misuse_guard: '重度 OSA 患者夜間反覆低血氧與交感神經劇烈震盪，是導致難治型高血壓與心肌梗塞之重要獨立危險因子。',
  },

  // --- Wave 7: Uric Acid & LDCT ---
  'CLAIM-UR-SOLUBILITY': {
    id: 'CLAIM-UR-SOLUBILITY',
    statement: '在人體生理體溫 37°C 與中性 pH 條件下，血清單鈉尿酸鹽（MSU）之物理化學飽和析出溶解度為 6.8 mg/dL。',
    value_kind: 'point',
    numeric_value: 6.8,
    unit: 'mg/dL',
    derivation: '單鈉尿酸鹽晶體之熱力學溶度積常數 (Ksp) 實驗物理化學測定',
    is_individual_prescription: false,
    misuse_guard: '血尿酸超過 6.8 mg/dL 即處於熱力學過飽和狀態，但在酸性關節微環境或低溫末梢（如腳大拇趾），析出閾值將進一步降低。',
  },
  'CLAIM-TW-LDCT': {
    id: 'CLAIM-TW-LDCT',
    statement: '台灣國健署 LDCT 肺癌公費篩檢對象：50–74 歲男性或 45–74 歲女性，具肺癌家族史或重度吸菸史達 30 包-年以上者。',
    value_kind: 'point',
    numeric_value: 30,
    unit: 'pack-years',
    derivation: '衛生福利部國民健康署 114 年擴大肺癌篩檢服務實施方案',
    is_individual_prescription: false,
    misuse_guard: '低劑量電腦斷層為高危險群二級預防篩檢，戒菸仍為降低肺癌發生率之最關鍵一級預防手段。',
  },
};
