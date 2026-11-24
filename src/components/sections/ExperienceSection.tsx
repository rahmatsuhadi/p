"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDateId(date: string): string {
  if (date === "Present") return "Sekarang";
  const [year, month] = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const monthIdx = Number.parseInt(month, 10) - 1;
  return `${months[monthIdx] ?? month} ${year}`;
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !timelineRef.current ||
        !progressLineRef.current
      )
        return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            gsap.set(progressLineRef.current, { scaleY: 1 });
            return;
          }

          gsap.fromTo(
            progressLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 75%",
                end: "bottom 65%",
                scrub: 0.4,
              },
            },
          );

          ScrollTrigger.batch("[data-exp-card]", {
            start: "top 86%",
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 24 },
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
      id="experience"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-semibold tracking-tight text-foreground">
            Pengalaman Kerja
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-[55ch]">
            Perjalanan kerja saya sejauh ini dalam membangun dan merawat produk
            web bersama tim maupun klien.
          </p>
        </div>

        <div ref={timelineRef} className="relative pl-7 sm:pl-10">
          <div
            aria-hidden="true"
            className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-border"
          />
          <div
            ref={progressLineRef}
            aria-hidden="true"
            className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-accent origin-top will-change-transform"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <article
                key={`${exp.company}-${exp.position}-${exp.startDate}`}
                data-exp-card
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[25px] sm:-left-[33px] top-6 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background"
                />

                <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <time className="inline-flex items-center rounded-md bg-muted border border-border px-2.5 py-1 text-xs font-mono text-muted-foreground shrink-0 w-fit tabular-nums">
                      {formatDateId(exp.startDate)} -{" "}
                      {formatDateId(exp.endDate)}
                    </time>
                  </div>

                  <ul className="space-y-2">
                    {exp.contributions.map((contribution) => (
                      <li
                        key={contribution}
                        className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.65em] before:w-1.5 before:h-px before:bg-accent"
                      >
                        {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
