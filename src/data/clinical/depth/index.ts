import type { ConditionDepth } from '../types';
import { DEPTH_INTERNAL } from './internal';
import { DEPTH_SURGERY } from './surgery';
import { DEPTH_WOMEN_NEURO_PRIMARY } from './womenNeuroPrimary';
import { DEPTH_SENSE_REHAB_ACUTE } from './senseRehabAcute';

/**
 * v6.1 depth overlay for the 89 v6.0 conditions, keyed by condition id: key numbers, causes,
 * prevention, prognosis, recovery timeline, questions for the clinic, Taiwan resources, and
 * evidence updates (newer guideline editions added, superseded or mis-dated labels dropped).
 * Conditions added in v6.1 carry these fields inline instead.
 */
export const DEPTH: Record<string, Partial<ConditionDepth>> = {
  ...DEPTH_INTERNAL,
  ...DEPTH_SURGERY,
  ...DEPTH_WOMEN_NEURO_PRIMARY,
  ...DEPTH_SENSE_REHAB_ACUTE,
};
