//import from di

import {
  DiDotnet,
  DiPython,
  DiReact,
  DiPhp,
  DiDocker,
  DiPostgresql,
  DiMysql,
} from "react-icons/di";
import { TbBrandCSharp } from "react-icons/tb";
import { SiSelenium, SiNextdotjs } from "react-icons/si";
import { FaNode, FaJava } from "react-icons/fa";
const technologies = [
  { name: "C#", icon: TbBrandCSharp },
  { name: "Python", icon: DiPython },
  { name: "Java", icon: FaJava },
  { name: "Node.js", icon: FaNode },
  { name: ".NET", icon: DiDotnet },
  { name: "PostgreSQL", icon: DiPostgresql },
  { name: "MySQL", icon: DiMysql },
  { name: "React", icon: DiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "PHP", icon: DiPhp },
  { name: "Selenium", icon: SiSelenium },
  { name: "Docker", icon: DiDocker },
];

export function Technologies() {
  return (
    <section id="technologies" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
            Tecnologias
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="bg-card rounded-xl p-6 text-center border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <tech.icon className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-card-foreground">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
