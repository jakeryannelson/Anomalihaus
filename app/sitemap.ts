import type { MetadataRoute } from "next";
import { PIECES } from "@/lib/catalog";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/havn-goods", "/about", "/contact", "/keep-us-going"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...PIECES.map((piece) => ({ url: `${BASE}/havn-goods/${piece.slug}` })),
  ];
}
