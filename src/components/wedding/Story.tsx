"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { ArrowUpRight } from "lucide-react";

export function Story() {
  const story = weddingConfig.couple.story;
  const { couple } = weddingConfig;
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  if (!story || !story.enabled) return null;

  const chapters = [
    { index: "01", year: "2016", subtitle: "O Encontro", title: "Nossos Caminhos se Encontraram", text: story.text[0] },
    { index: "02", year: "Desde então", subtitle: "A Construção", title: "Uma Vida Lado a Lado", text: story.text[1] },
    { index: "03", year: "2027", subtitle: "O Nosso Sim", title: "O Nosso Para Sempre", text: story.text[2] },
  ];

  return (
    <section
      ref={sectionRef}
      id="historia"
      className="w-full py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F1F1F1] text-[#1A1715]"
    >
      <div className="w-full space-y-24 sm:space-y-32">
        {/* Cabeçalho Editorial — Tipografia Pura */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#1A1715]/15 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#8C6D46] block">
              [ 01 &bull; NOSSA HISTÓRIA ]
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]">
              Como Tudo Começou
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#73685B] font-light max-w-md leading-relaxed">
            Uma narrativa construída dia após dia com afeto, risadas e a certeza de um amor maduro.
          </p>
        </div>

        {/* Spread Principal: Foto Editorial + Citação & Texto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Lado Esquerdo: Fotografia Editorial com Parallax */}
          <div className="lg:col-span-5 relative overflow-hidden group">
            {story.image && (
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#EFE8DD]">
                <motion.img
                  style={{ y: imgY }}
                  src={story.image}
                  alt="Alianças sobre conchas e areia — imagem ilustrativa"
                  className="w-full h-[120%] object-cover object-center will-change-transform grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase block text-[#F0DEB4]">
                    SÃO JOSÉ DOS CAMPOS &bull; 2027
                  </span>
                  <p className="font-serif text-2xl font-light">
                    {couple.partner1} & {couple.partner2}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Lado Direito: Declaração Editorial & Parágrafos */}
          <div className="lg:col-span-7 space-y-12 lg:pl-6">
            <blockquote className="font-serif italic text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1715] leading-[1.1] tracking-tight">
              &ldquo;Do primeiro encontro ao nosso grande ‘sim’.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm sm:text-base font-light text-[#59524B] leading-relaxed border-t border-[#1A1715]/15 pt-8">
              {story.text.map((paragraph, idx) => (
                <p key={idx} className="space-y-2">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#1A1715]/15 text-xs text-[#8C6D46] font-mono uppercase tracking-[0.25em]">
              <span>Capítulo I a III</span>
              <span>2016 &mdash; 2027</span>
            </div>
          </div>
        </div>

        {/* Linha do Tempo Editorial — Lista Horizontal Tipográfica (Sem Cards!) */}
        <div className="space-y-12">
          <div className="border-t border-[#1A1715]/20 pt-6 flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#8C6D46]">
              A Cronologia do Nosso Amor
            </span>
            <span className="text-[11px] font-mono text-[#8C8276] tracking-widest">
              [ 03 MARCOS ]
            </span>
          </div>

          <div className="divide-y divide-[#1A1715]/15">
            {chapters.map((chap) => (
              <motion.div
                key={chap.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="py-10 sm:py-14 group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline hover:bg-black/[0.015] transition-colors"
              >
                {/* Índice e Ano */}
                <div className="lg:col-span-3 flex items-baseline gap-4">
                  <span className="font-mono text-sm sm:text-base text-[#8C6D46] font-medium">
                    {chap.index}
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[#1A1715]">
                    {chap.year}
                  </span>
                </div>

                {/* Título & Subtítulo */}
                <div className="lg:col-span-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C8276] block">
                    {chap.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#1A1715] group-hover:text-[#8C6D46] transition-colors">
                    {chap.title}
                  </h3>
                </div>

                {/* Texto */}
                <div className="lg:col-span-5 flex items-start justify-between gap-6">
                  <p className="text-sm sm:text-base font-light text-[#59524B] leading-relaxed">
                    {chap.text}
                  </p>
                  <ArrowUpRight className="w-5 h-5 text-[#8C6D46] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
