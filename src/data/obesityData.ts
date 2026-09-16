import {
  ObesityDrugReview,
  DietRegimenEvaluation,
  ObesityMechanismTopic,
  BariatricSurgeryOption,
  ObesityMythItem,
  EossStage,
  HypertrophyMechanism,
  MuscleGroupVolumeItem,
  FatLossMetabolismStep,
  BodyRecompCandidate,
} from '../types';

/**
 * 愛德蒙頓肥胖分級系統 (Edmonton Obesity Staging System, EOSS)
 * 現代醫學打破單純以 BMI 為唯一指標之臨床分級金標準
 */
export const EOSS_STAGES: EossStage[] = [
  {
    stage: 0,
    title_zh: '第 0 級 · 無表徵期 (No Apparent Risk)',
    medical_definition_zh: '無任何肥胖相關亞臨床危險因子（血壓、血糖、血脂完全正常）。',
    mental_functional_status_zh: '無身體功能障礙、無自尊或進食心理受損、日常活動不受限。',
    recommended_clinical_action_zh: '生活型態維持、預防體重進一步攀升、避免不當極端節食誘發溜溜球效應。',
    intensity_badge: '綠色安全 · 預防醫學維持',
  },
  {
    stage: 1,
    title_zh: '第 1 級 · 亞臨床危險期 (Subclinical Risk Factors)',
    medical_definition_zh: '出現邊緣性血壓偏高（130-139/85-89 mmHg）、空腹血糖偏高（IFG: 100-125 mg/dL）、輕度脂肪肝或偶發性關節酸痛。',
    mental_functional_status_zh: '輕微體力下降、運動後恢復稍慢，輕微外觀自尊困擾。',
    recommended_clinical_action_zh: '結構化醫學營養治療 (MNT)、Zone 2 有氧與抗阻肌力處方、生活微習慣重構。',
    intensity_badge: '黃色警戒 · 強化生活型態介入',
  },
  {
    stage: 2,
    title_zh: '第 2 級 · 確立慢性病期 (Established Chronic Disease)',
    medical_definition_zh: '確立診斷為第 2 型糖尿病、臨床高血壓、重度阻塞性睡眠呼吸中止症 (OSA)、中重度退化性膝關節炎或多囊性卵巢 (PCOS)。',
    mental_functional_status_zh: '中度日常身體功能受限、心理焦慮或情緒性進食傾向增加。',
    recommended_clinical_action_zh: '積極考慮抗肥胖藥物處方（GLP-1 RA 或 雙重促效劑）、跨專科團隊介入、共病合併治療。',
    intensity_badge: '橙色積極 · 處方藥物 + 專科介入',
  },
  {
    stage: 3,
    title_zh: '第 3 級 · 顯著器官損傷期 (Significant End-Organ Damage)',
    medical_definition_zh: '發生心肌梗塞、心絞痛、中風、糖尿病腎病變 (蛋白尿)、失代償性關節軟骨破壞或重度非酒精性脂肪肝炎 (MASH/NASH)。',
    mental_functional_status_zh: '顯著日常行動失能、心理功能顯著受創、生活品質大幅下降。',
    recommended_clinical_action_zh: '強效抗肥胖藥物密集治療，若 BMI 符合指引應立即轉診減重與代謝外科評估手術。',
    intensity_badge: '紅旗警訊 · 藥物強化 / 代謝手術評估',
  },
  {
    stage: 4,
    title_zh: '第 4 級 · 嚴重視能衰竭期 (Severe End-Stage Disability)',
    medical_definition_zh: '重度心臟衰竭、終末期腎病 (ESRD)、完全臥床無法自理、嚴重肺動脈高壓。',
    mental_functional_status_zh: '完全依賴他人照護、極重度生活障礙與心理抑鬱。',
    recommended_clinical_action_zh: '多專科安寧緩和支持或極高度監護下之緊急代謝搶救介入。',
    intensity_badge: '黑旗危急 · 重症多學科照護',
  },
];

/**
 * 肥胖核心生化與神經內分泌病理機轉
 */
export const OBESITY_MECHANISMS: ObesityMechanismTopic[] = [
  {
    id: 'OM-01',
    title_zh: '白色脂肪細胞肥大 vs 增生：發炎因子的冠狀結構 (Crown-like Structures)',
    title_en: 'Adipocyte Hypertrophy vs Hyperplasia & Chronic Macrophage Infiltration',
    badge: '脂肪細胞病理學',
    lead_reviewer_id: 'EC-28',
    evidence_grade: 'A',
    one_liner: '脂肪細胞不是單純的油桶，膨脹到極限會缺氧破裂，引發全身巨噬細胞慢性發炎風暴。',
    physiological_mechanism_zh:
      '白色脂肪組織 (WAT) 儲存過多能量時有兩種形式：肥大（Hypertrophy，單個細胞體積暴增）與增生（Hyperplasia，細胞數量增加）。當成年個體脂肪細胞直徑超過約 100-120 μm，毛細血管擴散距離不足，脂肪細胞內部產生急性缺氧 (Hypoxia)，觸發 HIF-1α 活化與細胞凋亡。鄰近的 M1 型促炎巨噬細胞蜂擁而至，圍繞瀕死脂肪細胞形成病理學標誌「冠狀結構 (Crown-like structures, CLS)」，持續釋放 TNF-α、IL-6 與 MCP-1，直接破壞肌肉與肝臟之胰島素受體受質 (IRS-1) 磷酸化，成為全身胰島素抗性之發源地。',
    clinical_relevance_zh:
      '即使體重相同，以「肥大型 (Hypertrophic)」為主的個體，其動脈硬化、高血壓與第 2 型糖尿病風險顯著高於「增生效應 (Hyperplastic)」個體。減重早期脂肪細胞體積縮小，能迅速大幅緩解巨噬細胞發炎反應。',
    common_misconception_zh:
      '誤以為脂肪只是惰性的皮下墊子。事實上內臟脂肪是人體最大的內分泌與自體免疫調節器官之一。',
    molecular_targets: ['HIF-1α', 'TNF-α', 'IL-6', 'IRS-1', 'MCP-1', 'CD68+ Macrophages'],
  },
  {
    id: 'OM-02',
    title_zh: '內臟脂肪門靜脈毒性與異位脂肪沉積 (Ectopic Fat & Lipotoxicity)',
    title_en: 'Visceral Adiposity, Portal Vein Inflow & Ectopic Lipotoxicity',
    badge: '異位脂毒性',
    lead_reviewer_id: 'EC-03',
    evidence_grade: 'A',
    one_liner: '內臟脂肪游離脂肪酸直衝肝臟門靜脈，並溢出沉積至胰臟與心肌，引發致命脂毒性。',
    physiological_mechanism_zh:
      '內臟脂肪（大網膜與腸繫膜脂肪）具備高度脂解活性（β-腎上腺素受體密度高，α2 受體受阻）。脂解產生的游離脂肪酸 (FFA) 不經過體循環，而是直接經由「門靜脈系統 (Portal System)」直沖肝臟。高濃度的 FFA 逼迫肝臟合成極低密度脂蛋白 (VLDL) 與三酸甘油酯，引發代謝功能障礙相關脂肪性肝病 (MASLD/NAFLD)。當皮下脂肪緩衝庫飽和後，脂質會「外溢 (Spillover)」沉積在非脂肪器官：胰臟 β 細胞（導致神經醯胺 Ceramide 累積並凋亡）、骨骼肌（引起肌細胞內脂質 IMCL 與 GLUT4 轉位障礙）、心包與心肌（引發舒張功能不全與心律不整）。',
    clinical_relevance_zh:
      '「外表看起來瘦，但內臟脂肪等級 12+」的正常體重肥胖族群（Skinny-Fat），其心血管死亡率甚至高於骨骼肌發達的輕度超重者。腰圍（男 >90 cm、女 >80 cm）是比單純體重更具殺傷力的警訊。',
    common_misconception_zh:
      '誤以為只要 BMI < 24 就沒有心血管和脂肪肝風險。脂肪沉積的位置比總脂肪量重要十倍。',
    molecular_targets: ['Portal Free Fatty Acids', 'Ceramides', 'Diacylglycerol (DAG)', 'IMCL', 'VLDL-TG'],
  },
  {
    id: 'OM-03',
    title_zh: '下視丘食慾調控中樞：POMC/CART 抑食 vs NPY/AgRP 促食神經拮抗',
    title_en: 'Hypothalamic Appetite Circuits: POMC/CART vs NPY/AgRP Antagonism',
    badge: '神經食慾中樞',
    lead_reviewer_id: 'EC-31',
    evidence_grade: 'A',
    one_liner: '大腦弓狀核有兩組踩油門與踩煞車的神經元，決定你每一秒對熱量的渴求與飽足。',
    physiological_mechanism_zh:
      '下視丘弓狀核 (Arcuate Nucleus, ARC) 是大腦能量感應大腦皮質總機。它包含兩群功能完全拮抗的神經元：\n1. 抑食煞車神經元：原鴉片黑素皮質素 (POMC) 與古柯鹼-安非他命調節轉錄本 (CART)。受瘦素 (Leptin) 與胰島素活化後，分泌 α-黑素細胞刺激素 (α-MSH)，結合至下視丘旁核 (PVN) 的黑素皮質素受體-4 (MC4R)，發出強烈飽足信號並增加能量消耗。\n2. 促食油門神經元：神經胜肽 Y (NPY) 與刺鼠相關胜肽 (AgRP)。受胃飢餓素 (Ghrelin) 刺激後活化，AgRP 作為 MC4R 的強效反向促效劑，直接拔除飽足煞車，驅使狂暴進食並降低基礎代謝。',
    clinical_relevance_zh:
      '基因缺失（如 MC4R 基因突變、POMC 缺乏）會引發極度早發性嚴重病態肥胖。現代抗肥胖藥物（如 Contrave 康纖芙、GLP-1 促效劑）核心靶點皆在於調控此神經迴路。',
    common_misconception_zh:
      '誤以為吃不飽純粹是「沒有意志力」。其實是下視丘 NPY/AgRP 促食神經元正在大腦後台以強大生化訊號尖叫逼迫個體覓食。',
    molecular_targets: ['POMC', 'CART', 'α-MSH', 'MC4R', 'NPY', 'AgRP', 'Ghrelin-R (GHSR)'],
  },
  {
    id: 'OM-04',
    title_zh: '瘦素抗性 (Leptin Resistance)：體重越重，大腦為何越以為在挨餓？',
    title_en: 'Leptin Resistance: Why Higher Adiposity Blinds Hypothalamic Satiety',
    badge: '荷爾蒙抗性',
    lead_reviewer_id: 'EC-31',
    evidence_grade: 'A',
    one_liner: '血液中的瘦素早已超標百倍，但下視丘大門關閉，大腦誤判身體處於極端飢荒狀態。',
    physiological_mechanism_zh:
      '瘦素 (Leptin) 由脂肪細胞合成釋放，正常情況下血中濃度與體脂總量成正比，告知下視丘「燃料庫存充足，可以停止進食」。然而在長期高脂肪、高精緻糖與肥胖狀態下，引發兩種瘦素抗性機轉：\n1. 血腦屏障 (BBB) 轉運飽和：血液中過高濃度的三酸甘油酯與瘦素分子，使 BBB 上的飽和轉運蛋白 LepRb 受阻，進入下視丘實質細胞的瘦素反而降低。\n2. 細胞內受體後信號衰竭：下視丘細胞內過度活化 SOCS3 (細胞激素信號抑制物-3) 與 PTP1B (蛋白酪胺酸磷酸酶 1B)，使 Jak2/Stat3 磷酸化信號通路被強行關閉。\n結果：下視丘處於「感知性飢餓」狀態，誤以為體內沒有脂肪儲備，持續下達儲備脂肪與狂食指令。',
    clinical_relevance_zh:
      '這解釋了為什麼單純給予肥胖患者補充外源性瘦素注射完全無效（除非是極罕見的先天性瘦素基因缺失）。要逆轉瘦素抗性，必須先降低下視丘神經發炎與三酸甘油酯濃度。',
    common_misconception_zh:
      '以為胖子體內沒有瘦素。真相是胖子體內瘦素濃度是正常人的數十倍，是大腦對瘦素「充耳不聞」。',
    molecular_targets: ['LepRb', 'Jak2-Stat3', 'SOCS3', 'PTP1B', 'Hypothalamic ER Stress'],
  },
  {
    id: 'OM-05',
    title_zh: '代謝適應 (Adaptive Thermogenesis) 與體重設定點理論 (Set-Point Theory)',
    title_en: 'Adaptive Thermogenesis & Set-Point Defense Mechanisms',
    badge: '能量守恆與反彈',
    lead_reviewer_id: 'EC-33',
    evidence_grade: 'A',
    one_liner: '體重下降 10%，身體基礎代謝會主動崩跌 15-25%，胃飢餓素狂飆，拼命將你拉回原體重。',
    physiological_mechanism_zh:
      '人體歷經數百萬年演化，天生具備極為嚴密的抗挨餓機制（設定點 Set-Point 或漸進滑動點 Settling-Point）。當熱量赤字導致體重下降時，身體不會乖乖照熱量公式等比例燃燒，而是啟動「代謝適應 (Adaptive Thermogenesis)」：\n1. 基礎代謝率 (BMR) 代償性暴跌：除了失去組織本身的能量消耗外，粒線體偶聯蛋白 (UCP-1/UCP-3) 表現下調，肌肉收縮能效異常提升（每走一步路消耗更少熱量），BMR 往往比預期公式多下滑 150~300 kcal/天。\n2. 神經內分泌飢餓反撲：瘦素驟降 50-80%，胃飢餓素 (Ghrelin) 反彈升高達數倍，甲狀腺素 T3 轉化受阻 (rT3 升高)，交感神經張力受抑。\n這兩種力量形成強大拉力，直到個體攝取熱量將脂肪填回原設定點為止。',
    clinical_relevance_zh:
      '這就是著名的美國真人秀《超級減肥王》(The Biggest Loser) 長期追蹤研究（NIH Kevin Hall 團隊）的殘酷真相：受試者 6 年後代謝率平均仍比正常低 500 kcal/天，且絕大多數完全復胖。唯有循序漸進、配合高蛋白抗阻力重訓、或藉由藥物重設下視丘設定點，才能突破防線。',
    common_misconception_zh:
      '以為體重反彈是因為「意志力薄弱又放縱」。這是全身神經內分泌在絕望抵抗飢餓的強大生理自救反應。',
    molecular_targets: ['Adaptive Thermogenesis Index', 'Active T3 vs rT3', 'UCP-1/3', 'Ghrelin-Lep Ratio'],
  },
  {
    id: 'OM-06',
    title_zh: '腸腦軸線與飢餓荷爾蒙：Ghrelin 反彈、GLP-1、GIP 與 PYY 的餐後動態',
    title_en: 'Gut-Brain Incretin Axis: Postprandial Dynamics of Ghrelin, GLP-1, GIP & PYY',
    badge: '腸道內分泌',
    lead_reviewer_id: 'EC-29',
    evidence_grade: 'A',
    one_liner: '腸道是全身最大的內分泌工廠，食物抵達迴腸激發的信號，是中樞飽足感的關鍵。',
    physiological_mechanism_zh:
      '消化道在食物攝入後產生精密的荷爾蒙交響樂：\n- 胃底部內分泌細胞：在空腹時分泌「胃飢餓素 (Ghrelin)」，經血流刺激下視丘 ARC 的 NPY/AgRP 神經元引發覓食慾望；進食後胃壁機械擴張，Ghrelin 迅速受抑。\n- 遠端迴腸與結腸 L 細胞：感知食糜中的脂肪酸、胺基酸與胜肽，分泌「類升糖素胜肽-1 (GLP-1)」與「胜肽 YY (PYY)」。GLP-1 活化迷走神經求心纖維，傳導至孤立束核 (NTS) 與下視丘，延遲胃排空 (Gastric Emptying Delay)，並刺激胰島素合成；PYY 強烈抑制 NPY 分泌。\n- 十二指腸與空腸 K 細胞：分泌「葡萄糖依賴性促胰島素多肽 (GIP)」，協同調節胰島素敏感性與脂肪組織脂質沉積。',
    clinical_relevance_zh:
      '減重手術（如胃繞道）之所以能瞬間治癒第 2 型糖尿病並完全逆轉暴食，並非單純「胃變小」，而是因為食糜直接傾倒至遠端迴腸，引發超生理劑量的內源性 GLP-1 與 PYY 爆發性分泌。現代 GLP-1/GIP 雙重促效劑藥物即是模擬此腸道超強飽足機制。',
    common_misconception_zh:
      '以為吃飽的感覺純粹是「胃被食物撐大」。胃擴張只是機械刺激，真正讓你心滿意足放下筷子的是遠端腸道分泌的 GLP-1/PYY 化學信號。',
    molecular_targets: ['GLP-1R', 'GIPR', 'NPY2R (PYY Receptor)', 'GHSR-1a', 'Vagal Afferent Nerve'],
  },
];

