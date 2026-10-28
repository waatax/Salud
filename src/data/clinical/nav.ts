/**
 * Lightweight sidebar index for the clinical tree — kept separate from the heavy
 * condition data so the sidebar does not pull every care pathway into the main bundle.
 * `clinic.test.ts` checks this list stays in sync with ALL_DEPARTMENTS.
 */
export const CLINIC_NAV: { division_zh: string; depts: { id: string; name_zh: string }[] }[] = [
  {
    division_zh: '內科部',
    depts: [
      { id: 'cardiology', name_zh: '心臟內科' },
      { id: 'pulmonology', name_zh: '胸腔內科' },
      { id: 'gastro', name_zh: '胃腸肝膽科' },
      { id: 'nephrology', name_zh: '腎臟科' },
      { id: 'endocrine', name_zh: '內分泌新陳代謝科' },
      { id: 'hemonc', name_zh: '血液腫瘤科' },
      { id: 'infectious', name_zh: '感染科' },
      { id: 'rheumatology', name_zh: '風濕免疫過敏科' },
      { id: 'geriatrics', name_zh: '老年醫學科' },
    ],
  },
  {
    division_zh: '外科部',
    depts: [
      { id: 'general_surgery', name_zh: '一般外科' },
      { id: 'breast_surgery', name_zh: '乳房外科' },
      { id: 'colorectal', name_zh: '大腸直腸外科' },
      { id: 'cv_surgery', name_zh: '心臟血管外科' },
      { id: 'thoracic', name_zh: '胸腔外科' },
      { id: 'neurosurgery', name_zh: '神經外科' },
      { id: 'orthopedics', name_zh: '骨科' },
      { id: 'urology', name_zh: '泌尿科' },
      { id: 'plastic', name_zh: '整形外科' },
    ],
  },
  {
    division_zh: '婦兒 · 神經精神',
    depts: [
      { id: 'obgyn', name_zh: '婦產科' },
      { id: 'pediatrics', name_zh: '兒科' },
      { id: 'neurology', name_zh: '神經內科' },
      { id: 'psychiatry', name_zh: '精神科' },
    ],
  },
  {
    division_zh: '眼耳鼻喉 · 皮膚 · 口腔',
    depts: [
      { id: 'ophthalmology', name_zh: '眼科' },
      { id: 'ent', name_zh: '耳鼻喉科' },
      { id: 'dermatology', name_zh: '皮膚科' },
      { id: 'dentistry', name_zh: '牙科' },
    ],
  },
  {
    division_zh: '家醫 · 復健 · 中醫',
    depts: [
      { id: 'family_med', name_zh: '家庭醫學科' },
      { id: 'rehab', name_zh: '復健科' },
      { id: 'tcm', name_zh: '中醫部' },
    ],
  },
  {
    division_zh: '急重症 · 麻醉 · 放腫',
    depts: [
      { id: 'emergency', name_zh: '急診醫學科' },
      { id: 'anesthesia', name_zh: '麻醉疼痛科' },
      { id: 'radiation_oncology', name_zh: '放射腫瘤科' },
    ],
  },
];
