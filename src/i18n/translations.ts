import type { IconType } from "react-icons";
import {
  DiPython,
  DiReact,
  DiDocker,
  DiPostgresql,
} from "react-icons/di";
import { TbBrandCSharp, TbBrandTypescript } from "react-icons/tb";
import { SiSelenium, SiDotnet, SiFastapi, SiGooglegemini } from "react-icons/si";
import { FaNode } from "react-icons/fa";

export type Lang = "pt" | "en";

/* ----------------------------------------------------------------------------
 * UI strings
 * Use **double asterisks** to emphasise a term inside paragraphs (see RichText).
 * ------------------------------------------------------------------------- */
export const ui = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      technologies: "Tecnologias",
      projects: "Projetos",
      experience: "Experiência",
      contact: "Contato",
    },
    downloadCV: "Baixar CV",
    langLabel: "English",
    hero: {
      badge: "Disponível para novos projetos",
      role: "Desenvolvedor Back-end & Automação",
      tagline:
        "Construo APIs robustas, automações de processos (RPA) e soluções com IA aplicada que transformam tarefas manuais em sistemas eficientes e escaláveis.",
      ctaProjects: "Ver Projetos",
      ctaContact: "Entre em Contato",
    },
    about: {
      eyebrow: "Sobre mim",
      heading: "Transformo processos em sistemas eficientes",
      p1: "Desenvolvedor back-end e de automação com experiência em **C#/.NET, Python e Node.js (TypeScript)**. Crio soluções que otimizam processos e agregam valor real ao negócio.",
      p2: "Minha experiência inclui **APIs RESTful**, **automação de processos (RPA)** e **IA aplicada** — de classificação de e-mails com Google Gemini a pipelines de transcrição e scoring com LLMs. Mantenho projetos open-source, incluindo um **pacote npm publicado** (sdkcorreiosts).",
      pillars: [
        {
          title: "Back-end & APIs",
          description:
            "APIs RESTful performáticas em C#/.NET, Python (FastAPI) e Node.js, com foco em boas práticas e código limpo.",
        },
        {
          title: "Automação & RPA",
          description:
            "Robôs que automatizam fluxos web e desktop (Selenium, Chrome DevTools Protocol, FlaUI), incluindo integrações com portais do governo como eCAC, SEFAZ e PROUNI.",
        },
        {
          title: "IA Aplicada",
          description:
            "Integração de LLMs (Gemini, Anthropic) e modelos como Whisper em produtos reais — function calling, classificação e pipelines.",
        },
      ],
    },
    technologies: {
      eyebrow: "Stack",
      heading: "Tecnologias que utilizo",
    },
    projects: {
      eyebrow: "Portfólio",
      heading: "Projetos em destaque",
      code: "Código",
      live: "Ver ao vivo",
      more: "Ver mais no GitHub",
    },
    experience: {
      eyebrow: "Carreira",
      heading: "Experiência profissional",
      role: "Desenvolvedor Back-end",
      company: "GoLiveTech",
      period: "Maio 2023 – Atual",
      description:
        "Desenvolvimento de sistemas back-end e APIs RESTful e automação de fluxos web e desktop (RPA). Automatizo integrações com portais do governo (eCAC, SEFAZ, PROUNI) usando Selenium, Chrome DevTools Protocol e FlaUI, com foco em confiabilidade e performance.",
      tags: [
        "Back-end & APIs",
        "RPA Web & Desktop",
        "Selenium · CDP · FlaUI",
        "Portais Gov (eCAC/SEFAZ/PROUNI)",
      ],
    },
    contact: {
      eyebrow: "Contato",
      heading: "Vamos trabalhar juntos?",
      subtitle:
        "Estou aberto a novas oportunidades e projetos interessantes. Me chame pelo e-mail ou pelas redes abaixo.",
      copy: "Copiar",
      copied: "Copiado!",
      send: "Enviar e-mail",
    },
    footer: {
      madeWith: "Feito com React, Vite e Tailwind.",
      backToTop: "Voltar ao topo",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      technologies: "Tech",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    downloadCV: "Download CV",
    langLabel: "Português",
    hero: {
      badge: "Available for new projects",
      role: "Back-end & Automation Developer",
      tagline:
        "I build robust APIs, process automation (RPA) and AI-powered solutions that turn manual tasks into efficient, scalable systems.",
      ctaProjects: "View Projects",
      ctaContact: "Get in Touch",
    },
    about: {
      eyebrow: "About me",
      heading: "I turn processes into efficient systems",
      p1: "Back-end and automation developer with experience in **C#/.NET, Python and Node.js (TypeScript)**. I build solutions that optimise processes and deliver real business value.",
      p2: "My work spans **RESTful APIs**, **process automation (RPA)** and **applied AI** — from email classification with Google Gemini to transcription and scoring pipelines with LLMs. I maintain open-source projects, including a **published npm package** (sdkcorreiosts).",
      pillars: [
        {
          title: "Back-end & APIs",
          description:
            "High-performance RESTful APIs in C#/.NET, Python (FastAPI) and Node.js, with a focus on best practices and clean code.",
        },
        {
          title: "Automation & RPA",
          description:
            "Robots that automate web and desktop flows (Selenium, Chrome DevTools Protocol, FlaUI), including integrations with government portals like eCAC, SEFAZ and PROUNI.",
        },
        {
          title: "Applied AI",
          description:
            "Integrating LLMs (Gemini, Anthropic) and models like Whisper into real products — function calling, classification and pipelines.",
        },
      ],
    },
    technologies: {
      eyebrow: "Stack",
      heading: "Technologies I work with",
    },
    projects: {
      eyebrow: "Portfolio",
      heading: "Featured projects",
      code: "Code",
      live: "Live demo",
      more: "See more on GitHub",
    },
    experience: {
      eyebrow: "Career",
      heading: "Professional experience",
      role: "Back-end Developer",
      company: "GoLiveTech",
      period: "May 2023 – Present",
      description:
        "Development of back-end systems and RESTful APIs plus web and desktop automation (RPA). I automate integrations with government portals (eCAC, SEFAZ, PROUNI) using Selenium, Chrome DevTools Protocol and FlaUI, focused on reliability and performance.",
      tags: [
        "Back-end & APIs",
        "Web & Desktop RPA",
        "Selenium · CDP · FlaUI",
        "Gov Portals (eCAC/SEFAZ/PROUNI)",
      ],
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's work together?",
      subtitle:
        "I'm open to new opportunities and interesting projects. Reach out by email or on the channels below.",
      copy: "Copy",
      copied: "Copied!",
      send: "Send email",
    },
    footer: {
      madeWith: "Built with React, Vite and Tailwind.",
      backToTop: "Back to top",
    },
  },
};

