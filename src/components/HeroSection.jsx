"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

/* ── CountUp hook ── */
function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(1);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const run = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // linear progress — gives a clear "counting" feel from 1 → target
      const value = Math.round(1 + (target - 1) * t);
      setCount(value);
      if (t < 1) raf = requestAnimationFrame(run);
      else setCount(target);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return [count, ref];
}

/* ── Animated stat item ── */
function StatItem({ target, suffix = "", label, delay }) {
  const [count, ref] = useCountUp(target, 1600);
  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.65 }}
        className="font-black text-gradient"
        style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}
      >
        {count}{suffix}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.5 }}
        className="mt-1.5 font-semibold uppercase tracking-[2.5px]"
        style={{ fontSize: "9px", color: "#94A3B8" }}
      >
        {label}
      </motion.div>
    </div>
  );
}

const STATS_BASE = [
  { target: 20, suffix: "+", delay: 1.0 },
  { target: 8,  suffix: "+", delay: 1.1 },
  { target: 6,  suffix: "",  delay: 1.2 },
  { target: 4,  suffix: "+", delay: 1.3 },
];

/* ── Floating geometric shapes ── */
const SHAPES = [
  { size: 420, top: "-18%", left: "-10%", color: "rgba(21, 128, 61,0.12)", delay: 0 },
  { size: 320, top: "55%",  right: "-8%", color: "rgba(122, 155, 118,0.09)", delay: 3 },
  { size: 200, top: "15%",  right: "18%", color: "rgba(169, 143, 92,0.07)",  delay: 6 },
  { size: 140, top: "70%",  left: "12%",  color: "rgba(21, 128, 61,0.07)", delay: 9 },
];

export default function HeroSection() {
  const { T } = useLang();
  const STATS = STATS_BASE.map((s, i) => ({ ...s, label: T.hero.stats[i] }));
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, #FFFFFF 0%, #FAF5FF 40%, #F3E8FF 70%, #E6F4EA 100%)",
      }}
    >
      {/* ── Radial highlight behind text ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "900px", height: "600px",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(21, 128, 61,0.07) 0%, transparent 65%)",
        }}
      />

      {/* ── Animated soft orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="orb-a absolute rounded-full"
          style={{
            width: "500px", height: "500px",
            top: "-180px", left: "-120px",
            background:
              "radial-gradient(circle, rgba(21, 128, 61,0.14), rgba(21, 128, 61,0.02))",
            filter: "blur(70px)",
          }}
        />
        <div
          className="orb-b absolute rounded-full"
          style={{
            width: "420px", height: "420px",
            bottom: "-140px", right: "-100px",
            background:
              "radial-gradient(circle, rgba(122, 155, 118,0.12), rgba(122, 155, 118,0.02))",
            filter: "blur(70px)",
          }}
        />
        <div
          className="pulse-glow absolute rounded-full"
          style={{
            width: "280px", height: "280px",
            top: "30%", right: "12%",
            background:
              "radial-gradient(circle, rgba(169, 143, 92,0.09), transparent)",
            filter: "blur(55px)",
          }}
        />
      </div>

      {/* ── Floating circle rings (decorative geometry) ── */}
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 1.2, ease: "easeOut" }}
          style={{
            width: s.size,
            height: s.size,
            top: s.top,
            left: s.left,
            right: s.right,
            border: `1.5px solid ${s.color}`,
          }}
        />
      ))}

      {/* ── Fine dot grid ── */}
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-60" />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-24 text-center">

        {/* Pill label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="flex justify-center mb-8"
        >
          <span className="label-pill">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22A559", boxShadow: "0 0 8px rgba(34, 165, 89,0.7)" }}
            />
            {T.hero.pill}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-bold leading-[1.04] tracking-tight mb-6"
          style={{
            fontSize: "clamp(2.8rem, 7.5vw, 6rem)",
            color: "#0F172A",
          }}
        >
          {T.hero.h1_1}
          <br />
          <span className="text-gradient">{T.hero.h1_2}</span>
          <br />
          {T.hero.h1_3}
        </motion.h1>

        {/* Typewriter description line */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            color: "#64748B",
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            textTransform: "none",
          }}
        >
          {T.hero.desc}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-28"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide uppercase hover:opacity-90 hover:scale-[1.04] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #15803D, #22A559)",
              boxShadow:
                "0 10px 36px rgba(21, 128, 61,0.32), 0 2px 8px rgba(21, 128, 61,0.18)",
            }}
          >
            {T.hero.cta1}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link
            href="#work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:scale-[1.04]"
            style={{
              background: "rgba(21, 128, 61,0.05)",
              border: "1px solid rgba(21, 128, 61,0.2)",
              color: "#15803D",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(21, 128, 61,0.1)";
              e.currentTarget.style.borderColor = "rgba(21, 128, 61,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(21, 128, 61,0.05)";
              e.currentTarget.style.borderColor = "rgba(21, 128, 61,0.2)";
            }}
          >
            {T.hero.cta2}
          </Link>
        </motion.div>

        {/* Stats row — counter animation */}
        <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap">
          {STATS.map((s, i) => (
            <StatItem
              key={i}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              delay={s.delay}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span
          className="font-semibold uppercase tracking-[3px]"
          style={{ fontSize: "9px", color: "#94A3B8" }}
        >
          {T.hero.scroll}
        </span>
        <div
          className="w-px h-10 float-y"
          style={{ background: "linear-gradient(to bottom, #22A559, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
