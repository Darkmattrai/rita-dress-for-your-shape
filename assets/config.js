/* ────────────────────────────────────────────────────────────────────────
   Rita Rouhana — Dressing for Your Shape
   ONE place to configure every integration. Fill these in, redeploy, done.
   ──────────────────────────────────────────────────────────────────────── */
window.RITA_CONFIG = {
  // Google Tag Manager container id, e.g. "GTM-ABC1234".
  // Leave "" to disable GTM.
  gtmId: "",

  // Meta (Facebook) Pixel id, e.g. "1234567890".
  // Leave "" to disable the Pixel.
  metaPixelId: "",

  // agenci.io lead capture. Paste the POST endpoint / webhook URL for the
  // form (agenci.io → your form → integration / webhook URL). The quiz sends
  // { name, email, phone, instagram, shape } as JSON to this URL on submit.
  // Leave "" to skip the network call (the visitor still gets their result).
  agenciEndpoint: "",

  // Where the "$47 — Get the full guide" button sends people
  // (Stripe Payment Link, Gumroad, ThriveCart, …). Leave "#" until it's ready.
  checkoutUrl: "#",

  // Short sales video (VSL) shown on the result page. Paste a YouTube, Vimeo
  // or direct .mp4 URL. Leave "" to show a tasteful "video coming soon" slot.
  // One video for every shape; to use a different video per shape instead,
  // add `videoUrl: "…"` to that shape in shapes-data.js (it wins over this).
  vslUrl: "",

  // ── VSL funnel (vsl.html → survey.html → calendar.html → thank-you.html) ──
  // The main training video on the VSL page (YouTube / Vimeo / .mp4).
  vslFunnelUrl: "",

  // Seconds to wait before the CTA button appears under the VSL (a common
  // VSL tactic). 0 = show it straight away.
  vslCtaDelay: 0,

  // Embedded survey / application (Typeform, agenci form, Tally, …). The
  // survey page drops this in an <iframe>. Leave "" for a placeholder.
  surveyUrl: "",

  // Embedded booking calendar (Calendly, TidyCal, agenci, …). The calendar
  // page drops this in an <iframe>. Leave "" for a placeholder.
  calendarUrl: ""
};
