"use client";
import { useMemo, useState } from "react";
import { weddingConfig } from "@/config/wedding.config";
import { PixModal } from "./PixModal";
import { GiftItem } from "@/types/wedding";
import { formatCurrency } from "@/lib/utils";
import { Search, Gift } from "lucide-react";
const photosWithPeople = new Set([
  "https://gift-media.lejour.com.br/9a917f53-1486-422c-af2d-8dfa2e2341ef.jpeg",
  "https://gift-media.lejour.com.br/d2c33d6e-236a-4d2e-8b50-4dd859dfecd6.jpeg",
  "https://gift-media.lejour.com.br/7b8c8352-cd9f-460d-8765-d0d4832bf9bb.jpeg",
  "https://gift-media.lejour.com.br/sanduicheira-eletrica.png",
]);
export function GiftList(){
  const {gifts}=weddingConfig;
  const [category,setCategory]=useState("Todos");
  const [search,setSearch]=useState("");
  const [selected,setSelected]=useState<GiftItem|null>(null);
  const categories=["Todos",...new Set(gifts.map(g=>g.category))];
  const normalize=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const filtered=useMemo(()=>gifts.filter(g=>(category==="Todos"||g.category===category)&&normalize(g.title).includes(normalize(search))),[gifts,category,search]);
  return <section id="presentes" className="py-20 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#F5F5DA] text-[#3D2501]">
    <div className="flex flex-col lg:flex-row justify-between gap-8 border-b border-[#C7B79D] pb-8 mb-12">
      <div><p className="font-mono text-xs tracking-[0.3em] text-[#5D613C] mb-4">[ 05 • LISTA DE PRESENTES ]</p><h2 className="font-serif text-5xl sm:text-7xl font-light">Carinho para o novo capítulo.</h2></div>
      <p className="max-w-md text-[#80654E] leading-relaxed self-end">Sua presença é o nosso maior presente. Aqui estão os itens que escolhemos para a nossa vida a dois. Em breve, disponibilizaremos os valores e as opções de pagamento.</p>
    </div>
    <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
      <div className="flex flex-wrap gap-3">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)} className={"rounded-full px-4 py-2 border border-[#C7B79D] text-sm "+(category===c?"bg-[#5D613C] text-[#F5F5DA]":"text-[#80654E]")}>{c}</button>)}</div>
      <label className="flex items-center gap-2 border-b border-[#80654E] pb-2"><Search size={18}/><input aria-label="Buscar presentes" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar presentes..." className="bg-transparent outline-none w-full lg:w-48"/></label>
    </div>
    <p className="text-xs text-[#80654E] mb-6" role="status">{filtered.length} presentes</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12">
      {filtered.map(g=><article key={g.id} className="space-y-4">
        <div className="aspect-[4/3] bg-[#F1F1F1] overflow-hidden flex justify-center items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {photosWithPeople.has(g.image) ? <Gift size={64} strokeWidth={1} className="text-[#5D613C]" aria-label="Ilustração de presente"/> : <img src={g.image} alt={g.title} loading="lazy" className="w-full h-full object-contain p-4" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentElement?.setAttribute("aria-label",g.title+" — imagem indisponível");}}/>}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#5D613C]">{g.categoryLabel}</p>
        <h3 className="font-serif text-2xl leading-snug">{g.title}</h3>
        <div className="border-t border-[#C7B79D] pt-3">
          {g.price && g.price>0 ? <button onClick={()=>setSelected(g)} className="text-sm text-[#5D613C]">Presentear • {formatCurrency(g.price)}</button> : <p className="text-xs text-[#80654E]">Disponível para presentear em breve</p>}
        </div>
      </article>)}
    </div>
    {filtered.length===0 && <p className="py-12 text-center text-[#80654E]">Nenhum presente encontrado.</p>}
    {selected && <PixModal gift={selected} onClose={()=>setSelected(null)}/>}
  </section>;
}