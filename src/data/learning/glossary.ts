import { GlossaryEntry } from '../../types/learning';

/**
 * Plain-language glossary: the words a layperson meets on a report, a drug label or
 * in a clinic, each explained in one or two sentences with no further jargon.
 * Acronym disambiguation lives in the canonical TerminologyRegistry; the glossary page
 * shows both.
 */
export const GLOSSARY: GlossaryEntry[] = [
  // 檢驗與數值
  { term: 'eGFR', zh: '腎絲球過濾率估計值', plain_zh: '用血中肌酸酐推算腎臟每分鐘能過濾多少血，數字越低代表腎功能越差；低於 60 持續 3 個月以上屬慢性腎臟病。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-05' },
  { term: 'UACR', zh: '尿液白蛋白/肌酸酐比值', plain_zh: '看尿中漏出多少白蛋白。正常腎臟幾乎不漏，≥30 mg/g 就是腎臟受損的早期警訊。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-05' },
  { term: 'HbA1c', zh: '糖化血色素', plain_zh: '血色素被糖黏住的比例，代表過去 2–3 個月的平均血糖；≥6.5% 可診斷糖尿病。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-03' },
  { term: 'LDL-C', zh: '低密度脂蛋白膽固醇', plain_zh: '俗稱壞膽固醇，會堆積在血管壁形成斑塊；目標值依個人心血管風險而不同。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-04' },
  { term: 'HDL-C', zh: '高密度脂蛋白膽固醇', plain_zh: '俗稱好膽固醇，偏低常與胰島素阻抗一起出現；但用藥把它拉高並不會降低心臟病。', category: '檢驗與數值' },
  { term: 'TG', zh: '三酸甘油酯', plain_zh: '血中的中性脂肪，容易被含糖飲料、精製澱粉與酒精推高；≥500 mg/dL 有胰臟炎風險。', category: '檢驗與數值' },
  { term: 'Lp(a)', zh: '脂蛋白(a)', plain_zh: '由基因決定的一種致病脂蛋白，一生驗一次即可；偏高的人要更嚴格控制其他危險因子。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-04' },
  { term: 'ALT / GPT', zh: '丙胺酸轉胺酶', plain_zh: '肝細胞受傷時漏到血中的酵素，俗稱肝指數；正常不代表肝臟沒有纖維化。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-06' },
  { term: 'FIB-4', zh: '肝纖維化指數', plain_zh: '用年齡、AST、ALT、血小板算出來的分數，估計肝臟是否已經變硬；<1.3 風險低。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-06' },
  { term: 'WHtR', zh: '腰圍身高比', plain_zh: '腰圍除以身高。超過 0.5 代表腹部脂肪過多，不分性別年齡都適用。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-07' },
  { term: 'BMI', zh: '身體質量指數', plain_zh: '體重（公斤）除以身高（公尺）的平方。台灣 ≥24 為過重、≥27 為肥胖，但分不出肌肉與脂肪。', category: '檢驗與數值' },
  { term: 'SpO₂', zh: '血氧飽和度', plain_zh: '血中紅血球攜帶氧氣的比例，正常 95–100%；低於 92% 應就醫。', category: '檢驗與數值' },
  { term: 'T-score', zh: '骨密度 T 值', plain_zh: '和年輕成人骨量相比差幾個標準差；≤ −2.5 為骨質疏鬆。', category: '檢驗與數值' },
  { term: 'PSA', zh: '攝護腺特異抗原', plain_zh: '攝護腺癌的血液指標，但發炎或肥大也會升高；是否篩檢應與醫師討論利弊。', category: '檢驗與數值' },

  // 疾病與狀態
  { term: '糖尿病前期', zh: 'Prediabetes', plain_zh: '血糖高於正常但未達糖尿病，是逆轉機會最大的階段；減重 5–7% 可大幅降低進展。', category: '疾病與狀態', related_hash: 'learn/prevent/L-PRE-03' },
  { term: '代謝症候群', zh: 'Metabolic syndrome', plain_zh: '腰圍、血壓、血糖、三酸甘油酯、HDL 五項中有三項異常；是心臟病與糖尿病的前哨站。', category: '疾病與狀態', related_hash: 'learn/prevent/L-PRE-01' },
  { term: 'MASLD', zh: '代謝功能障礙相關脂肪性肝病', plain_zh: '脂肪肝的新名稱，強調它和肥胖、高血糖、高血脂的關聯；合併發炎稱 MASH。', category: '疾病與狀態' },
  { term: 'CKD', zh: '慢性腎臟病', plain_zh: '腎功能下降或腎臟受損持續 3 個月以上；早期多無症狀，要靠抽血驗尿發現。', category: '疾病與狀態' },
  { term: 'OSA', zh: '阻塞型睡眠呼吸中止', plain_zh: '睡覺時喉嚨反覆塌陷、呼吸暫停，造成缺氧與頻繁醒來；大聲打呼加白天嗜睡要小心。', category: '疾病與狀態', related_hash: 'learn/rest/L-REST-04' },
  { term: '心房顫動', zh: 'Atrial fibrillation', plain_zh: '心房亂跳、無法有效收縮的心律不整，容易形成血塊，中風風險約增加 5 倍。', category: '疾病與狀態' },
  { term: '肌少症', zh: 'Sarcopenia', plain_zh: '肌肉量、肌力與行動能力一起下降；亞洲標準看握力、步行速度與肌肉量。', category: '疾病與狀態', related_hash: 'learn/prevent/L-PRE-06' },
  { term: '臨床肥胖', zh: 'Clinical obesity', plain_zh: '2025 年 Lancet 委員會提出：脂肪過多並已造成器官功能異常或日常受限的疾病狀態。', category: '疾病與狀態' },
  { term: '白袍高血壓', zh: 'White-coat hypertension', plain_zh: '在診間量血壓偏高，在家量卻正常；需用居家 722 量測確認。', category: '疾病與狀態' },
  { term: '隱匿性高血壓', zh: 'Masked hypertension', plain_zh: '診間量正常，在家或日常生活中卻偏高；比白袍高血壓更容易被漏掉。', category: '疾病與狀態' },

  // 治療與藥物
  { term: 'GLP-1 促效劑', zh: 'GLP-1 receptor agonist', plain_zh: '模仿腸道飽足荷爾蒙的藥物，用於糖尿病與肥胖；停藥後多數人會復胖。', category: '治療與藥物', related_hash: 'learn/prevent/L-PRE-05' },
  { term: 'Statin', zh: '史他汀類降膽固醇藥', plain_zh: '抑制肝臟製造膽固醇的藥物，是降低 LDL 與心血管事件證據最多的藥。', category: '治療與藥物' },
  { term: 'SGLT2 抑制劑', zh: 'SGLT2 inhibitor', plain_zh: '讓多餘的糖從尿液排出的藥物，同時保護心臟與腎臟。', category: '治療與藥物' },
  { term: 'NSAIDs', zh: '非類固醇消炎止痛藥', plain_zh: '如布洛芬、萘普生。長期使用會傷胃、傷腎、升高血壓。', category: '治療與藥物', related_hash: 'learn/basics/L-BAS-06' },
  { term: 'CBT-I', zh: '失眠認知行為治療', plain_zh: '不靠藥物、調整睡眠習慣與想法的治療，是慢性失眠的第一線療法。', category: '治療與藥物', related_hash: 'learn/rest/L-REST-02' },
  { term: 'CPAP', zh: '正壓呼吸器', plain_zh: '睡覺時戴上面罩送出氣流撐開呼吸道，是中重度睡眠呼吸中止的主要治療。', category: '治療與藥物' },
  { term: '荷爾蒙療法', zh: 'Menopausal hormone therapy', plain_zh: '補充雌激素（有子宮者合併黃體素）治療更年期熱潮紅；2025 年 FDA 已修正其黑框警語。', category: '治療與藥物', related_hash: 'learn/prevent/L-PRE-07' },

  // 研究與證據
  { term: 'RCT', zh: '隨機對照試驗', plain_zh: '把受試者隨機分組比較治療效果，最能判斷因果關係的研究設計。', category: '研究與證據', related_hash: 'learn/basics/L-BAS-02' },
  { term: '統合分析', zh: 'Meta-analysis', plain_zh: '把多個研究的數據合併重新計算，得到更穩定的結論；品質取決於納入的研究。', category: '研究與證據' },
  { term: '世代研究', zh: 'Cohort study', plain_zh: '長期追蹤一群人，比較有無某種暴露者之後的發病差異；只能看到相關，不一定是因果。', category: '研究與證據' },
  { term: '相對風險', zh: 'Relative risk', plain_zh: '兩組發生率的比例；「降低 50%」可能只是從 2% 變 1%。', category: '研究與證據', related_hash: 'learn/basics/L-BAS-03' },
  { term: 'NNT', zh: '需治療人數', plain_zh: '要治療多少人才能讓 1 人受益；數字越小，治療效益越大。', category: '研究與證據', related_hash: 'learn/basics/L-BAS-03' },
  { term: '偽陽性', zh: 'False positive', plain_zh: '檢查說有問題，其實沒有；篩檢越多、越無差別，偽陽性越多。', category: '研究與證據' },

  // 運動與生活
  { term: 'VO₂max', zh: '最大攝氧量', plain_zh: '全力運動時身體每分鐘能用掉多少氧氣，是心肺能力與長壽最強的預測指標之一。', category: '運動與生活' },
  { term: 'Zone 2', zh: '第二心率區間', plain_zh: '約最大心率 60–70%、還能完整說話的強度，用來累積有氧基礎。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-05' },
  { term: 'RIR', zh: '保留次數', plain_zh: '一組做完時「還能再做幾下」。ACSM 2026 建議保留 2–3 下即可。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-03' },
  { term: '運動零食', zh: 'Exercise snacks', plain_zh: '一天數次、每次 1–2 分鐘的費力活動，例如快速爬樓梯。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-04' },
  { term: '超加工食品', zh: 'Ultra-processed food', plain_zh: '主要以工業原料與添加物組成的食品，如泡麵、香腸、洋芋片、含糖飲料。', category: '運動與生活', related_hash: 'learn/eat/L-EAT-06' },
  { term: '睡眠規律度', zh: 'Sleep regularity', plain_zh: '每天入睡與起床時間的一致程度；研究顯示比睡眠時數更能預測健康。', category: '運動與生活', related_hash: 'learn/rest/L-REST-01' },
];

export const GLOSSARY_CATEGORIES = ['檢驗與數值', '疾病與狀態', '治療與藥物', '研究與證據', '運動與生活'] as const;
