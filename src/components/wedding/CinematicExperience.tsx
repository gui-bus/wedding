"use client";

import { Fragment, ReactNode, useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CinematicExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let disposed = false;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-cinema-words]").forEach(heading => {
          gsap.from(heading.querySelectorAll("[data-cinema-word]"), {
            opacity: 0.24, y: 18, stagger: 0.09, ease: "none",
            scrollTrigger: { trigger: heading, start: "top 88%", end: "bottom 48%", scrub: 0.8 },
          });
        });
        gsap.utils.toArray<HTMLElement>("section:not(#inicio) h2:not([data-cinema-words]), section:not(#inicio) h3, footer h2").forEach(heading => {
          gsap.from(heading, {
            y: 40, opacity: 0, duration: 1.15, ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 93%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-cinema-copy]").forEach(copy => {
          gsap.from(copy, {
            y: 24, opacity: 0, duration: 1.1, ease: "power2.out",
            scrollTrigger: { trigger: copy, start: "top 92%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-cinema-image]").forEach(frame => {
          gsap.fromTo(frame, { clipPath: "inset(12% 0 12% 0 round 24px)" }, {
            clipPath: "inset(0% 0 0% 0 round 24px)", duration: 1.5, ease: "power3.inOut",
            scrollTrigger: { trigger: frame, start: "top 92%", once: true },
          });
        });
      }, root);
      return () => context.revert();
    });
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, []);

  return <MotionConfig reducedMotion="user"><div ref={root} className="cinematic-experience">{children}</div></MotionConfig>;
}

export function CinematicWords({ text, className = "" }: { text: string; className?: string }) {
  return <h2 data-cinema-words aria-label={text} className={className}>
    {text.split(" ").map((word, index) => <Fragment key={index}><span data-cinema-word aria-hidden="true" className="inline-block">{word}</span>{" "}</Fragment>)}
  </h2>;
}