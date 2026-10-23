import type { ChartSpec } from './curriculumFigures';
import type { SpineTab } from '../config/routes';
import { SPINE_TABS } from '../config/routes';
import { SPINE_CHAPTERS, SPINE_SOURCES, SpineChapter, SpineSource } from './spineData';
import { OSTEO_SOURCES } from './osteoData';

/**
 * spineCareData.ts — 脊椎照護擴充 (v4.9)
 *
 * Four care-focused chapters added to the spine course, plus the course map (units)
 * and situation-based entry paths. Kept apart from spineData.ts so the original
 * 12 chapters stay untouched; SPINE_COURSE_CHAPTERS merges both in SPINE_TABS order.
 */

export type SpineCareTab = 'ACUTE' | 'CHRONIC' | 'CAREGIVER' | 'SPECIAL';

// ── Sources ───────────────────────────────────────────────────────────────────

export const SPINE_CARE_SOURCES: Record<string, SpineSource> = {
  COSTA2012: {
    id: 'COSTA2012',
    label: 'da C Menezes Costa L, et al. 急性與持續性下背痛的病程：系統性回顧與統合分析. CMAJ 2012;184:E613-24',
    url: 'https://doi.org/10.1503/cmaj.111271',
  },
  FRENCH2006: {
    id: 'FRENCH2006',
    label: 'French SD, et al. 熱敷與冷敷治療下背痛（Cochrane 系統性回顧）. 2006',
    url: 'https://doi.org/10.1002/14651858.CD004750.pub2',
  },
  LOUW2016: {
    id: 'LOUW2016',
    label: 'Louw A, et al. 疼痛神經科學教育對肌肉骨骼疼痛的效果：系統性回顧. Physiother Theory Pract 2016;32:332-55',
    url: 'https://doi.org/10.1080/09593985.2016.1194646',
  },
  EPUAP2019: {
    id: 'EPUAP2019',
    label: 'EPUAP/NPIAP/PPPIA 2019 國際壓力性損傷預防與治療臨床實務指引',
    url: 'https://internationalguideline.com/',
  },
  TW_LTC: {
    id: 'TW_LTC',
    label: '衛生福利部 長照 2.0 服務（1966 長照專線、輔具與居家無障礙補助）',
    url: 'https://1966.gov.tw/',
  },
  BRAIST2013: {
    id: 'BRAIST2013',
    label: 'Weinstein SL, et al. 青少年特發性脊椎側彎的背架治療（BrAIST）. N Engl J Med 2013;369:1512-21',
    url: 'https://doi.org/10.1056/NEJMoa1307337',
  },
  SOSORT2016: {
    id: 'SOSORT2016',
    label: 'Negrini S, et al. SOSORT 2016 特發性脊椎側彎保守治療指引. Scoliosis Spinal Disord 2018;13:3',
    url: 'https://doi.org/10.1186/s13013-017-0145-8',
  },
  ASAS2009: {
    id: 'ASAS2009',
    label: 'Sieper J, et al. ASAS 發炎性背痛專家定義. Ann Rheum Dis 2009;68:784-8',
    url: 'https://doi.org/10.1136/ard.2008.101501',
  },
  ASASEULAR2022: {
    id: 'ASASEULAR2022',
    label: 'Ramiro S, et al. ASAS-EULAR 2022 中軸型脊椎關節炎治療建議. Ann Rheum Dis 2023;82:19-34',
    url: 'https://doi.org/10.1136/ard-2022-223296',
  },
  LIDDLE2015: {
    id: 'LIDDLE2015',
    label: 'Liddle SD, Pennick V. 孕期下背痛與骨盆帶疼痛的介入（Cochrane 系統性回顧）. 2015',
    url: 'https://doi.org/10.1002/14651858.CD001139.pub4',
  },
  FDA2020NSAID: {
    id: 'FDA2020NSAID',
    label: 'US FDA 2020 安全警訊：懷孕 20 週後避免使用 NSAIDs（羊水過少風險）',
    url: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-recommends-avoiding-use-nsaids-pregnancy-20-weeks-or-later-because-they-can-result-low-amniotic',
  },
};

export const ALL_SPINE_SOURCES: Record<string, SpineSource> = { ...SPINE_SOURCES, ...SPINE_CARE_SOURCES, ...OSTEO_SOURCES };

