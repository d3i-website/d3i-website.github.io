// Homepage "movements" carousel — "Carousel B" (peek cards) from the design
// handoff. One focused card is centred with its neighbours peeking at the
// edges; the active card recolours the active dot with the item's accent.
// The slides are rendered stacked so the section works without JS; this
// script adds `is-enhanced` to switch on the peek layout and controls, and
// toggles `is-compact` from a ResizeObserver so the layout responds to the
// carousel's own width rather than just the viewport. No autoplay.
(function () {
  var SWIPE_THRESHOLD = 40; // px of horizontal travel before a swipe counts
  var COMPACT_MAX = 680; // container width (px) below which the card stacks

  function setup(carousel) {
    var track = carousel.querySelector("[data-carousel-track]");
    var slides = Array.prototype.slice.call(
      carousel.querySelectorAll("[data-carousel-slide]")
    );
    if (!track || slides.length < 2) return; // nothing to navigate

    var dotsWrap = carousel.querySelector("[data-carousel-dots]");
    var prevBtns = carousel.querySelectorAll("[data-carousel-prev]");
    var nextBtns = carousel.querySelectorAll("[data-carousel-next]");

    var index = 0;
    var basis = 72; // slide width as % of the viewport (recomputed in measure)
    var gutter = 14; // (100 - basis) / 2 — peek + fade width on each side
    var dots = [];

    if (dotsWrap) {
      slides.forEach(function (slide, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "movements-carousel__dot";
        var heading = slide.querySelector(".movement-card__heading");
        dot.setAttribute(
          "aria-label",
          "Go to " + (heading ? heading.textContent.trim() : "slide " + (i + 1))
        );
        dot.addEventListener("click", function () {
          go(i);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function render() {
      // Centre the active slide: shift left by the gutter, then by i slides.
      track.style.transform =
        "translateX(calc(" + gutter + "% - " + index * basis + "%))";

      slides.forEach(function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });

      var accent = slides[index].getAttribute("data-accent") || "";
      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        if (active) {
          dot.setAttribute("aria-current", "true");
          dot.style.background = accent; // pill takes the item's accent
        } else {
          dot.removeAttribute("aria-current");
          dot.style.background = ""; // fall back to the neutral CSS colour
        }
      });
    }

    function go(n) {
      var len = slides.length;
      index = ((n % len) + len) % len; // wrap around in both directions
      render();
    }

    function measure() {
      var w = carousel.getBoundingClientRect().width;
      if (!w) return;
      var compact = w < COMPACT_MAX;
      basis = compact ? 90 : 72;
      gutter = (100 - basis) / 2;
      carousel.classList.toggle("is-compact", compact);
      carousel.style.setProperty("--slide-basis", basis + "%");
      carousel.style.setProperty("--fade-w", gutter + "%");
      render();
    }

    Array.prototype.forEach.call(prevBtns, function (btn) {
      btn.addEventListener("click", function () {
        go(index - 1);
      });
    });
    Array.prototype.forEach.call(nextBtns, function (btn) {
      btn.addEventListener("click", function () {
        go(index + 1);
      });
    });

    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
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
      if (dx <= -SWIPE_THRESHOLD) go(index + 1);
      else if (dx >= SWIPE_THRESHOLD) go(index - 1);
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
    document.querySelectorAll("[data-carousel]").forEach(setup);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
