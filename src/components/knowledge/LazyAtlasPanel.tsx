import React, { lazy, Suspense, useEffect, useState } from 'react';
import type { KnowledgeAtlas } from '../../types/knowledgeAtlas';

export type AtlasTopicKey = 'longevity' | 'sleep' | 'strength';

const KnowledgeAtlasView = lazy(() =>
  import('./KnowledgeAtlasView').then((m) => ({ default: m.KnowledgeAtlasView }))
);

async function loadAtlas(topic: AtlasTopicKey): Promise<KnowledgeAtlas> {
  switch (topic) {
    case 'longevity':
      return (await import('../../data/atlas/longevityAtlas')).LONGEVITY_ATLAS;
    case 'sleep':
      return (await import('../../data/atlas/sleepAtlas')).SLEEP_ATLAS;
    case 'strength':
      return (await import('../../data/atlas/strengthEnduranceAtlas')).STRENGTH_ENDURANCE_ATLAS;
  }
}

/**
 * LazyAtlasPanel — loads ONLY the requested 65–71 KB atlas data + SVG renderer
 * on demand, keeping hub bundles lean and avoiding the barrel `data/atlas/index.ts`.
 */
export const LazyAtlasPanel: React.FC<{ topic: AtlasTopicKey }> = ({ topic }) => {
  const [atlas, setAtlas] = useState<KnowledgeAtlas | null>(null);

  useEffect(() => {
    let active = true;
    loadAtlas(topic).then((data) => {
      if (active) setAtlas(data);
    });
    return () => {
      active = false;
    };
  }, [topic]);

  if (!atlas) {
    return (
      <div className="py-12 text-center text-sm text-slate-500" role="status">
        載入知識點全圖…
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-slate-500" role="status">載入知識點全圖…</div>}>
      <KnowledgeAtlasView atlas={atlas} />
    </Suspense>
  );
};
