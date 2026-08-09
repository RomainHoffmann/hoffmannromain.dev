import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { SideNav } from "@/components/SideNav";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { SectionId } from "@/data/site";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const observed = useActiveSection(isHome);
  const active: SectionId = isHome ? observed : "projects";

  const handleNavigate = (id: SectionId) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(`/#${id}`);
  };

  return (
    <div className="app-shell">
      <Logo to={isHome ? "/#about" : "/"} />
      <SideNav active={active} onNavigate={handleNavigate} />
      <MobileNav active={active} onNavigate={handleNavigate} />
      <Outlet />
      <Footer />
    </div>
  );
}
