import { weddingConfig } from "@/config/wedding.config";
export function DressCode() {
  return <section id="dress-code" className="py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F5F5DA] text-[#3D2501]">
    <p className="font-mono text-xs tracking-[0.3em] text-[#5D613C] mb-4">[ 04 • CORES DA CELEBRAÇÃO ]</p>
    <h2 className="font-serif text-5xl sm:text-7xl font-light mb-8">Naturalmente, nós.</h2>
    <p className="text-[#80654E] max-w-xl leading-relaxed mb-12">Tons de areia, madeira e verde oliva dão cor à nossa celebração. Uma paleta acolhedora, inspirada na natureza e nos detalhes simples da vida a dois.</p>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {weddingConfig.dressCode.palette.map(color=><div key={color.hex}>
        <div style={{backgroundColor:color.hex}} className="h-36 sm:h-48 border border-[#3D2501]/15 rounded-t-full"/>
        <p className="font-serif text-xl mt-4">{color.name.split(" & ")[0]}</p>
        <p className="font-mono text-xs text-[#80654E] mt-1">{color.hex}</p>
      </div>)}
    </div>
  </section>;
}