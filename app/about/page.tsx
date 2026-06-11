import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "anomalihaus is an Atlanta art collective making original abstract work, dimensional pieces, and objects for individual expression.",
};

export default function About() {
  return (
    <>
      <section className="section container">
        <div className="section-head">
          <div>
            <p className="kicker">About</p>
            <h1>A haus for anomalies.</h1>
          </div>
        </div>
        <div className="split">
          <p className="lede">
            anomalihaus is an art collective built around one conviction: the
            things that don&rsquo;t fit are the things worth keeping.
          </p>
          <div className="split-body">
            <p>
              We make original abstract works, dimensional wall pieces,
              preserved moss, and objects for people who want their walls to
              say something true. The work deals in transformation — ego
              death, mourning, rebirth, the bridge between who you were and
              who you&rsquo;re becoming.
            </p>
            <p>
              The names are Norse because the north understands long winters
              and what comes after them. The haus is in Atlanta, and it is
              built to grow: collaborators, makers, photographers, and strays
              are welcome — <Link href="/contact">write to us</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="invocation-band" aria-labelledby="founder">
        <div className="container section">
          <Reveal>
            <div className="split">
              <p className="kicker" id="founder">
                From the founder
              </p>
              <blockquote className="invocation">
                <p>
                  Every piece in this haus started as something I needed to
                  get out, not something I planned to sell. The marks came
                  first; the shop came later. If one of them is the bridge for
                  you that it was for me, it belongs on your wall, not in my
                  studio.
                </p>
                <cite className="muted small" style={{ fontStyle: "normal" }}>
                  — Alexander Nelson, founding artist
                </cite>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <div className="split">
          <div>
            <p className="kicker">Start somewhere</p>
            <h2 style={{ marginTop: "var(--s-2)" }}>See what made it out.</h2>
          </div>
          <div className="split-body">
            <p className="muted">
              Nine pieces are in the haus right now — seven prints, two
              one-of-one originals.
            </p>
            <Link href="/havn-goods" className="button">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
