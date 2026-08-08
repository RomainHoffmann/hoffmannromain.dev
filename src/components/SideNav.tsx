import { sections, type SectionId } from "@/data/site";

type SideNavProps = {
  active: SectionId;
  onNavigate?: (id: SectionId) => void;
};

export function SideNav({ active, onNavigate }: SideNavProps) {
  return (
    <nav className="side-nav" aria-label="Primary">
      <ul className="side-nav__list">
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
                className={`side-nav__link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="side-nav__indicator" aria-hidden />
                <span className="side-nav__number">{section.number}</span>
                <span className="side-nav__label">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
