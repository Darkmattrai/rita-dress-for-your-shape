# Dressing for Your Shape — Opt-In Landing Page

A single-page lead-capture landing page for **Rita Roumieh · Image & Style**,
offering a free *Dressing for Your Shape* style guide in exchange for the
visitor's details.

Implemented from the Claude Design source
`Dressing for Your Shape - Opt-In -Cocoa-.dc.html` as a self-contained,
deployable static page — no build step, no runtime dependencies.

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

## The opt-in form

The modal collects first name, email, phone, and Instagram, then shows a
personalised confirmation. Submission is currently **client-side only** — no
data leaves the browser. To actually deliver the guide, wire the form up to
your email/CRM provider at the marked `TODO` in the `<script>` block near the
bottom of `index.html`, e.g.:

```js
fetch("/api/subscribe", { method: "POST", body: data });
```

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
