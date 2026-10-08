import type { Metadata } from "next";


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
        <h1 className="sr-only">Lista de presentes</h1>
        <GiftList />
        <Footer />
      </CinematicExperience>
    </main>
  );
}