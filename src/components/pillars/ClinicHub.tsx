import React, { useEffect, useReducer, useState } from 'react';
import { ArrowLeft, RefreshCw, Stethoscope } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { deptSummary, type DepartmentSummary } from '../../data/clinical';
import { loadDepartment, peekDepartment } from '../../data/clinical/loadDepartment';
import { ClinicOverview } from './clinic/ClinicOverview';
import { ClinicDept } from './clinic/ClinicDept';
import { ClinicCondition } from './clinic/ClinicCondition';
import { parseClinicPath } from './clinic/clinicPath';

/**
 * ClinicHub — 臨床科別知識庫 (v6.1). Hash grammar: see clinicPath.ts.
 * Overviews render from the light index; a department's care pathways load as their own chunk.
 */

const useClinicPath = () => {
  const [path, setPath] = useState(() => parseClinicPath(window.location.hash));
  useEffect(() => {
    const on = () => setPath(parseClinicPath(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
};

/** The full department, once its chunk is in; `failed` holds the id whose fetch failed. */
const useDepartment = (deptId?: string) => {
  const [, rerender] = useReducer((n: number) => n + 1, 0);
  const [failed, setFailed] = useState<string>();
  useEffect(() => {
    if (!deptId || peekDepartment(deptId)) return;
    let live = true;
    loadDepartment(deptId)?.then(
      () => live && rerender(),
      () => live && setFailed(deptId)
    );
    return () => {
      live = false;
    };
  }, [deptId]);
  return { dept: deptId ? peekDepartment(deptId) : undefined, failed: deptId !== undefined && failed === deptId };
};

export const ClinicHub: React.FC = () => {
  const { go } = useNavigation();
  const { deptId, condId, view, viewId } = useClinicPath();
  const summary = deptId ? deptSummary(deptId) : undefined;
  const { dept, failed } = useDepartment(summary?.id);
  const cond = dept && condId ? dept.conditions.find((c) => c.id === condId) : undefined;

  useEffect(() => {
    if (viewId) {
      document.getElementById('symptom-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0 });
  }, [deptId, condId, view, viewId]);

  return (
    <div className="max-w-5xl mx-auto">
      {cond && dept ? (
        <ClinicCondition dept={dept} cond={cond} go={go} />
      ) : dept ? (
        <ClinicDept dept={dept} go={go} />
      ) : summary ? (
        <DeptLoading summary={summary} condId={condId} failed={failed} go={go} />
      ) : (
        <ClinicOverview view={view ?? 'dept'} symptomId={viewId} go={go} />
      )}
    </div>
  );
};

/** Shown while a department's chunk downloads: the names are already in the light index. */
const DeptLoading: React.FC<{ summary: DepartmentSummary; condId?: string; failed: boolean; go: (h: string) => void }> = ({ summary, condId, failed, go }) => {
  const cond = condId ? summary.conditions.find((c) => c.id === condId) : undefined;
  return (
    <div className="space-y-5">
      <button onClick={() => go(cond ? `clinic/${summary.id}` : 'clinic')} className="inline-flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-400 hover:underline">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {cond ? summary.name_zh : '全部科別'}
      </button>
      <header className="rounded-3xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 p-6">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
          {cond?.name_zh ?? summary.name_zh} <span className="text-base font-normal text-slate-400">{cond?.name_en ?? summary.name_en}</span>
        </h1>
        {failed ? (
          <div className="mt-4 text-sm text-slate-700 dark:text-slate-300" role="alert">
            <p>照護路徑載入失敗：可能是網路中斷，或網站剛更新了版本。</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 font-semibold text-white hover:bg-emerald-700"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" /> 重新整理
            </button>
          </div>
        ) : (
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500" role="status">
            <span className="w-4 h-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" aria-hidden="true" />
            載入照護路徑…
          </p>
        )}
      </header>
    </div>
  );
};

export default ClinicHub;
export { Stethoscope as ClinicIcon };
