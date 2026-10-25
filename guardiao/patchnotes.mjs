// Notas de versão do jogo (página "Novidades").
// Fonte: o PLAY_STORE.md do repositório do jogo (seção "Notas da versão"): cada versão é um
// "### 1.0.X (código N) — DD/MM/AAAA" com um bloco ``` que traz <pt-BR>…</pt-BR>, <en-US>… etc.
// Plano B: guardiao/data/patchnotes.json (cópia gerada por este mesmo código). Se o arquivo do jogo
// existir no build, o JSON é regravado; se não existir (build na nuvem), o JSON é lido.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as C from "./config.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const JSON_PATH = path.join(HERE, "data/patchnotes.json");

// código do site → marcação da loja
const TAGS = { pt: "pt-BR", en: "en-US", es: "es-419", ja: "ja-JP", zh: "zh-CN", zht: "zh-TW" };

const cmp = (a, b) => {
  const x = a.split(".").map(Number), y = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
  return 0;
};

// Lê o markdown e devolve todas as versões publicadas com bloco de notas (da mais nova para a mais antiga)
export function parsePlayStore(md) {
  md = md.replace(/\r/g, "");
  const start = md.search(/^## Notas da versão/m);
  if (start < 0) throw new Error('seção "Notas da versão" não encontrada');
  let body = md.slice(start);
  const end = body.slice(3).search(/^## /m);
  if (end >= 0) body = body.slice(0, end + 3);
  const out = [];
  const parts = body.split(/^### /m).slice(1);
  for (const part of parts) {
    const h = /^(\d+\.\d+\.\d+) \(código (\d+)\) — (\d{2})\/(\d{2})\/(\d{4})/.exec(part);
    if (!h) continue; // outros títulos (ex.: idiomas)
    const block = /```\n([\s\S]*?)```/.exec(part);
    if (!block) continue; // sem bloco de notas
    const pre = part.slice(0, block.index);
    if (/não publicada|rascunho:|\*\*rascunho/i.test(pre)) continue; // nunca chegou aos jogadores
    const notes = {};
    for (const [code, tag] of Object.entries(TAGS)) {
      const m = new RegExp(String.raw`<${tag}>\n([\s\S]*?)</${tag}>`).exec(block[1]);
      if (!m) { notes[code] = null; continue; }
      const lines = [];
      for (const raw of m[1].split("\n")) {
        const l = raw.trim();
        if (!l) continue;
        if (l.startsWith("•")) lines.push(l.replace(/^•\s*/, ""));
        else if (lines.length) lines[lines.length - 1] += " " + l; // linha quebrada
      }
      notes[code] = lines;
    }
    out.push({ version: h[1], code: Number(h[2]), date: `${h[5]}-${h[4]}-${h[3]}`, notes });
  }
  return out.sort((a, b) => cmp(b.version, a.version));
}

// Todas as versões publicadas (sem o corte). Atualiza o JSON quando a fonte existe.
export function loadAll({ write = true } = {}) {
  const src = process.env.PATCH_NOTES_SOURCE || C.PATCH_NOTES_SOURCE;
  if (src && fs.existsSync(src)) {
    const list = parsePlayStore(fs.readFileSync(src, "utf8"));
    if (write) {
      fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true });
      fs.writeFileSync(JSON_PATH, JSON.stringify({ source: "docs/PLAY_STORE.md (repositório do jogo)", versions: list }, null, 2) + "\n");
    }
    return { list, from: "fonte" };
  }
  const j = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
  return { list: j.versions, from: "json" };
}

// O que aparece no site: só até PATCH_NOTES_MAX, e só versões com texto no idioma pedido
export function visible(list) {
  return list.filter((v) => cmp(v.version, C.PATCH_NOTES_MAX) <= 0);
}
