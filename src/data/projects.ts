export type Project = {
  id: string;
  title: string;
  synopsis: string;
  role: string;
  year: string;
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: "signal-flow",
    title: "Signal Flow",
    synopsis:
      "A broadcast-grade control surface with latency-aware visual feedback and kinetic typography.",
    role: "Lead front-end · Motion",
    year: "2025",
    stack: ["Next.js", "WebGPU overlays", "GSAP"],
  },
  {
    id: "atlas-editorial",
    title: "Atlas Editorial",
    synopsis:
      "Long-form reading engine with scroll-linked layouts and adaptive rhythm.",
    role: "Creative development",
    year: "2024",
    stack: ["React", "CSS architecture", "Lenis"],
  },
  {
    id: "meridian",
    title: "Meridian",
    synopsis:
      "Product marketing site with magnetic UI, scene-based narrative, and tight performance budgets.",
    role: "UI engineering",
    year: "2024",
    stack: ["TypeScript", "Design systems", "A11y"],
  },
];
