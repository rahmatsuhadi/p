import type { MetadataRoute } from "next";
import { getProjects, getSiteUrl } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const projects = getProjects();
  const now = new Date();

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${siteUrl}${project.thumbnail}`],
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
