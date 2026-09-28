import { LabTone } from '../types/learning';

/**
 * Pure classifiers behind the check-up "quick read" panel. Each returns the same band
 * labels as data/learning/checkup.ts so the calculator and the reference cards never
 * disagree. Education only — a single reading is never a diagnosis.
 */

export interface BandResult {
  label_zh: string;
  tone: LabTone;
  note_zh?: string;
}

/** AHA/ACC 2025 categories: the higher of the two numbers decides. */
export function classifyBP(sys: number, dia: number): BandResult | null {
  if (!(sys > 0 && dia > 0)) return null;
  if (sys >= 180 || dia >= 120)
    return { label_zh: '嚴重偏高', tone: 'bad', note_zh: '若合併胸痛、頭痛、視力模糊或無力，請立即就醫；沒有症狀也應盡快回診。' };
  if (sys >= 140 || dia >= 90) return { label_zh: '第 2 期高血壓範圍', tone: 'bad', note_zh: '以居家 722 確認後，與醫師討論藥物治療。' };
  if (sys >= 130 || dia >= 80) return { label_zh: '第 1 期高血壓範圍', tone: 'warn', note_zh: '以居家 722 確認；多數人先做 3–6 個月生活調整並評估心血管風險。' };
  if (sys >= 120) return { label_zh: '血壓偏高', tone: 'neutral', note_zh: '還不是高血壓，但值得開始減鈉、運動與控制體重。' };
  return { label_zh: '正常', tone: 'good' };
}

export function classifyFPG(v: number): BandResult | null {
  if (!(v > 0)) return null;
  if (v < 70) return { label_zh: '偏低', tone: 'warn', note_zh: '有冒冷汗、手抖、意識不清等症狀時應立即補充糖分並就醫。' };
  if (v < 100) return { label_zh: '正常', tone: 'good' };
  if (v < 126) return { label_zh: '糖尿病前期範圍', tone: 'warn', note_zh: '最佳逆轉窗口：減重 5–7%、每週 150 分鐘運動。' };
  return { label_zh: '糖尿病範圍', tone: 'bad', note_zh: '需另一次檢驗（或 HbA1c）確認，請就醫。' };
}

export function classifyA1c(v: number): BandResult | null {
  if (!(v > 0)) return null;
  if (v < 5.7) return { label_zh: '正常', tone: 'good' };
  if (v < 6.5) return { label_zh: '糖尿病前期範圍', tone: 'warn', note_zh: '每年追蹤一次；貧血或海洋性貧血可能讓數值失真。' };
  return { label_zh: '糖尿病範圍', tone: 'bad', note_zh: '請與醫師討論確診與治療目標。' };
}

/** Taiwan HPA adult BMI bands. */
export function classifyBMI(weightKg: number, heightCm: number): (BandResult & { value: number }) | null {
  if (!(weightKg > 0 && heightCm > 0)) return null;
  // Classify on the one-decimal value that is displayed, as reports do, so a shown
  // "27.0" is never labelled 過重.
  const value = Math.round((weightKg / (heightCm / 100) ** 2) * 10) / 10;
  if (value < 18.5) return { value, label_zh: '過輕', tone: 'warn' };
  if (value < 24) return { value, label_zh: '正常範圍', tone: 'good' };
  if (value < 27) return { value, label_zh: '過重', tone: 'warn', note_zh: '請搭配腰圍一起判斷。' };
  return { value, label_zh: '肥胖', tone: 'bad', note_zh: 'BMI 需搭配腰圍或腰圍身高比，才能確認是否為脂肪過多。' };
}

export function classifyWHtR(waistCm: number, heightCm: number): (BandResult & { value: number }) | null {
  if (!(waistCm > 0 && heightCm > 0)) return null;
  const value = Math.round((waistCm / heightCm) * 100) / 100;
  if (value < 0.5) return { value, label_zh: '理想', tone: 'good' };
  if (value < 0.6) return { value, label_zh: '風險上升', tone: 'warn', note_zh: '腹部脂肪偏多，與胰島素阻抗、脂肪肝相關。' };
  return { value, label_zh: '高風險', tone: 'bad', note_zh: '建議評估血壓、血糖、血脂與脂肪肝。' };
}

/** KDIGO G-stages. Needs ≥3 months (or damage markers) before it means CKD. */
export function classifyEGFR(v: number): BandResult | null {
  if (!(v > 0)) return null;
  if (v >= 90) return { label_zh: 'G1 正常或偏高', tone: 'good' };
  if (v >= 60) return { label_zh: 'G2 輕度下降', tone: 'good', note_zh: '若尿白蛋白正常，通常不算慢性腎臟病。' };
  if (v >= 45) return { label_zh: 'G3a 輕中度下降', tone: 'warn', note_zh: '持續 3 個月以上即屬慢性腎臟病，請追蹤 UACR。' };
  if (v >= 30) return { label_zh: 'G3b 中重度下降', tone: 'warn', note_zh: '許多藥物需要調整劑量，請與醫師討論。' };
  if (v >= 15) return { label_zh: 'G4 重度下降', tone: 'bad', note_zh: '應由腎臟科追蹤。' };
  return { label_zh: 'G5 腎衰竭範圍', tone: 'bad', note_zh: '請盡快就醫。' };
}

/** Taiwan HPA metabolic-syndrome count (3 of 5). Unknown inputs are skipped, not counted. */
export function countMetSyn(input: {
  sex: 'M' | 'F';
  waistCm?: number;
  sys?: number;
  dia?: number;
  fpg?: number;
  tg?: number;
  hdl?: number;
}): { met: number; known: number } {
  const checks: (boolean | undefined)[] = [
    input.waistCm ? input.waistCm >= (input.sex === 'M' ? 90 : 80) : undefined,
    input.sys || input.dia ? (input.sys ?? 0) >= 130 || (input.dia ?? 0) >= 85 : undefined,
    input.fpg ? input.fpg >= 100 : undefined,
    input.tg ? input.tg >= 150 : undefined,
    input.hdl ? input.hdl < (input.sex === 'M' ? 40 : 50) : undefined,
  ];
  const known = checks.filter((c) => c !== undefined).length;
  const met = checks.filter((c) => c === true).length;
  return { met, known };
}
