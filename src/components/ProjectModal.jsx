"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProjectModal({ project, onClose }) {
  const [slide, setSlide] = useState(0);
  const images = project.subImages || [];

  /* close on ESC */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const prev = useCallback(() => setSlide((s) => (s - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setSlide((s) => (s + 1) % images.length), [images.length]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(10px)" }}
        onClick={onClose}
      >
        {/* Modal panel — fixed height, only right panel scrolls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
            height: "min(88vh, 700px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ background: "rgba(21, 128, 61,0.08)", color: "#15803D" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(21, 128, 61,0.18)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(21, 128, 61,0.08)"}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="flex flex-col lg:flex-row h-full">
            {/* ── Left: image gallery ── */}
            <div className="lg:w-[55%] flex-shrink-0 flex flex-col min-h-0">
              {/* Main image — fills remaining height */}
              <div className="relative flex-1 overflow-hidden rounded-tl-2xl rounded-tr-2xl lg:rounded-tr-none lg:rounded-bl-2xl bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {/* Blurred bg — fills empty space around any aspect ratio */}
                    <Image
                      src={images[slide]}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-cover scale-110"
                      style={{ filter: "blur(28px) brightness(0.4) saturate(1.4)" }}
                    />
                    {/* Sharp foreground — full image, never cropped */}
                    <Image
                      src={images[slide]}
                      alt={`${project.title} screen ${slide + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M5 2l5 5-5 5" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </>
                )}

                {/* Slide counter */}
                <div
                  className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(6px)" }}
                >
                  {slide + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className="flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden transition-all duration-200"
                      style={{
                        border: i === slide ? "2px solid #22A559" : "2px solid transparent",
                        opacity: i === slide ? 1 : 0.55,
                      }}
                    >
                      <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: project details — scrolls independently ── */}
            <div className="flex-1 min-h-0 p-6 lg:p-8 overflow-y-auto">
              {/* Category + time */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[2px] uppercase"
                  style={{ background: "rgba(21, 128, 61,0.08)", color: "#15803D" }}
                >
                  {project.category}
                </span>
                {project.time && (
                  <span
                    className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[2px] uppercase"
                    style={{ background: "rgba(169, 143, 92,0.08)", color: "#A98F5C" }}
                  >
                    {project.time}
                  </span>
                )}
                {project.members && (
                  <span
                    className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[2px] uppercase"
                    style={{ background: "rgba(122, 155, 118,0.08)", color: "#7A9B76" }}
                  >
                    {project.members} members
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                className="font-black mb-3 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#0F172A" }}
              >
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748B", textTransform: "none" }}>
                {project.description}
              </p>

              {/* Problem / Solution */}
              {project.problem && (
                <div className="mb-4">
                  <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1.5" style={{ color: "#94A3B8" }}>Problem</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#475569", textTransform: "none" }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="mb-6">
                  <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1.5" style={{ color: "#94A3B8" }}>Solution</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#475569", textTransform: "none" }}>{project.solution}</p>
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures?.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "#94A3B8" }}>Key Features</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.keyFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span style={{ color: "#22A559", fontSize: "13px" }}>{f.icon}</span>
                        <span className="text-xs font-medium" style={{ color: "#374151", textTransform: "none" }}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {project.technologies?.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "#94A3B8" }}>Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold"
                        style={{
                          background: "rgba(21, 128, 61,0.07)",
                          color: "#15803D",
                          border: "1px solid rgba(21, 128, 61,0.15)",
                          textTransform: "none",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Demo link */}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
                  style={{
                    background: "linear-gradient(135deg, #15803D, #22A559)",
                    boxShadow: "0 6px 24px rgba(21, 128, 61,0.28)",
                  }}
                >
                  View Live Demo
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H5M11 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
