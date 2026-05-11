import type { Project } from "@/lib/content/schema";

export function ProjectCard({ project }: { project: Project }) {
  const internalHref = project.detail ? `/projects/${project.slug}` : undefined;
  const externalHref = !project.detail ? project.externalUrl : undefined;
  const href = internalHref ?? externalHref;

  const body = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-8 sm:gap-6">
      {/* Meta column: dates + industry */}
      <div className="sm:col-span-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-faint">
          {project.dateRange ?? project.year ?? ""}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-faint/80">
          {project.industry}
        </div>
      </div>

      {/* Content column */}
      <div className="sm:col-span-6">
        <h4 className="flex items-baseline gap-1.5 text-base font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
          <span>{project.title}</span>
          {externalHref && (
            <span
              aria-hidden="true"
              className="inline-block translate-y-px text-xs text-fg-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            >
              ↗
            </span>
          )}
          {project.status === "live" && (
            <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
              live
            </span>
          )}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        {project.stack.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-accent-deep/30 bg-accent-deep/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          target={externalHref ? "_blank" : undefined}
          rel={externalHref ? "noreferrer" : undefined}
          className="group relative -mx-4 block rounded-md p-4 transition-colors hover:bg-panel/50 sm:-mx-6 sm:p-6"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-md border border-transparent transition-colors group-hover:border-edge"
          />
          {body}
        </a>
      </li>
    );
  }

  return <li className="-mx-4 block p-4 sm:-mx-6 sm:p-6">{body}</li>;
}
