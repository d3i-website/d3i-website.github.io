// Client-side freshness window for the homepage news strip. The strip is
// rendered at build time with the same 90-day cutoff, but production
// builds can be months apart, so the cutoff is re-applied here with the
// visitor's clock: stale cards are removed, and the whole strip goes when
// no cards remain.
(function () {
  var WINDOW_MS = 90 * 24 * 60 * 60 * 1000;

  function prune() {
    var strip = document.querySelector("[data-news-strip]");
    if (!strip) return;
    var cutoff = Date.now() - WINDOW_MS;
    strip.querySelectorAll("[data-news-date]").forEach(function (card) {
      var published = Date.parse(card.getAttribute("data-news-date"));
      if (!isNaN(published) && published < cutoff) card.remove();
    });
    if (!strip.querySelector("[data-news-date]")) strip.remove();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prune);
  } else {
    prune();
  }
})();
