/**
 * Restaurant QR menu template — hero video + welcome screen
 *
 * The hero is a short muted video (assets/video/hero.webm / .mp4) that plays
 * once and stays on its last frame (the finished meal). Its <source>s carry
 * data-src so nothing downloads until we decide to play. It's paused while the
 * hero is off-screen and resumes where it stopped.
 *
 * Skipped for reduced motion and Save-Data, or if it fails to load: then the
 * still of the meal (.hero__still, same as the video's last frame) is shown.
 * Until either is ready the charcoal background in CSS shows, so the page
 * never waits on them.
 */
document.addEventListener('DOMContentLoaded', () => {
  // A hidden hero (index.html) downloads nothing and doesn't hold the intro
  const hero = document.querySelector('.hero:not([hidden])');
  const video = hero && hero.querySelector('.hero__video');
  const still = hero && hero.querySelector('.hero__still');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Resolves when something is on screen (video frame or still), or never
  let heroReady = new Promise(() => {});

  const showStill = () => {
    if (video) video.remove();
    if (!still) return;
    heroReady = new Promise((resolve) => {
      still.addEventListener('load', resolve, { once: true });
      still.addEventListener('error', () => still.remove(), { once: true });
    });
    still.src = still.dataset.src;
    hero.classList.add('no-video');
  };

  if (!hero) {
    heroReady = Promise.resolve();
  } else if (video && !reduced && !saveData) {
    heroReady = new Promise((resolve) => {
      video.addEventListener('loadeddata', resolve, { once: true });
    });
    heroReady.then(() => hero.classList.add('has-video'));

    // All sources failed (missing file, unsupported): fall back to the still
    const sources = video.querySelectorAll('source[data-src]');
    sources[sources.length - 1].addEventListener('error', showStill, { once: true });
    sources.forEach((s) => { s.src = s.dataset.src; });
    video.preload = 'auto';
    video.load();

    // Play only while the hero is on screen; once ended it stays on the meal
    const play = () => {
      if (video.ended) return;
      const p = video.play();
      if (p) p.catch(() => {});
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) play(); else video.pause();
      }, { threshold: 0.15 }).observe(hero);
    } else {
      play();
    }
  } else {
    showStill();
  }

  // Welcome screen (.intro): shown until the hero has something to show —
  // at least 700ms so it doesn't flash, at most 2.5s. The inline <head> script
  // already skipped it (html.no-intro) for deep links, reduced motion, repeat visits.
  const intro = document.querySelector('.intro');
  if (intro && !document.documentElement.classList.contains('no-intro')) {
    try { sessionStorage.setItem('intro-seen', '1'); } catch (e) { /* ignore */ }
    Promise.all([Promise.race([heroReady, wait(2500)]), wait(700)]).then(() => {
      intro.classList.add('is-leaving');
      document.documentElement.classList.remove('intro-on');
      setTimeout(() => intro.remove(), 600);
    });
  } else if (intro) {
    intro.remove();
  }
});
