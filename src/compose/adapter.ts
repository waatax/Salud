/**
 * adapter.ts — Salud Layer 2 UI Adapter
 *
 * Bridges the vNext.8 Three-Tier Knowledge Architecture with existing UI components.
 * Ensures 100% backward compatibility with KnowledgePoint interfaces while projecting
 * derived certainty, misuse guards, and population limits.
 */

import { KnowledgePoint, EvidenceGrade, KPType, SafetyFlag } from '../types';
import { KnowledgeAtom, CertaintyLevel } from '../types/knowledge';

export function certaintyToLegacyGrade(certainty: CertaintyLevel): EvidenceGrade {
  switch (certainty) {
    case 'high':
      return 'A';
    case 'moderate':
      return 'B';
    case 'low':
      return 'C';
    case 'very-low':
      return 'D';
    default:
      return 'C';
  }
}

export function assertionKindToLegacyKPType(kind: KnowledgeAtom['assertion_kind']): KPType {
  switch (kind) {
    case 'mechanism':
      return 'mechanism';
    case 'quantitative':
    case 'bound':
    case 'range':
    case 'heuristic':
    case 'distribution':
      return 'number';
    case 'comparative':
      return 'comparison';
    case 'procedural':
    case 'policy':
      return 'action';
    case 'diagnostic_boundary':
    case 'context':
      return 'context';
    case 'qualitative':
      return 'risk';
    default:
      return 'context';
  }
}

export function riskClassToLegacySafetyFlag(riskClass: KnowledgeAtom['risk_class']): SafetyFlag {
  switch (riskClass) {
    case 'R3':
      return 'gated';
    case 'R2':
      return 'caution';
    case 'R1':
    default:
      return 'none';
  }
}

/**
 * Maps a canonical KnowledgeAtom (Layer 1) into the legacy KnowledgePoint structure (Layer 3)
 * for seamless consumption by existing chapter pages and components.
 */
export function knowledgeAtomToLegacyKP(
  atom: KnowledgeAtom,
  pageId: string = 'PAGE-EXPLORE'
): KnowledgePoint {
  const grade = certaintyToLegacyGrade(atom.derived_certainty);
  const kpType = assertionKindToLegacyKPType(atom.assertion_kind);
  const safetyFlag = riskClassToLegacySafetyFlag(atom.risk_class);

  return {
    id: atom.id,
    page_id: pageId,
    title: atom.statement_zh.split('：')[0] || atom.topic,
    one_liner: atom.statement_zh.length > 50 ? `${atom.statement_zh.slice(0, 48)}…` : atom.statement_zh,
    kp_type: kpType,
    depth: atom.risk_class === 'R3' ? 'L3' : atom.risk_class === 'R2' ? 'L2' : 'L1',
    statement: atom.statement_zh,
    why_it_matters: `【實證出處】：${atom.primary_source}。適用族群：${atom.applies_to.population}（${atom.applies_to.region}）。`,
    common_misconception: `⚠ 【防誤用守則 (Misuse Guard)】：${atom.misuse_guard}`,
    evidence_grade: grade,
    claim_ids: atom.quantitative_claim_ids || [],
    figure_ids: [],
    applies_population: atom.applies_to.population,
    applies_region: atom.applies_to.region,
    excludes: atom.safety_predicate_ids || [],
    safety_flag: safetyFlag,
    last_reviewed: atom.last_reviewed,
    reviewed_by: ['Salud-Editorial-Board', 'EC-Reviewer'],
  };
}
