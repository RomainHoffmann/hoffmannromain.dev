import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { SelectedWork } from "@/sections/SelectedWork";
import { usePageMeta } from "@/hooks/usePageMeta";
import { scrollToSection } from "@/lib/scroll";

export function Home() {
  const location = useLocation();

  usePageMeta({
    title: "Romain Hoffmann — Full-stack Developer",
    description:
      "Full-stack developer building web and mobile products with TypeScript, React, React Native, SvelteKit and Node.js.",
    path: "/",
  });

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;

    const frame = requestAnimationFrame(() => {
      scrollToSection(id);
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
