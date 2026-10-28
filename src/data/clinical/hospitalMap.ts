import type { HospitalCode } from './types';

/**
 * Where each Salud department sits in the four reference medical centres.
 *
 * Names follow each hospital's own published structure:
 *  - NTUH  國立臺灣大學醫學院附設醫院組織規程（2024-05-16 教育部核定修正）第四條：39 部／中心，含各部分科。
 *  - NCKUH 成大醫院「醫師介紹」22 部；內科部「科部介紹」十個分科（心臟血管科、胸腔內科、胃腸肝膽科、
 *          過敏免疫風濕科、血液科、內分泌新陳代謝科、腎臟科、感染病科、一般內科、重症加護科）。
 *  - VGH   臺北榮民總醫院處務規程（2024-11-16）第四條：38 部／中心（含心臟血管中心、神經醫學中心、
 *          高齡醫學中心、重症醫學部、傳統醫學部、營養部、重粒子及放射腫瘤部）。
 *  - CCH   彰化基督教醫院門診表（2026-06）：內科部、外科部、骨科部、婦產部、兒童醫院、神經醫學部、
 *          耳鼻喉暨頭頸部、中醫部、生殖醫學中心、遺傳諮詢門診、睡眠障礙特別門診等。
 *
 * A name in （）is the clinic or subspecialty inside a larger 部 where the hospital does not
 * publish a separate 科. A missing entry means the hospital has no stand-alone unit for it —
 * the UI shows「併入其他科」, never a guessed name.
 */
export const HOSPITAL_SOURCES: Record<HospitalCode, { label: string; url: string; date: string }> = {
  NTUH: {
    label: '國立臺灣大學醫學院附設醫院組織規程',
    url: 'https://sec.ntu.edu.tw/001/Upload/18/relfile/9772/25383/072cf9af-8c50-4b07-8ae1-c1f5350a2879.pdf',
    date: '2024-05',
  },
  NCKUH: {
    label: '成大醫院醫師介紹（22 部）與內科部科部介紹',
    url: 'https://nckuh.hosp.ncku.edu.tw/p/412-1000-29460.php',
    date: '2026-10',
  },
  VGH: {
    label: '臺北榮民總醫院處務規程',
    url: 'https://www.vghtpe.gov.tw/vghtpe/files/PDF/pub/113%E8%87%BA%E5%8C%97%E6%A6%AE%E6%B0%91%E7%B8%BD%E9%86%AB%E9%99%A2%E8%99%95%E5%8B%99%E8%A6%8F%E7%A8%8B.pdf',
    date: '2024-11',
  },
  CCH: {
    label: '彰化基督教醫院門診表',
    url: 'https://www.cch.org.tw/',
    date: '2026-06',
  },
};

