import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  COLLECTIONS,
  PIECES,
  formatPrice,
  getPiece,
  type CollectionId,
} from "@/lib/catalog";

/* Hero photograph: Bryggen, Bergen — the colorful harbor houses the
   haus is named for. Via Unsplash (free license, hotlink intended). */
const HERO_PHOTO =
  "https://images.unsplash.com/photo-1574931635935-049c8814c881?q=80&w=2400&auto=format&fit=crop";

const FEATURED = ["the-ego-death", "the-bifrost-bridge", "the-invocation"]
  .map(getPiece)
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const COLLECTION_IDS = Object.keys(
  COLLECTIONS
) as (keyof typeof COLLECTIONS)[];

const ORIGINALS = PIECES.filter((p) => p.original);

/* Each collection fronted by one of its own pieces. */
const COLLECTION_COVERS: Record<CollectionId, string> = {
  "studio-nord": "light-in-the-labyrinth",
  "cold-thread": "the-first-mark",
  artefakter: "the-foundation",
};

function firstSentence(s: string): string {
  return s.split(/(?<=\.)\s/)[0];
}

export default function Home() {
  return (
    <>
      {/* Full-bleed Nordic harbor, wordmark in bone on the water,
          left-aligned to the same edge as everything below it. */}
      <section className="hero-media" aria-label="anomalihaus">
        <Image
          src={HERO_PHOTO}
          alt="Bryggen in Bergen, Norway — a row of colorful wooden harbor houses reflected in still water beneath an autumn hillside"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-mark container">
          <p className="kicker">Atlanta art collective · named for the north</p>
          <p className="hero-word" aria-hidden="true">
            anomalihaus
          </p>
        </div>
      </section>

      {/* Thesis + action rail */}
      <section className="hero-under container">
        <div className="hero-grid">
          <h1 className="hero-statement">
            A haus for the work that doesn&rsquo;t fit.
          </h1>
          <div className="hero-aside">
            <p className="muted">
              Original abstract works, rune-marked drawings, and living moss
              pieces. Every piece is made once, named once, and sent out with
              its story.
            </p>
            <div className="hero-ctas">
              <Link href="/havn-goods" className="button">
                See Havn Goods
              </Link>
              <Link href="/havn-goods?c=artefakter" className="button button--quiet">
                Own an original
              </Link>
            </div>
            <p className="price-anchor">
              Originals from $700 · Prints from $50
            </p>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust">
        <div className="container trust-inner">
          <p className="trust-item">One-of-one originals</p>
          <p className="trust-item">Made in Atlanta, Georgia</p>
          <p className="trust-item">Secure checkout via Stripe</p>
        </div>
      </div>

      {/* Featured pieces */}
      <section className="section container" aria-labelledby="featured">
        <div className="section-head">
          <div>
            <p className="kicker">Featured pieces</p>
            <h2 id="featured">Three doors in.</h2>
          </div>
          <Link href="/havn-goods" className="section-head-link">
            All nine pieces →
          </Link>
        </div>
        <ul className="work-grid work-grid--three">
          {FEATURED.map((piece) => (
            <Reveal as="li" key={piece.slug}>
              <Link href={`/havn-goods/${piece.slug}`} className="work-card">
                <Image
                  src={piece.image.src}
                  alt={piece.image.alt}
                  width={piece.image.width}
                  height={piece.image.height}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="work-caption">
                  <h3>{piece.name}</h3>
                  <span className="work-price">
                    {piece.original ? "" : "from "}
                    {formatPrice(piece.basePriceCents)}
                  </span>
                </div>
                <p className="work-kind">{piece.kind}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* His words, set huge */}
      <section className="invocation-band" aria-label="From The Ego Death">
        <div className="container section">
          <Reveal>
            <blockquote>
              &ldquo;To find the light, you must first become comfortable in
              the fire that burns the ego away.&rdquo;
              <cite>
                — from{" "}
                <Link href="/havn-goods/the-ego-death">The Ego Death</Link>,
                prints from $70
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* The originals — where the page closes the deal */}
      <section className="section container" aria-labelledby="originals">
        <div className="section-head">
          <div>
            <p className="kicker">One of one</p>
            <h2 id="originals">The originals.</h2>
          </div>
          <p className="section-head-link muted">When one sells, it&rsquo;s gone.</p>
        </div>
        <ul className="work-grid">
          {ORIGINALS.map((piece) => (
            <Reveal as="li" key={piece.slug} className="original-card">
              <span className="badge">One of one</span>
              <Link href={`/havn-goods/${piece.slug}`} className="work-card">
                <Image
                  src={piece.image.src}
                  alt={piece.image.alt}
                  width={piece.image.width}
                  height={piece.image.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="work-caption">
                  <h3>{piece.name}</h3>
                  <span className="work-price">
                    {formatPrice(piece.basePriceCents)}
                  </span>
                </div>
              </Link>
              <p className="original-excerpt">{firstSentence(piece.note)}</p>
              <div className="original-cta">
                <Link
                  href={`/havn-goods/${piece.slug}`}
                  className="button button--quiet"
                >
                  See it up close
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Collections */}
      <section className="invocation-band" aria-labelledby="collections">
        <div className="section container">
          <div className="section-head">
            <div>
              <p className="kicker">Havn Goods</p>
              <h2 id="collections">Three collections, one haus.</h2>
            </div>
          </div>
          <div className="collections">
            {COLLECTION_IDS.map((id) => {
              const c = COLLECTIONS[id];
              const count = PIECES.filter((p) => p.collection === id).length;
              const cover = getPiece(COLLECTION_COVERS[id]);
              return (
                <Reveal key={id}>
                  <Link href={`/havn-goods?c=${id}`} className="collection-card">
                    {cover && (
                      <Image
                        src={cover.image.src}
                        alt={cover.image.alt}
                        width={cover.image.width}
                        height={cover.image.height}
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    )}
                    <h3>{c.name}</h3>
                    <p className="work-kind">{c.line}</p>
                    <p className="collection-count">
                      {count > 0 ? `${count} pieces` : "Coming"}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The practice — why this is worth owning */}
      <section className="section container" aria-labelledby="practice">
        <Reveal>
          <div className="split">
            <div>
              <p className="kicker">The practice</p>
              <h2 id="practice" style={{ marginTop: "var(--s-2)" }}>
                Marks first. Shop later.
              </h2>
            </div>
            <div className="split-body">
              <p>
                Nothing here started as a product. Each piece began as
                something that had to get out — an ego death, a mourning, a
                bridge to whoever comes next. The names are Norse because the
                north knows long winters and what follows them.
              </p>
              <p>
                When a piece leaves the studio, its story goes with it.
                You&rsquo;re not decorating a wall. You&rsquo;re keeping a
                record of someone&rsquo;s becoming — and maybe starting your
                own.
              </p>
              <Link href="/havn-goods" className="button">
                Find your piece
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
