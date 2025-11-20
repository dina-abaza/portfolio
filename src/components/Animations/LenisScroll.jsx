// src/components/LenisScroll.jsx
"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => t,       // Linear smoothing
      smooth: true,
      smoothWheel: true,
      smoothTouch: true,
    });

    // منع Lenis من التأثير على السلايدر أو أي section بعلامة no-lenis
    const noLenisSections = document.querySelectorAll(".no-lenis");
    noLenisSections.forEach((sec) => {
      sec.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
      sec.addEventListener("touchmove", (e) => e.stopPropagation(), { passive: true });
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}
