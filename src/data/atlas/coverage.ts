import { ATLAS_LEVELS, type AtlasLevel, type KnowledgeAtlas } from '../../types/knowledgeAtlas';

export interface AtlasCoverage {
  /** domainId → level → number of knowledge points */
  grid: Record<string, Record<AtlasLevel, number>>;
  cellsFilled: number;
  cellsTotal: number;
  /** Empty domain × level cells, e.g. ['SLEEP:L5'] */
  gaps: string[];
  faqCovered: number;
  /** Number of domains touched by at least one FAQ answer. */
  faqDomains: number;
  prereqEdges: number;
}

/** Coverage statistics used by the atlas UI and enforced by atlas.test.ts. */
export function atlasCoverage(atlas: KnowledgeAtlas): AtlasCoverage {
  const ids = new Set(atlas.points.map((p) => p.id));
  const grid: AtlasCoverage['grid'] = {};
  const gaps: string[] = [];
  let cellsFilled = 0;
  for (const d of atlas.domains) {
    grid[d.id] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const p of atlas.points) if (p.domain === d.id) grid[d.id][p.level] += 1;
    for (const lv of ATLAS_LEVELS) {
      if (grid[d.id][lv.level] > 0) cellsFilled += 1;
      else gaps.push(`${d.id}:L${lv.level}`);
    }
  }
  const faqCovered = atlas.faqs.filter((f) => f.kps.length > 0 && f.kps.every((k) => ids.has(k))).length;
  const domainOf = Object.fromEntries(atlas.points.map((p) => [p.id, p.domain]));
  const faqDomains = new Set(atlas.faqs.flatMap((f) => f.kps.map((k) => domainOf[k]).filter(Boolean))).size;
  const prereqEdges = atlas.points.reduce((n, p) => n + (p.prereq?.length ?? 0), 0);
  return { grid, cellsFilled, cellsTotal: atlas.domains.length * ATLAS_LEVELS.length, gaps, faqCovered, faqDomains, prereqEdges };
}