/**
 * 現代抗肥胖藥物深度臨床醫學評估（依 RCT 與各國藥監局核准資料庫）
 */
export const OBESITY_DRUGS: ObesityDrugReview[] = [
  {
    id: 'DRUG-01',
    generic_name_zh: '塞馬魯肽 (Semaglutide 2.4mg)',
    generic_name_en: 'Semaglutide 2.4 mg',
    brand_names: ['Wegovy (減重適應症)', 'Ozempic (糖尿病適應症)'],
    drug_class: '長效升糖素胜肽-1 受體促效劑 (GLP-1 Receptor Agonist)',
    target_receptors: ['GLP-1 Receptor (Hypothalamus ARC & Area Postrema)', 'Vagal Afferents', 'Pancreatic β-cells'],
    administration: '每週一次皮下注射 (從 0.25mg 逐步滴定至 2.4mg 維持劑量)',
    typical_dose: '2.4 mg / 每週',
    mechanism_detail_zh:
      '具備 94% 與人體內源性 GLP-1 相同結構，透過第 26 位離胺酸連接 C18 二羧酸脂肪酸鏈，強效結合白蛋白使半衰期延長至 1 週。透過第四腦室後極區 (AP) 及下視丘弓狀核 (ARC) 直接穿透血腦屏障受體，抑制食慾與獎勵渴望；周邊延緩胃排空速率達 30-40%，大幅延長飽足持續時間。',
    primary_trial_name: 'STEP-1 (Semaglutide Treatment Effect in People with obesity)',
    primary_trial_duration: '68 週 (1,961 位受試者，隨機雙盲對照)',
    avg_weight_loss_pct: 14.9,
    placebo_weight_loss_pct: 2.4,
    trial_citation: 'Wilding JPH, et al. N Engl J Med. 2021;384(11):989-1002.',
    fda_approval_year: 2021,
    tfda_approved: true,
    tfda_status_note: '台灣 TFDA 已正式核准 Wegovy 用於成人與 12 歲以上青少年慢性體重管理處方。',
    evidence_grade: 'A',
    cardiovascular_benefit_zh:
      'SELECT 三期臨床試驗（17,604 人）證實：在已有心血管疾病之超重/肥胖非糖尿病患者中，顯著降低 20% 主要不良心血管事件 (MACE：心血管死亡、非致命心肌梗塞或中風)。',
    common_adverse_effects: [
      '噁心感 (Nausea, 44%)，常發生於劑量遞增期',
      '腹瀉 (Diarrhea, 31%) 或 便秘 (Constipation, 23%)',
      '嘔吐 (Vomiting, 24%)',
      '胃食道逆流、脹氣與噯氣 (Belching, 硫磺味打嗝)',
      '注射部位局部輕微紅斑與搔癢',
    ],
    serious_warnings: [
      '急性胰臟炎 (Acute Pancreatitis) 罕見風險，出現持續劇烈上腹痛向後背放射應立即停藥送醫',
      '急性膽囊炎與膽結石 (急劇減重引發膽汁膽固醇過飽和)',
      '胃輕癱 (Gastroparesis) 與麻醉誤吸風險 (手術前需按醫學會指引停藥 1-2 週)',
      '精神心理監測：極罕見自殺意念或抑鬱惡化監測',
    ],
    contraindications: [
      '個人或家族有甲狀腺髓質癌 (MTC) 病史者嚴格禁忌',
      '第 2 型多發性內分泌腫瘤症候群 (MEN 2) 患者嚴格禁忌',
      '懷孕、哺乳期或近期計畫懷孕女性（需停藥至少 2 個月）',
      '重度發炎性腸道疾病 (IBD) 或嚴重胃輕癱病史者不建議使用',
    ],
    muscle_loss_mitigation_zh:
      'DEXA 次級分析顯示：體重減輕中約有 20-35% 為去脂體重 (Lean Body Mass, 含骨骼肌)。若無配套處方，易誘發「肌少症肥胖」。臨床對策：每日強制補足優質蛋白質 1.6~2.0 g/kg，並每週強制執行至少 2~3 次全身大肌群漸進式阻抗重訓。',
    cessation_rebound_data_zh:
      'STEP-1 延伸研究 (Extension Trial)：受試者在第 68 週停用 Semaglutide 後追蹤 1 年，平均反彈回失去體重的 66% (約 2/3)，心血管與代謝指標同步部分退化。臨床定性：肥胖是慢性神經內分泌疾病，停藥後下視丘飢餓迴路會強烈反撲，需擬定終身維持協議或漸進微劑量階梯維持。',
    approx_monthly_cost_twd: '約 NT$ 8,000 ~ 13,000 / 月 (自費處方，依劑量而異)',
    expert_review_summary:
      '減重藥物史上的里程碑級突破，減重幅度首次站上 15% 門檻，且 SELECT 試驗賦予強大心血管保護光環。但醫師必須警惕患者「只打針不重訓」導致的骨骼肌崩潰，以及停藥後的復胖防守計畫。',
    lead_reviewer_id: 'EC-28',
  },
  {
    id: 'DRUG-02',
    generic_name_zh: '替爾泊肽 (Tirzepatide 15mg)',
    generic_name_en: 'Tirzepatide 15 mg',
    brand_names: ['Zepbound (肥胖適應症)', 'Mounjaro (糖尿病適應症)'],
    drug_class: 'GIP / GLP-1 雙重受體促效劑 (Dual Incretin Agonist / Twincretin)',
    target_receptors: ['GIP Receptor (Adipocytes, CNS)', 'GLP-1 Receptor (Brainstem, Hypothalamus, Pancreas)'],
    administration: '每週一次皮下注射 (由 2.5mg 起步，每 4 週階梯式遞增至 10mg 或 15mg)',
    typical_dose: '10 mg ~ 15 mg / 每週',
    mechanism_detail_zh:
      '全球首創雙重腸泌素胜肽。由 39 個胺基酸組成，具備 GIP 受體完全促效與 GLP-1 受體偏向促效活性。GIP 受體活化能顯著增強白色脂肪組織血流、提升三酸甘油酯清除緩衝力、改善胰島素敏感性並緩解周邊脂毒性；同時在中樞與 GLP-1 協同產生加乘的食慾壓制效應，耐受度較純超高劑量 GLP-1 更佳。',
    primary_trial_name: 'SURMOUNT-1 (Tirzepatide Once Weekly for the Treatment of Obesity)',
    primary_trial_duration: '72 週 (2,539 位無第 2 型糖尿病之超重/肥胖受試者)',
    avg_weight_loss_pct: 20.9,
    placebo_weight_loss_pct: 3.1,
    trial_citation: 'Jastreboff AM, et al. N Engl J Med. 2022;387(3):205-216.',
    fda_approval_year: 2023,
    tfda_approved: true,
    tfda_status_note: '台灣 TFDA 已核准 Mounjaro 用於糖尿病與體重管理適應症。',
    evidence_grade: 'A',
    cardiovascular_benefit_zh:
      'SURMOUNT 試驗顯示顯著降低收縮壓 (-8.4 mmHg)、空腹三酸甘油酯降幅達 31%、空腹胰島素降低 47%，超過 95% 原前期糖尿病受試者回復為正常血糖。心血管硬終點試驗 SURPASS-CVO 與 SURMOUNT-MMO 進行中。',
    common_adverse_effects: [
      '噁心感 (Nausea, 25-33%，通常隨耐受遞減)',
      '腹瀉 (Diarrhea, 19-23%)',
      '便秘 (Constipation, 11-17%)',
      '食慾極度低下導致的早期頭痛與無力',
      '腹痛、消化不良、脹氣',
    ],
    serious_warnings: [
      '胰臟炎風險警示',
      '膽囊相關疾病（膽囊炎、膽石症發生率約 1.5-2.0%）',
      '脫水與急性腎損傷（嚴重腸胃嘔吐腹瀉未能補足水分電解質）',
      '口服避孕藥吸收減弱警訊（胃排空延遲影響吸收，建議換藥期加用物理避孕）',
    ],
    contraindications: [
      '甲狀腺髓質癌 (MTC) 個人或家族病史',
      '多發性內分泌腫瘤第 2 型 (MEN 2)',
      '已知對 Tirzepatide 任一賦形劑過敏者',
      '懷孕與哺乳期婦女',
    ],
    muscle_loss_mitigation_zh:
      '因平均減重幅度突破 20%（接近減重手術量級），去脂體重絕對流失量客觀增加。MRI 與 DEXA 亞群試驗顯示：體組成改善中，內臟脂肪比例大幅驟減 40%+，骨骼肌比例相對提高；但仍需嚴密監控長者肌力，建議每日 1.8 g/kg 蛋白質與漸進超負荷阻抗訓練。',
    cessation_rebound_data_zh:
      'SURMOUNT-4 試驗專門探討維持性：前 36 週使用 Tirzepatide 平均減重 20.9% 後，隨機雙盲分組為「繼續使用」vs「換回安慰劑」。換回安慰劑組在後續 52 週內反彈了 14% 體重；而持續使用組進一步再減 5.5%（總減重達 25.3%）。證實肥胖需長期藥物管理。',
    approx_monthly_cost_twd: '約 NT$ 10,000 ~ 16,000 / 月 (自費處方)',
    expert_review_summary:
      '目前臨床核准減重藥物的最高天花板，平均減重破 20% 直逼胃繞道手術，且超過三分之一患者達成減重 ≥25%。GIP 協同機制使其在脂肪重分佈與代謝改善上具備劃時代優勢。',
    lead_reviewer_id: 'EC-28',
  },
  {
    id: 'DRUG-03',
    generic_name_zh: '瑞他魯肽 (Retatrutide，前瞻三重促效劑)',
    generic_name_en: 'Retatrutide (Triple Hormone Receptor Agonist)',
    brand_names: ['研發代號: LY3437943 (Phase 3 進行中)'],
    drug_class: 'GIP / GLP-1 / 升糖素 (Glucagon) 三重受體促效劑 (Triple Agonist)',
    target_receptors: ['GIP Receptor', 'GLP-1 Receptor', 'Glucagon Receptor (Liver, Adipose)'],
    administration: '每週一次皮下注射 (臨床試驗劑量 1mg ~ 12mg)',
    typical_dose: '8 mg ~ 12 mg / 每週 (研發中)',
    mechanism_detail_zh:
      '新一代單一胜肽三重受體促效劑。在 GIP/GLP-1 抑制食慾與改善糖代謝的基礎上，關鍵性引入「升糖素 (Glucagon) 受體促效」：升糖素直接活化肝臟粒線體生能、驅動肝臟脂肪酸 β-氧化並顯著增加全身體溫與靜態能量消耗 (Energy Expenditure)，達成雙向「壓低攝入 + 提高消耗」。',
    primary_trial_name: 'Phase 2 Retatrutide Obesity Trial',
    primary_trial_duration: '48 週 (338 位成人受試者)',
    avg_weight_loss_pct: 24.2,
    placebo_weight_loss_pct: 2.1,
    trial_citation: 'Jastreboff AM, et al. N Engl J Med. 2023;389(6):514-526.',
    fda_approval_year: 2027,
    tfda_approved: false,
    tfda_status_note: '全球進行 Phase 3 試驗中（TRIUMPH 系列試驗），尚未取得上市許可。',
    evidence_grade: 'B',
    cardiovascular_benefit_zh:
      '二期試驗數據：12mg 組高達 100% 受試者達成減重 ≥5%，超過 25% 受試者減重 ≥30%！更震撼的是，伴有脂肪肝的受試者在 48 週時，肝臟脂肪含量平均下降超過 80%，近 9 成患者脂肪肝完全緩解。',
    common_adverse_effects: [
      '腸胃道不適（噁心、腹瀉、便秘，多為輕中度）',
      '心率增加 (Heart Rate Increase, 平均增加 5-9 bpm，升糖素擬交感效應，需長期安全性驗證)',
      '嘔吐、皮膚感覺異常 (Hyperesthesia)',
    ],
    serious_warnings: [
      '升糖素受體活化對心肌傳導系統與心律不整之長期監測（Phase 3 核心觀察點）',
      '急劇體重下滑導致的骨質密度與肌肉質量流失',
    ],
    contraindications: [
      'MEN 2 與 MTC 病史（同類藥物同等警告）',
      '嚴重充血性心臟衰竭或嚴重心律不整患者禁用',
    ],
    muscle_loss_mitigation_zh:
      '減重幅度高達 24% 以上，相當於一個 100kg 患者甩掉 24kg 體重。肌肉質量流失防禦成為該藥物臨床應用的最高優先級課題，未來可能需併用促肌生長抑制素 (Myostatin) 阻斷劑。',
    cessation_rebound_data_zh: '尚待 Phase 3 與停藥追蹤數據，預期依舊遵循慢性疾病神經內分泌反彈規律。',
    approx_monthly_cost_twd: '尚在臨床試驗階段，上市後預估與雙重促效劑同級。',
    expert_review_summary:
      '醫學界公認的「非手術減重核彈」，減重幅度首度完全追平胃繞道手術（平均 24.2%）。升糖素直接燃燒肝臟脂肪與提升能量消耗的機轉，徹底顛覆過去「只能靠壓制胃口」的舊思維。',
    lead_reviewer_id: 'EC-28',
  },
  {
    id: 'DRUG-04',
    generic_name_zh: '奧利司他 (Orlistat 120mg)',
    generic_name_en: 'Orlistat 120 mg',
    brand_names: ['Xenical (羅氏鮮 120mg 處方)', 'Alli (60mg OTC)'],
    drug_class: '胃與胰脂肪酶抑制劑 (Gastrointestinal Lipase Inhibitor)',
    target_receptors: ['Gastric Lipase', 'Pancreatic Lipase (Active Serine Site)'],
    administration: '隨三餐含脂肪主食時口服 120 mg (每日 3 次)',
    typical_dose: '120 mg tid (三餐隨餐)',
    mechanism_detail_zh:
      '在胃腔和小腸腔內與胃脂肪酶和胰脂肪酶的活性絲胺酸部位形成共價鍵，使脂肪酶去活化。無法水解食物中的三酸甘油酯為可吸收之游離脂肪酸與單酸甘油酯，從而阻斷食物中約 30% 脂肪的消化吸收，未吸收脂肪直接隨糞便排出體外。幾乎不被人體吸收進入血液（全身生物利用度 <1%）。',
    primary_trial_name: 'XENDOS (Xenical in the Prevention of Diabetes in Obese Subjects)',
    primary_trial_duration: '4 年隨機雙盲對照試驗 (3,305 人)',
    avg_weight_loss_pct: 5.8,
    placebo_weight_loss_pct: 3.0,
    trial_citation: 'Torgerson JS, et al. Diabetes Care. 2004;27(1):155-161.',
    fda_approval_year: 1999,
    tfda_approved: true,
    tfda_status_note: '台灣 TFDA 核准上市超過 20 年，為少數具備 OTC 低劑量規格之口服排油藥。',
    evidence_grade: 'B',
    cardiovascular_benefit_zh:
      'XENDOS 4 年試驗證實：相較於安慰劑組，顯著降低 37% 第 2 型糖尿病發病風險，總膽固醇與 LDL-C 輕度下降。',
    common_adverse_effects: [
      '油性排便 (Oily Evacuation, 油屁、滲油)',
      '急迫性排便失禁 (Fecal Urgency, 弄髒衣褲，患者社交災難)',
      '排氣增加伴隨油性分泌物 (Flatulence with Discharge)',
      '脂肪瀉 (Steatorrhea)',
      '腹痛與腸絞痛',
    ],
    serious_warnings: [
      '脂溶性維生素 (A, D, E, K) 與 β-胡蘿蔔素吸收嚴重障礙，必須於睡前或服藥間隔 2 小時外額外補充足量綜合維生素',
      '草酸鈣腎結石風險（腸道未吸收脂肪酸與鈣結合，游離草酸吸收激增引發高草酸尿症）',
      '罕見嚴重肝損傷通報（FDA 加註警語）',
    ],
    contraindications: [
      '慢性吸收不良症候群 (Chronic Malabsorption Syndrome)',
      '膽汁鬱積 (Cholestasis)',
      '懷孕與哺乳期婦女',
      '正在服用環孢素 (Cyclosporine) 或抗凝血劑 Warfarin 者需密切監控',
    ],
    muscle_loss_mitigation_zh: '由於總減重幅度僅約 3-5 kg，去脂體重流失相對較小，但需注意脂溶性維生素缺乏影響骨質健康。',
    cessation_rebound_data_zh: '一旦停藥且飲食中油脂未嚴格限制，體重於數月內迅速回彈。',
    approx_monthly_cost_twd: '約 NT$ 2,500 ~ 4,000 / 月',
    expert_review_summary:
      '屬於不經中樞神經的局部周邊排油藥，安全性相對高（無心血管與精神風險）。但其「油屁、排便失禁」等腸道副反應讓患者長期順應性極度低落，減重成效也無法與現代腸泌素新藥相提並論，臨床多作為特定外食聚餐避油輔助。',
    lead_reviewer_id: 'EC-05',
  },
  {
    id: 'DRUG-05',
    generic_name_zh: '安非他酮 / 納曲酮複方 (Bupropion / Naltrexone)',
    generic_name_en: 'Bupropion 90mg / Naltrexone 8mg ER',
    brand_names: ['Contrave (康纖芙 緩釋錠)'],
    drug_class: '多巴胺/去甲腎上腺素再吸收抑制劑 + 類鴉片受體拮抗劑複方',
    target_receptors: ['DAT / NET (Dopamine / Norepinephrine Transporter)', 'Mu-Opioid Receptor (MOR)'],
    administration: '口服緩釋錠 (每週逐週遞增：由每日 1 錠增加至早 2 錠、晚 2 錠維持)',
    typical_dose: 'Bupropion 360mg / Naltrexone 32mg (每日 4 錠)',
    mechanism_detail_zh:
      '巧妙結合兩種非傳統減重藥物：\n1. Bupropion 抑制下視丘與伏隔核的多巴胺與正腎上腺素再吸收，刺激 POMC 神經元釋放 α-MSH，壓低食慾；\n2. 然而 POMC 神經元同時會釋放 β-內啡肽形成自體負回饋抑制；此時 Naltrexone 作為類鴉片受體拮抗劑，及時阻斷此負回饋煞車，使 POMC 維持長時間高度激發狀態。\n同時直接作用於大腦邊緣獎勵中樞 (Reward System)，熄滅對高糖高脂垃圾食物的心因性渴望。',
    primary_trial_name: 'COR-I & COR-BMOD (Contrave Obesity Research)',
    primary_trial_duration: '56 週隨機雙盲對照試驗 (超過 4,500 人)',
    avg_weight_loss_pct: 6.1,
    placebo_weight_loss_pct: 1.3,
    trial_citation: 'Greenway FL, et al. Lancet. 2010;376(9741):595-605.',
    fda_approval_year: 2014,
    tfda_approved: true,
    tfda_status_note: '台灣 TFDA 已正式核准 Contrave 處方上市，需由專科醫師評估開立。',
    evidence_grade: 'A',
    cardiovascular_benefit_zh:
      '改善三酸甘油酯、HDL-C 與空腹胰島素敏感性。但因 Bupropion 具擬交感活性，可能引起心率輕微增加 (+1-2 bpm) 與血壓輕度波動，需定期量測。',
    common_adverse_effects: [
      '噁心 (Nausea, 最常見，約 32%)',
      '便秘 (Constipation, 19%)',
      '失眠 (Insomnia, 11%) 與多夢',
      '頭痛、眩暈',
      '口乾 (Dry Mouth)、焦慮煩躁',
    ],
    serious_warnings: [
      '癲癇發作 (Seizure) 警示（Bupropion 具劑量依賴性致痙攣閾值降低）',
      '黑框警語：抗憂鬱成分可能增加青少年與年輕成人之自殺意念風險',
      '血壓與脈搏升高，嚴格禁止高血壓未受控者服用',
      '急性青光眼發作風險',
    ],
    contraindications: [
      '未受控制的高血壓患者 (Uncontrolled Hypertension)',
      '癲癇病史或有癲癇誘發因素者（如暴食後催吐、頭部外傷）嚴格禁用',
      '神經性厭食症或暴食症現役患者禁用',
      '長期使用類鴉片止痛藥物者禁用（Naltrexone 會誘發急性戒斷症候群）',
      '正在戒斷酒精或鎮靜劑者禁用',
      '正在服用 MAOI 單胺氧化酶抑制劑者禁用',
    ],
    muscle_loss_mitigation_zh: '配合行為生活改變，肌肉流失率處於平均 20-25% 水平，建議搭配阻力運動。',
    cessation_rebound_data_zh: '停藥後中樞抑制多巴胺渴望消除，需仰賴已建立的行為認知飲食習慣防止反彈。',
    approx_monthly_cost_twd: '約 NT$ 4,000 ~ 6,500 / 月 (自費處方)',
    expert_review_summary:
      '對於「壓力大暴食、對特定甜點手搖飲有嚴重依賴、常深夜情緒性進食」的患者，Contrave 是目前針對大腦獎勵成癮迴路最具靶向性的口服藥。臨床使用需嚴密排查癲癇與高血壓禁忌。',
    lead_reviewer_id: 'EC-32',
  },
  {
    id: 'DRUG-06',
    generic_name_zh: '芬特明 / 托吡酯複方 (Phentermine / Topiramate ER)',
    generic_name_en: 'Phentermine / Topiramate ER',
    brand_names: ['Qsymia (全美最高減重幅度口服複方)'],
    drug_class: '擬交感神經刺激劑 + 胺基酸/GABA 受體調控劑複方',
    target_receptors: ['Trace Amine-Associated Receptor 1 (TAAR1)', 'GABA-A Receptors', 'AMPA/Kainate Receptors'],
    administration: '每日早晨口服一次緩釋膠囊 (避免夜間失眠)',
    typical_dose: '7.5mg/46mg (中劑量) 或 15mg/92mg (最高劑量)',
    mechanism_detail_zh:
      '雙機制協同：\n1. Phentermine 促進下視丘神經元突觸間隙釋放去甲腎上腺素與多巴胺，模擬交感神經「戰或逃」反應，極速關閉食慾中樞；\n2. Topiramate 原為神經科抗癲癇偏頭痛藥，透過增強 GABA 抑制神經傳導並阻斷碳酸酐酶，改變食物味覺感知（使碳酸飲料與甜食變得索然無味），顯著減少熱量攝取。',
    primary_trial_name: 'CONQUER & EQUIP Trials',
    primary_trial_duration: '56 週隨機雙盲對照 (2,487 人)',
    avg_weight_loss_pct: 8.6,
    placebo_weight_loss_pct: 1.6,
    trial_citation: 'Gadde KM, et al. Lancet. 2011;377(9774):1341-1352.',
    fda_approval_year: 2012,
    tfda_approved: false,
    tfda_status_note: '因管制藥品法規與心血管考量，台灣 TFDA 尚未核准該複方進口上市。',
    evidence_grade: 'A',
    cardiovascular_benefit_zh: '血壓平均下降 3-5 mmHg，三酸甘油酯顯著下降，但需密切監控靜態心率（可能上升 1-3 bpm）。',
    common_adverse_effects: [
      '感覺異常 (Paresthesia, 臉部與手腳肢端刺痛麻木感，約 20%)',
      '口乾 (Dry Mouth, 19%)',
      '便秘 (Constipation, 16%)',
      '失眠 (Insomnia) 與煩躁不安',
      '味覺障礙 (Dysgeusia, 特別是對碳酸飲料產生苦味)',
      '注意力不集中、思考遲緩 (Cognitive slowing / 腦霧感)',
    ],
    serious_warnings: [
      '極高度致畸胎性 (Teratogenicity)：孕婦服用導致胎兒唇裂或顎裂 (Oral Clefts) 風險增加數倍！美國 FDA 實施嚴格 REMS 避孕計畫，育齡婦女每月需驗孕',
      '心悸與心動過速',
      '抑鬱情緒與焦慮惡化',
      '代謝性酸中毒與腎結石 (Topiramate 抑制碳酸酐酶導致)',
      '青光眼 (閉角型青光眼急症)',
    ],
    contraindications: [
      '懷孕中女性（X 級絕對致畸胎禁忌）',
      '青光眼患者',
      '甲狀腺機能亢進 (Hyperthyroidism)',
      '正在服用 MAOIs 或停藥未滿 14 天者',
      '嚴重心血管疾病或不穩定心絞痛',
    ],
    muscle_loss_mitigation_zh: '減重約 10%，去脂體重維持需常規搭配肌力抗阻訓練與蛋白質補充。',
    cessation_rebound_data_zh: '停藥後交感神經刺激消失，食慾迅速恢復，易出現反彈。',
    approx_monthly_cost_twd: '國外約 $120 ~ $180 USD/月 (台灣無許可)',
    expert_review_summary:
      '口服藥中減重幅度最強悍的選手（~10%）。但其致畸胎性、神經認知遲緩（腦霧感）與心血管交感興奮副反應，使其監管非常嚴苛。在台灣目前無藥證，不可非法代購以免觸法受害。',
    lead_reviewer_id: 'EC-01',
  },
];

