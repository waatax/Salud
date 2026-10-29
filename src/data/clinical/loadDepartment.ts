import type { Department } from './types';

/**
 * One lazy chunk per department: Vite turns each generated `pathways/<id>.json` into its own
 * module, so opening 心臟內科 downloads only cardiology's care pathways.
 */
const LOADERS = import.meta.glob<Department>('./pathways/*.json', { import: 'default' });

const pending = new Map<string, Promise<Department>>();
const loaded = new Map<string, Department>();

/** A department that already finished loading, for an instant render on revisits. */
export const peekDepartment = (id: string) => loaded.get(id);

/** Undefined for an unknown id; a failed fetch is forgotten so a retry fetches again. */
export const loadDepartment = (id: string): Promise<Department> | undefined => {
  const load = LOADERS[`./pathways/${id}.json`];
  if (!load) return undefined;
  let p = pending.get(id);
  if (!p) {
    p = load().then((dept) => {
      loaded.set(id, dept);
      return dept;
    });
    pending.set(id, p);
    p.catch(() => pending.delete(id));
  }
  return p;
};

/** Warm the chunk on hover or focus, before the click. */
export const prefetchDepartment = (id: string) => {
  loadDepartment(id)?.catch(() => undefined);
};
