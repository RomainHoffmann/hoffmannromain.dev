import { SITE } from "@/constants/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer data-expand-chrome className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__lead type-caption">
          Motion-first interfaces · DOM &amp; CSS craft · Built for filmic rhythm
          and clarity.
        </p>
        <div className="site-footer__meta type-caption">
          <span className="site-footer__copy">
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
