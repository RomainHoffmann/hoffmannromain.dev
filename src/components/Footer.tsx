import { ArrowUp, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";

type FooterProps = {
  showSocial?: boolean;
};

export function Footer({ showSocial = false }: FooterProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const goTop = () => {
    if (isHome) {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/#about");
  };

  return (
    <>
      <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-30 hidden border-t border-line/90 bg-bg/80 backdrop-blur-sm lg:block">
        <div className="page-shell content-pad-right flex h-14 items-center justify-between text-[0.8rem] text-muted">
          <div className="pointer-events-auto flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden />
              {site.location}
            </span>
            <span className="h-3 w-px bg-line" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-available" aria-hidden />
              {site.availability}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-3">
            {showSocial ? (
              <>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-muted transition-colors hover:text-ink"
                >
                  <GitHubIcon className="size-4" />
                </a>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted transition-colors hover:text-ink"
                >
                  <LinkedInIcon className="size-4" />
                </a>
              </>
            ) : (
              <button
                type="button"
                onClick={goTop}
                aria-label="Back to top"
                className="inline-grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-subtle hover:text-ink"
              >
                <ArrowUp className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed inset-x-0 bottom-[4.25rem] z-30 border-t border-line/70 bg-bg/85 px-4 py-2 text-[0.7rem] text-muted backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 truncate">
            <MapPin className="size-3 shrink-0" aria-hidden />
            {site.location}
          </span>
          <span className="inline-flex items-center gap-1.5 truncate">
            <span className="size-1.5 rounded-full bg-available" aria-hidden />
            {site.availability}
          </span>
        </div>
      </div>
    </>
  );
}
