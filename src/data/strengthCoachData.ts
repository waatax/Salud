import type { StrengthTab } from '../config/routes';

export type { StrengthTab };

/**
 * strengthCoachData.ts — 肌力訓練專區 (v6.7)
 *
 * Section 1: TSCA 丙級肌力及體能教練證照研究。
 *
 * The outline the reader supplied is kept verbatim (module → sub-topic → bullet), then every
 * module carries (a) the evidence tables an examinee needs, (b) the module's「AI 深度研究提示」
 * and (c) a worked, source-checked answer to that prompt. Numbers follow the NSCA Essentials
 * of Strength Training and Conditioning (4th ed.) unless another source is cited, because that
 * text is the shared reference of Taiwanese strength & conditioning courses. Where the outline
 * disagreed with the reference, the correction is listed in OUTLINE_REVIEW rather than silently
 * rewritten. Course hours, fees and eligibility change per cohort, so they are phrased as
 * 「以當期簡章為準」.
 */

export interface StrengthSource {
  label: string;
  url: string;
}

export const STRENGTH_SOURCES: Record<string, StrengthSource> = {
  NSCA4: { label: 'Haff GG, Triplett NT (eds). Essentials of Strength Training and Conditioning, 4th ed. NSCA / Human Kinetics, 2016', url: 'https://us.humankinetics.com/products/essentials-of-strength-training-and-conditioning-4th-edition' },
  ACSM2009: { label: 'ACSM Position Stand. Progression models in resistance training for healthy adults. Med Sci Sports Exerc 2009;41:687-708', url: 'https://doi.org/10.1249/MSS.0b013e3181915670' },
  GASTIN2001: { label: 'Gastin PB. Energy system interaction and relative contribution during maximal exercise. Sports Med 2001;31:725-41', url: 'https://doi.org/10.2165/00007256-200131100-00003' },
  GAITANOS1993: { label: 'Gaitanos GC, et al. Human muscle metabolism during intermittent maximal exercise. J Appl Physiol 1993;75:712-9', url: 'https://doi.org/10.1152/jappl.1993.75.2.712' },
  FOLLAND2007: { label: 'Folland JP, Williams AG. The adaptations to strength training: morphological and neurological contributions. Sports Med 2007;37:145-68', url: 'https://doi.org/10.2165/00007256-200737020-00004' },
  SCHOENFELD2010: { label: 'Schoenfeld BJ. The mechanisms of muscle hypertrophy and their application to resistance training. J Strength Cond Res 2010;24:2857-72', url: 'https://doi.org/10.1519/JSC.0b013e3181e840f3' },
  SCHOENFELD2016REST: { label: 'Schoenfeld BJ, et al. Longer interset rest periods enhance muscle strength and hypertrophy in resistance-trained men. J Strength Cond Res 2016;30:1805-12', url: 'https://doi.org/10.1519/JSC.0000000000001272' },
  SUCHOMEL2016: { label: 'Suchomel TJ, Nimphius S, Stone MH. The importance of muscular strength in athletic performance. Sports Med 2016;46:1419-49', url: 'https://doi.org/10.1007/s40279-016-0486-0' },
  FRY2003: { label: 'Fry AC, et al. Effect of knee position on hip and knee torques during the barbell squat. J Strength Cond Res 2003;17:629-33', url: 'https://pubmed.ncbi.nlm.nih.gov/14636100/' },
  JEFFREYS2007: { label: 'Jeffreys I. Warm-up revisited: the RAMP method of optimizing warm-ups. Professional Strength & Conditioning 2007;6:12-8', url: 'https://scholar.google.com/scholar?q=Jeffreys+Warm-up+revisited+the+RAMP+method+of+optimizing+warm-ups' },
  MACDOUGALL1985: { label: 'MacDougall JD, et al. Arterial blood pressure response to heavy resistance exercise. J Appl Physiol 1985;58:785-90', url: 'https://doi.org/10.1152/jappl.1985.58.3.785' },
  WULF2013: { label: 'Wulf G. Attentional focus and motor learning: a review of 15 years. Int Rev Sport Exerc Psychol 2013;6:77-104', url: 'https://doi.org/10.1080/1750984X.2012.723728' },
  ALATTAR2017: { label: 'Al Attar WSA, et al. Effect of injury prevention programs that include the Nordic hamstring exercise on hamstring injury rates. Sports Med 2017;47:907-16', url: 'https://doi.org/10.1007/s40279-016-0638-2' },
  THOMAS2016: { label: 'Thomas DT, Erdman KA, Burke LM. ACSM / AND / DC joint position: Nutrition and athletic performance. Med Sci Sports Exerc 2016;48:543-68', url: 'https://doi.org/10.1249/MSS.0000000000000852' },
  JAGER2017: { label: 'Jäger R, et al. ISSN position stand: protein and exercise. J Int Soc Sports Nutr 2017;14:20', url: 'https://doi.org/10.1186/s12970-017-0177-8' },
  KERKSICK2017: { label: 'Kerksick CM, et al. ISSN position stand: nutrient timing. J Int Soc Sports Nutr 2017;14:33', url: 'https://doi.org/10.1186/s12970-017-0189-4' },
  KREIDER2017: { label: 'Kreider RB, et al. ISSN position stand: safety and efficacy of creatine supplementation. J Int Soc Sports Nutr 2017;14:18', url: 'https://doi.org/10.1186/s12970-017-0173-z' },
  GUEST2021: { label: 'Guest NS, et al. ISSN position stand: caffeine and exercise performance. J Int Soc Sports Nutr 2021;18:1', url: 'https://doi.org/10.1186/s12970-020-00383-4' },
  SAWKA2007: { label: 'ACSM Position Stand (Sawka MN, et al.). Exercise and fluid replacement. Med Sci Sports Exerc 2007;39:377-90', url: 'https://doi.org/10.1249/mss.0b013e31802ca597' },
  SCHOENFELD2013: { label: 'Schoenfeld BJ, Aragon AA, Krieger JW. The effect of protein timing on muscle strength and hypertrophy: a meta-analysis. J Int Soc Sports Nutr 2013;10:53', url: 'https://doi.org/10.1186/1550-2783-10-53' },
  CTADA: { label: '財團法人中華運動禁藥防制基金會（運動禁藥查詢與營養補充品風險）', url: 'https://www.antidoping.org.tw/' },
};

export interface StrengthChapter {
  id: StrengthTab;
  label_zh: string;
  title_zh: string;
  goal_zh: string;
  learn_zh: string[];
  minutes: number;
  takeaways_zh: string[];
}

