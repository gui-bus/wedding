"use client";


import { weddingConfig } from "@/config/wedding.config";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { couple } = weddingConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#F1F1F1] text-[#3D2501] py-20 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[#3D2501]/15 text-center relative overflow-hidden">
      <div className="w-full space-y-10">
        <div className="space-y-3">
          <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#80654E] block">
            {couple.hashtag}
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-light tracking-tight leading-none text-[#3D2501]">
            <span>{couple.partner1}</span>
            <span className="font-serif italic font-light text-[#80654E] px-4">&amp;</span>
            <span>{couple.partner2}</span>
          </h2>
        </div>

        <p className="text-[#80654E] text-sm sm:text-base font-light leading-relaxed">
          Agradecemos por caminhar conosco e fazer parte da celebração mais importante de nossas vidas. Nos vemos no altar!
        </p>

        <div className="w-16 h-px bg-[#3D2501]/20 mx-auto" />

        <div className="pt-2">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#3D2501] hover:text-[#80654E] border border-[#3D2501]/20 hover:border-[#80654E] px-8 py-3.5 rounded-full transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#80654E]" />
            <span>Voltar ao Início</span>
          </button>
        </div>

        <p className="text-[11px] font-mono uppercase tracking-widest text-[#80654E] pt-8">
          QUINTAL E CIA &bull; 29 DE MAIO DE 2027 &bull; 11h30
        </p>
      </div>
    </footer>
  );
}
