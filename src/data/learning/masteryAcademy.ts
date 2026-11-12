import { ALL_LESSONS, LEARNING_TRACKS } from './tracks';
import type { LearningIcon, LearningTone } from '../../types/learning';
import type { LearningProgress } from '../../hooks/useLearningProgress';

/**
 * masteryAcademy.ts — Salud v6.8「從健康小白到醫學知識者」快樂成長與實作練習系統
 *
 * 將全站 8 條學習路徑、65 堂小課、300+ 個具體知識點、8 大迷人醫學學科與 12 個真實生活情境練習
 * 串聯成一套有溫度、有成就感、可實作練習的成長旅程。
 */

export interface LearnerRank {
  level: number;
  id: string;
  title_zh: string;
  title_en: string;
  badge_emoji: string;
  min_xp: number;
  tagline_zh: string;
  unlock_ability_zh: string;
  tone: LearningTone;
}

export const LEARNER_RANKS: LearnerRank[] = [
  {
    level: 1,
    id: 'RANK-1',
    title_zh: '健康好奇新手',
    title_en: 'Curious Beginner',
    badge_emoji: '🌱',
    min_xp: 0,
    tagline_zh: '健康從一個好奇的問題開始：不需醫學背景，願意聽懂身體的聲音就是最棒的第一步。',
    unlock_ability_zh: '開啟 8 條白話學習路徑與全站知識點探索地圖',
    tone: 'emerald',
  },
  {
    level: 2,
    id: 'RANK-2',
    title_zh: '身體機轉探索者',
    title_en: 'Mechanism Explorer',
    badge_emoji: '🔍',
    min_xp: 60,
    tagline_zh: '不只看結論，開始懂得問「為什麼」——看懂生命徵象儀表板，不被群組誇大標題嚇到。',
    unlock_ability_zh: '掌握基礎生理比喻、實證三問與常見養生迷思辨識力',
    tone: 'sky',
  },
  {
    level: 3,
    id: 'RANK-3',
    title_zh: '日常動吃睡實踐家',
    title_en: 'Daily Practitioner',
    badge_emoji: '🏃',
    min_xp: 180,
    tagline_zh: '把知識變成生活裡的自在節奏：餐盤 2:1:1、先求最大肌力再求肌耐力、順應生理時鐘好眠。',
    unlock_ability_zh: '將營養生化、運動力學與睡眠神經科學落實於每日微習慣',
    tone: 'amber',
  },
  {
    level: 4,
    id: 'RANK-4',
    title_zh: '家庭健康守門員',
    title_en: 'Family Health Guardian',
    badge_emoji: '🛡️',
    min_xp: 380,
    tagline_zh: '能幫自己與爸媽看懂健檢報告紅字、執行 722 居家量血壓，並精準辨識 119 急診紅旗警訊。',
    unlock_ability_zh: '具備三高慢病防護、公費癌篩規劃與就醫科別分流能力',
    tone: 'rose',
  },
  {
    level: 5,
    id: 'RANK-5',
    title_zh: '實證醫學知識者',
    title_en: 'Medical Literacy Scholar',
    badge_emoji: '🎓',
    min_xp: 680,
    tagline_zh: '融會貫通 8 大醫學學科核心原理，不僅照顧好自己，更能用溫暖白話向親友傳遞科學健康觀！',
    unlock_ability_zh: '達成全領域醫學素養精熟，能以費曼學習法向他人清楚解說機轉',
    tone: 'violet',
  },
];

export const TOTAL_KNOWLEDGE_POINTS = ALL_LESSONS.reduce(
  (sum, lesson) => sum + lesson.key_points_zh.length,
  0
);

export interface LearnerGrowthSummary {
  xp: number;
  currentRank: LearnerRank;
  nextRank: LearnerRank | null;
  progressToNextPct: number;
  xpToNext: number;
  lessonsDoneCount: number;
  totalLessonsCount: number;
  pointsMasteredCount: number;
  totalPointsCount: number;
  quizzesCorrectCount: number;
  scenariosDoneCount: number;
  totalScenariosCount: number;
  mythsDoneCount: number;
  totalMythsCount: number;
  likedDisciplinesCount: number;
}

export function calculateLearnerGrowth(
  progress: LearningProgress,
  actionPlanCount = 0
): LearnerGrowthSummary {
  const validLessonIds = new Set(ALL_LESSONS.map((l) => l.id));
  const lessonsDoneCount = progress.completed.filter((id) => validLessonIds.has(id)).length;
  const pointsMasteredCount = (progress.masteredPoints ?? []).length;
  const quizzesCorrectCount = Object.values(progress.quiz ?? {}).filter(Boolean).length;
  const scenariosDoneCount = (progress.completedScenarios ?? []).length;
  const mythsDoneCount = (progress.completedMyths ?? []).length;
  const likedDisciplinesCount = (progress.likedDisciplines ?? []).length;

  // Balanced XP formula rewarding reading, active point mastery, quizzes, scenario practice, and daily action
  const xp =
    lessonsDoneCount * 15 +
    pointsMasteredCount * 3 +
    quizzesCorrectCount * 10 +
    scenariosDoneCount * 20 +
    mythsDoneCount * 6 +
    likedDisciplinesCount * 5 +
    actionPlanCount * 8;

  let currentRank = LEARNER_RANKS[0];
  let nextRank: LearnerRank | null = LEARNER_RANKS[1];

  for (let i = 0; i < LEARNER_RANKS.length; i++) {
    if (xp >= LEARNER_RANKS[i].min_xp) {
      currentRank = LEARNER_RANKS[i];
      nextRank = LEARNER_RANKS[i + 1] ?? null;
    }
  }

  const progressToNextPct = nextRank
    ? Math.min(
        100,
        Math.round(((xp - currentRank.min_xp) / (nextRank.min_xp - currentRank.min_xp)) * 100)
      )
    : 100;

  const xpToNext = nextRank ? Math.max(0, nextRank.min_xp - xp) : 0;

  return {
    xp,
    currentRank,
    nextRank,
    progressToNextPct,
    xpToNext,
    lessonsDoneCount,
    totalLessonsCount: ALL_LESSONS.length,
    pointsMasteredCount,
    totalPointsCount: TOTAL_KNOWLEDGE_POINTS,
    quizzesCorrectCount,
    scenariosDoneCount,
    totalScenariosCount: PRACTICE_SCENARIOS.length,
    mythsDoneCount,
    totalMythsCount: MYTH_BLITZ_DECK.length,
    likedDisciplinesCount,
  };
}

// ── 8 大迷人醫學學科博覽館 (Why Medical Sciences Are Fascinating) ──────────────

export interface MedicalDiscipline {
  id: string;
  name_zh: string;
  name_en: string;
  subtitle_zh: string;
  icon: LearningIcon;
  tone: LearningTone;
  track_id: string;
  /** Why this discipline is full of wonder rather than dry memorization. */
  wonder_story_zh: string;
  /** How this science helps you in everyday life. */
  daily_superpower_zh: string;
  /** 3 core concepts that turn a beginner into an insider. */
  core_concepts_zh: string[];
  /** Hands-on simulator or deep page hash. */
  lab_link: { label_zh: string; hash: string };
  /** Starter lesson IDs in this discipline. */
  starter_lessons: string[];
}

