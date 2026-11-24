import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSkillsSection } from "@/components/sections/EducationSkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import {
  getEducation,
  getExperiences,
  getExperienceYears,
  getFeaturedProjects,
  getProfile,
  getProjects,
  getSiteUrl,
  getSkills,
} from "@/lib/data";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const featuredProjects = getFeaturedProjects();
  const experiences = getExperiences();
  const experienceYears = getExperienceYears();
  const education = getEducation();
  const skills = getSkills();
  const siteUrl = getSiteUrl();

  const knowsAbout = skills.flatMap((category) =>
    category.items.map((item) => item.name),
  );
  const alumniOf = education.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.institution,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        url: siteUrl,
        inLanguage: "id-ID",
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        description: profile.tagline,
        url: siteUrl,
        image: `${siteUrl}${profile.avatarUrl}`,
        email: `mailto:${profile.socials.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Yogyakarta",
          addressCountry: "ID",
        },
        sameAs: [profile.socials.github, profile.socials.linkedin],
        knowsAbout,
        alumniOf,
      },
      {
        "@type": "WebSite",
        name: `${profile.name} Portfolio`,
        url: siteUrl,
        inLanguage: "id-ID",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD serialized via JSON.stringify
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="flex-1 overflow-x-clip">
        <HeroSection profile={profile} />
        <AboutSection
          about={profile.about}
          experienceYears={experienceYears}
          projectCount={projects.length}
        />
        <ProjectsSection
          projects={projects}
          featuredProjects={featuredProjects}
        />
        <ExperienceSection experiences={experiences} />
        <EducationSkillsSection education={education} skills={skills} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
