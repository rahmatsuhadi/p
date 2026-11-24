import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ScreenshotLightbox } from "@/components/ui/ScreenshotLightbox";
import {
  getAdjacentProjects,
  getProfile,
  getProjectBySlug,
  getProjects,
  getSiteUrl,
} from "@/lib/data";
import { ProjectDetailClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyek Tidak Ditemukan" };
  const siteUrl = getSiteUrl();

  return {
    title: project.name,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | Rahmat Suhadi`,
      description: project.shortDescription,
      type: "article",
      locale: "id_ID",
      url: `${siteUrl}/projects/${project.slug}`,
      siteName: "Rahmat Suhadi",
      images: [
        {
          url: project.thumbnail,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Rahmat Suhadi`,
      description: project.shortDescription,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const profile = getProfile();
  const siteUrl = getSiteUrl();
  const { prev, next } = getAdjacentProjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        inLanguage: "id-ID",
        name: project.name,
        description: project.fullDescription,
        url: `${siteUrl}/projects/${project.slug}`,
        image: `${siteUrl}${project.thumbnail}`,
        author: {
          "@type": "Person",
          name: profile.name,
          url: siteUrl,
        },
        keywords: project.techStack.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beranda",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Proyek",
            item: `${siteUrl}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: `${siteUrl}/projects/${project.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main id="main-content" className="min-h-dvh">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD serialized via JSON.stringify
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-28 md:pt-32 pb-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 min-h-11"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali ke Proyek
        </Link>

        <ProjectDetailClient>
          <header className="mb-12 pb-8 border-b border-border">
            <p className="font-mono text-xs text-accent mb-3">
              {project.category} · {project.position}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground mb-5">
              {project.name}
            </h1>
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
                    className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 min-h-11 text-sm font-medium transition-opacity hover:opacity-95"
                  >
                    <ArrowSquareOut size={16} aria-hidden="true" />
                    Demo Langsung
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 min-h-11 text-sm font-medium text-foreground transition-colors hover:border-accent/60"
                  >
                    <GithubLogo size={16} aria-hidden="true" />
                    Repositori
                  </a>
                )}
              </div>
            )}
          </header>

          <section className="mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">
              Ringkasan
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-[65ch]">
              {project.fullDescription}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">
              Tantangan
            </h2>
            <ul className="space-y-2.5">
              {project.problems.map((problem) => (
                <li
                  key={problem}
                  className="text-sm md:text-base text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-px before:bg-accent"
                >
                  {problem}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">
              Solusi
            </h2>
            <ul className="space-y-2.5">
              {project.solutions.map((solution) => (
                <li
                  key={solution}
                  className="text-sm md:text-base text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-px before:bg-accent"
                >
                  {solution}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">
              Keputusan Tech Stack
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[65ch]">
              {project.techStackReasons}
            </p>
          </section>

          {project.screenshots.length > 0 && (
            <section className="mb-14">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-4">
                Tangkapan Layar
              </h2>
              <ScreenshotLightbox
                screenshots={project.screenshots}
                projectName={project.name}
              />
            </section>
          )}

          {(prev || next) && (
            <nav
              aria-label="Navigasi antar proyek"
              className="pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {prev ? (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 hover:border-accent/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground mb-1">
                    <ArrowLeft size={14} aria-hidden="true" />
                    Proyek Sebelumnya
                  </span>
                  <p className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                    {prev.name}
                  </p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 text-left sm:text-right hover:border-accent/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground mb-1">
                    Proyek Berikutnya
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                  <p className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                    {next.name}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </ProjectDetailClient>
      </div>
    </main>
  );
}
