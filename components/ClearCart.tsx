"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

/** Rendered on the thanks page after a cart checkout completes. */
export default function ClearCart() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
