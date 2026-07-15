/* ────────────────────────────────────────────────────────────────────────
   Central body-shape configuration. One record per shape powers the single
   reusable result-page template (assets/result.js). All copy is original and
   editable here. `path` is the parametric silhouette (120×200 viewBox) used
   as the real body figure; clothing illustrations are labelled placeholders
   until Rita's original assets are supplied (see EditorialImage in result.js).
   ──────────────────────────────────────────────────────────────────────── */
window.SHAPE_ORDER = ["hourglass", "pear", "rectangle", "inverted-triangle", "oval"];

window.SHAPES = {
  "hourglass": {
    name: "Hourglass", article: "an",
    path: "M 27 56 C 27 78, 41 86, 41 104 C 41 122, 27 124, 27 142 C 27 160, 40 176, 60 176 C 80 176, 93 160, 93 142 C 93 124, 79 122, 79 104 C 79 86, 93 78, 93 56 C 93 50, 70 48, 69 46 L 51 46 C 50 48, 27 50, 27 56 Z",
    proportions: [33, 19, 33],
    heroSummary: "Your shoulders and hips appear naturally balanced, while your waist is clearly defined. Your strongest outfits preserve that balance and follow your curves without hiding or overwhelming them.",
    characteristics: [
      "Shoulders and hips are similar in width",
      "Waist is visibly narrower",
      "Bust and hips create natural curves",
      "Upper and lower body appear balanced"
    ],
    annotations: [
      { title: "Balanced shoulders", description: "Your shoulder line sits close in width to your hips, creating a naturally even frame.", anchor: { x: 88, y: 56 } },
      { title: "Defined waist", description: "Your waist is visibly narrower than your bust and hips — the feature worth highlighting.", anchor: { x: 34, y: 106 } },
      { title: "Proportionate hips", description: "Your hips mirror your shoulders, completing a balanced, curved silhouette.", anchor: { x: 88, y: 144 } }
    ],
    stylingGoal: "Highlight your waist while preserving the natural balance between your shoulders and hips.",
    workWith: [
      "Define the waist with belts, wraps and seams",
      "Choose fabrics that skim your curves rather than cling",
      "Keep shoulders and hips in visual balance",
      "Let tailored shapes follow your natural line"
    ],
    beCareful: [
      "Very boxy or oversized pieces that hide the waist",
      "Stiff, unstructured fabrics that flatten your curves",
      "Drop-waist styles that shift the eye off your waist"
    ],
    generalCaution: "Very boxy or oversized pieces can hide the waist and reduce the definition that characterises the silhouette.",
    avoid: {
      necklines: [
        { name: "High funnel neck", explanation: "Closes off the upper body and can flatten the open, balanced line that softer necklines create." },
        { name: "Heavily padded shoulder neckline", explanation: "Adds width across the top and can tip your balanced frame slightly top-heavy." }
      ],
      trousers: [
        { name: "Drop-crotch trouser", explanation: "Adds volume through the hip and thigh and can blur your defined waist-to-hip line." },
        { name: "Low-rise straight", explanation: "Sits below your natural waist and can hide the very feature that defines your shape." }
      ],
      jackets: [
        { name: "Boxy oversized blazer", explanation: "Squares off the torso and can conceal your waist entirely." },
        { name: "Straight duster with no shaping", explanation: "Drops a long vertical line over your curves and hides the waist." }
      ],
      shirts: [
        { name: "Oversized tunic", explanation: "Skims past the waist and can make a curved silhouette read straighter." },
        { name: "Stiff boxy button-down", explanation: "Holds a square line that works against your natural curve." }
      ],
      dresses: [
        { name: "Shift dress", explanation: "Falls straight from the shoulders and can bypass your waist altogether." },
        { name: "Drop-waist dress", explanation: "Moves the seam below your natural waist and can pull the torso out of balance." }
      ]
    }
  },

  "pear": {
    name: "Pear", article: "a",
    path: "M 38 56 C 38 78, 36 86, 36 104 C 36 122, 22 124, 22 142 C 22 160, 40 176, 60 176 C 80 176, 98 160, 98 142 C 98 124, 84 122, 84 104 C 84 86, 82 78, 82 56 C 82 50, 70 48, 69 46 L 51 46 C 50 48, 38 50, 38 56 Z",
    proportions: [22, 24, 38],
    heroSummary: "Your hips appear wider than your shoulders, with more visual weight through the lower half of the body. Your strongest outfits create balance by drawing the eye upward and keeping the lower silhouette clean.",
    characteristics: [
      "Hips are wider than shoulders",
      "Waist is usually visible",
      "Lower body carries more visual volume",
      "Upper body appears narrower or more delicate"
    ],
    annotations: [
      { title: "Narrower shoulders", description: "Your shoulder line reads a little narrower than your hips, so a touch of interest up top brings balance.", anchor: { x: 84, y: 56 } },
      { title: "Visible waist", description: "Your waist is usually defined — worth keeping in view as you balance the halves.", anchor: { x: 34, y: 106 } },
      { title: "Fuller hips", description: "Most of your visual weight sits through the hips and thighs, the area to keep clean and elongated.", anchor: { x: 92, y: 146 } }
    ],
    stylingGoal: "Draw attention toward the upper body while creating a clean, elongated line through the hips and legs.",
    workWith: [
      "Add colour, detail or wider necklines up top",
      "Keep the lower half in clean, darker, simple lines",
      "Draw the eye upward with shoulder interest",
      "Let bottoms skim past the hip rather than cling"
    ],
    beCareful: [
      "Extra volume or bright colour around the hip",
      "Horizontal emphasis at the widest point",
      "Clingy fabrics through the lower half"
    ],
    generalCaution: "Extra volume, strong details or horizontal emphasis around the hips can make the lower half appear visually heavier.",
    avoid: {
      necklines: [
        { name: "Narrow scoop close to the neck", explanation: "Keeps the shoulder line narrow when the aim is to broaden it a little." },
        { name: "Plain, detail-free neckline", explanation: "Misses the chance to add the upper-body interest that balances fuller hips." }
      ],
      trousers: [
        { name: "Pale or shiny skinny trouser", explanation: "Catches the light at the hip and thigh and draws the eye to the widest point." },
        { name: "Hip-pocket or cargo detailing", explanation: "Adds bulk exactly where you are aiming to keep the line clean." }
      ],
      jackets: [
        { name: "Cropped jacket ending at the hip", explanation: "Cuts the eye straight across the fullest part of the hip." },
        { name: "Peplum flaring over the hip", explanation: "Adds extra volume where the silhouette is already full." }
      ],
      shirts: [
        { name: "Top that ends at the hip line", explanation: "Draws a horizontal line across the widest point." },
        { name: "Clingy jersey over the hip", explanation: "Follows the hip closely rather than skimming past it." }
      ],
      dresses: [
        { name: "Bodycon through the hip", explanation: "Holds tight to the fullest part instead of gliding over it." },
        { name: "Heavily tiered or gathered skirt", explanation: "Piles volume onto the lower half." }
      ]
    }
  },

  "rectangle": {
    name: "Rectangle", article: "a",
    path: "M 32 56 C 32 78, 35 86, 35 104 C 35 122, 32 124, 32 142 C 32 160, 40 176, 60 176 C 80 176, 88 160, 88 142 C 88 124, 85 122, 85 104 C 85 86, 88 78, 88 56 C 88 50, 70 48, 69 46 L 51 46 C 50 48, 32 50, 32 56 Z",
    proportions: [28, 25, 28],
    heroSummary: "Your shoulders, waist and hips appear relatively aligned, creating a naturally straight and balanced silhouette. Your strongest outfits introduce definition and shape without overwhelming your frame.",
    characteristics: [
      "Shoulders and hips are similar in width",
      "Waist has less visible indentation",
      "Silhouette appears straight",
      "Visual weight is evenly distributed"
    ],
    annotations: [
      { title: "Even shoulders", description: "Your shoulders and hips sit at a similar width, giving a clean, straight frame.", anchor: { x: 86, y: 56 } },
      { title: "Softly defined waist", description: "Your waist indents gently — the place to build a little contrast and shape.", anchor: { x: 36, y: 106 } },
      { title: "Balanced hips", description: "Your lower body echoes your shoulder width, keeping weight evenly distributed.", anchor: { x: 86, y: 144 } }
    ],
    stylingGoal: "Create definition and the appearance of curves while maintaining your naturally balanced proportions.",
    workWith: [
      "Build curves with peplums, wraps and ruching",
      "Define a waist with belts and seaming",
      "Add texture and detail for dimension",
      "Create gentle contrast top and bottom"
    ],
    beCareful: [
      "Very straight, shapeless cuts",
      "Flat, detail-free fabrics",
      "Pieces that simply repeat your vertical line"
    ],
    generalCaution: "Very straight, shapeless pieces can repeat the body's vertical lines without creating any waist or dimensional contrast.",
    avoid: {
      necklines: [
        { name: "Plain high crew", explanation: "Adds another straight line to a naturally straight frame." },
        { name: "Stiff funnel neck", explanation: "Keeps the upper body boxy when a softer, more open shape adds dimension." }
      ],
      trousers: [
        { name: "Straight-leg with no detail", explanation: "Repeats the body's vertical line without adding shape." },
        { name: "Flat-front, minimal trouser", explanation: "Skips the detail that could build the impression of curves." }
      ],
      jackets: [
        { name: "Straight boxy blazer", explanation: "Echoes the straight torso instead of carving a waist." },
        { name: "Collarless straight cardigan", explanation: "Falls in a straight line with nothing to suggest a waist." }
      ],
      shirts: [
        { name: "Boxy untucked tee", explanation: "Hangs straight and hides any hint of a waist." },
        { name: "Loose shapeless blouse", explanation: "Adds fabric without adding form." }
      ],
      dresses: [
        { name: "Straight shift", explanation: "Follows the frame's straight line with no definition." },
        { name: "Column dress with no waist seam", explanation: "Reads as one straight line from top to bottom." }
      ]
    }
  },

  "inverted-triangle": {
    name: "Inverted Triangle", article: "an",
    path: "M 23 56 C 23 78, 36 86, 36 104 C 36 122, 39 124, 39 142 C 39 160, 40 176, 60 176 C 80 176, 81 160, 81 142 C 81 124, 84 122, 84 104 C 84 86, 97 78, 97 56 C 97 50, 70 48, 69 46 L 51 46 C 50 48, 23 50, 23 56 Z",
    proportions: [37, 24, 21],
    heroSummary: "Your shoulders or upper torso appear broader than your hips, giving the upper body more visual presence. Your strongest outfits soften the shoulder line and create balance below the waist.",
    characteristics: [
      "Shoulders are wider than hips",
      "Upper body has stronger visual presence",
      "Hips and lower body appear narrower",
      "Waist definition can vary"
    ],
    annotations: [
      { title: "Broader shoulders", description: "Your shoulder line is your strongest visual point, so softer necklines help balance it.", anchor: { x: 92, y: 56 } },
      { title: "Central waist", description: "Your waist sits between a broad top and a slimmer base — a useful point to draw the eye toward.", anchor: { x: 34, y: 106 } },
      { title: "Narrower hips", description: "Your lower body reads slimmer, so gentle volume here creates balance.", anchor: { x: 82, y: 144 } }
    ],
    stylingGoal: "Keep the upper body visually clean while adding shape, movement or interest below the waist.",
    workWith: [
      "Soften the shoulder line with V and scoop necks",
      "Add volume below with fuller skirts and wide legs",
      "Keep the upper body clean and uncluttered",
      "Draw the eye downward with lower-half detail"
    ],
    beCareful: [
      "Shoulder padding and built-up structure",
      "Puff or statement sleeves",
      "Slim, plain bottoms that keep the base narrow"
    ],
    generalCaution: "Strong shoulder details, high-volume sleeves or wide upper-body lines can exaggerate the difference between the shoulders and hips.",
    avoid: {
      necklines: [
        { name: "Wide boat neck", explanation: "Extends the shoulder line and emphasises an already-broad upper body." },
        { name: "Halter or high slash", explanation: "Broadens across the top where the aim is to soften." }
      ],
      trousers: [
        { name: "Dark plain skinny", explanation: "Keeps the lower half narrow against already-strong shoulders." },
        { name: "Slim cigarette with no detail", explanation: "Misses the chance to add welcome volume below." }
      ],
      jackets: [
        { name: "Structured or padded shoulder", explanation: "Reinforces the broad shoulder line." },
        { name: "Gathered sleeve-head jacket", explanation: "Adds volume exactly where there is already width." }
      ],
      shirts: [
        { name: "Puff-sleeve or statement shoulder", explanation: "Widens the upper body further." },
        { name: "Bold horizontal stripe across the chest", explanation: "Draws the eye wide across the shoulders." }
      ],
      dresses: [
        { name: "Shoulder-heavy detailing", explanation: "Concentrates interest at the top of the silhouette." },
        { name: "Column with a narrow skirt", explanation: "Keeps the lower half slim against a broad top." }
      ]
    }
  },

  "oval": {
    name: "Oval", article: "an",
    path: "M 35 56 C 35 78, 25 86, 25 104 C 25 122, 33 124, 33 142 C 33 160, 40 176, 60 176 C 80 176, 87 160, 87 142 C 87 124, 95 122, 95 104 C 95 86, 85 78, 85 56 C 85 50, 70 48, 69 46 L 51 46 C 50 48, 35 50, 35 56 Z",
    proportions: [25, 35, 27],
    heroSummary: "Your midsection carries the most visual fullness, while your shoulders and legs may appear comparatively narrower. Your strongest outfits create a long, clean line and add gentle definition without clinging to the waist.",
    characteristics: [
      "Midsection has the most visual fullness",
      "Waist is less visibly defined",
      "Shoulders and hips can appear softly rounded",
      "Legs may appear relatively slender"
    ],
    annotations: [
      { title: "Softly rounded shoulders", description: "Your shoulders read gently rounded, so an open neckline keeps the line long.", anchor: { x: 86, y: 56 } },
      { title: "Full midsection", description: "Most of your visual fullness sits here — the area to skim rather than cling to.", anchor: { x: 34, y: 108 } },
      { title: "Slender legs", description: "Your legs often read slim, a lovely feature to bring forward.", anchor: { x: 86, y: 150 } }
    ],
    stylingGoal: "Create a long, clean vertical line and gentle structure while keeping the midsection clean and comfortable.",
    workWith: [
      "Create a long vertical line through the outfit",
      "Define gently with open necks and structured layers",
      "Keep the midsection skimmed, not clung",
      "Bring the eye to the legs and neckline"
    ],
    beCareful: [
      "Clingy fabrics across the midsection",
      "Bulky waist details or wide, tight belts",
      "Pieces that end at the widest part of the torso"
    ],
    generalCaution: "Clingy fabrics, bulky waist details or pieces that end at the widest part of the torso can concentrate attention around the midsection.",
    avoid: {
      necklines: [
        { name: "High, tight crew", explanation: "Shortens the neckline and closes off the long vertical line." },
        { name: "Chunky cowl at the throat", explanation: "Adds bulk high on the body and shortens the frame." }
      ],
      trousers: [
        { name: "Clingy or shiny at the waist", explanation: "Catches attention around the midsection." },
        { name: "Front-pleats gathered at the waist", explanation: "Add fabric where you are keeping the line clean." }
      ],
      jackets: [
        { name: "Cropped jacket ending at the waist", explanation: "Cuts across the fullest part of the torso." },
        { name: "Jacket cinched with a wide belt", explanation: "Draws a hard line around the midsection." }
      ],
      shirts: [
        { name: "Clingy jersey through the middle", explanation: "Follows the midsection instead of skimming it." },
        { name: "Top ending at the widest part", explanation: "Stops the eye at the fullest point." }
      ],
      dresses: [
        { name: "Bodycon through the waist", explanation: "Holds tight to the midsection." },
        { name: "Heavy waist gathering or wide belt", explanation: "Concentrates volume and attention at the centre." }
      ]
    }
  }
};
