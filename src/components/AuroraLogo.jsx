import Image from "next/image";

export default function AuroraLogo({ variant = "light", size = 36, showText = true }) {
  return (
    <div style={{ width: size * 4.5, height: size * 1.5, position: "relative", overflow: "hidden", flexShrink: 0 }}>
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
