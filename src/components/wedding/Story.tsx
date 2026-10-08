"use client";
import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
export function Story() {
  const story = weddingConfig.couple.story;
  if (!story?.enabled) return null;
  return <section id="historia" className="py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F1F1F1] text-[#3D2501]">
    <div className="border-b border-[#3D2501]/15 pb-8 mb-16">
      <p className="font-mono text-xs tracking-[0.3em] text-[#80654E] mb-4">[ 01 • NOSSA HISTÓRIA ]</p>
      <h2 className="font-serif text-5xl sm:text-7xl font-light">Do primeiro encontro<br /><em>ao nosso grande ‘sim’.</em></h2>
    </div>
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={story.image} alt="Alianças sobre conchas e areia, imagem ilustrativa" className="w-full aspect-[4/5] object-cover arch-frame" />
        <p className="font-mono text-[10px] tracking-widest text-[#80654E] mt-4">UM SÍMBOLO DO NOSSO PARA SEMPRE • IMAGEM ILUSTRATIVA</p>
      </div>
      <div className="space-y-8">
        <span className="font-serif italic text-6xl text-[#5D613C]">Desde 2016</span>
        {story.text.map((text, i) => <motion.p key={i} initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-base sm:text-lg leading-relaxed text-[#80654E]">{text}</motion.p>)}
        <p className="font-serif italic text-3xl border-t border-[#C7B79D] pt-8">Giovanna &amp; Edson</p>
      </div>
    </div>
  </section>;
}