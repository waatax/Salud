import { useCallback, useEffect, useState } from 'react';

/**
 * useChapterProgress — remembers which chapters (tabs) of a hub the reader has finished.
 *
 * Stored per hub under `salud-chapters-<hub>` so a returning reader sees ticks on the
 * chapters already read and a "繼續第 N 章" button. Storage can be unavailable (private
 * mode, sandboxed iframes), so every access is guarded and the hub still works without it.
 */
export function useChapterProgress(hub: string) {
  const key = `salud-chapters-${hub}`;
  const read = useCallback((): string[] => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
    } catch {
      return [];
    }
  }, [key]);

  const [done, setDone] = useState<string[]>(read);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setDone(read());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, read]);

  const write = (next: string[]) => {
    setDone(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* storage unavailable: progress lives for this visit only */
    }
  };

  const markDone = (id: string) => {
    if (!done.includes(id)) write([...done, id]);
  };

  const reset = () => write([]);

  return { done, markDone, reset };
}
