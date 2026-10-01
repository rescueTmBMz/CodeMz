/* Celinka Survey — navegação, renderização e interacções. Depende de content.js. */
(function () {
  "use strict";

  var PAGES = ["home", "what", "where", "who", "library", "careers", "contact"];
  var NAV_CHILDREN = {
    what: function (t) { return t.subnavWhat.map(function (l, i) { return [l, "what/" + (i < 4 ? "svc-" + (i + 1) : "quality")]; }); },
    who: function (t) { return t.subnavWho.map(function (l, i) { return [l, "who/" + ["mission", "leadership", "partners", "testimonials"][i]]; }); }
  };
  var SERVICE_IDS = ["svc-1", "svc-2", "svc-3", "svc-4"];

  var state = { lang: readLang(), page: "home", anchor: "" };
  var carouselTimer = null;
  var revealObserver = null;

  /* ---------- Utilitários ---------- */
  function readLang() {
    try { var l = localStorage.getItem("celinka-lang"); if (l === "pt" || l === "en") return l; } catch (e) {}
    return "pt";
  }
  function saveLang(l) { try { localStorage.setItem("celinka-lang", l); } catch (e) {} }
  function t() { return I18N[state.lang]; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function img(name) { return IMG_BASE + name + ".jpg"; }
  function href(route) { return "#/" + (route === "home" ? "" : route); }
  function loc(v) { return typeof v === "string" ? v : v[state.lang]; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var ICONS = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.5 6C6.5 7.3 4.5 10 4.5 13.5V18h6v-6H7.6c.3-2 1.6-3.6 3.4-4.4L9.5 6zm9 0c-3 1.3-5 4-5 7.5V18h6v-6h-2.9c.3-2 1.6-3.6 3.4-4.4L18.5 6z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
    /* Ícones de "Porquê a Celinka" */
    gps: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.9 4.9 4.3 4.3M14.8 14.8l4.3 4.3M14.8 9.2l4.3-4.3M4.9 19.1l4.3-4.3"/></svg>'
  };
  var WHY_ICONS = ["gps", "camera", "audio", "pulse", "cloud", "help"];

  /* ---------- Componentes ---------- */
  function sectionHead(kicker, title, lead, right, center) {
    return '<div class="section-head' + (center ? " center" : "") + '"><div>' +
      (kicker ? '<span class="eyebrow">' + kicker + "</span>" : "") +
      '<h2 class="section-title">' + title + "</h2>" +
      (lead ? '<p class="section-lead">' + lead + "</p>" : "") +
      "</div>" + (right || "") + "</div>";
  }

  function pageHero(navIndex, title, body, bgImg, extra) {
    var T = t();
    return '<section class="page-hero">' +
      (bgImg ? '<div class="page-hero-bg" style="background-image:url(\'' + img(bgImg) + '\')"></div>' : "") +
      '<div class="container">' +
      '<ol class="breadcrumb"><li><a href="#/">' + T.home + "</a></li><li aria-current=\"page\">" + T.nav[navIndex] + "</li></ol>" +
      "<h1>" + title + "</h1>" + (body ? "<p>" + body + "</p>" : "") + (extra || "") +
      "</div></section>";
  }

  function subnav(items) {
    return '<nav class="subnav" aria-label="Secções"><div class="container"><ul>' +
      items.map(function (i) { return '<li><a href="' + href(i[1]) + '">' + i[0] + "</a></li>"; }).join("") +
      "</ul></div></nav>";
  }

  function newsCard(n) {
    return '<article class="card is-hoverable reveal">' +
      '<div class="card-media" style="background-image:url(\'' + n.img + '\')"><span class="badge">' + n.tag + "</span></div>" +
      '<div class="card-body"><div class="card-meta">' + n.date + "</div>" +
      '<h3 class="card-title">' + n.title + "</h3>" +
      '<p class="card-text">' + n.body + "</p></div></article>";
  }

  function projectCard(p) {
    var T = t();
    return '<a class="card reveal" href="#/library">' +
      '<div class="card-body"><div class="card-meta"><span>' + p.year + '</span><span class="dot-sep"></span><span>' + p.tag + "</span></div>" +
      '<h3 class="card-title">' + p.title + "</h3>" +
      '<p class="card-text">' + p.body + "</p>" +
      '<div class="card-foot"><span>' + T.clientLabel + ": " + p.client + "</span>" + ICONS.arrow + "</div></div></a>";
  }

  function partnerGrid() {
    return '<div class="partner-grid">' + PARTNERS.map(function (p) {
      return '<div class="partner reveal"><img src="assets/img/partners/' + p.file + '" alt="' + esc(p.name) + '" loading="lazy">' +
        "<small>" + loc(p.sub) + "</small></div>";
    }).join("") + "</div>";
  }

  function ctaBand() {
    var T = t();
    return '<section class="cta-band"><div class="container"><div><h2>' + T.ctaTitle + "</h2><p>" + T.ctaBody + "</p></div>" +
      '<div class="cta-actions"><a class="btn btn-primary" href="#/contact">' + T.ctaContact + ICONS.arrow + "</a>" +
      '<a class="btn btn-ghost-light" href="mailto:info@celinkasurvey.com">info@celinkasurvey.com</a></div></div></section>';
  }

  function statsBand(cls) {
    return '<div class="stats-grid ' + (cls || "") + '">' + t().stats.map(function (s) {
      return '<div class="stat"><div class="stat-bar"></div><div class="stat-n">' + s.n + '</div><div class="stat-l">' + s.label + "</div></div>";
    }).join("") + "</div>";
  }

  /* ---------- Páginas ---------- */
  var render = {};

  render.home = function () {
    var T = t();
    var slides = T.slides.map(function (s, i) {
      var Tag = i === 0 ? "h1" : "h2";
      return '<div class="hero-slide' + (i === 0 ? " is-active" : "") + '" role="group" aria-roledescription="slide" aria-label="' + T.slideLabel + " " + (i + 1) + " / " + T.slides.length + '"' + (i === 0 ? "" : ' aria-hidden="true"') + ">" +
        '<div class="hero-bg" style="background-image:url(\'' + img(s.img) + '\')"></div>' +
        '<div class="hero-content"><div class="container"><div class="hero-panel">' +
        '<div class="hero-kicker">' + s.kicker + "</div>" +
        "<" + Tag + ">" + s.title + " <em>" + s.em + "</em></" + Tag + ">" +
        "<p>" + s.body + "</p>" +
        '<div class="hero-ctas"><a class="btn btn-primary" href="' + href(s.cta1[1]) + '">' + s.cta1[0] + ICONS.arrow + "</a>" +
        '<a class="btn btn-ghost-light" href="' + href(s.cta2[1]) + '">' + s.cta2[0] + "</a></div>" +
        "</div></div></div></div>";
    }).join("");
    var dots = T.slides.map(function (s, i) {
      return '<button class="hero-dot" type="button" data-slide="' + i + '" aria-label="' + T.slideLabel + " " + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + "></button>";
    }).join("");

    var services = T.services.map(function (s, i) {
      return '<a class="card theme-card reveal" href="' + href("what/" + SERVICE_IDS[i]) + '">' +
        '<div class="card-media" style="background-image:url(\'' + s.img + '\')"></div>' +
        '<div class="card-body"><span class="num">' + s.num + "</span>" +
        '<h3 class="card-title">' + s.h + "</h3>" +
        '<p class="card-text">' + T.servicesShort[i] + "</p>" +
        '<span class="link-arrow" style="margin-top:auto">' + T.learnMore + ICONS.arrow + "</span></div></a>";
    }).join("");

    var why = T.why.map(function (w, i) {
      return '<div class="feature reveal"><span class="feature-icon">' + ICONS[WHY_ICONS[i]] + "</span><h3>" + w.h + "</h3><p>" + w.d + "</p></div>";
    }).join("");

    var pillars = T.pillars.map(function (p) {
      return '<div class="pillar">' + ICONS.check + "<div><strong>" + p.h + "</strong><span>" + p.d + "</span></div></div>";
    }).join("");

    var jobs = T.jobs.map(function (j) {
      return '<div class="list-row"><div><h3>' + j.h + '</h3><div class="meta">' + j.meta + "</div></div>" +
        '<a class="btn btn-outline btn-sm" href="mailto:info@celinkasurvey.com?subject=' + encodeURIComponent(T.apply + " — " + j.h) + '">' + T.apply + "</a></div>";
    }).join("");

    return '<section class="hero" aria-roledescription="carousel" aria-label="Destaques">' +
      '<div class="hero-track" id="hero-track">' + slides + "</div>" +
      '<div class="hero-controls"><div class="container"><div class="hero-dots">' + dots + "</div>" +
      '<div class="hero-arrows"><button class="hero-arrow" type="button" data-dir="-1" aria-label="' + T.prev + '">' + ICONS.left + "</button>" +
      '<button class="hero-arrow" type="button" data-dir="1" aria-label="' + T.next + '">' + ICONS.right + "</button></div></div></div></section>" +

      '<section class="stats-band"><div class="container">' + statsBand() + "</div></section>" +

      '<section class="section"><div class="container">' +
      sectionHead(T.servicesKicker, T.servicesTitle, T.whatBody, '<a class="link-arrow" href="#/what">' + T.allServices + ICONS.arrow + "</a>") +
      '<div class="grid grid-4">' + services + "</div></div></section>" +

      '<section class="section section-alt"><div class="container split">' +
      '<div class="split-media reveal"><div class="media-accent"></div><img src="' + img("sobre-main") + '" alt="' + esc(T.whoImgAlt) + '" loading="lazy">' +
      '<img class="media-float" src="' + img("sobre-float") + '" alt="" loading="lazy"></div>' +
      '<div class="prose"><span class="eyebrow">' + T.aboutKicker + '</span><h2 class="section-title">' + T.aboutTitle + "</h2>" +
      "<p>" + T.aboutP1 + "</p><p>" + T.aboutP2 + "</p>" +
      '<div class="pillars">' + pillars + "</div>" +
      '<div style="margin-top:32px"><a class="btn btn-blue" href="#/who">' + T.aboutLink + ICONS.arrow + "</a></div></div></div></section>" +

      '<section class="section section-dark"><div class="container">' +
      sectionHead(T.whyKicker, T.whyTitle, T.whyBody) +
      '<div class="feature-grid">' + why + "</div></div></section>" +

      '<section class="section" id="latest"><div class="container">' +
      sectionHead(T.latestKicker, T.latestTitle) +
      '<div class="tabs" role="tablist">' +
      '<button class="tab" role="tab" id="tab-news" aria-controls="panel-news" aria-selected="true">' + T.tabNews + "</button>" +
      '<button class="tab" role="tab" id="tab-projects" aria-controls="panel-projects" aria-selected="false" tabindex="-1">' + T.tabProjects + "</button>" +
      '<button class="tab" role="tab" id="tab-jobs" aria-controls="panel-jobs" aria-selected="false" tabindex="-1">' + T.tabJobs + "</button></div>" +
      '<div class="tab-panel" role="tabpanel" id="panel-news" aria-labelledby="tab-news"><div class="grid grid-3">' + T.news.slice(0, 3).map(newsCard).join("") + "</div></div>" +
      '<div class="tab-panel" role="tabpanel" id="panel-projects" aria-labelledby="tab-projects" hidden><div class="grid grid-3">' + T.projects.slice(0, 3).map(projectCard).join("") + "</div>" +
      '<div style="margin-top:32px"><a class="link-arrow" href="#/library">' + T.viewAll + ICONS.arrow + "</a></div></div>" +
      '<div class="tab-panel" role="tabpanel" id="panel-jobs" aria-labelledby="tab-jobs" hidden>' + jobs +
      '<div style="margin-top:32px"><a class="link-arrow" href="#/careers">' + T.allJobs + ICONS.arrow + "</a></div></div>" +
      "</div></section>" +

      '<section class="section section-alt"><div class="container">' +
      sectionHead(T.partnersKicker, T.partnersTitle, T.partnersBody, "", true) +
      partnerGrid() + "</div></section>" +

      ctaBand();
  };

  render.what = function () {
    var T = t();
    var rows = T.services.map(function (s, i) {
      return '<div class="service-row reveal" id="' + SERVICE_IDS[i] + '">' +
        '<div class="service-media" role="img" aria-label="' + esc(s.h) + '" style="background-image:url(\'' + s.img + '\')"></div>' +
        '<div><span class="num">' + s.num + "</span><h2>" + s.h + "</h2><p>" + s.d + "</p>" +
        '<div class="tags">' + s.tags.map(function (g) { return '<span class="tag">' + g + "</span>"; }).join("") + "</div></div></div>";
    }).join("");
    var qa = T.qa.map(function (q) { return '<div class="qa-card reveal"><h3>' + q.h + "</h3><p>" + q.d + "</p></div>"; }).join("");
    return pageHero(1, T.whatTitle, T.whatBody, "svc-capi") +
      subnav(NAV_CHILDREN.what(T)) +
      '<section><div class="container">' + rows + "</div></section>" +
      '<section class="section section-alt" id="quality" style="scroll-margin-top:150px"><div class="container">' +
      sectionHead("", T.qaTitle) +
      '<div class="grid grid-4">' + qa + "</div>" +
      '<div style="margin-top:56px"><span class="eyebrow">' + T.toolsKicker + '</span><div class="tool-chips" style="margin-top:20px">' +
      TOOLS.map(function (x) { return '<span class="tool-chip">' + x + "</span>"; }).join("") + "</div></div></div></section>" +
      ctaBand();
  };

  render.where = function () {
    var T = t();
    var chips = '<div class="province-chips">' + PROVINCES.map(function (p) { return '<span class="province-chip">' + p + "</span>"; }).join("") + "</div>";
    var gallery = T.gallery.map(function (g) {
      return '<figure class="gallery-item reveal"><div class="ph-wrap"><div class="ph" role="img" aria-label="' + esc(g[1]) + '" style="background-image:url(\'' + img(g[0]) + '\')"></div></div><figcaption>' + g[1] + "</figcaption></figure>";
    }).join("");
    var stories = T.stories.map(function (s) {
      return '<div class="story reveal"><div class="story-media" style="background-image:url(\'' + s.img + '\')"></div>' +
        '<div><span class="badge">' + s.tag + "</span><h3>" + s.h + "</h3><p>" + s.d + "</p>" +
        '<div class="story-metrics"><span>' + s.m1 + "</span><span>" + s.m2 + "</span></div></div></div>";
    }).join("");
    return pageHero(2, T.whereTitle, T.wherePageBody, "gallery-4", chips) +
      '<section class="section"><div class="container">' +
      sectionHead(T.mapKicker, T.mapTitle, T.mapBody) +
      '<iframe class="map-frame reveal" src="mozambique-map.html" title="' + esc(T.mapTitle) + '" loading="lazy"></iframe></div></section>' +
      '<section class="section section-alt"><div class="container">' +
      sectionHead(T.fieldKicker, T.fieldTitle) +
      '<div class="gallery-grid">' + gallery + "</div></div></section>" +
      '<section class="section"><div class="container">' +
      sectionHead(T.storiesKicker, T.storiesTitle) + stories + "</div></section>" +
      ctaBand();
  };

  render.who = function () {
    var T = t();
    var mvv = T.mvv.map(function (m) { return '<div class="mvv-card reveal"><h3>' + m.k + "</h3><p>" + m.d + "</p></div>"; }).join("");
    var quotes = T.testimonials.map(function (q) {
      return '<figure class="quote-card reveal" style="margin:0">' + ICONS.quote + "<blockquote>" + q.quote + "</blockquote>" +
        "<footer><strong>" + q.org + "</strong>" + q.who + "</footer></figure>";
    }).join("");
    return pageHero(3, T.whoTitle, T.whoBody, "carreiras") +
      subnav(NAV_CHILDREN.who(T)) +
      '<section class="section" id="mission" style="scroll-margin-top:150px"><div class="container">' +
      '<div class="grid grid-3">' + mvv + "</div></div></section>" +
      '<section class="section section-dark" id="leadership" style="scroll-margin-top:150px"><div class="container split">' +
      '<div class="split-media reveal"><img src="' + img("sobre-float") + '" alt="" loading="lazy"></div>' +
      '<div><span class="eyebrow">' + T.leadKicker + '</span><h2 class="section-title">' + T.leadTitle + '</h2><p class="section-lead">' + T.leadBody + "</p>" +
      '<div style="margin-top:32px">' + statsBand() + "</div></div></div></section>" +
      '<section class="section section-alt" id="partners" style="scroll-margin-top:150px"><div class="container">' +
      sectionHead(T.partnersKicker, T.partnersTitle, T.partnersBody, "", true) + partnerGrid() + "</div></section>" +
      '<section class="section" id="testimonials" style="scroll-margin-top:150px"><div class="container">' +
      sectionHead("", T.testTitle) + '<div class="grid grid-2">' + quotes + "</div></div></section>" +
      ctaBand();
  };

  render.library = function () {
    var T = t();
    var cats = [];
    T.projects.forEach(function (p) { var c = p.tag.split(" · ")[0]; if (cats.indexOf(c) < 0) cats.push(c); });
    var filters = '<div class="filter-bar" role="group" aria-label="Filtro">' +
      '<button class="filter-btn" type="button" data-filter="" aria-pressed="true">' + T.filterAll + "</button>" +
      cats.map(function (c) { return '<button class="filter-btn" type="button" data-filter="' + esc(c) + '" aria-pressed="false">' + c + "</button>"; }).join("") + "</div>";
    var items = T.projects.map(function (p) {
      return '<article class="pub-item" data-cat="' + esc(p.tag.split(" · ")[0]) + '"><div class="pub-year">' + p.year + "</div>" +
        '<div><span class="eyebrow">' + p.tag + "</span><h3>" + p.title + "</h3><p>" + p.body + "</p></div>" +
        '<div class="pub-client"><small>' + T.clientLabel + "</small><strong>" + p.client + "</strong></div></article>";
    }).join("");
    return pageHero(4, T.libTitle, T.libBody, "news-2") +
      '<section class="section-sm section-alt"><div class="container">' + statsBand("stat-cards grid") + "</div></section>" +
      '<section class="section"><div class="container">' + filters +
      '<div id="pub-list">' + items + '</div><p class="search-empty" id="pub-empty" hidden>' + T.noResults + "</p></div></section>" +
      '<section class="section section-alt"><div class="container">' +
      sectionHead(T.newsKicker, T.newsTitle) + '<div class="grid grid-3">' + T.news.map(newsCard).join("") + "</div></div></section>" +
      ctaBand();
  };

  render.careers = function () {
    var T = t();
    var jobs = T.jobs.map(function (j) {
      return '<div class="job-row reveal"><div><h3>' + j.h + '</h3><div class="meta">' + j.meta + "</div>" +
        '<div class="tags">' + j.tags.map(function (g) { return '<span class="tag">' + g + "</span>"; }).join("") + "</div></div>" +
        '<a class="btn btn-primary btn-sm" href="mailto:info@celinkasurvey.com?subject=' + encodeURIComponent(T.apply + " — " + j.h) + '">' + T.apply + ICONS.arrow + "</a></div>";
    }).join("");
    return pageHero(5, T.careersTitle, T.careersBody, "gallery-5") +
      '<section class="section"><div class="container">' +
      '<div class="notice" style="margin-bottom:40px">' + ICONS.info + "<span>" + T.feeNotice + "</span></div>" +
      jobs +
      '<div class="open-app"><div><h3>' + T.openAppTitle + "</h3><p>" + T.openAppBody + "</p></div>" +
      '<a class="btn btn-blue" href="mailto:info@celinkasurvey.com?subject=' + encodeURIComponent(T.openAppTitle) + '">info@celinkasurvey.com</a></div>' +
      "</div></section>";
  };

  render.contact = function () {
    var T = t();
    var opts = T.footerServiceList.map(function (s) { return "<option>" + s + "</option>"; }).join("");
    return pageHero(6, T.contactTitle, T.contactBody, "hero-1") +
      '<section class="section"><div class="container contact-grid">' +
      "<div>" +
      '<div class="contact-item"><span class="ci-icon">' + ICONS.pin + "</span><div><small>" + T.hqLabel + "</small><span>Avenida Julius Nyerere N.º 562, 1º Andar<br>Polana Cimento, Cidade de Maputo<br>República de Moçambique</span></div></div>" +
      '<div class="contact-item"><span class="ci-icon">' + ICONS.phone + "</span><div><small>" + T.phoneLabel + '</small><a href="tel:+258842995744">(+258) 842 995 744</a></div></div>' +
      '<div class="contact-item"><span class="ci-icon">' + ICONS.mail + '</span><div><small>Email</small><a href="mailto:info@celinkasurvey.com">info@celinkasurvey.com</a></div></div>' +
      '<div class="contact-item"><span class="ci-icon">' + ICONS.linkedin + '</span><div><small>LinkedIn</small><a href="https://www.linkedin.com/company/celinka-survey-consultoria-servi%C3%A7os/" target="_blank" rel="noopener">Celinka Survey Consultoria &amp; Serviços</a></div></div>' +
      "</div>" +
      '<form class="form-card" id="contact-form" novalidate><h2>' + T.formTitle + '</h2><p class="form-note">' + T.formNote + "</p>" +
      '<div class="form-grid">' +
      '<div class="field"><label for="f-name">' + T.fName + ' *</label><input id="f-name" name="name" required autocomplete="name"></div>' +
      '<div class="field"><label for="f-org">' + T.fOrg + '</label><input id="f-org" name="org" autocomplete="organization"></div>' +
      '<div class="field"><label for="f-email">Email *</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>' +
      '<div class="field"><label for="f-phone">' + T.fPhone + '</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>' +
      '<div class="field full"><label for="f-service">' + T.fService + '</label><select id="f-service" name="service"><option value="">' + T.serviceOpt + "</option>" + opts + "</select></div>" +
      '<div class="field full"><label for="f-msg">' + T.fMessage + ' *</label><textarea id="f-msg" name="message" required></textarea></div>' +
      '<div class="full"><button class="btn btn-primary" type="submit">' + T.submit + ICONS.arrow + "</button></div>" +
      "</div></form></div></section>";
  };

  /* ---------- Cabeçalho e rodapé ---------- */
  function renderNav() {
    var T = t();
    $("#nav-list").innerHTML = PAGES.map(function (key, i) {
      var active = state.page === key ? " is-active" : "";
      var cur = state.page === key ? ' aria-current="page"' : "";
      var kids = NAV_CHILDREN[key];
      if (!kids) return '<li class="nav-item"><a class="nav-link' + active + '" href="' + href(key) + '"' + cur + ">" + T.nav[i] + "</a></li>";
      return '<li class="nav-item"><a class="nav-link' + active + '" href="' + href(key) + '"' + cur + ' data-has-children aria-haspopup="true">' + T.nav[i] + ICONS.chev + "</a>" +
        '<ul class="dropdown">' + kids(T).map(function (k) { return '<li><a href="' + href(k[1]) + '">' + k[0] + "</a></li>"; }).join("") + "</ul></li>";
    }).join("");
  }

  function renderFooter() {
    var T = t();
    $("#site-footer").innerHTML =
      '<div class="container footer-top">' +
      '<div><a class="footer-logo" href="#/"><img src="assets/img/logo-celinka.png" alt="Celinka Survey"></a>' +
      '<p class="footer-blurb">' + T.footerBlurb + "</p>" +
      '<div class="footer-badges"><span>97% ' + T.badgeResponse + "</span><span>CAPI Certified</span><span>+40k " + T.badgeInterviews + "</span></div></div>" +
      '<div class="footer-col"><h3>' + T.footerNav + "</h3><ul>" +
      PAGES.map(function (k, i) { return '<li><a href="' + href(k) + '">' + T.nav[i] + "</a></li>"; }).join("") + "</ul></div>" +
      '<div class="footer-col"><h3>' + T.footerServices + "</h3><ul>" +
      T.footerServiceList.map(function (s, i) { return '<li><a href="' + href("what/" + SERVICE_IDS[i]) + '">' + s + "</a></li>"; }).join("") + "</ul></div>" +
      '<div class="footer-col"><h3>' + T.footerContact + "</h3><ul>" +
      '<li><a href="mailto:info@celinkasurvey.com">info@celinkasurvey.com</a></li>' +
      '<li><a href="tel:+258842995744">(+258) 842 995 744</a></li>' +
      "<li><span>" + T.hqShort + "</span></li></ul>" +
      '<div class="socials" aria-label="' + T.footerFollow + '"><a href="https://www.linkedin.com/company/celinka-survey-consultoria-servi%C3%A7os/" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICONS.linkedin + "</a>" +
      '<a href="mailto:info@celinkasurvey.com" aria-label="Email">' + ICONS.mail + "</a></div></div>" +
      "</div>" +
      '<div class="footer-bottom"><div class="container"><span>© ' + new Date().getFullYear() + " Celinka Survey Consulting &amp; Services Lda. " + T.rights + "</span><span>" + T.footerNote + "</span></div></div>";
  }

  function applyStaticI18n() {
    var T = t();
    document.documentElement.lang = state.lang;
    $all("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"); if (T[k]) el.textContent = T[k]; });
    $all(".lang-switch button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === state.lang)); });
    $("#search-input").placeholder = T.searchPlaceholder;
  }

  /* ---------- Router ---------- */
  function parseHash() {
    var parts = (location.hash || "").replace(/^#\/?/, "").split("/");
    var page = PAGES.indexOf(parts[0]) >= 0 ? parts[0] : "home";
    return { page: page, anchor: parts[1] || "" };
  }

  function draw(scrollToTop) {
    var T = t();
    var app = $("#app");
    app.innerHTML = render[state.page]();
    renderNav();
    document.title = (state.page === "home" ? "" : T.nav[PAGES.indexOf(state.page)] + " | ") + "Celinka Survey Consulting & Services";
    app.style.animation = "none"; void app.offsetWidth; app.style.animation = "";
    initPage();
    if (state.anchor) {
      var target = document.getElementById(state.anchor);
      if (target) { setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 30); return; }
    }
    if (scrollToTop) window.scrollTo(0, 0);
  }

  function onRoute() {
    var r = parseHash();
    var samePage = r.page === state.page && $("#app").innerHTML !== "";
    state.page = r.page; state.anchor = r.anchor;
    closeNav();
    if (samePage) {
      var target = r.anchor && document.getElementById(r.anchor);
      if (target) target.scrollIntoView({ block: "start" }); else window.scrollTo(0, 0);
      return;
    }
    draw(true);
    $("#app").focus({ preventScroll: true });
  }

  /* ---------- Interacções por página ---------- */
  function initPage() {
    stopCarousel();
    initReveal();
    if (state.page === "home") { initCarousel(); initTabs(); }
    if (state.page === "library") initFilters();
    if (state.page === "contact") initForm();
  }

  function initReveal() {
    if (revealObserver) revealObserver.disconnect();
    var els = $all(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); revealObserver.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 });
    els.forEach(function (e) { revealObserver.observe(e); });
  }

  function initCarousel() {
    var slides = $all(".hero-slide"), dots = $all(".hero-dot"), idx = 0;
    if (!slides.length) return;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === idx;
        s.classList.toggle("is-active", on);
        if (on) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true");
        $all("a", s).forEach(function (a) { a.tabIndex = on ? 0 : -1; });
      });
      dots.forEach(function (d, i) { if (i === idx) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    }
    function start() { if (!reduced) { stopCarousel(); carouselTimer = setInterval(function () { show(idx + 1); }, 7000); } }
    dots.forEach(function (d) { d.addEventListener("click", function () { show(+d.getAttribute("data-slide")); start(); }); });
    $all(".hero-arrow").forEach(function (b) { b.addEventListener("click", function () { show(idx + (+b.getAttribute("data-dir"))); start(); }); });
    var hero = $(".hero");
    hero.addEventListener("mouseenter", stopCarousel);
    hero.addEventListener("mouseleave", start);
    hero.addEventListener("focusin", stopCarousel);
    show(0); start();
  }
  function stopCarousel() { if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; } }

  function initTabs() {
    var tabs = $all(".tab");
    function select(tab) {
      tabs.forEach(function (x) {
        var on = x === tab;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
      });
      initReveal();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        var next = tabs[(i + d + tabs.length) % tabs.length];
        select(next); next.focus();
      });
    });
  }

  function initFilters() {
    var btns = $all(".filter-btn"), items = $all(".pub-item"), empty = $("#pub-empty");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-filter"), shown = 0;
        btns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        items.forEach(function (it) { var on = !f || it.getAttribute("data-cat") === f; it.hidden = !on; if (on) shown++; });
        empty.hidden = shown > 0;
      });
    });
  }

  function initForm() {
    var form = $("#contact-form"), T = t();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $all("[required]", form).forEach(function (f) {
        var valid = f.value.trim() !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute("aria-invalid", String(!valid));
        f.style.borderColor = valid ? "" : "#C0392B";
        if (!valid && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;
      var d = function (n) { return form.elements[n].value.trim(); };
      var body = [
        T.fName + ": " + d("name"),
        T.fOrg + ": " + d("org"),
        "Email: " + d("email"),
        T.fPhone + ": " + d("phone"),
        T.fService + ": " + d("service"),
        "",
        d("message")
      ].join("\n");
      location.href = "mailto:info@celinkasurvey.com?subject=" + encodeURIComponent(T.formSubject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- Menu móvel ---------- */
  function openNav() {
    $("#main-nav").classList.add("is-open"); $("#nav-backdrop").classList.add("is-open"); $("#site-header").classList.add("nav-open");
    $("#menu-toggle").setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    $("#main-nav").classList.remove("is-open"); $("#nav-backdrop").classList.remove("is-open"); $("#site-header").classList.remove("nav-open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function isMobileNav() { return window.matchMedia("(max-width: 1260px)").matches; }

  /* ---------- Pesquisa ---------- */
  function searchIndex() {
    var T = t(), idx = [];
    T.services.forEach(function (s, i) { idx.push({ k: T.nav[1], title: s.h, text: s.d + " " + s.tags.join(" "), route: "what/" + SERVICE_IDS[i] }); });
    T.projects.forEach(function (p) { idx.push({ k: T.nav[4], title: p.title, text: p.body + " " + p.tag + " " + p.client, route: "library" }); });
    T.news.forEach(function (n) { idx.push({ k: T.newsKicker, title: n.title, text: n.body + " " + n.tag, route: "home/latest" }); });
    T.jobs.forEach(function (j) { idx.push({ k: T.nav[5], title: j.h, text: j.meta + " " + j.tags.join(" "), route: "careers" }); });
    T.stories.forEach(function (s) { idx.push({ k: T.nav[2], title: s.h, text: s.d + " " + s.tag, route: "where" }); });
    return idx;
  }
  function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function runSearch(q) {
    var T = t(), box = $("#search-results");
    q = norm(q.trim());
    if (q.length < 2) { box.innerHTML = '<p class="search-empty">' + T.searchHint + "</p>"; return; }
    var hits = searchIndex().filter(function (it) { return norm(it.title + " " + it.text).indexOf(q) >= 0; }).slice(0, 12);
    box.innerHTML = hits.length ? hits.map(function (h) {
      return '<a href="' + href(h.route) + '"><small>' + esc(h.k) + "</small><strong>" + esc(h.title) + "</strong></a>";
    }).join("") : '<p class="search-empty">' + T.searchEmpty + "</p>";
  }
  function openSearch() {
    $("#search-overlay").classList.add("is-open");
    var input = $("#search-input"); input.value = ""; runSearch(""); input.focus();
  }
  function closeSearch() { $("#search-overlay").classList.remove("is-open"); $("#search-open").focus(); }

  /* ---------- Eventos globais ---------- */
  function bindGlobal() {
    $all(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-lang");
        if (l === state.lang) return;
        state.lang = l; saveLang(l);
        applyStaticI18n(); renderFooter(); draw(false);
      });
    });

    $("#menu-toggle").addEventListener("click", openNav);
    $("#nav-close").addEventListener("click", closeNav);
    $("#nav-backdrop").addEventListener("click", closeNav);
    $("#nav-list").addEventListener("click", function (e) {
      var link = e.target.closest("[data-has-children]");
      if (link && isMobileNav()) {
        var item = link.parentNode;
        if (!item.classList.contains("is-expanded")) { e.preventDefault(); item.classList.add("is-expanded"); }
      }
    });

    $("#search-open").addEventListener("click", openSearch);
    $("#search-close").addEventListener("click", closeSearch);
    $("#search-input").addEventListener("input", function (e) { runSearch(e.target.value); });
    $("#search-overlay").addEventListener("click", function (e) {
      if (e.target.id === "search-overlay") closeSearch();
      if (e.target.closest("a")) $("#search-overlay").classList.remove("is-open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if ($("#search-overlay").classList.contains("is-open")) closeSearch();
      else closeNav();
    });

    var header = $("#site-header"), toTop = $("#back-to-top");
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 10);
      toTop.classList.toggle("is-visible", y > 600);
    }, { passive: true });
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    window.addEventListener("hashchange", onRoute);
  }

  /* ---------- Arranque ---------- */
  applyStaticI18n();
  renderFooter();
  bindGlobal();
  var r = parseHash(); state.page = r.page; state.anchor = r.anchor;
  draw(false);
})();
