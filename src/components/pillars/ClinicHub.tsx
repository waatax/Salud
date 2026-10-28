import React, { useEffect, useMemo, useState } from 'react';
import {
  Stethoscope,
  Search,
  Building2,
  GraduationCap,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Activity,
  Pill,
  Bandage,
  Salad,
  Dumbbell,
  Accessibility,
  HeartHandshake,
  AlertTriangle,
  ScrollText,
  ClipboardCheck,
  Microscope,
  Link2,
  ExternalLink,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import {
  ALL_CONDITIONS,
  ALL_DEPARTMENTS,
  DIVISIONS,
  HOSPITALS,
  MED_SCHOOLS,
  departmentsByDivision,
  getDepartment,
  type Condition,
  type Department,
  type HospitalCode,
} from '../../data/clinical';

/**
 * ClinicHub — 臨床科別知識庫 (v6.0).
 *
 * Hash grammar: clinic | clinic/<deptId> | clinic/<deptId>/<conditionId>
 * The tree mirrors the department lists of NTUH / NCKUH / VGH / CCH and the
 * organ-system curricula of NTU / NYCU / NCKU medical schools.
 */

const useClinicPath = () => {
  const read = () => window.location.hash.replace(/^#/, '').split('/');
  const [parts, setParts] = useState<string[]>(read);
  useEffect(() => {
    const on = () => setParts(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return parts[0] === 'clinic' ? { deptId: parts[1], condId: parts[2] } : {};
};

const HOSP_ORDER: HospitalCode[] = ['NTUH', 'NCKUH', 'VGH', 'CCH'];

const HospitalBadges: React.FC<{ dept: Department }> = ({ dept }) => (
  <div className="flex flex-wrap gap-1">
    {HOSP_ORDER.map((h) => (
      <span
        key={h}
        title={dept.hospitals[h] ?? '—'}
        className={`text-[10px] px-1.5 py-0.5 rounded-md border ${
          dept.hospitals[h]
            ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
            : 'border-slate-200 dark:border-slate-800 text-slate-400 line-through'
        }`}
      >
        {HOSPITALS[h].short_zh}
      </span>
    ))}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface p-5 scroll-mt-24 ${className}`}>
    {children}
  </section>
);

/* ───────────────────────── Overview ───────────────────────── */

const Overview: React.FC<{ go: (h: string) => void }> = ({ go }) => {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return ALL_CONDITIONS.filter(({ dept, cond }) =>
      [cond.name_zh, cond.name_en, cond.icd10, cond.summary_zh, dept.name_zh, dept.name_en, ...cond.symptoms_zh]
        .filter(Boolean)
        .some((t) => (t as string).toLowerCase().includes(s))
    ).slice(0, 30);
  }, [q]);

  return (
    <div className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-800 text-white p-6 sm:p-8">
        <p className="text-xs tracking-widest text-emerald-100/90 font-semibold">CLINICAL DEPARTMENTS · 臨床科別知識庫</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-display font-bold">依醫學中心科別 × 醫學系課程，重建的全人健康知識樹</h1>
        <p className="mt-3 text-sm sm:text-base text-emerald-50/90 max-w-3xl leading-relaxed">
          以臺大、成大、榮總、彰基的門診科別為骨架，對應臺大、陽明交大、成大醫學系的器官系統整合課程。每一個疾病都寫成完整照護路徑：
          認識 → 診斷 → 治療 → 術後／出院照護 → 飲食 → 運動 → 復健與物理治療 → 自我照護 → 危險警訊 → 實證來源。
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3 max-w-md">
          {[
            [DIVISIONS.length, '大部門'],
            [ALL_DEPARTMENTS.length, '科別'],
            [ALL_CONDITIONS.length, '疾病照護路徑'],
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
            placeholder="搜尋疾病、症狀、科別或 ICD-10（例：膝關節、胸悶、K21）"
            className="flex-1 bg-transparent outline-none text-sm"
            aria-label="搜尋臨床科別"
          />
        </label>
      </header>

      {q && (
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white mb-3">搜尋結果（{results.length}）</h2>
          {results.length === 0 ? (
            <p className="text-sm text-slate-500">找不到符合的項目，試試其他關鍵字。</p>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-2">
              {results.map(({ dept, cond }) => (
                <li key={dept.id + cond.id}>
                  <button
                    onClick={() => go(`clinic/${dept.id}/${cond.id}`)}
                    className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 hover:border-emerald-400"
                  >
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{cond.name_zh}</div>
                    <div className="text-xs text-slate-500">
                      {dept.name_zh} · {cond.name_en}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <Building2 className="w-5 h-5 text-emerald-600" aria-hidden="true" /> 四大參考醫學中心
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {HOSP_ORDER.map((h) => (
              <li key={h} className="flex items-center justify-between gap-2">
                <span className="text-slate-700 dark:text-slate-300">
                  <b className="text-emerald-700 dark:text-emerald-400 mr-1">{HOSPITALS[h].short_zh}</b>
                  {HOSPITALS[h].name_zh}
                </span>
                <a href={HOSPITALS[h].url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-600" aria-label={`${HOSPITALS[h].short_zh}官網`}>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-500">科別名稱以各院官網門診表為準；同一疾病在不同醫院可能歸屬不同科，本站以最常見的分科呈現並標示各院名稱。</p>
        </Card>
        <Card>
          <h2 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <GraduationCap className="w-5 h-5 text-emerald-600" aria-hidden="true" /> 前三志願醫學系課程架構
          </h2>
          <div className="mt-3 space-y-3">
            {MED_SCHOOLS.map((s) => (
              <details key={s.id} className="group">
                <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-200">{s.name_zh}</summary>
                <ol className="mt-1 ml-5 list-decimal text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  {s.stages_zh.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </Card>
      </div>

      {DIVISIONS.map((div) => {
        const depts = departmentsByDivision(div.id);
        if (!depts.length) return null;
        return (
          <section key={div.id} aria-labelledby={`div-${div.id}`}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h2 id={`div-${div.id}`} className="text-xl font-display font-bold text-slate-900 dark:text-white">
                {div.name_zh}
              </h2>
              <span className="text-xs text-slate-400">{div.name_en}</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400">🎓 {div.curriculum_zh}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{div.desc_zh}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {depts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => go(`clinic/${d.id}`)}
                  className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface p-4 hover:border-emerald-400 hover:shadow-sm transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{d.name_zh}</div>
                      <div className="text-xs text-slate-400">{d.name_en}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 mt-1" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{d.scope_zh}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {d.conditions.map((c) => (
                      <span key={c.id} className="text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300">
                        {c.name_zh}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <HospitalBadges dept={d} />
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <p className="text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-4">
        ⚠️ 本知識庫為衛教用途，依國際與台灣最新臨床指引整理，不能取代醫師診斷與個別化治療。出現危險警訊請立即就醫或撥打 119。
      </p>
    </div>
  );
};

/* ───────────────────────── Department ───────────────────────── */

const DeptView: React.FC<{ dept: Department; go: (h: string) => void }> = ({ dept, go }) => {
  const div = DIVISIONS.find((d) => d.id === dept.division);
  return (
    <div className="space-y-5">
      <button onClick={() => go('clinic')} className="inline-flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> 全部科別
      </button>
      <header className="rounded-3xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 p-6">
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{div?.name_zh}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
          {dept.name_zh} <span className="text-base font-normal text-slate-400">{dept.name_en}</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{dept.scope_zh}</p>
        <p className="mt-3 text-xs text-emerald-800 dark:text-emerald-300">🎓 醫學系課程對應：{dept.curriculum_zh}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" /> 四院科別名稱
          </h2>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {HOSP_ORDER.map((h) => (
                <tr key={h} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-1.5 pr-3 font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">{HOSPITALS[h].short_zh}</td>
                  <td className="py-1.5 text-slate-800 dark:text-slate-200">{dept.hospitals[h] ?? <span className="text-slate-400">併入其他科</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-emerald-600" /> 什麼時候該看這一科？
          </h2>
          <ul className="mt-2 list-disc ml-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
            {dept.when_to_visit_zh.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {dept.subspecialties_zh.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {dept.subspecialties_zh.map((s) => (
                <span key={s} className="text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">疾病照護路徑</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {dept.conditions.map((c) => (
          <button
            key={c.id}
            onClick={() => go(`clinic/${dept.id}/${c.id}`)}
            className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-salud-dark-surface p-4 hover:border-emerald-400"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">{c.name_zh}</span>
              {c.icd10 && <span className="text-[10px] text-slate-400">ICD-10 {c.icd10}</span>}
            </div>
            <div className="text-xs text-slate-400">{c.name_en}</div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3">{c.summary_zh}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400">
              查看 10 步驟照護路徑 <ChevronRight className="w-3 h-3" />
            </span>
          </button>
        ))}
      </div>

      {dept.salud_links && dept.salud_links.length > 0 && <SaludLinks links={dept.salud_links} go={go} />}
    </div>
  );
};

const SaludLinks: React.FC<{ links: { hash: string; label_zh: string }[]; go: (h: string) => void }> = ({ links, go }) => (
  <Card>
    <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
      <Link2 className="w-4 h-4 text-emerald-600" /> Salud 延伸深度課程
    </h2>
    <div className="mt-2 flex flex-wrap gap-2">
      {links.map((l) => (
        <button
          key={l.hash}
          onClick={() => go(l.hash)}
          className="text-sm rounded-xl border border-emerald-200 dark:border-emerald-900 px-3 py-1.5 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
        >
          {l.label_zh} →
        </button>
      ))}
    </div>
  </Card>
);

/* ───────────────────────── Condition ───────────────────────── */

type SectionKey = keyof Pick<
  Condition,
  'symptoms_zh' | 'diagnosis_zh' | 'treatment_zh' | 'postop_zh' | 'diet_zh' | 'exercise_zh' | 'rehab_zh' | 'selfcare_zh' | 'red_flags_zh'
>;

const SECTIONS: { key: SectionKey; title: string; icon: React.ElementType; tone: string }[] = [
  { key: 'symptoms_zh', title: '症狀表現', icon: Activity, tone: 'text-sky-600' },
  { key: 'diagnosis_zh', title: '診斷與檢查', icon: Microscope, tone: 'text-indigo-600' },
  { key: 'treatment_zh', title: '治療選項', icon: Pill, tone: 'text-violet-600' },
  { key: 'postop_zh', title: '術後／出院照護', icon: Bandage, tone: 'text-rose-600' },
  { key: 'diet_zh', title: '飲食建議', icon: Salad, tone: 'text-lime-600' },
  { key: 'exercise_zh', title: '運動處方', icon: Dumbbell, tone: 'text-orange-600' },
  { key: 'rehab_zh', title: '復健與物理治療', icon: Accessibility, tone: 'text-teal-600' },
  { key: 'selfcare_zh', title: '自我照護與追蹤', icon: HeartHandshake, tone: 'text-emerald-600' },
  { key: 'red_flags_zh', title: '危險警訊：立即就醫', icon: AlertTriangle, tone: 'text-red-600' },
];

const ConditionView: React.FC<{ dept: Department; cond: Condition; go: (h: string) => void }> = ({ dept, cond, go }) => {
  const idx = dept.conditions.findIndex((c) => c.id === cond.id);
  const next = dept.conditions[idx + 1];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div className="space-y-5">
      <nav className="text-sm flex flex-wrap items-center gap-1 text-slate-500">
        <button onClick={() => go('clinic')} className="hover:text-emerald-700">臨床科別</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => go(`clinic/${dept.id}`)} className="hover:text-emerald-700">{dept.name_zh}</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200">{cond.name_zh}</span>
      </nav>

      <header className="rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-900 text-white p-6">
        <p className="text-xs text-emerald-200">{dept.name_zh}{cond.icd10 ? ` · ICD-10 ${cond.icd10}` : ''}</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-display font-bold">{cond.name_zh}</h1>
        <p className="text-sm text-emerald-100/80">{cond.name_en}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-100">{cond.summary_zh}</p>
      </header>

      {/* Care-pathway stepper */}
      <div className="sticky top-16 z-10 -mx-1 px-1 py-2 bg-salud-light-bg/95 dark:bg-salud-dark-bg/95 backdrop-blur overflow-x-auto" data-print-hide>
        <ol className="flex gap-1.5 min-w-max">
          {SECTIONS.filter((s) => cond[s.key]?.length).map((s, i) => (
            <li key={s.key}>
              <button
                onClick={() => scrollTo(`sec-${s.key}`)}
                className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-salud-dark-surface px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-400"
              >
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{i + 1}</span> {s.title}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => {
          const items = cond[s.key];
          if (!items?.length) return null;
          const Icon = s.icon;
          const wide = s.key === 'treatment_zh' || s.key === 'rehab_zh' || s.key === 'red_flags_zh';
          return (
            <Card
              key={s.key}
              id={`sec-${s.key}`}
              className={`${wide ? 'md:col-span-2' : ''} ${s.key === 'red_flags_zh' ? 'border-red-200 dark:border-red-900 bg-red-50/60 dark:bg-red-950/20' : ''}`}
            >
              <h2 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Icon className={`w-5 h-5 ${s.tone}`} aria-hidden="true" /> {s.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {items.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${s.key === 'red_flags_zh' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <Card>
        <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ScrollText className="w-4 h-4 text-emerald-600" /> 實證來源與指引
        </h2>
        <ul className="mt-2 space-y-1.5 text-sm">
          {cond.evidence.map((e) => (
            <li key={e.label} className="flex gap-2 text-slate-700 dark:text-slate-300">
              <BookOpen className="w-3.5 h-3.5 mt-1 text-slate-400 shrink-0" />
              {e.url ? (
                <a href={e.url} target="_blank" rel="noreferrer" className="hover:text-emerald-700 underline decoration-dotted">
                  {e.label}（{e.year}）
                </a>
              ) : (
                <span>
                  {e.label}（{e.year}）
                </span>
              )}
            </li>
          ))}
        </ul>
      </Card>

      {cond.salud_links && cond.salud_links.length > 0 && <SaludLinks links={cond.salud_links} go={go} />}

      <div className="flex flex-wrap gap-2 justify-between">
        <button onClick={() => go(`clinic/${dept.id}`)} className="inline-flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-400">
          <ArrowLeft className="w-4 h-4" /> 回 {dept.name_zh}
        </button>
        {next && (
          <button onClick={() => go(`clinic/${dept.id}/${next.id}`)} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            下一個：{next.name_zh} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-slate-500">⚠️ 衛教資訊不能取代醫師診療；用藥與手術決策請與主治醫師討論。</p>
    </div>
  );
};

export const ClinicHub: React.FC = () => {
  const { go } = useNavigation();
  const { deptId, condId } = useClinicPath();
  const dept = deptId ? getDepartment(deptId) : undefined;
  const cond = dept && condId ? dept.conditions.find((c) => c.id === condId) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [deptId, condId]);

  return (
    <div className="max-w-5xl mx-auto">
      {cond && dept ? <ConditionView dept={dept} cond={cond} go={go} /> : dept ? <DeptView dept={dept} go={go} /> : <Overview go={go} />}
    </div>
  );
};

export default ClinicHub;
export { Stethoscope as ClinicIcon };
