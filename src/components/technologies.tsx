import { Reveal } from "./reveal";
import { useLang } from "../i18n/language";
import { technologies } from "../i18n/translations";

export function Technologies() {
  const { t } = useLang();

  return (
    <section id="technologies" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              {t.technologies.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              {t.technologies.heading}
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {technologies.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 50}>
                <div className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
                  <tech.icon className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-brand" />
                  <h3 className="text-sm font-semibold text-card-foreground">
                    {tech.name}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