/**
 * 8 大代表性減重飲食法橫向醫學雷達評比與生化機制
 */
export const DIET_REGIMENS: DietRegimenEvaluation[] = [
  {
    id: 'DIET-01',
    name_zh: '生酮與極低碳水化合物飲食 (Ketogenic / VLCKD)',
    name_en: 'Very Low-Carbohydrate Ketogenic Diet (VLCKD)',
    alias: '生酮飲食、極低碳飲食',
    macro_distribution: {
      carbs_pct: '< 5% ~ 10% (通常 < 20~50g / 天)',
      protein_pct: '20% ~ 25% (適度蛋白質避免糖質新生過度)',
      fat_pct: '70% ~ 80% (高脂肪攝入提供酮體基質)',
    },
    evidence_grade: 'B',
    radar_scores: {
      weight_loss_speed: 9,
      muscle_preservation: 6,
      cardio_metabolic: 4,
      adherence_feasibility: 4,
      micronutrient_safety: 5,
    },
    biochemical_mechanism_zh:
      '大幅限制碳水化合物，使肝臟肝醣在 24-48 小時內完全耗竭。體內胰島素水準崩跌、升糖素激增，脂肪組織大規模動員脂解釋放游離脂肪酸。肝臟粒線體內草醯乙酸不足以處理巨量乙醯輔酶 A (Acetyl-CoA)，多餘乙醯基分流進入生酮途徑，合成乙醯乙酸與 β-羥基丁酸 (β-HB)。大腦與骨骼肌以酮體取代葡萄糖作為主燃料。β-HB 本身能直接作用於下視丘抑制食慾。',
    clinical_benefits: [
      '前 2-4 週體重急劇下降（伴隨大量肝醣結合水排出與水腫消退）',
      '強烈壓抑飢餓感，顯著減少進食頻率與對精緻糖的狂熱渴求',
      '大幅降低第 2 型糖尿病患者之餐後血糖峰值與糖化血色素 (HbA1c)',
      '顯著降低空腹三酸甘油酯 (TG) 並提升高密度脂蛋白 (HDL-C)',
    ],
    risks_and_pitfalls: [
      '「瘦體質高反應者 (LMHR)」陷阱：約 15-30% 個體 LDL-C 與 ApoB 出現病態級暴增（LDL-C 甚至飆破 200-300 mg/dL），嚴重加速心血管動脈粥狀硬化斑塊進展',
      '初期「生酮流感 (Keto Flu)」：因胰島素降低促使腎臟大量排鈉排水平衡失調，引發嚴重頭痛、心悸、抽筋與疲倦',
      '微量營養素與腸道菌相匱乏：缺乏水溶性膳食纖維導致嚴重便秘，短鏈脂肪酸 (SCFA) 生成崩跌',
      '中長天期 (12-24 個月) 臨床 RCT 薈萃顯示：減重總量與等熱量均衡限制飲食無統計差異，復胖率高',
    ],
    suitable_populations: ['頑固型難治第 2 型糖尿病合併嚴重胰島素抗性', '多囊性卵巢 (PCOS) 肥胖患者短期調整', '神經科特定癲癇輔助'],
    contraindicated_populations: ['家族性高膽固醇血症或已有冠心病 ASCVD 者', '第 1 型糖尿病 (酮酸中毒 DKA 致命風險)', '胰臟炎病史', '重度肝腎功能衰竭'],
    expert_verdict_zh:
      '【EC-03 心臟科 & EC-29 營養師聯合共識】短期作為打破胰島素阻抗的有力衝刺工具可行，但切忌盲信「大口吃牛油肥肉能降膽固醇」的迷思！必須嚴密追蹤血脂 ApoB 與 LDL-P，若 LDL-C 飆升超過 baseline 30% 應立即停止。',
    lead_reviewer_id: 'EC-03',
  },
  {
    id: 'DIET-02',
    name_zh: '間歇性斷食 (Intermittent Fasting: 16/8 & 早段限時進食 eTRF)',
    name_en: 'Intermittent Fasting & Early Time-Restricted Feeding (eTRF)',
    alias: '168 斷食法、限時進食法 (TRF)、5:2 輕斷食',
    macro_distribution: {
      carbs_pct: '不限宏量比例 (通常 40-50%)',
      protein_pct: '20% ~ 25% (強調進食窗口內足量)',
      fat_pct: '30% ~ 35%',
    },
    evidence_grade: 'A',
    radar_scores: {
      weight_loss_speed: 7,
      muscle_preservation: 6,
      cardio_metabolic: 8,
      adherence_feasibility: 8,
      micronutrient_safety: 7,
    },
    biochemical_mechanism_zh:
      '透過延長空腹時間（16 小時以上），誘發人體「代謝切換 (Metabolic Switching)」：自肝醣消耗模式切換為脂肪酸動員氧化模式。空腹 14-16 小時後，肝臟激酶 AMPK 活化、mTOR 受抑，細胞啟動「自噬作用 (Autophagy)」清除老舊損傷胞器。早段限時進食 (Early TRF, 如 08:00-16:00) 進一步與下視丘晝夜節律生物鐘完全同步，利用早晨胰島素敏感度最高的生理優勢代謝熱量，避免夜間褪黑激素分泌期胰島素抗性加劇。',
    clinical_benefits: [
      '大幅降低日常無意識的夜間零食熱量攝入（通常自然減少 300-500 kcal/天）',
      '早段 eTRF 臨床試驗 (Cell Metabolism 2018) 證實：在未減重前提下，顯著改善全身胰島素敏感性、β 細胞反應性並降低夜間血壓',
      '規則簡單明瞭，極容易轉化為個人化長期作息習慣',
    ],
    risks_and_pitfalls: [
      '晚段進食陷阱：許多人執行「不吃早餐，只吃午晚餐與宵夜 (12:00-20:00)」，但夜間進食在晝夜節律中反而降低葡萄糖耐受度',
      '補償性暴食：解禁開窗時因報復心理狂吃高糖高油外賣，熱量反超標',
      '老年人與肌少症風險：進食窗口壓縮使每日 3-4 次肌蛋白合成 (MPS) 峰值難以激發，長者去脂體重流失顯著',
    ],
    suitable_populations: ['生活節奏緊湊無法繁瑣計算食物克數者', '輕中度脂肪肝與胰島素阻抗者', '常有夜間吃宵夜壞習慣者'],
    contraindicated_populations: ['暴食症或進食障礙 (ED) 既往病史者', '孕婦及發育期青少年', '第 1 型糖尿病患者', '正在服用促胰島素分泌劑易低血糖者'],
    expert_verdict_zh:
      '【EC-29 營養師審定】16/8 的核心科學本質是「自然熱量赤字 + 終結宵夜」。強烈建議將進食窗口向前推移（早晨至傍晚），並在 8 小時窗口內安排至少兩頓包含 30g+ 蛋白質的正餐，守護肌肉質量。',
    lead_reviewer_id: 'EC-29',
  },
  {
    id: 'DIET-03',
    name_zh: '高蛋白飲食與蛋白質節省禁食法 (High-Protein / PSMF)',
    name_en: 'High-Protein Diet & Protein-Sparing Modified Fast (PSMF)',
    alias: '高蛋白增肌減脂法、PSMF 醫療協定',
    macro_distribution: {
      carbs_pct: '10% ~ 20% (極低精緻糖，主要來自綠色葉菜)',
      protein_pct: '35% ~ 50% (1.6 ~ 2.2 g/kg 理想體重)',
      fat_pct: '20% ~ 30% (僅保留必需脂肪酸)',
    },
    evidence_grade: 'A',
    radar_scores: {
      weight_loss_speed: 8,
      muscle_preservation: 10,
      cardio_metabolic: 8,
      adherence_feasibility: 6,
      micronutrient_safety: 8,
    },
    biochemical_mechanism_zh:
      '具備雙重生化防禦：\n1. 超高食物熱效應 (TEF)：蛋白質的消化代謝需消耗攝入能量的 20-30%（碳水僅 5-10%，脂肪 0-3%），相當於每吃進 100 大卡純蛋白，身體自動燃燒掉 25 大卡進行代謝！\n2. 飢餓荷爾蒙調控：高濃度胜肽與游離白胺酸 (Leucine) 強烈刺激腸道 L 細胞釋放 GLP-1 與 PYY，同時對 Ghrelin 產生持久壓制。\n3. mTOR/肌蛋白合成 (MPS) 點火：高白胺酸濃度持續活化骨骼肌細胞的 mTORC1 通路，即使在全身熱量赤字下，依然能精準遏制泛素-蛋白酶體 (UPP) 對肌肉的分解水解。',
    clinical_benefits: [
      '所有減重策略中骨骼肌保留率最高（肌肉流失比率可從常規的 30% 壓低至 <10%）',
      '全天飽足感最持久，能有效抵擋下午茶與睡前飢餓感',
      '大幅維持基礎代謝率 (BMR)，顯著減輕代謝適應帶來的體重停滯期',
    ],
    risks_and_pitfalls: [
      '慢性腎臟病 (CKD 3b-5 期，eGFR < 45) 患者絕對禁忌，會加速腎絲球高過濾損傷',
      '若未搭配足量水分（每日需 2500-3000 mL），尿酸容易結晶誘發痛風發作',
      '若忽略高纖蔬菜攝入，易引起膳食纖維不足導致排便乾硬',
    ],
    suitable_populations: ['所有正在進行熱量赤字減重的健康成人', '合併使用 GLP-1 藥物防肌肉流失者', '肌少症肥胖患者', '健身愛好者'],
    contraindicated_populations: ['已有中重度慢性腎功能不全者 (CKD)', '洗腎前尿毒症期', '痛風急性發作期', '嚴重肝性腦病變'],
    expert_verdict_zh:
      '【EC-33 運動生理學家 & EC-13 腎臟專科】健康人群腎功能正常下，攝取 1.6-2.2 g/kg 蛋白質已被無數 RCT 證實對腎臟完全無害且對保護肌肉至關重要！它是對抗 GLP-1 瘦瘦針後「肌肉大流失」的唯一有效營養護盾。',
    lead_reviewer_id: 'EC-33',
  },
  {
    id: 'DIET-04',
    name_zh: '地中海飲食 (Mediterranean Diet)',
    name_en: 'Mediterranean Diet Pattern',
    alias: '心血管黃金飲食、長壽抗發炎飲食',
    macro_distribution: {
      carbs_pct: '45% ~ 50% (非精製全穀物、豆類、豐富蔬果)',
      protein_pct: '15% ~ 20% (魚類、海鮮、家禽、發酵乳品)',
      fat_pct: '35% ~ 40% (以特級初榨橄欖油 MUFA 與堅果為主)',
    },
    evidence_grade: 'A',
    radar_scores: {
      weight_loss_speed: 6,
      muscle_preservation: 8,
      cardio_metabolic: 10,
      adherence_feasibility: 9,
      micronutrient_safety: 10,
    },
    biochemical_mechanism_zh:
      '以特級初榨橄欖油 (EVOO) 的油酸 (Oleic Acid, C18:1 MUFA) 與橄欖多酚 (Oleocanthal, 羥基酪醇) 為核心，顯著降低血管內皮細胞黏附分子 (VCAM-1) 表現與 LDL 氧化 (Ox-LDL)。富含非精製複合碳水與可溶性纖維，在結腸被雙歧桿菌發酵生成高量短鏈脂肪酸（乙酸、丙酸、丁酸 SCFA），活化腸道受體 GPR41/43，增強腸黏膜屏障完整性，阻斷內毒素 (LPS) 入血引發的低度慢性代謝發炎。',
    clinical_benefits: [
      'PREDIMED 大型隨機對照試驗 (7,447 人) 證實：顯著降低 30% 心血管主要不良事件 (MACE)',
      '長期（5-10 年）體重反彈率全飲食流派中最低，終身維持體重的基石',
      '顯著改善脂肪肝嚴重度、降低認知功能退化與神經退化性疾病風險',
    ],
    risks_and_pitfalls: [
      '初學者容易誤判「橄欖油健康就可以無限量狂淋」，忽略油脂每克仍有 9 kcal 高能量密度，導致熱量超標體重停滯',
      '在亞洲外食環境下，純正特級初榨橄欖油取得成本較高',
    ],
    suitable_populations: ['所有希望終生可持續健康維持體重者', '三高與動脈硬化高風險族群', '脂肪肝與代謝症候群患者'],
    contraindicated_populations: ['無絕對禁忌，全年齡全病程皆高度推薦（普適性最高）'],
    expert_verdict_zh:
      '【EC-01 醫療總監評語】若只選一種飲食法作為人類此生終點的健康模式，那一定是地中海飲食。它不是短期脫水的速成魔法，而是保護心臟、血管、大腦與代謝微環境的終極保險。',
    lead_reviewer_id: 'EC-01',
  },
  {
    id: 'DIET-05',
    name_zh: '低碳高纖與碳水胰島素模型飲食 (Low-Carb High-Fiber / CIM)',
    name_en: 'Low-Carbohydrate High-Fiber & Carbohydrate-Insulin Model',
    alias: 'CIM 飲食、慢碳飲食、低 GI 高纖飲食',
    macro_distribution: {
      carbs_pct: '25% ~ 35% (嚴格限定為低升糖指數、高膳食纖維未精製碳水)',
      protein_pct: '25% ~ 30%',
      fat_pct: '35% ~ 45% (以不飽和脂肪為主)',
    },
    evidence_grade: 'A',
    radar_scores: {
      weight_loss_speed: 7,
      muscle_preservation: 8,
      cardio_metabolic: 9,
      adherence_feasibility: 8,
      micronutrient_safety: 9,
    },
    biochemical_mechanism_zh:
      '基於哈佛大學 David Ludwig 提出的「碳水化合物-胰島素模型 (CIM)」：肥胖的核心不僅是熱量過剩，而是高升糖精緻碳水引發過度胰島素分泌，驅使循環中的葡萄糖與游離脂肪酸強行鎖入脂肪細胞，使周邊組織陷入「代謝性飢餓」從而引發食慾暴增。此飲食徹底剷除精緻糖、精製白麵粉，代之以豆類、燕麥、糙米與全蔬菜，平抑餐後胰島素峰值，解除脂肪細胞的脂解封鎖，促使內源性脂肪順利釋出燃燒。',
    clinical_benefits: [
      '顯著平穩飯後血糖波幅，完全告別飯後昏昏欲睡 (Food Coma)',
      '特別適合伴有嚴重黑色棘皮症、重度脂肪肝與多囊性卵巢之頑固胰島素阻抗者',
      '大幅改善腸道菌群生態，排便順暢且血脂指標穩定',
    ],
    risks_and_pitfalls: [
      '市售偽健康食品陷阱：標榜「低 GI」但添加大量棕櫚油或麥芽糖醇的加工代餐',
      '需注意豆類與高纖蔬菜引起的脹氣適應期',
    ],
    suitable_populations: ['多囊性卵巢 (PCOS) 肥胖女性', '第 2 型糖尿病前期 (Prediabetes)', '嚴重飯後嗜睡族群'],
    contraindicated_populations: ['胃輕癱或消化性潰瘍急性期需適度調整粗纖維攝取'],
    expert_verdict_zh:
      '【EC-04 新陳代謝專家】在不走生酮極端的前提下，精準拿捏碳水品質，直接打擊胰島素阻抗發動機，兼具高度臨床安全性與長期可行性。',
    lead_reviewer_id: 'EC-04',
  },
  {
    id: 'DIET-06',
    name_zh: '極低熱量醫療代餐飲食 (VLCD / Optifast Protocol, < 800 kcal/d)',
    name_en: 'Very-Low-Calorie Diet (VLCD Protocol)',
    alias: 'DiRECT 糖尿病緩解配方、全營養醫療代餐',
    macro_distribution: {
      carbs_pct: '30% ~ 40% (強化複合維生素)',
      protein_pct: '40% ~ 50% (高生物價乳清/大豆分離蛋白)',
      fat_pct: '15% ~ 20% (僅滿足必需脂肪酸)',
    },
    evidence_grade: 'B',
    radar_scores: {
      weight_loss_speed: 10,
      muscle_preservation: 6,
      cardio_metabolic: 8,
      adherence_feasibility: 3,
      micronutrient_safety: 7,
    },
    biochemical_mechanism_zh:
      '每日嚴格限制總熱量於 600~800 kcal 之間，持續 8~12 週。身體陷入劇烈負能量平衡，逼迫內臟器官（肝臟、胰臟）在數週內清空「異位脂肪 (Ectopic Fat)」。英國權威 DiRECT 臨床試驗（Lancet 發表）證實：肝臟脂肪急降使肝臟對胰島素敏感度恢復；胰臟脂肪沉積消除使原本休眠的胰島 β 細胞去分化逆轉，重新恢復第一相胰島素分泌。',
    clinical_benefits: [
      'DiRECT 試驗震撼成效：2 年追蹤下，新診斷第 2 型糖尿病（<6年）患者達成高達 46% 疾病完全緩解（無需服用任何降糖藥且 HbA1c < 6.5%）',
      '大幅縮小重度肥胖患者術前肝臟體積，顯著降低減重手術難度與出血風險',
    ],
    risks_and_pitfalls: [
      '【嚴重安全紅旗】嚴格禁止民眾自行斷食嘗試！',
      '急性膽囊炎與膽結石：極速脂肪動員引發膽汁膽固醇劇烈過飽和（臨床常需預防性開立 Ursodeoxycholic acid 預防）',
      '痛風急性發作：酮體與尿酸競爭腎小管排泄通道，導致血尿酸劇升',
      '嚴重低血壓、站立性眩暈與電解質紊亂（心律不整猝死風險）',
      '退出後未遵循階梯復食協議（Food Reintroduction）必引發毀滅性復胖',
    ],
    suitable_populations: ['近期新診斷第 2 型糖尿病且 BMI > 27 者尋求完全緩解', '重度肥胖患者減重手術前之術前肝縮小處方'],
    contraindicated_populations: ['未經醫師與營養師嚴格監護者絕對禁止', '孕婦、兒童、長者', '心臟衰竭、重度腎病、膽結石現役者'],
    expert_verdict_zh:
      '【EC-01 醫療總監嚴肅聲明】這是一劑重型「醫療處方」，不是日常流行的瘦身飲食！必須每週監測血壓、電解質、腎功能與心電圖。切勿自行網購代餐盲目斷食。',
    lead_reviewer_id: 'EC-01',
  },
  {
    id: 'DIET-07',
    name_zh: '全食物全植物性飲食 (Whole Food Plant-Based / WFPB)',
    name_en: 'Whole Food Plant-Based Diet (Low-Fat Vegan)',
    alias: '全蔬食高纖飲食、低脂植物飲食',
    macro_distribution: {
      carbs_pct: '65% ~ 75% (以原態豆類、全穀、根莖、果實為主)',
      protein_pct: '12% ~ 15% (植物性蛋白質)',
      fat_pct: '10% ~ 15% (極低精煉油)',
    },
    evidence_grade: 'B',
    radar_scores: {
      weight_loss_speed: 6,
      muscle_preservation: 5,
      cardio_metabolic: 9,
      adherence_feasibility: 6,
      micronutrient_safety: 6,
    },
    biochemical_mechanism_zh:
      '利用極低的「食物熱量密度 (Caloric Density)」：全食物植物富含水分與龐大不溶性纖維，在極低熱量下即可填滿胃容積，觸發胃壁牽張受器經迷走神經傳導機械飽足信號。完全排除肉類飽和脂肪與膽固醇，上調肝臟 LDL 受體，大幅清除血中致動脈粥狀硬化脂蛋白。',
    clinical_benefits: [
      'LDL-C 通常在 4-8 週內下降 15-25%，心血管動脈硬化負擔顯著緩解',
      '胃腸道蠕動順暢，顯著改善全身腸道微生物群組多樣性',
    ],
    risks_and_pitfalls: [
      '容易落入「精緻純素垃圾食物陷阱」：炸地瓜條、精緻白麵包、含糖豆漿與素肉加工品，熱量反爆表',
      '維生素 B12 絕對缺乏（植物不含活性 B12，長期必引發神經病變與巨球性貧血，必須強制補充劑）',
      '非血紅素鐵 (Non-heme iron) 吸收率較低，易引發缺鐵性貧血',
      '蛋白質生物價 (BV) 與白胺酸偏低，老年族群容易肌少症',
    ],
    suitable_populations: ['重度高膽固醇血症患者', '環保與動物福利倡導者', '心血管二級預防者'],
    contraindicated_populations: ['嚴重蛋白質能量營養不良者', '晚期肌少症長者', '胃腸道重度發炎吸收不良者'],
    expert_verdict_zh:
      '【EC-29 營養師評析】如果能掌握「原態全穀雜糧 + 多元豆類蛋白 + 每日補充維生素 B12」，WFPB 在降血脂與降發炎上具備卓越表現。關鍵是杜絕超加工素肉。',
    lead_reviewer_id: 'EC-29',
  },
  {
    id: 'DIET-08',
    name_zh: '碳水化合物循環飲食法 (Carb Cycling)',
    name_en: 'Carbohydrate Cycling Protocol',
    alias: '高低碳循環法、運動營養週期化',
    macro_distribution: {
      carbs_pct: '高碳日 50-60% / 低碳日 10-20% / 無碳日 <5%',
      protein_pct: '25% ~ 30% (恆定高蛋白)',
      fat_pct: '高碳日 15% / 低碳日 45-50% (反向互補)',
    },
    evidence_grade: 'B',
    radar_scores: {
      weight_loss_speed: 7,
      muscle_preservation: 9,
      cardio_metabolic: 7,
      adherence_feasibility: 6,
      micronutrient_safety: 8,
    },
    biochemical_mechanism_zh:
      '將飲食節奏與運動週期化完全結合：\n- 高碳日（高強度阻力重訓日）：補充高碳水激發胰島素高峰，迅速將葡萄糖與胺基酸送入耗竭的肌纖維，重填肌肝醣儲備，最大化刺激 mTOR 肌蛋白合成，阻斷皮質醇分解；\n- 低碳/無碳日（休息或 Zone 2 有氧日）：壓低碳水至最低限度，維持全天低胰島素狀態，逼迫骨骼肌粒線體動員脂肪酸氧化燃脂。\n達成「增肌與減脂在單週內交錯並存」的高階運動生理平衡。',
    clinical_benefits: [
      '長期熱量赤字下極佳維持運動運動表現與神經系統興奮性',
      '打破長期均勻節食帶來的瘦素持續低落與甲狀腺素下降',
      '兼具心理層面「每週有 1-2 天可以享受足量優質碳水」的心理喘息期',
    ],
    risks_and_pitfalls: [
      '計算繁瑣複雜：若生活不規律或運動訓練量不足，高碳日很容易淪為單純的熱量盈餘發胖日',
      '不適合完全無規律重訓習慣的普通久坐大眾',
    ],
    suitable_populations: ['規律進行每週 3-5 次高強度重訓者', '面臨減脂體重停滯期的中高階健身者', '運動員控體重期'],
    contraindicated_populations: ['嚴重糖尿病血糖波動不穩者', '無規律運動習慣之久坐肥胖者'],
    expert_verdict_zh:
      '【EC-33 運動生理學家評定】這是一套專為「運動戰士」設計的週期化工具。沒有相應的強度重訓消耗肝醣，高碳日就是單純的儲存脂肪。執行前請先檢視自己的訓練課表。',
    lead_reviewer_id: 'EC-33',
  },
];

