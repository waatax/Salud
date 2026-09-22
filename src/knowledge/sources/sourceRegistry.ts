/**
 * sourceRegistry.ts — Salud Layer 1 Source Registry v2
 *
 * Upgraded from v1 with strict versioning, retrieval timestamps, jurisdictional scope,
 * and explicit provenance review states.
 */

import { ProvenanceLevel } from '../../types/knowledge';

export interface SourceItemV2 {
  id: string;
  title: string;
  publisher: string;
  year: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  canonical_url: string;
  version?: string;
  retrieved_date: string;
  jurisdiction: 'global' | 'taiwan' | 'us' | 'europe';
  provenance_level: ProvenanceLevel;
  status: 'active' | 'needs-provenance-review' | 'superseded';
  description_zh: string;
}

export const CANONICAL_SOURCE_REGISTRY: Record<string, SourceItemV2> = {
  'SRC-AHA-ACC-2025-HTN': {
    id: 'SRC-AHA-ACC-2025-HTN',
    title: '2025 AHA/ACC/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults',
    publisher: 'Circulation / JACC',
    year: 2025,
    grade: 'A',
    canonical_url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001200',
    version: '2025-AHA-ACC-HTN-01',
    retrieved_date: '2026-09-20',
    jurisdiction: 'us',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: '維持高血壓第 1 期切點 ≥130/80 mmHg；全面導入 PREVENT 10 年心血管風險評估（高風險閾值下修至 ≥7.5%）。',
  },

  'SRC-ACC-AHA-2026-LIPID': {
    id: 'SRC-ACC-AHA-2026-LIPID',
    title: '2026 ACC/AHA Multisociety Guideline on the Management of Blood Cholesterol',
    publisher: 'Journal of the American College of Cardiology',
    year: 2026,
    grade: 'A',
    canonical_url: 'https://www.jacc.org/doi/10.1016/j.jacc.2025.12.001',
    version: '2026-ACC-AHA-LIPID',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: '2026 多學會血脂指引：確立階梯式 LDL-C 目標（<100/<70/<55 mg/dL），首次建議每位成人一生至少檢測一次 Lp(a)，並以 apoB 進行剩餘風險再分層。',
  },

  'SRC-ADA-2026': {
    id: 'SRC-ADA-2026',
    title: 'Standards of Care in Diabetes—2026',
    publisher: 'American Diabetes Association (ADA)',
    year: 2026,
    grade: 'A',
    canonical_url: 'https://diabetesjournals.org/care/issue/49/Supplement_1',
    version: 'ADA-Living-Guideline-2026.1',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: 'ADA 糖尿病診療標準：定義空腹血糖 ≥126 mg/dL、A1C ≥6.5% 診斷邊界；2026 起全面轉型為活體指引 (Living Guideline) 全年即時動態更新。',
  },

  'SRC-KDIGO-2024-CKD': {
    id: 'SRC-KDIGO-2024-CKD',
    title: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease',
    publisher: 'Kidney International',
    year: 2024,
    grade: 'A',
    canonical_url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
    version: 'KDIGO-CKD-2024-V1',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: 'KDIGO 慢性腎臟病權威指引：確立 CGA 分期架構（原因、eGFR G1–G5、白蛋白尿 A1–A3）；確立 ≥3 個月臨床病程定義。',
  },

  'SRC-WHO-SFA-2023': {
    id: 'SRC-WHO-SFA-2023',
    title: 'Saturated Fatty Acid and Trans-Fatty Acid Intake for Adults and Children: WHO Guideline',
    publisher: 'World Health Organization (WHO)',
    year: 2023,
    grade: 'A',
    canonical_url: 'https://www.who.int/publications/i/item/9789240073630',
    version: 'WHO-NHD-2023.1',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: 'WHO 2023 指引：飽和脂肪攝取應小於總熱量 10% (<10%E)，反式脂肪 <1%E，並以多元不飽和脂肪 (PUFA) 等熱量取代。',
  },

  'SRC-WHO-SODIUM-POTASSIUM-2013': {
    id: 'SRC-WHO-SODIUM-POTASSIUM-2013',
    title: 'WHO Guidelines on Sodium and Potassium Intake for Adults and Children',
    publisher: 'World Health Organization (WHO)',
    year: 2013,
    grade: 'A',
    canonical_url: 'https://www.who.int/publications/i/item/9789241504836',
    version: 'WHO-NHD-2013-Na-K',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: 'WHO 建議成人每日鈉離子攝取上限 <2000 mg（食鹽 <5g），每日鉀離子適量攝取 ≥3510 mg。',
  },

  'SRC-IOM-2005-WATER': {
    id: 'SRC-IOM-2005-WATER',
    title: 'Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate',
    publisher: 'National Academies of Sciences, Engineering, and Medicine (NASEM / IOM)',
    year: 2005,
    grade: 'A',
    canonical_url: 'https://nap.nationalacademies.org/catalog/10925/',
    version: 'IOM-DRI-Water-2005',
    retrieved_date: '2026-09-20',
    jurisdiction: 'us',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: '定義健康成人總水適當攝取量（男性 3.7 L/日、女性 2.7 L/日，包含飲食固體水與所有液體）。',
  },

  'SRC-EFSA-2010-WATER': {
    id: 'SRC-EFSA-2010-WATER',
    title: 'Scientific Opinion on Dietary Reference Values for Water',
    publisher: 'European Food Safety Authority (EFSA)',
    year: 2010,
    grade: 'A',
    canonical_url: 'https://www.efsa.europa.eu/en/efsajournal/pub/1459',
    version: 'EFSA-NDA-2010-1459',
    retrieved_date: '2026-09-20',
    jurisdiction: 'europe',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: '歐洲食品安全局建議溫和氣候中度活動下成人男性總水 2.5 L、女性 2.0 L。',
  },

  'SRC-EAH-CONSENSUS-2015': {
    id: 'SRC-EAH-CONSENSUS-2015',
    title: 'Statement of the 3rd International Exercise-Associated Hyponatremia Consensus Development Conference',
    publisher: 'British Journal of Sports Medicine',
    year: 2015,
    grade: 'A',
    canonical_url: 'https://bjsm.bmj.com/content/49/22/1432',
    version: 'EAH-3rd-Consensus',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: '長程運動水合國際最高共識：依口渴飲水（Drink to thirst），防範過度灌注低張純水誘發運動型低血鈉 (EAH) 腦水腫。',
  },

  'SRC-WHO-IARC-ALCOHOL': {
    id: 'SRC-WHO-IARC-ALCOHOL',
    title: 'IARC Monographs on the Identification of Carcinogenic Hazards to Humans: Volume 100E (Personal Habits and Indoor Combustions - Alcohol Consumption)',
    publisher: 'International Agency for Research on Cancer (IARC / WHO)',
    year: 2012,
    grade: 'A',
    canonical_url: 'https://monographs.iarc.who.int/wp-content/uploads/2018/06/mono100E-11.pdf',
    version: 'IARC-Mono-100E',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: '確立酒精飲料及與酒精相關之乙醛為 Group 1 一級致癌物；明確聲明就致癌性而言無安全攝取劑量。',
  },

  'SRC-ALCOHOL-WATER-TRIAL-2026': {
    id: 'SRC-ALCOHOL-WATER-TRIAL-2026',
    title: 'Concurrent Water Consumption Does Not Attenuate Breath Acetaldehyde Kinetics or Next-Day Hangover Severity: A Randomized Crossover Trial',
    publisher: 'Frontiers in Pharmacology',
    year: 2026,
    grade: 'B',
    canonical_url: 'https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2026.1345678',
    version: 'FrontPharmacol-2026-Trial',
    retrieved_date: '2026-09-20',
    jurisdiction: 'global',
    provenance_level: 'verified-primary',
    status: 'active',
    description_zh: '隨機 2x2 交叉試驗（n=13，ALDH2 野生型男性，清酒 1.3 g/kg 酒精配水 15 mL/kg）：證實交替飲水未改變呼氣乙醇與乙醛時間曲線，亦無有意義減輕隔日宿醉。',
  },

  'SRC-TFDA-FRYING-2011': {
    id: 'SRC-TFDA-FRYING-2011',
    title: '食用油脂中總極性化合物之檢驗方法（署授食字第 1001900044 號公告）與餐飲油炸油稽查標準',
    publisher: '衛生福利部食品藥物管理署 (TFDA)',
    year: 2011,
    grade: 'A',
    canonical_url: 'https://www.fda.gov.tw/TC/siteContent.aspx?sid=2567',
    version: 'TFDA-1001900044',
    retrieved_date: '2026-09-20',
    jurisdiction: 'taiwan',
    provenance_level: 'regulatory-statute',
    status: 'active',
    description_zh: '台灣餐飲業油炸油法定規範：先以酸價 >2.0 初篩，總極性化合物 (TPC) >25% 即屬劣變不得繼續使用。',
  },

  'SRC-HPA-CANCER-SCREENING-2025': {
    id: 'SRC-HPA-CANCER-SCREENING-2025',
    title: '衛生福利部國民健康署擴大癌症篩檢服務政策（114 年起實施）',
    publisher: '衛生福利部國民健康署',
    year: 2025,
    grade: 'A',
    canonical_url: 'https://www.mohw.gov.tw/cp-16-79883-1.html',
    version: 'HPA-114-Screening-V1',
    retrieved_date: '2026-09-20',
    jurisdiction: 'taiwan',
    provenance_level: 'regulatory-statute',
    status: 'active',
    description_zh: '114 年擴大公費五癌篩檢（乳癌放寬至 40–74 歲、大腸癌、子宮頸癌、口腔癌、肺癌 LDCT）。',
  },
};
