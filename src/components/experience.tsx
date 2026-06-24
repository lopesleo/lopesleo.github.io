import { Briefcase } from "lucide-react";
import { Reveal } from "./reveal";
import { useLang } from "../i18n/language";

export function Experience() {
  const { t } = useLang();
  const e = t.experience;

  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              {e.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              {e.heading}
            </h2>
          </Reveal>

          <div className="relative border-l border-border pl-8">
            <Reveal as="article">
              <div className="relative pb-2">
                <span className="absolute -left-[2.6rem] flex h-8 w-8 items-center justify-center rounded-full border border-brand/30 bg-background text-brand">
                  <Briefcase size={15} />
                </span>

                <div className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-brand/40 hover:shadow-glow">
                  <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-bold text-card-foreground">
                      {e.role}
                    </h3>
                    <span className="text-sm font-medium text-muted-foreground">
                      {e.period}
                    </span>
                  </div>
                  <p className="mb-2 font-medium text-brand">{e.company}</p>
                  <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                    {e.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {e.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
