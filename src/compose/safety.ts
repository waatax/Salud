/**
 * safety.ts — Salud Layer 2 Safety & Contraindication Graph Engine
 *
 * Machine-evaluatable safety predicates that intercept hazardous user input
 * before simulator calculations or clinical recommendations take place.
 */

import {
  HealthSubjectProfile,
  SafetyActionLevel,
  SafetyPredicate,
  SimulatorContract,
} from '../types/knowledge';

export const CANONICAL_SAFETY_PREDICATES: Record<string, SafetyPredicate> = {
  'PRED-CKD-G4-G5': {
    id: 'PRED-CKD-G4-G5',
    name: '中重度慢性腎臟病 (CKD G4–G5) 安全防護閘',
    description_zh: '腎絲球過濾率 eGFR < 30 mL/min/1.73m²，自由水排出與鉀離子排除機能大幅萎縮。',
    description_en: 'Severe CKD (eGFR < 30 mL/min/1.73m²); water clearance & potassium excretion impaired.',
    target_condition: 'ckd_g4_g5',
    action_level: 'block',
    evaluate: (profile: HealthSubjectProfile) => {
      if (profile.ckdStage === 'G4' || profile.ckdStage === 'G5') return true;
      if (profile.eGfr !== undefined && profile.eGfr < 30) return true;
      return false;
    },
    boundary_explanation_zh:
      '您的腎功能分期屬中重度減退（eGFR < 30 mL/min），腎臟排出過量自由水能力受限，盲目補充大量水分可能引發肺水腫與嚴重低血鈉；高鉀飲食更有致死性心律不整風險。本功能已自動終止模擬，請依腎臟專科醫師處方攝水。',
    boundary_explanation_en:
      'eGFR < 30 indicates advanced renal impairment. Excess water risks pulmonary edema and acute hyponatremia. Fluid simulation halted.',
  },

  'PRED-HF': {
    id: 'PRED-HF',
    name: '充血性心臟衰竭 (Heart Failure) 限水防護閘',
    description_zh: '心臟泵血衰退引發有效循環血量不足與神經荷爾蒙過度代償，水分過量將誘發急性肺水腫。',
    description_en: 'Congestive heart failure with systemic volume overload risk.',
    target_condition: 'heart_failure',
    action_level: 'block',
    evaluate: (profile: HealthSubjectProfile) => Boolean(profile.heartFailure),
    boundary_explanation_zh:
      '心衰竭患者若過度飲水，將急遽增加心臟前負荷並誘發急性肺水腫。日常水分攝取須恪守心臟科醫囑（通常每日上限 1500 mL 包括飲食），一般健康成人水合公式在此完全不適用。',
    boundary_explanation_en:
      'Heart failure patients risk severe pulmonary congestion with unrestricted fluid intake. Generic hydration formulas are strictly contraindicated.',
  },

  'PRED-CIRRHOSIS': {
    id: 'PRED-CIRRHOSIS',
    name: '肝硬化併腹水 (Cirrhosis with Ascites) 防護閘',
    description_zh: '門靜脈高壓與低白蛋白血症導致第三空間體液蓄積，水鈉排泄異常。',
    description_en: 'Hepatic cirrhosis with ascites and secondary hyperaldosteronism.',
    target_condition: 'cirrhosis_ascites',
    action_level: 'block',
    evaluate: (profile: HealthSubjectProfile) => Boolean(profile.cirrhosis),
    boundary_explanation_zh:
      '肝硬化合併腹水或水腫患者，排泄自由水機能低下，攝入過多低張液體極易引發稀釋性低血鈉與腹水加劇。',
    boundary_explanation_en:
      'Cirrhosis with impaired free water clearance contraindicated for standard hydration simulations.',
  },

  'PRED-SIADH': {
    id: 'PRED-SIADH',
    name: '抗利尿激素分泌不當症候群 (SIADH) 防護閘',
    description_zh: '下視丘/腦下垂體異常持續分泌 ADH，腎臟無法稀釋尿液排除水分。',
    description_en: 'Syndrome of Inappropriate ADH Secretion with persistent water retention.',
    target_condition: 'siadh',
    action_level: 'block',
    evaluate: (profile: HealthSubjectProfile) => Boolean(profile.siadh),
    boundary_explanation_zh:
      'SIADH 患者抗利尿激素無法被正常負回饋抑制，正常飲水量即可引發致命性水中毒與腦水腫。',
    boundary_explanation_en:
      'SIADH cannot suppress ADH; standard drinking triggers acute cerebral edema.',
  },

  'PRED-ALDH2-DEFICIENT': {
    id: 'PRED-ALDH2-DEFICIENT',
    name: 'ALDH2 缺失基因型 (rs671 變異) 酒精毒性邊界防護閘',
    description_zh:
      '東亞特有 ALDH2*2 突變造成乙醛代謝嚴重阻滯。BAC（血中乙醇）讀數正常絕不等於乙醛毒性安全！',
    description_en:
      'ALDH2 Glu504Lys deficiency: BAC models ethanol only; acetaldehyde carcinogenicity remains extreme.',
    target_condition: 'aldh2_homo_or_hetero',
    action_level: 'warn',
    evaluate: (profile: HealthSubjectProfile) =>
      profile.aldh2Genotype === 'HOMO' || profile.aldh2Genotype === 'HETERO',
    boundary_explanation_zh:
      '【重要安全邊界】：BAC 模型僅描述「乙醇」在人體內的動力學；對於 ALDH2 缺失（*1/*2 或 *2/*2）的飲酒臉紅者而言，真正的毒性負擔是一級致癌物「乙醛」。即使計算顯示 BAC 在合法法定標準以內，乙醛對食道黏膜與 DNA 的突變毒性依然以十倍以上累積！請勿將 BAC 讀數作為放膽飲酒的許可證。',
    boundary_explanation_en:
      'CRITICAL BOUNDARY: BAC calculates ethanol only. For ALDH2 deficient individuals, toxic acetaldehyde accumulates exponentially regardless of low BAC.',
  },

  'PRED-EXTREME-WEIGHT': {
    id: 'PRED-EXTREME-WEIGHT',
    name: '極端體重經驗法則防護閘 (Extreme Weight Heuristic Guard)',
    description_zh: '體重 < 40 kg 或 > 105 kg 時，線性體重水分乘數公式（kg × 30~35 mL）會嚴重失真。',
    description_en: 'Body weight outliers render linear hydration multipliers physiologically unsafe.',
    target_condition: 'extreme_weight',
    action_level: 'cap',
    evaluate: (profile: HealthSubjectProfile) => {
      if (profile.weightKg !== undefined && (profile.weightKg < 40 || profile.weightKg > 105)) {
        return true;
      }
      return false;
    },
    boundary_explanation_zh:
      '體重乘數（30–35 mL/kg）僅為中等體重成人之粗略經驗法則。當體重達 120 kg 時算出的 4.2 L/日已逼近人體安全排泄負荷。極端體重應依理想體重校正或依口渴與尿色動態補充。',
    boundary_explanation_en:
      'Weight-based hydration multipliers do not scale linearly past 105 kg. Calculation capped at safety baseline.',
  },
};

