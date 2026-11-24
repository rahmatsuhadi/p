export default function Loading() {
  return (
    <main
      id="main-content"
      className="min-h-dvh max-w-6xl mx-auto px-6 pt-32 pb-20"
      aria-busy="true"
      aria-label="Memuat halaman"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.65fr] gap-12 items-center">
        <div className="space-y-4">
          <div className="h-4 w-48 rounded-md bg-muted animate-pulse" />
          <div className="h-12 w-3/4 rounded-lg bg-muted animate-pulse" />
          <div className="h-5 w-full max-w-lg rounded-md bg-muted animate-pulse" />
          <div className="flex gap-3 pt-4">
            <div className="h-11 w-36 rounded-full bg-muted animate-pulse" />
            <div className="h-11 w-32 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
        <div className="w-64 h-64 rounded-2xl bg-muted animate-pulse mx-auto md:ml-auto" />
      </div>
    </main>
  );
}
