"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const reduceMotion = context.conditions?.reduceMotion;
        if (reduceMotion) {
          gsap.set(bar, { autoAlpha: 0 });
          return;
        }

        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          },
        );
      },
    );

    return () => mm.revert();
  });

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent origin-left pointer-events-none will-change-transform"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
