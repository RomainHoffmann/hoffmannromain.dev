import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Download } from "lucide-react";
import { site } from "@/data/site";
import { motion } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const contactRows = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "LinkedIn",
    value: site.social.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
    href: site.social.linkedin,
  },
  {
    label: "GitHub",
    value: site.social.github.replace(/^https?:\/\/(www\.)?/, ""),
    href: site.social.github,
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
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.base,
          ease: motion.ease.soft,
          stagger: 0.08,
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
      className="contact"
      aria-labelledby="contact-title"
    >
      <div className="page-shell content-pad-right contact__shell">
        <div className="contact__layout">
          <div className="contact__intro">
            <h2 id="contact-title" className="contact__title" data-reveal>
              <span>{site.contact.titleLines[0]}</span>
              <span className="title-line--dot">
                {site.contact.titleLines[1]}
                <span className="accent-dot" aria-hidden />
              </span>
            </h2>

            <p className="contact__subtitle" data-reveal>
              {site.contact.subtitle}
            </p>

            <div className="contact__actions" data-reveal>
              <a
                href={site.resumePath}
                download
                className="btn btn--outline contact__resume"
              >
                View resume
                <Download className="icon" aria-hidden />
              </a>
            </div>
          </div>

          <ul className="contact__links" data-reveal>
            {contactRows.map((row) => (
              <li key={row.label}>
                <a
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                  className="contact__link"
                >
                  <span className="contact__link-text">
                    <span className="contact__link-label">{row.label}</span>
                    <span className="contact__link-value">{row.value}</span>
                  </span>
                  <ArrowUpRight
                    className="icon icon--md contact__link-arrow"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
