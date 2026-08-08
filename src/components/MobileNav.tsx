import { sections, type SectionId } from "@/data/site";

type MobileNavProps = {
  active: SectionId;
  onNavigate?: (id: SectionId) => void;
};

export function MobileNav({ active, onNavigate }: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Primary">
      <ul className="mobile-nav__list">
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
                className={`mobile-nav__link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="mobile-nav__number">{section.number}</span>
                <span className="mobile-nav__label">{section.label}</span>
                <span className="mobile-nav__indicator" aria-hidden />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
