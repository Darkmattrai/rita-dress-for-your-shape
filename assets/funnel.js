/* ────────────────────────────────────────────────────────────────────────
   VSL funnel: vsl.html → survey.html → calendar.html → thank-you.html.
   Fills the VSL video, optionally reveals the CTA after a delay, and drops
   the survey / calendar embeds from RITA_CONFIG. All slots fall back to a
   tasteful placeholder until the real URLs are added in config.js.
   Needs config.js + analytics.js loaded first.
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var cfg = window.RITA_CONFIG || {};

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // YouTube / Vimeo / direct-file → embed markup; else null.
  function videoEmbed(url) {
    url = (url || "").trim();
    if (!url) return null;
    var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return '<iframe src="https://www.youtube.com/embed/' + yt[1] + '" title="Training video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return '<iframe src="https://player.vimeo.com/video/' + vm[1] + '" title="Training video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    return '<video controls preload="metadata" playsinline src="' + esc(url) + '"></video>';
  }

  function posterPlaceholder(label, sub) {
    return '<div class="vsl-ph"><span class="vsl-play"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>' +
      '<span class="vsl-ph-t">' + esc(label) + '</span>' +
      (sub ? '<span class="vsl-ph-s">' + esc(sub) + '</span>' : "") + '</div>';
  }

  // Drop a live iframe embed, else a labelled placeholder.
  function embed(container, url, label) {
    if (!container) return;
    url = (url || "").trim();
    if (url) {
      var f = document.createElement("iframe");
      f.src = url; f.title = label; f.loading = "lazy";
      f.setAttribute("frameborder", "0");
      f.style.width = "100%"; f.style.height = "100%"; f.style.border = "0";
      container.innerHTML = "";
      container.appendChild(f);
      container.classList.add("has-embed");
    } else {
      container.innerHTML = '<div class="embed-ph"><span class="embed-ph-t">' + esc(label) + '</span>' +
        '<span class="embed-ph-s">Embed goes here — add the URL in assets/config.js</span></div>';
    }
  }

  // ── VSL page: video + (optionally delayed) CTA ──
  var videoSlot = document.getElementById("vsl-video");
  if (videoSlot) {
    var v = videoEmbed(cfg.vslFunnelUrl);
    videoSlot.innerHTML = v || posterPlaceholder("Your free training", "Video coming soon");

    var delay = Math.max(0, +cfg.vslCtaDelay || 0);
    var gated = document.querySelectorAll("[data-cta-gate]");
    if (delay > 0 && gated.length) {
      gated.forEach(function (el) { el.hidden = true; });
      var note = document.getElementById("vsl-cta-note");
      if (note) note.hidden = false;
      setTimeout(function () {
        gated.forEach(function (el) { el.hidden = false; });
        if (note) note.hidden = true;
      }, delay * 1000);
    }
  }

  // ── Survey + calendar embeds ──
  embed(document.getElementById("survey-embed"), cfg.surveyUrl, "Your application survey");
  embed(document.getElementById("calendar-embed"), cfg.calendarUrl, "Your booking calendar");

  // ── analytics: page view + CTA clicks ──
  var page = document.body.getAttribute("data-funnel") || "funnel";
  if (window.ritaTrack) window.ritaTrack("funnel_view", { page: page });
  document.querySelectorAll("[data-analytics]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (window.ritaTrack) window.ritaTrack("funnel_click", { page: page, action: el.getAttribute("data-analytics") });
    });
  });
})();
