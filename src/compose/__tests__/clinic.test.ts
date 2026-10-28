import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHash } from '../../config/routes';
import { PILLAR_NAV } from '../../config/navigation';
import { ALL_DEPARTMENTS, ALL_CONDITIONS, DIVISIONS } from '../../data/clinical';
import { CLINIC_NAV } from '../../data/clinical/nav';

test('clinic routes parse', () => {
  assert.deepEqual(parseHash('clinic'), { kind: 'pillar', pillar: 'clinic', sub: undefined });
  assert.deepEqual(parseHash('clinic/cardiology/x'), { kind: 'pillar', pillar: 'clinic', sub: ['cardiology', 'x'] });
  assert.ok(PILLAR_NAV.some((p) => p.id === 'clinic' && p.group === 'clinic'));
});

test('sidebar index matches department data', () => {
  const navIds = CLINIC_NAV.flatMap((g) => g.depts.map((d) => d.id)).sort();
  const dataIds = ALL_DEPARTMENTS.map((d) => d.id).sort();
  assert.deepEqual(navIds, dataIds);
});

test('every department belongs to a division and ids are unique', () => {
  const ids = new Set<string>();
  for (const d of ALL_DEPARTMENTS) {
    assert.ok(DIVISIONS.some((v) => v.id === d.division), d.id);
    assert.ok(!ids.has(d.id), `dup ${d.id}`);
    ids.add(d.id);
    assert.ok(d.conditions.length >= 2, `${d.id} needs >=2 conditions`);
    assert.ok(Object.keys(d.hospitals).length >= 1, `${d.id} hospitals`);
  }
});

test('every condition is a complete care pathway', () => {
  const fields = ['symptoms_zh', 'diagnosis_zh', 'treatment_zh', 'postop_zh', 'diet_zh', 'exercise_zh', 'rehab_zh', 'selfcare_zh', 'red_flags_zh'] as const;
  const errors: string[] = [];
  for (const { dept, cond } of ALL_CONDITIONS) {
    const where = `${dept.id}/${cond.id}`;
    if (cond.summary_zh.length <= 20) errors.push(`${where} summary <= 20`);
    for (const f of fields) {
      if (!cond[f] || cond[f].length < 3) {
        errors.push(`${where}.${f} has ${cond[f]?.length ?? 0}`);
      }
    }
    if (cond.evidence.length < 2) errors.push(`${where} evidence < 2`);
    for (const e of cond.evidence) {
      if (e.year < 2000 || e.year > 2026) errors.push(`${where} year ${e.year}`);
    }
  }
  if (errors.length > 0) {
    console.error('ALL CARE PATHWAY ERRORS:\n' + errors.join('\n'));
  }
  assert.equal(errors.length, 0, `Found ${errors.length} errors:\n${errors.join('\n')}`);
});

test('all salud cross-links resolve', () => {
  const links = [
    ...ALL_DEPARTMENTS.flatMap((d) => d.salud_links ?? []),
    ...ALL_CONDITIONS.flatMap(({ cond }) => cond.salud_links ?? []),
  ];
  for (const l of links) assert.ok(parseHash(l.hash), `bad hash ${l.hash}`);
});
