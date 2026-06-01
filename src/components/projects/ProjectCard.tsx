import Image from "next/image";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card" aria-label={project.title}>
      <div className="project-card__media">
        <Image
          src={project.coverImage}
          alt=""
          role="presentation"
          width={150}
          height={1200}
          sizes="400px"
          quality={90}
          className="project-card__image u-img-cover"
        />
      </div>
    </article>
  );
}
