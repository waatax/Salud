/**
 * Lightweight sidebar index for the clinical tree — kept separate from the heavy
 * condition data so the sidebar does not pull every care pathway into the main bundle.
 * The order here is the display order everywhere; `clinic.test.ts` checks it stays in
 * sync with ALL_DEPARTMENTS and DIVISIONS.
 */
export const CLINIC_NAV: { division: string; division_zh: string; depts: { id: string; name_zh: string }[] }[] = [
  {
    division: 'internal',
    division_zh: '🫀 內科系',
    depts: [
      { id: 'cardiology', name_zh: '心臟內科' },
      { id: 'pulmonology', name_zh: '胸腔內科' },
      { id: 'gastro', name_zh: '胃腸肝膽科' },
      { id: 'nephrology', name_zh: '腎臟科' },
      { id: 'endocrine', name_zh: '內分泌新陳代謝科' },
      { id: 'hemonc', name_zh: '血液腫瘤科' },
      { id: 'med_oncology', name_zh: '腫瘤內科' },
      { id: 'infectious', name_zh: '感染科' },
      { id: 'rheumatology', name_zh: '風濕免疫過敏科' },
      { id: 'general_internal', name_zh: '一般內科 · 整合醫學' },
    ],
  },
  {
    division: 'surgery',
    division_zh: '🩺 外科系',
    depts: [
      { id: 'general_surgery', name_zh: '一般外科' },
      { id: 'breast_surgery', name_zh: '乳房外科' },
      { id: 'colorectal', name_zh: '大腸直腸外科' },
      { id: 'cv_surgery', name_zh: '心臟血管外科' },
      { id: 'thoracic', name_zh: '胸腔外科' },
      { id: 'neurosurgery', name_zh: '神經外科' },
      { id: 'plastic', name_zh: '整形外科' },
      { id: 'pediatric_surgery', name_zh: '小兒外科' },
      { id: 'urology', name_zh: '泌尿科' },
    ],
  },
  {
    division: 'ortho',
    division_zh: '🦴 骨科部',
    depts: [
      { id: 'orthopedics', name_zh: '一般骨科 · 關節重建' },
      { id: 'sports_med', name_zh: '運動醫學科' },
      { id: 'hand_foot', name_zh: '手足外科' },
      { id: 'ortho_trauma', name_zh: '骨外傷科' },
    ],
  },
  {
    division: 'women_children',
    division_zh: '🤱 婦產部 · 小兒部',
    depts: [
      { id: 'obstetrics', name_zh: '產科' },
      { id: 'gynecology', name_zh: '婦科' },
      { id: 'reproductive', name_zh: '生殖醫學' },
      { id: 'neonatology', name_zh: '新生兒科' },
      { id: 'pediatrics', name_zh: '兒科' },
      { id: 'child_development', name_zh: '兒童發展 · 青少年' },
    ],
  },
  {
    division: 'neuro_psych',
    division_zh: '🧠 神經 · 精神 · 睡眠',
    depts: [
      { id: 'neurology', name_zh: '神經內科' },
      { id: 'psychiatry', name_zh: '精神科' },
      { id: 'sleep_med', name_zh: '睡眠醫學' },
    ],
  },
  {
    division: 'head_sense',
    division_zh: '👁️ 五官 · 皮膚 · 口腔',
    depts: [
      { id: 'ophthalmology', name_zh: '眼科' },
      { id: 'ent', name_zh: '耳鼻喉頭頸科' },
      { id: 'dermatology', name_zh: '皮膚科' },
      { id: 'dentistry', name_zh: '牙科 · 口腔醫學' },
    ],
  },
  {
    division: 'primary_geriatric',
    division_zh: '🏡 家醫 · 高齡 · 安寧 · 職業',
    depts: [
      { id: 'family_med', name_zh: '家庭醫學科' },
      { id: 'geriatrics', name_zh: '高齡醫學科' },
      { id: 'palliative', name_zh: '安寧緩和醫療' },
      { id: 'occupational', name_zh: '職業及環境醫學' },
    ],
  },
  {
    division: 'rehab_integrative',
    division_zh: '🤸 復健 · 營養 · 中醫',
    depts: [
      { id: 'rehab', name_zh: '復健科' },
      { id: 'nutrition', name_zh: '臨床營養' },
      { id: 'tcm', name_zh: '中醫部' },
    ],
  },
  {
    division: 'acute_periop',
    division_zh: '🚑 急診 · 重症 · 麻醉',
    depts: [
      { id: 'emergency', name_zh: '急診醫學科' },
      { id: 'critical_care', name_zh: '重症醫學' },
      { id: 'anesthesia', name_zh: '麻醉疼痛科' },
    ],
  },
  {
    division: 'diagnostic_support',
    division_zh: '🔬 影像 · 檢驗 · 基因 · 放腫',
    depts: [
      { id: 'imaging', name_zh: '影像醫學 · 核醫' },
      { id: 'lab_medicine', name_zh: '檢驗醫學 · 病理' },
      { id: 'genetics', name_zh: '基因醫學' },
      { id: 'radiation_oncology', name_zh: '放射腫瘤科' },
    ],
  },
];

export const CLINIC_DEPT_COUNT = CLINIC_NAV.reduce((n, g) => n + g.depts.length, 0);
