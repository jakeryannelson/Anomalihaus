import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to anomalihaus — commissions, collaborations, press, or a piece you can't stop thinking about.",
};

export default function Contact() {
  return (
    <section className="section container">
      <div className="stack" style={{ maxWidth: "52rem" }}>
        <p className="kicker">Contact</p>
        <h1>Start a conversation.</h1>
        <p className="lede">
          A commission, a collaboration, a piece you can&rsquo;t stop thinking
          about — or you just want to talk about the work.
        </p>
        <p>
          Email is best:{" "}
          <a href="mailto:alexander@anomalihaus.com">
            alexander@anomalihaus.com
          </a>
          <br />
          Or call: <a href="tel:+14704454753">(470) 445-4753</a>
        </p>
        <p className="muted small">
          anomalihaus · Atlanta, Georgia. We answer everything, usually within
          a couple of days.
        </p>
      </div>
    </section>
  );
}
