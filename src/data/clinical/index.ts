import type { Department, Division, DivisionId, HospitalCode, Condition } from './types';
import { INTERNAL1 } from './internal1';
import { INTERNAL2 } from './internal2';
import { SURGERY } from './surgery';
import { WOMEN_NEURO } from './womenNeuro';
import { SENSE_REHAB } from './senseRehab';

export * from './types';

/** Four reference medical centres whose department lists define Salud's clinical tree. */
export const HOSPITALS: Record<HospitalCode, { name_zh: string; short_zh: string; city_zh: string; url: string }> = {
  NTUH: { name_zh: '國立臺灣大學醫學院附設醫院', short_zh: '臺大', city_zh: '臺北', url: 'https://www.ntuh.gov.tw/' },
  NCKUH: { name_zh: '國立成功大學醫學院附設醫院', short_zh: '成大', city_zh: '臺南', url: 'https://www.hosp.ncku.edu.tw/' },
  VGH: { name_zh: '榮民總醫院（臺北／臺中／高雄）', short_zh: '榮總', city_zh: '北中高', url: 'https://www.vghtpe.gov.tw/' },
  CCH: { name_zh: '彰化基督教醫院', short_zh: '彰基', city_zh: '彰化', url: 'https://www.cch.org.tw/' },
};

/** Top-three Taiwanese medical schools and how their curricula are staged. */
export const MED_SCHOOLS = [
  {
    id: 'NTU',
    name_zh: '臺灣大學醫學系',
    stages_zh: ['M1–M2 通識與基礎醫學（解剖、生理、生化）', 'M3–M4 器官系統整合模組（心血管、呼吸、消化、腎泌尿、內分泌、神經、肌肉骨骼…）', 'M5 臨床見習（內外婦兒核心＋次專科輪訓）', 'M6 實習醫學生／PGY 兩年畢業後一般醫學訓練'],
  },
  {
    id: 'NYCU',
    name_zh: '陽明交通大學醫學系',
    stages_zh: ['基礎醫學與人文（含社區醫學、醫學人文）', '器官系統整合課程 + PBL 問題導向學習', '臨床見習（臺北榮總為主要教學醫院）', '實習醫學生 → PGY'],
  },
  {
    id: 'NCKU',
    name_zh: '成功大學醫學系',
    stages_zh: ['基礎醫學（含醫學工程、微生物免疫）', '系統整合課程（心臟血管學、胸腔學、腸胃學、腎臟學…）', '成大醫院臨床見習輪訓', '實習醫學生 → PGY'],
  },
];

export const DIVISIONS: Division[] = [
  { id: 'internal', name_zh: '內科部', name_en: 'Internal Medicine', desc_zh: '以藥物、生活型態與長期追蹤處理器官系統疾病：心臟、胸腔、消化、腎臟、內分泌、血液腫瘤、感染、風濕免疫、老年醫學。', curriculum_zh: '對應 M3–M4 器官系統整合模組 → M5–M6 內科見實習' },
  { id: 'surgery', name_zh: '外科部', name_en: 'Surgery', desc_zh: '以手術與介入治療為主，強調術前評估、加速康復 ERAS、傷口照護與分期復健。', curriculum_zh: '外科學總論 → 外科各次專科見實習' },
  { id: 'women_children', name_zh: '婦產部 ‧ 兒童醫學部', name_en: "Women's & Children's", desc_zh: '孕前到產後、更年期，以及從新生兒到青少年的生長發育與疾病。', curriculum_zh: '生殖系統／生長發育模組 → 婦產科、小兒科見實習' },
  { id: 'neuro_psych', name_zh: '神經醫學 ‧ 精神醫學', name_en: 'Neuroscience & Psychiatry', desc_zh: '腦中風、失智、巴金森、頭痛，以及憂鬱、焦慮、失眠與成癮。', curriculum_zh: '神經科學／行為科學模組 → 神經科、精神科見實習' },
  { id: 'head_sense', name_zh: '眼耳鼻喉 ‧ 皮膚 ‧ 口腔', name_en: 'Senses, Skin & Oral', desc_zh: '視覺、聽覺、呼吸道上段、皮膚與口腔——影響生活品質最直接的器官。', curriculum_zh: '頭頸部／皮膚模組 → 次專科見習' },
  { id: 'rehab_integrative', name_zh: '家醫 ‧ 復健 ‧ 中醫整合', name_en: 'Family, Rehab & Integrative', desc_zh: '預防保健、全人照護、物理治療與職能治療，以及有實證支持的中醫整合療法。', curriculum_zh: '家庭醫學／社區醫學／復健醫學見習' },
  { id: 'acute_support', name_zh: '急重症 ‧ 麻醉 ‧ 放射腫瘤', name_en: 'Acute Care & Support', desc_zh: '急診分流與急救、圍手術期麻醉與疼痛控制、放射治療期間照護。', curriculum_zh: '急診醫學、麻醉學、放射腫瘤學見習' },
];

export const ALL_DEPARTMENTS: Department[] = [...INTERNAL1, ...INTERNAL2, ...SURGERY, ...WOMEN_NEURO, ...SENSE_REHAB];

export const departmentsByDivision = (id: DivisionId) => ALL_DEPARTMENTS.filter((d) => d.division === id);

export const getDepartment = (id: string) => ALL_DEPARTMENTS.find((d) => d.id === id);

export const ALL_CONDITIONS: { dept: Department; cond: Condition }[] = ALL_DEPARTMENTS.flatMap((dept) =>
  dept.conditions.map((cond) => ({ dept, cond }))
);
