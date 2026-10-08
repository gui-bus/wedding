"use client";

import { useEffect, useRef, useState } from "react";

export function PageCurtainLoader() {
  const fill = useRef<HTMLDivElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const duration = reduced ? 200 : 1100;
    let ready = false;
    let disposed = false;
    let frame = 0;
    let openingTimer: ReturnType<typeof setTimeout> | undefined;
    let completionTimer: ReturnType<typeof setTimeout> | undefined;
    const fallback = window.setTimeout(() => { ready = true; }, 5000);

    const logo = new window.Image();
    logo.src = "/utils/logo_white.svg";
    const heroImages = Array.from(document.querySelectorAll<HTMLImageElement>("#inicio img"));
    Promise.allSettled([
      document.fonts.ready,
      logo.decode(),
      ...heroImages.map(image => image.decode()),
    ]).then(() => { if (!disposed) ready = true; });

    const step = (now: number) => {
      if (disposed) return;
      const elapsed = Math.min((now - start) / duration, 1);
      const progress = Math.min(elapsed * 100, ready ? 100 : 90);
      if (fill.current) fill.current.style.clipPath = `inset(0 ${100 - progress}% 0 0)`;
      if (progress < 100) {
        frame = requestAnimationFrame(step);
      } else {
        openingTimer = setTimeout(() => {
          setIsOpening(true);
          completionTimer = setTimeout(() => {
            document.body.style.overflow = previousOverflow;
            setIsComplete(true);
          }, reduced ? 180 : 850);
        }, reduced ? 0 : 200);
      }
    };
    frame = requestAnimationFrame(step);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      clearTimeout(openingTimer);
      clearTimeout(completionTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (isComplete) return null;
  const logoMask = {
    maskImage: "url('/utils/logo_white.svg')",
    WebkitMaskImage: "url('/utils/logo_white.svg')",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };

  return (
    <>
      <div role="status" aria-label="Carregando o convite de Giovanna e Edson" className={`wedding-loader fixed inset-0 z-[9999] flex justify-center ${isOpening ? "wedding-loader-opening pointer-events-none" : "pointer-events-auto"}`}>
        <div className="relative w-full max-w-440 mx-auto h-full overflow-hidden flex items-center justify-center">
          <div aria-hidden="true" className="wedding-loader-left absolute inset-y-0 left-0 w-[50.5%] bg-[#F1F1F1] z-10" />
          <div aria-hidden="true" className="wedding-loader-right absolute inset-y-0 right-0 w-[50.5%] bg-[#F1F1F1] z-10" />
          <div aria-hidden="true" className="wedding-loader-logo relative z-20 w-44 sm:w-60 md:w-72 aspect-[1560/627] select-none">
            <div className="absolute inset-0 bg-[#3D2501] opacity-15" style={logoMask} />
            <div ref={fill} className="absolute inset-0" style={{ clipPath: "inset(0 100% 0 0)" }}>
              <div className="absolute inset-0 bg-[#3D2501]" style={logoMask} />
            </div>
          </div>
        </div>
      </div>
      <noscript><style>{".wedding-loader{display:none!important}"}</style></noscript>
    </>
  );
}