import React from 'react';
import { ArrowLeft, Building2, ChevronRight, ClipboardCheck, ClipboardList } from 'lucide-react';
import { DIVISIONS, HOSPITALS, HOSPITAL_SOURCES, MED_BLOCKS, type Department } from '../../../data/clinical';
import { SYMPTOMS } from '../../../data/clinical/symptoms';
import { Card, Chip, Disclaimer, HOSP_ORDER, LifeStageChips, SaludLinks } from './clinicUi';

/** What to bring to any first visit — same checklist the medical centres print on their 初診須知. */
const VISIT_PREP = [
  '健保卡、身分證件；轉診單（有的話可減少部分負擔）',
  '目前所有用藥（含保健品、中藥）或藥袋拍照；健保快易通 App 可查「健康存摺」用藥紀錄',
  '過去的檢查報告、影像光碟、出院病摘',
  '症狀紀錄：何時開始、多久一次、什麼情況加重或緩解',
  '寫下最想問的 3 個問題，並記下醫師的回答（可請家人陪同）',
];

export const ClinicDept: React.FC<{ dept: Department; go: (h: string) => void }> = ({ dept, go }) => {
  const div = DIVISIONS.find((d) => d.id === dept.division);
  const block = MED_BLOCKS.find((b) => b.id === dept.block);
  const entrySymptoms = SYMPTOMS.filter((s) => s.routes.some((r) => r.dept === dept.id));
  return (
    <div className="space-y-5">
      <button onClick={() => go('clinic')} className="inline-flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-400 hover:underline" data-print-hide>
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> 全部科別
      </button>
      <header className="rounded-3xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 p-6">
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          {div?.emoji} {div?.name_zh}
          {block && <span className="ml-2 text-slate-500">· 醫學系模組：{block.name_zh}</span>}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
          {dept.name_zh} <span className="text-base font-normal text-slate-400">{dept.name_en}</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{dept.scope_zh}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <LifeStageChips stages={dept.life_stages} />
          <Chip tone="emerald">{dept.conditions.length} 個照護路徑</Chip>
        </div>
        <p className="mt-3 text-xs text-emerald-800 dark:text-emerald-300">🎓 醫學系課程對應：{dept.curriculum_zh}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-emerald-600" aria-hidden="true" /> 什麼時候該看這一科？
          </h2>
          <ul className="mt-2 list-disc ml-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
            {dept.when_to_visit_zh.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {dept.subspecialties_zh.length > 0 && (
            <>
              <h3 className="mt-4 text-xs font-semibold text-slate-500">次專科 · 特別門診</h3>
              <div className="mt-1 flex flex-wrap gap-1">
                {dept.subspecialties_zh.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </>
          )}
        </Card>
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" aria-hidden="true" /> 在四家醫學中心叫什麼？
          </h2>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {HOSP_ORDER.map((h) => (
                <tr key={h} className="border-t border-slate-100 dark:border-slate-800">
                  <th scope="row" className="py-1.5 pr-3 text-left font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {HOSPITALS[h].short_zh}
                  </th>
                  <td className="py-1.5 text-slate-800 dark:text-slate-200">{dept.hospitals[h] ?? <span className="text-slate-400">未單獨設科（併入其他科）</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-[11px] text-slate-500">
            來源：{HOSP_ORDER.map((h) => `${HOSPITALS[h].short_zh} ${HOSPITAL_SOURCES[h].label}（${HOSPITAL_SOURCES[h].date}）`).join('；')}。
          </p>
        </Card>
      </div>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">疾病照護路徑</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {dept.conditions.map((c) => (
          <button
            key={c.id}
            onClick={() => go(`clinic/${dept.id}/${c.id}`)}
            className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface p-4 hover:border-emerald-400 flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-bold text-slate-900 dark:text-white">{c.name_zh}</span>
              {c.icd10 && <span className="text-[10px] text-slate-400 whitespace-nowrap mt-1">ICD-10 {c.icd10}</span>}
            </div>
            <div className="text-xs text-slate-400">{c.name_en}</div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3">{c.summary_zh}</p>
            {c.key_numbers.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {c.key_numbers.slice(0, 2).map((k) => (
                  <Chip key={k.label_zh} tone="emerald">
                    <b>{k.value}</b> {k.label_zh}
                  </Chip>
                ))}
              </div>
            )}
            <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
              查看完整照護路徑 <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-emerald-600" aria-hidden="true" /> 初診前準備清單
          </h2>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            {VISIT_PREP.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-emerald-600" aria-hidden="true">☐</span>
                {t}
              </li>
            ))}
          </ul>
        </Card>
        {entrySymptoms.length > 0 && (
          <Card>
            <h2 className="font-bold text-slate-900 dark:text-white">🧭 會被導到這一科的症狀</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {entrySymptoms.map((s) => (
                <button key={s.id} onClick={() => go(`clinic/by/symptom/${s.id}`)} className="rounded-full border border-amber-300 dark:border-amber-800 px-3 py-1 text-sm text-amber-800 dark:text-amber-300">
                  {s.emoji} {s.name_zh}
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {dept.salud_links && dept.salud_links.length > 0 && <SaludLinks links={dept.salud_links} go={go} />}
      <Disclaimer />
    </div>
  );
};
