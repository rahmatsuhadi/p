import educationData from "@/data/education.json";
import experiencesData from "@/data/experiences.json";
import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import type {
  Education,
  Experience,
  Profile,
  Project,
  SkillCategory,
} from "@/types";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured);
  return featured.length > 0 ? featured : projects.slice(0, 4);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export function getExperiences(): Experience[] {
  return experiencesData as Experience[];
}

export function getExperienceYears(): number {
  const experiences = getExperiences();
  if (experiences.length === 0) return 0;

  const earliestYear = experiences.reduce((min, exp) => {
    const year = Number.parseInt(exp.startDate.split("-")[0], 10);
    return Number.isNaN(year) ? min : Math.min(min, year);
  }, new Date().getFullYear());

  return Math.max(1, new Date().getFullYear() - earliestYear);
}

export function getEducation(): Education[] {
  return educationData as Education[];
}

export function getSkills(): SkillCategory[] {
  return skillsData as SkillCategory[];
}

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://mattz.my.id").replace(
    /\/+$/,
    "",
  );
}
