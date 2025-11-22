
"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MotionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }} // حركة انسيابية جدًا
    >
      {children}
    </motion.main>
  );
}