/**
 * 減重與代謝手術 (Bariatric & Metabolic Surgery) 深度醫學指引
 */
export const BARIATRIC_SURGERIES: BariatricSurgeryOption[] = [
  {
    id: 'SURG-01',
    name_zh: '腹腔鏡袖狀胃切除術 (Sleeve Gastrectomy, LSG / 縮胃手術)',
    name_en: 'Laparoscopic Sleeve Gastrectomy',
    procedure_type: 'RESTRICTIVE',
    anatomical_mechanism_zh:
      '沿著胃小彎使用微創腹腔鏡切割縫合器，切除大約 75-80% 的胃大彎組織，將原本袋狀胃修剪為如同細長香蕉般的「袖狀管狀胃」（容積自 1000-1500 mL 驟減至 100-150 mL）。',
    neuroendocrine_impact_zh:
      '不僅是物理容積限制！切除的胃大彎底部正是人體合成「胃飢餓素 (Ghrelin)」的大本營。術後血中 Ghrelin 濃度在 24 小時內出現斷崖式暴跌，患者術後數月內幾乎「完全失去飢餓慾望」。同時胃排空加快，促進遠端腸道 GLP-1 早期分泌。',
    avg_excess_weight_loss_pct: '60% ~ 70% 超額體重流失 (EWL)',
    t2d_remission_rate_pct: '60% ~ 70% 第 2 型糖尿病完全或部分緩解',
    nih_indication_zh:
      '亞洲標準：BMI ≥ 37.5 kg/m²；或 BMI ≥ 32.5 kg/m² 合併第 2 型糖尿病、高血壓或重度阻塞性睡眠呼吸中止症，且經內科治療無效者。',
    perioperative_risks: [
      '胃切除縫合線滲漏 (Staple Line Leak, 發生率約 1-2%，嚴重腹膜炎急症)',
      '術後切口出血或血腫',
      '術後新發或惡化胃食道逆流 (GERD，因胃內腔壓力升高，約 15-20% 患者需長期質子泵抑製劑)',
    ],
    long_term_nutritional_deficits: [
      '維生素 B12 缺乏（胃內壁細胞減少，內生因子 Intrinsic Factor 分泌不足）',
      '缺鐵性貧血（胃酸分泌減少影響三價鐵轉化）',
      '維生素 D 與鈣吸收不足引發骨質疏鬆',
    ],
    revisional_surgery_rate: '約 10-15% 患者在 5-10 年後因胃囊擴張或頑固胃食道逆流需轉為胃繞道手術。',
    expert_verdict:
      '目前全球與台灣施作量最高的減重手術。解剖結構未改道腸道，不破壞幽門與十二指腸吸收路徑，手術時間短、併發症相對單純。但術前有重度逆流性食道炎者應審慎評估。',
  },
  {
    id: 'SURG-02',
    name_zh: '腹腔鏡胃繞道手術 (Roux-en-Y Gastric Bypass, RYGB)',
    name_en: 'Laparoscopic Roux-en-Y Gastric Bypass',
    procedure_type: 'COMBINED',
    anatomical_mechanism_zh:
      '在胃近端近賁門處分割出一個僅約 20-30 mL 的微小「胃小囊 (Gastric Pouch)」，將空腸切斷（Roux 臂），遠端空腸上提與胃小囊吻合；將包含十二指腸與近端空腸的胰膽管道（Biliopancreatic 臂）接回下段空腸。使食物完全跳過 95% 的胃、十二指腸與近端空腸。',
    neuroendocrine_impact_zh:
      '代謝手術的「黃金標準」！未完全消化的食糜高速傾倒至中遠端迴腸，引發腸道 L 細胞極致激發，產生內源性「超生理濃度」的 GLP-1 與 PYY 爆發（升高 5-10 倍），直接刺激胰島 β 細胞並重塑下視丘飽足設定點。許多患者在出院前（甚至尚未顯著減重）血糖已神奇完全正常化。',
    avg_excess_weight_loss_pct: '70% ~ 80% 超額體重流失 (EWL)',
    t2d_remission_rate_pct: '75% ~ 85% 第 2 型糖尿病完全緩解（停用所有胰島素與口服降糖藥）',
    nih_indication_zh:
      '重度肥胖合併頑固難控第 2 型糖尿病、嚴重胃食道逆流或食道裂孔疝氣患者之首選術式。',
    perioperative_risks: [
      '胃空腸吻合口漏或狹窄',
      '內疝氣 (Internal Hernia) 導致急性腸阻塞',
      '邊緣性潰瘍 (Marginal Ulcer，嚴格終生禁菸與禁服 NSAIDs 止痛藥)',
    ],
    long_term_nutritional_deficits: [
      '嚴重長期微量營養缺乏高危險群：維生素 B12、鐵、葉酸、鈣、脂溶性維生素 A/D/E/K',
      '必須「終身每天」口服醫療級高劑量綜合維生素與鈣片',
      '傾倒症候群 (Dumping Syndrome)：進食精緻糖後高滲透壓食糜進入空腸，引發冷汗、心悸、頭暈與反應性低血糖',
    ],
    revisional_surgery_rate: '約 5-8% 長期翻修率。',
    expert_verdict:
      '強大震撼的代謝重置力量，糖尿病完全緩解的殿堂級術式。但要求患者必須具備極高度的營養補充紀律，若術後擅自停用維生素，可能導致不可逆的神經病變或嚴重貧血。',
  },
  {
    id: 'SURG-03',
    name_zh: '胃內水球置放術 (Intragastric Balloon, IGB / 免開刀胃水球)',
    name_en: 'Intragastric Balloon System',
    procedure_type: 'RESTRICTIVE',
    anatomical_mechanism_zh:
      '透過胃鏡檢查（或新一代口服吞入式膠囊），將醫療級矽膠水球送入胃腔，注入 400-600 mL 含有甲基藍染劑的無菌生理食鹽水。水球漂浮於胃底部，佔據約一半胃容積。放置約 4-6 個月後經內視鏡取出（或隨糞便排出）。',
    neuroendocrine_impact_zh:
      '純機械性胃容積佔位，持續激發胃部牽張受器產生早飽感；延緩固體食物自胃部排空速率。對腸道荷爾蒙的重塑相對微弱。',
    avg_excess_weight_loss_pct: '30% ~ 40% 超額體重流失 (約減去總體重 10-15%)',
    t2d_remission_rate_pct: '約 30% ~ 40% 代謝指標改善',
    nih_indication_zh:
      'BMI 27 ~ 35 之間、不願或不符合外科手術資格，或超重度肥胖患者作為減重手術前之過渡減重工具。',
    perioperative_risks: [
      '置入前 3-7 天劇烈反胃、頑固嘔吐與胃部痙攣痛（需止吐藥點滴支持）',
      '水球破裂破漏（尿液會變藍綠色警示）引發遠端腸阻塞',
      '胃黏膜潰瘍或穿孔（罕見但嚴重）',
    ],
    long_term_nutritional_deficits: ['取出後若未建立飲食生活習慣，1-2 年內復胖率高達 70-80%。'],
    revisional_surgery_rate: '屬暫時性介入，6 個月必須移除。',
    expert_verdict:
      '免開刀、可逆性高的過渡方案。適合需要短期顯著降重以符合關節手術、試管嬰兒受孕或作為生活型態調整「重開機」起點，但不可將其視為一勞永逸的終點。',
  },
];

