import { HumanSystemId } from '../../types';
import { SystemDeepDive } from '../../types/systemDeepDive';
import { RESPIRATORY_DEEP } from './respiratoryDeep';
import { CARDIOVASCULAR_DEEP } from './cardiovascularDeep';
import { DIGESTIVE_DEEP } from './digestiveDeep';

/**
 * Registry of the v3.0 deep dives. Systems appear here as their content is authored;
 * a system with no entry falls back to the original overview layout, so the two can
 * coexist while the remaining systems are written.
 */
export const SYSTEM_DEEP_DIVES: Partial<Record<HumanSystemId, SystemDeepDive>> = {
  respiratory: RESPIRATORY_DEEP,
  cardiovascular: CARDIOVASCULAR_DEEP,
  digestive: DIGESTIVE_DEEP,
};

export const getDeepDive = (id: HumanSystemId): SystemDeepDive | undefined =>
  SYSTEM_DEEP_DIVES[id];
