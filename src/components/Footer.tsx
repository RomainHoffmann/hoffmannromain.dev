import { MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="page-shell site-footer__inner">
          <div className="site-footer__meta">
            <span className="site-footer__item">
              <MapPin className="icon icon--sm" aria-hidden />
              {site.location}
            </span>
            <span className="site-footer__divider" aria-hidden />
            <span className="site-footer__item">
              <span className="site-footer__dot" aria-hidden />
              {site.availability}
            </span>
          </div>

          <div className="site-footer__actions">
            <>
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="site-footer__social"
              >
                <GitHubIcon className="icon" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="site-footer__social"
              >
                <LinkedInIcon className="icon" />
              </a>
            </>
          </div>
        </div>
      </footer>

      <div className="mobile-status">
        <div className="mobile-status__inner">
          <span className="mobile-status__item">
            <MapPin className="icon icon--sm" aria-hidden />
            {site.location}
          </span>
          <span className="mobile-status__item">
            <span className="site-footer__dot" aria-hidden />
            {site.availability}
          </span>
        </div>
      </div>
    </>
  );
}
