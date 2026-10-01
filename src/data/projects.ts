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
};

export const projects: Project[] = [
  {
    name: "Invest OS",
    href: "https://investment-os-cvjn.onrender.com/",
    description:
      "Personal ops OS for Zerodha DIY investing: syncs fills, goal-tags transactions, SIP checklist, and reconciles leftovers. Goal tags stay truth — brokers are the mirror.",
    codeUrl: "https://github.com/safwanvk/investment-os",
    stack: ["Python", "FastAPI", "PostgreSQL", "Jinja"],
    featured: true,
    accent: "#1a3a2f",
  },
  {
    name: "InnoFlow",
    href: "https://www.linkedin.com/company/lite-sw/",
    description:
      "Digital transformation platform for document management, automated workflows, and compliance tools.",
    secondaryUrl:
      "https://rift-second-cca.notion.site/InnoFlow-1410a333a6628028b237e54193ae9cd0",
    secondaryLabel: "Explore overview",
    stack: ["Python", "DRF", "PostgreSQL", "Vue.js"],
    featured: true,
    accent: "#1e2a4a",
  },
  {
    name: "Foodai",
    href: "https://github.com/safwanvk/Foodai",
    description:
      "Vegetable detection with computer vision to identify produce and suggest recipes.",
    codeUrl: "https://github.com/safwanvk/Foodai",
    stack: ["Python", "Flask", "MySQL", "Android"],
    featured: true,
    accent: "#2d4a1e",
  },
  {
    name: "Medicare",
    href: "https://enigmatic-brook-69506.herokuapp.com/",
    description: "Medical store management system with REST API and web client.",
    codeUrl: "https://github.com/safwanvk/medicare",
    stack: ["Python", "Django REST", "SQLite", "React"],
    featured: true,
    accent: "#3d1f2e",
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
