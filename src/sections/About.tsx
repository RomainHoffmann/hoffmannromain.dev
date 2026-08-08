import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import { fadeUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = fadeUp(
      sectionRef.current.querySelectorAll("[data-reveal]"),
      { stagger: 0.1, y: 18 },
    );

    return () => {
      ctx.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-dvh items-center pb-20 pt-24 lg:pb-16 lg:pt-10"
      aria-labelledby="about-title"
    >
      <div className="page-shell content-pad-right grid w-full items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] lg:gap-8">
        <div className="max-w-xl pb-4 lg:pb-10">
          <h1 id="about-title" className="display-title" data-reveal>
            <span className="block">{site.about.titleLines[0]}</span>
            <span className="block">
              {site.about.titleLines[1]}
              <span className="accent-dot" aria-hidden />
            </span>
          </h1>
          <p
            className="mt-6 text-[clamp(1.15rem,2vw,1.45rem)] font-medium text-ink"
            data-reveal
          >
            {site.role}
          </p>
          <p
            className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted"
            data-reveal
          >
            {site.tagline}
          </p>
        </div>

        <div
          className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:justify-self-end"
          data-reveal
        >
          <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
            <img
              src={site.profileImage}
              alt={`Portrait of ${site.name}`}
              className="h-full w-full object-cover object-top grayscale"
              onError={(event) => {
                const img = event.currentTarget;
                img.style.display = "none";
                const fallback = img.nextElementSibling;
                if (fallback instanceof HTMLElement) {
                  fallback.hidden = false;
                }
              }}
            />
            <div
              hidden
              className="flex h-full w-full flex-col items-center justify-end bg-gradient-to-b from-neutral-100 to-neutral-200 px-6 pb-8 text-center"
              aria-hidden
            >
              <div className="mb-auto mt-16 size-28 rounded-full bg-neutral-300/80" />
              <p className="text-xs font-semibold tracking-[0.16em] text-subtle">
                PROFILE
              </p>
              <p className="mt-2 text-sm text-muted">
                Add <code className="text-ink">/public/images/profile.webp</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
