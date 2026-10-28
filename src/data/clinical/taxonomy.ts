import type { Division, DivisionId, LifeStage, MedBlockId } from './types';

/**
 * Taxonomy of the clinical tree (v6.1): divisions, med-school organ blocks, life stages.
 *
 * Divisions follow how Taiwanese medical centres group their 部 — NTUH and VGH keep 骨科部,
 * 家庭醫學部, 老年醫學部／高齡醫學中心, 腫瘤醫學部, 基因醫學部 and the diagnostic 部 separate from
 * 內科部 and 外科部 — and how the clerkship year rotates students through them.
 */
export const DIVISIONS: Division[] = [
  {
    id: 'internal',
    emoji: '🫀',
    name_zh: '內科系',
    name_en: 'Internal Medicine',
    desc_zh: '以藥物、生活型態與長期追蹤處理器官疾病：心臟、胸腔、胃腸肝膽、腎臟、內分泌、血液、腫瘤內科、感染、風濕免疫與一般內科。',
    curriculum_zh: '器官系統整合課程（心血管、呼吸、消化、腎臟、內分泌、血液腫瘤、感染免疫）→ 內科見實習',
  },
  {
    id: 'surgery',
    emoji: '🩺',
    name_zh: '外科系',
    name_en: 'Surgery',
    desc_zh: '手術與介入治療：術前評估、加速康復 ERAS、傷口與引流管照護、分期活動與營養，涵蓋一般外科到泌尿科。',
    curriculum_zh: '外科學總論、解剖學 → 外科核心見實習與次專科輪訓',
  },
  {
    id: 'ortho',
    emoji: '🦴',
    name_zh: '骨科部',
    name_en: 'Orthopaedics & Sports Medicine',
    desc_zh: '依臺大骨科部分科：一般骨科與關節重建、運動醫學、手足外科、骨外傷——從退化性關節炎到運動傷害與骨折康復。',
    curriculum_zh: '肌肉骨骼系統模組 → 骨科見習',
  },
  {
    id: 'women_children',
    emoji: '🤱',
    name_zh: '婦產部 · 小兒部',
    name_en: "Women's & Children's",
    desc_zh: '婦科、產科、生殖醫學；新生兒、一般兒科、兒童發展與青少年。從備孕、懷孕、產後到 18 歲。',
    curriculum_zh: '生殖與生長發育模組 → 婦產科、小兒科核心見實習',
  },
  {
    id: 'neuro_psych',
    emoji: '🧠',
    name_zh: '神經 · 精神 · 睡眠',
    name_en: 'Neuroscience, Psychiatry & Sleep',
    desc_zh: '腦中風、失智、巴金森、頭痛；憂鬱、焦慮、成癮；以及跨科合作的睡眠醫學。',
    curriculum_zh: '神經科學與行為科學模組 → 神經科、精神科見實習',
  },
  {
    id: 'head_sense',
    emoji: '👁️',
    name_zh: '五官 · 皮膚 · 口腔',
    name_en: 'Eye, ENT, Skin & Oral',
    desc_zh: '視覺、聽覺平衡、鼻咽喉與頭頸、皮膚與口腔——最直接影響生活品質的器官。',
    curriculum_zh: '感官與皮膚模組 → 眼科、耳鼻喉科、皮膚科、牙科見習',
  },
  {
    id: 'primary_geriatric',
    emoji: '🏡',
    name_zh: '家醫 · 高齡 · 安寧 · 職業',
    name_en: 'Family, Geriatric, Palliative & Occupational',
    desc_zh: '預防保健與全人照護的第一線：家庭醫學、高齡醫學、安寧緩和醫療，以及工作與環境造成的健康問題。',
    curriculum_zh: '家庭醫學、社區醫學、老年醫學、醫學倫理 → 社區與高齡見習',
  },
  {
    id: 'rehab_integrative',
    emoji: '🤸',
    name_zh: '復健 · 營養 · 中醫',
    name_en: 'Rehabilitation, Nutrition & Integrative',
    desc_zh: '物理治療、職能治療、語言吞嚥治療；臨床營養與管灌；有實證支持的中醫整合療法。',
    curriculum_zh: '復健醫學見習、臨床營養學、傳統醫學選修',
  },
  {
    id: 'acute_periop',
    emoji: '🚑',
    name_zh: '急診 · 重症 · 麻醉',
    name_en: 'Emergency, Critical Care & Anaesthesia',
    desc_zh: '急診分流與急救、加護病房與重症後康復、圍手術期麻醉、鎮靜與疼痛控制。',
    curriculum_zh: '急診醫學、重症醫學、麻醉學見實習',
  },
  {
    id: 'diagnostic_support',
    emoji: '🔬',
    name_zh: '影像 · 檢驗 · 基因 · 放腫',
    name_en: 'Imaging, Lab, Genetics & Radiation Oncology',
    desc_zh: '看不見病人卻決定診斷的科：影像與核醫、檢驗與病理、基因醫學，以及放射腫瘤治療。教你檢查前準備與看懂報告。',
    curriculum_zh: '放射線學、臨床病理學、醫學遺傳學、腫瘤學 → 支援科見習',
  },
];