/**
 * 運動生理學在減重中的真實定位 (Herman Pontzer 限制性總能量消耗模型)
 */
export const EXERCISE_OBESITY_SCIENCE = {
  pontzer_model_summary:
    '人類學家 Herman Pontzer 的開創性雙標水 (Doubly Labeled Water) 研究證實：人體每日總能量消耗 (TEE) 並非隨運動量無限線性增加，而是呈現「受限模型 (Constrained TEE Model)」。當個體大量增加運動消耗時，身體會主動透過「下調免疫發炎、抑制生殖荷爾蒙合成、降低自發性無意識活動 (NEAT 如抖腿、走動)」進行負反饋代償。因此，單純靠運動跑步企圖消耗熱量來減肥，效果往往遠低於紙面數學計算。',
  exercise_true_roles: [
    {
      role_zh: '維持基礎代謝率 (BMR) 與阻斷肌肉崩解',
      detail_zh: '熱量赤字下身體傾向分解蛋白質。規律高強度抗阻重訓是向身體發出「骨骼肌正在被高度依賴，不可水解」的唯一生化訊號。',
    },
    {
      role_zh: '非胰島素依賴型骨骼肌 GLUT4 轉位',
      detail_zh: '肌肉收縮經由 AMPK-CaMKII 途徑，直接將細胞內 GLUT4 轉運蛋白嵌合至肌纖維膜，無須胰島素即可強效清除血液葡萄糖，瞬間減輕胰臟負擔。',
    },
    {
      role_zh: '提高粒線體脂質氧化天花板 (Zone 2 訓練)',
      detail_zh: '維持在乳酸閥值以下 (1.5-2.0 mmol/L) 的低心率有氧訓練，能最極致活化肌細胞內的肉鹼棕櫚醯基轉移酶-1 (CPT-1)，擴增粒線體數量與脂肪燃燒率。',
    },
    {
      role_zh: '長期防止體重反彈 (Weight Regain Prevention) 的終極防線',
      detail_zh: '美國國家體重控制登記處 (NWCR) 追蹤數千名成功減重 15kg+ 超過 5 年者，超過 90% 的共通特徵是：每天維持至少 60 分鐘的中高強度運動。運動在「減重期」貢獻約 20%，但在「維持防復胖期」貢獻超過 80%！',
    },
  ],
};

