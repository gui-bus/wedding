"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";
import { generateGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import {
  Navigation,
  ExternalLink,
  Car,
  Calendar,
  Download,

} from "lucide-react";

export function Events() {
  const { ceremony, party, couple } = weddingConfig;

  const handleDownloadIcs = (event: typeof ceremony) => {
    downloadIcsFile({
      title: `${event.title} — Casamento ${couple.partner1} & ${couple.partner2}`,
      description: `${event.subtitle}\nLocal: ${event.placeName}\nEndereço: ${event.address}`,
      location: `${event.placeName}, ${event.address}, ${event.cityState}`,
      startDateISO: couple.weddingDate,
    });
  };

  const scheduleItems = [
    { time: "29.05.2027", label: "O Grande Dia", desc: "Sábado, o início de um novo capítulo" },
    { time: "11h30", label: "Nossa Cerimônia", desc: "O momento de dizer sim diante de quem amamos" },
    { time: "Quintal e Cia", label: "Nosso Encontro", desc: "Rua dos Marceneiros, 210 — Jardim Valparaíba" },
    { time: "Após o sim", label: "A Recepção", desc: "A celebração continua no mesmo local" },
  ];

  const renderVenueRow = (
    event: typeof ceremony,
    type: "cerimonia" | "festa",
    index: number
  ) => {
    const gCalUrl = generateGoogleCalendarUrl({
      title: `${event.title} — Casamento ${couple.partner1} & ${couple.partner2}`,
      description: `${event.subtitle}\nLocal: ${event.placeName}\nEndereço: ${event.address}`,
      location: `${event.placeName}, ${event.address}, ${event.cityState}`,
      startDateISO: couple.weddingDate,
    });

    const isEven = index % 2 === 0;

    return (
      <motion.div
        key={event.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="py-16 sm:py-24 border-t border-[#1A1715]/15 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
      >
        {/* Lado Fotográfico */}
        <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE8DD] group">
            {event.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.image}
                alt="Mesa posta e decoração de casamento — imagem ilustrativa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            )}
            <div className="absolute top-6 left-6 bg-[#1A1715]/90 backdrop-blur-md px-4 py-2 text-white font-mono text-xs uppercase tracking-[0.25em]">
              {event.time}
            </div>
          </div>
        </div>

        {/* Lado Tipográfico */}
        <div className={`lg:col-span-6 space-y-6 ${isEven ? "" : "lg:order-1"}`}>
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8C6D46]">
              {type === "cerimonia" ? "01 / MOMENTO SOLENE" : "02 / CELEBRAÇÃO & FESTA"}
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1715] leading-tight">
              {event.title}
            </h3>
            <p className="font-serif italic text-xl text-[#73685B] font-light">
              {event.placeName}
            </p>
          </div>

          <p className="text-sm sm:text-base font-light text-[#59524B] leading-relaxed">
            {event.address} &mdash; <span className="uppercase font-mono text-xs">{event.cityState}</span>
          </p>

          {event.tips && (
            <p className="text-xs sm:text-sm font-light text-[#8C6D46] italic border-l-2 border-[#8C6D46]/40 pl-4 py-1">
              &ldquo;{event.tips}&rdquo;
            </p>
          )}

          {/* Links de Navegação e Agenda */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1A1715] hover:text-[#8C6D46] py-2 px-4 border border-[#1A1715]/20 hover:border-[#8C6D46] rounded-full transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>

            {event.wazeUrl && (
              <a
                href={event.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1A1715] hover:text-[#8C6D46] py-2 px-4 border border-[#1A1715]/20 hover:border-[#8C6D46] rounded-full transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Waze</span>
              </a>
            )}

            {event.uberUrl && (
              <a
                href={event.uberUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1A1715] hover:text-[#8C6D46] py-2 px-4 border border-[#1A1715]/20 hover:border-[#8C6D46] rounded-full transition-colors"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Uber</span>
              </a>
            )}

            <a
              href={gCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#FAF7F2] bg-[#1A1715] hover:bg-[#8C6D46] py-2 px-5 rounded-full transition-colors ml-auto"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Salvar na Agenda</span>
            </a>

            <button
              onClick={() => handleDownloadIcs(event)}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#73685B] hover:text-[#1A1715] py-2 px-3 border border-[#1A1715]/15 rounded-full transition-colors"
              title="Baixar arquivo .ICS"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.ICS</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="eventos"
      className="w-full py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F1F1F1] text-[#1A1715]"
    >
      <div className="w-full space-y-20 sm:space-y-28">
        {/* Cabeçalho Editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#1A1715]/15 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#8C6D46] block">
              [ 03 &bull; LOCAIS & ITINERÁRIO ]
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]">
              Cerimônia &amp; Festa
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#73685B] font-light leading-relaxed">
            Um mesmo espaço para o nosso sim e para celebrar com as pessoas que amamos.
          </p>
        </div>

        {/* Linhas Arquitetônicas de Locais (Sem Cards!) */}
        <div>
          {renderVenueRow(ceremony, "cerimonia", 0)}
          {renderVenueRow(party, "festa", 1)}
        </div>

        {/* Cronograma Linear Tipográfico do Dia */}
        <div className="border-t border-[#1A1715]/15 pt-16 space-y-12">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#8C6D46]">
              A Sequência dos Momentos
            </span>
            <span className="text-[11px] font-mono text-[#8C8276] tracking-widest">
              [ 29 DE MAIO ]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {scheduleItems.map((item, idx) => (
              <div key={idx} className="space-y-3 border-t border-[#1A1715]/20 pt-4">
                <span className="font-mono text-2xl font-light text-[#8C6D46] block">
                  {item.time}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-light text-[#1A1715]">
                  {item.label}
                </h4>
                <p className="text-xs sm:text-sm font-light text-[#73685B] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hospitalidade & Logística (Sem Cards) */}
        <div className="border-t border-[#1A1715]/15 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C6D46] block">
              O ESPAÇO
            </span>
            <h4 className="font-serif text-2xl font-light text-[#1A1715]">Quintal e Cia</h4>
            <p className="text-xs sm:text-sm text-[#73685B] font-light leading-relaxed">
              Cerimônia e recepção no mesmo endereço, para vivermos juntos cada momento deste dia.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C6D46] block">
              COMO CHEGAR
            </span>
            <h4 className="font-serif text-2xl font-light text-[#1A1715]">Jardim Valparaíba</h4>
            <p className="text-xs sm:text-sm text-[#73685B] font-light leading-relaxed">
              Use os links de navegação acima para planejar o trajeto até a Rua dos Marceneiros, 210.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8C6D46] block">
              PONTUALIDADE
            </span>
            <h4 className="font-serif text-2xl font-light text-[#1A1715]">Nosso Sim às 11h30</h4>
            <p className="text-xs sm:text-sm text-[#73685B] font-light leading-relaxed">
              Esperamos você às 11h30 para compartilhar o início do capítulo mais bonito da nossa história.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
