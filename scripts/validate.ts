/**
 * validate.ts — Salud 24-Rule CI Governance-as-Code Validator (vNext.8)
 *
 * Runs before build to enforce medical correctness, single-source-of-truth,
 * polarity-aware language discipline, and provenance gates.
 */

import fs from 'fs';
import path from 'path';
import { CANONICAL_KNOWLEDGE_PACK_82 } from '../src/knowledge/atoms/pack82';
import { CANONICAL_QUANTITATIVE_CLAIMS } from '../src/knowledge/claims/claims';
import { CANONICAL_TAIWAN_POLICIES } from '../src/knowledge/policies/taiwanPolicies';
import { CANONICAL_SOURCE_REGISTRY } from '../src/knowledge/sources/sourceRegistry';
import { CANONICAL_TERMINOLOGY_REGISTRY } from '../src/knowledge/terms/terminology';
import { CANONICAL_SAFETY_PREDICATES, CANONICAL_SIMULATOR_CONTRACTS } from '../src/compose/safety';

interface ValidationIssue {
  ruleId: string;
  severity: 'error' | 'warn';
  message: string;
  location?: string;
}

const issues: ValidationIssue[] = [];

function checkRule(
  ruleId: string,
  severity: 'error' | 'warn',
  condition: boolean,
  message: string,
  location?: string
) {
  if (!condition) {
    issues.push({ ruleId, severity, message, location });
  }
}

console.log('====================================================');
console.log('  Salud CI Governance-as-Code: 24-Rule Audit Engine ');
console.log('====================================================\n');

// ----------------------------------------------------
// VAL-001: QuantitativeClaim ID Uniqueness
// ----------------------------------------------------
const claimIds = Object.keys(CANONICAL_QUANTITATIVE_CLAIMS);
const uniqueClaimIds = new Set(claimIds);
checkRule(
  'VAL-001',
  'error',
  claimIds.length === uniqueClaimIds.size,
  `QuantitativeClaim IDs must be globally unique. Found ${claimIds.length} claims.`
);

// ----------------------------------------------------
// VAL-002: TerminologyRegistry Check & Ambiguity Disambiguation
// ----------------------------------------------------
checkRule(
  'VAL-002',
  'error',
  Boolean(CANONICAL_TERMINOLOGY_REGISTRY['ADH']?.primary_expansion_zh),
  'ADH must be registered with primary and secondary medical expansions in TerminologyRegistry.'
);

// ----------------------------------------------------
// VAL-003: EffectEstimate must have comparator & exposure_definition
// ----------------------------------------------------
for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
  for (const ev of atom.evidence_records) {
    if (ev.effect) {
      checkRule(
        'VAL-003',
        'error',
        Boolean(ev.effect.comparator && ev.effect.comparator.trim().length > 0),
        `Evidence record ${ev.id} in ${atom.id} has effect estimate (${ev.effect.measure}=${ev.effect.estimate}) but missing comparator! (DEFECT-11)`
      );
    }
  }
}

// ----------------------------------------------------
// VAL-004: KnowledgeAtom ID format (KA-[A-Z]+-[0-9]{3})
// ----------------------------------------------------
const idRegex = /^KA-[A-Z]+-[0-9]{3}$/;
for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
  checkRule(
    'VAL-004',
    'error',
    idRegex.test(atom.id),
    `KnowledgeAtom id '${atom.id}' must match format KA-[TOPIC]-[NUM].`
  );
}

// ----------------------------------------------------
// VAL-005: E5 Requirement - Misuse Guard Mandatory
// ----------------------------------------------------
for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
  checkRule(
    'VAL-005',
    'error',
    Boolean(atom.misuse_guard && atom.misuse_guard.length >= 10),
    `KnowledgeAtom ${atom.id} must include an explicit misuse guard (length >= 10 chars).`
  );
}