export const DIVISION_ORDER: DivisionId[] = DIVISIONS.map((d) => d.id);

/** Top-three Taiwanese medical schools and how their curricula are staged. */
export const MED_SCHOOLS = [
  {
    id: 'NTU',
    name_zh: '臺灣大學醫學系',
    hospital_zh: '主要教學醫院：臺大醫院',
    stages_zh: [
      '一、二年級：通識、醫學人文與基礎科學',
      '三、四年級：基礎醫學與器官系統整合課程（心血管、呼吸、消化、腎泌尿、內分泌、神經、肌肉骨骼、生殖發育…）',
      '五、六年級：臨床見實習（內、外、婦、兒核心科與各次專科輪訓）',
      '畢業後：兩年畢業後一般醫學訓練（PGY）',
    ],
  },
  {
    id: 'NYCU',
    name_zh: '陽明交通大學醫學系',
    hospital_zh: '主要教學醫院：臺北榮總',
    stages_zh: [
      '一、二年級：醫學人文與通識教育',
      '三、四年級：PBL 問題導向學習 + 整合式基礎與臨床醫學課程（自 93 學年起整合解剖、組織、生理、微免、病理等，107 學年起 PBL 加入標準化病人）',
      '五、六年級：臨床實習訓練',
      '畢業後：PGY 兩年',
    ],
  },
  {
    id: 'NCKU',
    name_zh: '成功大學醫學系',
    hospital_zh: '主要教學醫院：成大醫院',
    stages_zh: [
      '一、二年級：通識、基礎科學與醫學人文',
      '三、四年級：基礎醫學與系統整合課程',
      '五、六年級：成大醫院臨床見實習輪訓',
      '畢業後：PGY 兩年',
    ],
  },
];

