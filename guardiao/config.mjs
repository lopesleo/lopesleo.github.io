// Página oficial do Guardião da Floresta (https://komedygames.com/guardiao/; desde 20/10/2026 no domínio do estúdio,
// publicado pelo repositório lopesleo/komedygames na Cloudflare Pages; a cópia em lopesleo.github.io/guardiao/ segue no ar
// com os endereços canônicos apontando para o domínio).
// O que muda com a fase do lançamento fica TODO aqui. Depois de editar: `node guardiao/build.mjs`
// (o `npm run build` do site já roda o gerador antes).

// Fase do botão principal:
//   "teste" → teste fechado: "Quero testar" (Grupo do Google ou, sem ele, e-mail pedindo convite)
//   "pre"   → pré-registro aberto na Play
//   "loja"  → publicado: "Baixar na Google Play"
export const STAGE = "teste";

// Link do Grupo do Google dos testadores (ex.: "https://groups.google.com/g/guardiao-testadores").
// Vazio = o botão abre um e-mail pedindo o convite.
export const TESTER_GROUP_URL = "";

export const PACKAGE = "com.lopesleo.guardiao";
export const PLAY_URL = `https://play.google.com/store/apps/details?id=${PACKAGE}`;
// Página de aceite do teste fechado (só funciona para quem está na lista ou no grupo)
export const TEST_OPTIN_URL = `https://play.google.com/apps/testing/${PACKAGE}`;

export const SITE = "https://komedygames.com";
export const BASE = "/guardiao/";
export const CONTACT = "lopesleo.dev@gmail.com";
// servidor oficial no Discord (convite permanente; criado por tools/discord/setup.mjs no repositório do jogo)
export const DISCORD = "https://discord.gg/TTYnNtQAes";
export const STUDIO = "Komedy Games Studio";

// Chave PÚBLICA de projeto do PostHog (a mesma dos CVs do portfólio; segura no cliente).
// Eventos anônimos, sem cookies, via sendBeacon. Vazio = não mede nada.
export const POSTHOG_KEY = "phc_yk5xJd7QQN4XRStH6heLBpStdmWbbngXwQQyhBkkzQ7n";
export const POSTHOG_HOST = "https://us.i.posthog.com";

// Idiomas: código da página → pasta, atributo lang, hreflang e catálogo
export const LANGS = [
  { code: "pt", dir: "", html: "pt-BR", hreflang: "pt-BR", label: "Português", og: "pt_BR" },
  { code: "en", dir: "en/", html: "en", hreflang: "en", label: "English", og: "en_US" },
  { code: "es", dir: "es/", html: "es", hreflang: "es", label: "Español", og: "es_LA" },
  { code: "ja", dir: "ja/", html: "ja", hreflang: "ja", label: "日本語", og: "ja_JP" },
  { code: "zh", dir: "zh/", html: "zh-Hans", hreflang: "zh-Hans", label: "简体中文", og: "zh_CN" },
  { code: "zht", dir: "zh-hant/", html: "zh-Hant", hreflang: "zh-Hant", label: "繁體中文", og: "zh_TW" },
];

// Política de privacidade do JOGO (o app). PT é a versão de referência.
export const PRIVACY = [
  { code: "pt", path: "privacidade/", html: "pt-BR" },
  { code: "en", path: "en/privacy/", html: "en" },
];

// Página "Novidades" (notas de versão). As notas vêm do PLAY_STORE.md do repositório do jogo (só leitura);
// sem esse arquivo (build na nuvem) vale a cópia guardiao/data/patchnotes.json, regravada a cada build local.
export const PATCH_NOTES_SOURCE = "D:/dev/Dalmo-game/p2/guardiao/docs/PLAY_STORE.md";
// Última versão já publicada para os testadores. Versões acima dela não aparecem no site.
// Ao publicar uma versão nova na Play, suba este número e rode o build.
export const PATCH_NOTES_MAX = "1.0.22";
// Endereço da página por idioma (depois de BASE + dir do idioma)
export const NEWS_PATH = { pt: "novidades/", en: "patch-notes/", es: "novedades/", ja: "updates/", zh: "updates/", zht: "updates/" };

// --- GEO: fatos citáveis (conferidos com src/config.js do jogo em 25/10/2026) ---
// Armas-base = BASE_WEAPON_KEYS (18); evoluções = EVOLUTION_KEYS (24 = 18 com 2ª arma + 6 Catalisadores);
// guardiões = CHARACTERS (7); mapas = BIOMES (amazonia, caatinga); Perigos = DIFFICULTY (5); conquistas = ACHIEVEMENTS (33);
// reações = REACTION (Vapor, Cristal, Sobrecarga, Labareda, Geada, Temporal). Mudou o jogo? Atualize aqui e a data abaixo.
export const FACTS = { weapons: 18, evolutions: 24, guardians: 7, reactions: 6, maps: 2, dangers: 5, achievements: 33, runMinutes: 7 };
// Data da última conferência dos fatos (mostrada na ficha e usada como dateModified)
export const FACTS_UPDATED = "2026-10-25";
export const TIKTOK = "https://www.tiktok.com/@guardiaodaflorestaofc";
export const INSTAGRAM = "https://www.instagram.com/guardiaodaflorestaofc/";
export const X_PROFILE = "https://x.com/guardiao_game";
// Mesmos perfis em todo lugar (JSON-LD do estúdio, do jogo e llms.txt); só perfis que existem
export const SAME_AS = [DISCORD, INSTAGRAM, TIKTOK, X_PROFILE];
// Descrição única do estúdio (a mesma no JSON-LD de todas as páginas e no llms.txt)
export const STUDIO_DESC = "Independent game studio from Nova Friburgo, Rio de Janeiro, Brazil. Maker of Guardião da Floresta (Forest Guardian), a free survival roguelite for Android inspired by Brazilian folklore.";
// Nome do jogo em cada idioma, em maiúsculas e minúsculas normais (JSON-LD, og:site_name, llms.txt)
export const GAME_NAME = { pt: "Guardião da Floresta", en: "Forest Guardian", es: "Guardián del Bosque", ja: "森の守護者", zh: "森林守护者", zht: "森林守護者" };
