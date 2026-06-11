import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getPiece, resolvePrice } from "@/lib/catalog";
import { stripe, siteUrl } from "@/lib/stripe";

/**
 * POST /api/checkout
 * Body: {
 *   via?: "cart" | "direct",
 *   items: { slug: string, selection?: Record<string,string>, quantity?: number }[]
 * }
 *
 * Builds one Stripe hosted Checkout Session for the whole basket.
 * Every price is resolved server-side from lib/catalog.ts — the client
 * sends ids and quantities, never amounts.
 */

const MAX_LINES = 20;
const MAX_QTY = 10;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      via?: string;
      items?: {
        slug?: string;
        selection?: Record<string, string>;
        quantity?: number;
      }[];
    };

    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0 || items.length > MAX_LINES) {
      return NextResponse.json(
        { error: "The cart is empty." },
        { status: 400 }
      );
    }

    const via = body.via === "cart" ? "cart" : "direct";
    const base = siteUrl();

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const summary: string[] = [];
    let firstSlug = "";

    for (const item of items) {
      const piece = item.slug ? getPiece(item.slug) : undefined;
      if (!piece) {
        return NextResponse.json({ error: "Unknown piece." }, { status: 400 });
      }
      const quantity = Math.round(Number(item.quantity ?? 1));
      if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY) {
        return NextResponse.json(
          { error: "Quantities must be between 1 and 10." },
          { status: 400 }
        );
      }

      const { unitAmountCents, description } = resolvePrice(
        piece,
        item.selection
      );

      if (!firstSlug) firstSlug = piece.slug;
      summary.push(`${piece.slug} x${quantity}`);
      lineItems.push({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: unitAmountCents,
          product_data: {
            name: piece.name,
            description,
            images: [piece.image.src],
          },
        },
      });
    }

    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Physical goods — collect a shipping address.
      shipping_address_collection: { allowed_countries: ["US"] },
      metadata: {
        via,
        summary: summary.join(", ").slice(0, 480),
      },
      success_url: `${base}/thanks?kind=order&via=${via}`,
      cancel_url: via === "cart" ? `${base}/cart` : `${base}/havn-goods/${firstSlug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout could not be started.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
