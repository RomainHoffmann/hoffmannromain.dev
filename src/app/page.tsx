import { ProjectGridSection } from "@/components/sections/ProjectGridSection";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main>
      <ProjectGridSection projects={projects} />
    </main>
  );
}
