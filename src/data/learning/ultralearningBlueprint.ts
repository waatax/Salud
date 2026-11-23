/**
 * ultralearningBlueprint.ts — Cognitive-science mastery layer for Salud (v6.14).
 *
 * Grounded in Scott H. Young's *Ultralearning* (9 Principles: Metalearning, Focus,
 * Directness, Drill, Retrieval, Feedback, Retention, Intuition, Experimentation)
 * and *Get Better at Anything* (See → Do → Feedback: Worked Examples, Tacit Knowledge
 * Unpacking, Difficulty Sweet Spot, Variability Over Repetition, Unlearning).
 *
 * Every hash link in this file is verified by unit tests against `parseHash`.
 */

export interface WorkedExampleStep {
  label_zh: string;
  expertThought_zh: string;
  action_zh: string;
}

export interface WorkedExample {
  id: string;
  category: 'nutrition' | 'checkup' | 'oil' | 'sleep';
  categoryLabel_zh: string;
  title_zh: string;
  situation_zh: string;
  tacitTrap_zh: string;
  steps: WorkedExampleStep[];
  takeaway_zh: string;
  tryNext_zh: string;
  links: Array<{ label_zh: string; hash: string }>;
}

/**
 * Part I — SEE (看範例、把專家的隱性知識攤開來看)
 * Worked examples drastically lower cognitive load for beginners and make expert
 * reasoning visible before the learner practices on their own.
 */
