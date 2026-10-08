import { StoryEnvelope } from "@/components/wedding/StoryEnvelope";



import { DressCode } from "@/components/wedding/DressCode";
import { GiftList } from "@/components/wedding/GiftList";
import { RSVPSection } from "@/components/wedding/RSVPSection";
import { Footer } from "@/components/wedding/Footer";
import { CinematicExperience } from "@/components/wedding/CinematicExperience";

export default function HomePage() {
  return <main className="w-full bg-[#F1F1F1] overflow-x-hidden relative">
    <CinematicExperience>
      <StoryEnvelope />
      <DressCode />
      <GiftList preview />
      <RSVPSection />
      <Footer />
    </CinematicExperience>
  </main>;
}