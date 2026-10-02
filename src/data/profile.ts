export type AboutParagraph = {
  text: string;
  link?: { label: string; href: string };
  suffix?: string;
};

export type UseCase = {
  title: string;
  caption: string;
  accent: string;
  symbol: string;
  tags: string[];
  layout: "split" | "single";
  imageTop: string;
  imageBottom?: string;
  imageAltTop: string;
  imageAltBottom?: string;
};

export const profile = {
  name: "Safwan Vk",
  wordmark: "SAFWAN VK",
  footerDisplayName: "Safwan Vk",
  footerTagline:
    "Lead Backend Engineer — APIs and production systems for healthcare, aviation, and SaaS teams.",
  footerWatermarkText: "SAFWAN VK",
  role: "Lead Backend Engineer",
  headline: ["Lead Backend Engineer", "for scalable products & APIs"],
  tagline:
    "Healthcare, aviation, and SaaS — I design and ship backend systems that hold up in production. Full-stack when the product needs UI and APIs together.",
  email: "dev.safwan@outlook.com",
  resumeUrl: "/Safwan Resume.pdf",
  siteUrl: "https://safwanvk.github.io",
  description:
    "Lead Backend Engineer — scalable APIs, Django/FastAPI, PostgreSQL. Healthcare, aviation, and SaaS. Full-stack when the product needs it.",
  availabilityBar:
    "Lead Backend @ Barq Group · Open to backend and full-stack collaborations",
  social: {
    github: "https://github.com/safwanvk",
    linkedin: "https://www.linkedin.com/in/safwan-vk/",
    instagram: "https://www.instagram.com/_safwanvk/",
    twitter: "",
  },
  stats: [
    { value: "5+", label: "Years on backends" },
    { value: "Healthcare · Aviation · SaaS", label: "Domains" },
    { value: "Python · Django · FastAPI", label: "Core stack" },
  ],
  about: [
    {
      text: "I'm a Lead Backend Engineer at ",
      link: { label: "Barq Group", href: "https://www.barqgroup.com/" },
      suffix: ", building healthcare systems that hospital teams can operate and extend.",
    },
    {
      text: "I focus on clear domain models, readable APIs, and reliable deployments. Backend-first — and I ship full-stack when clients or teams need web or mobile alongside the service layer.",
    },
  ] satisfies AboutParagraph[],
  useCasesLead:
    "Where I’m most useful: platforms teams integrate against, regulated workflows, and internal ops backends.",
  useCases: [
    {
      title: "API platforms",
      caption: "Auth, contracts, and integrations other engineers can extend without surprises.",
      accent: "#1e2a4a",
      symbol: "API",
      tags: ["REST", "Auth", "OpenAPI"],
      layout: "split",
      imageTop: "/img/use-cases/api-platforms-top.jpg",
      imageBottom: "/img/use-cases/api-platforms-bottom.jpg",
      imageAltTop: "Developer workspace with API documentation on a monitor",
      imageAltBottom: "Datacenter aisle with server racks",
    },
    {
      title: "Healthcare & compliance",
      caption: "Hospital ops, audit-friendly workflows, and data models that scale across sites.",
      accent: "#1a3a2f",
      symbol: "HIPAA",
      tags: ["Workflows", "Audit", "Multi-site"],
      layout: "single",
      imageTop: "/img/use-cases/healthcare-single.jpg",
      imageAltTop: "Clinician with a tablet in a hospital room",
    },
    {
      title: "Internal ops tools",
      caption: "Dashboards, automation, and APIs that replace weekly manual work.",
      accent: "#3d1f2e",
      symbol: "Ops",
      tags: ["Dashboards", "Automation", "Reports"],
      layout: "split",
      imageTop: "/img/use-cases/ops-top.jpg",
      imageBottom: "/img/use-cases/ops-bottom.jpg",
      imageAltTop: "Operations dashboard on a monitor at night",
      imageAltBottom: "Dual-monitor office workspace for internal tools",
    },
  ] satisfies UseCase[],
  howIBuild: [
    {
      step: "01",
      title: "Understand the domain",
      body: "Map workflows, constraints, and failure modes before writing code — especially in healthcare, aviation, and ops-heavy products.",
      detail:
        "Start from docs, stakeholder interviews, and existing systems — not assumptions about the happy path.",
      mockTags: ["Domain docs", "Workflows", "Constraints"],
      mockImage: "/img/process/saas-step-1.jpg",
      mockVideo: "/video/process/domain.mp4",
      mockCaption: "01 · Where it starts",
    },
    {
      step: "02",
      title: "Design the APIs",
      body: "Model data and boundaries first: RESTful services, clear contracts, and integrations that teams can extend without surprises.",
      detail: "Schema design, versioning, and error shapes agreed before the first endpoint ships.",
      mockTags: ["OpenAPI", "PostgreSQL", "Auth", "DRF"],
      mockImage: "/img/process/saas-step-2.jpg",
      mockVideo: "/video/process/apis.mp4",
      mockCaption: "02 · Contracts first",
    },
    {
      step: "03",
      title: "Ship and iterate",
      body: "Automate what repeats, measure what matters, and refine with feedback from users and operators.",
      detail: "Observability, migrations, and incremental delivery — not big-bang releases.",
      mockTags: ["Python", "Django", "FastAPI", "CI"],
      mockImage: "/img/process/saas-step-3.jpg",
      mockVideo: "/video/process/ship.mp4",
      mockCaption: "03 · In production",
    },
  ],
} as const;