export const SPINE_CARE_CHAPTER_SOURCES: Record<SpineCareTab, string[]> = {
  ACUTE: ['COSTA2012', 'FRENCH2006', 'NICE59', 'ACP2017', 'LANCET2018'],
  CHRONIC: ['WHO2023', 'RESTORE2023', 'LOUW2016', 'WALKBACK2024', 'NICE59'],
  CAREGIVER: ['EPUAP2019', 'TW_LTC', 'TW_SPINE_CARE', 'TMGRGH261'],
  SPECIAL: ['BRAIST2013', 'SOSORT2016', 'ASAS2009', 'ASASEULAR2022', 'LIDDLE2015', 'FDA2020NSAID'],
};

// ── Chapters ──────────────────────────────────────────────────────────────────

export const SPINE_CARE_CHAPTERS: (Omit<SpineChapter, 'id'> & { id: SpineCareTab })[] = [
  {
    id: 'ACUTE',
    label_zh: '急性發作照護',
    title_zh: '閃到腰、落枕怎麼辦？急性發作 72 小時與 6 週照護計畫',
    goal_zh: '急性腰頸痛大多會在幾週內明顯改善。這一章教你前 72 小時怎麼做、何時用熱敷、怎麼睡、怎麼回到日常，以及哪些訊號代表不能再等。',
    learn_zh: ['急性下背痛與落枕的自然病程：為什麼「保持活動」比臥床好', '熱敷、冰敷、止痛藥與睡姿的實證做法', '寫一張自己的「發作應變卡」，下次發作不再慌'],
    minutes: 7,
    takeaways_zh: [
      '急性下背痛大多在 6 週內明顯改善；第一個月疼痛平均可減少一半以上。',
      '在疼痛可忍受範圍內維持日常活動，恢復比臥床更快；臥床超過 1–2 天反而延長病程。',
      '熱敷有中等證據可短期減輕疼痛與僵硬；冰敷證據不足，以舒服為原則。',
      '側睡夾枕、仰睡膝下墊枕可減輕夜間疼痛；落枕時枕頭高度以填滿肩頸空隙為準。',
      '大小便異常、會陰麻木、雙腳快速無力、發燒或癌症病史合併背痛，必須立即就醫。',
    ],
  },
  {
    id: 'CHRONIC',
    label_zh: '慢性疼痛與復工',
    title_zh: '痛超過三個月：疼痛科學、節律活動與重返工作的自我管理',
    goal_zh: '慢性疼痛不只是「哪裡壞掉」，神經系統的敏感化、睡眠、情緒與活動模式都會放大疼痛。學會這些機制與工具，才能把生活主導權拿回來。',
    learn_zh: ['疼痛 ≠ 組織受損：中樞敏感化與疼痛神經科學', '「衝過頭再倒下」vs「節律活動」：用基準線安排每日活動量', 'WHO 2023 指引：哪些治療值得投入、哪些不建議'],
    minutes: 8,
    takeaways_zh: [
      '持續超過 12 週的疼痛稱為慢性疼痛；疼痛強度常與影像上的退化程度不成正比。',
      '疼痛神經科學教育搭配運動，可降低疼痛與害怕活動，並改善功能。',
      '以「舒服可完成量的 80%」作為活動基準線，每週增加約 10%，可避免衝過頭再倒下的循環。',
      'WHO 2023：建議結構化運動、心理治療（如 CBT）、徒手治療與多面向照護；不建議常規使用鴉片類藥物、牽引、TENS、超音波與護腰帶。',
      '重返工作採「先調整、再增量」：早期部分回歸與工作調整，比痊癒才回去更能避免長期失能。',
    ],
  },
  {
    id: 'CAREGIVER',
    label_zh: '家屬居家照護',
    title_zh: '家人臥床或術後返家：翻身、移位、防壓瘡、防跌與照顧者自我保護',
    goal_zh: '脊椎骨折、手術或長期臥床的家人回家後，照顧者每天面對翻身、上下床、洗澡與如廁。這一章把專業護理技巧拆成家屬做得到的步驟，也提醒你保護自己的腰。',
    learn_zh: ['壓力性損傷（壓瘡）的好發部位、分期與每 2 小時翻身原則', '床到輪椅的安全移位步驟，以及照顧者的省力姿勢', '居家防跌改造、輔具選擇與台灣長照 2.0 資源'],
    minutes: 9,
    takeaways_zh: [
      '臥床者至少每 2 小時翻身一次，採 30 度側臥並以枕頭隔開骨突處；每天檢查薦尾骨、髖部、腳跟與後腦勺皮膚。',
      '壓到發紅、按壓後不會變白，就是第一級壓力性損傷，需立即減壓並告知醫護。',
      '移位時照顧者雙腳張開、屈膝不彎腰、靠近對方、用腳轉身不扭腰，必要時使用移位腰帶。',
      '居家防跌重點：夜燈、移除地毯與雜物、浴廁扶手與止滑墊、床與馬桶高度合宜。',
      '撥打長照專線 1966 可申請居家照顧、喘息服務與輔具補助；照顧者也要照顧自己。',
    ],
  },
  {
    id: 'SPECIAL',
    label_zh: '特殊族群',
    title_zh: '脊椎側彎、僵直性脊椎炎、孕產期與青少年：不同族群的脊椎照護',
    goal_zh: '有些背痛不是姿勢或退化造成的：青少年的脊椎側彎、年輕人的發炎性背痛、孕產期的骨盆帶疼痛，都需要不同的辨識方法與照護重點。',
    learn_zh: ['青少年特發性脊椎側彎：前彎測試、Cobb 角度與背架時機', '僵直性脊椎炎（中軸型脊椎關節炎）：發炎性背痛的 5 個特徵', '孕產期腰痛與骨盆帶疼痛、青少年書包與運動傷害'],
    minutes: 9,
    takeaways_zh: [
      'Cobb 角 ≥ 10° 定義為脊椎側彎；成長中、20–25° 以上且持續進展者需評估背架。',
      'BrAIST 試驗：背架治療使側彎未進展到手術門檻的比例由 48% 提升至 72%，穿戴時數越長效果越好。',
      '40 歲前開始、緩慢發生、活動後改善、休息不改善、夜間痛醒——5 項符合 4 項以上應轉介風濕免疫科評估僵直性脊椎炎。',
      '約一半孕婦會經歷腰痛或骨盆帶疼痛；運動與水中運動有益，懷孕 20 週後避免使用 NSAIDs 止痛藥。',
      '青少年書包建議不超過體重 10–15%；運動員伸展時腰痛持續，需排除脊椎解離。',
    ],
  },
];

