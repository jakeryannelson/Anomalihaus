import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { COLLECTIONS, PIECES, formatPrice, getPiece } from "@/lib/catalog";

const HERO = getPiece("the-foundation")!;
const FEATURED = ["the-ego-death", "the-bifrost-bridge", "the-invocation"]
  .map(getPiece)
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function Home() {
  return (
    <>
      {/* The hero is the work itself — no stock Norway, no slogan slide. */}
      <section className="hero" aria-label="anomalihaus">
        <div className="hero-media">
          <Image
            src={HERO.image.src}
            alt={HERO.image.alt}
            fill
            priority
            sizes="100vw"
          />
          <p className="hero-title" aria-hidden="true">
            anomalihaus
          </p>
        </div>
        <div className="container hero-under">
          <div className="hero-grid">
            <h1 className="hero-statement">
              A haus for the work that doesn&rsquo;t fit.
            </h1>
            <div className="hero-aside">
              <p className="muted">
                Original abstract works, dimensional wall pieces, preserved
                moss, and objects made for individual expression. An art
                collective, built in Atlanta.
              </p>
              <Link href="/havn-goods" className="button">
                See Havn Goods
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured pieces */}
      <section className="section container" aria-labelledby="featured">
        <div className="stack" style={{ marginBottom: "var(--s-5)" }}>
          <p className="kicker">Featured pieces</p>
          <h2 id="featured">Three doors in.</h2>
        </div>
        <ul className="work-grid">
          {FEATURED.map((piece) => (
            <Reveal as="li" key={piece.slug}>
              <Link
                href={`/havn-goods/${piece.slug}`}
                className="work-card"
              >
                <figure>
                  <Image
                    src={piece.image.src}
                    alt={piece.image.alt}
                    width={piece.image.width}
                    height={piece.image.height}
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                  <figcaption>
                    <h3>{piece.name}</h3>
                    <span className="work-price">
                      {piece.original ? "" : "from "}
                      {formatPrice(piece.basePriceCents)}
                    </span>
                  </figcaption>
                  <p className="work-kind">{piece.kind}</p>
                </figure>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="container">
        <hr className="rule" />
      </div>

      {/* Collections */}
      <section className="section container" aria-labelledby="collections">
        <div className="stack" style={{ marginBottom: "var(--s-5)" }}>
          <p className="kicker">Havn Goods</p>
          <h2 id="collections">Three collections, one haus.</h2>
        </div>
        <div
          style={{
            display: "grid",
            gap: "var(--s-4)",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {(
            Object.entries(COLLECTIONS) as [
              keyof typeof COLLECTIONS,
              (typeof COLLECTIONS)[keyof typeof COLLECTIONS],
            ][]
          ).map(([id, c]) => {
            const count = PIECES.filter((p) => p.collection === id).length;
            return (
              <Reveal key={id}>
                <Link
                  href={`/havn-goods?c=${id}`}
                  className="work-card"
                  style={{
                    borderTop: "1px solid var(--hairline)",
                    paddingTop: "var(--s-2)",
                    display: "block",
                  }}
                >
                  <h3>{c.name}</h3>
                  <p className="work-kind">{c.line}</p>
                  <p className="small muted" style={{ marginTop: "var(--s-1)" }}>
                    {count > 0 ? `${count} pieces` : "Coming"}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Quiet support band */}
      <section className="section container" aria-labelledby="support">
        <Reveal>
          <div className="stack">
            <h2 id="support" style={{ maxWidth: "18ch" }}>
              Independent, on purpose.
            </h2>
            <p className="muted">
              No gallery, no grants, no investors. The work is funded by the
              people who want it to exist.
            </p>
            <Link href="/keep-us-going" className="button button--quiet">
              Keep Us Going
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
