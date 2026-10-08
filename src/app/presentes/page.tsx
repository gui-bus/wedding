import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GiftList } from "@/components/wedding/GiftList";
import { Footer } from "@/components/wedding/Footer";
import { CinematicExperience } from "@/components/wedding/CinematicExperience";

export const metadata: Metadata = {
  title: "Lista de presentes | Giovanna e Edson",
  description: "Confira a lista completa de presentes de Giovanna e Edson.",
};

export default function GiftsPage() {
  return (
    <main className="w-full bg-[#F1F1F1] overflow-x-hidden relative">
      <CinematicExperience>
        <header className="px-6 sm:px-12 lg:px-20 pt-10 sm:pt-14 flex items-center justify-between gap-6 text-[#3D2501]">
          <Link href="/" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] hover:text-[#5D613C] transition-colors">
            <ArrowLeft size={17} /> Voltar ao início
          </Link>
          <span className="font-serif text-xl sm:text-2xl">Giovanna &amp; Edson</span>
          <h1 className="sr-only">Lista de presentes</h1>
        </header>
        <GiftList />
        <Footer />
      </CinematicExperience>
    </main>
  );
}