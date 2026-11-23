import { HumanSystemId } from '../../types';
import { SystemDeepDive } from '../../types/systemDeepDive';
import type { SystemExpansion } from './expansion2026';

/** Append the v4.0 (2026) additions after each system's authored content. */
export const withExpansion = (
  dd: SystemDeepDive,
  expansions: Partial<Record<HumanSystemId, SystemExpansion>>
): SystemDeepDive => {
  const add = expansions[dd.system_id];
  if (!add) return dd;
  return {
    ...dd,
    how_it_works: [...dd.how_it_works, ...add.how_it_works],
    protocols: [...dd.protocols, ...add.protocols],
    red_flags: [...dd.red_flags, ...add.red_flags],
  };
};
