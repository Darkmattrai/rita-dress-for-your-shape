/* ────────────────────────────────────────────────────────────────────────
   Loads Google Tag Manager + Meta Pixel from RITA_CONFIG and exposes a tiny
   ritaTrack() helper. Include AFTER config.js, early in <head>, on every page.
   Both tags no-op gracefully until their ids are set in config.js.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var cfg = window.RITA_CONFIG || {};

  // ── Google Tag Manager ──────────────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  if (cfg.gtmId) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", cfg.gtmId);
  }

  // ── Meta (Facebook) Pixel ───────────────────────────────────────────
  if (cfg.metaPixelId) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", cfg.metaPixelId);
    window.fbq("track", "PageView");
  }

  // ── Unified event helper: pushes to GTM dataLayer + Meta Pixel ───────
  window.ritaTrack = function (name, params) {
    params = params || {};
    try { window.dataLayer.push(Object.assign({ event: name }, params)); } catch (e) {}
    if (window.fbq) {
      // Map to standard Meta events where it makes sense
      if (name === "lead_submit") window.fbq("track", "Lead", params);
      else if (name === "result_view") window.fbq("trackCustom", "ResultView", params);
      else if (name === "checkout_click") window.fbq("track", "InitiateCheckout", params);
      else window.fbq("trackCustom", name, params);
    }
  };
})();
