import Image from "next/image";

export default function AuroraLogo({ variant = "light", size = 36, showText = true, className = "" }) {
  const boxStyle = { position: "relative", overflow: "hidden", flexShrink: 0 };
  if (!className) {
    boxStyle.width = size * 4.5;
    boxStyle.height = size * 1.5;
  }
  return (
    <div className={className} style={boxStyle}>
      <Image
        src="/logo/aurora.png"
        alt="Aurora Software House"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 50%" }}
      />
    </div>
  );
}