/** Full course in SPINE_TABS order (original 12 chapters + 4 care chapters). */
export const SPINE_COURSE_CHAPTERS: SpineChapter[] = SPINE_TABS.map((id) => {
  const c = [...SPINE_CHAPTERS, ...(SPINE_CARE_CHAPTERS as SpineChapter[])].find((x) => x.id === id);
  if (!c) throw new Error(`spine chapter ${id} missing`);
  return c;
});

// ── Course map & entry paths ──────────────────────────────────────────────────

export interface SpineUnit {
  title: string;
  blurb: string;
  chapters: SpineTab[];
}

export const SPINE_UNITS: SpineUnit[] = [
  { title: '認識脊椎與症狀', blurb: '脊椎構造、骨刺退化、手腳發麻定位', chapters: ['OVERVIEW', 'SPURS', 'NUMBNESS'] },
  { title: '疼痛照護與治療', blurb: '急性發作、治療階梯、用藥與慢性疼痛自我管理', chapters: ['ACUTE', 'TREATMENT', 'MEDS', 'CHRONIC'] },
  { title: '骨鬆與骨折', blurb: '骨質疏鬆診斷用藥、壓迫性骨折與骨泥', chapters: ['OSTEOPOROSIS', 'FRACTURE'] },
  { title: '手術、復健與居家照護', blurb: '微創手術、術後復健與家屬照護技巧', chapters: ['SURGERY', 'REHAB', 'CAREGIVER'] },
  { title: '日常預防與特殊族群', blurb: '姿勢、護脊運動、側彎、僵直性脊椎炎、孕產', chapters: ['POSTURE', 'EXERCISE', 'SPECIAL'] },
  { title: '安全網', blurb: '危險警訊、看哪一科、檢查與就醫準備', chapters: ['TRIAGE'] },
];

export type SpinePathIcon = 'flare' | 'chronic' | 'surgery' | 'caregiver' | 'prevent';

export interface SpinePath {
  key: SpinePathIcon;
  label: string;
  hint: string;
  chapters: SpineTab[];
}

