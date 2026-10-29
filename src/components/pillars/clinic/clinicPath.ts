/**
 * Clinic hash grammar (v6.1)
 *   clinic                              → overview, by division
 *   clinic/by/<symptom|system|stage|hospital>[/<id>] → overview in another view
 *   clinic/<deptId>                     → department
 *   clinic/<deptId>/<conditionId>       → full care pathway
 */

export type OverviewView = 'dept' | 'symptom' | 'system' | 'stage' | 'hospital';

const OVERVIEW_VIEWS: OverviewView[] = ['dept', 'symptom', 'system', 'stage', 'hospital'];

export const parseClinicPath = (hash: string): { deptId?: string; condId?: string; view?: OverviewView; viewId?: string } => {
  const parts = hash.replace(/^#/, '').split('/');
  if (parts[0] !== 'clinic') return {};
  if (parts[1] === 'by') {
    const view = (OVERVIEW_VIEWS as string[]).includes(parts[2]) ? (parts[2] as OverviewView) : 'dept';
    return { view, viewId: parts[3] };
  }
  return { deptId: parts[1] || undefined, condId: parts[2] || undefined };
};
