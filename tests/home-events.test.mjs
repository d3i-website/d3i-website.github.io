import { test } from 'node:test';
import assert from 'node:assert/strict';
import events from '../assets/js/home-events.js';
const { planEvents } = events;

test('shows the first four that have not ended', () => {
  const ends = ['2026-11-10', '2026-11-20', '2026-11-24', '2026-12-08', '2027-05-13', '2027-06-01'];
  assert.deepEqual(planEvents(ends, '2026-11-16'), { visible: [1, 2, 3, 4], usePast: false });
});
test('an event that ends today is still upcoming', () => {
  assert.deepEqual(planEvents(['2026-11-16'], '2026-11-16'), { visible: [0], usePast: false });
});
test('fewer than four shows as many as there are', () => {
  assert.deepEqual(planEvents(['2026-12-01', '2026-12-02'], '2026-11-16'), { visible: [0, 1], usePast: false });
});
test('none left falls back to past events', () => {
  assert.deepEqual(planEvents(['2026-11-01', '2026-11-10'], '2026-11-16'), { visible: [], usePast: true });
});
test('no events at all falls back to past events', () => {
  assert.deepEqual(planEvents([], '2026-11-16'), { visible: [], usePast: true });
});
