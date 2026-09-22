/**
 * units.ts — Salud Layer 2 Numeric & Unit Engine
 *
 * Provides safe contextual translation of population percentages to individual values,
 * dynamic macro conversions, and guards against literal reading of heuristics.
 */

import { QuantitativeClaim, ValueKind } from '../types/knowledge';

export interface RelativeEnergyDerivation {
  ratioPct: number;
  totalKcal: number;
  macroKind: 'fat' | 'carb' | 'protein';
  kcalPerGram: number;
  derivedGrams: number;
  formulaDisplay: string;
  contextNote: string;
}

/**
 * Calculates grams from %E (Percent Energy) according to user's contextual calorie intake.
 * Fixes DEFECT-O1 / Section 6.2: 10%E is NOT a fixed 22g for everyone!
 */
export function deriveGramsFromEnergyRatio(
  ratioPct: number,
  totalKcal: number,
  macroKind: 'fat' | 'carb' | 'protein' = 'fat'
): RelativeEnergyDerivation {
  const kcalPerGram = macroKind === 'fat' ? 9 : 4;
  const targetKcal = totalKcal * (ratioPct / 100);
  const derivedGrams = Math.round((targetKcal / kcalPerGram) * 10) / 10;

  return {
    ratioPct,
    totalKcal,
    macroKind,
    kcalPerGram,
    derivedGrams,
    formulaDisplay: `${totalKcal} kcal × ${ratioPct}% ÷ ${kcalPerGram} kcal/g = ${derivedGrams} g/日`,
    contextNote: `指引數值為總熱量佔比（<${ratioPct}%E），於每日 ${totalKcal} kcal 攝取下約對應 ${derivedGrams} 克；熱量需求因年齡、性別與運動量而異，克數非固定值。`,
  };
}

export interface HydrationHeuristicEvaluation {
  weightKg: number;
  mlMin: number;
  mlMax: number;
  isOutlier: boolean;
  valueKind: ValueKind;
  formattedRange: string;
  disclaimer: string;
}

/**
 * Formats the "Weight (kg) × 30~35 mL" heuristic with explicit guardrails.
 * Fixes DEFECT-02 & Section 6.3: Never present heuristic as a medical formula.
 */
export function evaluateHydrationHeuristic(weightKg: number): HydrationHeuristicEvaluation {
  const mlMin = Math.round(weightKg * 30);
  const mlMax = Math.round(weightKg * 35);
  const isOutlier = weightKg < 40 || weightKg > 105;

  let disclaimer =
    '此為台灣衛教常見之「經驗法則 (Rule of Thumb)」，並非官方公認之剛性處方公式。健康成人應以口渴、排尿頻率與淡稻草尿色作動態調節。';

  if (isOutlier) {
    disclaimer += `【極端體重警示】：體重達 ${weightKg} kg 若機械套用 35 mL/kg 將得出 ${
      (mlMax / 1000).toFixed(1)
    } L/日，已超過多數健康腎臟排水步調；請勿盲從線性乘數，應依理想體重評估。`;
  }

  return {
    weightKg,
    mlMin,
    mlMax,
    isOutlier,
    valueKind: 'heuristic',
    formattedRange: `${mlMin} ~ ${mlMax} mL/日`,
    disclaimer,
  };
}

/**
 * Formats Lp(a) units and explicitly rejects constant linear multiplier conversion.
 * Aligns with KA-LP-003.
 */
export function formatLpaRiskContext(nmolL: number): {
  nmolL: number;
  approxRiskMultiplier: string;
  conversionDisclaimer: string;
} {
  let approxRiskMultiplier = '基準風險 (Baseline ASCVD risk)';
  if (nmolL > 250) {
    approxRiskMultiplier = '≥ 2.0 倍 ASCVD 高心血管風險';
  } else if (nmolL > 125) {
    approxRiskMultiplier = '約 1.4 倍 ASCVD 升高風險';
  }

  return {
    nmolL,
    approxRiskMultiplier,
    conversionDisclaimer:
      'Lp(a) 顆粒中載脂蛋白(a) 之 Kringle IV-2 拷貝數具高度異質性，因此 nmol/L（顆粒莫耳濃度）與 mg/dL（質量濃度）不可使用固定數學係數（如 ×2.4）互換，跨實驗室評估須先確認報告單位與分析方法。',
  };
}
