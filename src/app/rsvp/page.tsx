import type { Metadata } from "next";
import { RSVPSection } from "@/components/wedding/RSVPSection";
export const metadata: Metadata = {
  title: "Confirmar presença | Giovanna e Edson",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function RSVPPage() {
  return (
    <main>
      <RSVPSection />
    </main>
  );
}
