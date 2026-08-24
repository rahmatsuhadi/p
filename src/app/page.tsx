import {
  getProfile,
  getProjects,
  getExperiences,
  getEducation,
  getSkills,
} from "@/lib/data";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const experiences = getExperiences();
  const education = getEducation();
  const skills = getSkills();

  return (
    <>
      <main className="flex-1">
        <HeroSection profile={profile} />
        <AboutSection about={profile.about} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <EducationSection education={education} />
        <SkillsSection skills={skills} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
