/* ────────────────────────────────────────────────────────────────────────
   One reusable result-page renderer, powered by the shape's record in
   shapes-data.js. Each page carries <body data-shape="pear">. Lean layout:
   shape summary (what makes it) → short VSL + pitch → a few clothing pieces
   (what to wear vs be careful with) → complete-guide pitch → footer + sticky
   CTA. The full styling breakdown is delivered as the emailed PDF.
   Needs config.js, analytics.js, shapes-data.js loaded first + #result-root.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var cfg = window.RITA_CONFIG || {};
  var key = document.body.getAttribute("data-shape");
  var s = (window.SHAPES || {})[key];
  var root = document.getElementById("result-root");
  if (!root) return;
  document.documentElement.classList.add("js-reveal"); // enables reveal animation; without JS, content stays visible

  // ── graceful invalid-slug handling ──
  if (!s) {
    root.innerHTML = '<section class="wrap" style="text-align:center;padding:12vh 0;">' +
      '<h1 class="result-title" style="font-size:clamp(30px,5vw,44px)">We couldn’t find that result</h1>' +
      '<p class="result-summary">Take the quick shape quiz and we’ll show you yours.</p>' +
      '<p style="margin-top:24px"><a class="btn btn-primary" href="index.html" data-analytics="retake-quiz">Take the shape quiz</a></p></section>';
    return;
  }

  // asset base (works locally and via CDN) — derived from this script's URL
  var ts = document.currentScript || (function () { var x = document.getElementsByTagName("script"); return x[x.length - 1]; })();
  var BASE = (ts && ts.src) ? ts.src.replace(/assets\/result\.js(?:\?.*)?$/, "") : "";
  var checkout = cfg.checkoutUrl || "#";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function silhouette(extra) {
    var dots = extra || "";
    return '<svg viewBox="0 0 120 200" fill="none" aria-hidden="true" style="width:100%;height:auto;display:block">' +
      '<circle cx="60" cy="26" r="13" fill="currentColor"/><path d="' + s.path + '" fill="currentColor"/>' + dots + '</svg>';
  }
  // Minimal garment line-art, keyed by clothing category. Used as a finished-
  // looking illustration placeholder until a real asset is supplied.
  var GARMENT_ART = {
    necklines:
      '<path d="M31 47 C38 40 44 38 50 38 C56 38 62 40 69 47 L69 104 L31 104 Z"/>' +
      '<path d="M40 40 C44 51 56 51 60 40"/>' +
      '<path d="M31 47 L21 55 L27 67"/><path d="M69 47 L79 55 L73 67"/>',
    trousers:
      '<path d="M33 30 L67 30 L65 104 L53 104 L50 60 L47 104 L35 104 Z"/>' +
      '<path d="M33 39 L67 39"/>',
    jackets:
      '<path d="M30 43 L40 34 L60 34 L70 43 L72 104 L28 104 Z"/>' +
      '<path d="M40 34 L48 62 L50 44 L52 62 L60 34"/>' +
      '<path d="M48 62 L47 104"/><path d="M52 62 L53 104"/>',
    shirts:
      '<path d="M31 45 C38 38 44 37 50 37 C56 37 62 38 69 45 L69 104 L31 104 Z"/>' +
      '<path d="M44 40 L50 47 L56 40"/><path d="M50 47 L50 104"/>' +
      '<path d="M31 45 L22 53 L26 79"/><path d="M69 45 L78 53 L74 79"/>',
    dresses:
      '<path d="M41 37 C45 34 55 34 59 37 L56 60 L74 104 L26 104 L44 60 Z"/>' +
      '<path d="M45 37 C48 42 52 42 55 37"/><path d="M44 60 L56 60"/>'
  };

  // Finished-looking editorial illustration. Until a real asset is dropped in
  // (add `image:` to the item in shapes-data.js), it shows a soft garment
  // line-art for the category; the asset then loads over it — no code change.
  function editorialImage(realSrc, alt, catId, ratio) {
    var img = realSrc ? '<img alt="' + esc(alt) + '" data-src="' + esc(realSrc) + '" loading="lazy" />' : "";
    return '<figure class="ed-img" style="aspect-ratio:' + ratio + '">' +
      '<span class="ed-ph"><svg class="ed-art" viewBox="0 0 100 125" fill="none" aria-hidden="true">' +
        (GARMENT_ART[catId] || GARMENT_ART.necklines) + '</svg></span>' +
      img +
    '</figure>';
  }

  var tick = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

  // The clothing pieces shown on the lean result page (each = one to wear +
  // one to be careful with). The rest lives in the emailed guide.
  var PIECES = [
    { id: "necklines", title: "Necklines" },
    { id: "trousers", title: "Trousers" },
    { id: "dresses", title: "Dresses" }
  ];

  // ── build sections ──
  // 1) Body-shape summary + what makes it that shape
  function summarySection() {
    var chars = s.characteristics.map(function (c) {
      return '<li>' + tick + '<span>' + esc(c) + '</span></li>';
    }).join("");
    return '<header class="wrap rs-summary reveal">' +
      '<div class="rs-summary-copy">' +
        '<span class="result-eyebrow">Your body-shape result</span>' +
        '<h1 class="result-title">You’re ' + s.article + ' <span class="accent">' + esc(s.name) + '</span></h1>' +
        '<p class="result-summary">' + esc(s.heroSummary) + '</p>' +
        '<div class="rs-what">' +
          '<h2 class="rs-what-h">What makes you ' + s.article + ' ' + esc(s.name) + '</h2>' +
          '<ul class="rs-char">' + chars + '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="rs-figure">' +
        '<span class="result-badge"><span class="rb-label">Your shape</span><span class="rb-name">' + esc(s.name) + '</span></span>' +
        '<div class="figure-sil">' + silhouette() + '</div>' +
      '</div>' +
    '</header>';
  }

  // Embed the VSL if a URL is set (YouTube / Vimeo / .mp4); else a poster slot.
  function videoEmbed() {
    var url = (s.videoUrl || cfg.vslUrl || "").trim();
    if (url) {
      var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
      if (yt) return '<iframe src="https://www.youtube.com/embed/' + yt[1] + '" title="Style video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
      var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (vm) return '<iframe src="https://player.vimeo.com/video/' + vm[1] + '" title="Style video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
      return '<video controls preload="metadata" playsinline src="' + esc(url) + '"></video>';
    }
    return '<div class="vsl-ph"><span class="vsl-play"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>' +
      '<span class="vsl-ph-t">Your ' + esc(s.name) + ' style video</span>' +
      '<span class="vsl-ph-s">Coming soon</span></div>';
  }

  // 2) Short VSL + pitch
  function vslSection() {
    return '<section class="wrap rs-vsl reveal">' +
      '<span class="kicker">Watch this first</span>' +
      '<h2 class="section-h">Your quick ' + esc(s.name) + ' styling breakdown</h2>' +
      '<p class="section-lead">A short walk-through of how to dress your shape — and exactly what your complete guide covers.</p>' +
      '<div class="vsl-frame">' + videoEmbed() + '</div>' +
    '</section>';
  }

  // 3) One clothing piece = what to wear + what to be careful with
  function pieceCard(kind, catId, item) {
    var realSrc = item.image ? (BASE + item.image) : "";
    var alt = (kind === "wear" ? "Recommended " : "To be careful with: ") + item.name.toLowerCase() + " for " + s.article + " " + s.name.toLowerCase();
    var flag = kind === "wear" ? "Wear this" : "Be careful with";
    return '<article class="rs-card rs-' + kind + '">' +
      editorialImage(realSrc, alt, catId, "4 / 5") +
      '<div class="rs-card-body"><span class="rs-flag rs-flag-' + kind + '">' + flag + '</span>' +
      '<h4 class="rs-card-name">' + esc(item.name) + '</h4>' +
      '<p class="rs-card-expl">' + esc(item.explanation) + '</p></div>' +
    '</article>';
  }
  function piecesSection() {
    var secs = PIECES.map(function (p) {
      var wear = s.wear && s.wear[p.id];
      var avoid = s.avoid[p.id] && s.avoid[p.id][0];
      if (!wear || !avoid) return "";
      return '<section class="wrap rs-piece reveal">' +
        '<h2 class="rs-piece-h">' + esc(p.title) + '</h2>' +
        '<div class="rs-piece-grid">' + pieceCard("wear", p.id, wear) + pieceCard("avoid", p.id, avoid) + '</div>' +
      '</section>';
    }).join("");
    return '<section class="wrap rs-pieces-intro reveal">' +
      '<span class="kicker">What to wear for your shape</span>' +
      '<h2 class="section-h">A few pieces to start with</h2>' +
      '<p class="section-lead">For each one: what tends to flatter your ' + esc(s.name.toLowerCase()) + ' shape, and what to approach with care. Your emailed guide covers every category in full.</p>' +
    '</section>' + secs;
  }

  // 4) Pitch the complete guide (PDF arrives by email)
  function pitchSection() {
    return '<section class="wrap reveal"><div class="final-cta">' +
      '<span class="kicker on-accent" style="margin-bottom:12px">Your complete guide</span>' +
      '<h2>Everything for your ' + esc(s.name) + ' shape, in one place</h2>' +
      '<p>Dozens of recommendations across necklines, sleeves, tops, jackets, coats, trousers, jeans, skirts, shorts and dresses — what to choose, what to skip, and the reason behind each, built for your ' + esc(s.name.toLowerCase()) + ' proportions.</p>' +
      '<a class="btn btn-buy" href="' + esc(checkout) + '" data-analytics="final-guide-cta" data-cta="final">Get my complete guide — $47</a>' +
      '<p class="final-cta-note">Your starter guide is on its way to your inbox.</p>' +
    '</div></section>';
  }

  function footerSection() {
    return '<footer class="wrap result-foot">' +
      '<div class="name">Rita Rouhana</div><div class="sub">Image &amp; Style</div>' +
      '<a class="retake" href="index.html" data-analytics="retake-quiz">← Retake the quiz</a>' +
    '</footer>';
  }

  function stickyCta() {
    return '<div class="sticky-cta" id="sticky-cta" hidden>' +
      '<span class="sticky-label">Your ' + esc(s.name) + ' guide</span>' +
      '<a class="btn btn-primary" href="' + esc(checkout) + '" data-analytics="sticky-mobile-guide-cta" data-cta="sticky">Get the full guide</a>' +
    '</div>';
  }

  root.innerHTML =
    summarySection() + vslSection() + piecesSection() + pitchSection() + footerSection() + stickyCta();

  // page title (one h1 already in the summary)
  try { document.title = "You’re " + s.article + " " + s.name + " — Dressing for Your Shape | Rita Rouhana"; } catch (e) {}

  // ── analytics ──
  if (window.ritaTrack) window.ritaTrack("result_page_viewed", { shape: key });
  root.querySelectorAll("[data-cta]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (window.ritaTrack) window.ritaTrack("guide_cta_clicked", { shape: key, cta_location: el.getAttribute("data-cta") });
      if (!cfg.checkoutUrl || cfg.checkoutUrl === "#") { /* no destination yet */ }
    });
  });
  document.querySelectorAll('[data-analytics="retake-quiz"]').forEach(function (el) {
    el.addEventListener("click", function () { if (window.ritaTrack) window.ritaTrack("retake_quiz_clicked", { shape: key }); });
  });
  root.querySelectorAll("a[data-cta]").forEach(function (el) {
    if (!cfg.checkoutUrl || cfg.checkoutUrl === "#") el.addEventListener("click", function (e) { e.preventDefault(); });
  });

  // ── editorial images: load real asset if present, else keep placeholder ──
  root.querySelectorAll(".ed-img img").forEach(function (img) {
    var src = img.getAttribute("data-src");
    if (!src) return;
    img.addEventListener("load", function () {
      img.classList.add("on");
      var ph = img.parentNode.querySelector(".ed-ph");
      if (ph) ph.style.display = "none";
    });
    img.addEventListener("error", function () { img.remove(); });
    img.src = src;
  });

  // ── reduced-motion-aware reveals ──
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    root.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    root.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  // ── sticky mobile CTA: appears past the hero, hides over the final CTA ──
  var sticky = document.getElementById("sticky-cta");
  var hero = root.querySelector(".rs-summary");
  var finalCta = root.querySelector(".final-cta");
  var footer = root.querySelector(".result-foot");
  if (sticky && hero && finalCta && "IntersectionObserver" in window) {
    var pastHero = false, finalVis = false, footVis = false;
    function update() { sticky.hidden = !(pastHero && !finalVis && !footVis); }
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; update(); }, { rootMargin: "-40% 0px 0px 0px" }).observe(hero);
    new IntersectionObserver(function (e) { finalVis = e[0].isIntersecting; update(); }).observe(finalCta);
    if (footer) new IntersectionObserver(function (e) { footVis = e[0].isIntersecting; update(); }).observe(footer);
  }
})();
