"use client";
import { motion } from "framer-motion";
import {
  Globe, Smartphone, Palette, Code2,
  ShoppingCart, LayoutDashboard, Shield, Zap,
} from "lucide-react";
import { useLang } from "@/context/LangContext";

const ICONS  = [Globe, Smartphone, Palette, Code2, ShoppingCart, LayoutDashboard, Shield, Zap];
const COLORS = ["#15803D","#22A559","#2F9E52","#5CB176","#7A9B76","#A98F5C","#0E9F6E","#B4805A"];

export default function ServicesSection() {
  const { T } = useLang();
  const SERVICES = T.services.items.map((item, i) => ({
    ...item, icon: ICONS[i], color: COLORS[i],
  }));
  return (
    <section
      id="services"
      className="py-16 px-6 scroll-mt-16 relative overflow-hidden"
      style={{ background: "#FAF8F3" }}
    >
      {/* bg accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px", height: "700px",
          top: "50%", left: "50%",
          marginTop: "-350px", marginLeft: "-350px",
          background: "radial-gradient(circle, rgba(21, 128, 61,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="label-pill mb-6 inline-flex">{T.services.pill}</span>
          <h2
            className="font-bold mt-6 mb-5 leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", color: "#0F172A" }}
          >
            {T.services.h2_1}
            <span className="text-gradient-warm"> {T.services.h2_2}</span>
          </h2>
          <p
            className="max-w-xl mx-auto leading-relaxed"
            style={{ color: "#64748B", fontSize: "1.05rem", textTransform: "none" }}
          >
            {T.services.desc}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="divider-line mb-16" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className="card p-6 cursor-default group"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${svc.color}12`,
                  transition: "background 0.3s",
                }}
              >
                <svc.icon
                  className="w-5 h-5"
                  style={{ color: svc.color }}
                  strokeWidth={1.75}
                />
              </div>

              <h3
                className="font-bold mb-2 text-sm uppercase tracking-wide"
                style={{ color: "#0F172A", letterSpacing: "0.04em" }}
              >
                {svc.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#64748B", textTransform: "none" }}
              >
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-sm tracking-widest uppercase hover:opacity-90 hover:scale-[1.03] transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #15803D, #22A559)",
              boxShadow: "0 8px 32px rgba(21, 128, 61,0.25)",
            }}
          >
            {T.services.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
