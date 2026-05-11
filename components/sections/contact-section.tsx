import { LinkedinIcon, GithubIcon, ArrowUpRightIcon } from "@/components/icons";

const LINKEDIN_URL = "https://www.linkedin.com/in/dewald-scholtz-97a992139/";
const GITHUB_URL = "https://github.com/scholtde";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-labelledby="contact-heading"
    >
      <h3
        id="contact-heading"
        className="font-mono text-xs uppercase tracking-[0.18em] text-accent"
      >
        // 06. Contact
      </h3>

      <div className="mt-6">
        <p className="leading-relaxed text-fg-muted">
          The fastest way to reach me is LinkedIn. If you&rsquo;re hiring, building, or
          looking for a partner on something hard, send a message.
        </p>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-accent-deep/50 bg-accent-deep/10 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-accent transition-all hover:border-accent hover:bg-accent-deep/20"
        >
          <LinkedinIcon className="size-4" />
          Message on LinkedIn
          <ArrowUpRightIcon className="size-3.5" />
        </a>

        <p className="mt-6 text-sm text-fg-faint">
          You can also see my code on{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-fg underline decoration-accent decoration-2 underline-offset-2 transition-colors hover:text-accent"
          >
            <GithubIcon className="size-3.5" />
            github.com/scholtde
          </a>
          .
        </p>
      </div>
    </section>
  );
}
