import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dewald.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dewald Scholtz — Founder · Polymath · Builder",
    template: "%s · Dewald Scholtz",
  },
  description:
    "Founder of RCT. I help teams build. They help me learn. Senior full-stack, R&D, and founding-engineer engagements.",
  keywords: [
    "Dewald Scholtz",
    "RCT",
    "Edgetower",
    "Senior Full-Stack",
    "Tech Lead",
    "Python",
    "Django",
    "Next.js",
    "AI",
    "Computer Vision",
    "IoT",
    "South Africa",
  ],
  authors: [{ name: "Dewald Scholtz" }],
  creator: "Dewald Scholtz",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dewald Scholtz",
    title: "Dewald Scholtz — Founder · Polymath · Builder",
    description:
      "Founder of RCT. I help teams build. They help me learn. Senior full-stack, R&D, and founding-engineer engagements.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dewald Scholtz — Founder · Polymath · Builder",
    description: "I help teams build. They help me learn.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
