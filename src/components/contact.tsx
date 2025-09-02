import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-balance">
            Vamos Conversar?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty">
            Estou sempre aberto a novas oportunidades e projetos interessantes.
            Entre em contato comigo através dos canais abaixo.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="mailto:lopesleo.dev@gmail.com"
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform flex justify-center">
                <Mail size={32} />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">lopesleo.dev@gmail.com</p>
            </a>
            <a
              href="https://github.com/lopesleo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform flex justify-center">
                <FaGithub size={32} />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                GitHub
              </h3>
              <p className="text-muted-foreground">lopesleo</p>
            </a>
            <a
              href="https://www.linkedin.com/in/leonardolopesalmeida/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform flex justify-center">
                <FaLinkedin size={32} />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                LinkedIn
              </h3>
              <p className="text-muted-foreground">leonardolopesalmeida</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
