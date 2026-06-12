import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPiece } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "About",
  description:
    "anomalihaus is an Atlanta art collective making original abstract work, dimensional pieces, and objects for individual expression.",
};

/* Bryggen in full sun — a different mood than the homepage's autumn
   reflection. Via Unsplash (free license). */
const BRYGGEN_SUN =
  "https://images.unsplash.com/photo-1645564386021-0db0dd3e2ad7?q=80&w=2400&auto=format&fit=crop";

/* Flat color fields sampled from the work. The site's quiet tokens
   (moss, fjord) come from these same pieces — this is the receipts. */
const PALETTE: {
  name: string;
  hex: string;
  piece: string;
  slug: string;
}[] = [
  { name: "Cobalt", hex: "#2E5FA3", piece: "The Ego Death", slug: "the-ego-death" },
  { name: "Ember", hex: "#C2492F", piece: "Rebirth", slug: "rebirth" },
  { name: "Moss", hex: "#3F5436", piece: "Seeds of Life", slug: "seeds-of-life" },
  { name: "Violet", hex: "#9486AD", piece: "The First Mark", slug: "the-first-mark" },
  { name: "Honey", hex: "#C68B45", piece: "The Foundation", slug: "the-foundation" },
  { name: "Fjord", hex: "#4E626C", piece: "The Bifrost Bridge", slug: "the-bifrost-bridge" },
];

const FOUNDER_PIECE = getPiece("rebirth")!;

/* "anomalihaus" in Elder Futhark — ᚨ ᚾ ᛟ ᛗ ᚨ ᛚ ᛁ ᚺ ᚨ ᚢ ᛊ.
   Each glyph is drawn as bare strokes (runes are straight lines),
   local coords centered on (0,0), ~30 units tall. */
const RUNE_WHEEL: string[][] = [
  // ᚨ ansuz — a (the anomaly: drawn in moss)
  ["M0 -15 L0 15", "M0 -12 L11 -4", "M0 -2 L11 6"],
  // ᚾ nauthiz — n
  ["M0 -15 L0 15", "M-8 -6 L8 2"],
  // ᛟ othala — o
  ["M0 -14 L9 -5 L0 4 L-9 -5 Z", "M-8 14 L-2 6", "M8 14 L2 6"],
  // ᛗ mannaz — m
  ["M-8 -15 L-8 15", "M8 -15 L8 15", "M-8 -15 L8 -3", "M8 -15 L-8 -3"],
  // ᚨ ansuz — a
  ["M0 -15 L0 15", "M0 -12 L11 -4", "M0 -2 L11 6"],
  // ᛚ laguz — l
  ["M0 -15 L0 15", "M0 -15 L10 -5"],
  // ᛁ isa — i
  ["M0 -15 L0 15"],
  // ᚺ hagalaz — h
  ["M-8 -15 L-8 15", "M8 -15 L8 15", "M-8 -2 L8 -7"],
  // ᚨ ansuz — a
  ["M0 -15 L0 15", "M0 -12 L11 -4", "M0 -2 L11 6"],
  // ᚢ uruz — u
  ["M-8 15 L-8 -14", "M-8 -14 L8 -4", "M8 -4 L8 15"],
  // ᛊ sowilo — s
  ["M6 -15 L-4 -6 L6 2 L-4 11"],
];

/* Deterministic leaf field — palette tones drifting down behind the
   opener. Pure CSS animation; hidden for prefers-reduced-motion. */