export const STRENGTH_CHAPTERS: StrengthChapter[] = [
  {
    id: 'OVERVIEW',
    label_zh: '證照總覽',
    title_zh: 'TSCA 丙級肌力及體能教練：考什麼、怎麼準備',
    goal_zh: '丙級是國內肌力與體能教練分級授證的入門級，結訓後要同時通過學科與術科。這一章把五大模組畫成一張備考地圖，並列出研究大綱經「深度確認」後的校訂說明與 8 週準備計畫。',
    learn_zh: ['學科與術科分別在考什麼', '五大模組的關係與建議投入時間', '研究大綱中需要校正或補充的地方'],
    minutes: 6,
    takeaways_zh: [
      '丙級考核分「學科」（運動科學、課表設計的理解與應用）與「術科」（自己做得標準＋能教、能修正、能保護）兩部分；課程時數、費用與報考資格以當期簡章為準。',
      '五大模組的順序就是學習順序：先懂身體（模組一）→會開課表（模組二）→做得標準（模組三）→教得會、改得好（模組四）→營養與考場總體檢（模組五）。',
      '本大綱經逐條比對 NSCA 教科書與國際立場聲明後，校正了週期化分期、糖解系統用語、爆發上膊譯名等 10 處細節；答題時建議中英文術語並列。',
    ],
  },
  {
    id: 'M1_SCIENCE',
    label_zh: '模組一 運動科學',
    title_zh: '模組一：運動科學與解剖生理基礎（學科核心）',
    goal_zh: '所有課表與動作教學都建立在四個基礎上：肌肉怎麼長在骨頭上、力量怎麼經過槓桿傳出去、能量從哪裡來、身體如何因訓練而改變。這一章附上三大能量系統的深度專題與 3 題高難度情境題。',
    learn_zh: ['三大運動面、肌肉角色與主要肌群起止點', '三種槓桿、力矩與力臂的考法', '三大能量系統的供能時間、限制因子與運動休息比'],
    minutes: 14,
    takeaways_zh: [
      '矢狀面做屈伸（蹲、硬舉）、額狀面做外展內收（側平舉、側弓步）、水平面做旋轉（揮棒、旋轉拋）；人體多數關節屬於「第三類槓桿」——犧牲力學效益換取速度與活動範圍。',
      '自由重量的阻力永遠垂直向下，所以力臂＝關節到槓鈴重心鉛垂線的「水平距離」：槓鈴離身體越遠、軀幹越前傾，下背與髖的力矩越大。',
      '磷酸原系統約 0–10 秒（運動休息比 1:12–1:20）、快速糖解約 15 秒–2 分（1:3–1:5）、有氧系統 >3 分（1:1–1:3）；訓練前 6–8 週的肌力進步以神經適應為主，之後肌肥大的比重才逐漸增加。',
    ],
  },
  {
    id: 'M2_PROGRAM',
    label_zh: '模組二 課表設計',
    title_zh: '模組二：課表設計與週期化理論（學科／實務）',
    goal_zh: '課表設計是「需求分析 → 選擇訓練目標 → 設定變數 → 依時間軸排成週期 → 排出單次課順序」的推理過程。這一章附 NSCA 變數總表、傳統週期化校正版，以及一份大專籃球員 4 週「第一轉換期」完整課表。',
    learn_zh: ['需求分析三問：生理、生物力學、傷害風險', '肌力／爆發力／肌肥大／肌耐力的強度、次數、組數與休息', '傳統（線性）週期化各期的正確內容與單次課排序'],
    minutes: 14,
    takeaways_zh: [
      'NSCA 變數：肌力 ≥85% 1RM、≤6 次、2–6 組、休 2–5 分；肌肥大 67–85%、6–12 次、3–6 組、休 30 秒–1.5 分；肌耐力 ≤67%、≥12 次、2–3 組、休 ≤30 秒；爆發力單次 80–90% × 1–2 次或多次 75–85% × 3–5 次，休 2–5 分。',
      '傳統週期化：準備期（肌肥大／肌耐力期 → 基礎肌力期）→ 第一轉換期（肌力／爆發力期）→ 比賽期（巔峰或維持）→ 第二轉換期（主動休息）；強度逐步上升、訓練量逐步下降。',
      '單次課順序：熱身 → 爆發力動作 → 多關節主項 → 單關節輔助 → 核心／體能；疲勞會破壞爆發動作的速度與技術，所以最需要神經新鮮度的放最前面。',
    ],
  },
  {
    id: 'M3_TECHNIQUE',
    label_zh: '模組三 術科技術',
    title_zh: '模組三：術科技術操作與動作教學（術科核心）',
    goal_zh: '術科考的是「自己做得標準，而且說得出為什麼」。這一章整理活動度／穩定度篩檢、RAMP 熱身、三大項與上肢推拉的技術要點、爆發上膊分期與增強式訓練劑量，並附一份傳統硬舉的完整教學講義。',
    learn_zh: ['深蹲深度不足的三種誘因與簡易判別', 'RAMP 熱身流程與每個階段的動作', '蹲、鉸鏈、推、拉與爆發上膊的標準技術'],
    minutes: 16,
    takeaways_zh: [
      '深蹲深度不足先分辨是「踝背屈」（墊高腳跟就改善）、「髖活動度」還是「控制／穩定」（躺著或抱壺鈴就蹲得下去）問題，再決定要伸展還是要練控制。',
      '自由重量動作共通的技術骨架：穩定的足部支撐 → 中立脊椎與 360° 腹壓 → 槓鈴路徑貼近身體重心線 → 用正確的關節順序發力 → 完全控制的離心下放。',
      '爆發上膊的關鍵是第二拉「髖、膝、踝三關節同時爆發伸展」（Triple Extension），手臂只是連接；爆發力動作不做人工保護，而是在舉重台上用包膠槓片、教會安全棄槓。',
    ],
  },
  {
    id: 'M4_COACHING',
    label_zh: '模組四 執教修正',
    title_zh: '模組四：教練執教技巧與錯誤修正（術科考試勝負手）',
    goal_zh: '會做不等於會教。術科高分的考生能在 3 秒內看出錯誤、用一句外部口令讓運動員改過來，改不過來就立刻給出合理的退階動作，並全程站在正確的保護位置。這一章附三大常見錯誤的對比修正表。',
    learn_zh: ['內部 vs 外部口令與有效口令的寫法', '蹲、硬舉、臥推九大錯誤的原因與修正', '退階／進階階梯與臥推、深蹲、推舉的保護技巧'],
    minutes: 14,
    takeaways_zh: [
      '外部口令（把注意力放在動作對環境的效果，如「把地板往外撕開」）在多數研究中比內部口令（如「臀部夾緊」）帶來更好的表現與學習；口令要短、一次只改一件事。',
      '修正順序：先安全（脊椎、膝關節）→ 再位置（起始設定）→ 最後效率（速度、節奏）；同一錯誤口令試兩次無效，就退階到能做對的版本，而不是繼續喊。',
      '臥推保護者站在槓鈴頭側、用正反握在運動員握距內側跟隨槓鈴；深蹲保護者站在正後方、雙手靠近運動員軀幹，重量大時改用兩側保護或安全槓；爆發上膊不做保護。',
    ],
  },
  {
    id: 'M5_EXAM',
    label_zh: '模組五 衝刺總體檢',
    title_zh: '模組五：特殊學科主題與考試衝刺（備考總體檢）',
    goal_zh: '最後一章補上運動營養與補給品的實證劑量，示範一場 10 分鐘術科測驗的標準流程，並附 15 題模擬考卷與答案解析，讓你在考前做一次完整總體檢。',
    learn_zh: ['醣類、蛋白質、脂肪與水分的每日需求與補充時機', '肌酸、咖啡因、乳清蛋白的實證劑量與禁藥風險', '10 分鐘術科測驗流程與模擬考卷'],
    minutes: 15,
    takeaways_zh: [
      '肌力型運動員蛋白質每日 1.4–2.0 g/kg、每餐 20–40 g、每 3–4 小時一次；醣類依訓練量 3–10 g/kg；脂肪占總熱量 20–35%；總量比「黃金 30 分鐘」更重要。',
      '肌酸每日 3–5 g（可先以 0.3 g/kg/天載入 5–7 天）、咖啡因運動前約 60 分鐘 3–6 mg/kg；運動員須自負「嚴格責任」，補給品優先選第三方禁藥檢驗認證產品。',
      '術科 10 分鐘可用「說（目的）→示（示範）→做（操作）→修（修正）→護（保護）→結（總結）」六步驟，臨場被指定陌生動作時先停 3 秒，依同一骨架作答。',
    ],
  },
];

// ── Course map ───────────────────────────────────────────────────────────

export const STRENGTH_UNITS: { title: string; blurb: string; chapters: StrengthTab[] }[] = [
  { title: 'TSCA 丙級｜備考地圖', blurb: '證照架構、大綱校訂與 8 週計畫', chapters: ['OVERVIEW'] },
  { title: 'TSCA 丙級｜學科核心', blurb: '運動科學、能量系統、課表與週期化', chapters: ['M1_SCIENCE', 'M2_PROGRAM'] },
  { title: 'TSCA 丙級｜術科與執教', blurb: '動作技術、口令、錯誤修正與保護', chapters: ['M3_TECHNIQUE', 'M4_COACHING'] },
  { title: 'TSCA 丙級｜衝刺總體檢', blurb: '運動營養、術科流程與模擬考卷', chapters: ['M5_EXAM'] },
];

// ── Outline (verbatim from the study plan, typos corrected) ──────────────

export interface OutlineTopic {
  code: string;
  title: string;
  items: string[];
}

export interface ModuleOutline {
  title: string;
  kind: string;
  topics: OutlineTopic[];
  prompt: string;
  /** Set when the prompt text was repaired or reconstructed during review. */
  promptNote?: string;
}

export const MODULE_OUTLINES: Record<Exclude<StrengthTab, 'OVERVIEW'>, ModuleOutline> = {
  M1_SCIENCE: {
    title: '模組一：運動科學與解剖生理基礎',
    kind: '學科核心',
    topics: [
      { code: '1.1', title: '骨骼肌肉系統與功能解剖學', items: ['全身主要骨骼與大肌群（胸、背、腿、核心）的起止點與功能。', '人體三大運動面（矢狀面、額狀面、水平面）與關節動作分析。', '主動肌、協同肌、對抗肌與穩定肌的動態協作關係。'] },
      { code: '1.2', title: '運動生物力學與動作分析', items: ['人體運動中的槓桿原理（一級、二級、三級槓桿）與力矩應用。', '自由重量訓練中的地心引力、阻力臂與力線（Line of Pull）分析。'] },
      { code: '1.3', title: '人體三大能量系統與代謝生理', items: ['磷酸原系統（ATP-PC）、糖解系統（乳酸系統）、有氧系統的供能特質、限制因子與恢復時間。', '不同運動專項（如：100 米短跑 vs. 籃球 vs. 馬拉松）的能量系統需求分析。'] },
      { code: '1.4', title: '阻力訓練的生理適應機制', items: ['神經系統適應（運動單位徵召、發射頻率、同步化）。', '肌肉組織適應（肌肥大、肌纖維型態轉變）與骨骼結締組織適應。'] },
    ],
    prompt: '請扮演運動生理學教授，針對『模組一』中的『1.3 三大能量系統』進行深度專題研究。請詳細說明每個系統的生化機轉、代表運動、運動與休息比例（W:R ratio），並為 TSCA 丙級考試設計 3 題高難度的情境模擬選擇題。',
  },
  M2_PROGRAM: {
    title: '模組二：課表設計與週期化理論',
    kind: '學科／實務',
    topics: [
      { code: '2.1', title: '運動專項需求分析（Needs Analysis）', items: ['生理需求（主要供能系統、代謝特質）。', '生物力學需求（主要關節運動特質、發力方向）。', '常見運動傷害風險評估（預防性訓練規劃）。'] },
      { code: '2.2', title: '阻力訓練變數編排', items: ['訓練目標分類：肌肥大（Hypertrophy）、最大肌力（Maximum Strength）、爆發力（Power）、肌耐力（Muscular Endurance）。', '變數精確設定：強度（%1RM / RPE）、組數、次數、組間休息時間、每週頻率。'] },
      { code: '2.3', title: '基礎週期化理論與編排', items: ['傳統週期化（線性週期化）模型：準備期、第一轉換期、比賽期、第二轉換期（各期內容見下方校正版表格）。', '單次訓練課（Session）的黃金結構與動作編排順序（爆發力 → 多關節主項 → 單關節輔助 → 核心／體能）。'] },
    ],
    prompt: '請扮演資深肌力教練，針對『模組二』中的『2.2 與 2.3』，為一名大專籃球校隊球員，設計一份為期 4 週的『第一轉換期（最大肌力轉換至爆發力）』阻力訓練課表。需包含動作名稱、組數次數（%1RM）、組間休息，並說明編排邏輯。',
  },
  M3_TECHNIQUE: {
    title: '模組三：術科技術操作與動作教學',
    kind: '術科核心',
    topics: [
      { code: '3.1', title: '基礎功能性動作篩檢與準備運動', items: ['關節活動度（Mobility）與穩定度（Stability）評估（如：深蹲深度不足的誘因）。', '動態熱身（Dynamic Warm-up）流程設計：提升核心溫度、激活目標肌群、動態伸展、神經系統潛能激發（RAMP 原則）。'] },
      { code: '3.2', title: '自由重量核心動作技術（三大項與多關節）', items: ['下肢推（Squat Pattern）：背蹲舉、前蹲舉、分腿蹲的標準技術與呼吸。', '下肢拉（Hinge Pattern）：傳統硬舉、相撲硬舉、羅馬尼亞硬舉（RDL）。', '上肢推拉（Push / Pull Pattern）：臥推、軍事推舉、槓鈴划船、引體向上。'] },
      { code: '3.3', title: '基礎爆發力訓練技術', items: ['奧林匹克舉重延伸動作：Power Clean（爆發上膊）、Hang Clean（懸垂上膊）的動作拆解與發力點（Triple Extension）。', '彈力繩、藥球與跳躍訓練（Plyometrics）的實務應用。'] },
    ],
    prompt: '請扮演術科總考官，針對『模組三』中的『3.2 傳統硬舉（Conventional Deadlift）』，撰寫一份完美的教學講義。內容需包含：1. 起始設定（Setup）黃金標準、2. 拉起與鎖定（Lockout）的發力要領、3. 呼吸與腹壓（Valsalva maneuver）控制。',
    promptNote: '原文「方針對」已更正為「針對」。',
  },
  M4_COACHING: {
    title: '模組四：教練執教技巧與錯誤修正',
    kind: '術科考試勝負手',
    topics: [
      { code: '4.1', title: '教練口語提示技巧（Cueing）', items: ['內部提示（Internal Cueing，如：夾緊你的背） vs. 外部提示（External Cueing，如：把地面踩穿）。', '精準、簡短、有效率的口令建立。'] },
      { code: '4.2', title: '常見錯誤動作觀察與即時修正', items: ['蹲舉類：膝蓋內夾（Knee Valgus）、屁股眨眼（Butt Wink）、重心前傾。', '硬舉類：圓背下背代償、槓鈴遠離身體、膝關節提早鎖定（變直腿硬舉）。', '臥推類：肩胛未收穩、手肘過度外展（Flare out）、聳肩。'] },
      { code: '4.3', title: '技術退階與進階（Progression & Regression）', items: ['當運動員無法完成標準動作時，如何立刻給出合理的退階動作（如：傳統硬舉 → 架高硬舉／六角槓硬舉 → 壺鈴硬舉）。'] },
      { code: '4.4', title: '安全維護與保護技巧（Spotting）', items: ['臥推、深蹲、過頭推舉的正確保護位置、手勢與介入時機。', '爆發力動作（如 Clean）不進行人工保護的釋能（Bailing）安全觀念。'] },
    ],
    prompt: '請扮演精準的術科指導教練，針對『模組四』中的『4.2 與 4.3 錯誤修正』，列出一個對比表格。針對：深蹲膝蓋內夾、硬舉圓背、臥推聳肩這三個常見錯誤，分別給出：1. 錯誤原因分析、2. 修正的外部口令（External Cue）、3. 兩步驟的退階（Regression）訓練方法。',
  },
  M5_EXAM: {
    title: '模組五：特殊學科主題與考試衝刺',
    kind: '備考總體檢',
    topics: [
      { code: '5.1', title: '運動營養與體重管理', items: ['三大營養素（醣類、蛋白質、脂肪）在訓練前後的補充時機與比例。', '水分補充與電解質平衡、常見運動補給品（肌酸、咖啡因、乳清蛋白）的科學實證。'] },
      { code: '5.2', title: '術科口條與情境模擬檢定（教練 vs. 運動員）', items: ['如何有自信、條理清晰地主持一場 10 分鐘的術科測驗。', '應對考官隨機指定動作時的心理調適與標準化流程。'] },
    ],
    prompt: '請扮演 TSCA 丙級學科命題委員，依據模組一至模組五的範圍，設計一份 15 題的單選模擬考卷（難度由易到難，包含情境題與計算題），並在考卷最後附上詳細的答案解析。',
    promptNote: '原大綱此段提示只剩「…設計，並在考卷最後附上詳細的答案解析。」，前半段遺失；此處依上下文補完為「模擬考卷」提示，題數與題型可自行調整。5.2「標準流程流程化」已更正為「標準化流程」。',
  },
};

