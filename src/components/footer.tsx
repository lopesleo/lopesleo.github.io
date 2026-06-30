import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLang } from "../i18n/language";

export function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();
  const privacyHref = `/privacy-${lang}.html`;

  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="#home" className="text-lg font-bold tracking-tight">
            Leonardo<span className="text-brand">.</span>
          </a>

          <p className="text-sm text-muted-foreground">
            © {year} Leonardo Lopes. {t.footer.madeWith}{" "}
            <a
              href={privacyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-colors hover:text-brand hover:underline"
            >
              {t.footer.privacy}
            </a>
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/lopesleo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/leonardolopesalmeida/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="#home"
              aria-label={t.footer.backToTop}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
