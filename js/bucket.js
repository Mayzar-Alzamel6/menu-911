/**
 * Bucket section — scroll-scrubbed frame animation
 *
 * The frames (cut from the bucket videos) are drawn on a canvas. Portrait
 * screens get the vertical 9:16 video (assets/img/bucket-tall, full bleed);
 * landscape screens the wide one (assets/img/bucket). ScrollTrigger pins
 * the stage for a few screens and maps scroll progress to the frame, so the chicken and fries fall into the
 * bucket as you scroll and fly back out when you scroll up.
 *
 * Phones load every second frame (half the download). Frames only start
 * loading when the section comes near. If a frame would have to be cropped
 * too much to cover the screen, it's drawn smaller over a blurred cover copy.
 * Reduced motion / Save-Data / no GSAP: the last frame is shown still.
 */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.bucket');
  if (!section) return;
  const stage = section.querySelector('.bucket__stage');
  const canvas = section.querySelector('.bucket__canvas');
  const text = section.querySelector('.bucket__text');
  const cta = section.querySelector('.bucket__cta');
  const ctx = canvas.getContext('2d');

  const tall = window.innerHeight > window.innerWidth;
  const TOTAL = tall ? 123 : 144;
  // ?v busts the cache when the frames are re-exported
  const src = (i) => `assets/img/${tall ? 'bucket-tall' : 'bucket'}/f_${String(i).padStart(3, '0')}.webp?v=2`;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const motion = !!(window.gsap && window.ScrollTrigger) && !reduced && !saveData;

  const step = window.matchMedia('(max-width: 767px)').matches ? 2 : 1;
  const ids = [];
  for (let i = 1; i <= TOTAL; i += step) ids.push(i);
  if (ids[ids.length - 1] !== TOTAL) ids.push(TOTAL);
  const frames = new Array(ids.length);
  let current = motion ? 0 : ids.length - 1;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(stage.clientWidth * dpr);
    canvas.height = Math.round(stage.clientHeight * dpr);
    draw(current);
  };

  // Nearest loaded frame at or before i, so fast scrolling never shows blank
  const pick = (i) => {
    for (let j = i; j >= 0; j--) if (frames[j] && frames[j].complete && frames[j].naturalWidth) return frames[j];
    return null;
  };

  function draw(i) {
    const img = pick(i);
    if (!img) return;
    const cw = canvas.width, ch = canvas.height;
    ctx.imageSmoothingQuality = 'high';
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const cover = Math.max(cw / iw, ch / ih);
    const contain = Math.min(cw / iw, ch / ih);
    const scale = Math.min(cover, contain * 2.3);
    const w = iw * scale, h = ih * scale;
    const x = (cw - w) / 2;

    if (scale >= cover) {
      ctx.drawImage(img, x, (ch - h) / 2, w, h);
      return;
    }
    const y = (ch - h) / 2 + ch * 0.06;
    ctx.save();
    ctx.filter = 'blur(28px)';
    ctx.drawImage(img, (cw - iw * cover) / 2, (ch - ih * cover) / 2, iw * cover, ih * cover);
    ctx.restore();

    // Sharp frame with its top and bottom faded into the blurred copy
    if (!fade) fade = document.createElement('canvas');
    fade.width = Math.round(w);
    fade.height = Math.round(h);
    const f = fade.getContext('2d');
    f.imageSmoothingQuality = 'high';
    f.drawImage(img, 0, 0, fade.width, fade.height);
    const g = f.createLinearGradient(0, 0, 0, fade.height);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.15, '#000');
    g.addColorStop(0.85, '#000');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    f.globalCompositeOperation = 'destination-in';
    f.fillStyle = g;
    f.fillRect(0, 0, fade.width, fade.height);
    ctx.drawImage(fade, x, y);
  }
  let fade = null;

  const load = (i) => new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = img.onerror = resolve;
    img.src = src(ids[i]);
    frames[i] = img;
  });

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    if (!motion) {
      load(ids.length - 1).then(() => draw(current));
      return;
    }
    // First frame first (visible straight away), then the rest in order
    load(0).then(() => {
      draw(current);
      ids.slice(1).forEach((_, k) => load(k + 1).then(() => { if (k + 1 <= current) draw(current); }));
    });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { start(); io.disconnect(); }
    }, { rootMargin: '150% 0px' });
    io.observe(section);
  } else {
    start();
  }

  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener('resize', resize);

  if (!motion) return;

  gsap.registerPlugin(ScrollTrigger);
  const state = { f: 0 };
  const tl = gsap.timeline({
    scrollTrigger: { trigger: stage, start: 'top top', end: '+=250%', scrub: 0.5, pin: true },
  });
  tl.to(state, {
    f: ids.length - 1,
    ease: 'none',
    duration: 1,
    onUpdate: () => {
      const f = Math.round(state.f);
      if (f !== current) { current = f; draw(f); }
    },
  }, 0);
  // Title slides in over the last part, once the bucket is full
  tl.fromTo(text, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.75);
  // Menu button once the last frame is reached, held for the rest of the pin
  if (cta) tl.fromTo(cta, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 1);
  tl.to({}, { duration: 0.15 });

  // The pin adds scroll height above the menu, whose triggers menu.js made first
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});
