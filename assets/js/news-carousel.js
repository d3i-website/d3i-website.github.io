// Homepage "Latest news" carousel. The strip renders as a plain grid of all
// eligible cards without JS; this script adds `is-enhanced` to turn the grid
// into a sliding track showing 3 cards (1 in compact mode), auto-advancing
// one card every 5 seconds. The loop is seamless: the first cards are cloned
// onto the end of the track, the slide animates into the clones, then snaps
// back to the real start with the transition suppressed. Autoplay pauses on
// hover, keyboard focus, and hidden tabs, and is disabled entirely under
// prefers-reduced-motion (dots, swipe and arrow keys still work). Loaded
// after news-freshness.js, so stale cards are pruned before cards are
// counted here.
(function () {
  var INTERVAL_MS = 5000;
  var SWIPE_THRESHOLD = 40; // px of horizontal travel before a swipe counts
  var COMPACT_MAX = 680; // container width (px) below which one card shows
  var CLONES = 3; // lead cards cloned onto the tail; >= max visible cards

  function setup(carousel) {
    var track = carousel.querySelector("[data-news-track]");
    var dotsWrap = carousel.querySelector("[data-news-dots]");
    if (!track) return;

    var cards = Array.prototype.slice.call(track.children);
    if (cards.length < 2) return; // nothing to scroll in any layout

    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    var index = 0; // leftmost visible (leading) real card
    var visible = 3; // recomputed in measure()
    var step = 0; // px between successive cards, incl. the flex gap
    var timer = null;
    var hovered = false;
    var focused = false;
    var dots = [];

    // Tail clones give the last real positions a full window to slide into.
    // Permanently aria-hidden and inert: they are a visual continuation
    // only; screen readers and the keyboard reach the real cards instead.
    cards.slice(0, CLONES).forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("data-news-clone", "");
      if ("inert" in clone) clone.inert = true;
      track.appendChild(clone);
    });

    if (dotsWrap) {
      cards.forEach(function (card, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "news-carousel__dot";
        var heading = card.querySelector(".news-card__title");
        dot.setAttribute(
          "aria-label",
          "Go to " + (heading ? heading.textContent.trim() : "card " + (i + 1))
        );
        dot.addEventListener("click", function () {
          go(i, true);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function scrollable() {
      return cards.length > visible;
    }

    function render(animate) {
      if (!animate || reduceMotion) track.style.transition = "none";
      track.style.transform = "translateX(" + -(index * step) + "px)";
      if (!animate || reduceMotion) {
        void track.offsetWidth; // flush so the jump doesn't animate
        track.style.transition = "";
      }

      // index === cards.length is the clone position, visually card 0.
      var active = index % cards.length;

      cards.forEach(function (card, i) {
        var shown =
          scrollable() === false ||
          (i - active + cards.length) % cards.length < visible;
        card.setAttribute("aria-hidden", shown ? "false" : "true");
        if ("inert" in card) card.inert = !shown;
      });

      // The active dot takes the leading card's accent, like the movements
      // carousel; the accent class paints the media slot's background.
      var media = cards[active].querySelector(".news-card__media");
      var accent = media ? getComputedStyle(media).backgroundColor : "";
      dots.forEach(function (dot, i) {
        var isActive = i === active;
        dot.classList.toggle("is-active", isActive);
        if (isActive) {
          dot.setAttribute("aria-current", "true");
          dot.style.background = accent;
        } else {
          dot.removeAttribute("aria-current");
          dot.style.background = "";
        }
      });
    }

    function go(n, animate) {
      if (!scrollable()) return;
      var len = cards.length;
      if (n === len && animate && !reduceMotion) {
        // Forward wrap: slide into the clones; transitionend snaps to 0.
        index = len;
      } else {
        index = ((n % len) + len) % len;
      }
      render(animate);
    }

    track.addEventListener("transitionend", function (e) {
      if (e.target !== track || e.propertyName !== "transform") return;
      if (index === cards.length) {
        index = 0;
        render(false);
      }
    });

    function measure() {
      var w = carousel.getBoundingClientRect().width;
      if (!w) return;
      var compact = w < COMPACT_MAX;
      carousel.classList.toggle("is-compact", compact);
      visible = compact ? 1 : 3;
      step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0;
      if (dotsWrap) dotsWrap.style.display = scrollable() ? "" : "none";
      if (index >= cards.length) index = 0;
      render(false);
      maybeRun();
    }

    function maybeRun() {
      var run =
        scrollable() &&
        !reduceMotion &&
        !hovered &&
        !focused &&
        !document.hidden;
      if (run && !timer) {
        timer = window.setInterval(function () {
          go(index + 1, true);
        }, INTERVAL_MS);
      } else if (!run && timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    carousel.addEventListener("pointerenter", function () {
      hovered = true;
      maybeRun();
    });
    carousel.addEventListener("pointerleave", function () {
      hovered = false;
      maybeRun();
    });
    carousel.addEventListener("focusin", function () {
      focused = true;
      maybeRun();
    });
    carousel.addEventListener("focusout", function () {
      focused = false;
      maybeRun();
    });
    document.addEventListener("visibilitychange", maybeRun);

    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1, true);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1, true);
      }
    });

    // Pointer-based horizontal swipe (touch and mouse drag).
    var startX = null;
    carousel.addEventListener("pointerdown", function (e) {
      startX = e.clientX;
    });
    carousel.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      startX = null;
      if (dx <= -SWIPE_THRESHOLD) go(index + 1, true);
      else if (dx >= SWIPE_THRESHOLD) go(index - 1, true);
    });

    carousel.classList.add("is-enhanced");
    measure();

    if (window.ResizeObserver) {
      new window.ResizeObserver(function () {
        measure();
      }).observe(carousel);
    } else {
      window.addEventListener("resize", measure);
    }
  }

  function init() {
    document.querySelectorAll("[data-news-carousel]").forEach(setup);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
