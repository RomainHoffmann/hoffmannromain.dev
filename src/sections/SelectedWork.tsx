import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { motion } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.base,
          ease: motion.ease.soft,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          clearProps: "transform",
        },
      );

      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-project-card]"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.slow,
          ease: motion.ease.soft,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
          clearProps: "transform",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects"
      aria-labelledby="projects-title"
    >
      <div className="page-shell content-pad-right">
        <div className="projects__layout">
          <header className="projects__intro">
            <h2 id="projects-title" className="section-title" data-reveal>
              <span className="stack-title">
                <span>{site.projectsIntro.titleLines[0]}</span>
                <span>
                  {site.projectsIntro.titleLines[1]}
                  <span className="accent-dot" aria-hidden />
                </span>
              </span>
            </h2>
          </header>

          <ul className="projects__list">
            {projects.map((project) => (
              <li key={project.id} data-project-card>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
