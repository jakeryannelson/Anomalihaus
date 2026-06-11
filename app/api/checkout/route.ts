import { NextRequest, NextResponse } from "next/server";
import { getPiece, resolvePrice } from "@/lib/catalog";
import { stripe, siteUrl } from "@/lib/stripe";

/**
 * POST /api/checkout
 * Body: { slug: string, selection?: { material?: string, size?: string } }
 *
 * Creates a Stripe hosted Checkout Session for one piece. Prices are
 * resolved server-side from lib/catalog.ts — the client never sends a price.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      slug?: string;
      selection?: Record<string, string>;
    };

    const piece = body.slug ? getPiece(body.slug) : undefined;
    if (!piece) {
      return NextResponse.json({ error: "Unknown piece." }, { status: 400 });
    }

    const { unitAmountCents, description } = resolvePrice(
      piece,
      body.selection
    );

    const base = siteUrl();
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: unitAmountCents,
            product_data: {
              name: piece.name,
              description,
              images: [piece.image.src],
            },
          },
        },
      ],
      // Physical goods — collect a shipping address.
      shipping_address_collection: { allowed_countries: ["US"] },
      metadata: {
        slug: piece.slug,
        selection: JSON.stringify(body.selection ?? {}),
      },
      success_url: `${base}/thanks?kind=order`,
      cancel_url: `${base}/havn-goods/${piece.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout could not be started.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
