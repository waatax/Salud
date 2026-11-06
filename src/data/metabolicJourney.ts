/** Focused learning paths. References checked 2026-11-05; no individual prescriptions. */
export const METABOLIC_REFERENCES = {
  bp: { title: '國健署：722 居家血壓', url: 'https://www.mohw.gov.tw/cp-7401-87239-1.html' },
  glucose: { title: 'NIDDK：血糖檢驗與診斷', url: 'https://www.niddk.nih.gov/health-information/diabetes/overview/tests-diagnosis' },
  lipids: { title: 'ACC／AHA 2026 血脂指引', url: 'https://professional.heart.org/en/science-news/2026-guideline-on-the-management-of-dyslipidemia/top-things-to-know' },
  dash: { title: 'NHLBI：DASH 飲食', url: 'https://www.nhlbi.nih.gov/health/dash-eating-plan' },
  plate: { title: 'CDC：餐盤法與份量', url: 'https://www.cdc.gov/diabetes/healthy-eating/diabetes-meal-planning.html' },
  move: { title: 'WHO：身體活動建議', url: 'https://www.who.int/europe/news-room/fact-sheets/item/physical-activity' },
  label: { title: 'Zepbound 美國仿單（2026-08）', url: 'https://pi.lilly.com/us/zepbound-uspi.pdf' },
} as const;

export const METABOLIC_PATHS = [
  {
    id: 'report', label: '健檢有紅字', title: '先量準，再看整體風險',
    summary: '體重、血壓、血糖、血脂一起看；每個數字的診斷門檻與治療目標並不相同。',
    concept: 'BMI 是篩檢工具；腰圍反映腹部脂肪線索。即使體重正常，也可能有糖尿病或遺傳性高血脂。',
    actions: ['記下健檢日期、空腹狀態與目前用藥；帶原始報告回診。', '量血壓前坐著休息 5 分鐘，採早晚、每回兩遍、連續七天的 722 紀錄。', 'HbA1c ≥6.5% 或空腹血糖 ≥126 mg/dL 是糖尿病診斷門檻；沒有典型症狀時通常需再次檢驗確認。'],
    caution: '腎病、貧血、懷孕等狀況會影響檢驗解讀。目標還需考慮年齡、心血管病史、低血糖與衰弱風險。',
    next: '看懂我的體重與三高', hash: 'cardiometabolic/THREE_HIGHS', refs: ['bp', 'glucose', 'lipids'],
  },
  {
    id: 'habits', label: '想減脂保肌', title: '讓吃與動，變成能持續的日常',
    summary: '先做少數可維持的改變，再用體重趨勢、腰圍、肌力與三高確認效果。',
    concept: '體重下降需要長期能量赤字；飲食品質影響血壓、血脂與飽足感，阻力訓練幫助維持肌力。',
    actions: ['含糖飲換水或無糖飲；外食醬汁分開、少喝湯，主食優先選全穀。', '每餐安排豆、魚、蛋或瘦肉；不因食慾下降就只吃蔬果或跳過整餐。', '從能耐受的短時間走路開始，逐步朝每週 150–300 分鐘中等強度活動，另安排至少兩天肌力訓練。'],
    caution: '腎功能異常、衰弱、飲食疾患或使用易低血糖藥物者，熱量、蛋白質與運動計畫需個別調整。',
    next: '深入增肌與減脂', hash: 'obesity/HYPERTROPHY', refs: ['dash', 'move'],
  },
  {
    id: 'medicine', label: '考慮瘦瘦針', title: '猛健樂：把效益、風險與維持一起談',
    summary: 'Tirzepatide 同時作用於 GIP 與 GLP-1 受體。適合誰、能否吃得下與長期維持，比追求最高劑量更重要。',
    concept: '美國肥胖治療條件為成人 BMI ≥30，或 ≥27 且有體重相關共病；台灣以當地核准適應症、筆型仿單與醫師判斷為準。',
    actions: ['先整理病史、用藥、備孕與費用承擔；甲狀腺髓質癌本人／家族史、MEN 2 或嚴重過敏史是重要禁忌。', '每週一次、2.5 mg 起始；每次加量前至少四週，由醫師依反應與耐受度決定。起始劑量不是維持劑量。', '保留完整飲食與阻力訓練；合用胰島素或磺醯尿素時，預先討論低血糖監測與藥物調整。'],
    caution: '不要自行併用其他 GLP-1 藥物、分裝、數筆針刻度調量或拉長間隔。懷孕、持續劇烈腹痛或嚴重過敏需立即處理。',
    next: '閱讀猛健樂 12 節完整指南', hash: 'obesity/TIRZEPATIDE_PROTOCOL', refs: ['label'],
  },
  {
    id: 'maintain', label: '正在用藥／停滯', title: '用趨勢決定下一步，別被單日數字帶走',
    summary: '追蹤效果包含體重、腰圍、功能、三高、營養與副作用；維持成果也是治療的一部分。',
    concept: '每天體重會受水分、鹽分與排便影響。停滯時先核對紀錄與生活變化，再和醫師討論療程。',
    actions: ['在相近時間與條件量體重，觀察數週趨勢；另記腰圍與訓練表現。', '記錄噁心、嘔吐、進食與飲水狀況；血壓、血糖下降時帶紀錄請醫師評估原有用藥。', '停藥或減量前約定追蹤時間與回診條件，討論長期費用、食慾回升與維持策略。'],
    caution: '試驗平均不是個人預測；不應為了單週沒變瘦而自行升劑量。降脂藥是否續用，要看心血管風險與 LDL 目標。',
    next: '查看追蹤與長期維持', hash: 'obesity/TIRZEPATIDE_PROTOCOL', refs: ['label', 'lipids'],
  },
] as const;

export const METABOLIC_WEEK_TASKS = [
  '整理健檢報告與完整用藥清單',
  '安排一週居家血壓紀錄',
  '選一項飲食替換，記錄是否做得到',
  '排入兩次適合自己的肌力活動',
  '約定需要追蹤的數字與下次回診時間',
] as const;
