import { getFeaturedProjects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/cards/project-card";

export async function SelectedWork() {
  const projects = await getFeaturedProjects();

  return (
    <section
      id="work"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-labelledby="work-heading"
    >
      <h3
        id="work-heading"
        className="font-mono text-xs uppercase tracking-[0.18em] text-accent"
      >
        // 03. Selected Work
      </h3>
      <ul className="mt-8 space-y-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}
