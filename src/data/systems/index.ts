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
import { withExpansion as expand } from './withExpansion';

const withExpansion = (dd: SystemDeepDive) => expand(dd, SYSTEM_EXPANSION_2026);

/**
 * Eager registry of every system's deep dive, for build scripts and tests.
 * The app itself loads one system at a time through `load.ts`.
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
