import { SITE } from "@/constants/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] px-gutter py-[var(--space-3xl)] md:px-gutter-lg">
      <div className="mx-auto flex max-w-[120rem] flex-col gap-[var(--space-2xl)] md:flex-row md:items-end md:justify-between">
        <p className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[var(--muted)]">
          Motion-first interfaces · DOM &amp; CSS craft · Built for filmic rhythm
          and clarity.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.22em]">
          <span className="text-[var(--muted)]">
            © {year} {SITE.name}
          </span>
          <a
            href={SITE.social.github}
            className="ds-interactive-accent"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href={SITE.social.linkedin}
            className="ds-interactive-accent"
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
