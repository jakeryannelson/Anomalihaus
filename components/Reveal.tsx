"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Fade-in-once on scroll. CSS does the animating (see .reveal in globals.css);
 * this only flips a class. prefers-reduced-motion is handled in CSS, so
 * nothing moves for people who asked it not to.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
