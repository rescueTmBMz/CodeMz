/* Celinka Survey — interacções do site (página única). */
(function () {
  "use strict";

  /* ── EmailJS ─────────────────────────────────────────────────
     Preencha com as chaves da sua conta EmailJS para enviar o
     formulário directamente. Se ficarem vazias, o formulário abre
     o programa de email do visitante com a mensagem preenchida. */
  var EMAILJS_CONFIG = {
    publicKey: "",
    serviceId: "",
    templateId: ""
  };
  var CONTACT_EMAIL = "info@celinkasurvey.com";

  /* ── Ícones ─────────────────────────────────────────────────── */
  function svg(body, fill) {
    return '<svg viewBox="0 0 24 24" ' + (fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"') + ' aria-hidden="true">' + body + "</svg>";
  }
  var ICONS = {
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    left: svg('<path d="m15 18-6-6 6-6"/>'),
    right: svg('<path d="m9 18 6-6-6-6"/>'),
    up: svg('<path d="m18 15-6-6-6 6"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    menu: svg('<path d="M3 6h18M3 12h18M3 18h18"/>'),
    check: svg('<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>'),
    quote: svg('<path d="M9.5 6C6.5 7.3 4.5 10 4.5 13.5V18h6v-6H7.6c.3-2 1.6-3.6 3.4-4.4L9.5 6zm9 0c-3 1.3-5 4-5 7.5V18h6v-6h-2.9c.3-2 1.6-3.6 3.4-4.4L18.5 6z"/>', true),
    pin: svg('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    globe: svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>'),
    gps: svg('<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    camera: svg('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'),
    audio: svg('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8"/>'),
    pulse: svg('<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'),
    chart: svg('<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/>'),
    bars: svg('<path d="M18 20V10M12 20V4M6 20v-6"/>'),
    map: svg('<path d="m1 6 7-3 8 3 7-3v15l-7 3-8-3-7 3z"/><path d="M8 3v15M16 6v15"/>'),
    mobile: svg('<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'),
    micro: svg('<path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2zM12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>'),
    chat: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    cloud: svg('<path d="M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'),
    antenna: svg('<path d="M4.9 19.1a10 10 0 0 1 0-14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M19.1 4.9a10 10 0 0 1 0 14.2"/><circle cx="12" cy="12" r="2"/>')
  };

  /* ── Traduções (EN). O português é o texto original do HTML. ── */
  var EN = {
    skip: "Skip to content",
    hero_badge: "Maputo, Mozambique · Since 2021",
    nav_sobre: "About Us", nav_quem: "Who We Are", nav_tecnologia: "Technology and Quality", nav_parceiros: "Partners",
    nav_historias: "Success Stories", nav_servicos: "Services", nav_campo: "In the Field", nav_portfolio: "Portfolio",
    nav_noticias: "News", nav_carreiras: "Careers", nav_contacto: "Contact Us",
    hero_h1: "Data and solutions for <em>sustainable development</em>",
    hero_sub: "Specialists in statistical research, monitoring and impact evaluation with nationwide coverage. Rigorous evidence that guides public policy in Mozambique.",
    hero_btn1: "Explore Services", hero_btn2: "See Field Work",
    hero_s1: "Interviews completed", hero_s2: "Certified enumerators", hero_s3: "Provinces covered", hero_s4: "Response rate",
    sobre_badge: "Founded in<br>Maputo",
    sobre_label: "About Us",
    sobre_h2: "A leading <em>Mozambican</em> firm in data and research",
    sobre_lead: "Founded in Maputo in 2021, Celinka Survey was created to turn data into evidence that drives strategic decisions for sustainable development.",
    sobre_p1: "We specialise in statistical studies, impact evaluations and the monitoring of health and socio-economic programmes. Our mission is to deliver rigorous, data-driven evidence that improves the effectiveness of social interventions across the country.",
    sobre_p2: "Our team combines international experience with deep knowledge of the local context and of the languages of the communities where we work.",
    val1_t: "Methodological Rigour", val1_d: "The highest scientific standards in every study",
    val2_t: "CAPI Innovation", val2_d: "Latest-generation technology in the field",
    val3_t: "Full Transparency", val3_d: "Internal and external audit on every project",
    val4_t: "Local Inclusion", val4_d: "Multilingual in the languages of the communities",
    sobre_btn: "See Our Services",
    svc_label: "What We Do",
    svc_h2: "<em>Specialist</em> services at every stage",
    svc_lead: "From design to final report, we deliver integrated research solutions with methodological rigour and leading-edge technology.",
    svc_cta: "Request a proposal",
    svc1_h: "Monitoring and Evaluation (M&E)",
    svc1_p: "We build solid evidence for strategic decision-making: indicators, monitoring frameworks, baseline assessments and impact studies that support the best programme decisions.",
    svc2_h: "Large-Scale Data Collection (CAPI)",
    svc2_p: "Coverage across all 11 provinces with over 600 certified, multilingual enumerators. We use advanced computer-assisted digital platforms to guarantee accurate, real-time data.",
    svc3_h: "Health Research and Socio-Economic Studies",
    svc3_p: "Specialists in demographic surveys, public health, malaria, immunisation and financial inclusion. We apply advanced methods such as LQAS, longitudinal studies and high-performance statistical analysis.",
    svc4_h: "Information Systems and Analysis",
    svc4_p: "We modernise institutional data management with custom solutions: advanced statistical analysis, geographic information systems, online databases and real-time dashboards.",
    tag_ind: "Indicators", tag_lb: "Baseline", tag_nac: "Nationwide", tag_mal: "Malaria", tag_sp: "Public Health", tag_est: "Statistics", tag_qual: "Qualitative",
    q1_h: "24/7 Monitoring", q1_p: "Cloud data integrity with constant availability and automatic alert systems.",
    q2_h: "Rigorous Verification", q2_p: "High frequency checks, audio audit, GPS geo-referencing and verification photos on every interview.",
    q3_h: "Specialist Helpdesk", q3_p: "Continuous technical support from the field enumerator to the national coordinator.",
    campo_label: "Field Work",
    campo_h2: "From the remote village to <em>advanced analysis</em>",
    campo_lead: "Our teams reach wherever they are needed — by canoe, on foot or by motorbike — so that every voice is recorded with rigour and respect.",
    g1: "Certified enumerator team", g2: "CAPI interview with digital technology", g3: "Focus group in a rural community",
    g4: "Reaching riverine communities", g5: "Field team training", g6: "River access to remote areas",
    g7: "Surveys in coastal areas", g8: "Digital data collection", g9: "Hard-to-reach areas",
    g10: "Household interview", g11: "Training and capacity building", g12: "Real-time data analysis",
    port_label: "Portfolio",
    port_h2: "Experience that <em>creates real impact</em>",
    port_lead: "A solid track record delivering complex projects and precise data that informs public policy and humanitarian response.",
    stat1_l: "Interviews completed", stat2_l: "Strategic projects 2023–2025", stat3_l: "Average response rate", stat4_l: "Provinces covered simultaneously",
    pa_fin: "Financial Inclusion", pa_mal: "Public Health · Malaria", pa_dhis: "DHIS2 Digitalisation", pa_gov: "Governance · Citizenship", pa_com: "Community Development",
    client: "Client", harvard: "Harvard University", pnud: "UNDP", fjc: "Joaquim Chissano Foundation",
    p1_h: "FinScope MSME Survey", p1_p: "4,121 interviews assessing access to financial services among micro, small and medium enterprises in Mozambique.",
    p2_h: "SMC Evaluation, Niassa", p2_p: "Digitalisation of the Seasonal Malaria Chemoprevention campaign, with 22,028 interviews recorded in Niassa.",
    p3_h: "Treated Net Coverage", p3_p: "Survey of the Universal Coverage Campaign in Zambézia and Sofala, covering over 3,100 households.",
    p4_h: "Digital Tools Performance", p4_p: "Qualitative study on digital tools in net distribution in Gaza and Inhambane. Funded by CHAI.",
    p5_h: "Citizen Satisfaction Index", p5_p: "7,000 households nationwide measuring satisfaction with public services and perceptions of corruption.",
    p6_h: "COESO II Final Evaluation", p6_p: "Impact study on community development and social resilience in Mozambican communities.",
    parc_label: "Partners & References",
    parc_h2: "Trusted by global and national <em>leaders</em>",
    tab_all: "All", tab_intl: "International", tab_nat: "National",
    misau: "Ministry of Health (MISAU)", maefp: "Ministry of State Administration and Civil Service (MAEFP)", pncm: "National Malaria Control Programme (PNCM)",
    test_h3: "What our partners say",
    test_p: "Feedback from organisations that trusted Celinka Survey with their most critical projects.",
    t1: "Celinka Survey demonstrated exceptional operational capacity in implementing the mosquito net coverage survey. Data quality and a 97% response rate exceeded all expectations and were decisive for our programme decisions.",
    t1_n: "Programme Manager", t1_r: "MISAU / National Malaria Control Programme",
    t2: "The citizen satisfaction survey of 7,000 households nationwide was executed with remarkable methodological rigour and logistical efficiency. Celinka Survey is a trusted partner for large-scale evaluations.",
    t2_n: "Cooperation Officer", t2_r: "UNDP Mozambique",
    t3: "What sets Celinka Survey apart is the ability to reach hard-to-access communities with trained teams while maintaining the highest quality standards. Geo-referencing and audio audits give full confidence in the results.",
    t3_r: "Harvard University — ADPP Mozambique",
    t4: "The FinScope MSME survey showed a highly professional team, able to mobilise rapidly across several provinces at once. We strongly recommend Celinka Survey.",
    t4_n: "Programmes Director",
    tech_label: "Technology",
    tech_h2: "Technology that <em>guarantees</em> every data point",
    tech_p1: "What sets us apart is the combination of massive operational reach with rigorous, technology-driven quality control, operating in real time from the field to the final report.",
    tech_p2: "Every interview is monitored, verified and validated before it enters the final database. We do not accept data without full traceability.",
    tf1_t: "GPS Geo-referencing", tf1_d: "GPS coordinates on every interview to verify the exact location and detect geographic anomalies.",
    tf2_t: "Verification Photos", tf2_d: "Automatic household photographs confirm the authenticity of every interview conducted.",
    tf3_t: "Audio Audit", tf3_d: "Random recordings reviewed by supervisors to guarantee the quality of the collection process.",
    tf4_d: "Automated real-time validations flag inconsistencies and outliers on the same field day.",
    sw1_n: "Statistical Analysis", sw1_d: "High-performance professional software",
    sw2_d: "Advanced quantitative analysis", sw3_d: "Spatial analysis and mapping",
    sw4_n: "Digital Collection", sw4_d: "Latest-generation CAPI platforms",
    sw5_n: "Epidemiology", sw5_d: "Health data analysis",
    sw6_n: "Qualitative", sw6_d: "Qualitative data analysis",
    sw7_d: "Integration and storage", sw8_d: "Open data kit tools",
    news_label: "News & Updates", news_h2: "Latest <em>updates</em>", news_all: "Get in touch", read_more: "Read more",
    n1_d: "March 2025", n1_h: "Celinka Survey completes the largest malaria survey in Niassa with 22,028 interviews",
    n1_p: "In partnership with Harvard University and ADPP, we completed the largest data collection operation on the SMC campaign in Niassa.",
    n2_d: "February 2025", n2_h: "FinScope MSME 2025: financial inclusion data delivered to FSDMoç",
    n2_p: "The FinScope MSME survey, with 4,121 interviews nationwide, maps access to financial services among Mozambican SMEs.",
    n3_c: "Capacity Building", n3_d: "October 2024", n3_h: "Celinka Survey trains a new cohort of enumerators for 2025 projects",
    n3_p: "A new cohort of certified enumerators completed training, strengthening national operational capacity for 2025.",
    hist_label: "Success Stories", hist_h2: "Real impact, <em>real provinces</em>",
    s1_tag: "River Access · Zambézia", s1_h: "Reaching where others do not",
    s1_p: "In 2024 our team crossed rivers by canoe to reach isolated riverine communities in Zambézia, completing 100% of the planned sample.",
    s1_m: "3,100+ households interviewed",
    s2_tag: "Qualitative Research · Interior", s2_h: "Voices from rural communities",
    s2_p: "Our enumerators, fluent in local languages, ran focus groups in rural communities, capturing unique perspectives on health programmes.",
    s2_m: "97% response rate",
    s3_tag: "Data Analysis · Maputo", s3_h: "Data that guides national policy",
    s3_p: "The Citizen Satisfaction Index (2023), covering 7,000 households, gave MAEFP critical evidence for the reform of public services.",
    s3_prov: "11 Provinces", s3_m: "7,000 households · UNDP",
    carr_badge: "Professionals<br>in our network",
    carr_label: "Work With Us", carr_h2: "Join a team with <em>impact</em>",
    carr_lead: "We look for professionals committed to turning data into evidence that improves lives in Mozambique.",
    j1_h: "Field Supervisor", j1_m: "Zambézia · Short-term project",
    j2_h: "Field Enumerator — CAPI", j2_m: "Nampula, Niassa, Cabo Delgado · Project-based",
    j3_h: "Senior Data Analyst", j3_m: "Maputo · Full-time or Consultancy",
    j4_h: "Open Application", j4_m: "All provinces · Various areas",
    tg_sup: "Supervision", tg_campo: "Field", tg_norte: "North", tg_sen: "Senior", tg_geral: "General", tg_aberta: "Open",
    carr_btn: "Send Application", carr_sub: "or send your CV to info@celinkasurvey.com",
    cta_h: "Need reliable data to make better decisions?",
    cta_p: "Talk to our team about your next study, evaluation or data collection operation.",
    cont_label: "Contact", cont_h2: "Ready to <em>work</em> with us?", cont_lead: "Our team replies within 24 working hours.",
    cont_info_h: "Get in Touch", cont_info_p: "Headquartered in Maputo, with immediate deployment capacity nationwide.",
    c_sede: "Head Office", c_tel: "Telephone",
    cont_form_h: "Send Us a Message",
    form_nome: "Full Name", form_org: "Organisation", form_svc: "Type of Service", form_msg: "Message",
    form_ph_nome: "Your name", form_ph_org: "Organisation name", form_ph_msg: "Describe your project, objectives and estimated timeline...",
    opt0: "Select a service...", opt1: "Monitoring and Evaluation (M&E)", opt2: "CAPI Data Collection", opt3: "Health / Socio-Economic Research",
    opt4: "Information Systems and Analysis", opt5: "Impact Evaluation / Baseline", opt6: "Application — Work With Us", opt7: "Other / General Information",
    cont_send: "Send Message",
    footer_p: "Data and Solutions for Sustainable Development. Rigorous statistical research, monitoring and impact evaluation in Mozambique since 2021.",
    chip1: "97% Response Rate", chip3: "+40k Interviews",
    f_nav: "Navigation", f_cont: "Contacts",
    f_s1: "Monitoring and Evaluation", f_s2: "CAPI Data Collection", f_s3: "Health Research", f_s4: "Information Systems", f_s5: "GPS/Audio Technology",
    footer_note: "Proudly Mozambican"
  };

  /* Mensagens geradas pelo script */
  var MSG = {
    pt: { required: "Preencha o nome, um email válido e a mensagem.", sending: "A enviar…", sent: "Mensagem enviada. Obrigado — respondemos em até 24 horas úteis.",
      failed: "Não foi possível enviar. A abrir o seu programa de email…", mailto: "A abrir o seu programa de email com a mensagem preenchida…",
      subject: "Pedido de contacto — site Celinka Survey", slide: "Imagem" },
    en: { required: "Please fill in your name, a valid email and your message.", sending: "Sending…", sent: "Message sent. Thank you — we reply within 24 working hours.",
      failed: "Could not send. Opening your email app…", mailto: "Opening your email app with the message pre-filled…",
      subject: "Contact request — Celinka Survey website", slide: "Image" }
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ── Ícones ─────────────────────────────────────────────────── */
  $all("[data-icon]").forEach(function (el) { var i = ICONS[el.getAttribute("data-icon")]; if (i) el.innerHTML = i; });
  var yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Idioma ─────────────────────────────────────────────────── */
  var PT = {};
  $all("[data-i18n]").forEach(function (el) { PT[el.getAttribute("data-i18n")] = el.textContent; });
  $all("[data-i18n-html]").forEach(function (el) { PT[el.getAttribute("data-i18n-html")] = el.innerHTML; });
  $all("[data-i18n-ph]").forEach(function (el) { PT[el.getAttribute("data-i18n-ph")] = el.placeholder; });

  var lang = "pt";
  function setLanguage(l) {
    lang = l === "en" ? "en" : "pt";
    var dict = lang === "en" ? EN : PT;
    function val(k) { return dict[k] != null ? dict[k] : PT[k]; }
    $all("[data-i18n]").forEach(function (el) { el.textContent = val(el.getAttribute("data-i18n")); });
    $all("[data-i18n-html]").forEach(function (el) { el.innerHTML = val(el.getAttribute("data-i18n-html")); });
    $all("[data-i18n-ph]").forEach(function (el) { el.placeholder = val(el.getAttribute("data-i18n-ph")); });
    document.documentElement.lang = lang;
    $all(".lang-switch button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    try { localStorage.setItem("celinka-lang", lang); } catch (e) {}
  }
  window.setLanguage = setLanguage;
  $all(".lang-switch button").forEach(function (b) { b.addEventListener("click", function () { setLanguage(b.getAttribute("data-lang")); }); });
  try { if (localStorage.getItem("celinka-lang") === "en") setLanguage("en"); } catch (e) {}

  /* ── Cabeçalho, menu móvel, voltar ao topo ─────────────────── */
  var header = $("#site-header"), nav = $("#main-nav"), backdrop = $("#nav-backdrop"), toggle = $("#menu-toggle"), toTop = $("#back-to-top");
  function isMobileNav() { return window.matchMedia("(max-width: 1260px)").matches; }
  function openNav() {
    nav.classList.add("is-open"); backdrop.classList.add("is-open"); header.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden";
  }
  function closeNav() {
    nav.classList.remove("is-open"); backdrop.classList.remove("is-open"); header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
    $all(".nav-item.is-expanded").forEach(function (i) { i.classList.remove("is-expanded"); });
  }
  window.toggleMenu = function () { if (nav.classList.contains("is-open")) closeNav(); else openNav(); };
  toggle.addEventListener("click", openNav);
  $("#nav-close").addEventListener("click", closeNav);
  backdrop.addEventListener("click", closeNav);
  nav.addEventListener("click", function (e) {
    var parent = e.target.closest("[data-has-children]");
    if (parent && isMobileNav()) {
      var item = parent.parentNode;
      if (!item.classList.contains("is-expanded")) { e.preventDefault(); item.classList.add("is-expanded"); return; }
    }
    if (e.target.closest("a")) closeNav();
  });

  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 10);
    toTop.classList.toggle("is-visible", y > 600);
  }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* Destaca no menu a secção visível */
  var navLinks = $all(".nav-list > .nav-item > .nav-link");
  var sectionToLink = {
    sobre: "#sobre", parceiros: "#sobre", tecnologia: "#sobre", historias: "#sobre",
    servicos: "#servicos", campo: "#campo", portfolio: "#portfolio", noticias: "#noticias", carreiras: "#carreiras"
  };
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var target = sectionToLink[en.target.id];
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === target); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $all("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ── Animação ao entrar no ecrã ─────────────────────────────── */
  var reveals = $all(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 });
    reveals.forEach(function (e) { ro.observe(e); });
  } else {
    reveals.forEach(function (e) { e.classList.add("is-in"); });
  }

  /* ── Hero: imagens rotativas ────────────────────────────────── */
  var slides = $all(".hero-slide"), dotsWrap = $("#hero-dots"), slideIdx = 0, slideTimer = null;
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  slides.forEach(function (s, i) {
    var d = document.createElement("button");
    d.type = "button"; d.className = "hero-dot";
    d.setAttribute("aria-label", MSG[lang].slide + " " + (i + 1));
    d.addEventListener("click", function () { goSlide(i); restartSlides(); });
    dotsWrap.appendChild(d);
  });
  var dots = $all(".hero-dot");
  function goSlide(n) {
    slideIdx = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle("is-active", i === slideIdx); });
    dots.forEach(function (d, i) { if (i === slideIdx) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
  }
  window.goSlide = goSlide;
  function stopSlides() { if (slideTimer) { clearInterval(slideTimer); slideTimer = null; } }
  function restartSlides() { stopSlides(); if (!reducedMotion) slideTimer = setInterval(function () { goSlide(slideIdx + 1); }, 6000); }
  $all(".hero-arrow").forEach(function (b) { b.addEventListener("click", function () { goSlide(slideIdx + (+b.getAttribute("data-dir"))); restartSlides(); }); });
  var hero = $("#hero");
  hero.addEventListener("focusin", stopSlides);
  hero.addEventListener("focusout", restartSlides);
  goSlide(0); restartSlides();

  /* ── Galeria + lightbox ─────────────────────────────────────── */
  var gallery = $all("#gallery .gallery-item"), lb = $("#lightbox"), lbImg = $("#lightbox-img"), lbCap = $("#lightbox-cap"), lbCount = $("#lb-counter");
  var lbIdx = 0, lbReturn = null;
  function showLight(n) {
    lbIdx = (n + gallery.length) % gallery.length;
    var img = $("img", gallery[lbIdx]);
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = $("figcaption", gallery[lbIdx]).textContent;
    lbCount.textContent = (lbIdx + 1) + " / " + gallery.length;
  }
  function openLightbox(n) {
    lbReturn = document.activeElement;
    showLight(n); lb.classList.add("is-open"); document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  }
  function closeLightbox() {
    lb.classList.remove("is-open"); document.body.style.overflow = "";
    if (lbReturn) lbReturn.focus();
  }
  window.openLightbox = openLightbox; window.closeLightbox = closeLightbox;
  window.prevLight = function () { showLight(lbIdx - 1); };
  window.nextLight = function () { showLight(lbIdx + 1); };
  gallery.forEach(function (g, i) { $("button", g).addEventListener("click", function () { openLightbox(i); }); });
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", window.prevLight);
  $("#lb-next").addEventListener("click", window.nextLight);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });

  document.addEventListener("keydown", function (e) {
    if (lb.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") window.prevLight();
      else if (e.key === "ArrowRight") window.nextLight();
      return;
    }
    if (e.key === "Escape") closeNav();
  });

  /* ── Parceiros: filtro ──────────────────────────────────────── */
  var partnerBtns = $all("[data-partners]"), partners = $all("#partnersGrid .partner");
  function filterPartners(type) {
    partnerBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-partners") === type)); });
    partners.forEach(function (p) { p.hidden = type !== "all" && p.getAttribute("data-type") !== type; });
  }
  window.filterPartners = filterPartners;
  partnerBtns.forEach(function (b) { b.addEventListener("click", function () { filterPartners(b.getAttribute("data-partners")); }); });

  /* ── Testemunhos: carrossel ─────────────────────────────────── */
  var track = $("#testimonialTrack"), tCards = $all("#testimonialTrack .quote-card"), tIdx = 0;
  function perView() { return window.matchMedia("(max-width: 980px)").matches ? 1 : 2; }
  function slideTestimonial(dir) {
    var max = Math.max(0, tCards.length - perView());
    tIdx = Math.min(max, Math.max(0, tIdx + dir));
    if (dir > 0 && tIdx === max && track.dataset.atEnd === "1") tIdx = 0;
    track.dataset.atEnd = tIdx === max ? "1" : "0";
    var step = tCards[0].getBoundingClientRect().width + 24;
    track.style.transform = "translateX(" + (-tIdx * step) + "px)";
  }
  window.slideTestimonial = slideTestimonial;
  $("#t-prev").addEventListener("click", function () { slideTestimonial(-1); });
  $("#t-next").addEventListener("click", function () { slideTestimonial(1); });
  window.addEventListener("resize", function () { tIdx = 0; track.dataset.atEnd = "0"; track.style.transform = ""; });

  /* ── Formulário de contacto ─────────────────────────────────── */
  var form = $("#contact-form"), statusEl = $("#form-status"), submitBtn = $("#contact-submit");
  function setStatus(msg, cls) { statusEl.textContent = msg; statusEl.className = "form-status" + (cls ? " " + cls : ""); }
  function field(name) { return form.elements[name].value.trim(); }
  function openMailto() {
    var labels = lang === "en" ? ["Name", "Organisation", "Email", "Service"] : ["Nome", "Organização", "Email", "Serviço"];
    var body = [labels[0] + ": " + field("nome"), labels[1] + ": " + field("organizacao"), labels[2] + ": " + field("email"),
      labels[3] + ": " + field("servico"), "", field("mensagem")].join("\n");
    location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(MSG[lang].subject) + "&body=" + encodeURIComponent(body);
  }
  function submitForm(e) {
    if (e && e.preventDefault) e.preventDefault();
    var ok = true, first = null;
    $all("[required]", form).forEach(function (f) {
      var v = f.value.trim();
      var valid = v !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      f.setAttribute("aria-invalid", String(!valid));
      f.style.borderColor = valid ? "" : "#B42318";
      if (!valid && !first) first = f;
      ok = ok && valid;
    });
    if (!ok) { setStatus(MSG[lang].required, "err"); first.focus(); return; }

    var canEmailJS = window.emailjs && EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId;
    if (!canEmailJS) { setStatus(MSG[lang].mailto, "ok"); openMailto(); return; }

    submitBtn.disabled = true; setStatus(MSG[lang].sending);
    window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      from_name: field("nome"), organization: field("organizacao"), reply_to: field("email"),
      service: field("servico"), message: field("mensagem")
    }).then(function () {
      setStatus(MSG[lang].sent, "ok"); form.reset();
    }, function () {
      setStatus(MSG[lang].failed, "err"); openMailto();
    }).then(function () { submitBtn.disabled = false; });
  }
  window.submitForm = submitForm;
  if (window.emailjs && EMAILJS_CONFIG.publicKey) window.emailjs.init(EMAILJS_CONFIG.publicKey);
  form.addEventListener("submit", submitForm);
})();
