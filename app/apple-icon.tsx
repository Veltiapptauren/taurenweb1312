import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 118,
            fontWeight: 700,
            color: "#00aeef",
            lineHeight: 1,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
