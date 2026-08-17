/* smileee — global site behaviour
   ------------------------------------------------------------------
   Mobile navigation (hamburger drawer).
   The desktop nav is hidden below 1100px, so this drawer is the only
   way to navigate on tablets and phones.
*/
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('global-menu');
  if (!toggle || !menu) { return; }

  var shielded = [document.querySelector('main'), document.querySelector('.site-footer')]
    .filter(function (el) { return !!el; });

  var isOpen = false;

  function setState(next) {
    isOpen = next;
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    shielded.forEach(function (el) {
      if (isOpen) { el.setAttribute('inert', ''); } else { el.removeAttribute('inert'); }
    });
  }

  toggle.addEventListener('click', function (event) {
    event.preventDefault();
    setState(!isOpen);
  });

  menu.addEventListener('click', function (event) {
    // Follow the link, but close the drawer first (same-page anchors need this).
    if (event.target.closest && event.target.closest('a')) { setState(false); return; }
    if (event.target === menu) { setState(false); }
  });

  document.addEventListener('keydown', function (event) {
    if ((event.key === 'Escape' || event.key === 'Esc') && isOpen) {
      setState(false);
      toggle.focus();
    }
  });

  // Never leave the drawer open when the layout switches back to the desktop nav.
  var desktop = window.matchMedia('(min-width: 1101px)');
  function onBreakpoint(event) {
    if (event.matches && isOpen) { setState(false); }
  }
  if (desktop.addEventListener) {
    desktop.addEventListener('change', onBreakpoint);
  } else if (desktop.addListener) {
    desktop.addListener(onBreakpoint);
  }
})();
