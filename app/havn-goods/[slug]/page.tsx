import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPurchase from "@/components/ProductPurchase";
import Reveal from "@/components/Reveal";
import { COLLECTIONS, PIECES, formatPrice, getPiece } from "@/lib/catalog";

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

  const materials = piece.variants
    ?.find((g) => g.id === "material")
    ?.options.map((o) => o.label)
    .join(" or ");
  const sizes = piece.variants
    ?.find((g) => g.id === "size")
    ?.options.map((o) => o.label)
    .join(" · ");

  const more = PIECES.filter((p) => p.slug !== piece.slug).slice(0, 3);

  return (
    <>
      <section className="section container">
        <p className="kicker crumbs">
          <Link href="/havn-goods">Havn Goods</Link> /{" "}
          <Link href={`/havn-goods?c=${piece.collection}`}>
            {COLLECTIONS[piece.collection].name}
          </Link>
        </p>

        <div className="product">
          <div className="product-media">
            <Image
              src={piece.image.src}
              alt={piece.image.alt}
              width={piece.image.width}
              height={piece.image.height}
              priority
              sizes="(max-width: 640px) 100vw, 58vw"
            />
          </div>

          <div className="product-details">
            <div className="product-title">
              <h1>{piece.name}</h1>
              <p className="muted small">{piece.kind}</p>
            </div>

            <blockquote className="invocation">
              <p className="kicker">The invocation</p>
              <p>{piece.note}</p>
            </blockquote>

            <dl className="facts">
              <div>
                <dt>Edition</dt>
                <dd>
                  {piece.original
                    ? "One of one. When it's gone, it's gone."
                    : "Open edition print"}
                </dd>
              </div>
              {materials && (
                <div>
                  <dt>Material</dt>
                  <dd>{materials}</dd>
                </div>
              )}
              {sizes && (
                <div>
                  <dt>Sizes</dt>
                  <dd>{sizes}</dd>
                </div>
              )}
              <div>
                <dt>Studio</dt>
                <dd>Ships from Atlanta, Georgia</dd>
              </div>
            </dl>

            <ProductPurchase piece={piece} />
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="more">
        <div className="section-head">
          <div>
            <p className="kicker">Keep looking</p>
            <h2 id="more">More from the haus.</h2>
          </div>
          <Link href="/havn-goods" className="section-head-link">
            All pieces →
          </Link>
        </div>
        <ul className="work-grid work-grid--three">
          {more.map((p) => (
            <Reveal as="li" key={p.slug}>
              <Link href={`/havn-goods/${p.slug}`} className="work-card">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="work-caption">
                  <h3>{p.name}</h3>
                  <span className="work-price">
                    {p.original ? "" : "from "}
                    {formatPrice(p.basePriceCents)}
                  </span>
                </div>
                <p className="work-kind">{p.kind}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
