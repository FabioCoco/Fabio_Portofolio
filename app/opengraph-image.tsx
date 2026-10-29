import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = "Portfolio Fabio Francisco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG image dibuat dari kode (bukan aset resmi). Hanya teks Latin: font bawaan tidak punya glyph Jepang.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          background: "#0a0a0b",
          color: "#ece6d8",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: 115,
            width: 400,
            height: 400,
            borderRadius: 400,
            background: "#8f1217",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 40,
            top: -40,
            width: 6,
            height: 800,
            background: "#e5252a",
            transform: "rotate(35deg)",
          }}
        />
        <div style={{ fontSize: 26, letterSpacing: 8, color: "#9a958a" }}>
          PORTFOLIO / FABIO FRANCISCO
        </div>
        <div style={{ fontSize: 110, fontWeight: 900, marginTop: 24, lineHeight: 1 }}>
          {profile.name.toUpperCase()}
        </div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#e5252a" }}>
          {`${profile.major} · Projects and Certificates`}
        </div>
      </div>
    ),
    size,
  );
}
