export interface BloodPressureProtocol {
  days: number;
  timesPerDay: number;
  readingsPerTime: number;
  intervalMinutes: number;
  normalSystolicMax: number;
  normalDiastolicMax: number;
  guidelineVersion: string;
}

export const BP_722_PROTOCOL: BloodPressureProtocol = {
  days: 7, // 連續 7 天
  timesPerDay: 2, // 每天 2 個時段：晨起與就寢前
  readingsPerTime: 2, // 每次量 2 遍
  intervalMinutes: 1, // 間隔 1 分鐘取平均
  normalSystolicMax: 120, // < 120 mmHg
  normalDiastolicMax: 80, // < 80 mmHg
  guidelineVersion: '2022 Taiwan Society of Cardiology (TSOC) / THS Guidelines',
};

export interface MetSynCriterion {
  id: string;
  name_zh: string;
  name_en: string;
  threshold_zh: string;
  threshold_en: string;
  unit: string;
  biological_link_zh: string;
  biological_link_en: string;
}

export const METSYN_CRITERIA: MetSynCriterion[] = [
  {
    id: 'MET-01',
    name_zh: '腹部肥胖 (腰圍)',
    name_en: 'Abdominal Obesity (Waist Circumference)',
    threshold_zh: '男性 ≥ 90 cm，女性 ≥ 80 cm',
    threshold_en: 'Male ≥ 90 cm, Female ≥ 80 cm',
    unit: 'cm',
    biological_link_zh: '反映內臟脂肪堆積與游離脂肪酸釋出至肝門靜脈（跨章連結 Chapter O）。',
    biological_link_en: 'Reflects visceral adiposity delivering excess free fatty acids directly to the portal vein.',
  },
  {
    id: 'MET-02',
    name_zh: '血壓偏高 (Blood Pressure)',
    name_en: 'Elevated Blood Pressure',
    threshold_zh: '收縮壓 ≥ 130 mmHg 或舒張壓 ≥ 85 mmHg，或正在服用降血壓藥物',
    threshold_en: 'Systolic ≥ 130 mmHg or Diastolic ≥ 85 mmHg, or taking antihypertensives',
    unit: 'mmHg',
    biological_link_zh: '血管內皮損傷與交感神經過度活化（跨章連結 KP-A-029 酒精血壓上升與 KP-N 鈉平衡）。',
    biological_link_en: 'Endothelial dysfunction and sympathetic hyperactivation; linked to alcohol and high sodium.',
  },
  {
    id: 'MET-03',
    name_zh: '空腹血糖偏高 (Fasting Glucose)',
    name_en: 'Elevated Fasting Plasma Glucose',
    threshold_zh: '空腹血糖 ≥ 100 mg/dL，或正在服用降血糖藥物',
    threshold_en: 'Fasting glucose ≥ 100 mg/dL, or taking antidiabetic medication',
    unit: 'mg/dL',
    biological_link_zh: '胰島素阻抗與肝臟糖質新生調控失常（跨章連結 KP-A-008 酒精抑制糖質新生）。',
    biological_link_en: 'Hepatic insulin resistance and dysregulated gluconeogenesis.',
  },
  {
    id: 'MET-04',
    name_zh: '空腹三酸甘油酯偏高 (Triglycerides)',
    name_en: 'Elevated Fasting Triglycerides',
    threshold_zh: 'TG ≥ 150 mg/dL，或正在服用降三酸甘油酯藥物',
    threshold_en: 'Triglycerides ≥ 150 mg/dL, or on lipid-lowering pharmacotherapy',
    unit: 'mg/dL',
    biological_link_zh: 'VLDL 過度合成與清除障礙（跨章連結 Chapter O 等熱量置換與 Chapter A 酒精性脂肪堆積）。',
    biological_link_en: 'Hepatic VLDL overproduction and impaired lipolysis from ethanol NADH overload.',
  },
  {
    id: 'MET-05',
    name_zh: '高密度脂蛋白膽固醇偏低 (HDL-C)',
    name_en: 'Reduced HDL Cholesterol',
    threshold_zh: '男性 < 40 mg/dL，女性 < 50 mg/dL',
    threshold_en: 'Male < 40 mg/dL, Female < 50 mg/dL',
    unit: 'mg/dL',
    biological_link_zh: '反向膽固醇轉運效率下降與心血管保護力減弱（跨章連結 KP-O-027 反式脂肪雙重打擊）。',
    biological_link_en: 'Attenuated reverse cholesterol transport capacity; accelerated by trans fats and sedentary habit.',
  },
];
