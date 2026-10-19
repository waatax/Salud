/**
 * Curriculum audit — checks every nutrition chapter against the SALUD spec §5.1 blueprint
 * (page targets) and the chapter knowledge config (categories, constants, pathway links).
 * Run: npx tsx scripts/curriculum-audit.ts
 */
import { CHAPTERS, getChapterPages } from '../src/data/chapters';
import { CHAPTER_KNOWLEDGE_CONFIGS } from '../src/data/chapterKnowledgeConfig';
import { FIGURES_CATALOG } from '../src/data/figuresMeta';
import { CURRICULUM_FIGURES } from '../src/data/curriculumFigures';

const SPEC_PAGES: Record<string, number> = { W: 12, O: 12, A: 13, E: 10, P: 8, C: 10, S: 8, N: 8, M: 12, D: 10, F: 12 };

let problems = 0;
const warn = (msg: string) => { problems++; console.log('  ✗ ' + msg); };

for (const ch of CHAPTERS) {
  const pages = getChapterPages(ch.id);
  const cfg = (CHAPTER_KNOWLEDGE_CONFIGS as any)[ch.id];
  const ids = new Set(pages.map((p) => p.id));
  const kps = pages.flatMap((p) => p.kps);
  const figs = pages.flatMap((p) => p.figure_ids);
  const bespoke = figs.filter((f) => FIGURES_CATALOG[f] || CURRICULUM_FIGURES[f]).length;
  const quizzes = pages.reduce((n, p) => n + p.quiz_items.length, 0);
  console.log(`${ch.id} ${ch.title_zh}: pages ${pages.length}/${SPEC_PAGES[ch.id]} · KPs ${kps.length} · figures ${figs.length} (bespoke ${bespoke}) · quiz ${quizzes}`);
  if (pages.length < SPEC_PAGES[ch.id]) warn(`below spec page target (${pages.length} < ${SPEC_PAGES[ch.id]})`);
  if (bespoke < figs.length) warn(`${figs.length - bespoke} figure(s) fall back to the generic placeholder`);
  const kpIds = new Set<string>();
  for (const p of pages) {
    if (p.kps.length < 3) warn(`${p.id} has only ${p.kps.length} KPs`);
    if (p.quiz_items.length < 1) warn(`${p.id} has no quiz`);
    if (p.figure_ids.length < 2) warn(`${p.id} has < 2 figures`);
    for (const k of p.kps) {
      if (kpIds.has(k.id)) warn(`duplicate KP id ${k.id}`);
      kpIds.add(k.id);
      if (k.page_id !== p.id) warn(`${k.id} page_id mismatch`);
      for (const f of k.figure_ids) if (!p.figure_ids.includes(f)) warn(`${k.id} cites ${f} which is not on ${p.id}`);
    }
    for (const q of p.quiz_items) {
      if (q.correct_index < 0 || q.correct_index >= q.options.length) warn(`${q.id} correct_index out of range`);
      if (!p.kps.some((k) => k.id === q.kp_id)) warn(`${q.id} points at KP ${q.kp_id} not on page`);
    }
    for (const pre of p.prerequisites) if (!/^PAGE-[A-Z]-\d\d$/.test(pre)) warn(`${p.id} odd prerequisite ${pre}`);
  }
  if (!cfg) continue;
  const catIds = new Set(cfg.categories.map((c: any) => c.id));
  for (const p of pages) if (p.category && !catIds.has(p.category)) warn(`${p.id} category "${p.category}" not a filter chip`);
  for (const c of cfg.categories) if (c.id !== 'all' && !pages.some((p) => p.category === c.id)) warn(`category chip "${c.id}" matches 0 pages`);
  for (const k of cfg.clinicalConstants) if (!ids.has(k.targetPage)) warn(`constant ${k.id} → missing ${k.targetPage}`);
  const inPath = new Set<string>();
  for (const s of cfg.learningPathway) for (const t of s.targetPages) { if (!ids.has(t)) warn(`pathway step ${s.step} → missing ${t}`); inPath.add(t); }
  for (const p of pages) if (!inPath.has(p.id)) warn(`${p.id} not on the learning pathway`);
}
console.log(problems ? `\n${problems} curriculum problem(s)` : '\n✅ curriculum audit clean');
