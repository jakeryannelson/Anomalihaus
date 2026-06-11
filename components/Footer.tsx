import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="footer-cta" aria-labelledby="footer-cta-h">
        <div className="container footer-cta-inner">
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
