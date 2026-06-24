import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { useLang } from "../i18n/language";
import { projects } from "../i18n/translations";

export function Projects() {
  const { t, lang } = useLang();
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              {t.projects.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              {t.projects.heading}
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            {featured.map((project, i) => {
              const content = project[lang];
              return (
                <Reveal as="article" key={project.title} delay={i * 100}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
                    <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-card-foreground">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>

                    <p className="mb-5 text-pretty leading-relaxed text-muted-foreground">
                      {content.description}
                    </p>

                    <ul className="mb-6 space-y-2">
                      {content.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-card-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
                      >
                        <Github size={18} />
                        {t.projects.code}
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-brand/80"
                        >
                          <ExternalLink size={18} />
                          {t.projects.live}
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 text-center" delay={120}>
            <a
              href="https://github.com/lopesleo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all hover:border-brand/50 hover:text-brand"
            >
              <Github size={18} />
              {t.projects.more}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
