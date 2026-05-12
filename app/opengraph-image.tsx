import { ImageResponse } from "next/og";

export const alt = "Dewald Scholtz — Founder · Polymath · Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Fetch a Google Font's woff2 binary at build time. Used to embed Press Start 2P
 * in the social-share card so it matches the on-site hero typography.
 */
async function loadGoogleFont(family: string): Promise<ArrayBuffer> {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}`;
  const css = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  }).then((r) => r.text());

  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error(`Could not parse font URL for ${family}`);
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

export default async function OpenGraphImage() {
  const pressStart2P = await loadGoogleFont("Press Start 2P");

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
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Teal glow — right side, matching the site */}
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -200,
            width: 850,
            height: 750,
            background:
              "radial-gradient(circle, rgba(53,203,187,0.22) 0%, rgba(53,203,187,0) 60%)",
            display: "flex",
          }}
        />

        {/* CCTV scanlines, faint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)",
            display: "flex",
          }}
        />

        {/* Corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 24,
            height: 24,
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
            width: 24,
            height: 24,
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
            width: 24,
            height: 24,
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
            width: 24,
            height: 24,
            borderBottom: "2px solid #35cbbb",
            borderRight: "2px solid #35cbbb",
            display: "flex",
          }}
        />

        {/* Recording indicator — top right */}
        <div
          style={{
            position: "absolute",
            top: 56,
            right: 88,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              background: "#a10512",
              boxShadow: "0 0 12px rgba(161,5,18,0.7)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 18,
              textTransform: "uppercase",
              letterSpacing: 3.6,
              color: "#8a9499",
              display: "flex",
            }}
          >
            REC
          </div>
        </div>

        {/* HUD stat ticks — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 88,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
            fontFamily: "ui-monospace, monospace",
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#5e676b",
          }}
        >
          <div style={{ display: "flex" }}>// CAM_01 · WC-ZA</div>
          <div style={{ display: "flex" }}>// LAT -32.50° · LON +18.40°</div>
          <div style={{ display: "flex" }}>// FEED · NOMINAL</div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              color: "#35cbbb",
              textTransform: "uppercase",
              letterSpacing: 4.2,
              fontFamily: "ui-monospace, monospace",
              display: "flex",
            }}
          >
            // founder · polymath · builder
          </div>

          {/* Title: > Dewald Scholtz_  (Press Start 2P) */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 22,
              marginTop: 28,
              fontFamily: "Press Start 2P",
              fontSize: 58,
              lineHeight: 1.1,
              color: "#e6edf0",
            }}
          >
            <span style={{ color: "#35cbbb", display: "flex" }}>&gt;</span>
            <span style={{ display: "flex" }}>Dewald Scholtz</span>
            <span style={{ color: "#35cbbb", display: "flex" }}>_</span>
          </div>

          <div
            style={{
              fontSize: 32,
              color: "#8a9499",
              marginTop: 36,
              display: "flex",
            }}
          >
            I help teams build. They help me learn.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 48,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 8,
                background: "#35cbbb",
                display: "flex",
              }}
            />
            <div
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 20,
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
    {
      ...size,
      fonts: [
        {
          name: "Press Start 2P",
          data: pressStart2P,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
