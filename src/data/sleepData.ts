import { SleepStageInfo, SleepTopic } from '../types';

export const SLEEP_STAGES: SleepStageInfo[] = [
  {
    stage: 'NREM_1',
    name_zh: 'N1 · 入睡過渡期 (Light Transition)',
    name_en: 'N1 · Light Transition',
    pct_of_night: '約 5%',
    physiological_function_zh: '清醒進入淺眠之橋樑，肌肉張力開始放鬆，呼吸心跳輕微減緩。',
    physiological_function_en: 'Bridge between wakefulness and somnolence; muscle tone relaxes, breathing stabilizes.',
    brain_wave_pattern: '清醒 Alpha 波 (8–12 Hz) 漸次轉化為 Theta 波 (4–7 Hz)；偶發入睡抽動 (Hypnic Jerk)。',
    clinical_significance_zh: '極易被輕微環境噪音喚醒，若此期過長反映中樞神經處於過度亢奮交感狀態。',
    clinical_significance_en: 'Easily fragmented by ambient cues; an elongated N1 reflects hyperarousal and sympathetic dominance.',
  },
  {
    stage: 'NREM_2',
    name_zh: 'N2 · 淺睡穩定期 (True Stable Sleep)',
    name_en: 'N2 · Stable Baseline Sleep',
    pct_of_night: '約 45% – 55%',
    physiological_function_zh: '體溫進一步下降，外在感知鈍化，運動技能與程序性記憶在此階段進行神經突觸初步強化。',
    physiological_function_en: 'Body temperature drops, sensory gateway closes, fine motor skills and procedural memory consolidate.',
    brain_wave_pattern: '特色性腦波：睡眠紡錘波 (Sleep Spindles, 11–16 Hz) 與 K-複合波 (K-Complexes)。',
    clinical_significance_zh: '紡錘波密度與認知學習能力高度相關，能主動阻斷外部聲音刺激傳送至皮質。',
    clinical_significance_en: 'Spindle density correlates with synaptic plasticity and actively shields the cortex from sound disturbances.',
  },
  {
    stage: 'NREM_3_SWS',
    name_zh: 'N3 · 慢波深睡期 (Slow-Wave Sleep / SWS)',
    name_en: 'N3 · Slow-Wave Sleep (Deep Sleep)',
    pct_of_night: '約 15% – 25%',
    physiological_function_zh: '身體組織修復的黃金時段：生長激素 (GH) 脈衝式大量分泌、骨骼肌修復、免疫重塑、血壓降至全天最低。',
    physiological_function_en: 'Primary restorative phase: pulsed growth hormone (GH) surge, protein synthesis, immune recalibration, and lowest nocturnal blood pressure.',
    brain_wave_pattern: '高振幅超慢 Delta 波 (< 4 Hz, > 75 μV) 同步化主導。',
    clinical_significance_zh: '膠淋巴系統 (Glymphatic System) 唯一的全效開啟窗口！若深睡不足，隔日骨骼肌肉無力且大腦代謝廢物堆積。',
    clinical_significance_en: 'The exclusive window for maximal Glymphatic clearing efficiency; deprivation leads to neurotoxin accumulation.',
  },
  {
    stage: 'REM',
    name_zh: 'REM · 快速動眼期 (Rapid Eye Movement)',
    name_en: 'REM · Rapid Eye Movement Sleep',
    pct_of_night: '約 20% – 25%',
    physiological_function_zh: '大腦情緒去敏化與複雜認知、創意連結的溫床；中樞神經神經遞質去甲腎上腺素降為零。',
    physiological_function_en: 'Emotional depotentiation and associative creativity; cerebral noradrenaline drops to zero, allowing trauma processing.',
    brain_wave_pattern: '低振幅快波（去同步化，神經元活躍度近似清醒）；骨骼肌失張弛 (Atonia) 呈現完全麻痺防做夢肢體揮動。',
    clinical_significance_zh: '後半夜 REM 佔比最高。酒精與安眠藥會暴力剪除 REM 睡眠，導致隔日情緒暴躁易怒與專注力解離。',
    clinical_significance_en: 'Dominates the second half of the night; suppressed by alcohol and sedatives, precipitating irritability and emotional dysregulation.',
  },
];

