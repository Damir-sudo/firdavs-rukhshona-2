/* =====================================================================
   Firdavs & Rukhshona — Wedding Invitation · script.js
   All wedding data lives in WEDDING_CONFIG for easy editing.
   ===================================================================== */

const WEDDING_CONFIG = {
  groom: "Firdavs",
  bride: "Rukhshona",

  // Event date & time (local). Months are 0-indexed: 5 = June.
  date: { year: 2026, month: 5, day: 23, hour: 19, minute: 0 },
  dateLabelEn: "23 June 2026",
  dateLabelRu: "23 июня 2026",
  timeLabel: "19:00",

  // ---- HERO ----
  // Photo is loaded directly as the hero background.
  hero: {
    image: "assets/images/hero-photo.jpg",
  },

  // ---- VENUE ----
  venue: {
    name: "Fotima Sulton",
    // Used for the map + "Build route" button when no direct link is set.
    query: "Fotima Sulton restaurant",
    coords: "", // optional "latitude,longitude" for a precise pin
    // Location URL is loaded from js/config.js (variable: locationUrl).
    photos: [
      { src: "assets/images/restaurant.jpg", caption: "Ресторан Fotima Sulton" },
    ],
  },

  // Background music. Drop a file at this path to enable the player.
  music: {
    src: "assets/music/background.mp3",
    volume: 0.5,
  },

  // Evening programme (timeline).
  program: [
    { time: "19:00", title: "Сбор гостей" },
    { time: "19:30", title: "Торжественная часть" },
    { time: "20:00", title: "Праздничный ужин" },
    { time: "21:00", title: "Развлекательная программа" },
  ],

  // ---- OUR STORY ----
  // Only items with uploaded photos are shown.
  story: [
    { date: "2021", title: "Знакомство", text: "Однажды наши пути пересеклись — и с этого момента всё изменилось.", src: "assets/images/story-1.jpg" },
    { date: "2022", title: "Первое свидание", text: "Первая прогулка, первый разговор до утра и понимание, что это — навсегда.", src: "assets/images/story-2.jpg" },
    { date: "2024", title: "Предложение", text: "Сердце замерло, прозвучало «да», и мир наполнился счастьем.", src: "assets/images/story-3.jpg" },
  ],

  // Gallery images. Replace with real photos when available.
  gallery: [
    "assets/images/gallery-1.svg",
    "assets/images/gallery-2.svg",
    "assets/images/gallery-3.svg",
    "assets/images/gallery-4.svg",
    "assets/images/gallery-5.svg",
    "assets/images/gallery-6.svg",
  ],
};

/* ---------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const pad = (n) => String(n).padStart(2, "0");

/* ---------------------------------------------------------------------
   Populate text content from config
   --------------------------------------------------------------------- */
function hydrateContent() {
  const C = WEDDING_CONFIG;
  const set = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };

  document.title = `${C.groom} & ${C.bride} — Приглашение на свадьбу · ${C.dateLabelRu}`;
  set("#groomName", C.groom);
  set("#brideName", C.bride);
  set("#heroDate", C.dateLabelEn);
  set("#venueName", C.venue.name);
  set("#venueMeta", `${C.dateLabelRu} · ${C.timeLabel}`);
  set("#footerNames", `${C.groom} & ${C.bride}`);

  const footerDate = $(".footer__date");
  if (footerDate) footerDate.textContent = `${C.dateLabelRu} · ${C.venue.name}`;
}

/* ---------------------------------------------------------------------
   Hero background photo
   --------------------------------------------------------------------- */
function initHeroBackground() {
  const hero = $("#hero");
  if (!hero) return;
  const { image } = WEDDING_CONFIG.hero;

  // Apply the uploaded photo directly as the hero background.
  hero.style.setProperty("--hero-image", `url("${image}")`);
  hero.classList.add("has-photo");
}

/* ---------------------------------------------------------------------
   Build dynamic sections (program, story, venue photos, gallery, map)
   --------------------------------------------------------------------- */
function buildTimeline() {
  const list = $("#timeline");
  if (!list) return;
  list.innerHTML = WEDDING_CONFIG.program.map((item, i) => `
    <li class="timeline__item reveal" data-reveal="${i % 2 === 0 ? "left" : "right"}" data-delay="${i * 80}">
      <span class="timeline__dot" aria-hidden="true"></span>
      <div class="timeline__card">
        <span class="timeline__time">${item.time}</span>
        <span class="timeline__title">${item.title}</span>
      </div>
    </li>`).join("");
}

function buildStory() {
  const list = $("#storyTimeline");
  if (!list) return;
  list.innerHTML = WEDDING_CONFIG.story.map((s, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    const alt = `${s.title} — ${WEDDING_CONFIG.groom} и ${WEDDING_CONFIG.bride}`;
    return `
    <li class="story__item story__item--${side} reveal" data-reveal="${side === "left" ? "left" : "right"}" data-delay="60">
      <div class="story__media">
        <figure class="story__photo">
          <img src="${s.src}" alt="${alt}" loading="lazy" decoding="async">
        </figure>
      </div>
      <span class="story__node" aria-hidden="true"></span>
      <div class="story__content">
        ${s.date ? `<span class="story__date">${s.date}</span>` : ""}
        <h3 class="story__heading">${s.title}</h3>
        <p class="story__text">${s.text}</p>
      </div>
    </li>`;
  }).join("");
}

