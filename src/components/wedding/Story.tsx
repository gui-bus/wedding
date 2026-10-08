"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { CinematicWords } from "./CinematicExperience";

export function Story() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const story = weddingConfig.couple.story;
  if (!story?.enabled) return null;
  return <section ref={section} id="historia" className="cinematic-section bg-[#F1F1F1] text-[#3D2501] px-6 sm:px-12 lg:px-20 py-24 sm:py-36">
    <div className="space-y-16 sm:space-y-24">
      <p data-cinema-copy className="cinema-eyebrow text-[#80654E]">Nossa história <span className="mx-3 text-[#C7B79D]">/</span> Desde 2016</p>
      <CinematicWords text={story.title} className="font-serif font-light text-[clamp(3.1rem,7.5vw,8rem)] leading-[1.04] tracking-[-0.045em] max-w-5xl text-balance" />
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-7 space-y-8 sm:space-y-10">
          {story.text.map((paragraph, index) => <p key={index} data-cinema-copy className="font-sans text-base sm:text-xl font-light leading-[1.9] text-[#80654E] max-w-2xl">{paragraph}</p>)}
          <p data-cinema-copy className="font-serif italic text-3xl sm:text-4xl text-[#5D613C] pt-4">Uma vida. Muitos capítulos.<br />O mesmo amor.</p>
        </div>
        <div data-cinema-image className="lg:col-span-5 overflow-hidden rounded-[1.5rem] relative aspect-[4/5] bg-[#C7B79D]/20">
          <motion.img src={story.image} alt="Alianças sobre conchas e areia — imagem ilustrativa" style={reducedMotion ? undefined : { y: imageY }} className="w-full h-[112%] object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2501]/50 via-transparent to-transparent" />
          <span className="absolute bottom-8 left-8 text-[#F1F1F1] text-[10px] tracking-[0.25em] uppercase">Giovanna &amp; Edson · Para sempre</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 sm:gap-12 pt-10 sm:pt-16">
        {[
          { year: "2016", label: "Nossos caminhos se encontram" },
          { year: "Uma vida", label: "Construída lado a lado" },
          { year: "2027", label: "O nosso grande sim" },
        ].map(item => <div key={item.year} data-cinema-copy className="space-y-4">
          <p className="font-serif italic text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#5D613C]">{item.year}</p>
          <p className="text-[10px] sm:text-xs tracking-[0.16em] uppercase text-[#80654E] leading-relaxed">{item.label}</p>
        </div>)}
      </div>
    </div>
  </section>;
}