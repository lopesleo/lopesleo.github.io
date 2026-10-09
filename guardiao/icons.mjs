// Ícones em pixel art desenhados aqui mesmo (mesma paleta do jogo), viram <svg> com
// shape-rendering="crispEdges". Cada letra do desenho é uma cor; "." é transparente.
import { PAL } from "./palette.mjs";

const ICONS = {
  fire: {
    c: { r: PAL.org1, o: PAL.org2, y: PAL.yel3, w: PAL.white },
    d: [
      ".....r......",
      "....ro......",
      "....roo.....",
      "...rooo..r..",
      "...rooyo.ro.",
      "..rooyyoooo.",
      "..royyyyooo.",
      ".rooyyyyyoor",
      ".royyywyyyor",
      ".royywwwyyor",
      "..royywyyor.",
      "...rrooorr..",
    ],
  },
  ice: {
    c: { i: PAL.ice2, l: PAL.ice3, w: PAL.white },
    d: [
      ".....i.....",
      "...i.l.i...",
      "....ili....",
      ".i...l...i.",
      "..i..l..i..",
      "iilllwllli.",
      "..i..l..i..",
      ".i...l...i.",
      "....ili....",
      "...i.l.i...",
      ".....i.....",
    ],
  },
  bolt: {
    c: { p: PAL.pur2, l: PAL.pur3, w: PAL.white },
    d: [
      "......pp",
      ".....plp",
      "....plp.",
      "...plp..",
      "..pllpp.",
      ".pwwwlp.",
      ".ppplp..",
      "...plp..",
      "..plp...",
      "..pp....",
      ".pp.....",
      ".p......",
    ],
  },
  wind: {
    c: { g: PAL.wnd1, m: PAL.wnd2, w: PAL.wnd3 },
    d: [
      ".......mmm..",
      "..........m.",
      ".mmmmmmmmm.m",
      "..........m.",
      "............",
      "wwwwwwwwwwm.",
      "...........g",
      ".gggg......g",
      ".....gggggg.",
    ],
  },
  play: {
    c: { k: PAL.ink, c: PAL.cream },
    d: ["c.....", "cc....", "ccc...", "cccc..", "ccccc.", "cccc..", "ccc...", "cc....", "c....."],
  },
  check: {
    c: { g: PAL.g6 },
    d: [".......g", "......gg", ".....gg.", "g...gg..", "gg.gg...", ".ggg....", "..g....."],
  },
  down: {
    c: { c: PAL.cream },
    d: ["..ccc..", "..ccc..", "..ccc..", "ccccccc", ".ccccc.", "..ccc..", "...c..."],
  },
  download: {
    c: { c: PAL.cream },
    d: ["...ccc...", "...ccc...", "...ccc...", ".ccccccc.", "..ccccc..", "...ccc...", "c...c...c", "c.......c", "ccccccccc"],
  },
  mail: {
    c: { c: PAL.cream },
    d: ["ccccccccccc", "cc.......cc", "c.c.....c.c", "c..c...c..c", "c...ccc...c", "c.........c", "ccccccccccc"],
  },
  globe: {
    c: { c: PAL.cream },
    d: ["..ccccc..", ".c..c..c.", "c..c.c..c", "ccccccccc", "c..c.c..c", "ccccccccc", "c..c.c..c", ".c..c..c.", "..ccccc.."],
  },
  leaf: {
    c: { d: PAL.g4, l: PAL.g6 },
    d: ["......ll", "....llll", "..lllldl", ".llldll.", ".lldll..", ".ldll...", "d.ll....", "d......."],
  },
  spark: {
    c: { y: PAL.yel3, w: PAL.white },
    d: ["...y...", "...y...", "..yyy..", "yyywyyy", "..yyy..", "...y...", "...y..."],
  },
};

// Desenho → <svg>. size = pixels de tela por pixel de arte (o CSS pode sobrescrever).
export function icon(name, { size = 3, cls = "", label = "" } = {}) {
  const ic = ICONS[name];
  if (!ic) throw new Error(`ícone desconhecido: ${name}`);
  const h = ic.d.length;
  const w = Math.max(...ic.d.map((r) => r.length));
  let rects = "";
  ic.d.forEach((row, y) => {
    // junta pixels vizinhos da mesma cor numa faixa só (SVG menor)
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || ch === " ") { x++; continue; }
      let run = 1;
      while (row[x + run] === ch) run++;
      rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${ic.c[ch]}"/>`;
      x += run;
    }
  });
  const a11y = label ? `role="img" aria-label="${label}"` : `aria-hidden="true" focusable="false"`;
  return `<svg class="px-icon ${cls}" viewBox="0 0 ${w} ${h}" width="${w * size}" height="${h * size}" shape-rendering="crispEdges" ${a11y}>${rects}</svg>`;
}

export const ICON_NAMES = Object.keys(ICONS);
