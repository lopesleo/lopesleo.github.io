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
