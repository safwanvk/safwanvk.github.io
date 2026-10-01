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
    "Backend APIs and production systems for founders, teams, and regulated industries.",
  footerWatermarkText: "SAFWAN VK",
  role: "Backend Developer",
  headline: ["Lead Backend Engineer", "for scalable products & APIs"],
  tagline:
    "I build readable, scalable backend systems — turning complex domains into maintainable APIs and shipping work that holds up in production.",
  email: "dev.safwan@outlook.com",
  resumeUrl: "/Safwan Resume.pdf",
  siteUrl: "https://safwanvk.github.io",
  description:
    "Lead Backend Engineer focused on scalable APIs, Django/FastAPI, and production-ready systems.",
  availabilityBar: "Lead Backend @ Barq Group · Get in touch for backend roles & collaborations",
  social: {
    github: "https://github.com/safwanvk",
    linkedin: "https://www.linkedin.com/in/safwan-vk/",
    instagram: "https://www.instagram.com/_safwanvk/",
    twitter: "",
  },
  stats: [
    { value: "5+", label: "Years building backends" },
    { value: "Healthcare · Aviation · SaaS", label: "Domains" },
    { value: "Python · Django · FastAPI", label: "Core stack" },
  ],
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
  useCasesLead:
    "From regulated healthcare to internal ops — backend systems that teams can extend and operate.",
  useCases: [
    {
      title: "API platforms",
      caption: "RESTful services, auth, and integrations teams can extend without surprises.",
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
      caption: "Hospital ops, regulated workflows, and data models that scale across facilities.",
      accent: "#1a3a2f",
      symbol: "HIPAA",
      tags: ["Workflows", "Audit", "Multi-site"],
      layout: "single",
      imageTop: "/img/use-cases/healthcare-single.jpg",
      imageAltTop: "Clinician with a tablet in a hospital room",
    },
    {
      title: "Internal ops tools",
      caption: "Dashboards, automation, and backends that cut weekly work to minutes.",
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
      detail: "No script or outline required — start from docs, interviews, or a rough product idea.",
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
