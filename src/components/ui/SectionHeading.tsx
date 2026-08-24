interface SectionHeadingProps {
  title: string;
  className?: string;
}

export function SectionHeading({ title, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-2xl md:text-3xl font-semibold tracking-tight text-foreground ${className}`}
    >
      {title}
    </h2>
  );
}
