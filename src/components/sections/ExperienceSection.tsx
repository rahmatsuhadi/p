import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(date: string): string {
  if (date === "Present") return "Present";
  const [year, month] = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading title="Experience" />
        </ScrollReveal>
        <div className="mt-10 space-y-0">
          {experiences.map((exp, i) => (
            <ScrollReveal key={`${exp.company}-${exp.startDate}`} delay={i * 0.06}>
              <div className="relative pl-8 pb-10 last:pb-0 border-l border-border">
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground" />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                  <time className="text-xs font-mono text-muted-foreground shrink-0">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </time>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {exp.contributions.map((c, j) => (
                    <li
                      key={j}
                      className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-border"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