/**
 * 5 大坊間流行偽科學迷思粉碎機 (Myth Busters)
 */
export const OBESITY_MYTHS: ObesityMythItem[] = [
  {
    id: 'MYTH-01',
    myth_claim: '「狂練仰臥起坐與腹肌撕裂者，能精準燃燒肚子上的腹部脂肪。」',
    scientific_reality: '人體脂肪動員是全身神經內分泌系統調控的，根本不存在「局部減脂 (Spot Reduction)」！',
    biochemical_why:
      '肌肉收縮消耗的能量來自血液循環中的游離脂肪酸 (FFA)，而非鄰近脂肪細胞。當下視丘激發交感神經釋放正腎上腺素時，脂肪酶是透過血流到達全身白色脂肪組織進行脂解。仰臥起坐鍛鍊的是腹直肌的厚度與耐力，若上方覆蓋著厚厚的皮下與內臟脂肪，肚子反而可能因肌肉肥大而顯得更凸。',
    actionable_correction: '創造全身性熱量赤字，搭配大肌群複合動作（深蹲、硬舉、划船）提高全身消耗，腹部脂肪自然會按遺傳順序逐步消退。',
    danger_level: 'LOW',
    evidence_grade: 'A',
  },
  {
    id: 'MYTH-02',
    myth_claim: '「穿暴汗服、裹保鮮膜運動，爆汗越多代表油脂燃燒越快、排毒越徹底。」',
    scientific_reality: '汗水 99% 是水分和電解質，流汗排出的熱量與脂肪燃燒量毫無正向關聯！',
    biochemical_why:
      '流汗是下視丘體溫調節中樞在體溫過高時的散熱蒸發機制。暴汗服阻斷對流散熱，強迫身體脫水。體重計上的短暫下降全部是「細胞外液與血漿容量流失」，只要喝兩杯水體重立即全數反彈。相反地，體溫過高會使核心溫度飆破 39°C，急劇增加中暑、橫紋肌溶解症與急性腎衰竭的致命風險。',
    actionable_correction: '運動應著透氣排汗吸濕衣物，維持良好水合平衡，觀察心率區間（Zone 2）與重訓容量才是脂肪氧化真實指標。',
    danger_level: 'HIGH',
    evidence_grade: 'A',
  },
  {
    id: 'MYTH-03',
    myth_claim: '「每天喝排毒酵素梅、順暢減肥茶，把腸道宿便排光就能輕鬆減重排毒。」',
    scientific_reality: '坊間通便排毒茶 95% 以上偷添加番瀉葉 (Senna)、大黃素等刺激性瀉藥，根本不能減脂！',
    biochemical_why:
      '大腸的功能是吸收水分與形成糞便，食物中的熱量（脂肪、碳水、蛋白質）早在小腸就已被徹底吸收完畢。腹瀉排出的全部是含水分的結腸內容物。長期服用刺激性蒽醌類瀉藥會麻痺腸神經叢、破壞水電解質平衡，誘發「結腸黑變病 (Melanosis Coli)」與腸蠕動衰竭，形成頑固性嚴重依賴。',
    actionable_correction: '停止濫用瀉藥！透過每日 25-35g 原態膳食纖維、規律水分攝取與良好腸道菌群自然成形排便。',
    danger_level: 'HIGH',
    evidence_grade: 'A',
  },
  {
    id: 'MYTH-04',
    myth_claim: '「既然有了 GLP-1 瘦瘦針神藥，我就不用辛苦運動和忌口了，躺著就能瘦。」',
    scientific_reality: '只靠打針不重訓管嘴，流失的 40% 是寶貴骨骼肌，停藥後迎接你的將是代謝崩潰的毀滅性復胖！',
    biochemical_why:
      'GLP-1 類藥物壓低食慾的同時，若個體未攝取足量蛋白質且缺乏阻力刺激，身體會大量水解骨骼肌去脂質量。停藥後胃排空恢復正常、食慾中樞反彈，但由於基礎代謝率 (BMR) 因肌肉流失而永久性崩塌，熱量盈餘會以倍速轉化為純脂肪堆積，使體脂率比用藥前更高，淪為嚴重的「肌少症肥胖 (Sarcopenic Obesity)」。',
    actionable_correction: '瘦瘦針是為你爭取養成健康習慣時間的「拐杖」，而非終生輪椅。用藥期間必須強制落實每週 3 次重訓與每日 1.6g/kg 蛋白質。',
    danger_level: 'HIGH',
    evidence_grade: 'A',
  },
  {
    id: 'MYTH-05',
    myth_claim: '「減肥就是一滴油都不能碰，餐餐吃水煮雞胸肉加燙青菜最乾淨。」',
    scientific_reality: '長期極端無油飲食會導致膽汁鬱積結石、脂溶性維生素衰竭、女性停經與內分泌系統崩潰！',
    biochemical_why:
      '人體必需脂肪酸（亞麻油酸、α-次亞麻油酸）無法自體合成。極端無油飲食無法刺激膽囊收縮素 (CCK) 分泌，膽囊長期不排空導致膽汁濃縮沉澱，急速形成膽結石；維生素 A、D、E、K 吸收受阻導致夜盲、骨質疏鬆與免疫低下；體內固醇類荷爾蒙（雌激素、黃體素、睪固酮）失去合成前驅物，女性出現月經推遲乃至長達數年的閉經。',
    actionable_correction: '拒絕精煉劣質油，但要熱情擁抱「好油脂」：每日攝取特級初榨橄欖油、酪梨、堅果與深海魚油，保護內分泌健康。',
    danger_level: 'MEDIUM',
    evidence_grade: 'A',
  },
];

/**
 * 跨專科多學科會議 (MDT) 共識審定簽核意見
 */
