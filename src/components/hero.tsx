import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { useLang } from "../i18n/language";
import { track } from "../lib/analytics";

// Lazy-loaded so three.js ships in a separate chunk, off the critical path.
const Hero3D = lazy(() => import("./hero-3d"));

function canRender3D() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 768;
  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    webgl = false;
  }
  // Mobile excluded by width; respect reduced-motion for accessibility.
  return webgl && !reduce && !narrow;
}

export function Hero() {
  const { t, lang } = useLang();
  const cvHref = `/cv/leonardo-lopes-${lang}.html`;
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    setShow3D(canRender3D());
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl animate-blob" />
        <div className="absolute right-1/4 top-1/3 h-80 w-80 translate-x-1/2 rounded-full bg-brand-2/20 blur-3xl animate-blob [animation-delay:5s]" />
        {show3D && (
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="mx-auto max-w-4xl animate-fade-in">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.hero.badge}
          </span>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            Leonardo Lopes
          </h1>
          <p className="mb-6 text-balance text-xl font-semibold md:text-2xl">
            <span className="text-gradient">{t.hero.role}</span>
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-3 font-medium text-brand-foreground shadow-glow transition-all duration-300 hover:-translate-y-0.5"
            >
              {t.hero.ctaProjects}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cv_download", { lang, location: "hero" })}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-7 py-3 font-medium text-foreground transition-all duration-300 hover:border-brand/50 hover:text-brand"
            >
              <Download size={18} />
              {t.downloadCV}
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href="https://github.com/lopesleo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/leonardolopesalmeida/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:lopesleo.dev@gmail.com"
              aria-label="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
