import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowSquareOut, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { ProjectDetailClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} - Mattz`,
    description: project.shortDescription,
    openGraph: {
      title: project.name,
      description: project.shortDescription,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="min-h-dvh">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Back nav */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>

        <ProjectDetailClient>
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              {project.name}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Role: {project.position}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground/90"
                  >
                    <ArrowSquareOut size={16} />
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <GithubLogo size={16} />
                    Repository
                  </a>
                )}
              </div>
            )}
          </header>

          {/* Description */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Overview
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {project.fullDescription}
            </p>
          </section>

          {/* Problems */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Problems
            </h2>
            <ul className="space-y-2">
              {project.problems.map((p, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-border"
                >
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Solutions */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Solutions
            </h2>
            <ul className="space-y-2">
              {project.solutions.map((s, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-border"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack Reasoning */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Tech Stack Decisions
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.techStackReasons}
            </p>
          </section>

          {/* Screenshots */}
          {project.screenshots.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Screenshots
              </h2>
              <div className="space-y-4">
                {project.screenshots.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border"
                  >
                    <Image
                      src={src}
                      alt={`${project.name} screenshot ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </ProjectDetailClient>
      </div>
    </main>
  );
}
