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
        "Crio APIs, automações de processos (RPA) e integrações com IA para trocar trabalho manual repetitivo por sistemas confiáveis.",
      ctaProjects: "Ver Projetos",
      ctaContact: "Entre em Contato",
    },
    about: {
      eyebrow: "Sobre mim",
      heading: "Automatizo trabalho repetitivo com back-end e RPA",
      p1: "Sou desenvolvedor back-end e de automação. No dia a dia trabalho com **C#/.NET, Python e Node.js (TypeScript)**, construindo APIs e robôs que cortam trabalho manual.",
      p2: "Já construí **APIs RESTful**, **robôs de RPA** e ferramentas com **IA**, como um classificador de e-mails com Google Gemini e um pipeline de transcrição e corte de vídeo com LLMs. Também mantenho projetos open-source, incluindo o **sdkcorreiosts**, um SDK dos Correios em TypeScript.",
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
            "LLMs (Gemini, Anthropic) e modelos como Whisper em projetos que já rodam: classificação, function calling e pipelines de vídeo.",
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
        "Desenvolvo back-end e APIs RESTful e automatizo fluxos web e desktop (RPA). Boa parte do trabalho é automatizar integrações com portais do governo (eCAC, SEFAZ, PROUNI) usando Selenium, Chrome DevTools Protocol e FlaUI.",
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
        "Estou aberto a novas oportunidades e projetos. Me chama no e-mail ou nas redes abaixo.",
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
        "I build APIs, process automation (RPA) and AI integrations to replace repetitive manual work with systems that run on their own.",
      ctaProjects: "View Projects",
      ctaContact: "Get in Touch",
    },
    about: {
      eyebrow: "About me",
      heading: "I automate repetitive work with back-end and RPA",
      p1: "I'm a back-end and automation developer. Day to day I work with **C#/.NET, Python and Node.js (TypeScript)**, building APIs and robots that cut out manual work.",
      p2: "I've built **RESTful APIs**, **RPA robots** and **AI** tools, like an email classifier with Google Gemini and a video transcription-and-clipping pipeline with LLMs. I also maintain open-source projects, including **sdkcorreiosts**, a TypeScript SDK for Brazil's Correios.",
      pillars: [
        {
          title: "Back-end & APIs",
          description:
            "RESTful APIs in C#/.NET, Python (FastAPI) and Node.js, with clean, well-tested code.",
        },
        {
          title: "Automation & RPA",
          description:
            "Robots that automate web and desktop flows (Selenium, Chrome DevTools Protocol, FlaUI), including integrations with government portals like eCAC, SEFAZ and PROUNI.",
        },
        {
          title: "Applied AI",
          description:
            "LLMs (Gemini, Anthropic) and models like Whisper in projects that already ship: classification, function calling and video pipelines.",
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
        "I develop back-end systems and RESTful APIs and automate web and desktop flows (RPA). A lot of the work is automating integrations with government portals (eCAC, SEFAZ, PROUNI) using Selenium, Chrome DevTools Protocol and FlaUI.",
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
        "I'm open to new opportunities and projects. Reach out by email or on the channels below.",
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
