export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">Leonardo Lopes</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Início
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#technologies" className="text-foreground hover:text-primary transition-colors">
              Tecnologias
            </a>
            <a href="#projects" className="text-foreground hover:text-primary transition-colors">
              Projetos
            </a>
            <a href="#experience" className="text-foreground hover:text-primary transition-colors">
              Experiência
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
