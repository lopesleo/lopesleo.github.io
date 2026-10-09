// Política de privacidade do JOGO em HTML, a partir de guardiao/privacy/<lang>.md.
// O pt.md é cópia de docs/PRIVACY.md do repositório Guardiao-Game: manter os dois iguais.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as C from "./config.mjs";
import { esc } from "./page.mjs";
import { PAL } from "./palette.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));

// Markdown mínimo: #/## títulos, parágrafos, listas "- ", **negrito**, *itálico*, `código`, <link>
function inline(s) {
  return esc(s)
    .replace(/&lt;(https?:\/\/[^\s&]+)&gt;/g, (_, u) => `<a href="${u}">${u}</a>`)
    .replace(/&lt;([^\s@&]+@[^\s&]+)&gt;/g, (_, m) => `<a href="mailto:${m}">${m}</a>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

export function mdToHtml(md) {
  const out = [];
  let para = [], list = null;
  const flushPara = () => { if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`); para = []; };
  const flushList = () => { if (list) out.push(`<ul>${list.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`); list = null; };
  for (const raw of md.replace(/\r/g, "").split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) { flushPara(); flushList(); continue; }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) { flushPara(); flushList(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
    const li = /^-\s+(.*)$/.exec(line);
    if (li) { flushPara(); (list ??= []).push(li[1]); continue; }
    if (list && /^\s{2,}\S/.test(raw)) { list[list.length - 1] += " " + line.trim(); continue; }
    flushList();
    para.push(line.trim());
  }
  flushPara(); flushList();
  return out.join("\n");
}

// CSS embutido: a página funciona sozinha (inclusive copiada para o endereço antigo)
const CSS = `
@font-face{font-family:"Jersey 15";src:url(${C.SITE}${C.BASE}assets/fonts/Jersey15.woff2) format("woff2");font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(${C.SITE}${C.BASE}assets/fonts/AtkinsonHyperlegible-Regular.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"Atkinson Hyperlegible";src:url(${C.SITE}${C.BASE}assets/fonts/AtkinsonHyperlegible-Bold.woff2) format("woff2");font-weight:700;font-display:swap}
*{box-sizing:border-box}
html{background:${PAL.t0};color-scheme:dark}
body{margin:0;background:${PAL.t0};color:${PAL.cream};font:400 17px/1.65 "Atkinson Hyperlegible",system-ui,sans-serif;-webkit-text-size-adjust:100%}
.page{max-width:760px;margin:0 auto;padding:28px 16px 64px}
.top{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.back{display:inline-flex;align-items:center;gap:10px;color:${PAL.cream};text-decoration:none;font:400 22px/1 "Jersey 15",monospace;letter-spacing:.02em;text-transform:uppercase}
.back img{image-rendering:pixelated}
.alt{font-size:15px;color:${PAL.g6}}
.doc{background:${PAL.g0};border:3px solid ${PAL.g3};padding:28px 22px;position:relative}
h1{font:400 40px/1.02 "Jersey 15",monospace;color:${PAL.goldhi};margin:0 0 6px;text-shadow:0 3px 0 ${PAL.ink};letter-spacing:.01em}
h2{font:400 26px/1.1 "Jersey 15",monospace;color:${PAL.g6};margin:30px 0 8px;letter-spacing:.02em;text-transform:uppercase}
p,li{color:rgba(244,236,214,.9)}
p:first-of-type em{color:${PAL.straw3};font-style:normal;font-size:15px}
ul{padding-left:20px}
li{margin:6px 0}
li::marker{color:${PAL.g6}}
strong{color:${PAL.cream}}
a{color:${PAL.wnd2};text-underline-offset:3px}
a:focus-visible{outline:3px solid ${PAL.yel2};outline-offset:2px}
code{font-size:.88em;background:${PAL.t1};padding:1px 5px;color:${PAL.wnd3};word-break:break-all}
.foot{margin-top:24px;font-size:14px;color:rgba(244,236,214,.6)}
@media (min-width:700px){.doc{padding:40px 48px}h1{font-size:52px}}
`;

export function renderPrivacy(code, { canonical, alternate, legacy = false } = {}) {
  const md = fs.readFileSync(path.join(HERE, `privacy/${code}.md`), "utf8");
  const body = mdToHtml(md);
  const title = /^#\s+(.*)$/m.exec(md)[1];
  const isPt = code === "pt";
  const home = `${C.SITE}${C.BASE}${isPt ? "" : "en/"}`;
  return `<!doctype html>
<html lang="${isPt ? "pt-BR" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(isPt ? "Como o Guardião da Floresta trata seus dados: anúncios opcionais (AdMob), análise anônima (Firebase) e progresso salvo no aparelho." : "How Forest Guardian handles your data: optional ads (AdMob), anonymous analytics (Firebase) and progress saved on your device.")}">
<link rel="canonical" href="${canonical}">
${alternate ?? ""}
<meta name="theme-color" content="${PAL.t0}">
<link rel="icon" type="image/png" href="${C.SITE}${C.BASE}assets/img/favicon-48.png">
<style>${CSS.replace(/\s*\n\s*/g, "")}</style>
</head>
<body>
<div class="page">
  <div class="top">
    <a class="back" href="${home}"><img src="${C.SITE}${C.BASE}assets/img/icon-192.png" width="32" height="32" alt="">${isPt ? "Guardião da Floresta" : "Forest Guardian"}</a>
    <a class="alt" href="${C.SITE}${C.BASE}${isPt ? "en/privacy/" : "privacidade/"}" hreflang="${isPt ? "en" : "pt-BR"}">${isPt ? "English version" : "Versão em português"}</a>
  </div>
  <article class="doc">
${body}
  </article>
  <p class="foot">${legacy ? (isPt ? `Endereço atual desta política: <a href="${canonical}">${canonical}</a>` : `Current address: <a href="${canonical}">${canonical}</a>`) : `© 2026 ${C.STUDIO}`}</p>
</div>
</body>
</html>
`;
}
