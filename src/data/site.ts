// Every user-facing string that isn't in a markdown file lives here.

export const site = {
  name: "Muhammad Hamza Asad",
  email: "m.hamza.asad.22@gmail.com",
  cv: "/m_Hamza_Asad_Resume.pdf",
  github: "https://github.com/ramenguy21",
  linkedin: "https://www.linkedin.com/in/mhamza-asad/",

  masthead: {
    location: "Karachi, PK · UTC+5",
    tenure: "Four years shipping",
    availability: "Available",
  },

  hero: {
    // The headline is split so "and" can be set in Instrument Serif italic.
    headline: ["I build the product ", "and", " the infrastructure under it."],
    tagline: "Open to remote & contract",
    body: "Full-stack engineer, 4+ years across product and infrastructure. Currently freelancing — building scalable, user-friendly applications end to end, from schema to CI pipeline to the screen the client actually uses.",
    primaryCta: "Start a project",
    secondaryCta: "Download CV",
  },

  ticker: [
    "Go",
    "TypeScript",
    "Postgres",
    "MongoDB",
    "React",
    "Node.js",
    "NestJS",
    "Temporal",
    "Kafka",
    "Hasura",
    "GraphQL",
    "AWS",
    "Kubernetes",
    "Terraform",
    "React Native",
  ],

  experience: [
    {
      company: "Farmevo",
      period: "2023",
      role: "Fullstack Developer — customer portal, Hasura data modeling",
    },
    {
      company: "Elphinstone Inc",
      period: "2021–2023",
      role: "Associate SWE — KYC on Temporal + Go, CI/CD to ECS/EKS, React Native",
    },
  ],

  tools: [
    { label: "Backend", items: ["GoLang", "Node.js", "Express", "Python", "Django"] },
    {
      label: "Frontend",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Svelte"],
    },
    { label: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
    {
      label: "DevOps & Cloud",
      items: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"],
    },
    {
      label: "Architecture",
      items: ["Microservices", "REST APIs", "WebSockets", "CI/CD"],
    },
    { label: "Tools", items: ["Git", "Linux", "Postman", "VS Code", "Figma"] },
  ],

  footer: {
    headline: "Tell me what you're building.",
    note: "Replies within a day",
    copyright: "© 2026 M. H. Asad",
    colophon: "Set in Bricolage & IBM Plex Mono",
  },
} as const;

export type NavItem = {
  label: string;
  /** In-page anchor on the home route. */
  hash?: string;
  /** Router path. */
  to?: string;
  /** External or asset href. */
  href?: string;
  download?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Work", hash: "#work" },
  { label: "Experience", hash: "#experience" },
  { label: "Writing", to: "/blog" },
  { label: "Contact", href: `mailto:${site.email}` },
  { label: "CV", href: site.cv, download: true },
];