export const MDT_CONSENSUS_STATEMENTS = [
  {
    expert_id: 'EC-01',
    expert_title: '醫療總監',
    consensus_zh: '肥胖已正式被全球醫學界定性為「慢性復發性代謝神經內分泌疾病」。我們必須終結對肥胖者的道德羞辱，以現代分子醫學武器（階梯式生活型態、精準營養、腸泌素用藥與代謝手術）建立全人守護體系。',
  },
  {
    expert_id: 'EC-28',
    expert_title: '肥胖醫學專科醫師',
    consensus_zh: '打破以 BMI 為唯一指標的落後框架，全面導入 EOSS 愛德蒙頓分級。針對 BMI ≥ 27 伴共病或 ≥ 30 者，積極合理使用 GLP-1/GIP 受體促效劑，但臨床醫師必須把關去脂體重監測與停藥維持協議。',
  },
  {
    expert_id: 'EC-29',
    expert_title: '臨床減重營養師',
    consensus_zh: '飲食法沒有單一萬能神教。短期衝刺可善用高蛋白 PSMF 或低碳 CIM 打破胰島素阻抗，終身體重維持則必須過渡至地中海飲食模式。蛋白質每日不低於 1.6 g/kg 是守護骨骼肌的不可妥協底線。',
  },
  {
    expert_id: 'EC-30',
    expert_title: '減重代謝外科主任',
    consensus_zh: '對於 BMI ≥ 37.5 或 ≥ 32.5 合併難控第 2 型糖尿病的重度患者，袖狀胃切除與胃繞道手術依然是目前逆轉糖尿病、延長預期壽命證據最堅實的治療手段。術後應建立終身維生素補充防火牆。',
  },
  {
    expert_id: 'EC-33',
    expert_title: '體組成運動生理學家',
    consensus_zh: '認清運動在減重中的真實定位：運動不是讓你胡吃海喝的「卡路里橡皮擦」，而是熱量赤字下保護骨骼肌微結構、維持粒線體脂肪氧化天花板、以及長期預防復胖的最強生化煞車！',
  },
];

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 增肌科學專題：肌肥大核心三大生化機轉 (Hypertrophy Mechanisms)
 * 依據 Brad Schoenfeld 等權威運動生理學期刊實證
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const HYPERTROPHY_MECHANISMS: HypertrophyMechanism[] = [
  {
    id: 'HM-01',
    name_zh: '機械張力 (Mechanical Tension) —— 肌肥大無可爭議的基石王牌',
    name_en: 'Mechanical Tension & Costameric Mechanotransduction',
    badge: '第一關鍵生化驅動力',
    molecular_pathway: 'Costamere Integrin / FAK / Titin kinase → TSC2 抑制解除 → Rheb-GTP → mTORC1 磷酸化',
    mechanism_detail_zh:
      '當骨骼肌肌纖維主動抵抗外在阻力收縮或在受力下拉伸時，肌小節膜上的肋骨小體 (Costameres)、肌聯蛋白 (Titin kinase) 與整合素 (Integrins) 受到強烈牽拉變形。此物理形變觸發「力學化學信號轉導 (Mechanotransduction)」，活化黏著斑激酶 (FAK) 與磷脂酸 (PA)，促使抑癌蛋白複合物 TSC1/TSC2 解離，釋放 Rheb-GTP，進而強效活化細胞生長總司令 mTORC1，開啟核糖體對肌動蛋白 (Actin) 與肌球蛋白 (Myosin) 的爆發性轉譯。',
    practical_execution_zh:
      '在離力竭前 1~3 下 (RIR 1-3, RPE 7-9) 的強度下，採用能夠讓肌肉充分承受「離心拉伸負荷」的全活動度 (Full ROM) 動作。特別是肌肉在最長長度 (Long Muscle Length) 下承受大張力（如：深蹲底部、下斜啞鈴飛鳥拉伸點、上斜臥推），能刺激肌小節串聯增加 (Sarcomerogenesis in series)，肌肥大效益比短縮位訓練高出 30-40%。',
    clinical_pearl_zh:
      '沒有足夠的機械張力，再多的補充品或疲累感都無法激發深層快縮肌纖維肥大。負荷必須挑戰肌纖維的拉力極限。',
    key_molecules: ['mTORC1', 'FAK', 'Titin Kinase', 'Phosphatidic Acid (PA)', 'Rheb', 'p70S6K'],
  },
  {
    id: 'HM-02',
    name_zh: '代謝壓力 (Metabolic Stress) —— 高閾值運動單元強迫徵召與細胞腫脹',
    name_en: 'Metabolic Stress, Cell Swelling & High-Threshold Motor Unit Recruitment',
    badge: '同化訊號放大器',
    molecular_pathway: '無氧糖解乳酸/H+/Pi 累積 → 肌纖維局部乏氧 → Henneman 尺寸原則打破 → Type IIx 快肌強行徵召',
    mechanism_detail_zh:
      '在持續肌肉收縮（特別是中高次數 12-20RM、組間休息較短 45-75 秒）時，肌肉內血管受壓阻斷血流，組織陷入短暫缺氧。無氧糖解急速代謝產生乳酸、氫離子 ($H^+$)、無機磷酸鹽 ($P_i$) 與 ADP。局部酸中毒與代謝副產物使慢縮氧化型 Type I 肌纖維快速力竭，迫使中樞神經根據 Henneman 尺寸原則，緊急調度平時難以啟動的高閾值 Type IIa 與 IIx 快縮肌纖維接手！同時，代謝物造成細胞內滲透壓劇增，水分子湧入肌纖維產生「細胞腫脹 (Cell Swelling)」，膜張力直接刺激蛋白合成抑制蛋白分解。',
    practical_execution_zh:
      '採用「中等負荷、高次數、嚴格控制組間休息」模式（如：遞減組 Drop Sets、休息暫停法 Rest-Pause、超燃超級組）。確保肌肉在動作終點維持持續張力，不鎖死關節借力，製造極致的肌肉「泵感 (The Pump)」。',
    clinical_pearl_zh:
      '代謝壓力是中輕重量也能達成肌肥大的科學機制，尤其適合關節受損、結締組織敏感或中老年長者防肌少症訓練。',
    key_molecules: ['Lactate', 'Inorganic Phosphate (Pi)', 'MAPK/ERK pathway', 'Systemic GH/IGF-1', 'Cell Swelling Osmolytes'],
  },
  {
    id: 'HM-03',
    name_zh: '肌纖維微損傷與衛星細胞增殖 (Muscle Damage & Satellite Cell Activation)',
    name_en: 'Microtrauma, Satellite Cell Myonuclear Addition & Muscle Memory',
    badge: '結構性重構與終身肌肉記憶',
    molecular_pathway: '肌纖維 Z 盤超微結構撕裂 → 局部發炎 COX-2/PGE2 → 靜止幹細胞 (Pax7+) 喚醒 → 肌核融合',
    mechanism_detail_zh:
      '特別是在抗阻力訓練的「離心收縮 (Eccentric phase)」階段，肌原纖維承受超越其屈服點的牽引，導致肌節 Z 盤 (Z-line streaming) 與肌纖維膜 (Sarcolemma) 出現顯微微撕裂。局部肥大細胞與巨噬細胞浸潤，釋放前列腺素 $PGE_2$、FGF、HGF 與 IGF-1Ea (MGF)。這些局部生長因子迅速喚醒原本附著在肌纖維基底膜上的「衛星幹細胞 (Satellite Cells, Pax7+ 標記)」。衛星細胞開始爆發性有絲分裂，並「融合 (Fusion)」進受損肌纖維中，捐獻出全新的細胞核（肌核，Myonuclei）。',
    practical_execution_zh:
      '每一下動作的「離心下放」階段刻意維持 2~3 秒受控節奏，拒絕自由落體式墜落。每 4-6 週適度輪換 10-20% 的動作變體，給予肌纖維不同角度的微拉伸刺激。切記：微損傷適量即可（延遲性肌肉酸痛 DOMS 24-48 小時屬正常），過度損傷會拖垮中樞神經與恢復期。',
    clinical_pearl_zh:
      '捐獻進肌纖維的新肌核一旦形成將「終身永存」！即使日後數年不運動導致肌肉萎縮，肌核依然守在肌膜下；一旦重新開練，能以數倍速度急速膨脹恢復，這就是「肌肉記憶 (Muscle Memory)」的細胞生物學真相！',
    key_molecules: ['Pax7', 'MyoD', 'Myogenin', 'MGF (Mechano-Growth Factor)', 'PGE2', 'IL-6 Myokine'],
  },
];

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 漸進式超負荷訓練矩陣：各大肌群每週最佳訓練音量與動作建議
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const MUSCLE_GROUP_VOLUMES: MuscleGroupVolumeItem[] = [
  {
    muscle_group_zh: '胸大肌 (胸肌上/中/下束)',
    muscle_group_en: 'Pectoralis Major & Minor',
    weekly_mrv_sets: '12 - 20 組有效組 / 週',
    frequency_per_week: '2 - 3 次 / 週',
    stretch_loaded_exercise: '上斜啞鈴臥推 (底部深拉伸) / 機械式深夾胸',
    rep_range: '6 - 12 次 / 組 (複合臥推)；10 - 15 次 / 組 (孤立夾胸)',
    rir_recommendation: '複合臥推留 RIR 1-2 防力竭受傷；夾胸可推至 RIR 0',
    biomechanical_note: '胸肌鎖骨頭（上胸）肌纖維走向為斜向上，臥推椅角度應設於 30°-45°，避免三角肌前束過度代償。',
  },
  {
    muscle_group_zh: '背部肌群 (背闊肌/斜方肌/大圓肌)',
    muscle_group_en: 'Latissimus Dorsi, Trapezius, Rhomboids',
    weekly_mrv_sets: '14 - 22 組有效組 / 週',
    frequency_per_week: '2 - 3 次 / 週',
    stretch_loaded_exercise: '單臂滑輪下拉 (頂部肋間展開) / 胸支撐划船',
    rep_range: '6 - 10 次 / 組 (大重量划船)；10 - 15 次 / 組 (垂直下拉)',
    rir_recommendation: '全程維持腰椎中立，避免骨盆前傾借力，RIR 1-2',
    biomechanical_note: '若練背闊肌寬度，下拉時手肘緊貼軀幹朝骨盆收回；若練上背厚度，手肘外展 45°-60° 肩胛強力後收。',
  },
  {
    muscle_group_zh: '股四頭肌 (大腿前側四大束)',
    muscle_group_en: 'Quadriceps Femoris',
    weekly_mrv_sets: '12 - 18 組有效組 / 週',
    frequency_per_week: '2 次 / 週',
    stretch_loaded_exercise: '深蹲 (髖膝深屈曲拉伸) / 哈克深蹲 (Hack Squat)',
    rep_range: '6 - 10 次 / 組 (槓鈴深蹲)；10 - 15 次 / 組 (腿推/腿屈伸)',
    rir_recommendation: '自由重量深蹲留 RIR 2 確保核心呼吸；固定器械可推至 RIR 0-1',
    biomechanical_note: '股直肌跨越髖與膝雙關節，唯有在髖關節後伸且膝關節極度屈曲時（如 Sissy Squat 或仰臥腿伸展）才能達到最大拉伸肥大。',
  },
  {
    muscle_group_zh: '腿後肌群與臀大肌 (後側動力鏈)',
    muscle_group_en: 'Hamstrings & Gluteus Maximus',
    weekly_mrv_sets: '10 - 16 組有效組 / 週',
    frequency_per_week: '2 次 / 週',
    stretch_loaded_exercise: '羅馬尼亞硬舉 (RDL，極度髖屈拉伸) / 坐姿腿彎舉',
    rep_range: '6 - 10 次 / 組 (RDL/臀推)；10 - 15 次 / 組 (腿彎舉)',
    rir_recommendation: 'RDL 嚴格鎖住脊椎中立，於膕繩肌緊繃極限返程，RIR 1-2',
    biomechanical_note: '坐姿腿彎舉在髖關節屈曲 90° 下執行，膕繩肌長度顯著大於俯臥腿彎舉，臨床研究證實坐姿增肌幅度高出近 1.5 倍！',
  },
  {
    muscle_group_zh: '三角肌 (前束/中束/後束)',
    muscle_group_en: 'Deltoid Complex (Anterior/Lateral/Posterior)',
    weekly_mrv_sets: '14 - 24 組有效組 / 週 (側束耐受度極高)',
    frequency_per_week: '2 - 4 次 / 週',
    stretch_loaded_exercise: '滑輪背後側平舉 (底端持續張力) / 繩索面拉 (Face Pull)',
    rep_range: '8 - 12 次 / 組 (站姿推舉)；12 - 20 次 / 組 (側平舉/反向飛鳥)',
    rir_recommendation: '側束與後束幾乎無關節擠壓危險，建議多組直攻力竭 (RIR 0)',
    biomechanical_note: '啞鈴側平舉在身體兩側垂放時力臂為零無張力；改用滑輪由下後方拉起，可在肌肉初始拉伸長度施加最大剪切力。',
  },
  {
    muscle_group_zh: '手臂肌群 (肱二頭肌/肱三頭肌)',
    muscle_group_en: 'Biceps Brachii & Triceps Brachii',
    weekly_mrv_sets: '10 - 16 組有效組 / 週 (已含推拉複合動作間接刺激)',
    frequency_per_week: '2 - 3 次 / 週',
    stretch_loaded_exercise: '過頂繩索三頭伸展 (長頭拉伸) / 上斜啞鈴彎舉 (二頭長頭拉伸)',
    rep_range: '8 - 15 次 / 組',
    rir_recommendation: '孤立動作極耐疲勞，可適度加入遞減組，RIR 0-1',
    biomechanical_note: '肱三頭肌長頭起於肩胛骨盂下結節，唯有「手臂舉過頭頂」時才能徹底拉伸長頭；下壓動作僅偏重內側與外側頭。',
  },
];

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 減脂代謝生化學：脂肪動態水解、氧化與排除五部曲 (Fat Loss Cascade)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const FAT_LOSS_METABOLISM_STEPS: FatLossMetabolismStep[] = [
  {
    step_number: 1,
    stage_name_zh: '訊號動員：兒茶酚胺驅動脂肪細胞膜受體',
    stage_name_en: 'Neuroendocrine Lipolytic Signaling',
    biochemical_enzymes: ['β1/β2 Adrenergic Receptors', 'Adenylyl Cyclase (AC)', 'Protein Kinase A (PKA)'],
    endocrine_regulators: '正腎上腺素 ↑、腎上腺素 ↑、皮質醇 (協同)、生長激素 ↑',
    detailed_process_zh:
      '在運動或熱量赤字誘發交感神經興奮時，交感神經末梢與腎上腺髓質釋放兒茶酚胺，專一性結合白色脂肪細胞膜上的 β-腎上腺素受體。受體活化 Gs 蛋白，促使腺苷酸環化酶 (AC) 將 ATP 轉化為環磷酸腺苷 (cAMP)。cAMP 飆升進而活化蛋白激酶 A (PKA)，為後續的三酸甘油酯水解大軍吹響集結號角。',
    inhibition_factors_zh: 'α2-腎上腺素受體興奮（頑固脂肪特徵）、高胰島素血症。',
    actionable_strategy_zh: '維持低胰島素狀態並安排規律 Zone 2 有氧或抗阻訓練，促使交感神經兒茶酚胺濃度處於有效激發窗口。',
  },
  {
    step_number: 2,
    stage_name_zh: '水解級聯：三步剪切三酸甘油酯釋放游離脂肪酸',
    stage_name_en: 'Intracellular Lipolytic Cascade (ATGL → HSL → MGL)',
    biochemical_enzymes: ['ATGL (Adipose Triglyceride Lipase)', 'HSL (Hormone-Sensitive Lipase)', 'MGL (Monoacylglycerol Lipase)', 'Perilipin-1'],
    endocrine_regulators: 'PKA 磷酸化活化 Perilipin 與 HSL；胰島素強效反向去磷酸化',
    detailed_process_zh:
      '油滴表面被周脂素 (Perilipin-1) 嚴密包裹保護。PKA 將 Perilipin-1 與 HSL 磷酸化，使 CGI-58 輔助因子脫離 Perilipin 並強力活化第一步剪切酶「ATGL」，將三酸甘油酯剪為二酸甘油酯 (DAG)；隨後已活化的「HSL」精準剪下第二條脂肪酸生成單酸甘油酯 (MAG)；最後「MGL」剪下最後一條脂肪酸，留下一個甘油分子與三條游離脂肪酸 (Free Fatty Acids, FFA)。',
    inhibition_factors_zh:
      '【關鍵致命煞車】只要血液中胰島素微幅上升，活化 PDE3B 降解 cAMP，HSL 與 ATGL 的水解活性將在 10 分鐘內暴跌 >90%！脂肪分解立即全面停擺！',
    actionable_strategy_zh: '避免運動前 1 小時攝取高 GI 精製純糖，防止過高胰島素峰值直接把脂肪水解閥門焊死。',
  },
  {
    step_number: 3,
    stage_name_zh: '血液運載：白蛋白結合轉運至目標肌肉粒線體',
    stage_name_en: 'Circulatory Transport & Cellular Uptake',
    biochemical_enzymes: ['Serum Albumin', 'CD36 / FAT (Fatty Acid Translocase)', 'FATP (Fatty Acid Transport Proteins)'],
    endocrine_regulators: '微血管血流量 (Visceral > Subcutaneous)',
    detailed_process_zh:
      '游離脂肪酸不溶於水，必須迅速穿越脂肪細胞膜，牢牢吸附在血清白蛋白 (Albumin) 疏水袋中，順著毛細血管血流被載送至需要燃料的骨骼肌、心肌或肝臟。抵達肌纖維表面後，由 CD36 易位酶與 FATP 轉運蛋白捕獲，穿越肌纖維膜進入肌質細胞質中，被輔酶A活化形成脂醯輔酶A (Acyl-CoA)。',
    inhibition_factors_zh: '周邊微血管灌流不足（久坐、皮下脂肪組織血流低落）、白蛋白不足。',
    actionable_strategy_zh: '頑固脂肪區域（下腹、臀腿）通常微血管密度較低、溫度偏低；全身性阻力運動搭配充足水分攝取能大幅改善組織灌流。',
  },
  {
    step_number: 4,
    stage_name_zh: '跨膜閘門：CPT-1 肉鹼穿梭系統進入粒線體基質',
    stage_name_en: 'Carnitine Shuttle & CPT-1 Mitochondrial Gatekeeper',
    biochemical_enzymes: ['CPT-1 (Carnitine Palmitoyltransferase-1)', 'CACT (Carnitine-Acylcarnitine Translocase)', 'CPT-2'],
    endocrine_regulators: 'Malonyl-CoA (最強變構抑制物)；AMPK 活化解鎖抑制',
    detailed_process_zh:
      '粒線體內膜對長鏈脂醯輔酶A完全不通透。粒線體外膜的關鍵守門員「CPT-1」將脂醯輔酶A與左旋肉鹼 (L-Carnitine) 結合成脂醯肉鹼，透過 CACT 穿梭載體運入粒線體基質內部，再由 CPT-2 還原為脂醯輔酶A。細胞內丙二醯輔酶A (Malonyl-CoA) 是 CPT-1 的天然煞車；當能量充沛或胰島素高時，Malonyl-CoA 飆高，CPT-1 關閉；當禁食或運動活化 AMPK 時，ACC 酶受抑，Malonyl-CoA 驟降，CPT-1 閘門全面暢通！',
    inhibition_factors_zh: '高 Malonyl-CoA 濃度、細胞質游離肉鹼匱乏、高碳水持續供應。',
    actionable_strategy_zh: '規律進行 Zone 2 耐力訓練或空腹晨間快走，能強烈活化肌細胞 AMPK，將 CPT-1 粒線體燃脂轉運效率推向最高峰。',
  },
  {
    step_number: 5,
    stage_name_zh: '生化燃燒與排出：β-氧化生成 ATP，84% 經呼吸排出！',
    stage_name_en: 'Beta-Oxidation, Krebs Cycle & Respiratory Excretion',
    biochemical_enzymes: ['Acyl-CoA Dehydrogenase', 'TCA Cycle Enzymes', 'Electron Transport Chain Complexes I-IV', 'ATP Synthase'],
    endocrine_regulators: '細胞能量狀態 (AMP/ATP 比值)',
    detailed_process_zh:
      '在粒線體基質中，脂醯輔酶A歷經脫氫、加水、再脫氫、硫解四步重複循環（β-氧化），每輪剪下 2 個碳原子生成乙醯輔酶A (Acetyl-CoA)，並產出大量 NADH 與 FADH2。乙醯輔酶A湧入克氏循環 (TCA Cycle)，電子傳遞鏈利用氧氣合成大量 ATP。化學計量學真相（Ruben & Meerman 權威研究）：燃燒 10 公斤人體純脂肪需要吸入 29 公斤氧氣，最終生成 28 公斤二氧化碳 ($CO_2$) 與 11 公斤水 ($H_2O$)。其中整整 84% 的脂肪質量是透過「肺部呼吸」以 $CO_2$ 氣體形式呼出體外，僅 16% 化為尿液汗水！',
    inhibition_factors_zh: '粒線體功能障礙、有氧氧化代謝產能受限。',
    actionable_strategy_zh: '破除「出汗等於減脂」的低級迷思！流汗只是散熱排泄水分，脂肪真正的墓場是「粒線體氧氣燃燒」並「經由呼吸把碳原子吐向空氣」！',
  },
];

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 同步增肌減脂 (Body Recomposition) 雙軌同化實踐體系
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const BODY_RECOMP_CANDIDATES: BodyRecompCandidate[] = [
  {
    phenotype_zh: '初階新手 / 阻力訓練新手紅利期 (Beginner Gains)',
    phenotype_en: 'Untrained Beginners with High Neuromuscular Adaptability',
    physiological_basis_zh:
      '從未接受過系統性阻力訓練的肌纖維，其機械力學受體與同化基因極度敏感。阻力訓練初期，蛋白質合成效率 (MPS) 攀升幅度可達老手的 2-3 倍，且持續維持長達 48 小時以上。體內脂肪儲存充沛，即使在輕微赤字下，脂肪組織也能源源不絕釋放三酸甘油酯填補能量空缺，支援肌蛋白合成。',
    calorie_strategy_zh: '每日等熱量維持 (Maintenance) 或微幅赤字 10% (約 200-250 kcal/天)。',
    protein_requirement_zh: '每日體重每公斤 1.8 - 2.2 克優質蛋白質。',
    training_focus_zh: '每週 3-4 次全身大肌群複合動作（深蹲、臥推、硬舉、划船、推舉），專注學習神經控制與動作軌跡。',
    expected_timeline_zh: '前 3-6 個月內，普遍可實現體脂率下降 3-6%、同時去脂肌肉增加 1.5-3.0 公斤的奇蹟轉變！',
  },
  {
    phenotype_zh: '停訓復練者 / 沉睡肌核喚醒 (Trained Detrained Individuals)',
    phenotype_en: 'Previously Trained Lifters with Intact Myonuclear Domain',
    physiological_basis_zh:
      '過去曾有規律訓練但因工作、受傷或生活暫停數月至數年者。肌原纖維雖然萎縮變細，但過去透過衛星細胞捐獻的「肌核 (Myonuclei)」並未消失！肌纖維的轉錄引擎依然齊全，一旦重新恢復訓練，無需經歷漫長的衛星細胞分裂融合過程，肌核能立刻啟動高強度蛋白質合成，也就是「肌肉記憶 (Muscle Memory)」。',
    calorie_strategy_zh: '等熱量維持 (Maintenance) 或 10-15% 輕度赤字。',
    protein_requirement_zh: '每日體重每公斤 2.0 - 2.4 克高規格防禦性蛋白質。',
    training_focus_zh: '迅速重建過去的每週 12-16 組有效組數，受控離心，避免過早超負荷導致嚴重結締組織疼痛。',
    expected_timeline_zh: '通常在復練後的 6-10 週內即可快速追回 80% 以上過去流失的肌肉量，體脂同步急劇縮減。',
  },
  {
    phenotype_zh: '體脂過高者 / 內源脂肪庫豐沛族群 (High Body Fat Phenotype)',
    phenotype_en: 'Overweight or Class 1 Obesity with High Stored Energy Surplus',
    physiological_basis_zh:
      '男性體脂率 >23%、女性體脂率 >32% 者，體內儲存著數萬乃至數十萬大卡的內源化學能（每公斤脂肪組織含約 7,700 kcal）。只要蛋白質充足且阻力訓練發出明確的「禁止分解肌肉、必須修復肌原纖維」張力信號，身體會毫不猶豫地動員皮下與內臟脂肪作為合成代謝的供能原料。',
    calorie_strategy_zh: '溫和至中度熱量赤字 15-20% (每日約 350-500 kcal 赤字)，嚴禁 >30% 飢餓節食。',
    protein_requirement_zh: '以「理想去脂體重」計算每日每公斤 2.0 - 2.2 克蛋白質，避免高熱量肉類。',
    training_focus_zh: '每週 3 次漸進阻力訓練防肌肉流失 + 每日 8,000-10,000 步 NEAT 步行，避免高衝擊跑步傷膝關節。',
    expected_timeline_zh: '在體重大幅下降的同時，骨骼肌完全不受損甚至微幅增加，徹底打破「減肥一定會掉肌肉」的宿命。',
  },
  {
    phenotype_zh: '劣質飲食改造者 / 長期蛋白質嚴重不足但重訓愛好者',
    phenotype_en: 'Suboptimally Nourished Lifters Correcting Protein Deficiency',
    physiological_basis_zh:
      '雖然每週認真重訓，但過去飲食長期隨便、餐餐以精緻碳水充飢、每日蛋白質攝取連 0.8 g/kg 都達不到的訓練者。他們的肌肉長期處於「有訓練訊號、但缺乏建築磚塊」的饑渴同化抵抗狀態。一旦將蛋白質補足至 2.0 g/kg 並掌握白胺酸時序，肌肉合成開關被瞬間徹底激活！',
    calorie_strategy_zh: '等熱量 (Maintenance) 或碳水循環 (Carb Cycling)。',
    protein_requirement_zh: '每日 2.0 - 2.2 g/kg，分 4 餐平均攝取，確保每餐白胺酸 ≥ 2.7 克。',
    training_focus_zh: '維持原有高品質訓練，但提升大重量複合組的動作專注度。',
    expected_timeline_zh: '飲食修正後短短 4-8 週，充血感、肌肉飽滿度與肌肉硬度發生肉眼可見的立體蛻變。',
  },
];

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 蛋白質時序與白胺酸閾值 (Leucine Trigger) 協議
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const LEUCINE_MPS_PROTOCOLS = {
  daily_target_recomp: '1.8 - 2.4 g/kg 體重 (減脂期建議偏向高標 2.2-2.4 g/kg 以抵禦皮質醇分解)',
  leucine_trigger_threshold: '每餐 2.7 - 3.2 克白胺酸 (依年齡與體重遞增，年長者需 3.5g 克服同化抗性)',
  optimal_meals_per_day: '3 - 5 餐 (每餐間隔 3.5 - 5 小時，重置 MPS 難治期 Refractory Period)',
  protein_distribution_rule: '每餐 0.40 - 0.55 g/kg 體重優質完整蛋白質',
  pre_bed_casein_protocol: '睡前 30-45 分鐘補充 30-40 克慢速消化酪蛋白或希臘優格，維持夜間 7-8 小時睡眠修復期之 MPS 不歸零。',
  common_leucine_sources: [
    { food_zh: '分離乳清蛋白 (1 份 30g)', leucine_g: '3.0 - 3.5 g', note: '吸收極快，30-60分鐘達 MPS 峰值' },
    { food_zh: '無皮雞胸肉 (熟重 150g)', leucine_g: '3.2 g', note: '高性價比、低脂肪優質蛋白金標準' },
    { food_zh: '特選牛後腿肉/瘦牛肉 (熟重 150g)', leucine_g: '3.4 g', note: '天然富含肌酸 (Creatine)、鐵與維生素 B12' },
    { food_zh: '雞蛋 (全蛋 4 顆約 200g)', leucine_g: '2.8 g', note: '生物利用率 (BV) 滿分，蛋黃富含膽鹼與維生素 D' },
    { food_zh: '板豆腐/非基改大豆 (300g)', leucine_g: '2.4 g', note: '純素食者可適度增加分量或搭配白胺酸補劑補足' },
    { food_zh: '希臘優格 (無糖脫脂 200g)', leucine_g: '2.6 g', note: '天然富含 80% 慢釋酪蛋白與活性益生菌' },
  ],
};

