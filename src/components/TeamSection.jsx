"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

const TEAM = [
  {
    name: "Raghda Helmy",
    role: "Backend Developer",
    image: "/team_photos/Ellipse 8-1.webp",
    objectFit: "cover",
  },
  {
    name: "Dina Abaza",
    role: "Frontend Developer",
    image: "/team_photos/WhatsApp Image 2025-10-23 at 18.01.30_f7cf8215.webp",
    objectFit: "cover",
    objectPosition: "center top",
  },
  {
    name: "Yussef Taie",
    role: "Software Developer",
    image: "/team_photos/Ellipse 8-4.webp",
    objectFit: "cover",
  },
  {
    name: "Ramadan Mahdy",
    role: "Full Stack Developer",
    image: "/team_photos/Ellipse 8-3.webp",
    objectFit: "cover",
  },
  {
    name: "Ahmed Saber",
    role: "UI/UX Designer",
    image: "/team_photos/Ellipse 8-2.webp",
    objectFit: "cover",
    objectPosition: "center 35%",
  },
];


export default function TeamSection() {
  const { T } = useLang();
  const VALUES = T.team.values;
  return (
    <section
      id="about"
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
          className="text-center mb-6"
        >
          <span className="label-pill mb-6 inline-flex">{T.team.pill}</span>
          <h2
            className="font-bold mt-6 mb-5 leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", color: "#0F172A" }}
          >
            {T.team.h2_1}
            <span className="text-gradient-warm"> {T.team.h2_2}</span>
          </h2>
          <p
            className="max-w-lg mx-auto leading-relaxed"
            style={{ color: "#64748B", textTransform: "none", fontSize: "1rem" }}
          >
            {T.team.desc}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="divider-line my-14" />

        {/* Team grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="flex flex-col items-center gap-4 group"
            >
              {/* Avatar with gradient ring */}
              <div
                className="p-[3px] rounded-full"
                style={{
                  background: "linear-gradient(135deg, #15803D, #7A9B76, #A98F5C)",
                  boxShadow: "0 8px 32px rgba(21, 128, 61,0.18)",
                  transition: "box-shadow 0.35s ease",
                }}
              >
                <div
                  className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden relative"
                  style={{ background: member.bg || "#E6F4EA" }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="transition-transform duration-500 group-hover:scale-105"
                    style={{
                      objectFit: member.objectFit || "cover",
                      objectPosition: member.objectPosition || "center",
                    }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <p
                  className="font-bold text-sm tracking-wide uppercase"
                  style={{ color: "#0F172A" }}
                >
                  {member.name}
                </p>
                <p
                  className="text-xs mt-1 tracking-[1.5px] uppercase font-semibold"
                  style={{ color: "#22A559" }}
                >
                  {T.team.roles[member.role] || member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Who we are blurb */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.65 }}
          className="mt-20 max-w-3xl mx-auto text-center card p-10"
        >
          <p
            className="text-base leading-[1.9]"
            style={{ color: "#475569", textTransform: "none" }}
          >
            {T.team.blurb}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {VALUES.map((v) => (
              <span
                key={v}
                className="px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(21, 128, 61,0.06)",
                  border: "1px solid rgba(21, 128, 61,0.2)",
                  color: "#15803D",
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