export const HOSPITAL_MAP: Record<string, Partial<Record<HospitalCode, string>>> = {
  // ── 內科系 ──
  cardiology: { NTUH: '內科部 心臟科', NCKUH: '內科部 心臟血管科', VGH: '心臟血管中心（心臟內科）', CCH: '內科部 心臟血管內科' },
  pulmonology: { NTUH: '內科部 胸腔科', NCKUH: '內科部 胸腔內科', VGH: '胸腔部', CCH: '內科部 胸腔內科' },
  gastro: { NTUH: '內科部 胃腸肝膽科', NCKUH: '內科部 胃腸肝膽科', VGH: '內科部（胃腸肝膽科）', CCH: '內科部 胃腸肝膽科' },
  nephrology: { NTUH: '內科部 腎臟科', NCKUH: '內科部 腎臟科', VGH: '內科部（腎臟科）', CCH: '內科部 腎臟科' },
  endocrine: { NTUH: '內科部 代謝內分泌科', NCKUH: '內科部 內分泌新陳代謝科', VGH: '內科部（內分泌新陳代謝科）', CCH: '內科部 內分泌新陳代謝科' },
  hemonc: { NTUH: '內科部 血液腫瘤科', NCKUH: '內科部 血液科', VGH: '內科部（血液科）', CCH: '內科部 血液腫瘤科' },
  med_oncology: { NTUH: '腫瘤醫學部 化學治療科', NCKUH: '腫瘤醫學部', VGH: '腫瘤醫學部', CCH: '腫瘤中心（血液腫瘤科）' },
  infectious: { NTUH: '內科部 感染科', NCKUH: '內科部 感染病科', VGH: '內科部（感染科）', CCH: '內科部 感染科' },
  rheumatology: { NTUH: '內科部 免疫風濕過敏科', NCKUH: '內科部 過敏免疫風濕科', VGH: '內科部（過敏免疫風濕科）', CCH: '內科部 過敏免疫風濕科' },
  general_internal: { NTUH: '內科部 一般內科／整合醫學科', NCKUH: '內科部 一般內科', VGH: '內科部（一般內科）', CCH: '一般內科／整合醫學科' },

  // ── 外科系 ──
  general_surgery: { NTUH: '外科部 一般外科', NCKUH: '外科部（一般外科）', VGH: '外科部（一般外科）', CCH: '外科部 一般消化外科' },
  breast_surgery: { NTUH: '外科部 一般外科（乳房外科門診）', NCKUH: '外科部（乳房外科）', VGH: '外科部（乳房外科）', CCH: '外科部 乳房外科（乳房中心）' },
  colorectal: { NTUH: '外科部 大腸直腸外科', NCKUH: '外科部（大腸直腸外科）', VGH: '外科部（大腸直腸外科）', CCH: '外科部 大腸直腸肛門科' },
  cv_surgery: { NTUH: '外科部 心臟血管外科', NCKUH: '外科部（心臟血管外科）', VGH: '心臟血管中心（心臟血管外科）', CCH: '外科部 心臟血管外科' },
  thoracic: { NTUH: '外科部 胸腔外科', NCKUH: '外科部（胸腔外科）', VGH: '外科部（胸腔外科）', CCH: '外科部 胸腔外科' },
  neurosurgery: { NTUH: '外科部 神經外科', NCKUH: '外科部（神經外科）', VGH: '神經醫學中心（神經外科）', CCH: '外科部 神經外科' },
  plastic: { NTUH: '外科部 整形外科', NCKUH: '外科部（整形外科）', VGH: '外科部（整形外科）', CCH: '外科部 重建整形暨手外科' },
  pediatric_surgery: { NTUH: '外科部 小兒外科', NCKUH: '外科部（小兒外科）', VGH: '外科部（小兒外科）', CCH: '兒童醫院 兒童外科' },
  urology: { NTUH: '泌尿部', NCKUH: '泌尿部', VGH: '泌尿部', CCH: '外科部 泌尿外科' },

  // ── 骨科部 ──
  orthopedics: { NTUH: '骨科部 一般骨科', NCKUH: '骨科部', VGH: '骨科部', CCH: '骨科部' },
  sports_med: { NTUH: '骨科部 運動醫學科', NCKUH: '骨科部（運動醫學）', VGH: '骨科部（運動醫學）', CCH: '骨科部（運動傷害）' },
  hand_foot: { NTUH: '骨科部 手足外科', NCKUH: '骨科部（手外科）', VGH: '骨科部（手足外科）', CCH: '重建整形暨手外科／骨科部' },
  ortho_trauma: { NTUH: '骨科部 骨外傷科', NCKUH: '骨科部（骨折創傷）', VGH: '骨科部（骨折創傷）', CCH: '骨科部／外傷科' },

  // ── 婦產部 · 小兒部 ──
  obstetrics: { NTUH: '婦產部 產科', NCKUH: '婦產部（產科）', VGH: '婦女醫學部（產科）', CCH: '婦產部（產科）' },
  gynecology: { NTUH: '婦產部 婦科', NCKUH: '婦產部（婦科）', VGH: '婦女醫學部（婦科）', CCH: '婦產部（婦科）' },
  reproductive: { NTUH: '婦產部 生殖內分泌科', NCKUH: '婦產部（生殖醫學）', VGH: '婦女醫學部（生殖內分泌）', CCH: '生殖醫學中心' },
  pediatrics: { NTUH: '小兒部', NCKUH: '小兒部', VGH: '兒童醫學部', CCH: '兒童醫院 兒童內科' },
  neonatology: { NTUH: '小兒部 新生兒科', NCKUH: '小兒部（新生兒科）', VGH: '兒童醫學部（新生兒科）', CCH: '兒童醫院（新生兒、發展篩檢）' },
  child_development: { NTUH: '小兒部 青少年醫學科／精神醫學部 兒童精神科', NCKUH: '小兒部／精神部（兒童青少年）', VGH: '兒童醫學部／精神醫學部', CCH: '兒童心智暨認知發展科／兒童發展中心' },

  // ── 神經 · 精神 ──
  neurology: { NTUH: '神經部', NCKUH: '神經部', VGH: '神經醫學中心', CCH: '神經醫學部 神經內科' },
  psychiatry: { NTUH: '精神醫學部', NCKUH: '精神部', VGH: '精神醫學部', CCH: '精神科（成人／老年精神科、身心科）' },
  sleep_med: { NTUH: '跨科睡眠門診（胸腔、精神、耳鼻喉、神經）', NCKUH: '跨科睡眠門診', VGH: '跨科睡眠門診（胸腔部、精神醫學部、耳鼻喉頭頸醫學部）', CCH: '睡眠障礙特別門診' },

  // ── 五官 · 皮膚 · 口腔 ──
  ophthalmology: { NTUH: '眼科部', NCKUH: '眼科部', VGH: '眼科部', CCH: '眼科' },
  ent: { NTUH: '耳鼻喉部', NCKUH: '耳鼻喉部', VGH: '耳鼻喉頭頸醫學部', CCH: '耳鼻喉暨頭頸部' },
  dermatology: { NTUH: '皮膚部', NCKUH: '皮膚部', VGH: '皮膚部', CCH: '皮膚科' },
  dentistry: { NTUH: '口腔醫學部', NCKUH: '口腔醫學部', VGH: '口腔醫學部', CCH: '牙科（家庭牙醫學科、牙周病科、口腔顎面外科）' },

  // ── 家醫 · 高齡 · 社區 ──
  family_med: { NTUH: '家庭醫學部', NCKUH: '家庭醫學部', VGH: '家庭醫學部', CCH: '家庭醫學科' },
  geriatrics: { NTUH: '老年醫學部', NCKUH: '高齡醫學部', VGH: '高齡醫學中心', CCH: '老人周全醫療服務（高齡醫學整合）' },
  palliative: { NTUH: '家庭醫學部 緩和醫療科', NCKUH: '家庭醫學部（安寧緩和）', VGH: '家庭醫學部（安寧緩和）', CCH: '家庭醫學科（安寧緩和照護）' },
  occupational: { NTUH: '環境及職業醫學部', NCKUH: '職業及環境醫學部', VGH: '職業醫學及臨床毒物部', CCH: '職業醫學科' },

  // ── 復健 · 營養 · 中醫 ──
  rehab: { NTUH: '復健部（含物理、職能、語言治療技術科）', NCKUH: '復健部', VGH: '復健醫學部', CCH: '復健醫學科' },
  nutrition: { NTUH: '營養室', NCKUH: '營養部', VGH: '營養部', CCH: '營養諮詢門診' },
  tcm: { VGH: '傳統醫學部', CCH: '中醫部' },

  // ── 急重症 · 麻醉 ──
  emergency: { NTUH: '急診醫學部', NCKUH: '急診部', VGH: '急診部', CCH: '急診部' },
  critical_care: { NTUH: '急診醫學部 復甦重症科／各加護病房', NCKUH: '內科部 重症加護科', VGH: '重症醫學部' },
  anesthesia: { NTUH: '麻醉部（含疼痛治療科）', NCKUH: '麻醉部', VGH: '麻醉部', CCH: '術前麻醉門診／疼痛科' },

  // ── 診斷與治療支援 ──
  radiation_oncology: { NTUH: '腫瘤醫學部 放射腫瘤科', NCKUH: '腫瘤醫學部（放射腫瘤）', VGH: '重粒子及放射腫瘤部', CCH: '放射腫瘤科' },
  imaging: { NTUH: '影像醫學部／核子醫學部', NCKUH: '影像醫學部', VGH: '影像診療部／核醫部', CCH: '影像醫學部／核子醫學科' },
  lab_medicine: { NTUH: '檢驗醫學部／病理部', NCKUH: '病理部', VGH: '病理檢驗部' },
  genetics: { NTUH: '基因醫學部', NCKUH: '基因醫學部', VGH: '婦女醫學部（基因醫學、優生保健）', CCH: '遺傳諮詢門診／遺傳及新陳代謝科' },
};