export const SPINE_PATHS: SpinePath[] = [
  { key: 'flare', label: '我現在腰或脖子很痛', hint: '先排除警訊，再照 72 小時計畫照顧自己', chapters: ['TRIAGE', 'ACUTE', 'TREATMENT', 'MEDS'] },
  { key: 'chronic', label: '已經痛好幾個月了', hint: '理解疼痛科學、節律活動與重返工作', chapters: ['CHRONIC', 'EXERCISE', 'POSTURE', 'TREATMENT'] },
  { key: 'surgery', label: '我（或家人）要開刀或剛開完', hint: '手術選擇、術後復健與返家照護', chapters: ['SURGERY', 'REHAB', 'CAREGIVER', 'FRACTURE'] },
  { key: 'caregiver', label: '我在照顧臥床或長輩家人', hint: '翻身移位、防壓瘡、防跌與長照資源', chapters: ['CAREGIVER', 'OSTEOPOROSIS', 'FRACTURE', 'TRIAGE'] },
  { key: 'prevent', label: '想預防、保養脊椎', hint: '姿勢、運動、骨質與特殊族群', chapters: ['POSTURE', 'EXERCISE', 'OSTEOPOROSIS', 'SPECIAL'] },
];

// ── Quiz & myths ──────────────────────────────────────────────────────────────

export const SPINE_CARE_QUIZ: Record<SpineCareTab, { question: string; options: string[]; answer: number; explain: string }> = {
  ACUTE: {
    question: '閃到腰後的第 2 天，下列哪一個做法最符合實證？',
    options: ['完全臥床一週', '在可忍受範圍內維持日常活動，必要時熱敷', '馬上照 MRI', '穿護腰帶一個月不拿下'],
    answer: 1,
    explain: '維持活動的恢復比臥床快；熱敷有中等證據可短期止痛。沒有警訊時，前幾週做影像不會讓你好得更快。',
  },
  CHRONIC: {
    question: '「節律活動」的基準線通常怎麼設定？',
    options: ['痛到受不了才停', '目前能舒服完成量的約 80%', '完全不動等痛消失', '每天都做到最大量'],
    answer: 1,
    explain: '以舒服可完成量的約 80% 作為基準線，再每週增加約 10%，避免「好的時候做太多、隔天倒下」的循環。',
  },
  CAREGIVER: {
    question: '臥床家人的皮膚出現一塊發紅、用手指按壓後不會變白，代表什麼？',
    options: ['正常現象，不用處理', '可能是第一級壓力性損傷，需立即減壓並告知醫護', '要用力按摩讓血液循環', '塗爽身粉即可'],
    answer: 1,
    explain: '按壓不變白的紅斑是第一級壓力性損傷。應立即移除壓力、增加翻身頻率；不要用力按摩發紅處，以免加重組織損傷。',
  },
  SPECIAL: {
    question: '下列哪一項比較像「發炎性背痛」（需評估僵直性脊椎炎）？',
    options: ['搬重物後突然腰痛', '30 歲開始的慢慢背痛，半夜痛醒、起床活動後改善', '久坐後腰酸，起身走走就好', '跌倒後背痛'],
    answer: 1,
    explain: '40 歲前、緩慢開始、活動改善、休息不改善、夜間痛醒是發炎性背痛特徵，應轉介風濕免疫科。',
  },
};

export const SPINE_CARE_MYTHS: { chapter: SpineCareTab; myth: string; fact: string }[] = [
  { chapter: 'ACUTE', myth: '閃到腰一定要冰敷，熱敷會讓發炎更嚴重。', fact: 'Cochrane 回顧顯示熱敷可短期減輕急性下背痛與僵硬；冰敷的證據不足。急性下背痛多數不是需要冰敷的明顯腫脹傷害，以舒服為原則即可。' },
  { chapter: 'ACUTE', myth: '腰痛時彎腰、走路會讓傷勢更嚴重。', fact: '在疼痛可忍受範圍內活動是安全的；「會痛」不等於「在受傷」。避免的是長時間臥床與完全不動。' },
  { chapter: 'CHRONIC', myth: '會痛就代表身體正在受傷，應該停止所有活動。', fact: '慢性疼痛常來自神經系統變得過度敏感，疼痛強度不一定反映組織損傷。漸進式活動能讓神經系統重新校正。' },
  { chapter: 'CHRONIC', myth: '慢性腰痛只要找到對的止痛藥就能解決。', fact: '藥物對慢性腰痛的效果多半有限；運動、疼痛教育、心理治療與生活調整的組合，才是長期改善的主力。' },
  { chapter: 'CAREGIVER', myth: '壓瘡發紅時用力按摩可以促進循環。', fact: '按摩已受壓的發紅皮膚可能加重深層組織損傷。正確做法是解除壓力、保持乾燥、補充營養並告知醫護。' },
  { chapter: 'CAREGIVER', myth: '照顧家人就該全部幫他做好，不要讓他自己動。', fact: '在安全前提下讓被照顧者盡量自己做，能保留肌力與自信、降低臥床併發症；照顧者負擔也會減輕。' },
  { chapter: 'SPECIAL', myth: '脊椎側彎是書包背太重或坐姿不良造成的。', fact: '青少年特發性脊椎側彎的原因不明，與姿勢或書包無直接因果；書包過重會引起肩背痠痛，但不會造成結構性側彎。' },
  { chapter: 'SPECIAL', myth: '懷孕腰痛是正常的，只能忍到生完。', fact: '孕期腰痛很常見但可以處理：運動、水中運動、骨盆帶與姿勢調整都有幫助；劇痛、出血或規律宮縮則要立即就醫。' },
];