// ── Overview ─────────────────────────────────────────────────────────────

export const EXAM_FORMAT = [
  { part: '研習課程', what: '學科講授＋術科實作，通常分數個週末上課', tip: '上課前就應能穩定完成空槓到中等重量的蹲、硬舉、臥推、推舉，課堂才能專注在「教」' },
  { part: '學科測驗', what: '運動科學、能量系統、需求分析、訓練變數、週期化、營養與安全', tip: '題目常以情境呈現（某運動員、某目標），要能把原理「用出來」，不只背定義' },
  { part: '術科測驗', what: '自身動作示範＋指導運動員（口令、觀察、修正、退階、保護）', tip: '考官同時看「你做得對不對」與「你教得會不會」；爆發上膊通常是難關' },
];

export const MODULE_MAP = [
  { mod: '模組一', name: '運動科學與解剖生理', type: '學科', question: '身體怎麼產生與傳遞力量？', share: '25%' },
  { mod: '模組二', name: '課表設計與週期化', type: '學科／實務', question: '這個人該練什麼、練多少、何時練？', share: '20%' },
  { mod: '模組三', name: '術科技術與動作教學', type: '術科', question: '我自己做得標準嗎？', share: '25%' },
  { mod: '模組四', name: '執教技巧與錯誤修正', type: '術科', question: '我能讓別人做對、做得安全嗎？', share: '20%' },
  { mod: '模組五', name: '營養與考試衝刺', type: '學科＋術科', question: '我準備好上考場了嗎？', share: '10%' },
];

/** 深度確認：大綱逐條比對參考文獻後的校訂與補充。 */
export const OUTLINE_REVIEW = [
  { where: '1.3', original: '糖解系統（乳酸系統）', revised: '建議寫「糖解系統（快速／慢速糖解）」。乳酸不是疲勞或痠痛的元兇：快速糖解時累積的氫離子（H⁺）與無機磷才是限制因子，乳酸反而能被心肌與其他肌纖維當燃料再利用。', source: 'NSCA4' },
  { where: '1.3', original: '各系統「恢復時間」', revised: '補上數值：磷酸肌酸約 3–5 分鐘接近完全回補（最長約 8 分鐘）；血乳酸約 30–60 分鐘回到基準（主動恢復較快）；肌肝醣完全回補需 24 小時以上。', source: 'NSCA4' },
  { where: '1.2', original: '一、二、三級槓桿', revised: '補充考點：人體大多數肌肉以第三類槓桿作用（力學效益 <1），換取速度與活動範圍；提踵常被歸為第二類槓桿。', source: 'NSCA4' },
  { where: '2.2', original: '強度（%1RM / RPE）', revised: '補上 NSCA 各目標的負荷、次數、組數與休息數值，以及 RPE 與保留次數（RIR）對照（RPE 10 = RIR 0、RPE 8 = RIR 2）。', source: 'NSCA4' },
  { where: '2.3', original: '準備期（解剖適應、肌肥大）、第一轉換期（最大肌力）、比賽期（爆發力／專項體能）', revised: 'NSCA 傳統模型：準備期＝肌肥大／肌耐力期 → 基礎肌力期；第一轉換期＝肌力／爆發力期（75–95%、2–5 次）；比賽期＝巔峰或維持；第二轉換期＝主動休息。「解剖適應」是 Bompa 模型用語，可視為準備期最前段。（模組二的 AI 提示寫「最大肌力轉換至爆發力」與此一致。）', source: 'NSCA4' },
  { where: '2.2', original: '肌肥大休息時間', revised: 'NSCA 考試答案為 30 秒–1.5 分；但近年研究顯示多關節動作休息 ≥2 分鐘、維持訓練量時，肌肥大效果不輸短休息。考試依教科書，實務可彈性。', source: 'SCHOENFELD2016REST' },
  { where: '3.3', original: 'Power Clean（威力上舉）', revised: '國內教科書與教練圈多譯為「爆發上膊」（或力量上膊），Hang Clean 為「懸垂上膊」；答題時中英文並列最保險。', source: 'NSCA4' },
  { where: '3.2', original: '呼吸與腹壓（Valsalva）', revised: '補上安全限制：有訓練經驗者在結構性動作中短暫閉氣可提高軀幹剛性，但重訓時動脈壓可短暫超過 300 mmHg；高血壓未控制、心血管疾病、青光眼、疝氣、懷孕者應避免長時間閉氣。', source: 'MACDOUGALL1985' },
  { where: '4.4', original: '爆發力動作不進行人工保護', revised: '正確（NSCA）。補充：需在舉重台上使用包膠槓片、周圍淨空，並先教會運動員安全棄槓（Bailing）。', source: 'NSCA4' },
  { where: '模組三／五 提示', original: '「方針對」、「標準流程流程化」、模組五提示前半段遺失', revised: '已分別更正為「針對」「標準化流程」，模組五提示依上下文補完為 15 題模擬考卷（見模組五）。', source: 'NSCA4' },
];

export const STUDY_PLAN = [
  { week: '第 1 週', theory: '模組一 1.1–1.2：運動面、肌肉角色、起止點、槓桿與力矩', practice: '空槓練蹲、硬舉、臥推、推舉，每項每次錄影 1 組' },
  { week: '第 2 週', theory: '模組一 1.3–1.4：能量系統、W:R、神經與肌肉適應', practice: 'RAMP 熱身流程背熟並能帶給別人；開始練懸垂上膊（空槓／木棍）' },
  { week: '第 3 週', theory: '模組二 2.1–2.2：需求分析、四大訓練目標變數表', practice: '前蹲舉、分腿蹲、RDL、相撲硬舉技術；寫下每個動作 3 個口令' },
  { week: '第 4 週', theory: '模組二 2.3：週期化分期、單次課排序；自己開一份 4 週課表', practice: '爆發上膊完整分期；彈力帶、藥球、跳躍訓練各 3 種' },
  { week: '第 5 週', theory: '模組四 4.1：內外部口令、回饋類型', practice: '找一位朋友當運動員，練「看錯誤 → 一句口令 → 再看」' },
  { week: '第 6 週', theory: '模組四 4.2–4.3：九大錯誤原因、退階階梯', practice: '每個主項練 2 種退階、1 種進階；練臥推與深蹲保護位置' },
  { week: '第 7 週', theory: '模組五 5.1：營養、水分與補給品劑量', practice: '10 分鐘術科完整模擬 × 3 次（請人隨機指定動作並計時）' },
  { week: '第 8 週', theory: '模擬考卷 × 2 回，錯題回到對應模組重讀', practice: '降低訓練量、保持技術手感，考前 2 天不做大重量' },
];

// ── Module 1 ─────────────────────────────────────────────────────────────

export const PLANES = [
  { plane: '矢狀面（Sagittal）', axis: '額狀軸（左右向）', motion: '屈曲／伸展、背屈／蹠屈', example: '深蹲、硬舉、弓步、二頭彎舉、跑步' },
  { plane: '額狀面（Frontal）', axis: '矢狀軸（前後向）', motion: '外展／內收、側屈、足內外翻', example: '側平舉、側弓步、側向跳躍、引體向上（肩內收）' },
  { plane: '水平面（Transverse）', axis: '垂直軸（上下向）', motion: '內旋／外旋、水平外展／內收、軀幹旋轉', example: '揮棒、藥球旋轉拋、臥推與飛鳥（肩水平內收）' },
];

