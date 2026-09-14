import {
  ExpertRound,
  DailyProtocolSlot,
  UltraHealthAtomicHabit,
  PhysioExercise,
  MasterySkillTreeNode,
} from '../types';

/**
 * ── 個人超健康 Project (Personal Ultra-Health Project) 核心資料庫 ──
 * 整合 29 席跨領域專家委員會：
 * - 均一教育平台核心團隊 (技術長、知識長、平台規劃長、教育專家)
 * - 醫療專家群 (內科、心臟、新陳代謝、腎臟、成癮毒理、預防醫學)
 * - 醫療知識型網紅 (科普轉譯、白話神比喻、迷思粉碎)
 * - 頂級肌力與體能教練 (漸進超負荷、5大核心動作模式)
 * - 物理治療大師 (動力鏈代償修復、關節活動度、辦公久坐自救)
 * - 5 位戰略專家 (臨床營養師、行為習慣架構師、晝夜節律權威、生物數據工程師、遊戲化體驗設計師)
 */

export const EXPERT_ROUNDS: ExpertRound[] = [
  {
    round: 1,
    title_zh: 'Round 1：底層教育架構與知識圖譜拓撲重構',
    title_en: 'Round 1: Educational Architecture & Knowledge Graph Topology',
    theme_zh: '打破「衛教看了就忘」的詛咒，導入均一精熟學習 (Mastery Learning) 與原子化知識點 (Atomic KPs)',
    lead_experts: ['均一教育平台技術長', '均一教育平台知識長', '均一教育平台規劃長', '均一教育專家'],
    core_debates_zh: [
      '傳統健康衛教為何大眾無法吸收？核心在於資訊一次拋出太多（認知超載），且缺乏先備知識鏈與診斷反饋。',
      '如何確保使用者不跳級嘗試危險養生法？必須像學微積分前先學代數一樣，建立知識依賴拓撲（Prerequisite Graph）。',
      '如何檢驗使用者「真的懂機轉」而不是死記硬背？必須配置自適應微型測驗（Formative Assessment）來驗證掌握度。'
    ],
    breakthrough_consensus_zh: [
      '確立「原子化知識單元 (KP)」為核心基準，每單元閱讀時間 ≤ 2 分鐘，只講透 1 個關鍵生理機制。',
      '架設「均一精熟學習技能樹 (Mastery Skill Tree)」，分層為 L1 基礎認知、L2 核心機轉、L3 生活實踐、SAFETY 臨床安全閘。',
      '使用者每掌握一個模組，即時點亮技能節點並計算掌握度星星，打造教育科技等級的正向學習反饋閉環。'
    ],
    methodology_outputs_zh: [
      '個人超健康技能樹拓撲架構（涵蓋水合、油脂、酒精、運動物治、睡眠晝夜 5 大分支）',
      '雙向先備知識驗證機制（解鎖高階動作或斷食前，必須先掌握基礎能量與電解質平衡）',
      '30 秒即時形成性自適應反饋引擎'
    ]
  },
  {
    round: 2,
    title_zh: 'Round 2：全人醫學機轉深化與絕對安全防護閘',
    title_en: 'Round 2: Clinical Mechanisms & Inviolable Safety Guardrails',
    theme_zh: '杜絕偽科學與極端偏方，為全人超健康築起 4 大無懈可擊的臨床安全防線',
    lead_experts: ['醫療總監', '心臟內科專家', '新陳代謝專家', '腎臟電解質權威', '成癮肝膽毒理專家'],
    core_debates_zh: [
      '坊間養生法常提倡「多喝水沒事」、「完全不吃油」、「喝紅酒護心」，這些盲點在臨床上造成嚴重傷害。',
      '心衰竭與透析患者盲目補水會導致急性肺水腫；極端限油會引發脂溶性維生素缺乏與膽結石；紅酒白藜蘆醇劑量過低，酒精一級致癌物卻百分之百致癌。',
      '如何將「臨床指引」轉化為「演算法安全閘」？'
    ],
    breakthrough_consensus_zh: [
      '立下 4 大不可妥協臨床安全閘：限水族群紅旗警報閘、ASCVD 等熱量換油模型、ALDH2 亞洲臉紅基因致癌禁令、運動型低血鈉 (EAH) 警示。',
      '全系統輸出徹底廢除「虛假身體年齡評分」，所有建議必須標註證據等級 (GRADE A–E) 與生理適用邊界。',
      '多重慢性病（三高、肝腎）跨維度交互作用審核機制，防止單一建議衝突。'
    ],
    methodology_outputs_zh: [
      'Salud 臨床安全防火牆標準（Red Flag Emergency Protocol）',
      '等熱量替代框架與食用油脂肪酸真理光譜',
      '酒精一滴不沾減害原則與 AUDIT-C 臨床篩檢標準流'
    ]
  },
  {
    round: 3,
    title_zh: 'Round 3：肌力體能與關節物理治療實戰動作庫',
    title_en: 'Round 3: Strength Conditioning & Physical Therapy Movement Prescriptions',
    theme_zh: '消滅現代人最大早逝殺手「靜態久坐」與「肌少症」，打造無痛在家即可實踐的動力鏈重置法',
    lead_experts: ['頂級肌力與體能教練', '物理治療大師', '運動生理學專家'],
    core_debates_zh: [
      '久坐 8 小時的人，即使下班去跑 30 分鐘步，心血管與腰椎風險依然顯著偏高（Active Couch Potato 效應）。',
      '很多人想運動卻「越練越痛」，是因為胸椎受限、骨盆前傾、臀肌失憶，運動時動力鏈產生嚴重代償。',
      '如何設計「零器械、辦公室隨時可做、絕不代償」的最高性價比動作？'
    ],
    breakthrough_consensus_zh: [
      '制定「辦公室久坐拯救 3 大筋膜動態重置」：開胸擴背（解胸椎鎖死）、半跪姿髖屈肌伸展（解腰肌緊繃）、蚌殼式/橋式（喚醒死臀）。',
      '確立「超健康人體 5 大基礎動作模式」：深蹲（膝主導）、硬舉/鉸鏈（髖主導）、俯臥撐/推（上肢推）、划船/引體（上肢拉）、抗旋轉核心支撐。',
      '每個動作嚴格標註「常見代償錯誤」與「物理治療自檢口訣」，確保安全無傷。'
    ],
    methodology_outputs_zh: [
      '辦公室久坐 3 分鐘重置 Protocol',
      '超健康 5 大動作模式進階降階指引',
      '關節活動度 (Mobility) 動態自評手冊'
    ]
  },
  {
    round: 4,
    title_zh: 'Round 4：科普轉譯與直覺降維——醫療網紅的白話破局',
    title_en: 'Round 4: Intuitive Translation, Street Analogies & Myth Busting',
    theme_zh: '將晦澀的生化反應轉化為「3 秒直覺神比喻」，正面迎戰社群偽科學與假養生偽謠言',
    lead_experts: ['醫療知識型網紅', '健康傳播科普主筆', '醫學插畫總監'],
    core_debates_zh: [
      '「滲透受器刺激下視丘釋放血管加壓素引導 AQP2 囊泡嵌合」——這句話普通人聽 3 秒就關掉網頁。',
      '如果不能用大白話講清楚，再高深的醫學機轉都無法產生真實公衛影響力。',
      '如何做到既讓國中生聽得懂，又讓醫學系教授挑不出毛病？'
    ],
    breakthrough_consensus_zh: [
      '構建「白話神比喻資料庫」：水通道蛋白 AQP2 ＝ 腎臟海關加開綠色免驗通道；低密度脂蛋白 LDL-C ＝ 裝貨的小卡車，只有氧化破損才會在血管柏油路上起火。',
      '設計「街頭實戰避坑 10 大原則」與「迷思粉碎機 (Myth Buster Cards)」：用紅綠強烈對比直擊假健康謊言。',
      '落實「平視、共情、不說教」的語氣風格，將焦慮轉化為日常掌控感。'
    ],
    methodology_outputs_zh: [
      '白話生活化解碼器 (Plain English Decoders)',
      '街頭迷思對決卡陣列 (Myth vs Clinical Fact)',
      '高對比等距剖面圖解視覺指引'
    ]
  },
  {
    round: 5,
    title_zh: 'Round 5：行為科學微習慣落地與外食族超商實戰',
    title_en: 'Round 5: Behavioral Micro-Habits & Real-World Dining Guide',
    theme_zh: '跨越「知道卻做不到」的鴻溝，用福格行為模型 (B=MAP) 將健康降維至 2 分鐘微行動',
    lead_experts: ['行為科學與微習慣架構大師', '臨床營養學家', '飲食行為顧問'],
    core_debates_zh: [
      '要求一個天天加班的外食族「每天自己備健康餐、天天睡滿8小時、去健身房2小時」，是注定失敗的烏托邦幻想。',
      '意志力是極易耗盡的有限資源，凡是依賴強大意志力維持的健康計畫，95% 會在 3 週內崩潰。',
      '如何利用「微習慣錨點 (Tiny Habit Anchors)」讓健康行為如刷牙般自然發生？'
    ],
    breakthrough_consensus_zh: [
      '打造「14 天個人超健康原子微習慣養成器」：每個微習慣執行時間 ≤ 2 分鐘，必須綁定既有生活錨點（如：早上腳踏下床立刻喝 300ml 水）。',
      '制定「外食族超商與便當實戰指南」：紅黃綠燈點餐法（照妖鏡：避開勾芡、高鈉醬汁、炸皮，選原型蛋白與彩虹纖維）。',
      '結合多巴胺即時獎勵（即時打卡 Confetti 慶祝動畫與連勝記錄），降低啟動阻力至零。'
    ],
    methodology_outputs_zh: [
      '14 天個人超健康原子微習慣矩陣 (Daily 2-Minute Micro-Habits)',
      '便利超商 / 便當自助餐紅黃綠燈點餐攻略',
      '環境重塑防護法（視覺線索暗示與零食隱藏術）'
    ]
  },
  {
    round: 6,
    title_zh: 'Round 6：量化自我、晝夜節律與 24H 超健康生活協議',
    title_en: 'Round 6: Quantified Self, Chronobiology & 24h Daily Protocol',
    theme_zh: '將多維度醫學機轉編織進「地球自轉 24 小時晝夜作息時光軸」，打造終身可運行的動態協議',
    lead_experts: ['晝夜節律與睡眠權威', '生物數據工程師', '環境生理學專家'],
    core_debates_zh: [
      '水、油、運動、睡眠不應是孤立分開的碎片，它們在人體內由生物時鐘（SCN 視交叉上核）同步指揮。',
      '早晨喝水＋戶外光照決定了當晚褪黑激素的釋放時間；午餐碳水份量決定了下午大腦清醒度與傍晚重訓力量表現。',
      '如何為現代人設計一份「隨時間自動切換」的 24 小時動態超健康 Protocol？'
    ],
    breakthrough_consensus_zh: [
      '創立「個人超健康 24 小時動態生活作息協議 (24h Daily Protocol)」：分 5 大時段（晨曦甦醒、正午蓄能、午後運動、黃昏減速、深夜修復）。',
      '串接穿戴裝置數據指標：心率變異度 (HRV)、深層睡眠比例、晨起靜止心率，作為反饋調整作息的指南。',
      '精確規劃皮質醇峰值、光照照射度 (Lux)、咖啡因代謝半衰期禁令線與體溫下降入睡視窗。'
    ],
    methodology_outputs_zh: [
      '24 小時動態時序作息互動矩陣 (Interactive 24h Timeline Protocol)',
      '光照與皮質醇晨峰對齊指南 (Morning Sunlight Protocol)',
      '夜間體溫下降與睡眠驅動力優化手冊'
    ]
  },
  {
    round: 7,
    title_zh: 'Round 7：終審整合、遊戲化沉浸式體驗與平台全體發布',
    title_en: 'Round 7: Final Synthesis, Gamified Immersion & Universal Launch',
    theme_zh: '29 席專家全體終審簽核，將 7 次迭代精華全面落地至 Salud 頂層架構，發布上線',
    lead_experts: ['均一平台規劃長', '遊戲化 UX 專家', '醫療總監', '全體 29 席專家委員會'],
    core_debates_zh: [
      '如何把以上 6 輪會議產生的大量方法論，無縫整合成一個流暢、美麗、不擁擠、高互動性的旗艦產品？',
      '使用者進入 Salud 後，如何在一分鐘內找到專屬自己的超健康起步點？',
      '如何確保代碼品質、無障礙 WCAG 2.2 AA、多語言 (zh-TW / en-US) 與 GitHub Pages 極速載入？'
    ],
    breakthrough_consensus_zh: [
      '在 Salud 頂部導航設立全新旗艦專區「✨ 個人超健康 (Ultra-Health)」，並列於人體系統、飲食、運動、睡眠。',
      '超健康旗艦頁面收斂為 5 大沉浸式互動核心視角：\n' +
        '  1. 🌟 專家 7 次迭代紀要與方法論庫 (Expert Iteration Log)\n' +
        '  2. ⏰ 24H 個人超健康日常作息協議 (Daily Protocol Matrix)\n' +
        '  3. 🎯 14 天原子微習慣養成器 (Atomic Habit Tracker with Confetti)\n' +
        '  4. 🧘 物理治療與肌力體能實戰動作庫 (Physio & Movement Guide)\n' +
        '  5. 🌳 均一式自適應精熟技能樹 (Junyi Mastery Skill Tree)',
      '全體 29 位專家正式具名簽核，確立「實證嚴謹、直覺好懂、極致實用、有手就能做」為 Salud 不可動搖之產品靈魂！'
    ],
    methodology_outputs_zh: [
      'Salud 個人超健康旗艦中樞模組 (UltraHealthHub)',
      '完整全平台雙語國際化與無障礙相容認證',
      '自動化構建與 GitHub Pages 官方部署上線'
    ]
  }
];

