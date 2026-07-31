import { ImageResponse } from "next/og";

export const alt = "Atlas Sim Dashboard — watch Atlas at work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #eef2fb 0%, #dbe3f5 55%, #cdd8f0 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
          }}
        >
          {/* mascot */}
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 280,
              height: 300,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: 20,
                height: 20,
                marginLeft: -10,
                borderRadius: 999,
                background: "#ffd66b",
              }}
            />
            <div
              style={{
                display: "flex",
                width: 240,
                height: 260,
                borderRadius: 90,
                background: "linear-gradient(160deg, #6d97ff 0%, #8a63e8 100%)",
                boxShadow: "0 30px 60px rgba(70,90,160,0.35)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 108,
                left: "50%",
                marginLeft: -78,
                width: 156,
                height: 74,
                borderRadius: 40,
                background: "#101319",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 26,
                  borderRadius: 999,
                  background: "#bfe4ff",
                }}
              />
            </div>
          </div>

          {/* wordmark */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 68,
                fontWeight: 700,
                color: "#1f2530",
                letterSpacing: -1,
                display: "flex",
              }}
            >
              Atlas Sim Dashboard
            </div>
            <div style={{ fontSize: 30, color: "#5b6577", display: "flex" }}>
              Watch Atlas at work, live.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
