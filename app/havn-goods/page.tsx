import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  COLLECTIONS,
  PIECES,
  formatPrice,
  piecesIn,
  type CollectionId,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Havn Goods",
  description:
    "Original art, objects, and wearable goods by anomalihaus — Studio Nord, Cold Thread, and Artefakter.",
};

const COLLECTION_IDS = Object.keys(COLLECTIONS) as CollectionId[];

export default async function HavnGoods({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const active: CollectionId | null = COLLECTION_IDS.includes(
    c as CollectionId
  )
    ? (c as CollectionId)
    : null;

  const shown = active ? piecesIn(active) : PIECES;
  const originals = shown.filter((p) => p.original).length;

  return (
    <section className="section container">
      <div className="section-head">
        <div>
          <p className="kicker">The shop</p>
          <h1>Havn Goods</h1>
        </div>
        <p className="section-head-link muted">
          {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          {originals > 0 ? ` · ${originals} one-of-one` : ""}
        </p>
      </div>

      <ul className="collection-nav">
        <li>
          <Link href="/havn-goods" aria-current={active === null}>
            All
          </Link>
        </li>
        {COLLECTION_IDS.map((id) => (
          <li key={id}>
            <Link href={`/havn-goods?c=${id}`} aria-current={active === id}>
              {COLLECTIONS[id].name}
            </Link>
          </li>
        ))}
      </ul>

      {active && <p className="muted" style={{ marginBottom: "var(--s-5)" }}>{COLLECTIONS[active].line}</p>}

      {shown.length === 0 ? (
        <div className="empty-state stack">
          <h2>Nothing here yet.</h2>
          <p className="muted">
            {active === "cold-thread"
              ? "The first thread is still on the loom. Wearable goods are coming."
              : "New work is in progress. Check back, or write to us."}
          </p>
          <Link href="/havn-goods" className="button button--quiet">
            See everything
          </Link>
        </div>
      ) : (
        <ul className="work-grid">
          {shown.map((piece) => (
            <Reveal as="li" key={piece.slug}>
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
                    {piece.original ? "" : "from "}
                    {formatPrice(piece.basePriceCents)}
                  </span>
                </div>
                <p className="work-kind">{piece.kind}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
