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
    stack: ["React Native", "Expo", "Supabase"],
    image: "/images/projects/voltra.webp",
    links: {
      github: "https://github.com/romainhoffmann",
    },
  },
  {
    id: 2,
    slug: "mangeznotez",
    title: "Mangeznotez",
    shortDescription: "Book your next meal.",
    description:
      "Mangeznotez is a platform that allows you to book your next meal in a partner restaurant.",
    stack: ["Sveltekit", "NestJS", "PostgreSQL"],
    image: "/images/projects/mangeznotez.webp",
    links: {
      website: "https://mangeznotez.com",
      github: "https://github.com/romainhoffmann",
    },
  },
  {
    id: 3,
    slug: "restopro",
    title: "Restopro",
    shortDescription: "Restaurant management system.",
    description:
      "Restopro is a restaurant management system that helps you manage your restaurant.",
    stack: ["Sveltekit", "NestJS", "Flutter"],
    image: "/images/projects/restopro.webp",
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
