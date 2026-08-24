interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground ${className}`}
    >
      {children}
    </span>
  );
}
