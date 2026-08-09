import { useLayoutEffect, useRef, useState } from "react";
import { sections, type SectionId } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SideNavProps = {
  active: SectionId;
  onNavigate?: (id: SectionId) => void;
};

type Indicator = {
  top: number;
  height: number;
};

export function SideNav({ active, onNavigate }: SideNavProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<SectionId, HTMLLIElement>>(new Map());
  const [indicator, setIndicator] = useState<Indicator>({ top: 0, height: 0 });
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const update = () => {
      const rail = railRef.current;
      const item = itemRefs.current.get(active);
      if (!rail || !item) return;

      setIndicator({
        top: item.offsetTop,
        height: item.offsetHeight,
      });
    };

    update();

    const rail = railRef.current;
    if (!rail) return;

    const observer = new ResizeObserver(update);
    observer.observe(rail);
    for (const item of itemRefs.current.values()) {
      observer.observe(item);
    }

    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [active]);

  return (
    <nav className="side-nav" aria-label="Primary">
      <div ref={railRef} className="side-nav__rail">
        <span className="side-nav__track" aria-hidden />
        <span
          className="side-nav__thumb"
          aria-hidden
          style={{
            transform: `translateY(${indicator.top}px)`,
            height: indicator.height,
            transitionDuration: reducedMotion ? "0ms" : undefined,
          }}
        />

        <ul className="side-nav__list">
          {sections.map((section) => {
            const isActive = active === section.id;

            return (
              <li
                key={section.id}
                ref={(node) => {
                  if (node) itemRefs.current.set(section.id, node);
                  else itemRefs.current.delete(section.id);
                }}
              >
                <a
                  href={`/#${section.id}`}
                  onClick={(event) => {
                    if (!onNavigate) return;
                    event.preventDefault();
                    onNavigate(section.id);
                  }}
                  className={`side-nav__link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="side-nav__number">{section.number}</span>
                  <span className="side-nav__label">{section.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
