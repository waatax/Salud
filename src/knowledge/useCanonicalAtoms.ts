import { useEffect, useState } from 'react';
import type { KnowledgeAtom } from '../types/knowledge';

/**
 * v6.16: the canonical atom pack (atoms, paper registry, clinical mastery profiles) is
 * ~580 kB minified. Chapter pages only use it for badges and paper links, so it loads
 * after the page renders instead of blocking it.
 */
let atomsById: Map<string, KnowledgeAtom> | undefined;
let pending: Promise<Map<string, KnowledgeAtom>> | undefined;

export function loadCanonicalAtoms(): Promise<Map<string, KnowledgeAtom>> {
  if (!pending) {
    pending = import('./atoms/pack82').then((m) => {
      atomsById = new Map(m.CANONICAL_KNOWLEDGE_PACK_82.map((atom) => [atom.id, atom]));
      return atomsById;
    });
    // A failed chunk request (e.g. offline) should not poison later attempts.
    pending.catch(() => {
      pending = undefined;
    });
  }
  return pending;
}

/** Canonical atoms keyed by id, or `undefined` until the pack has loaded. */
export function useCanonicalAtoms(): Map<string, KnowledgeAtom> | undefined {
  const [atoms, setAtoms] = useState(atomsById);
  useEffect(() => {
    if (atoms) return;
    let live = true;
    loadCanonicalAtoms().then(
      (loaded) => {
        if (live) setAtoms(loaded);
      },
      () => undefined
    );
    return () => {
      live = false;
    };
  }, [atoms]);
  return atoms;
}
