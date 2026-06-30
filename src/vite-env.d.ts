/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** PostHog project API key (public/client-side). Analytics is disabled when unset. */
  readonly VITE_POSTHOG_KEY?: string;
  /** PostHog API host. Defaults to the US cloud (https://us.i.posthog.com). */
  readonly VITE_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
