"use client";

import { useLayoutEffect } from "react";

export function ScrollToTopOnMount() {
  useLayoutEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    scrollToTop();
    // Reapply after route scroll restoration and the previous page's pin cleanup.
    const frame = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}