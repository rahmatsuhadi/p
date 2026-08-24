"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  return (
    <ScrollReveal delay={index * 0.08}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <motion.article
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-xl border border-border bg-surface overflow-hidden transition-shadow hover:shadow-lg hover:shadow-foreground/5"
        >
          <div className="relative aspect-[16/10] bg-muted overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-foreground mb-1.5">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
              {project.techStack.length > 4 && (
                <Badge>+{project.techStack.length - 4}</Badge>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </ScrollReveal>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeading title="Projects" />
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
