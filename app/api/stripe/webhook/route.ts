import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Signature verification needs the raw request body and the Node runtime.
export const runtime = "nodejs";

/**
 * POST /api/stripe/webhook
 *
 * Stripe calls this after checkout completes. Locally, forward events with:
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook
 * In production, add this URL as an endpoint in the Stripe dashboard and
 * put its signing secret in STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 400 }
    );
  }

  // IMPORTANT: raw text, not req.json() — parsing first breaks verification.
  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // Fulfillment hook: this is where an order email or packing slip goes.
      // session.metadata.slug + session.metadata.selection identify the piece;
      // session.customer_details / session.collected_information hold the buyer.
      console.log(
        `[anomalihaus] order complete: ${session.id}`,
        session.metadata
      );
      break;
    }
    default:
      // Acknowledge everything else without acting on it.
      break;
  }

  return NextResponse.json({ received: true });
}
