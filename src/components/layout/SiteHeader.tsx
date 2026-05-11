import Link from "next/link";
import { SITE } from "@/constants/site";

const nav = [{ label: "Work", href: "#work" }] as const;

export function SiteHeader() {
  return (
    <header data-expand-chrome className="site-header">
      <div className="site-header__bar ds-chrome-depth">
        <Link
          href="/"
          className="site-header__brand ds-interactive ds-link-underline type-nav"
        >
          {SITE.name.split(" ")[0]}
          <span className="site-header__dot">.</span>
        </Link>
        <nav className="site-header__nav type-nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="ds-interactive ds-link-underline">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
