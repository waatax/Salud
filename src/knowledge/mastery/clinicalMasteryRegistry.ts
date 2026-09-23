/**
 * clinicalMasteryRegistry.ts — Salud Layer 1 Canonical Clinical Mastery Registry
 *
 * Comprehensive 6-Dimensional Clinical Mastery Framework bridging general public
 * intuition and accessible mental models with board-certified physician, clinical
 * dietitian, and pharmacologist practice depths across ALL 106 Knowledge Atoms.
 */

import { ClinicalMasteryProfile } from '../../types/knowledge';
import { BP_CLINICAL_MASTERY } from './bpMastery';
import { GLUCOSE_CLINICAL_MASTERY } from './glucoseMastery';
import { LIPID_CLINICAL_MASTERY } from './lipidMastery';
import { HYDRATION_CLINICAL_MASTERY } from './hydrationMastery';
import { OIL_CLINICAL_MASTERY } from './oilMastery';
import { ALCOHOL_CLINICAL_MASTERY } from './alcoholMastery';
import { BODY_COMP_CLINICAL_MASTERY } from './bodyCompMastery';
import { RENAL_CLINICAL_MASTERY } from './renalMastery';
import { EXERCISE_CLINICAL_MASTERY } from './exerciseMastery';
import { SLEEP_CLINICAL_MASTERY } from './sleepMastery';
import { POLICY_CLINICAL_MASTERY } from './policyMastery';
import { META_CLINICAL_MASTERY } from './metaMastery';

export const CANONICAL_CLINICAL_MASTERY_REGISTRY: Record<string, ClinicalMasteryProfile> = {
  ...BP_CLINICAL_MASTERY,
  ...GLUCOSE_CLINICAL_MASTERY,
  ...LIPID_CLINICAL_MASTERY,
  ...HYDRATION_CLINICAL_MASTERY,
  ...OIL_CLINICAL_MASTERY,
  ...ALCOHOL_CLINICAL_MASTERY,
  ...BODY_COMP_CLINICAL_MASTERY,
  ...RENAL_CLINICAL_MASTERY,
  ...EXERCISE_CLINICAL_MASTERY,
  ...SLEEP_CLINICAL_MASTERY,
  ...POLICY_CLINICAL_MASTERY,
  ...META_CLINICAL_MASTERY,
};

export {
  BP_CLINICAL_MASTERY,
  GLUCOSE_CLINICAL_MASTERY,
  LIPID_CLINICAL_MASTERY,
  HYDRATION_CLINICAL_MASTERY,
  OIL_CLINICAL_MASTERY,
  ALCOHOL_CLINICAL_MASTERY,
  BODY_COMP_CLINICAL_MASTERY,
  RENAL_CLINICAL_MASTERY,
  EXERCISE_CLINICAL_MASTERY,
  SLEEP_CLINICAL_MASTERY,
  POLICY_CLINICAL_MASTERY,
  META_CLINICAL_MASTERY,
};
