# Dressing for Your Shape — Dynamic Lead Magnet

A single-page **quiz lead magnet** for **Rita Roumieh · Image & Style**. The
visitor opts in with their details, picks the body shape that best represents
them, and gets an instant personalised result — a short styling teaser for
their shape — which then upsells the full **$47** guide.

Implemented from the Claude Design source
`Dressing for Your Shape - Opt-In -Cocoa-.dc.html` as a self-contained,
deployable static page — no build step, no runtime dependencies.

## How it flows

1. Visitor clicks **Send me the free guide** → the opt-in modal opens.
2. They give first name, email, phone, Instagram, and choose one of five body
   shapes (**Hourglass, Rectangle, Oval, Inverted Triangle, Pear**), each shown
   as an on-brand silhouette illustration.
3. On submit they see a **personalised result**: a brief summary of their shape,
   one thing to *start wearing* per category and a few to *skip for now*
   (distilled from Rita's full styling guides).
4. The result upsells the complete **$47** guide with a clear call to action.

The five shape write-ups are sourced from Rita's body-shape guide series
(magnifique-brunette.blogspot.com), condensed to one recommendation per
category so the on-page result is a teaser and the paid guide holds the rest.

## Files

It's a single self-contained file:

| Path | Purpose |
| --- | --- |
| `index.html` | The whole page — inlined design-system tokens, component styles, markup, the quiz + result logic (vanilla JS), and the parametric SVG body-shape silhouettes. Fonts load from Google Fonts. |

## Run / deploy

Open `index.html` directly, or serve it:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

Deploy the single file to any static host (Vercel, Netlify, GitHub Pages, S3, …).

## Wiring it up (two `TODO`s)

Everything runs client-side right now. Two hooks in the `<script>` block near
the bottom of `index.html` connect it to your stack:

1. **Lead capture** — on submit, POST the form data (name, email, phone,
   instagram, **shape**) to your email/CRM provider so you capture the lead and
   deliver the starter guide:

   ```js
   fetch("/api/subscribe", { method: "POST", body: data });
   ```

2. **Checkout** — point the result's **Get the full guide** button (`data-buy`)
   at your real checkout (Stripe, Gumroad, …):

   ```js
   window.location.href = "https://your-checkout-url";
   ```

## Body-shape illustrations

The five silhouettes are inline SVG generated parametrically (varying
shoulder / waist / hip widths per shape), so they're crisp at any size, match
the burgundy palette via `currentColor`, and add no image requests.

## Design notes

- **Palette** mirrors the source design: light cocoa ground (`#F5EFE8`),
  burgundy accent (`#4A0E1B`).
- **Type** — the source used Apple's *Cochin* and Adobe's *Bickham Script Pro*,
  both proprietary. They're replaced with license-clean Google Fonts:
  **Cormorant Garamond** (elegant serif) for headings and body, and
  **Pinyon Script** for the decorative script accent ("shape" in the headline
  and "Your Shape" on the guide cover). To restore exact Cochin, self-host the
  licensed font and swap the `--font-heading` / `--font-body` values.
- **Guide cover** — the source had an empty image slot; it's rendered here as a
  styled cover mockup. Drop in a real cover image by replacing the
  `<figure class="cover">…</figure>` block with an `<img>`.
- Fully responsive; multi-column sections collapse to a single column on
  narrow viewports.
