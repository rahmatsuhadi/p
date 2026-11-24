interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-muted border border-border px-2.5 py-1 text-xs font-mono font-medium text-muted-foreground ${className}`}
    >
      {children}
    </span>
  );
}
