/**
 * certainty.ts — Salud Layer 2 Pure Function Computation Engine
 *
 * Deterministic, reproducible, auditable evidence certainty evaluation.
 * Replaces arbitrary human grading with systematic algorithmic scoring.
 */

import { CertaintyLevel, EvidenceRecord, StudyDesign } from '../types/knowledge';

export interface CertaintyDerivationResult {
  level: CertaintyLevel;
  score: number;
  rationaleSteps: string[];
  isOverridden: boolean;
  overrideRationale?: string;
}

const DESIGN_BASE_SCORE: Record<StudyDesign, number> = {
  systematic_review: 4.0,
  rct: 4.0,
  guideline: 4.0,
  cohort: 3.0,
  case_control: 2.0,
  cross_sectional: 2.0,
  expert_consensus: 2.0,
  mechanistic_in_vitro: 1.0,
  animal_model: 1.0,
};

export function deriveCertainty(
  evidence: EvidenceRecord[],
  override?: { level: CertaintyLevel; rationale: string }
): CertaintyDerivationResult {
  if (!evidence || evidence.length === 0) {
    if (override) {
      return {
        level: override.level,
        score: 0,
        rationaleSteps: ['無原始文獻輸入，使用管理階層審核覆寫'],
        isOverridden: true,
        overrideRationale: override.rationale,
      };
    }
    return {
      level: 'very-low',
      score: 0,
      rationaleSteps: ['無實證文獻記錄 (No evidence records) -> 基準等級 very-low'],
      isOverridden: false,
    };
  }

  // 1. Select strongest primary evidence design as initial baseline
  let bestRecord = evidence[0];
  let bestScore = DESIGN_BASE_SCORE[bestRecord.design] ?? 1.0;

  for (const rec of evidence) {
    const s = DESIGN_BASE_SCORE[rec.design] ?? 1.0;
    if (s > bestScore) {
      bestScore = s;
      bestRecord = rec;
    }
  }

  const steps: string[] = [];
  let currentScore = bestScore;
  steps.push(
    `初始基準：研究設計 [${bestRecord.design}] (ID: ${bestRecord.id})，基準分 = ${bestScore.toFixed(1)}`
  );

  // 2. Directness check (Crucial vNext.8 innovation)
  // Low directness (e.g. n=13 Japanese healthy men applied to East Asian ALDH2 deficiency) -> heavy penalty
  if (bestRecord.directness === 'low') {
    currentScore -= 2.0;
    steps.push('降級 [-2.0]：實證直接性低 (Low directness) — 受試族群或暴露情境與目標宣稱存在高度落差');
  } else if (bestRecord.directness === 'moderate') {
    currentScore -= 1.0;
    steps.push('降級 [-1.0]：實證直接性中等 (Moderate directness) — 存在部分外推或間接終點');
  }

  // 3. Risk of Bias
  if (bestRecord.risk_of_bias === 'critical') {
    currentScore -= 2.0;
    steps.push('降級 [-2.0]：研究偏差風險極高 (Critical risk of bias)');
  } else if (bestRecord.risk_of_bias === 'serious') {
    currentScore -= 1.0;
    steps.push('降級 [-1.0]：研究偏差風險顯著 (Serious risk of bias)');
  } else if (bestRecord.risk_of_bias === 'moderate') {
    currentScore -= 0.5;
    steps.push('降級 [-0.5]：研究偏差風險中度 (Moderate risk of bias)');
  }

  // 4. Sample Size Imprecision Penalty
  if (
    (bestRecord.design === 'rct' || bestRecord.design === 'cohort') &&
    bestRecord.sample_size !== undefined &&
    bestRecord.sample_size < 30
  ) {
    currentScore -= 1.0;
    steps.push(`降級 [-1.0]：小樣本精確度限制 (N = ${bestRecord.sample_size} < 30)`);
  } else if (bestRecord.precision === 'imprecise') {
    currentScore -= 1.0;
    steps.push('降級 [-1.0]：信賴區間寬廣或事件數不足 (Imprecise)');
  }

  // 5. Inconsistency
  if (bestRecord.consistency === 'inconsistent') {
    currentScore -= 1.0;
    steps.push('降級 [-1.0]：異質性顯著且結果不一致 (Inconsistent results)');
  }

  // 6. Publication Bias
  if (bestRecord.publication_bias === 'suspected') {
    currentScore -= 1.0;
    steps.push('降級 [-1.0]：疑似發表偏倚 (Suspected publication bias)');
  }

  // 7. Large effect size upgrade for observational designs
  if (bestRecord.design === 'cohort' || bestRecord.design === 'case_control') {
    if (bestRecord.effect) {
      const est = typeof bestRecord.effect.estimate === 'number'
        ? bestRecord.effect.estimate
        : parseFloat(bestRecord.effect.estimate);
      if (!isNaN(est) && (est >= 2.0 || (est <= 0.5 && est > 0))) {
        currentScore += 1.0;
        steps.push(`升級 [+1.0]：強效應量 (Effect size = ${est}) 且無明顯交絡`);
      }
    }
  }

  // Clamp final score to [1.0, 4.0]
  const finalScore = Math.max(1.0, Math.min(4.0, currentScore));

  let level: CertaintyLevel = 'very-low';
  if (finalScore >= 3.5) {
    level = 'high';
  } else if (finalScore >= 2.5) {
    level = 'moderate';
  } else if (finalScore >= 1.5) {
    level = 'low';
  } else {
    level = 'very-low';
  }

  steps.push(`計算結算：最終評分 = ${finalScore.toFixed(1)} -> 確定度判定為 [${level}]`);

  if (override) {
    steps.push(
      `【專家覆寫生效】：原推導 [${level}] 被人工覆寫為 [${override.level}]。理由：${override.rationale}`
    );
    return {
      level: override.level,
      score: finalScore,
      rationaleSteps: steps,
      isOverridden: true,
      overrideRationale: override.rationale,
    };
  }

  return {
    level,
    score: finalScore,
    rationaleSteps: steps,
    isOverridden: false,
  };
}