export const MUSCLE_ROLES = [
  { role: '主動肌（Agonist）', define: '產生主要動作的肌肉', squat: '股四頭肌、臀大肌', bench: '胸大肌' },
  { role: '協同肌（Synergist）', define: '協助主動肌完成動作', squat: '內收大肌、膕旁肌（協助伸髖）', bench: '前三角肌、肱三頭肌' },
  { role: '對抗肌（Antagonist）', define: '與主動肌作用相反，負責減速與保護關節', squat: '膕旁肌（相對膝伸展）', bench: '背闊肌、菱形肌、後三角肌' },
  { role: '穩定肌（Stabilizer）', define: '固定近端關節，讓動作在穩定平台上發生', squat: '豎脊肌、腹橫肌、腹內外斜肌', bench: '旋轉肌袖、前鋸肌、下斜方肌' },
];

export const MAJOR_MUSCLES = [
  { muscle: '胸大肌', origin: '鎖骨內側半、胸骨與第 1–6 肋軟骨', insertion: '肱骨大結節嵴（結節間溝外唇）', action: '肩水平內收、內收、內旋；鎖骨部協助屈肩' },
  { muscle: '背闊肌', origin: 'T7–L5 棘突、胸腰筋膜、髂嵴、下 3–4 肋', insertion: '肱骨結節間溝底', action: '肩伸展、內收、內旋（引體、划船主動肌）' },
  { muscle: '斜方肌', origin: '枕骨、項韌帶、C7–T12 棘突', insertion: '鎖骨外側、肩峰、肩胛棘', action: '上束上提、中束後收、下束下壓肩胛' },
  { muscle: '臀大肌', origin: '髂骨後部、薦骨與尾骨背面、胸腰筋膜', insertion: '髂脛束、股骨臀肌粗隆', action: '髖伸展、外旋（蹲站起、硬舉鎖定）' },
  { muscle: '股四頭肌', origin: '股直肌：髂前下棘；股內／外／中間肌：股骨', insertion: '經髕骨與髕腱至脛骨粗隆', action: '膝伸展；股直肌另可屈髖' },
  { muscle: '膕旁肌', origin: '坐骨粗隆（股二頭肌短頭起於股骨粗線）', insertion: '腓骨頭（股二頭肌）、脛骨內側（半腱肌、半膜肌）', action: '膝屈曲、髖伸展（RDL、北歐腿彎舉）' },
  { muscle: '腹直肌', origin: '恥骨嵴與恥骨聯合', insertion: '第 5–7 肋軟骨、劍突', action: '軀幹屈曲；肌力訓練中負責「抗伸展」' },
  { muscle: '腹橫肌', origin: '下 6 肋軟骨內面、胸腰筋膜、髂嵴、腹股溝韌帶', insertion: '白線、恥骨', action: '提高腹內壓、穩定腰椎（腹壓的主角）' },
  { muscle: '豎脊肌', origin: '薦骨、髂嵴、腰椎與下胸椎棘突', insertion: '肋骨、椎骨橫突與棘突、乳突', action: '脊椎伸展；蹲舉與硬舉中負責「抗屈曲」' },
];

export const LEVERS = [
  { cls: '第一類槓桿', layout: '支點在中間（力—支點—阻力）', ma: '可 >1、=1 或 <1', example: '點頭（寰枕關節）、過頭三頭肌伸展（肘關節）' },
  { cls: '第二類槓桿', layout: '阻力在中間（支點—阻力—力）', ma: '>1（省力、費距離）', example: '提踵（以蹠趾關節為支點）' },
  { cls: '第三類槓桿', layout: '施力在中間（支點—力—阻力）', ma: '<1（費力、省距離、速度快）', example: '二頭彎舉（肘屈曲）、膝伸展——人體最常見' },
];

export const ENERGY_SYSTEMS = [
  { system: '磷酸原系統（ATP-PC）', fuel: '肌肉內 ATP、磷酸肌酸（PCr）；肌酸激酶催化 PCr + ADP → ATP', time: '約 0–10 秒，90–100% 最大功率', limit: 'PCr 儲量（只夠數秒）', recovery: 'PCr 約 3–5 分鐘接近完全回補', wr: '1:12–1:20', example: '舉重、投擲、100 米起跑、跳躍' },
  { system: '快速糖解', fuel: '肌肝醣／葡萄糖 → 丙酮酸 → 乳酸（每分子葡萄糖淨得 2 ATP；肝醣為 3 ATP）', time: '約 15 秒–2 分，75–90% 最大功率', limit: 'H⁺ 累積造成肌肉酸化，抑制磷酸果糖激酶（PFK）與鈣離子結合', recovery: '血乳酸約 30–60 分鐘回到基準（主動恢復較快）', wr: '1:3–1:5（30 秒內）；1:3–1:4（1–3 分）', example: '200–800 米、摔角、反覆衝刺' },
  { system: '有氧（氧化）系統', fuel: '醣類與脂肪在粒線體經克氏循環與電子傳遞鏈（每分子葡萄糖約 30–38 ATP）', time: '>3 分鐘，20–30% 最大功率可持續數小時', limit: '肝醣儲量、氧氣運輸（心輸出量）、粒線體密度', recovery: '肌肝醣完全回補需 24 小時以上', wr: '1:1–1:3', example: '馬拉松、長距離自行車、登山' },
];

export const SPORT_ENERGY = [
  { sport: '100 米短跑（約 10 秒）', main: '磷酸原 ＋ 快速糖解', why: '全力、極短時間；後段減速與 PCr 耗竭、糖解速率跟不上有關', train: '最大肌力、爆發力、短衝刺（W:R 1:12–1:20）' },
  { sport: '籃球（間歇型）', main: '三系統交替：衝刺與跳躍靠磷酸原／糖解，回補與續航靠有氧', why: '高強度動作反覆出現，有氧能力決定兩次衝刺之間 PCr 回補多快', train: '肌力爆發力 ＋ 反覆衝刺 ＋ 有氧基礎' },
  { sport: '馬拉松（2–5 小時）', main: '有氧系統（醣類與脂肪）', why: '「撞牆」多與肌肝醣耗竭有關；跑步經濟性決定能耗', train: '有氧基礎、乳酸閾值、肌力訓練改善跑步經濟性' },
];

export const ADAPTATIONS = [
  { type: '神經適應', items: '運動單位徵召增加（依大小原則由小到大）、發射頻率（Rate coding）提高、運動單位同步化、肌群間協調改善、對抗肌共同收縮減少', when: '訓練前 6–8 週肌力進步的主因' },
  { type: '肌肉適應', items: '肌肥大（以機械張力為主要驅動，代謝壓力與肌肉損傷為輔）；肌纖維型態由 IIx 轉向 IIa', when: '約 6–8 週後比重逐漸增加' },
  { type: '骨骼與結締組織', items: '骨質密度隨「超過最低有效應變」的負荷而增加，具部位特異性；肌腱勁度與橫截面積增加', when: '骨骼適應慢，常需 6 個月以上' },
];

export const M1_PRACTICE = [
  {
    question: '籃球員進行「6 秒全力衝刺」的反覆訓練，目的是發展磷酸原系統。下列組間休息最符合 NSCA 建議？',
    options: ['6 秒（W:R 1:1）', '18–30 秒（W:R 1:3–1:5）', '72–120 秒（W:R 1:12–1:20）', '6 分鐘以上'],
    answer: 2,
    explain: '磷酸原系統的 W:R 為 1:12–1:20，6 秒 × 12–20 = 72–120 秒，才能讓大部分磷酸肌酸回補、維持每趟的輸出品質。休息太短會讓訓練轉向糖解系統，變成另一種刺激。',
  },
  {
    question: '一名 400 米選手最後 100 米明顯減速。下列何者是最主要的生理原因？',
    options: ['乳酸分子本身毒害肌肉', '快速糖解產生的氫離子累積，使肌肉酸化、抑制 PFK 與鈣離子結合', '肌肝醣在 50 秒內完全耗盡', '有氧系統完全停止供能'],
    answer: 1,
    explain: '約 45–60 秒的全力跑以快速糖解為主，H⁺ 累積與無機磷上升才是疲勞主因；乳酸本身可被再利用。50 秒遠不足以耗盡肌肝醣，有氧系統在此時反而約貢獻三到四成能量。',
  },
  {
    question: '運動員做 10 趟 6 秒全力衝刺、每趟間休息 30 秒。隨著趟數增加，能量供應最可能出現什麼變化？',
    options: ['糖解系統貢獻比例越來越高', '有氧系統貢獻比例逐漸上升，磷酸原與糖解輸出下降', '磷酸肌酸每次都完全回補，輸出不變', '三大系統比例維持不變'],
    answer: 1,
    explain: '休息 30 秒不足以讓 PCr 完全回補，後段糖解的 ATP 產量也明顯下降（Gaitanos 1993），因此有氧系統的相對貢獻上升——這正是「有氧能力影響反覆衝刺能力」的原因。',
  },
];

// ── Module 2 ─────────────────────────────────────────────────────────────

export const NEEDS_ANALYSIS = [
  { area: '生理需求', ask: '主要能量系統？比賽時間、動作強度與休息比？', basketball: '間歇型：磷酸原／糖解負責衝刺跳躍，有氧負責回補；需最大肌力、爆發力與反覆衝刺能力' },
  { area: '生物力學需求', ask: '主要關節動作、運動面、發力方向、肌肉收縮型態？', basketball: '垂直起跳（三關節伸展）、急停變向（額狀面與離心減速）、單腳著地、身體對抗' },
  { area: '傷害風險', ask: '最常受傷的部位與機轉？運動員過去傷史？', basketball: '踝扭傷、前十字韌帶（著地膝內夾）、髕腱病變、膕旁肌拉傷 → 著地技術、單腳穩定、北歐腿彎舉' },
  { area: '運動員評估', ask: '訓練年資、技術水準、目前肌力測驗、賽季時間？', basketball: '依 1RM 或 3–5RM 推估負荷；確認賽季位置（季前、季中）再決定訓練量' },
];

export const GOAL_VARIABLES = [
  { goal: '最大肌力', load: '≥85%', reps: '≤6', sets: '2–6', rest: '2–5 分鐘', rpe: 'RPE 8–9.5（RIR 0.5–2）' },
  { goal: '爆發力（單次）', load: '80–90%', reps: '1–2', sets: '3–5', rest: '2–5 分鐘', rpe: '追求最大速度，不做到力竭' },
  { goal: '爆發力（多次）', load: '75–85%', reps: '3–5', sets: '3–5', rest: '2–5 分鐘', rpe: '速度下降即停組' },
  { goal: '肌肥大', load: '67–85%', reps: '6–12', sets: '3–6', rest: '30 秒–1.5 分鐘', rpe: 'RPE 7–9（RIR 1–3）' },
  { goal: '肌耐力', load: '≤67%', reps: '≥12', sets: '2–3', rest: '≤30 秒', rpe: 'RPE 6–8' },
];

