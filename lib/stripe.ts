import Stripe from "stripe";

/**
 * Lazy server-side Stripe client.
 *
 * Lazy so `next build` succeeds without secrets present; the key is only
 * required when a checkout or webhook request actually arrives.
 * apiVersion is intentionally omitted — the SDK pins the version it ships
 * its types against, which is the safest default.
 */
let client: Stripe | null = null;

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Copy .env.example to .env.local and add your key."
    );
  }
  if (!client) client = new Stripe(key);
  return client;
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
