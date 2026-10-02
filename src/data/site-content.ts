import { profile } from "./profile";

export const siteIdentity = {
  role: "Lead Backend Engineer",
  roleShort: "Lead Backend Engineer",
  fullStackNote:
    "Backend-first; I ship full-stack products when teams need UI and APIs delivered together.",
  focusAreas: ["APIs", "PostgreSQL", "Django", "FastAPI", "production systems"],
  domains: ["healthcare", "aviation", "SaaS", "internal ops"],
} as const;

export type SiteNavItem = { href: string; label: string };

export const siteNav: SiteNavItem[] = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#how-i-build", label: "Process" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const footerSiteLinks: SiteNavItem[] = [
  { href: "#about", label: "About" },
  ...siteNav.filter((item) => item.href !== "#about" && item.href !== "#contact"),
  { href: "#skills", label: "Stack" },
];

export const homeSections = {
  hero: {
    eyebrow: `${profile.name} · ${siteIdentity.role}`,
    headline: profile.headline,
    tagline: profile.tagline,
    actions: [
      { href: `mailto:${profile.email}`, label: "Get in touch", variant: "primary" as const, external: false },
      { href: "#projects", label: "See work", variant: "ghost" as const, external: false },
      { href: "#how-i-build", label: "How I build", variant: "ghost" as const, external: false },
      { href: profile.resumeUrl, label: "View resume", variant: "ghost" as const, external: true },
    ],
  },
  about: {
    label: "About",
    title: "Background",
    paragraphs: profile.about,
    stats: profile.stats,
  },
  projects: {
    label: "Projects",
    title: "What I've built",
    lead:
      "Production APIs and apps across investing, workflows, vision, and healthcare — with write-ups, demos, and source where available.",
    wallCaption: "Preview tiles — scroll for details and links.",
    featuredHeading: "Selected work",
    moreHeading: "More projects",
  },
  useCases: {
    label: "Use cases",
    title: "Systems I take on",
    lead: profile.useCasesLead,
  },
  process: {
    label: "Process",
    titleLines: ["From domain knowledge to", "production APIs"],
  },
  stack: {
    label: "Stack",
    title: "What I build with",
    lead:
      "Python, Django, and FastAPI for services and data models — plus React, Vue, or mobile clients when the product needs a full-stack delivery.",
  },
  experience: {
    label: "Experience",
    title: "Roles & impact",
    lead: "Lead and senior backend work in healthcare, aviation, SaaS, and education.",
  },
} as const;

export const pageMeta = {
  title: `${profile.name} | ${siteIdentity.role}`,
  description:
    "Lead Backend Engineer — scalable APIs, Django/FastAPI, PostgreSQL. Healthcare, aviation, and SaaS. Full-stack when the product needs it.",
} as const;
