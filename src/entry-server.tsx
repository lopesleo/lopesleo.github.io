import { renderToString } from "react-dom/server";
import App from "./App";
import { LanguageProvider } from "./i18n/language";

/**
 * Server entry used only at build time to prerender the SPA into static HTML
 * (see scripts/prerender.mjs). AI search crawlers don't execute JavaScript, so
 * this ensures the page content is present in dist/index.html without JS.
 *
 * Renders the default language (pt) / theme (light); the client hydrates and
 * adjusts to stored prefs. No browser globals are touched during render
 * (getInitialLang / getInitialTheme guard on `typeof window`).
 */
export function render(): string {
  return renderToString(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
