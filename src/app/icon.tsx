import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0C0E12",
        borderRadius: "7px",
        border: "1px solid #252C38",
        fontFamily: "sans-serif",
        fontSize: "19px",
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
