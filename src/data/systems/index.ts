import { HumanSystemId } from '../../types';
import { SystemDeepDive } from '../../types/systemDeepDive';
import { RESPIRATORY_DEEP } from './respiratoryDeep';
import { CARDIOVASCULAR_DEEP } from './cardiovascularDeep';
import { DIGESTIVE_DEEP } from './digestiveDeep';
import { NERVOUS_DEEP } from './nervousDeep';
import { MUSCULOSKELETAL_DEEP } from './musculoskeletalDeep';
import { ENDOCRINE_DEEP } from './endocrineDeep';
import { RENAL_DEEP } from './renalDeep';
import { IMMUNE_DEEP } from './immuneDeep';
import { SYSTEM_EXPANSION_2026 } from './expansion2026';

/** Append the v4.0 (2026) additions after each system's authored content. */
const withExpansion = (dd: SystemDeepDive): SystemDeepDive => {
  const add = SYSTEM_EXPANSION_2026[dd.system_id];
  if (!add) return dd;
  return {
    ...dd,
    how_it_works: [...dd.how_it_works, ...add.how_it_works],
    protocols: [...dd.protocols, ...add.protocols],
    red_flags: [...dd.red_flags, ...add.red_flags],
  };
};

/**
 * Registry of the v3.0 deep dives. Systems appear here as their content is authored;
 * a system with no entry falls back to the original overview layout, so the two can
 * coexist while the remaining systems are written.
 */
export const SYSTEM_DEEP_DIVES: Partial<Record<HumanSystemId, SystemDeepDive>> = {
  respiratory: withExpansion(RESPIRATORY_DEEP),
  cardiovascular: withExpansion(CARDIOVASCULAR_DEEP),
  digestive: withExpansion(DIGESTIVE_DEEP),
  nervous: withExpansion(NERVOUS_DEEP),
  musculoskeletal: withExpansion(MUSCULOSKELETAL_DEEP),
  endocrine: withExpansion(ENDOCRINE_DEEP),
  renal: withExpansion(RENAL_DEEP),
  immune: withExpansion(IMMUNE_DEEP),
};

export const getDeepDive = (id: HumanSystemId): SystemDeepDive | undefined =>
  SYSTEM_DEEP_DIVES[id];
