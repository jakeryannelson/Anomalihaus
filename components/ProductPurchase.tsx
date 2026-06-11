"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import {
  formatPrice,
  type Piece,
  type VariantGroup,
} from "@/lib/catalog";

/**
 * Variant picker + cart actions. Display prices are computed here for
 * the UI only — the server re-resolves every price from the catalog,
 * so nothing the browser sends can change what gets charged.
 */
export default function ProductPurchase({ piece }: { piece: Piece }) {
  const groups: VariantGroup[] = piece.variants ?? [];
  const { add } = useCart();

  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, g.options[0].id]))
  );
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [added, setAdded] = useState(false);
  const [message, setMessage] = useState("");

  const priceCents = useMemo(() => {
    let total = piece.basePriceCents;
    for (const g of groups) {
      const opt = g.options.find((o) => o.id === selection[g.id]);
      if (opt) total += opt.surchargeCents;
    }
    return total;
  }, [piece, groups, selection]);

  function throwInCart() {
    add(piece.slug, selection, 1);
    setAdded(true);
  }

  async function buyNow() {
    setStatus("working");
    setMessage("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          via: "direct",
          items: [{ slug: piece.slug, selection, quantity: 1 }],
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
    <div className="purchase">
      {groups.map((group) => (
        <fieldset key={group.id} className="variant-group">
          <legend className="variant-label">{group.label}</legend>
          <div className="variant-options" role="radiogroup">
            {group.options.map((opt) => {
              const active = selection[group.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={`variant-option${active ? " is-active" : ""}`}
                  onClick={() => {
                    setSelection((s) => ({ ...s, [group.id]: opt.id }));
                    setAdded(false);
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="purchase-row">
        <p className="purchase-price">{formatPrice(priceCents)}</p>
        <div className="purchase-actions">
          <button type="button" className="button" onClick={throwInCart}>
            Throw In Cart
          </button>
          <button
            type="button"
            className="button button--quiet"
            onClick={buyNow}
            disabled={status === "working"}
          >
            {status === "working" ? "One moment…" : "Buy it now"}
          </button>
        </div>
      </div>

      {added && (
        <p className="purchase-added" role="status">
          In the cart. <Link href="/cart">View cart →</Link>
        </p>
      )}

      {status === "error" && (
        <p className="purchase-error" role="alert">
          {message}
        </p>
      )}

      <p className="purchase-fine">
        Secure checkout via Stripe. Ships from Atlanta.
      </p>
    </div>
  );
}
