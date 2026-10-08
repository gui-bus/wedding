"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function CinematicTransition() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const dateScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.88, 1, 1.04]);
  const dateY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return <section ref={section} aria-label="O nosso para sempre, 29 de maio de 2027" className="cinema-transition relative overflow-hidden bg-[#5D613C] text-[#F1F1F1] px-6 sm:px-12 lg:px-20 py-24 sm:py-36 text-center">
    <motion.div aria-hidden="true" style={reduced ? undefined : { x: glowX }} className="cinema-glow absolute inset-0 pointer-events-none" />
    <div aria-hidden="true" className="cinema-orbit cinema-orbit-one" />
    <div aria-hidden="true" className="cinema-orbit cinema-orbit-two" />
    <div className="relative z-10 space-y-9 sm:space-y-12">
      <p data-cinema-copy className="cinema-eyebrow text-[#C7B79D]">O capítulo mais bonito está por vir</p>
      <h2 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight">O nosso para sempre.</h2>
      <motion.p style={reduced ? undefined : { scale: dateScale, y: dateY }} className="font-serif text-[clamp(3.3rem,10vw,10rem)] font-light tracking-[-0.035em] leading-[1.1] py-3 sm:py-8">29.05.2027</motion.p>
      <p data-cinema-copy className="font-serif text-xl sm:text-2xl font-light text-[#F1F1F1]/80">E queremos viver esse momento com você.</p>
    </div>
  </section>;
}