// ── Charts (rendered with CurriculumChart's ChartBody) ───────────────────────

export const ACUTE_72H_PLAN: ChartSpec = {
  kind: 'timeline',
  items: [
    { t: '0–48 小時', label: '相對休息、不要臥床', detail: '每 30–60 分鐘起身走幾步；找舒服姿勢、熱敷 15–20 分鐘；需要時短期止痛藥', icon: '🛏️', tone: 'warn' },
    { t: '第 3–7 天', label: '恢復日常活動', detail: '短距離散步、溫和伸展；避免長時間久坐與搬重物', icon: '🚶', tone: 'ok' },
    { t: '第 2–6 週', label: '逐步回到工作與運動', detail: '加入核心與髖部肌力訓練；多數人明顯改善', icon: '🏃', tone: 'good' },
    { t: '6 週仍未改善', label: '就醫評估', detail: '持續神經症狀或功能受限，考慮物理治療與進一步檢查', icon: '🩺', tone: 'info' },
  ],
};

export const ACUTE_RECOVERY_CURVE: ChartSpec = {
  kind: 'curve',
  x: { label: '發作後時間', unit: '週', min: 0, max: 12, ticks: [0, 2, 4, 6, 8, 12] },
  y: { label: '相對疼痛程度', unit: '%', min: 0, max: 100, ticks: [0, 25, 50, 75, 100] },
  series: [{ name: '急性下背痛平均病程（示意）', tone: 'good', points: [[0, 100], [1, 70], [2, 55], [4, 42], [6, 36], [8, 33], [12, 30]] }],
  bands: [{ from: 0, to: 6, label: '多數明顯改善期', tone: 'good' }],
};

export const HEAT_VS_ICE: ChartSpec = {
  kind: 'matrix',
  cols: ['證據', '怎麼做', '注意'],
  rows: [
    { label: '熱敷', icon: '♨️', cells: [{ text: '中等：短期減痛、減僵硬', tone: 'good' }, '溫熱毛巾或熱敷墊 15–20 分鐘', '隔一層布、勿睡著時使用；糖尿病感覺遲鈍者小心燙傷'] },
    { label: '冰敷', icon: '🧊', cells: [{ text: '證據不足', tone: 'warn' }, '包毛巾 10–15 分鐘', '覺得舒服才用；避免直接接觸皮膚'] },
    { label: '短期止痛藥', icon: '💊', cells: [{ text: 'NSAIDs 小到中等效果', tone: 'ok' }, '依藥師或醫師指示短期使用', '胃潰瘍、腎病、心血管病、孕期需先諮詢'] },
    { label: '臥床休息', icon: '🛌', cells: [{ text: '不建議', tone: 'bad' }, '最多 1–2 天相對休息', '臥床越久恢復越慢'] },
  ],
};

export const SLEEP_POSITIONS: ChartSpec = {
  kind: 'compare',
  columns: [
    { title: '側睡', icon: '🛌', tone: 'good', points: ['兩膝間夾一個枕頭，讓骨盆保持水平', '枕頭高度約等於肩膀到脖子的距離', '腰痛發作時最常被覺得舒服'] },
    { title: '仰睡', icon: '😴', tone: 'ok', points: ['膝下墊枕頭，讓腰部放鬆', '枕頭不宜過高，下巴不要被推向胸口', '落枕時可在頸後墊捲起的毛巾'] },
    { title: '趴睡', icon: '⚠️', tone: 'warn', points: ['脖子需長時間轉向一側', '腰椎容易過度前凸', '發作期間盡量避免'] },
  ],
  verdict: '沒有唯一正確的睡姿，以能讓你放鬆、翻身順暢的姿勢為主；起床時先側身再用手撐起。',
};