/** Organ-system / clerkship blocks: the view a medical student uses to study the same tree. */
export const MED_BLOCKS: { id: MedBlockId; name_zh: string; emoji: string; desc_zh: string; depts: string[] }[] = [
  { id: 'cardio', emoji: '❤️', name_zh: '心臟血管系統', desc_zh: '血壓、冠心病、心衰竭、心律不整、瓣膜與血管手術', depts: ['cardiology', 'cv_surgery'] },
  { id: 'resp', emoji: '🫁', name_zh: '呼吸系統', desc_zh: '氣喘、COPD、肺炎、肺結節與胸腔手術', depts: ['pulmonology', 'thoracic'] },
  { id: 'gi', emoji: '🍽️', name_zh: '消化系統', desc_zh: '胃食道、肝膽胰、大腸直腸與腹部手術', depts: ['gastro', 'general_surgery', 'colorectal'] },
  { id: 'renal_uro', emoji: '💧', name_zh: '腎臟泌尿系統', desc_zh: '慢性腎病、透析、結石、攝護腺與泌尿腫瘤', depts: ['nephrology', 'urology'] },
  { id: 'endo', emoji: '⚖️', name_zh: '內分泌與代謝', desc_zh: '糖尿病、甲狀腺、血脂、骨鬆與代謝症候群', depts: ['endocrine'] },
  { id: 'heme_onc', emoji: '🎗️', name_zh: '血液與腫瘤', desc_zh: '貧血、血液癌、化療標靶免疫、乳房與放射治療', depts: ['hemonc', 'med_oncology', 'breast_surgery', 'radiation_oncology'] },
  { id: 'infect_immune', emoji: '🛡️', name_zh: '感染與免疫', desc_zh: '感染症、疫苗、風濕免疫與過敏', depts: ['infectious', 'rheumatology'] },
  { id: 'neuro', emoji: '🧠', name_zh: '神經科學', desc_zh: '中風、失智、巴金森、頭痛、腦部與脊椎手術、睡眠', depts: ['neurology', 'neurosurgery', 'sleep_med'] },
  { id: 'behavior', emoji: '💭', name_zh: '行為科學與精神醫學', desc_zh: '憂鬱、焦慮、成癮、兒童發展與青少年心理', depts: ['psychiatry', 'child_development'] },
  { id: 'msk', emoji: '🦴', name_zh: '肌肉骨骼與復健', desc_zh: '關節、運動傷害、手足、骨折與復健', depts: ['orthopedics', 'sports_med', 'hand_foot', 'ortho_trauma', 'rehab'] },
  { id: 'repro_growth', emoji: '👶', name_zh: '生殖、生長與發育', desc_zh: '孕產、婦科、生殖、新生兒、兒科與小兒外科、遺傳', depts: ['obstetrics', 'gynecology', 'reproductive', 'pediatrics', 'neonatology', 'pediatric_surgery', 'genetics'] },
  { id: 'sense_skin', emoji: '👂', name_zh: '感官、皮膚與口腔', desc_zh: '眼、耳鼻喉、皮膚、牙科與整形重建', depts: ['ophthalmology', 'ent', 'dermatology', 'dentistry', 'plastic'] },
  { id: 'acute', emoji: '🚑', name_zh: '急重症與麻醉', desc_zh: '急診、加護與圍手術期', depts: ['emergency', 'critical_care', 'anesthesia'] },
  { id: 'community', emoji: '🏡', name_zh: '家庭、社區與高齡醫學', desc_zh: '預防保健、多重慢性病、高齡、安寧、職業、營養與中醫', depts: ['family_med', 'general_internal', 'geriatrics', 'palliative', 'occupational', 'nutrition', 'tcm'] },
  { id: 'diagnostics', emoji: '🔬', name_zh: '臨床診斷學', desc_zh: '影像、核醫、檢驗、病理', depts: ['imaging', 'lab_medicine'] },
];

export const LIFE_STAGES: { id: LifeStage; name_zh: string; emoji: string; desc_zh: string }[] = [
  { id: 'pregnancy', emoji: '🤰', name_zh: '備孕 · 懷孕 · 產後', desc_zh: '孕前檢查、產檢、妊娠併發症、產後恢復' },
  { id: 'infant', emoji: '🍼', name_zh: '新生兒 · 嬰幼兒', desc_zh: '0–3 歲：新生兒篩檢、黃疸、疫苗、發展' },
  { id: 'child', emoji: '🧒', name_zh: '兒童 · 青少年', desc_zh: '3–18 歲：成長、學習、情緒、運動傷害' },
  { id: 'adult', emoji: '🧑', name_zh: '成人', desc_zh: '18–64 歲：慢性病預防、工作與癌症篩檢' },
  { id: 'older', emoji: '🧓', name_zh: '高齡', desc_zh: '65 歲以上：衰弱、跌倒、多重用藥、失智' },
  { id: 'end_of_life', emoji: '🕊️', name_zh: '生命末期', desc_zh: '預立醫療決定、安寧緩和、居家善終' },
];

/** Default life stages per department; a condition may override with `life_stages`. */
export const DEPT_LIFE_STAGES: Record<string, LifeStage[]> = {
  obstetrics: ['pregnancy'],
  reproductive: ['adult', 'pregnancy'],
  gynecology: ['adult', 'older'],
  neonatology: ['infant'],
  pediatrics: ['infant', 'child'],
  child_development: ['infant', 'child'],
  pediatric_surgery: ['infant', 'child'],
  geriatrics: ['older'],
  palliative: ['end_of_life', 'older'],
  genetics: ['pregnancy', 'infant', 'adult'],
  sports_med: ['child', 'adult'],
};

export const blockOf = (deptId: string): MedBlockId =>
  MED_BLOCKS.find((b) => b.depts.includes(deptId))?.id ?? 'community';
