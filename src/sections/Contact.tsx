import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";
import { motion } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const contactRows = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: site.social.linkedin.replace("https://", ""),
    href: site.social.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: site.social.github.replace("https://", ""),
    href: site.social.github,
    icon: GitHubIcon,
  },
] as const;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.base,
          ease: motion.ease.soft,
          stagger: 0.09,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          clearProps: "transform",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex min-h-dvh items-center py-24 lg:py-20"
      aria-labelledby="contact-title"
    >
      <div className="page-shell content-pad-right grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:gap-10">
        <div>
          <h2 id="contact-title" className="section-title" data-reveal>
            <span className="block">{site.contact.titleLines[0]}</span>
            <span className="block">
              {site.contact.titleLines[1]}
              <span className="accent-dot" aria-hidden />
            </span>
          </h2>
          <p
            className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink/80"
            data-reveal
          >
            {site.contact.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mail className="size-4" aria-hidden />
              Send email
            </a>
            <a
              href={site.resumePath}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-subtle"
            >
              View resume
              <Download className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-[1.35rem] border border-line bg-surface shadow-[var(--shadow-card)]"
          data-reveal
        >
          <ul>
            {contactRows.map((row, index) => {
              const Icon = row.icon;
              return (
                <li key={row.label}>
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      row.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className={`group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-neutral-50 sm:px-6 ${
                      index > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <span className="inline-grid size-10 place-items-center rounded-full bg-accent/10 text-accent">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-subtle">
                        {row.label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-medium text-ink">
                        {row.value}
                      </span>
                    </span>
                    <ArrowRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
