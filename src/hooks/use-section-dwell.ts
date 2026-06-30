import { useEffect } from "react";
import { track } from "../lib/analytics";

const IDLE_MS = 20000; // pause timing after this long with no interaction

/**
 * Measures how long each section holds the visitor's *attention* and reports it
 * as `section_dwell` { section, seconds }.
 *
 * Only one section is "active" at a time (the one crossing the middle band,
 * matching the header's scrollspy), so the times don't overlap. Timing only
 * accrues while the section is active AND the tab is visible AND the user is not
 * idle (no pointer/scroll/key activity for IDLE_MS) — so "tab left open in the
 * background" doesn't inflate the numbers. Accumulated time is flushed when the
 * tab is hidden or the page is closed, and reset after each flush.
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
    let idle = false;
    let visible = document.visibilityState === "visible";

    const accrue = () => {
      if (activeId && activeSince) {
        elapsedMs.set(activeId, (elapsedMs.get(activeId) ?? 0) + (Date.now() - activeSince));
      }
      activeSince = 0;
    };

    // Start/stop the clock so it only runs when all conditions hold.
    const recompute = () => {
      const shouldTime = activeId !== null && visible && !idle;
      if (shouldTime && !activeSince) activeSince = Date.now();
      else if (!shouldTime && activeSince) accrue();
    };

    const setActive = (id: string | null) => {
      if (id === activeId) return;
      accrue();
      activeId = id;
      recompute();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));

    let idleTimer: number | undefined;
    const goIdle = () => {
      idle = true;
      recompute();
    };
    const onActivity = () => {
      if (idle) {
        idle = false;
        recompute();
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(goIdle, IDLE_MS);
    };

    const flush = () => {
      accrue();
      elapsedMs.forEach((ms, id) => {
        const seconds = Math.round(ms / 1000);
        if (seconds >= 1) track("section_dwell", { section: id, seconds });
      });
      elapsedMs.clear();
      recompute(); // keep timing if the section is still active/visible
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (!visible) {
        recompute();
        flush();
      } else {
        onActivity();
        recompute();
      }
    };

    const activityEvents = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"];
    activityEvents.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    onActivity(); // arm the idle timer

    return () => {
      observer.disconnect();
      activityEvents.forEach((e) => window.removeEventListener(e, onActivity));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      window.clearTimeout(idleTimer);
    };
  }, [sectionIds]);
}
