import { sections, type SectionId } from "@/data/site";

type SideNavProps = {
  active: SectionId;
  onNavigate?: (id: SectionId) => void;
};

export function SideNav({ active, onNavigate }: SideNavProps) {
  return (
    <nav
      className="pointer-events-none fixed top-1/2 right-[clamp(1rem,2.5vw,2.25rem)] z-40 hidden -translate-y-1/2 lg:block"
      aria-label="Primary"
    >
      <ul className="pointer-events-auto flex flex-col gap-7">
        {sections.map((section) => {
          const isActive = active === section.id;

          return (
            <li key={section.id}>
              <a
                href={`/#${section.id}`}
                onClick={(event) => {
                  if (!onNavigate) return;
                  event.preventDefault();
                  onNavigate(section.id);
                }}
                className="group relative flex flex-col items-start pl-3"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`absolute top-0.5 left-0 h-[1.65rem] w-[2px] rounded-full bg-accent transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />
                <span
                  className={`text-[0.95rem] leading-none transition-colors duration-300 ${
                    isActive
                      ? "font-bold text-ink"
                      : "font-medium text-subtle group-hover:text-muted"
                  }`}
                >
                  {section.number}
                </span>
                <span
                  className={`mt-1 text-[0.68rem] tracking-[0.14em] transition-colors duration-300 ${
                    isActive
                      ? "font-semibold text-ink"
                      : "font-medium text-subtle group-hover:text-muted"
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
