export interface Profile {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  resumeUrl: string;
  about: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  position: string;
  problems: string[];
  solutions: string[];
  techStack: string[];
  techStackReasons: string;
  screenshots: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  thumbnail: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  contributions: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string | null;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    icon: string | null;
  }[];
}
