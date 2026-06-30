import type { IconType } from "react-icons";
import {
  DiPython,
  DiReact,
  DiDocker,
  DiPostgresql,
  DiJava,
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
      role: "Desenvolvedor Full-Stack · Automação & IA",
      tagline:
        "Crio sistemas completos (do back-end à tela), automações de processos (RPA) e integrações com IA para trocar trabalho manual repetitivo por software confiável.",
      ctaProjects: "Ver Projetos",
      ctaContact: "Entre em Contato",
    },
    about: {
      eyebrow: "Sobre mim",
      heading: "Desenvolvo sistemas completos, do back-end à interface",
      p1: "Sou desenvolvedor de sistemas com foco em back-end e automação. Trabalho com **C#/.NET, Python e Node.js (TypeScript)** no servidor e **React e Next.js** na interface, então entrego o produto funcionando de ponta a ponta, da API à tela.",
      p2: "Já construí desde **APIs RESTful** e **automações (RPA)** (incluindo integrações com portais do governo como eCAC, SEFAZ e PROUNI) até **ferramentas com IA**, como um classificador de e-mails com Google Gemini e um pipeline de transcrição e corte de vídeo com LLMs. Também mantenho projetos open-source, como o **DeckTools**, um plugin para Steam Deck e meu repositório mais popular no GitHub.",
      p3: "No momento estou aprofundando o lado **Java** do meu back-end pelo **java10x**, um curso prático e baseado em projetos reais que cobre **Spring Boot**, **Docker** e **AWS**.",
      pillars: [
        {
          title: "Sistemas Full-stack",
          description:
            "APIs em C#/.NET, Python (FastAPI) e Node.js com interfaces em React e Next.js. Entrego o sistema completo, com tela, não só o back-end.",
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
      role: "Desenvolvedor de Software",
      company: "GoLiveTech",
      period: "Maio 2023 – Atual",
      description:
        "Atuo entre desenvolvimento back-end e automação. Construo APIs e serviços (C#/.NET, Python, Node.js) e crio automações de processos (RPA) com Selenium, Chrome DevTools Protocol e FlaUI, incluindo integrações com portais do governo (eCAC, SEFAZ, PROUNI).",
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
      privacy: "Privacidade",
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
      role: "Full-Stack Developer · Automation & AI",
      tagline:
        "I build complete systems (back-end to UI), process automation (RPA) and AI integrations to replace repetitive manual work with reliable software.",
      ctaProjects: "View Projects",
      ctaContact: "Get in Touch",
    },
    about: {
      eyebrow: "About me",
      heading: "I build complete systems, from back-end to UI",
      p1: "I'm a systems developer focused on back-end and automation. I work with **C#/.NET, Python and Node.js (TypeScript)** on the server and **React and Next.js** on the front, so I ship products that work end to end, from the API to the screen.",
      p2: "I've built everything from **RESTful APIs** and **automation (RPA)** (including integrations with government portals like eCAC, SEFAZ and PROUNI) to **AI tools**, like an email classifier with Google Gemini and a video transcription-and-clipping pipeline with LLMs. I also maintain open-source projects, like **DeckTools**, a Steam Deck plugin that's my most-starred repo on GitHub.",
      p3: "I'm currently deepening the **Java** side of my back-end through **java10x**, a hands-on, project-based course covering **Spring Boot**, **Docker** and **AWS**.",
      pillars: [
        {
          title: "Full-stack Systems",
          description:
            "APIs in C#/.NET, Python (FastAPI) and Node.js with React and Next.js front-ends. I deliver the whole system, screens included, not just the back-end.",
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
      role: "Software Developer",
      company: "GoLiveTech",
      period: "May 2023 – Present",
      description:
        "I work across back-end development and automation. I build APIs and services (C#/.NET, Python, Node.js) and create process automation (RPA) with Selenium, Chrome DevTools Protocol and FlaUI, including integrations with government portals (eCAC, SEFAZ, PROUNI).",
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
      privacy: "Privacy",
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
  { name: "Java", icon: DiJava },
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
  github?: string;
  live?: string;
  featured?: boolean;
  pt: { description: string; highlights: string[] };
  en: { description: string; highlights: string[] };
}

export const projects: Project[] = [
  {
    title: "Oasis da Superdotação",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    live: "https://oasisdasuperdotacao.com.br/",
    featured: true,
    pt: {
      description:
        "Plataforma web full-stack para avaliação neuropsicológica e apoio a pessoas superdotadas/neurodivergentes, com cursos, blog, terapia online e área logada.",
      highlights: [
        "Desenvolvimento full-stack (front-end e back-end) em Next.js",
        "Autenticação de usuários e área logada",
        "Cursos, blog e agendamento de avaliações em produção",
      ],
    },
    en: {
      description:
        "Full-stack web platform for neuropsychological assessment and support for gifted/neurodivergent people, with courses, a blog, online therapy and a logged-in area.",
      highlights: [
        "Full-stack development (front-end and back-end) in Next.js",
        "User authentication and logged-in area",
        "Courses, blog and assessment scheduling in production",
      ],
    },
  },
  {
    title: "Carolina Almeida · Nutricionista",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://www.nutricarolinaalmeida.com.br/",
    featured: true,
    pt: {
      description:
        "Site de agendamento para a nutricionista Carolina Almeida (Duque de Caxias/RJ), com especialidades, experiência, formação, FAQ e contato direto via WhatsApp.",
      highlights: [
        "Next.js + TypeScript com animações em Framer Motion",
        "Formulário de agendamento validado (React Hook Form + Zod) integrado ao WhatsApp",
        "Em produção com domínio próprio",
      ],
    },
    en: {
      description:
        "Booking site for nutritionist Carolina Almeida (Duque de Caxias/RJ), with specialties, experience, education, an FAQ and direct contact via WhatsApp.",
      highlights: [
        "Next.js + TypeScript with Framer Motion animations",
        "Validated booking form (React Hook Form + Zod) wired to WhatsApp",
        "Live in production on a custom domain",
      ],
    },
  },
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
