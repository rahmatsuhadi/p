import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface AboutSectionProps {
  about: string;
}

export function AboutSection({ about }: AboutSectionProps) {
  const paragraphs = about.split("\n\n");

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading title="About" />
        </ScrollReveal>
        <div className="mt-8 max-w-[65ch] space-y-4">
          {paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <p className="text-base text-muted-foreground leading-relaxed">
                {p}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
