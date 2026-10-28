import { EvidenceGrade } from '../types';
import { CHAPTER_W_PAGES } from './chapterW';
import { CHAPTER_O_PAGES } from './chapterO';
import { CHAPTER_A_PAGES } from './chapterA';

export interface PillarActionDetail {
  title: string;
  one_liner: string;
  points: string[];
  evidence_grade: EvidenceGrade;
  evidence_source: string;
  key_metric?: {
    label: string;
    target: string;
    unit?: string;
  };
  caution?: string;
  action_item?: string;
}

export interface FourPillarsProfile {
  page_id_or_topic: string;
  title_zh: string;
  topic_badge: string;
  diet: PillarActionDetail;
  exercise: PillarActionDetail;
  prevention: PillarActionDetail;
  treatment: PillarActionDetail;
}

const ALL_KNOWLEDGE_PAGES = [...CHAPTER_W_PAGES, ...CHAPTER_O_PAGES, ...CHAPTER_A_PAGES];

/**
 * 四大健康維度（飲食、運動、預防、治療）臨床標準資料庫
 * 依據 Oxford CEBM、GRADE 評級與 2024-2026 國際最新指引編纂
 */
export const FOUR_PILLARS_DATA_REGISTRY: Record<string, FourPillarsProfile> = {
  // ── 水分與水合 (Chapter W) ──
  'W': {
    page_id_or_topic: 'W',
    title_zh: '水分代謝與電解質平衡',
    topic_badge: '體液生理學',
    diet: {
      title: '精準補水與水合指數飲食法',
      one_liner: '以體重 × 30–35 mL 為基礎經驗估算，搭配富含鉀鎂高水合蔬果與全日均勻分配。',
      points: [
        '日常經驗基準：健康成人每日攝取約 30–35 mL/kg，包含白開水、無糖茶與天然食物中水分。',
        '高水合飲食：小黃瓜（96%）、西瓜（92%）、番茄（94%）等高水分蔬果含有天然電解質與纖維，水份吸收更平緩。',
        '避免利尿負債：大量飲用高咖啡因或酒精時，需等量額外補充純水，防止細胞外液滲透壓劇烈上升。'
      ],
      evidence_grade: 'A',
      evidence_source: 'EFSA Scientific Opinion on Dietary Reference Values for Water / 台灣衛福部國健署指引',
      key_metric: { label: '每日水份基準', target: '30–35', unit: 'mL/kg' },
      action_item: '早起一杯 250mL 溫水，工作期間每 2 小時主動小口啜飲 150mL。'
    },
    exercise: {
      title: '運動流汗率推算與補水節奏',
      one_liner: '以運動前後體重差推估流汗率，失水超標 2% 體重即顯著削弱心肺與認知表現。',
      points: [
        '流汗率公式：運動前體重 - 運動後體重 + 運動中飲水量 = 總出汗量。',
        '運動中補充：運動超過 60 分鐘或高溫高濕環境，每 15–20 分鐘補充 150–250 mL 含 4–8% 碳水與電解質飲品。',
        '運動後回補：流失每 1 公斤體重，分 2–4 小時均勻回補 1.25–1.5 公升液體以利水分真正留存。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ACSM Position Stand: Exercise and Fluid Replacement',
      key_metric: { label: '失水警訊上限', target: '< 2%', unit: '體重減損' },
      action_item: '長跑或高強度訓練前 2 小時預先補充 400–600 mL 水分。'
    },
    prevention: {
      title: '尿液顏色自我篩檢與脫水熱傷害防範',
      one_liner: '觀察清晨第二泡尿顏色比對 Armstrong 8 階色卡，維持淡檸檬黃的理想水合狀態。',
      points: [
        '尿色評估法：1–3 號淡黃代表水合充足；4–6 號琥珀深黃代表已達中度脫水；7–8 號深茶色為嚴重警訊。',
        '高風險防範：長者因下視丘口渴中樞遲鈍，不可等口渴才喝水，需定時定量主動補水。',
        '心腎疾病監控：心臟衰竭或慢性腎臟病第 4/5 期患者，水分攝取須配合每日體重嚴格控管。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Armstrong Urine Color Chart Protocol / KDIGO 臨床指引',
      key_metric: { label: '尿液比重目標', target: '1.010–1.020' },
      action_item: '每日檢視排尿顏色，維持淡黃清澈；戶外活動備妥遮陽與電解質補充品。'
    },
    treatment: {
      title: '急性脫水與低血鈉醫療處置階梯',
      one_liner: '輕中度脫水口服補液鹽（ORS）；極端低血鈉嚴禁快速灌入純水，需醫療靜脈處置。',
      points: [
        '口服補液標準（ORS）：WHO 配方含鈉 75 mmol/L 與葡萄糖 75 mmol/L，利用鈉-葡萄糖同向轉運蛋白（SGLT1）加速腸道水吸收。',
        '低血鈉急救原則：劇烈馬拉松後昏厥、頭痛、噁心嘔吐，懷疑運動性低血鈉症（EAH），切勿再給純水，需緊急送醫量測電解質。',
        '急診醫學處置：重度低血鈉或中暑休克需給予高濃度高滲鹽水（3% NaCl）或生理食鹽水，並嚴密監測滲透壓避免腦橋中央髓鞘溶解。'
      ],
      evidence_grade: 'A',
      evidence_source: 'WHO ORS Guidelines / Wilderness Medical Society Practice Guidelines for EAH',
      caution: '🚨 出現意識混亂、嗜睡、抽搐、無尿超過 8 小時或心悸昏厥，必須立即撥打 119 送急診！',
      action_item: '夏日運動備有口服補液鹽包；三高與慢腎病患用藥（如利尿劑）依專科醫囑調整。'
    }
  },

  // ── 油脂與烹調 (Chapter O) ──
  'O': {
    page_id_or_topic: 'O',
    title_zh: '脂肪酸結構、烹調油品與脂質代謝',
    topic_badge: '動脈硬化阻斷',
    diet: {
      title: '高單元不飽和與低飽和脂肪替換法',
      one_liner: '以特級初榨橄欖油、苦茶油或酪梨油取代牛油豬油，嚴格將飽和脂肪壓制在總熱量 10% 以下。',
      points: [
        '單元不飽和脂肪酸（MUFA）：油酸（Oleic acid）能提高 LDL 顆粒穩定性，減少氧化 LDL 產生。',
        '多不飽和平衡（PUFA）：每週攝取 2 次富含 Omega-3 的深海魚（鮭魚、鯖魚），維持 Omega-6/3 健康比例。',
        '烹調發煙點配合：涼拌用初榨橄欖油；高溫煎炒改用高油酸葵花油、苦茶油或精煉酪梨油，避免游離基與多環芳香烴。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AHA/ACC Guideline on Dietary Fat / PREDIMED Trial (NEJM)',
      key_metric: { label: '飽和脂肪上限', target: '< 10%', unit: '每日總熱量' },
      action_item: '家庭廚房備「一高一低」兩瓶油：一瓶特級初榨橄欖油用於冷拌中火，一瓶高發煙點苦茶油用於快炒。'
    },
    exercise: {
      title: '脂質氧化率最佳化與 Zone 2 訓練',
      one_liner: '低強度有氧訓練（FatMax）能擴增骨骼肌粒線體密度與脂肪酸氧化轉運酵素（CPT-1）。',
      points: [
        'Zone 2 脂肪燃燒窗：在最大心率 60–70% 區間進行有氧運動，肌肉動員游離脂肪酸（FFA）氧化效率最高。',
        '改善餐後血脂：餐後 30 分鐘輕度步行 15–20 分鐘，能活化微血管內皮脂蛋白脂酶（LPL），加速清除血液中三酸甘油酯。',
        '阻力訓練效益：每週 2 次大肌群重訓，增加骨骼肌質量，擴充三酸甘油酯儲存與胰島素敏感性受體。'
      ],
      evidence_grade: 'A',
      evidence_source: 'San-Millán & Brooks, Sports Medicine / AHA Physical Activity Guidelines',
      key_metric: { label: 'Zone 2 週總時數', target: '150–300', unit: '分鐘/週' },
      action_item: '晚餐後不要立即坐臥，全家人輕鬆散步 15 分鐘降血脂。'
    },
    prevention: {
      title: '脂質微粒 ApoB 與血管鈣化積分早篩',
      one_liner: '超越傳統 LDL-C，追蹤 ApoB 總致動脈硬化顆粒數，40 歲後評估 CAC 冠狀動脈鈣化指數。',
      points: [
        'ApoB 致動脈硬化核心：每一個致病微粒（LDL, VLDL, IDL）均帶有一個 ApoB，是心血管事件的最強單一獨立預測因子。',
        '非高密度脂蛋白（Non-HDL）：總膽固醇減去 HDL，目標為 < 100–130 mg/dL。',
        'CAC 掃描分流：Agatston Score = 0 意味未來 5 年動脈硬化風險極低；> 100 應積極啟動降脂處方。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ESC/EAS Guidelines for the Management of Dyslipidaemias / TSOC 2022',
      key_metric: { label: '高風險 ApoB 目標', target: '< 80', unit: 'mg/dL' },
      action_item: '年度體檢主動加驗 ApoB 與高敏感度 CRP，及早發現隱形動脈粥狀硬化。'
    },
    treatment: {
      title: '血脂異常之階梯化藥物與心血管二級預防',
      one_liner: '生活型態未達標時，以 Statin 類藥物為基石，配合 Ezetimibe 或 PCSK9 抑制劑達標。',
      points: [
        '第一線基石藥物：高強度 Statin（如 Atorvastatin 20–40mg 或 Rosuvastatin 10–20mg）可降低 LDL-C 達 50% 以上並穩定斑塊。',
        '第二線聯合治療：若單用 Statin 未達目標，合併膽固醇吸收抑制劑 Ezetimibe，可再降 15–20% LDL-C。',
        '極高危險群針劑：PCSK9 單株抗體或小干擾 RNA（Inclisiran），能強力清除血液循環中的 ApoB 顆粒。'
      ],
      evidence_grade: 'A',
      evidence_source: 'TSOC 台灣動脈硬化與血脂異常指引 / ACC/AHA Multi-society Cholesterol Guideline',
      caution: '🚨 冠心病、缺血性中風病史者，降血脂藥物不可任意中斷；若出現胸骨後壓迫性悶痛、延伸至左肩下巴，立即就醫！',
      action_item: '遵照心臟內科醫師處方按時服藥，每 3 個月複查肝功能與空腹血脂。'
    }
  },

  // ── 酒精與代謝 (Chapter A) ──
  'A': {
    page_id_or_topic: 'A',
    title_zh: '酒精代謝、乙醛毒性與 ALDH2 缺損',
    topic_badge: '毒物學與防癌',
    diet: {
      title: '乙醛排毒防護與營養素支援',
      one_liner: '嚴禁空腹飲酒；補充足量抗氧化維生素 C、B 群複合體與優質蛋白質減輕肝臟氧化負擔。',
      points: [
        '飽胃效應：進食富含蛋白質、脂質與膳食纖維的正餐後再飲酒，可減緩胃排空速率 2–3 倍，削弱血中酒精高峰。',
        'B 群消耗代償：乙醇轉化為乙醛再轉乙酸的過程中消耗大量 NAD+，補充維生素 B1（硫胺素）、B6 預防神經損傷。',
        '非酒精社交替代：以氣泡水、康普茶或無酒精釀造飲取代含酒精飲品，徹底杜絕一級致癌物暴露。'
      ],
      evidence_grade: 'B',
      evidence_source: 'IARC Monographs on Alcoholic Beverages / USDA Dietary Guidelines',
      key_metric: { label: '致癌安全劑量', target: '0', unit: '克 (無安全劑量)' },
      action_item: '應酬前必先吃半碗燕麥或一份茶葉蛋豆漿，切勿空腹乾杯。'
    },
    exercise: {
      title: '酒精消除迷思與運動復原安全防線',
      one_liner: '流汗無法加速酒精代謝（90% 由肝酵素恆速代謝）；飲酒後 24 小時內嚴禁高強度運動。',
      points: [
        '肝臟恆速清除率：健康成人每小時僅能清除約 10–12 公克純酒精（零級動力學），運動發汗對清除酒精微乎其微。',
        '心律不整與脫水：酒精抑制抗利尿激素造成脫水，且增加心房顫動（假日心臟症候群 Holiday Heart Syndrome）風險。',
        '肌肥大受阻：飲酒顯著抑制 mTORC1 訊號途徑，使重訓後的肌肉蛋白質合成率（MPS）驟降 30% 以上。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Parr et al., PLOS ONE (Alcohol Impairs MPS) / AHA Holiday Heart Syndrome',
      key_metric: { label: '飲酒後重訓間隔', target: '> 24', unit: '小時' },
      action_item: '訓練日徹底滴酒不沾，以確保肌肉合成與神經動作控制安全。'
    },
    prevention: {
      title: 'ALDH2 基因不耐篩檢與上消化道癌防範',
      one_liner: '台灣近半數人口帶有 ALDH2 基因突變（喝酒臉紅）；此族群飲酒罹患食道癌風險暴增高達 50 倍！',
      points: [
        '酒精臉紅檢驗：飲酒後臉紅、心悸、頭痛，為乙醛去氫酶活性不全之典型表現，乙醛在一級致癌物中蓄積。',
        '食道癌與頭頸癌高危：帶有此突變且有飲酒習慣者，食道鱗狀細胞癌與口腔癌風險顯著倍增。',
        '定期內視鏡篩檢：若過去有長期飲酒史且帶有臉紅體質，45 歲起建議定期接受上消化道內視鏡（窄頻影像 NBI）檢查。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Taiwan Biobank Genomic Study / Lancet Oncology / 國衛院研究報告',
      key_metric: { label: '台灣突變盛行率', target: '約 47%', unit: '高居全球第一' },
      action_item: '以 AUDIT-C 酒精自評量表審視自己與家人的飲酒風險級別。'
    },
    treatment: {
      title: '酒精依賴醫學戒斷與急性中毒急救',
      one_liner: '重度酒精戒斷可能引發震顫性譫妄（DT），需住院醫療監護；戒酒藥物可輔助維持戒除。',
      points: [
        '戒斷症狀監護：長期大量飲酒者驟然停止，可能在 48–72 小時內爆發幻覺、抽搐與震顫性譫妄，需 Benzodiazepine 藥物預防致死。',
        '戒酒輔助藥物：FDA 核准之 Naltrexone（鴉片類拮抗劑阻斷酒精欣快感）與 Acamprosate（調節谷氨酸受體減輕渴求）。',
        '急性中毒處置：醉酒昏睡者必須保持側臥復甦姿勢防止嘔吐物窒息，意識不清應立即撥打 119 送醫。'
      ],
      evidence_grade: 'A',
      evidence_source: 'American Psychiatric Association (APA) Guideline for Alcohol Use Disorder',
      caution: '🚨 飲酒者若出現劇烈嘔吐物帶血、呼吸每分鐘少於 8 次、皮膚濕冷青紫或呼叫不醒，為急性酒精中毒，立即送急診！',
      action_item: '尋求各縣市公費戒酒門診與成癮專科醫師協助，給予全人醫療心理介入。'
    }
  },

  // ── 心血代謝 (Cardiometabolic) ──
  'cardiometabolic': {
    page_id_or_topic: 'cardiometabolic',
    title_zh: '心血管與代謝症候群整體防護',
    topic_badge: '心臟內科與代謝醫學',
    diet: {
      title: 'DASH 得舒飲食與地中海雙模心臟保護',
      one_liner: '多蔬果、高鉀鎂、低鈉、富含全穀與優質油脂，收縮壓最高可降低達 11 mmHg。',
      points: [
        '得舒飲食原則：每日 5 份蔬菜、5 份水果、全穀雜糧取代精製白米，高鉀幫助腎臟排鈉降低外周血管阻力。',
        '嚴格控制每日鈉：每日食鹽攝取量少於 5–6 公克（鈉 < 2,300 mg），高血壓患者建議 < 1,500 mg。',
        '少紅肉多魚豆：以豆製品、白肉與深海魚取代加工肉品與高脂紅肉，遠離 TMAO 血管發炎因子。'
      ],
      evidence_grade: 'A',
      evidence_source: 'DASH Trial (NEJM) / TSOC/THA 2022 Hypertension Guidelines',
      key_metric: { label: '每日鈉攝取上限', target: '< 2,000', unit: 'mg' },
      action_item: '採購食品習慣閱讀營養標示，避開鈉含量超過 400mg/100g 的加工陷阱。'
    },
    exercise: {
      title: '每週 150 分鐘中強度有氧與等長握力處方',
      one_liner: '規律有氧運動可降低血壓 5–8 mmHg，搭配握力阻力訓練加乘改善血管彈性。',
      points: [
        '150 分鐘中強度：每週累積至少 150 分鐘快走、慢跑或騎車，達「微喘但仍可對話」的 Zone 2 強度。',
        '等長握力訓練：每週 3 次、每次 4 回 2 分鐘（30% 最大握力），已被實證可顯著降低收縮壓。',
        '運動前血壓安全閥：若收縮壓 > 160 或舒張壓 > 100 mmHg，應先休息調養，暫停劇烈重訓與高強度衝刺。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AHA Scientific Statement on Exercise Standards / British Journal of Sports Medicine (BJSM 2023 Meta-analysis)',
      key_metric: { label: '有氧頻率', target: '每週 3–5 天，每次 30–50 分鐘' },
      action_item: '今天開始下班提早一站下車，快走 20 分鐘回家。'
    },
    prevention: {
      title: '722 居家連續血壓與代謝五指標自檢',
      one_liner: '落實連續 7 天、早晚 2 遍、各量 2 回取平均的 722 原則，打破白袍高血壓迷思。',
      points: [
        '722 檢驗準則：早起排尿後與睡前安靜坐定 5 分鐘量測，標準為 < 120/80 mmHg，≥ 130/80 即為高血壓。',
        '代謝症候群 5 查 3：腰圍（男≥90女≥80）、血壓（≥130/85）、空腹血糖（≥100）、三酸甘油酯（≥150）、HDL（男<40女<50），符合 3 項即為警訊。',
        '頸動脈超音波與 CAC：高風險族群 40 歲後篩檢動脈內膜中層厚度（IMT）與斑塊穩定度。'
      ],
      evidence_grade: 'A',
      evidence_source: 'TSOC 台灣心臟學會 2022 高血壓指引 / 國健署代謝症候群標準',
      key_metric: { label: '居家血壓目標', target: '< 120 / 80', unit: 'mmHg' },
      action_item: '準備一台合格手臂式電子血壓計，建立連續 722 晨昏血壓紀錄表。'
    },
    treatment: {
      title: '第一線複方降壓藥物與動脈硬化醫學阻斷',
      one_liner: 'ARB/ACEi、CCB、利尿劑三類為第一線降血壓首選；血壓 ≥ 140/90 時建議單片複方（SPC）。',
      points: [
        '單片複方（SPC）：結合鈣離子阻斷劑（如 Amlodipine）與血管張力素受體阻斷劑（如 Telmisartan），服藥順從性提升 60%。',
        '心腎保護效益：糖尿病或蛋白尿患者首選 SGLT2i（排糖藥）與 ARB，兼具延緩腎衰與降低心衰竭住院效益。',
        '急性心血管發作：若出現突發性撕裂劇烈胸痛、單側肢體癱瘓口角歪斜（FAST 中風症狀），分秒必爭送醫。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ACC/AHA Hypertension Guideline / TSOC Clinical Practice Guidelines',
      caution: '🚨 降壓藥切忌自覺無不適而任意停藥，突然停藥易引發反彈性高血壓與出血性腦中風！',
      action_item: '固定每日早晨同一時間服用降壓藥物，就診時攜帶 722 紀錄提供主治醫師調藥依據。'
    }
  },

  // ── 增肌減脂 (Obesity & Recomposition) ──
  'obesity': {
    page_id_or_topic: 'obesity',
    title_zh: '體組成科學：增肌減脂與代謝醫學',
    topic_badge: '體態重組與新陳代謝',
    diet: {
      title: '2:1:1 減脂餐盤與蛋白質槓桿處方',
      one_liner: '蔬菜佔 1/2、優質蛋白質 1/4、原型碳水 1/4；減脂期每日每公斤體重補充 1.6–2.2 克蛋白質。',
      points: [
        '2:1:1 視覺餐盤：高纖蔬菜延緩胃排空並平抑餐後血糖波動；蛋白質刺激腸道分泌 Satiety 飽足荷爾蒙（GLP-1/PYY）。',
        '熱量溫和赤字：每日減少 300–500 大卡（非極端節食），維持基礎代謝率（BMR）不受皮質醇抑制。',
        '碳水化合物循環：重訓日適度攝取複合碳水補充肝醣，休息日降低碳水以燃燒游離脂肪酸。'
      ],
      evidence_grade: 'A',
      evidence_source: 'International Society of Sports Nutrition (ISSN) Position Stand / Harvard Healthy Eating Plate',
      key_metric: { label: '每日蛋白質攝取', target: '1.6–2.2', unit: 'g/kg 體重' },
      action_item: '每餐先吃蔬菜與清湯、次吃蛋白質豆魚蛋肉，最後才吃全穀澱粉。'
    },
    exercise: {
      title: '漸進性超負荷阻力重訓與肌肉保留處方',
      one_liner: '減重最怕流失骨骼肌；每週 2–4 次阻力訓練是維持基礎代謝與預防肌少型肥胖的唯一救星。',
      points: [
        '漸進性超負荷（Progressive Overload）：記錄每次重量與次數，以 RPE 7–9 自覺強度刺激肌纖維橫截面肥大。',
        '多關節大肌群主導：深蹲、硬舉、推胸、划船動員最多肌群與生長激素分泌。',
        'NEAT 非運動性活動消耗：每小時起身活動 2 分鐘，日行 7,000–10,000 步，增加全天總能量消耗（TDEE）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ACSM Position Stand: Quantity and Quality of Exercise / Morton et al., BJSM Meta-analysis',
      key_metric: { label: '重訓頻率', target: '每週 2–4 次，涵蓋全身大肌群' },
      action_item: '安排固定週一/四練下肢、週二/五練上肢的推拉課表。'
    },
    prevention: {
      title: '腰臀比、腰圍身高比與內臟脂肪評估',
      one_liner: '體重計數字會騙人；腰圍身高比（WHtR）大於 0.5 是內臟脂肪堆積與慢性發炎的紅色警戒。',
      points: [
        'WHtR 黄金指標：腰圍 ÷ 身高，保持在 0.5 以下；超過 0.5 代表心血管與脂肪肝風險翻倍。',
        '肌肉量保衛戰：長者或減重者每 3–6 個月進行雙能量 X 光吸收儀（DXA）或醫用 InBody 檢驗四肢骨骼肌指數（ASMI）。',
        '睡眠抗肥胖：睡眠不足 6 小時會造成瘦素（Leptin）下降、飢餓素（Ghrelin）激增，渴望高糖高脂。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Ashwell et al., Obesity Reviews (WHtR superiority over BMI) / EOSS Edmonton Staging',
      key_metric: { label: '腰圍身高比目標', target: '< 0.50' },
      action_item: '拿布尺量測肚臍水平腰圍，除以身高，確保小於 0.5。'
    },
    treatment: {
      title: '肥胖醫學階梯：生活介入、GLP-1 藥物至代謝手術',
      one_liner: 'BMI ≥ 27 併發三高或 BMI ≥ 30 者，可評估 GLP-1/GIP 雙受體腸泌素藥物，重度者評估減重手術。',
      points: [
        '新型腸泌素藥物（Semaglutide / Tirzepatide）：模擬人體飽足荷爾蒙，平均體重降幅可達 15–22%，需防範骨骼肌流失。',
        '減重藥物停用反彈對策：用藥期間必須建立自主力量訓練與高蛋白飲食習慣，避免停藥後脂肪急速反撲。',
        '減重代謝手術（袖狀胃切除 / 胃繞道）：BMI ≥ 37.5 或 BMI ≥ 32.5 合併難以控制糖尿病，公費部分給付之根治性選項。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AACE/ACE Clinical Practice Guidelines for Obesity / 台灣肥胖醫學會臨床指引',
      caution: '🚨 正在使用 GLP-1 減重針劑者，必須充足補充蛋白質並重訓，否則流失的體重中有高達 40% 可能為骨骼肌！',
      action_item: '肥胖是慢性疾病，至各大醫學中心新陳代謝科或體重管理門診尋求合格專科醫師協助。'
    }
  },

  // ── 脊椎與神經 (Spine & Nerves) ──
  'spine': {
    page_id_or_topic: 'spine',
    title_zh: '脊椎結構、骨鬆壓迫性骨折、3D導航微創手術與術後照護',
    topic_badge: '微創脊椎外科與復健醫學',
    diet: {
      title: '造骨抗發炎飲食、高蛋白組織修復與術後防便秘減壓',
      one_liner: '每日補足優質蛋白質（1.2–1.5g/kg）、鈣（1000mg）與維生素 D3（800–2000 IU）；高纖多水防便秘閉氣用力。',
      points: [
        '骨質與傷口修復三要素：每日補充 1000–1200 mg 鈣質（鮮奶、板豆腐、黑芝麻）、800–2000 IU 維生素 D3 與足量蛋白質，加速骨折骨痂與術後組織癒合。',
        '預防便秘防腹壓暴增：術後或骨折患者若排便憋氣用力（Valsalva 動作）會使椎管內壓瞬間飆升，務必每日飲水 1500–2000 ml 並攝取高纖蔬果。',
        '絕對戒菸與抗發炎：尼古丁會使脊椎融合植骨不癒合率暴增 2–3 倍；Omega-3 與維生素 B12 則有助減緩神經根炎性水腫並修復髓鞘。'
      ],
      evidence_grade: 'A',
      evidence_source: 'IOF 國際骨質疏鬆症基金會指引 / 台灣醫學中心脊椎術後營養照護規範',
      key_metric: { label: '每日鈣 + 維生素 D3', target: '1000mg 鈣 + 800IU D3' },
      action_item: '三餐每餐一掌心豆魚蛋肉類，每日喝足 1500ml 水並搭配奇異果或木瓜保持排便順暢。'
    },
    exercise: {
      title: 'McGill 護脊三大動作、圓滾木翻身與分階段復健處方',
      one_liner: '骨折與術後嚴守「圓滾木翻身」與「先穿背架再坐起」；穩定後以 McGill Big 3 強化多裂肌，終生禁仰臥起坐。',
      points: [
        '急性期與術後床邊鐵律：翻身時肩、胸、臀保持一直線同步側轉（圓滾木翻身法），雙腿垂下床沿同時以雙手推床面坐起，嚴禁直接仰臥起坐。',
        'McGill 護脊黃金三大動作：改良式捲腹、側棒式（Side Bridge）、四足跪姿鳥狗式（Bird-Dog），在「零腰椎彎曲剪力」下深度活化多裂肌與腹橫肌。',
        '骨鬆與術後步行處方：依 Lancet WalkBack 實證，每日穿戴適當背架分次累積步行 30 分鐘，可降低 45% 下背痛復發並防範長期臥床肌少失能。'
      ],
      evidence_grade: 'A',
      evidence_source: 'McGill Spine Biomechanics / Lancet WalkBack Trial 2024 / 台灣醫學中心復健指引',
      key_metric: { label: '護脊步行與核心', target: '每日步行 30 分 + Big 3' },
      action_item: '上下床全面改用「先側躺、雙手推床起身」標準動作，每坐 30–40 分鐘定時起身走動。'
    },
    prevention: {
      title: '背架穿戴黃金口訣、日常三不禁忌與二次骨折攔截',
      one_liner: '背架謹記「先穿再坐、先躺再脫」；日常嚴守「不彎腰、不扭轉提重、不坐矮軟沙發」，並持續抗骨鬆藥物。',
      points: [
        '背架穿戴黃金口訣：下床前平躺先穿妥背架、躺平後才脫下（內穿棉質衫防摩擦、內褲穿在背架外方便如廁），依醫囑穿戴 1.5–6 個月。',
        '日常姿勢三不禁忌：撿物改用「屈膝蹲下（髖鉸鏈）」或長柄取物夾，絕不彎腰；術後 3 個月禁提 >3–5kg 重物；禁坐矮板凳、軟沙發與蹲式馬桶。',
        '阻斷骨牌式再骨折：脊椎壓迫性骨折或灌骨泥術後，1 年內鄰近節段再骨折率達 15–20%，必須定期檢測 DXA 骨密度並銜接抗骨鬆藥物（保骼麗切勿擅自停藥）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AACE 骨質疏鬆指引 / 臺中市立老人復健綜合醫院骨科部・微創脊椎中心臨床衛教',
      key_metric: { label: '背架黃金口訣', target: '先穿再坐・先躺再脫' },
      action_item: '為家中長輩浴室加裝馬桶增高器、安全扶手與防滑淋浴椅，消除彎腰與跌倒風險。'
    },
    treatment: {
      title: '3D電腦導航微創脊椎內視鏡、OLIF 側開與微創氣球骨泥手術',
      one_liner: '保守治療無效或急性塌陷時，透過 O-arm 3D 導航、雙通道內視鏡（UBE）、OLIF 側開或 PKP 氣球骨泥達成精準減壓與快速康復。',
      points: [
        '微創氣球擴張骨泥成形術（PKP）：針對 MRI STIR 確認新鮮水腫之急性壓迫性骨折，以氣球撐開椎體低壓注入高黏度骨泥，迅速止痛並降低外漏風險。',
        '全脊椎內視鏡（UBE/PELD）與 OLIF 側開融合：小於 1cm 微孔 30 倍放大清除骨刺與突出椎間盤，或經側腹天然間隙置入大支架間接減壓，完整保留多裂肌，當天下床、隔天出院。',
        '3D 電腦導航（O-arm GPS）：術中即時 3D 立體定位，無須過度牽拉神經即可精準置釘（>99% 精準度），安全完成高難度脊椎翻修、側彎與駝背畸形矯正。'
      ],
      evidence_grade: 'A',
      evidence_source: '臺中市立老人復健綜合醫院（中國醫大經營）微創脊椎中心：張建鈞副院長團隊 (SNQ 國家品質標章) / AO Spine',
      caution: '🚨 若出現大小便解不出或失禁、會陰鞍部麻木、雙腳快速無力（馬尾症候群），或術後傷口紅腫流膿、滲出清澈水樣液伴劇烈頭痛、發燒 >38°C，請立即急診！',
      action_item: '背痛伴隨翻身困難或手腳麻木超過 2 週，請至微創脊椎外科或神經外科進行 MRI 與神經學精準評估。'
    }
  },

  // ── 睡眠・呼吸・正念 (Sleep, Breath & Mindfulness) ──
  'mindbody': {
    page_id_or_topic: 'mindbody',
    title_zh: '睡眠、呼吸法（卡帕拉巴提・吐納）與正念冥想的身心修復處方',
    topic_badge: '睡眠醫學與身心醫學',
    diet: {
      title: '咖啡因截止、晚餐時機與不以酒助眠',
      one_liner: '一杯咖啡至少在睡前 8.8 小時喝完；晚餐在睡前 3 小時吃完；酒精讓後半夜睡眠破碎，不能當助眠劑。',
      points: [
        '咖啡因截止：Gardiner 2023 統合分析指出一杯咖啡（約 107 mg）需在睡前 8.8 小時以上、運動補給品（約 218 mg）需 13 小時以上，否則平均少睡約 45 分鐘、深睡減少。',
        '晚餐與宵夜：睡前 3 小時吃完正餐，避免飽食平躺造成胃食道逆流與夜醒；餓了可喝一小杯溫牛奶或無糖豆漿。',
        '酒精不是助眠劑：雖然入睡變快，但壓抑 REM、讓後半夜頻繁醒來，並加重打鼾與睡眠呼吸中止。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Gardiner et al., Sleep Med Rev 2023 / 歐洲失眠指引 2023',
      key_metric: { label: '咖啡因截止', target: '睡前 ≥ 9 小時' },
      action_item: '預計 23:00 上床者，咖啡、濃茶與能量飲料在 14:00 前喝完。'
    },
    exercise: {
      title: '白天運動、晨光與「早上油門、晚上煞車」的呼吸節律',
      one_liner: '規律有氧與太極改善睡眠；卡帕拉巴提等快速呼吸只在早上做，睡前改做慢呼吸、吐納與伸展。',
      points: [
        '白天動起來：每週 150 分鐘中等強度運動改善入睡與睡眠品質；傍晚運動不傷睡眠，高強度在睡前 1 小時內結束可能延後入睡（Stutz 2019）。',
        '太極與氣功：長者慢性失眠 12 週太極改善幅度與一般運動相當，且維持 24 個月（Siu, JAMA Netw Open 2021）。',
        '呼吸法分時段：卡帕拉巴提（每秒 1 下 × 20 下 × 3 輪）屬激發型，放早上；睡前做吸 4 吐 6 共振呼吸或六字訣 5–10 分鐘。'
      ],
      evidence_grade: 'B',
      evidence_source: 'Stutz et al., Sports Med 2019 / Siu et al., JAMA Netw Open 2021 / Raghuraj 1998',
      key_metric: { label: '睡前慢呼吸', target: '6 次／分 × 5–20 分鐘' },
      action_item: '起床 1 小時內出門快走 10 分鐘曬晨光；睡前 20 分鐘做吸 4 吐 6。'
    },
    prevention: {
      title: '固定起床、睡眠日記與 CAP-D 每週迭代',
      one_liner: '睡眠規律度比時數更能預測死亡風險；以睡眠日記計算效率，≥ 90% 提早 15 分鐘上床、< 85% 延後 15 分鐘。',
      points: [
        '固定起床時間：週末差距 ≤ 1 小時；UK Biobank 6 萬人研究顯示睡眠規律度比睡眠時數更能預測全因死亡（Windred 2024）。',
        '光線管理：白天戶外光 ≥ 1,000 lux、室內 ≥ 250 lux；睡前 3 小時室內光 ≤ 10 lux（Brown 2022 國際共識）。',
        'CAP-D 睡眠日記：Check 7 晚數據 → Act 依睡眠效率調整 → Plan 下週窗口 → Do 執行，每週只改一件事。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Windred et al., Sleep 2024 / Brown et al., PLoS Biol 2022 / AASM 2021',
      key_metric: { label: '睡眠效率', target: '≥ 85%' },
      action_item: '從明天起連續 7 天、每天早上花 1 分鐘記錄上床、起床、入睡所需與半夜清醒時間。'
    },
    treatment: {
      title: 'CBT-I 第一線、正念課程與安眠藥的正確定位',
      one_liner: '慢性失眠首選 CBT-I；MBSR 治療焦慮不劣於 escitalopram，MBCT 降低憂鬱復發 31%；安眠藥僅短期使用。',
      points: [
        'CBT-I 為慢性失眠第一線治療（AASM 2021、ACP 2016、歐洲 2023），核心是刺激控制與睡眠限制，效果在療程結束後仍持續。',
        '正念課程：8 週 MBSR 對焦慮症效果不劣於 escitalopram（Hoge 2023）；MBCT 使憂鬱復發風險降低 31%（Kuyken 2016）。',
        '安眠藥與褪黑激素：Z 藥與苯二氮平類僅建議短期使用；長者跌倒與認知風險高；褪黑激素主要用於晝夜節律問題。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Edinger et al., JCSM 2021 / Qaseem et al., Ann Intern Med 2016 / Hoge et al., JAMA Psychiatry 2023',
      caution: '🚨 大聲打鼾合併呼吸暫停、白天嚴重嗜睡請做睡眠檢查；卡帕拉巴提禁用於懷孕、未控制高血壓、心臟病、癲癇、疝氣、曾氣胸者；有自傷念頭請撥 1925（24 小時）。',
      action_item: '每週 ≥ 3 晚失眠且持續 ≥ 3 個月，請至身心科或睡眠中心詢問 CBT-I 療程。'
    }
  },

  // ── B 型肝炎 (Hepatitis B) ──
  'hepb': {
    page_id_or_topic: 'hepb',
    title_zh: 'B 型肝炎、肝硬化阻斷與肝癌三部曲預防',
    topic_badge: '胃腸肝膽科醫學',
    diet: {
      title: '護肝低加工飲食與防範黃麴毒素',
      one_liner: '嚴禁發霉穀物堅果（黃麴毒素與 B 肝具致癌相乘性）；戒酒並避免來路不明草藥偏方。',
      points: [
        '遠離黃麴毒素：花生、玉米、堅果受潮極易孳生黃麴毒素，它與 B 肝病毒有強烈協同致癌性，堅果應冷藏乾燥保存。',
        '零酒精鐵律：B 肝帶原者肝細胞修復力較脆弱，任何酒精都會倍增肝硬化與纖維化速度。',
        '拒絕保肝偏方：市售草藥偏方、成分不明減肥茶往往含有肝毒性成分，常引發猛爆性肝炎。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AASLD Guidelines for Treatment of Chronic Hepatitis B / APASL Guidelines',
      key_metric: { label: '酒精攝取量', target: '0', unit: '克 (絕對禁酒)' },
      action_item: '堅果開封後密封冷藏；生病依專科醫師處方用藥，不吃偏方草藥。'
    },
    exercise: {
      title: '改善脂肪肝、減輕肝發炎之有氧與阻力運動',
      one_liner: '每週 150 分鐘中等強度運動可有效消除 30% 以上肝臟脂肪，降低 B 肝合併脂肪肝的惡化風險。',
      points: [
        '避免肝臟「雙重打擊」：B 肝合併代謝性脂肪性肝病（MASLD）會顯著加速肝硬化發展，運動是逆轉脂肪肝的首要武器。',
        '適度運動增強免疫：快走、游泳等有氧運動能增強免疫細胞對病毒複製的監控力。',
        '疲勞警戒：急性肝炎發作期（GOT/GPT 數百以上）應充分臥床休養，避免高強度劇烈力竭運動。'
      ],
      evidence_grade: 'A',
      evidence_source: 'EASL Clinical Practice Guidelines on MASLD and Hepatitis',
      key_metric: { label: '運動目標', target: '每週 3–5 次，累積 150 分鐘' },
      action_item: '飯後輕快散步，維持正常體重與腰圍，消除脂肪肝負擔。'
    },
    prevention: {
      title: '國健署 45–79 歲公費終身一次篩檢與定期追蹤',
      one_liner: '台灣 45–79 歲民眾享有國健署公費終身一次 B、C 肝篩檢；帶原者每 6 個月腹部超音波追蹤。',
      points: [
        '公費篩檢資格：民國 55 年（含）以後出生者，可至全台健保特約醫療院所免費抽血檢驗 HBsAg 與 Anti-HCV。',
        '定期超音波與 AFP：B 肝帶原者每 6 個月必須固定回診檢查腹部超音波與甲型胎兒蛋白（AFP），早期揪出微小腫瘤。',
        '家庭傳播防範：同住家人若無抗體（Anti-HBs 陰性）應接種 B 肝疫苗；避免共用牙刷、刮鬍刀與指甲剪。'
      ],
      evidence_grade: 'A',
      evidence_source: '衛生福利部國民健康署 B、C 型肝炎篩檢指引 / 台灣肝病防治學術基金會',
      key_metric: { label: '追蹤週期', target: '每 6 個月', unit: '腹部超音波 + 肝功能' },
      action_item: '年滿 45 歲尚未驗過 B、C 肝者，持健保卡至鄰近診所預約公費篩檢。'
    },
    treatment: {
      title: '抗病毒口服藥物與肝癌早期微創根治',
      one_liner: '健保給付抗病毒口服藥（恩替卡韋 Entecavir / 替諾福韋 Tenofovir），病毒量測不到即可阻斷肝硬化。',
      points: [
        '抗病毒藥物（NUCs）：長期口服恩替卡韋或替諾福韋，抗藥性極低，可將 HBV DNA 壓制至測不到，顯著逆轉肝纖維化。',
        '健保給付門檻：ALT 異常升高合併 HBV DNA > 2,000 IU/mL 或肝硬化者享有健保專案全額給付。',
        '早期肝癌介入：透過定期超音波發現小於 2 公分肝腫瘤，可利用電燒（RFA）或微創切除，5 年存活率超過 70%。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AASLD Guidelines for Hepatitis B / 台灣消化系醫學會臨床共識',
      caution: '🚨 出現眼白變黃（黃疸）、茶色深尿、腹水脹大、牙齦出血或意識嗜睡混亂，為急性肝衰竭警訊，需立即送醫！',
      action_item: 'B 肝帶原者務必在胃腸肝膽科專門醫師處固定追蹤，絕不可自行停用抗病毒藥物。'
    }
  },

  // ── 失能照護與長照 (Disability & Long-term Care) ──
  'ltc': {
    page_id_or_topic: 'ltc',
    title_zh: '失能預防、長期照顧與家庭照顧者支持',
    topic_badge: '老年醫學與長期照顧',
    diet: {
      title: '高蛋白、吞嚥安全與防脫水的長者營養',
      one_liner: '長者每公斤體重 1.0–1.2 克蛋白質（衰弱或壓傷時更高），依吞嚥分級調整質地，定時定量補水。',
      points: [
        '蛋白質分散三餐：每餐一個掌心大小的豆魚蛋肉，咀嚼困難改蒸蛋、豆花、魚泥或營養品，配合運動維持肌肉。',
        '吞嚥安全：依 IDDSI 分級調整食物質地與液體稠度，坐直進食、飯後維持坐姿 30 分鐘，降低吸入性肺炎。',
        '防脫水：長者口渴感變鈍，臥床與失智者需定時餵水；觀察尿色與尿量，腎臟或心臟病人依醫囑限水。'
      ],
      evidence_grade: 'B',
      evidence_source: 'ESPEN Guideline on Clinical Nutrition and Hydration in Geriatrics 2022 / IDDSI Framework',
      key_metric: { label: '蛋白質目標', target: '1.0–1.2', unit: 'g/kg/日' },
      action_item: '今天起每餐加一份蛋白質，並請語言治療師或營養師評估吞嚥（長照 CB01／CB02）。'
    },
    exercise: {
      title: '肌力平衡訓練與居家復能',
      one_liner: '每週 ≥ 3 天多元運動（肌力＋平衡），臥床者每日關節活動與定時翻身，以「自己做得到」為復能目標。',
      points: [
        '預防失能：椅子起站、踮腳、彈力帶與太極，LIFE 試驗顯示結構化運動降低重大行動失能約 18%。',
        '居家復能：治療師到府設定 ADL 目標（自己上廁所、自己吃飯），密集 6–12 次訓練並教家屬。',
        '臥床照護：每 2 小時翻身、每日被動關節活動，預防壓傷、攣縮、肺炎與深部靜脈血栓。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Pahor M, et al. JAMA 2014 (LIFE) / WHO 2020 Physical Activity Guidelines / EPUAP 2019',
      key_metric: { label: '運動頻率', target: '每週 ≥ 3 天', unit: '肌力＋平衡' },
      action_item: '和長輩每天做 2 回椅子起站 5 下＋扶椅踮腳 10 下；申請長照居家復能（CA07／CA08）。'
    },
    prevention: {
      title: '長者功能評估、防跌與照顧者支持',
      one_liner: '65 歲以上每年做 ICOPE 長者功能評估；居家防跌改造；照顧者規律喘息，避免高負荷崩潰。',
      points: [
        'ICOPE 六大面向：認知、行動、營養、視力、聽力、憂鬱，任一異常即轉介社區據點或門診。',
        '居家防跌：夜燈、扶手、防滑、移除絆腳物；長照輔具及無障礙每 3 年 4 萬元額度可補助。',
        '照顧者支持：喘息服務每年 32,340–48,510 元，家庭照顧者支持據點與 0800-507272 專線。'
      ],
      evidence_grade: 'B',
      evidence_source: 'WHO ICOPE 2024 / 國健署長者功能評估 / 衛福部長照 2.0–3.0',
      key_metric: { label: '功能評估', target: '每年 1 次', unit: '65 歲以上' },
      action_item: '撥 1966 申請長照評估；照顧者本週排一次喘息。'
    },
    treatment: {
      title: '長照服務組合、外籍看護與機構選擇',
      one_liner: '依失能等級組合居家、社區、外看與機構服務；2026 年住宿機構補助每年最高 18 萬，80 歲以上外看免評估。',
      points: [
        '長照四包錢：照顧及專業服務每月 10,020–36,180 元、交通、輔具、喘息；一般戶自付 16%。',
        '外籍看護：2025-08-01 起 80 歲以上免評估，其他依巴氏量表；重症優先處理。',
        '住宿機構：長照 4 級以上每月補助 1.5 萬（2026），慎選評鑑、人力與約束政策。'
      ],
      evidence_grade: 'B',
      evidence_source: '衛福部長期照顧服務申請及給付辦法 / 勞動部就業服務法第 46 條新制 / 行政院 2026-09-10',
      caution: '🚨 突然單側無力、意識改變、呼吸喘、跌倒撞頭或發燒合併不吃不喝，請立即撥 119；照顧者有傷害自己或他人的念頭請撥 1925。',
      action_item: '用專區的四包錢試算器與照顧安排比較表，召開一次家庭會議。'
    }
  },

  // ── 睡眠與生理時鐘 (Sleep & Circadian Rhythm) ──
  'sleep': {
    page_id_or_topic: 'sleep',
    title_zh: '睡眠架構、生理時鐘與睡眠呼吸中止防護',
    topic_badge: '睡眠醫學與神經修復',
    diet: {
      title: '咖啡因半衰期控管與色胺酸助眠飲食',
      one_liner: '睡前 8–10 小時截止咖啡因，睡前 3 小時禁食並完全避開酒精，攝取富含色胺酸與鎂的原型食材。',
      points: [
        '腺苷酸受體保護：咖啡因半衰期約 5–7 小時，下午 2 點後停止咖啡與濃茶，確保夜間腺苷酸睡眠驅力順暢釋放。',
        '色胺酸與鎂協同：奇異果、酸櫻桃、南瓜籽與深綠色蔬菜提供合成褪黑激素（Melatonin）所需之前驅物與輔酶。',
        '打破睡前小酌迷思：酒精雖縮短入睡潛伏期，但會嚴重摧毀後半夜快速動眼期（REM）與深睡慢波（SWS）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'American Academy of Sleep Medicine (AASM) Clinical Practice Guidelines',
      key_metric: { label: '咖啡因截止線', target: '14:00 前', unit: '睡前 8–10 小時' },
      action_item: '今日下午 2 點後改喝無咖啡因麥茶或溫水，晚餐後不再進食宵夜。'
    },
    exercise: {
      title: '晨光定位運動與核心體溫降溫效應',
      one_liner: '起床後 30 分鐘內戶外接觸自然晨光並快走，睡前 2 小時避免極高強度力竭訓練。',
      points: [
        '視交叉上核（SCN）校準：早晨 10–15 分鐘自然陽光（>10,000 Lux）能精準設定 14–16 小時後的褪黑激素分泌時鐘。',
        '深睡促進效應：日間規律中強度有氧與阻力運動可延長夜間慢波深睡期（N3），啟動腦部膠淋巴系統排毒。',
        '體溫下降入睡窗：睡前 90 分鐘溫水泡澡或溫和伸展，利用沐浴後核心體溫下降 0.5–1°C 的生理機制誘發睡意。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Sleep Medicine Reviews / AASM Circadian Rhythm Guidelines',
      key_metric: { label: '最佳睡眠時數', target: '7–9', unit: '小時/晚' },
      action_item: '明天早上起床後到陽台或戶外散步曬太陽 10 分鐘，校準生理時鐘。'
    },
    prevention: {
      title: 'STOP-Bang 睡眠呼吸中止篩檢與睡眠衛生',
      one_liner: '如雷打鼾合併日間嗜睡或晨起頭痛，應以 STOP-Bang 量表篩檢阻塞型睡眠呼吸中止症（OSA）。',
      points: [
        'STOP-Bang 8 指標：打鼾（Snore）、疲倦（Tired）、觀察到呼吸停止（Observed）、高血壓（Pressure）、BMI>35、年齡>50、頸圍>40cm、男性。',
        '藍光阻斷工程：睡前 60 分鐘關閉頂燈改用暖色低光源，避免視網膜內生感光視神經節細胞（ipRGCs）抑制褪黑激素。',
        '臥室微氣候：維持室溫 18–22°C、完全遮光與安靜，床鋪僅保留給睡眠（刺激控制法）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'STOP-Bang Questionnaire Validation / AASM OSA Screening Guideline',
      key_metric: { label: 'STOP-Bang 警戒分', target: '< 3', unit: '分 (≥3 分高風險)' },
      action_item: '睡前 1 小時將手機放置於臥室外充電，保持臥室涼爽全暗。'
    },
    treatment: {
      title: '失眠認知行為治療（CBT-I）與正壓呼吸器（CPAP）',
      one_liner: '慢性失眠第一線首選 CBT-I 而非長期安眠藥；中重度睡眠呼吸中止症以 CPAP 為黃金標準治療。',
      points: [
        'CBT-I 黃金第一線：透過睡眠限制、刺激控制與認知重塑，長期療效優於鎮靜安眠藥（Z-drugs / BZD）且無依賴性。',
        '正壓呼吸器（CPAP）：針對 AHI ≥ 15 次/小時的中重度 OSA 患者，配戴 CPAP 可消除夜間缺氧並顯著降低中風與心房顫動風險。',
        '多導睡眠檢查（PSG）：至醫院睡眠中心住一晚檢測腦波、血氧與呼吸氣流，精準鑑別失眠、猝睡症或週期性肢體抽動。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ACP Clinical Practice Guideline on Chronic Insomnia / AASM OSA Treatment Guideline',
      caution: '🚨 若伴侶發現你打呼突然中斷超過 10 秒後猛然喘氣，或開車等紅燈時不自覺打瞌睡，務必立即至睡眠醫學門診檢查！',
      action_item: '失眠超過 3 個月每週大於 3 晚者，尋求睡眠專科醫師或臨床心理師進行 CBT-I 療程。'
    }
  },

  // ── 心理與抗壓 (Mental Health & Autonomic Nervous System) ──
  'mental': {
    page_id_or_topic: 'mental',
    title_zh: '自律神經調節、壓力韌性與腸腦軸心理健康',
    topic_badge: '身心醫學與神經科學',
    diet: {
      title: 'SMILES 抗憂鬱地中海飲食與腸腦軸微生態',
      one_liner: '人體 90% 血清素產自腸道；高膳食纖維、發酵食物與高 EPA 魚油可降低神經發炎、改善焦慮憂鬱。',
      points: [
        '腸腦軸益生菌元：優格、克菲爾、味噌與全穀蔬菜可滋養腸道菌相，透過迷走神經向大腦傳遞安定訊號。',
        'Omega-3 高 EPA 配方：臨床實證純度 EPA > 60%、每日 1–2g 具有顯著抗神經發炎與輔助改善憂鬱症狀之效益。',
        '戒除血糖雲霄飛車：精製糖與手搖飲引發劇烈胰島素波動與反應性低血糖，會直接誘發心悸、焦躁與恐慌感。'
      ],
      evidence_grade: 'A',
      evidence_source: 'SMILES Trial (BMC Medicine) / ISNPR Practice Guidelines for Omega-3 in Depression',
      key_metric: { label: '抗憂鬱 EPA 劑量', target: '1,000–2,000', unit: 'mg/日 (EPA 為主)' },
      action_item: '情緒緊繃時以無糖堅果優格與黑巧克力（>85%）取代含糖甜點與手搖飲。'
    },
    exercise: {
      title: 'BDNF 腦源性神經滋養因子運動與生理嘆息呼吸',
      one_liner: '每週 3 次 30 分鐘有氧運動促進海馬迴分泌 BDNF；急性焦慮時做 2 次吸氣加 1 次長吐氣立即降心率。',
      points: [
        '運動如天然抗憂鬱劑：中強度慢跑、單車或瑜珈能顯著提升大腦 BDNF（腦源性神經滋養因子），修復受壓力皮質醇損傷的海馬迴。',
        '生理嘆息法（Physiological Sigh）：鼻子深吸一口氣、再補吸一小口氣讓肺泡完全擴張，接著嘴巴緩慢長吐氣，3 個循環即可啟動副交感迷走神經。',
        '森林浴與綠色處方：每週累積 120 分鐘於自然綠地活動，能顯著降低唾液皮質醇與杏仁核過度活化。'
      ],
      evidence_grade: 'A',
      evidence_source: 'BMJ 2024 Meta-analysis on Exercise for Depression / Stanford Huberman Lab Breathwork RCT',
      key_metric: { label: '急性減壓呼吸', target: '雙吸氣 + 長吐氣', unit: '連續 3–5 次' },
      action_item: '開會或焦慮心悸時，立刻練習 1 分鐘「生理嘆息呼吸法」啟動迷走神經煞車。'
    },
    prevention: {
      title: 'PHQ-9 / GAD-7 情緒自評與心率變異度（HRV）監測',
      one_liner: '定期以國際標準量表檢視情緒水位，透過清晨安靜 HRV 掌握交感與副交感神經平衡。',
      points: [
        '量表自我覺察：使用 PHQ-9（憂鬱量表）與 GAD-7（焦慮量表）量化近兩週睡眠、食慾、專注力與興趣變化。',
        'HRV 自律神經溫度計：若連續數日夜間或晨起 HRV 顯著低於個人基線且安靜心率升高，代表身體處於過度壓力或潛伏發炎。',
        '數位排毒界線：建立下班後訊息靜音時段，阻斷社群媒體多巴胺成癮迴路對前額葉專注力的侵蝕。'
      ],
      evidence_grade: 'A',
      evidence_source: 'USPSTF Depression and Anxiety Screening Guidelines / Task Force of ESC on HRV',
      key_metric: { label: 'PHQ-9 / GAD-7 正常值', target: '< 5', unit: '分 (≥10 分建議就診)' },
      action_item: '每月進行一次心情溫度計（BSRS-5）或 PHQ-9 自我檢測，傾聽身心訊號。'
    },
    treatment: {
      title: '心理治療（CBT/ACT）與血清素藥物整合醫療',
      one_liner: '中重度憂鬱與恐慌症為大腦神經傳導物質失衡之生理疾病，結合心理治療與 SSRI 藥物治癒率極高。',
      points: [
        '認知行為與接納承諾治療（CBT / ACT）：協助識別災難化思考偏誤，建立心理彈性，台灣衛福部提供青壯世代心理支持補助。',
        '第一線神經傳導調節藥物（SSRI / SNRI）：通常需規律服用 2–4 週方能完整發揮突觸受體調節效果，切勿自行突然停藥以免引發戒斷不適。',
        'rTMS 重複經顱磁刺激：針對藥物反應不佳之難治型憂鬱症，以非侵入性磁脈衝精準活化左側背外側前額葉（DLPFC）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'APA Practice Guideline for Treatment of Major Depressive Disorder / NICE Guidelines',
      caution: '🚨 若出現持續絕望感、自傷或輕生念頭，請立即撥打衛福部 24 小時免費安心專線「1925（依舊愛我）」或生命線「1995」！',
      action_item: '善用衛福部 15–45 歲每人 3 次免費心理諮商方案，及早尋求身心科醫師與心理師支持。'
    }
  },

  // ── 運動醫學 (Exercise Medicine) ──
  'exercise': {
    page_id_or_topic: 'exercise',
    title_zh: '運動生理學、VO2max 最大攝氧量與肌力處方',
    topic_badge: '運動醫學與體能科學',
    diet: {
      title: '運動前後肝醣補充與亮胺酸（Leucine）肌力合成窗',
      one_liner: '訓練前補充好消化碳水提升輸出功率；訓練後攝取含 2.5–3g 亮胺酸之 25–40g 優質蛋白質啟動 mTOR。',
      points: [
        '運動前燃料充填：高強度訓練前 1–2 小時攝取每公斤 1–1.5g 低脂碳水（如香蕉、御飯糰、燕麥），避免低血糖力竭。',
        '蛋白質分配效應：將每日 1.6–2.0 g/kg 蛋白質平均分配於三至四餐（每餐 25–40g），比單餐暴食更能最大化 24 小時肌肉合成。',
        '一水肌酸（Creatine Monohydrate）：每日 3–5g 為國際運動營養學會（ISSN）最高等級 A 級實證補充品，增強磷酸肌酸系統與腦力。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ISSN Position Stand on Nutrient Timing & Creatine / ACSM Nutrition and Athletic Performance',
      key_metric: { label: '單餐亮胺酸門檻', target: '2.5–3.0', unit: 'g (約 30g 蛋白質)' },
      action_item: '運動後 1 小時內補充一杯無糖高蛋白豆漿（400mL）加兩顆水煮蛋與一根香蕉。'
    },
    exercise: {
      title: '80/20 極化訓練：Zone 2 有氧底座與 VO2max 衝刺加上全身重訓',
      one_liner: '80% 時間進行輕鬆可交談的 Zone 2 有氧，20% 進行 4x4 間歇衝刺推升 VO2max，每週搭配 2–3 次阻力訓練。',
      points: [
        'VO2max 長壽最強指標：最大攝氧量每提升 1 MET（3.5 mL/kg/min），全因死亡率下降 11–15%，將體能推升至同齡前 25% 獲益最大。',
        '挪威 4x4 間歇法：4 分鐘高強度（最大心率 85–95%）穿插 3 分鐘輕鬆恢復，重複 4 趟，強力擴張心臟每跳輸出量（Stroke Volume）。',
        '六大基礎動作模式：深蹲（Squat）、髖鉸鏈硬舉（Hinge）、水平推拉、垂直推拉與負重行走（Farmer’s Walk）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Mandsager et al., JAMA Network Open (VO2max & Mortality) / WHO 2020 Physical Activity Guidelines',
      key_metric: { label: '有氧 + 重訓黃金配比', target: '150分有氧 + 2次重訓', unit: '/週' },
      action_item: '本週安排 3 次 40 分鐘鼻呼吸快走/慢跑（Zone 2），外加 2 次 30 分鐘深蹲與伏地挺身訓練。'
    },
    prevention: {
      title: 'PAR-Q+ 運動前風險篩檢、動態暖身與過度訓練預防',
      one_liner: '遵循「每週訓練量增幅不超過 10%」鐵律，運動前以動態伸展活化關節，運動後再做靜態拉筋。',
      points: [
        '10% 漸進原則：跑量或總負重每週增加不超過 10%，給予肌腱、韌帶與骨骼足夠的膠原蛋白重塑時間，預防疲勞性骨折與肌腱炎。',
        '動態暖身取代靜態拉筋：開練前進行開合跳、高抬腿、貓牛式與空手深蹲 5–10 分鐘，提高肌肉溫度與神經徵召速度。',
        '握力與單腳站立篩檢：雙手握力（男 <28kg、女 <18kg 為亞洲肌少症警訊）與閉眼單腳站立秒數是全身退化的早期哨兵。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AWGS 2019 Sarcopenia Consensus / ACSM Preparticipation Health Screening',
      key_metric: { label: '亞洲肌少症握力門檻', target: '男 ≥28 / 女 ≥18', unit: 'kg' },
      action_item: '每次重訓或跑步前必做 8 分鐘關節動態熱身，摒棄冷身直接拉筋的舊習慣。'
    },
    treatment: {
      title: '運動傷害 PEACE & LOVE 現代處置與橫紋肌溶解急症',
      one_liner: '扭傷拉傷已淘汰長期冰敷與完全臥床；急性期保護抬高後，應儘早啟動無痛漸進負荷促進組織修復。',
      points: [
        'PEACE & LOVE 準則：前 1–3 天保護（Protection）、抬高（Elevation）、避免過度消炎藥與長期冰敷（Avoid anti-inflammatories/ice）以免阻礙巨噬細胞修復；接續無痛負荷（Load）與有氧循環（Vascularisation）。',
        '肌腱病變離心訓練：阿基里斯腱炎或網球肘，物理治療黃金標準為漸進式離心收縮與重慢阻力訓練（Heavy Slow Resistance）。',
        '橫紋肌溶解症警戒：新手突然過度高強度運動（如百下深蹲、飛輪）後若出現肌肉劇痛腫脹與醬油色深尿，必須立即急診輸液保腎。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Dubois & Esculier, British Journal of Sports Medicine (BJSM PEACE & LOVE Protocol)',
      caution: '🚨 運動中若出現胸悶胸痛、莫名頭暈眼前發黑、呼吸困難，或運動後排尿呈深茶醬油色，立即停止運動並送醫！',
      action_item: '關節或肌腱疼痛超過 2 週未改善，請至運動醫學科或物理治療所進行動作分析與超音波檢查。'
    }
  },

  // ── 健康長壽與抗老 (Longevity & Healthy Aging) ──
  'longevity': {
    page_id_or_topic: 'longevity',
    title_zh: '健康餘命（Healthspan）、細胞自噬與抗衰老醫學',
    topic_badge: '長壽醫學與預防老年學',
    diet: {
      title: '多酚抗發炎飲食、熱量適度節制與年齡分階段蛋白質策略',
      one_liner: '65 歲前維持溫和熱量控制避免內臟脂肪；65 歲後提高蛋白質至 1.2–1.5 g/kg 克服合成代謝阻抗。',
      points: [
        '合成代謝阻抗（Anabolic Resistance）：高齡長者肌肉對蛋白質敏感度下降，每餐需確保攝取 30g 優質蛋白質（豆魚蛋肉）才能有效防範肌少症。',
        '植物多酚與 Sirtuins 活化：特級初榨橄欖油多酚、綠茶兒茶素（EGCG）、藍莓花青素與十字花科蘿蔔硫素，啟動 NRF2 抗氧化基因。',
        '規律進食窗口（TRE）：配合生理時鐘採 10–12 小時日間進食窗口（如早 8 至晚 7），不吃宵夜，給予粒線體夜間修復時間。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ESPEN Guideline on Clinical Nutrition and Hydration in Geriatrics / Cell Metabolism Longevity Review',
      key_metric: { label: '長者每日蛋白質', target: '1.2–1.5', unit: 'g/kg 體重' },
      action_item: '家中長輩早餐不能只吃稀飯配醬菜，務必加上一顆蛋與一杯濃豆漿或牛奶。'
    },
    exercise: {
      title: '四大長壽體能支柱：平衡、肌力、爆發力與心肺耐力',
      one_liner: '跌倒是長者失能頭號殺手；除有氧與肌力外，必須加入單腳平衡與快縮肌爆發力訓練。',
      points: [
        'Type II 快縮肌保衛戰：老化最先流失負責快速反應防跌的快縮肌纖維，安全指導下的輕重量快速站起（椅子坐站）能挽救神經肌肉反應。',
        '防跌平衡訓練：每日練習單腳站立（扶牆安全保護下）、太極拳或前後腳直線行走，強化本體感覺。',
        '坐站測試（Sit-to-Stand）：雙手抱胸從椅子連續起立坐下 5 次，若超過 12 秒代表下肢肌力不足，需立即介入阻力訓練。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Lancet Healthy Longevity / Sherrington et al., Cochrane Review on Exercise for Preventing Falls',
      key_metric: { label: '5次坐站測試目標', target: '< 12', unit: '秒' },
      action_item: '刷牙時練習單腳站立各 30 秒，每日利用穩固餐椅練習坐站 10 下 × 3 組。'
    },
    prevention: {
      title: 'ICOPE 長者六大功能評估、疫苗防護網與癌症早篩',
      one_liner: '全面追蹤認知、行動、營養、視力、聽力與憂鬱六大指標；重度聽力損失是失智症第一大可逆風險因子！',
      points: [
        '2024 Lancet 失智症預防 14 大可逆因子：矯正中年聽力損失（配戴助聽器）、控制 LDL 膽固醇、治療高血壓與糖尿病、戒菸酒、維持社交與腦力活動可預防高達 45% 失智症。',
        '成人長壽疫苗護盾：按時接種流感疫苗、肺炎鏈球菌疫苗（PCV13/PPV23）與帶狀皰疹疫苗（Shingrix），大幅降低感染引發之心血管事件與失智風險。',
        'DXA 骨密與肌少雙重篩檢：女性停經後、男性 65 歲後檢測腰椎與髖部骨密度（T-score），防範髖部骨折。'
      ],
      evidence_grade: 'A',
      evidence_source: '2024 Lancet Commission on Dementia Prevention / WHO ICOPE Guidelines',
      key_metric: { label: '可預防失智症比例', target: '45%', unit: '控制 14 項風險因子' },
      action_item: '帶父母完成國健署長者功能自評（ICOPE）及聽力與骨質密度檢查。'
    },
    treatment: {
      title: '多重用藥整合（Deprescribing）與高齡整合醫學門診',
      one_liner: '同時服用超過 5 種慢性病藥物易產生交互作用與跌倒風險；由高齡醫學專科定期執行藥物精簡整合。',
      points: [
        'Beers Criteria 潛在不適當用藥檢視：長者應極力避免長效型安眠藥、第一代抗組織胺與強效抗膽鹼藥物，以免誘發譫妄、跌倒與認知退化。',
        '骨質疏鬆階梯藥物：T-score ≤ -2.5 或曾發生脆弱性骨折者，依醫囑使用雙磷酸鹽、Denosumab（保骼麗）或促骨生成藥物，並必備足量鈣與 D3。',
        '早期失智醫療介入：出現近期記憶明顯減退時，儘早至神經內科鑑別可逆病因（如 B12 缺乏、甲狀腺低下、常壓性水腦症）並啟動延緩病程治療。'
      ],
      evidence_grade: 'A',
      evidence_source: 'American Geriatrics Society (AGS) Beers Criteria / 台灣老年學暨老年醫學會指引',
      caution: '🚨 長輩若在數小時至數天內突然出現意識混亂、日夜顛倒或胡言亂語，常為「急性譫妄」（多由泌尿道感染、肺炎、電解質失衡或藥物引起），須立即就醫！',
      action_item: '將長輩所有科別的藥袋集中，掛號高齡醫學整合門診請醫師協助評估精簡用藥。'
    }
  },

  // ── 實證營養與補充品 (Supplements & Micronutrients) ──
  'supplements': {
    page_id_or_topic: 'supplements',
    title_zh: '實證營養補充品、微量元素與抽血精準補給',
    topic_badge: '臨床營養學與毒理安全',
    diet: {
      title: '原型食物優先（Food First）與脂溶/水溶吸收協同',
      one_liner: '保健品永遠無法取代原型食物的植化素基質；維生素 D3、K2、魚油與葉黃素必須隨含油脂正餐服用。',
      points: [
        '生物利用度關鍵：脂溶性營養素（A、D、E、K、魚油、Q10、葉黃素）空腹吃吸收率極差，務必於午餐或晚餐後立即服用。',
        '礦物質競爭避開：高劑量鈣與鐵會在腸道共用轉運通道而互相抵銷，應分開於不同餐次補充；鐵劑搭配維生素 C 可提升吸收率 3 倍。',
        '天然食物矩陣：每天一碗深綠色蔬菜、一把無調味堅果與兩份深海魚，能提供最安全無過量風險的協同微量營養。'
      ],
      evidence_grade: 'A',
      evidence_source: 'NIH Office of Dietary Supplements (ODS) Fact Sheets / Academy of Nutrition and Dietetics',
      key_metric: { label: '飲食 vs 補充品原則', target: '90% 原型食物', unit: '+ 10% 精準補充' },
      action_item: '將家中的維生素 D3 與魚油移到餐桌旁，養成隨正餐油脂一起吃的習慣。'
    },
    exercise: {
      title: '運動員四大 A 級實證補充品：肌酸、咖啡因、乳清、電解質',
      one_liner: '避開誇大不實的燃脂神藥；僅一水肌酸、乳清蛋白、咖啡因、β-丙胺酸與硝酸鹽具國際 IOC 強實證。',
      points: [
        '一水肌酸（Creatine）：每日 3–5g 持續補充（無需衝擊期），提升高強度反覆爆發力、加速肝醣回補並保護高齡肌肉與認知。',
        '甜菜根汁（天然硝酸鹽）：耐力賽前 2–3 小時補充，經口腔菌轉化為一氧化氮（NO），可降低次最大運動耗氧量並提升耐力。',
        '禁藥與重金屬防線：競技選手與一般民眾選購運動補充品，應認明第三方獨立檢驗標章（如 Informed-Sport、NSF Certified 或 USP）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'IOC Consensus Statement: Dietary Supplements and the High-Performance Athlete (BJSM)',
      key_metric: { label: '一水肌酸維持量', target: '3–5', unit: 'g/日 (充足飲水)' },
      action_item: '檢視手邊運動補劑成分表，淘汰含有過量人工甜味劑與不明興奮劑的預鍛鍊粉（Pre-workout）。'
    },
    prevention: {
      title: '先驗血再補充：25(OH)D、鐵蛋白與 B12 精準檢測',
      one_liner: '拒絕盲目跟風吞瓶罐；透過抽血檢驗血清 25(OH)D、Ferritin 鐵蛋白與 B12，缺什麼補什麼。',
      points: [
        '維生素 D 台灣普遍缺乏：台灣逾 6 成民眾血清 25(OH)D 低於 30 ng/mL，理想骨骼與免疫濃度為 30–50 ng/mL，切勿盲目超量至 >100 ng/mL 引發高血鈣。',
        'B12 缺乏高危族群：全素食者、長期服用胃藥（PPI 氫離子幫浦抑制劑）或糖尿病一線藥 Metformin 者，應定期抽血追蹤 B12。',
        '抗氧化劑過量反傷身：大型臨床試驗證實，吸菸者補充高劑量 β-胡蘿蔔素反而增加肺癌風險，超高劑量維生素 E 亦增加出血性中風風險。'
      ],
      evidence_grade: 'A',
      evidence_source: 'USPSTF Vitamin & Mineral Supplementation Statement / Endocrine Society Vitamin D Guideline',
      key_metric: { label: '血清 25(OH)D 理想值', target: '30–50', unit: 'ng/mL' },
      action_item: '下次健康檢查加驗血清 25(OH)D 與鐵蛋白（Ferritin），依檢驗數值決定補充劑量。'
    },
    treatment: {
      title: '藥物與保健品交互作用防範及臨床缺乏症治療',
      one_liner: '手術前兩週必須停用高劑量魚油、銀杏、人參與當歸；正在服用抗凝血劑者嚴禁自行混用活血保健品。',
      points: [
        '出血與凝血交互作用：服用 Warfarin 或新型抗凝血劑（NOAC）及阿斯匹靈者，混用高劑量魚油、銀杏、納豆激酶或紅麴可能引發嚴重出血或橫紋肌溶解（紅麴+Statin）。',
        '缺鐵性貧血標準治療：確診缺鐵性貧血不僅要補鐵劑（隔日補充法吸收更佳且腸胃副作用少），更必須由醫師找出潛在出血源（如大腸鏡檢查或婦科肌瘤）。',
        '肝腎毒性警戒：不明來源之高濃度萃取膠囊、綠茶萃取物超高劑量或何首烏，可能引起藥物性肝損傷（DILI）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'FDA Dietary Supplement-Drug Interaction Advisory / NIH NCCIH Clinical Digest',
      caution: '🚨 正在服用降血脂藥 Statin 者「絕對不可」同時吃紅麴保健品（成分同為 Lovastatin），否則極易導致藥物過量引發肝損傷與橫紋肌溶解症！',
      action_item: '看診或手術前，主動將正在吃的所有保健品拍照或帶給醫師與藥師核對交互作用。'
    }
  },

  // ── 極致健康與生物標記 (Ultra-Health & Biomarkers) ──
  'ultrahealth': {
    page_id_or_topic: 'ultrahealth',
    title_zh: '極致生理表現、進階生物標記與代謝靈活性',
    topic_badge: '精準預防醫學',
    diet: {
      title: '代謝靈活性（Metabolic Flexibility）與連續血糖平穩化',
      one_liner: '訓練粒線體在燃燒碳水與燃燒脂肪間自由切換，將餐後血糖峰值控制在 < 140 mg/dL、波動幅度 < 30 mg/dL。',
      points: [
        '進食順序降糖峰值：先吃富含水溶性纖維的蔬菜與菇藻類，再吃蛋白質與好油，最後吃全穀碳水，可削平餐後血糖峰值達 40%。',
        '抗性澱粉運用：冷卻後的壽司飯、烤地瓜或隔夜燕麥富含抗性澱粉，能成為腸道酪酸菌（Butyrate）的優質燃料。',
        '超加工食品（NOVA 第 4 級）歸零：避開含有乳化劑、人工色素、高果糖糖漿之超加工食品，保護腸道黏膜屏障完整性。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Shukla et al., Diabetes Care (Food Order & Glucose) / Monteiro NOVA Classification',
      key_metric: { label: '理想餐後血糖峰值', target: '< 140', unit: 'mg/dL' },
      action_item: '連續一週實踐「菜→肉→飯」進食順序，觀察餐後 2 小時是否不再昏昏欲睡。'
    },
    exercise: {
      title: '粒線體生物合成（PGC-1α）與心肺代謝極限開發',
      one_liner: '結合長時 Zone 2 提升乳酸清除率，搭配高強度間歇與大重量複合動作最大化全身代謝容量。',
      points: [
        '乳酸穿梭機制（Lactate Shuttle）：Zone 2 訓練增加慢縮肌 MCT1 轉運蛋白，讓肌肉能高效回收乳酸作為心臟與大腦的潔淨燃料。',
        '餐後微運動（Exercise Snacks）：每餐飯後快走 10 分鐘或做 30 下深蹲，透過骨骼肌 GLUT4 非胰島素依賴型通道直接吸納血中葡萄糖。',
        '安靜心率與心率恢復率（HRR）：運動停止後 1 分鐘內心率下降超過 20–30 bpm，反映迷走神經張力與心肺健康極佳。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Cell Metabolism Exercise Physiology / NEJM Heart Rate Recovery Study',
      key_metric: { label: '運動後1分鐘心率下降', target: '> 20', unit: 'bpm' },
      action_item: '午晚餐後立刻起身步行 10 分鐘，取代飯後滑手機久坐。'
    },
    prevention: {
      title: '進階預防醫學指標：ApoB、Lp(a)、HOMA-IR、hs-CRP 與全基因風險',
      one_liner: '一般健檢紅字往往已是疾病中後期；追蹤胰島素阻抗（HOMA-IR）與發炎指標（hs-CRP）才能提早 10 年攔截慢病。',
      points: [
        'HOMA-IR 早期胰島素阻抗：在空腹血糖與 HbA1c 看似正常前 5–10 年，空腹胰島素升高（HOMA-IR > 1.5–2.0）即已發出代謝預警。',
        '脂蛋白(a) [Lp(a)] 終身一次篩檢：由基因決定的獨立高致動脈硬化因子，歐洲與美國心臟學會建議成人一生至少抽血檢驗一次。',
        '高敏感度 C 反應蛋白（hs-CRP）：< 1.0 mg/L 代表低全身血管發炎狀態，排除急性感冒後若持續偏高需尋找牙周病、內臟脂肪或睡眠不足等根源。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ESC Guidelines on Cardiovascular Disease Prevention / ADA Standards of Care',
      key_metric: { label: 'HOMA-IR 理想目標', target: '< 1.5' },
      action_item: '年度健檢加選「空腹胰島素（計算 HOMA-IR）」、「ApoB」與一生一次的「Lp(a)」。'
    },
    treatment: {
      title: '亞臨床指標異常之生活型態逆轉與專科早期介入',
      one_liner: '發現糖尿病前期（HbA1c 5.7–6.4%）或輕度脂肪肝時，是 100% 可逆轉的黃金窗口，立即啟動減重 7% 計畫。',
      points: [
        'DPP 糖尿病預防計畫實證：糖尿病前期患者透過飲食與每週 150 分鐘運動減輕體重 7%，可降低演化為糖尿病風險達 58%（效果優於單吃藥）。',
        '高 Lp(a) 風險管理：若基因檢測 Lp(a) > 50 mg/dL，應與心臟科醫師合作將 ApoB 與 LDL-C 控制至更嚴格的目標值，並嚴格控管血壓。',
        '避免過度醫療（Overdiagnosis）：不建議無症狀健康人常規進行全身正子攝影（PET）或缺乏實證之昂貴滴血驗癌，以免偽陽性帶來無謂穿刺傷害。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Diabetes Prevention Program (DPP NEJM) / Choosing Wisely Campaign',
      caution: '🚨 切勿迷信坊間未經衛福部核准之「血液淨化/洗血排毒」或「幹細胞抗老回春針」，曾有多起嚴重敗血症與肺栓塞案例！',
      action_item: '攜帶歷年健檢報告至家庭醫學科建立個人化長期健康風險管理檔案。'
    }
  },

  // ── 十二大身體系統整合 (Body Systems) ──
  'systems': {
    page_id_or_topic: 'systems',
    title_zh: '十二大生理系統跨器官協同與全人健康',
    topic_badge: '系統生理學與解剖醫學',
    diet: {
      title: '跨系統器官滋養：護心、保肝、顧腎、養腸全食物光譜',
      one_liner: '人體器官環環相扣（心腎軸、腸腦軸、肝腸循環）；彩虹蔬果、充足水分與低鈉高纖是全系統共同基石。',
      points: [
        '腸道黏膜與免疫系統（70% 免疫細胞駐紮於腸道）：每日攝取 25–35g 膳食纖維，產生短鏈脂肪酸（SCFA）滋養大腸上皮並調節全身免疫不過度發炎。',
        '心腎血管內皮保護：充足水分與低鈉高鉀飲食維持腎絲球過濾壓穩定，甜菜根、深綠葉菜提供一氧化氮前驅物舒張全身微血管。',
        '神經與內分泌穩態：攝取優質碘（海藻）、硒（巴西堅果）、鋅（牡蠣南瓜籽）與酪胺酸，支援甲狀腺與腎上腺荷爾蒙正常合成。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Guyton and Hall Textbook of Medical Physiology / WHO Healthy Diet Guideline',
      key_metric: { label: '每日膳食纖維目標', target: '25–35', unit: 'g/日 (每餐多色蔬果)' },
      action_item: '每餐餐盤湊齊「紅、綠、黃、白、黑」至少三種顏色的天然植物食材。'
    },
    exercise: {
      title: '骨骼肌作為最大內分泌器官：肌動蛋白（Myokines）全身護航',
      one_liner: '收縮的骨骼肌會分泌數百種肌動蛋白（如 IL-6、Irisin），跨器官保護大腦、肝臟、骨骼與心血管。',
      points: [
        '肌肉-大腦軸：運動分泌之鳶尾素（Irisin）可穿透血腦障壁，誘導海馬迴神經新生並抑制阿茲海默症類澱粉蛋白沉積。',
        '肌肉-骨骼軸（沃夫定律 Wolff’s Law）：重力負荷與肌肉牽拉產生的機械應力，會刺激造骨細胞（Osteoblast）礦化，強化全身骨密。',
        '呼吸與淋巴循環幫浦：橫膈膜深呼吸與小腿肌肉收縮（第二心臟）是推動靜脈血液回流與全身淋巴液排毒的核心動力。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Pedersen & Febbraio, Nature Reviews Endocrinology (Muscle as an Endocrine Organ)',
      key_metric: { label: '久坐中斷頻率', target: '每 30–45 分鐘', unit: '起身活動 2 分鐘' },
      action_item: '設定番茄鐘，每工作 45 分鐘起身做 15 下踮腳尖（活化小腿幫浦）與擴胸深呼吸。'
    },
    prevention: {
      title: '系統性紅旗警訊識別與全齡段四癌/慢病公費篩檢',
      one_liner: '讀懂身體發出的跨系統求救訊號，善用國民健康署成人預防保健與癌症篩檢。',
      points: [
        '全身十大不可忽視警訊：不明原因體重減輕（6 個月 >5%）、持續發燒或夜間盜汗、排便習慣改變帶血、無痛性腫塊、傷口久不癒合、吞嚥困難、異常喘促。',
        '台灣公費癌症篩檢：大腸癌（定量免疫糞便潛血）、口腔癌（黏膜檢查）、子宮頸癌（抹片）、乳癌（乳房 X 光攝影）與肺癌（高風險群 LDCT 低劑量電腦斷層）。',
        '腎功能雙指標必查：單看肌酸酐（Creatinine）不夠，必須結合 eGFR（腎絲球過濾率）與尿液白蛋白/肌酸酐比值（UACR）早期揪出微蛋白尿。'
      ],
      evidence_grade: 'A',
      evidence_source: '衛生福利部國民健康署癌症篩檢指引 / KDIGO CKD Evaluation Guideline',
      key_metric: { label: 'eGFR 正常基準', target: '> 90', unit: 'mL/min/1.73m² 且無蛋白尿' },
      action_item: '核對健保快易通 App「健康存摺」，確認自己與家人是否已完成符合年齡之公費篩檢。'
    },
    treatment: {
      title: '分級醫療（家醫科守門員）與多專科跨領域整合照護',
      one_liner: '出現未明原因症狀先由家庭醫學科或一般內科全人評估，避免頭痛醫頭、多科重複開藥。',
      points: [
        '家庭醫師制度：建立熟悉自己家族史與完整病歷的家庭醫師，能精準鑑別跨系統症狀（例如胸悶可能是心絞痛、胃食道逆流、氣喘或恐慌症）。',
        '心腎代謝症候群（CKM Syndrome）共照：美國心臟學會最新定義心臟、腎臟與代謝高度連動，使用 SGLT2i 或 GLP-1 RA 可同時保護多器官。',
        '醫病共享決策（SDM）：面對重大醫療選擇（如手術 vs 保守治療），向醫師詢問「好處、風險、替代方案與不做會怎樣（BRAN 原則）」。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AHA Presidential Advisory on Cardiovascular-Kidney-Metabolic (CKM) Health',
      caution: '🚨 若同時出現發燒、心跳極快（>100）、呼吸急促（>22）、血壓下降或意識改變，可能為致命性「敗血症（Sepsis）」，須立即急診搶救！',
      action_item: '就醫前寫下「症狀開始時間、誘發加重因素、伴隨症狀與目前用藥清單」4 重點，提升看診精準度。'
    }
  },

  // ── 肝膽腸胃科臨床整合專區 (Gastroenterology & Hepatology) ──
  'gastro': {
    page_id_or_topic: 'gastro',
    title_zh: '肝膽腸胃科：消化道黏膜、微生態與肝膽胰全週期防治',
    topic_badge: '消化系內科與肝膽科學',
    diet: {
      title: '護胃養腸與保肝飲食：低 FODMAP 分階、地中海減脂與戒除果糖酒精',
      one_liner: '胃食道逆流睡前 3 小時禁食；腸躁症執行 2–6 週低 FODMAP 排除與重引入；脂肪肝嚴格戒斷含糖手搖飲與酒精。',
      points: [
        '抗逆流與護胃：減少高油脂、薄荷、巧克力、咖啡與濃茶，避免餐後立刻平躺，夜間逆流者將床頭墊高 15–20 公分。',
        '腸躁症（IBS）與發炎性腸道疾病（IBD）：IBS 發作期暫避洋蔥、大蒜、小麥、蘋果與牛奶等高 FODMAP 食材；IBD 緩解期採天然地中海飲食，嚴避人工乳化劑與超加工食品。',
        '代謝性脂肪肝（MASLD）逆轉：游離果糖在肝臟直接啟動新生脂肪合成（DNL），戒除含糖飲料並以初榨橄欖油、深海魚及黑咖啡（每日 2 杯無糖黑咖啡具保肝抗纖維化實證）護肝。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ACG GERD & IBS Guidelines / EASL-EASD-EASO 2024 MASLD Guideline',
      key_metric: { label: '逆轉脂肪肝減重門檻', target: '≥ 7–10%', unit: '體重減輕' },
      action_item: '晚餐於睡前 3 小時完成；今日起將含糖手搖飲全面換為無糖茶或黑咖啡。'
    },
    exercise: {
      title: '餐後步行促進胃腸蠕動與有氧加肌力清除肝臟異位脂肪',
      one_liner: '每週 150 分鐘中高強度有氧結合 2 次阻力訓練，即使體重未大幅下降也能減少 20–30% 肝內脂肪。',
      points: [
        '促進腸道推進與排氣：每日餐後散步 15 分鐘與溫和核心活動，能活化副交感迷走神經，改善功能性腹脹與慢性便秘。',
        '骨骼肌分流肝臟負擔：阻力訓練擴增骨骼肌 GLUT4 葡萄糖吸收，大幅降低高胰島素血症對肝臟堆積脂肪的驅動。',
        '肝硬化肌少症防治：肝硬化患者極易發生高氨血症與肌少症，應在穩定控制下進行中低強度阻力運動，並補充睡前點心防止夜間肌肉分解。'
      ],
      evidence_grade: 'A',
      evidence_source: 'AASLD MASLD Practice Guidance 2023 / AGA Clinical Practice Update',
      key_metric: { label: '保肝消脂運動目標', target: '150–200', unit: '分鐘/週 中強度有氧 + 2次重訓' },
      action_item: '午餐與晚餐後切勿立刻坐下，起身散步 10–15 分鐘幫助胃排空與平滑血糖。'
    },
    prevention: {
      title: '幽門螺旋桿菌除菌防胃癌、FIB-4 肝纖維化計算與大腸鏡息肉切除',
      one_liner: '善用碳 13 吹氣檢測根除幽門桿菌（阻斷 Correa 胃癌瀑布）、計算 FIB-4 篩檢肝硬化，並按時做糞便潛血與大腸鏡。',
      points: [
        '根除幽門桿菌（H. pylori）：吹氣或糞便抗原陽性者接受 14 天四合一或高劑量雙重除菌治療，完成停藥滿 4 週後務必複驗確認根除，可降低胃癌風險逾 50%。',
        'B、C 肝公費篩檢與 FIB-4 評估：45–79 歲（原住民 40–79 歲）終身一次免費 B/C 肝篩檢；利用年齡、AST、ALT 與血小板計算 FIB-4（<1.3 為低風險，>2.67 需轉介肝膽科彈性超音波）。',
        '大腸癌阻斷黃金標準：45–74 歲每 2 年公費定量免疫糞便潛血檢查（FIT）；一旦陽性必須於 3 個月內完成大腸鏡（切勿重驗大便），切除腺瘤性息肉即直接阻斷癌變。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Maastricht VI/Florence Consensus / 衛福部國健署癌症篩檢指引',
      key_metric: { label: '大腸鏡清腸品質目標', target: 'BBPS ≥ 6', unit: '分 (清澈黃水便)' },
      action_item: '打開健檢報告輸入 AST、ALT 與血小板計算 FIB-4，並確認是否已做過公費 B/C 肝與糞便潛血篩檢。'
    },
    treatment: {
      title: 'PPI/P-CAB 階梯抑酸、C 肝全口服根治、B 肝抗病毒與膽胰急症處置',
      one_liner: '胃藥應於早餐前 30 分鐘空腹服用；C 肝口服 DAA 藥物 8–12 週治癒率 >98%；右上腹劇痛發燒黃疸須立即急診。',
      points: [
        '精準抑酸治療：PPI（氫離子幫浦抑制劑）須在餐前 30 分鐘服用以鎖定活化態幫浦；新型 P-CAB（Vonoprazan）則不受進食影響且起效極快。',
        '病毒性肝炎現代醫療：C 型肝炎健保給付全口服直接抗病毒藥物（DAA），8–12 週即可徹底根治；B 肝帶原者依病毒量與纖維化服用 Entecavir 或 TAF，切忌自行停藥以免猛爆性肝炎。',
        '膽囊炎與急性胰臟炎：有症狀膽結石標準治療為腹腔鏡膽囊切除術（非僅夾石頭）；急性胰臟炎需禁食、早期適度乳酸林格氏液輸液與病因根除（戒酒或 ERCP 取膽管結石）。'
      ],
      evidence_grade: 'A',
      evidence_source: 'Tokyo Guidelines 2018 (TG18) / EASL & AASLD Hepatitis B/C Guidelines',
      caution: '🚨 若出現吐血、解柏油黑便、暗紅血便、吞嚥困難卡住、右上腹劇痛合併發燒黃疸（Charcot 三聯徵）或上腹劇痛穿透背部，必須立即掛急診！',
      action_item: '正在服用 B 肝抗病毒藥物或帶原者，立即在手機行事曆設定「每 6 個月腹部超音波 + AFP 抽血」鬧鐘。'
    }
  },

  // ── 所有主要癌症防治與精準醫療專區 (Clinical Oncology) ──
  'oncology': {
    page_id_or_topic: 'oncology',
    title_zh: '癌症防治與精準腫瘤學：六癌早篩、標靶免疫與抗癌營養照護',
    topic_badge: '臨床腫瘤學與癌症預防醫學',
    diet: {
      title: '防癌地中海飲食與化放療期間「高蛋白、高熱量、熟食安全」鐵律',
      one_liner: '預防期遠離紅肉加工肉、酒精、檳榔與發霉花生；治療期每公斤體重攝取 1.2–1.5g 蛋白質，破除「餓死癌細胞」迷思！',
      points: [
        '一級致癌物歸零：IARC 將菸、酒（特別是台灣人高盛行的 ALDH2 缺乏喝酒臉紅基因）、檳榔、加工肉品（香腸培根）與黃麴毒素列為一級致癌物，應徹底戒除。',
        '化放療期營養保衛戰（ESPEN 指引）：癌症惡病質與體重流失會導致化療被迫中斷；治療期間應採高熱量（25–30 kcal/kg）與高蛋白（1.2–1.5 g/kg）飲食，食慾差時少量多餐並補充醫療級高蛋白營養品。',
        '白血球低下期（Neutropenia）熟食鐵律：化療後第 7–14 天絕對嗜中性球（ANC）最低，嚴禁生魚片、生菜沙拉、半熟蛋、未削皮水果與隔夜菜，飲水務必煮沸。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ESPEN Practical Guideline: Clinical Nutrition in Cancer / WCRF Diet & Cancer Report',
      key_metric: { label: '抗癌治療期蛋白質', target: '1.2–1.5', unit: 'g/kg/日' },
      action_item: '治療期間每週固定量體重 2 次；若單月體重下降超過 2% 或進食量減半超過 3 天，立即照會腫瘤營養師。'
    },
    exercise: {
      title: '運動腫瘤學（Exercise Oncology）：對抗癌因性疲憊與降低復發率',
      one_liner: '確診癌症後絕非完全臥床休息；每週 3 次有氧結合抗阻運動，是改善「癌因性疲憊（CRF）」最高等級的 A 級處方。',
      points: [
        '降低癌症復發與死亡率：ASCO 與 ACSM 大型統合分析證實，乳癌、大腸癌與攝護腺癌患者確診後維持規律運動，可降低癌症特異性死亡率達 25–40%。',
        '破解癌因性疲憊：過度臥床反而加速肌肉萎縮與疲憊惡性循環；每天 20–30 分鐘中強度散步或彈力帶訓練能顯著提振體力、改善睡眠與緩解焦慮。',
        '特殊防護注意事項：乳癌腋下淋巴廓清術後應循序進行上肢復健並防範淋巴水腫；骨轉移或血小板極低（<50,000/μL）患者需由復健科醫師評估安全動作。'
      ],
      evidence_grade: 'A',
      evidence_source: 'ASCO Exercise, Diet, and Weight Management During Cancer Treatment Guideline / ACSM Roundtable',
      key_metric: { label: '腫瘤復健運動劑量', target: '30分鐘×3次', unit: '/週 有氧 + 2次輕中度阻力' },
      action_item: '即使在化療療程間歇期，每天也在體力允許下於室內或公園慢走 15–20 分鐘。'
    },
    prevention: {
      title: '台灣公費六大癌症篩檢（2025–2026 擴大新制）與疫苗防癌',
      one_liner: '正常抽血腫瘤標記（CEA/CA19-9）不能排除早期癌！唯有 LDCT、大腸鏡、乳房攝影、抹片/HPV 等專科篩檢能救命。',
      points: [
        '2025–2026 台灣公費六癌篩檢：肺癌（重度吸菸 ≥20 包年或具肺癌家族史者，每 2 年 LDCT 低劑量電腦斷層）、大腸癌（45–74 歲或 40–44 歲家族史，每 2 年 FIT 糞便潛血）、乳癌（40–74 歲女性，每 2 年乳房 X 光攝影）、子宮頸癌（25 歲起抹片 + 35/45/65 歲 HPV 檢測）、口腔癌（黏膜檢查）與胃癌（幽門桿菌篩檢）。',
        '防癌疫苗雙雄：公費 B 型肝炎疫苗已使台灣年輕世代肝癌率暴跌；國中男女生公費九價 HPV 疫苗更能同時預防子宮頸癌與頭頸口咽癌。',
        '十大癌症警訊（CAUTION）：排便或排尿習慣改變、傷口潰瘍逾 2 週不癒、異常出血（停經後出血、血尿、咳血）、無痛性硬塊、吞嚥困難、痣快速變大流血、久咳沙啞、不明原因體重減輕（半年 >5%）。'
      ],
      evidence_grade: 'A',
      evidence_source: '衛生福利部國民健康署 2025–2026 擴大癌症篩檢指引 / USPSTF Screening Guidelines',
      key_metric: { label: '第 0–I 期早期癌五年存活率', target: '> 90%', unit: '(定期篩檢攔截)' },
      action_item: '立即使用本專區「台灣公費六大癌症篩檢資格試算器」，為自己與父母預約符合資格的免費篩檢。'
    },
    treatment: {
      title: 'MDT 多專科團隊、NGS 基因定序、標靶/免疫/ADC 與早期緩和醫療',
      one_liner: '確診後先完成完整 TNM 分期與基因生物標記檢測（EGFR/ALK/BRCA/MSI/PD-L1），再由多專科團隊擬定精準療程。',
      points: [
        '精準醫療五大支柱：微創/達文西手術、現代精準放療（IMRT/SBRT/質子重離子布拉格峰）、化學治療、基因對應標靶藥物（TKI）、免疫檢查點抑制劑（PD-1/PD-L1）與抗體藥物複合體（ADC 生物導彈）。',
        '免疫治療副作用（irAEs）警戒：免疫療法可能引發自體免疫肺炎、結腸炎、肝炎或甲狀腺/腦下垂體炎，出現莫名乾咳氣喘或每日腹瀉 >4 次須立即聯絡個管師，由醫師給予類固醇控制。',
        '早期整合疼痛管理與緩和醫療：WHO 三階梯止痛原則強調「按時給藥、口服優先」，醫療用嗎啡在疼痛控制下極少成癮；預立醫療決定（ACP）保障病患尊嚴。'
      ],
      evidence_grade: 'A',
      evidence_source: 'NCCN Clinical Practice Guidelines in Oncology 2025 / ESMO & ASCO Guidelines',
      caution: '🚨 化療期間若體溫 ≥ 38.0°C（或單次 ≥ 38.3°C），極可能為致命性「嗜中性球低下發燒（Febrile Neutropenia）」，絕對不可自行吃退燒藥睡覺，必須在 1 小時內攜帶化療卡直奔急診！',
      action_item: '就診時索取病理報告與基因檢測結果，主動與主治醫師及癌症個管師討論第一線最佳治療組合。'
    }
  }
};

/**
 * 取得指定章節、主題或單一知識頁面的四大維度臨床處方配置
 * 若傳入 PAGE-W-* / PAGE-O-* / PAGE-A-*，會自動融合該知識頁面的專屬行動處方、關鍵機制與醫療紅旗警訊！
 */
export function getFourPillarsProfile(pageIdOrTopic: string): FourPillarsProfile {
  // 1. Direct match in registry
  if (FOUR_PILLARS_DATA_REGISTRY[pageIdOrTopic]) {
    return FOUR_PILLARS_DATA_REGISTRY[pageIdOrTopic];
  }

  // 2. Specific KnowledgePage resolution (PAGE-W-*, PAGE-O-*, PAGE-A-*)
  const matchedPage = ALL_KNOWLEDGE_PAGES.find((p) => p.id === pageIdOrTopic);
  if (matchedPage) {
    const baseProfile =
      FOUR_PILLARS_DATA_REGISTRY[matchedPage.chapter_id] || FOUR_PILLARS_DATA_REGISTRY['cardiometabolic'];
    const kpClaims = matchedPage.kps.map((k) => k.one_liner);
    const kpWarning = matchedPage.not_for_you?.[0];
    const twDesc = matchedPage.taiwan_context?.description;
    const redFlagText = matchedPage.red_flags?.join('；');

    return {
      page_id_or_topic: matchedPage.id,
      title_zh: `${matchedPage.title_zh}（飲食 · 運動 · 預防 · 治療）`,
      topic_badge: `${baseProfile.topic_badge} · ${matchedPage.id}`,
      diet: {
        ...baseProfile.diet,
        title: `【飲食與攝取】${matchedPage.title_zh}核心營養策略`,
        one_liner: matchedPage.do_this.tier1,
        points: [
          `核心落實：${matchedPage.do_this.tier1}`,
          kpClaims[0] ? `實證生理基礎：${kpClaims[0]}` : baseProfile.diet.points[0],
          twDesc ? `台灣在地情境：${twDesc.slice(0, 110)}${twDesc.length > 110 ? '…' : ''}` : baseProfile.diet.points[1]
        ],
        action_item: matchedPage.do_this.tier1
      },
      exercise: {
        ...baseProfile.exercise,
        title: `【運動與代謝】${matchedPage.title_zh}體能與生理調節`,
        one_liner: matchedPage.do_this.tier2,
        points: [
          `進階行動處方：${matchedPage.do_this.tier2}`,
          kpClaims[1] ? `代謝與生理機轉：${kpClaims[1]}` : baseProfile.exercise.points[0],
          baseProfile.exercise.points[1]
        ],
        action_item: matchedPage.do_this.tier2
      },
      prevention: {
        ...baseProfile.prevention,
        title: `【預防與篩檢】${matchedPage.title_zh}風險監測指標`,
        one_liner: matchedPage.do_this.tier3,
        points: [
          `精準自我監測：${matchedPage.do_this.tier3}`,
          kpClaims[2] ? `關鍵實證指標：${kpClaims[2]}` : baseProfile.prevention.points[0],
          baseProfile.prevention.points[1]
        ],
        action_item: matchedPage.do_this.tier3
      },
      treatment: {
        ...baseProfile.treatment,
        title: `【臨床治療與警訊】${matchedPage.title_zh}醫療處置界線`,
        one_liner: redFlagText || baseProfile.treatment.one_liner,
        points: [
          ...(kpWarning ? [`不適用與特殊排除對象：${kpWarning}`] : []),
          ...baseProfile.treatment.points.slice(0, 2)
        ],
        caution: redFlagText
          ? `🚨 醫療紅旗警訊：${redFlagText}`
          : baseProfile.treatment.caution,
        action_item: baseProfile.treatment.action_item
      }
    };
  }

  // 3. Prefix fallback
  if (pageIdOrTopic.startsWith('PAGE-W-')) return FOUR_PILLARS_DATA_REGISTRY['W'];
  if (pageIdOrTopic.startsWith('PAGE-O-')) return FOUR_PILLARS_DATA_REGISTRY['O'];
  if (pageIdOrTopic.startsWith('PAGE-A-')) return FOUR_PILLARS_DATA_REGISTRY['A'];

  // 4. Default fallback
  return FOUR_PILLARS_DATA_REGISTRY['cardiometabolic'];
}