export const FREQUENCY = [
  { level: '初學者（< 2 個月）', freq: '每週 2–3 次', note: '全身性課表，每個肌群間隔至少 1 天' },
  { level: '中階（2–6 個月）', freq: '每週 3–4 次', note: '可採上下半身分化' },
  { level: '進階（> 1 年）', freq: '每週 4–7 次', note: '分化課表、同日多課；需監控疲勞' },
];

export const PERIODIZATION = [
  { period: '準備期', phase: '肌肥大／肌耐力期', intensity: '低到中（50–75%）', volume: '高：3–6 組 × 10–20 次', aim: '建立肌肉量、結締組織與工作能力（Bompa 的「解剖適應」屬此期最前段）' },
  { period: '準備期', phase: '基礎肌力期', intensity: '高（80–90%）', volume: '中：3–5 組 × 4–8 次', aim: '提升主要肌群最大肌力' },
  { period: '第一轉換期', phase: '肌力／爆發力期', intensity: '高（75–95%；爆發動作依目標）', volume: '低：3–5 組 × 2–5 次', aim: '把最大肌力轉換為爆發力與專項速度' },
  { period: '比賽期', phase: '巔峰或維持', intensity: '巔峰 ≥93%／維持 80–85%', volume: '巔峰 1–3 組 × 1–3 次／維持 2–3 組 × 6–8 次', aim: '在比賽日達到最佳狀態，或在長賽季維持能力' },
  { period: '第二轉換期', phase: '主動休息', intensity: '低、娛樂性', volume: '低', aim: '身心恢復（約 1–4 週），避免完全停練' },
];

export const SESSION_ORDER = [
  { step: '0', what: '熱身（RAMP）', why: '提高體溫、活動關節、激活並逐步增強神經徵召', example: '慢跑、迷你彈力帶、動態伸展、漸進跳躍' },
  { step: '1', what: '爆發力動作', why: '最需要速度與技術，疲勞會破壞動作品質並增加風險', example: '爆發上膊、跳箱、藥球拋' },
  { step: '2', what: '多關節主項（核心動作）', why: '大重量、多肌群，是肌力進步的主角', example: '背蹲舉、臥推、硬舉' },
  { step: '3', what: '單關節／輔助動作', why: '補強弱點、平衡肌群、預防傷害', example: '北歐腿彎舉、划船、提踵' },
  { step: '4', what: '核心穩定／能量系統', why: '核心太早疲勞會削弱主項的軀幹穩定', example: 'Pallof 抗旋轉、棒式、衝刺間歇' },
];

export const BASKETBALL_PLAN = [
  { day: 'Day 1 下肢爆發＋肌力', move: '跳箱（Box Jump）', w1: '3×3', w2: '4×3', w3: '4×3', w4: '2×3', rest: '90 秒' },
  { day: 'Day 1 下肢爆發＋肌力', move: '爆發上膊（Power Clean）', w1: '4×3 @75%', w2: '4×3 @80%', w3: '5×2 @85%', w4: '3×2 @75%', rest: '2–3 分' },
  { day: 'Day 1 下肢爆發＋肌力', move: '背蹲舉（Back Squat）', w1: '4×4 @82%', w2: '4×3 @85%', w3: '4×2 @90%', w4: '2×3 @75%', rest: '3–4 分' },
  { day: 'Day 1 下肢爆發＋肌力', move: '羅馬尼亞硬舉（RDL）', w1: '3×5 @70%', w2: '3×5 @72%', w3: '3×4 @75%', w4: '2×5 @65%', rest: '2 分' },
  { day: 'Day 1 下肢爆發＋肌力', move: '北歐腿彎舉（Nordic Curl）', w1: '3×4', w2: '3×5', w3: '3×5', w4: '2×4', rest: '90 秒' },
  { day: 'Day 2 上肢肌力＋爆發', move: '藥球胸推拋（3–5 kg）', w1: '3×5', w2: '4×5', w3: '4×4', w4: '2×4', rest: '90 秒' },
  { day: 'Day 2 上肢肌力＋爆發', move: '臥推（Bench Press）', w1: '4×4 @82%', w2: '4×3 @85%', w3: '4×2 @90%', w4: '2×3 @75%', rest: '3 分' },
  { day: 'Day 2 上肢肌力＋爆發', move: '借力推舉（Push Press）', w1: '3×4 @70%', w2: '3×3 @75%', w3: '4×3 @80%', w4: '2×3 @70%', rest: '2–3 分' },
  { day: 'Day 2 上肢肌力＋爆發', move: '負重引體向上', w1: '4×5 RPE 8', w2: '4×4 RPE 8', w3: '4×3 RPE 8.5', w4: '2×4 RPE 7', rest: '2–3 分' },
  { day: 'Day 2 上肢肌力＋爆發', move: '單臂啞鈴划船', w1: '3×6', w2: '3×6', w3: '3×5', w4: '2×6', rest: '90 秒' },
  { day: 'Day 3 全身爆發', move: '懸垂上膊（Hang Clean）', w1: '4×3 @70%', w2: '4×3 @75%', w3: '5×2 @80%', w4: '3×2 @70%', rest: '2 分' },
  { day: 'Day 3 全身爆發', move: '六角槓跳躍（約 30% 1RM）', w1: '4×3', w2: '4×3', w3: '5×3', w4: '3×3', rest: '2 分' },
  { day: 'Day 3 全身爆發', move: '前蹲舉（Front Squat）', w1: '3×3 @80%', w2: '3×3 @82%', w3: '3×2 @87%', w4: '2×3 @70%', rest: '3 分' },
  { day: 'Day 3 全身爆發', move: '側向單腳跳（Lateral Bound）', w1: '3×4/側', w2: '3×5/側', w3: '4×4/側', w4: '2×4/側', rest: '60–90 秒' },
  { day: 'Day 3 全身爆發', move: 'Pallof 抗旋轉推', w1: '3×10/側', w2: '3×10/側', w3: '3×12/側', w4: '2×10/側', rest: '45 秒' },
];

export const PLAN_LOGIC = [
  '定位：第一轉換期銜接在基礎肌力期之後、比賽期之前，目標是把已建立的最大肌力「轉換」為爆發力——因此主項強度逐週上升（82% → 85% → 90%），總反覆次數逐週下降（16 → 12 → 8 次）。',
  '每次課都遵守「爆發力 → 多關節主項 → 輔助 → 核心」：上膊與跳躍放在最前面，以神經最新鮮的狀態追求最大速度。',
  '第 4 週為減量週：強度降至 70–75%、訓練量減少約 40–50%，讓疲勞消散、爆發力顯現，銜接比賽期。',
  '每週 3 次、間隔至少 48 小時；下肢大重量日不排在球隊高強度對抗或比賽前一天。跳躍接觸次數刻意偏低，因為球隊練習本身已有大量跳躍。',
  '北歐腿彎舉、單腳側向跳與抗旋轉核心對應籃球最常見的膕旁肌拉傷、踝扭傷與前十字韌帶風險；含北歐腿彎舉的預防方案可使膕旁肌傷害風險約下降一半（Al Attar 2017）。',
  '%1RM 以各動作自己的 1RM 計算（借力推舉以借力推舉的 1RM）；若沒有測驗資料，可用 3–5RM 推估，或以 RPE 8 作為起始自動調節。',
];

// ── Module 3 ─────────────────────────────────────────────────────────────

export const SQUAT_SCREEN = [
  { cause: '踝背屈不足', test: '膝碰牆測試（約 10 公分以下視為受限）；腳跟墊高 1–2 公分後深度明顯改善', fix: '小腿與比目魚肌伸展、踝關節鬆動；短期可墊高腳跟或換舉重鞋' },
  { cause: '髖屈曲／髖關節活動度受限', test: '仰臥被動抱膝屈髖角度不足、站距加寬或腳尖外轉後才蹲得下', fix: '90/90 髖伸展、蛙式伸展；調整站距與腳尖角度' },
  { cause: '穩定度／動作控制不足', test: '躺著屈髖屈膝角度正常，但站立蹲不下；抱壺鈴（高腳杯深蹲）後反而蹲得更深', fix: '高腳杯深蹲、箱上蹲、死蟲式等核心控制，而非一味伸展' },
];

export const RAMP = [
  { stage: 'R｜Raise 提升', aim: '提高體溫、心率、血流與肌肉溫度', example: '慢跑、跳繩、敏捷梯、側併步（約 5 分鐘）' },
  { stage: 'A｜Activate 激活', aim: '喚醒當天主要肌群（臀肌、核心、肩胛周圍）', example: '迷你彈力帶側走、臀橋、死蟲式、彈力帶拉開' },
  { stage: 'M｜Mobilise 動態活動', aim: '在當天要用到的關節活動範圍內動態伸展', example: '世界最偉大伸展、弓步轉體、髖關節 90/90、胸椎旋轉' },
  { stage: 'P｜Potentiate 增強', aim: '逐步提高強度與速度，讓神經系統準備好主訓練', example: '漸進加速跑、低強度跳躍、空槓 → 工作重量的熱身組' },
];