export const SLEEP_TOPICS: SleepTopic[] = [
  {
    id: 'SL-01',
    title_zh: '睡眠生理架構：90 分鐘超晝夜週期循環',
    title_en: 'Sleep Architecture: The 90-Minute Ultradian Cycles',
    category: 'ARCHITECTURE',
    one_liner_zh: '睡眠不是關機，而是一場精密編排、前後半夜任務截然不同的大腦交響樂。',
    one_liner_en: 'Sleep is not a shutdown, but an orchestrated four-part symphony with shifting nocturnal duties.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '整夜由 4–6 個約 90–110 分鐘的超晝夜週期 (Ultradian Cycles) 連貫組成。',
      '前半夜（前兩個週期）為慢波深睡 (N3 SWS) 重兵部署期，專注於肉體生化修復與骨骼肌再生。',
      '後半夜轉向快速動眼期 (REM) 主導，大腦海馬迴與大腦皮質緊密通訊，將短期記憶轉化為長久認知儲備。',
    ],
    mechanisms_en: [
      'Composed of 4-6 repeating 90-110 min ultradian cycles progressing from N1 to N2, N3, and REM.',
      'The first third of the night is heavily weighted toward N3 slow-wave sleep, prioritizing physical tissue synthesis.',
      'The final third transitions to REM dominance, orchestrating cross-cortical associative learning and emotional processing.',
    ],
    actionable_rules_zh: [
      '黃金總量窗口：健康成年人每夜需睡足 7–9 小時（約 5 個完整週期），少於 6 小時全因死亡率與感染風險顯著上升。',
      '維持作息一致性：平日與週末就寢與起床時間落差不得超過 60 分鐘，防範「社交時差 (Social Jetlag)」。',
      '避免鬧鐘反覆貪睡（Snooze）：頻繁被鈴聲驚醒會強行在中斷的淺睡週期中注入皮質醇與高心率壓力。',
    ],
    actionable_rules_en: [
      'Total duration window: 7-9 hours nightly (5 complete cycles) for adults; <6 hours is linked to heightened infection and mortality risks.',
      'Circadian consistency: Keep bedtime and wake times within a 60-minute window across weekdays and weekends.',
      'Eliminate snooze alarms: Fragmentation of fragmented sleep spikes cortisol and sympathetic tone abruptly.',
    ],
  },
  {
    id: 'SL-02',
    title_zh: '膠淋巴系統 (Glymphatic System)：大腦夜間自潔洗碗機',
    title_en: 'The Glymphatic System: The Brain Nightly Dishwasher',
    category: 'GLYMPHATIC_DETOX',
    one_liner_zh: '進入深睡時，大腦細胞間隙擴大 60%，腦脊髓液像潮水般洗刷致病類澱粉蛋白。',
    one_liner_en: 'During deep sleep, brain interstitial space expands 60%, flushing out neurotoxic amyloid proteins.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '由羅徹斯特大學 Maiken Nedergaard 教授於 2012 年重大發現：大腦缺乏外周淋巴管道，依賴星狀膠質細胞上 Aquaporin-4 (AQP4) 水通道蛋白進行專屬排毒。',
      '只有在 NREM 慢波深睡期，星狀膠質細胞體積收縮，間隙液阻力降低，腦脊髓液 (CSF) 湧流貫穿實質沖刷。',
      '高效清除日間代謝產物：阿茲海默症致病元兇「β-類澱粉蛋白 (Amyloid-beta)」與「磷酸化 Tau 蛋白」。',
    ],
    mechanisms_en: [
      'Discovered by Dr. Maiken Nedergaard in 2012: The central nervous system lacks traditional lymphatics, utilizing AQP4 water channels on astrocytic endfeet.',
      'Exclusive to NREM slow-wave sleep: Glial cells contract, expanding interstitial space volume by 60% to accelerate convective CSF-ISF exchange.',
      'Actively flushes soluble neurotoxic metabolic waste, specifically monomeric Amyloid-beta and hyperphosphorylated Tau proteins.',
    ],
    actionable_rules_zh: [
      '側臥姿勢優勢：臨床影像學研究顯示，右側臥或側臥姿態下的膠淋巴腦脊髓液沖刷動力學顯著優於仰臥或俯臥。',
      '睡前 3 小時禁食：高胰島素與消化道活動會阻礙慢波深睡的深層展開，直接抑制膠淋巴流速。',
      '規律 Zone 2 有氧運動：日間規律有氧運動能增強星狀膠質細胞 AQP4 極化分佈，放大夜間清洗效率。',
    ],
    actionable_rules_en: [
      'Lateral sleeping posture: Animal and human imaging demonstrate lateral recumbent posture optimizes convective glymphatic clearance over supine.',
      '3-hour pre-bed fast: Postprandial insulin surges and gastric digestion delay deep N3 onset, stifling glymphatic inflow.',
      'Zone 2 daytime conditioning: Sustained aerobic exercise enhances perivascular AQP4 polarization, amplifying nocturnal clearing volume.',
    ],
  },
  {
    id: 'SL-03',
    title_zh: '晝夜節律生物鐘：視交叉上核 (SCN) 與光照時序',
    title_en: 'Circadian Biology: The SCN Master Clock & Photoperiod Signaling',
    category: 'CIRCADIAN_BIOLOGY',
    one_liner_zh: '控制睡眠的不是意志力，而是清晨進到視網膜的那一束陽光。',
    one_liner_en: 'Sleep is not governed by willpower, but by the photon signal entering your retinas at sunrise.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '下視丘視交叉上核 (SCN) 為中樞主時鐘，透過內生感光視網膜神經節細胞 (ipRGCs) 與黑視素 (Melanopsin) 感知光線。',
      '清晨 10,000+ lux 戶外全光譜光線進入眼睛，瞬間抑制松果體，激發皮質醇晨峰 (CAR)，並開啟 14–16 小時後的褪黑激素釋放倒數計時器。',
      '晚間 460–480 nm 藍光波段（手機螢幕、LED 頂燈）即使僅 30 lux 也能強力阻斷松果體分泌褪黑激素達 50% 以上。',
      '核心體溫節律：入睡前必須下降 0.5–1.0°C，臥室環境溫度維持在 18–20°C 是生理入睡臨界點。',
    ],
    mechanisms_en: [
      'The suprachiasmatic nucleus (SCN) acts as master clock, receiving photic input via melanopsin-expressing intrinsically photosensitive retinal ganglion cells (ipRGCs).',
      'Morning solar exposure (>10,000 lux) arrests pineal melatonin synthesis, triggers the cortisol awakening response (CAR), and sets a 14-16 hr timer for evening melatonin surge.',
      'Evening exposure to 460-480nm blue photons (smartphones, overhead LEDs) suppresses melatonin production by >50% even at modest illuminance (30-50 lux).',
      'Core body temperature must drop 0.5–1.0°C to initiate sleep; ambient bedroom temperature of 18–20°C (65–68°F) is physiologically optimal.',
    ],
    actionable_rules_zh: [
      '晨間光照處方：起床後 30–60 分鐘內，走出戶外接觸陽光 10–20 分鐘（陰天 20–30 分鐘，不戴太陽眼鏡直視天空非直視太陽）。',
      '夜間光線降噪：睡前 2 小時關閉強烈頂燈，切換為低位溫暖暖色光源（<2700K）；手機開啟夜間防藍光模式或配戴濾藍光鏡片。',
      '降溫熱水澡效應：睡前 90 分鐘泡溫熱水澡 15 分鐘，能促進四肢末梢血管擴張，出浴後促使核心體溫斷崖式快速散熱引發睡意。',
    ],
    actionable_rules_en: [
      'Morning photon protocol: Step outside within 30-60 min of waking for 10-20 min of direct sunlight (cloudy days: 20-30 min; no sunglasses).',
      'Evening low-lux shielding: Turn off overhead lights 2 hours pre-bed; use low-level warm amber illumination (<2700K).',
      'Warm bath paradoxical cooling: A 15-min warm bath 90 min before sleep dilates peripheral microvasculature, dumping core heat rapidly.',
    ],
  },
  {
    id: 'SL-04',
    title_zh: '失眠的科學解答：CBT-I 認知行為治療與自律神經 HRV',
    title_en: 'Science-Based Insomnia Relief: CBT-I Protocols & Autonomic HRV Tracking',
    category: 'CBTI_BEHAVIOR',
    one_liner_zh: '安眠藥物僅能製造化學麻醉，第一線臨床治療唯一黃金標準是 CBT-I 行為重構。',
    one_liner_en: 'Sedative hypnotics induce chemical stupor; the clinical gold standard remains CBT-I behavioral rewiring.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '失眠的核心生化病理為中樞「過度覺醒 (Hyperarousal)」與「床—清醒痛苦」的條件反射錯誤連結。',
      '鎮靜催眠藥物（如 Benzodiazepines, Z-drugs）強制增強 GABA-A 受體，雖然縮短入睡時間，但殘暴破壞 N3 慢波與 REM 睡眠架構。',
      '心率變異度 (HRV, 特別是 RMSSD) 直接反映迷走神經 (Vagus Nerve) 副交感活性；夜間高 HRV 代表自律神經成功修復蓄電。',
    ],
    mechanisms_en: [
      'Insomnia pathogenesis stems from central hyperarousal and Pavlovian classical conditioning associating the bed with frustration and alertness.',
      'Pharmacological hypnotics (BZD, Z-drugs) act via positive allosteric modulation of GABA-A, producing sedation while fragmenting N3 and REM sleep architecture.',
      'Heart Rate Variability (HRV / RMSSD) reflects cardiac parasympathetic vagal modulation; higher nocturnal HRV signifies deep systemic recovery.',
    ],
    actionable_rules_zh: [
      '刺激控制法 (Stimulus Control)：床只保留給睡眠與親密關係。若躺下 20 分鐘依然毫無睡意，立刻離開床鋪至微暗房間進行放鬆閱讀，直至睏意湧現才回床。',
      '禁止在床上滑手機、追劇、工作或焦慮看時鐘（把時鐘轉向看不見角度）。',
      '咖啡因半衰期管理：咖啡因人體平均半衰期約 5–7 小時、四分之一衰期達 12 小時。下午 2 點（就寢前 10 小時）後嚴禁任何含咖啡因飲品。',
    ],
    actionable_rules_en: [
      'Stimulus Control Rule: Reserve the bed strictly for sleep and intimacy. If awake after 20 minutes, get out of bed into a dimly lit room until drowsy.',
      'Banish clock-watching and screen use in the bedroom; conceal digital clock displays to prevent cognitive anxiety amplification.',
      'Caffeine quarter-life cutoff: Caffeine clearance has an average half-life of 5-7 hrs and quarter-life of 12 hrs; abstain from caffeine past 2:00 PM.',
    ],
  },
  {
    id: 'SL-05',
    title_zh: '睡前 4-7-8 呼吸與慢波深睡誘發：神經生理學入睡開關',
    title_en: 'Pre-Sleep 4-7-8 Breathwork & Slow-Wave Sleep Induction',
    category: 'CBTI_BEHAVIOR',
    one_liner_zh: '8 秒延長吐氣強迫迷走神經釋放乙醯膽鹼，阻斷睡前皮質醇反芻，引導大腦滑入慢波深睡。',
    one_liner_en: '8-second prolonged exhale triggers vagal acetylcholine surge, blunting nocturnal cortisol and ushering SWS sleep.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '入睡延遲 (Sleep Onset Latency) 過長的主因在於夜間交感神經高張力與腦波處於 Beta 頻段。',
      '4-7-8 呼吸透過 7 秒閉氣溫和蓄積二氧化碳，刺激腦微血管舒張（波耳效應），8 秒極慢長呼氣活化感壓受器，向竇房結持續釋放乙醯膽鹼。',
      '阻斷睡前焦慮反芻，誘導下視丘分泌褪黑激素，使腦電波快速平滑過渡至 Alpha 與 Theta 波，為前半夜 N3 慢波深睡鋪平道路。',
    ],
    mechanisms_en: [
      'Prolonged sleep latency is primarily driven by nocturnal sympathetic hyperarousal and persistent Beta brainwaves.',
      '4-7-8 breathwork gently elevates PaCO2 during the 7s hold to optimize cerebral perfusion, while the 8s exhale drives steady acetylcholine onto the heart.',
      'Interrupts pre-sleep rumination, facilitating melatonin synthesis and a seamless transition from Beta to calming Theta and restorative N3 slow waves.',
    ],
    actionable_rules_zh: [
      '熄燈後 4 循環儀式：躺平在床上，舌尖輕抵上顎門牙後方，鼻吸 4 秒、閉氣 7 秒、微開唇縫長吐 8 秒，連續進行 4 個循環。',
      '配合腹部微起伏：吸氣時感受腹部如氣球微膨，吐氣時肚臍向脊椎放鬆下陷，消除肩頸肌電緊繃。',
      '初學者切忌站姿練習：因閉氣與長呼氣會使血壓微降，躺姿或靠坐為唯一安全姿態。',
    ],
    actionable_rules_en: [
      'Bedtime 4-cycle ritual: Lie flat, tongue behind upper front teeth; 4s nasal inhale, 7s hold, 8s pursed-lip exhale for 4 cycles.',
      'Synchronize with abdominal rise: Allow the belly to expand gently on inhale and sink on exhale, extinguishing trapezius tension.',
      'Always practice supine or seated: Transient baroreflex blood pressure dips necessitate a lying posture for beginners.',
    ],
  },
];