export const BOOM_BUST_CURVE: ChartSpec = {
  kind: 'curve',
  x: { label: '天數', unit: '天', min: 1, max: 14, ticks: [1, 3, 5, 7, 9, 11, 14] },
  y: { label: '每日活動量', unit: '分鐘', min: 0, max: 120, ticks: [0, 30, 60, 90, 120] },
  series: [
    { name: '衝過頭再倒下（Boom–bust）', tone: 'bad', dashed: true, points: [[1, 110], [2, 15], [3, 10], [4, 100], [5, 10], [6, 20], [7, 115], [8, 5], [9, 10], [10, 105], [11, 10], [12, 15], [13, 110], [14, 10]] },
    { name: '節律活動（Pacing）', tone: 'good', points: [[1, 40], [3, 40], [5, 44], [7, 44], [9, 48], [11, 48], [14, 53]] },
  ],
};

export const WHO_CHRONIC_MATRIX: ChartSpec = {
  kind: 'matrix',
  cols: ['WHO 2023 建議', '說明'],
  rows: [
    { label: '結構化運動', icon: '🏋️', cells: [{ text: '建議', tone: 'good' }, '核心、有氧、伸展皆可，持續最重要'] },
    { label: '疼痛教育與心理治療（CBT 等）', icon: '🧠', cells: [{ text: '建議', tone: 'good' }, '改變對疼痛的理解與行為'] },
    { label: '徒手治療、按摩、針刺', icon: '🙌', cells: [{ text: '可考慮', tone: 'ok' }, '作為運動的輔助'] },
    { label: '多面向生理–心理–社會照護', icon: '👥', cells: [{ text: '建議', tone: 'good' }, '運動＋教育＋心理＋職能'] },
    { label: '鴉片類止痛藥', icon: '💊', cells: [{ text: '不建議常規使用', tone: 'bad' }, '長期效果有限、成癮風險'] },
    { label: '牽引、TENS、超音波、護腰帶', icon: '🔌', cells: [{ text: '不建議', tone: 'bad' }, '缺乏長期效益證據'] },
  ],
};

export const RETURN_TO_WORK: ChartSpec = {
  kind: 'flow',
  steps: [
    { label: '與主管溝通', detail: '說明可做與暫時避免的工作內容', icon: '💬', tone: 'ok' },
    { label: '工作調整', detail: '縮短工時、可坐可站、減少搬運', icon: '🔧', tone: 'ok' },
    { label: '逐週增量', detail: '每週增加工時或負荷約 10–20%', icon: '📈', tone: 'good' },
    { label: '恢復原職', detail: '持續運動維持，預防復發', icon: '✅', tone: 'good' },
  ],
};

export const PRESSURE_SITES: ChartSpec = {
  kind: 'matrix',
  cols: ['仰臥', '側臥', '坐輪椅'],
  rows: [
    { label: '最常見部位', icon: '📍', cells: [{ text: '薦尾骨、腳跟', tone: 'bad' }, { text: '髖部大轉子、外踝', tone: 'bad' }, { text: '坐骨、尾骨', tone: 'bad' }] },
    { label: '其他部位', icon: '🔎', cells: [{ text: '後腦勺、肩胛骨、手肘', tone: 'warn' }, { text: '耳朵、肩膀、膝蓋內側', tone: 'warn' }, { text: '肩胛骨、腳底', tone: 'warn' }] },
    { label: '減壓方法', icon: '🛡️', cells: [{ text: '腳跟懸空、床頭 ≤ 30°', tone: 'good' }, { text: '30° 側臥、膝間墊枕', tone: 'good' }, { text: '每 15–30 分鐘挪移身體', tone: 'good' }] },
  ],
};

