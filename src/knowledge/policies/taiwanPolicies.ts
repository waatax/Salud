/**
 * taiwanPolicies.ts — Salud Layer 1 Taiwan Public Health Policy Registry
 *
 * Tracks administrative statutory guidelines with strict provenance metadata,
 * effective dates, supersedes relationships, and review statuses.
 */

import { TaiwanPolicyObject } from '../../types/knowledge';

export const CANONICAL_TAIWAN_POLICIES: Record<string, TaiwanPolicyObject> = {
  'POL-TW-COLORECTAL': {
    id: 'POL-TW-COLORECTAL',
    title_zh: '國民健康署公費大腸癌篩檢政策',
    title_en: 'Taiwan HPA Subsidized Colorectal Cancer Screening Policy',
    cancer_type: '大腸癌 (Colorectal Cancer)',
    target_population_zh: '45–74 歲民眾，以及 40–44 歲具一親等（父母、子女、兄弟姊妹）大腸癌家族史者',
    age_range_zh: '45–74 歲（一般風險）或 40–44 歲（家族史高風險）',
    screening_interval_zh: '每 2 年 1 次',
    modality_zh: '定量免疫法糞便潛血檢查 (FIT)',
    effective_from: '2020-01-01',
    policy_version: '2024-HPA-CRC-01',
    canonical_url: 'https://www.hpa.gov.tw/Pages/List.aspx?nodeid=212',
    retrieved_date: '2026-09-20',
    status: 'active',
    notes_zh: 'FIT 陽性者應於 3 個月內接受大腸鏡確診；不可因無症狀而拒絕鏡檢。',
  },

  'POL-TW-BREAST-2025': {
    id: 'POL-TW-BREAST-2025',
    title_zh: '民國 114 年擴大公費乳癌篩檢政策',
    title_en: 'Taiwan HPA Expanded Breast Cancer Screening Policy (2025 Revision)',
    cancer_type: '乳癌 (Breast Cancer)',
    target_population_zh: '40–74 歲女性（114 年起放寬年齡上下限）',
    age_range_zh: '40–74 歲',
    screening_interval_zh: '每 2 年 1 次',
    modality_zh: '乳房 X 光攝影檢查 (Mammography)',
    effective_from: '2025-01-01',
    policy_version: '114-MOHW-EXPAND-01',
    canonical_url: 'https://www.mohw.gov.tw/cp-16-79883-1.html',
    retrieved_date: '2026-09-20',
    supersedes: 'POL-TW-BREAST-LEGACY-45-69',
    status: 'active',
    notes_zh: '自 114 年元旦起年齡由原 45–69 歲全面擴大至 40–74 歲，早期偵測第 0 期與第 1 期乳癌。',
  },

  'POL-TW-ORAL': {
    id: 'POL-TW-ORAL',
    title_zh: '公費口腔癌篩檢政策',
    title_en: 'Taiwan HPA Subsidized Oral Cancer Screening Policy',
    cancer_type: '口腔癌 (Oral Cavity Cancer)',
    target_population_zh:
      '30 歲以上有嚼檳榔（含已戒）或吸菸習慣者；18 歲以上有嚼檳榔（含已戒）習慣之原住民',
    age_range_zh: '≥30 歲（一般吸菸/嚼檳榔）或 ≥18 歲（原住民嚼檳榔）',
    screening_interval_zh: '每 2 年 1 次',
    modality_zh: '牙科或耳鼻喉科醫師口腔黏膜檢查 (Oral Mucosal Examination)',
    effective_from: '2019-01-01',
    policy_version: '2023-HPA-ORAL-01',
    canonical_url: 'https://www.hpa.gov.tw/Pages/List.aspx?nodeid=214',
    retrieved_date: '2026-09-20',
    status: 'active',
    notes_zh: '檢查前應戒除菸檳；若發現紅白斑、潰瘍超過 2 週未癒合應立即切片。',
  },

  'POL-TW-CERVICAL': {
    id: 'POL-TW-CERVICAL',
    title_zh: '民國 114 年擴大公費子宮頸癌篩檢政策',
    title_en: 'Taiwan HPA Subsidized Cervical Cancer Screening Policy (2025 Revision)',
    cancer_type: '子宮頸癌 (Cervical Cancer)',
    target_population_zh: '30 歲以上女性（每 3 年至少 1 次），114 年起增列 25–29 歲女性試辦補助',
    age_range_zh: '≥30 歲常態補助；25–29 歲試辦補助',
    screening_interval_zh: '建議每年 1 次，健保給付每 3 年至少 1 次',
    modality_zh: '子宮頸抹片檢查 (Pap Smear)',
    effective_from: '2025-01-01',
    policy_version: '114-MOHW-CERV-01',
    canonical_url: 'https://www.hpa.gov.tw/Pages/List.aspx?nodeid=213',
    retrieved_date: '2026-09-20',
    status: 'active',
    notes_zh: '即使已接種 HPV 疫苗，仍應定期接受抹片檢查以維持雙重防護。',
  },

  'POL-TW-LUNG-LDCT': {
    id: 'POL-TW-LUNG-LDCT',
    title_zh: '公費肺癌早期偵測計畫 (低劑量電腦斷層 LDCT)',
    title_en: 'Taiwan HPA Subsidized Low-Dose CT (LDCT) Lung Cancer Screening Policy',
    cancer_type: '肺癌 (Lung Cancer)',
    target_population_zh:
      '具肺癌家族史者（父母、子女、兄弟姊妹罹患肺癌）及重度吸菸史者（≥20 包-年）',
    age_range_zh: '男性 50–74 歲 / 女性 45–74 歲（家族史組年齡下限現正查核中）',
    screening_interval_zh: '每 2 年 1 次',
    modality_zh: '胸部低劑量電腦斷層攝影 (LDCT)',
    effective_from: '2022-07-01',
    policy_version: '2022-HPA-LDCT-01',
    canonical_url: 'https://www.hpa.gov.tw/Pages/List.aspx?nodeid=4622',
    retrieved_date: '2026-09-20',
    status: 'needs-provenance-review', // Exemplifies VAL-016: Needs provenance review due to conflicting age cutoff reports
    notes_zh:
      '【審查攔阻中】：二手來源對家族史組男女年齡下限（45/50 vs 40/45）存在歧異解讀。依 VAL-016 規範，在取得 HPA 官方公告精確核定前，不得以 R3 級別正式發佈。',
  },
};
