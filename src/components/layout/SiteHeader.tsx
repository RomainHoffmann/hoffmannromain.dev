import Link from "next/link";
import { SITE } from "@/constants/site";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
] as const;

export function SiteHeader() {
  return (
    <header
      data-expand-chrome
      className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-header)] flex justify-center px-gutter pt-[calc(env(safe-area-inset-top,0px)+var(--space-md))] md:px-gutter-lg md:pt-[calc(env(safe-area-inset-top,0px)+var(--space-xl))] transition-opacity duration-[var(--duration-chrome)] ease-[var(--ease-out-expo)]"
    >
      <div className="pointer-events-auto flex w-full max-w-[120rem] items-center justify-between gap-[var(--space-lg)] border border-[var(--border)] bg-[var(--surface)]/80 px-gutter py-[var(--space-header-pad-y)] backdrop-blur-md md:px-gutter-lg">
        <Link
          href="/"
          className="ds-interactive type-nav tracking-[var(--tracking-label)]"
        >
          {SITE.name.split(" ")[0]}
          <span className="text-[var(--accent)]">.</span>
        </Link>
        <nav
          className="type-nav flex items-center gap-[var(--space-xl)]"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="ds-interactive">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
