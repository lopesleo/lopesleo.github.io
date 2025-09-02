export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">Leonardo Lopes</h1>
          <p className="text-xl md:text-2xl text-primary mb-8 text-balance font-medium">
            Desenvolvedor Back-end & Automação
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            Especialista em desenvolvimento back-end, automação de processos e soluções RPA. Transformando ideias em
            código eficiente e sistemas robustos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-secondary transition-all duration-300 hover:border-primary"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
