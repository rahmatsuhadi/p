"use client";

import {
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ScreenshotLightboxProps {
  screenshots: string[];
  projectName: string;
}

export function ScreenshotLightbox({
  screenshots,
  projectName,
}: ScreenshotLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + screenshots.length) % screenshots.length,
    );
  }, [screenshots.length]);
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
  }, [screenshots.length]);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, prev, next]);

  useGSAP(
    () => {
      if (activeIndex === null || !mediaRef.current) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      if (dialogRef.current) {
        gsap.fromTo(
          dialogRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.2, ease: "power2.out" },
        );
      }
      gsap.fromTo(
        mediaRef.current,
        { autoAlpha: 0, scale: 0.97 },
        { autoAlpha: 1, scale: 1, duration: 0.25, ease: "power2.out" },
      );
    },
    { dependencies: [activeIndex] },
  );

  return (
    <>
      <div className="space-y-6">
        {screenshots.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Perbesar tangkapan layar ${i + 1} dari ${projectName}`}
            className="group relative block w-full aspect-video rounded-2xl overflow-hidden bg-surface border border-border p-3 sm:p-5 text-left transition-colors hover:border-accent/60"
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`${projectName} tangkapan layar ${i + 1}`}
                fill
                className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-background/85 backdrop-blur-md border border-border px-2.5 py-1.5 font-mono text-[11px] text-foreground opacity-90 group-hover:opacity-100">
              <MagnifyingGlassPlus size={14} aria-hidden="true" />
              Perbesar
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau tangkapan layar ${projectName}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8"
        >
          <div className="relative w-full max-w-5xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p className="font-mono text-xs text-muted-foreground tabular-nums">
                {projectName} · {activeIndex + 1} / {screenshots.length}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Tutup pratinjau"
                className="min-w-11 min-h-11 rounded-full border border-border bg-surface text-foreground hover:border-accent/60 flex items-center justify-center"
              >
                <X size={20} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={mediaRef}
              className="relative aspect-video w-full rounded-2xl border border-border bg-surface overflow-hidden p-2 sm:p-4"
            >
              <Image
                src={screenshots[activeIndex]}
                alt={`${projectName} tangkapan layar ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {screenshots.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Tangkapan layar sebelumnya"
                  className="min-w-11 min-h-11 rounded-full border border-border bg-surface text-foreground hover:border-accent/60 flex items-center justify-center"
                >
                  <CaretLeft size={18} weight="bold" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Tangkapan layar berikutnya"
                  className="min-w-11 min-h-11 rounded-full border border-border bg-surface text-foreground hover:border-accent/60 flex items-center justify-center"
                >
                  <CaretRight size={18} weight="bold" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
