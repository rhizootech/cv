import Link from "next/link";
import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { HeroName } from "@/components/hero-name";
import { CornerBrackets } from "@/components/hud/CornerBrackets";
import { ScrollspyNav, type NavItem } from "@/components/scrollspy-nav";
import { AboutSection } from "@/components/sections/about-section";
import { SelectedWork } from "@/components/sections/selected-work";
import { NowSection } from "@/components/sections/now-section";
import { CareerArcSection } from "@/components/sections/career-arc-section";
import { StackSection } from "@/components/sections/stack-section";
import { ContactSection } from "@/components/sections/contact-section";

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "now", label: "Now" },
  { id: "work", label: "Work" },
  { id: "arc", label: "Arc" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const LINKEDIN_URL = "https://www.linkedin.com/in/dewald-scholtz-97a992139/";
const GITHUB_URL = "https://github.com/scholtde";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-screen-xl px-8 py-12 md:px-16 md:py-20 lg:px-24 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* Left: sticky sidebar */}
        <header className="relative lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          {/* CCTV portrait viewfinder — lg+ only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden lg:block"
          >
            <div className="cctv-portrait absolute inset-0" />
            <div className="cctv-scanlines absolute inset-0" />
            <div className="cctv-gradient absolute inset-0" />
            <CornerBrackets size="size-4" />
          </div>

          <div className="lg:pl-10">
            <div className="reveal-on-load">
              <HeroName />
            </div>
            <h2 className="reveal-on-load reveal-on-load-1 mt-3 text-lg font-medium text-fg sm:text-xl">
              Founder &middot; Polymath &middot; Builder
            </h2>
            <p className="reveal-on-load reveal-on-load-2 mt-4 max-w-xs leading-normal text-fg-muted">
              I help teams build. They help me learn.
            </p>

            {/* Status pill with pulsing dot */}
            <div className="reveal-on-load reveal-on-load-3 mt-6 inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1.5">
              <span
                className="pulse-dot relative inline-block size-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
                open to engagements
              </span>
            </div>

            {/* Scrollspy nav (client component) */}
            <div className="reveal-on-load reveal-on-load-4">
              <ScrollspyNav items={NAV_ITEMS} />
            </div>

            {/* Printable CV link */}
            <Link
              href="/cv"
              className="reveal-on-load reveal-on-load-5 group mt-10 hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-faint transition-colors hover:text-accent lg:inline-flex"
            >
              <span>// view printable CV</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          {/* Socials */}
          <ul className="reveal-on-load reveal-on-load-5 ml-1 mt-8 flex items-center gap-5 text-fg-muted lg:pl-10">
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-accent"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-accent"
              >
                <GithubIcon className="size-5" />
              </a>
            </li>
          </ul>
        </header>

        {/* Right: scrollable content */}
        <div className="pt-24 lg:w-1/2 lg:py-24">
          {/* 01. About */}
          <AboutSection />

          <NowSection />
          <SelectedWork />
          <CareerArcSection />
          <StackSection />
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
