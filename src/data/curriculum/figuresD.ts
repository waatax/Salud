import type { CurriculumFigure } from '../curriculumFigures';

const SRC = ['SRC-CURR-2026'];

// ═══════════════════════════════════════════════════════════════════════════
// Chapter D — figures for every page (01–10)
// ═══════════════════════════════════════════════════════════════════════════
export const FIGURES_D: Record<string, CurriculumFigure> = {
  'FIG-D-01-01': {
    title: 'PREDIMED：地中海飲食的心血管事件風險',
    caption: 'PREDIMED 隨機試驗（7,447 位高風險者，2018 重新分析）主要心血管事件風險比（HR），對照組＝ 1.0。',
    takeaway: '地中海飲食加初榨橄欖油或堅果，心血管事件約減少 3 成。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'HR（越低越好）',
      max: 1.1,
      ref: { value: 1, label: '對照組（低脂飲食建議）＝ 1.0' },
      items: [
        { label: '地中海＋初榨橄欖油', value: 0.69, display: 'HR 0.69（−31%）', icon: '🫒', tone: 'good' },
        { label: '地中海＋綜合堅果', value: 0.72, display: 'HR 0.72（−28%）', icon: '🥜', tone: 'good' },
        { label: '對照組', value: 1, display: 'HR 1.00', icon: '🍽️', tone: 'neutral' },
      ],
    },
  },
  'FIG-D-01-02': {
    title: 'MIND 飲食：10 種護腦 vs 5 種限制',
    caption: '結合地中海與 DASH 的護腦飲食清單；觀察性研究顯示與認知退化較慢相關，2023 年隨機試驗未見顯著差異。',
    takeaway: '綠葉蔬菜、莓果、豆類、堅果與魚是核心；少吃紅肉、奶油、甜點與炸物。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '多吃（10 種）', icon: '🧠', tone: 'good', points: ['綠葉蔬菜（每天）', '其他蔬菜', '莓果（每週 ≥ 2 次）', '堅果', '豆類', '全穀', '魚類', '禽肉', '橄欖油'] },
        { title: '少吃（5 種）', icon: '⛔', tone: 'bad', points: ['紅肉', '奶油與人造奶油', '起司', '甜點與糕餅', '油炸與速食'] },
      ],
      verdict: 'MIND 是合理的整體健康飲食，但「預防失智」的效果仍需更多隨機試驗確認。',
    },
  },
  'FIG-D-02-01': {
    title: '生酮的生化路徑',
    caption: '碳水化合物極低時，肝臟把脂肪酸轉成酮體供大腦使用。',
    takeaway: '生酮是代謝狀態的轉換，不是脂肪燃燒的魔法；LDL 可能大幅上升。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '碳水 < 20–50 g/日', detail: '胰島素下降、肝醣耗竭', icon: '🥑', tone: 'neutral' },
        { label: '脂肪酸 β-氧化', detail: '乙醯輔酶 A 大量增加', icon: '🔥', tone: 'ok' },
        { label: '肝臟生酮', detail: '產生 β-羥基丁酸、乙醯乙酸', icon: '⚗️', tone: 'info' },
        { label: '注意副作用', detail: '部分人 LDL／ApoB 暴增、便秘、生酮流感', icon: '⚠️', tone: 'bad' },
      ],
    },
  },
  'FIG-D-02-02': {
    title: '限時進食 vs 每日熱量限制（12 個月）',
    caption: 'Liu 2022 NEJM 隨機試驗（139 人），兩組熱量限制相同。',
    takeaway: '168 斷食的減重效果來自少吃，不是時鐘本身。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'kg 減重',
      max: 9,
      items: [
        { label: '限時進食（8 小時）＋熱量限制', value: 8.0, display: '−8.0 kg', icon: '⏰', tone: 'ok' },
        { label: '單純每日熱量限制', value: 6.3, display: '−6.3 kg', icon: '🍽️', tone: 'ok', note: '兩組差異無統計顯著' },
      ],
    },
  },
  'FIG-D-03-01': {
    title: '藍色寶地的九個共同習慣（Power 9）',
    caption: '沖繩、薩丁尼亞、伊卡利亞、尼科亞、洛馬林達的長壽族群共同特徵（觀察性描述）。',
    takeaway: '長壽不只是吃什麼，還有怎麼動、怎麼生活、和誰在一起。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['習慣', '日常做法'],
      rows: [
        { label: '動', icon: '🚶', cells: ['自然活動', '走路、做家事、種菜'] },
        { label: '心', icon: '🎯', cells: ['生活目標、減壓', '每天有放鬆儀式'] },
        { label: '吃', icon: '🥗', cells: [{ text: '八分飽、植物為主', tone: 'good' }, '豆類為核心、肉類少量'] },
        { label: '連結', icon: '👨‍👩‍👧', cells: ['家庭與社群', '有歸屬感、互相支持'] },
      ],
    },
  },
  'FIG-D-03-02': {
    title: '植物優先餐盤',
    caption: '不是全素，而是讓植物占餐盤大部分面積。',
    takeaway: '餐盤四分之三是植物，剩下四分之一是魚蛋豆或瘦肉。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'donut',
      center: '植物優先',
      items: [
        { label: '蔬菜', value: 40, icon: '🥬', tone: 'good' },
        { label: '全穀雜糧', value: 25, icon: '🌾', tone: 'warn' },
        { label: '豆類', value: 10, icon: '🫘', tone: 'ok' },
        { label: '魚、蛋、瘦肉', value: 25, icon: '🐟', tone: 'info' },
      ],
    },
  },
  'FIG-D-04-01': {
    title: '營養研究的證據金字塔',
    caption: '研究設計越往上，越能排除偏差與混雜。',
    takeaway: '看新聞先問：這是哪一層的證據？',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '頂層', label: '隨機試驗的系統性回顧與統合分析', detail: '綜合多個高品質試驗', tone: 'good', icon: '🏆' },
        { range: '第 2 層', label: '隨機對照試驗（RCT）', detail: '可推論因果，但營養試驗常短期且遵從度難控', tone: 'good', icon: '🎲' },
        { range: '第 3 層', label: '前瞻性世代研究', detail: '長期追蹤，但有混雜因子', tone: 'ok', icon: '👥' },
        { range: '第 4 層', label: '病例對照、橫斷面研究', detail: '易有回憶偏差，只能看相關', tone: 'warn', icon: '📋' },
        { range: '底層', label: '動物、細胞實驗與專家意見', detail: '產生假說，不能直接套用在人', tone: 'bad', icon: '🐭' },
      ],
    },
  },
  'FIG-D-04-02': {
    title: '相對風險 vs 絕對風險：加工肉與大腸癌',
    caption: '每天吃 50 g 加工肉，大腸癌相對風險增加約 18%；換算成一生的絕對風險變化。',
    takeaway: '「增加 18%」聽起來很大，實際是每 100 人約多 1 人——兩種數字都要看。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: '每 100 人一生罹患人數',
      max: 7,
      items: [
        { label: '不常吃加工肉', value: 5, display: '≈5 人', icon: '🥗', tone: 'ok' },
        { label: '每天吃 50 g 加工肉', value: 6, display: '≈6 人（相對 +18%）', icon: '🌭', tone: 'warn' },
      ],
    },
  },
  'FIG-D-05-01': {
    title: '我的餐盤六口訣',
    caption: '國民健康署「我的餐盤」以每餐為單位的簡易指引。',
    takeaway: '六句話記住均衡飲食，每一餐都能自我檢查。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['口訣', '實際做法'],
      rows: [
        { label: '乳品', icon: '🥛', cells: ['每天早晚一杯奶', '鮮奶、優格、起司'] },
        { label: '水果', icon: '🍎', cells: ['每餐水果拳頭大', '選當季、原態水果'] },
        { label: '蔬菜', icon: '🥬', cells: ['菜比水果多一點', '至少 1/3 深色蔬菜'] },
        { label: '全穀', icon: '🍚', cells: ['飯跟蔬菜一樣多', '至少 1/3 未精製'] },
        { label: '蛋白質', icon: '🐟', cells: ['豆魚蛋肉一掌心', '依序優先選擇'] },
        { label: '堅果', icon: '🥜', cells: ['堅果種子一茶匙', '每天約一湯匙量'] },
      ],
    },
  },
  'FIG-D-05-02': {
    title: '我的餐盤：一餐的比例',
    caption: '依「我的餐盤」示意的面積分配。',
    takeaway: '蔬菜與全穀各占約三成，水果與蛋白質各占約兩成。',
    grade: 'B',
    sources: SRC,
    schematic: true,
    chart: {
      kind: 'donut',
      center: '我的餐盤',
      items: [
        { label: '蔬菜', value: 30, icon: '🥬', tone: 'good' },
        { label: '全穀雜糧', value: 28, icon: '🍚', tone: 'warn' },
        { label: '豆魚蛋肉', value: 22, icon: '🐟', tone: 'ok' },
        { label: '水果', value: 20, icon: '🍎', tone: 'bad' },
      ],
    },
  },
  'FIG-D-06-01': {
    title: 'DIRECT 試驗：三種飲食兩年減重',
    caption: 'Shai 2008 NEJM：322 位中度肥胖者，隨機分配低脂、地中海、低碳飲食 2 年。',
    takeaway: '三種飲食都有效，差距不大；地中海與低碳的血脂與血糖改善略佳。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'kg 減重（2 年）',
      max: 5.5,
      items: [
        { label: '低碳（不限熱量）', value: 4.7, display: '−4.7 kg', icon: '🥩', tone: 'ok' },
        { label: '地中海（限熱量）', value: 4.4, display: '−4.4 kg', icon: '🫒', tone: 'good' },
        { label: '低脂（限熱量）', value: 2.9, display: '−2.9 kg', icon: '🥗', tone: 'ok' },
      ],
    },
  },
  'FIG-D-06-02': {
    title: '三種飲食法的優缺點',
    caption: '依試驗結果整理的實務比較。',
    takeaway: '沒有「最好的飲食」，只有「最適合你、能長期做的飲食」。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '低碳', icon: '🥩', tone: 'warn', points: ['初期減重快、TG 下降', '血糖改善明顯', '部分人 LDL 上升', '長期遵從度下降'] },
        { title: '地中海', icon: '🫒', tone: 'good', points: ['心血管硬終點證據最強', '彈性高、容易長期', '需控制橄欖油與堅果份量'] },
        { title: '低脂', icon: '🥗', tone: 'ok', points: ['LDL 下降', '高纖時效果較好', '若以精製澱粉取代脂肪則效益差'] },
      ],
    },
  },
  'FIG-D-07-01': {
    title: '植物性飲食的「品質」差很多',
    caption: 'Satija 2017（JACC）：植物性飲食指數最高 vs 最低五分位的冠心病風險。',
    takeaway: '健康的植物性飲食護心；以精製澱粉與甜飲為主的「素食」反而傷心。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'HR 冠心病',
      max: 1.4,
      ref: { value: 1, label: '最低五分位＝ 1.0' },
      items: [
        { label: '健康植物性飲食指數 hPDI', value: 0.75, display: 'HR 0.75（−25%）', icon: '🥦', tone: 'good' },
        { label: '整體植物性飲食指數 PDI', value: 0.92, display: 'HR 0.92', icon: '🌱', tone: 'ok' },
        { label: '不健康植物性飲食指數 uPDI', value: 1.32, display: 'HR 1.32（+32%）', icon: '🍩', tone: 'bad' },
      ],
    },
  },
  'FIG-D-07-02': {
    title: '健康 vs 不健康的植物性食物',
    caption: 'PDI 研究中的食物分類。',
    takeaway: '素食不等於健康：素料、甜飲、白麵包也是植物做的。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '健康植物性食物', icon: '✅', tone: 'good', points: ['全穀', '蔬菜、水果', '堅果、豆類', '植物油', '茶與咖啡'] },
        { title: '不健康植物性食物', icon: '⚠️', tone: 'bad', points: ['精製穀類（白麵包、白麵）', '馬鈴薯（炸薯條）', '果汁、含糖飲料', '甜點糖果', '高鈉加工素料'] },
      ],
    },
  },
  'FIG-D-08-01': {
    title: 'NOVA 食物加工分類',
    caption: '依加工的目的與程度把食物分成四類。',
    takeaway: '第 1–3 類可放心安排，第 4 類超加工食品要減量。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: 'NOVA 1', label: '未加工／低度加工', detail: '蔬果、生鮮肉魚蛋、乾豆、冷凍蔬菜、鮮奶', tone: 'good', icon: '🥬' },
        { range: 'NOVA 2', label: '加工烹調原料', detail: '油、鹽、糖、醋（用來煮菜）', tone: 'ok', icon: '🧂' },
        { range: 'NOVA 3', label: '加工食品', detail: '板豆腐、起司、罐頭魚、手工麵包', tone: 'ok', icon: '🧀' },
        { range: 'NOVA 4', label: '超加工食品', detail: '含糖飲料、泡麵、香腸、洋芋片、甜麵包', tone: 'bad', icon: '🍟' },
      ],
    },
  },
  'FIG-D-08-02': {
    title: '超加工食品與健康結果（BMJ 2024 傘狀回顧）',
    caption: 'Lane 2024 BMJ：45 項統合分析、約 990 萬人；高 vs 低攝取的風險增加（證據等級「令人信服」或「高度提示」者）。',
    takeaway: '超加工食品與心血管死亡、心理健康與第 2 型糖尿病的關聯證據最強。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: '% 風險增加',
      max: 60,
      items: [
        { label: '心血管疾病死亡', value: 50, display: '+50%', icon: '❤️', tone: 'bad' },
        { label: '焦慮與常見精神疾患', value: 50, display: '+48–53%', icon: '🧠', tone: 'bad' },
        { label: '全因死亡', value: 21, display: '+21%', icon: '🧬', tone: 'warn' },
        { label: '第 2 型糖尿病', value: 12, display: '+12%', icon: '🩸', tone: 'warn' },
      ],
    },
  },
  'FIG-D-09-01': {
    title: '同一餐，晚吃的血糖較高',
    caption: '示意：晚餐 22:00 vs 18:00 的餐後血糖（Gu 2020 等研究）。',
    takeaway: '身體在晚上處理碳水的能力較差——晚餐提早、份量放小。',
    grade: 'B',
    sources: SRC,
    schematic: true,
    chart: {
      kind: 'curve',
      x: { label: '餐後時間', unit: '分鐘', min: 0, max: 240, ticks: [0, 60, 120, 180, 240] },
      y: { label: '血糖', unit: 'mg/dL', min: 80, max: 170, ticks: [80, 110, 140, 170] },
      series: [
        { name: '22:00 晚吃', tone: 'bad', points: [[0, 92], [30, 150], [60, 158], [120, 135], [180, 112], [240, 98]] },
        { name: '18:00 早吃', tone: 'good', points: [[0, 90], [30, 135], [60, 138], [120, 115], [180, 98], [240, 92]] },
      ],
    },
  },
  'FIG-D-09-02': {
    title: '時間營養學的一日安排',
    caption: '配合晝夜節律的進食時間建議。',
    takeaway: '早餐吃好、晚餐提早、睡前 2–3 小時不再進食。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'timeline',
      items: [
        { t: '07:00–09:00', label: '早餐含蛋白質', detail: '晨光＋早餐幫助重設生理時鐘', icon: '🌅', tone: 'good' },
        { t: '12:00–13:00', label: '午餐為主餐', detail: '胰島素敏感度較高的時段', icon: '☀️', tone: 'good' },
        { t: '18:00–19:30', label: '晚餐提早、份量較小', detail: '減少精製澱粉', icon: '🌇', tone: 'ok' },
        { t: '睡前 2–3 小時', label: '停止進食', detail: '避免宵夜影響血糖與睡眠', icon: '🌙', tone: 'warn' },
      ],
    },
  },
  'FIG-D-10-01': {
    title: '飲食模式選擇矩陣',
    caption: '依健康目標比較主要飲食模式的實證強度（●越多越強）。',
    takeaway: '先找出自己的首要目標，再挑證據最強、又吃得下去的模式。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['心血管', '血壓', '血糖', '減重', '易持續'],
      rows: [
        { label: '地中海', icon: '🫒', cells: [{ text: '●●●', tone: 'good' }, { text: '●●', tone: 'ok' }, { text: '●●', tone: 'ok' }, { text: '●●', tone: 'ok' }, { text: '●●●', tone: 'good' }] },
        { label: 'DASH', icon: '🥦', cells: [{ text: '●●', tone: 'ok' }, { text: '●●●', tone: 'good' }, { text: '●●', tone: 'ok' }, { text: '●', tone: 'warn' }, { text: '●●', tone: 'ok' }] },
        { label: '低碳', icon: '🥩', cells: [{ text: '●', tone: 'warn' }, { text: '●', tone: 'warn' }, { text: '●●●', tone: 'good' }, { text: '●●', tone: 'ok' }, { text: '●', tone: 'warn' }] },
        { label: '健康植物性', icon: '🌱', cells: [{ text: '●●●', tone: 'good' }, { text: '●●', tone: 'ok' }, { text: '●●', tone: 'ok' }, { text: '●●', tone: 'ok' }, { text: '●●', tone: 'ok' }] },
        { label: '限時進食', icon: '⏰', cells: [{ text: '●', tone: 'warn' }, { text: '●', tone: 'warn' }, { text: '●●', tone: 'ok' }, { text: '●●', tone: 'ok' }, { text: '●●', tone: 'ok' }] },
      ],
    },
  },
  'FIG-D-10-02': {
    title: '找出你的飲食模式：四步驟',
    caption: '從目標、限制、偏好到追蹤的選擇流程。',
    takeaway: '試行 4–8 週、看數據、再調整——飲食模式也需要 PDCA。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '設定目標', detail: '血壓？血糖？體重？心血管？', icon: '🎯', tone: 'info' },
        { label: '列出限制', detail: '疾病、藥物、預算、宗教、外食比例', icon: '📋', tone: 'warn' },
        { label: '試行 4–8 週', detail: '選一種模式，先從兩個改變開始', icon: '🧪', tone: 'ok' },
        { label: '追蹤與調整', detail: '體重、腰圍、血壓、抽血、感受', icon: '🔁', tone: 'good' },
      ],
    },
  },
};
