import type { CurriculumFigure } from '../curriculumFigures';

const SRC = ['SRC-CURR-2026'];

// ═══════════════════════════════════════════════════════════════════════════
// Chapter C — figures for every page (01–10)
// ═══════════════════════════════════════════════════════════════════════════
export const FIGURES_C: Record<string, CurriculumFigure> = {
  'FIG-C-01-01': {
    title: '常見主食的升糖指數（GI）與一份的升糖負荷（GL）',
    caption: 'GI 以葡萄糖＝100 為基準；GL＝GI × 一份可利用碳水（g）÷ 100。數值為代表值，會隨品種與烹調改變。',
    takeaway: '看 GI 也要看份量：GL ≤ 10 為低、≥ 20 為高。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['GI', '一份', 'GL'],
      rows: [
        { label: '糯米飯', icon: '🍙', cells: [{ text: '≈87 高', tone: 'bad' }, '1 碗', { text: '≈45 高', tone: 'bad' }] },
        { label: '白飯', icon: '🍚', cells: [{ text: '≈73 高', tone: 'bad' }, '1 碗', { text: '≈40 高', tone: 'bad' }] },
        { label: '糙米飯', icon: '🍚', cells: [{ text: '≈68 中', tone: 'warn' }, '1 碗', { text: '≈33 高', tone: 'warn' }] },
        { label: '燕麥粒（鋼切）', icon: '🥣', cells: [{ text: '≈55 低', tone: 'good' }, '40 g 乾重', { text: '≈13 中', tone: 'ok' }] },
        { label: '香蕉', icon: '🍌', cells: [{ text: '≈51 低', tone: 'good' }, '1 根', { text: '≈13 中', tone: 'ok' }] },
        { label: '蘋果', icon: '🍎', cells: [{ text: '≈36 低', tone: 'good' }, '1 顆', { text: '≈6 低', tone: 'good' }] },
      ],
    },
  },
  'FIG-C-01-02': {
    title: '碳水化合物占比與死亡風險的 U 型曲線',
    caption: 'ARIC 世代與統合分析（Seidelmann 2018, Lancet Public Health）：碳水占熱量比例與全因死亡風險比（HR）。',
    takeaway: '極低碳與極高碳都不理想；碳水約 50–55% 且來源是全穀植物時風險最低。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'curve',
      x: { label: '碳水化合物占總熱量', unit: '%', min: 30, max: 70, ticks: [30, 40, 50, 55, 60, 70] },
      y: { label: '全因死亡風險比', unit: 'HR', min: 0.9, max: 1.3, ticks: [0.9, 1.0, 1.1, 1.2, 1.3] },
      series: [{ name: '全因死亡 HR（相對 50–55%）', tone: 'warn', points: [[30, 1.2], [37, 1.1], [45, 1.03], [52, 1.0], [60, 1.05], [65, 1.12], [70, 1.2]] }],
      bands: [{ from: 50, to: 55, label: '最低風險區', tone: 'good' }],
    },
  },
  'FIG-C-02-01': {
    title: '台灣成人的膳食纖維缺口',
    caption: '國人平均攝取與建議量比較（g/日）。',
    takeaway: '多數人只吃到建議量的一半——每天再多 10 克就有感。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g/日',
      max: 38,
      ref: { value: 25, label: '最低目標 25 g/日' },
      items: [
        { label: '國人平均攝取', value: 15, display: '≈14–16 g', icon: '🇹🇼', tone: 'bad' },
        { label: '台灣 DRIs（每 1,000 kcal × 14 g）', value: 28, display: '≈20–38 g', icon: '📋', tone: 'ok', note: '依熱量需求' },
        { label: 'Lancet 2019 最佳效益區', value: 30, display: '25–29 g 以上', icon: '🏆', tone: 'good', note: '死亡與心血管風險降 15–30%' },
      ],
    },
  },
  'FIG-C-02-02': {
    title: '水溶性 vs 非水溶性纖維',
    caption: '兩類纖維的作用部位、健康效益與台灣常見來源。',
    takeaway: '兩種都要：水溶性管血脂血糖，非水溶性管排便規律。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '水溶性纖維', icon: '🫧', tone: 'ok', points: ['在小腸形成凝膠、結合膽酸', '降低 LDL 膽固醇', '延緩血糖上升', '來源：燕麥、黑木耳、秋葵、愛玉、芭樂、豆類'] },
        { title: '非水溶性纖維', icon: '🧹', tone: 'good', points: ['吸水增加糞便體積', '促進腸道蠕動', '縮短致癌物接觸時間', '來源：糙米、麩皮、竹筍、牛蒡、蔬菜梗'] },
      ],
    },
  },
  'FIG-C-03-01': {
    title: '腸道菌發酵產物：短鏈脂肪酸比例',
    caption: '纖維與抗性澱粉在結腸發酵後，乙酸、丙酸、丁酸的大致莫耳比。',
    takeaway: '丁酸是結腸細胞的主要燃料——吃纖維就是在餵它。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'donut',
      center: 'SCFA',
      items: [
        { label: '乙酸 Acetate', value: 60, icon: '🔵', tone: 'ok', note: '進入血液，供周邊組織利用' },
        { label: '丙酸 Propionate', value: 20, icon: '🟣', tone: 'info', note: '於肝臟參與糖質新生調控' },
        { label: '丁酸 Butyrate', value: 20, icon: '🟢', tone: 'good', note: '結腸細胞燃料、強化屏障' },
      ],
    },
  },
  'FIG-C-03-02': {
    title: '益生菌、益生質與共生質',
    caption: '補「菌」也要補菌的「食物」。',
    takeaway: '天天吃多樣植物（每週 30 種為目標）是養好菌最可靠的方法。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '益生菌 Probiotics', detail: '優格、克弗爾、泡菜、味噌', icon: '🦠', tone: 'ok' },
        { label: '益生質 Prebiotics', detail: '洋蔥、大蒜、香蕉、燕麥、豆類', icon: '🧅', tone: 'good' },
        { label: '共生質 Synbiotics', detail: '兩者同時攝取，提高定殖機會', icon: '🤝', tone: 'info' },
        { label: '短鏈脂肪酸', detail: '降低發炎、改善胰島素敏感度', icon: '✨', tone: 'good' },
      ],
    },
  },
  'FIG-C-04-01': {
    title: '醣類的結構階梯',
    caption: '依糖單位數量分類，從單醣到多醣。',
    takeaway: '分子越大、結構越緊密，消化越慢；但加工會把大分子「打散」。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '1 個', label: '單醣：葡萄糖、果糖、半乳糖', detail: '直接吸收', tone: 'bad', icon: '🔹' },
        { range: '2 個', label: '雙醣：蔗糖、乳糖、麥芽糖', detail: '需雙醣酶分解', tone: 'warn', icon: '🔸' },
        { range: '3–9 個', label: '寡醣：果寡糖、半乳寡糖', detail: '人體難消化，供腸道菌發酵', tone: 'good', icon: '🧬' },
        { range: '≥ 10 個', label: '多醣：澱粉、肝醣、膳食纖維', detail: '澱粉可消化；纖維不可消化', tone: 'ok', icon: '🌾' },
      ],
    },
  },
  'FIG-C-04-02': {
    title: '直鏈澱粉 vs 支鏈澱粉',
    caption: '澱粉的兩種結構決定消化速度與口感。',
    takeaway: '越 Q 越黏（支鏈多）通常升糖越快；直鏈多的米較不易升糖且較易形成抗性澱粉。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '直鏈澱粉 Amylose', icon: '➖', tone: 'good', points: ['線性螺旋、結構緊密', '消化較慢、GI 較低', '冷卻後易老化成抗性澱粉', '例：在來米、印度香米、豆類澱粉'] },
        { title: '支鏈澱粉 Amylopectin', icon: '🌿', tone: 'warn', points: ['高度分支、表面積大', '消化快、GI 較高', '口感軟 Q 黏', '例：糯米（近 100%）、蓬萊米、馬鈴薯'] },
      ],
    },
  },
  'FIG-C-05-01': {
    title: '每天多吃 90 g 全穀，風險下降多少',
    caption: 'Aune 2016 BMJ 統合分析：全穀攝取每增加 90 g/日（約 3 份）的相對風險下降。',
    takeaway: '把一半的白飯換成糙米或燕麥，就是證據最強的飲食改變之一。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: '% 風險下降',
      max: 25,
      items: [
        { label: '心血管疾病', value: 22, display: '−22%', icon: '❤️', tone: 'good' },
        { label: '冠心病', value: 19, display: '−19%', icon: '🫀', tone: 'good' },
        { label: '全因死亡', value: 17, display: '−17%', icon: '🧬', tone: 'good' },
        { label: '癌症死亡', value: 15, display: '−15%', icon: '🎗️', tone: 'ok' },
      ],
    },
  },
  'FIG-C-05-02': {
    title: '一碗飯的營養差異：白米 vs 糙米',
    caption: '每碗（約 160 g 熟重）的代表值；糙米保留了麩皮與胚芽。',
    takeaway: '糙米的纖維約是白米的 4–5 倍，維生素 B1 與鎂也明顯較多。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['膳食纖維', '維生素 B1', '鎂', '熱量'],
      rows: [
        { label: '白米飯', icon: '🍚', cells: [{ text: '≈0.6 g', tone: 'bad' }, { text: '低', tone: 'warn' }, { text: '≈19 mg', tone: 'warn' }, '≈280 kcal'] },
        { label: '糙米飯', icon: '🍚', cells: [{ text: '≈2.8 g', tone: 'good' }, { text: '約 4 倍', tone: 'good' }, { text: '≈70 mg', tone: 'good' }, '≈270 kcal'] },
        { label: '五穀米飯', icon: '🌾', cells: [{ text: '≈2–3 g', tone: 'good' }, { text: '較高', tone: 'good' }, { text: '較高', tone: 'good' }, '≈270 kcal'] },
      ],
    },
  },
  'FIG-C-06-01': {
    title: '同一份飯，不同吃法的餐後血糖',
    caption: '示意：先吃蔬菜蛋白質、或將米飯冷藏後回溫，可壓低餐後血糖峰值（第 2 型糖尿病小型交叉試驗）。',
    takeaway: '不必戒飯——改變順序與搭配就能讓血糖曲線變平緩。',
    grade: 'B',
    sources: SRC,
    schematic: true,
    chart: {
      kind: 'curve',
      x: { label: '餐後時間', unit: '分鐘', min: 0, max: 180, ticks: [0, 30, 60, 90, 120, 180] },
      y: { label: '血糖', unit: 'mg/dL', min: 90, max: 220, ticks: [100, 140, 180, 220] },
      series: [
        { name: '先吃飯', tone: 'bad', points: [[0, 110], [30, 195], [60, 205], [90, 175], [120, 150], [180, 115]] },
        { name: '先吃菜與蛋白質、最後吃飯', tone: 'good', points: [[0, 110], [30, 140], [60, 160], [90, 150], [120, 135], [180, 112]] },
      ],
      markers: [{ x: 60, label: '峰值差 ≈ 30–40%' }],
    },
  },
  'FIG-C-06-02': {
    title: '讓血糖曲線變平的五個槓桿',
    caption: '在不改變總碳水量的情況下，有實證的調整方法。',
    takeaway: '飯後走 10–15 分鐘，是最簡單也最有效的一招。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '先菜後肉再飯', detail: '進食順序降低峰值', icon: '🥬', tone: 'good' },
        { label: '搭配蛋白質與好油', detail: '延緩胃排空', icon: '🥚', tone: 'good' },
        { label: '選原型、低 GI 主食', detail: '糙米、燕麥、地瓜', icon: '🍠', tone: 'ok' },
        { label: '冷藏後回溫的飯', detail: '形成抗性澱粉', icon: '❄️', tone: 'ok' },
        { label: '飯後走 10–15 分', detail: '肌肉直接吸收血糖', icon: '🚶', tone: 'good' },
      ],
    },
  },
  'FIG-C-07-01': {
    title: '身體的碳水油箱：肝醣儲量',
    caption: '70 kg 成人的大致肝醣儲存量（g）。',
    takeaway: '肌肝醣只供肌肉自己用；肝醣負責維持血糖——過夜空腹後會下降一半以上。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'stack',
      unit: 'g',
      items: [
        { label: '肌肉肝醣', value: 400, display: '≈300–500 g', icon: '💪', tone: 'ok', note: '約 1,200–2,000 kcal，運動主燃料' },
        { label: '肝臟肝醣', value: 90, display: '≈80–100 g', icon: '🫁', tone: 'warn', note: '維持血糖，空腹一夜消耗大半' },
        { label: '血中葡萄糖', value: 5, display: '≈4–5 g', icon: '🩸', tone: 'bad', note: '僅約一小匙' },
      ],
    },
  },
  'FIG-C-07-02': {
    title: '運動的碳水需求（ACSM／IOC 共識）',
    caption: '依每日訓練量與比賽時間建議的碳水攝取。',
    takeaway: '練得越久越需要碳水；超過 1 小時的耐力運動要在途中補給。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '3–5 g/kg/日', label: '低強度或技術訓練', detail: '一般運動愛好者', tone: 'neutral', icon: '🧘' },
        { range: '5–7 g/kg/日', label: '每天約 1 小時中強度', detail: '規律跑步、球類', tone: 'ok', icon: '🏃' },
        { range: '6–10 g/kg/日', label: '每天 1–3 小時中高強度', detail: '耐力選手', tone: 'good', icon: '🚴' },
        { range: '30–60 g/時', label: '比賽中補給（1–2.5 小時）', detail: '運動飲料、能量膠', tone: 'warn', icon: '🥤' },
        { range: '最多 90 g/時', label: '比賽中補給（> 2.5 小時）', detail: '需葡萄糖＋果糖混合來源', tone: 'info', icon: '⛰️' },
      ],
    },
  },
  'FIG-C-08-01': {
    title: '低 FODMAP 飲食三階段',
    caption: '針對腸躁症（IBS）的短期診斷性飲食，需在營養師指導下進行。',
    takeaway: '低 FODMAP 不是一輩子的飲食，而是找出「個人地雷」的工具。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'timeline',
      items: [
        { t: '第 1 階段 · 2–6 週', label: '限制期', detail: '全面減少高 FODMAP 食物，觀察症狀是否改善', icon: '🚫', tone: 'warn' },
        { t: '第 2 階段 · 6–8 週', label: '再引入期', detail: '每次測試一類 FODMAP，找出誘發食物與耐受份量', icon: '🧪', tone: 'ok' },
        { t: '第 3 階段 · 長期', label: '個人化期', detail: '只避開個人地雷，盡量恢復飲食多樣性', icon: '✅', tone: 'good' },
      ],
    },
  },
  'FIG-C-08-02': {
    title: 'FODMAP 五大類與台灣常見食物',
    caption: '高 FODMAP 食物多半健康，只是對腸躁症患者可能誘發症狀。',
    takeaway: '同類食物中常有低 FODMAP 替代品，不必全部放棄。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['常見高 FODMAP 來源', '低 FODMAP 替代'],
      rows: [
        { label: '果聚糖', icon: '🧅', cells: [{ text: '洋蔥、大蒜、小麥麵包', tone: 'warn' }, { text: '青蔥綠色部分、白飯、米粉', tone: 'good' }] },
        { label: '半乳寡糖', icon: '🫘', cells: [{ text: '紅豆、鷹嘴豆、黃豆', tone: 'warn' }, { text: '板豆腐、天貝（適量）', tone: 'good' }] },
        { label: '乳糖', icon: '🥛', cells: [{ text: '鮮奶、冰淇淋', tone: 'warn' }, { text: '無乳糖牛奶、硬質起司', tone: 'good' }] },
        { label: '過量果糖', icon: '🍯', cells: [{ text: '蜂蜜、芒果、西瓜', tone: 'warn' }, { text: '奇異果、柳橙、木瓜', tone: 'good' }] },
        { label: '多元醇', icon: '🍬', cells: [{ text: '蘋果、香菇、無糖口香糖', tone: 'warn' }, { text: '鳳梨、草莓、紅蘿蔔', tone: 'good' }] },
      ],
    },
  },
  'FIG-C-09-01': {
    title: '一份醣類＝ 15 g：台灣食物代換',
    caption: '糖尿病衛教常用的「醣類份數」計算。',
    takeaway: '一碗飯＝ 4 份醣（60 g），和 4 份水果的醣量相同。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['份量', '醣類份數', '醣量'],
      rows: [
        { label: '白飯', icon: '🍚', cells: ['1 碗（160 g）', { text: '4 份', tone: 'warn' }, '60 g'] },
        { label: '吐司', icon: '🍞', cells: ['1 片（25–30 g）', { text: '1 份', tone: 'ok' }, '15 g'] },
        { label: '地瓜', icon: '🍠', cells: ['1/2 條（55 g）', { text: '1 份', tone: 'ok' }, '15 g'] },
        { label: '水果', icon: '🍊', cells: ['1 拳頭', { text: '1 份', tone: 'ok' }, '15 g'] },
        { label: '鮮奶', icon: '🥛', cells: ['240 mL', { text: '約 0.8 份', tone: 'good' }, '12 g'] },
      ],
    },
  },
  'FIG-C-09-02': {
    title: '一天的碳水如何分配（1,800 kcal 範例）',
    caption: '依台灣 DRIs 碳水占 50–60% 熱量的建議，約 225–270 g/日。',
    takeaway: '平均分配到三餐、優先全穀與蔬果，比集中在一餐更穩定血糖。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'stack',
      unit: 'g 醣',
      items: [
        { label: '早餐', value: 60, display: '≈60 g（4 份）', icon: '🌅', tone: 'ok' },
        { label: '午餐', value: 75, display: '≈75 g（5 份）', icon: '☀️', tone: 'good' },
        { label: '點心（水果、乳品）', value: 30, display: '≈30 g（2 份）', icon: '🍎', tone: 'info' },
        { label: '晚餐', value: 75, display: '≈75 g（5 份）', icon: '🌙', tone: 'warn' },
      ],
    },
  },
  'FIG-C-10-01': {
    title: '台灣常見高纖食物（每份纖維 g）',
    caption: '一般食用份量的膳食纖維代表值。',
    takeaway: '每餐放一樣「纖維主角」，一天輕鬆突破 25 克。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g/份',
      max: 8,
      items: [
        { label: '芭樂 1 顆', value: 6, display: '≈5–6 g', icon: '🍈', tone: 'good' },
        { label: '黑木耳 1 碗（熟）', value: 6, display: '≈5–7 g', icon: '🍄', tone: 'good' },
        { label: '毛豆 半碗', value: 5, display: '≈5 g', icon: '🫛', tone: 'good' },
        { label: '燕麥片 40 g', value: 4, display: '≈4 g', icon: '🥣', tone: 'ok' },
        { label: '地瓜葉 1 碗（熟）', value: 3.5, display: '≈3–4 g', icon: '🥬', tone: 'ok' },
        { label: '糙米飯 1 碗', value: 2.8, display: '≈2.8 g', icon: '🍚', tone: 'ok' },
        { label: '白飯 1 碗', value: 0.6, display: '≈0.6 g', icon: '🍚', tone: 'bad' },
      ],
    },
  },
  'FIG-C-10-02': {
    title: '四週增纖計畫',
    caption: '每週增加約 5 g 纖維，同步增加水分，讓腸道菌與腸胃逐步適應。',
    takeaway: '慢慢加、多喝水——一次暴增纖維只會換來脹氣。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'timeline',
      items: [
        { t: '第 1 週', label: '早餐加燕麥或換全穀吐司', detail: '+4–5 g，水分 +250 mL', icon: '🥣', tone: 'ok' },
        { t: '第 2 週', label: '午餐白飯換一半糙米', detail: '+2–3 g，加一份燙青菜', icon: '🍚', tone: 'ok' },
        { t: '第 3 週', label: '每天一份水果帶皮吃', detail: '+3–5 g（芭樂、奇異果、蘋果）', icon: '🍎', tone: 'good' },
        { t: '第 4 週', label: '每天一份豆類或菇類', detail: '+4–6 g，總量達 25–30 g', icon: '🫘', tone: 'good' },
      ],
    },
  },
};
