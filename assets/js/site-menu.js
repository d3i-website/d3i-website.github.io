// The header's Menu button below 1000px (_includes/site-header.html, _sass/_nav.scss).
// It opens and closes the main navigation as a drop-down under the header. The open
// state is the button's aria-expanded; the stylesheet shows the panel from it.
// Without JavaScript the page keeps class="no-js" and the header shows the wrapped list.
(function () {
  document.documentElement.classList.remove('no-js');

  var button = document.querySelector('.site-header__menu');
  var nav = button && document.getElementById(button.getAttribute('aria-controls'));
  if (!nav) return;

  // the same width as the stylesheet's $menu-below
  var wide = window.matchMedia('(min-width: 1000px)');

  function isOpen() {
    return button.getAttribute('aria-expanded') === 'true';
  }
  function setOpen(open) {
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  button.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  // Escape closes the panel and returns focus to the button
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

  // following a link closes it
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  // at 1000px and wider the links are a row again, and the panel is closed
  wide.addEventListener('change', function (event) {
    if (event.matches) setOpen(false);
  });
})();