export const MEDICAL_DISCIPLINES: MedicalDiscipline[] = [
  {
    id: 'DISC-PHYSIO',
    name_zh: '人體生理學',
    name_en: 'Human Physiology',
    subtitle_zh: '37 兆個細胞不眠不休的自動恆溫與平衡交響樂',
    icon: 'body',
    tone: 'sky',
    track_id: 'body',
    wonder_story_zh:
      '你睡覺時不用提醒自己呼吸，夏天流汗時腎臟會自動幫你把水鎖回來！你的兩顆腎臟每天要過濾高達 180 公升的原尿（相當於 9 大桶飲水機桶裝水），再精準回收 99% 的水分與養分，只排出 1.5 公升尿液。讀懂生理學，你會對自己的身體充滿敬畏與感謝。',
    daily_superpower_zh: '看懂心肺、肝腎、腸胃、神經與內分泌如何合作，不再把正常生理反應誤認為生病，也不會用極端偏方傷害器官。',
    core_concepts_zh: [
      '恆定性（Homeostasis）：身體喜歡「剛剛好」，體溫、血鈉、血糖與酸鹼度都有精密自動調節，不需靠排毒偏方。',
      '器官分工與備援：心臟是幫浦、肺臟是氣體交換站、肝臟是化工廠、腎臟是精密濾水器，彼此環環相扣。',
      '水通道蛋白（AQP2）：血液變濃 1% 時，大腦下視丘就會發出抗利尿激素訊號，通知腎臟加開水通道回收水分。',
    ],
    lab_link: { label_zh: '探索八大人體系統互動圖解', hash: 'systems' },
    starter_lessons: ['L-BODY-01', 'L-BODY-04', 'L-BODY-05'],
  },
  {
    id: 'DISC-BIOCHEM',
    name_zh: '營養與生物化學',
    name_en: 'Nutrition & Biochemistry',
    subtitle_zh: '每一口食物如何變成細胞能量、荷爾蒙與血管保護盾',
    icon: 'food',
    tone: 'emerald',
    track_id: 'eat',
    wonder_story_zh:
      '為什麼橄欖油在常溫下是液體，豬油卻是固體？在分子顯微鏡下，飽和脂肪像排得筆直的鐵釘，而單元與多元不飽和脂肪酸帶著「順式彎折角」，讓細胞膜保持柔軟有彈性！營養生化不是叫你算卡路里挨餓，而是教你為身體挑選最棒的分子建材。',
    daily_superpower_zh: '逛超市、點外食便當、在家炒菜選油時，一眼看穿「等熱量替代」「蛋白質分配」與「超加工食品」的秘密。',
    core_concepts_zh: [
      '2:1:1 餐盤與進食順序：一半蔬菜、四分之一優質蛋白、四分之一全穀雜糧，先吃菜肉再吃飯能平緩餐後血糖峰值。',
      '等熱量換油法則：把飽和脂肪換成富含單元/多元不飽和脂肪的好油（如橄欖油、芥花油），能實證降低壞膽固醇與心血管風險。',
      '酒精與 ALDH2 基因：台灣近半數人缺乏高效乙醛去氫酶，喝酒臉紅代表一級致癌物「乙醛」在體內堆積。',
    ],
    lab_link: { label_zh: '動手玩：16 種食用油換油與發煙點模擬', hash: 'O' },
    starter_lessons: ['L-EAT-01', 'L-EAT-02', 'L-EAT-04'],
  },
  {
    id: 'DISC-EXERCISE',
    name_zh: '運動生理與生物力學',
    name_en: 'Exercise Science & Biomechanics',
    subtitle_zh: '把最大肌力天花板拉高，讓粒線體與骨骼陪你上山下海',
    icon: 'move',
    tone: 'violet',
    track_id: 'move',
    wonder_story_zh:
      '肌肉不只是用來舉重的！收縮中的肌肉會直接打開 GLUT4 葡萄糖大門，不靠胰島素就把血糖吸進肌肉當燃料；而把「最大肌力」天花板拉高後，抱孫子、搬水箱、爬百岳下坡佔你最大力量的百分比大幅下降，你的「相對肌耐力」與關節安全儲備會自動翻倍！',
    daily_superpower_zh: '懂得結合 Zone 2 有氧耐力與大重量低反覆最大肌力訓練，並用「保留 2–3 下餘力（RIR 2–3）」聰明進步不鐵腿。',
    core_concepts_zh: [
      '先求最大肌力，再求肌耐力：最大肌力是所有體能的火車頭，天花板越高，日常負重就越輕鬆省力。',
      'Zone 2 有氧區間：能邊動邊講完整句子的強度，最能刺激肌肉粒線體新生與脂肪氧化效率。',
      '三大能量系統協同：10 秒衝刺靠磷化物（ATP-CP）、1 分鐘高強度靠快醣解、長程耐力與組間恢復靠有氧氧化系統。',
    ],
    lab_link: { label_zh: '體驗「天花板決定地板」最大肌力×肌耐力模擬器', hash: 'exercise/strength' },
    starter_lessons: ['L-MOVE-08', 'L-MOVE-01', 'L-MOVE-03'],
  },
  {
    id: 'DISC-NEURO',
    name_zh: '睡眠與神經科學',
    name_en: 'Sleep & Neuroscience',
    subtitle_zh: '大腦夜間的膠淋巴洗腦排毒工程與自律神經煞車系統',
    icon: 'moon',
    tone: 'teal',
    track_id: 'rest',
    wonder_story_zh:
      '你知道大腦在深層睡眠時會「洗澡」嗎？神經科學家發現，進入慢波深睡（N3）時，腦細胞會神奇地縮小約 60%，讓腦脊髓液像強力水柱一樣沖刷掉白天累積的 β-類澱粉蛋白垃圾！而當你緊張焦慮時，只要做兩次「兩吸一長呼」的生理嘆氣，就能透過迷走神經在 30 秒內讓心跳慢下來。',
    daily_superpower_zh: '掌握晨光校準生理時鐘、計算咖啡因半衰期、用 CBT-I 行為法改善失眠，並隨時用呼吸調節壓力。',
    core_concepts_zh: [
      '雙歷程睡眠模型：睡眠驅力（腺苷累積）＋生理時鐘（晨光與褪黑激素）雙軌對齊，才能一覺到天亮。',
      '咖啡因受體競爭：咖啡因只是暫時搶走腺苷的座位「借時間」，半衰期長達 4–6 小時，下午太晚喝會偷走深睡期。',
      '生理嘆氣與波耳效應：焦慮時狂喘會把二氧化碳吹光導致腦血管收縮更頭暈；鼻吸兩口、慢吐一口氣才能啟動副交感神經。',
    ],
    lab_link: { label_zh: '動手算：咖啡因代謝與深睡影響模擬器', hash: 'sleep/CAFFEINE_SIM' },
    starter_lessons: ['L-REST-01', 'L-REST-03', 'L-REST-05'],
  },
  {
    id: 'DISC-LABS',
    name_zh: '檢驗醫學與臨床判讀',
    name_en: 'Laboratory Medicine',
    subtitle_zh: '破譯抽血與驗尿報告裡的健康摩斯密碼',
    icon: 'report',
    tone: 'rose',
    track_id: 'checkup',
    wonder_story_zh:
      '為什麼早上空腹去抽血，可以知道你「過去 90 天」有沒有偷吃甜食？因為紅血球壽命約 120 天，血液裡的葡萄糖會像糖衣一樣黏在血紅素上——這就是「糖化血色素 HbA1c」！而驗尿不只看腎臟，尿液顏色更是你全身水合狀態最即時的儀表板。',
    daily_superpower_zh: '拿到健檢報告不再只看紅字發慌，能看懂血壓、血糖、血脂、肝腎指標的「趨勢」與常見誤讀陷阱。',
    core_concepts_zh: [
      '單次快照 vs 長期平均：空腹血糖看當下，HbA1c 看過去 3 個月平均；兩者搭配才不會漏診糖尿病前期。',
      '腎功能雙指標：eGFR 看「濾網還剩幾成力」，尿液白蛋白 UACR 看「濾網有沒有破洞漏蛋白」。',
      '肝指數 AST/ALT 正常不等於沒事：脂肪肝或早期肝硬化時肝指數可能完全正常，需搭配 FIB-4 與腹部超音波評估。',
    ],
    lab_link: { label_zh: '立即試用：健檢報告數值快查與判讀工具', hash: 'checkup' },
    starter_lessons: ['L-CHK-01', 'L-CHK-02', 'L-CHK-05'],
  },
  {
    id: 'DISC-EBM',
    name_zh: '實證醫學與流行病學',
    name_en: 'Epidemiology & Evidence-Based Medicine',
    subtitle_zh: '看穿誇大健康廣告、分辨「相關」與「因果」的科學偵探術',
    icon: 'compass',
    tone: 'emerald',
    track_id: 'basics',
    wonder_story_zh:
      '如果新聞標題寫「吃某保健品讓罹病風險大降 50%！」，你會馬上掏錢買嗎？流行病學偵探會笑著問：「原本風險是多少？」如果原本是 1,000 人裡有 2 人得病（0.2%），降到 1 人（0.1%），相對風險確實降了 50%，但絕對風險只差 0.1%，代表 1,000 人吃藥才有 1 人受益（NNT = 1,000）！學會這招，你一輩子都不會被誇大廣告騙。',
    daily_superpower_zh: '用「誰說的、研究對象是誰、相關還是因果、絕對風險差多少」幫全家人過濾長輩群組假訊息。',
    core_concepts_zh: [
      '證據金字塔：系統性回顧與萬人隨機對照試驗（RCT）最可靠；細胞與動物實驗或名人見證不能直接當作人體療效。',
      '相對風險 vs 絕對風險差（ARR）與需治療人數（NNT）：做醫療決定前，一定要看實際有多少比例的人受益。',
      '天然不等於安全：草藥與高劑量補充劑同樣經肝腎代謝，可能產生交互作用或器官毒性。',
    ],
    lab_link: { label_zh: '探索實證來源分級與 2024–2026 最新實證', hash: 'updates' },
    starter_lessons: ['L-BAS-02', 'L-BAS-03', 'L-BAS-06'],
  },
  {
    id: 'DISC-CARDIO',
    name_zh: '心血代謝與預防醫學',
    name_en: 'Cardiometabolic & Preventive Medicine',
    subtitle_zh: '在疾病發作前 10 年，溫柔攔截三高、保護血管與健康老化',
    icon: 'heart',
    tone: 'amber',
    track_id: 'prevent',
    wonder_story_zh:
      '血管斑塊不是一天長出來的，而是數十年來血液裡的致病脂蛋白顆粒（每個都帶著一張 ApoB 身分證）鑽進受損血管內皮慢慢累積的結果。預防醫學最迷人的地方在於：只要透過居家 722 血壓管理、控制 ApoB/LDL、維持肌肉量與公費篩檢，絕大多數的心肌梗塞、中風與常見癌症都能提早預防或逆轉！',
    daily_superpower_zh: '掌握三高共同源頭（內臟脂肪與胰島素阻抗）、最新減重藥物（如猛健樂）護肌原則，以及台灣 6 大公費癌篩時程。',
    core_concepts_zh: [
      'ApoB 與血脂不一致性：當三酸甘油酯偏高時，LDL 顆粒會變小變密（sdLDL），就算 LDL-C 數字看似正常，ApoB 顆粒總數仍可能超標傷血管。',
      '722 居家量血壓：連續 7 天、早晚 2 時段、每次量 2 遍取平均，居家目標 <130/80 mmHg。',
      '減重首重保肌：無論飲食控制或使用 GLP-1/GIP 藥物，每公斤體重攝取 1.2–1.6g 蛋白質並搭配每週 2 次阻力訓練才能留住肌肉。',
    ],
    lab_link: { label_zh: '前往體重與三高完整指南與試算工具', hash: 'cardiometabolic/THREE_HIGHS' },
    starter_lessons: ['L-PRE-01', 'L-PRE-04', 'L-PRE-11'],
  },
  {
    id: 'DISC-CLINIC',
    name_zh: '骨骼神經與臨床分流學',
    name_en: 'Musculoskeletal & Clinical Triage',
    subtitle_zh: '聽懂疼痛、骨刺與手腳發麻的訊號，做聰明安心的就醫嚮導',
    icon: 'spine',
    tone: 'teal',
    track_id: 'spine',
    wonder_story_zh:
      '你知道嗎？把完全沒有腰痛的 50 歲健康成人抓去照核磁共振（MRI），超過一半以上都會看到「椎間盤突出」或「骨刺」！骨刺其實是骨頭為了穩定關節長出的「老繭」，多數根本不用開刀。學會臨床分流學，你就能分清楚什麼時候該安心做復健運動，什麼時候出現「紅旗警訊」該立刻就醫！',
    daily_superpower_zh: '保護全家人的脊椎與膝蓋、預防長輩骨質疏鬆與跌倒，並在身體不舒服時精準找到對的醫院科別與準備看診問題。',
    core_concepts_zh: [
      '影像異常不等於疼痛原因：骨刺與退化是歲月的白頭髮，治療的是「人與神經症狀」，不是治療 X 光片。',
      '麻木地圖與神經定位：前三指麻常是腕隧道正中神經、小指麻常是肘隧道尺神經、從臀部麻到腳底則是坐骨神經。',
      '紅旗警訊（Red Flags）：若腰痛合併大小便失禁或鞍部麻木（馬尾症候群）、或中風 BE-FAST 徵兆，必須立即急診。',
    ],
    lab_link: { label_zh: '體驗「我該看哪一科？」症狀導引與脊椎專區', hash: 'clinic/by/symptom' },
    starter_lessons: ['L-SPN-01', 'L-SPN-03', 'L-BAS-04'],
  },
];

