"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartLink() {
  const { count, loaded } = useCart();
  return (
    <Link href="/cart">
      Cart
      {loaded && count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
