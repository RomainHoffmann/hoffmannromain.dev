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

    const update = () => {
      const marker = window.innerHeight * 0.32;
      let next: SectionId = elements[0].id as SectionId;

      for (const el of elements) {
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= marker && bottom > marker) {
          next = el.id as SectionId;
          break;
        }
        if (top <= marker) {
          next = el.id as SectionId;
        }
      }

      setActive((prev) => (prev === next ? prev : next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  return active;
}
