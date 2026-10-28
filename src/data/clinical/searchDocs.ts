import type { SearchDoc } from '../learning/searchIndex';
import { ALL_DEPARTMENTS, DIVISION_BY_ID } from '.';
import { SYMPTOMS } from './symptoms';

/**
 * Search entries for the clinical knowledge base. Built from the full data, but the app never
 * imports this at runtime: `scripts/gen-clinic-search.ts` snapshots it into
 * `searchLite.generated.ts` so the search palette does not download every care pathway.
 * clinic.test.ts fails if the snapshot drifts from the data.
 */
export function clinicSearchDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const d of ALL_DEPARTMENTS) {
    const div = DIVISION_BY_ID[d.division];
    docs.push({
      id: `clinic:${d.id}`,
      group: '臨床科別',
      title: d.name_zh,
      subtitle: `${div?.name_zh ?? '臨床科別'} · ${d.conditions.length} 個照護路徑`,
      target: `clinic/${d.id}`,
      keywords: `${d.name_en} ${d.subspecialties_zh.join(' ')} ${Object.values(d.hospitals).join(' ')} 科別 掛號 門診`,
    });
    for (const c of d.conditions) {
      docs.push({
        id: `clinic:${d.id}:${c.id}`,
        group: '臨床科別',
        title: c.name_zh,
        subtitle: `${d.name_zh} · 照護路徑`,
        target: `clinic/${d.id}/${c.id}`,
        keywords: `${c.name_en} ${c.icd10 ?? ''} ${c.symptoms_zh.join(' ')} ${c.causes_zh.join(' ')} ${d.name_zh}`,
      });
    }
  }
  for (const s of SYMPTOMS) {
    docs.push({
      id: `clinic-symptom:${s.id}`,
      group: '臨床科別',
      title: `我該掛哪一科：${s.name_zh}`,
      subtitle: '症狀導引 · 先看紅色警訊',
      target: `clinic/by/symptom/${s.id}`,
      keywords: `${s.routes.map((r) => r.when_zh).join(' ')} 掛號 看哪科 症狀`,
    });
  }
  return docs;
}
