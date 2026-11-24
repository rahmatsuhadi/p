"use client";

import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Profile } from "@/types";

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) return;

          ScrollTrigger.batch("[data-footer-reveal]", {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 20 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.08,
                  ease: "power3.out",
                  overwrite: true,
                },
              ),
          });
        },
        footerRef,
      );

      return () => mm.revert();
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div
          data-footer-reveal
          className="flex flex-col md:flex-row md:items-end justify-between gap-10"
        >
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Ada proyek menarik atau sedang mencari developer untuk tim Anda?
            </h2>
            <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-[50ch]">
              Saya terbuka untuk diskusi peluang kerja full-time, kontrak,
              maupun kolaborasi pengembangan web.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-7">
              <a
                href={`mailto:${profile.socials.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 min-h-11 text-sm font-medium transition-opacity hover:opacity-95 active:scale-[0.98]"
              >
                <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />
                Kirim Email
              </a>
              <ResumeButton
                resumeUrl={profile.resumeUrl}
                email={profile.socials.email}
                variant="secondary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Rahmat Suhadi"
              className="min-w-11 min-h-11 rounded-full border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent/60 transition-colors flex items-center justify-center"
            >
              <GithubLogo size={20} weight="regular" aria-hidden="true" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Rahmat Suhadi"
              className="min-w-11 min-h-11 rounded-full border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent/60 transition-colors flex items-center justify-center"
            >
              <LinkedinLogo size={20} weight="regular" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.socials.email}`}
              aria-label="Email Rahmat Suhadi"
              className="min-w-11 min-h-11 rounded-full border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-accent/60 transition-colors flex items-center justify-center"
            >
              <EnvelopeSimple size={20} weight="regular" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div
          data-footer-reveal
          className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground"
        >
          <p>
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono">Yogyakarta, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