export const DAILY_PROTOCOL_SLOTS: DailyProtocolSlot[] = [
  {
    id: 'SLOT-01',
    time_range: '06:30 - 08:00',
    period_label: 'MORNING',
    title_zh: '晨曦甦醒：水合啟動與晝夜光照錨定',
    title_en: 'Awakening: Hydration Ignition & Circadian Light Anchor',
    target_systems: ['腎臟泌尿系統', '神經系統', '消化道'],
    physiological_mechanism_zh: '經過 7-8 小時睡眠不感蒸發失水約 300-500ml，血液黏稠度高；清晨接觸 10,000 Lux 自然光刺激視網膜 ipRGC 細胞，抑制褪黑激素，對齊皮質醇晨峰 (CAR)，啟動生物時鐘。',
    action_checklist_zh: [
      '起床後 10 分鐘內，慢飲 300–450ml 溫水或常溫水，喚醒胃結腸反射與腎小球濾過。',
      '走到戶外或陽台沐浴晨光 10–15 分鐘（陰天 20 分鐘），重設下視丘 SCN 生物時鐘。',
      '若有高血壓或心血管疾病，避免清晨立刻洗冷水澡或劇烈衝刺運動。'
    ],
    expert_advice_zh: '「晨起的第一杯水不是解口渴，而是稀釋濃縮的血漿滲透壓；清晨的光不是照明，而是給大腦發送開機指令。」—— 晝夜節律權威 & 腎臟專科醫師',
    contraindication_warning_zh: '若為洗腎透析或心臟衰竭嚴重限水患者，晨間飲水量需納入全天限額計算，不得暴飲。',
    icon_name: 'Sun'
  },
  {
    id: 'SLOT-02',
    time_range: '08:00 - 09:30',
    period_label: 'MORNING',
    title_zh: '晨間啟能：平穩血糖早餐與深層專注起手',
    title_en: 'Morning Fuel: Low-Glycemic Breakfast & Deep Focus',
    target_systems: ['內分泌系統', '心血管系統'],
    physiological_mechanism_zh: '早晨皮質醇高，若攝取精緻糖（鐵板麵、含糖奶茶）會導致血糖巨幅飆升後暴跌（Reactive Hypoglycemia），引起 10:30 的昏睡與認知霧化。優質蛋白質與不飽和脂肪能刺激 GLP-1 與 PYY 產生穩定飽足感。',
    action_checklist_zh: [
      '外食早餐黃金組合：無糖豆漿/黑咖啡 + 2顆茶葉蛋 + 蒸地瓜/全麥麵包/生菜沙拉。',
      '拒絕含糖大冰奶、奶酥厚片、油條炸物等高飽和脂肪兼精緻糖地雷。',
      '咖啡因攝取延遲至起床後 60–90 分鐘，待體內累積的腺苷自然清除，避免午後斷崖式崩潰。'
    ],
    expert_advice_zh: '「把高碳水精緻甜食當早餐，是在逼你的胰島細胞在清晨就跑百米衝刺。」—— 新陳代謝內分泌專家',
    icon_name: 'Coffee'
  },
  {
    id: 'SLOT-03',
    time_range: '10:00 - 12:00',
    period_label: 'NOON',
    title_zh: '辦公攻堅：微動態抗久坐與視神經減壓',
    title_en: 'Desk Defense: Micro-Movements & Optic Decompression',
    target_systems: ['骨骼肌肉系統', '循環系統'],
    physiological_mechanism_zh: '連續久坐超過 45 分鐘，下肢靜脈血液滯留，大肌群脂蛋白脂酶 (LPL) 活性下降 90%，脊椎間盤持續受壓，髂腰肌緊縮引發骨盆前傾與下背痛。',
    action_checklist_zh: [
      '番茄鐘每 45 分鐘站立 2 分鐘，喝 50ml 水，完成 10 次提踵（小腿幫浦回流）或站立後踢腿。',
      '執行「辦公室胸椎旋轉伸展」，解鎖鍵盤手與駝背造成的胸椎卡死。',
      '20-20-20 法則：每 20 分鐘遠眺 20 英尺（6公尺）外 20 秒，放鬆睫狀肌。'
    ],
    expert_advice_zh: '「久坐不是放鬆，而是在對你的髖關節與腰椎進行慢速折彎疲勞測試。」—— 物理治療大師',
    icon_name: 'Activity'
  },
  {
    id: 'SLOT-04',
    time_range: '12:00 - 13:30',
    period_label: 'NOON',
    title_zh: '正午代謝：彩虹原型午餐與餐後消糖散步',
    title_en: 'Midday Metabolism: Rainbow Plate & Post-Meal Stroll',
    target_systems: ['消化系統', '代謝循環'],
    physiological_mechanism_zh: '進食順序「水 → 肉（蛋白）→ 菜（纖維）→ 飯（碳水）」能顯著延緩胃排空速度，平抑餐後血糖峰值 30% 以上。餐後輕度活動可直接利用 GLUT4 非胰島素依賴性通道消耗葡萄糖。',
    action_checklist_zh: [
      '便當自助餐點餐守則：半碗原型米飯、一掌心優質肉魚豆類、兩拳頭深綠/彩虹蔬菜。',
      '避開勾芡羹湯、炸排骨外裹厚粉、過油炒青菜（可用熱清湯稍過油）。',
      '吃飽後切忌立刻趴睡！起立輕鬆散步 10–15 分鐘，抹平餐後血糖尖峰。'
    ],
    expert_advice_zh: '「餐後散步 10 分鐘的控糖效果，堪比吃半顆初階降糖藥物，且完全無副作用。」—— 臨床營養學家',
    icon_name: 'Utensils'
  },
  {
    id: 'SLOT-05',
    time_range: '14:00 - 17:00',
    period_label: 'AFTERNOON',
    title_zh: '午後專注：水分勻速補充與咖啡因截止線',
    title_en: 'Afternoon Flow: Steady Hydration & Caffeine Curfew',
    target_systems: ['腎臟泌尿系統', '神經系統'],
    physiological_mechanism_zh: '下午是腎臟最高效排泄期，水分應均勻分次補充，避免膀胱過度膨脹；咖啡因在人體內平均半衰期為 5–7 小時，14:00 後攝入會直接阻斷夜間深度睡眠 SWS。',
    action_checklist_zh: [
      '保持桌上有水瓶，每小時慢啜 100–150ml，觀察排尿顏色維持在 1–3 級淡檸檬黃。',
      '下午 14:00 起實施「咖啡因門禁」，停止飲用咖啡、濃茶與能量飲料，改喝麥茶、洋甘菊或白開水。',
      '若感睏倦，進行 15–20 分鐘閉目養神（Power Nap），勿超過 30 分鐘以免進入深睡出現睡眠慣性。'
    ],
    expert_advice_zh: '「下午兩點後的那杯冰美式，不是借未來的精神，而是預支今晚的黃金睡眠期。」—— 睡眠醫學權威',
    icon_name: 'Clock'
  },
  {
    id: 'SLOT-06',
    time_range: '17:30 - 19:00',
    period_label: 'EVENING',
    title_zh: '傍晚巔峰：黃金體溫期阻力與動力鏈鍛鍊',
    title_en: 'Evening Peak: Peak Body Temperature Strength & Mobility',
    target_systems: ['運動骨骼系統', '心血管系統'],
    physiological_mechanism_zh: '下午 17:00–19:00 人體核心體溫與肌肉彈性處於一天最高點，關節滑液充沛，神經肌肉傳導速度最快，是進行肌力訓練與高強度活動、受傷風險最低的黃金視窗。',
    action_checklist_zh: [
      '進行 30–45 分鐘肌力訓練：深蹲、硬舉/橋式、伏地挺身、引體/划船、棒式抗旋轉。',
      '運動前後補足水分，高出汗量環境下每公斤體重流失補水 1.25–1.5L，並適度補充鈉電解質。',
      '運動後 45 分鐘內補充優質蛋白質（20–30g）與適量碳水，促進肌蛋白合成 (MPS)。'
    ],
    expert_advice_zh: '「肌肉是人體最大的血糖海綿與自帶的抗衰老裝甲，每週兩次全身阻力訓練是超健康的基石。」—— 頂級肌力與體能教練',
    icon_name: 'Dumbbell'
  },
  {
    id: 'SLOT-07',
    time_range: '19:00 - 20:30',
    period_label: 'EVENING',
    title_zh: '晚間輕食：低負擔抗發炎晚餐與消化留白',
    title_en: 'Evening Nourishment: Light Anti-inflammatory Dinner & Digestion Buffer',
    target_systems: ['消化系統', '內分泌系統'],
    physiological_mechanism_zh: '入睡時胃內若有大量未消化高脂高蛋白食物，會迫使內臟副交感神經高負荷運作，抬高核心體溫，顯著減少夜間生長激素釋放與自噬作用 (Autophagy)。',
    action_checklist_zh: [
      '晚餐份量維持在 7 分飽，以清蒸/水炒低脂白肉、豆腐、足量纖維蔬菜與少量複合碳水為主。',
      '距預計入睡時間至少預留 3 小時消化空窗，嚴禁睡前重口味宵夜或高鈉泡麵。',
      '徹底貫徹「零酒精政策」：酒精雖具鎮靜催眠假象，但會摧毀後半夜 REM 快速動眼期並加劇打鼾與睡眠呼吸中止。'
    ],
    expert_advice_zh: '「睡前的宵夜和酒精不是犒賞，是把你正在自我修復的器官拉去值夜班。」—— 成癮與肝膽毒理專家',
    icon_name: 'Moon'
  },
  {
    id: 'SLOT-08',
    time_range: '21:00 - 23:00',
    period_label: 'BEDTIME',
    title_zh: '夜間降溫：神經減速、光線調暗與體溫墜落入眠',
    title_en: 'Night Cooldown: Neural Deceleration, Dimming & Thermal Sleep Onset',
    target_systems: ['神經內分泌', '膠淋巴系統 (Glymphatic)'],
    physiological_mechanism_zh: '大腦核心體溫必須下降約 1°C 才能觸發自然入睡開關；夜間膠淋巴系統在深層睡眠中會擴大 60%，高效沖刷洗滌阿茲海默相關的類澱粉蛋白 (Aβ) 與 Tau 蛋白。',
    action_checklist_zh: [
      '睡前 90 分鐘溫水淋浴或泡腳（40°C 10分鐘），利用末梢血管擴張加速散熱，協助核心體溫快速下降。',
      '臥室全面調暗燈光，關閉頂燈改開低照度暖黃地燈；睡前 60 分鐘戒斷手機與藍光螢幕。',
      '睡前 1 小時停止大量灌水，僅在口乾時小口潤喉，防止夜間膀胱膨脹頻尿中斷睡眠週期。',
      '臥室室溫調至 19–22°C 涼爽舒適環境，全黑遮光簾營造絕對安靜修復空間。'
    ],
    expert_advice_zh: '「深層睡眠是全宇宙最強大、且完全免費的抗衰老洗腦排毒療程。」—— 睡眠醫學與神經學家',
    icon_name: 'Bed'
  }
];

