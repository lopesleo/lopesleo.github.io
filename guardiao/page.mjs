// Monta o HTML da página oficial num idioma. Sem framework: HTML estático + guardiao.js.
import fs from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { icon } from "./icons.mjs";
import { PAL } from "./palette.mjs";
import * as C from "./config.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LEGENDS = JSON.parse(fs.readFileSync(path.join(HERE, "data/legends.json"), "utf8"));
const BOSSES = JSON.parse(fs.readFileSync(path.join(HERE, "data/bosses.json"), "utf8"));
const PUB = path.join(HERE, "../public/guardiao");
const A = `${C.BASE}assets/`;

// Cache-busting pelo CONTEÚDO (a data do arquivo muda a cada checkout e quebraria o cache à toa)
const hashes = new Map();
const ver = (rel) => {
  if (!hashes.has(rel)) {
    try {
      hashes.set(rel, createHash("sha1").update(fs.readFileSync(path.join(PUB, "assets", rel))).digest("hex").slice(0, 8));
    } catch {
      hashes.set(rel, "");
    }
  }
  const h = hashes.get(rel);
  return h ? `${A}${rel}?v=${h}` : `${A}${rel}`;
};
const mb = (rel) => {
  const b = fs.statSync(path.join(PUB, "assets", rel)).size;
  return `${(b / 1048576).toFixed(1).replace(".0", "")} MB`;
};

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmt = (s, ...v) => String(s).replace(/\{(\d)\}/g, (_, i) => v[i]);
const CJK = { ja: true, zh: true, zht: true };

// Elementos e reações (pares → reação). Cores da paleta do jogo.
export const ELEMENTS = [
  { id: "fire", color: PAL.org2 },
  { id: "ice", color: PAL.ice2 },
  { id: "bolt", color: PAL.pur2 },
  { id: "wind", color: PAL.wnd2 },
];
export const REACTIONS = [
  { id: "vapor", pair: ["fire", "ice"], clip: "re-vapor", color: "#ffc8a0" },
  { id: "crystal", pair: ["ice", "bolt"], clip: "re-crystal", color: "#9fe8ff" },
  { id: "overload", pair: ["fire", "bolt"], clip: "re-overload", color: PAL.pur3 },
  { id: "labareda", pair: ["fire", "wind"], clip: "re-labareda", color: "#ffa040" },
  { id: "geada", pair: ["ice", "wind"], clip: "re-geada", color: PAL.wnd3 },
  { id: "temporal", pair: ["bolt", "wind"], clip: "re-temporal", color: "#9fe3ff" },
];
// Lenda → cor de destaque (elemento da arma inicial)
const LEGEND_COLOR = {
  guardian: PAL.org2, huntress: PAL.straw3, druid: PAL.ice2, shaman: PAL.wnd2,
  fulozinha: PAL.g6, maedoouro: PAL.yel2, anhanga: PAL.pur2,
};
const BOSS_SHOW = [
  { id: "mapinguari", clip: "boss-mapinguari", color: PAL.red2 },
  { id: "mula", clip: "boss-mula", color: PAL.org2 },
  { id: "caboclo", clip: "boss-caboclo", color: PAL.ice2 },
];

// Vídeo em laço carregado só quando aparece na tela (guardiao.js põe o src)
function loop(clip, { alt = "", cls = "", eager = false } = {}) {
  return `<div class="vid ${cls}"><video muted loop playsinline preload="none" ${eager ? 'data-eager="1"' : ""} poster="${ver(`media/${clip}.webp`)}" data-src="${ver(`media/${clip}.mp4`)}" ${alt ? `aria-label="${esc(alt)}"` : 'aria-hidden="true"'}></video></div>`;
}

