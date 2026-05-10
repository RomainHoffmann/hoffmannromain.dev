import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectGridSection } from "@/components/sections/ProjectGridSection";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div
      data-expand-dim
      className="ds-view-enter-shell relative flex min-h-full flex-col transition-opacity duration-[var(--duration-shell)] ease-[var(--ease-out-expo)]"
    >
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ProjectGridSection projects={projects} />
        <ApproachSection />
      </main>
      <SiteFooter />
    </div>
  );
}
