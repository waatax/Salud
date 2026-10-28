import React, { useEffect, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { getDepartment } from '../../data/clinical';
import { ClinicOverview, type OverviewView } from './clinic/ClinicOverview';
import { ClinicDept } from './clinic/ClinicDept';
import { ClinicCondition } from './clinic/ClinicCondition';

/**
 * ClinicHub — 臨床科別知識庫 (v6.1).
 *
 * Hash grammar
 *   clinic                              → overview, by division
 *   clinic/by/<symptom|system|stage|hospital>[/<id>] → overview in another view
 *   clinic/<deptId>                     → department
 *   clinic/<deptId>/<conditionId>       → full care pathway
 */

const OVERVIEW_VIEWS: OverviewView[] = ['dept', 'symptom', 'system', 'stage', 'hospital'];

export const parseClinicPath = (hash: string) => {
  const parts = hash.replace(/^#/, '').split('/');
  if (parts[0] !== 'clinic') return {};
  if (parts[1] === 'by') {
    const view = (OVERVIEW_VIEWS as string[]).includes(parts[2]) ? (parts[2] as OverviewView) : 'dept';
    return { view, viewId: parts[3] };
  }
  return { deptId: parts[1] || undefined, condId: parts[2] || undefined };
};

const useClinicPath = () => {
  const [path, setPath] = useState(() => parseClinicPath(window.location.hash));
  useEffect(() => {
    const on = () => setPath(parseClinicPath(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
};

export const ClinicHub: React.FC = () => {
  const { go } = useNavigation();
  const { deptId, condId, view, viewId } = useClinicPath();
  const dept = deptId ? getDepartment(deptId) : undefined;
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
      ) : (
        <ClinicOverview view={view ?? 'dept'} symptomId={viewId} go={go} />
      )}
    </div>
  );
};

export default ClinicHub;
export { Stethoscope as ClinicIcon };
