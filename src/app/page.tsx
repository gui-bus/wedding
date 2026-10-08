import { Hero } from "@/components/wedding/Hero";
import { Story } from "@/components/wedding/Story";
import { Gallery } from "@/components/wedding/Gallery";
import { Events } from "@/components/wedding/Events";
import { DressCode } from "@/components/wedding/DressCode";
import { GiftList } from "@/components/wedding/GiftList";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { Footer } from "@/components/wedding/Footer";
export default function HomePage() {
  return (
    <main className="w-full bg-[#F1F1F1] overflow-x-hidden relative">
      {/* 1. Seção Inicial / Hero com Nomes, Data e Contador */}
      <Hero />

      {/* 2. Nossa História de Amor */}
      <Story />

      {/* Imagens ilustrativas sem pessoas */}
      <Gallery />

      {/* 4. Locais da Cerimônia Religiosa & Recepção com Itinerários */}
      <Events />

      {/* 5. Guia de Trajes & Paleta de Cores (Dress Code) */}
      <DressCode />

      {/* 6. Lista de Presentes com Cotas e PIX Direto aos Noivos */}
      <GiftList />

      {/* 7. Formulário de Confirmação de Presença (RSVP com Acompanhantes) */}
      <RSVPSection />

      {/* 8. Rodapé com Agradecimento e Monograma */}
      <Footer />
    </main>
  );
}
