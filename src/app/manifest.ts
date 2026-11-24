import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rahmat Suhadi | Frontend & Fullstack Developer",
    short_name: "Mattz",
    description:
      "Portofolio Rahmat Suhadi, Frontend & Fullstack Developer berbasis di Yogyakarta.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C0E12",
    theme_color: "#0C0E12",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
