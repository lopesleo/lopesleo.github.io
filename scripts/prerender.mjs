// Injects the prerendered app HTML into dist/index.html so AI search crawlers
// (which don't run JS) can read the content. Runs after the client + SSR Vite
// builds (see package.json "build"). The client still mounts via createRoot,
// so users get the normal SPA.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ssrEntry = resolve(root, "dist-ssr/entry-server.js");
const indexPath = resolve(root, "dist/index.html");

const { render } = await import(`file://${ssrEntry}`);
const appHtml = render();

const placeholder = '<div id="root"></div>';
let html = readFileSync(indexPath, "utf-8");
if (!html.includes(placeholder)) {
  throw new Error(`Prerender: could not find '${placeholder}' in dist/index.html`);
}
html = html.replace(placeholder, `<div id="root">${appHtml}</div>`);
writeFileSync(indexPath, html);

// The SSR bundle is a build artifact only; drop it from the output.
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });

console.log("✓ Prerendered content into dist/index.html");
