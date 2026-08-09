import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = fadeUp(sectionRef.current.querySelectorAll("[data-reveal]"), {
      stagger: 0.1,
      y: 18,
    });

    return () => {
      ctx.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about"
      aria-labelledby="about-title"
    >
      <div className="page-shell about__grid">
        <div className="about__copy">
          <h1 id="about-title" className="about__title" data-reveal>
            <span className="about__firstname">{site.about.titleLines[0]}</span>
            <span className="title-line--dot">
              {site.about.titleLines[1]}
              <span className="accent-dot" aria-hidden />
            </span>
          </h1>
          <p className="about__role" data-reveal>
            {site.role}
          </p>
          <p className="about__tagline" data-reveal>
            {site.tagline}
          </p>
        </div>

        <div className="about__portrait-wrap" data-reveal>
          <figure className="about__portrait">
            <img
              src={site.profileImage}
              alt={`Portrait of ${site.name}`}
              width={900}
              height={1125}
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
