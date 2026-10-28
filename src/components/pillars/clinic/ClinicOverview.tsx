import React, { useMemo, useState } from 'react';
import { Building2, ChevronRight, GraduationCap, Search, Stethoscope } from 'lucide-react';
import {
  ALL_CONDITIONS,
  ALL_DEPARTMENTS,
  DIVISIONS,
  HOSPITALS,
  HOSPITAL_SOURCES,
  LIFE_STAGES,
  MED_BLOCKS,
  MED_SCHOOLS,
  conditionLifeStages,
  departmentsByDivision,
  getDepartment,
} from '../../../data/clinical';
import { SYMPTOMS } from '../../../data/clinical/symptoms';
import { Card, Chip, Disclaimer, HOSP_ORDER, HospitalBadges, HospitalSourceLink, RowLink } from './clinicUi';
import { SymptomNavigator } from './ClinicSymptoms';

export type OverviewView = 'dept' | 'symptom' | 'system' | 'stage' | 'hospital';

const VIEWS: { id: OverviewView; label: string; hint: string }[] = [
  { id: 'dept', label: '🏥 依部門科別', hint: '醫學中心怎麼分科' },
  { id: 'symptom', label: '🧭 我該掛哪一科？', hint: '從症狀找科別' },
  { id: 'system', label: '🎓 依器官系統', hint: '醫學系怎麼學' },
  { id: 'stage', label: '👶🧓 依生命階段', hint: '從孕產到安寧' },
  { id: 'hospital', label: '🗂️ 四院科別對照', hint: '臺大·成大·北榮·彰基' },
];

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '');

/** Search over conditions, departments and symptom entries. */
const useClinicSearch = (q: string) =>
  useMemo(() => {
    const s = norm(q);
    if (!s) return null;
    const hit = (...texts: (string | undefined)[]) => texts.some((t) => t && norm(t).includes(s));
    const conds = ALL_CONDITIONS.filter(({ dept, cond }) =>
      hit(cond.name_zh, cond.name_en, cond.icd10, cond.summary_zh, dept.name_zh, ...cond.symptoms_zh, ...cond.causes_zh, ...cond.treatment_zh)
    ).slice(0, 40);
    const depts = ALL_DEPARTMENTS.filter((d) => hit(d.name_zh, d.name_en, d.scope_zh, ...d.subspecialties_zh, ...Object.values(d.hospitals)));
    const symptoms = SYMPTOMS.filter((x) => hit(x.name_zh, ...x.routes.map((r) => r.when_zh)));
    return { conds, depts, symptoms };
  }, [q]);

