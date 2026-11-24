import { getProjects } from "@/lib/data";
import ProjectOpenGraphImage from "./opengraph-image";

export const alt = "Studi Kasus Proyek | Rahmat Suhadi";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default ProjectOpenGraphImage;
