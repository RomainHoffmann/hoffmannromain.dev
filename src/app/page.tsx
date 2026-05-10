import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <WorkSection projects={projects} />
        <ApproachSection />
      </main>
      <SiteFooter />
    </div>
  );
}
