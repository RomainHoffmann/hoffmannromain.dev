import { Link } from "react-router-dom";
import { site } from "@/data/site";

type LogoProps = {
  to?: string;
};

export function Logo({ to = "/#about" }: LogoProps) {
  return (
    <header className="logo-header">
      <Link to={to} className="logo" aria-label={`${site.name} — Home`}>
        <span className="logo__text">{site.initials}e</span>
        <span className="logo__mark" aria-hidden />
      </Link>
    </header>
  );
}