export const PRESSURE_STAGES: ChartSpec = {
  kind: 'ladder',
  items: [
    { range: '第 1 級', label: '皮膚完整，按壓不變白的紅斑', detail: '立即解除壓力、增加翻身頻率', tone: 'warn', icon: '🟥' },
    { range: '第 2 級', label: '表皮破損或水泡，露出粉紅色傷口', detail: '告知居家護理師，保持傷口清潔濕潤', tone: 'bad', icon: '💧' },
    { range: '第 3 級', label: '全層皮膚缺損，可見脂肪', detail: '需專業傷口照護與營養評估', tone: 'bad', icon: '⚠️' },
    { range: '第 4 級', label: '深及肌肉、肌腱或骨頭', detail: '感染風險高，需醫療團隊處理', tone: 'bad', icon: '⛔' },
  ],
};

export const TURNING_CLOCK: ChartSpec = {
  kind: 'timeline',
  items: [
    { t: '08:00', label: '左側 30° 臥', detail: '背後墊枕、膝間夾枕；檢查右側皮膚', icon: '↙️', tone: 'ok' },
    { t: '10:00', label: '仰臥', detail: '小腿下墊枕讓腳跟懸空', icon: '⬆️', tone: 'good' },
    { t: '12:00', label: '右側 30° 臥', detail: '用餐時床頭抬高，餐後 30 分鐘再放低', icon: '↘️', tone: 'ok' },
    { t: '14:00 起', label: '依序循環', detail: '夜間可配合減壓床墊，間隔依醫護評估', icon: '🔁', tone: 'info' },
  ],
};

export const TRANSFER_STEPS: ChartSpec = {
  kind: 'flow',
  steps: [
    { label: '準備', detail: '輪椅放在健側、與床呈 30–45°，煞車鎖好、腳踏板移開', icon: '🦽', tone: 'ok' },
    { label: '坐到床緣', detail: '先側身（術後依圓滾木翻身），再用手撐起坐好，雙腳著地', icon: '🛏️', tone: 'ok' },
    { label: '照顧者站位', detail: '雙腳張開、膝蓋抵住對方膝蓋、抓移位腰帶', icon: '🧍', tone: 'warn' },
    { label: '起身轉位', detail: '數「1、2、3」一起站，用腳步轉身，不扭腰', icon: '🔄', tone: 'good' },
    { label: '慢慢坐下', detail: '對方摸到扶手後再屈膝坐下', icon: '💺', tone: 'good' },
  ],
};

export const ASSISTIVE_DEVICES: ChartSpec = {
  kind: 'matrix',
  cols: ['適合誰', '提醒'],
  rows: [
    { label: '手杖', icon: '🦯', cells: ['輕度不穩、單側無力', '拿在健側手；高度約在手腕橫紋'] },
    { label: '四腳拐', icon: '🦯', cells: ['平衡較差、需較多支撐', '四腳同時著地再出步'] },
    { label: '助行器', icon: '🚶', cells: ['術後早期、骨折後、平衡不佳', '先推助行器，再跨患側、後跨健側'] },
    { label: '洗澡椅與扶手', icon: '🚿', cells: ['站立洗澡易疲勞或暈眩者', '搭配止滑墊；扶手要鎖在牆柱上'] },
    { label: '馬桶增高座／便盆椅', icon: '🚽', cells: ['髖膝無力、術後不能深彎腰', '術後依醫囑避免過度彎腰'] },
    { label: '減壓床墊與氣墊床', icon: '🛏️', cells: ['長期臥床、壓瘡高風險', '仍須定時翻身，不能取代翻身'] },
  ],
};

export const SCOLIOSIS_LADDER: ChartSpec = {
  kind: 'ladder',
  items: [
    { range: '< 10°', label: '脊椎不對稱，不屬於側彎', detail: '一般無需追蹤', tone: 'good', icon: '✅' },
    { range: '10–25°', label: '輕度側彎：觀察追蹤', detail: '成長期每 4–6 個月追蹤；可配合側彎特定運動', tone: 'ok', icon: '👀' },
    { range: '25–40/45°', label: '中度：成長中考慮背架', detail: '骨骼未成熟且進展者，每天穿戴時數越長越有效', tone: 'warn', icon: '🦺' },
    { range: '> 45–50°', label: '重度：評估矯正手術', detail: '成年後仍可能持續進展', tone: 'bad', icon: '🏥' },
  ],
};