// ── 12 個真實生活情境實戰演練 (Interactive Real-World Scenario Lab) ──────────

export interface ScenarioChoice {
  label_zh: string;
  is_best: boolean;
  feedback_zh: string;
}

export interface PracticeScenario {
  id: string;
  title_zh: string;
  category_zh: string;
  track_id: string;
  lesson_id: string;
  difficulty: '入門初探' | '生活實戰' | '進階內行';
  situation_zh: string;
  question_zh: string;
  choices: ScenarioChoice[];
  mechanism_pearl_zh: string;
  practice_action_zh: string;
  deep_hash: string;
}

export const PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    id: 'SCEN-01',
    title_zh: '幫媽媽看健檢報告：「壞膽固醇正常」就真的沒事嗎？',
    category_zh: '健檢判讀 × 心血代謝',
    track_id: 'checkup',
    lesson_id: 'L-CHK-04',
    difficulty: '進階內行',
    situation_zh:
      '週日早上，60 歲的媽媽拿著剛出爐的健檢報告開心地說：「你看！我的低密度膽固醇（LDL-C）是 118 mg/dL，沒有紅字喔！」但你仔細往下一看，發現媽媽的腰圍 86 公分、空腹血糖 108 mg/dL、三酸甘油酯（TG）高達 195 mg/dL、高密度膽固醇（HDL-C）只有 40 mg/dL。',
    question_zh: '身為正在成長的「醫學知識者」，你會怎麼溫柔且專業地幫媽媽解讀這份報告？',
    choices: [
      {
        label_zh: '跟媽媽說：「真的耶！只要 LDL-C 沒超過 130 就完全不用擔心心血管問題，繼續保持！」',
        is_best: false,
        feedback_zh:
          '小心掉進「血脂不一致性（Discordance）」陷阱！當三酸甘油酯偏高、腰圍超標時，LDL 顆粒會變得「小而緻密（sdLDL）」，雖然總重量（LDL-C）看似不高，但鑽進血管壁的致病顆粒總數（ApoB）往往已經超標了。',
      },
      {
        label_zh: '稱讚媽媽願意做健檢，接著指出「腰圍、空腹血糖、三酸甘油酯與低 HDL」已符合代謝症候群，且高 TG 會讓 LDL 變成小而密顆粒，建議從減糖、飯後快走與回診討論非 HDL-C / ApoB 開始！',
        is_best: true,
        feedback_zh:
          '太精準了！你不僅看懂了台灣代謝症候群 5 項指標（媽媽已符合 4 項：女腰圍 ≥80cm、空腹血糖 ≥100、TG ≥150、女 HDL <50），還掌握了現代脂質學最核心的「小而密 LDL 與非 HDL 膽固醇」觀念！',
      },
      {
        label_zh: '叫媽媽從明天開始完全不吃任何油脂與肉類，只吃白稀飯配醬瓜來降三酸甘油酯。',
        is_best: false,
        feedback_zh:
          '推升三酸甘油酯（TG）與脂肪肝的頭號飲食兇手其實是「精製澱粉、含糖飲料、果糖與酒精」，而不是健康的蛋白質與好油！只吃白稀飯反而會讓血糖與 TG 飆更高喔。',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】所有會鑽進血管壁造成動脈硬化的脂蛋白車隊（VLDL、殘餘顆粒、LDL），每台車上都只有一張「ApoB」車牌。當三酸甘油酯高時，小卡車數量（ApoB）大增，也可直接用「總膽固醇 － HDL（非 HDL 膽固醇）」免費估算所有壞車總量！',
    practice_action_zh: '拿出自己或家人的最近一份健檢報告，用「總膽固醇 － HDL」算算看非 HDL 膽固醇是否 <130 mg/dL。',
    deep_hash: 'cardiometabolic/THREE_HIGHS',
  },
  {
    id: 'SCEN-02',
    title_zh: '爸爸在醫院量血壓 148/92，嚇得不敢出門運動怎麼辦？',
    category_zh: '生命徵象 × 高血壓 722',
    track_id: 'basics',
    lesson_id: 'L-BAS-01',
    difficulty: '入門初探',
    situation_zh:
      '爸爸昨天去醫院看感冒，匆忙爬樓梯到診間門口馬上塞進隧道式血壓計，量出來 148/92 mmHg。回家後他非常焦慮，覺得自己一定得了嚴重高血壓，連原本喜歡的公園散步都不敢去了。',
    question_zh: '這時候你該怎麼幫爸爸釐清真實血壓並消除恐慌？',
    choices: [
      {
        label_zh: '馬上拿鄰居吃剩的降血壓藥給爸爸吃一顆壓壓驚。',
        is_best: false,
        feedback_zh:
          '千萬不可共用處方藥！不同降血壓藥物機轉不同，且未確認基準血壓就亂服他人藥物，可能導致姿勢性低血壓昏倒或腎功能受損。',
      },
      {
        label_zh: '安撫爸爸：「診間匆忙量一次不準！我們從今晚開始用台灣高血壓指引的『居家 722 原則』連續記錄一週，帶著平均數字回診給醫師看，散步也可以安心照常去！」',
        is_best: true,
        feedback_zh:
          '滿分回答！趕路、憋尿、緊張都會讓交感神經興奮造成「白袍現象」。透過居家 722（連續 7 天、早晚 2 時段、每次量 2 遍間隔 1 分鐘取平均），才能看出真實血管承受的壓力。',
      },
      {
        label_zh: '每隔 5 分鐘就幫爸爸量一次血壓，一天量 20 次盯緊數字變化。',
        is_best: false,
        feedback_zh:
          '頻繁量血壓反而會引發焦慮性血壓飆升（越量越緊張、越緊張越高），壓脈帶反覆充氣也會造成手臂血管暫時性反應不準。',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】2022 台灣高血壓指引與 2025 AHA/ACC 指引皆強調：居家血壓（HBPM）預測中風與心臟病的準確度遠高於診間單次血壓！早上起床尿完尿、吃飯吃藥前坐定 5 分鐘量，以及晚上睡前量，平均 <130/80 mmHg 即為達標。',
    practice_action_zh: '幫家裡的電子血壓計旁邊貼一張便利貼寫上「722：早晚各 2 遍，坐好靠背腳平放」。',
    deep_hash: 'cardiometabolic/BP_722',
  },
  {
    id: 'SCEN-03',
    title_zh: '外食便當與下午愛睏：不挨餓也能穩血糖的「餐盤魔法」',
    category_zh: '飲食營養 × 血糖曲線',
    track_id: 'eat',
    lesson_id: 'L-EAT-01',
    difficulty: '入門初探',
    situation_zh:
      '身為忙碌的上班族，你中午常點一個「排骨便當」配一杯半糖珍奶，總是先大口扒光白飯，結果下午兩點半開會時眼皮重得像鉛塊、腦袋一片空白（餐後暈碳/反應性低血糖），到了下午四點又狂找餅乾吃。',
    question_zh: '不需要自己帶水煮便當，只要在下一個午餐做哪個「微調組合」，下午精神就會判若兩人？',
    choices: [
      {
        label_zh: '中午完全不吃任何食物，直接餓到晚上再暴吃一頓麻辣鍋補回來。',
        is_best: false,
        feedback_zh:
          '白天極端挨餓、晚上暴飲暴食會讓夜間血糖與胃酸劇烈波動，不僅無助於下午專注力，還會破壞睡眠品質！',
      },
      {
        label_zh: '落實「2:1:1 餐盤與進食順序」：把炸排骨換成滷雞腿或烤魚、多加一份燙青菜；先吃青菜與蛋白質，最後吃原本一半到三分之二的飯，手搖飲改無糖茶，吃完散步 10 分鐘！',
        is_best: true,
        feedback_zh:
          '太棒了！這就是最能長久持續的「外食科學改造」：膳食纖維與蛋白質先下肚能延緩胃排空、刺激腸泌素分泌，飯後散步 10 分鐘更能讓腿部大肌群直接把血液裡的葡萄糖吸走，下午從此不再昏沉！',
      },
      {
        label_zh: '把排骨跟青菜全部丟掉，只喝兩大杯鮮榨柳橙汁補充維生素 C。',
        is_best: false,
        feedback_zh:
          '把水果打成汁並濾掉纖維後，游離果糖與葡萄糖會以極快速度衝進血液與肝臟，造成更劇烈的血糖雲霄飛車！水果一定要「吃整顆原態」而非喝果汁。',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】進食順序（菜 ➔ 肉/豆/蛋 ➔ 飯）能透過物理性纖維網與腸道荷爾蒙（GLP-1）減緩澱粉吸收速度；搭配餐後 10 分鐘快走啟動肌肉收縮依賴型 GLUT4 轉運蛋白，可削平約 20–30% 的餐後血糖尖峰！',
    practice_action_zh: '今天下一餐練習「先吃三口蔬菜與蛋白質，再開始吃澱粉」，並在飯後起身走動 10 分鐘。',
    deep_hash: 'diet/patterns',
  },
  {
    id: 'SCEN-04',
    title_zh: '廚房裡的選油難題：一瓶「冷壓亞麻仁油」能煎魚炒菜嗎？',
    category_zh: '油脂生化 × 烹調安全',
    track_id: 'eat',
    lesson_id: 'L-EAT-04',
    difficulty: '生活實戰',
    situation_zh:
      '阿姨買了一瓶昂貴的「冷壓初榨亞麻仁油」，聽說富含 Omega-3 超健康，於是打算用它來大火煎香腸、炸排骨，甚至把整瓶油放在瓦斯爐正旁邊的透明玻璃罐裡。',
    question_zh: '看到這一幕，你該怎麼運用「脂肪酸碳鏈與發煙點」知識幫阿姨守住健康？',
    choices: [
      {
        label_zh: '告訴阿姨：「越貴的油越耐高溫，拿來炸排骨最補腦了！」',
        is_best: false,
        feedback_zh:
          '大錯特錯！冷壓亞麻仁油富含多元不飽和脂肪酸（PUFA，有 3 個不飽和雙鍵），發煙點極低（僅約 107°C），遇大火高溫會迅速氧化裂解，產生大量有害自由基與致癌醛類！',
      },
      {
        label_zh: '跟阿姨解釋：「亞麻仁油分子結構有很多彎曲雙鍵，怕光又怕熱，只適合淋在溫菜或沙拉涼拌，而且要放深色瓶冷藏；日常中火炒菜用芥花油、橄欖油或苦茶油，大火煎烤再用高單元不飽和或高發煙點油品！」',
        is_best: true,
        feedback_zh:
          '完美解說！家裡廚房準備 2 瓶油最聰明：一瓶單元不飽和脂肪（MUFA）高、穩定耐炒的主力油（如芥花油、特級初榨/純橄欖油、苦茶油），另一瓶風味或高 Omega-3 油專門低溫涼拌！',
      },
      {
        label_zh: '建議阿姨以後煮菜全部改成「一滴油都不加」的純水煮餐，徹底戒斷油脂。',
        is_best: false,
        feedback_zh:
          '完全無油飲食會導致脂溶性維生素（A、D、E、K）無法吸收，且膽囊因缺乏油脂刺激而不收縮，反而容易引發膽汁淤積與膽結石！',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】脂肪酸的氧化穩定度取決於「碳鏈雙鍵數量」與「抗氧化物含量」：單元不飽和脂肪酸（MUFA，如油酸）只有 1 個雙鍵，兼顧護心降 LDL 與中溫烹調穩定性，是家庭常備主力油首選。',
    practice_action_zh: '檢查自家廚房瓦斯爐旁：把食用油移到陰涼避光櫥櫃，避免高溫與陽光加速油脂酸敗。',
    deep_hash: 'O',
  },
  {
    id: 'SCEN-05',
    title_zh: '運動抗老實戰：為什麼「每天去公園散步」還不夠防跌與抗肌少？',
    category_zh: '最大肌力 × 相對肌耐力',
    track_id: 'move',
    lesson_id: 'L-MOVE-08',
    difficulty: '生活實戰',
    situation_zh:
      '55 歲的叔叔每天都有去公園散步 40 分鐘，但他發現最近提兩桶水爬三樓越來越喘、去爬郊山下坡時膝蓋會發抖痠痛。他很困惑：「我明明每天都有動、練耐力，為什麼還是覺得體力退化、腳沒力？」',
    question_zh: '結合運動生理學與怪獸訓練「先求最大肌力、再求肌耐力」原則，你會怎麼幫叔叔突破盲點？',
    choices: [
      {
        label_zh: '叫叔叔把散步時間加長到每天走 4 小時，或者拿 1 公斤小水瓶甩手 200 下。',
        is_best: false,
        feedback_zh:
          '散步與極輕重量多次數只能徵召慢縮紅肌纖維，完全無法刺激隨著年齡最快流失的「第二型快縮肌纖維」與骨密度！走太多而在肌力不足下反覆磨損，膝蓋反而更痛。',
      },
      {
        label_zh: '用「天花板決定地板」比喻跟叔叔說明：提水爬樓梯需要 30 公斤力氣，如果最大肌力只有 35 公斤，每一步都在用 85% 極限硬撐；只要每週加入 2 次漸進式肌力訓練把最大肌力拉高到 60 公斤，同樣的樓梯就只佔 50% 力氣，相對肌耐力與護膝緩衝力會自動翻倍！',
        is_best: true,
        feedback_zh:
          '一針見血！「最大肌力是所有體能的火車頭」。當最大肌力天花板提升，日常負重的相對強度（%1RM）大幅下降，而且採用保留 2–3 下餘力（RIR 2–3）的彈性訓練，安全不力竭就能持續變強！',
      },
      {
        label_zh: '告訴叔叔年紀大了膝蓋退化很正常，以後千萬不要上下樓梯或拿任何重物，多坐著休息就好。',
        is_best: false,
        feedback_zh:
          '越不敢用肌肉，肌少症與骨質疏鬆退化越快（用進廢退）！在良好動作控制下進行漸進式負重（深蹲、硬舉/髖鉸鏈），才是保護關節最強的天然護具。',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】依循漢尼曼大小原則（Henneman Size Principle），唯有給予足夠的阻力負荷，神經系統才會徵召高閾值的快縮運動單元，同時透過骨膜機械張力刺激成骨細胞提升骨密度。',
    practice_action_zh: '今天練習 3 組「慢速控制椅子坐站（或高腳杯深蹲）」8–10 下，感受雙腳推地、核心穩定的發力感。',
    deep_hash: 'exercise/strength',
  },
  {
    id: 'SCEN-06',
    title_zh: '夏日長跑與百岳縱走：流汗頭暈時「狂灌兩公升純水」的危機！',
    category_zh: '水合平衡 × 運動低血鈉',
    track_id: 'move',
    lesson_id: 'L-EAT-06',
    difficulty: '進階內行',
    situation_zh:
      '夏天參加半程馬拉松或長時間登山時，朋友因為怕中暑，沿路每個補給站都強迫自己狂喝純白開水，3 小時內灌了超過 3,000 ml 純水，結果非但沒有比較舒服，反而開始劇烈頭痛、噁心想吐、手指腫脹（連戒指都拔不下來）、意識越來越恍惚。',
    question_zh: '這時候朋友最可能發生了什麼生理危機？該如何正確處理？',
    choices: [
      {
        label_zh: '他一定還是水喝不夠脫水了！趕快再灌他 1,000 ml 冰純水！',
        is_best: false,
        feedback_zh:
          '千萬別再灌純水！手指水腫、大量喝純水後頭痛嘔吐與意識混亂，是典型的「運動型低血鈉症（EAH）」，此時再灌純水會加劇急性腦水腫，有生命危險！',
      },
      {
        label_zh: '警覺這是「運動相關低血鈉（EAH）」——大量流汗流失鈉離子卻只灌純水，導致血液被稀釋、水分湧入腦細胞造成水腫！應立即停止灌純水、移至陰涼處並尋求醫療救護（依口渴喝水並搭配電解質鈉補充才是預防關鍵）。',
        is_best: true,
        feedback_zh:
          '救命級的生理判斷！超過 1 小時以上的高溫耐力運動，補水原則是「依口渴感適度補充，並同時補充含鈉電解質」，避免每小時飲水超過腎臟最大排泄速率（約 800 ml/h）。',
      },
      {
        label_zh: '叫他原地做開合跳把多餘的水分排出來。',
        is_best: false,
        feedback_zh:
          '出現神經學症狀（頭痛、嘔吐、意識恍惚）時必須立即停止運動並緊急就醫，繼續劇烈活動會加重心血管與腦水腫風險。',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】細胞內外的水分移動完全聽命於「滲透壓（主要由鈉離子決定）」。當血管內血鈉被過量純水稀釋至 <135 mmol/L，水分會順著滲透壓梯度灌進腦細胞，引發顱內壓升高與腦水腫。',
    practice_action_zh: '記住水合黃金守則：日常看尿液顏色維持「淡檸檬黃（第 2–3 級）」，超過 1 小時大流汗運動要補充電解質。',
    deep_hash: 'W',
  },
  {
    id: 'SCEN-07',
    title_zh: '「我喝咖啡照樣秒睡啊！」為什麼隔天起床還是像沒睡飽？',
    category_zh: '睡眠修復 × 咖啡因代謝',
    track_id: 'rest',
    lesson_id: 'L-REST-03',
    difficulty: '入門初探',
    situation_zh:
      '同事每天下午 4 點都會喝一杯大冰美式，晚上 11 點睡不著時又倒一杯紅酒助眠。他說：「我喝完紅酒 10 分鐘就睡著啦，但奇怪的是半夜 3 點常醒來、多夢，早上起床腦袋像灌水泥一樣累！」',
    question_zh: '從睡眠神經科學來看，下午的咖啡因與睡前的酒精對他的大腦做了什麼？',
    choices: [
      {
        label_zh: '咖啡跟紅酒都是抗氧化神物，他只是睡太少，睡滿 12 小時就好了。',
        is_best: false,
        feedback_zh:
          '睡眠重「結構品質」而非單純躺床時間！咖啡因與酒精雙重夾擊會嚴重摧毀睡眠結構中的 N3 深睡期與 REM 快速動眼期。',
      },
      {
        label_zh: '溫和解釋：咖啡因半衰期約 4–6 小時，下午 4 點喝到晚上 10 點還有一半留在腦中搶走腺苷受體，偷走「深層慢波睡眠（N3 洗腦排毒期）」；而酒精是鎮靜劑不是自然睡眠，代謝反彈會切碎後半夜的 REM 睡眠！建議咖啡改中午前喝，睡前以溫熱澡與調暗燈光取代紅酒。',
        is_best: true,
        feedback_zh:
          '說得太清楚了！很多人以為「能睡著」就代表咖啡因沒影響，其實腦波研究證實晚間殘留的咖啡因會讓深睡波（Delta 波）大幅減少 15–30%，難怪睡再久都覺得沒充到電！',
      },
      {
        label_zh: '建議他晚上睡不著時躺在床上滑手機看短影音，滑到累為止。',
        is_best: false,
        feedback_zh:
          '手機藍光與高多巴胺短影音會強烈抑制松果體分泌褪黑激素，且讓大腦把「床鋪」與「清醒滑手機」連結在一起，加重慢性失眠！',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】腺苷（Adenosine）是大腦清醒越久累積越多的「睡意硬幣」；咖啡因長得跟腺苷很像，會霸佔受體讓你感覺不到累。結合「早上起床曬 10–15 分鐘自然光」與「中午前截止咖啡因」，能讓夜間褪黑激素與腺苷完美同步！',
    practice_action_zh: '為自己設定一個「咖啡因門禁時間（例如下午 1 點或 2 點後改喝白開水或無咖啡因麥茶）」。',
    deep_hash: 'sleep/CAFFEINE_SIM',
  },
  {
    id: 'SCEN-08',
    title_zh: '突發緊張胸悶、手麻喘不過氣：為什麼千萬不能拿紙袋套口鼻？',
    category_zh: '自律神經 × 急救安全閘',
    track_id: 'rest',
    lesson_id: 'L-REST-05',
    difficulty: '進階內行',
    situation_zh:
      '朋友在重要簡報前突然覺得呼吸急促、胸口緊、手指跟嘴唇發麻。旁邊的熱心同事立刻拿了一個牛皮紙袋說：「我在老電影看過！這是過度換氣，趕快拿紙袋套住嘴巴跟鼻子呼吸！」',
    question_zh: '為什麼現代急診醫學指引「全面嚴格禁止」用紙袋套口鼻？你該怎麼做才真正安全有效？',
    choices: [
      {
        label_zh: '紙袋太小了，應該換成密封塑膠袋套緊一點效果更快。',
        is_best: false,
        feedback_zh:
          '絕對禁止！無論紙袋或塑膠袋重呼吸都會快速耗盡吸入氣體中的氧氣，極度危險！',
      },
      {
        label_zh: '立刻阻止拿紙袋！說明：「萬一胸悶喘不過氣其實是潛在的心肌梗塞、肺栓塞或氣胸，套紙袋吸缺氧廢氣會導致致命性低血氧！」應先確認有無胸痛冒冷汗等紅旗警訊；若為單純緊張，帶他閉嘴用鼻子做『兩吸一長呼（生理嘆氣）』或慢呼氣即可！',
        is_best: true,
        feedback_zh:
          '專業級的安全守門員！這正是 Salud 臨床安全防火牆最強調的重點：第一是排除致命心肺急症（紙袋重呼吸對心梗/氣胸/氣喘患者可能致命）；第二是運用「閉嘴純鼻慢吐氣 / 生理嘆氣」溫和恢復二氧化碳平衡與迷走神經張力。',
      },
      {
        label_zh: '叫朋友張大嘴巴用最快速度大口狂喘 50 下，把氣吸飽。',
        is_best: false,
        feedback_zh:
          '根據「波耳效應（Bohr Effect）」，大口急促狂喘會把血液中的二氧化碳（CO2）吹光，導致呼吸性鹼中毒、腦血管收縮，且血紅素抓緊氧氣不放，大腦反而更缺氧、手腳更麻！',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】二氧化碳不只是廢氣，更是讓腦血管保持舒張、讓紅血球把氧氣釋放給組織的「開門鑰匙（波耳效應）」。緩慢延長吐氣（如吸 4 秒、吐 6–8 秒，或雙吸單長呼）能立刻啟動副交感迷走神經煞車。',
    practice_action_zh: '現在就跟著做 3 次「生理嘆氣」：鼻子深吸一口氣 ➔ 再快速補吸一小口到最飽 ➔ 嘴巴或鼻子緩慢長吐氣到底。',
    deep_hash: 'mental',
  },
  {
    id: 'SCEN-09',
    title_zh: '久坐腰痠背痛、X 光照出「骨刺」：一定要開刀削掉嗎？',
    category_zh: '脊椎關節 × 物理治療',
    track_id: 'spine',
    lesson_id: 'L-SPN-01',
    difficulty: '生活實戰',
    situation_zh:
      '45 歲的姊姊整天坐辦公室用電腦，最近站起來時下背很痠。去診所照 X 光，醫師隨口說了一句「腰椎有一點骨刺喔」，姊姊回家哭著說自己骨頭長刺會刺破神經，想去買來路不明的「溶骨刺神藥」或馬上開刀把骨刺磨掉。',
    question_zh: '你該怎麼用脊椎醫學與物理治療的正確觀念安撫姊姊？',
    choices: [
      {
        label_zh: '贊成姊姊去買偏方草藥把骨刺「溶化掉」。',
        is_best: false,
        feedback_zh:
          '骨刺的成分跟正常骨頭一模一樣（鈣化骨質）！如果某種藥能把骨刺溶掉，你全身正常的骨頭也會一起被溶掉！坊間號稱消骨刺的偏方常違法摻雜強效類固醇或止痛藥，極傷肝腎。',
      },
      {
        label_zh: '溫柔告訴姊姊：「骨刺就像手掌磨久長出的『老繭』，是脊椎為了增加穩定面積的自然反應，不是尖刺！只要沒有馬尾症候群（大小便失禁）或進行性下肢無力等紅旗警訊，90% 以上不用開刀；透過伸展緊繃髖屈肌、喚醒臀肌與核心就能大幅改善！」',
        is_best: true,
        feedback_zh:
          '太棒了！你幫姊姊省下了無謂的恐懼與冤枉錢！久坐族的下背痛多半是因為「前面髂腰肌太緊、後面臀肌失憶無力」，導致腰椎代償過勞，主動運動復健才是治本之道。',
      },
      {
        label_zh: '叫姊姊從今天起絕對躺在床上一動也不動休養一個月。',
        is_best: false,
        feedback_zh:
          '現代臨床指引強烈反對一般下背痛長期絕對臥床！躺超過 48 小時會讓核心肌群迅速萎縮、椎間盤營養交換變差，反而延長疼痛復原時間。在可承受範圍內維持日常走動恢復最快！',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】椎間盤沒有直接血管供應，必須靠身體「適度活動、受力與卸載」像海綿吸水一樣交換養分。區分「單純機械性痠痛（靠姿勢調整與肌力復健）」與「神經壓迫紅旗（大小便失禁、鞍部麻木、垂足無力需急診）」是最關鍵的醫學素養。',
    practice_action_zh: '每坐滿 45–50 分鐘起身做 30 秒「站姿後仰伸展＋夾臀練習」，解除腰椎與髖屈肌壓力。',
    deep_hash: 'spine',
  },
  {
    id: 'SCEN-10',
    title_zh: '長輩量耳溫 37.3°C 就急著吃退燒藥？發燒與打 119 紅旗判讀',
    category_zh: '神經系統 × 急症紅旗',
    track_id: 'body',
    lesson_id: 'L-BODY-04',
    difficulty: '入門初探',
    situation_zh:
      '傍晚 5 點，爺爺剛喝完一碗熱湯，量耳溫顯示 37.3°C，精神食慾都很好，但家人很緊張想馬上塞退燒藥給他吃；反倒是隔壁伯伯早上突然「右邊嘴角歪斜、右手舉不起來、講話大舌頭」，伯母卻說：「先扶他去床上睡一覺、幫他扎手指放血看看會不會好！」',
    question_zh: '這兩個情境中，哪一個才是真正分秒必爭、必須立刻打 119 的醫療急症？',
    choices: [
      {
        label_zh: '爺爺 37.3°C 很危險要馬上吃退燒藥；隔壁伯伯睡一覺就會好。',
        is_best: false,
        feedback_zh:
          '完全顛倒了！人體傍晚體溫原本就較高，成人一般以 ≥38.0°C 定義發燒，37.3°C 精神好完全不需吃退燒藥；反觀隔壁伯伯是典型急性腦中風，睡一覺會錯過黃金搶救時間！',
      },
      {
        label_zh: '爺爺 37.3°C 屬傍晚正常體溫波動，觀察即可；但隔壁伯伯符合中風「BE-FAST（臉歪、手垂、大舌頭）」紅旗警訊，絕對不可睡覺或放血，必須記下發作時間立刻撥打 119 送醫搶救腦細胞！',
        is_best: true,
        feedback_zh:
          '關鍵時刻能救人一命的判斷！急性缺血性中風每延誤 1 分鐘就有 190 萬個腦神經元死亡，靜脈血栓溶解劑黃金時間為發作 4.5 小時內，直接打 119 由救護車送往中風責任醫院是最快的生命通道！',
      },
      {
        label_zh: '先餵臉歪手無力的伯伯喝一大碗熱水並吃降血壓藥。',
        is_best: false,
        feedback_zh:
          '急性中風患者常伴隨吞嚥反射受損，強行餵水或餵藥極易引發嚴重「吸入性肺炎」或窒息；且急性期血壓由急診醫師精密調控，不可自行亂降血壓以免腦缺血惡化！',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】記住中風急救密碼「BE-FAST」：Balance（失去平衡）、Eyes（視力模糊）、Face（微笑臉歪）、Arm（單側手腳無力）、Speech（口齒不清）、Time（記下最後正常時間，立即打 119）。',
    practice_action_zh: '把「BE-FAST 中風口訣」用一句話講給家裡長輩聽，約定有症狀第一時間打 119 不等隔天門診。',
    deep_hash: 'systems/nervous/flags',
  },
  {
    id: 'SCEN-11',
    title_zh: '群組瘋傳「神效膠囊讓中風風險大降 50%！」：用 NNT 一秒算穿真相',
    category_zh: '實證判讀 × 風險數字',
    track_id: 'basics',
    lesson_id: 'L-BAS-03',
    difficulty: '進階內行',
    situation_zh:
      '家族 LINE 群組傳來一篇推銷文：「震驚！最新研究證實，每天吃高價 X 膠囊（一個月 6,000 元），心血管風險大降 50%！」你點開原始研究一看，發現沒吃的人 5 年發病率是 0.4%，吃的人是 0.2%。',
    question_zh: '身為懂得「相對風險 vs 絕對風險差（ARR）與需治療人數（NNT）」的醫學知識者，你會怎麼幫家人算這筆帳？',
    choices: [
      {
        label_zh: '50% 超級高！馬上幫全家人刷卡訂購一年份！',
        is_best: false,
        feedback_zh:
          '這就是商業廣告最愛用的「相對風險障眼法」！從 0.4% 降到 0.2%，雖然比例砍半（相對降 50%），但實際減少的絕對風險只有 0.2%！',
      },
      {
        label_zh: '幫家人算出絕對風險差：0.4% － 0.2% ＝ 0.2%，換算需治療人數 NNT ＝ 1 ÷ 0.002 ＝ 500！意思是「500 個人連續吃 5 年，只有 1 個人因此受惠，另外 499 人白花錢」，把錢省下來買好油、蔬菜與運動划算太多了！',
        is_best: true,
        feedback_zh:
          '太帥了！這就是實證醫學最核心的思考武器！當你會算「絕對風險差（ARR）」與「需治療人數（NNT）」，任何誇大的行銷話術在你面前都會原形畢露。',
      },
      {
        label_zh: '只要是有做研究的通通都是假新聞，連醫師開的正規三高藥也不要吃。',
        is_best: false,
        feedback_zh:
          '我們反對的是誇大行銷，而不是否定科學！對於高風險患者（例如已放過支架、LDL 極高或糖尿病合併蛋白尿），正規藥物（如 Statin、SGLT2i）的絕對風險下降幅度大、NNT 很低（常僅需 10–30 人即有 1 人免於重大心血管事件），切勿自行停藥！',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】公式超簡單：絕對風險差（ARR）＝ 原風險 － 新風險；需治療人數（NNT）＝ 1 ÷ ARR。原本風險越高的人，接受實證治療的 NNT 越小（效益越大）；健康低風險人吃昂貴保健品，NNT 動輒上千。',
    practice_action_zh: '下次看到健康新聞寫「風險增加/減少 X%」，練習先找找看「原本的基礎發生率是多少」。',
    deep_hash: 'evidence',
  },
  {
    id: 'SCEN-12',
    title_zh: '考慮施打「瘦瘦針（猛健樂）」減重：如何避免減掉肌肉、停藥復胖？',
    category_zh: '體重管理 × 肌肉保護',
    track_id: 'prevent',
    lesson_id: 'L-PRE-11',
    difficulty: '生活實戰',
    situation_zh:
      '朋友 BMI 31 合併糖尿病前期，經醫師評估開始施打雙重腸泌素受體促效劑「猛健樂（Tirzepatide）」。打針後他食慾大減，開心地說：「我現在整天只喝一杯黑咖啡配兩片餅乾都不會餓，運動也免了，一個月狂瘦 6 公斤超爽！」',
    question_zh: '根據 SURMOUNT 臨床試驗與醫學共識，如果他繼續「極端不吃蛋白質＋完全不練肌力」，會發生什麼後果？該如何修正？',
    choices: [
      {
        label_zh: '太棒了，減重就是體重計數字掉越快越好，不用管減掉的是什麼。',
        is_best: false,
        feedback_zh:
          '危險！研究顯示減重過程中若未補充足夠蛋白質與阻力訓練，減去的體重中約有 25% 甚至更高比例是珍貴的「肌肉與去脂組織（Lean Mass）」，導致基礎代謝暴跌、肌少症與未來停藥後報復性復胖！',
      },
      {
        label_zh: '提醒朋友：「瘦瘦針幫你關掉食慾噪音，但這時候更要精準進食與練肌力！」建議每天每公斤體重攝取 1.2–1.6 克優質蛋白質（每餐先吃豆魚蛋肉）、每週至少 2 次肌力訓練留住肌肉，並小口分次補水與纖維預防便祕與膽結石！',
        is_best: true,
        feedback_zh:
          '完全符合 2025–2026 國際肥胖醫學臨床共識！把藥物當作「建立高蛋白餐盤與肌力習慣的輔助窗」，才能真正減掉內臟脂肪、保住骨骼肌，即便未來在醫師指導下調整劑量也不易復胖！',
      },
      {
        label_zh: '建議朋友自己把劑量直接調到最高 15 mg，這樣兩個月就能收工停藥。',
        is_best: false,
        feedback_zh:
          '絕對不可自行跳階升量！猛健樂必須由 2.5 mg 起始、每階至少維持 4 週視耐受度逐步調整；跳階會引發劇烈嘔吐、脫水、急性腎損傷甚至胰臟炎風險。',
      },
    ],
    mechanism_pearl_zh:
      '【醫學機轉亮點】Tirzepatide 同時作用於 GIP 與 GLP-1 受體，透過下視丘飽食中樞與延緩胃排空達到平均 15–21% 體重下降；但唯有「充足蛋白質（1.2–1.6 g/kg/d）＋機械張力肌力訓練」能維持 mTOR 肌肉蛋白合成訊號，防止去脂組織流失。',
    practice_action_zh: '用體重乘以 1.2 算算看自己每天至少需要幾克蛋白質（例如 60 公斤約需 72 克，相當於每天 3 個手掌心的豆魚蛋肉類）。',
    deep_hash: 'obesity/TIRZEPATIDE_PROTOCOL',
  },
];

// ── 16 道真假迷思快打對決卡 (True / False Myth Blitz Deck) ──────────────────

export interface MythBlitzCard {
  id: string;
  statement_zh: string;
  /** true = 這是正確的實證科學觀念; false = 這是常見的錯誤迷思 */
  is_true: boolean;
  verdict_zh: string;
  explain_zh: string;
  track_id: string;
  lesson_id: string;
}

export const MYTH_BLITZ_DECK: MythBlitzCard[] = [
  {
    id: 'BLITZ-01',
    statement_zh: '成人耳溫量到 37.4°C 就代表已經發燒，必須立刻吃退燒藥壓下來。',
    is_true: false,
    verdict_zh: '❌ 這是迷思！成人一般以 ≥38.0°C 定義發燒。',
    explain_zh: '人體體溫傍晚比清晨略高，37.2–37.5°C 常屬正常生理波動；退燒藥是為了緩解不適，重點是觀察精神、喝水與有無危險警訊。',
    track_id: 'basics',
    lesson_id: 'L-BAS-01',
  },
  {
    id: 'BLITZ-02',
    statement_zh: '在家連續 7 天、早晚 2 次、每次量 2 遍取平均的「722 居家血壓」，比在醫院診間量一次更能代表真實血壓。',
    is_true: true,
    verdict_zh: '⭕ 完全正確！居家 722 血壓是國際指引首推標準。',
    explain_zh: '居家 722 能消除診間緊張造成的「白袍高血壓」，也能揪出診間正常、在家卻偏高的「隱匿性高血壓」，目標為平均 <130/80 mmHg。',
    track_id: 'basics',
    lesson_id: 'L-BAS-01',
  },
  {
    id: 'BLITZ-03',
    statement_zh: '只要標榜「100% 純天然草本萃取」的保健品或中草藥，就絕對不會傷肝傷腎或跟西藥衝突。',
    is_true: false,
    verdict_zh: '❌ 這是危險迷思！天然不等於無毒或無交互作用。',
    explain_zh: '無論天然或合成物質都需經肝臟 CYP450 酵素與腎臟代謝；例如紅麴與降血脂藥 Statin 同服會增加橫紋肌溶解風險，看診務必主動告知正在吃的保健品。',
    track_id: 'basics',
    lesson_id: 'L-BAS-02',
  },
  {
    id: 'BLITZ-04',
    statement_zh: '為了血管健康，日常煮菜應該做到「完全無油水煮」，一滴油都不沾最好。',
    is_true: false,
    verdict_zh: '❌ 這是迷思！極端無油反而傷身又容易膽結石。',
    explain_zh: '長期無油會導致維生素 A、D、E、K 無法吸收、荷爾蒙失調，且膽囊因缺乏油脂刺激不收縮而易生膽結石。關鍵是「用好油（如橄欖油、芥花油）取代壞油」！',
    track_id: 'eat',
    lesson_id: 'L-EAT-04',
  },
  {
    id: 'BLITZ-05',
    statement_zh: '吃飯時先吃蔬菜與蛋白質（豆魚蛋肉），最後再吃澱粉飯麵，比先大口扒白飯更能平緩餐後血糖。',
    is_true: true,
    verdict_zh: '⭕ 完全正確！進食順序能削平餐後血糖雲霄飛車。',
    explain_zh: '蔬菜膳食纖維與蛋白質先進入胃腸，能延緩胃排空速度並提前誘發腸泌素分泌，減少餐後困倦與胰島素劇烈波動。',
    track_id: 'eat',
    lesson_id: 'L-EAT-01',
  },
  {
    id: 'BLITZ-06',
    statement_zh: '每天如果沒走到 10,000 步，對健康跟長壽就完全沒有幫助。',
    is_true: false,
    verdict_zh: '❌ 這是迷思！從多走 1,000 步開始就有顯著健康回報。',
    explain_zh: '2025 年 Lancet Public Health 大型統合分析證實：每天約 7,000 步就與全因死亡率降低 47% 相關；對久坐族而言，從 2,000 步增加到 4,000 步的效益斜率最陡峭！',
    track_id: 'move',
    lesson_id: 'L-MOVE-01',
  },
  {
    id: 'BLITZ-07',
    statement_zh: '把「最大肌力」練起來之後，日常搬重物、爬樓梯佔你最大力量的比例變小，「相對肌耐力」也會跟著自動提升。',
    is_true: true,
    verdict_zh: '⭕ 完全正確！這就是「天花板決定地板」的抗老鐵律。',
    explain_zh: '最大肌力是所有體能的火車頭；而且重量訓練不需要每次練到力竭癱瘓，每組保留 2–3 下餘力（RIR 2–3）就能安全高效進步。',
    track_id: 'move',
    lesson_id: 'L-MOVE-08',
  },
  {
    id: 'BLITZ-08',
    statement_zh: '睡前喝一杯紅酒或威士忌，既能幫助深層睡眠又能保護心血管。',
    is_true: false,
    verdict_zh: '❌ 這是迷思！酒精是破壞後半夜睡眠結構的元兇。',
    explain_zh: '酒精雖讓你快速昏沉，但代謝過程會嚴重切碎後半夜的快速動眼期（REM）與深睡期，且酒精與乙醛已被列為一級致癌物，不建議為助眠或護心而飲酒。',
    track_id: 'rest',
    lesson_id: 'L-REST-03',
  },
  {
    id: 'BLITZ-09',
    statement_zh: '失眠睡不著時，與其躺在床上清醒翻來覆去滑手機，不如先離開床鋪做安靜放鬆的事，等有睡意再回床上。',
    is_true: true,
    verdict_zh: '⭕ 完全正確！這是失眠認知行為治療（CBT-I）的核心「刺激控制法」。',
    explain_zh: '讓大腦把「床鋪」與「睡覺」重新建立強連結，不在床上滑手機或焦慮煎熬，是國際指引公認不靠安眠藥逆轉慢性失眠的第一線方法。',
    track_id: 'rest',
    lesson_id: 'L-REST-02',
  },
  {
    id: 'BLITZ-10',
    statement_zh: '健檢報告上的「肝指數 AST / ALT（GOT / GPT）」只要在正常範圍內，就代表肝臟完全健康、絕對沒有肝硬化或肝癌。',
    is_true: false,
    verdict_zh: '❌ 這是常見誤讀！肝指數正常不等於沒有慢性肝病。',
    explain_zh: 'AST/ALT 只反映抽血當下肝細胞有沒有正在發炎壞死；已經成型的肝纖維化、肝硬化或早期肝腫瘤，肝指數可能完全正常，須搭配 B/C 肝篩檢、FIB-4 與超音波檢查。',
    track_id: 'checkup',
    lesson_id: 'L-CHK-06',
  },
  {
    id: 'BLITZ-11',
    statement_zh: '看腎臟健康不能只看「腎絲球過濾率 eGFR」，還要搭配看「尿液白蛋白比值 UACR」有沒有漏蛋白。',
    is_true: true,
    verdict_zh: '⭕ 完全正確！eGFR 與 UACR 是評估腎臟的雙核心。',
    explain_zh: 'eGFR 像是看腎臟濾網還剩幾成過濾力，UACR 則是看濾網有沒有破洞漏出白蛋白；兩者合看才能在最早期攔截慢性腎臟病（KDIGO 指引）。',
    track_id: 'checkup',
    lesson_id: 'L-CHK-05',
  },
  {
    id: 'BLITZ-12',
    statement_zh: '高血壓或糖尿病患者如果覺得身體沒有不舒服、血壓血糖量起來正常了，就可以自己把藥停掉免得傷腎。',
    is_true: false,
    verdict_zh: '❌ 這是危險迷思！失控的高血壓與高血糖才是洗腎元兇。',
    explain_zh: '數字正常是因為藥物正在保護血管與腎絲球；自行突然停藥會引發血壓反彈飆升與血管內皮損傷。想減藥務必透過生活改善並與醫師討論階梯調整。',
    track_id: 'prevent',
    lesson_id: 'L-PRE-01',
  },
  {
    id: 'BLITZ-13',
    statement_zh: '台灣自 2025–2026 年起，成人公費健檢年齡已下修至 30 歲，並新增 45–74 歲終身一次公費胃幽門螺旋桿菌篩檢。',
    is_true: true,
    verdict_zh: '⭕ 完全正確！善用國家公費篩檢是最聰明的預防投資。',
    explain_zh: '30–39 歲每 5 年可享免費成人健檢（含血糖、血脂、腎功能與新增尿酸），及早除菌幽門桿菌更能大幅降低胃潰瘍與胃癌風險。',
    track_id: 'checkup',
    lesson_id: 'L-CHK-08',
  },
  {
    id: 'BLITZ-14',
    statement_zh: '核磁共振（MRI）照出「腰椎間盤突出」或「骨刺」，就代表一定要馬上開刀，否則會癱瘓。',
    is_true: false,
    verdict_zh: '❌ 這是迷思！90% 以上的椎間盤突出與骨刺不需開刀。',
    explain_zh: '許多無症狀成人影像上也有退化或突出；只要沒有馬尾症候群（大小便失禁、鞍部麻木）或進行性肌力喪失，透過物理治療與核心訓練多可自然緩解吸收。',
    track_id: 'spine',
    lesson_id: 'L-SPN-01',
  },
  {
    id: 'BLITZ-15',
    statement_zh: '骨質疏鬆症在骨折發生前通常「完全沒有疼痛症狀」，走路膝蓋會痛多半是退化性關節炎而非骨鬆本身。',
    is_true: true,
    verdict_zh: '⭕ 完全正確！分清「骨質疏鬆」與「關節炎」才不會補錯方向。',
    explain_zh: '骨鬆是骨頭內部孔隙變大（需靠 DXA 骨密度檢查、鈣＋維生素 D 與負重肌力訓練防治）；關節炎則是軟骨磨損發炎（需靠大腿股四頭肌與臀肌訓練減輕關節負擔）。',
    track_id: 'spine',
    lesson_id: 'L-SPN-06',
  },
  {
    id: 'BLITZ-16',
    statement_zh: '吃雞蛋一定會讓血液裡的壞膽固醇飆高，因此為了血管健康，一天最多只能吃一顆甚至要丟掉蛋黃？',
    is_true: false,
    verdict_zh: '❌ 這是過時迷思！人體 70–80% 膽固醇由肝臟自行合成調節。',
    explain_zh: '人體具有完善的膽固醇恆定負回饋機制：膳食膽固醇增加時肝臟合成會相應減少。對絕大多數人而言，適量吃全蛋對血中 LDL 影響微乎其微，蛋黃更富含大腦所需的膽鹼、葉黃素與卵磷脂！',
    track_id: 'eat',
    lesson_id: 'L-EAT-01',
  },
];

/** Helper to generate a friendly Feynman "explain to family/friends" share text for any lesson. */
export function buildFeynmanShareText(lessonId: string): {
  opening_zh: string;
  metaphor_zh: string;
  action_invite_zh: string;
  full_copy_text: string;
} | null {
  const lesson = ALL_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return null;
  const track = LEARNING_TRACKS.find((t) => t.id === lesson.track_id);

  const opening_zh = `今天在 Salud 學到一個超實用的「${lesson.title_zh}」觀念：${lesson.big_idea_zh}`;
  const metaphor_zh = lesson.analogy_zh
    ? `用生活白話打個比方：${lesson.analogy_zh}`
    : `最關鍵的重點是：${lesson.key_points_zh[0]}`;
  const action_invite_zh = `我們今天就可以一起試試這個超簡單的小練習：${lesson.do_today_zh[0]}`;

  const full_copy_text = [
    `🌱【一句話健康分享・${track?.title_zh ?? 'Salud'}】`,
    opening_zh,
    '',
    `💡 ${metaphor_zh}`,
    '',
    `🏃 ${action_invite_zh}`,
  ].join('\n');

  return {
    opening_zh,
    metaphor_zh,
    action_invite_zh,
    full_copy_text,
  };
}
