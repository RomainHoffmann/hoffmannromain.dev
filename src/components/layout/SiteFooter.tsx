import { SITE } from "@/constants/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer
      data-expand-chrome
      className="border-t border-[var(--border)] px-gutter py-[var(--space-3xl)] transition-opacity duration-[var(--duration-chrome)] ease-[var(--ease-out-expo)] md:px-gutter-lg"
    >
      <div className="mx-auto flex max-w-[120rem] flex-col gap-[var(--space-2xl)] md:flex-row md:items-end md:justify-between">
        <p className="type-caption max-w-sm text-[var(--muted)]">
          Motion-first interfaces · DOM &amp; CSS craft · Built for filmic rhythm
          and clarity.
        </p>
        <div className="type-caption flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[var(--muted)]">
            © {year} {SITE.name}
          </span>
          <a
            href={SITE.social.github}
            className="ds-interactive-accent ds-link-underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href={SITE.social.linkedin}
            className="ds-interactive-accent ds-link-underline"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
