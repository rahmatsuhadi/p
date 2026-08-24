"use client";

import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  DownloadSimple,
} from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { Profile } from "@/types";

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Let&apos;s connect
            </h2>
            <p className="text-sm text-muted-foreground max-w-[45ch]">
              Open for opportunities and interesting conversations. Feel free to
              reach out.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
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
          </div>
        </ScrollReveal>

        <div className="mt-16 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
