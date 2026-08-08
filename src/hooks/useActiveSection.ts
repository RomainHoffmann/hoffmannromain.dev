import { useEffect, useState } from "react";
import { sections, type SectionId } from "@/data/site";

export function useActiveSection(enabled = true): SectionId {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    if (!enabled) return;

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let next: SectionId = "about";
        let best = -1;

        for (const section of sections) {
          const ratio = ratios.get(section.id) ?? 0;
          if (ratio > best) {
            best = ratio;
            next = section.id;
          }
        }

        setActive(next);
      },
      {
        threshold: [0.25, 0.4, 0.55, 0.7],
        rootMargin: "-10% 0px -35% 0px",
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}
