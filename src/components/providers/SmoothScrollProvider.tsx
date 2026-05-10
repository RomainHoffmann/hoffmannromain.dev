"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { configureMotion } from "@/lib/motion/init-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import "lenis/dist/lenis.css";

const LenisContext = createContext<MutableRefObject<Lenis | null> | null>(null);

/**
 * Ref to the Lenis instance — read `ref.current` only in effects or handlers,
 * not during render (strict ESLint / React 19 rules).
 */
export function useLenisRef(): MutableRefObject<Lenis | null> | null {
  return useContext(LenisContext);
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/**
 * Global Lenis + GSAP ticker: single RAF clock, ScrollTrigger updates each frame.
 * `lagSmoothing(0)` keeps scroll-linked motion tight on desktop.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    configureMotion();

    const instance = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      lerp: 0.085,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.28,
      syncTouch: false,
      autoResize: true,
    });

    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    /** GSAP ticker supplies ms clock — matches Lenis rAF contract */
    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => {
      instance.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
      instance.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