export const ClinicOverview: React.FC<{ view: OverviewView; symptomId?: string; go: (h: string) => void }> = ({ view, symptomId, go }) => {
  const [q, setQ] = useState('');
  const results = useClinicSearch(q);
  const setView = (v: OverviewView) => go(v === 'dept' ? 'clinic' : `clinic/by/${v}`);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-800 text-white p-6 sm:p-8">
        <p className="text-xs tracking-widest text-emerald-100/90 font-semibold">CLINICAL DEPARTMENTS · 臨床科別知識庫 v6.1</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-display font-bold">依醫學中心分科 × 醫學系課程 × 生命階段，重建的全人健康知識樹</h1>
        <p className="mt-3 text-sm sm:text-base text-emerald-50/90 max-w-3xl leading-relaxed">
          以臺大、成大、臺北榮總、彰基實際公布的部科為骨架，對應臺大、陽明交大、成大醫學系的器官系統課程。每個疾病都是完整照護路徑：
          重點數字 → 原因 → 症狀 → 診斷 → 治療 → 術後與復原時間軸 → 飲食 → 運動 → 復健與物理治療 → 自我照護 → 預防 → 預後 → 看診問醫師 → 台灣資源 → 危險警訊 → 實證。
        </p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          {[
            [DIVISIONS.length, '大部門'],
            [ALL_DEPARTMENTS.length, '科別'],
            [ALL_CONDITIONS.length, '照護路徑'],
            [SYMPTOMS.length, '症狀入口'],
          ].map(([n, l]) => (
            <div key={l as string} className="rounded-xl bg-white/10 px-3 py-2">
              <div className="text-2xl font-bold">{n}</div>
              <div className="text-xs text-emerald-50/80">{l}</div>
            </div>
          ))}
        </div>
        <label className="mt-6 flex items-center gap-2 rounded-xl bg-white text-slate-800 px-3 py-2.5 max-w-xl">
          <Search className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋疾病、症狀、科別、ICD-10（例：膝蓋、胸悶、K21、臺大骨科部）"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm"
            aria-label="搜尋臨床科別"
          />
        </label>
      </header>

      {results && (
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white mb-3">
            搜尋「{q}」：{results.conds.length} 個照護路徑 · {results.depts.length} 個科別 · {results.symptoms.length} 個症狀入口
          </h2>
          {results.conds.length + results.depts.length + results.symptoms.length === 0 ? (
            <p className="text-sm text-slate-500">找不到符合的項目，試試其他關鍵字，或用下方「我該掛哪一科？」從症狀開始。</p>
          ) : (
            <div className="space-y-4">
              {results.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {results.symptoms.map((x) => (
                    <button key={x.id} onClick={() => go(`clinic/by/symptom/${x.id}`)} className="rounded-full border border-amber-300 dark:border-amber-800 px-3 py-1 text-sm text-amber-800 dark:text-amber-300">
                      {x.emoji} {x.name_zh} → 該掛哪科
                    </button>
                  ))}
                </div>
              )}
              {results.depts.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-2">
                  {results.depts.map((d) => (
                    <li key={d.id}>
                      <RowLink onClick={() => go(`clinic/${d.id}`)} title={`🏥 ${d.name_zh}`} sub={d.name_en} />
                    </li>
                  ))}
                </ul>
              )}
              {results.conds.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-2">
                  {results.conds.map(({ dept, cond }) => (
                    <li key={dept.id + cond.id}>
                      <RowLink onClick={() => go(`clinic/${dept.id}/${cond.id}`)} title={cond.name_zh} sub={`${dept.name_zh} · ${cond.name_en}`} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Card>
      )}

      <nav aria-label="瀏覽方式" className="-mx-1 px-1 overflow-x-auto" data-print-hide>
        <div role="tablist" className="flex gap-2 min-w-max">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={view === v.id}
              onClick={() => setView(v.id)}
              className={`rounded-2xl border px-3 py-2 text-left transition ${
                view === v.id
                  ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface text-slate-700 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              <span className="block text-sm font-bold">{v.label}</span>
              <span className={`block text-[11px] ${view === v.id ? 'text-emerald-50' : 'text-slate-400'}`}>{v.hint}</span>
            </button>
          ))}
        </div>
      </nav>

      {view === 'dept' && <ByDivision go={go} />}
      {view === 'symptom' && <SymptomNavigator symptomId={symptomId} go={go} />}
      {view === 'system' && <BySystem go={go} />}
      {view === 'stage' && <ByStage go={go} />}
      {view === 'hospital' && <HospitalMatrix go={go} />}

      <Disclaimer />
    </div>
  );
};

/* ─────────────── 依部門 ─────────────── */

const ByDivision: React.FC<{ go: (h: string) => void }> = ({ go }) => (
  <div className="space-y-8">
    {DIVISIONS.map((div) => {
      const depts = departmentsByDivision(div.id);
      if (!depts.length) return null;
      const n = depts.reduce((s, d) => s + d.conditions.length, 0);
      return (
        <section key={div.id} aria-labelledby={`div-${div.id}`}>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
            <h2 id={`div-${div.id}`} className="text-xl font-display font-bold text-slate-900 dark:text-white">
              <span aria-hidden="true">{div.emoji}</span> {div.name_zh}
            </h2>
            <span className="text-xs text-slate-400">{div.name_en}</span>
            <span className="text-xs text-slate-500">
              {depts.length} 科 · {n} 照護路徑
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{div.desc_zh}</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 mb-3">🎓 {div.curriculum_zh}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {depts.map((d) => (
              <button
                key={d.id}
                onClick={() => go(`clinic/${d.id}`)}
                className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface p-4 hover:border-emerald-400 hover:shadow-sm transition flex flex-col"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{d.name_zh}</div>
                    <div className="text-xs text-slate-400">{d.name_en}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 mt-1 shrink-0" aria-hidden="true" />
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{d.scope_zh}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {d.conditions.slice(0, 5).map((c) => (
                    <Chip key={c.id}>{c.name_zh.split('：')[0].split('（')[0]}</Chip>
                  ))}
                  {d.conditions.length > 5 && <Chip>+{d.conditions.length - 5}</Chip>}
                </div>
                <div className="mt-auto pt-3">
                  <HospitalBadges dept={d} />
                </div>
              </button>
            ))}
          </div>
        </section>
      );
    })}
    <MedSchoolCard />
  </div>
);

/* ─────────────── 依器官系統 ─────────────── */

const BySystem: React.FC<{ go: (h: string) => void }> = ({ go }) => (
  <div className="space-y-4">
    <p className="text-sm text-slate-600 dark:text-slate-400">
      醫學系三、四年級以「器官系統」整合基礎與臨床：同一個器官的生理、病理、藥理與內外科治療一起學。以下把 Salud 的科別依這個邏輯重新排列，適合想系統性理解一個器官的人。
    </p>
    <div className="grid md:grid-cols-2 gap-3">
      {MED_BLOCKS.map((b) => {
        const depts = b.depts.map(getDepartment).filter(Boolean) as NonNullable<ReturnType<typeof getDepartment>>[];
        return (
          <Card key={b.id}>
            <h2 className="font-bold text-slate-900 dark:text-white">
              <span aria-hidden="true">{b.emoji}</span> {b.name_zh}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{b.desc_zh}</p>
            <div className="mt-3 space-y-2">
              {depts.map((d) => (
                <div key={d.id}>
                  <button onClick={() => go(`clinic/${d.id}`)} className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 hover:underline">
                    {d.name_zh} →
                  </button>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {d.conditions.map((c) => (
                      <button key={c.id} onClick={() => go(`clinic/${d.id}/${c.id}`)} className="text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-950">
                        {c.name_zh.split('：')[0].split('（')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
    <MedSchoolCard />
  </div>
);

const MedSchoolCard: React.FC = () => (
  <Card>
    <h2 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
      <GraduationCap className="w-5 h-5 text-emerald-600" aria-hidden="true" /> 前三志願醫學系課程架構
    </h2>
    <div className="mt-3 grid md:grid-cols-3 gap-3">
      {MED_SCHOOLS.map((s) => (
        <div key={s.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{s.name_zh}</p>
          <p className="text-[11px] text-slate-400">{s.hospital_zh}</p>
          <ol className="mt-2 ml-4 list-decimal text-xs text-slate-600 dark:text-slate-400 space-y-1">
            {s.stages_zh.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
    <p className="mt-3 text-[11px] text-slate-500">各校模組名稱與學期安排每年微調，以各校課程地圖為準；Salud 以三校共通的器官系統與核心見實習科別作為分類依據。</p>
  </Card>
);

/* ─────────────── 依生命階段 ─────────────── */

const ByStage: React.FC<{ go: (h: string) => void }> = ({ go }) => (
  <div className="space-y-4">
    {LIFE_STAGES.map((s) => {
      const items = ALL_CONDITIONS.filter(({ dept, cond }) => conditionLifeStages(dept, cond).includes(s.id));
      return (
        <Card key={s.id}>
          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="font-bold text-slate-900 dark:text-white">
              <span aria-hidden="true">{s.emoji}</span> {s.name_zh}
            </h2>
            <span className="text-xs text-slate-500">{s.desc_zh}</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400">{items.length} 個照護路徑</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {items.map(({ dept, cond }) => (
              <button
                key={dept.id + cond.id}
                onClick={() => go(`clinic/${dept.id}/${cond.id}`)}
                className="text-xs rounded-full border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-slate-700 dark:text-slate-300 hover:border-emerald-400"
                title={dept.name_zh}
              >
                {cond.name_zh.split('：')[0].split('（')[0]}
              </button>
            ))}
          </div>
        </Card>
      );
    })}
  </div>
);

/* ─────────────── 四院對照 ─────────────── */

const HospitalMatrix: React.FC<{ go: (h: string) => void }> = ({ go }) => (
  <div className="space-y-4">
    <Card>
      <h2 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
        <Building2 className="w-5 h-5 text-emerald-600" aria-hidden="true" /> 四院科別名稱從哪裡來？
      </h2>
      <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
        {HOSP_ORDER.map((h) => (
          <li key={h}>
            <b className="text-emerald-700 dark:text-emerald-400 mr-1">{HOSPITALS[h].short_zh}</b>
            {HOSPITALS[h].name_zh}：
            <HospitalSourceLink url={HOSPITAL_SOURCES[h].url}>
              {HOSPITAL_SOURCES[h].label}（{HOSPITAL_SOURCES[h].date}）
            </HospitalSourceLink>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-slate-500">
        「部」是醫院的大單位，「科」是門診掛號的單位。括號表示該院把這個專科放在較大的部或中心裡；「—」表示未單獨設科，通常由其他科處理（例如臺大、成大未設中醫部）。掛號前請以各院官網最新門診表為準。
      </p>
    </Card>
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-[760px] w-full text-sm bg-white dark:bg-salud-dark-surface">
        <caption className="sr-only">Salud 科別與四家醫學中心部科名稱對照</caption>
        <thead className="bg-slate-50 dark:bg-slate-900 text-left">
          <tr>
            <th scope="col" className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-300">Salud 科別</th>
            {HOSP_ORDER.map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                {HOSPITALS[h].short_zh}
              </th>
            ))}
          </tr>
        </thead>
        {DIVISIONS.map((div) => (
          <tbody key={div.id}>
            <tr className="bg-emerald-50/70 dark:bg-emerald-950/30">
              <th colSpan={5} scope="colgroup" className="px-3 py-1.5 text-left text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {div.emoji} {div.name_zh}
              </th>
            </tr>
            {departmentsByDivision(div.id).map((d) => (
              <tr key={d.id} className="border-t border-slate-100 dark:border-slate-800 align-top">
                <th scope="row" className="px-3 py-1.5 text-left font-medium">
                  <button onClick={() => go(`clinic/${d.id}`)} className="text-emerald-800 dark:text-emerald-300 hover:underline">
                    {d.name_zh}
                  </button>
                </th>
                {HOSP_ORDER.map((h) => (
                  <td key={h} className="px-3 py-1.5 text-slate-700 dark:text-slate-300">
                    {d.hospitals[h] ?? <span className="text-slate-400">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
    <p className="text-xs text-slate-500 flex items-center gap-1">
      <Stethoscope className="w-3.5 h-3.5" aria-hidden="true" /> 同一疾病在不同醫院可能歸屬不同科（例如脊椎手術在骨科部脊椎科或神經外科），Salud 以最常見的分科呈現並在每一科標示四院名稱。
    </p>
  </div>
);
