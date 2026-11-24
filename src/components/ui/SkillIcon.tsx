import { Code, Database } from "@phosphor-icons/react/dist/ssr";
import {
  type SimpleIcon,
  siBootstrap,
  siCodeigniter,
  siDocker,
  siExpress,
  siFigma,
  siGit,
  siHtml5,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

const ICON_MAP: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  php: siPhp,
  python: siPython,
  html5: siHtml5,
  nextdotjs: siNextdotjs,
  react: siReact,
  nuxtdotjs: siNuxt,
  nodedotjs: siNodedotjs,
  laravel: siLaravel,
  codeigniter: siCodeigniter,
  express: siExpress,
  tailwindcss: siTailwindcss,
  bootstrap: siBootstrap,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  mysql: siMysql,
  supabase: siSupabase,
  git: siGit,
  docker: siDocker,
  postman: siPostman,
  vercel: siVercel,
  figma: siFigma,
};

interface SkillIconProps {
  slug: string | null;
  name: string;
}

export function SkillIcon({ slug, name }: SkillIconProps) {
  if (slug && ICON_MAP[slug]) {
    const icon = ICON_MAP[slug];
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={16}
        height={16}
        aria-hidden="true"
        className="fill-current text-muted-foreground shrink-0"
      >
        <path d={icon.path} />
      </svg>
    );
  }

  if (name === "SQL") {
    return (
      <Database
        size={16}
        weight="regular"
        aria-hidden="true"
        className="text-muted-foreground shrink-0"
      />
    );
  }

  return (
    <Code
      size={16}
      weight="regular"
      aria-hidden="true"
      className="text-muted-foreground shrink-0"
    />
  );
}
