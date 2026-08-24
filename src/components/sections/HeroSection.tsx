"use client";

import Image from "next/image";
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  DownloadSimple,
} from "@phosphor-icons/react";
import { FadeIn } from "@/components/animations/FadeIn";
import type { Profile } from "@/types";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="min-h-[100dvh] flex items-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text side */}
          <div className="order-2 md:order-1">
            <FadeIn delay={0.1}>
              <p className="text-sm font-mono text-muted-foreground mb-3">
                {profile.title}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none mb-4">
                {profile.name}
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-base text-muted-foreground leading-relaxed max-w-[45ch] mb-8">
                {profile.tagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/90 active:scale-[0.98]"
                >
                  <DownloadSimple size={16} weight="bold" />
                  Download Resume
                </a>
                <div className="flex items-center gap-1">
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <GithubLogo size={20} />
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <LinkedinLogo size={20} />
                  </a>
                  <a
                    href={`mailto:${profile.socials.email}`}
                    aria-label="Email"
                    className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <EnvelopeSimple size={20} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Avatar side */}
          <FadeIn
            delay={0.2}
            direction="none"
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-muted">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
