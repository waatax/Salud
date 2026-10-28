import type { ConditionDepth, Evidence, EvidenceLevel, KeyNumber, TimelinePhase } from '../types';

/** Compact constructors so the depth overlays read like a table rather than nested JSON. */
export const K = (value: string, label_zh: string): KeyNumber => ({ value, label_zh });

export const T = (when_zh: string, goal_zh: string, ...do_zh: string[]): TimelinePhase => ({ when_zh, goal_zh, do_zh });

export const E = (label: string, year: number, level: EvidenceLevel): Evidence => ({ label, year, level });

export type Depth = Partial<ConditionDepth>;
