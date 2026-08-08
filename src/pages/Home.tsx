import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { SelectedWork } from "@/sections/SelectedWork";

export function Home() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <main className="home">
      <About />
      <SelectedWork />
      <Contact />
    </main>
  );
}
