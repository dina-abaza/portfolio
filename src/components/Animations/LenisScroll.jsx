"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisScroll() {
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) return;

    const lenis = new Lenis({
      duration: 0.3,
      smooth: true,
      smoothWheel: true,
      smoothTouch: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ استثناء أي قسم فيه className="no-lenis"
    const noLenisSections = document.querySelectorAll(".no-lenis");
    noLenisSections.forEach((sec) => {
      sec.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
      sec.addEventListener("touchmove", (e) => e.stopPropagation(), { passive: true });
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