export const WORKED_EXAMPLES: WorkedExample[] = [
  {
    id: 'WE-BENTO',
    category: 'nutrition',
    categoryLabel_zh: '外食營養拆解',
    title_zh: '打開 120 元排骨便當，30 秒做出科學調整',
    situation_zh: '中午買了一個常見炸排骨便當：大碗白飯、一塊炸排骨、三格配菜（炒高麗菜、螞蟻上樹冬粉、滷豆干絲）。',
    tacitTrap_zh: '新手常以為「三格配菜都是蔬菜」或「把飯全倒掉才健康」——其實冬粉與馬鈴薯屬於全穀雜糧（澱粉），而炸衣吸滿回鍋油才是主要熱量與氧化油脂來源。',
    steps: [
      {
        label_zh: '1. 先辨認真正的六大類',
        expertThought_zh: '把配菜裡的「冬粉」歸回主食類，真正蔬菜只剩高麗菜一格（遠少於飯量）。',
        action_zh: '辨識完畢：澱粉超標、蔬菜偏少、蛋白質夠但帶油炸外皮。',
      },
      {
        label_zh: '2. 用「我的餐盤」做最小幅調整',
        expertThought_zh: '不需要拒吃便當；只要調整比例與烹調方式，就能天天做得到。',
        action_zh: '下次改點「滷雞腿／烤鯖魚／蒜泥白肉」，請老闆飯減半，另外單點一份燙青菜不淋肉燥。',
      },
      {
        label_zh: '3. 調整進食順序壓平血糖',
        expertThought_zh: '膳食纖維與蛋白質先進入小腸，能延緩胃排空並刺激 GLP-1，顯著削平餐後血糖尖峰。',
        action_zh: '先吃高麗菜與燙青菜 → 再吃豆干與主菜 → 最後吃飯，餐後散步 10 分鐘。',
      },
    ],
    takeaway_zh: '學會拆解「隱形澱粉」與「烹調油脂」，外食族不用自己煮也能吃出均衡餐盤。',
    tryNext_zh: '今天下一餐拍下或觀察你的餐盤 10 秒，找出飯、菜、豆魚蛋肉各占多少。',
    links: [
      { label_zh: '我的餐盤入門課', hash: 'learn/eat/L-EAT-01' },
      { label_zh: '蛋白質怎麼吃夠', hash: 'learn/eat/L-EAT-02' },
      { label_zh: '飲食法比較', hash: 'diet/patterns' },
    ],
  },
  {
    id: 'WE-LABS',
    category: 'checkup',
    categoryLabel_zh: '健檢數字判讀',
    title_zh: 'LDL 128「沒紅字」，為什麼醫師還是提醒小心心血管？',
    situation_zh: '42 歲上班族健檢：LDL-C 128 mg/dL（報告寫正常）、三酸甘油酯 TG 225 mg/dL、HDL 38 mg/dL、空腹血糖 106 mg/dL、腰圍 93 公分。',
    tacitTrap_zh: '新手只看單項有沒有紅字，忽略了「高 TG + 低 HDL + 粗腰圍」會讓 LDL 變成小而緻密（sdLDL），真正致病的顆粒總數（ApoB）其實已經偏高。',
    steps: [
      {
        label_zh: '1. 先算代謝症候群五項中了幾項',
        expertThought_zh: '腰圍 ≥90cm（中）、TG ≥150（中）、HDL <40（中）、空腹血糖 ≥100（中）——已符合 4 項！',
        action_zh: '確認為代謝症候群與糖尿病前期，核心問題是胰島素阻抗與內臟脂肪。',
      },
      {
        label_zh: '2. 看 TG/HDL 比值與非 HDL 膽固醇',
        expertThought_zh: 'TG/HDL = 225 / 38 ≈ 5.9（理想 <2.0），強烈提示 sdLDL 偏多；單看 LDL-C 會低估風險。',
        action_zh: '回診時主動詢問醫師是否加驗 ApoB 與糖化血色素（HbA1c），並用 722 量一週居家血壓。',
      },
      {
        label_zh: '3. 抓住最高槓桿的三個行動',
        expertThought_zh: '高三酸甘油酯對「含糖飲料、精製澱粉、酒精」和「內臟脂肪」最敏感。',
        action_zh: '戒除含糖飲料與宵夜、每週 150 分鐘快走 + 2 次肌力、目標 3–6 個月減重 5–7% 後複驗。',
      },
    ],
    takeaway_zh: '健檢數字要「連起來看」：腰圍、血糖、TG、HDL 與血壓背後指向同一條胰島素阻抗軸線。',
    tryNext_zh: '拿出自己最近一次健檢報告，在報告快查輸入數字看代謝症候群落點。',
    links: [
      { label_zh: '看懂健檢報告', hash: 'checkup' },
      { label_zh: 'ApoB 與血脂不一致性', hash: 'cardiometabolic/LIPIDS_APOB' },
      { label_zh: '代謝症候群小課', hash: 'learn/prevent/L-PRE-01' },
    ],
  },
  {
    id: 'WE-OIL',
    category: 'oil',
    categoryLabel_zh: '廚房用油實戰',
    title_zh: '家裡該買幾罐油？涼拌、中火炒菜、氣炸鍋怎麼選',
    situation_zh: '逛超市看到特級初榨橄欖油、苦茶油、玄米油、大豆沙拉油、豬油、椰子油，不知道買哪一罐才安全又健康。',
    tacitTrap_zh: '常見兩大迷思：①「橄欖油發煙點低不能炒菜」（其實特級初榨橄欖油多酚抗氧化力強，發煙點約 190–210°C，家常中小火快炒很穩定）；②「椰子油最健康」（飽和脂肪高達 ~82%，會推升 LDL-C）。',
    steps: [
      {
        label_zh: '1. 先看脂肪酸結構（心血管優先）',
        expertThought_zh: '優先選「單元不飽和脂肪（MUFA）高、飽和脂肪低」的油：特級初榨橄欖油、苦茶油、酪梨油、芥花油。',
        action_zh: '把動物油（豬油、奶油）與椰子油／棕櫚油降為偶爾提香，不當日常主力。',
      },
      {
        label_zh: '2. 再對照烹調溫度與穩定度',
        expertThought_zh: '水炒／中火炒菜約 140–180°C；高溫煎炸或 200°C 氣炸需要精製高發煙點油，更要避免重複使用回鍋油。',
        action_zh: '家庭最省心「兩罐配置」：特級初榨橄欖油（涼拌、水炒、中小火）＋精製芥花油／酪梨油／苦茶油（高溫煎炒）。',
      },
      {
        label_zh: '3. 控制用量與保存',
        expertThought_zh: '再好的油 1 茶匙仍是 45 大卡；照光受熱會加速氧化油耗。',
        action_zh: '選深色玻璃瓶、放陰涼櫃內避開瓦斯爐旁，每次倒油有意識估計茶匙數。',
      },
    ],
    takeaway_zh: '挑油看兩件事：「不飽和脂肪比例」決定心血管影響，「氧化穩定度＋不反覆高溫」決定烹調安全。',
    tryNext_zh: '去廚房看一眼目前用的油瓶成分表，查查看它在 16 種食用油對照表的位置。',
    links: [
      { label_zh: '脂肪與食用油專章', hash: 'O' },
      { label_zh: '健康脂肪小課', hash: 'learn/eat/L-EAT-04' },
    ],
  },
  {
    id: 'WE-SLEEP',
    category: 'sleep',
    categoryLabel_zh: '睡眠問題排解',
    title_zh: '躺 9 小時卻只睡 6 小時：用睡眠效率找出失眠關鍵',
    situation_zh: '最近晚上 10:30 上床滑手機，翻到 12:30 才睡著，半夜醒兩次共 1 小時，早上 7:30 起床，白天一直靠下午 4 點的拿鐵撐著。',
    tacitTrap_zh: '失眠的人常「提早上床補眠」想多躺久一點，結果把床和大腦的清醒焦慮綁在一起，反而讓睡眠越碎裂。',
    steps: [
      {
        label_zh: '1. 先算睡眠效率（SE）',
        expertThought_zh: '在床時間（TIB）= 9 小時；實際睡著（TST）= 6 小時 → SE = 6 / 9 = 66.7%（理想目標 ≥85%）。',
        action_zh: '找出真正問題：在床時間遠超過實際睡眠能力，加上下午 4 點的咖啡因在睡前仍殘留近一半。',
      },
      {
        label_zh: '2. 切斷咖啡因與光照干擾',
        expertThought_zh: '咖啡因平均半衰期約 5–7 小時；下午 4 點喝，晚上 10 點仍佔據腦中腺苷受體，偷走 N3 慢波深睡。',
        action_zh: '咖啡改到中午前喝完；早上固定時間起床並曬自然光 10–15 分鐘定錨生理時鐘。',
      },
      {
        label_zh: '3. 套用 CBT-I 刺激控制原則',
        expertThought_zh: '讓大腦重新建立「床 = 睡覺」的條件反射，比硬躺更有效。',
        action_zh: '有明顯睡意才上床；躺超過 20 分鐘睡不著就起身到微暗處做平靜活動，想睡再回床。',
      },
    ],
    takeaway_zh: '好睡眠靠「固定起床時間＋足夠睡眠驅力＋床只用來睡覺」，不是靠提早躺床硬撐。',
    tryNext_zh: '記三天睡眠日記（幾點上床、大約幾點睡著、幾點醒、白天精神），帶進 CBT-I 試算器。',
    links: [
      { label_zh: '睡眠入門課', hash: 'learn/rest/L-REST-01' },
      { label_zh: 'CBT-I 睡眠效率試算', hash: 'sleep/CBTI_CALC' },
      { label_zh: '咖啡因清除模擬器', hash: 'sleep/CAFFEINE_SIM' },
    ],
  },
];

