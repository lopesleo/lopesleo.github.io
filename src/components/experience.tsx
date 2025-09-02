export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Experiência Profissional</h2>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-2xl font-bold text-card-foreground">Desenvolvedor Back-end</h3>
              <span className="text-primary font-medium">GoLiveTech</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
              Desenvolvimento e manutenção de sistemas back-end robustos, implementação de APIs RESTful, automação de
              processos empresariais e integração com sistemas terceiros. Foco em soluções escaláveis e performance
              otimizada utilizando as melhores práticas de desenvolvimento.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Desenvolvimento Back-end
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                APIs RESTful
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Automação RPA
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Integração de Sistemas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
