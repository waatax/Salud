import type { CurriculumFigure } from '../curriculumFigures';

const SRC = ['SRC-CURR-2026'];

// ═══════════════════════════════════════════════════════════════════════════
// Chapter E — figures for every page (01–10)
// ═══════════════════════════════════════════════════════════════════════════
export const FIGURES_E: Record<string, CurriculumFigure> = {
  'FIG-E-01-01': {
    title: 'TDEE 四個齒輪：每天的熱量都花去哪裡',
    caption: '以 2,200 kcal/日的久坐成人為例，拆解基礎代謝、日常活動、食物產熱與刻意運動的占比。',
    takeaway: 'BMR 是最大帳單，NEAT 是你最容易調整的變數——運動只是小角落。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'donut',
      unit: 'kcal/日',
      center: '≈2,200 kcal',
      items: [
        { label: '基礎代謝 BMR', value: 1430, display: '60–70%', icon: '🫀', tone: 'ok', note: '心、腦、肝、腎維持生命' },
        { label: '非運動活動 NEAT', value: 400, display: '15–30%', icon: '🚶', tone: 'good', note: '個體差異最大，可差 800 kcal 以上' },
        { label: '食物產熱 TEF', value: 220, display: '≈10%', icon: '🍽️', tone: 'warn', note: '蛋白質最耗能' },
        { label: '刻意運動 EAT', value: 150, display: '5–10%', icon: '🏋️', tone: 'info', note: '多數人一週僅數小時' },
      ],
    },
  },
  'FIG-E-01-02': {
    title: '三大營養素的食物產熱效應（TEF）',
    caption: '每吃進 100 kcal，身體為了消化、吸收與儲存所花掉的熱量。',
    takeaway: '同樣 100 kcal，蛋白質「實拿」只有 70–80 kcal，還更耐餓。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'kcal / 每 100 kcal',
      max: 32,
      items: [
        { label: '蛋白質', value: 25, display: '20–30 kcal', icon: '🥚', tone: 'good' },
        { label: '碳水化合物', value: 7.5, display: '5–10 kcal', icon: '🍚', tone: 'ok' },
        { label: '脂肪', value: 1.5, display: '0–3 kcal', icon: '🧈', tone: 'warn' },
        { label: '酒精', value: 15, display: '10–20 kcal', icon: '🍺', tone: 'bad', note: '但會優先代謝、抑制脂肪燃燒' },
      ],
    },
  },
  'FIG-E-02-01': {
    title: '7700 大卡靜態公式 vs Hall 動態模型',
    caption: '90 kg 成人每天固定少吃 500 kcal，兩種模型預測的累積減重（kg）。',
    takeaway: '體重下降後消耗也下降，所以減重會自然趨緩，不是你失敗了。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'curve',
      x: { label: '時間', unit: '月', min: 0, max: 24, ticks: [0, 3, 6, 12, 18, 24] },
      y: { label: '累積減重', unit: 'kg', min: 0, max: 50, ticks: [0, 10, 20, 30, 40, 50] },
      series: [
        { name: '7700 kcal 靜態公式（線性）', tone: 'bad', dashed: true, points: [[0, 0], [3, 5.9], [6, 11.8], [12, 23.7], [18, 35.5], [24, 47.4]] },
        { name: 'Hall 動態模型（趨緩至平台）', tone: 'good', points: [[0, 0], [3, 5], [6, 8.5], [12, 12.5], [18, 15.5], [24, 17.5]] },
      ],
      markers: [{ x: 12, label: '1 年：差近 2 倍' }],
    },
  },
  'FIG-E-02-02': {
    title: '代謝適應的回饋迴路',
    caption: '熱量赤字如何經由荷爾蒙與行為，讓身體「省電又變餓」。',
    takeaway: '溫和赤字＋足夠蛋白質＋肌力訓練，是對抗代謝適應的三件套。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '熱量赤字', detail: '脂肪量下降', icon: '📉', tone: 'neutral' },
        { label: '瘦體素 ↓', detail: '下視丘接收「存糧不足」訊號', icon: '🧠', tone: 'warn' },
        { label: '飢餓素 ↑', detail: '食慾放大，可持續 1 年以上', icon: '😋', tone: 'bad' },
        { label: '消耗 ↓ 10–15%', detail: '甲狀腺素與 NEAT 下降', icon: '🔋', tone: 'bad' },
        { label: '肌肉流失風險', detail: '低蛋白極端節食時 25–40% 體重來自非脂肪', icon: '💪', tone: 'warn' },
      ],
    },
  },
  'FIG-E-03-01': {
    title: '能量密度：同樣 300 kcal 的「份量」差多少',
    caption: '以每 300 kcal 可以吃到的食物重量（公克）呈現能量密度差異。',
    takeaway: '選低能量密度（多水、多纖維）的食物，吃得飽又自然少熱量。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: 'g / 300 kcal',
      items: [
        { label: '燙青菜', value: 1200, display: '≈1,200 g', icon: '🥬', tone: 'good', note: '≈0.25 kcal/g' },
        { label: '水果（芭樂、蘋果）', value: 560, display: '≈560 g', icon: '🍎', tone: 'good' },
        { label: '白飯', value: 220, display: '≈220 g', icon: '🍚', tone: 'ok', note: '約 1 碗' },
        { label: '雞胸肉（去皮）', value: 270, display: '≈270 g', icon: '🍗', tone: 'ok' },
        { label: '洋芋片', value: 55, display: '≈55 g', icon: '🥔', tone: 'bad', note: '≈5.4 kcal/g' },
        { label: '奶油酥餅', value: 60, display: '≈60 g', icon: '🥐', tone: 'bad' },
      ],
    },
  },
  'FIG-E-03-02': {
    title: '一餐 20 分鐘：飽足訊號的時間軸',
    caption: '從第一口到大腦收到「吃飽了」所經過的腸–腦訊號。',
    takeaway: '放慢速度、先菜後飯，讓飽足訊號追上你的筷子。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'timeline',
      items: [
        { t: '0 分', label: '開始進食', detail: '胃部擴張訊號經迷走神經傳腦', icon: '🥢', tone: 'neutral' },
        { t: '5–10 分', label: 'CCK 上升', detail: '十二指腸感受脂肪與蛋白質', icon: '🧪', tone: 'ok' },
        { t: '15–20 分', label: 'GLP-1、PYY 達峰', detail: '下視丘產生飽足感、胃排空變慢', icon: '🧠', tone: 'good' },
        { t: '>20 分', label: '狼吞虎嚥者已多吃', detail: '快速進食者每餐平均多攝取約 10–15% 熱量', icon: '⚠️', tone: 'warn' },
      ],
    },
  },
  'FIG-E-04-01': {
    title: 'Mifflin-St Jeor 公式：BMR 的計算步驟',
    caption: '以 35 歲、170 cm、70 kg 男性與 160 cm、58 kg 女性為例。',
    takeaway: '公式只是起點，個人誤差可達 ±10%——用 2–4 週體重趨勢校正。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['體重項 10×W', '身高項 6.25×H', '年齡項 −5×A', '性別常數', 'BMR 估計'],
      rows: [
        { label: '男 70 kg／170 cm', icon: '👨', cells: ['700', '1,062.5', '−175', { text: '+5', tone: 'ok' }, { text: '≈1,593 kcal', tone: 'good' }] },
        { label: '女 58 kg／160 cm', icon: '👩', cells: ['580', '1,000', '−175', { text: '−161', tone: 'warn' }, { text: '≈1,244 kcal', tone: 'good' }] },
      ],
    },
  },
  'FIG-E-04-02': {
    title: 'TDEE＝BMR × 活動係數',
    caption: '常用活動係數（PAL）與 BMR 1,600 kcal 者對應的每日總消耗。',
    takeaway: '大多數上班族是 1.4–1.5，而非自以為的「中度活動」。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: 'PAL 1.2', label: '幾乎不動（臥床、全天久坐）', detail: '≈1,920 kcal', tone: 'neutral', icon: '🛋️' },
        { range: 'PAL 1.4–1.5', label: '久坐上班＋少量走動', detail: '≈2,240–2,400 kcal（多數上班族）', tone: 'ok', icon: '💻' },
        { range: 'PAL 1.6–1.7', label: '站立工作或每天運動 45–60 分', detail: '≈2,560–2,720 kcal', tone: 'good', icon: '🚴' },
        { range: 'PAL 1.9–2.2', label: '重體力勞動或耐力選手', detail: '≈3,040–3,520 kcal', tone: 'warn', icon: '🏗️' },
      ],
    },
  },
  'FIG-E-05-01': {
    title: '低脂 vs 低碳：控制實驗怎麼說',
    caption: '代謝病房與大型隨機試驗的關鍵結果（Hall 2015、2021；DIETFITS 2018）。',
    takeaway: '熱量相等時，兩種飲食的體脂下降相近；能長期遵守的才是贏家。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['研究設計', '低脂組', '低碳組', '結論'],
      rows: [
        { label: 'Hall 2015', icon: '🏥', cells: ['代謝病房、熱量相同', { text: '體脂 −89 g/日', tone: 'good' }, { text: '體脂 −53 g/日', tone: 'ok' }, '胰島素下降不等於多燃脂'] },
        { label: 'DIETFITS 2018', icon: '📊', cells: ['609 人、12 個月', { text: '−5.3 kg', tone: 'ok' }, { text: '−6.0 kg', tone: 'ok' }, { text: '無顯著差異', tone: 'good' }] },
        { label: 'Hall 2021', icon: '🥗', cells: ['自由進食、交叉設計', { text: '每日少吃 550–700 kcal', tone: 'good' }, { text: '血糖與胰島素較低', tone: 'ok' }, '兩者各有生理優勢'] },
      ],
    },
  },
  'FIG-E-05-02': {
    title: '能量平衡方程式：體重變化從哪裡來',
    caption: '熱力學第一定律在人體的寫法：儲存的變化＝攝取 − 消耗。',
    takeaway: '荷爾蒙影響的是「吃多少、耗多少」，而不是讓熱量憑空消失。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '能量攝取', detail: '食物與飲料的熱量（扣除未吸收部分）', icon: '🍱', tone: 'ok' },
        { label: '能量消耗', detail: 'BMR＋TEF＋NEAT＋EAT', icon: '🔥', tone: 'warn' },
        { label: '差值', detail: '攝取 − 消耗＝身體儲存的改變', icon: '⚖️', tone: 'info' },
        { label: '體組成', detail: '脂肪、肝醣（含水）、蛋白質的增減', icon: '🧍', tone: 'good' },
      ],
    },
  },
  'FIG-E-06-01': {
    title: '食慾的油門與煞車：五種關鍵荷爾蒙',
    caption: '腸道、脂肪組織與胰臟分泌的訊號，在下視丘匯整成「餓」或「飽」。',
    takeaway: '只有飢餓素踩油門，其他多數訊號都在幫你踩煞車——蛋白質與纖維能放大煞車。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['分泌來源', '何時上升', '作用', '如何善用'],
      rows: [
        { label: '飢餓素 Ghrelin', icon: '🔴', cells: ['胃', '餐前、睡眠不足', { text: '踩油門：增加食慾', tone: 'bad' }, '規律用餐、睡飽 7 小時'] },
        { label: '瘦體素 Leptin', icon: '🟢', cells: ['脂肪組織', '脂肪量多時', { text: '長期能量存量訊號', tone: 'ok' }, '避免極端節食造成驟降'] },
        { label: 'GLP-1', icon: '🟢', cells: ['小腸 L 細胞', '餐後 15–30 分', { text: '飽足、延緩胃排空', tone: 'good' }, '蛋白質、纖維、細嚼慢嚥'] },
        { label: 'PYY', icon: '🟢', cells: ['迴腸、結腸', '餐後 1–2 小時', { text: '抑制食慾', tone: 'good' }, '蛋白質與膳食纖維'] },
        { label: 'CCK', icon: '🟢', cells: ['十二指腸', '吃到脂肪與蛋白質', { text: '短期飽足', tone: 'good' }, '每餐含適量好油與蛋白質'] },
      ],
    },
  },
  'FIG-E-06-02': {
    title: '減重後荷爾蒙「反撲」能持續多久',
    caption: '飲食減重 10 週後，相對於減重前的飢餓素與瘦體素變化（Sumithran 2011, NEJM）。',
    takeaway: '減重後的「比較餓」是真實生理現象，需要長期策略而非意志力。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: '% 相對基準',
      max: 70,
      items: [
        { label: '瘦體素（第 10 週）', value: 65, display: '−65%', icon: '⬇️', tone: 'bad', note: '1 年後仍低約 35%' },
        { label: '飢餓素（第 10 週）', value: 20, display: '+約 20%', icon: '⬆️', tone: 'warn', note: '1 年後仍偏高' },
        { label: '主觀飢餓分數', value: 25, display: '上升', icon: '😋', tone: 'warn', note: '持續至 62 週追蹤' },
      ],
    },
  },
  'FIG-E-07-01': {
    title: '減重速度紅綠燈',
    caption: '以每週體重下降占體重百分比來判斷速度是否安全。',
    takeaway: '每週 0.5–1% 體重是兼顧脂肪與肌肉的甜蜜區。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '< 0.25%/週', label: '太慢：可能沒有真正赤字', detail: '檢查記錄是否漏算飲料與油', tone: 'neutral', icon: '🐢' },
        { range: '0.5–1%/週', label: '建議區：約每天赤字 300–500 kcal', detail: '70 kg 者約每週 0.35–0.7 kg', tone: 'good', icon: '✅' },
        { range: '1–1.5%/週', label: '偏快：需高蛋白＋肌力訓練', detail: '短期可行，需監測疲勞與月經', tone: 'warn', icon: '⚠️' },
        { range: '> 1.5%/週', label: '過快：肌肉、膽結石與掉髮風險', detail: '極低熱量飲食須醫療監督', tone: 'bad', icon: '⛔' },
      ],
    },
  },
  'FIG-E-07-02': {
    title: '保肌減脂：減掉的重量裡有多少是肌肉',
    caption: '不同策略下，減重中「非脂肪組織」所占比例的代表性範圍。',
    takeaway: '蛋白質 1.2–1.6 g/kg＋每週 2–3 次肌力訓練，能把肌肉流失壓到最低。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: '% 為非脂肪組織',
      max: 45,
      items: [
        { label: '極低熱量、低蛋白、不運動', value: 35, display: '25–40%', icon: '🚫', tone: 'bad' },
        { label: '一般飲食控制', value: 25, display: '約 20–30%', icon: '🍽️', tone: 'warn' },
        { label: '高蛋白飲食', value: 15, display: '約 10–20%', icon: '🥚', tone: 'ok' },
        { label: '高蛋白＋阻力訓練', value: 7, display: '< 10%', icon: '🏋️', tone: 'good' },
      ],
    },
  },
  'FIG-E-08-01': {
    title: '成功維持者的共同習慣（NWCR）',
    caption: '美國國家體重控制登錄（減重 ≥13.6 kg 並維持 ≥1 年者）常見行為比例。',
    takeaway: '維持期靠的是天天在做的小習慣：活動量、自我監測與規律飲食。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'bars',
      unit: '% 成員',
      max: 100,
      items: [
        { label: '每天約 1 小時身體活動', value: 90, display: '≈90%', icon: '🚶', tone: 'good' },
        { label: '每天吃早餐', value: 78, display: '≈78%', icon: '🍳', tone: 'ok' },
        { label: '至少每週量體重', value: 75, display: '≈75%', icon: '⚖️', tone: 'good' },
        { label: '每週看電視 < 10 小時', value: 62, display: '≈62%', icon: '📺', tone: 'ok' },
      ],
    },
  },
  'FIG-E-08-02': {
    title: '體重維持的「警戒區」決策圖',
    caption: '設定 ±2 kg 的維持區間，依每週平均體重決定下一步。',
    takeaway: '早發現、早微調：回升 1–2 kg 時處理，比回升 5 kg 容易得多。',
    grade: 'C',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '目標 ±1 kg', label: '綠燈：維持現有習慣', detail: '每週量 2–3 次取平均', tone: 'good', icon: '🟢' },
        { range: '+1～2 kg', label: '黃燈：檢查最近兩週', detail: '飲料、外食、睡眠與步數', tone: 'warn', icon: '🟡' },
        { range: '> +2 kg', label: '紅燈：重啟 2–4 週輕赤字', detail: '每日少 300 kcal＋恢復記錄', tone: 'bad', icon: '🔴' },
      ],
    },
  },
  'FIG-E-09-01': {
    title: '超加工飲食讓人每天多吃 500 kcal',
    caption: 'NIH 代謝病房交叉試驗（Hall 2019）：兩週自由進食的每日攝取與體重變化。',
    takeaway: '超加工食品吃得快、密度高、不易飽，是「被動吃太多」的主因。',
    grade: 'A',
    sources: SRC,
    chart: {
      kind: 'compare',
      columns: [
        { title: '超加工飲食 2 週', icon: '🍟', tone: 'bad', points: ['每日多吃約 508 kcal', '體重 +0.9 kg', '進食速度較快', '飢餓素未下降'] },
        { title: '原型食物飲食 2 週', icon: '🥗', tone: 'good', points: ['自然少吃', '體重 −0.9 kg', 'PYY 上升、飢餓素下降', '提供的熱量與營養素相同'] },
      ],
      verdict: '兩組菜單熱量、糖、脂肪、纖維都配平，差別只在加工程度。',
    },
  },
  'FIG-E-09-02': {
    title: '讓環境替你少吃：五個預設值',
    caption: '依「被動過量攝取」的機制設計的環境調整。',
    takeaway: '改環境比靠意志力有效——讓健康選項成為最省力的選項。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'flow',
      steps: [
        { label: '換小盤', detail: '盤子 22–24 cm，份量自然縮小', icon: '🍽️', tone: 'good' },
        { label: '先上蔬菜湯', detail: '低能量密度開場', icon: '🥣', tone: 'good' },
        { label: '零食不放視線內', detail: '看得到就吃得到', icon: '🙈', tone: 'ok' },
        { label: '放下手機吃飯', detail: '分心進食多吃約 10–25%', icon: '📵', tone: 'ok' },
        { label: '水放在手邊', detail: '以水取代含糖飲料', icon: '💧', tone: 'good' },
      ],
    },
  },
  'FIG-E-10-01': {
    title: '能量可用性（EA）分級',
    caption: '能量可用性＝（攝取 − 運動消耗）÷ 無脂肪體重；運動族群與減重者都適用。',
    takeaway: '長期低於 30 kcal/kg FFM 會傷害骨骼、月經、荷爾蒙與表現（RED-S）。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'ladder',
      items: [
        { range: '≥ 45', label: '充足：支持生理與訓練', detail: 'kcal/kg FFM/日', tone: 'good', icon: '✅' },
        { range: '30–45', label: '降低：短期減脂可接受', detail: '需監測疲勞、睡眠與月經', tone: 'warn', icon: '⚠️' },
        { range: '< 30', label: '低能量可用性：RED-S 風險', detail: '月經停止、骨密度下降、受傷與憂鬱', tone: 'bad', icon: '⛔' },
      ],
    },
  },
  'FIG-E-10-02': {
    title: 'GLP-1 類藥物使用者的營養安全檢核',
    caption: '藥物讓食慾大降時，最容易缺的是蛋白質、水分與微量營養素。',
    takeaway: '用藥減重更需要「吃對」：先顧蛋白質與肌力訓練，再談少吃。',
    grade: 'B',
    sources: SRC,
    chart: {
      kind: 'matrix',
      cols: ['風險', '每日目標', '警訊'],
      rows: [
        { label: '肌肉流失', icon: '💪', cells: [{ text: '高', tone: 'bad' }, '蛋白質 1.2–1.6 g/kg＋肌力訓練 2–3 次/週', '握力下降、爬樓梯變吃力'] },
        { label: '脫水', icon: '💧', cells: [{ text: '中', tone: 'warn' }, '少量多次喝水，尿色淡黃', '頭暈、尿量明顯減少'] },
        { label: '腸胃副作用', icon: '🤢', cells: [{ text: '中', tone: 'warn' }, '小份量、低脂、慢慢吃', '持續嘔吐、劇烈腹痛（胰臟炎？）'] },
        { label: '微量營養素不足', icon: '💊', cells: [{ text: '中', tone: 'warn' }, '蔬果、乳品、全穀不可省', '疲倦、掉髮、抽筋'] },
      ],
    },
  },
};
