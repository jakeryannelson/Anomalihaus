import type { Metadata } from "next";
import { Fraunces, Schibsted_Grotesk } from "next/font/google";
import CartProvider from "@/components/CartProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "anomalihaus — a haus for the work that doesn't fit",
    template: "%s — anomalihaus",
  },
  description:
    "An Atlanta art collective. Original abstract works, dimensional wall pieces, preserved moss art, and objects made for individual expression.",
  openGraph: {
    siteName: "anomalihaus",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${schibsted.variable}`}>
      <body>
        <CartProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
