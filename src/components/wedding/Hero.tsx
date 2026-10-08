"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { weddingConfig } from "@/config/wedding.config";
import { formatDateBR } from "@/lib/utils";
import { Countdown } from "./Countdown";
import { Navbar } from "./Navbar";

export function Hero() {
  const { couple } = weddingConfig;
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title-part", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".hero-meta-item", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative w-full overflow-hidden flex flex-col justify-between bg-[#0D0A08] pt-28 sm:pt-36 pb-20 sm:pb-28 px-6 sm:px-12 lg:px-20 text-white"
    >
      {/* Background com parallax */}
      <motion.div
        style={{
          backgroundImage: `url('${couple.coverImage}')`,
          y: yBg,
          scale: scaleBg,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat origin-center will-change-transform"
      />

      {/* Overlay multicamada escuro e refinado */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D2501]/90 via-[#3D2501]/60 to-[#231500]" />

      {/* Navbar estática */}
      <Navbar />

      {/* Conteúdo Principal — Tipografia Editorial Monumental */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full my-auto py-12 flex flex-col items-center text-center space-y-10"
      >
        {/* Tag Superior */}
        <div className="hero-meta-item flex items-center gap-4">
          <span className="w-12 h-px bg-[#C7B79D]/60" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-[#C7B79D] font-medium">
            Celebração de Casamento &bull; 2027
          </span>
          <span className="w-12 h-px bg-[#C7B79D]/60" />
        </div>

        {/* Nomes dos Noivos em Escala Monumental */}
        <div ref={headlineRef} className="space-y-1 sm:space-y-2">
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-light tracking-tight leading-[0.88] select-none text-[#F5F5DA]">
            <span className="hero-title-part inline-block">{couple.partner1}</span>
            <span className="hero-title-part inline-block font-serif italic text-[#C7B79D] font-light mx-4 sm:mx-8">
              &amp;
            </span>
            <span className="hero-title-part inline-block">{couple.partner2}</span>
          </h1>
        </div>

        {/* Frase / Subtítulo */}
        {couple.headline && (
          <p className="hero-meta-item font-serif italic text-lg sm:text-2xl md:text-3xl font-light text-[#F5F5DA]/90 leading-relaxed px-4">
            &ldquo;{couple.headline}&rdquo;
          </p>
        )}

        {/* Linha Divisória Hairline */}
        <div className="hero-meta-item w-full h-px bg-gradient-to-r from-transparent via-[#C7B79D]/40 to-transparent" />

        {/* Metadata: Data, Local e Horário */}
        <div
          ref={sublineRef}
          className="hero-meta-item flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#C7B79D]"
        >
          <span>{formatDateBR(couple.weddingDate)}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5D613C]" />
          <span>{couple.locationSummary}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5D613C]" />
          <span>11h30</span>
        </div>

        {/* Typographic Countdown */}
        <div className="hero-meta-item pt-4 w-full">
          <Countdown targetDateISO={couple.weddingDate} />
        </div>

        {/* Botões Minimalistas de Ação */}
        <div className="hero-meta-item flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 w-full max-w-md">
          <a
            href="#rsvp"
            className="w-full sm:w-auto flex-1 text-center py-4 px-8 text-xs font-mono uppercase tracking-[0.25em] font-medium bg-[#C7B79D] text-[#3D2501] hover:bg-[#F1F1F1] transition-colors duration-300 rounded-full"
          >
            Confirmar Presença
          </a>
          <a
            href="#presentes"
            className="w-full sm:w-auto flex-1 text-center py-4 px-8 text-xs font-mono uppercase tracking-[0.25em] font-medium border border-[#C7B79D]/50 text-[#F5F5DA] hover:border-[#F5F5DA] hover:text-white transition-colors duration-300 rounded-full"
          >
            Lista de Presentes
          </a>
        </div>
      </motion.div>
    </section>
  );
}
