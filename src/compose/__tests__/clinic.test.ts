import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHash, PILLAR_TABS } from '../../config/routes';
import { PILLAR_NAV } from '../../config/navigation';
import { DEPARTMENT_INDEX, DIVISIONS, MED_BLOCKS } from '../../data/clinical';
import { ADDITION_TARGETS, ALL_CONDITIONS, ALL_DEPARTMENTS, findCondition, summarizeDepartment } from '../../data/clinical/full';
import { CLINIC_NAV, CLINIC_DEPT_COUNT } from '../../data/clinical/nav';
import { HOSPITAL_MAP } from '../../data/clinical/hospitalMap';
import { DEPTH } from '../../data/clinical/depth';
import { SYMPTOMS } from '../../data/clinical/symptoms';
import { parseClinicPath } from '../../components/pillars/clinic/clinicPath';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';
import { clinicSearchDocs } from '../../data/clinical/searchDocs';
import { CLINIC_SEARCH_DOCS } from '../../data/clinical/searchLite.generated';
import type { HealthPillar } from '../../types';

test('clinic routes parse, including overview views', () => {
  assert.deepEqual(parseHash('clinic'), { kind: 'pillar', pillar: 'clinic', sub: undefined });
  assert.deepEqual(parseHash('clinic/cardiology/x'), { kind: 'pillar', pillar: 'clinic', sub: ['cardiology', 'x'] });
  assert.ok(PILLAR_NAV.some((p) => p.id === 'clinic' && p.group === 'clinic'));
  assert.deepEqual(parseClinicPath('#clinic/by/symptom/chest_pain'), { view: 'symptom', viewId: 'chest_pain' });
  assert.deepEqual(parseClinicPath('#clinic/gastro/gerd'), { deptId: 'gastro', condId: 'gerd' });
  assert.deepEqual(parseClinicPath('#clinic/by/nonsense'), { view: 'dept', viewId: undefined });
});

test('sidebar index matches department data, in division order', () => {
  const navIds = CLINIC_NAV.flatMap((g) => g.depts.map((d) => d.id));
  assert.deepEqual(navIds, ALL_DEPARTMENTS.map((d) => d.id), 'display order comes from nav.ts');
  assert.deepEqual(CLINIC_NAV.map((g) => g.division), DIVISIONS.map((d) => d.id));
  for (const g of CLINIC_NAV) {
    for (const d of g.depts) assert.equal(ALL_DEPARTMENTS.find((x) => x.id === d.id)?.division, g.division, d.id);
  }
  assert.equal(CLINIC_DEPT_COUNT, ALL_DEPARTMENTS.length);
  const blurb = PILLAR_NAV.find((p) => p.id === 'clinic')!.blurb_zh;
  assert.ok(blurb.includes(`${DIVISIONS.length} 部`) && blurb.includes(`${ALL_DEPARTMENTS.length} 科`), `sidebar blurb "${blurb}" is stale`);
});

test('every department is placed in the taxonomy and mapped to the four hospitals', () => {
  const ids = new Set<string>();
  for (const d of ALL_DEPARTMENTS) {
    assert.notEqual(d.id, 'by', 'reserved for clinic/by/<view>');
    assert.ok(!ids.has(d.id), `dup ${d.id}`);
    ids.add(d.id);
    assert.ok(DIVISIONS.some((v) => v.id === d.division), d.id);
    assert.ok(d.conditions.length >= 3, `${d.id} needs >=3 conditions, has ${d.conditions.length}`);
    assert.ok(Object.keys(d.hospitals).length >= 2, `${d.id} needs hospital names`);
    assert.equal(MED_BLOCKS.filter((b) => b.depts.includes(d.id)).length, 1, `${d.id} must sit in exactly one med-school block`);
    assert.ok(d.when_to_visit_zh.length >= 3 && d.subspecialties_zh.length >= 2, `${d.id} visit/subspecialty lists`);
  }
  for (const k of Object.keys(HOSPITAL_MAP)) assert.ok(ids.has(k), `hospitalMap has unknown dept ${k}`);
  for (const b of MED_BLOCKS) for (const id of b.depts) assert.ok(ids.has(id), `block ${b.id} lists unknown dept ${id}`);
  for (const t of ADDITION_TARGETS) assert.ok(ids.has(t), `additions target unknown dept ${t}`);
  for (const v of DIVISIONS) assert.ok(ALL_DEPARTMENTS.filter((d) => d.division === v.id).length >= 3, `${v.id} needs >=3 departments`);
});

