import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="footer-cta" aria-labelledby="footer-cta-h">
        {/* The colors we keep — flat, six across, edge to edge. */}
        <div className="palette-stripe" aria-hidden="true">
          {["#2E5FA3", "#C2492F", "#3F5436", "#9486AD", "#C68B45", "#4E626C"].map(
            (c) => (
              <span key={c} style={{ background: c }} />
            )
          )}
        </div>
        <div className="container footer-cta-inner">
          <svg
            className="footer-rune"
            viewBox="0 0 64 64"
            aria-hidden="true"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="6" strokeLinecap="square">
              <path d="M24 10 L24 54" />
              <path d="M24 16 L44 30" />
              <path d="M24 32 L44 46" />
            </g>
          </svg>
          <p className="kicker">Havn Goods</p>
          <h2 id="footer-cta-h">
            Your walls talk. Give them something true to say.
          </h2>
          <Link href="/havn-goods" className="button">
            Shop the haus
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <p className="footer-brand">
                anomalihaus<span className="wordmark-dot">.</span>
              </p>
              <p className="muted small">
                An art collective for the work that doesn&rsquo;t fit.
                <br />
                Atlanta, Georgia.
              </p>
            </div>
            <nav className="footer-col" aria-label="Site">
              <p className="kicker">Haus</p>
              <Link href="/havn-goods">Havn Goods</Link>
              <Link href="/artists">Artists</Link>
              <Link href="/about">About</Link>
              <Link href="/keep-us-going">Keep Us Going</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <div className="footer-col">
              <p className="kicker">Studio</p>
              <a href="mailto:alexander@anomalihaus.com">
                alexander@anomalihaus.com
              </a>
              <a href="tel:+14704454753">(470) 445-4753</a>
            </div>
          </div>
          <div className="footer-base">
            <p>© {new Date().getFullYear()} anomalihaus</p>
            <p>Made once. Named once.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
