import { identity } from "@/content/identity";
import { aboutSummary } from "@/content/about";
import { experience, type ExperienceItem } from "@/content/experience";
import { stack, type StackGroup } from "@/content/stack";
import { getFeaturedProjects } from "@/lib/content/projects";
import type { Project } from "@/lib/content/schema";

export type CvIdentity = typeof identity;

export type CvViewModel = {
  identity: CvIdentity;
  /** Plain-text About paragraphs, kept in sync with the home page via content/about.tsx. */
  summary: string[];
  experience: ExperienceItem[];
  projects: Project[];
  stack: StackGroup[];
};

/**
 * Compose the CV view-model from the same content sources that drive the home page.
 * Single source of truth — there is no separate CV document to maintain.
 *
 * The optional `projectsDir` allows tests to point at a fixture directory; in
 * normal builds the loader uses `content/projects/` relative to the project root.
 */
export async function composeCv(
  opts: { projectsDir?: string } = {},
): Promise<CvViewModel> {
  const featuredProjects = await getFeaturedProjects(opts.projectsDir);
  return {
    identity,
    summary: aboutSummary,
    experience: [...experience].sort((a, b) => a.order - b.order),
    projects: [...featuredProjects].sort((a, b) => a.order - b.order),
    stack,
  };
}
