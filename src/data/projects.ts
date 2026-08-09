export type Project = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  stack: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  visualStart?: boolean;
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
      "Voltra is a workout tracker built around automatic progression. It tells you when to increase reps or weight, so you can focus on training instead of managing your progression.",
    stack: ["React Native", "Expo", "Supabase"],
    image: "/images/projects/voltra.webp",
    imageWidth: 900,
    imageHeight: 1800,
    links: {
      website: "https://voltra-app.com",
    },
  },
  {
    id: 2,
    slug: "mangeznotez",
    title: "Mangeznotez",
    shortDescription: "Book your next meal.",
    description:
      "Mangeznotez is a booking platform that connects diners with partner restaurants — discover a place, reserve a table, and show up.",
    stack: ["SvelteKit", "NestJS", "PostgreSQL"],
    image: "/images/projects/mangeznotez.webp",
    imageWidth: 1600,
    imageHeight: 1100,
    visualStart: true,
    links: {
      website: "https://mangeznotez.com",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function formatProjectNumber(id: number): string {
  return String(id).padStart(2, "0");
}