export interface SynthesisChain {
  id: string;
  title_zh: string;
  subtitle_zh: string;
  nodes: Array<{ domain_zh: string; text_zh: string }>;
  coreInsight_zh: string;
  feynmanPrompt_zh: string;
  links: Array<{ label_zh: string; hash: string }>;
}

/**
 * Ultralearning Principle 8 (Intuition — Dig Deep Before Building Up):
 * Connect isolated health facts into causal cross-domain chains so the learner
 * truly achieves 融會貫通 (integrated understanding across nutrition, exercise,
 * sleep, physiology, and lab markers).
 */
export const SYNTHESIS_CHAINS: SynthesisChain[] = [
  {
    id: 'CHAIN-GLUCOSE',
    title_zh: '一條線看懂：飲食順序 × 飯後散步 × 血脂與血管',
    subtitle_zh: '為什麼「先菜後飯＋走 10 分鐘」不只降血糖，還保護心臟？',
    nodes: [
      { domain_zh: '飲食策略', text_zh: '先吃蔬菜與蛋白質、減少含糖飲與精製澱粉' },
      { domain_zh: '運動生理', text_zh: '餐後 10–15 分鐘散步，骨骼肌啟動非胰島素 GLUT4 通道吸走血糖' },
      { domain_zh: '內分泌代謝', text_zh: '餐後血糖尖峰下降，胰臟不必過量分泌胰島素，肝臟減少把多餘糖轉成三酸甘油酯' },
      { domain_zh: '健檢與血管', text_zh: '三酸甘油酯下降、sdLDL 與 ApoB 減少 → 延緩動脈粥狀硬化與脂肪肝' },
    ],
    coreInsight_zh: '控糖、降三酸甘油酯、護血管不是三件分開的事，而是同一條「胰島素敏感度」主幹道上的四個站點。',
    feynmanPrompt_zh: '試著用 20 秒跟家人解釋：為什麼吃飽飯去散步 10 分鐘，連膽固醇和脂肪肝都會一起變好？',
    links: [
      { label_zh: '醣、糖與纖維', hash: 'learn/eat/L-EAT-03' },
      { label_zh: '血糖三指標', hash: 'learn/checkup/L-CHK-03' },
      { label_zh: '體重與三高指南', hash: 'cardiometabolic/THREE_HIGHS' },
    ],
  },
  {
    id: 'CHAIN-MUSCLE',
    title_zh: '一條線看懂：蛋白質 × 肌力訓練 × 骨骼與抗老',
    subtitle_zh: '為什麼防跌倒、控血糖、防骨鬆都要練肌肉？',
    nodes: [
      { domain_zh: '營養原料', text_zh: '三餐分散攝取足夠蛋白質（約 1.2–1.6 g/kg，含白胺酸）＋鈣與維生素 D' },
      { domain_zh: '機械訊號', text_zh: '每週 2 次漸進阻力訓練，對肌肉與骨骼施加安全張力' },
      { domain_zh: '內分泌器官', text_zh: '收縮的骨骼肌分泌肌激素（Myokines），提升全身胰島素敏感度並刺激造骨細胞' },
      { domain_zh: '健康餘命', text_zh: '維持最大肌力與發力率（RFD），老後仍能提重物、爬樓梯、瞬間站穩防骨折' },
    ],
    coreInsight_zh: '光吃蛋白質不重訓，身體沒有「蓋房子」的訊號；光重訓不吃夠蛋白質，沒有磚塊——兩者合起來才能同時鎖住肌肉、骨密度與代謝。',
    feynmanPrompt_zh: '試著解釋：為什麼長輩只喝牛奶補鈣、每天只慢走，還不足以預防肌少與骨鬆？',
    links: [
      { label_zh: '蛋白質怎麼吃', hash: 'learn/eat/L-EAT-02' },
      { label_zh: '肌力與肌耐力', hash: 'learn/move/L-MOVE-08' },
      { label_zh: '骨質疏鬆專章', hash: 'spine/OSTEOPOROSIS' },
    ],
  },
  {
    id: 'CHAIN-SLEEP',
    title_zh: '一條線看懂：晨光 × 睡眠 × 食慾與大腦排毒',
    subtitle_zh: '為什麼睡不好隔天特別想吃甜食，還容易變胖又記不住？',
    nodes: [
      { domain_zh: '晝夜節律', text_zh: '固定起床＋早晨自然光定錨下視丘 SCN，倒數 14–16 小時釋放褪黑激素' },
      { domain_zh: '慢波深睡', text_zh: '夜間進入充足 N3 慢波睡眠，腦部膠淋巴系統（AQP4）沖刷代謝廢物並分泌生長激素' },
      { domain_zh: '荷爾蒙平衡', text_zh: '睡眠不足會讓飢餓素（Ghrelin）上升、瘦體素（Leptin）下降，同時短期降低胰島素敏感度' },
      { domain_zh: '隔日行為', text_zh: '睡得好 → 前額葉自制力穩、高糖渴望低、運動恢復快，吃動睡形成正向飛輪' },
    ],
    coreInsight_zh: '飲食控制破功很多時候不是意志力差，而是前幾天沒睡好導致飢餓荷爾蒙與前額葉訊號失衡。',
    feynmanPrompt_zh: '試著解釋：為什麼想減脂或控血糖的人，常常要先從「固定起床時間與早點停咖啡」開始？',
    links: [
      { label_zh: '為什麼睡飽還是累', hash: 'learn/rest/L-REST-01' },
      { label_zh: '睡眠知識點全圖', hash: 'sleep/ATLAS' },
      { label_zh: '膠淋巴大腦排毒', hash: 'sleep/GLYMPHATIC' },
    ],
  },
  {
    id: 'CHAIN-BP',
    title_zh: '一條線看懂：減鈉補鉀 × 722 量血壓 × 保護腦心腎',
    subtitle_zh: '為什麼「沒感覺」的高血壓是腦中風與洗腎頭號推手？',
    nodes: [
      { domain_zh: '飲食環境', text_zh: '外食湯底、醬料與加工食品藏大量鈉；天然蔬果與豆類提供鉀協助排鈉' },
      { domain_zh: '血管壓力', text_zh: '長期高血壓像高壓水柱沖刷血管內皮，傷害腦微血管、冠狀動脈與腎絲球' },
      { domain_zh: '真實回饋', text_zh: '用 722 居家血壓（連 7 天、早晚 2 次、每次 2 遍）取得穩定平均，揪出隱匿性高血壓' },
      { domain_zh: '多管齊下', text_zh: 'DASH 飲食＋減鈉＋有氧與肌力＋必要時按時服藥，每降 10 mmHg 都大幅降低中風與腎病風險' },
    ],
    coreInsight_zh: '高血壓多數沒有症狀，不能靠「頭暈不暈」判斷；722 居家量測就是你的真實世界回饋儀表板。',
    feynmanPrompt_zh: '試著解釋：為什麼血壓藥不是「傷腎」，反而「放著高血壓不管」才會讓腎臟壞掉？',
    links: [
      { label_zh: '血壓偏高怎麼量', hash: 'learn/checkup/L-CHK-02' },
      { label_zh: '高血壓生活調整', hash: 'learn/prevent/L-PRE-02' },
      { label_zh: '722 居家血壓工具', hash: 'cardiometabolic/BP_722' },
    ],
  },
];

