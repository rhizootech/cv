import { ImageResponse } from "next/og";

export const alt = "Dewald Scholtz — Founder · Polymath · Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0a0e10",
          padding: "80px",
          color: "#e6edf0",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle teal glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle, rgba(53,203,187,0.20) 0%, rgba(53,203,187,0) 60%)",
            display: "flex",
          }}
        />

        {/* Corner brackets — HUD style */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 20,
            height: 20,
            borderTop: "2px solid #35cbbb",
            borderLeft: "2px solid #35cbbb",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 20,
            height: 20,
            borderTop: "2px solid #35cbbb",
            borderRight: "2px solid #35cbbb",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 20,
            height: 20,
            borderBottom: "2px solid #35cbbb",
            borderLeft: "2px solid #35cbbb",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 20,
            height: 20,
            borderBottom: "2px solid #35cbbb",
            borderRight: "2px solid #35cbbb",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              color: "#35cbbb",
              textTransform: "uppercase",
              letterSpacing: 4,
              fontFamily: "ui-monospace, monospace",
              display: "flex",
            }}
          >
            // founder · polymath · builder
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 24,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            Dewald Scholtz
          </div>
          <div
            style={{
              fontSize: 38,
              color: "#8a9499",
              marginTop: 28,
              display: "flex",
            }}
          >
            I help teams build. They help me learn.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 48,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 8,
                background: "#35cbbb",
                display: "flex",
              }}
            />
            <div
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 22,
                textTransform: "uppercase",
                letterSpacing: 3,
                color: "#8a9499",
                display: "flex",
              }}
            >
              open to engagements
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
