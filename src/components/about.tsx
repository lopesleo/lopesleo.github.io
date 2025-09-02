export function About() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance text-foreground">Sobre Mim</h2>
          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <p className="text-lg text-card-foreground leading-relaxed text-pretty mb-6">
              Sou um desenvolvedor apaixonado por tecnologia com foco em desenvolvimento back-end e automação. Com
              experiência sólida em linguagens como <span className="text-primary font-medium">C#, Python e Java</span>,
              tenho me dedicado a criar soluções eficientes e escaláveis que otimizam processos e agregam valor aos
              negócios.
            </p>
            <p className="text-lg text-card-foreground leading-relaxed text-pretty">
              Minha jornada profissional inclui o desenvolvimento de{" "}
              <span className="text-primary font-medium">APIs robustas</span>, implementação de sistemas de
              <span className="text-primary font-medium"> automação RPA</span> e criação de soluções que conectam
              diferentes tecnologias. Estou sempre em busca de novos desafios e oportunidades para aplicar meu
              conhecimento técnico em projetos inovadores.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
