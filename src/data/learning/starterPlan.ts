import { StarterWeek } from '../../types/learning';

/**
 * 4 週健康啟動計畫 — a beginner's first month, one small layer per week.
 *
 * Doses follow WHO 2020 physical-activity guidance (150 min/week + 2 strength days),
 * ACSM 2026 (RIR 2–3), the Lancet Public Health 2025 step-count meta-analysis,
 * Taiwan HPA 我的餐盤 and AHA/ACC 2025 home-BP guidance. The plan deliberately
 * starts below target: the first month is about building the habit, not the dose.
 */

/** Paraphrase of PAR-Q+ style pre-participation questions, shown before week 1. */
export const STARTER_SAFETY_CHECK: string[] = [
  '醫師曾說你有心臟病或高血壓，或你正在服用心臟、血壓的藥物',
  '休息時、日常活動或運動時曾感到胸痛、胸悶',
  '過去一年曾因頭暈而失去平衡，或曾經昏倒',
  '有其他慢性病（如糖尿病、腎臟病、癌症治療中）且尚未和醫師討論過運動',
  '有骨骼、關節或肌肉的問題，一動就明顯惡化',
  '醫師曾告訴你只能在醫療監督下運動，或你目前懷孕',
];

export const STARTER_WEEKS: StarterWeek[] = [
  {
    week: 1,
    theme_zh: '打地基：每天 10 分鐘',
    goal_zh: '不求多，只求每天都做到。這週的目標是讓「動一下、換一杯、固定起床」變成自動的。',
    tasks: [
      { id: 'START-W1-1', kind: 'move', text_zh: '每天飯後快走 10 分鐘', detail_zh: '速度到「能說話、唱不了歌」；一週至少 5 天。' },
      { id: 'START-W1-2', kind: 'move', text_zh: '每天比平均多走 1,000 步', detail_zh: '先看手機上一週的平均步數，這週每天多 1,000 步就好。' },
      { id: 'START-W1-3', kind: 'eat', text_zh: '每天換掉一杯含糖飲料', detail_zh: '改成白開水、無糖茶或黑咖啡；手搖飲至少改微糖。' },
      { id: 'START-W1-4', kind: 'eat', text_zh: '每餐先夾半盤蔬菜', detail_zh: '先吃菜，再吃蛋白質，最後吃飯麵。' },
      { id: 'START-W1-5', kind: 'sleep', text_zh: '固定起床時間', detail_zh: '週末差距不超過 1 小時，起床後曬光 10 分鐘。' },
      { id: 'START-W1-6', kind: 'check', text_zh: '量一次腰圍，開始 722 量血壓', detail_zh: '記下第 1 週的腰圍與血壓平均，作為之後比較的起點。' },
    ],
    checkpoint_zh: '這週有 5 天以上完成飯後快走嗎？有的話，下週可以加量了。',
  },
  {
    week: 2,
    theme_zh: '加一點：開始肌力訓練',
    goal_zh: '走路時間拉長到 20 分鐘，並加入每週 2 次、每次 15–20 分鐘的居家肌力訓練。',
    tasks: [
      { id: 'START-W2-1', kind: 'move', text_zh: '快走 20 分鐘 × 5 天', detail_zh: '每週累積 100 分鐘；可拆成兩次 10 分鐘。' },
      { id: 'START-W2-2', kind: 'move', text_zh: '居家肌力訓練 2 次', detail_zh: '椅子深蹲、扶牆伏地挺身、彈力帶划船、臀橋各 10 下 × 2 輪，每組保留 2–3 下。' },
      { id: 'START-W2-3', kind: 'eat', text_zh: '每餐一掌心蛋白質', detail_zh: '早餐加蛋、無糖豆漿或牛奶；午晚餐一掌心魚、肉或豆腐。' },
      { id: 'START-W2-4', kind: 'eat', text_zh: '主食一半換全穀', detail_zh: '白飯拌糙米或燕麥、白吐司換全麥。' },
      { id: 'START-W2-5', kind: 'sleep', text_zh: '睡前 1 小時放下手機', detail_zh: '手機在臥室外充電，改做伸展或閱讀。' },
      { id: 'START-W2-6', kind: 'mind', text_zh: '每天 1 分鐘呼吸', detail_zh: '吸氣 4 秒、吐氣 6 秒，重複 6 次。' },
    ],
    checkpoint_zh: '肌力訓練後隔天有輕微痠痛是正常的；如果關節痛或疼痛持續，減少次數並詢問專業人員。',
  },
  {
    week: 3,
    theme_zh: '達標：每週 150 分鐘',
    goal_zh: '有氧累積到每週 150 分鐘，肌力訓練開始漸進加量，並處理外食與久坐。',
    tasks: [
      { id: 'START-W3-1', kind: 'move', text_zh: '有氧 30 分鐘 × 5 天', detail_zh: '快走、騎車、游泳或跳舞都算，達到每週 150 分鐘。' },
      { id: 'START-W3-2', kind: 'move', text_zh: '肌力訓練 2 次，每個動作加一組', detail_zh: '從 2 輪增加到 3 輪，或換成較硬的彈力帶。' },
      { id: 'START-W3-3', kind: 'move', text_zh: '每坐 45 分鐘起身 2 分鐘', detail_zh: '設定手機提醒：倒水、走樓梯或做 10 下深蹲。' },
      { id: 'START-W3-4', kind: 'eat', text_zh: '外食三招：燙青菜、湯喝一半、醬料另放', detail_zh: '每天至少一餐做到。' },
      { id: 'START-W3-5', kind: 'eat', text_zh: '這週吃魚 2 次、每天一小把堅果', detail_zh: '魚優先選中小型魚；堅果選原味，約 30 克。' },
      { id: 'START-W3-6', kind: 'sleep', text_zh: '最後一杯咖啡提前到下午 2 點前', detail_zh: '茶、可樂、能量飲料也算。' },
    ],
    checkpoint_zh: '恭喜達到國際建議的運動量！如果某幾天做不到，一週總量達標就好。',
  },
  {
    week: 4,
    theme_zh: '鞏固與檢視：讓它變成生活',
    goal_zh: '嘗試一項新的活動、學會看營養標示，並和第 1 週的數字比較。',
    tasks: [
      { id: 'START-W4-1', kind: 'move', text_zh: '每天目標 7,000 步', detail_zh: '從現在的平均逐步推進；已經達到的人維持即可。' },
      { id: 'START-W4-2', kind: 'move', text_zh: '嘗試一項新活動', detail_zh: '騎車、游泳、羽球、匹克球、太極或登山步道，找到你喜歡的。' },
      { id: 'START-W4-3', kind: 'eat', text_zh: '買包裝食品時看營養標示', detail_zh: '比較「每 100 公克」的糖、鈉與飽和脂肪，挑低的那一個。' },
      { id: 'START-W4-4', kind: 'eat', text_zh: '準備 3 天健康早餐', detail_zh: '例如燕麥 + 無糖優格 + 水果、全麥吐司 + 蛋 + 無糖豆漿。' },
      { id: 'START-W4-5', kind: 'check', text_zh: '再量一次腰圍與 722 血壓', detail_zh: '和第 1 週比較；符合年齡者預約成人預防保健或公費篩檢。' },
      { id: 'START-W4-6', kind: 'mind', text_zh: '寫下下個月的 2 個目標', detail_zh: '一個關於運動、一個關於飲食，並找一位朋友一起做。' },
    ],
    checkpoint_zh: '一個月後最重要的不是數字，而是你已經有了 4 個固定的健康習慣。下一步：到「學習路徑」挑一條你最想深入的主題。',
  },
];

export const ALL_STARTER_TASKS = STARTER_WEEKS.flatMap((w) => w.tasks.map((task) => ({ ...task, week: w.week })));