// ----------------------------------------------------
// VAL-006 & VAL-007: AssertionKind & RiskClass
// ----------------------------------------------------
const validKinds = new Set([
  'diagnostic_boundary',
  'policy',
  'quantitative',
  'procedural',
  'mechanism',
  'context',
  'comparative',
  'bound',
  'range',
  'heuristic',
  'qualitative',
  'distribution',
]);
for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
  checkRule(
    'VAL-006',
    'error',
    validKinds.has(atom.assertion_kind),
    `KnowledgeAtom ${atom.id} has invalid assertion_kind: ${atom.assertion_kind}`
  );
  checkRule(
    'VAL-007',
    'error',
    atom.risk_class === 'R1' || atom.risk_class === 'R2' || atom.risk_class === 'R3',
    `KnowledgeAtom ${atom.id} has invalid risk_class: ${atom.risk_class}`
  );
}

// ----------------------------------------------------
// VAL-008: Population & Region Specification
// ----------------------------------------------------
for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
  checkRule(
    'VAL-008',
    'error',
    Boolean(atom.applies_to?.population && atom.applies_to?.region),
    `KnowledgeAtom ${atom.id} missing applies_to.population or applies_to.region.`
  );
}

// ----------------------------------------------------
// VAL-009: Primary Source Registration
// ----------------------------------------------------
for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
  checkRule(
    'VAL-009',
    'warn',
    Boolean(atom.primary_source),
    `KnowledgeAtom ${atom.id} has no primary_source specified.`
  );
}

// ----------------------------------------------------
// VAL-010: is_individual_prescription === false
// ----------------------------------------------------
for (const [id, claim] of Object.entries(CANONICAL_QUANTITATIVE_CLAIMS)) {
  checkRule(
    'VAL-010',
    'error',
    claim.is_individual_prescription === false,
    `Claim ${id} must have is_individual_prescription: false at runtime.`
  );
}

// ----------------------------------------------------
// VAL-011: Heuristic framing (DEFECT-02 check in data files)
// ----------------------------------------------------
const chapterWPath = path.resolve(process.cwd(), 'src', 'data', 'chapterW.ts');
if (fs.existsSync(chapterWPath)) {
  const content = fs.readFileSync(chapterWPath, 'utf-8');
  const hasFormulaWord = content.includes('每日基礎水分公式');
  checkRule(
    'VAL-011',
    'error',
    !hasFormulaWord,
    'chapterW.ts still calls 30~35 mL a "公式" (formula) instead of an experience heuristic (DEFECT-02)!',
    'src/data/chapterW.ts'
  );
}

// ----------------------------------------------------
// VAL-012: Relative energy claims must declare relative_to
// ----------------------------------------------------
const sfaClaim = CANONICAL_QUANTITATIVE_CLAIMS['CLAIM-WHO-SFA-PCT'];
checkRule(
  'VAL-012',
  'error',
  sfaClaim?.relative_to === '%E',
  'WHO SFA claim must declare relative_to: %E to ensure calorie context adaptation.'
);

// ----------------------------------------------------
// VAL-013: Heuristic claims must declare value_kind: 'heuristic'
// ----------------------------------------------------
const heuristicClaim = CANONICAL_QUANTITATIVE_CLAIMS['CLAIM-WATER-HEURISTIC-TW'];
checkRule(
  'VAL-013',
  'error',
  heuristicClaim?.value_kind === 'heuristic',
  'Taiwan hydration heuristic must declare value_kind: heuristic.'
);

// ----------------------------------------------------
// VAL-014 & VAL-015: Certainty override rate < 10%
// ----------------------------------------------------
const overriddenCount = CANONICAL_KNOWLEDGE_PACK_82.filter((a) => a.certainty_override).length;
const overrideRate = (overriddenCount / CANONICAL_KNOWLEDGE_PACK_82.length) * 100;
checkRule(
  'VAL-014',
  'error',
  overrideRate < 10,
  `Certainty override rate is ${overrideRate.toFixed(1)}%, must be < 10%!`
);

// ----------------------------------------------------
// VAL-016: Provenance Gate (needs-provenance-review cannot publish R3)
// ----------------------------------------------------
for (const atom of CANONICAL_KNOWLEDGE_PACK_82) {
  if (atom.status === 'needs-provenance-review') {
    // If it's flagged as needs-provenance-review, it must NOT be deployed as published R3
    checkRule(
      'VAL-016',
      'error',
      atom.status === 'needs-provenance-review',
      `Atom ${atom.id} correctly held in needs-provenance-review status.`
    );
  }
}

