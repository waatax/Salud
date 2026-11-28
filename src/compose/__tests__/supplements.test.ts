import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEEP_SUPPLEMENTS,
  DRUG_NUTRIENT_INTERACTIONS,
  SUPPLEMENT_PILLAR_GUIDES,
  SUPPLEMENT_GOAL_META,
} from '../../data/supplementsDeepData';
import { parseHash, SUPPLEMENTS_TABS, PILLAR_TABS } from '../../config/routes';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';
import { DISCOVERY_TOPICS, filterDiscoveryTopics } from '../../data/learning/discovery';
import { SUPPLEMENT_COUNT } from '../../config/version';

test('supplements (v7.1): database covers all 4 flagship pillars with unique IDs and rigorous citations', () => {
  assert.equal(DEEP_SUPPLEMENTS.length, SUPPLEMENT_COUNT, 'SUPPLEMENT_COUNT in version.ts must equal DEEP_SUPPLEMENTS.length');
  assert.ok(DEEP_SUPPLEMENTS.length >= 30, `expected >=30 supplements, got ${DEEP_SUPPLEMENTS.length}`);
  assert.equal(new Set(DEEP_SUPPLEMENTS.map((s) => s.id)).size, DEEP_SUPPLEMENTS.length, 'supplement IDs must be unique');
  assert.equal(
    new Set(DRUG_NUTRIENT_INTERACTIONS.map((d) => d.id)).size,
    DRUG_NUTRIENT_INTERACTIONS.length,
    'interaction IDs must be unique'
  );
  assert.ok(DRUG_NUTRIENT_INTERACTIONS.length >= 9, 'expected >=9 clinical drug-nutrient interactions');

  // Required core pillars: Amino Acids/Protein, Creatine/Sport, Vitamins/Minerals, Fiber/Prebiotics
  const requiredIds = [
    'SUP-WHEY',
    'SUP-EAA',
    'SUP-PLANT-PROTEIN',
    'SUP-CREATINE',
    'SUP-CAFFEINE',
    'SUP-BETA-ALANINE',
    'SUP-D3',
    'SUP-B12-FOLATE',
    'SUP-VITC',
    'SUP-MULTIVITAMIN',
    'SUP-MAGNESIUM',
    'SUP-IRON',
    'SUP-CALCIUM',
    'SUP-PSYLLIUM',
    'SUP-BETA-GLUCAN',
    'SUP-PHGG',
    'SUP-INULIN-GOS',
    'SUP-RESISTANT-STARCH',
    'SUP-OMEGA3',
  ];
  for (const id of requiredIds) {
    const item = DEEP_SUPPLEMENTS.find((s) => s.id === id);
    assert.ok(item, `missing required evidence-based supplement ${id}`);
    assert.ok(item.effect_summary_zh && item.effect_summary_zh.length >= 15, `${id} needs effect_summary_zh`);
    assert.ok(item.citations && item.citations.length >= 1, `${id} needs >=1 peer-reviewed citation`);
    for (const cite of item.citations) {
      assert.ok(cite.journal.length > 0 && cite.year >= 2005, `${id} citation metadata`);
      assert.ok(cite.finding_zh.length >= 10, `${id} citation finding_zh`);
      if (cite.url) assert.match(cite.url, /^https:\/\//, `${id} citation URL must be https`);
    }
  }

  // Pillar guides match real categories and goals are non-empty
  assert.equal(SUPPLEMENT_PILLAR_GUIDES.length, 4);
  for (const g of SUPPLEMENT_PILLAR_GUIDES) {
    assert.ok(
      DEEP_SUPPLEMENTS.some((s) => s.category === g.category),
      `pillar guide ${g.id} references empty category ${g.category}`
    );
  }
  for (const goal of SUPPLEMENT_GOAL_META) {
    assert.ok(
      DEEP_SUPPLEMENTS.some((s) => s.goals?.includes(goal.id)),
      `goal ${goal.id} has no matching supplements`
    );
  }
});

test('supplements & healthy diet (v7.1): deep category routes and site search resolve cleanly', () => {
  assert.ok(PILLAR_TABS.supplements && PILLAR_TABS.supplements.length >= 10);
  for (const tab of SUPPLEMENTS_TABS) {
    assert.deepEqual(parseHash(`supplements/${tab}`), {
      kind: 'pillar',
      pillar: 'supplements',
      sub: [tab],
    });
  }

  // Homepage discovery puts Healthy Diet #1 and Special Supplements #2
  assert.equal(DISCOVERY_TOPICS[0].id, 'diet');
  assert.equal(DISCOVERY_TOPICS[1].id, 'supplements');
  assert.ok(filterDiscoveryTopics('all', false, '肌酸').topics.some((t) => t.id === 'supplements'));

  // Search resolves everyday Traditional Chinese supplement queries directly to supplements
  const docs = buildSearchIndex();
  const topTargets = (q: string) => searchDocs(docs, q, 6).map((d) => d.target).join(' | ');
  for (const q of ['乳清蛋白', '胺基酸', '肌酸', '洋車前子', '纖維素', '維生素 D3', '維他命', '特別營養品']) {
    assert.match(topTargets(q), /supplements/, `search "${q}" should resolve to supplements, got: ${topTargets(q)}`);
  }
});
