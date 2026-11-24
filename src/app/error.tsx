"use client";

import { ArrowClockwise } from "@phosphor-icons/react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      className="min-h-dvh flex items-center justify-center px-6 pt-24 pb-16"
    >
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="font-mono text-xs text-accent mb-2">KESALAHAN SISTEM</p>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground mb-3">
          Terjadi gangguan saat memuat halaman
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Silakan muat ulang tampilan ini untuk mencoba kembali.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 min-h-11 text-sm font-medium transition-opacity hover:opacity-95"
        >
          <ArrowClockwise size={16} weight="bold" aria-hidden="true" />
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
