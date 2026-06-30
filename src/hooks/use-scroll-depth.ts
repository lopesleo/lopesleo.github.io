import { useEffect } from "react";
import { track } from "../lib/analytics";

const MARKS = [25, 50, 75, 100] as const;

/**
 * Fires `page_scrolled` { percent } once when the visitor first reaches each of
 * 25/50/75/100% of the page height. Shows how far down people actually get.
 */
export function useScrollDepth(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const fired = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      for (const mark of MARKS) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("page_scrolled", { percent: mark });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
