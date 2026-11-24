"use client";

import { GraduationCap } from "@phosphor-icons/react";
import { useRef } from "react";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Education, SkillCategory } from "@/types";

interface EducationSkillsSectionProps {
  education: Education[];
  skills: SkillCategory[];
}

export function EducationSkillsSection({
  education,
  skills,
}: EducationSkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

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

          ScrollTrigger.batch("[data-ledger-reveal]", {
            start: "top 86%",
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 20 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.06,
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
    <section ref={sectionRef} className="border-t border-border py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Education zone */}
          <div id="education" className="lg:col-span-5">
            <h2
              data-ledger-reveal
              className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-8"
            >
              Pendidikan
            </h2>

            <div className="space-y-4">
              {education.map((edu) => (
                <article
                  key={`${edu.institution}-${edu.startDate}`}
                  data-ledger-reveal
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                      <GraduationCap
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                        className="text-accent"
                      />
                    </span>
                    <time className="font-mono text-xs text-muted-foreground tabular-nums">
                      {edu.startDate} - {edu.endDate}
                    </time>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      {edu.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Skills matrix zone */}
          <div id="skills" className="lg:col-span-7">
            <h2
              data-ledger-reveal
              className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-8"
            >
              Keahlian Teknis
            </h2>

            <div className="rounded-xl border border-border bg-surface divide-y divide-border">
              {skills.map((category) => (
                <div
                  key={category.category}
                  data-ledger-reveal
                  className="p-5 sm:p-6"
                >
                  <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground mb-3.5">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-2 rounded-md bg-muted border border-border px-3 py-1.5 text-sm text-foreground"
                      >
                        <SkillIcon slug={skill.icon} name={skill.name} />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