export const ATOMIC_HABITS: UltraHealthAtomicHabit[] = [
  {
    id: 'HABIT-01',
    title_zh: '晨起常溫水啟航',
    title_en: 'Morning Water Ignition',
    pillar: 'hydration',
    anchor_moment_zh: '每天早晨「雙腳踏下床踩到地板」的瞬間',
    micro_action_zh: '走向廚房倒出預先準備的 300ml 常溫水，一口氣緩慢喝完',
    dopamine_reward_zh: '感受清涼水流穿過食道進入胃部的甦醒感，在心中默念「今日能量已激活」',
    duration_minutes: 1,
    difficulty: 'EASY',
    evidence_grade: 'A',
    why_it_works_zh: '消除整夜 300ml 不感蒸發失水，稀釋高濃度血液滲透壓，啟動胃結腸反射。'
  },
  {
    id: 'HABIT-02',
    title_zh: '晨光十秒深呼吸',
    title_en: '10-Second Morning Light Exposure',
    pillar: 'sleep',
    anchor_moment_zh: '早上「拉開窗簾」或「走出家門口」的一剎那',
    micro_action_zh: '抬頭望向明亮天空（勿直視太陽），進行 3 次深慢呼吸',
    dopamine_reward_zh: '感受微風與自然光照在臉龐的明亮感，向大腦宣告「生物時鐘重設完成」',
    duration_minutes: 1,
    difficulty: 'EASY',
    evidence_grade: 'A',
    why_it_works_zh: '自然光直擊視網膜 ipRGC 細胞，壓制褪黑激素，校準當天 14 小時後的入睡節律。'
  },
  {
    id: 'HABIT-03',
    title_zh: '外食第一口吃菜肉',
    title_en: 'Fiber-First Dining Rule',
    pillar: 'diet',
    anchor_moment_zh: '午餐打開便當或拿起筷子的那一刻',
    micro_action_zh: '第一口夾青菜，第二口夾肉蛋，先吃完菜和蛋白質再碰白飯',
    dopamine_reward_zh: '看著平穩的飽足感，享受下午不昏睡的清爽精力',
    duration_minutes: 1,
    difficulty: 'EASY',
    evidence_grade: 'A',
    why_it_works_zh: '纖維與蛋白質延緩胃排空，形成小腸黏膜物理阻隔，抹平餐後血糖尖峰。'
  },
  {
    id: 'HABIT-04',
    title_zh: '倒水時的 10 次提踵',
    title_en: 'Water-Cooler Calf Raises',
    pillar: 'exercise',
    anchor_moment_zh: '在辦公室飲水機前「等待水壺裝滿水」的空檔',
    micro_action_zh: '雙腳與肩同寬，緩慢踮起腳尖到頂點停留 1 秒再放下，連續 10 下',
    dopamine_reward_zh: '小腿肚微酸發熱，感覺下肢積聚的血液重新被泵回心臟',
    duration_minutes: 1,
    difficulty: 'EASY',
    evidence_grade: 'B',
    why_it_works_zh: '比目魚肌與腓腸肌是人體的「第二心臟」，提踵有效促進靜脈回流預防血栓。'
  },
  {
    id: 'HABIT-05',
    title_zh: '辦公椅胸椎開闔',
    title_en: 'Seated Thoracic Extension',
    pillar: 'exercise',
    anchor_moment_zh: '每完成一封長信件或視訊會議「關閉通話」時',
    micro_action_zh: '雙手抱後腦勺，背靠椅背上緣，深吸氣向上仰頭伸展胸椎 5 秒',
    dopamine_reward_zh: '胸口豁然開朗，頸椎與肩胛的沉重壓力瞬間釋放',
    duration_minutes: 1,
    difficulty: 'EASY',
    evidence_grade: 'B',
    why_it_works_zh: '打破打字導致的圓肩駝背姿勢，活化上背菱形肌與胸椎伸展活動度。'
  },
  {
    id: 'HABIT-06',
    title_zh: '兩點後的咖啡休止符',
    title_en: '2PM Caffeine Curfew',
    pillar: 'sleep',
    anchor_moment_zh: '時鐘走到下午 14:00 或午後手想伸向咖啡杯時',
    micro_action_zh: '換拿大水杯，沖泡一杯無咖啡因的麥茶、薄荷茶或檸檬溫水',
    dopamine_reward_zh: '聞著麥香，對自己說「今晚的深層睡眠已被我守護住了」',
    duration_minutes: 1,
    difficulty: 'MEDIUM',
    evidence_grade: 'A',
    why_it_works_zh: '避免咖啡因 6 小時半衰期阻斷夜間腺苷受體，保護 SWS 深睡與大腦排毒。'
  },
  {
    id: 'HABIT-07',
    title_zh: '餐後洗碗散步 10 分鐘',
    title_en: 'Post-Dinner 10-Min Pacing',
    pillar: 'diet',
    anchor_moment_zh: '晚餐吃完「放下碗筷、推開椅子」的瞬間',
    micro_action_zh: '不坐沙發，立刻站起來洗碗擦桌，或下樓走去便利商店買水散步 10 分鐘',
    dopamine_reward_zh: '胃部飽脹感快速消退，大腦格外清醒，避免腹部內臟脂肪囤積',
    duration_minutes: 10,
    difficulty: 'EASY',
    evidence_grade: 'A',
    why_it_works_zh: '下肢大肌群收縮直接透過非胰島素通道攝取血液葡萄糖，控糖效率極高。'
  },
  {
    id: 'HABIT-08',
    title_zh: '睡前手機充電隔壁桌',
    title_en: 'Phone Out-of-Reach Night Habit',
    pillar: 'sleep',
    anchor_moment_zh: '晚上準備洗澡刷牙「走進浴室前」',
    micro_action_zh: '將手機插上充電線，放在離床至少 2 公尺遠的書桌或客廳，調至勿擾模式',
    dopamine_reward_zh: '躺上床時沒有藍光誘惑與資訊焦慮，享受完全屬於自己的寧靜深邃之夜',
    duration_minutes: 1,
    difficulty: 'MEDIUM',
    evidence_grade: 'A',
    why_it_works_zh: '切斷睡前無意識短影音多巴胺劫持，杜絕藍光抑制松果體褪黑激素釋放。'
  }
];