test('every condition is a complete, deep care pathway', () => {
  /** Diseases: every core list needs >=3 items. Topics (exam / procedure / decision guides) need fewer. */
  const CORE = ['causes_zh', 'symptoms_zh', 'diagnosis_zh', 'treatment_zh', 'selfcare_zh', 'prevention_zh', 'questions_zh', 'red_flags_zh'] as const;
  const TOPIC_CORE = ['diagnosis_zh', 'treatment_zh', 'questions_zh'] as const;
  /** Care lists may be left empty when they do not apply, but never hold a lone filler bullet. */
  const CARE = ['postop_zh', 'diet_zh', 'exercise_zh', 'rehab_zh'] as const;
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const { dept, cond } of ALL_CONDITIONS) {
    const where = `${dept.id}/${cond.id}`;
    const topic = cond.kind === 'topic';
    if (seen.has(cond.id)) errors.push(`${where} duplicate condition id`);
    seen.add(cond.id);
    if (cond.summary_zh.length < 40) errors.push(`${where} summary < 40 chars`);
    for (const f of topic ? TOPIC_CORE : CORE) if (!cond[f] || cond[f].length < 3) errors.push(`${where}.${f} has ${cond[f]?.length ?? 0}`);
    if (topic && (cond.causes_zh.length < 2 || cond.red_flags_zh.length < 1)) errors.push(`${where} topic needs causes>=2 and a red flag`);
    for (const f of CARE) if (cond[f].length === 1) errors.push(`${where}.${f} has a single bullet`);
    if (!topic && CARE.filter((f) => cond[f].length >= 2).length < 3) errors.push(`${where} needs >=3 of postop/diet/exercise/rehab`);
    const all = [...CORE, ...CARE].flatMap((f) => cond[f]);
    if (all.some((t) => /不適用|非適用/.test(t))) errors.push(`${where} has a placeholder bullet`);
    if (cond.key_numbers.length < 2) errors.push(`${where} key_numbers < 2`);
    if (cond.prognosis_zh.length < 20) errors.push(`${where} prognosis missing`);
    if (cond.timeline.length < 3) errors.push(`${where} timeline < 3 phases`);
    for (const p of cond.timeline) if (!p.goal_zh || p.do_zh.length === 0) errors.push(`${where} timeline "${p.when_zh}" empty`);
    if (cond.evidence.length < 2) errors.push(`${where} evidence < 2`);
    if (!cond.evidence.some((e) => e.year >= 2019)) errors.push(`${where} has no evidence from 2019 or later`);
    for (const e of cond.evidence) if (e.year < 2000 || e.year > 2026) errors.push(`${where} year ${e.year}`);
  }
  if (errors.length) console.error('CARE PATHWAY GAPS:\n' + errors.join('\n'));
  assert.equal(errors.length, 0, `Found ${errors.length} gaps`);
});

test('the depth overlay only targets real conditions', () => {
  const ids = new Set(ALL_CONDITIONS.map((x) => x.cond.id));
  for (const k of Object.keys(DEPTH)) assert.ok(ids.has(k), `DEPTH has orphan key ${k}`);
});

test('all salud cross-links resolve to a real hub tab', () => {
  const links = [
    ...ALL_DEPARTMENTS.flatMap((d) => (d.salud_links ?? []).map((l) => ({ ...l, from: d.id }))),
    ...ALL_CONDITIONS.flatMap(({ cond }) => (cond.salud_links ?? []).map((l) => ({ ...l, from: cond.id }))),
  ];
  for (const l of links) {
    const r = parseHash(l.hash);
    assert.ok(r, `${l.from}: bad hash ${l.hash}`);
    if (r.kind === 'pillar' && r.sub?.[0]) {
      const tabs = PILLAR_TABS[r.pillar as HealthPillar];
      if (tabs) assert.ok(tabs.includes(r.sub[0]), `${l.from}: ${l.hash} is not a tab of ${r.pillar}`);
    }
  }
});

