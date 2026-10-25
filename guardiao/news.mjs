// Página "Novidades" (notas de versão), uma por idioma. Mesmo cabeçalho, rodapé, paleta e CSS da página principal.
import * as C from "./config.mjs";
import { esc, head, footerHtml, primaryCta, newsHref, studioOrg, topbar, brandName, ver } from "./page.mjs";
import { PAL } from "./palette.mjs";
import { visible } from "./patchnotes.mjs";

const A = `${C.BASE}assets/`;
const CJK = { ja: true, zh: true, zht: true };
const LOCALE = { pt: "pt-BR", en: "en-US", es: "es", ja: "ja-JP", zh: "zh-CN", zht: "zh-TW" };
const fmt = (s, ...v) => String(s).replace(/\{(\d)\}/g, (_, i) => v[i]);

// "2026-10-23" → "23 de outubro de 2026", "October 23, 2026", "2026年10月23日"…
const date = (iso, code) =>
  new Intl.DateTimeFormat(LOCALE[code], { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));

const CSS = `
.news-main{padding:calc(64px + clamp(40px,6vw,72px)) 0 clamp(56px,7vw,96px);background:var(--t0)}
.news-list{list-style:none;margin:0;padding:0;display:grid;gap:30px;max-width:820px}
.news-card{padding:22px 22px 20px}
.news-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;margin:0 0 12px}
.news-ver{margin:0;font:400 38px/1 var(--display);color:var(--goldhi);text-shadow:var(--outline-sm);letter-spacing:.01em;-webkit-font-smoothing:none}
html.cjk .news-ver{font-size:32px}
.news-date{color:var(--cream-3);font-size:15px;font-weight:700}
.news-tag{font:400 17px/1 var(--display);letter-spacing:.04em;text-transform:uppercase;color:var(--ink);background:var(--gold);padding:4px 8px 3px;box-shadow:0 2px 0 var(--ink)}
.news-lines{margin:0;padding:0;list-style:none;display:grid;gap:9px}
.news-lines li{position:relative;padding-left:22px;color:var(--cream-2);font-size:17px;line-height:1.5}
.news-lines li::before{content:"";position:absolute;left:3px;top:.62em;width:8px;height:8px;background:var(--accent);box-shadow:0 2px 0 var(--ink)}
.news-note{margin:26px 0 0;max-width:820px;color:var(--cream-3);font-size:14px}
.news-cta{margin-top:40px;max-width:820px;padding:24px 22px;text-align:center}
.news-cta p{margin:0 0 16px;font:400 clamp(24px,3.4vw,32px)/1.15 var(--display);color:var(--cream);text-shadow:var(--outline-sm)}
html.cjk .news-cta p{font-size:clamp(20px,3vw,26px);line-height:1.4}
@media (min-width:640px){.news-card{padding:28px 32px 26px}.news-ver{font-size:46px}}
`;

export function renderNews(t, L, list) {
  const n = t.news;
  const url = `${C.SITE}${newsHref(L.code)}`;
  const alternates =
    C.LANGS.map((o) => `<link rel="alternate" hreflang="${o.hreflang}" href="${C.SITE}${newsHref(o.code)}">`).join("\n") +
    `\n<link rel="alternate" hreflang="x-default" href="${C.SITE}${newsHref("pt")}">`;
  const versions = visible(list).filter((v) => v.notes[L.code]?.length);
  const home = `${C.BASE}${L.dir}`;
  const brand = brandName(t, L);
  const crumb = (i, name, item) => ({ "@type": "ListItem", position: i, name, item });
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      studioOrg(),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          crumb(1, C.STUDIO, `${C.SITE}/`),
          crumb(2, brand, `${C.SITE}${home}`),
          crumb(3, t.nav.news, url),
        ],
      },
      { "@type": "CollectionPage", "@id": `${url}#page`, url, name: n.metaTitle, description: n.metaDesc, inLanguage: L.html, isPartOf: { "@id": `${C.SITE}/#website` }, about: { "@type": "VideoGame", name: brand, url: `${C.SITE}${home}` }, publisher: { "@id": studioOrg()["@id"] } },
    ],
  };
  const ldTag = `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\u003c")}</script>`;
  const cards = versions
    .map(
      (v, i) => `<li class="panel news-card" id="v${v.version}" style="--accent:${i === 0 ? PAL.yel2 : PAL.g6}">
  <div class="news-head">
    <h2 class="news-ver">${esc(fmt(n.version, v.version))}</h2>
    <span class="news-date"><time datetime="${v.date}">${esc(date(v.date, L.code))}</time></span>${i === 0 ? `\n    <span class="news-tag">${esc(n.latest)}</span>` : ""}
  </div>
  <ul class="news-lines">${v.notes[L.code].map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
</li>`,
    )
    .join("\n");
  return `<!doctype html>
<html lang="${L.html}" data-lang="${L.code}" data-stage="${C.STAGE}" class="${CJK[L.code] ? "cjk" : "latin"} no-js">
${head(t, L, { title: n.metaTitle, description: n.metaDesc, canonical: url, alternates, ogImage: `${A}img/social-${L.code}.jpg`, ogAlt: t.meta.ogAlt, extra: `${ldTag}<style>${CSS.replace(/\s*\n\s*/g, "")}</style>` })}
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${topbar(t, L, { home, onNews: true, pagePath: (o) => C.NEWS_PATH[o.code] })}

<main id="main" class="news-main">
  <div class="wrap">
    <header class="sec-head">
      <h1 class="sec-title">${esc(n.title)}</h1>
      <span class="sec-bar" style="--accent:${PAL.g6}"></span>
      <p class="sec-sub">${esc(n.lead)}</p>
    </header>
    <ol class="news-list">
${cards}
    </ol>
    <p class="news-note">${esc(n.note)}</p>
    <aside class="panel news-cta" style="--accent:${PAL.goldhi}">
      <p>${esc(n.call[C.STAGE])}</p>
      ${primaryCta(t, L, "news")}
    </aside>
  </div>
</main>

${footerHtml(t, L, (o) => C.NEWS_PATH[o.code])}
<script src="${ver("js/guardiao.js")}" defer></script>
</body>
</html>
`;
}
