import { openTo } from "@/content/open-to";

export function NowSection() {
  return (
    <section
      id="now"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-labelledby="now-heading"
    >
      <h3
        id="now-heading"
        className="font-mono text-xs uppercase tracking-[0.18em] text-accent"
      >
        // 02. What I&rsquo;m open to
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-fg-muted">
        I&rsquo;m an owner who chooses where to plug in. I help teams build; they help me
        learn. Here&rsquo;s where I&rsquo;m looking right now:
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {openTo.map((entry) => (
          <li
            key={entry.title}
            className="rounded-md border border-edge bg-panel/30 p-4 transition-colors hover:border-accent-deep/60"
          >
            <h4 className="text-sm font-semibold text-fg">{entry.title}</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
              {entry.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
