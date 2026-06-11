/**
 * The single source of truth for everything sold on the site.
 *
 * Prices are integer cents and live ONLY here — the checkout API reads this
 * file on the server, so nothing the browser sends can alter a price.
 *
 * ── PRICE MATRIX TODO ─────────────────────────────────────────────────────
 * The old site listed one "from" price per print. Every variant below
 * currently uses that base price. If canvas or 11×14 should cost more,
 * set the `surchargeCents` on those options — nothing else needs to change.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type CollectionId = "studio-nord" | "cold-thread" | "artefakter";

export const COLLECTIONS: Record<
  CollectionId,
  { name: string; line: string }
> = {
  "studio-nord": {
    name: "Studio Nord",
    line: "Works on paper and canvas. Where the marks get made.",
  },
  "cold-thread": {
    name: "Cold Thread",
    line: "Wearable goods. The first thread is still on the loom.",
  },
  artefakter: {
    name: "Artefakter",
    line: "Objects with weight — wood, moss, found material.",
  },
};

export interface VariantOption {
  id: string;
  label: string;
  surchargeCents: number;
}

export interface VariantGroup {
  id: "material" | "size";
  label: string;
  options: VariantOption[];
}

export interface Piece {
  slug: string;
  name: string;
  collection: CollectionId;
  /** Base price in cents. Variant surcharges are added on top. */
  basePriceCents: number;
  /** True for one-of-one originals (no variants, no "from"). */
  original: boolean;
  /** The maker's note — Alexander's own words, lightly copyedited. */
  note: string;
  /** Short factual line for grids and metadata. */
  kind: string;
  image: { src: string; width: number; height: number; alt: string };
  variants?: VariantGroup[];
}

/** Shared print variants: material × size. */
const PRINT_VARIANTS: VariantGroup[] = [
  {
    id: "material",
    label: "Material",
    options: [
      { id: "paper", label: "Cold-pressed watercolor paper", surchargeCents: 0 },
      { id: "canvas", label: "Stretched canvas", surchargeCents: 0 },
    ],
  },
  {
    id: "size",
    label: "Size",
    options: [
      { id: "8x11", label: "8 × 11 in", surchargeCents: 0 },
      { id: "11x14", label: "11 × 14 in", surchargeCents: 0 },
    ],
  },
];

const CDN = "https://static1.squarespace.com/static/69f296d97d3ea35f26acc575/69f298c7c55f9e56047c4a77";
const IMG = "https://images.squarespace-cdn.com/content/v1/69f296d97d3ea35f26acc575";

