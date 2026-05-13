/* =====================================================
   ARIHA JAIN — PORTFOLIO SCRIPTS
   ===================================================== */

// ---- Nav scroll state ----
const nav = document.getElementById('main-nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- Mobile hamburger ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Scroll-triggered fade-in (Intersection Observer) ----
const fadeEls = document.querySelectorAll('.fade-in');

if (fadeEls.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));
}

// ---- Hero animated word accumulation ----
(function () {
  const words = document.querySelectorAll('.hero-word');
  if (!words.length) return;

  var STEP_DELAY = 600;   // ms between each word appearing
  var HOLD_DELAY = 2800;  // ms to hold all-visible before resetting
  var START_DELAY = 900;  // slight delay so hero fade-in completes first

  function resetAll(cb) {
    words.forEach(function (w) {
      w.classList.add('no-transition');
      w.classList.remove('is-visible');
    });
    // Force reflow so the no-transition class takes effect before we remove it
    void words[0].offsetWidth;
    words.forEach(function (w) { w.classList.remove('no-transition'); });
    if (cb) setTimeout(cb, 80); // tiny pause before next reveal starts
  }

  function revealSequence() {
    var i = 0;
    function showNext() {
      if (i >= words.length) {
        // All visible — hold, then reset and loop
        setTimeout(function () {
          resetAll(revealSequence);
        }, HOLD_DELAY);
        return;
      }
      words[i].classList.add('is-visible');
      i++;
      setTimeout(showNext, STEP_DELAY);
    }
    showNext();
  }

  setTimeout(revealSequence, START_DELAY);
})();

// ---- Active nav link based on current page ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
