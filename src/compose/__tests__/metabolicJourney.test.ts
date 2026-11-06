import { test } from 'node:test';
import assert from 'node:assert/strict';
import { METABOLIC_PATHS, METABOLIC_REFERENCES } from '../../data/metabolicJourney';
import { parseHash } from '../../config/routes';
import { MONITORING } from '../../data/tirzepatideData';

test('metabolic pathways reach the intended deep chapter rather than silently falling home', () => {
  for (const item of METABOLIC_PATHS) {
    const route = parseHash(`#${item.hash}`);
    assert.ok(route, item.hash);
    assert.equal(route.kind, 'pillar', item.hash);
    if (route.kind === 'pillar') assert.equal(route.pillar, item.id === 'report' ? 'cardiometabolic' : 'obesity');
    for (const ref of item.refs) assert.match(METABOLIC_REFERENCES[ref].url, /^https:\/\//);
  }
});

test('response review uses six months at highest tolerated dose, not six months from initiation', () => {
  const review = MONITORING.find(row => row.when.includes('6 個月'));
  assert.ok(review?.when.includes('最高耐受劑量'));
  assert.ok(review?.items.includes('不是自動停藥'));
});
