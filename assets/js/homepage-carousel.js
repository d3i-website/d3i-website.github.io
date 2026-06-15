// Homepage "movements" carousel. The slides are rendered stacked so the
// section is usable without JS; this script enhances each [data-carousel]
// into a single-slide-at-a-time carousel driven by prev/next buttons,
// generated dots, horizontal swipe, and left/right arrow keys. No autoplay.
(function () {
  var SWIPE_THRESHOLD = 40; // px of horizontal travel before a swipe counts

  function setup(carousel) {
    var track = carousel.querySelector("[data-carousel-track]");
    var slides = Array.prototype.slice.call(
      carousel.querySelectorAll("[data-carousel-slide]")
    );
    if (!track || slides.length < 2) return; // nothing to navigate

    var prevBtn = carousel.querySelector("[data-carousel-prev]");
    var nextBtn = carousel.querySelector("[data-carousel-next]");
    var dotsWrap = carousel.querySelector("[data-carousel-dots]");
    var index = 0;
    var dots = [];

    if (dotsWrap) {
      slides.forEach(function (slide, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "homepage-carousel__dot";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", function () {
          go(i);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function go(next) {
      // Wrap around in both directions so the carousel loops continuously.
      index = ((next % slides.length) + slides.length) % slides.length;
      track.style.transform = "translateX(" + index * -100 + "%)";
      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        go(index - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        go(index + 1);
      });
    }

    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        go(index - 1);
      } else if (e.key === "ArrowRight") {
        go(index + 1);
      }
    });

    // Pointer-based horizontal swipe (works for touch and mouse drag).
    var startX = null;
    carousel.addEventListener("pointerdown", function (e) {
      startX = e.clientX;
    });
    carousel.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var delta = e.clientX - startX;
      startX = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      go(delta < 0 ? index + 1 : index - 1);
    });

    carousel.classList.add("is-enhanced");
    go(0);
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
