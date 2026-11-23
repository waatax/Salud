import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BOX_INTERVAL_DAYS,
  buildInterleavedDeck,
  diagnoseTracks,
  getDueLessonIds,
  scheduleReview,
} from '../spacedRepetition';
import {
  METALEARNING_MAP,
  SYNTHESIS_CHAINS,
  WORKED_EXAMPLES,
} from '../../data/learning/ultralearningBlueprint';
import { ALL_LESSONS, LEARNING_TRACKS } from '../../data/learning/tracks';
import { parseHash } from '../../config/routes';
import { pageTitle } from '../../config/pageTitle';
import { buildSearchIndex, searchDocs } from '../../data/learning/searchIndex';

const DAY_MS = 24 * 60 * 60 * 1000;

test('spacedRepetition: Leitner progression for again, good, and easy ratings', () => {
  const t0 = 1_700_000_000_000;
  const c1 = scheduleReview(undefined, 'good', t0);
  assert.equal(c1.box, 1);
  assert.equal(c1.reviews, 1);
  assert.equal(c1.lapses, 0);
  assert.equal(c1.nextDueAt, t0 + BOX_INTERVAL_DAYS[1] * DAY_MS);

  const c2 = scheduleReview(c1, 'easy', t0 + DAY_MS);
  assert.equal(c2.box, 3);
  assert.equal(c2.reviews, 2);
  assert.equal(c2.nextDueAt, t0 + DAY_MS + BOX_INTERVAL_DAYS[3] * DAY_MS);

  const c3 = scheduleReview(c2, 'again', t0 + 2 * DAY_MS);
  assert.equal(c3.box, 0);
  assert.equal(c3.lapses, 1);
  assert.equal(c3.nextDueAt, t0 + 2 * DAY_MS + BOX_INTERVAL_DAYS[0] * DAY_MS);
});

test('spacedRepetition: getDueLessonIds prioritizes overdue high-lapse cards', () => {
  const now = 1_700_000_000_000;
  const due = getDueLessonIds(
    ['L-1', 'L-2', 'L-3', 'L-4'],
    {
      completed: ['L-4'],
      quiz: { 'L-3': false },
      reviewSchedule: {
        'L-1': { box: 2, nextDueAt: now + DAY_MS, lastReviewedAt: now - DAY_MS, reviews: 2, lapses: 0 },
        'L-2': { box: 0, nextDueAt: now - DAY_MS, lastReviewedAt: now - 2 * DAY_MS, reviews: 3, lapses: 2 },
      },
    },
    now
  );
  assert.deepEqual(due, ['L-2', 'L-3', 'L-4']);
});

test('spacedRepetition: diagnoseTracks ranks tracks with quiz misses first and covers all 8 tracks', () => {
  const diag = diagnoseTracks(LEARNING_TRACKS, {
    completed: ['L-EAT-01', 'L-EAT-02'],
    quiz: { 'L-MOVE-01': false, 'L-EAT-01': true },
    reviewSchedule: {},
  });
  assert.equal(diag.length, LEARNING_TRACKS.length);
  assert.equal(diag[0].trackId, 'move');
  assert.equal(diag[0].nextLessonId, 'L-MOVE-01');
  for (const d of diag) {
    assert.ok(d.masteryPct >= 0 && d.masteryPct <= 100);
    assert.ok(d.nextLessonId.length > 0);
  }
});

test('spacedRepetition: buildInterleavedDeck mixes tracks (variability over repetition)', () => {
  const deck = buildInterleavedDeck(
    ALL_LESSONS,
    { completed: [], quiz: { 'L-EAT-01': false }, reviewSchedule: {} },
    8
  );
  assert.equal(deck.length, 8);
  const uniqueTracks = new Set(deck.map((l) => l.track_id));
  assert.ok(uniqueTracks.size >= 6, `expected interleaved tracks >= 6, got ${uniqueTracks.size}`);
});

test('ultralearningBlueprint: worked examples, synthesis chains, and metalearning links all resolve', () => {
  assert.ok(WORKED_EXAMPLES.length >= 4);
  for (const ex of WORKED_EXAMPLES) {
    assert.ok(ex.steps.length >= 3, `${ex.id} should have at least 3 worked steps`);
    for (const lk of ex.links) {
      assert.ok(parseHash(lk.hash), `dead worked-example link: ${lk.hash}`);
    }
  }
  assert.ok(SYNTHESIS_CHAINS.length >= 4);
  for (const ch of SYNTHESIS_CHAINS) {
    assert.ok(ch.nodes.length >= 3);
    for (const lk of ch.links) {
      assert.ok(parseHash(lk.hash), `dead synthesis-chain link: ${lk.hash}`);
    }
  }
  assert.equal(METALEARNING_MAP.length, 3);
  for (const m of METALEARNING_MAP) {
    for (const lk of m.links) {
      assert.ok(parseHash(lk.hash), `dead metalearning link: ${lk.hash}`);
    }
  }
});

test('starter lessons: all 8 track opener lessons carry authoritative sources', () => {
  for (const track of LEARNING_TRACKS) {
    const first = track.lessons[0];
    assert.ok(first, `${track.id} must have a starter lesson`);
    assert.ok(
      Array.isArray(first.sources) && first.sources.length >= 2,
      `${first.id} (${track.id}) should carry at least 2 verified sources`
    );
  }
});

test('mastery workshop route, page title, and search reachability', () => {
  const route = parseHash('learn/mastery');
  assert.deepEqual(route, { kind: 'learn', trackId: 'mastery', lessonId: undefined });
  assert.match(pageTitle({ activePillar: 'learn', learnTrackId: 'mastery' }), /超速學習工作坊/);

  const docs = buildSearchIndex();
  const hits = searchDocs(docs, '超速學習 融會貫通');
  assert.ok(hits.some((h) => h.target === 'learn/mastery'), 'search should reach learn/mastery');
});
