/*
 * The front page's events list, brought up to date at view time.
 *
 * The site is built now and then, so the list built into the page can be out of date when it is
 * read. _includes/home/lists.html renders up to eight upcoming events, soonest first, each an
 * <article class="row" data-event-end="YYYY-MM-DD"> inside [data-events="upcoming"], with the
 * fifth onwards hidden; and the four most recent past events in [data-events="past"], hidden
 * unless nothing was upcoming at build time. Without JavaScript that built state stands.
 *
 * On load this shows the first four upcoming rows that have not ended by the reader's local date
 * and hides the rest. When none is left it shows the past events instead and renames the heading
 * (the element with data-events-heading) "Past events". The upcoming rows have then all ended, and
 * are the most recent past events, so they move into the past group: every row there (they carry
 * data-event-end too) is put in order, newest end first, and only the first four show.
 *
 * A plain browser file, loaded with defer; it is not built. tests/home-events.test.mjs tests
 * planEvents and orderPast under Node.
 */
(function () {
  "use strict";

  var SHOWN = 4;

  // upcomingEnds: "YYYY-MM-DD" end dates in page order; today: "YYYY-MM-DD".
  // An event that ends today is still upcoming. The strings compare as dates.
  function planEvents(upcomingEnds, today) {
    var visible = [];
    for (var i = 0; i < upcomingEnds.length && visible.length < SHOWN; i++) {
      if (upcomingEnds[i] >= today) visible.push(i);
    }
    return { visible: visible, usePast: visible.length === 0 };
  }

  // ends: "YYYY-MM-DD" end dates of past rows. Returns the indexes newest end first (ties keep
  // their order) and the first four of them, the ones to show.
  function orderPast(ends) {
    var order = ends.map(function (end, i) { return i; });
    order.sort(function (a, b) {
      if (ends[a] !== ends[b]) return ends[a] < ends[b] ? 1 : -1;
      return a - b;
    });
    return { order: order, visible: order.slice(0, SHOWN) };
  }

  function localToday() {
    var d = new Date();
    function two(n) { return (n < 10 ? "0" : "") + n; }
    return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate());
  }

  function apply() {
    var upcoming = document.querySelector('[data-events="upcoming"]');
    var past = document.querySelector('[data-events="past"]');
    var heading = document.querySelector("[data-events-heading]");
    var rows = upcoming ? Array.prototype.slice.call(upcoming.querySelectorAll("[data-event-end]")) : [];
    var plan = planEvents(rows.map(function (row) { return row.getAttribute("data-event-end"); }), localToday());

    rows.forEach(function (row, i) { row.hidden = plan.visible.indexOf(i) === -1; });
    if (plan.usePast && past) {
      // the ended upcoming rows join the built past rows; each row is moved, not copied
      var all = rows.concat(Array.prototype.slice.call(past.querySelectorAll("[data-event-end]")));
      var shown = orderPast(all.map(function (row) { return row.getAttribute("data-event-end"); }));
      shown.order.forEach(function (i) {
        all[i].hidden = shown.visible.indexOf(i) === -1;
        past.appendChild(all[i]);
      });
    }
    if (upcoming) upcoming.hidden = plan.usePast;
    if (past) past.hidden = !plan.usePast;
    if (heading) heading.textContent = plan.usePast ? "Past events" : "Upcoming events";
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { planEvents: planEvents, orderPast: orderPast };
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", apply);
    } else {
      apply();
    }
  }
})();
