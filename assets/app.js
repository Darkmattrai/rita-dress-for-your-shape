/* ────────────────────────────────────────────────────────────────────────
   Landing page: opt-in modal + shape picker. On submit it captures the lead
   (agenci.io), fires tracking, and sends the visitor to their result page.
   Needs: config.js, analytics.js, shapes-data.js (loaded first).
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var cfg = window.RITA_CONFIG || {};
  var SHAPES = window.SHAPES, ORDER = window.SHAPE_ORDER;

  function ill(d) {
    return '<svg viewBox="0 0 120 200" fill="none" aria-hidden="true" style="width:100%;height:auto;display:block">' +
      '<circle cx="60" cy="26" r="13" fill="currentColor"/><path d="' + d + '" fill="currentColor"/></svg>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var overlay = document.getElementById("form-overlay");
  var dialog = overlay.querySelector(".dialog");
  var form = document.getElementById("optin-form");
  var grid = document.getElementById("shape-grid");
  var shapeInput = document.getElementById("shape-input");
  var shapeError = document.getElementById("shape-error");
  var lastFocused = null;

  // Build the selectable shape grid
  ORDER.forEach(function (key) {
    var s = SHAPES[key];
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shape-opt";
    btn.setAttribute("data-shape", key);
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = '<span class="shape-ill">' + ill(s.path) + '</span><span class="shape-name">' + esc(s.name) + '</span>';
    btn.addEventListener("click", function () { selectShape(key); });
    grid.appendChild(btn);
  });

  function selectShape(key) {
    shapeInput.value = key;
    shapeError.hidden = true;
    grid.querySelectorAll(".shape-opt").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-shape") === key ? "true" : "false");
    });
  }

  function openForm() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    if (window.ritaTrack) window.ritaTrack("optin_open");
    var first = document.getElementById("f-name");
    if (first) first.focus();
  }
  function closeForm() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll("[data-open-form]").forEach(function (b) { b.addEventListener("click", openForm); });
  document.querySelectorAll("[data-close-form]").forEach(function (el) {
    el.addEventListener("click", function (e) { if (e.currentTarget === el) closeForm(); });
  });
  dialog.addEventListener("click", function (e) { e.stopPropagation(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) closeForm(); });

  function captureLead(lead) {
    // Send the lead to agenci.io (or any webhook) if configured.
    if (!cfg.agenciEndpoint) return;
    try {
      fetch(cfg.agenciEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        keepalive: true      // let it finish even as we navigate away
      }).catch(function () {});
    } catch (e) {}
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!shapeInput.value) {
      shapeError.hidden = false;
      grid.scrollIntoView({ block: "nearest" });
      return;
    }
    var fd = new FormData(form);
    var lead = {
      name: (fd.get("name") || "").trim(),
      email: (fd.get("email") || "").trim(),
      phone: (fd.get("phone") || "").trim(),
      instagram: (fd.get("instagram") || "").trim(),
      shape: fd.get("shape")
    };

    captureLead(lead);
    if (window.ritaTrack) window.ritaTrack("lead_submit", { shape: lead.shape });

    // Pass the first name to the result page (kept out of the URL / PII-safe).
    try { sessionStorage.setItem("rita_name", lead.name); } catch (e) {}

    window.location.href = lead.shape + ".html";
  });
})();
