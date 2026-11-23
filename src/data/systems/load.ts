import { HumanSystemId } from '../../types';
import { SystemDeepDive } from '../../types/systemDeepDive';
import { withExpansion } from './withExpansion';

/**
 * v6.13: each system's deep dive is its own chunk. The hub shows one system at a time,
 * so opening it downloads that system only instead of all eight at once.
 * `index.ts` keeps the eager registry for build scripts and tests.
 */
const LOADERS: Record<HumanSystemId, () => Promise<SystemDeepDive>> = {
  respiratory: () => import('./respiratoryDeep').then((m) => m.RESPIRATORY_DEEP),
  cardiovascular: () => import('./cardiovascularDeep').then((m) => m.CARDIOVASCULAR_DEEP),
  digestive: () => import('./digestiveDeep').then((m) => m.DIGESTIVE_DEEP),
  nervous: () => import('./nervousDeep').then((m) => m.NERVOUS_DEEP),
  musculoskeletal: () => import('./musculoskeletalDeep').then((m) => m.MUSCULOSKELETAL_DEEP),
  endocrine: () => import('./endocrineDeep').then((m) => m.ENDOCRINE_DEEP),
  renal: () => import('./renalDeep').then((m) => m.RENAL_DEEP),
  immune: () => import('./immuneDeep').then((m) => m.IMMUNE_DEEP),
};

const cache = new Map<HumanSystemId, Promise<SystemDeepDive>>();

/** Load one system's deep dive (with its 2026 additions); repeat calls reuse the first request. */
export function loadDeepDive(id: HumanSystemId): Promise<SystemDeepDive> {
  const cached = cache.get(id);
  if (cached) return cached;
  const pending = Promise.all([LOADERS[id](), import('./expansion2026')]).then(([dd, mod]) =>
    withExpansion(dd, mod.SYSTEM_EXPANSION_2026)
  );
  // A failed chunk request (e.g. offline) should not poison later attempts.
  pending.catch(() => cache.delete(id));
  cache.set(id, pending);
  return pending;
}
