"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from 'next/image';
import gsap from "gsap";
import { weddingConfig } from "@/config/wedding.config";
import { formatDateBR } from "@/lib/utils";
import { Countdown } from "./Countdown";
import { Navbar } from "./Navbar";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const { couple } = weddingConfig;
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline.from(".hero-intro", { y: 16, opacity: 0, duration: 0.9 }, 0.15)
          .from(".hero-logo", { y: 30, scale: 0.94, opacity: 0, duration: 1.5 }, 0.3)
          .from(".hero-detail", { y: 22, opacity: 0, duration: 1, stagger: 0.1 }, 0.85);
      }, section);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return <section ref={section} id="inicio" className="relative w-full overflow-hidden bg-[#3D2501] px-6 sm:px-12 lg:px-20 pt-36 sm:pt-44 pb-10 sm:pb-14 text-[#F1F1F1]">
    <motion.div style={{ backgroundImage: `url('${couple.coverImage}')`, ...(reducedMotion ? {} : { y: imageY, scale: imageScale }) }} className="absolute inset-0 bg-cover bg-center origin-center" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#3D2501]/75 via-[#3D2501]/55 to-[#3D2501]/95" />
    <Navbar />
    <motion.div style={reducedMotion ? undefined : { y: contentY, opacity }} className="relative z-10 text-center flex flex-col items-center gap-9 sm:gap-12 py-10 sm:py-14">
      <p className="hero-intro cinema-eyebrow text-[#C7B79D]">Uma história de amor <span className="mx-3">·</span> 2027</p>
      <h1 className="hero-logo w-full max-w-2xl mx-auto">
        <Image src="/utils/logo_white.svg" alt={`${couple.partner1} e ${couple.partner2}`} width={1560} height={627} priority className="w-full h-auto" />
      </h1>
      <p className="hero-detail whitespace-pre-line font-serif italic text-xl sm:text-3xl font-light leading-relaxed max-w-3xl text-[#F1F1F1]/85">{couple.headline}</p>
      <div className="hero-detail flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-4 text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#C7B79D]">
        <span>{formatDateBR(couple.weddingDate)}</span><span>{couple.locationSummary}</span><span>11h30</span>
      </div>
      <div className="hero-detail py-3"><Countdown targetDateISO={couple.weddingDate} /></div>
      <div className="hero-detail flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
        <a href="#rsvp" className="cinema-button bg-[#C7B79D] text-[#3D2501] hover:bg-[#F1F1F1]">Confirmar presença</a>
        <a href="#presentes" className="cinema-button bg-white/10 text-[#F1F1F1] hover:bg-white/20 backdrop-blur-sm">Lista de presentes</a>
      </div>
    </motion.div>
    <a href="#historia" className="hero-detail relative z-10 flex flex-col items-center gap-3 mx-auto w-fit mt-4 text-[#C7B79D] group">
      <span className="text-[9px] uppercase tracking-[0.3em]">O próximo capítulo</span>
      <ArrowDown size={17} strokeWidth={1} className="transition-transform duration-500 group-hover:translate-y-1" />
    </a>
  </section>;
}