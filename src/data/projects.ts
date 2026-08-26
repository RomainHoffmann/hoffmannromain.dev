export const projectRoles = [
  "Solo Developer",
  "Full-stack Developer",
  "Front-end Developer",
] as const;

export type ProjectRole = (typeof projectRoles)[number];

export type Project = {
  id: number;
  slug: string;
  title: string;
  role: ProjectRole;
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
    appStore?: string;
    playStore?: string;
  };
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "voltra",
    title: "Voltra",
    role: "Solo Developer",
    shortDescription: "Workout tracking with progression built in.",
    description:
      "Voltra is a mobile workout tracker built around automatic progression. It tracks your performance and tells you when to increase reps or weight, so you can focus on training instead of managing your progression.",
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
    role: "Full-stack Developer",
    shortDescription: "Discover restaurants and book your next table.",
    description:
      "Mangeznotez is a restaurant discovery and booking platform. I contributed to the product as a full-stack developer, working on the SvelteKit and NestJS application, feature development, refactoring, and third-party integrations.",
    stack: ["SvelteKit", "NestJS", "Elasticsearch"],
    image: "/images/projects/mangeznotez.webp",
    imageWidth: 1600,
    imageHeight: 1100,
    visualStart: true,
    links: {
      website: "https://mangeznotez.com",
    },
  },

  {
    id: 3,
    slug: "restopro",
    title: "Resto Pro",
    role: "Full-stack Developer",
    shortDescription:
      "Restaurant management tools, built for daily operations.",
    description:
      "Resto Pro is a web and mobile platform for restaurant owners to manage their day-to-day operations, including reservations and customer activity. I contributed to both the web platform and mobile application as a full-stack developer.",
    stack: ["SvelteKit", "NestJS", "Flutter"],
    image: "/images/projects/restopro.webp",
    imageWidth: 1600,
    imageHeight: 1100,
    links: {
      website: "https://resto-pro.com",
      playStore:
        "https://play.google.com/store/apps/details?id=com.restopro.resto_pro&hl=en",
      appStore: "https://apps.apple.com/fr/app/resto-pro-com/id6502593583",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function formatProjectNumber(id: number): string {
  return String(id).padStart(2, "0");
}
