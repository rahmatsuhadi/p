"use client";

import { DownloadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { ToastNotice } from "@/components/ui/ToastNotice";

// TODO: ganti ke true setelah file public/resume.pdf tersedia
const IS_RESUME_READY = false;

interface ResumeButtonProps {
  resumeUrl: string;
  email: string;
  variant?: "primary" | "secondary" | "nav";
  className?: string;
}

export function ResumeButton({
  resumeUrl,
  email,
  variant = "secondary",
  className = "",
}: ResumeButtonProps) {
  const [noticeOpen, setNoticeOpen] = useState(false);

  const variantStyles = {
    primary:
      "inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-3 min-h-11 text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]",
    secondary:
      "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface text-foreground px-6 py-3 min-h-11 text-sm font-medium transition-colors hover:border-accent/60 hover:bg-muted active:scale-[0.98]",
    nav: "inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 min-h-9 text-xs font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.97]",
  };

  if (IS_RESUME_READY) {
    return (
      <a
        href={resumeUrl}
        download
        className={`${variantStyles[variant]} ${className}`}
      >
        <DownloadSimple
          size={variant === "nav" ? 14 : 16}
          weight="bold"
          aria-hidden="true"
        />
        Unduh CV
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setNoticeOpen(true)}
        className={`${variantStyles[variant]} ${className}`}
      >
        <DownloadSimple
          size={variant === "nav" ? 14 : 16}
          weight="bold"
          aria-hidden="true"
        />
        Unduh CV
      </button>
      <ToastNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        email={email}
      />
    </>
  );
}
