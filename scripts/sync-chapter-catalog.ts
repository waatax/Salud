/**
 * Rewrites page_count / kp_count / figure_count / status in src/data/chapterCatalog.ts from the
 * real page data. The app reads these counts before a chapter's pages load (chapterPages.ts);
 * src/compose/__tests__/chapterPages.test.ts fails when they drift. Run: npx tsx scripts/sync-chapter-catalog.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { CHAPTERS } from '../src/data/chapters';

const path = 'src/data/chapterCatalog.ts';
let text = readFileSync(path, 'utf8');
for (const c of CHAPTERS) {
  const start = text.indexOf(`id: '${c.id}',`);
  if (start < 0) throw new Error(`chapter ${c.id} not found in catalog`);
  const end = text.indexOf('\n  }', start);
  const block = text
    .slice(start, end)
    .replace(/page_count: \d+/, `page_count: ${c.page_count}`)
    .replace(/kp_count: \d+/, `kp_count: ${c.kp_count}`)
    .replace(/figure_count: \d+/, `figure_count: ${c.figure_count}`)
    .replace(/status: '[A-Z_]+'/, `status: '${c.status}'`);
  text = text.slice(0, start) + block + text.slice(end);
}
writeFileSync(path, text);
console.log(CHAPTERS.map((c) => `${c.id}:${c.page_count}p/${c.kp_count}kp/${c.figure_count}f`).join(' '));
