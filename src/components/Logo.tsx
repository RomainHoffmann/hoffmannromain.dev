import { Link } from "react-router-dom";
import { site } from "@/data/site";

type LogoProps = {
  to?: string;
};

export function Logo({ to = "/#about" }: LogoProps) {
  return (
    <Link
      to={to}
      className="fixed top-5 left-[clamp(1.25rem,4vw,3.5rem)] z-40 inline-flex flex-col leading-none"
      aria-label={`${site.name} — Home`}
    >
      <span className="text-[1.05rem] font-extrabold tracking-tight text-ink">
        {site.initials}
      </span>
      <span
        className="mt-1 h-[3px] w-5 rounded-full bg-accent"
        aria-hidden
      />
    </Link>
  );
}