function buildVenuePhotos() {
  const wrap = $("#venuePhotos");
  if (!wrap) return;
  const photos = WEDDING_CONFIG.venue.photos || [];
  wrap.innerHTML = photos.map((p, i) => `
    <figure class="venue__photo reveal" data-reveal="up" data-delay="${i * 90}" data-index="${i}">
      <img src="${p.src}" alt="${WEDDING_CONFIG.venue.name} — ${p.caption || ""}" loading="lazy" decoding="async">
      ${p.caption ? `<figcaption>${p.caption}</figcaption>` : ""}
    </figure>`).join("");
}

function buildGallery() {
  const grid = $("#galleryGrid");
  if (!grid) return;
  grid.innerHTML = WEDDING_CONFIG.gallery.map((src, i) => `
    <figure class="gallery__cell reveal" data-reveal="up" data-delay="${(i % 3) * 90}" data-index="${i}">
      <img src="${src}" alt="Фотография ${i + 1} — ${WEDDING_CONFIG.groom} и ${WEDDING_CONFIG.bride}" loading="lazy" decoding="async" />
    </figure>`).join("");
}

function buildMap() {
  const frame = $("#mapFrame");
  const routeBtn = $("#routeBtn");
  const { query, coords } = WEDDING_CONFIG.venue;
  const q = encodeURIComponent(coords || query);

  // locationUrl comes from js/config.js (loaded before this script).
  const configuredUrl = (typeof locationUrl !== "undefined" && locationUrl) ? locationUrl : "";

  if (frame) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = `Карта: ${WEDDING_CONFIG.venue.name}`;
    frame.appendChild(iframe);
  }
  if (routeBtn) {
    routeBtn.href = configuredUrl
      ? configuredUrl
      : `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  }
}

/* ---------------------------------------------------------------------
   Countdown timer
   --------------------------------------------------------------------- */
function initCountdown() {
  const { year, month, day, hour, minute } = WEDDING_CONFIG.date;
  const target = new Date(year, month, day, hour, minute, 0).getTime();

  const els = {
    days: $("#cdDays"), hours: $("#cdHours"),
    minutes: $("#cdMinutes"), seconds: $("#cdSeconds"),
  };
  const finished = $("#countdownFinished");
  const wrapper = $(".countdown");
  if (!els.days) return;

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      els.days.textContent = els.hours.textContent =
        els.minutes.textContent = els.seconds.textContent = "00";
      if (wrapper) wrapper.style.display = "none";
      if (finished) finished.hidden = false;
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    els.days.textContent = pad(Math.floor(s / 86400));
    els.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    els.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    els.seconds.textContent = pad(s % 60);
  };

  tick();
  const timer = setInterval(tick, 1000);
}

/* ---------------------------------------------------------------------
   Reveal on scroll (IntersectionObserver)
   --------------------------------------------------------------------- */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || "0", 10);
      setTimeout(() => el.classList.add("is-visible"), delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  items.forEach((el) => io.observe(el));
}

/* Observe dynamically created reveal elements too. */
function observeNewReveals() {
  initReveal();
}

/* ---------------------------------------------------------------------
   Scroll progress bar + hero parallax
   --------------------------------------------------------------------- */
function initScrollFx() {
  const bar = $("#scrollProgress");
  const heroContent = $(".hero__content");
  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = `${(scrollTop / Math.max(height, 1)) * 100}%`;

    // subtle parallax on hero text
    if (heroContent && scrollTop < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollTop * 0.18}px)`;
      heroContent.style.opacity = String(Math.max(1 - scrollTop / (window.innerHeight * 0.8), 0));
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* ---------------------------------------------------------------------
   Golden particles on hero (canvas)
   --------------------------------------------------------------------- */
function initParticles() {
  const canvas = $("#particles");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let w, h, particles = [];

  const resize = () => {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const count = Math.min(90, Math.floor((w * h) / 16000));
    particles = Array.from({ length: count }, () => makeParticle());
  };

  const makeParticle = () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.2 + 0.4,
    sy: Math.random() * 0.5 + 0.15,
    sx: (Math.random() - 0.5) * 0.3,
    a: Math.random() * 0.6 + 0.2,
    tw: Math.random() * 0.02 + 0.005,
  });

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.y -= p.sy;
      p.x += p.sx;
      p.a += p.tw;
      const alpha = 0.35 + Math.abs(Math.sin(p.a)) * 0.55;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
      ctx.shadowColor = "rgba(240, 221, 154, 0.8)";
      ctx.shadowBlur = 6;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  draw();
}

/* ---------------------------------------------------------------------
   Background music toggle
   --------------------------------------------------------------------- */
