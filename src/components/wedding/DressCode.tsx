"use client";

import { WeddingOrnaments } from "./WeddingOrnaments";
import { weddingConfig } from "@/config/wedding.config";

const colorNames: Record<string, string> = {
  "#C7B79D": "Areia", "#80654E": "Madeira", "#3D2501": "Café",
  "#5D613C": "Oliva", "#F5F5DA": "Marfim", "#F1F1F1": "Off-white",
};
const inspirations = [
  { title: "Para as convidadas", subtitle: "Leveza em cada detalhe", items: [
    { title: "Vestidos longos ou midi", text: "Modelagens fluidas e tecidos leves, como crepe, chiffon ou linho, combinam com uma celebração diurna." },
    { title: "Conforto para celebrar", text: "Saltos em bloco ou modelos baixos são boas inspirações para aproveitar cada momento com tranquilidade." },
    { title: "Um toque delicado", text: "Acessórios delicados e tecidos confortáveis complementam o visual com leveza." },
  ] },
  { title: "Para os convidados", subtitle: "Elegância com naturalidade", items: [
    { title: "Um bom caimento", text: "Paletó e calça social em tons como azul marinho, cinza ou areia são referências para a ocasião." },
    { title: "Os detalhes do visual", text: "Camisa social em tons claros e uma gravata clássica podem completar a composição." },
    { title: "Para aproveitar o dia", text: "Sapatos sociais confortáveis, em couro ou camurça, e um cinto que combine com o visual." },
  ] },
];

export function DressCode() {
  return (
    <section id="dress-code" className="cinematic-section relative overflow-hidden bg-[#F1F1F1] text-[#3D2501] px-6 sm:px-12 lg:px-20 py-16 sm:py-24">
      <WeddingOrnaments variant="floral" tone="paper" />
      <div className="relative z-10 max-w-6xl mx-auto space-y-12 sm:space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <p data-cinema-copy className="cinema-eyebrow text-[#5D613C]">Para viver esse dia com leveza</p>
          <h2 className="font-serif text-5xl sm:text-7xl font-light tracking-[-0.04em] leading-[1.08]">Dress Code <span className="italic text-[#5D613C]">&amp; Estilo</span></h2>
          <p data-cinema-copy className="font-serif italic text-xl sm:text-2xl text-[#80654E]">Elegância para celebrar. Conforto para aproveitar.</p>
        </div>

        <div className="space-y-7 max-w-4xl mx-auto">
          <p data-cinema-copy className="text-center text-xs tracking-[0.16em] uppercase text-[#80654E]">As cores da nossa celebração</p>
          <div data-cinema-sequence className="grid grid-cols-3 sm:grid-cols-6 gap-x-5 gap-y-7 sm:gap-7">
            {weddingConfig.dressCode.palette.map(color => (
              <div key={color.hex} className="text-center space-y-3">
                <div className="aspect-[3/4] max-w-24 mx-auto rounded-t-full rounded-b-[2rem] ring-1 ring-[#3D2501]/10 shadow-[0_12px_24px_-18px_#3D250150]" style={{ backgroundColor: color.hex }} />
                <p className="font-serif text-lg sm:text-xl text-[#80654E]">{colorNames[color.hex] ?? color.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
          {inspirations.map(guide => (
            <div key={guide.title} className="space-y-7">
              <div className="space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-tight">{guide.title}</h3>
                <p className="font-serif italic text-lg text-[#5D613C]">{guide.subtitle}</p>
              </div>
              <dl className="space-y-5">
                {guide.items.map(item => <div key={item.title} data-cinema-copy className="space-y-1.5">
                  <dt className="font-serif text-xl text-[#3D2501]">{item.title}</dt>
                  <dd className="text-sm font-light leading-[1.8] text-[#80654E]">{item.text}</dd>
                </div>)}
              </dl>
            </div>
          ))}
        </div>
        <p data-cinema-copy className="text-center max-w-2xl mx-auto text-sm text-[#80654E] leading-relaxed">Estas são inspirações para uma celebração diurna no Quintal &amp; Cia. As orientações definitivas de traje serão informadas pelos noivos.</p>
      </div>
    </section>
  );
}