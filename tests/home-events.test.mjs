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

// orderPast(ends): the order to show past events in, newest end first, and which four show.
const { orderPast } = events;

test('an ended upcoming event newer than the built past ones goes first', () => {
  // two ended upcoming rows (indexes 0, 1), then the built past rows (2, 3)
  const ends = ['2026-11-20', '2026-11-24', '2026-10-17', '2026-10-02'];
  assert.deepEqual(orderPast(ends), { order: [1, 0, 2, 3], visible: [1, 0, 2, 3] });
});
test('ties keep their order', () => {
  assert.deepEqual(orderPast(['2026-11-20', '2026-11-24', '2026-11-20']), { order: [1, 0, 2], visible: [1, 0, 2] });
});
test('more than four: only the newest four are visible', () => {
  const ends = ['2026-11-20', '2026-11-24', '2026-12-08', '2026-10-17', '2026-10-02', '2026-09-04'];
  assert.deepEqual(orderPast(ends), { order: [2, 1, 0, 3, 4, 5], visible: [2, 1, 0, 3] });
});
test('with no built past rows, ended upcoming rows still give up to four', () => {
  const ends = ['2026-11-01', '2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05'];
  assert.deepEqual(orderPast(ends), { order: [4, 3, 2, 1, 0], visible: [4, 3, 2, 1] });
});
test('nothing at all', () => {
  assert.deepEqual(orderPast([]), { order: [], visible: [] });
});
