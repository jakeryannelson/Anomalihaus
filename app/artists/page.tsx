import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPiece } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "The artists of anomalihaus — currently anchored by founding artist Alexander Nelson. Built to grow.",
};

const FIRST_MARK = getPiece("the-first-mark")!;

export default function Artists() {
  return (
    <>
      <section className="section container">
        <div className="section-head">
          <div>
            <p className="kicker">The haus</p>
            <h1>Artists.</h1>
          </div>
          <Link href="/contact" className="section-head-link">
            Work with us →
          </Link>
        </div>

        <Reveal>
          <article className="founder-grid" aria-labelledby="alex">
            <div className="stack">
              <div>
                <p className="kicker">Founding artist · Atlanta</p>
                <h2 id="alex" style={{ marginTop: "var(--s-1)" }}>
                  Alexander Nelson
                </h2>
              </div>
              <p>
                Alexander Nelson is the founding artist of anomalihaus. His
                work deals in transformation — ego death, mourning, rebirth —
                marked in ink, color, wood, and living moss, with names
                pulled from the north.
              </p>
              <p className="placeholder">
                Placeholder — Alexander&rsquo;s own words go here: where the
                practice started, what the first mark was, and what&rsquo;s
                on the bench right now.
              </p>
              <dl className="facts">
                <div>
                  <dt>Practice</dt>
                  <dd>
                    Abstract works on paper and canvas, dimensional wood,
                    preserved moss
                  </dd>
                </div>
                <div>
                  <dt>Collections</dt>
                  <dd>Studio Nord · Artefakter</dd>
                </div>
                <div>
                  <dt>Studio</dt>
                  <dd>Atlanta, Georgia</dd>
                </div>
              </dl>
              <div className="hero-ctas">
                <Link href="/havn-goods" className="button">
                  See his work
                </Link>
                <a
                  href="mailto:alexander@anomalihaus.com"
                  className="button button--quiet"
                >
                  Write to him
                </a>
              </div>
            </div>
            <Link
              href={`/havn-goods/${FIRST_MARK.slug}`}
              aria-label="The First Mark — see the piece"
            >
              <Image
                src={FIRST_MARK.image.src}
                alt={FIRST_MARK.image.alt}
                width={FIRST_MARK.image.width}
                height={FIRST_MARK.image.height}
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </Link>
          </article>
        </Reveal>
      </section>

      <section className="invocation-band">
        <div className="container section">
          <div className="split">
            <div>
              <p className="kicker">Room in the haus</p>
              <h2 style={{ marginTop: "var(--s-2)" }}>Built to grow.</h2>
            </div>
            <div className="split-body">
              <p>
                anomalihaus is a collective, and collectives collect. If you
                make work that doesn&rsquo;t fit anywhere else — marks,
                objects, thread, anything with weight — the door is open.
              </p>
              <Link href="/contact" className="button button--quiet">
                Introduce yourself
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
