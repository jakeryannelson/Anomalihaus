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
        <div className="stack" style={{ maxWidth: "52rem" }}>
          <p className="kicker">About</p>
          <h1>A haus for anomalies.</h1>
          <p className="lede">
            anomalihaus is an art collective built around one conviction: the
            things that don&rsquo;t fit are the things worth keeping.
          </p>
          <p>
            We make original abstract works, dimensional wall pieces, preserved
            moss, and objects for people who want their walls to say something
            true. The work deals in transformation — ego death, mourning,
            rebirth, the bridge between who you were and who you&rsquo;re
            becoming. The names are Norse because the north understands long
            winters and what comes after them.
          </p>
          <p>
            We are built in Atlanta and built to grow. Collaborators, makers,
            photographers, and strays are welcome —{" "}
            <Link href="/contact">write to us</Link>.
          </p>
        </div>
      </section>

      <div className="container">
        <hr className="rule" />
      </div>

      <section className="section container" aria-labelledby="founder">
        <Reveal>
          <div className="stack" style={{ maxWidth: "52rem" }}>
            <p className="kicker" id="founder">
              From the founder
            </p>
            <blockquote className="product-note stack">
              <p>
                Every piece in this haus started as something I needed to get
                out, not something I planned to sell. The marks came first; the
                shop came later. If one of them is the bridge for you that it
                was for me, then it belongs on your wall, not in my studio.
              </p>
              <p>— Alexander Nelson, founding artist</p>
            </blockquote>
            <Link href="/havn-goods" className="button">
              See the work
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
