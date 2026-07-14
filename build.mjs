/* Generates index.html + one result page per shape from shared templates.
   Run:  node build.mjs   (re-run after editing copy/structure here).        */
import { readFileSync, writeFileSync } from "node:fs";

// Pull the shape list/names straight from the shared data file so this stays in sync.
const dataSrc = readFileSync(new URL("./assets/shapes-data.js", import.meta.url), "utf8");
const ORDER = JSON.parse(dataSrc.match(/SHAPE_ORDER\s*=\s*(\[[^\]]*\])/)[1].replace(/'/g, '"'));
const NAMES = {};
for (const m of dataSrc.matchAll(/"([a-z-]+)":\s*\{\s*\n\s*name:\s*"([^"]+)"/g)) NAMES[m[1]] = m[2];

const head = (title, desc) => `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preload" href="fonts/cochin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/app.css">
<!-- Integrations (fill ids in assets/config.js). Loaded early so tags fire on every page. -->
<script src="assets/config.js"></script>
<script src="assets/analytics.js"></script>
</head>`;

/* ── Landing page ─────────────────────────────────────────────────────── */
const landing = `<!DOCTYPE html>
<html lang="en">
${head("Dressing for Your Shape — Rita Roumieh", "Take the free 60-second quiz to discover your body shape and exactly what to wear for it — from Rita Roumieh, Image &amp; Style.")}
<body>

  <nav class="nav">
    <span class="nav-brand">Rita Roumieh</span>
    <span class="nav-sub">Image &amp; Style</span>
  </nav>

  <section style="position: relative; max-width: 820px; margin: 0 auto; padding: clamp(16px, 3vw, 40px) clamp(20px, 5vw, 48px) clamp(44px, 6vw, 80px); text-align: center;">
    <div style="position: absolute; right: -180px; top: -140px; width: 420px; height: 420px; border-radius: 50%; background: var(--color-accent-2-200); z-index: 0; pointer-events: none;"></div>
    <div style="position: relative; z-index: 1;">
      <h1 style="font-family: var(--font-heading); font-weight: 400; font-size: clamp(44px, 6.2vw, 74px); line-height: 1.05; letter-spacing: -0.02em; margin: 0;">
        <span class="display-line">Dress for the <span class="script" style="font-size: 1.5em; line-height: 0.7; color: var(--color-accent); padding: 0 0.06em;">shape</span></span>
        <span class="display-line" style="color: var(--color-accent);">you actually have.</span>
      </h1>
      <p style="font-size: clamp(17px, 1.8vw, 21px); line-height: 1.6; max-width: 46ch; margin: 22px auto 0; color: color-mix(in srgb, var(--color-text) 82%, transparent);">
        Take the free 60-second quiz to find your shape and see exactly what to wear for it — so getting ready feels easy, not like a fight with your wardrobe.
      </p>
      <div style="width: 100%; max-width: 320px; margin: clamp(36px, 4vw, 52px) auto 0;">
        <div style="position: relative;">
          <div style="position: absolute; inset: -22px -22px auto auto; width: 180px; height: 180px; border-radius: 50%; background: var(--color-accent-200); z-index: 0;"></div>
          <figure class="cover" style="position: relative; z-index: 1; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-lg); aspect-ratio: 3 / 4; transform: rotate(-2deg); display: flex; flex-direction: column; justify-content: space-between; text-align: center; color: #F5EFE8; padding: clamp(22px, 6%, 34px); background: radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, #F5EFE8 14%, transparent), transparent 60%), linear-gradient(160deg, var(--color-accent-600), var(--color-accent-900));">
            <span style="font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--color-accent-300);">A Free Style Guide</span>
            <div>
              <h2 style="font-family: var(--font-heading); font-weight: 400; font-size: clamp(28px, 12%, 40px); line-height: 1.12; margin: 0;">Dressing for<span class="script" style="display:block; font-size: 1.55em; line-height: 0.9; color: #F5EFE8; margin-top: 0.06em;">Your Shape</span></h2>
              <span style="display:block; width: 40px; height: 1px; margin: 14px auto; background: color-mix(in srgb, #F5EFE8 55%, transparent);"></span>
            </div>
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px;">Rita Roumieh</div>
              <div style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent-300); margin-top: 4px;">Image &amp; Style</div>
            </div>
          </figure>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 14px; margin-top: clamp(32px, 4vw, 44px);">
        <button type="button" data-open-form class="btn btn-primary" style="min-height: 56px;">Find my shape — it's free</button>
        <span style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: color-mix(in srgb, var(--color-text) 60%, transparent);">60-second quiz · Instant result</span>
      </div>
    </div>
  </section>

  <section class="wrap" style="padding-block: clamp(28px, 4vw, 52px);">
    <span class="kicker" style="margin-bottom: 12px;">What you'll walk away with</span>
    <h2 style="font-family: var(--font-heading); font-weight: 400; font-size: clamp(30px, 3.6vw, 46px); line-height: 1.08; letter-spacing: -0.015em; margin: 0 0 clamp(28px, 3vw, 40px); max-width: 22ch;">A calmer, more confident way to get dressed.</h2>
    <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px clamp(28px, 4vw, 56px);">
      ${[
        "Pinpoint your shape in two minutes — just a tape measure needed.",
        "Learn exactly what to wear to flatter your shape — the pieces that suit you.",
        "Get a ready-to-wear shopping list of pieces that just work.",
        "Stop dreading the wardrobe and get dressed with real confidence."
      ].map(t => `<li style="display: flex; align-items: flex-start; gap: 16px; font-size: 17px; line-height: 1.5;">
        <span style="flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--color-accent-200); display: flex; align-items: center; justify-content: center; margin-top: 1px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-700)" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
        <span>${t}</span>
      </li>`).join("\n      ")}
    </ul>
  </section>

  <section class="wrap" style="padding-block: clamp(28px, 4vw, 56px);">
    <span class="kicker" style="margin-bottom: 12px;">How it works</span>
    <h2 style="font-family: var(--font-heading); font-weight: 400; font-size: clamp(32px, 3.8vw, 48px); line-height: 1.08; letter-spacing: -0.015em; margin: 0; max-width: 20ch;">Three easy steps to an outfit that works.</h2>
    <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(20px, 3vw, 36px); margin-top: clamp(32px, 4vw, 52px);">
      ${[
        ["1", "Find your shape", "Answer a few quick questions — it's the relationship between your measurements, not the numbers, that names your shape."],
        ["2", "See your styling tips", "Get the simple ways to flatter it, framed as what to do — never what to avoid. Proportion and balance, made obvious."],
        ["3", "Try the instant wins", "A short list of pieces that just work for you — ready to pull on tomorrow morning without a second thought."]
      ].map(([n, h, p]) => `<div>
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--color-accent-100); display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 26px; color: var(--color-accent-700); margin-bottom: 20px;">${n}</div>
        <h3 style="font-family: var(--font-heading); font-weight: 400; font-size: 26px; line-height: 1.15; margin: 0;">${h}</h3>
        <p style="font-size: 15.5px; line-height: 1.6; color: color-mix(in srgb, var(--color-text) 78%, transparent); margin: 12px 0 0;">${p}</p>
      </div>`).join("\n      ")}
    </div>
  </section>

  <section class="wrap" style="padding-block: clamp(20px, 3vw, 40px) clamp(48px, 6vw, 88px);">
    <div style="background: var(--color-accent); color: #F5EFE8; border-radius: var(--radius-lg); padding: clamp(32px, 5vw, 64px); text-align: center;">
      <h2 style="font-family: var(--font-heading); font-weight: 400; font-size: clamp(32px, 4vw, 52px); line-height: 1.08; letter-spacing: -0.015em; margin: 0 auto; max-width: 22ch;">Your shape was never the problem. It just needed the right pieces.</h2>
      <p style="font-size: 16px; line-height: 1.6; color: color-mix(in srgb, #F5EFE8 82%, transparent); margin: 20px auto 0; max-width: 52ch;">Take the free quiz and see what suits you in the next 60 seconds — then grab the full guide when you're ready.</p>
      <button type="button" data-open-form class="btn btn-primary" style="margin-top: 28px; background: #F5EFE8; color: var(--color-accent);">Find my shape — it's free</button>
      <p style="font-family: var(--font-heading); font-size: 20px; margin: 34px 0 0;">Rita Roumieh</p>
      <p style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent-300); margin: 6px 0 0;">Image &amp; Style</p>
    </div>
  </section>

  <div id="form-overlay" hidden data-close-form class="overlay">
    <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <button type="button" data-close-form aria-label="Close" class="btn btn-icon" style="position: absolute; top: 16px; right: 16px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      <h2 id="form-title" style="font-family: var(--font-heading); font-weight: 400; font-size: clamp(28px, 5vw, 36px); line-height: 1.1; margin: 0; padding-right: 32px;">Get your free shape result</h2>
      <p style="font-size: 15.5px; line-height: 1.55; color: color-mix(in srgb, var(--color-text) 78%, transparent); margin: 12px 0 0;">Answer below and I'll show you what to wear for your shape — and send your starter guide straight to your inbox.</p>
      <form id="optin-form" style="display: grid; gap: 14px; margin-top: 24px;">
        <div class="field"><label for="f-name">First name</label><input class="input" id="f-name" name="name" type="text" required placeholder="Rita" autocomplete="given-name" /></div>
        <div class="field"><label for="f-email">Email address</label><input class="input" id="f-email" name="email" type="email" required placeholder="you@example.com" autocomplete="email" /></div>
        <div class="field"><label for="f-phone">Phone number</label><input class="input" id="f-phone" name="phone" type="tel" required placeholder="+44 7000 000000" autocomplete="tel" /></div>
        <div class="field"><label for="f-insta">Instagram account</label><input class="input" id="f-insta" name="instagram" type="text" required placeholder="@yourhandle" /></div>
        <fieldset class="shape-field">
          <legend>What represents your body the most?</legend>
          <div id="shape-grid" class="shape-grid"></div>
          <input type="hidden" name="shape" id="shape-input" />
          <p id="shape-error" class="shape-error" hidden>Tap the shape that's closest to you to continue.</p>
        </fieldset>
        <button type="submit" class="btn btn-primary btn-block" style="min-height: 52px; margin-top: 6px;">Show me my result</button>
        <p style="font-size: 13px; line-height: 1.5; text-align: center; color: color-mix(in srgb, var(--color-text) 62%, transparent); margin: 4px 0 0;">One warm email a week. Unsubscribe any time.</p>
      </form>
    </div>
  </div>

  <script src="assets/shapes-data.js"></script>
  <script src="assets/app.js"></script>
</body>
</html>
`;

/* ── Result page (one per shape) ──────────────────────────────────────── */
const resultPage = (key) => {
  const nm = NAMES[key];
  return `<!DOCTYPE html>
<html lang="en">
${head(`You're ${/^[aeiou]/i.test(nm) ? "an" : "a"} ${nm} — Dressing for Your Shape`, `Your ${nm} body-shape styling guide from Rita Roumieh — what to wear, what to skip, and the full playbook.`)}
<body data-shape="${key}">
  <nav class="nav">
    <span class="nav-brand"><a href="index.html">Rita Roumieh</a></span>
    <span class="nav-sub">Image &amp; Style</span>
  </nav>
  <main id="result-root"></main>
  <script src="assets/shapes-data.js"></script>
  <script src="assets/result.js"></script>
</body>
</html>
`;
};

writeFileSync(new URL("./index.html", import.meta.url), landing);
let count = 1;
for (const key of ORDER) {
  writeFileSync(new URL(`./${key}.html`, import.meta.url), resultPage(key));
  count++;
}
console.log(`Built index.html + ${ORDER.length} result pages: ${ORDER.join(", ")}`);