export const PHYSIO_EXERCISES: PhysioExercise[] = [
  {
    id: 'EX-01',
    title_zh: '辦公久坐救星：半跪姿髂腰肌動態延展',
    title_en: 'Half-Kneeling Hip Flexor Reset',
    category: 'DESK_RESCUE',
    target_area_zh: '骨盆前側、髂腰肌、股直肌',
    why_physio_recommends_zh: '久坐讓髖屈肌長期處於縮短痙攣狀態，站起來時會把骨盆往前拉造成前傾與腰椎過度前凸，是現代人不明下背酸痛的頭號元兇！',
    step_by_step_zh: [
      '採單膝跪地姿勢（前後腳皆呈 90 度，後膝可墊毛巾）。',
      '核心收緊，骨盆稍微做後傾（想像皮帶扣往肚臍方向捲）。',
      '收緊後腳臀大肌，重心緩慢往前推進 3-5 公分，感受後腳大腿前側與該邊深層牽拉。',
      '維持正常呼吸，單側停留 20 秒，換邊重複 3 回合。'
    ],
    common_compensations_zh: [
      '❌ 骨盆前傾折腰：肚子往前凸、用腰椎下陷代償髖伸展，反而會痛。',
      '❌ 身體前傾聳肩：上半身未保持直立中立位。'
    ],
    reps_and_sets_zh: '每側 20 秒，早晚各做 3 組',
    difficulty: 'BEGINNER'
  },
  {
    id: 'EX-02',
    title_zh: '胸椎靈活度：四足跪姿胸椎旋轉開展',
    title_en: 'Quadruped Thoracic Rotation',
    category: 'MOBILITY_RESTORE',
    target_area_zh: '胸椎活動度、菱形肌、胸小肌放鬆',
    why_physio_recommends_zh: '胸椎原本負責人體 70% 的旋轉角度，久坐打字導致胸椎鎖死，人體就會被迫用「腰椎」或「頸椎」去代償旋轉，引發椎間盤突出！',
    step_by_step_zh: [
      '採四足跪姿，雙手在肩膀正下方，雙膝在髖部正下方。',
      '右手輕放在後腦勺或頸後，核心微收保持骨盆骨架水平不歪斜。',
      '吸氣準備，吐氣時以胸椎為軸心，將右側手肘向天花板打開旋轉，眼神跟隨手肘。',
      '吸氣緩慢還原手肘碰觸左側手腕，重複 8-10 次後換邊。'
    ],
    common_compensations_zh: [
      '❌ 骨盆跟著左右大幅晃動：應保持骨盆水平，僅讓胸椎段旋轉。',
      '❌ 用手臂硬扯頸椎：雙手僅是輕扶，動作發力源在於胸背旋轉。'
    ],
    reps_and_sets_zh: '每側 8–10 次，做 2–3 組',
    difficulty: 'INTERMEDIATE'
  },
  {
    id: 'EX-03',
    title_zh: '死臀症候群救星：蚌殼式臀中肌點火',
    title_en: 'Side-Lying Clamshell Glute Medius Activation',
    category: 'POSTURE_RESET',
    target_area_zh: '臀中肌、髖外旋肌群、膝關節軌道穩定',
    why_physio_recommends_zh: '臀中肌無力會導致走路或跑步時骨盆左右搖擺（Trendelenburg 步態），並造成膝蓋內扣（Valgus）增加髕骨軟化與前十字韌帶壓力。',
    step_by_step_zh: [
      '側躺在地墊上，頭枕在手臂上，雙膝彎曲約 90 度，雙腳腳跟併攏。',
      '手放在骨盆上方，確保骨盆垂直於地面，絕不向後傾倒翻滾。',
      '腳跟緊貼，吸氣準備，吐氣時利用臀部外側發力將上方膝蓋像貝殼般打開。',
      '在頂端停留 1 秒，感受臀部外上方酸脹感，再緩慢下放。'
    ],
    common_compensations_zh: [
      '❌ 骨盆向後翻轉：為了把膝蓋開得更高而轉動身體，完全失去鍛鍊效果。',
      '❌ 大腿前側代償：應專注感知臀部側後方肌肉出力。'
    ],
    reps_and_sets_zh: '每側 15 次，做 3 組',
    difficulty: 'BEGINNER'
  },
  {
    id: 'EX-04',
    title_zh: '人體五大核心模式：高腳杯深蹲 (Goblet Squat)',
    title_en: 'Goblet Squat Fundamental Pattern',
    category: 'RESISTANCE_CORE',
    target_area_zh: '股四頭肌、臀大肌、腹橫肌核心抗屈曲',
    why_physio_recommends_zh: '深蹲是人體最自然的起立坐下動作。雙手胸前抱水壺或啞鈴的高腳杯深蹲，能自然誘導軀幹維持直立，修正背部圓弧，是最安全的下肢力量基石。',
    step_by_step_zh: [
      '雙腳比肩略寬，腳尖微朝外約 15–30 度，雙手捧住重量於胸前。',
      '吸氣入腹腔建立腹壓，髖部與膝蓋同時啟動，像坐一張矮凳般下蹲。',
      '膝蓋方向順著腳尖，下蹲至大腿與地面平行或略低，保持胸腔挺拔。',
      '吐氣時雙腳全腳掌踩實地面，臀大肌收縮站起，頂點骨盆回正不過度超伸。'
    ],
    common_compensations_zh: [
      '❌ 膝蓋內扣（X型腿）：下蹲或起立時膝蓋往內塌，極度傷害半月板。',
      '❌ 屁股眨眼（Butt Wink）：蹲太深時骨盆嚴重後傾圓下背，應在骨盆眨眼前停止下蹲。'
    ],
    reps_and_sets_zh: '每組 10–12 次，做 3–4 組',
    difficulty: 'INTERMEDIATE'
  }
];

