import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal animation starts (for staggering). */
  delay?: number;
  /** Render as a different element. Defaults to a div. */
  as?: "div" | "section" | "li" | "article";
}

/**
 * Wraps content and fades/slides it in once it scrolls into view.
 * Honors prefers-reduced-motion via CSS in index.css.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
