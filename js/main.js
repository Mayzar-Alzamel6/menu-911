/**
 * Restaurant QR menu template — hero video + welcome screen
 *
 * The hero is a short muted loop (assets/video/hero.webm / .mp4). Its <source>s
 * carry data-src so nothing downloads until we decide to play: skipped for
 * reduced motion and Save-Data, and paused whenever the hero is off-screen.
 * Until the video can play (or when it's skipped / missing) the charcoal
 * background in CSS shows, so the page never waits on it.
 */
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const video = hero && hero.querySelector('.hero__video');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Resolves when the first frame is ready, or never (missing file / skipped)
  let videoReady = new Promise(() => {});

  if (video && !reduced && !saveData) {
    videoReady = new Promise((resolve) => {
      video.addEventListener('loadeddata', resolve, { once: true });
    });
    video.querySelectorAll('source[data-src]').forEach((s) => { s.src = s.dataset.src; });
    video.preload = 'auto';
    video.load();

    videoReady.then(() => hero.classList.add('has-video'));

    // Play only while the hero is on screen
    const play = () => { const p = video.play(); if (p) p.catch(() => {}); };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) play(); else video.pause();
      }, { threshold: 0.15 }).observe(hero);
    } else {
      play();
    }
  } else if (video) {
    video.remove();
  }

  // Welcome screen (.intro): shown until the video's first frame is ready —
  // at least 700ms so it doesn't flash, at most 2.5s. The inline <head> script
  // already skipped it (html.no-intro) for deep links, reduced motion, repeat visits.
  const intro = document.querySelector('.intro');
  if (intro && !document.documentElement.classList.contains('no-intro')) {
    try { sessionStorage.setItem('intro-seen', '1'); } catch (e) { /* ignore */ }
    Promise.all([Promise.race([videoReady, wait(2500)]), wait(700)]).then(() => {
      intro.classList.add('is-leaving');
      document.documentElement.classList.remove('intro-on');
      setTimeout(() => intro.remove(), 600);
    });
  } else if (intro) {
    intro.remove();
  }
});
