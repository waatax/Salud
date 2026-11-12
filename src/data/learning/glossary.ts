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
  { term: 'ApoB', zh: '載脂蛋白 B', plain_zh: '所有具動脈硬化致病性顆粒（VLDL、IDL、LDL）的唯一身分標籤；相比 LDL-C，ApoB 能更精準預測心血管阻塞與心肌梗塞風險。', category: '檢驗與數值', related_hash: 'learn/checkup/L-CHK-04' },
  { term: '心率變異度', zh: 'HRV', plain_zh: '連續心跳間隔毫秒時間的微小波動；反映自律神經系統副交感迷走神經張力與身體對抗生理壓力的恢復韌性。', category: '檢驗與數值', related_hash: 'mental' },
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
  { term: '慢波睡眠', zh: 'SWS 深層慢波睡眠', plain_zh: '非快速動眼期第三期（N3）；此時大腦類淋巴系統通道擴大 60% 衝洗清除代謝廢物，生長激素大量分泌修復身體。', category: '運動與生活', related_hash: 'learn/rest/L-REST-01' },
  { term: '荷爾蒙療法', zh: 'Menopausal hormone therapy', plain_zh: '補充雌激素（有子宮者合併黃體素）治療更年期熱潮紅；2025 年 FDA 已修正其黑框警語。', category: '治療與藥物', related_hash: 'learn/prevent/L-PRE-07' },

  // 研究與證據
  { term: 'RCT', zh: '隨機對照試驗', plain_zh: '把受試者隨機分組比較治療效果，最能判斷因果關係的研究設計。', category: '研究與證據', related_hash: 'learn/basics/L-BAS-02' },
  { term: '統合分析', zh: 'Meta-analysis', plain_zh: '把多個研究的數據合併重新計算，得到更穩定的結論；品質取決於納入的研究。', category: '研究與證據' },
  { term: '糖化終產物', zh: 'AGEs 糖毒素', plain_zh: '高血糖或高溫油炸烹調使糖分子與蛋白質非酵素性結合的產物；會破壞微血管膠原蛋白彈性，加速老化與動脈硬化。', category: '疾病與狀態', related_hash: 'learn/eat/L-EAT-06' },
  { term: '代謝彈性', zh: 'Metabolic flexibility', plain_zh: '細胞粒線體依照進食或活動狀態，在燃燒葡萄糖與氧化脂肪酸之間流暢無縫切換的能力；胰島素阻抗會使其僵化。', category: '疾病與狀態', related_hash: 'obesity' },
  { term: 'NNT', zh: '需治療人數', plain_zh: '要治療多少人才能讓 1 人受益；數字越小，治療效益越大。', category: '研究與證據', related_hash: 'learn/basics/L-BAS-03' },
  { term: '肌少性肥胖', zh: 'Sarcopenic obesity', plain_zh: '體重正常或偏重、但深層骨骼肌萎縮且脂肪浸潤肌肉組織的隱形體型；跌倒失能與心血管代謝風險遠高於單純肥胖。', category: '疾病與狀態', related_hash: 'learn/prevent/L-PRE-06' },

  // 運動與生活
  { term: '最大肌力', zh: 'Maximum strength (1RM)', plain_zh: '在特定動作中盡全力只能標準完成 1 下的最大重量；是所有運動能力、爆發力與相對肌耐力的地板指標與火車頭。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-08' },
  { term: '肌耐力', zh: 'Muscular endurance', plain_zh: '肌肉在特定阻力下持續收縮或反覆多次而不力竭的抗疲勞能力；先把最大肌力練高，日常生活的相對肌耐力就會跟著倍增。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-08' },
  { term: 'VO₂max', zh: '最大攝氧量', plain_zh: '全力運動時人體每分鐘每公斤能利用的最大氧氣毫升數；是全因死亡率預測力最強的心肺與長壽火車頭指標。', category: '運動與生活', related_hash: 'exercise/running' },
  { term: 'Zone 2', zh: '第二心率區間', plain_zh: '約最大心率 60–70%、還能完整說話的強度，用來累積有氧基礎。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-05' },
  { term: 'RIR', zh: '保留次數', plain_zh: '一組做完時「還能再做幾下」。ACSM 2026 建議保留 2–3 下即可。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-03' },
  { term: '運動零食', zh: 'Exercise snacks', plain_zh: '一天數次、每次 1–2 分鐘的費力活動，例如快速爬樓梯。', category: '運動與生活', related_hash: 'learn/move/L-MOVE-04' },
  { term: '巴氏量表', zh: 'Barthel Index', plain_zh: '評估吃飯、移位、如廁、洗澡、走路等 10 項日常活動的量表，滿分 100；分數越低越需要別人幫忙，常用於申請外籍看護與長照險理賠。', category: '疾病與狀態', related_hash: 'ltc/ASSESS' },
  { term: '長照需要等級（CMS）', zh: 'Long-term care needs level', plain_zh: '照管專員到府評估後核定的 1–8 級，2 級以上可使用政府長照「四包錢」，等級越高額度越多。', category: '疾病與狀態', related_hash: 'ltc/ASSESS' },
  { term: 'ADL／IADL', zh: '日常生活活動／工具性日常生活活動', plain_zh: 'ADL 是吃飯、洗澡、如廁等基本自理；IADL 是購物、煮飯、服藥、理財等獨立生活能力，常比 ADL 更早退步。', category: '疾病與狀態', related_hash: 'ltc/OVERVIEW' },
  { term: '喘息服務', zh: 'Respite care', plain_zh: '讓家庭照顧者休息的長照服務：照服員到府替手、日照臨托或機構短期住宿；每年 32,340–48,510 元額度。', category: '治療與藥物', related_hash: 'ltc/CAREGIVER' },
  { term: '衰弱', zh: 'Frailty', plain_zh: '體重減輕、疲憊、握力弱、走路慢、活動少中符合 3 項；是失能前的警訊，及早運動與補充蛋白質有機會逆轉。', category: '疾病與狀態', related_hash: 'ltc/PREVENT' },
  { term: '預立醫療決定（AD）', zh: 'Advance decision', plain_zh: '依病人自主權利法，在清楚時經諮商後預先決定末期等情況要不要接受維生醫療，並註記在健保卡。', category: '治療與藥物', related_hash: 'ltc/LEGAL' },
  { term: 'HBsAg', zh: 'B 型肝炎表面抗原', plain_zh: '陽性代表體內有 B 肝病毒；持續超過 6 個月就是慢性帶原。', category: '檢驗與數值', related_hash: 'hepb/TESTS' },
  { term: 'Anti-HBs', zh: 'B 型肝炎表面抗體', plain_zh: '對 B 肝的保護力，來自疫苗或感染後康復；≥10 mIU/mL 視為有保護力。', category: '檢驗與數值', related_hash: 'hepb/TESTS' },
  { term: 'Anti-HBc', zh: 'B 型肝炎核心抗體', plain_zh: '陽性代表曾經感染過 B 肝；疫苗不會產生這個抗體。接受化療或免疫抑制治療前要告知醫師。', category: '檢驗與數值', related_hash: 'hepb/TESTS' },
  { term: 'HBV DNA', zh: 'B 型肝炎病毒量', plain_zh: '血中 B 肝病毒的數量（IU/mL），是決定要不要治療、治療有沒有效的關鍵指標。', category: '檢驗與數值', related_hash: 'hepb/TREATMENT' },
  { term: 'AFP', zh: '胎兒蛋白', plain_zh: '肝癌的腫瘤標記，通常搭配腹部超音波一起追蹤，單獨使用容易漏掉早期肝癌。', category: '檢驗與數值', related_hash: 'hepb/MONITOR' },
  { term: '慢性 B 型肝炎', zh: 'Chronic hepatitis B', plain_zh: 'B 肝病毒在體內持續超過 6 個月；多數沒有症狀，是台灣肝硬化與肝癌最主要的原因。', category: '疾病與狀態', related_hash: 'hepb' },
  { term: '粒線體自噬', zh: 'Mitophagy', plain_zh: '細胞主動辨識並清除受損衰老粒線體的自噬機制；可藉由 Zone 2 運動、間歇禁食與冷熱刺激活化，抗老延壽關鍵。', category: '運動與生活', related_hash: 'longevity' },
  // 脊椎與神經（v4.4）
  { term: '骨刺', zh: '骨贅 Osteophyte', plain_zh: '關節或椎體邊緣因長期受力增生的骨質，是退化的結果；很常見，多數沒有症狀，也不會被藥物或食物溶掉。', category: '脊椎與神經', related_hash: 'spine/SPURS' },
  { term: '椎間盤突出', zh: 'Disc herniation', plain_zh: '椎間盤外圈的纖維環破裂、中心的髓核往外跑，可能壓到神經根；多數會隨時間縮小。', category: '脊椎與神經', related_hash: 'spine/TREATMENT' },
  { term: '神經根病變', zh: 'Radiculopathy', plain_zh: '離開脊椎的神經根被壓迫或發炎，造成單側沿手臂或腿一條帶狀的麻、痛或無力。', category: '脊椎與神經', related_hash: 'spine/NUMBNESS' },
  { term: '坐骨神經痛', zh: 'Sciatica', plain_zh: '從臀部往下延伸過膝蓋的腿痛或麻，最常由 L5 或 S1 神經根受壓引起。', category: '脊椎與神經', related_hash: 'spine/NUMBNESS' },
  { term: '脊髓病變', zh: 'Myelopathy', plain_zh: '脊髓本身被壓迫，常見於頸椎退化；表現為雙手笨拙、走路不穩，需要盡快就醫。', category: '脊椎與神經', related_hash: 'spine/NUMBNESS' },
  { term: '椎管狹窄', zh: 'Spinal stenosis', plain_zh: '骨刺、膨出的椎間盤與增厚的韌帶讓脊椎通道變窄；腰椎狹窄常在走路後雙腿痠麻、坐下就好。', category: '脊椎與神經', related_hash: 'spine/SPURS' },
  { term: '馬尾症候群', zh: 'Cauda equina syndrome', plain_zh: '腰椎以下的馬尾神經被大量壓迫，出現會陰麻木、大小便異常與雙腿無力，是需要緊急手術的急症。', category: '脊椎與神經', related_hash: 'spine/TRIAGE' },
  { term: '腕隧道症候群', zh: 'Carpal tunnel syndrome', plain_zh: '手腕的正中神經被壓迫，拇指到無名指半邊麻、夜裡麻醒、甩手會好。', category: '脊椎與神經', related_hash: 'spine/NUMBNESS' },
  { term: '肌肉發力率', zh: 'RFD 發力率', plain_zh: '神經傳導下達後 0.1–0.2 秒內肌肉能爆發出的力量增長速度；是長者防絆倒骨折與運動反應速度最核心的神經肌肉指標。', category: '運動與生活', related_hash: 'exercise/strength' },
  { term: 'NCS／EMG', zh: '神經傳導檢查／肌電圖', plain_zh: '用小電流與細針測量神經和肌肉的電訊號，用來分辨問題在脊椎神經根還是手腕、手肘等周邊神經。', category: '脊椎與神經', related_hash: 'spine/TRIAGE' },
  { term: '非運動性活動產熱', zh: 'NEAT', plain_zh: '除刻意運動、睡眠與消化進食外，日常走路、走樓梯、站立與作家事所消耗的能量；左右每日熱量消耗差異達數百大卡。', category: '運動與生活', related_hash: 'obesity' },
  { term: 'OPLL', zh: '後縱韌帶骨化症', plain_zh: '頸椎椎體後方的韌帶慢慢變成骨頭、從前方壓迫脊髓；在東亞族群較常見。', category: '脊椎與神經', related_hash: 'spine/SPURS' },
  { term: '胰島素抗性', zh: 'Insulin resistance', plain_zh: '骨骼肌、肝臟與脂肪細胞對正常胰島素濃度刺激反應遲鈍，迫使胰臟分泌更高濃度胰島素；是脂肪肝與第二型糖尿病的共同土壤。', category: '疾病與狀態', related_hash: 'learn/prevent/L-PRE-03' },
  { term: '睡眠規律度', zh: 'Sleep regularity', plain_zh: '每天入睡與起床時間的一致程度；與健康風險相關，但不能抵銷睡眠不足。', category: '運動與生活', related_hash: 'learn/rest/L-REST-01' },
  { term: '橫紋肌溶解症', zh: 'Rhabdomyolysis', plain_zh: '骨骼肌細胞急性壞死破裂，釋放大量肌紅蛋白阻塞腎小管造成茶色尿與急性腎衰竭；是劇烈過勞運動的急診紅旗。', category: '疾病與狀態', related_hash: 'exercise/strength' },
  { term: '延遲性肌肉痠痛', zh: 'DOMS', plain_zh: '高強度或不熟悉運動後 24–72 小時達到高峰的微小肌纖維發炎與修復現象；痠痛局限於肌肉中段且尿液顏色正常。', category: '運動與生活', related_hash: 'exercise/strength' },
  { term: '徒手訓練', zh: 'Calisthenics', plain_zh: '以自體體重為主要阻力，透過調整槓桿支點、身體傾角與力臂進行進階或退階的科學力量訓練法。', category: '運動與生活', related_hash: 'exercise/strength' },
  { term: '肌激素', zh: 'Myokines', plain_zh: '骨骼肌在規律收縮運動時主動分泌的細胞激素（如 IL-6、Irisin），能調節全身葡萄糖代謝、抗慢性發炎與提升心血管彈性。', category: '運動與生活', related_hash: 'exercise/strength' },
  { term: '白胺酸閾值', zh: 'Leucine trigger', plain_zh: '刺激骨骼肌細胞內 mTORC1 訊號啟動肌肉蛋白質合成所必需的支鏈胺基酸劑量，成人每餐約需 2.5–3 克以克服年齡同化阻抗。', category: '運動與生活', related_hash: 'exercise/strength' },
];

export const GLOSSARY_CATEGORIES = ['檢驗與數值', '疾病與狀態', '脊椎與神經', '治療與藥物', '研究與證據', '運動與生活'] as const;
