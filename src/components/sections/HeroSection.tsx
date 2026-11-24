"use client";

import {
  ArrowRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import type { Profile } from "@/types";

interface HeroSectionProps {
  profile: Profile;
}

const COORDS_TEXT = "-7.7956, 110.3695";

export function HeroSection({ profile }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          canHover: "(hover: hover) and (pointer: fine)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const canHover = context.conditions?.canHover ?? false;
          const reduceMotion = context.conditions?.reduceMotion ?? false;

          if (reduceMotion) return;

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.from("[data-hero-role]", {
            autoAlpha: 0,
            y: 12,
            duration: 0.45,
          });

          if (headingRef.current) {
            SplitText.create(headingRef.current, {
              type: "lines,words",
              mask: "lines",
              aria: "auto",
              autoSplit: true,
              onSplit(self) {
                return gsap.from(self.words, {
                  yPercent: 110,
                  autoAlpha: 0,
                  duration: 0.65,
                  stagger: 0.045,
                  ease: "power3.out",
                });
              },
            });
          }

          tl.from(
            "[data-hero-tagline]",
            {
              autoAlpha: 0,
              y: 16,
              duration: 0.5,
            },
            "<0.12",
          )
            .from(
              "[data-hero-actions]",
              {
                autoAlpha: 0,
                y: 14,
                duration: 0.45,
              },
              "<0.1",
            )
            .from(
              "[data-hero-portrait]",
              {
                autoAlpha: 0,
                scale: 1.04,
                duration: 0.65,
              },
              0.1,
            );

          if (coordsRef.current) {
            tl.to(
              coordsRef.current,
              {
                duration: 0.8,
                scrambleText: {
                  text: COORDS_TEXT,
                  chars: "0123456789.,-",
                  speed: 0.6,
                },
              },
              "<0.15",
            );
          }

          if (canHover) {
            const cleanups: (() => void)[] = [];

            if (ctaRef.current) {
              const cta = ctaRef.current;
              const xTo = gsap.quickTo(cta, "x", {
                duration: 0.35,
                ease: "power3.out",
              });
              const yTo = gsap.quickTo(cta, "y", {
                duration: 0.35,
                ease: "power3.out",
              });
              const clampOffset = gsap.utils.clamp(-10, 10);

              const onPointerMove = (e: PointerEvent) => {
                const rect = cta.getBoundingClientRect();
                const offsetX = e.clientX - (rect.left + rect.width / 2);
                const offsetY = e.clientY - (rect.top + rect.height / 2);
                xTo(clampOffset(offsetX * 0.25));
                yTo(clampOffset(offsetY * 0.25));
              };

              const onPointerLeave = () => {
                xTo(0);
                yTo(0);
              };

              cta.addEventListener("pointermove", onPointerMove);
              cta.addEventListener("pointerleave", onPointerLeave);
              cleanups.push(() => {
                cta.removeEventListener("pointermove", onPointerMove);
                cta.removeEventListener("pointerleave", onPointerLeave);
              });
            }

            if (coordsRef.current) {
              const coords = coordsRef.current;
              const onCoordsEnter = () => {
                gsap.to(coords, {
                  duration: 0.55,
                  scrambleText: {
                    text: COORDS_TEXT,
                    chars: "0123456789.,-",
                    speed: 0.7,
                  },
                  overwrite: true,
                });
              };
              coords.addEventListener("pointerenter", onCoordsEnter);
              cleanups.push(() => {
                coords.removeEventListener("pointerenter", onCoordsEnter);
              });
            }

            return () => {
              for (const fn of cleanups) fn();
            };
          }
        },
        heroRef,
      );

      return () => mm.revert();
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="min-h-[100dvh] flex items-center pt-24 pb-16"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.65fr] gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p
              data-hero-role
              className="font-mono text-xs uppercase tracking-[0.12em] text-accent mb-4"
            >
              {profile.title} · Yogyakarta
            </p>

            <h1
              ref={headingRef}
              className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.08] text-foreground mb-5"
            >
              {profile.name}
            </h1>

            <p
              data-hero-tagline
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[54ch] mb-8"
            >
              {profile.tagline}
            </p>

            <div
              data-hero-actions
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                ref={ctaRef}
                href="/#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 min-h-11 text-sm font-medium transition-opacity duration-200 hover:opacity-95 active:scale-[0.98] will-change-transform"
              >
                Lihat Proyek
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>

              <ResumeButton resumeUrl={profile.resumeUrl} variant="secondary" />

              <div className="flex items-center gap-1 sm:ml-2">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Rahmat Suhadi"
                  className="min-w-11 min-h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center"
                >
                  <GithubLogo size={20} weight="regular" aria-hidden="true" />
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Rahmat Suhadi"
                  className="min-w-11 min-h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center"
                >
                  <LinkedinLogo size={20} weight="regular" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${profile.socials.email}`}
                  aria-label="Kirim Email ke Rahmat Suhadi"
                  className="min-w-11 min-h-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center"
                >
                  <EnvelopeSimple
                    size={20}
                    weight="regular"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>

          <div
            data-hero-portrait
            className="order-1 md:order-2 flex flex-col items-center md:items-end"
          >
            <div className="w-56 sm:w-64 md:w-72">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border">
                <Image
                  src={profile.avatarUrl}
                  alt={`Foto profil ${profile.name}`}
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 256px, 288px"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>Yogyakarta, ID</span>
                <span ref={coordsRef} className="tabular-nums">
                  {COORDS_TEXT}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
