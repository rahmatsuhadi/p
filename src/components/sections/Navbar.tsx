"use client";

import { List, Moon, Sun, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { gsap, useGSAP } from "@/lib/gsap";

const navLinks = [
  { href: "/#projects", label: "Proyek" },
  { href: "/#experience", label: "Pengalaman" },
  { href: "/#skills", label: "Keahlian" },
];

interface NavbarProps {
  resumeUrl: string;
  email: string;
}

export function Navbar({ resumeUrl, email }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useGSAP(
    () => {
      if (!navRef.current) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      gsap.fromTo(
        navRef.current,
        { autoAlpha: 0, y: -14 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
      );
    },
    { scope: navRef },
  );

  useGSAP(
    () => {
      if (!mobileOpen || !drawerRef.current) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      gsap.fromTo(
        drawerRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.2, ease: "power2.out" },
      );
      gsap.fromTo(
        "[data-drawer-item]",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [mobileOpen], scope: drawerRef },
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <nav
          ref={navRef}
          aria-label="Navigasi utama"
          className={`pointer-events-auto w-full max-w-4xl max-h-[72px] flex items-center justify-between gap-3 rounded-full px-4 sm:px-5 py-2 transition-colors duration-300 ${
            scrolled
              ? "bg-surface/85 backdrop-blur-xl border border-border shadow-sm shadow-black/10"
              : "bg-transparent border border-transparent"
          }`}
        >
          <Link
            href="/"
            className="text-sm font-semibold text-foreground shrink-0 tracking-tight inline-flex items-center gap-2 min-h-11 px-1"
          >
            <span>Rahmat Suhadi</span>
            <span className="hidden sm:inline font-mono text-[11px] font-normal text-muted-foreground">
              / dev
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                mounted && theme === "light"
                  ? "Aktifkan mode gelap"
                  : "Aktifkan mode terang"
              }
              className="min-w-11 min-h-11 rounded-full border border-border bg-surface text-foreground hover:border-accent/60 transition-colors flex items-center justify-center"
            >
              {mounted && theme === "light" ? (
                <Moon size={18} weight="regular" aria-hidden="true" />
              ) : (
                <Sun size={18} weight="regular" aria-hidden="true" />
              )}
            </button>

            <div className="hidden md:block">
              <ResumeButton resumeUrl={resumeUrl} email={email} variant="nav" />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
              }
              className="md:hidden min-w-11 min-h-11 rounded-full border border-border bg-surface text-foreground flex items-center justify-center"
            >
              {mobileOpen ? (
                <X size={20} weight="bold" aria-hidden="true" />
              ) : (
                <List size={20} weight="regular" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          ref={drawerRef}
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 px-6 md:hidden"
        >
          {navLinks.map((link) => (
            <div key={link.href} data-drawer-item>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-foreground px-4 py-2 inline-flex min-h-11 items-center"
              >
                {link.label}
              </Link>
            </div>
          ))}

          <div data-drawer-item className="mt-4">
            <ResumeButton
              resumeUrl={resumeUrl}
              email={email}
              variant="primary"
            />
          </div>
        </div>
      )}
    </>
  );
}
