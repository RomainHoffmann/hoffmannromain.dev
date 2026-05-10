import type { Project } from "@/types/project";

export type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "signal-flow",
    slug: "signal-flow",
    title: "Signal Flow",
    tagline: "Latency-aware control for live broadcast surfaces.",
    description:
      "A broadcast-grade control surface with latency-aware visual feedback and kinetic typography. Built for operators who need calm hierarchy under load.",
    year: 2025,
    status: "shipped",
    type: "Control UI · Broadcast",
    platform: ["web"],
    role: "Lead front-end · Motion",
    context:
      "Replace dense dashboards with a readable scene structure and motion that confirms state changes without shouting.",
    stack: ["Next.js", "WebGPU overlays", "GSAP", "TypeScript"],
    features: [
      "Scene-based navigation",
      "Latency-aware feedback loops",
      "Operator-grade density controls",
    ],
    liveUrl: null,
    githubUrl: null,
    videoUrl: null,
    coverImage: "/projects/signal-flow.svg",
    galleryImages: [],
    accentColor: "#ff5321",
  },
  {
    id: "atlas-editorial",
    slug: "atlas-editorial",
    title: "Atlas Editorial",
    tagline: "Long-form rhythm for serious reading.",
    description:
      "Long-form reading engine with scroll-linked layouts and adaptive rhythm — typography and pacing treated as one system.",
    year: 2024,
    status: "shipped",
    type: "Reading · Layout engine",
    platform: ["web"],
    role: "Creative development",
    context:
      "Editorial product where scroll depth maps to narrative beats; layouts adapt without breaking reading flow.",
    stack: ["React", "CSS architecture", "Lenis", "TypeScript"],
    features: [
      "Scroll-linked layout rails",
      "Adaptive measure & rhythm",
      "Performance-first media loading",
    ],
    liveUrl: null,
    githubUrl: null,
    videoUrl: null,
    coverImage: "/projects/atlas-editorial.svg",
    galleryImages: [],
    accentColor: "#d4bc90",
  },
  {
    id: "meridian",
    slug: "meridian",
    title: "Meridian",
    tagline: "Product narrative with strict performance budgets.",
    description:
      "Product marketing site with magnetic UI, scene-based narrative, and tight performance budgets — restraint as a feature.",
    year: 2024,
    status: "shipped",
    type: "Marketing · Narrative",
    platform: ["web"],
    role: "UI engineering",
    context:
      "Marketing surface that behaves like software: motion earns attention, sections load predictably, accessibility non-negotiable.",
    stack: ["TypeScript", "Design systems", "A11y", "Next.js"],
    features: [
      "Design-token-driven UI",
      "Scene-style storytelling",
      "Core Web Vitals discipline",
    ],
    liveUrl: null,
    githubUrl: null,
    videoUrl: null,
    coverImage: "/projects/meridian.svg",
    galleryImages: [],
    accentColor: "#8fa8c4",
  },
];

/** Lookup by slug — useful for `[slug]` routes and static params. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
