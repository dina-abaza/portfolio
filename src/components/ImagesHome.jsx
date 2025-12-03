"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImagesHome() {
const images = [
"/posterhome1.png",
"/posterhome2.png",
"/posterhome3.png",
"/posterhome4.png",
];

const animations = [
{
initial: { opacity: 0, scale: 1.1, x: 60 },
animate: { opacity: 1, scale: 1, x: 0 },
exit: { opacity: 0, scale: 0.95, x: -60 },
},
{
initial: { rotateY: 90, opacity: 0 },
animate: { rotateY: 0, opacity: 1 },
exit: { rotateY: -90, opacity: 0 },
},
{
initial: {
clipPath: "inset(0 50% 0 50%)",
WebkitClipPath: "inset(0 50% 0 50%)",
opacity: 0
},
animate: {
clipPath: "inset(0 0% 0 0%)",
WebkitClipPath: "inset(0 0% 0 0%)",
opacity: 1
},
exit: {
clipPath: "inset(0 50% 0 50%)",
WebkitClipPath: "inset(0 50% 0 50%)",
opacity: 0
},
},
];

const [index, setIndex] = useState(0);
const [animIndex, setAnimIndex] = useState(0);

useEffect(() => {
const timer = setInterval(() => {
setIndex((prev) => (prev + 1) % images.length);
setAnimIndex(Math.floor(Math.random() * animations.length));
}, 4000);

return () => clearInterval(timer);
}, [images.length]);

const currentAnimation = animations[animIndex];

return (
<section className="relative w-full mx-auto h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[100vh] overflow-hidden bg-black">
<div className="relative w-full h-full perspective-[1200px]">
<AnimatePresence mode="sync">
<motion.div
key={images[index]}
initial={currentAnimation.initial}
animate={currentAnimation.animate}
exit={currentAnimation.exit}
transition={{ duration: 1.5, ease: [0.45, 0, 0.55, 1] }}
className="absolute inset-0"
>
<Image
src={images[index]}
alt={`Slide ${index + 1}`}
fill
className="object-fill" 
priority
/>


</motion.div>
</AnimatePresence>
</div>
</section>

);
}