const LEAVES: {
  x: string;
  dur: string;
  delay: string;
  sway: string;
  c: string;
  s: number;
  o: number;
}[] = [
  { x: "4%", dur: "17s", delay: "0s", sway: "38px", c: "#C68B45", s: 1, o: 0.5 },
  { x: "14%", dur: "21s", delay: "-9s", sway: "-30px", c: "#3F5436", s: 0.8, o: 0.45 },
  { x: "26%", dur: "15s", delay: "-4s", sway: "26px", c: "#C2492F", s: 0.7, o: 0.4 },
  { x: "38%", dur: "23s", delay: "-14s", sway: "-42px", c: "#C68B45", s: 0.9, o: 0.35 },
  { x: "52%", dur: "18s", delay: "-2s", sway: "34px", c: "#4E626C", s: 0.8, o: 0.4 },
  { x: "63%", dur: "16s", delay: "-11s", sway: "-24px", c: "#C2492F", s: 1, o: 0.45 },
  { x: "74%", dur: "22s", delay: "-6s", sway: "40px", c: "#3F5436", s: 0.7, o: 0.4 },
  { x: "85%", dur: "19s", delay: "-16s", sway: "-34px", c: "#C68B45", s: 0.85, o: 0.5 },
  { x: "94%", dur: "24s", delay: "-8s", sway: "28px", c: "#9486AD", s: 0.75, o: 0.35 },
];

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="leaves" aria-hidden="true">
          {LEAVES.map((leaf, i) => (
            <span
              key={i}
              className="leaf"
              style={
                {
                  left: leaf.x,
                  background: leaf.c,
                  "--dur": leaf.dur,
                  "--delay": leaf.delay,
                  "--sway": leaf.sway,
                  "--s": leaf.s,
                  "--o": leaf.o,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="container section about-hero-inner">
          <div className="about-opener">
            <div className="about-opener-text">
              <div>
                <p className="kicker">About</p>
                <h1 style={{ marginTop: "var(--s-2)" }}>
                  A haus for anomalies.
                </h1>
              </div>
              <p className="lede">
                anomalihaus is an art collective built around one conviction:
                the things that don&rsquo;t fit are the things worth keeping.
              </p>
              <p>
                We make original abstract works, dimensional wall pieces,
                preserved moss, and objects for people who want their walls
                to say something true. The work deals in transformation — ego
                death, mourning, rebirth, the bridge between who you were and
                who you&rsquo;re becoming.
              </p>
              <p>
                The haus is in Atlanta, and it is built to grow:
                collaborators, makers, photographers, and strays are welcome
                — <Link href="/contact">write to us</Link>.
              </p>
            </div>
            <figure className="anomaly-figure about-wheel">
                <svg
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="A slowly turning wheel of eleven runes spelling anomalihaus — one rune in moss green"
                >
                  <g className="rune-wheel-spin">
                    {/* Two hairline rings hold the letters. */}
                    <circle
                      cx="200"
                      cy="200"
                      r="174"
                      fill="none"
                      stroke="#16181A"
                      strokeOpacity="0.13"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="110"
                      fill="none"
                      stroke="#16181A"
                      strokeOpacity="0.13"
                    />
                    {/* a-n-o-m-a-l-i-h-a-u-s in Elder Futhark. */}
                    {RUNE_WHEEL.map((rune, i) => {
                      const angle = (360 / RUNE_WHEEL.length) * i;
                      const isAnomaly = i === 0;
                      return (
                        <g key={i} transform={`rotate(${angle} 200 200)`}>
                          <g
                            transform="translate(200 58)"
                            stroke={isAnomaly ? "#3F5436" : "#16181A"}
                            strokeOpacity={isAnomaly ? "1" : "0.42"}
                            strokeWidth={isAnomaly ? "4.5" : "4"}
                            strokeLinecap="square"
                            fill="none"
                          >
                            {rune.map((d, j) => (
                              <path key={j} d={d} />
                            ))}
                          </g>
                        </g>
                      );
                    })}
                  </g>
                  {/* The still point at the center. */}
                  <circle cx="200" cy="200" r="3.5" fill="#3F5436" />
                </svg>
                <figcaption className="anomaly-caption">
                  anomalihaus, in the old letters. One rune runs moss — the
                  anomaly is the point.
                </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The north, in full color */}
      <div className="photo-band">
        <Image
          src={BRYGGEN_SUN}
          alt="Bryggen in Bergen, Norway in full sun — a row of red, ochre, teal, and white wooden harbor houses above blue water"
          fill
          sizes="100vw"
        />
      </div>
      <div className="container">
        <p className="photo-caption">
          Bryggen, Bergen. The names are Norse because the north knows long
          winters — and what follows them.
        </p>
      </div>

      {/* The palette, with receipts */}
      <section className="section container" aria-labelledby="palette">
        <div className="section-head">
          <div>
            <p className="kicker">From the work</p>
            <h2 id="palette">The colors we keep.</h2>
          </div>
          <Link href="/havn-goods" className="section-head-link">
            See the pieces →
          </Link>
        </div>
        <ul className="palette">
          {PALETTE.map((c) => (
            <Reveal as="li" key={c.name}>
              <Link href={`/havn-goods/${c.slug}`} className="swatch">
                <div
                  className="swatch-chip"
                  style={{ background: c.hex }}
                  aria-hidden="true"
                />
                <p className="swatch-name">{c.name}</p>
                <p className="swatch-source">{c.piece}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
        <p
          className="muted small"
          style={{ marginTop: "var(--s-4)", maxWidth: "52ch" }}
        >
          Every tone on this site is pulled from a piece in the haus — the
          moss in the buttons, the fjord in the captions. The work came
          first. It always does.
        </p>
      </section>

      {/* Founder, beside the work */}
      <section className="invocation-band" aria-labelledby="founder">
        <div className="container section">
          <Reveal>
            <div className="founder-grid">
              <blockquote className="invocation">
                <p className="kicker" id="founder">
                  From the founder
                </p>
                <p>
                  Every piece in this haus started as something I needed to
                  get out, not something I planned to sell. The marks came
                  first; the shop came later. If one of them is the bridge
                  for you that it was for me, it belongs on your wall, not in
                  my studio.
                </p>
                <cite className="muted small" style={{ fontStyle: "normal" }}>
                  — Alexander Nelson, founding artist
                </cite>
              </blockquote>
              <Link href={`/havn-goods/${FOUNDER_PIECE.slug}`}>
                <Image
                  src={FOUNDER_PIECE.image.src}
                  alt={FOUNDER_PIECE.image.alt}
                  width={FOUNDER_PIECE.image.width}
                  height={FOUNDER_PIECE.image.height}
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section container" aria-labelledby="made-it-out">
        <div className="section-head">
          <div>
            <p className="kicker">From the haus</p>
            <h2 id="made-it-out">A few that made it out.</h2>
          </div>
          <Link href="/havn-goods" className="section-head-link">
            All nine pieces →
          </Link>
        </div>
        <ul className="mini-grid">
          {["the-ego-death", "the-foundation", "light-in-the-labyrinth", "the-fertile-ashes"].map(
            (slug) => {
              const piece = getPiece(slug)!;
              return (
                <Reveal as="li" key={slug}>
                  <Link href={`/havn-goods/${slug}`}>
                    <Image
                      src={piece.image.src}
                      alt={piece.image.alt}
                      width={piece.image.width}
                      height={piece.image.height}
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <p className="mini-name">{piece.name}</p>
                  </Link>
                </Reveal>
              );
            }
          )}
        </ul>
      </section>
    </>
  );
}