function initMusic() {
  const btn = $("#musicToggle");
  if (!btn) return;

  const audio = new Audio();
  audio.src = WEDDING_CONFIG.music.src;
  audio.loop = true;
  audio.preload = "none";
  audio.volume = WEDDING_CONFIG.music.volume;

  let playing = false;
  let triedAutoplay = false;

  const play = () => {
    audio.play().then(() => {
      playing = true;
      btn.classList.add("is-playing");
    }).catch(() => { /* blocked until user gesture */ });
  };
  const pause = () => {
    audio.pause();
    playing = false;
    btn.classList.remove("is-playing");
  };

  btn.addEventListener("click", () => (playing ? pause() : play()));

  // Try to start on the first user interaction (browsers block autoplay).
  const startOnGesture = () => {
    if (!triedAutoplay && !playing) { triedAutoplay = true; play(); }
    window.removeEventListener("pointerdown", startOnGesture);
    window.removeEventListener("keydown", startOnGesture);
  };
  window.addEventListener("pointerdown", startOnGesture, { once: true });
  window.addEventListener("keydown", startOnGesture, { once: true });
}

/* ---------------------------------------------------------------------
   Gallery lightbox
   --------------------------------------------------------------------- */
function initLightbox() {
  const cells = $$(".gallery__cell");
  if (!cells.length) return;
  const images = WEDDING_CONFIG.gallery;
  let current = 0;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML = `
    <button class="lightbox__btn lightbox__close" aria-label="Закрыть">&times;</button>
    <button class="lightbox__btn lightbox__prev" aria-label="Предыдущее фото">&#8249;</button>
    <img class="lightbox__img" alt="Фотография" />
    <button class="lightbox__btn lightbox__next" aria-label="Следующее фото">&#8250;</button>`;
  document.body.appendChild(box);

  const imgEl = $(".lightbox__img", box);
  const show = (i) => {
    current = (i + images.length) % images.length;
    imgEl.src = images[current];
    imgEl.alt = `Фотография ${current + 1}`;
  };
  const open = (i) => { show(i); box.classList.add("is-open"); document.body.style.overflow = "hidden"; };
  const close = () => { box.classList.remove("is-open"); document.body.style.overflow = ""; };

  cells.forEach((cell) => {
    cell.addEventListener("click", () => open(parseInt(cell.dataset.index || "0", 10)));
  });
  $(".lightbox__close", box).addEventListener("click", close);
  $(".lightbox__next", box).addEventListener("click", () => show(current + 1));
  $(".lightbox__prev", box).addEventListener("click", () => show(current - 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });
}

/* ---------------------------------------------------------------------
   RSVP form
   --------------------------------------------------------------------- */
function initRsvp() {
  const form = $("#rsvpForm");
  if (!form) return;
  const success = $("#rsvpSuccess");
  const guestsField = $("#guestsField");

  const setError = (name, msg) => {
    const el = $(`[data-error-for="${name}"]`);
    if (el) el.textContent = msg || "";
  };

  // Hide guest count when "won't attend" is chosen.
  form.addEventListener("change", (e) => {
    if (e.target.name === "attendance") {
      const coming = form.attendance.value === "yes";
      if (guestsField) guestsField.style.display = coming ? "" : "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    setError("guestName", ""); setError("guestPhone", ""); setError("attendance", "");

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const attendance = form.attendance.value;

    if (name.length < 2) { setError("guestName", "Пожалуйста, укажите имя"); valid = false; }
    if (phone.replace(/\D/g, "").length < 7) { setError("guestPhone", "Введите корректный телефон"); valid = false; }
    if (!attendance) { setError("attendance", "Выберите вариант"); valid = false; }
    if (!valid) return;

    const data = {
      name,
      phone,
      attendance,
      guests: attendance === "yes" ? form.guests.value : "0",
      submittedAt: new Date().toISOString(),
    };

    // Persist locally so the answer isn't lost (no backend in static hosting).
    try {
      const all = JSON.parse(localStorage.getItem("rsvp_responses") || "[]");
      all.push(data);
      localStorage.setItem("rsvp_responses", JSON.stringify(all));
    } catch (_) { /* ignore storage errors */ }

    console.info("RSVP submitted:", data);

    form.querySelectorAll("input, select, button").forEach((el) => (el.disabled = true));
    if (success) {
      success.hidden = false;
      success.textContent = attendance === "yes"
        ? "Спасибо! Ваш ответ принят. Будем рады встрече \u2764"
        : "Спасибо за ответ! Будем скучать \u2764";
    }
  });
}

/* ---------------------------------------------------------------------
   Preloader
   --------------------------------------------------------------------- */
function initPreloader() {
  const pre = $("#preloader");
  if (!pre) return;
  const hide = () => setTimeout(() => pre.classList.add("is-hidden"), 500);
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide);
}

/* ---------------------------------------------------------------------
   Boot
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  hydrateContent();
  initHeroBackground();
  buildTimeline();
  buildStory();
  buildVenuePhotos();
  buildGallery();
  buildMap();

  initCountdown();
  initParticles();
  initScrollFx();
  initMusic();
  initLightbox();
  initRsvp();
  initPreloader();

  // Reveal observers run last so they pick up dynamically built nodes.
  observeNewReveals();
});
