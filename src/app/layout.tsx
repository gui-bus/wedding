import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { weddingConfig } from "@/config/wedding.config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${weddingConfig.couple.partner1} & ${weddingConfig.couple.partner2} — Casamento`,
  description: `Convidamos você para celebrar o nosso amor. Cerimônia, recepção, trajes, galeria, presentes e confirmação de presença (RSVP). ${weddingConfig.couple.hashtag}`,
  openGraph: {
    title: `${weddingConfig.couple.partner1} & ${weddingConfig.couple.partner2} — Casamento`,
    description: `Celebre esse dia especial com a gente!`,
    images: [{ url: weddingConfig.couple.coverImage }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-[#F1F1F1] text-[#3D2501] selection:bg-[#C7B79D] selection:text-[#3D2501] w-full overflow-x-hidden">
        <div className="w-full max-w-440 mx-auto relative bg-[#F1F1F1]">
          {children}
        </div>
      </body>
    </html>
  );
}
