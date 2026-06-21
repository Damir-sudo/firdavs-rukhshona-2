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
  // Photo path is set directly in CSS (css/style.css → .hero background).
  // To change the hero photo, replace assets/images/hero-photo.jpg.

  // ---- VENUE ----
  venue: {
    name: "Fotima Sulton",
    // Used for the map search if locationUrl (in config.js) is empty.
    query: "Fotima Sulton restaurant Samarkand",
    // Location URL is loaded from js/config.js (variable: locationUrl).
    photos: [
      { src: "assets/images/restaurant.jpg", caption: "Ресторан Fotima Sulton" },
    ],
  },

  // Background music — Italian Jazz / Romantic ambient loop.
  // File: assets/music/romantic-jazz.wav (auto-plays on user gesture).
  music: {
    src: "assets/music/romantic-jazz.wav",
    volume: 0.45,
  },

  // Evening programme (timeline).
  program: [
    { time: "19:00", title: "Сбор гостей" },
    { time: "19:30", title: "Торжественная часть" },
    { time: "21:00", title: "Первый свадебный вальс молодожёнов" },
    { time: "22:00", title: "Торжественное разрезание свадебного торта и продолжение праздничной программы" },
  ],

  // ---- OUR STORY (photo gallery) ----
  // Photos that don't exist (404) are automatically hidden.
  storyPhotos: [
    "assets/images/story-1.jpg",
    "assets/images/story-2.jpg",
    "assets/images/story-3.jpg",
    "assets/images/story-4.jpg",
    "assets/images/story-5.jpg",
    "assets/images/story-6.jpg",
  ],

};

/* ---------------------------------------------------------------------
   Translations
   --------------------------------------------------------------------- */
const translations = {
  ru: {
    heroPretitle: "С радостью приглашаем на нашу свадьбу",
    heroSubtitle: "Wedding Day",
    scrollDown: "Листайте вниз",
    greetingTitle: "Дорогие родные и друзья!",
    greetingText: "С огромной радостью приглашаем вас разделить вместе с нами один из самых счастливых дней нашей жизни. Ваше присутствие сделает этот праздник по-настоящему особенным.",
    countdownEyebrow: "До торжества осталось",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    countdownFinished: "Сегодня наш день! Спасибо, что вы с нами \u2764",
    storyTitle: "Наша история",
    programTitle: "Программа вечера",
    venueTitle: "Место проведения",
    routeBtn: "Построить маршрут",
    wishesQuote: "Ваше присутствие станет для нас самым ценным подарком.",
    rsvpTitle: "Подтверждение участия",
    rsvpLead: "Пожалуйста, подтвердите своё присутствие до 1 июня 2026 года.",
    labelName: "Имя и фамилия",
    placeholderName: "Ваше имя",
    labelPhone: "Телефон",
    labelAttendance: "Будете присутствовать?",
    attendYes: "Да, обязательно буду",
    attendNo: "К сожалению, не смогу",
    labelGuests: "Количество гостей",
    guest1: "1 человек",
    guest2: "2 человека",
    guest3: "3 человека",
    guest4: "4 человека",
    submitBtn: "Подтвердить участие",
    rsvpSuccess: "Спасибо! Ваш ответ принят. Будем рады встрече \u2764",
    rsvpDeclined: "Спасибо за ответ! Будем скучать \u2764",
    footerDate: "23 июня 2026 \u00B7 Fotima Sulton",
    footerCredit: "С любовью ждём вас на нашем празднике",
    musicOn: "Music On",
    musicOff: "Music Off",
    errorName: "Пожалуйста, укажите имя",
    errorPhone: "Введите корректный телефон",
    errorAttendance: "Выберите вариант",
    venueCaption: "Ресторан Fotima Sulton",
  },
  en: {
    heroPretitle: "We joyfully invite you to our wedding",
    heroSubtitle: "Wedding Day",
    scrollDown: "Scroll down",
    greetingTitle: "Dear Family and Friends!",
    greetingText: "We are thrilled to invite you to share one of the happiest days of our lives. Your presence will make this celebration truly special.",
    countdownEyebrow: "Until the celebration",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    countdownFinished: "Today is our day! Thank you for being with us \u2764",
    storyTitle: "Our Story",
    programTitle: "Evening Program",
    venueTitle: "Venue",
    routeBtn: "Get Directions",
    wishesQuote: "Your presence will be the most precious gift for us.",
    rsvpTitle: "Confirm Attendance",
    rsvpLead: "Please confirm your attendance by June 1, 2026.",
    labelName: "Full Name",
    placeholderName: "Your name",
    labelPhone: "Phone",
    labelAttendance: "Will you attend?",
    attendYes: "Yes, I will be there",
    attendNo: "Unfortunately, I cannot",
    labelGuests: "Number of Guests",
    guest1: "1 person",
    guest2: "2 people",
    guest3: "3 people",
    guest4: "4 people",
    submitBtn: "Confirm Attendance",
    rsvpSuccess: "Thank you! Your response has been received. We look forward to seeing you \u2764",
    rsvpDeclined: "Thank you for your response! We will miss you \u2764",
    footerDate: "23 June 2026 \u00B7 Fotima Sulton",
    footerCredit: "With love, we look forward to celebrating with you",
    musicOn: "Music On",
    musicOff: "Music Off",
    errorName: "Please enter your name",
    errorPhone: "Please enter a valid phone number",
    errorAttendance: "Please select an option",
    venueCaption: "Fotima Sulton Restaurant",
  },
};