export const SKILL_TREE_NODES: MasterySkillTreeNode[] = [
  {
    id: 'TREE-W-01',
    code: 'SKILL-W1',
    title_zh: '水合動態平衡與體液房間',
    title_en: 'Fluid Homeostasis & Internal Compartments',
    branch: 'WATER',
    level: 'L1',
    prerequisites: [],
    summary_zh: '掌握人體 60% 水分的 3 個分布空間（細胞內液 67%、組織間液 25%、血漿 8%）與滲透壓平衡法則。',
    plain_english_analogy_zh: '水分子在身體裡就像房客，大部分住在細胞家裡，少部分在血管高速公路流動。鈉離子和鉀離子就像門衛，決定水分往哪間房間跑。',
    quiz: {
      question_zh: '當人體感到「口渴」時，在生理學代表什麼狀態？',
      options_zh: [
        '此時身體完全未失水，口渴只是大腦隨機的神經雜訊',
        '大腦滲透受器需濃度上升 1–2% 才敲警鐘，此時身體早已實質失水，腎臟 ADH 已把水閘鎖緊',
        '體內水分過多，即將造成急性水中毒的求救訊號'
      ],
      correct_index: 1,
      explanation_zh: '血漿滲透壓上升 1% 下視丘便釋放抗利尿激素 (ADH) 減少尿液，口渴中樞則需要 2–3% 變化才被觸發，感到口渴代表身體早已進入保護性代償！'
    }
  },
  {
    id: 'TREE-W-02',
    code: 'SKILL-W2',
    title_zh: '運動型低血鈉 (EAH) 與安全補液',
    title_en: 'Exercise-Associated Hyponatremia Prevention',
    branch: 'WATER',
    level: 'SAFETY',
    prerequisites: ['TREE-W-01'],
    summary_zh: '辨識長跑與高溫運動中狂灌純水的致命風險，掌握鈉平衡與運動補水邊界。',
    plain_english_analogy_zh: '把一碗很鹹的湯一直加熱水，湯會變淡；把人體血管一直灌純水不給鹽巴，血鈉會被稀釋到底，水往腦袋衝就會腦水腫昏迷！',
    quiz: {
      question_zh: '耐力運動者在中途感到頭暈噁心，如果盲目在 1 小時內狂灌 2 公升純水，最可能的致命急症是什麼？',
      options_zh: [
        '急性痛風發作',
        '運動型低血鈉 (EAH) 引發急性腦水腫',
        '急性胃穿孔'
      ],
      correct_index: 1,
      explanation_zh: '運動中排汗流失鈉，若只補充大量純水會急遽稀釋血鈉（<135 mmol/L），水因滲透壓差湧向腦細胞導致致命腦水腫，切忌強迫過量飲用純水！'
    }
  },
  {
    id: 'TREE-O-01',
    code: 'SKILL-O1',
    title_zh: '脂肪酸碳鏈雙鍵與食用油光譜',
    title_en: 'Fatty Acid Saturation & Edible Oil Spectrum',
    branch: 'OIL_METABOLISM',
    level: 'L1',
    prerequisites: [],
    summary_zh: '認識飽和 (SFA)、單元不飽和 (MUFA)、多元不飽和 (PUFA) 的分子穩定性與心血管效應。',
    plain_english_analogy_zh: '飽和脂肪是排得整整齊齊的鐵釘（穩定但吃多血管塞車）；單元不飽和脂肪是帶一個柔性關節（護心神隊友）；多元不飽和脂肪關節很多很靈活但容易被高溫火烤生鏽氧化！',
    quiz: {
      question_zh: '在家進行高溫大火爆炒或煎炸時，為何不適合使用富含 Omega-3 的冷壓亞麻仁油？',
      options_zh: [
        '因為亞麻仁油熱量是零，無法導熱',
        '多元不飽和脂肪雙鍵多，在高溫下極易氧化裂解產生自由基與致癌醛類毒素',
        '因為亞麻仁油會讓鐵鍋永久生鏽'
      ],
      correct_index: 1,
      explanation_zh: '冷壓亞麻仁油富含多元不飽和脂肪酸（ALA），分子結構活潑且發煙點極低（約 107°C），劇烈高溫會迅速氧化生成有毒過氧化物與反式脂肪，只適合涼拌。'
    }
  },
  {
    id: 'TREE-M-01',
    code: 'SKILL-M1',
    title_zh: '動力鏈久坐代償與骨盆中立',
    title_en: 'Kinetic Chain Compensation & Pelvic Neutrality',
    branch: 'EXERCISE_PHYSIO',
    level: 'L2',
    prerequisites: [],
    summary_zh: '拆解長時間久坐導致的交叉綜合症、死臀症候群與下背痛自我修復法。',
    plain_english_analogy_zh: '你的身體是一串精密骨牌，骨盆是中間樞紐。前面的腰大肌太緊、後面的屁股太懶，骨牌一倒，倒楣的往往是上面的腰椎和下面的膝蓋！',
    quiz: {
      question_zh: '上班族常常站久或走路走一下子就腰酸背痛，物理治療師評估通常會先檢查哪個部位？',
      options_zh: [
        '單純腰椎骨刺，只能開刀別無他法',
        '久坐緊繃的「髂腰肌」拉扯骨盆前傾，以及長期休眠無力的「臀大肌與臀中肌」',
        '純粹因為沒穿氣墊鞋'
      ],
      correct_index: 1,
      explanation_zh: '「下交叉綜合症」的核心就是緊縮的髂腰肌配合無力的臀肌與核心，導致腰椎被動承受巨大剪切力，透過拉伸髖屈肌與喚醒臀肌能大幅解除疼痛。'
    }
  },
  {
    id: 'TREE-S-01',
    code: 'SKILL-S1',
    title_zh: '晝夜時鐘同步與膠淋巴洗腦機制',
    title_en: 'Circadian Entrainment & Glymphatic Clearance',
    branch: 'SLEEP_CIRCADIAN',
    level: 'L2',
    prerequisites: [],
    summary_zh: '理解大腦松果體褪黑激素分泌視窗，以及深層睡眠中腦脊髓液對阿茲海默毒蛋白的沖刷排毒。',
    plain_english_analogy_zh: '白天大腦在狂敲鍵盤辦公堆滿垃圾；晚上深層睡眠時，腦細胞會縮小 60%，膠淋巴系統就像清潔阿姨拿強力水柱把類澱粉蛋白垃圾全部沖走！',
    quiz: {
      question_zh: '大腦中負責沖刷清潔代謝廢物（如 β-類澱粉蛋白）的「膠淋巴系統 (Glymphatic System)」主要在何時高效運轉？',
      options_zh: [
        '在白天劇烈運動喝咖啡時',
        '在夜間非快速動眼期 (NREM) 的深層慢波睡眠期間',
        '在飲用大量烈酒昏睡時'
      ],
      correct_index: 1,
      explanation_zh: '研究證實，深層睡眠期大腦細胞間隙擴大 60%，腦脊髓液得以高速流通沖刷掉一整天累積的神經毒性廢物；熬夜或飲酒會嚴重瓦解此修復機制。'
    }
  }
];

