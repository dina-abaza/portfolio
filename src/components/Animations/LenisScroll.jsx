"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisScroll() {
  useEffect(() => {
    // detect if device is mobile
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile) return; // تشغيل Lenis فقط على الموبايل

    const lenis = new Lenis({
      duration: 0.9,
      smooth: true,
      smoothWheel: true,
      smoothTouch: true,
      easing: (t) => t,
    });

    // تفعيل RAF
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ استثناء الأقسام اللي فيها className="no-lenis"
    // ضع هذا الجزء بعد تهيئة Lenis
    const noLenisSections = document.querySelectorAll(".no-lenis");
    noLenisSections.forEach((sec) => {
      sec.addEventListener("wheel", (e) => e.stopPropagation(), { passive: true });
      sec.addEventListener("touchmove", (e) => e.stopPropagation(), { passive: true });
    });

    // تنظيف عند الخروج
    return () => lenis.destroy();
  }, []);

  return null;
}
