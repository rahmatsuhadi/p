import type {
  Education,
  Experience,
  Profile,
  Project,
  SkillCategory,
} from "@/types";

import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import experiencesData from "@/data/experiences.json";
import educationData from "@/data/education.json";
import skillsData from "@/data/skills.json";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getExperiences(): Experience[] {
  return experiencesData as Experience[];
}

export function getEducation(): Education[] {
  return educationData as Education[];
}

export function getSkills(): SkillCategory[] {
  return skillsData as SkillCategory[];
}
