export type Project = {
  id: string;
  title: string;
  synopsis: string;
  /** Editorial label — surface on cards as “type” */
  type: string;
  role: string;
  year: string;
  stack: string[];
  href?: string;
  /** Cover art — local public path */
  coverSrc: string;
};

export const projects: Project[] = [
  {
    id: "signal-flow",
    title: "Signal Flow",
    type: "Control UI · Broadcast",
    synopsis:
      "A broadcast-grade control surface with latency-aware visual feedback and kinetic typography.",
    role: "Lead front-end · Motion",
    year: "2025",
    stack: ["Next.js", "WebGPU overlays", "GSAP"],
    coverSrc: "/projects/signal-flow.svg",
  },
  {
    id: "atlas-editorial",
    title: "Atlas Editorial",
    type: "Reading · Layout engine",
    synopsis:
      "Long-form reading engine with scroll-linked layouts and adaptive rhythm.",
    role: "Creative development",
    year: "2024",
    stack: ["React", "CSS architecture", "Lenis"],
    coverSrc: "/projects/atlas-editorial.svg",
  },
  {
    id: "meridian",
    title: "Meridian",
    type: "Marketing · Narrative",
    synopsis:
      "Product marketing site with magnetic UI, scene-based narrative, and tight performance budgets.",
    role: "UI engineering",
    year: "2024",
    stack: ["TypeScript", "Design systems", "A11y"],
    coverSrc: "/projects/meridian.svg",
  },
];
