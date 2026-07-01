"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import AuroraLogo from "@/components/AuroraLogo";
import { useLang } from "@/context/LangContext";

const NAV_LINKS = [
  { label: "Home",     anchor: "hero" },
  { label: "Services", anchor: "services" },
  { label: "Work",     anchor: "work" },
  { label: "Process",  anchor: "process" },
  { label: "About",    anchor: "about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, T } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getHref = (anchor) => (isHome ? `#${anchor}` : `/#${anchor}`);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(21, 128, 61, 0.1)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <AuroraLogo variant={scrolled ? "light" : "dark"} size={34} />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, anchor }) => (
            <li key={anchor}>
              <Link
                href={getHref(anchor)}
                className="text-xs font-bold tracking-[2px] uppercase transition-colors duration-300"
                style={{ color: "#475569" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#15803D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {T?.nav[anchor] || label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button + pulsing envelope */}
        <div className="hidden md:flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="relative flex items-center rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(21, 128, 61,0.07)",
              border: "1px solid rgba(21, 128, 61,0.18)",
              padding: "2px",
            }}
            aria-label="Toggle language"
          >
            {["EN","AR"].map((l) => (
              <span
                key={l}
                className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest transition-all duration-300"
                style={{
                  background: (lang === "en" ? "EN" : "AR") === l ? "linear-gradient(135deg,#15803D,#22A559)" : "transparent",
                  color: (lang === "en" ? "EN" : "AR") === l ? "#fff" : "#22A559",
                }}
              >
                {l}
              </span>
            ))}
          </button>

          {/* Envelope pulse */}
          <Link
            href={getHref("contact")}
            aria-label="Contact us"
            className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "rgba(21, 128, 61,0.08)",
              border: "1px solid rgba(21, 128, 61,0.18)",
            }}
          >
            {/* Ping ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(21, 128, 61,0.18)", animationDuration: "1.8s" }}
            />
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", zIndex: 1 }}>
              <rect x="2" y="5" width="16" height="11" rx="2" stroke="#22A559" strokeWidth="1.6"/>
              <path d="M2 7l8 5 8-5" stroke="#22A559" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link
            href={getHref("contact")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold tracking-wider uppercase hover:opacity-90 hover:scale-[1.03] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #15803D, #22A559)",
              boxShadow: "0 4px 16px rgba(21, 128, 61,0.25)",
            }}
          >
            {T?.nav.startProject}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1 transition-colors"
          style={{ color: "#475569" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(21, 128, 61,0.1)",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, anchor }) => (
                <Link
                  key={anchor}
                  href={getHref(anchor)}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-xs font-bold tracking-[2px] uppercase transition-colors duration-200 border-b"
                  style={{
                    color: "#475569",
                    borderColor: "rgba(21, 128, 61,0.08)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#15803D")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  {T?.nav[anchor] || label}
                </Link>
              ))}

              {/* Lang toggle — mobile */}
              <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(21, 128, 61,0.08)" }}>
                <span className="text-xs font-bold tracking-[2px] uppercase" style={{ color: "#94A3B8" }}>
                  Language
                </span>
                <button
                  onClick={() => { toggleLang(); setMobileOpen(false); }}
                  className="relative flex items-center rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(21, 128, 61,0.07)",
                    border: "1px solid rgba(21, 128, 61,0.18)",
                    padding: "2px",
                  }}
                >
                  {["EN", "AR"].map((l) => (
                    <span
                      key={l}
                      className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest transition-all duration-300"
                      style={{
                        background: (lang === "en" ? "EN" : "AR") === l ? "linear-gradient(135deg,#15803D,#22A559)" : "transparent",
                        color: (lang === "en" ? "EN" : "AR") === l ? "#fff" : "#22A559",
                      }}
                    >
                      {l}
                    </span>
                  ))}
                </button>
              </div>

              <Link
                href={getHref("contact")}
                onClick={() => setMobileOpen(false)}
                className="mt-3 text-center py-3 rounded-full text-white text-xs font-bold tracking-wider uppercase"
                style={{
                  background: "linear-gradient(135deg, #15803D, #22A559)",
                  boxShadow: "0 4px 16px rgba(21, 128, 61,0.25)",
                }}
              >
                {T?.nav.startProject}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