export interface MetalearningPillar {
  kind: 'concepts' | 'facts' | 'procedures';
  title_zh: string;
  en: string;
  principle_zh: string;
  howToMaster_zh: string;
  examples_zh: string[];
  links: Array<{ label_zh: string; hash: string }>;
}

/**
 * Ultralearning Principle 1 (Metalearning — Concepts / Facts / Procedures):
 * Separate what needs to be UNDERSTOOD, MEMORIZED, and PRACTICED.
 */
export const METALEARNING_MAP: MetalearningPillar[] = [
  {
    kind: 'concepts',
    title_zh: '觀念（要「懂原理」）',
    en: 'Concepts — Understand',
    principle_zh: '不用死背，用生活比喻、人體圖解與費曼法講通「為什麼」。',
    howToMaster_zh: '讀完一課後閉上眼睛，試著用兩句白話講給不懂醫學的家人聽；卡住的地方就是還不夠懂的地方。',
    examples_zh: ['胰島素阻抗如何同時影響血糖、腰圍與脂肪肝', '最大肌力為何決定老後的活動天花板', '為什麼睡眠驅力＋生理時鐘共同決定入睡品質'],
    links: [
      { label_zh: '八大人體系統圖解', hash: 'systems' },
      { label_zh: '知識點全圖（睡/肌/老）', hash: 'longevity/ATLAS' },
    ],
  },
  {
    kind: 'facts',
    title_zh: '事實（要「記準門檻」）',
    en: 'Facts — Retrieve & Retain',
    principle_zh: '關鍵數字與警訊靠「以考代學＋間隔複習」進長期記憶，不要重複劃重點。',
    howToMaster_zh: '利用下方的間隔複習與跨主題混搭閃卡，答錯的數字隔天再考一次，答對的拉長到 3 天、7 天、21 天。',
    examples_zh: ['居家血壓 130/80、空腹血糖 100/126、HbA1c 5.7/6.5%', '成人蛋白質約 1.2–1.6 g/kg、添加糖 <10% 熱量', '台灣 30 歲起公費成人健檢與 119 急診紅旗警訊'],
    links: [
      { label_zh: '看懂健檢數值', hash: 'checkup' },
      { label_zh: '迷思是非快閃', hash: 'learn/flashcards' },
    ],
  },
  {
    kind: 'procedures',
    title_zh: '程序（要「直接做」）',
    en: 'Procedures — Direct Practice',
    principle_zh: '光懂理論不會變健康；要在真實餐桌、運動場與臥室裡做「直接練習」。',
    howToMaster_zh: '一次只選 1–2 個微行動加入「我的行動計畫」，連續 7 天收集真實身體回饋，做不到就縮小難度再試。',
    examples_zh: ['打開便當 10 秒檢查菜飯比例與進食順序', '用說話測試找對快走強度，每週安排 2 次居家肌力', '連續 7 天做 722 居家血壓或 3 天睡眠日記'],
    links: [
      { label_zh: '4 週健康啟動計畫', hash: 'start' },
      { label_zh: '生活情境實戰', hash: 'learn/practice' },
    ],
  },
];