// Program translations (dynamic content)
const programTranslations = {
  ru: [
    { time: "19:00", title: "Сбор гостей" },
    { time: "19:30", title: "Торжественная часть" },
    { time: "21:00", title: "Первый свадебный вальс молодожёнов" },
    { time: "22:00", title: "Торжественное разрезание свадебного торта и продолжение праздничной программы" },
  ],
  en: [
    { time: "19:00", title: "Guest Arrival" },
    { time: "19:30", title: "Ceremony" },
    { time: "21:00", title: "First Wedding Dance" },
    { time: "22:00", title: "Cake Cutting and Continuation of Festivities" },
  ],
};

let currentLang = localStorage.getItem("wedding_lang") || "ru";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("wedding_lang", lang);

  const t = translations[lang];
  if (!t) return;

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    var key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
    var key = el.getAttribute("data-i18n-placeholder");
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Update the music toggle label based on playing state
  var musicBtn = document.getElementById("musicToggle");
  if (musicBtn) {
    var label = musicBtn.querySelector(".music-toggle__label");
    if (label) {
      var isPlaying = musicBtn.classList.contains("is-playing");
      label.textContent = isPlaying ? t.musicOn : t.musicOff;
    }
  }

  // Rebuild timeline with correct language
  var timelineEl = document.getElementById("timeline");
  if (timelineEl) {
    var items = programTranslations[lang] || programTranslations.ru;
    timelineEl.innerHTML = items.map(function(item, i) {
      return '<li class="timeline__item reveal is-visible" data-reveal="' + (i % 2 === 0 ? "left" : "right") + '" data-delay="' + (i * 80) + '">' +
        '<span class="timeline__dot" aria-hidden="true"></span>' +
        '<div class="timeline__card">' +
        '<span class="timeline__time">' + item.time + '</span>' +
        '<span class="timeline__title">' + item.title + '</span>' +
        '</div></li>';
    }).join("");
  }

  // Update venue photo captions
  var venuePhotos = document.querySelectorAll(".venue__photo figcaption");
  venuePhotos.forEach(function(el) {
    el.textContent = t.venueCaption;
  });

  // Update html lang attribute
  document.documentElement.lang = lang === "ru" ? "ru" : "en";

  // Update active state on switcher buttons
  document.querySelectorAll(".lang-switcher__btn").forEach(function(btn) {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
  });
}