// ── 咖啡因藥物動力學與腺苷受體競爭模型 (Caffeine Pharmacokinetics Model) ──
export interface CaffeineDoseOption {
  name_zh: string;
  name_en: string;
  doseMg: number;
}

export const COMMON_CAFFEINE_SOURCES: CaffeineDoseOption[] = [
  { name_zh: '義式濃縮咖啡 (Espresso 單份)', name_en: 'Espresso (Single Shot)', doseMg: 65 },
  { name_zh: '美式黑咖啡 (中杯 360ml)', name_en: 'Americano (Medium)', doseMg: 150 },
  { name_zh: '大杯精品手沖 / 冰美式 (480ml)', name_en: 'Large Pour-Over / Iced Black', doseMg: 220 },
  { name_zh: '能量飲料 (Red Bull / Monster 1 罐)', name_en: 'Energy Drink (1 can)', doseMg: 80 },
  { name_zh: '重焙烏龍茶 / 綠茶 (500ml 保溫瓶)', name_en: 'Brewed Oolong / Green Tea (500ml)', doseMg: 70 },
  { name_zh: '拿鐵 / 卡布奇諾 (中杯雙份濃縮)', name_en: 'Latte / Cappuccino (Double Shot)', doseMg: 130 },
];

export const CYP1A2_METABOLIC_PROFILES = {
  FAST: {
    label_zh: '快代謝型 (CYP1A2 *1A/*1A)',
    halfLifeHours: 3.5,
    description_zh: '肝臟細胞色素 P450 1A2 活性旺盛，咖啡因清除迅速；但午後過量依然會延遲褪黑激素釋放。',
  },
  AVERAGE: {
    label_zh: '一般常人型 (CYP1A2 *1A/*1F)',
    halfLifeHours: 5.5,
    description_zh: '人群最普遍表型。下午 2 點飲用 200mg 咖啡因，晚間 11 點就寢時體內仍殘留約 64mg（相當於睡前喝了一杯義式濃縮）！',
  },
  SLOW: {
    label_zh: '慢代謝型 (CYP1A2 *1F/*1F 或服用口服避孕藥)',
    halfLifeHours: 8.5,
    description_zh: '半衰期極長，咖啡因在血液中滯留超過 16 小時！午後飲用幾乎 100% 嚴重毀損夜間慢波深睡 (N3 SWS)。',
  },
};

