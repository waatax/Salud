/**
 * 「我該掛哪一科？」— symptom → department navigator (v6.1).
 *
 * Modelled on the symptom front doors of NHS 111, Healthdirect and Taiwanese hospital
 * 掛號科別指引: red flags first (119／急診), then a first stop, then specialty routes keyed by
 * the pattern a reader can recognise. Every `dept` / `cond` is checked by clinic.test.ts.
 */
export interface SymptomRoute {
  when_zh: string;
  dept: string;
  cond?: string;
}

export interface SymptomEntry {
  id: string;
  emoji: string;
  name_zh: string;
  /** Any one of these → 119 or the emergency department now. */
  emergency_zh: string[];
  /** Where to start when no specialty pattern fits. */
  first_zh: string;
  routes: SymptomRoute[];
}

export const SYMPTOMS: SymptomEntry[] = [
  {
    id: 'chest_pain',
    emoji: '💔',
    name_zh: '胸痛 · 胸悶',
    emergency_zh: ['壓迫或緊縮感持續超過 5 分鐘、休息不緩解', '合併冒冷汗、喘、噁心、昏厥', '突發撕裂樣胸背痛（疑主動脈剝離）', '突發胸痛合併喘、血氧下降'],
    first_zh: '不確定原因：家庭醫學科或心臟內科門診；症狀發作中請走急診。',
    routes: [
      { when_zh: '爬樓梯、快走時胸悶，休息幾分鐘就緩解', dept: 'cardiology', cond: 'cad_pci' },
      { when_zh: '飯後或躺下時胸口灼熱、喉嚨酸苦', dept: 'gastro', cond: 'gerd' },
      { when_zh: '瘦高年輕人突發單側胸痛、吸氣更痛', dept: 'thoracic', cond: 'pneumothorax_care' },
      { when_zh: '按壓或轉身時才痛、位置點狀清楚', dept: 'family_med' },
    ],
  },
  {
    id: 'palpitations',
    emoji: '💓',
    name_zh: '心悸 · 心跳不規則',
    emergency_zh: ['心悸合併昏厥或快昏倒', '合併胸痛或喘', '靜止心跳持續 >150 或 <40 下'],
    first_zh: '心臟內科；先用手機或血壓計記錄發作時的心跳與時間。',
    routes: [
      { when_zh: '脈搏忽快忽慢、毫無規律，65 歲以上更常見', dept: 'cardiology', cond: 'hf_af' },
      { when_zh: '手抖、怕熱、多汗、體重下降', dept: 'endocrine', cond: 'thyroid_disorders' },
      { when_zh: '突然一陣心跳狂飆、伴隨強烈恐懼，十幾分鐘後自行消退', dept: 'psychiatry', cond: 'anxiety_panic' },
      { when_zh: '臉色蒼白、容易累、爬樓梯就心跳快', dept: 'hemonc', cond: 'anemia' },
    ],
  },
  {
    id: 'dyspnea',
    emoji: '😮‍💨',
    name_zh: '喘 · 呼吸困難',
    emergency_zh: ['講話無法說完一句', '嘴唇或指甲發紫、血氧 <92%', '突發喘合併胸痛或單腳腫痛（疑肺栓塞）', '咳粉紅色泡沫痰、無法平躺'],
    first_zh: '胸腔內科；若合併腳腫或夜間需墊高枕頭，先看心臟內科。',
    routes: [
      { when_zh: '抽菸多年，慢慢走幾步就喘、早上咳痰', dept: 'pulmonology', cond: 'copd_rehab' },
      { when_zh: '夜間或清晨咳嗽、胸悶、有咻咻聲', dept: 'pulmonology', cond: 'asthma' },
      { when_zh: '躺平更喘、腳踝水腫、體重幾天內上升', dept: 'cardiology', cond: 'hf_af' },
      { when_zh: '打鼾、睡醒仍累、白天嗜睡', dept: 'sleep_med', cond: 'osa' },
    ],
  },
  {
    id: 'cough',
    emoji: '🤧',
    name_zh: '咳嗽超過 3 週',
    emergency_zh: ['咳出大量鮮血（超過一口）', '高燒合併喘、意識變差', '嬰兒咳到發紫或呼吸暫停'],
    first_zh: '家醫科或胸腔內科；咳嗽 ≥2 週合併體重減輕、夜間盜汗要驗痰排除結核。',
    routes: [
      { when_zh: '咳 2–3 週以上、體重減輕、夜間盜汗', dept: 'infectious', cond: 'hiv_prep_tb' },
      { when_zh: '健檢 LDCT 發現肺結節，或發燒咳嗽痰黃', dept: 'pulmonology', cond: 'pneumonia_nodule' },
      { when_zh: '鼻涕倒流、清喉嚨、鼻塞打噴嚏', dept: 'ent', cond: 'allergic_rhinitis_fess' },
      { when_zh: '飯後或躺下咳、伴隨火燒心', dept: 'gastro', cond: 'gerd' },
      { when_zh: '孩子夜咳、運動後咳', dept: 'pediatrics', cond: 'fever_seizure_asthma' },
    ],
  },
  {
    id: 'headache',
    emoji: '🤕',
    name_zh: '頭痛',
    emergency_zh: ['生平最劇烈、幾秒內達到高峰的「雷擊頭痛」', '合併發燒、頸部僵硬或意識改變', '合併單側無力、說話不清、視力喪失', '頭部撞擊後持續頭痛或嘔吐（尤其服用抗凝血劑者）'],
    first_zh: '神經內科；50 歲後新出現或型態改變的頭痛不要拖。',
    routes: [
      { when_zh: '反覆單側搏動痛、噁心、怕光怕吵，數小時到 3 天', dept: 'neurology', cond: 'migraine' },
      { when_zh: '後頸緊、晨起痛，家中血壓偏高', dept: 'cardiology', cond: 'hypertension' },
      { when_zh: '鼻塞、黃鼻涕、臉頰或額頭悶痛', dept: 'ent', cond: 'allergic_rhinitis_fess' },
      { when_zh: '突發劇痛合併嘔吐，已排除出血者後續追蹤', dept: 'neurosurgery', cond: 'hemorrhagic_stroke' },
    ],
  },
  {
    id: 'dizziness',
    emoji: '😵‍💫',
    name_zh: '頭暈 · 眩暈',
    emergency_zh: ['BE-FAST：平衡不穩、視力模糊、臉歪、手無力、說話不清', '合併劇烈頭痛或胸痛', '昏倒失去意識'],
    first_zh: '天旋地轉找耳鼻喉科；頭重腳輕、站起來發黑找家醫科或高齡醫學科。',
    routes: [
      { when_zh: '翻身或抬頭時天旋地轉，持續不到 1 分鐘', dept: 'ent', cond: 'hearing_loss_vertigo' },
      { when_zh: '起身眼前發黑、吃多種藥的長輩', dept: 'geriatrics', cond: 'polypharmacy_delirium' },
      { when_zh: '頭暈合併跌倒或走路不穩', dept: 'geriatrics', cond: 'falls' },
      { when_zh: '臉色蒼白、疲倦、經血量大', dept: 'hemonc', cond: 'anemia' },
    ],
  },
  {
    id: 'abdominal_pain',
    emoji: '🤢',
    name_zh: '腹痛',
    emergency_zh: ['劇痛、肚子硬如木板、不敢動', '吐血或解黑便、血便合併頭暈', '右下腹痛持續加劇合併發燒', '懷孕或可能懷孕合併下腹劇痛、出血'],
    first_zh: '家醫科或胃腸肝膽科；依疼痛位置與誘因再轉診。',
    routes: [
      { when_zh: '肚臍周圍痛後轉移到右下腹、走路震動會痛', dept: 'general_surgery', cond: 'appendicitis' },
      { when_zh: '油膩餐後右上腹或胸口下方痛，可放射到右肩', dept: 'general_surgery', cond: 'cholecystectomy' },
      { when_zh: '上腹灼痛、飯前或半夜痛醒', dept: 'gastro', cond: 'h_pylori_gastric' },
      { when_zh: '反覆腹痛、排便後緩解、腹瀉便秘交替', dept: 'gastro', cond: 'ibs_ibd' },
      { when_zh: '經期劇痛、性交痛', dept: 'gynecology', cond: 'endometriosis' },
      { when_zh: '一側腰腹絞痛、血尿', dept: 'urology', cond: 'stones_eswl_urs' },
      { when_zh: '嬰幼兒陣發性哭鬧、果醬樣血便', dept: 'pediatric_surgery', cond: 'intussusception' },
    ],
  },
  {
    id: 'bowel',
    emoji: '🚽',
    name_zh: '排便改變 · 便血',
    emergency_zh: ['大量鮮血或血塊', '黑色柏油便合併頭暈、心跳快', '腹脹嘔吐、停止排氣排便（疑腸阻塞）'],
    first_zh: '胃腸肝膽科；45 歲以上請先做國健署糞便潛血篩檢。',
    routes: [
      { when_zh: '排便習慣改變、便血、貧血或體重減輕', dept: 'gastro', cond: 'crc_polyps' },
      { when_zh: '便後滴鮮血、肛門腫痛或脫出', dept: 'colorectal', cond: 'hemorrhoids_anorectal' },
      { when_zh: '左下腹痛、發燒，曾被說有憩室', dept: 'colorectal', cond: 'diverticulitis' },
      { when_zh: '慢性腹瀉、黏液便、夜間也要跑廁所', dept: 'gastro', cond: 'ibs_ibd' },
    ],
  },
  {
    id: 'urinary',
    emoji: '💧',
    name_zh: '排尿問題',
    emergency_zh: ['完全解不出尿、下腹脹痛', '發燒寒顫合併腰痛（疑腎盂腎炎）', '大量血尿合併血塊'],
    first_zh: '男性找泌尿科；女性解尿灼熱可先看家醫科，漏尿或下墜感看婦科。',
    routes: [
      { when_zh: '男性夜尿、尿流細、尿不乾淨', dept: 'urology', cond: 'bph_turp' },
      { when_zh: '頻尿、解尿灼熱、尿液混濁', dept: 'infectious', cond: 'uti_cellulitis' },
      { when_zh: '咳嗽打噴嚏漏尿、陰道有東西掉出來', dept: 'gynecology', cond: 'pelvic_organ_prolapse' },
      { when_zh: '產後漏尿、腹部中線鼓起', dept: 'obstetrics', cond: 'postpartum_pelvic' },
      { when_zh: '無痛性血尿、PSA 偏高', dept: 'urology', cond: 'prostate_cancer_robotic' },
    ],
  },
  {
    id: 'back_pain',
    emoji: '🧍',
    name_zh: '腰痛 · 背痛',
    emergency_zh: ['大小便失禁或解不出來、會陰部麻木（馬尾症候群）', '雙腳漸進無力', '合併發燒、癌症病史或不明體重減輕', '嚴重外傷後'],
    first_zh: '多數急性腰痛 6 週內自行改善：先看復健科或家醫科，不必一開始就照 MRI。',
    routes: [
      { when_zh: '彎腰搬重物後閃到腰，沒有腳麻', dept: 'rehab', cond: 'low_back_pain_pt' },
      { when_zh: '腰痛放射到小腿、腳麻或無力', dept: 'neurosurgery', cond: 'lumbar_spine_surgery' },
      { when_zh: '45 歲前發生、晨僵超過 30 分鐘、活動後改善', dept: 'rheumatology', cond: 'sle_as' },
      { when_zh: '長輩輕微跌倒或打噴嚏後背痛、變矮', dept: 'ortho_trauma', cond: 'fracture_care' },
    ],
  },
  {
    id: 'joint_pain',
    emoji: '🦵',
    name_zh: '關節痛',
    emergency_zh: ['單一關節紅腫熱痛合併發燒（疑化膿性關節炎）', '外傷後關節變形、無法承重'],
    first_zh: '骨科或復健科；多關節晨僵或合併皮疹看風濕免疫科。',
    routes: [
      { when_zh: '上下樓梯膝蓋痛、久坐起身卡卡', dept: 'orthopedics', cond: 'knee_oa' },
      { when_zh: '大腳趾或腳踝半夜突然紅腫劇痛', dept: 'rheumatology', cond: 'gout' },
      { when_zh: '雙手多個小關節腫、晨僵超過 1 小時', dept: 'rheumatology', cond: 'rheumatoid_arthritis' },
      { when_zh: '肩膀舉不高、穿衣梳頭困難', dept: 'rehab', cond: 'msk_pain_frozen_shoulder' },
      { when_zh: '運動扭傷、膝蓋打軟腿', dept: 'sports_med', cond: 'rotator_cuff_acl' },
      { when_zh: '鼠蹊部深處痛、長期飲酒或用類固醇', dept: 'orthopedics', cond: 'hip_avn' },
    ],
  },
  {
    id: 'numbness',
    emoji: '🖐️',
    name_zh: '手麻 · 腳麻',
    emergency_zh: ['突然單側臉、手、腳麻木無力（中風）', '麻木快速往上蔓延、四肢無力（疑格林巴利）'],
    first_zh: '神經內科或復健科：先做神經傳導 / 肌電圖分辨是哪一段神經。',
    routes: [
      { when_zh: '拇指到無名指麻、半夜麻醒、甩手緩解', dept: 'hand_foot', cond: 'carpal_tunnel_trigger' },
      { when_zh: '從腰或頸放射到單側手腳', dept: 'neurosurgery', cond: 'lumbar_spine_surgery' },
      { when_zh: '糖尿病、雙腳像穿襪子般麻、傷口不易好', dept: 'hand_foot', cond: 'diabetic_foot' },
      { when_zh: '短暫單側麻木數分鐘後恢復（小中風 TIA）', dept: 'neurology', cond: 'ischemic_stroke' },
    ],
  },
  {
    id: 'fever',
    emoji: '🌡️',
    name_zh: '發燒',
    emergency_zh: ['3 個月以下嬰兒體溫 ≥38°C', '意識混亂、呼吸急促、血壓低、四肢冰冷（疑敗血症）', '化療中發燒 ≥38°C', '發燒合併頸部僵硬或出血點'],
    first_zh: '兒童看兒科；成人看家醫科或一般內科。',
    routes: [
      { when_zh: '孩子發燒、抽搐或喘', dept: 'pediatrics', cond: 'fever_seizure_asthma' },
      { when_zh: '發燒合併咳嗽、痰、喘', dept: 'pulmonology', cond: 'pneumonia_nodule' },
      { when_zh: '小腿或傷口周圍紅腫熱痛擴大', dept: 'infectious', cond: 'uti_cellulitis' },
      { when_zh: '化療或標靶治療期間發燒', dept: 'hemonc', cond: 'chemo_neutropenia' },
      { when_zh: '反覆發燒超過 3 週找不到原因', dept: 'general_internal', cond: 'unexplained_symptoms' },
    ],
  },
  {
    id: 'fatigue',
    emoji: '🥱',
    name_zh: '疲倦 · 體重減輕',
    emergency_zh: ['疲倦合併胸痛、喘或昏厥', '黑便或吐血'],
    first_zh: '一般內科或家醫科：先抽血（血球、甲狀腺、血糖、肝腎功能）。',
    routes: [
      { when_zh: '半年內體重不明下降 >5%', dept: 'general_internal', cond: 'unexplained_symptoms' },
      { when_zh: '口渴、多尿、體重下降', dept: 'endocrine', cond: 't2dm' },
      { when_zh: '怕冷、便秘、水腫、變胖', dept: 'endocrine', cond: 'thyroid_disorders' },
      { when_zh: '心情低落、沒興趣、早醒', dept: 'psychiatry', cond: 'depression' },
      { when_zh: '睡很久還是累、打鼾', dept: 'sleep_med', cond: 'osa' },
    ],
  },
  {
    id: 'sleep',
    emoji: '😴',
    name_zh: '失眠 · 打鼾 · 嗜睡',
    emergency_zh: ['睡眠中呼吸停止合併發紫', '開車打瞌睡差點出事（立即停止駕駛並就醫）'],
    first_zh: '睡眠門診（胸腔、精神、耳鼻喉或神經科的睡眠專科）。',
    routes: [
      { when_zh: '鼾聲大、被說會停止呼吸、早上頭痛', dept: 'sleep_med', cond: 'osa' },
      { when_zh: '每週 3 晚以上難入睡或早醒、持續 3 個月', dept: 'sleep_med', cond: 'insomnia_cbti' },
      { when_zh: '輪班或日夜顛倒後睡不好', dept: 'sleep_med', cond: 'shift_work_circadian' },
    ],
  },
  {
    id: 'mood',
    emoji: '🌧️',
    name_zh: '情緒低落 · 焦慮',
    emergency_zh: ['有自殺或傷害自己的想法或計畫：撥 1925 安心專線（24 小時）或 119', '出現幻聽、極度激動或傷人風險'],
    first_zh: '精神科或身心科；也可先到家醫科討論。',
    routes: [
      { when_zh: '兩週以上心情低落、失去興趣、睡眠食慾改變', dept: 'psychiatry', cond: 'depression' },
      { when_zh: '擔心停不下來、肌肉緊繃、恐慌發作', dept: 'psychiatry', cond: 'anxiety_panic' },
      { when_zh: '青少年拒學、自傷、網路成癮', dept: 'child_development', cond: 'adolescent_mental_health' },
      { when_zh: '長期加班、過勞、對工作麻木', dept: 'occupational', cond: 'overwork_burnout' },
    ],
  },
  {
    id: 'memory',
    emoji: '🧩',
    name_zh: '記憶力退步',
    emergency_zh: ['幾小時到幾天內突然變混亂、日夜顛倒（譫妄，常因感染或藥物）'],
    first_zh: '神經內科或高齡醫學科；帶熟悉狀況的家人一起去。',
    routes: [
      { when_zh: '重複問同樣問題、迷路、理財出錯，逐漸惡化', dept: 'neurology', cond: 'dementia' },
      { when_zh: '住院、手術或感染後突然混亂', dept: 'geriatrics', cond: 'polypharmacy_delirium' },
      { when_zh: '合併情緒低落、退縮', dept: 'psychiatry', cond: 'depression' },
    ],
  },
  {
    id: 'vision',
    emoji: '👁️',
    name_zh: '視力問題',
    emergency_zh: ['突然看不見或視野一塊黑影', '眼睛劇痛紅、看燈有光暈、頭痛嘔吐（急性青光眼）', '閃光與飛蚊突然大量增加（疑視網膜剝離）', '化學物質噴入眼睛：先大量清水沖洗 15 分鐘'],
    first_zh: '眼科。',
    routes: [
      { when_zh: '視力漸漸模糊、畏光、夜間開車看燈散光', dept: 'ophthalmology', cond: 'cataract_surgery' },
      { when_zh: '家族有青光眼、健檢眼壓高、周邊視野缺', dept: 'ophthalmology', cond: 'glaucoma_care' },
      { when_zh: '直線看起來扭曲、中心有暗點；孩子近視快速加深', dept: 'ophthalmology', cond: 'myopia_retina' },
    ],
  },
  {
    id: 'ear',
    emoji: '👂',
    name_zh: '聽力 · 耳鳴',
    emergency_zh: ['突然一耳聽不見：72 小時內就醫，越早用類固醇越好'],
    first_zh: '耳鼻喉科。',
    routes: [
      { when_zh: '突發單耳聽力下降或耳悶', dept: 'ent', cond: 'hearing_loss_vertigo' },
      { when_zh: '長期在噪音環境工作、雙耳漸進性聽力下降', dept: 'occupational', cond: 'noise_hearing_loss' },
    ],
  },
  {
    id: 'skin',
    emoji: '🧴',
    name_zh: '皮膚紅疹 · 癢 · 痣',
    emergency_zh: ['全身蕁麻疹合併嘴唇腫、喘、頭暈（過敏性休克）', '用藥後紅疹合併口腔眼睛潰爛、皮膚起水泡脫皮（SJS/TEN）'],
    first_zh: '皮膚科。',
    routes: [
      { when_zh: '從小反覆、很癢、皮膚乾、手肘膝窩', dept: 'dermatology', cond: 'atopic_dermatitis' },
      { when_zh: '邊界清楚的紅斑上有銀白皮屑', dept: 'dermatology', cond: 'psoriasis_care' },
      { when_zh: '痣變大、顏色不均、邊緣不規則', dept: 'dermatology', cond: 'skin_cancer_protection' },
      { when_zh: '單側帶狀分佈的刺痛水泡', dept: 'infectious', cond: 'zoster_vaccination' },
      { when_zh: '傷口或手術後疤痕隆起、癢', dept: 'plastic', cond: 'scar_keloid' },
    ],
  },
  {
    id: 'women',
    emoji: '🌸',
    name_zh: '月經 · 婦科 · 備孕',
    emergency_zh: ['大量出血（1 小時濕透一片以上、連續 2 小時）', '停經後任何出血要盡快檢查', '可能懷孕合併腹痛與出血（疑子宮外孕）'],
    first_zh: '婦產科。',
    routes: [
      { when_zh: '經血量大、有血塊、貧血', dept: 'gynecology', cond: 'fibroids_menopause_hpv' },
      { when_zh: '經痛越來越嚴重、性交痛、不孕', dept: 'gynecology', cond: 'endometriosis' },
      { when_zh: '月經稀少不規則、長痘、多毛', dept: 'reproductive', cond: 'pcos' },
      { when_zh: '嘗試懷孕 1 年（35 歲以上 6 個月）未成功', dept: 'reproductive', cond: 'infertility_art' },
      { when_zh: '計畫懷孕、想了解避孕與孕前檢查', dept: 'reproductive', cond: 'preconception_contraception' },
    ],
  },
  {
    id: 'pregnancy',
    emoji: '🤰',
    name_zh: '懷孕中的不適',
    emergency_zh: ['陰道出血或羊水流出', '頭痛、視力模糊、上腹痛、突然水腫（子癲前症）', '胎動明顯減少', '規律宮縮未滿 37 週'],
    first_zh: '產檢醫師或產科急診（多數醫院 24 小時產房）。',
    routes: [
      { when_zh: '血壓 ≥140/90、蛋白尿', dept: 'obstetrics', cond: 'preeclampsia' },
      { when_zh: '24–28 週糖水測試異常', dept: 'obstetrics', cond: 'pregnancy_gdm' },
      { when_zh: '想了解唐氏症、NIPT、羊膜穿刺', dept: 'genetics', cond: 'prenatal_genetic' },
    ],
  },
  {
    id: 'baby',
    emoji: '🍼',
    name_zh: '新生兒 · 寶寶',
    emergency_zh: ['3 個月以下發燒 ≥38°C', '活動力差、餵不起來、嘴唇發紫', '黃疸蔓延到手腳或出生 24 小時內就變黃', '大便顏色變淡（灰白、淡黃）：對照寶寶手冊大便卡，立即就醫'],
    first_zh: '兒科（新生兒科）。',
    routes: [
      { when_zh: '皮膚眼白變黃、超過 2 週未退', dept: 'neonatology', cond: 'neonatal_jaundice' },
      { when_zh: '大便顏色淡、尿色深', dept: 'pediatric_surgery', cond: 'biliary_atresia' },
      { when_zh: '早產兒出院後的追蹤', dept: 'neonatology', cond: 'preterm_infant' },
      { when_zh: '餵奶、睡眠、哭鬧與新生兒篩檢', dept: 'neonatology', cond: 'newborn_care_breastfeeding' },
      { when_zh: '鼠蹊或陰囊鼓起', dept: 'pediatric_surgery', cond: 'pediatric_hernia' },
    ],
  },
  {
    id: 'child_dev',
    emoji: '🧒',
    name_zh: '孩子發展 · 行為',
    emergency_zh: ['已會的能力突然退化（如不再說話、不會走）'],
    first_zh: '兒科或兒童發展評估中心（各縣市聯合評估中心）。',
    routes: [
      { when_zh: '說話、走路比同齡慢', dept: 'child_development', cond: 'developmental_delay' },
      { when_zh: '不看人眼睛、叫名字少回應、固著行為', dept: 'child_development', cond: 'autism' },
      { when_zh: '上課坐不住、衝動、粗心', dept: 'pediatrics', cond: 'obesity_adhd' },
    ],
  },
  {
    id: 'elder',
    emoji: '🧓',
    name_zh: '長輩跌倒 · 變虛弱',
    emergency_zh: ['跌倒後髖部痛不能站、腳變短外轉（疑髖部骨折）', '跌倒撞頭且服用抗凝血劑'],
    first_zh: '高齡醫學科（周全性老年評估）。',
    routes: [
      { when_zh: '走路變慢、提不動東西、體重減輕', dept: 'geriatrics', cond: 'frailty_sarcopenia' },
      { when_zh: '一年內跌倒 2 次以上', dept: 'geriatrics', cond: 'falls' },
      { when_zh: '吃很多種藥、常頭暈', dept: 'geriatrics', cond: 'polypharmacy_delirium' },
      { when_zh: '吃飯嗆咳、體重下降', dept: 'nutrition', cond: 'dysphagia_iddsi' },
    ],
  },
  {
    id: 'wound',
    emoji: '🩹',
    name_zh: '傷口不癒 · 燒燙傷',
    emergency_zh: ['大面積或臉、手、會陰部燒燙傷', '傷口紅腫擴散、發燒、有異味', '腳趾變黑'],
    first_zh: '整形外科或傷口照護門診；燒燙傷先「沖脫泡蓋送」。',
    routes: [
      { when_zh: '燒燙傷', dept: 'plastic', cond: 'wound_burn_care' },
      { when_zh: '臥床長輩尾椎或腳跟破皮', dept: 'plastic', cond: 'pressure_injury' },
      { when_zh: '糖尿病腳底傷口超過 2 週', dept: 'hand_foot', cond: 'diabetic_foot' },
    ],
  },
  {
    id: 'oral',
    emoji: '🦷',
    name_zh: '牙齒 · 口腔',
    emergency_zh: ['臉頰或下巴腫脹蔓延、吞嚥呼吸困難（深頸部感染）'],
    first_zh: '牙科（家庭牙醫學科）。',
    routes: [
      { when_zh: '刷牙流血、牙齦萎縮、牙齒鬆動', dept: 'dentistry', cond: 'periodontitis_care' },
      { when_zh: '缺牙、智齒腫痛', dept: 'dentistry', cond: 'dental_implant_surgery' },
      { when_zh: '口腔白斑、紅斑或潰瘍超過 2 週', dept: 'dentistry', cond: 'oral_cancer_prevention' },
    ],
  },
];