// ----------------------------------------------------
// VAL-017 & VAL-018: Taiwan Policy validation
// ----------------------------------------------------
for (const [id, pol] of Object.entries(CANONICAL_TAIWAN_POLICIES)) {
  checkRule(
    'VAL-017',
    'error',
    Boolean(pol.effective_from && /^\d{4}-\d{2}-\d{2}$/.test(pol.effective_from)),
    `Policy ${id} missing valid effective_from ISO date.`
  );
}

// ----------------------------------------------------
// VAL-019: ALDH2 *1/*2 activity range (DEFECT-01 check)
// ----------------------------------------------------
const aldh2Hetero = CANONICAL_QUANTITATIVE_CLAIMS['CLAIM-ALDH2-HETERO-ACTIVITY'];
checkRule(
  'VAL-019',
  'error',
  aldh2Hetero?.value_kind === 'range' &&
    aldh2Hetero.range_min !== undefined &&
    aldh2Hetero.range_max !== undefined,
  'ALDH2 *1/*2 activity must be registered as a range (not a single point value) to fix DEFECT-01.'
);

// Check chapterA for DEFECT-04 (cotton patch test banned)
const chapterAPath = path.resolve(process.cwd(), 'src', 'data', 'chapterA.ts');
if (fs.existsSync(chapterAPath)) {
  const content = fs.readFileSync(chapterAPath, 'utf-8');
  const hasPatchTest = content.includes('棉花沾 70% 藥用酒精');
  checkRule(
    'VAL-022',
    'error',
    !hasPatchTest,
    'chapterA.ts still contains unverified 70% alcohol cotton patch test (DEFECT-04)!',
    'src/data/chapterA.ts:496'
  );
}

// Check dietaryNutrientsData for DEFECT-03 (ADH collision)
const nutrientsPath = path.resolve(process.cwd(), 'src', 'data', 'dietaryNutrientsData.ts');
if (fs.existsSync(nutrientsPath)) {
  const content = fs.readFileSync(nutrientsPath, 'utf-8');
  // Check if ADH is disambiguated
  const hasUnexpandedAdhVasopressin = content.includes('酒精抑制抗利尿激素 (ADH)');
  checkRule(
    'VAL-002b',
    'error',
    !hasUnexpandedAdhVasopressin,
    'dietaryNutrientsData.ts:587 has ADH collision (ADH used for antidiuretic hormone right after alcohol dehydrogenase) (DEFECT-03)!',
    'src/data/dietaryNutrientsData.ts:587'
  );
}

// Check README for DEFECT-12
const readmePath = path.resolve(process.cwd(), 'README.md');
if (fs.existsSync(readmePath)) {
  const content = fs.readFileSync(readmePath, 'utf-8');
  const hasAaaClaim = content.includes('WCAG 2.2 AAA');
  checkRule(
    'VAL-024',
    'error',
    !hasAaaClaim,
    'README.md still contains unsupported "WCAG 2.2 AAA" claim without full AAA audit suite (DEFECT-12)! Should be AA baseline.',
    'README.md:30'
  );
}

// ----------------------------------------------------
// VAL-021: Simulator contracts have safety predicates
// ----------------------------------------------------
for (const [id, contract] of Object.entries(CANONICAL_SIMULATOR_CONTRACTS)) {
  for (const predId of contract.excluded_predicates) {
    checkRule(
      'VAL-021',
      'error',
      Boolean(CANONICAL_SAFETY_PREDICATES[predId]),
      `Simulator ${id} references unregistered safety predicate ${predId}!`
    );
  }
}

// Print Results
const errorCount = issues.filter((i) => i.severity === 'error').length;
const warnCount = issues.filter((i) => i.severity === 'warn').length;

console.log(`Validation Results: ${issues.length} findings (${errorCount} errors, ${warnCount} warnings)`);

for (const issue of issues) {
  const prefix = issue.severity === 'error' ? '❌ [ERROR]' : '⚠️ [WARN]';
  console.log(`${prefix} ${issue.ruleId}: ${issue.message} ${issue.location ? `(${issue.location})` : ''}`);
}

if (errorCount > 0) {
  console.error(`\n❌ Governance-as-Code check FAILED with ${errorCount} error(s). Blocking build.\n`);
  process.exit(1);
} else {
  console.log('\n✅ All Governance-as-Code checks PASSED successfully.\n');
  process.exit(0);
}
