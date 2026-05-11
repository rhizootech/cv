import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDetailProjects, getProjects } from "@/lib/content/projects";
import { MdxContent } from "@/components/mdx/MdxContent";

export async function generateStaticParams() {
  const projects = await getDetailProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const all = await getProjects();
  const project = all.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Dewald Scholtz`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = await getProjects();
  const project = all.find((p) => p.slug === slug && p.detail);

  if (!project) notFound();

  const externalLabel = project.externalUrl
    ? new URL(project.externalUrl).hostname.replace(/^www\./, "")
    : null;

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 md:px-12 md:py-20">
      <Link
        href="/#work"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-accent"
      >
        <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
          ←
        </span>
        Back to work
      </Link>

      <header className="mt-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          // {project.industry}
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
          {project.dateRange ?? project.year ?? ""}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-fg-muted">{project.summary}</p>

        {project.stack.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-1.5">
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

        {project.externalUrl && externalLabel && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-accent transition-colors hover:underline"
          >
            Visit {externalLabel}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </header>

      <article className="mt-12">
        <MdxContent source={project.body} />
      </article>

      <footer className="mt-16 border-t border-edge pt-8">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-accent"
        >
          <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          Back to work
        </Link>
      </footer>
    </main>
  );
}