export const IBP_VS_MECHANICAL: ChartSpec = {
  kind: 'compare',
  columns: [
    { title: '發炎性背痛（疑似僵直性脊椎炎）', icon: '🔥', tone: 'bad', points: ['40 歲前開始，常在 20–30 歲', '慢慢開始、持續超過 3 個月', '活動後改善、休息不改善', '下半夜痛醒，起床活動後好轉', '早晨僵硬常超過 30 分鐘'] },
    { title: '機械性背痛（最常見）', icon: '⚙️', tone: 'ok', points: ['任何年齡，常與用力或姿勢有關', '常突然發生', '活動或久坐後加重、休息改善', '夜間痛較少', '早晨僵硬短暫'] },
  ],
  verdict: '符合發炎性背痛 5 項中的 4 項以上，應轉介風濕免疫科（HLA-B27、骨盆 X 光或 MRI）。',
};

export const PREGNANCY_CARE: ChartSpec = {
  kind: 'matrix',
  cols: ['可以做', '避免或就醫'],
  rows: [
    { label: '活動', icon: '🤰', cells: [{ text: '散步、水中運動、孕婦瑜伽、骨盆底訓練', tone: 'good' }, { text: '仰臥過久（懷孕中後期）、高衝擊運動', tone: 'warn' }] },
    { label: '支撐', icon: '🩹', cells: [{ text: '骨盆帶、側睡夾孕婦枕', tone: 'good' }, { text: '長時間單腳承重、跨大步', tone: 'warn' }] },
    { label: '止痛', icon: '💊', cells: [{ text: '熱敷（避開腹部）、依醫囑使用乙醯胺酚', tone: 'ok' }, { text: '懷孕 20 週後避免 NSAIDs', tone: 'bad' }] },
    { label: '警訊', icon: '🚨', cells: [{ text: '—', tone: 'neutral' }, { text: '規律下腹或腰部緊縮痛、出血、破水、發燒', tone: 'bad' }] },
  ],
};

export const BACKPACK_BARS: ChartSpec = {
  kind: 'bars',
  unit: 'kg',
  max: 9,
  ref: { value: 6, label: '40 kg 學生書包上限約 4–6 kg（體重 10–15%）' },
  items: [
    { label: '體重 30 kg', value: 4.5, display: '≤ 3–4.5 kg', icon: '🧒', tone: 'ok' },
    { label: '體重 40 kg', value: 6, display: '≤ 4–6 kg', icon: '🧑', tone: 'ok' },
    { label: '體重 50 kg', value: 7.5, display: '≤ 5–7.5 kg', icon: '🧑', tone: 'ok' },
    { label: '常見實際書包', value: 8, display: '常達 6–8 kg', icon: '🎒', tone: 'bad' },
  ],
};

// ── Interactive tool data ─────────────────────────────────────────────────────

export const FLARE_CARE_STEPS = [
  '先檢查警訊：大小便正常、會陰沒有麻木、雙腳力氣正常、沒有發燒',
  '找一個最舒服的姿勢休息 20–30 分鐘（側睡夾枕或仰睡膝下墊枕）',
  '熱敷 15–20 分鐘，隔一層毛巾',
  '每 30–60 分鐘起身慢走幾步，不要整天躺著',
  '需要時依藥師或醫師指示使用短期止痛藥',
  '起床先側身，再用手撐起；暫停搬重物與長時間久坐',
  '第 3 天起恢復散步與輕度日常活動',
  '記錄疼痛與活動量，6 週未改善或出現新症狀就醫',
];

export const HOME_SAFETY_ITEMS: { area: string; item: string }[] = [
  { area: '動線', item: '走道沒有電線、雜物與小地毯' },
  { area: '動線', item: '床到廁所有夜燈或感應燈' },
  { area: '動線', item: '常用物品放在腰到肩的高度，不必爬高或彎腰' },
  { area: '浴廁', item: '浴室與馬桶旁裝有固定式扶手' },
  { area: '浴廁', item: '浴室地面與浴缸內有止滑墊' },
  { area: '浴廁', item: '有洗澡椅，可坐著洗澡' },
  { area: '臥室', item: '床高度讓腳可平放地面、膝蓋約 90°' },
  { area: '臥室', item: '床邊有穩固的支撐物或床欄' },
  { area: '個人', item: '穿著合腳、包覆、防滑的鞋子（不穿拖鞋走動）' },
  { area: '個人', item: '視力與用藥（安眠藥、降壓藥）定期檢查' },
];

export const IBP_CRITERIA = [
  '背痛開始時年齡小於 40 歲',
  '慢慢開始（不是某次受傷或用力後突然發生）',
  '活動或運動後會改善',
  '休息並不會改善',
  '夜間會痛（起床活動後改善）',
];
