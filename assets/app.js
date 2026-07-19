/* ────────────────────────────────────────────────────────────────────────
   Landing page: the shape quiz. A live-morphing silhouette + three sliders
   (shoulders / waist / hips); the body shape is inferred from the RELATIONSHIP
   between the three, then the lead is captured and sent to the result page.
   Needs: config.js, analytics.js, shapes-data.js (loaded first).
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  var cfg = window.RITA_CONFIG || {};

  var overlay = document.getElementById("form-overlay");
  var dialog = overlay.querySelector(".dialog");
  var form = document.getElementById("optin-form");
  var shapeInput = document.getElementById("shape-input");
  var sil = document.getElementById("quiz-sil");
  var hintEl = document.getElementById("quiz-hint");
  var progressEl = document.getElementById("quiz-progress");
  var readoutEl = document.getElementById("quiz-readout");
  var slSh = document.getElementById("sl-sh");
  var slWa = document.getElementById("sl-wa");
  var slHi = document.getElementById("sl-hi");
  var ccInput = document.getElementById("f-cc");
  var countryInput = document.getElementById("country-input");
  var steps = Array.prototype.slice.call(overlay.querySelectorAll(".quiz-step"));
  var TOTAL = steps.length;
  var current = 1;
  var lastFocused = null;

  // ── Silhouette: half-widths (from centre x=60) → SVG path ──────────────
  function silPath(sh, wa, hi) {
    var cx = 60, Lsh = cx - sh, Rsh = cx + sh, Lw = cx - wa, Rw = cx + wa,
        Lh = cx - hi, Rh = cx + hi, bt = Math.min(hi, 20);
    return "M " + Lsh + " 56" +
      " C " + Lsh + " 78, " + Lw + " 86, " + Lw + " 104" +
      " C " + Lw + " 122, " + Lh + " 124, " + Lh + " 142" +
      " C " + Lh + " 160, " + (cx - bt) + " 176, " + cx + " 176" +
      " C " + (cx + bt) + " 176, " + Rh + " 160, " + Rh + " 142" +
      " C " + Rh + " 124, " + Rw + " 122, " + Rw + " 104" +
      " C " + Rw + " 86, " + Rsh + " 78, " + Rsh + " 56" +
      " C " + Rsh + " 50, " + (cx + 10) + " 48, " + (cx + 9) + " 46" +
      " L " + (cx - 9) + " 46" +
      " C " + (cx - 10) + " 48, " + Lsh + " 50, " + Lsh + " 56 Z";
  }

  // slider value (0–100) → silhouette half-width
  function toSh(v) { return 20 + (v / 100) * 20; } // 20‥40
  function toWa(v) { return 18 + (v / 100) * 22; } // 18‥40
  function toHi(v) { return 20 + (v / 100) * 20; } // 20‥40

  // ── Classify from the RELATIONSHIP between the three slider values ──────
  // S, W, H are the raw slider readings (0–100): shoulders/bust, waist
  // (0 = very defined, 100 = straight/full) and hips. A body shape is defined
  // by how the three COMPARE, not by any single measurement — so every rule
  // below is a comparison. Evaluated top to bottom; the first match wins.
  // Thresholds are in slider points and are safe to tune.
  function classify(S, W, H) {
    var waistNip = (S + H) / 2 - W;                    // how far the waist comes in vs the frame
    if (W >= Math.max(S, H) + 6) return "oval";        // waist is the fullest point
    if (H - S >= 12) return "pear";                    // hips clearly wider than shoulders
    if (S - H >= 12) return "inverted-triangle";       // shoulders clearly wider than hips
    return waistNip >= 12 ? "hourglass" : "rectangle"; // balanced frame → defined waist or straight
  }

  // Describe the read-out WITHOUT naming the shape (the name is the reward,
  // revealed on the result page after opt-in).
  var HINTS = {
    hourglass: "Balanced, with a defined waist",
    rectangle: "Long and beautifully balanced",
    pear: "Fuller through the hips",
    "inverted-triangle": "Broader up top",
    oval: "Softer through the middle"
  };

  function draw() {
    var sh = toSh(+slSh.value), wa = toWa(+slWa.value), hi = toHi(+slHi.value);
    sil.innerHTML = '<svg viewBox="0 0 120 200" fill="none" aria-hidden="true" style="width:100%;height:auto;display:block">' +
      '<circle cx="60" cy="26" r="13" fill="currentColor"/>' +
      '<path d="' + silPath(sh, wa, hi) + '" fill="currentColor"/></svg>';
    var shape = classify(+slSh.value, +slWa.value, +slHi.value);
    shapeInput.value = shape;
    hintEl.textContent = HINTS[shape] || "";
  }

  [slSh, slWa, slHi].forEach(function (s) { s.addEventListener("input", draw); });

  var stepLabelEl = document.getElementById("quiz-steplabel");
  function renderProgress() {
    if (progressEl) progressEl.style.width = Math.round((current / TOTAL) * 100) + "%";
    if (stepLabelEl) stepLabelEl.textContent = "Step " + current + " of " + TOTAL;
  }

  // numeric "nudge" shown on the final step — a personalised read-out of the
  // three proportions the visitor set, so the result feels calculated.
  function renderReadout() {
    if (!readoutEl) return;
    var rows = [["Shoulders", +slSh.value], ["Waist", +slWa.value], ["Hips", +slHi.value]];
    readoutEl.innerHTML =
      '<span class="ro-label">Your proportions read</span>' +
      '<div class="ro-bars">' + rows.map(function (r) {
        return '<div class="ro-row"><span class="ro-name">' + r[0] + '</span>' +
          '<span class="ro-track"><span class="ro-fill" style="width:' + r[1] + '%"></span></span>' +
          '<span class="ro-num">' + r[1] + '</span></div>';
      }).join("") + '</div>';
  }

  function goStep(n) {
    if (n < 1 || n > TOTAL) return;
    current = n;
    steps.forEach(function (st) { st.hidden = (+st.getAttribute("data-step") !== n); });
    renderProgress();
    if (n === TOTAL) { renderReadout(); var f = document.getElementById("f-name"); if (f) f.focus(); }
  }

  overlay.querySelectorAll("[data-next]").forEach(function (b) {
    b.addEventListener("click", function () { goStep(current + 1); });
  });
  overlay.querySelectorAll("[data-back]").forEach(function (b) {
    b.addEventListener("click", function () { goStep(current - 1); });
  });

  // ── Auto-detect the visitor's country so the phone field pre-fills the
  //    dialing code (they just type their local number). IP-based, with a
  //    fallback endpoint; fails quietly and leaves the field editable. ──────
  var geoTried = false;
  function normCode(c) { c = String(c || "").trim(); return c ? (c.charAt(0) === "+" ? c : "+" + c) : ""; }
  function applyGeo(code, country) {
    if (code && ccInput && !ccInput.value) ccInput.value = code;
    if (country && countryInput && !countryInput.value) countryInput.value = country;
  }
  function detectCountry() {
    if (geoTried) return;
    geoTried = true;
    fetch("https://ipwho.is/").then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.success && d.calling_code) applyGeo(normCode(d.calling_code), d.country_code || d.country);
      else throw new Error("no geo");
    }).catch(function () {
      fetch("https://ipapi.co/json/").then(function (r) { return r.json(); }).then(function (d) {
        if (d && d.country_calling_code) applyGeo(normCode(d.country_calling_code), d.country_code || d.country_name);
      }).catch(function () {});
    });
  }

  function openForm() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    goStep(1);
    draw();
    detectCountry();
    if (window.ritaTrack) window.ritaTrack("optin_open");
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
    if (!cfg.agenciEndpoint) return;
    try {
      fetch(cfg.agenciEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    draw(); // make sure the shape reflects the final slider positions
    var fd = new FormData(form);
    var cc = (fd.get("country_code") || "").trim();
    var num = (fd.get("phone") || "").trim();
    var lead = {
      name: (fd.get("name") || "").trim(),
      email: (fd.get("email") || "").trim(),
      phone: (cc + " " + num).trim(),
      instagram: (fd.get("instagram") || "").trim(),
      country: (fd.get("country") || "").trim(),
      shape: shapeInput.value || "rectangle"
    };
    captureLead(lead);
    if (window.ritaTrack) window.ritaTrack("lead_submit", { shape: lead.shape });
    try { sessionStorage.setItem("rita_name", lead.name); } catch (e) {}
    window.location.href = lead.shape + ".html";
  });

  draw(); // initial silhouette
})();
