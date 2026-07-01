"use client";

/*
  TechMarquee — two-row infinite scroll, CSS-only animation (GPU-accelerated).
  Pauses on hover. No layout shift. Zero JS overhead.
*/

const ROW_1 = [
  "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS",
  "MongoDB", "Flutter", "Firebase", "Figma", "Express.js",
];
const ROW_2 = [
  "Redux", "PostgreSQL", "Stripe", "Android Studio", "Dart",
  "Framer Motion", "REST APIs", "Git & GitHub", "Vercel", "Zustand",
];

function Row({ items, direction, speed }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden w-full marquee-track"
      style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className={direction === "left" ? "marquee-left" : "marquee-right"}
        style={{
          display: "flex",
          gap: "0",
          width: "max-content",
          animationDuration: `${speed}s`,
        }}
      >
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-xs font-semibold uppercase tracking-[2px] select-none"
            style={{ color: "#94A3B8", whiteSpace: "nowrap" }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "rgba(21, 128, 61,0.4)" }}
            />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div
      className="py-10 relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(21, 128, 61,0.07)", borderBottom: "1px solid rgba(21, 128, 61,0.07)", background: "#FAFAFE" }}
    >
      <div className="flex flex-col gap-4">
        <Row items={ROW_1} direction="left"  speed={32} />
        <Row items={ROW_2} direction="right" speed={38} />
      </div>
    </div>
  );
}
