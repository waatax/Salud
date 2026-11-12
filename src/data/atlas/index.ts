import type { KnowledgeAtlas } from '../../types/knowledgeAtlas';
import { STRENGTH_ENDURANCE_ATLAS } from './strengthEnduranceAtlas';
import { SLEEP_ATLAS } from './sleepAtlas';
import { LONGEVITY_ATLAS } from './longevityAtlas';

export { STRENGTH_ENDURANCE_ATLAS, SLEEP_ATLAS, LONGEVITY_ATLAS };
export { atlasCoverage } from './coverage';

/** Every topic atlas, with the in-app hash that opens its map. */
export const ALL_ATLASES: { atlas: KnowledgeAtlas; hash: string; label: string }[] = [
  { atlas: STRENGTH_ENDURANCE_ATLAS, hash: 'exercise/strength', label: '肌耐力訓練' },
  { atlas: SLEEP_ATLAS, hash: 'sleep/ATLAS', label: '睡眠與休息' },
  { atlas: LONGEVITY_ATLAS, hash: 'longevity/ATLAS', label: '抗老化' },
];
