import { MapPin } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <span className="site-footer__item">
          <MapPin className="icon icon--sm" aria-hidden />
          {site.location}
        </span>
        <span className="site-footer__item">
          <span className="site-footer__dot" aria-hidden />
          {site.availability}
        </span>
      </div>
    </footer>
  );
}
