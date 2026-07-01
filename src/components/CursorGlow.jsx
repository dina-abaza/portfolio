"use client";
import { useEffect, useRef } from "react";

/*
  CursorGlow — subtle green glow that follows the mouse.
  • Desktop only (skipped on touch devices — zero overhead on mobile).
  • Uses CSS transition (not rAF loop) for minimal CPU cost.
  • Pointer-events: none — never blocks clicks.
*/
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return; // skip mobile entirely

    const el = ref.current;
    if (!el) return;

    let visible = false;

    const onMove = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top  = `${e.clientY}px`;
      if (!visible) {
        el.style.opacity = "1";
        visible = true;
      }
    };

    const onLeave = () => {
      el.style.opacity = "0";
      visible = false;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed z-[9998] opacity-0"
      style={{
        width: "340px",
        height: "340px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(21, 128, 61,0.09) 0%, rgba(34, 165, 89,0.04) 40%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "left 0.12s linear, top 0.12s linear, opacity 0.4s ease",
        willChange: "left, top",
        filter: "blur(2px)",
      }}
    />
  );
}
