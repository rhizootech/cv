import type { ReactNode } from "react";

const linkClasses =
  "font-medium text-fg underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent";

const emphasis = (children: ReactNode) => (
  <span className="text-fg">{children}</span>
);

/**
 * The About section paragraphs, rendered in order on the home page.
 * Edit the text or markup here. Each entry is one <p> on the page.
 */
export const aboutParagraphs: ReactNode[] = [
  <>
    I&rsquo;m an original Nerd &mdash; one of the true ones from the &rsquo;90s
    &mdash; and I still embrace it. At my core I&rsquo;m a builder. My world has
    shifted from knowing &ldquo;everything about something&rdquo; to knowing
    &ldquo;something about everything.&rdquo; If there&rsquo;s a problem, I find
    a solution. If there&rsquo;s a technology I haven&rsquo;t touched,
    I&rsquo;ll learn it and build with it.
  </>,

  <>
    {emphasis(<>I&rsquo;m possible.</>)} I look past the
    &ldquo;impossible&rdquo; label and build whatever the problem actually
    needs. Right now that means running{" "}
    <a
      href="https://rc.technology"
      target="_blank"
      rel="noreferrer"
      className={linkClasses}
    >
      RCT
    </a>
    , maintaining the{" "}
    <a
      href="https://edgetower.co.za"
      target="_blank"
      rel="noreferrer"
      className={linkClasses}
    >
      edgE:Tower
    </a>{" "}
    suite, and plugging into engagements that move the needle on both sides.
  </>,

  <>
    Started in core network engineering at Vodacom in 2004, bet on myself in
    2017, and have been founder-mode ever since. AI, IoT, cybersecurity,
    industrial automation, full-stack SaaS &mdash; I weave technologies together
    to solve whatever the customer actually needs (and often what they
    didn&rsquo;t know they needed).
  </>,
];
