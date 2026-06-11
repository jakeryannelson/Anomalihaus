import type { Metadata } from "next";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = {
  title: "Keep Us Going",
  description:
    "anomalihaus is independent. Support the studio directly — materials, production, and new work.",
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is my donation tax-deductible?",
    a: "No — anomalihaus is a studio, not a charity. Your support directly sustains the studio, the webstore, new artwork, materials, production costs, and the continued development of the project.",
  },
  {
    q: "Where does my donation go?",
    a: "Art materials, product development, studio supplies, website costs, packaging, photography, creative experiments, and the production of new pieces. Every contribution keeps the project moving and lets more original work be made and released.",
  },
  {
    q: "Can I volunteer or get more involved?",
    a: "Yes. Reach out through the contact page. We're open to creative collaboration, event support, photography help, product testing, styling, social sharing, and other hands-on involvement that fits the direction of the haus.",
  },
  {
    q: "Do you accept in-kind donations?",
    a: "Selectively. Materials, tools, display objects, packaging supplies, fabric, wood, frames, found objects — contact us first with a description and photos so we can see whether it fits the studio's current needs.",
  },
  {
    q: "Can I donate in honor or in memory of someone?",
    a: "Yes. Include their name and a short note with your donation, or contact us directly. We can acknowledge the dedication privately or in a future project update when appropriate.",
  },
];

export default function KeepUsGoing() {
  return (
    <>
      <section className="section container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--s-6)",
            alignItems: "start",
          }}
        >
          <div className="stack">
            <p className="kicker">Keep Us Going</p>
            <h1>Independent, on purpose.</h1>
            <p className="lede">
              No gallery, no grants, no investors. anomalihaus runs on the
              work it sells and the people who want more of it to exist.
            </p>
            <p className="muted">
              Every dollar goes back into the haus: materials, production,
              packaging, photography, and the next piece.
            </p>
          </div>
          <DonateForm />
        </div>
      </section>

      <section className="section container" aria-labelledby="faq-heading">
        <h2 id="faq-heading" style={{ marginBottom: "var(--s-4)" }}>
          The honest answers.
        </h2>
        <div className="faq">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
