/* ────────────────────────────────────────────────────────────────────────
   One reusable result-page renderer, powered by the shape's record in
   shapes-data.js. Each page carries <body data-shape="pear">. Sections follow
   the brief: hero → characteristics → annotated figure → styling goal →
   what to avoid (5 categories) → guide transition → guide contents →
   transformation → final CTA → sticky mobile CTA → footer.
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

  // ── shared, shape-agnostic content ──
  var CAT_ORDER = ["necklines", "trousers", "jackets", "shirts", "dresses"];
  var CAT_TITLE = { necklines: "Necklines", trousers: "Trousers", jackets: "Jackets", shirts: "Shirts", dresses: "Dresses" };
  var CAT_INTRO = {
    necklines: "The wrong neckline can add width, close off the upper body or pull attention away from the areas you want to emphasise.",
    trousers: "Trouser shape, rise and pocket placement can change how the waist, hips and legs appear in relation to one another.",
    jackets: "A jacket’s length, shoulder structure and waist placement can either support your proportions or interrupt them.",
    shirts: "The cut and volume of a shirt determine whether your waist and upper body stay defined or become visually lost.",
    dresses: "Dresses affect the whole silhouette at once, which makes waist placement, volume and overall shape especially important."
  };
  var GUIDE_GROUPS = [
    { title: "Tops & upper body", items: ["4 additional necklines", "4 sleeve styles", "4 additional shirts", "1 knitwear recommendation"] },
    { title: "Layers", items: ["4 additional jackets", "5 coat styles"] },
    { title: "Bottoms", items: ["4 additional trousers", "4 jeans styles — includes what to avoid", "5 shorts styles — includes what to avoid", "5 skirt styles — includes what to avoid"] },
    { title: "Dresses", items: ["4 additional dress styles"] }
  ];
  var TRANSFORM = [
    "Understand why a piece works before you buy it",
    "Shop with a clearer plan",
    "Build outfits around your natural proportions",
    "Stop relying on generic fashion rules"
  ];

  var tick = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

  // ── build sections ──
  function heroSection() {
    return '<header class="wrap result-hero2 reveal">' +
      '<div class="result-hero2-copy">' +
        '<span class="result-eyebrow">Your personal body-shape result</span>' +
        '<h1 class="result-title">You’re ' + s.article + ' <span class="accent">' + esc(s.name) + '</span></h1>' +
        '<p class="result-summary">' + esc(s.heroSummary) + '</p>' +
        '<p class="result-microcopy">Your result is based on the proportions you selected in the quiz.</p>' +
      '</div>' +
      '<div class="result-hero2-figure">' +
        '<span class="result-badge"><span class="rb-label">Your shape</span><span class="rb-name">' + esc(s.name) + '</span></span>' +
        '<div class="figure-sil">' + silhouette() + '</div>' +
      '</div>' +
    '</header>';
  }

  function characteristicsSection() {
    var items = s.characteristics.map(function (c, i) {
      return '<li class="char"><span class="char-n">' + ("0" + (i + 1)) + '</span><span class="char-t">' + esc(c) + '</span></li>';
    }).join("");
    return '<section class="wrap reveal"><ul class="char-grid">' + items + '</ul></section>';
  }

  function annotatedSection() {
    var dots = s.annotations.map(function (a, i) {
      return '<circle cx="' + a.anchor.x + '" cy="' + a.anchor.y + '" r="7.5" fill="var(--color-neutral-100)" stroke="currentColor" stroke-width="1.5"/>' +
        '<text x="' + a.anchor.x + '" y="' + (a.anchor.y + 3.4) + '" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor">' + (i + 1) + '</text>';
    }).join("");
    var list = s.annotations.map(function (a, i) {
      return '<li class="anno"><span class="anno-n">' + ("0" + (i + 1)) + '</span><div><h3 class="anno-t">' + esc(a.title) + '</h3><p class="anno-d">' + esc(a.description) + '</p></div></li>';
    }).join("");
    return '<section class="wrap reveal">' +
      '<span class="kicker">The proportions behind it</span>' +
      '<h2 class="section-h">What makes you ' + s.article + ' ' + esc(s.name) + '?</h2>' +
      '<p class="section-lead">Your body shape is determined by the visual relationship between your shoulders, waist and hips — not by your size or weight.</p>' +
      '<div class="anno-stage">' +
        '<div class="anno-figure">' + silhouette(dots) + '</div>' +
        '<ol class="anno-list">' + list + '</ol>' +
      '</div>' +
    '</section>';
  }

  function goalSection() {
    var w = s.workWith.map(function (t) { return '<li>' + tick + '<span>' + esc(t) + '</span></li>'; }).join("");
    var c = s.beCareful.map(function (t) { return '<li><span class="dot-warn"></span><span>' + esc(t) + '</span></li>'; }).join("");
    return '<section class="wrap reveal">' +
      '<div class="goal-card">' +
        '<span class="kicker on-accent">Your main styling goal</span>' +
        '<p class="goal-rule">' + esc(s.stylingGoal) + '</p>' +
      '</div>' +
      '<div class="goal-cols">' +
        '<div class="goal-col"><h3 class="goal-col-h">Work with your shape</h3><ul class="goal-list work">' + w + '</ul></div>' +
        '<div class="goal-col"><h3 class="goal-col-h">Be careful with</h3><ul class="goal-list careful">' + c + '</ul></div>' +
      '</div>' +
    '</section>';
  }

  function avoidSection() {
    var cats = CAT_ORDER.map(function (catId) {
      var items = (s.avoid[catId] || []).map(function (it, i) {
        // supply an asset later by adding `image: "images/body-shapes/…"` to the item
        var realSrc = it.image ? (BASE + it.image) : "";
        var alt = "Illustration of a " + it.name.toLowerCase() + " on " + s.article + " " + s.name.toLowerCase() + " silhouette";
        return '<article class="avoid-card">' +
          editorialImage(realSrc, alt, catId, "4 / 5") +
          '<div class="avoid-body"><span class="avoid-flag">Be careful with</span>' +
          '<h4 class="avoid-name">' + esc(it.name) + '</h4>' +
          '<p class="avoid-expl">' + esc(it.explanation) + '</p></div>' +
        '</article>';
      }).join("");
      return '<div class="avoid-cat reveal"><h3 class="avoid-cat-h">' + esc(CAT_TITLE[catId]) + ' to be careful with</h3>' +
        '<p class="avoid-cat-intro">' + esc(CAT_INTRO[catId]) + '</p>' +
        '<div class="avoid-grid">' + items + '</div></div>';
    }).join("");
    return '<section class="wrap">' +
      '<span class="kicker reveal">A useful preview</span>' +
      '<h2 class="section-h reveal">Styles that can work against your shape</h2>' +
      '<p class="section-lead reveal">These pieces are not forbidden. They are simply more likely to interrupt the balance or definition that naturally flatters your proportions.</p>' +
      '<div class="avoid-cats">' + cats + '</div>' +
    '</section>';
  }

  function guideTransitionSection() {
    return '<section class="wrap guide-transition reveal">' +
      '<div class="gt-copy">' +
        '<span class="kicker">This is only the beginning</span>' +
        '<h2 class="section-h">Now imagine knowing exactly what to choose in every clothing category</h2>' +
        '<p class="section-lead">Your result gives you the foundation. The complete guide turns that foundation into a practical system you can use while shopping, building outfits and reviewing what is already in your wardrobe.</p>' +
      '</div>' +
      '<div class="gt-cover">' +
        '<div class="mockup"><div class="mockup-back"></div><div class="mockup-back mockup-back-2"></div>' +
          '<figure class="mockup-cover"><span class="mc-kicker">The Complete Guide</span>' +
          '<div><h3 class="mc-title">Dressing for<span class="script">Your Shape</span></h3><span class="mc-rule"></span></div>' +
          '<div><div class="mc-byline">Rita Rouhana</div><div class="mc-sub">Image &amp; Style</div></div></figure>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function guideContentsSection() {
    var groups = GUIDE_GROUPS.map(function (g) {
      var lis = g.items.map(function (it) {
        var parts = it.split(" — ");
        var extra = parts[1] ? '<span class="gc-flag">' + esc(parts[1]) + '</span>' : "";
        return '<li>' + tick + '<span>' + esc(parts[0]) + extra + '</span></li>';
      }).join("");
      return '<div class="gc-group"><h3 class="gc-group-h">' + esc(g.title) + '</h3><ul class="gc-list">' + lis + '</ul></div>';
    }).join("");
    return '<section class="wrap reveal">' +
      '<span class="kicker">Inside the full guide</span>' +
      '<h2 class="section-h">Everything inside your complete ' + esc(s.name) + ' style guide</h2>' +
      '<div class="gc-groups">' + groups + '</div>' +
      '<p class="gc-value">More than 40 visual clothing recommendations tailored to your shape.</p>' +
    '</section>';
  }

  function transformationSection() {
    var items = TRANSFORM.map(function (t) { return '<li>' + tick + '<span>' + esc(t) + '</span></li>'; }).join("");
    return '<section class="wrap reveal">' +
      '<h2 class="section-h">Get dressed without second-guessing every choice</h2>' +
      '<ul class="transform-grid">' + items + '</ul>' +
      '<p class="section-lead" style="margin-top:clamp(20px,3vw,28px)">The goal is not to restrict your style. It is to give you a clear foundation so you can make more confident decisions and adapt trends to your own body.</p>' +
    '</section>';
  }

  function finalCtaSection() {
    return '<section class="wrap reveal"><div class="final-cta">' +
      '<h2>Your shape is only the starting point</h2>' +
      '<p>Get the complete guide and learn which cuts, shapes and details are most likely to work with your proportions across your entire wardrobe.</p>' +
      '<a class="btn btn-buy" href="' + esc(checkout) + '" data-analytics="final-guide-cta" data-cta="final">Get my complete style guide</a>' +
      '<p class="final-cta-note">Created specifically for the ' + esc(s.name) + ' silhouette.</p>' +
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
    heroSection() + characteristicsSection() + annotatedSection() + goalSection() +
    avoidSection() + guideTransitionSection() + guideContentsSection() +
    transformationSection() + finalCtaSection() + footerSection() + stickyCta();

  // page title (one h1 already in hero)
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
  var hero = root.querySelector(".result-hero2");
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
