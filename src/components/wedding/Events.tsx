"use client";
import { weddingConfig } from "@/config/wedding.config";
import { generateGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import { Navigation, Calendar, Download, ExternalLink } from "lucide-react";
export function Events() {
  const { ceremony, couple } = weddingConfig;
  const event = { title: "Casamento Giovanna & Edson", description: ceremony.subtitle, location: ceremony.placeName + ", " + ceremony.address + ", " + ceremony.cityState, startDateISO: couple.weddingDate };
  const button = "inline-flex items-center gap-2 border border-[#C7B79D] rounded-full px-5 py-3 text-xs uppercase tracking-wider hover:bg-[#C7B79D] transition-colors";
  return <section id="eventos" className="py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F1F1F1] text-[#3D2501]">
    <p className="font-mono text-xs tracking-[0.3em] text-[#80654E] mb-4">[ 03 • O GRANDE DIA ]</p>
    <h2 className="font-serif text-5xl sm:text-7xl font-light mb-16">Cerimônia &amp; Recepção</h2>
    <div className="grid lg:grid-cols-2 gap-12 border-y border-[#C7B79D] py-12">
      <div className="space-y-6">
        <p className="text-xs font-mono tracking-[0.3em] text-[#5D613C]">29 DE MAIO DE 2027 • SÁBADO • 11h30</p>
        <h3 className="font-serif text-5xl sm:text-6xl">{ceremony.placeName}</h3>
        <p className="text-[#80654E] leading-relaxed">{ceremony.address}<br />{ceremony.cityState}</p>
        <p className="font-serif italic text-2xl">{ceremony.tips}</p>
        <div className="flex flex-wrap gap-3">
          <a href={ceremony.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={button}><Navigation size={15}/>Como chegar</a>
          <a href={ceremony.wazeUrl} target="_blank" rel="noopener noreferrer" className={button}>Waze</a>
          <a href="https://www.instagram.com/quintal_sjc/" target="_blank" rel="noopener noreferrer" className={button}><ExternalLink size={15}/>Conheça o espaço</a>
          <a href={generateGoogleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className={button}><Calendar size={15}/>Salvar na agenda</a>
          <button onClick={()=>downloadIcsFile(event)} className={button}><Download size={15}/>Baixar .ICS</button>
        </div>
      </div>
      <div className="bg-[#5D613C] text-[#F5F5DA] p-10 sm:p-16 arch-frame flex flex-col justify-center text-center space-y-6">
        <span className="font-serif italic text-6xl">G &amp; E</span>
        <span className="w-16 h-px bg-[#C7B79D] mx-auto"/>
        <p className="font-serif text-3xl">Um lugar para celebrar<br />o nosso para sempre.</p>
        <p className="text-xs tracking-[0.25em] uppercase">Quintal e Cia</p>
      </div>
    </div>
  </section>;
}