export type UIStrings = (typeof ui)["pt"];

/* ----------------------------------------------------------------------------
 * Technologies (icons are language-agnostic)
 * ------------------------------------------------------------------------- */
export const technologies: { name: string; icon: IconType }[] = [
  { name: "C#", icon: TbBrandCSharp },
  { name: ".NET", icon: SiDotnet },
  { name: "Python", icon: DiPython },
  { name: "FastAPI", icon: SiFastapi },
  { name: "TypeScript", icon: TbBrandTypescript },
  { name: "Node.js", icon: FaNode },
  { name: "React", icon: DiReact },
  { name: "PostgreSQL", icon: DiPostgresql },
  { name: "Selenium", icon: SiSelenium },
  { name: "Gemini / LLMs", icon: SiGooglegemini },
  { name: "Docker", icon: DiDocker },
];

/* ----------------------------------------------------------------------------
 * Projects — real data pulled from GitHub (github.com/lopesleo)
 * ------------------------------------------------------------------------- */
export interface Project {
  title: string;
  tech: string[];
  github: string;
  live?: string;
  featured?: boolean;
  pt: { description: string; highlights: string[] };
  en: { description: string; highlights: string[] };
}

export const projects: Project[] = [
  {
    title: "DeckTools",
    tech: ["Python", "TypeScript", "React"],
    github: "https://github.com/lopesleo/DeckTools",
    live: "https://github.com/lopesleo/DeckTools/releases",
    featured: true,
    pt: {
      description:
        "Plugin para Steam Deck (Decky Loader) que gerencia bibliotecas e configurações de jogos no Game Mode, integrando múltiplas fontes de API.",
      highlights: [
        "Repositório mais popular do meu GitHub",
        "Download de manifestos, conquistas e perfis de emulação",
        "Interface bilíngue (PT-BR / EN)",
      ],
    },
    en: {
      description:
        "Steam Deck plugin (Decky Loader) that manages game libraries and configurations in Game Mode, integrating multiple API sources.",
      highlights: [
        "My most-starred repository",
        "Manifest downloads, achievements and emulation profiles",
        "Bilingual interface (PT-BR / EN)",
      ],
    },
  },
  {
    title: "AutoMail",
    tech: ["Python", "FastAPI", "Google Gemini", "React"],
    github: "https://github.com/lopesleo/AutoMail",
    live: "https://automailrenderfront.onrender.com/",
    featured: true,
    pt: {
      description:
        "Aplicação em produção que classifica e-mails (produtivo/improdutivo) e gera uma resposta pronta usando IA, com back-end FastAPI e SPA em React.",
      highlights: [
        "Classificação e resposta automática com Google Gemini",
        "Aceita texto ou arquivos (.txt / .pdf)",
        "Deploy em produção",
      ],
    },
    en: {
      description:
        "Production app that classifies emails (productive/unproductive) and drafts a ready reply using AI, with a FastAPI back-end and a React SPA.",
      highlights: [
        "Classification and auto-reply with Google Gemini",
        "Accepts raw text or files (.txt / .pdf)",
        "Deployed to production",
      ],
    },
  },
  {
    title: "SteamFamilyZap",
    tech: ["TypeScript", "Baileys", "Gemini", "PostgreSQL"],
    github: "https://github.com/lopesleo/SteamFamilyWppBot",
    featured: true,
    pt: {
      description:
        "Assistente de WhatsApp que consulta a Steam Web API e responde em linguagem natural via Gemini (function calling), com persistência em PostgreSQL.",
      highlights: [
        "IA com chamada de ferramentas (function calling)",
        "Integração com a Steam Web API",
        "Persistência em PostgreSQL (Neon)",
      ],
    },
    en: {
      description:
        "WhatsApp assistant that queries the Steam Web API and replies in natural language via Gemini (function calling), persisting to PostgreSQL.",
      highlights: [
        "AI with tool/function calling",
        "Steam Web API integration",
        "PostgreSQL persistence (Neon)",
      ],
    },
  },
  {
    title: "Clipper",
    tech: ["Python", "Whisper", "LLM", "FFmpeg"],
    github: "https://github.com/lopesleo/clipper-pipeline",
    featured: true,
    pt: {
      description:
        "Pipeline de clipagem automática: baixa vídeos longos, transcreve localmente (Whisper), pontua os melhores momentos via LLM e exporta Shorts 9:16 legendados.",
      highlights: [
        "Transcrição local com Whisper",
        "Scoring por LLM (Ollama local ou Anthropic)",
        "Corte e legendas automáticas com FFmpeg",
      ],
    },
    en: {
      description:
        "Automatic clipping pipeline: downloads long videos, transcribes locally (Whisper), scores the best moments via LLM and exports captioned 9:16 Shorts.",
      highlights: [
        "Local transcription with Whisper",
        "LLM scoring (local Ollama or Anthropic)",
        "Automatic cutting and captions with FFmpeg",
      ],
    },
  },
  {
    title: "NutriAPI",
    tech: ["C#", "ASP.NET Core 8", "EF Core", "PostgreSQL"],
    github: "https://github.com/lopesleo/NutriAPI",
    featured: true,
    pt: {
      description:
        "API REST para gestão de nutricionistas e pacientes, com Entity Framework Core, PostgreSQL e documentação via Swagger.",
      highlights: [
        "ASP.NET Core 8 + Entity Framework Core",
        "Documentação interativa com Swagger",
        "Arquitetura em camadas (Controllers / Services / Repositórios)",
      ],
    },
    en: {
      description:
        "REST API for managing nutritionists and patients, with Entity Framework Core, PostgreSQL and Swagger documentation.",
      highlights: [
        "ASP.NET Core 8 + Entity Framework Core",
        "Interactive Swagger documentation",
        "Layered architecture (Controllers / Services / Repositories)",
      ],
    },
  },
  {
    title: "SeleniumRobot",
    tech: ["C#", "Selenium", "EPPlus"],
    github: "https://github.com/lopesleo/SeleniumRobot",
    featured: true,
    pt: {
      description:
        "Robô de RPA que automatiza a extração de marcadores do Diário Oficial e exporta os resultados para planilha Excel.",
      highlights: [
        "Automação web com Selenium WebDriver",
        "Geração de planilhas Excel (EPPlus)",
        "Elimina trabalho manual repetitivo",
      ],
    },
    en: {
      description:
        "RPA robot that automates the extraction of entries from the Official Gazette and exports the results to an Excel spreadsheet.",
      highlights: [
        "Web automation with Selenium WebDriver",
        "Excel spreadsheet generation (EPPlus)",
        "Removes repetitive manual work",
      ],
    },
  },
];
