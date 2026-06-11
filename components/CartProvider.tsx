"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface CartLine {
  slug: string;
  selection: Record<string, string>;
  quantity: number;
}

export function lineKey(line: Pick<CartLine, "slug" | "selection">): string {
  const sel = Object.keys(line.selection)
    .sort()
    .map((k) => `${k}:${line.selection[k]}`)
    .join(",");
  return `${line.slug}|${sel}`;
}

interface CartApi {
  lines: CartLine[];
  count: number;
  loaded: boolean;
  add: (slug: string, selection: Record<string, string>, quantity?: number) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);
const STORAGE_KEY = "anomalihaus.cart.v1";
const MAX_QTY = 10;

export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const hydrated = useRef(false);

  // Load once on the client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (l) =>
                typeof l?.slug === "string" &&
                typeof l?.quantity === "number" &&
                l.quantity > 0
            )
          );
        }
      }
    } catch {
      // A broken cart should never break the site.
    }
    hydrated.current = true;
    setLoaded(true);
  }, []);

  // Persist after hydration.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage full or blocked — carry on in memory.
    }
  }, [lines]);

  const add = useCallback(
    (slug: string, selection: Record<string, string>, quantity = 1) => {
      setLines((prev) => {
        const key = lineKey({ slug, selection });
        const existing = prev.find((l) => lineKey(l) === key);
        if (existing) {
          return prev.map((l) =>
            lineKey(l) === key
              ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) }
              : l
          );
        }
        return [...prev, { slug, selection, quantity: Math.min(MAX_QTY, quantity) }];
      });
    },
    []
  );

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => lineKey(l) !== key)
        : prev.map((l) =>
            lineKey(l) === key
              ? { ...l, quantity: Math.min(MAX_QTY, Math.round(quantity)) }
              : l
          )
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      loaded,
      add,
      remove,
      setQuantity,
      clear,
    }),
    [lines, loaded, add, remove, setQuantity, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