export const TECHNIQUE = [
  { move: '背蹲舉', pattern: '下肢推', setup: '槓置於上斜方肌（高槓）或後三角肌（低槓），雙腳約與肩同寬、腳尖微外', key: '吸氣撐腹壓 → 髖膝同時屈曲 → 膝蓋沿腳尖方向前移 → 下到大腿至少與地面平行 → 中足推地站起', breathe: '下蹲前吸氣閉氣，過黏滯點後吐氣' },
  { move: '前蹲舉', pattern: '下肢推', setup: '槓置於前三角肌與鎖骨上，手肘抬高（前架式），軀幹比背蹲更直', key: '手肘向前上撐住、垂直下蹲；比背蹲更依賴股四頭肌與上背伸展', breathe: '同背蹲；手肘掉下會讓槓前滑' },
  { move: '分腿蹲', pattern: '下肢推（單腳）', setup: '前後腳約一大步距、髖寬站立，後腳腳跟離地', key: '垂直下沉、後膝接近地面、前膝穩定對準腳尖；軀幹微前傾', breathe: '下沉吸氣，站起吐氣' },
  { move: '傳統硬舉', pattern: '下肢拉（鉸鏈）', setup: '槓在腳掌中央上方、握距在小腿外側、肩胛位於槓正上方', key: '推地站起、槓貼腿上滑、髖膝同時伸展、頂端臀部夾緊站直不後仰', breathe: '起拉前吸氣撐腹壓，頂端換氣（詳見講義）' },
  { move: '相撲硬舉', pattern: '下肢拉（鉸鏈）', setup: '寬站距、腳尖外轉 30–45°，雙手握在雙腿內側', key: '膝蓋對準腳尖向外推、軀幹較直、髖較接近槓；移動距離較短', breathe: '同傳統硬舉' },
  { move: '羅馬尼亞硬舉（RDL）', pattern: '下肢拉（鉸鏈）', setup: '從站姿開始，膝微屈約 15–20° 並固定', key: '髖向後推、槓沿大腿下滑至膝下或膕旁肌拉緊處，脊椎中立；強調膕旁肌離心', breathe: '下放吸氣閉氣，回站吐氣' },
  { move: '臥推', pattern: '上肢水平推', setup: '五點接觸：頭、上背與肩、臀部貼凳，雙腳平踩地面；肩胛後收下壓', key: '槓下放至乳頭線附近、前臂垂直地面、手肘約與軀幹 45–70°；推回時槓微向肩上方移動', breathe: '下放吸氣，推過黏滯點吐氣' },
  { move: '軍事推舉', pattern: '上肢垂直推', setup: '站姿、雙腳髖寬，槓在前肩，握距略寬於肩，臀與腹部收緊', key: '頭稍後讓槓直線上行 → 槓過額頭後頭回到中立 → 鎖定時槓在中足正上方，避免下背過度後仰', breathe: '推前吸氣撐腹壓，上推過程吐氣' },
  { move: '槓鈴划船', pattern: '上肢水平拉', setup: '髖鉸鏈前傾約 45° 或更低、脊椎中立、膝微屈', key: '肩胛先後收，再把槓拉向下胸至上腹，軀幹角度固定不晃', breathe: '拉起時吐氣或短暫閉氣，下放吸氣' },
  { move: '引體向上', pattern: '上肢垂直拉', setup: '正握略寬於肩，完全懸垂，肋骨收住、雙腿略向前', key: '肩胛先下壓 → 手肘往口袋方向拉 → 下巴過槓 → 控制下放至完全伸直', breathe: '上拉吐氣，下放吸氣' },
];

export const CLEAN_PHASES = [
  { phase: '1. 起始姿勢', key: '雙腳髖寬、槓在中足上方、鉤握（Hook grip）、肩在槓前方、背部中立、手臂伸直' },
  { phase: '2. 第一拉', key: '槓從地面到膝上：膝向後讓路、背角保持不變、槓貼近脛骨' },
  { phase: '3. 過渡（Scoop／二次屈膝）', key: '槓過膝後膝蓋重新前移到槓下，軀幹接近直立，進入最有力的「力量位置」' },
  { phase: '4. 第二拉（Triple Extension）', key: '髖、膝、踝三關節同時爆發伸展，接著聳肩；手臂此時仍是放鬆的「繩子」' },
  { phase: '5. 接槓（Catch）', key: '快速向下鑽、手肘向前翻轉，槓落在前三角肌與鎖骨上；以四分之一蹲、膝髖微屈吸收力量' },
  { phase: '6. 站起', key: '穩定後站直、槓在控制中放回；懸垂上膊（Hang Clean）從大腿中段開始，省略第一拉、專練第二拉' },
];

export const PLYO = [
  { tool: '跳躍訓練（Plyometrics）', ladder: '低：原地雙腳跳、跳繩 → 中：跳箱、立定跳遠 → 高：深跳、單腳跳', dose: '每次課接觸次數：初學 80–100、中階 100–120、進階 120–140；同部位間隔 48–72 小時', safety: '先學會安靜、膝對腳尖的著地；深跳等高強度動作需具備良好的肌力基礎' },
  { tool: '藥球', ladder: '胸推拋 → 過頭後拋 → 旋轉側拋 → 單腳／移動中拋擲', dose: '3–5 組 × 3–6 次，每次全力、組間完全恢復', safety: '對牆或空曠處拋擲，球重以不影響速度為原則（約 2–6 kg）' },
  { tool: '彈力繩', ladder: '阻力衝刺／跳躍（增加負荷）、輔助跳躍（超速訓練）、加在槓鈴上（可變阻力）', dose: '依動作目的；加在槓鈴上時多用於爆發力或速度日', safety: '每次使用前檢查破損、確認固定點穩固' },
];

export const DEADLIFT_HANDOUT = [
  {
    title: '1. 起始設定（Setup）黃金標準',
    points: [
      '站位：雙腳約髖寬，腳尖微外轉；槓鈴位於「腳掌中央」正上方（由上往下看，槓約離脛骨 2–3 公分）。',
      '握槓：雙手握在小腿外側，手臂垂直；可用正握、正反握或鉤握（大重量時正反握需左右交替以免不平衡）。',
      '下抓：屈髖屈膝直到脛骨輕碰槓，髖高於膝、低於肩；肩胛位於槓正上方或略前，手臂伸直不彎曲。',
      '脊椎：從頭到骨盆保持中立，眼睛看前下方 1.5–2 公尺；肩胛下壓、「把腋下夾緊」讓背闊肌鎖住槓。',
      '預先拉緊（Take the slack out）：在離地前把槓往上拉到「槓與槓片卡住」的程度，全身繃緊後才發力。',
    ],
  },
  {
    title: '2. 拉起與鎖定（Lockout）發力要領',
    points: [
      '思考「推地」而不是「拉槓」：用雙腿把地板推開，背只負責維持姿勢、傳遞力量。',
      '離地到膝蓋：膝與髖同步伸展、背角維持不變；槓沿脛骨直線上升，肩不要比髖先抬起。',
      '過膝之後：髖向前推、臀大肌發力把身體帶到直立，槓持續貼著大腿。',
      '鎖定：髖膝完全伸展、肩胛位於髖正上方、臀部收緊；不要後仰過伸、不要聳肩或屈肘「扛」槓。',
      '下放：反向動作——先推髖向後，槓過膝後再屈膝；全程控制，不讓槓鈴自由落下或背部彎曲。',
    ],
  },
  {
    title: '3. 呼吸與腹壓（Valsalva maneuver）控制',
    points: [
      '吸氣：在起始位置（或站立時）深吸一口氣，讓肚子、兩側與下背 360° 向外撐開，而不是只抬胸。',
      '閉氣撐腹：聲門關閉、腹壁像「準備被打一拳」般繃緊，提高腹內壓、增加軀幹剛性，保護脊椎。',
      '何時吐氣：完成拉起並通過黏滯點後再吐氣，或在頂端鎖定時換氣；多次反覆時每下在頂端重新吸氣撐腹。',
      '舉重腰帶：提供腹壁「往外推」的觸覺回饋，適用於接近最大重量時，不能取代自身的腹壓技巧。',
      '安全限制：重訓時閉氣可使動脈壓短暫超過 300 mmHg；高血壓未控制、心血管疾病、青光眼、疝氣、懷孕或頭暈史者，應改為不閉氣、在用力時緩慢吐氣，並降低負荷。',
    ],
  },
];

export const DEADLIFT_CHECKLIST = ['槓在中足上方', '握距在小腿外側、手臂伸直', '肩胛在槓上方、脊椎中立', '預先拉緊後才離地', '槓全程貼身、路徑垂直', '髖膝同時鎖定、不後仰', '下放先推髖再屈膝', '吸氣撐腹 → 黏滯點後吐氣'];

// ── Module 4 ─────────────────────────────────────────────────────────────

export const CUE_TYPES = [
  { type: '內部提示（Internal）', define: '把注意力放在身體部位或肌肉', example: '「夾緊你的背」、「臀部用力」、「膝蓋往外」', when: '初學時建立身體覺察、復健或個別肌群激活' },
  { type: '外部提示（External）', define: '把注意力放在動作對環境或器材造成的效果', example: '「把地面踩穿」、「把地板往外撕開」、「把槓彎斷」', when: '大多數技術學習與表現情境（研究支持度較高）' },
  { type: '類比提示（Analogy）', define: '用運動員熟悉的畫面代替技術語言', example: '「像跳上高處一樣爆發」、「像關車門一樣用髖把門推上」', when: '複雜動作、年輕運動員' },
];

export const CUE_RULES = [
  '一次只改一件事：先改最危險、最影響動作的那個錯誤。',
  '口令越短越好（3–5 個字），用動詞開頭：「推地」「貼腿」「撐開」。',
  '口令在動作前給（準備時），動作中只給極短關鍵字；動作後再給一句回饋。',
  '回饋頻率隨進步遞減，讓運動員學會自我察覺；用「先肯定 → 一個修正 → 鼓勵」的三明治回饋。',
  '口令要搭配示範與觀察角度：深蹲看側面與正面、硬舉看側面、臥推看頭側與側面。',
];

export const ERROR_TABLE = [
  { lift: '蹲舉', error: '膝蓋內夾（Knee Valgus）', see: '起身時膝蓋往內靠、足弓塌陷', cause: '臀中肌／外旋肌無力、踝背屈受限、重量過重', cue: '「把地板往外撕開」' },
  { lift: '蹲舉', error: '屁股眨眼（Butt Wink）', see: '蹲到底時骨盆後傾、下背變圓', cause: '髖屈曲或踝活動度不足、腹壓流失、蹲得比自身控制範圍更深', cue: '「蹲到箱子就停」（以箱子控制深度）' },
  { lift: '蹲舉', error: '重心前傾（早安式起身）', see: '起身時髖比肩先上升、槓鈴往前', cause: '股四頭肌相對無力、上背鬆、腹壓不足', cue: '「先把槓推向天花板」' },
  { lift: '硬舉', error: '圓背下背代償', see: '離地或過膝時腰椎屈曲', cause: '髖鉸鏈模式不熟、膕旁肌太緊導致起始過低、背闊肌未鎖、重量過重', cue: '「把胸前的字給前面的人看」' },
  { lift: '硬舉', error: '槓鈴遠離身體', see: '槓鈴往前飄、繞過膝蓋', cause: '背闊肌未收緊、起始槓位太前', cue: '「讓槓刮過你的褲子」' },
  { lift: '硬舉', error: '膝關節提早鎖定', see: '離地時膝先伸直、髖高翹，變成直腿硬舉', cause: '股四頭肌出力不足、起始髖太低（想「蹲」起來）', cue: '「推地、讓胸和臀一起上來」' },
  { lift: '臥推', error: '肩胛未收穩', see: '肩膀在下放時往前滾、上背貼不住凳', cause: '起始設定不完整、上背無力', cue: '「把凳子夾在兩片肩胛骨中間」' },
  { lift: '臥推', error: '手肘過度外展（Flare out）', see: '上臂與軀幹接近 90°', cause: '握距過寬、習慣以胸代償、三頭肌弱', cue: '「把槓往腳的方向折彎」' },
  { lift: '臥推', error: '聳肩', see: '推起時肩膀往耳朵靠', cause: '肩胛未下壓、上斜方肌代償、重量過重', cue: '「把自己推離槓、遠離槓鈴」' },
];

