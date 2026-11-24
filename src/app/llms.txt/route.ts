import {
  getExperiences,
  getProfile,
  getProjects,
  getSiteUrl,
  getSkills,
} from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  const profile = getProfile();
  const projects = getProjects();
  const experiences = getExperiences();
  const skills = getSkills();
  const siteUrl = getSiteUrl();

  const lines: string[] = [
    `# ${profile.name}`,
    "",
    `> ${profile.title} berbasis di Yogyakarta, Indonesia.`,
    "",
    profile.tagline,
    "",
    "## Ringkasan Profil",
    profile.about.replace(/\n\n/g, "\n"),
    "",
    "## Kontak & Tautan",
    `- Website: ${siteUrl}`,
    `- CV (PDF): ${siteUrl}${profile.resumeUrl}`,
    `- Email: ${profile.socials.email}`,
    `- GitHub: ${profile.socials.github}`,
    `- LinkedIn: ${profile.socials.linkedin}`,
    "",
    "## Keahlian Teknis",
    ...skills.map(
      (cat) => `- ${cat.category}: ${cat.items.map((i) => i.name).join(", ")}`,
    ),
    "",
    "## Pengalaman Kerja",
    ...experiences.map(
      (exp) =>
        `- ${exp.position} di ${exp.company} (${exp.startDate} s/d ${exp.endDate})`,
    ),
    "",
    "## Studi Kasus Proyek",
    ...projects.map(
      (p) =>
        `- [${p.name}](${siteUrl}/projects/${p.slug}): ${p.shortDescription} (${p.techStack.join(", ")})`,
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
