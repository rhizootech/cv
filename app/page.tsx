import { LinkedinIcon, GithubIcon } from "@/components/icons";
import { ScrollspyNav, type NavItem } from "@/components/scrollspy-nav";
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
    <main className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-4">
        {/* Left: sticky sidebar */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="reveal-on-load text-5xl font-bold tracking-tight text-fg sm:text-6xl">
              Dewald Scholtz
            </h1>
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
          </div>

          {/* Socials */}
          <ul className="reveal-on-load reveal-on-load-5 ml-1 mt-8 flex items-center gap-5 text-fg-muted">
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
          <section
            id="about"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          >
            <h3 className="sr-only">About</h3>
            <p className="leading-relaxed text-fg-muted">
              I&rsquo;m an original Nerd &mdash; one of the true ones from the &rsquo;90s
              &mdash; and I still embrace it. At my core I&rsquo;m a builder. My world has
              shifted from knowing &ldquo;everything about something&rdquo; to knowing
              &ldquo;something about everything.&rdquo; If there&rsquo;s a problem, I find
              a solution. If there&rsquo;s a technology I haven&rsquo;t touched,
              I&rsquo;ll learn it and build with it.
            </p>
            <p className="mt-4 leading-relaxed text-fg-muted">
              <span className="text-fg">I&rsquo;m possible.</span> I look past the
              &ldquo;impossible&rdquo; label and build whatever the problem actually
              needs. Right now that means running{" "}
              <a
                href="https://rc.technology"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-fg underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
              >
                RCT
              </a>
              , maintaining the{" "}
              <a
                href="https://edgetower.co.za"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-fg underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
              >
                edgE:Tower
              </a>{" "}
              suite, and plugging into engagements that move the needle on both sides.
            </p>
            <p className="mt-4 leading-relaxed text-fg-muted">
              Started in core network engineering at Vodacom in 2004, bet on myself in
              2017, and have been founder-mode ever since. AI, IoT, cybersecurity,
              industrial automation, full-stack SaaS &mdash; I weave technologies
              together to solve whatever the customer actually needs (and often what they
              didn&rsquo;t know they needed).
            </p>
          </section>

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
