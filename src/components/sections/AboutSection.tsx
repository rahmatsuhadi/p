"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface AboutSectionProps {
  about: string;
  experienceYears: number;
  projectCount: number;
}

export function AboutSection({
  about,
  experienceYears,
  projectCount,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphs = about.split("\n\n");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) return;

          ScrollTrigger.batch("[data-about-reveal]", {
            start: "top 86%",
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 20 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.08,
                  ease: "power3.out",
                  overwrite: true,
                },
              ),
          });

          const countTargets =
            gsap.utils.toArray<HTMLElement>("[data-count-to]");
          for (const target of countTargets) {
            const finalVal = Number.parseInt(target.dataset.countTo ?? "0", 10);
            gsap.fromTo(
              target,
              { innerText: 0 },
              {
                innerText: finalVal,
                duration: 0.9,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                  trigger: "[data-metric-grid]",
                  start: "top 85%",
                  once: true,
                },
              },
            );
          }
        },
        sectionRef,
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2
              data-about-reveal
              className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-semibold tracking-tight text-foreground mb-8"
            >
              Tentang Saya
            </h2>
            <div className="max-w-[65ch] space-y-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  data-about-reveal
                  className="text-base text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div
            data-about-reveal
            data-metric-grid
            className="lg:col-span-5 rounded-xl border border-border bg-surface overflow-hidden grid grid-cols-2 divide-x divide-y divide-border"
          >
            <div className="p-5 sm:p-6">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground tracking-tight tabular-nums">
                <span data-count-to={experienceYears}>{experienceYears}</span>
                <span>+ Tahun</span>
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-1.5">
                Pengalaman
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground tracking-tight tabular-nums">
                <span data-count-to={projectCount}>{projectCount}</span>
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-1.5">
                Proyek
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground tracking-tight">
                Frontend &amp; Web
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-1.5">
                Fokus
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground tracking-tight">
                Yogyakarta
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-1.5">
                Domisili
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
