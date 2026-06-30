import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Languages, Download } from "lucide-react";
import { useTheme } from "../hooks/use-theme";
import { useLang } from "../i18n/language";
import { cn } from "../lib/utils";
import { track } from "../lib/analytics";

const sectionIds = [
  "home",
  "about",
  "technologies",
  "projects",
  "experience",
  "contact",
] as const;

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Light mode" : "Dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-brand/50 hover:text-brand"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function LangToggle() {
  const { lang, toggleLang, t } = useLang();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.langLabel}
      title={t.langLabel}
      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:text-brand"
    >
      <Languages size={16} />
      {lang === "pt" ? "EN" : "PT"}
    </button>
  );
}

export function Header() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  const navLinks = sectionIds.map((id) => ({
    href: `#${id}`,
    label: t.nav[id],
  }));
  const cvHref = `/cv/leonardo-lopes-${lang}.html`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="text-lg font-bold tracking-tight">
            Leonardo<span className="text-brand">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  active === link.href
                    ? "text-brand"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active === link.href && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand" />
                )}
              </a>
            ))}
            <div className="ml-2 flex items-center gap-2">
              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cv_download", { lang, location: "header" })}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-medium text-brand-foreground transition-all hover:-translate-y-0.5"
              >
                <Download size={16} />
                {t.downloadCV}
              </a>
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-brand/50"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-border bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                active === link.href
                  ? "bg-brand/10 text-brand"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={cvHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("cv_download", { lang, location: "header_mobile" });
              setOpen(false);
            }}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-base font-medium text-brand-foreground"
          >
            <Download size={18} />
            {t.downloadCV}
          </a>
        </div>
      </div>
    </header>
  );
}
