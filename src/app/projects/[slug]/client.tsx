"use client";

import { type ReactNode, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

export function ProjectDetailClient({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) return;

          const titleEl = containerRef.current?.querySelector("h1");
          if (titleEl) {
            SplitText.create(titleEl, {
              type: "lines,words",
              mask: "lines",
              aria: "auto",
              autoSplit: true,
              onSplit(self) {
                return gsap.from(self.words, {
                  yPercent: 105,
                  autoAlpha: 0,
                  duration: 0.6,
                  stagger: 0.035,
                  ease: "power3.out",
                });
              },
            });
          }

          ScrollTrigger.batch("section", {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 20 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.07,
                  ease: "power3.out",
                  overwrite: true,
                },
              ),
          });
        },
        containerRef,
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
