/* ────────────────────────────────────────────────────────────────────────
   The five body shapes. Summary + one recommendation per category (a teaser)
   and a few to skip, distilled from Rita's full styling guides. The paid
   guide expands each of these into the complete playbook.
   `path` is a parametric silhouette drawn in a 120×200 viewBox.
   ──────────────────────────────────────────────────────────────────────── */
window.SHAPE_ORDER = ["hourglass", "rectangle", "oval", "inverted-triangle", "pear"];

window.SHAPES = {
  "hourglass": {
    name: "Hourglass", article: "an",
    path: "M 27 56 C 27 78, 41 86, 41 104 C 41 122, 27 124, 27 142 C 27 160, 40 176, 60 176 C 80 176, 93 160, 93 142 C 93 124, 79 122, 79 104 C 79 86, 93 78, 93 56 C 93 50, 70 48, 69 46 L 51 46 C 50 48, 27 50, 27 56 Z",
    tagline: "Balanced curves, a naturally defined waist",
    goal: "Show off your waist.",
    proportions: [33, 19, 33],
    summary: "Your shoulders and hips mirror each other and your waist nips in on its own — the most balanced of the five shapes. Dressing it is simply about letting that waist show.",
    wear: [
      ["Neckline", "A deep V-neck or sweetheart that follows your balance", "v-neck", "necklines"],
      ["Top", "A wrap top that ties in at your natural waist", "wrap-top", "shirts"],
      ["Dress", "A belted wrap dress — practically made for you", "wrap-dress", "dresses"],
      ["Denim", "Straight-leg or bootcut jeans that skim your curves", "straight-jeans", "jeans"]
    ],
    avoid: [
      "Boxy, oversized shapes that swallow your waist",
      "Stiff, unstructured fabrics that flatten your curves",
      "Drop-waist styles that throw off your balance"
    ]
  },
  "rectangle": {
    name: "Rectangle", article: "a",
    path: "M 32 56 C 32 78, 35 86, 35 104 C 35 122, 32 124, 32 142 C 32 160, 40 176, 60 176 C 80 176, 88 160, 88 142 C 88 124, 85 122, 85 104 C 85 86, 88 78, 88 56 C 88 50, 70 48, 69 46 L 51 46 C 50 48, 32 50, 32 56 Z",
    tagline: "A long, even line — ready for curves",
    goal: "Create curves and a waist.",
    proportions: [28, 25, 28],
    summary: "Your shoulders, waist and hips run in a smooth, even line. The magic is in creating curves — building shape and the illusion of a waist with texture and volume.",
    wear: [
      ["Neckline", "A scoop or sweetheart that widens the top half", "sweetheart", "necklines"],
      ["Top", "A peplum or ruched top that carves out a waist", "peplum-top", "shirts"],
      ["Jacket", "A cropped jacket with peplum or volume", "cropped-jacket", "jackets"],
      ["Denim", "Textured or patterned trousers that add dimension", "straight-jeans", "jeans"]
    ],
    avoid: [
      "Plain, streamlined cuts with no shaping",
      "Flat, unadorned fabrics that read as straight",
      "Boxy styles that echo your even line"
    ]
  },
  "oval": {
    name: "Oval", article: "an",
    path: "M 35 56 C 35 78, 25 86, 25 104 C 25 122, 33 124, 33 142 C 33 160, 40 176, 60 176 C 80 176, 87 160, 87 142 C 87 124, 95 122, 95 104 C 95 86, 85 78, 85 56 C 85 50, 70 48, 69 46 L 51 46 C 50 48, 35 50, 35 56 Z",
    tagline: "Soft through the middle, great legs",
    goal: "Lengthen and streamline.",
    proportions: [25, 35, 27],
    summary: "You carry softness through the middle, often with a lovely bust and great legs. The goal is to lengthen the torso and keep the eye travelling up and down.",
    wear: [
      ["Neckline", "A long V-neck that draws the eye upward", "v-neck", "necklines"],
      ["Top", "A fitted top with vertical seams or details", "fitted-top", "shirts"],
      ["Outerwear", "A longer, structured jacket for clean vertical lines", "long-jacket", "coats"],
      ["Denim", "Straight-leg or tapered trousers in a dark wash", "straight-jeans", "jeans"]
    ],
    avoid: [
      "Clingy fabrics that cut across the middle",
      "Cropped, boxy cuts that shorten you",
      "Wide horizontal stripes and bulk at the waist"
    ]
  },
  "inverted-triangle": {
    name: "Inverted Triangle", article: "an",
    path: "M 23 56 C 23 78, 36 86, 36 104 C 36 122, 39 124, 39 142 C 39 160, 40 176, 60 176 C 80 176, 81 160, 81 142 C 81 124, 84 122, 84 104 C 84 86, 97 78, 97 56 C 97 50, 70 48, 69 46 L 51 46 C 50 48, 23 50, 23 56 Z",
    tagline: "Strong shoulders, ready to balance",
    goal: "Balance your shoulders.",
    proportions: [37, 24, 21],
    summary: "Your shoulders and bust are broader than your hips. Dressing it is about softening those strong shoulders and adding a little interest and volume to the lower half.",
    wear: [
      ["Neckline", "A V-neck that narrows and softens the shoulder line", "v-neck", "necklines"],
      ["Sleeve", "A fitted, tapered sleeve — no volume up top", "tapered-sleeve", "sleeves"],
      ["Bottom", "Wide-leg or flared trousers that build the lower half", "wide-trousers", "trousers"],
      ["Skirt", "An A-line skirt that adds gentle hip volume", "a-line-skirt", "skirts"]
    ],
    avoid: [
      "Broad boat necks and voluminous puff sleeves",
      "Shoulder pads or structure across the top",
      "Skinny bottoms that leave the balance top-heavy"
    ]
  },
  "pear": {
    name: "Pear", article: "a",
    path: "M 38 56 C 38 78, 36 86, 36 104 C 36 122, 22 124, 22 142 C 22 160, 40 176, 60 176 C 80 176, 98 160, 98 142 C 98 124, 84 122, 84 104 C 84 86, 82 78, 82 56 C 82 50, 70 48, 69 46 L 51 46 C 50 48, 38 50, 38 56 Z",
    tagline: "A lovely lower half to build around",
    goal: "Draw the eye upward.",
    proportions: [22, 24, 38],
    summary: "Your hips and thighs are fuller than your shoulders and bust. The goal is to draw the eye upward and let your top half catch up with your lovely lower half.",
    wear: [
      ["Neckline", "A wide boat or off-shoulder neckline to broaden the top", "boat-neck", "necklines"],
      ["Sleeve", "A structured or statement sleeve that builds the shoulders", "puff-sleeve", "sleeves"],
      ["Top", "A lighter, brighter top with detail up high", "fitted-top", "shirts"],
      ["Denim", "A dark straight-leg or bootcut in a deeper tone", "straight-jeans", "jeans"]
    ],
    avoid: [
      "Tight, pale or patterned bottoms that spotlight the hips",
      "Oversized tops that hide your waist",
      "Plain, minimal necklines with no interest up top"
    ]
  }
};
