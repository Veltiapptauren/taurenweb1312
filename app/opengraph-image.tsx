import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — streaming y eventos corporativos`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #020617 0%, #0a2744 55%, #020617 100%)",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 28, color: "#00aeef", letterSpacing: "0.08em" }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.08,
            }}
          >
            Streaming y eventos corporativos
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(255,255,255,0.78)" }}>
            Transmisión en vivo, producción integral, videos corporativos, web y apps móviles
          </div>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.55)" }}>
          taurenproeventos.cl · Providencia, Chile
        </div>
      </div>
    ),
    { ...size }
  );
}
