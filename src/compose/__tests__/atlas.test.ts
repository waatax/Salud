import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  STRENGTH_ENDURANCE_ATLAS,
  SLEEP_ATLAS,
  LONGEVITY_ATLAS,
  ALL_ATLASES,
  atlasCoverage,
} from '../../data/atlas';
import { ATLAS_LEVELS, type KnowledgeAtlas } from '../../types/knowledgeAtlas';

function verifyAtlas(atlas: KnowledgeAtlas) {
  const cov = atlasCoverage(atlas);

  // 1. All 40 cells (8 domains x 5 levels) must be filled with at least 1 knowledge point!
  assert.equal(
    cov.gaps.length,
    0,
    `${atlas.title} has unfilled domain x level cells: ${cov.gaps.join(', ')}`
  );
  assert.equal(
    cov.cellsFilled,
    cov.cellsTotal,
    `${atlas.title}: expected ${cov.cellsTotal} cells filled, got ${cov.cellsFilled}`
  );

  // 2. Point count should be >= 40 (we aimed for 42-50)
  assert.ok(
    atlas.points.length >= 40,
    `${atlas.title}: points count (${atlas.points.length}) should be >= 40`
  );

  // 3. Unique point IDs
  const pointIds = new Set<string>();
  for (const pt of atlas.points) {
    assert.ok(!pointIds.has(pt.id), `${atlas.title}: duplicate point ID ${pt.id}`);
    pointIds.add(pt.id);

    // Verify point prefix
    assert.ok(
      pt.id.startsWith(`${atlas.prefix}-`),
      `${pt.id} must start with prefix ${atlas.prefix}-`
    );

    // Verify domain exists
    assert.ok(
      atlas.domains.some((d) => d.id === pt.domain),
      `Domain ${pt.domain} not found in ${atlas.title}`
    );

    // Verify level is 1..5
    assert.ok(pt.level >= 1 && pt.level <= 5, `Invalid level ${pt.level} in ${pt.id}`);

    // Verify required text fields
    assert.ok(pt.title.length > 0 && pt.title.length <= 35, `${pt.id} invalid title length: ${pt.title}`);
    assert.ok(pt.plain.length >= 10, `${pt.id} plain description too short`);
    assert.ok(pt.detail.length >= 20, `${pt.id} detail description too short`);

    // Verify prerequisites: must exist and have level <= current point level
    if (pt.prereq && pt.prereq.length > 0) {
      for (const preId of pt.prereq) {
        assert.ok(preId !== pt.id, `${pt.id} cannot be its own prereq`);
        const prePt = atlas.points.find((p) => p.id === preId);
        assert.ok(prePt, `${pt.id} references missing prereq ${preId}`);
        assert.ok(
          prePt.level <= pt.level,
          `${pt.id} (L${pt.level}) has prereq ${preId} with higher level (L${prePt.level})`
        );
      }
    }
  }

  // 4. FAQs: >= 36 questions, all IDs unique, all mapped KPs must exist in this atlas
  assert.ok(
    atlas.faqs.length >= 36,
    `${atlas.title}: FAQ count (${atlas.faqs.length}) must be >= 36`
  );
  const faqIds = new Set<string>();
  for (const faq of atlas.faqs) {
    assert.ok(!faqIds.has(faq.id), `${atlas.title}: duplicate FAQ ID ${faq.id}`);
    faqIds.add(faq.id);

    assert.ok(faq.q.length >= 5, `${faq.id} question text too short`);
    assert.ok(faq.a.length >= 15, `${faq.id} answer text too short`);
    assert.ok(faq.kps.length >= 1, `${faq.id} must map to at least 1 knowledge point`);
    for (const kpId of faq.kps) {
      assert.ok(pointIds.has(kpId), `${faq.id} references non-existent KP ${kpId}`);
    }
  }

  // 5. Level goals for all 5 levels
  for (const lv of ATLAS_LEVELS) {
    assert.ok(
      atlas.levelGoals[lv.level]?.length >= 10,
      `${atlas.title} missing goal for L${lv.level}`
    );
  }

  // 6. Authoritative sources >= 10
  assert.ok(
    atlas.sources.length >= 10,
    `${atlas.title} sources count (${atlas.sources.length}) should be >= 10`
  );
}

test('atlas: STRENGTH_ENDURANCE_ATLAS passes all structural, domain, and FAQ coverage checks', () => {
  verifyAtlas(STRENGTH_ENDURANCE_ATLAS);
});

test('atlas: SLEEP_ATLAS passes all structural, domain, and FAQ coverage checks', () => {
  verifyAtlas(SLEEP_ATLAS);
});

test('atlas: LONGEVITY_ATLAS passes all structural, domain, and FAQ coverage checks', () => {
  verifyAtlas(LONGEVITY_ATLAS);
});

test('atlas: ALL_ATLASES registry contains all 3 target topics with valid hashes', () => {
  assert.equal(ALL_ATLASES.length, 3);
  assert.ok(ALL_ATLASES.some((a) => a.atlas.key === 'strength-endurance'));
  assert.ok(ALL_ATLASES.some((a) => a.atlas.key === 'sleep'));
  assert.ok(ALL_ATLASES.some((a) => a.atlas.key === 'longevity'));
});
