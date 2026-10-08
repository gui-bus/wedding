"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/config/wedding.config";

export function DressCode() {
  const { dressCode } = weddingConfig;

  const tones = dressCode.palette.map((color) => ({
    name: color.name,
    hex: color.hex,
    desc:
      color.hex.toUpperCase() === "#C7B79D"
        ? "Areia suave & Linho"
        : color.hex.toUpperCase() === "#80654E"
        ? "Terracota & Marrom quente"
        : color.hex.toUpperCase() === "#3D2501"
        ? "Café profundo & Madeira nobre"
        : color.hex.toUpperCase() === "#5D613C"
        ? "Verde oliva botânico"
        : color.hex.toUpperCase() === "#F5F5DA"
        ? "Marfim suave & Baunilha"
        : color.hex.toUpperCase() === "#F1F1F1"
        ? "Alabastro / Off-White"
        : "Tom harmonioso",
  }));

  return (
    <section
      id="dress-code"
      className="cinematic-section w-full py-24 sm:py-36 px-6 sm:px-12 lg:px-20 bg-[#F1F1F1] text-[#3D2501]"
    >
      <div className="w-full space-y-20 sm:space-y-28">
        {/* Cabeçalho Editorial */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#5D613C] block font-semibold">
              [ 03 &bull; GUIA DE TRAJES &amp; PALETA ]
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] text-[#3D2501]">
              Dress Code &amp; Estilo
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#80654E] font-light leading-relaxed max-w-xl">
            {dressCode.description}
          </p>
        </div>

        {/* Declaração Principal do Traje */}
        <div className="py-8 flex flex-col md:flex-row md:items-baseline justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#5D613C] block mb-1 font-semibold">
              INSPIRAÇÕES
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#3D2501]">
              Elegância &bull; Conforto
            </h3>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-[#80654E]">
            QUINTAL E CIA &bull; CELEBRAÇÃO DIURNA
          </p>
        </div>

        {/* Paleta de Cores Panorâmica Contínua (Sem Cards!) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#80654E] font-medium">
              Paleta Oficial de Cores do Casamento
            </span>
            <span className="text-[11px] font-mono text-[#5D613C] tracking-widest font-medium">
              [ 06 TONS &bull; HARMONIA CROMÁTICA ]
            </span>
          </div>

          {/* Faixa Panorâmica Interativa de Cores */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tones.map((color, idx) => (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group space-y-3 cursor-default"
              >
                <div
                  className="w-full rounded-[1.25rem] h-32 sm:h-44 transition-transform duration-500 group-hover:scale-[1.02] border border-[#3D2501]/10 shadow-xs"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-light text-[#3D2501] group-hover:text-[#5D613C] transition-colors">
                      {color.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#80654E] font-light">
                      {color.desc}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#80654E] uppercase">
                    {color.hex}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Guia Editorial de Trajes: Para Elas & Para Eles (Sem Cards!) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pt-16">
          {/* Para as Mulheres */}
          <div className="space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#5D613C] block font-semibold">
                01 / INSPIRAÇÃO FEMININA
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#3D2501]">
                Para as Convidadas
              </h3>
            </div>

            <div className="space-y-6 text-sm sm:text-base font-light text-[#5D613C] leading-relaxed ">
              <div className="pt-4 space-y-1">
                <p className="font-serif text-lg font-medium text-[#3D2501]">
                  Vestidos Longos ou Midi Sofisticados
                </p>
                <p className="text-xs sm:text-sm text-[#80654E]">
                  Modelagens fluidas, tecidos leves e nobres como seda, crepe, chiffon ou linho fino, como inspiração para uma celebração diurna.
                </p>
              </div>

              <div className="pt-4 space-y-1">
                <p className="font-serif text-lg font-medium text-[#3D2501]">
                  Calçados &amp; Gramado
                </p>
                <p className="text-xs sm:text-sm text-[#80654E]">
                  Ao escolher seus calçados, priorize o conforto. Saltos em bloco ou modelos baixos podem ser boas inspirações para aproveitar a celebração.
                </p>
              </div>

              <div className="pt-4 space-y-1">
                <p className="font-serif text-lg font-medium text-[#3D2501]">
                  Acessórios &amp; Echarpes
                </p>
                <p className="text-xs sm:text-sm text-[#80654E]">
                  Acessórios delicados e tecidos confortáveis podem complementar o visual com leveza.
                </p>
              </div>
            </div>
          </div>

          {/* Para os Homens */}
          <div className="space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#5D613C] block font-semibold">
                02 / INSPIRAÇÃO MASCULINA
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#3D2501]">
                Para os Convidados
              </h3>
            </div>

            <div className="space-y-6 text-sm sm:text-base font-light text-[#5D613C] leading-relaxed ">
              <div className="pt-4 space-y-1">
                <p className="font-serif text-lg font-medium text-[#3D2501]">
                  Costume Completo ou Terno
                </p>
                <p className="text-xs sm:text-sm text-[#80654E]">
                  Paletó e calça social de bom caimento. Tons como azul marinho, cinza chumbo, grafite ou areia combinam perfeitamente com a ocasião.
                </p>
              </div>

              <div className="pt-4 space-y-1">
                <p className="font-serif text-lg font-medium text-[#3D2501]">
                  Camisa Social &amp; Gravata
                </p>
                <p className="text-xs sm:text-sm text-[#80654E]">
                  Camisa social alinhada em tons claros (branca, off-white ou azul clara) acompanhada de gravata clássica ou slim.
                </p>
              </div>

              <div className="pt-4 space-y-1">
                <p className="font-serif text-lg font-medium text-[#3D2501]">
                  Calçados Sociais
                </p>
                <p className="text-xs sm:text-sm text-[#80654E]">
                  Sapato social de couro ou camurça com cinto combinando.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lembretes de Etiqueta com Carinho (Sem Cards) */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#80654E] uppercase tracking-widest block font-medium">
              TONS CLAROS
            </span>
            <h4 className="font-serif text-2xl font-light text-[#3D2501]">Branco, Off-White &amp; Marfim</h4>
            <p className="text-xs sm:text-sm text-[#80654E] font-light leading-relaxed">
              Branco, off-white e marfim fazem parte das referências visuais da nossa celebração. Consulte o convite para orientações sobre o traje.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-[#80654E] uppercase tracking-widest block font-medium">
              TONS DA NATUREZA
            </span>
            <h4 className="font-serif text-2xl font-light text-[#3D2501]">Areia &amp; Verde Oliva</h4>
            <p className="text-xs sm:text-sm text-[#80654E] font-light leading-relaxed">
              Areia, madeira e verde oliva compõem a paleta acolhedora do nosso casamento.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-[#80654E] uppercase tracking-widest block font-medium">
              UM LEMBRETE
            </span>
            <h4 className="font-serif text-2xl font-light text-[#3D2501]">Vista-se com Carinho</h4>
            <p className="text-xs sm:text-sm text-[#80654E] font-light leading-relaxed">
              Estas referências são sugestões de estilo. As orientações definitivas de traje serão informadas pelos noivos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
