import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0C0E12",
        fontFamily: "sans-serif",
        fontSize: "96px",
        fontWeight: 700,
        letterSpacing: "-0.04em",
      }}
    >
      <span style={{ color: "#F3F5F8" }}>M</span>
      <span style={{ color: "#F26B3A" }}>.</span>
    </div>,
    size,
  );
}
