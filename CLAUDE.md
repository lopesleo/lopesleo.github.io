# CLAUDE.md

Guidance for working in this repository.

## Project

Personal portfolio of **Leonardo Lopes Almeida** (back-end & automation/RPA developer),
deployed to GitHub Pages at https://lopesleo.github.io. Single-page React site,
bilingual (PT/EN), with light/dark theme and a downloadable CV.

## Stack

- **React 18** + **TypeScript** + **Vite 4**
- **Tailwind CSS 3** with shadcn-style CSS-variable tokens (`src/index.css`)
- Icons: `lucide-react` and `react-icons`
- Deploy: `gh-pages` (base path `/`, user/root repo)

## Commands

```bash
npm run dev      # local dev server (Vite)
npm run build    # tsc --noEmit + vite build -> dist/
npm run lint     # eslint (ts/tsx, zero warnings allowed)
npm run deploy   # build + publish dist/ to gh-pages branch
```

Always run `npm run build` before considering a change done — `tsc` runs first and
will catch type errors.

## Architecture

```
index.html              # SEO/OG/Twitter meta, JSON-LD, anti-FOUC theme script
src/
  main.tsx              # mounts App inside <LanguageProvider>
  App.tsx               # section order; sections own their own id + scroll-mt
  index.css             # design tokens (--brand etc.), reveal/animation utilities
  components/           # header, hero, about, technologies, projects, experience,
                        #   contact, footer, reveal, rich-text
  hooks/use-theme.ts    # light/dark: localStorage + system pref
  i18n/
    translations.ts     # ALL UI strings (ui.pt/ui.en) + technologies + projects data
    language.tsx        # LanguageProvider + useLang() -> { lang, setLang, toggleLang, t }
public/
  favicon.svg, og.svg
  cv/leonardo-lopes-{pt,en}.html   # print-ready CVs (window.print() = save as PDF)
```

## Conventions

- **All user-facing text lives in `src/i18n/translations.ts`** — never hardcode
  strings in components. Components read them via `const { t } = useLang()`.
  Keep `ui.pt` and `ui.en` structurally identical (no `as const` — it breaks the
  shared type).
- **Paragraphs** can use `**term**` for emphasis; render with `<RichText>`.
- **Projects** are data in `translations.ts` (`projects[]`): shared fields
  (`title`, `tech`, `github`, `live?`, `featured`) plus per-language
  `{ description, highlights }`. Only `featured` ones render on the site.
  Project facts must match the real GitHub repos — verify stacks, don't guess.
- **Brand color** = CSS var `--brand` (violet) with gradient to `--brand-2` (sky).
  Use Tailwind `brand` / `brand-2` / `text-gradient` / `shadow-glow`.
- **Scroll animations**: wrap blocks in `<Reveal delay={ms}>`; it respects
  `prefers-reduced-motion` (handled in `index.css`).
- **CV download**: header/hero link to `/cv/leonardo-lopes-${lang}.html` so the
  downloaded CV matches the site's current language. **Always mirror content
  changes here too**: whenever you change owner facts on the site (stack,
  experience, education/courses, projects, contact), update **both** CV HTML
  files (`-pt` and `-en`) in the same change so the site and CV never drift.

## Owner facts (for content)

SI student at CEFET/RJ Nova Friburgo (2019–2026 expected); back-end dev at
**GoLiveTech** since May 2023; Nova Friburgo/RJ; English B2.
Focus: back-end (C#/.NET, Python/FastAPI, Node/TS) + automation/RPA (Selenium,
CDP, FlaUI; gov portals eCAC/SEFAZ/PROUNI) + applied AI (Gemini, Whisper, LLMs).
Published npm package: `@lopesleo/sdkcorreiosts`.

## Guardrails

- Don't invent metrics, dates, or facts — use only what's in the repos or
  confirmed by the owner.
- The GitHub profile README lives in a separate repo (`lopesleo/lopesleo`), not here.
- Don't `git push` / deploy without explicit approval.
- Site and CV must stay in sync: any content/fact change to the site also goes
  into both `public/cv/leonardo-lopes-{pt,en}.html` (see CV download convention).
