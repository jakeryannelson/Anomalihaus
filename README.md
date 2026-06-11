# anomalihaus

A haus for the work that doesn't fit. Next.js (App Router) + Stripe hosted
Checkout, designed Scandinavian-editorial: warm paper, near-black ink, the old
site's fjord blue demoted to a supporting voice, moss green as the only accent.

## Quickstart

```bash
npm install
cp .env.example .env.local   # add your Stripe TEST keys
npm run dev                  # http://localhost:3000
```

Note: this repo was authored and reviewed in a sandbox that couldn't reach the
npm registry, so run `npm run build` once locally before deploying — it should
pass clean; if anything complains, it'll be a version nit, not a design issue.

## Stripe (test mode first)

1. In the [Stripe dashboard](https://dashboard.stripe.com), toggle **Test mode**
   and copy the secret key (`sk_test_...`) into `.env.local`.
2. Local webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copy the printed `whsec_...` into `STRIPE_WEBHOOK_SECRET`.
3. Buy something with card `4242 4242 4242 4242`, any future date, any CVC.
4. Only after that works, swap in live keys (in Vercel, not in code).

How money flows: the browser never sends a price. `/api/checkout` looks the
piece up in `lib/catalog.ts`, resolves the variant price server-side, and
creates a hosted Checkout Session. `/api/donate` does the same for support.
`/api/stripe/webhook` verifies signatures against the raw body and is where
order-fulfillment email goes when you're ready (marked with a comment).

## Deploy

1. Push this folder to a GitHub repo.
2. [vercel.com](https://vercel.com) → Add New Project → import the repo.
   Next.js is auto-detected; no config needed.
3. Set three env vars in Vercel: `STRIPE_SECRET_KEY`,
   `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`
   (e.g. `https://www.anomalihaus.com`).
4. Stripe dashboard → Developers → Webhooks → Add endpoint:
   `https://www.anomalihaus.com/api/stripe/webhook`, event
   `checkout.session.completed`. Copy its signing secret into
   `STRIPE_WEBHOOK_SECRET` and redeploy.
5. Point the domain at Vercel, run one test purchase, then go live.

## Things waiting on Alexander

- **Prices** — every print variant currently uses the old site's "from" price.
  If canvas or 11×14 should cost more, edit `surchargeCents` in
  `lib/catalog.ts` (it's the block marked PRICE MATRIX TODO).
- **Images** — the catalog hotlinks the old Squarespace CDN so the site works
  on day one. Before cancelling Squarespace, download the originals into
  `/public/art/`, update the `src` paths in `lib/catalog.ts`, and remove the
  `remotePatterns` from `next.config.ts`.
- **About page** — the founder's note is a draft written in the voice of the
  product copy. Make it true in his words.
- **Collections** — Cold Thread is intentionally an honest "coming" state, not
  a fake empty grid. Add pieces to `lib/catalog.ts` and they appear everywhere
  (shop, filters, sitemap, checkout) automatically.

## Copy edits made during the rebuild

- "maze of my own **morning**" → "**mourning**" (per the painting's actual
  title, *Maze of Mourning*)
- "**Cole** Pressed Water Color Paper" → "Cold-pressed watercolor paper"
- "Light in the **Labrynth**" → "**Labyrinth**"
- The Invocation's variant group labeled "Color" → "Material"
- The luxury-gallery About copy ("art connoisseurs," "dedicated art advisor")
  was retired and replaced with collective-voice copy drawn from the maker's
  notes. The old text is in git history if it's ever missed.
