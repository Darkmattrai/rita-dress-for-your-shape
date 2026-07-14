/* ────────────────────────────────────────────────────────────────────────
   Result page renderer. Each result page carries <body data-shape="pear">;
   this builds the personalised result from shapes-data.js, fires tracking,
   and wires the $47 checkout button. Needs config.js, analytics.js,
   shapes-data.js loaded first, and a <div id="result-root"></div>.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var cfg = window.RITA_CONFIG || {};
  var key = document.body.getAttribute("data-shape");
  var s = (window.SHAPES || {})[key];
  var root = document.getElementById("result-root");
  if (!s || !root) return;

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

  var wear = s.wear.map(function (w, i) {
    return '<li><span class="num">' + (i + 1) + '</span><span><span class="cat">' + esc(w[0]) +
      '</span><span class="item">' + esc(w[1]) + '</span></span></li>';
  }).join("");
  var avoid = s.avoid.map(function (a) {
    return '<li><span class="x">' + cross + '</span><span>' + esc(a) + '</span></li>';
  }).join("");

  root.innerHTML =
    '<section class="wrap result-hero">' +
      '<div class="halo"></div>' +
      '<div class="result-ill">' + ill(s.path) + '</div>' +
      '<span class="result-eyebrow">Your result' + hi + '</span>' +
      '<h1 class="result-title">You’re ' + s.article + ' <span style="color:var(--color-accent)">' + esc(s.name) + '</span></h1>' +
      '<p class="result-tagline">' + esc(s.tagline) + '</p>' +
      '<p class="result-summary">' + esc(s.summary) + '</p>' +
    '</section>' +

    '<section class="wrap">' +
      '<div class="result-cols">' +
        '<div class="result-card">' +
          '<h2><span class="ic" style="color:var(--color-accent-700)">' + check + '</span>Start wearing</h2>' +
          '<ul class="wear-list">' + wear + '</ul>' +
        '</div>' +
        '<div class="result-card">' +
          '<h2><span class="ic">' + cross + '</span>Skip for now</h2>' +
          '<ul class="avoid-list">' + avoid + '</ul>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="wrap">' +
      '<div class="pitch">' +
        '<span class="eyebrow">Your complete ' + esc(s.name) + ' playbook</span>' +
        '<h2>Everything that flatters your ' + esc(s.name) + ' shape, in one guide.</h2>' +
        '<p>What you just saw is one piece per category. <em>Dressing for Your Shape</em> gives you the whole playbook for your ' + esc(s.name) + ' shape — no more guessing in front of the wardrobe.</p>' +
        '<ul class="bullets">' +
          '<li>' + check + '<span>Every category covered — necklines, sleeves, tops, jackets, denim, skirts &amp; dresses</span></li>' +
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

    '<footer class="wrap result-foot">' +
      '<div class="name">Rita Roumieh</div>' +
      '<div class="sub">Image &amp; Style</div>' +
      '<a class="retake" href="index.html">← Retake the shape quiz</a>' +
    '</footer>';

  // personalise page title
  try { document.title = "You’re " + s.article + " " + s.name + " — Dressing for Your Shape"; } catch (e) {}

  if (window.ritaTrack) window.ritaTrack("result_view", { shape: key });

  var buy = root.querySelector("[data-buy]");
  if (buy) {
    buy.addEventListener("click", function (e) {
      if (window.ritaTrack) window.ritaTrack("checkout_click", { shape: key });
      if (!cfg.checkoutUrl || cfg.checkoutUrl === "#") e.preventDefault();
    });
  }
})();
