"use client";

import { EnvelopeSimple, Info, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "@/lib/gsap";

interface ToastNoticeProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

export function ToastNotice({ open, onClose, email }: ToastNoticeProps) {
  const [mounted, setMounted] = useState(false);
  const toastRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(onClose, 8000);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open || !toastRef.current) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      gsap.fromTo(
        toastRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" },
      );
    },
    { dependencies: [open] },
  );

  if (!mounted || !open) return null;

  return createPortal(
    <output
      ref={toastRef}
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[60] max-w-sm rounded-xl border border-border bg-surface p-4 shadow-lg shadow-black/20 block"
    >
      <div className="flex items-start gap-3">
        <Info
          size={20}
          weight="fill"
          aria-hidden="true"
          className="text-accent shrink-0 mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            CV belum tersedia di sini
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Versi PDF sedang saya perbarui. Jika butuh cepat, kirim email saja
            agar langsung saya kirimkan.
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-accent hover:underline"
          >
            <EnvelopeSimple size={14} weight="bold" aria-hidden="true" />
            Kirim Email
          </a>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="p-2 -m-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-w-11 min-h-11 flex items-center justify-center"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </output>,
    document.body,
  );
}