function initLangSwitcher() {
  var switcher = document.getElementById("langSwitcher");
  if (!switcher) return;

  switcher.addEventListener("click", function(e) {
    var btn = e.target.closest(".lang-switcher__btn");
    if (!btn) return;
    var lang = btn.getAttribute("data-lang");
    if (lang && lang !== currentLang) {
      applyLanguage(lang);
    }
  });

  // Apply saved language on load
  applyLanguage(currentLang);
}

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
   Build dynamic sections (program, story, venue photos, map)
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
  list.innerHTML = WEDDING_CONFIG.storyPhotos.map((src, i) => {
    const alt = `${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride} — фото ${i + 1}`;
    return `
    <li class="gallery__item reveal" data-reveal="up" data-delay="${i * 80}">
      <figure class="gallery__figure" data-lightbox="${i}">
        <img src="${src}" alt="${alt}" loading="lazy" decoding="async"
             onerror="this.closest('.gallery__item').style.display='none'">
      </figure>
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

function buildMap() {
  const frame = $("#mapFrame");
  const routeBtn = $("#routeBtn");
  const { query } = WEDDING_CONFIG.venue;

  // locationUrl comes from js/config.js (loaded before this script).
  const configuredUrl = (typeof locationUrl !== "undefined" && locationUrl) ? locationUrl : "";

  if (frame) {
    const iframe = document.createElement("iframe");
    // Use Yandex Maps static embed with restaurant coordinates.
    iframe.src = "https://yandex.uz/map-widget/v1/?ll=66.967199%2C39.664909&z=16&pt=66.967199,39.664909,pm2rdm";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = `Карта: ${WEDDING_CONFIG.venue.name}`;
    iframe.setAttribute("allowfullscreen", "true");
    frame.appendChild(iframe);
  }
  if (routeBtn) {
    routeBtn.href = configuredUrl
      ? configuredUrl
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
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
  const label = btn.querySelector(".music-toggle__label");

  const audio = new Audio();
  audio.src = WEDDING_CONFIG.music.src;
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = WEDDING_CONFIG.music.volume;

  let playing = false;

  const setLabel = (on) => {
    if (label) {
      var t = translations[currentLang] || translations.ru;
      label.textContent = on ? t.musicOn : t.musicOff;
    }
  };

  const play = () => {
    audio.play().then(() => {
      playing = true;
      btn.classList.add("is-playing");
      setLabel(true);
    }).catch(() => { /* blocked until user gesture */ });
  };
  const pause = () => {
    audio.pause();
    playing = false;
    btn.classList.remove("is-playing");
    setLabel(false);
  };

  btn.addEventListener("click", () => (playing ? pause() : play()));
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

    if (name.length < 2) { setError("guestName", (translations[currentLang] || translations.ru).errorName); valid = false; }
    if (phone.replace(/\D/g, "").length < 7) { setError("guestPhone", (translations[currentLang] || translations.ru).errorPhone); valid = false; }
    if (!attendance) { setError("attendance", (translations[currentLang] || translations.ru).errorAttendance); valid = false; }
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
      var t = translations[currentLang] || translations.ru;
      success.textContent = attendance === "yes" ? t.rsvpSuccess : t.rsvpDeclined;
    }
  });
}

/* ---------------------------------------------------------------------
   Lightbox for story gallery
   --------------------------------------------------------------------- */
function initLightbox() {
  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.innerHTML = `
    <button class="lightbox__close" aria-label="Закрыть">&times;</button>
    <button class="lightbox__prev" aria-label="Предыдущее фото">&#10094;</button>
    <button class="lightbox__next" aria-label="Следующее фото">&#10095;</button>
    <img class="lightbox__img" alt="" />`;
  document.body.appendChild(overlay);

  const img = overlay.querySelector(".lightbox__img");
  const closeBtn = overlay.querySelector(".lightbox__close");
  const prevBtn = overlay.querySelector(".lightbox__prev");
  const nextBtn = overlay.querySelector(".lightbox__next");
  let currentIndex = 0;

  function getVisible() { return $$(".gallery__item").filter(el => el.style.display !== "none"); }

  function open(idx) {
    const items = getVisible();
    if (idx < 0 || idx >= items.length) return;
    currentIndex = idx;
    img.src = items[currentIndex].querySelector("img").src;
    overlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }
  function close() { overlay.classList.remove("is-active"); document.body.style.overflow = ""; img.src = ""; }
  function nav(dir) { const items = getVisible(); currentIndex = (currentIndex + dir + items.length) % items.length; img.src = items[currentIndex].querySelector("img").src; }

  document.addEventListener("click", (e) => {
    const fig = e.target.closest(".gallery__figure");
    if (fig) { const items = getVisible(); open(items.indexOf(fig.closest(".gallery__item"))); }
  });
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => nav(-1));
  nextBtn.addEventListener("click", () => nav(1));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-active")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") nav(-1);
    if (e.key === "ArrowRight") nav(1);
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
  buildTimeline();
  buildStory();
  buildVenuePhotos();
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

  // Language switcher — apply saved language after DOM is ready.
  initLangSwitcher();
});
