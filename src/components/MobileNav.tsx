import { sections, type SectionId } from "@/data/site";

type MobileNavProps = {
  active: SectionId;
  onNavigate?: (id: SectionId) => void;
};

export function MobileNav({ active, onNavigate }: MobileNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-bg/90 backdrop-blur-md lg:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-3 px-2 py-2.5">
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
                className={`flex flex-col items-center rounded-xl px-2 py-2 transition-colors ${
                  isActive ? "text-ink" : "text-subtle"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`text-[0.8rem] leading-none ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {section.number}
                </span>
                <span
                  className={`mt-1 text-[0.62rem] tracking-[0.12em] ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {section.label}
                </span>
                <span
                  className={`mt-1.5 h-0.5 w-5 rounded-full bg-accent transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
