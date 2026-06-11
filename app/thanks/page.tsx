import type { Metadata } from "next";
import Link from "next/link";
import ClearCart from "@/components/ClearCart";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default async function Thanks({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; via?: string }>;
}) {
  const { kind, via } = await searchParams;
  const isSupport = kind === "support";

  return (
    <section className="section container">
      {kind === "order" && via === "cart" && <ClearCart />}
      <div className="stack" style={{ maxWidth: "52rem" }}>
        <p className="kicker">{isSupport ? "Support received" : "Order placed"}</p>
        <h1>{isSupport ? "That keeps us going." : "It's yours."}</h1>
        <p className="lede">
          {isSupport
            ? "Thank you. Every contribution goes straight back into the work — materials, production, and the next piece."
            : "A receipt is on its way to your email. We'll be in touch from the studio when your piece ships from Atlanta."}
        </p>
        <Link href="/havn-goods" className="button button--quiet">
          Back to Havn Goods
        </Link>
      </div>
    </section>
  );
}
