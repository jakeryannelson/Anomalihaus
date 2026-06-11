"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lineKey, useCart } from "@/components/CartProvider";
import { formatPrice, getPiece, resolvePrice } from "@/lib/catalog";

export default function CartPage() {
  const { lines, loaded, remove, setQuantity } = useCart();
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [message, setMessage] = useState("");

  const detailed = useMemo(
    () =>
      lines
        .map((line) => {
          const piece = getPiece(line.slug);
          if (!piece) return null;
          try {
            const { unitAmountCents, description } = resolvePrice(
              piece,
              line.selection
            );
            return {
              key: lineKey(line),
              line,
              piece,
              unitAmountCents,
              description,
            };
          } catch {
            return null;
          }
        })
        .filter((d): d is NonNullable<typeof d> => d !== null),
    [lines]
  );

  const subtotal = detailed.reduce(
    (sum, d) => sum + d.unitAmountCents * d.line.quantity,
    0
  );

  async function checkout() {
    setStatus("working");
    setMessage("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          via: "cart",
          items: lines.map((l) => ({
            slug: l.slug,
            selection: l.selection,
            quantity: l.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout could not be started.");
      }
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something broke. Try again."
      );
    }
  }

  return (
    <section className="section container">
      <div className="section-head">
        <div>
          <p className="kicker">The cart</p>
          <h1>What you&rsquo;re keeping.</h1>
        </div>
        <Link href="/havn-goods" className="section-head-link">
          Keep looking →
        </Link>
      </div>

      {!loaded ? null : detailed.length === 0 ? (
        <div className="empty-state stack">
          <h2>Nothing in here yet.</h2>
          <p className="muted">
            The work is waiting. Originals from $700, prints from $50.
          </p>
          <Link href="/havn-goods" className="button">
            See Havn Goods
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-lines">
            {detailed.map((d) => (
              <li key={d.key} className="cart-line">
                <Link
                  href={`/havn-goods/${d.piece.slug}`}
                  className="cart-thumb"
                >
                  <Image
                    src={d.piece.image.src}
                    alt={d.piece.image.alt}
                    width={d.piece.image.width}
                    height={d.piece.image.height}
                    sizes="96px"
                  />
                </Link>
                <div className="cart-info">
                  <h3>
                    <Link href={`/havn-goods/${d.piece.slug}`}>
                      {d.piece.name}
                    </Link>
                  </h3>
                  <p className="cart-variant">{d.description}</p>
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => remove(d.key)}
                  >
                    Remove
                  </button>
                </div>
                <div
                  className="cart-qty"
                  role="group"
                  aria-label={`Quantity of ${d.piece.name}`}
                >
                  <button
                    type="button"
                    className="variant-option"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(d.key, d.line.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="cart-qty-value">{d.line.quantity}</span>
                  <button
                    type="button"
                    className="variant-option"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(d.key, d.line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="cart-line-total">
                  {formatPrice(d.unitAmountCents * d.line.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-subtotal">
              <span className="kicker">Subtotal</span>
              <span className="purchase-price">{formatPrice(subtotal)}</span>
            </div>
            <button
              type="button"
              className="button"
              onClick={checkout}
              disabled={status === "working"}
            >
              {status === "working" ? "One moment…" : "Checkout"}
            </button>
            {status === "error" && (
              <p className="purchase-error" role="alert">
                {message}
              </p>
            )}
            <p className="purchase-fine">
              Secure checkout via Stripe. Shipping address collected there.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
