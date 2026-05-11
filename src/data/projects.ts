import { faker } from "@faker-js/faker";
import type { Project, ProjectStatus } from "@/types/project";

export type { Project, ProjectTheme } from "@/types/project";

faker.seed(42_024);

const STATUS_POOL: ProjectStatus[] = [
  "concept",
  "draft",
  "in_progress",
  "shipped",
  "archived",
];

const TYPE_LABELS = [
  "Website",
  "Mobile app",
  "SaaS",
  "Landing page",
  "Dashboard",
  "Portfolio",
  "Game",
  "Creative dev",
  "3D experience",
  "AI tool",
  "Automation",
  "E-commerce",
  "CMS",
  "Browser extension",
  "Other",
] as const;

const CONTEXT_LABELS = [
  "Personal",
  "Client",
  "Freelance",
  "Startup",
  "Agency",
  "Open source",
] as const;

const ROLE_LABELS = [
  "Full stack developer",
  "Frontend developer",
  "Backend developer",
  "Solo developer",
] as const;

const COVER_ROTATION = [
  "/projects/signal-flow.svg",
  "/projects/atlas-editorial.svg",
  "/projects/meridian.svg",
] as const;

function randomTheme() {
  return {
    textColor: faker.color.rgb({ format: "hex", casing: "lower" }),
    sceneBackground: faker.color.rgb({ format: "hex", casing: "lower" }),
  };
}

function createFakerProject(index: number): Project {
  const title = faker.commerce.productName();
  const baseSlug =
    faker.helpers.slugify(title).toLowerCase() || `project-${index}`;
  const slug = `${baseSlug}-${index}`;
  const year = String(faker.number.int({ min: 2019, max: 2026 }));

  return {
    id: slug,
    slug,
    title,
    description: faker.lorem.paragraphs({ min: 2, max: 4 }, "\n\n"),
    year,
    status: faker.helpers.arrayElement(STATUS_POOL),
    type: faker.helpers.arrayElement(TYPE_LABELS),
    role: faker.helpers.arrayElement(ROLE_LABELS),
    context: `${faker.helpers.arrayElement(CONTEXT_LABELS)} — ${faker.lorem.sentence()}`,
    liveUrl: faker.datatype.boolean({ probability: 0.55 })
      ? faker.internet.url({ appendSlash: false })
      : null,
    coverImage: COVER_ROTATION[index % COVER_ROTATION.length],
    galleryImages: faker.datatype.boolean({ probability: 0.25 })
      ? faker.helpers.arrayElements([...COVER_ROTATION], { min: 1, max: 2 })
      : [],
    theme: randomTheme(),
  };
}

const mangeznotez: Project = {
  id: "mangeznotez",
  slug: "mangeznotez",
  title: "mangeznotez",
  description: faker.lorem.lines({ min: 2, max: 4 }),
  year: String(faker.date.past({ years: 8 }).getFullYear()),
  status: "shipped",
  type: "Website",
  role: "Full stack developer",
  context: "Startup — produit autour des expériences culinaires partagées.",
  liveUrl: faker.internet.url({ appendSlash: false }),
  coverImage:
    "https://images.freeimages.com/images/large-previews/d9d/festive-family-meal-0410-5702854.jpg?w=1500",
  galleryImages: [],
  theme: {
    textColor: "#ff5321",
    sceneBackground: "#111111",
  },
};

const generated = Array.from({ length: 7 }, (_, i) => createFakerProject(i));

export const projects: Project[] = [mangeznotez, ...generated];

export default projects;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