export interface SafetyEvaluationResult {
  canProceed: boolean;
  blocked: boolean;
  activePredicates: SafetyPredicate[];
  blockingPredicates: SafetyPredicate[];
  warningPredicates: SafetyPredicate[];
  cappingPredicates: SafetyPredicate[];
  explanations_zh: string[];
}

export function evaluateSafetyPredicates(
  predicateIds: string[],
  profile: HealthSubjectProfile
): SafetyEvaluationResult {
  const active: SafetyPredicate[] = [];
  const blocking: SafetyPredicate[] = [];
  const warning: SafetyPredicate[] = [];
  const capping: SafetyPredicate[] = [];
  const explanations: string[] = [];

  for (const id of predicateIds) {
    const pred = CANONICAL_SAFETY_PREDICATES[id];
    if (pred && pred.evaluate(profile)) {
      active.push(pred);
      explanations.push(pred.boundary_explanation_zh);

      if (pred.action_level === 'block') {
        blocking.push(pred);
      } else if (pred.action_level === 'warn') {
        warning.push(pred);
      } else if (pred.action_level === 'cap') {
        capping.push(pred);
      }
    }
  }

  return {
    canProceed: blocking.length === 0,
    blocked: blocking.length > 0,
    activePredicates: active,
    blockingPredicates: blocking,
    warningPredicates: warning,
    cappingPredicates: capping,
    explanations_zh: explanations,
  };
}

export const CANONICAL_SIMULATOR_CONTRACTS: Record<string, SimulatorContract> = {
  'SIM-HYDRATION': {
    simulatorId: 'SIM-HYDRATION',
    name: '水分平衡動態模擬器',
    excluded_predicates: [
      'PRED-CKD-G4-G5',
      'PRED-HF',
      'PRED-CIRRHOSIS',
      'PRED-SIADH',
      'PRED-EXTREME-WEIGHT',
    ],
    baseline_kind: 'mechanistic',
    heuristic_disclaimer_zh:
      '本模擬器基於健康成年人出汗率與不感蒸發模型，不適用於嚴格限水疾病族群。公式輸出為生理動態參考，非個人處方。',
  },
  'SIM-BAC': {
    simulatorId: 'SIM-BAC',
    name: '血中酒精濃度 (BAC) 消除模擬器',
    excluded_predicates: ['PRED-ALDH2-DEFICIENT'],
    baseline_kind: 'pharmacokinetic',
    heuristic_disclaimer_zh:
      'BAC 僅代表未代謝乙醇濃度。ALDH2 缺乏者體內乙醛蓄積之致癌與器官毒性無法由 BAC 單一指標反映。',
  },
};
