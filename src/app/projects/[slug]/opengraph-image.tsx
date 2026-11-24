import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjects, getSiteUrl } from "@/lib/data";

export const alt = "Studi Kasus Proyek | Rahmat Suhadi";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const host = new URL(getSiteUrl()).host;

  const title = project?.name ?? "Studi Kasus Proyek";
  const category = project?.category ?? "Portofolio";
  const position = project?.position ?? "Frontend & Fullstack Developer";
  const description =
    project?.shortDescription ??
    "Detail studi kasus pengembangan aplikasi web oleh Rahmat Suhadi.";
  const stack = project?.techStack.slice(0, 4) ?? [];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0C0E12",
        color: "#F3F5F8",
        padding: "56px 64px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #252C38",
          paddingBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#14181F",
              border: "1px solid #252C38",
              borderRadius: "10px",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "#F3F5F8" }}>M</span>
            <span style={{ color: "#F26B3A" }}>.</span>
          </div>
          <span
            style={{
              fontSize: "20px",
              color: "#F26B3A",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            STUDI KASUS
          </span>
        </div>
        <span style={{ fontSize: "20px", color: "#9AA4B2" }}>{category}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "#14181F",
          border: "1px solid #252C38",
          borderRadius: "20px",
          padding: "40px 44px",
        }}
      >
        <span style={{ fontSize: "20px", color: "#F26B3A" }}>{position}</span>
        <span
          style={{
            fontSize: "52px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#F3F5F8",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: "24px",
            color: "#9AA4B2",
            lineHeight: 1.4,
          }}
        >
          {description}
        </span>
        <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
          {stack.map((tech) => (
            <span
              key={tech}
              style={{
                backgroundColor: "#1C222D",
                border: "1px solid #252C38",
                borderRadius: "8px",
                padding: "6px 14px",
                fontSize: "18px",
                color: "#F3F5F8",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "20px",
          color: "#9AA4B2",
        }}
      >
        <span>Rahmat Suhadi</span>
        <span style={{ color: "#F26B3A" }}>{host}</span>
      </div>
    </div>,
    size,
  );
}