// Silhueta de mata em pixel (determinística) para separar seções
function treeline(seed, { color = PAL.g0, back = PAL.t1, h = 30 } = {}) {
  let s = seed >>> 0;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const W = 320;
  const layer = (col, base, amp) => {
    let x = 0, rects = "";
    while (x < W) {
      const kind = rnd();
      if (kind < 0.55) {
        // pinheiro em degraus
        const th = Math.round(base + amp * (0.5 + rnd() * 0.7));
        const steps = Math.max(3, Math.round(th / 4));
        for (let i = 0; i < steps; i++) {
          const hw = Math.max(1, Math.round(((i + 1) / steps) * 4));
          const y = h - th + Math.round((i * th) / steps);
          rects += `M${x + 4 - hw} ${y}h${hw * 2}v${Math.ceil(th / steps) + 1}h${-hw * 2}z`;
        }
        rects += `M${x} ${h - 3}h9v3h-9z`;
        x += 7 + Math.round(rnd() * 3);
      } else {
        // copa redonda
        const th = Math.round(base * 0.8 + amp * rnd() * 0.6);
        const r = 4 + Math.round(rnd() * 3);
        for (let dy = -r; dy <= r; dy++) {
          const hw = Math.round(Math.sqrt(r * r - dy * dy));
          if (hw) rects += `M${x + r - hw} ${h - th + dy}h${hw * 2}v1h${-hw * 2}z`;
        }
        rects += `M${x + r - 1} ${h - th}h2v${th}h-2z`;
        x += r * 2 - 1 + Math.round(rnd() * 2);
      }
    }
    return `<path fill="${col}" d="${rects}"/>`;
  };
  const body = layer(back, 12, 10) + layer(color, 6, 9) + `<rect x="0" y="${h - 2}" width="${W}" height="2" fill="${color}"/>`;
  return `<svg class="treeline" viewBox="0 0 ${W} ${h}" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${body}</svg>`;
}

// Títulos de seção: "|" marca onde a linha PODE quebrar (cada pedaço fica inteiro). Útil em
// japonês/chinês, que quebram entre quaisquer dois caracteres.

// Título no estilo do gráfico da loja: linha grande dourada, linha pequena verde
function logo(t, { tag = "h1", cls = "" } = {}) {
  const [a, b, order] = t.titleLines;
  const big = order === "big-first" ? a : b;
  const small = order === "big-first" ? b : a;
  const bigEl = `<span class="logo-big">${esc(big)}</span>`;
  const smallEl = `<span class="logo-small">${esc(small)}</span>`;
  return `<${tag} class="logo ${cls}" data-order="${order}">${order === "big-first" ? bigEl + smallEl : smallEl + bigEl}</${tag}>`;
}

function sectionHead(title, sub, { accent = PAL.g6, id = "" } = {}) {
  return `<header class="sec-head">
  <h2 class="sec-title"${id ? ` id="${id}"` : ""}>${title.includes("|") ? title.split("|").map((p) => `<span class="nobr">${esc(p)}</span>`).join("") : esc(title)}</h2>
  <span class="sec-bar" style="--accent:${accent}"></span>
  ${sub ? `<p class="sec-sub">${esc(sub)}</p>` : ""}
</header>`;
}

// Botão principal conforme a fase (teste / pré-registro / loja)
function primaryCta(t, L, where) {
  const st = t.stage[C.STAGE];
  if (C.STAGE === "teste") {
    if (C.TESTER_GROUP_URL) {
      return `<a class="btn btn-primary" href="${esc(C.TESTER_GROUP_URL)}" target="_blank" rel="noopener" data-cta="tester_group" data-where="${where}">${icon("leaf", { size: 3 })}<span>${esc(st.cta)}</span></a>`;
    }
    const j = t.join.teste;
    const href = `mailto:${C.CONTACT}?subject=${encodeURIComponent(j.mailSubject)}&body=${encodeURIComponent(j.mailBody)}`;
    return `<a class="btn btn-primary" href="${esc(href)}" data-cta="tester_mail" data-where="${where}">${icon("leaf", { size: 3 })}<span>${esc(st.ctaMail)}</span></a>`;
  }
  return `<a class="btn btn-primary" href="${esc(C.PLAY_URL)}&amp;hl=${L.hreflang}" target="_blank" rel="noopener" data-cta="${C.STAGE === "pre" ? "preregister" : "play_store"}" data-play="1" data-where="${where}">${icon("play", { size: 3 })}<span>${esc(st.cta)}</span></a>`;
}

function langMenu(t, L, pagePath = "") {
  const items = C.LANGS.map(
    (o) =>
      `<li><a href="${C.BASE}${o.dir}${pagePath}" hreflang="${o.hreflang}" lang="${o.html}"${o.code === L.code ? ' aria-current="page"' : ""} data-lang="${o.code}">${esc(o.label)}</a></li>`,
  ).join("");
  return `<details class="lang">
  <summary aria-label="${esc(t.nav.lang)}">${icon("globe", { size: 2 })}<span>${esc(L.label)}</span></summary>
  <ul>${items}</ul>
</details>`;
}

