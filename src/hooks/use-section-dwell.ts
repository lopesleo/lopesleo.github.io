import { useEffect } from "react";
import { track } from "../lib/analytics";

/**
 * Measures how long each section sits in the center of the viewport ("dwell
 * time") and reports it to analytics as `section_dwell` { section, seconds }.
 *
 * Only one section is "active" at a time (the one crossing the middle band,
 * matching the header's scrollspy), so the times don't overlap. Accumulated
 * time is flushed when the tab is hidden or the page is closed, and reset after
 * each flush so nothing is double-counted across tab switches.
 */
export function useSectionDwell(sectionIds: readonly string[]): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const elapsedMs = new Map<string, number>();
    let activeId: string | null = null;
    let activeSince = 0;

    const accrue = () => {
      if (activeId && activeSince) {
        elapsedMs.set(activeId, (elapsedMs.get(activeId) ?? 0) + (Date.now() - activeSince));
      }
      activeSince = 0;
    };

    const setActive = (id: string | null) => {
      if (id === activeId) return;
      accrue();
      activeId = id;
      activeSince = id ? Date.now() : 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));

    const flush = () => {
      accrue();
      elapsedMs.forEach((ms, id) => {
        const seconds = Math.round(ms / 1000);
        if (seconds >= 1) track("section_dwell", { section: id, seconds });
      });
      elapsedMs.clear();
      // Keep timing the current section for any later visibility cycle.
      if (activeId) activeSince = Date.now();
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [sectionIds]);
}
