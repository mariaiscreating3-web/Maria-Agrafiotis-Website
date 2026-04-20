import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Maria Agrafiotis — Psychology, Trauma, Crime & Human Behavior";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F0E8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Burgundy accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#6B1D2A",
            marginBottom: 48,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 86,
            fontWeight: 300,
            color: "#1C1C1C",
            lineHeight: 1.0,
            letterSpacing: "-1px",
            marginBottom: 32,
          }}
        >
          Maria Agrafiotis
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 300,
            color: "#1C1C1C",
            letterSpacing: "6px",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Psychology · Trauma · Crime · Human Behavior
        </div>
      </div>
    ),
    { ...size }
  );
}
