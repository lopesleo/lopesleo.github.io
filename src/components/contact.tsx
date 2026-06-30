import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Reveal } from "./reveal";
import { useLang } from "../i18n/language";
import { track } from "../lib/analytics";

const EMAIL = "lopesleo.dev@gmail.com";

const channels = [
  {
    icon: FaGithub,
    label: "GitHub",
    value: "lopesleo",
    href: "https://github.com/lopesleo",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "leonardolopesalmeida",
    href: "https://www.linkedin.com/in/leonardolopesalmeida/",
  },
];

export function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    track("contact_clicked", { channel: "email_copy", location: "contact" });
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              {t.contact.eyebrow}
            </p>
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">
              {t.contact.heading}
            </h2>
            <p className="mx-auto max-w-xl text-pretty text-lg text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mb-6 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Mail size={20} />
                </span>
                <span className="font-medium text-card-foreground">{EMAIL}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-brand/50 hover:text-brand"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? t.contact.copied : t.contact.copy}
                </button>
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={() => track("contact_clicked", { channel: "email", location: "contact" })}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-all hover:-translate-y-0.5"
                >
                  {t.contact.send}
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={120 + i * 100}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("contact_clicked", {
                      channel: c.label.toLowerCase(),
                      location: "contact",
                    })
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform group-hover:scale-110">
                    <c.icon size={20} />
                  </span>
                  <span>
                    <span className="block font-semibold text-card-foreground">
                      {c.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {c.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
