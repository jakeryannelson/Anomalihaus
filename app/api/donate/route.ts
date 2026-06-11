import { NextRequest, NextResponse } from "next/server";
import { stripe, siteUrl } from "@/lib/stripe";

const MIN_CENTS = 100; // $1
const MAX_CENTS = 1_000_000; // $10,000

/**
 * POST /api/donate
 * Body: { amountCents: number, coverFee?: boolean }
 *
 * One-time support via hosted Checkout. `coverFee` adds 3%, matching the
 * old site's "cover the fees" option.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      amountCents?: number;
      coverFee?: boolean;
    };

    let amount = Math.round(Number(body.amountCents));
    if (!Number.isFinite(amount) || amount < MIN_CENTS || amount > MAX_CENTS) {
      return NextResponse.json(
        { error: "Choose an amount between $1 and $10,000." },
        { status: 400 }
      );
    }
    if (body.coverFee) amount = Math.round(amount * 1.03);

    const base = siteUrl();
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: "Keep Us Going",
              description:
                "One-time support for anomalihaus — materials, production, and new work.",
            },
          },
        },
      ],
      metadata: { kind: "donation" },
      success_url: `${base}/thanks?kind=support`,
      cancel_url: `${base}/keep-us-going`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Donation could not be started.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
