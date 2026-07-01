/*
  SectionDivider — lightweight gradient transition between sections.
  Props:
    from  : CSS color for the top  (default "#FFFFFF")
    to    : CSS color for the bottom (default "#FAF8F3")
    accent: show centre dot decoration (default true)
*/
export default function SectionDivider({ from = "#FFFFFF", to = "#FAF8F3", accent = true }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "32px", background: `linear-gradient(to bottom, ${from}, ${to})` }}
    >
      {accent && (
        <div className="relative flex items-center justify-center">
          {/* horizontal gradient line */}
          <div
            className="absolute"
            style={{
              left: "-80px", right: "-80px", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(21, 128, 61,0.18), transparent)",
            }}
          />
          {/* centre dot */}
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center bg-white z-10"
            style={{ border: "1px solid rgba(21, 128, 61,0.15)", boxShadow: "0 0 12px rgba(21, 128, 61,0.08)" }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(21, 128, 61,0.3)" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
