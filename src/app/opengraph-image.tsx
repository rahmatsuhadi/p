import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/data";

export const alt = "Rahmat Suhadi | Frontend & Fullstack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const host = new URL(getSiteUrl()).host;

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
        padding: "64px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #252C38",
          paddingBottom: "28px",
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
            PORTOFOLIO
          </span>
        </div>
        <span style={{ fontSize: "20px", color: "#9AA4B2" }}>
          Yogyakarta, ID
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#14181F",
          border: "1px solid #252C38",
          borderRadius: "20px",
          padding: "48px",
        }}
      >
        <span
          style={{
            fontSize: "68px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            color: "#F3F5F8",
          }}
        >
          Rahmat Suhadi
        </span>
        <span
          style={{
            fontSize: "28px",
            color: "#9AA4B2",
            lineHeight: 1.4,
          }}
        >
          Frontend &amp; Fullstack Developer · React, Next.js, Nuxt.js &amp;
          TypeScript
        </span>
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
        <span>Antarmuka web yang rapi, cepat, dan mudah dirawat</span>
        <span style={{ color: "#F26B3A" }}>{host}</span>
      </div>
    </div>,
    size,
  );
}
