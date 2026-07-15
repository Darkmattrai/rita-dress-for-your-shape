/* ────────────────────────────────────────────────────────────────────────
   Result page renderer. Each result page carries <body data-shape="pear">;
   this builds the personalised result from shapes-data.js + garments.js,
   shows Rita's per-category style cheat sheets (images/), fires tracking, and
   wires the $47 checkout buttons. Needs config.js, analytics.js,
   shapes-data.js, garments.js loaded first, and <div id="result-root"></div>.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var cfg = window.RITA_CONFIG || {};
  var GARMENTS = window.GARMENTS || {};
  var key = document.body.getAttribute("data-shape");
  var s = (window.SHAPES || {})[key];
  var root = document.getElementById("result-root");
  if (!s || !root) return;

  // Resolve where sibling assets (images/) live, whether served locally or
  // from the CDN — derived from this script's own URL.
  var thisScript = document.currentScript ||
    (function () { var ss = document.getElementsByTagName("script"); return ss[ss.length - 1]; })();
  var ASSET_BASE = (thisScript && thisScript.src)
    ? thisScript.src.replace(/assets\/result\.js(?:\?.*)?$/, "") : "";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ill(d) {
    return '<svg viewBox="0 0 120 200" fill="none" aria-hidden="true" style="width:100%;height:auto;display:block">' +
      '<circle cx="60" cy="26" r="13" fill="currentColor"/><path d="' + d + '" fill="currentColor"/></svg>';
  }
  var check = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  var cross = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  var name = "";
  try { name = (sessionStorage.getItem("rita_name") || "").trim(); } catch (e) {}
  var hi = name ? ", " + esc(name) : "";

  // proportion bars
  var PROP_MAX = 40, propLabels = ["Shoulders", "Waist", "Hips"];
  var bars = (s.proportions || []).map(function (v, i) {
    return '<div class="bar-row"><span class="bar-label">' + propLabels[i] + '</span>' +
      '<span class="bar-track"><span class="bar-fill" style="width:' + Math.round((v / PROP_MAX) * 100) + '%"></span></span></div>';
  }).join("");

  // cheat-sheet cards, one per recommended category, from Rita's blog graphics
  var sheets = s.wear.map(function (w) {
    var img = ASSET_BASE + "images/" + key + "-" + w[3] + ".jpg";
    return '<figure class="sheet">' +
      '<button type="button" class="sheet-btn" data-full="' + esc(img) + '" data-cap="' + esc(w[0]) + ' — ' + esc(w[1]) + '" aria-label="Enlarge the ' + esc(w[0]) + ' cheat sheet">' +
        '<img class="sheet-img" src="' + esc(img) + '" alt="' + esc(w[0]) + ' styles for your ' + esc(s.name) + ' shape" loading="lazy" data-flat="' + esc(w[2]) + '">' +
      '</button>' +
      '<figcaption><span class="sheet-cat">' + esc(w[0]) + '</span><span class="sheet-tip">' + esc(w[1]) + '</span></figcaption>' +
    '</figure>';
  }).join("");

  var avoid = s.avoid.map(function (a) {
    return '<li><span class="x">' + cross + '</span><span>' + esc(a) + '</span></li>';
  }).join("");

  root.innerHTML =
    // hero
    '<section class="wrap result-hero">' +
      '<div class="halo"></div>' +
      '<div class="result-ill">' + ill(s.path) + '</div>' +
      '<span class="result-eyebrow">Your result' + hi + '</span>' +
      '<h1 class="result-title">You’re ' + s.article + ' <span style="color:var(--color-accent)">' + esc(s.name) + '</span></h1>' +
      '<p class="result-tagline">' + esc(s.tagline) + '</p>' +
    '</section>' +

    // visual "at a glance"
    '<section class="wrap">' +
      '<div class="glance">' +
        '<div class="glance-goal">' +
          '<span class="glance-label">Your one big idea</span>' +
          '<p class="glance-goal-text">' + esc(s.goal) + '</p>' +
          '<p class="glance-summary">' + esc(s.summary) + '</p>' +
        '</div>' +
        '<div class="glance-bars">' +
          '<span class="glance-label">Your proportions</span>' + bars +
        '</div>' +
      '</div>' +
    '</section>' +

    // cheat-sheet gallery
    '<section class="wrap">' +
      '<span class="kicker" style="margin-bottom:10px">Your ' + esc(s.name) + ' cheat sheets</span>' +
      '<h2 class="section-h">What to reach for, category by category.</h2>' +
      '<div class="sheet-grid">' + sheets + '</div>' +
      '<p class="sheet-note">Tap any sheet to see it full-size. These are four of your categories — the full guide covers every one.</p>' +
    '</section>' +

    // skip
    '<section class="wrap">' +
      '<div class="skip-card">' +
        '<h3><span class="ic">' + cross + '</span>A few things to skip for now</h3>' +
        '<ul class="avoid-list">' + avoid + '</ul>' +
      '</div>' +
    '</section>' +

    // pitch
    '<section class="wrap">' +
      '<div class="pitch">' +
        '<span class="eyebrow">Your complete ' + esc(s.name) + ' playbook</span>' +
        '<h2>Everything that flatters your ' + esc(s.name) + ' shape, in one guide.</h2>' +
        '<p>These sheets are a taste. <em>Dressing for Your Shape</em> gives you the whole playbook for your ' + esc(s.name) + ' shape — no more guessing in front of the wardrobe.</p>' +
        '<ul class="bullets">' +
          '<li>' + check + '<span>Every category — necklines, sleeves, tops, knitwear, jackets, coats, denim, trousers, skirts &amp; dresses</span></li>' +
          '<li>' + check + '<span>The exact cuts, lengths and shapes that flatter you</span></li>' +
          '<li>' + check + '<span>Your colours and a mix-and-match capsule</span></li>' +
          '<li>' + check + '<span>A ready-to-shop list so you can buy with confidence</span></li>' +
        '</ul>' +
        '<div class="price">$47<s>$97</s></div>' +
        '<div class="price-sub">Instant download</div>' +
        '<a class="btn btn-buy" data-buy href="' + (cfg.checkoutUrl || "#") + '">Get my full ' + esc(s.name) + ' guide</a>' +
        '<p class="guarantee">Instant PDF · Love it or your money back within 14 days.</p>' +
      '</div>' +
    '</section>' +

    // whole-guide mockup
    '<section class="wrap mockup-sec">' +
      '<div class="mockup">' +
        '<div class="mockup-back"></div><div class="mockup-back mockup-back-2"></div>' +
        '<figure class="mockup-cover">' +
          '<span class="mc-kicker">The Complete Guide</span>' +
          '<div><h3 class="mc-title">Dressing for<span class="script">Your Shape</span></h3><span class="mc-rule"></span></div>' +
          '<div><div class="mc-byline">Rita Rouhana</div><div class="mc-sub">Image &amp; Style</div></div>' +
        '</figure>' +
      '</div>' +
      '<div class="mockup-copy">' +
        '<span class="kicker">The whole guide</span>' +
        '<h2>Every shape. Every piece. One beautiful guide.</h2>' +
        '<p>All five shapes, each category, your colours and a ready-to-shop list — everything laid out and ready to use, starting with your ' + esc(s.name) + ' pages.</p>' +
        '<div class="mockup-cta"><a class="btn btn-primary" data-buy href="' + (cfg.checkoutUrl || "#") + '">Get the full guide — $47</a></div>' +
      '</div>' +
    '</section>' +

    // footer
    '<footer class="wrap result-foot">' +
      '<div class="name">Rita Rouhana</div><div class="sub">Image &amp; Style</div>' +
      '<a class="retake" href="index.html">← Retake the shape quiz</a>' +
    '</footer>' +

    // lightbox
    '<div class="lightbox" id="lightbox" hidden><button type="button" class="lb-close" aria-label="Close">' + cross + '</button><figure class="lb-fig"><img id="lb-img" alt=""><figcaption id="lb-cap"></figcaption></figure></div>';

  try { document.title = "You’re " + s.article + " " + s.name + " — Dressing for Your Shape"; } catch (e) {}
  if (window.ritaTrack) window.ritaTrack("result_view", { shape: key });

  // image fallback → garment illustration if a sheet fails to load
  root.querySelectorAll(".sheet-img").forEach(function (img) {
    img.addEventListener("error", function () {
      var flat = GARMENTS[img.getAttribute("data-flat")];
      if (flat) {
        var frame = img.parentNode;
        frame.classList.add("sheet-fallback");
        frame.innerHTML = flat;
      }
    });
  });

  // lightbox
  var lb = document.getElementById("lightbox"),
      lbImg = document.getElementById("lb-img"),
      lbCap = document.getElementById("lb-cap");
  function openLb(src, cap) { lbImg.src = src; lbImg.alt = cap; lbCap.textContent = cap; lb.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLb() { lb.hidden = true; lbImg.src = ""; document.body.style.overflow = ""; }
  root.querySelectorAll(".sheet-btn").forEach(function (b) {
    b.addEventListener("click", function () { openLb(b.getAttribute("data-full"), b.getAttribute("data-cap")); });
  });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lb-close")) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  // checkout
  root.querySelectorAll("[data-buy]").forEach(function (buy) {
    buy.addEventListener("click", function (e) {
      if (window.ritaTrack) window.ritaTrack("checkout_click", { shape: key });
      if (!cfg.checkoutUrl || cfg.checkoutUrl === "#") e.preventDefault();
    });
  });
})();
