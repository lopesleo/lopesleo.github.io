// Gera a página oficial do Guardião da Floresta em public/guardiao/ (6 idiomas + política).
//   node guardiao/build.mjs                 → public/guardiao/**/index.html
//   node guardiao/build.mjs --legacy <dir>  → também os arquivos do endereço antigo
//                                             (lopesleo.github.io/Guardiao-Game/, branch "pages")
// Roda sozinho no `npm run build` do site. Só usa Node (nada de Python no CI).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as C from "./config.mjs";
import { renderPage } from "./page.mjs";
import { renderPrivacy } from "./privacy.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "../public/guardiao");

const all = [];
for (const L of C.LANGS) all.push([L.code, (await import(pathToFileURL(path.join(HERE, `i18n/${L.code}.mjs`)).href)).default]);
const T = Object.fromEntries(all);

// 1) Todo idioma tem exatamente as mesmas chaves do português
function shape(o, p = "") {
  if (Array.isArray(o)) return o.flatMap((v, i) => shape(v, `${p}[${i}]`));
  if (o && typeof o === "object") return Object.entries(o).flatMap(([k, v]) => shape(v, p ? `${p}.${k}` : k));
  return [p];
}
const ref = new Set(shape(T.pt));
let bad = 0;
for (const [code, t] of all) {
  const s = new Set(shape(t));
  for (const k of ref) if (!s.has(k)) { console.error(`✗ ${code}: falta ${k}`); bad++; }
  for (const k of s) if (!ref.has(k)) { console.error(`✗ ${code}: chave a mais ${k}`); bad++; }
}
if (bad) process.exit(1);

// 2) A fonte pixel recortada (títulos em japonês/chinês) cobre todo caractere usado?
const LEG = JSON.parse(fs.readFileSync(path.join(HERE, "data/legends.json"), "utf8"));
const BOS = JSON.parse(fs.readFileSync(path.join(HERE, "data/bosses.json"), "utf8"));
for (const code of ["ja", "zh", "zht"]) {
  const charsFile = path.join(OUT, `assets/fonts/FusionPixel-${code}.chars.txt`);
  if (!fs.existsSync(charsFile)) { console.warn(`! sem recorte da Fusion Pixel para ${code}: rode python guardiao/fonts.py`); continue; }
  const have = new Set(Array.from(fs.readFileSync(charsFile, "utf8")));
  const text = JSON.stringify(T[code]) + JSON.stringify(LEG.map((l) => l[code])) + JSON.stringify(BOS.map((b) => b[code]));
  const miss = [...new Set(Array.from(text))].filter((c) => c.charCodeAt(0) > 0x2e7f && !have.has(c));
  if (miss.length) console.warn(`! ${code}: ${miss.length} caracteres fora do recorte (${miss.slice(0, 20).join("")}…): rode python guardiao/fonts.py`);
}

// 3) Páginas
const write = (rel, html) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
};
for (const L of C.LANGS) write(`${L.dir}index.html`, renderPage(T[L.code], L, all));

const privUrl = (code) => `${C.SITE}${C.BASE}${C.PRIVACY.find((p) => p.code === code).path}`;
const privAlt = C.PRIVACY.map((p) => `<link rel="alternate" hreflang="${p.html}" href="${privUrl(p.code)}">`).join("\n");
for (const p of C.PRIVACY) write(`${p.path}index.html`, renderPrivacy(p.code, { canonical: privUrl(p.code), alternate: privAlt }));

console.log(`✓ página do Guardião: ${C.LANGS.length} idiomas + política (${C.PRIVACY.length}) · fase "${C.STAGE}"`);

// 4) Endereço antigo (opcional): o jogo saiu do ar; fica um aviso que leva à página nova,
//    a política no MESMO endereço declarado no Play Console e um service worker que se
//    desinstala (quem abriu o jogo antes tinha cópia offline guardada pelo sw.js antigo).
const li = process.argv.indexOf("--legacy");
if (li > 0) {
  const dir = path.resolve(process.argv[li + 1]);
  const lw = (rel, s) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.writeFileSync(path.join(dir, rel), s); };
  const target = `${C.SITE}${C.BASE}`;
  const notice = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Guardião da Floresta</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${target}">
<noscript><meta http-equiv="refresh" content="0; url=${target}"></noscript>
<style>html,body{margin:0;background:#10201f;color:#f4ecd6;font:17px/1.6 system-ui,sans-serif}main{max-width:560px;margin:18vh auto;padding:0 16px;text-align:center}a{color:#7fd9bd}</style>
<script>
  (function () {
    var go = function () { location.replace(${JSON.stringify(target)} + location.search); };
    var timer = setTimeout(go, 1500);
    var jobs = [];
    // tira a cópia offline do jogo antigo antes de sair
    if ("serviceWorker" in navigator) jobs.push(navigator.serviceWorker.getRegistrations().then(function (rs) { return Promise.all(rs.filter(function (r) { return r.scope.indexOf("/Guardiao-Game/") >= 0; }).map(function (r) { return r.unregister(); })); }));
    if (window.caches) jobs.push(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return /^guardiao-/.test(k); }).map(function (k) { return caches.delete(k); })); }));
    Promise.all(jobs).then(function () { clearTimeout(timer); go(); }, go);
  })();
</script>
</head>
<body><main>
<p><strong>Guardião da Floresta</strong> agora está em <a href="${target}">${target.replace("https://", "")}</a>.</p>
<p lang="en"><strong>Forest Guardian</strong> has moved to <a href="${target}en/">${target.replace("https://", "")}en/</a>.</p>
</main></body>
</html>
`;
  lw("index.html", notice);
  lw("404.html", notice);
  lw(".nojekyll", "");
  lw("docs/PRIVACY.html", renderPrivacy("pt", { canonical: privUrl("pt"), alternate: privAlt, legacy: true }));
  lw("sw.js", `// O jogo web saiu do ar (09/10/2026). Este service worker substitui o antigo, apaga a cópia
// offline e se desinstala; depois disso o navegador segue para a página oficial.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (/^guardiao-/.test(k)) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
  })());
});
`);
  lw("README.md", `# Guardião da Floresta — endereço antigo\n\nO jogo web saiu do ar em 09/10/2026; o jogo está na Google Play.\nPágina oficial: ${target}\nPolítica de privacidade: ${privUrl("pt")}\n\nEsta branch é gerada por \`node guardiao/build.mjs --legacy <pasta>\` no repositório lopesleo.github.io.\n`);
  console.log(`✓ endereço antigo em ${dir}`);
}
