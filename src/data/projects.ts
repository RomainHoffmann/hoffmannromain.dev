export type Project = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  stack: string[];
  image: string;
  links?: {
    website?: string;
    github?: string;
  };
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "voltra",
    title: "Voltra",
    shortDescription: "Workout tracking, without thinking about progression.",
    description:
      "Voltra is a mobile workout tracking application that helps athletes log sessions, follow progression and stay consistent without friction.",
    stack: [
      "React Native",
      "Expo",
      "Supabase",
      "Zustand",
      "TanStack Query",
    ],
    image: "/images/projects/voltra.webp",
    links: {
      github: "https://github.com/romainhoffmann",
    },
  },
  {
    id: 2,
    slug: "eventhub",
    title: "EventHub",
    shortDescription: "Placeholder — event analytics dashboard for organizers.",
    description:
      "Placeholder project description. Replace this copy with the real EventHub case study when ready.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "/images/projects/eventhub.webp",
    links: {
      website: "https://example.com",
      github: "https://github.com/romainhoffmann",
    },
  },
  {
    id: 3,
    slug: "portfolio-v2",
    title: "Portfolio V2",
    shortDescription: "Placeholder — personal site focused on clarity and craft.",
    description:
      "Placeholder project description. Replace this copy with details about the portfolio rebuild when ready.",
    stack: ["React", "Vite", "Tailwind CSS", "GSAP"],
    image: "/images/projects/portfolio-v2.webp",
    links: {
      website: "https://hoffmannromain.dev",
      github: "https://github.com/romainhoffmann",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function formatProjectNumber(id: number): string {
  return String(id).padStart(2, "0");
}
