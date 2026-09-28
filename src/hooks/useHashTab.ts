import { useCallback, useEffect, useState } from 'react';

/**
 * Keep a hub's active tab in sync with `#<prefix>/<TAB>`.
 *
 * - Reading: the initial tab comes from the hash, so a lesson can deep-link to
 *   `#obesity/PHARMACOTHERAPY` and land on the right tab.
 * - Writing: switching tabs rewrites the hash with `replaceState` (no history entry,
 *   no hashchange), so the address bar is always shareable without polluting Back.
 *
 * `index` selects which hash segment holds the tab (1 for `#pillar/TAB`, 2 for
 * `#systems/<id>/<section>`).
 */
export function useHashTab<T extends string>(
  prefix: string,
  allowed: readonly T[],
  fallback: T,
  index = 1,
  /** Values for intermediate segments when the hash is shorter, e.g. the system id. */
  fillers: string[] = []
): [T, (tab: T) => void] {
  const read = useCallback((): T | undefined => {
    const parts = window.location.hash.replace(/^#/, '').split('/');
    if (parts[0] !== prefix) return undefined;
    const seg = parts[index];
    return seg && (allowed as readonly string[]).includes(seg) ? (seg as T) : undefined;
  }, [prefix, allowed, index]);

  const [tab, setTabState] = useState<T>(() => read() ?? fallback);

  useEffect(() => {
    // Arriving at the bare hub hash (e.g. clicking the topic in the sidebar again)
    // returns to the fallback tab; a hash for another page leaves the state alone.
    const onHash = () => {
      const parts = window.location.hash.replace(/^#/, '').split('/');
      if (parts[0] !== prefix) return;
      setTabState(read() ?? fallback);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [read, prefix, fallback]);

  const setTab = useCallback(
    (next: T) => {
      setTabState(next);
      const parts = window.location.hash.replace(/^#/, '').split('/');
      if (parts[0] !== prefix) return;
      const kept = parts.slice(0, index);
      for (let i = 1; i < index; i++) {
        if (!kept[i]) kept[i] = fillers[i - 1] ?? '';
      }
      const hash = [...kept, next].join('/');
      try {
        window.history.replaceState(null, '', `#${hash}`);
      } catch {
        /* sandboxed iframes may forbid history writes; the tab still switches */
      }
    },
    // fillers is read at call time; callers pass a fresh array literal each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefix, index, fillers.join('/')]
  );

  return [tab, setTab];
}
