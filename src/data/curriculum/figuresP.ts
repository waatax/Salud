import type { CurriculumFigure } from '../curriculumFigures';

const SRC = ['SRC-CURR-2026'];

// ═══════════════════════════════════════════════════════════════════════════
// Chapter P — figures for every page (01–08)
// ═══════════════════════════════════════════════════════════════════════════
export const FIGURES_P: Record<string, CurriculumFigure> = {
  'FIG-P-01-01': {
    title: '每日蛋白質需求階梯（g/kg 體重）',
    caption: '依年齡、活動與健康狀態的建議區間；60 kg 成人對應的每日克數一併標示。',
    takeaway: '0.8 g/kg 只是防缺乏的底線，熟齡與運動族群需要更多。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '0.8–1.0', label: '一般成人防缺乏底線', detail: '60 kg ≈ 48–60 g／日', tone: 'neutral', icon: '🧍' },
        { range: '1.0–1.2', label: '65 歲以上長者（PROT-AGE）', detail: '60 kg ≈ 60–72 g／日', tone: 'ok', icon: '👵' },
        { range: '1.2–1.6', label: '減重期、規律運動、急慢性病長者', detail: '60 kg ≈ 72–96 g／日', tone: 'good', icon: '🏋️' },
        { range: '1.6–2.2', label: '增肌訓練者上限區', detail: '超過 ~1.6 g/kg 增肌效益趨平', tone: 'info', icon: '💪' },
        { range: '0.55–0.8', label: '慢性腎臟病 3–5 期（未透析）', detail: '須由腎臟科與營養師個別化', tone: 'bad', icon: '🩺' },
      ],
    },
  },
  'FIG-P-01-02': {
    title: '一份「豆魚蛋肉」＝ 7 g 蛋白質',
    caption: '台灣食物代換表中常見食物一份的重量。',
    takeaway: '每餐 3–4 份豆魚蛋肉，約可達 25–30 g 蛋白質。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['一份份量', '約略手量', '蛋白質'],
      rows: [
        { label: '雞蛋', icon: '🥚', cells: ['1 顆（55 g）', '1 顆', '7 g'] },
        { label: '傳統豆腐', icon: '⬜', cells: ['80 g', '約 3 格', '7 g'] },
        { label: '無糖豆漿', icon: '🥛', cells: ['190 mL', '小杯', '7 g'] },
        { label: '雞胸肉', icon: '🍗', cells: ['30 g（生重）', '約 2 指寬', '7 g'] },
        { label: '魚肉', icon: '🐟', cells: ['35 g', '約半掌', '7 g'] },
        { label: '鮮奶（乳品類）', icon: '🥛', cells: ['240 mL', '1 杯', { text: '8 g', tone: 'good' }] },
      ],
    },
  },
  'FIG-P-02-01': {
    title: '要吃多少蛋白質才達到白胺酸 2.5 g？',
    caption: '依各食物蛋白質的白胺酸含量（約 7–11%）推算，單餐需攝取的蛋白質克數。',
    takeaway: '乳清與乳製品最省力；植物蛋白多吃一點或混合搭配也能達標。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g 蛋白質',
      max: 42,
      ref: { value: 30, label: '一般建議每餐 25–30 g 蛋白質' },
      items: [
        { label: '乳清蛋白', value: 23, display: '≈23 g', icon: '🥤', tone: 'good' },
        { label: '牛奶', value: 25, display: '≈25 g', icon: '🥛', tone: 'good' },
        { label: '雞蛋', value: 29, display: '≈29 g（約 4 顆）', icon: '🥚', tone: 'ok' },
        { label: '雞胸、牛肉', value: 31, display: '≈31 g', icon: '🍗', tone: 'ok' },
        { label: '黃豆製品', value: 31, display: '≈31 g', icon: '🫘', tone: 'ok' },
        { label: '小麥蛋白', value: 37, display: '≈37 g', icon: '🌾', tone: 'warn' },
      ],
    },
  },
  'FIG-P-02-02': {
    title: '同樣 90 g 蛋白質，分配方式不同',
    caption: 'Mamerow 2014：三餐平均分配 vs 集中晚餐的 24 小時肌肉蛋白合成。',
    takeaway: '早餐是多數台灣人最缺蛋白質的一餐——先補早餐。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '偏斜分配 10／15／65 g', icon: '🌙', tone: 'warn', points: ['早餐只有吐司、奶茶', '午餐便當肉少', '晚餐大份量肉類', '24 小時合成率較低'] },
        { title: '平均分配 30／30／30 g', icon: '⚖️', tone: 'good', points: ['早餐蛋＋豆漿', '午餐一掌心肉或豆腐', '晚餐魚或雞', '24 小時合成率高約 25%'] },
      ],
      verdict: '總量相同下，每餐都達到合成門檻比較有效率。',
    },
  },
  'FIG-P-03-01': {
    title: '「豆魚蛋肉」優先順序的理由',
    caption: '每份（約 7 g 蛋白質）伴隨的飽和脂肪與健康效益比較。',
    takeaway: '先選豆類與魚，再選蛋，最後才是肉——加工肉越少越好。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['飽和脂肪', '額外好處', '建議頻率'],
      rows: [
        { label: '豆類', icon: '🫘', cells: [{ text: '極低', tone: 'good' }, '纖維、植化素、大豆異黃酮', '每天'] },
        { label: '魚類', icon: '🐟', cells: [{ text: '低', tone: 'good' }, 'EPA／DHA', '每週 ≥ 2 次'] },
        { label: '蛋', icon: '🥚', cells: [{ text: '中', tone: 'ok' }, '膽鹼、葉黃素', '每天 1 顆多數人可'] },
        { label: '禽肉', icon: '🍗', cells: [{ text: '中低（去皮）', tone: 'ok' }, '高蛋白低脂', '適量'] },
        { label: '紅肉', icon: '🥩', cells: [{ text: '高', tone: 'warn' }, '鐵、鋅、B12', '每週 ≤ 350–500 g 熟重'] },
        { label: '加工肉', icon: '🌭', cells: [{ text: '高＋高鈉', tone: 'bad' }, 'IARC 第 1 類致癌物', '越少越好'] },
      ],
    },
  },
  'FIG-P-03-02': {
    title: '胺基酸互補：穀類＋豆類拼出完整蛋白質',
    caption: '穀類缺離胺酸、豆類缺甲硫胺酸，同一天搭配即可互補。',
    takeaway: '飯配豆腐、饅頭配豆漿，就是傳統的互補智慧。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '穀類（米、麥）', icon: '🌾', tone: 'warn', points: ['離胺酸（Lysine）偏低', '甲硫胺酸較充足', '例：白飯、麵、饅頭'] },
        { title: '豆類（黃豆、黑豆）', icon: '🫘', tone: 'ok', points: ['離胺酸充足', '含硫胺基酸偏低', '例：豆腐、豆漿、毛豆'] },
        { title: '同日搭配', icon: '🤝', tone: 'good', points: ['胺基酸圖譜互補', 'DIAAS 明顯提升', '不必同一餐，同一天即可'] },
      ],
    },
  },
  'FIG-P-04-01': {
    title: 'AWGS 2019 肌少症篩檢與診斷流程',
    caption: '亞洲肌少症工作小組（AWGS 2019）的社區篩檢與確診路徑。',
    takeaway: '小腿圍、握力與起立坐下測驗在家也能初步自我檢查。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '篩檢', detail: '小腿圍 男 < 34 cm／女 < 33 cm，或 SARC-F ≥ 4', icon: '📏', tone: 'ok' },
        { label: '肌力', detail: '握力 男 < 28 kg／女 < 18 kg', icon: '✊', tone: 'warn' },
        { label: '體能表現', detail: '6 公尺步速 < 1.0 m/s 或 5 次起立坐下 ≥ 12 秒', icon: '🚶', tone: 'warn' },
        { label: '肌肉量', detail: 'DXA 男 < 7.0／女 < 5.4 kg/m²', icon: '🩻', tone: 'bad' },
      ],
    },
  },
  'FIG-P-04-02': {
    title: '年齡與每餐合成所需蛋白質',
    caption: '同化阻抗使長者每餐需要更多蛋白質才能達到相近的肌肉合成反應。',
    takeaway: '長者每餐約 0.4 g/kg（約 25–40 g）優質蛋白，並配合肌力訓練。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g/kg/餐',
      max: 0.5,
      items: [
        { label: '年輕成人', value: 0.24, display: '≈0.24 g/kg', icon: '🧑', tone: 'ok', note: '約 20 g' },
        { label: '65 歲以上長者', value: 0.4, display: '≈0.40 g/kg', icon: '👴', tone: 'warn', note: '約 25–40 g' },
      ],
    },
  },
  'FIG-P-05-01': {
    title: '「合成窗」是寬的：訓練後 24–48 小時',
    caption: '阻力訓練後，肌肉對蛋白質的敏感度可維持一至兩天。',
    takeaway: '不必衝回家喝蛋白飲，重要的是全天總量與每餐達標。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'timeline',
      items: [
        { t: '訓練前後 2 小時', label: '任一時間吃一餐蛋白質即可', detail: '空腹訓練者訓練後盡早進食較佳', icon: '🏋️', tone: 'ok' },
        { t: '0–24 小時', label: '合成率顯著上升', detail: '每餐 0.3–0.4 g/kg 蛋白質', icon: '📈', tone: 'good' },
        { t: '24–48 小時', label: '敏感度仍高於休息狀態', detail: '持續平均分配三至四餐', icon: '⏳', tone: 'good' },
        { t: '睡前', label: '可選 30–40 g 酪蛋白', detail: '長者與訓練量大者的加分選項', icon: '🌙', tone: 'info' },
      ],
    },
  },
  'FIG-P-05-02': {
    title: '增肌效益的平台：蛋白質攝取 vs 去脂體重增加',
    caption: 'Morton 2018 統合分析：搭配阻力訓練時，蛋白質攝取與去脂體重增加的關係。',
    takeaway: '約 1.6 g/kg 之後效益趨平；與其吃更多，不如練得更好、睡得更夠。',
    grade: 'A',
    sources: SRC,
    schematic: true,
    chart: {
      kind: 'curve',
      x: { label: '每日蛋白質', unit: 'g/kg', min: 0.8, max: 2.4, ticks: [0.8, 1.2, 1.6, 2.0, 2.4] },
      y: { label: '相對增肌效益', unit: '%', min: 0, max: 100, ticks: [0, 25, 50, 75, 100] },
      series: [{ name: '去脂體重增加（相對值）', tone: 'good', points: [[0.8, 40], [1.0, 60], [1.2, 75], [1.4, 88], [1.6, 97], [2.0, 99], [2.4, 100]] }],
      bands: [{ from: 1.6, to: 2.2, label: '平台區', tone: 'info' }],
    },
  },
  'FIG-P-06-01': {
    title: '腎功能分期與蛋白質建議（KDOQI 2020）',
    caption: '以 eGFR 分期；實際目標須由腎臟科醫師與營養師依蛋白尿、糖尿病與營養狀態個別化。',
    takeaway: '健康腎臟不怕高蛋白；腎功能已下降者則要「適量且優質」。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: 'eGFR ≥ 60', label: '腎功能正常或輕度下降', detail: '一般建議即可；避免長期 > 2 g/kg', tone: 'good', icon: '✅' },
        { range: 'eGFR 30–59', label: 'CKD 3 期', detail: '0.55–0.8 g/kg（糖尿病 0.6–0.8）', tone: 'warn', icon: '⚠️' },
        { range: 'eGFR < 30', label: 'CKD 4–5 期未透析', detail: '0.55–0.6 g/kg，或極低蛋白＋酮酸類似物', tone: 'bad', icon: '⛔' },
        { range: '透析中', label: '血液／腹膜透析', detail: '1.0–1.2 g/kg（透析會流失胺基酸）', tone: 'info', icon: '🩺' },
      ],
    },
  },
  'FIG-P-06-02': {
    title: '高蛋白飲食之前：腎臟安全檢核',
    caption: '開始每日 > 1.5 g/kg 高蛋白飲食前的自我檢查清單。',
    takeaway: '不知道自己腎功能？先抽血驗肌酸酐（eGFR）與驗尿蛋白。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['風險程度', '建議'],
      rows: [
        { label: '已知 CKD 或 eGFR < 60', icon: '🩺', cells: [{ text: '高', tone: 'bad' }, '勿自行高蛋白，依腎臟科建議'] },
        { label: '糖尿病合併蛋白尿', icon: '🧪', cells: [{ text: '高', tone: 'bad' }, '每 3–6 個月追蹤 UACR 與 eGFR'] },
        { label: '單一腎臟、腎結石病史', icon: '⚠️', cells: [{ text: '中', tone: 'warn' }, '適量、多喝水、先諮詢醫師'] },
        { label: '高血壓', icon: '❤️', cells: [{ text: '中', tone: 'warn' }, '定期檢查腎功能，優先植物蛋白'] },
        { label: '健康成人、腎功能正常', icon: '✅', cells: [{ text: '低', tone: 'good' }, '1.2–1.6 g/kg 安全'] },
      ],
    },
  },
  'FIG-P-07-01': {
    title: '台灣早餐的蛋白質含量',
    caption: '常見早餐店組合的蛋白質估計值（g）。',
    takeaway: '把奶茶換成無糖豆漿、加一顆蛋，早餐蛋白質就能翻倍。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g 蛋白質',
      max: 32,
      ref: { value: 25, label: '每餐目標 25 g' },
      items: [
        { label: '奶油吐司＋奶茶', value: 6, display: '≈6 g', icon: '🍞', tone: 'bad' },
        { label: '蘿蔔糕＋紅茶', value: 4, display: '≈4 g', icon: '🥞', tone: 'bad' },
        { label: '火腿蛋餅＋奶茶', value: 13, display: '≈13 g', icon: '🌯', tone: 'warn' },
        { label: '饅頭夾蛋＋無糖豆漿', value: 22, display: '≈22 g', icon: '🥟', tone: 'ok' },
        { label: '鮪魚蛋三明治＋鮮奶', value: 27, display: '≈27 g', icon: '🥪', tone: 'good' },
      ],
    },
  },
  'FIG-P-07-02': {
    title: '一天 90 g 蛋白質怎麼吃（70 kg × 1.3 g/kg）',
    caption: '以台灣常見食物組成的一日範例。',
    takeaway: '三餐各 25–30 g，再用一份乳品或豆漿補足，就不難達標。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'stack',
      unit: 'g',
      items: [
        { label: '早餐：蛋 2 顆＋無糖豆漿', value: 26, display: '26 g', icon: '🌅', tone: 'ok' },
        { label: '午餐：雞腿便當（去皮）', value: 30, display: '30 g', icon: '🍱', tone: 'good' },
        { label: '點心：鮮奶或優格', value: 8, display: '8 g', icon: '🥛', tone: 'info' },
        { label: '晚餐：魚＋豆腐＋糙米飯', value: 28, display: '28 g', icon: '🐟', tone: 'warn' },
      ],
    },
  },
  'FIG-P-08-01': {
    title: '常見蛋白粉比較',
    caption: '每 25 g 粉末的大致特性；實際以產品標示為準。',
    takeaway: '蛋白粉是方便工具，不是必需品；原型食物能吃夠就不必買。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['蛋白質', '白胺酸', '特性', '適合'],
      rows: [
        { label: '濃縮乳清 WPC', icon: '🥛', cells: ['≈18–20 g', { text: '高', tone: 'good' }, '含少量乳糖', '多數人'] },
        { label: '分離乳清 WPI', icon: '🥛', cells: ['≈22 g', { text: '高', tone: 'good' }, '乳糖極低', '乳糖不耐者'] },
        { label: '酪蛋白', icon: '🌙', cells: ['≈20 g', { text: '高', tone: 'good' }, '消化慢', '睡前、長者'] },
        { label: '大豆分離蛋白', icon: '🫘', cells: ['≈22 g', { text: '中', tone: 'ok' }, '完全蛋白', '素食者'] },
        { label: '豌豆／米蛋白', icon: '🌱', cells: ['≈20 g', { text: '中低', tone: 'warn' }, '建議混合', '對乳、豆過敏者'] },
      ],
    },
  },
  'FIG-P-08-02': {
    title: '選購蛋白補充品的四道關卡',
    caption: '台灣蛋白粉多屬一般食品，品質差異大，需自行把關。',
    takeaway: '看第三方檢驗、成分越單純越好，並避免來源不明的海外代購。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '真的需要嗎？', detail: '先算三餐是否已達 1.2 g/kg', icon: '🤔', tone: 'neutral' },
        { label: '看成分', detail: '蛋白質含量 ≥ 70%，少添加糖與香料', icon: '🔍', tone: 'ok' },
        { label: '第三方檢驗', detail: '重金屬、禁藥與微生物檢驗報告', icon: '🧪', tone: 'good' },
        { label: '特殊族群', detail: '腎病、孕婦、兒童先諮詢醫師或營養師', icon: '🩺', tone: 'warn' },
      ],
    },
  },
};