export const STREET_MYTH_BUSTERS = [
  {
    id: 'MYTH-01',
    myth_zh: '迷思：每天一定要狂灌 3000cc 甚至 4000cc 水才算排毒健康？',
    fact_zh: '真相：人體水合遵循「金髮女孩原則」（剛剛好最好）。強迫灌水會增加腎臟負擔，更可能引起血鈉過低的低血鈉急症！以體重 × 30-35ml 為基準，觀察尿液呈淡檸檬黃即可。',
    influencer_quote_zh: '「把腎臟當濾水器死命操，只會把血裡的鹽分沖光光，腦袋水腫進急診！」',
    verdict: 'BUSTED'
  },
  {
    id: 'MYTH-02',
    myth_zh: '迷思：為了心血管健康，吃水煮餐「滴油不沾」最健康？',
    fact_zh: '真相：長期極端無油會導致膽汁淤積誘發膽結石、荷爾蒙失調、皮膚乾裂，且脂溶性維生素 (A, D, E, K) 無法被吸收。關鍵是用好油（特級初榨橄欖油、芥花油）取代劣質回鍋油！',
    influencer_quote_zh: '「不吃好油，你的細胞膜跟荷爾蒙根本蓋不起來，最後皮膚像乾枯壁紙！」',
    verdict: 'BUSTED'
  },
  {
    id: 'MYTH-03',
    myth_zh: '迷思：睡前喝一杯紅酒可以幫助入眠又抗氧化？',
    fact_zh: '真相：酒精是神經抑制劑，讓你快速「昏迷」而不是「自然生理睡眠」。酒精在體內代謝會瓦解後半夜快速動眼期 (REM)，讓你半夜頻尿、心跳加速、隔天腦袋昏沉！',
    influencer_quote_zh: '「紅酒裡的白藜蘆醇少得可憐，你還沒抗到氧化，肝臟已經被一級致癌物乙醛醃入味了！」',
    verdict: 'BUSTED'
  },
  {
    id: 'MYTH-04',
    myth_zh: '迷思：腰酸背痛只要去給人按一按、推拿一下就會根治？',
    fact_zh: '真相：被動按摩只能暫時放鬆緊繃筋膜 24-48 小時。如果沒有透過主動拉伸緊繃的髖屈肌、鍛鍊沉睡的臀肌與核心，錯誤的受力代償會讓酸痛無止盡復發！',
    influencer_quote_zh: '「被動放鬆治標，主動鍛鍊治本！你不動手叫醒死掉的屁股，神仙按摩也救不了你的腰！」',
    verdict: 'BUSTED'
  }
];
