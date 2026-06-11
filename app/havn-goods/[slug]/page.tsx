import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchase from "@/components/ProductPurchase";
import { COLLECTIONS, PIECES, getPiece } from "@/lib/catalog";

export function generateStaticParams() {
  return PIECES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) return {};
  const firstSentence = piece.note.split(/(?<=\.)\s/)[0];
  return {
    title: piece.name,
    description: `${piece.kind}. ${firstSentence}`,
    openGraph: { images: [piece.image.src] },
  };
}

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();

  return (
    <section className="section container">
      <p className="kicker" style={{ marginBottom: "var(--s-4)" }}>
        <Link href="/havn-goods" style={{ textDecoration: "none" }}>
          Havn Goods
        </Link>{" "}
        / {COLLECTIONS[piece.collection].name}
      </p>

      <div className="product">
        <div className="product-media">
          <Image
            src={piece.image.src}
            alt={piece.image.alt}
            width={piece.image.width}
            height={piece.image.height}
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        </div>

        <div className="product-details">
          <div className="stack">
            <h1>{piece.name}</h1>
            <p className="muted small">{piece.kind}</p>
          </div>

          <blockquote className="product-note">{piece.note}</blockquote>

          {piece.original && (
            <p className="small muted">
              One of one. When it&rsquo;s gone, it&rsquo;s gone.
            </p>
          )}

          <ProductPurchase piece={piece} />
        </div>
      </div>
    </section>
  );
}