test('symptom navigator routes to real departments and their own conditions', () => {
  const ids = new Set<string>();
  for (const s of SYMPTOMS) {
    assert.ok(!ids.has(s.id), `dup symptom ${s.id}`);
    ids.add(s.id);
    assert.ok(s.emergency_zh.length >= 1 && s.routes.length >= 2, `${s.id} needs red flags and >=2 routes`);
    for (const r of s.routes) {
      const dept = ALL_DEPARTMENTS.find((d) => d.id === r.dept);
      assert.ok(dept, `${s.id}: unknown dept ${r.dept}`);
      if (r.cond) {
        const hit = findCondition(r.cond);
        assert.ok(hit, `${s.id}: unknown condition ${r.cond}`);
        assert.equal(hit.dept.id, r.dept, `${s.id}: ${r.cond} lives in ${hit.dept.id}, not ${r.dept}`);
      }
    }
  }
});

test('clinic departments, pathways and symptom entries are reachable from site search', () => {
  assert.deepEqual(CLINIC_SEARCH_DOCS, clinicSearchDocs(), 'searchLite.generated.ts is stale: run npm run export:data');
  const docs = buildSearchIndex();
  const hit = (q: string, target: string) => assert.ok(searchDocs(docs, q).some((d) => d.target === target), `search "${q}" should reach ${target}`);
  hit('幽門桿菌', 'clinic/gastro/h_pylori_gastric');
  hit('新生兒科', 'clinic/neonatology');
  hit('胸悶', 'clinic/by/symptom/chest_pain');
  hit('K21', 'clinic/gastro/gerd');
  for (const { dept, cond } of ALL_CONDITIONS) assert.ok(docs.some((d) => d.target === `clinic/${dept.id}/${cond.id}`), `${cond.id} not indexed`);
});

test('the light index and per-department pathway chunks match the data', () => {
  const stale = 'run npm run export:data';
  assert.deepEqual(DEPARTMENT_INDEX, ALL_DEPARTMENTS.map(summarizeDepartment), `catalog.generated.ts is stale: ${stale}`);
  const dir = new URL('../../data/clinical/pathways/', import.meta.url);
  const files = readdirSync(dir).sort();
  assert.deepEqual(files, ALL_DEPARTMENTS.map((d) => `${d.id}.json`).sort(), `pathways/ does not hold one file per department: ${stale}`);
  for (const d of ALL_DEPARTMENTS) {
    const chunk = JSON.parse(readFileSync(new URL(`${d.id}.json`, dir), 'utf8'));
    assert.deepEqual(chunk, JSON.parse(JSON.stringify(d)), `pathways/${d.id}.json is stale: ${stale}`);
  }
});

test('the app bundle never reaches the full clinical data', () => {
  // Walk relative imports (static, re-export and dynamic) from the entry. Type-only imports are erased
  // at build time, so they are skipped; the pathway JSON is reached only through import.meta.glob.
  const SRC = fileURLToPath(new URL('../../', import.meta.url));
  const CLINICAL = join(SRC, 'data', 'clinical');
  const LIGHT = new Set(['index.ts', 'types.ts', 'taxonomy.ts', 'hospitalMap.ts', 'symptoms.ts', 'nav.ts', 'catalog.generated.ts', 'searchLite.generated.ts', 'loadDepartment.ts']);
  const resolveImport = (from: string, spec: string) => {
    const base = resolve(dirname(from), spec);
    return [base, `${base}.ts`, `${base}.tsx`, join(base, 'index.ts'), join(base, 'index.tsx')].find((f) => existsSync(f) && statSync(f).isFile());
  };
  const seen = new Set<string>();
  const walk = (file: string) => {
    if (seen.has(file) || !/\.tsx?$/.test(file)) return;
    seen.add(file);
    const code = readFileSync(file, 'utf8').replace(/^\s*(?:import|export)\s+type\s[^;]*;/gm, '');
    for (const m of code.matchAll(/(?:from\s+|import\s*\(\s*|^\s*import\s+)['"](\.[^'"]+)['"]/gm)) {
      const next = resolveImport(file, m[1]);
      if (next) walk(next);
    }
  };
  walk(join(SRC, 'main.tsx'));
  const heavy = [...seen].filter((f) => f.startsWith(CLINICAL) && !(dirname(f) === CLINICAL && LIGHT.has(relative(CLINICAL, f))));
  assert.ok(seen.has(join(CLINICAL, 'loadDepartment.ts')), 'walker should reach the clinic hub');
  assert.deepEqual(heavy.map((f) => relative(SRC, f)), [], 'app code imports the full clinical data; use data/clinical (light index) or loadDepartment');
});
