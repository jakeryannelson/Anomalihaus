import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The catalog currently points at the old Squarespace CDN so the new site
    // works on day one. Migrate originals into /public/art and delete these
    // entries once Squarespace is cancelled — see README, "Images".
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "static1.squarespace.com" },
      // Hero photograph (Bryggen, Bergen) — Unsplash free license.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
