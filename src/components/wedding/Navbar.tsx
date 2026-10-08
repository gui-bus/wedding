"use client";

import { useState } from "react";
import { weddingConfig } from "@/config/wedding.config";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Início",          href: "#inicio" },
    { name: "Nossa História",  href: "#historia" },
    { name: "Galeria",         href: "#galeria" },
    { name: "Cerimônia",       href: "#eventos" },
    { name: "Trajes",          href: "#dress-code" },
    { name: "Presentes",       href: "#presentes" },
  ];

  const { partner1, partner2 } = weddingConfig.couple;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full py-6 sm:py-8 bg-transparent">
      <div className="w-full px-6 sm:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className="font-serif text-xl sm:text-2xl font-light tracking-wide text-white group-hover:text-[#F5F5DA] transition-colors">
            {partner1}
            <span className="font-serif italic font-light text-[#C7B79D] px-1.5">&amp;</span>
            {partner2}
          </span>
        </a>

        {/* Links desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#F1F1F1]/80 hover:text-[#F5F5DA] transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C7B79D] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Lado direito */}
        <div className="flex items-center gap-3">
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center justify-center text-[10px] uppercase tracking-[0.25em] font-medium px-5 py-2.5 rounded-full border border-[#C7B79D]/50 text-[#C7B79D] hover:bg-[#C7B79D]/20 hover:border-[#C7B79D] transition-all duration-300 backdrop-blur-xs"
          >
            Confirmar Presença
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F1F1F1] hover:text-white transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mx-4 mt-3 bg-[#141008]/95 backdrop-blur-xl border border-[#C9A96E]/20 rounded-2xl p-6 shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-[0.25em] text-[#D5C6B4] hover:text-[#F0DEB4] py-2 border-b border-[#C9A96E]/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#rsvp"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center text-xs uppercase tracking-[0.2em] font-medium px-6 py-3 rounded-full bg-[#C9A96E] text-[#0D0A08] mt-2 hover:bg-[#E2C98A] transition-all"
              >
                Confirmar Presença
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
