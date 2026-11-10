import { SportsDiscipline } from '../types';

export type SportGoalId =
  | 'beginner_daily'
  | 'cardio_fatloss'
  | 'muscle_bone'
  | 'joint_friendly'
  | 'social_fun';

export interface SportGoalOption {
  id: SportGoalId;
  label_zh: string;
  desc_zh: string;
  recommended: SportsDiscipline[];
}

export interface SportPrimer {
  discipline: SportsDiscipline;
  eyebrow_zh: string;
  title_zh: string;
  lead_zh: string;
  intensity_badge_zh: string;
  suitable_for_zh: string;
  benefits_zh: [string, string, string];
  beginner_step_zh: string;
  injury_tip_zh: string;
  starter_lesson: {
    hash: string;
    label: string;
  };
}

export const SPORT_GOALS: SportGoalOption[] = [
  {
    id: 'beginner_daily',
    label_zh: '久坐想開始動',
    desc_zh: '平常少運動、想先建立不累又能持續的日常習慣',
    recommended: ['PHYSIOLOGY', 'MOBILITY_FASCIA', 'RUNNING'],
  },
  {
    id: 'cardio_fatloss',
    label_zh: '提升心肺與燃脂',
    desc_zh: '想改善體力、控制體重與三高，強化心肺耐力',
    recommended: ['RUNNING', 'CYCLING', 'PHYSIOLOGY'],
  },
  {
    id: 'muscle_bone',
    label_zh: '增肌強骨防肌少',
    desc_zh: '想緊實線條、保護關節、預防骨質疏鬆與肌少症',
    recommended: ['STRENGTH_TRAINING', 'MOUNTAINEERING', 'MOBILITY_FASCIA'],
  },
  {
    id: 'joint_friendly',
    label_zh: '關節友善低衝擊',
    desc_zh: '膝蓋或腳踝較敏感，希望減少落地衝擊力',
    recommended: ['CYCLING', 'MOBILITY_FASCIA', 'TABLE_TENNIS'],
  },
  {
    id: 'social_fun',
    label_zh: '雙人互動練反應',
    desc_zh: '喜歡跟朋友家人一起流汗，同時訓練手眼協調與敏捷度',
    recommended: ['PICKLEBALL', 'BADMINTON', 'TABLE_TENNIS'],
  },
];

