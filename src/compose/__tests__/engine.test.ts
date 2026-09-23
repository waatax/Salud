import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deriveCertainty } from '../certainty';
import { evaluateSafetyPredicates } from '../safety';
import {
  deriveGramsFromEnergyRatio,
  evaluateHydrationHeuristic,
  formatLpaRiskContext,
} from '../units';
import { EvidenceRecord } from '../../types/knowledge';

test('deriveCertainty: should grade high-quality systematic review as high certainty', () => {
  const records: EvidenceRecord[] = [
    {
      id: 'EV-TEST-01',
      citation: 'Lancet Systematic Review 2024',
      design: 'systematic_review',
      sample_size: 50000,
      risk_of_bias: 'low',
      directness: 'high',
      consistency: 'consistent',
      precision: 'precise',
      provenance_level: 'verified-primary',
    },
  ];

  const result = deriveCertainty(records);
  assert.equal(result.level, 'high');
  assert.equal(result.isOverridden, false);
  assert.ok(result.score >= 3.5);
});

test('deriveCertainty: should penalize low directness and small sample size (n=13 RCT)', () => {
  const records: EvidenceRecord[] = [
    {
      id: 'EV-TEST-ALCOHOL-WATER',
      citation: 'Front Pharmacol 2026; n=13 wildtype Japanese men',
      design: 'rct',
      sample_size: 13,
      risk_of_bias: 'low',
      directness: 'low', // Studied wildtype men, claim is about ALDH2 deficient Taiwanese
      precision: 'imprecise',
      provenance_level: 'verified-primary',
    },
  ];

  const result = deriveCertainty(records);
  // Base 4.0 - 2.0 (low directness) - 1.0 (sample < 30) = 1.0 -> very-low/low
  assert.ok(result.level === 'low' || result.level === 'very-low');
  assert.ok(result.score <= 2.0);
  assert.ok(result.rationaleSteps.some((s) => s.includes('實證直接性低')));
});

test('deriveCertainty: should handle expert override transparently', () => {
  const records: EvidenceRecord[] = [
    {
      id: 'EV-TEST-02',
      citation: 'Expert Consensus 2025',
      design: 'expert_consensus',
      risk_of_bias: 'low',
      directness: 'high',
      provenance_level: 'expert-consensus',
    },
  ];

  const result = deriveCertainty(records, {
    level: 'moderate',
    rationale: 'Multiple concordant mechanistic studies reinforce clinical consensus',
  });

  assert.equal(result.level, 'moderate');
  assert.equal(result.isOverridden, true);
  assert.ok(result.overrideRationale?.includes('concordant mechanistic studies'));
});

test('evaluateSafetyPredicates: should block users with CKD G4/G5 or Heart Failure', () => {
  const ckdProfile = {
    ckdStage: 'G4' as const,
    eGfr: 22,
  };

  const evalCkd = evaluateSafetyPredicates(
    ['PRED-CKD-G4-G5', 'PRED-HF'],
    ckdProfile
  );
  assert.equal(evalCkd.canProceed, false);
  assert.equal(evalCkd.blocked, true);
  assert.equal(evalCkd.blockingPredicates.length, 1);
  assert.equal(evalCkd.blockingPredicates[0].id, 'PRED-CKD-G4-G5');

  const hfProfile = {
    heartFailure: true,
  };
  const evalHf = evaluateSafetyPredicates(['PRED-HF'], hfProfile);
  assert.equal(evalHf.canProceed, false);
  assert.equal(evalHf.blocked, true);
  assert.equal(evalHf.blockingPredicates[0].id, 'PRED-HF');
});

test('evaluateSafetyPredicates: should trigger warning boundary for ALDH2 deficiency without false security', () => {
  const aldh2Profile = {
    aldh2Genotype: 'HOMO' as const,
  };

  const evalAldh2 = evaluateSafetyPredicates(
    ['PRED-ALDH2-DEFICIENT'],
    aldh2Profile
  );
  assert.equal(evalAldh2.canProceed, true); // Warn level does not crash app, but flags boundary
  assert.equal(evalAldh2.warningPredicates.length, 1);
  assert.ok(evalAldh2.explanations_zh[0].includes('乙醇'));
  assert.ok(evalAldh2.explanations_zh[0].includes('乙醛'));
});

test('units: deriveGramsFromEnergyRatio should scale proportionally with calorie context', () => {
  const res2000 = deriveGramsFromEnergyRatio(10, 2000, 'fat');
  assert.equal(res2000.derivedGrams, 22.2);

  const res1200 = deriveGramsFromEnergyRatio(10, 1200, 'fat');
  assert.equal(res1200.derivedGrams, 13.3);

  const res3000 = deriveGramsFromEnergyRatio(10, 3000, 'fat');
  assert.equal(res3000.derivedGrams, 33.3);
});

test('units: evaluateHydrationHeuristic should flag extreme weights', () => {
  const normal = evaluateHydrationHeuristic(70);
  assert.equal(normal.isOutlier, false);
  assert.equal(normal.mlMin, 2100);
  assert.equal(normal.mlMax, 2450);

  const heavy = evaluateHydrationHeuristic(120);
  assert.equal(heavy.isOutlier, true);
  assert.equal(heavy.mlMax, 4200);
  assert.ok(heavy.disclaimer.includes('極端體重警示'));
});

test('units: formatLpaRiskContext should differentiate risk bands and provide disclaimer', () => {
  const normal = formatLpaRiskContext(50);
  assert.ok(normal.approxRiskMultiplier.includes('基準風險'));

  const high = formatLpaRiskContext(180);
  assert.ok(high.approxRiskMultiplier.includes('1.4 倍'));

  const veryHigh = formatLpaRiskContext(300);
  assert.ok(veryHigh.approxRiskMultiplier.includes('2.0 倍'));
  assert.ok(veryHigh.conversionDisclaimer.includes('nmol/L'));
});

test('paperLinks: buildPaperUrls should generate valid DOI, PubMed, and Google Scholar URLs', async () => {
  const { buildPaperUrls, formatPaperCitation } = await import('../../utils/paperLinks');

  const paper = {
    title: 'A Randomized Trial of Intensive versus Standard Blood-Pressure Control',
    authors: 'The SPRINT Research Group',
    journal: 'New England Journal of Medicine',
    year: 2015,
    doi: '10.1056/NEJMoa1511939',
    pmid: '26551272',
  };

  const urls = buildPaperUrls(paper);
  assert.equal(urls.doiUrl, 'https://doi.org/10.1056/NEJMoa1511939');
  assert.equal(urls.pubmedUrl, 'https://pubmed.ncbi.nlm.nih.gov/26551272/');
  assert.ok(urls.scholarUrl.includes('scholar.google.com/scholar'));
  assert.ok(urls.scholarUrl.includes('SPRINT'));
  assert.equal(urls.primaryUrl, 'https://doi.org/10.1056/NEJMoa1511939');

  const citation = formatPaperCitation(paper);
  assert.ok(citation.includes('The SPRINT Research Group'));
  assert.ok(citation.includes('2015'));
  assert.ok(citation.includes('10.1056/NEJMoa1511939'));
});

