"use client";
import { motion } from "framer-motion";
import { Search, Pencil, Code2, CheckCircle, Rocket } from "lucide-react";
import { useLang } from "@/context/LangContext";

const STEP_META = [
  { icon: Search,      number: "01", color: "#A98F5C", bgColor: "#F7F1E3" },
  { icon: Pencil,      number: "02", color: "#22A559", bgColor: "#E6F4EA" },
  { icon: Code2,       number: "03", color: "#15803D", bgColor: "#EAF3EC" },
  { icon: CheckCircle, number: "04", color: "#7A9B76", bgColor: "#F1F5EF" },
  { icon: Rocket,      number: "05", color: "#059669", bgColor: "#ECFDF5" },
];

export default function ProcessSection() {
  const { T } = useLang();
  const STEPS = STEP_META.map((m, i) => ({ ...m, ...T.process.steps[i] }));
  return (
    <section
      id="process"
      className="py-16 px-6 scroll-mt-16 relative overflow-hidden"
      style={{ background: "#FAF8F3" }}
    >
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="label-pill mb-6 inline-flex">{T.process.pill}</span>
          <h2
            className="font-bold mt-6 mb-5 leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", color: "#0F172A" }}
          >
            {T.process.h2_1}
            <span className="text-gradient-warm"> {T.process.h2_2}</span>
          </h2>
          <p
            className="max-w-lg mx-auto leading-relaxed"
            style={{ color: "#64748B", textTransform: "none", fontSize: "1rem" }}
          >
            {T.process.desc}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="card p-7 flex items-start gap-6 relative overflow-hidden group"
            >
              {/* Number + Icon */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: step.bgColor }}
                >
                  <step.icon
                    className="w-6 h-6"
                    style={{ color: step.color }}
                    strokeWidth={1.75}
                  />
                </div>
                <span
                  className="text-xs font-black tracking-[2px]"
                  style={{ color: step.color }}
                >
                  {step.number}
                </span>
              </div>

              {/* Text */}
              <div className="pt-1">
                <h3
                  className="font-bold text-lg mb-2 uppercase tracking-wide"
                  style={{ color: "#0F172A", fontSize: "1rem" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#64748B", textTransform: "none" }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Accent line on left */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: `linear-gradient(to bottom, ${step.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