export const SPORT_PRIMERS: Record<SportsDiscipline, SportPrimer> = {
  PHYSIOLOGY: {
    discipline: 'PHYSIOLOGY',
    eyebrow_zh: '基礎與日常 · 運動生理',
    title_zh: '運動生理入門：怎麼動最有效又安全',
    lead_zh: '不需要昂貴穿戴裝置也能掌握運動強度。先認識有氧區間（Zone 2）與最大攝氧量（VO₂max）對健康的意義，再用下方的互動計算機找出適合你的心跳區間。',
    intensity_badge_zh: '所有程度皆適用',
    suitable_for_zh: '剛開始規劃運動、想看懂手錶心率區間或改善心肺體能的人',
    benefits_zh: [
      '用「說話測試」（可以完整說句子但唱不了歌）就能輕鬆找到燃脂與建立有氧基礎的 Zone 2 強度。',
      '每週累積 150–300 分鐘中等強度有氧，搭配少量高強度間歇，能有效提升心肺耐力（VO₂max）。',
      '規律有氧運動能提升胰島素敏感度、幫助降低安靜心率與血壓，並改善夜間深層睡眠。',
    ],
    beginner_step_zh: '今天出門快走或超慢跑 15 分鐘，試著維持在「呼吸微喘、仍能和身旁的人完整講話」的節奏。',
    injury_tip_zh: '若正在服用降血壓藥（如 β 阻斷劑），心跳速率會被壓低，請以「自覺費力程度與說話測試」為準，不必勉強追心率數字。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-01',
      label: '每週 150 分鐘：運動量的基本盤',
    },
  },
  STRENGTH_TRAINING: {
    discipline: 'STRENGTH_TRAINING',
    eyebrow_zh: '基礎與日常 · 肌力、最大肌力與肌耐力',
    title_zh: '肌力、最大肌力與肌耐力訓練：保護關節、留住肌肉與骨本',
    lead_zh: '肌肉、骨質與神經控制都是「用進廢退」。先透過人體自然動作提升「最大肌力」天花板，日常生活的相對肌耐力就會跟著水漲船高；每週 2 次、保留 2–3 下餘力即可終身持續。',
    intensity_badge_zh: '每週 2–3 次 · 先求肌力再求耐力',
    suitable_for_zh: '想預防肌少症與骨鬆、提升日常肌耐力、正在減重想保留肌肉、或改善腰背膝蓋穩定度的人',
    benefits_zh: [
      '「先求最大肌力，再求肌耐力」：參考怪獸訓練與運動生理實證，把最大肌力拉高後，原本吃力的重物變輕，相對肌耐力與防傷餘裕會自動倍增。',
      '依 ACSM 2026 實證與「彈性訓練法」原則，每組停在還能再做 2–3 下（RIR 2–3 / Easy-Daily Max）就能有效增肌增力，不必練到力竭癱瘓。',
      '掌握人體自然動作模式（深蹲、硬舉/臀橋、推、拉、農夫走路負重行走），即可均衡刺激全身快縮肌纖維、骨質密度與核心抗變形肌耐力。',
    ],
    beginner_step_zh: '先從自體重量或居家水瓶開始：做 2 組「椅子坐站 10 下 ＋ 扶牆伏地挺身 10 下 ＋ 臀橋 10 下 ＋ 雙手提水瓶農夫走路 40 秒」，動作放慢、感受肌肉發力。',
    injury_tip_zh: '舉重時切忌過度憋氣硬撐，請保持軀幹 360 度核心穩定與脊椎中立不圓背；若當日睡眠不足或疲勞，請退回輕鬆極限（Easy Max）不勉強追重量。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-08',
      label: '最大肌力與肌耐力：為什麼「先練力氣」才能走得遠？',
    },
  },
  MOBILITY_FASCIA: {
    discipline: 'MOBILITY_FASCIA',
    eyebrow_zh: '基礎與日常 · 伸展與活動度',
    title_zh: '伸展、筋膜與活動度：告別僵硬與預防拉傷',
    lead_zh: '柔軟度不等於關節穩定度。了解「運動前動態熱身、運動後靜態伸展」的黃金原則，搭配滾筒放鬆與平衡練習，讓身體活動更輕盈自在。',
    intensity_badge_zh: '低強度 · 每日 10–15 分鐘',
    suitable_for_zh: '長時間久坐肩頸腰背僵硬、運動前不知如何熱身、或想提升平衡防跌能力的人',
    benefits_zh: [
      '運動前做 5–10 分鐘動態熱身（如擺腿、弓箭步轉體）能提高肌肉溫度與神經活化，不影響爆發力。',
      '運動後或睡前進行 30–60 秒溫和靜態伸展與滾筒筋膜放鬆，有助於舒緩緊繃並調節副交感神經。',
      '結合單腳站立等本體感覺與平衡訓練，能把中高齡跌倒風險降低約 20–30%。',
    ],
    beginner_step_zh: '今晚洗澡後花 5 分鐘，針對小腿後側、大腿前側與胸大肌各做 30 秒「有緊繃感但不刺痛」的靜態伸展，搭配深慢呼吸。',
    injury_tip_zh: '伸展時不要來回彈震或硬壓到劇痛；若關節出現卡住、麻木或刺痛感，應停止硬拉並請物理治療師或醫師評估。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-06',
      label: '平衡與柔軟度：防跌從現在開始',
    },
  },
  RUNNING: {
    discipline: 'RUNNING',
    eyebrow_zh: '戶外有氧 · 跑步科學',
    title_zh: '跑步與快走：最容易開始的心肺與骨密度訓練',
    lead_zh: '從快走、走跑交替到長距離慢跑，跑步是最方便的全身有氧運動。學會把八成時間放在輕鬆跑，並遵守每週增量原則，就能跑得長久又不傷膝。',
    intensity_badge_zh: '中高衝擊 · 心肺與下肢耐力',
    suitable_for_zh: '想提升心肺體能、紓解壓力、從健走進階到慢跑或準備路跑賽事的人',
    benefits_zh: [
      '休閒慢跑者的膝關節退化率低於久坐不動者；規律且循序漸進的地面反作用力反而能滋養軟骨並強化骨密度。',
      '採用「80/20 原則」：約 80% 里程維持能輕鬆對話的慢速有氧，20% 才做節奏跑或間歇，進步最穩且不易過度訓練。',
      '稍微提高步頻（約每分鐘 170–180 步、縮小跨步）能減少腳跟在身體前方重擊地面的煞車衝擊力。',
    ],
    beginner_step_zh: '新手請從「走跑交替」開始：快走 3 分鐘 ＋ 慢跑 1 分鐘，循環 5 次（共 20 分鐘），一週跑 2–3 天即可。',
    injury_tip_zh: '遵守每週總跑量增加不超過 10% 的安全法則；若膝蓋外側或脛骨前側出現持續疼痛，先減量休息並加強臀中肌與小腿肌力。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-02',
      label: '每天 7,000 步就有顯著好處',
    },
  },
  CYCLING: {
    discipline: 'CYCLING',
    eyebrow_zh: '戶外有氧 · 自行車科學',
    title_zh: '自行車與飛輪：膝蓋友善的高效率心肺運動',
    lead_zh: '座墊承接了大部分體重，讓自行車成為對膝關節與踝關節衝擊極小的有氧首選。調對座墊高度與迴轉速，能讓你騎得輕鬆又護膝。',
    intensity_badge_zh: '低衝擊 · 關節友善有氧',
    suitable_for_zh: '體重較重、膝蓋曾受過傷、喜歡河濱兜風或想在室內騎飛輪燃脂的人',
    benefits_zh: [
      '非負重閉鎖式踩踏大幅降低膝關節衝擊，非常適合體重過重或退化性關節炎族群建立有氧耐力。',
      '維持每分鐘 80–90 轉（RPM）的輕快迴轉速，能把負擔從膝蓋韌帶轉移到心肺與有氧慢縮肌纖維。',
      '長途騎乘結合穩定功率輸出，能高效提升下肢微血管密度與粒線體脂肪氧化能力。',
    ],
    beginner_step_zh: '先檢查座墊高度：坐在座墊上，腳跟踩在踏板最低點時膝蓋剛好打直；正常用前腳掌踩踏時，膝蓋會保留約 25–30 度微彎。',
    injury_tip_zh: '座墊太低容易造成前膝痛，座墊太高則會導致骨盆左右搖晃與下背痛；避免長期用重齒比「硬踩」爬坡。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-05',
      label: '心率區間與 Zone 2',
    },
  },
  MOUNTAINEERING: {
    discipline: 'MOUNTAINEERING',
    eyebrow_zh: '戶外有氧 · 登山與健行',
    title_zh: '登山與步道健行：心肺、下肢肌力與高山安全',
    lead_zh: '台灣擁有豐富的郊山與百岳步道。上坡考驗心肺與臀腿推力，下坡考驗股四頭肌離心煞車力；掌握步法、登山杖與高海拔防護，才能快樂上山平安下山。',
    intensity_badge_zh: '長時間耐力 · 上下坡肌力與環境安全',
    suitable_for_zh: '喜歡親近自然、週末走郊山步道，或計畫挑戰台灣三千公尺百岳的人',
    benefits_zh: [
      '長時間上下坡能同時訓練有氧耐力、下肢肌力與不平坦地面的腳踝本體感覺。',
      '正確使用雙登山杖並搭配小步緩行，能減輕下坡時膝關節承受的衝擊負荷約 15–25%。',
      '走進森林步道結合自然日照與視覺放鬆，研究顯示能顯著降低唾液皮質醇（壓力荷爾蒙）並改善情緒。',
    ],
    beginner_step_zh: '出發百岳或長距離步道前 4–6 週，每週安排 2 次爬樓梯或負重登階練習，並強化單腳下階（Step-down）的股四頭肌穩定度。',
    injury_tip_zh: '海拔超過 2,500 公尺時，若出現頭痛加上噁心、頭暈或異常疲倦，應優先當作急性高山症（AMS）：停止上升、休息觀察，嚴重時立即下撤。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-07',
      label: '運動安全：什麼時候該停下來',
    },
  },
  BADMINTON: {
    discipline: 'BADMINTON',
    eyebrow_zh: '球拍運動 · 羽球科學',
    title_zh: '羽球：全身協調、敏捷步伐與心肺爆發力',
    lead_zh: '羽球是台灣最受歡迎的室內球拍運動之一，結合急停跨步、跳躍與揮拍。大型世代研究顯示，球拍運動與心血管及全因死亡風險下降密切相關。',
    intensity_badge_zh: '間歇敏捷 · 手眼協調與爆發力',
    suitable_for_zh: '喜歡室內流汗、想同時練心肺反應與敏捷度、有球友定期揪團的人',
    benefits_zh: [
      '多方向米字步伐與來回對打屬於天然的高低強度間歇訓練，能同時提升最大攝氧量與骨密度。',
      '跨步救球與軀幹旋轉揮拍能訓練核心穩定、手眼協調與快速反應能力。',
      '雙打與團體對戰兼具社交互動，有助於長期維持運動習慣並減輕生活壓力。',
    ],
    beginner_step_zh: '上場前務必做 8–10 分鐘動態熱身（手腕腳踝繞環、弓箭步轉體、側併步與墊步啟動），不要一進場就直接大力殺球。',
    injury_tip_zh: '前場跨步救球時，膝蓋應對準腳尖方向、避免內夾，並穿具側向支撐的羽球鞋；後場退步跳躍落地請保持前腳掌緩衝以保護阿基里斯腱。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-04',
      label: '久坐是獨立的危險因子：試試運動零食',
    },
  },
  TABLE_TENNIS: {
    discipline: 'TABLE_TENNIS',
    eyebrow_zh: '球拍運動 · 桌球科學',
    title_zh: '桌球：訓練大腦反應、動態視力與低衝擊敏捷度',
    lead_zh: '桌球球速快、旋轉變化多，需要在零點幾秒內完成視覺判斷與重心轉移，是一項老少咸宜、對膝蓋友善且極佳的「健腦加有氧」運動。',
    intensity_badge_zh: '低衝擊敏捷 · 健腦與手眼協調',
    suitable_for_zh: '各年齡層（特別是想練反應與防失智的中高齡族）、追求低關節衝擊球類運動的人',
    benefits_zh: [
      '高速來回對打需要前額葉、小腦與視覺皮質高度協同，有助於維持認知敏銳度、動態視力與神經反應速度。',
      '微蹲碎步移動能溫和訓練下肢肌耐力與重心平衡，且沒有高空跳躍落地衝擊。',
      '不受日曬雨淋影響，運動強度可依對打節奏自由調整，適合全家大小長期參與。',
    ],
    beginner_step_zh: '打球時保持膝蓋微彎、重心落在前腳掌，用「蹬地轉腰帶動手臂」擊球，而不是只靠手腕硬甩。',
    injury_tip_zh: '避免長時間單靠手腕或手肘發力造成網球肘，球鞋需具備良好止滑力以防側向滑倒。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-06',
      label: '平衡與柔軟度：防跌從現在開始',
    },
  },
  PICKLEBALL: {
    discipline: 'PICKLEBALL',
    eyebrow_zh: '球拍運動 · 匹克球科學',
    title_zh: '匹克球（Pickleball）：好上手、樂趣高的社交球拍運動',
    lead_zh: '結合網球、羽球與桌球特色的匹克球，場地比網球小、球速較溫和、規則好上手，新手第一天就能享受對打樂趣，輕鬆補足每週有氧活動量。',
    intensity_badge_zh: '中低衝擊 · 輕鬆上手與社交樂趣',
    suitable_for_zh: '運動新手、想找朋友家人一起同樂、覺得網球門檻太高或羽球太激烈的族群',
    benefits_zh: [
      '下手發球與「非截擊區（廚房區）」規則減少了劇烈扣殺與長距離衝刺，降低新手挫敗感與關節負擔。',
      '一場 45–60 分鐘的雙打對戰，平均心率可穩定維持在中等有氧區間（Zone 2–3），不知不覺走上數千步。',
      '高度社交互動與戰術配合能帶來愉悅感，是培養長期規律運動習慣的理想入門球類。',
    ],
    beginner_step_zh: '發球後與隊友一起推進到非截擊線（廚房線）後方，保持球拍舉在胸前準備，多練習輕柔穩定的小球對抽（Dink）。',
    injury_tip_zh: '面對高吊球越過頭頂時，切忌「直接向後倒退跑」（最容易絆倒跌坐造成手腕或髖部骨折），請改為轉身側跑後退。',
    starter_lesson: {
      hash: 'learn/move/L-MOVE-01',
      label: '每週 150 分鐘：運動量的基本盤',
    },
  },
};
