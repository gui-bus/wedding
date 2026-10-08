import { CinematicTransition } from "@/components/wedding/CinematicTransition";
import { Hero } from "@/components/wedding/Hero";
import { Story } from "@/components/wedding/Story";
import { Events } from "@/components/wedding/Events";
import { DressCode } from "@/components/wedding/DressCode";
import { GiftList } from "@/components/wedding/GiftList";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { Footer } from "@/components/wedding/Footer";
import { CinematicExperience } from "@/components/wedding/CinematicExperience";

export default function HomePage() {
  return <main className="w-full bg-[#F1F1F1] overflow-x-hidden relative">
    <CinematicExperience>
      <Hero />
      <Story />
      <CinematicTransition />
      <Events />
      <DressCode />
      <GiftList />
      <RSVPSection />
      <Footer />
    </CinematicExperience>
  </main>;
}