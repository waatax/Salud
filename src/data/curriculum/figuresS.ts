import type { CurriculumFigure } from '../curriculumFigures';

const SRC = ['SRC-CURR-2026'];

// ═══════════════════════════════════════════════════════════════════════════
// Chapter S — figures for every page (01–08)
// ═══════════════════════════════════════════════════════════════════════════
export const FIGURES_S: Record<string, CurriculumFigure> = {
  'FIG-S-01-01': {
    title: '果糖如何繞過肝臟的「煞車」',
    caption: '大量游離果糖在肝臟的代謝路徑（示意）。',
    takeaway: '果糖不受能量飽和訊號抑制，過量時直接變成肝臟脂肪與尿酸。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '含糖飲料', detail: '大量游離果糖快速抵達肝臟', icon: '🧋', tone: 'warn' },
        { label: '果糖激酶', detail: '繞過 PFK-1 檢查點，無回饋抑制', icon: '⚙️', tone: 'bad' },
        { label: '新生脂肪合成 DNL', detail: '三酸甘油酯與肝臟脂肪堆積', icon: '🫃', tone: 'bad' },
        { label: 'ATP 耗竭', detail: '嘌呤分解 → 尿酸上升', icon: '💎', tone: 'bad' },
      ],
    },
  },
  'FIG-S-01-02': {
    title: '整顆水果 vs 果汁 vs 含糖飲料',
    caption: '同樣含糖，食物結構不同，對肝臟的衝擊不同。',
    takeaway: '要吃水果，不要喝果汁；纖維是果糖的天然緩衝。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '整顆水果', icon: '🍊', tone: 'good', points: ['纖維包覆、需咀嚼', '果糖緩慢釋放，小腸先處理大部分', '與糖尿病風險降低相關'] },
        { title: '100% 果汁', icon: '🧃', tone: 'warn', points: ['纖維被去除', '3–4 顆柳丁的糖一次喝下', '每日最多 1 小杯（≤ 150 mL）'] },
        { title: '含糖飲料', icon: '🥤', tone: 'bad', points: ['游離糖濃度高、無營養', '與脂肪肝、痛風、糖尿病相關', '越少越好'] },
      ],
    },
  },
  'FIG-S-02-01': {
    title: '手搖飲甜度階梯（大杯 700 mL 純茶）',
    caption: '各甜度的大致添加糖量；1 顆方糖約 5 g。實際依店家而異。',
    takeaway: '半糖大杯就已接近 WHO 理想上限 25 g——微糖或無糖才安全。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g 糖',
      max: 62,
      ref: { value: 25, label: 'WHO 理想上限 25 g/日（< 5% 熱量）' },
      items: [
        { label: '全糖', value: 55, display: '≈50–60 g（11 顆方糖）', icon: '🧋', tone: 'bad' },
        { label: '少糖（七分）', value: 38, display: '≈35–42 g', icon: '🧋', tone: 'bad' },
        { label: '半糖', value: 28, display: '≈25–30 g', icon: '🧋', tone: 'warn' },
        { label: '微糖（三分）', value: 16, display: '≈15–18 g', icon: '🧋', tone: 'ok' },
        { label: '一分糖', value: 5, display: '≈5 g', icon: '🍵', tone: 'good' },
        { label: '無糖', value: 0.5, display: '0 g', icon: '🍵', tone: 'good' },
      ],
    },
  },
  'FIG-S-02-02': {
    title: '配料熱量擂台（每份）',
    caption: '常見手搖飲配料的熱量代表值。',
    takeaway: '想加料就選仙草、愛玉、寒天；珍珠與奶蓋是熱量大戶。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'kcal',
      items: [
        { label: '珍珠／波霸', value: 200, display: '≈180–220 kcal', icon: '⚫', tone: 'bad' },
        { label: '奶蓋', value: 170, display: '≈150–200 kcal', icon: '☁️', tone: 'bad' },
        { label: '芋圓', value: 140, display: '≈130–150 kcal', icon: '🟣', tone: 'warn' },
        { label: '椰果', value: 85, display: '≈70–100 kcal', icon: '⬜', tone: 'warn' },
        { label: '仙草', value: 30, display: '≈30 kcal', icon: '⬛', tone: 'good' },
        { label: '愛玉、寒天', value: 20, display: '≈20 kcal', icon: '🟡', tone: 'good' },
      ],
    },
  },
  'FIG-S-03-01': {
    title: '常見代糖的每日可接受攝取量（ADI）',
    caption: '國際食品添加物專家委員會（JECFA）／歐盟 EFSA 訂定的 ADI；60 kg 成人對應的大約罐數。',
    takeaway: '一般飲用量遠低於 ADI；但代糖是過渡工具，終點是水與無糖茶。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['甜度（蔗糖＝1）', 'ADI（mg/kg/日）', '60 kg 約相當'],
      rows: [
        { label: '阿斯巴甜', icon: '🧪', cells: ['≈200', '40', { text: '零卡汽水 9–14 罐', tone: 'ok' }] },
        { label: '蔗糖素', icon: '🧪', cells: ['≈600', '15', { text: '遠高於一般用量', tone: 'ok' }] },
        { label: '醋磺內酯鉀', icon: '🧪', cells: ['≈200', '15', { text: '常與其他代糖併用', tone: 'ok' }] },
        { label: '甜菊糖苷', icon: '🌿', cells: ['≈200–300', '4（以甜菊醇計）', { text: '植物來源，仍有上限', tone: 'ok' }] },
        { label: '赤藻糖醇', icon: '⚠️', cells: ['≈0.7', 'EFSA 2023：0.5 g/kg', { text: '心血管高風險者避免大量', tone: 'warn' }] },
      ],
    },
  },
  'FIG-S-03-02': {
    title: '烹調方式與飲食 AGEs',
    caption: '一份雞腿（約 90 g）在不同烹調下的糖化終產物代表值（kU）。',
    takeaway: '多用蒸、煮、燉；少用高溫乾烤與油炸，AGEs 可差 10 倍以上。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'kU AGEs',
      items: [
        { label: '水煮、清蒸', value: 1000, display: '≈1,000 kU', icon: '♨️', tone: 'good' },
        { label: '燉滷', value: 2000, display: '≈2,000 kU', icon: '🍲', tone: 'ok' },
        { label: '烤箱烘烤', value: 5000, display: '≈5,000 kU', icon: '🔥', tone: 'warn' },
        { label: '油炸、蜜汁燒烤', value: 9000, display: '≈9,000–18,000 kU', icon: '🍗', tone: 'bad' },
      ],
    },
  },
  'FIG-S-04-01': {
    title: '每日游離糖上限（2,000 kcal）',
    caption: 'WHO 建議游離糖 < 10% 總熱量，理想 < 5%；1 g 糖＝ 4 kcal。',
    takeaway: '理想上限 25 g ≈ 5 顆方糖——一杯半糖手搖飲就用完了。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '< 25 g', label: '理想：< 5% 熱量', detail: 'WHO 條件式建議，額外降低蛀牙風險', tone: 'good', icon: '✅' },
        { range: '25–50 g', label: '可接受：< 10% 熱量', detail: 'WHO 強烈建議、台灣國健署建議', tone: 'ok', icon: '🟦' },
        { range: '> 50 g', label: '超標：> 10% 熱量', detail: '與肥胖、蛀牙、心血管代謝風險上升相關', tone: 'bad', icon: '⛔' },
      ],
    },
  },
  'FIG-S-04-02': {
    title: '「游離糖」包含什麼？',
    caption: '依 WHO 定義區分游離糖與內源糖。',
    takeaway: '被「拿出來」的糖都算游離糖——包括蜂蜜與果汁。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '算游離糖', icon: '🍯', tone: 'bad', points: ['砂糖、黑糖、冰糖', '蜂蜜、楓糖漿、果糖糖漿', '100% 果汁、濃縮果汁', '食品製造中添加的各種糖'] },
        { title: '不算游離糖', icon: '🍎', tone: 'good', points: ['完整新鮮水果中的糖', '蔬菜中的糖', '牛奶中天然的乳糖', '（仍計入總碳水）'] },
      ],
    },
  },
  'FIG-S-05-01': {
    title: '隱藏糖：看不出甜的食物含多少糖',
    caption: '常見食品每份的總糖量代表值（實際以產品標示為準）。',
    takeaway: '調味優格、早餐穀片與醬料是三大「隱形糖」來源。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g 糖／份',
      items: [
        { label: '調味優格 1 杯', value: 18, display: '≈12–20 g', icon: '🥄', tone: 'bad' },
        { label: '早餐穀片 1 碗（40 g）', value: 12, display: '≈8–15 g', icon: '🥣', tone: 'warn' },
        { label: '調味豆漿 1 瓶', value: 20, display: '≈15–25 g', icon: '🥛', tone: 'bad' },
        { label: '蜜汁肉乾 1 片', value: 8, display: '≈6–10 g', icon: '🥓', tone: 'warn' },
        { label: '番茄醬 1 大匙', value: 4, display: '≈4 g', icon: '🍅', tone: 'ok' },
        { label: '無糖優格 1 杯', value: 6, display: '≈5–7 g（乳糖）', icon: '✅', tone: 'good' },
      ],
    },
  },
  'FIG-S-05-02': {
    title: '成分表裡的糖的別名',
    caption: '同一產品可能用多種糖分散排序，讓糖看起來不在前幾名。',
    takeaway: '把成分表中所有「糖的別名」加起來看，才是真實的含糖程度。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['常見名稱', '提示'],
      rows: [
        { label: '…糖', icon: '🔤', cells: ['砂糖、蔗糖、葡萄糖、果糖、麥芽糖、乳糖', { text: '名稱帶「糖」', tone: 'warn' }] },
        { label: '…糖漿', icon: '🍯', cells: ['高果糖玉米糖漿、果糖糖漿、麥芽糖漿、楓糖漿', { text: '液態糖', tone: 'bad' }] },
        { label: '…蜜', icon: '🐝', cells: ['蜂蜜、龍眼蜜、糖蜜', { text: '仍是游離糖', tone: 'warn' }] },
        { label: '濃縮果汁', icon: '🧃', cells: ['濃縮蘋果汁、葡萄濃縮汁', { text: '「天然」但算游離糖', tone: 'warn' }] },
        { label: '麥芽糊精', icon: '🧂', cells: ['麥芽糊精、玉米糖膠固形物', { text: '升糖快，常不計入糖', tone: 'info' }] },
      ],
    },
  },
  'FIG-S-06-01': {
    title: '牙菌斑 pH 值的 Stephan 曲線',
    caption: '吃糖後牙菌斑 pH 急降，低於 5.5 即開始脫礦；約 30–60 分鐘後回升。',
    takeaway: '蛀牙看「次數」：一天小口啜飲 6 次，比一次喝完傷牙得多。',
    grade: 'B',
    sources: SRC,
    schematic: true,
    chart: {
      kind: 'curve',
      x: { label: '吃糖後時間', unit: '分鐘', min: 0, max: 60, ticks: [0, 5, 10, 20, 30, 45, 60] },
      y: { label: '牙菌斑 pH', min: 4.5, max: 7.2, ticks: [4.5, 5.5, 6.5, 7] },
      series: [{ name: '牙菌斑 pH', tone: 'bad', points: [[0, 6.8], [3, 5.6], [8, 5.0], [15, 5.2], [25, 5.7], [40, 6.3], [60, 6.7]] }],
      bands: [{ from: 4, to: 22, label: 'pH < 5.5 脫礦區', tone: 'bad' }],
    },
  },
  'FIG-S-06-02': {
    title: '同樣一杯含糖飲料，兩種喝法',
    caption: '一天的牙齒「酸攻擊」次數比較。',
    takeaway: '要喝就在正餐時一次喝完，喝完漱口；別整天小口啜飲。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '整天小口啜飲', icon: '⏳', tone: 'bad', points: ['每次啜飲都重新啟動酸攻擊', '牙齒長時間處於 pH < 5.5', '唾液來不及中和與再礦化'] },
        { title: '正餐時一次喝完', icon: '⏱️', tone: 'good', points: ['只有 1 次酸攻擊', '用餐時唾液分泌多、緩衝佳', '喝完以清水漱口'] },
      ],
      verdict: '頻率比總量更決定蛀牙風險；含氟牙膏（1,000 ppm 以上）早晚刷牙是基本防線。',
    },
  },
  'FIG-S-07-01': {
    title: '甜味偏好可以重設',
    caption: '逐步減糖時，味覺對甜度的感受變化（示意）。',
    takeaway: '撐過最初 2–4 週，原本的半糖會開始覺得「太甜」。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'timeline',
      items: [
        { t: '第 1 週', label: '全糖 → 半糖', detail: '覺得味道淡、想念甜味', icon: '😕', tone: 'warn' },
        { t: '第 2–3 週', label: '半糖 → 微糖', detail: '味覺開始適應，渴望減少', icon: '🙂', tone: 'ok' },
        { t: '第 4–6 週', label: '微糖 → 無糖', detail: '同樣甜度感覺更甜、能嚐到茶香', icon: '😊', tone: 'good' },
        { t: '之後', label: '偶爾喝全糖會覺得太膩', detail: '新的「甜度基準」建立', icon: '🎯', tone: 'good' },
      ],
    },
  },
  'FIG-S-07-02': {
    title: '想吃甜時的「暫停五步驟」',
    caption: '針對情緒性或習慣性吃甜的行為策略。',
    takeaway: '想吃甜不是錯，先暫停、辨識需求，再決定要不要吃。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '暫停 10 分鐘', detail: '衝動通常會在數分鐘內下降', icon: '⏸️', tone: 'ok' },
        { label: '辨識需求', detail: '真的餓？累？無聊？壓力？', icon: '🔍', tone: 'info' },
        { label: '先喝水或無糖茶', detail: '滿足口腔與溫度需求', icon: '🍵', tone: 'good' },
        { label: '選替代品', detail: '水果、無糖優格、黑巧克力一小塊', icon: '🍓', tone: 'good' },
        { label: '真想吃就小份量', detail: '專心享受，不帶罪惡感', icon: '🍰', tone: 'ok' },
      ],
    },
  },
  'FIG-S-08-01': {
    title: '兒童與青少年的添加糖上限',
    caption: '美國心臟協會（AHA）與 WHO 建議。',
    takeaway: '2 歲以下不加糖；2 歲以上每天添加糖少於 25 g，含糖飲料每週不超過 1 杯。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '< 2 歲', label: '完全避免添加糖', detail: '包括果汁、加糖副食品與蜂蜜（< 1 歲禁止）', tone: 'bad', icon: '👶' },
        { range: '2–18 歲', label: '添加糖 < 25 g/日（約 6 茶匙）', detail: '含糖飲料每週 ≤ 240 mL', tone: 'warn', icon: '🧒' },
        { range: '成人', label: '游離糖 < 10%，理想 < 5% 熱量', detail: '2,000 kcal 約 25–50 g', tone: 'ok', icon: '🧑' },
      ],
    },
  },
  'FIG-S-08-02': {
    title: '含糖飲料稅的國際經驗',
    caption: '代表性國家實施後的變化（不同研究設計，數值為代表值）。',
    takeaway: '價格與環境政策能有效降低含糖飲料攝取，並促使業者減糖。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['政策', '主要結果'],
      rows: [
        { label: '墨西哥 2014', icon: '🇲🇽', cells: ['每公升課 1 披索（約 10%）', { text: '兩年含稅飲料購買 −7.6%', tone: 'good' }] },
        { label: '英國 2018', icon: '🇬🇧', cells: ['依含糖量分級課稅', { text: '業者配方減糖約 30–46%', tone: 'good' }] },
        { label: '台灣校園', icon: '🇹🇼', cells: ['各級學校不得販售含糖飲料', { text: '減少校內取得管道', tone: 'ok' }] },
      ],
    },
  },
};
