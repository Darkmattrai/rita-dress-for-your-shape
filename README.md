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

| Path | Purpose |
| --- | --- |
| `index.html` | The whole page: inlined design-system tokens, component styles, markup, and the opt-in modal logic (vanilla JS). |
| `fonts/Cochin.ttf` | Headline/body serif (used throughout). |
| `fonts/PinyonScript-Regular.ttf` | Decorative English-roundhand script accent. |
| `fonts/PinyonScript-OFL.txt` | SIL Open Font License for Pinyon Script. |

## Run / deploy

It's a static page — open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

Deploy by uploading the folder to any static host (Netlify, Vercel, GitHub
Pages, S3, …). Keep `index.html` and the `fonts/` folder together.

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

- **Palette & type** mirror the source design: light cocoa ground (`#F5EFE8`),
  burgundy accent (`#4A0E1B`), Cochin serif headings.
- **Script accent** — the source used Adobe's proprietary *Bickham Script Pro*.
  It's replaced here with **Pinyon Script** (SIL OFL), a license-clean formal
  roundhand that closely matches the original for the two decorative phrases
  ("shape" in the headline and "Your Shape" on the guide cover).
- **Guide cover** — the source had an empty image slot; it's rendered here as a
  styled cover mockup. Drop in a real cover image by replacing the
  `<figure class="cover">…</figure>` block with an `<img>`.
- Fully responsive; multi-column sections collapse to a single column on
  narrow viewports.