// ── CBT-I 睡眠限制療法 (Sleep Restriction Therapy) 臨床指引 ──
export const CBTI_TITRATION_RULES = {
  optimal_efficiency_min: 85, // SE >= 85%: 擴大睡眠窗口 15-30 分鐘
  suboptimal_efficiency_min: 80, // 80% <= SE < 85%: 維持目前臥床時間
  poor_efficiency_max: 80, // SE < 80%: 限縮臥床時間 15-30 分鐘
  minimum_safe_window_hours: 5.0, // 安全底線：臥床時間不可低於 5 小時
};

// ── STOP-BANG 阻塞型睡眠呼吸中止症 (OSA) 臨床篩檢量表 ──
export const STOP_BANG_QUESTIONS = [
  {
    id: 'SB-01',
    letter: 'S',
    title_zh: '打鼾 (Snoring)',
    description_zh: '您的打鼾聲是否非常大聲？（比一般說話聲更大，或隔著關閉的房門都能聽見）',
    risk_weight: 1,
  },
  {
    id: 'SB-02',
    letter: 'T',
    title_zh: '日間疲勞嗜睡 (Tiredness)',
    description_zh: '您在白天是否經常感到精疲力竭、疲倦無力，或在看電視、開車停紅燈時容易打瞌睡？',
    risk_weight: 1,
  },
  {
    id: 'SB-03',
    letter: 'O',
    title_zh: '目擊呼吸暫停 (Observed Apnea)',
    description_zh: '是否曾有同睡伴侶或家人注意到您在睡眠中「呼吸中斷暫停、嗆到或窒息驚醒」？',
    risk_weight: 1,
  },
  {
    id: 'SB-04',
    letter: 'P',
    title_zh: '高血壓病史 (Blood Pressure)',
    description_zh: '您是否已被醫師診斷患有高血壓，或目前正在規律服用降血壓藥物？',
    risk_weight: 1,
  },
  {
    id: 'SB-05',
    letter: 'B',
    title_zh: '身體質量指數 (BMI)',
    description_zh: '您的身體質量指數 BMI 是否大於 30 kg/m²？（亞洲族群若 > 27.5 kg/m² 即屬高危險）',
    risk_weight: 1,
  },
  {
    id: 'SB-06',
    letter: 'A',
    title_zh: '年齡 (Age)',
    description_zh: '您的年齡是否超過 50 歲？',
    risk_weight: 1,
  },
  {
    id: 'SB-07',
    letter: 'N',
    title_zh: '頸圍粗度 (Neck Circumference)',
    description_zh: '襯衫領圍是否偏緊？（男性頸圍 ≥ 40 cm / 16 英吋，女性頸圍 ≥ 38 cm / 15 英吋）',
    risk_weight: 1,
  },
  {
    id: 'SB-08',
    letter: 'G',
    title_zh: '生理性別 (Gender)',
    description_zh: '您的生理性別是否為男性？（男性呼吸道解剖結構受雄性激素影響，軟顎塌陷率較高）',
    risk_weight: 1,
  },
];
