"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ourworkData } from "@/data/ourworkdata";
import Image from "next/image";
import ProjectModal from "@/components/ProjectModal";
import { useLang } from "@/context/LangContext";

/* ── Lightweight tilt helper (inline, no extra component) ── */
function useTilt() {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(4px)`;
    el.style.boxShadow = `${-x * 10}px ${-y * 10}px 30px rgba(21, 128, 61,0.11), 0 4px 20px rgba(21, 128, 61,0.07)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  }, []);

  return { ref, onMove, onLeave };
}

const FILTER_VALUES = ["all", "website", "application", "design"];

export default function WorkSection() {
  const { T } = useLang();
  const FILTERS = FILTER_VALUES.map((v) => ({ value: v, label: T.work.filters[v] }));
  const [active,  setActive]  = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = active === "all"
    ? ourworkData
    : ourworkData.filter((p) => p.category === active);

  return (
    <section
      id="work"
      className="py-16 px-6 scroll-mt-16 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <span className="label-pill mb-5 inline-flex">{T.work.pill}</span>
            <h2
              className="font-bold mt-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#0F172A" }}
            >
              {T.work.h2_1}
              <span className="text-gradient-warm"> {T.work.h2_2}</span>
            </h2>
          </div>
          <p
            className="max-w-sm leading-relaxed md:text-right"
            style={{ color: "#64748B", textTransform: "none", fontSize: "0.95rem" }}
          >
            {T.work.desc}
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className="px-5 py-2 rounded-full text-xs font-bold tracking-[2px] uppercase transition-all duration-300"
              style={{
                background: active === f.value
                  ? "linear-gradient(135deg, #15803D, #22A559)"
                  : "rgba(21, 128, 61,0.05)",
                color: active === f.value ? "#fff" : "#64748B",
                border: `1px solid ${active === f.value ? "transparent" : "rgba(21, 128, 61,0.15)"}`,
                boxShadow: active === f.value ? "0 4px 16px rgba(21, 128, 61,0.25)" : "none",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} i={i} onOpen={() => setSelected(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ── Individual card with tilt ── */
function ProjectCard({ project, i, onOpen }) {
  const { ref, onMove, onLeave } = useTilt();
  const { T } = useLang();
  return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="h-full"
              >
              <div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                onClick={onOpen}
                className="group card overflow-hidden cursor-pointer flex flex-col h-full"
                style={{
                  borderRadius: "16px",
                  transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  willChange: "transform",
                }}
              >
                {/* Image — blurred backdrop fills white-bg mockups */}
                <div className="relative w-full h-64 overflow-hidden">
                  {(project.coverImage || project.subImages?.[0]) ? (
                    <>
                      {/* Blurred bg layer */}
                      <Image
                        src={project.coverImage || project.subImages[0]}
                        alt=""
                        fill
                        aria-hidden="true"
                        className="object-cover scale-125 transition-transform duration-700 group-hover:scale-[1.35]"
                        style={{ filter: "blur(22px) brightness(0.45) saturate(1.3)" }}
                      />
                      {/* Sharp foreground */}
                      <Image
                        src={project.coverImage || project.subImages[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </>
                  ) : (
                    /* No image yet — gradient placeholder */
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                      style={{ background: "linear-gradient(135deg, #E6F4EA 0%, #EAF3EC 50%, #FAF5FF 100%)" }}
                    >
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect width="36" height="36" rx="10" fill="rgba(21, 128, 61,0.1)"/>
                        <path d="M10 26l5-6 4 5 3-4 4 5" stroke="#22A559" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="13" cy="15" r="2.5" stroke="#22A559" strokeWidth="1.8"/>
                      </svg>
                      <span style={{ fontSize: "10px", color: "#9f7aea", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                        {T.work.noImage}
                      </span>
                    </div>
                  )}
                  {/* overlay on hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(to top, rgba(21, 128, 61,0.65) 0%, transparent 55%)",
                    }}
                  />
                  {/* Category badge */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      backdropFilter: "blur(10px)",
                      fontSize: "9px",
                      fontWeight: "700",
                      letterSpacing: "2px",
                      color: "#15803D",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </div>
                  {/* Demo link on hover */}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      style={{
                        background: "#fff",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M1 12L12 1M12 1H5M12 1V8" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="font-bold mb-1"
                    style={{ fontSize: "0.95rem", color: "#0F172A" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="leading-relaxed text-xs mb-4"
                    style={{ color: "#64748B", textTransform: "none" }}
                  >
                    {project.description}
                  </p>

                  {/* Tech tags — all shown */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[9px] font-semibold tracking-wide"
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
              </div>
            </motion.div>
  );
}
