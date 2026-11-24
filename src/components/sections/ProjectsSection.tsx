"use client";

import { ArrowUpRight, FolderOpen } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Flip, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Project, ProjectCategory } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
  featuredProjects: Project[];
}

const CATEGORIES: ("Semua" | ProjectCategory)[] = [
  "Semua",
  "Sistem & Cloud",
  "Publik & Bisnis",
  "Produk Mandiri",
];

export function ProjectsSection({
  projects,
  featuredProjects,
}: ProjectsSectionProps) {
  const [activeFlagship, setActiveFlagship] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<
    "Semua" | ProjectCategory
  >("Semua");

  const sectionRef = useRef<HTMLElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const isDesktop = context.conditions?.isDesktop ?? false;
          const reduceMotion = context.conditions?.reduceMotion ?? false;

          if (reduceMotion) return;

          ScrollTrigger.batch("[data-flagship-card]", {
            start: "top 86%",
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 28 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power3.out",
                  overwrite: true,
                },
              ),
          });

          if (isDesktop) {
            const cards = gsap.utils.toArray<HTMLElement>(
              "[data-flagship-card]",
            );
            cards.forEach((card, index) => {
              ScrollTrigger.create({
                trigger: card,
                start: "top 45%",
                end: "bottom 45%",
                onEnter: () => setActiveFlagship(index),
                onEnterBack: () => setActiveFlagship(index),
              });

              const imgWrap = card.querySelector("[data-flagship-img]");
              if (imgWrap) {
                gsap.fromTo(
                  imgWrap,
                  { yPercent: -4, scale: 1.05 },
                  {
                    yPercent: 4,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.6,
                    },
                  },
                );
              }
            });
          }
        },
        sectionRef,
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!flipStateRef.current) return;
      const state = flipStateRef.current;
      flipStateRef.current = null;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        ScrollTrigger.refresh();
        return;
      }

      Flip.from(state, {
        targets: "[data-archive-item]",
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.03,
        simple: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
          ),
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    },
    { dependencies: [selectedCategory], scope: archiveRef },
  );

  const handleCategorySelect = (category: "Semua" | ProjectCategory) => {
    if (category === selectedCategory) return;
    if (archiveRef.current) {
      const items = archiveRef.current.querySelectorAll("[data-archive-item]");
      if (items.length > 0) {
        flipStateRef.current = Flip.getState(items);
      }
    }
    setSelectedCategory(category);
  };

  const handleSidebarScroll = contextSafe(
    (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
      e.preventDefault();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      gsap.to(window, {
        duration: reduceMotion ? 0 : 0.75,
        scrollTo: { y: `#flagship-${slug}`, offsetY: 112 },
        ease: "power3.inOut",
      });
    },
  );

  const filteredProjects =
    selectedCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const currentProject =
    featuredProjects[activeFlagship] ?? featuredProjects[0];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Part A: Flagship Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
              Proyek Pilihan
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-[38ch]">
              Beberapa proyek yang paling menggambarkan cara saya memecahkan
              masalah di antarmuka dan alur aplikasi.
            </p>

            {/* Active flagship tracker */}
            <div className="hidden lg:block rounded-xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between font-mono text-xs mb-4">
                <span className="text-muted-foreground">INDEKS AKTIF</span>
                <span className="text-accent font-medium tabular-nums">
                  {String(activeFlagship + 1).padStart(2, "0")} /{" "}
                  {String(featuredProjects.length).padStart(2, "0")}
                </span>
              </div>
              <ol className="space-y-2 border-t border-border pt-4">
                {featuredProjects.map((project, idx) => {
                  const isActive = idx === activeFlagship;
                  return (
                    <li key={project.slug}>
                      <a
                        href={`#flagship-${project.slug}`}
                        onClick={(e) => handleSidebarScroll(e, project.slug)}
                        className={`flex items-center justify-between gap-3 py-1.5 text-sm transition-colors ${
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="truncate">{project.name}</span>
                        <span
                          className={`font-mono text-xs tabular-nums shrink-0 ${
                            isActive ? "text-accent" : "text-muted-foreground"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
              {currentProject && (
                <p className="mt-4 pt-4 border-t border-border font-mono text-[11px] text-muted-foreground truncate">
                  {currentProject.position}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {featuredProjects.map((project, index) => (
              <article
                key={project.slug}
                id={`flagship-${project.slug}`}
                data-flagship-card
                className="group rounded-2xl border border-border bg-surface overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/50"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="relative aspect-[16/10] w-full bg-muted border-b border-border overflow-hidden p-4 sm:p-6">
                    <div
                      data-flagship-img
                      className="relative w-full h-full will-change-transform"
                    >
                      <Image
                        src={project.thumbnail}
                        alt={`Pratinjau ${project.name}`}
                        fill
                        className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs text-accent">
                        {project.position}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(featuredProjects.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground shrink-0 mt-1">
                        Baca Studi Kasus
                        <ArrowUpRight
                          size={16}
                          weight="bold"
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 max-w-[65ch]">
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
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Part B: Complete Archive with GSAP Flip Filter */}
        <div
          ref={archiveRef}
          className="mt-20 md:mt-28 pt-16 border-t border-border"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold text-foreground">
                Arsip Semua Proyek
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Menampilkan {filteredProjects.length} dari {projects.length}{" "}
                proyek terdokumentasi.
              </p>
            </div>

            <fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
              <legend className="sr-only">Filter kategori proyek</legend>
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-3.5 py-2 min-h-11 rounded-lg text-xs font-medium transition-colors border ${
                      active
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-surface text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </fieldset>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-10 text-center">
              <FolderOpen
                size={32}
                weight="regular"
                aria-hidden="true"
                className="mx-auto text-muted-foreground mb-3"
              />
              <p className="text-base font-medium text-foreground">
                Belum ada proyek di kategori ini
              </p>
              <p className="text-sm text-muted-foreground mt-1 mb-5">
                Coba pilih kategori lain atau tampilkan semua proyek.
              </p>
              <button
                type="button"
                onClick={() => handleCategorySelect("Semua")}
                className="rounded-full bg-foreground text-background px-5 py-2.5 min-h-11 text-xs font-medium"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface divide-y divide-border overflow-hidden">
              {filteredProjects.map((project) => (
                <div key={project.slug} data-archive-item>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-muted/50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1">
                        <h4 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                          {project.name}
                        </h4>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <div className="hidden md:flex items-center gap-1.5">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground group-hover:text-foreground">
                        Detail
                        <ArrowUpRight
                          size={15}
                          weight="bold"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
