import { experience } from "@/content/experience";

export function CareerArcSection() {
  const sorted = [...experience].sort((a, b) => a.order - b.order);

  return (
    <section
      id="arc"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-labelledby="arc-heading"
    >
      <h3
        id="arc-heading"
        className="font-mono text-xs uppercase tracking-[0.18em] text-accent"
      >
        // 04. Career arc
      </h3>

      <ol className="mt-8 space-y-12">
        {sorted.map((item) => (
          <li
            key={`${item.company}-${item.order}`}
            className="grid gap-3 sm:grid-cols-8 sm:gap-6"
          >
            {/* Meta column */}
            <div className="sm:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
                {item.dateRange}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint/80">
                {item.location}
              </div>
            </div>

            {/* Content column */}
            <div className="sm:col-span-6">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <h4 className="text-base font-semibold leading-snug text-fg">
                  {item.role}
                </h4>
                {item.current && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    // current
                  </span>
                )}
              </div>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                @ {item.company}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-3 ml-4 list-disc space-y-1 text-sm text-fg-muted marker:text-accent/60">
                  {item.highlights.map((h) => (
                    <li key={h} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {item.engagements && item.engagements.length > 0 && (
                <div className="mt-4 rounded-md border-l-2 border-accent-deep/40 bg-panel/30 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    // notable engagements
                  </div>
                  <ul className="mt-3 space-y-3">
                    {item.engagements.map((e) => (
                      <li key={e.client}>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <div className="text-sm font-semibold text-fg">
                            {e.client}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-fg-faint">
                            // {e.dateRange}
                          </div>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                          {e.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