export const REGRESSIONS = [
  { lift: '傳統硬舉', up: '赤字硬舉（站高台）', r1: '架高硬舉／六角槓硬舉', r2: '壺鈴硬舉', r3: '木棍髖鉸鏈（三點貼棍）' },
  { lift: '背蹲舉', up: '暫停蹲、前蹲舉', r1: '高腳杯深蹲', r2: '高腳杯箱上蹲', r3: '懸吊帶（TRX）輔助深蹲' },
  { lift: '臥推', up: '暫停臥推、窄握臥推', r1: '啞鈴地板臥推', r2: '伏地挺身', r3: '上斜伏地挺身' },
  { lift: '引體向上', up: '負重引體向上', r1: '彈力帶輔助引體', r2: '離心引體（慢放 3–5 秒）', r3: '反向划船（懸吊帶或槓）' },
  { lift: '爆發上膊', up: '蹲式上膊（Squat Clean）', r1: '懸垂上膊（大腿中段）', r2: '上膊高拉（Clean High Pull）', r3: '跳躍聳肩（Jump Shrug）' },
  { lift: '軍事推舉', up: '借力推舉（Push Press）', r1: '站姿啞鈴推舉', r2: '半跪姿單臂壺鈴推舉', r3: '地雷管推舉（Landmine Press）' },
];

export const SPOTTING = [
  { lift: '臥推', where: '站在凳的頭側、雙腳穩站、膝微屈', grip: '正反握（一手正握一手反握），握在運動員握距內側', when: '協助出架（聽口令）；全程雙手跟隨槓不碰槓，槓停滯或下滑時立即接手', talk: '先約定次數與「出架、還架」口令' },
  { lift: '深蹲', where: '站在運動員正後方、緊貼但不干擾動作', grip: '雙手靠近運動員軀幹或髖部兩側，跟著一起下蹲；重量大時改兩側保護（各守一端）並設安全槓', when: '起身停滯、軀幹前傾失控時，抱住軀幹協助站回並把槓放回架上', talk: '確認是否需協助出架與還架' },
  { lift: '過頭推舉（坐姿／站姿）', where: '站在運動員正後方（站姿時保護者可能需站上穩固平台以達適當高度）', grip: '槓鈴：正反握跟隨槓；啞鈴：扶在手腕附近（不是手肘或上臂）', when: '推起停滯或手臂偏離垂直線時協助', talk: '提醒運動員失敗時「往前放下」而不是往後' },
  { lift: '爆發力動作（上膊、抓舉）', where: '不做人工保護；確保舉重台與周圍淨空、使用包膠槓片', grip: '—', when: '失敗時運動員自行棄槓：上膊把槓往前推、身體往後退；抓舉向前推槓或向後丟並往前移', talk: '教學時先練棄槓動作，讓運動員「敢放手」' },
];

export const M4_COMPARE = [
  {
    error: '深蹲膝蓋內夾',
    cause: '髖外展／外旋肌（臀中肌、臀大肌）肌力或激活不足；踝背屈受限造成足弓塌陷、脛骨內旋；內收肌主導；疲勞或重量過重使動作控制瓦解。',
    cue: '「把地板往外撕開」、「膝蓋對準第二、三腳趾的方向」',
    step1: '迷你彈力帶套膝上做高腳杯箱上蹲：彈力帶把膝往內拉，運動員必須主動對抗（反應性神經肌肉訓練），3×8、慢速離心 3 秒。',
    step2: '移除彈力帶、保留高腳杯深蹲至可控制深度，確認膝蓋軌跡穩定後，再回到減重 20–30% 的槓鈴背蹲。',
  },
  {
    error: '硬舉圓背',
    cause: '髖鉸鏈模式未建立（用彎腰代替屈髖）；膕旁肌柔軟度或髖活動度不足，導致起始高度低於能維持中立的位置；背闊肌與腹壓未鎖緊；重量超過技術能力。',
    cue: '「推地板」、「讓槓刮過你的褲子」、「把胸前的字給前面的人看」',
    step1: '木棍髖鉸鏈：木棍貼背，頭、上背、薦骨三點始終接觸，學會「屁股往後推」的動作，3×8。',
    step2: '架高硬舉或壺鈴硬舉：將起始高度提高到膝下，在能維持中立脊椎的範圍內拉，之後每週逐步降低高度回到地面。',
  },
  {
    error: '臥推聳肩',
    cause: '起始時肩胛未後收下壓；上斜方肌代償；胸椎伸展不足使上背無法形成穩定平台；握距或重量不當、疲勞。',
    cue: '「把自己推離槓」、「把槓往腳的方向折彎」',
    step1: '肩胛控制：伏地挺身加強版（Push-up Plus）與彈力帶直臂下壓，練習肩胛「下壓、後收」的位置感，2–3×10。',
    step2: '啞鈴地板臥推：地板限制活動範圍、提供上背觸覺回饋，在不聳肩的狀況下推 3×8，再回到輕重量的暫停臥推。',
  },
];

// ── Module 5 ─────────────────────────────────────────────────────────────

export const MACROS = [
  { nutrient: '醣類', daily: '依訓練量 3–5（輕）、5–7（中，約 1 小時／天）、6–10（高，1–3 小時／天）g/kg', before: '訓練前 1–4 小時攝取 1–4 g/kg', after: '兩次訓練間隔 <8 小時才需積極補：前 4 小時每小時 1.0–1.2 g/kg', src: 'THOMAS2016' },
  { nutrient: '蛋白質', daily: '1.4–2.0 g/kg（減脂期可更高）', before: '可於訓練前後各一餐，每餐 0.25–0.4 g/kg（約 20–40 g）', after: '每 3–4 小時一份；睡前 30–40 g 酪蛋白有助夜間合成', src: 'JAGER2017' },
  { nutrient: '脂肪', daily: '占總熱量 20–35%，不建議長期低於 20%', before: '訓練前避免高脂大餐（延緩胃排空）', after: '無特殊時機需求，以總量與品質為主', src: 'THOMAS2016' },
];

export const HYDRATION = [
  { when: '訓練前', what: '至少 4 小時前喝 5–7 mL/kg；若無尿或尿色深，2 小時前再加 3–5 mL/kg' },
  { when: '訓練中', what: '目標是避免體重下降超過 2%；長時間大量流汗選含鈉運動飲料' },
  { when: '訓練後', what: '每減少 1 kg 體重補充 1.25–1.5 L 液體，並同時補鈉（餐食或飲料）' },
  { when: '注意', what: '喝水過量、超過流汗量可能造成低血鈉；尿色淡黃是簡單的監測方式' },
];

export const SUPPLEMENTS = [
  { name: '肌酸（一水肌酸）', dose: '載入：0.3 g/kg/天（約 20 g 分 4 次）× 5–7 天，之後 3–5 g/天；或直接每天 3–5 g、約 4 週達飽和', effect: '提升高強度反覆輸出、最大肌力與去脂體重', note: '體重可能增加 1–2 kg（水分）；健康成人長期使用安全性佳', src: 'KREIDER2017' },
  { name: '咖啡因', dose: '運動前約 60 分鐘 3–6 mg/kg；超過 9 mg/kg 未見額外益處', effect: '提升肌耐力、爆發輸出與專注', note: '個體差異大；影響睡眠、心悸焦慮；晚間訓練慎用', src: 'GUEST2021' },
  { name: '乳清蛋白', dose: '每次 20–40 g（含白胺酸約 2–3 g）', effect: '方便補足每日蛋白質，消化吸收快', note: '是食物的替代而非魔法；總量達標比品牌或時機重要', src: 'JAGER2017' },
];

export const PRACTICAL_FLOW = [
  { time: '0:00–0:30', step: '說｜開場', do: '自我介紹、確認運動員身體狀況與熱身、說明今天的動作' },
  { time: '0:30–1:30', step: '說｜目的', do: '動作目的、主要肌群與運動面（一句話講完）' },
  { time: '1:30–3:00', step: '示｜示範', do: '側面與正面各示範 1–2 次，邊做邊講 3 個關鍵點' },
  { time: '3:00–6:00', step: '做｜操作', do: '運動員執行；教練從前、側、後觀察，每組只給一個外部口令' },
  { time: '6:00–8:00', step: '修｜修正', do: '指出錯誤 → 解釋原因 → 口令修正；無效則立即退階，表現佳則說明進階' },
  { time: '8:00–9:00', step: '護｜保護', do: '示範正確保護位置、手勢、介入時機與溝通口令' },
  { time: '9:00–10:00', step: '結｜總結', do: '用 3 個重點總結並回應考官提問' },
];

export const RANDOM_MOVE_FRAME = ['目的（練什麼、哪個運動面）', '起始設定（腳、手、脊椎）', '執行（關節順序、路徑）', '呼吸與腹壓', '常見錯誤＋口令', '退階／進階', '安全與保護'];

