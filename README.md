# Dressing for Your Shape — Dynamic Lead Magnet

A quiz-style lead magnet for **Rita Rouhana · Image & Style**. A visitor opts
in, picks their body shape, and lands on a **dedicated result page** for that
shape with a personalised styling teaser and the **$47** guide offer.

## Flow

1. **`index.html`** — landing page. The CTA opens a 4-step **shape quiz**: a
   live-morphing silhouette with three sliders (shoulders · waist · hips), then
   a contact step (first name, email, phone, Instagram). The body shape
   (**Hourglass, Rectangle, Oval, Inverted Triangle, Pear**) is inferred from
   the *relationship* between the three widths — see `classify()` in
   `assets/app.js` — not from any single absolute measurement.
2. On submit it captures the lead (agenci.io), fires tracking, and redirects to
   that shape's result page.
3. **`{shape}.html`** — a data-driven result page rendered by one reusable
   template (`assets/result.js`) from the shape's record in
   `assets/shapes-data.js`. Sections: hero → characteristics → annotated
   proportions → main styling goal (work-with / be-careful) → "styles to be
   careful with" across five clothing categories → guide transition → complete-
   guide contents → transformation → final CTA → sticky mobile CTA → footer.
   Clothing illustrations are **labelled placeholders**; drop a real asset in
   and add its path (`image: "images/body-shapes/…"`) to that item in
   `shapes-data.js` and it renders in place — no other change needed. The CTA
   destination is data-driven via `config.js` (`checkoutUrl`).

The five write-ups are distilled from Rita's body-shape guide series, one
recommendation per category so the page teases and the paid guide holds the rest.

## Configure everything in one file — `assets/config.js`

```js
window.RITA_CONFIG = {
  gtmId: "",            // Google Tag Manager container, e.g. "GTM-ABC1234"
  metaPixelId: "",      // Meta (Facebook) Pixel id
  agenciEndpoint: "",   // agenci.io POST/webhook URL — receives the lead JSON
  checkoutUrl: "#"      // $47 guide checkout (Stripe/Gumroad/…)
};
```

- **GTM + Meta Pixel** load from these ids via `assets/analytics.js` (no ids =
  no-op). Events fired: `optin_open`, `lead_submit` → Meta **Lead**,
  `result_view` → **ResultView**, `checkout_click` → **InitiateCheckout**.
- **agenci.io** — on submit the quiz POSTs `{ name, email, phone, instagram,
  shape }` as JSON to `agenciEndpoint`. (If agenci gives you an embed form
  instead of a webhook, drop it into the modal in `index.html` and keep the
  redirect in `assets/app.js`.)
- **Checkout** — the result page's buy button points at `checkoutUrl`.

## Structure

```
index.html              landing + opt-in modal
{shape}.html            one result page per body shape (generated)
assets/
  config.js             ← your integration ids (edit this)
  analytics.js          GTM + Meta Pixel loader + ritaTrack()
  shapes-data.js        the five shapes: goal, proportions, summary, wear/avoid
  garments.js           custom fashion-flat illustrations for each piece
  app.css               all styles + @font-face (real brand fonts)
  app.js                landing logic: modal, picker, lead capture, redirect
  result.js             renders a result page from its data-shape
fonts/
  cochin.woff2          Cochin (headings + body), subset to woff2
  bickham.woff2         Bickham Script Pro (script accent), subset to woff2
build.mjs               regenerates index.html + the 5 result pages
```

## Editing & building

- **Copy/recommendations per shape** → `assets/shapes-data.js`.
- **Page structure / sections** → `build.mjs`, then run `node build.mjs` to
  regenerate `index.html` and the five `{shape}.html` pages.
- **Styling** → `assets/app.css`.

## Run / deploy

```sh
node build.mjs                 # regenerate pages after edits
python3 -m http.server 8000    # serve locally (fonts need http, not file://)
```

Deploy the whole folder to any static host (Vercel, Netlify, …). On Vercel,
`hourglass.html` serves at `/hourglass`, etc. Point the GoDaddy domain at the
host's nameservers / add the `A` / `CNAME` records it gives you.

This repo is connected to Vercel (`rita-dress-for-your-shape.vercel.app`) and
deploys automatically on every push to `main`. It is a self-contained static
site — no build step, and every asset (CSS, JS, and the brand fonts) is served
from this repo, so the live site never depends on an external CDN.

## Fonts

The real brand fonts — **Cochin** (Apple) and **Bickham Script Pro** (Adobe) —
are self-hosted, converted to `woff2` and subset for the web (Bickham is subset
to the decorative words only, keeping its connecting calligraphy). These are
licensed fonts Rita provided; keep them within the terms of her licences.
