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
      <div className="page-shell content-pad-right about__grid">
        <div className="about__copy">
          <h1 id="about-title" className="display-title" data-reveal>
            <span className="stack-title">
              <span>{site.about.titleLines[0]}</span>
              <span>
                {site.about.titleLines[1]}
                <span className="accent-dot" aria-hidden />
              </span>
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
          <div className="about__portrait">
            <img
              src={site.profileImage}
              alt={`Portrait of ${site.name}`}
              onError={(event) => {
                const img = event.currentTarget;
                img.style.display = "none";
                const fallback = img.nextElementSibling;
                if (fallback instanceof HTMLElement) {
                  fallback.hidden = false;
                }
              }}
            />
            <div hidden className="about__fallback" aria-hidden>
              <div className="about__fallback-avatar" />
              <p className="about__fallback-label">PROFILE</p>
              <p className="about__fallback-hint">
                Add <code>/public/images/profile.webp</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