export const MOCK_EXAM = [
  { q: '側平舉主要發生在哪一個運動面？', options: ['矢狀面', '額狀面', '水平面', '斜面'], answer: 1, explain: '肩外展屬於額狀面，繞前後向（矢狀）軸轉動。' },
  { q: '提踵（站姿小腿上提）通常被歸類為哪一類槓桿？', options: ['第一類', '第二類', '第三類', '不屬於槓桿'], answer: 1, explain: '支點在蹠趾關節、阻力（體重）在中間、小腿肌施力在腳跟後方，屬第二類槓桿。' },
  { q: '初學者訓練前 6–8 週肌力快速進步，最主要的原因是？', options: ['肌纖維數量增加', '神經適應', '肌纖維由 I 型轉 II 型', '骨質密度上升'], answer: 1, explain: '早期進步主要來自運動單位徵召、發射頻率與協調改善；肌肥大在之後才逐漸占較大比重。' },
  { q: '以「快速糖解」為主要目標的 30 秒全力間歇，NSCA 建議的運動休息比為？', options: ['1:1–1:3', '1:3–1:5', '1:12–1:20', '1:30'], answer: 1, explain: '快速糖解（約 15–30 秒）建議 1:3–1:5；1:12–1:20 為磷酸原系統。' },
  { q: '某選手背蹲舉 5RM 為 100 kg，依 NSCA %1RM 對照表（5 次約 87% 1RM），推估 1RM 約為？', options: ['105 kg', '115 kg', '125 kg', '135 kg'], answer: 1, explain: '100 ÷ 0.87 ≈ 115 kg。' },
  { q: '臥推 4 組 × 5 次 × 80 kg，訓練量負荷（Volume load）為？', options: ['400 kg', '1,600 kg', '2,000 kg', '320 kg'], answer: 1, explain: '組數 × 次數 × 重量 = 4 × 5 × 80 = 1,600 kg。' },
  { q: '以肌肥大為目標，下列哪一組變數最符合 NSCA 建議？', options: ['90% × 3 次 × 5 組、休 4 分', '75% × 10 次 × 4 組、休 60–90 秒', '50% × 25 次 × 2 組、休 20 秒', '85% × 2 次 × 3 組、休 3 分（追求速度）'], answer: 1, explain: '肌肥大：67–85%、6–12 次、3–6 組、休 30 秒–1.5 分。' },
  { q: '單次訓練課中，下列動作排序何者最合理？', options: ['臥推 → 爆發上膊 → 二頭彎舉 → 棒式', '爆發上膊 → 背蹲舉 → 北歐腿彎舉 → 抗旋轉核心', '棒式 → 背蹲舉 → 爆發上膊 → 提踵', '二頭彎舉 → 臥推 → 爆發上膊 → 深蹲'], answer: 1, explain: '爆發力 → 多關節主項 → 單關節輔助 → 核心。' },
  { q: 'NSCA 傳統週期化中，「第一轉換期」的主要訓練階段是？', options: ['肌肥大／肌耐力期', '基礎肌力期', '肌力／爆發力期', '主動休息'], answer: 2, explain: '準備期包含肌肥大／肌耐力期與基礎肌力期；第一轉換期為肌力／爆發力期；第二轉換期為主動休息。' },
  { q: 'RAMP 熱身中的「P」代表？', options: ['Prepare 準備', 'Potentiate 增強', 'Prevent 預防', 'Power 爆發'], answer: 1, explain: 'Raise、Activate & Mobilise、Potentiate——最後階段逐步提高強度，讓神經系統準備好主訓練。' },
  { q: '爆發上膊的第二拉，主要強調哪三個關節同時伸展？', options: ['肩、肘、腕', '髖、膝、踝', '腰椎、胸椎、頸椎', '髖、肩、肘'], answer: 1, explain: 'Triple Extension：髖、膝、踝三關節爆發伸展。' },
  { q: '下列哪一個是「外部提示」？', options: ['「臀部夾緊」', '「把地板往外撕開」', '「核心收緊」', '「肩胛骨後收」'], answer: 1, explain: '外部提示把注意力放在動作對環境的效果；其餘三者都是身體部位的內部提示。' },
  { q: '關於爆發上膊的安全，下列何者正確？', options: ['應由兩位保護者站兩側接槓', '保護者站在正後方扶腰', '不做人工保護，應在舉重台上使用包膠槓片並教會棄槓', '只要重量輕就可以在一般地板上練'], answer: 2, explain: 'NSCA 建議爆發力動作不做人工保護，失敗時運動員把槓推離身體、往後退開。' },
  { q: '肌酸補充的常見實證劑量為？', options: ['每天 0.5 g', '載入 0.3 g/kg/天 × 5–7 天後每天 3–5 g', '每次訓練前 50 g', '只在比賽日服用'], answer: 1, explain: 'ISSN 立場聲明：可先載入再維持 3–5 g/天，或直接每天 3–5 g、約 4 週達飽和。' },
  { q: '訓練後體重比訓練前少 1.0 kg，建議補充多少液體？', options: ['0.5 L', '1.0 L', '1.25–1.5 L', '3 L 以上'], answer: 2, explain: '持續的尿液與汗水流失使實際需求多於流失量，建議每公斤補 1.25–1.5 L 並同時補鈉。' },
];

// ── Myths, quiz, sources ─────────────────────────────────────────────────

export const STRENGTH_MYTHS: { chapter: StrengthTab; myth: string; fact: string }[] = [
  { chapter: 'OVERVIEW', myth: '自己練得很強，就一定考得過術科。', fact: '術科同時評分「示範」與「執教」：看得出錯誤、說得出原因、給得出口令與退階、站得對保護位置，往往比自己的重量更關鍵。' },
  { chapter: 'M1_SCIENCE', myth: '乳酸是肌肉痠痛與疲勞的元兇。', fact: '乳酸約 1 小時內就被清除，還能當燃料再利用；疲勞主要與氫離子累積有關，隔天的延遲性痠痛則與肌肉微損傷和發炎有關。' },
  { chapter: 'M1_SCIENCE', myth: '力氣變大一定是因為肌肉變大。', fact: '前 6–8 週的肌力進步主要來自神經適應，所以初學者常常「力氣進步很多、外觀還沒變」。' },
  { chapter: 'M2_PROGRAM', myth: '練肌肥大組間一定要休息 60 秒以內。', fact: 'NSCA 的教科書答案是 30 秒–1.5 分，但研究顯示多關節動作休息 2–3 分鐘、維持訓練量時肌肥大效果不輸甚至更好。' },
  { chapter: 'M3_TECHNIQUE', myth: '深蹲時膝蓋絕對不能超過腳尖。', fact: '膝蓋自然前移是正常的；刻意限制膝蓋前移會讓軀幹更前傾，研究測得髖部力矩大幅增加（Fry 2003）。重點是膝蓋方向對準腳尖。' },
  { chapter: 'M4_COACHING', myth: '口令講越多越詳細，運動員越容易做對。', fact: '動作中一次只能處理一個重點；短、具體、外部導向的口令，加上示範，比一長串技術說明更有效。' },
  { chapter: 'M4_COACHING', myth: '保護者應該全程握著槓，比較安全。', fact: '保護者雙手跟隨但不碰槓，只有在槓停滯或下滑時介入；過早接手會干擾動作，也讓運動員無法判斷自己的能力。' },
  { chapter: 'M5_EXAM', myth: '訓練後 30 分鐘內沒喝蛋白，就白練了。', fact: '統合分析顯示，在每日蛋白質總量相同時，補充時機對肌力與肌肥大的影響很小；總量與分配比「黃金窗口」重要。' },
];

export const STRENGTH_QUIZ: Record<StrengthTab, { question: string; options: string[]; answer: number; explain: string }> = {
  OVERVIEW: {
    question: '依本大綱的設計，下列哪一個模組是「術科考試勝負手」？',
    options: ['模組一 運動科學', '模組二 課表設計', '模組四 執教技巧與錯誤修正', '模組五 運動營養'],
    answer: 2,
    explain: '術科不只看你做得標準，更看你能否觀察錯誤、給口令、退階與保護——這正是模組四的內容。',
  },
  M1_SCIENCE: {
    question: '硬舉時槓鈴往前飄離身體 10 公分，下背與髖部承受的負擔為什麼明顯增加？',
    options: ['槓鈴的重量變重了', '阻力臂（關節到槓鈴鉛垂線的水平距離）變長，力矩增加', '運動面從矢狀面變成水平面', '槓桿從第三類變成第一類'],
    answer: 1,
    explain: '重力永遠垂直向下，力矩 = 力 × 力臂；槓鈴離身體越遠，髖與腰椎到槓鈴重力線的水平距離越長，需要的肌力矩就越大。',
  },
  M2_PROGRAM: {
    question: '大專籃球員進入「第一轉換期」，下列哪一組主項處方最符合這個時期的目標？',
    options: ['60% × 15 次 × 4 組', '75% × 10 次 × 4 組', '85–90% × 2–3 次 × 4 組，搭配爆發上膊與跳躍', '只做專項球技，不做阻力訓練'],
    answer: 2,
    explain: '第一轉換期為肌力／爆發力期：高強度（75–95%）、低次數（2–5 次），並把肌力轉換為爆發力。',
  },
  M3_TECHNIQUE: {
    question: '一名學員站著深蹲蹲不下去，但抱著壺鈴做高腳杯深蹲時卻蹲得很深。最可能的原因是？',
    options: ['踝關節背屈嚴重受限', '髖關節結構異常', '穩定度或動作控制不足', '股四頭肌太強'],
    answer: 2,
    explain: '前方負重提供反向平衡與核心張力後就蹲得下去，代表活動度足夠，問題在穩定與控制，應優先練控制而非伸展。',
  },
  M4_COACHING: {
    question: '學員硬舉時槓鈴離身體越來越遠，下列哪一個是最合適的外部口令？',
    options: ['「背闊肌收緊」', '「讓槓刮過你的褲子」', '「臀部用力」', '「肩胛後收」'],
    answer: 1,
    explain: '「讓槓刮過褲子」把注意力放在槓鈴路徑（外部），比指揮某條肌肉更容易立即改善。',
  },
  M5_EXAM: {
    question: '一名 80 kg 的肌力型運動員，每日蛋白質攝取的建議範圍約為？',
    options: ['40–60 g', '64–80 g', '112–160 g', '240 g 以上'],
    answer: 2,
    explain: 'ISSN 建議 1.4–2.0 g/kg/天：80 × 1.4 = 112 g、80 × 2.0 = 160 g。',
  },
};

export const STRENGTH_CHAPTER_SOURCES: Record<StrengthTab, string[]> = {
  OVERVIEW: ['NSCA4', 'ACSM2009', 'SCHOENFELD2016REST'],
  M1_SCIENCE: ['NSCA4', 'GASTIN2001', 'GAITANOS1993', 'FOLLAND2007', 'SCHOENFELD2010'],
  M2_PROGRAM: ['NSCA4', 'ACSM2009', 'SCHOENFELD2016REST', 'SUCHOMEL2016', 'ALATTAR2017'],
  M3_TECHNIQUE: ['NSCA4', 'JEFFREYS2007', 'FRY2003', 'MACDOUGALL1985'],
  M4_COACHING: ['NSCA4', 'WULF2013'],
  M5_EXAM: ['THOMAS2016', 'JAGER2017', 'KERKSICK2017', 'KREIDER2017', 'GUEST2021', 'SAWKA2007', 'SCHOENFELD2013', 'CTADA'],
};
