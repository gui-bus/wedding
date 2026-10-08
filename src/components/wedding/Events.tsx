"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Heart, Navigation } from "lucide-react";
import { WeddingOrnaments, WeddingBranch } from "./WeddingOrnaments";
import { weddingConfig } from "@/config/wedding.config";
import venueCeremony from "../../../public/utils/quintal-e-cia/ambiente-quintal-e-cia-2.webp";
import venueEntrance from "../../../public/utils/quintal-e-cia/ambiente-quintal-e-cia-1.webp";
import venueLights from "../../../public/utils/quintal-e-cia/ambiente-quintal-e-cia-3.webp";
import venueDetails from "../../../public/utils/quintal-e-cia/ambiente-quintal-e-cia-4.webp";

const venuePhotos = [
  { src: venueCeremony, alt: "Espaço da cerimônia no Quintal & Cia, com cadeiras, plantas e luzes" },
  { src: venueEntrance, alt: "Entrada do Quintal & Cia, com fachada coberta por plantas" },
  { src: venueLights, alt: "Iluminação e vegetação do Quintal & Cia" },
  { src: venueDetails, alt: "Decoração e ambiente interno do Quintal & Cia" },
];

export function Events() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const { ceremony } = weddingConfig;
  const [photoIndex, setPhotoIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const photo = venuePhotos[photoIndex];
  const gallery = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const frame = gallery.current;
    if (!frame) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setPhotoIndex(current => (current + 1) % venuePhotos.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isVisible, isPaused]);

  return (
    <section ref={section} id="eventos" className="cinematic-section relative overflow-hidden w-full pt-8 sm:pt-12 pb-16 sm:pb-24 px-6 sm:px-12 lg:px-20 bg-[#5D613C] text-[#F1F1F1] [&_a:focus-visible]:outline-[#F1F1F1] [&_button:focus-visible]:outline-[#F1F1F1] [&_[tabindex]:focus-visible]:outline-[#F1F1F1]">
      <WeddingOrnaments progress={scrollYProgress} variant="venue" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center space-y-5 max-w-4xl mx-auto mb-10 sm:mb-14">
          <p data-cinema-copy className="cinema-eyebrow text-[#F1F1F1]/80">O nosso grande dia</p>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[1.05]">Cerimônia <span className="italic text-[#C7B79D]">&amp;</span> Festa</h2>
          <p data-cinema-copy className="font-serif italic text-xl sm:text-2xl text-[#F1F1F1]/80 leading-relaxed">Um só lugar. Todos os momentos que queremos viver com você.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div data-cinema-copy>
            <div ref={gallery} role="region" aria-roledescription="carrossel" aria-label="Fotos do Quintal & Cia" tabIndex={0}
              onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)} onBlur={() => setIsPaused(false)}
              className="relative w-full max-w-xl mx-auto rounded-t-[45%] rounded-b-[2rem] border border-[#C7B79D]/65 bg-white/5 p-3 sm:p-4 shadow-[0_24px_70px_-30px_#17130D80]">
              <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C7B79D] z-10"><Heart size={20} strokeWidth={1.2} /></div>
              <div className="relative aspect-[4/5] w-full rounded-t-[45%] rounded-b-[1.5rem] overflow-hidden ring-1 ring-[#F1F1F1]/25 bg-[#C7B79D]/20">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={photo.src.src} className="absolute inset-0"
                    initial={reducedMotion ? false : { opacity: 0, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}>
                    <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div aria-hidden="true" className="absolute -left-7 -bottom-3 w-16 sm:w-20 -rotate-[30deg] text-[#C7B79D] pointer-events-none z-10"><WeddingBranch /></div>
            </div>
          </div>
          <div className="space-y-8 sm:space-y-9">
            <div className="space-y-5">
              <p data-cinema-copy className="cinema-eyebrow text-[#C7B79D]">Cerimônia e recepção no mesmo local</p>
              <h3 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-[-0.035em]">{ceremony.placeName}</h3>
              <p data-cinema-copy className="text-base sm:text-lg font-light text-[#F1F1F1]/80 leading-[1.8] max-w-lg">Aqui diremos o nosso sim e, logo depois, continuaremos a celebração com as pessoas que amamos.</p>
            </div>

            <dl data-cinema-sequence className="grid grid-cols-2 gap-6 sm:gap-10">
              <div className="space-y-3">
                <dt className="cinema-eyebrow text-[#F1F1F1]/80">Reserve a data</dt>
                <dd className="font-serif text-3xl sm:text-4xl text-[#C7B79D]">29 maio 2027<span className="block font-sans text-xs sm:text-sm text-[#F1F1F1]/80 mt-2">Sábado</span></dd>
              </div>
              <div className="space-y-3">
                <dt className="cinema-eyebrow text-[#F1F1F1]/80">O nosso sim</dt>
                <dd className="font-serif text-3xl sm:text-4xl text-[#C7B79D]">11h30<span className="block font-sans text-xs sm:text-sm text-[#F1F1F1]/80 mt-2">Recepção após a cerimônia</span></dd>
              </div>
            </dl>

            <div data-cinema-copy className="space-y-3">
              <p className="cinema-eyebrow text-[#F1F1F1]/80">Onde nos encontrar</p>
              <address className="not-italic text-base sm:text-lg font-light leading-[1.8]">{ceremony.address}<br /><span className="text-[#F1F1F1]/80">{ceremony.cityState}</span></address>
              <a href="https://www.instagram.com/quintal_sjc/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-[#C7B79D] hover:text-[#F1F1F1] py-2">Conheça o espaço <ArrowUpRight size={15} /></a>
            </div>

            <div data-cinema-copy className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <a href={ceremony.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="cinema-button bg-[#C7B79D] text-[#3D2501] hover:bg-[#F1F1F1] gap-2"><Navigation size={15} /> Como chegar</a>
                {ceremony.wazeUrl && <a href={ceremony.wazeUrl} target="_blank" rel="noopener noreferrer" className="cinema-button bg-[#C7B79D]/25 text-[#F1F1F1] hover:bg-[#C7B79D]/50 gap-2">Abrir no Waze <ArrowUpRight size={15} /></a>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg aria-hidden="true" width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="venue-wave" clipPathUnits="objectBoundingBox">
            <path d="M 0,.35 C .18,.95 .35,1 .52,.62 C .7,.2 .84,.05 1,.3 L 1,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div aria-hidden="true" className="absolute inset-x-0 -bottom-px h-12 sm:h-16 bg-[#F1F1F1] pointer-events-none z-20" style={{ clipPath: "url(#venue-wave)" }} />
    </section>
  );
}