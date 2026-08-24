import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Education } from "@/types";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading title="Education" />
        </ScrollReveal>
        <div className="mt-10 space-y-0">
          {education.map((edu, i) => (
            <ScrollReveal key={`${edu.institution}-${edu.startDate}`} delay={i * 0.06}>
              <div className="relative pl-8 pb-10 last:pb-0 border-l border-border">
                <div className="absolute left-0 top-1 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {edu.degree}, {edu.field}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution}
                    </p>
                  </div>
                  <time className="text-xs font-mono text-muted-foreground shrink-0">
                    {edu.startDate} - {edu.endDate}
                  </time>
                </div>
                {edu.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
