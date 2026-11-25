export type Project = {
  name: string;
  href: string;
  description: string;
  codeUrl?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  stack: string[];
  featured: boolean;
  accent?: string;
  posterImage?: string;
  previewVideo?: string;
  previewVideoGif?: string;
};

export const projects: Project[] = [
  {
    name: "Invest OS",
    href: "https://investment-os-cvjn.onrender.com/",
    description:
      "Personal ops OS for Zerodha DIY: you execute in Coin/Kite; the app syncs fills, goal-tags the ledger, runs This month SIP checklists, Review scoreboards, and Reconcile drift. Goal-tagged transactions stay authoritative — brokers are the mirror; Sync never silently rebuilds goal splits.",
    codeUrl: "https://github.com/safwanvk/investment-os",
    secondaryUrl: "https://github.com/safwanvk/investment-os#readme",
    secondaryLabel: "Readme",
    stack: ["Python", "FastAPI", "PostgreSQL", "Jinja", "Docker", "Kite"],
    featured: true,
    accent: "#1a3a2f",
    posterImage: "/img/projects/invest-os.jpg",
    previewVideo: "/video/projects/invest-os.mp4",
    previewVideoGif: "/video/projects/invest-os.gif",
  },
  {
    name: "Clip OS",
    href: "https://clip-os.onrender.com/",
    description:
      "FastAPI ops ledger for clip marketplaces: score campaigns, enqueue cuts to a local or Neon-backed worker (FFmpeg/Whisper), then human review, publish, and submit within the marketplace window.",
    codeUrl: "https://github.com/safwanvk/clip-os",
    secondaryUrl: "https://github.com/safwanvk/clip-os#readme",
    secondaryLabel: "Readme",
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "MinIO", "FFmpeg"],
    featured: true,
    accent: "#2a1f3d",
    posterImage: "/img/projects/clip-os.jpg",
    previewVideo: "/video/projects/clip-os.mp4",
    previewVideoGif: "/video/projects/clip-os.gif",
  },
  {
    name: "Content OS",
    href: "https://content-os-wog9.onrender.com/",
    description:
      "FastAPI ops app for multi-page affiliate content: Today board, optional Ollama drafts, human approve, batch render via FFmpeg worker and object storage, plus publish and commission ledger crons.",
    codeUrl: "https://github.com/safwanvk/content-os",
    secondaryUrl: "https://github.com/safwanvk/content-os#readme",
    secondaryLabel: "Readme",
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "FFmpeg", "Ollama"],
    featured: true,
    accent: "#1f2a3d",
    posterImage: "/img/projects/content-os.jpg",
    previewVideo: "/video/projects/content-os.mp4",
    previewVideoGif: "/video/projects/content-os.gif",
  },
  {
    name: "InnoFlow",
    href: "https://www.linkedin.com/company/lite-sw/",
    description:
      "Document and workflow platform: DRF APIs for management, automation, and compliance — Vue.js client for operators.",
    secondaryUrl:
      "https://rift-second-cca.notion.site/InnoFlow-1410a333a6628028b237e54193ae9cd0",
    secondaryLabel: "Explore overview",
    stack: ["Python", "DRF", "PostgreSQL", "Vue.js"],
    featured: true,
    accent: "#1e2a4a",
    posterImage: "/img/projects/innoflow.jpg",
    previewVideo: "/video/projects/innoflow.mp4",
    previewVideoGif: "/video/projects/innoflow.gif",
  },
  {
    name: "Foodai",
    href: "https://github.com/safwanvk/Foodai",
    description:
      "CV pipeline and Flask API for vegetable detection; Android client for capture and recipe suggestions.",
    codeUrl: "https://github.com/safwanvk/Foodai",
    stack: ["Python", "Flask", "MySQL", "Android"],
    featured: false,
    accent: "#2d4a1e",
    posterImage: "/img/projects/foodai.jpg",
    previewVideo: "/video/projects/foodai.mp4",
    previewVideoGif: "/video/projects/foodai.gif",
  },
  {
    name: "Medicare",
    href: "https://enigmatic-brook-69506.herokuapp.com/",
    description:
      "Pharmacy inventory and orders: Django REST backend with a React admin and store-facing client.",
    codeUrl: "https://github.com/safwanvk/medicare",
    stack: ["Python", "Django REST", "SQLite", "React"],
    featured: false,
    accent: "#3d1f2e",
    posterImage: "/img/projects/medicare.jpg",
    previewVideo: "/video/projects/medicare.mp4",
    previewVideoGif: "/video/projects/medicare.gif",
  },
  {
    name: "CowinBot",
    href: "https://discord.com/oauth2/authorize?client_id=849536650664607774&permissions=66185271&scope=bot",
    description: "Discord bot to streamline vaccine registration.",
    codeUrl: "https://github.com/safwanvk/cowinbot-discord",
    stack: ["Python", "MySQL", "Discord.py"],
    featured: false,
  },
  {
    name: "Musify",
    href: "https://github.com/safwanvk/musify",
    description: "Music controller app integrated with Spotify.",
    codeUrl: "https://github.com/safwanvk/musify",
    stack: ["Python", "Django REST", "Spotify"],
    featured: false,
  },
  {
    name: "Specterr",
    href: "https://github.com/safwanvk/specterr",
    description: "Music equalizer system.",
    codeUrl: "https://github.com/safwanvk/specterr",
    stack: ["Python", "Flask", "MySQL"],
    featured: false,
  },
  {
    name: "As",
    href: "https://github.com/safwanvk/as",
    description: "Attendance system for institutions.",
    codeUrl: "https://github.com/safwanvk/as",
    stack: ["Python", "Django REST", "MySQL"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);