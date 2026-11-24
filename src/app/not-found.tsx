import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-dvh flex items-center justify-center px-6 pt-24 pb-16"
    >
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="font-mono text-xs text-accent mb-2">404 / HALAMAN</p>
        <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Halaman tidak ditemukan
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Alamat yang Anda tuju tidak tersedia atau sudah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 min-h-11 text-sm font-medium transition-opacity hover:opacity-95"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
