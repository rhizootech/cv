import { stack } from "@/content/stack";

export function StackSection() {
  return (
    <section
      id="stack"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-labelledby="stack-heading"
    >
      <h3
        id="stack-heading"
        className="font-mono text-xs uppercase tracking-[0.18em] text-accent"
      >
        // 05. Stack
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-fg-muted">
        The tools I reach for. The list keeps growing &mdash; if it solves the problem,
        I&rsquo;ll learn it and use it.
      </p>

      <dl className="mt-8 space-y-5">
        {stack.map((group) => (
          <div
            key={group.label}
            className="grid gap-2 sm:grid-cols-8 sm:gap-6"
          >
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint sm:col-span-2 sm:pt-1">
              {group.label}
            </dt>
            <dd className="sm:col-span-6">
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-accent-deep/30 bg-accent-deep/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