function head(t, L, { title, description, canonical, alternates, ogImage, ogAlt, extra = "" }) {
  const cjkFont = CJK[L.code] ? `<link rel="preload" href="${ver(`fonts/FusionPixel-${L.code}.woff2`)}" as="font" type="font/woff2" crossorigin>` : "";
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${alternates}
<meta name="theme-color" content="${PAL.t0}">
<meta name="color-scheme" content="dark">
<link rel="icon" type="image/png" sizes="48x48" href="${A}img/favicon-48.png">
<link rel="icon" type="image/png" sizes="192x192" href="${A}img/icon-192.png">
<link rel="apple-touch-icon" href="${A}img/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(t.titleLines[2] === "big-first" ? `${t.titleLines[0]} ${t.titleLines[1]}` : `${t.titleLines[0]}${CJK[L.code] ? "" : " "}${t.titleLines[1]}`)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${L.og}">
<meta property="og:image" content="${C.SITE}${ogImage}">
<meta property="og:image:width" content="1024">
<meta property="og:image:height" content="500">
<meta property="og:image:alt" content="${esc(ogAlt)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="${A}fonts/Jersey15.woff2" as="font" type="font/woff2" crossorigin>
${cjkFont}
<link rel="stylesheet" href="${ver("css/guardiao.css")}">
${extra}
</head>`;
}

function jsonLd(t, L, url) {
  const name = t.titleLines[2] === "big-first" ? `${t.titleLines[0]} ${t.titleLines[1]}` : `${t.titleLines[0]}${CJK[L.code] ? "" : " "}${t.titleLines[1]}`;
  const data = {
    "@context": "https://schema.org",
    "@type": ["VideoGame", "MobileApplication"],
    name,
    alternateName: L.code === "pt" ? "Forest Guardian" : "Guardião da Floresta",
    url,
    inLanguage: L.html,
    description: t.meta.description,
    genre: ["Roguelite", "Action", "Survival"],
    gamePlatform: "Android",
    operatingSystem: "Android 7.0+",
    applicationCategory: "GameApplication",
    image: `${C.SITE}${A}img/og-${L.code}.jpg`,
    author: { "@type": "Organization", name: C.STUDIO, email: C.CONTACT },
    publisher: { "@type": "Organization", name: C.STUDIO },
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    availableLanguage: ["pt-BR", "en", "es", "ja", "zh-Hans", "zh-Hant"],
    ...(C.STAGE === "loja" ? { installUrl: C.PLAY_URL } : {}),
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

export function renderPage(t, L, all = []) {
  const url = `${C.SITE}${C.BASE}${L.dir}`;
  const alternates =
    C.LANGS.map((o) => `<link rel="alternate" hreflang="${o.hreflang}" href="${C.SITE}${C.BASE}${o.dir}">`).join("\n") +
    `\n<link rel="alternate" hreflang="x-default" href="${C.SITE}${C.BASE}">`;
  const st = t.stage[C.STAGE];
  const join = t.join[C.STAGE];
  const legends = LEGENDS.map((l) => ({ id: l.id, ...l[L.code === "pt" ? "pt" : L.code], namePt: l.pt.name }));
  // o JSON do Curupira (guardian) e dos outros traz { name, role, origin } por idioma
  const bosses = BOSS_SHOW.map((b) => {
    const src = BOSSES.find((x) => x.id === b.id);
    const loc = src[L.code === "pt" ? "pt" : L.code];
    return { ...b, name: loc.name ?? src.pt.name, role: loc.role, origin: loc.origin };
  });
  const privacyHref = L.code === "pt" ? `${C.BASE}privacidade/` : `${C.BASE}en/privacy/`;

  const html = `<!doctype html>
<html lang="${L.html}" data-lang="${L.code}" data-stage="${C.STAGE}" data-ph="${C.POSTHOG_KEY}" data-ph-host="${C.POSTHOG_HOST}" data-play="${esc(C.PLAY_URL)}" class="${CJK[L.code] ? "cjk" : "latin"} no-js">
${head(t, L, {
  title: t.meta.title,
  description: t.meta.description,
  canonical: url,
  alternates,
  ogImage: `${A}img/og-${L.code}.jpg`,
  ogAlt: t.meta.ogAlt,
  extra: jsonLd(t, L, url) + `<script>document.documentElement.classList.remove("no-js")</script>`,
})}
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
<div class="suggest" hidden>
  <a href="#" class="suggest-link"></a>
  <button type="button" class="suggest-close" aria-label="OK">×</button>
</div>

<header class="topbar">
  <div class="wrap topbar-inner">
    <a class="brand" href="${C.BASE}${L.dir}#top"><img src="${A}img/icon-192.png" width="36" height="36" alt=""><span>${esc(t.titleLines[2] === "big-first" ? `${t.titleLines[0]} ${t.titleLines[1]}` : `${t.titleLines[0]}${CJK[L.code] ? "" : " "}${t.titleLines[1]}`)}</span></a>
    <nav class="nav" aria-label="${esc(t.nav.play)}">
      <a href="#play">${esc(t.nav.play)}</a>
      <a href="#reactions">${esc(t.nav.reactions)}</a>
      <a href="#legends">${esc(t.nav.legends)}</a>
      <a href="#bosses">${esc(t.nav.bosses)}</a>
      <a href="#clearing">${esc(t.nav.clearing)}</a>
      <a href="#press">${esc(t.nav.press)}</a>
    </nav>
    ${langMenu(t, L)}
    <a class="btn btn-small" href="#join" data-cta="topbar_join" data-where="topbar">${esc(C.STAGE === "teste" ? st.cta : st.cta)}</a>
  </div>
</header>

<main id="main">
<section class="hero" id="top">
  <div class="hero-media">
    <video muted loop playsinline preload="none" aria-hidden="true"
      poster="${ver("media/hero-wide.webp")}"
      data-poster-tall="${ver("media/hero-tall.webp")}"
      data-wide="${ver("media/hero-wide.mp4")}" data-tall="${ver("media/hero-tall.mp4")}"></video>
  </div>
  <div class="hero-scrim"></div>
  <div class="wrap hero-inner">
    <p class="kicker">${esc(t.hero.kicker)}</p>
    ${logo(t)}
    <p class="lead">${esc(t.hero.lead)}</p>
    <p class="hero-sub">${esc(t.hero.sub)}</p>
    <div class="cta-row">
      ${primaryCta(t, L, "hero")}
      <a class="btn btn-ghost" href="#trailer" data-cta="hero_trailer" data-where="hero">${icon("play", { size: 2 })}<span>${esc(t.hero.trailer)}</span></a>
    </div>
    ${C.STAGE === "teste" ? `<p class="ios-note" hidden>${esc(st.ios)}</p>` : ""}
    <p class="stage-badge"><span class="dot" aria-hidden="true"></span>${esc(st.badge)}</p>
    <ul class="facts">${t.hero.facts.map((f) => `<li>${icon("spark", { size: 2 })}<span>${esc(f)}</span></li>`).join("")}</ul>
  </div>
  <a class="scroll-hint" href="#play" aria-label="${esc(t.hero.scroll)}">${icon("down", { size: 3 })}</a>
  ${treeline(7, { color: PAL.t0, back: PAL.t1, h: 34 })}
</section>

<section class="sec sec-howto" id="play" aria-labelledby="h-play">
  <div class="wrap">
    ${sectionHead(t.howto.title, t.howto.sub, { accent: PAL.g6, id: "h-play" })}
    <ol class="steps">
      <li class="panel step" style="--accent:${PAL.g6}">
        ${loop("step-move")}
        <div class="step-body"><span class="step-n">1</span><h3>${esc(t.howto.steps[0].t)}</h3><p>${esc(t.howto.steps[0].d)}</p></div>
      </li>
      <li class="panel step" style="--accent:${PAL.org2}">
        ${loop("step-auto")}
        <div class="step-body"><span class="step-n">2</span><h3>${esc(t.howto.steps[1].t)}</h3><p>${esc(t.howto.steps[1].d)}</p></div>
      </li>
      <li class="panel step" style="--accent:${PAL.pur2}">
        <div class="vid shot"><img src="${A}img/shots/cards-${L.code}.webp" width="1280" height="720" loading="lazy" decoding="async" alt="${esc(t.howto.cardsAlt)}"></div>
        <div class="step-body"><span class="step-n">3</span><h3>${esc(t.howto.steps[2].t)}</h3><p>${esc(t.howto.steps[2].d)}</p></div>
      </li>
    </ol>
  </div>
</section>

<section class="sec sec-reactions" id="reactions" aria-labelledby="h-reactions">
  <div class="wrap">
    ${sectionHead(t.reactions.title, t.reactions.sub, { accent: PAL.ice2, id: "h-reactions" })}
    <div class="react">
      <div class="react-pick panel" style="--accent:${PAL.ice2}">
        <p class="react-label" id="react-label">${esc(t.reactions.pick)}</p>
        <div class="elements" role="group" aria-labelledby="react-label">
          ${ELEMENTS.map(
            (e) => `<button type="button" class="el" data-el="${e.id}" style="--el:${e.color}" aria-pressed="${e.id === "fire" || e.id === "ice"}">
            ${icon(e.id, { size: 4 })}<span>${esc(t.reactions.elements[e.id])}</span></button>`,
          ).join("")}
        </div>
        <p class="react-eq" aria-live="polite">
          <span class="slot" data-slot="0"></span><span class="op">+</span><span class="slot" data-slot="1"></span><span class="op">=</span><span class="result"></span>
        </p>
        <p class="react-hint">${esc(t.reactions.hint)}</p>
      </div>
      <div class="react-stage panel" style="--accent:${PAL.yel2}">
        ${REACTIONS.map(
          (r, i) => `<figure class="react-card" data-reaction="${r.id}" data-pair="${r.pair.join(",")}" style="--rc:${r.color}"${i === 0 ? "" : " hidden"}>
          ${loop(r.clip, { eager: i === 0 })}
          <figcaption>
            <span class="react-name">${esc(t.reactions.list[r.id].name)}</span>
            <span class="react-pair">${esc(t.reactions.elements[r.pair[0]])} + ${esc(t.reactions.elements[r.pair[1]])}</span>
            <span class="react-d">${esc(t.reactions.list[r.id].d)}</span>
          </figcaption>
        </figure>`,
        ).join("")}
      </div>
    </div>
    <ul class="react-all">
      ${REACTIONS.map(
        (r) => `<li><button type="button" class="chip" data-show="${r.id}" style="--rc:${r.color}">
        ${icon(r.pair[0], { size: 2 })}${icon(r.pair[1], { size: 2 })}<span>${esc(t.reactions.list[r.id].name)}</span></button></li>`,
      ).join("")}
    </ul>
    <p class="note">${esc(t.reactions.also)}</p>
  </div>
</section>

<section class="sec sec-legends" id="legends" aria-labelledby="h-legends">
  <div class="wrap">
    ${sectionHead(t.legends.title, t.legends.sub, { accent: PAL.org2, id: "h-legends" })}
    <p class="rule">${icon("leaf", { size: 2 })}<span>${esc(t.legends.rule)}</span></p>
    <div class="legends">
      <div class="legend-tabs" role="tablist" aria-label="${esc(t.legends.pick)}">
        ${legends
          .map(
            (l, i) => `<button type="button" role="tab" class="legend-tab" id="tab-${l.id}" aria-controls="lp-${l.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-legend="${l.id}" style="--lc:${LEGEND_COLOR[l.id]}">
          <span class="sprite" style="background-image:url(${A}img/hero-${l.id}.png)" aria-hidden="true"></span>
          <span class="legend-tab-name">${esc(l.name)}</span></button>`,
          )
          .join("")}
      </div>
      ${legends
        .map(
          (l, i) => `<article class="legend-panel panel" role="tabpanel" id="lp-${l.id}" aria-labelledby="tab-${l.id}" style="--accent:${LEGEND_COLOR[l.id]}"${i === 0 ? "" : " hidden"}>
        ${loop(`leg-${l.id}`, { eager: false })}
        <div class="legend-body">
          <h3 class="legend-name">${esc(l.name)}</h3>
          <p class="legend-role">${esc(l.role)}</p>
          <p class="legend-origin"><span class="tag">${esc(t.legends.origin)}</span> ${esc(l.origin)}</p>
        </div>
      </article>`,
        )
        .join("")}
    </div>
  </div>
</section>

<section class="sec sec-bosses" id="bosses" aria-labelledby="h-bosses">
  <div class="wrap">
    ${sectionHead(t.bosses.title, t.bosses.sub, { accent: PAL.red2, id: "h-bosses" })}
    <p class="rule">${icon("spark", { size: 2 })}<span>${esc(t.bosses.rule)}</span></p>
    <div class="grid-3">
      ${bosses
        .map(
          (b) => `<article class="panel boss" style="--accent:${b.color}">
        ${loop(b.clip)}
        <div class="boss-body">
          <h3>${esc(b.name)}</h3>
          <p class="boss-role">${esc(b.role)}</p>
          <p class="boss-origin">${esc(b.origin)}</p>
        </div>
      </article>`,
        )
        .join("")}
    </div>
  </div>
</section>

<section class="sec sec-maps" id="maps" aria-labelledby="h-maps">
  <div class="wrap">
    ${sectionHead(t.maps.title, t.maps.sub, { accent: PAL.straw3, id: "h-maps" })}
    <div class="grid-2">
      <article class="panel map" style="--accent:${PAL.g6}">${loop("map-amazon")}<div class="map-body"><h3>${esc(t.maps.amazon)}</h3><p>${esc(t.maps.amazonD)}</p></div></article>
      <article class="panel map" style="--accent:${PAL.straw3}">${loop("map-caatinga")}<div class="map-body"><h3>${esc(t.maps.caatinga)}</h3><p>${esc(t.maps.caatingaD)}</p></div></article>
    </div>
  </div>
</section>

<section class="sec sec-clearing" id="clearing" aria-labelledby="h-clearing">
  ${treeline(31, { color: PAL.g1, back: PAL.t2, h: 30 })}
  <div class="wrap">
    ${sectionHead(t.clearing.title, t.clearing.sub, { accent: PAL.straw3, id: "h-clearing" })}
    <div class="clearing">
      <div class="panel clearing-hero" style="--accent:${PAL.straw3}">${loop("camp-aerial", { alt: t.clearing.aerialAlt })}</div>
      <ul class="clearing-list">
        ${t.clearing.items
          .map(
            (it, i) => `<li class="panel clearing-item" style="--accent:${[PAL.g6, PAL.ice2, PAL.org2, PAL.straw3][i]}">
          ${i < 3 ? loop(["camp-garden", "camp-fish", "camp-kitchen"][i], { cls: "mini" }) : `<div class="vid mini sprite-box"><span class="sprite big" style="background-image:url(${A}img/hero-guardian.png)"></span></div>`}
          <div><h3>${esc(it.t)}</h3><p>${esc(it.d)}</p></div></li>`,
          )
          .join("")}
      </ul>
    </div>
  </div>
</section>

<section class="sec sec-fair" id="fair" aria-labelledby="h-fair">
  <div class="wrap">
    ${sectionHead(t.fair.title, t.fair.sub, { accent: PAL.yel2, id: "h-fair" })}
    <ul class="fair">
      ${t.fair.items.map((it) => `<li>${icon("check", { size: 3 })}<div><h3>${esc(it.t)}</h3><p>${esc(it.d)}</p></div></li>`).join("")}
    </ul>
    <ul class="numbers" aria-label="${esc(t.press.title)}">
      ${t.numbers.map(([n, w]) => `<li><span class="num">${esc(n)}</span><span class="what">${esc(w)}</span></li>`).join("")}
    </ul>
  </div>
</section>

<section class="sec sec-trailer" id="trailer" aria-labelledby="h-trailer">
  <div class="wrap">
    ${sectionHead(t.trailer.title, t.trailer.note, { accent: PAL.pink, id: "h-trailer" })}
    <div class="panel trailer" style="--accent:${PAL.pink}">
      <video class="trailer-video" playsinline preload="none" poster="${ver("media/trailer.webp")}" data-src="${ver("media/trailer-720p.mp4")}" aria-label="${esc(t.trailer.play)}"></video>
      <button type="button" class="trailer-play" data-cta="trailer_play" data-where="trailer">
        <span class="trailer-play-icon">${icon("play", { size: 5 })}</span>
        <span class="trailer-play-label">${esc(t.trailer.play)}</span>
        <span class="trailer-play-meta">${esc(t.trailer.meta)}</span>
      </button>
    </div>
  </div>
</section>

<section class="sec sec-join" id="join" aria-labelledby="h-join">
  ${treeline(55, { color: PAL.g0, back: PAL.t1, h: 30 })}
  <div class="wrap">
    <div class="panel join" style="--accent:${PAL.g6}">
      <div class="join-sprites" aria-hidden="true">${legends.slice(0, 4).map((l) => `<span class="sprite walk" style="background-image:url(${A}img/hero-${l.id}.png)"></span>`).join("")}</div>
      <h2 class="sec-title" id="h-join">${esc(join.title)}</h2>
      <p class="join-text">${esc(join.text)}</p>
      ${join.steps.length ? `<ol class="join-steps">${join.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}
      ${C.STAGE === "teste" ? `<p class="ios-note" hidden>${esc(t.stage.teste.ios)}</p>` : ""}
      <div class="cta-row center">${primaryCta(t, L, "join")}</div>
      ${C.STAGE === "teste" && C.TESTER_GROUP_URL ? `<p class="join-optin"><a href="${esc(C.TEST_OPTIN_URL)}" target="_blank" rel="noopener" data-cta="test_optin" data-where="join">${esc(join.optin)}</a></p>` : ""}
      <p class="fine">${esc(join.fine)}</p>
    </div>
  </div>
</section>

<section class="sec sec-press" id="press" aria-labelledby="h-press">
  <div class="wrap">
    ${sectionHead(t.press.title, t.press.sub, { accent: PAL.cream, id: "h-press" })}
    <div class="press">
      <dl class="panel facts-table" style="--accent:${PAL.cream}">
        ${t.press.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl>
      <div class="press-side">
        <p class="press-about">${esc(t.press.about)}</p>
        <div class="downloads">
          <a class="dl" href="${A}guardiao-da-floresta-presskit.zip" download data-cta="presskit" data-where="press">${icon("download", { size: 3 })}<span><strong>${esc(t.press.kit)}</strong><small>${esc(fmt(t.press.kitMeta, mb("guardiao-da-floresta-presskit.zip")))}</small></span></a>
          <a class="dl" href="${A}media/trailer-720p.mp4" download="guardiao-da-floresta-trailer-720p.mp4" data-cta="trailer_download" data-where="press">${icon("download", { size: 3 })}<span><strong>${esc(t.press.trailer)}</strong><small>${esc(fmt(t.press.trailerMeta, mb("media/trailer-720p.mp4")))}</small></span></a>
          <a class="dl" href="mailto:${C.CONTACT}" data-cta="contact" data-where="press">${icon("mail", { size: 3 })}<span><strong>${esc(t.press.contact)}</strong><small>${esc(C.CONTACT)}</small></span></a>
        </div>
      </div>
    </div>
  </div>
</section>
</main>

<footer class="footer">
  ${treeline(91, { color: PAL.t0, back: PAL.g0, h: 30 })}
  <div class="wrap footer-inner">
    <div class="footer-brand">${logo(t, { tag: "p", cls: "logo-sm" })}<p>${esc(t.footer.rights)}</p></div>
    <div class="footer-links">
      <a href="${privacyHref}">${esc(t.footer.privacy)}</a>
      <a href="/privacy-${L.code === "pt" ? "pt" : "en"}.html">${esc(t.footer.sitePrivacy)}</a>
      <a href="mailto:${C.CONTACT}">${esc(C.CONTACT)}</a>
      <a href="/">${esc(t.footer.dev)}</a>
    </div>
    <div class="footer-langs">${langMenu(t, L)}</div>
    <p class="footer-small">${esc(t.footer.made)} ${esc(t.footer.tm)}</p>
  </div>
</footer>
<script type="application/json" id="g-i18n">${JSON.stringify({
    reactions: Object.fromEntries(REACTIONS.map((r) => [r.id, t.reactions.list[r.id].name])),
    elements: t.reactions.elements,
    video: t.video,
    suggest: Object.fromEntries(all.map(([code, tt]) => [code, tt.suggest])),
    dirs: Object.fromEntries(C.LANGS.map((o) => [o.code, `${C.BASE}${o.dir}`])),
  }).replace(/</g, "\\u003c")}</script>
<script src="${ver("js/guardiao.js")}" defer></script>
</body>
</html>
`;
  return html;
}
