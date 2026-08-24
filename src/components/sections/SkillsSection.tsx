import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SkillCategory } from "@/types";

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading title="Skills" />
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, i) => (
            <ScrollReveal key={category.category} delay={i * 0.06}>
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center rounded-md bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
