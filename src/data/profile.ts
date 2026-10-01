export type AboutParagraph = {
  text: string;
  link?: { label: string; href: string };
  suffix?: string;
};

export const profile = {
  name: "Safwan Vk",
  wordmark: "SAFWAN VK",
  role: "Backend Developer",
  headline: ["Lead Backend Engineer", "for scalable products & APIs"],
  tagline:
    "I build readable, scalable backend systems — turning complex domains into maintainable APIs and shipping work that holds up in production.",
  email: "dev.safwan@outlook.com",
  resumeUrl: "/Safwan Resume.pdf",
  siteUrl: "https://safwanvk.github.io",
  description:
    "Lead Backend Engineer focused on scalable APIs, Django/FastAPI, and production-ready systems.",
  social: {
    github: "https://github.com/safwanvk",
    linkedin: "https://www.linkedin.com/in/safwan-vk/",
    instagram: "https://www.instagram.com/_safwanvk/",
    twitter: "",
  },
  about: [
    {
      text: "I'm currently working as a Lead Backend Engineer at ",
      link: { label: "Barq Group", href: "https://www.barqgroup.com/" },
      suffix: ", converting innovative ideas into code.",
    },
    {
      text: "As a developer, I enjoy building scalable and readable code — combining domain clarity with solid algorithms and API design.",
    },
  ] satisfies AboutParagraph[],
  howIBuild: [
    {
      step: "01",
      title: "Understand the domain",
      body: "Map workflows, constraints, and failure modes before writing code — especially in healthcare, aviation, and ops-heavy products.",
    },
    {
      step: "02",
      title: "Design the APIs",
      body: "Model data and boundaries first: RESTful services, clear contracts, and integrations that teams can extend without surprises.",
    },
    {
      step: "03",
      title: "Ship and iterate",
      body: "Automate what repeats, measure what matters, and refine with feedback from users and operators.",
    },
  ],
} as const;
