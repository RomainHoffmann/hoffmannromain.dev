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
      className="contact"
      aria-labelledby="contact-title"
    >
      <div className="page-shell content-pad-right contact__grid">
        <div>
          <h2 id="contact-title" className="section-title" data-reveal>
            <span className="stack-title">
              <span>{site.contact.titleLines[0]}</span>
              <span>
                {site.contact.titleLines[1]}
                <span className="accent-dot" aria-hidden />
              </span>
            </span>
          </h2>
          <p className="contact__subtitle" data-reveal>
            {site.contact.subtitle}
          </p>

          <div className="contact__actions" data-reveal>
            <a href={`mailto:${site.email}`} className="btn btn--primary">
              <Mail className="icon" aria-hidden />
              Send email
            </a>
            <a href={site.resumePath} download className="btn btn--secondary">
              View resume
              <Download className="icon" aria-hidden />
            </a>
          </div>
        </div>

        <div className="contact__card" data-reveal>
          <ul>
            {contactRows.map((row) => {
              const Icon = row.icon;
              return (
                <li key={row.label}>
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      row.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="contact__row"
                  >
                    <span className="contact__row-icon">
                      <Icon className="icon" aria-hidden />
                    </span>
                    <span className="contact__row-text">
                      <span className="contact__row-label">{row.label}</span>
                      <span className="contact__row-value">{row.value}</span>
                    </span>
                    <ArrowRight className="icon contact__row-arrow" />
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
