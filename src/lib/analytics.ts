import type { PostHog } from "posthog-js";

/**
 * Thin wrapper around PostHog for the portfolio's custom analytics.
 *
 * Privacy-conscious defaults (lighter LGPD footprint):
 * - No tracking unless VITE_POSTHOG_KEY is set (so dev/forks stay clean).
 * - person_profiles: "identified_only" — visitors stay anonymous; we never
 *   identify them, so PostHog keeps far less personal data.
 * - Session recording stays OFF (it would capture the DOM/inputs).
 *
 * posthog-js is imported dynamically and only in the browser, so it never runs
 * during the SSR/prerender build (it touches window at import time). Everything
 * here no-ops on the server and when disabled.
 */

const KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = import.meta.env.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com";

let client: PostHog | null = null;
let starting = false;

export function initAnalytics(): void {
  if (client || starting) return;
  if (typeof window === "undefined") return; // SSR / prerender
  if (!KEY) return; // analytics disabled (no key configured)

  starting = true;
  void import("posthog-js").then(({ default: posthog }) => {
    posthog.init(KEY, {
      api_host: HOST,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: true,
    });
    client = posthog;
  });
}

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export function track(event: string, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;
  client?.capture(event, props);
}
