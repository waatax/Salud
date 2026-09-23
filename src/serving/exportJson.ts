/**
 * exportJson.ts — Salud Machine-Readable Serving Layer Generator
 *
 * Generates public/data/knowledge-graph.json and public/data/claims.jsonl
 * to make Salud citable and machine-accessible for AI agents and research tools.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CANONICAL_KNOWLEDGE_PACK_82 } from '../knowledge/atoms/pack82';
import { CANONICAL_QUANTITATIVE_CLAIMS } from '../knowledge/claims/claims';
import { CANONICAL_TAIWAN_POLICIES } from '../knowledge/policies/taiwanPolicies';
import { CANONICAL_SOURCE_REGISTRY } from '../knowledge/sources/sourceRegistry';
import { CANONICAL_TERMINOLOGY_REGISTRY } from '../knowledge/terms/terminology';
import { CANONICAL_SAFETY_PREDICATES } from '../compose/safety';
import { CANONICAL_THRESHOLDS } from '../knowledge/thresholds/thresholdRegistry';

export function generateServingArtifacts() {
  const publicDataDir = path.resolve(process.cwd(), 'public', 'data');
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }

  // 1. Build knowledge-graph.json
  const nodes: Array<{
    id: string;
    type: 'atom' | 'claim' | 'policy' | 'source' | 'term' | 'predicate' | 'threshold';
    label: string;
    data: any;
  }> = [];

  const edges: Array<{
    source: string;
    target: string;
    relation: 'cites' | 'measures' | 'governed_by' | 'guarded_by' | 'defines' | 'has_threshold';
  }> = [];

  // Add Atoms
  for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
    nodes.push({
      id: atom.id,
      type: 'atom',
      label: atom.statement_zh.slice(0, 30),
      data: atom,
    });

    if (atom.primary_source) {
      edges.push({
        source: atom.id,
        target: atom.primary_source,
        relation: 'cites',
      });
    }

    if (atom.quantitative_claim_ids) {
      for (const cid of atom.quantitative_claim_ids) {
        edges.push({
          source: atom.id,
          target: cid,
          relation: 'measures',
        });
      }
    }

    if (atom.policy_ref_id) {
      edges.push({
        source: atom.id,
        target: atom.policy_ref_id,
        relation: 'governed_by',
      });
    }

    if (atom.safety_predicate_ids) {
      for (const pid of atom.safety_predicate_ids) {
        edges.push({
          source: atom.id,
          target: pid,
          relation: 'guarded_by',
        });
      }
    }

    if (atom.threshold_ids) {
      for (const tid of atom.threshold_ids) {
        edges.push({
          source: atom.id,
          target: tid,
          relation: 'has_threshold',
        });
      }
    }
  }

  // Add Claims
  for (const [id, claim] of Object.entries(CANONICAL_QUANTITATIVE_CLAIMS)) {
    nodes.push({
      id,
      type: 'claim',
      label: claim.statement.slice(0, 30),
      data: claim,
    });
  }

  // Add Thresholds
  for (const th of CANONICAL_THRESHOLDS) {
    nodes.push({
      id: th.id,
      type: 'threshold',
      label: `${th.metric_name_zh} (${th.operator} ${th.value} ${th.unit})`,
      data: th,
    });
    if (th.canonical_claim_id) {
      edges.push({
        source: th.id,
        target: th.canonical_claim_id,
        relation: 'measures',
      });
    }
  }

  // Add Terms
  for (const [key, term] of Object.entries(CANONICAL_TERMINOLOGY_REGISTRY)) {
    nodes.push({
      id: `TERM-${key}`,
      type: 'term',
      label: `${term.term}: ${term.primary_expansion_zh.slice(0, 24)}`,
      data: term,
    });
  }

  // Add Policies
  for (const [id, policy] of Object.entries(CANONICAL_TAIWAN_POLICIES)) {
    nodes.push({
      id,
      type: 'policy',
      label: policy.title_zh,
      data: policy,
    });
  }

  // Add Sources
  for (const [id, source] of Object.entries(CANONICAL_SOURCE_REGISTRY)) {
    nodes.push({
      id,
      type: 'source',
      label: source.title.slice(0, 30),
      data: source,
    });
  }

  // Add Predicates
  for (const [id, pred] of Object.entries(CANONICAL_SAFETY_PREDICATES)) {
    nodes.push({
      id,
      type: 'predicate',
      label: pred.name,
      data: {
        id: pred.id,
        name: pred.name,
        description_zh: pred.description_zh,
        target_condition: pred.target_condition,
        action_level: pred.action_level,
        boundary_explanation_zh: pred.boundary_explanation_zh,
      },
    });
  }

  const knowledgeGraph = {
    version: '8.0.0',
    generated_at: new Date().toISOString(),
    nodes_count: nodes.length,
    edges_count: edges.length,
    nodes,
    edges,
  };

  const graphPath = path.join(publicDataDir, 'knowledge-graph.json');
  fs.writeFileSync(graphPath, JSON.stringify(knowledgeGraph, null, 2), 'utf-8');

  // 2. Build claims.jsonl
  const jsonlLines: string[] = [];
  for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
    jsonlLines.push(
      JSON.stringify({
        record_type: 'knowledge_atom',
        id: atom.id,
        topic: atom.topic,
        assertion_kind: atom.assertion_kind,
        risk_class: atom.risk_class,
        certainty: atom.derived_certainty,
        statement_zh: atom.statement_zh,
        applies_to: atom.applies_to,
        misuse_guard: atom.misuse_guard,
        status: atom.status,
        last_reviewed: atom.last_reviewed,
      })
    );
  }

  for (const [id, claim] of Object.entries(CANONICAL_QUANTITATIVE_CLAIMS)) {
    jsonlLines.push(
      JSON.stringify({
        record_type: 'quantitative_claim',
        id,
        statement: claim.statement,
        value_kind: claim.value_kind,
        numeric_value: claim.numeric_value,
        range_min: claim.range_min,
        range_max: claim.range_max,
        unit: claim.unit,
        comparator: claim.comparator,
        is_individual_prescription: claim.is_individual_prescription,
        misuse_guard: claim.misuse_guard,
      })
    );
  }

  for (const th of CANONICAL_THRESHOLDS) {
    jsonlLines.push(
      JSON.stringify({
        record_type: 'clinical_threshold',
        id: th.id,
        topic: th.topic,
        metric_name: th.metric_name,
        metric_name_zh: th.metric_name_zh,
        unit: th.unit,
        operator: th.operator,
        value: th.value,
        value_upper: th.value_upper,
        clinical_category_zh: th.clinical_category_zh,
        guideline_authority: th.guideline_authority,
        guideline_year: th.guideline_year,
        measurement_context_zh: th.measurement_context_zh,
        actionable_implication_zh: th.actionable_implication_zh,
      })
    );
  }

  const claimsPath = path.join(publicDataDir, 'claims.jsonl');
  fs.writeFileSync(claimsPath, jsonlLines.join('\n') + '\n', 'utf-8');

  console.log(`[Serving Layer] Generated ${graphPath} (${nodes.length} nodes, ${edges.length} edges)`);
  console.log(`[Serving Layer] Generated ${claimsPath} (${jsonlLines.length} lines)`);
}

// If executed directly
if (process.argv[1]) {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    if (path.resolve(process.argv[1]) === path.resolve(currentFilePath)) {
      generateServingArtifacts();
    }
  } catch {
    // ignore
  }
}
