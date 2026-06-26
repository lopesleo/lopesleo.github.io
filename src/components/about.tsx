import { Server, Bot, Sparkles } from "lucide-react";
import { Reveal } from "./reveal";
import { RichText } from "./rich-text";
import { useLang } from "../i18n/language";

const icons = [Server, Bot, Sparkles];

export function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">
              {a.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              {a.heading}
            </h2>
          </Reveal>

          <Reveal
            delay={80}
            className="mx-auto mb-12 max-w-3xl space-y-6 text-center text-lg leading-relaxed text-muted-foreground"
          >
            <p className="text-pretty">
              <RichText text={a.p1} />
            </p>
            <p className="text-pretty">
              <RichText text={a.p2} />
            </p>
            <p className="text-pretty">
              <RichText text={a.p3} />
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {a.pillars.map((pillar, i) => {
              const Icon = icons[i];
              return (
                <Reveal as="article" key={pillar.title} delay={i * 120}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-pretty leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
