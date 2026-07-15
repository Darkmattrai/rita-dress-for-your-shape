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
  checkoutUrl: "#"
};