export const PIECES: Piece[] = [
  {
    slug: "the-foundation",
    name: "The Foundation",
    collection: "artefakter",
    basePriceCents: 120000,
    original: true,
    kind: "Dimensional wall piece — layered wood block",
    note:
      "Built from layered wood blocks, The Foundation is a textural wall piece about structure, memory, and the quiet force beneath everything visible. Each raised fragment creates a shifting landscape of grain, shadow, and depth — a reminder that what holds us together is often assembled piece by piece.",
    image: {
      src: `${CDN}/6a1b78ee905a751a090680bc/1780185613428/IMG_2678.jpeg?format=1500w`,
      width: 1500,
      height: 1125,
      alt: "The Foundation — a relief of hundreds of small layered wood blocks in warm honey tones",
    },
  },
  {
    slug: "seeds-of-life",
    name: "Seeds of Life",
    collection: "artefakter",
    basePriceCents: 70000,
    original: true,
    kind: "Preserved-moss wall piece — Fibonacci spiral",
    note:
      "Built upon the natural, perfect order of the Fibonacci spiral, this piece is a reflection of the ordered beauty I see unfolding in my future. It is the fertile ground for the seeds of life I am now planting. The dreamcatcher hangs to filter through the wisdom and release the rest. The moss, rich and varied, represents a thriving, complex life.",
    image: {
      src: `${CDN}/6a1b771f5c8ba819bdaf2d34/1780185313293/IMG_5230.jpeg?format=1500w`,
      width: 1074,
      height: 721,
      alt: "Seeds of Life — preserved moss in varied greens arranged in a Fibonacci spiral",
    },
  },
  {
    slug: "light-in-the-labyrinth",
    name: "Light in the Labyrinth",
    collection: "studio-nord",
    basePriceCents: 10000,
    original: false,
    kind: "Vivid abstract mosaic — print or canvas",
    note:
      "To see the whole, you must first survive the breaking. We are not a single, solid thing; we are a mosaic of every storm we've weathered.",
    image: {
      src: `${CDN}/69f93172f691fe20c13ad3b2/1780177500010/Nelson%2C+Light+in+the+Labrynth.jpg?format=1500w`,
      width: 1296,
      height: 1728,
      alt: "Light in the Labyrinth — a vivid abstract mosaic of fractured color",
    },
    variants: PRINT_VARIANTS,
  },
  {
    slug: "the-invocation",
    name: "The Invocation",
    collection: "studio-nord",
    basePriceCents: 9000,
    original: false,
    kind: "Abstract maze — print or canvas",
    note: "Searching for the exit in a maze of my own mourning.",
    image: {
      src: `${IMG}/067d689f-692c-41c3-ae32-da2e0c796964/Nelson%2C+Maze+of+Mourning.jpg`,
      width: 1296,
      height: 1728,
      alt: "The Invocation — a dense labyrinth of dark linework",
    },
    variants: PRINT_VARIANTS,
  },
  {
    slug: "the-ego-death",
    name: "The Ego Death",
    collection: "studio-nord",
    basePriceCents: 7000,
    original: false,
    kind: "Psychedelic abstraction — print or canvas",
    note:
      "The self must be dismantled before the spirit can be designed. We fear the chaos because it looks like drowning, but it is actually the melting of the mask. To find the light, you must first become comfortable in the fire that burns the ego away.",
    image: {
      src: `${IMG}/c68df227-c46e-4ad8-b6c0-0861a8446d31/Nelson%252C%2BThe%2BEgo%2BDeath.jpg`,
      width: 1296,
      height: 1728,
      alt: "The Ego Death — saturated swirls of cobalt, green, red, and magenta",
    },
    variants: PRINT_VARIANTS,
  },
  {
    slug: "rebirth",
    name: "Rebirth",
    collection: "studio-nord",
    basePriceCents: 7000,
    original: false,
    kind: "Psychedelic abstraction — print or canvas",
    note:
      "I stopped trying to control the pencil and started listening to the flow. Rebirth isn't a soft start; it's a deliberate burn of everything.",
    image: {
      src: `${CDN}/69f93bfacfa3e81e12d6d5af/1780177409953/Nelson%2C+Rebirth.jpg?format=1500w`,
      width: 1296,
      height: 1728,
      alt: "Rebirth — organic psychedelic flow in saturated color",
    },
    variants: PRINT_VARIANTS,
  },
  {
    slug: "the-first-mark",
    name: "The First Mark",
    collection: "studio-nord",
    basePriceCents: 6500,
    original: false,
    kind: "Black-and-white mark-making — print or canvas",
    note:
      "The blueprint of a fever dream. This is where the walls between thought and form collapsed.",
    image: {
      src: `${CDN}/69f94c5da3780355a2ed1d24/1780177202436/Nelson%2C+The+First+Mack.jpg?format=1500w`,
      width: 1297,
      height: 1728,
      alt: "The First Mark — a dense field of black symbolic marks over a violet wash",
    },
    variants: PRINT_VARIANTS,
  },
  {
    slug: "the-bifrost-bridge",
    name: "The Bifrost Bridge",
    collection: "studio-nord",
    basePriceCents: 6000,
    original: false,
    kind: "Norse-inspired abstraction — print or canvas",
    note:
      "Transformation is messy, jagged, and loud — until it isn't. This is the bridge between who I was and who I am becoming. The blue static is the noise of the old world, but the runes are the steady ground. I am no longer just surviving the storm; I am building a way over it.",
    image: {
      src: `${IMG}/d09e0dc6-c4f6-44d6-b279-001f78d3beb3/Nelson%2C+The+Bifrost+Bridge.jpg`,
      width: 1296,
      height: 1728,
      alt: "The Bifrost Bridge — blue static broken by a steady line of runes",
    },
    variants: PRINT_VARIANTS,
  },
  {
    slug: "the-fertile-ashes",
    name: "The Fertile Ashes",
    collection: "studio-nord",
    basePriceCents: 5000,
    original: false,
    kind: "Norse-inspired drawing — print or canvas",
    note:
      "To reach the breakthrough, you must be willing to let the old version of yourself be the soil for the new one.",
    image: {
      src: `${CDN}/69f94b112f83637c43a8573d/1780177271775/Nelson%2C+The+Fertile+Ashes.jpg?format=1500w`,
      width: 1296,
      height: 1728,
      alt: "The Fertile Ashes — a graphite triangle inscribed with runes, green growth breaking through",
    },
    variants: PRINT_VARIANTS,
  },
];

export function getPiece(slug: string): Piece | undefined {
  return PIECES.find((p) => p.slug === slug);
}

export function piecesIn(collection: CollectionId): Piece[] {
  return PIECES.filter((p) => p.collection === collection);
}

/** Server-side price resolution. Throws on unknown ids — never trust the client. */
export function resolvePrice(
  piece: Piece,
  selection: Record<string, string> | undefined
): { unitAmountCents: number; description: string } {
  let total = piece.basePriceCents;
  const parts: string[] = [];

  for (const group of piece.variants ?? []) {
    const chosenId = selection?.[group.id];
    const option = group.options.find((o) => o.id === chosenId);
    if (!option) {
      throw new Error(`Missing or invalid option for "${group.label}".`);
    }
    total += option.surchargeCents;
    parts.push(option.label);
  }

  return {
    unitAmountCents: total,
    description: parts.length > 0 ? parts.join(" · ") : piece.kind,
  };
}

export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return dollars % 1 === 0
    ? `$${dollars.toLocaleString("en-US")}`
    : `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}
